package org.anyframe.plugin.common;
import java.util.Date;

public class RestError {
	
	private Date timestamp;

    private int status;

    private String errorCode;

    private String error;

    private String exception;

    private String className;
    
    private String methodName;

	public RestError(Date timestamp, int status, String errorCode,
			String error, String exception, String className, String methodName) {
		super();
		this.timestamp = timestamp;
		this.status = status;
		this.errorCode = errorCode;
		this.error = error;
		this.exception = exception;
		this.className = className;
		this.methodName = methodName;
		
	}

	public Date getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public String getException() {
		return exception;
	}

	public void setException(String exception) {
		this.exception = exception;
	}
	
	public String getClassName(){
		return className;
	}
	
	public void setClassName(String className) {
		this.className = className;
	}
	
	public String getMethodName(){
		return methodName;
	}
	
	public void setMethodName(String methodName) {
		this.methodName = methodName;
	}
    
}