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

if (!nexacro.ExcelImportObject) {
	nexacro.ExcelImportEventInfo = function (obj, id, url, refferObj) {
		this.id = this.eventid = id || "onsuccess";
		this.fromobject = obj;
		this.fromreferenceobject = refferObj;
		this.url = url;
	};
	var _pExcelImportEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ExcelImportEventInfo, nexacro.ExcelImportEventInfo);
	nexacro.ExcelImportEventInfo.prototype = _pExcelImportEventInfo;
	_pExcelImportEventInfo._type_name = "ExcelImportEventInfo";

	delete _pExcelImportEventInfo;


	nexacro.ExcelImportErrorEventInfo = function (obj, id, errortype, errormsg, errorobj, statuscode) {
		this.id = this.eventid = id || "onerror";
		this.fromobject = obj;
		this.fromreferenceobject = errorobj;
		this.errortype = errortype;
		this.errormsg = errormsg;
		this.statuscode = statuscode;
	};
	var _pExcelImportErrorEventInfo = nexacro._createPrototype(nexacro.ErrorEventInfo, nexacro.ExcelImportErrorEventInfo);
	nexacro.ExcelImportErrorEventInfo.prototype = _pExcelImportErrorEventInfo;
	_pExcelImportErrorEventInfo._type_name = "ExcelImportErrorEventInfo";

	delete _pExcelImportErrorEventInfo;

	nexacro.ExcelImportObject = function (name, parent) {
		this.id = this.name = name;

		if (!parent) {
			parent = application.getActiveForm();
			if (!parent) {
				parent = application.mainframe.childframe.form;
			}
		}
		this.parent = parent;

		this._handle = null;

		this.importfilemode = "local";
		this._importfilemode = 0;
		this.commcompress = "none";
		this._commcompress = false;
		this.importtype = nexacro.ImportTypes.EXCEL;
		this.importurl = "";
		this._importurl = "";
		this._uploadurl = "";
		this._uploadservlet = "";

		this._fileurl = "";
		this._range = "";
		this._applyAllsheet = false;

		this._responseData = "";
		this._responseRVal = null;
		this._responseLVal = null;
		this.userawdatevalue = false;
		this._userawdatevalue = false;
		this._file_password = null;

		this.usedatevalue = null;

		this._importSheet = "";
		this._importStartCell = null;
		this._importEndCell = null;

		this._tran_item = null;
		this._file_url_ds = null;

		var unique_id = this._unique_id = this.parent._unique_id + "_" + this.id;
		if (!nexacro._get_hidden_frame(unique_id, this._handle)) {
			var ranid = new Date().valueOf().toString();

			nexacro._create_hidden_frame(unique_id, ranid, this._uploadComplete, this);
			nexacro._append_hidden_item(unique_id, "upfile", this._checkUploadFile, this, this._handle);
			nexacro._append_hidden_textitem(unique_id, "ds_command");
		}

		this.onerror = new nexacro.EventListener("onerror");
		this.onsuccess = new nexacro.EventListener("onsuccess");

		this._event_list = 
			{
			"onerror" : 1, 
			"onsuccess" : 1
		};
	};
	var _pExcelImport = nexacro.ExcelImportObject.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.ExcelImportObject);
	_pExcelImport._type_name = "ExcelImportObject";

	_pExcelImport.on_created = nexacro._emptyFn;

	_pExcelImport.set_name = function (v) {
		this.id = this.name = v;
	};

	_pExcelImport.set_importtype = function (v) {
		switch ((v + "").toUpperCase()) {
			case "EXCEL":
				v = 0x0100;
				break;
			case "EXCEL97":
				v = 0x0110;
				break;
			case "EXCEL2007":
				v = 0x0120;
				break;
			case "HANCELL2010":
				v = 0x0400;
				break;
			case "HANCELL2014":
				v = 0x0410;
				break;
			case "CSV":
				v = 0x0500;
				break;
		}
		if (v != this.importtype) {
			this.importtype = v;
		}
		return v;
	};

	_pExcelImport.set_importurl = function (v) {
		if (v != this.importurl) {
			this.importurl = v;
			if (v == null) {
				this._importurl = "";
			}
			else {
				var uploadservlet = this._uploadservlet = application._getServiceLocation(v, this.parent._getFormBaseUrl());
				var baseurl = uploadservlet.substring(0, uploadservlet.lastIndexOf("/") + 1);
				this._importurl = baseurl + "XExportImport";
			}
		}
		return v;
	};

	_pExcelImport.set_commcompress = function (v) {
		if (v != this.commcompress) {
			this.commcompress = v;
			switch (v.toString().toUpperCase()) {
				case "COMPRESS":
					this._commcompress = true;
					break;
				default:
					this._commcompress = false;
					break;
			}
		}
		return v;
	};

	_pExcelImport.set_importfilemode = function (v) {
		if (this.importfilemode != v) {
			this.importfilemode = v;
			this._importfilemode = v == "server" ? 1 : 0;
		}
		return v;
	};

	_pExcelImport.set_userawdatevalue = function (v) {
		if (this.userawdatevalue != v) {
			this.userawdatevalue = v;
			this._userawdatevalue = nexacro._toBoolean(v);
		}
		return v;
	};

	_pExcelImport._setImportRange = function (range) {
		var obj = {
		};
		if (range) {
			if (range.indexOf("!") > 0) {
				var rg = range.split("!");
				obj["sheet"] = rg[0];
				var cells = rg[1];
				var temp;
				if (cells.indexOf(":") > 0) {
					cells = cells.split(":");
					temp = this._getExcelRowCol(cells[0]);
					obj["startRow"] = temp[1] ? temp[1] : "";
					obj["startCol"] = temp[0] ? temp[0] : "";
					temp = this._getExcelRowCol(cells[1]);
					obj["endRow"] = temp[1] ? temp[1] : "";
					obj["endCol"] = temp[0] ? temp[0] : "";
				}
				else {
					temp = this._getExcelRowCol(cells);
					obj["startRow"] = temp[1] ? temp[1] : "";
					obj["startCol"] = temp[0] ? temp[0] : "";
					obj["endRow"] = "";
					obj["endCol"] = "";
				}
			}
		}
		else {
			obj["sheet"] = "";
			obj["startRow"] = "";
			obj["startCol"] = "";
			obj["endRow"] = "";
			obj["endCol"] = "";
		}
		this._range.push(obj);
	};

	_pExcelImport.importData = function (fileurl, range, responseData, userData) {
		this._file_password = null;
		this._fileurl = "";

		if (arguments.length < 3) {
			return false;
		}

		if (!this.importurl) {
			return false;
		}

		var mode = this.importfilemode.toLowerCase();
		if (mode != "server" || !fileurl) {
			this._importfilemode = 0;
		}
		else {
			this._importfilemode = 1;
		}


		if (range) {
			this._range = range;
		}
		else {
			this._range = "";
		}

		if (responseData) {
			this._responseLVal = [];
			this._responseRVal = [];
			var temp_response = "";
			var responseDatas = nexacro.replaceAll(responseData, " ", "").split(",");
			for (var i = 0, r_len = responseDatas.length; i < r_len; i++) {
				var responArr = responseDatas[i].match(/[_A-Za-z0-9]+/g);
				this._responseLVal.push(responArr[0]);
				if (responArr[1] == null) {
					responArr[1] = "output" + (i + 1);
				}
				this._responseRVal.push(responArr[1]);
				temp_response += " " + responArr[0] + "=" + responArr[1];
			}
			this._responseData = temp_response;
		}

		if (userData) {
			var userDatas = nexacro.replaceAll(userData, " ", "").split(",");
			for (var i = 0, u_len = userDatas.length; i < u_len; i++) {
				var dataArr = userDatas[i].split("=");
				if (dataArr[0] == "filepassword") {
					this._file_password = dataArr[1];
					userDatas.splice(i, 1);
					userData = userDatas.join(",");
					break;
				}
			}
		}
		this._user_data = userData;

		if (!this._importfilemode) {
			nexacro._findclick(this._unique_id, "upfile", this, this._handle);
		}
		else {
			if (this._checkFileName(fileurl)) {
				this._fileurl = fileurl;
				this._requestImport(fileurl);
			}
			else {
				var errormsg = "the file extension is wrong";
				var evt = new nexacro.ExcelImportErrorEventInfo(this, "onerror", "ObjectError", errormsg, this, -1);
				this.on_fire_onerror(this, evt);
				return false;
			}
		}

		return true;
	};

	_pExcelImport.destroy = function () {
		var unique_id = this._unique_id;
		nexacro._remove_hidden_item(unique_id, "upfile", this._handle);
		nexacro._remove_hidden_item(unique_id, "ds_command", this._handle);
		nexacro._destroy_hidden_frame(unique_id, this, this._handle);

		if (this.parent) {
			this.parent.removeChild(this.id);
		}
		this._handle = null;
		this.parent = null;
		return true;
	};

	_pExcelImport.on_fire_onerror = function (obj, e) {
		this._setWaitCursor(false);
		var event = this.onerror;
		if (event && event._has_handlers) {
			event._fireEvent(this, e);
		}
	};

	_pExcelImport.on_fire_onsuccess = function (obj, e) {
		this._setWaitCursor(false);
		var event = this.onsuccess;
		if (event && event._has_handlers) {
			event._fireEvent(this, e);
		}
	};


	_pExcelImport._getExcelRowCol = function (cell) {
		var strLen = cell.length;
		var arr = [];
		for (var i = 0; i < strLen; i++) {
			if (!isNaN(cell[i])) {
				arr.push(cell.substring(0, i));
				arr.push(cell.substring(i));
				break;
			}
		}
		return arr;
	};

	_pExcelImport._transaction = function (id, url, inDatasetsParam, outDatasetsParam, userData, callbackFn, isAsync, datatype, isCompress) {
		this._load_manager = new nexacro.LoadManager(this);
		var service = application._getServiceObject(url, true);
		this._load_manager.loadDataModule(url, id, inDatasetsParam, outDatasetsParam, userData, callbackFn, isAsync, datatype, isCompress, service);
	};

	_pExcelImport._getDataset = function (ds_id) {
		var form = this.parent;
		if (!form) {
			form = this._getForm();
		}

		var r_val = this._responseRVal;
		var len = r_val.length;

		for (var i = 0; i < len; i++) {
			if (r_val[i] == ds_id) {
				return form[this._responseLVal[i]];
			}
		}
		return null;
	};

	_pExcelImport._waitCursor = nexacro._emptyFn;
	_pExcelImport._setParamter = nexacro._emptyFn;
	_pExcelImport._getDatasetObject = function (queryid) {
		var _ds = this[queryid];
		if (_ds == null && this.parent && this.parent != application) {
			_ds = this.parent._getDatasetObject(queryid);
		}

		if (_ds == null) {
			_ds = application[queryid];
		}

		return _ds;
	};

	_pExcelImport._getForm = function () {
		var form = application.getActiveForm();
		if (!form) {
			form = application.mainframe.childframe.form;
		}
		return form;
	};

	_pExcelImport._isPopupFrame = function () {
		return false;
	};


	_pExcelImport._makeImportFormat = function () {
		var str = "<Import>";
		str += "<Sheets>";

		var sheets = this._range.split(",");
		var properties = "";

		for (var i = 0, s_len = sheets.length; i < s_len; i++) {
			sheets[i] = nexacro.replaceAll(sheets[i], "[", "");
			sheets[i] = nexacro.replaceAll(sheets[i], "]", "");

			str += "<Sheet ";

			properties = sheets[i].split(";");

			if (properties == null) {
				var range = sheets[i];
				if (range.indexOf("!") > 0) {
					var range_arr = range.split("!");
					if (range_arr[1].indexOf(":") > 0) {
						var sheet = range_arr[0];
						var range = range_arr[1].split(":");
						var start_row = range[0].match(/[0-9]+/);
						var start_col = range[0].match(/[A-Z]+/);
						var body_start_row = +start_row + 1;

						var end_row = range[1].match(/[0-9]+/);
						var end_col = range[1].match(/[A-Z]+/);

						str += 'command=\"getsheetdata\" output=\"' + this._responseRVal + '\" head=\"' + sheet + '!' + start_col + start_row + ':' + end_col + start_row + '\" body=\"' + sheet + '!' + start_col + (+start_row + 1) + ':' + end_col + end_row + '\" />';
					}
					else {
						str += 'command=\"getsheetdata\" output=\"' + this._responseRVal + '\" Body=\"' + sheets[i] + '\" />';
					}
				}
				else {
					str += 'command=\"getsheetdata\" output=\"' + this._responseRVal + '\" Body=\"' + sheets[i] + '\" />';
				}
			}
			else {
				var tmp_num = 1;
				var flag = false;
				var property = "";
				for (var j = 0, p_len = properties.length; j < p_len; j++) {
					if (!properties[j].length) {
						continue;
					}

					property = properties[j].split("=");

					var property_name = property[0].toLowerCase();

					if (property_name != "command") {
						if (j == 0) {
							str += 'command=\"getsheetdata\" ';
						}
						if (property_name == "output") {
							flag = true;
						}
					}
					str += property_name + "=\"" + property[1] + "\" ";
				}

				if (!flag) {
					str += 'output=\"output' + tmp_num + '\" ';
					tmp_num++;
				}
				str += "/>";
			}
		}

		str += "</Sheets>";
		str += "</Import>";

		return str;
	};

	_pExcelImport._requestImport = function (fileUrl) {
		var ds_command = new Dataset("COMMAND");
		this._ds_command = ds_command;

		ds_command.addColumn("command", "String", 32);
		ds_command.addColumn("type", "int", 32);
		ds_command.addColumn("url", "String", 256);
		ds_command.addColumn("format", "String", 256);
		ds_command.addColumn("filemode", "String", 256);
		ds_command.addColumn("password", "String", 256);
		ds_command.addColumn("rawdatevalue", "String", 256);

		ds_command.addRow();

		ds_command.setColumn(0, "command", "import");
		ds_command.setColumn(0, "type", this._importType);
		ds_command.setColumn(0, "url", encodeURIComponent(fileUrl));
		ds_command.setColumn(0, "format", this._makeImportFormat());
		ds_command.setColumn(0, "filemode", this._importfilemode ? "server" : "local");
		ds_command.setColumn(0, "password", this._file_password);
		ds_command.setColumn(0, "rawdatevalue", this._userawdatevalue);

		if (this._ds_response) {
			delete this._ds_response;
		}

		var datasets = this._responseLVal;
		for (var i = 0, d_len = datasets.length; i < d_len; i++) {
			var reponseDS = this.parent[datasets[i]];
			if (reponseDS) {
			}
			else {
				var errormsg = "Dataset is null";
				var evt = new nexacro.ExcelImportErrorEventInfo(this, "onerror", "ObjectError", errormsg, this, -2011);
				this.on_fire_onerror(this, evt);
				return;
			}
		}

		this._file_url_ds = new Dataset("_file_url_ds", this);

		var tran_item = this._tran_item = new nexacro.TransactionItem(this._importurl, this, this.id, "COMMAND=_ds_command", this._responseData + ", _file_url_ds=IMPORTFILES", this._user_data, 0, true);

		var send_data = tran_item._sendData;
		nexacro._setImportCommand(this._unique_id, "ds_command", this, this._handle, send_data);

		nexacro._submit(this._unique_id, this._uploadservlet, this._handle, send_data, fileUrl);
	};

	if (nexacro.Browser == "Runtime") {
		_pExcelImport._uploadComplete = function (status, data, url, errcode, httpcode, errmsg) {
			var evt, error_info, fileUrl, unique_id = this._unique_id, code = -1, msg = "", result = null;
			if (status < 0) {
				application._onHttpSystemError(this, true, this, errcode, url, httpcode, url, null);

				var errormsg = nexacro._GetSystemErrorMsg(this, errcode);
				evt = new nexacro.ExcelImportErrorEventInfo(this, "onerror", "ObjectError", errormsg, this, 9901);
				this.on_fire_onerror(this, evt);
			}
			else {
				if (data) {
					result = this._tran_item._deserializeData(data);

					error_info = result[0];
					if (error_info) {
						code = error_info[0];
						msg = error_info[1];
					}
				}
				this._tran_item = null;
				if (code < 0) {
					evt = new nexacro.ExcelImportErrorEventInfo(this, "onerror", "ObjectError", msg, this, 9901);
					this.on_fire_onerror(this, evt);
				}
				else {
					fileUrl = this._fileurl = this._file_url_ds ? this._file_url_ds.getColumn(0, 3) : null;
					this._file_url_ds = null;
					var evt = new nexacro.ExcelImportEventInfo(this, "onsuccess", fileUrl, this);
					this.on_fire_onsuccess(this, evt);
				}
			}
			nexacro._remove_hidden_item(unique_id, "upfile", this._handle);
			nexacro._append_hidden_item(unique_id, "upfile", this._checkUploadFile, this, this._handle);
		};
	}
	else {
		_pExcelImport._uploadComplete = function () {
			var url, error_info, evt, fileUrl, code = -1, msg = "", result = null, unique_id = this._unique_id;
			try {
				var xmldoc = nexacro._getXMLDocument(unique_id);
				url = xmldoc.URL ? xmldoc.URL : xmldoc.url;
				if (url == "about:blank") {
					return;
				}

				result = this._tran_item._deserializeData(nexacro._getDataFromDOM(xmldoc));
				this._tran_item = null;

				error_info = result[0];
				if (error_info) {
					code = error_info[0];
					msg = error_info[1];
				}

				if (code < 0) {
					evt = new nexacro.ExcelImportErrorEventInfo(this, "onerror", "ObjectError", msg, this, 9901);
					this.on_fire_onerror(this, evt);
				}
				else {
					fileUrl = this._fileurl = this._file_url_ds ? this._file_url_ds.getColumn(0, 3) : null;
					this._file_url_ds = null;
					evt = new nexacro.ExcelImportEventInfo(this, "onsuccess", fileUrl, this);
					this.on_fire_onsuccess(this, evt);
				}
			}
			catch (e) {
				evt = new nexacro.ExcelImportErrorEventInfo(this, "onerror", "ObjectError", "failed to get", this, 9901);
				this.on_fire_onerror(this, evt);
			}
			nexacro._remove_hidden_item(unique_id, "upfile", this._handle);
			nexacro._append_hidden_item(unique_id, "upfile", this._checkUploadFile, this, this._handle);
		};
	}

	_pExcelImport._checkFileName = function (str) {
		if (str == null) {
			return false;
		}
		var checkExcel = false;
		var extension = "";
		var index = str.lastIndexOf("\\");
		var filename = str.substring(index + 1);
		var _split = filename.split(".");
		var len = _split.length;
		if (len > 1) {
			extension = _split[len - 1];
			switch (extension) {
				case "xls":
					checkExcel = true;
					this._importType = nexacro.ImportTypes.EXCEL97;
					break;
				case "xlsx":
					checkExcel = true;
					this._importType = nexacro.ImportTypes.EXCEL2007;
					break;
				case "cell":
					checkExcel = true;
					this._importType = nexacro.ImportTypes.HANCELL;
					break;
				case "csv":
					checkExcel = true;
					this._importType = nexacro.ImportTypes.CSV;
					break;
				default:
					if (this._importfilemode) {
						checkExcel = true;
						this._importType = this.importtype;
					}
					break;
			}
		}
		else {
			if (this._importfilemode) {
				checkExcel = true;
				this._importType = this.importtype;
			}
		}
		return checkExcel;
	};

	_pExcelImport._checkUploadFile = function (excel) {
		this._setWaitCursor(true);
		if (this._checkFileName(excel)) {
			this._requestImport(excel);
		}
		else {
			var errormsg = "the file extension is wrong";
			var evt = new nexacro.ExcelImportErrorEventInfo(this, "onerror", "ObjectError", errormsg, this, -1);
			this.on_fire_onerror(this, evt);
		}
	};

	_pExcelImport._setWaitCursor = function (wait_flag) {
		var form = this._getForm();
		if (form) {
			form.setWaitCursor(wait_flag, true);
		}
	};

	_pExcelImport._getWindow = function () {
		var form = this.parent;
		if (form._is_form) {
			return form._getWindow();
		}
		return null;
	};

	_pExcelImport._getWindowHandle = function () {
		var form = this.parent;
		if (form._is_form) {
			return form._getWindowHandle();
		}
		return null;
	};

	_pExcelImport._changeFiles = nexacro._emptyFn;

	delete _pExcelImport;
}
