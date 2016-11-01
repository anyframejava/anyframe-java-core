package ${packageName}.attachfile.domain;

import java.io.Serializable;

public class PostAttachFile implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String postId;
	
	private String attachFileId;
	
	private String attachFileName;
	
	private long attachFileSize = 0;
	
	private String attachFilePath;
	
	private String attachFileSizeString;
	
	public String getPostId() {
		return postId;
	}
	public void setPostId(String postId) {
		this.postId = postId;
	}
	public String getAttachFileId() {
		return attachFileId;
	}
	public void setAttachFileId(String attachFileId) {
		this.attachFileId = attachFileId;
	}
	public String getAttachFileName() {
		return attachFileName;
	}
	public void setAttachFileName(String attachFileName) {
		this.attachFileName = attachFileName;
	}
	public long getAttachFileSize() {
		return attachFileSize;
	}
	public void setAttachFileSize(long attachFileSize) {
		this.attachFileSize = attachFileSize;
	}
	public String getAttachFilePath() {
		return attachFilePath;
	}
	public void setAttachFilePath(String attachFilePath) {
		this.attachFilePath = attachFilePath;
	}
	public String getAttachFileSizeString() {
		return attachFileSizeString;
	}
	public void setAttachFileSizeString(String attachFileSizeString) {
		this.attachFileSizeString = attachFileSizeString;
	}
}
