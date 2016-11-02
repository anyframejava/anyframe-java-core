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

if (!nexacro.Device || nexacro.OS == "iOS") {
	if (!nexacro._init_deviceobjs_api) {
		nexacro._createFileDialogObject = nexacro._emptyFn;
		nexacro._setFileDialogHandleDefaultExtension = nexacro._emptyFn;
		nexacro._setFileDialogHandleFilter = nexacro._emptyFn;
		nexacro._setFileDialogHandleFilterIndex = nexacro._emptyFn;
		nexacro._setFileDialogHandleAsync = nexacro._emptyFn;
		nexacro._openFileDialogHandle = nexacro._emptyFn;

		nexacro._createVirtualFileObject = nexacro._emptyFn;
		nexacro._setVirtualFileHandleFileName = nexacro._emptyFn;
		nexacro._setVirtualFileHandleFullPath = nexacro._emptyFn;
		nexacro._setVirtualFileHandlePath = nexacro._emptyFn;
		nexacro._openVirtualFileHandle = nexacro._emptyFn;
		nexacro._closeVirtualFileHandle = nexacro._emptyFn;
		nexacro._readVirtualFileHandle = nexacro._emptyFn;
		nexacro._readlineVirtualFileHandle = nexacro._emptyFn;
		nexacro._seekVirtualFileHandle = nexacro._emptyFn;
		nexacro._writeVirtualFileHandle = nexacro._emptyFn;
		nexacro._removeVirtualFileHandle = nexacro._emptyFn;
		nexacro._getFileListVirtualFileHandle = nexacro._emptyFn;
		nexacro._getFileSizeVirtualFileHandle = nexacro._emptyFn;
		nexacro._isExistVirtualFileHandle = nexacro._emptyFn;
		nexacro._createDirectoryVirtualFileHandle = nexacro._emptyFn;
		nexacro._deleteDirectoryVirtualFileHandle = nexacro._emptyFn;
		nexacro._renameDirectoryVirtualFileHandle = nexacro._emptyFn;

		nexacro._showModalSync = nexacro._emptyFn;
		nexacro._showModalWindow = nexacro._emptyFn;

		nexacro._attachChildFrame = function (_cur_win, _doc, key, adl_url, div_id, fdl_url) {
			nexacro.__attachChildFrame(_cur_win, _doc, key, adl_url, div_id, fdl_url);
		};

		nexacro._setIconWidget = nexacro._emptyFn;
		nexacro._setTopmostWidget = nexacro._emptyFn;
	}

	if (!nexacro.FileDialog && nexacro.OS != "iOS") {
		nexacro.FileDialog = function (id, parent) {
			this.id = this.name = id;
			if (parent) {
				this.parent = parent;
				var curFrame = parent._getOwnerFrame();
				if (curFrame._window) {
					this._winhandle = curFrame._window._handle;
				}
				else {
					this._winhandle = nexacro._getMainWindowHandle();
				}
			}

			this.defaultextension = true;
			this.filter = "";
			this.filterindex = 0;
			this.async = "true";

			this._event_list = {
				"onclose" : 1, 
				"onerror" : 1
			};

			this.onclose = null;
			this.onerror = null;

			this._handle = nexacro._createFileDialogObject(this);
		};

		nexacro.FileDialog.LOAD = 1;
		nexacro.FileDialog.SAVE = 2;
		nexacro.FileDialog.MULTILOAD = 3;
		nexacro.FileDialog.SELFOLDER = 4;

		var _pFileDialog = nexacro.FileDialog.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.FileDialog);

		_pFileDialog._type_name = "FileDialog";

		_pFileDialog.on_created = function () {
		};
		_pFileDialog.destroy = function () {
			if (this._handle) {
				this._handle = null;
			}

			return true;
		};
		_pFileDialog.set_defaultextension = function (v) {
			if (this.pramck_filedialog_defaultextension(v)) {
				v = nexacro._toBoolean(v);
				this.defaultextension = v;
				nexacro._setFileDialogHandleDefaultExtension(this, v);

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
				nexacro._setFileDialogHandleFilter(this, v);

				return true;
			}
			else {
				return false;
			}
		};
		_pFileDialog.set_filterindex = function (v) {
			if (this.pramck_filedialog_numbercheck(v)) {
				this.filterindex = v;
				nexacro._setFileDialogHandleFilterIndex(this, v);

				return true;
			}
			else {
				return false;
			}
		};
		_pFileDialog.set_async = function (v) {
			if (v == "true" || v == "false" || v == true || v == false) {
				v = nexacro._toBoolean(v);
				this.async = v;
				nexacro._setFileDialogHandleAsync(this, v);

				return true;
			}
			else {
				return false;
			}
		};
		_pFileDialog.open = function (strTitle, constOpenMode, strInitialPath, strFileName) {
			if (strInitialPath == null && strFileName == null) {
				strInitialPath = "%USERAPP%";
				strFileName = "";
			}
			else if (strFileName == null) {
				strFileName = "";
			}
			else if (strFileName != null) {
			}
			else {
				return false;
			}

			if (!this.pramck_filedialogOpen(strTitle, constOpenMode, strInitialPath, strFileName)) {
				return false;
			}

			if (this.filter == "") {
				var filter = "All(*.*)|*.*|";

				this.filter = filter;
				this.set_filter(filter);
			}

			var filterarr = this.filter.split("|");

			if (this.defaultextension == true && this.filterindex >= (filterarr.length / 2)) {
				return false;
			}

			if (this._handle) {
				nexacro._openFileDialogHandle(this, strTitle, constOpenMode, strInitialPath, strFileName);
			}

			return true;
		};

		_pFileDialog.on_close = function (reason, path, virtualfiles) {
			var _virtualFile = virtualfiles;
			var arr = new Array(_virtualFile.length);

			for (var i = 0; i < _virtualFile.length; i++) {
				var obj = new nexacro.VirtualFile("VirtualFile", "");

				obj.filename = _virtualFile[i].filename;
				obj.fullpath = _virtualFile[i].fullpath;
				obj.path = _virtualFile[i].path;
				arr[i] = obj;

				if (obj._handle) {
					obj._handle = null;
				}
			}

			var e = new nexacro.FileDialogEventInfo("onclose", reason, path, arr);
			this.on_fire_onclose(this, e);
		};

		_pFileDialog.on_fire_onclose = function (objFileDialog, eFileDialogEventInfo) {
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

			if (!this._publicNumCheck(property)) {
				return false;
			}
			return true;
		};
		_pFileDialog.pramck_filedialogOpen = function (strTitle, constOpenMode, strInitialPath, strFileName) {
			if (strTitle == null || typeof (strTitle) == "undefined") {
				return false;
			}

			if (constOpenMode == null || typeof (constOpenMode) == "undefined") {
				return false;
			}
			else {
				if (!this._publicNumCheck(constOpenMode)) {
					return false;
				}

				if (constOpenMode > 4 || constOpenMode < 1) {
					return false;
				}
			}

			if (strInitialPath == null || typeof (strInitialPath) == "undefined") {
				return false;
			}

			if (strFileName == null || typeof (strFileName) == "undefined") {
				return false;
			}

			return true;
		};
		_pFileDialog._publicNumCheck = function (v) {
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
		delete _pFileDialog;
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

		delete _pFileDialogEventInfo;
	}
}

if (!nexacro.Device || nexacro.OS == "Android" || nexacro.OS == "iOS") {
	if (!nexacro.VirtualFile) {
		nexacro.VirtualFile = function (id, parent) {
			if (nexacro.OS == "iOS") {
				this._id = nexacro.Device.makeID();
				nexacro.Device._userCreatedObj[this._id] = this;
			}

			this.id = this.name = id;
			if (parent) {
				this.parent = parent;
			}

			this.filename = "";
			this.fullpath = "";
			this.path = "";
			this.async = "true";

			this._event_list = {
				"onsuccess" : 1, 
				"onerror" : 1
			};

			this._ref_file = null;

			this.onsuccess = null;
			this.onerror = null;

			this._handle = nexacro._createVirtualFileObject(this);

			if (nexacro.OS == "iOS") {
				var params = '{"strFilename":"' + this.filename + '","fullpath":"' + this.fullpath + '","path":"' + this.path + '"}';
				var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"constructor", "params":' + params + '}';
				nexacro.Device.exec(jsonstr);
			}
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

		var _pVirtualFile = nexacro.VirtualFile.prototype = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.VirtualFile);

		_pVirtualFile._type_name = "VirtualFile";

		_pVirtualFile.on_created = function () {
		};
		_pVirtualFile.destroy = function () {
			if (this._ref_file) {
				this._ref_file = null;
			}
			if (this._handle) {
				this._handle = null;
			}

			if (nexacro.OS == "iOS") {
				var params = '""';
				var jsonstr;

				delete nexacro.Device._userCreatedObj[this._id];
				jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"destroy", "params":' + params + '}';
				nexacro.Device.exec(jsonstr);
			}

			return true;
		};
		_pVirtualFile.set_filename = function (v) {
			if (this.pramck_virtualproperty(v)) {
				this.filename = v;
				nexacro._setVirtualFileHandleFileName(this, v);

				return true;
			}
			else {
				return false;
			}
		};
		_pVirtualFile.set_fullpath = function (v) {
			if (this.pramck_virtualproperty(v)) {
				this.fullpath = v;
				nexacro._setVirtualFileHandleFullPath(this, v);

				return true;
			}
			else {
				return false;
			}
		};
		_pVirtualFile.set_path = function (v) {
			if (this.pramck_virtualproperty(v)) {
				this.path = v;
				nexacro._setVirtualFileHandlePath(this, v);

				return true;
			}
			else {
				return false;
			}
		};
		_pVirtualFile.set_async = function (v) {
			if (v == "true" || v == "false" || v == true || v == false || nexacro.OS != "iOS") {
				v = nexacro._toBoolean(v);
				this.async = v;

				nexacro._setVirtualFileHandleAsync(this, v);
				return true;
			}
			else {
				return false;
			}
		};
		_pVirtualFile.set_filename = nexacro._emptyFn;
		_pVirtualFile.set_fullpath = nexacro._emptyFn;
		_pVirtualFile.set_path = nexacro._emptyFn;


		_pVirtualFile.open = function (strFileName, nOptions) {
			var nConstOptions = "";
			var fullpath = "";

			if (strFileName == null) {
				nConstOptions = strFileName;
			}
			else if (strFileName != null) {
				nConstOptions = nOptions;
				fullpath = strFileName;

				fullpath = fullpath.split("\\").join("/");
				this.fullpath = fullpath;
				this.set_fullpath(fullpath);
			}
			else {
				return false;
			}

			var index_path = fullpath.lastIndexOf("/");
			if (index_path == -1) {
				index_path = fullpath.lastIndexOf("%");
			}
			var path = path = fullpath.substring(0, index_path + 1);

			this.path = path;
			this.set_path(path);

			var index_name = fullpath.lastIndexOf("/");
			if (index_name == -1) {
				index_name = fullpath.lastIndexOf("%");
			}
			var filename = fullpath.substring(index_name + 1, fullpath.length);

			this.filename = filename;
			this.set_filename(filename);

			if (!this.pramck_open(path, nConstOptions)) {
				return false;
			}

			if (this._handle) {
				nexacro._openVirtualFileHandle(this, strFileName, nConstOptions);
			}

			if (nexacro.OS == "iOS") {
				var iosfilepath = "";
				var rootPathCheck = fullpath.substring(0, 9);

				if (rootPathCheck.toLowerCase() == "%userapp%") {
					iosfilepath = "_userapp_" + fullpath.substring(9, fullpath.length);
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

				var params = "";
				params = '{"strFilename":"' + this.strFilename + '","nOptions":"' + nConstOptions + '"}';

				var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"open", "params":' + params + '}';
				nexacro.Device.exec(jsonstr);
			}
			return true;
		};

		_pVirtualFile.close = function () {
			if (this._handle) {
				nexacro._closeVirtualFileHandle(this);
			}
			if (nexacro.OS == "iOS") {
				var params = '""';
				var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"close", "params":' + params + '}';
				nexacro.Device.exec(jsonstr);
			}
		};
		_pVirtualFile.read = function (nLength, strCharset) {
			var _nLen = -1;
			var _strCharset = "utf-8";

			if (arguments.length == 1) {
				_nLen = nLength || -1;
			}
			else if (arguments.length == 2) {
				_nLen = nLength;
				_strCharset = strCharset;
			}

			if (!this.pramck_Read(_nLen)) {
				return false;
			}

			if (this._handle) {
				nexacro._readVirtualFileHandle(this, _nLen, _strCharset);
			}

			if (nexacro.OS == "iOS") {
				var params = '{  "nLength":"' + _nLen;
				params += '", "strCharset":"' + _strCharset;
				params += '"}';

				var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"read", "params":' + params + '}';
				nexacro.Device.exec(jsonstr);
			}

			return true;
		};
		_pVirtualFile.readLine = function (strDelimeter, strCharset) {
			var _strDelimeter = "";
			var _strCharset = "utf-8";
			if (arguments.length == 1) {
				_strDelimeter = strDelimeter;
			}
			else if (arguments.length == 2) {
				_strDelimeter = strDelimeter;
				_strCharset = strCharset;
			}
			if (!this.pramck_ReadLine(_strDelimeter)) {
				return false;
			}

			if (this._handle) {
				nexacro._readlineVirtualFileHandle(this, _strDelimeter, _strCharset);
			}

			if (nexacro.OS == "iOS") {
				var params = '{  "strDelimeter":"' + _strDelimeter;
				params += '", "strCharset":"' + _strCharset;
				params += '"}';

				var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"readLine", "params":' + params + '}';
				nexacro.Device.exec(jsonstr);
			}
			return true;
		};
		_pVirtualFile.seek = function (nOffset, nOption) {
			var _nOffset = "";
			var _nOption = "";

			if (arguments.length == 1) {
				_nOffset = nOffset;
				_nOption = VirtualFile.seekCurrent;
			}
			else if (arguments.length == 2) {
				_nOffset = nOffset;
				_nOption = nOption;
			}
			if (!this.paramck_Seek(_nOffset, _nOption)) {
				return false;
			}

			if (this._handle) {
				nexacro._seekVirtualFileHandle(this, _nOffset, _nOption);
			}

			if (nexacro.OS == "iOS") {
				var params = '{  "nOffset":"' + _nOffset;
				params += '", "nOption":"' + _nOption;
				params += '"}';
				var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"seek", "params":' + params + '}';
				nexacro.Device.exec(jsonstr);
			}
			return true;
		};
		_pVirtualFile.write = function (varData, strCharset) {
			var _varData = varData;
			var _strCharset = "utf-8";

			if (typeof (_varData) == "undefined" || _varData.length == 0) {
				return false;
			}
			if (arguments.length == 2) {
				_strCharset = strCharset;
			}

			if (this._handle) {
				nexacro._writeVirtualFileHandle(this, _varData, _strCharset);
			}

			if (nexacro.OS == "iOS") {
				var params = '{  "varData":"' + _varData;
				params += '", "strCharset":"' + _strCharset;
				params += '"}';
				var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"write", "params":' + params + '}';
				nexacro.Device.exec(jsonstr);
			}
			return true;
		};
		_pVirtualFile.remove = function (strFilePath) {
			var _strFilePath = "";
			if (strFilePath instanceof nexacro.VirtualFile) {
				_strFilePath = strFilePath.fullpath;
			}
			else {
				_strFilePath = strFilePath;
			}
			if (!this.pramck_Delete(_strFilePath)) {
				return false;
			}

			if (this._handle) {
				nexacro._removeVirtualFileHandle(this, _strFilePath);
			}

			if (nexacro.OS == "iOS") {
				var deletetPath = "";
				var rootPathCheck = "";
				var iosfilepath = "";

				rootPathCheck = _strFilePath.substring(0, 9);
				if (rootPathCheck.toLowerCase() == "%userapp%") {
					iosfilepath = "_userapp_" + _strFilePath.substring(9, _strFilePath.length);
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

				var params = '{"strFilePath":"' + deletetPath + '"}';
				var jsonstr = '{"id":' + this._id + ',"div":"VirtualFile", "method":"remove", "params":' + params + '}';
				nexacro.Device.exec(jsonstr);
			}
			return true;
		};
		_pVirtualFile.getFileList = function (strPath, strSearchExpr, nOptions) {
			var _strPath = strPath;
			var _strSearchExpr = strSearchExpr;
			var nConstOptions = nOptions;

			if (typeof (nConstOptions) == "undefined") {
				nConstOptions = VirtualFile.findAll;
			}

			if (strPath == null || strSearchExpr == null || !this.pramck_GetFileList(_strPath, _strSearchExpr, nConstOptions)) {
				return false;
			}

			if (arguments.length < 2) {
				return false;
			}

			if (this._handle) {
				nexacro._getFileListVirtualFileHandle(this, _strPath, _strSearchExpr, nConstOptions);
			}

			if (nexacro.OS == "iOS") {
				var params = '{"strPath":"' + _strPath + '" ,"strSearchExpr":"' + _strSearchExpr
					 + '","constOption":"' + nConstOptions + '"}';

				var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"getFileList", "params":' + params + '}';
				nexacro.Device.exec(jsonstr);
			}
			return true;
		};
		_pVirtualFile.getFileSize = function () {
			var ret = 0;


			if (this._handle) {
				if (this.fullpath != null && this.fullpath != "") {
					ret = nexacro._getFileSizeVirtualFileHandle(this, this.fullpath);
				}
			}
			else {
				if (this._ref_file) {
					ret = this._ref_file.size;
				}
			}

			if (nexacro.OS == "iOS") {
				var params;
				var iosfilepath = "";
				var rootPathCheck = this.fullpath.substring(0, 9);
				if (rootPathCheck.toLowerCase() == "%userapp%") {
					iosfilepath = "_userapp_" + this.fullpath.substring(9, this.fullpath.length);
				}

				params = '{  "strPath":"' + iosfilepath + '"}';
				var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"getFileSize", "params":' + params + '}';
				nexacro.Device.exec(jsonstr);
			}

			return ret;
		};
		_pVirtualFile.isExist = function (strPath) {
			if (!this.pramck_IsExist(strPath)) {
				return false;
			}

			if (this._handle) {
				nexacro._isExistVirtualFileHandle(this, strPath);
			}

			if (nexacro.OS == "iOS") {
				var params = '{  "strPath":"' + strPath + '"}';
				var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"isExist", "params":' + params + '}';
				nexacro.Device.exec(jsonstr);
			}
			return true;
		};
		_pVirtualFile.createDirectory = function (strPath, bAllCreate) {
			if (!this.pramck_IsExist(strPath)) {
				return false;
			}

			if (arguments.length == 1) {
				this.strPath = strPath;
				this.bAllCreate = false;
			}
			else if (arguments.length == 2) {
				this.strPath = strPath;
				this.bAllCreate = nexacro._toBoolean(bAllCreate);
			}
			else {
				return false;
			}

			if (this._handle) {
				nexacro._createDirectoryVirtualFileHandle(this, strPath, this.bAllCreate);
			}

			if (nexacro.OS == "iOS") {
				var strInitialPath = "";
				var strDestPath = "";
				var rootPathCheck = strPath.substring(0, 9);

				if (rootPathCheck.toLowerCase() == "%userapp%") {
					strInitialPath = "_userapp_" + strPath.substring(9, strPath.length);
				}
				else {
					return false;
				}
				var params = '{  "strPath":"' + strInitialPath
					 + '","bAllCreate":"' + this.bAllCreate + '"}';
				var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"createDirectory", "params":' + params + '}';
				nexacro.Device.exec(jsonstr);
			}
			return true;
		};
		_pVirtualFile.deleteDirectory = function (strPath, bAllChild) {
			if (!this.pramck_IsExist(strPath)) {
				return false;
			}

			if (arguments.length == 1) {
				this.strPath = strPath;
				this.bAllChild = false;
			}
			else if (arguments.length == 2) {
				this.strPath = strPath;
				this.bAllChild = nexacro._toBoolean(bAllChild);
			}
			else {
				return false;
			}

			if (this._handle) {
				nexacro._deleteDirectoryVirtualFileHandle(this, strPath, this.bAllChild);
			}

			if (nexacro.OS == "iOS") {
				var strInitialPath = "";
				var rootPathCheck = strPath.substring(0, 9);
				if (rootPathCheck.toLowerCase() == "%userapp%") {
					strInitialPath = "_userapp_" + strPath.substring(9, strPath.length);
				}
				else {
					return false;
				}

				var params = '{  "strPath":"' + strInitialPath
					 + '","bAllChild":"' + this.bAllChild + '"}';
				var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"deleteDirectory", "params":' + params + '}';
				nexacro.Device.exec(jsonstr);
			}
			return true;
		};
		_pVirtualFile.renameDirectory = function (strPath, strNewName) {
			if (!this.pramck_IsExist(strPath)) {
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

			if (this._handle) {
				nexacro._renameDirectoryVirtualFileHandle(this, strPath, strNewName);
			}

			if (nexacro.OS == "iOS") {
				var params = '{  "strPath":"' + strPath
					 + '","strNewName":"' + strNewName + '"}';
				var jsonstr = '{"id":' + this._id + ', "div":"VirtualFile", "method":"renameDirectory", "params":' + params + '}';
				nexacro.Device.exec(jsonstr);
			}
			return true;
		};
		_pVirtualFile.on_success = function (reason, textdata, bindata, fileattributelist, filesize, fileisexist) {
			var _textdata = "";
			var _bindata = "";
			var temptxtlen = 0;
			var tempbinlen = 0;

			if (textdata) {
				temptxtlen = textdata.length;
			}
			if (bindata) {
				tempbinlen = bindata.length;
			}

			if (temptxtlen > 0) {
				_textdata = textdata.replace(/\&amp\;/g, "&");
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
				_bindata = bindata.replace(/\&amp\;/g, "&");
				_bindata = _bindata.replace(/\&lt\;/g, "<");
				_bindata = _bindata.replace(/\&gt\;/g, ">");
				_bindata = _bindata.replace(/\&quot\;/g, "\"");
				_bindata = _bindata.replace(/\&apos\;/g, "'");
				_bindata = _bindata.replace(/\&\#32\;/g, " ");
				_bindata = _bindata.replace(/\&\#13\;/g, "\r");
				_bindata = _bindata.replace(/\&\#10\;/g, "\n");
				_bindata = _bindata.replace(/\&\#9\;/g, "\t");
			}

			var e = new nexacro.VirtualFileEventInfo("onsuccess", reason, _textdata, _bindata, fileattributelist, filesize, fileisexist);
			this.on_fire_onsuccess(this, e);
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
			this.on_fire_onsuccess(this, e);
		};

		_pVirtualFile.on_fire_onsuccess = function (objAsyncVFile, eAsyncVFileEventInfo) {
			if (this.onsuccess && this.onsuccess._has_handlers) {
				return this.onsuccess._fireEvent(this, eAsyncVFileEventInfo);
			}
			return true;
		};

		_pVirtualFile.on_error = function (errorcode, errormsg) {
			var e = new nexacro.VirtualFileErrorEventInfo("onerror", errorcode, errormsg);
			this.on_fire_onerror(this, e);
		};

		_pVirtualFile._onerror = function (objData) {
			var e = new nexacro.VirtualFileErrorEventInfo("onerror", objData.errorcode, objData.errormsg);
			this.on_fire_onerror(this, e);
		};

		_pVirtualFile.on_fire_onerror = function (objAsyncVFile, eAsyncVFileErrorEventInfo) {
			if (this.onerror && this.onerror._has_handlers) {
				return this.onerror._fireEvent(this, eAsyncVFileErrorEventInfo);
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
		_pVirtualFile.pramck_open = function (strFileName, nOptions) {
			if (nOptions == null) {
				if (typeof (strFileName) == "undefined" || strFileName == "" || strFileName == null) {
					return false;
				}

				if (!this._publicNumCheck(strFileName)) {
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

			if (!this._publicNumCheck(nOptions)) {
				return false;
			}
			return true;
		};
		_pVirtualFile.pramck_Read = function (nLength) {
			if (nLength == null || typeof (nLength) == "undefined") {
				return false;
			}

			if (!this._publicNumCheck(nLength)) {
				return false;
			}
			return true;
		};
		_pVirtualFile.pramck_ReadLine = function (strDelimeter) {
			if (strDelimeter == null || typeof (strDelimeter) == "undefined" || typeof (strDelimeter) != "string") {
				return false;
			}

			return true;
		};
		_pVirtualFile.paramck_Seek = function (nOffset, nOption) {
			if (nOffset == null || typeof (nOffset) == "undefined") {
				return false;
			}

			if (nOption == null || typeof (nOption) == "undefined") {
				return false;
			}

			if (!this._publicNumCheck(nOffset)) {
				return false;
			}
			return true;
		};
		_pVirtualFile.pramck_Delete = function (strFilePath) {
			if (strFilePath == null || typeof (strFilePath) == "undefined" || strFilePath == "") {
				return false;
			}
			else {
				return true;
			}
		};
		_pVirtualFile.pramck_IsExist = function (strPath) {
			if (strPath == null || typeof (strPath) == "undefined" || strPath == "" || typeof (strPath) != "string") {
				return false;
			}
			else {
				return true;
			}
		};
		_pVirtualFile.pramck_GetFileList = function (strPath, strSearchExpr, constOption) {
			if (strPath == null || typeof (strPath) == "undefined" || strPath == "" || typeof (strPath) != "string") {
				return false;
			}

			if (strSearchExpr == null || typeof (strSearchExpr) == "undefined" || strSearchExpr == "" || typeof (strSearchExpr) != "string") {
				return false;
			}

			if (constOption == null || typeof (constOption) == "undefined" || constOption == "") {
				return false;
			}

			if (!this._publicNumCheck(constOption)) {
				return false;
			}
			return true;
		};
		_pVirtualFile._publicNumCheck = function (v) {
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
		_pVirtualFile._setRefFile = function (file) {
			this._ref_file = file;
			this.filename = file.name;
		};
		delete _pVirtualFile;
	}

	if (!nexacro.VirtualFileEventInfo) {
		nexacro.VirtualFileEventInfo = function (strEventId, strReason, strTextdata, strBinarydata, strFilelist, strFilesize, strExist) {
			this.eventid = strEventId;
			this.reason = strReason;
			this.textdata = strTextdata;
			this.binarydata = strBinarydata;


			if (nexacro.OS == "iOS") {
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
			}
			else {
				var jsonObject = eval('(' + strFilelist + ')');
				if (jsonObject == undefined) {
					this.fileattributelist = "";
				}
				else {
					var fileattrlist = jsonObject.fileattrlist;
					var tempArr = new Array(fileattrlist.length);

					for (var i = 0; i < fileattrlist.length; i++) {
						tempArr[i] = new nexacro.FileAttribute(fileattrlist[i]);
					}
					this.fileattributelist = tempArr;
				}
			}
			this.filesize = strFilesize;
			this.fileisexist = strExist;
		};
		var _pVirtualFileEventInfo = nexacro.VirtualFileEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.VirtualFileEventInfo);

		_pVirtualFileEventInfo._type_name = "VirtualFileEventInfo";

		delete _pVirtualFileEventInfo;
	}

	if (!nexacro.VirtualFileErrorEventInfo) {
		nexacro.VirtualFileErrorEventInfo = function (strEventId, intErrorCode, strErrorMsg) {
			this.id = this.eventid = strEventId;
			this.errortype = "ObjectError";
			this.statuscode = intErrorCode;
			this.errormsg = strErrorMsg;
		};
		var _pVirtualFileErrorEventInfo = nexacro.VirtualFileErrorEventInfo.prototype = nexacro._createPrototype(nexacro.Event, nexacro.VirtualFileErrorEventInfo);

		_pVirtualFileErrorEventInfo._type_name = "VirtualFileErrorEventInfo";

		delete _pVirtualFileErrorEventInfo;
	}

	if (!nexacro.FileAttribute) {
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
		delete _pFileAttribute;
	}

	if (nexacro.Application) {
		nexacro.Application.setIconWidget = function (strWidgetId, strWidgetIconPath) {
			nexacro._setIconWidget(strWidgetId, strWidgetIconPath);
		};

		nexacro.Application.setTopmostWidget = function (strWidgetId, bWidgetTopmost) {
			nexacro._setTopmostWidget(strWidgetId, bWidgetTopmost);
		};
	}
}
