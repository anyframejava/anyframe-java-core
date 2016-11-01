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
package org.anyframe.query.impl.jdbc.setter;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;
import java.util.Collection;
import java.util.Iterator;

import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.jdbc.core.ParameterDisposer;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.SqlTypeValue;
import org.springframework.jdbc.core.StatementCreatorUtils;
import org.springframework.jdbc.support.lob.LobHandler;

/**
 * Simple adapter for PreparedStatementSetter that applies given arrays of
 * arguments and JDBC argument types. We changed
 * org.springframework.jdbc.core.ArgTypePreparedStatementSetter into
 * org.anyframe.query.impl.jdbc.setter.PreparedStatementArgTypeSetter in
 * Anyframe.
 * <ul>
 * <li>We changed some logic for processing LOB data.</li> 
 * </ul>
 * 
 * @author Juergen Hoeller
 * @author modified by SoYon Lim
 * @author modified by JongHoon Kim
 */
public class PreparedStatementArgTypeSetter implements PreparedStatementSetter,
		ParameterDisposer {

	private final Object[] args;

	private final int[] argTypes;

	private final LobHandler lobHandler;

	/**
	 * Create a new ArgTypePreparedStatementSetter for the given arguments.
	 * 
	 * @param args
	 * @param argTypes
	 */
	public PreparedStatementArgTypeSetter(Object[] args, int[] argTypes,
			LobHandler lobHandler) {
		if (args != null && argTypes == null) {
			throw new InvalidDataAccessApiUsageException(
					"Query Service : args and argTypes parameters must match - query parameter types must not be null, "
							+ "because query parameter values isn't null [the size of query parameter values is "
							+ args.length + "].");
		}

		if (args == null && argTypes != null) {
			throw new InvalidDataAccessApiUsageException(
					"Query Service : args and argTypes parameters must match - query parameter values must not be null, "
							+ "because query parameter types isn't null [the size of query parameter types is "
							+ argTypes.length + "].");
		}

		if (args != null && args.length != argTypes.length) {
			throw new InvalidDataAccessApiUsageException(
					"Query Service : args and argTypes parameters must match - the size of query parameter values must be same as "
							+ " that of query parameter types [the size of query parameter values is "
							+ args.length
							+ " and the size of query parameter types is "
							+ argTypes.length + "].");
		}

		this.args = args;
		this.argTypes = argTypes;
		this.lobHandler = lobHandler;
	}

	/**
	 * Each input parameter value is set at PreparedStatement.
	 */
	public void setValues(PreparedStatement ps) throws SQLException {
		int argIndx = 1;
		if (this.args != null) {
			if (this.argTypes == null) {
				for (int i = 0; i < this.args.length; i++) {
					StatementCreatorUtils.setParameterValue(ps, i + 1,
							SqlTypeValue.TYPE_UNKNOWN, null, this.args[i]);
				}
			} else {
				for (int i = 0; i < this.args.length; i++) {
					Object arg = this.args[i];
					if (arg instanceof Collection<?>
							&& this.argTypes[i] != Types.ARRAY) {
						Collection<?> entries = (Collection<?>) arg;
						for (Iterator<?> it = entries.iterator(); it.hasNext();) {
							Object entry = it.next();
							StatementCreatorUtils.setParameterValue(ps,
									argIndx++, this.argTypes[i], null, entry);
						}
					} else {
						if (this.argTypes[i] == Types.BLOB)
							lobHandler.getLobCreator().setBlobAsBytes(ps,
									argIndx++, (byte[]) arg);
						else if (this.argTypes[i] == Types.CLOB)
							lobHandler.getLobCreator().setClobAsString(ps,
									argIndx++, (String) arg);
						else
							StatementCreatorUtils.setParameterValue(ps,
									argIndx++, this.argTypes[i], null, arg);
					}
				}
			}
		}
	}

	/**
	 * Clean up all parameter values which were passed to.
	 */
	public void cleanupParameters() {
		StatementCreatorUtils.cleanupParameters(this.args);
	}
}
