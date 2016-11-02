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
	if (!nexacro._init_deviceobjs_api) {
		nexacro._init_deviceobjs_api = true;

		nexacro._createFileDialogObject = function (target) {
			return nexacro.__createFileDialogObject(target, target.on_close);
		};
		nexacro._setFileDialogHandleDefaultExtension = function (target, v) {
			return nexacro.__setFileDialogHandleDefaultExtension(target._handle, v);
		};
		nexacro._setFileDialogHandleFilter = function (target, v) {
			return nexacro.__setFileDialogHandleFilter(target._handle, v);
		};
		nexacro._setFileDialogHandleFilterIndex = function (target, v) {
			return nexacro.__setFileDialogHandleFilterIndex(target._handle, v);
		};
		nexacro._setFileDialogHandleAsync = function (target, v) {
			return nexacro.__setFileDialogHandleAsync(target._handle, v);
		};
		nexacro._openFileDialogHandle = function (target, strTitle, constOpenMode, strInitialPath, strFileName) {
			return nexacro.__openFileDialogHandle(target._handle, target._winhandle, strTitle, constOpenMode, strInitialPath, strFileName);
		};

		nexacro._createVirtualFileObject = function (target) {
			return nexacro.__createVirtualFileObject(target, target.on_success, target.on_error);
		};
		nexacro._setVirtualFileHandleAsync = function (target, v) {
			return nexacro.__setVirtualFileHandleAsync(target._handle, v);
		};
		nexacro._openVirtualFileHandle = function (target, strFileName, nOptions) {
			return nexacro.__openVirtualFileHandle(target._handle, strFileName, nOptions);
		};
		nexacro._closeVirtualFileHandle = function (target) {
			return nexacro.__closeVirtualFileHandle(target._handle);
		};
		nexacro._readVirtualFileHandle = function (target, nLength, strCharset) {
			return nexacro.__readVirtualFileHandle(target._handle, nLength, strCharset);
		};
		nexacro._readlineVirtualFileHandle = function (target, strDelimeter, strCharset) {
			return nexacro.__readlineVirtualFileHandle(target._handle, strDelimeter, strCharset);
		};
		nexacro._seekVirtualFileHandle = function (target, nOffset, nOption) {
			return nexacro.__seekVirtualFileHandle(target._handle, nOffset, nOption);
		};
		nexacro._writeVirtualFileHandle = function (target, varData, strCharset) {
			return nexacro.__writeVirtualFileHandle(target._handle, varData, strCharset);
		};
		nexacro._removeVirtualFileHandle = function (target, strDeletePath) {
			return nexacro.__removeVirtualFileHandle(target._handle, strDeletePath);
		};
		nexacro._getFileListVirtualFileHandle = function (target, strPath, strSearchExpr, nOptions) {
			return nexacro.__getFileListVirtualFileHandle(target._handle, strPath, strSearchExpr, nOptions);
		};
		nexacro._getFileSizeVirtualFileHandle = function (target, strfullpath) {
			return nexacro.__getFileSizeVirtualFileHandle(target._handle, strfullpath);
		};
		nexacro._isExistVirtualFileHandle = function (target, isExistPath) {
			return nexacro.__isExistVirtualFileHandle(target._handle, isExistPath);
		};
		nexacro._createDirectoryVirtualFileHandle = function (target, strPath, bAllCreate) {
			return nexacro.__createDirectoryVirtualFileHandle(target._handle, strPath, bAllCreate);
		};
		nexacro._deleteDirectoryVirtualFileHandle = function (target, strPath, bAllChild) {
			return nexacro.__deleteDirectoryVirtualFileHandle(target._handle, strPath, bAllChild);
		};
		nexacro._renameDirectoryVirtualFileHandle = function (target, strPath, strNewName) {
			return nexacro.__renameDirectoryVirtualFileHandle(target._handle, strPath, strNewName);
		};

		nexacro._showModalSync = function (childframe, str_id, _parent_frame, arr_arg, opener) {
			if (childframe != null) {
				return childframe._showModalSync(str_id, _parent_frame, arr_arg, opener);
			}
		};

		nexacro._showModalWindow = function (childframe, str_id, parent_frame, arr_arg, opener) {
			if (childframe) {
				return childframe._showModalWindow(str_id, parent_frame, arr_arg, opener);
			}
		};

		nexacro._attachChildFrame = nexacro._emptyFn;

		nexacro._setIconWidget = function (strWidgetId, strWidgetIconPath) {
			var widgetFrame = nexacro.Application.popupframes.get_item(strWidgetId);

			if (widgetFrame && widgetFrame.widget) {
				if (widgetFrame.titlebar != null) {
					widgetFrame.style.set_icon(strWidgetIconPath);
				}
				else {
					if (strWidgetIconPath) {
						widgetFrame.style.set_icon(strWidgetIconPath);
						widgetFrame.on_update_style_icon();

						var val = widgetFrame.style.icon ? widgetFrame.style.icon._value : "";
						val = nexacro._getURIValue(val);
						val = nexacro._getImageLocation(val, "");
						var result = nexacro._getImageSize(val, function () {
							var attachedWindow = widgetFrame._getWindow();
							nexacro._setWindowHandleIcon(attachedWindow._handle, val);
						}, this);
						if (result != null) {
							var attachedWindow = widgetFrame._getWindow();
							nexacro._setWindowHandleIcon(attachedWindow._handle, val);
						}
					}
				}
			}
		};
		nexacro._setTopmostWidget = function (strWidgetId, bWidgetTopmost) {
			var widgetFrame = nexacro.Application.popupframes.get_item(strWidgetId);
			if (widgetFrame && widgetFrame.widget) {
				var attachedWindow = widgetFrame._getWindow();
				nexacro.__setWindowHandleTopmost(attachedWindow._handle, bWidgetTopmost);
			}
		};
	}
}
