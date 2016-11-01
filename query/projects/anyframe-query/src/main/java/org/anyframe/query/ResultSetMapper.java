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

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * This is a class for the role of mapping resultset to DTOs.
 * 
 * @author SoYon Lim
 */
public interface ResultSetMapper {
	// 2009.01.15 - custom resultset mapper
	Object mapRow(ResultSet resultSet) throws SQLException;
}
