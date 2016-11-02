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

if (!nexacro.GridFormat) {
	nexacro.Grid_Style = function (target) {
		nexacro.Style.call(this, target);

		this.line = null;
		this.selectline = null;
		this.linetype = null;
		this.selectlinetype = null;
		this.focusborder = null;
		this.treeclosebuttonimage = null;
		this.treecollapseimage = null;
		this.treeexpandimage = null;
		this.treeitemimage = null;
		this.treeitemmargin = null;
		this.treelinetype = null;
		this.treeopenbuttonimage = null;
		this.accessibility = null;
		this.selectpointimage = null;
	};
	var _pGridStyle = nexacro._createPrototype(nexacro.Style, nexacro.Grid_Style);
	nexacro.Grid_Style.prototype = _pGridStyle;

	eval(nexacro._createBorderAttributeEvalStr("_pGridStyle", "line"));
	eval(nexacro._createBorderAttributeEvalStr("_pGridStyle", "selectline"));
	eval(nexacro._createValueAttributeEvalStr("_pGridStyle", "linetype"));
	eval(nexacro._createValueAttributeEvalStr("_pGridStyle", "selectlinetype"));
	eval(nexacro._createBorderAttributeEvalStr("_pGridStyle", "focusborder"));
	eval(nexacro._createValueAttributeEvalStr("_pGridStyle", "treeclosebuttonimage"));
	eval(nexacro._createValueAttributeEvalStr("_pGridStyle", "treecollapseimage"));
	eval(nexacro._createValueAttributeEvalStr("_pGridStyle", "treeexpandimage"));
	eval(nexacro._createValueAttributeEvalStr("_pGridStyle", "treeitemimage"));
	eval(nexacro._createValueAttributeEvalStr("_pGridStyle", "treeitemmargin"));
	eval(nexacro._createLineAttributeEvalStr("_pGridStyle", "treelinetype"));
	eval(nexacro._createValueAttributeEvalStr("_pGridStyle", "treeopenbuttonimage"));
	eval(nexacro._createAccessibilityAttributeEvalStr("_pGridStyle", "accessibility"));
	eval(nexacro._createValueAttributeEvalStr("_pGridStyle", "selectpointimage"));

	_pGridStyle.__custom_emptyObject = function () {
		this.line = null;
		this.selectline = null;
		this.linetype = null;
		this.selectlinetype = null;
		this.focusborder = null;
		this.treeclosebuttonimage = null;
		this.treecollapseimage = null;
		this.treeexpandimage = null;
		this.treeitemimage = null;
		this.treeitemmargin = null;
		this.treelinetype = null;
		this.treeopenbuttonimage = null;
		this.selectpointimage = null;
	};

	_pGridStyle.__get_custom_style_value = function () {
		var val = "";
		if (this.line && !this.line._is_empty) {
			val += "line:" + this.line._value + "; ";
		}
		if (this.selectline && !this.selectline._is_empty) {
			val += "selectline:" + this.selectline._value + "; ";
		}
		if (this.linetype && !this.linetype._is_empty) {
			val += "linetype:" + this.linetype._value + "; ";
		}
		if (this.selectlinetype && !this.selectlinetype._is_empty) {
			val += "selectlinetype:" + this.selectlinetype._value + "; ";
		}
		if (this.focusborder && !this.focusborder._is_empty) {
			val += "focusborder:" + this.focusborder._value + "; ";
		}
		if (this.treeclosebuttonimage && !this.treeclosebuttonimage._is_empty) {
			val += "treeclosebuttonimage:" + this.treeclosebuttonimage._value + "; ";
		}
		if (this.treecollapseimage && !this.treecollapseimage._is_empty) {
			val += "treecollapseimage:" + this.treecollapseimage._value + "; ";
		}
		if (this.treeexpandimage && !this.treeexpandimage._is_empty) {
			val += "treeexpandimage:" + this.treeexpandimage._value + "; ";
		}
		if (this.treeitemimage && !this.treeitemimage._is_empty) {
			val += "treeitemimage:" + this.treeitemimage._value + "; ";
		}
		if (this.treeitemmargin && !this.treeitemmargin._is_empty) {
			val += "treeitemmargin:" + this.treeitemmargin._value + "; ";
		}
		if (this.treelinetype && !this.treelinetype._is_empty) {
			val += "treelinetype:" + this.treelinetype._value + "; ";
		}
		if (this.treeopenbuttonimage && !this.treeopenbuttonimage._is_empty) {
			val += "treeopenbuttonimage:" + this.treeopenbuttonimage._value + "; ";
		}
		if (this.accessibility && !this.accessibility._is_empty) {
			val += "accessibility:" + this.accessibility._value + "; ";
		}
		if (this.selectpointimage && !this.selectpointimage._is_empty) {
			val += "selectpointimage:" + this.selectpointimage._value + "; ";
		}

		return val;
	};

	nexacro.Grid_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);
		this.line = null;
		this.selectline = null;
		this.linetype = null;
		this.selectlinetype = null;
		this.focusborder = null;
		this.treeclosebuttonimage = null;
		this.treecollapseimage = null;
		this.treeexpandimage = null;
		this.treeitemimage = null;
		this.treeitemmargin = null;
		this.treelinetype = null;
		this.treeopenbuttonimage = null;
		this.accessibility = null;
		this.selectpointimage = null;
	};
	var _pGridCurrentStyle = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.Grid_CurrentStyle);
	nexacro.Grid_CurrentStyle.prototype = _pGridCurrentStyle;

	_pGridCurrentStyle.__custom_emptyObject = _pGridStyle.__custom_emptyObject;
	_pGridCurrentStyle.__get_custom_style_value = _pGridStyle.__get_custom_style_value;

	delete _pGridCurrentStyle;
	delete _pGridStyle;

	nexacro.GridBand_Style = function (target) {
		nexacro.Style.call(this, target);

		this.cellalign = null;
		this.cellbackground = null;
		this.cellbackground2 = null;
		this.cellcolor = null;
		this.cellcolor2 = null;
		this.cellfont = null;
		this.cellgradation = null;
		this.cellgradation2 = null;
		this.cellline = null;
		this.celllinetype = null;
		this.cellpadding = null;
		this.selectborder = null;
		this.selectbackground = null;
		this.selectcolor = null;
		this.selectfont = null;
		this.selectgradation = null;
		this.selectline = null;
		this.selectlinetype = null;
		this.accessibility = null;
	};
	var _pGridBandStyle = nexacro._createPrototype(nexacro.Style, nexacro.GridBand_Style);
	nexacro.GridBand_Style.prototype = _pGridBandStyle;

	eval(nexacro._createAlignAttributeEvalStr("_pGridBandStyle", "cellalign"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pGridBandStyle", "cellbackground"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pGridBandStyle", "cellbackground2"));
	eval(nexacro._createColorAttributeEvalStr("_pGridBandStyle", "cellcolor"));
	eval(nexacro._createColorAttributeEvalStr("_pGridBandStyle", "cellcolor2"));
	eval(nexacro._createFontAttributeEvalStr("_pGridBandStyle", "cellfont"));
	eval(nexacro._createGradationAttributeEvalStr("_pGridBandStyle", "cellgradation"));
	eval(nexacro._createGradationAttributeEvalStr("_pGridBandStyle", "cellgradation2"));
	eval(nexacro._createBorderAttributeEvalStr("_pGridBandStyle", "cellline"));
	eval(nexacro._createValueAttributeEvalStr("_pGridBandStyle", "celllinetype"));
	eval(nexacro._createPaddingAttributeEvalStr("_pGridBandStyle", "cellpadding"));
	eval(nexacro._createBorderAttributeEvalStr("_pGridBandStyle", "selectborder"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pGridBandStyle", "selectbackground"));
	eval(nexacro._createColorAttributeEvalStr("_pGridBandStyle", "selectcolor"));
	eval(nexacro._createFontAttributeEvalStr("_pGridBandStyle", "selectfont"));
	eval(nexacro._createGradationAttributeEvalStr("_pGridBandStyle", "selectgradation"));
	eval(nexacro._createBorderAttributeEvalStr("_pGridBandStyle", "selectline"));
	eval(nexacro._createValueAttributeEvalStr("_pGridBandStyle", "selectlinetype"));
	eval(nexacro._createAccessibilityAttributeEvalStr("_pGridBandStyle", "accessibility"));

	_pGridBandStyle.__custom_emptyObject = function () {
		this.cellalign = null;
		this.cellbackground = null;
		this.cellbackground2 = null;
		this.cellcolor = null;
		this.cellcolor2 = null;
		this.cellfont = null;
		this.cellgradation = null;
		this.cellgradation2 = null;
		this.cellline = null;
		this.celllinetype = null;
		this.cellpadding = null;
		this.selectborder = null;
		this.selectbackground = null;
		this.selectcolor = null;
		this.selectfont = null;
		this.selectgradation = null;
		this.selectline = null;
		this.selectlinetype = null;
	};

	_pGridBandStyle.__get_custom_style_value = function () {
		var val = "";
		if (this.cellalign && !this.cellalign._is_empty) {
			val += "cellalign:" + this.cellalign._value + "; ";
		}
		if (this.cellbackground && !this.cellbackground._is_empty) {
			val += "cellbackground:" + this.cellbackground._value + "; ";
		}
		if (this.cellbackground2 && !this.cellbackground2._is_empty) {
			val += "cellbackground2:" + this.cellbackground2._value + "; ";
		}
		if (this.cellcolor && !this.cellcolor._is_empty) {
			val += "cellcolor:" + this.cellcolor._value + "; ";
		}
		if (this.cellcolor2 && !this.cellcolor2._is_empty) {
			val += "cellcolor2:" + this.cellcolor2._value + "; ";
		}
		if (this.cellfont && !this.cellfont._is_empty) {
			val += "cellfont:" + this.cellfont._value + "; ";
		}
		if (this.cellgradation && !this.cellgradation._is_empty) {
			val += "cellgradation:" + this.cellgradation._value + "; ";
		}
		if (this.cellgradation2 && !this.cellgradation2._is_empty) {
			val += "cellgradation2:" + this.cellgradation2._value + "; ";
		}
		if (this.cellline && !this.cellline._is_empty) {
			val += "cellline:" + this.cellline._value + "; ";
		}
		if (this.celllinetype && !this.celllinetype._is_empty) {
			val += "celllinetype:" + this.celllinetype._value + "; ";
		}
		if (this.selectborder && !this.selectborder._is_empty) {
			val += "selectborder:" + this.selectborder._value + "; ";
		}
		if (this.selectbackground && !this.selectbackground._is_empty) {
			val += "selectbackground:" + this.selectbackground._value + "; ";
		}
		if (this.selectcolor && !this.selectcolor._is_empty) {
			val += "selectcolor:" + this.selectcolor._value + "; ";
		}
		if (this.selectfont && !this.selectfont._is_empty) {
			val += "selectfont:" + this.selectfont._value + "; ";
		}
		if (this.selectgradation && !this.selectgradation._is_empty) {
			val += "selectgradation:" + this.selectgradation._value + "; ";
		}
		if (this.selectLine && !this.selectline._is_empty) {
			val += "selectline:" + this.selectline._value + "; ";
		}
		if (this.selectlinetype && !this.selectlinetype._is_empty) {
			val += "selectlinetype:" + this.selectlinetype._value + "; ";
		}
		if (this.accessibility && !this.accessibility._is_empty) {
			val += "accessibility:" + this.accessibility._value + "; ";
		}
		return val;
	};

	nexacro.GridBand_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);

		this.cellalign = null;
		this.cellbackground = null;
		this.cellbackground2 = null;
		this.cellcolor = null;
		this.cellcolor2 = null;
		this.cellfont = null;
		this.cellgradation = null;
		this.cellgradation2 = null;
		this.cellline = null;
		this.celllinetype = null;
		this.cellpadding = null;
		this.selectborder = null;
		this.selectbackground = null;
		this.selectcolor = null;
		this.selectfont = null;
		this.selectgradation = null;
		this.selectline = null;
		this.selectlinetype = null;
		this.accessibility = null;
	};
	var _pGridBandCurrentStyle = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.GridBand_CurrentStyle);
	nexacro.GridBand_CurrentStyle.prototype = _pGridBandCurrentStyle;

	_pGridBandCurrentStyle.__custom_emptyObject = _pGridBandStyle.__custom_emptyObject;
	_pGridBandCurrentStyle.__get_custom_style_value = _pGridBandStyle.__get_custom_style_value;

	delete _pGridBandCurrentStyle;
	delete _pGridBandStyle;

	nexacro.GridCell_Style = function (target) {
		nexacro.Style.call(this, target);
		this.background2 = null;
		this.backgroundimage = null;
		this.color2 = null;
		this.gradation2 = null;
		this.line = null;
		this.linetype = null;

		this.barcolor = null;
		this.bardirection = null;
		this.bargradation = null;
		this.checkboxsize = null;

		this.controlaccessibility = null;
		this.controlbackground = null;
		this.controlbackgroundimagemode = null;
		this.controlcolor = null;
		this.controlfont = null;
		this.controlalign = null;
		this.controlimage = null;
		this.controlborder = null;
		this.controlbordertype = null;
		this.controlbuttonsize = null;
		this.controlgradation = null;

		this.selectbackground = null;
		this.selectcolor = null;
		this.selectfont = null;
		this.selectgradation = null;
		this.selectline = null;
		this.selectlinetype = null;
		this.accessibility = null;
	};
	var _pGridCellStyle = nexacro._createPrototype(nexacro.Style, nexacro.GridCell_Style);
	nexacro.GridCell_Style.prototype = _pGridCellStyle;


	eval(nexacro._createBackgroundAttributeEvalStr("_pGridCellStyle", "background2"));
	eval(nexacro._createValueAttributeEvalStr("_pGridCellStyle", "backgroundimage"));
	eval(nexacro._createColorAttributeEvalStr("_pGridCellStyle", "color2"));
	eval(nexacro._createGradationAttributeEvalStr("_pGridCellStyle", "gradation2"));
	eval(nexacro._createBorderAttributeEvalStr("_pGridCellStyle", "line"));
	eval(nexacro._createValueAttributeEvalStr("_pGridCellStyle", "linetype"));
	eval(nexacro._createValueAttributeEvalStr("_pGridCellStyle", "barcolor"));
	eval(nexacro._createValueAttributeEvalStr("_pGridCellStyle", "bardirection"));
	eval(nexacro._createGradationAttributeEvalStr("_pGridCellStyle", "bargradation"));
	eval(nexacro._createValueAttributeEvalStr("_pGridCellStyle", "checkboxsize"));
	eval(nexacro._createAccessibilityAttributeEvalStr("_pGridCellStyle", "controlaccessibility"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pGridCellStyle", "controlbackground"));
	eval(nexacro._createValueAttributeEvalStr("_pGridCellStyle", "controlbackgroundimagemode"));
	eval(nexacro._createColorAttributeEvalStr("_pGridCellStyle", "controlcolor"));
	eval(nexacro._createFontAttributeEvalStr("_pGridCellStyle", "controlfont"));
	eval(nexacro._createAlignAttributeEvalStr("_pGridCellStyle", "controlalign"));
	eval(nexacro._createValueAttributeEvalStr("_pGridCellStyle", "controlimage"));
	eval(nexacro._createBorderAttributeEvalStr("_pGridCellStyle", "controlborder"));
	eval(nexacro._createBordertypeAttributeEvalStr("_pGridCellStyle", "controlbordertype"));
	eval(nexacro._createValueAttributeEvalStr("_pGridCellStyle", "controlbuttonsize"));
	eval(nexacro._createGradationAttributeEvalStr("_pGridCellStyle", "controlgradation"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pGridCellStyle", "selectbackground"));
	eval(nexacro._createColorAttributeEvalStr("_pGridCellStyle", "selectcolor"));
	eval(nexacro._createFontAttributeEvalStr("_pGridCellStyle", "selectfont"));
	eval(nexacro._createGradationAttributeEvalStr("_pGridCellStyle", "selectgradation"));
	eval(nexacro._createBorderAttributeEvalStr("_pGridCellStyle", "selectline"));
	eval(nexacro._createValueAttributeEvalStr("_pGridCellStyle", "selectlinetype"));
	eval(nexacro._createAccessibilityAttributeEvalStr("_pGridCellStyle", "accessibility"));

	_pGridCellStyle.__custom_emptyObject = function () {
		this.background2 = null;
		this.backgroundimage = null;
		this.color2 = null;
		this.gradation2 = null;
		this.line = null;
		this.linetype = null;

		this.barcolor = null;
		this.bardirection = null;
		this.bargradation = null;
		this.checkboxsize = null;

		this.controlaccessibility = null;
		this.controlbackground = null;
		this.controlbackgroundimagemode = null;
		this.controlcolor = null;
		this.controlfont = null;
		this.controlalign = null;
		this.controlimage = null;
		this.controlborder = null;
		this.controlbordertype = null;
		this.controlbuttonsize = null;
		this.controlgradation = null;

		this.selectbackground = null;
		this.selectcolor = null;
		this.selectfont = null;
		this.selectgradation = null;
		this.selectline = null;
		this.selectlinetype = null;
	};

	_pGridCellStyle.__get_custom_style_value = function () {
		var val = "";
		if (this.background2 && !this.background2._is_empty) {
			val += "background2:" + this.background2._value + "; ";
		}
		if (this.backgroundimage && !this.backgroundimage._is_empty) {
			val += "backgroundimage:" + this.backgroundimage._value + "; ";
		}
		if (this.color2 && !this.color2._is_empty) {
			val += "color2:" + this.color2._value + "; ";
		}
		if (this.gradation2 && !this.gradation2._is_empty) {
			val += "gradation2:" + this.gradation2._value + "; ";
		}
		if (this.line && !this.line._is_empty) {
			val += "line:" + this.line._value + "; ";
		}
		if (this.linetype && !this.linetype._is_empty) {
			val += "linetype:" + this.linetype._value + "; ";
		}
		if (this.barcolor && !this.barcolor._is_empty) {
			val += "barcolor:" + this.barcolor._value + "; ";
		}
		if (this.bardirection && !this.bardirection._is_empty) {
			val += "bardirection:" + this.bardirection._value + "; ";
		}
		if (this.bargradation && !this.bargradation._is_empty) {
			val += "bargradation:" + this.bargradation._value + "; ";
		}
		if (this.checkboxsize && !this.checkboxsize._is_empty) {
			val += "checkboxsize:" + this.checkboxsize._value + "; ";
		}
		if (this.controlaccessibility && !this.controlaccessibility._is_empty) {
			val += "controlaccessibility:" + this.controlaccessibility._value + "; ";
		}
		if (this.controlbackground && !this.controlbackground._is_empty) {
			val += "controlbackground:" + this.controlbackground._value + "; ";
		}
		if (this.controlbackgroundimagemode && !this.controlbackgroundimagemode._is_empty) {
			val += "controlbackgroundimagemode:" + this.controlbackgroundimagemode._value + "; ";
		}
		if (this.controlcolor && !this.controlcolor._is_empty) {
			val += "controlcolor:" + this.controlcolor._value + "; ";
		}
		if (this.controlfont && !this.controlfont._is_empty) {
			val += "controlfont:" + this.controlfont._value + "; ";
		}
		if (this.controlalign && !this.controlalign._is_empty) {
			val += "controlalign:" + this.controlalign._value + "; ";
		}
		if (this.controlimage && !this.controlimage._is_empty) {
			val += "controlimage:" + this.controlimage._value + "; ";
		}
		if (this.controlborder && !this.controlborder._is_empty) {
			val += "controlborder:" + this.controlborder._value + "; ";
		}
		if (this.controlbordertype && !this.controlbordertype._is_empty) {
			val += "controlbordertype:" + this.controlbordertype._value + "; ";
		}
		if (this.controlbuttonsize && !this.controlbuttonsize._is_empty) {
			val += "controlbuttonsize:" + this.controlbuttonsize._value + "; ";
		}
		if (this.controlgradation && !this.controlgradation._is_empty) {
			val += "controlgradation:" + this.controlgradation._value + "; ";
		}
		if (this.selectbackground && !this.selectbackground._is_empty) {
			val += "selectbackground:" + this.selectbackground._value + "; ";
		}
		if (this.selectcolor && !this.selectcolor._is_empty) {
			val += "selectcolor:" + this.selectcolor._value + "; ";
		}
		if (this.selectfont && !this.selectfont._is_empty) {
			val += "selectfont:" + this.selectfont._value + "; ";
		}
		if (this.selectgradation && !this.selectgradation._is_empty) {
			val += "selectgradation:" + this.selectgradation._value + "; ";
		}
		if (this.accessibility && !this.accessibility._is_empty) {
			val += "accessibility:" + this.accessibility._value + "; ";
		}
		return val;
	};

	nexacro.GridCell_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);
		this.background2 = null;
		this.backgroundimage = null;
		this.color2 = null;
		this.gradation2 = null;
		this.line = null;
		this.linetype = null;

		this.barcolor = null;
		this.bardirection = null;
		this.bargradation = null;
		this.checkboxsize = null;

		this.controlaccessibility = null;
		this.controlbackground = null;
		this.controlbackgroundimagemode = null;
		this.controlcolor = null;
		this.controlfont = null;
		this.controlalign = null;
		this.controlimage = null;
		this.controlborder = null;
		this.controlbordertype = null;
		this.controlbuttonsize = null;
		this.controlgradation = null;

		this.selectbackground = null;
		this.selectcolor = null;
		this.selectfont = null;
		this.selectgradation = null;
		this.selectline = null;
		this.selectlinetype = null;
		this.accessibility = null;
	};
	var _pGridCellCurrentStyle = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.GridCell_CurrentStyle);
	nexacro.GridCell_CurrentStyle.prototype = _pGridCellCurrentStyle;

	_pGridCellCurrentStyle.__custom_emptyObject = _pGridCellStyle.__custom_emptyObject;
	_pGridCellCurrentStyle.__get_custom_style_value = _pGridCellStyle.__get_custom_style_value;

	delete _pGridCellCurrentStyle;
	delete _pGridCellStyle;

	nexacro.GridCellInfo = function (id, band, grid, type, idx) {
		this.id = this.name = id;
		this.parent = band;
		this.grid = grid;
		this.celltype = type;
		this._cellidx = idx;
		this._col = 0;
		this._colspan = 0;
		this._row = 0;
		this._rowspan = 0;
		this._area = "";
		this._endcol = false;
		this._subcells = [];
		this._isSubCell = false;
		this.classname = "";
		this._hasEditor = false;
		this._control_element = true;
		this._editingRow = -9;
		this._default_expandsize = 16;
		this._is_use_bind_expr_style = false;

		this._findcss_ctrl = new nexacro.Component("cssfind", "absolute", 0, 0, 0, 0, null, null, this);
		this._findcss_ctrl._is_subcontrol = true;

		this.style = new nexacro.GridCell_Style(this);
		this._styles = {
		};
		this._stylecache = {
		};
		this._imgWidthTemp = {
		};
		this._imgHeightTemp = {
		};
		this._suppress_infos = [];
		this._fakemerge_infos = null;

		this._cur1font_size = null;
		this._cur1selectfont_size = null;
		this._curfont = undefined;
		this._curselfont = undefined;
		this._curborder = undefined;
		this._curpadding = undefined;

		this.displaytype = new nexacro.BindableValue("normal");
		this.edittype = new nexacro.BindableValue("none");
		this.tooltiptype = "none";
		this.tooltiptext = new nexacro.BindableValue("");
		this.autosizecol = "default";
		this.autosizerow = "default";
		this.displayexpdec = new nexacro.BindableValue(-1);
		this.locale = new nexacro.BindableValue("");
		this.mask = new nexacro.BindableValue("");
		this.maskchar = "_";
		this.suppress = new nexacro.BindableValue(0);
		this.suppressalign = "first";
		this.suppressedit = false;
		this.wordwrap = new nexacro.BindableValue("none");
		this.text = new nexacro.BindableValue("");
		this.expr = new nexacro.BindableValue("");
		this.subsumtext = new nexacro.BindableValue("");

		this.combodataset = new nexacro.BindableValue("");
		this.combocodecol = new nexacro.BindableValue("");
		this.combodatacol = new nexacro.BindableValue("");
		this.combodisplay = new nexacro.BindableValue("edit");
		this.combodisplaynulltext = new nexacro.BindableValue("");
		this.combodisplaynulltype = new nexacro.BindableValue("none");
		this.combodisplayrowcount = new nexacro.BindableValue(-1);
		this.combotype = new nexacro.BindableValue("dropdown");

		this.calendardisplay = new nexacro.BindableValue("edit");
		this.calendardisplaynulltext = new nexacro.BindableValue("");
		this.calendardisplaynulltype = new nexacro.BindableValue("default");
		this.calendarinnerdataset = new nexacro.BindableValue("");
		this.calendarbackgroundcolumn = new nexacro.BindableValue("");
		this.calendarbordercolumn = new nexacro.BindableValue("");
		this.calendardatecolumn = new nexacro.BindableValue("");
		this.calendartextcolorcolumn = new nexacro.BindableValue("");

		this.editacceptsenter = new nexacro.BindableValue(false);
		this.editacceptstab = new nexacro.BindableValue(false);
		this.editautoselect = new nexacro.BindableValue(false);
		this.editautoskip = new nexacro.BindableValue(false);
		this.editclipmode = new nexacro.BindableValue("includespace");
		this.editdisplay = new nexacro.BindableValue("edit");
		this.editfilter = new nexacro.BindableValue("none");
		this.editimemode = new nexacro.BindableValue("none");
		this.editlimit = new nexacro.BindableValue(-1);
		this.editlengthunit = new nexacro.BindableValue("utf16");
		this.editlimitbymask = new nexacro.BindableValue("decimal");
		this.editscrollbar = new nexacro.BindableValue("none");
		this.edittrimtype = new nexacro.BindableValue("none");
		this.edituseime = new nexacro.BindableValue("global");

		this.expandchar = new nexacro.BindableValue("");
		this.expandimage = new nexacro.BindableValue("");
		this.expandshow = new nexacro.BindableValue("hide");
		this.expandsize = new nexacro.BindableValue(this._default_expandsize);
		this.treecheck = new nexacro.BindableValue("");
		this.treecollapseimage = new nexacro.BindableValue("");
		this.treeexpandimage = new nexacro.BindableValue("");
		this.treeitemimage = new nexacro.BindableValue("");
		this.treelevel = new nexacro.BindableValue("");
		this.treestartlevel = new nexacro.BindableValue(0);
		this.treestate = new nexacro.BindableValue("");
		this._tempinnerds = new nexacro.Dataset();
	};
	var _pGridCellInfo = nexacro._createPrototype(nexacro.Object, nexacro.GridCellInfo);
	nexacro.GridCellInfo.prototype = _pGridCellInfo;
	_pGridCellInfo._type_name = "GridCellInfo";

	_pGridCellInfo.destroy = function () {
		this.parent = null;
		this.grid = null;
		this._subcells = null;

		if (this.style) {
			delete this.style;
			this.style = null;
		}

		if (this._styles) {
			var styles = this._styles;
			for (var pseudo in styles) {
				var style = styles[pseudo];
				if (style.destroy) {
					style.destroy();
					style = null;
				}
			}
			this._styles = null;
		}

		this._imgWidthTemp = null;
		this._imgHeightTemp = null;
		this._suppress_infos = null;
		this._fakemerge_infos = null;

		this.displaytype = null;
		this.edittype = null;

		this.tooltiptext = null;
		this.displayexpdec = null;
		this.locale = null;
		this.mask = null;
		this.suppress = null;
		this.wordwrap = null;
		this.text = null;
		this.expr = null;
		this.subsumtext = null;

		this.combodataset = null;
		this.combocodecol = null;
		this.combodatacol = null;
		this.combodisplay = null;
		this.combodisplaynulltext = null;
		this.combodisplaynulltype = null;
		this.combodisplayrowcount = null;
		this.combotype = null;

		this.calendardisplay = null;
		this.calendardisplaynulltext = null;
		this.calendardisplaynulltype = null;
		this.calendarinnerdataset = null;
		this.calendarbackgroundcolumn = null;
		this.calendarbordercolumn = null;
		this.calendardatecolumn = null;
		this.calendartextcolorcolumn = null;

		this.editacceptsenter = null;
		this.editacceptstab = null;
		this.editautoselect = null;
		this.editautoskip = null;
		this.editclipmode = null;
		this.editdisplay = null;
		this.editfilter = null;
		this.editimemode = null;
		this.editlimit = null;
		this.editlengthunit = null;
		this.editlimitbymask = null;
		this.editscrollbar = null;
		this.edittrimtype = null;
		this.edituseime = null;
		this._findcss_ctrl = null;
		this._stylecache = null;
		this.expandchar = null;
		this.expandimage = null;
		this.expandshow = null;
		this.expandsize = null;
		this.treecheck = null;
		this.treecollapseimage = null;
		this.treeexpandimage = null;
		this.treeitemimage = null;
		this.treelevel = null;
		this.treestartlevel = null;
		this.treestate = null;
		this._tempinnerds = null;
		this._cur1font_size = null;
		this._cur1selectfont_size = null;
		this._curfont = null;
		this._curselfont = null;
		this._curborder = null;
		this._curpadding = null;
	};

	_pGridCellInfo._getValue = function (rowidx) {
		return this._getAttrValue(this.text, rowidx);
	};

	_pGridCellInfo._setValue = function (rowidx, v) {
		this._setAttrValue(this.text, rowidx, v);
	};

	_pGridCellInfo.on_update_style_blur = function () {
	};
	_pGridCellInfo.on_update_style_glow = function () {
	};
	_pGridCellInfo.on_update_style_align = function () {
	};
	_pGridCellInfo.on_update_style_cursor = function () {
	};
	_pGridCellInfo.on_update_style_shadow = function () {
	};
	_pGridCellInfo.on_update_style_opacity = function () {
	};
	_pGridCellInfo.on_update_style_margin = function () {
	};
	_pGridCellInfo.on_update_style_background = function () {
	};
	_pGridCellInfo.on_update_style_background2 = function () {
	};
	_pGridCellInfo.on_update_style_backgroundimage = function () {
	};
	_pGridCellInfo.on_update_style_color = function () {
	};
	_pGridCellInfo.on_update_style_color2 = function () {
	};
	_pGridCellInfo.on_update_style_gradation = function () {
	};
	_pGridCellInfo.on_update_style_gradation2 = function () {
	};
	_pGridCellInfo.on_update_style_line = function () {
	};
	_pGridCellInfo.on_update_style_linetype = function () {
	};
	_pGridCellInfo.on_update_style_barcolor = function () {
	};
	_pGridCellInfo.on_update_style_bardirection = function () {
	};
	_pGridCellInfo.on_update_style_bargradation = function () {
	};
	_pGridCellInfo.on_update_style_checkboxsize = function () {
	};
	_pGridCellInfo.on_update_style_controlaccessibility = function () {
	};
	_pGridCellInfo.on_update_style_controlbackground = function () {
	};
	_pGridCellInfo.on_update_style_controlbackgroundimagemode = function () {
	};
	_pGridCellInfo.on_update_style_controlcolor = function () {
	};
	_pGridCellInfo.on_update_style_controlfont = function () {
	};
	_pGridCellInfo.on_update_style_controlalign = function () {
	};
	_pGridCellInfo.on_update_style_controlimage = function () {
	};
	_pGridCellInfo.on_update_style_controlborder = function () {
	};
	_pGridCellInfo.on_update_style_controlbordertype = function () {
	};
	_pGridCellInfo.on_update_style_controlbuttonsize = function () {
	};
	_pGridCellInfo.on_update_style_controlgradation = function () {
	};
	_pGridCellInfo.on_update_style_selectbackground = function () {
	};
	_pGridCellInfo.on_update_style_selectcolor = function () {
	};
	_pGridCellInfo.on_update_style_selectfont = function () {
	};
	_pGridCellInfo.on_update_style_selectgradation = function () {
	};
	_pGridCellInfo.on_update_style_selectline = function () {
	};
	_pGridCellInfo.on_update_style_selectlinetype = function () {
	};
	_pGridCellInfo.on_update_style_accessibility = function () {
	};
	_pGridCellInfo.on_update_style_bordertype = function () {
	};
	_pGridCellInfo.on_update_style_border = function () {
	};
	_pGridCellInfo.on_update_style_font = function () {
	};
	_pGridCellInfo.on_update_style_letterspace = function () {
	};
	_pGridCellInfo.on_update_style_padding = function () {
	};

	_pGridCellInfo._getSuppressInfo = function (disprowidx) {
		if (disprowidx < 0) {
			disprowidx = 0;
		}
		if (!this._suppress_infos[disprowidx]) {
			var suppress_info = {
				text_proc : 0, 
				border_proc : 0, 
				middle : false, 
				last : true
			};
			this._suppress_infos[disprowidx] = suppress_info;
		}
		return this._suppress_infos[disprowidx];
	};

	_pGridCellInfo._clearSuppressInfo = function () {
		this._suppress_infos = [];
	};

	_pGridCellInfo._getDisplaytype = function (rowidx) {
		var dt = this.displaytype;
		var d = this._getAttrValue(dt, rowidx);

		if (d == "normal") {
			var t = this.text;
			if (t._bindtype == 1) {
				var dataset = this.grid._binddataset;
				if (!dataset) {
					return "text";
				}
				var colid = t._bindexpr;
				var coltype = dataset._getColumnType(colid);

				switch (coltype) {
					case 1:
						return "text";
					case 2:
					case 3:
					case 4:
						return "number";
					case 5:
						return "date2";
					case 6:
						return "time";
					case 7:
						return "datetime";
					default:
						return "none";
				}
			}
			else {
				return "text";
			}
		}
		return d;
	};

	_pGridCellInfo._getEdittype = function (rowidx) {
		var dt = this.edittype;
		var d = this._getAttrValue(dt, rowidx);

		if (d == "normal") {
			var t = this.text;
			if (t._bindtype == 1) {
				var dataset = this.grid._binddataset;
				if (!dataset) {
					return "text";
				}
				var colid = t._bindexpr;
				var colinfo = dataset._getColumnType(colid);
				if (!colinfo) {
					return "text";
				}

				var coltype = colinfo;

				switch (coltype) {
					case 1:
					case 2:
					case 3:
					case 4:
						return "text";
					case 5:
					case 6:
					case 7:
						return "date";
					case 8:
						return "none";
				}
			}
			else {
				return "text";
			}
		}
		return d;
	};

	_pGridCellInfo._getWordwrap = function (rowidx) {
		var wordwrap = this._getAttrValue(this.wordwrap, rowidx);

		if (!wordwrap || wordwrap == "none" || wordwrap == "false") {
			wordwrap = this._getAttrValue(this.parent.cellwordwrap, rowidx);
		}

		if (!wordwrap) {
			wordwrap = "none";
		}

		return wordwrap;
	};

	_pGridCellInfo._getAttrValue = function (attr, rowidx) {
		return this.parent._getAttrValue(attr, rowidx, this);
	};

	_pGridCellInfo._setAttrValue = function (attr, rowidx, v) {
		if (attr._bindtype == 1) {
			var grid = this.grid;
			var dataset = grid._binddataset;
			if (dataset) {
				dataset.setColumn(rowidx, attr._bindexpr, v);
			}
		}
	};

	_pGridCellInfo._exeExprStyle = function (propobj, propid, rowidx) {
		if (propobj && propobj._bindtype != 0) {
			var grid = this.grid;
			var dataset = grid._binddataset;

			if (dataset == null) {
				propobj = null;
			}
			else {
				var val;
				if (propobj._bindtype == 1) {
					val = dataset.getColumn(rowidx, propobj._bindexpr);
				}
				else {
					var value = propobj._value;
					var s = value.toLowerCase().indexOf("bind:");

					if (s >= 0) {
						var bindexpr = propobj._bindexpr;
						bindexpr = bindexpr.substring(s, bindexpr.length);
						val = dataset.getColumn(rowidx, bindexpr);
					}

					var exprfn = grid._exprcache[propobj._bindexpr];
					if (exprfn == null) {
						exprfn = dataset._createExprFunc(propobj._bindexpr);
						grid._exprcache[propobj._bindexpr] = exprfn;
					}

					if ((typeof exprfn) == "function") {
						val = exprfn.call(this, rowidx, rowidx, grid, dataset, this.col);
						if (val) {
							val = val.toString();
						}
					}
					else {
						val = propobj._bindexpr;
					}

					if (val == "default") {
						val = "";
					}
				}
				if (val != null && val != "") {
					propobj = nexacro._getCachedStyleObj(propid, val);
				}
				else {
					propobj = null;
				}
			}
		}
		return propobj;
	};

	_pGridCellInfo._resultStyleProc = function (styleid, propid, propobj, exprbind, rowidx, usecache, islast) {
		if (usecache && (propobj || islast)) {
			this._addStyleCache(styleid, propobj);
		}

		if (propobj && exprbind && exprbind.type == 0) {
			exprbind.type = propobj._bindtype;
		}

		if (propobj && propobj._bindtype > 0) {
			var grid = this.grid;
			var band = "body";

			if (rowidx == -1) {
				band = "head";
			}
			if (rowidx == -2) {
				band = "summ";
			}

			grid._is_use_bind_expr_style[band] = true;
			this._is_use_bind_expr_style = true;

			switch (propid) {
				case "background":
				case "backgroundimage":
				case "border":
				case "linetype":
				case "gradation":
				case "cursor":
				case "padding":
					grid._is_use_bind_expr_outerstyle[band] = true;
					break;
			}
			;
		}

		return this._exeExprStyle(propobj, propid, rowidx);
	};

	_pGridCellInfo._searchStyleValue = function (propid, styleid, rowidx, odd, selected, pseudo, usecache, exprbind, lastcache) {
		var propobj = this._stylecache[styleid];

		if (propobj !== undefined) {
			if (propobj === null) {
				return null;
			}

			if (propobj && exprbind) {
				exprbind.type = propobj._bindtype;
			}

			if (result = this._exeExprStyle(propobj, propid, rowidx)) {
				return result;
			}
		}

		var style = this.style;
		var enablestyle = this.style;
		var styles = this._styles;
		var bandinfo = this.parent;
		var bandstyle = bandinfo.style;
		var bandstyles = bandinfo._styles;
		var enablebandstyle = bandinfo.style;
		var result = null;

		if (usecache == undefined) {
			usecache = true;
		}

		if (styles[pseudo] && !selected) {
			style = styles[pseudo];
		}

		if (bandstyles[pseudo] && !selected) {
			bandstyle = bandstyles[pseudo];
		}


		if (propid == "background") {
			var background;
			if (selected) {
				background = style.selectbackground;
				result = this._resultStyleProc(styleid, propid, background, exprbind, rowidx, usecache);

				if (this.isStyleEmpty(result)) {
					if (style != enablestyle) {
						background = enablestyle.selectbackground;
						result = this._resultStyleProc(styleid, propid, background, exprbind, rowidx, usecache);
					}
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					background = bandstyle.selectbackground;
					result = this._resultStyleProc(styleid, propid, background, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					background = enablebandstyle.selectbackground;
					result = this._resultStyleProc(styleid, propid, background, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					if (this.cssclass) {
						background = this._findcss_ctrl._find_pseudo_obj("selectbackground", pseudo, "background");
						result = this._resultStyleProc(styleid, propid, background, exprbind, rowidx, usecache);
					}
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					background = bandinfo._find_gridpseudo_obj("selectbackground", pseudo, this.celltype, null, true, "background");
					result = this._resultStyleProc(styleid, propid, background, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}
			}

			if (odd && this.isStyleEmpty(result)) {
				background = style.background2;
				result = this._resultStyleProc(styleid, propid, background, exprbind, rowidx, usecache);

				if (this.isStyleEmpty(result)) {
					if (style != enablestyle) {
						background = enablestyle.background2;
						result = this._resultStyleProc(styleid, propid, background, exprbind, rowidx, usecache);
					}
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					background = bandstyle.cellbackground2;
					result = this._resultStyleProc(styleid, propid, background, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					background = enablebandstyle.cellbackground2;
					result = this._resultStyleProc(styleid, propid, background, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					if (this.cssclass) {
						background = this._findcss_ctrl._find_pseudo_obj("background2", pseudo, "background");
						result = this._resultStyleProc(styleid, propid, background, exprbind, rowidx, usecache);
					}
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					background = bandinfo._find_gridpseudo_obj("cellbackground2", pseudo, this.celltype, null, true, "background");
					result = this._resultStyleProc(styleid, propid, background, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}
			}

			if (this.isStyleEmpty(result)) {
				background = style.background;
				result = this._resultStyleProc(styleid, propid, background, exprbind, rowidx, usecache);

				if (this.isStyleEmpty(result)) {
					if (style != enablestyle) {
						background = enablestyle.background;
						result = this._resultStyleProc(styleid, propid, background, exprbind, rowidx, usecache);
					}
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					background = bandstyle.cellbackground;
					result = this._resultStyleProc(styleid, propid, background, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					background = enablebandstyle.cellbackground;
					result = this._resultStyleProc(styleid, propid, background, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					if (this.cssclass) {
						background = this._findcss_ctrl._find_pseudo_obj("background", pseudo, "background");
						result = this._resultStyleProc(styleid, propid, background, exprbind, rowidx, usecache);
					}
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					background = bandinfo._find_gridpseudo_obj("cellbackground", pseudo, this.celltype, "background", false, "background");
					result = this._resultStyleProc(styleid, propid, background, exprbind, rowidx, usecache, lastcache);
				}
				else {
					return result;
				}
			}
		}

		else if (propid == "backgroundimage") {
			var backgroundimage = style.backgroundimage;
			result = this._resultStyleProc(styleid, propid, backgroundimage, exprbind, rowidx, usecache);

			if (this.isStyleEmpty(result)) {
				if (style != enablestyle) {
					backgroundimage = enablestyle.backgroundimage;
					result = this._resultStyleProc(styleid, propid, backgroundimage, exprbind, rowidx, usecache);
				}
			}
			else {
				return result;
			}

			if (this.isStyleEmpty(result)) {
				if (this.cssclass) {
					backgroundimage = this._findcss_ctrl._find_pseudo_obj("backgroundimage", backgroundimage);
					result = this._resultStyleProc(styleid, propid, backgroundimage, exprbind, rowidx, usecache);
				}
			}
			else {
				return result;
			}

			if (this.isStyleEmpty(result)) {
				backgroundimage = bandinfo._find_gridpseudo_obj("backgroundimage", pseudo, this.celltype);
				result = this._resultStyleProc(styleid, propid, backgroundimage, exprbind, rowidx, usecache, lastcache);
			}
			else {
				return result;
			}
		}

		else if (propid == "font") {
			var font;
			if (selected) {
				font = style.selectfont;
				result = this._resultStyleProc(styleid, propid, font, exprbind, rowidx, usecache);

				if (this.isStyleEmpty(result)) {
					if (style != enablestyle) {
						font = enablestyle.selectfont;
						result = this._resultStyleProc(styleid, propid, font, exprbind, rowidx, usecache);
					}
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					font = bandstyle.selectfont;
					result = this._resultStyleProc(styleid, propid, font, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					font = enablebandstyle.selectfont;
					result = this._resultStyleProc(styleid, propid, font, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					if (this.cssclass) {
						font = this._findcss_ctrl._find_pseudo_obj("selectfont", pseudo, "font");
						result = this._resultStyleProc(styleid, propid, font, exprbind, rowidx, usecache);
					}
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					font = bandinfo._find_gridpseudo_obj("selectfont", pseudo, this.celltype, null, true, "font");
					result = this._resultStyleProc(styleid, propid, font, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}
			}

			if (this.isStyleEmpty(result)) {
				font = style.font;
				result = this._resultStyleProc(styleid, propid, font, exprbind, rowidx, usecache);

				if (this.isStyleEmpty(result)) {
					if (style != enablestyle) {
						font = enablestyle.font;
						result = this._resultStyleProc(styleid, propid, font, exprbind, rowidx, usecache);
					}
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					font = bandstyle.cellfont;
					result = this._resultStyleProc(styleid, propid, font, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					font = enablebandstyle.cellfont;
					result = this._resultStyleProc(styleid, propid, font, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					if (this.cssclass) {
						font = this._findcss_ctrl._find_pseudo_obj("font", pseudo, "font");
						result = this._resultStyleProc(styleid, propid, font, exprbind, rowidx, usecache);
					}
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					font = bandinfo._find_gridpseudo_obj("cellfont", pseudo, this.celltype, "font", false, "font");
					result = this._resultStyleProc(styleid, propid, font, exprbind, rowidx, usecache, lastcache);
				}
				else {
					return result;
				}
			}
		}

		else if (propid == "letterspace") {
			var letterspace;

			letterspace = style.letterspace;
			result = this._resultStyleProc(styleid, propid, letterspace, exprbind, rowidx, usecache);

			if (this.isStyleEmpty(result)) {
				if (style != enablestyle) {
					letterspace = enablestyle.letterspace;
					result = this._resultStyleProc(styleid, propid, letterspace, exprbind, rowidx, usecache);
				}
			}
			else {
				return result;
			}

			if (this.isStyleEmpty(result)) {
				letterspace = bandstyle.cellletterspace;
				result = this._resultStyleProc(styleid, propid, letterspace, exprbind, rowidx, usecache);
			}
			else {
				return result;
			}

			if (this.isStyleEmpty(result)) {
				letterspace = enablebandstyle.cellletterspace;
				result = this._resultStyleProc(styleid, propid, letterspace, exprbind, rowidx, usecache);
			}
			else {
				return result;
			}

			if (this.isStyleEmpty(result)) {
				if (this.cssclass) {
					letterspace = this._findcss_ctrl._find_pseudo_obj("letterspace", pseudo, "letterspace");
					result = this._resultStyleProc(styleid, propid, letterspace, exprbind, rowidx, usecache);
				}
			}
			else {
				return result;
			}

			if (this.isStyleEmpty(result)) {
				letterspace = bandinfo._find_gridpseudo_obj("cellletterspace", pseudo, this.celltype, "letterspace", false, "letterspace");
				result = this._resultStyleProc(styleid, propid, letterspace, exprbind, rowidx, usecache, lastcache);
			}
			else {
				return result;
			}
		}

		else if (propid == "color") {
			var color;
			if (selected) {
				color = style.selectcolor;
				result = this._resultStyleProc(styleid, propid, color, exprbind, rowidx, usecache);

				if (this.isStyleEmpty(result)) {
					if (style != enablestyle) {
						color = enablestyle.selectcolor;
						result = this._resultStyleProc(styleid, propid, color, exprbind, rowidx, usecache);
					}
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					color = bandstyle.selectcolor;
					result = this._resultStyleProc(styleid, propid, color, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					color = enablebandstyle.selectcolor;
					result = this._resultStyleProc(styleid, propid, color, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					if (this.cssclass) {
						color = this._findcss_ctrl._find_pseudo_obj("selectcolor", pseudo, "color");
						result = this._resultStyleProc(styleid, propid, color, exprbind, rowidx, usecache);
					}
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					color = bandinfo._find_gridpseudo_obj("selectcolor", pseudo, this.celltype, null, true, "color");
					result = this._resultStyleProc(styleid, propid, color, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}
			}

			if (odd && this.isStyleEmpty(result)) {
				color = style.color2;
				result = this._resultStyleProc(styleid, propid, color, exprbind, rowidx, usecache);

				if (this.isStyleEmpty(result)) {
					if (style != enablestyle) {
						color = enablestyle.color2;
						result = this._resultStyleProc(styleid, propid, color, exprbind, rowidx, usecache);
					}
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					color = bandstyle.cellcolor2;
					result = this._resultStyleProc(styleid, propid, color, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					color = enablebandstyle.cellcolor2;
					result = this._resultStyleProc(styleid, propid, color, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					if (this.cssclass) {
						color = this._findcss_ctrl._find_pseudo_obj("color2", pseudo, "color");
						result = this._resultStyleProc(styleid, propid, color, exprbind, rowidx, usecache);
					}
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					color = bandinfo._find_gridpseudo_obj("cellcolor2", pseudo, this.celltype, null, true, "color");
					result = this._resultStyleProc(styleid, propid, color, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}
			}

			if (this.isStyleEmpty(result)) {
				color = style.color;
				result = this._resultStyleProc(styleid, propid, color, exprbind, rowidx, usecache);

				if (this.isStyleEmpty(result)) {
					if (style != enablestyle) {
						color = enablestyle.color;
						result = this._resultStyleProc(styleid, propid, color, exprbind, rowidx, usecache);
					}
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					color = bandstyle.cellcolor;
					result = this._resultStyleProc(styleid, propid, color, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					color = enablebandstyle.cellcolor;
					result = this._resultStyleProc(styleid, propid, color, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					if (this.cssclass) {
						color = this._findcss_ctrl._find_pseudo_obj("color", pseudo, "color");
						result = this._resultStyleProc(styleid, propid, color, exprbind, rowidx, usecache);
					}
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					color = bandinfo._find_gridpseudo_obj("cellcolor", pseudo, this.celltype, "color", false, "color");
					result = this._resultStyleProc(styleid, propid, color, exprbind, rowidx, usecache, lastcache);
				}
				else {
					return result;
				}
			}
		}

		else if (propid == "align") {
			var align = style.align;
			result = this._resultStyleProc(styleid, propid, align, exprbind, rowidx, usecache);

			if (this.isStyleEmpty(result)) {
				if (style != enablestyle) {
					align = enablestyle.align;
					result = this._resultStyleProc(styleid, propid, align, exprbind, rowidx, usecache);
				}
			}
			else {
				return result;
			}

			if (this.isStyleEmpty(result)) {
				align = bandstyle.cellalign;
				result = this._resultStyleProc(styleid, propid, align, exprbind, rowidx, usecache);
			}
			else {
				return result;
			}

			if (this.isStyleEmpty(result)) {
				align = enablebandstyle.cellalign;
				result = this._resultStyleProc(styleid, propid, align, exprbind, rowidx, usecache);
			}
			else {
				return result;
			}

			if (this.isStyleEmpty(result)) {
				if (this.cssclass) {
					align = this._findcss_ctrl._find_pseudo_obj("align", pseudo, "align");
					result = this._resultStyleProc(styleid, propid, align, exprbind, rowidx, usecache);
				}
			}
			else {
				return result;
			}

			if (this.isStyleEmpty(result)) {
				align = bandinfo._find_gridpseudo_obj("cellalign", pseudo, this.celltype, "align", false, "align");
				result = this._resultStyleProc(styleid, propid, align, exprbind, rowidx, usecache, lastcache);
			}
			else {
				return result;
			}
		}

		else if (propid == "border") {
			var line;
			if (selected) {
				line = style.selectline;
				result = this._resultStyleProc(styleid, propid, line, exprbind, rowidx, usecache);

				if (this.isStyleEmpty(result)) {
					if (style != enablestyle) {
						line = enablestyle.selectline;
						result = this._resultStyleProc(styleid, propid, line, exprbind, rowidx, usecache);
					}
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					line = bandstyle.selectline;
					result = this._resultStyleProc(styleid, propid, line, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					line = enablebandstyle.selectline;
					result = this._resultStyleProc(styleid, propid, line, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					if (this.cssclass) {
						line = this._findcss_ctrl._find_pseudo_obj("selectline", pseudo, "border");
						result = this._resultStyleProc(styleid, propid, line, exprbind, rowidx, usecache);
					}
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					line = bandinfo._find_gridpseudo_obj("selectline", pseudo, this.celltype, "selectline", false, "border");
					result = this._resultStyleProc(styleid, propid, line, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}
			}

			if (this.isStyleEmpty(result)) {
				line = style.line;
				result = this._resultStyleProc(styleid, propid, line, exprbind, rowidx, usecache);

				if (this.isStyleEmpty(result)) {
					if (style != enablestyle) {
						line = enablestyle.line;
						result = this._resultStyleProc(styleid, propid, line, exprbind, rowidx, usecache);
					}
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					line = bandstyle.cellline;
					result = this._resultStyleProc(styleid, propid, line, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					line = enablebandstyle.cellline;
					result = this._resultStyleProc(styleid, propid, line, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					if (this.cssclass) {
						line = this._findcss_ctrl._find_pseudo_obj("line", pseudo, "border");
						result = this._resultStyleProc(styleid, propid, line, exprbind, rowidx, usecache);
					}
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					line = bandinfo._find_gridpseudo_obj("cellline", pseudo, this.celltype, "line", false, "border");
					result = this._resultStyleProc(styleid, propid, line, exprbind, rowidx, usecache, lastcache);
				}
				else {
					return result;
				}
			}
		}

		else if (propid == "linetype") {
			var linetype;
			if (selected) {
				linetype = style.selectlinetype;
				result = this._resultStyleProc(styleid, propid, linetype, exprbind, rowidx, usecache);

				if (this.isStyleEmpty(result)) {
					if (style != enablestyle) {
						linetype = enablestyle.selectlinetype;
						result = this._resultStyleProc(styleid, propid, linetype, exprbind, rowidx, usecache);
					}
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					linetype = bandstyle.selectlinetype;
					result = this._resultStyleProc(styleid, propid, linetype, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					linetype = enablebandstyle.selectlinetype;
					result = this._resultStyleProc(styleid, propid, linetype, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					if (this.cssclass) {
						linetype = this._findcss_ctrl._find_pseudo_obj("selectlinetype", pseudo, "linetype");
						result = this._resultStyleProc(styleid, propid, linetype, exprbind, rowidx, usecache);
					}
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					linetype = bandinfo._find_gridpseudo_obj("selectlinetype", pseudo, this.celltype);
					result = this._resultStyleProc(styleid, propid, linetype, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}
			}

			if (this.isStyleEmpty(result)) {
				linetype = style.linetype;
				result = this._resultStyleProc(styleid, propid, linetype, exprbind, rowidx, usecache);

				if (this.isStyleEmpty(result)) {
					if (style != enablestyle) {
						linetype = enablestyle.linetype;
						result = this._resultStyleProc(styleid, propid, linetype, exprbind, rowidx, usecache);
					}
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					linetype = bandstyle.celllinetype;
					result = this._resultStyleProc(styleid, propid, linetype, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					linetype = enablebandstyle.celllinetype;
					result = this._resultStyleProc(styleid, propid, linetype, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					if (this.cssclass) {
						linetype = this._findcss_ctrl._find_pseudo_obj("linetype", pseudo, "linetype");
						result = this._resultStyleProc(styleid, propid, linetype, exprbind, rowidx, usecache);
					}
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					linetype = bandinfo._find_gridpseudo_obj("celllinetype", pseudo, this.celltype, "linetype");
					result = this._resultStyleProc(styleid, propid, linetype, exprbind, rowidx, usecache, lastcache);
				}
				else {
					return result;
				}
			}
		}

		else if (propid == "gradation") {
			var gradation;
			if (selected) {
				gradation = style.selectgradation;
				result = this._resultStyleProc(styleid, propid, gradation, exprbind, rowidx, usecache);

				if (this.isStyleEmpty(result)) {
					if (style != enablestyle) {
						gradation = enablestyle.selectgradation;
						result = this._resultStyleProc(styleid, propid, gradation, exprbind, rowidx, usecache);
					}
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					gradation = bandstyle.selectgradation;
					result = this._resultStyleProc(styleid, propid, gradation, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					gradation = enablebandstyle.selectgradation;
					result = this._resultStyleProc(styleid, propid, gradation, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					if (this.cssclass) {
						gradation = this._findcss_ctrl._find_pseudo_obj("selectgradation", pseudo, "gradation");
						result = this._resultStyleProc(styleid, propid, gradation, exprbind, rowidx, usecache);
					}
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					gradation = bandinfo._find_gridpseudo_obj("selectgradation", pseudo, this.celltype, null, true, "gradation");
					result = this._resultStyleProc(styleid, propid, gradation, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}
			}

			if (odd && this.isStyleEmpty(result)) {
				gradation = style.gradation2;
				result = this._resultStyleProc(styleid, propid, gradation, exprbind, rowidx, usecache);

				if (this.isStyleEmpty(result)) {
					if (style != enablestyle) {
						gradation = enablestyle.gradation2;
						result = this._resultStyleProc(styleid, propid, gradation, exprbind, rowidx, usecache);
					}
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					gradation = bandstyle.cellgradation2;
					result = this._resultStyleProc(styleid, propid, gradation, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					gradation = enablebandstyle.cellgradation2;
					result = this._resultStyleProc(styleid, propid, gradation, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					if (this.cssclass) {
						gradation = this._findcss_ctrl._find_pseudo_obj("gradation2", pseudo, "gradation");
						result = this._resultStyleProc(styleid, propid, gradation, exprbind, rowidx, usecache);
					}
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					gradation = bandinfo._find_gridpseudo_obj("cellgradation2", pseudo, this.celltype, null, true, "gradation");
					result = this._resultStyleProc(styleid, propid, gradation, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}
			}

			if (this.isStyleEmpty(result)) {
				gradation = style.gradation;
				result = this._resultStyleProc(styleid, propid, gradation, exprbind, rowidx, usecache);

				if (this.isStyleEmpty(result)) {
					if (style != enablestyle) {
						gradation = enablestyle.gradation;
						result = this._resultStyleProc(styleid, propid, gradation, exprbind, rowidx, usecache);
					}
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					gradation = bandstyle.cellgradation;
					result = this._resultStyleProc(styleid, propid, gradation, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					gradation = enablebandstyle.cellgradation;
					result = this._resultStyleProc(styleid, propid, gradation, exprbind, rowidx, usecache);
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					if (this.cssclass) {
						gradation = this._findcss_ctrl._find_pseudo_obj("gradation", pseudo, "gradation");
						result = this._resultStyleProc(styleid, propid, gradation, exprbind, rowidx, usecache);
					}
				}
				else {
					return result;
				}

				if (this.isStyleEmpty(result)) {
					gradation = bandinfo._find_gridpseudo_obj("cellgradation", pseudo, this.celltype, "gradation", false, "gradation");
					result = this._resultStyleProc(styleid, propid, gradation, exprbind, rowidx, usecache, lastcache);
				}
				else {
					return result;
				}
			}
		}

		else if (propid == "cursor") {
			var cursor = style.cursor;
			result = this._resultStyleProc(styleid, propid, cursor, exprbind, rowidx, usecache);

			if (this.isStyleEmpty(result)) {
				if (style != enablestyle) {
					cursor = enablestyle.cursor;
					result = this._resultStyleProc(styleid, propid, cursor, exprbind, rowidx, usecache, lastcache);
				}
			}
			else {
				return result;
			}

			if (this.isStyleEmpty(result)) {
				if (this.cssclass) {
					cursor = this._findcss_ctrl._find_pseudo_obj("cursor", pseudo, "cursor");
					result = this._resultStyleProc(styleid, propid, cursor, exprbind, rowidx, usecache);
				}
			}
			else {
				return result;
			}

			if (this.isStyleEmpty(result)) {
				cursor = bandinfo._find_gridpseudo_obj("cursor", pseudo, this.celltype);
				result = this._resultStyleProc(styleid, propid, cursor, exprbind, rowidx, usecache, lastcache);
			}
			else {
				return result;
			}
		}

		else if (propid == "padding") {
			var padding = style.padding;
			result = this._resultStyleProc(styleid, propid, padding, exprbind, rowidx, usecache);

			if (this.isStyleEmpty(result)) {
				if (style != enablestyle) {
					padding = enablestyle.padding;
					result = this._resultStyleProc(styleid, propid, padding, exprbind, rowidx, usecache);
				}
			}
			else {
				return result;
			}

			if (this.isStyleEmpty(result)) {
				padding = bandstyle.cellpadding;
				result = this._resultStyleProc(styleid, propid, padding, exprbind, rowidx, usecache);
			}
			else {
				return result;
			}

			if (this.isStyleEmpty(result)) {
				padding = enablebandstyle.cellpadding;
				result = this._resultStyleProc(styleid, propid, padding, exprbind, rowidx, usecache);
			}
			else {
				return result;
			}

			if (this.isStyleEmpty(result)) {
				if (this.cssclass) {
					padding = this._findcss_ctrl._find_pseudo_obj("padding", pseudo, "padding");
					result = this._resultStyleProc(styleid, propid, padding, exprbind, rowidx, usecache);
				}
			}
			else {
				return result;
			}

			if (this.isStyleEmpty(result)) {
				padding = bandinfo._find_gridpseudo_obj("cellpadding", pseudo, this.celltype, null, true, "padding");
				result = this._resultStyleProc(styleid, propid, padding, exprbind, rowidx, usecache, lastcache);
			}
			else {
				return result;
			}
		}
		return result;
	};

	_pGridCellInfo._addStyleCache = function (styleid, propobj) {
		if (!this._stylecache[styleid] && propobj !== undefined) {
			this._stylecache[styleid] = propobj;
		}
	};

	_pGridCellInfo._bkground = null;
	_pGridCellInfo._query_pseudo_background = function (rowidx, odd, selected, pseudo) {
		selected = (this.grid.useselcolor && selected);

		if (pseudo == "selected") {
			pseudo = "normal";
		}

		var styleidbase = [(odd != 0), selected, pseudo].join("");
		var styleid = "background" + styleidbase;
		var styleid2 = "backgroundimage" + styleidbase;
		var background = this._stylecache[styleid];
		var backgroundimage = this._stylecache[styleid2];

		if (!background || background._bindtype > 0) {
			background = this._searchStyleValue("background", styleid, rowidx, odd, selected, pseudo, true, null, true);
		}

		if (!backgroundimage || backgroundimage._bindtype > 0) {
			backgroundimage = this._searchStyleValue("backgroundimage", styleid2, rowidx, odd, selected, pseudo, true, null, true);
		}

		if (backgroundimage && !backgroundimage._is_empty) {
			var val = "";
			if (background) {
				val = background._value;
			}

			var x = background.position_x;
			var y = background.position_y;


			if (this._bkground) {
				delete this._bkground;
			}

			background = this._bkground = new nexacro.Style_background(val);
			background = this.parent._set_backgroundimage(background, backgroundimage._value.toString());
			background.position_x = x;

			background.position_y = y;
		}

		return background;
	};

	_pGridCellInfo._query_pseudo_treecontrol = function (rowidx, styleProp, pseudo) {
		var val = "";
		if (styleProp == "treecollapseimage") {
			val = this._getTreeCollapseImage(rowidx);
		}
		else if (styleProp == "treeexpandimage") {
			val = this._getTreeExpandImage(rowidx);
		}
		else if (styleProp == "treeitemimage") {
			val = this._getTreeItemImage(rowidx);
		}
		if (!val) {
			var v = this.grid._find_comp_pseudo_obj(styleProp, pseudo);
			val = (v) ? v._value : "";
		}
		return val;
	};

	_pGridCellInfo._query_pseudo_control = function (control, rowidx, controlProp, styleProp, pseudo, returnType, childctrl, odd, selected) {
		var style = this.style;
		var enablestyle = this.style;
		var styles = this._styles;
		var grid = this.grid;
		var gridstyle = grid.style;
		var propobj;
		var org_styleProp = styleProp;
		if (control._getStyleProp) {
			org_styleProp = control._getStyleProp(styleProp);
		}
		var result = null;

		if (pseudo == "selected" && !(control instanceof nexacro.GridControlCombo)) {
			pseudo = "normal";
		}

		var styleid = [control._type_name, controlProp, styleProp, pseudo, (odd != 0), (selected == true), (childctrl != null)].join("");
		propobj = this._stylecache[styleid];

		if (propobj !== undefined) {
			if (propobj === null) {
				return null;
			}

			if (result = this._exeExprStyle(propobj, org_styleProp, rowidx)) {
				return result;
			}
		}

		if (styles[pseudo]) {
			style = styles[pseudo];
		}

		if (controlProp == styleProp) {
			if (selected) {
				propobj = style["select" + styleProp];

				if (propobj) {
					this._addStyleCache(styleid, propobj);
				}

				result = this._exeExprStyle(propobj, org_styleProp, rowidx);
			}

			if (this.isStyleEmpty(result)) {
				if (odd != undefined && odd) {
					propobj = style[styleProp + "2"];
				}

				if (propobj) {
					this._addStyleCache(styleid, propobj);
				}

				result = this._exeExprStyle(propobj, org_styleProp, rowidx);
			}
			else {
				return result;
			}
		}

		if (this.isStyleEmpty(result)) {
			propobj = style[controlProp];

			if (propobj) {
				this._addStyleCache(styleid, propobj);
			}

			result = this._exeExprStyle(propobj, org_styleProp, rowidx);
		}
		else {
			return result;
		}

		if (this.isStyleEmpty(result)) {
			if (style != enablestyle) {
				propobj = enablestyle[controlProp];
				if (propobj) {
					this._addStyleCache(styleid, propobj);
				}

				result = this._exeExprStyle(propobj, controlProp, rowidx);
			}
		}
		else {
			return result;
		}

		if (this.isStyleEmpty(result)) {
			if (this.cssclass) {
				propobj = this._findcss_ctrl._find_pseudo_obj(controlProp, pseudo, returnType);
				if (propobj) {
					this._addStyleCache(styleid, propobj);
				}

				result = this._exeExprStyle(propobj, org_styleProp, rowidx);
			}
		}
		else {
			return result;
		}

		if (this.isStyleEmpty(result)) {
			if (controlProp == "controlalign") {
				propobj = style.align;
				if (propobj) {
					this._addStyleCache(styleid, propobj);
				}

				result = this._exeExprStyle(propobj, org_styleProp, rowidx);
			}
		}
		else {
			return result;
		}

		if (this.isStyleEmpty(result)) {
			if (childctrl) {
				propobj = childctrl._find_pseudo_obj(styleProp, pseudo, returnType);
				if (propobj) {
					this._addStyleCache(styleid, propobj);
				}

				result = this._exeExprStyle(propobj, org_styleProp, rowidx);
			}
		}
		else {
			return result;
		}

		if (this.isStyleEmpty(result)) {
			propobj = control._find_typedctrl_pseudo_obj(styleProp, pseudo, returnType);
			if (propobj) {
				this._addStyleCache(styleid, propobj);
			}

			result = this._exeExprStyle(propobj, org_styleProp, rowidx);
		}
		return result;
	};

	_pGridCellInfo.isStyleEmpty = function (prop) {
		if (!prop || (prop._bindtype == 0 && prop._is_empty)) {
			return true;
		}
		return false;
	};

	_pGridCellInfo._query_pseudo_border = function (rowidx, selected, pseudo, suppress, parentcolspan, parentrowspan) {
		var grid = this.grid;
		selected = (grid.useselcolor && selected);

		var disp_type = "both";

		if (this._endcol && (grid.hideendline == "col" || grid.hideendline == "both")) {
			disp_type = "horz";
		}
		if (rowidx >= 0 && ((rowidx + 1) == grid._rowcount) && (grid.hideendline == "col" || grid.hideendline == "row")) {
			if (disp_type == "horz") {
				disp_type = "none";
			}
			else {
				disp_type = "vert";
			}
		}

		if (disp_type == "none") {
			return null;
		}

		if (suppress == undefined) {
			suppress = 0;
		}

		var supptype = "n";
		if (suppress > 0) {
			supptype = "r";
		}

		else if (suppress < 0) {
			supptype = "c";
		}

		if (pseudo == "selected") {
			pseudo = "normal";
		}

		var styleidbase = [selected, disp_type, pseudo, supptype, parentcolspan, parentrowspan].join("");
		var styleid = "linetype" + styleidbase;
		var styleid2 = "line" + styleidbase;
		var styleid3 = "calcborder" + styleidbase;

		var border = this._stylecache[styleid3];
		if (border !== undefined) {
			return border;
		}

		var exprbind = {
			type : 0
		};
		var linetype = this._stylecache[styleid];
		var line = this._stylecache[styleid2];

		if (!linetype || linetype._bindtype > 0) {
			linetype = this._searchStyleValue("linetype", styleid, rowidx, false, selected, pseudo, true, exprbind, true);
		}

		var exprbindproc = (exprbind.type == 0) ? false : true;

		if (!line || line._bindtype > 0) {
			line = this._searchStyleValue("border", styleid2, rowidx, false, selected, pseudo, true, exprbind, true);
		}

		if (!exprbindproc) {
			exprbindproc = (exprbind.type == 0) ? false : true;
		}

		var bandinfo = this.parent;

		var linetype_val = "exvert";
		if (linetype && !linetype._is_empty) {
			if (linetype._value == "exhorz" || linetype._value == "nocross") {
				linetype_val = "exvert";
			}
			else if (linetype._value == "onlyhorz" || linetype._value == "onlyvert") {
				linetype_val = linetype._value;
			}
		}
		var border_val = "none";

		if (line && !line._is_empty) {
			var topstr, rightstr, bottomstr, leftstr, arrstr, nonestr = "0px none transparent";

			topstr = line._top_width + "px " + ((line.top_style) ? line.top_style : "none") + " " + ((line.top_color) ? line.top_color : "transparent") + " " + line.top_color2;
			rightstr = line._right_width + "px " + ((line.right_style) ? line.right_style : "none") + " " + ((line.right_color) ? line.right_color : "transparent") + " " + line.right_color2;
			bottomstr = line._bottom_width + "px " + ((line.bottom_style) ? line.bottom_style : "none") + " " + ((line.bottom_color) ? line.bottom_color : "transparent") + " " + line.bottom_color2;
			leftstr = line._left_width + "px " + ((line.left_style) ? line.left_style : "none") + " " + ((line.left_color) ? line.left_color : "transparent") + " " + line.left_color2;

			topstr = topstr.trim();
			rightstr = rightstr.trim();
			bottomstr = bottomstr.trim();
			leftstr = leftstr.trim();



			var is_topsumm = false;

			if (grid.summarytype == "top" || grid.summarytype == "lefttop") {
				is_topsumm = true;
			}

			if (parentcolspan != null && parentrowspan != null) {
				if (this._area == "right") {
					if (parentcolspan > 1 && this._col > 0) {
						leftstr = nonestr;
					}
				}
				else {
					if (parentcolspan - 1 > this._col) {
						rightstr = nonestr;
					}
				}
				if (bandinfo.id == "summary" && !is_topsumm) {
					if (parentrowspan > 1 && this._row > 0) {
						topstr = nonestr;
					}
				}
				else {
					if (parentrowspan - 1 > this._row) {
						bottomstr = nonestr;
					}
				}
			}

			var barr = [];

			if (this._area == "right") {
				if (bandinfo.id == "summary" && !is_topsumm) {
					if (linetype_val == "onlyhorz") {
						barr = [topstr, nonestr, nonestr, nonestr];
					}
					else if (linetype_val == "onlyvert") {
						barr = [nonestr, nonestr, nonestr, leftstr];
					}
					else {
						if (suppress < 0) {
							barr = [topstr, nonestr, nonestr, nonestr];
						}
						else {
							barr = [topstr, nonestr, nonestr, leftstr];
						}
					}
				}
				else {
					if (linetype_val == "onlyhorz") {
						if (suppress > 0) {
							barr = [nonestr, nonestr, nonestr, nonestr];
						}
						else {
							barr = [nonestr, nonestr, bottomstr, nonestr];
						}
					}
					else if (linetype_val == "onlyvert") {
						if (suppress < 0) {
							barr = [nonestr, nonestr, nonestr, nonestr];
						}
						else {
							barr = [nonestr, nonestr, nonestr, leftstr];
						}
					}
					else {
						if (suppress > 0) {
							barr = [nonestr, nonestr, nonestr, leftstr];
						}
						else if (suppress < 0) {
							barr = [nonestr, nonestr, bottomstr, nonestr];
						}
						else {
							barr = [nonestr, nonestr, bottomstr, leftstr];
						}
					}
				}
			}
			else {
				if (bandinfo.id == "summary" && !is_topsumm) {
					if (linetype_val == "onlyhorz") {
						barr = [topstr, nonestr, nonestr, nonestr];
					}
					else if (linetype_val == "onlyvert") {
						barr = [nonestr, rightstr, nonestr, nonestr];
					}
					else {
						if (suppress < 0) {
							barr = [topstr, nonestr, nonestr, nonestr];
						}
						else {
							barr = [topstr, rightstr, nonestr, nonestr];
						}
					}
				}
				else {
					if (linetype_val == "onlyhorz") {
						if (suppress > 0) {
							barr = [nonestr, nonestr, nonestr, nonestr];
						}
						else {
							barr = [nonestr, nonestr, bottomstr, nonestr];
						}
					}
					else if (linetype_val == "onlyvert") {
						if (suppress < 0) {
							barr = [nonestr, nonestr, nonestr, nonestr];
						}
						else {
							barr = [nonestr, rightstr, nonestr, nonestr];
						}
					}
					else {
						if (suppress > 0) {
							barr = [nonestr, rightstr, nonestr, nonestr];
						}
						else if (suppress < 0) {
							barr = [nonestr, nonestr, bottomstr, nonestr];
						}
						else {
							barr = [nonestr, rightstr, bottomstr, nonestr];
						}
					}
				}
			}
			border_val = barr.join(",");
		}
		border = nexacro._getCachedStyleObj("border", border_val);

		if (exprbindproc == false) {
			this._addStyleCache(styleid3, border);
		}

		if ((!linetype || linetype._bindtype == 0) && (!line || line._bindtype == 0)) {
			if (!selected) {
				this._curborder = border;
			}
			else {
				this._curselborder = border;
			}
		}
		else {
			if (!selected) {
				this._curborder = "bindexpr";
			}
			else {
				this._curselborder = "bindexpr";
			}
		}

		return border;
	};

	_pGridCellInfo._query_pseudo_gradation = function (rowidx, odd, selected, pseudo) {
		selected = (this.grid.useselcolor && selected);

		if (pseudo == "selected") {
			pseudo = "normal";
		}

		var styleid = ["gradation", (odd != 0), selected, pseudo].join("");
		var gradation = this._stylecache[styleid];

		if (!gradation || gradation._bindtype > 0) {
			gradation = this._searchStyleValue("gradation", styleid, rowidx, odd, selected, pseudo, true, null, true);
		}

		return gradation;
	};

	_pGridCellInfo._query_pseudo_cursor = function (rowidx, pseudo) {
		if (pseudo == "selected") {
			pseudo = "normal";
		}

		var styleid = ["cursor", pseudo].join("");
		var cursor = this._stylecache[styleid];

		if (!cursor || cursor._bindtype > 0) {
			cursor = this._searchStyleValue("cursor", styleid, rowidx, false, false, pseudo, true, null, false);
		}

		if (!cursor || cursor._is_empty) {
			cursor = nexacro._getCachedStyleObj("cursor", "default");
			this._addStyleCache(styleid, cursor);
		}
		return cursor;
	};

	_pGridCellInfo._query_pseudo_padding = function (rowidx, pseudo) {
		if (pseudo == "selected") {
			pseudo = "normal";
		}

		var styleid = ["padding", pseudo].join("");
		var padding = this._stylecache[styleid];

		if (!padding || padding._bindtype > 0) {
			padding = this._searchStyleValue("padding", styleid, rowidx, false, false, pseudo, true, null, false);
		}

		if (!padding || padding._is_empty) {
			padding = this.grid.on_find_CurrentStyle_padding(pseudo);
			this._addStyleCache(styleid, padding);
		}

		if (!padding || padding._bindtype == 0) {
			this._curpadding = padding;
		}
		else {
			this._curpadding = "bindexpr";
		}
		return padding;
	};

	_pGridCellInfo._query_pseudo_font = function (rowidx, selected, pseudo) {
		selected = (this.grid.useselcolor && selected);

		if (pseudo == "selected") {
			pseudo = "normal";
		}

		var styleid = ["font", selected, pseudo].join("");
		var font = this._stylecache[styleid];
		var org_font = this._stylecache[styleid];

		if (!font || font._bindtype > 0) {
			font = this._searchStyleValue("font", styleid, rowidx, false, selected, pseudo, true, null, false);
		}

		if (!font || font._is_empty) {
			font = this.grid.on_find_CurrentStyle_font(pseudo);
			this._addStyleCache(styleid, font);
		}

		if (!org_font || org_font._bindtype == 0) {
			if (!selected) {
				this._curfont = org_font;
			}
			else {
				this._curselfont = org_font;
			}
		}
		else {
			if (!selected) {
				this._curfont = "bindexpr";
			}
			else {
				this._curselfont = "bindexpr";
			}
		}

		return font;
	};

	_pGridCellInfo._query_pseudo_letterspace = function (rowidx, selected, pseudo) {
		selected = (this.grid.useselcolor && selected);

		if (pseudo == "selected") {
			pseudo = "normal";
		}

		var styleid = ["letterspace", selected, pseudo].join("");
		var letterspace = this._stylecache[styleid];

		if (!letterspace || letterspace._bindtype > 0) {
			letterspace = this._searchStyleValue("letterspace", styleid, rowidx, false, selected, pseudo, true, null, false);
		}

		if (!letterspace || letterspace._is_empty) {
			letterspace = this.grid.on_find_CurrentStyle_letterspace(pseudo);
			this._addStyleCache(styleid, letterspace);
		}

		return letterspace;
	};

	_pGridCellInfo._query_pseudo_color = function (rowidx, odd, selected, pseudo) {
		selected = (this.grid.useselcolor && selected);

		if (pseudo == "selected") {
			pseudo = "normal";
		}

		var styleid = ["color", (odd != 0), selected, pseudo].join("");
		var color = this._stylecache[styleid];

		if (!color || color._bindtype > 0) {
			color = this._searchStyleValue("color", styleid, rowidx, odd, selected, pseudo, true, null, false);
		}

		if (!color || color._is_empty) {
			color = this.grid.on_find_CurrentStyle_color(pseudo);
			this._addStyleCache(styleid, color);
		}
		return color;
	};

	_pGridCellInfo._query_pseudo_accessibility = function (rowidx, pseudo) {
		if (pseudo == "selected") {
			pseudo = "normal";
		}

		var style = this.style;
		var styles = this._styles;
		var enablestyle = this.style;

		var result = null;
		var accessibility = style.accessibility;
		var styleid = ["accessibility", pseudo].join("");

		var propobj;
		propobj = this._stylecache[styleid];
		result = this._resultStyleProc(styleid, "accessibility", accessibility, null, rowidx, true);

		if (this.isStyleEmpty(result)) {
			if (style != enablestyle) {
				accessibility = enablestyle.accessibility;
				result = this._resultStyleProc(styleid, "accessibility", accessibility, exprbind, rowidx, usecache);
			}
		}
		else {
			return result;
		}

		if (this.isStyleEmpty(result)) {
			if (this.cssclass) {
				accessibility = this._findcss_ctrl._find_pseudo_obj("accessibility", pseudo, "accessibility");
				result = this._resultStyleProc(styleid, "accessibility", accessibility, null, rowidx, true);
			}
		}
		else {
			return result;
		}

		if (this.isStyleEmpty(result)) {
			result = nexacro.Component._default_accessibility;
		}

		return result;
	};

	_pGridCellInfo._query_pseudo_align = function (rowidx, displayType, pseudo) {
		if (pseudo == "selected") {
			pseudo = "normal";
		}

		var styleid = ["align", pseudo, displayType].join("");
		var align = this._stylecache[styleid];

		if (!align || align._bindtype > 0) {
			align = this._searchStyleValue("align", styleid, rowidx, false, false, pseudo, true, null, false);
		}

		if (!align || align._is_empty) {
			align = this.grid.on_find_CurrentStyle_align(pseudo);
			if (!align || align._is_empty) {
				if (this.celltype == "head") {
					align = nexacro._getCachedStyleObj("align", "center middle");
				}
				else {
					align = this._getDefaultAlign(rowidx, displayType);
				}
			}
			this._addStyleCache(styleid, align);
		}
		else if (!align.halign || !align.valign) {
			var align2 = this.grid.on_find_CurrentStyle_align(pseudo);
			if (!align2 || align2._is_empty) {
				if (this.celltype == "head") {
					align2 = nexacro._getCachedStyleObj("align", "center middle");
				}
				else {
					align2 = this._getDefaultAlign(rowidx, displayType);
				}
			}
			if (!align.halign) {
				align.set_halign(align2.halign);
			}
			if (!align.valign) {
				align.set_valign(align2.valign);
			}
			this._addStyleCache(styleid, align);
		}
		return align;
	};

	_pGridCellInfo._getDefaultAlign = function (rowidx, displayType) {
		var align = null;

		switch (displayType) {
			case "bar":
			case "normal":
				var displayType = this._getDisplaytype(rowidx);
				if (displayType == "number") {
					align = nexacro._getCachedStyleObj("align", "right middle");
				}
				else if (displayType == "date" || displayType == "time" || displayType == "datetime") {
					align = nexacro._getCachedStyleObj("align", "center middle");
				}
				else {
					align = nexacro._getCachedStyleObj("align", "left middle");
				}
				break;
			case "number":
			case "exponent":
			case "currency":
				align = nexacro._getCachedStyleObj("align", "right middle");
				break;
			default:
				align = nexacro._getCachedStyleObj("align", "center middle");
				break;
		}
		return align;
	};

	_pGridCellInfo.set_class = function (v) {
		if (v != this.cssclass) {
			this.cssclass = v;
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_cssclass = function (v) {
		if (v != this.cssclass) {
			this.cssclass = v;
			this.grid._clearBindTypeFlag();
			this._findcss_ctrl.set_cssclass(v);
			this._findcss_ctrl._css_finder = null;
			this._findcss_ctrl._ref_css_finder = null;

			var bandinfo = this.parent;
			var bandctrl = bandinfo.bandctrl;
			var format = bandinfo.parent;

			if (bandinfo.bandctrl) {
				format._clearCellStyleCache(bandctrl.id);
				bandctrl._refresh_contents(true);
			}
		}
	};

	_pGridCellInfo.set_style = function (v) {
		this.grid._clearBindTypeFlag();

		v = nexacro._decodeXml(v);

		var blocks = v.split("}");
		var s = blocks[0].trim();

		var _styles = this._styles = {
		};

		blocks.pop();

		var i, len = blocks.length;
		var definition_block, pseudo, normal_style;

		var style = this.style;
		definition_block = s.split("{");
		normal_style = definition_block[0].substring(0, definition_block[0].lastIndexOf(";") + 1).trim();

		if (normal_style.length == 0) {
			normal_style = definition_block[0].substring(0, definition_block[0].length).trim();
		}

		style._setValue(normal_style);
		_styles["normal"] = style;

		var change = (this.style._value != normal_style);
		if (change) {
			this.style._setValue(normal_style);
		}

		if (len > 0) {
			for (i = 0; i < len; i++) {
				definition_block = blocks[i].split("{");
				pseudo = definition_block[0].substring(definition_block[0].lastIndexOf(":") + 1).trim();
				var style2 = new nexacro.GridCell_Style(this);
				style2._setValue(definition_block[1]);
				_styles[pseudo] = style2;
			}
		}
		return this.style._value;
	};

	_pGridCellInfo.set_displaytype = function (v) {
		if (v != this.displaytype) {
			var oldVal = this.displaytype._value;
			this.displaytype._set(v);
			this.grid._clearBindTypeFlag();

			if (oldVal == "tree") {
				this.grid._removeTreeCellinfo(this);
			}
			if (v == "tree") {
				this.grid._setTreeCellinfo(this);
			}
		}
	};

	_pGridCellInfo.set_edittype = function (v) {
		if (v != this.edittype) {
			this.edittype._set(v);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_tooltiptype = function (v) {
		if (v != this.tooltiptype) {
			if (!v) {
				v = "";
			}
			this.tooltiptype = v;
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_tooltiptext = function (v) {
		if (v != this.tooltiptext._value) {
			if (!v) {
				v = "";
			}
			this.tooltiptext._set(v);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo._getTooltipText = function (rowidx) {
		var text = this._getAttrValue(this.tooltiptext, rowidx);
		if (!text || text == "") {
			var bandinfo = this.parent;
			text = bandinfo._getTooltipText(rowidx);
		}
		return text;
	};
	_pGridCellInfo.set_autosizecol = function (v) {
		var val = "default";
		switch (v) {
			case "none":
			case "limitmin":
			case "limitmax":
				val = v;
		}
		if (val != this.autosizecol) {
			this.autosizecol = val;
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_autosizerow = function (v) {
		var val = "default";
		switch (v) {
			case "none":
			case "limitmin":
			case "limitmax":
			case "default":
				val = v;
		}
		if (val != this.autosizerow) {
			this.autosizerow = val;
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_celltype = function (v) {
		var val = "none";
		switch (v) {
			case "head":
			case "body":
			case "summary":
				val = v;
		}
		if (val != this.celltype) {
			this.celltype = val;
			this.grid._clearBindTypeFlag();

			var bandinfo = this.parent;
			var bandctrl = bandinfo.bandctrl;
			var format = bandinfo.parent;

			if (bandinfo.bandctrl) {
				format._clearCellStyleCache(bandctrl.id);
				bandctrl._refresh_contents(true);
			}
		}
	};

	_pGridCellInfo.set_displayexpdec = function (v) {
		if (v != this.displayexpdec._value) {
			this.displayexpdec._set_intval(v);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_locale = function (v) {
		if (v != this.locale._value) {
			this.locale._set(v);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_mask = function (v) {
		if (v != this.mask._value) {
			this.mask._set(v);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_maskchar = function (v) {
		if (!v) {
			v = "_";
		}
		var val = v.toString().charAt(0);
		if (val != this.maskchar) {
			this.maskchar = val;
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_suppress = function (v) {
		if (v != this.suppress._value) {
			this.suppress._set_intval(v);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_suppressalign = function (v) {
		if (v) {
			v = v.toString().toLowerCase();
		}

		var val = "first";
		switch (v) {
			case "first":
			case "last":
			case "middle":
			case "first,over":
			case "middle,over":
			case "last,over":
				val = v;
		}
		if (val != this.suppressalign) {
			this.suppressalign = val;
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_suppressedit = function (v) {
		v = v ? true : false;
		if (v != this.suppressedit) {
			this.suppressedit = v;
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_wordwrap = function (v) {
		var bindtype = 0;
		if (typeof (v) == "string") {
			var temp = v.toLowerCase();
			if (temp.indexOf("bind:") >= 0 || temp.indexOf("bind(") >= 0) {
				bindtype = 1;
			}
			else if (temp.indexOf("expr:") >= 0 || temp.indexOf("expr(") >= 0) {
				bindtype = 2;
			}
			else {
				v = v.toLowerCase();
			}
		}

		if (bindtype == 0 && typeof (v) != "string") {
			return;
		}

		if (v != this.wordwrap._value) {
			this.wordwrap._set(v);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_text = function (v) {
		if (v !== this.text._value) {
			this.text._set(v);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_expr = function (v) {
		if (v != this.expr._value) {
			var str = v.toString();
			var tag = str.substr(0, 4).toUpperCase();
			if (tag != "EXPR") {
				v = "EXPR:" + v;
			}
			this.expr._set(v);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_subsumtext = function (v) {
		if (v != this.subsumtext._value) {
			this.subsumtext._set(v);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_combodataset = function (v) {
		if (v != this.combodataset._value) {
			this.combodataset._set(v);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_combocodecol = function (v) {
		if (v != this.combocodecol._value) {
			this.combocodecol._set(v);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_combodatacol = function (v) {
		if (v != this.combodatacol._value) {
			this.combodatacol._set(v);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_combodisplay = function (v) {
		if (v != this.combodisplay._value) {
			this.combodisplay._set_enumval(v, ["edit", "display"]);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_combodisplaynulltext = function (v) {
		if (v != this.combodisplaynulltext._value) {
			this.combodisplaynulltext._set(v);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_combodisplaynulltype = function (v) {
		if (v != this.combodisplaynulltype._value) {
			this.combodisplaynulltype._set_enumval(v, ["none", "nulltext"]);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_combodisplayrowcount = function (v) {
		if (v != this.combodisplayrowcount._value) {
			this.combodisplayrowcount._set_intval(v);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_combotype = function (v) {
		if (v != this.combotype._value) {
			this.combotype._set_enumval(v, ["dropdown", "search", "filter"]);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_calendardisplay = function (v) {
		if (v != this.calendardisplay._value) {
			this.calendardisplay._set_enumval(v, ["edit", "display"]);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_calendardisplaynulltext = function (v) {
		if (v != this.calendardisplaynulltext._value) {
			this.calendardisplaynulltext._set(v);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_calendardisplaynulltype = function (v) {
		if (v != this.calendardisplaynulltype._value) {
			this.calendardisplaynulltype._set_enumval(v, ["default", "none", "nulltext", "nullmask"]);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_calendarinnerdataset = function (v) {
		if (v != this.calendarinnerdataset._value) {
			this.calendarinnerdataset._set(v);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_calendarbackgroundcolumn = function (v) {
		if (v != this.calendarbackgroundcolumn._value) {
			this.calendarbackgroundcolumn._set(v);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_calendarbordercolumn = function (v) {
		if (v != this.calendarbordercolumn._value) {
			this.calendarbordercolumn._set(v);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_calendardatecolumn = function (v) {
		if (v != this.calendardatecolumn._value) {
			this.calendardatecolumn._set(v);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_calendartextcolorcolumn = function (v) {
		if (v != this.calendartextcolorcolumn._value) {
			this.calendartextcolorcolumn._set(v);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_editacceptsenter = function (v) {
		if (v != this.editacceptsenter._value) {
			this.editacceptsenter._set(v);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_editacceptstab = function (v) {
		if (v != this.editacceptstab._value) {
			this.editacceptstab._set(v);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_editautoselect = function (v) {
		if (v != this.editautoselect._value) {
			this.editautoselect._set(v);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_editautoskip = function (v) {
		if (v != this.editautoskip._value) {
			this.editautoskip._set(v);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_editclipmode = function (v) {
		if (v != this.editclipmode._value) {
			this.editclipmode._set_enumval(v, ["includespace", "excludespace"]);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_editdisplay = function (v) {
		if (v != this.editdisplay._value) {
			this.editdisplay._set_enumval(v, ["edit", "display"]);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_editfilter = function (v) {
		if (!v) {
			return;
		}

		var strval = ["alpha", "upper,number,nosign", "alpha,number", "alpha,number,nosign", "char", "digit", "integer", "lower", "lower,char", "lower,digit", "lower,digit,char", "lower,number", "lower,number,char", "lower,number,nosign", "none", "number", "number,char", "upper", "upper,char", "upper,digit", "upper,digit,char", "upper,number", "upper,number,char", "alpha,digit"];
		var arrstr = v.trim().split(",");

		for (var i = 0; i < strval.length; i++) {
			var a = true;
			var str = strval[i].split(",");

			if (arrstr.length != str.length) {
				continue;
			}

			for (var j = 0; j < arrstr.length; j++) {
				if (nexacro._indexOf(strval[i], arrstr[j]) < 0) {
					a = false;
					break;
				}
			}
			if (a == true) {
				v = strval[i];
				break;
			}
		}

		if (v != this.editfilter._value) {
			this.editfilter._set_enumval(v, ["alpha", "upper,number,nosign", "alpha,number", "alpha,number,nosign", "char", "digit", "integer", "lower", "lower,char", "lower,digit", "lower,digit,char", "lower,number", "lower,number,char", "lower,number,nosign", "none", "number", "number,char", "upper", "upper,char", "upper,digit", "upper,digit,char", "upper,number", "upper,number,char", "alpha,digit"]);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_editimemode = function (v) {
		if (v != this.editimemode._value) {
			this.editimemode._set_enumval(v, ["none", "alpha", "alpha,full", "hangul", "hangul,full", "katakana", "katakana,full", "hiragana", "direct"]);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_editlimit = function (v) {
		if (v != this.editlimit._value) {
			this.editlimit._set_intval(v);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_editlengthunit = function (v) {
		if (v != this.editlengthunit._value) {
			this.editlengthunit._set_enumval(v, ["utf16", "utf8", "ascii"]);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_editlimitbymask = function (v) {
		if (v != this.editlimitbymask._value) {
			this.editlimitbymask._set_enumval(v, ["none", "integer", "decimal", "both"]);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_editscrollbar = function (v) {
		if (v != this.editscrollbar._value) {
			this.editscrollbar._set_enumval(v, ["none", "autovert", "autohorz", "autoboth", "fixedvert", "fixedhorz", "fixedboth", "alwaysvert", "alwayshorz", "alwaysboth"]);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_edittrimtype = function (v) {
		if (v != this.edittrimtype._value) {
			this.edittrimtype._set_enumval(v, ["none", "left", "right", "both"]);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_edituseime = function (v) {
		if (v != this.edituseime._value) {
			this.edituseime._set_enumval(v, ["global", "local", "local,keep", "none"]);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_expandchar = function (v) {
		if (v != this.expandchar._value) {
			this.expandchar._set(v);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_expandimage = function (v) {
		if (v != this.expandimage._value) {
			this.expandimage._set(v);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_expandshow = function (v) {
		if (v != this.expandshow._value) {
			this.expandshow._set_enumval(v, ["hide", "show"]);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_expandsize = function (v) {
		if (v != this.expandsize._value) {
			this.expandsize._set_intval(v);
			this.grid._clearBindTypeFlag();
			if (this.celltype == "head") {
				this.grid._refreshHead();
			}
			else if (this.celltype == "body") {
				this.grid._refreshBody();
			}
			else if (this.celltype == "summ") {
				this.grid._refreshSumm();
			}
		}
	};

	_pGridCellInfo.set_treecheck = function (v) {
		if (v != this.treecheck._value) {
			this.treecheck._set(v);
			this.grid._clearBindTypeFlag();
			this.grid._initTreeStates();

			if (this.grid._bodyBand) {
				this.grid._bodyBand._recreate_contents();
			}
		}
	};

	_pGridCellInfo.set_treecollapseimage = function (v) {
		if (v != this.treecollapseimage._value) {
			this.treecollapseimage._set(v);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_treeexpandimage = function (v) {
		if (v != this.treeexpandimage._value) {
			this.treeexpandimage._set(v);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_treeitemimage = function (v) {
		if (v != this.treeitemimage._value) {
			this.treeitemimage._set(v);
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridCellInfo.set_treeitemmargin = function (v) {
	};

	_pGridCellInfo.set_treelevel = function (v) {
		if (v != this.treelevel._value) {
			this.treelevel._set(v);
			this.grid._clearBindTypeFlag();
			this.grid._initTreeStates();

			if (this.grid._bodyBand) {
				this.grid._bodyBand._recreate_contents();
			}
		}
	};

	_pGridCellInfo.set_treestartlevel = function (v) {
		if (v != this.treestartlevel._value) {
			this.treestartlevel._set_intval(v);
			this.grid._clearBindTypeFlag();

			if (this.grid._bodyBand) {
				this.grid._bodyBand._recreate_contents();
			}
		}
	};

	_pGridCellInfo.set_treestate = function (v) {
		if (v != this.treestate._value) {
			this.treestate._set(v);
		}

		this.grid._clearBindTypeFlag();
		this.grid._initTreeStates();

		var rowidx = this.grid._getDataRow(this.grid.currentrow);

		if (this._getEdittype(rowidx) == "tree") {
			if (this.grid._bodyBand) {
				this.grid._bodyBand._recreate_contents();
			}
		}
		else {
			this.grid._refreshBody();
		}
	};

	_pGridCellInfo._getTreeCheck = function (rowidx) {
		return this._getAttrValue(this.treecheck, rowidx);
	};

	_pGridCellInfo._getTreeCollapseImage = function (rowidx) {
		return this._getAttrValue(this.treecollapseimage, rowidx);
	};

	_pGridCellInfo._getTreeExpandImage = function (rowidx) {
		return this._getAttrValue(this.treeexpandimage, rowidx);
	};

	_pGridCellInfo._getTreeItemImage = function (rowidx) {
		return this._getAttrValue(this.treeitemimage, rowidx);
	};

	_pGridCellInfo._getTreeLevel = function (rowidx) {
		var v = this._getAttrValue(this.treelevel, rowidx);
		v = parseInt(v) | 0;
		return v;
	};

	_pGridCellInfo._getTreeStartLevel = function (rowidx) {
		var v = this._getAttrValue(this.treestartlevel, rowidx);
		v = parseInt(v) | 0;
		return v;
	};

	_pGridCellInfo._getTreeState = function (rowidx) {
		return this._getAttrValue(this.treestate, rowidx);
	};

	_pGridCellInfo._setTreeCheck = function (rowidx, v) {
		return this._setTreeBindValue(this.treecheck, rowidx, v);
	};

	_pGridCellInfo._setTreeCollapseImage = function (rowidx, v) {
		return this._setTreeBindValue(this.treecollapseimage, rowidx, v);
	};

	_pGridCellInfo._setTreeExpandImage = function (rowidx, v) {
		return this._setTreeBindValue(this.treeexpandimage, rowidx, v);
	};

	_pGridCellInfo._setTreeItemImage = function (rowidx, v) {
		return this._setTreeBindValue(this.treeitemimage, rowidx, v);
	};

	_pGridCellInfo._setTreeLevel = function (rowidx, v) {
		return this._setTreeBindValue(this.treelevel, rowidx, v);
	};

	_pGridCellInfo._setTreeStartLevel = function (rowidx, v) {
		return this._setTreeBindValue(this.treestartlevel, rowidx, v);
	};

	_pGridCellInfo._setTreeState = function (rowidx, v) {
		return this._setTreeBindValue(this.treestate, rowidx, v);
	};

	_pGridCellInfo._setTreeBindValue = function (attr, rowidx, v) {
		if (attr._bindtype == 1) {
			var grid = this.grid;
			var dataset = grid._binddataset;
			if (dataset) {
				grid._binddataset._treeBindChanged = true;
				dataset.setColumn(rowidx, v);
			}
		}
	};

	_pGridCellInfo._getSuppress = function (rowidx) {
		return this._getAttrValue(this.suppress, rowidx);
	};

	_pGridCellInfo._getDisplayText = function (rowidx) {
		var dt = this.displaytype;
		var d = this._getAttrValue(dt, rowidx);

		if (d == "normal") {
			var t = this.text;
			if (t._bindtype == 1) {
				var dataset = this.grid._binddataset;
				if (!dataset) {
					return "text";
				}
				var colid = t._bindexpr;
				var coltype = dataset._getColumnType(colid);

				switch (coltype) {
					case 1:
						return this._getDisplayText_text(rowidx);
					case 2:
					case 3:
					case 4:
						return this._getDisplayText_number(rowidx);
					case 5:
						return this._getDisplayText_date2(rowidx);
					case 6:
						return this._getDisplayText_time(rowidx);
					case 7:
						return this._getDisplayText_datetime(rowidx);
					default:
						return this._getDisplayText_none(rowidx);
				}
			}
			else {
				return this._getDisplayText_text(rowidx);
			}
		}
		else {
			if (d == "text") {
				return this._getDisplayText_text(rowidx);
			}
			else if (d == "exponent") {
				return this._getDisplayText_exponent(rowidx);
			}
			else if (d == "number") {
				return this._getDisplayText_number(rowidx);
			}
			else if (d == "currency") {
				return this._getDisplayText_currency(rowidx);
			}
			else if (d == "image") {
				return this._getDisplayText_image(rowidx);
			}
			else if (d == "date") {
				return this._getDisplayText_date(rowidx);
			}
			else if (d == "combo") {
				return this._getDisplayText_combo(rowidx);
			}
			else if (d == "button") {
				return this._getDisplayText_button(rowidx);
			}
			else if (d == "bar") {
				return this._getDisplayText_bar(rowidx);
			}
			else if (d == "checkbox") {
				return this._getDisplayText_checkbox(rowidx);
			}
			else if (d == "tree") {
				return this._getDisplayText_tree(rowidx);
			}
			else if (d == "none") {
				return this._getDisplayText_none(rowidx);
			}
		}
		return this._getDisplayText_text(rowidx);
	};

	_pGridCellInfo._getTextValueForDisp = function (rowidx) {
		if (this.expr._value != "") {
			return this._getAttrValue(this.expr, rowidx);
		}
		return this._getAttrValue(this.text, rowidx);
	};
	_pGridCellInfo._getDisplayText_text = function (rowidx) {
		var v = this._getTextValueForDisp(rowidx);
		if (v == undefined) {
			v = "";
		}
		else {
			v = v.toString();
		}

		var mask = this._getAttrValue(this.mask, rowidx);
		if (mask && mask.length) {
			this._org_val = "";
			v = this.__applyMask(v, mask, this.maskchar);
			v = this.__remove_apostrophe(v, mask);
		}
		return v;
	};
	_pGridCellInfo.__find_idx_dot = function (text, pos) {
		this._idx_dot = -1;
		var txtLen = text.length;
		for (var i = 0; i < pos; i++) {
			var ch = text.charAt(i);
			if (ch == ".") {
				this._idx_dot = i;
				break;
			}
		}

		if (this._idx_dot == -1 && pos < txtLen) {
			for (var i = pos; i < txtLen; i++) {
				var ch = text.charAt(i);
				if (ch == '.') {
					this._idx_dot = i;
					break;
				}
			}
		}
	};

	_pGridCellInfo._m_idx_dot = -1;
	_pGridCellInfo._m_idx_decimal = -1;
	_pGridCellInfo._m_hascomma = false;
	_pGridCellInfo._m_haszero = false;
	_pGridCellInfo.__get_info_mask = function (mask) {
		var mk = mask;
		var mk_len = mk.length;
		this._m_idx_dot = -1;
		this._m_idx_decimal = -1;
		this._m_hascomma = false;
		this._m_haszero = false;
		for (var i = 0; i < mk_len; i++) {
			var ch = mk.charAt(i);
			if (ch == ".") {
				if (this._m_idx_dot != -1) {
					break;
				}
				this._m_idx_dot = i;
			}
			else if (ch == "0" || ch == "9" || ch == "#") {
				this._m_idx_decimal = i;
				if (ch == "0") {
					this._m_haszero = true;
				}
			}
			else if (ch == ",") {
				this._m_hascomma = true;
			}
		}
	};

	_pGridCellInfo.__get_view_zeromask = function (mask) {
		var len = mask.length;
		var dot = -1;
		var val = 0;
		var integer = 0;
		var decimal = 0;
		var nineidx = -1;

		for (var i = 0; i < len; i++) {
			var ch = mask.charAt(i);
			if (ch == "0" || (integer > 0 && ch == "#")) {
				integer++;
			}
			else if (ch == ".") {
				dot = i;
				break;
			}
			else if (ch == "9") {
				integer = 0;
			}
		}

		var intlast = len;
		if (dot >= 0) {
			intlast = dot;
		}


		var s = 0;
		for (i = intlast - 1; i >= 0; i--, s++) {
			var ch = mask.charAt(i);
			if (ch == "9") {
				nineidx = s;
				break;
			}
		}

		var preVal = "";
		for (i = len - 1; i > dot, dot != -1; i--) {
			var ch = mask.charAt(i);
			if ((i == dot) && (ch == ".")) {
				break;
			}

			if (ch == "0" || (decimal > 0 && (ch == "#" || ch == "9"))) {
				decimal++;
			}

			preVal = ch;
		}

		return {
			integer : integer, 
			decimal : decimal, 
			nineidx : nineidx
		};
	};

	_pGridCellInfo.__make_text_zeromask = function (text, mask) {
		var str = text = text.toString();
		var mask_len = mask.length;

		var len = text.length;
		this.__get_info_mask(mask);
		this.__find_idx_dot(text, len);

		var tempmask = mask.trim();
		var peridx = tempmask.indexOf("%");
		var per = "";

		if (peridx >= 0) {
			mask = mask.replace("%", "");
			per = "%";
		}

		var ret = this.__get_view_zeromask(mask);
		var integer_len = 0;
		var zero_cnt = 0;

		if (this._org_val == undefined) {
			str = "";
			len = 0;
		}

		var idx_dot = this._idx_dot;
		integer_len = (idx_dot == -1) ? len : idx_dot;


		var view_str = "";
		if (this._org_val != undefined) {
			var int_flag = false;
			var decimal_flag = false;




			var intmasklen = (this._m_idx_dot >= 0) ? this._m_idx_dot : mask_len;
			for (var i = intmasklen - 1; i >= 0; i--) {
				var mask_ch = mask.charAt(i);
				if (mask_ch == "#") {
					int_flag = true;
					break;
				}
			}


			if (this._org_val == 0) {
				decimal_flag = true;
			}

			if (int_flag) {
				var flag = false;
				for (var i = 0; i < integer_len; i++) {
					var ch = text.charAt(i);
					if (ch == "0" && !flag) {
						view_str += "";
						flag = false;
					}
					else {
						view_str += ch;
						flag = true;
					}
				}
			}
			else {
				view_str = text.substring(0, integer_len);
			}

			var new_integer_len = view_str.length;

			if (decimal_flag) {
				var copy_idx = len;
				for (var i = len - 1; i >= idx_dot; i--) {
					var ch = text.charAt(i);
					if (ch != "0") {
						copy_idx = i;
						break;
					}
				}

				view_str += text.substring(idx_dot, copy_idx + 1);
			}
			else {
				view_str += text.substring(integer_len);
			}

			str = view_str;
			integer_len = new_integer_len;
		}



		var templen = integer_len;
		for (i = 0; i < ret.integer - integer_len; i++) {
			str = "0" + str;
			templen++;
		}


		if (this._m_idx_dot != -1) {
			if (this._idx_dot == -1 && ret.decimal > 0 && (this._m_idx_dot != undefined && this._m_idx_dot != -1)) {
				str += ".";
			}

			len = str.length;
			this.__find_idx_dot(str, len);

			zero_cnt = 0;
			if (this._idx_dot != -1) {
				zero_cnt = len - this._idx_dot - 1;
			}

			for (i = 0; i < ret.decimal - zero_cnt; i++) {
				str = str + "0";
			}
		}

		if (ret.nineidx > -1) {
			if (ret.nineidx >= templen) {
				var zero_len = ret.nineidx - templen + 1;
				str = str.padLeft(zero_len + str.length, "0");
			}
		}

		text = str;

		if (peridx == 0) {
			text = per + text;
		}
		else {
			text += per;
		}

		return text;
	};


	_pGridCellInfo.__remove_apostrophe = function (v, mask) {
		var mask_len = mask.length;
		var len = v.length;

		var new_text = "";
		var v_idx = 0;
		for (var i = 0; i < mask_len; i++, v_idx++) {
			var mask_ch = mask.charAt(i);
			var ch = v.charAt(v_idx);

			if (mask_ch == "'") {
				for (var j = i + 1; j < mask_len; j++, v_idx++) {
					mask_ch = mask.charAt(j);
					if (mask_ch == "'") {
						i = j;
						v_idx = j;
						break;
					}
					else {
						new_text += mask_ch;
					}
				}
			}
			else if (mask_ch == "\\") {
				mask_ch = mask.charAt(i + 1);
				if (mask_ch == "\'") {
					new_text += mask_ch;
					i++;
				}
				else {
					new_text += ch;
				}
			}
			else {
				new_text += ch;
			}
		}

		return new_text;
	};

	_pGridCellInfo.__update_dot_display = function (v, mask) {
		var new_text = v;

		this.__get_info_mask(mask);
		this.__find_idx_dot(v, 0);

		var len = v.length;

		if (this._m_idx_dot != undefined && this._m_idx_dot != -1 && this._idx_dot != -1) {
			var mask_decimal_len = mask.length - this._m_idx_dot - 1;
			var decimal_len = len - this._idx_dot - 1;
			if (mask_decimal_len != decimal_len) {
				if (decimal_len == 0) {
					new_text = v.substring(0, this._idx_dot);
				}
				else {
					new_text = v.substring(0, this._idx_dot + mask_decimal_len + 1);
				}
			}
		}

		return new_text;
	};


	_pGridCellInfo.__update_empty_decimal = function (v) {
		this.__find_idx_dot(v, 0);

		var new_text = v;

		var len = v.length;
		if (this._m_idx_dot != undefined && this._m_idx_dot != -1 && 
			this._idx_dot != -1) {
			var decimal_len = len - this._idx_dot - 1;
			if (decimal_len == 0) {
				new_text = v.substring(0, this._idx_dot);
			}
		}
		else if (this._m_idx_dot != undefined && this._m_idx_dot == -1 && 
			this._idx_dot != -1) {
			new_text = v.substring(0, this._idx_dot);
		}

		return new_text;
	};

	_pGridCellInfo.__applyMask = function (value, mask, maskchar) {
		var text = "";
		var valueLen = value.length;
		var maskLen = mask.length;
		var maskCharCnt = 0;
		var n = 0;
		var isValid = true;
		var startPassword = false;
		var startBackslash = false;
		var startApostrop = false;

		for (var i = 0; i < maskLen; i++) {
			var maskCh = mask.charAt(i);

			if (this.__isMask(maskCh) || maskCh == "\\" || maskCh == "\"" || maskCh == "\'") {
				if (maskCh == "{") {
					startPassword = true;
					continue;
				}
				else if (maskCh == "}") {
					startPassword = false;
					continue;
				}
				else if (maskCh == "\\" && startBackslash == false) {
					startBackslash = true;
					continue;
				}

				if (startBackslash) {
					startBackslash = false;
					text += maskCh;
					continue;
				}

				if (maskCh == "\'" && startApostrop == false) {
					startApostrop = true;
					text += maskchar;
					continue;
				}

				if (startApostrop) {
					if (maskCh == "\'") {
						text += maskchar;
						startApostrop = false;
					}
					else {
						text += maskCh;
					}
					continue;
				}

				if (n < valueLen) {
					var ch = value.charAt(n++);
					isValid = this.__testMask(ch, maskCh);

					if (isValid) {
						if (ch == " ") {
							if (this.editclipmode._value == "excludespace") {
								if (startPassword) {
									text += "*";
								}
								else {
									text += ch;
								}
							}
							else {
								text += maskchar;
							}
						}
						else {
							if (startPassword) {
								text += "*";
							}
							else {
								text += ch;
							}
						}
					}
					else {
						while (n < valueLen) {
							ch = value.charAt(n++);
							isValid = this.__testMask(ch, maskCh);
							if (isValid) {
								if (ch == " ") {
									if (this.editclipmode._value == "excludespace") {
										if (startPassword) {
											text += "*";
										}
										else {
											text += ch;
										}
									}
									else {
										text += maskchar;
									}
								}
								else {
									if (startPassword) {
										text += "*";
									}
									else {
										text += ch;
									}
								}
								break;
							}
						}
					}
				}
				else {
					text += maskchar;
				}
			}
			else {
				text += maskCh;
			}
		}

		for (i = 0; i < maskCharCnt; i++) {
			text += maskchar;
		}


		return text;
	};

	_pGridCellInfo.__isMask = function (ch) {
		return (ch == "@" || ch == "#" || ch == "*" || ch == "9" || ch == "A" || ch == "a" || ch == "Z" || ch == "z" || ch == "}" || ch == "{");
	};

	_pGridCellInfo._maskRegexMap = {
		"@" : /[\u0020-\u00ff]/, 
		"#" : /[0-9]/, 
		"*" : /[a-zA-Z]/, 
		"9" : /[a-zA-Z0-9]/, 
		"A" : /[A-Z]/, 
		"a" : /[a-z]/, 
		"Z" : /[A-Z0-9]/, 
		"z" : /[a-z0-9]/
	};

	_pGridCellInfo.__testMask = function (ch, maskCh) {
		var regex = this._maskRegexMap[maskCh];

		return (regex) ? regex.test(ch) : (ch == maskCh);
	};

	_pGridCellInfo._getDisplayText_exponent = function (rowidx) {
		var v = this._getTextValueForDisp(rowidx);

		return (v) ? v.toString() : "";
	};

	_pGridCellInfo._org_val = null;
	_pGridCellInfo._getDisplayText_number = function (rowidx) {
		var v = this._getTextValueForDisp(rowidx);
		var locale = this._getAttrValue(this.locale, rowidx);
		var org_mask = this._getAttrValue(this.mask, rowidx);
		var mask_info = this._getPureNumberMask(org_mask);
		var mask = mask_info.pure_mask;
		var bApplyLocale = false;

		if (!locale && this.grid) {
			locale = this.grid._getLocale();
		}

		if (mask == undefined) {
			mask = "";
		}

		this._org_val = v;
		if (v == undefined) {
			v = "";
		}

		var masknumber_api = this.grid._masknumber_api;
		if (!masknumber_api) {
			masknumber_api = this.grid._masknumber_api = new nexacro.EditMaskNumber(null);
		}

		masknumber_api._setLocale(locale);
		masknumber_api.setDisplayMask(mask);
		if (v instanceof nexacro.Decimal || v instanceof nexacro.Number) {
			v = v.toLocaleString(locale);
			bApplyLocale = true;
		}
		else {
			v = v.toString();
		}

		if (!isNaN(v)) {
			v = masknumber_api.removeMask(v);
		}

		var val = masknumber_api.normalizeValue(v, true);

		if (bApplyLocale || (!mask && isNaN(val))) {
			masknumber_api._dispComma = false;
		}

		var num = masknumber_api.makeDisplayText(val, bApplyLocale);

		num = mask_info.pre_str + num + mask_info.post_str;

		return num;
	};

	_pGridCellInfo._getPureNumberMask = function (mask) {
		var ch, idx_dot = -1, pre_str = "", pure_mask = "", post_str = "", len = mask ? mask.length : 0;
		for (var i = 0; i < len; i++) {
			ch = mask.charAt(i);
			switch (mask.charAt(i)) {
				case "+":
				case "-":
				case "0":
				case "9":
				case "#":
				case "!":
				case ",":
					if (post_str == "") {
						pure_mask += ch;
					}
					else {
						post_str += ch;
					}
					break;
				case ".":
					if (post_str == "") {
						if (idx_dot < 0) {
							idx_dot = i;
							pure_mask += ch;
						}
					}
					else {
						post_str += ch;
					}
					break;
				default:
					if (pure_mask == "") {
						pre_str += ch;
					}
					else {
						post_str += ch;
					}
					break;
			}
		}
		return {
			"pre_str" : pre_str, 
			"pure_mask" : pure_mask, 
			"post_str" : post_str
		};
	};

	_pGridCellInfo._getDisplayText_currency = function (rowidx) {
		var v = this._getTextValueForDisp(rowidx);
		var locale = this._getAttrValue(this.locale, rowidx);
		if (!locale && this.grid) {
			locale = this.grid._getLocale();
		}

		if (!isNaN(v)) {
			var nexanum = new nexacro.Number(v);
			v = nexanum.toLocaleCurrencyString(locale);
		}

		return v;
	};

	_pGridCellInfo._getDisplayText_image = function (rowidx) {
		var dataset = this.grid._binddataset;
		if (dataset && dataset.getRowCount() <= rowidx) {
			return "";
		}
		var v = this._getTextValueForDisp(rowidx);
		return (v) ? v.toString() : "";
	};

	_pGridCellInfo._getDisplayText_date = function (rowidx, colType) {
		var dataset = this.grid._binddataset;

		if (dataset && dataset.getRowCount() <= rowidx) {
			return "";
		}

		var v = this._getTextValueForDisp(rowidx);
		var date = undefined;
		var null_test = 0;
		var nullmask = false;
		var is_date_empty = false;

		v = (v) ? v : "";

		if (v.constructor == Date) {
			date = v;
		}
		else {
			var strVal = v.toString();

			for (var i = 0; i < strVal.length; i++) {
				if (strVal.charAt(i) != " ") {
					null_test = 1;
					break;
				}
			}

			if (null_test == 1) {
				if (colType == undefined) {
					if (strVal.length <= 6) {
						colType = 0;
					}
					else if (strVal.length <= 8) {
						colType = 2;
					}
					else {
						colType = 1;
					}
				}

				if (colType == 1) {
					v._timecheck = true;
				}

				date = this.__parseDate(strVal, colType);
			}
			else {
				if (colType == 1) {
					v._timecheck = true;
				}

				if (this.calendardisplaynulltype._value == "nulltext") {
					return this._getAttrValue(this.calendardisplaynulltext, rowidx);
				}
				else if (this.calendardisplaynulltype._value == "nullmask") {
					nullmask = true;
				}
				else if (this.calendardisplaynulltype._value == "default") {
				}
				else {
					return "";
				}
			}
		}


		if (date == null) {
			is_date_empty = true;
			date = new nexacro.Date();
			date.setFullYear(0);
			date.setMonth(0);
			date.setDate(1);
		}

		var dateStr;
		var locale = this._getAttrValue(this.locale, rowidx);
		if (!locale && this.grid) {
			locale = this.grid._getLocale();
		}

		if (this.mask == "SHORTDATE" || this.mask == "LONGDATE") {
			var locale_info = nexacro.Locale.getLocaleInfo(locale);
			var format = "";

			if (this.mask == "SHORTDATE") {
				format = locale_info.shortdate_format;
			}
			else {
				format = locale_info.longdate_format;
			}

			if (format == "") {
				format = nexacro.Locale._default_shortdate_format;
			}

			var b_ltr_mark = (!this.grid._isRtl() && locale_info.direction == "rtl") ? true : false;

			dateStr = date.getLocaleFormatString(locale, format, b_ltr_mark);
		}
		else {
			var yyyy = date.getFullYear();
			if (yyyy == 0) {
				yyyy = "0000";
			}

			var MM = date.getMonth() + 1;
			MM = (MM < 10 ? "0" : "") + MM;
			var displaycalendarctrl = this.grid._getDisplayCalendarCtrl();

			var locale_info = nexacro.Locale.getLocaleInfo(locale);
			displaycalendarctrl._datelistL = locale_info.weekday_names_long;
			displaycalendarctrl._datelistS = locale_info.weekday_names_short;

			var ddd = displaycalendarctrl._datelistS[date.getDay()];
			var dddd = displaycalendarctrl._datelistL[date.getDay()];
			var dd = date.getDate();
			dd = (dd < 10 ? "0" : "") + dd;

			var yy = date.getYear() % 100;
			var M = +MM;
			var d = +dd;

			var hour = date.getHours();
			hour = (hour < 10 ? "0" : "") + hour;
			var h = +hour;

			var minute = date.getMinutes();
			minute = (minute < 10 ? "0" : "") + minute;
			var mn = +minute;

			var second = date.getSeconds();
			second = (second < 10 ? "0" : "") + second;

			var s = +second;

			if (is_date_empty) {
				hour = h = "00";
				minute = mn = "00";
				second = s = "00";
			}

			var format = this._getAttrValue(this.mask, rowidx);

			if (format == null || format.length == 0 || !format.match(/[yMdHhms]/)) {
				format = "yyyy-MM-dd";
			}

			if (nullmask) {
				var maskchar1 = this.maskchar;
				var maskchar2 = maskchar1 + maskchar1;
				var maskchar3 = maskchar2 + maskchar1;
				var maskchar4 = maskchar3 + maskchar1;

				dateStr = format.replace("yyyy", maskchar4);
				dateStr = dateStr.replace("MM", maskchar2);
				dateStr = dateStr.replace("dddd", "weekL");
				dateStr = dateStr.replace("ddd", "week");
				dateStr = dateStr.replace("dd", maskchar2);
				dateStr = dateStr.replace("yy", maskchar2);
				dateStr = dateStr.replace("M", maskchar1);
				dateStr = dateStr.replace("d", maskchar1);
				dateStr = dateStr.replace("tt", maskchar2);
				dateStr = dateStr.replace("HH", maskchar2);
				dateStr = dateStr.replace("hh", maskchar2);
				dateStr = dateStr.replace("H", maskchar1);
				dateStr = dateStr.replace("h", maskchar1);
				dateStr = dateStr.replace("mm", maskchar2);
				dateStr = dateStr.replace("m", maskchar1);
				dateStr = dateStr.replace("ss", maskchar2);
				dateStr = dateStr.replace("s", maskchar1);
				dateStr = dateStr.replace("weekL", maskchar4);
				dateStr = dateStr.replace("week", maskchar3);
			}
			else {
				dateStr = format.replace("yyyy", yyyy);
				dateStr = dateStr.replace("MM", MM);
				dateStr = dateStr.replace("dddd", "weekL");
				dateStr = dateStr.replace("ddd", "week");
				dateStr = dateStr.replace("dd", dd);
				dateStr = dateStr.replace("yy", yy);
				dateStr = dateStr.replace("M", M);
				dateStr = dateStr.replace("d", d);

				var hh = hour;
				var tt = "오전";
				if (hour > 12 && hour < 25) {
					hh = hour < 22 ? "0" + (hour - 12) : hour - 12;
					tt = "오후";
				}

				dateStr = dateStr.replace("tt", tt);
				dateStr = dateStr.replace("HH", hour);
				dateStr = dateStr.replace("hh", hh);
				dateStr = dateStr.replace("H", h);
				dateStr = dateStr.replace("h", h);
				dateStr = dateStr.replace("mm", minute);
				dateStr = dateStr.replace("m", mn);
				dateStr = dateStr.replace("ss", second);
				dateStr = dateStr.replace("s", s);
				dateStr = dateStr.replace("weekL", dddd);
				dateStr = dateStr.replace("week", ddd);
			}
		}

		return dateStr;
	};

	_pGridCellInfo._getDisplayText_date2 = function (rowidx) {
		return this._getDisplayText_date(rowidx, 2);
	};

	_pGridCellInfo._getDisplayText_datetime = function (rowidx) {
		return this._getDisplayText_date(rowidx, 1);
	};

	_pGridCellInfo._getDisplayText_time = function (rowidx) {
		return this._getDisplayText_date(rowidx, 0);
	};

	_pGridCellInfo.__parseDate = function (v, dFlag) {
		var regexp;
		switch (dFlag) {
			case 0:
				regexp = /(\d{6})/;
				break;
			case 1:
				regexp = /(\d{14})/;
				break;
			default:
				regexp = /(\d{8})/;
				break;
		}

		if (regexp.test(v) == false) {
			return undefined;
		}
		var date = new nexacro.Date();

		if (dFlag > 0) {
			var year = +v.substring(0, 4);
			var month = +v.substring(4, 6);
			var day = +v.substring(6, 8);


			if (month < 1 || month > 12) {
				return undefined;
			}
			if (day < 1) {
				return undefined;
			}

			if (dFlag == 1) {
				var hour = +v.substring(8, 10);
				var min = +v.substring(10, 12);
				var sec = +v.substring(12, 14);
			}
			else {
				var hour = 0;
				var min = 0;
				var sec = 0;
			}
		}
		else {
			var year = 1900;
			var month = 1;
			var day = 1;
			var hour = +v.substring(0, 2);
			var min = +v.substring(2, 4);
			var sec = +v.substring(4, 6);
		}
		date.setHours(hour, min, sec);
		date.setFullYear(year, month - 1, day);
		return date;
	};

	_pGridCellInfo._getDisplayText_combo = function (rowidx) {
		var dataset = this.grid._binddataset;
		if (dataset && dataset.getRowCount() <= rowidx) {
			return "";
		}

		var combodataset = this._getAttrValue(this.combodataset, rowidx);
		var combocodecol = this._getAttrValue(this.combocodecol, rowidx);
		var combodatacol = this._getAttrValue(this.combodatacol, rowidx);
		if (combodataset && combodataset.length && combocodecol && combocodecol.length && combodatacol && combodatacol.length) {
			var grid = this.grid;
			var ds = grid._findDataset(combodataset);
			var v = this._getTextValueForDisp(rowidx);
			var text;

			this._tempinnerds.copyData(ds, false);

			if (ds && this._editingRow == rowidx) {
				text = ds.lookup(combocodecol, v, combodatacol);
			}
			else {
				text = this._tempinnerds.lookup(combocodecol, v, combodatacol);
			}

			if (text) {
				return text.toString();
			}
		}
		if (this.combodisplaynulltype._value == "nulltext") {
			var v = this._getAttrValue(this.combodisplaynulltext, rowidx);
			return v;
		}
		return "";
	};

	_pGridCellInfo._getDisplayText_button = function (rowidx) {
		var dataset = this.grid._binddataset;
		if (dataset && dataset.getRowCount() <= rowidx) {
			return "";
		}
		var v = this._getTextValueForDisp(rowidx);
		return (v) ? v.toString() : "";
	};

	_pGridCellInfo._getDisplayText_bar = function (rowidx) {
		var dataset = this.grid._binddataset;
		if (dataset && dataset.getRowCount() <= rowidx) {
			return "";
		}
		var v = this._getTextValueForDisp(rowidx);
		return (v) ? v.toString() : "";
	};

	_pGridCellInfo._getDisplayText_checkbox = function (rowidx) {
		var dataset = this.grid._binddataset;
		if (dataset && dataset.getRowCount() <= rowidx) {
			return "";
		}
		var v = this._getTextValueForDisp(rowidx);
		return (v) ? v.toString() : "";
	};

	_pGridCellInfo._getDisplayText_tree = function (rowidx) {
		var dataset = this.grid._binddataset;
		if (dataset && dataset.getRowCount() <= rowidx) {
			return "";
		}
		var v = this._getTextValueForDisp(rowidx);
		return (v) ? v.toString() : "";
	};

	_pGridCellInfo._getDisplayText_none = function (rowidx) {
		return "";
	};

	delete _pGridCellInfo;

	nexacro.GridBandInfo = function (id, type, parent, grid) {
		this.id = this.name = id;
		this.parent = parent;
		this.grid = grid;
		this.bandtype = type;
		this.style = new nexacro.GridBand_Style(this);
		this._styles = {
		};
		this.tooltiptext = new nexacro.BindableValue("");
		this.cellwordwrap = new nexacro.BindableValue("none");
		this.bandctrl = null;
		this._noborder = false;
		this._add_style_pseudo = [];
	};
	var _pGridBandInfo = nexacro._createPrototype(nexacro.Object, nexacro.GridBandInfo);
	nexacro.GridBandInfo.prototype = _pGridBandInfo;
	_pGridBandInfo._type_name = "GridBandInfo";
	_pGridBandInfo.classname = "";
	_pGridBandInfo.grid = null;
	_pGridBandInfo.bandtype = "";
	_pGridBandInfo.tooltiptext = "";
	_pGridBandInfo.tooltiptype = "none";


	_pGridBandInfo.destroy = function () {
		this.parent = null;
		this.grid = null;
		this.bandctrl = null;

		if (this.style) {
			delete this.style;
			this.style = null;
		}

		if (this._styles) {
			var styles = this._styles;
			for (var pseudo in styles) {
				var style = styles[pseudo];
				if (style.destroy) {
					style.destroy();
					style = null;
				}
			}
			this._styles = null;
		}

		this.tooltiptext = null;
		this.cellwordwrap = null;
		this._add_style_pseudo = null;
	};

	_pGridBandInfo._find_gridpseudo_obj = function (styleProp, pseudo, celltype, stylePropParent, bNotFindGrid, returnType) {
		if (this.bandctrl) {
			obj = this.bandctrl._find_pseudo_obj(styleProp, pseudo, returnType, celltype);

			if (obj == null && !bNotFindGrid) {
				obj = this.grid._find_pseudo_obj(styleProp, pseudo, returnType);
			}
		}
		else {
			obj = this.grid._find_pseudo_obj(styleProp, pseudo, returnType);
		}

		if (stylePropParent && (obj == null || obj._is_empty) && !bNotFindGrid) {
			obj = this.grid._find_pseudo_obj(stylePropParent, pseudo, returnType);
		}

		return obj;
	};

	_pGridBandInfo._query_pseudo_background = function (pseudo) {
		var style = this.style;
		if (style.background && !style.background._is_empty) {
			return style.background;
		}

		if (this.grid) {
			return this._find_gridpseudo_obj("background", pseudo, null, null, true, "background");
		}
		return null;
	};

	_pGridBandInfo._query_pseudo_border = function (pseudo) {
		var style = this.style;
		if (style.border && !style.border._is_empty) {
			if (style.border.top.width == 0) {
				this._noborder = true;
			}

			return style.border;
		}

		var b = this._find_gridpseudo_obj("border", pseudo, null, null, true, "border");
		if (b == null || b.top.width == 0) {
			this._noborder = true;
		}
		return b;
	};

	_pGridBandInfo._query_pseudo_bordertype = function (pseudo) {
		var style = this.style;
		if (style.bordertype && !style.bordertype._is_empty) {
			return style.bordertype;
		}
		if (this.grid) {
			return this._find_gridpseudo_obj("bordertype", pseudo, null, null, true, "bordertype");
		}
		return null;
	};

	_pGridBandInfo._query_pseudo_gradation = function (rowidx, odd, selected, pseudo) {
		var style = this.style;
		if (style.gradation && !style.gradation._is_empty) {
			return style.gradation;
		}
		if (this.grid) {
			return this._find_gridpseudo_obj("gradation", pseudo, null, null, true, "gradation");
		}
		return null;
	};

	_pGridBandInfo._set_backgroundimage = function (background, v) {
		v = v.toString();
		if (v.length >= 5) {
			if (v.substring(0, 3).toLowerCase() == "url") {
				var str = v.substr(4, 1);
				if (str == '\'' || str == '\"') {
					v = v.substring(5, v.length - 2);
				}
				else {
					v = v.substring(4, v.length - 1);
				}
			}
			else if (v.substring(0, 5).toLowerCase() != "theme") {
				var isBase64 = nexacro._checkBase64String(v);
				if (isBase64) {
					if (v.substring(0, 10).toLowerCase() != "data:image") {
						v = "data:image;base64," + v;
					}
					else if (v.substring(0, 17).toLowerCase() != "data:image;base64") {
						var comma_idx = v.indexOf(",");
						if (comma_idx > -1) {
							var tmp = v.slice(comma_idx + 1, v.legnth);
							v = "data:image;base64," + tmp;
						}
					}
				}
			}
		}

		if (v != background.image) {
			background.set_image(v);
		}
		return background;
	};

	_pGridBandInfo.set_class = function (v) {
		if (v != this.cssclass) {
			this.cssclass = v;

			if (this.bandctrl) {
				this.bandctrl.set_class(v);
				this.grid._clearBindTypeFlag();
			}
		}
	};

	_pGridBandInfo.set_id = function (v) {
	};

	_pGridBandInfo.set_cssclass = function (v) {
		if (v != this.cssclass) {
			this.cssclass = v;

			if (this.bandctrl) {
				this.bandctrl.set_cssclass(v);
				this.grid._clearBindTypeFlag();
			}
		}
	};

	_pGridBandInfo.set_style = function (v) {
		this.grid._clearBindTypeFlag();

		v = nexacro._decodeXml(v);

		var blocks = v.split("}");
		var s = blocks[0].trim();

		var _styles = this._styles = {
		};
		this._add_style_pseudo = [];

		blocks.pop();

		var i, len = blocks.length;
		var definition_block, pseudo, normal_style;

		var style = this.style;
		definition_block = s.split("{");
		normal_style = definition_block[0].substring(0, definition_block[0].lastIndexOf(";") + 1).trim();

		if (normal_style.length == 0) {
			normal_style = definition_block[0].substring(0, definition_block[0].length).trim();
		}

		style._setValue(normal_style);
		_styles["normal"] = style;

		if (this.bandctrl) {
			_styles["normal"]._target = this.bandctrl;
		}

		this._add_style_pseudo.push("normal");

		var change = (this.style._value != normal_style);
		if (change) {
			this.style._setValue(normal_style);
		}

		if (len > 0) {
			for (i = 0; i < len; i++) {
				definition_block = blocks[i].split("{");
				pseudo = definition_block[0].substring(definition_block[0].lastIndexOf(":") + 1).trim();
				var style2 = new nexacro.GridBand_Style(this);
				style2._setValue(definition_block[1]);
				_styles[pseudo] = style2;

				if (this.bandctrl) {
					_styles[pseudo]._target = this.bandctrl;
				}

				this._add_style_pseudo.push(pseudo);
			}
		}
		return this.style._value;
	};

	_pGridBandInfo._changeStyleTarget = function (bandctrl) {
		var style = this.style;
		var styles = this._styles;
		var add_styles = this._add_style_pseudo;
		var add_styles_len = add_styles.length;

		style._target = bandctrl;

		for (var i = 0; i < add_styles_len; i++) {
			style = styles[add_styles[i]];
			style._target = bandctrl;
		}
	};

	_pGridBandInfo.set_tooltiptype = function (v) {
		if (v != this.tooltiptype) {
			this.tooltiptype = v;
			this.grid._clearBindTypeFlag();
		}
	};

	_pGridBandInfo.set_tooltiptext = function (v) {
		if (v != this.tooltiptext._value) {
			this.tooltiptext._set(v);
			this.grid._clearBindTypeFlag();

			if (this.bandctrl) {
				this.bandctrl.on_apply_prop_tooltip();
			}
		}
	};

	_pGridBandInfo._getTooltipText = function (rowidx) {
		var text = this._getAttrValue(this.tooltiptext, rowidx);
		if (!text && text == "") {
			text = this.grid.tooltiptext;
			if (!text) {
				text = "";
			}
		}
		return text;
	};
	_pGridBandInfo.set_cellwordwrap = function (v) {
		var bindtype = 0;
		if (typeof (v) == "string") {
			var temp = v.toLowerCase();
			if (temp.indexOf("bind:") >= 0 || temp.indexOf("bind(") >= 0) {
				bindtype = 1;
			}
			else if (temp.indexOf("expr:") >= 0 || temp.indexOf("expr(") >= 0) {
				bindtype = 2;
			}
			else {
				v = v.toLowerCase();
			}
		}

		if (bindtype == 0 && typeof (v) != "string") {
			return;
		}

		if (v != this.cellwordwrap._value) {
			this.cellwordwrap._set(v);
			this.grid._clearBindTypeFlag();

			if (this.bandctrl) {
				this.bandctrl.on_apply_wordwrap();
			}
		}
	};

	_pGridBandInfo._getAttrValue = function (attr, rowidx, cellinfo) {
		if (attr == undefined) {
			return undefined;
		}

		if (attr._bindtype == undefined) {
			return attr;
		}
		else if (attr._bindtype == 0) {
			return attr._value;
		}
		else {
			var grid = this.grid;
			var dataset = grid._binddataset;

			if (dataset == null) {
				return undefined;
			}

			if (attr._bindtype == 1) {
				return dataset.getColumn(rowidx, attr._bindexpr);
			}
			else {
				var val = attr._value;
				var s = val.toLowerCase().indexOf("bind:");
				if (s >= 0) {
					var bindexpr = attr._bindexpr;
					bindexpr = bindexpr.substring(s, bindexpr.length);
					return dataset.getColumn(rowidx, bindexpr);
				}
				var exprfn = grid._exprcache[attr._bindexpr];
				if (exprfn == null) {
					exprfn = dataset._createExprFunc(attr._bindexpr);
					grid._exprcache[attr._bindexpr] = exprfn;
				}
				if ((typeof exprfn) == "function") {
					if (cellinfo) {
						cellinfo.col = cellinfo._col;
						cellinfo.row = cellinfo._row;
						return exprfn.call(cellinfo, rowidx, rowidx, grid, dataset, cellinfo.col);
					}
					else {
						return exprfn.call(this, rowidx, rowidx, grid, dataset);
					}
				}
			}
		}

		return undefined;
	};

	_pGridBandInfo._setAttrValue = function (attr, rowidx, v) {
		if (attr._bindtype == 1) {
			var grid = this.grid;
			var dataset = grid._binddataset;
			if (dataset) {
				dataset.setColumn(rowidx, attr._bindexpr, v);
			}
		}
	};

	delete _pGridBandInfo;
	nexacro.GridFormat = function (id, grid) {
		this.id = id;
		this.grid = this.parent = grid;
		this._cols = [];

		this._headrows = null;
		this._bodyrows = null;
		this._summrows = null;

		this._headband = null;
		this._summband = null;
		this._bodyband = null;

		this._headcells = null;
		this._summcells = null;
		this._bodycells = null;

		this.leftWidth = 0;
		this.rightWidth = 0;
		this.bodyWidth = 0;

		this._orgleftWidth = 0;
		this._orgrightWidth = 0;
		this._orgbodyWidth = 0;

		this.endbodycol = 0;
		this.startrightcol = -1;

		this.headHeight = 0;
		this.summHeight = 0;
		this.bodyHeight = 0;

		this._formatElem = null;
		this._formatElemOrg = null;
	};

	var _pGridFormat = nexacro._createPrototype(nexacro.Object, nexacro.GridFormat);
	nexacro.GridFormat.prototype = _pGridFormat;

	_pGridFormat._type_name = "GridFormat";

	_pGridFormat.destroy = function () {
		if (this._headband) {
			this._headband.destroy();
			this._headband = null;
		}

		if (this._summband) {
			this._summband.destroy();
			this._summband = null;
		}

		if (this._bodyband) {
			this._bodyband.destroy();
			this._bodyband = null;
		}

		if (this._headcells) {
			var cells = this._headcells;
			var len = cells.length;

			for (var i = 0; i < len; i++) {
				cells[i].destroy();
			}

			this._headcells = null;
		}

		if (this._summcells) {
			var cells = this._summcells;
			var len = cells.length;

			for (var i = 0; i < len; i++) {
				cells[i].destroy();
			}

			this._summcells = null;
		}

		if (this._bodycells) {
			var cells = this._bodycells;
			var len = cells.length;

			for (var i = 0; i < len; i++) {
				cells[i].destroy();
			}

			this._bodycells = null;
		}
		this._headrows = null;
		this._bodyrows = null;
		this._summrows = null;
		this._formatElem = null;
		this._formatElemOrg = null;
		this._cols = null;
		this.grid = null;
		this.parent = null;
	};

	_pGridFormat._clearCellStyleCache = function (band, cellidx) {
		var grid = this.grid;
		grid._clearBindTypeFlag();

		band = band.toLowerCase();
		var cells;

		if (band == "head") {
			cells = this._headcells;
			grid._is_use_bind_expr_style["head"] = false;
			grid._is_use_bind_expr_outerstyle["head"] = false;
		}
		else if (band == "summ" || band == "summary") {
			cells = this._summcells;
			grid._is_use_bind_expr_style["summ"] = false;
			grid._is_use_bind_expr_outerstyle["summ"] = false;
		}
		else {
			cells = this._bodycells;
			grid._is_use_bind_expr_style["body"] = false;
			grid._is_use_bind_expr_outerstyle["body"] = false;
		}

		if (cells) {
			if (cellidx > 0) {
				cells[cellidx]._stylecache = {
				};
				cells[cellidx]._is_use_bind_expr_style = false;

				var subcells = cells[cellidx]._subcells;

				for (var i = 0; i < subcells.length; i++) {
					subcells[i]._stylecache = {
					};
					subcells[i]._is_use_bind_expr_style = false;
				}
			}
			else {
				for (var i = 0; i < cells.length; i++) {
					cells[i]._stylecache = {
					};
					cells[i]._is_use_bind_expr_style = false;

					var subcells = cells[i]._subcells;

					for (var j = 0; j < subcells.length; j++) {
						subcells[j]._stylecache = {
						};
						subcells[j]._is_use_bind_expr_style = false;
					}
				}
			}
		}
	};

	_pGridFormat._resetOrgColSize = function (is_keep_area, autofitcol_rate) {
		if (this._cols) {
			var _cols = this._cols;
			var _colsLen = this._cols.length;
			var leftwidth, bodywidth, rightwidth;

			leftwidth = bodywidth = rightwidth = 0;

			if (!autofitcol_rate.length) {
				for (var i = 0; i < _colsLen; i++) {
					_cols[i].size = _cols[i].orgsize;
					_cols[i].left = _cols[i].orgleft;
					_cols[i].right = _cols[i].orgright;

					if (_cols[i]._area == "left") {
						leftwidth += _cols[i].size;
					}
					else if (_cols[i]._area == "right") {
						rightwidth += _cols[i].size;
					}
					else {
						bodywidth += _cols[i].size;
					}
				}
			}
			else {
				var left = 0;
				for (var i = 0; i < _colsLen; i++) {
					if (_cols[i]._area == "left") {
						leftwidth += _cols[i].size;
						continue;
					}
					else if (_cols[i]._area == "right") {
						rightwidth += _cols[i].size;
						continue;
					}

					_cols[i].size = Math.round(autofitcol_rate[i] * this._orgbodyWidth);
					_cols[i].left = left;
					_cols[i].right = left + _cols[i].size;
					left = _cols[i].right;
					bodywidth += _cols[i].size;
				}
			}
		}

		if (is_keep_area) {
			this.leftWidth = leftwidth;
			this.rightWidth = rightwidth;
			this._bodyWidth = this.bodyWidth = bodywidth;
		}
		else {
			this.leftWidth = this._orgleftWidth;
			this.rightWidth = this._orgrightWidth;
			this._bodyWidth = this.bodyWidth = this._orgbodyWidth;
		}
	};

	_pGridFormat._rearrangeCols = function () {
		var cols = this._cols;
		var cols_len = cols.length;

		for (var i = 0; i < cols_len; i++) {
			cols[i].orgidx = i;
		}
	};

	_pGridFormat._addLeftColumn = function (size) {
		var width = this.leftWidth + size;
		var orgwidth = this._orgleftWidth + size;
		var col = {
			size : size, 
			left : this.leftWidth, 
			right : width, 
			_area : "left", 
			orgsize : size, 
			orgleft : this._orgleftWidth, 
			orgright : orgwidth
		};
		var leftcnt = this._getColFixCnt("left");

		this._cols.splice(leftcnt, 0, col);
		this.leftWidth = width;
		this._orgleftWidth = orgwidth;
		return col;
	};

	_pGridFormat._addRightColumn = function (size) {
		var width = this.rightWidth + size;
		var orgwidth = this._orgrightWidth + size;
		var col = {
			size : size, 
			left : this.rightWidth, 
			right : width, 
			_area : "right", 
			orgsize : size, 
			orgleft : this._orgrightWidth, 
			orgright : orgwidth
		};
		this._cols.push(col);
		this.rightWidth = width;
		this._orgrightWidth = orgwidth;
		return col;
	};

	_pGridFormat._addBodyColumn = function (size) {
		var width = this.bodyWidth + size;
		var orgwidth = this._orgbodyWidth + size;
		var col = {
			size : size, 
			left : this.bodyWidth, 
			right : width, 
			_area : "body", 
			orgsize : size, 
			orgleft : this._orgbodyWidth, 
			orgright : orgwidth
		};
		var leftcnt = this._getColFixCnt("left");
		var bodycnt = this._getColFixCnt("body");

		this._cols.splice(leftcnt + bodycnt, 0, col);
		this.endbodycol = this._cols.length;
		this._bodyWidth = this.bodyWidth = width;
		this._orgbodyWidth = orgwidth;
		return col;
	};

	_pGridFormat._insertLeftColumn = function (size, addidx) {
		var width = this.leftWidth + size;
		var orgwidth = this._orgleftWidth + size;

		if (addidx >= this._cols.length) {
			return this._addLeftColumn(size);
		}

		var pcol = this._cols[addidx];
		var left = 0;
		var orgleft = 0;

		if (pcol) {
			left = pcol.left;
			orgleft = pcol.orgleft;
		}
		var right = left + size;
		var orgright = orgleft + size;

		var col = {
			size : size, 
			left : left, 
			right : right, 
			_area : "left", 
			orgsize : size, 
			orgleft : orgleft, 
			orgright : orgright
		};
		this._cols.splice(addidx, 0, col);

		this.leftWidth = width;
		this._orgleftWidth = orgwidth;

		this._adjustFormatColSize();
		return col;
	};

	_pGridFormat._insertRightColumn = function (size, addidx) {
		var width = this.rightWidth + size;
		var orgwidth = this._orgrightWidth + size;

		if (addidx >= this._cols.length) {
			return this._addRightColumn(size);
		}

		var pcol = this._cols[addidx];
		var left = 0;
		var orgleft = 0;

		if (pcol) {
			left = pcol.left;
			orgleft = pcol.orgleft;
		}
		var right = left + size;
		var orgright = orgleft + size;

		var col = {
			size : size, 
			left : left, 
			right : right, 
			_area : "right", 
			orgsize : size, 
			orgleft : orgleft, 
			orgright : orgright
		};
		this._cols.splice(addidx, 0, col);

		this.rightWidth = width;
		this._orgrightWidth = orgwidth;

		this._adjustFormatColSize();
		return col;
	};

	_pGridFormat._insertBodyColumn = function (size, addidx) {
		var width = this.bodyWidth + size;
		var orgwidth = this._orgbodyWidth + size;

		if (addidx >= this._cols.length) {
			return this._addBodyColumn(size);
		}

		var pcol = this._cols[addidx];
		var left = 0;
		var orgleft = 0;

		if (pcol) {
			left = pcol.left;
			orgleft = pcol.orgleft;
		}
		var right = left + size;
		var orgright = orgleft + size;

		var col = {
			size : size, 
			left : left, 
			right : right, 
			_area : "body", 
			orgsize : size, 
			orgleft : orgleft, 
			orgright : orgright
		};
		this._cols.splice(addidx, 0, col);

		this.endbodycol = this._cols.length;
		this._bodyWidth = this.bodyWidth = width;
		this._orgbodyWidth = orgwidth;

		this._adjustFormatColSize();
		return col;
	};

	_pGridFormat._moveColumn = function (fromcol, tocol, fromcolspan, tocolspan, cellmovingtype) {
		var from_col_info = this._cols[fromcol];
		var from_area = from_col_info._area;
		var from_left = from_col_info.left;
		var from_right = from_col_info.right;
		;

		if (!from_col_info || fromcol == tocol) {
			return false;
		}

		if (fromcol < tocol) {
			tocol += (tocolspan - 1);
		}

		var to_col_info = this._cols[tocol];

		switch (cellmovingtype) {
			case "col":
				break;
			case "col,band":
				if (from_col_info._area != to_col_info._area) {
					return false;
				}
				break;
			case "col,merge":
			case "col,line":
			default:
				return false;
		}

		from_col_info._area = to_col_info._area;

		this._cols.splice(fromcol, 1);
		this._cols.splice(tocol, 0, from_col_info);

		if (fromcol > tocol) {
			for (var i = tocol; i < fromcol; i++) {
				this._cols[i].left = this._cols[i + 1].left;
				this._cols[i].right = this._cols[i + 1].right;
			}
		}
		else {
			for (var i = tocol; i > fromcol; i--) {
				this._cols[i].left = this._cols[i - 1].left;
				this._cols[i].right = this._cols[i - 1].right;
			}
		}

		this._cols[fromcol].left = from_left;
		this._cols[fromcol].right = from_right;

		this._adjustFormatColSize();

		this._moveContentsCol("body", this._bodycells, fromcol, tocol);
		this._moveContentsCol("head", this._headcells, fromcol, tocol);
		this._moveContentsCol("summ", this._summcells, fromcol, tocol);
		this._bodycells = this._reIndexCells(this._bodycells, this._bodyrows);
		this._headcells = this._reIndexCells(this._headcells, this._headrows);
		this._summcells = this._reIndexCells(this._summcells, this._summrows);

		return true;
	};

	_pGridFormat._addHeadRow = function (size) {
		if (this._headrows == null) {
			this._headrows = [];
		}
		var height = this.headHeight + size;
		var row = {
			size : size, 
			top : this.headHeight, 
			bottom : height, 
			_area : "head", 
			orgsize : size, 
			orgtop : this.headHeight, 
			orgbottom : height
		};
		this._headrows.push(row);
		this.headHeight = height;
		return row;
	};

	_pGridFormat._addSummRow = function (size) {
		if (this._summrows == null) {
			this._summrows = [];
		}
		var height = this.summHeight + size;
		var row = {
			size : size, 
			top : this.summHeight, 
			bottom : height, 
			_area : "summ", 
			orgsize : size, 
			orgtop : this.summHeight, 
			orgbottom : height
		};
		this._summrows.push(row);
		this.summHeight = height;
		return row;
	};

	_pGridFormat._addBodyRow = function (size) {
		if (this._bodyrows == null) {
			this._bodyrows = [];
		}
		var height = this.bodyHeight + size;
		var row = {
			size : size, 
			top : this.bodyHeight, 
			bottom : height, 
			_area : "body", 
			orgsize : size, 
			orgtop : this.bodyHeight, 
			orgbottom : height
		};
		this._bodyrows.push(row);
		this._body_height = this.bodyHeight = height;
		return row;
	};

	_pGridFormat._insertHeadRow = function (addidx, size) {
		var row = {
			size : size, 
			top : 0, 
			bottom : size, 
			_area : "head", 
			orgsize : size, 
			orgtop : 0, 
			orgbottom : size
		};

		if (this._headrows == null || this._headrows.length == 0) {
			this._headrows = [];
			this._headrows.push(row);
		}
		else {
			if (addidx > 0) {
				if (this._headrows.length < addidx) {
					addidx = this._headrows.length;
				}

				row.top = this._headrows[addidx - 1].bottom;
				row.bottom = row.top + size;
			}
			this._headrows.splice(addidx, 0, row);
		}
		this.headHeight += size;
		this._adjustFormatRowSize(this._headrows);
		return row;
	};

	_pGridFormat._insertSummRow = function (addidx, size) {
		var row = {
			size : size, 
			top : 0, 
			bottom : size, 
			_area : "summ", 
			orgsize : size, 
			orgtop : 0, 
			orgbottom : size
		};

		if (this._summrows == null || this._summrows.length == 0) {
			this._summrows = [];
			this._summrows.push(row);
		}
		else {
			if (addidx > 0) {
				if (this._summrows.length < addidx) {
					addidx = this._summrows.length;
				}

				row.top = this._summrows[addidx - 1].bottom;
				row.bottom = row.top + size;
			}
			this._summrows.splice(addidx, 0, row);
		}
		this.summHeight += size;
		this._adjustFormatRowSize(this._summrows);
		return row;
	};

	_pGridFormat._insertBodyRow = function (addidx, size) {
		var row = {
			size : size, 
			top : 0, 
			bottom : size, 
			_area : "body", 
			orgsize : size, 
			orgtop : 0, 
			orgbottom : size
		};

		if (this._bodyrows == null || this._bodyrows.length == 0) {
			this._bodyrows = [];
			this._bodyrows.push(row);
		}
		else {
			if (addidx > 0) {
				if (this._bodyrows.length < addidx) {
					addidx = this._bodyrows.length;
				}

				row.top = this._bodyrows[addidx - 1].bottom;
				row.bottom = row.top + size;
			}
			else {
				addidx = 0;
			}
			this._bodyrows.splice(addidx, 0, row);
		}
		this.bodyHeight += size;
		this._body_height = this.bodyHeight;
		this._adjustFormatRowSize(this._bodyrows);
		return row;
	};

	_pGridFormat._addHeadCell = function (cell) {
		if (this._headcells == null) {
			this._headcells = [];
		}

		return this._addCell(this._headcells, cell);
	};

	_pGridFormat._addSummCell = function (cell) {
		if (this._summcells == null) {
			this._summcells = [];
		}

		return this._addCell(this._summcells, cell);
	};

	_pGridFormat._addBodyCell = function (cell) {
		if (this._bodycells == null) {
			this._bodycells = [];
		}

		return this._addCell(this._bodycells, cell);
	};

	_pGridFormat._addCell = function (cells, cell) {
		var scol = this._cols[cell._col];
		if (scol) {
			cell._area = scol._area;
			cells.push(cell);
			return cell;
		}
		return undefined;
	};

	_pGridFormat._insertHeadCell = function (cell, addidx, rowidx) {
		if (this._headcells == null) {
			this._headcells = [];
		}

		return this._insertCell(this._headcells, cell, addidx, rowidx);
	};

	_pGridFormat._insertSummCell = function (cell, addidx, rowidx) {
		if (this._summcells == null) {
			this._summcells = [];
		}

		return this._insertCell(this._summcells, cell, addidx, rowidx);
	};

	_pGridFormat._insertBodyCell = function (cell, addidx, rowidx) {
		if (this._bodycells == null) {
			this._bodycells = [];
		}

		return this._insertCell(this._bodycells, cell, addidx, rowidx);
	};

	_pGridFormat._insertCell = function (cells, cell, addidx, rowidx) {
		var scol = this._cols[cell._col];
		if (scol) {
			var cellsLen = cells.length;
			var cellinfo;
			var add;

			for (var i = 0; i < cellsLen; i++) {
				cellinfo = cells[i];
				if (cellinfo._col == addidx && cellinfo._row == rowidx) {
					add = i;
				}

				if (cellinfo._col >= addidx && cellinfo._row == rowidx) {
					cellinfo._col++;
				}
			}
			cell._area = scol._area;
			cells.splice(add, 0, cell);
			return cell;
		}
		return undefined;
	};

	_pGridFormat._arrayCopy = function (arr) {
		function cloneObj (obj) {
			var copy = {
			};
			for (var attr in obj) {
				if (obj.hasOwnProperty(attr)) {
					copy[attr] = obj[attr];
				}
			}
			return copy;
		}
		;

		var newarr = [];

		for (var i = 0; i < arr.length; i++) {
			newarr[i] = cloneObj(arr[i]);
		}
		return newarr;
	};

	_pGridFormat._getFormatStr = function () {
		return nexacro._documentToXml(this._formatElem);
	};

	_pGridFormat._getOrgFormatStr = function () {
		return nexacro._documentToXml(this._formatElemOrg);
	};
	_pGridFormat._updateFormatStr = function () {
		if (!this.grid.enableredraw) {
			return;
		}

		var hr = 0;
		var i = 0;
		var nColCount = 0;
		var nPvtCount = 0;
		var _cols = this._cols;
		var _headrows = this._headrows;
		var _bodyrows = this._bodyrows;
		var _summrows = this._summrows;
		var _headcells = this._headcells;
		var _bodycells = this._bodycells;
		var _summcells = this._summcells;
		var _headband = this._headband;
		var _bodyband = this._bodyband;
		var _summband = this._summband;

		if (_cols && _cols.length) {
			nColCount = _cols.length;
		}

		var strContents;

		if (nColCount > 0) {
			strContents = "<Format id=\"" + this.id + "\">\n";
			strContents += "<Columns>\n";
			{

				for (i = 0; i < nColCount; i++) {
					if (_cols[i]._area != "body") {
						strContents += "<Column size=\"" + _cols[i].size + "\" band=\"" + _cols[i]._area + "\"/>\n";
					}
					else {
						strContents += "<Column size=\"" + _cols[i].size + "\"/>\n";
					}
				}
			}
			strContents += "</Columns>\n";
			strContents += "<Rows>\n";
			{

				if (_headrows) {
					var _headrowsLen = _headrows.length;
					for (var i = 0; i < _headrowsLen; i++) {
						strContents += "<Row band=\"head\" size=\"" + _headrows[i].size + "\"/>\n";
					}
				}
				if (_bodyrows) {
					var _bodyrowsLen = _bodyrows.length;
					for (var i = 0; i < _bodyrowsLen; i++) {
						strContents += "<Row band=\"body\" size=\"" + _bodyrows[i].size + "\"/>\n";
					}
				}
				if (_summrows) {
					var _summrowsLen = _summrows.length;
					for (var i = 0; i < _summrowsLen; i++) {
						strContents += "<Row band=\"summ\" size=\"" + _summrows[i].size + "\"/>\n";
					}
				}
			}
			strContents += "</Rows>\n";

			function _makeCellstr (cells) {
				var cellsLen = cells.length;
				for (var i = 0; i < cellsLen; i++) {
					strContents += "<Cell col=\"" + cells[i]._col;
					strContents += "\" row=\"" + cells[i]._row;

					if (cells[i]._colspan > 1) {
						strContents += "\" colspan=\"" + cells[i]._colspan;
					}
					if (cells[i]._rowspan > 1) {
						strContents += "\" rowspan=\"" + cells[i]._rowspan;
					}
					if (cells[i].displaytype._value && cells[i].displaytype._value.length) {
						strContents += "\" displaytype=\"" + nexacro._encodeXml(cells[i].displaytype._value);
					}
					if (cells[i].edittype._value && cells[i].edittype._value.length && cells[i].edittype._value != "none") {
						strContents += "\" edittype=\"" + nexacro._encodeXml(cells[i].edittype._value);
					}
					if (cells[i].text._value && cells[i].text._value.length) {
						strContents += "\" text=\"" + nexacro._encodeXml(cells[i].text._value);
					}
					if (cells[i].style._value && cells[i].style._value.length) {
						strContents += "\" style=\"" + nexacro._encodeXml(cells[i].style._value);
					}
					if (cells[i].tooltiptext._value && cells[i].tooltiptext._value.length) {
						strContents += "\" tooltiptext=\"" + nexacro._encodeXml(cells[i].tooltiptext._value);
					}
					if (cells[i].tooltiptype && cells[i].tooltiptype.length && cells[i].tooltiptype != "none") {
						strContents += "\" tooltiptype=\"" + nexacro._encodeXml(cells[i].tooltiptype);
					}
					if (cells[i].displayexpdec._value >= 0) {
						strContents += "\" displayexpdec=\"" + cells[i].displayexpdec._value;
					}
					if (cells[i].locale._value && cells[i].locale._value.length) {
						strContents += "\" locale=\"" + nexacro._encodeXml(cells[i].locale._value);
					}
					if (cells[i].mask._value && cells[i].mask._value.length) {
						strContents += "\" mask=\"" + nexacro._encodeXml(cells[i].mask._value);
					}
					if (cells[i].maskchar && cells[i].maskchar.length && cells[i].maskchar != "_") {
						strContents += "\" maskchar=\"" + nexacro._encodeXml(cells[i].maskchar);
					}
					if (cells[i].suppress._value != 0) {
						strContents += "\" suppress=\"" + cells[i].suppress._value;
					}
					if (cells[i].suppressalign && cells[i].suppressalign.length && cells[i].suppressalign != "first") {
						strContents += "\" suppressalign=\"" + nexacro._encodeXml(cells[i].suppressalign);
					}
					if (cells[i].suppressedit == true) {
						strContents += "\" suppressedit=\"" + cells[i].suppressedit;
					}
					if (cells[i].wordwrap != "none" && cells[i].wordwrap != "false" && cells[i].wordwrap != false) {
						strContents += "\" wordwrap=\"" + nexacro._encodeXml(cells[i].wordwrap._value);
					}
					if (cells[i].expr._value && cells[i].expr._value.length) {
						strContents += "\" expr=\"" + nexacro._encodeXml(cells[i].expr._value);
					}
					if (cells[i].subsumtext._value && cells[i].subsumtext._value.length) {
						strContents += "\" subsumtext=\"" + nexacro._encodeXml(cells[i].subsumtext._value);
					}
					if (cells[i].calendardisplay._value && cells[i].calendardisplay._value.length && cells[i].calendardisplay._value != "edit") {
						strContents += "\" calendardisplay=\"" + nexacro._encodeXml(cells[i].calendardisplay._value);
					}
					if (cells[i].calendardisplaynulltext._value && cells[i].calendardisplaynulltext._value.length) {
						strContents += "\" calendardisplaynulltext=\"" + nexacro._encodeXml(cells[i].calendardisplaynulltext._value);
					}
					if (cells[i].calendardisplaynulltype._value && cells[i].calendardisplaynulltype._value.length && cells[i].calendardisplaynulltype._value != "default") {
						strContents += "\" calendardisplaynulltype=\"" + nexacro._encodeXml(cells[i].calendardisplaynulltype._value);
					}
					if (cells[i].combodataset._value && cells[i].combodataset._value.length) {
						strContents += "\" combodataset=\"" + nexacro._encodeXml(cells[i].combodataset._value);
					}
					if (cells[i].combocodecol._value && cells[i].combocodecol._value.length) {
						strContents += "\" combocodecol=\"" + nexacro._encodeXml(cells[i].combocodecol._value);
					}
					if (cells[i].combodatacol._value && cells[i].combodatacol._value.length) {
						strContents += "\" combodatacol=\"" + nexacro._encodeXml(cells[i].combodatacol._value);
					}
					if (cells[i].combodisplay._value && cells[i].combodisplay._value.length && cells[i].combodisplay._value != "edit") {
						strContents += "\" combodisplay=\"" + nexacro._encodeXml(cells[i].combodisplay._value);
					}
					if (cells[i].combodisplaynulltext._value && cells[i].combodisplaynulltext._value.length) {
						strContents += "\" combodisplaynulltext=\"" + nexacro._encodeXml(cells[i].combodisplaynulltext._value);
					}
					if (cells[i].combodisplaynulltype._value && cells[i].combodisplaynulltype._value.length && cells[i].combodisplaynulltype._value != "none") {
						strContents += "\" combodisplaynulltype=\"" + nexacro._encodeXml(cells[i].combodisplaynulltype._value);
					}
					if (cells[i].combodisplayrowcount._value >= 0 && cells[i].combodisplayrowcount._value != 5) {
						strContents += "\" combodisplayrowcount=\"" + cells[i].combodisplayrowcount._value;
					}
					if (cells[i].combotype._value && cells[i].combotype._value.length && cells[i].combotype._value != "dropdown") {
						strContents += "\" combotype=\"" + nexacro._encodeXml(cells[i].combotype._value);
					}
					if (cells[i].editacceptsenter._value == true) {
						strContents += "\" editacceptsenter=\"" + cells[i].editacceptsenter._value;
					}
					if (cells[i].editacceptstab._value == true) {
						strContents += "\" editacceptstab=\"" + cells[i].editacceptstab._value;
					}
					if (cells[i].editautoselect._value == true) {
						strContents += "\" editautoselect=\"" + cells[i].editautoselect._value;
					}
					if (cells[i].editautoskip._value == true) {
						strContents += "\" editautoskip=\"" + cells[i].editautoskip._value;
					}
					if (cells[i].editclipmode._value && cells[i].editclipmode._value.length && cells[i].editclipmode._value != "includespace") {
						strContents += "\" editclipmode=\"" + nexacro._encodeXml(cells[i].editclipmode._value);
					}
					if (cells[i].editdisplay._value && cells[i].editdisplay._value.length && cells[i].editdisplay._value != "edit") {
						strContents += "\" editdisplay=\"" + nexacro._encodeXml(cells[i].editdisplay._value);
					}
					if (cells[i].editfilter._value && cells[i].editfilter._value.length && cells[i].editfilter._value != "none") {
						strContents += "\" editfilter=\"" + nexacro._encodeXml(cells[i].editfilter._value);
					}
					if (cells[i].editimemode._value && cells[i].editimemode._value.length && cells[i].editimemode._value != "none") {
						strContents += "\" editimemode=\"" + nexacro._encodeXml(cells[i].editimemode._value);
					}
					if (cells[i].editlimit._value >= 0) {
						strContents += "\" editlimit=\"" + cells[i].editlimit._value;
					}
					if (cells[i].editlimitbymask._value && cells[i].editlimitbymask._value.length && cells[i].editlimitbymask._value != "decimal") {
						strContents += "\" editlimitbymask=\"" + nexacro._encodeXml(cells[i].editlimitbymask._value);
					}
					if (cells[i].editscrollbar._value && cells[i].editscrollbar._value.length && cells[i].editscrollbar._value != "none") {
						strContents += "\" editscrollbar=\"" + nexacro._encodeXml(cells[i].editscrollbar._value);
					}
					if (cells[i].edittrimtype._value && cells[i].edittrimtype._value.length && cells[i].edittrimtype._value != "none") {
						strContents += "\" edittrimtype=\"" + nexacro._encodeXml(cells[i].edittrimtype._value);
					}
					if (cells[i].edituseime._value && cells[i].edituseime._value.length && cells[i].edituseime._value != "global") {
						strContents += "\" edituseime=\"" + nexacro._encodeXml(cells[i].edituseime._value);
					}
					if (cells[i].treecheck._value && cells[i].treecheck._value.length) {
						strContents += "\" treecheck=\"" + nexacro._encodeXml(cells[i].treecheck._value);
					}
					if (cells[i].treecollapseimage._value && cells[i].treecollapseimage._value.length) {
						strContents += "\" treecollapseimage=\"" + nexacro._encodeXml(cells[i].treecollapseimage._value);
					}
					if (cells[i].treeexpandimage._value && cells[i].treeexpandimage._value.length) {
						strContents += "\" treeexpandimage=\"" + nexacro._encodeXml(cells[i].treeexpandimage._value);
					}
					if (cells[i].treeitemimage._value && cells[i].treeitemimage._value.length) {
						strContents += "\" treeitemimage=\"" + nexacro._encodeXml(cells[i].treeitemimage._value);
					}
					if (cells[i].treelevel._value && cells[i].treelevel._value.length) {
						strContents += "\" treelevel=\"" + nexacro._encodeXml(cells[i].treelevel._value);
					}
					if (cells[i].treestartlevel._value > 0) {
						strContents += "\" treestartlevel=\"" + cells[i].treestartlevel._value;
					}
					if (cells[i].treestate._value && cells[i].treestate._value.length) {
						strContents += "\" treestate=\"" + nexacro._encodeXml(cells[i].treestate._value);
					}
					if (cells[i].expandchar._value && cells[i].expandchar._value.length) {
						strContents += "\" expandchar=\"" + nexacro._encodeXml(cells[i].expandchar._value);
					}
					if (cells[i].expandimage._value && cells[i].expandimage._value.length) {
						strContents += "\" expandimage=\"" + nexacro._encodeXml(cells[i].expandimage._value);
					}
					if (cells[i].expandshow._value && cells[i].expandshow._value.length && cells[i].expandshow._value != "hide") {
						strContents += "\" expandshow=\"" + nexacro._encodeXml(cells[i].expandshow._value);
					}
					if (cells[i].expandsize >= 0 && cells[i].expandsize != cells[i]._default_expandsize) {
						strContents += "\" expandsize=\"" + cells[i].expandsize._value;
					}
					if (cells[i].autosizecol && cells[i].autosizecol.length && cells[i].autosizecol != "default") {
						strContents += "\" autosizecol=\"" + nexacro._encodeXml(cells[i].autosizecol);
					}
					if (cells[i].autosizerow && cells[i].autosizerow.length && cells[i].autosizerow != "default") {
						strContents += "\" autosizerow=\"" + nexacro._encodeXml(cells[i].autosizerow);
					}
					if (cells[i].celltype._value && cells[i].celltype._value.length && cells[i].celltype._value != "none") {
						strContents += "\" celltype=\"" + nexacro._encodeXml(cells[i].celltype._value);
					}
					if (cells[i].cssclass && cells[i].cssclass.length) {
						strContents += "\" cssclass=\"" + nexacro._encodeXml(cells[i].cssclass);
					}

					var subcells = cells[i]._subcells;
					var subcellsLen = subcells.length;

					if (subcellsLen > 0) {
						strContents += "\">\n";
						_makeCellstr(subcells);
						strContents += "</Cell>\n";
					}
					else {
						strContents += "\"/>\n";
					}
				}
			}

			if (_headrows) {
				strContents += "<Band id=\"head";
				if (_headband.style._value.length) {
					strContents += "\" style=\"" + nexacro._encodeXml(_headband.style._value);
				}
				if (_headband.tooltiptext._value.length) {
					strContents += "\" tooltiptext=\"" + nexacro._encodeXml(_headband.tooltiptext._value);
				}
				if (_headband.tooltiptype.length && _headband.tooltiptype != "none") {
					strContents += "\" tooltiptype=\"" + nexacro._encodeXml(_headband.tooltiptype);
				}
				if (_headband.cellwordwrap._value != "none") {
					strContents += "\" cellwordwrap=\"" + nexacro._encodeXml(_headband.cellwordwrap._value);
				}
				strContents += "\">\n";
				_makeCellstr(_headcells);
				strContents += "</Band>\n";
			}
			if (_bodyrows) {
				strContents += "<Band id=\"body";
				if (_bodyband.style._value.length) {
					strContents += "\" style=\"" + nexacro._encodeXml(_bodyband.style._value);
				}
				if (_bodyband.tooltiptext._value.length) {
					strContents += "\" tooltiptext=\"" + nexacro._encodeXml(_bodyband.tooltiptext._value);
				}
				if (_bodyband.tooltiptype.length && _bodyband.tooltiptype != "none") {
					strContents += "\" tooltiptype=\"" + nexacro._encodeXml(_bodyband.tooltiptype);
				}
				if (_bodyband.cellwordwrap._value != "none") {
					strContents += "\" cellwordwrap=\"" + nexacro._encodeXml(_bodyband.cellwordwrap._value);
				}
				strContents += "\">\n";
				_makeCellstr(_bodycells);
				strContents += "</Band>\n";
			}
			if (_summrows) {
				strContents += "<Band id=\"summary";
				if (_summband.style._value.length) {
					strContents += "\" style=\"" + nexacro._encodeXml(_summband.style._value);
				}
				if (_summband.tooltiptext._value.length) {
					strContents += "\" tooltiptext=\"" + nexacro._encodeXml(_summband.tooltiptext._value);
				}
				if (_summband.tooltiptype.length && _summband.tooltiptype != "none") {
					strContents += "\" tooltiptype=\"" + nexacro._encodeXml(_summband.tooltiptype);
				}
				if (_summband.cellwordwrap._value != "none") {
					strContents += "\" cellwordwrap=\"" + nexacro._encodeXml(_summband.cellwordwrap._value);
				}
				strContents += "\">\n";
				_makeCellstr(_summcells);
				strContents += "</Band>\n";
			}
			strContents += "</Format>\n";
		}
		else {
			strContents = "<Format id=\"" + this.id + "\"></Format>\n";
		}

		var contentsElem = nexacro._parseXMLDocument(strContents);
		var format_elem = contentsElem.getElementsByTagName("Format");

		if (format_elem) {
			this._formatElem = format_elem[0];
		}
		return strContents;
	};

	_pGridFormat._loadFromDOM = function (formatElem) {
		var i, j, len, cnt, bandstr, sizestr, bandtype;
		var colstr, colval, colspanstr, colspan, rowstr, rowval, rowspanstr, rowspan, attrval;
		var bandobj, cellobj, bandElem, cellElem;

		this._formatElemOrg = formatElem.cloneNode(true);

		var columns = formatElem.getElementsByTagName("Column");
		len = columns.length;

		if (len == 0) {
			columns = formatElem.getElementsByTagName("Col");

			len = columns.length;
		}
		var areaflag = 0;

		this._formatElem = formatElem;

		for (i = 0; i < len; i++) {
			var columnElem = columns[i];
			bandstr = columnElem.getAttribute("band");
			sizestr = columnElem.getAttribute("size");
			if (areaflag == 0 && bandstr == "left") {
				this._addLeftColumn(parseInt(sizestr, 10));
			}
			else if (areaflag == 2 || bandstr == "right") {
				this._addRightColumn(parseInt(sizestr, 10));
				areaflag = 2;
			}
			else {
				this._addBodyColumn(parseInt(sizestr, 10));
				areaflag = 1;
			}
		}
		this._bodyWidth = this.bodyWidth;

		this._rearrangeCols();

		var rows = formatElem.getElementsByTagName("Row");
		len = rows.length;
		for (i = 0; i < len; i++) {
			var rowElem = rows[i];
			bandstr = rowElem.getAttribute("band");
			sizestr = rowElem.getAttribute("size");
			if (bandstr == "head") {
				this._addHeadRow((parseInt(sizestr) | 0));
			}
			else if (bandstr == "summ") {
				this._addSummRow((parseInt(sizestr) | 0));
			}
			else {
				this._addBodyRow((parseInt(sizestr) | 0));
			}
		}
		this._body_height = this.bodyHeight;

		var bands = formatElem.getElementsByTagName("Band");
		len = bands.length;
		for (i = 0; i < len; i++) {
			bandElem = bands[i];
			bandtype = bandElem.getAttribute("id");
			if (bandtype == "head") {
				if (this._headband == null) {
					this._headband = new nexacro.GridBandInfo("head", "head", this, this.parent);
				}
				bandobj = this._headband;
			}
			else if (bandtype == "summary") {
				if (this._summband == null) {
					this._summband = new nexacro.GridBandInfo("summary", "summ", this, this.parent);
				}
				bandobj = this._summband;
			}
			else {
				bandtype = "body";
				if (this._bodyband == null) {
					this._bodyband = new nexacro.GridBandInfo("body", "body", this, this.parent);
				}
				bandobj = this._bodyband;
			}
			attrval = bandElem.getAttribute("style");
			if (attrval) {
				bandobj.set_style(attrval);
			}
			attrval = bandElem.getAttribute("tooltiptext");
			if (attrval) {
				bandobj.set_tooltiptext(attrval);
			}
			attrval = bandElem.getAttribute("tooltiptype");
			if (attrval) {
				bandobj.set_tooltiptype(attrval);
			}
			attrval = bandElem.getAttribute("cellwordwrap");
			if (attrval) {
				bandobj.set_cellwordwrap(attrval);
			}

			var cells = bandElem.getElementsByTagName("Cell");
			cnt = cells.length;

			var parentcellobj = null;
			var childcnt = 0;
			var idx = -1;
			var subidx = 0;

			for (j = 0; j < cnt; j++) {
				if (childcnt > 0) {
					cellobj = new nexacro.GridCellInfo(bandtype + idx + "_sub" + subidx, bandobj, this.parent, bandtype, subidx);
				}
				else {
					idx++;
					cellobj = new nexacro.GridCellInfo(bandtype + idx, bandobj, this.parent, bandtype, idx);
				}
				cellElem = cells[j];
				colstr = cellElem.getAttribute("col");
				rowstr = cellElem.getAttribute("row");
				colspanstr = cellElem.getAttribute("colspan");
				rowspanstr = cellElem.getAttribute("rowspan");
				colval = (colstr == null ? 0 : parseInt(colstr));
				rowval = (rowstr == null ? 0 : parseInt(rowstr));

				var subcells = cellElem.getElementsByTagName("Cell");

				var bandrowlen = 0;
				if (bandtype == "head" && this._headrows) {
					bandrowlen = this._headrows.length;
				}
				else if (bandtype == "summary" && this._summrows) {
					bandrowlen = this._summrows.length;
				}
				else if (bandtype == "body" && this._bodyrows) {
					bandrowlen = this._bodyrows.length;
				}

				if (rowval >= bandrowlen) {
					delete cellobj;
					continue;
				}

				colspan = (colspanstr == null ? 1 : parseInt(colspanstr));
				rowspan = (rowspanstr == null ? 1 : parseInt(rowspanstr));
				cellobj._col = colval;
				cellobj._colspan = colspan;
				cellobj._row = rowval;
				cellobj._rowspan = rowspan;
				cellobj._endcol = ((colval + colspan) == this.endbodycol);

				attrval = cellElem.getAttribute("displaytype");
				if (attrval) {
					cellobj.set_displaytype(attrval);
				}
				attrval = cellElem.getAttribute("edittype");
				if (attrval) {
					cellobj.set_edittype(attrval);
				}
				attrval = cellElem.getAttribute("style");
				if (attrval) {
					cellobj.set_style(attrval);
				}
				attrval = cellElem.getAttribute("tooltiptext");
				if (attrval) {
					cellobj.set_tooltiptext(attrval);
				}
				attrval = cellElem.getAttribute("tooltiptype");
				if (attrval) {
					cellobj.set_tooltiptype(attrval);
				}
				attrval = cellElem.getAttribute("displayexpdec");
				if (attrval) {
					cellobj.set_displayexpdec(attrval);
				}
				attrval = cellElem.getAttribute("locale");
				if (attrval) {
					cellobj.set_locale(attrval);
				}
				attrval = cellElem.getAttribute("mask");
				if (attrval) {
					cellobj.set_mask(attrval);
				}
				attrval = cellElem.getAttribute("maskchar");
				if (attrval) {
					cellobj.set_maskchar(attrval);
				}
				attrval = cellElem.getAttribute("suppress");
				if (attrval) {
					cellobj.set_suppress(attrval);
				}
				attrval = cellElem.getAttribute("suppressalign");
				if (attrval) {
					cellobj.set_suppressalign(attrval);
				}
				attrval = cellElem.getAttribute("suppressedit");
				if (attrval) {
					cellobj.set_suppressedit(attrval);
				}
				attrval = cellElem.getAttribute("wordwrap");
				if (attrval) {
					cellobj.set_wordwrap(attrval);
				}
				attrval = cellElem.getAttribute("expr");
				if (attrval) {
					cellobj.set_expr(attrval);
				}
				attrval = cellElem.getAttribute("text");
				if (attrval) {
					cellobj.set_text(attrval);
				}
				attrval = cellElem.getAttribute("subsumtext");
				if (attrval) {
					cellobj.set_subsumtext(attrval);
				}

				attrval = cellElem.getAttribute("calendardisplay");
				if (attrval) {
					cellobj.set_calendardisplay(attrval);
				}
				attrval = cellElem.getAttribute("calendardisplaynulltext");
				if (attrval) {
					cellobj.set_calendardisplaynulltext(attrval);
				}
				attrval = cellElem.getAttribute("calendardisplaynulltype");
				if (attrval) {
					cellobj.set_calendardisplaynulltype(attrval);
				}

				attrval = cellElem.getAttribute("combodataset");
				if (attrval) {
					cellobj.set_combodataset(attrval);
				}
				attrval = cellElem.getAttribute("combocodecol");
				if (attrval) {
					cellobj.set_combocodecol(attrval);
				}
				attrval = cellElem.getAttribute("combodatacol");
				if (attrval) {
					cellobj.set_combodatacol(attrval);
				}
				attrval = cellElem.getAttribute("combodisplay");
				if (attrval) {
					cellobj.set_combodisplay(attrval);
				}
				attrval = cellElem.getAttribute("combodisplaynulltext");
				if (attrval) {
					cellobj.set_combodisplaynulltext(attrval);
				}
				attrval = cellElem.getAttribute("combodisplaynulltype");
				if (attrval) {
					cellobj.set_combodisplaynulltype(attrval);
				}
				attrval = cellElem.getAttribute("combodisplayrowcount");
				if (attrval) {
					cellobj.set_combodisplayrowcount(attrval);
				}
				attrval = cellElem.getAttribute("combotype");
				if (attrval) {
					cellobj.set_combotype(attrval);
				}

				attrval = cellElem.getAttribute("editacceptsenter");
				if (attrval) {
					cellobj.set_editacceptsenter(attrval);
				}
				attrval = cellElem.getAttribute("editacceptstab");
				if (attrval) {
					cellobj.set_editacceptstab(attrval);
				}
				attrval = cellElem.getAttribute("editautoselect");
				if (attrval) {
					cellobj.set_editautoselect(attrval);
				}
				attrval = cellElem.getAttribute("editautoskip");
				if (attrval) {
					cellobj.set_editautoskip(attrval);
				}
				attrval = cellElem.getAttribute("editclipmode");
				if (attrval) {
					cellobj.set_editclipmode(attrval);
				}
				attrval = cellElem.getAttribute("editdisplay");
				if (attrval) {
					cellobj.set_editdisplay(attrval);
				}
				attrval = cellElem.getAttribute("editfilter");
				if (attrval) {
					cellobj.set_editfilter(attrval);
				}
				attrval = cellElem.getAttribute("editimemode");
				if (attrval) {
					cellobj.set_editimemode(attrval);
				}
				attrval = cellElem.getAttribute("editlimit");
				if (attrval) {
					cellobj.set_editlimit(attrval);
				}
				attrval = cellElem.getAttribute("editlengthunit");
				if (attrval) {
					cellobj.set_editlengthunit(attrval);
				}
				attrval = cellElem.getAttribute("editlimitbymask");
				if (attrval) {
					cellobj.set_editlimitbymask(attrval);
				}
				attrval = cellElem.getAttribute("editscrollbar");
				if (attrval) {
					cellobj.set_editscrollbar(attrval);
				}
				attrval = cellElem.getAttribute("edittrimtype");
				if (attrval) {
					cellobj.set_edittrimtype(attrval);
				}
				attrval = cellElem.getAttribute("edituseime");
				if (attrval) {
					cellobj.set_edituseime(attrval);
				}

				attrval = cellElem.getAttribute("treecheck");
				if (attrval) {
					cellobj.set_treecheck(attrval);
				}
				attrval = cellElem.getAttribute("treecollapseimage");
				if (attrval) {
					cellobj.set_treecollapseimage(attrval);
				}
				attrval = cellElem.getAttribute("treeexpandimage");
				if (attrval) {
					cellobj.set_treeexpandimage(attrval);
				}
				attrval = cellElem.getAttribute("treeitemimage");
				if (attrval) {
					cellobj.set_treeitemimage(attrval);
				}
				attrval = cellElem.getAttribute("treeitemmargin");
				if (attrval) {
					cellobj.set_treeitemmargin(attrval);
				}
				attrval = cellElem.getAttribute("treelevel");
				if (attrval) {
					cellobj.set_treelevel(attrval);
				}
				attrval = cellElem.getAttribute("treestartlevel");
				if (attrval) {
					cellobj.set_treestartlevel(attrval);
				}
				attrval = cellElem.getAttribute("treestate");
				if (attrval) {
					cellobj.set_treestate(attrval);
				}

				attrval = cellElem.getAttribute("expandchar");
				if (attrval) {
					cellobj.set_expandchar(attrval);
				}
				attrval = cellElem.getAttribute("expandimage");
				if (attrval) {
					cellobj.set_expandimage(attrval);
				}
				attrval = cellElem.getAttribute("expandshow");
				if (attrval) {
					cellobj.set_expandshow(attrval);
				}
				attrval = cellElem.getAttribute("expandsize");
				if (attrval) {
					cellobj.set_expandsize(attrval);
				}

				attrval = cellElem.getAttribute("autosizecol");
				if (attrval) {
					cellobj.set_autosizecol(attrval);
				}
				attrval = cellElem.getAttribute("autosizerow");
				if (attrval) {
					cellobj.set_autosizerow(attrval);
				}

				attrval = cellElem.getAttribute("celltype");
				if (attrval) {
					cellobj.set_celltype(attrval);
				}

				attrval = cellElem.getAttribute("cssclass");
				if (attrval) {
					cellobj.set_cssclass(attrval);
				}

				if (childcnt > 0) {
					cellobj._isSubCell = true;
					parentcellobj._subcells.push(cellobj);
					childcnt--;
					subidx++;
				}
				else {
					subidx = 0;
					if (subcells.length > 0) {
						childcnt = subcells.length;
						parentcellobj = cellobj;
					}
					else {
						parentcellobj = null;
					}
					if (bandtype == "head") {
						this._addHeadCell(cellobj);
					}
					else if (bandtype == "summary") {
						this._addSummCell(cellobj);
					}
					else {
						this._addBodyCell(cellobj);
					}
				}
			}
		}
		this._bodycells = this._sortCellIdx(this._bodycells, this._bodyrows);
		this._headcells = this._sortCellIdx(this._headcells, this._headrows);
		this._summcells = this._sortCellIdx(this._summcells, this._summrows);
	};

	_pGridFormat._sortCellIdx = function (cells, rows) {
		if (!cells || !rows) {
			return null;
		}

		var newcells = [];
		var cellsLen = cells.length;
		var rowsLen = rows.length;
		var idx = 0;

		for (var i = 0; i < rowsLen; i++) {
			for (var j = 0; j < cellsLen; j++) {
				if (cells[j]._row == i) {
					cells[j]._cellidx = idx++;
					newcells.push(cells[j]);
				}
			}
		}
		return newcells;
	};

	_pGridFormat._adjustColSizing = function (idx, movepos) {
		if (movepos != 0) {
			var len = this._cols.length;

			if (len == 0 && !this._cols[idx]) {
				return false;
			}

			var area = this._cols[idx]._area;

			if (area == "body") {
				this.bodyWidth = this._bodyWidth = this._bodyWidth + movepos;
			}
			else if (area == "left") {
				this.leftWidth += movepos;
			}
			else {
				this.rightWidth += movepos;
			}

			var col;
			var pos = 0;

			for (var i = 0; i < len; i++) {
				if (i < idx) {
					continue;
				}
				else if (i == idx) {
					col = this._cols[i];
					if (col._area != area) {
						continue;
					}

					col.right += movepos;
					col.size += movepos;
				}
				else {
					col = this._cols[i];
					if (col._area != area) {
						continue;
					}

					col.left += movepos;
					col.right += movepos;
				}
			}
			this._updateFormatStr();
			return true;
		}
		return false;
	};

	_pGridFormat._adjustColWidth = function (bodywidth, autofitcol_rate) {
		if (bodywidth == 0) {
			return false;
		}

		var retn = false;
		if (this._bodyWidth != bodywidth) {
			retn = true;
		}

		this._bodyWidth = bodywidth;
		var factor = bodywidth / this.bodyWidth;
		this.bodyWidth = this._bodyWidth;
		var len = this._cols.length;
		var col, bodylastcol;
		var pos = 0;
		var tot = 0;

		if (!autofitcol_rate.length) {
			for (var i = 0; i < len; i++) {
				col = this._cols[i];
				if (col._area != "body") {
					continue;
				}

				col.left = pos;
				col.size *= factor;
				col.size = Math.round(col.size);
				autofitcol_rate[i] = col.size / bodywidth;
				tot += col.size;

				pos = pos + col.size;
				col.right = pos;
				bodylastcol = col;
			}
		}
		else {
			for (var i = 0; i < len; i++) {
				col = this._cols[i];
				if (col._area != "body") {
					continue;
				}

				col.left = pos;
				col.size = Math.round(bodywidth * autofitcol_rate[i]);
				tot += col.size;
				pos = pos + col.size;
				col.right = pos;
				bodylastcol = col;
			}
		}

		if (bodylastcol) {
			bodylastcol.size += (bodywidth - tot);
			bodylastcol.right += (bodywidth - tot);
		}
		return retn;
	};

	_pGridFormat._adjustRowHeight = function (bodyheight) {
		if (bodyheight == 0) {
			bodyheight = 0.1;
		}

		if (this._body_height != bodyheight) {
			this._body_height = bodyheight;
			var factor = bodyheight / this.bodyHeight;
			this.bodyHeight = this._body_height;

			if (!this._rows) {
				return true;
			}

			var len = this._rows.length;
			var row;
			var pos = 0;

			for (var i = 0; i < len; i++) {
				row = this._rows[i];
				if (row._area != "body") {
					continue;
				}

				row.top = pos;
				row.size = (row.size * factor);

				pos = pos + row.size;
				row.bottom = pos;
			}
			return true;
		}
		return false;
	};

	_pGridFormat._defaultColSize = 40;
	_pGridFormat._appendContentsCol = function (bandtype, bandobj, bandcells, bandrows, addfunc, col) {
		var cellsize = (bandcells) ? bandcells.length : 0;
		var rowsize = (bandrows) ? bandrows.length : 0;
		var cellobj = null;

		for (var i = 0; i < cellsize; i++) {
			bandcells[i]._endcol = false;

			if (bandcells[i]._col >= col) {
				bandcells[i]._col++;
			}
		}

		for (var i = 0; i < rowsize; i++) {
			cellobj = new nexacro.GridCellInfo(bandtype + cellsize, bandobj, this.parent, bandtype, cellsize);
			cellobj.celltype = bandtype;
			cellobj._col = col;
			cellobj._colspan = 1;
			cellobj._row = i;
			cellobj._rowspan = 1;
			this[addfunc](cellobj);
			cellsize++;
		}
		bandcells[bandcells.length - 1]._endcol = true;

		this._arrangeCellIdx(bandtype);
		this._updateFormatStr();
	};

	_pGridFormat._arrangeCellIdx2 = function (bandcells, rowsize) {
		var j = 0;
		var cellobj;
		var cells = [];

		for (var k = 0; k < rowsize; k++) {
			for (var i = 0; i < bandcells.length; i++) {
				cellobj = bandcells[i];

				if (k == cellobj._row) {
					cellobj._cellidx = j;
					cells[j++] = cellobj;
					bandcells.splice(i, 1);
					i--;
				}
			}
		}
		return cells;
	};

	_pGridFormat._arrangeCellIdx = function (band) {
		var bandcells = this._bodycells;
		var bandrows = this._bodyrows;

		if (band == "body") {
			bandcells = this._bodycells;
			bandrows = this._bodyrows;
		}
		else if (band == "summ" || band == "summary") {
			bandcells = this._summcells;
			bandrows = this._summrows;
		}
		else if (band == "head") {
			bandcells = this._headcells;
			bandrows = this._headrows;
		}

		var rowsize = (bandrows) ? bandrows.length : 0;
		var cells = this._arrangeCellIdx2(bandcells, rowsize);

		if (band == "body") {
			this._bodycells = cells;
		}
		else if (band == "summ" || band == "summary") {
			this._summcells = cells;
		}
		else if (band == "head") {
			this._headcells = cells;
		}
	};

	_pGridFormat.appendContentsCol = function (strBand, bBandAppend) {
		var areatype = "body";

		if (bBandAppend == undefined) {
			bBandAppend = true;
		}

		bBandAppend = nexacro._toBoolean(bBandAppend);

		if (bBandAppend == false) {
			var rightcnt = this._getColFixCnt("right");
			if (rightcnt) {
				areatype = "right";
			}
			else {
				areatype = "body";
			}
		}
		else {
			if (strBand) {
				var areaidx = parseInt(strBand, 10);
				if (isFinite(areaidx)) {
					if (areaidx == -1) {
						areatype = "left";
					}
					else if (areaidx == -2) {
						areatype = "right";
					}
					else {
						areatype = "body";
					}
				}
				else if (strBand.length) {
					areatype = strBand.toLowerCase();
				}
			}
		}

		var col = this._cols.length;
		var colSize = this._defaultColSize;

		if (areatype == "left") {
			col = this._getColFixCnt("left");
			this._addLeftColumn(colSize);
		}
		else if (areatype == "right") {
			col = this._cols.length;
			this._addRightColumn(colSize);
		}
		else {
			col = this._getColFixCnt("left");
			col += this._getColFixCnt("body");
			this._addBodyColumn(colSize);
			this.endbodycol = this._cols.length;
		}

		if (this._bodyband) {
			var bandtype = "body";
			var bandobj = this._bodyband;
			var bandcells = this._bodycells;
			var bandrows = this._bodyrows;
			var addfunc = "_addBodyCell";
			this._appendContentsCol(bandtype, bandobj, bandcells, bandrows, addfunc, col);
		}

		if (this._headband) {
			bandtype = "head";
			bandobj = this._headband;
			bandcells = this._headcells;
			bandrows = this._headrows;
			addfunc = "_addHeadCell";
			this._appendContentsCol(bandtype, bandobj, bandcells, bandrows, addfunc, col);
		}

		if (this._summband) {
			bandtype = "summary";
			bandobj = this._summband;
			bandcells = this._summcells;
			bandrows = this._summrows;
			addfunc = "_addSummCell";
			this._appendContentsCol(bandtype, bandobj, bandcells, bandrows, addfunc, col);
		}
		this._rearrangeCols();
		return col;
	};

	_pGridFormat._moveContentsCol = function (bandtype, bandcells, fromcol, tocol, colspan1, colspan2) {
		if (!bandcells) {
			return;
		}

		var bandcellsLen = bandcells.length;
		var endcol = (this._cols) ? (this._cols.length - 1) : -1;
		var cellobj, _col;

		var areaInfos = {
		};
		var colIdx, fromIdx, toIdx;


		for (var i = 0; i < bandcellsLen; i++) {
			cellobj = bandcells[i];
			colIdx = cellobj._col;

			if (colIdx == fromcol) {
				fromIdx = colIdx;
			}
			if (colIdx == tocol) {
				toIdx = colIdx;
			}

			areaInfos[colIdx] = cellobj._area;
		}

		for (var i = 0; i < bandcellsLen; i++) {
			cellobj = bandcells[i];
			_col = cellobj._col;

			if (cellobj._orgcol == undefined) {
				cellobj._orgcol = _col;
			}

			if (_col == fromcol) {
				cellobj._area = areaInfos[tocol];
				cellobj._col = tocol;
			}
			else {
				if (fromcol < tocol) {
					if (_col > fromcol && _col <= tocol) {
						cellobj._col--;
					}
				}
				else {
					if (_col < fromcol && _col >= tocol) {
						cellobj._col++;
					}
				}
			}

			if (cellobj._col == endcol) {
				cellobj._endcol = true;
			}
			else {
				cellobj._endcol = false;
			}
		}

		this._arrangeCellIdx(bandtype);
		this._updateFormatStr();
	};

	_pGridFormat._reIndexCells = function (cells, rows) {
		if (!cells || !rows) {
			return;
		}

		var rowslen = rows.length;
		var cellslen = cells.length;

		var i = 0, j = 0, k = 0;
		var tmp = [], tmp2 = [];

		for (i = 0; i < rowslen; i++) {
			tmp = [];
			k = 0;
			for (j = 0; j < cellslen; j++) {
				if (cells[j]._row == i) {
					tmp[k++] = cells[j];
				}
			}
			tmp.sort(function (a, b) {
				return a._col - b._col;
			});
			tmp2 = tmp2.concat(tmp);
		}

		for (i = 0; i < cellslen; i++) {
			tmp2[i]._cellidx = i;
		}
		return tmp2;
	};

	_pGridFormat._insertContentsCol = function (bandtype, bandobj, bandcells, bandrows, addfunc, insertidx) {
		var col = insertidx;
		var cellsize = bandcells.length;
		var rowsize = bandrows.length;
		var cellobj = null;
		var mergecells = [];

		for (var i = 0; i < cellsize; i++) {
			cellobj = bandcells[i];

			if (cellobj._col < insertidx && (cellobj._col + cellobj._colspan - 1) >= insertidx) {
				mergecells.push(cellobj);
			}
		}

		var mergecell;
		if (mergecells.length > 0) {
			for (var i = 0; i < mergecells.length; i++) {
				mergecell = mergecells[i];
				mergecell._colspan++;

				if (mergecell._subcells.length > 0) {
					var subcol = col - mergecell._col;
					cellobj = new nexacro.GridCellInfo(bandtype + cellsize + "_sub" + subcol, bandobj, this.parent, bandtype, mergecell._subcells.length);
					cellobj.celltype = bandtype;
					cellobj._col = subcol;
					cellobj._colspan = 1;
					cellobj._row = 0;
					cellobj._rowspan = 1;
					cellobj._isSubCell = true;
					this._insertCell(mergecell._subcells, cellobj, subcol, 0);
				}

				for (var j = 0; j < cellsize; j++) {
					cellobj = bandcells[j];

					if (cellobj._col >= insertidx && cellobj._row == mergecell._row) {
						cellobj._col++;
					}
				}
			}
		}

		for (var i = 0; i < rowsize; i++) {
			for (var j = 0; j < mergecells.length; j++) {
				mergecell = mergecells[j];
				if (mergecell._row == i) {
					break;
				}
			}

			if (mergecell && mergecell._row == i) {
				continue;
			}

			cellobj = new nexacro.GridCellInfo(bandtype + cellsize, bandobj, this.parent, bandtype, cellsize);
			cellobj.celltype = bandtype;
			cellobj._col = col;
			cellobj._colspan = 1;
			cellobj._row = i;
			cellobj._rowspan = 1;
			this[addfunc](cellobj, col, i);
			cellsize++;
		}

		var endcol = (this._cols) ? (this._cols.length - 1) : -1;

		cellsize = bandcells.length;
		for (var i = 0; i < cellsize; i++) {
			cellobj = bandcells[i];

			if (cellobj._col == endcol) {
				cellobj._endcol = true;
			}
			else {
				cellobj._endcol = false;
			}
		}
		this._arrangeCellIdx(bandtype);
		this._updateFormatStr();
	};

	_pGridFormat.insertContentsCol = function (strBand, nColIndex, bBandAppend) {
		var areatype = "body";

		if (bBandAppend == undefined) {
			bBandAppend = true;
		}

		bBandAppend = nexacro._toBoolean(bBandAppend);

		var lcnt = this._getColFixCnt("left");
		var bcnt = this._getColFixCnt("body");
		var rcnt = this._getColFixCnt("right");

		if (strBand != undefined) {
			var areaidx = parseInt(strBand, 10);

			if (isFinite(areaidx)) {
				if (nColIndex != undefined) {
					if (areaidx == -1) {
						areatype = "left";
					}
					else if (areaidx == -2) {
						areatype = "right";
					}
					else {
						areatype = "body";
					}

					if (nColIndex < 0) {
						nColIndex = 0;
					}

					if (bBandAppend) {
						if (areatype == "body") {
							nColIndex += lcnt;
						}
						else if (areatype == "right") {
							nColIndex += lcnt;
							nColIndex += bcnt;
						}

						if (areatype == "left") {
							if (nColIndex > lcnt) {
								nColIndex = lcnt;
							}
						}
						else if (areatype == "body") {
							if (nColIndex > lcnt + bcnt) {
								nColIndex = lcnt + bcnt;
							}
						}
						else {
							if (nColIndex > lcnt + bcnt + rcnt) {
								nColIndex = lcnt + bcnt + rcnt;
							}
						}
					}
					else {
						if (nColIndex > this._cols.length) {
							nColIndex = this._cols.length;
						}

						if (nColIndex < lcnt) {
							areatype = "left";
						}
						else if (nColIndex >= lcnt + bcnt && nColIndex < lcnt + bcnt + rcnt) {
							areatype = "right";
						}
						else {
							areatype = "body";
						}
					}
				}
				else {
					if (areaidx < 0) {
						areaidx = 0;
					}
					else if (areaidx > this._cols.length) {
						areaidx = this._cols.length;
					}

					nColIndex = areaidx;
				}
			}
			else if (strBand.length) {
				areatype = strBand.toLowerCase();

				if (nColIndex == undefined) {
					return -1;
				}
				else if (nColIndex < 0) {
					nColIndex = 0;
				}

				if (bBandAppend) {
					if (areatype == "body") {
						nColIndex += lcnt;
					}
					else if (areatype == "right") {
						nColIndex += lcnt;
						nColIndex += bcnt;
					}

					if (areatype == "left") {
						if (nColIndex > lcnt) {
							nColIndex = lcnt;
						}
					}
					else if (areatype == "body") {
						if (nColIndex > lcnt + bcnt) {
							nColIndex = lcnt + bcnt;
						}
					}
					else {
						if (nColIndex > lcnt + bcnt + rcnt) {
							nColIndex = lcnt + bcnt + rcnt;
						}
					}
				}
				else {
					if (nColIndex > this._cols.length) {
						nColIndex = this._cols.length;
					}

					if (nColIndex < lcnt) {
						areatype = "left";
					}
					else if (nColIndex >= lcnt + bcnt && nColIndex < lcnt + bcnt + rcnt) {
						areatype = "right";
					}
					else {
						areatype = "body";
					}
				}
			}
		}

		var colSize = this._defaultColSize;

		if (areatype == "left") {
			this._insertLeftColumn(colSize, nColIndex);
		}
		else if (areatype == "right") {
			this._insertRightColumn(colSize, nColIndex);
		}
		else {
			this._insertBodyColumn(colSize, nColIndex);
			this.endbodycol = this._cols.length;
		}

		if (this._bodyband) {
			var bandtype = "body";
			var bandobj = this._bodyband;
			var bandcells = this._bodycells;
			var bandrows = this._bodyrows;
			var addfunc = "_insertBodyCell";
			this._insertContentsCol(bandtype, bandobj, bandcells, bandrows, addfunc, nColIndex);
		}

		if (this._headband) {
			bandtype = "head";
			bandobj = this._headband;
			bandcells = this._headcells;
			bandrows = this._headrows;
			addfunc = "_insertHeadCell";
			this._insertContentsCol(bandtype, bandobj, bandcells, bandrows, addfunc, nColIndex);
		}

		if (this._summband) {
			bandtype = "summary";
			bandobj = this._summband;
			bandcells = this._summcells;
			bandrows = this._summrows;
			addfunc = "_insertSummCell";
			this._insertContentsCol(bandtype, bandobj, bandcells, bandrows, addfunc, nColIndex);
		}
		this._rearrangeCols();
		return nColIndex;
	};

	_pGridFormat._defaultRowSize = 24;
	_pGridFormat._appendContentsRow = function (bandtype, bandobj, bandcells, bandrows, rowfunc, addfunc) {
		var row = (bandrows) ? bandrows.length : 0;
		var rowSize = this._defaultRowSize;
		this[rowfunc](rowSize);
		var cellsize = (bandcells) ? bandcells.length : 0;
		var colsize = this._cols.length;
		var cellobj = null;

		if (colsize == 0) {
			this._addBodyColumn(this._defaultColSize);
			colsize = this._cols.length;
		}

		for (var i = 0; i < colsize; i++) {
			cellobj = new nexacro.GridCellInfo(bandtype + cellsize, bandobj, this.parent, bandtype, cellsize);
			cellobj.celltype = bandtype;
			cellobj._col = i;
			cellobj._colspan = 1;
			cellobj._row = row;
			cellobj._rowspan = 1;
			cellobj._endcol = ((i + 1) == this.endbodycol);
			this[addfunc](cellobj);
			cellsize++;
		}
		this._updateFormatStr();
		return row;
	};

	_pGridFormat.appendContentsRow = function (strBand, bBandAppend) {
		var bandtype = "";

		if (strBand != undefined) {
			var bandidx = parseInt(strBand, 10);
			if (isFinite(bandidx)) {
				if (bandidx == -1) {
					bandtype = "head";
				}
				else if (bandidx == -2) {
					bandtype = "summ";
				}
				else if (bandidx >= 0) {
					bandtype = "body";
				}
			}
			else if (strBand.length) {
				bandtype = strBand.toLowerCase();
			}

			if (bandtype == "") {
				return -1;
			}
		}

		var row = -1;

		if (bandtype == "head") {
			if (this._headband == null) {
				this._headband = new nexacro.GridBandInfo("head", "head", this, this.parent);
			}

			var bandobj = this._headband;
			var bandcells = this._headcells;
			var bandrows = this._headrows;
			var rowfunc = "_addHeadRow";
			var addfunc = "_addHeadCell";
			row = this._appendContentsRow("head", bandobj, bandcells, bandrows, rowfunc, addfunc);
		}
		else if (bandtype == "summ" || bandtype == "summary") {
			if (this._summband == null) {
				this._summband = new nexacro.GridBandInfo("summary", "summ", this, this.parent);
			}

			var bandobj = this._summband;
			var bandcells = this._summcells;
			var bandrows = this._summrows;
			var rowfunc = "_addSummRow";
			var addfunc = "_addSummCell";
			row = this._appendContentsRow("summary", bandobj, bandcells, bandrows, rowfunc, addfunc);
		}
		else if (bandtype == "body") {
			if (this._bodyband == null) {
				this._bodyband = new nexacro.GridBandInfo("body", "body", this, this.parent);
			}

			var bandobj = this._bodyband;
			var bandcells = this._bodycells;
			var bandrows = this._bodyrows;
			var rowfunc = "_addBodyRow";
			var addfunc = "_addBodyCell";
			row = this._appendContentsRow("body", bandobj, bandcells, bandrows, rowfunc, addfunc);
		}

		return row;
	};

	_pGridFormat._deleteRowCell = function (band, row) {
		var cells = this._bodycells;

		if (band == "head") {
			cells = this._headcells;
		}
		else if (band == "summ") {
			cells = this._summcells;
		}
		if (cells == null || cells.length == 0) {
			return undefined;
		}

		var colspan, rowspan;

		for (var i = 0; i < cells.length; i++) {
			if (cells[i]._row == row) {
				colspan = cells[i]._colspan;
				rowspan = cells[i]._rowspan;

				if (rowspan == 1) {
					delete cells[i];
					cells.splice(i, 1);
					i--;
				}
				else {
					var subcells = cells[i]._subcells;
					var subcell;

					for (var j = 0; j < subcells.length; j++) {
						subcell = subcells[j];
						if (subcell._row + cells[i]._row == row) {
							delete subcell;
							subcells.splice(j, 1);
							for (var k = j; k < subcells.length; k++) {
								subcells[k]._cellidx--;
							}
							j--;
						}
						else if (subcell._row + cells[i]._row > row) {
							subcell._row--;
						}
						else if (subcell._row + cells[i]._row < row && (subcell._row + cells[i]._row + subcell._rowspan - 1) >= row) {
							subcell._rowspan--;
						}
					}
					cells[i]._rowspan--;
				}
			}
			else if (cells[i]._row > row) {
				cells[i]._row--;
			}
			else {
				if ((cells[i]._row + cells[i]._rowspan - 1) >= row) {
					var subcells = cells[i]._subcells;
					var subcell;

					for (var j = 0; j < subcells.length; j++) {
						subcell = subcells[j];
						if (subcell._row + cells[i]._row == row) {
							delete subcell;
							subcells.splice(j, 1);
							for (var k = j; k < subcells.length; k++) {
								subcells[k]._cellidx--;
							}
							j--;
						}
						else if (subcell._row + cells[i]._row > row) {
							subcell._row--;
						}
						else if (subcell._row + cells[i]._row < row && (subcell._row + cells[i]._row + subcell._rowspan - 1) >= row) {
							subcell._rowspan--;
						}
					}
					cells[i]._rowspan--;
				}
			}
		}
		this._arrangeCellIdx(band);
		this._updateFormatStr();
	};

	_pGridFormat._deleteRow = function (band, row) {
		band = band.toLowerCase();
		this._deleteRowCell(band, row);

		var rows = this._bodyrows;

		if (band == "head") {
			rows = this._headrows;
		}
		else if (band == "summ") {
			rows = this._summrows;
		}

		if (rows == null || rows.length == 0 || rows.length <= row) {
			return -1;
		}

		var size = rows[row].size;
		rows.splice(row, 1);

		var rowsLen = rows.length;
		for (var i = row; i < rowsLen; i++) {
			rows[i].top -= size;
			rows[i].bottom -= size;
		}
		if (band == "head") {
			this.headHeight -= size;
		}
		else if (band == "summ") {
			this.summHeight -= size;
		}
		else {
			this._body_height = this.bodyHeight -= size;
		}

		this._updateFormatStr(band);
		return row;
	};

	_pGridFormat.deleteContentsRow = function (strBand, nSubRowIndex, bBandIndex) {
		var bandtype = "";

		if (bBandIndex == undefined) {
			bBandIndex = true;
		}

		if (strBand != undefined) {
			var bandidx = parseInt(strBand, 10);
			if (isFinite(bandidx)) {
				if (bandidx == -1) {
					bandtype = "head";
				}
				else if (bandidx == -2) {
					bandtype = "summ";
				}
				else if (bandidx >= 0) {
					bandtype = "body";
				}
			}
			else if (strBand.length) {
				bandtype = strBand.toLowerCase();
			}

			if (bandtype == "") {
				return -1;
			}
		}

		return this._deleteRow(bandtype, nSubRowIndex);
	};

	_pGridFormat._insertContentsRow = function (bandtype, bandobj, bandcells, bandrows, rowfunc, addfunc, insertidx) {
		var rowSize = this._defaultRowSize;
		this[rowfunc](insertidx, rowSize);
		var cellsize = (bandcells) ? bandcells.length : 0;
		var colsize = this._cols.length;
		var cellobj = null;

		if (colsize == 0) {
			this._addBodyColumn(this._defaultColSize);
			colsize = this._cols.length;
		}

		var mergecells = [];
		for (var i = 0; i < cellsize; i++) {
			cellobj = bandcells[i];

			if (cellobj._row < insertidx) {
				if ((cellobj._row + cellobj._rowspan - 1) >= insertidx) {
					mergecells.push(cellobj);
				}
			}
			else {
				cellobj._row++;
			}
		}

		if (mergecells.length > 0) {
			var mergecell, subcells;

			for (var i = 0; i < mergecells.length; i++) {
				mergecell = mergecells[i];
				subcells = mergecell._subcells;
				mergecell._rowspan++;

				if (subcells.length) {
					for (var j = 0; j < subcells.length; j++) {
						if (subcells[j]._row >= insertidx - mergecell._row) {
							subcells[j]._row++;
						}
					}

					for (var j = mergecell._col; j < mergecell._col + mergecell._colspan; j++) {
						cellobj = new nexacro.GridCellInfo(bandtype + mergecell._cellidx + "_sub" + subcells.length, bandobj, this.parent, bandtype, subcells.length);
						cellobj.celltype = bandtype;
						cellobj._col = j;
						cellobj._colspan = 1;
						cellobj._row = insertidx - mergecell._row;
						cellobj._rowspan = 1;
						cellobj._endcol = ((j + 1) == this.endbodycol);
						this._addCell(subcells, cellobj);
					}
					mergecell._subcells = this._arrangeCellIdx2(subcells, mergecell._rowspan);
				}
			}

			for (var i = (mergecell._col + mergecell._colspan); i < colsize; i++) {
				cellobj = new nexacro.GridCellInfo(bandtype + cellsize, bandobj, this.parent, bandtype, cellsize);
				cellobj.celltype = bandtype;
				cellobj._col = i;
				cellobj._colspan = 1;
				cellobj._row = insertidx;
				cellobj._rowspan = 1;
				cellobj._endcol = ((i + 1) == this.endbodycol);
				this[addfunc](cellobj);
				cellsize++;
			}
		}
		else {
			for (var i = 0; i < colsize; i++) {
				cellobj = new nexacro.GridCellInfo(bandtype + cellsize, bandobj, this.parent, bandtype, cellsize);
				cellobj.celltype = bandtype;
				cellobj._col = i;
				cellobj._colspan = 1;
				cellobj._row = insertidx;
				cellobj._rowspan = 1;
				cellobj._endcol = ((i + 1) == this.endbodycol);
				this[addfunc](cellobj);
				cellsize++;
			}
		}
		this._arrangeCellIdx(bandtype);
		this._updateFormatStr();
		return insertidx;
	};

	_pGridFormat.insertContentsRow = function (strBand, nSubRowIndex, bBandIndex) {
		var bandtype = "";

		if (bBandIndex == undefined) {
			bBandIndex = true;
		}

		if (strBand != undefined) {
			var bandidx = parseInt(strBand, 10);
			if (isFinite(bandidx)) {
				if (bandidx == -1) {
					bandtype = "head";
				}
				else if (bandidx == -2) {
					bandtype = "summ";
				}
				else if (bandidx >= 0) {
					bandtype = "body";
				}
			}
			else if (strBand.length) {
				bandtype = strBand.toLowerCase();
			}

			if (bandtype == "") {
				return -1;
			}
		}

		var row = -1;

		if (nSubRowIndex < 0) {
			return -1;
		}

		if (bandtype == "head") {
			if (this._headband == null) {
				this._headband = new nexacro.GridBandInfo("head", "head", this, this.parent);
			}

			var bandobj = this._headband;
			var bandcells = this._headcells;
			var bandrows = this._headrows;
			var rowfunc = "_insertHeadRow";
			var addfunc = "_addHeadCell";

			if (nSubRowIndex > bandrows.length) {
				nSubRowIndex = bandrows.length;
			}

			row = this._insertContentsRow("head", bandobj, bandcells, bandrows, rowfunc, addfunc, nSubRowIndex);
		}
		else if (bandtype == "summ" || bandtype == "summary") {
			if (this._summband == null) {
				this._summband = new nexacro.GridBandInfo("summary", "summ", this, this.parent);
			}

			var bandobj = this._summband;
			var bandcells = this._summcells;
			var bandrows = this._summrows;
			var rowfunc = "_insertSummRow";
			var addfunc = "_addSummCell";

			if (nSubRowIndex > bandrows.length) {
				nSubRowIndex = bandrows.length;
			}

			row = this._insertContentsRow("summary", bandobj, bandcells, bandrows, rowfunc, addfunc, nSubRowIndex);
		}
		else {
			if (this._bodyband == null) {
				this._bodyband = new nexacro.GridBandInfo("body", "body", this, this.parent);
			}

			var bandobj = this._bodyband;
			var bandcells = this._bodycells;
			var bandrows = this._bodyrows;
			var rowfunc = "_insertBodyRow";
			var addfunc = "_addBodyCell";

			if (nSubRowIndex > bandrows.length) {
				nSubRowIndex = bandrows.length;
			}

			row = this._insertContentsRow("body", bandobj, bandcells, bandrows, rowfunc, addfunc, nSubRowIndex);
		}

		return row;
	};

	_pGridFormat._deleteColCell = function (col) {
		var hcells = this._headcells;
		var scells = this._summcells;
		var bcells = this._bodycells;
		var endcol = (this._cols) ? (this._cols.length - 1) : -1;

		if (!hcells && !scells && !bcells) {
			return undefined;
		}

		var delproc = function (cells, col) {
			if (!cells) {
				return;
			}

			for (var i = 0; i < cells.length; i++) {
				if (cells[i]._col == endcol) {
					cells[i]._endcol = true;
				}
				else {
					cells[i]._endcol = false;
				}

				if (cells[i]._col == col) {
					var colspan = cells[i]._colspan;
					var rowspan = cells[i]._rowspan;

					if (colspan == 1) {
						delete cells[i];
						cells.splice(i, 1);
						for (var j = i; j < cells.length; j++) {
							cells[j]._cellidx--;
						}
						i--;
					}
					else {
						var col = cells[i]._col;
						cells[i]._colspan--;

						delproc(cells[i]._subcells, 0);
					}
				}
				else if (cells[i]._col > col) {
					cells[i]._col--;
				}
				else {
					if ((cells[i]._col + cells[i]._colspan - 1) >= col) {
						cells[i]._colspan--;

						var idx = col - cells[i]._col;
						delproc(cells[i]._subcells, idx);
					}
				}
			}
		};
		delproc(hcells, col);
		delproc(scells, col);
		delproc(bcells, col);
	};

	_pGridFormat._deleteColumn = function (area, col) {
		var cols = this._cols;

		if (cols == null || cols.length == 0 || cols.length <= col) {
			return -1;
		}

		if (cols[col]._area != area) {
			return -1;
		}

		this._deleteColCell(col);
		var size = cols[col].size;
		cols.splice(col, 1);

		var colsLen = cols.length;

		if (area == "left") {
			for (var i = col; i < colsLen; i++) {
				if (cols[i]._area == "left") {
					cols[i].left -= size;
					cols[i].right -= size;
				}
			}
			this.leftWidth -= size;
		}
		else if (area == "right") {
			for (var i = col; i < colsLen; i++) {
				if (cols[i]._area == "right") {
					cols[i].left -= size;
					cols[i].right -= size;
				}
			}
			this.rightWidth -= size;
		}
		else {
			for (var i = col; i < colsLen; i++) {
				if (cols[i]._area == "body") {
					cols[i].left -= size;
					cols[i].right -= size;
				}
			}
			this.bodyWidth -= size;
			this._bodyWidth = this.bodyWidth;
			this.endbodycol = this._cols.length;
		}
		this._updateFormatStr();
		return col;
	};

	_pGridFormat._getColFixCnt = function (area) {
		var leftcnt = 0;
		var bodycnt = 0;
		var rightcnt = 0;
		var _cols = this._cols;
		var _colsLen = _cols.length;

		for (var i = 0; i < _colsLen; i++) {
			if (_cols[i]._area == "left") {
				leftcnt++;
			}
			else if (_cols[i]._area == "body") {
				bodycnt++;
			}
			else if (_cols[i]._area == "right") {
				rightcnt++;
			}
		}
		if (area == "left") {
			return leftcnt;
		}
		else if (area == "right") {
			return rightcnt;
		}
		else {
			return bodycnt;
		}
	};

	_pGridFormat.deleteContentsCol = function (strBand, nColIndex, bBandIndex) {
		if (bBandIndex == undefined) {
			bBandIndex = false;
		}

		var areatype = "body";
		if (strBand != undefined) {
			var areaidx = parseInt(strBand, 10);
			if (isFinite(areaidx)) {
				if (nColIndex != undefined) {
					if (areaidx == -1) {
						areatype = "left";
					}
					else if (areaidx == -2) {
						areatype = "right";
					}
					else {
						areatype = "body";
					}

					if (nColIndex < 0) {
						return -1;
					}
					else if (nColIndex > this._cols.length) {
						return -1;
					}
				}
				else {
					if (areaidx < 0) {
						return -1;
					}
					else if (areaidx > this._cols.length) {
						return -1;
					}

					nColIndex = areaidx;
				}
			}
			else if (strBand.length) {
				areatype = strBand.toLowerCase();
				if (nColIndex == undefined) {
					return -1;
				}
			}
		}

		if (bBandIndex == true) {
			if (areatype == "body") {
				nColIndex += this._getColFixCnt("left");
			}
			else if (areatype == "right") {
				nColIndex += this._getColFixCnt("left");
				nColIndex += this._getColFixCnt("body");
			}
		}
		else {
			var lcnt = this._getColFixCnt("left");
			var bcnt = this._getColFixCnt("body");
			var rcnt = this._getColFixCnt("right");

			if (nColIndex < lcnt) {
				areatype = "left";
			}
			else if (nColIndex >= lcnt + bcnt && nColIndex < lcnt + bcnt + rcnt) {
				areatype = "right";
			}
			else {
				areatype = "body";
			}
		}

		if (this._cols.length <= nColIndex || nColIndex < 0) {
			return -1;
		}

		var retn = this._deleteColumn(areatype, nColIndex);
		this._rearrangeCols();
		return retn;
	};

	_pGridFormat.mergeContentsCell = function (strBand, nStartRow, nStartCol, nEndRow, nEndCol, nFirstCell, bKeepSubCell) {
		var bandtype = strBand.toLowerCase();
		if (bandtype != "head" && bandtype != "summ") {
			if (bandtype == "summary") {
				bandtype = "summ";
			}
			else {
				bandtype = "body";
			}
		}

		var startRow = parseInt(nStartRow, 10);
		var startCol = parseInt(nStartCol, 10);
		var endRow = parseInt(nEndRow, 10);
		var endCol = parseInt(nEndCol, 10);
		var firstCell = parseInt(nFirstCell, 10);

		if (!isFinite(startRow) || !isFinite(startCol) || !isFinite(endRow) || !isFinite(endCol)) {
			return -1;
		}
		if (startCol > endCol || startRow > endRow) {
			return -1;
		}
		var colCount = this._cols.length;
		if (startCol < 0 || startCol >= colCount || endCol < 0 || endCol >= colCount) {
			return -1;
		}
		var bandrows = null;
		var bandcells = null;
		if (bandtype == "head") {
			bandrows = this._headrows;
			bandcells = this._headcells;
		}
		else if (bandtype == "summ") {
			bandrows = this._summrows;
			bandcells = this._summcells;
		}
		else {
			bandrows = this._bodyrows;
			bandcells = this._bodycells;
		}
		var cellCount = (bandcells) ? bandcells.length : 0;
		var rowCount = (bandrows) ? bandrows.length : 0;
		if (cellCount == 0) {
			return -1;
		}
		if (startRow < 0 || startRow >= rowCount || endRow < 0 || endRow >= rowCount) {
			return -1;
		}

		var area;
		var merged_check = -1;
		var merged_matrix = [];
		for (var i = 0; i < cellCount; i++) {
			var cell = bandcells[i];
			if ((cell._row >= startRow && cell._row <= endRow) && (cell._col >= startCol && cell._col <= endCol)) {
				if (area && area != bandcells[i]._area) {
					return -1;
				}
				else {
					area = bandcells[i]._area;
				}
				merged_matrix[i] = true;
				if (cell._rowspan > 1 || cell._colspan > 1) {
					merged_check = i;
				}
			}
			else {
				merged_matrix[i] = false;
			}
		}

		if (merged_check >= 0 && bandcells[merged_check]._rowspan > endRow && bandcells[merged_check]._colspan > endCol) {
			return -1;
		}

		if (!firstCell || firstCell < 0) {
			firstCell = 0;
		}

		var cellidx = -1;
		var first = bandcells[firstCell];
		var subcells = [];
		for (var i = cellCount - 1; i >= 0; i--) {
			var cell = bandcells[i];
			var row = cell._row;
			var col = cell._col;

			if (merged_matrix[i]) {
				if (first._row < startRow || first._row > endRow || first._col < startCol || first._col > endCol) {
					return -1;
				}

				if (bKeepSubCell) {
					if (bandcells[i]._col == startCol && bandcells[i]._row == startRow) {
						var cellinfo = new nexacro.GridCellInfo(bandcells[i].id, bandcells[i].parent, bandcells[i].grid, bandcells[i].celltype, bandcells[i]._cellidx);
						cellinfo._row = bandcells[i]._row;
						cellinfo._rowspan = (endRow - startRow) + 1;
						cellinfo._col = bandcells[i]._col;
						cellinfo._colspan = (endCol - startCol) + 1;
						cellinfo._isSubCell = false;
						cellinfo._area = bandcells[i]._area;
						cellinfo._endcol = bandcells[i]._endcol;

						subcells.unshift(bandcells[i]);


						for (var j = 0; j < subcells.length; j++) {
							subcells[j]._col -= cellinfo._col;
							subcells[j]._row -= cellinfo._row;
							subcells[j]._cellidx = j;
							subcells[j]._isSubCell = true;
							subcells[j]._id = subcells[j].name = bandcells[i].id + "_sub" + j;
						}

						cellinfo._subcells = subcells;
						bandcells[i] = cellinfo;
						subcells = [];
						cellidx = i;
					}
					else {
						subcells.unshift(bandcells[i]);

						bandcells.splice(i, 1);
					}
				}
				else {
					if (bandcells[i]._col == startCol && bandcells[i]._row == startRow) {
						cellidx = bandcells[i]._cellidx;
						first._row = bandcells[i]._row;
						first._col = bandcells[i]._col;
						first._rowspan = (endRow - startRow) + 1;
						first._colspan = (endCol - startCol) + 1;
						bandcells[i] = first;
					}
					else {
						bandcells.splice(i, 1);
					}
				}
			}
		}

		var bandcellsLen = bandcells.length;
		for (var i = 0; i < bandcellsLen; i++) {
			bandcells[i]._cellidx = i;
		}

		return cellidx;
	};

	_pGridFormat.splitContentsCell = function (strBand, nStartRow, nStartCol, nEndRow, nEndCol, bMakeSubCell) {
		var band_rows = null;
		var band_cells = null;
		var band_cols = this._cols;
		var band_type = strBand.toLowerCase();

		if (band_type == "head") {
			band_rows = this._headrows;
			band_cells = this._headcells;
		}
		else if (band_type == "summ") {
			band_rows = this._summrows;
			band_cells = this._summcells;
		}
		else {
			band_rows = this._bodyrows;
			band_cells = this._bodycells;
		}

		var row_count = (band_rows) ? band_rows.length : 0;
		var col_count = (band_cols) ? band_cols.length : 0;
		var cell_count = (band_cells) ? band_cells.length : 0;

		if (row_count > 0 && col_count > 0) {
			if (nStartRow < 0 || nEndRow >= row_count) {
				if (nStartRow < 0) {
					nStartRow = 0;
				}
				else {
					nEndRow = row_count - 1;
				}
			}
			if (nStartCol < 0 || nEndCol >= col_count) {
				if (nStartCol < 0) {
					nStartCol = 0;
				}
				else {
					nEndCol = col_count - 1;
				}
			}

			var matrix = [];
			var cell_idx = 0;
			var split_cell = 0;
			var subcells = null;
			var current_merge_col = null;
			var current_merge_row = null;

			for (var i = 0; i < cell_count; i++) {
				var row = band_cells[i]._row;
				var col = band_cells[i]._col;
				var area = band_cells[i]._area;

				subcells = band_cells[i]._subcells;
				current_merge_col = (band_cells[i]._colspan + band_cells[i]._col) - 1;
				current_merge_row = (band_cells[i]._rowspan + band_cells[i]._row) - 1;

				if (subcells.length > 0) {
					if ((current_merge_col >= nStartCol && current_merge_col <= nEndCol) && (current_merge_row >= nStartRow && current_merge_row <= nEndRow)) {
						for (var j = 0; j < subcells.length; j++) {
							split_cell++;

							subcells[j]._row = row;
							subcells[j]._col = col;
							subcells[j]._area = area;
							subcells[j]._cellidx = col + (col_count * row);

							var rowspan = subcells[j]._rowspan;
							var colspan = subcells[j]._colspan;
							if (col < band_cells[i]._col + (band_cells[i]._colspan - 1)) {
								col = col + colspan;
							}
							else {
								row = row + rowspan;
								col = band_cells[i]._col;
							}
							matrix.push(subcells[j]);
						}
					}
					else {
						band_cells[i]._cellidx = band_cells[i]._col + (band_cells[i]._row * col_count);
						matrix.push(band_cells[i]);
					}
				}
				else {
					if (bMakeSubCell) {
						if ((current_merge_col >= nStartCol && current_merge_col <= nEndCol) && (current_merge_row >= nStartRow && current_merge_row <= nEndRow)) {
							if ((band_cells[i]._rowspan * band_cells[i]._colspan) > 1) {
								var make_cell = null;
								for (var j = 0; j < (band_cells[i]._rowspan * band_cells[i]._colspan); j++) {
									split_cell++;
									make_cell = new nexacro.GridCellInfo(band_type + cell_idx, band_cells[i].parent, band_cells[i].grid, band_cells[i].celltype, cell_idx);

									make_cell._row = row;
									make_cell._col = col;
									make_cell._area = area;
									make_cell._rowspan = 1;
									make_cell._colspan = 1;
									make_cell._cellidx = col + (col_count * row);
									make_cell.text = band_cells[i].text;

									if (col < band_cells[i]._col + (band_cells[i]._colspan - 1)) {
										col++;
									}
									else {
										row++;
										col = band_cells[i]._col;
									}
									matrix.push(make_cell);
								}
							}
							else {
								matrix.push(band_cells[i]);
							}
						}
						else {
							matrix.push(band_cells[i]);
						}
					}
					else {
						matrix.push(band_cells[i]);
					}
				}
			}

			if (split_cell > 0) {
				matrix.sort(function (l, r) {
					return l._cellidx - r._cellidx;
				});

				for (var i = 0; i < matrix.length; i++) {
					matrix[i]._cellidx = i;
				}

				if (band_type == "head") {
					this._headcells = matrix;
				}
				else if (band_type == "summ") {
					this._summcells = matrix;
				}
				else {
					this._bodycells = matrix;
				}
				return split_cell;
			}
		}
		return -1;
	};

	_pGridFormat.setBandProperty = function (strBand, strPropID, varValue) {
		var bandinfo = null;
		var bandtype = strBand.toLowerCase();

		if (bandtype == "head") {
			bandinfo = this._headband;
		}
		else if (bandtype == "summ" || bandtype == "summary") {
			bandinfo = this._summband;
		}
		else {
			bandinfo = this._bodyband;
		}

		if (bandinfo) {
			if (bandinfo["set_" + strPropID]) {
				bandinfo["set_" + strPropID](varValue);
			}
			else if (bandinfo.style["set_" + strPropID]) {
				bandinfo.style["set_" + strPropID](varValue);
			}

			this._updateFormatStr();
			return bandinfo;
		}
		return undefined;
	};

	_pGridFormat.setSubCellProperty = function (strBand, nCellIdx, nSubCellIdx, strPropID, varValue) {
		var cellinfo = null;
		var bandtype = strBand.toLowerCase();

		if (bandtype == "head") {
			if (this._headband) {
				cellinfo = this._headcells[nCellIdx];
			}
		}
		else if (bandtype == "summ" || bandtype == "summary") {
			if (this._summband) {
				cellinfo = this._summcells[nCellIdx];
			}
		}
		else {
			if (this._bodyband) {
				cellinfo = this._bodycells[nCellIdx];
			}
		}

		if (cellinfo._subcells.length > nSubCellIdx && nSubCellIdx >= 0) {
			cellinfo = cellinfo._subcells[nSubCellIdx];

			if (cellinfo) {
				if (cellinfo["set_" + strPropID]) {
					cellinfo["set_" + strPropID](varValue);
				}
				else if (cellinfo.style["set_" + strPropID]) {
					cellinfo.style["set_" + strPropID](varValue);
				}

				this._updateFormatStr();
				return cellinfo;
			}
		}
	};

	_pGridFormat.setCellProperty = function (strBand, nCellIdx, strPropID, varValue) {
		var cellinfo = null;
		var bandtype = strBand.toLowerCase();

		if (bandtype == "head") {
			if (this._headband) {
				cellinfo = this._headcells[nCellIdx];
			}
		}
		else if (bandtype == "summ" || bandtype == "summary") {
			if (this._summband) {
				cellinfo = this._summcells[nCellIdx];
			}
		}
		else {
			if (this._bodyband) {
				cellinfo = this._bodycells[nCellIdx];
			}
		}

		if (cellinfo) {
			if (cellinfo["set_" + strPropID]) {
				cellinfo["set_" + strPropID](varValue);
			}
			else if (cellinfo.style["set_" + strPropID]) {
				cellinfo.style["set_" + strPropID](varValue);
			}

			this._updateFormatStr();
			return cellinfo;
		}
	};

	_pGridFormat.getSubCellProperty = function (strBand, nCellIdx, nSubCellIdx, strPropID) {
		var cellinfo = null;
		var bandtype = strBand.toLowerCase();

		if (bandtype == "head") {
			if (this._headband) {
				cellinfo = this._headcells[nCellIdx];
			}
		}
		else if (bandtype == "summ" || bandtype == "summary") {
			if (this._summband) {
				cellinfo = this._summcells[nCellIdx];
			}
		}
		else {
			if (this._bodyband) {
				cellinfo = this._bodycells[nCellIdx];
			}
		}

		if (cellinfo._subcells.length > nSubCellIdx && nSubCellIdx >= 0) {
			cellinfo = cellinfo._subcells[nSubCellIdx];

			if (cellinfo) {
				var prop = cellinfo[strPropID];
				if (prop == undefined) {
					prop = cellinfo["_" + strPropID];
				}
				if (prop == undefined) {
					prop = cellinfo.style[strPropID];
				}

				if (prop != undefined) {
					var type = typeof (prop);

					if (type == "number" || type == "string") {
						return prop;
					}
					else {
						var val;

						if (strPropID == "expr") {
							val = prop._bindexpr;
						}
						else {
							if (prop._bindtype == 2) {
								val = prop._bindexpr;
								if (val.indexOf("expr:") < 0) {
									val = "expr:" + val;
								}
							}
							else {
								val = prop._value;
							}
						}

						if (val) {
							return val;
						}
						else {
							return prop;
						}
					}
				}
			}
		}
		return undefined;
	};

	_pGridFormat.getCellProperty = function (strBand, nCellIdx, strPropID) {
		var cellinfo = null;
		var bandtype = strBand.toLowerCase();
		if (bandtype == "head") {
			if (this._headband) {
				cellinfo = this._headcells[nCellIdx];
			}
		}
		else if (bandtype == "summ" || bandtype == "summary") {
			if (this._summband) {
				cellinfo = this._summcells[nCellIdx];
			}
		}
		else {
			if (this._bodyband) {
				cellinfo = this._bodycells[nCellIdx];
			}
		}

		if (cellinfo) {
			if (strPropID == "subcell") {
				return cellinfo._subcells.length;
			}

			var prop = cellinfo[strPropID];
			if (prop == undefined) {
				prop = cellinfo["_" + strPropID];
			}
			if (prop == undefined) {
				prop = cellinfo.style[strPropID];
			}

			if (prop != undefined) {
				var type = typeof (prop);

				if (type == "number" || type == "string") {
					return prop;
				}
				else {
					var val;

					if (strPropID == "expr") {
						val = prop._bindexpr;
					}
					else {
						if (prop._bindtype == 2) {
							val = prop._bindexpr;
							if (val.indexOf("expr:") < 0) {
								val = "expr:" + val;
							}
						}
						else {
							val = prop._value;
						}
					}

					if (val) {
						return val;
					}
					else {
						return prop;
					}
				}
			}
		}
		return null;
	};

	_pGridFormat.getBandProperty = function (strBand, strPropID) {
		var bandinfo = null;
		var bandtype = strBand.toLowerCase();

		if (bandtype == "head") {
			bandinfo = this._headband;
		}
		else if (bandtype == "summ" || bandtype == "summary") {
			bandinfo = this._summband;
		}
		else {
			bandinfo = this._bodyband;
		}

		if (bandinfo) {
			var prop = bandinfo[strPropID];
			if (prop == undefined) {
				prop = bandinfo["_" + strPropID];
			}
			if (prop == undefined) {
				prop = bandinfo.style[strPropID];
			}

			if (prop != undefined) {
				var type = typeof (prop);

				if (type == "number" || type == "string") {
					return prop;
				}
				else {
					var val;

					if (strPropID == "expr") {
						val = prop._bindexpr;
					}
					else {
						val = prop._value;
					}

					if (val) {
						return val;
					}
					else {
						return prop;
					}
				}
			}
		}
		return null;
	};

	_pGridFormat._adjustFormatColSize = function (is_change_area, no_update_xml) {
		var len = this._cols.length;
		var leftOffset = 0;
		var bodyOffset = 0;
		var rightOffset = 0;
		var col = null;

		for (var i = 0; i < len; i++) {
			col = this._cols[i];
			if (col._area == "left") {
				col.left = leftOffset;
				leftOffset += col.size;
				col.right = leftOffset;
			}
			else if (col._area == "right") {
				col.left = rightOffset;
				rightOffset += col.size;
				col.right = rightOffset;
			}
			else {
				col.left = bodyOffset;
				bodyOffset += col.size;
				col.right = bodyOffset;
			}
			if (is_change_area) {
				col.orgleft = col.left;
				col.orgright = col.right;
			}
		}
		this.leftWidth = leftOffset;
		this._bodyWidth = this.bodyWidth = bodyOffset;
		this.rightWidth = rightOffset;

		if (!no_update_xml) {
			this._updateFormatStr();
		}
	};

	_pGridFormat._setColSize = function (nColIdx, nValue, noUpdate) {
		if (this._cols) {
			var column = this._cols[nColIdx];
			var size = parseFloat(nValue, 10);

			if (column && isFinite(size)) {
				var oldSize = column.size;

				if (size != oldSize) {
					column.size = size;
					this._adjustFormatColSize(false, noUpdate);

					return true;
				}
				return false;
			}
		}
	};

	_pGridFormat.setFormatColProperty = function (nColIdx, strPropID, nValue) {
		if (this._cols) {
			if (strPropID == "size") {
				var column = this._cols[nColIdx];
				var size = parseInt(nValue, 10);
				if (column && isFinite(size)) {
					var oldSize = column.size;
					if (size != oldSize) {
						column.size = column.orgsize = size;
						this._adjustFormatColSize();
						return true;
					}
					return false;
				}
			}
			else if (strPropID == "band") {
				var val = nValue.toLowerCase();
				var _cols = this._cols;
				var _colsLen = this._cols.length;
				var col, change = false;

				for (var i = 0; i < this._cols.length; i++) {
					col = _cols[i];
					if (val == "left") {
						if (i <= nColIdx && col._area != "left") {
							col._area = "left";
							change = true;
						}
					}
					else if (val == "right") {
						if (i >= nColIdx && col._area != "right") {
							col._area = "right";
							change = true;
						}
					}
					else {
						if ((i >= nColIdx && col._area == "left") || (i <= nColIdx && col._area == "right")) {
							col._area = "body";
							change = true;
						}
					}
				}

				function _apply_area (cells) {
					if (cells) {
						var cellsLen = cells.length;
						var cellinfo;

						for (var i = 0; i < cellsLen; i++) {
							cellinfo = cells[i];
							if (val == "left") {
								if (cellinfo._col <= nColIdx) {
									cellinfo._area = "left";
								}
							}
							else if (val == "right") {
								if (cellinfo._col >= nColIdx) {
									cellinfo._area = "right";
								}
							}
							else {
								if ((cellinfo._col >= nColIdx && cellinfo._area == "left") || (cellinfo._col <= nColIdx && cellinfo._area == "right")) {
									cellinfo._area = "body";
								}
							}
						}
					}
				}
				if (change) {
					_apply_area(this._headcells);
					_apply_area(this._bodycells);
					_apply_area(this._summcells);
					this._adjustFormatColSize(true);
				}
				return change;
			}
		}
		return false;
	};

	_pGridFormat.getFormatColProperty = function (nColIdx, strPropID) {
		if (this._cols) {
			if (strPropID == "size") {
				var column = this._cols[nColIdx];
				if (column) {
					return column.orgsize;
				}
			}
			else if (strPropID == "band") {
				var column = this._cols[nColIdx];
				if (column) {
					return column._area;
				}
			}
			else if (strPropID == "fix") {
				var column = this._cols[nColIdx];
				if (column) {
					if (column._area == "left" || column._area == "right") {
						return "fixed";
					}
					else {
						return "";
					}
				}
			}
		}
		return null;
	};

	_pGridFormat._adjustFormatRowSize = function (rows) {
		var len = rows.length;
		var bodyOffset = 0;
		var row = null;
		for (var i = 0; i < len; i++) {
			row = rows[i];
			row.top = bodyOffset;
			bodyOffset += row.size;
			row.bottom = bodyOffset;
		}
		return bodyOffset;
	};

	_pGridFormat.setFormatRowProperty = function (nRowIdx, strPropID, nValue) {
		if (strPropID == "size") {
			var size = parseInt(nValue, 10);
			if (isFinite(size)) {
				var idx = nRowIdx;
				var headCount = (this._headrows) ? this._headrows.length : 0;

				if (idx < headCount) {
					this._headrows[idx].size = size;
					var height = this.headHeight;
					this.headHeight = this._adjustFormatRowSize(this._headrows);

					if (this.headHeight != height) {
						return true;
					}

					return false;
				}
				else {
					idx -= headCount;
				}

				var bodyCount = (this._bodyrows) ? this._bodyrows.length : 0;

				if (idx < bodyCount) {
					this._bodyrows[idx].size = size;
					var height = this.bodyHeight;
					this._body_height = this.bodyHeight = this._adjustFormatRowSize(this._bodyrows);

					if (this.bodyHeight != height) {
						return true;
					}

					return false;
				}
				else {
					idx -= bodyCount;
				}

				var summCount = (this._summrows) ? this._summrows.length : 0;

				if (idx < summCount) {
					this._summrows[idx].size = size;
					var height = this.summHeight;
					this.summHeight = this._adjustFormatRowSize(this._summrows);

					if (this.summHeight != height) {
						return true;
					}

					return false;
				}
			}
		}
		else if (strPropID == "band") {
			var idx = nRowIdx;
			var val = nValue.toLowerCase();

			return false;

			var headCount = (this._headrows) ? this._headrows.length : 0;
			if (idx < headCount) {
				var row = this._headrows[idx];

				if (val == "body") {
					this._bodyrows.push(row);
					this._headrows.splice(idx, 1);

					this._body_height = this.bodyHeight = this._adjustFormatRowSize(this._bodyrows);
					this.headHeight = this._adjustFormatRowSize(this._headrows);
					return true;
				}
				else if (val == "summ" || val == "summary") {
					this._summrows.push(row);
					this._headrows.splice(idx, 1);

					this.summHeight = this._adjustFormatRowSize(this._summrows);
					this.headHeight = this._adjustFormatRowSize(this._headrows);
					return true;
				}
			}
			else {
				idx -= headCount;
			}

			var bodyCount = (this._bodyrows) ? this._bodyrows.length : 0;

			if (idx < bodyCount) {
				var row = this._bodyrows[idx];

				if (val == "head") {
					this._headrows.push(row);
					this._bodyrows.splice(idx, 1);

					this.headHeight = this._adjustFormatRowSize(this._headrows);
					this._body_height = this.bodyHeight = this._adjustFormatRowSize(this._bodyrows);
					return true;
				}
				else if (val == "summ" || val == "summary") {
					this._summrows.push(row);
					this._bodyrows.splice(idx, 1);

					this.summHeight = this._adjustFormatRowSize(this._summrows);
					this._body_height = this.bodyHeight = this._adjustFormatRowSize(this._bodyrows);
					return true;
				}
			}
			else {
				idx -= bodyCount;
			}
			var summCount = (this._summrows) ? this._summrows.length : 0;

			if (idx < summCount) {
				var row = this._summrows[idx];

				if (val == "head") {
					this._headrows.push(row);
					this._summrows.splice(idx, 1);

					this.headHeight = this._adjustFormatRowSize(this._headrows);
					this.summHeight = this._adjustFormatRowSize(this._summrows);
					return true;
				}
				else if (val == "body") {
					this._bodyrows.push(row);
					this._summrows.splice(idx, 1);

					this._body_height = this.bodyHeight = this._adjustFormatRowSize(this._bodyrows);
					this.summHeight = this._adjustFormatRowSize(this._summrows);
					return true;
				}
			}
		}
		return false;
	};

	_pGridFormat.getFormatRowProperty = function (nRowIdx, strPropID) {
		if (strPropID == "size") {
			var idx = nRowIdx;
			var headCount = (this._headrows) ? this._headrows.length : 0;

			if (idx < headCount) {
				return this._headrows[idx].orgsize;
			}
			else {
				idx -= headCount;
			}

			var bodyCount = (this._bodyrows) ? this._bodyrows.length : 0;

			if (idx < bodyCount) {
				return this._bodyrows[idx].orgsize;
			}
			else {
				idx -= bodyCount;
			}

			var summCount = (this._summrows) ? this._summrows.length : 0;

			if (idx < summCount) {
				return this._summrows[idx].orgsize;
			}
		}
		else if (strPropID == "band") {
			var idx = nRowIdx;
			var headCount = (this._headrows) ? this._headrows.length : 0;

			if (idx < headCount) {
				return "head";
			}
			else {
				idx -= headCount;
			}

			var bodyCount = (this._bodyrows) ? this._bodyrows.length : 0;

			if (idx < bodyCount) {
				return "body";
			}
			else {
				idx -= bodyCount;
			}

			var summCount = (this._summrows) ? this._summrows.length : 0;

			if (idx < summCount) {
				return "summ";
			}
		}
		return null;
	};
	delete _pGridFormat;
}
;
