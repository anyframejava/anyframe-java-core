package org.anyframe.plugin.board.service;

import java.io.File;
import java.util.Collection;
import java.util.List;

import org.anyframe.plugin.board.domain.BoardInfo;
import org.anyframe.plugin.board.domain.ColInfo;

/**
 * This class is Interface class for generate board. 
 * @author Heewon Jung
 *
 */
public interface GenerateBoardService {

	/**
	 * Get list of default column. Default columns is essential columns for board. 
	 * And that were defined classpath:/board.columns.definition.xml file. 
	 * You can add or delete about that. but not recommend.
	 * @return List<ColInfo>
	 * 				 list of ColInfo object.
	 * @throws Exception
	 */
	List<ColInfo> getDefaultColumnList() throws Exception;

	/**
	 * Generate source code of board that based on user's input value.
	 * @param boardInfo
	 * 				Basic information of board.
	 * @param colInfoList
	 * 				List of columns. That include default columns and user defined columns.
	 * @throws Exception
	 */
	void generate(BoardInfo boardInfo, List<ColInfo> colInfoList) throws Exception;

	/**
	 * Check the reserved column's name of database and already defined column's name. 
	 * @param columnId
	 * 				Column id.
	 * @return boolean
	 * 				Whether column name is duplicated or not.
	 * @throws Exception
	 */
	boolean isDuplicatedColumnId(String columnId) throws Exception;
	
	/**
	 * Get all template files. It is supposed to generate of board's source code.
	 * @return Collection<File>
	 * 				File's list.
	 * @throws Exception
	 */
	Collection<File> getTemplates() throws Exception;

}
