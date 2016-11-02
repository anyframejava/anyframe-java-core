package org.anyframe.plugin.board.service;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.board.domain.BoardInfo;
import org.anyframe.plugin.board.domain.ColInfo;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * This class generate source code of board. 
 * You can make board so fast and easily using this class. 
 * 
 * @author Heewon Jung
 *
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/main/resources/spring/context-*.xml" })
public class GenerateBoardServiceTest {
	
	@Inject
	@Named("generateBoardService")
	private GenerateBoardService generateBoardService;

	//@Test
	public void generate() throws Exception {
		//set initialized data
		BoardInfo boardInfo = new BoardInfo();
		boardInfo.setBoardName("myboard");
		boardInfo.setBoardTitle("자유게시판");
		boardInfo.setBoardType("B");
		boardInfo.setPackageName("test");
		boardInfo.setUseComment("N");
		boardInfo.setTableName("MY_BOARD");
		
		List<ColInfo> colInfos = this.generateBoardService.getDefaultColumnList();
		
		ColInfo colInfo = new ColInfo();
		colInfo.setColumnId("MY_COL");
		colInfo.setColumnSize("255");
		colInfo.setColumnType("VARCHAR");
		colInfo.setFieldName("컬럼1");
		colInfo.setIsExpanded("1");
		colInfo.setUseList("1");
		colInfo.setUseScreen("1");
		colInfo.setUseView("1");
		colInfo.setIsEssential("1");
		
		colInfos.add(colInfo);
		
		BoardInfo boardInfoList = new BoardInfo();
		boardInfoList.setBoardName("wonboard");
		boardInfoList.setBoardTitle("희게시판 ");
		boardInfoList.setBoardType("L");
		boardInfoList.setPackageName("test2");
		boardInfoList.setUseComment("Y");
		boardInfoList.setTableName("HEE_BOARD");
		boardInfoList.setUseAttachFile("Y");
		boardInfoList.setAttachFileExtensions("jpg,ext");
		
		List<ColInfo> colInfosList = this.generateBoardService.getDefaultColumnList();
		
		ColInfo colInfoList = new ColInfo();
		colInfoList.setColumnId("HEE_COL");
		colInfoList.setColumnSize("55");
		colInfoList.setColumnType("VARCHAR");
		colInfoList.setFieldName("컬럼1");
		colInfoList.setColumnAttribute("2");
		colInfoList.setIsExpanded("1");
		colInfoList.setUseList("1");
		colInfoList.setUseScreen("1");
		colInfoList.setUseView("1");
		colInfoList.setIsEssential("1");
		ColInfo colInfoList2 = new ColInfo();
		colInfoList2.setColumnId("HEE_COL2");
		colInfoList2.setColumnSize("55");
		colInfoList2.setColumnType("VARCHAR");
		colInfoList2.setFieldName("컬럼2");
		colInfoList2.setIsExpanded("1");
		colInfoList2.setUseScreen("1");
		colInfoList2.setUseView("1");
		colInfoList2.setIsEssential("1");
		
		colInfosList.add(colInfoList);
		colInfosList.add(colInfoList2);
		
		generateBoardService.generate(boardInfo, colInfos);
		generateBoardService.generate(boardInfoList, colInfosList);
	}
	
}
