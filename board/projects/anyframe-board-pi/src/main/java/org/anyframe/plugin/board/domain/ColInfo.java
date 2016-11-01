package org.anyframe.plugin.board.domain;

import java.io.Serializable;

/**
 * This class is domain class of board's columns information. 
 * @author Heewon Jung
 *
 */
public class ColInfo implements Serializable{

	private static final long serialVersionUID = 1L;

	/**
	 * DB 테이블명
	 */	
	private String tableName;
	
	/**
	 * 게시판 ID
	 */
	private String boardId;
	
	/**
	 * DB 테이블 컬럼명
	 */
	private String columnId;
	
	/**
	 * 항목명
	 */	
	private String fieldName;
	
	/**
	 * 항목Id
	 */	
	private String fieldId;
	
	/**
	 * 컬럼 DB 속성(VARCHAR, DATE 등)
	 */
	private String columnType;
	
	/**
	 * 컬럼 길이
	 */
	private String columnSize;
	
	/**
	 * 컬럼 속성(텍스트(한줄), 텍스트 (여러줄), 코드(콤보) 중 택1)
	 */
	private String columnAttribute;
	
	/**
	 * 목록화면에서 컬럼 사용 여부
	 */	
	private String useList;
	
	/**
	 * 조회화면에서 컬럼 사용 여부
	 */
	private String useView;
	
	/**
	 * 생성 설정 화면에서 컬럼 사용 여부
	 */
	private String useScreen;
	
	/**
	 * 필수 입력값인지의 여부
	 */
	private String isEssential;
	
	/**
	 * 확장 컬럼인지의 여부
	 */
	private String isExpanded;
	
	private String listOrder = "0";
	
	private String viewOrder = "0";
	
	public String getListOrder() {
		return listOrder;
	}

	public void setListOrder(String listOrder) {
		this.listOrder = listOrder;
	}

	public String getViewOrder() {
		return viewOrder;
	}

	public void setViewOrder(String viewOrder) {
		this.viewOrder = viewOrder;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public String getBoardId() {
		return boardId;
	}

	public void setBoardId(String boardId) {
		this.boardId = boardId;
	}

	public String getColumnId() {
		return columnId;
	}

	public void setColumnId(String columnId) {
		this.columnId = columnId;
	}

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public String getColumnType() {
		return columnType;
	}

	public void setColumnType(String columnType) {
		this.columnType = columnType;
	}

	public String getColumnSize() {
		return columnSize;
	}

	public void setColumnSize(String columnSize) {
		this.columnSize = columnSize;
	}

	public String getColumnAttribute() {
		return columnAttribute;
	}

	public void setColumnAttribute(String columnAttribute) {
		this.columnAttribute = columnAttribute;
	}

	public String getUseList() {
		return useList;
	}

	public void setUseList(String useList) {
		this.useList = useList;
	}

	public String getUseView() {
		return useView;
	}

	public void setUseView(String useView) {
		this.useView = useView;
	}

	public String getIsEssential() {
		return isEssential;
	}

	public void setIsEssential(String isEssential) {
		this.isEssential = isEssential;
	}

	public String getUseScreen() {
		return useScreen;
	}

	public void setUseScreen(String useScreen) {
		this.useScreen = useScreen;
	}

	public String getIsExpanded() {
		return isExpanded;
	}

	public void setIsExpanded(String isExpanded) {
		this.isExpanded = isExpanded;
	}

	public String getFieldId() {
		return fieldId;
	}

	public void setFieldId(String fieldId) {
		this.fieldId = fieldId;
	}


}
