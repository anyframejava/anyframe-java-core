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

if (!nexacro.Device) {
	nexacro.DeviceI = function () {
		this._userCreatedObj = {
		};
		this.curDevice = 0;
		this.isphone = 0;
		this._is_hybrid = true;
	};

	var _pDeviceI = nexacro.DeviceI.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.DeviceI);
	_pDeviceI._type_name = "Device";
	_pDeviceI.setup = function () {
	};
	_pDeviceI.execiOS = function () {
	};

	_pDeviceI.exec = function (method) {
	};
	_pDeviceI.makeID = function () {
	};
	_pDeviceI.runCallback = function (sid, sfunc, params) {
	};
	_pDeviceI.on_created = function () {
	};
	_pDeviceI.isHybrid = function () {
	};

	_pDeviceI.publicNumCheck = function () {
	};
	_pDeviceI.paramck_folderName = function (strName) {
	};
	_pDeviceI.publicNumCheck_Sms = function () {
	};
	_pDeviceI.pramck_makeCall = function (strPhoneNumber, bAutoDialing) {
	};
	_pDeviceI.paramck_play = function (strFilePath) {
	};
	_pDeviceI.paramck_phoneNumber = function (strPhoneNumber) {
	};
	_pDeviceI.paramck_message = function (strMessage) {
	};
	_pDeviceI.paramck_sendMessage = function (strPhoneNumber, strMessage) {
	};
	_pDeviceI.paramck_deleteMessage = function (id) {
	};
	_pDeviceI.paramck_AudioLoad = function (strFilePath) {
	};
	_pDeviceI.paramck_isReachable = function (strUrl) {
	};
	_pDeviceI.paramck_watchStart = function (strTime) {
	};
	_pDeviceI.parmack_Geolocation = function (nAccuracy, nTimeout, method) {
	};
	_pDeviceI.paramck_vibstartpos = function (v) {
	};
	_pDeviceI.paramck_vibrepeatcount = function (v) {
	};
	_pDeviceI.paramck_vibpattern = function (obj) {
	};
	_pDeviceI.paramck_accuracy = function (v) {
	};
	_pDeviceI.parmack_AccelgetCurrentPosition = function (nAccuracy) {
	};
	_pDeviceI.pramck_AccelwatchStart = function (nIntervalTime, nAccuracy) {
	};
	_pDeviceI.pramck_virtualproperty = function (property) {
	};
	_pDeviceI.pramck_asyncOpen = function (strFileName, nOptions) {
	};
	_pDeviceI.pramck_asyncRead = function (nLength) {
	};
	_pDeviceI.pramck_asyncReadLine = function (strDelimeter) {
	};
	_pDeviceI.paramck_asyncSeek = function (nOffset, nOption) {
	};
	_pDeviceI.pramck_asyncDelete = function (strFilePath) {
	};
	_pDeviceI.pramck_asyncIsExist = function (strPath) {
	};
	_pDeviceI.pramck_asyncGetFileList = function (strPath, strSearchExpr, constOption) {
	};
	_pDeviceI.pramck_filedialog_defaultextension = function (property) {
	};
	_pDeviceI.pramck_filedialog_filter = function (property) {
	};
	_pDeviceI.pramck_filedialog_numbercheck = function (property) {
	};
	_pDeviceI.pramck_filedialogasyncOpen = function (strTitle, constOpenMode, strInitialPath, strFileName) {
	};
	_pDeviceI.pramck_contactString = function (strProperty) {
	};
	_pDeviceI.isConvertDateToString = function (dateString) {
	};
	_pDeviceI.isValidDate = function (argDate) {
	};
	_pDeviceI.pramk_ContactFieldArray = function (argContactFieldArr) {
	};
	_pDeviceI.pramk_ContactIMArray = function (argContactIMArr) {
	};
	_pDeviceI.pramk_ContactAddressArray = function (argContactAddressArr) {
	};
	_pDeviceI.pramk_ContactOrganizationArray = function (argContactOrganizationArr) {
	};
	_pDeviceI.pramk_ContactPhotoArray = function (argContactPhotoArr) {
	};
	_pDeviceI.parseDateToInt = function (strDate) {
	};
	_pDeviceI.paramck_takePicture = function (nQuality, nWidth, nHeight, strEncodingType, strGetType) {
	};
	_pDeviceI.paramck_busytimeout = function (timout) {
	};
	_pDeviceI.paramck_datasource = function (datasrc) {
	};
	_pDeviceI.paramck_asyncOpen = function (strDataSource, constOpenFlag) {
	};
	_pDeviceI.paramck_query = function (db_query) {
	};
	_pDeviceI.paramck_paramck_ldbconnection = function (objconnection) {
	};
	_pDeviceI.paramck_asyncExecuteQuery = function (db_query) {
	};
	_pDeviceI.paramck_ImagePicker_asyncOpen = function (nQuality, nWidth, nHeight, strEncodingType, strGetType) {
	};
	_pDeviceI.encodeString = function (source) {
	};
	_pDeviceI.DatasetToJSONString = function (dataset) {
	};
	_pDeviceI.DatasetToJSONObject = function (dataset) {
	};
	_pDeviceI.JSONObjectToDataset = function (jsonObject, dataset) {
	};
	_pDeviceI.JSONStringToDataset = function (jsonString, dataset) {
	};
	_pDeviceI.DatasetToJSONString2 = function (dataset) {
	};
	_pDeviceI.DatasetToJSONObject2 = function (dataset) {
	};
	_pDeviceI.JSONObjectToDataset2 = function (jsonObject, dataset) {
	};
	_pDeviceI.JSONStringToDataset2 = function (jsonString, dataset) {
	};
	_pDeviceI.exit = function (useCache) {
	};
	_pDeviceI = null;

	nexacro.Device = new nexacro.DeviceI();
	if (nexacro.Device.isHybrid()) {
		if (window.system) {
			if (nexacro.Device.curDevice == 1) {
				nexacro.System.prototype();
				nexacro.System.getSystemInfo();
			}
		}
	}

	if (nexacro.System) {
		nexacro.System.makeCall = function (strPhoneNumber, bAutoDialing) {
		};
		nexacro.System.execBrowserHybrid = function (strUrl) {
		};
		nexacro.System.play = function (strFilePath) {
		};
		nexacro.System.stop = function () {
		};
		nexacro.System.getSystemInfo = function () {
		};
		nexacro.System.recvPhoneInfo = function (params) {
		};
		nexacro.System.setOrientation = function (nOrientation) {
		};
		nexacro.System.getPackageVersion = function () {
		};
	}
}


if (!nexacro.Sms) {
	nexacro.Sms = function (name, obj) {
		this._id = nexacro.Device.makeID();
		nexacro.Device._userCreatedObj[this._id] = this;
		this._refform = obj;

		this.name = name || "";
		this.phonenumber = "";
		this.message = "";

		this.enableevent = true;
		this._is_alive = true;

		this._event_list = 
			{
			"cansendmessage" : 1, 
			"onsendmessage" : 1, 
			"onrecvmessage" : 1, 
			"ondeletemessage" : 1, 
			"onerror" : 1, 
			"onreadmessagelist" : 1
		};

		this.cansendmessage = null;
		this.onsendmessage = null;
		this.onrecvmessage = null;
		this.ondeletemessage = null;
		this.onerror = null;
		this.onreadmessagelist = null;

		var params = '""';
		var jsonstr;

		jsonstr = '{"id":' + this._id + ', "div":"Sms", "method":"constructor", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	var _pSms = nexacro.Sms.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.Sms);
	_pSms._type_name = "Sms";

	_pSms.destroy = function () {
		var params = '""';
		var jsonstr;
		this._is_alive = false;

		delete nexacro.Device._userCreatedObj[this._id];

		jsonstr = '{"id":' + this._id + ', "div":"Sms", "method":"destroy", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);

		return true;
	};

	_pSms.on_created = function () {
	};

	_pSms._getReferenceContext = function () {
		return this._refform;
	};

	_pSms.set_phonenumber = function (v) {
		if (this.paramck_phoneNumber(v) == true) {
			this.phonenumber = v;
			return true;
		}
		return false;
	};

	_pSms.set_message = function (v) {
		if (this.paramck_message(v) == true) {
			this.message = v;
			return true;
		}
		return false;
	};

	_pSms.sendMessage = function (strPhoneNumber, strMessage) {
		if (nexacro.Device.curDevice != 0) {
			if (nexacro.SystemType == "ipad") {
				this.sendUnsupportedFunc();
				return false;
			}
			if (Number(nexacro.OSVersion.substring(0, 1)) < 4) {
				this.sendUnsupportedFunc();
				return false;
			}
		}

		var objSmsMessage = new nexacro.SmsMessage("SmsMessage", this);
		objSmsMessage.set_smsid("-1");

		if (strPhoneNumber == null && strMessage == null) {
			objSmsMessage.set_phonenumber(this.phonenumber || "");
			objSmsMessage.set_message(this.message || "");
		}
		else if (strPhoneNumber && strMessage) {
			if (typeof (strPhoneNumber) == "undefined") {
				strPhoneNumber = "";
			}
			if (typeof (strMessage) == "undefined") {
				strMessage = "";
			}

			if (!objSmsMessage.set_phonenumber(strPhoneNumber)) {
				return false;
			}

			objSmsMessage.set_message(strMessage);
		}
		else if (strPhoneNumber != null || strMessage != null) {
			if (typeof (strPhoneNumber) == "undefined") {
				strPhoneNumber = "";
			}
			if (!objSmsMessage.set_phonenumber(strPhoneNumber)) {
				return false;
			}

			objSmsMessage.set_message(strMessage || "");
		}
		else {
			return false;
		}

		var cansendFlag = this._cansendmessage(objSmsMessage.phonenumber, objSmsMessage.message);
		if (cansendFlag != null) {
			if (cansendFlag.toString() == "false") {
				return false;
			}
		}

		if (this.paramck_sendMessage(objSmsMessage.phonenumber, objSmsMessage.message)) {
			var params;
			var jsonstr;
			var renamephonNumber = objSmsMessage.phonenumber.split("+").join("");

			if (nexacro.Device.curDevice == 0) {
				params = '{"number":"' + renamephonNumber + '", "msg":"' + objSmsMessage.message + '"}';
			}
			else {
				params = '{  "number":"' + objSmsMessage.phonenumber;
				params += '", "msg":"' + objSmsMessage.message.replace(/\n/g, "_NEWLINE_");
				params += '"}';
			}

			jsonstr = '{"id":' + this._id + ', "div":"Sms", "method":"sendMessage", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);

			return true;
		}
		else {
			return false;
		}
	};

	_pSms.recvStart = function () {
		if (nexacro.Device.curDevice == 0) {
			var params = '""';
			var jsonstr = '{"id":' + this._id + ', "div":"Sms", "method":"recvStart", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
		}
		else {
			this.sendUnsupportedFunc();
		}
	};

	_pSms.recvStop = function () {
		if (nexacro.Device.curDevice == 0) {
			var params = '""';
			var jsonstr = '{"id":' + this._id + ', "div":"Sms", "method":"recvStop", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
		}
		else {
			this.sendUnsupportedFunc();
		}
	};

	_pSms.readMessageList = function () {
		if (nexacro.Device.curDevice == 0) {
			var params = '""';
			var jsonstr = '{"id":' + this._id + ', "div":"Sms", "method":"readMessageList", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
		}
		else {
			this.sendUnsupportedFunc();
		}
	};

	_pSms.deleteMessage = function (_id) {
		if (nexacro.Device.curDevice != 0) {
			this.sendUnsupportedFunc();
			return false;
		}

		this.index = _id;
		if (this.paramck_deleteMessage(this.index)) {
			if (nexacro.Device.curDevice == 0) {
				this.id = _id;
				var params = '{"id":"' + this.id + '"}';
				var jsonstr = '{"id":' + this._id + ', "div":"Sms", "method":"deleteMessage", "params":' + params + '}';
				nexacro.Device.exec(jsonstr);
			}
			return true;
		}
		else {
			return false;
		}
	};

	_pSms._onsendmessage = function (objData) {
		var e;
		if (nexacro.Device.curDevice == 0) {
			e = new nexacro.SmsEventInfo("onsendmessage", objData.smsid, objData.phonenumber, objData.message);
		}
		else {
			e = new nexacro.SmsEventInfo("onsendmessage", -1, objData.phonenumber, objData.message);
		}
		this._fire_onsendmessage(this, e);
	};

	_pSms._fire_onsendmessage = function (objSms, eSmsEventInfo) {
		if (this.onsendmessage && this.onsendmessage._has_handlers) {
			return this.onsendmessage._fireEvent(this, eSmsEventInfo);
		}
		return true;
	};

	_pSms._onrecvmessage = function (objData) {
		var e = new nexacro.SmsEventInfo("onrecvmessage", objData.smsid, objData.phonenumber, objData.message);
		this._fire_onrecvmessage(this, e);
	};

	_pSms._fire_onrecvmessage = function (objSms, eSmsEventInfo) {
		if (this.onrecvmessage && this.onrecvmessage._has_handlers) {
			return this.onrecvmessage._fireEvent(this, eSmsEventInfo);
		}
		return true;
	};

	_pSms._onreadmessagelist = function (objData) {
		var arr = new Array(objData.length);
		for (var i = 0; i < objData.length; i++) {
			var jsonOb = eval("(" + objData[i] + ")");
			var temp = new nexacro.SmsMessage(jsonOb.id, jsonOb.phonenumber, jsonOb.message, jsonOb.type, jsonOb.date);
			arr[i] = temp;
		}
		var e = new nexacro.SmsMessagListEventInfo(arr);
		this._fire_onreadmessagelist(this, e);
	};

	_pSms._fire_onreadmessagelist = function (objSms, eSmsMsgList) {
		if (this.onreadmessagelist && this.onreadmessagelist._has_handlers) {
			return this.onreadmessagelist._fireEvent(this, eSmsMsgList);
		}
		return true;
	};

	_pSms._ondeletemessage = function (objData) {
		var e = new nexacro.SmsEventInfo("ondeletemessage", objData.smsid, objData.phonenumber, objData.message);
		this._fire_ondeletemessage(this, e);
	};

	_pSms._fire_ondeletemessage = function (objSms, eSmsEventInfo) {
		if (this.ondeletemessage && this.ondeletemessage._has_handlers) {
			return this.ondeletemessage._fireEvent(this, eSmsEventInfo);
		}
		return true;
	};

	_pSms._cansendmessage = function (strPhoneNumber, strMessage) {
		var e;

		if (nexacro.Device.curDevice == 0) {
			if (nexacro.__getMobileProductType().toLowerCase() == "shw-m380s") {
				this.sendUnsupportedFunc();
				return false;
			}
			e = new nexacro.SmsEventInfo("cansendmessage", "-1", strPhoneNumber, strMessage);
		}
		else {
			if (nexacro.SystemType == "ipad") {
				this.sendUnsupportedFunc();
				return false;
			}
			e = new nexacro.SmsEventInfo("cansendmessage", -1, strPhoneNumber, strMessage);
		}

		return this._fire_cansendmessage(this, e);
	};

	_pSms._fire_cansendmessage = function (objSms, eSmsEventInfo) {
		if (this.cansendmessage && this.cansendmessage._has_handlers) {
			return this.cansendmessage._fireEvent(this, eSmsEventInfo);
		}
		return true;
	};

	_pSms._onerror = function (objData) {
		var e;
		if (nexacro.Device.curDevice == 0) {
			e = new nexacro.SmsErrorEventInfo("onerror", objData.smsid, objData.phonenumber, objData.message, objData.errorcode, objData.errormsg);
		}
		else {
			objSmsMessage.set_smsid(-1);
			e = new nexacro.SmsErrorEventInfo("onerror", objData.smsid, objData.phonenumber, objData.message, objData.errorcode, objData.errormsg);
		}
		this._fire_onerror(this, e);
	};

	_pSms._fire_onerror = function (objSms, SmsErrorEventInfo) {
		if (this.onerror && this.onerror._has_handlers) {
			return this.onerror._fireEvent(this, SmsErrorEventInfo);
		}
		return true;
	};

	_pSms.sendUnsupportedFunc = function () {
		var smsobj = this;

		nexacro.OnceCallbackTimer.callonce(this, function () {
			var e = new nexacro.SmsErrorEventInfo("onerror", "-1", smsobj.phonenumber, smsobj.message, "2002", "The phone does not support");
			this._fire_onerror(this, e);
		}, 20);

		return true;
	};

	_pSms.paramck_phoneNumber = function (strPhoneNumber) {
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

		if (number.length < 3) {
			return false;
		}

		if (!this.publicNumCheck_Sms(number)) {
			return false;
		}
		return true;
	};

	_pSms.paramck_message = function (strMessage) {
		if (strMessage == null || typeof (strMessage) == "undefined" || typeof (strMessage) != "string") {
			return false;
		}
		return true;
	};

	_pSms.paramck_sendMessage = function (strPhoneNumber, strMessage) {
		if (strPhoneNumber == null || strMessage == null || typeof (strPhoneNumber) == "undefined" || typeof (strMessage) == "undefined"
			 || typeof (strMessage) != "string") {
			return false;
		}
		else {
			strPhoneNumber = strPhoneNumber.toString();
		}

		try {
			var number = "";
			number = strPhoneNumber.split("+").join("");
			number = number.split("-").join("");
		}
		catch (e) {
			return false;
		}

		if (!this.publicNumCheck_Sms(number)) {
			return false;
		}

		return true;
	};

	_pSms.paramck_deleteMessage = function (id) {
		if (id == null || typeof (id) == "undefined") {
			return false;
		}

		if (!nexacro.Device.publicNumCheck(id)) {
			return false;
		}

		if (id < 1) {
			return false;
		}

		return true;
	};

	_pSms.publicNumCheck_Sms = function (v) {
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

		return true;
	};

	_pSms = null;
}

if (!nexacro.SmsMessagListEventInfo) {
	nexacro.SmsMessagListEventInfo = function (obj) {
		this.eventid = "onreadmessagelist";
		this.smsmessages = obj;
	};
	var _pSmsMsgList = nexacro.SmsMessagListEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.SmsMessagListEventInfo);
	_pSmsMsgList._type_name = "SmsMessageListEventInfo";

	_pSmsMsgList = null;
}

if (!nexacro.SmsMessage) {
	nexacro.SmsMessage = function (_id, _number, _message, _type, _data) {
		this.smsid = _id;
		this.phonenumber = _number;
		this.message = _message;
		this.type = _type;
		this.date = _data;
	};
	var _pSmsMessage = nexacro.SmsMessage.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.SmsMessage);
	_pSmsMessage._type_name = "SmsMessage";

	_pSmsMessage.set_phonenumber = function (v) {
		if (this.paramck_phoneNumber(v) == true) {
			this.phonenumber = v;
			return true;
		}
		return false;
	};

	_pSmsMessage.set_message = function (v) {
		if (this.paramck_message(v) == true) {
			this.message = v;
			return true;
		}
		return false;
	};

	_pSmsMessage.set_smsid = function (v) {
		if (typeof (v) == "undefined") {
			this.smsid = "";
			return true;
		}
		else if (typeof (v) == "string") {
			this.smsid = Number(v);
			return true;
		}
		else {
			this.smsid = v;
			return true;
		}
		return false;
	};

	_pSmsMessage.set_type = function (v) {
		if (typeof (v) == "undefined") {
			this.Type = "";
			return true;
		}
		else {
			this.Type = v;
			return true;
		}
		return false;
	};

	_pSmsMessage.set_date = function (v) {
		if (typeof (v) == "undefined") {
			this.date = "";
			return true;
		}
		else {
			this.date = v;
			return true;
		}
		return false;
	};

	_pSmsMessage.paramck_phoneNumber = function (strPhoneNumber) {
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

		if (number.length < 3) {
			return false;
		}

		if (!this.publicNumCheck_Sms(number)) {
			return false;
		}
		return true;
	};

	_pSmsMessage.paramck_message = function (strMessage) {
		if (strMessage == null || typeof (strMessage) == "undefined" || typeof (strMessage) != "string") {
			return false;
		}
		return true;
	};

	_pSmsMessage.publicNumCheck_Sms = function (v) {
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

		return true;
	};

	_pSmsMessage = null;
}

if (!nexacro.SmsEventInfo) {
	nexacro.SmsEventInfo = function (strEventId, strSmsId, strPhonenumber, strMessage) {
		if (typeof (strSmsId) == "undefined") {
			this.smsid = "";
		}
		else if (typeof (strSmsId) == "string") {
			this.smsid = Number(strSmsId);
		}
		else {
			this.smsid = strSmsId;
		}

		this.eventid = strEventId;
		this.phonenumber = strPhonenumber;

		if (nexacro.Device.curDevice == 0) {
			this.message = strMessage;
		}
		else {
			this.message = strMessage.replace(/__NEW_LINE__/g, "\n");
		}
	};

	var _pSmsEventInfo = nexacro.SmsEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.SmsEventInfo);
	_pSmsEventInfo._type_name = "SmsEventInfo";

	_pSmsEventInfo = null;
}

if (!nexacro.SmsErrorEventInfo) {
	nexacro.SmsErrorEventInfo = function (strEventId, strSmsId, strPhonenumber, strMessage, intErrorCode, strErrorMsg) {
		if (typeof (strSmsId) == "undefined") {
			this.smsid = "";
		}
		else {
			this.smsid = strSmsId;
		}
		this.eventid = strEventId;
		this.smsid = strSmsId;
		this.phonenumber = strPhonenumber;

		if (nexacro.Device.curDevice == 0) {
			this.message = strMessage;
		}
		else {
			this.message = strMessage.replace(/__NEW_LINE__/g, "\n");
		}
		this.errortype = "ObjectError";
		this.statuscode = intErrorCode;
		this.errormsg = strErrorMsg;
	};

	var _pSmsErrorEventInfo = nexacro.SmsErrorEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.SmsErrorEventInfo);
	_pSmsErrorEventInfo._type_name = "SmsErrorEventInfo";

	_pSmsErrorEventInfo = null;
}


if (!nexacro.AudioPlayer) {
	nexacro.AudioPlayer = function (name, obj) {
		this._id = nexacro.Device.makeID();
		nexacro.Device._userCreatedObj[this._id] = this;
		this._refform = obj;
		this.name = name || "";

		this.bload = false;
		this.bplay = false;
		this.bpaused = false;
		this.enableevent = true;
		this._is_alive = true;

		this.url = "";
		this.duration = 0.0;
		this.currentpos = 0.0;
		this.repeatcount = 1;
		this.startpos = -1;
		this.stoppos = -1;
		this.volume = -1;
		this.pan = -1;

		this._event_list = 
			{
			"onload" : 1, 
			"onplay" : 1, 
			"onplaying" : 1, 
			"onstop" : 1, 
			"onerror" : 1, 
			"onmovepos" : 1
		};

		this.onload = null;
		this.onplay = null;
		this.onplaying = null;
		this.onstop = null;
		this.onerror = null;
		this.onmovepos = null;

		var params = '""';
		var jsonstr = '{"id":' + this._id + ', "div":"Sound", "method":"constructor", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	var _pAudioPlayer = nexacro.AudioPlayer.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.AudioPlayer);
	_pAudioPlayer._type_name = "AudioPlayer";

	_pAudioPlayer.destroy = function () {
		var params = '""';
		var jsonstr;
		this._is_alive = false;

		delete nexacro.Device._userCreatedObj[this._id];
		jsonstr = '{"id":' + this._id + ', "div":"Sound", "method":"destroy", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
		return true;
	};

	_pAudioPlayer.on_created = function () {
	};

	_pAudioPlayer._getReferenceContext = function () {
		return this._refform;
	};

	_pAudioPlayer.setSystemVolume = function (v) {
		this.volume = v;
	};

	_pAudioPlayer.set_duration = function (v) {
	};
	_pAudioPlayer.set_currentpos = function (v) {
	};

	_pAudioPlayer.set_repeatcount = function (v) {
		if (typeof (v) == "undefind" || v == null) {
			return false;
		}
		else {
			if (nexacro.Device.publicNumCheck(v)) {
				if (v >= 0) {
					this.repeatcount = v;
				}
				else {
					return false;
				}
			}
			else {
				return false;
			}
		}
		return true;
	};

	_pAudioPlayer.set_startpos = function (v) {
		if (typeof (v) == "undefind" || v == null) {
			return false;
		}
		else {
			if ((v == -1) || (0 <= v && v <= this.duration)) {
				this.startpos = v;
			}
			else {
				return false;
			}
		}
		return true;
	};

	_pAudioPlayer.set_stoppos = function (v) {
		if (typeof (v) == "undefind" || v == null) {
			return false;
		}
		else {
			if ((v == -1) || (0 <= v && v <= this.duration)) {
				this.stoppos = v;
			}
			else {
				return false;
			}
		}
		return true;
	};

	_pAudioPlayer.set_volume = function (v) {
		if (typeof (v) == "undefind" || v == null) {
			return false;
		}
		else {
			if ((v >= 0.0 && v <= 1.0) || v == -1) {
				this.volume = v;
			}
			else {
				return false;
			}
		}
		return true;
	};

	_pAudioPlayer.set_pan = function (v) {
		if (typeof (v) == "undefind" || v == null) {
			return false;
		}
		else {
			if ((v >= 0.0 && v <= 1.0) || v == -1) {
				this.pan = v;
			}
			else {
				return false;
			}
		}
		return true;
	};

	_pAudioPlayer.set_url = function (v) {
		var pcheck = this.paramck_AudioLoad(v);
		if (pcheck == true) {
			this.url = v;
			return true;
		}
		else {
			return false;
		}
	};

	_pAudioPlayer.load = function (strUrl) {
		this.startpos = -1;
		this.stoppos = -1;

		var pcheck = this.paramck_AudioLoad(strUrl);
		if (pcheck == true) {
			this.url = strUrl;
			if (nexacro.Device.curDevice == 0) {
				var EnvironmentPath = "";
				var androidFilePath = "";
				var rootPathCheck = strUrl.substring(0, 9);

				if (rootPathCheck.toLowerCase() == "%userapp%") {
					EnvironmentPath = 1;
					androidFilePath = strUrl.substring(9, strUrl.length);
				}
				else if (rootPathCheck.toLowerCase() == "%sd_card%") {
					EnvironmentPath = 2;
					androidFilePath = strUrl.substring(9, strUrl.length);
				}
				else if (rootPathCheck.substring(0, 7) == "http://") {
					androidFilePath = strUrl;
					EnvironmentPath = "";
				}
				else {
					var _filecache = application._getFileCache(strUrl);
					if (null != _filecache) {
						EnvironmentPath = 3;
						androidFilePath = _filecache;
					}
					else {
						androidFilePath = strUrl;
					}
				}
				var params = '{"target":"' + androidFilePath + '", "EnvironmentPath":"' + EnvironmentPath + '"}';
			}
			else {
				var iosfilepath = "";
				var rootPathCheck = strUrl.substring(0, 9);

				if (rootPathCheck.toLowerCase() == "%userapp%") {
					iosfilepath = "_userapp_" + strUrl.substring(9, strUrl.length);
				}
				else if (rootPathCheck.substring(0, 7) == "http://") {
					iosfilepath = strUrl;
				}
				else {
					var _filecache = application._getFileCache(strUrl);
					if (null != _filecache) {
						iosfilepath = "_userapp_" + _filecache;
					}
					else {
						iosfilepath = strUrl;
					}
				}

				var params = '{"target":"' + iosfilepath + '"}';
			}
			var jsonstr = '{"id":' + this._id + ', "div":"Sound", "method":"load", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
			return true;
		}
		else {
			return false;
		}
	};

	_pAudioPlayer.play = function (nIntervalTime) {
		var params;
		var jsonstr;

		var IntervalTimeState;
		if (typeof (nIntervalTime) == "undefined" || nIntervalTime == null || nIntervalTime == "") {
			nIntervalTime = 0;
			IntervalTimeState = 1;
		}
		else {
			if (nexacro.Device.publicNumCheck(nIntervalTime) && nIntervalTime >= 0 && nIntervalTime <= 86400000) {
				if (nIntervalTime < 200) {
					return false;
				}
				else {
					IntervalTimeState = 0;
				}
			}
			else {
				return false;
			}
		}

		if (typeof (this.repeatcount) == "undefined" || this.repeatcount == null) {
			this.repeatcount = 1;
		}

		if (typeof (this.startpos) == "undefined" || this.startpos == null || this.startpos == 0) {
			this.startpos = -1;
		}

		if (typeof (this.stoppos) == "undefined" || this.stoppos == null || this.stoppos == 0) {
			this.stoppos = -1;
		}

		if (this.volume >= 0.0 && this.volume <= 1.0) {
			this.setvolume();
		}

		if ((this.pan >= 0.0 && this.pan <= 1.0) || this.pan == -1) {
			this.setpan();
		}

		if (nexacro.Device.curDevice == 0) {
			params = '{  repeatstartpos:"' + this.startpos;
			params += '", repeatstoppos:"' + this.stoppos;
			params += '", repeatcount:"' + this.repeatcount;
			params += '", playingeventtime:"' + nIntervalTime;
			params += '", intervaltimestate:"' + IntervalTimeState;
			params += '"}';
		}
		else {
			params = '{  "repeatstartpos":"' + this.startpos;
			params += '", "repeatstoppos":"' + this.stoppos;
			params += '", "repeatcount":"' + this.repeatcount;
			params += '", "playingeventtime":"' + nIntervalTime;
			params += '", "intervaltimestate":"' + IntervalTimeState;
			params += '"}';
		}


		if (this.bload == false) {
			nexacro.OnceCallbackTimer.callonce(this, function () {
				var e = new nexacro.AudioErrorEventInfo("onerror", "", "0", "1007", "Not loaded");
				this._fire_onerror(this, e);
			}, 20);
			return true;
		}

		if (this.bplay == true) {
			var avobj = this;

			nexacro.OnceCallbackTimer.callonce(this, function () {
				var e = new nexacro.AudioErrorEventInfo("onerror", "", avobj.currentpos, "1008", "Already playing");
				this._fire_onerror(this, e);
			}, 20);
			return true;
		}


		if (this.startpos == -1 && this.stoppos == -1) {
			jsonstr = '{"id":' + this._id + ', "div":"Sound", "method":"play", "params":' + params + '}';
		}
		else {
			jsonstr = '{"id":' + this._id + ', "div":"Sound", "method":"repeatplay", "params":' + params + '}';
		}

		nexacro.Device.exec(jsonstr);
		return true;
	};

	_pAudioPlayer.pause = function () {
		if (this.bload == false) {
			nexacro.OnceCallbackTimer.callonce(this, function () {
				var e = new nexacro.AudioErrorEventInfo("onerror", "", "0", "1007", "Not loaded");
				this._fire_onerror(this, e);
			}, 20);

			return;
		}

		if (this.bplay == false && this.bpaused == false) {
			nexacro.OnceCallbackTimer.callonce(this, function () {
				var e = new nexacro.AudioErrorEventInfo("onerror", "", "0", "1009", "Not playing");
				this._fire_onerror(this, e);
			}, 20);

			return;
		}

		if (this.bpaused == true) {
			nexacro.OnceCallbackTimer.callonce(this, function () {
				var e = new nexacro.AudioErrorEventInfo("onerror", "", this.currentpos, "1303", "Already paused");
				this._fire_onerror(this, e);
			}, 20);

			return;
		}

		var params = '""';
		var jsonstr = '{"id":' + this._id + ', "div":"Sound", "method":"pause", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	_pAudioPlayer.resume = function () {
		if (this.bload == false) {
			nexacro.OnceCallbackTimer.callonce(this, function () {
				var e = new nexacro.AudioErrorEventInfo("onerror", "", "0", "1007", "Not loaded");
				this._fire_onerror(this, e);
			}, 20);

			return;
		}

		if (this.bplay == true) {
			nexacro.OnceCallbackTimer.callonce(this, function () {
				var e = new nexacro.AudioErrorEventInfo("onerror", "", this.currentpos, "1011", "Not Paused");
				this._fire_onerror(this, e);
			}, 20);

			return;
		}

		if (this.bpaused == false) {
			nexacro.OnceCallbackTimer.callonce(this, function () {
				var e = new nexacro.AudioErrorEventInfo("onerror", "", this.currentpos, "1010", "Can't resume.");
				this._fire_onerror(this, e);
			}, 20);

			return;
		}

		var params = '""';
		var jsonstr = '{"id":' + this._id + ', "div":"Sound", "method":"resume", "params":' + params + '}';

		nexacro.Device.exec(jsonstr);
	};

	_pAudioPlayer.stop = function () {
		if (this.bload == false) {
			nexacro.OnceCallbackTimer.callonce(this, function () {
				var e = new nexacro.AudioErrorEventInfo("onerror", "", "0", "1007", "Not loaded");
				this._fire_onerror(this, e);
			}, 20);

			return;
		}

		if (this.bplay == false && this.bpaused != true) {
			nexacro.OnceCallbackTimer.callonce(this, function () {
				var e = new nexacro.AudioErrorEventInfo("onerror", "", this.currentpos, "1009", "Not playing");
				this._fire_onerror(this, e);
			}, 20);

			return;
		}

		var params = '""';
		var jsonstr = '{"id":' + this._id + ', "div":"Sound", "method":"stop", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	_pAudioPlayer._onload = function (objData) {
		var e = new nexacro.AudioEventInfo("onload", objData.reason, objData.url, objData.playtime, objData.curtime, objData.repeatstart, objData.repeatend, objData.repeatcount);
		this.duration = objData.playtime;

		this.bload = true;
		this.bplay = false;
		this.bpaused = false;
		this.duration = objData.playtime;
		this._fire_onload(this, e);
	};

	_pAudioPlayer._fire_onload = function (objAudioPlayer, eAudioEventInfo) {
		if (this.onload && this.onload._has_handlers) {
			return this.onload._fireEvent(this, eAudioEventInfo);
		}
		return true;
	};

	_pAudioPlayer._onplay = function (objData) {
		var e = new nexacro.AudioEventInfo("onplay", objData.reason, objData.url, objData.playtime, objData.curtime, objData.repeatstart, objData.repeatend, objData.repeatcount);
		this.duration = objData.playtime;
		this.currentpos = objData.curtime;

		this.bplay = true;
		this.bpaused = false;

		this._fire_onplay(this, e);
	};

	_pAudioPlayer._fire_onplay = function (objAudioPlayer, eAudioEventInfo) {
		if (this.onplay && this.onplay._has_handlers) {
			return this.onplay._fireEvent(this, eAudioEventInfo);
		}
		return true;
	};

	_pAudioPlayer._onplaying = function (objData) {
		var e = new nexacro.AudioEventInfo("onplaying", objData.reason, objData.url, objData.playtime, objData.curtime, objData.repeatstart, objData.repeatend, objData.repeatcount);
		this.duration = objData.playtime;
		this.currentpos = objData.curtime;
		this._fire_onplaying(this, e);
	};

	_pAudioPlayer._fire_onplaying = function (objAudioPlayer, eAudioEventInfo) {
		if (this.onplaying && this.onplaying._has_handlers) {
			return this.onplaying._fireEvent(this, eAudioEventInfo);
		}
		return true;
	};

	_pAudioPlayer._onstop = function (objData) {
		var e = new nexacro.AudioEventInfo("onstop", objData.reason, objData.url, objData.playtime, objData.curtime, objData.repeatstart, objData.repeatend, objData.repeatcount);
		this.duration = objData.playtime;
		this.currentpos = objData.curtime;
		if (objData.reason == "4" || objData.reason == "5") {
			this.bpaused = false;
			this.bplay = false;
			this.currentpos = 0.0;
		}
		else if (objData.reason == "6") {
			this.bpaused = true;
			this.bplay = false;
		}
		this._fire_onstop(this, e);
	};

	_pAudioPlayer._fire_onstop = function (objAudioPlayer, eAudioEventInfo) {
		if (this.onstop && this.onstop._has_handlers) {
			return this.onstop._fireEvent(this, eAudioEventInfo);
		}
		return true;
	};

	_pAudioPlayer.movePos = function (nPos) {
		if (this.bload == false) {
			nexacro.OnceCallbackTimer.callonce(this, function () {
				var e = new nexacro.AudioErrorEventInfo("onerror", "", 0, "1007", "Not loaded");
				this._fire_onerror(this, e);
			}, 20);

			return;
		}

		if (typeof (nPos) != "undefined" && (nPos >= 0 && nPos <= this.duration) && nexacro.Device.publicNumCheck(nPos)) {
			this.time = nPos || "";
			var params;
			if (nexacro.Device.curDevice == 0) {
				params = '{  desttime:"' + this.time;
				params += '"}';
			}
			else {
				params = '{  "desttime":"' + this.time;
				params += '"}';
			}
			var jsonstr = '{"id":' + this._id + ', "div":"Sound", "method":"movePos", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
			return true;
		}
		else {
			return false;
		}
	};

	_pAudioPlayer._onmovepos = function (objData) {
		this.currentpos = objData.curtime;
		var e = new nexacro.AudioEventInfo("onmovepos", objData.reason, objData.url, objData.playtime, objData.curtime, objData.repeatstart, objData.repeatend, objData.repeatcount);
		this.duration = objData.playtime;
		this._fire_onmovepos(this, e);
	};

	_pAudioPlayer._fire_onmovepos = function (objAudioPlayer, eAudioEventInfo) {
		if (this.onmovepos && this.onmovepos._has_handlers) {
			return this.onmovepos._fireEvent(this, eAudioEventInfo);
		}
		return true;
	};

	_pAudioPlayer.setvolume = function () {
		var params;
		if (nexacro.Device.curDevice == 0) {
			params = '{  volume:"' + this.volume;
			params += '"}';
		}
		else {
			params = '{  "volume":"' + this.volume;
			params += '"}';
		}
		var jsonstr = '{"id":' + this._id + ', "div":"Sound", "method":"setvolum", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	_pAudioPlayer.setpan = function () {
		var params;
		if (nexacro.Device.curDevice == 0) {
			params = '{  pan:"' + this.pan;
			params += '"}';
		}
		else {
			params = '{  "pan":"' + this.pan;
			params += '"}';
		}
		var jsonstr = '{"id":' + this._id + ', "div":"Sound", "method":"setpan", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	_pAudioPlayer._onerror = function (objData) {
		var e = new nexacro.AudioErrorEventInfo("onerror", objData.url, objData.curtime, objData.errorcode, objData.errormsg);
		this._fire_onerror(this, e);
	};

	_pAudioPlayer._fire_onerror = function (objAudioPlayer, AudioErrorEventInfo) {
		if (this.onerror && this.onerror._has_handlers) {
			return this.onerror._fireEvent(this, AudioErrorEventInfo);
		}
		return true;
	};

	_pAudioPlayer.paramck_AudioLoad = function (strFilePath) {
		if (strFilePath == null || typeof (strFilePath) == "undefined" || typeof (strFilePath) != "string") {
			return false;
		}
		return true;
	};

	_pAudioPlayer = null;
}

if (!nexacro.AudioEventInfo) {
	nexacro.AudioEventInfo = function (strEventId, strReason, strUrl, intPlaytime, intCurtime, intrepeatstart, intrepeatend, intrepeatcount) {
		this.eventid = strEventId;
		this.reason = strReason;
		this.url = strUrl;
		this.duration = intPlaytime;
		this.currentpos = intCurtime;
	};
	var _pAudioEventInfo = nexacro.AudioEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.AudioEventInfo);
	_pAudioEventInfo._type_name = "AudioEventInfo";

	_pAudioEventInfo = null;
}

if (!nexacro.AudioErrorEventInfo) {
	nexacro.AudioErrorEventInfo = function (strEventId, strUrl, intCurtime, intErrorCode, strErrorMsg) {
		this.eventid = strEventId;
		this.url = strUrl;
		this.currentpos = intCurtime;
		this.errortype = "ObjectError";
		this.statuscode = intErrorCode;
		this.errormsg = strErrorMsg;
	};
	var _pAudioErrorEventInfo = nexacro.AudioErrorEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.AudioErrorEventInfo);
	_pAudioErrorEventInfo._type_name = "AudioErrorEventInfo";

	_pAudioErrorEventInfo = null;
}


if (!nexacro.Geolocation) {
	nexacro.Geolocation = function (name, obj) {
		this._id = nexacro.Device.makeID();
		nexacro.Device._userCreatedObj[this._id] = this;
		this.name = name || "";

		this.ACCURACY_0 = 0;
		this.ACCURACY_1 = 1;
		this.ACCURACY_2 = 2;
		this.ACCURACY_3 = 3;
		this.ACCURACY_4 = 4;

		this.coords = {
			latitude : 0.0
, 
			longitude : 0.0
, 
			altitude : 0.0
, 
			heading : 0.0
, 
			speed : 0.0
, 
			accuracy : 0.0
, 
			altitudeaccuracy : 0.0
, 
			set_latitude : function () {
			}, 
			set_longitude : function () {
			}, 
			set_altitude : function () {
			}, 
			set_heading : function () {
			}, 
			set_speed : function () {
			}, 
			set_accuracy : function () {
			}, 
			set_altitudeaccuracy : function () {
			}
		};
		this.timestamp = "";
		this.sourcetype = "";
		this.enableevent = true;

		this._event_list = 
			{
			"onrecvsuccess" : 1, 
			"onrecverror" : 1
		};

		this.onrecvsuccess = null;
		this.onrecverror = null;

		var params = '""';
		var jsonstr;

		jsonstr = '{"id":' + this._id + ', "div":"Geolocation", "method":"constructor", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	var _pGeolocation = nexacro.Geolocation.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.Geolocation);
	_pGeolocation._type_name = "Geolocation";

	_pGeolocation.destroy = function () {
		var params = '""';
		var jsonstr;

		delete nexacro.Device._userCreatedObj[this._id];

		jsonstr = '{"id":' + this._id + ', "div":"Geolocation", "method":"destroy", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
		return true;
	};

	_pGeolocation.on_created = function () {
	};


	_pGeolocation.set_coords = function () {
	};


	_pGeolocation.set_latitude = function () {
	};
	_pGeolocation.set_longitude = function () {
	};
	_pGeolocation.set_altitude = function () {
	};
	_pGeolocation.set_heading = function () {
	};
	_pGeolocation.set_speed = function () {
	};
	_pGeolocation.set_accuracy = function () {
	};
	_pGeolocation.set_altitudeaccuracy = function () {
	};

	_pGeolocation.set_sourcetype = function () {
	};
	_pGeolocation.set_timestamp = function () {
	};

	_pGeolocation.getCurrentPosition = function (nAccuracy, nTimeout) {
		var params;

		if (nAccuracy == null || nTimeout == null) {
			return false;
		}

		if (this.parmack_Geolocation(nAccuracy, nTimeout, 1)) {
			this.Accuracy = nAccuracy;
			this.Timeout = nTimeout;
			if (nexacro.Device.curDevice == 0) {
				params = '{Accuracy:"' + this.Accuracy + '", Timeout:"' + this.Timeout + '"}';
			}
			else {
				params = '{"Accuracy":"' + this.Accuracy;
				params += '", "timeout":"' + this.Timeout + '"}';
			}

			var jsonstr = '{"id":' + this._id + ', "div":"Geolocation", "method":"getCurrentPosition", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);

			return true;
		}
		else {
			return false;
		}
	};

	_pGeolocation.watchStart = function (nAccuracy, nIntervalTime) {
		var params;

		if (nAccuracy == null || nIntervalTime == null) {
			return false;
		}

		if (this.parmack_Geolocation(nAccuracy, nIntervalTime, 2)) {
			this.Accuracy = nAccuracy.toString();
			this.IntervalTime = nIntervalTime.toString();

			if (nexacro.Device.curDevice == 0) {
				params = '{"Accuracy":"' + this.Accuracy + '", "IntervalTime":"' + this.IntervalTime + '"}';
			}
			else {
				this.Accuracy = nAccuracy;
				params = '{"Accuracy":"' + this.Accuracy;
				params += '", "timeout":"' + this.IntervalTime + '"}';
			}

			var jsonstr = '{"id":' + this._id + ', "div":"Geolocation", "method":"watchStart", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
		}
		else {
			return false;
		}
		return true;
	};

	_pGeolocation.watchStop = function () {
		var params = '""';
		var jsonstr = '{"id":' + this._id + ', "div":"Geolocation", "method":"watchStop", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	_pGeolocation._onrecvsuccess = function (objData) {
		this.coords.latitude = objData.coords.latitude;
		this.coords.longitude = objData.coords.longitude;
		this.coords.altitude = objData.coords.altitude;
		this.coords.heading = objData.coords.heading;
		this.coords.speed = objData.coords.speed;
		this.coords.accuracy = objData.coords.accuracy;
		this.coords.altitudeaccuracy = objData.coords.altitudeaccuracy;
		this.timestamp = new Date(objData.timestamp);
		this.sourcetype = objData.sourcetype;

		var e = new nexacro.GeolocationEventInfo("onrecvsuccess", this.coords, this.timestamp, this.sourcetype);
		this._fire_onrecvsuccess(this, e);
	};

	_pGeolocation._fire_onrecvsuccess = function (objGeolocation, eGeolocationEventInfo) {
		if (this.onrecvsuccess && this.onrecvsuccess._has_handlers) {
			return this.onrecvsuccess._fireEvent(this, eGeolocationEventInfo);
		}
		return true;
	};

	_pGeolocation._onrecverror = function (objData) {
		var e = new nexacro.GeolocationErrorEventInfo("onrecverror", objData.errorcode, objData.errormsg);
		this._fire_onrecverror(this, e);
	};

	_pGeolocation._fire_onrecverror = function (objGeolocation, eGeolocationErrorEventInfo) {
		if (this.onrecverror && this.onrecverror._has_handlers) {
			return this.onrecverror._fireEvent(this, eGeolocationErrorEventInfo);
		}
		return true;
	};

	_pGeolocation.parmack_Geolocation = function (nAccuracy, nTimeout, method) {
		if (nAccuracy == null || typeof (nAccuracy) == "undefined") {
			return false;
		}

		if (nTimeout == null || typeof (nTimeout) == "undefined") {
			return false;
		}

		if (method == null || typeof (method) == "undefined") {
			return false;
		}

		if (!nexacro.Device.publicNumCheck(nAccuracy)) {
			return false;
		}

		if (!nexacro.Device.publicNumCheck(nTimeout)) {
			return false;
		}

		if (nexacro.Device.curDevice == 0) {
			if (method == 1) {
				if ((nAccuracy >= 0 && nAccuracy < 3) && (nTimeout >= 200 && nTimeout <= 86400000)) {
					return true;
				}
				else {
					return false;
				}
			}
			else if (method == 2) {
				if ((nAccuracy >= 0 && nAccuracy < 3) && (nTimeout >= 200 && nTimeout <= 86400000)) {
					return true;
				}
				else {
					return false;
				}
			}
		}
		else {
			if (method == 1) {
				if ((nAccuracy >= 0 && nAccuracy < 5) && (nTimeout >= 200 && nTimeout <= 86400000)) {
					return true;
				}
				else {
					return false;
				}
			}
			else if (method == 2) {
				if ((nAccuracy >= 0 && nAccuracy < 5) && (nTimeout >= 200 && nTimeout <= 86400000)) {
					return true;
				}
				else {
					return false;
				}
			}
		}
		return true;
	};

	_pGeolocation = null;
}

if (!nexacro.GeolocationEventInfo) {
	nexacro.GeolocationEventInfo = function (strEventId, objCoords, strTimestamp, strSourcetype) {
		this.eventid = strEventId;
		this.coords = {
			latitude : Number(objCoords.latitude)
, 
			longitude : Number(objCoords.longitude)
, 
			altitude : Number(objCoords.altitude)
, 
			heading : Number(objCoords.heading)
, 
			speed : Number(objCoords.speed)
, 
			accuracy : Number(objCoords.accuracy)
, 
			altitudeaccuracy : Number(objCoords.altitudeaccuracy)
		};
		this.timestamp = strTimestamp;
		this.sourcetype = strSourcetype;
	};
	var _pGeolocationEventInfo = nexacro.GeolocationEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.GeolocationEventInfo);
	_pGeolocationEventInfo._type_name = "GeolocationEventInfo";

	_pGeolocationEventInfo = null;
}

if (!nexacro.GeolocationErrorEventInfo) {
	nexacro.GeolocationErrorEventInfo = function (strEventId, intErrorCode, strErrorMsg) {
		this.eventid = strEventId;
		this.errortype = "ObjectError";
		this.statuscode = intErrorCode;
		this.errormsg = strErrorMsg;
	};
	var _pGeolocationErrorEventInfo = nexacro.GeolocationErrorEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.GeolocationErrorEventInfo);
	_pGeolocationErrorEventInfo._type_name = "GeolocationErrorEventInfo";

	_pGeolocationErrorEventInfo = null;
}


if (!nexacro.Acceleration) {
	nexacro.Acceleration = function (name, obj) {
		this._id = nexacro.Device.makeID();
		nexacro.Device._userCreatedObj[this._id] = this;
		this.name = name || "";

		this.xpos = 0;
		this.ypos = 0;
		this.zpos = 0;
		this.timestamp = "";
		this.accuracy = 0;
		this.enableevent = true;

		this._event_list = {
			"onrecvsuccess" : 1, 
			"onrecverror" : 1
		};

		this.onrecvsuccess = null;
		this.onrecverror = null;

		var params = '""';
		var jsonstr = '{"id":' + this._id + ', "div":"Acceleration", "method":"constructor", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	var _pAcceleration = nexacro.Acceleration.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.Acceleration);
	_pAcceleration._type_name = "Acceleration";

	_pAcceleration.destroy = function () {
		var params = '""';
		var jsonstr;

		delete nexacro.Device._userCreatedObj[this._id];

		jsonstr = '{"id":' + this._id + ', "div":"Acceleration", "method":"destroy", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);

		return true;
	};

	_pAcceleration.on_created = function () {
	};

	_pAcceleration.set_xpos = function () {
	};
	_pAcceleration.set_ypos = function () {
	};
	_pAcceleration.set_zpos = function () {
	};
	_pAcceleration.set_timestamp = function () {
	};
	_pAcceleration.set_accuracy = function () {
	};

	_pAcceleration.getCurrentAcceleration = function (nAccuracy) {
		var params;

		if (typeof (nAccuracy) == "undefined" || nAccuracy == null) {
			this.accuracy = 0;
		}
		else {
			if (this.paramck_accuracy(nAccuracy)) {
				if (nAccuracy >= 0 && nAccuracy <= 3) {
					this.accuracy = nAccuracy;
				}
				else {
					return false;
				}
			}
			else {
				return false;
			}
		}

		var pcheck = this.parmack_AccelgetCurrentPosition(this.accuracy);
		if (pcheck == true) {
			if (nexacro.Device.curDevice == 0) {
				params = '{"Accuracy" : "' + this.accuracy.toString() + '"}';
			}
			else {
				params = '{"Accuracy":"' + this.accuracy + '"}';
			}

			var jsonstr = '{"id":' + this._id + ', "div":"Acceleration", "method":"getCurrentAcceleration", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);

			return true;
		}
		else {
			return false;
		}
	};

	_pAcceleration.watchStart = function (nAccuracy, nIntervalTime) {
		var params;

		var pcheck = this.pramck_AccelwatchStart(nIntervalTime, nAccuracy);
		if (pcheck == true) {
			if (nexacro.Device.curDevice == 0) {
				params = '{  IntervalTime:"' + nIntervalTime;
				params += '", Accuracy:"' + nAccuracy;
				params += '"}';
			}
			else {
				params = '{"timeout":"' + nIntervalTime;
				params += '", "Accuracy":"' + nAccuracy;
				params += '"}';
			}

			var jsonstr = '{"id":' + this._id + ', "div":"Acceleration", "method":"watchStart", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);

			return true;
		}
		else {
			return false;
		}
	};

	_pAcceleration.watchStop = function () {
		var params = '""';
		var jsonstr = '{"id":' + this._id + ', "div":"Acceleration", "method":"watchStop", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	_pAcceleration._onrecvsuccess = function (objData) {
		this.xpos = parseFloat(objData.xpos);
		this.ypos = parseFloat(objData.ypos);
		this.zpos = parseFloat(objData.zpos);
		this.timestamp = new Date(objData.timestamp);
		this.accuracy = parseFloat(objData.accuracy);
		var e = new nexacro.AccelerationEventInfo("onrecvsuccess", this);
		this._fire_onrecvsuccess(this, e);
	};

	_pAcceleration._fire_onrecvsuccess = function (objAcceleration, eAccelerationEventInfo) {
		if (this.onrecvsuccess && this.onrecvsuccess._has_handlers) {
			return this.onrecvsuccess._fireEvent(this, eAccelerationEventInfo);
		}
		return true;
	};

	_pAcceleration._onrecverror = function (objData) {
		var e = new nexacro.AccelerationErrorEventInfo("onrecverror", objData.errorcode, objData.errormsg);
		this._fire_onrecverror(this, e);
	};

	_pAcceleration._fire_onrecverror = function (objAcceleration, eAccelerationErrorEventInfo) {
		if (this.onrecverror && this.onrecverror._has_handlers) {
			return this.onrecverror._fireEvent(this, eAccelerationErrorEventInfo);
		}
		return true;
	};

	_pAcceleration.paramck_accuracy = function (v) {
		if (v == null || typeof (v) == "undefined") {
			return false;
		}
		if (!nexacro.Device.publicNumCheck(v)) {
			return false;
		}
		return true;
	};

	_pAcceleration.parmack_AccelgetCurrentPosition = function (nAccuracy) {
		if (!nexacro.Device.publicNumCheck(nAccuracy)) {
			return false;
		}
		return true;
	};

	_pAcceleration.pramck_AccelwatchStart = function (nIntervalTime, nAccuracy) {
		if (nIntervalTime == null || typeof (nIntervalTime) == "undefined") {
			return false;
		}

		if (nAccuracy == null || typeof (nAccuracy) == "undefined") {
			return false;
		}

		if ((nAccuracy >= 0 && nAccuracy <= 3) && (nIntervalTime >= 200 && nIntervalTime <= 86400000)) {
		}
		else {
			return false;
		}

		if (!nexacro.Device.publicNumCheck(nIntervalTime)) {
			return false;
		}

		if (!nexacro.Device.publicNumCheck(nAccuracy)) {
			return false;
		}

		return true;
	};

	_pAcceleration = null;
}

if (!nexacro.AccelerationEventInfo) {
	nexacro.AccelerationEventInfo = function (strEventId, objAcceleration) {
		this.eventid = strEventId;
		this.xpos = objAcceleration.xpos;
		this.ypos = objAcceleration.ypos;
		this.zpos = objAcceleration.zpos;
		this.timestamp = objAcceleration.timestamp;
		this.accuracy = objAcceleration.accuracy;
	};
	_pAccelerationEventInfo = nexacro.AccelerationEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.AccelerationEventInfo);
	_pAccelerationEventInfo._type_name = "AccelerationEventInfo";

	_pAccelerationEventInfo = null;
}

if (!nexacro.AccelerationErrorEventInfo) {
	nexacro.AccelerationErrorEventInfo = function (strEventId, intErrorCode, strErrorMsg) {
		this.eventid = strEventId;
		this.errortype = "ObjectError";
		this.statuscode = intErrorCode;
		this.errormsg = strErrorMsg;
	};
	_pAccelerationErrorEventInfo = nexacro.AccelerationErrorEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.AccelerationErrorEventInfo);
	_pAccelerationErrorEventInfo._type_name = "AccelerationErrorEventInfo";

	_pAccelerationErrorEventInfo = null;
}


if (!nexacro.Vibrator) {
	nexacro.Vibrator = function (name, obj) {
		this._id = nexacro.Device.makeID();
		nexacro.Device._userCreatedObj[this._id] = this;
		this.name = name || "";

		this.repeatcount = "1";
		this.patterns = new Array(100, 100);
		this.startpos = "0";
		this.enableevent = true;

		this._event_list = {
			"onplay" : 1, 
			"onstop" : 1, 
			"onerror" : 1
		};

		this.onplay = null;
		this.onstop = null;
		this.onerror = null;

		var params = '""';
		var jsonstr = '{"id":' + this._id + ', "div":"Vibrator", "method":"constructor", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	var _pVibrator = nexacro.Vibrator.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.Vibrator);
	_pVibrator._type_name = "Vibrator";

	_pVibrator.destroy = function () {
		var params = '""';
		var jsonstr;

		delete nexacro.Device._userCreatedObj[this._id];

		jsonstr = '{"id":' + this._id + ', "div":"Vibrator", "method":"destroy", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);

		return true;
	};

	_pVibrator.on_created = function () {
	};

	_pVibrator.set_repeatcount = function (v) {
		if (this.paramck_vibrepeatcount(v)) {
			this.repeatcount = v;
			return true;
		}
		return false;
	};

	_pVibrator.set_patterns = function (v) {
		if (this.paramck_vibpattern(v)) {
			this.patterns = v;
			return true;
		}
		return false;
	};

	_pVibrator.set_startpos = function (v) {
		if (this.paramck_vibstartpos(v)) {
			this.startpos = v;
			return true;
		}
		return false;
	};

	_pVibrator.hasVibrator = function () {
		if (nexacro.Device.curDevice == 0) {
			return nexacro.__hasVibrator();
		}
		else {
			if (nexacro.Device.isphone == 1) {
				return true;
			}
			else {
				return false;
			}
		}
	};

	_pVibrator.play = function () {
		var params;

		if (nexacro.Device.curDevice == 0) {
			if (this.startpos < this.patterns.length && this.startpos >= 0) {
				var startPosArray = new Array();
				var startIndex = 0;
				if (Number(this.startpos) % 2 != 0) {
					startPosArray[0] = 0;
					startIndex++;
				}

				var lastIndex = this.patterns.length;
				for (var i = this.startpos; i < lastIndex; i++) {
					startPosArray[startIndex] = this.patterns[i];
					startIndex++;
				}

				params = '{  turn:"' + this.repeatcount.toString();
				params += '", delay:"' + startPosArray;
				params += '"}';
			}
			else {
				return this._onerror({
					errorcode : '00001', 
					errormsg : 'parameter error'
				});
			}
		}
		else {
			params = '{  "turn":"' + this.repeatcount;
			params += '", "delay":"' + this.patterns;
			params += '", "startpos":"' + this.startpos;
			params += '"}';

			if (nexacro.Device.isphone != 1) {
				return this._onerror({
					errorcode : '10001', 
					errormsg : 'Unsupported device Vibrator'
				});
			}
		}

		var jsonstr = '{"id":' + this._id + ', "div":"Vibrator", "method":"play", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	_pVibrator.stop = function () {
		var params = '""';
		var jsonstr = '{"id":' + this._id + ', "div":"Vibrator", "method":"stop", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	_pVibrator._onplay = function (objData) {
		var e = new nexacro.VibratorEventInfo("onplay");
		this._fire_onplay(this, e);
	};

	_pVibrator._fire_onplay = function (objVibrator, eVibratorEventInfo) {
		if (this.onplay && this.onplay._has_handlers) {
			return this.onplay._fireEvent(this, eVibratorEventInfo);
		}
		return true;
	};

	_pVibrator._onstop = function (objData) {
		var e = new nexacro.VibratorEventInfo("onstop");
		this._fire_onstop(this, e);
	};

	_pVibrator._fire_onstop = function (objVibrator, eVibratorEventInfo) {
		if (this.onstop && this.onstop._has_handlers) {
			return this.onstop._fireEvent(this, eVibratorEventInfo);
		}
		return true;
	};

	_pVibrator._onerror = function (objData) {
		var e = new nexacro.VibratorErrorEventInfo("onerror", objData.errorcode, objData.errormsg);
		this._fire_onerror(this, e);
	};

	_pVibrator._fire_onerror = function (objVibrator, VibratorErrorEventInfo) {
		if (this.onerror && this.onerror._has_handlers) {
			return this.onerror._fireEvent(this, VibratorErrorEventInfo);
		}
		return true;
	};

	_pVibrator.paramck_vibstartpos = function (v) {
		if (!nexacro.Device.publicNumCheck(v) || Number(v) < 0) {
			return false;
		}
		return true;
	};

	_pVibrator.paramck_vibrepeatcount = function (v) {
		if (!nexacro.Device.publicNumCheck(v)) {
			return false;
		}
		if (Number(v) < 0) {
			return false;
		}
		return true;
	};

	_pVibrator.paramck_vibpattern = function (obj) {
		if (obj instanceof Array) {
			if (obj.length <= 100) {
				for (var i = 0; i < obj.length; i++) {
					if (!nexacro.Device.publicNumCheck(obj[i])) {
						return false;
					}

					if (obj[i] < 1) {
						return false;
					}
				}
			}
			else {
				return false;
			}

			if (obj.length % 2 != 0) {
				return false;
			}
		}
		else {
			return false;
		}
		return true;
	};

	_pVibrator = null;
}

if (!nexacro.VibratorEventInfo) {
	nexacro.VibratorEventInfo = function (strEventId) {
		this.eventid = strEventId;
	};
	var _pVibratorEventInfo = nexacro.VibratorEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.VibratorEventInfo);
	_pVibratorEventInfo._type_name = "VibratorEventInfo";

	_pVibratorEventInfo = null;
}
if (!nexacro.VibratorErrorEventInfo) {
	nexacro.VibratorErrorEventInfo = function (strEventId, strErrorCode, strErrorMsg) {
		this.eventid = strEventId;
		this.errortype = "ObjectError";
		this.statuscode = strErrorCode;
		this.errormsg = strErrorMsg;
	};
	var _pVibratorErrorEventInfo = nexacro.VibratorErrorEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.VibratorErrorEventInfo);
	_pVibratorErrorEventInfo._type_name = "VibratorErrorEventInfo";

	_pVibratorErrorEventInfo = null;
}


if (!nexacro.Network) {
	nexacro.Network = function (name, obj) {
		this._id = nexacro.Device.makeID();
		nexacro.Device._userCreatedObj[this._id] = this;
		this.name = name || "";

		this.availabletype = "";
		this.timestamp = "";
		this.enableevent = true;

		this._event_list = {
			"onrecvsuccess" : 1, 
			"onrecverror" : 1
		};

		this.onrecvsuccess = null;
		this.onrecverror = null;

		var params = '""';
		var jsonstr = '{"id":' + this._id + ', "div":"Network", "method":"constructor", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	var _pNetwork = nexacro.Network.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.Network);
	_pNetwork._type_name = "Network";

	_pNetwork.destroy = function () {
		var params = '""';
		var jsonstr;

		delete nexacro.Device._userCreatedObj[this._id];

		jsonstr = '{"id":' + this._id + ', "div":"Network", "method":"destroy", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);

		return true;
	};

	_pNetwork.on_created = function () {
	};


	_pNetwork.set_availabletype = function () {
	};
	_pNetwork.set_timestamp = function () {
	};

	_pNetwork.isReachable = function (strURL) {
		var params;

		if (strURL == null) {
			return false;
		}

		var pcheck = this.paramck_isReachable(strURL);
		if (pcheck == true) {
			if (nexacro.Device.curDevice == 0) {
				this.url = strURL || "";
				params = '{"url":"' + this.url + '"}';
			}
			else {
				params = '{"target":"' + strURL + '"}';
				this.availabletype = "availabletype";
				this.timestamp = "timestamp";
			}

			var jsonstr = '{"id":' + this._id + ', "div":"Network", "method":"isReachable", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);

			return true;
		}
		else {
			return false;
		}
	};

	_pNetwork.watchStart = function (nIntervalTime) {
		var params;
		var pcheck = this.paramck_watchStart(nIntervalTime);

		if (pcheck == true) {
			if (nexacro.Device.curDevice == 0) {
				this.intervalTime = nIntervalTime || "";
				params = '{"target":"' + this.intervalTime + '"}';
			}
			else {
				params = '{"target":"' + nIntervalTime + '"}';
			}
			var jsonstr = '{"id":' + this._id + ', "div":"Network", "method":"watchStart", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);

			return true;
		}
		else {
			return false;
		}
	};

	_pNetwork.watchStop = function () {
		var params = '""';
		var jsonstr = '{"id":' + this._id + ', "div":"Network", "method":"watchStop", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	_pNetwork._onrecvsuccess = function (objData) {
		this.availabletype = parseInt(objData.availabletype) | 0;
		this.timestamp = new Date(objData.timestamp);
		var e = new nexacro.NetworkEventInfo("onrecvsuccess");
		this._fire_onrecvsuccess(this, e);
	};

	_pNetwork._fire_onrecvsuccess = function (objNetwork, eNetworkEventInfo) {
		if (this.onrecvsuccess && this.onrecvsuccess._has_handlers) {
			return this.onrecvsuccess._fireEvent(this, eNetworkEventInfo);
		}
		return true;
	};

	_pNetwork._onrecverror = function (objData) {
		var e = new nexacro.NetworkErrorEventInfo("onrecverror", objData.errorcode, objData.errormsg);
		this._fire_onrecverror(this, e);
	};

	_pNetwork._fire_onrecverror = function (objNetwork, eNetworkErrorEventInfo) {
		if (this.onrecverror && this.onrecverror._has_handlers) {
			return this.onrecverror._fireEvent(this, eNetworkErrorEventInfo);
		}
		return true;
	};

	_pNetwork.paramck_isReachable = function (strUrl) {
		if (strUrl.trim().length < 1 || strUrl == null || typeof (strUrl) == "undefined" || typeof (strUrl) != "string" || strUrl == "") {
			return false;
		}
		return true;
	};

	_pNetwork.paramck_watchStart = function (strTime) {
		if (strTime == null || typeof (strTime) == "undefined") {
			return false;
		}

		if (!nexacro.Device.publicNumCheck(strTime)) {
			return false;
		}

		if (strTime < 200 || strTime > 86400000) {
			return false;
		}
		return true;
	};

	_pNetwork = null;
}

if (!nexacro.NetworkEventInfo) {
	nexacro.NetworkEventInfo = function (strEventId) {
		this.eventid = strEventId;
	};
	var _pNetworkEventInfo = nexacro.NetworkEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.NetworkEventInfo);
	_pNetworkEventInfo._type_name = "NetworkEventInfo";

	_pNetworkEventInfo = null;
}

if (!nexacro.NetworkErrorEventInfo) {
	nexacro.NetworkErrorEventInfo = function (strEventId, intErrorCode, strErrorMsg) {
		this.eventid = strEventId;
		this.errortype = "ObjectError";
		this.statuscode = intErrorCode;
		this.errormsg = strErrorMsg;
	};
	var _pNetworkErrorEventInfo = nexacro.NetworkErrorEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.NetworkErrorEventInfo);
	_pNetworkErrorEventInfo._type_name = "NetworkErrorEventInfo";

	_pNetworkErrorEventInfo = null;
}


if (!nexacro.FileDialog) {
	nexacro.FileDialog = function (name, obj) {
		this.name = name || "";

		this._id = nexacro.Device.makeID();
		nexacro.Device._userCreatedObj[this._id] = this;
		this.enableevent = true;
		this.defaultextension = true;
		this.filter = "";
		this.filterindex = 0;
		this.EnvironmentPath = 1;
		this.async = true;

		this._event_list = {
			"onclose" : 1, 
			"onerror" : 1
		};

		this.onclose = null;
		this.onerror = null;

		var params = '{"defaultextension":"' + this.defaultextension
			 + '","filter":"' + this.filter
			 + '","filterindex":"' + this.filterindex + '"}';

		var jsonstr = '{"id":' + this._id + ', "div":"FileDialog", "method":"constructor", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	nexacro.FileDialog.LOAD = 1;
	nexacro.FileDialog.SAVE = 2;
	nexacro.FileDialog.MULTILOAD = 3;
	nexacro.FileDialog.SELFOLDER = 4;

	var _pFileDialog = nexacro.FileDialog.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.FileDialog);
	_pFileDialog._type_name = "FileDialog";

	_pFileDialog.destroy = function () {
		var params = '""';
		var jsonstr;

		delete nexacro.Device._userCreatedObj[this._id];
		jsonstr = '{"id":' + this._id + ', "div":"FileDialog", "method":"destroy", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
		return true;
	};

	_pFileDialog.on_created = function () {
	};

	_pFileDialog.set_defaultextension = function (v) {
		if (this.pramck_filedialog_defaultextension(v)) {
			if (typeof (v) != "boolean") {
				if (v.toLowerCase() == 'true') {
					this.defaultextension = true;
				}
				else if (v.toLowerCase() == 'false') {
					this.defaultextension = false;
				}
			}
			else {
				this.defaultextension = v;
			}
			return true;
		}
		else {
			return false;
		}
	};

	_pFileDialog.set_filter = function (v) {
		if (this.pramck_filedialog_filter(v)) {
			var filterarr = v.split("|");
			var f_len = filterarr.length;
			if (f_len < 2) {
				return false;
			}

			if ((f_len % 2 == 1) && filterarr[f_len - 1] != "") {
				return false;
			}

			var normalize = /[\*].[a-zA-Z0-9가-힣\*]/gi;

			for (var i = 0; i < f_len; i++) {
				if (i % 2 == 1) {
					if (normalize.test(filterarr[i]) == false) {
						return false;
					}
					normalize.lastIndex = 0;
				}
			}
			this.filter = v;
			return true;
		}
		else {
			return false;
		}
	};

	_pFileDialog.set_filterindex = function (v) {
		if (this.pramck_filedialog_numbercheck(v)) {
			this.filterindex = v;
			return true;
		}
		else {
			return false;
		}
	};

	_pFileDialog.set_async = function (v) {
	};

	_pFileDialog.open = function (strTitle, constOpenMode, strInitialPath, strFileName) {
		if (strInitialPath == null || typeof (strInitialPath) == "undefined") {
			strInitialPath = "%USERAPP%";
		}

		if (strFileName == null || typeof (strFileName) == "undefined") {
			strFileName = "";
		}

		if (!this.pramck_filedialogasyncOpen(strTitle, constOpenMode)) {
			return false;
		}

		if (this.filter == "") {
			this.filter = "All(*.*)|*.*|";
		}
		var filterarr = this.filter.split("|");

		if (this.defaultextension == true && this.filterindex >= (filterarr.length / 2)) {
			return false;
		}

		if (nexacro.Device.curDevice == 0) {
			var rootPathCheck = strInitialPath.substring(0, 9);
			if (rootPathCheck.toLowerCase() == "%userapp%") {
				this.EnvironmentPath = 1;
			}
			else if (rootPathCheck.toLowerCase() == "%sd_card%") {
				this.EnvironmentPath = 2;
			}
			else {
				return false;
			}
		}
		else {
			var rootPathCheck = strInitialPath.substring(0, 9);
			if (rootPathCheck.toLowerCase() == "%userapp%") {
				strInitialPath = "_userapp_";
			}
			else {
				return false;
			}
		}

		var params = '{"strTitle":"' + strTitle
			 + '","constOpenMode":"' + constOpenMode + '","strInitialPath":"' + strInitialPath
			 + '","strFileName":"' + strFileName + '","defaultextension":"' + this.defaultextension
			 + '","filter":"' + this.filter + '","filterindex":"' + this.filterindex
			 + '","EnvironmentPath":"' + this.EnvironmentPath + '"}';
		var jsonstr;

		jsonstr = '{"id":' + this._id + ', "div":"FileDialog", "method":"open", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);

		return true;
	};

	_pFileDialog._onclose = function (objData) {
		var _virtualFile = objData.virtualfiles;
		var arr = new Array(_virtualFile.length);

		for (var i = 0; i < _virtualFile.length; i++) {
			var obj = new nexacro.VirtualFile("VirtualFile", "");
			obj.filename = _virtualFile[i].filename;
			obj.fullpath = _virtualFile[i].fullpath;
			obj.path = _virtualFile[i].path;
			arr[i] = obj;
		}

		var e = new nexacro.FileDialogEventInfo("onclose", objData.reason, objData.path, arr);
		this._fire_onclose(this, e);
	};

	_pFileDialog._fire_onclose = function (objFileDialog, eFileDialogEventInfo) {
		if (this.onclose && this.onclose._has_handlers) {
			return this.onclose._fireEvent(this, eFileDialogEventInfo);
		}
		return true;
	};

	_pFileDialog.pramck_filedialog_defaultextension = function (property) {
		if (property == null || typeof (property) == "undefined" || typeof (property) != "boolean") {
			if (property.toLowerCase() == 'true' || property.toLowerCase() == 'false') {
				return true;
			}
			else {
				return false;
			}
		}
		else {
			return true;
		}
	};

	_pFileDialog.pramck_filedialog_filter = function (property) {
		if (property == null || typeof (property) == "undefined" || typeof (property) != "string") {
			return false;
		}
		else {
			return true;
		}
	};

	_pFileDialog.pramck_filedialog_numbercheck = function (property) {
		if (property == null || typeof (property) == "undefined") {
			return false;
		}

		if (!nexacro.Device.publicNumCheck(property)) {
			return false;
		}
		return true;
	};

	_pFileDialog.pramck_filedialogasyncOpen = function (strTitle, constOpenMode) {
		if (strTitle == null || typeof (strTitle) == "undefined") {
			return false;
		}

		if (constOpenMode == null || typeof (constOpenMode) == "undefined") {
			return false;
		}
		else {
			if (!nexacro.Device.publicNumCheck(constOpenMode)) {
				return false;
			}

			if (constOpenMode > 4 || constOpenMode < 1) {
				return false;
			}
		}

		return true;
	};

	_pFileDialog = null;
}

if (!nexacro.FileDialogEventInfo) {
	nexacro.FileDialogEventInfo = function (strEventId, strReason, strPath, arrVirtualfiles) {
		this.eventid = strEventId;
		this.reason = strReason;
		this.path = strPath;
		this.virtualfiles = arrVirtualfiles;
	};
	var _pFileDialogEventInfo = nexacro.FileDialogEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.FileDialogEventInfo);
	_pFileDialogEventInfo._type_name = "FileDialogEventInfo";

	_pFileDialogEventInfo = null;
}




if (nexacro.OS == "iOS" && !nexacro.VirtualFile) {
	nexacro.VirtualFile = function (name, obj) {
		this._id = nexacro.Device.makeID();
		nexacro.Device._userCreatedObj[this._id] = this;
		this.name = name || "";

		this.filename = "";
		this.fullpath = "";
		this.path = "";
		this.enableevent = true;
		this.async = true;

		this._event_list = {
			"onsuccess" : 1, 
			"onerror" : 1, 
			"getEvent" : 1
		};

		this.onsuccess = null;
		this.onerror = null;
		this.getEvent = null;

		var params = '{"strFilename":"' + this.filename + '","fullpath":"' + this.fullpath + '","path":"' + this.path + '"}';
		var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"constructor", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};
	nexacro.VirtualFile.openRead = 0x0001;
	nexacro.VirtualFile.openWrite = 0x0002;
	nexacro.VirtualFile.openAppend = 0x0010;
	nexacro.VirtualFile.openCreate = 0x1000;
	nexacro.VirtualFile.openText = 0x0100;
	nexacro.VirtualFile.openBinary = 0x0200;

	nexacro.VirtualFile.seekBegin = 0x0000;
	nexacro.VirtualFile.seekCurrent = 0x0001;
	nexacro.VirtualFile.seekEnd = 0x0002;

	nexacro.VirtualFile.findAll = 0x0001;
	nexacro.VirtualFile.findFileOnly = 0x0002;
	nexacro.VirtualFile.findDirectoryOnly = 0x0003;
	nexacro.VirtualFile.findCaseless = 0x0010;
	nexacro.VirtualFile.EnvironmentPath = 1;

	var _pVirtualFile = nexacro.VirtualFile.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.VirtualFile);
	_pVirtualFile._type_name = "VirtualFile";

	_pVirtualFile.destroy = function () {
		var params = '""';
		var jsonstr;

		delete nexacro.Device._userCreatedObj[this._id];
		jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"destroy", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
		return true;
	};

	_pVirtualFile.on_created = function () {
	};

	_pVirtualFile.set_filename = function (v) {
		if (this.pramck_virtualproperty(v)) {
			this.filename = v;
			return true;
		}
		else {
			return false;
		}
	};

	_pVirtualFile.set_fullpath = function (v) {
		if (this.pramck_virtualproperty(v)) {
			this.fullpath = v;
			return true;
		}
		else {
			return false;
		}
	};

	_pVirtualFile.set_path = function (v) {
		if (this.pramck_virtualproperty(v)) {
			this.path = v;
			return true;
		}
		else {
			return false;
		}
	};

	_pVirtualFile.set_environmentpath = function (v) {
		if (this.pramck_virtualproperty(v)) {
			this.EnvironmentPath = v;
			if ((+this.EnvironmentPath) != (+this.EnvironmentPath)) {
				return false;
			}
			return true;
		}
		else {
			return false;
		}
	};

	_pVirtualFile.set_async = function (v) {
	};

	_pVirtualFile.set_filename = function () {
	};
	_pVirtualFile.set_fullpath = function () {
	};
	_pVirtualFile.set_path = function () {
	};

	_pVirtualFile.open = function (strFileName, nOption) {
		this.nOptions = "";
		this.nFiletype = "";

		if (strFileName == null) {
			this.nOptions = strFileName;
		}
		else if (strFileName != null) {
			this.nOptions = nOption;
			this.fullpath = strFileName;
		}
		else {
			return false;
		}

		var index_path = this.fullpath.lastIndexOf("/");
		if (index_path == -1) {
			index_path = this.fullpath.lastIndexOf("%");
		}
		this.path = this.fullpath.substring(0, index_path + 1);

		var index_name = this.fullpath.lastIndexOf("/");
		if (index_name == -1) {
			index_name = this.fullpath.lastIndexOf("%");
		}

		this.filename = this.fullpath.substring(index_name + 1, this.fullpath.length);

		if (!this.pramck_asyncOpen(this.path, this.nOptions)) {
			return false;
		}

		this.strFilename = "";

		if (nexacro.Device.curDevice == 0) {
			this.strFilename = this.fullpath.substring(9, this.fullpath.length);

			var rootPathCheck = this.fullpath.substring(0, 9);

			if (rootPathCheck.toLowerCase() == "%userapp%") {
				this.EnvironmentPath = 1;
			}
			else if (rootPathCheck.toLowerCase() == "%sd_card%") {
				this.EnvironmentPath = 2;
			}
			else {
				var _filecache = application._getFileCache(strFileName);
				if (null != _filecache) {
					this.EnvironmentPath = 3;
					this.strFilename = _filecache;
				}
				else {
					return false;
				}
			}
		}
		else {
			var iosfilepath = "";
			var rootPathCheck = this.fullpath.substring(0, 9);

			if (rootPathCheck.toLowerCase() == "%userapp%") {
				iosfilepath = "_userapp_" + this.fullpath.substring(9, this.fullpath.length);
			}
			else {
				var _filecache = application._getFileCache(strFileName);
				if (null != _filecache) {
					iosfilepath = "_userapp_" + _filecache;
				}
				else {
					iosfilepath = strFileName;
				}
			}
			this.strFilename = iosfilepath;
		}

		var params = "";

		if (nexacro.Device.curDevice == 0) {
			params = '{"strFilename":"' + this.strFilename + '","nOptions":"' + this.nOptions
				 + '","nFiletype":"' + this.nFiletype
				 + '","EnvironmentPath":"' + this.EnvironmentPath + '"}';
		}
		else {
			params = '{"strFilename":"' + this.strFilename + '","nOptions":"' + this.nOptions
				 + '","nFiletype":"' + this.nFiletype + '"}';
		}

		var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"open", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
		return true;
	};

	_pVirtualFile.close = function () {
		var params = '""';
		var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"close", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	_pVirtualFile.read = function (nLength) {
		this.nLength = nLength || -1;
		this.strCharset = "UTF-8";

		if (!this.pramck_asyncRead(this.nLength)) {
			return false;
		}

		var params = '{  "nLength":"' + this.nLength;
		params += '", "strCharset":"' + this.strCharset;
		params += '"}';

		var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"read", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);

		return true;
	};

	_pVirtualFile.readLine = function (strDelimeter) {
		this.strCharset = "UTF-8";

		if (strDelimeter == null) {
			this.strDelimeter = "";
		}
		else if (strDelimeter != null) {
			this.strDelimeter = nexacro.Device.encodeString(strDelimeter);

			if (!this.pramck_asyncReadLine(this.strDelimeter)) {
				return false;
			}
		}

		var params = '{  "strDelimeter":"' + this.strDelimeter;
		params += '", "strCharset":"' + this.strCharset;
		params += '"}';

		var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"readLine", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);

		return true;
	};

	_pVirtualFile.seek = function (nOffset, nOption) {
		this.nOffset = "";
		this.nOption = "";

		if (nOption == null) {
			this.nOffset = nOffset;
			this.nOption = VirtualFile.seekCurrent;
		}
		else if (nOption != null) {
			this.nOffset = nOffset;
			this.nOption = nOption;
		}
		if (!this.paramck_asyncSeek(this.nOffset, this.nOption)) {
			return false;
		}

		var params = '{  "nOffset":"' + this.nOffset;
		params += '", "nOption":"' + this.nOption;
		params += '"}';
		var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"seek", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);

		return true;
	};

	_pVirtualFile.write = function (varData, strCharset) {
		this.varData = varData;
		this.strCharset = strCharset;

		if (typeof (this.varData) == "undefined" || this.varData.length == 0) {
			return false;
		}

		var params = '{  "varData":"' + this.varData;
		params += '", "strCharset":"' + this.strCharset;
		params += '"}';
		var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"write", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);

		return true;
	};

	_pVirtualFile.remove = function (strFilePath) {
		this._strFilePath = "";
		if (strFilePath instanceof nexacro.VirtualFile) {
			this._strFilePath = strFilePath.fullpath;
		}
		else {
			this._strFilePath = strFilePath;
		}
		if (!this.pramck_asyncDelete(this._strFilePath)) {
			return false;
		}

		var deletetPath = "";
		var rootPathCheck = "";
		if (nexacro.Device.curDevice == 0) {
			rootPathCheck = this._strFilePath.substring(0, 9);
			if (rootPathCheck.toLowerCase() == "%userapp%") {
				this.EnvironmentPath = 1;
				deletetPath = this._strFilePath.substring(9, this._strFilePath.length);
			}
			else if (rootPathCheck.toLowerCase() == "%sd_card%") {
				this.EnvironmentPath = 2;
				deletetPath = this._strFilePath.substring(9, this._strFilePath.length);
			}
			else {
				var _filecache = application._getFileCache(strFilePath);
				if (null != _filecache) {
					this.EnvironmentPath = 3;
					deletetPath = _filecache;
				}
				else {
					return false;
				}
			}
		}
		else {
			var iosfilepath = "";
			rootPathCheck = this._strFilePath.substring(0, 9);
			if (rootPathCheck.toLowerCase() == "%userapp%") {
				iosfilepath = "_userapp_" + this._strFilePath.substring(9, this._strFilePath.length);
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
			deletetPath = iosfilepath;
		}

		var params = '{"strFilePath":"' + deletetPath
			 + '","EnvironmentPath":"' + this.EnvironmentPath + '"}';
		var jsonstr = '{"id":' + this._id + ',"div":"VirtualFile", "method":"remove", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);

		return true;
	};

	_pVirtualFile.getFileList = function (strPath, strSearchExpr, constOption) {
		this.strPath = strPath;
		this.strSearchExpr = strSearchExpr;
		this.constOption = constOption;

		if (typeof (this.constOption) == "undefined") {
			this.constOption = VirtualFile.findAll;
		}

		if (strPath == null || strSearchExpr == null || !this.pramck_asyncGetFileList(this.strPath, this.strSearchExpr, this.constOption)) {
			return false;
		}

		var fileListPath = "";
		if (nexacro.Device.curDevice == 0) {
			var rootPathCheck = this.strPath.substring(0, 9);
			if (rootPathCheck.toLowerCase() == "%userapp%") {
				this.EnvironmentPath = 1;
				fileListPath = this.strPath.substring(9, this.strPath.length);
			}
			else if (rootPathCheck.toLowerCase() == "%sd_card%") {
				this.EnvironmentPath = 2;
				fileListPath = this.strPath.substring(9, this.strPath.length);
			}
			else {
				var _filecache = application._getFileCache(strPath);
				if (null != _filecache) {
					this.EnvironmentPath = 3;
					fileListPath = _filecache;
				}
				else {
					return false;
				}
			}
		}
		else {
			var iosfilepath = "";
			var rootPathCheck = this.strPath.substring(0, 9);

			if (rootPathCheck.toLowerCase() == "%userapp%") {
				iosfilepath = "_userapp_" + this.strPath.substring(9, this.strPath.length);
			}
			else {
				var _filecache = application._getFileCache(strPath);
				if (null != _filecache) {
					iosfilepath = "_userapp_" + _filecache;
				}
				else {
					return false;
				}
			}
			fileListPath = iosfilepath;
		}

		var params = '{"strPath":"' + fileListPath + '" ,"strSearchExpr":"' + this.strSearchExpr
			 + '","constOption":"' + this.constOption
			 + '","EnvironmentPath":"' + this.EnvironmentPath + '"}';

		var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"getFileList", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);

		return true;
	};

	_pVirtualFile.getFileSize = function () {
		var params;


		if (nexacro.Device.curDevice == 0) {
			params = '{  "strPath":"' + this.fullpath;
			params += '","EnvironmentPath":"' + this.EnvironmentPath + '"}';
		}
		else {
			var iosfilepath = "";
			var rootPathCheck = this.fullpath.substring(0, 9);
			if (rootPathCheck.toLowerCase() == "%userapp%") {
				iosfilepath = "_userapp_" + this.fullpath.substring(9, this.fullpath.length);
			}

			params = '{  "strPath":"' + iosfilepath;
			params += '","EnvironmentPath":"' + this.EnvironmentPath + '"}';
		}
		var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"getFileSize", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	_pVirtualFile.isExist = function (strPath) {
		if (!this.pramck_asyncIsExist(strPath)) {
			return false;
		}
		var isExistPath = "";
		if (nexacro.Device.curDevice == 0) {
			var rootPathCheck = strPath.substring(0, 9);
			if (rootPathCheck.toLowerCase() == "%userapp%") {
				this.EnvironmentPath = 1;
				isExistPath = strPath.substring(9, strPath.length);
			}
			else if (rootPathCheck.toLowerCase() == "%sd_card%") {
				this.EnvironmentPath = 2;
				isExistPath = strPath.substring(9, strPath.length);
			}
			else {
				var _filecache = application._getFileCache(strPath);
				if (null != _filecache) {
					this.EnvironmentPath = 3;
					isExistPath = _filecache;
				}
				else {
					return false;
				}
			}
		}
		else {
			var iosfilepath = "";
			var rootPathCheck = strPath.substring(0, 9);
			if (rootPathCheck.toLowerCase() == "%userapp%") {
				isExistPath = "_userapp_" + strPath.substring(9, strPath.length);
			}
			else {
				var _filecache = application._getFileCache(strPath);
				if (null != _filecache) {
					isExistPath = "_userapp_" + _filecache;
				}
				else {
					return false;
				}
			}
		}
		var params = '{  "strPath":"' + isExistPath
			 + '","EnvironmentPath":"' + this.EnvironmentPath + '"}';
		var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"isExist", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
		return true;
	};

	_pVirtualFile.createDirectory = function (strPath, bAllCreate) {
		if (!this.pramck_asyncIsExist(strPath)) {
			return false;
		}

		if (bAllCreate == null) {
			this.strPath = strPath;
			this.bAllCreate = false;
		}
		else if (bAllCreate != null) {
			this.strPath = strPath;
			this.bAllCreate = bAllCreate;
		}
		else {
			return false;
		}

		var strInitialPath = "";

		if (nexacro.Device.curDevice == 0) {
			var rootPathCheck = strPath.substring(0, 9);
			if (rootPathCheck.toLowerCase() == "%userapp%") {
				strInitialPath = strPath.substring(9, strPath.length);
				this.EnvironmentPath = 1;
			}
			else if (rootPathCheck.toLowerCase() == "%sd_card%") {
				strInitialPath = strPath.substring(9, strPath.length);
				this.EnvironmentPath = 2;
			}
			else {
				return false;
			}
		}
		else {
			var rootPathCheck = strPath.substring(0, 9);
			if (rootPathCheck.toLowerCase() == "%userapp%") {
				strInitialPath = "_userapp_" + strPath.substring(9, strPath.length);
			}
			else {
				return false;
			}
		}

		var params = '{  "strPath":"' + strInitialPath
			 + '","EnvironmentPath":"' + this.EnvironmentPath + '","bAllCreate":"' + this.bAllCreate + '"}';
		var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"createDirectory", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);

		return true;
	};

	_pVirtualFile.deleteDirectory = function (strPath, bAllChild) {
		if (!this.pramck_asyncIsExist(strPath)) {
			return false;
		}

		if (bAllChild == null) {
			this.strPath = strPath;
			this.bAllChild = false;
		}
		else if (bAllChild != null) {
			this.strPath = strPath;
			this.bAllChild = bAllChild;
		}
		else {
			return false;
		}

		var strInitialPath = "";

		if (nexacro.Device.curDevice == 0) {
			var rootPathCheck = strPath.substring(0, 9);
			if (rootPathCheck.toLowerCase() == "%userapp%") {
				strInitialPath = strPath.substring(9, strPath.length);
				this.EnvironmentPath = 1;
			}
			else if (rootPathCheck.toLowerCase() == "%sd_card%") {
				strInitialPath = strPath.substring(9, strPath.length);
				this.EnvironmentPath = 2;
			}
			else {
				return false;
			}
		}
		else {
			var rootPathCheck = strPath.substring(0, 9);
			if (rootPathCheck.toLowerCase() == "%userapp%") {
				strInitialPath = "_userapp_" + strPath.substring(9, strPath.length);
			}
			else {
				return false;
			}
		}

		var params = '{  "strPath":"' + strInitialPath
			 + '","EnvironmentPath":"' + this.EnvironmentPath + '","bAllChild":"' + this.bAllChild + '"}';
		var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"deleteDirectory", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
		return true;
	};

	_pVirtualFile.renameDirectory = function (strPath, strNewName) {
		if (!this.pramck_asyncIsExist(strPath)) {
			return false;
		}

		if (!this.paramck_folderName(strNewName)) {
			return false;
		}

		if (strNewName == null) {
			return false;
		}

		this.strPath = strPath;
		this.strNewName = strNewName;

		var strInitialPath = "";
		var strDestPath = "";
		if (nexacro.Device.curDevice == 0) {
			var rootPathCheck = strPath.substring(0, 9);
			if (rootPathCheck.toLowerCase() == "%userapp%") {
				strInitialPath = strPath.substring(9, strPath.length);
				this.EnvironmentPath = 1;
			}
			else if (rootPathCheck.toLowerCase() == "%sd_card%") {
				strInitialPath = strPath.substring(9, strPath.length);
				this.EnvironmentPath = 2;
			}
			else {
				return false;
			}
		}
		else {
			var rootPathCheck = strPath.substring(0, 9);
			if (rootPathCheck.toLowerCase() == "%userapp%") {
				strInitialPath = "_userapp_" + strPath.substring(9, strPath.length);
			}
			else {
				return false;
			}
		}

		if (nexacro.Device.curDevice == 0) {
			var rootPathCheck = strNewName.substring(0, 9);
			if (rootPathCheck.toLowerCase() == "%userapp%") {
				strDestPath = strNewName.substring(9, strNewName.length);
				this.EnvironmentPath = 1;
			}
			else if (rootPathCheck.toLowerCase() == "%sd_card%") {
				strDestPath = strNewName.substring(9, strNewName.length);
				this.EnvironmentPath = 2;
			}
			else {
				strDestPath = strNewName;
			}
		}
		else {
			var rootPathCheck = strNewName.substring(0, 9);
			if (rootPathCheck.toLowerCase() == "%userapp%") {
				strDestPath = "_userapp_" + strNewName.substring(9, strNewName.length);
			}
			else {
				strDestPath = strNewName;
			}
		}

		var params = '{  "strPath":"' + strInitialPath
			 + '","strNewName":"' + strDestPath + '","EnvironmentPath":"' + this.EnvironmentPath + '"}';
		var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"renameDirectory", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
		return true;
	};

	_pVirtualFile._onsuccess = function (objData) {
		var _textdata = "";
		var _bindata = "";
		var temptxtlen = 0;
		var tempbinlen = 0;

		if (objData.textdata) {
			temptxtlen = objData.textdata.length;
		}
		if (objData.binarydata) {
			tempbinlen = objData.binarydata.length;
		}

		if (temptxtlen > 0) {
			_textdata = objData.textdata.replace(/\&amp\;/g, "&");
			_textdata = _textdata.replace(/\&lt\;/g, "<");
			_textdata = _textdata.replace(/\&gt\;/g, ">");
			_textdata = _textdata.replace(/\&quot\;/g, "\"");
			_textdata = _textdata.replace(/\&apos\;/g, "'");
			_textdata = _textdata.replace(/\&\#32\;/g, " ");
			_textdata = _textdata.replace(/\&\#13\;/g, "\r");
			_textdata = _textdata.replace(/\&\#10\;/g, "\n");
			_textdata = _textdata.replace(/\&\#9\;/g, "\t");
		}
		else if (tempbinlen > 0) {
			_bindata = objData.binarydata.replace(/\&amp\;/g, "&");
			_bindata = _bindata.replace(/\&lt\;/g, "<");
			_bindata = _bindata.replace(/\&gt\;/g, ">");
			_bindata = _bindata.replace(/\&quot\;/g, "\"");
			_bindata = _bindata.replace(/\&apos\;/g, "'");
			_bindata = _bindata.replace(/\&\#32\;/g, " ");
			_bindata = _bindata.replace(/\&\#13\;/g, "\r");
			_bindata = _bindata.replace(/\&\#10\;/g, "\n");
			_bindata = _bindata.replace(/\&\#9\;/g, "\t");
		}
		var e = new nexacro.VirtualFileEventInfo("onsuccess", objData.reason, _textdata, _bindata, eval(objData.fileattributelist), objData.filesize, objData.fileisexist);
		this._fire_onsuccess(this, e);
	};

	_pVirtualFile._fire_onsuccess = function (objVirtualFile, eVirtualFileEventInfo) {
		if (this.onsuccess && this.onsuccess._has_handlers) {
			return this.onsuccess._fireEvent(this, eVirtualFileEventInfo);
		}
		return true;
	};

	_pVirtualFile._onerror = function (objData) {
		var e = new nexacro.VirtualFileErrorEventInfo("onerror", objData.errorcode, objData.errormsg);
		this._fire_onerror(this, e);
	};

	_pVirtualFile._fire_onerror = function (objVirtualFile, eVirtualFileErrorEventInfo) {
		if (this.onerror && this.onerror._has_handlers) {
			return this.onerror._fireEvent(this, eVirtualFileErrorEventInfo);
		}
		return true;
	};

	_pVirtualFile.toJSON = function () {
		return eval('({"filename":"' + this.filename + '","fullpath":"' + this.fullpath + '","path":"' + this.path + '"})');
	};

	_pVirtualFile.paramck_folderName = function (strName) {
		if (strName == null) {
			return false;
		}

		if (strName.match(/[\"/:*?<>|]/)) {
			return false;
		}


		return true;
	};

	_pVirtualFile.pramck_virtualproperty = function (property) {
		if (typeof (property) == "undefined" || property == "" || property == null) {
			return false;
		}
		else {
			return true;
		}
	};

	_pVirtualFile.pramck_asyncOpen = function (strFileName, nOptions) {
		if (nOptions == null) {
			if (typeof (strFileName) == "undefined" || strFileName == "" || strFileName == null) {
				return false;
			}

			if (!nexacro.Device.publicNumCheck(strFileName)) {
				return false;
			}
			return true;
		}

		if (strFileName == null || typeof (strFileName) == "undefined") {
			return false;
		}

		if (nOptions == null || typeof (nOptions) == "undefined") {
			return false;
		}

		if (!nexacro.Device.publicNumCheck(nOptions)) {
			return false;
		}
		return true;
	};

	_pVirtualFile.pramck_asyncRead = function (nLength) {
		if (nLength == null || typeof (nLength) == "undefined") {
			return false;
		}

		if (!nexacro.Device.publicNumCheck(nLength)) {
			return false;
		}
		return true;
	};

	_pVirtualFile.pramck_asyncReadLine = function (strDelimeter) {
		if (strDelimeter == null || typeof (strDelimeter) == "undefined" || typeof (strDelimeter) != "string") {
			return false;
		}

		return true;
	};

	_pVirtualFile.paramck_asyncSeek = function (nOffset, nOption) {
		if (nOffset == null || typeof (nOffset) == "undefined") {
			return false;
		}

		if (nOption == null || typeof (nOption) == "undefined") {
			return false;
		}

		if (!nexacro.Device.publicNumCheck(nOffset)) {
			return false;
		}
		return true;
	};

	_pVirtualFile.pramck_asyncDelete = function (strFilePath) {
		if (strFilePath == null || typeof (strFilePath) == "undefined" || strFilePath == "") {
			return false;
		}
		else {
			return true;
		}
	};

	_pVirtualFile.pramck_asyncIsExist = function (strPath) {
		if (strPath == null || typeof (strPath) == "undefined" || strPath == "" || typeof (strPath) != "string") {
			return false;
		}
		else {
			return true;
		}
	};

	_pVirtualFile.pramck_asyncGetFileList = function (strPath, strSearchExpr, constOption) {
		if (strPath == null || typeof (strPath) == "undefined" || strPath == "" || typeof (strPath) != "string") {
			return false;
		}

		if (strSearchExpr == null || typeof (strSearchExpr) == "undefined" || strSearchExpr == "" || typeof (strSearchExpr) != "string") {
			return false;
		}

		if (constOption == null || typeof (constOption) == "undefined" || constOption == "") {
			return false;
		}

		if (!nexacro.Device.publicNumCheck(constOption)) {
			return false;
		}
		return true;
	};

	_pVirtualFile = null;
}

if (nexacro.OS == "iOS" && !nexacro.VirtualFileEventInfo) {
	nexacro.VirtualFileEventInfo = function (strEventId, strReason, strTextdata, strBinarydata, strFilelist, strFilesize, strExist) {
		this.eventid = strEventId;
		this.reason = strReason;
		this.textdata = strTextdata;
		this.binarydata = strBinarydata;

		if (typeof (strFilelist) != "undefined") {
			var tempArr = new Array(strFilelist.length);
			for (var i = 0; i < strFilelist.length; i++) {
				tempArr[i] = new nexacro.FileAttribute(strFilelist[i]);
			}
			this.fileattributelist = tempArr;
		}
		else {
			this.fileattributelist = "";
		}

		this.filesize = strFilesize;
		this.fileisexist = strExist;
	};
	var _pVirtualFileEventInfo = nexacro.VirtualFileEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.VirtualFileEventInfo);
	_pVirtualFileEventInfo._type_name = "VirtualFileEventInfo";

	_pVirtualFileEventInfo = null;
}

if (nexacro.OS == "iOS" && !nexacro.VirtualFileErrorEventInfo) {
	nexacro.VirtualFileErrorEventInfo = function (strEventId, intErrorCode, strErrorMsg) {
		this.eventid = strEventId;
		this.errortype = "ObjectError";
		this.statuscode = intErrorCode;
		this.errormsg = strErrorMsg;
	};
	var _pVirtualFileErrorEventInfo = nexacro.VirtualFileErrorEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.VirtualFileErrorEventInfo);
	_pVirtualFileErrorEventInfo._type_name = "VirtualFileErrorEventInfo";

	_pVirtualFileErrorEventInfo = null;
}

if (nexacro.OS == "iOS" && !nexacro.FileAttribute) {
	nexacro.FileAttribute = function (jsonObj) {
		this.accesstime = jsonObj.accesstime;
		this.createtime = jsonObj.createtime;
		this.filename = jsonObj.filename;
		this.groupid = jsonObj.groupid;
		this.modifytime = jsonObj.modifytime;
		this.size = jsonObj.size;
		this.userid = jsonObj.userid;
		this.isdirectory = jsonObj.isdirectory;
		this.isreadonly = jsonObj.isreadonly;
	};
	var _pFileAttribute = nexacro.FileAttribute.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.FileAttribute);
	_pFileAttribute._type_name = "FileAttribute";

	_pFileAttribute.on_created = function () {
	};

	_pFileAttribute.isDirectory = function () {
		return this.isdirectory;
	};

	_pFileAttribute.isReadOnly = function () {
		return this.isreadonly;
	};

	_pFileAttribute = null;
}


if (!nexacro.Camera) {
	nexacro.Camera = function (name, obj) {
		this._id = nexacro.Device.makeID();
		nexacro.Device._userCreatedObj[this._id] = this;
		this.name = name || "";

		this.imagequality = "100";
		this.imagewidth = "0";
		this.imageheight = "0";
		this.encodingtype = "JPEG";
		this.gettype = "0";
		this.enableevent = true;

		this._event_list = {
			"oncapture" : 1, 
			"onerror" : 1
		};

		this.oncapture = null;
		this.onerror = null;

		var params = '""';
		var jsonstr = "";

		jsonstr = '{"id":' + this._id + ', "div":"Camera", "method":"constructor", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	var _pCamera = nexacro.Camera.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.Camera);
	_pCamera._type_name = "Camera";

	_pCamera.destroy = function () {
		var params = '""';
		var jsonstr;

		delete nexacro.Device._userCreatedObj[this._id];

		jsonstr = '{"id":' + this._id + ', "div":"Camera", "method":"destroy", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);

		return true;
	};

	_pCamera.on_created = function () {
	};

	_pCamera.set_imagequality = function (v) {
		if (typeof (v) == "undefined" || v == null || v == "") {
			this.imagequality = 100;
		}
		else {
			if (v >= 0 && v <= 100) {
				this.imagequality = v;
			}
			else {
				return false;
			}
		}
		return true;
	};

	_pCamera.set_imagewidth = function (v) {
		if (typeof (v) == "undefined" || v == null || v == "") {
			this.imagewidth = 0;
		}
		else {
			if (v >= 0) {
				this.imagewidth = v;
			}
			else {
				return false;
			}
		}
		return true;
	};

	_pCamera.set_imageheight = function (v) {
		if (typeof (v) == "undefined" || v == null || v == "") {
			this.imageheight = 0;
		}
		else {
			if (v >= 0) {
				this.imageheight = v;
			}
			else {
				return false;
			}
		}
		return true;
	};

	_pCamera.set_encodingtype = function (v) {
		if (typeof (v) == "undefined" || v == null || v == "") {
			this.encodingtype = "JPEG";
		}
		else {
			if (v == "JPEG" || v.toUpperCase() == "JPEG") {
				this.encodingtype = "JPEG";
			}
			else if (v == "PNG" || v.toUpperCase() == "PNG") {
				this.encodingtype = "PNG";
			}
			else {
				return false;
			}
		}
		return true;
	};

	_pCamera.set_gettype = function (v) {
		if (typeof (v) == "undefined" || v == null || v == "") {
			this.gettype = 0;
		}
		else {
			if (v == 0 || v == 1) {
				this.gettype = v;
			}
			else {
				return false;
			}
		}
		return true;
	};

	_pCamera.takePicture = function () {
		if (this.paramck_takePicture(this.imagequality, this.imagewidth, this.imageheight, this.encodingtype, this.gettype)) {
			var params = '{  "quality":"' + this.imagequality.toString();
			params += '", "width":"' + this.imagewidth.toString();
			params += '", "height":"' + this.imageheight.toString();
			params += '", "encodingType":"' + this.encodingtype.toString();
			params += '", "gettype":"' + this.gettype.toString();
			params += '"}';

			var jsonstr = "";
			jsonstr = '{"id":' + this._id + ', "div":"Camera", "method":"takePicture", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
		}
		else {
		}
	};

	_pCamera._oncapture = function (objData) {
		var e = new nexacro.CameraEventInfo("oncapture", objData.reason, objData.url, objData.imagedata, objData.imagewidth, objData.imageheight);
		this._fire_oncapture(this, e);
	};

	_pCamera._fire_oncapture = function (objCamera, eCameraEventInfo) {
		if (this.oncapture && this.oncapture._has_handlers) {
			return this.oncapture._fireEvent(this, eCameraEventInfo);
		}
		return true;
	};

	_pCamera._onerror = function (objData) {
		var e = new nexacro.CameraErrorEventInfo("onerror", objData.errorcode, objData.errormsg);
		this._fire_onerror(this, e);
	};

	_pCamera._fire_onerror = function (objCamera, eCameraErrorEventInfo) {
		if (this.onerror && this.onerror._has_handlers) {
			return this.onerror._fireEvent(this, eCameraErrorEventInfo);
		}
		return true;
	};

	_pCamera.paramck_takePicture = function (nQuality, nWidth, nHeight, strEncodingType, strGetType) {
		if (nQuality != null) {
			if (!nexacro.Device.publicNumCheck(nQuality)) {
				return false;
			}
		}

		if (nWidth != null) {
			if (!nexacro.Device.publicNumCheck(nWidth)) {
				return false;
			}
		}

		if (nHeight != null) {
			if (!nexacro.Device.publicNumCheck(nHeight)) {
				return false;
			}
		}

		if (strGetType != null) {
			if (!nexacro.Device.publicNumCheck(strGetType)) {
				return false;
			}
		}

		if (strEncodingType != null) {
			if (typeof (strEncodingType) != "string") {
				return false;
			}
		}

		return true;
	};

	_pCamera = null;
}

if (!nexacro.CameraEventInfo) {
	nexacro.CameraEventInfo = function (strEventId, strReason, strUrl, strImagedata, strImagewidth, strImageheight) {
		this.eventid = strEventId;
		this.reason = strReason;
		this.url = strUrl;
		this.imagedata = strImagedata;
		this.imagewidth = strImagewidth;
		this.imageheight = strImageheight;
	};
	var _pCameraEventInfo = nexacro.CameraEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.CameraEventInfo);

	_pCameraEventInfo._type_name = "CameraEventInfo";

	_pCameraEventInfo = null;
}

if (!nexacro.CameraErrorEventInfo) {
	nexacro.CameraErrorEventInfo = function (strEventId, intErrorCode, strErrorMsg) {
		this.eventid = strEventId;
		this.errortype = "ObjectError";
		this.statuscode = intErrorCode;
		this.errormsg = strErrorMsg;
	};
	var _pCameraErrorEventInfo = nexacro.CameraErrorEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.CameraErrorEventInfo);

	_pCameraErrorEventInfo._type_name = "CameraErrorEventInfo";

	_pCameraErrorEventInfo = null;
}


if (!nexacro.ImagePicker) {
	nexacro.ImagePicker = function (name, obj) {
		this._id = nexacro.Device.makeID();
		nexacro.Device._userCreatedObj[this._id] = this;
		this.name = name || "";

		this.imagequality = "100";
		this.imagewidth = "0";
		this.imageheight = "0";
		this.encodingtype = "JPEG";
		this.gettype = "0";

		this.enableevent = true;

		this._event_list = {
			"onsuccess" : 1, 
			"onerror" : 1
		};
		this.onsuccess = null;
		this.onerror = null;

		var params = '""';
		var jsonstr = "";
		if (nexacro.Device.curDevice == 0) {
			jsonstr = '{"id":' + this._id + ', "div":"ImagePicker", "method":"constructor", "params":' + params + '}';
		}
		else {
			jsonstr = '{"id":' + this._id + ', "div":"Camera", "method":"constructor", "params":' + params + '}';
		}
		nexacro.Device.exec(jsonstr);
	};
	var _pImagePicker = nexacro.ImagePicker.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.ImagePicker);

	_pImagePicker._type_name = "ImagePicker";

	_pImagePicker.destroy = function () {
		var params = '""';
		var jsonstr;

		delete nexacro.Device._userCreatedObj[this._id];
		if (nexacro.Device.curDevice == 0) {
			jsonstr = '{"id":' + this._id + ', "div":"ImagePicker", "method":"destroy", "params":' + params + '}';
		}
		else {
			jsonstr = '{"id":' + this._id + ', "div":"Camera", "method":"destroy", "params":' + params + '}';
		}
		nexacro.Device.exec(jsonstr);
		return true;
	};

	_pImagePicker.on_created = function () {
	};

	_pImagePicker.set_imagequality = function (v) {
		if (typeof (v) == "undefined" || v == null || v == "") {
			this.imagequality = 100;
		}
		else {
			if (v >= 0 && v <= 100) {
				this.imagequality = v;
			}
			else {
				return false;
			}
		}
		return true;
	};

	_pImagePicker.set_imagewidth = function (v) {
		if (typeof (v) == "undefined" || v == null || v == "") {
			this.imagewidth = 0;
		}
		else {
			if (v >= 0) {
				this.imagewidth = v;
			}
			else {
				return false;
			}
		}
		return true;
	};

	_pImagePicker.set_imageheight = function (v) {
		if (typeof (v) == "undefined" || v == null || v == "") {
			this.imageheight = 0;
		}
		else {
			if (v >= 0) {
				this.imageheight = v;
			}
			else {
				return false;
			}
		}
		return true;
	};

	_pImagePicker.set_encodingtype = function (v) {
		if (typeof (v) == "undefined" || v == null || v == "") {
			this.encodingtype = "JPEG";
		}
		else {
			if (v == "JPEG" || v.toUpperCase() == "JPEG") {
				this.encodingtype = "JPEG";
			}
			else if (v == "PNG" || v.toUpperCase() == "PNG") {
				this.encodingtype = "PNG";
			}
			else {
				return false;
			}
		}
		return true;
	};

	_pImagePicker.set_gettype = function (v) {
		if (typeof (v) == "undefined" || v == null || v == "") {
			this.gettype = 0;
		}
		else {
			if (v == 0 || v == 1) {
				this.gettype = v;
			}
			else {
				return false;
			}
		}
		return true;
	};

	_pImagePicker.open = function (strGetType, strGetImageType) {
		if ((strGetType != null && typeof (strGetType) != "undefined") && ((strGetType == 0) || (strGetType == 1) || (strGetType == "0") || (strGetType == "1"))) {
			this.gettype = strGetType;
		}
		else {
			return false;
		}

		if ((strGetImageType != null && typeof (strGetImageType) != "undefined") && ((strGetImageType == 0) || (strGetImageType == 1) || (strGetImageType == "0") || (strGetImageType == "1"))) {
			this.encodingtype = strGetImageType;
		}

		if (this.paramck_ImagePicker_asyncOpen(this.imagequality, this.imagewidth, this.imageheight, this.encodingtype, this.gettype)) {
			var params = '{  "quality":"' + this.imagequality.toString();
			params += '", "width":"' + this.imagewidth.toString();
			params += '", "height":"' + this.imageheight.toString();
			params += '", "encodingType":"' + this.encodingtype.toString();
			params += '", "gettype":"' + this.gettype.toString();
			params += '"}';
			var jsonstr = "";
			if (nexacro.Device.curDevice == 0) {
				jsonstr = '{"id":' + this._id + ', "div":"ImagePicker", "method":"open", "params":' + params + '}';
			}
			else {
				jsonstr = '{"id":' + this._id + ', "div":"Camera", "method":"open", "params":' + params + '}';
			}
			nexacro.Device.exec(jsonstr);
			return true;
		}
		else {
			return false;
		}
	};

	_pImagePicker._onsuccess = function (objData) {
		var e = new nexacro.ImagePickerEventInfo("onsuccess", objData.url, objData.imagedata, objData.imagefile);
		this._fire_onsuccess(this, e);
	};

	_pImagePicker._fire_onsuccess = function (objImagePicker, eImagePickerEventInfo) {
		if (this.onsuccess && this.onsuccess._has_handlers) {
			return this.onsuccess._fireEvent(this, eImagePickerEventInfo);
		}
		return true;
	};

	_pImagePicker._onerror = function (objData) {
		var e = new nexacro.ImagePickerErrorEventInfo("onerror", objData.errorcode, objData.errormsg);
		this._fire_onerror(this, e);
	};

	_pImagePicker._fire_onerror = function (objImagePicker, eImagePickerErrorEventInfo) {
		if (this.onerror && this.onerror._has_handlers) {
			return this.onerror._fireEvent(this, eImagePickerErrorEventInfo);
		}
		return true;
	};



	_pImagePicker.paramck_ImagePicker_asyncOpen = function (nQuality, nWidth, nHeight, strEncodingType, strGetType) {
		if (nQuality != null) {
			if (!nexacro.Device.publicNumCheck(nQuality)) {
				return false;
			}
		}

		if (nWidth != null) {
			if (!nexacro.Device.publicNumCheck(nWidth)) {
				return false;
			}
		}

		if (nHeight != null) {
			if (!nexacro.Device.publicNumCheck(nHeight)) {
				return false;
			}
		}

		if (strGetType != null) {
			if (!nexacro.Device.publicNumCheck(strGetType)) {
				return false;
			}
		}

		if (strEncodingType != null) {
			if (typeof (strEncodingType) != "string") {
				return false;
			}
		}
		return true;
	};

	_pImagePicker = null;
}

if (!nexacro.ImagePickerEventInfo) {
	nexacro.ImagePickerEventInfo = function (strEventId, strUrl, strImagedata, strImagefile) {
		this.eventid = strEventId;
		this.imageurl = strUrl;
		this.imagedata = strImagedata;
		this.imagefile = strImagefile;
	};
	var _pImagePickerEventInfo = nexacro.ImagePickerEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.ImagePickerEventInfo);

	_pImagePickerEventInfo._type_name = "ImagePickerEventInfo";

	_pImagePickerEventInfo = null;
}

if (!nexacro.ImagePickerErrorEventInfo) {
	nexacro.ImagePickerErrorEventInfo = function (strEventId, intErrorCode, strErrorMsg) {
		this.eventid = strEventId;
		this.errortype = "ObjectError";
		this.statuscode = intErrorCode;
		this.errormsg = strErrorMsg;
	};
	var _pImagePickerErrorEventInfo = nexacro.ImagePickerErrorEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.ImagePickerErrorEventInfo);

	_pImagePickerErrorEventInfo._type_name = "ImagePickerErrorEventInfo";

	_pImagePickerErrorEventInfo = null;
}


if (!nexacro.AudioRecorder) {
	nexacro.AudioRecorder = function (name, obj) {
		this._obj = obj;
		this._refform = obj;
		this._id = nexacro.Device.makeID();
		nexacro.Device._userCreatedObj[this._id] = this;
		this.name = name || "";

		this.brecording = false;
		this.bpaused = false;
		this.reccurtime = "";

		this.audiofile = "";
		this.samplerate = 8000;
		this.channelconfig = 1;

		if (nexacro.Device.curDevice == 0) {
			this.audioformat = "mp3";
		}
		else {
			this.audioformat = "wav";
		}

		this.enableevent = true;
		this._is_alive = true;

		this._event_list = 
			{
			"onrecord" : 1, 
			"onrecording" : 1, 
			"onstop" : 1, 
			"onerror" : 1
		};

		this.onrecord = null;
		this.onrecording = null;
		this.onstop = null;
		this.onerror = null;

		var params = '""';
		var jsonstr = "";

		jsonstr = '{"id":' + this._id + ', "div":"AudioRecorder", "method":"constructor", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	var _pAudioRecorder = nexacro.AudioRecorder.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.AudioRecorder);

	_pAudioRecorder._type_name = "AudioRecorder";

	_pAudioRecorder.destroy = function () {
		var params = '""';
		var jsonstr;
		this._is_alive = false;

		delete nexacro.Device._userCreatedObj[this._id];

		jsonstr = '{"id":' + this._id + ', "div":"AudioRecorder", "method":"destroy", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);

		return true;
	};

	_pAudioRecorder.on_created = function () {
	};

	_pAudioRecorder._getReferenceContext = function () {
		return this._refform;
	};

	_pAudioRecorder.set_audiofile = function (v) {
		if (typeof (v) == "undefind" || v == null || v == "") {
			return false;
		}
		else {
			this.audiofile = v;
		}
		return true;
	};

	_pAudioRecorder.set_samplerate = function (v) {
		if (typeof (v) == "undefind" || v == null) {
			return false;
		}
		else {
			if (nexacro.Device.publicNumCheck(v)) {
				if (v >= 8000 && v <= 96000) {
					this.samplerate = v;
				}
				else {
					return false;
				}
			}
			else {
				return false;
			}
		}
		return true;
	};

	_pAudioRecorder.set_channelconfig = function (v) {
		if (typeof (v) == "undefind" || v == null) {
			return false;
		}
		else {
			if (v == 1 || v == 2) {
				this.channelconfig = v;
			}
			else {
				return false;
			}
		}
		return true;
	};

	_pAudioRecorder.set_audioformat = function (v) {
		if (typeof (v) == "undefind" || v == null) {
			return false;
		}
		else {
			var dotIndex = v.lastIndexOf(".");
			var extentionStr = v.substring(dotIndex, v.length).toUpperCase();

			if ((nexacro.Device.curDevice == 0)) {
				if (extentionStr == "OGG" || extentionStr == "AMR_NB" || extentionStr == "AMR_WB" || extentionStr == "MP3") {
					this.audioformat = v.toUpperCase();
				}
				else {
					return false;
				}
			}

			if (nexacro.Device.curDevice == 1) {
				if (extentionStr == "WAV") {
					this.audioformat = "WAV";
				}
				else {
					return false;
				}
			}
		}
		return true;
	};

	_pAudioRecorder.recordingStart = function (nIntervalTime) {
		var IntervalTimeState;
		if (typeof (nIntervalTime) == "undefined" || nIntervalTime == null || nIntervalTime == "") {
			return false;
		}
		else {
			if (nexacro.Device.publicNumCheck(nIntervalTime) && nIntervalTime <= 86400000 && nIntervalTime >= 0) {
				if (nIntervalTime < 200) {
					return false;
				}
				else {
					IntervalTimeState = 0;
				}
			}
			else {
				return false;
			}
		}

		if (this.brecording == true) {
			nexacro.OnceCallbackTimer.callonce(this, function () {
				var e = new nexacro.AudioErrorEventInfo("onerror", this.audiofile, this.reccurtime, "1301", "Already recording");
				this._fire_onerror(this, e);
			}, 20);
			return false;
		}

		if (this.audiofile == "" || typeof (this.audiofile) == "undefined") {
			var arobj = this;
			nexacro.OnceCallbackTimer.callonce(this, function () {
				var e = new nexacro.AudioErrorEventInfo("onerror", this.audiofile, this.reccurtime, "1304", "Recording Setting Error");
				this._fire_onerror(this, e);
			}, 20);

			return false;
		}

		if (nexacro.Device.curDevice == 0) {
			var EnvironmentPath = "";
			var androidFilePath = "";
			var rootPathCheck = this.audiofile.substring(0, 9);

			if (rootPathCheck.toLowerCase() == "%userapp%") {
				EnvironmentPath = 1;
				androidFilePath = this.audiofile.substring(9, this.audiofile.length);
			}
			else if (rootPathCheck.toLowerCase() == "%sd_card%") {
				EnvironmentPath = 2;
				androidFilePath = this.audiofile.substring(9, this.audiofile.length);
			}
			else {
				nexacro.OnceCallbackTimer.callonce(this, function () {
					var e = new nexacro.AudioErrorEventInfo("onerror", this.audiofile, this.reccurtime, "1304", "Recording Setting Error");
					this._fire_onerror(this, e);
				}, 20);

				return false;
			}

			var params = '{  "audiofile":"' + androidFilePath;
			params += '", "samplerate":"' + this.samplerate;
			params += '", "channelconfig":"' + this.channelconfig;
			params += '", "audioFormat":"' + this.audioformat;
			params += '", "EnvironmentPath":"' + EnvironmentPath;
			params += '", playingeventtime:"' + nIntervalTime;
			params += '", intervaltimestate:"' + IntervalTimeState;
			params += '"}';

			var jsonstr = "";
			jsonstr = '{"id":' + this._id + ', "div":"AudioRecorder", "method":"recordingStart", "params":' + params + '}';
		}
		else {
			var iPhoneFilePath = "";
			var rootPathCheck = this.audiofile.substring(0, 9);

			if (rootPathCheck.toLowerCase() == "%userapp%") {
				iPhoneFilePath = "_userapp_" + this.audiofile.substring(9, this.audiofile.length);
			}
			else {
				nexacro.OnceCallbackTimer.callonce(this, function () {
					var e = new nexacro.AudioErrorEventInfo("onerror", this.audiofile, this.reccurtime, "1304", "Recording Setting Error");
					this._fire_onerror(this, e);
				}, 20);
				return false;
			}

			var params = '{ "audiofile":"' + iPhoneFilePath;
			params += '", "samplerate":"' + this.samplerate;
			params += '", "channelconfig":"' + this.channelconfig;
			params += '", "audioFormat":"' + this.audioformat;
			params += '", "playingeventtime":"' + nIntervalTime;
			params += '", "intervaltimestate":"' + IntervalTimeState;
			params += '"}';

			var jsonstr = "";
			jsonstr = '{"id":' + this._id + ', "div":"Sound", "method":"recordingStart", "params":' + params + '}';
		}

		nexacro.Device.exec(jsonstr);

		return true;
	};

	_pAudioRecorder.recordingStop = function () {
		if (this.brecording == false) {
			nexacro.OnceCallbackTimer.callonce(this, function () {
				var e = new nexacro.AudioErrorEventInfo("onerror", "", "0", "1302", "Not recording");
				this._fire_onerror(this, e);
			}, 20);
			return;
		}
		var params = '""';
		var jsonstr = "";

		if (nexacro.Device.curDevice == 0) {
			jsonstr = '{"id":' + this._id + ', "div":"AudioRecorder", "method":"recordingStop", "params":' + params + '}';
		}
		else {
			jsonstr = '{"id":' + this._id + ', "div":"Sound", "method":"recordingStop", "params":' + params + '}';
		}

		nexacro.Device.exec(jsonstr);
	};

	_pAudioRecorder.pause = function () {
		if (nexacro.Device.curDevice == 0) {
			return;
		}
		if (this.brecording == false) {
			nexacro.OnceCallbackTimer.callonce(this, function () {
				var e = new nexacro.AudioErrorEventInfo("onerror", "", "0", "1302", "Not recording");
				this._fire_onerror(this, e);
			}, 20);

			return;
		}
		if (this.bpaused == true) {
			nexacro.OnceCallbackTimer.callonce(this, function () {
				var e = new nexacro.AudioErrorEventInfo("onerror", this.audiofile, this.reccurtime, "1303", "Already paused");
				this._fire_onerror(this, e);
			}, 20);

			return;
		}
		var params = '""';
		var jsonstr = "";

		jsonstr = '{"id":' + this._id + ', "div":"Sound", "method":"recpause", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	_pAudioRecorder.resume = function () {
		if (nexacro.Device.curDevice == 0) {
			return;
		}
		if (this.brecording == false) {
			nexacro.OnceCallbackTimer.callonce(this, function () {
				var e = new nexacro.AudioErrorEventInfo("onerror", "", "0", "1302", "Not recording");
				this._fire_onerror(this, e);
			}, 20);

			return;
		}
		if (this.bpaused == false) {
			nexacro.OnceCallbackTimer.callonce(this, function () {
				var e = new nexacro.AudioErrorEventInfo("onerror", this.audiofile, this.reccurtime, "1011", "Not paused");
				this._fire_onerror(this, e);
			}, 20);

			return;
		}

		var params = '""';
		var jsonstr = "";

		jsonstr = '{"id":' + this._id + ', "div":"Sound", "method":"recresume", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	_pAudioRecorder._onrecord = function (objData) {
		this.brecording = true;
		this.bpaused = false;
	};

	_pAudioRecorder._fire_onrecord = function (objAudioPlayer, eAudioEventInfo) {
		if (this.onrecord && this.onrecord._has_handlers) {
			return this.onrecord._fireEvent(this, eAudioEventInfo);
		}
		return true;
	};

	_pAudioRecorder._onrecording = function (objData) {
		this.brecording = true;
		this.bpaused = false;
		this.reccurtime = objData.curtime;
		var e = new nexacro.AudioEventInfo("onrecording", objData.reason, objData.url, objData.playtime, objData.curtime, null, null, null);
		this._fire_onrecording(this, e);
	};

	_pAudioRecorder._fire_onrecording = function (objAudioPlayer, eAudioEventInfo) {
		if (this.onrecording && this.onrecording._has_handlers) {
			return this.onrecording._fireEvent(this, eAudioEventInfo);
		}
		return true;
	};

	_pAudioRecorder._onstop = function (objData) {
		if (objData.reason == "5") {
			this.brecording = false;
			this.bpaused = false;
		}
		else if (objData.reason == "6") {
			this.brecording = true;
			this.bpaused = true;
		}
		var e = new nexacro.AudioEventInfo("onstop", objData.reason, objData.url, objData.playtime, objData.curtime, null, null, null);
		this._fire_onstop(this, e);
	};

	_pAudioRecorder._fire_onstop = function (objAudioPlayer, eAudioEventInfo) {
		if (this.onstop && this.onstop._has_handlers) {
			return this.onstop._fireEvent(this, eAudioEventInfo);
		}
		return true;
	};

	_pAudioRecorder._onerror = function (objData) {
		var e = new nexacro.AudioErrorEventInfo("onerror", objData.url, objData.curtime, objData.errorcode, objData.errormsg);
		this._fire_onerror(this, e);
	};

	_pAudioRecorder._fire_onerror = function (objAudioRecoder, AudioErrorEventInfo) {
		if (this.onerror && this.onerror._has_handlers) {
			return this.onerror._fireEvent(this, AudioErrorEventInfo);
		}
		return true;
	};

	_pAudioRecorder = null;
}


if (!nexacro.ContactSet) {
	nexacro.ContactSet = function (name, obj) {
		this._id = nexacro.Device.makeID();
		nexacro.Device._userCreatedObj[this._id] = this;
		this.name = name || "";

		this.isRunning = false;
		this.enableevent = true;

		this._event_list = 
			{
			"onsuccess" : 1, 
			"onerror" : 1
		};

		this.onsuccess = null;
		this.onerror = null;

		var params = '""';
		var jsonstr = '{"id":' + this._id + ', "div":"ContactSet", "method":"constructor", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	var _pContactSet = nexacro.ContactSet.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.ContactSet);

	_pContactSet._type_name = "ContactSet";

	_pContactSet.destroy = function () {
		var params = '""';
		var jsonstr;

		delete nexacro.Device._userCreatedObj[this._id];
		jsonstr = '{"id":' + this._id + ', "div":"ContactSet", "method":"destroy", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
		return true;
	};

	_pContactSet.on_created = function () {
	};



	_pContactSet.query = function (strQueryInfo, nResultCnt) {
		if (typeof (strQueryInfo) == "undefined" || strQueryInfo == "") {
			return false;
		}

		if (!(nexacro.Device.pramck_contactString(strQueryInfo))) {
			return false;
		}

		if (nResultCnt == null || typeof (nResultCnt) == "undefined") {
			nResultCnt = -1;
		}
		else {
			try {
				var numberss = Number(nResultCnt.toString());
			}
			catch (e) {
				return false;
			}

			if ((+numberss) != (+numberss)) {
				return false;
			}

			if (nResultCnt == 0 || nResultCnt < -1) {
				return false;
			}
		}

		var arr = strQueryInfo.split(";");

		if (arr.length < 1) {
			return false;
		}

		for (var i = 0; i < arr.length; i++) {
			var arr2 = arr[i].split(":");
			if (arr2.length < 2) {
				return false;
			}
			else {
				var strKeyword = arr2[0].toLowerCase();
				if (arr.length == 1) {
					if (!(strKeyword == "all" || strKeyword == "uniqueid" || strKeyword == "categories" || strKeyword == "birthday" || strKeyword == "contactname" || strKeyword == "nickname" || strKeyword == "note" || strKeyword == "phonenumbers" || strKeyword == "emails" || strKeyword == "ims" || strKeyword == "urls" || strKeyword == "addresses" || strKeyword == "organizations")) {
						return false;
					}
				}
				else {
					if (!(strKeyword == "uniqueid" || strKeyword == "categories" || strKeyword == "birthday" || strKeyword == "contactname" || strKeyword == "nickname" || strKeyword == "note" || strKeyword == "phonenumbers" || strKeyword == "emails" || strKeyword == "ims" || strKeyword == "urls" || strKeyword == "addresses" || strKeyword == "organizations")) {
						return false;
					}
				}
			}

			if (arr2[1].split(" ").join("").length == 0) {
				return false;
			}
		}

		if (nexacro.Device.curDevice == 1) {
			strQueryInfo = strQueryInfo.replace(/\?/g, "_QUESTION_");
		}


		var params = '{ "strQueryInfo":"' + strQueryInfo;
		params += '", "nResultCnt":"' + nResultCnt;
		params += '"}';

		var jsonstr = '{"id":' + this._id + ', "div":"ContactSet", "method":"query", "params":' + params + '}';

		if (this.isRunning) {
			return false;
		}

		this.isRunning = true;

		nexacro.Device.exec(jsonstr);
		return true;
	};

	_pContactSet.append = function (objContact) {
		if (!(objContact instanceof nexacro.Contact)) {
			return false;
		}

		if (this.typeCheck(objContact) == false) {
			return false;
		}

		var params = objContact.toJson();
		var jsonstr = '{"id":' + this._id + ', "div":"ContactSet", "method":"append", "params":' + params + '}';

		if (this.isRunning) {
			return false;
		}

		this.isRunning = true;
		nexacro.Device.exec(jsonstr);
		return true;
	};

	_pContactSet.update = function (objContact) {
		if (!(objContact instanceof nexacro.Contact)) {
			return false;
		}

		if (this.typeCheck(objContact) == false) {
			return false;
		}

		var params = objContact.toJson();
		var jsonstr = '{"id":' + this._id + ', "div":"ContactSet", "method":"update", "params":' + params + '}';

		if (this.isRunning) {
			return false;
		}

		this.isRunning = true;
		nexacro.Device.exec(jsonstr);
		return true;
	};

	_pContactSet.remove = function (strUniqueID) {
		if (typeof (strUniqueID) == "undefined") {
			return false;
		}

		if (strUniqueID != null) {
			if (((+strUniqueID) != (+strUniqueID)) || strUniqueID < 0) {
				return false;
			}
		}

		var params = '{ "strUniqueID":"' + strUniqueID;
		params += '"}';
		var jsonstr = '{"id":' + this._id + ', "div":"ContactSet", "method":"remove", "params":' + params + '}';

		if (this.isRunning) {
			return false;
		}

		this.isRunning = true;
		nexacro.Device.exec(jsonstr);
		return true;
	};

	_pContactSet._onsuccess = function (objData) {
		this.isRunning = false;
		if (nexacro.Device.curDevice == 0) {
			var reason = "";
			var uniqueid = "";
			var displayname = "";
			var familyname = "";
			var givenname = "";
			var middlename = "";
			var prefix = "";
			var suffix = "";
			var nickname = "";
			var birthday = "";
			var note = "";
			var phones = "";
			var emails = "";
			var ims = "";
			var categories = "";
			var urls = "";
			var address = "";
			var organ = "";
			var photo = "";
			var arr = new Array();

			for (var i = 0; i < objData.length; i++) {
				if (typeof (objData[i].contacts) != "undefined") {
					if (typeof (objData[i].contacts.uniqueid) != "undefined") {
						uniqueid = objData[i].contacts.uniqueid;
					}

					if (typeof (objData[i].contacts.contactname) != "undefined") {
						if (typeof (objData[i].contacts.contactname.displayname) != "undefined") {
							displayname = objData[i].contacts.contactname.displayname;
						}

						if (typeof (objData[i].contacts.contactname.familyname) != "undefined") {
							familyname = objData[i].contacts.contactname.familyname;
						}

						if (typeof (objData[i].contacts.contactname.givenname) != "undefined") {
							givenname = objData[i].contacts.contactname.givenname;
						}

						if (typeof (objData[i].contacts.contactname.middlename) != "undefined") {
							middlename = objData[i].contacts.contactname.middlename;
						}

						if (typeof (objData[i].contacts.contactname.prefix) != "undefined") {
							prefix = objData[i].contacts.contactname.prefix;
						}

						if (typeof (objData[i].contacts.contactname.suffix) != "undefined") {
							suffix = objData[i].contacts.contactname.suffix;
						}
					}

					if (typeof (objData[i].contacts.nickname) != "undefined") {
						nickname = objData[i].contacts.nickname;
					}

					if (typeof (objData[i].contacts.birthday) != "undefined") {
						birthday = new Date(objData[i].contacts.birthday);
					}

					if (typeof (objData[i].contacts.note) != "undefined") {
						note = objData[i].contacts.note;
					}

					if (typeof (objData[i].contacts.phonenumbers) != "undefined") {
						phones = new Array(objData[i].contacts.phonenumbers.length);
						for (var j = 0; j < objData[i].contacts.phonenumbers.length; j++) {
							var tmpPhone = new nexacro.ContactField("", objData[i].contacts.phonenumbers[j].type, objData[i].contacts.phonenumbers[j].value, objData[i].contacts.phonenumbers[j].label, "");
							phones[j] = tmpPhone;
						}
					}
					else {
						phones = new nexacro.ContactField("", "", "", "", "");
					}

					if (typeof (objData[i].contacts.emails) != "undefined") {
						emails = new Array(objData[i].contacts.emails.length);
						for (var j = 0; j < objData[i].contacts.emails.length; j++) {
							var tmpEmails = new nexacro.ContactField("", objData[i].contacts.emails[j].type, objData[i].contacts.emails[j].value, objData[i].contacts.emails[j].label, "");
							emails[j] = tmpEmails;
						}
					}
					else {
						emails = new nexacro.ContactField("", "", "", "", "");
					}

					if (typeof (objData[i].contacts.ims) != "undefined") {
						ims = new Array(objData[i].contacts.ims.length);
						for (var j = 0; j < objData[i].contacts.ims.length; j++) {
							var tempIms = new nexacro.ContactIM("", objData[i].contacts.ims[j].type, objData[i].contacts.ims[j].value, objData[i].contacts.ims[j].label, objData[i].contacts.ims[j].protocoltype, objData[i].contacts.ims[j].protocollabel, "");
							ims[j] = tempIms;
						}
					}
					else {
						ims = new nexacro.ContactIM("", "", "", "", "", "", "");
					}

					if (typeof (objData[i].contacts.categories) != "undefined") {
						categories = new Array(objData[i].contacts.categories.length);
						for (var j = 0; j < objData[i].contacts.categories.length; j++) {
							var tmpCategories = new nexacro.ContactField("", objData[i].contacts.categories[j].type, objData[i].contacts.categories[j].value, objData[i].contacts.categories[j].label, "");
							categories[j] = tmpCategories;
						}
					}
					else {
						categories = new nexacro.ContactField("", "", "", "", "");
					}

					if (typeof (objData[i].contacts.urls) != "undefined") {
						urls = new Array(objData[i].contacts.urls.length);
						for (var j = 0; j < objData[i].contacts.urls.length; j++) {
							var tmpUrls = new nexacro.ContactField("", objData[i].contacts.urls[j].type, objData[i].contacts.urls[j].value, objData[i].contacts.urls[j].label, "");
							urls[j] = tmpUrls;
						}
					}
					else {
						urls = new nexacro.ContactField("", "", "", "", "");
					}

					if (typeof (objData[i].contacts.addresses) != "undefined") {
						address = new Array(objData[i].contacts.addresses.length);
						for (var j = 0; j < objData[i].contacts.addresses.length; j++) {
							var tmpAddress = new nexacro.ContactAddress("", objData[i].contacts.addresses[j].type, objData[i].contacts.addresses[j].country, objData[i].contacts.addresses[j].postcode, objData[i].contacts.addresses[j].city, objData[i].contacts.addresses[j].region, objData[i].contacts.addresses[j].street, objData[i].contacts.addresses[j].label, "");
							address[j] = tmpAddress;
						}
					}
					else {
						address = new nexacro.ContactAddress("", "", "", "", "", "", "", "", "");
					}

					if (typeof (objData[i].contacts.organizations) != "undefined") {
						organ = new Array(objData[i].contacts.organizations.length);
						for (var j = 0; j < objData[i].contacts.organizations.length; j++) {
							var tmpOrgan = new nexacro.ContactOrganization("", objData[i].contacts.organizations[j].type, objData[i].contacts.organizations[j].company, objData[i].contacts.organizations[j].department, objData[i].contacts.organizations[j].title, objData[i].contacts.organizations[j].label, "");
							organ[j] = tmpOrgan;
						}
					}
					else {
						organ = new nexacro.ContactOrganization("", "", "", "", "", "", "");
					}

					if (typeof (objData[i].contacts.photos) != "undefined") {
						photo = new Array(objData[i].contacts.photos.length);
						for (var j = 0; j < objData[i].contacts.photos.length; j++) {
							var tmpPhoto = new nexacro.ContactPhoto("", objData[i].contacts.photos[j].imagedata, objData[i].contacts.photos[j].label, "");
							photo[j] = tmpPhoto;
						}
					}
					else {
						photo = new nexacro.ContactPhoto("", "", "", "");
					}

					var temp = new nexacro.Contact("", uniqueid, displayname, familyname, givenname, middlename, prefix, suffix, nickname, birthday, note, phones, emails, ims, categories, urls, address, organ, photo, "");

					arr[i] = temp;
				}

				if (nexacro.Device.curDevice == 0) {
					reason = objData[i].reason;
				}
				else {
					reason = objData.reason;
				}
			}

			var e = new nexacro.ContactSetEventInfo("onsuccess", reason, arr);
		}
		else {
			objData.contacts = this.makeContacts(objData.contacts);
			var e = new nexacro.ContactSetEventInfo("onsuccess", objData.reason, objData.contacts);
		}

		this._fire_onsuccess(this, e);
	};

	_pContactSet._fire_onsuccess = function (objContactSet, eContactSetEventInfo) {
		if (this.onsuccess && this.onsuccess._has_handlers) {
			return this.onsuccess._fireEvent(this, eContactSetEventInfo);
		}
		return true;
	};

	_pContactSet._onerror = function (objData) {
		this.isRunning = false;
		var e = new nexacro.ContactSetErrorEventInfo("onerror", objData.errorcode, objData.errormsg);
		this._fire_onerror(this, e);
	};

	_pContactSet._fire_onerror = function (objContactSet, eContactSetErrorEventInfo) {
		if (this.onerror && this.onerror._has_handlers) {
			return this.onerror._fireEvent(this, eContactSetErrorEventInfo);
		}
		return true;
	};

	_pContactSet.makeContacts = function (objData) {
		var str = objData;

		var str2 = eval("(" + str + ")");
		var persons = new Array();
		persons = str2.contact;

		var contactObjList = new Array();
		for (var k = 0; k < persons.length; k++) {
			var person = persons[k];
			var phoneObjList = new Array();
			var phonenumList = person.phonenumbers;
			for (var i = 0; i < phonenumList.length; i++) {
				var phonenum = new nexacro.ContactField("", phonenumList[i].type, phonenumList[i].value.replace(new RegExp("_NEWLINE_", "gi"), "\n"), phonenumList[i].label, "");
				phoneObjList[i] = phonenum;
			}

			var categoriObjList = new Array();
			var categoriList = person.categories;
			for (var i = 0; i < categoriList.length; i++) {
				var tempVal = new nexacro.ContactField("", categoriList[i].type, categoriList[i].value.replace(new RegExp("_NEWLINE_", "gi"), "\n"), categoriList[i].label, "");
				categoriObjList[i] = tempVal;
			}

			var photoObjList = new Array();
			var photoList = person.photos;
			for (var i = 0; i < photoList.length; i++) {
				var tempVal = new nexacro.ContactPhoto("", photoList[i].imagedata, photoList[i].label, "");
				photoObjList[i] = tempVal;
			}

			var organizationObjList = new Array();
			var organizationList = person.organizations;
			for (var i = 0; i < organizationList.length; i++) {
				var tempVal = new nexacro.ContactOrganization("", organizationList[i].type, organizationList[i].company, organizationList[i].department, organizationList[i].title, organizationList[i].label, "");
				organizationObjList[i] = tempVal;
			}

			var addressObjList = new Array();
			var addressList = person.addresses;
			for (var i = 0; i < addressList.length; i++) {
				var tempVal = new nexacro.ContactAddress("", addressList[i].type, addressList[i].country.replace(new RegExp("_NEWLINE_", "gi"), "\n"), addressList[i].postcode.replace(new RegExp("_NEWLINE_", "gi"), "\n"), addressList[i].city.replace(new RegExp("_NEWLINE_", "gi"), "\n"), addressList[i].region.replace(new RegExp("_NEWLINE_", "gi"), "\n"), addressList[i].street.replace(new RegExp("_NEWLINE_", "gi"), "\n"), addressList[i].label, "");
				addressObjList[i] = tempVal;
			}

			var urlsObjList = new Array();
			var urlsList = person.urls;
			for (var i = 0; i < urlsList.length; i++) {
				var tempVal = new nexacro.ContactField("", urlsList[i].type, urlsList[i].value.replace(new RegExp("_NEWLINE_", "gi"), "\n"), urlsList[i].label, "");
				urlsObjList[i] = tempVal;
			}

			var imsObjList = new Array();
			var imsList = person.ims;
			for (var i = 0; i < imsList.length; i++) {
				var tempVal = new nexacro.ContactIM("", imsList[i].type, imsList[i].value.replace(new RegExp("_NEWLINE_", "gi"), "\n"), imsList[i].label, imsList[i].ptype, imsList[i].plabel, "");
				imsObjList[i] = tempVal;
			}

			var emailsObjList = new Array();
			var emailsList = person.emails;
			for (var i = 0; i < emailsList.length; i++) {
				var tempVal = new nexacro.ContactField("", emailsList[i].type, emailsList[i].value.replace(new RegExp("_NEWLINE_", "gi"), "\n"), emailsList[i].label, "");
				emailsObjList[i] = tempVal;
			}

			if (typeof (person.note) != "undefined") {
				person.note = person.note.replace(new RegExp("&#32;", "gi"), " ");
				person.note = person.note.replace(new RegExp("_NEWLINE_", "gi"), "\n");
			}
			contactObjList[k] = new nexacro.Contact("", person.uniqueid, person.contactname.displayname, person.contactname.familyname, person.contactname.givenname, person.contactname.middlename, person.contactname.prefix, person.contactname.suffix, person.nickname, nexacro.Device.isConvertDateToString(person.birthday), person.note, phoneObjList, emailsObjList, imsObjList, categoriObjList, urlsObjList, addressObjList, organizationObjList, photoObjList, "");
		}
		return contactObjList;
	};

	_pContactSet.typeCheck = function (obj) {
		if (typeof (obj) == "undefined") {
			return false;
		}

		if (typeof (obj.phonenumbers) != "undefined") {
			if ((obj.phonenumbers.length) > 0) {
				for (var i = 0; i < obj.phonenumbers.length; i++) {
					var num = obj.phonenumbers[i].type * 1;
					if (num < 0 && num > 12) {
						return false;
					}

					var str = obj.phonenumbers[i].type + "";
					if (nexacro.Device.curDevice == 0) {
						if (!(str == "0" || str == "1" || str == "2" || str == "3" || str == "4" || str == "6" || str == "7" || str == "9" || str == "10")) {
							return false;
						}
					}
					else {
						if (str == "1") {
							return false;
						}
					}
				}
			}
		}

		if (typeof (obj.emails) != "undefined") {
			if ((obj.emails.length) > 0) {
				for (var i = 0; i < obj.emails.length; i++) {
					var num = obj.emails[i].type * 1;
					if (num < 0 && num > 12) {
						return false;
					}

					var str = obj.emails[i].type + "";
					if (nexacro.Device.curDevice == 0) {
						if (!(str == "0" || str == "4" || str == "6" || str == "7" || str == "10")) {
							return false;
						}
					}
					else {
						if (str == "1") {
							return false;
						}
					}
				}
			}
		}

		if (typeof (obj.categories) != "undefined") {
			if ((obj.categories.length) > 0) {
				for (var i = 0; i < obj.categories.length; i++) {
					var num = obj.categories[i].type * 1;
					if (num < 0 && num > 12) {
						return false;
					}
					var str = obj.categories[i].type + "";
					if (str != "0") {
						return false;
					}
				}
			}
		}

		if (typeof (obj.urls) != "undefined") {
			if ((obj.urls.length) > 0) {
				for (var i = 0; i < obj.urls.length; i++) {
					var num = obj.urls[i].type * 1;
					if (num < 0 && num > 12) {
						return false;
					}

					var str = obj.urls[i].type + "";
					if (nexacro.Device.curDevice == 0) {
						if (str != "12") {
							return false;
						}
					}
					else {
						if (str == "1") {
							return false;
						}
					}
				}
			}
		}

		if (typeof (obj.ims) != "undefined") {
			if ((obj.ims.length) > 0) {
				for (var i = 0; i < obj.ims.length; i++) {
					var num = obj.ims[i].type * 1;
					if (num < 0 && num > 12) {
						return false;
					}
					var str = obj.ims[i].type + "";
					if (nexacro.Device.curDevice == 0) {
						if (str != "7") {
							return false;
						}

						var str2 = obj.ims[i].protocoltype + "";
						if (!(str2 == "0" || str2 == "1" || str2 == "2" || str2 == "3" || str2 == "4" || str2 == "5" || str2 == "6" || str2 == "7" || str2 == "8")) {
							return false;
						}
					}
					else {
						if (str == "1") {
							return false;
						}
					}
				}
			}
		}

		if (typeof (obj.addresses) != "undefined") {
			if ((obj.addresses.length) > 0) {
				for (var i = 0; i < obj.addresses.length; i++) {
					var num = obj.addresses[i].type * 1;
					if (num < 0 && num > 12) {
						return false;
					}
					var str = obj.addresses[i].type + "";
					if (nexacro.Device.curDevice == 0) {
						if (!(str == "0" || str == "4" || str == "7" || str == "10")) {
							return false;
						}
					}
					else {
						if (str == "1") {
							return false;
						}
					}
				}
			}
		}

		if (typeof (obj.organizations) != "undefined") {
			if ((obj.organizations.length) > 0) {
				for (var i = 0; i < obj.organizations.length; i++) {
					var num = obj.organizations[i].type * 1;
					if (num < 0 && num > 12) {
						return false;
					}

					var str = obj.organizations[i].type + "";
					if (nexacro.Device.curDevice == 0) {
						if (!(str == "0" || str == "7" || str == "10")) {
							return false;
						}
					}
					else {
						if (str != "10") {
							return false;
						}
					}
				}
			}
		}

		return true;
	};

	_pContactSet = null;
}

if (!nexacro.ContactSetEventInfo) {
	nexacro.ContactSetEventInfo = function (strEventId, strReason, arrContacts) {
		this.eventid = strEventId;
		this.reason = strReason;
		this.contacts = arrContacts;
	};
	var _pContactSetEventInfo = nexacro.ContactSetEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.ContactSetEventInfo);

	_pContactSetEventInfo._type_name = "ContactSetEventInfo";

	_pContactSetEventInfo = null;
}

if (!nexacro.ContactSetErrorEventInfo) {
	nexacro.ContactSetErrorEventInfo = function (strEventId, intErrorCode, strErrorMsg) {
		this.eventid = strEventId;
		this.errortype = "ObjectError";
		this.statuscode = intErrorCode;
		this.errormsg = strErrorMsg;
	};
	var _pContactSetErrorEventInfo = nexacro.ContactSetErrorEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.ContactSetErrorEventInfo);

	_pContactSetErrorEventInfo._type_name = "ContactSetErrorEventInfo";

	_pContactSetErrorEventInfo = null;
}

if (!nexacro.Contact) {
	nexacro.Contact = function (name, strUniqueid, strDisplayname, strFamilyname, strGivenname, strMiddlename, strPrefix, strSuffix, strNickname, dtBirthday, strNote, arrPhonenumbers, arrEmails, arrIms, arrCategories, arrUrls, arrAddresses, arrOrganizations, arrPhotos, obj) {
		this.enableevent = true;
		if (arguments.length == 2) {
			this._id = nexacro.Device.makeID();
			nexacro.Device._userCreatedObj[this._id] = this;
			this.name = name || "";

			this.uniqueid = "";
			this.contactname = {
				displayname : ""
, 
				familyname : ""
, 
				givenname : ""
, 
				middlename : ""
, 
				prefix : ""
, 
				suffix : ""
, 
				set_displayname : function () {
				}, 
				set_familyname : function (val) {
					this["familyname"] = val;
				}, 
				set_givenname : function (val) {
					this["givenname"] = val;
				}, 
				set_middlename : function (val) {
					this["middlename"] = val;
				}, 
				set_prefix : function (val) {
					this["prefix"] = val;
				}, 
				set_suffix : function (val) {
					this["suffix"] = val;
				}
			};
			this.nickname = "";
			this.birthday = "";
			this.note = "";
			this.phonenumbers = "";
			this.emails = "";
			this.ims = "";
			this.categories = "";
			this.urls = "";
			this.addresses = "";
			this.organizations = "";
			this.photos = "";
		}
		else {
			this.uniqueid = strUniqueid || "";
			this.contactname = {
				displayname : (strDisplayname || "")
, 
				familyname : (strFamilyname || "")
, 
				givenname : (strGivenname || "")
, 
				middlename : (strMiddlename || "")
, 
				prefix : (strPrefix || "")
, 
				suffix : (strSuffix || "")
, 
				set_displayname : function () {
				}, 
				set_familyname : function (val) {
					this["familyname"] = val;
				}, 
				set_givenname : function (val) {
					this["givenname"] = val;
				}, 
				set_middlename : function (val) {
					this["middlename"] = val;
				}, 
				set_prefix : function (val) {
					this["prefix"] = val;
				}, 
				set_suffix : function (val) {
					this["suffix"] = val;
				}
			};
			this.nickname = (strNickname || "");
			this.birthday = (dtBirthday || "");
			if (typeof (strNote) != "undefined" && strNote != "") {
				strNote = strNote.replace(/&#10;/g, "\n");
			}
			this.note = (strNote || "");
			this.phonenumbers = (arrPhonenumbers || "");
			this.emails = (arrEmails || "");
			this.ims = (arrIms || "");
			this.categories = (arrCategories || "");
			this.urls = (arrUrls || "");
			this.addresses = (arrAddresses || "");
			this.organizations = (arrOrganizations || "");
			this.photos = (arrPhotos || "");
		}
	};

	nexacro.Contact.TYPE_CUSTOM = 0;
	nexacro.Contact.TYPE_CALLBACK = 1;
	nexacro.Contact.TYPE_FAX_HOME = 2;
	nexacro.Contact.TYPE_FAX_WORK = 3;
	nexacro.Contact.TYPE_HOME = 4;
	nexacro.Contact.TYPE_MAIN = 5;
	nexacro.Contact.TYPE_MOBILE = 6;
	nexacro.Contact.TYPE_OTHER = 7;
	nexacro.Contact.TYPE_OTHER_FAX = 8;
	nexacro.Contact.TYPE_PAGER = 9;
	nexacro.Contact.TYPE_WORK = 10;
	nexacro.Contact.TYPE_IPHONE = 11;
	nexacro.Contact.TYPE_HOMEPAGE = 12;

	nexacro.Contact.PTYPE_CUSTOM = 0;
	nexacro.Contact.PTYPE_AIM = 1;
	nexacro.Contact.PTYPE_MSN = 2;
	nexacro.Contact.PTYPE_YAHOO = 3;
	nexacro.Contact.PTYPE_SKYPE = 4;
	nexacro.Contact.PTYPE_QQ = 5;
	nexacro.Contact.PTYPE_GOOGLE_TALK = 6;
	nexacro.Contact.PTYPE_ICQ = 7;
	nexacro.Contact.PTYPE_JABBER = 8;
	nexacro.Contact.PTYPE_NETMEETING = 9;
	nexacro.Contact.PTYPE_FACEBOOK = 10;
	nexacro.Contact.PTYPE_GADUGADU = 11;

	var _pContact = nexacro.Contact.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.Contact);

	_pContact._type_name = "Contact";

	_pContact.on_created = function () {
	};

	_pContact.set_uniqueid = function (v) {
		if (nexacro.Device.pramck_contactString(v) == true) {
			this.uniqueid = v;
			return true;
		}
		return false;
	};

	_pContact.set_displayname = function (v) {
	};

	_pContact.set_familyname = function (v) {
		if (nexacro.Device.pramck_contactString(v) == true) {
			this.contactname.familyname = v;
			return true;
		}
		return false;
	};

	_pContact.set_givenname = function (v) {
		if (nexacro.Device.pramck_contactString(v) == true) {
			this.contactname.givenname = v;
			return true;
		}
		return false;
	};

	_pContact.set_middlename = function (v) {
		if (nexacro.Device.pramck_contactString(v) == true) {
			this.contactname.middlename = v;
			return true;
		}
		return false;
	};

	_pContact.set_prefix = function (v) {
		if (nexacro.Device.pramck_contactString(v) == true) {
			this.contactname.prefix = v;
			return true;
		}
		return false;
	};

	_pContact.set_suffix = function (v) {
		if (nexacro.Device.pramck_contactString(v) == true) {
			this.contactname.suffix = v;
			return true;
		}
		return false;
	};

	_pContact.set_nickname = function (v) {
		if (nexacro.Device.pramck_contactString(v) == true) {
			this.nickname = v;
			return true;
		}
		return false;
	};

	_pContact.set_note = function (v) {
		if (nexacro.Device.pramck_contactString(v) == true) {
			this.note = v;
			return true;
		}
		return false;
	};

	_pContact.set_birthday = function (v) {
		if (this.isValidDate(v) == true) {
			this.birthday = v;
			return true;
		}
		return false;
	};

	_pContact.set_phonenumbers = function (v) {
		if (this.pramk_ContactFieldArray(v) == true) {
			this.phonenumbers = v;
			return true;
		}
		return false;
	};

	_pContact.set_emails = function (v) {
		if (this.pramk_ContactFieldArray(v) == true) {
			this.emails = v;
			return true;
		}
		return false;
	};

	_pContact.set_ims = function (v) {
		if (this.pramk_ContactIMArray(v) == true) {
			this.ims = v;
			return true;
		}
		return false;
	};

	_pContact.set_categories = function (v) {
		if (this.pramk_ContactFieldArray(v) == true) {
			this.categories = v;
			return true;
		}
		return false;
	};

	_pContact.set_urls = function (v) {
		if (this.pramk_ContactFieldArray(v) == true) {
			this.urls = v;
			return true;
		}
		return false;
	};

	_pContact.set_addresses = function (v) {
		if (this.pramk_ContactAddressArray(v) == true) {
			this.addresses = v;
			return true;
		}
		return false;
	};

	_pContact.set_organizations = function (v) {
		if (this.pramk_ContactOrganizationArray(v) == true) {
			this.organizations = v;
			return true;
		}
		return false;
	};

	_pContact.set_photos = function (v) {
		if (this.pramk_ContactPhotoArray(v) == true) {
			this.photos = v;
			return true;
		}
		return false;
	};

	_pContact.pramk_ContactFieldArray = function (argContactFieldArr) {
		if (Object.prototype.toString.call(argContactFieldArr) === "[object Array]" || argContactFieldArr == "") {
			for (var i = 0; i < argContactFieldArr.length; i++) {
				if (!(nexacro.Device.pramck_contactString(argContactFieldArr[i].type) && 
					nexacro.Device.pramck_contactString(argContactFieldArr[i].value) && 
					nexacro.Device.pramck_contactString(argContactFieldArr[i].label))) {
					return false;
				}
			}
			return true;
		}
		return false;
	};

	_pContact.pramk_ContactIMArray = function (argContactIMArr) {
		if (Object.prototype.toString.call(argContactIMArr) === "[object Array]" || argContactIMArr == "") {
			for (var i = 0; i < argContactIMArr.length; i++) {
				if (!(nexacro.Device.pramck_contactString(argContactIMArr[i].type) && 
					nexacro.Device.pramck_contactString(argContactIMArr[i].label) && 
					nexacro.Device.pramck_contactString(argContactIMArr[i].value) && 
					nexacro.Device.pramck_contactString(argContactIMArr[i].protocoltype) && 
					nexacro.Device.pramck_contactString(argContactIMArr[i].protocollabel))) {
					return false;
				}
			}
			return true;
		}
		return false;
	};

	_pContact.pramk_ContactAddressArray = function (argContactAddressArr) {
		if (Object.prototype.toString.call(argContactAddressArr) === "[object Array]" || argContactAddressArr == "") {
			for (var i = 0; i < argContactAddressArr.length; i++) {
				if (!(nexacro.Device.pramck_contactString(argContactAddressArr[i].type) && 
					nexacro.Device.pramck_contactString(argContactAddressArr[i].country) && 
					nexacro.Device.pramck_contactString(argContactAddressArr[i].postcode) && 
					nexacro.Device.pramck_contactString(argContactAddressArr[i].city) && 
					nexacro.Device.pramck_contactString(argContactAddressArr[i].region) && 
					nexacro.Device.pramck_contactString(argContactAddressArr[i].street) && 
					nexacro.Device.pramck_contactString(argContactAddressArr[i].label))) {
					return false;
				}
			}
			return true;
		}
		return false;
	};

	_pContact.pramk_ContactOrganizationArray = function (argContactOrganizationArr) {
		if (Object.prototype.toString.call(argContactOrganizationArr) === "[object Array]" || argContactOrganizationArr == "") {
			for (var i = 0; i < argContactOrganizationArr.length; i++) {
				if (!(nexacro.Device.pramck_contactString(argContactOrganizationArr[i].type) && 
					nexacro.Device.pramck_contactString(argContactOrganizationArr[i].company) && 
					nexacro.Device.pramck_contactString(argContactOrganizationArr[i].department) && 
					nexacro.Device.pramck_contactString(argContactOrganizationArr[i].title) && 
					nexacro.Device.pramck_contactString(argContactOrganizationArr[i].label))) {
					return false;
				}
			}
			return true;
		}
		return false;
	};

	_pContact.pramk_ContactPhotoArray = function (argContactPhotoArr) {
		if (Object.prototype.toString.call(argContactPhotoArr) === "[object Array]" || argContactPhotoArr == "") {
			for (var i = 0; i < argContactPhotoArr.length; i++) {
				if (!(nexacro.Device.pramck_contactString(argContactPhotoArr[i].imagedata) && 
					nexacro.Device.pramck_contactString(argContactPhotoArr[i].label))) {
					return false;
				}
			}
			return true;
		}
		return false;
	};

	_pContact.toJson = function () {
		if (this.contactname.familyname == null) {
			this.contactname.familyname = "";
		}
		if (this.contactname.displayname == null) {
			this.contactname.displayname = "";
		}
		if (this.contactname.givenname == null) {
			this.contactname.givenname = "";
		}
		if (this.contactname.middlename == null) {
			this.contactname.middlename = "";
		}
		if (this.contactname.prefix == null) {
			this.contactname.prefix = "";
		}
		if (this.contactname.suffix == null) {
			this.contactname.suffix = "";
		}

		if (typeof (this.uniqueid) == "undefined") {
			this.uniqueid = "";
		}

		var strJson = '{ "uniqueid":"' + this.uniqueid;

		if (nexacro.Device.curDevice == 0) {
			strJson += '", "contactname":{';
			strJson += ' "familyname":"' + this.contactname.familyname;
			strJson += '", "displayname":"' + this.contactname.displayname;
			strJson += '", "givenname":"' + this.contactname.givenname;
			strJson += '", "middlename":"' + this.contactname.middlename;
			strJson += '", "prefix":"' + this.contactname.prefix;
			strJson += '", "suffix":"' + this.contactname.suffix;
			strJson += '"}';
		}
		else {
			strJson += '", "contactname":[{';
			strJson += ' "familyname":"' + this.contactname.familyname;
			strJson += '", "displayname":"' + this.contactname.displayname;
			strJson += '", "givenname":"' + this.contactname.givenname;
			strJson += '", "middlename":"' + this.contactname.middlename;
			strJson += '", "prefix":"' + this.contactname.prefix;
			strJson += '", "suffix":"' + this.contactname.suffix;
			strJson += '"}]';
		}

		if (typeof (this.nickname) == "undefined") {
			this.nickname = "";
		}

		strJson += ', "nickname":"' + this.nickname;

		if (nexacro.Device.curDevice == 0) {
			if (this.birthday != "") {
				var year;
				var month;
				var date;
				year = this.birthday.getFullYear();
				month = this.birthday.getMonth() + 1;
				date = this.birthday.getDate();

				strJson += '", "birthday":"' + year + '-' + month + '-' + date;
			}
			else {
				strJson += '", "birthday":"' + this.birthday;
			}
		}
		else {
			if (this.birthday != "") {
				strJson += '", "birthday":"' + this.birthday.getFullYear() + '/' + (this.birthday.getMonth() + 1) + '/' + this.birthday.getDate();
			}
			else {
				strJson += '", "birthday":"';
			}
		}

		if (typeof (this.note) == "undefined") {
			this.note = "";
		}

		if (nexacro.Device.curDevice == 1) {
			this.note = this.note.replace(/\r/g, "");
			this.note = this.note.replace(/\n/g, "_NEWLINE_");
			this.note = this.note.replace(/&#10;/g, "_NEWLINE_");
		}

		strJson += '", "note":"' + this.note;
		strJson += '", "phonenumbers":';

		if (typeof (this.phonenumbers) != "undefined") {
			if ((this.phonenumbers.length) > 0) {
				strJson += '[';
				for (var i = 0; i < this.phonenumbers.length; i++) {
					strJson += this.phonenumbers[i].toJson();
					if (((this.phonenumbers.length) - 1) == i) {
					}
					else {
						strJson += ',';
					}
				}
				strJson += ']';
			}
			else {
				strJson += '""';
			}
		}
		else {
			strJson += '""';
		}

		strJson += ', "emails":';
		if (typeof (this.emails) != "undefined") {
			if ((this.emails.length) > 0) {
				strJson += '[';
				for (var i = 0; i < this.emails.length; i++) {
					strJson += this.emails[i].toJson();
					if (((this.emails.length) - 1) == i) {
					}
					else {
						strJson += ',';
					}
				}
				strJson += ']';
			}
			else {
				strJson += '""';
			}
		}
		else {
			strJson += '""';
		}

		strJson += ', "ims":';
		if (typeof (this.ims) != "undefined") {
			if ((this.ims.length) > 0) {
				strJson += '[';
				for (var i = 0; i < this.ims.length; i++) {
					strJson += this.ims[i].toJson();
					if (((this.ims.length) - 1) == i) {
					}
					else {
						strJson += ',';
					}
				}
				strJson += ']';
			}
			else {
				strJson += '""';
			}
		}
		else {
			strJson += '""';
		}

		strJson += ', "categories":';
		if (typeof (this.categories) != "undefined") {
			if ((this.categories.length) > 0) {
				strJson += '[';
				for (var i = 0; i < this.categories.length; i++) {
					strJson += this.categories[i].toJson();
					if (((this.categories.length) - 1) == i) {
					}
					else {
						strJson += ',';
					}
				}
				strJson += ']';
			}
			else {
				strJson += '""';
			}
		}
		else {
			strJson += '""';
		}

		strJson += ', "urls":';
		if (typeof (this.urls) != "undefined") {
			if ((this.urls.length) > 0) {
				strJson += '[';
				for (var i = 0; i < this.urls.length; i++) {
					strJson += this.urls[i].toJson();
					if (((this.urls.length) - 1) == i) {
					}
					else {
						strJson += ',';
					}
				}
				strJson += ']';
			}
			else {
				strJson += '""';
			}
		}
		else {
			strJson += '""';
		}

		strJson += ', "addresses":';
		if (typeof (this.addresses) != "undefined") {
			if ((this.addresses.length) > 0) {
				strJson += '[';
				for (var i = 0; i < this.addresses.length; i++) {
					strJson += this.addresses[i].toJson();
					if (((this.addresses.length) - 1) == i) {
					}
					else {
						strJson += ',';
					}
				}
				strJson += ']';
			}
			else {
				strJson += '""';
			}
		}
		else {
			strJson += '""';
		}

		strJson += ', "organizations":';
		if (typeof (this.organizations) != "undefined") {
			if ((this.organizations.length) > 0) {
				strJson += '[';
				for (var i = 0; i < this.organizations.length; i++) {
					strJson += this.organizations[i].toJson();
					if (((this.organizations.length) - 1) == i) {
					}
					else {
						strJson += ',';
					}
				}
				strJson += ']';
			}
			else {
				strJson += '""';
			}
		}
		else {
			strJson += '""';
		}

		strJson += ', "photos":';
		if (typeof (this.photos) != "undefined") {
			if ((this.photos.length) > 0) {
				strJson += '[';
				for (var i = 0; i < this.photos.length; i++) {
					strJson += this.photos[i].toJson();
					if (((this.photos.length) - 1) == i) {
					}
					else {
						strJson += ',';
					}
				}
				strJson += ']';
			}
			else {
				strJson += '""';
			}
		}
		else {
			strJson += '""';
		}

		strJson += '}';

		return strJson;
	};

	_pContact.isValidDate = function (argDate) {
		if (Object.prototype.toString.call(argDate) === "[object Date]" || argDate == "") {
			return true;
		}
		return false;
	};

	_pContact = null;
}

if (!nexacro.ContactField) {
	nexacro.ContactField = function (name, strType, strValue, strLabel, obj) {
		if (arguments.length == 2) {
			this._id = nexacro.Device.makeID();
			nexacro.Device._userCreatedObj[this._id] = this;
			this.name = name || "";

			this.type = "";
			this.value = "";
			this.label = "";
		}
		else {
			this.type = strType || "";
			this.value = strValue || "";
			this.label = strLabel || "";
		}
		this.enableevent = true;
	};
	var _pContactField = nexacro.ContactField.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.ContactField);

	_pContactField._type_name = "ContactField";

	_pContactField.on_created = function () {
	};

	_pContactField.set_type = function (v) {
		if (nexacro.Device.pramck_contactString(v) == true) {
			this.type = v;
			return true;
		}
		this.type = "";
		return false;
	};

	_pContactField.set_value = function (v) {
		if (nexacro.Device.pramck_contactString(v) == true) {
			this.value = v;
			return true;
		}
		this.value = "";
		return false;
	};

	_pContactField.set_label = function (v) {
		if (nexacro.Device.pramck_contactString(v) == true) {
			this.label = v;
			return true;
		}
		this.label = "";
		return false;
	};

	_pContactField.toJson = function () {
		if (typeof (this.label) == "undefined" || this.label == null) {
			this.label = "";
		}
		if (typeof (this.value) == "undefined" || this.value == null) {
			this.value = "";
		}
		if (typeof (this.type) == "undefined" || this.type == null) {
			this.type = "";
		}

		var strJson = '{ "label":"' + this.label;
		strJson += '", "value":"' + this.value;
		strJson += '", "type":"' + this.type;
		strJson += '"}';

		return strJson;
	};

	_pContactField = null;
}

if (!nexacro.ContactIM) {
	nexacro.ContactIM = function (name, strType, strValue, strLabel, strPtype, strPlabel, obj) {
		if (arguments.length == 2) {
			this._id = nexacro.Device.makeID();
			nexacro.Device._userCreatedObj[this._id] = this;
			this.name = name || "";

			this.type = "";
			this.value = "";
			this.label = "";
			this.protocoltype = "";
			this.protocollabel = "";
		}
		else {
			this.type = strType || "";
			this.value = strValue || "";
			this.label = strLabel || "";
			this.protocoltype = strPtype || "";
			this.protocollabel = strPlabel || "";
		}
		this.enableevent = true;
	};
	var _pContactIM = nexacro.ContactIM.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.ContactIM);

	_pContactIM._type_name = "ContactIM";

	_pContactIM.on_created = function () {
	};

	_pContactIM.set_type = function (v) {
		if (nexacro.Device.pramck_contactString(v) == true) {
			this.type = v;
			return true;
		}
		this.type = "";
		return false;
	};

	_pContactIM.set_value = function (v) {
		if (nexacro.Device.pramck_contactString(v) == true) {
			this.value = v;
			return true;
		}
		this.value = "";
		return false;
	};

	_pContactIM.set_label = function (v) {
		if (nexacro.Device.pramck_contactString(v) == true) {
			this.label = v;
			return true;
		}
		this.label = "";
		return false;
	};

	_pContactIM.set_protocoltype = function (v) {
		if (nexacro.Device.pramck_contactString(v) == true) {
			this.protocoltype = v;
			return true;
		}
		this.protocoltype = "";
		return false;
	};

	_pContactIM.set_protocollabel = function (v) {
		if (nexacro.Device.pramck_contactString(v) == true) {
			this.protocollabel = v;
			return true;
		}
		this.protocollabel = "";
		return false;
	};

	_pContactIM.toJson = function () {
		if (typeof (this.label) == "undefined" || this.label == null) {
			this.label = "";
		}
		if (typeof (this.value) == "undefined" || this.value == null) {
			this.value = "";
		}
		if (typeof (this.type) == "undefined" || this.type == null) {
			this.type = "";
		}
		if (typeof (this.protocoltype) == "undefined" || this.protocoltype == null) {
			this.protocoltype = "";
		}
		if (typeof (this.protocollabel) == "undefined" || this.protocollabel == null) {
			this.protocollabel = "";
		}

		var strJson = '{ "label":"' + this.label;
		strJson += '", "value":"' + this.value;
		strJson += '", "type":"' + this.type;
		strJson += '", "ptype":"' + this.protocoltype;
		strJson += '", "plabel":"' + this.protocollabel;
		strJson += '"}';
		return strJson;
	};

	_pContactIM = null;
}

if (!nexacro.ContactAddress) {
	nexacro.ContactAddress = function (name, strType, strCountry, strPostcode, strCity, strRegion, strStreet, strLabel, obj) {
		if (arguments.length == 2) {
			this._id = nexacro.Device.makeID();
			nexacro.Device._userCreatedObj[this._id] = this;
			this.name = name || "";

			this.type = "";
			this.country = "";
			this.postcode = "";
			this.city = "";
			this.region = "";
			this.street = "";
			this.label = "";
		}
		else {
			this.type = strType || "";
			this.country = strCountry || "";
			this.postcode = strPostcode || "";
			this.city = strCity || "";
			this.region = strRegion || "";
			this.street = strStreet || "";
			this.label = strLabel || "";
		}
		this.enableevent = true;
	};

	var _pContactAddress = nexacro.ContactAddress.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.ContactAddress);

	_pContactAddress._type_name = "ContactAddress";

	_pContactAddress.on_created = function () {
	};

	_pContactAddress.set_type = function (v) {
		if (nexacro.Device.pramck_contactString(v) == true) {
			this.type = v;
			return true;
		}
		return false;
	};

	_pContactAddress.set_country = function (v) {
		if (nexacro.Device.pramck_contactString(v) == true) {
			this.country = v;
			return true;
		}
		return false;
	};

	_pContactAddress.set_postcode = function (v) {
		if (nexacro.Device.pramck_contactString(v) == true) {
			this.postcode = v;
			return true;
		}
		return false;
	};

	_pContactAddress.set_city = function (v) {
		if (nexacro.Device.pramck_contactString(v) == true) {
			this.city = v;
			return true;
		}
		return false;
	};

	_pContactAddress.set_region = function (v) {
		if (nexacro.Device.pramck_contactString(v) == true) {
			this.region = v;
			return true;
		}
		return false;
	};

	_pContactAddress.set_street = function (v) {
		if (nexacro.Device.pramck_contactString(v) == true) {
			this.street = v;
			return true;
		}
		return false;
	};

	_pContactAddress.set_label = function (v) {
		if (nexacro.Device.pramck_contactString(v) == true) {
			this.label = v;
			return true;
		}
		return false;
	};

	_pContactAddress.toJson = function () {
		if (nexacro.Device.curDevice == 0) {
			if (typeof (this.label) == "undefined" || this.label == null) {
				this.label = "";
			}
			if (typeof (this.country) == "undefined" || this.country == null) {
				this.country = "";
			}
			if (typeof (this.postcode) == "undefined" || this.postcode == null) {
				this.postcode = "";
			}
			if (typeof (this.city) == "undefined" || this.city == null) {
				this.city = "";
			}
			if (typeof (this.region) == "undefined" || this.region == null) {
				this.region = "";
			}
			if (typeof (this.street) == "undefined" || this.street == null) {
				this.street = "";
			}
			if (typeof (this.type) == "undefined" || this.type == null) {
				this.type = "";
			}

			var strJson = '{ "label":"' + this.label;
			strJson += '", "country":"' + this.country;
			strJson += '", "postcode":"' + this.postcode;
			strJson += '", "city":"' + this.city;
			strJson += '", "region":"' + this.region;
			strJson += '", "street":"' + this.street;
			strJson += '", "type":"' + this.type;
			strJson += '"}';
		}
		else {
			if (typeof (this.label) == "undefined" || this.label == null) {
				this.label = "";
			}
			if (typeof (this.type) == "undefined" || this.type == null) {
				this.type = "";
			}
			if (typeof (this.country) == "undefined" || this.country == null) {
				this.country = "";
			}
			if (typeof (this.postcode) == "undefined" || this.postcode == null) {
				this.postcode = "";
			}
			if (typeof (this.city) == "undefined" || this.city == null) {
				this.city = "";
			}
			if (typeof (this.region) == "undefined" || this.region == null) {
				this.region = "";
			}
			if (typeof (this.street) == "undefined" || this.street == null) {
				this.street = "";
			}

			var strJson = '{ "label":"' + this.label;
			strJson += '", "type":"' + this.type;
			strJson += '", "value":{';
			strJson += '"Country":"' + this.country;
			strJson += '", "ZIP":"' + this.postcode;
			strJson += '", "City":"' + this.city;
			strJson += '", "State":"' + this.region;
			strJson += '", "Street":"' + this.street;
			strJson += '"}}';
		}
		return strJson;
	};

	_pContactAddress = null;
}

if (!nexacro.ContactOrganization) {
	nexacro.ContactOrganization = function (name, strType, strCompany, strDepartment, strTitle, strLabel, obj) {
		if (arguments.length == 2) {
			this._id = nexacro.Device.makeID();
			nexacro.Device._userCreatedObj[this._id] = this;
			this.name = name || "";

			this.type = "";
			this.company = "";
			this.department = "";
			this.title = "";
			this.label = "";
		}
		else {
			this.type = strType || "";
			this.company = strCompany || "";
			this.department = strDepartment || "";
			this.title = strTitle || "";
			this.label = strLabel || "";
		}
		this.enableevent = true;
	};

	var _pContactOrganization = nexacro.ContactOrganization.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.ContactOrganization);

	_pContactOrganization._type_name = "ContactOrganization";

	_pContactOrganization.on_created = function () {
	};

	_pContactOrganization.set_type = function (v) {
		if (nexacro.Device.pramck_contactString(v) == true) {
			this.type = v;
			return true;
		}
		return false;
	};

	_pContactOrganization.set_company = function (v) {
		if (nexacro.Device.pramck_contactString(v) == true) {
			this.company = v;
			return true;
		}
		return false;
	};

	_pContactOrganization.set_department = function (v) {
		if (nexacro.Device.pramck_contactString(v) == true) {
			this.department = v;
			return true;
		}
		return false;
	};

	_pContactOrganization.set_title = function (v) {
		if (nexacro.Device.pramck_contactString(v) == true) {
			this.title = v;
			return true;
		}
		return false;
	};

	_pContactOrganization.set_label = function (v) {
		if (nexacro.Device.pramck_contactString(v) == true) {
			this.label = v;
			return true;
		}
		return false;
	};

	_pContactOrganization.toJson = function () {
		if (typeof (this.label) == "undefined" || this.label == null) {
			this.label = "";
		}
		if (typeof (this.title) == "undefined" || this.title == null) {
			this.title = "";
		}
		if (typeof (this.company) == "undefined" || this.company == null) {
			this.company = "";
		}
		if (typeof (this.department) == "undefined" || this.department == null) {
			this.department = "";
		}
		if (typeof (this.type) == "undefined" || this.type == null) {
			this.type = "";
		}

		var strJson = '{ "label":"' + this.label;
		strJson += '", "title":"' + this.title;
		strJson += '", "company":"' + this.company;
		strJson += '", "department":"' + this.department;
		strJson += '", "type":"' + this.type;
		strJson += '"}';

		return strJson;
	};

	_pContactOrganization = null;
}

if (!nexacro.ContactPhoto) {
	nexacro.ContactPhoto = function (name, strImagedata, strLabel, obj) {
		if (arguments.length == 2) {
			this._id = nexacro.Device.makeID();
			nexacro.Device._userCreatedObj[this._id] = this;
			this.name = name || "";

			this.imagedata = "";
			this.label = "";
		}
		else {
			this.imagedata = strImagedata || "";
			this.label = strLabel || "";
		}
		this.enableevent = true;
	};

	var _pContactPhoto = nexacro.ContactPhoto.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.ContactPhoto);

	_pContactPhoto._type_name = "ContactPhoto";

	_pContactPhoto.on_created = function () {
	};

	_pContactPhoto.set_imagedata = function (v) {
		if (nexacro.Device.pramck_contactString(v) == true) {
			this.imagedata = v;
			return true;
		}
		return false;
	};

	_pContactPhoto.set_label = function (v) {
		if (nexacro.Device.pramck_contactString(v) == true) {
			this.label = v;
			return true;
		}
		return false;
	};

	_pContactPhoto.toJson = function () {
		var strJson = '{ "imagedata":"' + this.imagedata;
		strJson += '", "label":"' + this.label;
		strJson += '"}';

		return strJson;
	};

	_pContactPhoto = null;
}

if (!nexacro.ExternalAPI) {
	nexacro.ExternalAPI = function (name, obj) {
		this._id = nexacro.Device.makeID();
		nexacro.Device._userCreatedObj[this._id] = this;
		this.name = name || "";

		this.enableevent = true;

		this._event_list = {
			"onsuccess" : 1, 
			"onerror" : 1, 
			"onrecvdata" : 1
		};

		this.onsuccess = null;
		this.onerror = null;
		this.onrecvdata = null;

		var params = '""';
		var jsonstr = "";
		jsonstr = '{"id":' + this._id + ', "div":"ExternalAPI", "method":"constructor", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	var _pExternalAPI = nexacro.ExternalAPI.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.ExternalAPI);

	_pExternalAPI._type_name = "ExternalAPI";

	_pExternalAPI.destroy = function () {
		var params = '""';
		var jsonstr;
		delete nexacro.Device._userCreatedObj[this._id];
		jsonstr = '{"id":' + this._id + ', "div":"ExternalAPI", "method":"destroy", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
		return true;
	};
	_pExternalAPI.on_created = function () {
	};

	_pExternalAPI.isAccessible = function (strApplicationID) {
		if (typeof (strApplicationID) == "undefined" || strApplicationID.length == 0 || typeof (strApplicationID) != "string") {
			return false;
		}
		else {
			var params = '{"appID":"' + strApplicationID + '"}';
			var jsonstr = "";
			jsonstr = '{"id":' + this._id + ', "div":"ExternalAPI", "method":"isAccessible", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
			return true;
		}
	};

	_pExternalAPI.execExtAPI = function (strRecvID, strApplicationID, strAPI, strParams) {
		if (typeof (strApplicationID) == "undefined" || strApplicationID.length == 0 || typeof (strApplicationID) != "string") {
			return false;
		}

		if (typeof (strAPI) == "undefined" || strAPI.length == 0) {
			return false;
		}

		var params = '{"recvID":"' + strRecvID + '"';
		params += ', "appID":"' + strApplicationID + '"';
		params += ', "apiname":"' + strAPI + '"';
		params += ', "params":"' + strParams + '"}';
		var jsonstr = "";
		jsonstr = '{"id":' + this._id + ', "div":"ExternalAPI", "method":"execExtAPI", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
		return true;
	};

	_pExternalAPI._onsuccess = function (objData) {
		var e = new nexacro.ExternalAPIEventinfo("onsuccess", objData.reason, objData.recvid, objData.recvdata);
		this._fire_onsuccess(this, e);
	};

	_pExternalAPI._fire_onsuccess = function (objExternalAPI, eExternalAPIEventInfo) {
		if (this.onsuccess && this.onsuccess._has_handlers) {
			return this.onsuccess._fireEvent(this, eExternalAPIEventInfo);
		}
		return true;
	};

	_pExternalAPI._onrecvdata = function (objData) {
		var e = new nexacro.ExternalAPIEventinfo("onrecvdata", objData.reason, objData.recvid, objData.recvdata);
		this._fire_onrecvdata(this, e);
	};

	_pExternalAPI._fire_onrecvdata = function (objExternalAPI, eExternalAPIEventInfo) {
		if (this.onrecvdata && this.onrecvdata._has_handlers) {
			return this.onrecvdata._fireEvent(this, eExternalAPIEventInfo);
		}
		return true;
	};

	_pExternalAPI._onerror = function (objData) {
		var e = new nexacro.ExternalAPIErrorEventInfo("onerror", objData.errorcode, objData.errormsg);
		this._fire_onerror(this, e);
	};

	_pExternalAPI._fire_onerror = function (objExternalAPI, eExternalAPIErrorEventInfo) {
		if (this.onerror && this.onerror._has_handlers) {
			return this.onerror._fireEvent(this, eExternalAPIErrorEventInfo);
		}
		return true;
	};

	_pExternalAPI = null;
}

if (!nexacro.ExternalAPIEventinfo) {
	nexacro.ExternalAPIEventinfo = function (strEventId, strReason, strRecvid, strRecvdata) {
		this.eventid = strEventId;
		this.reason = strReason;
		this.recvid = strRecvid;
		this.recvdata = strRecvdata;
	};
	var _pExternalAPIEventinfo = nexacro.ExternalAPIEventinfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.ExternalAPIEventinfo);

	_pExternalAPIEventinfo._type_name = "ExternalAPIEventinfo";

	_pExternalAPIEventinfo = null;
}

if (!nexacro.ExternalAPIErrorEventInfo) {
	nexacro.ExternalAPIErrorEventInfo = function (strEventId, intErrorCode, strErrorMsg) {
		this.eventid = strEventId;
		this.errortype = "ObjectError";
		this.statuscode = intErrorCode;
		this.errormsg = strErrorMsg;
	};
	var _pExternalAPIErrorEventInfo = nexacro.ExternalAPIErrorEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.ExternalAPIErrorEventInfo);

	_pExternalAPIErrorEventInfo._type_name = "ExternalAPIErrorEventinfo";

	_pExternalAPIErrorEventInfo = null;
}



if (nexacro.OS == "iOS" && !nexacro.LiteDBEventInfo) {
	nexacro.LiteDBEventInfo = function (strEventId, strReason, strReturnValue) {
		this.eventid = strEventId;
		this.reason = strReason;
		this.returnvalue = strReturnValue;
	};
	var _pLiteDBEventInfo = nexacro.LiteDBEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.LiteDBEventInfo);

	_pLiteDBEventInfo._type_name = "LiteDBEventInfo";

	_pLiteDBEventInfo = null;
}

if (nexacro.OS == "iOS" && !nexacro.LiteDBErrorEventInfo) {
	nexacro.LiteDBErrorEventInfo = function (strEventId, intErrorCode, strErrorMsg, strldbErrorCode, strldbErrorMsg) {
		this.eventid = strEventId;
		this.errortype = "ObjectError";
		this.statuscode = intErrorCode;
		this.errormsg = strErrorMsg;
		this.ldberrorcode = strldbErrorCode;
		this.ldberrormsg = strldbErrorMsg;
	};
	var _pLiteDBErrorEventInfo = nexacro.LiteDBErrorEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.LiteDBErrorEventInfo);

	_pLiteDBErrorEventInfo._type_name = "LiteDBErrorEventInfo";

	_pLiteDBErrorEventInfo = null;
}

if (nexacro.OS == "iOS" && !nexacro.LiteDBConnection) {
	nexacro.LiteDBConnection = function (name, obj) {
		this._id = nexacro.Device.makeID();
		nexacro.Device._userCreatedObj[this._id] = this;
		this.name = name || "";
		this.bbegin = false;
		this.enableevent = true;
		this.sqlstatement = "";
		this.busytimeout = 60000;
		this.openflag = 1;
		this.datasource = "";
		this.preconnect = "false";
		this.async = true;

		this._event_list = {
			"onsuccess" : 1, 
			"onerror" : 1
		};

		this.onsuccess = null;
		this.onerror = null;

		var params = '""';
		var jsonstr = '{"id":' + this._id + ', "div":"SQLConnection", "method":"constructor", "params":' + params + '}';

		nexacro.Device.exec(jsonstr);
	};

	nexacro.LiteDBConnection.openReadWrite = 0;
	nexacro.LiteDBConnection.openReadWriteCreate = 1;

	var _pLiteDBConnection = nexacro.LiteDBConnection.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.LiteDBConnection);

	_pLiteDBConnection._type_name = "LiteDBConnection";

	_pLiteDBConnection.destroy = function () {
		var params = '""';
		var jsonstr;

		delete nexacro.Device._userCreatedObj[this._id];

		jsonstr = '{"id":' + this._id + ', "div":"SQLConnection", "method":"destroy", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);

		return true;
	};

	_pLiteDBConnection.on_created = function () {
	};

	_pLiteDBConnection.set_busytimeout = function (v) {
		if (this.paramck_busytimeout(v)) {
			this.busytimeout = v;
			return true;
		}
		else {
			return false;
		}
	};

	_pLiteDBConnection.set_datasource = function (v) {
		if (this.paramck_datasource(v)) {
			this.datasource = v;
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
			return true;
		}
		else {
			return false;
		}
	};

	_pLiteDBConnection.set_preconnect = function (v) {
		if (v == "true" || v == "false" || v == true || v == false) {
			this.preconnect = v;
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
	};

	_pLiteDBConnection.begin = function () {
		var params = '""';
		var jsonstr = '{"id":' + this._id + ', "div":"SQLConnection", "method":"begin", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	_pLiteDBConnection.close = function () {
		var params = '""';
		var jsonstr = '{"id":' + this._id + ', "div":"SQLConnection", "method":"closeDB", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	_pLiteDBConnection.commit = function () {
		var params = '""';
		var jsonstr = '{"id":' + this._id + ', "div":"SQLConnection", "method":"commit", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	_pLiteDBConnection.isConnected = function () {
		var params = '""';
		var jsonstr = '{"id":' + this._id + ', "div":"SQLConnection", "method":"isConnected", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	_pLiteDBConnection.open = function (strDataSource, constOpenFlag) {
		if (typeof (constOpenFlag) != "undefined" || constOpenFlag != null) {
			this.openflag = constOpenFlag;
		}

		if (typeof (strDataSource) != "undefined" || strDataSource != null) {
			this.datasource = strDataSource;
		}

		if (this.paramck_asyncOpen(this.datasource, this.openflag)) {
			if (this.datasource.substring(0, 9).toLowerCase() == "%userapp%") {
				var params = '{"datasource":"' + this.datasource.substring(9, this.datasource.length) + '", "openflag":"' + this.openflag + '", "busytimeout":"' + this.busytimeout + '"}';
				var jsonstr = '{"id":' + this._id + ', "div":"SQLConnection", "method":"openDB", "params":' + params + '}';
				nexacro.Device.exec(jsonstr);
			}
			else {
				var params = '{"datasource":"' + this.datasource + '", "openflag":"' + this.openflag + '", "busytimeout":"' + this.busytimeout + '"}';
				var jsonstr = '{"id":' + this._id + ', "div":"SQLConnection", "method":"openDB", "params":' + params + '}';
				nexacro.Device.exec(jsonstr);
			}
		}
		else {
			return false;
		}
		return true;
	};

	_pLiteDBConnection.rollback = function () {
		var params = '""';
		var jsonstr = '{"id":' + this._id + ', "div":"SQLConnection", "method":"rollback", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	_pLiteDBConnection._onsuccess = function (objData) {
		var e = new nexacro.LiteDBEventInfo("onsuccess", objData.reason, objData.returnvalue);
		this._fire_onsuccess(this, e);
	};

	_pLiteDBConnection._fire_onsuccess = function (objLiteDBConnection, eLiteDBEventInfo) {
		if (this.onsuccess && this.onsuccess._has_handlers) {
			return this.onsuccess._fireEvent(this, eLiteDBEventInfo);
		}
		return true;
	};

	_pLiteDBConnection._onerror = function (objData) {
		var e = new nexacro.LiteDBErrorEventInfo("onerror", objData.errorcode, objData.errormsg, objData.ldberrorcode, objData.ldberrormsg);
		this._fire_onerror(this, e);
	};

	_pLiteDBConnection._fire_onerror = function (objLiteDBConnection, eLiteDBErrorEventInfo) {
		if (this.onerror && this.onerror._has_handlers) {
			return this.onerror._fireEvent(this, eLiteDBErrorEventInfo);
		}
		return true;
	};

	_pLiteDBConnection.paramck_busytimeout = function (timout) {
		if (timout == null || typeof (timout) == "undefined") {
			return false;
		}

		if (!nexacro.Device.publicNumCheck(timout)) {
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



	_pLiteDBConnection.paramck_asyncOpen = function (strDataSource, constOpenFlag) {
		if (strDataSource == null || typeof (strDataSource) == "undefined" || typeof (strDataSource) != "string") {
			return false;
		}

		if (!nexacro.Device.publicNumCheck(constOpenFlag)) {
			return false;
		}
		return true;
	};

	_pLiteDBConnection.paramck_query = function (db_query) {
		if (db_query == null || typeof (db_query) == "undefined" || typeof (db_query) != "string") {
			return false;
		}
		return true;
	};

	_pLiteDBConnection.paramck_paramck_ldbconnection = function (objconnection) {
		if (objconnection == null || typeof (objconnection) == "undefined" || !(objconnection instanceof nexacro.LiteDBConnection)) {
			if (typeof (objconnection) != "string") {
			}
			else {
				return false;
			}
		}
		return true;
	};

	_pLiteDBConnection.paramck_asyncExecuteQuery = function (db_query) {
		if (db_query == null || typeof (db_query) == "undefined" || typeof (db_query) != "string") {
			return false;
		}
		return true;
	};

	_pLiteDBConnection = null;
}

if (nexacro.OS == "iOS" && !nexacro.LiteDBParameter) {
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

	_pLiteDBParameter.paramck_datasource = function (datasrc) {
		if (datasrc == null || typeof (datasrc) == "undefined") {
			return false;
		}
		return true;
	};

	_pLiteDBParameter = null;
}

if (nexacro.OS == "iOS" && !nexacro.LiteDBStatement) {
	nexacro.LiteDBStatement = function (name, obj) {
		this._id = nexacro.Device.makeID();
		nexacro.Device._userCreatedObj[this._id] = this;
		this.name = name || "";
		this._obj = obj;

		this.query = "";
		this.ldbconnection = "";
		this.parameters = {
		};
		this.paramdataset;
		this.applyrowpos = -1;
		this.enableevent = true;
		this.async = true;

		this._event_list = {
			"onsuccess" : 1, 
			"onerror" : 1
		};

		this.onsuccess = null;
		this.onerror = null;

		var params = '""';
		var jsonstr = '{"id":' + this._id + ', "div":"SQLStatement", "method":"constructor", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	var _pLiteDBStatement = nexacro.LiteDBStatement.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.LiteDBStatement);

	_pLiteDBStatement._type_name = "LiteDBStatement";

	_pLiteDBStatement.destroy = function () {
		var params = '""';
		var jsonstr;

		delete nexacro.Device._userCreatedObj[this._id];

		jsonstr = '{"id":' + this._id + ', "div":"SQLStatement", "method":"destroy", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);

		return true;
	};
	_pLiteDBStatement.on_created = function () {
	};


	_pLiteDBStatement.set_query = function (v) {
		if (this.paramck_query(v)) {
			this.query = v;
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

			if (null != this._obj[v] && this._obj[v] instanceof nexacro.LiteDBConnection) {
				this.ldbconnection = this._obj[v];
				ret = true;
			}
		}

		if (ret) {
			var params = '{"connectionID":"' + this.ldbconnection._id + '"}';
			var jsonstr = '{"id":' + this._id + ', "div":"SQLStatement", "method":"set_SQLConnection", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
		}

		return ret;
	};

	_pLiteDBStatement.set_parameters = function (v) {
		if (v instanceof Object) {
			this.parameters = v;
			return true;
		}
		return false;
	};

	_pLiteDBStatement.set_async = function (v) {
	};

	_pLiteDBStatement.close = function () {
		var params;

		if (nexacro.Device.curDevice == 0) {
			params = '{"id":"' + this._id + '"}';
		}
		else {
			params = '""';
		}
		var jsonstr = '{"id":' + this._id + ',"div":"SQLStatement", "method":"close", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
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
			}
			else {
				return false;
			}
		}



		var retQuery = this.retQueryString(this.query);
		var param_dataset = new nexacro.Dataset();
		var param_parameters = {
		};
		var param_applyrowpos = -1;

		if (this.parameters instanceof nexacro.Dataset) {
			param_dataset = this.parameters;
		}
		else {
			param_parameters = this.parameters;
		}




		{

			var params = '{"query":"' + retQuery + '","parameters":' + JSON.stringify(param_parameters) + ',"paramdataset":' + nexacro.Device.DatasetToJSONString2(param_dataset) + ',"applyrowpos":' + param_applyrowpos + '}';
			var jsonstr = '{"id":' + this._id + ',"div":"SQLStatement", "method":"executeQuery", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
		}


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
			}
			else {
				return false;
			}
		}



		var retQuery = this.retQueryString(this.query);

		var param_dataset = new nexacro.Dataset();
		var param_parameters = {
		};
		var param_applyrowpos = -1;

		if (this.parameters instanceof nexacro.Dataset) {
			param_dataset = this.parameters;
		}
		else {
			param_parameters = this.parameters;
		}




		{

			var params = '{"query":"' + retQuery + '","parameters":' + JSON.stringify(param_parameters) + ',"paramdataset":' + nexacro.Device.DatasetToJSONString2(param_dataset) + ',"applyrowpos":' + param_applyrowpos + '}';
			var jsonstr = '{"id":' + this._id + ', "div":"SQLStatement", "method":"executeUpdate", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
		}

		return true;
	};

	_pLiteDBStatement._onsuccess = function (objData) {
		var e;
		if (objData.reason != "7") {
			e = new nexacro.LiteDBEventInfo("onsuccess", objData.reason, objData.returnvalue);
		}
		else {
			var tempDS = new nexacro.Dataset("__tempDS", this._obj);

			tempDS = nexacro.Device.JSONObjectToDataset2(objData.returnvalue, tempDS);
			e = new nexacro.LiteDBEventInfo("onsuccess", objData.reason, tempDS);
		}
		this._fire_onsuccess(this, e);
	};

	_pLiteDBStatement._fire_onsuccess = function (objLiteDBStatement, eLiteDBEventInfo) {
		if (this.onsuccess && this.onsuccess._has_handlers) {
			return this.onsuccess._fireEvent(this, eLiteDBEventInfo);
		}
		return true;
	};

	_pLiteDBStatement._onerror = function (objData) {
		var e = new nexacro.LiteDBErrorEventInfo("onerror", objData.errorcode, objData.errormsg, objData.ldberrorcode, objData.ldberrormsg);
		this._fire_onerror(this, e);
	};

	_pLiteDBStatement._fire_onerror = function (objLiteDBStatement, eLiteDBErrorEventInfo) {
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
			if (strQuery.match(/select/) != null) {
				return 1;
			}
			else if (strQuery.match(/insert/) != null) {
				return 2;
			}
			else if (strQuery.match(/update/) != null) {
				return 3;
			}
			else if (strQuery.match(/delete/) != null) {
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

	_pLiteDBStatement = null;
}


if (nexacro.OS == "iOS" && !nexacro.XPushEventInfo) {
	nexacro.XPushEventInfo = function (eventid, reason, serverip, serverport, command, action, pushmessageobject) {
		this.eventid = eventid;
		this.reason = reason;
		this.serverip = serverip;
		this.serverport = serverport;
		this.command = command;
		this.action = action;
		this.message = pushmessageobject;
		this.returnvalue = pushmessageobject.returnvalue;
		if (this.command == undefined) {
			this.command = null;
		}
	};

	var _pXPushEventInfo = nexacro.XPushEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.XPushEventInfo);
	_pXPushEventInfo._type_name = "XPushEventInfo";

	_pXPushEventInfo = null;
}

if (nexacro.OS == "iOS" && !nexacro.XPushErrorEventInfo) {
	nexacro.XPushErrorEventInfo = function (strEventId, intErrorCode, strErrorMsg, strServerip, strServerport, strCommand, action, pushmessageobject) {
		this.eventid = strEventId;
		this.errortype = "ObjectError";
		this.statuscode = intErrorCode;
		this.errormsg = strErrorMsg;
		this.serverip = strServerip;
		this.serverport = strServerport;
		this.command = strCommand;
		this.action = action;
		this.pushmessageobject = pushmessageobject;
		if (this.command == undefined) {
			this.command = null;
		}
	};
	var _pXPushErrorEventInfo = nexacro.XPushErrorEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.XPushErrorEventInfo);
	_pXPushErrorEventInfo._type_name = "XPushErrorEventInfo";

	_pXPushErrorEventInfo = null;
}

if (nexacro.OS == "iOS" && !nexacro.XPushKeepAliveEventInfo) {
	nexacro.XPushKeepAliveEventInfo = function (eventid, type) {
		this.eventid = eventid;
		this.type = type;
	};

	var _pXPushKeepAliveEventInfo = nexacro.XPushKeepAliveEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.XPushKeepAliveEventInfo);
	_pXPushKeepAliveEventInfo._type_name = "XPushKeepAliveEventInfo";

	_pXPushKeepAliveEventInfo = null;
}

if (nexacro.OS == "iOS" && !nexacro.XPushRequestMessageCountEventInfo) {
	nexacro.XPushRequestMessageCountEventInfo = function (eventid, userid, sendtype, sendid, receivetype, receiveid) {
		this.eventid = eventid;
		this.userid = userid;
		this.sendtype = sendtype;
		this.sendid = sendid;
		this.receivetype = receivetype;
		this.receiveid = receiveid;
	};

	var _pXPushRequestMessageCountEventInfo = nexacro.XPushRequestMessageCountEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.XPushRequestMessageCountEventInfo);
	_pXPushRequestMessageCountEventInfo._type_name = "XPushRequestMessageCountEventInfo";

	_pXPushErrorEventInfo = null;
}
if (nexacro.OS == "iOS" && !nexacro.CommandControl) {
	nexacro.CommandControl = function (name, obj) {
		this._id = nexacro.Device.makeID();
		nexacro.Device._userCreatedObj[this._id] = this;
		this.actiontype;
		this.callback;
		this.check = "0";
		this.messagekey;
		this.messagetype;
		this.objdataset;
		this.objform;
		this.row = -1;
		this.type = "update";
		this.useactiveformcallback = false;
	};

	var _pCommandControl = nexacro.CommandControl.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.CommandControl);

	_pCommandControl._type_name = "CommandControl";

	_pCommandControl.destroy = function () {
		var params = '""';
		var jsonstr;
		return true;
	};

	_pCommandControl.on_created = function () {
	};

	_pCommandControl.equal = function (other) {
		if (this.callback != other.callback) {
			return false;
		}
		if (this.check != other.check) {
			return false;
		}
		if (this.messagekey != other.messagekey) {
			return false;
		}
		if (this.messagetype != other.messagetype) {
			return false;
		}

		if (this.objdataset !== other.objdataset) {
			return false;
		}
		if (this.objform !== other.objform) {
			return false;
		}

		if (this.row != other.row) {
			return false;
		}
		if (this.type != other.type) {
			return false;
		}
		if (this.useactiveformcallback != other.useactiveformcallback) {
			return false;
		}

		return true;
	};

	_pCommandControl.toJSON = function () {
		return eval('({"_id":"' + this._id + '","messagetype":"' + this.messagetype + '","messagekey":"' + this.messagekey + '"})');
	};

	_pCommandControl.remove = function (idx) {
		return (idx < 0 || idx > this.length) ? this : this.slice(0, idx).concat(this.slice(idx + 1, this.length));
	};

	_pCommandControl = null;
}

if (nexacro.OS == "iOS" && !nexacro.XPush) {
	nexacro.XPush = function (name, obj) {
		this._id = nexacro.Device.makeID();
		nexacro.Device._userCreatedObj[this._id] = this;
		this.name = name || "";
		this.enableevent = true;

		this.commandlist = new Array;
		this.controlretry = "5";
		this.debug = false;
		this.iplist = new Array;
		this.keepalivetime = "30";
		this.keeptimeout = "60";
		this.layouturl = "";
		this.retry = 1;
		this.sessionid = "";
		this.timeout = "30";
		this.userid = "";
		this._parent_elem = obj;
		this.errorcode;
		this.errormsg;
		this.async = true;
		this.connectip = "";
		this.connectport = "-1";
		this.connectSuccess = false;
		this.action;

		this._event_list = {
			"onsuccess" : 1, 
			"onerror" : 1, 
			"onkeepalive" : 1
		};

		this.onsuccess = null;
		this.onerror = null;

		var params = '""';
		var jsonstr = '{"id":' + this._id + ', "div":"XPush", "method":"constructor", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	var _pXPush = nexacro.XPush.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.XPush);
	_pXPush._type_name = "XPush";
	_pXPush._handle = null;
	_pXPush._currentipinfo = null;

	_pXPush.on_created = function () {
	};

	_pXPush.destroy = function () {
		var params = '""';
		var jsonstr;

		delete nexacro.Device._userCreatedObj[this._id];

		jsonstr = '{"id":' + this._id + ', "div":"XPush", "method":"destroy", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
		return true;
	};

	_pXPush.set_channeltype = function (v) {
		if (typeof (v) == "undefined" || v == null || v == "") {
			this.channeltype = "single";
		}
		else {
			this.channeltype = v;
		}
		return true;
	};

	_pXPush.set_commandlist = function () {
	};
	_pXPush.set_connectip = function (v) {
	};
	_pXPush.set_connectport = function (v) {
	};

	_pXPush.set_controlretry = function (v) {
		if (typeof (v) == "undefined" || v == null) {
			this.controlretry = 5;
		}
		else {
			if (nexacro.Device.publicNumCheck(v)) {
				if (v >= 0) {
					this.controlretry = v;
				}
				else {
					return false;
				}
			}
			else {
				return false;
			}
		}
		return true;
	};

	_pXPush.set_debug = function (v) {
		if (typeof (v) == "undefined" || v == null) {
			this.debug = false;
		}
		else {
			this.debug = v;
		}
		return true;
	};

	_pXPush.set_iplist = function (v) {
		var len = this.iplist.length;
		if (len > 0) {
			this.iplist.splice(0, len);
		}

		if (typeof (v) == "undefined" || v == null || v == "") {
		}
		else {
			if (v.indexOf(",") >= 0) {
				var ipinfolist = v.split(",");
				if (ipinfolist.length > 0) {
					for (var i = 0; i < ipinfolist.length; i++) {
						var temp = ipinfolist[i].split(":");
						var ipinfo = new Object;

						ipinfo.ip = temp[0];
						ipinfo.port = temp[1].valueOf();
						ipinfo.retry = false;
						this.iplist.push(ipinfo);
					}
				}
			}
			else {
				var temp = v.split(":");
				var ipinfo = new Object;

				ipinfo.ip = temp[0];
				ipinfo.port = temp[1].valueOf();
				ipinfo.retry = false;
				this.iplist.push(ipinfo);
			}
		}
		return true;
	};

	_pXPush.set_keepalivetime = function (v) {
		if (typeof (v) == "undefined" || v == null) {
			this.keepalivetime = 30;
		}
		else {
			if (nexacro.Device.publicNumCheck(v)) {
				if (v >= 0) {
					this.keepalivetime = v;
				}
				else {
					return false;
				}
			}
			else {
				return false;
			}
		}
		return true;
	};

	_pXPush.set_keeptimeout = function (v) {
		if (typeof (v) == "undefined" || v == null) {
			this.keeptimeout = 60;
		}
		else {
			if (nexacro.Device.publicNumCheck(v)) {
				if (v >= 0) {
					this.keeptimeout = v;
				}
				else {
					return false;
				}
			}
			else {
				return false;
			}
		}
		return true;
	};

	_pXPush.set_layouturl = function (v) {
		if (typeof (v) == "undefined" || v == null) {
			this.layouturl = "";
		}
		else {
			var layoutCheck = v.substring(0, 9);

			if (layoutCheck.toLowerCase() != "%userapp%") {
				this.action = "ERROR";
				this._onerror({
					errorcode : "-702"
				});
			}
			else {
				this.layouturl = v;
			}
		}
		return true;
	};

	_pXPush.set_retry = function (v) {
		if (typeof (v) == "undefined" || v == null) {
			this.retry = 1;
		}
		else {
			if (nexacro.Device.publicNumCheck(v)) {
				if (v >= 0) {
					this.retry = Number(v);
				}
				else {
					return false;
				}
			}
			else {
				return false;
			}
		}
		return true;
	};

	_pXPush.set_sessionid = function (v) {
		if (typeof (v) == "undefined" || v == null || v == "") {
			this.sessionid = "";
		}
		else {
			this.sessionid = v;
		}
		return true;
	};

	_pXPush.set_timeout = function (v) {
		if (typeof (v) == "undefined" || v == null) {
			this.timeout = 30;
		}
		else {
			if (nexacro.Device.publicNumCheck(v)) {
				if (v >= 0) {
					this.timeout = v;
				}
				else {
					return false;
				}
			}
			else {
				return false;
			}
		}
		return true;
	};

	_pXPush.set_userid = function (v) {
		if (typeof (v) == "undefined" || v == null || v == "") {
			this.userid = "";
		}
		else {
			this.userid = v;
		}
		return true;
	};


	_pXPush.set_async = function (v) {
		if (v === undefined || v === null) {
			return;
		}
		v = nexacro._toBoolean(v);

		this.async = v;

		return true;
	};



	_pXPush.subscribe = function (strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack) {
		strCommand = "ADDF";
		this.command(strCommand, strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack);
	};
	_pXPush.unsubscribe = function (strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack) {
		strCommand = "DELF";
		this.command(strCommand, strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack);
	};
	_pXPush.registerDevice = function (strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack) {
		strCommand = "RGST";
		this.command(strCommand, strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack);
	};
	_pXPush.unregisterDevice = function (strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack) {
		strCommand = "UNRG";
		this.command(strCommand, strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack);
	};
	_pXPush.registerTopic = function (strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack) {
		strCommand = "ADUI";
		this.command(strCommand, strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack);
	};
	_pXPush.unregisterTopic = function (strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack) {
		strCommand = "UNUI";
		this.command(strCommand, strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack);
	};
	_pXPush.requestMessageCount = function (strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack) {
		strCommand = "MSGC";
		this.command(strCommand, strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack);
	};
	_pXPush.command = function (strCommand, strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack) {
		var cc = new nexacro.CommandControl();
		var jsonstr;

		this.action = strCommand;
		cc.actiontype = strCommand;
		cc.type = strType;
		cc.callback = strCallBack;
		cc.messagekey = strMessageKey;
		cc.messagetype = strMessageType;
		cc.objdataset = objDataset;
		cc.objform = objForm;

		if (nRow != undefined) {
			if ((+nRow) != (+nRow)) {
				return false;
			}
			else {
				cc.row = nRow;
			}
		}
		else {
			cc.row = -1;
		}

		if (strCheck != undefined) {
			cc.check = strCheck;
		}
		else {
			cc.check = "0";
		}

		if (bUseActiveFormCallBack != undefined) {
			if (typeof (bUseActiveFormCallBack) != "boolean") {
				if ((bUseActiveFormCallBack.toLowerCase() != "false") && (bUseActiveFormCallBack.toLowerCase() != "true")) {
					cc.useactiveformcallback = false;
				}
				else {
					cc.useactiveformcallback = bUseActiveFormCallBack;
				}
			}
			else {
				cc.useactiveformcallback = bUseActiveFormCallBack;
			}
		}
		else {
			cc.useactiveformcallback = false;
		}

		this.strCommand = strCommand;
		this.strMessageType = strMessageType;
		this.strMessageKey = strMessageKey;
		this.objDataset = objDataset;
		this.strCallBack = strCallBack;

		if (this.strCommand === undefined || this.strCommand === null || this.strCommand == "") {
			this._onerror({
				errorcode : "-701"
			});
		}
		else {
			this.strCommand = this.strCommand.toString();

			if (strCommand == "ADDF" || strCommand == "DELF") {
				if (objForm === undefined || objForm === null || 
					this.strMessageType === undefined || this.strMessageType === null || this.strMessageType == "" || 
					this.strMessageKey === undefined || this.strMessageKey === null || this.strMessageKey == "" || 
					this.objDataset === undefined || this.objDataset === null || 
					strType === undefined || strType === null || strType == "" || 
					this.strCallBack === undefined || this.strCallBack === null || this.strCallBack == "") {
					this._onerror({
						errorcode : "-701"
					});
				}
				else {
					this.strMessageType = this.strMessageType.toString();
					this.strMessageKey = this.strMessageKey.toString();

					if ((strType.toLowerCase() != "append") && (strType.toLowerCase() != "update") && (strType.toLowerCase() != "insert") && (strType.toLowerCase() != "replace") && (strType != "allUpdate")) {
						this._onerror({
							errorcode : "-701"
						});
					}
					else {
						this.strCallBack = this.strCallBack.toString();
						if (objForm[this.strCallBack] === undefined) {
							this._onerror({
								errorcode : "-701"
							});
						}
						else {
							if (strCommand == "ADDF") {
								var params = '{"type":"' + strType.toLowerCase() + '","parameters":' + JSON.stringify(cc) + '}';
								jsonstr = '{"id":' + this._id + ', "div":"XPush", "method":"ADDF", "params":' + params + '}';
								var i, duplicated = false;
								for (var i = 0; i < this.commandlist.length; i++) {
									var item = this.commandlist[i];
									if (item.equal(cc)) {
										duplicated = true;
										break;
									}
								}
								if (!duplicated) {
									this.commandlist.push(cc);
								}
							}
							else if (strCommand == "DELF") {
								jsonstr = '{"id":' + this._id + ', "div":"XPush", "method":"DELF", "params":' + JSON.stringify(cc) + '}';
								var i;
								for (var i = 0; i < this.commandlist.length; i++) {
									var item = this.commandlist[i];
									if (item.equal(cc)) {
										break;
									}
								}
							}
						}
					}
				}
			}
			else if (strCommand == "ADUI") {
				if (this.connectSuccess == false) {
					this._onerror({
						errorcode : "-1002"
					});
					return;
				}
				jsonstr = '{"id":' + this._id + ', "div":"XPush", "method":"ADUI", "params":' + JSON.stringify(cc) + '}';
				this.commandlist.push(cc);
			}
			else if (strCommand == "UNUI") {
				if (this.connectSuccess == false) {
					this._onerror({
						errorcode : "-1003"
					});
					return;
				}
				jsonstr = '{"id":' + this._id + ', "div":"XPush", "method":"UNUI", "params":' + JSON.stringify(cc) + '}';
				this.commandlist.push(cc);
			}
			else if (strCommand == "MSGC") {
				if (this.connectSuccess == false) {
					this._onerror({
						errorcode : "-1004"
					});
					return;
				}
				jsonstr = '{"id":' + this._id + ', "div":"XPush", "method":"MSGC", "params":' + JSON.stringify(cc) + '}';
				this.commandlist.push(cc);
			}
			else if (strCommand == "RGST") {
				if (this.connectSuccess == false) {
					this._onerror({
						errorcode : "-1001"
					});
					return;
				}
				jsonstr = '{"id":' + this._id + ', "div":"XPush", "method":"RGST", "params":' + JSON.stringify(cc) + '}';
				this.commandlist.push(cc);
			}
			else if (strCommand == "UNRG") {
				if (this.connectSuccess == false) {
					this._onerror({
						errorcode : "-1001"
					});
					return;
				}
				jsonstr = '{"id":' + this._id + ', "div":"XPush", "method":"UNRG", "params":' + JSON.stringify(cc) + '}';
				this.commandlist.push(cc);
			}
			else {
				this._onerror({
					errorcode : "-701"
				});
			}
		}

		if (!(jsonstr === undefined || jsonstr === null || jsonstr == "")) {
			nexacro.Device.exec(jsonstr);
		}
	};

	_pXPush.connect = function (userid, sessionid) {
		var retry_Cnt;
		var bSuccessed;

		if (userid == null) {
			userid = this.userid;
		}
		this.userid = userid;

		if (sessionid == null) {
			sessionid = this.sessionid;
		}
		this.sessionid = sessionid;

		if (nexacro.Device.publicNumCheck(this.retry)) {
			if (this.retry >= 0) {
				retry_Cnt = Number(this.retry);
			}
		}

		var params;
		params = '{ "strUserID":"' + userid;
		params += '", "strSessionID":"' + sessionid;
		params += '", "iplist":' + JSON.stringify(this.iplist);
		params += ', "retry":"' + retry_Cnt;
		params += '", "controlretry":"' + this.controlretry;
		params += '", "layouturl":"' + this.layouturl;
		params += '", "keepalivetime":"' + this.keepalivetime;
		params += '", "keeptimeout":"' + this.keeptimeout;
		params += '", "timeout":"' + this.timeout;
		params += '", "commandlist":' + JSON.stringify(this.commandlist);
		params += '}';
		var jsonstr;

		jsonstr = '{"id":' + this._id + ', "div":"XPush", "method":"connect", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	_pXPush.disconnect = function () {
		if (this.connectSuccess) {
			var params = '""';
			var jsonstr;
			jsonstr = '{"id":' + this._id + ', "div":"XPush", "method":"disconnect", "params":' + params + '}';
			this.connectSuccess = false;
			this.commandlist.length = 0;
			nexacro.Device.exec(jsonstr);
		}
		else {
			this.action = "BYEC";
			this._onerror({
				errorcode : "-401"
			});
		}
	};

	_pXPush.resume = function () {
		if (this.connectSuccess) {
			var params = '""';
			var jsonstr;
			jsonstr = '{"id":' + this._id + ', "div":"XPush", "method":"resume", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
		}
		else {
			this._onerror({
				errorcode : "-601"
			});
		}
	};

	_pXPush.suspend = function () {
		if (this.connectSuccess) {
			var params = '""';
			var jsonstr;
			jsonstr = '{"id":' + this._id + ', "div":"XPush", "method":"suspend", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
		}
		else {
			this._onerror({
				errorcode : "-501"
			});
		}
	};


	_pXPush.getCurrentIP = function () {
		if (this.connectip) {
			return this.connectip;
		}
		return null;
	};

	_pXPush.getCurrentPort = function () {
		if (this.connectport) {
			return this.connectport;
		}
		return null;
	};

	_pXPush.sendResponse = function (msgid) {
		if (this.connectSuccess) {
			var params;
			var jsonstr;

			params = '{"msgid":"' + msgid + '"}';

			var jsonstr = '{"id":' + this._id + ', "div":"XPush", "method":"sendResponse", "params":' + params + '}';
			nexacro.Device.exec(jsonstr);
		}
		else {
			this.action = "RECT";
			this._onerror({
				errorcode : "-901"
			});
		}
	};

	_pXPush.requestMessage = function () {
		if (this.connectSuccess) {
			if (arguments.length < 2) {
				return;
			}

			var messagetype = arguments[0];
			var messagekeys = "";
			for (var i = 1; i < arguments.length; i++) {
				if (i > 1) {
					messagekeys += ",\"" + (arguments[i]) + "\"";
				}
				else {
					messagekeys += "\"" + (arguments[i]) + "\"";
				}
			}
			if (messagekeys.length > 0) {
				var params;
				var jsonstr;

				params = '{"messagetype":"' + messagetype + '", "messagekeys":[' + messagekeys + ']}';

				var jsonstr = '{"id":' + this._id + ', "div":"XPush", "method":"requestMessage", "params":' + params + '}';

				nexacro.Device.exec(jsonstr);
			}
		}
		else {
			this.action = "REQD";
			this._onerror({
				errorcode : "-902"
			});
		}
	};


	_pXPush._resetIPList = function () {
		var length = this.iplist.length;
		for (var i = 0; i < length; i++) {
			if (this.iplist[i].retry) {
				this.iplist[i].retry = false;
			}
		}
	};

	_pXPush._getrandomipinfo = function () {
		var length = this.iplist.length;
		if (length > 0) {
			for (var i = 0; i < length; i++) {
				if (this.iplist[i].retry == false) {
					break;
				}
			}
			if (i == length) {
				return null;
			}

			var randidx;
			do {
				randidx = Math.floor((Math.random() * ((length - 1) - 0 + 1))) + 0;
			} while (this.iplist[randidx].retry);

			this.iplist[randidx].retry = true;
			this._currentipinfo = this.iplist[randidx];
			return this._currentipinfo;
		}
		return null;
	};




	_pXPush._onxpush = function (ret) {
		var retData;

		if (nexacro.Device.curDevice == 0) {
			retData = ret;
		}
		else {
			retData = eval("(" + ret + ")");
		}

		this.RecvData = retData.recvdata;

		var paramRow;
		var paramChangeColumns = new Array();
		var paramAllColumns = new Array();
		var paramChangeRows = new Array();
		var paramobjChangeList = new Array();

		var rows = this.RecvData.rows;
		for (var i = 0; i < rows.length; i++) {
			var row = rows[i];
			var messageType = this.RecvData.type;
			var messageKey = row[this.RecvData.key];
			var layoutKey = this.RecvData.key;
			var checkFieldname = this.RecvData.check;

			for (var j = 0; j < this.commandlist.length; j++) {
				var cc = this.commandlist[j];

				if (cc.messagetype == messageType && cc.messagekey == messageKey) {
					if (cc.type == "append") {
						var cr = cc.objdataset.addRow();
						for (colId in row) {
							if (!row.hasOwnProperty(colId)) {
								continue;
							}
							paramAllColumns.push(colId);

							cc.objdataset.setColumn(cr, colId, nexacro.Device.decodeString(row[colId]));
							paramChangeColumns.push(colId);
						}
						paramRow = cr;
					}
					else if (cc.type == "insert") {
						var cr = cc.objdataset.insertRow(cc.row);

						for (colId in row) {
							if (!row.hasOwnProperty(colId)) {
								continue;
							}
							cc.objdataset.setColumn(cr, colId, nexacro.Device.decodeString(row[colId]));
							paramAllColumns.push(colId);
							paramChangeColumns.push(colId);
						}
						paramRow = cr;
					}
					else if (cc.type == "replace") {
						for (colId in row) {
							if (!row.hasOwnProperty(colId)) {
								continue;
							}
							var value = cc.objdataset.getColumn(cc.row, colId);
							if (value != nexacro.Device.decodeString(row[colId])) {
								cc.objdataset.setColumn(cc.row, colId, nexacro.Device.decodeString(row[colId]));
								paramChangeColumns.push(colId);
								paramRow = cc.row;
							}
						}
						paramAllColumns.push(colId);
					}
					else if (cc.type == "update") {
						var cr = cc.objdataset.findRow(layoutKey, messageKey);

						for (colId in row) {
							if (!row.hasOwnProperty(colId)) {
								continue;
							}
							paramAllColumns.push(colId);

							var value = cc.objdataset.getColumn(cr, colId);

							if (value != row[colId]) {
								if ((cc.check == "0") || ((checkFieldname == colId) && (row[colId] == cc.check))) {
									cc.objdataset.setColumn(cr, colId, nexacro.Device.decodeString(row[colId]));
									paramChangeColumns.push(colId);
								}
							}
						}
						paramRow = cr;
					}
					else if (cc.type == "allUpdate") {
						for (var cr = 0; cr < cc.objdataset.getRowCount(); cr++) {
							if (messageKey == cc.objdataset.getColumn(cr, layoutKey)) {
								paramChangeRows.push(cr);

								var temp = new Array();
								temp.push(cr);

								for (colId in row) {
									if (!row.hasOwnProperty(colId)) {
										continue;
									}

									var value = cc.objdataset.getColumn(cr, colId);

									if (value != row[colId]) {
										if ((cc.check == "0") || (row[colId] == cc.check)) {
											cc.objdataset.setColumn(cr, colId, nexacro.Device.decodeString(row[colId]));
											temp.push(colId);
										}
									}
								}
								paramobjChangeList.push(temp.join());
							}
						}
					}

					if ((!cc.useactiveformcallback) || (cc.useactiveformcallback && (cc.objform === application.getActiveForm()))) {
						if (cc.type != "allUpdate") {
							var callbackFn = cc.objform[cc.callback];
							if (callbackFn instanceof Function) {
								callbackFn.call(cc.objform, paramRow, paramChangeColumns.join(), paramAllColumns.join(), "DATA", retData.action, retData.messageid);
								paramChangeRows.splice(0, paramChangeRows.length);
								paramAllColumns.splice(0, paramAllColumns.length);
							}
						}
						else if (cc.type == "allUpdate") {
							var callbackFn = cc.objform[cc.callback];
							if (callbackFn instanceof Function) {
								callbackFn.call(cc.objform, paramChangeRows.join(), null, paramobjChangeList, "DATA", retData.action, retData.messageid);
								paramChangeRows.splice(0, paramChangeRows.length);
								paramobjChangeList.splice(0, paramobjChangeList.length);
							}
						}
					}
				}
			}
		}
	};


	_pXPush._onsuccess = function (objData) {
		var pushmessageobject = new Object();

		pushmessageobject.messagetype = "";
		pushmessageobject.messagekey = "";
		pushmessageobject.messageid = "";
		pushmessageobject.returnvalue = "";

		if (objData.classtype == "AUTH") {
			this.connectSuccess = true;
		}

		if (objData.classtype == "RECT") {
			pushmessageobject.messagetype = "";
			pushmessageobject.messagekey = "";
			pushmessageobject.messageid = objData.messagetype;
		}
		else if (objData.classtype == "RGST" || objData.classtype == "UNRG") {
			if (nexacro.OS == "Android") {
				pushmessageobject.messagetype = "";
				pushmessageobject.messagekey = "";
				pushmessageobject.messageid = "";
			}
		}
		else if (objData.classtype == "MSGC") {
			pushmessageobject.messageid = "";
			pushmessageobject.messagetype = objData.messagetype;
			pushmessageobject.messagekey = objData.messagekey;
			pushmessageobject.returnvalue = objData.returnvalue.messagecount;
		}
		else {
			pushmessageobject.messageid = "";
			pushmessageobject.messagetype = objData.messagetype;
			pushmessageobject.messagekey = objData.messagekey;
		}

		var command;
		var listlength = this.commandlist.length;
		var index;

		for (index = 0; index < listlength; index++) {
			command = this.commandlist[index];
			if (command.messagetype == objData.messagetype) {
				if (command.messagekey == objData.messagekey) {
					break;
				}
			}
		}

		if (index == listlength) {
			command = null;
		}
		if (command && (objData.classtype == "DELF" || objData.classtype == "ADUI" || objData.classtype == "UNUI" || objData.classtype == "MSGC" || objData.classtype == "RGST " || objData.classtype == "UNRG")) {
			command.actiontype = objData.classtype;
			var e = new nexacro.XPushEventInfo("onsuccess", objData.reason, objData.serverip, objData.serverport, command, objData.action, pushmessageobject);
			this.connectip = objData.serverip;
			this.connectport = objData.serverport;

			this._fire_onsuccess(this, e);
			this.commandlist.splice(index, 1);
		}
		else {
			if (command) {
				command.actiontype = objData.classtype;
			}

			var e = new nexacro.XPushEventInfo("onsuccess", objData.reason, objData.serverip, objData.serverport, command, objData.action, pushmessageobject);
			this.connectip = objData.serverip;
			this.connectport = objData.serverport;

			this._fire_onsuccess(this, e);
		}
	};

	_pXPush._fire_onsuccess = function (objXPush, eXPushEventInfo) {
		if (this.onsuccess && this.onsuccess._has_handlers) {
			return this.onsuccess._fireEvent(this, eXPushEventInfo);
		}
		return true;
	};

	_pXPush._onerror = function (objData) {
		var pushmessageobject = new Object();

		pushmessageobject.messagetype = "";
		pushmessageobject.messagekey = "";
		pushmessageobject.messageid = "";
		pushmessageobject.returnvalue = "";

		if (objData.classtype == "RECT") {
			pushmessageobject.messageid = objData.messagetype;
			pushmessageobject.messagekey = "";
			pushmessageobject.messagetype = "";
		}
		else {
			pushmessageobject.messagetype = objData.messagetype;
			pushmessageobject.messagekey = objData.messagekey;
			pushmessageobject.messageid = "";
		}

		var command;
		var listlength = this.commandlist.length;
		for (var i = 0; i < listlength; i++) {
			command = this.commandlist[i];
			command.actiontype = objData.classtype;
			if (command.messagetype == objData.messagetype) {
				if (command.messagekey == objData.messagekey) {
					break;
				}
			}
			command = null;
		}
		var errormsg = this._geterrormsg(objData.errorcode);

		if (objData.action === undefined) {
			objData.action = this._getaction(this.action);
		}

		this.errorcode = objData.errorcode;
		this.errormsg = errormsg;

		var e = new nexacro.XPushErrorEventInfo("onerror", this.errorcode, errormsg, objData.serverip, objData.serverport, command, objData.action, pushmessageobject);

		this.connectip = objData.serverip;
		this.connectport = objData.serverport;
		this._fire_onerror(this, e);
	};

	_pXPush._fire_onerror = function (objXPush, eXPushErrorEventInfo) {
		if (this.onerror && this.onerror._has_handlers) {
			return this.onerror._fireEvent(this, eXPushErrorEventInfo);
		}
		return true;
	};

	_pXPush._onkeepalive = function (objData) {
		var e = new nexacro.XPushKeepAliveEventInfo("onkeepalive", objData.type);
		this._fire_onkeepalive(this, e);
	};

	_pXPush._fire_onkeepalive = function (objXPush, eXPushKeepAliveEventInfo) {
		if (this.onkeepalive && this.onkeepalive._has_handlers) {
			return this.onkeepalive._fireEvent(this, eXPushKeepAliveEventInfo);
		}
	};

	_pXPush._seterror = function (errorcode, errormsg) {
		this.errorcode = errorcode;
		this.errormsg = errormsg;
	};

	_pXPush._onrequestmessagecount = function (userid, sendtype, sendid, receivetype, receiveid) {
		var e = new nexacro.XPushRequestMessageCountEventInfo(userid, sendtype, sendid, receivetype, receiveid);
		this._fire_onrequestmessagecount(this, e);
	};

	_pXPush._fire_onrequestmessagecount = function (objXPush, eXPushRequestMessageCountEventInfo) {
		if (this.onrequestmessagecount && this.requestmessagecount._has_handlers) {
			return this.onrequestmessagecount._fireEvent(this, eXPushRequestMessageCountEventInfo);
		}
	};

	_pXPush._getaction = function (action) {
		var pushaction;

		switch (action) {
			case "ERROR":
				pushaction = -1;
				break;
			case "AUTH":
				pushaction = nexacro.XPushAction.AUTH;
				break;
			case "BYEC":
				pushaction = nexacro.XPushAction.BYEC;
				break;
			case "ADDF":
				pushaction = nexacro.XPushAction.ADDF;
				break;
			case "DELF":
				pushaction = nexacro.XPushAction.DELF;
				break;
			case "REQD":
				pushaction = nexacro.XPushAction.REQD;
				break;
			case "RECT":
				pushaction = nexacro.XPushAction.RECT;
				break;
			case "RGST":
				pushaction = nexacro.XPushAction.RGST;
				break;
			case "UNRG":
				pushaction = nexacro.XPushAction.UNRG;
				break;
			case "ADUI":
				pushaction = nexacro.XPushAction.ADUI;
				break;
			case "UNUI":
				pushaction = nexacro.XPushAction.UNUI;
				break;
			case "MSGC":
				pushaction = nexacro.XPushAction.MSGC;
				break;
		}

		return pushaction;
	};

	_pXPush._geterrormsg = function (errorcode) {
		var codename;
		if (errorcode == -100) {
			codename = "object_push_send_byec";
		}
		else if (errorcode == -101) {
			codename = "object_push_socket_timeout";
		}
		else if (errorcode == -200) {
			codename = "object_push_fail_command_auth";
		}
		else if (errorcode == -201) {
			codename = "object_push_fail_all_command_auth";
		}
		else if (errorcode == -202) {
			codename = "object_push_fail_data_auth";
		}
		else if (errorcode == -300) {
			codename = "object_push_fail_connect";
		}
		else if (errorcode == -301) {
			codename = "object_push_fail_send_receive";
		}
		else if (errorcode == -302) {
			codename = "object_push_connected_already";
		}
		else if (errorcode == -401) {
			codename = "object_push_fail_disconnect";
		}
		else if (errorcode == -501) {
			codename = "object_push_fail_suspend";
		}
		else if (errorcode == -601) {
			codename = "object_push_fail_resume";
		}
		else if (errorcode == -701) {
			codename = "object_push_fail_command";
		}
		else if (errorcode == -702) {
			codename = "object_push_notfound_layouturl";
		}
		else if (errorcode == -703) {
			codename = "object_push_invalid_layouturl";
		}
		else if (errorcode == -801) {
			codename = "object_push_fail_protocol_version";
		}
		else if (errorcode == -901) {
			codename = "object_push_fail_rect";
		}
		else if (errorcode == -902) {
			codename = "object_push_fail_reqd";
		}
		else if (errorcode == -1001) {
			codename = "object_push_fail_rgst_unrg";
		}
		else if (errorcode == -1002) {
			codename = "object_push_fail_adui";
		}
		else if (errorcode == -1003) {
			codename = "object_push_fail_unui";
		}
		else if (errorcode == -1004) {
			codename = "object_push_fail_msgc";
		}
		return application._getErrorMessge(codename);
	};

	_pXPush.getObject = function (sid) {
		if (sid == undefined) {
			willrunfunc = null;
		}
		else {
			sid = sid * 1;
			var willrunfunc = nexacro.Device._userCreatedObj[sid];

			if (typeof willrunfunc == "undefined" || willrunfunc == null) {
				willrunfunc = null;
			}
		}
		return willrunfunc;
	};

	_pXPush = null;
}
;


if (!nexacro.FakeXMLHttpRequest) {
	nexacro.FakeXMLHttpRequest = function (name, obj, ndatatype, compress) {
		this._id = nexacro.Device.makeID();
		nexacro.Device._userCreatedObj[this._id] = this;
		this._obj = obj;
		this.name = name || "";
		this.strURL = "";
		this.strDataType = ndatatype || "";
		this.strCompress = compress;


		this.responseHeaders = {
		};
		this.responseAllHeaders = {
		};
		this.requestHeaders = {
		};


		this.UNSENT = 0;
		this.OPENED = 1;
		this.HEADERS_RECEIVED = 2;
		this.LOADING = 3;
		this.DONE = 4;

		this.readyState = 0;


		this.timeout = 0;
		this.withCredentials = false;
		this.upload = {
		};


		this.status = 0;
		this.statusText = "";
		this.response = "";
		this.responseType = "";
		this.responseText = "";
		this.responseXML = "";


		this.onreadystatechange = function () {
		};

		var params = '""';
		var jsonstr = '{"id":' + this._id + ', "div":"FakeXMLHttpRequest", "method":"constructor", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);
	};

	var _pFakeXMLHttpRequest = nexacro.FakeXMLHttpRequest.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.FakeXMLHttpRequest);
	_pFakeXMLHttpRequest._type_name = "FakeXMLHttpRequest";

	_pFakeXMLHttpRequest.destory = function () {
		var params = '""';
		var jsonstr;

		delete nexacro.Device._userCreatedObj[this._id];

		jsonstr = '{"id":' + this._id + ', "div":"FakeXMLHttpRequest", "method":"destroy", "params":' + params + '}';
		nexacro.Device.exec(jsonstr);

		return true;
	};

	_pFakeXMLHttpRequest.on_created = function () {
	};

	_pFakeXMLHttpRequest.open = function (method, path, async, user, password) {
		this.strURL = path;
	};

	_pFakeXMLHttpRequest.setRequestHeader = function (header, value) {
		this.requestHeaders[header] = value;
	};

	_pFakeXMLHttpRequest.send = function (data) {
		this.SendData = data;

		var params = '{"sendData":"' + nexacro.Device.encodeString(data) + '","strURL":"' + this.strURL + '","protocolparameters":' + JSON.stringify(nexacro.Device._protocolparameters) + ',"strDataType":"' + this.strDataType + '","bCompress":"' + this.strCompress + '","requestHeaders":' + JSON.stringify(this.requestHeaders) + '}';
		var jsonstr = '{"id":' + this._id + ', "div":"FakeXMLHttpRequest", "method":"sendData", "params":' + params + '}';

		nexacro.Device.exec(jsonstr);
	};

	_pFakeXMLHttpRequest.getSendData = function () {
		return nexacro.Device.encodeString(this.SendData);
	};


	_pFakeXMLHttpRequest.abort = function () {
		return false;
	};

	_pFakeXMLHttpRequest.getResponseHeader = function (header) {
		return this.responseHeaders[header];
	};

	_pFakeXMLHttpRequest.getAllResponseHeaders = function () {
		return this.responseAllHeaders;
	};

	_pFakeXMLHttpRequest.overrideMimeType = function (mime) {
	};


	_pFakeXMLHttpRequest._fire_onreadystatechange = function (ret) {
		var retData = eval("(" + ret + ")");
		this.readyState = retData.readyState;
		this.status = retData.status;
		if (retData.responseText) {
			this.responseText = nexacro.Device.decodeString(retData.responseText);
		}
		if (retData.responseAllHeaders) {
			this.responseHeaders = JSON.parse(nexacro.Device.decodeString(retData.responseAllHeaders));
		}
		if (this.responseHeaders) {
			this.responseAllHeaders = JSON.stringify(this.responseHeaders);
		}
		this.onreadystatechange.call();
	};

	_pFakeXMLHttpRequest._fire_ontargetevent = function (ret) {
		var retData = eval("(" + ret + ")");
		var eventname = retData.eventname;
		this.readyState = retData.readyState;
		this.status = retData.status;

		if (this.upload[eventname] != undefined) {
			this.upload[eventname].call();
		}
	};

	_pFakeXMLHttpRequest = null;
}
