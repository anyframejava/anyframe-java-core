package org.anyframe.query.impl.util;

import org.anyframe.util.StringUtil;

public class ColumnUtil {
	public static String changeColumnName(String mappingStyle, String columnName) {
		if (mappingStyle.equals("camel")) {
			return StringUtil.convertToCamelCase(columnName);
		} else if (mappingStyle.equals("lower"))
			return columnName.toLowerCase();
		else if (mappingStyle.equals("upper"))
			return columnName.toUpperCase();
		return columnName;
	}
}
