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

if (nexacro.OS == "iOS" && (window.location.protocol == "file:" && (window.location.pathname.split('/').pop() == "Run.html" || window.location.pathname.split('/').pop() == "nexacro.html"))) {
	nexacro.DeviceI.prototype.setup = function () {
		this._userCreatedObj = {
		};
		this.curDevice = 0;
		this.isphone = 0;
		this._is_hybrid = true;
		this._protocolparameters = {
		};

		var userAgent = navigator.userAgent.toString();

		if (nexacro.OS == "iOS") {
			this.curDevice = 1;
		}
		if (this.curDevice == 1) {
			if (!this.bridge && this.isHybrid()) {
				this.bridge = document.createElement("IFRAME");
				this.bridge.setAttribute("height", "0px");
				this.bridge.setAttribute("width", "0px");
				this.bridge.setAttribute("frameborder", "0");
				this.bridge.style.display = "none";
				document.documentElement.appendChild(this.bridge);
				this.msgqueue = new Array();
				this.msgqueue.length = 0;
				setInterval("nexacro.Device.execiOS()", 20);
			}
		}
	};

	nexacro.DeviceI.prototype.execiOS = function (method) {
		if (this.msgqueue.length > 0 && this.curDevice == 1) {
			this.msgqueue.reverse();
			this.bridge.src = "nexacro://?" + encodeURI(this.msgqueue.pop());
			this.msgqueue.reverse();
		}
	};

	nexacro.DeviceI.prototype.exec = function (method) {
		if (this.isHybrid() == false) {
			return;
		}

		this.msgqueue.push(method);
	};

	nexacro._convertRealPath = function (strAlias) {
		if (nexacro.Device.isHybrid() == undefined || !nexacro.Device.isHybrid()) {
			return strAlias;
		}

		if (strAlias === undefined || strAlias === null) {
			return "";
		}
		var rootPathCheck = strAlias.substring(0, 9);
		var iosFilePath = "";
		if (rootPathCheck.toLowerCase() == "%userapp%") {
			iosFilePath = strAlias.substring(9, strAlias.length);
			return nexacro.System.userapppath + iosFilePath;
		}
		else {
			return strAlias;
		}
	};

	nexacro._closeWindowHandle = function (_win_handle) {
		if (nexacro._getMainWindowHandle() == _win_handle) {
			nexacro._destroyManagerFrame(_win_handle);
			nexacro.Device.exit();
			_win_handle.open('', '_self');
		}
		_win_handle.close();
	};

	nexacro._isHybrid = function () {
		return nexacro.Device.isHybrid();
	};


	nexacro._convertDatasetSSVToBIN = function (ssvdata) {
		return ssvdata;
	};
	nexacro._convertDatasetBINToSSV = function (bindata) {
		return bindata;
	};

	nexacro._convertStreamSSVToBIN = function (ssvdata) {
		return ssvdata;
	};
	nexacro._convertStreamBINToSSV = function (bindata) {
		return bindata;
	};

	nexacro._setProtocolVar = function (name, key, val) {
		var protocol = nexacro.Device._protocolparameters[name];

		if (protocol == undefined) {
			nexacro.Device._protocolparameters[name] = {
			};
			protocol = nexacro.Device._protocolparameters[name];
		}

		protocol[key] = val;

		return true;
	};

	nexacro._execBrowser = function (strUrl) {
		this._id = nexacro.Device.makeID();

		if (strUrl == null || strUrl == undefined) {
			return false;
		}

		var params = '{"url":"' + strUrl + '"}';
		var jsonstr = '{"id":' + this._id + ', "div":"Browser", "method":"execBrowser", "params":' + params + '}';

		nexacro.Device.exec(jsonstr);

		return true;
	};

	nexacro._initDeviceAPI();
}
