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

if (nexacro.OS == "Android" && nexacro.Browser == "Runtime") {
	nexacro.DeviceI.prototype.setup = function () {
		nexacro.__initDevice(this, this.runCallback, this.keyEvent, application, system, nexacro);

		if (nexacro.__getLibVersion) {
			this.libraryversion = nexacro.__getLibVersion();
		}

		this._userCreatedObj = {
		};
		this.curDevice = 0;
		this.isphone = 0;
	};

	nexacro.DeviceI.prototype.exec = function (method) {
		nexacro.__execMobileAPI(method);
	};

	nexacro.Application._callscript = function (script) {
		eval(script);
	};

	nexacro.Application._callscript = function (script) {
		eval(script);
	};

	nexacro._initDeviceAPI();
}
