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
package org.anyframe.xp.query.impl;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.anyframe.query.QueryInfo;
import org.anyframe.query.QueryServiceException;
import org.anyframe.query.impl.jdbc.setter.DefaultDynamicSqlParameterSource;
import org.anyframe.query.ria.AbstractRiaQueryService;
import org.anyframe.query.ria.RiaCallableStatementCallback;
import org.anyframe.query.ria.RiaPrintWriterCallback;
import org.anyframe.query.ria.RiaRowCallback;
import org.anyframe.xp.query.XPActionCommand;
import org.anyframe.xp.query.XPQueryService;
import org.anyframe.xp.query.impl.jdbc.mapper.XPCallableStatementCallbackHandler;
import org.anyframe.xp.query.impl.jdbc.mapper.XPDataSetCallbackHandler;
import org.anyframe.xp.query.impl.jdbc.mapper.XPPrintWriterCallbackHandler;
import org.anyframe.xp.query.impl.jdbc.setter.XPDataSetSQLParameterSource;
import org.anyframe.xp.query.impl.jdbc.setter.XPVariantSqlParameterSource;
import org.anyframe.xp.query.impl.jdbc.setter.XPDataSetSQLParameterSource.ColumnValueExtractor;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.InitializingBean;

import com.tobesoft.xplatform.data.DataSet;
import com.tobesoft.xplatform.data.DataSetList;
import com.tobesoft.xplatform.data.DataTypes;
import com.tobesoft.xplatform.data.VariableList;

/**
 * Implementation class for XPQueryService.
 * 
 * @author Soyon Lim
 */
public class XPQueryServiceImpl extends AbstractRiaQueryService implements
		XPQueryService, InitializingBean {

	public RiaRowCallback getRowCallbackHandler() {
		return null;
	}
	
	public RiaCallableStatementCallback getCallableStatementCallbackHandler(){
		return null;
	}
	
	public RiaPrintWriterCallback getPrintWriterRowCallbackHandler(){
		return null;
	}

	public DataSet search(String queryId, final DataSet dataSet)
			throws Exception {
		this.containesQueryId(queryId);
		DataSet rtDataSet = new DataSet("Anyframe");
		ColumnValueExtractor updateColumnValueExtractor = new ColumnValueExtractor() {
			public Object getValue(DataSet dataset, int rowNum,
					String columnName) {
				return dataset.getObject(rowNum, columnName);
			}
		};

		RiaRowCallback xpRowCallbackHandler = getRowCallbackHandler();

		if (xpRowCallbackHandler == null) {
			xpRowCallbackHandler = new XPDataSetCallbackHandler();
		}

		QueryInfo queryInfo = (QueryInfo) sqlRepository.getQueryInfos().get(queryId);
		
		xpRowCallbackHandler.setDataSet(rtDataSet);
		xpRowCallbackHandler.setQueryInfo(queryInfo);

		this.search(queryId, new XPDataSetSQLParameterSource(dataSet, 0,
				updateColumnValueExtractor), xpRowCallbackHandler);

		return rtDataSet;
	}

	public DataSet search(String queryId, final VariableList variableList)
			throws Exception {
		this.containesQueryId(queryId);
		DataSet rtDataSet = new DataSet("Anyframe");

		RiaRowCallback xpRowCallbackHandler = getRowCallbackHandler();

		if (xpRowCallbackHandler == null) {
			xpRowCallbackHandler = new XPDataSetCallbackHandler();
		}

		QueryInfo queryInfo = (QueryInfo) sqlRepository.getQueryInfos()
				.get(queryId);

		xpRowCallbackHandler.setDataSet(rtDataSet);
		xpRowCallbackHandler.setQueryInfo(queryInfo);

		this.search(queryId, new XPVariantSqlParameterSource(variableList),
				xpRowCallbackHandler);
		return rtDataSet;
	}

	public DataSet search(String queryId, final VariableList variableList,
			int pageIndex, int pageSize) throws Exception {
		this.containesQueryId(queryId);
		DataSet rtDataSet = new DataSet("Anyframe");

		RiaRowCallback xpRowCallbackHandler = getRowCallbackHandler();

		if (xpRowCallbackHandler == null) {
			xpRowCallbackHandler = new XPDataSetCallbackHandler();
		}

		QueryInfo queryInfo = (QueryInfo) sqlRepository.getQueryInfos()
				.get(queryId);

		xpRowCallbackHandler.setDataSet(rtDataSet);
		xpRowCallbackHandler.setQueryInfo(queryInfo);

		this.search(queryId, new XPVariantSqlParameterSource(variableList),
				xpRowCallbackHandler, pageIndex, pageSize);
		return rtDataSet;
	}

	public DataSet searchWithPaging(String queryId, final DataSet dataSet)
			throws Exception {
		this.containesQueryId(queryId);
		int pageIndex = 0;
		int pageSize = 0;
		try {
			pageIndex = dataSet.getInt(0, "pageIndex");
			pageSize = dataSet.getInt(0, "pageSize");
		} catch (Exception e) {
			if (e instanceof NullPointerException) {
				throw new QueryServiceException("Query Service : there is no parameter for paging, \"pageIndex\" or \"pageSize\" must be null.");
			}
		}

		DataSet rtDataSet = new DataSet("Anyframe");
		ColumnValueExtractor updateColumnValueExtractor = new ColumnValueExtractor() {
			public Object getValue(DataSet dataset, int rowNum,
					String columnName) {
				return dataset.getObject(rowNum, columnName);
			}
		};
		this.search(queryId, new XPDataSetSQLParameterSource(dataSet, 0,
				updateColumnValueExtractor), new XPDataSetCallbackHandler(
				rtDataSet, (QueryInfo) sqlRepository.getQueryInfos().get(queryId)),
				pageIndex, pageSize);
		return rtDataSet;
	}

	public int update(String queryId, VariableList variableList, Map queryMap,
			DataSet dataSet) throws QueryServiceException {
		return update(queryId, variableList, queryMap, dataSet,
				new DefaultXPActionCommand());
	}

	public int update(Map queryMap, DataSet dataSet)
			throws QueryServiceException {
		return update(queryMap, dataSet, new DefaultXPActionCommand());
	}

	public int update(Map queryMap, DataSet dataSet,
			XPActionCommand actionCommand) throws QueryServiceException {
		return update(new InternalMap(queryMap, actionCommand), dataSet);
	}

	public int update(String queryId, VariableList variableList)
			throws QueryServiceException {
		this.containesQueryId(queryId);
		return this.update(queryId, new XPVariantSqlParameterSource(
				variableList));
	}

	public int update(String queryId, VariableList variableList, Map queryMap,
			DataSet dataSet, XPActionCommand actionCommand)
			throws QueryServiceException {
		int updateCount = 0;
		updateCount += update(queryId, variableList);
		updateCount += update(new InternalMap(queryMap, actionCommand), dataSet);
		return updateCount;
	}

	private int update(InternalMap queryMap, DataSet dataSet)
			throws QueryServiceException {
		int totalUpdateCount = 0;
		// DataSet에 들어있는 모든 데이터 중 STATUS가 INSERT,
		// UPDATE인 데이터의 건수
		int updateRowCount = dataSet.getRowCount();
		// DataSet에 들어있는 모든 데이터중 STATUS가 DELETE인 데이터의
		// 건수
		int deleteRowCount = dataSet.getRemovedRowCount();

		ColumnValueExtractor columnValueExtractor = new ColumnValueExtractor() {
			public Object getValue(DataSet dataSet, int rowNum,
					String columnName) {
				return dataSet.getRemovedData(rowNum, columnName);
			}
		};

		for (int i = 0; i < deleteRowCount; i++) {
			totalUpdateCount += updateDataSet(queryMap, dataSet, i,
					QUERY_DELETE, columnValueExtractor);
		}

		columnValueExtractor = new ColumnValueExtractor() {
			private boolean isConstColumnExist = false;

			private boolean initFlag = false;

			public Object getValue(DataSet dataSet, int rowNum,
					String columnName) {
				if (!initFlag) {
					isConstColumnExist = checkConstColumnExist(dataSet);
					initFlag = true;
				}
				return getValueByColumnType(dataSet, rowNum, columnName,
						isConstColumnExist);
			}

			private boolean checkConstColumnExist(DataSet dataSet) {
				for (int i = 0; i < dataSet.getColumnCount(); i++) {
					if (dataSet.getColumn(i).isConstant()) {
						return true;
					}
				}
				return false;
			}
		};

		for (int i = 0; i < updateRowCount; i++) {
			totalUpdateCount += updateDataSet(queryMap, dataSet, i,
					getDsRowStatus(dataSet.getRowType(i)), columnValueExtractor);
		}
		return totalUpdateCount;
	}

	private String getDsRowStatus(int rowType) {
		switch (rowType) {
		case DataSet.ROW_TYPE_INSERTED:
			return QUERY_INSERT;
		case DataSet.ROW_TYPE_UPDATED:
			return QUERY_UPDATE;
		case DataSet.ROW_TYPE_DELETED:
			return QUERY_DELETE;
			// check please later
		default:
			return QUERY_UPDATE;
		}
	}

	public DataSetList execute(String queryId) throws QueryServiceException {
		DataSet dataset = new DataSet();
		return execute(queryId, dataset);
	}

	public DataSetList execute(String queryId, DataSet dataset)
			throws QueryServiceException {

		DataSetList datasetList = new DataSetList();
		this.containesQueryId(queryId);

		RiaCallableStatementCallback callableStatementCallbackHandler = getCallableStatementCallbackHandler();

		if (callableStatementCallbackHandler == null) {
			callableStatementCallbackHandler = new XPCallableStatementCallbackHandler();
		}

		ColumnValueExtractor columnValueExtractor = new ColumnValueExtractor() {
			public Object getValue(DataSet dataset, int rowNum,
					String columnName) {
				return dataset.getObject(rowNum, columnName);
			}
		};

		// 조회 조건이 없을 경우 Dataset Id는 queryId + 0
		if (dataset == null || dataset.getRowCount() == 0) {
			dataset = new DataSet();
			DataSet resultDs = (DataSet) this.execute(queryId,
					new XPDataSetSQLParameterSource(dataset, 0,
							columnValueExtractor),
					callableStatementCallbackHandler);
			if (resultDs != null) {
				resultDs.setName(queryId + 0);
				datasetList.add(resultDs);
			}
		} else {
			// input Dataset여러 row일 경우 각 row의 실행 결과 Dataset Id는 queryId + row가
			// 된다.
			for (int i = 0; i < dataset.getRowCount(); i++) {
				DataSet resultDs = (DataSet) this.execute(queryId,
						new XPDataSetSQLParameterSource(dataset, i,
								columnValueExtractor),
						callableStatementCallbackHandler);
				if (resultDs != null) {
					resultDs.setName(queryId + i);
					datasetList.add(resultDs);
				}
			}
		}
		return datasetList;
	}

	private int updateDataSet(InternalMap queryMap, DataSet dataSet,
			int rowNum, String rowStatus,
			ColumnValueExtractor columnValueExtractor)
			throws QueryServiceException {
		int totalUpdateCount = 0;
		String queryId = (String) queryMap.get(rowStatus);

		// Query Map에 ID가 정의 되어 있지 않을 경우에는 정의된 Query만 실행
		if (queryId != null) {
			Command command = queryMap.getCommand(rowStatus);
			command.preExecute(dataSet, rowNum);
			totalUpdateCount += this.update(queryId,
					new XPDataSetSQLParameterSource(dataSet, rowNum,
							columnValueExtractor));
			command.postExecute(dataSet, rowNum);

		}

		return totalUpdateCount;
	}

	private Object getValueByColumnType(DataSet dataSet, int rowNum,
			String columnName, boolean isConstColumnExist) {
		try {
			if (isConstColumnExist
					&& dataSet.getColumn(columnName).isConstant()) {
				return dataSet.getObject(0, columnName);
			}
			if (dataSet.getColumn(columnName).getDataType() == DataTypes.BLOB) {
				return dataSet.getBlob(rowNum, columnName);
			}
			if (dataSet.getColumn(columnName).getDataType() == DataTypes.DATE) {
				return dataSet.getDateTime(rowNum, columnName);
			}
		} catch (Exception e) {
			Log LOGGER = LogFactory.getLog(XPQueryService.class);
    		if( e instanceof NullPointerException ){
    			if(LOGGER.isDebugEnabled()){
    				LOGGER.debug("Query Service : cannot find '" + columnName +" ' column in Data.");
    			}
    		}else{
    			if(LOGGER.isDebugEnabled()){
    				LOGGER.debug( e.getMessage() );
    			}
    		}
		}
		return dataSet.getObject(rowNum, columnName);
	}

	interface Command {
		void preExecute(DataSet dataSet, int currentRow);

		void postExecute(DataSet dataSet, int currentRow);
	}

	class InternalMap extends HashMap {
		private static final long serialVersionUID = 1L;

		private XPActionCommand actionCommand = null;

		InternalMap(Map queries, XPActionCommand actionCommand) {
			super(queries);
			this.actionCommand = actionCommand;
		}

		Command getCommand(String queryId) {
			if (QUERY_DELETE.equals(queryId)) {
				return new Command() {

					public void postExecute(DataSet dataSet, int currentRow) {
						actionCommand.postDelete(dataSet, currentRow);
					}

					public void preExecute(DataSet dataSet, int currentRow) {
						actionCommand.preDelete(dataSet, currentRow);
					}

				};

			} else if (QUERY_INSERT.equals(queryId)) {
				return new Command() {

					public void postExecute(DataSet dataSet, int currentRow) {
						actionCommand.postInsert(dataSet, currentRow);
					}

					public void preExecute(DataSet dataSet, int currentRow) {
						actionCommand.preInsert(dataSet, currentRow);
					}

				};
			} else if (QUERY_UPDATE.equals(queryId)) {
				return new Command() {

					public void postExecute(DataSet dataSet, int currentRow) {
						actionCommand.postUpdate(dataSet, currentRow);
					}

					public void preExecute(DataSet dataSet, int currentRow) {
						actionCommand.preUpdate(dataSet, currentRow);
					}

				};

			}
			return new Command() {

				public void postExecute(DataSet dataSet, int currentRow) {

				}

				public void preExecute(DataSet dataSet, int currentRow) {

				}
			};
		}
	}

	public void search(String queryId, VariableList variableList,
			int pageIndex, int pageSize, String dataSetName, PrintWriter writer)
			throws Exception {

		this.containesQueryId(queryId);

		RiaPrintWriterCallback xPPrintWriterRowCallbackHandler = getPrintWriterRowCallbackHandler();

		if (xPPrintWriterRowCallbackHandler == null) {
			xPPrintWriterRowCallbackHandler = new XPPrintWriterCallbackHandler(
					writer, (QueryInfo) sqlRepository.getQueryInfos().get(queryId));
		}

		String encoding = xPPrintWriterRowCallbackHandler.getEncoding();

		writer.write("CSV:" + encoding + "\n");
		writer.write("ErrorCode=0\n");
		writer.write("query_id=" + queryId + ",svc_status=y\n");
		writer.write("Dataset:" + dataSetName + "\n");
		this.search(queryId, new XPVariantSqlParameterSource(variableList),
				xPPrintWriterRowCallbackHandler, pageIndex, pageSize);
		writer.write("\n");

	}

	protected Map generatePropertiesMap(Object[] values, int[] types,
			DefaultDynamicSqlParameterSource sqlParameterSource)
			throws QueryServiceException {

		Map properties = new HashMap();
		Map tempMap = new HashMap();

		if (sqlParameterSource instanceof XPVariantSqlParameterSource) {
			XPVariantSqlParameterSource sqlParam = (XPVariantSqlParameterSource) sqlParameterSource;
			VariableList vl = sqlParam.getVariableList();

			List list = vl.keyList();

			for (int i = 0; i < list.size(); i++) {
				String key = (String) list.get(i);
				properties.put(key, vl.getObject(key));
			}
		} else if (sqlParameterSource instanceof XPDataSetSQLParameterSource) {
			XPDataSetSQLParameterSource sqlParam = (XPDataSetSQLParameterSource) sqlParameterSource;

			DataSet ds = sqlParam.getDataSet();
			int columnCount = ds.getColumnCount();

			for (int i = 0; i < columnCount; i++) {
				String key = ds.getColumn(i).getName();
				properties.put(key, ds.getObject(0, key));
			}
		}
		return properties;
	}
}