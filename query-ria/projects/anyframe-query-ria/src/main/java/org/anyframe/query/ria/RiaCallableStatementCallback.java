/*
 * Copyright 2002-2012 the original author or authors.
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
package org.anyframe.query.ria;

import java.util.List;
import java.util.Map;

import org.anyframe.query.QueryInfo;
import org.springframework.jdbc.core.CallableStatementCallback;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.support.lob.LobHandler;

/**
 * @author JongHoon Kim
 */
@SuppressWarnings("unchecked")
public interface RiaCallableStatementCallback extends CallableStatementCallback {
	// In the case of Oracle, CUSOR sqlType is -10.
	public final int CUSOR = -10;

	public void setSQLParams(List<SqlParameter> sqlOutParmas);

	public void setQueryInfo(QueryInfo queryInfo);

	public void setLobHandler(LobHandler lobHandler);
	
	public void setNullCheckInfos(Map<String, String> nullCheckInfos);
}
