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


if ((!nexacro.Device || nexacro.OS == "Android") && !nexacro.Event.XPushEventInfo) {
	nexacro.Event.XPushEventInfo = function (eventid, reason, action, serverip, serverport, command, pushmessageobject) {
		this.eventid = eventid;
		this.reason = reason;
		this.action = action;
		this.serverip = serverip;
		this.serverport = serverport;
		this.command = command;
		this.message = pushmessageobject;
		this.statuscode = "";
		this.errormsg = "";
		if (pushmessageobject.returnvalue != undefined && pushmessageobject.returnvalue[0] != undefined) {
			this.returnvalue = pushmessageobject.returnvalue[0].count;
		}
		if (this.command == undefined) {
			this.command = null;
		}
	};

	var _pXPushEventInfo = nexacro.Event.XPushEventInfo.prototype = nexacro._createPrototype(nexacro.Event);
	_pXPushEventInfo._type = "nexacroXPushEventInfo";
	_pXPushEventInfo._type_name = "XPushEventInfo";

	delete _pXPushEventInfo;
}

if ((!nexacro.Device || nexacro.OS == "Android") && !nexacro.Event.XPushErrorEventInfo) {
	nexacro.Event.XPushErrorEventInfo = function (strEventId, action, intErrorCode, strErrorMsg, strServerip, strServerport, strCommand) {
		this.errortype = "ObjectError";
		this.action = action;
		this.eventid = strEventId;
		this.statuscode = intErrorCode;
		this.errormsg = strErrorMsg;
		this.serverip = strServerip;
		this.serverport = strServerport;
		this.command = strCommand;
		if (this.command == undefined) {
			this.command = null;
		}
	};
	var _pXPushErrorEventInfo = nexacro.Event.XPushErrorEventInfo.prototype = nexacro._createPrototype(nexacro.Event);
	_pXPushErrorEventInfo._type = "nexacroXPushErrorEventInfo";
	_pXPushErrorEventInfo._type_name = "XPushErrorEventInfo";

	delete _pXPushErrorEventInfo;
}

if ((!nexacro.Device || nexacro.OS == "Android") && !nexacro.Event.XPushKeepAliveEventInfo) {
	nexacro.Event.XPushKeepAliveEventInfo = function (eventid, type) {
		this.eventid = eventid;
		this.type = type;
	};

	var _pXPushKeepAliveEventInfo = nexacro.Event.XPushKeepAliveEventInfo.prototype = nexacro._createPrototype(nexacro.Event);
	_pXPushKeepAliveEventInfo._type = "nexacroXPushKeepAliveEventInfo";
	_pXPushKeepAliveEventInfo._type_name = "XPushKeepAliveEventInfo";

	delete _pXPushErrorEventInfo;
}

if ((!nexacro.Device || nexacro.OS == "Android") && !nexacro.Event.XPushRequestMessageCountEventInfo) {
	nexacro.Event.XPushRequestMessageCountEventInfo = function (eventid, userid, sendtype, sendid, receivetype, receiveid) {
		this.eventid = eventid;
		this.userid = userid;
		this.sendtype = sendtype;
		this.sendid = sendid;
		this.receivetype = receivetype;
		this.receiveid = receiveid;
	};

	var _pXPushRequestMessageCountEventInfo = nexacro.Event.XPushRequestMessageCountEventInfo.prototype = nexacro._createPrototype(nexacro.Event);
	_pXPushRequestMessageCountEventInfo._type = "nexacroXPushRequestMessageCountEventInfo";
	_pXPushRequestMessageCountEventInfo._type_name = "XPushRequestMessageCountEventInfo";

	delete _pXPushErrorEventInfo;
}

if ((!nexacro.Device || nexacro.OS == "Android") && !nexacro.CommandControl) {
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

	var _pCommandControl = nexacro.CommandControl.prototype = nexacro._createPrototype(nexacro.EventSinkObject);
	_pCommandControl._type = "nexacroCommandControl";
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

	_pCommandControl.remove = function (idx) {
		return (idx < 0 || idx > this.length) ? this : this.slice(0, idx).concat(this.slice(idx + 1, this.length));
	};

	delete _pCommandControl;
}

if ((!nexacro.Device || nexacro.OS == "Android") && !nexacro.XPush) {
	nexacro.XPush = function (name, obj) {
		if (nexacro.OS == "Android") {
			this._id = nexacro.Device.makeID();
			nexacro.Device._userCreatedObj[this._id] = this;
		}
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

		this._event_list = {
			"onsuccess" : 1, 
			"onerror" : 1, 
			"onkeepalive" : 1
		};

		this.onsuccess = null;
		this.onerror = null;

		var params = '""';

		if (this._parent_elem) {
			var _win = this._parent_elem._getWindow();
			if (_win) {
				this._handle = nexacro.__createXPushHandle(this, _win._handle);
				if (this._handle) {
					nexacro.__setXPushHandleOnEvent(this._handle, this._onxpush, this._onsuccess, this._onerror, this._onkeepalive);

					nexacro.__setXPushHandleOnFunction(this._handle, this._getrandomipinfo, this._seterror);
				}
			}
		}
	};

	var _pXPush = nexacro.XPush.prototype = nexacro._createPrototype(nexacro.EventSinkObject);
	_pXPush._type = "nexacroXPush";
	_pXPush._type_name = "XPush";
	_pXPush._handle = null;
	_pXPush._currentipinfo = null;

	_pXPush._findForm = function (comp) {
		var form = comp;
		while (form && form._is_form == false) {
			form = form.parent;
		}
		return form;
	};

	_pXPush.on_created = function () {
	};

	_pXPush.destroy = function () {
		var params = '""';
		var jsonstr;

		if (this._handle) {
			nexacro.__destroyXPushHandle(this._handle);
		}


		return true;
	};


	_pXPush.set_name = function (name) {
		this.name = name;
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
			if (nexacro._isNumber(v)) {
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
		this.on_apply_controlretry();
		return true;
	};

	_pXPush.on_apply_controlretry = function () {
		if (this._handle) {
			nexacro.__setXPushControlRetry(this._handle, this.controlretry);
		}
	};

	_pXPush.set_debug = function (v) {
		if (v === undefined || v === null) {
			return;
		}
		v = nexacro._toBoolean(v);

		this.debug = v;

		this.on_apply_debug();
		return true;
	};

	_pXPush.on_apply_debug = function () {
		if (this._handle) {
			nexacro.__setXPushHandleDebug(this._handle, this.debug);
		}
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
		v = nexacro._toInt(v);
		if (typeof (v) == "undefined" || v == null) {
			this.keepalivetime = 30;
		}
		else {
			if (v >= 0) {
				this.keepalivetime = v;
			}
			else {
				this.keepalivetime = 30;
			}
		}
		this.on_apply_keepalivetime();
		return true;
	};

	_pXPush.on_apply_keepalivetime = function () {
		if (this._handle) {
			nexacro.__setXPushHandleKeepAliveTime(this._handle, this.keepalivetime);
		}
	};

	_pXPush.set_keeptimeout = function (v) {
		v = nexacro._toInt(v);
		if (typeof (v) == "undefined" || v == null) {
			this.keeptimeout = 60;
		}
		else {
			if (v > 0) {
				this.keeptimeout = v;
			}
			else {
				this.keeptimeout = 60;
			}
		}
		return true;
	};

	_pXPush.set_layouturl = function (v) {
		if (typeof (v) == "undefined" || v == null) {
			this.layouturl = "";
		}
		else {
			this.layouturl = v;
		}
		this.on_apply_layouturl();
		return true;
	};

	_pXPush.on_apply_layouturl = function () {
		if (this._handle && this.layouturl != "") {
			var layouturl = this.layouturl;
			if (nexacro.OS != "Android") {
				var url = this.layouturl;

				if (url.substring(0, 4).toLowerCase() == "url(") {
					url = url.substring(5, url.length - 2);
				}

				var form = this._findForm(this._parent_elem);
				if (form) {
					if (url.indexOf("%") < 0) {
						layouturl = application._getServiceLocation(url, form._getRefFormBaseUrl());
					}
				}
			}
			nexacro.__setXPushHandleLayoutURL(this._handle, layouturl);
		}
	};

	_pXPush.set_retry = function (v) {
		v = nexacro._toInt(v);
		if (typeof (v) == "undefined" || v == null) {
			this.retry = 1;
		}
		else {
			if (v >= 0) {
				this.retry = v;
			}
			else {
				this.retry = 1;
			}
		}
		this.on_apply_retry();
		return true;
	};

	_pXPush.on_apply_retry = function () {
		if (this._handle) {
			nexacro.__setXPushHandleRetry(this._handle, this.retry);
		}
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
		v = nexacro._toInt(v);
		if (typeof (v) == "undefined" || v == null) {
			this.timeout = 30;
		}
		else {
			if (v > 0) {
				this.timeout = v;
			}
			else {
				this.timeout = 30;
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

		this.on_apply_async();
		return true;
	};

	_pXPush.on_apply_async = function () {
		if (this._handle) {
			nexacro.__setXPushHandleAsync(this._handle, this.async);
		}
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

		cc.actiontype = strCommand;
		cc.type = strType;
		cc.callback = strCallBack;
		cc.messagekey = strMessageKey;
		cc.messagetype = strMessageType;
		cc.objdataset = objDataset;
		cc.objform = objForm;


		if (this._currentipinfo == null) {
			this._onerror(-701);
			return;
		}


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
					cc.useactiveformcallback = nexacro._toBoolean(bUseActiveFormCallBack);
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
			nexacro.__fireXPushHandleErrorEvent(this._handle, -701);
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
					nexacro.__fireXPushHandleErrorEvent(this._handle, -701);
				}
				else {
					this.strMessageType = this.strMessageType.toString();
					this.strMessageKey = this.strMessageKey.toString();

					if ((strType.toLowerCase() != "append") && (strType.toLowerCase() != "update") && (strType.toLowerCase() != "insert") && (strType.toLowerCase() != "replace") && (strType != "allUpdate")) {
						nexacro.__fireXPushHandleErrorEvent(this._handle, -701);
					}
					else {
						this.strCallBack = this.strCallBack.toString();
						if (objForm[this.strCallBack] === undefined) {
							nexacro.__fireXPushHandleErrorEvent(this._handle, -701);
						}
						else {
							if (strCommand == "ADDF") {
								var i;
								for (i = 0; i < this.commandlist.length; i++) {
									var item = this.commandlist[i];
									if (item.equal(cc)) {
										break;
									}
								}
								if (i == this.commandlist.length) {
									this.commandlist.push(cc);
								}
							}
							nexacro.__commandXPushHandle(this._handle, strCommand, strMessageType, strMessageKey, strType.toLowerCase());
						}
					}
				}
			}
			else if (strCommand == "ADUI" || strCommand == "UNUI") {
				this.commandlist.push(cc);
				nexacro.__commandXPushHandle(this._handle, strCommand, strMessageType, strMessageKey);
			}
			else if (strCommand == "MSGC") {
				this.commandlist.push(cc);
				nexacro.__commandXPushHandle(this._handle, strCommand, strMessageType, strMessageKey);
			}
			else if (strCommand == "RGST" || strCommand == "UNRG") {
				this.commandlist.push(cc);
				nexacro.__commandXPushHandle(this._handle, strCommand);
			}
			else {
				nexacro.__fireXPushHandleErrorEvent(this._handle, -701);
			}
		}
	};


	_pXPush.connect = function (userid, sessionid) {
		var bSuccessed;
		if (this._handle) {
			if (userid == null) {
				userid = this.userid;
			}

			if (sessionid == null) {
				sessionid = this.sessionid;
			}

			this._resetIPList();
			nexacro.__connectXPushHandle(this._handle, userid, sessionid, this.retry, this.timeout, this.controlretry, this.keeptimeout);
		}
	};

	_pXPush.disconnect = function () {
		if (this._handle) {
			nexacro.__disconnectXPushHandle(this._handle);
		}
	};

	_pXPush.resume = function () {
		if (this._handle) {
			nexacro.__resumeXPushHandle(this._handle);
		}
	};

	_pXPush.suspend = function () {
		if (this._handle) {
			nexacro.__suspendXPushHandle(this._handle);
		}
	};

	_pXPush.getCurrentIP = function () {
		if (this._currentipinfo) {
			return this._currentipinfo.ip;
		}
		return null;
	};

	_pXPush.getCurrentPort = function () {
		if (this._currentipinfo) {
			return this._currentipinfo.port;
		}
		return null;
	};

	_pXPush.sendResponse = function (msgid) {
		if (this._handle) {
			nexacro.__sendResponseXPushHandle(this._handle, msgid);
		}
	};

	_pXPush.requestMessage = function () {
		if (this._handle) {
			if (arguments.length < 2) {
				return;
			}

			var messagetype = arguments[0];
			var messagekeys = new Array();
			for (var i = 1; i < arguments.length; i++) {
				messagekeys.push(arguments[i]);
			}
			if (messagekeys.length > 0) {
				nexacro.__requestMessageXPushHandle(this._handle, messagetype, messagekeys);
			}
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


	_pXPush._onxpush = function (recv) {
		var paramRow;
		var paramChangeColumns = new Array();
		var paramAllColumns = new Array();
		var paramChangeRows = new Array();
		var paramobjChangeList = new Array();
		var paramChangeRowsTemp = new Array();

		for (var j = 0; j < this.commandlist.length; j++) {
			var cc = this.commandlist[j];

			if (cc.messagetype == recv.type) {
				var cr = -1;
				var data_key = false;
				var datasetColIndexList = new Array();
				var datalistlen = recv.datalist.length;

				for (var dlidx = 0; dlidx < datalistlen; dlidx++) {
					var data = recv.datalist[dlidx];
					var layoutKey = data.id;
					var messageKey = data.item;
					var idx = cc.objdataset.colinfos.indexOf(data.id);
					datasetColIndexList.push(idx);

					if (data.key) {
						data_key = data.key;
					}

					if (cr == -1 && cc.type == "update") {
						cr = cc.objdataset.findRow(layoutKey, messageKey);
					}
				}

				var bfind = false;
				var callfunc = false;
				var callfunc1 = false;
				for (var dlidx = 0; dlidx < datalistlen; dlidx++) {
					var data = recv.datalist[dlidx];
					var layoutKey = data.id;
					var messageKey = data.item;
					var checkfield = data.checkfield;
					var colIdx = datasetColIndexList[dlidx];

					if (dlidx == 0 && messageKey != cc.messagekey) {
						break;
					}

					if (cc.type == "append") {
						if (cr == -1) {
							if (cc.messagekey == data.item) {
								cr = cc.objdataset.addRow();
								cc.objdataset.setColumn(cr, colIdx, data.item);
								paramAllColumns.push(data.id);
								paramChangeColumns.push(data.id);
							}
						}
						else {
							callfunc = true;
							cc.objdataset.setColumn(cr, colIdx, data.item);
							paramAllColumns.push(data.id);
							paramChangeColumns.push(data.id);
							paramRow = cr;
						}
						callfunc1 = true;
					}
					else if (cc.type == "insert") {
						if (cr == -1) {
							if (cc.messagekey == data.item) {
								cr = cc.objdataset.insertRow(cc.row);
								cc.objdataset.setColumn(cr, colIdx, data.item);
								paramAllColumns.push(data.id);
								paramChangeColumns.push(data.id);
							}
						}
						else {
							callfunc = true;
							cc.objdataset.setColumn(cr, colIdx, data.item);
							paramAllColumns.push(data.id);
							paramChangeColumns.push(data.id);
							paramRow = cr;
						}
						callfunc1 = true;
					}
					else if (cc.type == "replace") {
						if (cc.row < cc.objdataset.getRowCount()) {
							var value = cc.objdataset.getColumn(cc.row, colIdx);
							if (value != data.item) {
								cc.objdataset.setColumn(cc.row, colIdx, data.item);
								paramChangeColumns.push(data.id);
								paramRow = cc.row;
								callfunc = true;
							}
							callfunc1 = true;
							paramAllColumns.push(data.id);
						}
					}
					else if (cc.type == "update") {
						if (!data_key) {
							this._onerror(-703);
							break;
						}

						paramAllColumns.push(data.id);
						var value = cc.objdataset.getColumn(cr, colIdx);
						if (value != data.item) {
							callfunc1 = true;
							callfunc = true;

							if ((cc.check == "0") || (checkfield && checkfield == cc.check)) {
								var ret = cc.objdataset.setColumn(cr, colIdx, data.item);
								paramChangeColumns.push(data.id);
							}
						}
						paramRow = cr;
					}
					else if (cc.type == "allUpdate") {
						if (!data_key) {
							this._onerror(-703);
							break;
						}


						if (paramChangeRowsTemp.length == 0) {
							for (var cr = 0; cr < cc.objdataset.getRowCount(); cr++) {
								if (messageKey == cc.objdataset.getColumn(cr, layoutKey)) {
									paramChangeRows.push(cr);
									paramChangeRowsTemp.push(cr);
									continue;
								}
							}
						}
						else {
							while (paramChangeRowsTemp.length) {
								cr = paramChangeRowsTemp.splice(0, 1);
								var value = cc.objdataset.getColumn(cr, colIdx);
								if (value != data.item) {
									if ((cc.check == "0") || (checkfield && checkfield == cc.check)) {
										cc.objdataset.setColumn(cr, colIdx, data.item);
										var change_val = cr + "," + data.id;

										paramobjChangeList.push(change_val);
									}
								}
							}
							callfunc = true;
						}
						callfunc1 = true;
					}
				}

				if (recv.action == "RELI" && recv.msgid != undefined && recv.msgid != null) {
					callfunc = true;
				}
				else if (callfunc == false) {
					continue;
				}

				if (!callfunc1) {
					continue;
				}

				if ((!cc.useactiveformcallback) || (cc.useactiveformcallback && (cc.objform === application.getActiveForm()))) {
					if (cc.type != "allUpdate") {
						var callbackFn = cc.objform[cc.callback];
						if (callbackFn instanceof Function) {
							callbackFn.call(cc.objform, paramRow, paramChangeColumns.join(), paramAllColumns.join(), "DATA", recv.action, recv.msgid);
							paramChangeRows.splice(0, paramChangeRows.length);
							paramAllColumns.splice(0, paramAllColumns.length);
						}
					}
					else if (cc.type == "allUpdate") {
						var callbackFn = cc.objform[cc.callback];
						if (callbackFn instanceof Function) {
							callbackFn.call(cc.objform, paramChangeRows.join(), null, paramobjChangeList, "DATA", recv.action, recv.msgid);
							paramChangeRows.splice(0, paramChangeRows.length);
							paramobjChangeList.splice(0, paramobjChangeList.length);
						}
					}
				}
			}
		}
	};


	_pXPush._onsuccess = function (reason, action, classtype, messagetype, messagekey, returnvalue) {
		var pushmessageobject = new Object();
		pushmessageobject.messagetype = "";
		pushmessageobject.messagekey = "";
		pushmessageobject.messageid = "";
		pushmessageobject.returnvalue = "";

		if (classtype == "RECT") {
			pushmessageobject.messagetype = "";
			pushmessageobject.messagekey = "";
			pushmessageobject.messageid = messagetype;
		}
		else if (classtype == "RGST" || classtype == "UNRG") {
			if (nexacro.OS == "Android") {
				pushmessageobject.messagetype = "";
				pushmessageobject.messagekey = "";
				pushmessageobject.messageid = "";
			}
		}
		else if (classtype == "MSGC") {
			pushmessageobject.messageid = "";
			pushmessageobject.messagetype = messagetype;
			pushmessageobject.messagekey = messagekey;
			pushmessageobject.returnvalue = returnvalue;
		}
		else if (action == 0 || action == 1) {
		}
		else {
			pushmessageobject.messageid = "";
			pushmessageobject.messagetype = messagetype;
			pushmessageobject.messagekey = messagekey;
		}

		var command;
		var listlength = this.commandlist.length;
		var index;

		for (index = 0; index < listlength; index++) {
			command = this.commandlist[index].valueOf();

			if (command.messagetype == messagetype) {
				if (command.messagekey == messagekey && command.actiontype == classtype) {
					break;
				}
			}
		}
		if (index == listlength) {
			command = null;
		}

		if (command && (classtype == "DELF" || classtype == "ADUI" || classtype == "DELF" || classtype == "UNUI" || classtype == "MSGC" || classtype == "RGST " || classtype == "UNRG")) {
			command.actiontype = classtype;
			var e = new nexacro.Event.XPushEventInfo("onsuccess", reason, action, this.getCurrentIP(), this.getCurrentPort(), command, pushmessageobject);
			this._fire_onsuccess(this, e);
			this.commandlist.splice(index, 1);
		}
		else {
			var e = new nexacro.Event.XPushEventInfo("onsuccess", reason, action, this.getCurrentIP(), this.getCurrentPort(), command, pushmessageobject);
			this._fire_onsuccess(this, e);

			if (action == 1) {
				this._currentipinfo = null;
				this.commandlist = null;
				this.commandlist = new Array;
			}
		}
	};

	_pXPush._fire_onsuccess = function (objXPush, eXPushEventInfo) {
		if (this.onsuccess && this.onsuccess._has_handlers) {
			return this.onsuccess._fireEvent(this, eXPushEventInfo);
		}
		return true;
	};


	_pXPush._onerror = function (errorcode, action, classtype, messagetype, messagekey) {
		if (action == undefined) {
			action = -1;
		}

		var pushmessageobject = new Object();
		pushmessageobject.messagetype = "";
		pushmessageobject.messagekey = "";
		pushmessageobject.messageid = "";
		pushmessageobject.returnvalue = "";


		if (classtype == "RECT") {
			pushmessageobject.messageid = messagetype;
			pushmessageobject.messagekey = "";
			pushmessageobject.messagetype = "";
		}
		else {
			pushmessageobject.messagetype = messagetype;
			pushmessageobject.messagekey = messagekey;
			pushmessageobject.messageid = "";
		}

		var command;
		var listlength = this.commandlist.length;
		for (var i = 0; i < listlength; i++) {
			command = this.commandlist[i];
			if (command.messagetype == messagetype) {
				if (command.messagekey == messagekey) {
					break;
				}
			}
			command = null;
		}
		var errormsg = this._geterrormsg(errorcode);

		this.errorcode = errorcode;
		this.errormsg = errormsg;

		var e = new nexacro.Event.XPushErrorEventInfo("onerror", action, errorcode, errormsg, this.getCurrentIP(), this.getCurrentPort(), command, pushmessageobject);
		this._fire_onerror(this, e);
	};
	_pXPush._fire_onerror = function (objXPush, eXPushErrorEventInfo) {
		if (this.onerror && this.onerror._has_handlers) {
			return this.onerror._fireEvent(this, eXPushErrorEventInfo);
		}
		return true;
	};

	_pXPush._onkeepalive = function (type) {
		var e = new nexacro.Event.XPushKeepAliveEventInfo("onkeepalive", type);
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
		var e = new nexacro.Event.XPushRequestMessageCountEventInfo(userid, sendtype, sendid, receivetype, receiveid);
		this._fire_onrequestmessagecount(this, e);
	};

	_pXPush._fire_onrequestmessagecount = function (objXPush, eXPushRequestMessageCountEventInfo) {
		if (this.onrequestmessagecount && this.requestmessagecount._has_handlers) {
			return this.onrequestmessagecount._fireEvent(this, eXPushRequestMessageCountEventInfo);
		}
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
	delete _pXPush;
}
;
