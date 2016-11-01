/*
 * Copyright 2013 SAMSUNG SDS Co., Ltd. All rights reserved
 *
 */
package org.anyframe.plugin.board.domain;

import java.util.Vector;

/**
 * This class is provide list of all column's value. 
 */
public class ColInfos {

	private final Vector<ColInfo> columns;

	public ColInfos() {
		columns = new Vector<ColInfo>();
	}

	public void setColumns(ColInfo column) {
		columns.addElement(column);
	}

	public Vector<ColInfo> getColumns() {
		return columns;
	}

	public String toString() {
		StringBuilder sb = new StringBuilder(getClass().getSimpleName()).append("[");
		for (int i = 0; i < columns.size(); i++) {
			sb.append(((ColInfo) columns.get(i)).toString());
		}
		sb.append("]");
		return sb.toString();
	}

}
