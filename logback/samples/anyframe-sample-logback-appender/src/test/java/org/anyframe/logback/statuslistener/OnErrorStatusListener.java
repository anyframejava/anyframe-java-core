package org.anyframe.logback.statuslistener;

import ch.qos.logback.core.spi.ContextAwareBase;


/**
 * This class is a sample StatusListener
 * to check logging error
 * 
 * @author Sunghoon Son
 */
import ch.qos.logback.core.spi.LifeCycle;
import ch.qos.logback.core.status.Status;
import ch.qos.logback.core.status.StatusListener;
import ch.qos.logback.core.util.StatusPrinter;


/**
 * This class is a sample StatusListener  
 * to check error.
 * 
 * @author Sunghoon Son
 */

public class OnErrorStatusListener extends ContextAwareBase implements StatusListener, LifeCycle {
	
	private boolean isStarted = false;
	
	public void addStatusEvent(Status status) {
		if (!isStarted()){
			return ;
		}
		
		if (status.getLevel() == Status.ERROR){
			if (status.getThrowable() != null){
				System.err.println(status.getThrowable().getClass());
			}
			print(status);
		}
	}
	
	private void print(Status status) {
	    StringBuilder sb = new StringBuilder();
	    StatusPrinter.buildStr(sb, "", status);
	    System.err.print(sb);
	}

	public boolean isStarted() {
		return isStarted;
	}

	public void start() {
		isStarted = true;
	}

	public void stop() {
		isStarted = false;
	}

}
