package org.anyframe.sample.hibernate.model.datatype;

import java.sql.Blob;

public class BlobDataType {

	private int fileId;
	private String fileName;
	private java.math.BigDecimal fileSize;
	private byte[] fileContentByte;
	private Blob fileContentBlob;

	public int getFileId() {
		return fileId;
	}

	public void setFileId(int fileId) {
		this.fileId = fileId;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public java.math.BigDecimal getFileSize() {
		return fileSize;
	}

	public void setFileSize(java.math.BigDecimal fileSize) {
		this.fileSize = fileSize;
	}

	public byte[] getFileContentByte() {
		return fileContentByte;
	}

	public void setFileContentByte(byte[] fileContentByte) {
		this.fileContentByte = fileContentByte;
	}

	public Blob getFileContentBlob() {
		return fileContentBlob;
	}

	public void setFileContentBlob(Blob fileContentBlob) {
		this.fileContentBlob = fileContentBlob;
	}
}
