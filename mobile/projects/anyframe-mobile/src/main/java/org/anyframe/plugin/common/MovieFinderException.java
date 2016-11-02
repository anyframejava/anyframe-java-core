package org.anyframe.plugin.common;
public class MovieFinderException extends RuntimeException {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 8337320341191102354L;
	public static final long DEFAULT_ERROR_CODE = 1000L;
	
	private long errorCode;
	
	private String className;
	
	public long getErrorCode() {
		return errorCode;
	}

	public MovieFinderException() {
		this.errorCode = DEFAULT_ERROR_CODE;
	}

	public MovieFinderException(String message) {
		super(message);
		this.errorCode = DEFAULT_ERROR_CODE;
	}

	public MovieFinderException(Throwable cause) {
		super(cause);
		this.errorCode = DEFAULT_ERROR_CODE;
	}

	public MovieFinderException(String message, Throwable cause) {
		super(message, cause);
		this.errorCode = DEFAULT_ERROR_CODE;
	}
	
	public MovieFinderException(String message, Throwable cause, String className, String opName) {
		super(message, cause);
		this.errorCode = DEFAULT_ERROR_CODE;
	}

	public MovieFinderException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
		this.errorCode = DEFAULT_ERROR_CODE;
	}
	
	public MovieFinderException(long errorCode) {
		this.errorCode = errorCode;
	}

	public MovieFinderException(long errorCode, String message) {
		super(message);
		this.errorCode = errorCode;
	}

	public MovieFinderException(long errorCode, Throwable cause) {
		super(cause);
		this.errorCode = errorCode;
	}

	public MovieFinderException(long errorCode, String message, Throwable cause) {
		super(message, cause);
		this.errorCode = errorCode;
	}
	
	public MovieFinderException(String message, Throwable cause, Exception e) {
		super(message, cause);
		this.className = e.getMessage();
		
	}

	public MovieFinderException(long errorCode, String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
		this.errorCode = errorCode;
	}

}