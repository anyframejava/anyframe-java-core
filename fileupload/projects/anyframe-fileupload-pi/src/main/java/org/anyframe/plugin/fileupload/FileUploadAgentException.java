package org.anyframe.plugin.fileupload;

public class FileUploadAgentException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private final int messagecode;
	
	//define message code
	public static int FUA_ERROR_UNKNOWN 		= 0xFFFF;
	public static int FUA_ERROR_UPLOAD			= 0x1000;
	public static int FUA_ERROR_SIZE_LIMIT		= 0x1001;
	public static int FUA_ERROR_IO				= 0x1100;
	
	public FileUploadAgentException() 
	{
		this(FUA_ERROR_UNKNOWN, null, null);
	}

	public FileUploadAgentException(String msg) 
	{
		this(FUA_ERROR_UNKNOWN, msg, null);
	}

	public FileUploadAgentException(int msgCode, String msg) 
	{
		this(msgCode, msg, null);
	}	
	
	public FileUploadAgentException(Throwable cause) 
	{
		this(FUA_ERROR_UNKNOWN, null, cause);
	}

	public FileUploadAgentException(String msg, Throwable cause) 
	{
		this(FUA_ERROR_UNKNOWN, msg, cause);
	}
	
	public FileUploadAgentException(int msgCode, String msg, Throwable cause)
	{
		super(msg, cause);
		this.messagecode = msgCode;		
	}
	
	public int getMessageCode() 
	{
		return this.messagecode;
	}
	
	//TODO: translate code into message
	
}
