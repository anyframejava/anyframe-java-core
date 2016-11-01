package org.anyframe.plugin.board.domain;

import java.io.Serializable;

/**
 * This class is domain class of board's basic information.
 * @author Heewon Jung
 *
 */
public class BoardInfo implements Serializable{

	private static final long serialVersionUID = 1L;

	/**
	 *  Board Title. ex>Free board
	 */
	private String boardTitle;
	
	/**
	 * Board's English name. It is using as service name and folder name.
	 */
	private String boardName;
	
	/**
	 * Real table name of database.
	 */
	private String tableName;
	
	/** 
	 * Java package name where board's source code be generated.
	 */
	private String packageName;
	
	/**
	 * Board type. This is provide two type. One is list type('L'), the other is blog type('B'). 
	 * default = 'L'
	 */
	private String boardType = "L";
	
	/**
	 * Whether using comment or not.
	 * default = 'Y'
	 */
	private String useComment = "Y";
	
	/**
	 * Whether using anonymous mode or not.
	 * default = 'N'
	 */
	private String useAnonymous = "N";
	
	/**
	 * Whether using attach fiile or not.
	 * default = 'N'
	 */
	private String useAttachFile = "N";
	
	/**
	 * Size of attached file.
	 */
	private String attachFileSize;

	/**
	 * Extenstion name of restrict files.
	 */
	private String attachFileExtensions;

	public String getBoardTitle() {
		return boardTitle;
	}

	public void setBoardTitle(String boardTitle) {
		this.boardTitle = boardTitle;
	}

	public String getBoardName() {
		return boardName;
	}

	public void setBoardName(String boardName) {
		this.boardName = boardName;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	
	
	public String getPackageName() {
		return packageName;
	}

	public void setPackageName(String packageName) {
		this.packageName = packageName;
	}

	public String getBoardType() {
		return boardType;
	}

	public void setBoardType(String boardType) {
		this.boardType = boardType;
	}

	public String getUseComment() {
		return useComment;
	}

	public void setUseComment(String useComment) {
		this.useComment = useComment;
	}

	public String getUseAnonymous() {
		return useAnonymous;
	}

	public void setUseAnonymous(String useAnonymous) {
		this.useAnonymous = useAnonymous;
	}

	public String getUseAttachFile() {
		return useAttachFile;
	}

	public void setUseAttachFile(String useAttachFile) {
		this.useAttachFile = useAttachFile;
	}

	public String getAttachFileSize() {
		return attachFileSize;
	}

	public void setAttachFileSize(String attachFileSize) {
		this.attachFileSize = attachFileSize;
	}

	public String getAttachFileExtensions() {
		return attachFileExtensions;
	}

	public void setAttachFileExtensions(String attachFileExtensions) {
		this.attachFileExtensions = attachFileExtensions;
	}
	
	
}
