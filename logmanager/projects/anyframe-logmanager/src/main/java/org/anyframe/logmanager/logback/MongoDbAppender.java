/* 
 * Copyright (C) 2002-2012 Robert Stewart (robert@wombatnation.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
package org.anyframe.logmanager.logback;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Date;

import org.anyframe.logmanager.exception.AuthenticationException;
import org.anyframe.util.StringUtil;

import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.AppenderBase;
import ch.qos.logback.core.status.ErrorStatus;

import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.Mongo;

/**
 * MongoDB Appender for Logback
 *
 * @author jaehyoung.eum
 * @since 1.5.1
 */
public class MongoDbAppender extends AppenderBase<ILoggingEvent> {
	
	private static final String KEY_APP_NAME = "appName"; 
	private static final String KEY_TIMESTAMP = "timestamp";
	private static final String KEY_MESSAGE = "message";
	private static final String KEY_LEVEL = "level";
	private static final String KEY_LOGGER = "logger";
	private static final String KEY_CLASS = "className";
	private static final String KEY_METHOD = "methodName";
	private static final String KEY_FILENAME = "fileName";
	private static final String KEY_LINENUMBER = "lineNumber";
	private static final String KEY_THREAD = "thread";
	private static final String KEY_SERVER_ID = "serverId";
	
    private String hostname = "localhost";
    private int port = 27017;
    private String userName = "";
    private String password = "";
    private String databaseName = "logging";
    private String collectionName = "moviefinderlogs";
    
    private Mongo mongo;
    private DBCollection collection;
    
    
    
    /**
	 * @param hostname the hostname to set
	 */
	public void setHostname(String hostname) {
		this.hostname = hostname;
	}


	/**
	 * @param port the port to set
	 */
	public void setPort(int port) {
		this.port = port;
	}


	/**
	 * @param userName the userName to set
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}


	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}


	/**
	 * @param databaseName the databaseName to set
	 */
	public void setDatabaseName(String databaseName) {
		this.databaseName = databaseName;
	}


	/**
	 * @param collectionName the collectionName to set
	 */
	public void setCollectionName(String collectionName) {
		this.collectionName = collectionName;
	}


	@Override
    public void start() {
        try {
            mongo = new Mongo(hostname, port);
            DB db = mongo.getDB(databaseName);
            
            if (!StringUtil.isEmptyTrimmed(userName)) {
                if (!db.authenticate(userName, password.toCharArray())) {
                    throw new AuthenticationException("Unable to authenticate with MongoDB server.");
                }
                password = null;
            }
            
            collection = db.getCollection(collectionName);
        } catch (Exception e) {
            addStatus(new ErrorStatus("Failed to initialize MondoDB", this, e));
            return;
        }
        super.start();
    }

    
    @Override
    public void stop() {
        mongo.close();
        super.stop();
    }

    @Override
    protected void append(ILoggingEvent loggingEvent) {

        BasicDBObjectBuilder objectBuilder = null;
        if(loggingEvent.getMDCPropertyMap() != null && !loggingEvent.getMDCPropertyMap().isEmpty()) {
        	objectBuilder = BasicDBObjectBuilder.start(loggingEvent.getMDCPropertyMap());
            objectBuilder.add(KEY_APP_NAME, loggingEvent.getMDCPropertyMap().get(KEY_APP_NAME));
        }else{
        	objectBuilder = BasicDBObjectBuilder.start();
        	objectBuilder.add(KEY_APP_NAME, "UNKNOWN");
        }
        
        objectBuilder.add(KEY_TIMESTAMP, new Date(loggingEvent.getTimeStamp()))
        	.add(KEY_MESSAGE, loggingEvent.getFormattedMessage())
        	.add(KEY_LEVEL, loggingEvent.getLevel().toString())
        	.add(KEY_LOGGER, loggingEvent.getLoggerName())
        	.add(KEY_THREAD, loggingEvent.getThreadName());
        
        if(loggingEvent.getCallerData() != null) {
       		objectBuilder.add(KEY_CLASS, loggingEvent.getCallerData()[0].getClassName())
	       		.add(KEY_METHOD, loggingEvent.getCallerData()[0].getMethodName())
	       		.add(KEY_FILENAME, loggingEvent.getCallerData()[0].getFileName())
	       		.add(KEY_LINENUMBER, loggingEvent.getCallerData()[0].getLineNumber());	
        }
        
        try{
			objectBuilder.add(KEY_SERVER_ID, InetAddress.getLocalHost().getHostAddress());
		} catch (UnknownHostException e) {
			objectBuilder.add(KEY_SERVER_ID, null);
		}
        
        collection.insert(objectBuilder.get());
    }
}
