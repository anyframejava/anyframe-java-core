package org.anyframe.plugin.scheduling.listener;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.quartz.JobExecutionContext;
import org.quartz.Trigger;
import org.quartz.TriggerListener;

public class GlobalTriggerListener implements TriggerListener {
	Log logger = LogFactory.getLog(GlobalTriggerListener.class);
	String listenerType = "Non global";

	public void setListenerType(String listenerType) {
		this.listenerType = listenerType;
	}

	public void triggerFired(Trigger trigger, JobExecutionContext ctx) {
		logger.info("Scheduled " + trigger.getJobName() + " Fired!!");
	}

	public boolean vetoJobExecution(Trigger trigger, JobExecutionContext ctx) {
		logger.info("Scheduled " + trigger.getJobName() + " Executed!!");
		return false;
	}

	public void triggerComplete(Trigger trigger, JobExecutionContext ctx,
			int arg) {
		logger.info("Scheduled " + trigger.getJobName() + " Completed!!");
	}

	public void triggerMisfired(Trigger trigger) {
		logger.error("Scheduled " + trigger.getJobName() + " Misfired!!");
	}

	public String getName() {
		return "GlobalTriggerListener";
	}

}
