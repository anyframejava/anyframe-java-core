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

if (!nexacro.Device || nexacro.OS == "Android") {
	if (!nexacro._init_litedb_api) {
		nexacro._createLiteDBConnectionObject = nexacro._emptyFn;
		nexacro._setLiteDBConnectionHandleBusyTimeOut = nexacro._emptyFn;
		nexacro._setLiteDBConnectionHandleDataSource = nexacro._emptyFn;
		nexacro._setLiteDBConnectionHandleOpenFlag = nexacro._emptyFn;
		nexacro._setLiteDBConnectionHandlePreConnect = nexacro._emptyFn;
		nexacro._setLiteDBConnectionHandleAsync = nexacro._emptyFn;
		nexacro._beginLiteDBConnectionHandle = nexacro._emptyFn;
		nexacro._closeLiteDBConnectionHandle = nexacro._emptyFn;
		nexacro._commitLiteDBConnectionHandle = nexacro._emptyFn;
		nexacro._isConnectedLiteDBConnectionHandle = nexacro._emptyFn;
		nexacro._openLiteDBConnectionHandle = nexacro._emptyFn;
		nexacro._rollbackLiteDBConnectionHandle = nexacro._emptyFn;

		nexacro._createLiteDBStatementObject = nexacro._emptyFn;
		nexacro._setLiteDBStatementHandleQuery = nexacro._emptyFn;
		nexacro._setLiteDBStatementHandleldbConnection = nexacro._emptyFn;
		nexacro._initParamsLiteDBStatementHandle = nexacro._emptyFn;
		nexacro._addParamsLiteDBStatementHandle = nexacro._emptyFn;
		nexacro._setLiteDBStatementHandleParameter = nexacro._emptyFn;
		nexacro._closeLiteDBStatementHandle = nexacro._emptyFn;
		nexacro._executeQueryLiteDBStatementHandle = nexacro._emptyFn;
		nexacro._executeUpdateLiteDBStatementHandle = nexacro._emptyFn;
	}


	if (!nexacro.LiteDBEventInfo) {
		nexacro.LiteDBEventInfo = function (strEventId, strReason, strReturnValue) {
			this.id = this.eventid = strEventId || "onerror";
			this.reason = strReason;
			this.returnvalue = strReturnValue;
		};
		var _pLiteDBEventInfo = nexacro.LiteDBEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.LiteDBEventInfo);

		_pLiteDBEventInfo._type_name = "LiteDBEventInfo";

		delete _pLiteDBEventInfo;
	}

	if (!nexacro.LiteDBErrorEventInfo) {
		nexacro.LiteDBErrorEventInfo = function (strEventId, intErrorCode, strErrorMsg, strldbErrorCode, strldbErrorMsg) {
			this.id = this.eventid = strEventId || "onsuccess";
			this.errortype = "ObjectError";
			this.statuscode = intErrorCode;
			this.errormsg = strErrorMsg;
			this.ldberrorcode = strldbErrorCode;
			this.ldberrormsg = strldbErrorMsg;
		};
		var _pLiteDBErrorEventInfo = nexacro.LiteDBErrorEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.LiteDBErrorEventInfo);

		_pLiteDBErrorEventInfo._type_name = "LiteDBErrorEventInfo";

		delete _pLiteDBErrorEventInfo;
	}

	if (!nexacro.LiteDBConnection) {
		nexacro.LiteDBConnection = function (id, parent) {
			this.id = this.name = id;
			if (parent) {
				this.parent = parent;
			}
			this.sqlstatement = "";
			this.busytimeout = 60000;
			this.openflag = 1;
			this.datasource = "";
			this.preconnect = "false";
			this.async = "true";


			this._event_list = {
				"onsuccess" : 1, 
				"onerror" : 1
			};

			this.onsuccess = null;
			this.onerror = null;

			this._handle = nexacro._createLiteDBConnectionObject(this);
		};

		nexacro.LiteDBConnection.openReadWrite = 0;
		nexacro.LiteDBConnection.openReadWriteCreate = 1;

		var _pLiteDBConnection = nexacro.LiteDBConnection.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.LiteDBConnection);

		_pLiteDBConnection._type_name = "LiteDBConnection";

		_pLiteDBConnection.on_created = function () {
		};
		_pLiteDBConnection.destroy = function () {
			if (this._handle) {
				this.close();
				this._handle = null;
			}

			return true;
		};
		_pLiteDBConnection.set_busytimeout = function (v) {
			if (this.paramck_busytimeout(v)) {
				this.busytimeout = v;
				nexacro._setLiteDBConnectionHandleBusyTimeOut(this, v);

				return true;
			}
			else {
				return false;
			}
		};
		_pLiteDBConnection.set_datasource = function (v) {
			if (this.paramck_datasource(v)) {
				this.datasource = v;
				nexacro._setLiteDBConnectionHandleDataSource(this, v);

				if (this.preconnect == "true" || this.preconnect == true) {
					this.open();
				}
				return true;
			}
			else {
				return false;
			}
		};
		_pLiteDBConnection.set_openflag = function (v) {
			if (v == LiteDBConnection.openReadWrite || v == LiteDBConnection.openReadWriteCreate) {
				this.openflag = v;
				nexacro._setLiteDBConnectionHandleOpenFlag(this, v);

				return true;
			}
			else {
				return false;
			}
		};
		_pLiteDBConnection.set_preconnect = function (v) {
			if (v == "true" || v == "false" || v == true || v == false) {
				this.preconnect = nexacro._toBoolean(v);
				nexacro._setLiteDBConnectionHandlePreConnect(this, this.preconnect);

				if (this.preconnect == "true" || this.preconnect == true) {
					if (this.datasource != "") {
						this.open();
					}
				}
				return true;
			}
			else {
				return false;
			}
		};
		_pLiteDBConnection.set_async = function (v) {
			if (v == "true" || v == "false" || v == true || v == false) {
				this.async = nexacro._toBoolean(v);
				nexacro._setLiteDBConnectionHandleAsync(this, this.async);

				return true;
			}
			else {
				return false;
			}
		};
		_pLiteDBConnection.begin = function () {
			if (this._handle) {
				nexacro._beginLiteDBConnectionHandle(this);
			}
		};

		_pLiteDBConnection.close = function () {
			if (this._handle) {
				nexacro._closeLiteDBConnectionHandle(this);
			}
		};

		_pLiteDBConnection.commit = function () {
			if (this._handle) {
				nexacro._commitLiteDBConnectionHandle(this);
			}
		};

		_pLiteDBConnection.isConnected = function () {
			if (this._handle) {
				nexacro._isConnectedLiteDBConnectionHandle(this);
			}
		};

		_pLiteDBConnection.open = function (strDataSource, constOpenFlag) {
			if (typeof (constOpenFlag) != "undefined" || constOpenFlag != null) {
				this.openflag = constOpenFlag;
				nexacro._setLiteDBConnectionHandleOpenFlag(this, this.openflag);
			}

			if (typeof (strDataSource) != "undefined" || strDataSource != null) {
				this.datasource = strDataSource;
				nexacro._setLiteDBConnectionHandleDataSource(this, this.datasource);
			}

			if (this.paramck_open(this.datasource, this.openflag)) {
				nexacro._openLiteDBConnectionHandle(this, this.datasource, this.openflag);
			}
			else {
				return false;
			}
			return true;
		};

		_pLiteDBConnection.rollback = function () {
			if (this._handle) {
				nexacro._rollbackLiteDBConnectionHandle(this);
			}
		};

		_pLiteDBConnection.on_success = function (reason, returnvalue) {
			var e = new nexacro.LiteDBEventInfo("onsuccess", reason, returnvalue);
			this.on_fire_onsuccess(this, e);
		};

		_pLiteDBConnection.on_fire_onsuccess = function (objLiteDBConnection, eLiteDBEventInfo) {
			if (this.onsuccess && this.onsuccess._has_handlers) {
				return this.onsuccess._fireEvent(this, eLiteDBEventInfo);
			}
			return true;
		};

		_pLiteDBConnection.on_error = function (errorcode, errormsg, ldberrorcode, ldberrormsg) {
			var e = new nexacro.LiteDBErrorEventInfo("onerror", errorcode, errormsg, ldberrorcode, ldberrormsg);
			this.on_fire_onerror(this, e);
		};

		_pLiteDBConnection.on_fire_onerror = function (objAsyncLiteDBConnection, eAsyncLiteDBErrorEventInfo) {
			if (this.onerror && this.onerror._has_handlers) {
				return this.onerror._fireEvent(this, eAsyncLiteDBErrorEventInfo);
			}
			return true;
		};

		_pLiteDBConnection.paramck_busytimeout = function (timout) {
			if (timout == null || typeof (timout) == "undefined") {
				return false;
			}

			if (!this._publicNumCheck(timout)) {
				return false;
			}

			if (timout < 200 || timout > 86400000) {
				return false;
			}

			return true;
		};
		_pLiteDBConnection.paramck_datasource = function (datasrc) {
			if (datasrc == null || typeof (datasrc) == "undefined") {
				return false;
			}
			return true;
		};
		_pLiteDBConnection.paramck_open = function (strDataSource, constOpenFlag) {
			if (strDataSource == null || typeof (strDataSource) == "undefined" || typeof (strDataSource) != "string") {
				return false;
			}

			if (!this._publicNumCheck(constOpenFlag)) {
				return false;
			}
			return true;
		};
		_pLiteDBConnection._publicNumCheck = function (v) {
			try {
				var strlength = v.toString().split(" ").join("");
			}
			catch (e) {
				return false;
			}

			if (strlength.length == 0) {
				return false;
			}

			try {
				var numberss = Number(v.toString());
			}
			catch (e) {
				return false;
			}

			if ((+numberss) != (+numberss)) {
				return false;
			}

			return true;
		};
		delete _pLiteDBConnection;
	}

	if (!nexacro.LiteDBParameter) {
		nexacro.LiteDBParameter = function (name, type, value) {
			this.name = name || "";
			this.type = type || "string";
			this.value = value;
		};
		var _pLiteDBParameter = nexacro.LiteDBParameter.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.LiteDBParameter);

		_pLiteDBParameter._type_name = "LiteDBParameter";

		_pLiteDBParameter.set_name = function (v) {
			if (this.paramck_datasource(v)) {
				this.name = v;
				return true;
			}
			else {
				return false;
			}
		};
		_pLiteDBParameter.set_value = function (v) {
			if (this.paramck_datasource(v)) {
				this.value = v;
				return true;
			}
			else {
				return false;
			}
		};
		_pLiteDBParameter.set_type = function (v) {
			if (this.paramck_datasource(v)) {
				this.type = v;
				return true;
			}
			else {
				return false;
			}
		};
		if (nexacro.Device) {
			_pLiteDBParameter.toJSON = function () {
				var valueString;
				if (this.value == null) {
					valueString = 'null';
				}
				else if (this.value == undefined) {
					valueString = 'undefined';
				}
				else {
					switch (nexacro.DataUtils.toTypeCode(this.type)) {
						case 2:
						case 3:
							valueString = nexacro.DataUtils.toTextFromDecimal(this.value);
							break;
						case 4:
							valueString = '"' + nexacro.DataUtils.toTextFromDecimal(this.value) + '"';
							break;
						case 5:
							valueString = '"' + nexacro.DataUtils.toTextFromDate(this.value) + '"';
							break;
						case 6:
							valueString = '"' + nexacro.DataUtils.toTextFromTime(this.value) + '"';
							break;
						case 7:
							if (this.value.dateObj == undefined) {
								valueString = '"' + nexacro.DataUtils.toTextFromDateTime(this.value) + '"';
							}
							else {
								valueString = '"' + nexacro.DataUtils.toTextFromDateTime(this.value.dateObj) + '"';
							}
							break;
						case 0:
						case 1:
						case 8:
						case 9:
						default:
							valueString = '"' + nexacro.Device.encodeString(this.value) + '"';
							break;
					}
				}
				return eval('({"name":"' + this.name + '","type":' + nexacro.DataUtils.toTypeCode(this.type) + ',"value":' + valueString + '})');
			};
		}

		_pLiteDBParameter.paramck_datasource = function (datasrc) {
			if (datasrc == null || typeof (datasrc) == "undefined") {
				return false;
			}
			return true;
		};
		delete _pLiteDBParameter;
	}


	if (!nexacro.LiteDBStatement) {
		nexacro.LiteDBStatement = function (id, parent) {
			this.id = this.name = id;
			if (parent) {
				this.parent = parent;
			}

			this.query = "";
			this.ldbconnection = "";
			this.parameters = {
			};
			this.applyrowpos = -1;
			this.async = "true";

			this._event_list = {
				"onsuccess" : 1, 
				"onerror" : 1
			};

			this.onsuccess = null;
			this.onerror = null;

			this._handle = nexacro._createLiteDBStatementObject(this);
		};
		var _pLiteDBStatement = nexacro.LiteDBStatement.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.LiteDBStatement);

		_pLiteDBStatement._type_name = "LiteDBStatement";

		_pLiteDBStatement.on_created = function () {
		};
		_pLiteDBStatement.destroy = function () {
			if (this._handle) {
				this._handle = null;
			}

			return true;
		};

		_pLiteDBStatement.set_query = function (v) {
			if (this.paramck_query(v)) {
				this.query = v;
				nexacro._setLiteDBStatementHandleQuery(this, v);

				return true;
			}
			else {
				return false;
			}
		};
		_pLiteDBStatement.set_ldbconnection = function (v) {
			var ret = false;

			if (v instanceof nexacro.LiteDBConnection) {
				this.ldbconnection = v;
				nexacro._setLiteDBStatementHandleldbConnection(this, v);
				ret = true;
			}
			else if (typeof (v) == "string") {
				var at = "@";
				if (v.indexOf(at) == 0) {
					v = v.substring(at.length);
				}
				else if (v.match(/@/) == null) {
					v = at + v;
				}

				if (null != this.parent[v] && this.parent[v] instanceof nexacro.LiteDBConnection) {
					this.ldbconnection = this.parent[v];
					nexacro._setLiteDBStatementHandleldbConnection(this, this.parent[v]);
					ret = true;
				}
			}

			return ret;
		};
		_pLiteDBStatement.set_parameters = function (v) {
			if (v instanceof nexacro.Dataset) {
				var dataset = v;
				var colsize = dataset.getColCount();
				var rowsize = dataset.getRowCount();

				nexacro._initParamsLiteDBStatementHandle(this);

				for (var row = 0; row < rowsize; row++) {
					var nIdx = nexacro._addParamsLiteDBStatementHandle(this);
					for (var col = 0; col < colsize; col++) {
						var param = new nexacro.LiteDBParameter;
						var colinfo = dataset.getColumnInfo(col);
						var value = dataset.getColumn(row, colinfo.name);

						param.set_name(colinfo.name);
						param.set_type(colinfo.type);
						param.set_value(value);

						nexacro._setLiteDBStatementHandleParameter(this, param, nIdx);
					}
				}

				this.parameters = v;
				return true;
			}
			else if (v instanceof Array) {
				nexacro._initParamsLiteDBStatementHandle(this);
				var nIdx = nexacro._addParamsLiteDBStatementHandle(this);

				for (var i = 0; i < v.length; i += 1) {
					var param = v[i];
					if (param instanceof nexacro.LiteDBParameter) {
						nexacro._setLiteDBStatementHandleParameter(this, param, nIdx);
					}
				}

				this.parameters = v;
				return true;
			}
			else if (v instanceof Object) {
				nexacro._initParamsLiteDBStatementHandle(this);
				var nIdx = nexacro._addParamsLiteDBStatementHandle(this);

				for (var id in v) {
					var param = v[id];
					if (param instanceof nexacro.LiteDBParameter) {
						nexacro._setLiteDBStatementHandleParameter(this, param, nIdx);
					}
				}
				this.parameters = v;
				return true;
			}

			return false;
		};
		_pLiteDBStatement.set_async = function (v) {
			if (v == "true" || v == "false" || v == true || v == false) {
				this.async = nexacro._toBoolean(v);
				nexacro._setLiteDBStatementHandleAsync(this, this.async);

				return true;
			}
			else {
				return false;
			}
		};
		_pLiteDBStatement.close = function () {
			if (this._handle) {
				nexacro._closeLiteDBStatementHandle(this);
			}
		};

		_pLiteDBStatement.executeQuery = function (strQuery) {
			if (strQuery == null) {
				if (this.query.length == 0) {
					return false;
				}
			}
			else {
				if (typeof (strQuery) == "string" && strQuery.length > 0) {
					this.query = strQuery;
					nexacro._setLiteDBStatementHandleQuery(this, strQuery);
				}
				else {
					return false;
				}
			}




			if (this.ldbconnection == null || this.ldbconnection == undefined) {
				return false;
			}

			if (!this.ldbconnection instanceof nexacro.LiteDBConnection) {
				return false;
			}

			nexacro._executeQueryLiteDBStatementHandle(this);


			return true;
		};

		_pLiteDBStatement.executeUpdate = function (strQuery) {
			if (strQuery == null) {
				if (this.query.length == 0) {
					return false;
				}
			}
			else {
				if (typeof (strQuery) == "string" && strQuery.length > 0) {
					this.query = strQuery;
					nexacro._setLiteDBStatementHandleQuery(this, strQuery);
				}
				else {
					return false;
				}
			}




			if (this.ldbconnection == null || this.ldbconnection == undefined) {
				return false;
			}

			if (!this.ldbconnection instanceof nexacro.LiteDBConnection) {
				return false;
			}

			nexacro._executeUpdateLiteDBStatementHandle(this);

			return true;
		};

		_pLiteDBStatement.on_success = function (reason, returnvalue) {
			var e;
			if (reason != "7") {
				e = new nexacro.LiteDBEventInfo("onsuccess", reason, returnvalue);
			}
			else {
				var tempDS = new nexacro.Dataset("__tempDS", this.parent);

				tempDS = this.JSONStringToDataset2(returnvalue, tempDS);
				e = new nexacro.LiteDBEventInfo("onsuccess", reason, tempDS);
			}
			this.on_fire_onsuccess(this, e);
		};

		_pLiteDBStatement.on_fire_onsuccess = function (objLiteDBStatement, eLiteDBEventInfo) {
			if (this.onsuccess && this.onsuccess._has_handlers) {
				return this.onsuccess._fireEvent(this, eLiteDBEventInfo);
			}
			return true;
		};

		_pLiteDBStatement.on_error = function (errorcode, errormsg, ldberrorcode, ldberrormsg) {
			var e = new nexacro.LiteDBErrorEventInfo("onerror", errorcode, errormsg, ldberrorcode, ldberrormsg);
			this.on_fire_onerror(this, e);
		};

		_pLiteDBStatement.on_fire_onerror = function (objLiteDBStatement, eLiteDBErrorEventInfo) {
			if (this.onerror && this.onerror._has_handlers) {
				return this.onerror._fireEvent(this, eLiteDBErrorEventInfo);
			}
			return true;
		};

		_pLiteDBStatement.retQueryString = function (str) {
			str = str.replace(/"/g, "_DQOUT_");
			str = str.replace(/'/g, "_QUOT_");
			return str;
		};
		_pLiteDBStatement.caheckTypeKeyword = function (strQuery) {
			if (typeof (strQuery) == "undefined" || strQuery.length == 0) {
				return;
			}

			var qry = strQuery.toLowerCase();
			var arr = qry.split(" ");
			for (var i = 0; i < arr.length; i++) {
				if (strQuery.match(/select/i) != null) {
					return 1;
				}
				else if (strQuery.match(/insert/i) != null) {
					return 2;
				}
				else if (strQuery.match(/update/i) != null) {
					return 3;
				}
				else if (strQuery.match(/delete/i) != null) {
					return 4;
				}
			}

			return 0;
		};

		_pLiteDBStatement.paramck_query = function (db_query) {
			if (db_query == null || typeof (db_query) == "undefined" || typeof (db_query) != "string") {
				return false;
			}
			return true;
		};
		_pLiteDBStatement.JSONStringToDataset2 = function (jsonString, dataset) {
			if (dataset == undefined) {
				dataset = new nexacro.Dataset();
			}

			return this.JSONObjectToDataset2(eval('(' + jsonString + ')'), dataset);
		};
		_pLiteDBStatement.JSONObjectToDataset2 = function (jsonObject, dataset) {
			if (jsonObject == undefined) {
				return dataset;
			}
			if (dataset == undefined) {
				dataset = new nexacro.Dataset();
			}

			var colInfos = jsonObject.columnInfos;
			for (var i = 0; i < colInfos.length; i++) {
				dataset.addColumn(colInfos[i].name, nexacro.DataUtils.toTypeName(colInfos[i].type));
			}

			var rows = jsonObject.rows;
			for (var i = 0; i < rows.length; i++) {
				var ridx = dataset.addRow();
				for (var j = 0; j < colInfos.length; j++) {
					switch (colInfos[j].type) {
						case 1:
							dataset.setColumn(ridx, colInfos[j].name, this.jsonDecodeString(rows[i][colInfos[j].name]));
							break;
						case 4:
							dataset.setColumn(ridx, colInfos[j].name, rows[i][colInfos[j].name]);
							break;
						case 2:
						case 3:
						case 5:
						case 6:
						case 7:
						case 0:
						case 8:
						case 9:
						default:
							dataset.setColumn(ridx, colInfos[j].name, rows[i][colInfos[j].name]);
							break;
					}
				}
			}
			return dataset;
		};
		_pLiteDBStatement.jsonDecodeString = function (source) {
			if (source === undefined || source === null) {
				return source;
			}
			if (typeof (source) != 'string') {
				return source;
			}
			var value = source;
			value = value.replace(/\"/g, "&quot;");
			value = value.replace(/\'/g, "&apos;");
			value = value.replace(/\r/g, "&#13;");
			value = value.replace(/\n/g, "&#10;");
			value = value.replace(/\t/g, "&#9;");
			value = value.replace(/\\/g, "&#92;");
			return value;
		};

		_pLiteDBStatement.jsonDecodeString = function (source) {
			if (source === undefined || source === null) {
				return source;
			}
			if (typeof (source) != 'string') {
				return source;
			}
			var value = source;
			value = value.replace(/\&quot\;/g, "\"");
			value = value.replace(/\&apos\;/g, "'");
			value = value.replace(/\&\#13\;/g, "\r");
			value = value.replace(/\&\#10\;/g, "\n");
			value = value.replace(/\&\#9\;/g, "\t");
			value = value.replace(/\&\#92\;/g, "\\");
			return value;
		};

		delete _pLiteDBStatement;
	}
}
