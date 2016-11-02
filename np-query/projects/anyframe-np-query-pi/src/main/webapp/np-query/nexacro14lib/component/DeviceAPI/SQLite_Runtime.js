//==============================================================================
//
//  TOBESOFT Co., Ltd.
//  Copyright 2014 TOBESOFT Co., Ltd.
//  All Rights Reserved.
//
//  NOTICE: TOBESOFT permits you to use, modify, and distribute this file 
//          in accordance with the terms of the license agreement accompanying it.
//
//  Readme URL: http://www.nexacro.co.kr/legal/nexacro-public-license-readme-1.1.html	
//
//==============================================================================

if (nexacro.Browser == "Runtime") {
	if (!nexacro._init_litedb_api) {
		nexacro._init_litedb_api = true;

		nexacro._createLiteDBConnectionObject = function (target) {
			return nexacro.__createLiteDBConnectionObject(target, target.on_success, target.on_error);
		};
		nexacro._setLiteDBConnectionHandleBusyTimeOut = function (target, v) {
			return nexacro.__setLiteDBConnectionHandleBusyTimeOut(target._handle, v);
		};
		nexacro._setLiteDBConnectionHandleDataSource = function (target, v) {
			return nexacro.__setLiteDBConnectionHandleDataSource(target._handle, v);
		};
		nexacro._setLiteDBConnectionHandleOpenFlag = function (target, v) {
			return nexacro.__setLiteDBConnectionHandleOpenFlag(target._handle, v);
		};
		nexacro._setLiteDBConnectionHandlePreConnect = function (target, v) {
			return nexacro.__setLiteDBConnectionHandlePreConnect(target._handle, v);
		};
		nexacro._setLiteDBConnectionHandleAsync = function (target, v) {
			return nexacro.__setLiteDBConnectionHandleAsync(target._handle, v);
		};
		nexacro._beginLiteDBConnectionHandle = function (target) {
			nexacro.__beginLiteDBConnectionHandle(target._handle);
		};
		nexacro._closeLiteDBConnectionHandle = function (target) {
			nexacro.__closeLiteDBConnectionHandle(target._handle);
		};
		nexacro._commitLiteDBConnectionHandle = function (target) {
			nexacro.__commitLiteDBConnectionHandle(target._handle);
		};
		nexacro._isConnectedLiteDBConnectionHandle = function (target) {
			nexacro.__isConnectedLiteDBConnectionHandle(target._handle);
		};
		nexacro._openLiteDBConnectionHandle = function (target) {
			nexacro.__openLiteDBConnectionHandle(target._handle, target.datasource, target.openflag);
		};
		nexacro._rollbackLiteDBConnectionHandle = function (target) {
			nexacro.__rollbackLiteDBConnectionHandle(target._handle);
		};

		nexacro._createLiteDBStatementObject = function (target) {
			return nexacro.__createLiteDBStatementObject(target, target.on_success, target.on_error);
		};
		nexacro._setLiteDBStatementHandleQuery = function (target, v) {
			return nexacro.__setLiteDBStatementHandleQuery(target._handle, v);
		};
		nexacro._setLiteDBStatementHandleldbConnection = function (target, v) {
			return nexacro.__setLiteDBStatementHandlelDbConnection(target._handle, v._handle);
		};
		nexacro._initParamsLiteDBStatementHandle = function (target) {
			return nexacro.__initParamsLiteDBStatementHandle(target._handle);
		};
		nexacro._addParamsLiteDBStatementHandle = function (target) {
			return nexacro.__addParamsLiteDBStatementHandle(target._handle);
		};
		nexacro._setLiteDBStatementHandleParameter = function (target, param, idx) {
			if (param instanceof nexacro.LiteDBParameter) {
				return nexacro.__setLiteDBStatementHandleParameter(target._handle, param.name, param.type, param.value, idx);
			}
		};
		nexacro._setLiteDBStatementHandleAsync = function (target, v) {
			return nexacro.__setLiteDBStatementHandleAsync(target._handle, v);
		};

		nexacro._closeLiteDBStatementHandle = function (target) {
			nexacro.__closeLiteDBStatementHandle(target._handle);
		};
		nexacro._executeQueryLiteDBStatementHandle = function (target) {
			nexacro.__executeQueryLiteDBStatementHandle(target._handle);
		};
		nexacro._executeUpdateLiteDBStatementHandle = function (target) {
			nexacro.__executeUpdateLiteDBStatementHandle(target._handle);
		};
	}
}
