package org.anyframe.plugin.board.web;

import java.io.File;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.http.HttpServletRequest;

import org.anyframe.plugin.board.domain.BoardInfo;
import org.anyframe.plugin.board.domain.ColInfo;
import org.anyframe.plugin.board.service.GenerateBoardService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/board")
public class GenerateBoardController {

	@Inject
	@Named("generateBoardService")
	private GenerateBoardService generateBoardService;

	@RequestMapping("/form.do")
	public String form(Model model) throws Exception {
		
		Collection<File> templateNames = generateBoardService.getTemplates();
		model.addAttribute("templateNames", templateNames);  
		model.addAttribute("boardInfo", new BoardInfo());
		
		return "board/form";
	}

	@RequestMapping("/columnList.do")
	public String columnList(Model model) throws Exception {
		List<ColInfo> colInfo = this.generateBoardService.getDefaultColumnList();
		model.addAttribute("rows", colInfo);
		return "jsonView";
	}
	
	@RequestMapping("/generate.do")
	public String generate(BoardInfo boardInfo, HttpServletRequest request)
			throws Exception {
		List<ColInfo> colInfoList = (List<ColInfo>) getColInfoList(request);
		generateBoardService.generate(boardInfo, colInfoList);

		return "jsonView";
	}
	
	@RequestMapping("/checkColumnId.do")
	public String checkColumnId(@RequestParam("columnId") String columnId,
			Model model) throws Exception {
		boolean rtn = generateBoardService.isDuplicatedColumnId(columnId);

		model.addAttribute("rtn", rtn);
		return "jsonView";
	}
	
	private List<ColInfo> getColInfoList(HttpServletRequest request) {
		String[] columnId = ServletRequestUtils.getStringParameters(request,
				"columnId[]");
		String[] fieldName = ServletRequestUtils.getStringParameters(request,
				"fieldName[]");
		String[] columnSize = ServletRequestUtils.getStringParameters(request,
				"columnSize[]");
		String[] columnType = ServletRequestUtils.getStringParameters(request,
				"columnType[]");
		String[] columnAttribute = ServletRequestUtils.getStringParameters(request, 
				"columnAttribute[]");
		String[] useList = ServletRequestUtils.getStringParameters(request,
				"useList[]");
		String[] useView = ServletRequestUtils.getStringParameters(request,
				"useView[]");
		String[] useScreen = ServletRequestUtils.getStringParameters(request,
				"useScreen[]");
		String[] isEssential = ServletRequestUtils.getStringParameters(request,
				"isEssential[]");
		String[] isExpanded = ServletRequestUtils.getStringParameters(request,
				"isExpanded[]");
		String[] listOrder = ServletRequestUtils.getStringParameters(request,
				"listOrder[]");
		String[] viewOrder = ServletRequestUtils.getStringParameters(request,
				"viewOrder[]");
		List<ColInfo> colInfoList = new ArrayList<ColInfo>();
		for(int i=0; i< columnId.length; i++) {
			ColInfo colInfo = new ColInfo();
			colInfo.setColumnId(columnId[i]);
			colInfo.setFieldName(fieldName[i]);
			colInfo.setColumnSize(columnSize[i]);
			colInfo.setColumnType(columnType[i]);
			colInfo.setColumnAttribute(columnAttribute[i]);
			colInfo.setUseList(useList[i]);
			colInfo.setUseView(useView[i]);
			colInfo.setUseScreen(useScreen[i]);
			colInfo.setIsEssential(isEssential[i]);
			colInfo.setIsExpanded(isExpanded[i]);
			colInfo.setListOrder(listOrder[i]);
			colInfo.setViewOrder(viewOrder[i]);
			
			colInfoList.add(colInfo);
		}		
		return colInfoList;
	}	
}
