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

if (!nexacro.Chart_Style) {
	nexacro.Chart_Style = function (target, id) {
		nexacro.Style.call(this);
		if (target) {
			this._target = target;
		}
		this.baritemminsize = null;
		this.baritemspacing = null;
		this.barspacing = null;
		this.lineextendorigin = null;
		this.scrollbarsize = null;
		this.seriesextendaxis = null;
	};

	var _pChartStyle = nexacro.Chart_Style.prototype = nexacro._createPrototype(nexacro.Style, nexacro.Chart_Style);

	_pChartStyle._type_name = "ChartStyle";

	eval(nexacro._createValueAttributeEvalStr("_pChartStyle", "baritemminsize"));
	eval(nexacro._createValueAttributeEvalStr("_pChartStyle", "baritemspacing"));
	eval(nexacro._createValueAttributeEvalStr("_pChartStyle", "barspacing"));
	eval(nexacro._createValueAttributeEvalStr("_pChartStyle", "lineextendorigin"));
	eval(nexacro._createValueAttributeEvalStr("_pChartStyle", "scrollbarsize"));
	eval(nexacro._createValueAttributeEvalStr("_pChartStyle", "seriesextendaxis"));

	_pChartStyle.__custom_emptyObject = function () {
		this.baritemminsize = null;
		this.baritemspacing = null;
		this.barspacing = null;
		this.lineextendorigin = null;
		this.scrollbarsize = null;
		this.seriesextendaxis = null;
	};

	_pChartStyle.__get_custom_style_value = function () {
		var val = "";
		if (this.baritemminsize && !this.baritemminsize._is_empty) {
			val += "baritemminsize:" + this.baritemminsize._value + "; ";
		}
		if (this.baritemspacing && !this.baritemspacing._is_empty) {
			val += "baritemspacing:" + this.baritemspacing._value + "; ";
		}
		if (this.barspacing && !this.barspacing._is_empty) {
			val += "barspacing:" + this.barspacing._value + "; ";
		}
		if (this.lineextendorigin && !this.lineextendorigin._is_empty) {
			val += "lineextendorigin:" + this.lineextendorigin._value + "; ";
		}
		if (this.scrollbarsize && !this.scrollbarsize._is_empty) {
			val += "scrollbarsize:" + this.scrollbarsize._value + "; ";
		}
		if (this.seriesextendaxis && !this.seriesextendaxis._is_empty) {
			val += "seriesextendaxis:" + this.scrollbarsize._value + "; ";
		}
		return val;
	};

	nexacro.Chart_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);
		this.baritemminsize = null;
		this.baritemspacing = null;
		this.barspacing = null;
		this.lineextendorigin = null;
		this.scrollbarsize = null;
		this.seriesextendaxis = null;
	};

	var _pChartCurrentStyle = nexacro.Chart_CurrentStyle.prototype = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.Chart_CurrentStyle);

	_pChartCurrentStyle._type_name = "ChartCurrentStyle";

	_pChartCurrentStyle.__custom_emptyObject = _pChartStyle.__custom_emptyObject;
	_pChartCurrentStyle.__get_custom_style_value = _pChartStyle.__get_custom_style_value;

	_pChartStyle = null;
	_pChartCurrentStyle = null;

	nexacro.ChartBoard_Style = function (target, id) {
		nexacro.Style.call(this, target, id);
		if (target) {
			this._target = target;
		}

		this.markliney = null;
		this.markliney2 = null;
		this.originliney = null;
		this.originliney2 = null;
		this.xaxismajorline = null;
		this.yaxismajorline = null;
		this.yaxisminorline = null;
	};

	var _pBoardStyle = nexacro.ChartBoard_Style.prototype = nexacro._createPrototype(nexacro.Style, nexacro.ChartBoard_Style);

	_pBoardStyle._type_name = "ChartBoardStyle";

	eval(nexacro._createLineAttributeEvalStr("_pBoardStyle", "markliney"));
	eval(nexacro._createLineAttributeEvalStr("_pBoardStyle", "markliney2"));
	eval(nexacro._createLineAttributeEvalStr("_pBoardStyle", "originliney"));
	eval(nexacro._createLineAttributeEvalStr("_pBoardStyle", "originliney2"));
	eval(nexacro._createLineAttributeEvalStr("_pBoardStyle", "xaxismajorline"));
	eval(nexacro._createLineAttributeEvalStr("_pBoardStyle", "yaxismajorline"));
	eval(nexacro._createLineAttributeEvalStr("_pBoardStyle", "yaxisminorline"));

	_pBoardStyle.__custom_emptyObject = function () {
		this.markliney = null;
		this.markliney2 = null;
		this.originliney = null;
		this.originliney2 = null;
		this.xaxismajorline = null;
		this.yaxismajorline = null;
		this.yaxisminorline = null;
	};

	_pBoardStyle.__get_custom_style_value = function () {
		var val = "";
		if (this.markliney && !this.markliney._is_empty) {
			val += "markliney:" + this.markliney._value + "; ";
		}
		if (this.markliney2 && !this.markliney2._is_empty) {
			val += "markliney2:" + this.markliney2._value + "; ";
		}
		if (this.originliney && !this.originliney._is_empty) {
			val += "originliney:" + this.originliney._value + "; ";
		}
		if (this.originliney2 && !this.originliney2._is_empty) {
			val += "originliney2:" + this.originliney2._value + "; ";
		}
		if (this.xaxismajorline && !this.xaxismajorline._is_empty) {
			val += "xaxismajorline:" + this.xaxismajorline._value + "; ";
		}
		if (this.yaxismajorline && !this.yaxismajorline._is_empty) {
			val += "yaxismajorline:" + this.yaxismajorline._value + "; ";
		}
		if (this.yaxisminorline && !this.yaxisminorline._is_empty) {
			val += "yaxisminorline:" + this.yaxisminorline._value + "; ";
		}
		return val;
	};

	nexacro.ChartBoard_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);
		this.markliney = null;
		this.markliney2 = null;
		this.originliney = null;
		this.originliney2 = null;
		this.xaxismajorline = null;
		this.yaxismajorline = null;
		this.yaxisminorline = null;
	};

	var _pBoardCurrentStyle = nexacro.ChartBoard_CurrentStyle.prototype = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.ChartBoard_CurrentStyle);

	_pBoardCurrentStyle._type_name = "ChartBoardCurrentStyle";

	_pBoardCurrentStyle.__custom_emptyObject = _pBoardStyle.__custom_emptyObject;
	_pBoardCurrentStyle.__get_custom_style_value = _pBoardStyle.__get_custom_style_value;

	_pBoardStyle = null;
	_pBoardCurrentStyle = null;

	nexacro.ChartLegend_Style = function (target, id) {
		nexacro.Style.call(this, target, id);
		if (target) {
			this._target = target;
		}
		this.location = null;
		this.arrange = null;
		this.imagepadding = null;
		this.itemalign = null;
		this.itemborder = null;
		this.itembordertype = null;
		this.itembackground = null;
		this.itemgradation = null;
		this.itempadding = null;
		this.itemfont = null;
		this.itemcolor = null;
		this.titlealign = null;
		this.titlecolor = null;
		this.titlefont = null;
		this.titlepadding = null;
		this.titletext = null;
		this.type = null;
	};

	var _pLegendStyle = nexacro.ChartLegend_Style.prototype = nexacro._createPrototype(nexacro.Style, nexacro.ChartLegend_Style);

	_pLegendStyle._type_name = "ChartLegendStyle";

	eval(nexacro._createValueAttributeEvalStr("_pLegendStyle", "location"));
	eval(nexacro._createValueAttributeEvalStr("_pLegendStyle", "arrange"));
	eval(nexacro._createPaddingAttributeEvalStr("_pLegendStyle", "imagepadding"));
	eval(nexacro._createAlignAttributeEvalStr("_pLegendStyle", "itemalign"));
	eval(nexacro._createBorderAttributeEvalStr("_pLegendStyle", "itemborder"));
	eval(nexacro._createBordertypeAttributeEvalStr("_pLegendStyle", "itembordertype"));
	eval(nexacro._createGradationAttributeEvalStr("_pLegendStyle", "itemgradation"));
	eval(nexacro._createPaddingAttributeEvalStr("_pLegendStyle", "itempadding"));
	eval(nexacro._createFontAttributeEvalStr("_pLegendStyle", "itemfont"));
	eval(nexacro._createValueAttributeEvalStr("_pLegendStyle", "itemcolor"));
	eval(nexacro._createFontAttributeEvalStr("_pLegendStyle", "titlefont"));
	eval(nexacro._createAlignAttributeEvalStr("_pLegendStyle", "titlealign"));
	eval(nexacro._createValueAttributeEvalStr("_pLegendStyle", "titlecolor"));
	eval(nexacro._createPaddingAttributeEvalStr("_pLegendStyle", "titlepadding"));
	eval(nexacro._createValueAttributeEvalStr("_pLegendStyle", "titletext"));
	eval(nexacro._createValueAttributeEvalStr("_pLegendStyle", "type"));

	_pLegendStyle.__custom_emptyObject = function () {
		this.location = null;
		this.arrange = null;
		this.itemalign = null;
		this.itemborder = null;
		this.itembordertype = null;
		this.itembackground = null;
		this.itemgradation = null;
		this.itempadding = null;
		this.itemfont = null;
		this.itemcolor = null;
		this.titlealign = null;
		this.titlecolor = null;
		this.titlefont = null;
		this.titlepadding = null;
		this.titletext = null;
		this.type = null;
	};

	_pLegendStyle.__get_custom_style_value = function () {
		var val = "";
		if (this.location && !this.location._is_empty) {
			val += "location:" + this.location._value + "; ";
		}
		if (this.arrange && !this.arrange._is_empty) {
			val += "arrange:" + this.arrange._value + "; ";
		}
		if (this.itemalign && !this.itemalign._is_empty) {
			val += "itemalign:" + this.itemalign._value + "; ";
		}
		if (this.itemborder && !this.itemborder._is_empty) {
			val += "itemborder:" + this.itemborder._value + "; ";
		}
		if (this.itembordertype && !this.itembordertype._is_empty) {
			val += "itembordertype:" + this.itembordertype._value + "; ";
		}
		if (this.itembackground && !this.itembackground._is_empty) {
			val += "itembackground:" + this.itembackground._value + "; ";
		}
		if (this.itemgradation && !this.itemgradation._is_empty) {
			val += "itemgradation:" + this.itemgradation._value + "; ";
		}
		if (this.itempadding && !this.itempadding._is_empty) {
			val += "itempadding:" + this.itempadding._value + "; ";
		}
		if (this.itemfont && !this.itemfont._is_empty) {
			val += "itemfont:" + this.itemfont._value + "; ";
		}
		if (this.itemcolor && !this.itemcolor._is_empty) {
			val += "itemcolor:" + this.itemcolor._value + "; ";
		}
		if (this.titlealign && !this.titlealign._is_empty) {
			val += "titlealign:" + this.titlealign._value + "; ";
		}
		if (this.titlecolor && !this.titlecolor._is_empty) {
			val += "titlecolor:" + this.titlecolor._value + "; ";
		}
		if (this.titlefont && !this.titlefont._is_empty) {
			val += "titlefont:" + this.titlefont._value + "; ";
		}
		if (this.titlepadding && !this.titlepadding._is_empty) {
			val += "titlepadding:" + this.titlepadding._value + "; ";
		}
		if (this.titletext && !this.titletext._is_empty) {
			val += "titletext:" + this.titletext._value + "; ";
		}
		if (this.type && !this.type._is_empty) {
			val += "type:" + this.type._value + "; ";
		}
		return val;
	};


	nexacro.ChartLegend_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);
		this.location = null;
		this.arrange = null;
		this.itemalign = null;
		this.itemborder = null;
		this.itembordertype = null;
		this.itembackground = null;
		this.itemgradation = null;
		this.itempadding = null;
		this.itemfont = null;
		this.itemcolor = null;
		this.titlealign = null;
		this.titlecolor = null;
		this.titlefont = null;
		this.titlepadding = null;
		this.titletext = null;
		this.type = null;
	};

	var _pLegendCurrentStyle = nexacro.ChartLegend_CurrentStyle.prototype = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.ChartLegend_CurrentStyle);

	_pLegendCurrentStyle._type_name = "ChartLegendCurrentStyle";

	_pLegendCurrentStyle.__custom_emptyObject = _pLegendStyle.__custom_emptyObject;
	_pLegendCurrentStyle.__get_custom_style_value = _pLegendStyle.__get_custom_style_value;

	_pLegendStyle = null;
	_pLegendCurrentStyle = null;

	nexacro.ChartTitle_Style = function (target, id) {
		nexacro.Style.call(this);
		if (target) {
			this._target = target;
		}
		this.location = null;
		this.size = null;
		this.subalign = null;
		this.subcolor = null;
		this.subfont = null;
		this.subpadding = null;
		this.titlerotate = null;
	};

	var _pTitleStyle = nexacro.ChartTitle_Style.prototype = nexacro._createPrototype(nexacro.Style, nexacro.ChartTitle_Style);

	_pTitleStyle._type_name = "ChartTitleStyle";

	eval(nexacro._createValueAttributeEvalStr("_pTitleStyle", "location"));
	eval(nexacro._createValueAttributeEvalStr("_pTitleStyle", "size"));
	eval(nexacro._createAlignAttributeEvalStr("_pTitleStyle", "subalign"));
	eval(nexacro._createValueAttributeEvalStr("_pTitleStyle", "subcolor"));
	eval(nexacro._createFontAttributeEvalStr("_pTitleStyle", "subfont"));
	eval(nexacro._createPaddingAttributeEvalStr("_pTitleStyle", "subpadding"));
	eval(nexacro._createValueAttributeEvalStr("_pTitleStyle", "titlerotate"));

	_pTitleStyle.__custom_emptyObject = function () {
		this.location = null;
		this.size = null;
		this.subalign = null;
		this.subcolor = null;
		this.subfont = null;
		this.subpadding = null;
		this.titlerotate = null;
	};

	_pTitleStyle.__get_custom_style_value = function () {
		var val = "";
		if (this.location && !this.location._is_empty) {
			val += "location:" + this.location._value + "; ";
		}
		if (this.size && !this.size._is_empty) {
			val += "size:" + this.size._value + "; ";
		}
		if (this.subalign && !this.subalign._is_empty) {
			val += "subalign:" + this.subalign._value + "; ";
		}
		if (this.subcolor && !this.subcolor._is_empty) {
			val += "subcolor:" + this.subcolor._value + "; ";
		}
		if (this.subfont && !this.subfont._is_empty) {
			val += "subfont:" + this.subfont._value + "; ";
		}
		if (this.subpadding && !this.subpadding._is_empty) {
			val += "subpadding:" + this.subpadding._value + "; ";
		}
		if (this.titlerotate && !this.titlerotate._is_empty) {
			val += "titlerotate:" + this.titlerotate._value + "; ";
		}

		return val;
	};

	nexacro.ChartTitle_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);
		this.location = null;
		this.size = null;
		this.subalign = null;
		this.subcolor = null;
		this.subfont = null;
		this.subpadding = null;
		this.titlerotate = null;
	};

	var _pTitleCurrentStyle = nexacro.ChartTitle_CurrentStyle.prototype = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.ChartTitle_CurrentStyle);

	_pTitleCurrentStyle._type_name = "ChartTitleCurrentStyle";

	_pTitleCurrentStyle.__custom_emptyObject = _pTitleStyle.__custom_emptyObject;
	_pTitleCurrentStyle.__get_custom_style_value = _pTitleStyle.__get_custom_style_value;

	_pTitleStyle = null;
	_pTitleCurrentStyle = null;

	nexacro.ChartAxis_Style = function (target, id) {
		nexacro.Style.call(this);
		if (target) {
			this._target = target;
		}
		this.axissize = null;
		this.labelalign = null;
		this.labelcolor = null;
		this.labelfont = null;
		this.labelpadding = null;
		this.labelrotate = null;
		this.markcolor = null;
		this.markfont = null;
		this.markline = null;
		this.markpadding = null;
		this.marksize = null;
		this.origincolor = null;
		this.originfont = null;
		this.originline = null;
		this.originpadding = null;
		this.originsize = null;
		this.ruleralign = null;
		this.rulermajorline = null;
		this.rulermajorsize = null;
		this.rulerminorline = null;
		this.rulerminorsize = null;
		this.scrollbarsize = null;
		this.titlealign = null;
		this.titlecolor = null;
		this.titlefont = null;
		this.titlepadding = null;
		this.titlerotate = null;
	};

	var _pAxisStyle = nexacro.ChartAxis_Style.prototype = nexacro._createPrototype(nexacro.Style, nexacro.ChartAxis_Style);

	_pAxisStyle._type_name = "ChartAxisStyle";

	eval(nexacro._createValueAttributeEvalStr("_pAxisStyle", "axissize"));
	eval(nexacro._createAlignAttributeEvalStr("_pAxisStyle", "labelalign"));
	eval(nexacro._createValueAttributeEvalStr("_pAxisStyle", "labelcolor"));
	eval(nexacro._createFontAttributeEvalStr("_pAxisStyle", "labelfont"));
	eval(nexacro._createPaddingAttributeEvalStr("_pAxisStyle", "labelpadding"));
	eval(nexacro._createValueAttributeEvalStr("_pAxisStyle", "labelrotate"));
	eval(nexacro._createValueAttributeEvalStr("_pAxisStyle", "markcolor"));
	eval(nexacro._createFontAttributeEvalStr("_pAxisStyle", "markfont"));
	eval(nexacro._createLineAttributeEvalStr("_pAxisStyle", "markline"));
	eval(nexacro._createPaddingAttributeEvalStr("_pAxisStyle", "markpadding"));
	eval(nexacro._createValueAttributeEvalStr("_pAxisStyle", "marksize"));
	eval(nexacro._createValueAttributeEvalStr("_pAxisStyle", "origincolor"));
	eval(nexacro._createFontAttributeEvalStr("_pAxisStyle", "originfont"));
	eval(nexacro._createLineAttributeEvalStr("_pAxisStyle", "originline"));
	eval(nexacro._createPaddingAttributeEvalStr("_pAxisStyle", "originpadding"));
	eval(nexacro._createValueAttributeEvalStr("_pAxisStyle", "originsize"));
	eval(nexacro._createAlignAttributeEvalStr("_pAxisStyle", "ruleralign"));
	eval(nexacro._createLineAttributeEvalStr("_pAxisStyle", "rulermajorline"));
	eval(nexacro._createValueAttributeEvalStr("_pAxisStyle", "rulermajorsize"));
	eval(nexacro._createLineAttributeEvalStr("_pAxisStyle", "rulerminorline"));
	eval(nexacro._createValueAttributeEvalStr("_pAxisStyle", "rulerminorsize"));
	eval(nexacro._createValueAttributeEvalStr("_pAxisStyle", "scrollbarsize"));
	eval(nexacro._createAlignAttributeEvalStr("_pAxisStyle", "titlealign"));
	eval(nexacro._createColorAttributeEvalStr("_pAxisStyle", "titlecolor"));
	eval(nexacro._createFontAttributeEvalStr("_pAxisStyle", "titlefont"));
	eval(nexacro._createPaddingAttributeEvalStr("_pAxisStyle", "titlepadding"));
	eval(nexacro._createValueAttributeEvalStr("_pAxisStyle", "titlerotate"));

	_pAxisStyle.__custom_emptyObject = function () {
		this.axissize = null;
		this.labelalign = null;
		this.labelcolor = null;
		this.labelfont = null;
		this.labelpadding = null;
		this.labelrotate = null;
		this.markcolor = null;
		this.markfont = null;
		this.markline = null;
		this.markpadding = null;
		this.marksize = null;
		this.origincolor = null;
		this.originfont = null;
		this.originline = null;
		this.originpadding = null;
		this.originsize = null;
		this.ruleralign = null;
		this.rulermajorline = null;
		this.rulermajorsize = null;
		this.rulerminorline = null;
		this.rulerminorsize = null;
		this.scrollbarsize = null;
		this.titlealign = null;
		this.titlecolor = null;
		this.titlefont = null;
		this.titlepadding = null;
		this.titlerotate = null;
	};

	_pAxisStyle.__get_custom_style_value = function () {
		var val = "";
		if (this.axissize && !this.axissize._is_empty) {
			val += "axissize:" + this.axissize._value + "; ";
		}
		if (this.labelalign && !this.labelalign._is_empty) {
			val += "labelalign:" + this.labelalign._value + "; ";
		}
		if (this.labelcolor && !this.labelcolor._is_empty) {
			val += "labelcolor:" + this.labelcolor._value + "; ";
		}
		if (this.labelfont && !this.labelfont._is_empty) {
			val += "labelfont:" + this.labelfont._value + "; ";
		}
		if (this.labelpadding && !this.labelpadding._is_empty) {
			val += "labelpadding:" + this.labelpadding._value + "; ";
		}
		if (this.labelrotate && !this.labelrotate._is_empty) {
			val += "labelrotate:" + this.labelrotate._value + "; ";
		}
		if (this.markcolor && !this.markcolor._is_empty) {
			val += "markcolor:" + this.markcolor._value + "; ";
		}
		if (this.markfont && !this.markfont._is_empty) {
			val += "markfont:" + this.markfont._value + "; ";
		}
		if (this.markpadding && !this.markpadding._is_empty) {
			val += "markpadding:" + this.markpadding._value + "; ";
		}
		if (this.marksize && !this.marksize._is_empty) {
			val += "marksize:" + this.marksize._value + "; ";
		}
		if (this.ruleralign && !this.ruleralign._is_empty) {
			val += "ruleralign:" + this.ruleralign._value + "; ";
		}
		if (this.rulermajorline && !this.rulermajorline._is_empty) {
			val += "rulermajorline:" + this.rulermajorline._value + "; ";
		}
		if (this.rulermajorsize && !this.rulermajorsize._is_empty) {
			val += "rulermajorsize:" + this.rulermajorsize._value + "; ";
		}
		if (this.rulerminorline && !this.rulerminorline._is_empty) {
			val += "rulerminorline:" + this.rulerminorline._value + "; ";
		}
		if (this.rulerminorsize && !this.rulerminorsize._is_empty) {
			val += "rulerminorsize:" + this.rulerminorsize._value + "; ";
		}
		if (this.scrollbarsize && !this.scrollbarsize._is_empty) {
			val += "scrollbarsize:" + this.scrollbarsize._value + "; ";
		}
		if (this.titlealign && !this.titlealign._is_empty) {
			val += "titlealign:" + this.titlealign._value + "; ";
		}
		if (this.titlecolor && !this.titlecolor._is_empty) {
			val += "titlecolor:" + this.titlecolor._value + "; ";
		}
		if (this.titlefont && !this.titlefont._is_empty) {
			val += "titlefont:" + this.titlefont._value + "; ";
		}
		if (this.titlepadding && !this.titlepadding._is_empty) {
			val += "titlepadding:" + this.titlepadding._value + "; ";
		}
		if (this.titlerotate && !this.titlerotate._is_empty) {
			val += "titlerotate:" + this.titlerotate._value + "; ";
		}

		return val;
	};

	nexacro.ChartAxis_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);
		this.axissize = null;
		this.labelalign = null;
		this.labelcolor = null;
		this.labelfont = null;
		this.labelpadding = null;
		this.labelrotate = null;
		this.markcolor = null;
		this.markfont = null;
		this.markline = null;
		this.markpadding = null;
		this.marksize = null;
		this.origincolor = null;
		this.originfont = null;
		this.originline = null;
		this.originpadding = null;
		this.originsize = null;
		this.ruleralign = null;
		this.rulermajorline = null;
		this.rulermajorsize = null;
		this.rulerminorline = null;
		this.rulerminorsize = null;
		this.scrollbarsize = null;
		this.titlealign = null;
		this.titlecolor = null;
		this.titlefont = null;
		this.titlepadding = null;
		this.titlerotate = null;
	};

	var _pAxisCurrentStyle = nexacro.ChartAxis_CurrentStyle.prototype = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.ChartAxis_CurrentStyle);

	_pAxisCurrentStyle._type_name = "ChartAxisCurrentStyle";

	_pAxisCurrentStyle.__custom_emptyObject = _pAxisStyle.__custom_emptyObject;
	_pAxisCurrentStyle.__get_custom_style_value = _pAxisStyle.__get_custom_style_value;

	_pAxisStyle = null;
	_pAxisCurrentStyle = null;

	nexacro.ChartSeries_Style = function (target, id) {
		nexacro.Style.apply(this, [target, id]);
		this.datatextalign = null;
		this.datatextbackground = null;
		this.datatextborder = null;
		this.datatextbordertype = null;
		this.datatextcolor = null;
		this.datatextfont = null;
		this.datatextgradation = null;
		this.datatextguideline = null;
		this.datatextguidesize = null;
		this.datatextguidetype = null;
		this.datatextlocation = null;
		this.datatextmargin = null;
		this.datatextpadding = null;
		this.extendorignline = null;
		this.fillbrush = null;
		this.fillgradation = null;
		this.fillhatch = null;
		this.miterjoinlimit = null;
		this.pointfillbrush = null;
		this.pointfillgradation = null;
		this.pointfillhatch = null;
		this.pointmiterjoinlimit = null;
		this.pointshape = null;
		this.pointsize = null;
		this.pointstrokecap = null;
		this.pointstrokejoin = null;
		this.pointstrokepen = null;
		this.selectcolor = null;
		this.selectdatatextbackground = null;
		this.selectdatatextborder = null;
		this.selectdatatextcolor = null;
		this.selectdatatextfont = null;
		this.selectdatatextgradation = null;
		this.selectdatatextguideline = null;
		this.selectfillbrush = null;
		this.selectfillgradation = null;
		this.selectfillhatch = null;
		this.selectfont = null;
		this.selectindent = null;
		this.selectstrokepen = null;
		this.selectpointsize = null;
		this.selectpointfillbrush = null;
		this.selectpointfillgradation = null;
		this.selectpointfillhatch = null;
		this.selectpointstrokepen = null;
		this.selectstrokepen = null;
		this.startangle = null;
		this.strokecap = null;
		this.strokejoin = null;
		this.strokepen = null;
	};

	var _pSeriesStyle = nexacro.ChartSeries_Style.prototype = nexacro._createPrototype(nexacro.Style, nexacro.ChartSeries_Style);

	_pSeriesStyle._type_name = "ChartSeriesStyle";

	eval(nexacro._createAlignAttributeEvalStr("_pSeriesStyle", "datatextalign"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pSeriesStyle", "datatextbackground"));
	eval(nexacro._createBorderAttributeEvalStr("_pSeriesStyle", "datatextborder"));
	eval(nexacro._createBordertypeAttributeEvalStr("_pSeriesStyle", "datatextbordertype"));
	eval(nexacro._createValueAttributeEvalStr("_pSeriesStyle", "datatextcolor"));
	eval(nexacro._createFontAttributeEvalStr("_pSeriesStyle", "datatextfont"));
	eval(nexacro._createGradationAttributeEvalStr("_pSeriesStyle", "datatextgradation"));
	eval(nexacro._createLineAttributeEvalStr("_pSeriesStyle", "datatextguideline"));
	eval(nexacro._createValueAttributeEvalStr("_pSeriesStyle", "datatextguidesize"));
	eval(nexacro._createValueAttributeEvalStr("_pSeriesStyle", "datatextguidetype"));
	eval(nexacro._createValueAttributeEvalStr("_pSeriesStyle", "datatextlocation"));
	eval(nexacro._createMarginAttributeEvalStr("_pSeriesStyle", "datatextmargin"));
	eval(nexacro._createPaddingAttributeEvalStr("_pSeriesStyle", "datatextpadding"));
	eval(nexacro._createValueAttributeEvalStr("_pSeriesStyle", "extendorignline"));
	eval(nexacro._createFillbrushAttributeEvalStr("_pSeriesStyle", "fillbrush"));
	eval(nexacro._createGradationAttributeEvalStr("_pSeriesStyle", "fillgradation"));
	eval(nexacro._createHatchAttributeEvalStr("_pSeriesStyle", "fillhatch"));
	eval(nexacro._createValueAttributeEvalStr("_pSeriesStyle", "miterjoinlimit"));
	eval(nexacro._createFillbrushAttributeEvalStr("_pSeriesStyle", "pointfillbrush"));
	eval(nexacro._createGradationAttributeEvalStr("_pSeriesStyle", "pointfillgradation"));
	eval(nexacro._createHatchAttributeEvalStr("_pSeriesStyle", "pointfillhatch"));
	eval(nexacro._createValueAttributeEvalStr("_pSeriesStyle", "pointmiterjoinlimit"));
	eval(nexacro._createValueAttributeEvalStr("_pSeriesStyle", "pointshape"));
	eval(nexacro._createValueAttributeEvalStr("_pSeriesStyle", "pointsize"));
	eval(nexacro._createValueAttributeEvalStr("_pSeriesStyle", "pointstrokecap"));
	eval(nexacro._createValueAttributeEvalStr("_pSeriesStyle", "pointstrokejoin"));
	eval(nexacro._createStrokepenAttributeEvalStr("_pSeriesStyle", "pointstrokepen"));
	eval(nexacro._createValueAttributeEvalStr("_pSeriesStyle", "selectcolor"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pSeriesStyle", "selectdatatextbackground"));
	eval(nexacro._createBorderAttributeEvalStr("_pSeriesStyle", "selectdatatextborder"));
	eval(nexacro._createValueAttributeEvalStr("_pSeriesStyle", "selectdatatextcolor"));
	eval(nexacro._createFontAttributeEvalStr("_pSeriesStyle", "selectdatatextfont"));
	eval(nexacro._createGradationAttributeEvalStr("_pSeriesStyle", "selectdatatextgradation"));
	eval(nexacro._createLineAttributeEvalStr("_pSeriesStyle", "selectdatatextguideline"));
	eval(nexacro._createFillbrushAttributeEvalStr("_pSeriesStyle", "selectfillbrush"));
	eval(nexacro._createGradationAttributeEvalStr("_pSeriesStyle", "selectfillgradation"));
	eval(nexacro._createHatchAttributeEvalStr("_pSeriesStyle", "selectfillhatch"));
	eval(nexacro._createFontAttributeEvalStr("_pSeriesStyle", "selectfont"));
	eval(nexacro._createValueAttributeEvalStr("_pSeriesStyle", "selectindent"));
	eval(nexacro._createStrokepenAttributeEvalStr("_pSeriesStyle", "selectstrokepen"));
	eval(nexacro._createLineAttributeEvalStr("_pSeriesStyle", "selectpointsize"));
	eval(nexacro._createFillbrushAttributeEvalStr("_pSeriesStyle", "selectpointfillbrush"));
	eval(nexacro._createGradationAttributeEvalStr("_pSeriesStyle", "selectpointfillgradation"));
	eval(nexacro._createHatchAttributeEvalStr("_pSeriesStyle", "selectpointfillhatch"));
	eval(nexacro._createStrokepenAttributeEvalStr("_pSeriesStyle", "selectpointstrokepen"));
	eval(nexacro._createStrokepenAttributeEvalStr("_pSeriesStyle", "selectstrokepen"));
	eval(nexacro._createValueAttributeEvalStr("_pSeriesStyle", "startangle"));
	eval(nexacro._createValueAttributeEvalStr("_pSeriesStyle", "strokecap"));
	eval(nexacro._createValueAttributeEvalStr("_pSeriesStyle", "strokejoin"));
	eval(nexacro._createStrokepenAttributeEvalStr("_pSeriesStyle", "strokepen"));

	_pSeriesStyle.__custom_emptyObject = function () {
		this.datatextalign = null;
		this.datatextbackground = null;
		this.datatextborder = null;
		this.datatextbordertype = null;
		this.datatextcolor = null;
		this.datatextfont = null;
		this.datatextgradation = null;
		this.datatextguideline = null;
		this.datatextguidesize = null;
		this.datatextguidetype = null;
		this.datatextlocation = null;
		this.datatextmargin = null;
		this.datatextpadding = null;
		this.extendorignline = null;
		this.fillbrush = null;
		this.fillgradation = null;
		this.fillhatch = null;
		this.miterjoinlimit = null;
		this.pointfillbrush = null;
		this.pointfillgradation = null;
		this.pointfillhatch = null;
		this.pointmiterjoinlimit = null;
		this.pointshape = null;
		this.pointsize = null;
		this.pointstrokecap = null;
		this.pointstrokejoin = null;
		this.pointstrokepen = null;
		this.selectcolor = null;
		this.selectdatatextbackground = null;
		this.selectdatatextborder = null;
		this.selectdatatextcolor = null;
		this.selectdatatextfont = null;
		this.selectdatatextgradation = null;
		this.selectdatatextguideline = null;
		this.selectfillbrush = null;
		this.selectfillgradation = null;
		this.selectfillhatch = null;
		this.selectfont = null;
		this.selectindent = null;
		this.selectstrokepen = null;
		this.selectpointsize = null;
		this.selectpointfillbrush = null;
		this.selectpointfillgradation = null;
		this.selectpointfillhatch = null;
		this.selectpointstrokepen = null;
		this.selectstrokepen = null;
		this.startangle = null;
		this.strokecap = null;
		this.strokejoin = null;
		this.strokepen = null;
	};

	_pSeriesStyle.__get_custom_style_value = function () {
		var val = "";
		if (this.datatextalign && !this.datatextalign._is_empty) {
			val += "datatextalign:" + this.datatextalign._value + "; ";
		}
		if (this.datatextbackground && !this.datatextbackground._is_empty) {
			val += "datatextbackground:" + this.datatextbackground._value + "; ";
		}
		if (this.datatextborder && !this.datatextborder._is_empty) {
			val += "datatextborder:" + this.datatextborder._value + "; ";
		}
		if (this.datatextbordertype && !this.datatextbordertype._is_empty) {
			val += "datatextbordertype:" + this.datatextbordertype._value + "; ";
		}
		if (this.datatextcolor && !this.datatextcolor._is_empty) {
			val += "datatextcolor:" + this.datatextcolor._value + "; ";
		}
		if (this.datatextfont && !this.datatextfont._is_empty) {
			val += "datatextfont:" + this.datatextfont._value + "; ";
		}
		if (this.datatextgradation && !this.datatextgradation._is_empty) {
			val += "datatextgradation:" + this.datatextgradation._value + "; ";
		}
		if (this.datatextguideline && !this.datatextguideline._is_empty) {
			val += "datatextguideline:" + this.datatextguideline._value + "; ";
		}
		if (this.datatextguidesize && !this.datatextguidesize._is_empty) {
			val += "datatextguidesize:" + this.datatextguidesize._value + "; ";
		}
		if (this.datatextlocation && !this.datatextguidetype._is_empty) {
			val += "datatextguidetype:" + this.datatextguidetype._value + "; ";
		}
		if (this.datatextlocation && !this.datatextlocation._is_empty) {
			val += "datatextlocation:" + this.datatextlocation._value + "; ";
		}
		if (this.datatextmargin && !this.datatextmargin._is_empty) {
			val += "datatextmargin:" + this.datatextmargin._value + "; ";
		}
		if (this.datatextpadding && !this.datatextpadding._is_empty) {
			val += "datatextpadding:" + this.datatextpadding._value + "; ";
		}
		if (this.extendorignline && !this.extendorignline._is_empty) {
			val += "extendorignline:" + this.extendorignline._value + "; ";
		}
		if (this.fillbrush && !this.fillbrush._is_empty) {
			val += "fillbrush:" + this.fillbrush._value + "; ";
		}
		if (this.fillgradation && !this.fillgradation._is_empty) {
			val += "fillgradation:" + this.fillgradation._value + "; ";
		}
		if (this.fillhatch && !this.fillhatch._is_empty) {
			val += "fillhatch:" + this.fillhatch._value + "; ";
		}
		if (this.miterjoinlimit && !this.miterjoinlimit._is_empty) {
			val += "miterjoinlimit:" + this.miterjoinlimit._value + "; ";
		}
		if (this.pointfillbrush && !this.pointfillbrush._is_empty) {
			val += "pointfillbrush:" + this.pointfillbrush._value + "; ";
		}
		if (this.pointfillgradation && !this.pointfillgradation._is_empty) {
			val += "pointfillgradation:" + this.pointfillgradation._value + "; ";
		}
		if (this.pointfillhatch && !this.pointfillhatch._is_empty) {
			val += "pointfillhatch:" + this.pointfillhatch._value + "; ";
		}
		if (this.pointmiterjoinlimit && !this.pointmiterjoinlimit._is_empty) {
			val += "pointmiterjoinlimit:" + this.pointmiterjoinlimit._value + "; ";
		}
		if (this.pointshape && !this.pointshape._is_empty) {
			val += "pointshape:" + this.pointshape._value + "; ";
		}
		if (this.pointsize && !this.pointsize._is_empty) {
			val += "pointsize:" + this.pointsize._value + "; ";
		}
		if (this.pointstrokecap && !this.pointstrokecap._is_empty) {
			val += "pointstrokecap:" + this.pointstrokecap._value + "; ";
		}
		if (this.pointstrokejoin && !this.pointstrokejoin._is_empty) {
			val += "pointstrokejoin:" + this.pointstrokejoin._value + "; ";
		}
		if (this.pointstrokepen && !this.pointstrokepen._is_empty) {
			val += "pointstrokepen:" + this.pointstrokepen._value + "; ";
		}
		if (this.selectcolor && !this.selectcolor._is_empty) {
			val += "selectcolor:" + this.selectcolor._value + "; ";
		}
		if (this.selectdatatextbackground && !this.selectdatatextbackground._is_empty) {
			val += "selectdatatextbackground:" + this.selectdatatextbackground._value + "; ";
		}
		if (this.selectdatatextborder && !this.selectdatatextborder._is_empty) {
			val += "selectdatatextborder:" + this.selectdatatextborder._value + "; ";
		}
		if (this.selectdatatextcolor && !this.selectdatatextcolor._is_empty) {
			val += "selectdatatextcolor:" + this.selectdatatextcolor._value + "; ";
		}
		if (this.selectdatatextfont && !this.selectdatatextfont._is_empty) {
			val += "selectdatatextfont:" + this.selectdatatextfont._value + "; ";
		}
		if (this.selectdatatextgradation && !this.selectdatatextgradation._is_empty) {
			val += "selectdatatextgradation:" + this.selectdatatextgradation._value + "; ";
		}
		if (this.selectdatatextguideline && !this.selectdatatextguideline._is_empty) {
			val += "selectdatatextguideline:" + this.selectdatatextguideline._value + "; ";
		}
		if (this.selectfillbrush && !this.selectfillbrush._is_empty) {
			val += "selectfillbrush:" + this.selectfillbrush._value + "; ";
		}
		if (this.selectfillgradation && !this.selectfillgradation._is_empty) {
			val += "selectfillgradation:" + this.selectfillbrush._value + "; ";
		}
		if (this.selectfillhatch && !this.selectfillhatch._is_empty) {
			val += "selectfillhatch:" + this.selectfillhatch._value + "; ";
		}
		if (this.selectfont && !this.selectfont._is_empty) {
			val += "selectfont:" + this.selectfont._value + "; ";
		}
		if (this.selectindent && !this.selectindent._is_empty) {
			val += "selectindent:" + this.selectfont._value + "; ";
		}
		if (this.selectstrokepen && !this.selectstrokepen._is_empty) {
			val += "selectstrokepen:" + this.selectstrokepen._value + "; ";
		}
		if (this.selectpointsize && !this.selectpointsize._is_empty) {
			val += "selectpointsize:" + this.selectpointsize._value + "; ";
		}
		if (this.selectpointfillbrush && !this.selectpointfillbrush._is_empty) {
			val += "selectpointfillbrush:" + this.selectpointfillbrush._value + "; ";
		}
		if (this.selectpointfillgradation && !this.selectpointfillgradation._is_empty) {
			val += "selectpointfillgradation:" + this.selectpointfillgradation._value + "; ";
		}
		if (this.selectpointfillhatch && !this.selectpointfillhatch._is_empty) {
			val += "selectpointfillhatch:" + this.selectpointfillhatch._value + "; ";
		}
		if (this.selectpointstrokepen && !this.selectpointstrokepen._is_empty) {
			val += "selectpointstrokepen:" + this.selectpointstrokepen._value + "; ";
		}
		if (this.selectstrokepen && !this.selectstrokepen._is_empty) {
			val += "selectstrokepen:" + this.selectstrokepen._value + "; ";
		}
		if (this.startangle && !this.startangle._is_empty) {
			val += "startangle:" + this.startangle._value + "; ";
		}
		if (this.strokecap && !this.strokecap._is_empty) {
			val += "strokecap:" + this.strokecap._value + "; ";
		}
		if (this.strokejoin && !this.strokejoin._is_empty) {
			val += "strokejoin:" + this.strokejoin._value + "; ";
		}
		if (this.strokepen && !this.strokepen._is_empty) {
			val += "strokepen:" + this.strokepen._value + "; ";
		}
		return val;
	};

	nexacro.ChartSeries_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);
		this.datatextalign = null;
		this.datatextbackground = null;
		this.datatextborder = null;
		this.datatextbordertype = null;
		this.datatextcolor = null;
		this.datatextfont = null;
		this.datatextgradation = null;
		this.datatextguideline = null;
		this.datatextguidesize = null;
		this.datatextguidetype = null;
		this.datatextlocation = null;
		this.datatextmargin = null;
		this.datatextpadding = null;
		this.extendorignline = null;
		this.fillbrush = null;
		this.fillgradation = null;
		this.fillhatch = null;
		this.miterjoinlimit = null;
		this.pointfillbrush = null;
		this.pointfillgradation = null;
		this.pointfillhatch = null;
		this.pointmiterjoinlimit = null;
		this.pointshape = null;
		this.pointsize = null;
		this.pointstrokecap = null;
		this.pointstrokejoin = null;
		this.pointstrokepen = null;
		this.selectcolor = null;
		this.selectdatatextbackground = null;
		this.selectdatatextborder = null;
		this.selectdatatextcolor = null;
		this.selectdatatextfont = null;
		this.selectdatatextgradation = null;
		this.selectdatatextguideline = null;
		this.selectfillbrush = null;
		this.selectfillgradation = null;
		this.selectfillhatch = null;
		this.selectfont = null;
		this.selectindent = null;
		this.selectstrokepen = null;
		this.selectpointsize = null;
		this.selectpointfillbrush = null;
		this.selectpointfillgradation = null;
		this.selectpointfillhatch = null;
		this.selectpointstrokepen = null;
		this.selectstrokepen = null;
		this.startangle = null;
		this.strokecap = null;
		this.strokejoin = null;
		this.strokepen = null;
	};

	var _pSeriesCurrentStyle = nexacro.ChartSeries_CurrentStyle.prototype = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.ChartSeries_CurrentStyle);

	_pSeriesCurrentStyle._type_name = "ChartSeriesCurrentStyle";

	_pSeriesCurrentStyle.__custom_emptyObject = _pSeriesStyle.__custom_emptyObject;
	_pSeriesCurrentStyle.__get_custom_style_value = _pSeriesStyle.__get_custom_style_value;

	_pSeriesStyle = null;
	_pSeriesCurrentStyle = null;
}
