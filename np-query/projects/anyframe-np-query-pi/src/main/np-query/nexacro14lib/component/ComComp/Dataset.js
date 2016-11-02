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

if (!nexacro.NormalDataset) {
	nexacro.NormalDataset = function (id, parent) {
		nexacro.Dataset.call(this, id, parent);

		this.url = "";
		this.arguments = "";
		this.serverdatasetid = "";
		this.firefirstcount = 0;
		this.firenextcount = 0;
		this.preload = false;

		this._is_preloaded = false;
	};

	var _pNormalDataset = nexacro._createPrototype(nexacro.Dataset, nexacro.NormalDataset);
	nexacro.NormalDataset.prototype = _pNormalDataset;

	nexacro.NormalDataset.ROWTYPE_EMPTY = 0;
	nexacro.NormalDataset.ROWTYPE_NORMAL = 1;
	nexacro.NormalDataset.ROWTYPE_INSERT = 2;
	nexacro.NormalDataset.ROWTYPE_UPDATE = 4;
	nexacro.NormalDataset.ROWTYPE_DELETE = 8;
	nexacro.NormalDataset.ROWTYPE_GROUP = 16;

	nexacro.NormalDataset.REASON_LOAD = 0;
	nexacro.NormalDataset.REASON_LOADPROCESS = 1;
	nexacro.NormalDataset.REASON_RESET = 2;
	nexacro.NormalDataset.REASON_LOADCONTENT = 3;

	nexacro.NormalDataset.REASON_ASSIGN = 10;
	nexacro.NormalDataset.REASON_COPY = 11;
	nexacro.NormalDataset.REASON_APPEND = 12;
	nexacro.NormalDataset.REASON_MERGE = 13;
	nexacro.NormalDataset.REASON_DELETE = 20;
	nexacro.NormalDataset.REASON_DELETEALL = 22;
	nexacro.NormalDataset.REASON_CLEARDATA = 23;
	nexacro.NormalDataset.REASON_CLEAR = 24;
	nexacro.NormalDataset.REASON_SORTGROUP = 30;
	nexacro.NormalDataset.REASON_FILTER = 31;
	nexacro.NormalDataset.REASON_MOVE = 32;
	nexacro.NormalDataset.REASON_EXCHANGE = 33;
	nexacro.NormalDataset.REASON_CHANGELAYOUT = 34;
	nexacro.NormalDataset.REASON_CHANGESTATUS = 40;
	nexacro.NormalDataset.REASON_ENABLEEVENT = 41;

	nexacro.NormalDataset.REASON_ROWCHANGE = 51;
	nexacro.NormalDataset.REASON_ROWINDEXCHANGE = 52;
	nexacro.NormalDataset.REASON_ROWOBJECTCHANGE = 53;

	nexacro.NormalDataset.REASON_BINDSOURCE = 90;

	_pNormalDataset.on_created = function () {
		if (this.url == "" || this.preload == false) {
			if (this.colcount > 0) {
				this._endLoad(0, "SUCCESS", 3);
			}
		}

		if (!nexacro.isDesignMode && this.preload && !this._is_preloaded) {
			if (this.url && this.parent) {
				var bLoaded = false;

				var keys = [];
				keys.push("__preload");
				keys.push(this.url);
				keys.push(this.id);
				keys.push(this.serverdatasetid);
				var svcid = keys.join('_');

				var url = application._getServiceLocation(this.url);

				var loadmanager = this.parent._load_manager;
				if (loadmanager) {
					var data = loadmanager.getPreloadDataModule(this.id);
					if (data) {
						var outds = this.id + "=" + this.serverdatasetid;
						var tritem = new nexacro.TransactionItem(url, this.parent, svcid, "", outds, "", 0, true);
						tritem._usewaitcursor = false;
						tritem._loadFromData(data);
						this._is_preloaded = true;
					}
				}
			}
		}

		this._defaultKeyStr = this.keystring;
		this._defaultFilterStr = this.filterstr;
	};

	_pNormalDataset.destroy = function () {
		nexacro.Dataset.prototype.destroy.call(this);
		this._refform = null;
	};

	_pNormalDataset.set_url = function (v) {
		this.url = v;
	};
	_pNormalDataset.set_arguments = function (v) {
		this.arguments = v;
	};
	_pNormalDataset.set_firefirstcount = function (v) {
		v = parseInt(v) | 0;
		if (isFinite(v)) {
			this.firefirstcount = v;
		}
	};
	_pNormalDataset.set_firenextcount = function (v) {
		v = parseInt(v) | 0;
		if (isFinite(v)) {
			this.firenextcount = v;
		}
	};
	_pNormalDataset.set_preload = function (v) {
		this.preload = v;
	};
	_pNormalDataset.set_serverdatasetid = function (v) {
		this.serverdatasetid = v;
	};

	_pNormalDataset.load = function (async, datatype) {
		var baseurl;
		if (this._refform) {
			baseurl = this._refform._getRefFormBaseUrl();
		}
		var url = application._getServiceLocation(this.url, baseurl);

		if (url.length && this.parent) {
			var svcid = "__normaldataset_loadurl_" + this.id;
			var loadmanager = this.parent._load_manager;
			if (loadmanager) {
				var serverdatasetid = this.serverdatasetid;
				if (serverdatasetid == null || serverdatasetid.length == 0) {
					serverdatasetid = "output";
				}
				var outds = this.id + "=" + serverdatasetid;
				var service = application._getServiceObject(this.url, true);
				loadmanager.loadDataModule(url, svcid, "", outds, this.arguments, null, async, datatype, false, service);
			}
		}
		else {
			this._endLoad(-1, "empty url", 3);
		}
	};

	_pNormalDataset.on_preload_data = function (url, errstatus, data, fireerrorcode, returncode, requesturi, locationuri) {
		if (errstatus != 0) {
			application._onHttpSystemError(this, true, this, fireerrorcode, url, returncode, requesturi, locationuri);
		}
		else if (data && !this._is_preloaded) {
			var keys = [];
			keys.push("__preload");
			keys.push(this.url);
			keys.push(this.id);
			keys.push(this.serverdatasetid);
			var svcid = keys.join('_');

			var outds = this.id + "=" + this.serverdatasetid;
			var tritem = new nexacro.TransactionItem(this.url, this.parent, svcid, "", outds, "", 0, true);
			tritem._usewaitcursor = false;
			tritem._loadFromData(data);
			this._is_preloaded = true;
		}
	};

	delete _pNormalDataset;
}
