/*
 * Copyright 2002-2008 the original author or authors.
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
package org.anyframe.query;

import org.anyframe.exception.BaseException;
import org.springframework.context.MessageSource;

/**
 * This is an exception class for handling the
 * exceptions in operating QueryService.
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class QueryServiceException extends BaseException {

    private static final long serialVersionUID = 1L;

    private String sqlErrorCode = "";
    private String sqlErrorMessage = "";

    /**
     * Constructor with a message.
     * @param message
     *        the message of this exception
     */
    public QueryServiceException(String message) {
        super(message);
    }

    /**
     * Constructor with a message and an exception.
     * @param message
     *        the message of this exception
     * @param exception
     *        the exception that is wrapped in this
     *        exception
     */
    public QueryServiceException(String message, Throwable exception) {
        super(message, exception);
    }

    /**
     * Constructor with a messageSource, message key
     * and message parameters
     * @param messageSource
     *        messageSource handling the message
     *        resource
     * @param messageKey
     *        the key of arbitrary message defined in
     *        message resource
     * @param messageParameters
     *        the variable values for replacing in the
     *        arbitray message
     */
    public QueryServiceException(MessageSource messageSource,
            String messageKey, Object[] messageParameters) {
        super(messageSource, messageKey, messageParameters);
    }

    /**
     * Constructor with a messageSource and message key
     * @param messageSource
     *        messageSource handling the message
     *        resource
     * @param messageKey
     *        the key of arbitrary message defined in
     *        message resource
     */
    public QueryServiceException(MessageSource messageSource, String messageKey) {
        super(messageSource, messageKey);
    }

    /**
     * Constructor with a messageSource, message key,
     * message parameters and an exception.
     * @param messageSource
     *        messageSource handling the message
     *        resource
     * @param messageKey
     *        the key of arbitrary message defined in
     *        message resource
     * @param messageParameters
     *        the variable values for replacing in the
     *        arbitray message
     * @param exception
     *        the exception that is wrapped in this
     *        exception
     */
    public QueryServiceException(MessageSource messageSource,
            String messageKey, Object[] messageParameters, Throwable exception) {
        super(messageSource, messageKey, messageParameters, exception);
    }

    /**
     * Constructor with a messageSource, message key
     * and an exception.
     * @param messageSource
     *        messageSource handling the message
     *        resource
     * @param messageKey
     *        the key of arbitrary message defined in
     *        message resource
     * @param exception
     *        the exception that is wrapped in this
     *        exception
     */
    public QueryServiceException(MessageSource messageSource,
            String messageKey, Throwable exception) {
        super(messageSource, messageKey, exception);
    }

    /**
     * Transmit the SQL ErrorCode occurred in executing
     * the query
     * @return SQL Error Code occurred in executing the
     *         query
     */
    public String getSqlErrorCode() {
        return sqlErrorCode;
    }

    /**
     * Set the SQL ErrorCode occurred in executing the
     * query
     * @param sqlErrorCode
     *        the SQL Error Code occurred in executing
     *        the query
     */
    public void setSqlErrorCode(String sqlErrorCode) {
        this.sqlErrorCode = sqlErrorCode;
    }

    /**
     * Transmit the SQL ErrorMessage occurred in
     * executing the query
     * @return SQL Error message occurred in executing
     *         the query
     */
    public String getSqlErrorMessage() {
        return sqlErrorMessage;
    }

    /**
     * Set the SQL Error message occurred in executing
     * the query
     * @param sqlErrorMessage 
     * 			the SQL Error message occurred in
     *         executing the query
     */
    public void setSqlErrorMessage(String sqlErrorMessage) {
        this.sqlErrorMessage = sqlErrorMessage;
    }
}
