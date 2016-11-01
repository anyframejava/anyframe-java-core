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

import java.util.ArrayList;
import java.util.List;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

/**
 * This ExcelInfoHandler class is an utility class to provide excel header
 * information functionality.
 * 
 * @author Jonghoon Kim
 */
public class ExcelInfoHandler extends DefaultHandler {

	private boolean columnName = false;
	private boolean fieldName = false;
	private boolean columnWidth = false;
	private boolean columnType = false;
	private boolean mask = false;
	private boolean required = false;

	public List<ColumnInfo> columnInfoList;
	public ColumnInfo columnInfo;

	public void startElement(String uri, String localName, String qName,
			Attributes attributes) throws SAXException {
		if (qName.equalsIgnoreCase("COLUMNS")) {
			columnInfoList = new ArrayList<ColumnInfo>();
		}
		if (qName.equalsIgnoreCase("COLUMN")) {
			columnInfo = new ColumnInfo();
		}
		if (qName.equalsIgnoreCase("COLUMN_NAME")) {
			columnName = true;
		}
		if (qName.equalsIgnoreCase("FIELD_NAME")) {
			fieldName = true;
		}
		if (qName.equalsIgnoreCase("COLUMN_WIDTH")) {
			columnWidth = true;
		}
		if (qName.equalsIgnoreCase("COLUMN_TYPE")) {
			columnType = true;
		}
		if (qName.equalsIgnoreCase("MASK")) {
			mask = true;
		}
		if (qName.equalsIgnoreCase("REQUIRED")) {
			required = true;
		}
	}

	public void characters(char ch[], int start, int length)
			throws SAXException {
		if (columnName) {
			columnInfo.setColumnName(new String(ch, start, length));
			columnName = false;
		} else if (fieldName) {
			columnInfo.setFieldName(new String(ch, start, length));
			fieldName = false;
		} else if (columnWidth) {
			String width = new String(ch, start, length);
			columnInfo.setColumnWidth(Integer.parseInt(width));
			columnWidth = false;
		} else if (columnType) {
			columnInfo.setColumnType(new String(ch, start, length));
			columnType = false;
		} else if (mask) {
			columnInfo.setMask(new String(ch, start, length));
			mask = false;
		} else if (required) {
			String requiredValue = new String(ch, start, length).toLowerCase();
			columnInfo.setRequired(Boolean.parseBoolean(requiredValue));
			required = false;
		}
	}

	public void endElement(String uri, String localName, String qName)
			throws SAXException {
		if (qName.equalsIgnoreCase("COLUMN")) {
			columnInfoList.add(columnInfo);
		}
	}

	public class ColumnInfo {
		private String columnName;
		private String fieldName;
		private int columnWidth = 50;
		private String columnType = "";
		private String mask = "";
		private boolean required = false;

		public String getColumnName() {
			return columnName;
		}

		public void setColumnName(String columnName) {
			this.columnName = columnName;
		}

		public String getFieldName() {
			return fieldName;
		}

		public void setFieldName(String fieldName) {
			this.fieldName = fieldName;
		}

		public int getColumnWidth() {
			return columnWidth;
		}

		public void setColumnWidth(int columnWidth) {
			this.columnWidth = columnWidth;
		}

		public String getColumnType() {
			return columnType;
		}

		public void setColumnType(String columnType) {
			this.columnType = columnType;
		}

		public String getMask() {
			return mask;
		}

		public void setMask(String mask) {
			this.mask = mask;
		}

		public String toString() {
			return "[ " + "COLUMN_NAME = " + this.columnName + ", \n"
					+ "FIELD_NAME = " + this.fieldName + ", \n"
					+ "COLUMN_WIDTH = " + this.columnWidth + ", \n"
					+ "COLUMN_TYPE = " + this.columnType + ", \n" + "MASK = "
					+ this.mask + " ]";
		}

		public boolean isRequired() {
			return required;
		}

		public void setRequired(boolean required) {
			this.required = required;
		}
	}
}
