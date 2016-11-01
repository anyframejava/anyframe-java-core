/*
 * Copyright 2008-2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.anyframe.logmanager.log4mongo;

import java.util.Date;

import org.apache.log4j.spi.ErrorCode;
import org.apache.log4j.spi.LoggingEvent;
import org.log4mongo.MongoDbAppender;

import com.mongodb.DBObject;
import com.mongodb.MongoException;
import com.mongodb.util.JSON;

/**
 * @author Jaehyoung Eum
 * @deprecated use org.anyframe.logmanager.log4j.MongoDbAppender
 */
public class MongoDbPatternLayoutAppender extends MongoDbAppender {
	
	@Override
	public boolean requiresLayout() {
		return (true);
	}

	/**
	 * Inserts a BSON representation of a LoggingEvent into a MongoDB
	 * collection. A PatternLayout is used to format a JSON document containing
	 * data available in the LoggingEvent and, optionally, additional data
	 * returned by custom PatternConverters.
	 * <p>
	 * The format of the JSON document is specified in the
	 * .layout.ConversionPattern property.
	 * 
	 * @param loggingEvent
	 *            The LoggingEvent that will be formatted and stored in MongoDB
	 */
	@Override
	protected void append(final LoggingEvent loggingEvent) {
		if (isInitialized()) {
			DBObject bson = null;
			String json = layout.format(loggingEvent);

			if (json.length() > 0) {
				Object obj = JSON.parse(json);
				if (obj instanceof DBObject) {
					bson = (DBObject) obj;
				}
			}

			if (bson != null) {
				try {
					bson.put("timestamp", new Date(loggingEvent.getTimeStamp()));
					getCollection().insert(bson);
				} catch (MongoException e) {
					errorHandler.error("Failed to insert document to MongoDB", e, ErrorCode.WRITE_FAILURE);
				}
			}
		}
	}
}
