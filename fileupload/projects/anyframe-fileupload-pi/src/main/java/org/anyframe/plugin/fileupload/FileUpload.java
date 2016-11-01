package org.anyframe.plugin.fileupload;

import java.io.IOException;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.fileupload.FileUploadException;

public interface FileUpload {

	public void setConfiguration(FileUploadConfig config);
	public void init(HttpServletRequest request); 
	public boolean save(HttpServletRequest request) throws FileUploadException, IOException;
	public long getProgress(HashMap<String, Long> map);
}
