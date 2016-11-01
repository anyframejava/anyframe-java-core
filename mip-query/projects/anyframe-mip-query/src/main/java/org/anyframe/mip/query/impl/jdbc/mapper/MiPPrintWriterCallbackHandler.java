/*
 * Copyright 2002-2012 the original author or authors.
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
package org.anyframe.mip.query.impl.jdbc.mapper;

import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.anyframe.query.QueryInfo;
import org.anyframe.query.ria.RiaPrintWriterCallback;

/**
 * Class for Print Writer Mip Dataset
 * 
 * @author Soyon Lim
 * @author JongHoon Kim
 */
public class MiPPrintWriterCallbackHandler extends MiPCallbackSupport implements
		RiaPrintWriterCallback {

	private String encoding = "utf-8"; 
	private PrintWriter writer;
	private int rowCount;
	private int columnCount;
	private String[] columnNames;
	private final Map<String, Integer> columnIndexMap = new HashMap<String, Integer>();

	public void setEncoding(String encoding) {
		this.encoding = encoding;
	}

	public String getEncoding() {
		return this.encoding;

	}

	public void setPrintWriter(PrintWriter writer) {
		this.writer = writer;
	}

	// Default Constructor
	public MiPPrintWriterCallbackHandler() {

	}

	public MiPPrintWriterCallbackHandler(PrintWriter writer, QueryInfo queryInfo) {
		this.writer = writer;
		this.queryInfo = queryInfo;
	}

	protected short getDsType(int rsType) {
		return 0;
	}

	public void processRow(ResultSet rs) throws SQLException {
		StringBuilder printString = null;
		if (rowCount == 0) {
			ResultSetMetaData rsmd = rs.getMetaData();
			columnCount = rsmd.getColumnCount();
			int[] columnTypes = new int[rsmd.getColumnCount()];
			String[] fieldNames = new String[rsmd.getColumnCount()];
			columnNames = new String[rsmd.getColumnCount()];
			printString = new StringBuilder();
			for (int i = 0; i < columnCount; i++) {
				String fieldName = getMappingStylekey(queryInfo, rsmd
						.getColumnLabel(i + 1));
				columnTypes[i] = rsmd.getColumnType(i + 1);
				fieldNames[i] = fieldName;
				columnIndexMap.put(columnNames[i], new Integer(i + 1));
				printString.append(fieldName.toUpperCase() + ":STRING(100)");
				if (i != columnCount - 1)
					printString.append(",");
			}

			printString.append("\n");
			writer.write(printString.toString());
		}
		printString = new StringBuilder();
		for (int i = 1; i <= columnCount; i++) {
			printString.append(replaceChar((String) getValues(rs, i, 12)));
			if (i != columnCount)
				printString.append(",");
		}

		printString.append("\n");
		writer.write(printString.toString());
		rowCount++;
	}

	static final String replaceChar(String srcStr) {
		String tempStr = srcStr;
		tempStr = replaceChars(tempStr, "\\", "\\\\");
		tempStr = replaceChars(tempStr, "\"", "\\\"");
		tempStr = replaceChars(tempStr, "\n", "\\n");
		if (tempStr.indexOf(",") != -1 || tempStr.indexOf("'") != -1)
			tempStr = "\"" + tempStr + "\"";
		return tempStr;
	}

	static final String replaceChars(String para, String chars1, String chars2) {
		String temp = "";
		if (para == null)
			para = "";
		int start = 0;
		int index = 0;
		for (; index != -1; start = index + chars1.length()) {
			index = para.indexOf(chars1, start);
			if (index == -1) {
				temp = temp + para.substring(start, para.length());
				break;
			}
			temp = temp + para.substring(start, index);
			temp = temp + chars2;
		}

		if (start == 0)
			return para;
		else
			return temp;
	}
}
