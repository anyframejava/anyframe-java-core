package org.anyframe.util;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * This class is ThreadLocalUtil Class
 * 
 * @author Youngmin Jo
 * 
 */
public class ThreadLocalUtil {

	private static ThreadLocal<Map<String, Object>> threadLocal = new ThreadLocal<Map<String, Object>>();

	private static Map<String, Object> getThreadLocal() {
		if (threadLocal.get() == null) {
			Map<String, Object> sharedInfo = new HashMap<String, Object>();
			threadLocal.set(sharedInfo);
		}
		return threadLocal.get();
	}
	
	public static void add(String key, Object object){
		getThreadLocal().put(key, object);
	}
	
	public static Object get(String key){
		return getThreadLocal().get(key);
	}

	public static boolean isExist(String key){
		Object object = getThreadLocal().get(key);
		if(object != null) { return true;
		}else{
			return false;
		}
	}
	
	public static void clearSharedInfo() {
		getThreadLocal().clear();
		threadLocal.set(null);
	}
	
	public static String[] getThreadLocalKeys(){
		String[] arrKeys = new String[getThreadLocal().size()];		
		Iterator<String> keyIter = getThreadLocal().keySet().iterator();
		int i = 0;
		while(keyIter.hasNext()){
			arrKeys[i] = keyIter.next();
			i++;
		}
		return arrKeys;
	}
	
	public static int size(){
		return getThreadLocal().size();
	}
	
	public static Object[] getThreadLocalValues(){
		
		int size = size();
		
		String[] arrKeys = getThreadLocalKeys();
		Object[] values = new Object[size];
		
		for( int i = 0 ; i < size ; i ++ ){
			values[i] = getThreadLocal().get(arrKeys[i]);
		}
		return values;
	}
	
	public static void toPrintString(){
		
		int size = size();
		
		StringBuffer str = new StringBuffer();
		String[] keys = getThreadLocalKeys();
		Object[] values = getThreadLocalValues();
		
		for ( int i = 0 ; i < size ; i ++ ){
			str.append("  " + keys[i] + " = " + values[i] + " \n");
		}
		System.out.println(str.toString());
	}
}
