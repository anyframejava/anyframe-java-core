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
package org.anyframe.mip.query.impl;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.anyframe.mip.query.MiPActionCommand;
import org.anyframe.mip.query.MiPQueryService;
import org.anyframe.mip.query.impl.jdbc.mapper.MiPCallableStatementCallbackHandler;
import org.anyframe.mip.query.impl.jdbc.mapper.MiPDataSetCallbackHandler;
import org.anyframe.mip.query.impl.jdbc.mapper.MiPPrintWriterCallbackHandler;
import org.anyframe.mip.query.impl.jdbc.setter.MiPDataSetSQLParameterSource;
import org.anyframe.mip.query.impl.jdbc.setter.MiPVariantSqlParameterSource;
import org.anyframe.mip.query.impl.jdbc.setter.MiPDataSetSQLParameterSource.ColumnValueExtractor;
import org.anyframe.query.QueryInfo;
import org.anyframe.query.exception.QueryException;
import org.anyframe.query.impl.jdbc.setter.DefaultDynamicSqlParameterSource;
import org.anyframe.query.ria.AbstractRiaQueryService;
import org.anyframe.query.ria.RiaCallableStatementCallback;
import org.anyframe.query.ria.RiaPrintWriterCallback;
import org.anyframe.query.ria.RiaRowCallback;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;

import com.tobesoft.platform.data.Dataset;
import com.tobesoft.platform.data.DatasetList;
import com.tobesoft.platform.data.VariableList;

/**
 * Implementation class for MiPQueryService.
 * 
 * @author Soyon Lim
 */
public class MiPQueryServiceImpl extends AbstractRiaQueryService implements
		MiPQueryService, InitializingBean {

	public RiaRowCallback getRowCallbackHandler() {
		return null;
	}

	public RiaCallableStatementCallback getCallableStatementCallbackHandler() {
		return null;
	}

	public RiaPrintWriterCallback getPrintWriterRowCallbackHandler() {
		return null;
	}

	public Dataset search(String queryId, final Dataset dataSet)
			throws QueryException {
		this.containesQueryId(queryId);
		Dataset rtDataSet = new Dataset("Anyframe");
		ColumnValueExtractor updateColumnValueExtractor = new ColumnValueExtractor() {
			public Object getValue(Dataset dataset, int rowNum,
					String columnName) {
				return dataset.getColumnAsObject(rowNum, columnName);
			}
		};

		RiaRowCallback mipRowCallbackHandler = getRowCallbackHandler();

		if (mipRowCallbackHandler == null) {
			mipRowCallbackHandler = new MiPDataSetCallbackHandler();
		}

		QueryInfo queryInfo = sqlRepository.getQueryInfos().get(queryId);

		mipRowCallbackHandler.setDataSet(rtDataSet);
		mipRowCallbackHandler.setQueryInfo(queryInfo);

		this.search(queryId, new MiPDataSetSQLParameterSource(dataSet, 0,
				updateColumnValueExtractor), mipRowCallbackHandler);

		return rtDataSet;
	}

	public Dataset search(String queryId, final VariableList variableList)
			throws QueryException {
		this.containesQueryId(queryId);
		Dataset rtDataSet = new Dataset("Anyframe");

		RiaRowCallback mipRowCallbackHandler = getRowCallbackHandler();

		if (mipRowCallbackHandler == null) {
			mipRowCallbackHandler = new MiPDataSetCallbackHandler();
		}

		QueryInfo queryInfo = sqlRepository.getQueryInfos().get(queryId);

		mipRowCallbackHandler.setDataSet(rtDataSet);
		mipRowCallbackHandler.setQueryInfo(queryInfo);

		this.search(queryId, new MiPVariantSqlParameterSource(variableList),
				mipRowCallbackHandler);
		return rtDataSet;
	}

	public Dataset search(String queryId, final VariableList variableList,
			int pageIndex, int pageSize) throws QueryException {
		this.containesQueryId(queryId);
		Dataset rtDataSet = new Dataset("Anyframe");

		RiaRowCallback mipRowCallbackHandler = getRowCallbackHandler();

		if (mipRowCallbackHandler == null) {
			mipRowCallbackHandler = new MiPDataSetCallbackHandler();
		}

		QueryInfo queryInfo = sqlRepository.getQueryInfos().get(queryId);

		mipRowCallbackHandler.setDataSet(rtDataSet);
		mipRowCallbackHandler.setQueryInfo(queryInfo);

		this.search(queryId, new MiPVariantSqlParameterSource(variableList),
				mipRowCallbackHandler, pageIndex, pageSize);
		return rtDataSet;
	}

	public void search(String queryId, VariableList variableList,
			int pageIndex, int pageSize, String dataSetName, PrintWriter writer)
			throws QueryException {
		this.containesQueryId(queryId);

		RiaPrintWriterCallback miPPrintWriterRowCallbackHandler = getPrintWriterRowCallbackHandler();

		if (miPPrintWriterRowCallbackHandler == null) {
			miPPrintWriterRowCallbackHandler = new MiPPrintWriterCallbackHandler(
					writer, sqlRepository.getQueryInfos().get(queryId));
		}

		String encoding = miPPrintWriterRowCallbackHandler.getEncoding();

		writer.write("CSV:" + encoding + "\n");
		writer.write("ErrorCode=0\n");
		writer.write("query_id=" + queryId + ",svc_status=y\n");
		writer.write("Dataset:" + dataSetName + "\n");
		this.search(queryId, new MiPVariantSqlParameterSource(variableList),
				miPPrintWriterRowCallbackHandler, pageIndex, pageSize);
		writer.write("\n");
	}

	public Dataset searchWithPaging(String queryId, final Dataset dataSet)
			throws QueryException {
		this.containesQueryId(queryId);
		int pageIndex = 0;
		int pageSize = 0;
		try {
			pageIndex = dataSet.getConstColumn("pageIndex").getInteger()
					.intValue();
			pageSize = dataSet.getConstColumn("pageSize").getInteger()
					.intValue();
		} catch (Exception e) {
			if (e instanceof NullPointerException) {
				throw new QueryException(
						"Query Service : there is no parameter for paging, \"pageIndex\" or \"pageSize\" must be null.");
			}
		}

		Dataset rtDataSet = new Dataset("Anyframe");
		ColumnValueExtractor updateColumnValueExtractor = new ColumnValueExtractor() {
			public Object getValue(Dataset dataset, int rowNum,
					String columnName) {
				return dataset.getColumnAsObject(rowNum, columnName);
			}
		};
		this.search(queryId, new MiPDataSetSQLParameterSource(dataSet, 0,
				updateColumnValueExtractor), new MiPDataSetCallbackHandler(
				rtDataSet, sqlRepository.getQueryInfos().get(queryId)),
				pageIndex, pageSize);
		return rtDataSet;
	}

	public int update(String queryId, VariableList variableList,
			Map<String, String> queryMap, Dataset dataSet)
			throws QueryException {
		return update(queryId, variableList, queryMap, dataSet,
				new DefaultMiPActionCommand());
	}

	public int update(Map<String, String> queryMap, Dataset dataSet)
			throws QueryException {
		return update(queryMap, dataSet, new DefaultMiPActionCommand());
	}

	public int update(Map<String, String> queryMap, Dataset dataSet,
			MiPActionCommand actionCommand) throws QueryException {
		return update(new InternalMap(queryMap, actionCommand), dataSet);
	}

	public int update(String queryId, VariableList variableList)
			throws QueryException {
		this.containesQueryId(queryId);
		return this.update(queryId, new MiPVariantSqlParameterSource(
				variableList));
	}

	public int update(String queryId, VariableList variableList,
			Map<String, String> queryMap, Dataset dataSet,
			MiPActionCommand actionCommand) throws QueryException {
		int updateCount = 0;
		updateCount += update(queryId, variableList);
		updateCount += update(new InternalMap(queryMap, actionCommand), dataSet);
		return updateCount;
	}

	private int update(InternalMap queryMap, Dataset dataSet)
			throws QueryException {
		int totalUpdateCount = 0;
		// DataSet에 들어있는 모든 데이터 중 STATUS가 INSERT,
		// UPDATE인 데이터의 건수
		int updateRowCount = dataSet.getRowCount();
		// DataSet에 들어있는 모든 데이터중 STATUS가 DELETE인 데이터의
		// 건수
		int deleteRowCount = dataSet.getDeleteRowCount();

		ColumnValueExtractor columnValueExtractor = new ColumnValueExtractor() {
			public Object getValue(Dataset dataSet, int rowNum,
					String columnName) {
				return dataSet.getDeleteColumn(rowNum, columnName).getObject();
			}
		};

		for (int i = 0; i < deleteRowCount; i++) {
			totalUpdateCount += updateDataSet(queryMap, dataSet, i,
					QUERY_DELETE, columnValueExtractor);
		}

		columnValueExtractor = new ColumnValueExtractor() {
			private boolean isConstColumnExist = false;
			private boolean initFlag = false;

			public Object getValue(Dataset dataSet, int rowNum,
					String columnName) {
				if (!initFlag) {
					if (dataSet.getConstColumnCount() > 0)
						isConstColumnExist = true;
					else
						isConstColumnExist = false;
					initFlag = true;
				}
				return getValueByColumnType(dataSet, rowNum, columnName,
						isConstColumnExist);
			}
		};

		for (int i = 0; i < updateRowCount; i++) {
			totalUpdateCount += updateDataSet(queryMap, dataSet, i, dataSet
					.getRowStatus(i), columnValueExtractor);
		}
		return totalUpdateCount;
	}

	public DatasetList execute(String queryId) {
		Dataset dataset = new Dataset();
		return execute(queryId, dataset);
	}

	public DatasetList execute(String queryId, Dataset dataset) {

		DatasetList datasetList = new DatasetList();
		this.containesQueryId(queryId);

		RiaCallableStatementCallback callableStatementCallbackHandler = getCallableStatementCallbackHandler();

		if (callableStatementCallbackHandler == null) {
			callableStatementCallbackHandler = new MiPCallableStatementCallbackHandler();
		}

		ColumnValueExtractor columnValueExtractor = new ColumnValueExtractor() {
			public Object getValue(Dataset dataset, int rowNum,
					String columnName) {
				return dataset.getColumnAsObject(rowNum, columnName);
			}
		};

		// 조회 조건이 없을 경우 Dataset Id는 queryId + 0
		if (dataset == null || dataset.getRowCount() == 0) {
			dataset = new Dataset();
			Dataset resultDs = (Dataset) this.execute(queryId,
					new MiPDataSetSQLParameterSource(dataset, 0,
							columnValueExtractor),
					callableStatementCallbackHandler);
			if (resultDs != null) {
				datasetList.addDataset(queryId + 0, resultDs);
			}
		} else {
			// input Dataset여러 row일 경우 각 row의 실행 결과 Dataset Id는 queryId + row가
			// 된다.
			for (int i = 0; i < dataset.getRowCount(); i++) {
				Dataset resultDs = (Dataset) this.execute(queryId,
						new MiPDataSetSQLParameterSource(dataset, i,
								columnValueExtractor),
						callableStatementCallbackHandler);
				if (resultDs != null) {
					datasetList.add(queryId + i, resultDs);
				}
			}
		}
		return datasetList;
	}

	private int updateDataSet(InternalMap queryMap, Dataset dataSet,
			int rowNum, String rowStatus,
			ColumnValueExtractor columnValueExtractor) throws QueryException {
		int totalUpdateCount = 0;
		String queryId = queryMap.get(rowStatus);

		// Query Map에 ID가 정의 되어 있지 않을 경우에는 정의된 Query만 실행
		if (queryId != null) {
			Command command = queryMap.getCommand(rowStatus);
			command.preExecute(dataSet, rowNum);
			totalUpdateCount += this.update(queryId,
					new MiPDataSetSQLParameterSource(dataSet, rowNum,
							columnValueExtractor));
			command.postExecute(dataSet, rowNum);

		}

		return totalUpdateCount;
	}

	private Object getValueByColumnType(Dataset dataSet, int rowNum,
			String columnName, boolean isConstColumnExist) {
		try {
			if (isConstColumnExist
					&& dataSet.getConstColumn(columnName) != null) {
				return dataSet.getConstColumn(columnName).getObject();
			}
			if (dataSet.getColumnInfo(dataSet.getColumnIndex(columnName))
					.getColumnTypeStr().equals("BLOB")) {
				return dataSet.getColumnAsByteArray(rowNum, columnName);
			}
			if (dataSet.getColumnInfo(dataSet.getColumnIndex(columnName))
					.getColumnTypeStr().equals("DATE")) {
				return dataSet.getColumnAsDate(rowNum, columnName);
			}
		} catch (Exception e) {
			Logger LOGGER = LoggerFactory.getLogger(MiPQueryService.class);
			if (e instanceof NullPointerException) {
				LOGGER.debug(
						"Query Service : cannot find '{}' column in Data.",
						new Object[] { columnName });
			} else {
				LOGGER.debug(e.getMessage());
			}
		}
		return dataSet.getColumnAsObject(rowNum, columnName);
	}

	interface Command {
		void preExecute(Dataset dataSet, int currentRow);

		void postExecute(Dataset dataSet, int currentRow);
	}

	class InternalMap extends HashMap<String, String> {
		private static final long serialVersionUID = 1L;
		/**
		 * @uml.property name="actionCommand"
		 * @uml.associationEnd
		 */
		private final MiPActionCommand actionCommand;

		InternalMap(Map<String, String> queries, MiPActionCommand actionCommand) {
			super(queries);
			this.actionCommand = actionCommand;
		}

		Command getCommand(String queryId) {
			if (QUERY_DELETE.equals(queryId)) {
				return new Command() {

					public void postExecute(Dataset dataSet, int currentRow) {
						actionCommand.postDelete(dataSet, currentRow);
					}

					public void preExecute(Dataset dataSet, int currentRow) {
						actionCommand.preDelete(dataSet, currentRow);
					}

				};

			} else if (QUERY_INSERT.equals(queryId)) {
				return new Command() {

					public void postExecute(Dataset dataSet, int currentRow) {
						actionCommand.postInsert(dataSet, currentRow);
					}

					public void preExecute(Dataset dataSet, int currentRow) {
						actionCommand.preInsert(dataSet, currentRow);
					}

				};
			} else if (QUERY_UPDATE.equals(queryId)) {
				return new Command() {

					public void postExecute(Dataset dataSet, int currentRow) {
						actionCommand.postUpdate(dataSet, currentRow);
					}

					public void preExecute(Dataset dataSet, int currentRow) {
						actionCommand.preUpdate(dataSet, currentRow);
					}

				};

			}
			return new Command() {

				public void postExecute(Dataset dataSet, int currentRow) {

				}

				public void preExecute(Dataset dataSet, int currentRow) {

				}
			};
		}
	}

	protected Map<Object, Object> generatePropertiesMap(Object[] values,
			int[] types, DefaultDynamicSqlParameterSource sqlParameterSource)
			throws QueryException {

		Map<Object, Object> properties = new HashMap<Object, Object>();

		if (sqlParameterSource instanceof MiPVariantSqlParameterSource) {
			MiPVariantSqlParameterSource sqlParam = (MiPVariantSqlParameterSource) sqlParameterSource;
			VariableList vl = sqlParam.getVariableList();

			Iterator<?> iterator = vl.idIterator();

			while (iterator.hasNext()) {
				String key = (String) iterator.next();
				properties.put(key, vl.getValueAsObject(key));
			}
		} else if (sqlParameterSource instanceof MiPDataSetSQLParameterSource) {
			MiPDataSetSQLParameterSource sqlParam = (MiPDataSetSQLParameterSource) sqlParameterSource;

			Dataset ds = sqlParam.getDataset();
			int columnCount = ds.getColumnCount();

			for (int i = 0; i < columnCount; i++) {
				String key = ds.getColumnId(i);
				properties.put(key, ds.getColumnAsObject(0, key));
			}
		}
		return properties;
	}
}