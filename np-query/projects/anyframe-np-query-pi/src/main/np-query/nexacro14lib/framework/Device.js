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

if (!nexacro.DeviceI) {
	nexacro.DeviceI = function () {
		this.setup();
	};

	var _pDeviceI = nexacro.DeviceI.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.DeviceI);
	_pDeviceI._type_name = "Device";

	_pDeviceI.apkversion = {
	};
	_pDeviceI.libraryversion = {
	};

	_pDeviceI.setup = function () {
	};

	_pDeviceI.execiOS = function () {
	};

	_pDeviceI.keyEvent = function (keytype, keyaction) {
		var _keyKind = 1;

		var MENUKEY = 82;
		var BACKKEY = 4;

		if (keytype == MENUKEY) {
			_keyKind = 1;
		}
		else if (keytype == BACKKEY) {
			_keyKind = 2;
		}
		return application.getActiveForm()._on_devicebuttonup({
			button : _keyKind
		});
	};

	_pDeviceI.makeID = function () {
		var curtime = new Date();
		var strMakeID = curtime.getMilliseconds().toString() + Math.floor(Math.random() * 100).toString();
		return parseInt(strMakeID);
	};

	_pDeviceI.runCallback = function (sid, sfunc, params) {
		var obj;

		if (nexacro.Device.curDevice == 0) {
			obj = eval("(" + params + ")");
		}
		else {
			obj = params;
		}

		var willrunfunc = this._userCreatedObj[sid];

		if ((willrunfunc != undefined) && (typeof willrunfunc[sfunc] == "function")) {
			return willrunfunc[sfunc](obj);
		}
	};

	_pDeviceI.on_created = function () {
	};

	_pDeviceI.print = function (strPrint) {
		var element = document.getElementById('DeviceAPI_status');
		element.innerHTML = element.innerHTML + strPrint + '<br />';
	};
	_pDeviceI.publicNumCheck = function (v) {
		if (v == null || v == undefined) {
			return false;
		}
		if (typeof (v) == "string" && v.length <= 0) {
			return false;
		}
		if (typeof (v) == "number") {
			return true;
		}
		return isFinite(Number(v));
	};


	_pDeviceI.pramck_makeCall = function (strPhoneNumber, bAutoDialing) {
		if (strPhoneNumber == null || typeof (strPhoneNumber) == "undefined") {
			return false;
		}
		else {
			strPhoneNumber = strPhoneNumber.toString();
		}

		var number = "";
		try {
			number = strPhoneNumber.split("+").join("");
			number = number.split("-").join("");
		}
		catch (e) {
			return false;
		}

		var normalize = /[^0-9+-]/gi;
		if (normalize.test(strPhoneNumber) == true) {
			normalize.lastIndex = 0;
			return false;
		}

		if (typeof (bAutoDialing) != "boolean") {
			return false;
		}
		return true;
	};

	_pDeviceI.paramck_play = function (strFilePath) {
		if (strFilePath == null || typeof (strFilePath) == "undefined" || typeof (strFilePath) != "string") {
			return false;
		}
		var strlength = strFilePath.split(" ").join("");
		if (strlength.length == 0) {
			return false;
		}
		return true;
	};



	_pDeviceI.pramck_contactString = function (strProperty) {
		if (strProperty == null || typeof (strProperty) == "undefined" || typeof (strProperty) != "string") {
			return false;
		}
		return true;
	};



	_pDeviceI.isConvertDateToString = function (dateString) {
		var dateStringSplit;
		var date = new Date();

		try {
			dateStringSplit = dateString.split('/');

			date.setYear(parseInt(dateStringSplit[0]) | 0);
			date.setMonth(parseInt(dateStringSplit[1]) | 0 - 1);
			date.setDate(parseInt(dateStringSplit[2]) | 0);
		}
		catch (e) {
			return date;
		}
		return date;
	};

	_pDeviceI.parseDateToInt = function (strDate) {
		if (strDate < 10) {
			strDate = "0" + strDate;
		}
		return strDate;
	};


	_pDeviceI.encodeString = function (source) {
		if (source === undefined || source === null) {
			return source;
		}
		if (typeof (source) != 'string') {
			return source;
		}
		var value = source;
		value = value.replace(/\&/g, "&amp;");
		value = value.replace(/\</g, "&lt;");
		value = value.replace(/\>/g, "&gt;");
		value = value.replace(/\"/g, "&quot;");
		value = value.replace(/\'/g, "&apos;");
		value = value.replace(/\ /g, "&#32;");
		value = value.replace(/\r/g, "&#13;");
		value = value.replace(/\n/g, "&#10;");
		value = value.replace(/\t/g, "&#9;");
		value = value.replace(/\\/g, "&#92;");
		value = value.replace(/\x03/g, "&#3;");
		return value;
	};

	_pDeviceI.decodeString = function (source) {
		if (source === undefined || source === null) {
			return source;
		}
		if (typeof (source) != 'string') {
			return source;
		}
		var value = source;
		value = value.replace(/\&amp\;/g, "&");
		value = value.replace(/\&lt\;/g, "<");
		value = value.replace(/\&gt\;/g, ">");
		value = value.replace(/\&quot\;/g, "\"");
		value = value.replace(/\&apos\;/g, "'");
		value = value.replace(/\&\#32\;/g, " ");
		value = value.replace(/\&\#13\;/g, "\r");
		value = value.replace(/\&\#10\;/g, "\n");
		value = value.replace(/\&\#9\;/g, "\t");
		value = value.replace(/\&\#92\;/g, "\\");
		value = value.replace(/\&\#3\;/g, String.fromCharCode(3));
		return value;
	};



	_pDeviceI.DatasetToJSONString = function (dataset) {
		if (dataset == undefined) {
			return '{"columnInfos":[], "rows":[]}';
		}

		var colSize = dataset.getColCount();
		var rowSize = dataset.getRowCount();

		var started = false;
		var jsonString = '{"columnInfos":[';
		for (var i = 0; i < colSize; i++) {
			var colInfo = dataset.getColumnInfo(i);
			if (started) {
				jsonString += (',{"name":"' + colInfo.name + '", "type":' + colInfo.ntype + '}');
			}
			else {
				jsonString += ('{"name":"' + colInfo.name + '", "type":' + colInfo.ntype + '}');
			}
			started = true;
		}

		started = false;
		jsonString += '],"rows":[';
		for (var i = 0; i < rowSize; i++) {
			if (started) {
				jsonString += ',[';
			}
			else {
				jsonString += '[';
			}
			started = true;

			var colStarted = false;
			for (var j = 0; j < colSize; j++) {
				var colInfo = dataset.getColumnInfo(j);
				var value = dataset.getColumn(i, colInfo.name);

				if (colStarted) {
					jsonString += ',';
				}
				colStarted = true;

				var valueString;
				if (value == null) {
					valueString = 'null';
				}
				else if (value == undefined) {
					valueString = 'undefined';
				}
				else {
					switch (colInfo.ntype) {
						case 2:
						case 3:
							valueString = nexacro.DataUtils.toTextFromDecimal(value);
							break;
						case 4:
							valueString = '"' + nexacro.DataUtils.toTextFromDecimal(value) + '"';
							break;
						case 5:
							valueString = '"' + nexacro.DataUtils.toTextFromDate(value) + '"';
							break;
						case 6:
							valueString = '"' + nexacro.DataUtils.toTextFromTime(value) + '"';
							break;
						case 7:
							if (value.dateObj == undefined) {
								valueString = '"' + nexacro.DataUtils.toTextFromDateTime(value) + '"';
							}
							else {
								valueString = '"' + nexacro.DataUtils.toTextFromDateTime(value.dateObj) + '"';
							}
							break;
						case 1:
							valueString = '"' + nexacro.Device.encodeString(value) + '"';
							break;
						case 0:
						case 8:
						case 9:
						default:
							valueString = '"' + value + '"';
							break;
					}
				}
				jsonString += valueString;
			}
			jsonString += ']';
		}
		jsonString += ']}';

		return jsonString;
	};
	_pDeviceI.DatasetToJSONObject = function (dataset) {
		return eval('(' + DatasetToJSONString(dataset) + ')');
	};
	_pDeviceI.JSONObjectToDataset = function (jsonObject, dataset) {
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
						dataset.setColumn(ridx, colInfos[j].name, nexacro.Device.decodeString(rows[i][j]));
						break;
					case 4:
						dataset.setColumn(ridx, colInfos[j].name, rows[i][j]);
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
						dataset.setColumn(ridx, colInfos[j].name, rows[i][j]);
						break;
				}
			}
		}
		return dataset;
	};
	_pDeviceI.JSONStringToDataset = function (jsonString, dataset) {
		if (dataset == undefined) {
			dataset = new nexacro.Dataset();
		}
		return nexacro.Device.JSONObjectToDataset(eval('(' + jsonString + ')'));
	};



	_pDeviceI.DatasetToJSONString2 = function (dataset) {
		if (dataset == undefined) {
			return '{"columnInfos":[], "rows":[]}';
		}

		var colSize = dataset.getColCount();
		var rowSize = dataset.getRowCount();

		var started = false;
		var jsonString = '{"columnInfos":[';
		for (var i = 0; i < colSize; i++) {
			var colInfo = dataset.getColumnInfo(i);
			if (started) {
				jsonString += (',{"name":"' + colInfo.name + '", "type":' + colInfo.ntype + '}');
			}
			else {
				jsonString += ('{"name":"' + colInfo.name + '", "type":' + colInfo.ntype + '}');
			}
			started = true;
		}

		started = false;
		jsonString += '],"rows":[';
		for (var i = 0; i < rowSize; i++) {
			if (started) {
				jsonString += ',{';
			}
			else {
				jsonString += '{';
			}
			started = true;

			var colStarted = false;
			for (var j = 0; j < colSize; j++) {
				var colInfo = dataset.getColumnInfo(j);
				var value = dataset.getColumn(i, colInfo.name);
				if (value == undefined) {
					continue;
				}

				if (colStarted) {
					jsonString += ',';
				}
				colStarted = true;

				jsonString += '"' + colInfo.name + '":';

				var valueString;
				if (value == null) {
					valueString = 'null';
				}
				else if (value == undefined) {
					valueString = 'undefined';
				}
				else {
					switch (colInfo.ntype) {
						case 2:
						case 3:
							valueString = nexacro.DataUtils.toTextFromDecimal(value);
							break;
						case 4:
							valueString = '"' + nexacro.DataUtils.toTextFromDecimal(value) + '"';
							break;
						case 5:
							valueString = '"' + nexacro.DataUtils.toTextFromDate(value) + '"';
							break;
						case 6:
							valueString = '"' + nexacro.DataUtils.toTextFromTime(value) + '"';
							break;
						case 7:
							if (value.dateObj == undefined) {
								valueString = '"' + nexacro.DataUtils.toTextFromDateTime(value) + '"';
							}
							else {
								valueString = '"' + nexacro.DataUtils.toTextFromDateTime(value.dateObj) + '"';
							}
							break;
						case 1:
							valueString = '"' + nexacro.Device.encodeString(value) + '"';
							break;
						case 0:
						case 8:
						case 9:
						default:
							valueString = '"' + value + '"';
							break;
					}
				}
				jsonString += valueString;
			}
			jsonString += '}';
		}
		jsonString += ']}';

		return jsonString;
	};
	_pDeviceI.DatasetToJSONObject2 = function (dataset) {
		return eval('(' + nexacro.Device.DatasetToJSONString2(dataset) + ')');
	};

	_pDeviceI.JSONObjectToDataset2 = function (jsonObject, dataset) {
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
						dataset.setColumn(ridx, colInfos[j].name, nexacro.Device.decodeString(rows[i][colInfos[j].name]));
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
	_pDeviceI.JSONStringToDataset2 = function (jsonString, dataset) {
		if (dataset == undefined) {
			dataset = new nexacro.Dataset();
		}

		return nexacro.Device.JSONObjectToDataset2(eval('(' + jsonString + ')'), dataset);
	};

	_pDeviceI.isHybrid = function () {
		return this._is_hybrid;
	};

	_pDeviceI.exit = function (useCache) {
		var _useCache = false;

		if (arguments.length == 0) {
			_bUseCache = "false";
		}
		else {
			if (useCache == true || (typeof (useCache) == "string" && useCache == "true")) {
				_useCache = "true";
			}
			else if (useCache == false || (typeof (useCache) == "string" && useCache == "false")) {
				_useCache = "false";
			}
			else {
				return false;
			}
		}

		if (nexacro.Device.curDevice == 1) {
			var jsonstr = "";
			jsonstr = "EXIT" + _useCache;
			nexacro.Device.exec(jsonstr);
		}
	};

	_pDeviceI = null;
}


if (nexacro.System) {
	nexacro.System.prototype = function () {
		this._id = nexacro.Device.makeID();
		nexacro.Device._userCreatedObj[this._id] = this;

		this.enableevent = true;
		if (nexacro.Device.curDevice == 1) {
			var osname = "iOS";
			var devicename, version;
			var iphone = navigator.userAgent.match(/(iPhone\sOS)\s([\d_]+)/);
			var ipad = navigator.userAgent.match(/(iPad).*OS\s([\d_]+)/);
			if (iphone) {
				devicename = "iphone";
				version = iphone[2].replace(/_/g, '.');
			}
			if (ipad) {
				devicename = "ipad";
				version = ipad[2].replace(/_/g, '.');
			}

			this.osversion = osname + " " + version;
			this.navigatorname = "nexacro";
			this.navigatorversion = "14";
			this.mobilephonenumber = "";
			this.mobileproducttype = devicename;
			this.mobileuniqueid = "";
			this.mobileorientation = "";
			this.taskbarsize = "20";
			this.userapppath = "";
		}
	};

	nexacro.System.prototype.set_osversion = function () {
	};
	nexacro.System.prototype.set_navigatorname = function () {
	};
	nexacro.System.prototype.set_navigatorversion = function () {
	};
	nexacro.System.prototype.set_mobilephonenumber = function () {
	};
	nexacro.System.prototype.set_mobileproducttype = function () {
	};
	nexacro.System.prototype.set_mobileuniqueid = function () {
	};
	nexacro.System.prototype.set_mobileorientation = function () {
	};
	nexacro.System.prototype.set_taskbarsize = function () {
	};
	nexacro.System.prototype.set_userapppath = function () {
	};
	nexacro.System.prototype.set_sdcardpath = function () {
	};

	nexacro.System.prototype.destroy = function () {
		delete nexacro.Device._userCreatedObj[this._id];
		return true;
	};



	nexacro.System.makeCall = function (strPhoneNumber, bAutoDialing) {
		if (bAutoDialing == "undefined" || bAutoDialing == null) {
			this.bAutoDialing = false;
		}
		else {
			this.bAutoDialing = bAutoDialing;
		}

		var pcheck = nexacro.Device.pramck_makeCall(strPhoneNumber, this.bAutoDialing);
		if (pcheck == true) {
			var renamephonNumber = strPhoneNumber;
			renamephonNumber = renamephonNumber.split("-").join("");

			var tempPhoneNumber = renamephonNumber.split("+").join("");
			if (tempPhoneNumber.length < 3) {
				return false;
			}

			if (nexacro.Device.curDevice == 0) {
				var params = '{"telNo":"' + renamephonNumber + '", "bAuto":"' + this.bAutoDialing + '"}';
				var jsonstr = '{"id":' + this._id + ', "div":"Call", "method":"sendCall", "params":' + params + '}';
				nexacro.Device.exec(jsonstr);
			}
			else {
				if ((typeof nexacro.Device.isHybrid() == "undefined") || nexacro.Device.isHybrid() == false) {
					return true;
				}

				nexacro.Device.bridge.src = 'tel:' + renamephonNumber;
			}
			return true;
		}
		else {
			return false;
		}
	};

	nexacro.System.getPackageVersion = function () {
		return nexacro._getPackageVersion();
	};



	nexacro.System._setAccessibilityStatus = function (v) {
		if (v.accessibilitystatus == 1) {
			nexacro.System._accessibilitystatus = true;
		}
		else {
			nexacro.System._accessibilitystatus = false;
		}
	};

	nexacro.System.getAccessibilityStatus = function () {
		if (nexacro.Device.curDevice == 0) {
			nexacro.System._accessibilitystatus = nexacro._getAccessibilityStatus();
		}
		return nexacro.System._accessibilitystatus;
	};

	nexacro.Application.enableAutoUpdate = function () {
		this._id = nexacro.Device.makeID();
		nexacro.Device._userCreatedObj[this._id] = this;

		var jsonstr = '{"id":' + this._id + ', "div":"Update",  "method":"enableAutoUpdate"}';
		nexacro.Device.exec(jsonstr);
	};


	nexacro.System.play = function (strFilePath) {
		var pcheck = nexacro.Device.paramck_play(strFilePath);
		if (pcheck == true) {
			if (nexacro.Device.curDevice == 0) {
				var EnvironmentPath = "";
				var androidFilePath = "";
				var rootPathCheck = strFilePath.substring(0, 9);

				if (rootPathCheck.toLowerCase() == "%userapp%") {
					EnvironmentPath = 1;
					androidFilePath = strFilePath.substring(9, strFilePath.length);
				}
				else if (rootPathCheck.toLowerCase() == "%sd_card%") {
					EnvironmentPath = 2;
					androidFilePath = strFilePath.substring(9, strFilePath.length);
				}
				else if (rootPathCheck.substring(0, 7) == "http://") {
					androidFilePath = strFilePath;
				}
				else {
					var _filecache = application._getFileCache(strFilePath);
					if (null != _filecache) {
						EnvironmentPath = 3;
						androidFilePath = _filecache;
					}
					else {
						return false;
					}
				}

				var params = '{"filePath":"' + androidFilePath + '", "EnvironmentPath":"' + EnvironmentPath + '"}';
			}
			else {
				var iosfilepath = "";
				var rootPathCheck = strFilePath.substring(0, 9);

				if (rootPathCheck.toLowerCase() == "%userapp%") {
					iosfilepath = "_userapp_" + strFilePath.substring(9, strFilePath.length);
				}
				else if (rootPathCheck.substring(0, 7) == "http://") {
					iosfilepath = strFilePath;
				}
				else {
					var _filecache = application._getFileCache(strFilePath);
					if (null != _filecache) {
						iosfilepath = "_userapp_" + _filecache;
					}
					else {
						return false;
					}
				}

				var params = '{"filePath":"' + iosfilepath + '"}';
			}
			var jsonstr = '{"id":' + this._id + ', "div":"Sound", "method":"shotplay", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
			return true;
		}
		else {
			return false;
		}
	};

	nexacro.System.stop = function () {
		var params = '""';
		var jsonstr = '{"id":' + this._id + ', "div":"Sound", "method":"shotstop", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
		return true;
	};

	nexacro.System.getSystemInfo = function () {
		this._id = nexacro.Device.makeID();
		nexacro.Device._userCreatedObj[this._id] = this;
		nexacro.Device.exec('{"id":' + this._id + ', "div":"PhoneInfo","method":"getAll"}');
	};

	nexacro.System.recvPhoneInfo = function (params) {
		nexacro.System.osversion = params.osversion;
		nexacro.System.mobilephonenumber = params.mobilephonenumber;
		nexacro.System.mobileproducttype = params.mobileproducttype;
		nexacro.System.mobileuniqueid = params.mobileuniqueid;
		nexacro.System.mobileorientation = params.mobileorientation;
		this.userapppath = params.userapppath;
		this.sdcardpath = "";

		if (nexacro.Device.curDevice == 1) {
			nexacro.Device.isphone = params.isIPhone;
			nexacro.System.computername = params.computername;
			nexacro.System.cpuarchitecture = params.cpuarchitecture;
			nexacro.System.cputype = params.cputype;
			nexacro.System.cpucount = params.cpucount;
			nexacro.Device.libraryversion[0] = params.libraryversion;
			if (params.accessibility == 1) {
				nexacro.System._accessibilitystatus = true;
			}
			else {
				nexacro.System._accessibilitystatus = false;
			}
		}
		oninitend();
	};

	nexacro.System.setOrientation = function (nOrientation) {
		this.mobileorientation = nOrientation;
		if (nexacro.Device.curDevice == 1) {
			nexacro.System.mobileorientation = nOrientation;
		}
	};
}


nexacro._initDeviceAPI = function () {
	nexacro.Device = new nexacro.DeviceI();
	if (nexacro.Device.isHybrid()) {
		if (window.system) {
			if (nexacro.Device.curDevice == 1) {
				nexacro.System.prototype();
				nexacro.System.getSystemInfo();
			}
		}
	}
};

