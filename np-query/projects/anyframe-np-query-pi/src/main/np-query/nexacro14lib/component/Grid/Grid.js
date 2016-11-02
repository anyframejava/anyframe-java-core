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

if (!nexacro.Grid) {
	nexacro.GridDragEventInfo = function (obj, id, dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow) {
		nexacro.DragEventInfo.call(this, obj, id || "ongriddrag", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);

		this.cell = cell;
		this.col = col;
		this.row = row;
		this.subrow = subrow;
		this.pivotindex = pivotindex;
		this.mergecell = mergecell;
		this.mergecol = mergecol;
		this.mergerow = mergerow;
	};
	var _pGridDragEventInfo = nexacro._createPrototype(nexacro.DragEventInfo, nexacro.GridDragEventInfo);
	nexacro.GridDragEventInfo.prototype = _pGridDragEventInfo;
	_pGridDragEventInfo._type_name = "GridDragEvent";

	delete _pGridDragEventInfo;

	nexacro.GridClickEventInfo = function (obj, id, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, afterCell, afterCol, afterRow, afterSubrow, afterPvt, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY) {
		nexacro.ClickEventInfo.call(this, obj, id || "ongridclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
		this.cell = afterCell;
		this.col = afterCol;
		this.row = afterRow;
		this.subrow = afterSubrow;
		this.pivotindex = afterPvt;
		this.oldcell = beforeCell;
		this.oldcol = beforeCol;
		this.oldrow = beforeRow;
		this.oldsubrow = beforeSubrow;
		this.oldpivotindex = beforePvt;
	};
	var _pGridClickEventInfo = nexacro._createPrototype(nexacro.ClickEventInfo, nexacro.GridClickEventInfo);
	nexacro.GridClickEventInfo.prototype = _pGridClickEventInfo;
	_pGridClickEventInfo._type_name = "GridClickEvent";
	_pGridClickEventInfo._is_event = true;
	delete _pGridClickEventInfo;

	nexacro.GridEditEventInfo = function (obj, id, cell, col, pivotindex, row, subrow, value) {
		this.id = this.eventid = id || "ongridedit";
		this.fromobject = this.fromreferenceobject = obj;

		this.cell = cell;
		this.col = col;
		this.row = row;
		this.subrow = subrow;
		this.pivotindex = pivotindex;
		this.value = value;
	};
	var _pGridEditEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.GridEditEventInfo);
	nexacro.GridEditEventInfo.prototype = _pGridEditEventInfo;
	_pGridEditEventInfo._type_name = "GridEditEvent";

	delete _pGridEditEventInfo;

	nexacro.GridTextChangeEventInfo = function (obj, id, cell, chartext, col, pivotindex, postimetext, posttext, preimetext, pretext, row, subrow) {
		this.id = this.eventid = id || "ontextchange";
		this.fromobject = this.fromreferenceobject = obj;

		this.cell = cell;
		this.chartext = chartext;
		this.col = col;
		this.pivotindex = pivotindex;
		this.postimetext = postimetext;
		this.posttext = posttext;
		this.preimetext = preimetext;
		this.pretext = pretext;
		this.row = row;
		this.subrow = subrow;
	};
	var _pGridTextChangeEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.GridTextChangeEventInfo);
	nexacro.GridTextChangeEventInfo.prototype = _pGridTextChangeEventInfo;
	_pGridTextChangeEventInfo._type_name = "GridTextChangeEvent";

	_pGridTextChangeEventInfo.set_chartext = function (chartext) {
		this.chartext = chartext;
	};

	_pGridTextChangeEventInfo.set_postimetext = function (postimetext) {
		this.postimetext = postimetext;
	};

	delete _pGridTextChangeEventInfo;

	nexacro.GridTextChangedEventInfo = function (obj, id, cell, col, pivotindex, posttext, pretext, row, subrow) {
		this.id = this.eventid = id || "ontextchanged";
		this.fromobject = this.fromreferenceobject = obj;

		this.cell = cell;
		this.col = col;
		this.pivotindex = pivotindex;
		this.posttext = posttext;
		this.pretext = pretext;
		this.row = row;
		this.subrow = subrow;
	};
	var _pGridTextChangedEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.GridTextChangedEventInfo);
	nexacro.GridTextChangedEventInfo.prototype = _pGridTextChangedEventInfo;
	_pGridTextChangedEventInfo._type_name = "GridTextChangedEvent";
	_pGridTextChangedEventInfo._is_event = true;
	delete _pGridTextChangedEventInfo;

	nexacro.GridFormatChangedEventInfo = function (obj, id, newvalue, oldvalue, reason) {
		this.id = this.eventid = id || "ongridformatchanged";
		this.fromobject = this.fromreferenceobject = obj;

		this.newvalue = newvalue;
		this.oldvalue = oldvalue;
		this.reason = reason;
	};
	var _pGridFormatChangedEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.GridFormatChangedEventInfo);
	nexacro.GridFormatChangedEventInfo.prototype = _pGridFormatChangedEventInfo;
	_pGridFormatChangedEventInfo._type_name = "GridFormatChangedEvent";

	delete _pGridFormatChangedEventInfo;

	nexacro.GridSelectEventInfo = function (obj, id, cell, col, row, subrow, pivotindex, oldcell, oldcol, oldrow, oldsubrow, oldpivotindex, selectendcol, selectendpivot, selectendrow, selectendsubrow, selectstartcol, selectstartpivot, selectstartrow, selectstartsubrow) {
		this.id = this.eventid = id || "ongridselect";
		this.fromobject = this.fromreferenceobject = obj;

		this.cell = cell;
		this.col = col;
		this.row = row;
		this.subrow = subrow;
		this.pivotindex = pivotindex;

		this.oldcell = oldcell;
		this.oldcol = oldcol;
		this.oldrow = oldrow;
		this.oldpivotindex = oldpivotindex;
		this.oldsubrow = oldsubrow;

		this.selectendcol = selectendcol;
		this.selectendpivot = selectendpivot;
		this.selectendrow = selectendrow;
		this.selectendsubrow = selectendsubrow;

		this.selectstartcol = selectstartcol;
		this.selectstartpivot = selectstartpivot;
		this.selectstartrow = selectstartrow;
		this.selectstartsubrow = selectstartsubrow;
	};
	var _pGridSelectEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.GridSelectEventInfo);
	nexacro.GridSelectEventInfo.prototype = _pGridSelectEventInfo;
	_pGridSelectEventInfo._type_name = "GridSelectEvent";

	delete _pGridSelectEventInfo;

	nexacro.GridTreeStatusEventInfo = function (obj, id, cell, realrow, row, reason) {
		this.id = this.eventid = id || "ongridtreestatus";
		this.fromobject = this.fromreferenceobject = obj;

		this.cell = cell;
		this.realrow = realrow;
		this.row = row;
		this.reason = reason;
	};
	var _pGridTreeStatusEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.GridTreeStatusEventInfo);
	nexacro.GridTreeStatusEventInfo.prototype = _pGridTreeStatusEventInfo;
	_pGridTreeStatusEventInfo._type_name = "GridTreeStatusEvent";

	delete _pGridTreeStatusEventInfo;

	nexacro.GridMouseEventInfo = function (obj, id, cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY) {
		nexacro.MouseEventInfo.call(this, obj, id || "ongridmouse", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);

		this.cell = cell;
		this.col = col;
		this.mergecell = mergecell;
		this.mergecol = mergecol;
		this.mergerow = mergerow;
		this.pivotindex = pivotindex;
		this.row = row;
		this.subrow = subrow;
	};
	var _pGridMouseEventInfo = nexacro._createPrototype(nexacro.MouseEventInfo, nexacro.GridMouseEventInfo);
	nexacro.GridMouseEventInfo.prototype = _pGridMouseEventInfo;
	_pGridMouseEventInfo._type_name = "GridMouseEvent";

	delete _pGridMouseEventInfo;

	nexacro.GridSizeChangedEventInfo = function (id, formatindex, index, newvalue, oldvalue, reason, subindex) {
		this.eventid = id;
		this.formatindex = formatindex;
		this.index = index;
		this.newvalue = newvalue;
		this.oldvalue = oldvalue;
		this.reason = reason;
		this.subindex = subindex;
	};

	var _pGridSizeChangedEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.GridSizeChangedEventInfo);
	nexacro.GridSizeChangedEventInfo.prototype = _pGridSizeChangedEventInfo;
	_pGridSizeChangedEventInfo._type_name = "GridSizeChangedEventInfo";

	delete _pGridSizeChangedEventInfo;

	nexacro.GridCell = function (id, left, top, width, height, parent, cellinfo, rowidx, cellidx) {
		nexacro.Component.call(this, id, "absolute", left, top, width, height, null, null, parent);

		this.tabstop = false;
		this.subcells = [];
		this.parentcell = null;
		this.style = cellinfo.style;


		this._is_subcontrol = true;
		this._refobj = cellinfo;
		this._grid = this._refobj ? this._refobj.grid : null;
		this._rowidx = rowidx;
		this._cellidx = cellidx;
		this._styles = cellinfo._styles;
		this._expand_width = 0;
		this._subComp = null;
		this._selected = false;
		this._text_elem = null;
		this._curDisplayType = "";
		this._curEditDisplay = "";
		this._treeLeftGap = 0;
		this._expandCtrl = null;
		this._comboInnerDataset = null;
		this._isSubCell = false;
		this._disp_show = true;
		this._band = parent._band;
		this._fakecell = false;
		this._hideInner = false;
		this._is_real_upelem = null;
		this._clickcall = false;
		this._is_clickproc = false;


		this._accessibility_role = "gridcell";
		this._row_cells_update_pseudo = false;
		this._refresh_display = false;
	};

	var _pGridCell = nexacro._createPrototype(nexacro.Component, nexacro.GridCell);
	nexacro.GridCell.prototype = _pGridCell;
	_pGridCell._type_name = "GridCell";

	_pGridCell.on_mouseleave_basic_action = function (is_subcontrol_bubble) {
		this._row_cells_update_pseudo = true;
		var retn = nexacro.Component.prototype.on_mouseleave_basic_action.call(this, is_subcontrol_bubble);
		this._row_cells_update_pseudo = false;

		return retn;
	};

	_pGridCell.on_apply_custom_pseudo = function (pseudo) {
		var control_elem = this.getElement();
		var grid = this._grid;

		if (!control_elem) {
			return;
		}
		if (!pseudo) {
			pseudo = this._pseudo;
		}

		var curstyle = this.currentstyle;

		var font = this.on_find_CurrentStyle_font(pseudo);
		if (curstyle.font != font) {
			curstyle.font = font;
			this.on_apply_style_font(font);
		}

		var letterspace = this.on_find_CurrentStyle_letterspace(pseudo);
		if (curstyle.letterspace != letterspace) {
			curstyle.letterspace = letterspace;
			this.on_apply_style_letterspace(letterspace);
		}

		var color = this.on_find_CurrentStyle_color(pseudo);
		if (curstyle.color != color) {
			curstyle.color = color;
			this.on_apply_style_color(color);
		}

		var align = this.on_find_CurrentStyle_align(pseudo);
		if (curstyle.align != align) {
			curstyle.align = align;
			this.on_apply_style_align(align);
		}

		var rtlimagemirroring = this.on_find_CurrentStyle_rtlimagemirroring(pseudo);
		if (curstyle.rtlimagemirroring != rtlimagemirroring) {
			curstyle.rtlimagemirroring = rtlimagemirroring;
			this.on_apply_style_rtlimagemirroring(rtlimagemirroring);
		}

		this._display_text = this._getDisplayText();
		this.on_apply_prop_tooltip();

		if (this._is_created && (grid._mouseovercell == this || this._row_cells_update_pseudo == true)) {
			if (!grid._ReasonRefresh) {
				grid.on_apply_cell_pseudo(this, pseudo);
			}
		}
	};

	_pGridCell.on_create_custom_style = function () {
		return null;
	};

	_pGridCell.on_create_custom_currentStyle = function () {
		return new nexacro.GridCell_CurrentStyle();
	};


	_pGridCell.on_find_CurrentStyle_accessibility = function (pseudo) {
		if (this._refobj && !this._isSubCell) {
			var grid = this._grid, datarow = grid._getDataRow(this._rowidx);

			return this._refobj._query_pseudo_accessibility(datarow, pseudo);
		}
		return null;
	};

	_pGridCell.on_find_CurrentStyle_background = function (pseudo) {
		if (this._refobj && !this._isSubCell) {
			var odd = (this._rowidx >= 0) ? (this._rowidx % 2) : false, grid = this._grid, datarow = grid._getDataRow(this._rowidx);

			return this._refobj._query_pseudo_background(datarow, odd, this._isSelected(), pseudo);
		}
		return null;
	};

	_pGridCell.on_find_CurrentStyle_border = function (pseudo) {
		var cell = this;

		if (this._refobj && !this._isSubCell) {
			var suppressborder = cell._getSuppressInfo().border_proc;


			if (this._getDisplayRowIdx() == this._grid._getDispRowCnt() - 1) {
				suppressborder = 0;
			}

			var grid = this._grid, datarow = grid._getDataRow(this._rowidx);

			var border = this._refobj._query_pseudo_border(datarow, this._isSelected(), pseudo, suppressborder);


			var remove = grid._checkFakeMerge(this._refobj, datarow);

			if (remove) {
				var real_border = border.clone();

				if (remove.indexOf("right") >= 0) {
					real_border.set_right("0px none transparent");
				}
				else if (remove.indexOf("left") >= 0) {
					real_border.set_left("0px none transparent");
				}

				if (remove.indexOf("bottom") >= 0) {
					real_border.set_bottom("0px none transparent");
				}
				else if (remove.indexOf("top") >= 0) {
					real_border.set_top("0px none transparent");
				}

				return real_border;
			}

			return border;
		}
		return null;
	};

	_pGridCell.on_find_CurrentStyle_bordertype = function (pseudo) {
		return null;
	};

	_pGridCell.on_find_CurrentStyle_gradation = function (pseudo) {
		if (this._refobj && !this._isSubCell) {
			var odd = (this._rowidx >= 0) ? (this._rowidx % 2) : false, grid = this._grid, datarow = grid._getDataRow(this._rowidx);

			return this._refobj._query_pseudo_gradation(datarow, odd, this._isSelected(), pseudo);
		}
		return null;
	};

	_pGridCell.on_find_CurrentStyle_padding = function (pseudo) {
		if (this._refobj) {
			if (this.subcells.length > 0) {
				return nexacro.Component._default_padding;
			}

			var grid = this._grid, datarow = grid._getDataRow(this._rowidx);

			return this._refobj._query_pseudo_padding(datarow, pseudo);
		}
		return null;
	};

	_pGridCell.on_find_CurrentStyle_opacity = function (pseudo) {
		return null;
	};

	_pGridCell.on_find_CurrentStyle_cursor = function (pseudo) {
		if (this._isSubCell) {
			return this.parent.on_find_CurrentStyle_cursor(pseudo);
		}

		if (this._refobj) {
			var grid = this._grid, datarow = grid._getDataRow(this._rowidx);

			if (grid._global_cursor) {
				return grid._global_cursor;
			}

			return this._refobj._query_pseudo_cursor(datarow, pseudo);
		}
		return null;
	};

	_pGridCell.on_find_CurrentStyle_shadow = function (pseudo) {
		return null;
	};

	_pGridCell.on_find_CurrentStyle_font = function (pseudo) {
		if (this._refobj) {
			var grid = this._grid, datarow = grid._getDataRow(this._rowidx);

			return this._refobj._query_pseudo_font(datarow, this._isSelected(), pseudo);
		}
		return null;
	};

	_pGridCell.on_find_CurrentStyle_letterspace = function (pseudo) {
		if (this._refobj) {
			var grid = this._grid, datarow = grid._getDataRow(this._rowidx);

			return this._refobj._query_pseudo_letterspace(datarow, this._isSelected(), pseudo);
		}
		return null;
	};

	_pGridCell.on_find_CurrentStyle_color = function (pseudo) {
		var cell = this;

		if (this._isSubCell) {
			cell = this.parentcell;
		}
		if (this._refobj) {
			var odd = (this._rowidx >= 0) ? (this._rowidx % 2) : false;
			var grid = this._grid;
			var datarow = grid._getDataRow(this._rowidx);

			return this._refobj._query_pseudo_color(datarow, odd, cell._selected, pseudo);
		}
		return null;
	};

	_pGridCell.on_find_CurrentStyle_align = function (pseudo) {
		if (this._refobj) {
			var curdisp = this._curDisplayType;
			var grid = this._grid;
			var datarow = grid._getDataRow(this._rowidx);

			if (curdisp == "") {
				curdisp = this._refobj._getAttrValue(this._refobj.displaytype, datarow);
			}
			if (curdisp === undefined) {
				curdisp = "normal";
			}

			var align = this._refobj._query_pseudo_align(datarow, curdisp, pseudo);

			return align;
		}
		return null;
	};

	_pGridCell.on_find_CurrentStyle_rtlimagemirroring = function (pseudo) {
		return this._grid.on_find_CurrentStyle_rtlimagemirroring(pseudo);
	};

	_pGridCell.on_create_contents = function () {
		this._disp_show = this._updateDisplayer();
	};

	_pGridCell.on_created_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			if (this.subcells.length == 0) {
				var sub_ctrl = this._subComp;
				if (sub_ctrl) {
					sub_ctrl.on_created();
				}
			}

			var expand_ctrl = this._expandCtrl;
			if (expand_ctrl) {
				expand_ctrl.on_created();
			}
			var curstyle = this.currentstyle;
			if (curstyle && curstyle.font) {
				this.on_apply_style_font(curstyle.font);
			}

			if (curstyle && curstyle.letterspace) {
				this.on_apply_style_letterspace(curstyle.letterspace);
			}

			if (nexacro._enableaccessibility) {
				var accessibility = this.on_find_CurrentStyle_accessibility(this._pseudo);
				if (accessibility && accessibility.enable && !this._grid._accept_focus) {
					this._grid._accept_focus = true;
				}
			}
		}
	};

	_pGridCell._destroyDisplayer = function (async) {
		if (this._subComp) {
			if (async) {
				nexacro.OnceCallbackTimer.callonce(this, function () {
					if (this._subComp) {
						this._subComp.destroy();
						this._subComp = null;
					}
				}, 10);
			}
			else {
				this._subComp.destroy();
				this._subComp = null;
			}
		}
	};

	_pGridCell.destroy = function () {
		if (this._tree_lbuttondown && this._grid) {
			if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
				this._control_element.destroy();
			}

			this._grid._lbuttondown_treecell = this;
			nexacro.OnceCallbackTimer.callonce(this._grid, function () {
				if (this._lbuttondown_treecell) {
					this._lbuttondown_treecell.destroy();
				}
			}, 10);
			return;
		}

		if (this._grid._lbuttondown_treecell == this) {
			this._grid._lbuttondown_treecell = null;
		}

		nexacro.Component.prototype.destroy.call(this);
	};

	_pGridCell._delete_style = function () {
		this.style = null;
		this._styles = null;
	};

	_pGridCell.on_destroy_contents = function () {
		this._destroyDisplayer();

		if (this._expandCtrl) {
			this._expandCtrl.destroy();
			this._expandCtrl = null;
		}
		if (this._comboInnerDataset) {
			this._comboInnerDataset._removeEventHandler("onvaluechanged", this._updateAll, this);
			this._comboInnerDataset._removeEventHandler("onrowsetchanged", this._updateAll, this);
		}

		var subcells = this.subcells;
		var subcells_len = subcells.length;

		for (var i = 0; i < subcells_len; i++) {
			subcells[i].destroy();
		}

		this.subcells = this._refobj = this._grid = this.parentcell = this._band = this._text_elem = this._comboInnerDataset = this._is_real_upelem = null;
	};

	_pGridCell.on_change_containerRect = function (width, height) {
		this._updateAvailableArea();
	};

	_pGridCell.on_create_control_element = function (parent_elem) {
		var mode = (this._refobj._subcells.length) ? "normal" : "text";
		var control_elem = new nexacro.GridCellControlElement(parent_elem, this._refobj._area, mode);
		control_elem.setLinkedControl(this);
		this._control_element = control_elem;
		return control_elem;
	};

	_pGridCell.on_apply_custom_setfocus = function (evt_name) {
		var control_elem = this._control_element;


		if (evt_name == "lbuttondown") {
			this._grid._focus_proc = control_elem;
		}

		nexacro.Component.prototype.on_apply_custom_setfocus.call(this, evt_name);


		if (nexacro._enableaccessibility) {
			this._grid.currentcell = this._cellidx;
			this._grid._currentBand = this._band.id;
		}
	};

	_pGridCell.on_apply_prop_tooltip = function () {
		var control_elem = this.getElement();

		var grid = this._grid;
		var datarow = grid._getDataRow(this._rowidx);
		this.tooltiptext = this._refobj._getTooltipText(datarow);

		if (control_elem) {
			control_elem.setElementToolTip(this.tooltiptext);
		}
	};

	_pGridCell._on_last_lbuttonup = function () {
		this.parent._on_last_lbuttonup();
	};

	_pGridCell._on_last_keyup = function () {
		this.parent._on_last_keyup();
	};

	_pGridCell._on_killfocus = function (new_focus, new_ref_focus) {
		if (this._status != "disable") {
			if (this._readonly) {
				this._status = "readonly";
			}
			else {
				this._status = "enable";
			}
		}
		this._setAccessibilityStatFlag(this._status, this._pseudo);
	};


	_pGridCell._getAccessibilityLabel = function (accessibility, is_no_make) {
		var label = nexacro.Component.prototype._getAccessibilityLabel.call(this, accessibility);

		if (!label && this.subcells.length > 0) {
			var subcells = this.subcells;
			for (var i = 0; i < subcells.length; i++) {
				if (subcells[i]._display_text) {
					if (label) {
						label = label + " " + subcells[i]._display_text;
					}
					else {
						label = subcells[i]._display_text;
					}
				}
			}
		}

		if (nexacro._accessibilitytype == 4 && this._is_created && !is_no_make) {
			var tmp_label = this._getAccessibilityMakeAddLabel();
			if (accessibility) {
				if (accessibility._bindexpr && accessibility._bindexpr.length > 0) {
					label = this._refobj._getAttrValue(accessibility, this._rowidx);
				}
			}
			label = tmp_label + " " + label;
		}
		return label;
	};

	_pGridCell._setAccessibilityStatFocus = function () {
		var grid = this._grid;
		if (grid._currentCellEditor && grid._showEditing) {
			grid._currentCellEditor._setAccessibilityStatFocus();
		}
		else if (this._subComp && this._curDisplayType != "tree") {
			this._subComp._setAccessibilityStatFocus();
		}
		else {
			var tmp_label = "";
			var cellinfo = this._refobj;


			tmp_label = this._getAccessibilityMakeAddLabel();

			tmp_label += " " + this._getCellAccessibilityLabel();
			this._setAccessibilityStatSelected(this._selected);


			this._setAccessibilityLabel(tmp_label);
			nexacro.Component.prototype._setAccessibilityStatFocus.call(this);
		}
	};

	_pGridCell._getCellAccessibilityLabel = function () {
		var tmpLabel = "";
		var grid = this._grid;
		var accessibility = null;
		var cellinfo = this._refobj;


		accessibility = this.on_find_CurrentStyle_accessibility(this._pseudo);
		if (accessibility) {
			if (accessibility._bindexpr && accessibility._bindexpr.length > 0) {
				var bind_value = "";
				cellinfo = this._refobj;
				bind_value = cellinfo._getAttrValue(accessibility, this._rowidx);
				accessibility._setValue(bind_value);
			}
			tmpLabel = this._getAccessibilityLabel(accessibility, true);
		}


		if (this._subComp) {
			var subComp = this._subComp;
			var displayType = this._curDisplayType;

			if (displayType == "checkbox") {
				this._setAccessibilityStatChecked(subComp.isChecked());
			}
			else if (displayType == "tree") {
				var state = grid.getTreeStatus(this._rowidx);
				var level = cellinfo._getTreeLevel(this._rowidx);
				var startlevel = cellinfo._getTreeStartLevel(this._rowidx);
				if (nexacro._accessibilitytype != 4) {
					if (state == 0) {
						this._setAccessibilityStatExpanded(false);
					}
					else {
						this._setAccessibilityStatExpanded(true);
					}
				}
				this._setAccessibilityInfoLevel(level - startlevel + 1);
			}
		}


		if (accessibility && nexacro._accessibilitytype == 5) {
			var description = this._getAccessibilityDescription(accessibility);
			var action = this._getAccessibilityAction(accessibility);
			tmpLabel = tmpLabel + " " + action + " " + description;
		}
		return tmpLabel;
	};


	_pGridCell._getAccessibilityMakeAddLabel = function () {
		var tmpLabel = "", grid = this._grid, curCellinfo = this._refobj;


		if (grid._first_focus && grid._control_element && nexacro._accessibilitytype != 5) {
			tmpLabel = grid._getAccessibilityLabel(grid.on_find_CurrentStyle_accessibility(grid._pseudo));
		}


		if (curCellinfo.celltype == "body" || curCellinfo.celltype == "summary") {
			var headband = grid._headBand;
			var label = "", cells = null, accessibility = null, cellinfo = null, leftLabel = "", headLabel = "";

			if (this.parentcell) {
				cells = this.parentcell.parent._cells;
			}
			else {
				cells = this.parent._cells;
			}


			for (var i = 0; i < cells.length; i++) {
				cellinfo = cells[i]._refobj;
				accessibility = cells[i].on_find_CurrentStyle_accessibility(this._pseudo);
				if (accessibility && cellinfo._area == "left") {
					if (accessibility._bindexpr && accessibility._bindexpr.length > 0) {
						leftLabel = cellinfo._getAttrValue(accessibility, this._rowidx);
						accessibility._setValue(leftLabel);
					}

					label = cells[i]._getAccessibilityLabel(accessibility, true);
					if (cellinfo._row <= curCellinfo._row && curCellinfo._row <= (cellinfo._row + cellinfo._rowspan - 1)) {
						if (leftLabel) {
							leftLabel += " " + label;
						}
						else {
							leftLabel = label;
						}
					}
				}
				else {
					break;
				}
			}


			if (headband) {
				var rows = headband._get_rows();
				cells = rows[0]._cells;

				for (var i = 0; i < cells.length; i++) {
					cellinfo = cells[i]._refobj;
					accessibility = cells[i].on_find_CurrentStyle_accessibility(this._pseudo);
					if (accessibility) {
						if (accessibility._bindexpr && accessibility._bindexpr.length > 0) {
							headband = cellinfo._getAttrValue(accessibility, this._rowidx);
							accessibility._setValue(headband);
						}

						label = cells[i]._getAccessibilityLabel(accessibility, true);
						if (cellinfo._col <= curCellinfo._col && curCellinfo._col <= (cellinfo._colspan + cellinfo._col - 1)) {
							if (headLabel) {
								headLabel = headLabel + " " + label;
							}
							else {
								headLabel = label;
							}
						}
					}
				}
			}


			if (curCellinfo._area == "left") {
				if (headLabel) {
					tmpLabel += " " + headLabel;
				}
			}
			else {
				if (grid.accessibilityreadbandlabel) {
					tmpLabel += " " + leftLabel + " " + headLabel;
				}
				else {
					if (leftLabel && grid._beforegridrowpos != grid.currentrow) {
						tmpLabel += " " + leftLabel;
					}

					if (grid._beforegridcolpos != grid.currentcol
						 || (grid._is_first_bodycell && (grid.currentcell == 0 || grid.currentrow == grid.rowcount - 1))) {
						if (headLabel) {
							if (tmpLabel) {
								tmpLabel = tmpLabel + " " + headLabel;
							}
							else {
								tmpLabel = headLabel;
							}
						}
					}
				}
			}
		}
		return tmpLabel;
	};

	_pGridCell._getAccessibilityRole = function (accessibility) {
		var role = accessibility.role;
		if (!role) {
			var cellinfo = this._refobj;
			role = this._accessibility_role;
			if (cellinfo.celltype == "head") {
				role = "columnheader";
			}
			else if (cellinfo.celltype == "body" && cellinfo._area == "left") {
				role = "rowheader";
			}


			if (this._curDisplayType == "tree") {
				role = "treeitem";
			}
			else if (this._subComp) {
				accessibility = this._subComp.on_find_CurrentStyle_accessibility(this._pseudo);
				role = this._subComp._getAccessibilityRole(accessibility);
			}
		}
		return role;
	};

	_pGridCell.on_get_style_accessibility_label = function () {
		return this._display_text;
	};

	_pGridCell._setAccessibilityNotifyEvent = function (direction) {
		var label = this._getAccessibilityMakeAddLabel();
		label += " " + this._getCellAccessibilityLabel();
		this._setAccessibilityLabel(label);
		return nexacro.Component.prototype._setAccessibilityNotifyEvent.call(this, (direction && direction > 0) ? 0 : 1);
	};

	_pGridCell._resetScrollPos = function (target_comp, left, top, right, bottom, focus_direction) {
		var grid = this._grid;
		if (grid) {
			grid._hideEditor();
			this.parent._showfull(this);
			if (nexacro._enableaccessibility && nexacro._accessibilitytype == 5 && grid._scrollbars == 0) {
				var row = this.parent;
				if (row) {
					top = row._adjust_top;
				}
				bottom = top + this._adjust_height;
				nexacro.Component.prototype._resetScrollPos.call(this, target_comp, left, top, right, bottom, focus_direction);
			}
		}
	};

	_pGridCell.on_apply_text = function () {
		var text_elem = this._text_elem;

		if (text_elem) {
			var cellinfo = this._refobj;
			var datarow = this._grid._getDataRow(this._rowidx);
			var displaytype = cellinfo._getAttrValue(cellinfo.displaytype, datarow);

			var strtext = nexacro._toString(this._display_text);
			if (strtext && strtext.indexOf("\r") != -1) {
				strtext = strtext.replace(/\r/g, "");
			}

			if (displaytype == "decoratetext") {
				text_elem.decoration = null;
				text_elem.setElementDecorateText(strtext);
			}
			else {
				text_elem.decoration = "";
				text_elem.text = null;
				text_elem.setElementText(strtext);
			}
		}
	};

	_pGridCell.on_apply_wordwrap = function () {
		var grid = this._grid;
		var datarow = grid._getDataRow(this._rowidx);
		var wordwrap = this._refobj._getWordwrap(datarow);
		var text_elem = this._text_elem;

		if (text_elem) {
			text_elem.setElementWordWrap(wordwrap);
		}
	};

	_pGridCell.on_apply_style_font = function (font) {
		var text_elem = this._text_elem;
		if (text_elem) {
			text_elem.setElementFont(font);
		}
	};

	_pGridCell.on_apply_style_letterspace = function (letterspace) {
		var text_elem = this._text_elem;
		if (text_elem) {
			text_elem.setElementLetterSpace(letterspace);
		}
	};

	_pGridCell.on_apply_style_color = function (color) {
		var text_elem = this._text_elem;
		if (text_elem) {
			text_elem.setElementColor(color);
		}
	};

	_pGridCell.on_apply_style_align = function (align) {
		var text_elem = this._text_elem;
		if (text_elem) {
			var halign = align.halign == "" ? "center" : align.halign;
			var valign = align.valign == "" ? "middle" : align.valign;
			text_elem.setElementAlignXY(halign, valign);
		}
		if (this._subComp && this._subComp._setAlign) {
			this._subComp._setAlign(align.halign, align.valign);
		}
	};

	_pGridCell.on_apply_style_ctrlAlign = function (halign, valign) {
		var controlSizeW = this._subComp._adjust_width;
		var controlSizeH = this._subComp._adjust_height;
		var clientrect = this._getAvailableRect();
		var w = clientrect.width;
		var h = clientrect.height;

		var x = 0, y = 0;

		switch (halign) {
			case "left":
				break;
			case "right":
				x = w - controlSizeW;
				break;
			default:
				x = Math.round((w - controlSizeW) / 2);
				break;
		}
		switch (valign) {
			case "top":
				break;
			case "bottom":
				y = h - controlSizeH;
				break;
			default:
				y = Math.round((h - controlSizeH) / 2);
				break;
		}
		this._subComp.move(x, y, this._subComp._adjust_width, this._subComp._adjust_height);
	};

	_pGridCell._common_lbuttonup = function (changedtouchinfos, elem, canvasX, canvasY, from_elem) {
		if (changedtouchinfos) {
			var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);

			if (touchinfo) {
				elem = touchinfo._elem;
				canvasX = touchinfo.canvasX;
				canvasY = touchinfo.canvasY;
				from_elem = elem;
			}
		}

		if (elem != from_elem) {
			var upelem = this._is_real_upelem = from_elem;
			var grid = this._grid;
			var is_inGridElem = false;

			while (upelem) {
				if (upelem._type_name == "GridCell") {
					grid._lastmouseentercell = upelem;
				}
				if (upelem._type_name == "Grid") {
					is_inGridElem = true;
					break;
				}
				upelem = upelem.parent;
			}

			if (!upelem) {
				this._is_real_upelem = upelem;
			}
			if ((nexacro.Browser == "Edge" || nexacro.Browser == "IE") && !is_inGridElem) {
				if (grid._showEditing && canvasX >= 0 && canvasX < this._adjust_width && canvasY >= 0 && canvasY < this._adjust_height) {
					grid._lastmouseentercell = this;
					this._clickcall = true;
				}
			}
		}
		return true;
	};

	_pGridCell._on_touchend = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp) {
		if (this._common_lbuttonup(changedtouchinfos, null, null, null, null)) {
			nexacro.Component.prototype._on_touchend.call(this, touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp);
		}
	};

	_pGridCell._on_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem) {
		if (this._common_lbuttonup(null, elem, canvasX, canvasY, from_elem)) {
			nexacro.Component.prototype._on_lbuttonup.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem);
		}

		return true;
	};

	_pGridCell._on_dragenter = function (elem, from_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		if (this._grid._movingcell) {
			this._updateCursor();
		}

		return nexacro.Component.prototype._on_dragenter.call(this, elem, from_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp);
	};

	_pGridCell._common_mouseenter = function (from_comp) {
		if (!this._is_alive) {
			return false;
		}

		var grid = this._grid;
		var datarow = grid._getDataRow(this._rowidx);

		if (grid._isFakeCell(datarow)) {
			return false;
		}

		if (from_comp != this) {
			if (this.parentcell) {
				grid._mouseovercell = this.parentcell;
			}
			else {
				grid._mouseovercell = this;
			}

			if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
				this.on_apply_custom_pseudo("mouseover");
			}

			grid._lastmouseentercell = grid._mouseovercell;
			return true;
		}
		return true;
	};
	_pGridCell._on_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		if (this._common_mouseenter(from_comp)) {
			return nexacro.Component.prototype._on_mouseenter.call(this._grid._lastmouseentercell, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp);
		}
	};

	_pGridCell._common_mouseleave = function (to_comp) {
		if (!this._is_alive) {
			return false;
		}

		var grid = this._grid;
		var datarow = grid._getDataRow(this._rowidx);

		if (grid._isFakeCell(datarow)) {
			return false;
		}

		if (to_comp != this) {
			var cell = this;
			if (grid._mouseovercell) {
				cell = grid._mouseovercell;
				grid._mouseovercell = null;
			}
			return true;
		}
		return false;
	};

	_pGridCell._on_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		if (this._common_mouseleave(to_comp)) {
			if (!this._grid._lastmouseentercell) {
				this._grid._lastmouseentercell = this;
			}

			this._contents_pseudo = "";
			return nexacro.Component.prototype._on_mouseleave.call(this._grid._lastmouseentercell, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp);
		}
	};

	_pGridCell._common_fire_lbuttondown = function (from_comp) {
		var grid = this._grid;
		var datarow = grid._getDataRow(this._rowidx);
		this._is_clickproc = false;
		this._clickcall = false;

		grid._lastmouseentercell = this;

		if (!grid || grid._isFakeCell(datarow)) {
			return false;
		}

		if (this._refobj._isSubCell) {
			return this.parent._common_fire_lbuttondown(from_comp);
		}

		if (this._band.id == "body") {
			var show = false;
			if ((datarow != grid._selectinfo.curdsrow) || (this._cellidx != grid._selectinfo.curcell)) {
				if (grid._showEditing) {
					grid._hideEditor();
				}
				if (grid.autoenter == "select") {
					show = true;
				}
			}
			else {
				if (!grid._showEditing) {
					show = true;
				}
			}
			if (show) {
				grid._showEditorCell = true;
				grid._showEditRowIdx = datarow;
				grid._showEditCellIdx = this._cellidx;
			}
		}
		else {
			if ((datarow != grid._selectinfo.curdsrow) || (this._cellidx != grid._selectinfo.curcell)) {
				if (grid._showEditing) {
					grid._hideEditor();
				}
			}
		}
	};

	_pGridCell.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		this._common_fire_lbuttondown(from_comp);

		var parent = this._grid.parent;
		var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);
		var subcomp = from_refer_comp;

		while (subcomp && subcomp instanceof nexacro.Component) {
			if (subcomp instanceof nexacro.GridCell) {
				break;
			}

			var canvas = subcomp._getRecalcCanvasXY(from_refer_comp._control_element, touchinfo.canvasX, touchinfo.canvasY);
			touchinfo.canvasX = canvas[0];
			touchinfo.canvasY = canvas[1];

			if (this._subComp == subcomp) {
				break;
			}

			subcomp = subcomp.parent;
		}

		if (this._isSubCell) {
			touchinfo.canvasX += this._adjust_left;
			touchinfo.canvasY += this._adjust_top;
			touchinfo.clientX += this._adjust_left;
			touchinfo.clientY += this._adjust_top;
		}

		if (this._subComp == from_comp) {
			curstyle = this.currentstyle;

			if (curstyle && curstyle.padding) {
				touchinfo.canvasX += curstyle.padding.left;
				touchinfo.canvasY += curstyle.padding.top;
				touchinfo.clientX += curstyle.padding.left;
				touchinfo.clientY += curstyle.padding.top;
			}
		}

		var retn = this._grid.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp, true);
		if (!retn) {
			while (parent) {
				if (parent.on_fire_user_ontouchstart) {
					retn = parent.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
					if (retn) {
						break;
					}
				}
				parent = parent.parent;
			}
		}
		return true;
	};

	_pGridCell.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		var subcomp = from_refer_comp;
		while (subcomp && subcomp instanceof nexacro.Component) {
			if (subcomp instanceof nexacro.GridCell) {
				break;
			}

			var canvas = subcomp._getRecalcCanvasXY(from_refer_comp._control_element, canvasX, canvasY);
			canvasX = canvas[0];
			canvasY = canvas[1];

			if (this._subComp == subcomp) {
				break;
			}

			subcomp = subcomp.parent;
		}

		this._common_fire_lbuttondown(from_comp);

		var parent = this._grid.parent;

		if (this._isSubCell) {
			canvasX += this._adjust_left;
			canvasY += this._adjust_top;
			clientX += this._adjust_left;
			clientY += this._adjust_top;
		}

		if (this._subComp == from_comp) {
			curstyle = this.currentstyle;

			if (curstyle && curstyle.padding) {
				canvasX += curstyle.padding.left;
				canvasY += curstyle.padding.top;
				clientX += curstyle.padding.left;
				clientY += curstyle.padding.top;
			}
		}

		var retn = this._grid.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, true);
		if (!retn) {
			while (parent) {
				if (parent.on_fire_user_onlbuttondown) {
					retn = parent.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
					if (retn) {
						break;
					}
				}
				parent = parent.parent;
			}
		}
		return true;
	};

	_pGridCell._common_fire_lbuttonup = function (touchinfos, changedtouchinfos, button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, obj, from_refer_comp, from_elem) {
		var retn = false;
		var window = this._getWindow();
		var orgcell = this;

		if (this._is_real_upelem) {
			orgcell = window.findComponent(this._is_real_upelem);
		}

		var subcomp = from_refer_comp;
		while (subcomp && subcomp instanceof nexacro.Component) {
			if (subcomp instanceof nexacro.GridCell || subcomp instanceof nexacro.Grid) {
				break;
			}

			var canvas = subcomp._getRecalcCanvasXY(from_refer_comp._control_element, canvasX, canvasY);
			canvasX = canvas[0];
			canvasY = canvas[1];

			if (this._subComp == subcomp) {
				break;
			}

			subcomp = subcomp.parent;
		}

		if (changedtouchinfos) {
			var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);

			if (!touchinfo) {
				return false;
			}

			if (this._isSubCell) {
				touchinfo.canvasX += this._adjust_left;
				touchinfo.canvasY += this._adjust_top;
				touchinfo.clientX += this._adjust_left;
				touchinfo.clientY += this._adjust_top;
			}

			if (this._subComp == obj) {
				curstyle = this.currentstyle;

				if (curstyle && curstyle.padding) {
					touchinfo.canvasX += curstyle.padding.left;
					touchinfo.canvasY += curstyle.padding.top;
					touchinfo.clientX += curstyle.padding.left;
					touchinfo.clientY += curstyle.padding.top;
				}
			}

			var parent = this._grid.parent;
			retn = this._grid.on_fire_user_ontouchend(touchinfos, changedtouchinfos, orgcell, orgcell, true);
			if (!retn) {
				while (parent) {
					if (parent.on_fire_user_ontouchend) {
						retn = parent.on_fire_user_ontouchend(touchinfos, changedtouchinfos, obj, from_refer_comp);
						if (retn) {
							break;
						}
					}
					parent = parent.parent;
				}
			}
		}
		else {
			if (this._isSubCell) {
				canvasX += this._adjust_left;
				canvasY += this._adjust_top;
				clientX += this._adjust_left;
				clientY += this._adjust_top;
			}

			if (this._subComp == obj) {
				curstyle = this.currentstyle;

				if (curstyle && curstyle.padding) {
					canvasX += curstyle.padding.left;
					canvasY += curstyle.padding.top;
					clientX += curstyle.padding.left;
					clientY += curstyle.padding.top;
				}
			}

			var parent = this._grid.parent;
			retn = this._grid.on_fire_user_onlbuttonup(button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, orgcell, orgcell, from_elem, true);

			if (!retn) {
				while (parent) {
					if (parent.on_fire_user_onlbuttonup) {
						retn = parent.on_fire_user_onlbuttonup(button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, obj, from_refer_comp, from_elem);
						if (retn) {
							break;
						}
					}
					parent = parent.parent;
				}
			}
		}

		if (!this._is_alive) {
			return true;
		}

		var grid = this._grid;
		var datarow = grid._getDataRow(this._rowidx);
		var upelem = this._is_real_upelem;
		var alreadyclick = this._is_clickproc;
		var clickcall = this._clickcall;

		this._is_real_upelem = null;
		this._is_clickproc = false;
		this._clickcall = false;

		if (grid._isFakeCell(datarow)) {
			return false;
		}

		var cell = (this.parentcell) ? this.parentcell : this;
		var cellinfo = cell._refobj;
		var target = grid._treetarget;

		if (!alreadyclick) {
			if (target && target.row == datarow && target.cell == cellinfo._cellidx) {
				cell.on_fire_onclick(button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, obj, from_refer_comp, "treebutton", true);
				grid._treetarget = null;
			}
			else {
				if (grid._lastmouseentercell == cell) {
					if ((datarow == grid._selectinfo.curdsrow) && (cell._cellidx == grid._selectinfo.curcell)) {
						if (grid._showEditing) {
							var editor = grid._currentCellEditor;
							if (editor) {
								if (upelem instanceof nexacro.InputElement) {
									upelem.setElementFocus();

									if (editor.getCaretPos) {
										var selection = editor.getSelect();

										if (selection[0] == selection[1]) {
											var cpos = editor.getCaretPos();
											editor._setFocus(false);

											if (editor.setCaretPos) {
												editor.setCaretPos(cpos);
											}
										}
									}
									else {
										editor._setFocus(false);
									}
								}
								else {
									editor._setFocus(false);
								}
							}

							if (upelem) {
								var check = false;
								var upelemtemp = upelem;

								while (upelemtemp) {
									if (upelemtemp._cellobj == obj) {
										check = true;
										break;
									}
									upelemtemp = upelemtemp.parent;
								}

								if (!check) {
									check = clickcall;
								}

								if (check) {
									cell.on_fire_onclick(button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, obj, from_refer_comp, "", true);
								}
							}
						}
						else {
							if (upelem) {
								var parentcell = (obj.parentcell) ? obj.parentcell : obj;
								var check = false;
								var upelemtemp = upelem;

								while (upelemtemp) {
									if (upelemtemp == parentcell) {
										check = true;
										break;
									}
									upelemtemp = upelemtemp.parent;
								}

								if (check) {
									cell.on_fire_onclick(button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, obj, from_refer_comp, "", true);
								}
							}
						}
					}
				}
			}
		}
		this._editshowing = false;
	};

	_pGridCell.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		this._common_fire_lbuttonup(touchinfos, changedtouchinfos, "", false, false, false, -1, -1, -1, -1, -1, -1, from_comp, from_refer_comp, null);
		return true;
	};

	_pGridCell.on_fire_user_onlbuttonup = function (button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, obj, refer_comp, from_elem) {
		this._common_fire_lbuttonup(null, null, button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, obj, refer_comp, from_elem);
		return true;
	};

	_pGridCell._getClickItem = function (halign, valign, canvasX, canvasY, text, comp) {
		if (!text) {
			return "";
		}

		var clickitem = "";
		var size = nexacro._getTextSize2(comp.currentstyle.letterspace, text, comp.currentstyle.font);
		var clientXY = comp._getClientXY(canvasX, canvasY);
		var halign, valign;
		var include = false;

		if (halign == "left") {
			if (clientXY[0] <= size[0]) {
				include = true;
			}
		}
		else if (halign == "center") {
			var l = (comp._client_width - size[0]) / 2;
			var r = l + size[0];

			if (clientXY[0] >= l && clientXY[0] <= r) {
				include = true;
			}
		}
		else {
			if (clientXY[0] >= comp._client_width - size[0]) {
				include = true;
			}
		}

		if (include) {
			if (valign == "top") {
				if (clientXY[1] <= size[1]) {
					clickitem = "text";
				}
			}
			else if (valign == "middle") {
				var t = (comp._client_height - size[1]) / 2;
				var b = t + size[1];

				if (clientXY[1] >= t && clientXY[1] <= b) {
					clickitem = "text";
				}
			}
			else {
				if (clientXY[1] >= comp._client_height - size[1]) {
					clickitem = "text";
				}
			}
		}

		return clickitem;
	};

	_pGridCell._clickitem = "";
	_pGridCell._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY) {
		if (!this._hideInner) {
			if (elem instanceof nexacro.ControlElement) {
				this._clickitem = "border";
			}
			else if (elem instanceof nexacro.TextBoxElement) {
				var halign, valign;

				if (elem.align) {
					halign = elem.align._halign;
					valign = elem.align._valign;
				}
				else if (elem.halign && elem.valign) {
					halign = elem.halign;
					valign = elem.valign;
				}

				this._clickitem = this._getClickItem(halign, valign, canvasX, canvasY, elem.text, this);
			}
		}

		var retn = nexacro.Component.prototype._on_click.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY);
		this._clickitem = "";
		return retn;
	};

	_pGridCell.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem, logic) {
		if (!logic) {
			var subcomp = from_refer_comp;
			while (subcomp && subcomp instanceof nexacro.Component) {
				if (subcomp instanceof nexacro.GridCell) {
					break;
				}

				var canvas = subcomp._getRecalcCanvasXY(from_refer_comp._control_element, canvasX, canvasY);
				canvasX = canvas[0];
				canvasY = canvas[1];

				if (this._subComp == subcomp) {
					break;
				}

				subcomp = subcomp.parent;
			}
		}

		if (this._isSubCell) {
			canvasX += this._adjust_left;
			canvasY += this._adjust_top;
			clientX += this._adjust_left;
			clientY += this._adjust_top;
		}

		if (this._subComp == from_comp) {
			curstyle = this.currentstyle;

			if (curstyle && curstyle.padding) {
				canvasX += curstyle.padding.left;
				canvasY += curstyle.padding.top;
				clientX += curstyle.padding.left;
				clientY += curstyle.padding.top;
			}
		}

		if (this._band) {
			this._is_clickproc = true;
			if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
				if (!(this._grid.onlbuttondown && this._grid.onlbuttondown.defaultprevented == true) || (this._grid.onlbuttonup && this._grid.onlbuttonup.defaultprevented == true)) {
					if (!this._grid._showEditing) {
						this._setFocus(false);
					}
				}
			}
			if (clickitem == undefined) {
				clickitem = this._clickitem;
			}

			if (this._grid._scrollpixel == "all") {
				this._showfull(this);
			}
			else {
				this.parent._showfull(this);
			}

			if (this._band.id == "body") {
				this._grid.on_fire_cellclick(this, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			}
			else if (this._band.id == "head") {
				this._grid.on_fire_headclick(this, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			}
			else if (this._band.id == "summ") {
				this._grid.on_fire_summclick(this, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			}

			this._needToggle("onclick", from_comp);
		}
		return true;
	};

	_pGridCell.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem) {
		var subcomp = from_refer_comp;
		while (subcomp && subcomp instanceof nexacro.Component) {
			if (subcomp instanceof nexacro.GridCell) {
				break;
			}

			var canvas = subcomp._getRecalcCanvasXY(from_refer_comp._control_element, canvasX, canvasY);
			canvasX = canvas[0];
			canvasY = canvas[1];

			if (this._subComp == subcomp) {
				break;
			}

			subcomp = subcomp.parent;
		}

		if (this._isSubCell) {
			canvasX += this._adjust_left;
			canvasY += this._adjust_top;
			clientX += this._adjust_left;
			clientY += this._adjust_top;
		}

		if (this._subComp == from_comp) {
			curstyle = this.currentstyle;

			if (curstyle && curstyle.padding) {
				canvasX += curstyle.padding.left;
				canvasY += curstyle.padding.top;
				clientX += curstyle.padding.left;
				clientY += curstyle.padding.top;
			}
		}

		if (this._band) {
			nexacro._fireBeforeDblclick(from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);

			if (clickitem == undefined) {
				clickitem = "";
			}
			if (this._band.id == "body") {
				return this._grid.on_fire_celldblclick(this, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			}
			else if (this._band.id == "head") {
				return this._grid.on_fire_headdblclick(this, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			}
			else if (this._band.id == "summ") {
				return this._grid.on_fire_summdblclick(this, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			}
			if (!this._is_alive) {
				return;
			}
		}
		return true;
	};

	_pGridCell.on_fire_onsize = function (width, height) {
		var curcomp = this._grid._currentCellEditor;
		var grid = this._grid;
		var datarow = grid._getDataRow(this._rowidx);

		if (curcomp) {
			if (grid._currentCellCell == this._cellidx && 
				this._grid._currentCellRow == datarow) {
				var cRc = this._setPositionInGrid(curcomp);
			}
		}
		return false;
	};

	_pGridCell.on_fire_onmove = function (left, top) {
		var curcomp = this._grid._currentCellEditor;
		var grid = this._grid;
		var datarow = grid._getDataRow(this._rowidx);

		if (curcomp) {
			if (grid._currentCellCell == this._cellidx && 
				this._grid._currentCellRow == datarow) {
				var cRc = this._setPositionInGrid(curcomp);
			}
		}
		return false;
	};

	_pGridCell._applyMouseLeaveEvent = function () {
		var grid = this._grid;
		if (grid) {
			if (grid._isSelectRowType() && this._pseudo == "mouseover") {
				grid.on_apply_cell_pseudo(this, "normal");
			}
			else {
				this._stat_change("normal", "normal");
			}
		}
	};

	_pGridCell._applyMouseOverEvent = function () {
		var grid = this._grid;
		if (grid && this._pseudo == "normal") {
			grid.on_apply_cell_pseudo(this, "mouseover");
		}
	};

	_pGridCell._hideInnerElement = function () {
		this.getElement().setContainerVisible(false);
		this._hideInner = true;
	};

	_pGridCell._showInnerElement = function () {
		this.getElement().setContainerVisible(true);
		this._hideInner = false;
	};

	_pGridCell._createDisplayer = function (displayType) {
		var editdisplay = "";
		var grid = this._grid;
		var cellinfo = this._refobj;
		var datarow = grid._getDataRow(this._rowidx);

		switch (displayType) {
			case "button":
				this._createButtonDisplayer();
				break;
			case "checkbox":
				this._createCheckboxDisplayer();
				break;
			case "image":
				this._createImageDisplayer();
				break;
			case "tree":
				this._createTreeDisplayer();
				grid._treeCellinfo = cellinfo;
				break;
			case "combo":
				editdisplay = cellinfo._getAttrValue(cellinfo.combodisplay, datarow);

				if (editdisplay == "display") {
					this._createComboDisplayer();
				}
				else {
					this._createTextDisplayer();
				}

				var innerds = cellinfo._getAttrValue(cellinfo.combodataset, datarow);
				var ds = this._comboInnerDataset = grid._findDataset(innerds);

				if (ds) {
					ds._setEventHandler("onvaluechanged", this._updateAll, this);
					ds._setEventHandler("onrowsetchanged", this._updateAll, this);
				}
				break;
			case "date":
				editdisplay = cellinfo._getAttrValue(cellinfo.calendardisplay, datarow);

				if (editdisplay == "display") {
					this._createCalendarDisplayer();
				}
				else {
					this._createTextDisplayer();
				}

				break;
			case "text":
			case "decoratetext":
			case "normal":
				editdisplay = cellinfo._getAttrValue(cellinfo.editdisplay, datarow);
				var edittype = cellinfo._getEdittype(datarow);

				if (editdisplay == "display") {
					if (edittype == "textarea" || edittype == "readonly") {
						this._createTextAreaDisplayer();
					}
					else {
						this._createEditDisplayer();
					}
				}
				else {
					this._createTextDisplayer();
				}
				break;
			case "number":
			case "exponent":
			case "currency":
				editdisplay = cellinfo._getAttrValue(cellinfo.editdisplay, datarow);

				if (editdisplay == "display") {
					this._createEditDisplayer();
				}
				else {
					this._createTextDisplayer();
				}

				break;
			case "bar":
				this._createBarDisplayer();
				break;
		}
		this._curDisplayType = displayType;
		this._curEditDisplay = editdisplay;
	};

	_pGridCell._isChangeDisplayer = function (displayType, datarow) {
		var grid = this._grid;
		var cur_disptype = this._curDisplayType;

		if ((displayType != cur_disptype) || grid._changeDisplayer) {
			return true;
		}

		var editdisplay = "";
		var cellinfo = this._refobj;

		if (cur_disptype == "combo") {
			editdisplay = cellinfo._getAttrValue(cellinfo.combodisplay, datarow);
		}
		else if (cur_disptype == "date") {
			editdisplay = cellinfo._getAttrValue(cellinfo.calendardisplay, datarow);
		}
		else if (cur_disptype == "text" || cur_disptype == "decoratetext" || cur_disptype == "normal" || cur_disptype == "number" || cur_disptype == "exponent" || cur_disptype == "currency") {
			editdisplay = cellinfo._getAttrValue(cellinfo.editdisplay, datarow);
		}

		if (editdisplay != this._curEditDisplay) {
			return true;
		}
		return false;
	};

	_pGridCell._updateDisplayer = function () {
		var grid = this._grid;
		var cellinfo = this._refobj;
		var datarow = grid._getDataRow(this._rowidx);
		var displayType = cellinfo._getAttrValue(cellinfo.displaytype, datarow);
		var show = true;
		var band = this._band;

		if (displayType === undefined) {
			displayType = "normal";
		}

		if (this._isChangeDisplayer(displayType, datarow) == true) {
			if (this._curDisplayType != "") {
				this._destroyDisplayer(grid._lbuttondown_proc);
			}

			this._createDisplayer(displayType);

			if (this._subComp && !this._subComp._is_created) {
				this._subComp.on_created();
			}
		}
		else {
			this.on_apply_wordwrap();
		}

		var expandshow = cellinfo._getAttrValue(cellinfo.expandshow, datarow);
		var expandsize = cellinfo._getAttrValue(cellinfo.expandsize, datarow);
		if (expandshow == "show") {
			if (!this._expandCtrl) {
				this._createExpandDisplayer();
			}
			else {
				if (this._expand_width != expandsize) {
					this._expandCtrl.destroy();
					this._expandCtrl = null;
					this._createExpandDisplayer();
				}
				else {
					this._changeClientmode("expand");
				}
			}

			this._expandCtrl.set_visible(true);
			this._control_element._updateClientSize();
			this._updateClientSize(this._control_element);
		}
		else {
			if (this._expandCtrl) {
				if (this._expand_width != expandsize) {
					this._expandCtrl.destroy();
					this._expandCtrl = null;
					this._createExpandDisplayer();
				}

				this._expandCtrl.set_visible(false);
				this._control_element._updateClientSize();
				this._updateClientSize(this._control_element);

				if (this._control_element._mode == "expandtext") {
					this._changeClientmode("text");
				}
			}
		}

		var fake = grid._isFakeCell(datarow);

		if (fake) {
			if (grid.fillareatype == "datarow") {
				if (!this._isDisplayDataType(displayType)) {
					if (displayType != "date") {
						show = false;
						if (fake != this._fakecell || grid._resetfillarea) {
							this._hideInnerElement();
							this._fakecell = fake;
						}
					}
				}
			}
			else if (grid.fillareatype == "linerow") {
				show = false;
				if (fake != this._fakecell || grid._resetfillarea) {
					this._hideInnerElement();
					this._fakecell = fake;
				}
			}
			else if (grid.fillareatype == "controlrow") {
				if (this._isDisplayDataType(displayType)) {
					show = false;
					if (fake != this._fakecell || grid._resetfillarea) {
						this._hideInnerElement();
						this._fakecell = fake;
					}
				}
			}
		}
		else {
			if (fake != this._fakecell) {
				this._showInnerElement();
				this._fakecell = fake;
			}
		}
		return show;
	};

	_pGridCell._isUpdateArea = function () {
		if (this._isSubCell) {
			return true;
		}

		var gridrow = this.parent, gridrow_elem = gridrow.getElement(), update_left = gridrow_elem.scroll_left, update_right = update_left + this._grid._adjust_width;

		var cellinfo = this._refobj;
		if (cellinfo._area != "body" || (update_left <= this._getPosRight() && update_right >= this._adjust_left)) {
			return true;
		}

		return false;
	};

	_pGridCell._updateAll = function (pseudo, onlycontents) {
		if (!this._is_alive) {
			return;
		}

		this._rowidx = this.parent._rowidx;

		var control_elem = this.getElement();
		if (control_elem) {
			if (this._isUpdateArea() == false) {
				return;
			}

			var grid = this._grid;
			var show = this._disp_show = this._updateDisplayer();

			var datarow = grid._getDataRow(this._rowidx);

			if (grid._currentCellRow >= 0) {
				var textelem = this._text_elem;
				if (textelem) {
					if (grid._currentCellCell == this._cellidx && grid._currentCellRow == datarow) {
						textelem.setElementTextVisible(false);
					}
					else {
						textelem.setElementTextVisible(true);
					}
				}
			}

			this._display_text = this._getDisplayText();
			this.on_apply_text();

			this._control_pseudo = "";
			this._contents_pseudo = "";

			pseudo = pseudo === undefined ? "normal" : pseudo;

			this.on_apply_pseudo(pseudo, onlycontents);

			var subComp = this._subComp;
			if (subComp && this._ReasonRefresh != 1) {
				subComp._control_pseudo = "";
				subComp._contents_pseudo = "";
				subComp._updateAll();
			}

			if (this._expandCtrl) {
				this._expandCtrl._updateAll();
			}

			this.on_apply_prop_tooltip();

			if (this.subcells.length > 0) {
				for (var i = 0; i < this.subcells.length; i++) {
					this.subcells[i]._updateAll(pseudo);
				}
			}
			else {
				if (grid._is_use_suppress) {
					if (this._band.id == "body" && this._refobj.suppressalign.indexOf("over") > 0) {
						this._hideInnerElement();
					}
					else {
						if (show) {
							var suppinfo = this._getSuppressInfo();

							if (suppinfo.text_proc != 0) {
								this._hideInnerElement();
							}
							else {
								this._showInnerElement();
							}
						}
					}
				}
				else {
					if (show && this._hideInner) {
						this._showInnerElement();
					}
				}
			}

			if (control_elem._mode == "text") {
				this._changeClientmode("text");
			}

			if (grid._isFakeCell(datarow) == false) {
				if (this._refobj._getSuppress(datarow) == 0) {
					var remove = grid._checkFakeMerge(this._refobj, datarow);

					if (remove) {
						this._hideInnerElement();
					}
					else {
						this._showInnerElement();
					}
				}
			}
		}
	};

	_pGridCell._getSuppressInfo = function () {
		return this._refobj._getSuppressInfo(this._getDisplayRowIdx());
	};

	_pGridCell._getAvailableRect = function () {
		var grid = this._grid;
		var rect = grid._getAvailableRect(this);
		return rect;
	};
	_pGridCell._changeClientmode = function (mode) {
		var control_elem = this.getElement();
		var contain_elem = null;

		if (control_elem) {
			var padding = this.currentstyle.padding;

			if (this._refobj._subcells.length) {
				mode = "normal";
			}
			else if (mode == "expand") {
				if (control_elem._mode != "normal") {
					mode = "expandtext";
				}
				else {
					mode = "normal";
				}
			}
			else if (mode == "text") {
				if (this._expandCtrl) {
					mode = "expandtext";
				}
				else if (padding) {
					mode = (padding.right > 0 || padding.bottom > 0) ? "expandtext" : "text";
				}
			}

			contain_elem = control_elem._changeMode(mode, this.currentstyle.padding);

			if (mode == "text" || mode == "expandtext") {
				this._text_elem = contain_elem;
			}
			else {
				this._text_elem = null;
			}
		}
	};

	_pGridCell._createExpandDisplayer = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this._changeClientmode("expand");
			var datarow = this._grid._getDataRow(this._rowidx);
			this._expand_width = this._refobj._getAttrValue(this._refobj.expandsize, datarow);

			var border = this.on_find_CurrentStyle_border(this._pseudo);
			var l = this._adjust_width - this._expand_width - ((border) ? border._right_width : 0);
			var t = 0;
			var r = l + this._expand_width;
			var b = this._adjust_height - ((border) ? border._bottom_width : 0);

			if (l < 0) {
				l = 0;
				r = this._adjust_width;
			}

			var expCtrl = this._expandCtrl = new nexacro.GridExpand(this, l, t, r, b);
			expCtrl.createComponent();

			this._control_element._setExpandControl(this._expandCtrl, this._expand_width);
		}
	};

	_pGridCell._createTextDisplayer = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var rect = this._getAvailableRect();
			this._changeClientmode("text");
			var text_elem = this._text_elem;
			if (text_elem) {
				this.on_apply_wordwrap();
			}
			this.currentstyle._empty();
		}
	};

	_pGridCell._createButtonDisplayer = function (doc, target) {
		var control_elem = this.getElement();
		if (control_elem) {
			var rect = this._getAvailableRect();
			var width = rect.width;
			var height = rect.height;

			this._changeClientmode("normal");
			var controlComp = new nexacro.GridControlButton("controlbutton", 0, 0, width, height, this, true);
			controlComp._is_subcontrol = true;
			controlComp.createComponent(true);
			this._subComp = controlComp;
			var grid = this._grid;
			var datarow = grid._getDataRow(this._rowidx);
			var wordwrap = this._refobj._getWordwrap(datarow);
			controlComp.set_wordwrap(wordwrap);

			this.currentstyle._empty();
		}
	};

	_pGridCell._createCheckboxDisplayer = function (doc, target) {
		var control_elem = this.getElement();
		if (control_elem) {
			this._changeClientmode("normal");
			var controlComp = new nexacro.GridControlCheckbox("controlcheckbox", 0, 0, 0, 0, this, true);
			controlComp._is_subcontrol = true;
			controlComp.createComponent(true);
			this._subComp = controlComp;

			this.currentstyle._empty();
		}
	};

	_pGridCell._createImageDisplayer = function (doc, target) {
		var control_elem = this.getElement();
		if (control_elem) {
			var rect = this._getAvailableRect();
			var width = rect.width;
			var height = rect.height;
			var controlSize = 16;
			var left = Math.round((width - controlSize) / 2);
			var top = Math.round((height - controlSize) / 2);
			var right = left + controlSize;
			var bottom = top + controlSize;

			this._changeClientmode("normal");
			var controlComp = new nexacro.GridControlImage("controlimage", left, top, controlSize, controlSize, this);
			controlComp._is_subcontrol = true;
			controlComp.createComponent(true);
			this._subComp = controlComp;

			this.currentstyle._empty();
		}
	};

	_pGridCell._createTreeDisplayer = function (doc, target) {
		var control_elem = this.getElement();
		if (control_elem) {
			var rect = this._getAvailableRect();
			var width = rect.width;
			var height = rect.height;

			this._changeClientmode("normal");
			var controlComp = this._subComp = new nexacro.GridControlTree("controltree", 0, 0, width, height, this);
			controlComp._is_subcontrol = true;
			controlComp.createComponent(true);
			this._subComp = controlComp;

			this.currentstyle._empty();
		}
	};

	_pGridCell._createComboDisplayer = function (doc, target) {
		var control_elem = this.getElement();
		if (control_elem) {
			var rect = this._getAvailableRect();
			var width = rect.width;
			var height = rect.height;

			this._changeClientmode("normal");
			var controlComp = new nexacro.GridControlCombo("controlcombo", 0, 0, width, height, this, true);
			controlComp._cellinfo = this._refobj;
			controlComp._is_subcontrol = true;
			controlComp.createComponent(true);
			controlComp.comboedit._input_element._isUseDelCaret = true;
			this._subComp = controlComp;

			this.currentstyle._empty();
		}
	};

	_pGridCell._createCalendarDisplayer = function (doc, target) {
		var control_elem = this.getElement();
		if (control_elem) {
			var rect = this._getAvailableRect();
			var width = rect.width;
			var height = rect.height;

			this._changeClientmode("normal");
			var controlComp = this._subComp = new nexacro.GridControlCalendar("controlcalendar", 0, 0, width, height, this, true);
			controlComp._cellinfo = this._refobj;
			controlComp._is_subcontrol = true;
			controlComp.createComponent(true);
			controlComp.calendaredit._input_element._isUseDelCaret = true;
			this._subComp = controlComp;

			this.currentstyle._empty();
		}
	};

	_pGridCell._createEditDisplayer = function (doc, target) {
		var control_elem = this.getElement();
		if (control_elem) {
			var rect = this._getAvailableRect();
			var width = rect.width;
			var height = rect.height;

			this._changeClientmode("normal");
			var controlComp = this._subComp = new nexacro.GridControlEdit("controledit", 0, 0, width, height, this, true);
			controlComp._is_subcontrol = true;
			controlComp.createComponent(true);
			controlComp._input_element._isUseDelCaret = true;
			this._subComp = controlComp;

			this.currentstyle._empty();
		}
	};

	_pGridCell._createTextAreaDisplayer = function (doc, target) {
		var control_elem = this.getElement();
		if (control_elem) {
			var rect = this._getAvailableRect();
			var width = rect.width;
			var height = rect.height;

			this._changeClientmode("normal");
			var controlComp = this._subComp = new nexacro.GridControlTextArea("controltextarea", 0, 0, width, height, this, true);
			controlComp._isSubControl = true;
			controlComp.createComponent(true);
			controlComp._input_element._isUseDelCaret = true;
			this._subComp = controlComp;

			var grid = this._grid;
			var datarow = grid._getDataRow(this._rowidx);
			var wordwrap = this._refobj._getWordwrap(datarow);
			controlComp.set_wordwrap(wordwrap);

			this.currentstyle._empty();
		}
	};

	_pGridCell._createBarDisplayer = function (doc, target) {
		var control_elem = this.getElement();
		if (control_elem) {
			var rect = this._getAvailableRect();
			var width = rect.width;
			var height = rect.height;

			this._changeClientmode("normal");
			var controlComp = this._subComp = new nexacro.GridControlBar("controlprogressbar", 0, 0, width, height, this, true);
			controlComp._is_subcontrol = true;
			controlComp.createComponent(true);
			this._subComp = controlComp;

			this.currentstyle._empty();
		}
	};

	_pGridCell._updateAvailableArea = function () {
		var rc = this._getAvailableRect();
		var subcomp = this._subComp;

		if (subcomp) {
			var w = rc.width;
			var h = rc.height;

			if (this._curDisplayType == "checkbox" || this._curDisplayType == "image") {
				var align = this.currentstyle.align;
				if (align && !align._is_empty) {
					this.on_apply_style_ctrlAlign(align.halign, align.valign);
				}
			}
			else {
				subcomp.move(0, 0, w, h);
			}
		}

		var expand_ctrl = this._expandCtrl;

		if (expand_ctrl) {
			var left = expand_ctrl.left;
			var top = this._client_top;
			var width = expand_ctrl.width;
			var height = rc.height;

			expand_ctrl._applysetPosition(left, top, width, height);
		}
	};

	_pGridCell._isEnable = function () {
		return this._grid._enable;
	};

	_pGridCell._getDisplayRowIdx = function () {
		return this._rowidx - this._grid._getBodyBegRowPos(this._rowidx);
	};

	_pGridCell._isSelected = function () {
		return (this._selected && this._grid.useselcolor);
	};

	_pGridCell._getResultPseudo = function (status, pseudo) {
		if (this._isSelected()) {
			pseudo = "selected";
		}
		else {
			pseudo = nexacro.Component._status_table[status + "_" + pseudo];
		}

		var grid = this._grid;

		if (pseudo == "mouseover") {
			grid._mouseRowPos = grid._getDataRow(this._rowidx);
			grid._mouseCellPos = this._cellidx;
		}
		else {
			grid._mouseRowPos = -9;
			grid._mouseCellPos = -1;
		}

		var datarow = grid._getDataRow(this._rowidx);

		if ((grid._isFakeCell(datarow) && pseudo != "disabled") || nexacro._cur_track_info || nexacro.isTouchInteraction) {
			pseudo = "normal";
		}
		else {
			if (grid.useselcolor == false && this._selected) {
				if (grid._mouseovercell == this) {
					pseudo = "mouseover";
				}
			}

			var mouseRowPos = grid._mouseRowPos;
			if (mouseRowPos == datarow && pseudo == "normal" && this._isSelected() == false) {
				pseudo = "mouseover";
			}
		}
		return pseudo;
	};

	_pGridCell._getDisplayText = function () {
		if (this._refobj) {
			var grid = this._grid;
			var datarow = grid._getDataRow(this._rowidx);

			return this._refobj._getDisplayText(datarow);
		}
		return "";
	};

	_pGridCell._setDisplayText = function () {
		this._display_text = this._getDisplayText();
		this.on_apply_text();
	};

	_pGridCell.__updateCustomStyles = function () {
		this.on_apply_wordwrap();
	};

	_pGridCell._isDisplayDataType = function (displayType) {
		if (displayType == "number" || displayType == "exponent" || displayType == "currency" || 
			displayType == "normal" || displayType == "text" || displayType == "decoratetext") {
			return true;
		}

		return false;
	};
	_pGridCell._showfull = function (is_vscroll) {
		if (this._isSubCell) {
			return this.parent._showfull();
		}

		var band = this._band;
		var scrollleft = this._grid._getScrollLeft();
		var scrolltop = this._grid._getScrollTop();
		var band_elem = band._control_element;
		var topPos = this.parent._adjust_top;

		var l = this._adjust_left;
		var t = this._adjust_top + topPos;
		var w = this._adjust_width;
		var h = this._adjust_height;
		var r = l + w;
		var b = t + h;

		l -= scrollleft;
		r -= scrollleft;
		t -= scrolltop;
		b -= scrolltop;

		var grid = this._grid;
		var gridrow = this.parent;
		var hscroll = grid.hscrollbar;
		var vscroll = grid.vscrollbar;
		var cellinfo = this._refobj;
		var bandrc = gridrow._getAreaRect(cellinfo._area);

		if (hscroll && cellinfo._area == "body") {
			if (w < bandrc.width) {
				if (l < 0) {
					if (hscroll._isEnable()) {
						hscroll.set_pos(hscroll.pos + l);
					}
				}
				else if (r > bandrc.width) {
					var gap = r - bandrc.width;
					if (hscroll._isEnable()) {
						hscroll.set_pos(hscroll.pos + gap);
					}
				}
			}
		}

		if (band.id == "body") {
			if (vscroll && is_vscroll && !gridrow._fixed) {
				if (h < band._client_height) {
					if (t < 0) {
						if (vscroll._isEnable()) {
							vscroll._set_pixelpos(vscroll._pos + t);
						}
					}
					else if (b > band._client_height) {
						var gab = b - band._client_height;
						if (vscroll._isEnable()) {
							vscroll._set_pixelpos(vscroll._pos + gab);
						}
					}
				}
			}
		}
	};

	_pGridCell._needToggle = function (eventname, from_comp) {
		if (!this._is_alive) {
			return;
		}

		var grid = this._grid;
		var datarow = grid._getDataRow(this._rowidx);
		var editType = this._refobj._getEdittype(datarow);

		if (grid.selectchangetype == "down" && eventname == "onclick") {
			return;
		}
		else if (grid.selectchangetype == "up" && eventname == "onlbuttondown") {
			return;
		}

		if (editType == "checkbox") {
			if (this._curDisplayType != "checkbox") {
				grid._toggleVal(datarow, this._refobj);
			}
			else {
				if (eventname == "onclick" || eventname == "onlbuttondown") {
					if (this._grid.cellclickbound == "cell" && from_comp == this) {
						if (this._subComp && this._subComp._toggleCheck) {
							this._subComp._toggleCheck();
						}
					}
				}
				else {
					if (this._subComp && this._subComp._toggleCheck) {
						this._subComp._toggleCheck();
					}
				}
			}
		}
	};

	_pGridCell._setPositionInGrid = function (editComp, noScrollPos, noPadding) {
		var gridrow = (this._isSubCell) ? this.parent.parent : this.parent;
		var band = this._band;
		var grid = this._grid;
		var cellinfo = this._refobj;
		var rect = gridrow._getAreaRect(cellinfo._area);

		var areal = rect.left;
		var arear = rect.left + rect.width;

		var is_fixed = (band.id == "body" && gridrow._fixed);
		var bandt = band._adjust_top + ((band.id == "body" && is_fixed == false) ? grid._fixed_height : 0);
		var bandb = band._getPosBottom();

		var l = this._adjust_left + areal;
		var t = gridrow._adjust_top + this._adjust_top + bandt;

		if (!noScrollPos) {
			var band_scroll_top = (is_fixed) ? 0 : grid._getScrollTop();
			var area_scroll_left = grid._getScrollLeft();

			if (cellinfo._area == "body") {
				l -= (area_scroll_left >= 0) ? area_scroll_left : 0;
			}
			if (band.id == "body") {
				t -= (band_scroll_top >= 0) ? band_scroll_top : 0;
			}
		}

		if (band._refobj._noborder == true && cellinfo._row == 0 && this._getDisplayRowIdx() <= 0) {
			t += (this.currentstyle.border) ? this.currentstyle.border._bottom_width : 0;
		}

		var crect = this._getAvailableRect();

		if (!noPadding) {
			var padding = this.currentstyle.padding;
			l += (padding) ? padding.left : 0;
			t += (padding) ? padding.top : 0;
		}

		var r = l + crect.width;
		var b = t + crect.height;
		var orgt = t, orgl = l;

		if (t < bandt) {
			t = bandt;
		}
		if (b > bandb) {
			b = bandb;
		}
		if (l < areal) {
			l = areal;
		}
		if (r > arear) {
			r = arear;
		}

		var w = r - l;
		var h = b - t;

		if (w < 0) {
			w = 0;
		}
		if (h < 0) {
			h = 0;
		}

		if (editComp) {
			if (w == 0 || h == 0) {
				editComp.move(0, -10, 0, 0);
			}
			else {
				editComp.move(l, t, w, h);
			}
		}

		return {
			left : l, 
			top : t, 
			right : r, 
			bottom : b, 
			width : w, 
			height : h, 
			orgt : orgt, 
			orgl : orgl
		};
	};

	_pGridCell._showEditor = function (flag, focus) {
		var textCtrl = this._text_elem;
		var cellinfo = this._refobj;
		var grid = this._grid;
		var datarow = grid._getDataRow(this._rowidx);
		var editComp;

		grid._currentCellCell = this._cellidx;
		grid._currentCellRow = datarow;

		if (!flag) {
			if (this._grid._showEditing) {
				this._grid._hideEditor();
			}

			if (textCtrl) {
				textCtrl.setElementTextVisible(false);
			}
			if (this._subComp) {
				this._subComp.set_visible(false);
			}

			editComp = this._grid._createEditor(this);
			this._setPositionInGrid(editComp);
			editComp._EditUpdateAll(cellinfo, this);
			editComp.set_visible(true);

			if (nexacro.isTouchInteraction || grid.selectchangetype == "up") {
				editComp._setFocus(false);
			}

			editComp._stat_change("focus", "focused");
		}
		else {
			if (this._subComp) {
				this._subComp.set_visible(false);
			}

			editComp = this._grid._currentCellEditor;
			if (editComp) {
				editComp._cellinfo = cellinfo;
				editComp._cellobj = this;
				this._setPositionInGrid(editComp);

				if (focus == true) {
					editComp._setFocus(false);
				}
			}
		}
	};

	_pGridCell._hideEditor = function () {
		var text = this._text_elem;
		if (text) {
			text.setElementTextVisible(true);
		}

		this._grid._currentCellCell = -1;
		this._grid._currentCellRow = -1;

		if (this._subComp) {
			this._subComp.set_visible(true);
		}
	};

	_pGridCell._hasEditor = function () {
		var cellinfo = this._refobj;
		var grid = this._grid;
		var datarow = grid._getDataRow(this._rowidx);
		var editType = cellinfo._getEdittype(datarow);

		switch (editType) {
			case "none":
				return false;
			case "normal":
			case "text":
			case "combo":
			case "date":
			case "mask":
			case "masknumber":
			case "textarea":
			case "button":
			case "readonly":
				return true;
		}
		return false;
	};
	delete _pGridCell;

	nexacro.GridExpand = function (parent, left, top, right, bottom, controlmode) {
		nexacro.Component.call(this, "controlexpand", "absolute", left, top, right - left, bottom - top, null, null, parent);

		this.tabstop = false;
		this.parent = parent;


		this._is_subcontrol = true;
		this._is_nc_control = true;
		this._controlmode = (controlmode) ? true : false;

		if (parent._refobj) {
			this._grid = parent._grid;
			this._cellobj = parent;
			this._cellinfo = parent._refobj;
		}
		else {
			this._grid = parent;
		}

		this._text = "";
		this._imagetext = "";
	};

	var _pGridExpand = nexacro._createPrototype(nexacro.Component, nexacro.GridExpand);
	nexacro.GridExpand.prototype = _pGridExpand;

	_pGridExpand._type_name = "GridExpand";

	_pGridExpand._text_elem = null;
	_pGridExpand._img_elem = null;

	_pGridExpand._makeCssRefInfo = function () {
		return (this._grid._makeCssRefInfoCtrl(this));
	};

	_pGridExpand.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var curstyle = this.currentstyle;
			if (this._text) {
				var text_elem = this._text_elem = new nexacro.TextBoxElement(control_elem);
				var halign = curstyle.align.halign == "" ? "center" : curstyle.align._halign;
				var valign = curstyle.align.valign == "" ? "middle" : curstyle.align._valign;

				text_elem.setElementFont(curstyle.font);
				text_elem.setElementColor(curstyle.color);
				text_elem.setElementAlignXY(halign, valign);
				text_elem.setElementLetterSpace(curstyle.letterspace);
			}
			if (this._imagetext) {
				this._setExpandImg(this._imagetext);
			}
		}
	};

	_pGridExpand.on_created_contents = function () {
		var text_elem = this._text_elem;
		var img_elem = this._img_elem;
		if (img_elem) {
			img_elem.create();
		}
		if (text_elem) {
			text_elem.create();
		}
	};

	_pGridExpand.on_destroy_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			if (this._text_elem) {
				this._text_elem.destroy();
				this._text_elem = null;
			}
			if (this._img_elem) {
				this._img_elem.destroy();
				this._img_elem = null;
			}
		}
		this._grid = null;
		this._cellobj = null;
		this._cellinfo = null;
	};

	_pGridExpand.on_change_containerRect = function (width, height) {
	};

	_pGridExpand._setAccessibilityStatFocus = function () {
		var cellobj = this._cellobj;
		var label = cellobj._getAccessibilityMakeAddLabel();

		var tmp_label = "";
		var accessibility = this.on_find_CurrentStyle_accessibility(this._pseudo);
		if (accessibility) {
			if (accessibility._bindexpr && accessibility._bindexpr.length > 0) {
				tmp_label = this._cellinfo._getAttrValue(accessibility, this._rowidx);
				accessibility._setValue(tmp_label);
			}
			tmp_label = this._getAccessibilityLabel(accessibility);
		}
		else {
			tmp_label = cellobj._getCellAccessibilityLabel();
		}
		label += " " + tmp_label;

		this._setAccessibilityLabel(label);
		nexacro.Component.prototype._setAccessibilityStatFocus.call(this);
	};

	_pGridExpand.on_find_CurrentStyle_color = function (pseudo) {
		var v = this._find_pseudo_obj("color", pseudo, "color");
		if (!v) {
			v = this._cellobj.on_find_CurrentStyle_color(this._cellobj._pseudo);
		}

		return (v) ? v : nexacro.Component._default_color;
	};

	_pGridExpand.on_find_CurrentStyle_font = function (pseudo) {
		var v = this._find_pseudo_obj("font", pseudo, "font");
		if (!v) {
			v = this._cellobj.on_find_CurrentStyle_font(this._cellobj._pseudo);
		}

		return (v) ? v : nexacro.Component._default_font;
	};

	_pGridExpand.on_find_CurrentStyle_letterspace = function (pseudo) {
		var v = this._find_pseudo_obj("letterspace", pseudo, "letterspace");
		if (!v) {
			v = this._cellobj.on_find_CurrentStyle_letterspace(this._cellobj._pseudo);
		}

		return (v) ? v : nexacro.Component._default_letterspace;
	};

	_pGridExpand.on_get_style_accessibility_description = function () {
		if (this._cellobj) {
			this._cellobj.tooltiptext;
		}
	};

	_pGridExpand.on_get_style_accessibility_label = function () {
		return this.text;
	};


	_pGridExpand.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		this._cellobj.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);

		if (touchinfo) {
			return this._grid.on_fire_onexpanddown("", false, false, false, touchinfo.screenX, touchinfo.screenY, touchinfo.canvasX, touchinfo.canvasY, touchinfo.clientX, touchinfo.clientY, from_comp, from_refer_comp);
		}
	};

	_pGridExpand.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		this._cellobj.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		return this._grid.on_fire_onexpanddown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
	};

	_pGridExpand.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		this._cellobj.on_fire_user_ontouchend(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);
		if (touchinfo) {
			return this._grid.on_fire_onexpandup("", false, false, false, touchinfo.screenX, touchinfo.screenY, touchinfo.canvasX, touchinfo.canvasY, touchinfo.clientX, touchinfo.clientY, from_comp, from_refer_comp);
		}
	};

	_pGridExpand.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		this._cellobj.on_fire_user_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
		return this._grid.on_fire_onexpandup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
	};

	_pGridExpand.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
	};

	_pGridExpand.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
	};

	_pGridExpand._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridExpand._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};

	_pGridExpand._isEnable = function () {
		return this._grid._enable;
	};

	_pGridExpand._setPositionEx = function () {
		var elem = this._text_elem;
		if (elem) {
			elem.setElementPosition(0, 0);
			var rect = this._grid._getAvailableRect(this);
			elem.setElementSize(rect.width, rect.height);
		}
		elem = this._img_elem;
		if (elem) {
			this._imgAdjustAlign(this._image_width, this._image_height);
		}
	};

	_pGridExpand._imgAdjustAlign = function (imgW, imgH) {
		var rect = this._grid._getAvailableRect(this);
		var imgelem = this._img_elem;
		if (imgelem) {
			var x = 0;
			var y = 0;
			var cellh = rect.height;
			var cellw = rect.width;

			if (imgW > cellw) {
				x = x - ((imgW - cellw) / 2);
			}
			else {
				x = (cellw - imgW) / 2;
			}

			if (imgH > cellh) {
				y = y - ((imgH - cellh) / 2);
			}
			else {
				y = (cellh - imgH) / 2;
			}

			imgelem.setElementPosition(x, y);
			imgelem.setElementSize(imgW, imgH);
		}
	};

	_pGridExpand._on_loadImg = function (val, imgW, imgH) {
		if (!this._is_alive || !this._img_elem) {
			return;
		}

		this._img_elem.setElementImageUrl(val);
		this._imgAdjustAlign(imgW, imgH);
	};

	_pGridExpand.on_apply_custom_pseudo = function (pseudo) {
		if (!this._is_created) {
			return;
		}

		var control_elem = this.getElement();
		if (!control_elem) {
			return;
		}

		if (!pseudo) {
			pseudo = this._pseudo;
		}

		var grid = this._grid;
		if (this._cellobj._is_created) {
			if (!grid._ReasonRefresh) {
				grid.on_apply_cell_pseudo(this._cellobj, pseudo);
			}
		}
	};

	_pGridExpand._updateAll = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var grid = this._grid;
			var datarow = grid._getDataRow(this._cellobj._rowidx);

			this.on_apply_pseudo(this._pseudo);

			var v = this._cellinfo._getAttrValue(this._cellinfo.expandimage, datarow);
			this._setExpandImg(v);
			v = this._cellinfo._getAttrValue(this._cellinfo.expandchar, datarow);
			this._setExpandText(v);
			v = this.on_find_CurrentStyle_font(this._pseudo);
			this._setFont(v);
			v = this.on_find_CurrentStyle_color(this._pseudo);
			this._setColor(v);
			this._setAlign("center", "middle");
			this._setPositionEx();
		}
	};

	_pGridExpand._setExpandImg = function (image) {
		var control_elem = this.getElement();
		if (control_elem && image) {
			var val = (image) ? image.toString() : null;
			if (val) {
				var imgElem = this._img_elem;

				if (!imgElem) {
					imgElem = new nexacro.ImageElement(control_elem);
					this._img_elem = imgElem;
					imgElem.create();
				}

				val = nexacro._getURIValue(val);
				val = nexacro._getImageLocation(val, this._getRefFormBaseUrl());

				var size = nexacro._getImageSize(val, this._on_loadImg, this, undefined, image);
				if (size) {
					this._image_width = size.width;
					this._image_height = size.height;
					imgElem.setElementImageUrl(val);
				}
			}
			else {
				if (this._img_elem) {
					this._img_elem.destroy();
					this._img_elem = null;
					if (this._text_elem) {
						var align = this.currentstyle.align;
						var halign = align.halign == "" ? "center" : align._halign;
						var valign = align.valign == "" ? "middle" : align._valign;
						this._text_elem.setElementAlignXY(halign, valign);
					}
				}
			}
		}
	};

	_pGridExpand._setExpandText = function (val) {
		var control_elem = this.getElement();
		if (control_elem) {
			if (this._text != val) {
				this._text = val;
				var elem = this._text_elem;
				var curstyle = this.currentstyle;

				if (!elem) {
					elem = this._text_elem = new nexacro.TextBoxElement(control_elem);
					var halign = (!curstyle.align || curstyle.align.halign == "") ? "center" : curstyle.align.halign;
					var valign = (!curstyle.align || curstyle.align.valign == "") ? "middle" : curstyle.align.valign;
					elem.setElementFont(curstyle.font);
					elem.setElementColor(curstyle.color);
					elem.setElementAlignXY(halign, valign);
					elem.setElementLetterSpace(curstyle.letterspace);
					elem.create();
				}

				elem.setElementText(val);
			}
		}
	};

	_pGridExpand._setFont = function (font) {
		var elem = this._text_elem;

		if (elem) {
			elem.setElementFont(font);
		}
	};

	_pGridExpand._setColor = function (color) {
		var elem = this._text_elem;

		if (elem) {
			elem.setElementColor(color);
		}
	};

	_pGridExpand._setAlign = function (halign, valign) {
		var elem = this._text_elem;

		if (elem) {
			elem.setElementAlignXY(halign, valign);
		}
	};
	delete _pGridExpand;


	nexacro.GridControlButton = function (id, left, top, width, height, parent, displaymode, controlmode) {
		nexacro.ButtonCtrl.call(this, id, "absolute", left, top, width, height, null, null, parent);
		this.tabstop = false;


		this._displaymode = (displaymode) ? true : false;
		this._controlmode = (controlmode) ? true : false;
		this._clickevt_able = true;

		if (parent._refobj) {
			this._grid = parent._refobj.grid;
			this._cellinfo = parent._refobj;
			this._cellobj = parent;
		}
		else {
			this._grid = parent;
			this._cellinfo = null;
			this._cellobj = null;
		}
	};
	var _pGridButton = nexacro._createPrototype(nexacro.ButtonCtrl, nexacro.GridControlButton);
	nexacro.GridControlButton.prototype = _pGridButton;


	_pGridButton.on_find_CurrentStyle_align = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;

		if (cellinfo && cellobj) {
			var align = this._find_pseudo_obj("align", pseudo, "align");
			return align;
		}
		return null;
	};

	_pGridButton.on_find_CurrentStyle_accessibility = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var accessibility = this._find_pseudo_obj("accessibility", pseudo, "accessibility");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!accessibility) {
				accessibility = cellinfo._query_pseudo_accessibility(datarow, pseudo);
			}

			return accessibility;
		}
		return null;
	};

	_pGridButton.on_find_CurrentStyle_background = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var background = this._find_pseudo_obj("background", pseudo, "background");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!background) {
				background = cellinfo._query_pseudo_background(datarow, cellobj._curDisplayType, pseudo);
			}

			return background;
		}
		return null;
	};

	_pGridButton.on_find_CurrentStyle_border = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var border = this._find_pseudo_obj("border", pseudo, "border");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!border) {
				border = cellinfo._query_pseudo_border(datarow, cellobj._curDisplayType, pseudo);
			}

			return border;
		}
		return null;
	};

	_pGridButton.on_find_CurrentStyle_bordertype = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var bordertype = this._find_pseudo_obj("bordertype", pseudo, "bordertype");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			return bordertype;
		}
		return null;
	};

	_pGridButton.on_find_CurrentStyle_color = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var color = this._find_pseudo_obj("color", pseudo, "color");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!color) {
				color = cellinfo._query_pseudo_color(datarow, cellobj._curDisplayType, pseudo);
			}

			return color;
		}
		return null;
	};

	_pGridButton.on_find_CurrentStyle_font = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var font = this._find_pseudo_obj("font", pseudo, "font");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!font) {
				font = cellinfo._query_pseudo_font(datarow, cellobj._curDisplayType, pseudo);
			}

			return font;
		}
		return null;
	};

	_pGridButton.on_find_CurrentStyle_letterspace = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var letterspace = this._find_pseudo_obj("letterspace", pseudo, "letterspace");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!letterspace) {
				letterspace = cellinfo._query_pseudo_letterspace(datarow, cellobj._curDisplayType, pseudo);
			}

			return letterspace;
		}
		return null;
	};

	_pGridButton.on_find_CurrentStyle_gradation = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var gradation = this._find_pseudo_obj("gradation", pseudo, "gradation");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!gradation) {
				gradation = cellinfo._query_pseudo_gradation(datarow, cellobj._curDisplayType, pseudo);
			}

			return gradation;
		}
		return null;
	};

	_pGridButton.on_find_CurrentStyle_cursor = function (pseudo) {
		var grid = this._grid;
		if (grid._global_cursor) {
			return grid._global_cursor;
		}

		var cursor = this._find_pseudo_obj("cursor", pseudo) || this.parent.on_find_CurrentStyle_cursor(pseudo);
		return (cursor) ? cursor : nexacro.Component._default_cursor;
	};

	_pGridButton._makeCssRefInfo = function () {
		return (this._grid._makeCssRefInfoCtrl(this));
	};

	_pGridButton._find_pseudo_obj = function (styleProp, pseudo, returnType) {
		var cellinfo = this._cellinfo;
		if (this._displaymode == true) {
			if (pseudo != "disabled") {
				pseudo = "normal";
			}
		}
		var grid = this._grid;
		var datarow = grid._getDataRow(this._cellobj._rowidx);

		if (this._cellobj && this._grid._isFakeCell(datarow) && pseudo != "disabled") {
			pseudo = "normal";
		}

		datarow = grid._getDataRow(this._cellobj._rowidx);
		var controlProp = "control" + styleProp;
		var v = cellinfo._query_pseudo_control(this, datarow, controlProp, styleProp, pseudo, returnType);
		return v;
	};

	_pGridButton.on_destroy_contents = function () {
		nexacro.ButtonCtrl.prototype.on_destroy_contents.call(this);

		this._grid = null;
		this._cellinfo = null;
		this._cellobj = null;
	};

	_pGridButton._setAccessibilityStatFocus = function () {
		var cellobj = this._cellobj;
		var label = cellobj._getAccessibilityMakeAddLabel();

		var tmp_label = "";
		var accessibility = this.on_find_CurrentStyle_accessibility(this._pseudo);
		if (accessibility) {
			if (accessibility._bindexpr && accessibility._bindexpr.length > 0) {
				tmp_label = this._cellinfo._getAttrValue(accessibility, this._rowidx);
				accessibility._setValue(tmp_label);
			}
			tmp_label = this._getAccessibilityLabel(accessibility);
		}
		else {
			tmp_label = cellobj._getCellAccessibilityLabel();
		}
		label += " " + tmp_label;

		this._setAccessibilityLabel(label);
		nexacro.Component.prototype._setAccessibilityStatFocus.call(this);
	};

	_pGridButton.on_apply_custom_setfocus = function (evt_name) {
		if (!this._displaymode) {
			nexacro.ButtonCtrl.prototype.on_apply_custom_setfocus.call(this, evt_name);
		}
	};

	_pGridButton.on_get_style_accessibility_description = function () {
		if (this._cellobj) {
			return this._cellobj.tooltiptext;
		}
	};

	_pGridButton.on_get_style_accessibility_label = function () {
		return this.text;
	};

	_pGridButton.on_fire_user_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp) {
		var ret = nexacro.Component.prototype.on_fire_user_onkeyup.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp);
		if (key_code == 13 || key_code == 32) {
			this.click();
		}
		return ret;
	};

	_pGridButton._on_bubble_touchend = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble) {
		var call = true;
		if (is_userbubble) {
			call = this._cellobj._common_lbuttonup(changedtouchinfos, null, null, null, null);
		}

		if (call) {
			nexacro.ButtonCtrl.prototype._on_bubble_touchend.call(this, touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble);
		}

		return true;
	};
	_pGridButton._on_bubble_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_lbuttonup(null, elem, canvasX, canvasY, from_elem);
		}

		if (call) {
			nexacro.ButtonCtrl.prototype._on_bubble_lbuttonup.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope);
		}

		return true;
	};

	_pGridButton._on_bubble_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseenter();
		}

		if (call) {
			nexacro.ButtonCtrl.prototype._on_bubble_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridButton._on_bubble_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseleave();
		}

		if (call) {
			nexacro.ButtonCtrl.prototype._on_bubble_mouseleave.call(this, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridButton.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		nexacro.ButtonCtrl.prototype.on_fire_user_ontouchstart.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridButton.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		nexacro.ButtonCtrl.prototype.on_fire_user_onlbuttondown.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		return true;
	};

	_pGridButton.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		nexacro.ButtonCtrl.prototype.on_fire_user_ontouchend.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchend(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridButton.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		nexacro.ButtonCtrl.prototype.on_fire_user_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
		this._cellobj.on_fire_user_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
		return true;
	};

	_pGridButton.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		nexacro.ButtonCtrl.prototype.on_fire_onclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, "control");
		return true;
	};

	_pGridButton.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		nexacro.ButtonCtrl.prototype.on_fire_ondblclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, "control");
		return true;
	};

	_pGridButton._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridButton._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};

	_pGridButton._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY) {
		if (!this._is_alive) {
			return;
		}

		var visible = this.visible;
		if (this._displaymode && this._grid.selectchangetype == "up") {
			visible = true;
		}

		if (visible && this._isEnable() && this.enableevent) {
			var clientXY = this._getClientXY(canvasX, canvasY);
			this.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this);
		}
	};

	_pGridButton._isEnable = function () {
		return this._grid._enable;
	};

	_pGridButton._EditUpdateAll = function (cellinfo, cellobj) {
		if (this.getElement()) {
			this._cellinfo = cellinfo;
			this._cellobj = cellobj;
			this._setProperty();
			this._control_pseudo = "";
			this._contents_pseudo = "";
			this.on_apply_pseudo(this._pseudo);

			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);
			var wordwrap = cellinfo._getWordwrap(datarow);
			this.set_wordwrap(wordwrap);
		}
	};

	_pGridButton._setDataset = function (async) {
	};

	_pGridButton._setProperty = function () {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		var grid = this._grid;
		var datarow = grid._getDataRow(cellobj._rowidx);

		var v;
		if (this._displaymode == true) {
			v = cellinfo._getDisplayText(datarow);
		}
		else {
			v = cellinfo._getValue(datarow);
		}

		v = nexacro._toString(v);
		if (v != null) {
			this.set_text(v);
		}
		else {
			this.set_text("");
		}
	};

	_pGridButton._updateAll = function () {
		this.on_apply_pseudo(this._pseudo);
		this._setProperty();
	};

	delete _pGridButton;

	nexacro.GridControlBar = function (id, left, top, width, height, parent, controlmode) {
		nexacro.ProgressBarCtrl.call(this, id, "absolute", left, top, width, height, null, null, parent);

		this.tabstop = false;
		this.max = 100;
		this.min = 0;
		this.blockgap = 0;
		this.step = 1;
		this._controlmode = (controlmode) ? true : false;


		if (parent._refobj) {
			this._grid = parent._refobj.grid;
			this._cellinfo = parent._refobj;
			this._cellobj = parent;
		}
		else {
			this._grid = parent;
		}
	};
	var _pGridBar = nexacro.GridControlBar.prototype = nexacro._createPrototype(nexacro.ProgressBarCtrl, nexacro.GridControlBar);


	_pGridBar.on_find_CurrentStyle_align = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var align = this._find_pseudo_obj("align", pseudo, "align");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!align) {
				align = cellinfo._query_pseudo_align(datarow, cellobj._curDisplayType, pseudo);
			}

			return align;
		}
		return null;
	};

	_pGridBar.on_find_CurrentStyle_font = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var font = this._find_inherit_pseudo_obj("font", pseudo, "font");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!font) {
				font = cellinfo._query_pseudo_font(datarow, cellobj._selected, pseudo);
			}

			return font;
		}
		return null;
	};

	_pGridBar.on_find_CurrentStyle_letterspace = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var letterspace = this._find_inherit_pseudo_obj("letterspace", pseudo, "letterspace");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!letterspace) {
				letterspace = cellinfo._query_pseudo_letterspace(datarow, cellobj._selected, pseudo);
			}

			return letterspace;
		}
		return null;
	};

	_pGridBar.on_find_CurrentStyle_color = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var odd = (this._rowidx >= 0) ? (this._rowidx % 2) : false;
			var color = this._find_inherit_pseudo_obj("color", pseudo, "color");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!color) {
				color = cellinfo._query_pseudo_color(datarow, odd, cellobj._selected, pseudo);
			}
			return color;
		}
		return null;
	};

	_pGridBar.on_find_CurrentStyle_cursor = function (pseudo) {
		var grid = this._grid;
		if (grid._global_cursor) {
			return grid._global_cursor;
		}

		var cursor = this._find_pseudo_obj("cursor", pseudo) || this.parent.on_find_CurrentStyle_cursor(pseudo);
		return (cursor) ? cursor : nexacro.Component._default_cursor;
	};

	_pGridBar.on_find_CurrentStyle_accessibility = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var accessibility = this._find_pseudo_obj("accessibility", pseudo, "accessibility");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!accessibility) {
				accessibility = cellinfo._query_pseudo_accessibility(datarow, pseudo);
			}

			return accessibility;
		}
		return null;
	};

	_pGridBar.on_find_CurrentStyle_background = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var background = this._find_pseudo_obj("background", pseudo, "background");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!background) {
				background = cellinfo._query_pseudo_background(datarow, cellobj._curDisplayType, pseudo);
			}

			return background;
		}
		return null;
	};

	_pGridBar.on_find_CurrentStyle_border = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var border = this._find_pseudo_obj("border", pseudo, "border");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!border) {
				border = cellinfo._query_pseudo_border(datarow, cellobj._curDisplayType, pseudo);
			}

			return border;
		}
		return null;
	};

	_pGridBar.on_find_CurrentStyle_bordertype = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var bordertype = this._find_pseudo_obj("bordertype", pseudo, "bordertype");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			return bordertype;
		}
		return null;
	};

	_pGridBar.on_find_CurrentStyle_gradation = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var gradation = this._find_pseudo_obj("gradation", pseudo, "gradation");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!gradation) {
				gradation = cellinfo._query_pseudo_gradation(datarow, cellobj._curDisplayType, pseudo);
			}

			return gradation;
		}
		return null;
	};

	_pGridBar._makeCssRefInfo = function () {
		return (this._grid._makeCssRefInfoCtrl(this));
	};

	_pGridBar._find_pseudo_obj = function (styleProp, pseudo, returnType) {
		var cellinfo = this._cellinfo;
		var controlProp = "control" + styleProp;
		var grid = this._grid;
		var datarow = grid._getDataRow(this._cellobj._rowidx);

		if (this._cellobj && this._grid._isFakeCell(datarow) && pseudo != "disabled") {
			pseudo = "normal";
		}

		if (styleProp == "barcolor" || styleProp == "bardirection" || styleProp == "bargradation") {
			controlProp = "";
		}
		else if (styleProp == "padding") {
			return null;
		}

		datarow = grid._getDataRow(this._cellobj._rowidx);
		var v = cellinfo._query_pseudo_control(this, datarow, controlProp, styleProp, pseudo, returnType);
		return v;
	};

	_pGridBar.on_destroy_contents = function () {
		nexacro.ProgressBarCtrl.prototype.on_destroy_contents.call(this);

		this._grid = null;
		this._cellinfo = null;
		this._cellobj = null;
	};

	_pGridBar._setAccessibilityStatFocus = function () {
		var cellobj = this._cellobj;
		var label = cellobj._getAccessibilityMakeAddLabel();

		var tmp_label = "";
		var accessibility = this.on_find_CurrentStyle_accessibility(this._pseudo);
		if (accessibility) {
			if (accessibility._bindexpr && accessibility._bindexpr.length > 0) {
				tmp_label = this._cellinfo._getAttrValue(accessibility, this._rowidx);
				accessibility._setValue(tmp_label);
			}
			tmp_label = this._getAccessibilityLabel(accessibility);
		}
		else {
			tmp_label = cellobj._getCellAccessibilityLabel();
		}
		label += " " + tmp_label;

		this._setAccessibilityLabel(label);
		nexacro.Component.prototype._setAccessibilityStatFocus.call(this);
	};

	_pGridBar.on_get_style_accessibility_description = function () {
		if (this._cellobj) {
			return this._cellobj.tooltiptext;
		}
	};

	_pGridBar.set_text = function (v) {
		var retn = nexacro.Component.prototype.set_text.call(this, v);
		this.set_pos(parseInt(this._display_text));
		return retn;
	};

	_pGridBar.on_apply_text = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var text_elem = this._text_elem;
			var align = this.currentstyle.align;

			if (!align) {
				this.on_apply_custom_pseudo(this._pseudo);
				align = this.currentstyle.align;
			}

			if (!text_elem) {
				text_elem = new nexacro.TextBoxElement(control_elem);
				this._text_elem = text_elem;

				var rect = this._grid._getAvailableRect(this);
				text_elem.setElementSize(rect.width, rect.height);

				if (this._is_created) {
					var halign = (!align || align.halign == "") ? "center" : align._halign;
					var valign = (!align || align.valign == "") ? "middle" : align._valign;
					text_elem.setElementColor(this.currentstyle.color);
					text_elem.setElementFont(this.currentstyle.font);
					text_elem.setElementAlignXY(halign, valign);
					text_elem.setElementLetterSpace(this.currentstyle.letterspace);
					text_elem.create();
				}
			}
			else {
				var halign = (!align || align.halign == "") ? "center" : align._halign;
				var valign = (!align || align.valign == "") ? "middle" : align._valign;
				text_elem.setElementColor(this.currentstyle.color);
				text_elem.setElementFont(this.currentstyle.font);
				text_elem.setElementLetterSpace(this.currentstyle.letterspace);
				text_elem.setElementAlignXY(halign, valign);
			}
			this._text_elem.setElementText(this._display_text);
		}
	};

	_pGridBar.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, "control");
	};

	_pGridBar.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, "control");
	};

	_pGridBar._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridBar._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};

	_pGridBar._isEnable = function () {
		return this._grid._enable;
	};

	_pGridBar._getDisplayText = function () {
		if (this.parent) {
			return this.parent._getDisplayText();
		}
		return "";
	};

	_pGridBar._updateAll = function () {
		if (this.getElement()) {
			this.on_apply_pseudo(this._pseudo);
			this._setProperty();
		}
	};

	_pGridBar._setProperty = function () {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		var grid = this._grid;
		var datarow = grid._getDataRow(cellobj._rowidx);

		var v = cellinfo._getDisplayText(datarow);
		v = nexacro._toString(v);

		if (v != null) {
			this.set_text(v);
		}
		else {
			this.set_text("");
		}
	};

	delete _pGridBar;

	nexacro.GridControlEdit = function (id, left, top, width, height, parent, displaymode, controlmode) {
		nexacro.EditCtrl.call(this, id, "absolute", left, top, width, height, null, null, parent);

		this.tabstop = false;
		this.editfilter = "none";

		if (displaymode) {
			this._displaymode = true;
			this.readonly = true;
		}
		else {
			this._displaymode = false;
		}

		this._controlmode = (controlmode) ? true : false;

		if (parent._refobj) {
			this._grid = parent._refobj.grid;
			this._cellinfo = parent._refobj;
			this._cellobj = parent;
		}
		else {
			this._grid = parent;
		}
		this._absolutelyValue = false;
	};

	var _pGridEdit = nexacro._createPrototype(nexacro.EditCtrl, nexacro.GridControlEdit);
	nexacro.GridControlEdit.prototype = _pGridEdit;
	_pGridEdit._displaymode = false;


	_pGridEdit.on_find_CurrentStyle_align = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;

		if (cellinfo && cellobj) {
			if (this._displaymode) {
				if (pseudo != "disabled") {
					pseudo = "normal";
				}
			}

			var align = this._find_pseudo_obj("align", pseudo, "align");
			return align;
		}
		return null;
	};

	_pGridEdit.on_find_CurrentStyle_font = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;

		if (cellinfo && cellobj) {
			if (this._displaymode) {
				if (pseudo != "disabled") {
					pseudo = "normal";
				}
			}

			var font = this._find_inherit_pseudo_obj("font", pseudo);

			if (!font) {
				font = cellobj.on_find_CurrentStyle_font(pseudo);
			}

			return font;
		}
		return null;
	};

	_pGridEdit.on_find_CurrentStyle_letterspace = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;

		if (cellinfo && cellobj) {
			if (this._displaymode) {
				if (pseudo != "disabled") {
					pseudo = "normal";
				}
			}

			var letterspace = this._find_inherit_pseudo_obj("letterspace", pseudo);

			if (!letterspace) {
				letterspace = cellobj.on_find_CurrentStyle_letterspace(pseudo);
			}

			return letterspace;
		}
		return null;
	};

	_pGridEdit.on_find_CurrentStyle_color = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;

		if (cellinfo && cellobj) {
			if (this._displaymode) {
				if (pseudo != "disabled") {
					pseudo = "normal";
				}
			}

			var color = this._find_inherit_pseudo_obj("color", pseudo);

			if (!color) {
				color = cellobj.on_find_CurrentStyle_color(pseudo);
			}

			return color;
		}
		return null;
	};

	_pGridEdit.on_find_CurrentStyle_accessibility = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var accessibility = this._find_pseudo_obj("accessibility", pseudo, "accessibility");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!accessibility) {
				accessibility = cellinfo._query_pseudo_accessibility(datarow, pseudo);
			}

			return accessibility;
		}
		return null;
	};

	_pGridEdit.on_find_CurrentStyle_background = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var background = this._find_pseudo_obj("background", pseudo, "background");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!background) {
				background = cellinfo._query_pseudo_background(datarow, cellobj._curDisplayType, pseudo);
			}

			return background;
		}
		return null;
	};

	_pGridEdit.on_find_CurrentStyle_border = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var border = this._find_pseudo_obj("border", pseudo, "border");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!border) {
				border = cellinfo._query_pseudo_border(datarow, cellobj._curDisplayType, pseudo);
			}

			return border;
		}
		return null;
	};

	_pGridEdit.on_find_CurrentStyle_bordertype = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var bordertype = this._find_pseudo_obj("bordertype", pseudo, "bordertype");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			return bordertype;
		}
		return null;
	};

	_pGridEdit.on_find_CurrentStyle_gradation = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var gradation = this._find_pseudo_obj("gradation", pseudo, "gradation");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!gradation) {
				gradation = cellinfo._query_pseudo_gradation(datarow, cellobj._curDisplayType, pseudo);
			}

			return gradation;
		}
		return null;
	};

	_pGridEdit._makeCssRefInfo = function () {
		return (this._grid._makeCssRefInfoCtrl(this));
	};

	_pGridEdit._find_pseudo_obj = function (styleProp, pseudo, returnType) {
		var cellinfo = this._cellinfo;
		if (this._displaymode == true) {
			if (pseudo != "disabled") {
				pseudo = "normal";
			}
		}
		var grid = this._grid;
		var datarow = grid._getDataRow(this._cellobj._rowidx);
		var controlProp = "control" + styleProp;
		var v = cellinfo._query_pseudo_control(this, datarow, controlProp, styleProp, pseudo, returnType);
		return v;
	};

	_pGridEdit.on_destroy_contents = function () {
		nexacro.EditCtrl.prototype.on_destroy_contents.call(this);

		this._grid = null;
		this._cellinfo = null;
		this._cellobj = null;
	};

	_pGridEdit.on_apply_custom_setfocus = function (evt_name, callback) {
		if (this._grid._onceTime_focus && !callback) {
			nexacro.OnceCallbackTimer.callonce(this, function () {
				this.on_apply_custom_setfocus(evt_name, true);
			}, 0);
			return;
		}
		return nexacro.EditCtrl.prototype.on_apply_custom_setfocus.call(this, evt_name);
	};

	_pGridEdit._setAccessibilityStatFocus = function () {
		var cellobj = this._cellobj;
		var label = cellobj._getAccessibilityMakeAddLabel();

		var tmp_label = "";
		var accessibility = this.on_find_CurrentStyle_accessibility(this._pseudo);
		if (accessibility) {
			if (accessibility._bindexpr && accessibility._bindexpr.length > 0) {
				tmp_label = this._cellinfo._getAttrValue(accessibility, this._rowidx);
				accessibility._setValue(tmp_label);
			}
			tmp_label = this._getAccessibilityLabel(accessibility);
		}
		else {
			tmp_label = cellobj._getCellAccessibilityLabel();
		}
		label += " " + tmp_label;

		this._setAccessibilityLabel(label);
		nexacro.Component.prototype._setAccessibilityStatFocus.call(this);
	};

	_pGridEdit.on_get_style_accessibility_description = function () {
		if (this._cellobj) {
			return this._cellobj.tooltiptext;
		}
	};

	_pGridEdit.on_apply_autoskip = function () {
		this._grid._moveToCell("next", true);
	};

	_pGridEdit.on_apply_editfilter = function (v) {
		switch (v) {
			case 'alpha':
			case 'alpha,number':
			case 'digit':
			case 'number':
			case 'alpha,digit':
				this.set_inputfilter("none");
				this.set_inputtype(v);
				break;
			case 'lower':
			case 'upper':
				this.set_inputfilter("none");
				this.set_inputtype("alpha");
				break;
			case 'lower,digit':
			case 'upper,digit':
				this.set_inputfilter("none");
				this.set_inputtype("alpha,digit");
				break;
			case 'lower,number':
			case 'upper,number':
				this.set_inputfilter("none");
				this.set_inputtype("alpha,number");
				break;
			case 'none':
				this.set_inputfilter("none");
				this.set_inputtype("normal");
				break;
			case 'alpha,number,nosign':
			case 'lower,number,nosign':
			case 'upper,number,nosign':
				this.set_inputfilter("sign");
				this.set_inputtype("alpha,number");
				break;
			case 'char':
			case 'lower,char':
			case 'upper,char':
				this.set_inputfilter("comma,symbol,sign,digit,dot");
				this.set_inputtype("normal");
				break;
			case 'integer':
				this.set_inputfilter("dot");
				this.set_inputtype("number");
				break;
			case 'digit,char':
			case 'lower,digit,char':
			case 'upper,digit,char':
				this.set_inputfilter("comma,symbol,sign,dot");
				this.set_inputtype("normal");
				break;
			case 'number,char':
			case 'lower,number,char':
			case 'upper,number,char':
				this.set_inputfilter("comma,symbol");
				this.set_inputtype("normal");
				break;
		}
		if (v.indexOf("upper") >= 0) {
			this.set_inputmode("upper");
		}
		else if (v.indexOf("lower") >= 0) {
			this.set_inputmode("lower");
		}
		else {
			this.set_inputmode("normal");
		}
	};

	_pGridEdit.set_editfilter = function (v) {
		if (this.editfilter != v) {
			this.editfilter = v;
			this.on_apply_editfilter(v);
		}
		return v;
	};

	_pGridEdit._on_bubble_touchend = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble) {
		var call = true;
		if (is_userbubble) {
			call = this._cellobj._common_lbuttonup(changedtouchinfos, null, null, null, null);
		}

		if (call) {
			nexacro.EditCtrl.prototype._on_bubble_touchend.call(this, touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble);
		}

		return true;
	};
	_pGridEdit._on_bubble_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_lbuttonup(null, elem, canvasX, canvasY, from_elem);
		}

		if (call) {
			nexacro.EditCtrl.prototype._on_bubble_lbuttonup.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope);
		}

		return true;
	};

	_pGridEdit._on_bubble_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseenter();
		}

		if (call) {
			nexacro.EditCtrl.prototype._on_bubble_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridEdit._on_bubble_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseleave();
		}

		if (call) {
			nexacro.EditCtrl.prototype._on_bubble_mouseleave.call(this, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}
		return true;
	};

	_pGridEdit.on_fire_onkillfocus = function (newobj, newreferobj) {
		return this._cellobj.on_fire_onkillfocus(newobj, newreferobj);
	};

	_pGridEdit.on_fire_ontextchange = function (event_info) {
		if (this._absolutelyValue == true) {
			return true;
		}

		nexacro.EditCtrl.prototype.on_fire_ontextchange.call(this, event_info);
		return this._grid.on_fire_ontextchange(this, event_info.chartext, event_info.pretext, event_info.posttext, event_info.preimetext, event_info.postimetext);
	};

	_pGridEdit.on_fire_ontextchanged = function (obj, pretext, posttext) {
		return this._grid.on_fire_ontextchanged(obj, pretext, posttext);
	};

	_pGridEdit.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		nexacro.EditCtrl.prototype.on_fire_user_ontouchend.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchend(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridEdit.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		nexacro.EditCtrl.prototype.on_fire_user_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
		this._cellobj.on_fire_user_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
		return true;
	};

	_pGridEdit.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		nexacro.EditCtrl.prototype.on_fire_user_ontouchstart.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridEdit.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		nexacro.EditCtrl.prototype.on_fire_user_onlbuttondown.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		return true;
	};

	_pGridEdit.on_fire_oneditclick = function (obj, caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem) {
		nexacro.EditCtrl.prototype.on_fire_oneditclick.call(this, obj, caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem);
		return true;
	};

	_pGridEdit.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this._displaymode) {
			this.setSelect(0, 0);
		}

		nexacro.EditCtrl.prototype.on_fire_ondblclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, "control");
		return true;
	};

	if (nexacro.Browser == "Gecko" || nexacro.Browser == "Opera") {
		_pGridEdit._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY) {
			if (!this._is_alive) {
				return;
			}

			var visible = this.visible;
			if (this._displaymode) {
				visible = true;
			}

			var clickitem = "";
			if (elem instanceof nexacro.InputElement) {
				var halign, valign;

				if (elem.align) {
					halign = elem.align._halign;
					valign = elem.align._valign;
				}
				else if (elem.halign && elem.valign) {
					halign = elem.halign;
					valign = elem.valign;
				}

				clickitem = this._cellobj._getClickItem(halign, valign, canvasX, canvasY, elem.text, this);
			}

			if (!clickitem) {
				clickitem = "control";
			}

			if (visible && this._isEnable() && this.enableevent) {
				var caretPos = this.getCaretPos();
				var clientXY = this._getClientXY(canvasX, canvasY);
				this.on_fire_oneditclick(this, caretPos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this, clickitem);
			}
		};
	}
	else {
		_pGridEdit._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY) {
			if (!this._is_alive) {
				return;
			}

			var visible = this.visible;
			if (this._displaymode && this._grid.selectchangetype == "up") {
				visible = true;
			}

			var clickitem = "";
			if (elem instanceof nexacro.InputElement) {
				var halign, valign;

				if (elem.align) {
					halign = elem.align._halign;
					valign = elem.align._valign;
				}
				else if (elem.halign && elem.valign) {
					halign = elem.halign;
					valign = elem.valign;
				}

				clickitem = this._cellobj._getClickItem(halign, valign, canvasX, canvasY, elem.text, this);
			}

			if (!clickitem) {
				clickitem = "control";
			}

			if (visible && this._isEnable() && this.enableevent) {
				var caretPos = this.getCaretPos();
				var clientXY = this._getClientXY(canvasX, canvasY);
				this.on_fire_oneditclick(this, caretPos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this, clickitem);
			}
		};
	}

	_pGridEdit._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridEdit._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};

	_pGridEdit.on_getBindableProperties = function () {
		if (!this._displaymode) {
			return "value";
		}
	};

	_pGridEdit._isEnable = function () {
		return this._grid._enable;
	};

	_pGridEdit._set_absolutelyValue = function (v) {
		this._absolutelyValue = true;
		this.set_value(v);
		this._absolutelyValue = false;
	};

	_pGridEdit._updateAll = function () {
		if (this.getElement()) {
			this.on_apply_pseudo(this._pseudo);
			this._setProperty();
		}
	};

	_pGridEdit._setProperty = function () {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		var grid = this._grid;
		var datarow = grid._getDataRow(cellobj._rowidx);

		var v;
		if (this._displaymode == true) {
			v = cellinfo._getDisplayText(datarow);
		}
		else {
			v = cellinfo._getValue(datarow);
		}

		this._set_absolutelyValue(v);

		v = cellinfo._getAttrValue(cellinfo.editautoselect, datarow);
		if (v != null) {
			this.set_autoselect(v);
		}
		v = cellinfo._getAttrValue(cellinfo.editautoskip, datarow);
		if (v != null) {
			this.set_autoskip(v);
		}
		v = cellinfo._getAttrValue(cellinfo.editfilter, datarow);
		if (v != null) {
			this.set_editfilter(v);
		}
		v = cellinfo._getAttrValue(cellinfo.editimemode, datarow);
		if (v != null) {
			this.set_imemode(v);
		}
		v = cellinfo._getAttrValue(cellinfo.edituseime, datarow);
		if (v != null) {
			this.set_useime(v);
		}
		v = cellinfo._getAttrValue(cellinfo.editlengthunit, datarow);
		if (v != null) {
			this.set_lengthunit(v);
		}
	};

	_pGridEdit._EditUpdateAll = function (cellinfo, cellobj) {
		if (this.getElement()) {
			this._cellinfo = cellinfo;
			this._cellobj = cellobj;
			this._setProperty();
			this._control_pseudo = "";
			this._contents_pseudo = "";
			this.on_apply_pseudo(this._pseudo);
		}
	};

	_pGridEdit._setDataset = function (async, row) {
		var cellobj = this._cellobj;
		var cellinfo = this._cellinfo;
		var grid = this._grid;
		var datarow = grid._getDataRow(cellobj._rowidx);

		var api = this._edit_base_api;
		if (api) {
			if (api._is_composition()) {
				var stat = api._stat_composition.getCurrentStatus();
				var data = api._stat_composition.getData();

				var proc_fire_text_event = api._on_input_compositionend(data);

				if (!proc_fire_text_event) {
					api._fire_text_event(data);
				}

				if (nexacro.Browser == "Safari") {
					if (stat == nexacro.EditBase.Status.CompositionStart) {
						api._on_input_compositionstart(data);
					}
					else if (stat == nexacro.EditBase.Status.CompositionUpdate) {
						api._on_input_compositionupdate(data);
					}
				}
			}
		}

		var v = this.value;

		if (row != undefined) {
			datarow = row;
		}

		var retn = true;

		if (cellinfo.text._bindtype == 1) {
			this._grid._is_async_recreate = async;
			this._grid._dsEventOccured = true;

			var fail = {
				status : ""
			};
			cellinfo.grid._binddataset._setColumn(datarow, cellinfo.text._bindexpr, v, fail);

			if (fail.status == "cancolumnchange") {
				retn = false;
			}

			this._grid._dsEventOccured = false;
		}
		return retn;
	};

	_pGridEdit._on_input_blur = function (elem, target) {
		var grid = this._grid;
		var api = this._edit_base_api;
		if (api) {
			var stat = api._stat_composition.getCurrentStatus();
			var data = api._stat_composition.getData();

			grid._currentCompositionStatus = stat;
			grid._currentCompositionData = data;

			api._on_input_blur(elem, target);
		}
	};

	delete _pGridEdit;

	nexacro.GridControlTextArea = function (id, left, top, width, height, parent, displaymode, controlmode) {
		nexacro.TextAreaCtrl.call(this, id, "absolute", left, top, width, height, null, null, parent);
		this.tabstop = false;
		this.editfilter = "none";

		if (displaymode) {
			this._displaymode = true;
			this.readonly = true;
		}
		else {
			this._displaymode = false;
		}

		this._controlmode = (controlmode) ? true : false;

		if (parent._refobj) {
			this._grid = parent._refobj.grid;
			this._cellinfo = parent._refobj;
			this._cellobj = parent;
		}
		else {
			this._grid = parent;
		}
		this._absolutelyValue = false;
		this._is_use_ex_enter = true;
	};

	var _pGridTextArea = nexacro._createPrototype(nexacro.TextAreaCtrl, nexacro.GridControlTextArea);
	nexacro.GridControlTextArea.prototype = _pGridTextArea;


	_pGridTextArea.on_find_CurrentStyle_align = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;

		if (cellinfo && cellobj) {
			if (this._displaymode) {
				if (pseudo != "disabled") {
					pseudo = "normal";
				}
			}

			var align = this._find_pseudo_obj("align", pseudo, "align");
			return align;
		}
		return null;
	};

	_pGridTextArea.on_find_CurrentStyle_color = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;

		if (cellinfo && cellobj) {
			if (this._displaymode) {
				if (pseudo != "disabled") {
					pseudo = "normal";
				}
			}

			var font = this._find_inherit_pseudo_obj("font", pseudo);

			if (!font) {
				font = cellobj.on_find_CurrentStyle_font(pseudo);
			}

			return font;
		}
		return null;
	};

	_pGridTextArea.on_find_CurrentStyle_color = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;

		if (cellinfo && cellobj) {
			if (this._displaymode) {
				if (pseudo != "disabled") {
					pseudo = "normal";
				}
			}

			var color = this._find_inherit_pseudo_obj("color", pseudo);

			if (!color) {
				color = cellobj.on_find_CurrentStyle_color(pseudo);
			}

			return color;
		}
		return null;
	};

	_pGridTextArea.on_find_CurrentStyle_accessibility = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var accessibility = this._find_pseudo_obj("accessibility", pseudo, "accessibility");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!accessibility) {
				accessibility = cellinfo._query_pseudo_accessibility(datarow, pseudo);
			}

			return accessibility;
		}
		return null;
	};

	_pGridTextArea.on_find_CurrentStyle_background = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var background = this._find_pseudo_obj("background", pseudo, "background");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!background) {
				background = cellinfo._query_pseudo_background(datarow, cellobj._curDisplayType, pseudo);
			}

			return background;
		}
		return null;
	};

	_pGridTextArea.on_find_CurrentStyle_border = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var border = this._find_pseudo_obj("border", pseudo, "border");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!border) {
				border = cellinfo._query_pseudo_border(datarow, cellobj._curDisplayType, pseudo);
			}

			return border;
		}
		return null;
	};

	_pGridTextArea.on_find_CurrentStyle_bordertype = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var bordertype = this._find_pseudo_obj("bordertype", pseudo, "bordertype");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			return bordertype;
		}
		return null;
	};

	_pGridTextArea.on_find_CurrentStyle_gradation = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var gradation = this._find_pseudo_obj("gradation", pseudo, "gradation");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!gradation) {
				gradation = cellinfo._query_pseudo_gradation(datarow, cellobj._curDisplayType, pseudo);
			}

			return gradation;
		}
		return null;
	};

	_pGridTextArea._makeCssRefInfo = function () {
		return (this._grid._makeCssRefInfoCtrl(this));
	};

	_pGridTextArea._find_pseudo_obj = function (styleProp, pseudo, returnType) {
		var cellinfo = this._cellinfo;
		if (this._displaymode == true) {
			if (pseudo != "disabled") {
				pseudo = "normal";
			}
		}
		var grid = this._grid;
		var datarow = grid._getDataRow(this._cellobj._rowidx);

		if (this._cellobj && this._grid._isFakeCell(datarow) && pseudo != "disabled") {
			pseudo = "normal";
		}

		datarow = grid._getDataRow(this._cellobj._rowidx);
		var controlProp = "control" + styleProp;
		var v = cellinfo._query_pseudo_control(this, datarow, controlProp, styleProp, pseudo, returnType);
		return v;
	};

	_pGridTextArea.on_destroy_contents = function () {
		nexacro.TextAreaCtrl.prototype.on_destroy_contents.call(this);

		this._grid = null;
		this._cellinfo = null;
		this._cellobj = null;
	};

	_pGridTextArea.on_apply_custom_setfocus = function (evt_name, callback) {
		if (this._grid._onceTime_focus && !callback) {
			nexacro.OnceCallbackTimer.callonce(this, function () {
				this.on_apply_custom_setfocus(evt_name, true);
			}, 0);
			return;
		}
		return nexacro.TextAreaCtrl.prototype.on_apply_custom_setfocus.call(this, evt_name);
	};

	_pGridTextArea._setAccessibilityStatFocus = function () {
		var cellobj = this._cellobj;
		var label = cellobj._getAccessibilityMakeAddLabel();

		var tmp_label = "";
		var accessibility = this.on_find_CurrentStyle_accessibility(this._pseudo);
		if (accessibility) {
			if (accessibility._bindexpr && accessibility._bindexpr.length > 0) {
				tmp_label = this._cellinfo._getAttrValue(accessibility, this._rowidx);
				accessibility._setValue(tmp_label);
			}
			tmp_label = this._getAccessibilityLabel(accessibility);
		}
		else {
			tmp_label = cellobj._getCellAccessibilityLabel();
		}
		label += " " + tmp_label;

		this._setAccessibilityLabel(label);
		nexacro.Component.prototype._setAccessibilityStatFocus.call(this);
	};

	_pGridTextArea.on_get_style_accessibility_description = function () {
		if (this._cellobj) {
			return this._cellobj.tooltiptext;
		}
	};

	_pGridTextArea.set_editfilter = function (v) {
		if (this.editfilter != v) {
			this.editfilter = v;
			this.on_apply_editfilter(v);
		}
		return v;
	};

	_pGridTextArea.on_apply_editfilter = function (v) {
		switch (v) {
			case 'alpha':
			case 'alpha,number':
			case 'digit':
			case 'number':
			case 'alpha,digit':
				this.set_inputfilter("none");
				this.set_inputtype(v);
				break;
			case 'lower':
			case 'upper':
				this.set_inputfilter("none");
				this.set_inputtype("alpha");
				break;
			case 'lower,digit':
			case 'upper,digit':
				this.set_inputfilter("none");
				this.set_inputtype("alpha,digit");
				break;
			case 'lower,number':
			case 'upper,number':
				this.set_inputfilter("none");
				this.set_inputtype("alpha,number");
				break;
			case 'none':
				this.set_inputfilter("none");
				this.set_inputtype("normal");
				break;
			case 'alpha,number,nosign':
			case 'lower,number,nosign':
			case 'upper,number,nosign':
				this.set_inputfilter("sign");
				this.set_inputtype("alpha,number");
				break;
			case 'char':
			case 'lower,char':
			case 'upper,char':
				this.set_inputfilter("comma,symbol,sign,digit,dot");
				this.set_inputtype("normal");
				break;
			case 'integer':
				this.set_inputfilter("dot");
				this.set_inputtype("number");
				break;
			case 'digit,char':
			case 'lower,digit,char':
			case 'upper,digit,char':
				this.set_inputfilter("comma,symbol,sign,dot");
				this.set_inputtype("normal");
				break;
			case 'number,char':
			case 'lower,number,char':
			case 'upper,number,char':
				this.set_inputfilter("comma,symbol");
				this.set_inputtype("normal");
				break;
		}
		if (v.indexOf("upper") >= 0) {
			this.set_inputmode("upper");
		}
		else if (v.indexOf("lower") >= 0) {
			this.set_inputmode("lower");
		}
		else {
			this.set_inputmode("normal");
		}
	};

	_pGridTextArea._on_bubble_touchend = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble) {
		var call = true;
		if (is_userbubble) {
			call = this._cellobj._common_lbuttonup(changedtouchinfos, null, null, null, null);
		}

		if (call) {
			nexacro.TextAreaCtrl.prototype._on_bubble_touchend.call(this, touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble);
		}

		return true;
	};
	_pGridTextArea._on_bubble_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_lbuttonup(null, elem, canvasX, canvasY, from_elem);
		}

		if (call) {
			nexacro.TextAreaCtrl.prototype._on_bubble_lbuttonup.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope);
		}

		return true;
	};

	_pGridTextArea._on_bubble_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseenter();
		}

		if (call) {
			nexacro.TextAreaCtrl.prototype._on_bubble_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridTextArea._on_bubble_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseleave();
		}

		if (call) {
			nexacro.TextAreaCtrl.prototype._on_bubble_mouseleave.call(this, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridTextArea.on_fire_ontextchange = function (event_info) {
		if (this._absolutelyValue == true) {
			return true;
		}

		nexacro.TextAreaCtrl.prototype.on_fire_ontextchange.call(this, event_info);
		return this._grid.on_fire_ontextchange(this, event_info.chartext, event_info.pretext, event_info.posttext, event_info.preimetext, event_info.postimetext);
	};

	_pGridTextArea.on_fire_ontextchanged = function (obj, pretext, posttext) {
		return this._grid.on_fire_ontextchanged(obj, pretext, posttext);
	};

	_pGridTextArea.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		nexacro.TextAreaCtrl.prototype.on_fire_user_ontouchend.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchend(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridTextArea.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		nexacro.TextAreaCtrl.prototype.on_fire_user_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
		this._cellobj.on_fire_user_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
		return true;
	};

	_pGridTextArea.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		nexacro.TextAreaCtrl.prototype.on_fire_user_ontouchstart.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridTextArea.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		nexacro.TextAreaCtrl.prototype.on_fire_user_onlbuttondown.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		return true;
	};

	_pGridTextArea.on_fire_oneditclick = function (obj, caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem) {
		nexacro.TextAreaCtrl.prototype.on_fire_oneditclick.call(this, obj, caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem);
		return true;
	};

	_pGridTextArea.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this._displaymode) {
			this.setSelect(0, 0);
		}

		nexacro.TextAreaCtrl.prototype.on_fire_ondblclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, "control");
		return true;
	};

	if (nexacro.Browser == "Gecko" || nexacro.Browser == "Opera") {
		_pGridTextArea._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY) {
			if (!this._is_alive) {
				return;
			}

			var visible = this.visible;
			if (this._displaymode) {
				visible = true;
			}

			var clickitem = "";
			if (elem instanceof nexacro.InputElement) {
				var halign, valign;

				if (elem.align) {
					halign = elem.align._halign;
					valign = elem.align._valign;
				}
				else if (elem.halign && elem.valign) {
					halign = elem.halign;
					valign = elem.valign;
				}

				clickitem = this._cellobj._getClickItem(halign, valign, canvasX, canvasY, elem.text, this);
			}

			if (!clickitem) {
				clickitem = "control";
			}

			if (visible && this._isEnable() && this.enableevent) {
				var caretPos = this.getCaretPos();
				var clientXY = this._getClientXY(canvasX, canvasY);
				this.on_fire_oneditclick(this, caretPos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this, clickitem);
			}
		};
	}
	else {
		_pGridTextArea._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY) {
			if (!this._is_alive) {
				return;
			}

			var visible = this.visible;
			if (this._displaymode && this._grid.selectchangetype == "up") {
				visible = true;
			}

			var clickitem = "";
			if (elem instanceof nexacro.InputElement) {
				var halign, valign;

				if (elem.align) {
					halign = elem.align._halign;
					valign = elem.align._valign;
				}
				else if (elem.halign && elem.valign) {
					halign = elem.halign;
					valign = elem.valign;
				}

				clickitem = this._cellobj._getClickItem(halign, valign, canvasX, canvasY, elem.text, this);
			}

			if (!clickitem) {
				clickitem = "control";
			}

			if (visible && this._isEnable() && this.enableevent) {
				var caretPos = this.getCaretPos();
				var clientXY = this._getClientXY(canvasX, canvasY);
				this.on_fire_oneditclick(this, caretPos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this, clickitem);
			}
		};
	}

	_pGridTextArea._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridTextArea._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};

	_pGridTextArea._on_input_blur = function (elem, target) {
		var grid = this._grid;
		var api = this._edit_base_api;
		if (api) {
			var stat = api._stat_composition.getCurrentStatus();
			var data = api._stat_composition.getData();

			grid._currentCompositionStatus = stat;
			grid._currentCompositionData = data;

			api._on_input_blur(elem, target);
		}
	};

	_pGridTextArea.on_getBindableProperties = function () {
		if (!this._displaymode) {
			return "value";
		}
	};

	_pGridTextArea._isEnable = function () {
		return this._grid._enable;
	};

	_pGridTextArea._set_absolutelyValue = function (v) {
		this._absolutelyValue = true;
		this.set_value(v);
		this._absolutelyValue = false;
	};

	_pGridTextArea._updateAll = function () {
		if (this.getElement()) {
			this.on_apply_pseudo(this._pseudo);
			this._setProperty();
		}
	};

	_pGridTextArea._setProperty = function () {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		var grid = this._grid;
		var datarow = grid._getDataRow(cellobj._rowidx);

		var v;
		if (this._displaymode == true || this.readonly) {
			v = cellinfo._getDisplayText(datarow);
		}
		else {
			v = cellinfo._getValue(datarow);
		}

		this._set_absolutelyValue(v);

		v = cellinfo._getAttrValue(cellinfo.editautoselect, datarow);
		if (v != null) {
			this.set_autoselect(v);
		}
		v = cellinfo._getAttrValue(cellinfo.editautoskip, datarow);
		if (v != null) {
			this.set_autoskip(v);
		}
		v = cellinfo._getAttrValue(cellinfo.editfilter, datarow);
		if (v != null) {
			this.set_editfilter(v);
		}
		v = cellinfo._getAttrValue(cellinfo.editimemode, datarow);
		if (v != null) {
			this.set_imemode(v);
		}
		v = cellinfo._getAttrValue(cellinfo.edituseime, datarow);
		if (v != null) {
			this.set_useime(v);
		}
		v = cellinfo._getAttrValue(cellinfo.editlengthunit, datarow);
		if (v != null) {
			this.set_lengthunit(v);
		}
		v = cellinfo._getAttrValue(cellinfo.editscrollbar, datarow);
		if (v != null) {
			this.set_scrollbars(v);
		}
		else {
			this.set_scrollbars("none");
		}
	};

	_pGridTextArea._EditUpdateAll = function (cellinfo, cellobj) {
		if (this.getElement()) {
			this._cellinfo = cellinfo;
			this._cellobj = cellobj;
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			this._control_pseudo = "";
			this._contents_pseudo = "";
			this.on_apply_pseudo(this._pseudo);
			this._setProperty();

			var wordwrap = cellinfo._getWordwrap(datarow);
			this.set_wordwrap(wordwrap);
		}
	};

	_pGridTextArea._setDataset = function (async, row) {
		var cellobj = this._cellobj;
		var cellinfo = this._cellinfo;
		var grid = this._grid;
		var datarow = grid._getDataRow(cellobj._rowidx);

		if (row != undefined) {
			datarow = row;
		}

		var api = this._edit_base_api;
		if (api) {
			if (api._is_composition()) {
				var stat = api._stat_composition.getCurrentStatus();
				var data = api._stat_composition.getData();

				var proc_fire_text_event = api._on_input_compositionend(data);

				if (!proc_fire_text_event) {
					api._fire_text_event(data);
				}

				if (nexacro.Browser == "Safari") {
					if (stat == nexacro.EditBase.Status.CompositionStart) {
						api._on_input_compositionstart(data);
					}
					else if (stat == nexacro.EditBase.Status.CompositionUpdate) {
						api._on_input_compositionupdate(data);
					}
				}
			}
		}

		var v = this.value;
		var retn = true;

		if (cellinfo.text._bindtype == 1) {
			this._grid._is_async_recreate = async;
			this._grid._dsEventOccured = true;

			var fail = {
				status : ""
			};
			cellinfo.grid._binddataset._setColumn(datarow, cellinfo.text._bindexpr, v, fail);

			if (fail.status == "cancolumnchange") {
				retn = false;
			}

			this._grid._dsEventOccured = false;
		}
		return retn;
	};

	delete _pGridTextArea;

	nexacro.GridControlMaskEdit = function (id, left, top, width, height, parent, controlmode) {
		nexacro.MaskEditCtrl.call(this, id, "absolute", left, top, width, height, null, null, parent);
		this.tabstop = false;
		this._controlmode = (controlmode) ? true : false;

		if (parent._refobj) {
			this._grid = parent._refobj.grid;
			this._cellinfo = parent._refobj;
			this._cellobj = parent;
		}
		else {
			this._grid = parent;
		}
		this._absolutelyValue = false;
	};

	var _pGridMaskEdit = nexacro._createPrototype(nexacro.MaskEditCtrl, nexacro.GridControlMaskEdit);
	nexacro.GridControlMaskEdit.prototype = _pGridMaskEdit;


	_pGridMaskEdit.on_find_CurrentStyle_align = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;

		if (cellinfo && cellobj) {
			if (this._displaymode) {
				if (pseudo != "disabled") {
					pseudo = "normal";
				}
			}

			var align = this._find_pseudo_obj("align", pseudo, "align");
			return align;
		}
		return null;
	};

	_pGridMaskEdit.set_mask = function (v, bApply) {
		if (!this._displaymode) {
			v = v.replace(/0|9/g, "#");
			return nexacro.MaskEditCtrl.prototype.set_mask.call(this, v, bApply);
		}
		return nexacro.MaskEditCtrl.prototype.set_mask.call(this, v, bApply);
	};

	_pGridMaskEdit.on_find_CurrentStyle_font = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;

		if (cellinfo && cellobj) {
			if (this._displaymode) {
				if (pseudo != "disabled") {
					pseudo = "normal";
				}
			}

			var font = this._find_inherit_pseudo_obj("font", pseudo);

			if (!font) {
				font = cellobj.on_find_CurrentStyle_font(pseudo);
			}

			return font;
		}
		return null;
	};

	_pGridMaskEdit.on_find_CurrentStyle_letterspace = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;

		if (cellinfo && cellobj) {
			if (this._displaymode) {
				if (pseudo != "disabled") {
					pseudo = "normal";
				}
			}

			var letterspace = this._find_inherit_pseudo_obj("letterspace", pseudo);

			if (!letterspace) {
				letterspace = cellobj.on_find_CurrentStyle_letterspace(pseudo);
			}

			return letterspace;
		}
		return null;
	};

	_pGridMaskEdit.on_find_CurrentStyle_color = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;

		if (cellinfo && cellobj) {
			if (this._displaymode) {
				if (pseudo != "disabled") {
					pseudo = "normal";
				}
			}

			var color = this._find_inherit_pseudo_obj("color", pseudo);

			if (!color) {
				color = cellobj.on_find_CurrentStyle_color(pseudo);
			}

			return color;
		}
		return null;
	};

	_pGridMaskEdit.on_find_CurrentStyle_accessibility = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var accessibility = this._find_pseudo_obj("accessibility", pseudo, "accessibility");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!accessibility) {
				accessibility = cellinfo._query_pseudo_accessibility(datarow, pseudo);
			}

			return accessibility;
		}
		return null;
	};

	_pGridMaskEdit.on_find_CurrentStyle_background = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var background = this._find_pseudo_obj("background", pseudo, "background");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!background) {
				background = cellinfo._query_pseudo_background(datarow, cellobj._curDisplayType, pseudo);
			}

			return background;
		}
		return null;
	};

	_pGridMaskEdit.on_find_CurrentStyle_border = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var border = this._find_pseudo_obj("border", pseudo, "border");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!border) {
				border = cellinfo._query_pseudo_border(datarow, cellobj._curDisplayType, pseudo);
			}

			return border;
		}
		return null;
	};

	_pGridMaskEdit.on_find_CurrentStyle_bordertype = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var bordertype = this._find_pseudo_obj("bordertype", pseudo, "bordertype");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			return bordertype;
		}
		return null;
	};

	_pGridMaskEdit.on_find_CurrentStyle_gradation = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var gradation = this._find_pseudo_obj("gradation", pseudo, "gradation");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!gradation) {
				gradation = cellinfo._query_pseudo_gradation(datarow, cellobj._curDisplayType, pseudo);
			}

			return gradation;
		}
		return null;
	};

	_pGridMaskEdit._makeCssRefInfo = function () {
		return (this._grid._makeCssRefInfoCtrl(this));
	};

	_pGridMaskEdit._find_pseudo_obj = function (styleProp, pseudo, returnType) {
		var cellinfo = this._cellinfo;
		var grid = this._grid;
		var datarow = grid._getDataRow(this._cellobj._rowidx);

		if (this._cellobj && this._grid._isFakeCell(datarow) && pseudo != "disabled") {
			pseudo = "normal";
		}

		datarow = grid._getDataRow(this._cellobj._rowidx);
		var controlProp = "control" + styleProp;
		var v = cellinfo._query_pseudo_control(this, datarow, controlProp, styleProp, pseudo, returnType);
		return v;
	};

	_pGridMaskEdit.on_destroy_contents = function () {
		nexacro.MaskEditCtrl.prototype.on_destroy_contents.call(this);

		this._grid = null;
		this._cellinfo = null;
		this._cellobj = null;
	};

	_pGridMaskEdit.on_apply_custom_setfocus = function (evt_name, callback) {
		if (this._grid._onceTime_focus && !callback) {
			nexacro.OnceCallbackTimer.callonce(this, function () {
				this.on_apply_custom_setfocus(evt_name, true);
			}, 0);
			return;
		}
		return nexacro.MaskEditCtrl.prototype.on_apply_custom_setfocus.call(this, evt_name);
	};

	_pGridMaskEdit._setAccessibilityStatFocus = function () {
		var cellobj = this._cellobj;
		var label = cellobj._getAccessibilityMakeAddLabel();

		var tmp_label = "";
		var accessibility = this.on_find_CurrentStyle_accessibility(this._pseudo);
		if (accessibility) {
			if (accessibility._bindexpr && accessibility._bindexpr.length > 0) {
				tmp_label = this._cellinfo._getAttrValue(accessibility, this._rowidx);
				accessibility._setValue(tmp_label);
			}
			tmp_label = this._getAccessibilityLabel(accessibility);
		}
		else {
			tmp_label = cellobj._getCellAccessibilityLabel();
		}
		label += " " + tmp_label;

		this._setAccessibilityLabel(label);
		nexacro.Component.prototype._setAccessibilityStatFocus.call(this);
	};

	_pGridMaskEdit.on_get_style_accessibility_description = function () {
		if (this._cellobj) {
			return this._cellobj.tooltiptext;
		}
	};

	_pGridMaskEdit.on_apply_autoskip = function () {
		this._grid._moveToCell("next", true);
	};

	_pGridMaskEdit._on_bubble_touchend = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble) {
		var call = true;
		if (is_userbubble) {
			call = this._cellobj._common_lbuttonup(changedtouchinfos, null, null, null, null);
		}

		if (call) {
			nexacro.MaskEditCtrl.prototype._on_bubble_touchend.call(this, touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble);
		}

		return true;
	};
	_pGridMaskEdit._on_bubble_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_lbuttonup(null, elem, canvasX, canvasY, from_elem);
		}

		if (call) {
			nexacro.MaskEditCtrl.prototype._on_bubble_lbuttonup.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope);
		}

		return true;
	};

	_pGridMaskEdit._on_bubble_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseenter();
		}

		if (call) {
			nexacro.MaskEditCtrl.prototype._on_bubble_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridMaskEdit._on_bubble_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseleave();
		}

		if (call) {
			nexacro.MaskEditCtrl.prototype._on_bubble_mouseleave.call(this, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridMaskEdit.on_fire_ontextchange = function (event_info) {
		if (this._absolutelyValue == true) {
			return true;
		}

		nexacro.MaskEditCtrl.prototype.on_fire_ontextchange.call(this, event_info);
		return this._grid.on_fire_ontextchange(this, event_info.chartext, event_info.pretext, event_info.posttext, event_info.preimetext, event_info.postimetext);
	};

	_pGridMaskEdit.on_fire_ontextchanged = function (obj, pretext, posttext) {
		return this._grid.on_fire_ontextchanged(obj, pretext, posttext);
	};

	_pGridMaskEdit.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		nexacro.MaskEditCtrl.prototype.on_fire_user_ontouchend.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchend(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridMaskEdit.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		nexacro.MaskEditCtrl.prototype.on_fire_user_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
		this._cellobj.on_fire_user_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
		return true;
	};

	_pGridMaskEdit.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		nexacro.MaskEditCtrl.prototype.on_fire_user_ontouchstart.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridMaskEdit.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		nexacro.MaskEditCtrl.prototype.on_fire_user_onlbuttondown.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		return true;
	};

	_pGridMaskEdit.on_fire_oneditclick = function (obj, caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem) {
		nexacro.MaskEditCtrl.prototype.on_fire_oneditclick.call(this, obj, caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem);
		return true;
	};

	_pGridMaskEdit.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this._displaymode) {
			this.setSelect(0, 0);
		}

		nexacro.MaskEditCtrl.prototype.on_fire_ondblclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, "control");
		return true;
	};

	if (nexacro.Browser == "Gecko" || nexacro.Browser == "Opera") {
		_pGridMaskEdit._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY) {
			if (!this._is_alive) {
				return;
			}

			var visible = this.visible;
			if (this._displaymode) {
				visible = true;
			}

			var clickitem = "";
			if (elem instanceof nexacro.InputElement) {
				var halign, valign;

				if (elem.align) {
					halign = elem.align._halign;
					valign = elem.align._valign;
				}
				else if (elem.halign && elem.valign) {
					halign = elem.halign;
					valign = elem.valign;
				}

				clickitem = this._cellobj._getClickItem(halign, valign, canvasX, canvasY, elem.text, this);
			}

			if (!clickitem) {
				clickitem = "control";
			}

			if (visible && this._isEnable() && this.enableevent) {
				var caretPos = this.getCaretPos();
				var clientXY = this._getClientXY(canvasX, canvasY);
				this.on_fire_oneditclick(this, caretPos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this, clickitem);
			}
		};
	}
	else {
		_pGridMaskEdit._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY) {
			if (!this._is_alive) {
				return;
			}

			var visible = this.visible;
			if (this._displaymode && this._grid.selectchangetype == "up") {
				visible = true;
			}

			var clickitem = "";
			if (elem instanceof nexacro.InputElement) {
				var halign, valign;

				if (elem.align) {
					halign = elem.align._halign;
					valign = elem.align._valign;
				}
				else if (elem.halign && elem.valign) {
					halign = elem.halign;
					valign = elem.valign;
				}

				clickitem = this._cellobj._getClickItem(halign, valign, canvasX, canvasY, elem.text, this);
			}

			if (!clickitem) {
				clickitem = "control";
			}

			if (visible && this._isEnable() && this.enableevent) {
				var caretPos = this.getCaretPos();
				var clientXY = this._getClientXY(canvasX, canvasY);
				this.on_fire_oneditclick(this, caretPos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this, clickitem);
			}
		};
	}

	_pGridMaskEdit._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridMaskEdit._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};

	_pGridMaskEdit._isEnable = function () {
		return this._grid._enable;
	};

	_pGridMaskEdit._set_absolutelyValue = function (v) {
		this._absolutelyValue = true;
		this.set_value(v);
		this._absolutelyValue = false;
	};

	_pGridMaskEdit._updateAll = function () {
		if (this.getElement()) {
			this._setProperty();
			this.on_apply_pseudo(this._pseudo);
		}
	};

	_pGridMaskEdit._setProperty = function () {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		var grid = this._grid;
		var datarow = grid._getDataRow(cellobj._rowidx);
		var edittype = cellinfo._getEdittype(datarow);

		var displayType = cellinfo._getDisplaytype(datarow);
		var editType = cellinfo._getAttrValue(cellinfo.edittype, datarow);

		var v = cellinfo._getValue(datarow);
		v = nexacro._toString(v);

		if (edittype == "masknumber") {
			this.set_type("number");
			this._set_absolutelyValue(v);
		}
		else {
			if (editType == "normal") {
				if (displayType == "number") {
					this.set_type("number");
				}
				else {
					this.set_type("string");
				}
			}
			else {
				this.set_type("string");
			}
			this._set_absolutelyValue(v);
		}

		if (edittype == "masknumber" || edittype == "mask") {
			v = cellinfo._getAttrValue(cellinfo.mask, datarow);
			if (v != null) {
				this.set_mask(v);
			}
		}
		v = cellinfo.maskchar;
		if (v != null) {
			this.set_maskchar(v);
		}
		v = cellinfo._getAttrValue(cellinfo.editautoselect, datarow);
		if (v != null) {
			this.set_autoselect(v);
		}
		v = cellinfo._getAttrValue(cellinfo.editautoskip, datarow);
		if (v != null) {
			this.set_autoskip(v);
		}
		v = cellinfo._getAttrValue(cellinfo.editclipmode, datarow);
		if (v != null) {
			this.set_clipmode(v);
		}
		v = cellinfo._getAttrValue(cellinfo.editlimitbymask, datarow);
		if (v != null) {
			this.set_limitbymask(v);
		}
		v = cellinfo._getAttrValue(cellinfo.edittrimtype, datarow);
		if (v != null) {
			this.set_trimtype(v);
		}
	};

	_pGridMaskEdit._EditUpdateAll = function (cellinfo, cellobj) {
		if (this.getElement()) {
			this._cellinfo = cellinfo;
			this._cellobj = cellobj;
			this._control_pseudo = "";
			this._contents_pseudo = "";
			this.on_apply_pseudo(this._pseudo);
			this._setProperty();
		}
	};

	_pGridMaskEdit._setDataset = function (async, row) {
		var cellobj = this._cellobj;
		var cellinfo = this._cellinfo;
		var grid = this._grid;
		var datarow = grid._getDataRow(cellobj._rowidx);
		var v = this.value;

		if (row != undefined) {
			datarow = row;
		}

		var retn = true;

		if (cellinfo.text._bindtype == 1) {
			this._grid._is_async_recreate = async;
			this._grid._dsEventOccured = true;

			var fail = {
				status : ""
			};
			cellinfo.grid._binddataset._setColumn(datarow, cellinfo.text._bindexpr, v, fail);

			if (fail.status == "cancolumnchange") {
				retn = false;
			}

			this._grid._dsEventOccured = false;
		}
		return retn;
	};

	delete _pGridMaskEdit;

	nexacro.GridControlCalendar = function (id, left, top, width, height, parent, displaymode, controlmode) {
		nexacro.CalendarCtrl.call(this, id, "absolute", left, top, width, height, null, null, parent);
		this.tabstop = false;
		this.ondropdown = "grid";
		this._displaymode = (displaymode) ? true : false;
		this._controlmode = (controlmode) ? true : false;

		if (parent._refobj) {
			this._grid = parent._refobj.grid;
			this._cellinfo = parent._refobj;
			this._cellobj = parent;
		}
		else {
			this._grid = parent;
		}
	};

	var _pGridCalendar = nexacro._createPrototype(nexacro.CalendarCtrl, nexacro.GridControlCalendar);
	nexacro.GridControlCalendar.prototype = _pGridCalendar;

	nexacro.GridControlCalendar._defaultButtonsize = nexacro._getCachedStyleObj("buttonsize", 24);

	_pGridCalendar.on_find_CurrentStyle_buttonsize = function (pseudo) {
		return nexacro.GridControlCalendar._defaultButtonsize;
	};

	_pGridCalendar.on_find_CurrentStyle_align = function (pseudo, childctrl) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;

		if (cellinfo && cellobj) {
			if (this._displaymode) {
				if (pseudo != "disabled") {
					pseudo = "normal";
				}
			}

			var align = this._find_pseudo_obj("align", pseudo, "align", childctrl);
			return align;
		}
		return null;
	};

	_pGridCalendar.on_find_CurrentStyle_font = function (pseudo, childctrl) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var font = this._find_pseudo_obj("font", pseudo, "font", childctrl);
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!font) {
				font = cellobj.on_find_CurrentStyle_font(pseudo);
			}

			return font;
		}
		return null;
	};

	_pGridCalendar.on_find_CurrentStyle_letterspace = function (pseudo, childctrl) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var letterspace = this._find_pseudo_obj("letterspace", pseudo, "letterspace", childctrl);
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!letterspace) {
				letterspace = cellobj.on_find_CurrentStyle_letterspace(pseudo);
			}

			return letterspace;
		}
		return null;
	};

	_pGridCalendar.on_find_CurrentStyle_color = function (pseudo, childctrl) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var color = this._find_pseudo_obj("color", pseudo, "color", childctrl);
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!color) {
				color = cellobj.on_find_CurrentStyle_color(pseudo);
			}

			return color;
		}
		return null;
	};

	_pGridCalendar.on_find_CurrentStyle_accessibility = function (pseudo, childctrl) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var accessibility = this._find_pseudo_obj("accessibility", pseudo, "accessibility", childctrl);
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!accessibility) {
				accessibility = cellinfo._query_pseudo_accessibility(datarow, pseudo);
			}

			return accessibility;
		}
		return null;
	};













	_pGridCalendar._makeCssRefInfo = function () {
		return (this._grid._makeCssRefInfoCtrl(this));
	};

	_pGridCalendar._find_pseudo_obj = function (styleProp, pseudo, returnType, childctrl) {
		var cellinfo = this._cellinfo;
		if (this._displaymode == true) {
			if (pseudo != "disabled") {
				pseudo = "normal";
			}
		}

		var v;
		if (styleProp == "dayborder" || styleProp == "daybordertype" || styleProp == "daybackground" || styleProp == "daycolor" || styleProp == "dayfont" || styleProp == "daygradation") {
			v = nexacro.CalendarCtrl.prototype._find_pseudo_obj.call(this, styleProp, pseudo, returnType);
			if (v) {
				return v;
			}
		}

		var grid = this._grid;
		var datarow = grid._getDataRow(this._cellobj._rowidx);
		var controlProp = "control" + styleProp;
		var v = cellinfo._query_pseudo_control(this, datarow, controlProp, styleProp, pseudo, returnType, childctrl);
		return v;
	};

	_pGridCalendar.on_created_contents = function () {
		nexacro.CalendarCtrl.prototype.on_created_contents.call(this);
		if (this._displaymode) {
			this.calendaredit._input_element.setElementReadonly(true);
		}
	};

	_pGridCalendar.on_destroy_contents = function () {
		nexacro.CalendarCtrl.prototype.on_destroy_contents.call(this);

		this._grid = null;
		this._cellinfo = null;
		this._cellobj = null;
	};

	_pGridCalendar._setAccessibilityStatFocus = function () {
		var cellobj = this._cellobj;
		var label = cellobj._getAccessibilityMakeAddLabel();

		var tmp_label = "";
		var accessibility = this.on_find_CurrentStyle_accessibility(this._pseudo);
		if (accessibility) {
			if (accessibility._bindexpr && accessibility._bindexpr.length > 0) {
				tmp_label = this._cellinfo._getAttrValue(accessibility, this._rowidx);
				accessibility._setValue(tmp_label);
			}
			tmp_label = this._getAccessibilityLabel(accessibility);
		}
		else {
			tmp_label = cellobj._getCellAccessibilityLabel();
		}
		tmp_label = (tmp_label != cellobj._display_text) ? tmp_label : "";
		label += " " + tmp_label;

		this._setAccessibilityLabel(label);
		nexacro.Component.prototype._setAccessibilityStatFocus.call(this);
	};

	_pGridCalendar.on_get_style_accessibility_description = function () {
		if (this._cellobj) {
			return this._cellobj.tooltiptext;
		}
	};

	_pGridCalendar.set_innerdataset = function (str) {
		var ret = nexacro.CalendarCtrl.prototype.set_innerdataset.call(this, str);

		if (this._controlmode) {
			var grid = this._grid;
			if (grid) {
				for (var i = 0; i < grid.getCellCount("body"); i++) {
					grid.setCellProperty("body", i, "calendarinnerdataset", str);
				}
			}
		}
		return ret;
	};

	_pGridCalendar.set_backgroundcolumn = function (str) {
		nexacro.CalendarCtrl.prototype.set_backgroundcolumn.call(this, str);
		if (this._controlmode) {
			var grid = this._grid;
			if (grid) {
				for (var i = 0; i < grid.getCellCount("body"); i++) {
					grid.setCellProperty("body", i, "calendarbackgroundcolumn", str);
				}
			}
		}
	};

	_pGridCalendar.set_bordercolumn = function (str) {
		nexacro.CalendarCtrl.prototype.set_bordercolumn.call(this, str);
		if (this._controlmode) {
			var grid = this._grid;
			if (grid) {
				for (var i = 0; i < grid.getCellCount("body"); i++) {
					grid.setCellProperty("body", i, "calendarbordercolumn", str);
				}
			}
		}
	};

	_pGridCalendar.set_datecolumn = function (str) {
		nexacro.CalendarCtrl.prototype.set_datecolumn.call(this, str);
		if (this._controlmode) {
			var grid = this._grid;
			if (grid) {
				for (var i = 0; i < grid.getCellCount("body"); i++) {
					grid.setCellProperty("body", i, "calendardatecolumn", str);
				}
			}
		}
	};

	_pGridCalendar.set_textcolorcolumn = function (str) {
		nexacro.CalendarCtrl.prototype.set_textcolorcolumn.call(this, str);
		if (this._controlmode) {
			var grid = this._grid;
			if (grid) {
				var cellinfo = null;
				for (var i = 0; i < grid.getCellCount("body"); i++) {
					grid.setCellProperty("body", i, "calendartextcolorcolumn", str);
				}
			}
		}
	};

	_pGridCalendar.on_apply_custom_setfocus = function (evt_name) {
		if (!this._displaymode) {
			return nexacro.Calendar.prototype.on_apply_custom_setfocus.call(this, evt_name);
		}
	};

	_pGridCalendar._on_bubble_touchend = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble) {
		var call = true;
		if (is_userbubble) {
			call = this._cellobj._common_lbuttonup(changedtouchinfos, null, null, null, null);
		}

		if (call) {
			nexacro.CalendarCtrl.prototype._on_bubble_touchend.call(this, touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble);
		}

		return true;
	};
	_pGridCalendar._on_bubble_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_lbuttonup(null, elem, canvasX, canvasY, from_elem);
		}

		if (call) {
			nexacro.CalendarCtrl.prototype._on_bubble_lbuttonup.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope);
		}

		return true;
	};

	_pGridCalendar._on_bubble_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseenter();
		}

		if (call) {
			nexacro.CalendarCtrl.prototype._on_bubble_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridCalendar._on_bubble_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseleave();
		}

		if (call) {
			nexacro.CalendarCtrl.prototype._on_bubble_mouseleave.call(this, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridCalendar.on_notify_ondropdown = function (obj, e) {
		if (!this._displaymode) {
			return (nexacro.CalendarCtrl.prototype.on_notify_ondropdown.call(this, obj, e));
		}
	};

	_pGridCalendar.on_notify_mobile_ondropdown = function (obj, e) {
		if (!this._displaymode) {
			return nexacro.CalendarCtrl.prototype.on_notify_mobile_ondropdown.call(this, obj, e);
		}
	};

	_pGridCalendar.on_notify_onkeydown = function (obj, e) {
		var grid = this._grid;

		if (e.keycode == nexacro.Event.KEY_DOWN && e.altKey) {
			grid._is_editor_keyaction = false;
		}
		if (!obj._displaymode) {
			return (nexacro.CalendarCtrl.prototype.on_notify_onkeydown.call(this, obj, e));
		}
	};

	_pGridCalendar.on_fire_ontextchange = function (obj, chartext, pretext, posttext, preimetext, postimetext) {
		return this._grid.on_fire_ontextchange(this, chartext, pretext, posttext, preimetext, postimetext);
	};

	_pGridCalendar.on_fire_ontextchanged = function (obj, pretext, posttext) {
		return this._grid.on_fire_ontextchanged(obj, pretext, posttext);
	};

	_pGridCalendar.on_fire_onchanged = function (obj, pre_text, pre_value, post_text, post_value) {
		if (!obj._displaymode) {
			if (this._grid.autoupdatetype == "dateselect" || this._grid.autoupdatetype == "itemselect") {
				this._setDataset(true, undefined, false);
			}
			return (nexacro.CalendarCtrl.prototype.on_fire_onchanged.call(this, obj, pre_text, pre_value, post_text, post_value));
		}
	};

	_pGridCalendar.on_fire_oncloseup = function (obj, pretext, posttext, prevalue, postvalue, isselect) {
		this._grid.on_fire_oncloseup(obj, pretext, posttext, prevalue, postvalue, isselect);
	};

	_pGridCalendar.on_fire_ondropdown = function (obj) {
		this._grid.on_fire_ondropdown(obj);
	};


	_pGridCalendar.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);

		if (this._isSubCell) {
			touchinfo.canvasX -= from_refer_comp._adjust_left;
			touchinfo.canvasY -= from_refer_comp._adjust_top;
			touchinfo.clientX -= from_refer_comp._adjust_left;
			touchinfo.clientY -= from_refer_comp._adjust_top;
		}

		nexacro.CalendarCtrl.prototype.on_fire_user_ontouchend.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchend(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridCalendar.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		if (from_refer_comp != this) {
			canvasX -= from_refer_comp._adjust_left;
			clientX -= from_refer_comp._adjust_left;
			canvasY -= from_refer_comp._adjust_top;
			clientY -= from_refer_comp._adjust_top;
		}

		nexacro.CalendarCtrl.prototype.on_fire_user_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
		this._cellobj.on_fire_user_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
		return true;
	};

	_pGridCalendar.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);

		if (this._isSubCell) {
			touchinfo.canvasX -= from_refer_comp._adjust_left;
			touchinfo.canvasY -= from_refer_comp._adjust_top;
			touchinfo.clientX -= from_refer_comp._adjust_left;
			touchinfo.clientY -= from_refer_comp._adjust_top;
		}

		nexacro.CalendarCtrl.prototype.on_fire_user_ontouchstart.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridCalendar.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (from_refer_comp != this) {
			canvasX -= from_refer_comp._adjust_left;
			clientX -= from_refer_comp._adjust_left;
			canvasY -= from_refer_comp._adjust_top;
			clientY -= from_refer_comp._adjust_top;
		}

		nexacro.CalendarCtrl.prototype.on_fire_user_onlbuttondown.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		return true;
	};

	_pGridCalendar.on_fire_sys_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp) {
		var ret = nexacro.CalendarCtrl.prototype.on_fire_sys_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);

		if (this._isPopupVisible()) {
			this._grid._is_editor_keyaction = false;
		}
		else {
			this._grid._is_editor_keyaction = true;
		}
		return ret;
	};

	_pGridCalendar.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem) {
		nexacro.CalendarCtrl.prototype.on_fire_onclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp, "control");
		return true;
	};

	_pGridCalendar.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this._displaymode) {
			this.setSelect(0, 0);
		}

		nexacro.CalendarCtrl.prototype.on_fire_ondblclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp, "control");
		return true;
	};

	_pGridCalendar.on_notify_oneditclick = function (obj, e) {
		var clickitem = "";
		if (e.fromobject instanceof nexacro.CalendarEditCtrl) {
			var elem = e.fromobject._input_element;
			var halign, valign;

			if (elem.align) {
				halign = elem.align._halign;
				valign = elem.align._valign;
			}
			else if (elem.halign && elem.valign) {
				halign = elem.halign;
				valign = elem.valign;
			}

			clickitem = this._cellobj._getClickItem(halign, valign, e.canvasX, e.canvasY, elem.text, e.fromobject);
		}

		if (!clickitem) {
			clickitem = "control";
		}

		var padding = this._cellobj.currentstyle.padding;
		var canvasX = e.canvasX + (padding ? padding.left : 0);
		var canvasY = e.canvasY + (padding ? padding.top : 0);
		var clientXY = this._getClientXY(canvasX, canvasY);

		return this._cellobj.on_fire_onclick(e.button, e.alt_key, e.ctrl_key, e.shift_key, e.screenX, e.screenY, canvasX, canvasY, clientXY[0], clientXY[1], e.fromobject, e.fromreferenceobject, clickitem);
	};

	_pGridCalendar.on_lbuttondown_basic_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var retn = nexacro.Component.prototype.on_lbuttondown_basic_action.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		if (this._isPopupVisible() && this == refer_comp) {
			this._closePopup();
		}
		return retn;
	};

	_pGridCalendar._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY) {
		if (!this._is_alive) {
			return;
		}

		var visible = this.visible;
		if (this._displaymode && this._grid.selectchangetype == "up") {
			visible = true;
		}

		if (visible && this._isEnable() && this.enableevent) {
			var clientXY = this._getClientXY(canvasX, canvasY);
			this.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this, "control");
		}
	};

	_pGridCalendar._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridCalendar._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};

	_pGridCalendar.on_getBindableProperties = function () {
		if (!this._displaymode) {
			return "value";
		}
	};

	_pGridCalendar._isEnable = function () {
		return this._grid._enable;
	};

	_pGridCalendar._getDisplayText = function () {
		if (this.parent) {
			return this.parent._getDisplayText();
		}
		return "";
	};

	_pGridCalendar._updateAll = function () {
		if (this.getElement()) {
			this.on_apply_pseudo(this._pseudo);
			this._setProperty();
		}
	};

	_pGridCalendar._setProperty = function () {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		var grid = this._grid;
		var datarow = grid._getDataRow(cellobj._rowidx);

		var v = cellinfo._getAttrValue(cellinfo.mask, datarow);
		if (!v || v.length == 0) {
			v = "yyyy-MM-dd";
		}
		if (v != null) {
			this.set_editformat(v);
			this.set_dateformat(v);
		}

		var v = org_v = cellinfo._getValue(datarow);
		if (this._displaymode == true && !v) {
			v = cellinfo._getDisplayText(datarow);
			v = this._makeNormalValue1(v);
		}

		v = this._toValueStr(v);
		this.set_value(v, true);

		v = cellinfo._getAttrValue(cellinfo.editautoselect, datarow);
		if (v != null) {
			this.set_autoselect(v);
		}

		if (this._isTimeMask() == true) {
			this.set_type("spin");
		}
		else {
			this.set_type("normal");
		}

		if (grid.locale) {
			this.set_locale(grid.locale);
		}

		var editdisplay = cellinfo._getAttrValue(cellinfo.calendardisplay, datarow);
		if (editdisplay == "display") {
			v = cellinfo._getAttrValue(cellinfo.calendardisplaynulltext, datarow);
			if (v != null) {
				this.set_displaynulltext(v);
			}
		}
		var calendardisplaynulltype = cellinfo._getAttrValue(cellinfo.calendardisplaynulltype, datarow);
		if (calendardisplaynulltype != "default" && (nexacro._isNull(org_v) || org_v === "")) {
			if (calendardisplaynulltype == "nulltext") {
				this.set_dateformat("");
			}
			else {
				if (calendardisplaynulltype == "nullmask") {
					v = this._toValueStr(null);
					this.set_value(v, true);
				}
				else {
					this.set_dateformat("");
				}
				this.set_displaynulltext("");
			}
		}

		var innerdataset = cellinfo._getAttrValue(cellinfo.calendarinnerdataset, datarow);
		if (innerdataset) {
			this.set_innerdataset(innerdataset);
		}
		var backgroundcolumn = cellinfo._getAttrValue(cellinfo.calendarbackgroundcolumn, datarow);
		if (backgroundcolumn) {
			this.set_backgroundcolumn(backgroundcolumn);
		}
		var bordercolumn = cellinfo._getAttrValue(cellinfo.calendarbordercolumn, datarow);
		if (bordercolumn) {
			this.set_bordercolumn(bordercolumn);
		}
		var datecolumn = cellinfo._getAttrValue(cellinfo.calendardatecolumn, datarow);
		if (datecolumn) {
			this.set_datecolumn(datecolumn);
		}
		var textcolorcolumn = cellinfo._getAttrValue(cellinfo.calendartextcolorcolumn, datarow);
		if (textcolorcolumn) {
			this.set_textcolorcolumn(textcolorcolumn);
		}
	};

	_pGridCalendar._EditUpdateAll = function (cellinfo, cellobj) {
		if (this.getElement()) {
			this._cellinfo = cellinfo;
			this._cellobj = cellobj;
			this._setProperty();
			this._control_pseudo = "";
			this._contents_pseudo = "";
			this.on_apply_pseudo(this._pseudo);
		}
	};

	_pGridCalendar._setDataset = function (async, row, fire) {
		var cellobj = this._cellobj;
		var cellinfo = this._cellinfo;
		var grid = this._grid;
		var datarow = grid._getDataRow(cellobj._rowidx);

		if (fire == undefined) {
			fire = true;
		}

		this._setValueCtrl(fire);

		var v = this.value;

		if (row != undefined) {
			datarow = row;
		}

		var retn = true;

		if (cellinfo.text._bindtype == 1) {
			this._grid._is_async_recreate = async;
			this._grid._dsEventOccured = true;

			var fail = {
				status : ""
			};
			cellinfo.grid._binddataset._setColumn(datarow, cellinfo.text._bindexpr, v, fail);

			if (fail.status == "cancolumnchange") {
				this._setValue(undefined);
				retn = false;
			}
			this._grid._dsEventOccured = false;
		}
		return retn;
	};

	_pGridCalendar._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		var _want_arrows = this._want_arrows;
		this._is_first_focus = false;
		return {
			want_tab : this._grid._acceptstab, 
			want_return : false, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : _want_arrows
		};
	};

	delete _pGridCalendar;

	nexacro.GridControlCombo = function (id, left, top, width, height, parent, displaymode, controlmode) {
		nexacro.ComboCtrl.call(this, id, "absolute", left, top, width, height, null, null, parent);
		this.tabstop = false;

		if (displaymode) {
			this._displaymode = true;
			this.readonly = true;
		}
		else {
			this._displaymode = false;
		}

		this._controlmode = (controlmode) ? true : false;

		if (parent._refobj) {
			this._grid = parent._refobj.grid;
			this._cellinfo = parent._refobj;
			this._cellobj = parent;
		}
		else {
			this._grid = parent;
		}
	};

	var _pGridCombo = nexacro._createPrototype(nexacro.ComboCtrl, nexacro.GridControlCombo);
	nexacro.GridControlCombo.prototype = _pGridCombo;


	_pGridCombo.on_find_CurrentStyle_align = function (pseudo, childctrl) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;

		if (cellinfo && cellobj) {
			if (this._displaymode) {
				if (pseudo != "disabled") {
					pseudo = "normal";
				}
			}

			var align = this._find_pseudo_obj("align", pseudo, "align", childctrl);
			return align;
		}
		return null;
	};

	_pGridCombo.on_find_CurrentStyle_font = function (pseudo, childctrl) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var font = this._find_pseudo_obj("font", pseudo, "font", childctrl);
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!font) {
				font = cellobj.on_find_CurrentStyle_font(pseudo);
			}

			return font;
		}
		return null;
	};

	_pGridCombo.on_find_CurrentStyle_letterspace = function (pseudo, childctrl) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var letterspace = this._find_pseudo_obj("letterspace", pseudo, "letterspace", childctrl);
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!letterspace) {
				letterspace = cellobj.on_find_CurrentStyle_letterspace(pseudo);
			}

			return letterspace;
		}
		return null;
	};

	_pGridCombo.on_find_CurrentStyle_color = function (pseudo, childctrl) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var color = this._find_pseudo_obj("color", pseudo, "color", childctrl);
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!color) {
				color = cellobj.on_find_CurrentStyle_color(pseudo);
			}

			return color;
		}
		return null;
	};

	_pGridCombo.on_find_CurrentStyle_accessibility = function (pseudo, childctrl) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var accessibility = this._find_pseudo_obj("accessibility", pseudo, "accessibility", childctrl);
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!accessibility) {
				accessibility = cellinfo._query_pseudo_accessibility(datarow, pseudo);
			}

			return accessibility;
		}
		return null;
	};

	_pGridCombo.on_find_CurrentStyle_background = function (pseudo, childctrl) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var background = this._find_pseudo_obj("background", pseudo, "background", childctrl);
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!background) {
				background = cellobj.on_find_CurrentStyle_background(pseudo);
			}

			return background;
		}
		return null;
	};




	_pGridCombo.on_find_CurrentStyle_bordertype = function (pseudo, childctrl) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var bordertype = this._find_pseudo_obj("bordertype", pseudo, "bordertype", childctrl);
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			return bordertype;
		}
		return null;
	};

	_pGridCombo.on_find_CurrentStyle_gradation = function (pseudo, childctrl) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var gradation = this._find_pseudo_obj("gradation", pseudo, "gradation", childctrl);
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!gradation) {
				gradation = cellinfo._query_pseudo_gradation(datarow, cellobj._curDisplayType, pseudo);
			}

			return gradation;
		}
		return null;
	};

	_pGridCombo._makeCssRefInfo = function () {
		return (this._grid._makeCssRefInfoCtrl(this));
	};

	_pGridCombo._find_pseudo_obj = function (styleProp, pseudo, returnType, childctrl) {
		var cellinfo = this._cellinfo;
		if (this._displaymode == true) {
			if (pseudo != "disabled") {
				pseudo = "normal";
			}
		}
		var grid = this._grid;
		var datarow = grid._getDataRow(this._cellobj._rowidx);
		var controlProp = "control" + styleProp;
		var v = cellinfo._query_pseudo_control(this, datarow, controlProp, styleProp, pseudo, returnType, childctrl);
		return v;
	};

	_pGridCombo.on_destroy_contents = function () {
		nexacro.ComboCtrl.prototype.on_destroy_contents.call(this);

		this._grid = null;
		this._cellinfo = null;
		this._cellobj = null;
	};

	_pGridCombo._setAccessibilityStatFocus = function () {
		var cellobj = this._cellobj;
		var label = cellobj._getAccessibilityMakeAddLabel();

		var tmp_label = "";
		var accessibility = this.on_find_CurrentStyle_accessibility(this._pseudo);
		if (accessibility) {
			if (accessibility._bindexpr && accessibility._bindexpr.length > 0) {
				tmp_label = this._cellinfo._getAttrValue(accessibility, this._rowidx);
				accessibility._setValue(tmp_label);
			}
			tmp_label = this._getAccessibilityLabel(accessibility);
		}
		else {
			tmp_label = cellobj._getCellAccessibilityLabel();
		}
		tmp_label = (tmp_label != cellobj._display_text) ? tmp_label : "";
		label += " " + tmp_label;

		this._setAccessibilityLabel(label);
		nexacro.Component.prototype._setAccessibilityStatFocus.call(this);
	};

	_pGridCombo.on_get_style_accessibility_description = function () {
		if (this._cellobj) {
			return this._cellobj.tooltiptext;
		}
	};

	_pGridCombo._on_bubble_touchend = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble) {
		var call = true;
		if (is_userbubble) {
			call = this._cellobj._common_lbuttonup(changedtouchinfos, null, null, null, null);
		}

		if (call) {
			nexacro.ComboCtrl.prototype._on_bubble_touchend.call(this, touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble);
		}

		return true;
	};
	_pGridCombo._on_bubble_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_lbuttonup(null, elem, canvasX, canvasY, from_elem);
		}

		if (call) {
			nexacro.ComboCtrl.prototype._on_bubble_lbuttonup.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope);
		}

		return true;
	};

	_pGridCombo._on_bubble_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseenter();
		}

		if (call) {
			nexacro.ComboCtrl.prototype._on_bubble_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridCombo._on_bubble_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseleave();
		}

		if (call) {
			nexacro.ComboCtrl.prototype._on_bubble_mouseleave.call(this, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridCombo.on_fire_oncloseup = function (obj, beforeIndex, beforeText, beforeValue, afterIndex, afterText, afterValue, isSelect) {
		nexacro.ComboCtrl.prototype.on_fire_oncloseup.call(this, obj, beforeIndex, beforeText, beforeValue, afterIndex, afterText, afterValue, isSelect);
		this._grid.on_fire_oncloseup(obj, beforeText, afterText, beforeValue, afterValue, isSelect);
	};

	_pGridCombo.on_fire_user_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp) {
		var grid = this._grid;
		if (keycode == nexacro.Event.KEY_DOWN || keycode == nexacro.Event.KEY_UP
			 || (keycode == nexacro.Event.KEY_DOWN && alt_key)) {
			grid._is_editor_keyaction = false;
		}

		nexacro.ComboCtrl.prototype.on_fire_user_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);

		if (!this._displaymode) {
			return this._cellobj.on_fire_user_onkeydown(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
		}
	};

	_pGridCombo.on_fire_sys_onmousewheel = function (wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, comp, refer_comp) {
		if (!this._displaymode) {
			return nexacro.ComboCtrl.prototype.on_fire_sys_onmousewheel.call(this, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, comp, refer_comp);
		}
		;
	};

	_pGridCombo.on_fire_ondropdown = function (obj) {
		return this._grid.on_fire_ondropdown(obj);
	};

	_pGridCombo.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);

		if (this._isSubCell) {
			touchinfo.canvasX -= from_refer_comp._adjust_left;
			touchinfo.canvasY -= from_refer_comp._adjust_top;
			touchinfo.clientX -= from_refer_comp._adjust_left;
			touchinfo.clientY -= from_refer_comp._adjust_top;
		}

		nexacro.ComboCtrl.prototype.on_fire_user_ontouchend.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchend(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridCombo.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		if (from_refer_comp != this) {
			canvasX -= from_refer_comp._adjust_left;
			clientX -= from_refer_comp._adjust_left;
			canvasY -= from_refer_comp._adjust_top;
			clientY -= from_refer_comp._adjust_top;
		}

		nexacro.ComboCtrl.prototype.on_fire_user_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
		this._cellobj.on_fire_user_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
		return true;
	};

	_pGridCombo.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);

		if (this._isSubCell) {
			touchinfo.canvasX -= from_refer_comp._adjust_left;
			touchinfo.canvasY -= from_refer_comp._adjust_top;
			touchinfo.clientX -= from_refer_comp._adjust_left;
			touchinfo.clientY -= from_refer_comp._adjust_top;
		}

		nexacro.ComboCtrl.prototype.on_fire_user_ontouchstart.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridCombo.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (from_refer_comp != this) {
			canvasX -= from_refer_comp._adjust_left;
			clientX -= from_refer_comp._adjust_left;
			canvasY -= from_refer_comp._adjust_top;
			clientY -= from_refer_comp._adjust_top;
		}

		nexacro.ComboCtrl.prototype.on_fire_user_onlbuttondown.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		return true;
	};

	_pGridCombo.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		nexacro.ComboCtrl.prototype.on_fire_onclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp, "control");
		return true;
	};

	_pGridCombo.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this._displaymode) {
			this.setSelect(0, 0);
		}

		nexacro.ComboCtrl.prototype.on_fire_ondblclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp, "control");
		return true;
	};

	_pGridCombo.on_fire_ontextchange = function (obj, e) {
		if (e.pretext != e.posttext) {
			this._text_change = true;
		}

		return this._grid.on_fire_ontextchange(this, e.chartext, e.pretext, e.posttext, e.preimetext, e.postimetext);
	};

	_pGridCombo.on_fire_ontextchanged = function (obj, e) {
		this.on_combo_text_changed(e.pretext, e.posttext);
		return this._grid.on_fire_ontextchanged(obj, e.pretext, e.posttext);
	};

	_pGridCombo.on_fire_onitemchanged = function (obj, preindex, pretext, prevalue, postindex, posttext, postvalue) {
		if (!obj._displaymode) {
			if (this._grid.autoupdatetype == "comboselect" || this._grid.autoupdatetype == "itemselect") {
				this._setDataset(true);
			}

			return (nexacro.ComboCtrl.prototype.on_fire_onitemchanged.call(this, obj, preindex, pretext, prevalue, postindex, posttext, postvalue));
		}
	};

	_pGridCombo.on_notify_edit_oneditclick = function (obj, e) {
		var clickitem = "";
		if (e.fromobject instanceof nexacro.ComboEditCtrl) {
			var elem = e.fromobject._input_element;
			var halign, valign;

			if (elem.align) {
				halign = elem.align._halign;
				valign = elem.align._valign;
			}
			else if (elem.halign && elem.valign) {
				halign = elem.halign;
				valign = elem.valign;
			}

			clickitem = this._cellobj._getClickItem(halign, valign, e.canvasX, e.canvasY, elem.text, e.fromobject);
		}

		if (!clickitem) {
			clickitem = "control";
		}

		var padding = this._cellobj.currentstyle.padding;
		var canvasX = e.canvasX + (padding ? padding.left : 0);
		var canvasY = e.canvasY + (padding ? padding.top : 0);
		var clientXY = this._getClientXY(canvasX, canvasY);

		return this._cellobj.on_fire_onclick(e.button, e.alt_key, e.ctrl_key, e.shift_key, e.screenX, e.screenY, canvasX, canvasY, clientXY[0], clientXY[1], e.fromobject, e.fromreferenceobject, clickitem);
	};

	_pGridCombo.on_lbuttondown_basic_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var retn = nexacro.Component.prototype.on_lbuttondown_basic_action.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		if (this._isPopupVisible() && this == refer_comp) {
			this._closePopup();
		}
		return retn;
	};

	_pGridCombo._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY) {
		if (!this._is_alive) {
			return;
		}

		var visible = this.visible;
		if (this._displaymode && this._grid.selectchangetype == "up") {
			visible = true;
		}

		if (visible && this._isEnable() && this.enableevent) {
			var clientXY = this._getClientXY(canvasX, canvasY);
			this.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this);
		}
	};

	_pGridCombo._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridCombo._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};

	_pGridCombo._callback_onvaluechanged = function (obj, e) {
		if (!this._displaymode) {
			this._recheckValue();
			this._is_recheck = true;
		}
	};

	_pGridCombo.on_getBindableProperties = function () {
		if (!this._displaymode) {
			return "value";
		}
	};

	_pGridCombo._isEnable = function () {
		return this._grid._enable;
	};

	_pGridCombo._updateAll = function () {
		if (this.getElement()) {
			this.on_apply_pseudo(this._pseudo);
			this._setProperty();
		}
	};

	_pGridCombo._setProperty = function () {
		var cellinfo = this._cellinfo, cellobj = this._cellobj, grid = this._grid;
		var datarow = grid._getDataRow(cellobj._rowidx);
		var edittype = cellinfo._getEdittype(datarow);
		var innerds = cellinfo._getAttrValue(cellinfo.combodataset, datarow);
		if (innerds && innerds.length) {
			this.set_innerdataset(innerds);
		}
		var datanm = cellinfo._getAttrValue(cellinfo.combodatacol, datarow);
		if (datanm && datanm.length) {
			this.set_datacolumn(datanm);
		}
		var codenm = cellinfo._getAttrValue(cellinfo.combocodecol, datarow);
		if (codenm && codenm.length) {
			this.set_codecolumn(codenm);
		}
		var rowcnt = cellinfo._getAttrValue(cellinfo.combodisplayrowcount, datarow);
		if (rowcnt) {
			this.set_displayrowcount(rowcnt);
		}
		var type = cellinfo._getAttrValue(cellinfo.combotype, datarow);
		if (type) {
			this.set_type(type);
		}

		var v;
		if (this._displaymode == true) {
			v = cellinfo._getDisplayText(datarow);
			this.set_text(v);
		}
		else {
			v = cellinfo._getValue(datarow);
			this.set_value(v);
		}

		v = cellinfo._getAttrValue(cellinfo.editautoselect, datarow);
		if (v != null) {
			this.set_autoselect(v);
		}

		var editdisplay = cellinfo._getAttrValue(cellinfo.combodisplay, datarow);
		if (editdisplay == "display") {
			v = cellinfo._getAttrValue(cellinfo.combodisplaynulltext, datarow);
			if (v != null) {
				this.set_displaynulltext(v);
			}
		}
	};

	_pGridCombo._EditUpdateAll = function (cellinfo, cellobj) {
		if (this.getElement()) {
			this._cellinfo = cellinfo;
			this._cellobj = cellobj;
			this._control_pseudo = "";
			this._contents_pseudo = "";
			this.on_apply_pseudo(this._pseudo);
			this._setProperty();
		}
	};

	_pGridCombo._setDataset = function (async, row) {
		var cellobj = this._cellobj;
		var cellinfo = this._cellinfo;
		var grid = this._grid;
		var datarow = grid._getDataRow(cellobj._rowidx);
		var v = this.value;

		if (row != undefined) {
			datarow = row;
		}

		var retn = true;

		if (cellinfo.text._bindtype == 1) {
			if (this._prevalue != this.value) {
				this._grid._is_async_recreate = async;
				this._grid._dsEventOccured = true;

				var fail = {
					status : ""
				};
				cellinfo.grid._binddataset._setColumn(datarow, cellinfo.text._bindexpr, v, fail);

				if (fail.status == "cancolumnchange") {
					this.set_value(undefined);
					retn = false;
				}
				this._grid._dsEventOccured = false;
			}
		}
		return retn;
	};

	_pGridCombo._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		var _want_arrows = this._want_arrows;
		this._is_first_focus = false;
		return {
			want_tab : this._grid._acceptstab, 
			want_return : false, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : _want_arrows
		};
	};

	delete _pGridCombo;

	nexacro.GridCellCheckbox = function (id, left, top, width, height, parent) {
		nexacro.CheckBoxCtrl.call(this, id, "absolute", left, top, width, height, null, null, parent);
		this.tabstop = false;
		this._is_usetextbox = false;

		var wnd = parent;

		while (wnd) {
			if (wnd._type_name == "GridCell") {
				this._cellobj = wnd;
				this._cellinfo = wnd._refobj;
				this._grid = wnd._refobj.grid;
				break;
			}
			wnd = wnd.parent;
		}
		this.checked = false;
	};

	var _pGridCellCheckbox = nexacro._createPrototype(nexacro.CheckBoxCtrl, nexacro.GridCellCheckbox);
	nexacro.GridCellCheckbox.prototype = _pGridCellCheckbox;


	_pGridCellCheckbox.on_find_CurrentStyle_font = function () {
	};
	_pGridCellCheckbox.on_find_CurrentStyle_letterspace = function () {
	};
	_pGridCellCheckbox.on_find_CurrentStyle_color = function () {
	};
	_pGridCellCheckbox.on_find_CurrentStyle_align = function () {
	};
	_pGridCellCheckbox.on_find_CurrentStyle_border = function () {
	};
	_pGridCellCheckbox.on_find_CurrentStyle_bordertype = function () {
	};
	_pGridCellCheckbox.on_find_CurrentStyle_background = function () {
	};
	_pGridCellCheckbox.on_find_CurrentStyle_gradation = function () {
	};
	_pGridCellCheckbox.on_find_CurrentStyle_padding = function () {
	};
	_pGridCellCheckbox.on_find_CurrentStyle_focusborder = function () {
	};
	_pGridCellCheckbox.on_find_CurrentStyle_moveeffect = function () {
	};
	_pGridCellCheckbox.on_find_CurrentStyle_shadow = function () {
	};
	_pGridCellCheckbox.on_find_CurrentStyle_textpadding = function () {
	};


	_pGridCellCheckbox.on_update_style_background = function () {
	};
	_pGridCellCheckbox.on_update_style_border = function () {
	};
	_pGridCellCheckbox.on_update_style_bordertype = function () {
	};
	_pGridCellCheckbox.on_update_style_gradation = function () {
	};
	_pGridCellCheckbox.on_update_style_font = function () {
	};
	_pGridCellCheckbox.on_update_style_letterspace = function () {
	};
	_pGridCellCheckbox.on_update_style_padding = function () {
	};
	_pGridCellCheckbox.on_update_style_shadow = function () {
	};
	_pGridCellCheckbox.on_update_style_padding = function () {
	};
	_pGridCellCheckbox.on_update_style_align = function () {
	};
	_pGridCellCheckbox.on_update_style_cursor = function () {
	};
	_pGridCellCheckbox.on_update_style_color = function () {
	};

	_pGridCellCheckbox.on_create_contents = function () {
		nexacro.CheckBoxCtrl.prototype.on_create_contents.call(this);
		this.chkimg.on_apply_custom_setfocus = function () {
		};
		this.chkimg._on_last_lbuttonup = function () {
			this.parent._on_last_lbuttonup();
		};
		this.chkimg._on_last_keyup = function () {
			this.parent._on_last_keyup();
		};
	};

	_pGridCellCheckbox.on_apply_custom_setfocus = function (evt_name, callback) {
	};


	_pGridCellCheckbox.on_apply_style_buttonalign = function () {
		var btnsize;
		if (this.currentstyle.buttonsize == null) {
			btnsize = 14;
		}
		else {
			btnsize = parseInt(this.currentstyle.buttonsize._value, 10);
		}

		this.resize(btnsize, btnsize);
	};

	_pGridCellCheckbox._makeCssRefInfo = function () {
		return (this._grid._makeCssRefInfoCtrl(this));
	};

	_pGridCellCheckbox._styleProp = [["buttonbackground", "background"], ["buttonborder", "border"], ["buttonbordertype", "bordertype"], ["buttongradation", "gradation"], ["buttonimage", "image"]
	];
	_pGridCellCheckbox._getStyleProp = function (styleProp) {
		var _styleProp = this._styleProp;
		var len = _styleProp.length;
		for (var i = 0; i < len; i++) {
			if (_styleProp[i][0] == styleProp) {
				return _styleProp[i][1];
			}
		}
		return styleProp;
	};

	_pGridCellCheckbox.on_get_style_accessibility_label = function () {
		return "";
	};

	_pGridCellCheckbox.on_find_CurrentStyle_cursor = function (pseudo) {
		var grid = this._grid;
		if (grid._global_cursor) {
			return grid._global_cursor;
		}

		var cursor = this._find_pseudo_obj("cursor", pseudo) || this._cellobj.on_find_CurrentStyle_cursor(pseudo);
		return (cursor) ? cursor : nexacro.Component._default_cursor;
	};

	_pGridCellCheckbox._find_pseudo_obj = function (styleProp, pseudo, returnType) {
		var cellinfo = this._cellinfo;
		var grid = this._grid;
		var datarow = grid._getDataRow(this._cellobj._rowidx);

		if (this._cellobj && this._grid._isFakeCell(datarow) && pseudo != "disabled") {
			pseudo = "normal";
		}

		var controlProp = "control" + this._getStyleProp(styleProp);

		var v = cellinfo._query_pseudo_control(this, datarow, controlProp, styleProp, pseudo, returnType);
		return v;
	};

	_pGridCellCheckbox.on_created_contents = function () {
		nexacro.CheckBoxCtrl.prototype.on_created_contents.call(this);
		var align = this._cellobj.currentstyle.align;

		if (align) {
			this._setAlign(align.halign, align.valign);
		}
	};

	_pGridCellCheckbox.on_destroy_contents = function () {
		nexacro.CheckBoxCtrl.prototype.on_destroy_contents.call(this);

		this._grid = null;
		this._cellinfo = null;
		this._cellobj = null;
	};

	_pGridCellCheckbox.on_change_containerRect = function () {
		var rect = this._grid._getAvailableRect(this);
		var h = rect.height;
		this.chkimg.move(0, 0, h, h);
	};

	_pGridCellCheckbox._setAccessibilityStatFocus = function () {
		var cellobj = this._cellobj;
		var label = cellobj._getAccessibilityMakeAddLabel();

		var tmp_label = "";
		var accessibility = this.on_find_CurrentStyle_accessibility(this._pseudo);
		if (accessibility) {
			if (accessibility._bindexpr && accessibility._bindexpr.length > 0) {
				tmp_label = this._cellinfo._getAttrValue(accessibility, this._rowidx);
				accessibility._setValue(tmp_label);
			}
			tmp_label = this._getAccessibilityLabel(accessibility);
		}
		else {
			tmp_label = cellobj._getCellAccessibilityLabel();
		}
		label += " " + tmp_label;

		this._setAccessibilityLabel(label);
		this._setAccessibilityStatChecked(this.isChecked());
		cellobj._setAccessibilityStatChecked(this.isChecked());
		nexacro.Component.prototype._setAccessibilityStatFocus.call(this);
	};

	_pGridCellCheckbox.on_get_style_accessibility_description = function () {
		if (this._cellobj) {
			return this._cellobj.tooltiptext;
		}
	};

	_pGridCellCheckbox.on_notify_checkbox_onkeydown = function (obj, e) {
	};

	_pGridCellCheckbox.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return this.parent.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, "control");
	};

	_pGridCellCheckbox.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return this.parent.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, "control");
	};

	_pGridCellCheckbox._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridCellCheckbox._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};

	_pGridCellCheckbox._isEnable = function () {
		return this._grid._enable;
	};

	_pGridCellCheckbox._setAlign = function (halign, valign) {
		var prect = this._grid._getAvailableRect(this.parent);
		var right = prect.right;
		var bottom = prect.bottom;
		;
		var width = prect.width;
		var height = prect.height;

		var controlSize;
		if (this.currentstyle.buttonsize == null) {
			controlSize = 14;
		}
		else {
			controlSize = parseInt(this.currentstyle.buttonsize._value, 10);
		}

		if (!halign) {
			halign = "center";
		}
		if (!valign) {
			valign = "middle";
		}

		var left = 0;
		var top = 0;

		if (halign == "center") {
			left = Math.round((width - controlSize) / 2);
		}
		else if (halign == "right") {
			left = right - controlSize;
		}

		if (valign == "middle") {
			top = Math.round((height - controlSize) / 2);
		}
		else if (valign == "bottom") {
			top = bottom - controlSize;
		}

		this.move(left, top, controlSize, controlSize);
	};

	_pGridCellCheckbox._updateAll = function () {
		if (this.getElement()) {
			this._setProperty();
			this.on_apply_pseudo(this._pseudo);
			this.set_value(this.checked);
		}
	};

	_pGridCellCheckbox._setProperty = function () {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		var grid = this._grid;
		var datarow = grid._getDataRow(cellobj._rowidx);

		var v = cellinfo._getDisplayText(datarow);

		v = nexacro._toString(v);
		if (v != null) {
			this._display_text = v;
			this.set_text(v);
		}
		else {
			this._display_text = "";
			this.set_text("");
		}
	};

	delete _pGridCellCheckbox;

	nexacro.GridControlCheckbox = function (id, left, top, width, height, parent, controlmode) {
		nexacro.GridCellCheckbox.call(this, id, left, top, width, height, parent);
		this._controlmode = (controlmode) ? true : false;
	};

	var _pGridCheckbox = nexacro._createPrototype(nexacro.GridCellCheckbox, nexacro.GridControlCheckbox);
	nexacro.GridControlCheckbox.prototype = _pGridCheckbox;

	_pGridCheckbox.on_apply_text = function () {
		var text = this._display_text;
		this.checked = (text == null) ? false : nexacro._toBoolean(text);
	};

	_pGridCheckbox._common_fire_lbuttondown = function (from_comp) {
		var grid = this._grid;

		if (grid) {
			var datarow = grid._getDataRow(this._cellobj._rowidx);
			if (grid._isFakeCell(datarow)) {
				return false;
			}
		}
	};

	_pGridCheckbox.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		this._common_fire_lbuttondown();
		return this._cellobj.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
	};

	_pGridCheckbox.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		this._common_fire_lbuttondown();
		return this._cellobj.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
	};

	_pGridCheckbox.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		nexacro.GridCellCheckbox.prototype.on_fire_user_ontouchend.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchend(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridCheckbox.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		nexacro.GridCellCheckbox.prototype.on_fire_user_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
		this._cellobj.on_fire_user_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
		return true;
	};

	_pGridCheckbox.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		var grid = this._grid;

		if (grid) {
			var datarow = grid._getDataRow(this._cellobj._rowidx);
			if (grid._isFakeCell(datarow)) {
				return false;
			}
		}

		if (grid.selectchangetype != "down") {
			if (nexacro._toBoolean(grid.readonly) == false) {
				this._toggleCheck();
			}
		}

		if (!this._is_alive) {
			return;
		}

		return this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, "control");
	};

	_pGridCheckbox.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		var grid = this._grid;
		if (grid) {
			var datarow = grid._getDataRow(this._cellobj._rowidx);
			if (grid._isFakeCell(datarow)) {
				return false;
			}
		}

		return this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, "control");
	};

	_pGridCheckbox._toggleCheck = function () {
		var cellobj = this._cellobj;
		var cellinfo = this._cellinfo;
		var grid = this._grid;
		var datarow = grid._getDataRow(cellobj._rowidx);
		var editType = cellinfo._getEdittype(datarow);

		if (editType == "checkbox") {
			var v = nexacro._toBoolean(this.value);
			v = (v) ? 0 : 1;

			if (cellinfo.text._bindtype == 1) {
				grid._dsEventOccured = true;
				if (cellinfo.grid._binddataset.setColumn(datarow, cellinfo.text._bindexpr, v)) {
					v = this._getDisplayText();
					this.set_value(v);
				}
				if (grid) {
					grid._dsEventOccured = false;
				}
			}
		}
	};

	_pGridCheckbox._getDisplayText = function () {
		if (this.parent) {
			return this.parent._getDisplayText();
		}
		return "";
	};

	_pGridCheckbox._on_bubble_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseenter();
		}

		if (call) {
			nexacro.GridCellCheckbox.prototype._on_bubble_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	_pGridCheckbox._on_bubble_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseleave();
		}

		if (call) {
			nexacro.GridCellCheckbox.prototype._on_bubble_mouseleave.call(this, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
		}

		return true;
	};

	delete _pGridCheckbox;

	nexacro.GridControlImage = function (id, left, top, width, height, parent) {
		nexacro.Component.call(this, id, "absolute", left, top, width, height, null, null, parent);
		this.tabstop = false;
		this._is_subcontrol = true;
		if (parent._refobj) {
			this._grid = parent._refobj.grid;
			this._cellinfo = parent._refobj;
			this._cellobj = parent;
		}
		this._img_elem = null;
		this._img_type = "url";
		this._accessibility_role = "image";
	};

	var _pGridImage = nexacro._createPrototype(nexacro.Component, nexacro.GridControlImage);
	nexacro.GridControlImage.prototype = _pGridImage;
	_pGridImage._type_name = "GridControlImage";

	_pGridImage.imagewidth = 0;
	_pGridImage.imageheight = 0;


	_pGridImage.on_find_CurrentStyle_accessibility = function (pseudo) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		if (cellinfo && cellobj) {
			var accessibility = this._find_pseudo_obj("accessibility", pseudo, "accessibility");
			var grid = this._grid;
			var datarow = grid._getDataRow(cellobj._rowidx);

			if (!accessibility) {
				accessibility = cellinfo._query_pseudo_accessibility(datarow, pseudo);
			}

			return accessibility;
		}
		return null;
	};

	_pGridImage.on_find_CurrentStyle_background = function (pseudo) {
		return this._find_pseudo_obj("background", pseudo, "background");
	};

	_pGridImage.on_find_CurrentStyle_border = function (pseudo) {
		return this._find_pseudo_obj("border", pseudo, "border");
	};

	_pGridImage.on_find_CurrentStyle_bordertype = function (pseudo) {
		return this._find_pseudo_obj("bordertype", pseudo, "bordertype");
	};

	_pGridImage.on_find_CurrentStyle_gradation = function (pseudo) {
		return this._find_pseudo_obj("gradation", pseudo, "gradation");
	};

	_pGridImage.on_find_CurrentStyle_padding = function (pseudo) {
		return this._find_pseudo_obj("padding", pseudo, "padding");
	};

	_pGridImage.on_find_CurrentStyle_opacity = function (pseudo) {
		return this._find_pseudo_obj("opacity", pseudo);
	};

	_pGridImage.on_find_CurrentStyle_cursor = function (pseudo) {
		var grid = this._grid;
		if (grid._global_cursor) {
			return grid._global_cursor;
		}

		var cursor = this._find_pseudo_obj("cursor", pseudo) || this._cellobj.on_find_CurrentStyle_cursor(pseudo);
		return (cursor) ? cursor : nexacro.Component._default_cursor;
	};

	_pGridImage.on_find_CurrentStyle_shadow = function (pseudo) {
		return null;
	};

	_pGridImage.on_find_CurrentStyle_font = function (pseudo) {
		return this._find_inherit_pseudo_obj("font", pseudo, "font");
	};

	_pGridImage.on_find_CurrentStyle_letterspace = function (pseudo) {
		return this._find_inherit_pseudo_obj("letterspace", pseudo, "letterspace");
	};

	_pGridImage.on_find_CurrentStyle_color = function (pseudo) {
		return this._find_inherit_pseudo_obj("color", pseudo, "color");
	};

	_pGridImage.on_find_CurrentStyle_align = function (pseudo) {
		return this.parent.on_find_CurrentStyle_align(pseudo);
	};

	_pGridImage._makeCssRefInfo = function () {
		return (this._grid._makeCssRefInfoCtrl(this));
	};

	_pGridImage._find_pseudo_obj = function (styleProp, pseudo, returnType) {
		var cellinfo = this._cellinfo;
		var grid = this._grid;
		var datarow = grid._getDataRow(this._cellobj._rowidx);

		if (this._cellobj && this._grid._isFakeCell(datarow) && pseudo != "disabled") {
			pseudo = "normal";
		}

		datarow = grid._getDataRow(this._cellobj._rowidx);
		var controlProp = "control" + styleProp;
		var v = cellinfo._query_pseudo_control(this, datarow, controlProp, styleProp, pseudo, returnType);
		return v;
	};

	_pGridImage.on_created_contents = function () {
		if (this._img_elem) {
			this._img_elem.create();
		}
	};

	_pGridImage.on_destroy_contents = function () {
		this._grid = null;
		this._cellinfo = null;
		this._cellobj = null;

		if (this._img_elem) {
			this._img_elem.destroy();
			this._img_elem = null;
		}
	};

	_pGridImage._setAccessibilityStatFocus = function () {
		var cellobj = this._cellobj;
		var label = cellobj._getAccessibilityMakeAddLabel();

		var tmp_label = "";
		var accessibility = this.on_find_CurrentStyle_accessibility(this._pseudo);
		if (accessibility) {
			if (accessibility._bindexpr && accessibility._bindexpr.length > 0) {
				tmp_label = this._cellinfo._getAttrValue(accessibility, this._rowidx);
				accessibility._setValue(tmp_label);
			}
			tmp_label = this._getAccessibilityLabel(accessibility);
		}
		else {
			tmp_label = cellobj._getCellAccessibilityLabel();
		}
		label += " " + tmp_label;

		this._setAccessibilityLabel(label);
		nexacro.Component.prototype._setAccessibilityStatFocus.call(this);
	};

	_pGridImage.on_get_style_accessibility_label = function () {
		return (this.text) ? this.text : this.id;
	};

	_pGridImage.on_get_style_accessibility_description = function () {
		if (this._cellobj) {
			return this._cellobj.tooltiptext;
		}
	};

	_pGridImage.on_apply_text = function () {
		this._load_image(this._display_text);
	};

	_pGridImage.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return this.parent.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, "image");
	};

	_pGridImage.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		return this.parent.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, this, from_refer_comp);
	};

	_pGridImage.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return this.parent.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp);
	};

	_pGridImage.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		return this.parent.on_fire_user_ontouchend(touchinfos, changedtouchinfos, this, from_refer_comp);
	};

	_pGridImage.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		return this.parent.on_fire_user_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp, from_elem);
	};

	_pGridImage.on_fire_user_onkeydown = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp) {
		return this.parent.on_fire_user_onkeydown(key_code, alt_key, ctrl_key, shift_key, this, from_refer_comp);
	};

	_pGridImage.on_fire_user_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp) {
		return this.parent.on_fire_user_onkeyup(key_code, alt_key, ctrl_key, shift_key, this, from_refer_comp);
	};

	_pGridImage.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return this.parent.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp, "image");
	};

	_pGridImage.on_fire_onsize = function (width, height) {
		if (this._complete) {
			this.__apply_text();
		}
		return nexacro.Component.prototype.on_fire_onsize.call(this, width, height);
	};

	_pGridImage._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridImage._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};

	_pGridImage._isEnable = function () {
		return this._grid._enable;
	};

	_pGridImage._getDisplayText = function () {
		if (this.parent) {
			return this.parent._getDisplayText();
		}
		return "";
	};

	_pGridImage._updateAll = function () {
		this.on_apply_pseudo(this._pseudo);
		this._setProperty();
	};

	_pGridImage._setProperty = function () {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		var grid = this._grid;
		var datarow = grid._getDataRow(cellobj._rowidx);

		var v = cellinfo._getDisplayText(datarow);

		v = nexacro._toString(v);
		if (v != null) {
			this.set_text(v);
		}
		else {
			this.set_text("");
		}
	};

	_pGridImage._adjustAlign = function (halign, valign) {
		if (!halign) {
			halign = "center";
		}
		if (!valign) {
			valign = "middle";
		}

		var prect = this._grid._getAvailableRect(this.parent);
		var parentWidth = prect.width;
		var parentHeight = prect.height;
		var parentRight = prect.right;
		var parentBottom = prect.bottom;
		var left = 0;
		var top = 0;

		var imgElem = this._img_elem;
		var imgWidth = this.imagewidth;
		var imgHeight = this.imageheight;

		if (halign == "center") {
			left = Math.round((parentWidth - imgWidth) / 2);
		}
		else if (halign == "right") {
			left = parentRight - imgWidth;
		}

		if (valign == "middle") {
			top = Math.round((parentHeight - imgHeight) / 2);
		}
		else if (valign == "bottom") {
			top = parentBottom - imgHeight;
		}

		this.move(left, top, imgWidth, imgHeight);

		if (imgElem) {
			imgElem.setElementSize(imgWidth, imgHeight);
		}
	};

	_pGridImage._on_loadImg = function (imgurl, w, h) {
		if (!this._is_alive || !this._img_elem) {
			return;
		}

		if (this._img_type == "url") {
			this._img_elem.setElementImageUrl(imgurl);
		}
		else {
			this._img_elem.setElementImageBase64(imgurl);
		}

		this.imagewidth = w;
		this.imageheight = h;

		var align = this.on_find_CurrentStyle_align(this._pseudo);

		if (align) {
			this._adjustAlign(align.halign, align.valign);
		}
		else {
			this._adjustAlign();
		}
	};

	_pGridImage._load_image = function (image) {
		var elem = this.getElement();

		var val = "";
		var img_type = "url";

		if (image) {
			val = image.toString();
			var isBase64 = nexacro._checkBase64String(val);
			if (isBase64) {
				img_type = "base64";
				if (val.substring(0, 10).toLowerCase() == "data:image") {
					if (val.substring(0, 17).toLowerCase() != "data:image;base64") {
						var comma_idx = val.indexOf(",");
						if (comma_idx > -1) {
							var tmp = val.slice(comma_idx + 1, val.legnth);
							val = "data:image;base64," + tmp;
						}
					}
				}
				else {
					val = "data:image;base64," + val;
				}
			}
		}

		if (val && elem) {
			var _img_elem = this._img_elem;
			var newimage = false;

			if (!_img_elem) {
				this._img_elem = _img_elem = new nexacro.ImageElement(elem);
				newimage = true;
			}

			if (!_img_elem._handle) {
				_img_elem.create();
			}

			if (img_type == "url") {
				val = nexacro._getURIValue(val);
				val = nexacro._getImageLocation(val, this._getRefFormBaseUrl());
			}

			this._img_type = img_type;

			var size = nexacro._getImageSize(val, this._on_loadImg, this, undefined, image.toString());
			if (size) {
				this.imagewidth = size.width;
				this.imageheight = size.height;

				if (img_type == "url") {
					_img_elem.setElementImageUrl(val);
				}
				else {
					_img_elem.setElementImageBase64(val);
				}
			}

			var align = this.on_find_CurrentStyle_align(this._pseudo);
			this._adjustAlign(align.halign, align.valign);

			if (newimage) {
				if (this._is_created) {
					_img_elem.create();
				}
			}

			if (this.imagewidth > 0 && this.imageheight > 0) {
				_img_elem.setElementSize(this.imagewidth, this.imageheight);
			}
		}
		else {
			if (this._img_elem) {
				this._img_elem.destroy();
				this.imagewidth = 0;
				this.imageheight = 0;
				this._img_elem = null;
			}
		}
	};

	delete _pGridImage;

	nexacro.GridSelectorButtonCtrl = function (id, position, left, top, width, height, right, bottom, parent, target, idx) {
		nexacro.TrackImageButtonCtrl.call(this, id, position, left, top, width, height, right, bottom, target);
		this._parent = parent;
		this._band = parent._band;
		this._grid = target;
		this._idx = idx;
		this._point = {
			x : 0, 
			y : 0, 
			w : 0, 
			h : 0
		};
		this._minibox = null;
		this._minibox_size = 8;
		this._minibox_wgap = 0;
		this._minibox_hgap = 0;
	};
	var _pGridSelectorButtonCtrl = nexacro.GridSelectorButtonCtrl.prototype = nexacro._createPrototype(nexacro.TrackImageButtonCtrl, nexacro.GridSelectorButtonCtrl);
	_pGridSelectorButtonCtrl._type_name = "GridSelectorButtonControl";


	_pGridSelectorButtonCtrl.on_find_CurrentStyle_background = function (pseudo) {
	};

	_pGridSelectorButtonCtrl.on_find_CurrentStyle_border = function (pseudo) {
	};

	_pGridSelectorButtonCtrl.on_find_CurrentStyle_image = function (pseudo) {
		return this._grid.on_find_CurrentStyle_selectpointimage(pseudo);
	};

	_pGridSelectorButtonCtrl.on_apply_style_image = function (image) {
		nexacro.TrackImageButtonCtrl.prototype.on_apply_style_image.call(this);
		this._updateMiniBox();
	};

	_pGridSelectorButtonCtrl._on_loadImg = function (imgurl, w, h) {
		if (!this._is_alive) {
			return;
		}

		this._image_width = w;
		this._image_height = h;
		this._updateMiniBox();
	};

	_pGridSelectorButtonCtrl._load_image = function (image) {
		var val = image ? image._value : "";
		if (val) {
			if (val.substring(0, 4).toLowerCase() == "url(") {
				val = val.substring(5, val.length - 2);
			}

			val = nexacro._getImageLocation(val, this._getRefFormBaseUrl());

			var size = nexacro._getImageSize(val, this._on_loadImg, this, undefined, (image ? image._value : ""));

			if (size) {
				this._on_loadImg(val, size.width, size.height);
			}
		}

		var retn = nexacro.TrackImageButtonCtrl.prototype._load_image.call(this, image);
		return retn;
	};

	_pGridSelectorButtonCtrl._updateMiniBox = function () {
		if (!this.currentstyle.image || !this._image_width || !this._image_height) {
			var x = (this._adjust_height - this._minibox_size) / 2;

			this._minibox_wgap = x;
			this._minibox_hgap = x;

			if (!this._minibox) {
				this._minibox = new nexacro.Component("minibox", "absolute", x, x, this._minibox_size, this._minibox_size, null, null, this);
				this._minibox._is_simple_control = true;
				this._minibox._is_track = true;
				this._minibox._on_starttrack = function () {
					return this.parent._on_starttrack();
				};
				this._minibox._on_movetrack = function (x, y, dragdata) {
					return this.parent._on_movetrack(x, y, dragdata);
				};
				this._minibox._on_endtrack = function (x, y, dragdata) {
					return this.parent._on_endtrack(x, y, dragdata);
				};

				this._minibox.on_find_CurrentStyle_border = function (pseudo) {
					return nexacro._getCachedStyleObj("border", "1 solid black");
				};
				this._minibox.on_find_CurrentStyle_background = function (pseudo) {
					return this.parent._band._find_pseudo_obj("selectbackground", "normal", "background", "body");
				};

				this._minibox.createComponent();
			}
			else {
				this._minibox.move(x, x, this._minibox_size, this._minibox_size);
			}
		}
		else {
			if (this._minibox) {
				this._minibox.destroy();
				this._minibox = null;
			}
			if (this._img_elem) {
				this._minibox_wgap = (this._adjust_width - this._image_width) / 2;
				this._minibox_hgap = (this._adjust_height - this._image_height) / 2;

				if (this._minibox_wgap < 0) {
					this._minibox_wgap = 0;
				}
				if (this._minibox_hgap < 0) {
					this._minibox_hgap = 0;
				}
			}
		}
	};

	_pGridSelectorButtonCtrl.on_fire_onsize = function (width, height) {
		this._updateMiniBox();
	};

	_pGridSelectorButtonCtrl.on_create_contents = function () {
		nexacro.TrackImageButtonCtrl.prototype.on_create_contents.call(this);
		this._updateMiniBox();
	};

	_pGridSelectorButtonCtrl.on_created_contents = function () {
		nexacro.TrackImageButtonCtrl.prototype.on_created_contents.call(this);

		if (this._minibox) {
			this._minibox.on_created();
		}
	};

	_pGridSelectorButtonCtrl.on_destroy_contents = function () {
		this._parent = null;
		this._band = null;
		this._grid = null;
		this._minibox = null;
		nexacro.TrackImageButtonCtrl.prototype.on_destroy_contents.call(this);
	};

	_pGridSelectorButtonCtrl._on_starttrack = function () {
		var p = this._parent;
		p._is_tracking = true;
		p._track_reset_scroll = false;
		p._track_up_scroll = false;

		var scroll_top = this._grid._getScrollTop();
		var scroll_left = this._grid._getScrollLeft();

		this._point.hgap = 0;
		this._point.wgap = 0;
		this._point.scrolltop = scroll_top;
		this._point.scrollleft = scroll_left;

		this._point.x = p._area_pos.l;
		this._point.y = p._area_pos.t;
		this._point.w = p._area_pos.w;
		this._point.h = p._area_pos.h;


		var start_row = end_row = start_col = end_col = -1;
		var select_area = this._grid._selectinfo.area;
		if (select_area.length > 0) {
			var area = select_area[select_area.length - 1];
			start_row = area.begrow;
			end_row = area.endrow;
			start_col = area.begrow;
			end_col = area.endrow;

			if (this._idx != p._pre_idx) {
				var areainfo = this._grid._selectinfo.areainfo;
				var ctrlpoint = this._grid._selectinfo.ctrlpoint;
				var cellinfo;
				if (areainfo) {
					var format = this._grid._curFormat;
					var subrowlen = format._bodyrows.length;
					if (this._idx == 0) {
						cellinfo = format._bodycells[areainfo.ecell];
						ctrlpoint._set(cellinfo, areainfo.erow, subrowlen);
					}
					else if (this._idx == 1) {
						cellinfo = format._bodycells[areainfo.scell];
						ctrlpoint._set(cellinfo, areainfo.srow, subrowlen);
					}
					else if (this._idx == 2) {
						cellinfo = format._bodycells[areainfo.ecell];
						ctrlpoint._set(cellinfo, areainfo.srow, subrowlen);
					}
					else if (this._idx == 3) {
						cellinfo = format._bodycells[areainfo.scell];
						ctrlpoint._set(cellinfo, areainfo.erow, subrowlen);
					}
				}
			}
		}


		if (this._grid._fixed_rowcnt > 0) {
			var headheight = this._grid._getHeadHeight();
			var fixedheight = this._grid._fixed_height;
			var fixedbottom = headheight + fixedheight;

			if (start_row >= this._grid._fixed_startrow && start_row <= this._grid._fixed_endrow) {
				this._point.y = p._area_pos.t += this._point.scrolltop;

				if (end_row > this._grid._fixed_endrow && scroll_top > 0) {
					if (p._end_scroll_top >= 0) {
						this._point.h = p._area_pos.h -= scroll_top;
					}
				}
			}
		}

		p.set_visible(true);
		p._trackbar[0].set_visible(false);
		p._trackbar[1].set_visible(false);
		p._trackbar[2].set_visible(false);
		p._trackbar[3].set_visible(false);

		p._start_begarea = this._grid._selectinfo.arearect.barea;
		p._start_endarea = this._grid._selectinfo.arearect.earea;

		if (this._idx == 0) {
			this._area = p._start_begarea;
		}
		else {
			this._area = p._start_endarea;
		}

		this._grid._track_mode = "areaselect";


		p._callback_start.call(this._grid, p._area_pos, this._idx);
	};

	_pGridSelectorButtonCtrl._on_movetrack = function (x, y, dragdata) {
		var p = this._parent;

		var cur_scrolltop = this._grid._getScrollTop();
		var cur_scrollleft = this._grid._getScrollLeft();

		var scroll_top_gap = scroll_left_gap = 0;

		if (p._start_scroll_top >= 0) {
			scroll_top_gap = p._start_scroll_top - cur_scrolltop;
		}
		if (p._start_scroll_left >= 0) {
			scroll_left_gap = p._start_scroll_left - cur_scrollleft;
		}

		var ctrl_row = this._grid._selectinfo.ctrlpoint.row;

		var bApply_scroll_top = true;
		if (this._grid._fixed_rowcnt > 0 && ctrl_row >= this._grid._fixed_startrow && ctrl_row <= this._grid._fixed_endrow) {
			bApply_scroll_top = false;
		}

		if (this._idx == 0) {
			var l = this._point.x + x;
			var t = this._point.y + y;
			var w = this._point.w - x + scroll_left_gap;
			var h = this._point.h - y + (bApply_scroll_top ? scroll_top_gap : 0);
		}
		else if (this._idx == 1) {
			var l = this._point.x + scroll_left_gap;
			var t = this._point.y + (bApply_scroll_top ? scroll_top_gap : 0);
			var w = this._point.w + x - scroll_left_gap;
			var h = this._point.h + y - (bApply_scroll_top ? scroll_top_gap : 0);
		}
		else if (this._idx == 2) {
			var l = this._point.x + x;
			var t = this._point.y;
			var w = this._point.w - x;
			var h = this._point.h + y;
		}
		else if (this._idx == 3) {
			var l = this._point.x;
			var t = this._point.y + y;
			var w = this._point.w + x;
			var h = this._point.h - y;
		}

		var select_area = this._grid._selectinfo.area;
		if (this._grid._fixed_rowcnt > 0 && select_area.length) {
			var border = this._grid.currentstyle.border;
			var border_top = (border) ? parseInt(border.right_width, 10) : 0;

			var headheight = this._grid._getHeadHeight();
			var fixedrowcnt = this._grid._fixed_rowcnt;
			var fixedheight = this._grid._fixed_height;
			var fixedbottom = headheight + fixedheight + border_top;

			var cur_area = select_area[select_area.length - 1];
			var cur_srow = cur_area.begrow;
			var cur_erow = cur_area.endrow;

			var ctrlpoint = this._grid._selectinfo.ctrlpoint;
			var cur_row = ctrlpoint.row;
			var cur_col = ctrlpoint.col;

			var border = this._grid.currentstyle.border;
			var border_top = (border) ? parseInt(border.right_width, 10) : 0;

			var fixedsrow = this._grid._fixed_startrow;
			var fixederow = this._grid._fixed_endrow;
			var vscrollbar = this._grid.vscrollbar;

			if ((t + h) < fixedbottom) {
				p._track_reset_scroll = true;
			}

			if (cur_erow > fixederow) {
				p._track_up_scroll = true;
			}

			if (p._track_reset_scroll && cur_srow <= fixederow && cur_scrolltop > 0 && (t + h) >= fixedbottom) {
				vscrollbar.set_pos(0);
				p._track_reset_scroll = false;
			}
			else if (p._track_up_scroll && ctrlpoint.row <= fixederow && cur_scrolltop > 0 && (t + h) <= (fixedbottom)) {
				vscrollbar.set_pos(vscrollbar.pos - 1);
			}
			else if (ctrlpoint.row > fixederow && cur_scrolltop > 0 && t <= fixedbottom) {
				vscrollbar.set_pos(vscrollbar.pos - 1);
			}
		}

		var type = p._setAreaPos(l, t, w, h, true, this._idx);
		var scroll = false;
		p._adjust_scroll = false;

		if (type[0] != "" || type[1] != "") {
			var area;
			if (p._onlyarea) {
				area = p._curarea;
			}

			var p_l = p._area_pos.l;
			var p_t = p._area_pos.t;
			var p_w = p._area_pos.w;
			var p_h = p._area_pos.h;

			scroll = p._callback_scroll.call(this._grid, type, area);

			p._area_pos.l = p_l;
			p._area_pos.t = p_t;
			p._area_pos.w = p_w;
			p._area_pos.h = p_h;
		}

		if (scroll) {
			if (type[1] == "bottomover1" || type[1] == "topover0") {
			}
			if (type[0] == "rightover1" || type[0] == "leftover0") {
			}
		}
		p._callback.call(this._grid, p._area_pos, this._idx, true);
	};

	_pGridSelectorButtonCtrl._on_endtrack = function (x, y, dragdata) {
		var p = this._parent;
		p._is_tracking = false;
		p._adjust_scroll = true;
		p.set_visible(false);
		p._trackbar[0].set_visible(true);
		p._trackbar[1].set_visible(true);
		p._start_begarea = this._grid._selectinfo.arearect.barea;
		p._start_endarea = this._grid._selectinfo.arearect.earea;

		if (this._idx == 0) {
			this._area = p._start_begarea;
		}
		else {
			this._area = p._start_endarea;
		}

		p._end_scroll_top = this._grid._getScrollTop();
		p._end_scroll_left = this._grid._getScrollLeft();
		p._pre_idx = this._idx;

		var select_area = this._grid._selectinfo.area;
		if (this._grid._fixed_rowcnt > 0 && select_area.length) {
			var cur_area = select_area[select_area.length - 1];
			var cur_erow = cur_area.endrow;

			var fixederow = this._grid._fixed_endrow;

			if (cur_erow > fixederow) {
				p._track_up_scroll = true;
			}
			else {
				p._track_up_scroll = false;
			}
		}

		this._grid._track_mode = "";

		this._grid._updateSelector();
	};

	delete _pGridSelectorButtonCtrl;

	nexacro.GridSelector = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_simple_control = true;
		this._is_subcontrol = true;
		this._callback_start = null;
		this._callback = null;
		this._callback_scroll = null;
		this._trackbar = [];
		this._grid = parent;
		this._band = parent._bodyBand;
		this._area_pos = {
			l : 0, 
			t : 0, 
			w : 0, 
			h : 0, 
			empty : true
		};
		this._curarea = "";
		this._onlyarea = false;
		this._start_begarea = "";
		this._start_endarea = "";
		this._start_scroll_top = -1;
		this._start_scroll_left = -1;
		this._end_scroll_top = -1;
		this._end_scroll_left = -1;
		this._pre_idx = -1;
	};

	var _pGridSelector = nexacro._createPrototype(nexacro.Component, nexacro.GridSelector);
	nexacro.GridSelector.prototype = _pGridSelector;
	_pGridSelector._type_name = "GridSelector";

	_pGridSelector._trackbar_size = 22;


	_pGridSelector.on_find_CurrentStyle_background = function (pseudo) {
		return null;
	};
	_pGridSelector.on_find_CurrentStyle_border = function (pseudo) {
		return null;
	};
	_pGridSelector.on_find_CurrentStyle_opacity = function (pseudo) {
		return null;
	};

	_pGridSelector.on_create_contents = function () {
	};

	_pGridSelector.on_created_contents = function () {
		if (this._trackbar[0]) {
			this._trackbar[0].on_created();
			this._trackbar[1].on_created();
			this._trackbar[2].on_created();
			this._trackbar[3].on_created();
		}
	};

	_pGridSelector.on_destroy_contents = function () {
		this._trackbar[0].destroy();
		this._trackbar[1].destroy();
		this._trackbar[0] = null;
		this._trackbar[1] = null;
		this._trackbar[2] = null;
		this._trackbar[3] = null;
		this._trackbar = null;
		this._band = null;
		this._grid = null;
	};

	_pGridSelector.on_find_CurrentStyle_border = function (pseudo) {
		return null;
	};
	_pGridSelector._createButton = function () {
		if (!this._trackbar[0]) {
			this._trackbar[0] = new nexacro.GridSelectorButtonCtrl("selectortrackbar1", "absolute", 0, 0, 0, 0, null, null, this, this.parent, 0);
			this._trackbar[0].createComponent();
			this._trackbar[1] = new nexacro.GridSelectorButtonCtrl("selectortrackbar2", "absolute", 0, 0, 0, 0, null, null, this, this.parent, 1);
			this._trackbar[1].createComponent();
			this._trackbar[2] = new nexacro.GridSelectorButtonCtrl("selectortrackbar3", "absolute", 0, 0, 0, 0, null, null, this, this.parent, 2);
			this._trackbar[2].createComponent();
			this._trackbar[3] = new nexacro.GridSelectorButtonCtrl("selectortrackbar4", "absolute", 0, 0, 0, 0, null, null, this, this.parent, 3);
			this._trackbar[3].createComponent();

			this._trackbar[0]._no_slide_scroll = true;
			this._trackbar[1]._no_slide_scroll = true;
			this._trackbar[2]._no_slide_scroll = true;
			this._trackbar[3]._no_slide_scroll = true;
			this._recalcarea();
		}
	};

	_pGridSelector._updateAll = function () {
		if (this._trackbar[0]) {
			this._trackbar[0].on_apply_custom_pseudo(this._trackbar[0]._pseudo);
			this._trackbar[1].on_apply_custom_pseudo(this._trackbar[1]._pseudo);
			this._trackbar[2].on_apply_custom_pseudo(this._trackbar[2]._pseudo);
			this._trackbar[3].on_apply_custom_pseudo(this._trackbar[3]._pseudo);
		}
	};

	_pGridSelector._recalcarea = function (mode) {
		if (!this._trackbar[0]) {
			return;
		}

		if (this._area_pos.empty) {
			this._trackbar[0].set_visible(false);
			this._trackbar[1].set_visible(false);
			this._trackbar[2].set_visible(false);
			this._trackbar[3].set_visible(false);
			return;
		}

		if (mode != "hscroll" && mode != "vscroll") {
			this.__showbutton(false);
		}

		var fullsize = this._trackbar_size;
		var halfsize = fullsize / 2;
		var grid = this._grid;
		var format = grid._curFormat;
		var leftwidth = format.leftWidth;
		var rightstart = grid._client_width - format.rightWidth;
		var hmin, hmax, vmin, vmax;
		var l, t, r, b;
		var adjust_top;

		vmin = this._band._adjust_top;
		vmax = this._band._getPosBottom();

		hmin = [];
		hmax = [];

		if (this._start_begarea == "left") {
			hmin[0] = 0;
			hmax[0] = leftwidth;
		}
		else if (this._start_begarea == "right") {
			hmin[0] = rightstart;
			hmax[0] = grid._client_width;
		}
		else {
			hmin[0] = leftwidth;
			hmax[0] = rightstart;
		}

		if (this._start_endarea == "left") {
			hmin[1] = 0;
			hmax[1] = leftwidth;
		}
		else if (this._start_endarea == "right") {
			hmin[1] = rightstart;
			hmax[1] = grid._client_width;
		}
		else {
			hmin[1] = leftwidth;
			hmax[1] = rightstart;
		}

		var border = this._grid.currentstyle.border;
		var border_top = (border) ? parseInt(border.right_width, 10) : 0;

		var headheight = this._grid._getHeadHeight();
		var fixedheight = this._grid._fixed_height;
		var fixedbottom = headheight + fixedheight + border_top;

		var fixed_srow = this._grid._fixed_startrow;
		var fixed_erow = this._grid._fixed_endrow;
		var fixed_rowcnt = this._grid._fixed_rowcnt;
		var infixedrows = [false, false, false, false];
		var scroll_top = this._grid._scroll_top;

		if (fixed_rowcnt) {
			var area = this._grid._selectinfo.area;
			var srow, erow;
			if (area.length > 0) {
				srow = area[area.length - 1].begrow;
				erow = area[area.length - 1].endrow;

				if (srow <= (fixed_srow + fixed_rowcnt)) {
					infixedrows[0] = infixedrows[3] = true;
				}

				if (erow <= (fixed_srow + fixed_rowcnt)) {
					infixedrows[1] = infixedrows[2] = true;
				}
			}
		}

		adjust_top = infixedrows[0] ? scroll_top : 0;
		l = this._area_pos.l - halfsize;
		t = this._area_pos.t - halfsize + adjust_top;
		r = l + fullsize;
		b = t + fullsize;

		this._trackbar[0].move(l, t, fullsize, fullsize);

		var wgap = this._trackbar[0]._minibox_wgap;
		var hgap = this._trackbar[0]._minibox_hgap;

		var lastfocus = grid._find_lastFocused();

		if (lastfocus == grid) {
			if (r - wgap < hmin[0] || b - hgap < vmin || l + wgap > hmax[0] || t + hgap > vmax || t + hgap < fixedheight) {
				this._trackbar[0].visible = infixedrows[0] || false;
			}
			else {
				this._trackbar[0].visible = true;
			}
		}
		else {
			this._trackbar[0].visible = false;
		}

		adjust_top = infixedrows[1] ? scroll_top : 0;
		l = this._area_pos.l + this._area_pos.w - halfsize;
		t = this._area_pos.t + this._area_pos.h - halfsize + adjust_top;
		r = l + fullsize;
		b = t + fullsize;

		this._trackbar[1].move(l, t, fullsize, fullsize);

		if (lastfocus == grid) {
			if (r - wgap < hmin[1] || b - hgap < vmin || l + wgap > hmax[1] || t + hgap > vmax || t + hgap < fixedheight) {
				this._trackbar[1].visible = infixedrows[1] || false;
			}
			else {
				this._trackbar[1].visible = true;
			}
		}
		else {
			this._trackbar[1].visible = false;
		}

		adjust_top = infixedrows[2] ? scroll_top : 0;
		l = this._area_pos.l - halfsize;
		t = this._area_pos.t + this._area_pos.h - halfsize + adjust_top;
		r = l + fullsize;
		b = t + fullsize;

		this._trackbar[2].move(l, t, fullsize, fullsize);

		if (lastfocus == grid) {
			if (r - wgap < hmin[0] || b - hgap < vmin || l + wgap > hmax[0] || t + hgap > vmax || t + hgap < fixedheight) {
				this._trackbar[2].visible = false;
			}
		}

		adjust_top = infixedrows[3] ? scroll_top : 0;
		l = this._area_pos.l + this._area_pos.w - halfsize;
		t = this._area_pos.t - halfsize + adjust_top;
		r = l + fullsize;
		b = t + fullsize;

		this._trackbar[3].move(l, t, fullsize, fullsize);

		if (lastfocus == grid) {
			if (r - wgap < hmin[1] || b - hgap < vmin || l + wgap > hmax[1] || t + hgap > vmax || t + hgap < fixedheight) {
				this._trackbar[3].visible = false;
			}
		}

		this.__showbutton(true);
	};

	if (nexacro.OS == "Android" && (nexacro.Browser == "Safari" || nexacro.Browser == "MobileSafari")) {
		_pGridSelector.__showbutton = function (v) {
			if (this._trackbar[0]) {
				if (!v) {
					this._trackbar[0]._control_element.setElementVisible(false);
					this._trackbar[1]._control_element.setElementVisible(false);
					this._trackbar[2]._control_element.setElementVisible(false);
					this._trackbar[3]._control_element.setElementVisible(false);
				}
				else {
					nexacro.OnceCallbackTimer.callonce(this, function () {
						this._trackbar[0]._control_element.setElementVisible(this._trackbar[0].visible);
						this._trackbar[1]._control_element.setElementVisible(this._trackbar[1].visible);
					}, 10);
				}
			}
		};
	}
	else {
		_pGridSelector.__showbutton = function (v) {
			if (this._trackbar[0]) {
				if (!v) {
					this._trackbar[0]._control_element.setElementVisible(false);
					this._trackbar[1]._control_element.setElementVisible(false);
					this._trackbar[2]._control_element.setElementVisible(false);
					this._trackbar[3]._control_element.setElementVisible(false);
				}
				else {
					this._trackbar[0]._control_element.setElementVisible(this._trackbar[0].visible);
					this._trackbar[1]._control_element.setElementVisible(this._trackbar[1].visible);
				}
			}
		};
	}

	_pGridSelector._trackingHScroll = function (idx, left, right, bodystart, rightstart, scroll_left, scroll_max) {
		if (!this._adjust_scroll && !this._grid.hscrollbar) {
			return [0, 0];
		}

		return this._grid._trackingHScroll(idx, left, right, this._start_begarea, this._start_endarea, bodystart, rightstart, scroll_left, scroll_max);
	};

	_pGridSelector._setAreaPos = function (left, top, width, height, is_track, idx) {
		var retn = ["", ""];
		var grid = this._grid;
		this._curarea = grid._selectinfo.ctrlpoint.area;

		if (is_track) {
			var typeinfo = this._grid._getTrackType(this, left, top, width, height, idx, this._onlyarea);

			left = typeinfo.adjust_l;
			top = typeinfo.adjust_t;
			width = typeinfo.adjust_w;
			height = typeinfo.adjust_h;

			retn[0] = typeinfo.type[0];
			retn[1] = typeinfo.type[1];
		}

		var empty = (grid._selectinfo.area.length > 0) ? false : true;

		if (width <= 0) {
			width = 1;
		}
		if (height <= 0) {
			height = 1;
		}

		this._area_pos.l = left;
		this._area_pos.t = top;
		this._area_pos.w = width;
		this._area_pos.h = height;
		this._area_pos.area = this._curarea;
		this._area_pos.empty = empty;
		if (is_track) {
			this._area_pos.scrolltop = grid._getScrollTop();
		}
		return retn;
	};

	_pGridSelector.move = function (left, top, width, height, mode) {
		if (!this._is_tracking) {
			if (left > this._grid._client_width) {
				return;
			}

			this._start_begarea = this._grid._selectinfo.arearect.barea;
			this._start_endarea = this._grid._selectinfo.arearect.earea;
			this._setAreaPos(left, top, width, height);
			this._recalcarea(mode);
		}
		else {
			this._setAreaPos(left, top, width, height);
		}

		return nexacro.Component.prototype.move.call(this, left, top, width, height, undefined, undefined);
	};

	_pGridSelector._setCallbackFn = function (startfn, applyfn, scrollfn) {
		this._callback_start = startfn;
		this._callback = applyfn;
		this._callback_scroll = scrollfn;
	};

	_pGridSelector._initTrackInfo = function () {
		this._start_scroll_top = -1;
		this._start_scroll_left = -1;
		this._end_scroll_top = -1;
		this._end_scroll_left = -1;
		this._pre_idx = -1;
	};

	delete _pGridSelector;

	nexacro.GridControlResizer = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_simple_control = true;
		this._is_track = true;

		this._callback = null;
		this._index = -1;
		this._direction = "";
		this._tracksize = -1;
		this._is_range = false;
		this._movedPos = 0;
		this._is_tracking = false;
		this._no_slide_scroll = true;
	};

	var _pGridResizer = nexacro._createPrototype(nexacro.Component, nexacro.GridControlResizer);
	nexacro.GridControlResizer.prototype = _pGridResizer;


	_pGridResizer.on_find_CurrentStyle_cursor = function (pseudo) {
		var direction = this._direction;
		var resize_cursor;

		if (direction == "horizon") {
			resize_cursor = nexacro._getCachedValueObj("col-resize");
		}
		else {
			resize_cursor = nexacro._getCachedValueObj("row-resize");
		}

		return resize_cursor;
	};

	_pGridResizer.on_create_contents = function () {
	};

	_pGridResizer.on_created_contents = function () {
		this.set_visible(false);
		this._on_apply_tracksize();

		var cache_back = nexacro._getCachedBackgroundObj("gray");
		this.on_apply_style_background(cache_back);

		var direction = this._direction;
		var resize_cursor;

		if (direction == "horizon") {
			resize_cursor = nexacro._getCachedValueObj("col-resize");
		}
		else {
			resize_cursor = nexacro._getCachedValueObj("row-resize");
		}

		this.on_apply_style_cursor(resize_cursor);
	};

	_pGridResizer._setCallbackFn = function (fn) {
		this._callback = fn;
	};

	_pGridResizer._setIndex = function (idx) {
		this._index = idx;
	};

	_pGridResizer._setDirection = function (dir) {
		if (this._direction != dir) {
			this._direction = dir;
			this._on_apply_direction();
		}
	};

	_pGridResizer._on_apply_direction = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this._on_apply_tracksize();

			var direction = this._direction;
			var resize_cursor;

			if (direction == "horizon") {
				resize_cursor = nexacro._getCachedValueObj("col-resize");
			}
			else {
				resize_cursor = nexacro._getCachedValueObj("row-resize");
			}

			this.on_apply_style_cursor(resize_cursor);
		}
	};

	_pGridResizer._setTracksize = function (size) {
		if (this._tracksize != size) {
			this._tracksize = size;
			this._on_apply_tracksize();
		}
	};

	_pGridResizer._on_apply_tracksize = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var size = this._tracksize;
			var direction = this._direction;
			if (direction == "horizon") {
				this.resize(1, size);
			}
			else if (direction == "vertical") {
				this.resize(size, 1);
			}
		}
	};

	_pGridResizer._moveLeftTo = function (left) {
		this.left = left = left || 0;
		this.move(left, this.top);
	};

	_pGridResizer._moveTopTo = function (top) {
		this.top = top = top || 0;
		this.move(this.left, top);
	};

	_pGridResizer._on_starttrack = function () {
		if (!this._is_alive) {
			return;
		}
		this._movedPos = 0;
		this._is_tracking = true;
	};

	_pGridResizer._on_movetrack = function (x, y, data) {
		if (!this._is_alive) {
			return;
		}

		var parent = this.parent;
		if (parent.ondrag && parent.ondrag.defaultprevented == true) {
			return;
		}
		if (parent.ondragmove && parent.ondragmove.defaultprevented == true) {
			return;
		}

		if (!this.visible) {
			this.set_visible(true);
		}
		if (this._direction == "horizon") {
			var _x = x - this._movedPos;
			this._moveLeftTo(this.left + _x);
			this._movedPos = x;
		}
		else if (this._direction == "vertical") {
			var _y = y - this._movedPos;
			this._moveTopTo(this.top + _y);
			this._movedPos = y;
		}
	};

	_pGridResizer._on_endtrack = function (x, y, data) {
		if (!this._is_alive) {
			return;
		}

		var control_elem = this.getElement();
		if (control_elem) {
			if (nexacro._cur_drag_info) {
				nexacro._cur_drag_info = null;
			}

			if (this.visible) {
				this.set_visible(false);
			}

			var parent = this.parent;
			if ((parent.ondrag && parent.ondrag.defaultprevented == true) || (parent.ondragmove && parent.ondragmove.defaultprevented == true)) {
				parent._setGlobalCursor(null, parent);
			}
			else {
				if (this._callback && this._movedPos != 0) {
					if (this._direction == "horizon") {
						this._callback.call(this.parent, x, this._index);
					}
					else if (this._direction == "vertical") {
						this._callback.call(this.parent, y, this._index);
					}
				}
				parent._setGlobalCursor(null, parent);
			}
		}
		this._is_tracking = false;
	};

	delete _pGridResizer;

	nexacro.GridControlLine_Style = function (target, idx) {
		nexacro.Style.call(this, target, idx);
		this.border = new nexacro.Style_border(1);
	};

	var _pGridControlLineStyle = nexacro.GridControlLine_Style.prototype = nexacro._createPrototype(nexacro.Style, nexacro.GridControlLine_Style);

	_pGridControlLineStyle._type_name = "GridControlLineStyle";

	nexacro.GridControlLine_CurrentStyle = function () {
		this.border = null;
	};

	var _pGridControlLineCurrentStyle = nexacro.GridControlLine_CurrentStyle.prototype = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.GridControlLine_CurrentStyle);
	_pGridControlLineCurrentStyle._type_name = "GridControlLineCurrentStyle";

	delete _pGridControlLineStyle;
	delete _pGridControlLineCurrentStyle;

	nexacro.GridControlLine = function (id, left, top, width, height, parent) {
		nexacro.Component.call(this, id, "absolute", left, top, width, height, null, null, parent);
		this.tabstop = false;
		this._is_subcontrol = true;
		this._is_simple_control = true;
		this._is_nc_control = true;

		if (parent._refobj) {
			this._grid = parent._refobj.grid;
			this._cellinfo = parent._refobj;
			this._cellobj = parent;
		}
		else {
			this._grid = parent._grid;
			this._cellinfo = parent._cellinfo;
			this._cellobj = parent._cellobj;
		}
		this._linetype = {
		};
		this._depth = -1;
		this._showleft = false;
		this._showbottom = false;
	};

	var _pGridControlLine = nexacro._createPrototype(nexacro.Component, nexacro.GridControlLine);
	nexacro.GridControlLine.prototype = _pGridControlLine;
	_pGridControlLine._type_name = "GridControlLine";

	_pGridControlLine.on_create_custom_style = function () {
		return new nexacro.GridControlLine_Style(this);
	};

	_pGridControlLine.on_create_custom_currentStyle = function () {
		return new nexacro.GridControlLine_CurrentStyle();
	};


	_pGridControlLine.on_find_CurrentStyle_border = function (pseudo) {
		var value = this._linetype.width + "px " + this._linetype.style + " " + this._linetype.color;

		var border_val = "0px none transparent, 0px none transparent, ";

		if (this._showbottom) {
			border_val += value + ", ";
		}
		else {
			border_val += "0px none transparent, ";
		}

		if (this._showleft) {
			border_val += value;
		}
		else {
			border_val += "0px none transparent";
		}

		var border = nexacro._getCachedStyleObj("border", border_val);
		return border;
	};

	_pGridControlLine.on_find_CurrentStyle_cursor = function (pseudo) {
		var grid = this._grid;
		if (grid._global_cursor) {
			return grid._global_cursor;
		}

		return this.parent.on_find_CurrentStyle_cursor(pseudo);
	};

	_pGridControlLine._makeCssRefInfo = function () {
		return (this._grid._makeCssRefInfoCtrl(this));
	};

	_pGridControlLine.on_change_containerRect = function (width, height) {
		this._control_pseudo = "";
		this._contents_pseudo = "";
		this.on_apply_pseudo(this._pseudo);
	};

	_pGridControlLine.on_destroy_contents = function () {
		this._grid = null;
		this._cellinfo = null;
		this._cellobj = null;
	};

	_pGridControlLine._isEnable = function () {
		return this._grid._enable;
	};

	_pGridControlLine._set_line = function (linetype, left, bottom) {
		var control_elem = this.getElement();
		if (control_elem && linetype) {
			this._linetype = linetype;
			this._showleft = left;
			this._showbottom = bottom;

			this._control_pseudo = "";
			this._contents_pseudo = "";
			this.on_apply_pseudo(this._pseudo);
		}
	};

	delete _pGridControlLine;

	nexacro.GridControlTree = function (id, left, top, width, height, parent) {
		nexacro.Component.call(this, id, "absolute", left, top, width, height, null, null, parent);
		this.tabstop = false;
		this._is_subcontrol = true;

		this._grid = parent._refobj.grid;
		this._cellinfo = parent._refobj;
		this._cellobj = parent;

		this._linetype = {
		};
		this._leftline_ctrls = [];
	};
	var _pGridTree = nexacro._createPrototype(nexacro.Component, nexacro.GridControlTree);
	nexacro.GridControlTree.prototype = _pGridTree;
	_pGridTree._type_name = "GridControlTree";

	_pGridTree._btn_elem = null;
	_pGridTree._chk_ctrl = null;
	_pGridTree._img_elem = null;
	_pGridTree._text_elem = null;
	_pGridTree._applied_state = -1;
	_pGridTree._display_text = "";
	_pGridTree._upline_ctrl = null;
	_pGridTree._downline_ctrl = null;
	_pGridTree._leftline_ctrls = null;
	_pGridTree._clicktarget = null;

	_pGridTree.on_apply_custom_pseudo = function (pseudo) {
		if (!this._is_created) {
			return;
		}

		var control_elem = this.getElement();
		if (!control_elem) {
			return;
		}

		if (!pseudo) {
			pseudo = this._pseudo;
		}
		var curstyle = this.currentstyle;

		var font = this.on_find_CurrentStyle_font(pseudo);
		if (curstyle.font != font) {
			curstyle.font = font;
			this.on_apply_style_font(font);
		}

		var letterspace = this.on_find_CurrentStyle_letterspace(pseudo);
		if (curstyle.letterspace != letterspace) {
			curstyle.letterspace = letterspace;
			this.on_apply_style_letterspace(letterspace);
		}

		var color = this.on_find_CurrentStyle_color(pseudo);
		if (curstyle.color != color) {
			curstyle.color = color;
			this.on_apply_style_color(color);
		}

		var align = this.on_find_CurrentStyle_align(pseudo);
		if (curstyle.align != align) {
			curstyle.align = align;
			this.on_apply_style_align(align);
		}

		var grid = this._grid;
		if (this._cellobj._is_created) {
			if (!grid._ReasonRefresh) {
				grid.on_apply_cell_pseudo(this._cellobj, pseudo);
			}
		}
	};


	_pGridTree.on_find_CurrentStyle_background = function (pseudo) {
		if (this.parent._pseudo == "selected") {
			pseudo = "selected";
		}

		return this.parent.on_find_CurrentStyle_background(pseudo);
	};

	_pGridTree.on_find_CurrentStyle_font = function (pseudo) {
		if (this.parent._pseudo == "selected") {
			pseudo = "selected";
		}

		return this.parent.on_find_CurrentStyle_font(pseudo);
	};

	_pGridTree.on_find_CurrentStyle_letterspace = function (pseudo) {
		return this.parent.on_find_CurrentStyle_letterspace(pseudo);
	};

	_pGridTree.on_find_CurrentStyle_color = function (pseudo) {
		if (this.parent._pseudo == "selected") {
			pseudo = "selected";
		}

		return this.parent.on_find_CurrentStyle_color(pseudo);
	};

	_pGridTree.on_find_CurrentStyle_cursor = function (pseudo) {
		var grid = this._grid;
		if (grid._global_cursor) {
			return grid._global_cursor;
		}

		if (this.parent._pseudo == "selected") {
			pseudo = "selected";
		}

		return this.parent.on_find_CurrentStyle_cursor(pseudo);
	};

	_pGridTree.on_find_CurrentStyle_padding = function (pseudo) {
		return null;
	};

	_pGridTree._makeCssRefInfo = function () {
		return (this._grid._makeCssRefInfoCtrl(this));
	};

	_pGridTree._find_pseudo_obj = function (styleProp, pseudo, returnType) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;

		if (this._displaymode == true) {
			if (pseudo != "disabled") {
				pseudo = "normal";
			}
		}

		var odd = (cellobj._rowidx >= 0) ? (cellobj._rowidx % 2) : false;
		var grid = this._grid;
		var datarow = grid._getDataRow(this._cellobj._rowidx);
		var v = cellinfo._query_pseudo_control(this, datarow, styleProp, styleProp, pseudo, returnType, null, odd, cellobj._isSelected());
		return v;
	};

	_pGridTree.on_create_contents = function () {
		var control_elem = this.getElement();
		var parentheight = this._getLineHeight();

		this._rightline_ctrl = new nexacro.GridControlLine("controlrightline", 0, 0, 0, 0, this.parent);
		this._rightline_ctrl._is_subcontrol = true;
		this._rightline_ctrl.createComponent(true);

		this._upline_ctrl = new nexacro.GridControlLine("controlupline", 0, 0, 0, 0, this.parent);
		this._upline_ctrl._is_subcontrol = true;
		this._upline_ctrl.createComponent(true);

		this._downline_ctrl = new nexacro.GridControlLine("controldownline", 0, 0, 0, 0, this.parent);
		this._downline_ctrl._is_subcontrol = true;
		this._downline_ctrl.createComponent(true);

		this._chk_ctrl = new nexacro.GridCellCheckbox("controlcheckbox", 0, 0, 0, 0, this);
		this._chk_ctrl._is_subcontrol = true;
		this._chk_ctrl.createComponent(true);

		this._text_elem = new nexacro.TextBoxElement(control_elem);

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 8) {
			this._img_elem = new nexacro.AlignImageElement(control_elem);
			this._btn_elem = new nexacro.AlignImageElement(control_elem);
		}
		else {
			this._img_elem = new nexacro.ImageElement(control_elem);
			this._btn_elem = new nexacro.ImageElement(control_elem);
		}
	};

	_pGridTree.on_created_contents = function () {
		if (this._rightline_ctrl) {
			this._rightline_ctrl.on_created();
		}
		if (this._upline_ctrl) {
			this._upline_ctrl.on_created();
		}
		if (this._downline_ctrl) {
			this._downline_ctrl.on_created();
		}
		if (this._btn_elem) {
			this._btn_elem.create();
		}
		if (this._chk_ctrl) {
			this._chk_ctrl.on_created();
		}
		if (this._img_elem) {
			this._img_elem.create();
		}
		if (this._text_elem) {
			var rect = this._grid._getAvailableRect(this);
			this._text_elem.setElementSize(rect.width, rect.height);
			this._text_elem.create();
		}

		this._is_created = true;
		this._control_pseudo = "";
		this._contents_pseudo = "";
		this._updateAll();
	};

	_pGridTree.on_destroy_contents = function () {
		var leftlines = this._leftline_ctrls;

		for (var i = 0; i < leftlines.length; i++) {
			leftlines[i].destroy();
		}

		this._leftline_ctrls = [];

		if (this._rightline_ctrl) {
			this._rightline_ctrl.destroy();
			this._rightline_ctrl = null;
		}
		if (this._upline_ctrl) {
			this._upline_ctrl.destroy();
			this._upline_ctrl = null;
		}
		if (this._downline_ctrl) {
			this._downline_ctrl.destroy();
			this._downline_ctrl = null;
		}
		if (this._btn_elem) {
			this._btn_elem.destroy();
			this._btn_elem = null;
		}
		if (this._chk_ctrl) {
			this._chk_ctrl.destroy();
			this._chk_ctrl = null;
		}
		if (this._img_elem) {
			this._img_elem.destroy();
			this._img_elem = null;
		}
		if (this._text_elem) {
			this._text_elem.destroy();
			this._text_elem = null;
		}
		this._clicktarget = null;
		this._grid = null;
		this._cellinfo = null;
		this._cellobj = null;
	};

	_pGridTree._setAccessibilityStatFocus = function (evt_name) {
		var tmp_label = "";
		var cellobj = this._cellobj;
		var label = cellobj._getCellAccessibilityLabel();
		this._setAccessibilityLabel(label);


		var level = this._cellinfo._getTreeLevel(cellobj._rowidx);
		var startlevel = this._cellinfo._getTreeStartLevel(cellobj._rowidx);
		if (this._grid.getTreeStatus(cellobj._rowidx) == 0) {
			this._setAccessibilityStatExpanded(false);
		}
		else {
			this._setAccessibilityStatExpanded(true);
		}
		this._setAccessibilityInfoLevel(level - startlevel + 1);
		nexacro.Component.prototype._setAccessibilityStatFocus.call(this, evt_name);
	};

	_pGridTree.on_get_style_accessibility_description = function () {
		if (this._cellobj) {
			return this._cellobj.tooltiptext;
		}
	};

	_pGridTree.on_apply_text = function () {
		var text_elem = this._text_elem;

		if (text_elem) {
			text_elem.setElementText(this._display_text);
		}
	};

	_pGridTree.on_apply_style_font = function (font) {
		if (font) {
			if (this._text_elem) {
				this._text_elem.setElementFont(font);
			}
		}
	};

	_pGridTree.on_apply_style_color = function (color) {
		if (color) {
			if (this._text_elem) {
				this._text_elem.setElementColor(color);
			}
		}
	};

	_pGridTree.on_apply_style_align = function (align) {
		if (align) {
			if (this._text_elem) {
				this._text_elem.setElementAlignXY("left", align.valign);
			}
		}
	};

	_pGridTree._common_lbuttondown = function (elem) {
		var grid = this._grid;
		var rowidx = grid._getDataRow(this._cellobj._rowidx);
		var rowstatus = grid._treeStates[rowidx];

		if (elem == this._btn_elem) {
			this._clicktarget = rowstatus;
		}
	};

	_pGridTree._on_touchstart = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp) {
		if (!this._is_alive) {
			return;
		}

		var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);
		if (touchinfo) {
			this._common_lbuttondown(touchinfo._elem);
		}

		return nexacro.Component.prototype._on_touchstart.call(this, touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp);
	};

	_pGridTree._on_lbuttondown = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		if (!this._is_alive) {
			return;
		}

		this._common_lbuttondown(elem);

		return nexacro.Component.prototype._on_lbuttondown.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp);
	};

	_pGridTree._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY) {
		if (!this._is_alive) {
			return;
		}


		if (this.visible && this._isEnable() && this.enableevent) {
			var clickitem;

			if (elem instanceof nexacro.TextBoxElement) {
				clickitem = "text";
			}
			else if (elem instanceof nexacro.ImageElement) {
				if (this._btn_elem == elem) {
					clickitem = "treebutton";
				}
				else {
					clickitem = "image";
				}
			}
			else {
				clickitem = "";
			}

			var clientXY = this._getClientXY(canvasX, canvasY);
			this.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this, clickitem);
		}
	};

	_pGridTree._on_dblclick = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY) {
		if (!this._is_alive) {
			return;
		}

		if (this.visible && this._isEnable() && this.enableevent) {
			var clickitem;
			if (elem instanceof nexacro.TextBoxElement) {
				clickitem = "text";
			}
			else if (elem instanceof nexacro.ImageElement) {
				clickitem = "image";
			}
			else {
				clickitem = "control";
			}

			var clientXY = this._getClientXY(canvasX, canvasY);
			this.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this, clickitem);
		}
	};

	_pGridTree._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridTree._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};

	_pGridTree._common_fire_lbuttondown = function (canvasX, canvasY) {
		if (this._btn_elem && this._grid.treeusebutton != "noclick") {
			if (this._is_elem_area(this._btn_elem, canvasX, canvasY)) {
				if (this._isEditTypeTree()) {
					var grid = this._grid;
					var cellobj = this._cellobj;
					var datarow = grid._getDataRow(cellobj._rowidx);
					cellobj._tree_lbuttondown = true;

					grid._toggleTreeState(cellobj._rowidx, true);

					if (this._is_alive) {
						cellobj._tree_lbuttondown = false;
					}

					var rowstatus = grid._treeStates[datarow];

					if (this._clicktarget != rowstatus && (nexacro.Browser == "Edge" || nexacro.Browser == "IE" && nexacro.BrowserVersion > 8)) {
						grid._treetarget = {
							row : datarow, 
							cell : cellobj._cellidx
						};
					}
				}
			}
		}
	};

	_pGridTree.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);
		if (touchinfo) {
			this._common_fire_lbuttondown(touchinfo.canvasX, touchinfo.canvasY);
		}
	};

	_pGridTree.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		this._common_fire_lbuttondown(canvasX, canvasY);
	};

	_pGridTree._common_fire_lbuttonup = function () {
		if (this._cellobj._tree_lbuttondown) {
			this._cellobj._tree_lbuttondown = false;
		}
	};

	_pGridTree.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		this._common_fire_lbuttonup();
	};

	_pGridTree.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		this._common_fire_lbuttonup();
	};

	_pGridTree._on_treecheckboxclick = function (obj, e) {
		if (!this._is_alive) {
			return;
		}

		var grid = this._grid;
		if (obj == this._chk_ctrl) {
			var cellobj = this._cellobj;
			var cellinfo = this._cellinfo;
			var rowidx = grid._getDataRow(cellobj._rowidx);
			var disprowidx = cellobj._getDisplayRowIdx();

			if (cellinfo.treecheck._bindtype == 1) {
				var checked = grid._treeChecked[rowidx];
				var colid = cellinfo.treecheck._bindexpr;
				var v = (checked == 0) ? 1 : 0;
				grid._binddataset.setColumn(rowidx, colid, v);
			}
			else {
				if (grid._toggleTreeChecked(rowidx)) {
					grid._refreshBodyRow(disprowidx);
				}
			}
		}
	};

	_pGridTree.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem) {
		return this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem);
	};

	_pGridTree.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem) {
		var obj = from_refer_comp;
		while (obj) {
			if (obj._type_name == "CheckBoxControl") {
				break;
			}

			obj = obj.parent;
		}

		if (this._isEditTypeTree()) {
			this._on_treecheckboxclick(obj);
		}

		var grid = this._grid;
		var cellinfo = this._cellinfo;
		var rowidx = grid._getDataRow(this._cellobj._rowidx);

		if (!this._is_alive) {
			return;
		}

		return this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, clickitem);
	};

	_pGridTree._isEditTypeTree = function () {
		var grid = this._grid;
		var cellobj = this._cellobj;
		var cellinfo = this._cellinfo;

		var datarow = grid._getDataRow(cellobj._rowidx);
		var editType = cellinfo._getEdittype(datarow);

		if (editType == "tree") {
			return true;
		}
		else {
			return false;
		}
	};

	_pGridTree._is_elem_area = function (elem, point_x, point_y) {
		var scale = this._getCumulativeZoomFactor() / 100.0;

		var left = elem.left;
		var top = elem.top;
		var width = elem.width * scale;
		var height = elem.height * scale;

		if (point_x >= left && point_x <= (left + width)) {
			if (point_y >= top && point_y <= (top + height)) {
				return true;
			}
			else {
				return false;
			}
		}
		else {
			return false;
		}
	};

	_pGridTree._getLineHeight = function () {
		var height = this.parent._adjust_height;
		var bordbottom = (this.parent.currentstyle.border) ? this.parent.currentstyle.border._bottom_width : 0;
		return height - bordbottom;
	};
	_pGridTree._isEnable = function () {
		return this._grid._enable;
	};

	_pGridTree._load_image = function (img_elem, image) {
		var val = (image) ? image.toString() : null;

		if (this.getElement() && val) {
			val = nexacro._getURIValue(val);
			val = nexacro._getImageLocation(val, this._getRefFormBaseUrl());
			img_elem._load_url = val;

			var size = nexacro._getImageSize(val, this._on_loadImage, this, undefined, image.toString());

			if (size) {
				this._on_loadImage(val, size.width, size.height);
			}
		}
	};

	_pGridTree._on_loadImage = function (idx, imgW, imgH) {
		var adjust = false;
		if (this._btn_elem && this._btn_elem._load_url == idx) {
			this._btn_elem.setElementImageUrl(idx);
			var width = this._btn_elem.width;
			var height = this._btn_elem.height;
			if (width != imgW || height != imgH) {
				adjust = true;
				this._btn_elem.setElementSize(imgW, imgH);
			}
		}

		if (this._img_elem && this._img_elem._load_url == idx) {
			this._img_elem.setElementImageUrl(idx);
			var width = this._img_elem.width;
			var height = this._img_elem.height;
			if (width != imgW || height != imgH) {
				adjust = true;
				this._img_elem.setElementSize(imgW, imgH);
			}
		}
		if (adjust) {
			this._adjustSubCompAlign(this._lvl);
		}
	};

	_pGridTree._buttonUpdate = function (state) {
		if (this._grid.treeusebutton != this._treeusebutton) {
			if (this._grid.treeusebutton == "use") {
				this._btn_elem.setElementVisible(true);
			}
			else {
				this._btn_elem.setElementVisible(false);
			}

			this._treeusebutton = this._grid.treeusebutton;
		}

		var prop = "tree";
		var pseudo = "normal";

		if (state == 0) {
			prop += "openbuttonimage";
		}
		else if (state == 1) {
			prop += "closebuttonimage";
		}
		else if (state == 2 || state == 3 || state == -1) {
			this._btn_elem.setElementVisible(false);
			this._btn_elem.setElementSize(0, 0);
			return;
		}

		var grid = this._grid;
		var datarow = grid._getDataRow(this._cellobj._rowidx);

		var val = this._cellinfo._query_pseudo_treecontrol(datarow, prop, pseudo);

		this._load_image(this._btn_elem, val);
	};

	_pGridTree._checkUpdate = function (check) {
		if (this._grid.treeusecheckbox != this._treeusecheckbox) {
			if (this._chk_ctrl) {
				this._chk_ctrl.set_visible(this._grid.treeusecheckbox);
			}

			this._treeusecheckbox = this._grid.treeusecheckbox;
		}

		if (this._chk_ctrl) {
			this._chk_ctrl.set_value(check);
		}
	};

	_pGridTree._imageUpdate = function (state) {
		if (this._grid.treeuseimage != this._treeuseimage) {
			if (this._img_elem) {
				this._img_elem.setElementVisible(this._grid.treeuseimage);
			}

			this._treeuseimage = this._grid.treeuseimage;
		}

		var prop;
		var pseudo = "normal";

		if (state == 0) {
			prop = "treecollapseimage";
		}
		else if (state == 1) {
			prop = "treeexpandimage";
		}
		else if (state == 2 || state == 3) {
			prop = "treeitemimage";
		}

		var grid = this._grid;
		var datarow = grid._getDataRow(this._cellobj._rowidx);
		var val = this._cellinfo._query_pseudo_treecontrol(datarow, prop, pseudo);
		this._load_image(this._img_elem, val);

		if (val) {
			this._img_elem.setElementVisible(this._grid.treeuseimage);
		}
		else {
			this._img_elem.setElementVisible(false);
		}

		this._adjustSubCompAlign(this._lvl);
	};

	_pGridTree._lineUpdate = function (rowidx, level) {
		if (this._grid.treeuseline != this._treeuseline) {
			if (this._rightline_ctrl) {
				this._rightline_ctrl.set_visible(this._grid.treeuseline);
			}
			if (this._upline_ctrl) {
				this._upline_ctrl.set_visible(this._grid.treeuseline);
			}
			if (this._downline_ctrl) {
				this._downline_ctrl.set_visible(this._grid.treeuseline);
			}
			this._treeuseline = this._grid.treeuseline;
		}

		var grid = this._grid;
		var linetype = grid._find_pseudo_obj("treelinetype", grid._pseudo, "line");

		if (!linetype) {
			return;
		}

		var startlevel = this._cellinfo._getTreeStartLevel(rowidx);
		var nextlevel = this._cellinfo._getTreeLevel(rowidx + 1);
		var bExistParentNode = grid._getParentNodeSameInfo(level - 1, rowidx);
		var bExistNextNode = grid._getParentNodeSameInfo(level, rowidx);
		var bRootNode = (startlevel >= level) ? true : false;

		this._createLeftLine(rowidx, linetype);
		var ctrl;

		if (this._rightline_ctrl) {
			ctrl = this._rightline_ctrl;
			ctrl._set_line(linetype, false, true);
		}
		if (this._upline_ctrl) {
			ctrl = this._upline_ctrl;
			ctrl._set_line(linetype, !bRootNode, false);
		}

		if (this._downline_ctrl && !bRootNode && bExistNextNode) {
			ctrl = this._downline_ctrl;
			ctrl._set_line(linetype, true, false);
		}
		else if (this._downline_ctrl) {
			this._downline_ctrl.set_visible(false);
		}

		this._linetype = linetype;
	};

	_pGridTree._createLeftLine = function (rowidx, linetype) {
		for (var i = 0; i < this._leftline_ctrls.length; i++) {
			this._leftline_ctrls[i].destroy();
		}
		this._leftline_ctrls = [];

		if (!this._grid.treeuseline) {
			return;
		}

		var level = this._cellinfo._getTreeLevel(rowidx);
		var startlevel = this._cellinfo._getTreeStartLevel(rowidx);
		var parentlevel = level - 1;
		var bExistParentNode = this._grid._getParentNodeSameInfo(parentlevel, rowidx);

		while (this._grid._rootlevel < parentlevel) {
			if (bExistParentNode) {
				var parentheight = this._getLineHeight();
				var ctrl = new nexacro.GridControlLine("controlleftline", 0, 0, 1, parentheight, this.parent);
				ctrl._depth = parentlevel;
				ctrl._is_subcontrol = true;
				ctrl.createComponent(true);

				ctrl._set_line(linetype, true, false);
				ctrl.on_created();

				this._leftline_ctrls.push(ctrl);
			}
			parentlevel--;
			bExistParentNode = this._grid._getParentNodeSameInfo(parentlevel, rowidx);
		}
	};

	_pGridTree._toggleItem = function (bHide) {
		if (bHide) {
			if (this._btn_elem) {
				this._btn_elem.setElementVisible(false);
			}


			if (this._rightline_ctrl) {
				this._rightline_ctrl.set_visible(false);
			}
			if (this._upline_ctrl) {
				this._upline_ctrl.set_visible(false);
			}
			if (this._downline_ctrl) {
				this._downline_ctrl.set_visible(false);
			}
			if (this._chk_ctrl) {
				this._chk_ctrl.set_visible(false);
			}
			if (this._img_elem) {
				this._img_elem.setElementVisible(false);
			}
			if (this._text_elem) {
				this._text_elem.setElementVisible(false);
			}
		}
		else {
			if (this._grid.treeusebutton == "use") {
				this._btn_elem.setElementVisible(true);
			}
			else {
				this._btn_elem.setElementVisible(false);
			}


			if (this._rightline_ctrl) {
				this._rightline_ctrl.set_visible(this._grid.treeuseline);
			}
			if (this._upline_ctrl) {
				this._upline_ctrl.set_visible(this._grid.treeuseline);
			}
			if (this._downline_ctrl) {
				this._downline_ctrl.set_visible(this._grid.treeuseline);
			}
			if (this._chk_ctrl) {
				this._chk_ctrl.set_visible(this._grid.treeusecheckbox);
			}
			if (this._img_elem) {
				this._img_elem.setElementVisible(this._grid.treeuseimage);
			}
			if (this._text_elem) {
				this._text_elem.setElementVisible(true);
			}
		}
	};

	_pGridTree.on_apply_prop_tooltip = function () {
		var control_elem = this.getElement();

		var rowidx = this._cellobj._rowidx;
		var datarow = this._grid._getDataRow(rowidx);
		this.tooltiptext = this._cellinfo._getTooltipText(datarow);

		if (control_elem) {
			control_elem.setElementToolTip(this.tooltiptext);
		}
	};

	_pGridTree._updateAll = function () {
		if (!this._is_created) {
			return;
		}

		if (this.getElement()) {
			var grid = this._grid;
			var rowidx = grid._getDataRow(this._cellobj._rowidx);

			if (rowidx == null) {
				this._toggleItem(true);
				return;
			}
			else {
				this._toggleItem(false);
			}

			this.on_apply_pseudo(this._cellobj._pseudo);

			var rowstatus = grid._treeStates[rowidx];
			var level = this._cellinfo._getTreeLevel(rowidx);
			this._lvl = level;

			if (this._btn_elem) {
				this._buttonUpdate(rowstatus);
			}

			this._lineUpdate(rowidx, level);

			if (this._chk_ctrl) {
				this._checkUpdate(grid._treeChecked[rowidx]);
				this._chk_ctrl._control_pseudo = "";
				this._chk_ctrl._contents_pseudo = "";
				this._chk_ctrl.on_apply_pseudo();
			}
			if (this._img_elem) {
				this._imageUpdate(rowstatus);
			}
			if (this._text_elem) {
				var txt = this.parent._getDisplayText();
				if (this._display_text != txt) {
					this._text_elem.setElementText(txt);
					this._display_text = txt;
				}
			}
			this.on_apply_prop_tooltip();
			this._adjustSubCompAlign(level);
		}
	};

	_pGridTree._adjustSubCompAlign = function (level) {
		var cellobj = this.parent;
		var cellinfo = this._cellinfo;
		var grid = cellinfo.grid;
		var rect = this._grid._getAvailableRect(this);
		var width = rect.width;
		var height = rect.height;
		var datarow = grid._getDataRow(cellobj._rowidx);
		var start = cellinfo._getTreeStartLevel(datarow);
		var control_elem = this.getElement();
		var subgap = 6;
		var defaultsize = 9;
		var gap = 16;

		level -= start;


		if (level < 0) {
			level = -1;
		}

		var line_adjust_top = cellobj._adjust_top;
		var padding = cellobj.on_find_CurrentStyle_padding();
		var line_adjust_left = ((padding) ? padding.left : 0);
		var parentheight = this._getLineHeight();
		var offset = (level * gap) + defaultsize;
		var lineleft = offset;
		var linetop = line_adjust_top;
		var linewidth = 0;
		var halfheight = Math.round(parentheight / 2);
		var lineheight = halfheight;
		var parentlevel = level - 1;
		var left_lines = this._leftline_ctrls;
		var left_lines_len = left_lines.length;
		var j = 0;

		for (var i = 0; j < left_lines_len; i++) {
			if (parentlevel == left_lines[j]._depth) {
				var elem = left_lines[j++].getElement();
				elem.setElementPosition(offset - (gap * (i + 1)) + line_adjust_left, linetop);
			}
			if (parentlevel-- < 0) {
				break;
			}
		}

		var line_button_gap_width = 0;
		var line_button_gap_height = 0;

		if (this._btn_elem) {
			var buttonWidth = this._btn_elem.width;

			if (buttonWidth <= 0) {
				buttonWidth = defaultsize;
			}

			var buttonHeight = this._btn_elem.height;

			if (buttonHeight <= 0) {
				buttonHeight = defaultsize;
			}

			var buttonLeft = offset - Math.round(buttonWidth / 2);
			if (!this._rightline_ctrl.visible) {
				buttonLeft -= (Math.round(buttonWidth / 2) * level);
			}
			var buttonTop = Math.round((height - buttonHeight) / 2);
			var buttonRight = buttonLeft + buttonWidth;
			var buttonBottom = buttonTop + buttonHeight;


			if (this._btn_elem.visible) {
				lineheight = Math.floor((parentheight - buttonHeight) / 2);
				line_button_gap_width = buttonWidth;
				line_button_gap_height = buttonHeight;
			}

			linewidth = buttonWidth;
			this._btn_elem.setElementPosition(buttonLeft, buttonTop);
			offset = buttonLeft + buttonWidth;
		}
		else {
			linewidth = defaultsize;
		}


		if (this._rightline_ctrl && this._rightline_ctrl.visible) {
			this._rightline_ctrl.move(lineleft + line_adjust_left + Math.round(line_button_gap_width / 2), linetop, linewidth - (line_button_gap_width / 2), halfheight);
			offset = this._rightline_ctrl.left + this._rightline_ctrl.width;
		}
		else {
			offset += 1;
		}

		if (this._upline_ctrl && this._upline_ctrl.visible) {
			this._upline_ctrl.move(lineleft + line_adjust_left, linetop, linewidth, lineheight);
		}

		if (this._downline_ctrl && this._downline_ctrl.visible) {
			var elem = this._downline_ctrl.getElement();
			linetop = line_adjust_top + lineheight + line_button_gap_width;

			var b = lineheight + linetop;
			var pb = parentheight + line_adjust_top;

			if (b > pb) {
				lineheight = pb - linetop;
			}

			this._downline_ctrl.move(lineleft + line_adjust_left, linetop, linewidth, lineheight);
		}

		if (this._chk_ctrl && this._chk_ctrl.visible) {
			var checkWidth = this._chk_ctrl.width;
			if (checkWidth <= 0) {
				checkWidth = defaultsize;
			}

			var checkHeight = this._chk_ctrl.height;
			if (checkHeight <= 0) {
				checkHeight = defaultsize;
			}

			var checkLeft = offset;
			var checkTop = Math.round((height - checkHeight) / 2);

			offset += checkWidth;
			this._chk_ctrl.move(checkLeft, checkTop, this._chk_ctrl._adjust_width, this._chk_ctrl._adjust_height);
		}

		if (this._img_elem && this._img_elem.visible) {
			offset += 1;

			var imageWidth = this._img_elem.width;
			var imageHeight = this._img_elem.height;
			if (imageWidth > 0 && imageHeight > 0) {
				var imageLeft = offset;
				var imageTop = Math.round((height - imageHeight) / 2);
				var imageRight = imageLeft + imageWidth;
				var imageBottom = imageTop + imageHeight;

				offset += imageWidth;
			}
			else {
			}

			this._img_elem.setElementPosition(imageLeft, imageTop);

			offset += 5;
		}
		else {
			offset += 4;
		}

		if (this._text_elem) {
			var textLeft = offset;
			var textTop = 0;

			this._text_elem.setElementPosition(textLeft, textTop);
			this._text_elem.setElementSize(width - offset, height);
		}
	};

	_pGridTree.on_change_containerRect = function (width, height) {
		if (this._lvl) {
			this._adjustSubCompAlign(this._lvl);
		}
	};

	delete _pGridTree;

	nexacro.GridRow_Style = function (target, idx) {
		nexacro.Style.call(this, target, idx);
		this.border = new nexacro.Style_border(1);
	};

	var _pGridRowStyle = nexacro.GridRow_Style.prototype = nexacro._createPrototype(nexacro.Style, nexacro.GridRow_Style);
	_pGridRowStyle._type_name = "GridRowStyle";

	nexacro.GridRow_CurrentStyle = function () {
		this.border = null;
	};

	var _pGridRowCurrentStyle = nexacro.GridRow_CurrentStyle.prototype = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.GridRow_CurrentStyle);

	_pGridRowCurrentStyle._type_name = "GridRowCurrentStyle";

	delete _pGridRowStyle;
	delete _pGridRowCurrentStyle;

	nexacro.GridRow = function (parent, left, top, width, height, rowidx) {
		nexacro.Component.call(this, "gridrow_" + rowidx, "absolute", left, top, width, height, null, null, parent);

		this._is_subcontrol = true;


		this._grid = parent.parent;
		this._band = parent;
		this._cells = [];
		this._rowidx = rowidx;
		this._row_sizes = [];
		this._row_tops = [];
		this._row_bottoms = [];
		this._format_rows = [];
		this._format_cols = [];
		this._format_cells = [];
		this._noupdate_remain_cells = [];
		this._accessibility_role = "none";
		this._fixed = false;
	};
	var _pGridRow = nexacro._createPrototype(nexacro.Component, nexacro.GridRow);
	nexacro.GridRow.prototype = _pGridRow;
	nexacro._setForControlStyleFinder(_pGridRow);

	_pGridRow._type_name = "GridRow";

	_pGridRow.on_create_custom_style = function () {
		return new nexacro.GridRow_Style(this);
	};

	_pGridRow.on_create_custom_currentStyle = function () {
		return new nexacro.GridRow_CurrentStyle();
	};


	_pGridRow.on_find_CurrentStyle_cursor = function (pseudo) {
		var grid = this._grid;
		if (grid._global_cursor) {
			return grid._global_cursor;
		}

		return this.parent.on_find_CurrentStyle_cursor(pseudo);
	};

	_pGridRow.on_find_CurrentStyle_border = function (pseudo) {
		return null;
	};

	_pGridRow.on_find_CurrentStyle_padding = function (pseudo) {
		return null;
	};

	_pGridRow._makeCssRefInfo = function () {
		return (this._grid._makeCssRefInfoCtrl(this));
	};

	_pGridRow.on_create_contents = function () {
		this._init(this._grid._curFormat);

		if (this._grid._async_create) {
			this._createCellComponents_async();
		}
		else {
			this._createCellComponents();
		}
	};

	_pGridRow.on_created_contents = function () {
		this._control_element.setElementHScrollPos(this._grid.getElement().scroll_left);

		if (this._grid._async_create) {
			this._createCellElements_async();
		}
		else {
			this._createCellElements();
		}

		this._control_element._setContainerMaxWidth(this._grid._bodyBand._scrollWidth);
	};

	_pGridRow.on_destroy_contents = function () {
		var cells = this._cells, cells_len = cells.length;

		for (var i = 0; i < cells_len; i++) {
			cells[i].destroy();
		}

		this._grid = this._cells = this._format = this._band = this._cells = this._row_sizes = this._row_tops = this._row_bottoms = this._format_rows = this._format_cols = this._format_cells = this._noupdate_remain_cells = null;
	};

	_pGridRow.on_create_control_element = function (parent_elem) {
		var control_elem = new nexacro.GridRowControlElement(parent_elem);
		var format = this._grid._curFormat;

		control_elem.setLinkedControl(this);
		control_elem._left_width = format.leftWidth;
		control_elem._right_width = format.rightWidth;
		this._control_element = control_elem;
		return control_elem;
	};

	_pGridRow._getAccessibilityLabel = function (accessibility) {
		var label = "";
		var grid = this._grid;
		if (this._grid._isSelectRowType()) {
			var cellLabel = "";
			var cells = this._cells;
			var cellAccessibility = null;
			for (var i = 0; i < cells.length; i++) {
				cellAccessibility = cells[i].currentstyle.accessibility;
				if (cellAccessibility) {
					cellLabel = cells[i]._getAccessibilityLabel(cellAccessibility, true);
					if (label) {
						if (cellLabel) {
							label += " " + cellLabel;
						}
					}
					else {
						label = cellLabel;
					}
				}
			}
		}
		return label;
	};

	_pGridRow.on_apply_prop_rtldirection = function () {
		nexacro.Component.prototype.on_apply_prop_rtldirection.call(this);
		var cells = this._cells;
		var _rtldirection = this._rtldirection;

		if (cells) {
			var left;
			for (var i = 0; i < cells.length; i++) {
				cells[i]._setRtlDirection(_rtldirection);
			}
		}
	};

	_pGridRow._init = function (format) {
		var grid = this._grid, control_elem = this._control_element;

		control_elem.setArea(format.leftWidth, format.rightWidth);

		if (this._rowidx == -1) {
			this._format_rows = format._headrows;
			this._format_cells = format._headcells;
		}
		else if (this._rowidx == -2) {
			this._format_rows = format._summrows;
			this._format_cells = format._summcells;
		}
		else {
			this._format_rows = format._bodyrows;
			this._format_cells = format._bodycells;
		}

		this._format_cols = format._cols;

		if (!this._format_cols) {
			this._format_cols = [];
		}

		if (!this._format_rows) {
			this._format_rows = [];
		}

		if (!this._format_cells) {
			this._format_cells = [];
		}

		var rowSizeListSub, datarow = 0;

		if (this._rowidx == -1) {
			rowSizeListSub = grid._rowHeadListSub;
		}
		else if (this._rowidx == -2) {
			rowSizeListSub = grid._rowSummListSub;
		}
		else {
			datarow = grid._getDataRow(this._rowidx);
			rowSizeListSub = grid._rowSizeListSub;
		}

		var rows = this._format_rows, rows_len = rows.length, size = 0, top = 0;

		this._row_tops = [];
		this._row_sizes = [];
		this._row_bottoms = [];

		if (datarow >= 0) {
			var start = datarow * rows_len;

			for (var i = 0; i < rows_len; i++) {
				this._row_tops.push(top);
				size = rowSizeListSub[start + i];
				this._row_sizes.push(size);
				top += size;
				this._row_bottoms.push(top);
			}
		}
		else {
			for (var i = 0; i < rows_len; i++) {
				this._row_tops.push(top);
				size = rows[i].size;
				this._row_sizes.push(size);
				top += size;
				this._row_bottoms.push(top);
			}
		}
	};

	_pGridRow._on_last_lbuttonup = function () {
		this.parent._on_last_lbuttonup();
	};

	_pGridRow._on_last_keyup = function () {
		this.parent._on_last_keyup();
	};

	_pGridRow._updateAll = function (pseudo, is_remain_cell, onlycontents, for_select, startcol) {
		var grid = this._grid, cells = this._cells;

		if (is_remain_cell) {
			cells = this._noupdate_remain_cells;
		}

		var cells_len = cells.length, datarow = grid._getDataRow(this._rowidx), subcells, subcellsLen, cell, cellinfo, selected, is_change;

		this._noupdate_remain_cells = [];
		this.on_apply_pseudo(pseudo);

		for (var i = 0; i < cells_len; i++) {
			cell = cells[i];
			cellinfo = cell._refobj;

			if (startcol) {
				if ((cellinfo._col + cellinfo._colspan - 1) < startcol) {
					continue;
				}
			}

			if (cell._refobj._area != "body" || (cell._is_created && cell._isUpdateArea())) {
				if (grid._isSelectRowType()) {
					if (selected == undefined) {
						selected = grid._isSelectedCell(cell._cellidx, datarow);
					}
				}
				else {
					selected = grid._isSelectedCell(cell._cellidx, datarow);
				}

				is_change = false;
				if (cell._selected != selected) {
					cell._selected = selected;
					onlycontents = false;
					is_change = true;
				}
				subcells = cell.subcells;
				subcellsLen = subcells.length;

				for (var j = 0; j < subcellsLen; j++) {
					subcells[j]._selected = selected;
				}

				if (for_select) {
					if (is_change) {
						cell._updateAll(pseudo, onlycontents);
					}
				}
				else {
					cell._updateAll(pseudo, onlycontents);
				}
			}
			else {
				this._noupdate_remain_cells.push(cell);
			}
		}
	};

	_pGridRow._getAreaRect = function (area) {
		var rect = {
			left : 0, 
			top : 0, 
			width : 0, 
			height : 0
		}, format = this._grid._curFormat;

		rect.top = this._client_top;
		rect.height = this._client_height;

		if (area == "left") {
			rect.left = this._client_left;
			rect.width = format.leftWidth;
		}
		else if (area == "right") {
			rect.left = this._client_width - format.rightWidth;
			rect.width = format.rightWidth;
		}
		else {
			rect.left = format.leftWidth;
			rect.width = this._client_width - format.leftWidth - format.rightWidth;
		}
		return rect;
	};

	_pGridRow._changeRow = function (row, init) {
		this._rowidx = row;

		if (init) {
			this._init(this._grid._curFormat);
		}
	};

	_pGridRow._hideArea = function () {
		if (this._fixed) {
			return "";
		}

		var band = this._band;
		var grid = this._grid;
		var scrolltop = grid._getScrollTop();

		var t = this._adjust_top;
		var h = this._adjust_height;
		var b = t + h;

		t -= scrolltop;
		b -= scrolltop;

		var bandrc = grid._getAvailableRect(band);
		var border = band.currentstyle.border;

		b -= border ? border._top_width : 0;
		b -= border ? border._bottom_width : 0;

		if (b <= 0) {
			return "top";
		}
		else if (t >= bandrc.bottom) {
			return "bottom";
		}

		return "";
	};

	_pGridRow._showfull = function (clickcell) {
		if (!this._fixed) {
			var band = this._band;
			var grid = this._grid;
			var scrolltop = grid._getScrollTop();

			var t = this._adjust_top;
			var h = this._adjust_height;
			var b = t + h;

			t -= scrolltop;
			b -= scrolltop;

			var vscroll = grid.vscrollbar;
			var bandrc = grid._getAvailableRect(band);
			var border = band.currentstyle.border;

			b -= border ? border._top_width : 0;
			b -= border ? border._bottom_width : 0;

			if (vscroll) {
				if (h < bandrc.height) {
					if (t < 0) {
						if (vscroll._isEnable()) {
							vscroll._set_rowpos(grid._toprowpos[0]);
						}
					}
					else if (b > bandrc.bottom) {
						if (vscroll._isEnable()) {
							vscroll._set_rowpos(grid._toprowpos[0] + 1);
						}
					}
				}
			}
		}

		if (clickcell && clickcell._is_alive) {
			clickcell._showfull(false);
		}
	};

	_pGridRow._createCellElements_async = function () {
		nexacro.OnceCallbackTimer.callonce(this, function () {
			this._createCellElements();
		});
	};

	_pGridRow._createCellElements = function (startcol) {
		var cells = this._cells;
		var cells_len = cells.length;

		if (cells_len == 0) {
			return;
		}

		var grid = this._grid, subcells, subcells_len, update = false, datarow = grid._getDataRow(this._rowidx), selected, cell_elem, cellinfo;

		if (this._rowidx < 0 || grid._is_created == true) {
			update = true;
		}

		for (var i = 0; i < cells_len; i++) {
			cellinfo = cells[i]._refobj;

			if (startcol) {
				if ((cellinfo._col + cellinfo._colspan - 1) < startcol) {
					continue;
				}
			}

			if (cellinfo._area == "body") {
				if (grid._isSelectRowType()) {
					if (selected == undefined) {
						selected = grid._isSelectedCell(cells[i]._cellidx, datarow);
					}
				}
				else {
					selected = grid._isSelectedCell(cells[i]._cellidx, datarow);
				}

				cell_elem = cells[i]._control_element;

				if (cells[i]._isUpdateArea()) {
					if (cells[i]._is_created) {
						if (cells[i]._refresh_display == true) {
							if (update) {
								cells[i]._selected = selected;
								cells[i]._updateAll();
							}

							cell_elem._setDisplay(true);
							cells[i]._refresh_display = false;
						}
					}
					else {
						if (update) {
							cells[i]._selected = selected;
							cells[i]._updateAll();
						}
						cells[i].on_created();

						subcells = cells[i].subcells;
						subcells_len = subcells.length;

						for (var j = 0; j < subcells_len; j++) {
							if (update) {
								subcells[j]._updateAll();
							}

							subcells[j].on_created();
						}
					}
				}
				else {
					if (cells[i]._is_created) {
						if (cells[i]._refresh_display == false) {
							cells[i]._refresh_display = true;
							cell_elem._setDisplay(false);
						}
					}
				}
			}
			else {
				if (cells[i]._is_created) {
					continue;
				}

				if (update) {
					cells[i]._updateAll();
				}

				cells[i].on_created();

				subcells = cells[i].subcells;
				subcells_len = subcells.length;

				for (var j = 0; j < subcells_len; j++) {
					if (update) {
						subcells[j]._updateAll();
					}

					subcells[j].on_created();
				}
			}
		}
	};

	_pGridRow._createCellComponents_async = function () {
		nexacro.OnceCallbackTimer.callonce(this, function () {
			this._createCellComponents();
		});
	};

	_pGridRow._createCellComponents = function () {
		var _cols = this._format_cols, _rows = this._format_rows, _cells = this._format_cells, _row_tops = this._row_tops, _row_sizes = this._row_sizes, _row_bottoms = this._row_bottoms, cellcnt = (_cells) ? _cells.length : 0, _cellinfo, top = 0, left, width, height, cellitem, id, _subcells, _subcellsLen, _subcell, col, row, subcellitem, selected, _subcellinfo, grid = this._grid, datarow = grid._getDataRow(this._rowidx);

		for (var i = 0; i < cellcnt; i++) {
			_cellinfo = _cells[i];

			left = _cols[_cellinfo._col].left;
			top = _row_tops[_cellinfo._row];
			width = _cols[_cellinfo._col + _cellinfo._colspan - 1].right - left;
			height = _row_bottoms[_cellinfo._row + _cellinfo._rowspan - 1] - top;

			if (grid._isSelectRowType()) {
				if (selected == undefined) {
					selected = grid._isSelectedCell(_cellinfo._cellidx, datarow);
				}
			}
			else {
				selected = grid._isSelectedCell(_cellinfo._cellidx, datarow);
			}

			id = "cell_" + this._rowidx + "_" + _cellinfo._cellidx;
			cellitem = new nexacro.GridCell(id, left, top, width, height, this, _cellinfo, this._rowidx, _cellinfo._cellidx);
			cellitem._selected = selected;
			cellitem.createComponent(true);

			this._cells[i] = cellitem;

			_subcells = _cellinfo._subcells;
			_subcellsLen = _subcells.length;

			for (var j = 0; j < _subcellsLen; j++) {
				_subcellinfo = _subcells[j];
				col = _cellinfo._col + _subcellinfo._col;
				row = _cellinfo._row + _subcellinfo._row;

				left = _cols[col].left;
				top = _row_tops[row];
				width = _cols[col + _subcellinfo._colspan - 1].right - left;
				height = _row_sizes[row];

				left -= _cols[_cellinfo._col].left;
				top -= _row_tops[_cellinfo._row];
				id = "subcell_" + this._rowidx + "_" + _cellinfo._cellidx + "_" + _subcellinfo._cellidx;
				subcellitem = new nexacro.GridCell(id, left, top, width, height, cellitem, _subcellinfo, this._rowidx, _subcellinfo._cellidx);
				subcellitem._isSubCell = true;
				subcellitem._selected = selected;
				subcellitem.parentcell = cellitem;
				subcellitem.createComponent(true);
				cellitem.subcells[j] = subcellitem;
			}
		}
	};

	_pGridRow._resetCellsSize = function (format, startcol) {
		var cols = this._format_cols, cells, cells_len, cell, cellinfo, subcells, subcells_len, subcell, subcellinfo, left, width, top, height, subcol, subrow;

		this._control_element.setArea(format.leftWidth, format.rightWidth);

		cells = this._cells;
		cells_len = cells.length;

		var _row_tops = this._row_tops, _row_sizes = this._row_sizes, _row_bottoms = this._row_bottoms;

		for (var i = 0; i < cells_len; i++) {
			cell = cells[i];
			cellinfo = cell._refobj;

			if (startcol) {
				if ((cellinfo._col + cellinfo._colspan - 1) < startcol) {
					continue;
				}
			}

			left = cols[cellinfo._col].left;
			top = _row_tops[cellinfo._row];
			width = cols[cellinfo._col + cellinfo._colspan - 1].right - left;
			height = _row_bottoms[cellinfo._row + cellinfo._rowspan - 1] - top;

			cell.move(left, top, width, height);
			expand_ctrl = cell._expandCtrl;
			if (expand_ctrl) {
				left = width - expand_ctrl.width;
				top = expand_ctrl.top;
				width = expand_ctrl.width;
				height = expand_ctrl.height;

				expand_ctrl.move(left, top, width, height);
			}

			subcells = cell.subcells;
			subcells_len = subcells.length;

			for (var j = 0; j < subcells_len; j++) {
				subcell = subcells[j];
				subcellinfo = subcell._refobj;

				subcol = cellinfo._col + subcellinfo._col;
				subrow = cellinfo._row + subcellinfo._row;

				left = cols[subcol].left;
				top = _row_tops[subrow];
				width = cols[subcol + subcellinfo._colspan - 1].right - left;
				height = _row_sizes[subrow];

				left -= cols[cellinfo._col].left;
				top -= _row_tops[cellinfo._row];

				subcell.move(left, top, width, height);
				expand_ctrl = subcell._expandCtrl;
				if (expand_ctrl) {
					left = width - expand_ctrl.width;
					top = expand_ctrl.top;
					width = expand_ctrl.width;
					height = expand_ctrl.height;

					expand_ctrl.move(left, top, width, height);
				}
			}
		}
	};

	_pGridRow._isEnable = function () {
		return this._grid._enable;
	};

	_pGridRow._get_cells = function () {
		return this._cells;
	};

	delete _pGridRow;

	nexacro.GridMatrixManager = function (grid, band) {
		this._width = 0;
		this._height = 0;
		this._grid = grid;
		this._isBody = band._isBody;
		this._rows = [];
		this._band = band;
		this._fixed_rows = [];
		this._allrows = [];
	};

	var _pGridMatrixManager = nexacro._createPrototype(nexacro.Object, nexacro.GridMatrixManager);
	nexacro.GridMatrixManager.prototype = _pGridMatrixManager;

	_pGridMatrixManager._type_name = "GridMatrixManager";

	_pGridMatrixManager.destroy = function () {
		this._deleteAllRow();
		this._grid = this._band = this._rows = this._fixed_rows = this._allrows = null;
	};

	_pGridMatrixManager._init = function () {
		this._deleteAllRow();
	};

	_pGridMatrixManager._async_create_page = function () {
		return;
		if (this._isBody) {
			nexacro.OnceCallbackTimer.callonce(this._band, function () {
				this._matrix._adjustRowsDisplay();
			}, 10);
		}
	};

	_pGridMatrixManager._getBodyRowTopPos = function (rowidx) {
		if (rowidx < 0) {
			return 0;
		}

		var grid = this._grid, top = 0;

		if (grid._fixed_endrow >= 0 && rowidx >= grid._fixed_startrow && rowidx <= grid._fixed_endrow) {
			if (grid._is_variable_bodyrowsize == false) {
				top = grid._bodyrowheight * (rowidx - grid._fixed_startrow);
			}
			else {
				var rowcnt = grid._fixed_rowcnt;

				for (var i = 0; i < rowcnt; i++) {
					if (grid._fixed_startrow + i == rowidx) {
						break;
					}

					top += grid._getRowSize(grid._fixed_startrow + i);
				}
			}
		}
		else {
			if (grid._is_variable_bodyrowsize == false) {
				top = grid._bodyrowheight * rowidx;
			}
			else {
				var rowcnt = grid._getGridRowCount();

				for (var i = 0; i < rowcnt; i++) {
					if (i == rowidx) {
						break;
					}

					top += grid._getRowSize(i);
				}
			}

			top -= grid._fixedrow_height;
		}
		return top;
	};

	_pGridMatrixManager._getAllRows = function () {
		var rows;

		if (this._isBody) {
			rows = this._allrows;

			if (rows.length == 0) {
				rows = rows.concat(this._fixed_rows);
				rows = rows.concat(this._rows);
			}
		}
		else {
			rows = this._rows;
		}
		return rows;
	};

	_pGridMatrixManager._getPhysicalRow = function (rows, rowidx) {
		var length = rows.length;

		for (var i = 0; i < length; i++) {
			if (rows[i]._rowidx == rowidx) {
				return i;
			}
		}
		return null;
	};

	_pGridMatrixManager._adjustTreeDisplay = function (rowidx, collapse) {
		var update_rows = [], grid = this._grid, band = this._band, rows = this._rows, rows_len = rows.length, toprow = 0, update_row_phidx = this._getPhysicalRow(this._rows, rowidx), update_row = rows[update_row_phidx], sub = false;

		if (!update_row) {
			update_row = rows[0];
			update_row_phidx = 0;
		}

		if (update_row) {
			if (collapse) {
				for (var i = rows_len - 1; i >= update_row_phidx; i--) {
					if (update_row._rowidx < rows[i]._rowidx) {
						this._subtractRow();
						sub = true;
					}
					else {
						update_rows[0] = rows[i];
					}
				}
			}
			else {
				for (var i = update_row_phidx; i < rows_len; i++) {
					if (update_row_phidx == i) {
						update_rows[0] = rows[i];
					}
					else {
						this._subtractRow();
						sub = true;
					}
				}
			}
		}

		if (sub) {
			grid._setHscrollElement();
			grid._absolutelyResetScrollPos(true);
			grid._control_element.setElementHScrollPos(grid._scroll_left);
			grid._absolutelyResetScrollPos(false);
		}

		var add = this._adjustRowsDisplay();

		rows_len = rows.length;
		band._update_rows = update_rows;

		if (rows_len) {
			toprow = rows[0]._rowidx;
		}

		for (var i = 0; i < rows_len; i++) {
			rows[i]._rowidx = toprow + i;
		}

		band._on_refresh_rows();

		if (add || grid._resetColSizeList()) {
			this._adjustColsDisplay(true);
		}
		else {
			grid._resetScrollMax();
		}
	};

	_pGridMatrixManager._adjustRowsDisplay = function (reset_bandsize, is_scrolling) {
		var grid = this._grid, cnt = 0, add = false, sub = false, rows = this._rows, rows_len = rows.length, addcnt;

		if (reset_bandsize) {
			var rowitem, l, t, w, h, gridrowcnt = grid._getGridRowCount();
			for (var i = 0; i < rows.length; i++) {
				rowitem = rows[i];

				if (rowitem._rowidx >= gridrowcnt) {
					rowitem.destroy();
					rows[i] = null;
					rows.splice(i, 1);
					i--;
				}
				else {
					l = rowitem._adjust_left;
					t = this._getBodyRowTopPos(rowitem._rowidx);
					w = this._band._client_width;
					h = grid._getRowSize(rowitem._rowidx);
					rows[i].move(l, t, w, h);
				}
			}
			rows_len = rows.length;

			var frows = this._fixed_rows;

			for (i = 0; i < frows.length; i++) {
				rowitem = frows[i];
				l = rowitem._adjust_left;
				t = this._getBodyRowTopPos(rowitem._rowidx);
				w = this._band._client_width;
				h = grid._getRowSize(rowitem._rowidx);
				frows[i].move(l, t, w, h);
			}
		}

		if (this._isBody) {
			if (grid._fixed_endrow >= 0 && this._fixed_rows.length == 0) {
				var sfixrow = grid._fixed_startrow;
				var efixrow = grid._fixed_endrow;
				var top = 0, size;

				for (var i = sfixrow; i <= efixrow; i++) {
					size = grid._getRowSize(i);
					if (size < 0) {
						break;
					}

					this._addRow(top, size, i, false, true);
					top += size;
				}
			}


			grid._resetDisplayInfo(1, reset_bandsize);

			if (grid._disprowcnt > 0) {
				addcnt = (grid._disprowcnt % 2) ? 1 : 2;
				cnt = grid._disprowcnt + addcnt;
			}
			var rowcnt = grid._getGridRowCount();
			var variable_size = grid._is_variable_bodyrowsize;

			if (cnt < 0) {
				cnt = 0;
			}

			if (cnt < rows_len) {
				for (var i = rows_len - 1; i >= cnt; i--) {
					if (!variable_size) {
						this._subtractRow();
						sub = true;
					}
				}
			}
			else if (cnt > rows_len) {
				var size = 0, top = 0, toprow = 0, lastrow = rowcnt - 1;

				if (rows_len > 0) {
					toprow = rows[0]._rowidx;
				}
				else {
					toprow = grid._toprowpos[0];
				}

				var backrow = toprow;
				var newrow, back = false;

				for (var i = rows_len; i < cnt; i++) {
					if (rowcnt <= i) {
						break;
					}

					newrow = toprow + i;

					if (lastrow < newrow) {
						newrow = --backrow;
						back = true;
					}

					top = this._getBodyRowTopPos(newrow);
					size = grid._getRowSize(newrow);

					if (newrow <= lastrow && newrow >= grid._getFixRowCnt()) {
						this._addRow(top, size, newrow, is_scrolling);
						add = true;
					}
				}
				if (back && add) {
					rows.sort(function (a, b) {
						return a._rowidx - b._rowidx;
					});
				}
			}

			rows_len = rows.length;

			if (grid.fillareatype != "none" && cnt > rows_len) {
				var top = 0, size = this._band._datarowsheight;

				if (rows_len) {
					top = rows[rows_len - 1]._getPosBottom();
				}

				for (var i = rows_len; i < cnt; i++) {
					this._addRow(top, size, i, is_scrolling);
					top += size;
					add = true;
				}
			}

			if (rows.length > 0) {
				grid._begrowpos = rows[0]._rowidx;
				grid._endrowpos = rows[rows.length - 1]._rowidx;
			}
			else {
				grid._begrowpos = 0;
				grid._endrowpos = 0;
			}
		}
		else {
			if (rows_len == 0) {
				var size;

				if (this._band.id == "head") {
					size = grid._getRowSize(-1);
					this._addRow(0, size, -1);
					add = true;
				}
				else if (this._band.id == "summ") {
					size = grid._getRowSize(-2);
					this._addRow(0, size, -2);
					add = true;
				}
			}
		}

		if (add || sub || rows.length == 0) {
			grid._setHscrollElement();
			grid._absolutelyResetScrollPos(true);
			grid._control_element.setElementHScrollPos(grid._scroll_left);
			grid._absolutelyResetScrollPos(false);
		}

		return add;
	};

	_pGridMatrixManager._adjustColsDisplay = function (reset_colsize, scrolling, startcol) {
		var rows = this._getAllRows(), rows_len = rows.length;

		if (reset_colsize) {
			var format = this._grid._curFormat;

			for (var i = 0; i < rows_len; i++) {
				rows[i]._init(format);
				rows[i]._resetCellsSize(format, startcol);

				if (!scrolling) {
					rows[i]._updateAll(null, true, undefined, undefined, startcol);
				}

				rows[i]._createCellElements(startcol);
			}
		}
		else {
			for (var i = 0; i < rows_len; i++) {
				if (!scrolling) {
					rows[i]._updateAll(null, true, undefined, undefined, startcol);
				}

				rows[i]._createCellElements(startcol);
			}
		}

		if (!scrolling) {
			this._grid._resetScrollMax();
		}
	};

	_pGridMatrixManager._addRow = function (top, height, rowidx, is_scrolling, is_fixed) {
		var rect = this._grid._getAvailableRect(this._band), row = new nexacro.GridRow(this._band, rect.left, top, rect.width, height, rowidx);

		row._fixed = !!is_fixed;
		row.createComponent();

		if (!is_scrolling) {
			this._band._create_rows.push(row);
		}

		if (is_fixed) {
			this._fixed_rows.push(row);
		}
		else {
			this._rows.push(row);
		}
	};

	_pGridMatrixManager._subtractRow = function () {
		if (this._rows.length > 1) {
			var rowidx = this._rows.length - 1, row = this._rows[rowidx], create_rows = this._band._create_rows, create_rows_len = create_rows.length;

			for (var i = 0; i < create_rows_len; i++) {
				if (create_rows[i] == row) {
					create_rows.splice(i, 1);
					break;
				}
			}
			row.destroy();
			this._rows.splice(rowidx, 1);
		}
	};

	_pGridMatrixManager._deleteAllRow = function () {
		var rows = this._rows;

		for (var i = 0; i < rows.length; i++) {
			rows[i].destroy();
		}

		var fixed_rows = this._fixed_rows;

		for (var i = 0; i < fixed_rows.length; i++) {
			fixed_rows[i].destroy();
		}

		this._rows = [];
		this._fixed_rows = [];
		this._allrows = [];
		this._grid._setHscrollElement();
		this._grid._is_over_scroll = 0;
	};

	_pGridMatrixManager._isShowScreenRow = function (row, scroll_top, client_height) {
		if (row._rowidx < 0) {
			return true;
		}

		var visible_top = scroll_top, visible_bottom = visible_top + client_height;

		if (visible_top < row._getPosBottom() && visible_bottom > row._adjust_top) {
			return true;
		}

		return false;
	};

	_pGridMatrixManager._adjustScrollRows = function (vpos, is_updatecontents) {
		var grid = this._grid, totalcnt = grid._getGridRowCount(), rows = this._rows, firstrow, lastrow, first_rowidx = grid._getFixRowCnt(), last_rowidx = totalcnt - 1, bodyHeight = grid._getBodyClientSize()[1], hide_rows = [], hide_row, r, l, w, h, t, band = this._band, variable_size = grid._is_variable_bodyrowsize, hide_len = 0, dir = 0, lastPosition = grid._last_scroll_top;

		if (vpos > lastPosition) {
			dir = 1;
		}
		else if (vpos < lastPosition) {
			dir = -1;
		}

		if (dir > 0) {
			lastrow = rows[rows.length - 1];

			for (var i = 0; i < rows.length; i++) {
				if (this._isShowScreenRow(rows[i], vpos, band._client_height) == true) {
					break;
				}

				hide_rows.push(rows[i]);
			}

			hide_len = hide_rows.length;

			if (hide_len > 0) {
				if (rows.length == hide_len) {
					target_rowidx = grid._toprowpos[0];

					for (var i = 0; i < hide_len; i++) {
						hide_row = hide_rows[i];
						r = target_rowidx++;
						hide_row._changeRow(r, variable_size);
						l = hide_row._adjust_left;
						w = hide_row._adjust_width;
						h = grid._getRowSize(r);
						t = this._getBodyRowTopPos(r);
						hide_row.move(l, t, w, h);

						if (variable_size) {
							hide_row._resetCellsSize(grid._curFormat);
						}
					}
				}
				else {
					target_rowidx = lastrow._rowidx + 1;

					for (var i = 0; i < hide_len; i++) {
						hide_row = hide_rows[i];
						r = target_rowidx++;

						if (!variable_size && r > last_rowidx) {
							break;
						}

						hide_row._changeRow(r, variable_size);
						l = hide_row._adjust_left;
						w = hide_row._adjust_width;
						h = grid._getRowSize(r);
						t = this._getBodyRowTopPos(r);
						hide_row.move(l, t, w, h);


						if (variable_size) {
							hide_row._resetCellsSize(grid._curFormat);
						}
					}
					rows.sort(function (a, b) {
						return a._rowidx - b._rowidx;
					});
				}

				if (rows.length > 0) {
					grid._begrowpos = rows[0]._rowidx;
					grid._endrowpos = rows[rows.length - 1]._rowidx;
				}
			}

			if (variable_size) {
				this._adjustRowsDisplay(false, true);
			}
		}
		else if (dir < 0) {
			if (variable_size) {
				this._adjustRowsDisplay(false, true);
			}

			firstrow = rows[0];

			for (var i = rows.length - 1; i >= 0; i--) {
				if (this._isShowScreenRow(rows[i], vpos, band._client_height) == true) {
					break;
				}

				hide_rows.push(rows[i]);
			}

			hide_len = hide_rows.length;

			if (hide_len > 0) {
				if (rows.length == hide_len) {
					target_rowidx = grid._toprowpos[0];

					for (var i = hide_len - 1; i >= 0; i--) {
						hide_row = hide_rows[i];
						r = target_rowidx++;
						hide_row._changeRow(r, variable_size);
						l = hide_row._adjust_left;
						w = hide_row._adjust_width;
						h = grid._getRowSize(r);
						t = this._getBodyRowTopPos(r);
						hide_row.move(l, t, w, h);

						if (variable_size) {
							hide_row._resetCellsSize(grid._curFormat);
						}
					}
				}
				else {
					target_rowidx = firstrow._rowidx - 1;

					for (var i = 0; i < hide_len; i++) {
						hide_row = hide_rows[i];
						r = target_rowidx--;

						if (r < first_rowidx) {
							break;
						}

						hide_row._changeRow(r, variable_size);
						l = hide_row._adjust_left;
						w = hide_row._adjust_width;
						h = grid._getRowSize(r);
						t = this._getBodyRowTopPos(r);
						hide_row.move(l, t, w, h);

						if (variable_size) {
							hide_row._resetCellsSize(grid._curFormat);
						}
					}
					rows.sort(function (a, b) {
						return a._rowidx - b._rowidx;
					});
				}

				if (rows.length > 0) {
					grid._begrowpos = rows[0]._rowidx;
					grid._endrowpos = rows[rows.length - 1]._rowidx;
				}
			}
		}
		else {
			if (is_updatecontents) {
				var prev_rowidx = null;
				grid._toprowpos = grid._getScreenTopRowPos();
				grid._bottomrowpos = grid._getScreenBottomRowPos();

				target_rowidx = grid._toprowpos[0];

				hide_len = rows.length;
				hide_rows = rows;

				for (var i = 0; i < hide_len; i++) {
					hide_row = hide_rows[i];
					r = target_rowidx++;

					if (r >= grid.rowcount) {
						if (prev_rowidx == null) {
							prev_rowidx = grid._toprowpos[0] - 1;
						}

						r = prev_rowidx--;

						if (r < 0) {
							break;
						}
					}

					hide_row._changeRow(r, variable_size);
					l = hide_row._adjust_left;
					w = hide_row._adjust_width;
					h = grid._getRowSize(r);
					t = this._getBodyRowTopPos(r);

					if (h < 0) {
						continue;
					}

					hide_row.move(l, t, w, h);

					if (variable_size) {
						hide_row._resetCellsSize(grid._curFormat);
					}
				}

				if (rows.length > 0) {
					if (prev_rowidx != null) {
						rows.sort(function (a, b) {
							return a._rowidx - b._rowidx;
						});
					}

					grid._begrowpos = rows[0]._rowidx;
					grid._endrowpos = rows[rows.length - 1]._rowidx;
				}
			}
		}

		return hide_rows;
	};

	delete _pGridMatrixManager;

	nexacro.GridBand = function (id, left, top, width, height, parent, refobj) {
		nexacro.Component.call(this, id, "absolute", left, top, width, height, null, null, parent);
		this._is_subcontrol = true;

		this._isBody = (id == "body");
		this._refobj = refobj;
		this._grid = parent;
		this._rowsizesperdatarow = null;
		this._datarowsheight = -1;
		this._colinfos = null;
		this._rowinfos = null;
		this._cellsinfo = null;
		this._update_rows = [];
		this._create_rows = [];
		this._text_elem = null;

		if (refobj) {
			refobj.bandctrl = this;
			refobj._changeStyleTarget(this);
			this.style = refobj.style;
			this._styles = refobj._styles;
		}
		else {
			this.style = new nexacro.GridBand_Style(this);
		}

		this._matrix = new nexacro.GridMatrixManager(this._grid, this);
		this._scrollWidth = 0;
		this._scrollHeight = 0;
		this._recreating = false;
		this._accessibility_role = "none";
	};

	var _pGridBand = nexacro._createPrototype(nexacro.Component, nexacro.GridBand);
	nexacro.GridBand.prototype = _pGridBand;
	nexacro._setForControlStyleFinder(_pGridBand);

	_pGridBand._type_name = "GridBand";

	nexacro.GridBand._default_accessibility = nexacro._getCachedStyleObj("accessibility", "none disable all '' '' ''");

	_pGridBand.on_create_custom_style = function () {
		return null;
	};

	_pGridBand.on_create_custom_currentStyle = function () {
		return new nexacro.GridBand_CurrentStyle();
	};


	_pGridBand.on_update_style_opacity = function () {
	};

	_pGridBand.on_update_style_shadow = function () {
	};

	_pGridBand.on_update_style_cursor = function () {
	};

	_pGridBand.on_update_style_color = function () {
	};

	_pGridBand.on_update_style_align = function () {
	};

	_pGridBand.on_update_style_margin = function () {
	};

	_pGridBand.on_update_style_glow = function () {
	};

	_pGridBand.on_update_style_blur = function () {
	};

	_pGridBand.on_update_style_selectborder = function () {
		this._grid._curFormat._clearCellStyleCache(this.id);
		this._refresh_contents(true);
	};

	_pGridBand.on_update_style_cellline = function () {
		this._grid._curFormat._clearCellStyleCache(this.id);
		this._refresh_contents(true);
	};

	_pGridBand.on_update_style_celllinetype = function () {
		this._grid._curFormat._clearCellStyleCache(this.id);
		this._refresh_contents(true);
	};

	_pGridBand.on_update_style_selectcolor = function () {
		this._grid._curFormat._clearCellStyleCache(this.id);
		this._refresh_contents(true);
	};

	_pGridBand.on_update_style_selectline = function () {
		this._grid._curFormat._clearCellStyleCache(this.id);
		this._refresh_contents(true);
	};

	_pGridBand.on_update_style_selectlinetype = function () {
		this._grid._curFormat._clearCellStyleCache(this.id);
		this._refresh_contents(true);
	};

	_pGridBand.on_update_style_border = function () {
		this._grid._curFormat._clearCellStyleCache(this.id);
		this._refresh_contents(true);
	};

	_pGridBand.on_update_style_cellbackground = function () {
		this._grid._curFormat._clearCellStyleCache(this.id);
		this._refresh_contents(true);
	};

	_pGridBand.on_update_style_cellbackground2 = function () {
		this._grid._curFormat._clearCellStyleCache(this.id);
		this._refresh_contents(true);
	};

	_pGridBand.on_update_style_cellcolor = function () {
		this._grid._curFormat._clearCellStyleCache(this.id);
		this._refresh_contents(true);
	};

	_pGridBand.on_update_style_cellcolor2 = function () {
		this._grid._curFormat._clearCellStyleCache(this.id);
		this._refresh_contents(true);
	};

	_pGridBand.on_update_style_selectbackground = function () {
		this._grid._curFormat._clearCellStyleCache(this.id);
		this._refresh_contents(true);
	};

	_pGridBand.on_update_style_background = function () {
		this._grid._curFormat._clearCellStyleCache(this.id);
		this._refresh_contents(true);
	};

	_pGridBand.on_update_style_cellfont = function () {
		this._grid._curFormat._clearCellStyleCache(this.id);
		this._refresh_contents(true);
	};

	_pGridBand.on_update_style_cellletterspace = function () {
		this._grid._curFormat._clearCellStyleCache(this.id);
		this._refresh_contents(true);
	};

	_pGridBand.on_update_style_selectfont = function () {
		this._grid._curFormat._clearCellStyleCache(this.id);
		this._refresh_contents(true);
	};

	_pGridBand.on_update_style_font = function () {
		this._grid._curFormat._clearCellStyleCache(this.id);
		this._refresh_contents(true);
	};

	_pGridBand.on_update_style_cellgradation = function () {
		this._grid._curFormat._clearCellStyleCache(this.id);
		this._refresh_contents(true);
	};

	_pGridBand.on_update_style_cellgradation2 = function () {
		this._grid._curFormat._clearCellStyleCache(this.id);
		this._refresh_contents(true);
	};

	_pGridBand.on_update_style_selectgradation = function () {
		this._grid._curFormat._clearCellStyleCache(this.id);
		this._refresh_contents(true);
	};

	_pGridBand.on_update_style_gradation = function () {
		this._grid._curFormat._clearCellStyleCache(this.id);
		this._refresh_contents(true);
	};

	_pGridBand.on_update_style_cellalign = function () {
		this._grid._curFormat._clearCellStyleCache(this.id);
		this._refresh_contents(true);
	};

	_pGridBand.on_update_style_cellpadding = function () {
		this._grid._curFormat._clearCellStyleCache(this.id);
		this._refresh_contents(true);
	};

	_pGridBand.on_update_style_padding = function () {
		this._grid._curFormat._clearCellStyleCache(this.id);
		this._updateClientSize(this.getElement());
	};


	_pGridBand.on_find_CurrentStyle_background = function (pseudo) {
		if (!pseudo) {
			pseudo = "normal";
		}

		var obj = null;
		if (this._refobj) {
			obj = this._refobj._query_pseudo_background(pseudo);
		}

		var rowcount = this._grid._getGridRowCount();

		if (this._isBody && rowcount == 0) {
			var imgurl = this.parent.nodataimage;
			if (imgurl.length) {
				var color = "transparent";
				if (obj) {
					color = obj.color;
				}
				obj = nexacro._getCachedStyleObj("background", color + " " + imgurl + " center middle");
			}
		}
		return obj;
	};

	_pGridBand.on_find_CurrentStyle_gradation = function (pseudo) {
		if (this._refobj) {
			return this._refobj._query_pseudo_gradation(pseudo);
		}
		return null;
	};

	_pGridBand.on_find_CurrentStyle_padding = function (pseudo) {
		return null;
	};

	_pGridBand.on_find_CurrentStyle_font = function (pseudo) {
		return null;
	};

	_pGridBand.on_find_CurrentStyle_cursor = function (pseudo) {
		var grid = this._grid;
		if (grid._global_cursor) {
			return grid._global_cursor;
		}

		return null;
	};

	_pGridBand.on_find_CurrentStyle_shadow = function (pseudo) {
		return null;
	};

	_pGridBand.on_find_CurrentStyle_opacity = function (pseudo) {
		return null;
	};

	_pGridBand.on_find_CurrentStyle_align = function (pseudo) {
		return null;
	};

	_pGridBand.on_find_CurrentStyle_color = function (pseudo) {
		return null;
	};

	_pGridBand.on_find_CurrentStyle_accessibility = function (pseudo) {
		var accessibility = this._find_pseudo_obj("accessibility", pseudo, "accessibility");
		if (nexacro._accessibilitytype == 5 && this._grid.nodatatext) {
			return nexacro.Component._default_accessibility;
		}
		else if (nexacro._accessibilitytype == 4) {
			return nexacro.GridBand._default_accessibility;
		}
		else {
			return accessibility ? accessibility : nexacro.GridBand._default_accessibility;
		}
	};

	_pGridBand._find_pseudo_obj = function (styleProp, pseudo, returnType, celltype) {
		var obj;
		var bandtype = this.id;

		if (celltype) {
			bandtype = celltype;
		}

		if (bandtype == "summ" || bandtype == "summary") {
			obj = this._grid._find_bandcomp_pseudo_obj("summ", styleProp, pseudo, returnType);

			if (!obj) {
				obj = this._grid._find_bandcomp_pseudo_obj("head", styleProp, pseudo, returnType);
			}
		}
		else if (bandtype == "head") {
			obj = this._grid._find_bandcomp_pseudo_obj("head", styleProp, pseudo, returnType);
		}
		else {
			obj = this._grid._find_bandcomp_pseudo_obj("body", styleProp, pseudo, returnType);
		}

		return obj;
	};


	_pGridBand.on_find_CurrentStyle_rtlimagemirroring = function (pseudo) {
		return this._grid.on_find_CurrentStyle_rtlimagemirroring(pseudo);
	};

	_pGridBand.on_create_contents = function () {
		var control_elem = this.getElement();
		var format = this._grid._curFormat;
		if (control_elem && format) {
			this._recreate_contents();

			if (this._isBody) {
				var curstyle = this.currentstyle;

				var text_elem = this._text_elem = new nexacro.TextBoxElement(control_elem);
				text_elem.setElementSize(this._client_width, this._client_height);
				text_elem.setElementVisible(false);
				text_elem.setElementAlignXY("center", "middle");
				text_elem.setElementFont(curstyle.font);
				text_elem.setElementLetterSpace(curstyle.letterspace);
				text_elem.setElementColor(curstyle.color);
				text_elem.setElementWordWrap("char");

				if (this._get_rows().length == 0) {
					var text = this.parent.nodatatext;
					text_elem.setElementText(text);
				}
			}
		}
	};

	_pGridBand.on_created_contents = function () {
		var control_elem = this.getElement();
		var format = this._grid._curFormat;

		if (control_elem && format) {
			var text_elem = this._text_elem;
			if (text_elem) {
				text_elem.create();
			}

			this._on_refresh_rows();

			var grid = this._grid;
			var _hpos = grid._getScrollLeft();
			var _vpos = grid._getScrollTop();

			if (_hpos > 0) {
				this._matrix._adjustColsDisplay();
				grid._absolutelyResetScrollPos(true);
				grid._control_element.setElementHScrollPos(_hpos);
				grid._absolutelyResetScrollPos(false);
			}

			if (_vpos > 0) {
				grid._absolutelyResetScrollPos(true);
				grid._control_element.setElementVScrollPos(_vpos);
				grid._absolutelyResetScrollPos(false);
			}

			if (nexacro._enableaccessibility && !grid._accept_focus) {
				var accessibility = this.on_find_CurrentStyle_accessibility(this._pseudo);
				if (accessibility && accessibility.enable) {
					grid._accept_focus = true;
				}
			}
		}
	};

	_pGridBand._delete_style = function () {
		this.style = null;
		this._styles = null;
	};

	_pGridBand.on_destroy_contents = function () {
		if (this._text_elem) {
			this._text_elem.destroy();
			this._text_elem = null;
		}
		if (this._refobj) {
			this._refobj.bandctrl = null;
			this._refobj = null;
		}
		this._rows = null;
		this._grid = null;
		this._matrix.destroy();
		this._matrix = null;

		this._colinfos = null;
		this._rowinfos = null;
		this._cellsinfo = null;
		this._update_rows = null;
		this._create_rows = null;
		this._rowsizesperdatarow = null;
	};

	_pGridBand.on_change_containerRect = function (width, height) {
		if (this._recreating) {
			return;
		}

		if (this._text_elem) {
			var rect = this._grid._getAvailableRect(this);
			this._text_elem.setElementPosition(rect.left, rect.top);
			this._text_elem.setElementSize(rect.width, rect.height);
		}

		var grid = this._grid;

		if (grid._no_update_bandrect) {
			return;
		}

		if (grid._is_changingRect) {
			if (grid._colautofit) {
				if (grid.autosizingtype == "row" || grid.autosizingtype == "both") {
					if (grid._is_body_wordwrap || grid._is_head_wordwrap || grid._is_summ_wordwrap) {
						grid._resetRowSizeList();
						grid._resetColSizeList();
					}
				}
			}
		}

		if (this._isBody) {
			var _vpos = grid._getScrollTop();

			if (_vpos < 0) {
				_vpos = 0;
			}

			grid._last_scroll_top = _vpos;
			grid._toprowpos = grid._getScreenTopRowPos(_vpos);
			grid._bottomrowpos = grid._getScreenBottomRowPos(_vpos);

			this._matrix._adjustRowsDisplay(true);
			this._matrix._adjustColsDisplay();

			this._update_rows = this._matrix._adjustScrollRows(_vpos, true);
		}
		else {
			this._matrix._adjustRowsDisplay(true);
			this._matrix._adjustColsDisplay();
		}

		this._on_refresh_rows();
	};

	_pGridBand.on_create_control_element = function (parent_elem) {
		var control_elem = new nexacro.GridBandControlElement(parent_elem, this.id);
		control_elem.setLinkedControl(this);
		this._control_element = control_elem;
		return control_elem;
	};


	_pGridBand.on_apply_custom_setfocus = function (evt_name) {
		nexacro.Component.prototype.on_apply_custom_setfocus.call(this, evt_name);
		if (nexacro._enableaccessibility) {
			this._grid._currentBand = this.id;
			if (this.id == "head") {
				this._grid._currentDSrow = -1;
			}
			else if (this.id == "summ") {
				this._grid._currentDSrow = -2;
			}
			else {
				this._grid._currentDSrow = 0;
			}
		}
	};

	_pGridBand.on_get_style_accessibility_label = function () {
		return this.id;
	};

	_pGridBand._setAccessibilityStatFocus = function (evt_name) {
		var accessibility = this.on_find_CurrentStyle_accessibility(this._pseudo);
		var label = this._getAccessibilityLabel(accessibility);
		if (this._isBody && this._grid.rowcount <= 0) {
			label += (this._grid.nodatatext) ? this._grid.nodatatext : "";
			this._setAccessibilityLabel(label);
		}
		nexacro.Component.prototype._setAccessibilityStatFocus.call(this, evt_name);
	};

	_pGridBand._setAccessibilityNotifyEvent = function (direction) {
		if (this._isBody && this._grid.rowcount <= 0 && this._grid.nodatatext) {
			var label = this._grid.nodatatext;
			this._setAccessibilityLabel(label);
			return nexacro.Component.prototype._setAccessibilityNotifyEvent.call(this, direction);
		}
	};

	_pGridBand.on_apply_prop_class = function () {
		var format = this._grid._curFormat;
		if (format) {
			format._clearCellStyleCache(this.id);
		}

		nexacro.Component.prototype.on_apply_prop_class.call(this);
		this._refresh_contents(true);
	};

	_pGridBand.on_apply_wordwrap = function () {
		this._refresh_contents();
	};

	_pGridBand.on_apply_prop_tooltip = function () {
		var control_elem = this.getElement();
		this.tooltiptext = this._refobj._getTooltipText();

		if (control_elem) {
			if (this.tooltiptext != "") {
				control_elem.setElementToolTip(this.tooltiptext);
			}
		}
	};

	_pGridBand.on_apply_text = function () {
		if (this._text_elem) {
			if (this._isBody && this._get_rows().length == 0) {
				var text = this.parent.nodatatext;
				var font = this.parent.on_find_CurrentStyle_font();
				var color = this.parent.on_find_CurrentStyle_color();
				var letterspace = this.parent.on_find_CurrentStyle_letterspace();
				this._text_elem.setElementVisible(text ? true : false);
				this._text_elem.setElementText(text);
				this._text_elem.setElementFont(font);
				this._text_elem.setElementLetterSpace(letterspace);
				this._text_elem.setElementColor(color);
			}
			else {
				this._text_elem.setElementVisible(false);
			}
		}
	};

	_pGridBand.on_apply_prop_rtldirection = function () {
		nexacro.Component.prototype.on_apply_prop_rtldirection.call(this);
		var rows = this._matrix._rows;
		var _rtldirection = this._rtldirection;
		if (rows) {
			var left;
			for (var i = 0; i < rows.length; i++) {
				rows[i]._setRtlDirection(_rtldirection);
			}
		}
		this._matrix._adjustColsDisplay(true);
	};


	_pGridBand.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.parent.onnodataareaclick && this.parent.onnodataareaclick._has_handlers) {
			return this.parent.on_fire_onnodataareaclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp.parent, from_refer_comp);
		}
		return false;
	};

	_pGridBand.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.parent.onnodataareadblclick && this.parent.onnodataareadblclick._has_handlers) {
			return this.parent.on_fire_onnodataareadblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp.parent, from_refer_comp);
		}
		return false;
	};

	_pGridBand._on_refresh_rows = function (scrolling, no_update_supp) {
		if (this._control_element._handle) {
			var grid = this._grid;
			if (this._update_rows.length > 0 || this._create_rows.length > 0) {
				var update_rows = this._update_rows;
				var create_rows = this._create_rows;

				var rows = this._get_rows();
				var control_elem = this._control_element;

				this._on_refresh_rows_physical(update_rows, create_rows, scrolling, no_update_supp);

				this._update_rows = [];
				this._create_rows = [];
			}
			this.on_apply_text();
			grid._applyResizer();
			grid._adjustOverlayElements(false, grid._is_use_fakemerge);
		}
	};

	_pGridBand._on_refresh_rows_physical = function (update_rows, create_rows, scrolling, no_update_supp) {
		var update_rows_len = update_rows.length;
		var create_rows_len = create_rows.length;

		if (this._isBody) {
			var grid = this._grid;
			if (grid._is_created == true) {
				var rows = this._get_rows();
				var rows_len = rows.length;

				if (!no_update_supp) {
					grid._suppressUpdate();
				}

				for (var i = 0; i < create_rows_len; i++) {
					var create_row = create_rows[i];

					if (create_row._is_alive) {
						create_row._updateAll();
					}
				}

				var onlycontents = false;

				if (rows_len != update_rows_len) {
					onlycontents = (!grid._isUseBindExprOuterStyle("body") && !grid._is_variable_bodyrowsize && !grid._is_use_fakemerge);
				}

				for (var i = 0; i < update_rows_len; i++) {
					if (update_rows[i]._is_alive) {
						update_rows[i]._updateAll(undefined, undefined, onlycontents);
					}
				}

				if (grid._is_use_suppress) {
					if (create_rows_len > 0 || update_rows_len > 0) {
						var cells = grid._curFormat._bodycells, cells_cnt = cells.length;
						var rowidx, datarow;

						for (var j = 0; j < rows_len; j++) {
							rowidx = rows[j]._rowidx;
							datarow = (grid._hasTree) ? grid._treeIndexes[rowidx] : rowidx;

							for (var i = 0; i < cells_cnt; i++) {
								if (cells[i].suppress != 0) {
									this._refreshRowCell(j, i, grid._isSelectedCell(i, datarow));
								}
							}
						}
					}
				}
			}
		}
		else {
			for (var i = 0; i < create_rows_len; i++) {
				create_rows[i]._updateAll();
			}

			for (var i = 0; i < update_rows_len; i++) {
				update_rows[i]._updateAll();
			}
		}

		for (var i = 0; i < create_rows_len; i++) {
			create_rows[i].on_created();
		}
	};

	_pGridBand._on_last_lbuttonup = function () {
		this.parent._on_last_lbuttonup();
	};

	_pGridBand._on_last_keyup = function () {
		this.parent._on_last_keyup();
	};

	_pGridBand._refreshRowCell = function (displayrow, cellidx, selected, pseudo, onlycontents) {
		var rows = this._get_rows();
		var cells = rows[displayrow]._cells;
		var grid = this._grid;
		var cell = cells[cellidx];

		if (!cell) {
			return;
		}

		cell._selected = selected;

		var subcells = cell.subcells;
		var subcellsLen = subcells.length;

		for (var i = 0; i < subcellsLen; i++) {
			subcells[i]._selected = selected;
		}
		cell._updateAll(pseudo, onlycontents);
	};
	_pGridBand._refreshRow = function (displayrow, pseudo, for_select) {
		var rows = this._get_rows();
		var row = rows[displayrow];
		row._updateAll(pseudo, false, undefined, for_select);
	};
	_pGridBand._refreshCelltype = function (celltype, clearCurstyle) {
		var format = this.parent._curFormat;

		function checktype (cells, celltype) {
			var cells_len = cells.length;

			for (var i = 0; i < cells_len; i++) {
				if (cells[i].celltype == celltype) {
					return true;
				}
			}
			return false;
		}
		;

		if (celltype == "head") {
			if (format._bodycells) {
				if (checktype(format._bodycells, celltype)) {
					if (clearCurstyle) {
						this._grid._curFormat._clearCellStyleCache("body");
					}

					this.parent._refreshBody(clearCurstyle);
				}
			}
			if (format._summcells) {
				if (checktype(format._summcells, celltype)) {
					if (clearCurstyle) {
						this._grid._curFormat._clearCellStyleCache("summ");
					}

					this.parent._refreshSumm(clearCurstyle);
				}
			}
		}
		else if (celltype == "summary") {
			if (format._bodycells) {
				if (checktype(format._bodycells, celltype)) {
					if (clearCurstyle) {
						this._grid._curFormat._clearCellStyleCache("body");
					}

					this.parent._refreshBody(clearCurstyle);
				}
			}
			if (format._headcells) {
				if (checktype(format._headcells, celltype)) {
					if (clearCurstyle) {
						this._grid._curFormat._clearCellStyleCache("head");
					}

					this.parent._refreshHead(clearCurstyle);
				}
			}
		}
		else {
			if (format._summcells) {
				if (checktype(format._summcells, celltype)) {
					if (clearCurstyle) {
						this._grid._curFormat._clearCellStyleCache("summ");
					}

					this.parent._refreshSumm(clearCurstyle);
				}
			}
			if (format._headcells) {
				if (checktype(format._headcells, celltype)) {
					if (clearCurstyle) {
						this._grid._curFormat._clearCellStyleCache("head");
					}

					this.parent._refreshHead(clearCurstyle);
				}
			}
		}
	};

	_pGridBand._refresh_contents = function (clearCurstyle) {
		if (clearCurstyle) {
			var rows = this._get_rows();
			var rowsLen = rows.length;
			var cells, cellsLen, cell;

			for (var i = 0; i < rowsLen; i++) {
				cells = rows[i]._cells;
				cellsLen = cells.length;

				for (var j = 0; j < cellsLen; j++) {
					cell = cells[j];
					cell.currentstyle._empty();
				}
			}
		}

		if (this.id == "head") {
			this.parent._refreshHead(clearCurstyle);
			this._refreshCelltype("head", clearCurstyle);
		}
		else if (this.id == "summ") {
			this.parent._refreshSumm(clearCurstyle);
			this._refreshCelltype("summary", clearCurstyle);
		}
		else {
			this.parent._refreshBody(clearCurstyle);
			this._refreshCelltype("body", clearCurstyle);
		}
	};

	_pGridBand._isEnable = function () {
		if (this._grid) {
			return this._grid._isEnable();
		}
		return true;
	};

	_pGridBand._get_cols = function (format) {
		var cols = format._cols, cols_len = cols.length, col, left_cols = [], right_cols = [], body_cols = [];

		for (var i = 0; i < cols_len; i++) {
			col = cols[i];
			if (col._area == "left") {
				left_cols.push(col.size);
			}
			else if (col._area == "right") {
				right_cols.push(col.size);
			}
			else {
				body_cols.push(col.size);
			}
		}

		this._colinfos = cols;
		return [body_cols, left_cols, right_cols];
	};

	_pGridBand._recreate_contents = function (recreate_colarea, init_scroll, scrolling, no_hide_edit, no_update_supp) {
		var grid = this._grid, format = grid._curFormat, rows;

		this._matrix._init();

		if (!format) {
			return;
		}

		this._create_rows = [];
		this._update_rows = [];
		this._rowsizesperdatarow = [];
		this._recreating = true;

		if (this.id == "head") {
			rows = format._headrows;
			this._datarowsheight = format.headHeight;
		}
		else if (this.id == "summ") {
			rows = format._summrows;
			this._datarowsheight = format.summHeight;
		}
		else {
			rows = format._bodyrows;
			grid._rowheight = this._datarowsheight = format._body_height;
		}

		var rows_len = rows ? rows.length : 0, row;

		for (var i = 0; i < rows_len; i++) {
			this._rowsizesperdatarow.push(rows[i].size);
		}

		var hpos = (grid.hscrollbar) ? grid.hscrollbar.pos : 0, vpos = (grid.vscrollbar) ? grid.vscrollbar.pos : 0, _vpos = (grid.vscrollbar) ? grid.vscrollbar._pos : 0, scrollwidth = format.bodyWidth, scrollheight = 0;

		if (this._isBody) {
			this._control_element._setFixArea(grid._fixed_height);
			this._client_height = this._control_element.client_height;

			if (!scrolling && !no_hide_edit) {
				grid._hideEditor();
			}

			var rowcnt = grid._getGridRowCount();

			var rowSizes = grid._rowSizeList, datarow, band_scroll_sizes = [], band_sizes_cnt = 1, band_scroll_max = 1500000;

			for (var i = 0; i < rowcnt; i++) {
				datarow = grid._getDataRow(i);
				scrollheight += rowSizes[datarow];

				if (scrollheight - grid._fixedrow_height >= band_scroll_max * band_sizes_cnt) {
					band_scroll_sizes.push(scrollheight - rowSizes[datarow]);
					band_sizes_cnt++;
				}
			}
			scrollheight -= grid._fixedrow_height;
			band_scroll_sizes.push(scrollheight);

			this._scrollHeight = scrollheight;
			this._scrollWidth = scrollwidth;

			var flag = grid._no_update_bandrect;
			grid._no_update_bandrect = true;
			grid._setScrollMaxSize(this._scrollWidth, this._scrollHeight, band_scroll_sizes);
			grid._no_update_bandrect = flag;

			var vlimit = grid._control_element.vscroll_limit;

			if (_vpos < 0) {
				_vpos = 0;
			}
			else if (_vpos > vlimit) {
				_vpos = vlimit;
			}

			grid._toprowpos = grid._getScreenTopRowPos(_vpos);
			grid._bottomrowpos = grid._getScreenBottomRowPos(_vpos);

			if (_vpos == 0) {
				this._matrix._adjustRowsDisplay();
				this._matrix._async_create_page();
			}
			else {
				this._matrix._adjustRowsDisplay();
			}

			if (!grid._headBand && !grid._summBand) {
				grid._setScrollMaxSize(this._scrollWidth, this._scrollHeight, band_scroll_sizes);
			}

			if (grid._is_created && !grid._autofiting) {
				this._on_refresh_rows(false, no_update_supp);
				grid._applyAutofittype(true);
			}
		}
		else {
			this._scrollWidth = scrollwidth;
			this._matrix._adjustRowsDisplay();
			grid._setScrollMaxSize(this._scrollWidth);

			if (grid._is_created && !grid._autofiting) {
				this._on_refresh_rows(false, no_update_supp);
			}
		}

		var lastfocus = grid._find_lastFocused();
		if (lastfocus == grid) {
			grid._control_element.setElementFocus();
		}

		var hlimit = grid._control_element.hscroll_limit;

		if (hpos < 0) {
			hpos = 0;
		}
		else if (hpos > hlimit) {
			hpos = hlimit;
		}

		if (this._isBody) {
			if (hpos > 0) {
				if (init_scroll) {
					grid.hscrollbar.set_pos(0);
					grid._control_element.setElementHScrollPos(0);
				}
				else {
					if (grid._control_element._target_hscroll_elements) {
						this._matrix._adjustColsDisplay();
						grid._absolutelyResetScrollPos(true);
						grid._control_element.setElementHScrollPos(hpos);
						grid._absolutelyResetScrollPos(false);
					}
				}
			}
			if (_vpos > 0) {
				if (init_scroll) {
					grid.vscrollbar.set_pos(0);
					this._control_element.setElementVScrollPos(0);
					this._is_over_scroll = 0;
				}
				else {
					grid._absolutelyResetScrollPos(true);
					grid._control_element.setElementVScrollPos(_vpos);
					grid._absolutelyResetScrollPos(false);
				}
			}
			grid._control_element._scroll_left = hpos;
			grid._control_element._scroll_top = vpos;
		}
		else {
			if (hpos > 0) {
				if (init_scroll) {
					grid.hscrollbar.set_pos(0);
					grid._control_element.setElementHScrollPos(0);
				}
				else {
					this._matrix._adjustColsDisplay();
					grid._absolutelyResetScrollPos(true);
					grid._control_element.setElementHScrollPos(hpos);
					grid._absolutelyResetScrollPos(false);
				}
			}
			grid._control_element._scroll_left = hpos;
		}
		this._recreating = false;
	};

	_pGridBand._get_rows = function () {
		return this._matrix._getAllRows();
	};

	_pGridBand._get_row = function (dataRowIdx) {
		if (!this._is_created) {
			return null;
		}

		var rows = this._get_rows();
		var rows_len = (rows) ? rows.length : 0;
		var cells;
		var grid = this._grid;
		var datarow;

		for (var i = 0; i < rows_len; i++) {
			datarow = grid._getDataRow(rows[i]._rowidx);

			if (dataRowIdx == datarow) {
				return rows[i];
			}
		}
		return null;
	};

	_pGridBand._updateAll = function (clearCurstyle) {
		if (this.getElement()) {
			if (clearCurstyle) {
				this.currentstyle._empty();
				this._control_pseudo = "";
				this._contents_pseudo = "";
			}
			this.on_apply_pseudo(this._pseudo);
		}
	};

	delete _pGridBand;

	nexacro.GridScrollBarCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.ScrollBarCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._grid = parent;
	};
	var _pGridScrollBarCtrl = nexacro.GridScrollBarCtrl.prototype = nexacro._createPrototype(nexacro.ScrollBarCtrl, nexacro.GridScrollBarCtrl);
	nexacro._setForTypedControlStyleFinder(_pGridScrollBarCtrl);

	_pGridScrollBarCtrl._type_name = "GridScrollBarControl";

	_pGridScrollBarCtrl.on_destroy_contents = function () {
		nexacro.ScrollBarCtrl.prototype.on_destroy_contents.call(this);
		this._grid = null;
	};

	_pGridScrollBarCtrl._set_rowpos = function (v, evt_kind) {
		var grid = this._grid;
		v -= grid._getFixRowCnt();

		if (grid._scrollpixel == "all") {
			v = this._scroll_convert_pixel(v, true);
		}
		this._no_set_scrollinfo = true;
		this._setPos(v, evt_kind);
		this._no_set_scrollinfo = false;
	};

	_pGridScrollBarCtrl._set_pixelpos = function (v, evt_kind) {
		var str = "none";

		if (evt_kind == "mousewheel") {
			str = this._getScrollInfo(v);
		}

		if (v < this._min) {
			v = this._min;
		}
		if (v > this._max) {
			v = this._max;
		}

		this._no_set_scrollinfo = true;
		if (this._pos != v) {
			this.pos = this._scroll_reverse_convert(v)[0];
			this._pos = v;
			var rc = this._rectShaft;
			this._resetTrackBar(rc.left, rc.top, rc.right, rc.bottom);
		}

		this.on_fire_onscroll(this.pos, str);
		this._no_set_scrollinfo = false;
	};

	_pGridScrollBarCtrl._scroll_convert_pixel = function (v, is_notcheck) {
		var grid = this._grid;
		var bodyband = grid._bodyBand;

		if (grid._scrollpixel != "all" || is_notcheck) {
			if (this.direction == "vert") {
				if (bodyband) {
					var srowidx = grid._getFixRowCnt();
					var rowidx = v + srowidx;

					if (grid._is_variable_bodyrowsize) {
						var height = 0, row;

						for (var i = srowidx; i < rowidx; i++) {
							row = grid._getDataRow(i);
							height += grid._rowSizeList[row];
						}
						v = height;
					}
					else {
						v = (rowidx - srowidx) * bodyband._datarowsheight;
					}
				}
			}
		}

		return v;
	};

	_pGridScrollBarCtrl._scroll_reverse_convert = function (v, is_notcheck, is_max) {
		var grid = this._grid;
		var bodyband = grid._bodyBand;
		var renew = v;

		if (grid._scrollpixel != "all" || is_notcheck) {
			if (this.direction == "vert") {
				if (bodyband) {
					if (grid._is_variable_bodyrowsize) {
						var srowidx = grid._getFixRowCnt();
						var rowcnt = grid._getGridRowCount();
						var height = 0, row = 0;

						if (is_max) {
							for (var i = srowidx; i < rowcnt; i++) {
								row = grid._getDataRow(i);

								if (v <= height) {
									row = i;
									renew = height;
									break;
								}
								height += grid._rowSizeList[row];
							}
						}
						else {
							for (var i = srowidx; i < rowcnt; i++) {
								row = grid._getDataRow(i);

								if (v < height) {
									row = i - 1;

									if (grid._rowSizeList[row] > bodyband._client_height) {
										if (height - v < bodyband._client_height) {
											renew = height - bodyband._client_height;
										}
									}
									else {
										renew = height - grid._rowSizeList[row];
									}
									break;
								}
								height += grid._rowSizeList[row];
							}
						}
						v = row;
						v -= srowidx;
					}
					else {
						var height = 0, row = 0;

						if (is_max) {
							if (v > 0) {
								row = Math.ceil(v / bodyband._datarowsheight);
							}

							renew = row * bodyband._datarowsheight;
						}
						else {
							if (v > 0) {
								row = Math.floor(v / bodyband._datarowsheight);
							}

							height = bodyband._datarowsheight * (row + 1);
							if (bodyband._datarowsheight > bodyband._client_height) {
								if (height - v < bodyband._client_height) {
									renew = height - bodyband._client_height;
								}
							}
							else {
								renew = row * bodyband._datarowsheight;
							}
						}
						v = row;
					}
				}
			}
		}

		return [v, renew];
	};

	_pGridScrollBarCtrl.on_incbutton_lbuttondown = function (obj) {
		this._no_set_scrollinfo = true;
		nexacro.ScrollBarCtrl.prototype.on_incbutton_lbuttondown.call(this, obj);
		this._no_set_scrollinfo = false;
	};

	_pGridScrollBarCtrl.on_decbutton_lbuttondown = function (obj) {
		this._no_set_scrollinfo = true;
		nexacro.ScrollBarCtrl.prototype.on_decbutton_lbuttondown.call(this, obj);
		this._no_set_scrollinfo = false;
	};

	_pGridScrollBarCtrl._getIncNewPosPixel = function () {
		var grid = this._grid;
		var nNew, pos;

		if (this.direction == "vert") {
			if (grid._scrollpixel != "all") {
				pos = this.pos;
			}
			else {
				pos = this._scroll_reverse_convert(this.pos, true)[0];
			}

			nNew = this._scroll_convert_pixel(pos + 1, true);
		}

		return nNew;
	};

	_pGridScrollBarCtrl._getDecNewPosPixel = function () {
		var grid = this._grid;
		var nNew, pos;

		if (this.direction == "vert") {
			if (grid._scrollpixel != "all") {
				pos = this.pos;
			}
			else {
				pos = this._scroll_reverse_convert(this.pos, true)[0];
			}

			nNew = this._scroll_convert_pixel(pos - 1, true);
		}
		return nNew;
	};

	_pGridScrollBarCtrl._setScrollPos = function (si_pos) {
		nexacro.ScrollBarCtrl.prototype._setScrollPos.call(this, si_pos);

		var grid = this._grid;

		if (grid._scrollpixel != "all") {
			grid._is_over_scroll = 0;

			if (this._pos > this._orgmax) {
				grid._is_over_scroll = this._pos - this._orgmax;
			}
		}
	};

	delete _pGridScrollBarCtrl;

	nexacro.Grid = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

		this._event_list = {
			"onclick" : 1, 
			"ondblclick" : 1, 
			"onkillfocus" : 1, 
			"onsetfocus" : 1, 
			"onkeypress" : 1, 
			"onkeydown" : 1, 
			"onkeyup" : 1, 
			"onlbuttondown" : 1, 
			"onlbuttonup" : 1, 
			"onrbuttondown" : 1, 
			"onrbuttonup" : 1, 
			"onmousedown" : 1, 
			"onmouseup" : 1, 
			"onmouseenter" : 1, 
			"onmouseleave" : 1, 
			"onmousemove" : 1, 
			"onmousewheel" : 1, 
			"ondrag" : 1, 
			"ondragenter" : 1, 
			"ondragleave" : 1, 
			"ondragmove" : 1, 
			"ondrop" : 1, 
			"onmove" : 1, 
			"onsize" : 1, 
			"ongesture" : 1, 
			"onvscrolllastover" : 1, 
			"onvscroll" : 1, 
			"onhscroll" : 1, 
			"onvtracklast" : 1, 
			"oncellclick" : 1, 
			"onheadclick" : 1, 
			"onsummclick" : 1, 
			"oncelldblclick" : 1, 
			"onheaddblclick" : 1, 
			"onsummdblclick" : 1, 
			"onnodataareaclick" : 1, 
			"onnodataareadblclick" : 1, 
			"onselectchanged" : 1, 
			"onselectchanged" : 1, 
			"onformatchanged" : 1, 
			"onenteredit" : 1, 
			"onenterdown" : 1, 
			"cantreestatuschange" : 1, 
			"ontreestatuschanged" : 1, 
			"onsubselectchanged" : 1, 
			"onsubselectchanged" : 1, 
			"oncolresizing" : 1, 
			"onrowresizing" : 1, 
			"ondropdown" : 1, 
			"oncloseup" : 1, 
			"onitemchanged" : 1, 
			"onexpanddown" : 1, 
			"onexpandup" : 1, 
			"onchar" : 1, 
			"ontextchange" : 1, 
			"ontextchanged" : 1, 
			"oncolresized" : 1, 
			"onrowresized" : 1, 
			"ontouchstart" : 1, 
			"ontouchmove" : 1, 
			"ontouchend" : 1, 
			"onflingstart" : 1, 
			"onfling" : 1, 
			"onflingend" : 1, 
			"onpinchstart" : 1, 
			"onpinch" : 1, 
			"onpinchend" : 1, 
			"onlongpress" : 1, 
			"onslidestart" : 1, 
			"onslide" : 1, 
			"onslideend" : 1
		};


		this._is_scrollable = true;
		this._formats = {
		};
		this._curFormat = null;
		this._headBand = null;
		this._summBand = null;
		this._bodyBand = null;

		this._exprcache = {
		};

		this._selectstartrow = [];
		this._selectstartcol = [];
		this._selectstartsubrow = [];
		this._selectstartpvt = [];
		this._selectendrow = [];
		this._selectendcol = [];
		this._selectendsubrow = [];
		this._selectendpvt = [];
		this._resizerCols = [];
		this._resizerRows = [];
		this._imgsize_cache = {
		};
		this._rowSizeListSub = [];
		this._rowSizeList = [];
		this._rowHeadListSub = [];
		this._rowHeadList = [];
		this._rowSummListSub = [];
		this._rowSummList = [];
		this._begrowpos = 0;
		this._endrowpos = 0;
		this._toprowpos = [0, 0];
		this._bottomrowpos = -1;

		this._selectinfo = {
			rows : [], 
			selects : [], 
			ctrlpoint : {
				"cell" : -1, 
				"col" : -1, 
				"subrow" : -1, 
				"row" : -9, 
				"colspan" : -1, 
				"rowspan" : -1, 
				"_init" : function () {
					this.cell = -1;
					this.col = -1;
					this.subrow = -1;
					this.row = -9;
					this.colspan = -1;
					this.rowspan = -1;
					this.subrowslen = 0;
					this.area = "";
				}, 
				"_set" : function (cellinfo, row, subrowslen) {
					this.cell = cellinfo._cellidx;
					this.col = cellinfo._col;
					this.subrow = cellinfo._row;
					this.row = row;
					this.colspan = cellinfo._colspan;
					this.rowspan = cellinfo._rowspan;
					this.subrowslen = subrowslen;
					this.area = cellinfo._area;
				}
			}, 
			area : [], 
			"curcell" : -1, 
			"curcol" : -1, 
			"curpvt" : -9, 
			"cursubrow" : -1, 
			"curdsrow" : -1, 
			"currow" : -9, 
			"getSelectCells" : function (row) {
				return this.selects[row + 2];
			}, 
			arearect : {
				left : 0, 
				top : 0, 
				width : 0, 
				height : 0, 
				barea : "", 
				earea : ""
			}
		};

		this._text_elem = null;
		this._is_use_suppress = false;
		this._is_head_wordwrap = false;
		this._is_body_wordwrap = false;
		this._is_summ_wordwrap = false;
		this._recreate_contents_proc = [];
		this._keydown_elem = null;
		this._tree_load_all = null;
		this._image_load_all = null;
		this._is_editor_keyaction = true;
		this._focus_proc = null;
		this._after_recreate_contents_all = null;
		this._after_recreate = false;
		this._is_async_recreate = false;
		this._is_after_recreate = false;


		this._accessibility_role = "grid";
		this._accept_arrow = false;
		this._accept_focus = false;
		this._first_focus = false;
		this._is_first_bodycell = false;
		this._is_band_focus = false;
		this._beforegridrowpos = -1;
		this._beforegridcolpos = -1;
		this.accessibilityreadbandlabel = true;


		this.controlbutton = new nexacro.GridControlButton("controlbutton", 0, 0, 0, 0, this, false, true);
		this.controlcalendar = new nexacro.GridControlCalendar("controlcalendar", 0, 0, 0, 0, this, false, true);
		this.controlcheckbox = new nexacro.GridControlCheckbox("controlcheckbox", 0, 0, 0, 0, this, true);
		this.controlcombo = new nexacro.GridControlCombo("controlcombo", 0, 0, 0, 0, this, false, true);
		this.controledit = new nexacro.GridControlEdit("controledit", 0, 0, 0, 0, this, false, true);
		this.controlmaskedit = new nexacro.GridControlMaskEdit("controlmaskedit", 0, 0, 0, 0, this, true);
		this.controltextarea = new nexacro.GridControlTextArea("controltextarea", 0, 0, 0, 0, this, false, true);
		this.controlprogressbar = new nexacro.GridControlBar("controlprogressbar", 0, 0, 0, 0, this, true);
		this.controlexpand = new nexacro.GridExpand(this, 0, 0, 0, 0, true);

		this._aniframe_rowscroll = null;
		this._aniframe_colscroll = null;

		this._is_use_bind_expr_prop = {
			body : null, 
			head : null, 
			summ : null
		};
		this._is_use_bind_expr_style = {
			body : false, 
			head : false, 
			summ : false
		};
		this._is_use_bind_expr_outerstyle = {
			body : false, 
			head : false, 
			summ : false
		};

		this._select_ctrl = null;
		this._format_str = null;
		this._destroyeditors = [];
		this._track_point = {
			x : -1, 
			y : -1
		};
		this._track_idx = -1;
		this._track_start_info = null;
		this._track_mode = "";
		this._overlay_elements = [];
		this._func_queue = [];
		this._recalcXY_info = null;
		this._fake_mergecell_arr = [];
		this._enable_redraw_history = {
		};
		this._temphead = this._tempsumm = null;
		this._autofitcol_rate = [];
		this._org_treeStates = [];
	};

	var _pGrid = nexacro._createPrototype(nexacro.Component, nexacro.Grid);
	nexacro.Grid.prototype = _pGrid;

	_pGrid._type_name = "Grid";


	_pGrid._rowheight = 24;

	_pGrid._rowcount = 0;
	_pGrid._rowposition = -1;

	_pGrid._beforeheadcellpos = -1;
	_pGrid._beforeheadrowpos = -1;
	_pGrid._beforeheadcolpos = -1;
	_pGrid._beforeheadsubrowpos = -1;

	_pGrid._beforebodycellpos = -1;
	_pGrid._beforebodyrowpos = -1;
	_pGrid._beforebodycolpos = -1;
	_pGrid._beforebodysubrowpos = -1;
	_pGrid._beforepvt = -9;

	_pGrid._beforesummcellpos = -1;
	_pGrid._beforesummrowpos = -1;
	_pGrid._beforesummcolpos = -1;
	_pGrid._beforesummsubrowpos = -1;

	_pGrid._multiselect = "none";

	_pGrid._bodyrowheight = 0;
	_pGrid._mouseRowPos = -9;
	_pGrid._mouseovercell = null;
	_pGrid._mouseCellPos = -1;
	_pGrid._dsEventOccured = false;
	_pGrid._bPivotGrid = false;

	_pGrid._showEditorCell = false;
	_pGrid._showEditRowIdx = -1;
	_pGrid._showEditCellIdx = -1;

	_pGrid._dbclickPreCell = -1;
	_pGrid._dbclickPreCol = -1;
	_pGrid._dbclickPreRow = -9;
	_pGrid._dbclickPreSubrow = -1;
	_pGrid._dbclickPrePvt = -9;
	_pGrid._lbuttondown_proc = false;

	_pGrid._bDragArea = false;
	_pGrid._nDragRow = -1;
	_pGrid._nDragCell = -1;
	_pGrid._nDragPivot = -9;
	_pGrid._nDragEndRow = -1;
	_pGrid._nDragEndCell = -1;
	_pGrid._nDragEndCol = -9;
	_pGrid._nDragBand = -1;
	_pGrid._bShiftClick = false;

	_pGrid._selectClear = false;
	_pGrid._acceptstab = true;


	_pGrid.vscrollbar = null;
	_pGrid.hscrollbar = null;
	_pGrid.scrollbars = "autoboth";
	_pGrid._scrollbars = 3;

	_pGrid.body = null;
	_pGrid.head = null;
	_pGrid.summ = null;
	_pGrid.summary = null;

	_pGrid.currentcell = -1;
	_pGrid.currentcol = -1;
	_pGrid.currentpivot = -9;
	_pGrid.currentsubrow = -1;
	_pGrid.currentrow = -9;
	_pGrid._currentDSrow = -1;
	_pGrid._currentBand = "body";

	_pGrid.selectcount = 0;
	_pGrid.selectstartrow = -9;
	_pGrid.selectstartcol = -1;
	_pGrid.selectstartsubrow = -1;
	_pGrid.selectstartpivot = -9;
	_pGrid.selectendrow = -9;
	_pGrid.selectendcol = -1;
	_pGrid.selectendsubrow = -1;
	_pGrid.selectendpivot = -9;

	_pGrid.pagerowcount = 0;
	_pGrid._pagerowcnt = 0;
	_pGrid.rowcount = 0;
	_pGrid.pivotcount = 0;
	_pGrid._disprowcnt = 0;

	_pGrid._displaycalendarctrl = null;

	_pGrid.fillareatype = "none";
	_pGrid._resetfillarea = false;
	_pGrid.scrollpixel = "default";
	_pGrid._scrollpixel = (nexacro.isTouchInteraction) ? "all" : "none";
	_pGrid._selectscrollmode = (nexacro.isTouchInteraction) ? "scroll" : "select";
	_pGrid.dragscrolltype = "all";
	_pGrid.hideendline = "none";
	_pGrid.userdata = "";
	_pGrid.nodataimage = "";
	_pGrid.nodatatext = "";
	_pGrid.summarytype = "default";
	_pGrid.suppresslevel = "sameskip";
	_pGrid.useselcolor = true;

	_pGrid.autoupdatetype = "none";
	_pGrid.cellclickbound = "control";
	_pGrid.cellmovingtype = "none";
	_pGrid.cellsizebandtype = "body";
	_pGrid.cellsizingtype = "none";
	_pGrid.extendsizetype = "none";
	_pGrid.readonly = false;
	_pGrid.selectbandtype = "default";
	_pGrid.selectchangetype = "down";
	_pGrid.selecttype = "row";
	_pGrid.wheelscrollrow = 3;
	_pGrid.usecontrolkey = true;
	_pGrid.treeusebutton = "use";
	_pGrid.treeuseline = true;
	_pGrid.treeusecheckbox = true;
	_pGrid.treeuseimage = true;
	_pGrid.treeuseexpandkey = false;
	_pGrid.treeinitstatus = "collapse,null";
	_pGrid.treepathdelimiter = ".";
	_pGrid.useinputpanel = false;
	_pGrid._enable = true;
	_pGrid._changeDisplayer = false;
	_pGrid._autoSizeRowProc = false;
	_pGrid._iskey_movetocell = false;


	_pGrid.binddataset = "";
	_pGrid._binddataset = null;

	_pGrid._userRowposChange = false;
	_pGrid._create_selection = null;

	_pGrid.formatid = "";
	_pGrid.formats = "";
	_pGrid.locale = "";
	_pGrid.areaselecttype = "limitband";
	_pGrid.autoenter = "none";
	_pGrid.autofitbandtype = "body";
	_pGrid.autofitminheight = 100;
	_pGrid.autofitminwidth = 100;
	_pGrid.autofittype = "none";
	_pGrid.autosizingtype = "none";
	_pGrid.autosizebandtype = "body";
	_pGrid.selectscrollmode = "default";

	_pGrid._colautofit = false;
	_pGrid._rowautofit = false;
	_pGrid._autofiting = false;
	_pGrid._bodyAutoSize = true;
	_pGrid._headAutoSize = false;
	_pGrid._summAutoSize = false;
	_pGrid._AutoSizeLcol = false;
	_pGrid._AutoSizeRcol = false;
	_pGrid._rowSizeEx = false;
	_pGrid._noInternalvscroll = false;
	_pGrid._is_variable_bodyrowsize = false;
	_pGrid._bGridCtrlLdown = false;
	_pGrid._locale = "";


	_pGrid._currentCompositionStatus = "none";
	_pGrid._currentCompositionData = "";


	_pGrid._fixed_startrow = -9;
	_pGrid._fixed_endrow = -9;
	_pGrid._fixed_height = 0;
	_pGrid._fixedrow_height = 0;
	_pGrid._fixed_rowcnt = 0;
	_pGrid._fixed_row_scrolling = false;


	_pGrid._accessibility_row = -1;
	_pGrid._accessibility_cellidx = -1;

	_pGrid.on_apply_custom_pseudo = function (pseudo) {
		var curstyle = this.currentstyle;

		var font = this.on_find_CurrentStyle_font(pseudo);
		if (curstyle.font != font) {
			curstyle.font = font;
			this.on_apply_style_font(font);
		}

		var letterspace = this.on_find_CurrentStyle_letterspace(pseudo);
		if (curstyle.letterspace != letterspace) {
			curstyle.letterspace = letterspace;
			this.on_apply_style_letterspace(letterspace);
		}

		var color = this.on_find_CurrentStyle_color(pseudo);
		if (curstyle.color != color) {
			curstyle.color = color;
			this.on_apply_style_color(color);
		}

		var align = this.on_find_CurrentStyle_align(pseudo);
		if (curstyle.align != align) {
			curstyle.align = align;
			this.on_apply_style_align(align);
		}

		var linetype = this.on_find_CurrentStyle_linetype(pseudo);
		if (curstyle.linetype != linetype) {
			curstyle.linetype = linetype;
			this.on_apply_style_linetype(linetype);
		}

		var line = this.on_find_CurrentStyle_line(pseudo);
		if (curstyle.line != line) {
			curstyle.line = line;
			this.on_apply_style_line(line);
		}

		var selectline = this.on_find_CurrentStyle_selectline(pseudo);
		if (curstyle.selectline != selectline) {
			curstyle.selectline = selectline;
			this.on_apply_style_selectline(selectline);
		}

		var selectlinetype = this.on_find_CurrentStyle_selectlinetype(pseudo);
		if (curstyle.selectlinetype != selectlinetype) {
			curstyle.selectlinetype = selectlinetype;
			this.on_apply_style_selectline(selectlinetype);
		}

		var treeclosebuttonimage = this.on_find_CurrentStyle_treeclosebuttonimage(pseudo);
		if (curstyle.treeclosebuttonimage != treeclosebuttonimage) {
			curstyle.treeclosebuttonimage = treeclosebuttonimage;
			this.on_apply_style_treeclosebuttonimage(treeclosebuttonimage);
		}

		var treecollapseimage = this.on_find_CurrentStyle_treecollapseimage(pseudo);
		if (curstyle.treecollapseimage != treecollapseimage) {
			curstyle.treecollapseimage = treecollapseimage;
			this.on_apply_style_treecollapseimage(treecollapseimage);
		}

		var treeexpandimage = this.on_find_CurrentStyle_treeexpandimage(pseudo);
		if (curstyle.treeexpandimage != treeexpandimage) {
			curstyle.treeexpandimage = treeexpandimage;
			this.on_apply_style_treeexpandimage(treeexpandimage);
		}

		var treeitemimage = this.on_find_CurrentStyle_treeitemimage(pseudo);
		if (curstyle.treeitemimage != treeitemimage) {
			curstyle.treeitemimage = treeitemimage;
			this.on_apply_style_treeitemimage(treeitemimage);
		}

		var treelinetype = this.on_find_CurrentStyle_treelinetype(pseudo);
		if (curstyle.treelinetype != treelinetype) {
			curstyle.treelinetype = treelinetype;
			this.on_apply_style_treeitemimage(treelinetype);
		}

		var treeopenbuttonimage = this.on_find_CurrentStyle_treeopenbuttonimage(pseudo);
		if (curstyle.treeopenbuttonimage != treeopenbuttonimage) {
			curstyle.treeopenbuttonimage = treeopenbuttonimage;
			this.on_apply_style_treeopenbuttonimage(treeopenbuttonimage);
		}

		var rtlimagemirroring = this.on_find_CurrentStyle_rtlimagemirroring(pseudo);
		if (curstyle.rtlimagemirroring != rtlimagemirroring) {
			curstyle.rtlimagemirroring = rtlimagemirroring;
			this.on_apply_style_rtlimagemirroring(rtlimagemirroring);
		}
	};

	_pGrid.on_create_custom_style = function () {
		return new nexacro.Grid_Style(this);
	};

	_pGrid.on_create_custom_currentStyle = function () {
		return new nexacro.Grid_CurrentStyle();
	};


	_pGrid.on_find_CurrentStyle_cursor = function (pseudo) {
		if (this._global_cursor) {
			return this._global_cursor;
		}

		return nexacro.Component.prototype.on_find_CurrentStyle_cursor.call(this, pseudo);
	};

	_pGrid.on_find_CurrentStyle_line = function (pseudo) {
		return this._find_pseudo_obj("line", pseudo, "line");
	};

	_pGrid.on_find_CurrentStyle_selectline = function (pseudo) {
		return this._find_pseudo_obj("selectline", pseudo);
	};

	_pGrid.on_find_CurrentStyle_linetype = function (pseudo) {
		return this._find_pseudo_obj("linetype", pseudo);
	};

	_pGrid.on_find_CurrentStyle_selectlinetype = function (pseudo) {
		return this._find_pseudo_obj("selectlinetype", pseudo);
	};

	_pGrid.on_find_CurrentStyle_focusborder = function (pseudo) {
		return this._find_pseudo_obj("focusborder", pseudo, "border");
	};

	_pGrid.on_find_CurrentStyle_treeclosebuttonimage = function (pseudo) {
		return this._find_pseudo_obj("treeclosebuttonimage", pseudo);
	};

	_pGrid.on_find_CurrentStyle_treecollapseimage = function (pseudo) {
		return this._find_pseudo_obj("treecollapseimage", pseudo);
	};

	_pGrid.on_find_CurrentStyle_treeexpandimage = function (pseudo) {
		return this._find_pseudo_obj("treeexpandimage", pseudo);
	};

	_pGrid.on_find_CurrentStyle_treeitemimage = function (pseudo) {
		return this._find_pseudo_obj("treeitemimage", pseudo);
	};

	_pGrid.on_find_CurrentStyle_treelinetype = function (pseudo) {
		return this._find_pseudo_obj("treelinetype", pseudo, "line");
	};

	_pGrid.on_find_CurrentStyle_treeopenbuttonimage = function (pseudo) {
		return this._find_pseudo_obj("treeopenbuttonimage", pseudo);
	};

	_pGrid.on_find_CurrentStyle_selectpointimage = function (pseudo) {
		return this._find_pseudo_obj("selectpointimage", pseudo);
	};

	_pGrid.on_find_CurrentStyle_background = function (pseudo) {
		var rowcount = this._getGridRowCount();
		var obj = nexacro.Component.prototype.on_find_CurrentStyle_background.call(this, pseudo);
		if (this.getElement() && rowcount == 0 && this._bodyBand == null && this._is_created) {
			var imgurl = this.nodataimage;
			if (imgurl.length) {
				var color = "transparent";
				if (obj) {
					color = obj.color;
				}
				obj = nexacro._getCachedStyleObj("background", color + " " + imgurl + " center middle");
			}
		}
		return obj;
	};

	_pGrid.on_find_CurrentStyle_align = function (pseudo) {
		return this._find_pseudo_obj("align", pseudo, "align");
	};


	_pGrid.on_update_style_cursor = function () {
		if (this._is_created) {
			this._clearAllStyleCache();
		}
		this.on_apply_style_cursor(this.currentstyle.cursor = this.on_find_CurrentStyle_cursor(this._pseudo));
		this._refreshAll();
	};

	_pGrid.on_update_style_background = function () {
		if (this._is_created) {
			this._clearAllStyleCache();
		}
		this.on_apply_style_background(this.currentstyle.background = this.on_find_CurrentStyle_background(this._pseudo));
	};

	_pGrid.on_update_style_gradation = function () {
		if (this._is_created) {
			this._clearAllStyleCache();
		}
		this.on_apply_style_gradation(this.currentstyle.gradation = this.on_find_CurrentStyle_gradation(this._pseudo));
	};

	_pGrid.on_update_style_font = function () {
		if (this._is_created) {
			this._clearAllStyleCache();
		}
		this.on_apply_style_font(this.currentstyle.font = this.on_find_CurrentStyle_font(this._pseudo));
	};

	_pGrid.on_update_style_letterspace = function () {
		if (this._is_created) {
			this._clearAllStyleCache();
		}
		this.on_apply_style_letterspace(this.currentstyle.letterspace = this.on_find_CurrentStyle_letterspace(this._pseudo));
	};

	_pGrid.on_update_style_padding = function () {
		if (this._is_created) {
			this._clearAllStyleCache();
		}

		var padding = this.currentstyle.padding = this.on_find_CurrentStyle_padding(this._pseudo);
		this._control_element.setElementPadding(padding);
		this._updateClientSize(this._control_element);
	};

	_pGrid.on_update_style_align = function () {
		if (this._is_created) {
			this._clearAllStyleCache();
		}
		this.on_apply_style_align(this.currentstyle.align = this.on_find_CurrentStyle_align(this._pseudo));
	};

	_pGrid.on_update_style_color = function () {
		if (this._is_created) {
			this._clearAllStyleCache();
		}
		nexacro.Component.prototype.on_update_style_color.call(this);
	};

	_pGrid.on_update_style_line = function () {
		if (this._is_created) {
			this._clearAllStyleCache();
		}
		this.on_apply_style_line(this.currentstyle.line = this.on_find_CurrentStyle_line(this._pseudo));
	};

	_pGrid.on_update_style_linetype = function () {
		if (this._is_created) {
			this._clearAllStyleCache();
		}
		this.on_apply_style_linetype(this.currentstyle.linetype = this.on_find_CurrentStyle_linetype(this._pseudo));
	};

	_pGrid.on_update_style_selectline = function () {
		if (this._is_created) {
			this._clearAllStyleCache();
		}
		this.on_apply_style_selectline(this.currentstyle.selectline = this.on_find_CurrentStyle_selectline(this._pseudo));
	};

	_pGrid.on_update_style_selectlinetype = function () {
		if (this._is_created) {
			this._clearAllStyleCache();
		}
		this.on_apply_style_selectlinetype(this.currentstyle.selectlinetype = this.on_find_CurrentStyle_selectlinetype(this._pseudo));
	};

	_pGrid.on_update_style_treeclosebuttonimage = function () {
		if (this._is_created) {
			this._clearAllStyleCache();
		}
		this.on_apply_style_treeclosebuttonimage(this.currentstyle.treeclosebuttonimage = this.on_find_CurrentStyle_treeclosebuttonimage(this._pseudo));
	};

	_pGrid.on_update_style_treecollapseimage = function () {
		if (this._is_created) {
			this._clearAllStyleCache();
		}
		this.on_apply_style_treecollapseimage(this.currentstyle.treecollapseimage = this.on_find_CurrentStyle_treecollapseimage(this._pseudo));
	};

	_pGrid.on_update_style_treeexpandimage = function () {
		if (this._is_created) {
			this._clearAllStyleCache();
		}
		this.on_apply_style_treeexpandimage(this.currentstyle.treeexpandimage = this.on_find_CurrentStyle_treeexpandimage(this._pseudo));
	};

	_pGrid.on_update_style_treeitemimage = function () {
		if (this._is_created) {
			this._clearAllStyleCache();
		}
		this.on_apply_style_treeitemimage(this.currentstyle.treeitemimage = this.on_find_CurrentStyle_treeitemimage(this._pseudo));
	};

	_pGrid.on_update_style_treelinetype = function () {
		if (this._is_created) {
			this._clearAllStyleCache();
		}
		this.on_apply_style_treelinetype(this.currentstyle.treelinetype = this.on_find_CurrentStyle_treelinetype(this._pseudo));
	};

	_pGrid.on_update_style_treeopenbuttonimage = function () {
		if (this._is_created) {
			this._clearAllStyleCache();
		}
		this.on_apply_style_treeopenbuttonimage(this.currentstyle.treeopenbuttonimage = this.on_find_CurrentStyle_treeopenbuttonimage(this._pseudo));
	};

	_pGrid.on_update_style_selectpointimage = function () {
		this.on_apply_style_selectpointimage(this.currentstyle.selectpointimage = this.on_find_CurrentStyle_selectpointimage(this._pseudo));
	};


	_pGrid.on_apply_style_font = function (font) {
		if (!this.enableredraw) {
			this._enable_redraw_history["refreshall"] = true;
			return;
		}
		if (this._is_created) {
			this._refreshAll();
		}
	};

	_pGrid.on_apply_style_letterspace = function (letterspace) {
		if (!this.enableredraw) {
			this._enable_redraw_history["refreshall"] = true;
			return;
		}
		if (this._is_created) {
			this._refreshAll();
		}
	};

	_pGrid.on_apply_style_letterspace = function (letterspace) {
		if (!this.enableredraw) {
			this._enable_redraw_history["refreshall"] = true;
			return;
		}
		if (this._is_created) {
			this._refreshAll();
		}
	};

	_pGrid.on_apply_style_color = function (color) {
		if (!this.enableredraw) {
			this._enable_redraw_history["refreshall"] = true;
			return;
		}
		if (this._is_created) {
			this._refreshAll();
		}
	};

	_pGrid.on_apply_style_align = function (align) {
		if (!this.enableredraw) {
			this._enable_redraw_history["refreshall"] = true;
			return;
		}
		if (this._is_created) {
			this._refreshAll();
		}
	};

	_pGrid.on_apply_style_linetype = function (linetype) {
		if (!this.enableredraw) {
			this._enable_redraw_history["refreshall"] = true;
			return;
		}
		if (this._is_created) {
			this._refreshAll();
		}
	};

	_pGrid.on_apply_style_line = function (line) {
		if (!this.enableredraw) {
			this._enable_redraw_history["refreshall"] = true;
			return;
		}
		if (this._is_created) {
			this._refreshAll();
		}
	};

	_pGrid.on_apply_style_selectline = function (selectline) {
		if (!this.enableredraw) {
			this._enable_redraw_history["refreshall"] = true;
			return;
		}
		if (this._is_created) {
			this._refreshAll();
		}
	};

	_pGrid.on_apply_style_selectlinetype = function (selectlinetype) {
		if (!this.enableredraw) {
			this._enable_redraw_history["refreshall"] = true;
			return;
		}
		if (this._is_created) {
			this._refreshAll();
		}
	};

	_pGrid.on_apply_style_treeclosebuttonimage = function (treeclosebuttonimage) {
		if (!this.enableredraw) {
			this._enable_redraw_history["refreshall"] = true;
			return;
		}
		if (this._is_created) {
			this._refreshAll();
		}
	};

	_pGrid.on_apply_style_treecollapseimage = function (treecollapseimage) {
		if (!this.enableredraw) {
			this._enable_redraw_history["refreshall"] = true;
			return;
		}
		if (this._is_created) {
			this._refreshAll();
		}
	};

	_pGrid.on_apply_style_treeexpandimage = function (treeexpandimage) {
		if (!this.enableredraw) {
			this._enable_redraw_history["refreshall"] = true;
			return;
		}
		if (this._is_created) {
			this._refreshAll();
		}
	};

	_pGrid.on_apply_style_treeitemimage = function (treeitemimage) {
		if (!this.enableredraw) {
			this._enable_redraw_history["refreshall"] = true;
			return;
		}
		if (this._is_created) {
			this._refreshAll();
		}
	};

	_pGrid.on_apply_style_treelinetype = function (treelinetype) {
		if (!this.enableredraw) {
			this._enable_redraw_history["refreshall"] = true;
			return;
		}
		if (this._is_created) {
			this._refreshAll();
		}
	};

	_pGrid.on_apply_style_treeopenbuttonimage = function (treeopenbuttonimage) {
		if (!this.enableredraw) {
			this._enable_redraw_history["refreshall"] = true;
			return;
		}
		if (this._is_created) {
			this._refreshAll();
		}
	};

	_pGrid.on_apply_style_selectpointimage = function (treeopenbuttonimage) {
		if (!this.enableredraw) {
			return;
		}
		if (!this._is_created) {
			return;
		}

		if (this._select_ctrl) {
			this._select_ctrl._updateAll();
		}
	};

	_pGrid._find_bandcomp_pseudo_obj = function (band, styleProp, pseudo, returnType) {
		var bandctrl;
		var format = this._curFormat;

		if (band == "head") {
			bandctrl = this._headBand;

			if (!bandctrl) {
				bandctrl = this._temphead;

				if (!bandctrl) {
					bandctrl = this._temphead = new nexacro.GridBand("head", 0, 0, 0, 0, this, format._headband);
				}
			}
		}
		else if (band == "summ" || band == "summary") {
			bandctrl = this._summBand;

			if (!bandctrl) {
				bandctrl = this._tempsumm;

				if (!bandctrl) {
					bandctrl = this._tempsumm = new nexacro.GridBand("summ", 0, 0, 0, 0, this, format._summband);
				}
			}
		}
		else {
			bandctrl = this._bodyBand;
		}

		var obj = null;

		if (bandctrl) {
			if (band == "summ" || band == "summary") {
				obj = nexacro.Component.prototype._find_pseudo_obj.call(bandctrl, styleProp, pseudo, returnType);

				if (!obj) {
					bandctrl.id = "summary";
					obj = nexacro.Component.prototype._find_pseudo_obj.call(bandctrl, styleProp, pseudo, returnType);
					bandctrl.id = "summ";
				}
			}
			else {
				obj = nexacro.Component.prototype._find_pseudo_obj.call(bandctrl, styleProp, pseudo, returnType);
			}
		}

		return obj;
	};

	_pGrid.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var text_elem = this._text_elem = new nexacro.TextBoxElement(control_elem);
			text_elem.setElementSize(this._client_width, this._client_height);
			text_elem.setElementVisible(false);
			text_elem.setElementAlignXY("center", "middle");
			text_elem.setElementWordWrap("char");

			this._createBandsAndAreas();
		}
	};

	_pGrid.on_created_contents = function () {
		var text_elem = this._text_elem;
		if (text_elem) {
			text_elem.create();
		}

		var body_band = this._bodyBand;
		if (body_band) {
			body_band.on_created();
		}

		var head_band = this._headBand;
		if (head_band) {
			head_band.on_created();
		}

		var summ_band = this._summBand;
		if (summ_band) {
			summ_band.on_created();
		}

		var select_ctrl = this._select_ctrl;
		if (select_ctrl) {
			select_ctrl.on_created();
		}

		if (body_band || head_band || summ_band) {
			this._onResetScrollBar();
			this._applyAutofittype(true);
		}

		if (this._create_selection != null) {
			var sel = this._create_selection;
			this._resetSelect(sel.row, sel.cell, sel.col, sel.subrow, sel.pivot);
		}

		this._create_selection = null;
		this._is_created = true;

		if (this._tree_recreate == true) {
			this._recreate_contents_all(true, true, true);
			this._tree_recreate = false;
		}
		else if (this._image_recreate == true) {
			this._recreate_contents_all(true, true, true);
			this._image_recreate = false;
		}
		else if (this.autosizingtype != "none") {
			this._recreate_contents_all(true, true, true);
		}
		else {
			this._refreshBody();
		}

		if (nexacro._enableaccessibility && !this._accept_focus) {
			var accessibility = this.on_find_CurrentStyle_accessibility(this._pseudo);
			if (accessibility && accessibility.enable) {
				this._accept_focus = true;
			}
		}
		this.on_apply_nodatatext();
		this.on_apply_nodataimage();

		if (this._control_element) {
			this._control_element._arrangeBandOrder();
		}

		this.on_apply_prop_rtldirection();
		this._adjustOverlayElements(true, this._is_use_fakemerge);
	};

	_pGrid.on_destroy_contents = function () {
		if (this._binddataset) {
			this._removeDSEventHandlers(this._binddataset);
		}

		if (this._aniframe_rowscroll) {
			this._aniframe_rowscroll.destroy();
		}
		if (this._aniframe_colscroll) {
			this._aniframe_colscroll.destroy();
		}

		var text_elem = this._text_elem;
		if (text_elem) {
			text_elem.destroy();
			this._text_elem = null;
		}

		var formats = this._formats;
		if (formats) {
			for (var id in formats) {
				var format = formats[id];

				if (format && format.destroy) {
					format.destroy();
					formats[id] = null;
				}
			}
		}
		this._select_ctrl = null;

		this._destroyBands(true);

		if (this._currentCellEditor) {
			this._currentCellEditor.destroy();
			this._currentCellEditor = null;
			this._tempEditor = null;
		}

		this._clearDestroyEditor();

		if (this._displaycalendarctrl) {
			delete this._displaycalendarctrl;
			this._displaycalendarctrl = null;
		}

		this._binddataset = null;
		if (this._tempEditor) {
			this._tempEditor.destroy();
			this._tempEditor = null;
		}
		if (this._resizer_colctrl) {
			this._resizer_colctrl.destroy();
		}
		if (this._resizer_rowctrl) {
			this._resizer_rowctrl.destroy();
		}

		if (this._extratrack_timer) {
			this._extratrack_timer._handle.stop();
			this._extratrack_timer._handle = null;
			this._extratrack_timer = null;
		}

		this._destroyOverlayElements();

		this._curFormat = null;
		this._formats = null;
		this._mouseovercell = null;
		this._prevAreaCellObj = null;
		this._selectstartrow = null;
		this._selectstartcol = null;
		this._selectstartsubrow = null;
		this._selectstartpvt = null;
		this._selectendrow = null;
		this._selectendcol = null;
		this._selectendsubrow = null;
		this._selectendpvt = null;
		this._resizerCols = null;
		this._resizerRows = null;
		this._imgsize_cache = null;
		this._rowSizeListSub = null;
		this._rowSizeList = null;
		this._rowHeadListSub = null;
		this._rowHeadList = null;
		this._rowSummListSub = null;
		this._rowSummList = null;
		this._toprowpos = null;
		this._selectinfo = null;
		this._recreate_contents_proc = null;
		this._keydown_elem = null;
		this._tree_load_all = null;
		this._image_load_all = null;
		this._focus_proc = null;
		this._after_recreate_contents_all = null;
		this._band_scroll_sizes = null;
		this._format_str = null;
		this._exprcache = null;
		this._is_use_bind_expr_outerstyle = null;
		this._is_use_bind_expr_prop = null;
		this._is_use_bind_expr_style = null;
		this._setdataobj = null;
		this._resizer_colctrl = null;
		this._resizer_rowctrl = null;
		this.selectstartrow = null;
		this.selectstartcol = null;
		this.selectstartsubrow = null;
		this.selectstartpivot = null;
		this.selectendrow = null;
		this.selectendcol = null;
		this.selectendsubrow = null;
		this.selectendpivot = null;
		this.formats = null;
		this._destroyeditors = null;
		this._overlay_elements = null;
		this._recalcXY_info = null;
		this._fake_mergecell_arr = null;
		this._enable_redraw_history = null;
		this._autofitcol_rate = null;
		this._org_treeStates = null;
	};

	_pGrid._is_changingRect = false;
	_pGrid.on_change_containerRect = function (width, height) {
		if (this._is_changingRect) {
			return;
		}

		this._is_changingRect = true;
		this._resizeBand();
		this._adjustOverlayElements(true, this._is_use_fakemerge);
		this._is_changingRect = false;
	};

	_pGrid.on_create_control_element = function (parent_elem) {
		var control_elem = new nexacro.GridScrollableControlElement(parent_elem);
		control_elem.setLinkedControl(this);
		this._control_element = control_elem;
		return control_elem;
	};

	_pGrid._on_deactivate = function () {
		if (!this._isSelected()) {
			this._stat_change("notfocus", "normal");
		}
	};

	_pGrid.on_update_position = function (resize_flag, move_flag) {
		nexacro.Component.prototype.on_update_position.call(this, resize_flag, move_flag);

		if (this._currentCellEditor && this._currentCellEditor._isPopupVisible()) {
			this._currentCellEditor.on_update_position(resize_flag, move_flag);
		}
	};

	_pGrid.applyto_bindSource = function (propid, Val) {
		if (this._currentCellEditor) {
			this._currentCellEditor._setDataset();
		}
	};

	_pGrid._getAccessibilityRole = function (accessibility) {
		var role = accessibility.role ? accessibility.role : this._accessibility_role;
		if (this._hasTree) {
			role = "treegrid";
		}
		return role;
	};

	_pGrid._isAccessibilityEnable = function () {
		return this._accept_focus;
	};

	_pGrid.on_get_style_accessibility_label = function () {
		return this.id;
	};


	_pGrid.on_fire_sys_onaccessibilitygesture = function (direction, fire_comp, refer_comp) {
		var ret = false;
		var curFormat = this._curFormat;
		if (curFormat) {
			var headcells_len = (curFormat._headcells) ? curFormat._headcells.length : 0;
			var bodycells_len = (curFormat._bodycells) ? curFormat._bodycells.length : 0;
			var summcells_len = (curFormat._summcells) ? curFormat._summcells.length : 0;

			if (this._accessibility_cellidx < 0 && this._accessibility_row < 0) {
				if (direction) {
					this._currentBand = "head";
					this._accessibility_row = 0;
					this._accessibility_cellidx = -1;
				}
				else {
					this._currentBand = "summ";
					this._accessibility_row = 0;
					this._accessibility_cellidx = summcells_len;
				}
			}

			var cellobj = null;
			while (true) {
				cellobj = null;

				if (direction) {
					this._accessibility_cellidx++;
				}
				else {
					this._accessibility_cellidx--;
				}

				if (this._currentBand == "head") {
					if (direction) {
						if (!this._headBand || this._accessibility_cellidx >= headcells_len) {
							this._currentBand = "body";
							this._accessibility_row = 0;
							this._accessibility_cellidx = 0;


							if (this.rowcount <= 0 && this.nodatatext) {
								this._bodyBand._setAccessibilityNotifyEvent();
								ret = true;
								break;
							}
						}
					}
					else {
						if (!this._headBand || this._accessibility_cellidx < 0) {
							this._accessibility_row = -1;
							this._accessibility_cellidx = -1;
							ret = false;
							break;
						}
					}
				}
				else if (this._currentBand == "summ") {
					if (direction) {
						if (!this._summBand || this._accessibility_cellidx >= summcells_len) {
							this._accessibility_row = -1;
							this._accessibility_cellidx = -1;
							ret = false;
							break;
						}
					}
					else {
						if (!this._summBand || this._accessibility_cellidx < 0) {
							this._currentBand = "body";
							this._accessibility_row = this._rowcount - 1;
							this._accessibility_cellidx = bodycells_len - 1;


							if (this.rowcount <= 0 && this.nodatatext) {
								this._bodyBand._setAccessibilityNotifyEvent();
								ret = true;
								break;
							}
						}
					}
				}
				else {
					if (direction) {
						if (this._accessibility_cellidx >= bodycells_len) {
							this._accessibility_row++;
							this._accessibility_cellidx = 0;
						}

						if (this._rowcount <= 0 || this._accessibility_row >= this._rowcount) {
							this._currentBand = "summ";
							this._accessibility_row = 0;
							this._accessibility_cellidx = 0;
						}
					}
					else {
						if (this._accessibility_cellidx < 0) {
							this._accessibility_row--;
							this._accessibility_cellidx = bodycells_len - 1;
						}

						if (this._rowcount <= 0 || this._accessibility_row < 0) {
							this._currentBand = "head";
							this._accessibility_row = 0;
							this._accessibility_cellidx = headcells_len - 1;
						}
					}
				}

				cellobj = this._getAccessibilityCurrentCell(this._accessibility_row, this._accessibility_cellidx);

				if (cellobj) {
					cellobj._setAccessibilityNotifyEvent();
					ret = true;
					break;
				}
			}
		}
		return ret;
	};

	_pGrid._setAccessibilityNotifyEvent = function (direction) {
		this._resetScrollPos(this, this._adjust_left, this._adjust_top, this._adjust_left + this._adjust_width, this._adjust_top + this._adjust_height, (direction && direction > 0) ? 0 : 1);
		this._accessibility_row = -1;
		this._accessibility_cellidx = -1;
		this.on_fire_sys_onaccessibilitygesture(direction);
	};

	_pGrid._setAccessibilityInfoByHover = function (control) {
		var ret = false;
		if (control) {
			if (control._cellobj) {
				control = control._cellobj;
			}

			if (control instanceof nexacro.GridCell) {
				this._currentBand = control._band.id;
				this._accessibility_cellidx = control._cellidx;
				this._accessibility_row = this._getDataRow(control._rowidx);
				this._first_focus = true;
			}
			else {
				this._first_focus = false;
			}

			ret = control._setAccessibilityInfoByHover();
		}
		return ret;
	};

	_pGrid.on_apply_prop_class = function () {
		this._clearAllStyleCache();
		if (this._bodyBand) {
			this._bodyBand._css_finder = null;
			this._bodyBand._ref_css_finder = null;
		}
		if (this._headBand) {
			this._headBand._css_finder = null;
			this._headBand._ref_css_finder = null;
		}
		if (this._summBand) {
			this._summBand._css_finder = null;
			this._summBand._ref_css_finder = null;
		}

		nexacro.Component.prototype.on_apply_prop_class.call(this);

		if (this._is_created) {
			this._refreshAll(true);
		}
	};

	_pGrid.set_fillareatype = function (v) {
		switch (v) {
			case "none":
			case "linerow":
			case "datarow":
			case "controlrow":
			case "allrow":
				if (v != this.fillareatype) {
					this.fillareatype = v;
					this.on_apply_fillareatype();
				}
				break;
		}
	};

	_pGrid.on_apply_fillareatype = function () {
		this._resetfillarea = true;
		this._recreate_contents_all(false, false, false, true);
		this._resetfillarea = false;
	};

	_pGrid.set_selectscrollmode = function (v) {
		switch (v) {
			case "select":
			case "scroll":
				this._selectscrollmode = this.selectscrollmode = v;
				break;
			case "default":
				this._selectscrollmode = (nexacro.isTouchInteraction) ? "scroll" : "select";
				break;
		}
	};

	_pGrid.set_scrollpixel = function (v) {
		if (v != this.scrollpixel) {
			switch (v) {
				case "none":
				case "all":
					this.scrollpixel = this._scrollpixel = v;
					this.on_apply_scrollpixel();
					break;
				case "default":
					this.scrollpixel = v;
					this._scrollpixel = (nexacro.isTouchInteraction) ? "all" : "none";
					this.on_apply_scrollpixel();
					break;
			}
		}
	};

	_pGrid.on_apply_scrollpixel = function () {
		this._updateScrollInfo();
	};

	_pGrid._updateScrollInfo = function () {
		if (this._control_element) {
			this._control_element._updateClientSize();
			this._updateClientSize(this._control_element);
		}
	};

	_pGrid.set_hideendline = function (v) {
		switch (v) {
			case "none":
			case "row":
			case "col":
			case "both":
				if (v != this.hideendline) {
					this.hideendline = v;
					this.on_apply_hideendline();
				}
				break;
		}
	};

	_pGrid.on_apply_hideendline = function () {
		this._refreshAll();
	};

	_pGrid.set_userdata = function (v) {
		if (this.userdata != v) {
			this.userdata = v;
		}
	};

	_pGrid.set_nodataimage = function (v) {
		if (v.substring(0, 4).toLowerCase() != "url(") {
			v = "URL(" + v + ")";
		}

		this.nodataimage = v;
		this.on_apply_nodataimage();
	};

	_pGrid.on_apply_nodataimage = function () {
		if (this.getElement()) {
			var body = this._bodyBand;
			if (body) {
				body._control_pseudo = "";
				body._contents_pseudo = "";
				body._stat_change();
			}
			else {
				this._control_pseudo = "";
				this._contents_pseudo = "";
				this._stat_change();
			}
		}
	};

	_pGrid.set_nodatatext = function (v) {
		this.nodatatext = v;
		this.on_apply_nodatatext();
	};

	_pGrid.on_apply_nodatatext = function () {
		var rowcount = this._getGridRowCount();
		if (this.getElement() && rowcount == 0) {
			var body = this._bodyBand;
			if (body) {
				if (this._text_elem) {
					this._text_elem.setElementVisible(false);
				}

				body.on_apply_text();
			}
			else {
				if (this._text_elem) {
					var text = this.nodatatext;
					var font = this.on_find_CurrentStyle_font();
					var color = this.on_find_CurrentStyle_color();
					var letterspace = this.on_find_CurrentStyle_letterspace();
					this._text_elem.setElementVisible(true);
					this._text_elem.setElementText(text);
					this._text_elem.setElementFont(font);
					this._text_elem.setElementLetterSpace(letterspace);
					this._text_elem.setElementColor(color);
				}
			}
		}
		else {
			if (this._text_elem) {
				this._text_elem.setElementVisible(false);
			}
		}
	};

	_pGrid.set_summarytype = function (v) {
		switch (v) {
			case "default":
			case "top":
			case "left":
			case "lefttop":
				if (v != this.summarytype) {
					this.summarytype = v;
					this.on_apply_summarytype();
				}
				break;
		}
	};

	_pGrid.on_apply_summarytype = function () {
		if (this.getElement() && this._curFormat != null && this._curFormat.summHeight > 0) {
			this._recreate();
		}
	};

	_pGrid.set_suppresslevel = function (v) {
		switch (v) {
			case "sameskip":
			case "allskip":
			case "allcompare":
				if (v != this.suppresslevel) {
					this.suppresslevel = v;
					this.on_apply_suppresslevel();
				}
				break;
		}
	};

	_pGrid.on_apply_suppresslevel = function () {
		if (this.getElement() && this._curFormat != null) {
			this._refreshBody();
		}
	};

	_pGrid.set_useselcolor = function (v) {
		v = nexacro._toBoolean(v);
		this.useselcolor = v;
		this.on_apply_useselcolor();
	};

	_pGrid.on_apply_useselcolor = function () {
		this._refreshBody();
	};

	_pGrid.setBindDataset = function (obj) {
		if (obj instanceof nexacro.Dataset) {
			if (this._binddataset) {
				this._removeDSEventHandlers(this._binddataset);
			}

			if (!obj) {
				this._binddataset = null;
				this.binddataset = "";
			}
			else {
				this._binddataset = obj;
				this.binddataset = obj.id;
			}
			this.on_apply_prop_binddataset();
		}
	};

	_pGrid.getBindDataset = function () {
		return this._binddataset;
	};

	_pGrid.set_binddataset = function (str) {
		if (typeof str != "string") {
			this.setBindDataset(str);
			return;
		}
		if (str != this.binddataset) {
			if (this._binddataset) {
				this._removeDSEventHandlers(this._binddataset);
			}

			if (!str) {
				this._binddataset = null;
				this.binddataset = "";
			}
			else {
				str = str.replace("@", "");
				this._binddataset = this._findDataset(str);
				this.binddataset = str;
			}
			this.on_apply_prop_binddataset();
		}
		else if (this.binddataset && !this._binddataset) {
			this._setBindDatasetStr(this.binddataset);
			this.on_apply_prop_binddataset();
		}
		return this.binddataset;
	};

	_pGrid.on_apply_prop_binddataset = function () {
		var dsobj = this._binddataset;
		if (dsobj) {
			this.binddataset = dsobj.id;
			this.rowcount = this._rowcount = dsobj.rowcount;
			this._rowposition = dsobj.rowposition;

			this._exprcache = {
			};
			this._initTreeStates();
			this._clearAllStyleCache();
			this._recreate_contents_all(true, true, true);
			this._initSelect(this._rowposition);
			this._setDSEventHandlers(dsobj);
		}
		else {
			this.rowcount = this._rowcount = 0;
			this._rowposition = -1;
			this._exprcache = {
			};
			this._initTreeStates();
			this._clearAllStyleCache();
			this._recreate_contents_all(true, true, true);
		}
	};

	_pGrid.set_formatid = function (v) {
		if (this.formatid != v) {
			this.formatid = v;
			this.on_apply_formatid();
		}
	};

	_pGrid.on_apply_formatid = function () {
		var formatid = this.formatid;
		if (formatid == "") {
			formatid = "default";
		}

		this._curFormat = this._formats[formatid];
		this._autofitcol_rate = [];
		this._recreate();
		this._resetSelect(this._rowposition);
	};

	_pGrid.set_formats = function (v) {
		this.formats = v;
		this.on_apply_formats();
	};

	_pGrid.on_apply_formats = function () {
		this._setContents(this.formats);
		this._recreate();
		this._resetSelect(this._rowposition);
	};

	_pGrid.set_locale = function (v) {
		if (v != this.locale) {
			this.locale = v;
			if (this._locale != v) {
				this._locale = v;
				this.on_apply_locale();
			}
		}
	};

	_pGrid.on_apply_locale = function () {
		var _locale = this._locale;
		if (this._headBand) {
			this._headBand._setLocale(_locale);
		}
		if (this._bodyBand) {
			this._bodyBand._setLocale(_locale);
		}
		if (this._summBand) {
			this._summBand._setLocale(_locale);
		}
	};

	_pGrid.set_areaselecttype = function (v) {
		if (this.areaselecttype != v) {
			switch (v) {
				case "overband":
				case "limitband":
					this.areaselecttype = v;

					break;
			}
		}
	};

	_pGrid.set_autoenter = function (v) {
		if (this.autoenter != v) {
			switch (v) {
				case "select":
				case "key":
				case "none":
					this.autoenter = v;

					break;
			}
		}
	};

	_pGrid.set_autofitbandtype = function (v) {
		if (this.autofitbandtype != v) {
			switch (v) {
				case "body":
				case "allband":
				case "nohead":
				case "noleft":
				case "nohead,noleft":
					this.autofitbandtype = v;

					break;
			}
		}
	};

	_pGrid.set_autofitminheight = function (v) {
		if (this.autofitminheight != v) {
			this.autofitminheight = (isNaN(v) ? 100 : parseInt(v, 10));
		}
	};

	_pGrid.set_autofitminwidth = function (v) {
		if (this.autofitminwidth != v) {
			this.autofitminwidth = (isNaN(v) ? 100 : parseInt(v, 10));
		}
	};

	_pGrid.set_autofittype = function (v) {
		if (this.autofittype != v) {
			switch (v) {
				case "none":
				case "col":
				case "row":
				case "both":
				case "allpivot":
				case "allrow":
				case "allboth":
				case "col,allrow":
				case "row,allpivot":
					this.autofittype = v;
					this.on_apply_prop_autofittype();
					break;
			}
		}
	};

	_pGrid.on_apply_prop_autofittype = function () {
		if (this._curFormat) {
			this._curFormat._resetOrgColSize(true, this._autofitcol_rate);
		}

		this._applyAutofittype(true, true);
	};

	_pGrid.set_visible = function (v) {
		if (v === undefined || v === null) {
			return;
		}
		v = nexacro._toBoolean(v);

		if (this.visible != v) {
			nexacro.Component.prototype.set_visible.call(this, v);
			if (v && this._is_created) {
				this._refreshAll();
				if (nexacro.Browser == "Chrome" && this.vscrollbar) {
					this._absolutelyResetScrollPos(true);
					var limit = this._control_element.vscroll_limit;
					var top = this.vscrollbar._pos;
					if (top >= limit) {
						top = limit;
						this._control_element.setElementVScrollPos(top - 1);
					}
					else {
						this._control_element.setElementVScrollPos(top + 1);
					}
					this._control_element.setElementVScrollPos(top);
					this._absolutelyResetScrollPos(false);
				}
			}
		}
	};

	_pGrid.set_autosizebandtype = function (v) {
		if (this.autosizebandtype != v) {
			switch (v) {
				case "body":
					this._bodyAutoSize = true;
					this._headAutoSize = false;
					this._summAutoSize = false;
					this._AutoSizeLcol = false;
					this._AutoSizeRcol = false;
					break;
				case "head":
					this._bodyAutoSize = false;
					this._headAutoSize = true;
					this._summAutoSize = false;
					this._AutoSizeLcol = false;
					this._AutoSizeRcol = false;
					break;
				case "summary":
					this._bodyAutoSize = false;
					this._headAutoSize = false;
					this._summAutoSize = true;
					this._AutoSizeLcol = false;
					this._AutoSizeRcol = false;
					break;
				case "allband":
					this._bodyAutoSize = true;
					this._headAutoSize = true;
					this._summAutoSize = true;
					this._AutoSizeLcol = true;
					this._AutoSizeRcol = true;
					break;
				case "nohead":
					this._bodyAutoSize = true;
					this._headAutoSize = false;
					this._summAutoSize = true;
					this._AutoSizeLcol = false;
					this._AutoSizeRcol = false;
					break;
				case "noleft":
					this._bodyAutoSize = true;
					this._headAutoSize = true;
					this._summAutoSize = true;
					this._AutoSizeLcol = false;
					this._AutoSizeRcol = true;
					break;
				case "nohead,noleft":
					this._bodyAutoSize = true;
					this._headAutoSize = false;
					this._summAutoSize = true;
					this._AutoSizeLcol = false;
					this._AutoSizeRcol = true;
					break;
			}
			this.autosizebandtype = v;
			this.on_apply_autosizebandtype();
		}
	};

	_pGrid.on_apply_autosizebandtype = function () {
		if (this.getElement()) {
			this._recreate_contents_all(true, true, true);
		}
	};

	_pGrid.set_autosizingtype = function (v) {
		if (this.autosizingtype != v) {
			var size = false;
			if (this.extendsizetype == "row" || this.extendsizetype == "both") {
				size = true;
			}

			switch (v) {
				case "none":
				case "col":
					this._rowSizeEx = size;
					break;
				case "row":
				case "both":
					this._rowSizeEx = true;
					break;
			}
			if (v == "row" || v == "none" || !v) {
				if (this._curFormat) {
					this._curFormat._resetOrgColSize(true, this._autofitcol_rate);
				}
			}
			this.autosizingtype = v;
		}
		this.on_apply_autosizingtype();
	};

	_pGrid.on_apply_autosizingtype = function () {
		if (this.getElement()) {
			this._isUserChangeHeadRowSize = false;
			this._isUserChangeBodyRowSize = false;
			this._isUserChangeSummRowSize = false;

			this._recreate_contents_all(true, true, true);
		}
	};

	_pGrid.set_readonly = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.readonly) {
			this.readonly = v;
			this.on_apply_readonly();
		}
	};

	_pGrid.on_apply_readonly = function (val) {
		var v = this.readonly;
		if (v) {
			this._stat_change("readonly", this._pseudo);
		}
		else {
			this._stat_change("writable", this._pseudo == "readonly" ? "normal" : this._pseudo);
		}
	};

	_pGrid.set_selectbandtype = function (v) {
		if (this.selectbandtype != v) {
			switch (v) {
				case "default":
				case "allband":
				case "body":
				case "nohead":
				case "noleft":
					this.selectbandtype = v;
					this.on_apply_selectbandtype();
					break;
			}
		}
	};

	_pGrid.on_apply_selectbandtype = function () {
	};

	_pGrid.set_selectchangetype = function (v) {
		if (this.selectchangetype != v) {
			switch (v) {
				case "up":
				case "down":
					this.selectchangetype = v;
					break;
			}
		}
	};

	_pGrid.set_selecttype = function (v) {
		if (this.selecttype != v) {
			switch (v) {
				case "row":
				case "cell":
				case "area":
				case "multirow":
				case "multicell":
				case "multiarea":
				case "treecell":
				case "multitreecell":
					this.selecttype = v;
					this.on_apply_selecttype();
					break;
				default:
					if (this.selecttype != "row") {
						this.selecttype = "row";
						this.on_apply_selecttype();
					}
					break;
			}
		}
	};

	_pGrid.on_apply_selecttype = function () {
		this._resetSelect();
		this._refreshBody();
		this._updateSelector();
	};

	_pGrid._applySelectorScroll = function (type, area) {
		var oldpos, new_pos, newpos;
		var format = this._curFormat;
		var retn = false;
		var topPos = this._toprowpos[0];
		var ctrl_flag = this._selectinfo.area.length > 1 && this.selecttype == "multirow";

		if (type[0] == "leftover0") {
			this._multiselect = ctrl_flag ? "ctrl" : "shift";
			this._moveToCell("prev", false, true, area, null);
			retn = true;
		}
		else if (type[0] == "rightover0") {
			this._multiselect = ctrl_flag ? "ctrl" : "shift";
			this._moveToCell("next", false, true, area, this._selectinfo.ctrlpoint.col);
			retn = true;
		}
		else if (type[0] == "leftover1") {
			this._multiselect = ctrl_flag ? "ctrl" : "shift";
			this._moveToCell("prev", false, true, area, this._selectinfo.ctrlpoint.col);
			retn = true;
		}
		else if (type[0] == "rightover1") {
			this._multiselect = ctrl_flag ? "ctrl" : "shift";
			this._moveToCell("next", false, true, area, null);
			retn = true;
		}

		if (type[1] == "topover0") {
			new_pos = this._selectinfo.currow - 1;
			oldpos = this._begrowpos;
			if (topPos != new_pos) {
				newpos = this._jumpCurrentRow(new_pos);
			}
			retn = (oldpos != newpos);
		}
		else if (type[1] == "bottomover0") {
			new_pos = this._selectinfo.currow + 1;
			oldpos = this._begrowpos;

			newpos = this._jumpCurrentRow(new_pos);
			retn = (oldpos != newpos);
		}
		else if (type[1] == "topover1") {
			new_pos = this._selectinfo.currow - 1;
			oldpos = this._begrowpos;
			if (topPos != new_pos) {
				newpos = this._jumpCurrentRow(new_pos);
			}
			retn = (oldpos != newpos);
		}
		else if (type[1] == "bottomover1") {
			new_pos = this._selectinfo.currow + 1;
			oldpos = this._begrowpos;
			newpos = this._jumpCurrentRow(new_pos);
			retn = (oldpos != newpos);
		}
		return retn;
	};

	_pGrid._startAreaSizing = function (posobj, idx) {
		var format = this._curFormat;
		var subrowlen = format._bodyrows.length;

		var info = this._getAreaInfoWithPos(posobj, idx);
		var areaInfo = this._selectinfo.area;

		if (idx == 0) {
			var cellinfo = format._bodycells[info.ecell];
			if (cellinfo) {
				this._selectinfo.ctrlpoint._set(cellinfo, info.erow, subrowlen);
			}
		}
		else if (idx == 1) {
			var cellinfo = format._bodycells[info.scell];
			if (cellinfo) {
				this._selectinfo.ctrlpoint._set(cellinfo, info.srow, subrowlen);
			}
		}
		else if (idx == 2) {
			var cellinfo = format._bodycells[info.ecell];
			if (cellinfo) {
				this._selectinfo.ctrlpoint._set(cellinfo, info.srow, subrowlen);
			}
		}
		else if (idx == 3) {
			var cellinfo = format._bodycells[info.scell];
			if (cellinfo) {
				this._selectinfo.ctrlpoint._set(cellinfo, info.erow, subrowlen);
			}
		}
	};

	_pGrid._applyAreaSizing = function (posobj, idx, is_tracking) {
		var format = this._curFormat;
		var subrowlen = format._bodyrows.length;
		var beforeCell = this._selectinfo.curcell;
		var beforeCol = this._selectinfo.curcol;
		var beforeRow = this._selectinfo.curdsrow;
		var beforeSubrow = this._selectinfo.cursubrow;
		var beforePvt = this._selectinfo.curpvt;
		var afterCell, afterCol, afterRow, afterSubrow, afterPvt = this._selectinfo.curpvt;

		var info = this._getAreaInfoWithPos(posobj, idx);

		if (idx == 0) {
			this._setSelectedInfo(info.scell, info.scol, info.srow, info.ssubrow, null, info);
			afterCell = info.scell;
			afterCol = info.scol;
			afterRow = info.srow;
			afterSubrow = info.ssubrow;
		}
		else if (idx == 1) {
			this._setSelectedInfo(info.ecell, info.ecol, info.erow, info.esubrow, null, info);
			afterCell = info.ecell;
			afterCol = info.ecol;
			afterRow = info.erow;
			afterSubrow = info.esubrow;
		}
		else if (idx == 2) {
			this._setSelectedInfo(info.scell, info.scol, info.erow, info.esubrow, null, info);
			afterCell = info.scell;
			afterCol = info.scol;
			afterRow = info.erow;
			afterSubrow = info.esubrow;
		}
		else if (idx == 3) {
			this._setSelectedInfo(info.ecell, info.ecol, info.erow, info.esubrow, null, info);
			afterCell = info.ecell;
			afterCol = info.ecol;
			afterRow = info.srow;
			afterSubrow = info.ssubrow;
		}

		var kind;
		if (is_tracking) {
			kind = "selectorsizing";
		}
		else if (is_tracking === false) {
			kind = "selector";
		}
		if (this._selectinfo.area.length > 1 && this.selecttype == "multirow") {
			this._multiselect = "ctrl";
		}
		else {
			this._multiselect = "shift";
		}
		retn = this._ChangeSelect(afterCell, afterCol, afterRow, afterSubrow, afterPvt, false, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, "body", kind);
	};

	_pGrid._getAreaInfoWithPos = function (posobj, idx) {
		var scroll_left = this._getScrollLeft();
		var scroll_top = this._getScrollTop();
		var scroll_max = this._getScollMaxLeft();
		var select_ctrl = this._select_ctrl;
		var l = posobj.l;
		var r = l + posobj.w;
		var t = posobj.t;
		var b = t + posobj.h;
		var format = this._curFormat;
		var cols = format._cols;
		var rows = format._bodyrows;
		var rowcnt = this._getGridRowCount();
		var row, srow, erow, scell, ecell, scol, ecol, ssubrow, esubrow, spvt, bpvt;
		var cell_left, cell_top, cell_right, cell_bottom;
		var arealeft;
		var toppos;
		var ctrlpoint = this._selectinfo.ctrlpoint;
		var begarea, endarea;

		if (select_ctrl) {
			begarea = select_ctrl._start_begarea;
			endarea = select_ctrl._start_endarea;
		}
		else {
			begarea = this._selectinfo.arearect.barea;
			endarea = this._selectinfo.arearect.earea;
		}


		var fixed_rowcnt = parseInt(this._fixed_rowcnt);
		var fixed_startrow = fixed_rowcnt > 0 ? parseInt(this._fixed_startrow) : 0;
		var fixed_endrow = parseInt(this._fixed_endrow);
		var fixed_height = parseInt(this._fixed_height);

		if (fixed_rowcnt > 0) {
			toppos = this._getHeadHeight();
		}
		else {
			toppos = this._getHeadHeight() - scroll_top;
		}

		if (this.summarytype == "top" || this.summarytype == "lefttop") {
			toppos += this._getSummHeight();
		}

		var row_top, row_bottom;
		var cells = format._bodycells;
		var cells_len = cells.length;
		var col, row, colspan, rowspan, area;
		var condition;
		var cell_rect;
		srow = -1;

		row_top = toppos;

		for (var i = fixed_startrow; i < rowcnt; i++) {
			if (fixed_rowcnt > 0 && i == (fixed_endrow + 1)) {
				row_top -= scroll_top;
			}
			row_bottom = row_top + this._getRowSize(i);

			if (this._track_mode == "areaselect") {
				condition = (t < row_bottom);
				if (i == 0 && t < row_top) {
					condition = true;
				}
			}
			else {
				condition = (row_top <= t && t < row_bottom);
			}

			if (srow < 0 && condition) {
				srow = this._getDataRow(i);

				for (var j = 0; j < cells_len; j++) {
					area = cells[j]._area;
					col = cells[j]._col;
					row = cells[j]._row;
					colspan = cells[j]._colspan;
					rowspan = cells[j]._rowspan;

					if (cells[j]._area == "left") {
						arealeft = this._client_left;
					}
					else if (cells[j]._area == "right") {
						arealeft = this._client_width - format.rightWidth;
					}
					else {
						arealeft = format.leftWidth - scroll_left;
					}

					cell_left = arealeft + cols[col].left;
					cell_right = arealeft + cols[col + colspan - 1].right;
					cell_top = row_top + rows[row].top;
					cell_bottom = row_top + rows[row + rowspan - 1].bottom;

					cell_rect = this._getSubCellRect(i, j, -1, -1, false);
					cell_left = cell_rect.left;
					cell_top = cell_rect.top;
					cell_right = cell_rect.right;
					cell_bottom = cell_rect.bottom;

					if (fixed_rowcnt > 0 && i <= fixed_endrow) {
						cell_top += scroll_top;
						cell_bottom += scroll_top;
					}

					if (this._track_mode == "areaselect") {
						condition = (cell_left <= l && l < cell_right && t < cell_bottom);
						if (j == 0 && l < cell_left) {
							condition = true;
						}
					}
					else {
						condition = (cell_left <= l && l < cell_right && t < cell_bottom);
					}

					if (condition) {
						if (endarea != begarea || (begarea == "body" && endarea == "body")) {
							if (begarea != "left" && scroll_left > 0 && area == "left") {
								continue;
							}

							if (begarea != "right" && scroll_left < scroll_max && area == "right") {
								continue;
							}

							if (endarea != "right" && area == "right") {
								continue;
							}
						}

						scell = j;
						scol = col;
						ssubrow = row;

						if (posobj.area != "right") {
							break;
						}
						else if (cells[j]._area == "right") {
							break;
						}
					}
				}
			}


			if (this._track_mode == "areaselect") {
				condition = b < row_bottom;

				if ((i + 1) == rowcnt && b >= row_bottom) {
					condition = true;
				}
			}
			else {
				condition = row_top < b && b <= row_bottom;
			}

			if (srow >= 0 && condition) {
				erow = this._getDataRow(i);

				for (var j = 0; j < cells_len; j++) {
					col = cells[j]._col;
					row = cells[j]._row;
					colspan = cells[j]._colspan;
					rowspan = cells[j]._rowspan;



					if (cells[j]._area == "left") {
						arealeft = 0;
					}
					else if (cells[j]._area == "right") {
						arealeft = this._client_width - format.rightWidth;
					}
					else {
						arealeft = 0;
					}

					cell_rect = this._getSubCellRect(i, j, -1, -1, false);

					cell_top = cell_rect.top;
					cell_bottom = cell_rect.bottom;

					if (fixed_rowcnt > 0 && i <= fixed_endrow) {
						cell_top += scroll_top;
						cell_bottom += scroll_top;
					}

					if (cells[j]._area == "right") {
						cell_left = cell_rect.left - scroll_left;
						cell_right = cell_rect.right - scroll_left;
					}
					else {
						cell_left = cell_rect.left;
						cell_right = cell_rect.right;
					}
					if (this._track_mode == "areaselect") {
						condition = cell_left < r && r <= cell_right;
						if ((j + 1) == cells_len && r >= cell_right) {
							condition = true;
						}
					}
					else {
						condition = cell_left < r && r <= cell_right && cell_top < b;
					}

					if (condition) {
						if (endarea != begarea || (begarea == "body" && endarea == "body")) {
							if (endarea != "right" && scroll_left < scroll_max && cells[j]._area == "right") {
								continue;
							}

							if (endarea != "left" && scroll_left > 0 && cells[j]._area == "left") {
								continue;
							}

							if (begarea != "left" && cells[j]._area == "left") {
								continue;
							}
						}

						ecell = j;
						ecol = col;
						esubrow = row;

						if (posobj.area != "right") {
							break;
						}
						else if (cells[j]._area == "right") {
							break;
						}
					}
				}
				break;
			}
			row_top = row_bottom;
		}
		spvt = epvt = this._selectinfo.curpvt;

		return {
			srow : srow, 
			erow : erow, 
			scell : scell, 
			ecell : ecell, 
			scol : scol, 
			ecol : ecol, 
			ssubrow : ssubrow, 
			esubrow : esubrow, 
			spvt : spvt, 
			epvt : epvt
		};
	};

	_pGrid._getSelectRect = function (onlyarea, bApplyFixedRow) {
		var rect = this._selectinfo.arearect;
		var area = this._selectinfo.area;

		rect.left = 0;
		rect.top = 0;
		rect.width = 0;
		rect.height = 0;
		rect.barea = "";
		rect.earea = "";

		var scroll_left = this._getScrollLeft();
		var scroll_top = this._getScrollTop();

		while (area.length) {
			var areainfo = area[area.length - 1];
			var format = this._curFormat;
			var cols = format._cols;
			var rows = format._bodyrows;
			var subrow_size_list = this._rowSizeListSub;
			var begcol = areainfo.begcol;
			var endcol = areainfo.endcol;
			var bodystart = format.leftWidth;
			var rightstart = this._client_width - format.rightWidth;

			var fixed_startrow = this._fixed_startrow;
			var fixed_endrow = this._fixed_endrow;

			if (areainfo.begrow < 0) {
				break;
			}

			if (!this._isAreaSelect()) {
				begcol = 0;
				endcol = cols.length - 1;
			}



			if (begcol >= 0 && endcol >= 0) {
				if (onlyarea && cols[begcol]._area != cols[endcol]._area) {
					break;
				}

				rect.barea = cols[begcol]._area;
				rect.earea = cols[endcol]._area;



				if (rect.barea == "right") {
					rect.left = rightstart + cols[begcol].left;
					rect.width = cols[endcol].right - cols[begcol].left;
				}
				else {
					if (rect.barea == "left") {
						rect.left = cols[begcol].left;
					}
					else {
						rect.left = bodystart + cols[begcol].left - scroll_left;
					}

					if (rect.earea == "left") {
						rect.width = cols[endcol].right - rect.left;
					}
					else if (rect.earea == "body") {
						rect.width = (bodystart + cols[endcol].right - scroll_left) - rect.left;
					}
					else {
						rect.width = (rightstart + cols[endcol].right) - rect.left;
					}
				}
			}
			else {
				rect.left = this._client_left;
				rect.width = this._client_width;
			}


			for (var row = 0; row <= areainfo.endrow; row++) {
				var s = 0, e = rows.length - 1;

				if (this._hasTree) {
					if (this._getGridRow(row) < -2) {
						continue;
					}
				}

				if (row < areainfo.begrow) {
					if (bApplyFixedRow && row < fixed_startrow) {
						continue;
					}

					for (var i = s; i <= e; i++) {
						rect.top += subrow_size_list[row * rows.length + i];
					}
				}
				else {
					if (row == areainfo.begrow) {
						s = areainfo.begsubrow[0];
					}
					if (row == areainfo.endrow) {
						e = areainfo.endsubrow[row - areainfo.begrow];
					}

					for (var i = 0; i <= e; i++) {
						if (i < s) {
							rect.top += subrow_size_list[row * rows.length + i];
						}
						else {
							rect.height += subrow_size_list[row * rows.length + i];
						}
					}
				}
			}

			rect.top += this._bodyBand._adjust_top - scroll_top;
			break;
		}
		this._selectinfo.arearect = rect;

		return rect;
	};

	_pGrid._updateSelector = function (mode, pos) {
		var v = this._isAreaSelect() && nexacro.isTouchInteraction;

		if (this._control_element) {
			var rect, l, t, w, h;

			var select_ctrl = this._select_ctrl;
			if (v) {
				if (!select_ctrl) {
					select_ctrl = new nexacro.GridSelector("gridselector", "absolute", 0, 0, 0, 0, null, null, this);
					select_ctrl._setCallbackFn(this._startAreaSizing, this._applyAreaSizing, this._applySelectorScroll);
					select_ctrl.createComponent();
					select_ctrl._createButton();
					this._select_ctrl = select_ctrl;
				}

				if ((mode == "vscroll" || mode == "hscroll") && !select_ctrl._is_tracking) {
					rect = this._selectinfo.arearect;

					if (mode == "hscroll") {
						if (rect.barea == "left") {
							if (rect.earea == "body") {
								rect.width -= pos;
							}
						}
						else if (rect.barea == "body") {
							rect.left -= pos;

							if (rect.earea == "right") {
								rect.width += pos;
							}
						}
					}
					if (mode == "vscroll") {
						rect.top -= pos;
					}

					l = rect.left;
					t = rect.top;
					w = rect.width;
					h = rect.height;

					if (t + h <= this._bodyBand._adjust_top) {
						v = false;
					}
				}
				else {
					rect = this._getSelectRect(select_ctrl._onlyarea, true);

					l = rect.left;
					t = rect.top;
					w = rect.width;
					h = rect.height;
				}

				if (!l && !t && !w && !h) {
					v = false;
				}

				select_ctrl.move(l, t, w, h, mode);

				if (v) {
					if (!select_ctrl._is_tracking) {
						select_ctrl.set_visible(false);
					}
				}
				else {
					select_ctrl.set_visible(false);
				}
			}
		}
		else {
			if (this._select_ctrl) {
				this._select_ctrl.destroy();
				this._select_ctrl = null;
			}
		}
	};

	_pGrid.set_autoupdatetype = function (v) {
		if (this.autoupdatetype != v) {
			switch (v) {
				case "none":
				case "comboselect":
				case "dateselect":
				case "itemselect":
					this.autoupdatetype = v;
					break;
			}
		}
	};

	_pGrid.set_cellclickbound = function (v) {
		if (this.cellclickbound != v) {
			switch (v) {
				case "control":
				case "cell":
					this.cellclickbound = v;
					break;
			}
		}
	};

	_pGrid.set_cellmovingtype = function (v) {
		if (this.cellmovingtype != v) {
			switch (v) {
				case "none":
				case "col":
				case "col,band":
				case "col,merge":
				case "col,line":
					this.cellmovingtype = v;
					break;
			}
		}
	};

	_pGrid.set_cellsizebandtype = function (v) {
		if (this.cellsizebandtype != v) {
			switch (v) {
				case "body":
				case "allband":
				case "nohead":
				case "noleft":
				case "nohead,noleft":
					this.cellsizebandtype = v;
					this.on_apply_cellsizebandtype();
					break;
			}
		}
	};

	_pGrid.on_apply_cellsizebandtype = function () {
	};

	_pGrid.set_cellsizingtype = function (v) {
		if (this.cellsizingtype != v) {
			switch (v) {
				case "none":
				case "col":
				case "row":
				case "both":
					this.cellsizingtype = v;
					this.on_apply_cellsizingtype();
					break;
			}
		}
	};

	_pGrid.on_apply_cellsizingtype = function () {
		this._applyResizer();
	};

	_pGrid.set_extendsizetype = function (v) {
		if (this.extendsizetype != v) {
			var size = false;
			if (this.autosizingtype == "row" || this.autosizingtype == "both") {
				size = true;
			}

			switch (v) {
				case "none":
				case "col":
					this._rowSizeEx = size;
					break;
				case "row":
				case "both":
					this._rowSizeEx = true;
					break;
			}
			this.extendsizetype = v;
			this.on_apply_extendsizetype();
		}
	};

	_pGrid.on_apply_extendsizetype = function () {
		if (this.getElement()) {
			this._recreate_contents_all(true, true, true);
		}
	};

	_pGrid.set_wheelscrollrow = function (v) {
		if (this.wheelscrollrow != v) {
			this.wheelscrollrow = (isNaN(v) ? 3 : parseInt(v, 10));
		}
	};

	_pGrid.set_usecontrolkey = function (v) {
		if (this.usecontrolkey != v) {
			this.usecontrolkey = v;
		}
	};

	_pGrid.set_treeusebutton = function (v) {
		if (this.treeusebutton != v) {
			switch (v) {
				case "use":
				case "no":
				case "noclick":
					this.treeusebutton = v;
					break;
			}
			this.on_apply_treeusebutton();
		}
	};

	_pGrid.set_dragscrolltype = function (v) {
		nexacro.Form.prototype.set_dragscrolltype.call(this, v);
	};

	_pGrid.on_apply_treeusebutton = function () {
		this._refreshBody();
	};

	_pGrid.set_treeuseline = function (v) {
		v = nexacro._toBoolean(v);
		if (this.treeuseline != v) {
			this.treeuseline = v;
			this.on_apply_treeuseline();
		}
	};

	_pGrid.on_apply_treeuseline = function () {
		this._refreshBody();
	};

	_pGrid.set_treeusecheckbox = function (v) {
		v = nexacro._toBoolean(v);
		if (this.treeusecheckbox != v) {
			this.treeusecheckbox = v;
			this.on_apply_treeusecheckbox();
		}
	};

	_pGrid.on_apply_treeusecheckbox = function () {
		this._refreshBody();
	};

	_pGrid.set_treeuseimage = function (v) {
		v = nexacro._toBoolean(v);
		if (this.treeuseimage != v) {
			this.treeuseimage = v;
			this.on_apply_treeuseimage();
		}
	};

	_pGrid.on_apply_treeuseimage = function () {
		this._refreshBody();
	};

	_pGrid.set_treeuseexpandkey = function (v) {
		v = nexacro._toBoolean(v);
		if (this.treeuseexpandkey != v) {
			this.treeuseexpandkey = v;
		}
	};

	_pGrid.set_treeinitstatus = function (v) {
		this.treeinitstatus = v;
		var expand, value;
		switch (v) {
			case "collapse,null":
				expand = false, value = false;
				break;
			case "expand,null":
				expand = true, value = false;
				break;
			case "collapse,all":
				expand = false, value = true;
				break;
			case "expand,all":
				expand = true, value = true;
				break;
		}
		this.on_apply_treeinitstatus(expand, value);
	};

	_pGrid.on_apply_treeinitstatus = function (expand, value) {
		if (!this._hasTree) {
			return;
		}

		var format = this._curFormat;
		var cells = format._bodycells;
		var cellsLen = cells.length;
		var _treeIndexes = this._treeIndexes;
		var _treeStates = this._treeStates;

		this._org_treeStates = [];

		if (!value) {
			var update = false;
			var dsrowidx;

			for (var i = _treeIndexes.length - 1; i >= 0; i--) {
				var cellinfo, editType;
				dsrowidx = this.getDatasetRow(i);

				for (var j = 0; j < cellsLen; j++) {
					cellinfo = cells[j];
					editType = cellinfo._getEdittype(dsrowidx);

					if (editType == "tree") {
						break;
					}
				}
				if (cellinfo) {
					var state, precnt;
					if (cellinfo.treestate._bindtype != 0) {
						state = cellinfo._getAttrValue(cellinfo.treestate, dsrowidx);
					}
					if (!state || state == "") {
						precnt = _treeIndexes.length;
						if (expand) {
							if (this._setTreeState(i, 1, false, "null") > 0) {
								i += (_treeIndexes.length - precnt + 1);
								update = true;
							}
						}
						else {
							if (this._setTreeState(i, 0, false, "null") > 0) {
								update = true;
							}
						}
					}
					else {
						precnt = _treeIndexes.length;

						var s = this._setTreeState(i, state, false, "null_value");
						if (s == 2) {
							if ((_treeIndexes.length - precnt) > 0) {
								i += (_treeIndexes.length - precnt + 1);
							}

							update = true;
						}
						else if (s == 1) {
							update = true;
						}
					}
				}
			}
			if (update == true) {
				this._recreate_contents_all(false, false, false, true);
			}
		}
		else {
			var update = false, precnt;

			for (var i = _treeIndexes.length - 1; i >= 0; i--) {
				precnt = _treeIndexes.length;
				if (expand) {
					if (this._setTreeState(i, 1, false, "all") > 0) {
						i += (_treeIndexes.length - precnt + 1);
						update = true;
					}
				}
				else {
					if (this._setTreeState(i, 0, false, "all") > 0) {
						update = true;
					}
				}
			}

			if (!expand) {
				for (var i = _treeStates.length - 1; i >= 0; i--) {
					var state = this._getOrgTreeStates(i);

					if (state == 2) {
						_treeStates[i] = 2;
					}
				}
			}

			if (update == true) {
				this._recreate_contents_all(false, false, false, true);
			}
		}
	};

	_pGrid.set_treepathdelimiter = function (v) {
		if (this.treepathdelimiter != v) {
			this.treepathdelimiter = v;
		}
	};

	_pGrid.set_useinputpanel = function (v) {
		if (this.useinputpanel != v) {
			this.useinputpanel = v;
		}
	};

	_pGrid.on_apply_prop_enable = function (v) {
		if (!v) {
			this._enable = v;
		}

		nexacro.Component.prototype.on_apply_prop_enable.call(this, v);

		if (this._is_created) {
			this._refreshAll();
		}
	};



	_pGrid.on_apply_prop_rtldirection = function () {
		nexacro.Component.prototype.on_apply_prop_rtldirection.call(this);

		var _rtldirection = this._rtldirection;
		if (this._headBand) {
			this._headBand._setRtlDirection(_rtldirection);
		}
		if (this._bodyBand) {
			this._bodyBand._setRtlDirection(_rtldirection);
		}
		if (this._summBand) {
			this._summBand._setRtlDirection(_rtldirection);
		}
	};

	_pGrid.createFormat = function () {
		var hr = 0;
		var pDataset = this._binddataset;
		var i = 0;
		var nColCount = 0;
		var nPvtCount = 0;
		var nRowCount = 0;

		if (pDataset) {
			nColCount = pDataset.getColCount();
		}

		var strContents;

		if (nColCount > 0) {
			strContents = "<Formats>\n";
			strContents += "<Format id=\"default\">\n";
			strContents += "<Columns>\n";
			{

				for (i = 0; i < nColCount; i++) {
					strContents += "<Column size=\"";
					strContents += "80";
					strContents += "\"/>\n";
				}
			}
			strContents += "</Columns>\n";
			strContents += "<Rows>\n";
			{

				strContents += "<Row band=\"head\" size=\"";
				strContents += "24";
				strContents += "\"/>\n";
				strContents += "<Row band=\"body\" size=\"";
				strContents += "24";
				strContents += "\"/>\n";
			}
			strContents += "</Rows>\n";
			strContents += "<Band id=\"head\">\n";
			{

				for (i = 0; i < nColCount; i++) {
					strContents += "<Cell col=\"";
					strContents += i.toString();
					strContents += "\" displaytype=\"normal\" text=\"";
					strContents += pDataset.getColID(i);
					strContents += "\"/>\n";
				}
			}
			strContents += "</Band>\n";
			strContents += "<Band id=\"body\">\n";
			{

				for (i = 0; i < nColCount; i++) {
					strContents += "<Cell col=\"";
					strContents += i.toString();
					strContents += "\" displaytype=\"normal\" text=\"bind:";
					strContents += pDataset.getColID(i);
					strContents += "\"/>\n";
				}
			}
			strContents += "</Band>\n";
			strContents += "</Format>\n";
			strContents += "</Formats>\n";
		}
		else {
			strContents = "<Formats>\n";
			strContents += "<Format id=\"default\">\n";
			strContents += "</Format>\n";
			strContents += "</Formats>\n";
		}

		this.set_formats(strContents);
		return 0;
	};

	_pGrid.setFormat = function (id) {
		var format = this._formats[id];

		if (format) {
			if (format != this._curFormat) {
				this.set_formatid(id);
				return true;
			}
		}
		else {
			this.formatid = "";
			this._curFormat = null;
			this._destroyBands();
		}
		return false;
	};

	_pGrid.getFormatString = function () {
		return this.formats;
	};

	_pGrid.getCurFormatString = function (bOrginal) {
		if (this._curFormat) {
			if (bOrginal) {
				return this._curFormat._getOrgFormatStr();
			}
			else {
				return this._curFormat._getFormatStr();
			}
		}
		else {
			return this.formats;
		}
	};

	_pGrid.getCellPos = function () {
		return this._selectinfo.curcell;
	};

	_pGrid.setCellPos = function (nCellIdx) {
		return this._moveToPosCell(this._selectinfo.curdsrow, nCellIdx);
	};

	_pGrid.getCellCount = function (strBand) {
		if (!this._curFormat) {
			return 0;
		}

		strBand = strBand.toLowerCase();
		var cells;
		if (strBand == "head") {
			cells = this._curFormat._headcells;
		}
		else if (strBand == "summ" || strBand == "summary") {
			cells = this._curFormat._summcells;
		}
		else {
			cells = this._curFormat._bodycells;
		}

		if (cells) {
			return cells.length;
		}
		return 0;
	};

	_pGrid.getCellRect = function (nRow, nCellIdx, nPivotIdx) {
		return this.getSubCellRect(nRow, nCellIdx, -1, nPivotIdx);
	};

	_pGrid.getSubCellRect = function (nRow, nCellIdx, nSubCellIdx, nPivotIdx) {
		return this._getSubCellRect(nRow, nCellIdx, nSubCellIdx, nPivotIdx, true);
	};

	_pGrid._getSubCellRect = function (nRow, nCellIdx, nSubCellIdx, nPivotIdx, bApplyScroll) {
		var rect = {
			"left" : 0, 
			"top" : 0, 
			"right" : 0, 
			"bottom" : 0, 
			"width" : 0, 
			"height" : 0
		};
		rect.left = 0;
		rect.top = 0;
		rect.right = 0;
		rect.bottom = 0;
		rect.width = 0;
		rect.height = 0;

		if (nRow >= 0 && nRow < this._rowcount) {
			if (this._curFormat && this._curFormat._bodycells) {
				var parentinfo = null;
				var cellinfo = this._curFormat._bodycells[nCellIdx];

				if (cellinfo && nSubCellIdx >= 0) {
					parentinfo = cellinfo;
					cellinfo = cellinfo._subcells[nSubCellIdx];
				}
				if (cellinfo) {
					var top = 0;
					var left = 0;
					var right = 0;
					var bottom = this._getHeadHeight();
					var _cols = this._curFormat._cols;

					if (this.summarytype == "top" || this.summarytype == "lefttop") {
						bottom += this._getSummHeight();
					}

					var bodyrows = this._curFormat._bodyrows;
					var rowcnt = bodyrows.length;
					var rowcount = this._getGridRowCount();
					var cellinfo_row = (parentinfo) ? parentinfo._row + cellinfo._row : cellinfo._row;
					var cellinfo_col = (parentinfo) ? parentinfo._col + cellinfo._col : cellinfo._col;
					var cellinfo_rowspan = cellinfo._rowspan;
					var cellinfo_colspan = cellinfo._colspan;
					var _rowSizeListSub = this._rowSizeListSub;
					var row;

					for (var i = 0; i < rowcount; i++) {
						row = i;
						if (this._hasTree) {
							row = this._treeIndexes[row];
						}

						var r = row * rowcnt;

						if (row == nRow) {
							for (var k = 0; k < cellinfo_row; k++) {
								bottom += _rowSizeListSub[r++];
							}
							top = bottom;

							for (var j = 0; j < cellinfo_rowspan; j++) {
								bottom += _rowSizeListSub[r++];
							}
							break;
						}
						else {
							for (var j = 0; j < rowcnt; j++) {
								bottom += _rowSizeListSub[r + j];
							}
						}
					}

					var size = 0;
					for (var i = 0; i < cellinfo_col; i++) {
						size += _cols[i].size;
					}

					left = size;
					size = 0;

					for (var i = 0; i < cellinfo_col + cellinfo_colspan; i++) {
						size += _cols[i].size;
					}

					right = size;

					if (cellinfo._area == "body" || cellinfo._area == "") {
						left -= this._getScrollLeft();
						right -= this._getScrollLeft();
					}

					top -= this._getScrollTop();
					bottom -= this._getScrollTop();

					if (bApplyScroll) {
						if (left < 0) {
							left = 0;
						}
						if (right < 0) {
							right = 0;
						}
						if (top < 0) {
							top = 0;
						}
						if (bottom < 0) {
							bottom = 0;
						}
					}

					rect.left = left;
					rect.right = right;
					rect.top = top;
					rect.bottom = bottom;
					rect.width = right - left;
					rect.height = bottom - top;
				}
			}
		}
		else if (nRow == -1) {
			if (this._curFormat && this._curFormat._headcells) {
				var cellinfo = this._curFormat._headcells[nCellIdx];

				if (cellinfo && nSubCellIdx >= 0) {
					cellinfo = cellinfo._subcells[nSubCellIdx];
				}

				if (cellinfo) {
					var top = 0;
					var left = 0;
					var right = 0;
					var bottom = 0;
					var _cols = this._curFormat._cols;

					var headrows = this._curFormat._headrows;
					var rowcnt = headrows.length;
					var cellinfo_row = cellinfo._row;
					var cellinfo_col = cellinfo._col;
					var cellinfo_rowspan = cellinfo._rowspan;
					var cellinfo_colspan = cellinfo._colspan;

					for (var k = 0; k < cellinfo_row; k++) {
						bottom += headrows[k].size;
					}

					top = bottom;

					for (k = 0; k < cellinfo_rowspan; k++) {
						bottom += headrows[k + cellinfo_row].size;
					}

					var size = 0;
					for (var i = 0; i < cellinfo_col; i++) {
						size += _cols[i].size;
					}

					left = size;
					size = 0;

					for (var i = 0; i < cellinfo_col + cellinfo_colspan; i++) {
						size += _cols[i].size;
					}

					right = size;

					if (cellinfo._area == "body" || cellinfo._area == "") {
						left -= this._getScrollLeft();
						right -= this._getScrollLeft();
					}
					if (bApplyScroll) {
						if (left < 0) {
							left = 0;
						}
						if (right < 0) {
							right = 0;
						}
					}

					rect.left = left;
					rect.right = right;
					rect.top = top;
					rect.bottom = bottom;
					rect.width = right - left;
					rect.height = bottom - top;
				}
			}
		}
		else if (nRow == -2) {
			if (this._curFormat && this._curFormat._summcells) {
				var cellinfo = this._curFormat._summcells[nCellIdx];

				if (cellinfo && nSubCellIdx >= 0) {
					cellinfo = cellinfo._subcells[nSubCellIdx];
				}

				if (cellinfo) {
					var top = 0;
					var left = 0;
					var right = 0;
					var bottom = 0;
					var _cols = this._curFormat._cols;

					if (this.summarytype == "top" || this.summarytype == "lefttop") {
						bottom += this._getHeadHeight();
					}
					else {
						bottom = this._client_top + this._client_height - this._getSummHeight();
					}

					var summrows = this._curFormat._summrows;
					var rowcnt = summrows.length;
					var cellinfo_row = cellinfo._row;
					var cellinfo_col = cellinfo._col;
					var cellinfo_rowspan = cellinfo._rowspan;
					var cellinfo_colspan = cellinfo._colspan;

					for (var k = 0; k < cellinfo_row; k++) {
						bottom += summrows[k].size;
					}

					top = bottom;

					for (k = 0; k < cellinfo_rowspan; k++) {
						bottom += summrows[k + cellinfo_row].size;
					}

					var size = 0;
					for (var i = 0; i < cellinfo_col; i++) {
						size += _cols[i].size;
					}

					left = size;
					size = 0;

					for (var i = 0; i < cellinfo_col + cellinfo_colspan; i++) {
						size += _cols[i].size;
					}

					right = size;

					if (cellinfo._area == "body" || cellinfo._area == "") {
						left -= this._getScrollLeft();
						right -= this._getScrollLeft();
					}
					if (bApplyScroll) {
						if (left < 0) {
							left = 0;
						}
						if (right < 0) {
							right = 0;
						}
					}
					rect.left = left;
					rect.right = right;
					rect.top = top;
					rect.bottom = bottom;
					rect.width = right - left;
					rect.height = bottom - top;
				}
			}
		}
		return rect;
	};

	_pGrid.getCellText = function (nRow, nCellIdx, nPivotIdx) {
		if (nRow >= 0) {
			if (this._curFormat && this._curFormat._bodycells) {
				var cellinfo = this._curFormat._bodycells[nCellIdx];
				if (cellinfo) {
					if (this._hasTree) {
						if (nRow < this._treeIndexes.length) {
							nRow = this._treeIndexes[nRow];
							return cellinfo._getDisplayText(nRow);
						}
					}
					else {
						if (nRow < this._rowcount) {
							return cellinfo._getDisplayText(nRow);
						}
					}
				}
			}
		}
		else if (nRow == -1) {
			if (this._curFormat && this._curFormat._headcells) {
				var cellinfo = this._curFormat._headcells[nCellIdx];
				if (cellinfo) {
					return cellinfo._getDisplayText(this._currentDSrow);
				}
			}
		}
		else if (nRow == -2) {
			if (this._curFormat && this._curFormat._summcells) {
				var cellinfo = this._curFormat._summcells[nCellIdx];
				if (cellinfo) {
					return cellinfo._getDisplayText(this._currentDSrow);
				}
			}
		}
	};

	_pGrid.getCellValue = function (nRow, nCellIdx, nPivotIdx) {
		if (nPivotIdx == undefined) {
			nPivotIdx = 0;
		}

		if (nRow >= 0) {
			if (this._curFormat && this._curFormat._bodycells) {
				var cellinfo = this._curFormat._bodycells[nCellIdx];
				if (cellinfo) {
					if (this._hasTree) {
						if (nRow < this._treeIndexes.length) {
							nRow = this._treeIndexes[nRow];
							return cellinfo._getValue(nRow);
						}
					}
					else {
						if (nRow < this._rowcount) {
							return cellinfo._getValue(nRow);
						}
					}
				}
			}
		}
		else if (nRow == -1) {
			if (this._curFormat && this._curFormat._headcells) {
				var cellinfo = this._curFormat._headcells[nCellIdx];
				if (cellinfo) {
					return cellinfo._getValue(this._currentDSrow);
				}
			}
		}
		else if (nRow == -2) {
			if (this._curFormat && this._curFormat._summcells) {
				var cellinfo = this._curFormat._summcells[nCellIdx];
				if (cellinfo) {
					return cellinfo._getValue(this._currentDSrow);
				}
			}
		}
	};

	_pGrid.getSubCellCount = function (strBand, nCellIdx) {
		var format = this._curFormat;
		strBand = strBand.toLowerCase();

		if (format) {
			var cells;
			if (strBand == "head") {
				cells = format._headcells;
			}
			else if (strBand == "summ" || strBand == "summary") {
				cells = format._summcells;
			}
			else {
				cells = format._bodycells;
			}
			if (cells && cells.length > nCellIdx && nCellIdx >= 0) {
				var cell = cells[nCellIdx];
				return cell._subcells.length;
			}
		}
		return 0;
	};

	_pGrid.getSubCellProperty = function (strBand, nCellIdx, nSubCellIdx, strPropID) {
		var format = this._curFormat;

		if (!format) {
			return undefined;
		}

		return format.getSubCellProperty(strBand, nCellIdx, nSubCellIdx, strPropID);
	};

	_pGrid.getSubCellText = function (nRow, nCellIdx, nSubCellIdx, nPivotIdx) {
		if (nRow >= 0) {
			if (this._curFormat && this._curFormat._bodycells) {
				if (nCellIdx >= 0 && nCellIdx < this._curFormat._bodycells.length) {
					var cellinfo = this._curFormat._bodycells[nCellIdx];
					if (cellinfo && nSubCellIdx >= 0 && nSubCellIdx < cellinfo._subcells.length) {
						if (this._hasTree) {
							if (nRow < this._treeIndexes.length) {
								nRow = this._treeIndexes[nRow];
								return cellinfo._subcells[nSubCellIdx]._getDisplayText(nRow);
							}
						}
						else {
							if (nRow < this._rowcount) {
								return cellinfo._subcells[nSubCellIdx]._getDisplayText(nRow);
							}
						}
					}
				}
			}
		}
		else if (nRow == -1) {
			if (this._curFormat && this._curFormat._headcells) {
				var cellinfo = this._curFormat._headcells[nCellIdx];
				if (cellinfo && nSubCellIdx >= 0 && nSubCellIdx < cellinfo._subcells.length) {
					return cellinfo._subcells[nSubCellIdx]._getDisplayText(this._currentDSrow);
				}
			}
		}
		else if (nRow == -2) {
			if (this._curFormat && this._curFormat._summcells) {
				var cellinfo = this._curFormat._summcells[nCellIdx];
				if (cellinfo && nSubCellIdx >= 0 && nSubCellIdx < cellinfo._subcells.length) {
					return cellinfo._subcells[nSubCellIdx]._getDisplayText(this._currentDSrow);
				}
			}
		}
	};

	_pGrid.getSubCellValue = function (nRow, nCellIdx, nSubCellIdx, nPivotIdx) {
		if (nRow >= 0) {
			if (this._curFormat && this._curFormat._bodycells) {
				if (nCellIdx >= 0 && nCellIdx < this._curFormat._bodycells.length) {
					var cellinfo = this._curFormat._bodycells[nCellIdx];
					if (cellinfo && nSubCellIdx >= 0 && nSubCellIdx < cellinfo._subcells.length) {
						if (this._hasTree) {
							if (nRow < this._treeIndexes.length) {
								nRow = this._treeIndexes[nRow];
								return cellinfo._subcells[nSubCellIdx]._getValue(nRow);
							}
						}
						else {
							if (nRow < this._rowcount) {
								return cellinfo._subcells[nSubCellIdx]._getValue(nRow);
							}
						}
					}
				}
			}
		}
		else if (nRow == -1) {
			if (this._curFormat && this._curFormat._headcells) {
				var cellinfo = this._curFormat._headcells[nCellIdx];
				if (cellinfo && nSubCellIdx >= 0 && nSubCellIdx < cellinfo._subcells.length) {
					return cellinfo._subcells[nSubCellIdx]._getValue(this._currentDSrow);
				}
			}
		}
		else if (nRow == -2) {
			if (this._curFormat && this._curFormat._summcells) {
				var cellinfo = this._curFormat._summcells[nCellIdx];
				if (cellinfo && nSubCellIdx >= 0 && nSubCellIdx < cellinfo._subcells.length) {
					return cellinfo._subcells[nSubCellIdx]._getValue(this._currentDSrow);
				}
			}
		}
	};

	_pGrid.setSubCellProperty = function (strBand, nCellIdx, nSubCellIdx, strPropID, varValue) {
		var format = this._curFormat;

		if (!format) {
			return false;
		}

		var cellinfo = format.setSubCellProperty(strBand, nCellIdx, nSubCellIdx, strPropID, varValue);
		if (cellinfo) {
			format._clearCellStyleCache(strBand, nCellIdx);
			this._refreshCell(strBand, nCellIdx, -1, true);
		}

		return (cellinfo != null);
	};

	_pGrid.setFormatColProperty = function (nColIdx, strPropID, nValue) {
		if (strPropID && this._curFormat) {
			strPropID = strPropID.toLowerCase();
			if (this._curFormat.setFormatColProperty(nColIdx, strPropID, nValue)) {
				if (strPropID == "band") {
					this._autofitcol_rate = [];
					this._recreate();
				}
				else if (strPropID == "size") {
					if (this.enableredraw) {
						this._updateColSize(nColIdx);
					}
					else {
						if (!this._enable_redraw_history["updatecolsize"]) {
							this._enable_redraw_history["updatecolsize"] = [];
						}

						this._enable_redraw_history["updatecolsize"].push(nColIdx);
					}
				}
				else {
					this._recreate_contents_all(true, false, false);
				}
				return true;
			}
		}
		return false;
	};

	_pGrid.setFormatRowProperty = function (nRowIdx, strPropID, nValue) {
		if (strPropID && this._curFormat) {
			strPropID = strPropID.toLowerCase();
			if (this._curFormat.setFormatRowProperty(nRowIdx, strPropID, nValue)) {
				if (strPropID == "band" || strPropID == "size") {
					this._isUserChangeHeadRowSize = false;
					this._isUserChangeSummRowSize = false;
					this._isUserChangeBodyRowSize = false;
					this._recreate();
				}
				else {
					this._recreate_contents_all(false, false, false);
				}
				return true;
			}
		}
		return false;
	};

	_pGrid.getFormatColProperty = function (nCollIdx, strPropId) {
		if (this._curFormat) {
			return this._curFormat.getFormatColProperty(nCollIdx, strPropId);
		}
		return null;
	};

	_pGrid.getFormatRowProperty = function (nRowIdx, strPropId) {
		if (this._curFormat) {
			return this._curFormat.getFormatRowProperty(nRowIdx, strPropId);
		}

		return null;
	};

	_pGrid.getFormatColCount = function () {
		if (this._curFormat) {
			return this._curFormat._cols.length;
		}
		return 0;
	};

	_pGrid.getFormatRowCount = function () {
		if (this._curFormat) {
			var format = this._curFormat;
			var rowcnt = 0;

			if (format._headrows) {
				rowcnt += format._headrows.length;
			}
			if (format._bodyrows) {
				rowcnt += format._bodyrows.length;
			}
			if (format._summrows) {
				rowcnt += format._summrows.length;
			}

			return rowcnt;
		}
		return 0;
	};

	_pGrid.getFormatColSize = function (nColIdx) {
		if (this._curFormat) {
			if (this._curFormat._cols.length > 0 && this._curFormat._cols.length > nColIdx) {
				var col = this._curFormat._cols[nColIdx];
				if (col) {
					return col.orgsize;
				}
			}
		}
		return -1;
	};

	_pGrid.getFormatRowSize = function (nRowIdx) {
		if (this._curFormat) {
			if (nRowIdx < 0) {
				return -1;
			}

			var top = 0;
			var rows = this._curFormat._headrows;
			if (rows) {
				if (rows.length > nRowIdx) {
					var row = rows[nRowIdx];
					return row.orgsize;
				}
				top += rows.length;
			}

			if (this.summarytype == "top" || this.summarytype == "lefttop") {
				rows = this._curFormat._summrows;
				if (rows) {
					if (rows.length + top > nRowIdx) {
						var row = rows[nRowIdx - top];
						return row.orgsize;
					}
					top += rows.length;
				}
				rows = this._curFormat._bodyrows;
				if (rows) {
					if (rows.length + top > nRowIdx) {
						var row = rows[nRowIdx - top];
						return row.orgsize;
					}
				}
			}
			else {
				rows = this._curFormat._bodyrows;
				if (rows) {
					if (rows.length + top > nRowIdx) {
						var row = rows[nRowIdx - top];
						return row.orgsize;
					}
					top += rows.length;
				}
				rows = this._curFormat._summrows;
				if (rows) {
					if (rows.length + top > nRowIdx) {
						var row = rows[nRowIdx - top];
						return row.orgsize;
					}
				}
			}
		}
		return -1;
	};

	_pGrid._isUserChangeHeadRowSize = false;
	_pGrid._isUserChangeBodyRowSize = false;
	_pGrid._isUserChangeSummRowSize = false;
	_pGrid._isUserChangeColSize = false;

	_pGrid.setRealColSize = function (nPivotIndex, nColIndex, nSize, bBandIndex) {
		if (arguments.length == 3) {
			bBandIndex = nSize;
			nSize = nColIndex;
			nColIndex = nPivotIndex;
			nPivotIndex = -9;
		}
		else if (arguments.length == 2) {
			nSize = nColIndex;
			nColIndex = nPivotIndex;
			nPivotIndex = -9;
			bBandIndex = true;
		}
		this._isUserChangeColSize = true;
		return this._setColSize(nPivotIndex, nColIndex, nSize, bBandIndex, true);
	};

	_pGrid.setRealRowSize = function (nRowIndex, nSubRowIndex, nSize, bBandIndex) {
		var format = this._curFormat;

		if (bBandIndex == undefined) {
			bBandIndex = true;
		}

		if (nSize == undefined) {
			nSize = nSubRowIndex;
			nSubRowIndex = -1;
		}

		var band = "none";
		if (bBandIndex) {
			if (nRowIndex >= 0) {
				band = "body";
			}
			else if (nRowIndex == -1) {
				band = "head";
			}
			else if (nRowIndex == -2) {
				band = "summ";
			}
		}
		else {
			if (format._headrows) {
				if (nRowIndex < format._headrows.length) {
					band = "head";
				}
				else {
					nRowIndex -= format._headrows.length;
				}
			}

			if (band == "none") {
				if (this.summarytype == "top" || this.summarytype == "lefttop") {
					if (format._summrows) {
						if (nRowIndex < format._summrows.length) {
							band = "summ";
						}
						else {
							nRowIndex -= format._headrows.length;
						}
					}
					if (band == "none") {
						band = "body";
					}
				}
				else {
					if (format._bodyrows) {
						var length = (this._hasTree) ? this._treeIndexes.length : this._rowcount;
						if (nRowIndex < length) {
							band = "body";
						}
						else {
							nRowIndex -= length;
						}
					}
					if (band == "none") {
						if (format._summrows) {
							if (nRowIndex < format._summrows.length) {
								band = "summ";
							}
						}
					}
				}
			}
		}

		var change = false;

		if (band == "body") {
			if (format && format._bodyrows) {
				var nRow = nRowIndex;
				if (this._hasTree) {
					if (nRow >= this._treeIndexes.length) {
						return false;
					}

					nRow = this._treeIndexes[nRow];
				}
				else {
					if (nRow >= this._rowcount) {
						return false;
					}
				}

				var rows = format._bodyrows;
				var rowsLen = rows.length;
				var _rowSizeList = this._rowSizeList;
				var _rowSizeListSub = this._rowSizeListSub;

				if (nSubRowIndex >= 0) {
					if (nSubRowIndex < rowsLen) {
						this._is_variable_bodyrowsize = true;

						var index = (nRow * rowsLen) + nSubRowIndex;
						var oldsize = _rowSizeListSub[index];
						var newsize = nSize;

						if (oldsize != newsize) {
							_rowSizeListSub[index] = newsize;
							_rowSizeList[nRow] += (newsize - oldsize);
							change = true;

							this._updateRowSizeExtendEx(format._bodyrows, _rowSizeList, _rowSizeListSub, nRow, true);

							if (this.enableredraw) {
								if (this.extendsizetype != "row" && this.extendsizetype != "both") {
									if (this._bodyBand) {
										this._bodyBand._recreate_contents();
									}
								}
								else {
									this._updateRowSize(nRowIndex, nSubRowIndex);
								}
							}
							else {
								if (this.extendsizetype != "row" && this.extendsizetype != "both") {
									this._enable_redraw_history["recreate_body"] = true;
								}
								else {
									if (!this._enable_redraw_history["updaterowsize"]) {
										this._enable_redraw_history["updaterowsize"] = [];
									}

									this._enable_redraw_history["updaterowsize"].push([nRowIndex, nSubRowIndex]);
								}
							}
							this._isUserChangeBodyRowSize = true;
						}
					}
					else {
						return false;
					}
				}
				else {
					if (nRow < _rowSizeList.length) {
						this._is_variable_bodyrowsize = true;

						var index, oldsize, newsize;

						for (var i = 0; i < rowsLen; i++) {
							index = (nRow * rowsLen) + i;
							oldsize = _rowSizeListSub[index];
							newsize = nSize;

							if (oldsize != newsize) {
								_rowSizeListSub[index] = newsize;
								_rowSizeList[nRow] += (newsize - oldsize);
								change = true;
							}
						}

						if (change) {
							this._updateRowSizeExtendEx(format._bodyrows, _rowSizeList, _rowSizeListSub, nRow, true);

							if (this.enableredraw) {
								if (this._bodyBand) {
									this._bodyBand._recreate_contents();
								}
							}
							else {
								this._enable_redraw_history["recreate_body"] = true;
							}
							this._isUserChangeBodyRowSize = true;
						}
					}
					else {
						return false;
					}
				}
			}
		}
		else if (band == "head") {
			if (format && format._headrows) {
				var rows = format._headrows;
				var rowsLen = rows.length;
				var _rowSizeList = this._rowHeadList;
				var _rowSizeListSub = this._rowHeadListSub;

				if (nSubRowIndex >= 0) {
					if (nSubRowIndex < rowsLen) {
						var index = nSubRowIndex;
						var oldsize = _rowSizeListSub[index];
						var newsize = nSize;

						if (oldsize != newsize) {
							_rowSizeListSub[index] = newsize;
							_rowSizeList[0] += (newsize - oldsize);
							change = true;
							this._updateRowSizeExtendEx(format._headrows, _rowSizeList, _rowSizeListSub, 0);
						}
					}
					else {
						return false;
					}
				}
				else {
					var index, oldsize, newsize;

					for (var i = 0; i < rowsLen; i++) {
						index = i;
						oldsize = _rowSizeListSub[index];
						newsize = nSize;

						if (oldsize != newsize) {
							_rowSizeListSub[index] = newsize;
							_rowSizeList[0] += (newsize - oldsize);
							change = true;
						}
					}

					if (change == true) {
						this._updateRowSizeExtendEx(format._headrows, _rowSizeList, _rowSizeListSub, 0);
					}
				}

				if (change) {
					if (this.enableredraw) {
						if (this._headBand) {
							this._headBand._recreate_contents();
						}
						this._resizeBand();
					}
					else {
						this._enable_redraw_history["recreate_head"] = true;
						this._enable_redraw_history["resize_band"] = true;
					}
					this._isUserChangeHeadRowSize = true;
				}
			}
		}
		else if (band == "summ") {
			if (format && format._summrows) {
				var rows = format._summrows;
				var rowsLen = rows.length;
				var _rowSizeList = this._rowSummList;
				var _rowSizeListSub = this._rowSummListSub;

				if (nSubRowIndex >= 0) {
					if (nSubRowIndex < rowsLen) {
						var index = nSubRowIndex;
						var oldsize = _rowSizeListSub[index];
						var newsize = nSize;

						if (oldsize != newsize) {
							_rowSizeListSub[index] = newsize;
							_rowSizeList[0] += (newsize - oldsize);
							change = true;
							this._updateRowSizeExtendEx(format._summrows, _rowSizeList, _rowSizeListSub, 0);
						}
					}
					else {
						return false;
					}
				}
				else {
					var index, oldsize, newsize;

					for (var i = 0; i < rowsLen; i++) {
						index = i;
						oldsize = _rowSizeListSub[index];
						newsize = nSize;

						if (oldsize != newsize) {
							_rowSizeListSub[index] = newsize;
							_rowSizeList[0] += (newsize - oldsize);
							change = true;
						}
					}

					if (change == true) {
						this._updateRowSizeExtendEx(format._summrows, _rowSizeList, _rowSizeListSub, 0);
					}
				}

				if (change == true) {
					if (this.enableredraw) {
						if (this._summBand) {
							this._summBand._recreate_contents();
						}
						this._resizeBand();
					}
					else {
						this._enable_redraw_history["recreate_summ"] = true;
						this._enable_redraw_history["resize_band"] = true;
					}
					this._isUserChangeSummRowSize = true;
				}
			}
		}

		return change;
	};

	_pGrid.getRealColSize = function (nColIndex, bBandIndex) {
		var format = this._curFormat;

		var leftcnt = this._getColFixCnt("left");
		var bodycnt = this._getColFixCnt("body");
		var rightcnt = this._getColFixCnt("right");
		var _cols = format._cols;
		var _colsLen = _cols.length;

		var areatype = "body";

		if (bBandIndex == true) {
			if (nColIndex >= 0) {
				nColIndex += leftcnt;
			}
			else if (nColIndex == -2) {
				nColIndex += leftcnt;
				nColIndex += bodycnt;
			}

			if (_colsLen <= nColIndex) {
				return -1;
			}
		}
		return _cols[nColIndex].size;
	};

	_pGrid.getRealRowSize = function (nRowIndex, nSubRowIndex, bBandIndex) {
		var format = this._curFormat;

		if (bBandIndex == undefined) {
			bBandIndex = true;
		}

		var band = "none";
		if (bBandIndex) {
			if (nRowIndex >= 0) {
				band = "body";
			}
			else if (nRowIndex == -1) {
				band = "head";
			}
			else if (nRowIndex == -2) {
				band = "summ";
			}
		}
		else {
			if (format._headrows) {
				if (nRowIndex < format._headrows.length) {
					band = "head";
				}
				else {
					nRowIndex -= format._headrows.length;
				}
			}

			if (band == "none") {
				if (this.summarytype == "top" || this.summarytype == "lefttop") {
					if (format._summrows) {
						if (nRowIndex < format._summrows.length) {
							band = "summ";
						}
						else {
							nRowIndex -= format._headrows.length;
						}
					}
					if (band == "none") {
						band = "body";
					}
				}
				else {
					if (format._bodyrows) {
						var length = (this._hasTree) ? this._treeIndexes.length : this._rowcount;
						if (nRowIndex < length) {
							band = "body";
						}
						else {
							nRowIndex -= length;
						}
					}
					if (band == "none") {
						if (format._summrows) {
							if (nRowIndex < format._summrows.length) {
								band = "summ";
							}
						}
					}
				}
			}
		}

		if (band == "body") {
			if (format && format._bodyrows) {
				var nRow = nRowIndex;
				if (this._hasTree) {
					if (nRow >= this._treeIndexes.length) {
						return 0;
					}
					nRow = this._treeIndexes[nRow];
				}
				else {
					if (nRow >= this._rowcount) {
						return 0;
					}
				}

				var rows = format._bodyrows;

				if (nSubRowIndex >= 0) {
					if (nSubRowIndex < rows.length) {
						return this._rowSizeListSub[nRow * rows.length + nSubRowIndex];
					}
					else {
						return 0;
					}
				}
				else {
					if (nRow < this._rowSizeList.length) {
						return this._rowSizeList[nRow];
					}
					else {
						return 0;
					}
				}
			}
		}
		else if (band == "head") {
			if (format && format._headrows) {
				var rows = format._headrows;

				if (nSubRowIndex >= 0) {
					if (nSubRowIndex < rows.length) {
						return this._rowHeadListSub[nSubRowIndex];
					}
					else {
						return 0;
					}
				}
				else {
					return this._rowHeadList[0];
				}
			}
		}
		else if (band == "summ") {
			if (format && format._summrows) {
				var rows = format._summrows;

				if (nSubRowIndex >= 0) {
					if (nSubRowIndex < rows.length) {
						return this._rowSummListSub[nSubRowIndex];
					}
					else {
						return 0;
					}
				}
				else {
					return this._rowSummList[0];
				}
			}
		}
		return 0;
	};

	_pGrid.getRealColFullSize = function (strBand) {
		var format = this._curFormat;
		var size = 0;

		if (!strBand) {
			var leftcnt = this._getColFixCnt("left");
			for (var i = 0; i < leftcnt; i++) {
				size += this.getRealColSize(-1, i);
			}

			var bodycnt = this._getColFixCnt("body");

			for (var i = 0; i < bodycnt; i++) {
				size += this.getRealColSize(leftcnt + i);
			}

			var rightcnt = this._getColFixCnt("right");
			for (var i = 0; i < rightcnt; i++) {
				size += this.getRealColSize(leftcnt + bodycnt + i);
			}
		}
		else {
			strBand = strBand.toLowerCase();
			if (strBand == "left") {
				var leftcnt = this._getColFixCnt("left");
				for (var i = 0; i < leftcnt; i++) {
					size += this.getRealColSize(i);
				}
			}
			else if (strBand == "body") {
				var leftcnt = this._getColFixCnt("left");
				var bodycnt = this._getColFixCnt("body");
				for (var i = 0; i < bodycnt; i++) {
					size += this.getRealColSize(leftcnt + i);
				}
			}
			else if (strBand == "right") {
				var leftcnt = this._getColFixCnt("left");
				var bodycnt = this._getColFixCnt("body");
				var rightcnt = this._getColFixCnt("right");
				for (var i = 0; i < rightcnt; i++) {
					size += this.getRealColSize(leftcnt + bodycnt + i);
				}
			}
		}
		return size;
	};

	_pGrid.getRealRowFullSize = function (strBand) {
		if (!strBand) {
			var length = (this._hasTree) ? this._treeIndexes.length : this._rowcount;
			var size = 0;

			for (var i = 0; i < length; i++) {
				size += this.getRealRowSize(i);
			}

			size += this.getRealRowSize(-1);
			size += this.getRealRowSize(-2);
			return size;
		}
		else {
			strBand = strBand.toLowerCase();
			if (strBand == "body") {
				var length = (this._hasTree) ? this._treeIndexes.length : this._rowcount;
				var size = 0;
				for (var i = 0; i < length; i++) {
					size += this.getRealRowSize(i);
				}

				return size;
			}
			else if (strBand == "head") {
				return this.getRealRowSize(-1);
			}
			else if (strBand == "summ" || strBand == "summary") {
				return this.getRealRowSize(-2);
			}
		}
		return 0;
	};

	_pGrid.__createDefualtColFormat = function (band) {
		var strContents;

		strContents = "<Formats>\n";
		strContents += "<Format id=\"default\">\n";
		strContents += "<Columns>\n";
		strContents += "<Column size=\"40\"/>\n";
		strContents += "</Columns>\n";

		if (band == "head") {
			strContents += "<Rows>\n";
			strContents += "<Row size=\"24\" band=\"head\"/>";
			strContents += "</Rows>\n";
			strContents += "<Band id=\"head\">\n";
			strContents += "<Cell/>\n";
			strContents += "</Band>\n";
		}
		else if (band == "summ" || band == "summary") {
			strContents += "<Rows>\n";
			strContents += "<Row size=\"24\" band=\"summ\"/>";
			strContents += "</Rows>\n";
			strContents += "<Band id=\"summary\">\n";
			strContents += "<Cell/>\n";
			strContents += "</Band>\n";
		}
		else if (band == "body") {
			strContents += "<Rows>\n";
			strContents += "<Row size=\"24\" band=\"body\"/>";
			strContents += "</Rows>\n";
			strContents += "<Band id=\"body\">\n";
			strContents += "<Cell/>\n";
			strContents += "</Band>\n";
		}

		strContents += "</Format>\n";
		strContents += "</Formats>\n";

		this.set_formats(strContents);

		return 0;
	};

	_pGrid.appendContentsRow = function (strBand, bBandAppend) {
		if (!strBand) {
			strBand = "body";
		}

		if (typeof (strBand) == "number") {
			if (strBand == -1) {
				strBand = "head";
			}
			else if (strBand == -2) {
				strBand = "summ";
			}
			else if (strBand >= 0) {
				strBand = "body";
			}
		}

		strBand = strBand.toLowerCase();

		if (!this._curFormat) {
			return this.__createDefualtColFormat(strBand);
		}

		if (!bBandAppend == undefined) {
			bBandAppend = true;
		}

		if (bBandAppend == false) {
			strBand = this._getLastRowBand();
		}

		var row = this._curFormat.appendContentsRow(strBand, bBandAppend);

		if (row >= 0) {
			this._recreate();
			this._initSelect();

			if (strBand == "body" || strBand >= 0) {
				if (rows = this._curFormat._headrows) {
					row += rows.length;
				}
				if (this.summarytype == "top" || this.summarytype == "lefttop") {
					if (rows = this._curFormat._summrows) {
						row += rows.length;
					}
				}
			}
			else if (strBand == "summ" || strBand == "summary" || strBand == -2) {
				if (rows = this._curFormat._headrows) {
					row += rows.length;
				}
				if (this.summarytype != "top" && this.summarytype != "lefttop") {
					if (rows = this._curFormat._bodyrows) {
						row += rows.length;
					}
				}
			}
		}
		return row;
	};

	_pGrid.appendContentsCol = function (strBand, bBandAppend) {
		if (!this._curFormat) {
			return -1;
		}

		this._autofitcol_rate = [];
		var col = this._curFormat.appendContentsCol(strBand, bBandAppend);

		if (col >= 0) {
			this._recreate();
		}

		return col;
	};

	_pGrid.insertContentsRow = function (strBand, nSubRowIndex, bBandIndex) {
		if (!this._curFormat) {
			return -1;
		}

		if (arguments.length == 1) {
			nSubRowIndex = strBand;
			strBand = "body";
		}
		var row = this._curFormat.insertContentsRow(strBand, nSubRowIndex, bBandIndex);

		if (row >= 0) {
			this._recreate();

			if (strBand == "body" || strBand >= 0) {
				if (rows = this._curFormat._headrows) {
					row += rows.length;
				}
				if (this.summarytype == "top" || this.summarytype == "lefttop") {
					if (rows = this._curFormat._summrows) {
						row += rows.length;
					}
				}
			}
			else if (strBand == "summ" || strBand == "summary" || strBand == -2) {
				if (rows = this._curFormat._headrows) {
					row += rows.length;
				}
				if (this.summarytype != "top" && this.summarytype != "lefttop") {
					if (rows = this._curFormat._bodyrows) {
						row += rows.length;
					}
				}
			}
		}
		return row;
	};

	_pGrid.insertContentsCol = function (strBand, nColIndex, bBandIndex) {
		if (!this._curFormat) {
			return -1;
		}

		this._autofitcol_rate = [];
		var col = this._curFormat.insertContentsCol(strBand, nColIndex, bBandIndex);

		if (col >= 0) {
			this._recreate();
		}

		return col;
	};

	_pGrid.deleteContentsRow = function (strBand, nSubRowIndex, bBandIndex) {
		if (!this._curFormat) {
			return -1;
		}

		if (arguments.length == 1) {
			nSubRowIndex = strBand;
			strBand = "body";
		}
		var row = this._curFormat.deleteContentsRow(strBand, nSubRowIndex, bBandIndex);

		if (row >= 0) {
			this._recreate();
		}

		return row;
	};

	_pGrid.deleteContentsCol = function (strBand, nColIndex, bBandIndex) {
		if (!this._curFormat) {
			return -1;
		}

		this._autofitcol_rate = [];
		var col = this._curFormat.deleteContentsCol(strBand, nColIndex, bBandIndex);

		if (col >= 0) {
			this._recreate();
		}

		return col;
	};

	_pGrid.mergeContentsCell = function (strBand, nStartRow, nStartCol, nEndRow, nEndCol, nFirstCell, bKeepSubCell) {
		if (!this._curFormat) {
			return -1;
		}

		bKeepSubCell = nexacro._toBoolean(bKeepSubCell);
		var cell = this._curFormat.mergeContentsCell(strBand, nStartRow, nStartCol, nEndRow, nEndCol, nFirstCell, bKeepSubCell);

		if (cell >= 0) {
			this._recreate();
		}

		return cell;
	};

	_pGrid.splitContentsCell = function (strBand, nStartRow, nStartCol, nEndRow, nEndCol, bMakeSubCell) {
		if (!this._curFormat) {
			return -1;
		}
		else {
			bMakeSubCell = nexacro._toBoolean(bMakeSubCell);
			var cell = this._curFormat.splitContentsCell(strBand, nStartRow, nStartCol, nEndRow, nEndCol, bMakeSubCell);

			if (cell > 0) {
				this._recreate();
			}
			return cell;
		}
	};

	_pGrid.setBandProperty = function (strBand, strPropID, varValue) {
		var format = this._curFormat;

		if (!format) {
			return false;
		}

		strBand = strBand.toLowerCase();

		var bandinfo = format.setBandProperty(strBand, strPropID, varValue);
		if (bandinfo) {
			strBand = strBand.toLowerCase();
			if (strBand == "body") {
				this._refreshBody(true);
			}
			else if (strBand == "head") {
				this._refreshHead(true);
			}
			else {
				this._refreshSumm(true);
			}
		}
		return (bandinfo != null);
	};

	_pGrid.getBandProperty = function (strBand, strPropID) {
		var format = this._curFormat;

		if (!format) {
			return null;
		}

		strBand = strBand.toLowerCase();

		return format.getBandProperty(strBand, strPropID);
	};

	_pGrid.setCellProperty = function (strBand, nCellIdx, strPropID, varValue) {
		var format = this._curFormat;

		if (!format) {
			return false;
		}

		strBand = strBand.toLowerCase();

		var cellinfo = format.setCellProperty(strBand, nCellIdx, strPropID, varValue);
		if (cellinfo) {
			format._clearCellStyleCache(strBand, nCellIdx);
			if (strPropID == "displaytype" && varValue == "tree") {
				this._setTreeCellinfo(cellinfo);
				this._setTree(true);
			}
			else if (strPropID == "autosizecol" || strPropID == "autosizerow") {
				this._recreate_contents_all(true, true, false);
			}
			else if (strPropID == "text") {
				if (strBand == "head" && this._headAutoSize) {
					this._recreate_contents_all(true, true, false);
				}
				else if (strBand == "body" && this._bodyAutoSize) {
					this._recreate_contents_all(true, true, false);
				}
				else if (strBand.indexOf("summ") >= 0 && this._summAutoSize) {
					this._recreate_contents_all(true, true, false);
				}
				else {
					this._refreshCell(strBand, nCellIdx, -1, true);
				}
			}
			else if (strPropID == "suppress") {
				if (varValue != 0) {
					this._is_use_suppress = true;
				}
				else {
					cellinfo._clearSuppressInfo();

					var cells = this._curFormat._bodycells;
					var cellcnt = cells ? cells.length : 0;
					var cellinfo2;

					this._is_use_suppress = false;
					for (var j = 0; j < cellcnt; j++) {
						cellinfo2 = cells[j];
						if (cellinfo2.suppress != 0) {
							this._is_use_suppress = true;
							break;
						}
					}
				}
				this._refreshBody();
			}
			else if (strPropID == "suppressalign" && this._is_use_suppress) {
				this._destroyOverlayElements();
				this._refreshBody();
			}
			else {
				if (strPropID == "displaytype" || strPropID == "editdisplay" || strPropID == "combodisplay" || strPropID == "calendardisplay") {
					this._changeDisplayer = true;
				}
				else if (strPropID == "wordwrap") {
					if (varValue != "none") {
						if (strBand == "head") {
							this._is_head_wordwrap = true;
						}
						if (strBand == "body") {
							this._is_body_wordwrap = true;
						}
						if (strBand.indexOf("summ") >= 0) {
							this._is_head_wordwrap = true;
						}
					}
					else {
						var cells, cellcnt, cellinfo2;

						if (strBand == "body") {
							cells = this._curFormat._bodycells;
							cellcnt = cells ? cells.length : 0;

							this._is_body_wordwrap = false;
							for (var j = 0; j < cellcnt; j++) {
								cellinfo2 = cells[j];
								if (cellinfo2.wordwrap != "none") {
									this._is_body_wordwrap = true;
									break;
								}
							}
						}

						if (strBand == "head") {
							cells = this._curFormat._headcells;
							cellcnt = cells ? cells.length : 0;

							this._is_head_wordwrap = false;
							for (var j = 0; j < cellcnt; j++) {
								cellinfo2 = cells[j];
								if (cellinfo2.wordwrap != "none") {
									this._is_head_wordwrap = true;
									break;
								}
							}
						}

						if (strBand == "summ") {
							cells = this._curFormat._summcells;
							cellcnt = cells ? cells.length : 0;

							this._is_summ_wordwrap = false;
							for (var j = 0; j < cellcnt; j++) {
								cellinfo2 = cells[j];
								if (cellinfo2.wordwrap != "none") {
									this._is_summ_wordwrap = true;
									break;
								}
							}
						}
					}
				}

				this._refreshCell(strBand, nCellIdx, -1, true);
				this._changeDisplayer = false;
			}
		}

		return (cellinfo != null);
	};

	_pGrid.getCellProperty = function (strBand, nCellIdx, strPropID) {
		var format = this._curFormat;

		if (!format) {
			return null;
		}

		strBand = strBand.toLowerCase();

		return format.getCellProperty(strBand, nCellIdx, strPropID);
	};

	_pGrid.autoFitRow = function (strType) {
	};

	_pGrid.autoFitCol = function (strType) {
		var af = this.autofittype;
		this.autofittype = "col";
		if (strType) {
			this.autofittype = strType;
		}
		if (this._curFormat) {
			this._curFormat._resetOrgColSize(true, this._autofitcol_rate);
		}

		var retn = this._applyAutofittype(true);
		this.autofittype = af;
		return retn;
	};

	_pGrid.autoSizeRow = function (strType, nRowIndex, nSubRowIndex, bIsDatasetRow) {
		if (!this._binddataset || !this._curFormat || nRowIndex == undefined) {
			return false;
		}

		if (bIsDatasetRow == undefined || bIsDatasetRow == true) {
			nRowIndex = this._getDataRow(nRowIndex);
		}

		var retn = false;
		this._autoSizeRowProc = true;

		if (strType == "row") {
			if (nRowIndex >= 0) {
				this._is_variable_bodyrowsize = true;

				var rows = this._curFormat._bodyrows;
				var rowsLen = rows.length;

				if (nSubRowIndex != undefined) {
					var index = (nRowIndex * rows.length) + nSubRowIndex;
					var oldsize = this._rowSizeListSub[index];
					var newsize = this._getMaxSubRowSize(nRowIndex, nSubRowIndex);

					if (oldsize != newsize) {
						this._rowSizeListSub[index] = newsize;
						this._rowSizeList[nRowIndex] += (newsize - oldsize);
						change = true;
					}
				}
				else {
					for (var j = 0; j < rowsLen; j++) {
						var index = (nRowIndex * rows.length) + j;
						var oldsize = this._rowSizeListSub[index];
						var newsize = this._getMaxSubRowSize(nRowIndex, j);

						if (oldsize != newsize) {
							this._rowSizeListSub[index] = newsize;
							this._rowSizeList[nRowIndex] += (newsize - oldsize);
							change = true;
						}
					}
				}
				if (change == true) {
					this._updateRowSizeExtend();
				}

				this._recreate_contents_all(false, false, false);
				retn = true;
			}
			else if (nRowIndex == -1) {
				var rows = this._curFormat._headrows;
				var rowsLen = rows.length;

				if (nSubRowIndex != undefined) {
					var index = nSubRowIndex;
					var oldsize = this._rowHeadListSub[index];
					var newsize = this._getMaxSubRowSize(nRowIndex, nSubRowIndex);

					if (oldsize != newsize) {
						this._rowHeadListSub[index] = newsize;
						this._rowHeadList[0] += (newsize - oldsize);
						change = true;
					}
				}
				else {
					for (var j = 0; j < rowsLen; j++) {
						var index = j;
						var oldsize = this._rowHeadListSub[index];
						var newsize = this._getMaxSubRowSize(nRowIndex, j);

						if (oldsize != newsize) {
							this._rowHeadListSub[index] = newsize;
							this._rowHeadList[0] += (newsize - oldsize);
							change = true;
						}
					}
				}
				if (change == true) {
					this._updateRowSizeExtend();
				}

				this._resizeBand();
				this._recreate_contents_all(false, false, false);
				retn = true;
			}
			else if (nRowIndex == -2) {
				var rows = this._curFormat._summrows;
				var rowsLen = rows.length;

				if (nSubRowIndex != undefined) {
					var index = nSubRowIndex;
					var oldsize = this._rowSummListSub[index];
					var newsize = this._getMaxSubRowSize(nRowIndex, nSubRowIndex);

					if (oldsize != newsize) {
						this._rowSummListSub[index] = newsize;
						this._rowSummList[0] += (newsize - oldsize);
						change = true;
					}
				}
				else {
					for (var j = 0; j < rowsLen; j++) {
						var index = j;
						var oldsize = this._rowSummListSub[index];
						var newsize = this._getMaxSubRowSize(nRowIndex, j);

						if (oldsize != newsize) {
							this._rowSummListSub[index] = newsize;
							this._rowSummList[0] += (newsize - oldsize);
							change = true;
						}
					}
				}
				if (change == true) {
					this._updateRowSizeExtend();
				}

				this._resizeBand();
				this._recreate_contents_all(false, false, false);
				retn = true;
			}
		}
		this._autoSizeRowProc = false;
		return retn;
	};

	_pGrid.autoSizeCol = function (strType, nPivotIndex, nColIndex, bBandindex) {
		if (arguments.length == 2) {
			nColIndex = nPivotIndex;
			nPivotIndex = -9;
		}
		if (strType == "col") {
			var size;
			if (nColIndex == -1) {
				var cols = this._curFormat._cols;
				var colsLen = cols.length;

				for (var i = 0; i < colsLen; i++) {
					size = this._getMaxColDataSizeBand(i);

					if (size >= 0 && this._setColSize(-9, i, size, bBandindex, true, true, (i != colsLen - 1))) {
						change = true;
					}
				}
			}
			else if (nColIndex >= 0) {
				size = this._getMaxColDataSizeBand(nColIndex);

				if (size >= 0) {
					this._setColSize(nPivotIndex, nColIndex, size, bBandindex, true, true);
				}
			}
		}
	};

	_pGrid.isDropdownCalendar = function () {
		if (this._currentCellEditor && this._currentCellEditor.visible == true && this._currentCellEditor._type_name == "CalendarControl") {
			return this._currentCellEditor.isDropdown();
		}
		return false;
	};

	_pGrid.isDropdownCombo = function () {
		if (this._currentCellEditor && this._currentCellEditor.visible == true && this._currentCellEditor._type_name == "ComboControl") {
			return this._currentCellEditor.isDropdown();
		}
		return false;
	};

	_pGrid.moveToNextCell = function () {
		return this._moveToCell("next", true, false, undefined, undefined, true);
	};

	_pGrid.moveToPrevCell = function () {
		return this._moveToCell("prev", true, false, undefined, undefined, true);
	};

	_pGrid.showEditor = function (bShow) {
		var val;

		if (bShow === undefined) {
			bShow = true;
		}
		bShow = nexacro._toBoolean(bShow);

		if (this._showEditing == bShow) {
			return false;
		}

		if (bShow) {
			this.setFocus(false);
			val = this._showEditor();
		}
		else {
			val = this._hideEditor();
		}
		return val;
	};

	_pGrid.dropdownCombo = function () {
		if (this._currentCellEditor && this._currentCellEditor.visible == true && this._currentCellEditor._type_name == "ComboControl") {
			this._currentCellEditor.dropdown();
			return true;
		}
		return false;
	};

	_pGrid.dropdownCalendar = function () {
		if (this._currentCellEditor && this._currentCellEditor.visible == true && this._currentCellEditor._type_name == "CalendarControl") {
			this._currentCellEditor.dropdown();
			return true;
		}
		return false;
	};

	_pGrid.getCurEditType = function () {
		var cellinfo = this._getBodyCellInfo(this._selectinfo.curcell);
		if (cellinfo) {
			return cellinfo._getAttrValue(cellinfo.edittype, this._selectinfo.curdsrow);
		}
		return "";
	};

	_pGrid.getEditCaret = function () {
		if (this._showEditing) {
			var editComp = this._currentCellEditor;
			if (editComp && editComp.getCaretPos) {
				return editComp.getCaretPos();
			}
		}
	};

	_pGrid.getEditSelect = function () {
		var editComp = this._currentCellEditor;
		if (editComp && editComp.getSelect) {
			return editComp.getSelect();
		}
	};

	_pGrid.getEditSelectedText = function () {
		var editComp = this._currentCellEditor;
		if (editComp && editComp.getSelectedText) {
			return editComp.getSelectedText();
		}
		return "";
	};

	_pGrid.getEditText = function () {
		if (this._showEditing) {
			var editComp = this._currentCellEditor;
			if (editComp) {
				return editComp.text;
			}
		}
	};

	_pGrid.setEditCaret = function (nPos) {
	};

	_pGrid.setEditSelect = function (nStart, nEnd) {
		var editor = this._currentCellEditor;

		if (!editor) {
			return false;
		}

		if (nStart == -1) {
			editor.setSelect(0, 0);
			return true;
		}
		else {
			if (editor.setSelect) {
				return editor.setSelect(nStart, nEnd);
			}
		}
		return false;
	};

	_pGrid.setEditSelectedText = function (strText) {
	};

	_pGrid.setEditText = function (strText) {
	};

	_pGrid.updateToDataset = function () {
		if (this._showEditing) {
			var editComp = this._currentCellEditor;
			if (editComp) {
				editComp._setDataset(false, this._currentCellRow);
				return true;
			}
			return false;
		}
		return false;
	};

	_pGrid.setTreeStatus = function (nRowIndex, bTreeStatus) {
		if (!this._hasTree) {
			return false;
		}

		bTreeStatus = nexacro._toBoolean(bTreeStatus);
		var indexes = this._treeIndexes;
		var rowcount = indexes.length;
		var rows = this._bodyBand._get_rows();

		if (rowcount <= nRowIndex || !rows || rows.length == 0) {
			return false;
		}

		var dsrowidx = indexes[nRowIndex];
		var cells = rows[0]._cells;

		var cellinfo = this._treeCellinfo;
		var editType = cellinfo._getEdittype(dsrowidx);

		var retn;
		if (bTreeStatus) {
			retn = this._setTreeState(nRowIndex, 1, true);
		}
		else {
			retn = this._setTreeState(nRowIndex, 0, true);
		}

		if (retn > 0) {
			if (nexacro._enableaccessibility && (nexacro._accessibilitytype == 4 || nexacro._accessibilitytype == 5)) {
				var obj = this._getCurrentBodyCell(this._currentDSrow, cellinfo._cellidx);
				if (obj) {
					if (nexacro._accessibilitytype == 4) {
						obj._setFocus(false);
					}
					else {
						obj._setAccessibilityNotifyEvent();
					}
				}
			}
			return true;
		}
		return false;
	};

	_pGrid.getTreeStatus = function (nRowIndex) {
		if (!this._hasTree) {
			return -1;
		}

		var indexes = this._treeIndexes;
		var rowcount = indexes.length;
		var rows = this._bodyBand._get_rows();

		if (rowcount <= nRowIndex || !rows || rows.length == 0) {
			return -1;
		}

		var dsrowidx = indexes[nRowIndex];
		var state = this._treeStates[dsrowidx];
		var cells = rows[0]._cells;

		var cellinfo = this._treeCellinfo;
		var editType = cellinfo._getEdittype(dsrowidx);

		if (editType == "tree") {
			if (cellinfo.treestate._bindtype == 1) {
				var colid = cellinfo.treestate._bindexpr;
				var state2 = this._binddataset.getColumn(dsrowidx, colid);

				if (state2 > 1) {
					state = state2;
				}
			}
		}

		if (state == 2) {
			state++;
		}
		return state;
	};

	_pGrid.getTreeChildCount = function (nRowIndex, bIsDatasetRow) {
		if (this._hasTree) {
			var row = nRowIndex;

			if (bIsDatasetRow == undefined) {
				bIsDatasetRow = true;
			}
			else {
				bIsDatasetRow = nexacro._toBoolean(bIsDatasetRow);
			}

			if (bIsDatasetRow === false) {
				row = this.getDatasetRow(nRowIndex);
			}

			if (row < 0 || this._rowcount <= row) {
				return 0;
			}

			var cellinfo = this._treeCellinfo;
			var lvl1 = cellinfo._getTreeLevel(row);
			var lvl2, temp = -1;
			var cnt = 0;

			for (var i = row + 1; i < this._rowcount; i++) {
				lvl2 = cellinfo._getTreeLevel(i);
				if (lvl1 >= lvl2) {
					break;
				}

				if (temp >= 0) {
					if (temp == lvl2) {
						cnt++;
					}
				}
				else {
					if (lvl1 < lvl2) {
						cnt++;
						temp = lvl2;
					}
				}
			}
			return cnt;
		}
		return 0;
	};

	_pGrid.getTreeChildRow = function (nRowIndex, nChildIndex, bIsDatasetRow) {
		if (this._hasTree) {
			var row = nRowIndex;

			if (bIsDatasetRow == undefined) {
				bIsDatasetRow = true;
			}
			else {
				bIsDatasetRow = nexacro._toBoolean(bIsDatasetRow);
			}

			if (bIsDatasetRow === false) {
				row = this.getDatasetRow(nRowIndex);
			}

			if (row < 0 || this._rowcount <= row) {
				return -1;
			}

			var cellinfo = this._treeCellinfo;
			var lvl1 = cellinfo._getTreeLevel(row);
			var lvl2, temp = -1;
			var lastrow = -1;
			var cnt = 0;

			for (var i = row + 1; i < this._rowcount; i++) {
				lvl2 = cellinfo._getTreeLevel(i);
				if (lvl1 >= lvl2) {
					break;
				}

				if (temp >= 0) {
					if (temp <= lvl2) {
						cnt++;
						if (nChildIndex == cnt) {
							return i;
						}

						lastrow = i;
					}
				}
				else {
					if (lvl1 < lvl2) {
						temp = lvl2;
						if (nChildIndex == 0) {
							return i;
						}

						lastrow = i;
					}
				}
			}

			if (nChildIndex == -1) {
				return lastrow;
			}
		}

		return -1;
	};

	_pGrid.getTreeParentRow = function (nRowIndex, bIsDatasetRow) {
		if (this._hasTree) {
			var row = nRowIndex;

			if (bIsDatasetRow == undefined) {
				bIsDatasetRow = true;
			}
			else {
				bIsDatasetRow = nexacro._toBoolean(bIsDatasetRow);
			}

			if (bIsDatasetRow === false) {
				row = this.getDatasetRow(nRowIndex);
			}

			if (row < 0 || this._rowcount <= row) {
				return -1;
			}

			var cellinfo = this._treeCellinfo;
			var lvl1 = cellinfo._getTreeLevel(row);
			var lvl2;

			for (var i = row - 1; i >= 0; i--) {
				lvl2 = cellinfo._getTreeLevel(i);
				if (lvl1 > lvl2) {
					return i;
				}
			}
		}
		return -1;
	};

	_pGrid.getTreeSiblingRow = function (nRowIndex, nOffset, bIsDatasetRow) {
		if (this._hasTree) {
			var row = nRowIndex;

			if (nOffset === undefined) {
				nOffset = 1;
			}

			if (bIsDatasetRow == undefined) {
				bIsDatasetRow = true;
			}
			else {
				bIsDatasetRow = nexacro._toBoolean(bIsDatasetRow);
			}

			if (bIsDatasetRow === false) {
				row = this.getDatasetRow(nRowIndex);
			}

			if (row < 0 || this._rowcount <= row) {
				return -1;
			}

			var cellinfo = this._treeCellinfo;
			var lvl1 = cellinfo._getTreeLevel(row);
			var lvl2;
			var set = 0;

			if (nOffset < 0) {
				for (var i = row - 1; i >= 0; i--) {
					lvl2 = cellinfo._getTreeLevel(i);
					if (lvl1 > lvl2) {
						break;
					}
					else if (lvl1 == lvl2) {
						set--;
						if (nOffset == set) {
							return i;
						}
					}
				}
			}
			else if (nOffset > 0) {
				for (var i = row + 1; i < this._rowcount; i++) {
					lvl2 = cellinfo._getTreeLevel(i);
					if (lvl1 > lvl2) {
						break;
					}
					else if (lvl1 == lvl2) {
						set++;
						if (nOffset == set) {
							return i;
						}
					}
				}
			}
			else {
				return row;
			}
		}
		return -1;
	};

	_pGrid.getTreePath = function (nRowIndex, bIsDatasetRow) {
		if (this._hasTree) {
			var row = nRowIndex;

			if (bIsDatasetRow == undefined) {
				bIsDatasetRow = true;
			}
			else {
				bIsDatasetRow = nexacro._toBoolean(bIsDatasetRow);
			}

			if (bIsDatasetRow === false) {
				row = this.getDatasetRow(nRowIndex);
			}

			if (row < 0 || this._rowcount <= row) {
				return "";
			}

			var cellinfo = this._treeCellinfo;
			var lvl = cellinfo._getTreeLevel(row);
			var start = cellinfo._getTreeStartLevel(row);
			var val = [];
			var i = 0;

			while (row >= 0) {
				val[i] = cellinfo._getValue(row);
				row = this.getTreeParentRow(row);
				i++;
			}

			var str = "";
			for (i = val.length - 1; i >= 0; i--) {
				str += val[i];

				if (i > 0) {
					str += this.treepathdelimiter;
				}
			}
			return str;
		}
		return "";
	};

	_pGrid.getTreeRow = function (nRowIndex) {
		if (this._hasTree) {
			if (typeof (nRowIndex) == "string") {
				var treepath = nRowIndex;
				var cnt = this._rowcount;
				var path;
				nRowIndex = -1;

				for (var i = 0; i < cnt; i++) {
					path = this.getTreePath(i, true);
					if (path == treepath) {
						nRowIndex = i;
						break;
					}
				}
			}
			if (nRowIndex >= 0) {
				var _treeIndexes = this._treeIndexes;
				var _treeIndexesLen = _treeIndexes.length;

				for (var k = 0; k < _treeIndexesLen; k++) {
					if (_treeIndexes[k] == nRowIndex) {
						return k;
					}
				}
			}
		}
		return -1;
	};

	_pGrid.getDatasetRow = function (nRowIndex) {
		if (nRowIndex >= 0) {
			if (this._hasTree) {
				if (this._treeIndexes.length > nRowIndex) {
					return this._treeIndexes[nRowIndex];
				}
			}
			else {
				if (this._rowcount > nRowIndex) {
					return nRowIndex;
				}
			}
		}
		return -1;
	};

	_pGrid.isTreeLeafRow = function (nRowIndex, bIsDatasetRow) {
		if (this._hasTree) {
			var cnt = this.getTreeChildCount(nRowIndex, bIsDatasetRow);
			if (cnt == 0) {
				if (bIsDatasetRow == undefined) {
					bIsDatasetRow = true;
				}
				else {
					bIsDatasetRow = nexacro._toBoolean(bIsDatasetRow);
				}

				var row = nRowIndex;
				if (bIsDatasetRow === false) {
					row = this.getDatasetRow(nRowIndex);
				}

				if (row < 0 || this._rowcount <= row) {
					return false;
				}

				return true;
			}
		}
		return false;
	};

	_pGrid.isTreeRootRow = function (nRowIndex, bIsDatasetRow) {
		if (this._hasTree) {
			var row = nRowIndex;

			if (bIsDatasetRow == undefined) {
				bIsDatasetRow = true;
			}
			else {
				bIsDatasetRow = nexacro._toBoolean(bIsDatasetRow);
			}

			if (bIsDatasetRow === false) {
				row = this.getDatasetRow(nRowIndex);
			}

			if (row < 0 || this._rowcount <= row) {
				return false;
			}

			var cellinfo = this._treeCellinfo;
			var lvl = cellinfo._getTreeLevel(row);
			var start = cellinfo._getTreeStartLevel(row);

			if (start == lvl) {
				return true;
			}
		}
		return false;
	};

	_pGrid.isTreeExpandedRow = function (nRowIndex, bIsDatasetRow) {
		if (this._hasTree) {
			var row = nRowIndex;

			if (bIsDatasetRow == undefined) {
				bIsDatasetRow = true;
			}
			else {
				bIsDatasetRow = nexacro._toBoolean(bIsDatasetRow);
			}

			if (bIsDatasetRow === false) {
				row = this.getDatasetRow(nRowIndex);
			}

			if (row < 0 || this._rowcount <= row) {
				return false;
			}

			while (row >= 0) {
				row = this.getTreeParentRow(row);

				if (row < 0) {
					break;
				}

				var indexes = this._treeIndexes;
				var rowcount = indexes.length;

				if (row >= 0 && rowcount > 0) {
					var state = this._treeStates[row];

					if (state == 0) {
						return false;
					}
				}
			}
			return true;
		}
		return false;
	};

	_pGrid.isTreeCollapsedRow = function (nRowIndex, bIsDatasetRow) {
		if (this._hasTree) {
			var row = nRowIndex;

			if (bIsDatasetRow == undefined) {
				bIsDatasetRow = true;
			}
			else {
				bIsDatasetRow = nexacro._toBoolean(bIsDatasetRow);
			}

			if (bIsDatasetRow === false) {
				row = this.getDatasetRow(nRowIndex);
			}

			if (row < 0 || this._rowcount <= row) {
				return false;
			}

			while (row >= 0) {
				row = this.getTreeParentRow(row);

				if (row < 0) {
					break;
				}

				var indexes = this._treeIndexes;
				var rowcount = indexes.length;

				if (row >= 0 && rowcount > 0) {
					var state = this._treeStates[row];

					if (state == 0) {
						return true;
					}
				}
			}
		}
		return false;
	};

	_pGrid.getCsvData = function (bSelOnly) {
	};

	_pGrid.getHeadValue = function (nCell) {
		var format = this._curFormat;
		if (format && format._headcells && nCell >= 0 && format._headcells.length > nCell) {
			var cellinfo = this._curFormat._headcells[nCell];

			if (cellinfo && cellinfo.text._bindtype != 0) {
				return cellinfo._getValue(this._currentDSrow);
			}
		}
		return null;
	};

	_pGrid.getSummValue = function (nCell) {
		var format = this._curFormat;
		if (format && format._summcells && nCell >= 0 && format._summcells.length > nCell) {
			var cellinfo = this._curFormat._summcells[nCell];

			if (cellinfo && cellinfo.text._bindtype != 0) {
				return cellinfo._getValue(this._currentDSrow);
			}
		}
		return null;
	};

	_pGrid.getBindCellIndex = function (strBand, strColID) {
		var format = this._curFormat;

		if (!format) {
			return -1;
		}

		strBand = strBand.toLowerCase();

		if (strColID) {
			if (strBand == "head" && format._headcells) {
				var _headcells = format._headcells;
				var _headcellsLen = _headcells.length;
				var cellinfo;

				for (var i = 0; i < _headcellsLen; i++) {
					cellinfo = _headcells[i];

					if (cellinfo.text._bindexpr == strColID) {
						return i;
					}
				}
			}
			else if (strBand == "body" && format._bodycells) {
				var _bodycells = format._bodycells;
				var _bodycellsLen = _bodycells.length;
				var cellinfo;

				for (var i = 0; i < _bodycellsLen; i++) {
					cellinfo = _bodycells[i];

					if (cellinfo.text._bindexpr == strColID) {
						return i;
					}
				}
			}
			else if (strBand == "summ" && format._summcells) {
				var _summcells = format._summcells;
				var _summcellsLen = _summcells.length;
				var cellinfo;

				for (var i = 0; i < _summcellsLen; i++) {
					cellinfo = _summcells[i];

					if (cellinfo.text._bindexpr == strColID) {
						return i;
					}
				}
			}
		}
		return -1;
	};

	_pGrid._getDisplayCalendarCtrl = function () {
		if (!this._displaycalendarctrl) {
			this._displaycalendarctrl = new nexacro.CalendarCtrl("displaycalendarctrl", 0, 0, 0, 0, this, false, true);
		}

		return this._displaycalendarctrl;
	};

	_pGrid.isAboveSelected = function () {
	};

	_pGrid._absolutelyResetScrollPos = function (v) {
		var head = this._headBand;
		var body = this._bodyBand;
		var summ = this._summBand;

		if (this._control_element) {
			this._control_element._reset_scrollpos = v;
		}

		if (head && head._control_element) {
			head._control_element._reset_scrollpos = v;
		}

		if (body && body._control_element) {
			body._control_element._reset_scrollpos = v;
		}

		if (summ && summ._control_element) {
			summ._control_element._reset_scrollpos = v;
		}
	};

	_pGrid._no_use_onscroll_callback_after = false;
	_pGrid._adjustGridScrollRows_callback = function (no_ani) {
		if (!this.vscrollbar) {
			return;
		}

		var control_elem = this._control_element;
		var vscroll_limit = control_elem.vscroll_limit;
		var pos = this.vscrollbar._pos;
		var body = this._bodyBand;

		if (pos > vscroll_limit) {
			pos = vscroll_limit;
		}

		if (no_ani) {
			this._scroll_vpos_queue = [];
		}
		else {
			this._scroll_vpos_queue.pop();

			if (this._scroll_vpos_queue.length > 0) {
				this._aniframe_rowscroll.start();
			}
		}

		this._last_scroll_top = control_elem.scroll_top;
		this._toprowpos = this._getScreenTopRowPos(pos);
		this._bottomrowpos = this._getScreenBottomRowPos(pos);
		body._update_rows = body._matrix._adjustScrollRows(pos);
		body._on_refresh_rows(true);
		this._no_use_onscroll_callback_after = true;
		control_elem.setElementVScrollPos(pos);
		this._MoveEditComp();
		this._updateSelector("vscroll", pos - this._last_scroll_top);
		this._adjustOverlayElements(false, this._is_use_fakemerge);
	};

	_pGrid._adjustGridScrollRows_callback_onscroll_after = function (pos) {
		if (this._no_use_onscroll_callback_after == true) {
			this._no_use_onscroll_callback_after = false;
			return;
		}

		var body = this._bodyBand;

		this._toprowpos = this._getScreenTopRowPos(pos);
		this._bottomrowpos = this._getScreenBottomRowPos(pos);
		body._update_rows = body._matrix._adjustScrollRows(pos);
		body._on_refresh_rows(true);
		this._MoveEditComp();
		this._adjustOverlayElements(false, this._is_use_fakemerge);
	};

	_pGrid._adjustGridScrollRows_callback_onscroll = function () {
		this._no_use_onscroll_callback_after = false;

		this._scroll_vpos_queue.pop();

		var pos = this.vscrollbar._pos;
		var control_elem = this._control_element;

		if (this._scroll_vpos_queue.length > 0) {
			this._aniframe_rowscroll.start();
		}
		this._last_scroll_top = control_elem.scroll_top;
		control_elem.setElementVScrollPos(pos);
		this._updateSelector("vscroll", pos - this._last_scroll_top);
	};

	_pGrid._adjustGridScrollCols_callback = function (no_ani) {
		if (!this.hscrollbar) {
			return;
		}

		var pos = this.hscrollbar._pos;
		var prevpos = this._control_element.scroll_left;

		if (no_ani) {
			this._scroll_hpos_queue = [];
		}
		else {
			this._scroll_hpos_queue.pop();

			if (this._scroll_hpos_queue.length > 0) {
				this._aniframe_colscroll.start();
			}
		}

		this._control_element.setElementHScrollPos(pos);

		this._bodyBand._matrix._adjustColsDisplay(false, true);
		if (this._headBand) {
			this._headBand._matrix._adjustColsDisplay(false, true);
		}
		if (this._summBand) {
			this._summBand._matrix._adjustColsDisplay(false, true);
		}

		this._MoveEditComp();
		this._updateSelector("hscroll", pos - prevpos);
		this._adjustOverlayElements(false, this._is_use_fakemerge);
	};

	_pGrid._callback_onscroll = _pGrid._adjustGridScrollRows_callback_onscroll_after;

	_pGrid._is_over_scroll = 0;
	_pGrid.on_vscroll = function (obj, e) {
		if (this.onvscroll && this.onvscroll._has_handlers && this._is_recreating == false) {
			e.fromobject = this;
			this.onvscroll._fireEvent(this, e);
		}

		this._is_over_scroll = 0;

		var vscrollbar = this.vscrollbar;

		if (!vscrollbar) {
			return;
		}

		if (this._scrollpixel != "all") {
			if (vscrollbar._pos > vscrollbar._orgmax) {
				this._is_over_scroll = vscrollbar._pos - this.vscrollbar._orgmax;
			}
		}

		var control_elem = this._control_element;

		if (!control_elem || !this._bodyBand || e.type == "trackstart" || e.type == "tracklastover" || e.type == "trackfirstover") {
			return;
		}

		if (e.type == "trackend" || e.type == "first" || e.type == "last") {
			this._procRefreshDOM = true;
		}

		if (nexacro.Browser == "Runtime" || (navigator.userAgent.indexOf("Android 4.1") > -1 || navigator.userAgent.indexOf("Android 4.2") > -1 || navigator.userAgent.indexOf("Android 4.3") > -1 || navigator.userAgent.indexOf("Android 5.0") > -1)) {
			this._adjustGridScrollRows_callback(true);
		}
		else {
			if (e._evtkind == "fling" || e._evtkind == "slide" || e.type == "track") {
				this._bodyBand._control_element._setOnScrollCallbackTarget(this);

				if (!this._aniframe_rowscroll) {
					var pThis = this;
					this._scroll_vpos_queue = [];

					if (nexacro.isTouchInteraction && nexacro.Browser != "Runtime") {
						this._aniframe_rowscroll = new nexacro.AnimationFrame(this, function () {
							pThis._adjustGridScrollRows_callback_onscroll();
						});
					}
					else {
						this._aniframe_rowscroll = new nexacro.AnimationFrame(this, function () {
							pThis._adjustGridScrollRows_callback();
						});
					}
				}

				var cnt = this._scroll_vpos_queue.push(e.pos);

				if (cnt == 1) {
					this._aniframe_rowscroll.start();
				}
			}
			else {
				this.vscrollbar._no_set_scrollinfo = true;
				this._adjustGridScrollRows_callback(true);
				this.vscrollbar._no_set_scrollinfo = false;
			}
		}

		this._procRefreshDOM = undefined;

		return true;
	};

	_pGrid.on_hscroll = function (obj, e) {
		if (this.onhscroll && this.onhscroll._has_handlers && this._is_recreating == false) {
			e.fromobject = this;
			this.onhscroll._fireEvent(this, e);
		}

		var control_elem = this._control_element;

		if (!control_elem || !this._bodyBand || e.type == "trackstart" || e.type == "tracklastover" || e.type == "trackfirstover") {
			return;
		}

		if (e.type == "trackend" || e.type == "first" || e.type == "last") {
			this._procRefreshDOM = true;
		}

		if (nexacro.Browser != "Runtime") {
			if (!this._aniframe_colscroll) {
				var pThis = this;
				this._scroll_hpos_queue = [];

				this._aniframe_colscroll = new nexacro.AnimationFrame(this, function () {
					pThis._adjustGridScrollCols_callback();
				});
			}

			if (e._evtkind == "fling" || e._evtkind == "slide" || e.type == "track") {
				var cnt = this._scroll_hpos_queue.push(e.pos);

				if (cnt == 1) {
					this._aniframe_colscroll.start();
				}
			}
			else {
				this._adjustGridScrollCols_callback();
			}
		}
		else {
			this._adjustGridScrollCols_callback(true);
		}

		this._procRefreshDOM = undefined;
		return true;
	};

	_pGrid._isWheelScrollable = function (delta) {
		var control_elem = this._control_element;
		if (!control_elem) {
			return false;
		}

		var st = control_elem.scroll_top;
		var sh = control_elem.container_maxheight;
		var ch = this._getBodyClientSize()[1];

		if ((st + ch >= sh && delta < 0) || (st == 0 && delta > 0)) {
			return false;
		}

		return true;
	};

	_pGrid._setVScrollDefaultAction = function (vscrollbar, wheelDelta) {
		var pos, max;

		if (this._scrollpixel != "all") {
			if (wheelDelta < 0) {
				if (vscrollbar.max > vscrollbar.pos) {
					pos = vscrollbar.pos + this.wheelscrollrow;
				}
				else {
					vscrollbar._set_pixelpos(vscrollbar._pos - wheelDelta, "mousewheel");
					return;
				}
			}
			else {
				if (vscrollbar.min < vscrollbar.pos) {
					pos = vscrollbar.pos - this.wheelscrollrow;
				}
				else {
					vscrollbar._set_pixelpos(vscrollbar._pos - wheelDelta, "mousewheel");
					return;
				}
			}
		}
		else {
			if (wheelDelta < 0) {
				pos = vscrollbar._scroll_reverse_convert(vscrollbar.pos, true)[0];
				max = vscrollbar._scroll_reverse_convert(vscrollbar.max, true)[0];

				if (max > pos) {
					pos += this.wheelscrollrow;
				}
				else {
					vscrollbar._set_pixelpos(vscrollbar._pos - wheelDelta, "mousewheel");
					return;
				}
			}
			else {
				pos = vscrollbar._scroll_reverse_convert(vscrollbar.pos, true)[0];
				pos -= this.wheelscrollrow;
			}
		}
		vscrollbar._set_rowpos(pos + this._getFixRowCnt(), "mousewheel");
	};

	_pGrid._makeEventInfo = function (cellobj, subcellobj, from_refer_comp) {
		var obj = {
			cell : -1, 
			col : -1, 
			row : -9, 
			subrow : -1, 
			mergecell : -1, 
			mergecol : -1, 
			mergerow : -1, 
			pivotindex : -9
		};

		if (cellobj && cellobj._type_name == "GridCell") {
			obj.cell = cellobj._cellidx;
			obj.col = cellobj._refobj._col;
			obj.row = this._getDataRow(cellobj._rowidx);
			obj.subrow = cellobj._refobj._row;

			if (subcellobj) {
				obj.mergecell = subcellobj._cellidx;
				obj.mergecol = subcellobj._refobj._col;
				obj.mergerow = subcellobj._refobj._row;
			}
		}
		else {
			var band = this._findBandObj(from_refer_comp);

			if (band) {
				if (band.id == "head") {
					obj.row = -1;
				}
				else if (band.id == "summ") {
					obj.row = -2;
				}
			}
		}
		return obj;
	};
	_pGrid.on_fire_sys_onflingend = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp) {
		if (this._aniframe_rowscroll) {
			this._aniframe_rowscroll.stop();
		}
		if (this._aniframe_colscroll) {
			this._aniframe_colscroll.stop();
		}

		this._adjustGridScrollCols_callback(true);
		this._adjustGridScrollRows_callback(true);
		return true;
	};

	_pGrid._on_nodataareaclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (!this._is_alive) {
			return;
		}
		if (this.enable) {
			this.on_fire_onnodataareaclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		}
		return true;
	};

	_pGrid.on_fire_onnodataareaclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onnodataareaclick && this.onnodataareaclick._has_handlers) {
			var evt = new nexacro.MouseEventInfo(from_comp, "onnodataareaclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onnodataareaclick._fireEvent(this, evt);
		}
		return true;
	};

	_pGrid._on_nodataareadblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (!this._is_alive) {
			return;
		}
		if (this.enable) {
			this.on_fire_onnodataareadblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		}
		return true;
	};

	_pGrid.on_fire_onnodataareadblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onnodataareadblclick && this.onnodataareadblclick._has_handlers) {
			var evt = new nexacro.MouseEventInfo(from_comp, "onnodataareadblclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onnodataareadblclick._fireEvent(this, evt);
		}
		return true;
	};

	_pGrid.on_fire_user_ondragenter = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this._noFireDragFlag == true) {
			return;
		}

		var cellobj = from_refer_comp;
		cellobj = this._findCellObj(cellobj);

		if (cellobj && cellobj._type_name == "GridCell") {
			if (cellobj.parentcell) {
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		return nexacro.Component.prototype.on_fire_user_ondragenter.call(this, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
	};

	_pGrid.on_fire_user_ondragleave = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this._noFireDragFlag == true) {
			return;
		}

		var cellobj = from_refer_comp;
		cellobj = this._findCellObj(cellobj);

		if (cellobj && cellobj._type_name == "GridCell") {
			if (cellobj.parentcell) {
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		return nexacro.Component.prototype.on_fire_user_ondragleave.call(this, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
	};

	_pGrid.on_fire_user_ondragmove = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this._noFireDragFlag == true) {
			return;
		}

		var cellobj = from_refer_comp;
		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj && cellobj._type_name == "GridCell") {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		if (this.ondragmove && this.ondragmove._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.GridDragEventInfo(this, "ondragmove", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow);

			return this.ondragmove._fireUserEvent(this, evt);
		}
		return false;
	};

	_pGrid.on_fire_sys_ondragmove = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (!this._is_drag_sameselect) {
			return this._areaselectMove(from_refer_comp, canvasX, canvasY);
		}
		else {
			this._is_drag_selecting = true;
		}
	};

	_pGrid._noFireDragFlag = false;
	_pGrid.on_fire_user_ondrag = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, self_refer_comp) {
		var cellobj = from_refer_comp;
		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj && cellobj._type_name == "GridCell") {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);
		var cell = evtinfo.cell;
		var col = evtinfo.col;
		var mergecell = evtinfo.mergecell;
		var mergecol = evtinfo.mergecol;
		var mergerow = evtinfo.mergerow;
		var pivotindex = evtinfo.pivotindex;
		var row = evtinfo.row;
		var subrow = evtinfo.subrow;

		this._noFireDragFlag = false;

		if (this.ondrag && this.ondrag._has_handlers) {
			var evt = new nexacro.GridDragEventInfo(this, "ondrag", this._getDragData(), null, this, self_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow);

			if (this.ondrag._fireUserEvent(this, evt) == true) {
				return [true, this, self_refer_comp, evt.dragdata, evt.userdata];
			}
			else if (this.ondrag.defaultprevented == true) {
				return [false, this, self_refer_comp, evt.dragdata, evt.userdata];
			}
		}

		if (this._resizer_rowctrl && this._resizer_rowctrl._is_tracking == true) {
			var resize_cursor = nexacro._getCachedValueObj("row-resize");
			this._setGlobalCursor(resize_cursor, cellobj);
		}
		else if (this._resizer_colctrl && this._resizer_colctrl._is_tracking == true) {
			var resize_cursor = nexacro._getCachedValueObj("col-resize");
			this._setGlobalCursor(resize_cursor, cellobj);
		}
		else if (this.cellmovingtype != "none" || (this.ondrag && this.ondrag._has_handlers)) {
			if (cellobj && cellobj._type_name == "GridCell" && cellobj._rowidx == -1) {
				var colidx = cellobj._refobj._col;
				var info0 = this._getColMergeInfo("head", colidx);
				var info1 = this._getColMergeInfo("body", colidx);
				var info2 = this._getColMergeInfo("summ", colidx);
				var dragcursor = nexacro._getCachedValueObj("move");

				if (info0[1] == 1 && (info1 == null || info1[1] == 1) && (info2 == null || info2[1] == 1)) {
					if (this.cellmovingtype != "none") {
						this._movingcell = cellobj;
						this._setGlobalCursor(dragcursor, cellobj);
					}
				}
				else {
					this._movingcell = null;
				}
			}

			if (this.ondrag && this.ondrag._has_handlers) {
				if (this._movingcell != null) {
					this._noFireDragFlag = true;
					return [true, this, self_refer_comp, evt.dragdata, evt.userdata];
				}
				else {
					return [false, this, self_refer_comp, evt.dragdata, evt.userdata];
				}
			}
			else if (cellobj && cellobj._type_name == "GridCell" && cellobj._rowidx == -1) {
				this._noFireDragFlag = true;
				return [true, this, self_refer_comp, this._getDragData(), null];
			}
		}
		return [false];
	};

	_pGrid.on_fire_user_ondrop = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		var cellobj = from_refer_comp;
		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj && cellobj._type_name == "GridCell") {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		if (this._resizer_rowctrl && this._resizer_rowctrl._is_tracking == true) {
			this._setGlobalCursor(null, cellobj);
		}
		else if (this._resizer_colctrl && this._resizer_colctrl._is_tracking == true) {
			this._setGlobalCursor(null, cellobj);
		}
		else if (this.cellmovingtype != "none") {
			var movingcell = this._movingcell;
			var format = this._curFormat;

			this._setGlobalCursor(null, cellobj);

			if (movingcell && movingcell._is_alive && movingcell != cellobj && cellobj._rowidx == -1) {
				var fromcol = movingcell._refobj._col;
				var fromidx = movingcell._refobj._cellidx;
				var tocol = cellobj._refobj._col;
				var fromcolspan = movingcell._refobj._colspan;

				var info = this._getColMergeInfo("head", tocol);
				tocol = info[0];
				var tocolspan = info[1];

				this._autofitcol_rate = [];
				format._moveColumn(fromcol, tocol, fromcolspan, tocolspan, this.cellmovingtype);

				this._addRefreshContents("cellmoving", this._headBand);
				this._addRefreshContents("cellmoving", this._bodyBand);
				this._addRefreshContents("cellmoving", this._summBand);
			}
			this._movingcell = null;
		}

		if (this._noFireDragFlag == true) {
			this._noFireDragFlag = false;
			return;
		}

		if (this.ondrop && this.ondrop._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.GridDragEventInfo(this, "ondrop", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow);

			return this.ondrop._fireUserEvent(this, evt);
		}
		return false;
	};

	_pGrid._mouseSelection = function (cellobj, ctrl_key, shift_key, canvasX, canvasY, from_comp, from_refer_comp, no_select) {
		var editor = this._currentCellEditor;
		var fobj = from_refer_comp;
		var bhide = true;

		while (fobj) {
			if (fobj == editor || fobj instanceof nexacro.GridScrollBarCtrl || fobj instanceof nexacro.ScrollBarCtrl) {
				bhide = false;
				break;
			}
			fobj = fobj.parent;
		}

		if (bhide && editor) {
			this._hideEditor();
		}

		if (this._resizer_colctrl && this._resizer_colctrl._is_tracking) {
			return;
		}
		if (this._resizer_rowctrl && this._resizer_rowctrl._is_tracking) {
			return;
		}
		if (this._down_scroll_top >= 0 && this._down_scroll_top != this._last_scroll_top) {
			return;
		}

		if (cellobj && cellobj._type_name == "GridCell") {
			this._lbuttondown_proc = true;

			var band = cellobj._band.id;
			var retn = this._on_grid_lbuttondown(cellobj, band, ctrl_key, shift_key, no_select);

			if (!cellobj._is_alive || no_select) {
				return;
			}

			if (this._showEditorCell) {
				if (nexacro._toBoolean(this.readonly) == false) {
					if (retn) {
						var cell = cellobj;

						if (cell && cell._hasEditor()) {
							cell._showEditor();
							var datarow = this._getDataRow(cell._rowidx);
							this._beforeEditRowIdx = datarow;
							this._beforeEditCellIdx = cell._cellidx;
							this._showEditing = true;
							cell._refobj._editingRow = datarow;
							cell._editshowing = true;

							var editor = this._currentCellEditor;
							editor._setFocus(false);

							if (editor && editor.setCaretPos && !editor.autoselect) {
								editor.setCaretPos(0);
							}
						}
					}
					else {
						this._showEditor();
					}
				}
				this._showEditorCell = false;
				this._showEditRowIdx = -1;
				this._showEditCellIdx = -1;
			}

			if (this.selectchangetype == "down" && nexacro._toBoolean(this.readonly) == false) {
				var datarow = this._getDataRow(cellobj._rowidx);
				var displayType = cellobj._refobj._getDisplaytype(datarow);

				if (displayType == "checkbox") {
					if (this.cellclickbound == "cell") {
						cellobj._needToggle("onlbuttondown", cellobj);
					}
					else {
						if (cellobj != from_refer_comp && cellobj._subComp && cellobj._subComp._toggleCheck) {
							if (cellobj._selected) {
								cellobj._subComp._toggleCheck();
							}
						}
					}
				}
				else {
					cellobj._needToggle("onlbuttondown", cellobj);
				}
			}
			this._lbuttondown_proc = false;
		}
	};

	_pGrid._common_fire_sys_lbuttondown = function (cellobj, ctrl_key, shift_key, canvasX, canvasY, from_comp, from_refer_comp) {
		if (!this._is_alive) {
			return;
		}

		if (this.selectchangetype == "up") {
			if (this._isAreaSelect() && this._selectscrollmode == "select") {
				this._mouseSelection(cellobj, ctrl_key, shift_key, canvasX, canvasY, from_comp, from_refer_comp);
			}
			else if (this.selecttype == "multirow") {
				this._mouseSelection(cellobj, ctrl_key, shift_key, canvasX, canvasY, from_comp, from_refer_comp, true);
			}
		}
		else {
			this._mouseSelection(cellobj, ctrl_key, shift_key, canvasX, canvasY, from_comp, from_refer_comp);
		}

		if (this._is_down_act) {
			this._on_last_lbuttonup(true);
		}
	};

	_pGrid._common_fire_user_lbuttondown = function (cellobj, ctrl_key, shift_key, canvasX, canvasY, from_comp, from_refer_comp) {
		if (!this._is_alive) {
			return;
		}

		this._resizerStart(canvasX, canvasY, cellobj, "down", from_refer_comp);

		var resizer_colctrl = this._resizer_colctrl;
		var resizer_rowctrl = this._resizer_rowctrl;

		if (resizer_colctrl && resizer_colctrl._is_range) {
			var win = this._getWindow();

			resizer_colctrl._setTracksize(this._client_height);

			if (resizer_colctrl._direction == "horizon") {
				resizer_colctrl.move(canvasX, this._client_top, 1, resizer_colctrl._tracksize);
			}

			nexacro._setTrackInfo(win, resizer_colctrl, win._curWindowX, win._curWindowY);
		}
		else if (resizer_rowctrl && resizer_rowctrl._is_range) {
			var win = this._getWindow();

			resizer_rowctrl._setTracksize(this._client_width);

			if (resizer_rowctrl._direction == "vertical") {
				resizer_rowctrl.move(this._client_left, canvasY, resizer_rowctrl._tracksize, 1);
			}

			nexacro._setTrackInfo(win, resizer_rowctrl, win._curWindowX, win._curWindowY);
		}

		if (this._select_ctrl) {
			this._select_ctrl._initTrackInfo();
		}
	};

	_pGrid._recalcTouchInfosXY = function (obj, touchinfos, need_recalcXY) {
		var touchinfo, posobj;
		for (var i = 0; i < touchinfos.length; i++) {
			if (touchinfo = touchinfos[i]) {
				posobj = this._recalcXY(obj, touchinfo.canvasX, touchinfo.canvasY, need_recalcXY);
				touchinfo.canvasX = posobj.canvasX;
				touchinfo.canvasY = posobj.canvasY;
				touchinfo.clientX = posobj.clientX;
				touchinfo.clientY = posobj.clientY;
			}
		}
	};

	_pGrid._getRecalcCanvasXY = function (elem, canvasX, canvasY) {
		if (this._recalcXY_info) {
			canvasX = this._recalcXY_info[0];
			canvasY = this._recalcXY_info[1];
			this._recalcXY_info = null;
		}
		canvasX += this._adjust_left - this._scroll_left || 0;
		canvasY += this._adjust_top - this._scroll_top || 0;
		return [canvasX, canvasY];
	};

	_pGrid._recalcXY = function (obj, canvasX, canvasY, need_recalcXY) {
		var real_canvasX = canvasX;
		var real_canvasY = canvasY;

		if (obj._type_name == "GridCell") {
			if (need_recalcXY) {
				var rect = obj._setPositionInGrid(null, false, true);

				real_canvasX = canvasX + rect.orgl;
				real_canvasY = canvasY + rect.orgt;
			}
			else {
				var area = obj._refobj._area;
				var band = obj._band.id;

				if (area == "body") {
					real_canvasX = canvasX + this._curFormat.leftWidth;
					real_canvasX -= this._getScrollLeft();
				}
				else if (area == "right") {
					var gridrow = obj.parent;
					var rect = gridrow._getAreaRect(area);
					var areal = rect.left;
					real_canvasX = canvasX + areal;
				}

				if (band == "body" && !obj.parent._fixed) {
					real_canvasY -= this._getScrollTop();
					real_canvasY += this._fixed_height;
				}
			}
		}
		this._recalcXY_info = [real_canvasX, real_canvasY];
		var real_clientXY = this._getClientXY(real_canvasX, real_canvasY);

		return {
			canvasX : real_canvasX, 
			canvasY : real_canvasY, 
			clientX : real_clientXY[0], 
			clientY : real_clientXY[1]
		};
	};

	_pGrid.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp, need_recalcXY) {
		return this.on_fire_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp, true, need_recalcXY);
	};

	_pGrid.on_fire_sys_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp, need_recalcXY) {
		return this.on_fire_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp, false, need_recalcXY);
	};

	_pGrid._down_scroll_top = -1;
	_pGrid.on_fire_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp, user_fire, need_recalcXY) {
		var cellobj = from_refer_comp;

		cellobj = this._findCellObj(cellobj);

		this._recalcTouchInfosXY(cellobj, changedtouchinfos, need_recalcXY);

		var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);
		var subcellobj;

		if (cellobj && cellobj._type_name == "GridCell") {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var retn = false;
		if (this.ontouchstart && this.ontouchstart._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.TouchEventInfo(this, "ontouchstart", touchinfos, changedtouchinfos, from_comp, from_refer_comp);

			if (user_fire) {
				retn = this.ontouchstart._fireUserEvent(this, evt);
			}
			else {
				retn = this.ontouchstart._fireSysEvent(this, evt);
			}
		}

		this._down_scroll_top = this._last_scroll_top;

		if (touchinfo) {
			if (user_fire) {
				this._resizerStart(touchinfo.canvasX, touchinfo.canvasY, cellobj, "down", from_refer_comp);

				this._common_fire_user_lbuttondown(cellobj, false, false, touchinfo.canvasX, touchinfo.canvasY, from_comp, from_refer_comp);
			}
			else {
				if (this._selectscrollmode == "select") {
					if (cellobj._band && cellobj._band.id == "body") {
						if (this._isAreaSelect()) {
							this._common_fire_sys_lbuttondown(cellobj, false, false, touchinfo.canvasX, touchinfo.canvasY, from_comp, from_refer_comp);
						}

						if (this.selectchangetype == "down") {
							this._mouseSelection(cellobj, false, false, touchinfo.canvasX, touchinfo.canvasY, from_comp, from_refer_comp);
						}
					}
				}
			}
		}
		return retn;
	};

	_pGrid.on_lbuttondown_basic_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		if (nexacro.isTouchInteraction) {
			this._down_scroll_top = this._last_scroll_top;
		}

		return nexacro.Component.prototype.on_lbuttondown_basic_action.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope);
	};

	_pGrid.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, need_recalcXY) {
		return this.on_fire_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, true, need_recalcXY);
	};

	_pGrid.on_fire_sys_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, need_recalcXY) {
		return this.on_fire_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, false, need_recalcXY);
	};

	_pGrid.on_fire_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, user_fire, need_recalcXY) {
		var cellobj = from_refer_comp;

		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj && cellobj._type_name == "GridCell") {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, need_recalcXY);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var retn = false;
		if (this.onlbuttondown && this.onlbuttondown._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);

			var obj = this._getRootComponent(from_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.GridMouseEventInfo(obj, "onlbuttondown", cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);

			if (user_fire) {
				retn = this.onlbuttondown._fireUserEvent(this, evt);
			}
			else {
				retn = this.onlbuttondown._fireSysEvent(this, evt);
			}
		}

		if (nexacro.isTouchInteraction) {
			if (user_fire) {
				this._resizerStart(canvasX, canvasY, cellobj, "down", from_refer_comp);
				this._common_fire_user_lbuttondown(cellobj, ctrl_key, shift_key, canvasX, canvasY, from_comp, from_refer_comp);
			}
			else {
				if (this._selectscrollmode == "select") {
					if (cellobj._band && cellobj._band.id == "body") {
						if (this._isAreaSelect()) {
							this._common_fire_user_lbuttondown(cellobj, ctrl_key, shift_key, canvasX, canvasY, from_comp, from_refer_comp);
						}
					}
				}
			}
		}
		else {
			if (user_fire) {
				this._common_fire_user_lbuttondown(cellobj, ctrl_key, shift_key, canvasX, canvasY, from_comp, from_refer_comp);
			}
			else {
				this._common_fire_sys_lbuttondown(cellobj, ctrl_key, shift_key, canvasX, canvasY, from_comp, from_refer_comp);
			}
		}
		return retn;
	};

	_pGrid.on_fire_user_onrbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		var cellobj = from_refer_comp;

		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj && cellobj._type_name == "GridCell") {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		if (this.onrbuttondown && this.onrbuttondown._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);

			var obj = this._getRootComponent(from_refer_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.GridMouseEventInfo(obj, "onrbuttondown", cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
			return this.onrbuttondown._fireUserEvent(this, evt);
		}
		return false;
	};

	_pGrid.on_fire_user_onmousedown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return this.on_fire_onmousedown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, true);
	};

	_pGrid.on_fire_sys_onmousedown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return this.on_fire_onmousedown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, false);
	};

	_pGrid.on_fire_onmousedown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, user_fire) {
		var cellobj = from_refer_comp;

		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj && cellobj._type_name == "GridCell") {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var retn = false;
		if (this.onmousedown && this.onmousedown._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);

			var obj = this._getRootComponent(from_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.GridMouseEventInfo(obj, "onmousedown", cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);

			if (user_fire) {
				retn = this.onmousedown._fireUserEvent(this, evt);
			}
			else {
				retn = this.onmousedown._fireSysEvent(this, evt);
			}
		}

		return retn;
	};

	_pGrid._clearDestroyEditor = function (remain) {
		var destroyeditors = this._destroyeditors;
		if (destroyeditors.length) {
			for (var i = 0; i < destroyeditors.length; i++) {
				if (remain && destroyeditors.length <= 5) {
					break;
				}

				if (destroyeditors[i]._is_alive) {
					destroyeditors[i].destroy();
				}

				destroyeditors[i] = null;
				destroyeditors.splice(i, 1);
				i--;
			}
		}
	};

	_pGrid._resetFixSize = function () {
		var rowsizes = this._rowSizeList;
		var fixrow_height = 0, fix_height = 0;
		var srow = this._fixed_startrow;
		var erow = this._fixed_endrow;

		if (srow < 0) {
			return;
		}

		for (var i = 0; i < rowsizes.length; i++) {
			fixrow_height += rowsizes[i];

			if (srow > i) {
				continue;
			}

			fix_height += rowsizes[i];

			if (erow == i) {
				break;
			}
		}

		this._fixed_height = fix_height;
		this._fixedrow_height = fixrow_height;
	};

	_pGrid.setFixedRow = function (row) {
		this._setFixedRow(row, undefined);
	};

	_pGrid._setFixedRow = function (fixrow, no_redraw) {
		if (this._hasTree) {
			return;
		}

		var bfix = (fixrow < 0) ? false : true;
		var srow, erow = this._endrowpos;

		srow = this._fixed_startrow;

		if (srow < 0) {
			srow = this._toprowpos[0];
		}

		if (fixrow >= 0 && (fixrow < srow || fixrow > erow)) {
			return;
		}

		if (bfix) {
			if (this._fixed_height) {
				this._setFixedRow(-1);
			}
		}

		var band = this._bodyBand;

		if (bfix) {
			var rowcnt = this._getGridRowCount();
			var toppos = this._toprowpos[0];
			var fixedheight = 0, fixedrow_height = 0;
			var bset = false;
			var rowheight = 0;

			for (var i = 0; i < rowcnt; i++) {
				this._fixed_rowcnt++;
				rowheight = this._getRowSize(i);
				fixedrow_height += rowheight;

				if (i >= toppos) {
					if (this._fixed_startrow < 0) {
						this._fixed_startrow = i;
					}

					fixedheight += rowheight;
					bset = true;
				}

				if (i >= fixrow) {
					break;
				}
			}

			if (bset) {
				this._fixedrow_height = fixedrow_height;
				this._fixed_endrow = fixrow;
				this._fixed_height = fixedheight;

				if (!no_redraw) {
					this._recreate_contents_all(false, false, true, true);
				}
			}
			else {
				this._fixed_startrow = -9;
				this._fixed_endrow = -9;
				this._fixed_height = 0;
				this._fixedrow_height = 0;
				this._fixed_rowcnt = 0;
			}
		}
		else {
			var srow = this._fixed_startrow;

			this._fixed_endrow = -9;
			this._fixed_height = 0;
			this._fixedrow_height = 0;
			this._fixed_rowcnt = 0;
			this._fixed_startrow = -9;

			if (!no_redraw) {
				this._recreate_contents_all(false, false, false, true);

				if (this.vscrollbar && srow >= 0) {
					this.vscrollbar._set_rowpos(srow);
				}
			}
		}
	};

	_pGrid._getFixRowCnt = function () {
		return (this._bodyBand) ? this._fixed_rowcnt : 0;
	};

	_pGrid._checkInclude = function (fake, subrowcnt, col, row, subrow) {
		if (fake.start_column <= col && fake.end_column >= col) {
			if (fake.start_row <= row && fake.end_row >= row) {
				if (subrow == undefined || fake.start_subrow == undefined) {
					return true;
				}
				else {
					if (fake.start_row < row && fake.end_row > row) {
						return true;
					}

					if (fake.start_row == fake.end_row) {
						if (fake.start_subrow <= subrow && fake.end_subrow >= subrow) {
							return true;
						}
					}
					else {
						if (fake.start_row == row) {
							if (fake.start_subrow <= subrow && subrowcnt > subrow) {
								return true;
							}
						}

						if (fake.end_row == row) {
							if (0 <= subrow && fake.end_subrow >= subrow) {
								return true;
							}
						}
					}
				}
			}
		}
		return false;
	};

	_pGrid._getFakeMergeCellInfos = function (cellinfos, scol, ecol, srow, erow, ssubrow, esubrow, subrowcnt) {
		var target_cellinfos = [];
		var cellsrow, cheksrow, cellerow, chekerow;

		for (var i = 0; i < cellinfos.length; i++) {
			col1 = cellinfos[i]._col;
			colspan = cellinfos[i]._colspan;
			col2 = col1 + colspan - 1;
			row1 = cellinfos[i]._row;
			rowspan = cellinfos[i]._rowspan;
			row2 = row1 + rowspan - 1;

			if ((scol <= col1 && ecol >= col1) || (scol <= col2 && ecol >= col2) || (col1 <= scol && col2 >= scol) || (col1 <= ecol && col2 >= ecol)) {
				if (srow >= 0) {
					cellsrow = srow * subrowcnt + row1;
					cheksrow = srow * subrowcnt + ssubrow;
					cellerow = erow * subrowcnt + row2;
					chekerow = erow * subrowcnt + esubrow;
				}
				else {
					cellsrow = row1;
					cheksrow = ssubrow;
					cellerow = row2;
					chekerow = esubrow;
				}

				if ((cheksrow <= cellsrow && chekerow >= cellsrow) || (cheksrow <= cellerow && chekerow >= cellerow) || (cellsrow <= cheksrow && cellerow >= cheksrow) || (cellsrow <= chekerow && cellerow >= chekerow)) {
					target_cellinfos.push(cellinfos[i]);
				}
			}
		}
		return target_cellinfos;
	};

	_pGrid.setFakeMerge = function (scol, ecol, srow, erow, ssubrow, esubrow) {
		this._setFakeMerge(scol, srow, ssubrow, ecol, erow, esubrow, false);
	};

	_pGrid._getFakeMergeCellObjs = function (fake_mergecell) {
		var band;
		var cellobjs = [];
		var format = this._curFormat;
		var subrowcnt;

		if (fake_mergecell.start_row == -1) {
			band = this._headBand;
			subrowcnt = format._headrows.length;
		}
		else if (fake_mergecell.start_row == -2) {
			band = this._summBand;
			subrowcnt = format._summrows.length;
		}
		else if (fake_mergecell.start_row >= 0) {
			band = this._bodyBand;
			subrowcnt = format._bodyrows.length;
		}

		if (!band) {
			return cellobjs;
		}

		var rows = band._get_rows();
		var cells;
		var scol = fake_mergecell.start_column;
		var ecol = fake_mergecell.end_column;
		var srow = fake_mergecell.start_row;
		var erow = fake_mergecell.end_row;
		var ssubrow = fake_mergecell.start_subrow;
		var esubrow = fake_mergecell.end_subrow;
		var datarow;
		var cellsrow, cheksrow, cellerow, chekerow;
		var cellinfo;

		for (var i = 0; i < rows.length; i++) {
			datarow = this._getDataRow(rows[i]._rowidx);

			if (datarow >= srow && datarow <= erow) {
				cells = rows[i]._cells;

				for (var j = 0; j < cells.length; j++) {
					cellinfo = cells[j]._refobj;

					if (cellinfo._col >= scol && cellinfo._col <= ecol) {
						if (ssubrow == undefined) {
							cellobjs.push(cells[j]);
						}
						else {
							if (srow >= 0) {
								cellsrow = datarow * subrowcnt + cellinfo._row;
								cheksrow = srow * subrowcnt + ssubrow;
								cellerow = datarow * subrowcnt + cellinfo._row + cellinfo._rowspan - 1;
								chekerow = erow * subrowcnt + esubrow;
							}
							else {
								cellsrow = cellinfo._row;
								cheksrow = ssubrow;
								cellerow = cellinfo._row + cellinfo._rowspan - 1;
								chekerow = esubrow;
							}

							if ((cheksrow <= cellsrow && chekerow >= cellsrow) || (cheksrow <= cellerow && chekerow >= cellerow) || (cellsrow <= cheksrow && cellerow >= cheksrow) || (cellsrow <= chekerow && cellerow >= chekerow)) {
								cellobjs.push(cells[j]);
							}
						}
					}
				}
			}
		}
		return cellobjs;
	};

	_pGrid._is_use_fakemerge = false;
	_pGrid._setFakeMerge = function (scol, srow, ssubrow, ecol, erow, esubrow, norelease) {
		var format = this._curFormat;
		var cellinfos;
		var subrowcnt;
		var band;

		if (scol > ecol || scol < 0 || ecol < 0) {
			return false;
		}

		if (srow == -1 || erow == -1) {
			if (srow != erow) {
				return false;
			}

			if (!format._headrows) {
				return false;
			}

			cellinfos = format._headcells;
			subrowcnt = format._headrows.length;
			band = "head";

			if (esubrow < ssubrow) {
				return false;
			}
		}
		else if (srow == -2 || erow == -2) {
			if (srow != erow) {
				return false;
			}

			if (!format._summrows) {
				return false;
			}

			cellinfos = format._summcells;
			subrowcnt = format._summrows.length;
			band = "summ";

			if (esubrow < ssubrow) {
				return false;
			}
		}
		else {
			if (srow < 0 || erow < 0) {
				return false;
			}

			if (srow > erow) {
				return false;
			}

			if (!format._bodyrows) {
				return false;
			}

			cellinfos = format._bodycells;
			subrowcnt = format._bodyrows.length;
			band = "body";
		}

		if (ssubrow == undefined) {
			ssubrow = 0;
		}
		if (esubrow == undefined) {
			esubrow = subrowcnt - 1;
		}

		if (subrowcnt <= ssubrow || subrowcnt <= esubrow) {
			return false;
		}

		var col1, colspan, col2, fail = false;
		var row1, rowspan, row2;
		var target_cellinfos = [];
		var cell = null;
		var cellsrow, cheksrow, cellerow, chekerow;

		for (var i = 0; i < cellinfos.length; i++) {
			cell = cellinfos[i];
			col1 = cell._col;
			colspan = cell._colspan;
			col2 = col1 + colspan - 1;
			row1 = cell._row;
			rowspan = cell._rowspan;
			row2 = row1 + rowspan - 1;

			if ((scol <= col1 && ecol >= col1) || (scol <= col2 && ecol >= col2) || (col1 <= scol && col2 >= scol) || (col1 <= ecol && col2 >= ecol)) {
				if (srow >= 0) {
					cellsrow = srow * subrowcnt + row1;
					cheksrow = srow * subrowcnt + ssubrow;
					cellerow = erow * subrowcnt + row2;
					chekerow = erow * subrowcnt + esubrow;
				}
				else {
					cellsrow = row1;
					cheksrow = ssubrow;
					cellerow = row2;
					chekerow = esubrow;
				}

				if ((cheksrow <= cellsrow && chekerow >= cellsrow) || (cheksrow <= cellerow && chekerow >= cellerow) || (cellsrow <= cheksrow && cellerow >= cheksrow) || (cellsrow <= chekerow && cellerow >= chekerow)) {
					if (cell.suppress != 0) {
						return false;
					}

					var change = false;

					if (cell._colspan > 1) {
						var cellecol = cell._col + cell._colspan - 1;
						if (cell._col < scol) {
							change = true;
							scol = cell._col;
						}
						if (cellecol > ecol) {
							change = true;
							ecol = cellecol;
						}
					}

					if (cell._rowspan > 1) {
						if (cellsrow < cheksrow) {
							change = true;
							ssubrow = cell._row;
						}
						if (cellerow > chekerow) {
							change = true;
							esubrow = cell._row + cell._rowspan - 1;
						}
					}

					if (change == true) {
						target_cellinfos = [];
						i = 0;
					}

					target_cellinfos.push(cell);
				}
			}
		}

		var fake_mergecell = {
			start_column : scol, 
			start_row : srow, 
			start_subrow : ssubrow, 
			end_column : ecol, 
			end_row : erow, 
			end_subrow : esubrow, 
			cellinfos : target_cellinfos
		};
		var fake_arr = this._fake_mergecell_arr;
		var fake_arr_len = fake_arr.length;
		var fake_merge;
		var i = 0;


		var fail_idxs = [];
		for (; i < fake_arr_len; i++) {
			if (this._checkInclude(fake_arr[i], subrowcnt, scol, srow, ssubrow)) {
				fail_idxs.push(i);
			}
			else if (this._checkInclude(fake_arr[i], subrowcnt, scol, erow, esubrow)) {
				fail_idxs.push(i);
			}
			else if (this._checkInclude(fake_arr[i], subrowcnt, ecol, srow, ssubrow)) {
				fail_idxs.push(i);
			}
			else if (this._checkInclude(fake_arr[i], subrowcnt, ecol, erow, esubrow)) {
				fail_idxs.push(i);
			}

			else if (this._checkInclude(fake_mergecell, subrowcnt, fake_arr[i].start_column, fake_arr[i].start_row, fake_arr[i].start_subrow)) {
				fail_idxs.push(i);
			}
			else if (this._checkInclude(fake_mergecell, subrowcnt, fake_arr[i].start_column, fake_arr[i].end_row, fake_arr[i].end_subrow)) {
				fail_idxs.push(i);
			}
			else if (this._checkInclude(fake_mergecell, subrowcnt, fake_arr[i].end_column, fake_arr[i].start_row, fake_arr[i].start_subrow)) {
				fail_idxs.push(i);
			}
			else if (this._checkInclude(fake_mergecell, subrowcnt, fake_arr[i].end_column, fake_arr[i].end_row, fake_arr[i].end_subrow)) {
				fail_idxs.push(i);
			}
		}

		if (fail_idxs.length == 0) {
			for (var i = 0; i < target_cellinfos.length; i++) {
				if (target_cellinfos[i]._fakemerge_infos == null) {
					target_cellinfos[i]._fakemerge_infos = [];
				}
			}

			fake_arr.push(fake_mergecell);
			this._is_use_fakemerge = true;

			for (var i = 0; i < target_cellinfos.length; i++) {
				format._clearCellStyleCache(band, target_cellinfos[i]._cellidx);
				this._refreshCell(band, target_cellinfos[i]._cellidx, -1, true);
			}
		}
		else {
			if (norelease) {
				return false;
			}

			for (var i = 0; i < fail_idxs.length; i++) {
				var idx = fail_idxs[i];
				var release_fake = fake_arr.splice(idx - i, 1)[0];
				var release_cellinfos = this._getFakeMergeCellInfos(cellinfos, release_fake.start_column, release_fake.end_column, release_fake.start_row, release_fake.end_row, release_fake.start_subrow, release_fake.end_subrow, subrowcnt);

				for (var j = 0; j < release_cellinfos.length; j++) {
					for (var k = release_fake.start_row; k <= release_fake.end_row; k++) {
						release_cellinfos[j]._fakemerge_infos[k + 2] = undefined;
					}

					format._clearCellStyleCache(band, release_cellinfos[j]._cellidx);
					this._refreshCell(band, release_cellinfos[j]._cellidx, -1, true);
				}

				for (var j = 0; j < target_cellinfos.length; j++) {
					for (var k = srow; k <= erow; k++) {
						target_cellinfos[j]._fakemerge_infos[k + 2] = undefined;
					}

					format._clearCellStyleCache(band, target_cellinfos[j]._cellidx);
					this._refreshCell(band, target_cellinfos[j]._cellidx, -1, true);
				}
			}

			if (fake_arr.length == 0) {
				this._is_use_fakemerge = false;
			}
		}
		this._adjustOverlayElements(false, this._is_use_fakemerge);
		return true;
	};

	_pGrid._checkFakeMerge = function (cellinfo, row) {
		if (!cellinfo._fakemerge_infos) {
			return "";
		}

		if (cellinfo._fakemerge_infos[row + 2]) {
			return cellinfo._fakemerge_infos[row + 2];
		}

		var fake_arr = this._fake_mergecell_arr;
		var fake_arr_len = fake_arr.length;
		var subrowcnt;
		var format = this._curFormat;
		var band;

		if (row == -1) {
			subrowcnt = (format._headrows) ? format._headrows.length : 0;
			band = "head";
		}
		else if (row == -2) {
			subrowcnt = (format._summrows) ? format._summrows.length : 0;
			band = "summ";
		}
		else if (row >= 0) {
			subrowcnt = (format._bodyrows) ? format._bodyrows.length : 0;
			band = "body";
		}

		if (!subrowcnt) {
			return "";
		}

		if (fake_arr_len == 0) {
			return "";
		}

		var scol = cellinfo._col, ecol = cellinfo._col + cellinfo._colspan - 1, ssubrow = cellinfo._row, esubrow = cellinfo._row + cellinfo._rowspan - 1, area = cellinfo._area;

		for (var i = 0; i < fake_arr_len; i++) {
			if (this._checkInclude(fake_arr[i], subrowcnt, scol, row, ssubrow)) {
				if (this._checkInclude(fake_arr[i], subrowcnt, ecol, row, ssubrow)) {
					if (this._checkInclude(fake_arr[i], subrowcnt, scol, row, esubrow)) {
						if (this._checkInclude(fake_arr[i], subrowcnt, ecol, row, esubrow)) {
							var retn = "";

							if (area != "right") {
								if (ecol < fake_arr[i].end_column) {
									retn += "right";
								}
							}
							else {
								if (scol > fake_arr[i].start_column) {
									retn += "left";
								}
							}

							if (band != "summ") {
								if (row < fake_arr[i].end_row) {
									retn += "bottom";
								}
								else if (row == fake_arr[i].end_row) {
									if (fake_arr[i].end_subrow == undefined && esubrow < subrowcnt - 1) {
										retn += "bottom";
									}
									else if (esubrow < fake_arr[i].end_subrow) {
										retn += "bottom";
									}
								}
							}
							else {
								if (row > fake_arr[i].start_row) {
									retn += "top";
								}
								else if (row == fake_arr[i].start_row) {
									if (fake_arr[i].start_subrow == undefined && ssubrow > 0) {
										retn += "top";
									}
									else if (ssubrow > fake_arr[i].start_subrow) {
										retn += "top";
									}
								}
							}

							retn += "fake";
							cellinfo._fakemerge_infos[row + 2] = retn;
							return retn;
						}
					}
				}
			}
		}
		return "";
	};

	_pGrid._on_last_lbuttonup = function (down_act) {
		if (this._movingcell) {
			this._setGlobalCursor(null, this);
			this._movingcell = null;
		}

		this._is_down_act = false;
		this._clearDestroyEditor(true);

		var args = this._after_recreate_contents_all;
		if (args != null) {
			this._is_after_recreate = true;
			this._recreate_contents_all(args[0], args[1], args[2], args[3], args[4]);
			this._after_recreate_contents_all = null;
			this._is_after_recreate = false;
		}

		if (this._after_recreate) {
			this._is_after_recreate = true;
			this._recreate();
			this._after_recreate = false;
			this._is_after_recreate = false;
		}
	};

	_pGrid._on_last_keyup = function (down_act) {
		this._is_down_act = false;
		this._clearDestroyEditor(true);

		var args = this._after_recreate_contents_all;
		if (args != null) {
			this._is_after_recreate = true;
			this._recreate_contents_all(args[0], args[1], args[2], args[3], args[4]);
			this._after_recreate_contents_all = null;
			this._is_after_recreate = false;
		}

		if (this._after_recreate) {
			this._is_after_recreate = true;
			this._recreate();
			this._after_recreate = false;
			this._is_after_recreate = false;
		}
	};

	_pGrid._common_fire_sys_lbuttonup = function (cellobj, altKey, ctrlKey, shiftKey) {
		if (!this._is_alive) {
			return;
		}
		if (!this.enable) {
			return true;
		}

		if (cellobj && cellobj._type_name == "GridCell") {
			var newPos = this._getDataRow(cellobj._rowidx);

			if (this._isFakeCell(newPos)) {
				this._is_drag_selectstart = false;
				this._is_drag_selecting = false;
				this._is_drag_sameselect = false;
				return true;
			}
			if (ctrlKey == false && shiftKey == false && this._is_drag_selecting == false && newPos >= 0) {
				if (this._isMultiSelected()) {
					if (this._isIncludeSelectpos(cellobj._cellidx, newPos)) {
						this._clrMultiSelect();
						this._refreshAll(true);
						this._ChangeSelect(this._selectinfo.curcell, this._selectinfo.curcol, this._selectinfo.curdsrow, this._selectinfo.cursubrow, this._selectinfo.curpvt, false, this._selectinfo.curcell, this._selectinfo.curcol, this._selectinfo.curdsrow, this._selectinfo.cursubrow, this._selectinfo.curpvt, "body", "lbuttonup");
					}
				}
			}
		}

		this._is_drag_selectstart = false;
		this._is_drag_selecting = false;
		this._is_drag_sameselect = false;
		this._execRefreshContents("colsizing", false, true);
		this._execRefreshContents("rowsizing", false, false);
		this._execRefreshContents("cellmoving", true);
		this._exeFuncQueue("colsizing");
		this._exeFuncQueue("rowsizing");
	};

	_pGrid._is_down_act = false;
	_pGrid._cancelEvent = function (target_comp) {
		this._endExtraTrack();
		this._is_drag_selectstart = false;
		this._is_drag_selecting = false;
		this._is_down_act = this._isDownActionKeyMouse();
	};

	_pGrid.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp, need_recalcXY) {
		return this.on_fire_ontouchend(touchinfos, changedtouchinfos, from_comp, from_refer_comp, true, need_recalcXY);
	};

	_pGrid.on_fire_sys_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp, need_recalcXY) {
		return this.on_fire_ontouchend(touchinfos, changedtouchinfos, from_comp, from_refer_comp, false, need_recalcXY);
	};

	_pGrid.on_fire_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp, user_fire, need_recalcXY) {
		var cellobj = from_refer_comp;

		cellobj = this._findCellObj(cellobj);

		this._recalcTouchInfosXY(cellobj, changedtouchinfos, need_recalcXY);

		var subcellobj;
		if (cellobj && cellobj._type_name == "GridCell") {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var retn = false;
		if (this.ontouchend && this.ontouchend._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);

			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.TouchEventInfo(this, "ontouchend", touchinfos, changedtouchinfos, from_comp, from_refer_comp);

			if (user_fire) {
				retn = this.ontouchend._fireUserEvent(this, evt);
			}
			else {
				retn = this.ontouchend._fireSysEvent(this, evt);
			}
		}

		if (!user_fire) {
			this._common_fire_sys_lbuttonup(cellobj, false, false, false);
		}

		return retn;
	};

	_pGrid._isCheckAlive = function (comp) {
		var parent = comp;
		while (parent != this) {
			if (!parent || parent._is_alive == false) {
				return false;
			}
			parent = parent.parent;
		}
		return true;
	};

	_pGrid._on_afterHideWaitComp = function (pseudo) {
		if (this._currentCellEditor) {
			this._currentCellEditor._setFocus(false);
		}
	};
	_pGrid.on_fire_user_onlbuttonup = function (button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, need_recalcXY) {
		return this.on_fire_onlbuttonup(button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, true, need_recalcXY);
	};

	_pGrid.on_fire_sys_onlbuttonup = function (button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, need_recalcXY) {
		return this.on_fire_onlbuttonup(button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, false, need_recalcXY);
	};

	_pGrid.on_fire_onlbuttonup = function (button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, user_fire, need_recalcXY) {
		if (this._focus_proc) {
			if (!this._showEditing) {
				if (this._isCheckAlive(this._focus_proc.parent)) {
					var is_vscroll = false;
					if (this._scrollpixel == "all") {
						is_vscroll = true;
					}
					this._focus_proc.parent._showfull(is_vscroll);
					this._focus_proc.parent._setFocus(false);
				}
			}
			else if (this._currentCellEditor.setCaretPos) {
				if (this._currentCellEditor.autoselect) {
					this._currentCellEditor.setSelect(0, -1);
				}
				else {
					this._currentCellEditor.setCaretPos(0);
				}
			}
			this._focus_proc = null;
		}

		var cellobj = from_refer_comp;

		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj && cellobj._type_name == "GridCell") {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, need_recalcXY);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var retn = false;
		if (this.onlbuttonup && this.onlbuttonup._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);

			var obj = this._getRootComponent(from_refer_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.GridMouseEventInfo(obj, "onlbuttonup", cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY);
			if (user_fire) {
				retn = this.onlbuttonup._fireUserEvent(this, evt);
			}
			else {
				retn = this.onlbuttonup._fireSysEvent(this, evt);
			}
		}

		if (!user_fire) {
			if (cellobj && cellobj._type_name == "GridCell" && cellobj._band.id == "body") {
				if (this.selectchangetype == "up") {
					if (this.selecttype != "area" && this.selecttype != "multiarea") {
						if (!this._is_drag_selecting) {
							this._mouseSelection(cellobj, ctrlKey, shiftKey, canvasX, canvasY, from_comp, from_refer_comp);
							this._endExtraTrack();
						}
					}
				}
			}

			this._common_fire_sys_lbuttonup(cellobj, altKey, ctrlKey, shiftKey);
			this._resizerStart(canvasX, canvasY, cellobj, "up", from_refer_comp);
		}
		return retn;
	};

	_pGrid.on_fire_user_onrbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		var cellobj = from_refer_comp;

		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj && cellobj._type_name == "GridCell") {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		if (this.onrbuttonup && this.onrbuttonup._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);

			var obj = this._getRootComponent(from_refer_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.GridMouseEventInfo(obj, "onrbuttonup", cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
			return this.onrbuttonup._fireUserEvent(this, evt);
		}
		return false;
	};

	_pGrid.on_fire_user_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return this.on_fire_onmouseup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, true);
	};

	_pGrid.on_fire_sys_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return this.on_fire_onmouseup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, false);
	};

	_pGrid.on_fire_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, user_fire) {
		var cellobj = from_refer_comp;

		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj && cellobj._type_name == "GridCell") {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var retn = false;
		if (this.onmouseup && this.onmouseup._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);

			var obj = this._getRootComponent(from_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.GridMouseEventInfo(obj, "onmouseup", cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
			if (user_fire) {
				retn = this.onmouseup._fireUserEvent(this, evt);
			}
			else {
				retn = this.onmouseup._fireSysEvent(this, evt);
			}
		}

		return retn;
	};

	_pGrid._resizerStart = function (canvasX, canvasY, cellobj, kind, from_refer_comp) {
		if (this._movingcell) {
			return;
		}

		var resizer_colctrl = this._resizer_colctrl;
		var resizer_rowctrl = this._resizer_rowctrl;

		if ((resizer_colctrl && resizer_colctrl._is_tracking) || (resizer_rowctrl && resizer_rowctrl._is_tracking)) {
			return;
		}

		var r_canvasX = canvasX;
		var r_canvasY = canvasY;
		var rowidx = cellobj._rowidx;
		var cellidx = cellobj._cellidx;

		if (cellobj._is_alive == false) {
			if (rowidx == -1) {
				cellobj = this._getCurrentHeadCell(cellidx, true);
			}
			else {
				cellobj = this._getCurrentBodyCell(rowidx, cellidx);
			}
		}

		if (!cellobj) {
			return;
		}

		var area = (cellobj._refobj) ? cellobj._refobj._area : "";
		var band = (cellobj._band) ? cellobj._band.id : "";

		if (area == "body") {
			r_canvasX += this._getScrollLeft();
		}
		if (band == "body") {
			if (!cellobj.parent._fixed) {
				r_canvasY += this._getScrollTop();
			}
		}

		var action = false;

		if (resizer_colctrl && !resizer_colctrl._is_tracking) {
			var resize_cursor = nexacro._getCachedValueObj("col-resize");
			var resizer_range = this._resizerColRange;
			var resizer_arr_length = resizer_range.length;

			if (resizer_arr_length > 0) {
				resizer_colctrl._is_range = false;

				for (var i = 0; i < resizer_arr_length; i++) {
					var range = resizer_range[i];
					if (r_canvasX >= range.left && r_canvasX <= range.right) {
						if (area != range.area) {
							continue;
						}

						if (r_canvasY >= range.top && r_canvasY <= range.bottom) {
							this.a = r_canvasX;
							resizer_colctrl._is_range = true;
							resizer_colctrl._setIndex(range.index);
							this._setGlobalCursor(resize_cursor, cellobj);
							action = true;
							break;
						}
					}
				}
			}
			if (!resizer_colctrl._is_range && !resizer_colctrl._is_tracking && (!resizer_rowctrl || !resizer_rowctrl._is_tracking)) {
				if (cellobj._type_name != "GridCell") {
					this._setGlobalCursor(null, from_refer_comp);
				}
				else {
					this._setGlobalCursor(null, cellobj);
				}
				action = false;
			}
			else if (resizer_colctrl._is_tracking) {
				this._setGlobalCursor(resize_cursor, cellobj);
				action = true;
			}
		}

		if (action) {
			return;
		}

		if (resizer_rowctrl && !resizer_rowctrl._is_tracking) {
			var resize_cursor = nexacro._getCachedValueObj("row-resize");
			var resizer_range = this._resizerRowRange;
			var resizer_arr_length = resizer_range.length;

			if (resizer_arr_length > 0) {
				resizer_rowctrl._is_range = false;

				for (var i = 0; i < resizer_arr_length; i++) {
					var range = resizer_range[i];
					if (r_canvasY >= range.top && r_canvasY <= range.bottom) {
						if (band != range.area) {
							continue;
						}

						if (r_canvasX >= range.left && r_canvasX <= range.right) {
							resizer_rowctrl._is_range = true;
							resizer_rowctrl._setIndex(range.index);
							this._setGlobalCursor(resize_cursor, cellobj);
							break;
						}
					}
				}
			}
			if (!resizer_rowctrl._is_range && !resizer_rowctrl._is_tracking && (!resizer_colctrl || !resizer_colctrl._is_tracking)) {
				if (cellobj._type_name != "GridCell") {
					this._setGlobalCursor(null, from_refer_comp);
				}
				else {
					this._setGlobalCursor(null, cellobj);
				}
			}
			else if (resizer_rowctrl._is_tracking) {
				this._setGlobalCursor(resize_cursor, cellobj);
			}
		}
	};

	_pGrid.on_fire_user_ontouchmove = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		var cellobj = from_refer_comp;

		cellobj = this._findCellObj(cellobj);

		this._recalcTouchInfosXY(cellobj, changedtouchinfos, false);

		var subcellobj;
		if (cellobj && cellobj._type_name == "GridCell") {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var retn = false;
		if (this.ontouchmove && this.ontouchmove._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);

			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.TouchEventInfo(this, "ontouchmove", touchinfos, changedtouchinfos, from_comp, from_refer_comp);
			retn = this.ontouchmove._fireUserEvent(this, evt);
		}

		return retn;
	};

	_pGrid.on_fire_user_onmousemove = function (button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		var cellobj = from_refer_comp;

		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj && cellobj._type_name == "GridCell") {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var retn = false;
		if (this.onmousemove && this.onmousemove._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);

			var obj = this._getRootComponent(from_refer_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.GridMouseEventInfo(obj, "onmousemove", cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY);
			retn = this.onmousemove._fireUserEvent(this, evt);
		}

		if (!nexacro.isTouchInteraction) {
			this._resizerStart(canvasX, canvasY, cellobj, "move", from_refer_comp);
		}

		return retn;
	};

	_pGrid._prevAreaCellObj = null;

	_pGrid._areaselectMove = function (from_refer_comp, canvasX, canvasY) {
		if (this._is_drag_selectstart && !this._showEditing) {
			var cellobj = from_refer_comp;

			cellobj = this._findCellObj(cellobj);

			var subcellobj, area;
			if (cellobj && cellobj._type_name == "GridCell") {
				if (cellobj.parentcell) {
					subcellobj = cellobj;
					cellobj = cellobj.parentcell;
				}

				var posobj = this._recalcXY(cellobj, canvasX, canvasY, false);
				canvasX = posobj.canvasX;
				canvasY = posobj.canvasY;
				clientX = posobj.clientX;
				clientY = posobj.clientY;

				if ((this._prevAreaCellObj == cellobj) && !this._fixed_row_scrolling) {
					return;
				}

				area = cellobj._refobj._area;

				var newPos = this._getDataRow(cellobj._rowidx);
				if (newPos == undefined) {
					newPos = 0;
				}

				if (this._isFakeCell(newPos) || newPos < 0) {
					return true;
				}

				var beforeCell = this._beforebodycellpos = this._selectinfo.curcell;
				var beforeCol = this._beforebodycolpos = this._selectinfo.curcol;
				var beforeRow = this._beforebodyrowpos = this._selectinfo.curdsrow;
				var beforeSubrow = this._beforebodysubrowpos = this._selectinfo.cursubrow;
				var beforePvt = this._beforepvt = this._selectinfo.curpvt;

				var afterCell = cellobj._cellidx;
				var afterCol = cellobj._refobj._col;
				var afterRow = newPos;
				var afterSubrow = cellobj._refobj._row;
				var afterPvt = -9;

				if (subcellobj) {
					afterCol += subcellobj._refobj._col;
				}

				if (this._fixed_rowcnt > 0) {
					var fixed_startrow = this._fixed_startrow;
					var fixed_endrow = this._fixed_endrow;

					var selectinfo = this._selectinfo;
					if (selectinfo.area.length > 0) {
						var cur_selected_area = selectinfo.area[selectinfo.area.length - 1];
						var cur_srow = cur_selected_area.begrow;
						var cur_erow = cur_selected_area.endrow;
						var cur_vscrollpos = this.vscrollbar.pos;
						var scrollTop = this._getScrollTop();

						var mode = "";
						if (afterRow < beforeRow) {
							mode = "up";
						}
						else if (afterRow > beforeRow) {
							mode = "down";
						}
						else {
							mode = "keep";
						}

						if (mode == "up") {
							this._fixed_row_scrolling = true;
							if (cur_erow > afterRow && afterRow <= fixed_endrow && cur_erow > fixed_endrow) {
								this.vscrollbar.set_pos(cur_vscrollpos - 1);
							}
							else {
								this._fixed_row_scrolling = false;
							}
						}
						else if (mode == "down") {
							if (cur_srow <= this._fixed_endrow && cur_erow <= this._fixed_endrow) {
								this._fixed_row_scroll_zeroset = true;
							}
							else {
								this._fixed_row_scroll_zeroset = false;
							}

							if (this._fixed_row_scroll_zeroset && afterRow && (afterRow <= 0 || (afterRow <= this._fixed_endrow && cur_erow > this._fixed_endrow) || (afterRow > this._fixed_endrow && cur_srow <= this._fixed_endrow))) {
								if (cur_vscrollpos > 0) {
									this.vscrollbar.set_pos(0);
									this._fixed_row_scroll_zeroset = false;
									return;
								}
							}
						}
						else {
							if (cur_vscrollpos == 0) {
								this._fixed_row_scrolling = false;
							}
							else if (this._fixed_row_scrolling) {
								this.vscrollbar.set_pos(cur_vscrollpos - 1);
							}
						}
					}
				}

				if (this._fixed_rowcnt > 0) {
					var fixed_startrow = this._fixed_startrow;
					var fixed_endrow = this._fixed_endrow;

					var selectinfo = this._selectinfo;
					if (selectinfo.area.length > 0) {
						var cur_selected_area = selectinfo.area[selectinfo.area.length - 1];
						var cur_srow = cur_selected_area.begrow;
						var cur_erow = cur_selected_area.endrow;
						var cur_vscrollpos = this.vscrollbar.pos;
						var scrollTop = this._getScrollTop();

						var mode = "";
						if (afterRow < beforeRow) {
							mode = "up";
						}
						else if (afterRow > beforeRow) {
							mode = "down";
						}
						else {
							mode = "keep";
						}

						if (mode == "up") {
							this._fixed_row_scrolling = true;
							if (cur_erow > afterRow && afterRow <= fixed_endrow && cur_erow > fixed_endrow) {
								this.vscrollbar.set_pos(cur_vscrollpos - 1);
							}
							else {
								this._fixed_row_scrolling = false;
							}
						}
						else if (mode == "down") {
							if (cur_srow <= this._fixed_endrow && cur_erow <= this._fixed_endrow) {
								this._fixed_row_scroll_zeroset = true;
							}
							else {
								this._fixed_row_scroll_zeroset = false;
							}

							if (this._fixed_row_scroll_zeroset && afterRow && (afterRow <= 0 || (afterRow <= this._fixed_endrow && cur_erow > this._fixed_endrow) || (afterRow > this._fixed_endrow && cur_srow <= this._fixed_endrow))) {
								if (cur_vscrollpos > 0) {
									this.vscrollbar.set_pos(0);
									this._fixed_row_scroll_zeroset = false;
									return;
								}
							}
						}
						else {
							if (cur_vscrollpos == 0) {
								this._fixed_row_scrolling = false;
							}
							else if (this._fixed_row_scrolling) {
								this.vscrollbar.set_pos(cur_vscrollpos - 1);
							}
						}
					}
				}

				while (true) {
					if (this.selecttype == "multirow" && afterRow == beforeRow) {
						break;
					}

					this._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);
					this._ChangeSelect(afterCell, afterCol, afterRow, afterSubrow, afterPvt, false, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, cellobj._band.id, "mousemove");
					break;
				}
				this._prevAreaCellObj = cellobj;
			}
		}
	};

	_pGrid._on_start_extratrack = function (windowX, windowY, screenX, screenY, keepstart) {
		var scroll_left = this._getScrollLeft();
		var scroll_top = this._getScrollTop();

		this._track_point.x = screenX;
		this._track_point.y = screenY;
		this._track_point.w = 0;
		this._track_point.h = 0;
		this._track_point.cur_rect = {
			l : 0, 
			t : 0, 
			w : 0, 
			h : 0
		};

		this._track_start_info = {
		};
		this._track_start_info.target = this._lastmouseentercell;

		this._track_start_info.cell_screenX = system.clientToScreenX(this._lastmouseentercell, 0);
		this._track_start_info.cell_screenY = system.clientToScreenY(this._lastmouseentercell, 0);


		var frame = this._getOwnerFrame();

		if (frame && (frame._window_type == 1 || frame._window_type == 4 || frame._window_type == 5)) {
			var adjust_x = this._lastmouseentercell._adjust_left;
			var adjust_y = this._lastmouseentercell._adjust_top;

			var parent = this._lastmouseentercell.parent;

			while (parent) {
				if (parent._is_frame) {
					break;
				}
				adjust_x += parent._adjust_left;
				adjust_y += parent._adjust_top;

				parent = parent.parent;
			}

			var frame_screenx = system.clientToScreenX(frame, 0);
			var frame_screeny = system.clientToScreenY(frame, 0);
			if (frame_screenx == 0 && frame._adjust_left < 0) {
				frame_screenx = frame._adjust_left;
			}
			if (frame_screeny == 0 && frame._adjust_top < 0) {
				frame_screeny = frame._adjust_top;
			}

			this._track_start_info.cell_screenX = frame_screenx + adjust_x;
		}

		this._track_start_info.start_screenX = screenX;
		this._track_start_info.start_screenY = screenY;
		this._track_start_info.scrollLeft = scroll_left;
		this._track_start_info.scrollTop = scroll_top;

		this._track_start_info._start_begarea = this._selectinfo.arearect.barea;
		this._track_start_info._start_endarea = this._selectinfo.arearect.earea;

		var cur_rect = this._getSelectRect(false, true);
		var rectinfo = this._getExtraTrackSelectRect(screenX, screenY, 0, 0, true);

		if (!keepstart) {
			this._startAreaSizing(rectinfo, rectinfo.idx);
		}

		this._track_mode = "areaselect";
	};

	_pGrid._on_move_extratrack = function (obj, windowX, windowY, distX, distY, screenX, screenY) {
		var rootcomp = this._getRootComponent(obj);

		if (rootcomp != this || 
			obj && (rootcomp == this && obj instanceof nexacro.GridCell && (obj._band.id == "head" || obj._band.id == "summ")) || (rootcomp == this && obj instanceof nexacro.GridRow && obj._band.id == "body") || (rootcomp == this && obj.id == "body")) {
			var rectinfo = this._getExtraTrackSelectRect(screenX, screenY, distX, distY, false);
			var idx = rectinfo.idx;

			var typeinfo = this._getTrackType(this._track_start_info, rectinfo.l, rectinfo.t, rectinfo.w, rectinfo.h, idx, false);

			var select_area = this._selectinfo.area;
			if (this._fixed_rowcnt > 0 && select_area.length) {
				var cur_area = select_area[select_area.length - 1];
				var cur_srow = cur_area.begrow;
				var cur_erow = cur_area.endrow;

				var ctrlpoint = this._selectinfo.ctrlpoint;
				var cur_row = ctrlpoint.row;
				var cur_col = ctrlpoint.col;

				var border = this.currentstyle.border;
				var border_top = (border) ? parseInt(border.right_width, 10) : 0;

				var headheight = this._getHeadHeight();
				var fixedheight = this._fixed_height;
				var fixedbottom = headheight + fixedheight + border_top;
				var fixedsrow = this._fixed_startrow;
				var fixederow = this._fixed_endrow;
				var t = rectinfo.t;
				var h = rectinfo.h;

				var cur_scrolltop = this._getScrollTop();
				var vscrollbar = this.vscrollbar;

				if (cur_srow <= fixederow && cur_erow <= fixederow && cur_scrolltop > 0 && (t + h) > fixedbottom) {
					vscrollbar.set_pos(0);
				}
				else if (cur_srow <= fixederow && cur_erow >= fixederow && cur_scrolltop > 0 && (t + h) <= fixedbottom) {
					vscrollbar.set_pos(vscrollbar.pos - 1);
				}
				else if (ctrlpoint.row > fixederow && cur_scrolltop > 0 && t <= fixedbottom) {
					vscrollbar.set_pos(vscrollbar.pos - 1);
				}
			}

			this._applySelectorScroll(typeinfo.type);
			this._applyAreaSizing(rectinfo, idx);
			var cur_rect = this._getSelectRect(false, true);

			this._extratrack_typeinfo = typeinfo;
			this._extratrack_rectinfo = rectinfo;
			this._extratrack_idx = idx;

			var init_interval = 500;
			var min_intervalgap = 10;

			function getTimerInterval (obj) {
				var interval = init_interval;

				var grid_x = nexacro.System.clientToScreenX(obj, 0);
				var grid_y = nexacro.System.clientToScreenY(obj, 0);
				var frame = obj._getOwnerFrame();

				if (frame && (frame._window_type == 1 || frame._window_type == 4)) {
					var adjust_x = obj._adjust_left;
					var adjust_y = obj._adjust_top;

					var parent = obj.parent;

					while (parent) {
						if (parent._is_frame) {
							break;
						}

						adjust_x += parent._adjust_left;
						adjust_y += parent._adjust_top;

						parent = parent.parent;
					}


					var frame_screenx = system.clientToScreenX(frame, 0);
					var frame_screeny = system.clientToScreenY(frame, 0);
					if (frame_screenx == 0 && frame._adjust_left < 0) {
						frame_screenx = frame._adjust_left;
					}
					if (frame_screeny == 0 && frame._adjust_top < 0) {
						frame_screeny = frame._adjust_top;
					}

					grid_x = frame_screenx + adjust_x;
				}

				var grid_r = grid_x + parseInt(obj._adjust_width);
				var grid_b = grid_y + parseInt(obj._adjust_height);

				var wgap = (screenX < grid_x) ? (grid_x - screenX) : (screenX - grid_r);
				var hgap = (screenY < grid_y) ? (grid_y - screenY) : (screenY - grid_b);

				if (wgap >= 0) {
					interval = interval - (wgap * 10);

					return interval > 0 ? interval : 1;
				}

				if (hgap >= 0) {
					interval = interval - (hgap * 10);

					return interval > 0 ? interval : 1;
				}

				return -1;
			}

			var timer_interval = getTimerInterval(this);

			if (timer_interval > 0 && timer_interval < min_intervalgap) {
				timer_interval = min_intervalgap;
			}

			if (timer_interval > 0) {
				if (!this._extratrack_timer) {
					this._extratrack_timer = {
					};
					this._extratrack_timer._handle = null;
					this._extratrack_timer._interval = timer_interval;

					this._extratrack_timer._handle = new nexacro.CallbackTimer(this, function () {
						this._applySelectorScroll(this._extratrack_idx, this._extratrack_typeinfo.type);
						this._applyAreaSizing(this._extratrack_rectinfo, this._extratrack_idx);
						var cur_rect = this._getSelectRect(false, true);
					}, timer_interval);

					this._extratrack_timer._handle.start();
				}
				else {
					if (this._extratrack_timer && this._extratrack_timer._interval != timer_interval) {
						if (timer_interval > 0) {
							this._extratrack_timer._interval = timer_interval;
							this._extratrack_timer._handle.setInterval(timer_interval);
							this._extratrack_timer._handle.start();
						}
						else {
							this._extratrack_timer._handle.stop();
						}
					}
				}
			}
		}
		else {
			if (this._extratrack_timer) {
				this._extratrack_timer._handle.stop();
			}
		}
	};

	_pGrid._on_end_extratrack = function (x, y, dragdata) {
		var p = this._select_ctrl;

		this._track_start_info = null;
		this._track_idx = -1;
		this._track_mode = "";

		if (this._extratrack_timer) {
			this._extratrack_timer._handle.stop();
			this._extratrack_timer._handle = null;
			this._extratrack_timer = null;
		}

		var cur_rect = this._getSelectRect(false, true);
	};

	_pGrid._endExtraTrack = function () {
		this._on_end_extratrack();
		nexacro._cur_extra_track_info = null;
	};

	_pGrid._trackingHScroll = function (idx, left, right, start_begarea, start_endarea, bodystart, rightstart, scroll_left, scroll_max) {
		var retn = [0, 0];

		if (!this.hscrollbar) {
			return retn;
		}

		var hscroll = this.hscrollbar;

		if (idx == 0 || idx == 2) {
			if (start_begarea == "right") {
				if (left < rightstart && left > bodystart) {
					hscroll.set_pos(scroll_max);
				}
			}
			else if (start_begarea == "left") {
				if (left > bodystart && left < rightstart) {
					hscroll.set_pos(0);
					retn[1] = scroll_left;
				}
			}
		}
		else {
			if (start_endarea == "left") {
				if (right > bodystart && right < rightstart) {
					hscroll.set_pos(0);
				}
			}
			else if (start_endarea == "right") {
				if (right < rightstart && right > bodystart) {
					hscroll.set_pos(scroll_max);
					retn[0] = scroll_left - scroll_max;
					retn[1] = scroll_max - scroll_left;
				}
			}
		}
		return retn;
	};

	_pGrid._getTrackType = function (obj, left, top, width, height, idx, onlyarea) {
		var hmin, hmax, vmin, vmax;
		var grid = this;
		var format = grid._curFormat;
		var type = ["", ""];
		var area = grid._selectinfo.ctrlpoint.area;

		var leftwidth = format.leftWidth;
		var rightstart = grid._client_width - format.rightWidth;
		var bodylast = format.leftWidth + format.bodyWidth;
		var scroll_left = grid._getScrollLeft();
		var scroll_max = grid._getScollMaxLeft();
		var right = left + width;
		var headheight = grid._getHeadHeight();
		var fixedheight = grid._fixed_height;
		var fixedbottom = headheight + fixedheight;


		if (onlyarea) {
			if (area == "left") {
				hmin = 0;
				hmax = leftwidth;
			}
			else if (area == "right") {
				hmin = rightstart;
				hmax = grid._client_width;
			}
			else {
				hmin = leftwidth;
				hmax = (bodylast < rightstart) ? bodylast : rightstart;
			}
		}
		else {
			var move = this._trackingHScroll(idx, left, right, leftwidth, obj._start_begarea, obj._start_endarea, rightstart, scroll_left, scroll_max);

			left += move[0];
			width += move[1];
			right = left + width;

			if (area == "left") {
				hmin = 0;

				if (scroll_left == scroll_max) {
					hmax = (bodylast < grid._client_width) ? bodylast : grid._client_width;
				}
				else {
					hmax = (bodylast < rightstart) ? bodylast : rightstart;
				}
			}
			else if (area == "right") {
				if (scroll_left == 0) {
					hmin = 0;
				}
				else {
					hmin = leftwidth;
				}

				hmax = grid._client_width;
			}
			else {
				if (scroll_left == 0) {
					hmin = 0;
				}
				else {
					hmin = leftwidth;
				}

				if (scroll_left == scroll_max) {
					hmax = (bodylast < grid._client_width) ? bodylast : grid._client_width;
				}
				else {
					hmax = (bodylast < rightstart) ? bodylast : rightstart;
				}
			}
		}

		vmin = this._bodyBand._adjust_top;
		vmax = this._bodyBand._getPosBottom();

		if (idx == 0) {
			if (left < hmin) {
				width -= (hmin - left);
				left = hmin;

				if (this._start_begarea != "left") {
					type[0] = "leftover0";
				}
			}
			else if (left > hmax || (scroll_left < scroll_max && left > rightstart)) {
				type[0] = "rightover0";
			}

			if (grid._fixed_rowcnt > 0) {
				if (top < (fixedheight + headheight)) {
					type[1] = "topover0";
				}
				else if (top > vmax) {
					type[1] = "bottomover0";
				}
			}
			else {
				if (top < vmin) {
					height -= (vmin - top);
					top = vmin;
					type[1] = "topover0";
				}
				else if (top > vmax) {
					type[1] = "bottomover0";
				}
			}


			if (width <= 0) {
				left += width - 1;
			}

			if (height <= 0) {
				top += height - 1;
			}
		}
		else if (idx == 1) {
			var r = left + width, b = top + height;

			if (r < hmin || (scroll_left > 0 && r < leftwidth)) {
				type[0] = "leftover1";
			}
			else if (r > hmax) {
				width = hmax - left;

				if (this._start_endarea != "right") {
					type[0] = "rightover1";
				}
			}

			if (b < vmin) {
				type[1] = "topover1";
			}
			else if (b > vmax) {
				height = vmax - top;
				type[1] = "bottomover1";
			}
		}
		else if (idx == 2) {
			var b = top + height;
			if (left < hmin) {
				width -= (hmin - left);
				left = hmin;

				if (this._start_begarea != "left") {
					type[0] = "leftover0";
				}
			}
			else if (left > hmax || (scroll_left < scroll_max && left > rightstart)) {
				type[0] = "rightover0";
			}
			if (b < vmin || b > fixedbottom) {
				type[1] = "topover1";
			}
			else if (b > vmax) {
				height = vmax - top;
				type[1] = "bottomover1";
			}
		}
		else if (idx == 3) {
			var r = left + width;

			if (r < hmin || (scroll_left > 0 && r < leftwidth)) {
				type[0] = "leftover1";
			}
			else if (r > hmax) {
				width = hmax - left;

				if (this._start_endarea != "right") {
					type[0] = "rightover1";
				}
			}
			if (top < vmin) {
				type[1] = "topover1";
			}
			else if (top > vmax) {
				height = vmax - top;
				type[1] = "bottomover1";
			}
		}

		return {
			type : type, 
			adjust_l : left, 
			adjust_t : top, 
			adjust_w : width, 
			adjust_h : height
		};
	};

	_pGrid._getExtraTrackSelectRect = function (screenX, screenY, distX, distY, bApplyFixedRow) {
		var idx = 1;
		var startinfo = this._track_start_info;

		var start_cell_startX = startinfo.start_screenX;
		var start_cell_startY = startinfo.start_screenY;
		var start_cell_screenX = startinfo.cell_screenX;
		var start_cell_screenY = startinfo.cell_screenY;


		var start_cell_scrollLeft = startinfo.scrollLeft;
		var start_cell_scrollTop = startinfo.scrollTop;


		var start_cell_width = startinfo.target.width;
		var start_cell_height = startinfo.target.height;
		var start_cell_row = startinfo.target._rowidx;

		var start_cell_startTopGap = start_cell_screenY - start_cell_startY;
		var start_cell_startBottomGap = start_cell_screenY - start_cell_startY + start_cell_height;
		var start_cell_startLeftGap = start_cell_startX - start_cell_screenX;
		var start_cell_startRightGap = start_cell_screenX - start_cell_startX + start_cell_width;

		var scroll_left = this._getScrollLeft();
		var scroll_top = this._getScrollTop();
		var scroll_left_gap = scroll_left - start_cell_scrollLeft;
		var scroll_top_gap = scroll_top - start_cell_scrollTop;
		var adjust_scroll_top_gap = scroll_top_gap;

		var grid_body_screenx = system.clientToScreenX(this, 0);
		var grid_body_screeny = system.clientToScreenY(this, 0);

		var frame = this._getOwnerFrame();
		;

		if (frame && (frame._window_type == 1 || frame._window_type == 4 || frame._window_type == 5)) {
			var adjust_x = this._adjust_left;
			var adjust_y = this._adjust_top;

			var parent = this.parent;

			while (parent) {
				if (parent._is_frame) {
					break;
				}

				adjust_x += parent._adjust_left;
				adjust_y += parent._adjust_top;

				parent = parent.parent;
			}
			var frame_screenx = system.clientToScreenX(frame, 0);
			var frame_screeny = system.clientToScreenY(frame, 0);
			if (frame_screenx == 0 && frame._adjust_left < 0) {
				frame_screenx = frame._adjust_left;
			}
			if (frame_screeny == 0 && frame._adjust_top < 0) {
				frame_screeny = frame._adjust_left;
			}

			grid_body_screenx = frame_screenx + adjust_x;
		}

		var bApply_scroll_top = true;
		if (this._fixed_rowcnt > 0 && start_cell_row >= this._fixed_startrow && start_cell_row <= this._fixed_endrow) {
			bApply_scroll_top = false;
		}

		if (!bApply_scroll_top) {
			adjust_scroll_top_gap = 0;
		}

		if (screenX < (start_cell_startX - scroll_left_gap) && screenY < (start_cell_startY - adjust_scroll_top_gap)) {
			idx = 0;
		}
		else if (screenX > (start_cell_startX - scroll_left_gap) && screenY > (start_cell_startY - adjust_scroll_top_gap)) {
			idx = 1;
		}
		else if (screenX < (start_cell_startX - scroll_left_gap) && screenY > (start_cell_startY - adjust_scroll_top_gap)) {
			idx = 2;
		}
		else if (screenX > (start_cell_startX - scroll_left_gap) && screenY < (start_cell_startY - adjust_scroll_top_gap)) {
			idx = 3;
		}


		var x = distX;
		var y = distY;

		var type = new Array(2);

		var border = this.currentstyle.border;
		var border_left = (border) ? parseInt(border.left_width, 10) : 0;
		var border_right = (border) ? parseInt(border.right_width, 10) : 0;
		var border_top = (border) ? parseInt(border.right_width, 10) : 0;
		var border_bottom = (border) ? parseInt(border.right_width, 10) : 0;

		var l, t, w, h;

		if (idx == 0) {
			l = this._track_point.x - grid_body_screenx + x;
			t = this._track_point.y - grid_body_screeny + y;
			w = -(x);
			h = -(y) - (bApply_scroll_top ? scroll_top_gap : 0);
		}
		else if (idx == 1) {
			l = this._track_point.x - grid_body_screenx - scroll_left_gap;
			t = this._track_point.y - grid_body_screeny - (bApply_scroll_top ? scroll_top_gap : 0);
			w = x + scroll_left_gap;
			h = y + (bApply_scroll_top ? scroll_top_gap : 0);
		}
		else if (idx == 2) {
			l = this._track_point.x - grid_body_screenx + x;
			t = this._track_point.y - grid_body_screeny - (bApply_scroll_top ? scroll_top_gap : 0);
			w = -(x) - scroll_left_gap;

			h = y + (bApply_scroll_top ? scroll_top_gap : 0);
		}
		else if (idx == 3) {
			l = this._track_point.x - grid_body_screenx - scroll_left_gap;
			t = this._track_point.y - grid_body_screeny + y;
			w = x + scroll_left_gap;
			h = -(y) - (bApply_scroll_top ? scroll_top_gap : 0);
		}

		return {
			idx : idx, 
			l : l, 
			t : t, 
			w : w, 
			h : h
		};
	};
	_pGrid.on_fire_sys_onmousemove = function (button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (!this.enable) {
			return true;
		}

		return this._areaselectMove(from_refer_comp, canvasX, canvasY);
	};

	_pGrid._setSelectedInfo = function (cell, col, datarow, subrow, pvt, areainfo) {
		if (cell !== null) {
			this._selectinfo.curcell = this.currentcell = cell;
		}
		if (col !== null) {
			this._selectinfo.curcol = this.currentcol = col;
		}
		if (datarow !== null) {
			this._selectinfo.curdsrow = this._currentDSrow = datarow;
			this._selectinfo.currow = this.currentrow = (datarow < 0) ? datarow : this._getTreeRowPosition(datarow);
		}
		if (subrow !== null) {
			this._selectinfo.cursubrow = this.currentsubrow = subrow;
		}
		if (pvt !== null) {
			this._selectinfo.curpvt = this.currentpivot = pvt;
		}

		if (areainfo) {
			this._selectinfo.areainfo = null;
			this._selectinfo.areainfo = {
				srow : areainfo.srow, 
				erow : areainfo.erow, 
				scell : areainfo.scell, 
				ecell : areainfo.ecell, 
				scol : areainfo.scol, 
				ecol : areainfo.ecol, 
				ssubrow : areainfo.ssubrow, 
				esubrow : areainfo.esubrow, 
				spvt : areainfo.spvt, 
				epvt : areainfo.epvt
			};
		}
	};
	_pGrid._is_drag_selecting = false;
	_pGrid._on_grid_lbuttondown = function (cellobj, band, ctrlkey, shiftkey, no_select) {
		if (!this._is_alive) {
			return;
		}
		if (!this.enable) {
			return true;
		}

		var newPos = this._getDataRow(cellobj._rowidx);
		if (newPos == undefined) {
			newPos = 0;
		}

		if (this._isFakeCell(newPos) || newPos < 0) {
			return true;
		}

		var beforeCell = this._beforebodycellpos = this._selectinfo.curcell;
		var beforeCol = this._beforebodycolpos = this._selectinfo.curcol;
		var beforeRow = this._beforebodyrowpos = this._selectinfo.curdsrow;
		var beforeSubrow = this._beforebodysubrowpos = this._selectinfo.cursubrow;
		var beforePvt = this._beforepvt = this._selectinfo.curpvt;

		var afterCell = cellobj._cellidx;
		var afterCol = cellobj._refobj._col;
		var afterRow = newPos;
		var afterSubrow = cellobj._refobj._row;
		var afterPvt = -9;

		var parentcell = cellobj.parentcell;
		this._prevAreaCellObj = cellobj;

		if (parentcell) {
			afterCell = parentcell._cellidx;
			afterCol += parentcell._refobj._col;
			this._prevAreaCellObj = parentcell;
		}

		if (!no_select) {
			this._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);
		}

		if (ctrlkey == true) {
			if (this._isMultiSelect()) {
				this._multiselect = "ctrl";
			}
			else {
				this._multiselect = "none";
			}
		}
		else if (shiftkey == true) {
			if (this._isMultiSelect() || this._isAreaSelect()) {
				this._multiselect = "shift";
			}
			else {
				this._multiselect = "none";
			}
		}
		else {
			if (this._multiselect != "none") {
				this._selectClear = true;
			}

			this._multiselect = "none";
		}

		if ((this._isAreaSelect() || this._isMultiSelect()) && !nexacro.isTouchInteraction) {
			this._is_drag_selectstart = true;
		}

		var retn = false;

		if (!no_select) {
			retn = this._ChangeSelect(afterCell, afterCol, afterRow, afterSubrow, afterPvt, false, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, band, "lbuttondown");
		}
		;

		if (!retn) {
			this._is_drag_sameselect = true;
		}

		var win = this._getWindow();
		if (!nexacro.isTouchInteraction && (this._isAreaSelect() || this.selecttype == "multirow")) {
			if (nexacro.Browser == "Runtime") {
				var frame = this._getOwnerFrame();

				if (frame._window_type != 1 && frame._window_type != 4 && frame._window_type != 5) {
					frame = application.mainframe;
				}

				var screenX = system.clientToScreenX(frame, 0) + win._curWindowX - ((frame._adjust_left >= 0) ? frame._adjust_left : 0);
				var screenY = system.clientToScreenY(frame, 0) + win._curWindowY - ((frame._adjust_top >= 0) ? frame._adjust_top : 0);

				nexacro._setExtraTrackInfo(win, this, win._curWindowX, win._curWindowY, screenX, screenY, shiftkey || no_select);
			}
			else {
				nexacro._setExtraTrackInfo(win, this, win._curWindowX, win._curWindowY, win._cur_screen_pos.x, win._cur_screen_pos.y, shiftkey || no_select);
			}
		}

		return retn;
	};

	_pGrid.on_fire_onselectchanged = function (obj, cell, col, row, subrow, pvt, oldcell, oldcol, oldrow, oldsubrow, oldpvt, selectendcol, selectendpivot, selectendrow, selectendsubrow, selectstartcol, selectstartpivot, selectstartrow, selectstartsubrow) {
		if (this.onselectchanged && this.onselectchanged._has_handlers) {
			var evt = new nexacro.GridSelectEventInfo(obj, "onselectchanged", cell, col, row, subrow, pvt, oldcell, oldcol, oldrow, oldsubrow, oldpvt, selectendcol, selectendpivot, selectendrow, selectendsubrow, selectstartcol, selectstartpivot, selectstartrow, selectstartsubrow);
			return this.onselectchanged._fireEvent(this, evt);
		}
		return true;
	};

	_pGrid.on_fire_user_onkeyup = function (keyCode, altKey, ctrlKey, shiftKey, obj, refer_comp) {
		if (!this.enable) {
			return true;
		}

		if (shiftKey == false && ctrlKey == false) {
			if (keyCode != nexacro.Event.KEY_SHIFT && keyCode != nexacro.Event.KEY_CTRL) {
				this._multiselect = "none";
			}
		}

		if (this._iskey_movetocell) {
			this._moveCellAfterFocus();
		}

		this._iskey_movetocell = false;
		this._keydown_elem = null;

		var retn = nexacro.Component.prototype.on_fire_user_onkeyup.call(this, keyCode, altKey, ctrlKey, shiftKey, obj, refer_comp);

		if (!this._is_alive) {
			return ret;
		}

		if (keyCode == nexacro.Event.KEY_RIGHT && altKey) {
			var format = this._curFormat;
			if (format) {
				var bodycells = format._bodycells;
				if (bodycells && bodycells.length) {
					var cellinfo = this._getBodyCellInfo(this._selectinfo.curcell);
					if (cellinfo) {
						var expandshow = cellinfo._getAttrValue(cellinfo.expandshow, this._selectinfo.curdsrow);
						if (expandshow == "show") {
							if (this.onkeyup && this.onkeyup.defaultprevented == true) {
							}
							else {
								this.on_fire_onexpandup("none", altKey, ctrlKey, shiftKey, -1, -1, -1, -1, -1, -1, obj, refer_comp);
							}
						}
					}
				}
			}
		}

		return retn;
	};

	_pGrid.on_fire_sys_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp) {
		if (this._is_down_act) {
			this._on_last_keyup(true);
		}
	};

	_pGrid.on_fire_user_onkeydown = function (keyCode, altKey, ctrlKey, shiftKey, obj, refer_comp) {
		var accGridHotkey = nexacro.AccessibilityUtil.checkComponentHotkey(this, keyCode, altKey, ctrlKey, shiftKey);
		if (accGridHotkey) {
			this._hideEditor();
			var row = this.currentrow;
			switch (accGridHotkey) {
				case nexacro.AccessibilityUtil.Hotkey.FIRSTCELL:
					this.currentcell = 0;
					this._currentBand = "grid";
					if (this.vscrollbar && this.vscrollbar.visible) {
						this.vscrollbar.set_pos(0);
					}
					this._setAccessibilityBandFocus("next", false, true);
					break;
				case nexacro.AccessibilityUtil.Hotkey.LASTCELL:
					this.currentcell = this._getAccessibilityCellIndex() - 1;
					this._currentBand = "grid";
					if (this.vscrollbar && this.vscrollbar.visible) {
						this.vscrollbar.set_pos(this.vscrollbar._max);
					}
					this._setAccessibilityBandFocus("prev", false, true);
					break;
				case nexacro.AccessibilityUtil.Hotkey.FIRSTCELLINROW:
					this.currentcol = 0;
					if (nexacro._enableaccessibility) {
						this._moveToPosAccessibilityCell(row, 0);
					}
					else {
						this._moveToPosCell(row, 0);
					}
					break;
				case nexacro.AccessibilityUtil.Hotkey.LASTCELLINROW:
					this.currentcol = this._curFormat._cols.length - 1;
					if (nexacro._enableaccessibility) {
						this._moveToPosAccessibilityCell(row, this.currentcol);
					}
					else {
						this._moveToPosCell(row, this.currentcol);
					}
					break;
				case nexacro.AccessibilityUtil.Hotkey.FIRSTCELLINCOLUMN:
					this._currentBand = "grid";
					if (this.vscrollbar && this.vscrollbar.visible) {
						this.vscrollbar.set_pos(0);
					}

					if (nexacro._enableaccessibility) {
						this._setAccessibilityBandFocus("next", false, true);
					}
					else {
						this._moveToPosCell(0, this.currentcol);
					}
					break;
				case nexacro.AccessibilityUtil.Hotkey.LASTCELLINCOLUMN:
					this._currentBand = "grid";
					if (this.vscrollbar && this.vscrollbar.visible) {
						this.vscrollbar.set_pos(this.vscrollbar._max);
					}

					if (nexacro._enableaccessibility) {
						this._setAccessibilityBandFocus("prev", false, true);
					}
					else {
						this._moveToPosCell(this._rowcount - 1, this.currentcol);
					}
					break;
			}
			return true;
		}

		if (!this.enable) {
			return true;
		}

		var ret = nexacro.Component.prototype.on_fire_user_onkeydown.call(this, keyCode, altKey, ctrlKey, shiftKey, obj, refer_comp);

		if ((this.onkeydown && this.onkeydown.defaultprevented == true) || !this._is_alive) {
			return ret;
		}

		this._keydown_elem = this._getWindow()._keydown_element;

		var areamove = false;

		if (this._isAreaSelect()) {
			areamove = true;
		}

		if (shiftKey == true) {
			if (keyCode == nexacro.Event.KEY_SHIFT) {
				return ret;
			}

			if (this._isMultiSelect() || this._isAreaSelect()) {
				this._multiselect = "shift";
			}
			else {
				this._multiselect = "none";
			}
		}
		else if (ctrlKey == true) {
			if (keyCode == nexacro.Event.KEY_CTRL) {
				return ret;
			}

			if (this._multiselect != "none") {
				this._selectClear = true;
			}

			this._multiselect = "none";
		}
		else {
			if (this._multiselect != "none") {
				this._selectClear = true;
			}

			this._multiselect = "none";
		}

		var bEnterDown = false;
		var bShowEditor = true;
		if (this._isChar(keyCode) && this.autoenter == "key") {
			if (nexacro.Browser == "Runtime") {
				if (!this._showEditing) {
					this._showEditor();

					if (this._currentCellEditor && this._currentCellEditor._set_absolutelyValue) {
						this._currentCellEditor._set_absolutelyValue("");
					}

					if (keyCode == nexacro.Event.KEY_ENTER) {
						bEnterDown = true;
					}
				}
			}
		}

		if (keyCode == nexacro.Event.KEY_ENTER && this._showEditing) {
			var edit = this._currentCellEditor;
			var edittype = edit._cellinfo._getEdittype(edit._cellobj._rowidx);

			if (edittype == "textarea" && (altKey || ctrlKey || shiftKey)) {
				;
			}
			else if (edittype == "text" || edittype == "mask" || edittype == "date" || edittype == "combo" || edittype == "masknumber" || edittype == "textarea") {
				if (edit.calendaredit) {
					edit.calendaredit._edit_base_api.syncValue();
				}
				else if (edit.comboedit) {
					edit.comboedit._edit_base_api.syncValue();
					edit.value = edit.comboedit.value;
					edit.text = edit.comboedit.text;
				}
				else {
					edit._edit_base_api.syncValue();
				}

				bEnterDown = true;
				bShowEditor = false;

				if (refer_comp instanceof nexacro.ComboEditCtrl && refer_comp.parent._isPopupVisible()) {
				}
				else {
					this._hideEditor();
				}
			}
		}

		var firecomp = refer_comp;
		var postvalue = "";

		if (keyCode == nexacro.Event.KEY_UP) {
			if (this._isEditorKeyAction(this._keydown_elem, refer_comp, keyCode, altKey, ctrlKey, shiftKey) == false) {
				if (ctrlKey) {
					if (this.vscrollbar && this.vscrollbar.enable) {
						var newpos;

						if (this._scrollpixel == "all") {
							newpos = this.vscrollbar.pos - 25;
						}
						else {
							newpos = this.vscrollbar.pos - 1;
						}

						if (newpos < 0) {
							newpos = 0;
						}

						this.vscrollbar.set_pos(newpos);
					}
				}
				else {
					if (nexacro._enableaccessibility) {
						ret = this._moveToAccessibilityCell("up", false);
					}
					else {
						this._moveToCell("up");
					}
				}
			}
		}
		else if (keyCode == nexacro.Event.KEY_DOWN) {
			if (this._isEditorKeyAction(this._keydown_elem, refer_comp, keyCode, altKey, ctrlKey, shiftKey) == false) {
				if (ctrlKey) {
					var newpos;

					if (this._scrollpixel == "all") {
						newpos = this.vscrollbar.pos + 25;
					}
					else {
						newpos = this.vscrollbar.pos + 1;
					}

					if (newpos > this.vscrollbar.max) {
						newpos = this.vscrollbar.max;
					}

					this.vscrollbar.set_pos(newpos);
				}
				else {
					if (nexacro._enableaccessibility) {
						ret = this._moveToAccessibilityCell("down", false);
					}
					else {
						this._moveToCell("down");
					}
				}
			}
		}
		else if (keyCode == nexacro.Event.KEY_SPACE) {
			if (!nexacro._enableaccessibility || nexacro._enableaccessibility && this._currentBand == "body") {
				var format = this._curFormat;
				if (format) {
					var bodycells = format._bodycells;
					if (bodycells && bodycells.length) {
						var cellinfo = bodycells[this._selectinfo.curcell];
						if (cellinfo) {
							var editType = cellinfo._getEdittype(this._selectinfo.curdsrow);
							if (editType == "checkbox" && nexacro._toBoolean(this.readonly) == false) {
								if (this._toggleVal(this._selectinfo.curdsrow, cellinfo)) {
									this._jumpCurrentRow(this._selectinfo.currow);
								}
							}
						}
					}
				}
			}
		}
		else if (keyCode == nexacro.Event.KEY_ENTER) {
			if (!nexacro._enableaccessibility || nexacro._enableaccessibility && this._currentBand == "body") {
				{

					var editType = "";

					if (refer_comp._type_name == "GridCell") {
						editType = refer_comp._refobj._getEdittype(refer_comp._rowidx);
						postvalue = refer_comp._refobj._getValue(refer_comp._rowidx);
					}
					else if (refer_comp instanceof nexacro.GridControlCheckbox) {
						postvalue = refer_comp._cellinfo._getValue(refer_comp._cellobj._rowidx);
					}
					else if (refer_comp.parent instanceof nexacro.GridControlCheckbox) {
						postvalue = refer_comp.parent._cellinfo._getValue(refer_comp.parent._cellobj._rowidx);
					}

					if (refer_comp instanceof nexacro.GridControlEdit || 
						refer_comp instanceof nexacro.GridControlTextArea || 
						refer_comp instanceof nexacro.GridControlMaskEdit || 
						refer_comp instanceof nexacro.GridControlCheckbox || refer_comp.parent instanceof nexacro.GridControlCheckbox || editType == "checkbox" || 
						refer_comp instanceof nexacro.GridControlCalendar || refer_comp.parent instanceof nexacro.GridControlCalendar || 
						refer_comp instanceof nexacro.GridControlCombo || refer_comp.parent instanceof nexacro.GridControlCombo) {
						if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
							if (refer_comp instanceof nexacro.GridControlCombo) {
								firecomp = refer_comp.comboedit;
							}
						}
						if (this._showEditing || editType == "checkbox") {
							if (!altKey && !ctrlKey && !shiftKey) {
								bEnterDown = true;
							}
						}
						else if (bShowEditor) {
							nexacro.OnceCallbackTimer.callonce(this, function () {
								this._showEditor();
							});
						}
					}
					else {
						if (!this._showEditing) {
							nexacro.OnceCallbackTimer.callonce(this, function () {
								this._showEditor();
							});
						}
					}
				}
			}
		}
		else if (keyCode == nexacro.Event.KEY_LEFT) {
			var format = this._curFormat;
			if (format) {
				var bodycells = format._bodycells;
				if (bodycells && bodycells.length) {
					var cellinfo = this._getBodyCellInfo(this._selectinfo.curcell);
					if (cellinfo) {
						var editType = cellinfo._getEdittype(this._selectinfo.curdsrow);
						if (editType == "tree" && this.treeuseexpandkey) {
							this._is_editor_keyaction = false;
							this._setTreeState(this._selectinfo.currow, 0, true);
						}
						else if (editType == "combo" && 
							cellinfo._getAttrValue(cellinfo.combotype, this._getDataRow(this._selectinfo.curdsrow)) == "dropdown") {
							this._is_editor_keyaction = false;
							if (nexacro._enableaccessibility) {
								ret = this._moveToAccessibilityCell("prev", false, undefined, areamove);
							}
							else {
								this._moveToCell("prev", false, areamove, undefined, undefined, true);
							}
						}
					}
				}

				if (this._isEditorKeyAction(this._keydown_elem, refer_comp, keyCode, altKey, ctrlKey, shiftKey) == false) {
					if (nexacro._enableaccessibility) {
						ret = this._moveToAccessibilityCell("prev", false, undefined, areamove);
					}
					else {
						this._moveToCell("prev", false, areamove, undefined, undefined, true);
					}
				}
			}
		}
		else if (keyCode == nexacro.Event.KEY_RIGHT) {
			var format = this._curFormat;
			if (format) {
				var bodycells = format._bodycells;
				if (bodycells && bodycells.length) {
					var cellinfo = this._getBodyCellInfo(this._selectinfo.curcell);
					if (cellinfo) {
						var editType = cellinfo._getEdittype(this._selectinfo.curdsrow);
						if (editType == "tree" && this.treeuseexpandkey) {
							this._is_editor_keyaction = false;
							this._setTreeState(this._selectinfo.currow, 1, true);
						}
						else if (editType == "combo" && 
							cellinfo._getAttrValue(cellinfo.combotype, this._getDataRow(this._selectinfo.curdsrow)) == "dropdown") {
							this._is_editor_keyaction = false;
							if (nexacro._enableaccessibility) {
								ret = this._moveToAccessibilityCell("next", false, undefined, areamove);
							}
							else {
								this._moveToCell("next", false, areamove, undefined, undefined, true);
							}
						}
						else {
							var expandshow = cellinfo._getAttrValue(cellinfo.expandshow, this._selectinfo.curdsrow);
							if (expandshow == "show" && altKey) {
								this._is_editor_keyaction = false;
								this.on_fire_onexpanddown("none", altKey, ctrlKey, shiftKey, -1, -1, -1, -1, -1, -1, obj, refer_comp);
							}
						}
					}
				}

				if (this._isEditorKeyAction(this._keydown_elem, refer_comp, keyCode, altKey, ctrlKey, shiftKey) == false) {
					if (nexacro._enableaccessibility) {
						ret = this._moveToAccessibilityCell("next", false, undefined, areamove);
					}
					else {
						this._moveToCell("next", false, areamove, undefined, undefined, true);
					}
				}
			}
		}
		else if (keyCode == nexacro.Event.KEY_PAGE_UP) {
			if (this.vscrollbar && this.vscrollbar.enable) {
				var newpos = this.vscrollbar._pos - this.vscrollbar.page;

				if (this._scrollpixel != "all") {
					newpos = this.vscrollbar._scroll_reverse_convert(newpos)[0];
				}

				if (newpos < 0) {
					newpos = 0;
				}

				this.vscrollbar.set_pos(newpos);
			}
		}
		else if (keyCode == nexacro.Event.KEY_PAGE_DOWN) {
			if (this.vscrollbar && this.vscrollbar.enable) {
				var newpos = this.vscrollbar._pos + this.vscrollbar.page;

				if (this._scrollpixel != "all") {
					newpos = this.vscrollbar._scroll_reverse_convert(newpos)[0];
				}

				if (newpos > this.vscrollbar.max) {
					newpos = this.vscrollbar.max;
				}

				this.vscrollbar.set_pos(newpos);
			}
		}
		else if (keyCode == nexacro.Event.KEY_TAB) {
			if (nexacro._enableaccessibility) {
				if (shiftKey) {
					this._acceptstab = this._moveToAccessibilityCell("prev", true);
				}
				else {
					this._acceptstab = this._moveToAccessibilityCell("next", true);
				}
			}
			else {
				if (shiftKey == true) {
					this._acceptstab = this._moveToCell("prev", true, false, undefined, undefined, true);
				}
				else {
					this._acceptstab = this._moveToCell("next", true, false, undefined, undefined, true);
				}
			}

			if (this._acceptstab && this._iskey_movetocell) {
				this._moveCellAfterFocus();
				this._iskey_movetocell = false;
			}

			this._keydown_elem._event_stop = true;

			return this._acceptstab;
		}
		else {
			if (this._isChar(keyCode) && this.autoenter == "key") {
				if (nexacro.Browser == "Runtime") {
					if (!this._showEditing) {
						this._showEditor();

						if (nexacro.Browser == "Gecko") {
							if (bEnterDown) {
								this.on_fire_onenterdown(keyCode, altKey, ctrlKey, shiftKey, obj, firecomp, postvalue);
							}

							return true;
						}
						else if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
						}
					}
				}
			}
		}

		if (bEnterDown) {
			this.on_fire_onenterdown(keyCode, altKey, ctrlKey, shiftKey, obj, firecomp, postvalue);
		}

		return ret;
	};

	_pGrid.on_fire_allclick = function (obj, eventid, clickitem, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, afterCell, afterCol, afterRow, afterSubrow, afterPvt, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_refer_comp) {
		if ((this.onlbuttondown && this.onlbuttondown.defaultprevented == true) || (this.onlbuttonup && this.onlbuttonup.defaultprevented == true)) {
			return;
		}
		if (this._down_scroll_top >= 0 && this._down_scroll_top != this._last_scroll_top) {
			return;
		}

		var click = this[eventid];
		if (click && click._has_handlers && this.enableevent) {
			var evt = new nexacro.GridClickEventInfo(obj, eventid, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, afterCell, afterCol, afterRow, afterSubrow, afterPvt, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
			evt.clickitem = clickitem;
			return click._fireEvent(this, evt);
		}
		return true;
	};

	_pGrid._getByteLength_UTF8 = function (s, b, i, c) {
		for (b = i = 0; c = s.charCodeAt(i++); b += c >> 11 ? 3 : c >> 7 ? 2 : 1) {
		}
		return b;
	};
	_pGrid.on_fire_cellclick = function (cellobj, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (!this._is_alive) {
			return;
		}

		if (!this.enable) {
			return true;
		}

		var newPos = this._getDataRow(cellobj._rowidx);

		if (this._isFakeCell(newPos)) {
			return true;
		}

		var subcellobj;
		if (cellobj.parentcell) {
			subcellobj = cellobj;
			cellobj = cellobj.parentcell;
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, true);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		if (nexacro.isTouchInteraction) {
			if (cellobj._band.id == "body") {
				if (!(this._selectscrollmode == "select" && this._isAreaSelect())) {
					this._common_fire_sys_lbuttondown(cellobj, ctrl_key, shift_key, canvasX, canvasY, from_comp, from_refer_comp);
				}
			}
		}

		var beforeCell = this._beforebodycellpos;
		var beforeCol = this._beforebodycolpos;
		var beforeRow = this._beforebodyrowpos;
		var beforeSubrow = this._beforebodysubrowpos;
		var beforePvt = this._beforepvt;

		var afterCell = cellobj._cellidx;
		var afterCol = cellobj._refobj._col;
		var afterRow = newPos;
		var afterSubrow = cellobj._refobj._row;
		var afterPvt = -9;
		var parentcell = cellobj.parentcell;

		if (subcellobj) {
			afterCol += subcellobj._refobj._col;
		}

		var obj = from_refer_comp;
		var showEditclick = false;

		while (obj && obj._type_name != "Grid") {
			if (obj._displaymode == false && !obj._clickevt_able) {
				showEditclick = true;
			}

			obj = obj.parent;
		}

		if (!showEditclick) {
			this.on_fire_allclick(this, "oncellclick", clickitem, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, afterCell, afterCol, afterRow, afterSubrow, afterPvt, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_refer_comp);
		}
	};

	_pGrid.on_fire_headclick = function (cellobj, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (!this.enable || !this._is_alive) {
			return true;
		}

		var subcellobj;
		if (cellobj.parentcell) {
			subcellobj = cellobj;
			cellobj = cellobj.parentcell;
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, true);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var beforeCell = this._beforeheadcellpos;
		var beforeCol = this._beforeheadcolpos;
		var beforeRow = this._beforeheadrowpos;
		var beforeSubrow = this._beforeheadsubrowpos;
		var beforePvt = this._beforepvt;

		var afterCell = this._beforeheadcellpos = cellobj._cellidx;
		var afterCol = this._beforeheadcolpos = cellobj._refobj._col;
		var afterRow = this._beforeheadrowpos = this._getDataRow(cellobj._rowidx);
		var afterSubrow = this._beforeheadsubrowpos = cellobj._refobj._row;
		var afterPvt = -9;

		this.on_fire_allclick(this, "onheadclick", clickitem, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, afterCell, afterCol, afterRow, afterSubrow, afterPvt, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_refer_comp);
	};

	_pGrid.on_fire_summclick = function (cellobj, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (!this.enable || !this._is_alive) {
			return true;
		}

		var subcellobj;
		if (cellobj.parentcell) {
			subcellobj = cellobj;
			cellobj = cellobj.parentcell;
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, true);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var beforeCell = this._beforesummcellpos;
		var beforeCol = this._beforesummcolpos;
		var beforeRow = this._beforesummrowpos;
		var beforeSubrow = this._beforesummsubrowpos;
		var beforePvt = this._beforepvt;

		var afterCell = this._beforesummcellpos = cellobj._cellidx;
		var afterCol = this._beforesummcolpos = cellobj._refobj._col;
		var afterRow = this._beforesummrowpos = this._getDataRow(cellobj._rowidx);
		var afterSubrow = this._beforesummsubrowpos = cellobj._refobj._row;
		var afterPvt = -9;

		this.on_fire_allclick(this, "onsummclick", clickitem, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, afterCell, afterCol, afterRow, afterSubrow, afterPvt, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_refer_comp);
	};

	_pGrid.on_fire_celldblclick = function (cellobj, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (!this.enable || !this._is_alive) {
			return true;
		}

		var newPos = this._getDataRow(cellobj._rowidx);

		if (this._isFakeCell(newPos)) {
			return true;
		}

		var subcellobj;
		if (cellobj.parentcell) {
			subcellobj = cellobj;
			cellobj = cellobj.parentcell;
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, true);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var beforeCell = this._dbclickPreCell;
		var beforeCol = this._dbclickPreCol;
		var beforeRow = this._dbclickPreRow;
		var beforeSubrow = this._dbclickPreSubrow;
		var beforePvt = this._dbclickPrePvt;

		var afterCell = cellobj._cellidx;
		var afterCol = cellobj._refobj._col;
		var afterRow = newPos;
		var afterSubrow = cellobj._refobj._row;
		var afterPvt = -9;

		if (subcellobj) {
			afterCol += subcellobj._refobj._col;
		}

		this._dbclickPreCell = afterCell;
		this._dbclickPreCol = afterCol;
		this._dbclickPreRow = afterRow;
		this._dbclickPreSubrow = afterSubrow;
		this._dbclickPrePvt = afterPvt;

		this.on_fire_allclick(this, "oncelldblclick", clickitem, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, afterCell, afterCol, afterRow, afterSubrow, afterPvt, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_refer_comp);
	};

	_pGrid.on_fire_headdblclick = function (cellobj, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (!this.enable || !this._is_alive) {
			return true;
		}

		var subcellobj;
		if (cellobj.parentcell) {
			subcellobj = cellobj;
			cellobj = cellobj.parentcell;
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, true);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var beforeCell = this._dbclickPreCell;
		var beforeCol = this._dbclickPreCol;
		var beforeRow = this._dbclickPreRow;
		var beforeSubrow = this._dbclickPreSubrow;
		var beforePvt = this._dbclickPrePvt;

		var afterCell = cellobj._cellidx;
		var afterCol = cellobj._refobj._col;
		var afterRow = this._getDataRow(cellobj._rowidx);
		var afterSubrow = cellobj._refobj._row;
		var afterPvt = -9;

		this._dbclickPreCell = afterCell;
		this._dbclickPreCol = afterCol;
		this._dbclickPreRow = afterRow;
		this._dbclickPreSubrow = afterSubrow;
		this._dbclickPrePvt = afterPvt;

		this.on_fire_allclick(this, "onheaddblclick", clickitem, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, afterCell, afterCol, afterRow, afterSubrow, afterPvt, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_refer_comp);
	};

	_pGrid.on_fire_summdblclick = function (cellobj, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (!this.enable || !this._is_alive) {
			return true;
		}

		var subcellobj;
		if (cellobj.parentcell) {
			subcellobj = cellobj;
			cellobj = cellobj.parentcell;
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, true);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var beforeCell = this._dbclickPreCell;
		var beforeCol = this._dbclickPreCol;
		var beforeRow = this._dbclickPreRow;
		var beforeSubrow = this._dbclickPreSubrow;
		var beforePvt = this._dbclickPrePvt;

		var afterCell = cellobj._cellidx;
		var afterCol = cellobj._refobj._col;
		var afterRow = this._getDataRow(cellobj._rowidx);
		var afterSubrow = cellobj._refobj._row;
		var afterPvt = -9;

		this._dbclickPreCell = afterCell;
		this._dbclickPreCol = afterCol;
		this._dbclickPreRow = afterRow;
		this._dbclickPreSubrow = afterSubrow;
		this._dbclickPrePvt = afterPvt;

		this.on_fire_allclick(this, "onsummdblclick", clickitem, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, afterCell, afterCol, afterRow, afterSubrow, afterPvt, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_refer_comp);
	};

	_pGrid.on_dsnotify_onrowposchanged = function (obj, e) {
		var oldPos = this._rowposition;
		var newPos = parseInt(obj.rowposition, 10);

		this._rowposition = newPos;

		if (this.getElement() && this._userRowposChange == false) {
			var cellOldPos = -1;
			var cellNewPos = -1;

			if (this._hasTree) {
				cellOldPos = this._getTreeRowPosition(oldPos);
				cellNewPos = this._getTreeRowPosition(newPos);
			}
			else {
				cellOldPos = oldPos;
				cellNewPos = newPos;
			}

			var beforeCell;
			var beforeCol;
			var beforeRow;
			var beforeSubrow;
			var beforePvt;

			var afterCell;
			var afterCol;
			var afterRow;
			var afterSubrow;
			var afterPvt = -9;

			beforeCell = this._beforebodycellpos = this._selectinfo.curcell;
			beforeCol = this._beforebodycolpos = this._selectinfo.curcol;
			beforeRow = this._beforebodyrowpos = this._selectinfo.curdsrow;
			beforeSubrow = this._beforebodysubrowpos = this._selectinfo.cursubrow;
			beforePvt = this._beforepvt = this._selectinfo.curpvt;

			if (cellNewPos < 0) {
				afterCell = (this._selectinfo.curcell < 0) ? 0 : this._selectinfo.curcell;
				afterCol = (this._selectinfo.curcol < 0) ? 0 : this._selectinfo.curcol;
				afterRow = newPos;
				afterSubrow = (this._selectinfo.cursubrow < 0) ? 0 : this._selectinfo.cursubrow;

				this._hideEditor();
				this._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);
				this._ChangeSelect(afterCell, afterCol, afterRow, afterSubrow, afterPvt, true, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, "body");
			}
			else if (cellOldPos == cellNewPos) {
			}
			else {
				afterCell = (this._selectinfo.curcell < 0) ? 0 : this._selectinfo.curcell;
				afterCol = (this._selectinfo.curcol < 0) ? 0 : this._selectinfo.curcol;
				afterRow = newPos;
				afterSubrow = (this._selectinfo.cursubrow < 0) ? 0 : this._selectinfo.cursubrow;

				this._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);

				if (afterRow >= 0 && (this._isMultiSelect() || this._isAreaSelect())) {
					if (obj._bWorkingstatus == true) {
						this._beforebodycellpos = -1;
						this._beforebodycolpos = -1;
						this._beforebodyrowpos = -1;
						this._beforebodysubrowpos = -1;

						this._setSelectedInfo(-1, -1, -1, -1, null);
						this._hideEditor();
						this._ChangeSelect(-1, -1, -1, -1, afterPvt, true, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, "body");
					}

					else {
						var disprow = this._dsRowToDispRow(afterRow);
						this._jumpCurrentRow(disprow);
					}
				}
				else {
					this._hideEditor();
					this._ChangeSelect(afterCell, afterCol, afterRow, afterSubrow, afterPvt, true, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, "body");
				}
			}
			this._moveCellAfterFocus();
		}
	};

	_pGrid.on_dsnotify_oncolumnchanged = function (obj, e) {
		if (obj._bWorkingstatus == true) {
			this._recreate_contents_all(true, true, false);
			return;
		}

		var b_change_state = false;
		var cols = [];

		if (this._isTreeStateChanged(e, this._dsEventOccured) == true) {
			b_change_state = true;

			this._updateTreeStates();

			var rowidx = this._getTreeRowPosition(e.row);
			var state = this._treeStates[e.row];

			if (this._bodyBand) {
				if (rowidx == -1) {
					this._recreate_contents_all(true, true, false, true);
				}
				else {
					if (state == 0) {
						this._bodyBand._matrix._adjustTreeDisplay(rowidx, true);
					}
					else {
						this._bodyBand._matrix._adjustTreeDisplay(rowidx, false);
					}

					var parentrow = this.getTreeParentRow(rowidx, true);
					parentrow = this._dsRowToDispRow(parentrow, true);

					this._refreshBodyRow(parentrow);
				}
			}
		}
		else if ((this.autosizingtype == "row" || this.autosizingtype == "both") && this._isChangeBodyRowSizeList(e.row) == true) {
			this._recreate_contents_all(true, true, false);
		}
		else if ((this.autosizingtype == "col" || this.autosizingtype == "both") && this._isChangeBodyColSizeList(e.columnid, cols, e.row) == true) {
			this._autofitcol_rate = [];

			if (cols.length > 1) {
				if (this.autosizingtype == "both") {
					this._recreate_contents_all(true, true, false);
				}
				else {
					this._recreate_contents_all(true, false, false);
				}
			}
			else if (cols.length == 1) {
				this._updateColSize(cols[0]);
			}
		}
		else {
			if (e.row >= 0) {
				if (this._hasTree && this._treeCellinfo.treecheck._bindexpr == e.columnid) {
					this._treeChecked = this._createTreeChecked();
				}

				var displayrow = this._dsRowToDispRow(e.row, true);
				if (displayrow >= 0) {
					var bindcells = this._getBindTextCellInfo(e.columnid);

					if (bindcells) {
						var cells = bindcells[0];
						var bind = bindcells[1];
						var bhead = false;
						var bsumm = false;
						var cellsLen = cells.length, csupp;

						for (var i = 0; i < cellsLen; i++) {
							csupp = cells[i]._getSuppress(e.row);
							if (csupp != 0) {
								this._suppressUpdate();
								break;
							}
						}

						var b_continue = false;

						for (var i = 0; i < cellsLen; i++) {
							if (cells[i].celltype == "head") {
								bhead = true;
							}
							else if (cells[i].celltype == "summary") {
								bsumm = true;
							}
							else {
								if (e.col == -1 && e.colidx == -1) {
									if (e.newvalue != undefined) {
										if (!b_continue) {
											if (this._hasTree) {
												this._initTreeStates();
												this._refreshBody();
											}
											else {
												this._refreshBodyRow(displayrow);
											}
											b_continue = true;
										}
									}
								}
								else {
									if (this._hasTree && b_change_state) {
										if (!b_continue) {
											this._refreshBody();
											b_continue = true;
										}
									}
									else {
										csupp = cells[i]._getSuppress(e.row);
										if (csupp > 0) {
											this._refreshCell("body", cells[i]._cellidx);
										}
										else if (csupp < 0) {
											if (!b_continue) {
												this._refreshBodyRow(displayrow);
												b_continue = true;
											}
										}
										else {
											if (!b_continue) {
												var ds = this._binddataset;
												if (ds.keystring && ds._keycols.length > 0) {
													this._refreshBody();
												}
												else {
													this._refreshBodyRow(displayrow);
												}
												b_continue = true;
											}

											if (bind && this._currentCellEditor && cells[i]._col == this._currentCellEditor._cellinfo._col && cells[i]._row == this._currentCellEditor._cellinfo._row && e.row == this._currentCellRow) {
												this._currentCellEditor._setProperty();
											}
										}
									}
								}
								bsumm = true;
							}
						}
					}
					if (bhead) {
						this._refreshHead();
					}
					if (bsumm) {
						this._refreshSumm();
					}
				}
			}
			else {
				this._refreshHead();
				this._refreshSumm();

				if (obj._isConstColumn(e.col) == true) {
					this._refreshBody();
				}
			}
		}
	};

	_pGrid.on_dsnotify_onload = function (obj, e) {
		if (!this._is_created && this._rowcount == obj.rowcount) {
			return;
		}

		this.rowcount = this._rowcount = obj.rowcount;
		this._rowposition = obj.rowposition;

		if (this._is_down_act && !this._isDownActionKeyMouse()) {
			this._is_down_act = false;
		}

		this._exprcache = {
		};
		this._clearAllStyleCache();
		this._initTreeStates();

		var _reason = e.reason;
		if (_reason == 0 || _reason == 1 || _reason == 3 || _reason == 2) {
			if (this._async_create == true) {
				this._recreate_contents_all_async(true, true, true);
			}
			else {
				this._recreate_contents_all(true, true, true);
			}
		}
	};

	_pGrid.on_dsnotify_onrowsetchanged = function (obj, e) {
		var dataset = this._binddataset;
		var bchange_rowcnt = (this._rowcount != dataset.rowcount);
		var prev_rowcnt = this._rowcount;
		this.rowcount = this._rowcount = dataset.rowcount;

		var updaterow_pos = false;
		if (this._rowposition != dataset.rowposition) {
			updaterow_pos = true;
		}

		if (this._is_down_act && !this._isDownActionKeyMouse()) {
			this._is_down_act = false;
		}

		this._rowposition = dataset.rowposition;
		if (this._curFormat) {
			var cells = this._curFormat._bodycells;
			var lastrow = this._rowcount - 1;
			var kind;

			switch (e.reason) {
				case 10:
					kind = "assign";
					break;
				case 11:
					kind = "copydata";
					break;
				case 12:
					if (e.row == -1) {
						kind = "appenddata";
					}
					else if (e.row == lastrow) {
						kind = "addrow";
					}
					else if (e.row < lastrow) {
						kind = "insertrow";
					}
					break;
				case 20:
					if (e.row == -1) {
						kind = "deletemultirows";
					}
					else {
						kind = "deleterow";
					}
					break;
				case 22:
					kind = "deleteall";
					break;
				case 23:
					kind = "cleardata";
					break;
				case 30:
					kind = "keystring";
					break;
				case 31:
					if (e.row == -1) {
						kind = "filter";
					}
					else {
						kind = "filterrow";
					}
					break;
				case 32:
					kind = "moverow";
					break;
				case 33:
					kind = "exchangerow";
					break;
				case 34:
					kind = "addcolumn";
					break;
				case 41:
					kind = "enableevent";
					break;
				case 40:
					kind = "rowtype";
					break;
				default:
					break;
			}

			if (kind == "copydata" || kind == "addcolumn" || kind == "assign") {
				this._exprcache = {
				};
				this._resetSelect(this._rowposition);
			}
			else if (kind == "enableevent" || kind == "appenddata") {
				this._exprcache = {
				};
			}
			else if (kind == "deleterow" || kind == "filterrow") {
				this._delSelectpos(-1, e.row, true);

				if (cells && this._isMultiSelect() == false && this._isAreaSelect() == false) {
					if (this._isSelectRowType()) {
						for (var i = 0; i < cells.length; i++) {
							this._addSelectpos(i, this._rowposition);
						}
					}
					else {
						this._addSelectpos(0, this._rowposition);
					}
				}

				this._resetSelectStartEndRow();
				this._updateTreeStates(e.row, false);
			}
			else if (kind == "deletemultirows") {
				var rows = obj._deleteRows;
				this._delSelectpos(-1, rows, true);

				if (cells && this._isMultiSelect() == false && this._isAreaSelect() == false) {
					if (this._isSelectRowType()) {
						for (var i = 0; i < cells.length; i++) {
							this._addSelectpos(i, this._rowposition);
						}
					}
					else {
						this._addSelectpos(0, this._rowposition);
					}
				}

				this._resetSelectStartEndRow();
				for (var i = rows.length - 1; i >= 0; i--) {
					this._updateTreeStates(rows[i], false);
				}
			}
			else if (kind == "deleteall" || kind == "cleardata" || kind == "filter") {
				this._clrMultiSelect();
				this._setSelectedInfo(-1, -1, -1, -1, null);
				this._destroyOverlayElements();
			}
			else if (kind == "copydata") {
				this._setSelectedInfo(null, null, this._rowposition, 0, null);
			}
			else if (kind == "addrow" || kind == "insertrow" || kind == "appendrow") {
				this._updateTreeStates(e.row, true);
			}

			if (this._is_async_recreate) {
				nexacro.OnceCallbackTimer.callonce(this, function () {
					this._afterRowsetChanged(kind, updaterow_pos, e.row, bchange_rowcnt, prev_rowcnt);
					this._is_async_recreate = false;
				}, 10);
			}
			else {
				this._afterRowsetChanged(kind, updaterow_pos, e.row, bchange_rowcnt, prev_rowcnt);
			}
		}
	};

	_pGrid._afterRowsetChanged = function (kind, updaterow_pos, row, bchange_rowcnt, prev_rowcnt) {
		if (!this.enableredraw) {
			this._enable_redraw_history["recreate"] = true;
			return;
		}
		if (this.getElement()) {
			if (kind == "moverow" || kind == "enableevent") {
				this._hideEditor(false, true);
			}
			else {
				this._hideEditor(false, false);
			}

			if (kind == "copydata" || kind == "assign") {
				this._initTreeStates();
				this._recreate_contents_all(true, true, true);
			}
			else if (kind == "addcolumn") {
				this._initTreeStates(true);
				this._recreate_contents_all(true, true, false);
			}
			else if (kind == "keystring") {
				this._initTreeStates();
				this._recreate_contents_all(true, true, false, true);
				this._resetSelect(this._rowposition, this._selectinfo.curcell, this._selectinfo.curcol, this._selectinfo.cursubrow, this._selectinfo.curpvt);
			}
			else if (kind == "enableevent") {
				this._initTreeStates(true);

				if (bchange_rowcnt || this.autosizingtype != "none") {
					this._recreate_contents_all(true, true, false);
				}
				else {
					if (this._hasTree) {
						this._bodyBand._matrix._adjustRowsDisplay(true);
						this._bodyBand._matrix._adjustColsDisplay();
						this._bodyBand._on_refresh_rows();
					}
					this._refreshAll();
				}

				if (updaterow_pos == false) {
					this._select_noscroll = true;
				}

				this._resetSelect(this._rowposition, this._selectinfo.curcell, this._selectinfo.curcol, this._selectinfo.cursubrow, this._selectinfo.curpvt);
				this._select_noscroll = false;

				if (!this._is_created) {
					this._create_selection = {
						cell : this._selectinfo.curcell, 
						col : this._selectinfo.curcol, 
						row : this._selectinfo.curdsrow, 
						subrow : this._selectinfo.cursubrow, 
						pvt : this._selectinfo.curpvt
					};
				}
			}
			else if (kind == "addrow" || kind == "appenddata" || kind == "deleterow" || kind == "filterrow" || kind == "insertrow" || kind == "deletemultirows" || kind == "filter") {
				var body = this._bodyBand;
				var lastrow = this._getDataRow(this._endrowpos);
				var toppos = body._matrix._getBodyRowTopPos(lastrow + 1) - this._getScrollTop();
				var rect = this._getAvailableRect(body);
				var chk_srow;

				if (kind == "addrow" || kind == "appenddata") {
					chk_srow = prev_rowcnt;
				}

				if (toppos >= rect.height && lastrow < row) {
					if (this._isUserChangeHeadRowSize || this._isUserChangeBodyRowSize || this._isUserChangeSummRowSize) {
						this._recreate_contents_all(true, true, false, true, undefined, chk_srow);
					}
					else {
						this._resetRowSizeList(chk_srow);
						this._resetColSizeList(chk_srow);
						this._resetScrollMax();
					}
				}
				else {
					if (kind == "insertrow") {
						if (this.autosizingtype != "none" || this._hasTree) {
							this._recreate_contents_all(true, true, false, true, undefined, chk_srow);
						}
						else {
							this._updateBodyClient(kind, row, chk_srow);
						}
					}
					else {
						if (this._hasTree) {
							this._initTreeStates();
							this._recreate_contents_all(true, true, false, true, undefined, chk_srow);
						}
						else if (this.autosizingtype == "col" || this.autosizingtype == "both") {
							this._recreate_contents_all(true, true, false, undefined, undefined, chk_srow);
						}
						else {
							this._updateBodyClient(kind, row, chk_srow);
							if (this._isUseBindExprStyle("head") || this._getUseBindExprProp("head")) {
								this._refreshHead(true);
							}
							if (this._isUseBindExprStyle("summ") || this._getUseBindExprProp("summ")) {
								this._refreshSumm(true);
							}
						}
					}
				}
			}
			else if (kind == "exchangerow" || kind == "moverow") {
				if (this.autosizingtype != "none" || this._hasTree) {
					this._initTreeStates();
					this._recreate_contents_all(true, false, false, true);
				}
				else {
					this._refreshBody();
				}
			}
			else if (kind == "rowtype") {
				this._refreshAll();
			}
			else {
				this._initTreeStates();
				this._recreate_contents_all(true, true, false);
			}
			this._moveCellAfterFocus();
		}
	};

	_pGrid._getDisplayRowCount = function () {
		var band = this._bodyBand;
		if (band) {
			return band._get_rows().length;
		}

		return 0;
	};

	_pGrid._updateBodyClient = function (kind, row, chk_srow) {
		this._resetRowSizeList(chk_srow);
		this._resetColSizeList(chk_srow);

		var band = this._bodyBand;

		this._resetScrollMax();
		this._applyAutofittype(true);

		var beforerowcnt = this._getDisplayRowCount();

		if (kind == "insertrow") {
			band._matrix._adjustRowsDisplay();
			band._matrix._adjustColsDisplay();

			var rows = band._matrix._rows;
			var rows_len = rows.length;

			for (var i = 0; i < rows_len; i++) {
				var datarow = this._getDataRow(rows[i]._rowidx);
				if (row > datarow) {
					continue;
				}

				band._update_rows.push(rows[i]);
			}

			band._on_refresh_rows();
			var disprow = this._dsRowToDispRow(row);
			this._jumpCurrentRow(disprow);
		}
		else {
			var _vpos = (this.vscrollbar) ? this.vscrollbar._pos : 0;
			_vpos -= this._is_over_scroll;

			if (_vpos < 0) {
				_vpos = 0;
			}

			this._toprowpos = this._getScreenTopRowPos(_vpos);
			this._bottomrowpos = this._getScreenBottomRowPos(_vpos);

			if (kind == "deleterow" || kind == "filterrow" || kind == "deletemultirows" || kind == "filter") {
				band._matrix._init();
			}

			band._matrix._adjustRowsDisplay();
			band._matrix._adjustColsDisplay();

			var lastPosition = this._last_scroll_top;

			if (lastPosition != _vpos) {
				band._update_rows = band._matrix._adjustScrollRows(_vpos);
			}

			if (this._is_over_scroll > 0) {
				this.vscrollbar.set_pos(this.vscrollbar.pos - 1);
			}

			band._on_refresh_rows();
		}

		var afterrowcnt = this._getDisplayRowCount();

		this._updateNodata(beforerowcnt, afterrowcnt);
	};

	_pGrid.set_enableredraw = function (v) {
		v = nexacro._toBoolean(v);
		if (this.enableredraw != v) {
			this.enableredraw = v;

			if (v) {
				if (this._curFormat) {
					this._curFormat._updateFormatStr();
				}

				this.on_apply_enableredraw();
			}
		}
		return v;
	};

	_pGrid.on_apply_enableredraw = function () {
		if (this._enable_redraw_history["recreate"]) {
			this.redraw();
			this._enable_redraw_history = {
			};
			return;
		}

		var ds = this._binddataset;
		if (ds && ds.oncolumnchanged && ds.oncolumnchanged._firestat) {
			this._recreate_contents_all(true, true, false);
			this._enable_redraw_history = {
			};
			return;
		}

		if (this._enable_redraw_history["recreate_body"]) {
			if (this._bodyBand) {
				this._bodyBand._recreate_contents();
			}
		}
		else if (this._enable_redraw_history["refresh_body"] && !this._enable_redraw_history["refreshall"]) {
			this._refreshBody(true);
		}

		if (this._enable_redraw_history["recreate_head"]) {
			if (this._headBand) {
				this._headBand._recreate_contents();
			}
		}
		else if (this._enable_redraw_history["refresh_head"] && !this._enable_redraw_history["refreshall"]) {
			this._refreshHead(true);
		}

		if (this._enable_redraw_history["recreate_summ"]) {
			if (this._summBand) {
				this._summBand._recreate_contents();
			}
		}
		else if (this._enable_redraw_history["refresh_summ"] && !this._enable_redraw_history["refreshall"]) {
			this._refreshSumm(true);
		}

		if (this._enable_redraw_history["resize_band"]) {
			this._resizeBand();
		}

		if (this._enable_redraw_history["updatecolsize"]) {
			var props = this._enable_redraw_history["updatecolsize"];
			var props_len = props.length;
			var min = props[0];

			for (var i = 1; i < props_len; i++) {
				min = Math.min(props[i], min);
			}
			this._updateColSize(min);
		}

		if (this._enable_redraw_history["updaterowsize"]) {
			var props = this._enable_redraw_history["updaterowsize"];
			var props_len = props.length;

			for (var i = 0; i < props_len; i++) {
				this._updateRowSize(props[i][0], props[i][1], (i < props_len - 1));
			}
		}

		if (this._enable_redraw_history["autofit"]) {
			var prop = this._enable_redraw_history["autofit"];
			this._applyAutofittype(prop[0], prop[1]);
		}

		if (this._enable_redraw_history["refreshall"]) {
			this._refreshAll(true);
		}
		else {
			nexacro.Component.prototype.on_apply_enableredraw.call(this);
		}

		this._enable_redraw_history = {
		};
	};

	_pGrid._isSelectedCell = function (cell, datarow) {
		var selects = this._selectinfo.getSelectCells(datarow);

		if (!this._isSelectRowType()) {
			if (selects && selects[cell]) {
				return true;
			}
		}
		else {
			if (selects) {
				return true;
			}
		}
		return false;
	};

	_pGrid.isSelectedCell = function (nCell, strBand, nRowIdx, nPivotIdx) {
		if (strBand) {
			strBand = strBand.toLowerCase();
		}

		if (arguments.length == 0) {
			return false;
		}
		else if (arguments.length == 1) {
			strBand = "body";
			nRowIdx = 0;
			nPivotIdx = 0;
		}
		else if (arguments.length == 2) {
			if (strBand == "body") {
				nRowIdx = 0;
			}
			else if (strBand.indexOf("summ") >= 0) {
				nRowIdx = -2;
			}
			else {
				nRowIdx = -1;
			}

			nPivotIdx = 0;
		}
		else if (arguments.length == 3) {
			if (strBand.indexOf("summ") >= 0) {
				nRowIdx = -2;
			}
			else if (strBand == "head") {
				nRowIdx = -1;
			}

			nPivotIdx = 0;
		}

		return this._isSelectedCell(nCell, nRowIdx);
	};

	_pGrid._getSelect = function (datarow) {
		var band;

		if (datarow == -2) {
			band = "summ";
		}
		else if (datarow == -1) {
			band = "head";
		}
		else {
			band = "body";
		}

		return this.isSelectedCell(0, band, datarow);
	};

	_pGrid.getSelectedRows = function () {
		var selects = [].concat(this._selectinfo.rows);
		var retn = [];

		for (var i = 0; i < selects.length; i++) {
			retn[i] = this._getTreeRowPosition(selects[i]);
		}

		return retn;
	};

	_pGrid.getSelectedDatasetRows = function () {
		var retn = [].concat(this._selectinfo.rows);

		for (var i = 0; i < retn.length; i++) {
			if (retn[i] < 0) {
				retn.splice(i, 1);
				i--;
			}
		}

		if (retn.length == 0) {
			retn = -9;
		}

		return retn;
	};

	_pGrid.clearSelect = function () {
		this._selectinfo.area = [];
		this._resetSelect(-1, -1, -1, -1, -9);
		return true;
	};

	_pGrid.selectRow = function (nRow, bSelect) {
		if (bSelect == undefined) {
			bSelect = true;
		}

		nRow = this._getDataRow(nRow);
		return this._selectRow(nRow, bSelect);
	};

	_pGrid.selectCell = function (nRow, nCellidx, bSelect) {
		if (bSelect == undefined) {
			bSelect = true;
		}

		return this._selectRow(nRow, bSelect, false, nCellidx);
	};

	_pGrid.selectArea = function (nStartRow, nStartColIdx, nEndRow, nEndColIdx) {
		if (!this._isAreaSelect()) {
			return false;
		}

		var beforeCell = this._selectinfo.curcell;
		var beforeCol = this._selectinfo.curcol;
		var beforeRow = this._selectinfo.curdsrow;
		var beforeSubrow = this._selectinfo.cursubrow;
		var beforePvt = this._selectinfo.curpvt;

		if (nStartRow > nEndRow) {
			var s = nStartRow;
			nStartRow = nEndRow;
			nEndRow = s;
		}

		if (nStartColIdx > nEndColIdx) {
			var s = nStartColIdx;
			nStartColIdx = nEndColIdx;
			nEndColIdx = s;
		}

		var format = this._curFormat;
		var endsubrow = format._bodyrows.length - 1;
		var s_band = "body", e_band = "body";

		if (nStartRow == -1) {
			s_band = "head";
		}
		else if (nStartRow == -2) {
			s_band = "summ";
		}

		if (nEndRow == -1) {
			endsubrow = format._headrows.length - 1;
			e_band = "head";
		}
		else if (nEndRow == -2) {
			endsubrow = format._summrows.length - 1;
			e_band = "summ";
		}

		function getBegEnd (cells, nStartColIdx, nEndColIdx, is_start) {
			var begc, endc;
			if (is_start) {
				for (var i = 0; i < cells.length; i++) {
					if (cells[i]._col == nStartColIdx) {
						begc = i;
						break;
					}
				}
				return begc;
			}
			else {
				for (var i = cells.length - 1; i >= 0; i--) {
					if (cells[i]._col <= nEndColIdx && nEndColIdx <= (cells[i]._col + cells[i]._colspan)) {
						endc = i;
						break;
					}
				}
				return endc;
			}
		}

		var afterCell, afterCol, afterRow, afterSubrow, afterPvt, begendcell;

		if (s_band == "summ") {
			begendcell = getBegEnd(format._summcells, nStartColIdx, nEndColIdx, true);
		}
		else if (s_band == "head") {
			begendcell = getBegEnd(format._headcells, nStartColIdx, nEndColIdx, true);
		}
		else {
			begendcell = getBegEnd(format._bodycells, nStartColIdx, nEndColIdx, true);
		}

		this._setSelectedInfo(begendcell, nStartColIdx, nStartRow, 0, null);
		afterCell = begendcell;
		afterCol = nStartColIdx;
		afterRow = nStartRow;
		afterSubrow = 0;
		afterPvt = this._selectinfo.curpvt;

		if (this._isMultiSelect()) {
			this._multiselect = "ctrl";
		}
		else {
			this._clrMultiSelect();
			this._multiselect = "none";
		}
		this._ChangeSelect(afterCell, afterCol, afterRow, afterSubrow, afterPvt, false, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, s_band, "func_area1");

		if (e_band == "summ") {
			begendcell = getBegEnd(format._summcells, nStartColIdx, nEndColIdx, false);
		}
		else if (e_band == "head") {
			begendcell = getBegEnd(format._headcells, nStartColIdx, nEndColIdx, false);
		}
		else {
			begendcell = getBegEnd(format._bodycells, nStartColIdx, nEndColIdx, false);
		}

		this._setSelectedInfo(begendcell, nEndColIdx, nEndRow, endsubrow, null);
		afterCell = begendcell;
		afterCol = nEndColIdx;
		afterRow = nEndRow;
		afterSubrow = endsubrow;
		afterPvt = this._selectinfo.curpvt;

		this._multiselect = "shift";
		retn = this._ChangeSelect(afterCell, afterCol, afterRow, afterSubrow, afterPvt, false, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, e_band, "func_area2");

		return retn;
	};

	_pGrid._selectRow = function (row, bSelect, noDraw, cell, bDataset) {
		var beforeCell = this._selectinfo.curcell;
		var beforeCol = this._selectinfo.curcol;
		var beforeRow = this._selectinfo.curdsrow;
		var beforeSubrow = this._selectinfo.cursubrow;
		var beforePvt = this._selectinfo.curpvt;
		var band = "body";

		if (row == -1) {
			band = "head";
		}
		else if (row == -2) {
			band = "summ";
		}

		this._setSelectedInfo(null, null, row, 0, null);

		if (band != "body" && cell == undefined) {
			cell = 0;
		}

		if (cell != undefined) {
			this._setSelectedInfo(cell, null, null, null, null);
		}

		var retn = false;

		if (!bDataset) {
			bDataset = false;
		}

		var afterCell = (this._selectinfo.curcell < 0) ? 0 : this._selectinfo.curcell;
		var afterCol = (this._selectinfo.curcol < 0) ? 0 : this._selectinfo.curcol;
		var afterRow = row;
		var afterSubrow = (this._selectinfo.cursubrow < 0) ? 0 : this._selectinfo.cursubrow;
		var afterPvt = this._selectinfo.curpvt;

		if (this._isMultiSelect()) {
			if (bSelect != this._getSelect(afterRow)) {
				this._multiselect = "ctrl";
				retn = this._ChangeSelect(afterCell, afterCol, afterRow, afterSubrow, afterPvt, bDataset, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, band, "func_selectrow");
			}
		}
		else {
			this._clrMultiSelect();

			if (bSelect == true) {
				retn = this._ChangeSelect(afterCell, afterCol, afterRow, afterSubrow, afterPvt, false, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, band, "func_selectrow");
			}
		}

		if (!noDraw) {
			this._refreshBody();

			if (band == "head") {
				this._refreshHead();
			}
			else if (band == "summ") {
				this._refreshSumm();
			}
		}

		return retn;
	};

	_pGrid._on_killfocus = function (new_focus, new_ref_focus) {
		if (!this._is_alive) {
			return;
		}

		if (this._binddataset && this._binddataset.cancolumnchange && this._binddataset.cancolumnchange._firestat) {
			this._hideEditor(undefined, true, true);
		}
		else {
			this._hideEditor(undefined, undefined, true);
		}

		this._focusSelectorPoint(false);

		if (nexacro._enableaccessibility) {
			this._accept_arrow = false;
			this._acceptstab = false;
		}
		this._is_async_recreate = false;
	};

	_pGrid._focusSelectorPoint = function (v) {
		if (this._isAreaSelect()) {
			if (this._select_ctrl) {
				this._select_ctrl._trackbar[0].set_visible(v);
				this._select_ctrl._trackbar[1].set_visible(v);
				this._select_ctrl._trackbar[2].set_visible(v);
				this._select_ctrl._trackbar[3].set_visible(v);
			}
		}
	};

	_pGrid._on_focus = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus) {
		this._acceptstab = true;

		if (this._showEditorFocus) {
			return;
		}

		var retn = false;



		if (!self_flag) {
			this._focusSelectorPoint(true);
		}

		if (evt_name == "tabkey" || evt_name == "shifttabkey") {
			retn = nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);

			if (this._bodyBand && (self_flag == false || nexacro._enableaccessibility)) {
				var rows = this._bodyBand._get_rows();

				if (rows.length > 0) {
					if (rows[0]._cells && rows[0]._cells.length > 0) {
						var editcell = null;
						this._showEditorFocus = true;

						if (evt_name == "shifttabkey") {
							editcell = this._getLastEditableCell();
							if (editcell.row !== null) {
								if (this.vscrollbar && this.vscrollbar.visible) {
									this.vscrollbar.set_pos(this.vscrollbar.max);
								}

								retn = this._moveToPosCell(editcell.row, editcell.cell);
							}
						}
						else {
							editcell = this._getFirstEditableCell();

							if (editcell.row !== null) {
								if (this.vscrollbar && this.vscrollbar.visible) {
									this.vscrollbar.set_pos(0);
								}

								retn = this._moveToPosCell(editcell.row, editcell.cell);
							}
						}
						if (nexacro._enableaccessibility && editcell.row !== null) {
							this._currentBand = "body";
							var cellobj = this._getAccessibilityCurrentCell();
							if (cellobj) {
								if (evt_name == "tabkey") {
									this._first_focus = true;
									this._is_first_bodycell = true;
								}
								this._moveToPosAccessibilityCell(this.currentrow, this.currentcell);
							}
						}
						this._showEditorFocus = false;
					}
				}
			}
		}
		else {
			retn = nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);

			if (nexacro._enableaccessibility) {
				this._accept_arrow = true;
				this._acceptstab = true;
				retn = false;
				if (nexacro._accessibilitytype == 4 && evt_name === undefined) {
					this._currentBand = "grid";
					this._moveToAccessibilityCell("next");
				}
			}
			else {
				if (self_flag == false) {
					if (evt_name == "lbuttondown" && refer_new_focus && refer_new_focus._type_name == "GridCell") {
						;
					}
					else if (this.autoenter == "select") {
						this._showEditorFocus = true;
						this._showEditor(false);
						this._showEditorFocus = false;
					}
				}
			}
		}
		if (nexacro._enableaccessibility) {
			this._first_focus = false;
		}
		return retn;
	};

	_pGrid.on_fire_ontextchange = function (obj, chartext, pretext, posttext, preimetext, postimetext) {
		var cell = this._selectinfo.curcell;
		var col = this._selectinfo.curcol;
		var pivotindex = this._selectinfo.curpvt;
		var row = this._selectinfo.curdsrow;
		var subrow = this._selectinfo.cursubrow;

		if (this.ontextchange && this.ontextchange._has_handlers) {
			var evt = new nexacro.GridTextChangeEventInfo(this, "ontextchange", cell, chartext, col, pivotindex, postimetext, posttext, preimetext, pretext, row, subrow);
			return this.ontextchange._fireCheckEvent(this, evt);
		}
		return true;
	};

	_pGrid.on_fire_ontextchanged = function (obj, pretext, posttext) {
		var cell = this._selectinfo.curcell;
		var col = this._selectinfo.curcol;
		var pivotindex = this._selectinfo.curpvt;
		var row = this._selectinfo.curdsrow;
		var subrow = this._selectinfo.cursubrow;

		if (this.ontextchanged && this.ontextchanged._has_handlers) {
			var evt = new nexacro.GridTextChangedEventInfo(this, "ontextchanged", cell, col, pivotindex, posttext, pretext, row, subrow);
			return this.ontextchanged._fireEvent(this, evt);
		}
		return true;
	};

	_pGrid.on_fire_cantreestatuschange = function (row, realrow, reason) {
		var cell = this._selectinfo.curcell;

		if (this.cantreestatuschange && this.cantreestatuschange._has_handlers) {
			var evt = new nexacro.GridTreeStatusEventInfo(this, "cantreestatuschange", cell, realrow, row, reason);
			return this.cantreestatuschange._fireEvent(this, evt);
		}
		return true;
	};

	_pGrid.on_fire_ontreestatuschanged = function (row, realrow, reason) {
		var cell = this._selectinfo.curcell;

		if (this.ontreestatuschanged && this.ontreestatuschanged._has_handlers) {
			var evt = new nexacro.GridTreeStatusEventInfo(this, "ontreestatuschanged", cell, realrow, row, reason);
			return this.ontreestatuschanged._fireEvent(this, evt);
		}
		return true;
	};

	_pGrid.on_fire_oncloseup = function (obj, pretext, posttext, prevalue, postvalue) {
		if (this.oncloseup && this.oncloseup._has_handlers) {
			var cell = this._selectinfo.curcell;
			var col = this._selectinfo.curcol;
			var pivotindex = this._selectinfo.curpvt;
			var row = this._selectinfo.curdsrow;
			var subrow = this._selectinfo.cursubrow;
			var value = this._evtvalue(obj, postvalue);

			var evt = new nexacro.GridEditEventInfo(this, "oncloseup", cell, col, pivotindex, row, subrow, value);
			return this.oncloseup._fireEvent(this, evt);
		}
		return true;
	};

	_pGrid.on_fire_ondropdown = function (obj) {
		if (this.ondropdown && this.ondropdown._has_handlers) {
			var cell = this._selectinfo.curcell;
			var col = this._selectinfo.curcol;
			var pivotindex = this._selectinfo.curpvt;
			var row = this._selectinfo.curdsrow;
			var subrow = this._selectinfo.cursubrow;
			var value = this._evtvalue(obj);

			var evt = new nexacro.GridEditEventInfo(this, "ondropdown", cell, col, pivotindex, row, subrow, value);
			return this.ondropdown._fireEvent(this, evt);
		}
		return true;
	};

	_pGrid.on_fire_onenterdown = function (keyCode, altKey, ctrlKey, shiftKey, obj, refer_comp, postvalue) {
		if (this.onenterdown && this.onenterdown._has_handlers) {
			var cell = this._selectinfo.curcell;
			var col = this._selectinfo.curcol;
			var pivotindex = this._selectinfo.curpvt;
			var row = this._selectinfo.curdsrow;
			var subrow = this._selectinfo.cursubrow;
			var value = this._evtvalue(refer_comp, postvalue);

			var evt = new nexacro.GridEditEventInfo(this, "onenterdown", cell, col, pivotindex, row, subrow, value);
			return this.onenterdown._fireEvent(this, evt);
		}
		return true;
	};

	_pGrid.on_fire_onexpanddown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		var cellobj = from_comp;
		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj && cellobj._type_name == "GridCell") {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;
		if (this.onexpanddown && this.onexpanddown._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);

			var obj = this._getRootComponent(from_refer_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.GridMouseEventInfo(obj, "onexpanddown", cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
			return this.onexpanddown._fireEvent(this, evt);
		}
		return false;
	};

	_pGrid.on_fire_onexpandup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		var cellobj = from_comp;
		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj && cellobj._type_name == "GridCell") {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		if (this.onexpandup && this.onexpandup._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);

			var obj = this._getRootComponent(from_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;
			var evt = new nexacro.GridMouseEventInfo(obj, "onexpandup", cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
			return this.onexpandup._fireEvent(this, evt);
		}
		return false;
	};

	_pGrid.on_fire_oncolresized = function (args) {
		if (this.oncolresized && this.oncolresized._has_handlers) {
			var formatindex = args[0];
			var index = args[1];
			var newvalue = args[2];
			var oldvalue = args[3];
			var subindex = args[4];
			var evt = new nexacro.GridSizeChangedEventInfo("oncolresized", formatindex, index, newvalue, oldvalue, 1, subindex);
			return this.oncolresized._fireEvent(this, evt);
		}
		return false;
	};

	_pGrid.on_fire_onrowresized = function (args) {
		if (this.onrowresized && this.onrowresized._has_handlers) {
			var formatindex = args[0];
			var index = args[1];
			var newvalue = args[2];
			var oldvalue = args[3];
			var subindex = args[4];
			var evt = new nexacro.GridSizeChangedEventInfo("onrowresized", formatindex, index, newvalue, oldvalue, 2, subindex);
			return this.onrowresized._fireEvent(this, evt);
		}
		return false;
	};

	_pGrid._clearAllStyleCache = function () {
		var format = this._curFormat;
		if (format) {
			format._clearCellStyleCache("head");
			format._clearCellStyleCache("body");
			format._clearCellStyleCache("summ");
		}
	};

	_pGrid._createVScrollBar = function (scroll_size) {
		var vscrollbar = new nexacro.GridScrollBarCtrl("vscrollbar", "absolute", 0, 0, scroll_size, this._client_width, null, null, this);
		vscrollbar._setDirection("vert");
		vscrollbar._setEventHandler("onscroll", this.on_vscroll, this);
		vscrollbar.on_update_style_scrollbarsize();
		return vscrollbar;
	};

	_pGrid._is_recreating = false;
	_pGrid._recreate = function () {
		if (!this.enableredraw) {
			this._enable_redraw_history["recreate"] = true;
			return true;
		}

		if (!this.getElement()) {
			return false;
		}

		var down_act = this._isDownActionKeyMouse() || this._is_down_act;
		if (down_act && !this._userRowposChange && !this._is_after_recreate) {
			this._after_recreate = true;
			return;
		}

		this._is_recreating = true;
		var vpos = (this.vscrollbar) ? this.vscrollbar._pos : 0;
		var hpos = (this.hscrollbar) ? this.hscrollbar._pos : 0;

		this._destroyBands();
		this._createBandsAndAreas();
		this._refreshBody();
		this._onResetScrollBar();
		this._recreate_contents_proc = [];

		if (this.vscrollbar) {
			this.vscrollbar._set_pixelpos(0);
			this.vscrollbar._set_pixelpos(vpos);
		}

		if (this.hscrollbar) {
			this.hscrollbar.set_pos(0);
			this.hscrollbar.set_pos(hpos);
		}

		this._is_recreating = false;

		return true;
	};

	_pGrid.createcellasync = false;
	_pGrid.set_createcellasync = function (v) {
		v = nexacro._toBoolean(v);
		this.createcellasync = v;

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
			this._async_create = v;
		}
		else {
			this._async_create = false;
		}
	};

	_pGrid._recreate_contents_all_async = function (reset_colarea, reset_size, init_scroll, only_body, no_hide_edit) {
		nexacro.OnceCallbackTimer.callonce(this, function () {
			return this._recreate_contents_all(reset_colarea, reset_size, init_scroll, only_body, no_hide_edit);
		});
	};

	_pGrid._isDownActionKeyMouse = function () {
		var window = this._getWindow();

		if (window && (window._cur_ldown_elem || window._keydown_element)) {
			var elem = window._cur_ldown_elem || window._keydown_element, comp = window.findComponent(elem, 0, 0)[0], isgrid = false;

			while (comp) {
				if (comp instanceof nexacro.ScrollBarCtrl) {
					break;
				}

				if (comp._type_name == "Grid" && comp == this && comp.id == this.id) {
					isgrid = true;
					break;
				}
				comp = comp.parent;
			}
			return isgrid;
		}
		return false;
	};

	_pGrid._recreate_contents_all = function (reset_colarea, reset_size, init_scroll, only_body, no_hide_edit, chk_srow) {
		if (!this.enableredraw) {
			this._enable_redraw_history["recreate"] = true;
			return;
		}

		var down_act = this._isDownActionKeyMouse() || this._is_down_act;
		if (down_act && !this._userRowposChange && !this._is_after_recreate) {
			var args = [reset_colarea, reset_size, init_scroll, only_body, no_hide_edit];
			if (this._after_recreate_contents_all) {
				args[0] = args[0] || this._after_recreate_contents_all[0];
				args[1] = args[1] || this._after_recreate_contents_all[1];
				args[2] = args[2] || this._after_recreate_contents_all[2];
				args[3] = args[3] && this._after_recreate_contents_all[3];
				args[2] = args[4] || this._after_recreate_contents_all[4];
			}
			this._after_recreate_contents_all = args;
			return;
		}

		var beforerowcnt = this._getDisplayRowCount();

		if (reset_size) {
			this._resetRowSizeList(chk_srow);
			this._resetColSizeList(chk_srow);
			this._resizeBand();

			if (this._bodyBand) {
				this._bodyBand._recreate_contents(reset_colarea, init_scroll, false, no_hide_edit);
				this._bodyBand._matrix._adjustColsDisplay(true);
			}

			if (!only_body) {
				if (this._headBand) {
					this._headBand._recreate_contents(reset_colarea);
					this._headBand._matrix._adjustColsDisplay(true);
				}

				if (this._summBand) {
					this._summBand._recreate_contents(reset_colarea);
					this._summBand._matrix._adjustColsDisplay(true);
				}
			}
		}
		else {
			if (this._bodyBand) {
				this._bodyBand._recreate_contents(reset_colarea, init_scroll, false, no_hide_edit);
			}

			if (!only_body) {
				if (this._headBand) {
					this._headBand._recreate_contents(reset_colarea);
				}

				if (this._summBand) {
					this._summBand._recreate_contents(reset_colarea);
				}
			}
		}

		var afterrowcnt = this._getDisplayRowCount();

		this._updateNodata(beforerowcnt, afterrowcnt);

		this._updateSelector();
		this._adjustOverlayElements(true, this._is_use_fakemerge);
	};

	_pGrid._updateNodata = function (beforerowcnt, afterrowcnt) {
		if ((beforerowcnt == 0 && afterrowcnt > 0) || (beforerowcnt > 0 && afterrowcnt == 0)) {
			var band = this._bodyBand;

			if (band) {
				band._updateAll(true);
			}
			else {
				this._control_pseudo = "";
				this._contents_pseudo = "";
				this._stat_change();
			}
		}
	};

	_pGrid._getRowSize = function (rowidx) {
		var format = this._curFormat;

		if (rowidx == -1) {
			if (this._rowHeadList.length > 0) {
				return this._rowHeadList[0];
			}
			else {
				return format.headHeight;
			}
		}
		else if (rowidx == -2) {
			if (this._rowSummList.length > 0) {
				return this._rowSummList[0];
			}
			else {
				return format.summHeight;
			}
		}
		else {
			var datarow = this._getDataRow(rowidx);

			if (datarow >= 0) {
				if (this._rowSizeList.length > 0) {
					return this._rowSizeList[datarow];
				}
				else {
					return format._body_height;
				}
			}
		}
		return -1;
	};
	_pGrid._getHeadHeight = function () {
		var format = this._curFormat;
		if (format == null || format._headband == null) {
			return 0;
		}

		var height = this._rowHeadList[0];

		if (height == undefined) {
			height = format.headHeight;
		}

		return height;
	};

	_pGrid._getSummHeight = function () {
		var format = this._curFormat;
		if (format == null || format._summband == null) {
			return 0;
		}

		var height = this._rowSummList[0];

		if (height == undefined) {
			height = format.summHeight;
		}

		return height;
	};

	_pGrid._createBandsAndAreas = function () {
		if (!this.enableredraw) {
			this._enable_redraw_history["recreate"] = true;
			return;
		}

		var format = this._curFormat;
		if (format == null) {
			return;
		}

		this._clearAllStyleCache();
		this._applyAutofittype(false);

		var cells = this._curFormat._bodycells;
		var cellcnt = cells ? cells.length : 0;
		var cellinfo;

		for (var j = 0; j < cellcnt; j++) {
			cellinfo = cells[j];
			if (cellinfo.suppress != 0) {
				this._is_use_suppress = true;
			}
			if (cellinfo.wordwrap != "none") {
				this._is_body_wordwrap = true;
			}
		}

		cells = this._curFormat._headcells;
		cellcnt = cells ? cells.length : 0;

		for (var j = 0; j < cellcnt; j++) {
			cellinfo = cells[j];
			if (cellinfo.wordwrap != "none") {
				this._is_head_wordwrap = true;
				break;
			}
		}

		cells = this._curFormat._summcells;
		cellcnt = cells ? cells.length : 0;

		for (var j = 0; j < cellcnt; j++) {
			cellinfo = cells[j];
			if (cellinfo.wordwrap != "none") {
				this._is_summ_wordwrap = true;
				break;
			}
		}

		var rect = this._getAvailableRect(this);
		var clientwidth = rect.width;
		var clientheight = rect.height;
		var control_elem = this.getElement();
		var top, bottom;
		var headHeight = format.headHeight;
		var summHeight = format.summHeight;

		if (this.summarytype == "top" || this.summarytype == "lefttop") {
			top = headHeight + summHeight;
			bottom = clientheight;
		}
		else {
			top = headHeight;
			bottom = clientheight - summHeight;
		}
		if (bottom < top) {
			bottom = top;
		}

		this._bodyBand = new nexacro.GridBand("body", 0, top, clientwidth, bottom - top, this, format._bodyband);
		this.body = format._bodyband;

		var summband, headband;

		if (summHeight > 0) {
			rect = this._getAvailableRect(this);
			clientwidth = rect.width;
			clientheight = rect.height;

			if (this.summarytype == "top" || this.summarytype == "lefttop") {
				top = headHeight;
				bottom = headHeight + summHeight;
			}
			else {
				bottom = clientheight;
				top = bottom - summHeight;
			}
			this._summBand = summband = new nexacro.GridBand("summ", 0, top, clientwidth, bottom - top, this, format._summband);
			this.summ = this.summary = format._summband;
		}
		else {
			this._summBand = null;
		}

		if (headHeight > 0) {
			rect = this._getAvailableRect(this);
			clientwidth = rect.width;
			clientheight = rect.height;
			top = 0;
			bottom = headHeight;
			this._headBand = headband = new nexacro.GridBand("head", 0, top, clientwidth, bottom - top, this, format._headband);
			this.head = format._headband;
		}
		else {
			this._headBand = null;
		}

		this._resetRowSizeList();
		this._resetColSizeList();

		this._bodyBand.createComponent();
		control_elem.setVertScrollElements(this._bodyBand._control_element);

		if (headband) {
			this._headBand.createComponent();
		}

		if (summband) {
			this._summBand.createComponent();
		}

		this._updateSelector();
		this._setHscrollElement();
		this._setScrollMaxSize(this._bodyBand._scrollWidth, this._bodyBand._scrollHeight);

		this._control_element._arrangeBandOrder();
	};

	_pGrid._band_scroll_sizes = null;
	_pGrid._setScrollMaxSize = function (scroll_width, scroll_height, band_scroll_sizes) {
		if (band_scroll_sizes) {
			this._band_scroll_sizes = band_scroll_sizes;
		}

		if (this._control_element) {
			this._control_element._setInnerElementScrollMaxSize(this._band_scroll_sizes);

			if (scroll_height == undefined) {
				scroll_height = this._bodyBand._scrollHeight;
			}

			this._control_element.setElementScrollMaxSize(scroll_width, scroll_height);
			this._updateClientSize(this._control_element);
		}
	};

	_pGrid._resizeBand = function (reset) {
		var clientleft = this._client_left;
		var clienttop = this._client_top;
		var clientwidth = this._client_width;
		var clientheight = this._client_height;
		var headHeight = this._getHeadHeight();
		var summHeight = this._getSummHeight();
		var l, t, w, h;

		l = clientleft;
		w = clientwidth;

		if (this._bodyBand) {
			if (this.summarytype == "top" || this.summarytype == "lefttop") {
				t = headHeight + summHeight;
				h = clientheight - t;
			}
			else {
				t = headHeight;
				h = clientheight - summHeight - t;
			}
			if (h < 0) {
				h = 0;
			}

			this._bodyBand.move(l, t, w, h);
		}

		clientheight = this._client_height;

		if (this._summBand) {
			if (this.summarytype == "top" || this.summarytype == "lefttop") {
				t = headHeight;
				h = headHeight + summHeight - t;
			}
			else {
				t = clientheight - summHeight;
				h = clientheight - t;
			}
			this._summBand.move(l, t, w, h);
		}

		clientheight = this._client_height;

		if (this._headBand) {
			t = clienttop;
			h = headHeight;

			this._headBand.move(l, t, w, h);
		}

		if (!reset && (this._colautofit || this._rowautofit)) {
			this._applyAutofittype(true);
		}

		this._MoveEditComp();
		this._updateSelector();
		this._updateScrollInfo();
	};

	_pGrid._onResetScrollBar = function () {
		if (this._scrollbars == 1 || this._scrollbars == 4) {
			if (this._rowautofit) {
				this._scrollbars = 0;
			}
		}
		else if (this._scrollbars == 2 || this._scrollbars == 8) {
			if (this._colautofit) {
				this._scrollbars = 0;
			}
		}
		else if (this._scrollbars == 3) {
			if (this._colautofit && this._rowautofit) {
				this._scrollbars = 0;
			}
			if (this._colautofit) {
				this._scrollbars = 1;
			}
			if (this._rowautofit) {
				this._scrollbars = 2;
			}
		}
		else if (this._scrollbars == 16) {
			if (this._rowautofit) {
				this._scrollbars = 2;
			}
		}
		else if (this._scrollbars == 32) {
			if (this._colautofit) {
				this._scrollbars = 1;
			}
		}
		return nexacro.Component.prototype._onResetScrollBar.call(this);
	};

	_pGrid._setHscrollElement = function () {
		if (!this._control_element) {
			return;
		}

		var horz_control_elems = [];

		if (this._bodyBand) {
			var rows = this._bodyBand._get_rows();

			for (var i = 0; i < rows.length; i++) {
				horz_control_elems.push(rows[i]._control_element);
			}
		}
		if (this._headBand) {
			var rows = this._headBand._matrix._rows;

			for (var i = 0; i < rows.length; i++) {
				horz_control_elems.push(rows[i]._control_element);
			}
		}
		if (this._summBand) {
			var rows = this._summBand._matrix._rows;

			for (var i = 0; i < rows.length; i++) {
				horz_control_elems.push(rows[i]._control_element);
			}
		}

		if (horz_control_elems.length == 0) {
			horz_control_elems = null;
		}

		this._control_element.setHorzScrollElements(horz_control_elems);
	};

	_pGrid._resetScrollMax = function () {
		var format = this._curFormat;

		if (!format) {
			return;
		}

		var body = this._bodyBand;

		if (!body) {
			return;
		}

		var rowcnt = this._getGridRowCount();
		var rect = this._getAvailableRect(body);
		var client_width = rect.width - format.leftWidth - format.rightWidth;
		var client_height = rect.height;
		var scrollwidth = format.bodyWidth;
		var treeIndexes = this._treeIndexes;
		var rowSizes = this._rowSizeList;
		var datarow;
		var rowsPageInfo = [];
		var limit = 0;
		var band_scroll_tops = [];
		var band_sizes_cnt = 1;
		var band_scroll_max = 1500000;

		var scrollheight = 0;
		for (var i = 0; i < rowcnt; i++) {
			datarow = this._getDataRow(i);
			scrollheight += rowSizes[datarow];

			if (scrollheight - this._fixedrow_height >= band_scroll_max * band_sizes_cnt) {
				band_scroll_tops.push(scrollheight - rowSizes[datarow]);
				band_sizes_cnt++;
			}
		}

		scrollheight -= this._fixedrow_height;
		band_scroll_tops.push(scrollheight);

		body._scrollHeight = scrollheight;
		body._scrollWidth = scrollwidth;

		this._setScrollMaxSize(body._scrollWidth, body._scrollHeight, band_scroll_tops);
	};

	_pGrid._setContents = function (str) {
		var contentsElem = nexacro._parseXMLDocument(str);
		var formatElems = contentsElem.getElementsByTagName("Format");
		var len = formatElems.length;
		var firstformat = "";

		this._format_str = [];
		this._autofitcol_rate = [];

		for (var i = 0; i < len; i++) {
			var formatElem = formatElems[i];
			var idstr = formatElem.getAttribute("id");
			if (idstr == null || idstr == "") {
				idstr = "default";
			}

			if (firstformat == "" || idstr == "default") {
				firstformat = idstr;
			}

			var format = new nexacro.GridFormat(idstr, this);
			format._loadFromDOM(formatElem);
			this._formats[idstr] = format;
			this._format_str.push(idstr);
		}
		this.formats = str;

		if (this.formatid == "" || this.formatid != firstformat) {
			this.formatid = firstformat;
		}

		this._curFormat = this._formats[this.formatid];
	};

	_pGrid._destroyBands = function (parent_destory) {
		if (!this.enableredraw) {
			this._enable_redraw_history["recreate"] = true;
			return;
		}

		if (!parent_destory) {
			this._hideEditor(false, true);
		}

		if (this._temphead) {
			this._temphead.destroy();
			this._temphead = null;
		}
		if (this._tempsumm) {
			this._tempsumm.destroy();
			this._tempsumm = null;
		}
		if (this._bodyBand) {
			if (this._control_element) {
				this._control_element.setVertScrollElements(null);
			}

			this._bodyBand.destroy();
			this._bodyBand = null;
			this.body = null;
		}
		if (this._summBand) {
			this._summBand.destroy();
			this._summBand = null;
			this.summary = null;
			this.summ = null;
		}
		if (this._headBand) {
			this._headBand.destroy();
			this._headBand = null;
			this.head = null;
		}
		if (this._select_ctrl) {
			this._select_ctrl.destroy();
			this._select_ctrl = null;
		}
		if (this.controlbutton) {
			this.controlbutton = null;
		}
		if (this.controlcalendar) {
			this.controlcalendar = null;
		}
		if (this.controlcheckbox) {
			this.controlcheckbox = null;
		}
		if (this.controlcombo) {
			this.controlcombo = null;
		}
		if (this.controledit) {
			this.controledit = null;
		}
		if (this.controlmaskedit) {
			this.controlmaskedit = null;
		}
		if (this.controltextarea) {
			this.controltextarea = null;
		}
		if (this.controlprogressbar) {
			this.controlprogressbar = null;
		}
		if (this.controlexpand) {
			this.controlexpand = null;
		}
		this._destroyOverlayElements();
	};

	_pGrid._refreshAll = function (clearCurstyle) {
		this._refreshHead(clearCurstyle);
		this._refreshSumm(clearCurstyle);
		this._refreshBody(clearCurstyle);
	};

	_pGrid._getBodyCellInfo = function (nCellIdx) {
		if (this._curFormat) {
			var cellinfo = this._curFormat._bodycells[nCellIdx];
			if (cellinfo) {
				return cellinfo;
			}
		}

		return null;
	};

	_pGrid._getBodyCellItem = function (nRowIdx, nCellIdx) {
		return (this._bodyBand._get_rows()[nRowIdx]._cells[nCellIdx]);
	};

	_pGrid._refreshBodyCell = function (cell, displayrow, clearCurstyle) {
		if (!this.enableredraw) {
			this._enable_redraw_history["refresh_body"] = true;
			return;
		}

		if (displayrow < 0) {
			return;
		}

		var band = this._bodyBand;
		if (band) {
			var rows = band._get_rows();

			if (rows.length <= displayrow) {
				return;
			}

			var rowidx = rows[displayrow]._rowidx;
			var dsrowidx = (this._hasTree) ? this._treeIndexes[rowidx] : rowidx;
			var selected = this._isSelectedCell(cell, dsrowidx);

			if (rows[displayrow]) {
				var cellobj = rows[displayrow]._cells[cell];
				if (clearCurstyle) {
					if (cellobj) {
						cellobj.currentstyle._empty();
					}
				}

				band._refreshRowCell(displayrow, cell, selected);
			}
		}
	};

	_pGrid._refreshHead = function (clearCurstyle) {
		if (!this.enableredraw) {
			this._enable_redraw_history["refresh_head"] = true;
			return;
		}

		var band = this._headBand;
		if (band) {
			var rowcnt = band._get_rows().length;

			band._updateAll(clearCurstyle);

			for (var i = 0; i < rowcnt; i++) {
				band._refreshRow(i);
			}
		}
		this._applyResizer();
		this._adjustOverlayElements(false, this._is_use_fakemerge);
	};

	_pGrid._refreshSumm = function (clearCurstyle) {
		if (!this.enableredraw) {
			this._enable_redraw_history["refresh_summ"] = true;
			return;
		}

		var band = this._summBand;
		if (band) {
			var rowcnt = band._get_rows().length;

			band._updateAll(clearCurstyle);

			for (var i = 0; i < rowcnt; i++) {
				band._refreshRow(i);
			}
			band._updateAll(clearCurstyle);
		}
		this._adjustOverlayElements(false, this._is_use_fakemerge);
	};

	_pGrid._refreshBody = function (clearCurstyle, for_select, no_overlay, no_update_supp) {
		if (!this.enableredraw) {
			this._enable_redraw_history["refresh_body"] = true;
			return;
		}

		var band = this._bodyBand;
		if (band) {
			if (!no_update_supp) {
				this._suppressUpdate();
			}

			var rowcnt = this._getDispRowCnt();
			var rows = band._get_rows();
			var cellcnt;

			band._updateAll(clearCurstyle);

			for (var i = 0; i < rowcnt; i++) {
				band._refreshRow(i, undefined, for_select);
			}

			if (!no_overlay) {
				this._adjustOverlayElements(false, this._is_use_fakemerge);
			}
		}
	};

	_pGrid._MoveEditComp = function () {
		if (this._showEditing) {
			this._showEditor(true);
		}
	};

	_pGrid._analyzeSuppress = function (exportFlag) {
		var cells = this._curFormat._bodycells;

		if (!cells) {
			return;
		}

		var rowcnt;

		if (exportFlag) {
			rowcnt = this._getGridRowCount();
		}
		else {
			var band = this._bodyBand;
			var rows = band._get_rows();
			rowcnt = rows.length;
		}

		if (rowcnt == 0) {
			return;
		}

		var cellcnt = cells.length;
		var cellinfo;

		for (var j = 0; j < cellcnt; j++) {
			cellinfo = cells[j];

			if (cellinfo.suppress == 0) {
				continue;
			}
			cellinfo._clearSuppressInfo();

			var rowidx, text1, text2, lvl1, lvl2, displayType, psuppinfo, pdatarow, cdatarow, csupp;
			var fixerow = this._fixed_endrow;


			for (var i = 0; i < rowcnt; i++) {
				rowidx = (!exportFlag) ? this.__getBodyCellRowIdxFromIdx(i) : i;
				cdatarow = this._getDataRow(rowidx);
				csupp = cellinfo._getSuppress(cdatarow);

				if (csupp > 0 && i > 0) {
					psuppinfo = cellinfo._getSuppressInfo(i - 1);

					lvl1 = 0;
					lvl2 = 0;

					pdatarow = this._getDataRow(rowidx - 1);
					cdatarow = this._getDataRow(rowidx);

					if (this._hasTree) {
						text1 = cellinfo._getDisplayText(pdatarow);
						lvl1 = cellinfo._getTreeLevel(pdatarow);
						text2 = cellinfo._getDisplayText(cdatarow);
						lvl2 = cellinfo._getTreeLevel(cdatarow);
					}
					else {
						text1 = cellinfo._getDisplayText(pdatarow);
						text2 = cellinfo._getDisplayText(cdatarow);
					}

					if (this._isFakeCell(cdatarow)) {
						continue;
					}

					displayType = cellinfo._getDisplaytype(rowidx);
					if (this._hasTree && displayType == "tree") {
						;
					}
					else {
						if (text1 == text2) {
							psuppinfo.last = false;
						}
						else {
							psuppinfo.last = true;
						}
					}
				}
				else if (csupp < 0 && j > 0) {
				}
			}
		}

		var suppresslevel = this.suppresslevel;
		if (suppresslevel == "sameskip" || suppresslevel == "allcompare") {
			var i = 0;
			function __analyzeSuppress_row_loop2 (grid) {
				if (i < rowcnt) {
					var suppressRow = [];
					var suppressCol = [];
					var cellinfo;

					rowidx = (!exportFlag) ? grid.__getBodyCellRowIdxFromIdx(i) : i;
					cdatarow = grid._getDataRow(rowidx);

					for (var j = 0; j < cellcnt; j++) {
						cellinfo = cells[j];
						csupp = cellinfo._getSuppress(cdatarow);

						if (csupp > 0) {
							suppressRow.push(cellinfo);
						}
						if (csupp < 0) {
						}
					}

					if (suppressRow.length > 0) {
						suppressRow.sort(function (a, b) {
							return a._getSuppress(cdatarow) - b._getSuppress(cdatarow);
						});

						var suppressRowLen = suppressRow.length;

						for (var jj = 0; jj < suppressRowLen; jj++) {
							cellinfo = suppressRow[jj];

							if (cellinfo) {
								for (var k = 0; k < cellcnt; k++) {
									if (k == cellinfo._col) {
										continue;
									}
									grid._compareSuppressCol(i, k, cellinfo._col, suppresslevel, cdatarow);
								}
							}
						}
					}

					if (suppressCol.length > 0) {
						suppressCol.sort(function (a, b) {
							return b._getSuppress(cdatarow) - a._getSuppress(cdatarow);
						});

						var suppressColLen = suppressCol.length;

						for (var jj = 0; jj < suppressColLen; jj++) {
							cellinfo = suppressCol[jj];

							if (cellinfo) {
								for (var k = 0; k < cellcnt; k++) {
									if (k == cellinfo._col) {
										continue;
									}
								}
							}
						}
					}
					i++;
					return false;
				}
				return true;
			}
			for (; true; ) {
				if (__analyzeSuppress_row_loop2(this)) {
					break;
				}
				if (__analyzeSuppress_row_loop2(this)) {
					break;
				}
				if (__analyzeSuppress_row_loop2(this)) {
					break;
				}
				if (__analyzeSuppress_row_loop2(this)) {
					break;
				}
				if (__analyzeSuppress_row_loop2(this)) {
					break;
				}
				if (__analyzeSuppress_row_loop2(this)) {
					break;
				}
				if (__analyzeSuppress_row_loop2(this)) {
					break;
				}
				if (__analyzeSuppress_row_loop2(this)) {
					break;
				}
				if (__analyzeSuppress_row_loop2(this)) {
					break;
				}
				if (__analyzeSuppress_row_loop2(this)) {
					break;
				}
			}
		}

		if (rowcnt > 0) {
			var count = 0;
			var start;
			var csuppinfo, csuppinfo2, csupp, rowidx, cdatarow;

			for (var j = 0; j < cellcnt; j++) {
				start = 0;

				var cellinfo, center;

				for (var i = 0; i < rowcnt; i++) {
					cellinfo = cells[j];

					rowidx = (!exportFlag) ? this.__getBodyCellRowIdxFromIdx(i) : i;
					cdatarow = this._getDataRow(rowidx);

					if (cellinfo.suppressalign.indexOf("middle") < 0) {
						break;
					}

					csuppinfo = cellinfo._getSuppressInfo(i);
					csuppinfo.middle = false;

					csupp = cellinfo._getSuppress(cdatarow);

					if (csupp > 0) {
						count++;
						if (csuppinfo.last == true) {
							if (count == 1) {
								csuppinfo.middle = true;
							}
							else {
								center = Math.round(count / 2);
								csuppinfo2 = cellinfo._getSuppressInfo(start + center - 1);
								csuppinfo2.middle = true;
							}
							start = i + 1;
							count = 0;
						}
					}
					if (csupp < 0) {
						;
					}
				}
			}
		}
	};

	_pGrid._compareSuppressCol = function (row, col, curcol, supplvl, cdatarow) {
		var band = this._bodyBand;
		var cells = this._curFormat._bodycells;

		var pinfo = cells[col];
		var cinfo = cells[curcol];
		var psuppinfo, csuppinfo;
		var csupp = cinfo._getSuppress(cdatarow);
		var psupp = pinfo._getSuppress(cdatarow);

		if (csupp <= 0 || psupp <= 0) {
			return false;
		}

		if (psupp < csupp) {
			psuppinfo = pinfo._getSuppressInfo(row);
			csuppinfo = cinfo._getSuppressInfo(row);

			if (psuppinfo.last == true) {
				csuppinfo.last = true;
			}
			return true;
		}
		else if (supplvl == "allcompare" && psupp == csupp) {
			psuppinfo = pinfo._getSuppressInfo(row);
			csuppinfo = cinfo._getSuppressInfo(row);

			if (psuppinfo.last == true) {
				csuppinfo.last = true;
			}
			if (csuppinfo.last == true) {
				psuppinfo.last = true;
			}
			return true;
		}
		return false;
	};

	_pGrid.__getBodyCellRowIdxFromIdx = function (idx, is_scr_toprow) {
		var toprowpos;
		if (this._fixed_rowcnt) {
			if (idx + this._fixed_startrow <= this._fixed_endrow) {
				toprowpos = this._fixed_startrow;
			}
			else {
				idx -= this._fixed_rowcnt - this._fixed_startrow;
				toprowpos = (is_scr_toprow) ? this._toprowpos[0] : this._begrowpos;
			}
		}
		else {
			toprowpos = (is_scr_toprow) ? this._toprowpos[0] : this._begrowpos;
		}
		return idx + toprowpos;
	};

	_pGrid._suppressUpdate = function () {
		if (!this._is_use_suppress) {
			return;
		}

		this._analyzeSuppress();

		var band = this._bodyBand;
		var rows = band._get_rows();
		var rowcnt = rows.length;
		var toprowpos = (this._fixed_rowcnt) ? this._fixed_startrow : this._toprowpos[0];
		var bottomrowpos = this._bottomrowpos;
		var start_rowpos = 0;
		var end_rowpos = rowcnt - 1;

		for (var i = 0; i < rowcnt; i++) {
			if (rows[i]._rowidx == toprowpos) {
				start_rowpos = i;
			}
			else if (rows[i]._rowidx == bottomrowpos) {
				end_rowpos = i;
				break;
			}

			if (bottomrowpos < 0) {
				break;
			}
		}

		for (var i = start_rowpos; i <= end_rowpos; i++) {
			this._suppressUpdateRow(i, start_rowpos, end_rowpos);
		}
	};

	_pGrid._suppressUpdateRow = function (row, start_rowpos, end_rowpos) {
		var band = this._bodyBand;
		var rows = band._get_rows();

		if (band == null || rows.length == 0) {
			return;
		}

		var cells = this._curFormat._bodycells;
		var cellcnt = cells.length;
		var rowidx = this.__getBodyCellRowIdxFromIdx(row, true);
		var cellinfo, prevcellitem, prelast, curlast;
		var psuppinfo, csuppinfo, csupp;
		var cdatarow = this._getDataRow(rowidx);

		for (var col = 0; col < cellcnt; col++) {
			cellinfo = cells[col];
			csuppinfo = cellinfo._getSuppressInfo(row);
			csupp = cellinfo._getSuppress(cdatarow);

			if (csupp > 0) {
				if (csupp > 0 && (row - start_rowpos) > 0) {
					psuppinfo = cellinfo._getSuppressInfo(row - 1);
				}
				else if (cellinfo.csupp < 0 && col > 0) {
					var prevcellinfo = cells[col - 1];
					psuppinfo = prevcellinfo._getSuppressInfo(row);
				}

				prelast = (psuppinfo ? psuppinfo.last : true);
				curlast = (row == end_rowpos ? true : csuppinfo.last);

				if (cellinfo.suppressalign.indexOf("first") >= 0) {
					if (prelast == false) {
						csuppinfo.text_proc = csupp;
					}
					else {
						csuppinfo.text_proc = 0;
					}
				}
				else if (cellinfo.suppressalign.indexOf("last") >= 0) {
					if (curlast == false) {
						csuppinfo.text_proc = csupp;
					}
					else {
						csuppinfo.text_proc = 0;
					}
				}
				else if (cellinfo.suppressalign.indexOf("middle") >= 0) {
					if (csuppinfo.middle == true) {
						csuppinfo.text_proc = 0;
					}
					else {
						csuppinfo.text_proc = csupp;
					}
				}

				if (psuppinfo) {
					if (prelast == false) {
						psuppinfo.border_proc = csupp;
					}
					else {
						psuppinfo.border_proc = 0;
					}
				}
			}
			else if (csupp == undefined) {
				if (cellinfo.suppressalign.indexOf("first") >= 0 || cellinfo.suppressalign.indexOf("middle") >= 0) {
					csuppinfo.text_proc = 1;
				}
			}
		}
	};

	_pGrid._refreshBodyRow = function (displayrow, pseudo, enable) {
		if (!this.enableredraw) {
			this._enable_redraw_history["refresh_body"] = true;
			return;
		}

		var band = this._bodyBand;
		if (band) {
			var rows = band._get_rows();
			if (rows.length <= displayrow) {
				return;
			}

			var rowcnt = this._getDispRowCnt();
			if (displayrow >= 0 && displayrow < rowcnt) {
				var rowidx = rows[displayrow]._rowidx;
				var dsrowidx = (this._hasTree) ? this._treeIndexes[rowidx] : rowidx;

				if (dsrowidx == undefined) {
					return;
				}

				band._refreshRow(displayrow, pseudo);
			}
			this._adjustOverlayElements(false, this._is_use_fakemerge);
		}
	};

	_pGrid._setGlobalCursor = function (cursor, obj) {
		this._global_cursor = cursor;

		while (obj) {
			obj._updateCursor(cursor);

			if (obj instanceof nexacro.Grid) {
				return;
			}

			obj = obj.parent;
		}
	};

	_pGrid._getColMergeInfo = function (band, col_idx) {
		var cells;

		if (band == "head") {
			cells = this._curFormat._headcells;
		}
		else if (band == "summ" || band == "summary") {
			cells = this._curFormat._summcells;
		}
		else {
			cells = this._curFormat._bodycells;
		}

		if (!cells) {
			return null;
		}

		var cellsLen = cells.length;
		var cell;
		var col = col_idx;
		var colspan = 1;
		var retn = [];

		for (var i = 0; i < cellsLen; i++) {
			cell = cells[i];
			if (cell._col <= col_idx && (cell._col + cell._colspan) > col_idx) {
				if (colspan < cell._colspan) {
					colspan = cell._colspan;
					col = cell._col;
				}
			}
		}
		retn[0] = col;
		retn[1] = colspan;

		return retn;
	};

	_pGrid._applySelect = function (arrS, arrE, pos) {
		var each = false;

		if (this.summarytype == "top" || this.summarytype == "lefttop") {
			each = true;
		}

		if (arrS.length == 0 || (each && pos < 0)) {
			arrS.splice(0, 0, pos);
			arrE.splice(0, 0, pos);
		}
		else {
			var nobodys, nobodye;
			var mincnt = 0;

			if (each) {
				for (var i = 0; i < arrS.length; i++) {
					if (arrS[i] >= 0) {
						break;
					}

					mincnt++;
				}

				nobodys = arrS.splice(0, mincnt);
				nobodye = arrE.splice(0, mincnt);
			}

			var cnt = arrS.length;

			if (cnt == 0) {
				arrS.splice(0, 0, pos);
				arrE.splice(0, 0, pos);
			}
			else if (cnt == 1 || arrS[0] > pos) {
				this._addSelect(arrS, arrE, 0, pos);
			}
			else if (arrE[cnt - 1] < pos) {
				this._addSelect(arrS, arrE, cnt - 1, pos);
			}
			else {
				for (var i = 0; i < cnt; i++) {
					if (arrE[i] < pos && arrS[i + 1] > pos) {
						if ((arrE[i] + 1) == pos && (arrS[i + 1] - 1) > pos) {
							this._addSelect(arrS, arrE, i, pos);
						}
						else if ((arrE[i] + 1) < pos && (arrS[i + 1] - 1) == pos) {
							this._addSelect(arrS, arrE, i + 1, pos);
						}
						else if ((arrE[i] + 1) == pos && (arrS[i + 1] - 1) == pos) {
							this._addSelect(arrS, arrE, i, pos);
							arrE[i] = arrE[i + 1];
							arrS.splice(i + 1, 1);
							arrE.splice(i + 1, 1);
						}
						else if ((arrE[i] + 1) < pos && (arrS[i + 1] - 1) > pos) {
							arrS.push(pos);
							arrE.push(pos);
							arrS.sort();
							arrE.sort();
						}
						break;
					}
				}
			}

			if (each) {
				for (var i = 0; i < nobodys.length; i++) {
					arrS.splice(0, 0, nobodys[i]);
					arrE.splice(0, 0, nobodye[i]);
				}
			}
		}
	};

	_pGrid._addSelect = function (arrS, arrE, idx, pos) {
		if (arrE[idx] < pos) {
			if ((arrE[idx] + 1) == pos) {
				arrE[idx] = pos;
			}
			else {
				arrS.push(pos);
				arrE.push(pos);
			}
		}
		else if (arrS[idx] > pos) {
			if ((arrS[idx] - 1) == pos) {
				arrS[idx] = pos;
			}
			else {
				arrS.push(pos);
				arrE.push(pos);
				arrS.sort();
				arrE.sort();
			}
		}
	};

	_pGrid._findCellObj = function (fromComp) {
		var cellobj = fromComp;
		while (cellobj && cellobj._type_name != "GridCell") {
			if (cellobj._type_name == "Grid") {
				if (cellobj == this) {
					break;
				}
				else {
					cellobj = fromComp;
					break;
				}
			}

			if (cellobj._cellobj && cellobj._cellobj._type_name == "GridCell") {
				cellobj = cellobj._cellobj;
				break;
			}
			cellobj = cellobj.parent;
		}
		return cellobj;
	};

	_pGrid._findBandObj = function (fromComp) {
		var bandobj = fromComp;
		while (bandobj && bandobj._type_name != "GridBand") {
			if (bandobj == this) {
				break;
			}

			bandobj = bandobj.parent;
		}
		return bandobj;
	};
	_pGrid._getHScrollPos = function () {
		if (!this.hscrollbar.visible) {
			return 0;
		}

		return this.hscrollbar.pos;
	};

	_pGrid._isFakeCell = function (rowidx) {
		if (this._rowcount <= rowidx || rowidx < -2) {
			return true;
		}

		return false;
	};

	_pGrid._moveToPosCell = function (rowidx, cellidx) {
		var newPos = rowidx;
		var retn = true;

		if (newPos == undefined) {
			newPos = 0;
		}

		if (this._isFakeCell(newPos)) {
			return false;
		}

		var cellinfo = this._getBodyCellInfo(cellidx);
		if (!cellinfo) {
			return false;
		}

		var beforeCell = this._beforebodycellpos = this._selectinfo.curcell;
		var beforeCol = this._beforebodycolpos = this._selectinfo.curcol;
		var beforeRow = this._beforebodyrowpos = this._selectinfo.curdsrow;
		var beforeSubrow = this._beforebodysubrowpos = this._selectinfo.cursubrow;
		var beforePvt = this._beforepvt = this._selectinfo.curpvt;

		var afterCell = cellidx;
		var afterCol = cellinfo._col;
		var afterRow = newPos;
		var afterSubrow = cellinfo._row;
		var afterPvt = -9;

		this._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);

		while (true) {
			if (afterCell != beforeCell) {
				break;
			}
			if (afterCol != beforeCol) {
				break;
			}
			if (afterRow != beforeRow) {
				break;
			}
			if (afterSubrow != beforeSubrow) {
				break;
			}
			if (afterPvt != beforePvt) {
				break;
			}

			retn = false;
			break;
		}

		if (retn) {
			retn = this._ChangeSelect(afterCell, afterCol, afterRow, afterSubrow, afterPvt, false, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, "body");
		}

		this._moveCellAfterFocus();

		return retn;
	};

	_pGrid._getColFixCnt = function (area) {
		if (this._curFormat) {
			return this._curFormat._getColFixCnt(area);
		}
		return -1;
	};

	_pGrid._getGridBand = function (nCell) {
		if (!this._curFormat || !this._curFormat._bodycells) {
			return -1;
		}

		var cell = this._curFormat._bodycells[nCell];
		if (cell) {
			if (this._bPivotGrid) {
				var leftcnt = this._getColFixCnt("left");
				var rightcnt = this._getColFixCnt("right");

				if (cell._col < leftcnt) {
					return -1;
				}
				else if (cell._col >= (this._curFormat._bodycells.length - right)) {
					return -2;
				}
				else {
					return 0;
				}
			}
			else {
				return 0;
			}
		}
		return -9;
	};

	_pGrid._clrMultiSelect = function () {
		this._selectinfo.rows = [];
		this._selectinfo.selects = [];

		this._selectstartrow = [];
		this._selectstartcol = [];
		this._selectstartsubrow = [];
		this._selectstartpvt = [];

		this._selectendrow = [];
		this._selectendcol = [];
		this._selectendsubrow = [];
		this._selectendpvt = [];

		this._defaultSelect();
	};

	_pGrid._isIncludeSelectpos = function (cell, row) {
		var selects = this._selectinfo.getSelectCells(row);

		if (selects && selects[cell]) {
			return true;
		}

		return false;
	};

	_pGrid._addSelectpos = function (cell, row) {
		var select = this._selectinfo.selects;
		var rows = this._selectinfo.rows;

		if (!select[row + 2]) {
			select[row + 2] = [];
		}

		select[row + 2][cell] = true;

		for (var i = 0; i < rows.length; i++) {
			if (rows[i] == row) {
				return;
			}
		}
		rows.push(row);
		rows.sort(function (a, b) {
			return a - b;
		});
	};

	_pGrid._delSelectpos = function (cell, row, adjust) {
		var select = this._selectinfo.selects;
		var rows = this._selectinfo.rows;

		if (cell < 0) {
			if (nexacro._isArray(row)) {
				var rowLen = row.length;
				for (var i = rowLen - 1; i >= 0; i--) {
					if (adjust) {
						if (select.length > row[i] + 2) {
							select.splice(row[i] + 2, 1);
						}
					}
					else {
						select[row[i] + 2] = undefined;
					}

					for (var j = 0; j < rows.length; j++) {
						if (rows[j] == row[i]) {
							rows.splice(j, 1);
							break;
						}
					}
				}
			}
			else {
				if (adjust) {
					if (select.length > row + 2) {
						select.splice(row + 2, 1);
					}
				}
				else {
					select[row + 2] = undefined;
				}

				for (var j = 0; j < rows.length; j++) {
					if (rows[j] == row) {
						rows.splice(j, 1);
						break;
					}
				}
			}
		}
		else {
			if (nexacro._isArray(row)) {
				var rowLen = row.length;
				var cells, exist;

				for (var i = rowLen - 1; i >= 0; i--) {
					cells = select[row[i] + 2];

					if (cells) {
						cells[cell] = false;
					}

					exist = false;
					for (var j = 0; j < cells.length; j++) {
						if (cells[j]) {
							exist = true;
							break;
						}
					}

					if (!exist) {
						select[row + 2] = undefined;

						for (var j = 0; j < rows.length; j++) {
							if (rows[j] == row[i]) {
								rows.splice(j, 1);
								break;
							}
						}
					}
				}
			}
			else {
				var cells = select[row + 2];

				if (cells) {
					cells[cell] = false;
				}

				var exist = false;
				for (var j = 0; j < cells.length; j++) {
					if (cells[j]) {
						exist = true;
						break;
					}
				}

				if (!exist) {
					select[row + 2] = undefined;

					for (var j = 0; j < rows.length; j++) {
						if (rows[j] == row) {
							rows.splice(j, 1);
							break;
						}
					}
				}
			}
		}
	};
	_pGrid._resetSelectStartEndRow = function () {
		var select = this._selectinfo.selects;
		this._selectstartrow = [];
		this._selectendrow = [];

		for (var i = 0; i < select.length; i++) {
			if (select[i]) {
				this._applySelect(this._selectstartrow, this._selectendrow, i - 2);
			}
		}

		this.selectstartrow = this._selectstartrow;
		this.selectendrow = this._selectendrow;

		if (!this.selectstartrow.length) {
			this.selectstartrow = -9;
		}
		if (!this.selectendrow.length) {
			this.selectendrow = -9;
		}
	};

	_pGrid._isMultiSelected = function () {
		if (!this._curFormat || !this._curFormat._bodycells) {
			return false;
		}

		if (this._isSelectRowType()) {
			if (this._selectinfo.rows.length > 1) {
				return true;
			}
		}
		else {
			if (this._selectinfo.rows.length > 1) {
				return true;
			}
			else if (this._selectinfo.rows.length == 1) {
				var cells = this._selectinfo.selects[this._selectinfo.rows[0] + 2];
				var cnt = 0;

				for (var i = 0; i < cells.length; i++) {
					if (cells[i]) {
						cnt++;
					}
					if (cnt > 1) {
						return true;
					}
				}
			}
		}
		return false;
	};

	_pGrid._initSelect = function (row, cell, col, subrow, pvt) {
		cell = (cell !== undefined) ? cell : 0;
		col = (col !== undefined) ? col : 0;
		row = (row !== undefined) ? row : 0;
		subrow = (subrow !== undefined) ? subrow : 0;
		pvt = (pvt !== undefined) ? pvt : -9;

		this._resetSelect(row, cell, col, subrow, pvt);
	};

	_pGrid._resetSelect = function (row, cell, col, subrow, pvt) {
		var bcell = this._selectinfo.curcell;
		var bcol = this._selectinfo.curcol;
		var brow = this._selectinfo.curdsrow;
		var bsubrow = this._selectinfo.cursubrow;
		var bpvt = this._selectinfo.curpvt;

		cell = (cell !== undefined) ? cell : this._selectinfo.curcell;
		col = (col !== undefined) ? col : this._selectinfo.curcol;
		row = (row !== undefined) ? row : this._selectinfo.curdsrow;
		subrow = (subrow !== undefined) ? subrow : this._selectinfo.cursubrow;
		pvt = (pvt !== undefined) ? pvt : this._selectinfo.curpvt;

		if (this.getElement()) {
			if (row >= 0 && cell < 0) {
				if (this._isSelectRowType()) {
					cell = 0;
				}
				else {
					cell = col = subrow = 0;
				}
			}

			this._clrMultiSelect();
			this._multiselect = "none";
			this._setSelectedInfo(cell, col, row, subrow, pvt);
			this._ChangeSelect(cell, col, row, subrow, pvt, true, bcell, bcol, brow, bsubrow, bpvt, "body");
			this._refreshHead(true);
			this._refreshSumm(true);
		}
	};

	_pGrid._ChangeSelect = function (cell, col, row, subrow, pvt, bDataset, oldcell, oldcol, oldrow, oldsubrow, oldpvt, bandstr, evt_kind) {
		bDataset = bDataset || false;
		var selectmode = this._multiselect;

		var format = this._curFormat;

		if (!format || (this._setdataobj && this._setdataobj.succ == false)) {
			this._setdataobj = null;
			this._setSelectedInfo(oldcell, oldcol, oldrow, oldsubrow, oldpvt);
			return false;
		}

		var cells, cellcnt, cellinfo, subrowslen = 0;
		var b_select_changed = false;

		if (bandstr == "head") {
			cells = format._headcells;
			b_select_changed = (oldrow != row || oldcell != cell);

			if (format._headrows) {
				subrowslen = format._headrows.length;
			}
		}
		else if (bandstr == "summ" || bandstr == "summary") {
			cells = format._summcells;
			b_select_changed = (oldrow != row || oldcell != cell);

			if (format._summrows) {
				subrowslen = format._summrows.length;
			}
		}
		else {
			cells = format._bodycells;

			if (this._isSelectRowType()) {
				b_select_changed = (oldrow != row);
			}
			else {
				b_select_changed = (oldrow != row || oldcell != cell);
			}

			if (format._bodyrows) {
				subrowslen = format._bodyrows.length;
			}
		}

		if (!cells) {
			this._setSelectedInfo(oldcell, oldcol, oldrow, oldsubrow, oldpvt);
			return false;
		}

		cellcnt = cells.length;
		cellinfo = cells[cell];

		var clear = false;


		if ((bandstr == "body" && row < 0) || cell < 0) {
			clear = (selectmode != "normal");

			this._clrMultiSelect();
			this._selectDraw(cell, col, row, subrow, pvt, bDataset, oldcell, oldcol, oldrow, oldsubrow, oldpvt, clear, []);
			this._selectinfo.area = [];
			this._defaultSelect();

			if (b_select_changed) {
				this.on_fire_onselectchanged(this, cell, col, row, subrow, pvt, oldcell, oldcol, oldrow, oldsubrow, oldpvt, this.selectendcol, this.selectendpivot, this.selectendrow, this.selectendsubrow, this.selectstartcol, this.selectstartpivot, this.selectstartrow, this.selectstartsubrow);
			}
			return true;
		}
		else if (!cellinfo) {
			this._setSelectedInfo(oldcell, oldcol, oldrow, oldsubrow, oldpvt);
			return false;
		}

		clear = (this._selectClear || clear);
		this._selectClear = false;

		var ctrlkey_change = false;

		if (selectmode == "ctrl") {
			if (this.selecttype == "multirow") {
				if (!this._isIncludeSelectpos(0, row)) {
					ctrlkey_change = true;
				}
			}
			if (this.selecttype == "multicell") {
				if (!this._isIncludeSelectpos(cell, row)) {
					ctrlkey_change = true;
				}
			}
		}


		if (bDataset == false) {
			if (this._binddataset && bandstr == "body" && row >= 0 && (ctrlkey_change == true || oldrow != row)) {
				this._userRowposChange = true;
				var row2 = this._binddataset._setRowPosition(row, undefined, 51);
				this._userRowposChange = false;

				if (row != row2) {
					this._setSelectedInfo(oldcell, oldcol, oldrow, oldsubrow, oldpvt);
					this._selectDraw(oldcell, oldcol, oldrow, oldsubrow, oldpvt, bDataset, cell, col, row, subrow, pvt, true, []);
					return false;
				}
			}
		}

		var _controlpoint_cell = this._selectinfo.ctrlpoint;
		var selectRows = [];
		var b_fire = false;
		var multiidx = 0;

		function makeClearRows (grid) {
			var select_rows = grid._selectinfo.rows;
			var j = 0;

			selectRows = [];

			for (var i = 0; i < select_rows.length; i++) {
				selectRows[j++] = grid._dsRowToDispRow(select_rows[i]);
			}

			return select_rows;
		}
		;


		if (selectmode == "none") {
			if (bandstr == "body") {
				if (this._isAreaSelect() || this._isMultiSelect()) {
					if (this._isIncludeSelectpos(cell, row)) {
						if (evt_kind == "keydown" || evt_kind == "mousemove") {
							b_fire = true;
						}
						else {
							_controlpoint_cell._set(cellinfo, row, subrowslen);
							return false;
						}
					}
					else {
						if (evt_kind == "lbuttonup") {
							b_fire = true;
						}
					}

					if (evt_kind == "mousemove") {
						this._is_drag_selecting = true;
					}
					else {
						selectRows = makeClearRows(this);
						this._clrMultiSelect();

						if (evt_kind != "lbuttonup") {
							_controlpoint_cell._set(cellinfo, row, subrowslen);
						}
					}
				}
				else {
					this._clrMultiSelect();
					_controlpoint_cell._set(cellinfo, row, subrowslen);
				}
			}
			else {
				selectRows = makeClearRows(this);
				this._clrMultiSelect();
				_controlpoint_cell._set(cellinfo, row, subrowslen);
			}
			this._selectinfo.area = [];
		}
		else if (selectmode == "ctrl") {
			if (evt_kind != "mousemove") {
				_controlpoint_cell._set(cellinfo, row, subrowslen);
			}


			if (this.selecttype == "multirow") {
				if (ctrlkey_change == false && (evt_kind == "lbuttondown" || (evt_kind && evt_kind.indexOf("func") >= 0))) {
					this._delMultirowSelectInfo(row);
					this._delSelectpos(-1, row);
					this._resetSelectStartEndRow();
					this._selectDraw(cell, col, row, subrow, pvt, bDataset, oldcell, oldcol, oldrow, oldsubrow, oldpvt, clear, selectRows);
					this._defaultSelect();

					this.on_fire_onselectchanged(this, cell, col, row, subrow, pvt, oldcell, oldcol, oldrow, oldsubrow, oldpvt, this.selectendcol, this.selectendpivot, this.selectendrow, this.selectendsubrow, this.selectstartcol, this.selectstartpivot, this.selectstartrow, this.selectstartsubrow);
					return true;
				}

				b_fire = true;
				multiidx = this._selectinfo.area.length;

				if (evt_kind == "mousemove") {
					this._is_drag_selecting = true;
					multiidx--;
				}
			}
			else if (this.selecttype == "multiarea") {
				multiidx = this._selectinfo.area.length;

				if (evt_kind == "mousemove") {
					this._is_drag_selecting = true;
					multiidx--;
				}
			}
		}
		else if (selectmode == "shift") {
			if (this.selecttype == "multiarea") {
				multiidx = this._selectinfo.area.length - 1;
			}

			this._clrMultiSelect();
			clear = true;
		}


		if (this._isSelectRowType() == false) {
			if (b_select_changed) {
				b_fire = true;
			}

			if (this._isAreaSelect()) {
				this._applyAreaSelectPos(cell, row, multiidx, "area");
			}
			else {
				this._addSelectpos(cell, row);
				this._applySelect(this._selectstartrow, this._selectendrow, row);
				this._applySelect(this._selectstartcol, this._selectendcol, col);
				this._applySelect(this._selectstartsubrow, this._selectendsubrow, subrow);
			}
		}


		else {
			if (b_select_changed) {
				b_fire = true;
			}

			if (this._isMultiSelect()) {
				this._applyAreaSelectPos(cell, row, multiidx, "row");
			}
			else {
				for (var i = 0; i < cellcnt; i++) {
					this._addSelectpos(i, row);
				}

				this._applySelect(this._selectstartrow, this._selectendrow, row);
			}
		}


		this._defaultSelect();


		var b_draw = false;

		if (bDataset == false) {
			if (this._binddataset && bandstr == "body" && row >= 0 && (ctrlkey_change == true || oldrow != row)) {
				this._rowposition = row;
				b_draw = true;
			}
			else {
				if (clear == true) {
					b_draw = true;
				}
				else if (b_fire == true) {
					b_draw = true;
				}
			}
		}
		else {
			clear = (this._isMultiSelect() || this._isAreaSelect());
			b_draw = true;
		}

		if (b_draw) {
			this._selectDraw(cell, col, row, subrow, pvt, bDataset, oldcell, oldcol, oldrow, oldsubrow, oldpvt, clear, selectRows, evt_kind);
		}


		if (b_fire && evt_kind != "func_area1") {
			this.on_fire_onselectchanged(this, cell, col, row, subrow, pvt, oldcell, oldcol, oldrow, oldsubrow, oldpvt, this.selectendcol, this.selectendpivot, this.selectendrow, this.selectendsubrow, this.selectstartcol, this.selectstartpivot, this.selectstartrow, this.selectstartsubrow);
		}

		return true;
	};

	_pGrid._applyAreaSelectPos = function (cell, row, idx, type) {
		var format = this._curFormat;
		var cells, cellsLen, subrowsLen;
		var bodycells = [], bodycellslen = 0, bodyrowslen = 0, headcells = [], headcellslen = 0, headrowslen = 0, summcells = [], summcellslen = 0, summrowslen = 0;

		if (format._bodycells) {
			bodycells = format._bodycells;
			bodycellslen = bodycells.length;
			bodyrowslen = format._bodyrows.length;
		}
		if (format._headcells) {
			headcells = format._headcells;
			headcellslen = headcells.length;
			headrowslen = format._headrows.length;
		}
		if (format._summcells) {
			summcells = format._summcells;
			summcellslen = summcells.length;
			summrowslen = format._summrows.length;
		}

		if (row == -2) {
			cells = summcells;
			subrowsLen = summrowslen;
		}
		else if (row == -1) {
			cells = headcells;
			subrowsLen = headrowslen;
		}
		else {
			cells = bodycells;
			subrowsLen = bodyrowslen;
		}

		var cellsLen = cells.length;
		var ctrlpoint = this._selectinfo.ctrlpoint;
		var cellinfo = cells[cell];
		var begcol, endcol, begrow, endrow, begsubrow = [], endsubrow = [], last;

		begrow = Math.min(row, ctrlpoint.row);
		endrow = Math.max(row, ctrlpoint.row);
		begcol = Math.min(ctrlpoint.col, cellinfo._col);
		endcol = Math.max((ctrlpoint.col + ctrlpoint.colspan - 1), (cellinfo._col + cellinfo._colspan - 1));

		if (ctrlpoint.row < row) {
			begrow = ctrlpoint.row;
			endrow = row;

			last = endrow - begrow;

			begsubrow[0] = ctrlpoint.subrow;
			endsubrow[0] = ctrlpoint.subrowslen - 1;
			begsubrow[last] = 0;
			endsubrow[last] = cellinfo._row + cellinfo._rowspan - 1;
		}
		else if (ctrlpoint.row > row) {
			begrow = row;
			endrow = ctrlpoint.row;

			last = endrow - begrow;

			begsubrow[0] = cellinfo._row;
			endsubrow[0] = subrowsLen - 1;
			begsubrow[last] = 0;
			endsubrow[last] = ctrlpoint.subrow + ctrlpoint.rowspan - 1;
		}
		else {
			begrow = endrow = row;
			last = 0;

			begsubrow[0] = Math.min(cellinfo._row, ctrlpoint.subrow);
			endsubrow[0] = Math.max(cellinfo._row + cellinfo._rowspan - 1, ctrlpoint.subrow + ctrlpoint.rowspan - 1);
		}

		var ii;
		for (var i = begrow + 1; i < endrow; i++) {
			ii = i - begrow;
			begsubrow[ii] = 0;

			if (i == -1) {
				endsubrow[ii] = headrowslen - 1;
			}
			else {
				endsubrow[ii] = bodyrowslen - 1;
			}
		}

		var areainfo;

		if (type == "area") {
			if (begrow >= 0 || begrow == endrow) {
				areainfo = this._adjustMergeArea(cells, begcol, endcol, begrow, endrow, begsubrow, endsubrow);
			}
			else {
				var bsubrow, esubrow;
				var prevbegcol = begcol, prevendcol = endcol;

				while (true) {
					bsubrow = [].concat(begsubrow);
					esubrow = [].concat(endsubrow);

					if (begrow == -2) {
						var summbegsubrow = bsubrow.splice(0, 1);
						var summendsubrow = esubrow.splice(0, 1);
						var headbegsubrow = bsubrow.splice(0, 1);
						var headendsubrow = esubrow.splice(0, 1);

						areainfo = this._adjustMergeArea(summcells, prevbegcol, prevendcol, -2, -2, summbegsubrow, summendsubrow);

						prevbegcol = areainfo.begcol;
						prevendcol = areainfo.endcol;

						areainfo = this._adjustMergeArea(headcells, prevbegcol, prevendcol, -1, -1, headbegsubrow, headendsubrow);

						if (prevbegcol != areainfo.begcol || prevendcol != areainfo.endcol) {
							prevbegcol = areainfo.begcol;
							prevendcol = areainfo.endcol;
							continue;
						}
					}
					else if (begrow == -1) {
						var headbegsubrow = bsubrow.splice(0, 1);
						var headendsubrow = esubrow.splice(0, 1);

						areainfo = this._adjustMergeArea(headcells, prevbegcol, prevendcol, -1, -1, headbegsubrow, headendsubrow);

						prevbegcol = areainfo.begcol;
						prevendcol = areainfo.endcol;
					}

					if (endrow >= 0) {
						areainfo = this._adjustMergeArea(bodycells, prevbegcol, prevendcol, 0, endrow, bsubrow, esubrow);
					}

					if (prevbegcol != areainfo.begcol || prevendcol != areainfo.endcol) {
						prevbegcol = areainfo.begcol;
						prevendcol = areainfo.endcol;
						continue;
					}
					break;
				}
				areainfo.begrow = begrow;
				areainfo.begsubrow = begsubrow;
				areainfo.endsubrow = endsubrow;
			}
		}
		else {
			areainfo = this._adjustRowArea(begrow, endrow);
		}

		this._selectinfo.area[idx] = areainfo;

		var select_area = this._selectinfo.area;
		var select_area_len = select_area.length;

		this._clrMultiSelect();
		var cell_scol, cell_ecol, cell_ssubrow, cell_esubrow;

		if (type == "area") {
			for (var a = 0; a < select_area_len; a++) {
				begcol = select_area[a].begcol;
				endcol = select_area[a].endcol;
				begrow = select_area[a].begrow;
				endrow = select_area[a].endrow;
				begsubrow = select_area[a].begsubrow;
				endsubrow = select_area[a].endsubrow;

				this._selectstartrow[a] = begrow;
				this._selectendrow[a] = endrow;
				this._selectstartcol[a] = begcol;
				this._selectendcol[a] = endcol;
				this._selectstartsubrow[a] = begsubrow[0];
				this._selectendsubrow[a] = endsubrow[endsubrow.length - 1];

				for (var i = begrow, j = 0; i <= endrow; i++, j++) {
					if (i == -2) {
						cells = summcells;
						cellsLen = summcellslen;
					}
					else if (i == -1) {
						cells = headcells;
						cellsLen = headcellslen;
					}
					else {
						cells = bodycells;
						cellsLen = bodycellslen;
					}

					for (var k = 0; k < cellsLen; k++) {
						cell_scol = cells[k]._col;
						cell_ecol = cells[k]._col + cells[k]._colspan - 1;
						cell_ssubrow = cells[k]._row;
						cell_esubrow = cells[k]._row + cells[k]._rowspan - 1;

						if (cell_scol >= begcol && cell_ecol <= endcol && cell_ssubrow >= begsubrow[j] && cell_esubrow <= endsubrow[j]) {
							this._addSelectpos(k, i);
						}
					}
				}
			}
		}
		else {
			for (var a = 0; a < select_area_len; a++) {
				begrow = select_area[a].begrow;
				endrow = select_area[a].endrow;

				for (var i = begrow, j = 0; i <= endrow; i++, j++) {
					if (i == -2) {
						cellsLen = summcellslen;
					}
					else if (i == -1) {
						cellsLen = headcellslen;
					}
					else {
						cellsLen = bodycellslen;
					}

					if (cellsLen == 0) {
						continue;
					}

					for (var k = 0; k < cellsLen; k++) {
						this._addSelectpos(k, i);
					}

					this._applySelect(this._selectstartrow, this._selectendrow, i);
				}
			}
		}
	};

	_pGrid._delMultirowSelectInfo = function (row) {
		var area = this._selectinfo.area;
		var area_len = area.length;

		for (var i = 0; i < area_len; i++) {
			if (area[i].begrow == area[i].endrow && area[i].begrow == row) {
				area.splice(i, 1);
				break;
			}
			else if (area[i].begrow == row && area[i].endrow != row) {
				area[i].begrow++;
				break;
			}
			else if (area[i].endrow == row && area[i].begrow != row) {
				area[i].endrow--;
				break;
			}
			else if (area[i].begrow < row && area[i].endrow > row) {
				var endrow = area[i].endrow;
				area[i].endrow = row - 1;
				var newarea = this._adjustRowArea(row + 1, endrow);
				area.splice(i + 1, 0, newarea);
				break;
			}
		}
	};

	_pGrid._adjustRowArea = function (begrow, endrow) {
		return {
			begcol : -1, 
			endcol : -1, 
			begrow : begrow, 
			endrow : endrow, 
			begsubrow : [], 
			endsubrow : []
		};
	};

	_pGrid._adjustMergeArea = function (cells, begcol, endcol, begrow, endrow, begsubrow, endsubrow) {
		var last = endrow - begrow;
		var cells_len = cells.length;
		var cell_scol, cell_ecol, cell_ssubrow, cell_esubrow;
		var update, rows_len = begsubrow.length;

		for (var i = 0; i < cells_len; i++) {
			cell_scol = cells[i]._col;
			cell_ecol = cells[i]._col + cells[i]._colspan - 1;
			cell_ssubrow = cells[i]._row;
			cell_esubrow = cells[i]._row + cells[i]._rowspan - 1;

			update = false;

			for (var j = 0; j < rows_len; j++) {
				if (((begcol <= cell_scol && endcol >= cell_scol) || (begcol <= cell_ecol && endcol >= cell_ecol) || (begcol > cell_scol && endcol < cell_ecol)) && ((begsubrow[j] <= cell_ssubrow && endsubrow[j] >= cell_ssubrow) || (begsubrow[j] <= cell_esubrow && endsubrow[j] >= cell_esubrow) || (begsubrow[j] > cell_ssubrow && endsubrow[j] < cell_esubrow))) {
					if (begcol > cell_scol) {
						begcol = cell_scol;
						update = true;
					}
					if (endcol < cell_ecol) {
						endcol = cell_ecol;
						update = true;
					}

					if (j == 0) {
						if (begsubrow[0] > cell_ssubrow) {
							begsubrow[0] = cell_ssubrow;
							update = true;
						}
					}

					if (j == last) {
						if (endsubrow[last] < cell_esubrow) {
							endsubrow[last] = cell_esubrow;
							update = true;
						}
					}

					if (update == true) {
						i = 0;
						break;
					}
				}
			}
		}

		return {
			begcol : begcol, 
			endcol : endcol, 
			begrow : begrow, 
			endrow : endrow, 
			begsubrow : begsubrow, 
			endsubrow : endsubrow
		};
	};

	_pGrid._defaultSelect = function () {
		this.selectstartrow = this._selectstartrow;
		this.selectstartcol = this._selectstartcol;
		this.selectstartsubrow = this._selectstartsubrow;
		this.selectstartpivot = this._selectstartpvt;
		this.selectendrow = this._selectendrow;
		this.selectendcol = this._selectendcol;
		this.selectendsubrow = this._selectendsubrow;
		this.selectendpivot = this._selectendpvt;

		if (!this.selectstartrow.length) {
			this.selectstartrow = -9;
		}
		if (!this.selectstartcol.length) {
			this.selectstartcol = -1;
		}
		if (!this.selectstartsubrow.length) {
			this.selectstartsubrow = -1;
		}
		if (!this.selectstartpivot.length) {
			this.selectstartpivot = -9;
		}
		if (!this.selectendrow.length) {
			this.selectendrow = -9;
		}
		if (!this.selectendcol.length) {
			this.selectendcol = -1;
		}
		if (!this.selectendsubrow.length) {
			this.selectendsubrow = -1;
		}
		if (!this.selectendpivot.length) {
			this.selectendpivot = -9;
		}
	};

	_pGrid._dsRowToDispRow = function (datasetRowidx, bCalcScroll) {
		var row;
		if (this._hasTree) {
			row = this._getTreeRowPosition(datasetRowidx);
		}
		else {
			row = datasetRowidx;
		}

		if (bCalcScroll) {
			row -= this._getBodyBegRowPos(row);
		}

		return row;
	};

	_pGrid._jumpCurrentRow = function (rowidx) {
		if (rowidx < 0) {
			return this._begrowpos;
		}

		var topPos = this._toprowpos[0];
		var vscrollbar = this.vscrollbar;
		var page_spos = this._getBodyBegRowPos(rowidx);

		if (this._lbuttondown_proc == false) {
			if (rowidx <= topPos) {
				if (!this._select_noscroll && vscrollbar && vscrollbar._isEnable()) {
					vscrollbar._set_rowpos(rowidx);
				}

				page_spos = this._getBodyBegRowPos(rowidx);
			}
			else if (rowidx > (topPos + this.pagerowcount - 1)) {
				var gap = (this.pagerowcount > 0) ? this._pagerowcnt - this.pagerowcount : 0;

				if (!this._select_noscroll && vscrollbar && vscrollbar._isEnable()) {
					vscrollbar._set_rowpos(rowidx - this._pagerowcnt + 1 + gap);
				}

				page_spos = this._getBodyBegRowPos(rowidx);
			}
			else {
				if (this._isRemainAreaScroll()) {
					if (!this._select_noscroll && vscrollbar && vscrollbar._isEnable()) {
						vscrollbar._set_rowpos(rowidx);
					}

					page_spos = this._getBodyBegRowPos(rowidx);
				}
			}
		}
		return page_spos;
	};
	_pGrid._getBodyBegRowPos = function (rowidx) {
		if (this._fixed_rowcnt > 0) {
			if (this._fixed_endrow >= rowidx) {
				return this._fixed_startrow;
			}

			return this._begrowpos - (this._fixed_rowcnt - this._fixed_startrow);
		}
		return this._begrowpos;
	};

	_pGrid._clearRows = function (oldrows) {
		if (oldrows.length > 0) {
			for (var i = 0; i < oldrows.length; i++) {
				if (oldrows[i] == -2) {
					this._refreshSumm(true);
					bSummRowDraw = false;
				}
				else if (oldrows[i] == -1) {
					this._refreshHead(true);
					bHeadRowDraw = false;
				}
				else {
					this._refreshBodyRow(oldrows[i] - this._getBodyBegRowPos(oldrows[i]));
				}
			}
			return true;
		}
		return false;
	};

	_pGrid._selectDraw = function (afterCell, afterCol, afterRow, afterSubrow, afterPvt, bDataset, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, bAllRowDraw, oldrows, kind) {
		var oldPos = this._dsRowToDispRow(beforeRow);
		var newPos = this._dsRowToDispRow(afterRow);
		var topPos = this._toprowpos[0];

		this._setSelectedInfo(null, null, afterRow, null, null);

		if (!this._is_created) {
			return;
		}

		var bBodyRowDraw = false;
		var bHeadRowDraw = false;
		var bSummRowDraw = false;
		var exprbindcells = null;

		if ((exprbindcells = this._getUseBindExprProp("body")) || this._isUseBindExprStyle("body")) {
			bBodyRowDraw = true;
			bAllRowDraw = true;
		}
		if (this._isUseBindExprStyle("head") || this._getUseBindExprProp("head") || newPos == -1 || oldPos == -1) {
			bHeadRowDraw = true;
		}
		if (this._isUseBindExprStyle("summ") || this._getUseBindExprProp("summ") || newPos == -2 || oldPos == -2) {
			bSummRowDraw = true;
		}

		if (this._isSelectRowType()) {
			if (newPos < 0 && (kind && kind.indexOf("func") < 0)) {
				if (bAllRowDraw) {
					if (!this._clearRows(oldrows)) {
						this._refreshBody(true, true);
					}
				}
				else {
					this._refreshBodyRow(oldPos - this._getBodyBegRowPos(oldPos));
				}

				if (bHeadRowDraw) {
					this._refreshHead(true);
				}
				if (bSummRowDraw) {
					this._refreshSumm(true);
				}
			}
			else if (newPos != oldPos) {
				this._jumpCurrentRow(newPos);

				if (this._isMultiSelect()) {
					this._refreshBody(true, true);

					if (bHeadRowDraw) {
						this._refreshHead(true);
					}
					if (bSummRowDraw) {
						this._refreshSumm(true);
					}
				}
				else {
					if (bAllRowDraw) {
						if (!this._clearRows(oldrows)) {
							this._refreshBody(true, true);
						}
						else {
							this._refreshBodyRow(newPos - this._getBodyBegRowPos(newPos));
						}
					}
					else {
						this._refreshBodyRow(oldPos - this._getBodyBegRowPos(oldPos));
						this._refreshBodyRow(newPos - this._getBodyBegRowPos(newPos));
					}

					if (bHeadRowDraw) {
						this._refreshHead(true);
					}
					if (bSummRowDraw) {
						this._refreshSumm(true);
					}
				}
			}
			else {
				if (this._isMultiSelect()) {
					this._refreshBody(true, true);

					if (bHeadRowDraw) {
						this._refreshHead(true);
					}
					if (bSummRowDraw) {
						this._refreshSumm(true);
					}
				}
			}
		}
		else {
			if (newPos < 0 && (kind && kind.indexOf("func") < 0)) {
				if (bAllRowDraw) {
					if (!this._clearRows(oldrows)) {
						this._refreshBody(true, true);
					}
				}
				else {
					this._refreshBodyCell(beforeCell, oldPos - this._getBodyBegRowPos(oldPos));
				}

				if (bHeadRowDraw) {
					this._refreshHead(true);
				}
				if (bSummRowDraw) {
					this._refreshSumm(true);
				}
			}
			else if (newPos != oldPos || afterCell != beforeCell) {
				if (kind != "selectorsizing") {
					this._jumpCurrentRow(newPos);
					var cellobj;

					if (newPos == -1) {
						cellobj = this._getCurrentHeadCell(-1);
					}
					else if (newPos == -2) {
						cellobj = this._getCurrentSummCell(-1);
					}
					else {
						cellobj = this._getCurrentBodyCell(-1, -1);
					}

					if (cellobj) {
						var area = cellobj._refobj._area;
						var select_ctrl = this._select_ctrl;

						if (select_ctrl && select_ctrl._is_tracking) {
							if (area == "body") {
								cellobj.parent._showfull(cellobj);
							}
							else if (area == "left") {
								if (this.hscrollbar) {
									this.hscrollbar.set_pos(0);
								}
							}
							else {
								var scroll_max = this._getScollMaxLeft();

								if (this.hscrollbar) {
									this.hscrollbar.set_pos(scroll_max);
								}
							}
						}
						else if (!kind) {
							cellobj.parent._showfull(cellobj);
						}
						else if (kind == "keydown") {
							cellobj._showfull(true);
						}
					}
				}

				if (this._isAreaSelect()) {
					if (kind == "selectorsizing") {
						if (nexacro.OS == "Android" && (nexacro.Browser == "Safari" || nexacro.Browser == "MobileSafari")) {
							nexacro.OnceCallbackTimer.callonce(this, function () {
								this._refreshBody(true, true);
							}, 10);
						}
						else {
							this._refreshBody(true, true);
						}
					}
					else {
						this._refreshBody(true, true);

						if (bHeadRowDraw) {
							this._refreshHead(true);
						}
						if (bSummRowDraw) {
							this._refreshSumm(true);
						}
					}
				}
				else {
					if (bAllRowDraw) {
						this._clearRows(oldrows);

						this._refreshBody(true, true);
					}
					else {
						this._refreshBodyCell(beforeCell, oldPos - this._getBodyBegRowPos(oldPos));
						this._refreshBodyCell(afterCell, newPos - this._getBodyBegRowPos(newPos));
					}

					if (bHeadRowDraw) {
						this._refreshHead(true);
					}
					if (bSummRowDraw) {
						this._refreshSumm(true);
					}
				}
			}
			else {
				if (this._isAreaSelect()) {
					if (kind == "selectorsizing") {
						if (nexacro.OS == "Android" && (nexacro.Browser == "Safari" || nexacro.Browser == "MobileSafari")) {
							nexacro.OnceCallbackTimer.callonce(this, function () {
								this._refreshBody(true, true);
							}, 10);
						}
						else {
							this._refreshBody(true, true);
						}
					}
					else {
						this._refreshBody(true, true);

						if (bHeadRowDraw) {
							this._refreshHead(true);
						}
						if (bSummRowDraw) {
							this._refreshSumm(true);
						}
					}
				}
				else if (this._isMultiSelect()) {
					if (bAllRowDraw) {
						this._clearRows(oldrows);

						this._refreshBody(true, true);
					}
					else {
						this._refreshBodyCell(afterCell, newPos - this._getBodyBegRowPos(newPos));
					}

					if (bHeadRowDraw) {
						this._refreshHead(true);
					}
					if (bSummRowDraw) {
						this._refreshSumm(true);
					}
				}
			}
		}

		this._adjustOverlayElements(false, this._is_use_fakemerge);
		this._updateSelector();
	};

	_pGrid._isUseBindExprStyle = function (bandstr) {
		return this._is_use_bind_expr_style[bandstr];
	};
	_pGrid._isUseBindExprOuterStyle = function (bandstr) {
		return this._is_use_bind_expr_outerstyle[bandstr];
	};
	_pGrid._getUseBindExprProp = function (bandstr) {
		var band;
		var cells;
		var format = this._curFormat;

		if (bandstr == "summary") {
			bandstr = "summ";
		}

		if (this._is_use_bind_expr_prop[bandstr] !== null) {
			return this._is_use_bind_expr_prop[bandstr];
		}

		this._is_use_bind_expr_prop[bandstr] = undefined;

		if (bandstr == "body") {
			band = this._bodyBand;
			cells = format._bodycells;
		}
		else if (bandstr == "head") {
			band = this._headBand;
			cells = format._headcells;
		}
		else {
			band = this._summBand;
			cells = format._summcells;
		}

		if (band) {
			var key;

			for (var i = 0; i < cells.length; i++) {
				var obj = cells[i];
				for (key in obj) {
					if (obj.hasOwnProperty(key)) {
						if (bandstr == "body" && key == "text") {
							continue;
						}

						if (obj[key] && obj[key]._bindtype > 0) {
							if (this._is_use_bind_expr_prop[bandstr] == undefined) {
								this._is_use_bind_expr_prop[bandstr] = [];
							}

							this._is_use_bind_expr_prop[bandstr].push(i);
							break;
						}
					}
				}
			}
		}
		return this._is_use_bind_expr_prop[bandstr];
	};

	_pGrid._clearBindTypeFlag = function () {
		this._is_use_bind_expr_prop.body = null;
		this._is_use_bind_expr_prop.head = null;
		this._is_use_bind_expr_prop.summ = null;
	};
	_pGrid._toggleVal = function (datarow, cellinfo) {
		if (!cellinfo) {
			return false;
		}

		var v = cellinfo._getValue(datarow);
		v = nexacro._toBoolean(v);
		v = (v) ? 0 : 1;

		if (cellinfo.text._bindtype == 1) {
			this._dsEventOccured = true;
			var retn = this._binddataset.setColumn(datarow, cellinfo.text._bindexpr, v);
			if (nexacro._enableaccessibility) {
				var cellobj = this._getAccessibilityCurrentCell();
				if (cellobj) {
					cellobj._setAccessibilityStatChecked(nexacro._toBoolean(v));
				}
			}
			this._dsEventOccured = false;
			return retn;
		}
		return false;
	};

	_pGrid._isEditorKeyAction = function (elem, comp, keyCode, altKey, ctrlKey, shiftKey) {
		if (this._is_editor_keyaction == false) {
			this._is_editor_keyaction = true;
			return true;
		}

		if (elem instanceof nexacro.InputElement || elem instanceof nexacro.TextAreaElement) {
			if (elem.readonly == true) {
				return false;
			}

			if (keyCode == nexacro.Event.KEY_LEFT) {
				if (ctrlKey || shiftKey || altKey) {
					return true;
				}

				var pos = elem.getElementCaretPos();

				if ((pos && pos != -1) && pos.begin != 0) {
					return true;
				}
			}
			else if (keyCode == nexacro.Event.KEY_RIGHT) {
				if (ctrlKey || shiftKey || altKey) {
					return true;
				}

				var pos = elem.getElementCaretPos();
				var elem_val = elem.getElementValue();
				var v = elem_val ? elem_val.length : 0;

				if ((pos && pos != -1) && pos.begin != v) {
					return true;
				}
			}
			else if (keyCode == nexacro.Event.KEY_UP) {
				if (ctrlKey || shiftKey || altKey) {
					return true;
				}

				if (elem.usemultiline) {
					var line = elem.getCaretLine();

					if (line != 1) {
						return true;
					}
				}
			}
			else if (keyCode == nexacro.Event.KEY_DOWN) {
				if (ctrlKey || shiftKey || altKey) {
					return true;
				}

				if (elem.usemultiline) {
					var line = elem.getCaretLine();

					comp = elem.parent.linkedcontrol;
					var max_line = parseInt(comp._getTextLine());

					if (line != max_line) {
						return true;
					}
				}
			}
		}
		return false;
	};

	_pGrid._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		if (nexacro._enableaccessibility && nexacro._accessibilitytype == 5) {
			this._accept_arrow = true;
		}

		return {
			want_tab : this._acceptstab, 
			want_return : false, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : this._accept_arrow
		};
	};

	_pGrid._getFirstEditableCell = function () {
		var cellinfo, editType;

		if (this._binddataset && this._curFormat && this._curFormat._bodycells) {
			var rlen = this._getGridRowCount();
			var clen = this._curFormat._bodycells.length;

			for (var i = 0; i < rlen; i++) {
				for (var j = 0; j < clen; j++) {
					var row = i;
					if (this._hasTree) {
						row = this._treeIndexes[row];
					}

					editType = this._curFormat._bodycells[j]._getEdittype(row);

					if (editType !== "" && editType !== "none") {
						return {
							row : row, 
							cell : j
						};
					}
				}
			}
		}
		return {
			row : null, 
			cell : null
		};
	};

	_pGrid._getLastEditableCell = function () {
		var cellinfo, editType;

		if (this._binddataset) {
			var rlen = this._getGridRowCount();
			var clen = this._curFormat._bodycells.length;
			for (var i = rlen - 1; i >= 0; i--) {
				for (var j = clen - 1; j >= 0; j--) {
					var row = i;
					if (this._hasTree) {
						row = this._treeIndexes[row];
					}

					editType = this._curFormat._bodycells[j]._getEdittype(row);

					if (editType !== "" && editType !== "none") {
						return {
							row : row, 
							cell : j
						};
					}
				}
			}
		}
		return {
			row : null, 
			cell : null
		};
	};

	_pGrid._isChar = function (keyCode) {
		switch (keyCode) {
			case 9:
			case 25:
			case 27:
			case 144:
			case 145:
				return false;
				break;
		}
		;

		if ((keyCode >= 16 && keyCode <= 21) || (keyCode >= 33 && keyCode <= 40) || (keyCode >= 91 && keyCode <= 93) || (keyCode >= 112 && keyCode <= 123)) {
			return false;
		}

		return true;
	};

	_pGrid._ReasonRefresh = null;
	_pGrid.on_apply_cell_pseudo = function (cellobj, pseudo) {
		this._ReasonRefresh = 1;
		cellobj._ReasonRefresh = 1;

		if (this.enableredraw) {
			if (this._isSelectRowType()) {
				if (this.useselcolor == false && cellobj._selected) {
					if (this._mouseovercell && (this._mouseovercell._rowidx == cellobj._rowidx)) {
						pseudo = "mouseover";
					}
				}

				if (pseudo == "mouseover") {
					this._refreshBodyRow(cellobj._getDisplayRowIdx(), pseudo, cellobj.enable);
				}
				else {
					cellobj._ReasonRefresh = null;
					cellobj._control_pseudo = "";
					cellobj._contents_pseudo = "";
					this._refreshBodyRow(cellobj._getDisplayRowIdx(), pseudo, cellobj.enable);
				}

				this._adjustOverlayElements(false, this._is_use_fakemerge);
			}
		}
		cellobj._ReasonRefresh = null;
		this._ReasonRefresh = null;
	};

	_pGrid._setDSEventHandlers = function (ds) {
		ds._setEventHandler("onload", this.on_dsnotify_onload, this);
		ds._setEventHandler("onrowposchanged", this.on_dsnotify_onrowposchanged, this);
		ds._setEventHandler("oncolumnchanged", this.on_dsnotify_oncolumnchanged, this);
		ds._setEventHandler("onrowsetchanged", this.on_dsnotify_onrowsetchanged, this);
	};

	_pGrid._removeDSEventHandlers = function (ds) {
		ds._removeEventHandler("onload", this.on_dsnotify_onload, this);
		ds._removeEventHandler("onrowposchanged", this.on_dsnotify_onrowposchanged, this);
		ds._removeEventHandler("oncolumnchanged", this.on_dsnotify_oncolumnchanged, this);
		ds._removeEventHandler("onrowsetchanged", this.on_dsnotify_onrowsetchanged, this);
	};

	_pGrid._getBodyClientSize = function () {
		var format = this._curFormat;
		var height = 0, width = 0, clientrect;
		clientrect = this._getAvailableRect(this);
		width = clientrect.width;
		height = clientrect.height;

		if (format) {
			if (!this._bodyBand) {
				clientrect = this._getAvailableRect(this);
				width = clientrect.width - format.leftWidth - format.rightWidth;
				height = clientrect.height - this._getHeadHeight() - this._getSummHeight();
			}
			else {
				clientrect = this._getAvailableRect(this._bodyBand);
				width = clientrect.width - format.leftWidth - format.rightWidth;
				height = clientrect.height;
			}
		}
		return [width, height];
	};

	_pGrid._applyAutofittype = function (redraw, property_set) {
		if (this.enableredraw == false) {
			this._enable_redraw_history["autofit"] = [redraw, property_set];
			return;
		}

		var format = this._curFormat;
		var control_elem = this.getElement();

		if (!format || !control_elem) {
			return;
		}

		var height, width;
		var bodysize = this._getBodyClientSize();

		width = bodysize[0];
		height = bodysize[1];

		if (!this._is_created && (width <= 0 || height <= 0)) {
			width = control_elem.client_width;
			height = control_elem.client_height;
		}

		var change = false;

		switch (this.autofittype) {
			case "col":
				this._colautofit = true;
				this._rowautofit = false;
				break;
			case "row":
				this._colautofit = false;
				this._rowautofit = true;
				break;
			case "both":
				this._colautofit = true;
				this._rowautofit = true;
				break;
			case "allrow":
				this._colautofit = false;
				break;
			case "allboth":
				this._colautofit = true;
				break;
			case "col,allrow":
				this._colautofit = true;
				break;
			case "allpivot":
				this._colautofit = true;
				break;
			case "row,allpivot":
				this._colautofit = false;
				break;
			case "none":
				this._colautofit = false;
				this._rowautofit = false;
				change = property_set;
				break;
		}

		if (this._colautofit && width >= 0) {
			change = format._adjustColWidth(width, this._autofitcol_rate);
		}

		if (change) {
			if (redraw) {
				this._autofiting = true;

				if (this._bodyBand) {
					var scrollheight = this._bodyBand._scrollHeight;
					var scrollwidth = this._bodyBand._scrollWidth;

					if (this._colautofit) {
						if (width != scrollwidth) {
							this._setScrollMaxSize(width, scrollheight);
							this._bodyBand._scrollWidth = width;
						}
						this._bodyBand._matrix._adjustColsDisplay(true);
					}
					else {
						this._setScrollMaxSize(format.bodyWidth, scrollheight);
						this._bodyBand._scrollWidth = format.bodyWidth;
						this._bodyBand._matrix._adjustColsDisplay(true);
					}
				}
				if (this._headBand) {
					this._headBand._matrix._adjustColsDisplay(true);
				}
				if (this._summBand) {
					this._summBand._matrix._adjustColsDisplay(true);
				}

				this._autofiting = false;
			}
			this._applyResizer();
			return true;
		}
		return false;
	};

	_pGrid._resetColSizeList = function (chk_srow) {
		var change = false;

		if (this.autofittype != "col" && this.autofittype != "both" && this.autofittype != "allboth" && this.autofittype != "col,allrow") {
			var format = this._curFormat;

			if (!format) {
				return false;
			}

			var cols = format._cols, colsLen = cols.length;

			if (this.autosizingtype == "col" || this.autosizingtype == "both") {
				for (var i = 0; i < colsLen; i++) {
					var size = this._getMaxColDataSizeBand(i, chk_srow);

					if (size >= 0 && this._setColSize(-9, i, size, false, false, true, (i != colsLen - 1))) {
						change = true;
					}
				}

				if (this.autofittype == "col" || this.autofittype == "both" || this.autofittype == "allboth" || this.autofittype == "col,allrow") {
					this._applyAutofittype(true);
				}
			}
			else {
				for (var i = 0; i < colsLen; i++) {
					var size = cols[i].size;

					if (size >= 0 && this._setColSize(-9, i, size, false, false, true, (i != colsLen - 1))) {
						change = true;
					}
				}
			}
		}

		return change;
	};

	_pGrid.redraw = function () {
		if (!this.enableredraw) {
			this._enable_redraw_history["recreate"] = true;
			return;
		}

		this._recreate();

		if (this._select_ctrl) {
			this._select_ctrl._updateAll();
		}
	};

	_pGrid._getRowSizeInfo = function (datarow) {
		var format = this._curFormat;
		var rowsize, subrowsizes = [];

		if (datarow == -1) {
			rowsize = this._rowHeadList[0];
			subrowsizes = this._rowHeadListSub;

			return {
				row_size : rowsize, 
				subrow_sizes : subrowsizes
			};
		}
		else if (datarow == -2) {
			rowsize = this._rowSummList[0];
			subrowsizes = this._rowSummListSub;

			return {
				row_size : rowsize, 
				subrow_sizes : subrowsizes
			};
		}
		else if (datarow >= 0) {
			var rows = format._bodyrows;
			var rowsLen = rows.length;
			var list = this._rowSizeListSub = [];
			var listsub = this._rowSizeList = [];

			rowsize = list[datarow];

			for (var i = 0; i < rowsLen; i++) {
				subrowsizes[i] = listsub[datarow * rowsLen + i];
			}

			return {
				row_size : rowsize, 
				subrow_sizes : subrowsizes
			};
		}
		return null;
	};

	_pGrid._resetRowSizeList = function (chk_srow) {
		if (!this._curFormat) {
			return;
		}

		if (!this._preloadImage()) {
			return;
		}

		var format = this._curFormat;

		if (format._headrows) {
			var keep = this._isUserChangeHeadRowSize;

			if (!keep) {
				this._rowHeadListSub = [];
				this._rowHeadList = [];
			}

			var h = 0, rows = format._headrows, rowsLen = rows.length, _rowHeadListSub = this._rowHeadListSub, _rowHeadList = this._rowHeadList, height;

			if (!(keep && _rowHeadList[0] >= 0)) {
				if (this._binddataset && this._headAutoSize && (this._autoSizeRowProc || this.autosizingtype == "row" || this.autosizingtype == "both")) {
					for (var j = 0; j < rowsLen; j++) {
						height = this._getMaxSubRowSize(-1, j);
						_rowHeadListSub[j] = height;
						h += height;
					}
				}
				else {
					for (var j = 0; j < rowsLen; j++) {
						height = rows[j].size;
						_rowHeadListSub[j] = height;
						h += height;
					}
				}
				this._rowHeadList[0] = h;
			}
		}

		if (format._summrows) {
			var keep = this._isUserChangeSummRowSize;

			if (!keep) {
				this._rowSummListSub = [];
				this._rowSummList = [];
			}

			var h = 0, rows = format._summrows, rowsLen = rows.length, _rowSummListSub = this._rowSummListSub, _rowSummList = this._rowSummList, height;

			if (!(keep && _rowSummList[0] >= 0)) {
				if (this._binddataset && this._summAutoSize && (this._autoSizeRowProc || this.autosizingtype == "row" || this.autosizingtype == "both")) {
					for (var j = 0; j < rowsLen; j++) {
						height = this._getMaxSubRowSize(-2, j);
						_rowSummListSub[j] = height;
						h += height;
					}
				}
				else {
					for (var j = 0; j < rowsLen; j++) {
						height = rows[j].size;
						_rowSummListSub[j] = height;
						h += height;
					}
				}
				this._rowSummList[0] = h;
			}
		}

		if (format._bodyrows) {
			var keep = this._isUserChangeBodyRowSize;

			if (!keep && !chk_srow) {
				this._rowSizeList = [];
				this._rowSizeListSub = [];
			}

			var rowcount = this._rowcount, rows = format._bodyrows, rowsLen = rows.length, _rowSizeListSub = this._rowSizeListSub, _rowSizeList = this._rowSizeList, h, height;

			if (this._binddataset && this._bodyAutoSize && (this._autoSizeRowProc || this.autosizingtype == "row" || this.autosizingtype == "both")) {
				for (var i = 0; i < rowcount; i++) {
					if (keep && _rowSizeList[i] >= 0) {
						continue;
					}

					if (chk_srow >= 0 && i < chk_srow) {
						continue;
					}

					h = 0;

					for (var j = 0; j < rowsLen; j++) {
						height = this._getMaxSubRowSize(i, j);
						_rowSizeListSub.push(height);
						h += height;
					}
					_rowSizeList[i] = h;
				}
				this._is_variable_bodyrowsize = true;
			}
			else {
				for (var i = 0; i < rowcount; i++) {
					if (keep && _rowSizeList[i] >= 0) {
						continue;
					}

					h = 0;

					for (var j = 0; j < rowsLen; j++) {
						height = rows[j].size;
						_rowSizeListSub.push(height);
						h += height;
					}
					_rowSizeList[i] = h;
				}

				if (!keep) {
					this._is_variable_bodyrowsize = false;
				}
			}
		}

		this._updateRowSizeExtend();
	};

	_pGrid._updateRowSizeExtendEx = function (rows, rowSizeList, rowSizeListSub, row, isbody) {
		if (this.extendsizetype != "row" && this.extendsizetype != "both") {
			if (!rows) {
				return;
			}

			var max = [];
			var rowsLen = rows.length;

			for (var j = 0; j < rowsLen; j++) {
				max[j] = 0;
			}

			var rowSizeListSubLen = rowSizeListSub.length;

			if (row != undefined) {
				for (var i = 0; i < rowsLen; i++) {
					max[i] = rowSizeListSub[row * rowsLen + i];
				}
			}
			else {
				for (var i = 0; i < rowSizeListSubLen; ) {
					for (var j = 0; j < rowsLen; j++) {
						max[j] = Math.max(max[j], rowSizeListSub[i]);
						i++;
					}
				}
			}
			for (var i = 0; i < rowSizeListSubLen; ) {
				for (var j = 0; j < rowsLen; j++) {
					rowSizeListSub[i] = max[j];
					i++;
				}
			}
			var height = 0;

			for (var j = 0; j < rowsLen; j++) {
				height += max[j];
			}

			var rowSizeListLen = rowSizeList.length;

			for (var i = 0; i < rowSizeListLen; i++) {
				rowSizeList[i] = height;
			}
		}

		if (isbody) {
			this._resetFixSize();
		}
	};

	_pGrid._updateRowSizeExtend = function () {
		if (!this._binddataset || !this._curFormat) {
			return;
		}
		if (this._headAutoSize) {
			this._updateRowSizeExtendEx(this._curFormat._headrows, this._rowHeadList, this._rowHeadListSub);
		}
		if (this._summAutoSize) {
			this._updateRowSizeExtendEx(this._curFormat._summrows, this._rowSummList, this._rowSummListSub);
		}
		if (this._bodyAutoSize) {
			this._updateRowSizeExtendEx(this._curFormat._bodyrows, this._rowSizeList, this._rowSizeListSub, undefined, true);
		}
	};

	_pGrid._isChangeBodyColSizeList = function (columnid, cols, row) {
		if (this.autosizingtype != "both" && this.autosizingtype != "col") {
			return false;
		}

		var format = this._curFormat;
		if (!this._binddataset || !format) {
			return false;
		}

		var cells = format._bodycells;
		var colinfo, col, size, j = 0;
		var retn = false;
		var displayType;

		for (var i = 0; i < cells.length; i++) {
			if (cells[i].text._bindexpr == columnid) {
				displayType = cells[i]._getAttrValue(cells[i].displaytype, row);

				if (displayType == "checkbox") {
					continue;
				}

				col = cells[i]._col;
				colinfo = format._cols[col];
				size = this._getMaxColDataSizeBand(col);

				if (colinfo.size != size) {
					format._setColSize(col, size);
					cols[j++] = col;
					retn = true;
				}
			}
		}
		return retn;
	};

	_pGrid._isChangeBodyRowSizeList = function (rowposition) {
		if (this._rowSizeEx == false && this.autosizingtype != "both" && this.autosizingtype != "row") {
			return false;
		}

		if (!this._binddataset || !this._curFormat) {
			return false;
		}

		var row = rowposition;
		var rows = this._curFormat._bodyrows;
		var rowsLen;

		if (rows && this._bodyAutoSize == true) {
			rowsLen = rows.length;
			for (var j = 0; j < rowsLen; j++) {
				var index = (row * rows.length) + j;
				var oldsize = this._rowSizeListSub[index];
				var newsize = this._getMaxSubRowSize(row, j);

				if (oldsize != newsize) {
					return true;
				}
			}
		}

		rows = this._curFormat._headrows;

		if (rows && this._headAutoSize == true) {
			rowsLen = rows.length;

			for (var j = 0; j < rowsLen; j++) {
				var oldsize = this._rowHeadListSub[j];
				var newsize = this._getMaxSubRowSize(-1, j);

				if (oldsize != newsize) {
					return true;
				}
			}
		}

		rows = this._curFormat._summrows;

		if (rows && this._summAutoSize == true) {
			rowsLen = rows.length;

			for (var j = 0; j < rowsLen; j++) {
				var oldsize = this._rowSummListSub[j];
				var newsize = this._getMaxSubRowSize(-2, j);

				if (oldsize != newsize) {
					return true;
				}
			}
		}
		return false;
	};

	_pGrid._updateBodyRowSizeList = function (rowposition) {
		var change = false;
		if (this._rowSizeEx == false || this._bodyAutoSize == false) {
			return false;
		}

		if (!this._binddataset || !this._curFormat || !this._curFormat._bodyrows || this._curFormat._bodyrows.length == 0) {
			return false;
		}

		var row = rowposition;
		var rows = this._curFormat._bodyrows;
		var rowsLen = rows.length;

		for (var j = 0; j < rowsLen; j++) {
			var index = (row * rows.length) + j;
			var oldsize = this._rowSizeListSub[index];
			var newsize = this._getMaxSubRowSize(row, j);

			if (oldsize != newsize) {
				this._rowSizeListSub[index] = newsize;
				this._rowSizeList[row] += (newsize - oldsize);
				change = true;
			}
		}
		if (change == true) {
			this._updateRowSizeExtend();
		}
		return change;
	};

	_pGrid._getGridRowCount = function (isOnlyScreen) {
		if (isOnlyScreen && this._bodyrowheight === 0) {
			return 0;
		}

		var rowcount = 0;
		if (this._hasTree) {
			if (this._treeIndexes) {
				rowcount = this._treeIndexes.length;
			}
		}
		else {
			rowcount = this._rowcount;
		}
		return rowcount;
	};

	_pGrid._resetDisplayInfo = function (page, reset_bandsize) {
		this.pagerowcount = 0;
		this._pagerowcnt = 0;
		this._disprowcnt = 0;

		var format = this._curFormat;

		if (!format) {
			return;
		}

		var bodysize = this._getBodyClientSize();
		var bodyHeight = bodysize[1];
		var rowcount = this._getGridRowCount();
		var format = this._curFormat;
		this._bodyrowheight = format._body_height;

		if (rowcount > 0) {
			if (this._is_variable_bodyrowsize == false) {
				if (this._bodyrowheight == 0) {
					return;
				}

				var format = this._curFormat;
				var bodyRowHeight = this._bodyrowheight;
				this.pagerowcount = Math.floor(bodyHeight / bodyRowHeight);
				this._pagerowcnt = Math.ceil(bodyHeight / bodyRowHeight);
				this._disprowcnt = this._pagerowcnt * page;
			}
			else {
				var _vpos = (this.vscrollbar) ? this.vscrollbar._pos : 0;
				var vlimit = this._control_element.vscroll_limit;

				if (_vpos < 0) {
					_vpos = 0;
				}
				else if (_vpos > vlimit) {
					_vpos = vlimit;
				}

				var s, i, toprowpos = this._getScreenTopRowPos(_vpos);
				var remain = 0;

				if (reset_bandsize) {
					s = i = toprowpos[0];
					remain = toprowpos[1];
				}
				else {
					s = i = (toprowpos[1] > 0) ? toprowpos[0] + 1 : toprowpos[0];
				}

				var h = 0;
				var row;
				var add = true;

				for (; i < rowcount; i++) {
					row = this._getDataRow(i);
					h += this._rowSizeList[row];

					if (remain > 0) {
						h -= (this._rowSizeList[row] - remain);
						remain = 0;
					}

					if (add) {
						this._pagerowcnt++;
					}

					this._disprowcnt++;

					if (h >= bodyHeight) {
						add = false;
					}
					if (h >= bodyHeight * page) {
						break;
					}

					if (add) {
						this.pagerowcount++;
					}
				}

				if (i == rowcount && h < bodyHeight) {
					var end = (this._fixed_endrow >= 0) ? this._fixed_endrow : -1;
					for (var i = s - 1; i > end; i--) {
						row = this._getDataRow(i);
						h += this._rowSizeList[row];

						if (add) {
							this._pagerowcnt++;
						}

						this._disprowcnt++;

						if (h >= bodyHeight) {
							add = false;
						}
						if (h >= bodyHeight * page) {
							break;
						}

						if (add) {
							this.pagerowcount++;
						}
					}
				}

				if (this._disprowcnt == 0 && toprowpos[1] >= bodyHeight) {
					this._pagerowcnt = this.pagerowcount = this._disprowcnt = 1;
				}
			}
		}
	};

	_pGrid._getMaxColSize = function (cells, colidx, row, parentcol, maxbyte) {
		var max = 0;
		var cellsLen = cells.length;
		var cursubcol, subcolcnt, subcells;
		var format = this._curFormat;
		var maxlength = 0;
		var col, colspan;

		for (var i = 0; i < cellsLen; i++) {
			col = cells[i]._col;
			colspan = cells[i]._colspan;

			if (col <= colidx && col + colspan > colidx) {
				subcells = cells[i]._subcells;

				if (subcells.length > 0) {
					var subsize = this._getMaxColSize(subcells, colidx - col, row, colidx, maxbyte);
					max = Math.max(max, subsize);
				}
				else {
					if (colspan > 1) {
						if (col + colspan - 1 != colidx) {
							continue;
						}
					}

					if (!parentcol) {
						parentcol = 0;
					}

					var treesize = 0;

					if (this._hasTree) {
						treesize = this._getDepthWidth(row, cells[i]);
					}

					if (treesize < 0) {
						return -1;
					}

					var autosizecol = cells[i]._getAttrValue(cells[i].autosizecol, row);
					var formatsize = format._cols[colidx + parentcol].orgsize;
					var size;

					if (autosizecol == "none") {
						size = formatsize;
					}
					else {
						var displayType = cells[i]._getAttrValue(cells[i].displaytype, row);
						if (displayType == "checkbox") {
							var controlSize = cells[i]._query_pseudo_control(this, row, "checkboxsize", "buttonsize", "normal");

							if (controlSize == null) {
								controlSize = 14;
							}
							else {
								controlSize = parseInt(controlSize._value, 10);
							}

							size = controlSize + 6;
						}
						else {
							var text = cells[i]._getDisplayText(row);

							if (maxbyte && colspan == 1) {
								var re_newline = /\r\n|\n|\r/;
								var lines = text.split(re_newline);
								var lcnt = lines.length;
								var nbyte, max_byte = 0, max_len = 0;

								for (var j = 0; j < lcnt; j++) {
									nbyte = this._getByteLength_UTF8(lines[j]);
									max_len = Math.max(max_len, lines[j].length);
									max_byte = Math.max(max_byte, nbyte);
								}

								if (maxbyte.max > max_byte && maxbyte.len > max_len) {
									continue;
								}

								maxbyte.len = max_len;
								maxbyte.max = max_byte;
							}

							size = this._getCellRowTextSize(cells[i], row, text);
							size = size[0];
						}

						var padd = cells[i]._curpadding, bord = cells[i]._curborder;

						if (padd === "bindexpr" || padd === undefined) {
							padd = cells[i]._query_pseudo_padding(row, "normal");
						}

						if (bord === "bindexpr" || bord === undefined) {
							bord = cells[i]._query_pseudo_border(row, false, "normal", 0, null, null);
						}

						size += (padd) ? (padd.left + padd.right) : 0;
						size += (bord && bord.bottom_width) ? parseInt(bord.bottom_width) : 0;
						size += treesize;

						if (autosizecol == "limitmin") {
							if (size < formatsize) {
								size = formatsize;
							}
						}
						else if (autosizecol == "limitmax") {
							if (size > formatsize) {
								size = formatsize;
							}
						}

						if (colspan > 1) {
							var t_colsize = 0;
							var s = col, e = col + colspan - 1;

							for (var j = s; j < e; j++) {
								t_colsize += format._cols[j + parentcol].size;
							}
							size -= t_colsize;
						}
					}
					max = Math.max(max, size);
				}
			}
		}
		return max + 1;
	};

	_pGrid._getCellRowTextSize = function (cellinfo, rowidx, text) {
		var font = cellinfo._curfont, select_font = cellinfo._curselfont;
		var letterspace = cellinfo._query_pseudo_letterspace(rowidx, false, "normal");
		var word = cellinfo._getWordwrap(rowidx);
		var size = [], size1, size2;

		if (font === undefined) {
			font = cellinfo._query_pseudo_font(rowidx, false, "normal");
			size1 = nexacro._getTextSize2(letterspace, "A", font);

			if (cellinfo._curfont !== "bindexpr") {
				cellinfo._cur1font_size = size1;
			}
		}
		else {
			if (font === "bindexpr") {
				font = cellinfo._query_pseudo_font(rowidx, false, "normal");
				size1 = nexacro._getTextSize2(letterspace, "A", font);
			}
			else if (!(size1 = cellinfo._cur1font_size)) {
				size1 = nexacro._getTextSize2(letterspace, "A", font);
				cellinfo._cur1font_size = size1;
			}
		}

		if (select_font === undefined) {
			select_font = cellinfo._query_pseudo_font(rowidx, true, "normal");
			size2 = nexacro._getTextSize2(letterspace, "A", select_font);

			if (cellinfo._curselfont !== "bindexpr") {
				cellinfo._cur1selectfont_size = size2;
			}
		}
		else {
			if (select_font === "bindexpr") {
				select_font = cellinfo._query_pseudo_font(rowidx, true, "normal");
				size2 = nexacro._getTextSize2(letterspace, "A", select_font);
			}
			else if (!(size2 = cellinfo._cur1selectfont_size)) {
				size2 = nexacro._getTextSize2(letterspace, "A", select_font);
				cellinfo._cur1selectfont_size = size2;
			}
		}

		var default_height, defalut_width;

		if (!text) {
			if (size1[0] <= size2[0]) {
				size = [].concat(size2);
			}
			else {
				size = [].concat(size1);
			}

			size[0] = 1;
			return size;
		}
		else {
			if (size1[0] <= size2[0]) {
				font = select_font;
				defalut_width = size2[0];
				default_height = size2[1];
			}
			else {
				defalut_width = size1[0];
				default_height = size1[1];
			}
		}

		var displayType = cellinfo._getAttrValue(cellinfo.displaytype, rowidx);

		if (displayType == "image") {
			var str = "row" + rowidx;
			var tempWidthsize = cellinfo._imgWidthTemp[str];
			var tempHeightsize = cellinfo._imgHeightTemp[str];

			if (tempWidthsize > 0) {
				size[0] = tempWidthsize;
				size[1] = tempHeightsize;
			}
			else {
				url = nexacro._getURIValue(text);
				url = nexacro._getImageLocation(url, this._getRefFormBaseUrl());

				var imgsize = nexacro._getImageSize(url, this._on_sizeloading, this, undefined, text);

				if (imgsize) {
					size[0] = imgsize.width;
					size[1] = imgsize.height;
				}
				else {
					size[0] = 1;
					size[1] = default_height;
				}
			}
			return size;
		}
		else {
			var usewordwrap = true;

			if (this.autosizingtype == "col" || this.autosizingtype == "both") {
				usewordwrap = false;
			}

			if (usewordwrap && (this._autoSizeRowProc || this._rowSizeEx) && word != "none" && word != false && word != "false") {
				var cols = this._curFormat._cols;
				var width = cols[cellinfo._col + cellinfo._colspan - 1].right - cols[cellinfo._col].left;
				var padd = cellinfo._query_pseudo_padding(rowidx, "normal");
				var bord = cellinfo._query_pseudo_border(rowidx, false, "normal", 0, null, null);
				var select_bord = cellinfo._query_pseudo_border(rowidx, true, "normal", 0, null, null);

				bord = (bord.right_width < select_bord.right_width) ? select_bord : bord;

				width -= (padd.left + padd.right);
				width -= bord.right_width ? parseInt(bord.right_width) : 0;

				size = nexacro._getTextSize2(letterspace, text, font, true, width, word);
			}
			else {
				size = nexacro._getTextSize2(letterspace, text, font, true);
			}

			if (size[1] < default_height) {
				size[1] = default_height;
			}
			return size;
		}
	};

	_pGrid._getMaxSubRowSize = function (rowidx, subrowidx, cells, parentrow) {
		var format = this._curFormat;
		var bandrows;

		if (rowidx == -2) {
			if (!cells) {
				cells = this._curFormat._summcells;
			}
			;

			bandrows = format._summrows;
		}
		else if (rowidx == -1) {
			if (!cells) {
				cells = this._curFormat._headcells;
			}

			bandrows = format._headrows;
		}
		else {
			if (!cells) {
				cells = this._curFormat._bodycells;
			}

			bandrows = format._bodyrows;
		}

		var cols = this._curFormat._cols;

		if (!this._autoSizeRowProc && this.autosizingtype != "row" && this.autosizingtype != "both") {
			return bandrows[subrowidx].size;
		}

		var max = 0;
		var cellsLen = cells.length;
		var _row, _rowspan, subcells;

		for (var i = 0; i < cellsLen; i++) {
			_row = cells[i]._row;
			_rowspan = cells[i]._rowspan;
			subcells = cells[i]._subcells;

			if (_row == subrowidx || (subcells.length > 0 && _row <= subrowidx && (_row + _rowspan) > subrowidx)) {
				var maxrow = 0;
				var cursubrow = -1;
				var subrowcnt = 0;

				if (subcells.length > 0) {
					maxrow = this._getMaxSubRowSize(rowidx, subrowidx - _row, subcells, _row);
					max = Math.max(max, maxrow);
				}
				else {
					if (!parentrow) {
						parentrow = 0;
					}

					var autosizerow = cells[i]._getAttrValue(cells[i].autosizerow, rowidx);
					var formatsize = bandrows[subrowidx + parentrow].size;
					var size;

					if (autosizerow == "none") {
						size = formatsize;
					}
					else {
						var displayType = cells[i]._getAttrValue(cells[i].displaytype, _row);
						if (displayType == "checkbox") {
							var controlSize = cells[i]._query_pseudo_control(this, _row, "checkboxsize", "buttonsize", "normal");

							if (controlSize == null) {
								controlSize = 14;
							}
							else {
								controlSize = parseInt(controlSize._value, 10);
							}

							size = controlSize + 6;
						}
						else {
							var text = cells[i]._getDisplayText(rowidx);
							var s = this._getCellRowTextSize(cells[i], rowidx, text);
							size = s[1];

							var width = s[0];
							var mul = 1;
							var padd = cells[i]._curpadding, bord = cells[i]._curborder;

							if (padd === "bindexpr" || padd === undefined) {
								padd = cells[i]._query_pseudo_padding(rowidx, "normal");
							}

							if (bord === "bindexpr" || bord === undefined) {
								bord = cells[i]._query_pseudo_border(rowidx, false, "normal", 0, null, null);
							}

							size += padd.top + padd.bottom;
							size += bord.bottom_width ? parseInt(bord.bottom_width) : 0;

							if (autosizerow == "limitmin") {
								if (size < formatsize) {
									size = formatsize;
								}
							}
							else if (autosizerow == "limitmax") {
								if (size > formatsize) {
									size = formatsize;
								}
							}
						}
					}
					max = Math.max(max, size);
				}
			}
		}
		return max;
	};

	_pGrid._getSubRowSizeList = function (row) {
		var format = this._curFormat;
		var rows = format._bodyrows;
		var rowsLen = rows.length;
		var sizes = [], j = 0;

		for (var i = 0; i < rowsLen; i++) {
			sizes[j++] = this._rowSizeListSub[row * rowsLen + i];
		}

		return sizes;
	};

	_pGrid._makeCssRefInfoCtrl = function (ctrl) {
		ctrl._refcssobj = this;
		ctrl._refcssid = "#" + ctrl.id;
		return this;
	};

	_pGrid._addFuncQueue = function (work, pthis, func, args_arr) {
		var info = {
			work : work, 
			pthis : pthis, 
			func : func, 
			args : args_arr
		};
		this._func_queue.push(info);
	};
	_pGrid._exeFuncQueue = function (work) {
		var arr = this._func_queue;

		for (var i = 0; i < arr.length; i++) {
			if (arr[i].work == work) {
				arr[i].func.call(arr[i].pthis, arr[i].args);
				this._func_queue.splice(i, 1);
				i--;
			}
		}
	};

	_pGrid._addRefreshContents = function (workname, band, check) {
		if (band) {
			var arr = this._recreate_contents_proc;

			if (check) {
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].workname == workname) {
						return false;
					}
				}
			}
			var add = {
				workname : workname, 
				band : band
			};
			arr.push(add);

			return true;
		}
	};

	_pGrid._execRefreshContents = function (workname, bclearcache, noupdatesupp) {
		var arr = this._recreate_contents_proc;

		if (bclearcache && arr.length > 0) {
			this._clearAllStyleCache();
		}

		for (var i = 0; i < arr.length; i++) {
			if (arr[i].workname == workname) {
				arr[i].band._recreate_contents(true, false, false, false, noupdatesupp);
				this._recreate_contents_proc.splice(i, 1);
				i--;
			}
		}
	};
	_pGrid._applyColSizing = function (movepos, idx) {
		if (this.enableredraw == false) {
			return;
		}

		var control_elem = this.getElement();
		var format = this._curFormat;

		if (control_elem && format && idx >= 0) {
			var band = this._headBand;
			var rows = band._get_rows();
			var cellitem = rows[0]._cells[idx];
			var cellinfo = cellitem._refobj;

			var colidx = cellinfo._col + (cellinfo._colspan - 1);
			var area = format._cols[colidx]._area;

			if (cellinfo._area != "right") {
				var prevright = format._cols[colidx].left;
				var currright = format._cols[colidx].right + movepos;

				if (prevright > currright) {
					var next_col = format._cols[colidx + 1];
					if ((next_col && next_col._area == "right") || colidx == format._cols.length - 1) {
						movepos = prevright - format._cols[colidx].right + 7;
					}
					else {
						movepos = prevright - format._cols[colidx].right + 1;
					}
				}
			}
			else {
				var nextleft = format._cols[colidx].right;
				var currleft = format._cols[colidx].left + movepos;

				if (nextleft < currleft) {
					movepos = nextleft - format._cols[colidx].left - 1;
				}

				movepos = 0 - movepos;
			}

			var oldval = format._cols[colidx].size;
			var change = format._adjustColSizing(colidx, movepos);
			var newval = format._cols[colidx].size;

			if (change) {
				this._updateColSize(colidx);
				this._addFuncQueue("colsizing", this, this.on_fire_oncolresized, [colidx, -9, newval, oldval, colidx]);
			}
		}
	};

	_pGrid._applyRowSizing = function (movepos, idx) {
		if (this.enableredraw == false) {
			return;
		}

		var control_elem = this.getElement();
		var formatidx, oldval, newval;
		var format = this._curFormat;

		if (format && control_elem && idx >= 0) {
			var range = this._resizerRowRange[idx];
			var bandstr = range.area, size;
			var row = this._getDataRow(range.row);
			var subrow = range.cellinfo._row + range.cellinfo._rowspan - 1;
			var change = false;

			if (bandstr == "head") {
				oldval = this._rowHeadListSub[subrow];
				size = oldval + movepos;
				size = Math.max(size, 5);
				size = Math.min(size, this._client_height - 5);
				newval = size;

				var redraw = this.enableredraw;
				this.enableredraw = false;
				this.setRealRowSize(-1, subrow, size, true);
				this.enableredraw = redraw;
				formatidx = subrow;

				if (movepos) {
					this._resizeBand();
					this._addRefreshContents("rowsizing", this._headBand);
					change = true;
				}
			}
			else if (bandstr == "body") {
				oldval = this._rowSizeListSub[row * format._bodyrows.length + subrow];
				size = oldval + movepos;

				var gap, remain;

				if (row == this._rowcount - 1) {
					remain = 7;
				}
				else {
					remain = 1;
				}

				gap = size - remain;

				if (gap < 0) {
					size = remain;
					movepos -= gap;
				}

				newval = size;

				if (this._getFixRowCnt() > row) {
					this._fixed_height += movepos;
					this._fixedrow_height += movepos;
				}

				var redraw = this.enableredraw;
				this.enableredraw = false;
				this.setRealRowSize(row, subrow, size, true);
				this.enableredraw = redraw;
				formatidx = subrow + ((format._headrows) ? format._headrows.length : 0);

				if (movepos) {
					if (this.extendsizetype != "row" && this.extendsizetype != "both") {
						this._addRefreshContents("rowsizing", this._bodyBand);
					}
					else {
						this._updateRowSize(row, subrow);
					}
					change = true;
				}
			}
			else if (bandstr == "summ") {
				oldval = this._rowSummListSub[subrow];

				if (this.summarytype == "top" || this.summarytype == "lefttop") {
					size = oldval + movepos;
				}
				else {
					size = oldval - movepos;
				}

				size = Math.max(size, 5);
				size = Math.min(size, this._client_height - 5);
				newval = size;

				var redraw = this.enableredraw;
				this.enableredraw = false;
				this.setRealRowSize(-2, subrow, size, true);
				this.enableredraw = redraw;
				formatidx = subrow + ((format._headrows) ? format._headrows.length : 0) + ((format._bodyrows) ? format._bodyrows.length : 0);

				if (movepos) {
					this._resizeBand();
					this._addRefreshContents("rowsizing", this._summBand);
					change = true;
				}
			}

			if (change) {
				this._addFuncQueue("rowsizing", this, this.on_fire_onrowresized, [formatidx, row, newval, oldval, subrow]);
			}
		}
	};

	_pGrid._no_update_bandrect = false;
	_pGrid._updateColSize = function (col) {
		var reset_bandsize = false;
		if (this.autosizingtype == "row" || this.autosizingtype == "both") {
			this._resetRowSizeList();
			var flag = this._no_update_bandrect;
			this._no_update_bandrect = true;
			this._resizeBand();
			this._no_update_bandrect = flag;

			reset_bandsize = true;
			col = null;
		}

		this._autofitcol_rate = [];
		this._applyAutofittype(true);

		if (this._headBand) {
			this._headBand._matrix._adjustColsDisplay(true, false, col);
			this._headBand._matrix._adjustRowsDisplay(reset_bandsize);
		}

		if (this._summBand) {
			this._summBand._matrix._adjustColsDisplay(true, false, col);
			this._summBand._matrix._adjustRowsDisplay(reset_bandsize);
		}

		if (this._bodyBand) {
			var _vpos = this._getScrollTop();

			if (_vpos < 0) {
				_vpos = 0;
			}

			this._last_scroll_top = _vpos;
			this._toprowpos = this._getScreenTopRowPos(_vpos);
			this._bottomrowpos = this._getScreenBottomRowPos(_vpos);

			this._bodyBand._matrix._adjustColsDisplay(true, false, col);
			this._bodyBand._matrix._adjustRowsDisplay(reset_bandsize);

			this._bodyBand._update_rows = this._bodyBand._matrix._adjustScrollRows(_vpos, true);
			this._bodyBand._on_refresh_rows(false, true);
			this._adjustOverlayElements(false, this._is_use_fakemerge);
		}
	};

	_pGrid._updateRowSize = function (row, subrow, no_refresh_band) {
		if (this.extendsizetype != "row" && this.extendsizetype != "both") {
			return;
		}

		var format = this._curFormat;

		if (row == -1) {
			if (!this._headBand) {
				return false;
			}

			var rowctrl = this._headBand._get_rows()[0];
			var rowsize = this._rowHeadList[0];
			var subrowsize = this._rowHeadListSub[subrow];

			rowctrl.set_height(rowsize);
			rowctrl._init(format);

			var cells = rowctrl._cells;
			for (var j = 0; j < cells.length; j++) {
				if (cells[j]._refobj._row <= subrow && subrow < cells[j]._refobj._row + cells[j]._refobj._rowspan) {
					if (cells[j]._refobj._row < subrow) {
						for (var k = cells[j]._refobj._row; k < subrow; k++) {
							subrowsize += this._rowHeadListSub[k];
						}
					}

					if (cells[j]._refobj._rowspan > 1) {
						for (var k = subrow + 1; k < cells[j]._refobj._row + cells[j]._refobj._rowspan; k++) {
							subrowsize += this._rowHeadListSub[k];
						}
					}

					cells[j].set_height(subrowsize);
				}
			}

			this._resizeBand();

			if (this._bodyBand && !no_refresh_band) {
				this._bodyBand._matrix._adjustRowsDisplay();
				this._bodyBand._matrix._adjustColsDisplay();
				this._bodyBand._on_refresh_rows(false, false);
			}
		}
		else if (row == -2) {
			if (!this._summBand) {
				return false;
			}

			var rowctrl = this._summBand._get_rows()[0];
			var rowsize = this._rowSummList[0];
			var subrowsize = this._rowSummListSub[subrow];
			var summrows_len = format._summrows.length;

			rowctrl.set_height(rowsize);
			rowctrl._init(format);

			var cells = rowctrl._cells;
			for (var j = 0; j < cells.length; j++) {
				if (cells[j]._refobj._row <= subrow && subrow < cells[j]._refobj._row + cells[j]._refobj._rowspan) {
					if (cells[j]._refobj._row < subrow) {
						for (var k = cells[j]._refobj._row; k < subrow; k++) {
							subrowsize += this._rowSummListSub[k];
						}
					}

					if (cells[j]._refobj._rowspan > 1) {
						for (var k = subrow + 1; k < cells[j]._refobj._row + cells[j]._refobj._rowspan; k++) {
							subrowsize += this._rowSummListSub[k];
						}
					}

					cells[j].set_height(subrowsize);
				}
			}

			this._resizeBand();

			if (this._bodyBand && !no_refresh_band) {
				this._bodyBand._matrix._adjustRowsDisplay();
				this._bodyBand._matrix._adjustColsDisplay();
				this._bodyBand._on_refresh_rows(false, false);
			}
		}
		else if (row >= 0) {
			if (!this._bodyBand) {
				return false;
			}

			var rows = this._bodyBand._get_rows();
			var rowctrl;

			for (var i = 0; i < rows.length; i++) {
				if (rows[i]._rowidx == row) {
					rowctrl = rows[i];
					break;
				}
			}

			if (!rowctrl) {
				return false;
			}

			rowctrl._init(format);

			this._bodyBand._control_element._setFixArea(this._fixed_height);
			this._bodyBand._client_height = this._bodyBand._control_element.client_height;

			var datarow = this._getDataRow(row);
			var rowsize = this._rowSizeList[datarow];
			var rowslen = this._curFormat._bodyrows.length;
			var subrowsize = this._rowSizeListSub[datarow * rowslen + subrow];

			rowctrl.set_height(rowsize);

			var cells = rowctrl._cells;
			for (var j = 0; j < cells.length; j++) {
				if (cells[j]._refobj._row <= subrow && subrow < cells[j]._refobj._row + cells[j]._refobj._rowspan) {
					if (cells[j]._refobj._row < subrow) {
						for (var k = cells[j]._refobj._row; k < subrow; k++) {
							subrowsize += this._rowSizeListSub[datarow * rowslen + k];
						}
					}

					if (cells[j]._refobj._rowspan > 1) {
						for (var k = subrow + 1; k < cells[j]._refobj._row + cells[j]._refobj._rowspan; k++) {
							subrowsize += this._rowSizeListSub[datarow * rowslen + k];
						}
					}

					cells[j].set_height(subrowsize);
				}
			}

			var _vpos = this._getScrollTop();

			if (_vpos < 0) {
				_vpos = 0;
			}

			if (!no_refresh_band) {
				this._last_scroll_top = _vpos;
				this._toprowpos = this._getScreenTopRowPos(_vpos);
				this._bottomrowpos = this._getScreenBottomRowPos(_vpos);

				this._bodyBand._matrix._adjustRowsDisplay(true);
				this._bodyBand._matrix._adjustColsDisplay();

				this._bodyBand._update_rows = this._bodyBand._matrix._adjustScrollRows(_vpos, true);
				this._bodyBand._on_refresh_rows(false, false);
			}
		}
		else {
			return false;
		}

		this._adjustOverlayElements(false, this._is_use_fakemerge);
		return true;
	};

	_pGrid._applyResizer = function () {
		if (this.cellsizingtype == "col" || this.cellsizingtype == "both") {
			var band = this._headBand;

			if (band == null) {
				return;
			}

			var rows = band._get_rows();

			if (rows.length == 0) {
				return;
			}

			var cellcnt = rows[0]._cells.length;
			var left, top, width, height;
			var cellitem, cellborder, cellinfo, cellpos;
			var resizermark_arr = this._resizerColRange = [];
			var resizermark_range = {
			};
			var mark_idx = 0;
			var resizer_colctrl = this._resizer_colctrl;
			var format = this._curFormat;

			if (resizer_colctrl) {
				resizer_colctrl.destroy();
				delete resizer_colctrl;
			}
			resizer_colctrl = new nexacro.GridControlResizer("resizertrack", "absolute", 0, 0, 0, 0, null, null, this);

			resizer_colctrl._setDirection("horizon");
			resizer_colctrl._setTracksize(this._client_height);
			resizer_colctrl._setCallbackFn(this._applyColSizing);
			resizer_colctrl.createComponent();
			this._resizer_colctrl = resizer_colctrl;

			for (var j = 0; j < cellcnt; j++) {
				cellitem = rows[0]._cells[j];

				if (!cellitem) {
					break;
				}

				cellinfo = cellitem._refobj;
				cellpos = cellitem._setPositionInGrid(null, true, true);
				height = cellpos.height;
				cellborder = cellitem.on_find_CurrentStyle_border(cellitem._pseudo);

				if (cellinfo._area == "left" || cellinfo._area == "body") {
					width = cellborder ? cellborder._right_width : 0;
					left = cellpos.left + cellitem._adjust_width - width - 4;
				}
				else {
					width = cellborder ? cellborder._left_width : 0;
					left = cellpos.left - 2;
				}

				resizermark_range = {
					left : left, 
					top : cellpos.top, 
					right : left + width + 6, 
					bottom : cellpos.top + height, 
					index : cellitem._cellidx, 
					area : cellinfo._area
				};

				switch (this.cellsizebandtype) {
					case "body":
						if (cellinfo._area == "body") {
							resizermark_arr[mark_idx++] = resizermark_range;
						}
						break;
					case "allband":
					case "nohead":
						resizermark_arr[mark_idx++] = resizermark_range;
						break;
					case "noleft":
					case "nohead,noleft":
						if (cellinfo._area != "left") {
							resizermark_arr[mark_idx++] = resizermark_range;
						}
						break;
				}
			}
		}
		else {
			var resizer_colctrl = this._resizer_colctrl;
			if (resizer_colctrl) {
				resizer_colctrl.destroy();
				this._resizer_colctrl = null;
				this._resizerColRange = [];
			}
		}

		if (this.cellsizingtype == "row" || this.cellsizingtype == "both") {
			var head = this._headBand;
			var body = this._bodyBand;
			var summ = this._summBand;
			var rows, cellitem, cellborder, cellinfo, cellpos;

			if (!head && !body && !summ) {
				return;
			}

			var resizermark_arr = this._resizerRowRange = [];
			var resizermark_range = {
			};
			var mark_idx = 0;
			var resizer_rowctrl = this._resizer_rowctrl;

			if (resizer_rowctrl) {
				resizer_rowctrl.destroy();
				delete resizer_rowctrl;
			}

			resizer_rowctrl = new nexacro.GridControlResizer("resizertrack", "absolute", 0, 0, 0, 0, null, null, this);
			resizer_rowctrl._setDirection("vertical");
			resizer_rowctrl._setTracksize(this._client_width);
			resizer_rowctrl._setCallbackFn(this._applyRowSizing);
			resizer_rowctrl.createComponent();
			this._resizer_rowctrl = resizer_rowctrl;

			while (head) {
				if (this.cellsizebandtype == "body" || this.cellsizebandtype == "nohead" || this.cellsizebandtype == "nohead,noleft") {
					break;
				}

				rows = head._get_rows();

				if (!rows.length) {
					break;
				}

				var cell_len = rows[0]._cells.length;

				for (var i = 0; i < cell_len; i++) {
					cellitem = rows[0]._cells[i];
					cellinfo = cellitem._refobj;

					cellpos = cellitem._setPositionInGrid(null, true, true);

					width = cellitem._adjust_width;
					cellborder = cellitem.on_find_CurrentStyle_border(cellitem._pseudo);

					height = cellborder ? cellborder._bottom_width : 0;
					top = cellpos.top + cellitem._adjust_height - height - 4;

					resizermark_range = {
						left : cellpos.left, 
						top : top, 
						right : cellpos.left + width, 
						bottom : top + height + 6, 
						index : mark_idx, 
						area : "head", 
						row : cellitem._rowidx, 
						cellinfo : cellinfo
					};
					resizermark_arr[mark_idx++] = resizermark_range;
				}
				break;
			}

			if (body) {
				rows = body._get_rows();
				var rows_len = rows.length;
				var cell_len = rows_len > 0 ? rows[0]._cells.length : 0;

				for (var i = 0; i < rows_len; i++) {
					for (var j = 0; j < cell_len; j++) {
						cellitem = rows[i]._cells[j];
						cellinfo = cellitem._refobj;

						cellpos = cellitem._setPositionInGrid(null, true, true);

						width = cellitem._adjust_width;
						cellborder = cellitem.on_find_CurrentStyle_border(cellitem._pseudo);

						height = cellborder ? cellborder._bottom_width : 0;
						top = cellpos.top + cellitem._adjust_height - height - 4;

						resizermark_range = {
							left : cellpos.left, 
							top : top, 
							right : cellpos.left + width, 
							bottom : top + height + 6, 
							index : mark_idx, 
							area : "body", 
							row : cellitem._rowidx, 
							cellinfo : cellinfo
						};
						resizermark_arr[mark_idx++] = resizermark_range;
					}
				}
			}

			while (summ) {
				if (this.cellsizebandtype == "body") {
					break;
				}

				rows = summ._get_rows();

				if (!rows.length) {
					break;
				}

				var cell_len = rows[0]._cells.length;

				for (var i = 0; i < cell_len; i++) {
					cellitem = rows[0]._cells[i];
					cellinfo = cellitem._refobj;
					cellpos = cellitem._setPositionInGrid(null, true, true);
					width = cellitem._adjust_width;
					cellborder = cellitem.on_find_CurrentStyle_border(cellitem._pseudo);

					if (this.summarytype == "top" || this.summarytype == "lefttop") {
						height = cellborder ? cellborder._bottom_width : 0;
						top = cellpos.top + cellitem._adjust_height - height - 4;
					}
					else {
						height = cellborder ? cellborder._top_width : 0;
						top = cellpos.top - 2;
					}

					resizermark_range = {
						left : cellpos.left, 
						top : top, 
						right : cellpos.left + width, 
						bottom : top + height + 6, 
						index : mark_idx, 
						area : "summ", 
						row : cellitem._rowidx, 
						cellinfo : cellinfo
					};
					resizermark_arr[mark_idx++] = resizermark_range;
				}
				break;
			}
		}
		else {
			var resizer_rowctrl = this._resizer_rowctrl;
			if (resizer_rowctrl) {
				resizer_rowctrl.destroy();
				this._resizer_rowctrl = null;
				this._resizerRowRange = [];
			}
		}
	};

	_pGrid._isAreaSelect = function () {
		if (this.selecttype == "area" || this.selecttype == "multiarea") {
			return true;
		}

		return false;
	};
	_pGrid._isSelectRowType = function () {
		if (this.selecttype == "row" || this.selecttype == "multirow") {
			return true;
		}

		return false;
	};

	_pGrid._isMultiSelect = function () {
		if (this.selecttype == "multirow" || this.selecttype == "multicell" || this.selecttype == "multitreecell" || this.selecttype == "multiarea") {
			return true;
		}

		return false;
	};

	_pGrid._setColSize = function (nPivotIndex, nColIndex, nSize, bBandIndex, bRedraw, autosize, noAdjust) {
		var format = this._curFormat;

		var leftcnt = this._getColFixCnt("left");
		var bodycnt = this._getColFixCnt("body");
		var rightcnt = this._getColFixCnt("right");
		var _cols = format._cols;
		var _colsLen = _cols.length;

		var areatype = "body";

		if (nPivotIndex == -1) {
			areatype = "left";
		}
		else if (nPivotIndex == -2) {
			areatype = "right";
		}

		if (bBandIndex == true || nPivotIndex >= -2) {
			if (areatype == "body" && nColIndex >= 0) {
				nColIndex += leftcnt;
			}
			else if (areatype == "right") {
				nColIndex += leftcnt;
				nColIndex += bodycnt;
			}
		}

		var bChange = false;
		if (nColIndex == -1) {
			var change;
			for (var i = 0; i < _colsLen; i++) {
				if (autosize) {
					if (_cols[i]._area == "left" && this._AutoSizeLcol == false) {
						continue;
					}

					if (_cols[i]._area == "right" && this._AutoSizeRcol == false) {
						continue;
					}
				}

				change = format.setFormatColProperty(i, "size", nSize);

				if (change) {
					bChange = change;
				}
			}
		}
		else {
			while (true) {
				if (autosize) {
					if (_cols[nColIndex]._area == "left" && this._AutoSizeLcol == false) {
						break;
					}

					if (_cols[nColIndex]._area == "right" && this._AutoSizeRcol == false) {
						break;
					}
				}
				bChange = format._setColSize(nColIndex, nSize, noAdjust);
				break;
			}
		}

		if (bChange) {
			this._autofitcol_rate = [];
		}

		if (bRedraw && bChange) {
			this._recreate_contents_all(true, true, false);
		}
		return bChange;
	};

	_pGrid._getLastRowBand = function () {
		var format = this._curFormat;
		var band = "body";

		if (this.summarytype == "top" || this.summarytype == "lefttop") {
			if (format._headrows && format._headrows.length) {
				band = "head";
			}

			if (format._summrows && format._summrows.length) {
				band = "summ";
			}

			if (format._bodyrows && format._bodyrows.length) {
				band = "body";
			}
		}
		else {
			if (format._headrows && format._headrows.length) {
				band = "head";
			}

			if (format._bodyrows && format._bodyrows.length) {
				band = "body";
			}

			if (format._summrows && format._summrows.length) {
				band = "summ";
			}
		}
		return band;
	};

	_pGrid._getDispRowCnt = function () {
		if (this._bodyBand) {
			return this._bodyBand._get_rows().length;
		}

		return 0;
	};
	_pGrid._getScreenBottomRowPos = function (vpos) {
		if (!this._is_use_suppress) {
			return -1;
		}

		var band = this._bodyBand;
		var scrolltop = (vpos != null) ? vpos : this._getScrollTop();
		var row = -1;
		var height = 0;
		var cnt = this._getGridRowCount();
		var bandh = this._getAvailableRect(band).height;

		for (var i = 0; i < cnt; i++) {
			if (i <= this._fixed_endrow) {
				continue;
			}

			height += this._getRowSize(i);

			if (height >= scrolltop + bandh) {
				row = i;
				break;
			}
		}
		return row;
	};

	_pGrid._getScreenTopRowPos = function (vpos) {
		var band = this._bodyBand;
		var scrolltop = (vpos != null) ? vpos : this._getScrollTop();
		var row = 0;
		var height = 0;
		var cnt = this._getGridRowCount();
		var remain = 0;
		var bset = false;

		for (var i = 0; i < cnt; i++) {
			if (i <= this._fixed_endrow) {
				continue;
			}

			if (height > scrolltop) {
				row = i - 1;
				remain = height - scrolltop;
				bset = true;
				break;
			}
			height += this._getRowSize(i);
		}

		if (!bset) {
			if (band._client_height < height) {
				if (height > scrolltop) {
					row = i - 1;
					remain = height - scrolltop;
				}
			}
			else {
				row = this._getFixRowCnt();
				remain = 0;
			}
		}
		return [row, remain];
	};

	_pGrid._isRemainAreaScroll = function () {
		var band = this._bodyBand;
		var rows = band._get_rows();

		if (rows.length == 0) {
			return false;
		}

		var scrolltop = this._getScrollTop();
		var height = 0;
		var rows_len = rows.length;
		var lastrow = rows[rows_len - 1];
		var lastrowidx = this._getGridRowCount() - 1;

		if (lastrow._rowidx != lastrowidx) {
			return false;
		}

		var bodyheight = this._getBodyClientSize()[1];
		var lasttoprow = 0;

		for (var i = rows.length - 1; i >= 0; i--) {
			lasttoprow = rows[i]._rowidx;
			height += this._getRowSize(lasttoprow);

			if (height >= bodyheight) {
				break;
			}
		}

		scrolltop -= rows[0]._adjust_top;

		for (var i = 0; i < rows_len; i++) {
			if (height == scrolltop) {
				return false;
			}
			else if (height > scrolltop) {
				if (lasttoprow == rows[i]._rowidx - 1) {
					return true;
				}
				else {
					return false;
				}
			}
			height += this._getRowSize(rows[i]._rowidx);
		}
		return false;
	};

	_pGrid._getScollMaxLeft = function () {
		return this._control_element.hscroll_limit;
	};

	_pGrid._getScrollLeft = function () {
		return this._control_element.scroll_left;
	};

	_pGrid._getScrollTop = function () {
		return this._control_element.scroll_top;
	};

	_pGrid._getDataRow = function (rowidx) {
		if (rowidx >= this._rowcount) {
			return -9;
		}

		if (this._hasTree && rowidx >= 0) {
			rowidx = this._treeIndexes[rowidx];
			if (rowidx == undefined) {
				rowidx = -9;
			}
		}
		return rowidx;
	};
	_pGrid._getGridRow = function (datarow) {
		if (this._hasTree && datarow >= 0) {
			var _treeIndexes = this._treeIndexes;
			var _treeIndexesLen = _treeIndexes.length;

			for (var k = 0; k < _treeIndexesLen; k++) {
				if (_treeIndexes[k] == datarow) {
					return k;
				}
			}
			return -9;
		}
		return datarow;
	};

	_pGrid._refreshCol = function (nColIdx, clearCurstyle, strBand) {
		if (!this.enableredraw) {
			this._enable_redraw_history["refreshall"] = true;
			return;
		}
		if (!this.getElement()) {
			return;
		}

		var band = this._headBand;
		if (band && (!strBand || strBand == "head")) {
			var cells = band._get_rows()[0];
			var cellsLen = cells.length;

			for (var i = 0; i < cellsLen; i++) {
				var cell = cells[i];
				if (cell && cell._refobj._col == nColIdx) {
					if (clearCurstyle) {
						cell.currentstyle._empty();
					}
					cell._updateAll();
				}
			}
		}
		band = this._summBand;
		if (band && (!strBand || strBand == "summ")) {
			var cells = band._get_rows()[0];
			var cellsLen = cells.length;

			for (var i = 0; i < cellsLen; i++) {
				var cell = cells[i];
				if (cell && cell._refobj._col == nColIdx) {
					if (clearCurstyle) {
						cell.currentstyle._empty();
					}
					cell._updateAll();
				}
			}
		}
		band = this._bodyBand;
		var rows = band._get_rows();
		if (band && rows.length && (!strBand || strBand == "body")) {
			var cells = rows[0]._cells;
			var cellsLen = cells.length;

			for (var i = 0; i < cellsLen; i++) {
				var cell = cells[i];
				if (cell && cell._refobj._col == nColIdx) {
					for (var j = 0; j < this._getDispRowCnt(); j++) {
						this._refreshCell("body", cell._cellidx, j, clearCurstyle);
					}
				}
			}
		}
	};

	_pGrid._refreshCell = function (strBand, nCellIdx, nDisplayRowIdx, clearCurstyle) {
		if (!this.enableredraw) {
			this._enable_redraw_history["refreshall"] = true;
			return;
		}

		strBand = strBand.toLowerCase();
		if (strBand == "head") {
			var band = this._headBand;
			if (band) {
				var cell = band._get_rows()[0]._cells[nCellIdx];
				if (cell) {
					if (clearCurstyle) {
						cell.currentstyle._empty();
					}
					cell._updateAll();
				}
			}
		}
		else if (strBand == "summ" || strBand == "summary") {
			var band = this._summBand;
			if (band) {
				var cell = band._get_rows()[0]._cells[nCellIdx];
				if (cell) {
					if (clearCurstyle) {
						cell.currentstyle._empty();
					}
					cell._updateAll();
				}
			}
		}
		else {
			if (nDisplayRowIdx >= 0) {
				this._refreshBodyCell(nCellIdx, nDisplayRowIdx, clearCurstyle);
			}
			else {
				for (var i = 0; i < this._getDispRowCnt(); i++) {
					this._refreshBodyCell(nCellIdx, i, clearCurstyle);
				}
			}
		}
	};

	_pGrid._isEnable = function () {
		this._enable = nexacro.Component.prototype._isEnable.call(this);
		return this._enable;
	};

	_pGrid._getMaxColDataSizeBand = function (nColIndex, chk_srow) {
		var totalmax = -1;
		var format = this._curFormat;

		if (this._bodyAutoSize) {
			var max = -1;

			if (this._binddataset) {
				var rowcount = this._getGridRowCount();

				if (rowcount > 0 && format._bodycells) {
					if (!this._preloadTreeImage()) {
						return -1;
					}

					if (!this._preloadImage()) {
						return -1;
					}

					var cells = format._bodycells;
					var cellsLen = cells.length;
					var colcells = [];
					var size;
					var maxbyte = {
						max : -1, 
						len : -1
					};
					var bfont, bselfont, bborder, bpadding;
					var cellinfo, prevcellinfo, subcells, subcol;

					for (var i = 0; i < cellsLen; i++) {
						cellinfo = cells[i];

						if (cellinfo._col <= nColIndex && (cellinfo._col + cellinfo._colspan) > nColIndex) {
							if (cellinfo != prevcellinfo) {
								colcells.push(cellinfo);
							}

							prevcellinfo = cellinfo;

							if (cellinfo._subcells.length) {
								subcells = cellinfo._subcells;

								for (var j = 0; j < subcells.length; j++) {
									if (cellinfo._col + subcells[j]._col <= nColIndex && (cellinfo._col + subcells[j]._col + subcells._colspan) > nColIndex) {
										cellinfo = subcells[j];
										break;
									}
								}
							}

							if (maxbyte) {
								if (cellinfo._curfont === undefined) {
									cellinfo._query_pseudo_font(0, false, "normal");
								}
								if (cellinfo._curselfont === undefined) {
									cellinfo._query_pseudo_font(0, true, "normal");
								}
								if (cellinfo._curborder === undefined) {
									cellinfo._query_pseudo_border(0, false, "normal", 0, null, null);
								}
								if (cellinfo._curpadding === undefined) {
									cellinfo._query_pseudo_padding(0, "normal");
								}

								if (cellinfo._curfont === "bindexpr" || cellinfo._curselfont === "bindexpr" || cellinfo._curborder === "bindexpr" || cellinfo._curpadding === "bindexpr") {
									maxbyte = null;
									continue;
								}
								else if (bfont !== undefined) {
									if ((bfont != cellinfo._curfont) || (bselfont != cellinfo._curselfont) || (bborder != cellinfo._curborder) || (bpadding != cellinfo._curpadding)) {
										maxbyte = null;
										continue;
									}
								}

								bfont = cellinfo._curfont;
								bselfont = cellinfo._curselfont;
								bborder = cellinfo._curborder;
								bpadding = cellinfo._curpadding;
							}
						}
					}

					for (var j = 0; j < rowcount; j++) {
						var datarow = this._getDataRow(j);

						if (chk_srow >= 0 && j < chk_srow) {
							max = format._cols[nColIndex].size;
							continue;
						}

						size = this._getMaxColSize(colcells, nColIndex, datarow, null, maxbyte);

						if (size < 0) {
							return -1;
						}

						max = Math.max(max, size);
					}
				}
			}
			totalmax = Math.max(totalmax, max);
		}
		if (this._headAutoSize && format._headcells) {
			var cells = format._headcells;
			var cellsLen = cells.length;
			var max;
			var colcells = [], cellinfo;

			for (var i = 0; i < cellsLen; i++) {
				cellinfo = cells[i];
				if (cellinfo._col <= nColIndex && (cellinfo._col + cellinfo._colspan) > nColIndex) {
					colcells.push(cellinfo);
				}
			}

			max = this._getMaxColSize(colcells, nColIndex, -1);
			totalmax = Math.max(totalmax, max);
		}

		if (this._summAutoSize && format._summcells) {
			var cells = format._summcells;
			var cellsLen = cells.length;
			var max;
			var colcells = [], cellinfo;

			for (var i = 0; i < cellsLen; i++) {
				cellinfo = cells[i];
				if (cellinfo._col <= nColIndex && (cellinfo._col + cellinfo._colspan) > nColIndex) {
					colcells.push(cellinfo);
				}
			}

			max = this._getMaxColSize(colcells, nColIndex, -2);
			totalmax = Math.max(totalmax, max);
		}
		return totalmax;
	};

	_pGrid._on_treeloadImagetemp = function (url, imgW, imgH) {
	};

	_pGrid._tree_recreate = false;
	_pGrid._hasTree = false;
	_pGrid._treeIndexes = null;
	_pGrid._treeStates = null;
	_pGrid._treeChecked = null;
	_pGrid._treeCellinfo = null;
	_pGrid._hasSameNextNode = null;
	_pGrid._maxdepth = 0;
	_pGrid._rootlevel = 99;
	_pGrid._treeInitStatus = {
		"collapse,null" : 0, 
		"expand,null" : 1, 
		"collapse,all" : 2, 
		"expand,all" : 3
	};
	_pGrid._currentCellEditor = null;
	_pGrid._tempEditor = null;
	_pGrid._currentCellCell = -1;
	_pGrid._currentCellRow = -1;
	_pGrid._showEditing = false;
	_pGrid._beforeEditRowIdx = -1;
	_pGrid._beforeEditCellIdx = -1;
	_pGrid._onceTime_focus = false;
	_pGrid._set_focus_dir = -1;
	_pGrid._showEditorFocus = false;

	_pGrid._on_treeloadImage = function (url, imgW, imgH) {
		var tree_load = this._tree_load_all;
		tree_load[url] = true;

		var key, load = true;

		for (key in tree_load) {
			if (tree_load.hasOwnProperty(key)) {
				if (tree_load[key] == false) {
					load = false;
					break;
				}
			}
		}

		if (load) {
			if (this._is_created) {
				this._recreate_contents_all(true, true, true);
			}
			else {
				this._tree_recreate = true;
			}
		}
		else {
			if (this._is_created) {
				if (this._resetColSizeList()) {
					this._bodyBand._matrix._adjustColsDisplay(true);
				}
			}
		}
	};

	_pGrid._on_sizeloading = function (url, imgW, imgH) {
		var image_load = this._image_load_all;

		if (image_load[url]) {
			return;
		}

		image_load[url] = true;

		var key, load = true;

		for (key in image_load) {
			if (image_load.hasOwnProperty(key)) {
				if (image_load[key] == false) {
					load = false;
					break;
				}
			}
		}

		if (load) {
			if (this._is_created) {
				this._recreate_contents_all(true, true, true);
			}
			else {
				this._image_recreate = true;
			}
		}
		else {
			if (this._is_created) {
				if (this._resetColSizeList()) {
					this._bodyBand._matrix._adjustColsDisplay(true);
				}
			}
		}
	};


	_pGrid._preloadTreeImage = function () {
		if (this._tree_load_all != null) {
			return true;
		}

		if (!this._binddataset) {
			return true;
		}

		var rowcount = this._binddataset.getRowCount();
		var cellinfos = this._curFormat._bodycells;
		var state, displayType, cellinfo, prop;

		this._tree_load_all = {
		};
		for (var i = 0; i < rowcount; i++) {
			for (var j = 0; j < cellinfos.length; j++) {
				cellinfo = cellinfos[j];
				displayType = cellinfo._getDisplaytype(i);

				if (displayType != "tree") {
					continue;
				}

				state = this._treeStates[i];

				if (state == 0) {
					prop = "treecollapseimage";
				}
				else if (state == 1) {
					prop = "treeexpandimage";
				}
				else if (state == 2) {
					prop = "treeitemimage";
				}

				var image = cellinfo._query_pseudo_treecontrol(i, prop, "normal");
				if (image) {
					if (image.substring(0, 4).toLowerCase() == "url(") {
						image = image.substring(5, image.length - 2);
					}

					image = nexacro._getImageLocation(image, this._getRefFormBaseUrl());
					this._tree_load_all[image] = false;
				}

				prop = "";
				if (state == 0) {
					prop += "treeopenbuttonimage";
				}
				else if (state == 1) {
					prop += "treeclosebuttonimage";
				}

				if (prop) {
					var image = cellinfo._query_pseudo_treecontrol(i, prop, "normal");
					if (image) {
						if (image.substring(0, 4).toLowerCase() == "url(") {
							image = image.substring(5, image.length - 2);
						}

						image = nexacro._getImageLocation(image, this._getRefFormBaseUrl());

						this._tree_load_all[image] = false;
					}
				}
			}
		}

		var key, load = true, size;

		for (key in this._tree_load_all) {
			if (this._tree_load_all.hasOwnProperty(key)) {
				size = nexacro._getImageSize(key, this._on_treeloadImage, this);
				if (!size) {
					load = false;
				}
			}
		}
		return load;
	};

	_pGrid._preloadImage = function () {
		if (this._image_load_all != null) {
			return true;
		}

		if (!this._binddataset) {
			return true;
		}

		var rowcount = this._binddataset.getRowCount();
		var cellinfos = this._curFormat._bodycells;
		var displayType, cellinfo;

		if (!cellinfos) {
			return true;
		}

		this._image_load_all = {
		};

		for (var i = 0; i < rowcount; i++) {
			for (var j = 0; j < cellinfos.length; j++) {
				cellinfo = cellinfos[j];
				displayType = cellinfo._getDisplaytype(i);

				if (displayType != "image") {
					continue;
				}

				prop = "text";

				var image = cellinfo._getDisplayText_image(i);
				if (image) {
					if (image.substring(0, 4).toLowerCase() == "url(") {
						image = image.substring(5, image.length - 2);
					}

					image = nexacro._getImageLocation(image, this._getRefFormBaseUrl());
					this._image_load_all[image] = false;
				}
			}
		}

		var key, load = true, size;

		for (key in this._image_load_all) {
			if (this._image_load_all.hasOwnProperty(key)) {
				size = nexacro._getImageSize(key, this._on_sizeloading, this);
				if (!size) {
					load = false;
				}
			}
		}
		return load;
	};

	_pGrid._getDepthWidth = function (datarow, cellinfo) {
		var displayType = cellinfo._getDisplaytype(datarow);

		if (displayType != "tree") {
			return 0;
		}

		var start = cellinfo._getTreeStartLevel(datarow);
		var level = cellinfo._getTreeLevel(datarow);
		var state = this._treeStates[datarow];
		var gap = 22;
		var subgap = 6;
		var defaultsize = 9;
		var imagewidth = 14;
		var buttonwidth = 14;
		var checkwidth = 14;
		var use_image, use_check, use_btn;
		var prop;
		var pseudo = "normal";

		if (state == 0) {
			prop = "treecollapseimage";
		}
		else if (state == 1) {
			prop = "treeexpandimage";
		}
		else if (state == 2) {
			prop = "treeitemimage";
		}

		var image = cellinfo._query_pseudo_treecontrol(datarow, prop, pseudo);
		if (image) {
			if (image.substring(0, 4).toLowerCase() == "url(") {
				image = image.substring(5, image.length - 2);
			}

			image = nexacro._getImageLocation(image, this._getRefFormBaseUrl());
			var size = nexacro._getImageSize(image, this._on_treeloadImagetemp, this, undefined, cellinfo._query_pseudo_treecontrol(datarow, prop, pseudo));

			if (size) {
				imagewidth = size.width;
			}
		}

		prop = "";
		if (state == 0) {
			prop += "treeopenbuttonimage";
		}
		else if (state == 1) {
			prop += "treeclosebuttonimage";
		}

		if (prop) {
			var image = cellinfo._query_pseudo_treecontrol(datarow, prop, pseudo);
			if (image) {
				if (image.substring(0, 4).toLowerCase() == "url(") {
					image = image.substring(5, image.length - 2);
				}

				image = nexacro._getImageLocation(image, this._getRefFormBaseUrl());

				var size = nexacro._getImageSize(image, this._on_treeloadImagetemp, this, undefined, cellinfo._query_pseudo_treecontrol(datarow, prop, pseudo));
				if (size) {
					buttonwidth = size.width;
				}
			}
		}

		level -= start;

		if (level < 0) {
			level = -1;
		}

		var offset = (level * gap) + defaultsize;

		if (this.treeusebutton != "no") {
			offset += buttonwidth;
		}
		else {
			offset += defaultsize;
		}

		if (this.treeusecheckbox == true) {
			var controlSize = cellinfo._query_pseudo_control(this, datarow, "checkboxsize", "buttonsize", pseudo);

			if (controlSize == null) {
				checkWidth = 14;
			}
			else {
				checkWidth = parseInt(controlSize._value, 10);
			}

			offset += checkWidth;
		}

		if (this.treeuseimage == true) {
			offset += 1;
			if (imagewidth > 0) {
				offset += imagewidth;
			}
			else {
				offset += 15;
			}

			offset += 5;
		}
		else {
			offset += 4;
		}

		return offset + 2;
	};

	_pGrid._isPassPrevCell = function (area, cells, type, idx) {
		var rowcnt = area.endsubrow.length;
		var b_subrow = area.begsubrow;
		var e_subrow = area.endsubrow;
		var b_col = area.begcol;
		var e_col = area.endcol;
		var cellcnt = cells.length;

		if (type == "next" || type == "prev") {
			for (var i = 0; i < rowcnt; i++) {
				for (var j = 0; j < cellcnt; j++) {
					if (b_subrow[i] <= cells[j]._row && e_subrow[i] >= cells[j]._row) {
						if (cells[j]._colspan > 1) {
							if (type == "next" && cells[j]._col < idx && idx < cells[j]._col + cells[j]._colspan) {
								return true;
							}
							else if (type == "prev" && cells[j]._col <= idx && idx < cells[j]._col + cells[j]._colspan - 1) {
								return true;
							}
						}
					}
				}
			}
		}
		else {
			for (var i = 0; i < cells.length; i++) {
				if (b_col <= cells[i]._col && e_col >= cells[i]._col) {
					if (cells[i]._rowspan > 1) {
						if (type == "down" && cells[i]._row < idx && idx < cells[i]._row + cells[i]._rowspan) {
							return true;
						}
						else if (type == "up" && cells[i]._row <= idx && idx < cells[i]._row + cells[i]._rowspan - 1) {
							return true;
						}
					}
				}
			}
		}
		return false;
	};

	_pGrid._getAreaMoveCell = function (type, afterIdx, row) {
		var selectinfo = this._selectinfo;

		if (selectinfo.area.length == 0) {
			return true;
		}

		var area = selectinfo.area[selectinfo.area.length - 1];
		var cells = this._curFormat._bodycells;

		if (type == "next") {
			if (selectinfo.ctrlpoint.col < afterIdx) {
				if (area.endcol >= afterIdx) {
					return false;
				}
			}
			else {
				if (this._isPassPrevCell(area, cells, type, afterIdx)) {
					return false;
				}
			}
		}
		else if (type == "prev") {
			if (selectinfo.ctrlpoint.col > afterIdx) {
				if (area.begcol <= afterIdx) {
					return false;
				}
			}
			else {
				if (this._isPassPrevCell(area, cells, type, afterIdx)) {
					return false;
				}
			}
		}
		else if (type == "down") {
			if (selectinfo.ctrlpoint.row < row || (selectinfo.ctrlpoint.row == row && selectinfo.ctrlpoint.subrow < afterIdx)) {
				if (area.endsubrow.length == (row - selectinfo.ctrlpoint.row + 1)) {
					if (area.endsubrow[area.endsubrow.length - 1] >= afterIdx) {
						return false;
					}
				}
			}
			else {
				if (this._isPassPrevCell(area, cells, type, afterIdx)) {
					return false;
				}
			}
		}
		else if (type == "up") {
			if (selectinfo.ctrlpoint.row > row || (selectinfo.ctrlpoint.row == row && selectinfo.ctrlpoint.subrow > afterIdx)) {
				if (area.begsubrow.length == (selectinfo.ctrlpoint.row - row + 1)) {
					if (area.begsubrow[0] <= afterIdx) {
						return false;
					}
				}
			}
			else {
				if (this._isPassPrevCell(area, cells, type, afterIdx)) {
					return false;
				}
			}
		}
		return true;
	};

	_pGrid._moveToCell = function (type, editable, colmove, area, lastcol, showcell) {
		if (this._selectinfo.curdsrow < 0) {
			if (this.rowcount > 0 && (type == "next" || type == "down")) {
				this._moveToPosCell(0, 0);
				return true;
			}
			return false;
		}

		var format = this._curFormat;
		var beforeCell = this._beforebodycellpos = this._selectinfo.curcell;
		var beforeCol = this._beforebodycolpos = this._selectinfo.curcol;
		var beforeRow = this._beforebodyrowpos = this._selectinfo.curdsrow;
		var beforeSubrow = this._beforebodysubrowpos = this._selectinfo.cursubrow;
		var beforePvt = this._beforepvt = this._selectinfo.curpvt;
		var afterCell, afterCol, afterRow, afterSubrow;
		var afterPvt = -9;
		var cellarr;
		var bodycells = format._bodycells;
		var bodycells_len = bodycells.length;

		if (type == "next") {
			if (editable) {
				cellarr = this._getLastEditableCell();
				if (cellarr.row == null || (cellarr.row <= this._selectinfo.curdsrow && cellarr.cell == this._selectinfo.curcell)) {
					return false;
				}
			}

			for (; true; ) {
				var rowcount = this.rowcount;
				if (this._selectinfo.currow >= (rowcount - 1) && this._selectinfo.curcell >= (format._bodycells.length - 1)) {
					return false;
				}

				if (this._selectinfo.curcell >= bodycells.length - 1) {
					if (colmove) {
						return false;
					}
					for (; true; ) {
						afterCell = 0;
						afterCol = 0;
						afterRow = this._selectinfo.curdsrow + 1;
						afterSubrow = 0;

						this._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);

						if (this._hasTree) {
							var exist = false;
							var _treeIndexes = this._treeIndexes;
							var _treeIndexesLen = _treeIndexes.length;

							for (var k = 0; k < _treeIndexes.length; k++) {
								if (_treeIndexes[k] == afterRow) {
									exist = true;
									break;
								}
								else if (_treeIndexes[k] > afterRow) {
									break;
								}
							}
							if (exist == false) {
								continue;
							}
						}

						break;
					}
				}
				else {
					if (colmove) {
						afterCell = this._selectinfo.curcell;
						afterCol = bodycells[this._selectinfo.curcell]._col + bodycells[this._selectinfo.curcell]._colspan;
						afterRow = this._selectinfo.curdsrow;
						afterSubrow = this._selectinfo.cursubrow;

						for (var i = 0; i < bodycells_len; i++) {
							if (bodycells[i]._col == afterCol && (bodycells[i]._row <= this._selectinfo.cursubrow && this._selectinfo.cursubrow < (bodycells[i]._row + bodycells[i]._rowspan))) {
								if (!area || area == bodycells[i]._area) {
									afterCell = i;
									afterSubrow = bodycells[i]._row;
									break;
								}
							}
						}

						if (afterCell == this._selectinfo.curcell) {
							return false;
						}
					}
					else {
						afterCell = this._selectinfo.curcell + 1;
						afterCol = bodycells[afterCell]._col;
						afterRow = this._selectinfo.curdsrow;
						afterSubrow = bodycells[afterCell]._row;
					}

					if (lastcol != undefined && lastcol < afterCol) {
						return false;
					}

					this._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);

					if (format._cols[afterCol].size <= 0) {
						continue;
					}

					if (this._isAreaSelect()) {
						if (!this._getAreaMoveCell(type, afterCol, afterRow)) {
							continue;
						}
					}
				}

				if (showcell && afterRow >= 0) {
					var obj = this._getCurrentBodyCell(afterRow, afterCell);
					if (obj) {
						obj._showfull(obj);
					}
				}

				if (editable) {
					if (this._hasTree) {
						var exist = false;
						var _treeIndexes = this._treeIndexes;
						var _treeIndexesLen = _treeIndexes.length;

						for (var k = 0; k < _treeIndexesLen; k++) {
							if (_treeIndexes[k] == afterRow) {
								exist = true;
								break;
							}
							else if (_treeIndexes[k] > afterRow) {
								break;
							}
						}
						if (exist == false) {
							continue;
						}
					}

					var cellinfo = bodycells[afterCell];
					var editType = cellinfo._getEdittype(afterRow);

					if (editType == "" || editType == "none") {
						continue;
					}
				}
				break;
			}
		}
		else if (type == "prev") {
			for (; true; ) {
				if (this._selectinfo.curcell <= 0) {
					if (colmove || this._selectinfo.currow <= 0) {
						return false;
					}

					for (; true; ) {
						afterCell = format._bodycells.length - 1;
						afterCol = bodycells[afterCell]._col;
						afterRow = this._selectinfo.curdsrow - 1;
						afterSubrow = bodycells[afterCell]._row;

						this._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);

						if (this._hasTree) {
							var exist = false;
							var _treeIndexes = this._treeIndexes;
							var _treeIndexesLen = _treeIndexes.length;

							for (var k = 0; k < _treeIndexes.length; k++) {
								if (_treeIndexes[k] == afterRow) {
									exist = true;
									break;
								}
								else if (_treeIndexes[k] > afterRow) {
									break;
								}
							}
							if (exist == false) {
								continue;
							}
						}

						break;
					}
				}
				else {
					var newcol;
					if (colmove) {
						afterCell = this._selectinfo.curcell;
						newcol = afterCol = this._selectinfo.curcol - 1;
						afterRow = this._selectinfo.curdsrow;
						afterSubrow = this._selectinfo.cursubrow;

						for (var i = 0; i < bodycells_len; i++) {
							if ((bodycells[i]._col <= afterCol && afterCol < bodycells[i]._col + bodycells[i]._colspan) && (bodycells[i]._row <= this._selectinfo.cursubrow && this._selectinfo.cursubrow < (bodycells[i]._row + bodycells[i]._rowspan))) {
								if (!area || area == bodycells[i]._area) {
									afterCol = bodycells[i]._col;
									afterCell = i;
									afterSubrow = bodycells[i]._row;
									break;
								}
							}
						}
						if (afterCell == this._selectinfo.curcell) {
							return false;
						}
					}
					else {
						afterCell = this._selectinfo.curcell - 1;
						afterCol = bodycells[afterCell]._col;
						afterRow = this._selectinfo.curdsrow;
						afterSubrow = bodycells[afterCell]._row;
					}

					if (lastcol != undefined && lastcol > afterCol) {
						return false;
					}

					this._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);

					if (format._cols[afterCol].size <= 0) {
						continue;
					}

					if (this._isAreaSelect()) {
						if (!this._getAreaMoveCell(type, newcol, afterRow)) {
							continue;
						}
					}
				}

				if (showcell && afterRow >= 0) {
					var obj = this._getCurrentBodyCell(afterRow, afterCell);
					if (obj) {
						obj._showfull(obj);
					}
				}

				if (editable) {
					if (this._hasTree) {
						var exist = false;
						var _treeIndexes = this._treeIndexes;
						var _treeIndexesLen = _treeIndexes.length;

						for (var k = _treeIndexesLen - 1; k >= 0; k--) {
							if (_treeIndexes[k] == afterRow) {
								exist = true;
								break;
							}
							else if (_treeIndexes[k] < afterRow) {
								break;
							}
						}
						if (exist == false) {
							continue;
						}
					}

					var cellinfo = bodycells[afterCell];
					var editType = cellinfo._getEdittype(afterRow);

					if (editType == "" || editType == "none") {
						continue;
					}
				}
				break;
			}
		}
		else if (type == "up") {
			var prevcell = -1, prevcol = -1, prevsubrow = -1;
			var selectedcol = this._selectinfo.curcol;
			var selectedrowspan;

			for (; true; ) {
				if (this._isSelectRowType()) {
					if (this._selectinfo.curdsrow == 0) {
						return false;
					}

					afterCell = this._selectinfo.curcell;
					afterCol = this._selectinfo.curcol;
					afterRow = this._selectinfo.curdsrow - 1;
					afterSubrow = this._selectinfo.cursubrow;
				}
				else {
					if (this._selectinfo.curdsrow == 0 && this._selectinfo.cursubrow == 0) {
						return false;
					}

					if (this._fixed_startrow >= this._selectinfo.curdsrow) {
						return false;
					}

					selectedrowspan = bodycells[this._selectinfo.curcell]._rowspan;

					var newsubrow;

					if (this._selectinfo.cursubrow == 0) {
						for (var i = bodycells_len - 1; i >= 0; i--) {
							if (bodycells[i]._col <= this._selectinfo.curcol && this._selectinfo.curcol < (bodycells[i]._col + bodycells[i]._colspan)) {
								prevcell = bodycells[i]._cellidx;
								prevcol = bodycells[i]._col;
								prevsubrow = bodycells[i]._row;
								newsubrow = prevsubrow + bodycells[i]._rowspan - 1;
								break;
							}
						}
						afterCol = prevcol;
						afterCell = prevcell;
						afterRow = this._selectinfo.curdsrow - 1;
						afterSubrow = prevsubrow;
					}
					else {
						for (var i = this._selectinfo.curcell - 1; i >= 0; i--) {
							if (bodycells[i]._col <= this._selectinfo.curcol && this._selectinfo.curcol < (bodycells[i]._col + bodycells[i]._colspan) && 
								bodycells[i]._row <= (this._selectinfo.cursubrow - 1) && (this._selectinfo.cursubrow - 1) < (bodycells[i]._row + bodycells[i]._rowspan)) {
								prevcell = bodycells[i]._cellidx;
								prevcol = bodycells[i]._col;
								prevsubrow = bodycells[i]._row;
								newsubrow = prevsubrow + bodycells[i]._rowspan - 1;
								break;
							}
						}

						afterCol = prevcol;
						afterCell = prevcell;
						afterRow = this._selectinfo.curdsrow;
						afterSubrow = prevsubrow;
					}
				}

				this._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);

				if (this._hasTree) {
					var exist = false;
					var _treeIndexes = this._treeIndexes;
					var _treeIndexesLen = _treeIndexes.length;

					for (var k = _treeIndexesLen - 1; k >= 0; k--) {
						if (_treeIndexes[k] == afterRow) {
							exist = true;
							break;
						}
						else if (_treeIndexes[k] < afterRow) {
							break;
						}
					}
					if (exist == false) {
						continue;
					}
				}

				if (this._isAreaSelect()) {
					if (!this._getAreaMoveCell(type, newsubrow, afterRow)) {
						continue;
					}
				}

				break;
			}
		}
		else if (type == "down") {
			var rowcount = this._getGridRowCount();
			var curr = this._dsRowToDispRow(this._selectinfo.curdsrow);
			var lastsubrow = format._bodyrows.length - 1;
			var nextcell = -1, nextcol = -1, nextsubrow = -1;
			var selectedcol = this._selectinfo.curcol;
			var selectedsubrow = this._selectinfo.cursubrow;
			var selectedrowspan;

			for (; true; ) {
				if (this._isSelectRowType()) {
					if (rowcount - 1 <= curr) {
						return false;
					}

					afterCell = this._selectinfo.curcell;
					afterCol = this._selectinfo.curcol;
					afterRow = this._selectinfo.curdsrow + 1;
					afterSubrow = this._selectinfo.cursubrow;
				}
				else {
					selectedrowspan = bodycells[this._selectinfo.curcell]._rowspan;

					if (rowcount - 1 <= curr && (this._selectinfo.cursubrow + selectedrowspan) - 1 == lastsubrow) {
						if (this.vscrollbar) {
							this.vscrollbar.set_pos(this.vscrollbar.max);
						}

						return false;
					}

					if ((this._selectinfo.cursubrow + selectedrowspan - 1) == lastsubrow) {
						for (var i = 0; i < bodycells_len; i++) {
							if (bodycells[i]._col <= this._selectinfo.curcol && this._selectinfo.curcol < (bodycells[i]._col + bodycells[i]._colspan)) {
								nextcell = bodycells[i]._cellidx;
								nextcol = bodycells[i]._col;
								nextsubrow = bodycells[i]._row;
								break;
							}
						}
						afterCol = nextcol;
						afterCell = nextcell;
						afterRow = this._selectinfo.curdsrow + 1;
						afterSubrow = nextsubrow;
					}
					else {
						for (var i = this._selectinfo.curcell + 1; i < bodycells_len; i++) {
							if (bodycells[i]._col <= this._selectinfo.curcol && this._selectinfo.curcol < (bodycells[i]._col + bodycells[i]._colspan) && (bodycells[i]._row == this._selectinfo.cursubrow + (selectedrowspan - 1) + 1)) {
								nextcell = bodycells[i]._cellidx;
								nextcol = bodycells[i]._col;
								nextsubrow = bodycells[i]._row;
								break;
							}
						}

						afterCol = nextcol;
						afterCell = nextcell;
						afterRow = this._selectinfo.curdsrow;
						afterSubrow = nextsubrow;
					}
				}

				this._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);

				if (this._hasTree) {
					var exist = false;
					var _treeIndexes = this._treeIndexes;
					var _treeIndexesLen = _treeIndexes.length;

					for (var k = 0; k < _treeIndexes.length; k++) {
						if (_treeIndexes[k] == afterRow) {
							exist = true;
							break;
						}
						else if (_treeIndexes[k] > afterRow) {
							break;
						}
					}
					if (exist == false) {
						continue;
					}
				}

				if (this._isAreaSelect()) {
					if (!this._getAreaMoveCell(type, afterSubrow, afterRow)) {
						continue;
					}
				}

				break;
			}
		}

		var evt_name;
		this._iskey_movetocell = false;

		if (this._keydown_elem) {
			this._iskey_movetocell = true;
			evt_name = "keydown";
		}

		this._hideEditor();
		var change = this._ChangeSelect(afterCell, afterCol, afterRow, afterSubrow, afterPvt, false, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, "body", evt_name);

		var cell = this._getCurrentBodyCell(afterRow, afterCell);

		if (cell && !nexacro._enableaccessibility) {
			cell._setFocus(false);
		}

		if (!this._keydown_elem) {
			this._moveCellAfterFocus();
		}
		else {
			if (change == false) {
				if (this.autoenter == "select") {
					this._showEditor();
				}
			}
		}

		return true;
	};

	_pGrid._moveCellAfterFocus = function () {
		var retn = true;

		if (this.autoenter == "select") {
			if (nexacro.Browser == "Edge" || nexacro.Browser == "Opera" || nexacro.Browser == "IE") {
				this._onceTime_focus = true;
			}

			if (!this._showEditor()) {
				this._hideEditor();
				retn = false;
			}
			this._onceTime_focus = false;
		}
		return retn;
	};

	_pGrid._setTree = function (v) {
		v = nexacro._toBoolean(v);

		if (this._hasTree != v) {
			this._hasTree = v;

			if (v == true) {
				this._setFixedRow(false, true);
				this._initTreeStates();
			}
			else {
				this._clearTreeStates();
			}
			this._recreate_contents_all(false, false, false, true);
		}
	};
	_pGrid._setTreeCellinfo = function (v) {
		if (this._treeCellinfo != v) {
			this._treeCellinfo = v;
			this._setTree(true);
		}
	};

	_pGrid._removeTreeCellinfo = function (v) {
		if (this._treeCellinfo == v) {
			this._treeCellinfo = null;
			this._setTree(false);
		}
	};

	_pGrid._initTreeStates = function (keepstate) {
		if (this._hasTree && this._binddataset) {
			this._treeIndexes = this._createTreeIndexes();
			this._treeStates = this._createTreeStates(keepstate);
			this._treeChecked = this._createTreeChecked();
			this._createTreeHasChild();
			this._applyTreeStates();

			if (this._treeIndexes.length > 0) {
				this.rowcount = this._treeIndexes.length;
			}
			else {
				this.rowcount = 0;
			}
		}
	};

	_pGrid._createTreeHasChild = function () {
		var rowcount = this._rowcount;
		var cellinfo = this._treeCellinfo;

		if (this._hasSameNextNode) {
			delete this._hasSameNextNode;
		}

		this._hasSameNextNode = new Array(rowcount);

		for (var i = rowcount - 1; i >= 0; i--) {
			var lvl = cellinfo._getTreeLevel(i);
			this._maxdepth = Math.max(lvl, this._maxdepth);
			this._rootlevel = Math.min(lvl, this._rootlevel);

			if (this._hasSameNextNode[i] == undefined) {
				var val = [];
				val[0] = lvl;
				val[1] = false;
				this._hasSameNextNode[i] = val;

				for (var j = i - 1; j >= 0; j--) {
					var lvl2 = cellinfo._getTreeLevel(j);
					if (lvl == lvl2) {
						var val = [];
						val[0] = lvl;
						val[1] = true;
						this._hasSameNextNode[j] = val;
					}
					else if (lvl > lvl2) {
						break;
					}
				}
			}
		}

		this._rootlevel = Math.max(cellinfo._getTreeStartLevel(), this._rootlevel);
	};

	_pGrid._getParentNodeSameInfo = function (lvl, startrow) {
		for (var i = startrow; i >= 0; i--) {
			var val = this._hasSameNextNode[i];

			if (val[0] == lvl) {
				return val[1];
			}
		}
		return false;
	};
	_pGrid._createTreeIndexes = function () {
		if (this._binddataset == null) {
			return [];
		}

		var rowcount = this._binddataset.rowcount;
		var indexes = new Array(rowcount);

		for (var i = 0; i < rowcount; i++) {
			indexes[i] = i;
		}

		return indexes;
	};

	_pGrid._createTreeStates = function (keepstate, ignoreDS) {
		if (this._binddataset == null) {
			return [];
		}

		var dataset = this._binddataset;
		var indexes = this._treeIndexes;
		var rowcount = dataset.rowcount;
		var records = dataset._viewRecords;
		var states = new Array(rowcount);
		var cellinfo = this._treeCellinfo;
		var initstatus = this._treeInitStatus[this.treeinitstatus];
		var state = null;
		var level;

		if (initstatus == null) {
			initstatus = 0;
		}

		var oldstates = this._treeStates;

		if (keepstate && oldstates.length == rowcount) {
			for (var i = 0, j = 0; i < rowcount; i++, j++) {
				if (cellinfo.treestate._bindtype == 0) {
					states[i] = oldstates[j];
				}
			}
		}


		if (initstatus == 0 || initstatus == 1) {
			var defaultstatus = (initstatus == 0) ? 0 : 1;

			var prelevel = level = -1;
			var prestate;

			for (var i = 0; i < rowcount; i++) {
				if (!ignoreDS) {
					state = cellinfo._getTreeState(i);
				}

				if (states[i] == undefined) {
					if (state && state.length) {
						states[i] = parseInt(state, 10);
					}
					else {
						states[i] = defaultstatus;
					}
				}

				level = cellinfo._getTreeLevel(i);

				if (!prestate || cellinfo.treestate._bindtype == 0) {
					if (prelevel >= level) {
						states[i - 1] = 3;
					}
				}
				prelevel = level;
				prestate = state;
			}

			if (cellinfo.treestate._bindtype == 0 || !state) {
				states[rowcount - 1] = 2;
			}
		}
		else if (initstatus == 2 || initstatus == 3) {
			var defaultstatus = (initstatus == 2) ? 0 : 1;
			var prelevel = level = -1;

			for (var i = 0; i < rowcount; i++) {
				if (states[i] == undefined) {
					states[i] = defaultstatus;
				}

				level = cellinfo._getTreeLevel(i);
				if (prelevel >= level) {
					states[i - 1] = 2;
				}
				prelevel = level;
			}
			states[rowcount - 1] = 2;
		}

		if (this._org_treeStates.length == 0) {
			this._org_treeStates = this._org_treeStates.concat(states);
		}

		return states;
	};

	_pGrid._createTreeChecked = function () {
		if (this._binddataset == null) {
			return [];
		}

		var rowcount = this._binddataset.rowcount;
		var checked = new Array(rowcount);
		var cellinfo = this._treeCellinfo;
		var v = null;

		for (var i = 0; i < rowcount; i++) {
			v = cellinfo._getTreeCheck(i);

			if (v && (v > 0 || v.length)) {
				checked[i] = parseInt(v, 10);
			}
			else {
				checked[i] = 0;
			}
		}

		return checked;
	};

	_pGrid._updateTreeStates = function (row, add_row) {
		if (this._hasTree && this._binddataset) {
			if (row >= 0) {
				var states = this._treeStates;
				if (add_row) {
					states.splice(row, 0, 2);
				}
				else {
					states.splice(row, 1);
					if (states[row] != 2) {
						if (states[row - 1] == 1) {
							states[row - 1] = 2;
						}
					}
					else {
						var cellinfo = this._treeCellinfo;
						var level = cellinfo._getTreeLevel(row);
						var pre_level = cellinfo._getTreeLevel(row - 1);
						if (level == pre_level) {
							states[row - 1] = 2;
						}
					}
				}
				this._treeStates = states;
			}

			this._treeIndexes = this._createTreeIndexes();
			this._treeChecked = this._createTreeChecked();
			this._createTreeHasChild();
			this._applyTreeStates();

			if (this._treeIndexes.length > 0) {
				this.rowcount = this._treeIndexes.length;
			}
			else {
				this.rowcount = 0;
			}
		}
	};

	_pGrid._applyTreeStates = function () {
		var indexes = this._treeIndexes;
		var states = this._treeStates;
		var rowcount = indexes.length;
		var cellinfo = this._treeCellinfo;
		var v = indexes.slice(0, indexes.length);
		var prelevel = -1;
		var level = -1;
		var offset = 0;

		for (var i = 0; i < rowcount; i++) {
			offset++;
			if (states[i] == 0) {
				prelevel = cellinfo._getTreeLevel(v[i]);

				for (var j = i + 1; j < rowcount; j++) {
					level = cellinfo._getTreeLevel(v[j]);
					if (level > prelevel) {
						i++;
						indexes.splice(offset, 1);
					}
					else {
						break;
					}
				}
			}
		}
	};

	_pGrid._clearTreeStates = function () {
		this._treeIndexes = null;
		this._treeStates = null;
		this._treeChecked = null;

		if (this._hasTree) {
			this.rowcount = 0;
		}
	};

	_pGrid._getTreeRowPosition = function (v) {
		if (v < 0 || !this._hasTree) {
			return v;
		}

		var indexes = this._treeIndexes;
		var max = indexes.length - 1;

		for (var i = max; i >= 0; i--) {
			if (indexes[i] == v) {
				return i;
			}
			else if (indexes[i] < v) {
				break;
			}
		}
		return -1;
	};

	_pGrid._getBindTextCellInfo = function (columnid) {
		var format = this._curFormat;
		var bind = true;

		if (!format) {
			return null;
		}

		var retn = [];

		if (columnid) {
			if (format._headcells) {
				var _headcells = format._headcells;
				var _headcellsLen = _headcells.length;
				var cellinfo;

				for (var i = 0; i < _headcellsLen; i++) {
					cellinfo = _headcells[i];
					if (cellinfo.text._bindexpr == columnid) {
						retn.push(cellinfo);
					}
				}
			}
			if (format._bodycells) {
				var _bodycells = format._bodycells;
				var _bodycellsLen = _bodycells.length;
				var cellinfo;

				for (var i = 0; i < _bodycellsLen; i++) {
					cellinfo = _bodycells[i];
					if (cellinfo.text._bindexpr == columnid) {
						retn.push(cellinfo);
					}
				}
			}
			if (format._summcells) {
				var _summcells = format._summcells;
				var _summcellsLen = _summcells.length;
				var cellinfo;

				for (var i = 0; i < _summcellsLen; i++) {
					cellinfo = _summcells[i];
					if (cellinfo.text._bindexpr == columnid) {
						retn.push(cellinfo);
					}
				}
			}
		}
		if (retn.length == 0 && format._bodycells) {
			retn = format._bodycells;
			bind = false;
		}
		return [retn, bind];
	};

	_pGrid._isTreeStateChanged = function (e, dsEventOccured) {
		var changed = false;

		if (this._hasTree) {
			var colid = e.columnid;
			var cellinfo = this._treeCellinfo;

			if (colid == cellinfo.treecheck._bindexpr) {
				var dsrowidx = e.row;
				var rowidx = this._getTreeRowPosition(dsrowidx);
				var v = e.newvalue;

				this._setTreeChecked(rowidx, v);
			}

			if (dsEventOccured == false) {
				if (colid == cellinfo.treestate._bindexpr) {
					var dsrowidx = e.row;
					var rowidx = this._getTreeRowPosition(dsrowidx);
					var v = e.newvalue;

					this._setTreeState(rowidx, v);
					changed = true;
				}

				if (colid == cellinfo.treelevel._bindexpr) {
					var cur_level;
					var states = this._treeStates;
					var level = cellinfo._getTreeLevel(e.row);
					for (var i = e.row - 1; i >= 0; i--) {
						cur_level = cellinfo._getTreeLevel(i);
						if (cur_level == level - 1 && states[i] == 2) {
							states[i] = 1;
							break;
						}
					}
					changed = true;
				}
			}
		}
		return changed;
	};

	_pGrid._setTreeState = function (rowidx, v, redraw, prop_set) {
		v = parseInt(v, 10);

		if (isFinite(v)) {
			var dsrowidx = this._treeIndexes[rowidx];
			var state = this._treeStates[dsrowidx];
			var retn = 0;

			if (v != state) {
				if (v == 2) {
					if (redraw) {
						this._refreshBodyRow(rowidx - this._getBodyBegRowPos(rowidx));
					}
					return 1;
				}
				else if ((retn = this._toggleTreeState(rowidx, redraw, v, prop_set)) > 0) {
					return retn;
				}
			}
		}
		return 0;
	};

	_pGrid._getOrgTreeStates = function (rowidx) {
		var states;

		if (this._org_treeStates.length) {
			states = this._org_treeStates;
		}
		else {
			states = this._createTreeStates(false, true);
		}

		if (states[rowidx] == 2) {
			return 2;
		}
		else {
			return this._treeStates[rowidx];
		}
	};

	_pGrid._toggleTreeState = function (rowidx, redraw, v, prop_set) {
		var dsrowidx = this._treeIndexes[rowidx];
		var state;

		if (prop_set) {
			state = this._getOrgTreeStates(dsrowidx);
		}
		else {
			state = this._treeStates[dsrowidx];
		}

		var collapse = false;
		var retn;

		if (state == 0) {
			if (this.on_fire_cantreestatuschange(rowidx, dsrowidx, 1) !== false) {
				retn = this._expandTreeState(rowidx);
				this.on_fire_ontreestatuschanged(rowidx, dsrowidx, 1);
			}
		}
		else if (state == 1) {
			if (this.on_fire_cantreestatuschange(rowidx, dsrowidx, 0) !== false) {
				collapse = true;
				retn = this._collapseTreeState(rowidx);
				this.on_fire_ontreestatuschanged(rowidx, dsrowidx, 0);
			}
		}
		else if (state == 2) {
			if (prop_set) {
				if (prop_set == "null_value") {
					this._treeStates[dsrowidx] = v;
				}
				else {
					this._treeStates[dsrowidx] = 2;
				}
			}
			else {
				if (this.on_fire_cantreestatuschange(rowidx, dsrowidx, 0) !== false) {
					retn = 1;
					this._treeStates[dsrowidx] = v;
					this.on_fire_ontreestatuschanged(rowidx, dsrowidx, 0);
				}
			}
		}

		if (redraw) {
			if (retn == 2) {
				if (this._bodyBand) {
					this._bodyBand._matrix._adjustTreeDisplay(rowidx, collapse);
				}
			}
			else if (retn == 1) {
				this._refreshBodyRow(rowidx - this._getBodyBegRowPos(rowidx));
			}
		}
		return retn;
	};

	_pGrid._collapseTreeState = function (rowidx) {
		var indexes = this._treeIndexes;
		var states = this._treeStates;
		var rowcount = indexes.length;
		var dsrowidx = indexes[rowidx];
		var cellinfo = this._treeCellinfo;

		if (states[dsrowidx] == 1) {
			states[dsrowidx] = 0;
		}
		else {
			return 0;
		}

		var level = cellinfo._getTreeLevel(dsrowidx);

		if (nexacro._enableaccessibility && nexacro._accessibilitytype != 4) {
			var cellobj = this._getAccessibilityCurrentCell();
			if (cellobj) {
				cellobj._setAccessibilityStatExpanded(false);
			}
		}

		var lvl = -1;
		var count = 0;

		for (var i = rowidx + 1; i < rowcount; i++) {
			lvl = cellinfo._getTreeLevel(indexes[i]);

			if (lvl > level) {
				count++;
			}
			else {
				break;
			}
		}

		if (count > 0) {
			indexes.splice(rowidx + 1, count);
			this.rowcount = indexes.length;
			return 2;
		}
		;

		return 1;
	};

	_pGrid._expandTreeState = function (rowidx) {
		var indexes = this._treeIndexes;
		var states = this._treeStates;
		var rowcount = states.length;
		var dsrowidx = indexes[rowidx];
		var cellinfo = this._treeCellinfo;

		if (states[dsrowidx] == 0) {
			states[dsrowidx] = 1;
		}
		else {
			return 0;
		}

		var level = cellinfo._getTreeLevel(dsrowidx);

		if (nexacro._enableaccessibility && nexacro._accessibilitytype != 4) {
			var cellobj = this._getAccessibilityCurrentCell();
			if (cellobj) {
				cellobj._setAccessibilityStatExpanded(true);
			}
		}

		var lvl = -1;
		var count = 0;
		var parentidx = dsrowidx;
		var parents = [dsrowidx];
		var preidx = -1;
		var prelevel = -1;
		var close = false;

		for (var i = dsrowidx + 1; i < rowcount; i++) {
			lvl = cellinfo._getTreeLevel(i);

			if (lvl > level) {
				if (preidx > -1) {
					prelevel = cellinfo._getTreeLevel(preidx);
					if (lvl > prelevel) {
						if (close == true) {
							continue;
						}

						parentidx = preidx;
						parents.push(preidx);
					}
					else if (lvl < prelevel) {
						var n = prelevel - lvl;
						parents.splice(parents.length - n, n);
						parentidx = parents[parents.length - 1];
					}
					close = false;
				}

				if (states[parentidx] > 0) {
					indexes.splice(rowidx + 1 + count, 0, i);
					count++;
				}
				else {
					close = true;
				}

				preidx = i;
			}
			else {
				break;
			}
		}

		if (count > 0) {
			this.rowcount = this._treeIndexes.length;
			return 2;
		}

		return 1;
	};

	_pGrid._setTreeChecked = function (rowidx, v) {
		v = parseInt(v, 10);

		if (isFinite(v)) {
			var dsrowidx = this._treeIndexes[rowidx];
			var checked = this._treeChecked[dsrowidx];

			if (v == checked) {
				return false;
			}
			else {
				return (this._toggleTreeChecked(rowidx));
			}
		}

		return false;
	};

	_pGrid._toggleTreeChecked = function (rowidx) {
		var dsrowidx = this._treeIndexes[rowidx];
		var checked = this._treeChecked[dsrowidx];
		var v = (checked == 0) ? 1 : 0;
		this._treeChecked[dsrowidx] = v;
		return true;
	};

	_pGrid._getCurrentBodyCell = function (ridx, cidx) {
		var band = this._bodyBand;
		if (band) {
			if (ridx < 0) {
				ridx = this._selectinfo.curdsrow;
			}
			if (cidx < 0) {
				cidx = this._selectinfo.curcell;
			}

			var row = band._get_row(ridx);

			if (row) {
				return row._cells[cidx];
			}
		}
		return null;
	};

	_pGrid._getCurrentHeadCell = function (cidx, noccheck) {
		var band = this._headBand;
		if (band && (noccheck || this._currentDSrow == -1)) {
			if (cidx < 0) {
				cidx = this.currentcell;
			}

			var row = band._get_rows()[0];

			if (row) {
				return row._cells[cidx];
			}
		}
		return null;
	};

	_pGrid._getCurrentSummCell = function (cidx, noccheck) {
		var band = this._summBand;
		if (band && (noccheck || this._currentDSrow == -2)) {
			if (cidx < 0) {
				cidx = this.currentcell;
			}

			var row = band._get_rows()[0];

			if (row) {
				return row._cells[cidx];
			}
		}
		return null;
	};

	_pGrid._showEditor = function (flag) {
		if (nexacro._toBoolean(this.readonly) == true) {
			return false;
		}

		var lastfocus = this._find_lastFocused();
		if (lastfocus != this) {
			return false;
		}

		if (!flag) {
			var cellobj = this._getCurrentBodyCell(-1, -1);

			if (!cellobj) {
				return false;
			}

			var startrow = this._getBodyBegRowPos(cellobj._rowidx);
			var endrow = this._endrowpos;
			var currow = this._selectinfo.currow;
			var curcell = this._selectinfo.curcell;

			if (startrow > currow || endrow < currow) {
				return false;
			}
			else {
				if (this._beforeEditRowIdx != currow || this._beforeEditCellIdx != curcell) {
					if (cellobj._hasEditor()) {
						cellobj._showEditor();
						this._beforeEditRowIdx = this._selectinfo.curdsrow;
						this._beforeEditCellIdx = this._selectinfo.curcell;
						this._showEditing = true;

						var datarow = this._getDataRow(cellobj._rowidx);
						cellobj._refobj._editingRow = datarow;
						cellobj.editshowing = true;

						var editor = this._currentCellEditor;

						if (editor) {
							editor._setFocus(false);
							if (editor.setCaretPos && !editor.autoselect) {
								editor.setCaretPos(0);
							}
							else if (editor.comboedit && editor.comboedit.setCaretPos) {
								editor.comboedit.setCaretPos(0);
							}
						}
					}
					else {
						cellobj._setFocus(false);
					}
				}
			}
		}
		else {
			var cellobj = this._getCurrentBodyCell(this._beforeEditRowIdx, this._beforeEditCellIdx);



			if (cellobj && cellobj._hasEditor()) {
				cellobj._showEditor(true, true);
				this._showEditing = true;
				var datarow = this._getDataRow(cellobj._rowidx);
				cellobj._refobj._editingRow = datarow;
			}
			else {
				this._hideEditor(true);
			}
		}
		return true;
	};

	_pGrid._setdataobj = null;
	_pGrid._hideEditor = function (flag, noApplyDataset, grid_killfocus) {
		if (!flag) {
			var cellobj = this._getCurrentBodyCell(this._beforeEditRowIdx, this._beforeEditCellIdx);
			var editComp = this._currentCellEditor;

			if (editComp) {
				var setdataobj = {
					succ : false
				};

				if (cellobj) {
					if (cellobj._hasEditor()) {
						if (!noApplyDataset) {
							if (setdataobj) {
								setdataobj.succ = editComp._setDataset(true);
							}
							else {
								editComp._setDataset(true);
							}
						}

						if (this._binddataset.enableevent == false) {
							this._refreshAll();
						}

						if (nexacro.Browser == "Safari") {
							nexacro.OnceCallbackTimer.callonce(editComp, function () {
								editComp.set_visible(false);
							});
						}
						else {
							editComp.set_visible(false);
						}
						this._currentCellEditor = null;

						if (cellobj._is_alive) {
							cellobj._refobj._editingRow = -9;
							cellobj._setDisplayText();
							cellobj._hideEditor();

							if (this._keydown_elem && !grid_killfocus) {
								cellobj._setFocus(false);
							}
						}
						this._showEditing = false;
					}
				}
				else {
					editComp._cellinfo._editingRow = -9;

					if (setdataobj) {
						setdataobj.succ = editComp._setDataset(true, this._currentCellRow);
					}
					else {
						editComp._setDataset(true, this._currentCellRow);
					}

					editComp.set_visible(false);
					this._currentCellEditor = null;
					this._showEditing = false;
				}
				this._setdataobj = setdataobj;
			}
			this._beforeEditCellIdx = -1;
			this._beforeEditRowIdx = -1;
			this._currentCellCell = -1;
			this._currentCellRow = -1;
		}
		else {
			var editComp = this._currentCellEditor;
			if (editComp) {
				var height = editComp._adjust_height + 10;
				editComp.set_top(-height);
				if (editComp._cellobj._subComp) {
					editComp._cellobj._subComp.set_visible(true);
				}
			}
		}
		return true;
	};

	_pGrid._createEditor = function (cellobj) {
		var cellinfo = cellobj._refobj;
		var datarow = this._getDataRow(cellobj._rowidx);
		var editType = cellinfo._getEdittype(datarow);

		var creator = this["_createEditor_" + editType];

		if (creator == null) {
			creator = this._createEditor_text;
		}

		if (this._tempEditor) {
			if (this._isDownActionKeyMouse()) {
				this._destroyeditors.push(this._tempEditor);
				this._tempEditor = null;
			}
			else {
				var tempEditor = this._tempEditor;
				nexacro.OnceCallbackTimer.callonce(this, function () {
					if (tempEditor) {
						tempEditor.destroy();
						tempEditor = null;
					}
				}, 10);
			}
		}

		var edit = creator.call(this, cellobj);
		this._tempEditor = this._currentCellEditor = edit;

		return edit;
	};

	_pGrid.getShowEditor = function () {
		var refer_comp = this._currentCellEditor;
		if (refer_comp instanceof nexacro.GridControlEdit || 
			refer_comp instanceof nexacro.GridControlTextArea || 
			refer_comp instanceof nexacro.GridControlMaskEdit) {
			return refer_comp;
		}
		else {
			return false;
		}
	};

	_pGrid._createEditor_text = function (cellobj) {
		return this._createEditor_edit(cellobj);
	};

	_pGrid._createEditor_readonly = function (cellobj) {
		return this._createEditor_textarea(cellobj, true);
	};

	_pGrid._createEditor_mask = function (cellobj, type) {
		return this._createEditor_maskedit(cellobj);
	};

	_pGrid._createEditor_masknumber = function (cellobj, type) {
		return this._createEditor_maskedit(cellobj);
	};

	_pGrid._createEditor_button = function (cellobj) {
		var rect = cellobj._setPositionInGrid();
		var cButton = new nexacro.GridControlButton("controlbutton", rect.left, rect.top, rect.width, rect.height, this);
		cButton._cellobj = cellobj;
		cButton._cellinfo = cellobj._refobj;
		cButton.createComponent();
		return cButton;
	};

	_pGrid._createEditor_edit = function (cellobj, readonly) {
		var datarow = this._getDataRow(cellobj._rowidx);
		var rect = cellobj._setPositionInGrid();
		var composition_stat = this._currentCompositionStatus;
		var composition_data = this._currentCompositionData;

		var cEdit = new nexacro.GridControlEdit("controledit", rect.left, rect.top, rect.width, rect.height, this);
		cEdit._cellobj = cellobj;
		cEdit._cellinfo = cellobj._refobj;

		var v = cEdit._cellinfo._getValue(datarow);

		cEdit._set_absolutelyValue(v);

		cEdit.createComponent();

		var cellinfo = cellobj._refobj;
		var editlimit = cellinfo._getAttrValue(cellinfo.editlimit, datarow);

		if (editlimit == 0) {
			editlimit = this._binddataset._getColumnSize(cellinfo.text._bindtype == 1 ? cellinfo.text._bindexpr : 0);
		}

		cEdit.set_maxlength(editlimit);

		if (readonly) {
			cEdit.set_readonly(true);
		}

		if (nexacro.Browser == "Safari") {
			if (composition_stat == nexacro.EditBase.Status.CompositionStart) {
				cEdit._on_input_compositionstart(composition_data);
			}
			else if (composition_stat == nexacro.EditBase.Status.CompositionUpdate) {
				cEdit._on_input_compositionupdate(composition_data);
			}
		}
		return cEdit;
	};

	_pGrid._createEditor_maskedit = function (cellobj, type) {
		var datarow = this._getDataRow(cellobj._rowidx);
		var rect = cellobj._setPositionInGrid();
		var cMaskEdit = new nexacro.GridControlMaskEdit("controlmaskedit", rect.left, rect.top, rect.width, rect.height, this);
		cMaskEdit._cellobj = cellobj;
		cMaskEdit._cellinfo = cellobj._refobj;

		var v = cMaskEdit._cellinfo._getValue(datarow);
		cMaskEdit._set_absolutelyValue(v);

		var edittype = cMaskEdit._cellinfo._getEdittype(datarow);
		var editType = cMaskEdit._cellinfo._getAttrValue(cMaskEdit._cellinfo.edittype, datarow);
		var displayType = cMaskEdit._cellinfo._getDisplaytype(datarow);
		var locale = cMaskEdit._cellinfo._getAttrValue(cMaskEdit._cellinfo.locale, datarow);

		if (edittype == "masknumber") {
			cMaskEdit.set_type("number");
		}
		else {
			if (editType == "normal") {
				if (displayType == "number") {
					cMaskEdit.set_type("number");
				}
				else {
					cMaskEdit.set_type("string");
				}
			}
			else {
				cMaskEdit.set_type("string");
			}
		}

		if (edittype == "masknumber" || edittype == "mask") {
			v = cMaskEdit._cellinfo._getAttrValue(cMaskEdit._cellinfo.mask, datarow);
			if (v != null) {
				cMaskEdit.set_mask(v);
			}
		}

		if (!locale) {
			locale = this.locale;
		}

		cMaskEdit.createComponent();
		cMaskEdit.set_locale(locale);

		return cMaskEdit;
	};

	_pGrid._createEditor_combo = function (cellobj) {
		var rect = cellobj._setPositionInGrid();
		var cCombo = new nexacro.GridControlCombo("controlcombo", rect.left, rect.top, rect.width, rect.height, this);
		cCombo._cellobj = cellobj;
		cCombo._cellinfo = cellobj._refobj;
		cCombo.createComponent();
		return cCombo;
	};

	_pGrid._createEditor_date = function (cellobj) {
		var datarow = this._getDataRow(cellobj._rowidx);
		var rect = cellobj._setPositionInGrid();
		var cCalendar = new nexacro.GridControlCalendar("controlcalendar", rect.left, rect.top, rect.width, rect.height, this);
		cCalendar._cellobj = cellobj;
		cCalendar._cellinfo = cellobj._refobj;

		var v = cCalendar._cellinfo._getValue(datarow);
		var mask = cCalendar._cellinfo._getAttrValue(cCalendar._cellinfo.mask, datarow);
		var locale = cCalendar._cellinfo._getAttrValue(cCalendar._cellinfo.locale, datarow);

		if (this._displaymode == true && !v) {
			v = cCalendar._cellinfo._getDisplayText(datarow);
		}

		if (!mask || mask.length == 0) {
			mask = "yyyy-MM-dd";
		}

		if (!locale) {
			locale = this._getLocale();
		}
		cCalendar.createComponent();

		cCalendar.set_editformat(mask);
		cCalendar.set_dateformat(mask);

		cCalendar._currentformat = "editformat";
		cCalendar.set_value(cCalendar._toValueStr(v));


		cCalendar.set_locale(locale);

		cCalendar._resizeCalendar();
		return cCalendar;
	};

	_pGrid._createEditor_textarea = function (cellobj, readonly) {
		var datarow = this._getDataRow(cellobj._rowidx);
		var rect = cellobj._setPositionInGrid();
		var composition_stat = this._currentCompositionStatus;
		var composition_data = this._currentCompositionData;

		var cTextArea = new nexacro.GridControlTextArea("controltextarea", rect.left, rect.top, rect.width, rect.height, this);
		cTextArea._cellobj = cellobj;
		cTextArea._cellinfo = cellobj._refobj;

		var v;
		if (cTextArea._displaymode == true || readonly) {
			v = cTextArea._cellinfo._getDisplayText(datarow);
		}
		else {
			v = cTextArea._cellinfo._getValue(datarow);
		}

		cTextArea._set_absolutelyValue(v);

		var wordwrap = cTextArea._cellinfo._getWordwrap(datarow);
		cTextArea.set_wordwrap(wordwrap);

		cTextArea.createComponent();

		var cellinfo = cellobj._refobj;
		var datarow = this._getDataRow(cellobj._rowidx);
		var editlimit = cellinfo._getAttrValue(cellinfo.editlimit, datarow);

		if (editlimit == 0) {
			editlimit = this._binddataset._getColumnSize(cellinfo._col);
		}

		cTextArea.set_maxlength(editlimit);

		if (readonly) {
			cTextArea.set_readonly(true);
		}

		if (nexacro.Browser == "Safari") {
			if (composition_stat == nexacro.EditBase.Status.CompositionStart) {
				cTextArea._on_input_compositionstart(composition_data);
			}
			else if (composition_stat == nexacro.EditBase.Status.CompositionUpdate) {
				cTextArea._on_input_compositionupdate(composition_data);
			}
		}

		return cTextArea;
	};

	_pGrid._setFocus = function (bResetScroll, dir, block_inner_focus) {
		if (nexacro._enableaccessibility) {
			this._currentBand = "grid";
			this._accept_arrow = true;
			this._removeAccessibilityCurrentFocus();

			if (dir == 2) {
				var accessibility = this.on_find_CurrentStyle_accessibility(this._pseudo);
				if (accessibility && accessibility.enable == false) {
					this._setAccessibilityBandFocus("next", true, false);
				}
			}
			else if (dir == 3) {
				this._setAccessibilityBandFocus("prev", true);
			}
		}


		return nexacro.Component.prototype._setFocus.call(this, bResetScroll, dir, block_inner_focus);
	};

	_pGrid._evtvalue = function (obj, postvalue) {
		var val = "";

		if (obj && obj.value) {
			val = obj.value;
		}
		else if (postvalue) {
			val = postvalue;
		}

		return val;
	};

	_pGrid._getAvailableRect = function (comp) {
		var rect = {
			left : 0, 
			top : 0, 
			right : 0, 
			bottom : 0, 
			width : 0, 
			height : 0
		};
		rect.left = comp._client_left;
		rect.top = comp._client_top;
		rect.right = comp._client_left + comp._client_width;
		rect.bottom = comp._client_top + comp._client_height;
		rect.width = comp._client_width;
		rect.height = comp._client_height;
		return rect;
	};
	_pGrid._getPosRect = function (comp) {
		var rect = {
			left : comp._adjust_left, 
			top : comp._adjust_top, 
			right : comp._getPosRight(), 
			bottom : comp._getPosBottom(), 
			width : comp._adjust_width, 
			height : comp._adjust_height
		};
		return rect;
	};

	_pGrid._closePopup = function () {
		var edit = this._currentCellEditor;
		if (edit && edit.popupwindow) {
			edit._closePopup();
		}
	};


	_pGrid._destroyOverlayElements = function () {
		var overlay_elements = this._overlay_elements;
		if (overlay_elements.length) {
			for (var i = 0; i < overlay_elements.length; i++) {
				overlay_elements[i].destroy();
			}
			overlay_elements = [];
		}
		this._overlay_elements = [];
	};

	_pGrid._setOverlayElements = function (overlay_elements, overlay_index) {
		if (overlay_index > -1 && overlay_index < overlay_elements.length) {
			for (var i = overlay_elements.length - 1; i >= overlay_index; i--) {
				overlay_elements[i].destroy();
				overlay_elements.splice(i, 1);
			}
		}
		this._overlay_elements = overlay_elements;
	};

	_pGrid._setOverlayElementProperty = function (elem, left, top, width, height, style_cells, display_text, is_fake_merge) {
		if (!elem) {
			return;
		}


		elem.setElementPosition(left, top);
		elem.setElementSize(width, height);

		if (style_cells && style_cells.length > 0) {
			var cellobj = style_cells[0];
			var cellinfo = cellobj._refobj;
			if (!is_fake_merge && cellinfo.suppressalign.indexOf("first") != 0) {
				if (cellinfo.suppressalign.indexOf("last") == 0) {
					cellobj = style_cells[style_cells.length - 1];
				}
				else {
					cellobj = style_cells[Math.floor(style_cells.length / 2)];
				}
				cellinfo = cellobj._refobj;
			}

			var selected = cellobj._selected;

			cellobj._selected = false;
			var datarow = this._getDataRow(cellobj._rowidx);


			elem.setElementText(cellobj._getDisplayText());
			elem.setElementWordWrap(cellinfo._getWordwrap(datarow));


			var font = cellobj.on_find_CurrentStyle_font(cellobj._pseudo);
			var color = cellobj.on_find_CurrentStyle_color(cellobj._pseudo);
			var letterspace = cellobj.on_find_CurrentStyle_letterspace(cellobj._pseudo);
			elem.setElementFont(font);
			elem.setElementLetterSpace(letterspace);
			elem.setElementColor(color);


			var align = cellobj.on_find_CurrentStyle_align(cellobj._pseudo);
			if (is_fake_merge) {
				elem.setElementAlignXY("center", "middle");
			}
			else if (cellinfo.suppressalign.indexOf("first") == 0) {
				elem.setElementAlignXY(align.halign, "top");
			}
			else if (cellinfo.suppressalign.indexOf("last") == 0) {
				elem.setElementAlignXY(align.halign, "bottom");
			}
			else {
				elem.setElementAlignXY(align.halign, "middle");
			}

			var cell_hpos = 0;
			var merge_width = cellobj.width;
			if (is_fake_merge) {
				var merge_col = cellinfo._col;
				var style_cellinfo = null;
				for (var i = 1; i < style_cells.length; i++) {
					style_cellinfo = style_cells[i]._refobj;
					if (style_cellinfo && merge_col < style_cellinfo._col) {
						merge_width += style_cells[i].width;
						merge_col = style_cellinfo._col;
					}
				}
			}

			var border = cellobj.on_find_CurrentStyle_border(cellobj._pseudo);
			var padding = cellobj.on_find_CurrentStyle_padding(cellobj._pseudo);
			if (merge_width > (width + padding.left + border._right_width)) {
				cell_hpos = merge_width - (width + padding.left + border._right_width);
			}
			elem.updateCellNodeClient(left, top, width, height, cell_hpos);
			cellobj._selected = selected;
		}
	};

	_pGrid._adjustOverlayElements = function (is_create, fake_merge) {
		if (is_create || fake_merge) {
			this._destroyOverlayElements();
		}

		if (!this._curFormat || (!this._is_use_suppress && !this._is_use_fakemerge)) {
			return false;
		}

		var retn = false;
		var overlay_elements = this._overlay_elements;
		var elements = [], style_cells = [], display_text = "", cellobj = null, cellinfo = null;
		var pos = null, elem = null, style_cell = null;
		var left = 0, top = 0, width = 0, height = 0, overlay_index = 0;
		var cols_len = this._curFormat._cols.length;

		if (this._is_use_suppress) {
			var band = this._bodyBand;

			if (!band) {
				return false;
			}

			var rows = band._get_rows();
			if (!rows.length) {
				return false;
			}

			var cells = rows[0]._cells;
			for (var i = 0; i < cols_len; i++) {
				cellinfo = this._getBodyCellInfo(i);
				if (cellinfo && cellinfo.suppressalign.indexOf("over") > 0) {
					cellidx = i;
					top = left = -1;
					width = height = 0;

					elements = [];
					for (var j = 0; j < rows.length; j++) {
						cellobj = this._getBodyCellItem(j, cellidx);

						if (cellobj) {
							pos = cellobj._setPositionInGrid();
							left = (left < 0) ? pos.left : left;
							top = (top < 0) ? pos.top : top;


							if (pos.top > top) {
								elements.push(cellobj._control_element);
							}
							else {
								elements.splice(0, 1, cellobj._control_element);
							}

							var subrow_index = 1;
							var subrow_cell = null;
							if (cells.length > cols_len && cellinfo._rowspan == 1) {
								subrow_cell = this._getBodyCellItem(j, cellidx + (cols_len * subrow_index));
								while (subrow_cell) {
									elements.push(subrow_cell._control_element);
									subrow_index++;
									subrow_cell = this._getBodyCellItem(j, cellidx + (cols_len * subrow_index));
								}
								subrow_cell = elements[elements.length - 1].linkedcontrol;
								subrow_index = null;
							}

							if (cellobj._getSuppressInfo().text_proc == 0) {
								display_text = cellobj._display_text;
							}

							if (!cellobj._hideInner) {
								cellobj._hideInnerElement();
							}

							style_cells.push(cellobj);

							if (cellobj._getSuppressInfo().last) {
								if (subrow_cell) {
									pos = subrow_cell._setPositionInGrid();
									subrow_cell = null;
								}
								width = (pos.right > left) ? pos.right - left : 0;
								height = (pos.bottom > top) ? pos.bottom - top : 0;

								elem = null;
								if (elements.length > 1) {
									if (overlay_elements[overlay_index]) {
										elem = overlay_elements[overlay_index];
										elem.setTargetElements(elements);
									}
									else {
										elem = new nexacro.EventPassOverlayElement(this._control_element, elements);
										elem.create();
										overlay_elements.push(elem);
									}

									if (elem) {
										overlay_index++;
										this._setOverlayElementProperty(elem, left, top, width, height, style_cells, display_text);
									}
								}
								else {
									cellobj._showInnerElement();
								}

								elements = [];
								style_cells = [];
								display_text = "";
								pos = style_cell = null;
								left = top = -1;
								height = width = 0;
							}
						}
					}
				}
			}
			retn = true;
		}


		var fake_mergecell_arr = this._fake_mergecell_arr;
		if (this._is_use_fakemerge && fake_mergecell_arr.length) {
			var start_column, end_column, start_row, end_row, subrow_start, subrow_end;
			for (var i = 0; i < fake_mergecell_arr.length; i++) {
				elements = [];
				style_cells = [];
				fake_mergecell = fake_mergecell_arr[i];
				start_row = fake_mergecell.start_row;
				end_row = fake_mergecell.end_row;
				start_column = fake_mergecell.start_column;
				end_column = fake_mergecell.end_column;

				var j = 0;
				if (fake_mergecell.start_row == -1 || fake_mergecell.start_row == -2) {
					j = start_column;
				}

				for (; j <= end_column; j++) {
					if (fake_mergecell.start_row == -1) {
						start_row = end_row = 0;
						subrow_start = (fake_mergecell.start_subrow >= 0) ? fake_mergecell.start_subrow : 0;
						subrow_end = (fake_mergecell.end_subrow >= 0) ? fake_mergecell.end_subrow : this._curFormat._headrows.length - 1;
					}
					else if (fake_mergecell.start_row == -2) {
						start_row = end_row = 0;
						subrow_start = (fake_mergecell.start_subrow >= 0) ? fake_mergecell.start_subrow : 0;
						subrow_end = (fake_mergecell.end_subrow >= 0) ? fake_mergecell.end_subrow : this._curFormat._summrows.length - 1;
					}
					else {
						cellinfo = this._getBodyCellInfo(j);
						if (cellinfo) {
							if (cellinfo._col < start_column || cellinfo._col > end_column) {
								continue;
							}
						}
						else {
							break;
						}
					}

					for (var k = start_row; k <= end_row; k++) {
						if (fake_mergecell.start_row >= 0) {
							subrow_start = 0;
							subrow_end = this._curFormat._bodyrows.length - 1;

							if (k == end_row && fake_mergecell.end_subrow != undefined) {
								subrow_end = fake_mergecell.end_subrow;
							}

							if (k == start_row && fake_mergecell.start_subrow != undefined) {
								subrow_start = fake_mergecell.start_subrow;
							}
						}

						for (var l = subrow_start; l <= subrow_end; l++) {
							if (fake_mergecell.start_row == -1) {
								cellobj = this._getCurrentHeadCell(j + (cols_len * l), true);
							}
							else if (fake_mergecell.start_row == -2) {
								cellobj = this._getCurrentSummCell(j + (cols_len * l), true);
							}
							else {
								cellobj = this._getCurrentBodyCell(k, j + (cols_len * l));
							}

							if (cellobj) {
								elements.push(cellobj._control_element);
								style_cells.push(cellobj);
							}
						}
					}
				}

				if (style_cells.length > 0) {
					if (style_cells.length > 1) {
						style_cell = null, display_text = null;
						elem = overlay_elements[overlay_index];
						if (!elem) {
							elem = new nexacro.EventPassOverlayElement(this._control_element, elements);
							elem.create();
							overlay_elements.push(elem);
						}
						else {
							elem.setTargetElements(elements);
						}

						cellinfo = style_cells[0]._refobj;
						if (cellinfo) {
							if (style_cells[0].subcells.length) {
								cellinfo = style_cells[0].subcells[0]._refobj;
							}
							display_text = cellinfo._getDisplayText(fake_mergecell.start_row);
						}

						var s_pos = style_cells[0]._setPositionInGrid();
						var e_pos = style_cells[style_cells.length - 1]._setPositionInGrid();
						left = s_pos.left;
						top = s_pos.top;
						width = (e_pos.right > left) ? e_pos.right - left : 0;
						height = (e_pos.bottom > top) ? e_pos.bottom - top : 0;

						this._setOverlayElementProperty(elem, left, top, width, height, style_cells, display_text, true);

						left = top = width = height = 0;
						s_pos = null, e_pos = null, style_cell = null, display_text = "", elem = null;
						overlay_index++;
					}
					else {
						style_cells[0]._showInnerElement();
					}
				}
				fake_mergecell = null, e_cell = null;
			}
			retn = true;
		}

		this._setOverlayElements(overlay_elements, overlay_index);
		return retn;
	};


	_pGrid._moveToAccessibilityCell = function (type, tabstop, extcomp, colmove) {
		if (this._is_band_focus && !tabstop) {
			var retn = true;
			if (type == "prev" || type == "up") {
				retn = this._setAccessibilityBandFocus(type);
			}
			else {
				if (type == "next" || (type == "down" && this._currentBand == "head")) {
					this.currentcell = this.currentsubrow = this.currentcol = 0;
				}

				if (!this._moveToPosAccessibilityCell(this.currentrow, this.currentcell)) {
					retn = this._setAccessibilityBandFocus(type);
				}
			}
			return retn;
		}

		if (this._currentBand == "grid") {
			if (type == "prev" || type == "next" || type == "down") {
				if (tabstop) {
					if (type == "next") {
						if (this._bodyBand && this._bodyBand._get_rows().length > 0) {
							var editcell = null;
							editcell = this._getFirstEditableCell();

							if (editcell && editcell.row !== null) {
								this._showEditorFocus = true;
								if (this.vscrollbar && this.vscrollbar.visible) {
									this.vscrollbar.set_pos(0);
								}

								this._currentBand = "body";
								this._moveToPosAccessibilityCell(editcell.row, editcell.cell);
								this._showEditorFocus = false;
								return true;
							}
						}
					}
					return false;
				}
				return this._setAccessibilityBandFocus(type, true);
			}
			else {
				this._accept_arrow = false;
				return false;
			}
		}

		var band;
		var retn = true;
		var cellobj = null;
		var accessibility_enable = false;
		this._is_band_focus = false;
		this._beforegridrowpos = this.currentrow;
		this._beforegridcolpos = this.currentcol;

		if (this._currentBand == "body") {
			this._is_first_bodycell = false;

			if (this._showEditing) {
				this._hideEditor();
			}

			for (; true; ) {
				if (tabstop) {
					retn = this._moveToCell(type, true, colmove, undefined, undefined, true);
				}
				else {
					retn = this._moveToCell(type, false, colmove, undefined, undefined, true);
				}

				if (retn) {
					cellobj = this._getAccessibilityCurrentCell();
					if (cellobj) {
						if (tabstop) {
							cellobj._setFocus(false);
							break;
						}
						else {
							var cellinfo = cellobj._refobj;
							var datarow = this._getDataRow(cellobj._rowidx);
							var display_type = cellinfo._getDisplaytype(datarow);

							accessibility_enable = cellobj._isAccessibilityEnable();
							if (accessibility_enable) {
								if (type == "up" || type == "down") {
									if (this._isSelectRowType() && display_type != "tree") {
										var rowobj = cellobj.parent;
										rowobj._setFocus(false);
										break;
									}
								}
								this._showEditor();
								if (!this._showEditing) {
									if (cellobj._subComp && display_type != "tree") {
										cellobj._subComp._setFocus(false);
									}
									else {
										cellobj._setFocus(false);
									}
								}
								break;
							}
						}
					}
				}
				else {
					if (!tabstop) {
						retn = this._setAccessibilityBandFocus(type);
					}
					break;
				}
			}
			return retn;
		}
		if (tabstop) {
			if (this._currentBand == "head") {
				if (this._bodyBand._get_rows().length > 0) {
					this._currentBand = "body";
					var editcell = this._getFirstEditableCell();

					if (editcell.row !== null) {
						this._is_first_bodycell = true;
						retn = this._moveToPosAccessibilityCell(editcell.row, editcell.cell);
					}
					return true;
				}
			}
			return false;
		}

		if (type == "next") {
			for (; true; ) {
				this.currentcell++;
				cellobj = this._getAccessibilityCurrentCell();
				if (cellobj) {
					if (cellobj.width <= 0) {
						continue;
					}
					else {
						accessibility_enable = cellobj._isAccessibilityEnable();
						if (!accessibility_enable) {
							continue;
						}

						var cellinfo = cellobj._refobj;
						this.currentsubrow = cellinfo._row;
						this.currentcol = cellinfo._col;
						cellobj._showfull();
						cellobj._setFocus(false);
					}
				}
				else {
					this.currentcell--;
					retn = this._setAccessibilityBandFocus(type);
				}
				break;
			}
		}
		else if (type == "prev") {
			for (; true; ) {
				this.currentcell--;
				cellobj = this._getAccessibilityCurrentCell();
				if (cellobj) {
					if (cellobj.width <= 0) {
						continue;
					}
					else {
						accessibility_enable = cellobj._isAccessibilityEnable();
						if (!accessibility_enable) {
							continue;
						}

						var cellinfo = cellobj._refobj;
						this.currentsubrow = cellinfo._row;
						this.currentcol = cellinfo._col;
						cellobj._showfull();
						cellobj._setFocus(false);
					}
				}
				else {
					this.currentcell++;
					retn = this._setAccessibilityBandFocus(type);
				}
				break;
			}
		}
		else if (type == "up") {
			if (this._currentBand == "head") {
				band = this._headBand;
			}
			else {
				band = this._summBand;
			}

			if (band) {
				var row, col;
				cellobj = this._getAccessibilityCurrentCell();

				if (cellobj) {
					var cellinfo = cellobj._refobj;
					var curRow = cellinfo._row;
					var curCol = cellinfo._col;
					var cellidx = this.currentcell;
					while (true) {
						this.currentcell--;
						cellobj = this._getAccessibilityCurrentCell();
						if (cellobj) {
							row = cellobj._refobj._row;
							col = cellobj._refobj._col;

							if (col == curCol && row == curRow - 1) {
								accessibility_enable = cellobj._isAccessibilityEnable();
								if (!accessibility_enable) {
									continue;
								}

								this.currentsubrow = row;
								this.currentcol = col;
								cellobj._setFocus(false);
								break;
							}
						}
						else {
							if (this.currentcell <= 0) {
								this.currentcol = curCol;
								this.currentcell = cellidx;
								retn = this._setAccessibilityBandFocus(type);
								break;
							}
						}
					}
				}
			}
		}
		else if (type == "down") {
			var row, col;
			cellobj = this._getAccessibilityCurrentCell();

			if (cellobj) {
				var cellinfo = cellobj._refobj;
				var curRow = cellinfo._row;
				var curCol = cellinfo._col;
				var cellidx = this.currentcell;
				while (true) {
					this.currentcell++;
					cellobj = this._getAccessibilityCurrentCell();
					if (cellobj) {
						row = cellobj._refobj._row;
						col = cellobj._refobj._col;

						if (col == curCol && row == curRow + 1) {
							this.currentsubrow = row;
							this.currentcol = col;
							cellobj._setFocus(false);
							break;
						}
					}
					else {
						this.currentcell = cellidx;
						retn = this._setAccessibilityBandFocus(type);
						break;
					}
				}
			}
		}
		return retn;
	};

	_pGrid._setAccessibilityBandFocus = function (type, extcomp, hotkey) {
		var retn = true, band = null, curBand = this._currentBand;
		if (type == "next") {
			if (curBand == "grid") {
				if (this._headBand) {
					band = this._headBand;
					this._currentBand = "head";
					this._currentDSrow = this.currentrow = -1;
				}
				else if (this._bodyBand && this.body && this.summarytype != "top" && this.summarytype != "lefttop") {
					band = this._bodyBand;
					this._currentBand = "body";
					this._currentDSrow = this.currentrow = 0;
				}
				else if (this._summBand) {
					band = this._summBand;
					this._currentBand = "summ";
					this._currentDSrow = this.currentrow = -2;
				}
				else {
					this._accept_arrow = false;
					retn = false;
				}
			}
			else {
				if (curBand == "head") {
					if (this._bodyBand && this.summarytype != "top" && this.summarytype != "lefttop") {
						this._is_first_bodycell = true;
						band = this._bodyBand;
						this._currentBand = "body";
						this._currentDSrow = this.currentrow = 0;
					}
					else if (this._summBand) {
						band = this._summBand;
						this._currentBand = "summ";
						this._currentDSrow = this.currentrow = -2;
					}
				}
				else if (curBand == "body") {
					if (this._summBand && this.summarytype != "top" && this.summarytype != "lefttop") {
						this._hideEditor();
						band = this._summBand;
						this._currentBand = "summ";
						this._currentDSrow = this.currentrow = -2;
					}
				}
				else if (curBand == "summ" && (this.summarytype == "top" || this.summarytype == "lefttop")) {
					if (this._bodyBand) {
						this._is_first_bodycell = true;
						band = this._bodyBand;
						this._currentBand = "body";
						this._currentDSrow = this.currentrow = 0;
					}
				}
			}

			if (band) {
				if (hotkey) {
					this.currentsubrow = 0;
					this._moveToPosAccessibilityCell(this.currentrow, this.currentcell);
				}
				else {
					var accessibility_enable = band._isAccessibilityEnable();
					if (!this._is_band_focus
						 && (accessibility_enable || (band._isBody && this.rowcount <= 0))) {
						if (extcomp) {
							this.currentcell = this.currentsubrow = this.currentcol = 0;
						}
						this._moveToAccessibilityBand(false);
					}
					else {
						if (curBand == "grid" && extcomp && !this.on_find_CurrentStyle_accessibility(this._pseudo).enable) {
							this._first_focus = true;
						}
						this.currentcell = this.currentsubrow = this.currentcol = 0;
						this._moveToPosAccessibilityCell(this.currentrow, this.currentcell);
					}
				}
			}
		}
		else if (type == "prev") {
			if (curBand == "grid") {
				if (extcomp || hotkey) {
					if (this._summBand && this.summarytype != "top" && this.summarytype != "lefttop") {
						band = this._summBand;
						this._currentBand = "summ";
						this._currentDSrow = this.currentrow = -2;
						this.currentsubrow = band._get_rows()[0]._format_rows.length - 1;
					}
					else if (this._bodyBand && this.body) {
						band = this._bodyBand;
						this._currentBand = "body";
						this._currentDSrow = this.currentrow = this.rowcount - 1;
						this.currentsubrow = 0;
					}
					else if (this._headBand) {
						band = this._headBand;
						this._currentBand = "head";
						this._currentDSrow = this.currentrow = -1;
						this.currentsubrow = band._get_rows()[0]._format_rows.length - 1;
					}
					else {
						retn = false;
					}
				}
				else {
					retn = false;
				}
			}
			else {
				if (curBand == "summ") {
					var accessibility_enable = this._summBand._isAccessibilityEnable();
					if (!this._is_band_focus && accessibility_enable) {
						this._moveToAccessibilityBand(false);
					}
					else {
						if (this._bodyBand && this.summarytype != "top" && this.summarytype != "lefttop") {
							this._is_first_bodycell = true;
							band = this._bodyBand;
							this._currentBand = "body";
							this.currentrow = this._currentDSrow = this.rowcount - 1;
						}
						else if (this._headBand) {
							band = this._headBand;
							this._currentBand = "head";
							this._currentDSrow = this.currentrow = -1;
						}
					}
				}
				else if (curBand == "body") {
					var accessibility_enable = this._bodyBand._isAccessibilityEnable();
					if (!this._is_band_focus && accessibility_enable) {
						this._hideEditor();
						this._moveToAccessibilityBand(false);
					}
					else {
						if (this._summBand && (this.summarytype == "top" || this.summarytype == "lefttop")) {
							this._hideEditor();
							band = this._summBand;
							this._currentBand = "summ";
							this._currentDSrow = this.currentrow = -2;
							this.currentsubrow = this._curFormat._summrows.length - 1;
						}
						else if (this._headBand) {
							this._hideEditor();
							band = this._headBand;
							this._currentBand = "head";
							this._currentDSrow = this.currentrow = -1;
							this.currentsubrow = this._curFormat._headrows.length - 1;
						}
					}
				}
			}

			if (band) {
				var accessibility_enable = band._isAccessibilityEnable();
				if (band._isBody && this.rowcount <= 0) {
					this._removeAccessibilityCurrentFocus();
					band._setFocus(false);
					this.currentcol = this._curFormat._cols.length - 1;
					this.currentcell = -1;
				}
				else {
					if (!hotkey) {
						this.currentcol = this._curFormat._cols.length - 1;
						this.currentcell = this._getAccessibilityLastCellIndex() - 1;
					}
					this._moveToPosAccessibilityCell(this.currentrow, this.currentcell);
				}
			}
		}
		else if (type == "up") {
			if (curBand == "summ") {
				var accessibility_enable = this._summBand._isAccessibilityEnable();
				if (!this._is_band_focus && accessibility_enable) {
					this._moveToAccessibilityBand(false);
				}
				else {
					if (this._bodyBand && this.summarytype != "top" && this.summarytype != "lefttop") {
						band = this._bodyBand;
						this._currentBand = "body";
						this._currentDSrow = this.currentrow = this.rowcount - 1;
						this.currentsubrow = 0;
					}
					else if (this._headBand) {
						band = this._headBand;
						this._currentBand = "head";
						this._currentDSrow = this.currentrow = -1;
						this.currentsubrow = this._curFormat._headrows.length - 1;
					}
					else {
						curBand = "grid";
					}
				}
			}
			else if (curBand == "body") {
				var accessibility_enable = this._bodyBand._isAccessibilityEnable();
				if (!this._is_band_focus && accessibility_enable) {
					this._hideEditor();
					this._moveToAccessibilityBand(false);
				}
				else {
					if (this._summBand && (this.summarytype == "top" || this.summarytype == "lefttop")) {
						this._hideEditor();
						band = this._summBand;
						this._currentBand = "summ";
						this._currentDSrow = this.currentrow = -2;
						this.currentsubrow = this._curFormat._summrows.length - 1;
					}
					else if (this._headBand) {
						this._hideEditor();
						band = this._headBand;
						this._currentBand = "head";
						this._currentDSrow = this.currentrow = -1;
						this.currentsubrow = this._curFormat._headrows.length - 1;
					}
					else {
						curBand = "grid";
					}
				}
			}
			else if (curBand == "head" && this.currentcell <= 0) {
				var accessibility_enable = this._headBand._isAccessibilityEnable();
				if (!this._is_band_focus && accessibility_enable) {
					this._moveToAccessibilityBand(false);
				}
				else {
					curBand = "grid";
				}
			}

			if (band) {
				this._moveToPosAccessibilityCell(this.currentrow, this.currentcell);
			}
			else if (curBand == "grid") {
				this._is_band_focus = false;
				this._currentBand = curBand;
				var accessibility = this.on_find_CurrentStyle_accessibility(this._pseudo);
				if (accessibility && accessibility.enable) {
					this._moveToAccessibilityBand(true);
				}
				else {
					retn = this._moveToAccessibilityCell(type);
				}
			}
		}
		else if (type == "down") {
			if (curBand == "grid") {
				retn = this._setAccessibilityBandFocus("next", true);
			}
			else {
				if (curBand == "head") {
					if (this._bodyBand && this.summarytype != "top" && this.summarytype != "lefttop") {
						this._is_first_bodycell = true;
						band = this._bodyBand;
						this._currentBand = "body";
						this._currentDSrow = this.currentrow = 0;
					}
					else if (this._summBand) {
						band = this._summBand;
						this._currentBand = "summ";
						this._currentDSrow = this.currentrow = -2;
					}
				}
				else if (curBand == "body" && this.summarytype != "top" && this.summarytype != "lefttop") {
					if (this._summBand) {
						this._hideEditor();
						band = this._summBand;
						this._currentBand = "summ";
						this._currentDSrow = this.currentrow = -2;
					}
					else if (this._bodyBand && this.rowcount <= 0) {
						this._hideEditor();
						this._accept_arrow = false;
						retn = false;
					}
				}
				else if (curBand == "summ" && (this.summarytype == "top" || this.summarytype == "lefttop")) {
					if (this._bodyBand) {
						this._is_first_bodycell = true;
						band = this._bodyBand;
						this._currentBand = "body";
						this._currentDSrow = this.currentrow = 0;
					}
				}

				if (band) {
					var accessibility_enable = band._isAccessibilityEnable();
					if (!this._is_band_focus && (accessibility_enable || (this.rowcount <= 0 && band._isBody))) {
						this._moveToAccessibilityBand(false);
					}
					else {
						this.currentsubrow = 0;
						this._moveToPosAccessibilityCell(this.currentrow, this.currentcell);
					}
				}
				else if (this.currentcell >= this._getAccessibilityLastCellIndex() - 1) {
					this._accept_arrow = false;
					retn = false;
				}
			}
		}
		return retn;
	};

	_pGrid._getAccessibilityCurrentCell = function (ridx, cidx) {
		var cellobj = null;

		if (ridx === undefined || cidx === undefined) {
			ridx = -1;
			cidx = -1;
		}
		else if (cidx < 0) {
			cidx = this._getAccessibilityCellIndex();
		}

		if (this._currentBand == "body") {
			cellobj = this._getCurrentBodyCell(ridx, cidx);
		}
		else {
			if (this._currentBand == "head") {
				cellobj = this._getCurrentHeadCell(cidx, true);
			}
			else {
				cellobj = this._getCurrentSummCell(cidx, true);
			}
		}
		return cellobj;
	};

	_pGrid._getAccessibilityLastCellIndex = function () {
		var cellidx = -1;
		if (this._currentBand == "head" && this._curFormat._headcells) {
			cellidx = this._curFormat._headcells.length;
		}
		else if (this._currentBand == "body" && this._curFormat._bodycells) {
			cellidx = this._curFormat._bodycells.length;
		}
		else if (this._currentBand == "summ" && this._curFormat._summcells) {
			cellidx = this._curFormat._summcells.length;
		}
		return cellidx;
	};

	_pGrid._removeAccessibilityCurrentFocus = function (togrid) {
		var win = this._getWindow();
		if (togrid) {
			win._removeFromCurrentFocusPath(this, true);
		}
		else {
			if (this._currentBand == "body") {
				win._removeFromCurrentFocusPath(this._bodyBand, true);
			}
			else if (this._currentBand == "head") {
				win._removeFromCurrentFocusPath(this._headBand, true);
			}
			else if (this._currentBand == "summ") {
				win._removeFromCurrentFocusPath(this._summBand, true);
			}
		}
	};

	_pGrid._moveToAccessibilityBand = function (togrid) {
		this._removeAccessibilityCurrentFocus(togrid);

		if (!togrid) {
			this._is_band_focus = true;
			var curBand = this._currentBand;
			if (curBand == "head") {
				this._headBand._setFocus(false);
			}
			else if (curBand == "body") {
				this._bodyBand._setFocus(false);
			}
			else if (curBand == "summ") {
				this._summBand._setFocus(false);
			}
		}
		else {
			this._setFocus(false);
		}
	};

	_pGrid._moveToPosAccessibilityCell = function (rowidx, cellidx) {
		var retn = false, cellobj = null, rowidx = this._getDataRow(rowidx), cellidx = this._getAccessibilityCellIndex(cellidx);

		if (this._currentBand == "body" && this._bodyBand._get_rows().length > 0) {
			this._hideEditor();
			cellobj = this._getAccessibilityCurrentCell();
			if (cellobj) {
				var cellinfo = cellobj._refobj;
				if (cellinfo._row != rowidx || cellinfo._cellidx != cellidx) {
					cellobj._stat_change("notfocus", "normal");
				}
			}
			this._moveToPosCell(rowidx, cellidx);
		}

		cellobj = this._getAccessibilityCurrentCell(rowidx, cellidx);

		if (cellobj) {
			var cellinfo = cellobj._refobj;

			retn = true;
			cellobj._showfull();
			if (this._currentBand != "body" || this.autoenter != "select" || !this._showEditing) {
				if (cellobj._subComp && cellinfo._getDisplaytype(rowidx) != "tree") {
					cellobj._subComp._setFocus(false);
				}
				else {
					cellobj._setFocus(false);
				}
			}
			else {
				this._showEditor();
			}
			this.currentcol = cellinfo._col;
		}
		this._is_band_focus = this._first_focus = false;
		return retn;
	};

	_pGrid._getAccessibilityCellIndex = function (cellidx) {
		var band = null;
		if (this._currentBand == "body") {
			band = this._bodyBand;
		}
		else if (this._currentBand == "head") {
			band = this._headBand;
		}
		else if (this._currentBand == "summ") {
			band = this._summBand;
		}

		if (band) {
			var row = band._get_row(this._getDataRow(this.currentrow));
			if (row) {
				var cells = row._cells, cellinfo = null;
				for (var i = 0; i < cells.length; i++) {
					cellinfo = cells[i]._refobj;
					if (cellinfo._col <= this.currentcol && this.currentcol <= (cellinfo._col + cellinfo._colspan - 1)) {
						if (this.currentsubrow == 0) {
							return cells[i]._cellidx;
						}
						else {
							if (cellinfo._row == this.currentsubrow) {
								return cells[i]._cellidx;
							}
						}
					}
				}
			}
		}
		return (cellidx >= 0) ? cellidx : null;
	};
}
;