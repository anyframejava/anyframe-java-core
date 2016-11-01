package org.anyframe.plugin.fileupload.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.anyframe.plugin.fileupload.FileMeta;
import org.anyframe.plugin.fileupload.FileUpload;
import org.anyframe.plugin.fileupload.FileUploadAgent;
import org.anyframe.plugin.fileupload.FileUploadConfig;
import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.ProgressListener;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.servlet.ServletRequestContext;
import org.apache.commons.fileupload.util.Streams;

public class FileUploadLocalDisk implements FileUpload {
	
	private static int DISK_THRESHOLD_SIZE = 1024 * 1024 * 3;	//3MB
	
	private String targetPath = "";
	private String tempPath = "";
	private long maxFileSize = -1L;
	
	private static long content_length = 0;
	private static long readbyte_length = 0;
	
	public FileUploadLocalDisk() {
	}	

	public void setConfiguration(FileUploadConfig config) {
		tempPath = config.getValue(FileUploadConfig.COMMON_TEMP_PATH);
		targetPath = config.getValue(FileUploadConfig.KEY_DISK_PATH);
		maxFileSize = Long.valueOf( config.getValue(FileUploadConfig.COMMON_FILE_MAXSIZE) );
	}
	
	public void init(HttpServletRequest request) {		
		content_length = (new ServletRequestContext(request)).contentLength();
		readbyte_length = 0;
	}
	
	public boolean save(HttpServletRequest request)  throws FileUploadException, IOException {
		
		if (targetPath.length() <= 0) return false;
		
		boolean isMultipart = ServletFileUpload.isMultipartContent(request);

        if (isMultipart) {
        	
        	DiskFileItemFactory factory = new DiskFileItemFactory();
        	factory.setSizeThreshold(DISK_THRESHOLD_SIZE);
        	factory.setRepository(new File(tempPath));
        	
        	ServletFileUpload hUpload = new ServletFileUpload(factory);
        	
        	ProgressListener progressTest = new ProgressListener() {
        		
        		public void update(long pBytesRead, long pContentLength, int pItems) {
        			
        			if (pContentLength != -1) {
        				readbyte_length = pBytesRead;
        			}        			
        		}        		
        	};        	
        	hUpload.setProgressListener(progressTest);
        	hUpload.setFileSizeMax(maxFileSize);
        	
        	FileItemIterator itor;
        	
			itor = hUpload.getItemIterator(request);
			
			while (itor.hasNext()) {
        		
        		FileItemStream fiStrm = itor.next();
        		
        		String fname = FileMeta.getFileNameOnly(fiStrm.getName());
        		
        		if (!fiStrm.isFormField()) {        			
        			InputStream inStrm = fiStrm.openStream();		//INFO:  while Streaming, being blocked...
        			
        			File file  = new File(targetPath + "/" + fname);
        			FileOutputStream fo = new FileOutputStream(file);
        			
        			Streams.copy(inStrm, fo, true);
        			inStrm.close();
        		}
        	}				
        }	
		
		return true;
	}
	
	public long getProgress(HashMap<String, Long> map) {
		
		long nProgress = (content_length <= 0) ? 0 : (int)(((float)readbyte_length / (float)content_length) * 100L);
		
		map.put(FileUploadAgent.PROGRESS_PARAM1_PROGRESS, nProgress);
		map.put(FileUploadAgent.PROGRESS_PARAM2_CONTENTBYTE, content_length);
		map.put(FileUploadAgent.PROGRESS_PARAM3_READBYTE, readbyte_length);

		return nProgress;
	}
}
