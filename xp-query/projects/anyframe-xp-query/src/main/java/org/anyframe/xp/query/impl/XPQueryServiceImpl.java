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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.anyframe.query.QueryInfo;
import org.anyframe.query.exception.QueryException;
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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    public RiaCallableStatementCallback getCallableStatementCallbackHandler() {
        return null;
    }

    public RiaPrintWriterCallback getPrintWriterRowCallbackHandler() {
        return null;
    }

    public DataSet search(String queryId, final DataSet dataSet)
            throws QueryException {
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

        QueryInfo queryInfo = sqlRepository.getQueryInfos().get(queryId);

        xpRowCallbackHandler.setDataSet(rtDataSet);
        xpRowCallbackHandler.setQueryInfo(queryInfo);

        this.search(queryId, new XPDataSetSQLParameterSource(dataSet, 0,
                updateColumnValueExtractor), xpRowCallbackHandler);

        return rtDataSet;
    }

    public DataSet search(String queryId, final VariableList variableList)
            throws QueryException {
        this.containesQueryId(queryId);
        DataSet rtDataSet = new DataSet("Anyframe");

        RiaRowCallback xpRowCallbackHandler = getRowCallbackHandler();

        if (xpRowCallbackHandler == null) {
            xpRowCallbackHandler = new XPDataSetCallbackHandler();
        }

        QueryInfo queryInfo = sqlRepository.getQueryInfos().get(queryId);

        xpRowCallbackHandler.setDataSet(rtDataSet);
        xpRowCallbackHandler.setQueryInfo(queryInfo);

        this.search(queryId, new XPVariantSqlParameterSource(variableList),
                xpRowCallbackHandler);
        return rtDataSet;
    }

    public DataSet search(String queryId, final VariableList variableList,
                          int pageIndex, int pageSize) throws QueryException {
        this.containesQueryId(queryId);
        DataSet rtDataSet = new DataSet("Anyframe");

        RiaRowCallback xpRowCallbackHandler = getRowCallbackHandler();

        if (xpRowCallbackHandler == null) {
            xpRowCallbackHandler = new XPDataSetCallbackHandler();
        }

        QueryInfo queryInfo = sqlRepository.getQueryInfos().get(queryId);

        xpRowCallbackHandler.setDataSet(rtDataSet);
        xpRowCallbackHandler.setQueryInfo(queryInfo);

        this.search(queryId, new XPVariantSqlParameterSource(variableList),
                xpRowCallbackHandler, pageIndex, pageSize);
        return rtDataSet;
    }

    public DataSet searchWithPaging(String queryId, final DataSet dataSet)
            throws QueryException {
        this.containesQueryId(queryId);
        int pageIndex = 0;
        int pageSize = 0;
        try {
            pageIndex = dataSet.getInt(0, "pageIndex");
            pageSize = dataSet.getInt(0, "pageSize");
        } catch (Exception e) {
            if (e instanceof NullPointerException) {
                throw new QueryException(
                        "Query Service : there is no parameter for paging, \"pageIndex\" or \"pageSize\" must be null.");
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
                rtDataSet, sqlRepository.getQueryInfos().get(queryId)),
                pageIndex, pageSize);
        return rtDataSet;
    }

    public int update(String queryId, VariableList variableList,
                      Map<String, String> queryMap, DataSet dataSet)
            throws QueryException {
        return update(queryId, variableList, queryMap, dataSet,
                new DefaultXPActionCommand());
    }

    public int update(Map<String, String> queryMap, DataSet dataSet)
            throws QueryException {
        return update(queryMap, dataSet, new DefaultXPActionCommand());
    }

    public int update(Map<String, String> queryMap, DataSet dataSet,
                      XPActionCommand actionCommand) throws QueryException {
        return update(new InternalMap(queryMap, actionCommand), dataSet);
    }

    public int update(String queryId, VariableList variableList)
            throws QueryException {
        this.containesQueryId(queryId);
        return this.update(queryId, new XPVariantSqlParameterSource(
                variableList));
    }

    public int update(String queryId, VariableList variableList,
                      Map<String, String> queryMap, DataSet dataSet,
                      XPActionCommand actionCommand) throws QueryException {
        int updateCount = 0;
        updateCount += update(queryId, variableList);
        updateCount += update(new InternalMap(queryMap, actionCommand), dataSet);
        return updateCount;
    }

    public int batchCreate(String queryId, DataSet dataSet)
            throws QueryException {
        int rowCount = dataSet.getRowCount();

        ColumnValueExtractor columnValueExtractor = new ColumnValueExtractor() {
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

        List<XPDataSetSQLParameterSource> insertParamList = new ArrayList<XPDataSetSQLParameterSource>();

        for (int i = 0; i < rowCount; i++) {
            if (dataSet.getRowType(i) == DataSet.ROW_TYPE_INSERTED) {
                insertParamList.add(new XPDataSetSQLParameterSource(dataSet, i,
                        columnValueExtractor));
            }
        }

        XPDataSetSQLParameterSource[] insertParameterSource = new XPDataSetSQLParameterSource[] {};
        insertParameterSource = insertParamList.toArray(insertParameterSource);

        return batchUpdateCount(update(queryId, insertParameterSource));
    }

    public int batchUpdate(String queryId, DataSet dataSet)
            throws QueryException {
        int rowCount = dataSet.getRowCount();

        ColumnValueExtractor columnValueExtractor = new ColumnValueExtractor() {
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

        List<XPDataSetSQLParameterSource> updateParamList = new ArrayList<XPDataSetSQLParameterSource>();

        for (int i = 0; i < rowCount; i++) {
            if (dataSet.getRowType(i) == DataSet.ROW_TYPE_UPDATED) {
                updateParamList.add(new XPDataSetSQLParameterSource(dataSet, i,
                        columnValueExtractor));
            }
        }

        XPDataSetSQLParameterSource[] updateParameterSource = new XPDataSetSQLParameterSource[] {};
        updateParameterSource = updateParamList.toArray(updateParameterSource);

        return batchUpdateCount(update(queryId, updateParameterSource));
    }

    public int batchRemove(String queryId, DataSet dataSet)
            throws QueryException {
        int rowCount = dataSet.getRemovedRowCount();

        ColumnValueExtractor columnValueExtractor = new ColumnValueExtractor() {
            public Object getValue(DataSet dataSet, int rowNum,
                                   String columnName) {
                return dataSet.getRemovedData(rowNum, columnName);
            }
        };

        XPDataSetSQLParameterSource[] deleteParameterSource = new XPDataSetSQLParameterSource[rowCount];

        for (int i = 0; i < rowCount; i++) {
            deleteParameterSource[i] = new XPDataSetSQLParameterSource(dataSet,
                    i, columnValueExtractor);
        }

        return batchUpdateCount(update(queryId, deleteParameterSource));
    }

    private int batchUpdateCount(int[] cnt) {
        int sum = 0;
        for (int arrayLength = 0; arrayLength < cnt.length; arrayLength++) {
            sum += cnt[arrayLength];
        }
        return sum;
    }

    private int update(InternalMap queryMap, DataSet dataSet)
            throws QueryException {
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

    public DataSetList execute(String queryId) throws QueryException {
        DataSet dataset = new DataSet();
        return execute(queryId, dataset);
    }

    public DataSetList execute(String queryId, DataSet dataSet)
            throws QueryException {

        DataSetList datasetList = new DataSetList();
        this.containesQueryId(queryId);

        RiaCallableStatementCallback callableStatementCallbackHandler = getCallableStatementCallbackHandler();

        if (callableStatementCallbackHandler == null) {
            callableStatementCallbackHandler = new XPCallableStatementCallbackHandler();
        }

        ColumnValueExtractor columnValueExtractor = new ColumnValueExtractor() {
            public Object getValue(DataSet dataset, int rowNum, String columnName) {
                return dataset.getObject(rowNum, columnName);
            }
        };

        /* 20130812 Sunjoong Kim - Procedure의 Result Dataset의 이름은 매핑 쿼리에 정의한 OUT Parameter 이름이다.
         * dataSet의 Row 가 없는 경우는 execute 메소드 내부에서 columnValueExtrator를 호출하지 않는다.
         * Input DataSet은 Row가 1개이다. 기존엔 Input DataSet의 Row가 여러개로 가정하였으나, Naming 문제 및 사용법 불편으로 Deprecated.
         */

        DataSetList resultDl = (DataSetList) this.execute(queryId,
                new XPDataSetSQLParameterSource(dataSet, 0,
                        columnValueExtractor),
                callableStatementCallbackHandler);

        if (resultDl != null) {
            for (int j = 0; j < resultDl.size(); j++) {
                DataSet outDs = resultDl.get(j);
                outDs.setName(outDs.getName());
                datasetList.add(outDs);
            }
        }

        return datasetList;
    }

    private int updateDataSet(InternalMap queryMap, DataSet dataSet,
                              int rowNum, String rowStatus,
                              ColumnValueExtractor columnValueExtractor) throws QueryException {
        int totalUpdateCount = 0;
        String queryId = queryMap.get(rowStatus);

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
            Logger LOGGER = LoggerFactory.getLogger(XPQueryService.class);
            if (e instanceof NullPointerException) {
                LOGGER.debug(
                        "Query Service : cannot find '{} ' column in Data.",
                        new Object[] { columnName });
            } else {
                LOGGER.debug(e.getMessage());
            }
        }
        return dataSet.getObject(rowNum, columnName);
    }

    interface Command {
        void preExecute(DataSet dataSet, int currentRow);

        void postExecute(DataSet dataSet, int currentRow);
    }

    class InternalMap extends HashMap<String, String> {
        private static final long serialVersionUID = 1L;

        private final XPActionCommand actionCommand;

        InternalMap(Map<String, String> queries, XPActionCommand actionCommand) {
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
            throws QueryException {

        this.containesQueryId(queryId);

        RiaPrintWriterCallback xPPrintWriterRowCallbackHandler = getPrintWriterRowCallbackHandler();

        if (xPPrintWriterRowCallbackHandler == null) {
            xPPrintWriterRowCallbackHandler = new XPPrintWriterCallbackHandler(
                    writer, sqlRepository.getQueryInfos().get(queryId));
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

    protected Map<Object, Object> generatePropertiesMap(Object[] values,
                                                        int[] types, DefaultDynamicSqlParameterSource sqlParameterSource)
            throws QueryException {

        Map<Object, Object> properties = new HashMap<Object, Object>();

        if (sqlParameterSource instanceof XPVariantSqlParameterSource) {
            XPVariantSqlParameterSource sqlParam = (XPVariantSqlParameterSource) sqlParameterSource;
            VariableList vl = sqlParam.getVariableList();

            List<?> list = vl.keyList();

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