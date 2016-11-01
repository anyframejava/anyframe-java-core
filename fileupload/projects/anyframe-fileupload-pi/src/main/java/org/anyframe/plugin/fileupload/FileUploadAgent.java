package org.anyframe.plugin.fileupload;

import java.io.IOException;
import java.io.Serializable;
import java.util.HashMap;
import java.util.MissingResourceException;

import javax.servlet.http.HttpServletRequest;

import org.anyframe.plugin.fileupload.impl.FileUploadLocalDisk;
import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.FileUploadBase.FileSizeLimitExceededException;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.servlet.ServletRequestContext;

public class FileUploadAgent implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	public static String SESSION_OBJECT_NAME = "FileUploadAgent";
	public static String GETMETAREAL_PARAM = "filename";
	public static String PREPARE_PARAM = "utype";			// disk, remote, etc..
	public static String PROGRESS_PARAM1_PROGRESS = "progress";
	public static String PROGRESS_PARAM2_CONTENTBYTE = "contentbyte";
	public static String PROGRESS_PARAM3_READBYTE = "readbyte";
	
	private FileUploadConfig fuConfig = null;
	
	private HashMap<String, FileMeta> mapFileMeta = new HashMap<String, FileMeta>();  
	
	private Object upMutex = new Object();
	private Object getmetaMutex = new Object();
	private String uType = "";
	
	private FileUpload iCurFileUpload = null;	
	
	public FileUploadAgent() 
	{
		loadConfiguration();
	}
	
	private void init() 
	{
		mapFileMeta.clear();
	}
	
	private void loadConfiguration() 
	{
		if (fuConfig == null) {
			
			try {				
				fuConfig = new FileUploadConfig();				
			} catch (MissingResourceException e) {
				e.printStackTrace();
			}
		}
	}
	
	public void start(String utype)
	{
		this.uType = utype;
	}
	
	public void finish() 
	{
		this.init();
	}
	
	public boolean upload(HttpServletRequest request) throws FileUploadAgentException
	{
		boolean bSucc = false;
		String utype = this.uType;
		
		synchronized(upMutex) {
			
			try {
				
				FileUpload iFu = null;
				utype = utype.trim(); 
				
				if ("disk".equals(utype.toLowerCase())) {
					iFu = new FileUploadLocalDisk();
				}
				else if ("remote".equals(utype.toLowerCase())) {
					//TODO: implement..  (extension point)
				}
				
				if (iFu != null) {
					iCurFileUpload = iFu;
					iFu.setConfiguration(fuConfig);
					iFu.init(request);
					bSucc = iFu.save(request);
				}
				
			} catch (FileUploadException e) {
				e.printStackTrace();
				throw new FileUploadAgentException(FileUploadAgentException.FUA_ERROR_UPLOAD, e.getMessage());
			} catch (IOException e) {
				e.printStackTrace();
				if ( e.getCause().getClass().getName().equals(FileSizeLimitExceededException.class.getName()))
					throw new FileUploadAgentException(FileUploadAgentException.FUA_ERROR_SIZE_LIMIT, "exeeded the size limit : " + 
																	((FileSizeLimitExceededException)e.getCause()).getPermittedSize(), e);
				else
					throw new FileUploadAgentException(FileUploadAgentException.FUA_ERROR_IO, e.getMessage());
			} catch (Exception e) {
				e.printStackTrace();
				throw new FileUploadAgentException(FileUploadAgentException.FUA_ERROR_IO, e.getMessage());
			}

		}
		
		return bSucc;
	}
	
	public void getMetaFake(HttpServletRequest request) throws FileUploadAgentException
	{
		synchronized (getmetaMutex) {

			DiskFileItemFactory factory = new DiskFileItemFactory();
			ServletFileUpload hUpload = new ServletFileUpload(factory);

			try {

				FileItemIterator itor = hUpload.getItemIterator(request);

				while (itor.hasNext()) {

					FileItemStream fis = itor.next();

					long nContentSize = (new ServletRequestContext(request)).contentLength();

					FileMeta fm = new FileMeta(nContentSize, fis.getName());
					mapFileMeta.put(fm.getName(), fm);

					break;
				}

			} catch (FileUploadException e) {
				e.printStackTrace();
				throw new FileUploadAgentException(
						FileUploadAgentException.FUA_ERROR_UPLOAD,
						e.getMessage());
			} catch (IOException e) {
				e.printStackTrace();
				throw new FileUploadAgentException(
						FileUploadAgentException.FUA_ERROR_IO, e.getMessage());
			}

		}		
	}
	
	public FileMeta getMeta(String filename)
	{
		synchronized (getmetaMutex) {		

			FileMeta fmFound = mapFileMeta.get(filename);
			
			if (fmFound != null) {
				mapFileMeta.remove(filename);
			}
			
			return fmFound;			
		}
	}
	
	public HashMap<String, Long> getProgress() 
	{
		HashMap<String, Long> retMap = new HashMap<String, Long>();
		
		//init Map
		retMap.put(PROGRESS_PARAM1_PROGRESS, -1L);
		retMap.put(PROGRESS_PARAM2_CONTENTBYTE, -1L);
		retMap.put(PROGRESS_PARAM3_READBYTE, -1L);		
		
		if (iCurFileUpload != null)
			iCurFileUpload.getProgress(retMap);

		return retMap;
	}	
	
}
