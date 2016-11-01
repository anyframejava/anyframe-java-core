package org.anyframe.plugin.flex.query.jmspush;

import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.util.NumberUtil;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

@Service("stockService")
public class StockService {

	@Inject
	@Named("jmsTemplate")
	private JmsTemplate jmsTemplate;

	private int year = 2011;
	private int month = 1;
	private int day = 1;
	private int preValue = 10000;
	private int max = 0;
	private int min = 9999999;
	
	public void sendMessage(Map message) {
		jmsTemplate.convertAndSend("jmsTopic", message);
	}
	
	public void makeRamdomMessage() {
		
		Map message = new HashMap();
		
		GregorianCalendar calendar = new GregorianCalendar(year, (month - 1), 1); 
		int maxday = calendar.getActualMaximum((calendar.DAY_OF_MONTH));
		
		String date = year + "/" + month + "/" + day;
		
		double ratio = (double)(NumberUtil.getRandomNumber(Integer.class, -10, 10))/100;
		double highRatio = (double)(NumberUtil.getRandomNumber(Integer.class, 0, 10))/100;
		double lowRatio = (double)(NumberUtil.getRandomNumber(Integer.class, 0, 10))/100;
		double closeRatio = (double)(NumberUtil.getRandomNumber(Integer.class, -10, 10))/100;
		
		int openValue = (int) (preValue * (1 + ratio));
		int highValue = (int) (openValue*( 1 + highRatio ));
		int lowValue = (int) (openValue*( 1 - lowRatio ));
		int closeValue = (int) (openValue*( 1+closeRatio ));
		int tradingVolumn = NumberUtil.getRandomNumber(Integer.class, 10000, 10000000);
		
		if (min > closeValue ){
			min = closeValue;
		}else if( max < closeValue ){
			max  = closeValue;
		}
		
		message.put("date", date);
		message.put("open", openValue);
		message.put("high",highValue);
		message.put("low", lowValue);
		message.put("close", closeValue);
		message.put("max", max);
		message.put("min", min);
		message.put("tradingVolumn", tradingVolumn);
		
		sendMessage(message);
		
		day = day + 1;
		if( day > maxday ){
			day = 1;
			month = month + 1;
			if(month > 12){
				month = 1;
				year = year + 1;
			}
		}
		
		preValue = closeValue;
	}
}
