package org.anyframe.plugin.board.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;
import java.util.Vector;

import org.anyframe.plugin.board.domain.BoardInfo;
import org.anyframe.plugin.board.domain.ColInfo;
import org.anyframe.plugin.board.domain.ColInfos;
import org.anyframe.plugin.board.service.GenerateBoardService;
import org.apache.commons.digester.Digester;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.tools.generic.DisplayTool;
import org.apache.velocity.tools.generic.EscapeTool;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.xml.sax.SAXException;

@Service("generateBoardService")
@Transactional(rollbackFor = {Exception.class}, propagation = Propagation.REQUIRED)
public class GenerateBoardServiceImpl implements GenerateBoardService {

	private static VelocityEngine velocity = null;
	private static final String SEPARATOR = System
			.getProperty("file.separator");
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
  	@Value("#{contextProperties['projectHome']}" + "\\templates")
  	String templateDir;

  	@Value("#{contextProperties['projectHome']}")
  	String targetDir;
	
	VelocityContext context = new VelocityContext();

	public List<ColInfo> getDefaultColumnList()
			throws Exception {

		Vector<ColInfo> defaultColumn = getDefinedColumns("board/board.columns.definition.xml");

		List<ColInfo> boardColInfos = new ArrayList<ColInfo>();

		if (defaultColumn != null && !defaultColumn.isEmpty()) {

			for (int i = 0; i < defaultColumn.size(); i++) {

				ColInfo colInfo = (ColInfo) defaultColumn.get(i);
				boardColInfos.add(colInfo);
			}
		}
		return boardColInfos;
	}


	public boolean isDuplicatedColumnId(String columnId) throws Exception {
		boolean rtn = false;
		Vector<ColInfo> defaultColumn = getDefinedColumns("board/board.columns.definition.xml");

		if (defaultColumn != null && !defaultColumn.isEmpty()) {
			for (int i = 0; i < defaultColumn.size(); i++) {
				ColInfo column = (ColInfo) defaultColumn.get(i);
				if (column.getColumnId().equalsIgnoreCase(columnId)) {
					rtn = true;
					break;
				}
			}
		}
		if (!rtn) {
			Vector<ColInfo> reservedColumn = getDefinedColumns("board/board.columns.reserved.xml");

			if (reservedColumn != null && !reservedColumn.isEmpty()) {
				for (int i = 0; i < reservedColumn.size(); i++) {
					ColInfo column = (ColInfo) reservedColumn.get(i);
					if (column.getColumnId().equalsIgnoreCase(columnId)) {
						rtn = true;
						break;
					}
				}
			}
		}
		return rtn;
	}
	
	private Vector<ColInfo> getDefinedColumns(String fileName)
			throws IOException, SAXException {
		Digester digester = new Digester();
		digester.setValidating(false);
		digester.addObjectCreate("columns", ColInfos.class);
		digester.addObjectCreate("columns/column", ColInfo.class);
		digester.addBeanPropertySetter("columns/column/columnId", "columnId");
		digester.addBeanPropertySetter("columns/column/fieldName",
				"fieldName");
		digester.addBeanPropertySetter("columns/column/columnType",
				"columnType");
		digester.addBeanPropertySetter("columns/column/columnSize",
				"columnSize");
		digester.addBeanPropertySetter("columns/column/isEssential",
				"isEssential");
		digester.addBeanPropertySetter("columns/column/useList", "useList");
		digester.addBeanPropertySetter("columns/column/useView", "useView");
		digester.addBeanPropertySetter("columns/column/useScreen", "useScreen");

		digester.addSetNext("columns/column", "setColumns");

		ClassLoader cl = Thread.currentThread().getContextClassLoader();
		if (cl == null) {
			cl = ClassLoader.getSystemClassLoader();
		}
		InputStream is = cl.getResourceAsStream(fileName);
		ColInfos columns = (ColInfos) digester.parse(is);

		Vector<ColInfo> definedColumn = (Vector<ColInfo>) columns.getColumns();
		return definedColumn;
	}
	
	public void generate(BoardInfo boardInfo, List<ColInfo> colInfoList) throws Exception {

		// 1. initialize velocity engine
		initVelocity();

		// 2. initialie velocity context (set using user input)
		context.put("esc", new EscapeTool());
		context.put("display", new DisplayTool());
		DisplayTool ds = new DisplayTool();

		context.put("packageName", boardInfo.getPackageName());
		context.put("boardName", boardInfo.getBoardName());
		context.put("BoardName", ds.capitalize(boardInfo.getBoardName()));
		context.put("tableName", boardInfo.getTableName());
		context.put("boardTitle", boardInfo.getBoardTitle());
		context.put("boardInfo", boardInfo);
		
		
		List<ColInfo> allFields = new ArrayList<ColInfo>();
		List<ColInfo> addedFields = new ArrayList<ColInfo>();
		List<ColInfo> listFields = new ArrayList<ColInfo>(colInfoList.size());
		List<ColInfo> viewFields = new ArrayList<ColInfo>(colInfoList.size());
		
		for(ColInfo boardColInfo : colInfoList){
			boardColInfo.setFieldId(getCamelCase(boardColInfo.getColumnId()));
			allFields.add(boardColInfo);
			if("1".equals(boardColInfo.getIsExpanded())){
				addedFields.add(boardColInfo);
			}if("1".equals(boardColInfo.getUseList())){
				listFields.add(boardColInfo);
			}if("1".equals(boardColInfo.getUseView())){
				viewFields.add(boardColInfo);
			}
		}

		Collections.sort(listFields, new ListAscCompare());
		Collections.sort(viewFields, new ViewAscCompare());
		
		context.put("addedFields", addedFields);
		context.put("allFields", allFields);
		context.put("listFields", listFields);
		context.put("viewFields", viewFields);
		// 3. process template
		String encoding = "UTF-8";

		Collection<File> templates = getTemplates();

		Iterator<File> itr = templates.iterator();

		while (itr.hasNext()) {
			String template = itr.next().getAbsolutePath();
			String boardType = boardInfo.getBoardType();
			if (template.endsWith("bloglist.jsp")) {
				if ("L".equals(boardType)) {
					continue;
				}
			} else if (template.endsWith("list.jsp") || template.endsWith("view.jsp")) {
				if ("B".equals(boardType)) {
					continue;
				}
			}
			if("N".equals(boardInfo.getUseComment())){
				if (template.contains("comment" + SEPARATOR) && template.endsWith(".java")){
					continue;
				}
				if (template.contains("postcomment") && template.endsWith(".xml")) {
					continue;
				}
			}
			if("N".equals(boardInfo.getUseAttachFile())){
				if (template.contains("attachfile" + SEPARATOR) && template.endsWith(".java")){
					continue;
				}
				if (template.contains("postattachfile") && template.endsWith(".xml")) {
					continue;
				}
			}
			processVelocityTemplate(context, targetDir, templateDir, template,
					encoding);
		}
	}

	
	public Collection<File> getTemplates() {
		@SuppressWarnings("unchecked")
		Collection<File> templates = FileUtils.listFiles(new File(templateDir),
				new String[] { "java", "xml", "properties", "jsp", "css", "sql", "properties",
						"script" }, true);
		return templates;
	}

	private void initVelocity() {
		velocity = new VelocityEngine();
		velocity.setProperty("runtime.log.logsystem.log4j.logger.level",
				"WARNING");
		velocity.setProperty("velocimacro.library", "");
		// reference
		// http://velocity.apache.org/engine/releases/velocity-1.5/developer-guide.html#configuring_resource_loaders
		velocity.setProperty("resource.loader", "file");
		velocity.setProperty("classpath.resource.loader.class",
				"org.apache.velocity.runtime.resource.loader.FileResourceLoader");

		velocity.setProperty("file.resource.loader.path", templateDir);
		velocity.setProperty("runtime.log.logsystem.class",
				"org.apache.velocity.runtime.log.NullLogSystem");
		velocity.init();
	}

	private void processVelocityTemplate(VelocityContext context,
			String targetDir, String templateDir, String template,
			String encoding) throws Exception {
		// 1. extract template name
		template = StringUtils.replace(template, templateDir, "");

		// 2. make output file name
		String outputName = SEPARATOR
				+ template.replaceAll("board", context.get("boardName")
						.toString().toLowerCase());

		if (template.endsWith(".java")) {
			outputName = changeSrcFolder(outputName, context.get("packageName")
					.toString());
		}

		// 3. make output directory
		File output = new File(targetDir, outputName);
		output.getParentFile().mkdirs();

		// 4. merge template
		Writer writer = new OutputStreamWriter(new FileOutputStream(output),
				encoding);
		velocity.mergeTemplate(template, encoding, context, writer);
		writer.flush();

		// 5. check output/src/test/java/Hello.java
		if (!output.exists()) {
			throw new Exception("Fail to merge velocity template - " + template);
		} else {
			logger.info("Create a " + output.getAbsolutePath()
					+ " Successfully!!! ");
		}
	}

	private String changeSrcFolder(String template, String packageName) {
		template = StringUtils.replace(template, "src" + SEPARATOR + "main"
				+ SEPARATOR + "java" + SEPARATOR, "");
		template = template.replaceAll("SampleBoard", context.get("BoardName")
				.toString());
		return "src" + SEPARATOR + "main" + SEPARATOR + "java" + SEPARATOR
				+ StringUtils.replace(packageName, ".", SEPARATOR) + template;
	}
	
	private String getCamelCase(String word) {
        String[] words = StringUtils.split(word, "_");
        String convertedWord = StringUtils.EMPTY;
        if (words != null && words.length >= 1) {
        	convertedWord = StringUtils.lowerCase(words[0]);
            for(int i = 1; i < words.length; i++) {
            	convertedWord += StringUtils.capitalize(words[i].toLowerCase());
            }
        }
        return convertedWord;
    }

	static class ListAscCompare implements Comparator<ColInfo> {
		public int compare(ColInfo arg0, ColInfo arg1) {
			return arg0.getListOrder().compareTo(arg1.getListOrder());
		}
	}
	
	static class ViewAscCompare implements Comparator<ColInfo> {
		public int compare(ColInfo arg0, ColInfo arg1) {
			return arg0.getViewOrder().compareTo(arg1.getViewOrder());
		}
	}
	
	
}
