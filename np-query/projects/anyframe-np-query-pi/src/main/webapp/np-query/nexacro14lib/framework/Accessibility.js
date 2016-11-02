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

if (application._enableaccessibility) {
	if (nexacro._accessibilitytype != application._accessibilitytype) {
		nexacro._accessibilitytype = application._accessibilitytype;
		nexacro._attachAccessibilityComponentFunctions();

		nexacro._setAccessibilityDescReadType(application.accessibilitydescreadtype);
	}

	if (nexacro._accessibilitytype == 2) {
		nexacro.AccessibilityUtil.GridHotkeyList = {
		};
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_HOME] = nexacro.AccessibilityUtil.Hotkey.FIRSTCELLINROW;
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_END] = nexacro.AccessibilityUtil.Hotkey.LASTCELLINROW;
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_PAGE_UP] = nexacro.AccessibilityUtil.Hotkey.FIRSTCELLINCOLUMN;
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_PAGE_DOWN] = nexacro.AccessibilityUtil.Hotkey.LASTCELLINCOLUMN;

		nexacro.AccessibilityUtil._usetooltip = false;

		nexacro.AccessibilityUtil.getAccessibilityLabel = function (elem) {
			var strLabel = "";

			if (elem && elem.linkedcontrol) {
				strLabel = elem.accessibility_label;
			}
			return strLabel;
		};

		nexacro.AccessibilityUtil.getAccessibilityAction = function (elem) {
			var strAction = "";
			if (elem) {
				strAction = elem.accessibility_action;
			}
			return strAction;
		};

		nexacro.AccessibilityUtil.getAccessibilityDescription = function (elem) {
			var strDescription = "";
			if (elem) {
				strDescription = elem.accessibility_description;
			}
			return strDescription;
		};

		nexacro.AccessibilityUtil.setDOMNodeLabel = function (node, label) {
			node.innerText = label;
		};

		nexacro.AccessibilityUtil.getAccessibilityAdditionalLabel = function (elem) {
			var strAdditionalLabel = "";
			if (elem) {
				var comp = elem.linkedcontrol;
				strAdditionalLabel = comp._on_getAccessibilityAdditionalLabel() + comp._on_getAccessibilityAdditionalRole();
			}
			return strAdditionalLabel;
		};
	}
	else if (nexacro._accessibilitytype == 3) {
		nexacro.AccessibilityUtil.GridHotkeyList = {
		};
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_HOME] = nexacro.AccessibilityUtil.Hotkey.FIRSTCELL;
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_END] = nexacro.AccessibilityUtil.Hotkey.LASTCELL;
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_SHIFT + " " + nexacro.Event.KEY_UP] = nexacro.AccessibilityUtil.Hotkey.FIRSTCELLINCOLUMN;
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_SHIFT + " " + nexacro.Event.KEY_DOWN] = nexacro.AccessibilityUtil.Hotkey.LASTCELLINCOLUMN;
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_SHIFT + " " + nexacro.Event.KEY_LEFT] = nexacro.AccessibilityUtil.Hotkey.FIRSTCELLINROW;
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_SHIFT + " " + nexacro.Event.KEY_RIGHT] = nexacro.AccessibilityUtil.Hotkey.LASTCELLINROW;

		nexacro.AccessibilityUtil._usetooltip = true;

		nexacro.AccessibilityUtil.getAccessibilityLabel = function (elem) {
			var strLabel = "";
			if (elem) {
				strLabel = elem.accessibility_label;
			}
			return strLabel;
		};

		nexacro.AccessibilityUtil.getAccessibilityAction = function (elem) {
			var strAction = "";
			if (elem) {
				strAction = elem.accessibility_action;
			}
			return strAction;
		};

		nexacro.AccessibilityUtil.getAccessibilityDescription = function (elem) {
			var strDescription = "";
			if (elem) {
				strDescription = elem.accessibility_description;
			}
			return strDescription;
		};

		nexacro.AccessibilityUtil.setDOMNodeLabel = function (node, label) {
			node.setAttribute("aria-live", "assertive");
			node.innerHTML = label;
		};
	}
	else if (nexacro._accessibilitytype == 4) {
		nexacro.AccessibilityUtil.GridHotkeyList = {
		};
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_HOME] = nexacro.AccessibilityUtil.Hotkey.FIRSTCELL;
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_END] = nexacro.AccessibilityUtil.Hotkey.LASTCELL;
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_SHIFT + " " + nexacro.Event.KEY_UP] = nexacro.AccessibilityUtil.Hotkey.FIRSTCELLINCOLUMN;
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_SHIFT + " " + nexacro.Event.KEY_DOWN] = nexacro.AccessibilityUtil.Hotkey.LASTCELLINCOLUMN;
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_SHIFT + " " + nexacro.Event.KEY_LEFT] = nexacro.AccessibilityUtil.Hotkey.FIRSTCELLINROW;
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_SHIFT + " " + nexacro.Event.KEY_RIGHT] = nexacro.AccessibilityUtil.Hotkey.LASTCELLINROW;

		nexacro.AccessibilityUtil._usetooltip = true;

		nexacro.AccessibilityUtil.getAccessibilityLabel = function (elem) {
			var strLabel = "";
			if (elem) {
				strLabel = elem.accessibility_label;
			}
			return strLabel;
		};

		nexacro.AccessibilityUtil.getAccessibilityAction = function (elem) {
			var strAction = "";
			if (elem) {
				strAction = elem.accessibility_action;
			}
			return strAction;
		};

		nexacro.AccessibilityUtil.getAccessibilityDescription = function (elem) {
			var strDescription = "";
			if (elem) {
				strDescription = elem.accessibility_description;
			}
			return strDescription;
		};

		nexacro.AccessibilityUtil.setDOMNodeLabel = function (node, label) {
			node.setAttribute("aria-live", "assertive");
			node.innerHTML = label;
		};

		nexacro.AccessibilityUtil.supportMobileApplicationAccessibility = function (container_handle, bForce) {
			var container_element = container_handle._linked_element;

			if (container_element && !bForce) {
				var comp = container_element.parent.linkedcontrol;

				if ((comp && comp._is_component && !comp._is_subcontrol && !(comp._is_form && comp.parent._is_frame) && !comp._is_frame)) {
					if (comp._accessibility_role != "spin" && comp._accessibility_role != "grid" && comp._accessibility_role != "treegrid" && comp._accessibility_role != "radio" && comp._accessibility_role != "listbox"
						 && comp._accessibility_role != "textbox" && comp._accessibility_role != "edit" && comp._accessibility_role != "webbrowser" && comp._accessibility_role != "form") {
						nexacro.__setDOMNodeAccessibilityHidden(container_handle, true);
					}
				}
				else if (comp && (comp instanceof nexacro.ScrollBar)) {
					nexacro.__setDOMNodeAccessibilityHidden(container_handle, true);
				}
			}
			else {
				nexacro.__setDOMNodeAccessibilityHidden(container_handle, true);
			}
		};

		nexacro.AccessibilityUtil.cancelTouchEvent = function (elem) {
			var linkedcontrol = elem ? elem.linkedcontrol : null;
			if (!linkedcontrol && elem.parent) {
				linkedcontrol = elem.parent.linkedcontrol;
				if (linkedcontrol) {
					return elem.parent.accessibility_role == "link";
				}
			}
		};

		nexacro.AccessibilityUtil.getAccessibilityAdditionalLabel = function (elem) {
			var strAdditionalLabel = "";
			if (elem) {
				var comp = elem.linkedcontrol;
				if (comp && (comp._has_inputElement || comp._input_element)) {
					if (!comp.password) {
						if (comp instanceof nexacro.Combo && comp._accessibility_role == "combobox") {
							strAdditionalLabel = (comp.value) ? comp.text : (comp.displaynulltext) ? comp.displaynulltext : "";
						}
						else {
							strAdditionalLabel = (comp._primitivevalue) ? comp._makeCalendarText(comp._primitivevalue) : (comp.value) ? "" : (comp.displaynulltext) ? comp.displaynulltext : "";
						}
					}
				}
				strAdditionalLabel += " " + comp._on_getAccessibilityAdditionalLabel();
			}
			return strAdditionalLabel;
		};
	}
	else if (nexacro._accessibilitytype == 5) {
		nexacro.AccessibilityUtil.GridHotkeyList = {
		};
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_HOME] = nexacro.AccessibilityUtil.Hotkey.FIRSTCELL;
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_END] = nexacro.AccessibilityUtil.Hotkey.LASTCELL;
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_SHIFT + " " + nexacro.Event.KEY_UP] = nexacro.AccessibilityUtil.Hotkey.FIRSTCELLINCOLUMN;
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_SHIFT + " " + nexacro.Event.KEY_DOWN] = nexacro.AccessibilityUtil.Hotkey.LASTCELLINCOLUMN;
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_SHIFT + " " + nexacro.Event.KEY_LEFT] = nexacro.AccessibilityUtil.Hotkey.FIRSTCELLINROW;
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_SHIFT + " " + nexacro.Event.KEY_RIGHT] = nexacro.AccessibilityUtil.Hotkey.LASTCELLINROW;

		nexacro.AccessibilityUtil._usetooltip = true;

		nexacro.AccessibilityUtil.getAccessibilityLabel = function (elem) {
			var strLabel = "";
			if (elem) {
				strLabel = elem.accessibility_label;
			}
			return strLabel;
		};

		nexacro.AccessibilityUtil.getAccessibilityAction = function (elem) {
			var strAction = "";
			if (elem) {
				strAction = elem.accessibility_action;
			}
			return strAction;
		};

		nexacro.AccessibilityUtil.getAccessibilityDescription = function (elem) {
			var strDescription = "";
			if (elem) {
				strDescription = elem.accessibility_description;
			}
			return strDescription;
		};

		nexacro.AccessibilityUtil.setDOMNodeLabel = function (node, label) {
			node.setAttribute("aria-live", "assertive");
			node.innerHTML = label;
		};

		nexacro.AccessibilityUtil.supportMobileApplicationAccessibility = function (control_element, bForce) {
			return;
		};

		nexacro.AccessibilityUtil.unsupportMobileApplicationAccessibility = function (control_element, bForce) {
			return;
		};


		nexacro.AccessibilityUtil.cancelTouchEvent = function (elem) {
			var linkedcontrol = elem ? elem.linkedcontrol : null;
			if (!linkedcontrol && elem.parent) {
				linkedcontrol = elem.parent.linkedcontrol;
				if (linkedcontrol) {
					return elem.parent.accessibility_role == "link";
				}
			}
		};

		nexacro.AccessibilityUtil.getAccessibilityAdditionalLabel = function (elem) {
			var strAdditionalLabel = "";
			if (elem) {
				var comp = elem.linkedcontrol;
				if (comp) {
					if (comp._has_inputElement || comp._input_element) {
						if (!comp.password) {
							if (comp._is_created) {
								if (comp.usedecorate) {
									strAdditionalLabel = comp.displaytext;
								}
								else {
									strAdditionalLabel = comp.text ? comp.text : comp.displaynulltext;
								}
							}
							else {
								strAdditionalLabel = (comp._primitivevalue) ? comp._makeCalendarText(comp._primitivevalue) : (comp.text) ? comp.text : "";
							}
						}
					}
					else {
						strAdditionalLabel += " " + comp._on_getAccessibilityAdditionalLabel();
					}
				}
			}
			return strAdditionalLabel;
		};
	}
	else {
		nexacro.AccessibilityUtil.GridHotkeyList = {
		};
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_HOME] = nexacro.AccessibilityUtil.Hotkey.FIRSTCELL;
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_END] = nexacro.AccessibilityUtil.Hotkey.LASTCELL;
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_SHIFT + " " + nexacro.Event.KEY_UP] = nexacro.AccessibilityUtil.Hotkey.FIRSTCELLINCOLUMN;
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_SHIFT + " " + nexacro.Event.KEY_DOWN] = nexacro.AccessibilityUtil.Hotkey.LASTCELLINCOLUMN;
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_SHIFT + " " + nexacro.Event.KEY_LEFT] = nexacro.AccessibilityUtil.Hotkey.FIRSTCELLINROW;
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_SHIFT + " " + nexacro.Event.KEY_RIGHT] = nexacro.AccessibilityUtil.Hotkey.LASTCELLINROW;

		nexacro.AccessibilityUtil._usetooltip = true;

		nexacro.AccessibilityUtil.getAccessibilityLabel = function (elem) {
			var strLabel = "";
			if (elem) {
				strLabel = elem.accessibility_label;
			}
			return strLabel;
		};

		nexacro.AccessibilityUtil.getAccessibilityAction = function (elem) {
			var strAction = "";
			if (elem) {
				strAction = elem.accessibility_action;
			}
			return strAction;
		};

		nexacro.AccessibilityUtil.getAccessibilityDescription = function (elem) {
			var strDescription = "";
			if (elem) {
				strDescription = elem.accessibility_description;
			}
			return strDescription;
		};

		nexacro.AccessibilityUtil.setDOMNodeLabel = function (node, label) {
			node.setAttribute("aria-live", "assertive");
			node.innerHTML = label;
		};
	}

	nexacro.AccessibilityUtil.checkComponentHotkey = function (obj, keyCode, altKey, ctrlKey, shiftKey) {
		var strHotkey = "";
		var hotkeyList = null;

		if (ctrlKey) {
			strHotkey = strHotkey + nexacro.Event.KEY_CTRL + " ";
		}
		if (altKey) {
			strHotkey = strHotkey + nexacro.Event.KEY_ALT + " ";
		}
		if (shiftKey) {
			strHotkey = strHotkey + nexacro.Event.KEY_SHIFT + " ";
		}

		strHotkey = strHotkey + keyCode;

		if (obj instanceof nexacro.Grid) {
			hotkeyList = nexacro.AccessibilityUtil.GridHotkeyList;
		}

		if (hotkeyList) {
			return hotkeyList[strHotkey];
		}

		return nexacro.AccessibilityUtil.Hotkey.NONE;
	};

	nexacro.AccessibilityUtil.isUseTooltipText = function () {
		if (nexacro._enableaccessibility && !nexacro.AccessibilityUtil._usetooltip) {
			return false;
		}
		return true;
	};

	nexacro._createFrameNode = nexacro._destroyFrameNode = nexacro._emptyFn;
}
