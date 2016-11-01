/*
 * Copyright 2008-2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.anyframe.plugin.excel.web;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.anyframe.plugin.excel.service.ExcelService;
import org.anyframe.plugin.excel.web.ExcelInfoHandler.ColumnInfo;
import org.apache.commons.collections.map.ListOrderedMap;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

/**
 * This ExcelController class is a Controller class to provide excel upload and
 * download functionality.
 * 
 * @author Jonghoon Kim
 */
@Controller("excelController")
@RequestMapping("/excelDownload.do")
public class ExcelController {

	@Inject
	@Named("excelService")
	private ExcelService excelService;

	@RequestMapping(params = "method=excelDownload")
	public void excelDownload(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		Map<String, Object> searchMap = bindRequestToMap(request);

		String columnInfoFile = "";

		if (searchMap.get("columnInfoFile") == null) {
			throw new Exception("fail to get column info xml file name");
		} else {
			columnInfoFile = searchMap.get("columnInfoFile").toString();
		}

		List<Map<String, Object>> resultList = excelService.download(searchMap);

		String fileName = "";
		if (searchMap.get("fileName") == null) {
			Calendar cal = Calendar.getInstance();
			SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
			fileName = formatter.format(cal.getTime());
		} else {
			fileName = (String) searchMap.get("fileName");
		}

		fileName = new String(fileName.getBytes("KSC5601"), "8859_1");
		response.setContentType("application/octet-stream");
		response.setHeader("Content-Disposition", "attachment; filename="
				+ fileName + ".xls");
		response.setHeader("Content-Description", "JSP Generated Data");
		response.setHeader("Content-Transfer-Encoding", "binary;");
		response.setHeader("Pragma", "no-cache;");
		response.setHeader("Expires", "-1;");

		HSSFWorkbook workbook = new HSSFWorkbook();
		HSSFSheet sheet = workbook.createSheet(fileName);

		OutputStream fileOut = null;
		try {
			fileOut = response.getOutputStream();
			HSSFRow row;
			HSSFCellStyle style = workbook.createCellStyle();
			style.setAlignment(HSSFCellStyle.ALIGN_CENTER);

			HSSFCell cell;

			row = sheet.createRow(0);

			List<ColumnInfo> columnInfoList = getColumnInfo(request,
					columnInfoFile);

			int columnCount = columnInfoList.size();
			String[] header = new String[columnCount];
			int[] cellwidth = new int[columnCount];
			String[] fieldName = new String[columnCount];
			String[] columnType = new String[columnCount];
			String[] mask = new String[columnCount];

			ColumnInfo columnInfo = null;
			short width = 265;

			for (int i = 0; i < columnCount; i++) {
				columnInfo = columnInfoList.get(i);
				header[i] = columnInfo.getColumnName();
				cellwidth[i] = columnInfo.getColumnWidth();
				fieldName[i] = columnInfo.getFieldName();
				columnType[i] = columnInfo.getColumnType();
				mask[i] = columnInfo.getMask();
				sheet.setColumnWidth(i, cellwidth[i] * width);
				cell = row.createCell(i);
				cell.setCellValue(new HSSFRichTextString(header[i]));
				cell.setCellStyle(style);
			}

			for (int i = 0; i < resultList.size(); i++) {
				row = sheet.createRow(i + 1);
				Map<String, Object> resultMap = resultList.get(i);

				for (int j = 0; j < columnCount; j++) {
					cell = row.createCell(j);

					if (columnType[j].equals("Date")) {
						SimpleDateFormat formatter = new SimpleDateFormat(
								mask[j]);
						cell.setCellValue(formatter.format(resultMap
								.get(fieldName[j])));
					} else {
						cell.setCellValue(resultMap.get(fieldName[j])
								.toString());
					}
					cell.setCellValue(resultMap.get(fieldName[j]).toString());
					cell.setCellStyle(style);
				}
			}
			workbook.write(fileOut);
		} catch (Exception e) {
			throw e;
		} finally {
			try {
				if (fileOut != null) {
					fileOut.flush();
					fileOut.close();
				}
			} catch (IOException ex) {
				throw ex;
			}
		}
	}

	@SuppressWarnings("unchecked")
	private Map<String, Object> bindRequestToMap(HttpServletRequest request)
			throws Exception {
		Enumeration en = request.getParameterNames();
		Map<String, Object> parameterMap = new HashMap<String, Object>();
		while (en.hasMoreElements()) {
			String paramName = en.nextElement().toString();
			parameterMap.put(paramName, request.getParameter(paramName));
		}
		return parameterMap;
	}

	private List<ColumnInfo> getColumnInfo(HttpServletRequest request,
			String columnInfoFile) throws Exception {
		try {
			SAXParserFactory factory = SAXParserFactory.newInstance();
			SAXParser saxParser = factory.newSAXParser();

			ExcelInfoHandler handler = new ExcelInfoHandler();
			File file = new File(
					request.getSession().getServletContext()
							.getRealPath(
									"/WEB-INF/classes/excel/" + columnInfoFile
											+ ".xml"));

			if (file.canWrite()) {
				saxParser.parse(file, handler);
			} else {
				throw new Exception("cannot find" + columnInfoFile + ".xml");
			}
			return handler.columnInfoList;
		} catch (Exception e) {
			throw new Exception("fail to get column info", e);
		}
	}

	@RequestMapping(params = "method=excelUpload")
	public String excelUpload(
			HttpServletRequest request,
			@RequestParam(value = "excelFile", required = false) MultipartFile excelFile)
			throws Exception {

		Map<String, Object> paramMap = bindRequestToMap(request);

		int startRow = 1;
		// 저장을 시작할 row값, 설정이 없을 경우 1부터 시작, 0은 Heder정보
		if (paramMap.get("startRow") != null) {
			startRow = Integer.parseInt(paramMap.get("startRow").toString());
		}

		POIFSFileSystem fs = null;
		
		fs = new POIFSFileSystem(excelFile.getInputStream());

		HSSFWorkbook workbook = new HSSFWorkbook(fs);

		// 시트는 한개로 제약
		HSSFSheet sheet = workbook.getSheetAt(0);

		// 저장한 데이터의 마직막 줄, 설정이 없을 경우는 시트 전체의 Row
		int endRow = 0;
		if (paramMap.get("endRow") != null) {
			endRow = (Integer) paramMap.get("endRow");
		} else {
			endRow = sheet.getLastRowNum();
		}

		String columnInfoFile = "";

		// ColumnInfo파일에서 ColumnName과 FieldName값을 HashMap으로 추출
		if (paramMap.get("columnInfoFile") == null) {
			throw new Exception("fail to get column info xml file name");
		} else {
			columnInfoFile = paramMap.get("columnInfoFile").toString();
		}

		List<ColumnInfo> columnInfoList = getColumnInfo(request, columnInfoFile);

		Map<String, String> fieldMap = new HashMap<String, String>();
		Map<String, Boolean> requiredMap = new HashMap<String, Boolean>();
		for (int i = 0; i < columnInfoList.size(); i++) {
			ColumnInfo columnInfo = columnInfoList.get(i);
			fieldMap.put(columnInfo.getColumnName(), columnInfo.getFieldName());
			requiredMap
					.put(columnInfo.getColumnName(), columnInfo.isRequired());
		}

		String[] header = null;
		String[] filedName = null;
		Boolean[] requiredField = null;

		// 컬럼 해더 정보 추출
		HSSFRow row = sheet.getRow(0);
		if (row != null) {
			int headerCount = row.getPhysicalNumberOfCells();
			header = new String[headerCount];
			filedName = new String[headerCount];
			requiredField = new Boolean[headerCount];

			for (int i = 0; i < headerCount; i++) {
				HSSFCell cell = row.getCell(i);
				if (cell != null
						&& cell.getCellType() != HSSFCell.CELL_TYPE_BLANK) {
					header[i] = getCellValue(cell);
					filedName[i] = fieldMap.get(header[i]);
					requiredField[i] = requiredMap.get(header[i]);
				}
			}
		}

		List<ListOrderedMap> insertList = new ArrayList<ListOrderedMap>();
		ListOrderedMap insertMap = null;

		// 컬럼 값 추출
		for (int i = startRow; i <= endRow; i++) {
			boolean isInsertRow = true;
			row = sheet.getRow(i);
			if (row != null) {
				insertMap = new ListOrderedMap();
				for (int j = 0; j < filedName.length; j++) {
					HSSFCell cell = row.getCell(j);
					if (cell != null) {
						if (!requiredField[j]) {
							insertMap.put(filedName[j], getCellValue(cell));
						} else if (cell.getCellType() != HSSFCell.CELL_TYPE_BLANK) {
							insertMap.put(filedName[j], getCellValue(cell));
						} else {
							isInsertRow = false;
							break;
						}
					}
				}
				if (isInsertRow) {
					insertList.add(insertMap);
				}
			}
		}
		// ExcelService의 upload method 호출
		excelService.upload(paramMap, insertList);
		return paramMap.get("resultPage").toString();
	}

	public String getCellValue(HSSFCell cell) throws Exception {
		String value = "";
		switch (cell.getCellType()) {
		case HSSFCell.CELL_TYPE_FORMULA:
			value = cell.getCellFormula();
			break;
		case HSSFCell.CELL_TYPE_NUMERIC:
			value = cell.getNumericCellValue() + ""; // double
			break;
		case HSSFCell.CELL_TYPE_STRING:
			value = cell.getStringCellValue(); // String
			break;
		case HSSFCell.CELL_TYPE_BLANK:
			value = null;
			break;
		case HSSFCell.CELL_TYPE_BOOLEAN:
			value = cell.getBooleanCellValue() + ""; // boolean
			break;
		case HSSFCell.CELL_TYPE_ERROR:
			value = cell.getErrorCellValue() + ""; // byte
			break;
		default:
		}
		return value;
	}
	
}