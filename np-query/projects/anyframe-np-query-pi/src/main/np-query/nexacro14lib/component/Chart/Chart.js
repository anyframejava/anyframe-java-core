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

if (!nexacro.Chart) {
	nexacro.Chart = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._serieses = [];
		this._draw_area = new nexacro.Rect();
		this._data_area = new nexacro.Rect();
	};
	var _pChart = nexacro.Chart.prototype = nexacro._createPrototype(nexacro.Component, nexacro.Chart);
	_pChart._type_name = "Chart";

	_pChart.seriesset = null;
	_pChart._draw_area = null;
	_pChart._draw_area = null;
	_pChart._recalc_flag = false;
	_pChart._item_start = 0;
	_pChart._item_cnt = 0;
	_pChart._item_div = 0;
	_pChart._barcnt = 0;
	_pChart.binddataset = null;
	_pChart._binddataset = null;
	_pChart.scrollmax = 0;
	_pChart.scrollvisible = "none";
	_pChart.viewcount = 5;
	_pChart.viewmin = 0;
	_pChart.viewmax = 4;
	_pChart.board = null;
	_pChart.legend = null;
	_pChart.title = null;
	_pChart.xaxis = null;
	_pChart.yaxis = null;
	_pChart.y2axis = null;

	_pChart.on_create_contents = function () {
		this.board && this.board.createComponent();
		if (this.seriesset) {
			var len = this.seriesset.length;
			for (var i = 0; i < len; i++) {
				this.seriesset[i].createComponent();
			}
		}
		this.xaxis && this.xaxis.createComponent();
		this.yaxis && this.yaxis.createComponent();
		this.y2axis && this.y2axis.createComponent();
		this.legend && this.legend.createComponent();
		this.title && this.title.createComponent();
	};

	_pChart.on_created_contents = function () {
		this.board && this.board.on_created();
		if (this.seriesset) {
			var len = this.seriesset.length;
			for (var i = 0; i < len; i++) {
				this.seriesset[i].on_created();
			}
		}

		this.xaxis && this.xaxis.on_created();
		this.yaxis && this.yaxis.on_created();
		this.y2axis && this.y2axis.on_created();
		this.legend && this.legend.on_created();
		this.title && this.title.on_created();

		var thisP = this;
		this._refform._setEventHandler("onload", function () {
			thisP._recalcLayout();
			if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 8) {
				thisP.title.redraw();
			}
		});

		if (this._refform._type_name !== "Form") {
			if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
				this._recalcLayout();
			}
		}
	};

	_pChart.on_destroy_contents = function () {
		if (this.seriesset) {
			var len = this.seriesset.length;
			for (var i = 0; i < len; i++) {
				this.seriesset[i].destroy();
				this.seriesset[i] = null;
			}
		}
		this._clearAll();
	};
	_pChart.on_create_custom_style = function () {
		return new nexacro.Chart_Style(this);
	};

	_pChart.on_create_custom_currentStyle = function () {
		return new nexacro.Chart_CurrentStyle();
	};

	_pChart.on_apply_custom_pseudo = function (pseudo) {
		var pseudo = this._pseudo;
		var curstyle = this.currentstyle;

		curstyle.font = this.on_find_CurrentStyle_font(pseudo);
		curstyle.color = this.on_find_CurrentStyle_color(pseudo);
		curstyle.align = this.on_find_CurrentStyle_align(pseudo);
		curstyle.padding = this.on_find_CurrentStyle_padding(pseudo);

		curstyle.baritemminsize = this.on_find_CurrentStyle_barItemSize(pseudo);
		curstyle.baritemspacing = this.on_find_CurrentStyle_barItemSpacing(pseudo);
		curstyle.barspacing = this.on_find_CurrentStyle_barSpacing(pseudo);
		curstyle.lineextendorigin = this.on_find_CurrentStyle_lineExtendOrigin(pseudo);
		curstyle.scrollbarsize = this.on_find_CurrentStyle_scrollbarSize(pseudo);
		curstyle.seriesextendaxis = this.on_find_CurrentStyle_seriesExtendAxis(pseudo);
	};

	_pChart.on_update_style_baritemminsize = function () {
		this.currentstyle.baritemminsize = this.on_find_CurrentStyle_barItemSize(this._pseudo);
		this.on_updateDataAreaLayout();
	};

	_pChart.on_update_style_baritemspacing = function () {
		this.currentstyle.baritemspacing = this.on_find_CurrentStyle_barItemSpacing(this._pseudo);
		this.on_updateDataAreaLayout();
	};

	_pChart.on_update_style_barspacing = function () {
		this.currentstyle.barspacing = this.on_find_CurrentStyle_barSpacing(this._pseudo);
		this.on_updateDataAreaLayout();
	};

	_pChart.on_update_style_lineextendorigin = function () {
		this.currentstyle.lineextendorigin = this.on_find_CurrentStyle_lineExtendOrigin(this._pseudo);
	};

	_pChart.on_update_style_scrollbarsize = function () {
		this.currentstyle.scrollbarsize = this.on_find_CurrentStyle_scrollbarSize(this._pseudo);
	};

	_pChart.on_update_style_seriesextendaxis = function () {
		this.currentstyle.seriesextendaxis = this.on_find_CurrentStyle_seriesExtendAxis(this._pseudo);
	};

	_pChart.on_find_CurrentStyle_barItemSize = function (pseudo) {
		return this._find_pseudo_obj("baritemminsize", pseudo);
	};

	_pChart.on_find_CurrentStyle_barItemSpacing = function (pseudo) {
		return this._find_pseudo_obj("baritemspacing", pseudo);
	};

	_pChart.on_find_CurrentStyle_barSpacing = function (pseudo) {
		return this._find_pseudo_obj("barspacing", pseudo);
	};

	_pChart.on_find_CurrentStyle_lineExtendOrigin = function (pseudo) {
		return this._find_pseudo_obj("lineextendorigin", pseudo);
	};

	_pChart.on_find_CurrentStyle_scrollbarSize = function (pseudo) {
		return this._find_pseudo_obj("scrollbarsize", pseudo);
	};

	_pChart.on_find_CurrentStyle_seriesExtendAxis = function (pseudo) {
		return this._find_pseudo_obj("seriesextendaxis", pseudo);
	};

	_pChart._clearAll = function () {
		if (this.board) {
			this.board.destroy();
			this.board = null;
		}
		if (this.legend) {
			this.legend.destroy();
			this.legend = null;
		}
		if (this.title) {
			this.title.destroy();
			this.title = null;
		}
		if (this.xaxis) {
			this.xaxis.destroy();
			this.xaxis = null;
		}
		if (this.yaxis) {
			this.yaxis.destroy();
			this.yaxis = null;
		}
		if (this.y2axis) {
			this.y2axis.destroy();
			this.y2axis = null;
		}
	};

	_pChart.appendSeries = function (type, name, col) {
		if (window.ChartSeriesTypes[type]) {
			var seriesset;
			if (!this.seriesset) {
				seriesset = this.seriesset = new nexacro.Collection();
			}
			else {
				seriesset = this.seriesset;
			}

			var length = seriesset.length;
			for (var i = 0; i < length; i++) {
				seriesset[i]._canvas.clearRect();
			}

			var series = new nexacro.ChartSeries(name, "absolute", 0, 0, 0, 0, null, null, this);
			series.set_data(col);
			series.set_type(type);
			series._type_name += name;
			series.on_created();
			seriesset.add(name, series);

			if (this.enableredraw) {
				this.on_updateDataAreaLayout();
				this._recalcLayout();
				if (nexacro.BrowserVersion < 8) {
					this.legend.redraw();
				}
			}

			return this.seriesset.length - 1;
		}
		else {
			this._setContents(type);
			return this.seriesset.length - 1;
		}
		return -1;
	};

	_pChart.deleteSeries = function (id, cnt) {
		if (cnt == null) {
			var idx = parseInt(id) | 0;
			var item;
			if (isFinite(idx)) {
				item = this.seriesset.get_item(this.seriesset.get_id(id));
			}
			else {
				idx = nexacro._indexOf(this.seriesset, id);
				item = this.seriesset.get_item(id);
			}
			var beflen = this.seriesset.length;
			if (item) {
				item.destroy();
				this.seriesset.deleteItem(idx);

				if (this.enableredraw) {
					this.on_updateChartAreaLayout();
					this._recalcLayout();
				}
				return beflen - this.seriesset.length;
			}
		}
		else {
			var idx = parseInt(id) | 0;
			var end = parseInt(cnt) | 0;
			if (!isFinite(idx)) {
				idx = nexacro._indexOf(this.seriesset, idx);
			}

			if (idx >= 0) {
				var beflen = this.seriesset.length;
				end += idx;
				for (var i = idx; i < end; i++) {
					item = this.seriesset.get_item(this.seriesset.get_id(i));
					if (item) {
						item.destroy();
					}
				}
				for (var i = idx; i < end; i++) {
					this.seriesset.deleteItem(idx);
				}

				if (this.enableredraw) {
					this.on_updateChartAreaLayout();
					this._recalcLayout();
				}
				return beflen - this.seriesset.length;
			}
		}
		return 0;
	};

	_pChart.set_enableredraw = function (v) {
		this.enableredraw = (v == true);
		if (this.enableredraw) {
			this._recalcLayout();
			this.on_updateChartAreaLayout();

			if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
				this.title.redraw();
			}
		}
		return v;
	};

	_pChart._setContents = function (str) {
		this._clearAll();
		if (str.length) {
			var doc = nexacro._parseXMLDocument("<Chart>" + str + "</Chart>");
			if (doc) {
				var elems = doc.getElementsByTagName("ChartBoard");
				if (elems.length > 0) {
					this.set_board(new nexacro.ChartBoard("board", "absolute", 0, 0, 0, 0, null, null, this));
					this.board._loadFromDOM(elems[0]);
				}

				elems = doc.getElementsByTagName("ChartSeries");
				if (elems.length > 0) {
					var seriesset;
					seriesset = this.seriesset = new nexacro.Collection();
					var len = elems.length;
					for (var i = 0; i < len; i++) {
						var serieselem = elems[i];
						var seriesId = serieselem.getAttribute("id");
						var series = new nexacro.ChartSeries(seriesId, "absolute", 0, 0, 0, 0, null, null, this);
						seriesset.add(seriesId, series);
						series._loadFromDOM(serieselem);
					}
				}

				elems = doc.getElementsByTagName("ChartTitle");
				if (elems.length > 0) {
					this.set_title(new nexacro.ChartTitle("title", "absolute", 0, 0, 0, 0, null, null, this));
					this.title._loadFromDOM(elems[0]);
				}

				elems = doc.getElementsByTagName("ChartLegend");
				if (elems.length > 0) {
					this.set_legend(new nexacro.ChartLegend("legend", "absolute", 0, 0, 0, 0, null, null, this));
					this.legend._loadFromDOM(elems[0]);
				}

				elems = doc.getElementsByTagName("ChartAxis");
				if (elems.length > 0) {
					var len = elems.length;
					for (var i = 0; i < len; i++) {
						var axiselem = elems[i];
						var axisId = axiselem.getAttribute("id");
						if (axisId == "xaxis") {
							this.set_xaxis(new nexacro.ChartAxis(axisId, "absolute", 0, 0, 0, 0, null, null, this));
							this.xaxis._loadFromDOM(axiselem);
						}
						else if (axisId == "yaxis") {
							this.set_yaxis(new nexacro.ChartAxis(axisId, "absolute", 0, 0, 0, 0, null, null, this));
							this.yaxis._loadFromDOM(axiselem);
						}
						else if (axisId == "y2axis") {
							this.set_y2axis(new nexacro.ChartAxis(axisId, "absolute", 0, 0, 0, 0, null, null, this));
							this.y2axis._loadFromDOM(axiselem);
						}
					}
				}
			}
		}
	};

	_pChart._recalcXAxisItemInfos = function (rc) {
		var data_rc = rc.clone();

		if (this.board) {
			var border = this.board.currentstyle.border;
			if (border && !border._is_empty) {
				data_rc.left += border._left_width;
				data_rc.top += border._top_width;
				data_rc.right -= border._right_width;
				data_rc.bottom -= border._bottom_width;
			}
		}

		this._data_area.copy(data_rc);

		var xaxis = this.xaxis;
		if (xaxis) {
			var items = this.xaxis._items;
			var base_width = data_rc.right - data_rc.left;
			var base_height = data_rc.bottom - data_rc.top;

			var autofit = this.autofit;
			var item_cnt = 0, item_start = 0;
			if (autofit) {
				item_cnt = items.length;
			}
			else {
				item_cnt = this.viewcount;
				item_start = this.viewmin;
			}

			this._item_start = item_start;
			this._item_cnt = item_cnt;

			var main_line = xaxis.currentstyle.rulermajorline;
			var item_div = (base_width - (main_line ? main_line._width : 0)) / item_cnt;
			this._item_div = item_div;
		}
	};

	_pChart._recalcSeriesInfos = function () {
		var seriesset = this.seriesset;
		if (!seriesset) {
			return;
		}
		var series_cnt = seriesset.length;
		if (series_cnt == 0) {
			return;
		}

		var item_div = Math.floor(this._item_div);

		var barcnt = 0, series;

		for (var i = 0; i < series_cnt; i++) {
			series = seriesset[i];
			if (series.type == "bar") {
				barcnt++;
			}
		}

		if (barcnt > 0) {
			var curstyle = this.currentstyle;
			var barspacing = nexacro.getStyleValueInt(curstyle.barspacing, 2);
			var baritemspacing = nexacro.getStyleValueInt(curstyle.baritemspacing, 1);
			var baritemminsize = nexacro.getStyleValueInt(curstyle.baritemminsize, 6);
			var bar_width = 0;
			var item_tot_space = (barcnt - 1) * baritemspacing;

			var space = Math.floor(item_div * (barspacing / 100));
			var bar_tot_width = item_div - space - item_tot_space;

			bar_width = Math.floor(bar_tot_width / barcnt);
			if (bar_width < baritemminsize) {
				bar_width = baritemminsize;
			}

			var tot_space = item_div - barcnt * bar_width;
			if (tot_space < 0) {
				barspacing = 0;
				baritemspacing = 0;
			}
			else if (tot_space < item_tot_space) {
				baritemspacing--;
				item_tot_space = (barcnt - 1) * baritemspacing;
				barspacing = tot_space - item_tot_space;
			}
			else {
				barspacing = tot_space - item_tot_space;
			}

			var offset = Math.floor(barspacing / 2);
			for (var i = 0; i < series_cnt; i++) {
				series = seriesset[i];
				if (series.type == "bar") {
					series._bar_item_offset = offset;
					series._bar_item_width = bar_width;
					offset += bar_width + baritemspacing;
				}
			}
		}
	};

	_pChart._recalcDrawAreaLayout = function (rc) {
		this._draw_area.copy(rc);
		if (this.xaxis) {
			this.xaxis._recalcLayout(rc);
		}

		if (this.yaxis) {
			this.yaxis._recalcLayout(rc);
		}

		if (this.y2axis) {
			this.y2axis._recalcLayout(rc);
		}

		this._recalcXAxisItemInfos(rc);

		if (this.board) {
			this.board._movePositionWithBound(rc);
		}

		if (this.xaxis) {
			this.xaxis._movePositionWithBound(rc);
		}

		if (this.yaxis) {
			this.yaxis._movePositionWithBound(rc);
		}

		if (this.y2axis) {
			this.y2axis._movePositionWithBound(rc);
		}

		this._recalcSeriesInfos();

		var seriesset = this.seriesset;
		if (!seriesset) {
			return;
		}
		var series_cnt = seriesset.length;
		for (var i = 0; i < series_cnt; i++) {
			series = seriesset[i];
			series._movePositionWithBound(this._data_area);
		}
	};

	_pChart._recalcLayout = function () {
		if (this.enableredraw == false) {
			return;
		}

		var w = 0, h = 0;
		w = this._client_width;
		h = this._client_height;

		var rc = new nexacro.Rect(0, 0, w, h);

		this._recalc_flag = true;
		if (this.title) {
			this.title._recalcLayout();
			this.title._movePositionWithBound(rc);
		}
		if (this.legend) {
			this.legend._recalcLayout();
			this.legend._movePositionWithBound(rc);
		}
		this._recalcDrawAreaLayout(rc);
		this._recalc_flag = false;
	};

	_pChart.on_updateLegendLayout = function () {
		if (this.enableredraw == false) {
			return;
		}
		if (this._recalc_flag) {
			return;
		}

		var rc = new nexacro.Rect(0, 0, this._client_width, this._client_height);

		this._recalc_flag = true;
		if (this.title) {
			this.title._clipArea(rc);
		}
		if (this.legend) {
			this.legend._movePositionWithBound(rc);
		}
		if (!this._draw_area.isSame(rc)) {
			this._recalcDrawAreaLayout(rc);
		}
		this._recalc_flag = false;
	};

	_pChart.on_updateDrawAreaLayout = function () {
		if (this.enableredraw == false) {
			return;
		}
		if (this._recalc_flag) {
			return;
		}
		this._recalc_flag = true;
		var rc = this._draw_area.clone();
		this._recalcDrawAreaLayout(rc);
		this._recalc_flag = false;
	};

	_pChart.on_updateDataAreaLayout = function () {
		if (this.enableredraw == false) {
			return;
		}
		if (this._recalc_flag) {
			return;
		}
		this._recalc_flag = true;
		this._recalcSeriesInfos();

		var seriesset = this.seriesset;
		var series_cnt = seriesset ? seriesset.length : 0;
		for (var i = 0; i < series_cnt; i++) {
			series = seriesset[i];
			series.redraw();
		}
		this._recalc_flag = false;
	};

	_pChart.on_updateChartAreaLayout = function () {
		if (this.enableredraw == false) {
			return;
		}
		this.on_updateDrawAreaLayout();
		this.on_updateDataAreaLayout();
		this.xaxis && this.xaxis.ondraw(this.xaxis._canvas);

		if (nexacro.BrowserVersion < 8) {
			this.legend.redraw();
		}
	};

	_pChart.setBindDataset = function (obj) {
		if (obj instanceof nexacro.Dataset) {
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

	_pChart.getBindDataset = function () {
		return this._binddataset;
	};

	_pChart.set_binddataset = function (str) {
		if (typeof str != "string") {
			this.setBindDataset(str);
			return;
		}
		if (str != this.binddataset) {
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

	_pChart.on_apply_binddataset = function () {
		var dataset = this._binddataset;
		var control = this.getElement();

		if (control && dataset) {
			this.on_updateChartAreaLayout();
			var callback = this._callbackFromDataset;
			dataset._addEventHandler(this, callback);
			dataset._addEventHandler(this, callback);
			dataset._addEventHandler(this, callback);
		}
	};

	_pChart._callbackFromDataset = function (obj, e) {
		if (e.eventid == "oncolumnchanged") {
			this.on_updateChartAreaLayout();
		}
	};

	_pChart.set_scrollmax = function (v) {
		if (v != this.scrollmax) {
			this.scrollmax = v;
		}
		return v;
	};


	_pChart.set_scrollvisible = function (v) {
		if (v != this.scrollvisible) {
			this.scrollvisible = v;
		}
		return v;
	};

	_pChart.set_viewcount = function (v) {
		var val = parseInt(v) | 0;
		var control = this.getElement();

		if (val != this.viewcount) {
			this.viewcount = val;
			if (control) {
				this.viewmax = this.viewcount - this.viewmin - 1;
				this.on_updateChartAreaLayout();
			}
		}
		return v;
	};

	_pChart.set_viewmin = function (v) {
		var val = parseInt(v) | 0;
		var control = this.getElement();

		if (val != this.viewmin && val >= 0) {
			this.viewmin = val;
			if (control) {
				this.viewmax = val + this.viewcount - 1;
				this.on_updateChartAreaLayout();
			}
		}
		return v;
	};

	_pChart.set_viewmax = function (v) {
		var val = parseInt(v) | 0;

		if (val != this.viewmax) {
			this.viewmax = val;
			if (this._control_element) {
				this.viewcount = val - this.viewmin + 1;
				this.on_updateChartAreaLayout();
			}
		}
		return v;
	};

	_pChart.set_board = function (v) {
		if ((typeof v) == "string") {
			return;
		}
		if (v != this.board) {
			this.board = v;
		}
		return v;
	};

	_pChart.set_legend = function (v) {
		if ((typeof v) == "string") {
			return;
		}
		if (v != this.legend) {
			this.legend = v;
		}
		return v;
	};


	_pChart.set_title = function (v) {
		if ((typeof v) == "string") {
			return;
		}
		if (v != this.title) {
			this.title = v;
		}
		return v;
	};

	_pChart.set_xaxis = function (v) {
		if ((typeof v) == "string") {
			return;
		}
		if (v != this.xaxis) {
			this.xaxis = v;
		}
		return v;
	};

	_pChart.set_yaxis = function (v) {
		if ((typeof v) == "string") {
			return;
		}
		if (v != this.yaxis) {
			this.yaxis = v;
		}
		return v;
	};

	_pChart.set_y2axis = function (v) {
		if ((typeof v) == "string") {
			return;
		}
		if (v != this.y2axis) {
			this.y2axis = v;
		}
		return v;
	};

	_pChart._drawMark = function (canvas, x, y, markshape, marksize, fillcolor, borderpen) {
		if (fillcolor != "" || borderpen != "") {
			canvas.save();

			switch (markshape) {
				case "rectangle":
					if (fillcolor != "") {
						canvas.setElementFillStyle(fillcolor);
						canvas.fillRect(x, y, marksize, marksize);
					}
					if (borderpen) {
						canvas._setPenStyle(borderpen);
						canvas.drawStrokeInsetRect(x, y, marksize, marksize);
					}
					break;
				case "circle":
					gap = marksize / 2;
					if (fillcolor != "") {
						canvas.setElementFillStyle(fillcolor);
						canvas.drawFillCircle(x + gap, y + gap, gap);
					}
					if (borderpen) {
						canvas._setPenStyle(borderpen);
						canvas.drawStrokeInsetCircle(x + gap, y + gap, gap);
					}
					break;
				case "horzline":
					if (fillcolor != "") {
						canvas.setElementFillStyle(fillcolor);

						var lw = Math.floor(marksize / 3);
						var offset = Math.floor((marksize - lw) / 2);

						canvas.fillRect(x, y + offset, marksize, lw);
					}
					break;
				case "vertline":
					if (fillcolor != "") {
						canvas.setElementFillStyle(fillcolor);
						var lw = marksize / 3;
						var offset = (marksize - lw) / 2;
						canvas.fillRect(x + offset, y, lw, marksize);
					}
					break;
				case "crossline":
					if (fillcolor != "") {
						canvas.setElementFillStyle(fillcolor);
						var lw = marksize / 3;
						var offset = (marksize - lw) / 2;
						canvas.fillRect(x, y + offset, marksize, lw);
						canvas.fillRect(x + offset, y, lw, marksize);
					}
					break;
				case "rhombus":
					if (fillcolor != "") {
						canvas.setElementFillStyle(fillcolor);
						var center = marksize / 2;
						canvas.moveTo(x + center, y);
						canvas.lineTo(x + marksize, y + center);
						canvas.lineTo(x + center, y + marksize);
						canvas.lineTo(x, y + center);
						canvas.closePath();
						canvas.drawFill();
					}
					break;
				case "triangle":
					if (markfillcolor != "") {
						canvas.setElementFillStyle(fillcolor);
						var center = marksize / 2;
						canvas.moveTo(x + center, y);
						canvas.lineTo(x + marksize, y + marksize);
						canvas.lineTo(x, y + marksize);
						canvas.closePath();
						canvas.drawFill();
					}
					break;
			}
			canvas.restore();
		}
	};

	_pChart = null;

	nexacro.ChartTitle = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.CanvasCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);
	};
	var _pChartTitle = nexacro.ChartTitle.prototype = nexacro._createPrototype(nexacro.CanvasCtrl, nexacro.ChartTitle);
	_pChartTitle._type_name = "Chart>#title";

	_pChartTitle._total_width = 0;
	_pChartTitle._total_height = 0;
	_pChartTitle._text_width = 0;
	_pChartTitle._text_height = 0;
	_pChartTitle._text_pos_x = 0;
	_pChartTitle._text_pos_y = 0;
	_pChartTitle._subtext_width = 0;
	_pChartTitle._subtext_height = 0;
	_pChartTitle._subtext_pos_x = 0;
	_pChartTitle._subtext_pos_y = 0;
	_pChartTitle._size_factor = 100;
	_pChartTitle._draw_type = "horz";
	_pChartTitle.text = "";
	_pChartTitle.subtext = "";

	_pChartTitle._defaultLocation = nexacro._getCachedStyleObj("value", "top");
	_pChartTitle._defaultRotate = nexacro._getCachedStyleObj("value", 0);

	_pChartTitle.on_create_custom_style = function () {
		return new nexacro.ChartTitle_Style(this);
	};

	_pChartTitle.on_create_custom_currentStyle = function () {
		return new nexacro.ChartTitle_CurrentStyle();
	};

	_pChartTitle.on_apply_custom_pseudo = function (pseudo) {
		var pseudo = this._pseudo;
		var curstyle = this.currentstyle;

		curstyle.font = this.on_find_CurrentStyle_font(pseudo);
		curstyle.color = this.on_find_CurrentStyle_color(pseudo);
		curstyle.align = this.on_find_CurrentStyle_align(pseudo);
		curstyle.padding = this.on_find_CurrentStyle_padding(pseudo);

		curstyle.location = this.on_find_CurrentStyle_location(pseudo);
		curstyle.size = this.on_find_CurrentStyle_size(pseudo);
		curstyle.subalign = this.on_find_CurrentStyle_subAlign(pseudo);
		curstyle.subcolor = this.on_find_CurrentStyle_subColor(pseudo);
		curstyle.subfont = this.on_find_CurrentStyle_subFont(pseudo);
		curstyle.subpadding = this.on_find_CurrentStyle_subPadding(pseudo);
		curstyle.titlerotate = this.on_find_CurrentStyle_titleRotate(pseudo);
	};

	_pChartTitle.on_update_style_location = function () {
		this.currentstyle.location = this.on_find_CurrentStyle_location(this._pseudo);
		this.parent._recalcLayout();
		this.parent.on_updateLegendLayout();
	};

	_pChartTitle.on_update_style_size = function () {
		this.currentstyle.size = this.on_find_CurrentStyle_size(this._pseudo);
		this.parent._recalcLayout();
		this.parent.on_updateLegendLayout();
	};

	_pChartTitle.on_update_style_subalign = function () {
		this.currentstyle.subalign = this.on_find_CurrentStyle_subAlign(this._pseudo);
		this._recalcLayout();
		this.ondraw(this._canvas);
	};

	_pChartTitle.on_update_style_subcolor = function () {
		this.currentstyle.subcolor = this.on_find_CurrentStyle_subColor(this._pseudo);
		this.ondraw(this._canvas);
	};

	_pChartTitle.on_update_style_subfont = function () {
		this.currentstyle.subfont = this.on_find_CurrentStyle_subFont(this._pseudo);
		this.ondraw(this._canvas);
	};

	_pChartTitle.on_update_style_subpadding = function () {
		this.currentstyle.subpadding = this.on_find_CurrentStyle_subPadding(this._pseudo);
		this.parent._recalcLayout();
		this.parent.on_updateLegendLayout();
	};

	_pChartTitle.on_update_style_titlerotate = function () {
		this.currentstyle.titlerotate = this.on_find_CurrentStyle_titleRotate(this._pseudo);
	};

	_pChartTitle.on_find_CurrentStyle_location = function (pseudo) {
		var location = this._find_pseudo_obj("location", pseudo);
		return (location) ? location : this._defaultLocation;
	};

	_pChartTitle.on_find_CurrentStyle_size = function (pseudo) {
		return this._find_pseudo_obj("size", pseudo);
	};

	_pChartTitle.on_find_CurrentStyle_subAlign = function (pseudo) {
		var align = this._find_pseudo_obj("subalign", pseudo);
		return (align) ? align : this._default_align;
	};

	_pChartTitle.on_find_CurrentStyle_subColor = function (pseudo) {
		var color = this._find_pseudo_obj("subcolor", pseudo);
		return (color) ? color : this.currentstyle.color;
	};

	_pChartTitle.on_find_CurrentStyle_subFont = function (pseudo) {
		var font = this._find_pseudo_obj("subfont", pseudo);
		return (font) ? font : this.currentstyle.font;
	};

	_pChartTitle.on_find_CurrentStyle_subPadding = function (pseudo) {
		var padding = this._find_pseudo_obj("subpadding", pseudo);
		return (padding) ? padding : this._default_padding;
	};

	_pChartTitle.on_find_CurrentStyle_titleRotate = function (pseudo) {
		return this._find_pseudo_obj("titlerotate", pseudo);
		return (rotate) ? rotete : this._defaultRotate;
	};


	_pChartTitle._loadFromDOM = function (elem) {
		if (elem && elem.attributes) {
			var nodeName = "";
			var nodeValue = "";
			var length = elem.attributes.length;
			for (var i = 0; i < length; i++) {
				nodeName = elem.attributes[i].nodeName;
				nodeValue = elem.attributes[i].nodeValue;
				if (nodeName == "id") {
					this.id = nodeValue;
				}
				else {
					this["set_" + nodeName] && this["set_" + nodeName](nodeValue);
				}
			}
		}
	};

	_pChartTitle._recalcLayout = function () {
		if (!this.visible) {
			return false;
		}

		var curstyle = this.currentstyle;
		var padding = curstyle.padding;
		var tpw = 0, tph = 0, spw = 0, sph = 0, padtop = 0;

		if (padding) {
			tpw = padding.left + padding.right;
			tph = padding.top + padding.bottom;
			padtop = padding.top;
		}

		var subpadding = curstyle.subpadding;

		if (subpadding) {
			spw = subpadding.left + subpadding.right;
			sph = subpadding.top + subpadding.bottom;
		}

		var size = nexacro.getStyleValueInt(curstyle.size, 100);
		this._size_factor = size;
		if (size == 0) {
			this._total_width = this._total_height = 0;
			return false;
		}

		if (this.text.length) {
			var font = curstyle.font;
			var textsize = nexacro._getTextSize2(this.text, font);
			this._text_width = textsize[0];
			this._text_height = textsize[1];
		}
		else {
			this._text_width = 0;
			this._text_height = 0;
		}
		if (this.subtext.length) {
			var subfont = curstyle.subfont;
			var subtextsize = nexacro._getTextSize2(this.subtext, subfont);
			this._subtext_width = subtextsize[0];
			this._subtext_height = subtextsize[1];
		}
		else {
			this._subtext_width = 0;
			this._subtext_height = 0;
		}
		tpw += this._text_width;
		spw += this._subtext_width;
		var wmax = (tpw > spw) ? tpw : spw;
		var hmax = tph + sph + this._text_height + this._subtext_height;

		var align = curstyle.align;
		if (align) {
			this._text_pos_y = padtop + this._text_height / 2;
			switch (align.halign) {
				case "left":
					this._text_pos_x = 0;
					break;
				case "right":
					this._text_pos_x = wmax - this._text_width;
					break;
				default:
					this._text_pos_x = Math.round((wmax - this._text_width) / 2);
					break;
			}
		}

		var subalign = curstyle.subalign;
		if (subalign) {
			this._subtext_pos_y = tph + this._text_height + this._subtext_height / 2;
			if (subpadding) {
				this._subtext_pos_y += subpadding.top;
			}

			switch (subalign.halign) {
				case "left":
					this._subtext_pos_x = 0;
					break;
				case "right":
					this._subtext_pos_x = wmax - this._subtext_width;
					break;
				default:
					this._subtext_pos_x = Math.round((wmax - this._subtext_width) / 2);
					break;
			}
		}

		if (wmax != this._total_width || hmax != this._total_height) {
			this._total_width = wmax;
			this._total_height = hmax;
			return true;
		}
		else {
			return false;
		}
	};

	_pChartTitle._movePositionWithBound = function (rc) {
		var rcwidth = rc.right - rc.left;
		var rcheight = rc.bottom - rc.top;
		var maxwidth = Math.ceil(rcwidth * this._size_factor / 100);
		var maxheight = Math.ceil(rcheight * this._size_factor / 100);

		var curstyle = this.currentstyle;
		var location = nexacro.getStyleValueText(this.currentstyle.location, "top");

		var border = curstyle.border;
		var bwidth = 0, bheight = 0;
		if (!border) {
			border = nexacro._getCachedStyleObj("border", "0px none");
		}
		else {
			bwidth = border._left_width + border._right_width;
			bheight = border._top_width + border._bottom_width;
		}

		var left = 0, top = 0, right = 0, bottom = 0, cheight = 0, cwidth = 0;
		switch (location) {
			case "top":
			case "top,center":
				this._draw_type = "horz";
				cheight = this._total_height + bheight;
				top = rc.top;
				bottom = top + ((cheight < maxheight) ? cheight : maxheight);

				cwidth = this._total_width + bwidth;
				if (cwidth < rcwidth) {
					left = rc.left + Math.ceil((rcwidth - cwidth) / 2);
					right = left + cwidth;
				}
				else {
					left = rc.left;
					right = rc.getWidth();
				}
				rc.top = bottom;
				break;
			case "top,left":
				this._draw_type = "horz";
				cheight = this._total_height + bheight;
				top = rc.top;
				bottom = top + ((cheight < maxheight) ? cheight : maxheight);

				cwidth = this._total_width + bwidth;
				left = rc.left;
				right = left + ((cwidth < rcwidth) ? cwidth : rcwidth);
				rc.top = bottom;
				break;
			case "top,right":
				this._draw_type = "horz";
				cheight = this._total_height + bheight;
				top = rc.top;
				bottom = top + ((cheight < maxheight) ? cheight : maxheight);

				cwidth = this._total_width + bwidth;
				right = rc.right;
				left = right - ((cwidth < rcwidth) ? cwidth : rcwidth);
				rc.top = bottom;
				break;
			case "bottom":
			case "bottom,center":
				this._draw_type = "horz";
				cheight = this._total_height + bheight;
				bottom = rc.bottom;
				top = bottom - ((cheight < maxheight) ? cheight : maxheight);

				cwidth = this._total_width + bwidth;
				if (cwidth < rcwidth) {
					left = rc.left + Math.ceil((rcwidth - cwidth) / 2);
					right = left + cwidth;
				}
				else {
					left = rc.left;
					right = rc.right;
				}
				rc.bottom = top;
				break;
			case "bottom,left":
				this._draw_type = "horz";
				cheight = this._total_height + bheight;
				bottom = rc.bottom;
				top = bottom - ((cheight < maxheight) ? cheight : maxheight);

				cwidth = this._total_width + bwidth;
				left = rc.left;
				right = left + ((cwidth < rcwidth) ? cwidth : rcwidth);
				rc.bottom = top;
				break;
			case "bottom,right":
				this._draw_type = "horz";
				cheight = this._total_height + bheight;
				bottom = rc.bottom;
				top = bottom - ((cheight < maxheight) ? cheight : maxheight);

				cwidth = this._total_width + bwidth;
				right = rc.right;
				left = right - ((cwidth < rcwidth) ? cwidth : rcwidth);
				rc.bottom = top;
				break;
			case "left":
			case "left,center":
				this._draw_type = "left";
				cwidth = this._total_height + bwidth;
				left = rc.left;
				right = left + ((cwidth < maxwidth) ? cwidth : maxwidth);

				cheight = this._total_width + bheight;
				if (cheight < rcheight) {
					top = rc.top + Math.ceil((rcheight - cheight) / 2);
					bottom = top + cheight;
				}
				else {
					top = rc.top;
					bottom = rc.bottom;
				}
				rc.left = right;
				break;
			case "left,bottom":
				this._draw_type = "left";
				cwidth = this._total_height + bwidth;
				left = rc.left;
				right = left + ((cwidth < maxwidth) ? cwidth : maxwidth);

				cheight = this._total_width + bheight;
				bottom = rc.bottom;
				top = bottom - ((cheight < rcheight) ? cheight : rcheight);
				rc.left = right;
				break;
			case "left,top":
				this._draw_type = "left";
				cwidth = this._total_height + bwidth;
				left = rc.left;
				right = left + ((cwidth < maxwidth) ? cwidth : maxwidth);

				cheight = this._total_width + bheight;
				top = rc.top;
				bottom = top + ((cheight < rcheight) ? cheight : rcheight);
				rc.left = right;
				break;
			case "right":
			case "right,center":
				this._draw_type = "right";
				cwidth = this._total_height + bwidth;
				right = rc.right;
				left = right - ((cwidth < maxwidth) ? cwidth : maxwidth);

				cheight = this._total_width + bheight;
				if (cheight < rcheight) {
					top = rc.top + Math.ceil((rcheight - cheight) / 2);
					bottom = top + cheight;
				}
				else {
					top = rc.top;
					bottom = rc.bottom;
				}
				rc.right = left;
				break;
			case "right,bottom":
				this._draw_type = "right";
				cwidth = this._total_height + bwidth;
				right = rc.right;
				left = right - ((cwidth < maxwidth) ? cwidth : maxwidth);

				cheight = this._total_width + bheight;
				bottom = rc.bottom;
				top = bottom - ((cheight < rcheight) ? cheight : rcheight);
				break;
			case "right,top":
				this._draw_type = "right";
				cwidth = this._total_height + bwidth;
				right = rc.right;
				left = right - ((cwidth < maxwidth) ? cwidth : maxwidth);

				cheight = this._total_width + bheight;
				top = rc.top;
				bottom = top + ((cheight < rcheight) ? cheight : rcheight);
				rc.right = left;
				break;
			default:
				this._draw_type = "horz";
				left = right = top = bottom = 0;
				break;
		}

		width = right - left;
		height = bottom - top;

		if (this._adjust_left != left || this._adjust_width != width || this._adjust_top != top || this._adjust_height != height) {
			this._applysetPosition(left, top, width, height);
			return true;
		}
		return false;
	};

	_pChartTitle._clipArea = function (rc) {
		var location = nexacro.getStyleValueText(this.currentstyle.location, "top");
		switch (location) {
			case "top":
			case "top,center":
			case "top,left":
			case "top,right":
				rc.top += this._adjust_height;
				break;
			case "bottom":
			case "bottom,center":
			case "bottom,left":
			case "bottom,right":
			case "bottom,right":
				rc.bottom -= this._adjust_height;
				break;
			case "left":
			case "left,center":
			case "left,bottom":
			case "left,top":
				rc.left += this._adjust_width;
				break;
			case "right":
			case "right,center":
			case "right,bottom":
			case "right,top":
				rc.right -= this._adjust_width;
				break;
		}
	};

	_pChartTitle.ondraw = function (canvas) {
		if (!canvas || !this.parent.enableredraw || canvas.width <= 0 || canvas.height <= 0) {
			return;
		}

		canvas.clearRect();
		var curstyle = this.currentstyle;
		var font, color;
		if (this._draw_type == "left") {
			var offset_x = this._client_width;
			if (this._text_width) {
				font = curstyle.font;
				color = curstyle.color ? curstyle.color._value : "black";
				canvas.setElementFillStyle(color);
				canvas.setElementFont(font);
				canvas.drawFillText(this.text, this._text_pos_y, offset_x - this._text_pos_x, 270);
			}
			if (this._subtext_width) {
				font = curstyle.subfont;
				color = curstyle.subcolor ? curstyle.subcolor._value : "black";
				canvas.setElementFillStyle(color);
				canvas.setElementFont(font);
				canvas.drawFillText(this.subtext, this._subtext_pos_y, offset_x - this._subtext_pos_x, 270);
			}
		}
		else if (this._draw_type == "right") {
			var offset_y = this._client_width;
			if (this._text_width) {
				font = curstyle.font;
				color = curstyle.color ? curstyle.color._value : "black";
				canvas.setElementFillStyle(color);
				canvas.setElementFont(font);
				canvas.drawFillText(this.text, offset_y - this._text_pos_y, this._text_pos_x, 90);
			}
			if (this._subtext_width) {
				font = curstyle.subfont;
				color = curstyle.subcolor ? curstyle.subcolor._value : "black";
				canvas.setElementFillStyle(color);
				canvas.setElementFont(font);
				canvas.drawFillText(this.subtext, offset_y - this._subtext_pos_y, this._subtext_pos_x, 90);
			}
		}
		else {
			if (this._text_width) {
				font = curstyle.font;
				color = curstyle.color ? curstyle.color._value : "black";
				canvas.setElementFillStyle(color);
				canvas.setElementFont(font);
				canvas.drawFillText(this.text, this._text_pos_x, this._text_pos_y, 0);
			}
			if (this._subtext_width) {
				font = curstyle.subfont;
				color = curstyle.subcolor ? curstyle.subcolor._value : "black";
				canvas.setElementFillStyle(color);
				canvas.setElementFont(font);
				canvas.drawFillText(this.subtext, this._subtext_pos_x, this._subtext_pos_y, 0);
			}
		}
		canvas.endDraw();
	};

	_pChartTitle.set_text = function (v) {
		if (v != this.text) {
			this.text = v;
		}
		return v;
	};


	_pChartTitle.set_subtext = function (v) {
		if (v != this.subtext) {
			this.subtext = v;
		}
		return v;
	};

	_pChartTitle = null;

	nexacro.ChartLegendItem = function (id, text) {
		this.id = id;
		this.text = text;
		this.text_width = 0;
		this.text_height = 0;
		this.item_width = 0;
		this.item_height = 0;
		this.mark_pos_x = 0;
		this.mark_pos_y = 0;
		this.text_pos_x = 0;
		this.text_pos_y = 0;
		this.padding = null;
		this.markpadding = null;
		this.font = null;
		this.color = null;
		this.border = null;
		this.markshape = "rectangle";
		this.markfillcolor = "";
		this.markborderpen = null;
	};

	nexacro.ChartLegend = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.CanvasCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._titleitem = null;
		this._items = [];
	};

	var _pChartLegend = nexacro.ChartLegend.prototype = nexacro._createPrototype(nexacro.CanvasCtrl, nexacro.ChartLegend);
	_pChartLegend._type_name = "Chart>#legend";

	_pChartLegend._items = null;
	_pChartLegend._titleitem = null;
	_pChartLegend._width_sum = 0;
	_pChartLegend._height_sum = 0;
	_pChartLegend._width_max = 0;
	_pChartLegend._height_max = 0;
	_pChartLegend._item_max = 0;
	_pChartLegend._total_width = 0;
	_pChartLegend._total_height = 0;
	_pChartLegend._draw_type = "horz";

	_pChartLegend._defaultLocation = nexacro._getCachedStyleObj("value", "top");
	_pChartLegend._defaultType = nexacro._getCachedStyleObj("value", "multi");

	_pChartLegend.on_create_custom_style = function () {
		return new nexacro.ChartLegend_Style(this);
	};

	_pChartLegend.on_create_custom_currentStyle = function () {
		return new nexacro.ChartLegend_CurrentStyle();
	};

	_pChartLegend.on_apply_custom_pseudo = function (pseudo) {
		var pseudo = this._pseudo;
		var curstyle = this.currentstyle;

		curstyle.font = this.on_find_CurrentStyle_font(pseudo);
		curstyle.color = this.on_find_CurrentStyle_color(pseudo);
		curstyle.align = this.on_find_CurrentStyle_align(pseudo);
		curstyle.padding = this.on_find_CurrentStyle_padding(pseudo);

		curstyle.location = this.on_find_CurrentStyle_location(pseudo);
		curstyle.arrange = this.on_find_CurrentStyle_arrange(pseudo);
		curstyle.imagepadding = this.on_find_CurrentStyle_imagePadding(pseudo);
		curstyle.itemalign = this.on_find_CurrentStyle_itemAlign(pseudo);
		curstyle.itemborder = this.on_find_CurrentStyle_itemBorder(pseudo);
		curstyle.itembordertype = this.on_find_CurrentStyle_itemBorderType(pseudo);
		curstyle.itembackground = this.on_find_CurrentStyle_itemBackground(pseudo);
		curstyle.itemgradation = this.on_find_CurrentStyle_itemGradation(pseudo);
		curstyle.itempadding = this.on_find_CurrentStyle_itemPadding(pseudo);
		curstyle.itemfont = this.on_find_CurrentStyle_itemFont(pseudo);
		curstyle.itemcolor = this.on_find_CurrentStyle_itemColor(pseudo);
		curstyle.titlealign = this.on_find_CurrentStyle_titleAlign(pseudo);
		curstyle.titlecolor = this.on_find_CurrentStyle_titleColor(pseudo);
		curstyle.titlefont = this.on_find_CurrentStyle_titleFont(pseudo);
		curstyle.titlepadding = this.on_find_CurrentStyle_titlePadding(pseudo);
		curstyle.titletext = this.on_find_CurrentStyle_titleText(pseudo);
		curstyle.type = this.on_find_CurrentStyle_type(pseudo);
	};

	_pChartLegend.on_update_style_location = function () {
		this.currentstyle.location = this.on_find_CurrentStyle_location(this._pseudo);
		this.parent.on_updateLegendLayout();
	};
	_pChartLegend.on_update_style_arrange = function () {
		this.currentstyle.arrange = this.on_find_CurrentStyle_arrange(this._pseudo);
	};
	_pChartLegend.on_update_style_imagepadding = function () {
		this.currentstyle.imagepadding = this.on_find_CurrentStyle_imagePadding(this._pseudo);
		this._recalcLayout();
		this.ondraw(this._canvas);
	};

	_pChartLegend.on_update_style_itemalign = function () {
		this.currentstyle.itemalign = this.on_find_CurrentStyle_itemAlign(this._pseudo);
	};

	_pChartLegend.on_update_style_itemborder = function () {
		this.currentstyle.itemborder = this.on_find_CurrentStyle_itemBorder(this._pseudo);
		this._recalcLayout();
		this.ondraw(this._canvas);
	};

	_pChartLegend.on_update_style_itembordertype = function () {
		this.currentstyle.itembordertype = this.on_find_CurrentStyle_itemBorderType(this._pseudo);
	};
	_pChartLegend.on_update_style_itembackground = function () {
		this.currentstyle.itembackground = this.on_find_CurrentStyle_itemBackground(this._pseudo);
	};

	_pChartLegend.on_update_style_itemgradation = function () {
		this.currentstyle.itemgradation = this.on_find_CurrentStyle_itemGradation(this._pseudo);
	};

	_pChartLegend.on_update_style_itempadding = function () {
		this.currentstyle.itempadding = this.on_find_CurrentStyle_itemPadding(this._pseudo);
		this.parent._recalcLayout();
		this.parent.on_updateLegendLayout();
	};

	_pChartLegend.on_update_style_itemfont = function () {
		this.currentstyle.itemfont = this.on_find_CurrentStyle_itemFont(this._pseudo);
		this._recalcLayout();
		this.parent.on_updateLegendLayout();
	};

	_pChartLegend.on_update_style_itemcolor = function () {
		this.currentstyle.itemcolor = this.on_find_CurrentStyle_itemColor(this._pseudo);
		this._recalcLayout();
		this.ondraw(this._canvas);
	};

	_pChartLegend.on_update_style_titlealign = function () {
		this.currentstyle.titlealign = this.on_find_CurrentStyle_titleAlign(this._pseudo);
	};

	_pChartLegend.on_update_style_titlecolor = function () {
		this.currentstyle.titlecolor = this.on_find_CurrentStyle_titleColor(this._pseudo);
		this._recalcLayout();
		this.ondraw(this._canvas);
	};

	_pChartLegend.on_update_style_titlefont = function () {
		this.currentstyle.titlefont = this.on_find_CurrentStyle_titleFont(this._pseudo);
		this._recalcLayout();
		this.parent.on_updateLegendLayout();
	};

	_pChartLegend.on_update_style_titlepadding = function () {
		this.currentstyle.titlepadding = this.on_find_CurrentStyle_titlePadding(this._pseudo);
		this._recalcLayout();
		this.parent.on_updateLegendLayout();
	};

	_pChartLegend.on_update_style_titletext = function () {
		this.currentstyle.titletext = this.on_find_CurrentStyle_titleText(this._pseudo);
		this._recalcLayout();
		this.ondraw(this._canvas);
	};

	_pChartLegend.on_update_style_type = function () {
		this.currentstyle.type = this.on_find_CurrentStyle_type(this._pseudo);
	};

	_pChartLegend.on_find_CurrentStyle_location = function (pseudo) {
		var location = this._find_pseudo_obj("location", pseudo);
		return (location) ? location : this._defaultLocation;
	};

	_pChartLegend.on_find_CurrentStyle_arrange = function (pseudo) {
		return this._find_pseudo_obj("arrange", pseudo);
	};

	_pChartLegend.on_find_CurrentStyle_imagePadding = function (pseudo) {
		var padding = this._find_pseudo_obj("imagepadding", pseudo);
		return (padding) ? padding : this._default_padding;
	};

	_pChartLegend.on_find_CurrentStyle_itemAlign = function (pseudo) {
		var align = this._find_pseudo_obj("itemalign", pseudo);
		return (align) ? align : this.on_find_CurrentStyle_align(pseudo);
	};

	_pChartLegend.on_find_CurrentStyle_itemBorder = function (pseudo) {
		return this._find_pseudo_obj("itemborder", pseudo);
	};

	_pChartLegend.on_find_CurrentStyle_itemBorderType = function (pseudo) {
		return this._find_pseudo_obj("itembordertype", pseudo);
	};

	_pChartLegend.on_find_CurrentStyle_itemBackground = function (pseudo) {
		return this._find_pseudo_obj("itembackground", pseudo);
	};

	_pChartLegend.on_find_CurrentStyle_itemGradation = function (pseudo) {
		return this._find_pseudo_obj("itemgradation", pseudo);
	};

	_pChartLegend.on_find_CurrentStyle_itemPadding = function (pseudo) {
		var padding = this._find_pseudo_obj("itempadding", pseudo);
		return (padding) ? padding : this._default_padding;
	};

	_pChartLegend.on_find_CurrentStyle_itemFont = function (pseudo) {
		var font = this._find_pseudo_obj("itemfont", pseudo);
		return (font) ? font : this.currentstyle.font;
	};
	_pChartLegend.on_find_CurrentStyle_itemColor = function (pseudo) {
		var color = this._find_pseudo_obj("itemcolor", pseudo);
		return (color) ? color : this.currentstyle.color;
	};
	_pChartLegend.on_find_CurrentStyle_titleAlign = function (pseudo) {
		var align = this._find_pseudo_obj("titlealign", pseudo);
		return (align) ? align : this._default_align;
	};
	_pChartLegend.on_find_CurrentStyle_titleColor = function (pseudo) {
		var color = this._find_pseudo_obj("titlecolor", pseudo);
		return (color) ? color : this.currentstyle.color;
	};
	_pChartLegend.on_find_CurrentStyle_titleFont = function (pseudo) {
		var font = this._find_pseudo_obj("titlefont", pseudo);
		return (font) ? font : this.currentstyle.font;
	};
	_pChartLegend.on_find_CurrentStyle_titlePadding = function (pseudo) {
		var padding = this._find_pseudo_obj("titlepadding", pseudo);
		return (padding) ? padding : this._default_padding;
	};
	_pChartLegend.on_find_CurrentStyle_titleText = function (pseudo) {
		return this._find_pseudo_obj("titletext", pseudo);
	};
	_pChartLegend.on_find_CurrentStyle_type = function (pseudo) {
		var type = this._find_pseudo_obj("type", pseudo);
		return (type) ? type : this._defaultType;
	};

	_pChartLegend._loadFromDOM = function (elem) {
		if (elem && elem.attributes) {
			var nodeName = "";
			var nodeValue = "";
			var length = elem.attributes.length;
			for (var i = 0; i < length; i++) {
				nodeName = elem.attributes[i].nodeName;
				nodeValue = elem.attributes[i].nodeValue;
				if (nodeName == "id") {
					this.id = nodeValue;
				}
				else {
					this["set_" + nodeName] && this["set_" + nodeName](nodeValue);
				}
			}
		}
	};

	_pChartLegend._recalcLayout = function () {
		if (!this.visible) {
			return false;
		}

		this._titleitem = null;
		this._items.splice(0, this._items.length);
		var curstyle = this.currentstyle;
		var pw = 0, ph = 0, ipw = 0, iph = 0, imgp = 0, textwidth, textheight;
		var padding = curstyle.padding;
		var padleft = 0, padright = 0, padtop = 0, padbottom = 0;
		if (padding) {
			pw = padding.left + padding.right;
			ph = padding.top + padding.bottom;
		}

		var wmax = 0, hmax = 0, wsum = 0, hsum = 0;

		var item;
		var color, font, markshape, markfillcolor, markborderpen;
		var text = curstyle.titletext;
		if (text && text._value.length > 0) {
			text = text._value;
			padding = curstyle.titlepadding;
			if (padding) {
				ipw = padding.left + padding.right;
				iph = padding.top + padding.bottom;
			}

			color = curstyle.titlecolor ? curstyle.titlecolor._value : null;
			font = curstyle.titlefont ? curstyle.titlefont : null;

			item = new nexacro.ChartLegendItem("title", text);

			item.padding = padding;
			item.font = font;
			item.color = color;

			var textsize = nexacro._getTextSize2(text, font);

			textwidth = item.text_width = textsize[0];
			textheight = item.text_height = textsize[1];
			wmax = wsum = item.item_width = textwidth + ipw;
			hmax = hsum = item.item_height = textheight + iph;
			this._titleitem = item;
		}

		var seriesset = this.parent.seriesset;
		if (seriesset && seriesset.length > 0) {
			padding = curstyle.itempadding;
			if (padding) {
				ipw = padding.left + padding.right;
				iph = padding.top + padding.bottom;
			}

			var imagepadding = curstyle.imagepadding;

			if (imagepadding) {
				imgp = imagepadding.left + imagepadding.right;
			}

			color = curstyle.itemcolor ? curstyle.itemcolor._value : null;
			font = curstyle.itemfont;
			border = curstyle.itemborder;
			if (border) {
				ipw += border._left_width + border._right_width;
				iph += border._top_width + border._bottom_width;
			}

			var len = seriesset.length;
			for (var i = 0; i < len; i++) {
				var series = seriesset[i];
				var seriesstyle = series.currentstyle;
				text = series.label || series.text || series.id;
				var markshape = nexacro.getStyleValueText2(seriesstyle.pointshape, "none", "");
				if (markshape != "") {
					var brush = seriesstyle.pointfillbrush;
					if (brush && brush._isValid()) {
						markfillcolor = brush.color;
					}
					else {
						markfillcolor = "";
					}
					var pen = seriesstyle.pointstrokepen;
					if (pen && pen._isValid()) {
						markborderpen = pen;
					}
					else {
						markborderpen = null;
					}
				}
				else if (series.type == "line") {
					markshape = "horzline";
					var pen = seriesstyle.strokepen;
					if (pen && pen._isValid()) {
						markfillcolor = pen.color;
					}
					else {
						markfillcolor = "";
					}
					markborderpen = null;
				}
				else {
					markshape = "rectangle";
					var brush = seriesstyle.fillbrush;
					if (brush && brush._isValid()) {
						markfillcolor = brush.color;
					}
					else {
						markfillcolor = "";
					}
					var pen = seriesstyle.strokepen;
					if (pen && pen._isValid()) {
						markborderpen = pen;
					}
				}

				item = new nexacro.ChartLegendItem("series" + i, text);
				item.padding = padding;
				item.markpadding = imagepadding;
				item.font = font;
				item.color = color;
				item.border = border;
				item.markshape = markshape;
				item.markfillcolor = markfillcolor;
				item.markborderpen = markborderpen;

				var textsize = nexacro._getTextSize2(text, font);
				textwidth = item.text_width = textsize[0];
				textheight = item.text_height = textsize[1];
				item.marksize = textheight;
				item.item_width = textwidth + ipw + textheight + imgp;
				item.item_height = textheight + iph;
				if (item.item_width > wmax) {
					wmax = item.item_width;
				}
				wsum += item.item_width;
				if (item.item_height > hmax) {
					hmax = item.item_height;
				}
				hsum += item.item_height;
				this._items.push(item);
			}
		}

		wmax += pw;
		hmax += ph;
		wsum += pw;
		hsum += ph;

		if (wmax != this._width_max || hmax != this._height_sum || wsum != this._width_sum || hsum != this._height_sum) {
			this._width_max = wmax;
			this._height_max = hmax;
			this._width_sum = wsum;
			this._height_sum = hsum;
			this._item_max = wmax - pw;
			return true;
		}
		else {
			return false;
		}
	};

	_pChartLegend._movePositionWithBound = function (rc) {
		var rcwidth = rc.right - rc.left;
		var rcheight = rc.bottom - rc.top;

		var curstyle = this.currentstyle;
		var location = curstyle.location;

		var border = curstyle.border;
		var bwidth = 0, bheight = 0;
		if (border) {
			bwidth = border._left_width + border._right_width;
			bheight = border._top_width + border._bottom_width;
		}

		var left = 0, top = 0, right = 0, bottom = 0, cheight = 0, cwidth = 0;
		if (location) {
			switch (location._value) {
				case "top,center":
					this._total_width = this._width_sum;
					this._total_height = this._height_max;
					this._draw_type = "horz";
					cheight = this._total_height + bheight;
					top = rc.top;
					bottom = top + ((cheight < maxheight) ? cheight : maxheight);

					cwidth = this._total_width + bwidth;
					if (cwidth < rcwidth) {
						left = rc.left + Math.ceil((rcwidth - cwidth) / 2);
						right = left + cwidth;
					}
					else {
						left = rc.left;
						right = rc.getWidth();
					}
					rc.top = bottom;
					break;
				case "top,left":
					this._total_width = this._width_sum;
					this._total_height = this._height_max;
					this._draw_type = "horz";
					cheight = this._total_height + bheight;
					top = rc.top;
					bottom = top + ((cheight < rcheight) ? cheight : rcheight);

					cwidth = this._total_width + bwidth;
					left = rc.left;
					right = left + ((cwidth < rcwidth) ? cwidth : rcwidth);
					rc.top = bottom;
					break;
				case "top":
				case "top,right":
					this._total_width = this._width_sum;
					this._total_height = this._height_max;
					this._draw_type = "horz";
					cheight = this._total_height + bheight;
					top = rc.top;
					bottom = top + ((cheight < rcheight) ? cheight : rcheight);

					cwidth = this._total_width + bwidth;
					right = rc.right;
					left = right - ((cwidth < rcwidth) ? cwidth : rcwidth);
					rc.top = bottom;
					break;
				case "bottom,center":
					this._total_width = this._width_sum;
					this._total_height = this._height_max;
					this._draw_type = "horz";
					cheight = this._total_height + bheight;
					bottom = rc.bottom;
					top = bottom - ((cheight < rcheight) ? cheight : rcheight);

					cwidth = this._total_width + bwidth;
					if (cwidth < rcwidth) {
						left = rc.left + Math.ceil((rcwidth - cwidth) / 2);
						right = left + cwidth;
					}
					else {
						left = rc.left;
						right = rc.right;
					}
					rc.bottom = top;
					break;
				case "bottom,left":
					this._total_width = this._width_sum;
					this._total_height = this._height_max;
					this._draw_type = "horz";
					cheight = this._total_height + bheight;
					bottom = rc.bottom;
					top = bottom - ((cheight < rcheight) ? cheight : rcheight);

					cwidth = this._total_width + bwidth;
					left = rc.left;
					right = left + ((cwidth < rcwidth) ? cwidth : rcwidth);
					rc.bottom = top;
					break;
				case "bottom":
				case "bottom,right":
					this._total_width = this._width_sum;
					this._total_height = this._height_max;
					this._draw_type = "horz";
					cheight = this._total_height + bheight;
					bottom = rc.bottom;
					top = bottom - ((cheight < rcheight) ? cheight : rcheight);

					cwidth = this._total_width + bwidth;
					right = rc.right;
					left = right - ((cwidth < rcwidth) ? cwidth : rcwidth);
					rc.bottom = top;
					break;
				case "left,center":
					this._total_width = this._width_max;
					this._total_height = this._height_sum;
					this._draw_type = "vert";
					cwidth = this._total_width + bwidth;
					left = rc.left;
					right = left + ((cwidth < rcwidth) ? cwidth : rcwidth);

					cheight = this._total_height + bheight;
					if (cheight < rcheight) {
						top = rc.top + Math.ceil((rcheight - cheight) / 2);
						bottom = top + cheight;
					}
					else {
						top = rc.top;
						bottom = rc.bottom;
					}
					rc.left = right;
					break;
				case "left,bottom":
					this._total_width = this._width_max;
					this._total_height = this._height_sum;
					this._draw_type = "vert";
					cwidth = this._total_width + bwidth;
					left = rc.left;
					right = left + ((cwidth < rcwidth) ? cwidth : rcwidth);

					cheight = this._total_height + bheight;
					bottom = rc.bottom;
					top = bottom - ((cheight < rcheight) ? cheight : rcheight);
					rc.left = right;
					break;
				case "left":
				case "left,top":
					this._total_width = this._width_max;
					this._total_height = this._height_sum;
					this._draw_type = "vert";
					cwidth = this._total_width + bwidth;
					left = rc.left;
					right = left + ((cwidth < rcwidth) ? cwidth : rcwidth);

					cheight = this._total_height + bheight;
					top = rc.top;
					bottom = top + ((cheight < rcheight) ? cheight : rcheight);
					rc.left = right;
					break;
				case "right,center":
					this._total_width = this._width_max;
					this._total_height = this._height_sum;
					this._draw_type = "vert";
					cwidth = this._total_width + bwidth;
					right = rc.right;
					left = right - ((cwidth < rcwidth) ? cwidth : rcwidth);

					cheight = this._total_height + bheight;
					if (cheight < rcheight) {
						top = rc.top + Math.ceil((rcheight - cheight) / 2);
						bottom = top + cheight;
					}
					else {
						top = rc.top;
						bottom = rc.bottom;
					}
					rc.right = left;
					break;
				case "right,bottom":
					this._total_width = this._width_max;
					this._total_height = this._height_sum;
					this._draw_type = "vert";
					cwidth = this._total_width + bwidth;
					right = rc.right;
					left = right - ((cwidth < rcwidth) ? cwidth : rcwidth);

					cheight = this._total_height + bheight;
					bottom = rc.bottom;
					top = bottom - ((cheight < rcheight) ? cheight : rcheight);
					break;
				case "right":
				case "right,top":
					this._total_width = this._width_max;
					this._total_height = this._height_sum;
					this._draw_type = "vert";
					cwidth = this._total_width + bwidth;
					right = rc.right;
					left = right - ((cwidth < rcwidth) ? cwidth : rcwidth);

					cheight = this._total_height + bheight;
					top = rc.top;
					bottom = top + ((cheight < rcheight) ? cheight : rcheight);
					rc.right = left;
					break;
				default:
					this._total_width = 0;
					this._total_height = 0;
					this._draw_type = "horz";
					left = right = top = bottom = 0;
					break;
			}
		}

		width = right - left;
		height = bottom - top;

		if (this._adjust_left != left || this._adjust_width != width || this._adjust_top != top || this._adjust_height != height) {
			this._applysetPosition(left, top, width, height);
			return true;
		}
		return false;
	};

	_pChartLegend._clipArea = function (rc) {
		var location = nexacro.getStyleValueText(this.currentstyle.location, "top");
		switch (location) {
			case "top":
			case "top,center":
			case "top,left":
			case "top,right":
				tc.top += this._adjust_height;
				break;
			case "bottom":
			case "bottom,center":
			case "bottom,left":
			case "bottom,right":
			case "bottom,right":
				tc.bottom -= this._adjust_height;
				break;
			case "left":
			case "left,center":
			case "left,bottom":
			case "left,top":
				rc.left += this._adjust_width;
				break;
			case "right":
			case "right,center":
			case "right,bottom":
			case "right,top":
				rc.right -= this._adjust_width;
				break;
		}
	};

	_pChartLegend.ondraw = function (canvas) {
		if (!canvas || !this.parent.enableredraw || canvas.width <= 0 || canvas.height <= 0) {
			return;
		}

		canvas.clearRect();
		var len = this._items.length;
		if (!len) {
			return;
		}
		var parent = this.parent;
		var curstyle = this.currentstyle;
		var padding = curstyle.padding;

		var area_width = this._total_width;
		var area_height = this._total_height;
		var pos_x = 0, pos_y = 0;
		if (padding) {
			area_width = area_width - padding.left - padding.right;
			area_height = area_height - padding.top - padding.bottom;
			pos_x = padding.left;
			pos_y = padding.top;
		}


		var border;

		if (this._draw_type == "horz") {
			var item = this._titleitem;
			if (item) {
				var x = pos_x;
				var y = pos_y;
				padding = item.padding;
				if (padding) {
					x += padding.left;
					y += padding.top;
				}
				if (item.text_width) {
					var offset_t = item.text_height / 2;
					canvas.setElementFillStyle(item.color);
					canvas.setElementFont(item.font);
					canvas.drawFillText(item.text, x, y + offset_t, 0);
				}
				pos_x += item.item_width;
			}

			var len = this._items.length;
			for (var i = 0; i < len; i++) {
				var x = pos_x;
				var y = pos_y;
				item = this._items[i];
				border = item.border;
				if (border) {
					x += border._left_width;
					y += border._top_width;
				}
				padding = item.padding;

				if (padding) {
					x += padding.left;
					y += padding.top;
				}
				if (item.marksize > 0) {
					padding = item.markpadding;

					if (padding) {
						x += padding.left;
					}

					var marksize = item.marksize;
					parent._drawMark(canvas, x, y, item.markshape, item.marksize, item.markfillcolor, item.markborderpen);

					x += marksize;
					if (padding) {
						x += padding.right;
					}
				}
				if (item.text_width) {
					var offset_t = item.text_height / 2;
					canvas.setElementFillStyle(item.color);
					canvas.setElementFont(item.font);
					canvas.drawFillText(item.text, x, y + offset_t, 0);
				}

				if (border) {
					canvas.drawBorder(pos_x, pos_y, item.item_width, item.item_height, border);
				}
				pos_x += item.item_width;
			}
		}
		else {
			var item = this._titleitem;
			if (item) {
				var x = pos_x;
				var y = pos_y;
				padding = item.padding;
				if (padding) {
					x += padding.left;
					y += padding.top;
				}
				if (item.text_width) {
					var offset_x = Math.round((this._item_max - item.text_width) / 2);
					var offset_t = item.text_height / 2;
					canvas.setElementFillStyle(item.color);
					canvas.setElementFont(item.font);
					canvas.drawFillText(item.text, x + offset_x, y + offset_t, 0);
				}
				pos_y += item.item_height;
			}

			for (var i = 0; i < len; i++) {
				var x = pos_x;
				var y = pos_y;
				item = this._items[i];
				border = item.border;
				if (border) {
					x += border._left_width;
					y += border._top_width;
				}
				padding = item.padding;
				if (padding) {
					x += padding.left;
					y += padding.top;
				}
				if (item.marksize > 0) {
					padding = item.markpadding;
					if (padding) {
						x += padding.left;
					}

					var marksize = item.marksize;
					parent._drawMark(canvas, x, y, item.markshape, item.marksize, item.markfillcolor, item.markborderpen);
					x += marksize + (padding ? padding.right : 0);
				}
				if (item.text_width) {
					var offset_t = item.text_height / 2;
					canvas.setElementFillStyle(item.color);
					canvas.setElementFont(item.font);
					canvas.drawFillText(item.text, x, y + offset_t, 0);
				}
				if (border) {
					canvas.drawBorder(pos_x, pos_y, item.item_width, item.item_height, border);
				}
				pos_y += item.item_height;
			}
		}
		canvas.endDraw();
	};

	_pChartLegend = null;

	nexacro.ChartAxisItem = function (idx, text) {
		this.idx = idx;
		this.text = text;
		this.item_val = 0;
		this.text_width = 0;
		this.text_height = 0;
	};

	nexacro.ChartAxis = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.CanvasCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);
		this.label = new nexacro.BindableValue("");
		this._items = [];

		this.idx = "";
		this.item_val = 0;
		this.text_width = 0;
		this.text_height = 0;

		this._unit_val = 0;
		this._min_val = 0;
		this._max_val = 0;
		this._unit_min_val = 0;
		this._unit_max_val = 0;
		this._org_val = 0;

		this._title_width = 0;
		this._title_height = 0;
		this._mark_size = 0;
		this._mark_text = "";
		this._mark_width = 0;
		this._mark_height = 0;
		this._org_size = 0;
		this._org_text = "";
		this._org_width = 0;
		this._org_height = 0;
		this._miner_size = 0;
		this._major_size = 0;
		this._text_maxwidth = 0;
		this._text_maxheight = 0;
		this._item_maxsize = 0;
		this._total_height = 0;

		this._exprfn = null;
		this._apply_client_padding = false;
	};
	var _pChartAxis = nexacro.ChartAxis.prototype = nexacro._createPrototype(nexacro.CanvasCtrl, nexacro.ChartAxis);
	_pChartAxis._type_name = "Chart>#";

	_pChartAxis.label = "";
	_pChartAxis.markdata = undefined;
	_pChartAxis.marklabel = "";
	_pChartAxis.origindata = 0;
	_pChartAxis.originlabel = "";
	_pChartAxis.rulerbasetype = "point";
	_pChartAxis.rulermajorunit = -1;
	_pChartAxis.rulermax = undefined;
	_pChartAxis.rulermin = undefined;
	_pChartAxis.rulerminorunit = -1;
	_pChartAxis.rulersort = "none";
	_pChartAxis.titletext = "";
	_pChartAxis.viewcount = 5;
	_pChartAxis.viewmax = 4;
	_pChartAxis.viewmin = 0;

	_pChartAxis.on_create_custom_style = function () {
		return new nexacro.ChartAxis_Style(this);
	};

	_pChartAxis.on_create_custom_currentStyle = function () {
		return new nexacro.ChartAxis_CurrentStyle();
	};

	_pChartAxis.on_apply_custom_pseudo = function (pseudo) {
		var pseudo = this._pseudo;
		var curstyle = this.currentstyle;

		curstyle.font = this.on_find_CurrentStyle_font(pseudo);
		curstyle.color = this.on_find_CurrentStyle_color(pseudo);
		curstyle.align = this.on_find_CurrentStyle_align(pseudo);
		curstyle.padding = this.on_find_CurrentStyle_padding(pseudo);

		curstyle.margin = this.on_find_CurrentStyle_margin(pseudo);
		curstyle.axissize = this.on_find_CurrentStyle_axisSize(pseudo);
		curstyle.scrollbarsize = this.on_find_CurrentStyle_scrollbarSize(pseudo);
		curstyle.labelalign = this.on_find_CurrentStyle_labelAlign(pseudo);
		curstyle.labelcolor = this.on_find_CurrentStyle_labelColor(pseudo);
		curstyle.labelfont = this.on_find_CurrentStyle_labelFont(pseudo);
		curstyle.labelpadding = this.on_find_CurrentStyle_labelPadding(pseudo);
		curstyle.labelrotate = this.on_find_CurrentStyle_labelRotate(pseudo);
		curstyle.ruleralign = this.on_find_CurrentStyle_rulerAlign(pseudo);
		curstyle.rulermajorline = this.on_find_CurrentStyle_rulerMajorLine(pseudo);
		curstyle.rulermajorsize = this.on_find_CurrentStyle_rulerMajorSize(pseudo);
		curstyle.rulerminorline = this.on_find_CurrentStyle_rulerMinerLine(pseudo);
		curstyle.rulerminorsize = this.on_find_CurrentStyle_rulerMinerSize(pseudo);
		curstyle.markcolor = this.on_find_CurrentStyle_markColor(pseudo);
		curstyle.markfont = this.on_find_CurrentStyle_markFont(pseudo);
		curstyle.markline = this.on_find_CurrentStyle_markLine(pseudo);
		curstyle.markpadding = this.on_find_CurrentStyle_markPadding(pseudo);
		curstyle.marksize = this.on_find_CurrentStyle_markSize(pseudo);
		curstyle.origincolor = this.on_find_CurrentStyle_originColor(pseudo);
		curstyle.originfont = this.on_find_CurrentStyle_originFont(pseudo);
		curstyle.originline = this.on_find_CurrentStyle_originLine(pseudo);
		curstyle.originpadding = this.on_find_CurrentStyle_originPadding(pseudo);
		curstyle.originsize = this.on_find_CurrentStyle_originSize(pseudo);
		curstyle.titlealign = this.on_find_CurrentStyle_titleAlign(pseudo);
		curstyle.titlecolor = this.on_find_CurrentStyle_titleColor(pseudo);
		curstyle.titlefont = this.on_find_CurrentStyle_titleFont(pseudo);
		curstyle.titlepadding = this.on_find_CurrentStyle_titlePadding(pseudo);
		curstyle.titlerotate = this.on_find_CurrentStyle_titleRotate(pseudo);
	};

	_pChartAxis.on_update_style_axissize = function () {
		this.currentstyle.axissize = this.on_find_CurrentStyle_axisSize(this._pseudo);
		this.redraw();
		this.parent.on_updateDataAreaLayout();
		this.parent.on_updateDrawAreaLayout();
	};

	_pChartAxis.on_update_style_labelalign = function () {
		this.currentstyle.labelalign = this.on_find_CurrentStyle_labelAlign(this._pseudo);
		this.ondraw(this._canvas);
	};

	_pChartAxis.on_update_style_labelcolor = function () {
		this.currentstyle.labelcolor = this.on_find_CurrentStyle_labelColor(this._pseudo);
		this.ondraw(this._canvas);
	};

	_pChartAxis.on_update_style_labelfont = function () {
		this.currentstyle.labelfont = this.on_find_CurrentStyle_labelFont(this._pseudo);
		this.parent.on_updateDrawAreaLayout();
	};

	_pChartAxis.on_update_style_labelpadding = function () {
		this.currentstyle.labelpadding = this.on_find_CurrentStyle_labelPadding(this._pseudo);
		this.parent.on_updateDrawAreaLayout();
	};

	_pChartAxis.on_update_style_labelrotate = function () {
		this.currentstyle.labelrotate = this.on_find_CurrentStyle_labelRotate(this._pseudo);
		this.parent.on_updateDrawAreaLayout();
	};

	_pChartAxis.on_update_style_markcolor = function () {
		this.currentstyle.markcolor = this.on_find_CurrentStyle_markColor(this._pseudo);
		this.ondraw(this._canvas);
	};

	_pChartAxis.on_update_style_markfont = function () {
		this.currentstyle.markfont = this.on_find_CurrentStyle_markFont(this._pseudo);
		this.parent.on_updateDrawAreaLayout();
	};

	_pChartAxis.on_update_style_markline = function () {
		this.currentstyle.markline = this.on_find_CurrentStyle_markLine(this._pseudo);
		this.ondraw(this._canvas);
	};

	_pChartAxis.on_update_style_markpadding = function () {
		this.currentstyle.markpadding = this.on_find_CurrentStyle_markPadding(this._pseudo);
		this.parent.on_updateDrawAreaLayout();
	};

	_pChartAxis.on_update_style_marksize = function () {
		this.currentstyle.marksize = this.on_find_CurrentStyle_markSize(this._pseudo);
		this.parent.on_updateDrawAreaLayout();
	};

	_pChartAxis.on_update_style_origincolor = function () {
		this.currentstyle.origincolor = this.on_find_CurrentStyle_originColor(this._pseudo);
		this.ondraw(this._canvas);
	};

	_pChartAxis.on_update_style_originfont = function () {
		this.currentstyle.originfont = this.on_find_CurrentStyle_originFont(this._pseudo);
		this.parent.on_updateDrawAreaLayout();
	};

	_pChartAxis.on_update_style_originline = function () {
		this.currentstyle.originline = this.on_find_CurrentStyle_originLine(this._pseudo);
		this.ondraw(this._canvas);
	};

	_pChartAxis.on_update_style_originpadding = function () {
		this.currentstyle.originpadding = this.on_find_CurrentStyle_originPadding(this._pseudo);
		this.parent.on_updateDrawAreaLayout();
	};

	_pChartAxis.on_update_style_originsize = function () {
		this.currentstyle.originsize = this.on_find_CurrentStyle_originSize(this._pseudo);
		this.parent.on_updateDrawAreaLayout();
	};

	_pChartAxis.on_update_style_ruleralign = function () {
		this.currentstyle.ruleralign = this.on_find_CurrentStyle_rulerAlign(this._pseudo);
	};

	_pChartAxis.on_update_style_rulermajorline = function () {
		this.currentstyle.rulermajorline = this.on_find_CurrentStyle_rulerMajorLine(this._pseudo);
		this.ondraw(this._canvas);
	};

	_pChartAxis.on_update_style_rulermajorsize = function () {
		this.currentstyle.rulermajorsize = this.on_find_CurrentStyle_rulerMajorSize(this._pseudo);
		this.parent.on_updateDrawAreaLayout();
	};

	_pChartAxis.on_update_style_rulerminorline = function () {
		this.currentstyle.rulerminorline = this.on_find_CurrentStyle_rulerMinerLine(this._pseudo);
		this.ondraw(this._canvas);
	};

	_pChartAxis.on_update_style_rulerminorsize = function () {
		this.currentstyle.rulerminorsize = this.on_find_CurrentStyle_rulerMinerSize(this._pseudo);
		this.parent.on_updateDrawAreaLayout();
	};

	_pChartAxis.on_update_style_titlealign = function () {
		this.currentstyle.titlealign = this.on_find_CurrentStyle_titleAlign(this._pseudo);
		this.ondraw(this._canvas);
	};

	_pChartAxis.on_update_style_titlecolor = function () {
		this.currentstyle.titlecolor = this.on_find_CurrentStyle_titleColor(this._pseudo);
		this.ondraw(this._canvas);
	};

	_pChartAxis.on_update_style_titlefont = function () {
		this.currentstyle.titlefont = this.on_find_CurrentStyle_titleFont(this._pseudo);
		this.parent.on_updateDrawAreaLayout();
	};

	_pChartAxis.on_update_style_titlepadding = function () {
		this.currentstyle.titlepadding = this.on_find_CurrentStyle_titlePadding(this._pseudo);
		this.parent.on_updateDrawAreaLayout();
	};

	_pChartAxis.on_update_style_titlerotate = function () {
		this.currentstyle.titlerotate = this.on_find_CurrentStyle_titleRotate(this._pseudo);
	};

	_pChartAxis.on_update_style_scrollbarsize = function () {
		this.currentstyle.scrollbarsize = this.on_find_CurrentStyle_scrollbarSize(this._pseudo);
	};


	_pChartAxis.on_find_CurrentStyle_background = function (pseudo) {
		return null;
	};
	_pChartAxis.on_find_CurrentStyle_border = function (pseudo) {
		return null;
	};

	_pChartAxis.on_find_CurrentStyle_axisSize = function (pseudo) {
		return this._find_pseudo_obj("axissize", pseudo);
	};

	_pChartAxis.on_find_CurrentStyle_scrollbarSize = function (pseudo) {
		return this._find_pseudo_obj("scrollbarsize", pseudo);
	};

	_pChartAxis.on_find_CurrentStyle_labelAlign = function (pseudo) {
		var align = this._find_pseudo_obj("labelalign", pseudo);
		return (align) ? align : this._default_align;
	};

	_pChartAxis.on_find_CurrentStyle_labelColor = function (pseudo) {
		var color = this._find_pseudo_obj("labelcolor", pseudo);
		return (color) ? color : this.currentstyle.color;
	};

	_pChartAxis.on_find_CurrentStyle_labelFont = function (pseudo) {
		var font = this._find_pseudo_obj("labelfont", pseudo);
		return (font) ? font : this.currentstyle.font;
	};

	_pChartAxis.on_find_CurrentStyle_labelPadding = function (pseudo) {
		var padding = this._find_pseudo_obj("labelpadding", pseudo);
		return (padding) ? padding : this._default_padding;
	};

	_pChartAxis.on_find_CurrentStyle_labelRotate = function (pseudo) {
		return this._find_pseudo_obj("labelrotate", pseudo);
	};

	_pChartAxis.on_find_CurrentStyle_markColor = function (pseudo) {
		var color = this._find_pseudo_obj("markcolor", pseudo);
		return (color) ? color : this.currentstyle.color;
	};

	_pChartAxis.on_find_CurrentStyle_markFont = function (pseudo) {
		var font = this._find_pseudo_obj("markfont", pseudo);
		return (font) ? font : this.currentstyle.font;
	};

	_pChartAxis.on_find_CurrentStyle_markLine = function (pseudo) {
		return this._find_pseudo_obj("markline", pseudo);
	};

	_pChartAxis.on_find_CurrentStyle_markPadding = function (pseudo) {
		var padding = this._find_pseudo_obj("markpadding", pseudo);
		return (padding) ? padding : this._default_padding;
	};

	_pChartAxis.on_find_CurrentStyle_markSize = function (pseudo) {
		var size = this._find_pseudo_obj("marksize", pseudo);
		return (size) ? size : this.currentstyle.size;
	};

	_pChartAxis.on_find_CurrentStyle_originColor = function (pseudo) {
		var color = this._find_pseudo_obj("origincolor", pseudo);
		return (color) ? color : this.currentstyle.labelcolor;
	};

	_pChartAxis.on_find_CurrentStyle_originFont = function (pseudo) {
		var font = this._find_pseudo_obj("originfont", pseudo);
		return (font) ? font : this.currentstyle.labelfont;
	};

	_pChartAxis.on_find_CurrentStyle_originLine = function (pseudo) {
		var line = this._find_pseudo_obj("originline", pseudo);
		return (line) ? line : this.currentstyle.rulermajorline;
	};

	_pChartAxis.on_find_CurrentStyle_originPadding = function (pseudo) {
		var padding = this._find_pseudo_obj("originpadding", pseudo);
		return (padding) ? padding : this._default_padding;
	};

	_pChartAxis.on_find_CurrentStyle_originSize = function (pseudo) {
		var size = this._find_pseudo_obj("originsize", pseudo);
		return (size) ? size : this.currentstyle.size;
	};

	_pChartAxis.on_find_CurrentStyle_rulerAlign = function (pseudo) {
		var align = this._find_pseudo_obj("ruleralign", pseudo);
		return (align) ? align : this._default_align;
	};

	_pChartAxis.on_find_CurrentStyle_rulerMajorLine = function (pseudo) {
		return this._find_pseudo_obj("rulermajorline", pseudo);
	};

	_pChartAxis.on_find_CurrentStyle_rulerMajorSize = function (pseudo) {
		return this._find_pseudo_obj("rulermajorsize", pseudo);
	};

	_pChartAxis.on_find_CurrentStyle_rulerMinerLine = function (pseudo) {
		return this._find_pseudo_obj("rulerminorline", pseudo);
	};

	_pChartAxis.on_find_CurrentStyle_rulerMinerSize = function (pseudo) {
		return this._find_pseudo_obj("rulerminersize", pseudo);
	};

	_pChartAxis.on_find_CurrentStyle_titleAlign = function (pseudo) {
		var align = this._find_pseudo_obj("titlealign", pseudo);
		return (align) ? align : this._default_align;
	};

	_pChartAxis.on_find_CurrentStyle_titleColor = function (pseudo) {
		var padding = this._find_pseudo_obj("titlecolor", pseudo);
		return (padding) ? padding : this.currentstyle.color;
	};

	_pChartAxis.on_find_CurrentStyle_titleFont = function (pseudo) {
		var font = this._find_pseudo_obj("titlefont", pseudo);
		return (font) ? font : this.currentstyle.font;
	};

	_pChartAxis.on_find_CurrentStyle_titlePadding = function (pseudo) {
		var padding = this._find_pseudo_obj("titlepadding", pseudo);
		return (padding) ? padding : this._default_padding;
	};

	_pChartAxis.on_find_CurrentStyle_titleRotate = function (pseudo) {
		return this._find_pseudo_obj("titlerotate", pseudo);
	};

	_pChartAxis._loadFromDOM = function (elem) {
		if (elem && elem.attributes) {
			var nodeName = "";
			var nodeValue = "";
			var length = elem.attributes.length;
			for (var i = 0; i < length; i++) {
				nodeName = elem.attributes[i].nodeName;
				nodeValue = elem.attributes[i].nodeValue;

				if (nodeName == "id") {
					this.id = nodeValue;
					this._type_name += nodeValue;
				}
				else {
					this["set_" + nodeName] && this["set_" + nodeName](nodeValue);
				}
			}
		}
	};

	_pChartAxis._getBindText = function (dataset, binddata, rowidx) {
		if (binddata._bindtype == 0) {
			return binddata._value;
		}
		else {
			if (dataset == null) {
				return undefined;
			}
			if (binddata._bindtype == 1) {
				return dataset.getColumn(rowidx, binddata._bindexpr);
			}
			else {
				var exprfn = this._exprfn;
				if (!exprfn) {
					exprfn = this._exprfn = dataset._createExprFunc(binddata._bindexpr);
				}
				if ((typeof exprfn) == "function") {
					return exprfn.call(this, rowidx, rowidx, this.parent, dataset);
				}
			}
		}
		return "";
	};

	_pChartAxis._appendZeroByidx = function (num, idx) {
		var str = num.toString().split(".");
		var post = str[0];
		var pre = str[1] ? str[1].substr(0, idx) : "";
		var len = pre.length;

		for (var i = len; i < idx; i++) {
			pre += "0";
		}
		return post + "." + pre;
	};

	_pChartAxis._decimalless = 0;
	_pChartAxis.on_updateDecimalless = function () {
		var val = [this.rulermin, this.rulermax, this.origindata, this.markdata, this.rulermajorunit, this.rulerminorunit];
		var ret = [];
		var len = val.length;
		for (var i = 0; i < len; i++) {
			if (val[i]) {
				val[i] = val[i].toString().replace(/(0*$)/g, "");
				val[i] = val[i].split(".")[1];
				val[i] && ret.push(val[i].length);
			}
		}

		ret = ret.sort(function (a, b) {
			return b - a;
		})[0];
		this._decimalless = ret || 0;
	};

	_pChartAxis._recalcLayout = function (rc) {
		if (!this.visible) {
			return false;
		}

		this._items.splice(0, this._items.length);
		this._exprfn = null;

		var parent = this.parent;
		var curstyle = this.currentstyle;

		var value;
		var text = this.titletext;
		var font = curstyle.titlefont;
		var textsize = nexacro._getTextSize2(text, font);
		this._title_width = textsize[0];
		this._title_height = textsize[1];

		var guide_width = 0;
		var main_size = nexacro.getStyleValueInt(curstyle.rulermajorsize, 0);
		this._major_size = main_size;
		var sub_size = nexacro.getStyleValueInt(curstyle.rulerminersize, 0);
		this._miner_size = sub_size;
		if (sub_size > guide_width) {
			guide_width = sub_size;
		}

		var label_height = 0, label_width = 0;
		if (this.id == "xaxis") {
			var dataset = parent._binddataset;
			if (dataset) {
				var cnt = dataset.rowcount;
				var label = this.label;
				font = curstyle.labelfont;
				for (var row = 0; row < cnt; row++) {
					var text = this._getBindText(dataset, label, row);
					var item = new nexacro.ChartAxisItem(row, text);
					textsize = nexacro._getTextSize2(text, font);

					item.text_width = textsize[0];
					item.text_height = textsize[1];
					if (item.text_width > label_width) {
						label_width = item.text_width;
					}

					if (item.text_height > label_height) {
						label_height = item.text_height;
					}

					this._items.push(item);
				}
			}

			this._text_maxwidth = label_width;
			this._text_maxheight = label_height;

			var rotate = nexacro.getStyleValueFloat(curstyle.labelrotate, 0);

			if (rotate != 0) {
				var rad = rotate * Math.PI / 180;
				var val = label_width * Math.sin(rad);
				if (val < 0) {
					val = -val;
				}
				main_size += val;
				val = label_height * Math.cos(rad) / 2;
				if (val < 0) {
					val = -val;
				}
				main_size += val;
				main_size = Math.ceil(main_size);
				if (main_size > guide_width) {
					guide_width = main_size;
				}
			}
			else {
				main_size += label_height;
				if (main_size > guide_width) {
					guide_width = main_size;
				}
			}

			var padding = curstyle.labelpadding;
			if (padding) {
				guide_width += padding.top + padding.bottom;
			}
		}
		else {
			var unit_val = this.rulermajorunit;
			var mark_val = this.markdata;
			var org_val = this.origindata;
			var min_val = this.rulermin;
			var max_val = this.rulermax;
			if (unit_val == undefined) {
				unit_val = 100;
			}

			var padding;

			if (org_val != undefined) {
				text = this.originlabel;
				if (text == "") {
					text = org_val + "";
				}
				var org_size = nexacro.getStyleValueInt(curstyle.originsize, 0);
				if (org_size < main_size) {
					org_size = main_size;
				}

				if (this._decimalless > 0) {
					text = this._appendZeroByidx(text, this._decimalless);
				}

				font = curstyle.originfont;
				textsize = nexacro._getTextSize2(text, font);

				this._org_size = org_size;
				this._org_text = text;
				this._org_width = textsize[0];
				this._org_height = textsize[1];
				org_size += this._org_width;
				padding = curstyle.originpadding;

				if (padding) {
					org_size += padding.left + padding.right;
				}

				if (org_size > guide_width) {
					guide_width = org_size;
				}
			}
			if (mark_val != undefined) {
				text = this.marklabel;
				if (text == "") {
					text = mark_val + "";
				}
				var mark_size = nexacro.getStyleValueInt(curstyle.marksize, 0);
				if (mark_size < main_size) {
					mark_size = main_size;
				}

				if (this._decimalless > 0) {
					text = this._appendZeroByidx(text, this._decimalless);
				}

				font = curstyle.markfont;
				textsize = nexacro._getTextSize2(text, font);
				this._mark_size = mark_size;
				this._mark_text = text;
				this._mark_width = textsize[0];
				this._mark_height = textsize[1];
				mark_size += this._mark_width;
				padding = curstyle.markpadding;
				var l = 0, r = 0, t = 0, b = 0;
				if (padding) {
					mark_size += padding.left + padding.right;
				}

				if (mark_size > guide_width) {
					guide_width = mark_size;
				}
			}

			if (min_val == undefined || max_val == undefined) {
				var chk_min = (min_val == undefined);
				var chk_max = (max_val == undefined);
				var dataset = parent._binddataset;
				if (dataset) {
					var cnt = dataset.rowcount;
					var checked = false;
					var seriesset = parent.seriesset;
					var series_cnt = seriesset.length;
					var _text, text_offset;
					for (var s = 0; s < series_cnt; s++) {
						var series = seriesset[s];
						var used = (this.id == "y2axis") ? (series.yaxis == "y2axis") : (series.yaxis != "y2axis");
						if (used) {
							var data = series.data;
							var data_text = series.datatext;
							for (var row = 0; row < cnt; row++) {
								var val = series._getBindNumber(dataset, data, row);

								_text = series._getBindNumber(dataset, data_text, row);
								text_offset = nexacro._getTextSize2("" + _text, series.currentstyle.datatextfont)[1];
								text_offset += series.currentstyle.datatextpadding._getPaddingHeight();
								text_offset += series.currentstyle.datatextmargin._getMarginHeight();

								if (val) {
									if (chk_min && (min_val == undefined || val < min_val)) {
										min_val = val + text_offset;
									}

									if (chk_max && (max_val == undefined || val > max_val)) {
										max_val = val + text_offset;
									}
								}
							}
							checked = true;
						}
					}
					if (!checked && this.id == "y2axis") {
						if (chk_min) {
							min_val = parent.yaxis._min_val;
						}
						if (chk_max) {
							max_val = parent.yaxis._max_val;
						}
					}
				}
				if (chk_min && min_val == undefined) {
					min_val = 0;
				}
				if (chk_max && max_val == undefined) {
					if (min_val < 0) {
						max_val = 0;
					}
					else {
						max_val = min_val + unit_val;
					}
				}
			}
			else if (max_val < min_val) {
				var t = max_val;
				max_val = min_val;
				min_val = t;
			}

			if (org_val < min_val && org_val < max_val) {
			}
			else if (org_val > min_val && org_val > max_val) {
				max_val = org_val;
			}
			unit_min = Math.floor(min_val / unit_val);
			unit_max = Math.ceil(max_val / unit_val);

			var unit_min = 0;
			var unit_max = 0;
			if (org_val) {
				unit_min = Math.floor((min_val - org_val) / unit_val);
				unit_max = Math.ceil((max_val - org_val) / unit_val);
			}
			else {
				unit_min = Math.floor(min_val / unit_val);
				unit_max = Math.ceil(max_val / unit_val);
			}
			var cnt = unit_max - unit_min;
			if (cnt == 0) {
				unit_max++;
				cnt++;
			}

			this._unit_val = unit_val;
			this._min_val = min_val;
			this._max_val = max_val;
			this._unit_min_val = org_val + unit_min * unit_val;
			this._unit_max_val = org_val + unit_max * unit_val;
			this._org_val = org_val;

			font = curstyle.labelfont;
			for (var n = 0; n <= cnt; n++) {
				var val = (org_val + (n + unit_min) * unit_val);
				var text = val + "";

				if (this._decimalless > 0) {
					text = this._appendZeroByidx(text, this._decimalless);
				}

				var item = new nexacro.ChartAxisItem(n, text);
				textsize = nexacro._getTextSize2(text, font);
				item.item_type = "label";
				item.item_val = val;
				item.text_width = textsize[0];
				item.text_height = textsize[1];
				if (item.text_width > label_width) {
					label_width = item.text_width;
				}
				if (item.text_height > label_height) {
					label_height = item.text_height;
				}
				this._items.push(item);
			}
			this._text_maxwidth = label_width;
			this._text_maxheight = label_height;

			var item_size = main_size + label_width;
			padding = curstyle.labelpadding;
			if (padding) {
				item_size += padding.left + padding.right;
			}
			if (item_size > guide_width) {
				guide_width = item_size;
			}
		}

		this._item_maxsize = guide_width;

		if (this.id == "xaxis") {
			var bmargin = 0;
			if (curstyle.margin) {
				bmargin = curstyle.margin.bottom;
			}
			var height = this._item_maxsize + this._title_height;
			padding = curstyle.titlepadding;

			if (padding) {
				height += padding.top + padding.bottom;
			}

			var bottom = rc.bottom - bmargin;
			var top = bottom - height;
			if (top < rc.top) {
				top = rc.top;
			}
			this._total_width = 0;
			this._total_height = (bottom - top);
			rc.bottom = top;
			return true;
		}
		else if (this.id == "yaxis") {
			var margin = curstyle.margin;
			var l = 0, r = 0, t = 0, b = 0;
			if (margin) {
				l = margin.left;
				r = margin.right;
				t = margin.top;
				b = margin.bottom;
			}
			var bmargin = l;
			var width = this._item_maxsize + this._title_height;
			padding = curstyle.titlepadding;

			l = 0;
			r = 0;
			if (padding) {
				width += padding.left + padding.right;
			}

			var left = rc.left + bmargin;
			var right = left + width;
			if (right > rc.right) {
				right = rc.right;
			}
			this._total_width = (right - left);
			this._total_height = 0;
			rc.left = right;
			return true;
		}
		else if (this.id == "y2axis") {
			var bmargin = 0;
			if (curstyle.margin) {
				bmargin = curstyle.margin.right;
			}
			var width = this._item_maxsize + this._title_height;
			padding = curstyle.titlepadding;

			if (padding) {
				width += padding.left + padding.right;
			}

			var right = rc.right - bmargin;
			var left = right - width;

			if (left < rc.left) {
				left = rc.left;
			}

			this._total_width = (right - left);
			this._total_height = 0;
			rc.right = left;
			return true;
		}

		return true;
	};

	_pChartAxis._movePositionWithBound = function (rc) {
		var top = 0, left = 0, right = 0, bottom = 0, width = 0, height = 0;

		if (this.id == "xaxis") {
			left = rc.left - this._text_maxwidth;
			if (left < 0) {
				left = 0;
			}
			top = rc.bottom;
			width = rc.right + this._text_maxwidth - left;
			height = this._total_height;
		}
		else if (this.id == "yaxis") {
			left = rc.left - this._total_width;
			top = rc.top - this._text_maxwidth;
			if (top < 0) {
				top = 0;
			}
			width = this._total_width;
			height = rc.bottom + this._text_maxwidth - top;
		}
		else if (this.id == "y2axis") {
			left = rc.right;
			top = rc.top - this._text_maxwidth;
			if (top < 0) {
				top = 0;
			}
			width = this._total_width;
			height = rc.bottom + this._text_maxwidth - top;
		}

		if (this._adjust_left != left || this._adjust_width != width || this._adjust_top != top || this._adjust_height != height) {
			this._applysetPosition(left, top, width, height);
		}
		return true;
	};

	_pChartAxis._drawXAsis = function (canvas) {
		var items = this._items;
		var parent = this.parent;
		var data_rc = parent._data_area;
		var base_pos = data_rc.left - this._adjust_left;
		var base_width = data_rc.right - data_rc.left;
		var base_height = canvas.height;

		var item_start = parent._item_start;
		var item_cnt = item_cnt = parent._item_cnt;

		var curstyle = this.currentstyle;

		var title_text = this.titletext;
		var title_align = curstyle.titlealign ? curstyle.titlealign : nexacro._getCachedAlignObj("center middle");
		var title_font = curstyle.titlefont ? curstyle.titlefont : this.on_find_CurrentStyle_font();
		var title_color = curstyle.titelcolor ? curstyle.titlecolor._value : "black";
		var axis_size = nexacro.getStyleValueInt(curstyle.axissize, 0);
		var rotate_deg = curstyle.labelrotate;
		rotate_deg = nexacro.getStyleValueText(curstyle.labelrotate, null);

		var label_align = curstyle.labelalign;
		var label_font = curstyle.labelfont;
		var label_color = curstyle.labelcolor ? curstyle.labelcolor._value : "black";

		var main_line = curstyle.rulermajorline;
		var main_size = this._major_size;
		var bdraw_main = (main_line && main_line._isValid() && main_size > 0);

		var ruler_type = this.rulerbasetype;

		var pos, x, y;
		var padding;

		if (title_text != "") {
			padding = curstyle.titlepadding;
			canvas.setElementFont(title_font);
			canvas.setElementFillStyle(title_color);
			var y = Math.floor(base_height - (this._title_height / 2));

			if (padding) {
				y -= padding.bottom;
			}

			switch (title_align.halign) {
				case "left":
					var x = base_pos;
					canvas.drawFillText(title_text, base_pos, y, 0);
					break;
				case "center":
					x = Math.round(base_pos + (base_width / 2) - (this._title_width / 2));
					canvas.drawFillText(title_text, x, y, 0);
					break;
				case "right":
					x = Math.floor(base_pos + base_width - this._title_width);
					canvas.drawFillText(title_text, x, y, 0);
					break;
			}
		}

		var item_div = parent._item_div;
		var item_maxcnt = item_cnt;
		if (item_maxcnt > items.length) {
			item_maxcnt = items.length;
		}

		if (bdraw_main) {
			canvas.setElementStrokeStyle(main_line.color);
			if (axis_size > 0) {
				canvas.setElementLineWidth(axis_size);
				var center = axis_size / 2;
				canvas.drawStrokeHLine(center, base_pos, base_pos + base_width);
			}

			canvas.setElementLineWidth(main_line._width);
			var offset = main_line._width / 2;
			var y1 = axis_size;
			var y2 = axis_size + main_size;
			if (ruler_type == "distance") {
				pos = base_pos;
				for (var i = 0; i < item_cnt; i++) {
					x = Math.round(pos) + offset;
					canvas.drawStrokeVLine(x, y1, y2);
					pos += item_div;
				}
				x = Math.round(pos) + offset;
				canvas.drawStrokeVLine(x, y1, y2);
			}
			else {
				pos = Math.round(base_pos + item_div / 2);
				for (var i = 0; i < item_cnt; i++) {
					x = Math.round(pos) + offset;
					canvas.drawStrokeVLine(x, y1, y2);
					pos += item_div;
				}
			}
			canvas.drawStroke();
		}

		padding = curstyle.labelpadding;
		canvas.setElementFont(label_font);
		canvas.setElementFillStyle(label_color);
		var pos_y = axis_size + main_size;
		if (padding) {
			pos_y += padding.top;
		}

		if (rotate_deg === null) {
			pos = base_pos;
			switch (label_align.halign) {
				case "left":
					for (var i = 0; i < item_maxcnt; i++) {
						var item = items[i + item_start];
						if (item) {
							x = pos;
							y = Math.round(pos_y + item.text_height / 2);
							canvas.drawFillText(item.text, x, y, 0);
							pos += item_div;
						}
					}
					break;
				case "center":
					pos += item_div / 2;
					for (var i = 0; i < item_maxcnt; i++) {
						var item = items[i + item_start];
						if (item) {
							x = Math.round(pos - (item.text_width / 2));
							y = Math.round(pos_y + item.text_height / 2);
							canvas.drawFillText(item.text, x, y, 0);
							pos += item_div;
						}
					}
					break;
				case "right":
					pos += item_div;
					for (var i = 0; i < item_maxcnt; i++) {
						var item = items[i + item_start];
						if (item) {
							x = pos - item.text_width;
							y = Math.round(pos_y + item.text_height / 2);
							canvas.drawFillText(item.text, x, y + offset, 0);
							pos += item_div;
						}
					}
					break;
			}
		}
		else if (rotate_deg < 180) {
			pos = base_pos + item_div / 2;
			y = Math.round(pos_y);
			for (var i = 0; i < item_maxcnt; i++) {
				var item = items[i + item_start];
				if (item) {
					x = Math.round(pos);
					canvas.drawFillText(item.text, x, y, rotate_deg);
					pos += item_div;
				}
			}
		}
		else {
			var rotate_rad = rotate_deg * Math.PI / 180;
			pos = base_pos + item_div / 2;
			for (var i = 0; i < item_maxcnt; i++) {
				var item = items[i + item_start];
				if (item) {
					x = Math.round(pos + Math.cos(item.text_width));
					y = Math.ceil(pos_y - Math.sin(item.text_width));
					canvas.drawFillText(item.text, x, y, rotate_deg);
					pos += item_div;
				}
			}
		}
	};
	_pChartAxis._drawYAsis = function (canvas) {
		var items = this._items;
		var parent = this.parent;
		var data_rc = parent._data_area;
		var base_pos = data_rc.top - this._adjust_top;
		var base_width = canvas.width;
		var base_height = data_rc.bottom - data_rc.top;

		var isY2 = false;
		if (this.id == "y2axis") {
			isY2 = true;
		}

		var item_cnt = items.length;

		var curstyle = this.currentstyle;

		var min_val = this._unit_min_val;
		var max_val = this._unit_max_val;

		var title_text = this.titletext;
		var title_align = curstyle.titlealign ? curstyle.titlealign : nexacro._getCachedAlignObj("center middle");
		var title_font = curstyle.titlefont ? curstyle.titlefont : this.on_find_CurrentStyle_font();
		var title_color = curstyle.titlecolor ? curstyle.titlecolor._value : "black";

		var axis_size = nexacro.getStyleValueInt(curstyle.axissize, 0);

		var label_font = curstyle.labelfont;
		var label_color = curstyle.labelcolor ? curstyle.labelcolor._value : "black";

		var main_line = curstyle.rulermajorline;
		var main_size = this._major_size;

		var sub_line = curstyle.rulerminorline;
		var sub_size = this._miner_size;
		var bdraw_main = (main_line && main_line._isValid() && main_size > 0);
		var bdraw_sub = (sub_line && sub_line._isValid() && sub_size > 0);
		var pos_y, pos_x, pos_x2, x, y;

		var padding = curstyle.titlepadding;
		if (title_text != "") {
			if (isY2) {
				canvas.setElementFont(title_font);
				canvas.setElementFillStyle(title_color);
				pos_x = Math.floor(base_width - (this._title_height / 2));
				if (padding) {
					pos_x -= padding.right;
				}
				switch (title_align.valign) {
					case "top":
						y = base_pos;
						canvas.drawFillText(title_text, pos_x, y, 90);
						break;
					case "middle":
						y = Math.round(base_pos + (base_height / 2) - (this._title_width / 2));
						canvas.drawFillText(title_text, pos_x, y, 90);
						break;
					case "bottom":
						y = base_pos + base_height - this._title_width;
						canvas.drawFillText(title_text, pos_x, y, 90);
						break;
				}
			}
			else {
				canvas.setElementFont(title_font);
				canvas.setElementFillStyle(title_color);
				pos_x = Math.ceil(this._title_height / 2);
				if (padding) {
					pos_x += padding.left;
				}
				switch (title_align.valign) {
					case "top":
						y = base_pos - this._title_width;
						canvas.drawFillText(title_text, pos_x, y, 270);
						break;
					case "middle":
						y = Math.round(base_pos + (base_height / 2) + (this._title_width / 2));
						canvas.drawFillText(title_text, pos_x, y, 270);
						break;
					case "bottom":
						y = base_pos + base_height;
						canvas.drawFillText(title_text, pos_x, y, 270);
						break;
				}
			}
		}

		var item_div = (base_height) / (item_cnt - 1);

		var org_val = this.origindata;
		var org_size = this._org_size;
		var org_line = curstyle.originline;
		var chk_org = (org_line && org_line._isValid() && org_size > 0);

		var mark_val = this.markdata;
		var mark_size = this._mark_size;
		var mark_line = curstyle.markline;
		var chk_mark = (mark_line && mark_line._isValid() && mark_size > 0);

		var center = axis_size / 2;
		var offset = 0;
		if (main_line) {
			offset += main_line._width / 2;
		}

		if (bdraw_main) {
			canvas.setElementStrokeStyle(main_line ? main_line.color : null);
			if (axis_size) {
				canvas.setElementLineWidth(axis_size);
				pos = base_pos + base_height;
				if (main_line) {
					pos += main_line._width;
				}

				if (isY2) {
					canvas.drawStrokeVLine(center, base_pos, pos);
				}
				else {
					canvas.drawStrokeVLine(base_width - center, base_pos, pos);
				}
			}
			if (main_line) {
				canvas.setElementLineWidth(main_line._width);
			}

			if (isY2) {
				pos_x = axis_size;
				pos_x2 = axis_size + main_size;
			}
			else {
				pos_x2 = base_width - axis_size;
				pos_x = pos_x2 - main_size;
			}
			pos_y = base_pos + base_height;
			for (var i = 0; i < item_cnt; i++) {
				var item = items[i];
				if (item.item_val != org_val && item.item_val != mark_val) {
					y = Math.round(pos_y);
					canvas.drawStrokeHLine(y + offset, pos_x, pos_x2);
				}
				pos_y -= item_div;
			}
		}

		canvas.setElementFont(label_font);
		canvas.setElementFillStyle(label_color);
		pos_y = base_pos + base_height;
		padding = curstyle.labelpadding;
		if (isY2) {
			pos_x = axis_size + main_size;
			if (padding) {
				pos_x += padding.left;
			}
		}
		else {
			pos_x = base_width - axis_size - main_size;
			if (padding) {
				pos_x -= padding.right;
			}
		}

		var temp_org_y = 0;

		for (var i = 0; i < item_cnt; i++) {
			var item = items[i];
			if (item.item_val != org_val && item.item_val != mark_val) {
				x = pos_x - (isY2 ? 0 : item.text_width);
				y = Math.round(pos_y);
				canvas.drawFillText(item.text, x, y, 0);
			}
			else if (item.item_val == org_val) {
				temp_org_y = Math.round(pos_y);
			}
			pos_y -= item_div;
		}

		if (org_val <= max_val && org_val >= min_val && org_val != mark_val) {
			var base_height2 = temp_org_y - base_pos;
			var org_label = this._org_text;
			var org_font = curstyle.originfont;
			var org_color = curstyle.origincolor;
			if (org_color) {
				org_color = org_color._value;
			}
			else {
				org_color = "black";
			}

			if (isY2) {
				pos_x = axis_size;
				pos_x2 = axis_size + org_size;
			}
			else {
				pos_x2 = base_width - axis_size;
				pos_x = pos_x2 - org_size;
			}

			pos_y = base_pos + base_height2;
			var temp_up = org_val - min_val;
			var temp_down = max_val - min_val;
			var _value = 0;
			if (temp_down == 0) {
				_value = temp_up;
			}
			pos_y -= base_height2 * _value;
			y = Math.round(pos_y);

			if (chk_org) {
				canvas._setLineStyle(org_line);
				canvas.setElementStrokeStyle(org_line.color);
				canvas.setElementLineWidth(org_line._width);
				canvas.moveTo(pos_x, y + offset);
				canvas.lineTo(pos_x2, y + offset);
				canvas.drawStroke();
			}
			canvas.setElementFont(org_font);
			canvas.setElementFillStyle(org_color);
			if (isY2) {
				x = pos_x2;
			}
			else {
				x = pos_x - this._org_width;
			}
			canvas.drawFillText(org_label, x, y, 0);
		}


		if (mark_val <= max_val && mark_val >= min_val) {
			var mark_label = this._mark_text;
			var mark_font = curstyle.markfont;
			var mark_color = curstyle.markcolor ? curstyle.markcolor._value : "black";

			if (isY2) {
				pos_x = axis_size;
				pos_x2 = axis_size + mark_size;
			}
			else {
				pos_x2 = base_width - axis_size;
				pos_x = pos_x2 - mark_size;
			}
			pos_y = base_pos + base_height;
			pos_y -= base_height * (mark_val - min_val) / (max_val - min_val);
			y = Math.round(pos_y);
			if (chk_mark) {
				canvas.setElementStrokeStyle(mark_line.color);
				canvas.setElementLineWidth(mark_line._width);
				canvas.moveTo(pos_x, y + offset);
				canvas.lineTo(pos_x2, y + offset);
				canvas.drawStroke();
			}
			canvas.setElementFont(mark_font);
			canvas.setElementFillStyle(mark_color);
			if (isY2) {
				canvas.drawFillText(mark_label, pos_x2, y, 0);
			}
			else {
				canvas.drawFillText(mark_label, pos_x - this._mark_width, y, 0);
			}
		}
	};

	_pChartAxis.ondraw = function (canvas) {
		if (!canvas || !this.parent.enableredraw || canvas.width <= 0 || canvas.height <= 0) {
			return;
		}

		canvas.clearRect();
		if (this.id == "xaxis") {
			this._drawXAsis(canvas);
		}
		else {
			this._drawYAsis(canvas);
		}
		canvas.endDraw();
	};
	_pChartAxis.set_label = function (v) {
		if (v != this.label._value) {
			this.label._set(v);
			if (this._control_element) {
				this.on_apply_label();
			}
		}
		return v;
	};

	_pChartAxis.on_apply_label = function () {
		this.parent.on_updateDrawAreaLayout();
	};

	_pChartAxis.set_markdata = function (v) {
		var val = parseFloat(v) | 0;
		if ((+val) != (+val)) {
			val = undefined;
		}
		if (val != this.markdata) {
			this.markdata = val;
			this.on_updateDecimalless();
		}
		return val;
	};

	_pChartAxis.set_marklabel = function (v) {
		if (v != this.marklabel) {
			this.marklabel = v;
		}
		return v;
	};

	_pChartAxis.set_origindata = function (v) {
		var val = parseFloat(v) | 0;

		if (val != this.origindata) {
			this.origindata = val;
			this.__origindata = val;

			this.on_updateDecimalless();
			if (this._control_element) {
				var parent = this.parent;
				parent.on_updateDrawAreaLayout();
				parent.on_updateDataAreaLayout();
				this.redraw();
				parent.board.redraw();
			}
		}
		return val;
	};

	_pChartAxis.set_originlabel = function (v) {
		if (v != this.originlabel) {
			this.originlabel = v;
		}
		return v;
	};

	_pChartAxis.set_rulerbasetype = function (v) {
		if (v != "distance") {
			v = "point";
		}
		if (v != this.rulerbasetype) {
			this.rulerbasetype = v;
		}
		return v;
	};

	_pChartAxis.set_rulermajorunit = function (v) {
		var val = parseFloat(v);
		if ((+val) != (+val)) {
			val = -1;
		}
		if (val != this.rulermajorunit) {
			this.rulermajorunit = val;
			this.on_updateDecimalless();
			if (this._control_element) {
				var parent = this.parent;
				parent.on_updateDrawAreaLayout();
				parent.on_updateDataAreaLayout();
				this.redraw();
				parent.board.redraw();
			}
		}
		return val;
	};

	_pChartAxis.set_rulermax = function (v) {
		var val = parseFloat(v) | 0;
		if ((+val) != (+val)) {
			val = undefined;
		}
		if (val != this.rulermax) {
			this.rulermax = val;
			this.on_updateDecimalless();

			if (this._control_element) {
				var parent = this.parent;
				parent.on_updateDrawAreaLayout();
				parent.on_updateDataAreaLayout();
				this.redraw();
				parent.board.redraw();
			}
		}
		return val;
	};

	_pChartAxis.set_rulermin = function (v) {
		var val = parseFloat(v) | 0;
		if ((+val) != (+val)) {
			val = undefined;
		}
		if (val != this.rulermin) {
			this.rulermin = val;
			this.on_updateDecimalless();
			this.on_apply_rulermin();
		}
		return val;
	};

	_pChartAxis.on_apply_rulermin = function () {
		var control = this.getElement();
		if (control) {
			var parent = this.parent;
			parent.on_updateDrawAreaLayout();
			parent.on_updateDataAreaLayout();
			this.redraw();
			parent.board.redraw();
		}
	};

	_pChartAxis.set_rulerminorunit = function (v) {
		var val = parseFloat(v);
		if ((+val) != (+val)) {
			val = -1;
		}
		if (val != this.rulerminorunit) {
			this.rulerminorunit = val;
			this.on_updateDecimalless();
		}
		return val;
	};

	_pChartAxis.set_rulersort = function (v) {
		if (v != this.rulersort) {
			this.rulersort = v;
		}
		return v;
	};

	_pChartAxis.set_titletext = function (v) {
		if (v != this.titletext) {
			this.titletext = v;
		}
		return v;
	};

	_pChartAxis.set_viewcount = function (v) {
		if (v != this.viewcount) {
			this.viewcount = v;
		}
		return v;
	};

	_pChartAxis.set_viewmax = function (v) {
		var val = parseInt(v) | 0;
		if ((+val) != (+val)) {
			val = undefined;
		}
		if (val != this.viewmax) {
			this.viewmax = val;
		}
		return val;
	};

	_pChartAxis.set_viewmin = function (v) {
		var val = parseInt(v) | 0;
		if ((+val) != (+val)) {
			val = undefined;
		}
		if (val != this.viewmin) {
			this.viewmin = val;
		}
		return val;
	};

	_pChartAxis = null;

	nexacro.ChartBoard = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.CanvasCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);
	};
	var _pChartBoard = nexacro.ChartBoard.prototype = nexacro._createPrototype(nexacro.CanvasCtrl, nexacro.ChartBoard);
	_pChartBoard._type_name = "Chart>#board";

	_pChartBoard.usemarky = false;
	_pChartBoard.usemarky2 = false;
	_pChartBoard.useoriginy = false;
	_pChartBoard.useoriginy2 = false;
	_pChartBoard.yaxismajorunit = -1;
	_pChartBoard.yaxisminorunit = -1;

	_pChartBoard.on_create_custom_style = function () {
		return new nexacro.ChartBoard_Style(this);
	};

	_pChartBoard.on_create_custom_currentStyle = function () {
		return new nexacro.ChartBoard_CurrentStyle();
	};

	_pChartBoard.on_apply_custom_pseudo = function (pseudo) {
		var pseudo = this._pseudo;
		var curstyle = this.currentstyle;

		curstyle.font = this.on_find_CurrentStyle_font(pseudo);
		curstyle.color = this.on_find_CurrentStyle_color(pseudo);
		curstyle.align = this.on_find_CurrentStyle_align(pseudo);
		curstyle.padding = this.on_find_CurrentStyle_padding(pseudo);

		curstyle.markliney = this.on_find_CurrentStyle_markLineY(pseudo);
		curstyle.markliney2 = this.on_find_CurrentStyle_markLineY2(pseudo);
		curstyle.originliney = this.on_find_CurrentStyle_originLineY(pseudo);
		curstyle.originliney2 = this.on_find_CurrentStyle_originLineY2(pseudo);
		curstyle.xaxismajorline = this.on_find_CurrentStyle_xAxisMajorLine(pseudo);
		curstyle.yaxismajorline = this.on_find_CurrentStyle_yAxisMajorLine(pseudo);
		curstyle.yaxisminorline = this.on_find_CurrentStyle_yAxisMinorLine(pseudo);
	};

	_pChartBoard.on_update_style_markliney = function () {
		this.currentstyle.markliney = this.on_find_CurrentStyle_markLineY(this._pseudo);
		this.ondraw(this._canvas);
	};
	_pChartBoard.on_update_style_markliney2 = function () {
		this.currentstyle.markliney2 = this.on_find_CurrentStyle_markLineY2(this._pseudo);
		this.ondraw(this._canvas);
	};
	_pChartBoard.on_update_style_originliney = function () {
		this.currentstyle.originliney = this.on_find_CurrentStyle_originLineY(this._pseudo);
		this.ondraw(this._canvas);
	};
	_pChartBoard.on_update_style_originliney2 = function () {
		this.currentstyle.originliney2 = this.on_find_CurrentStyle_originLineY2(this._pseudo);
		this.ondraw(this._canvas);
	};
	_pChartBoard.on_update_style_xaxismajorline = function () {
		this.currentstyle.xaxismajorline = this.on_find_CurrentStyle_xAxisMajorLine(this._pseudo);
	};
	_pChartBoard.on_update_style_yaxismajorline = function () {
		this.currentstyle.yaxismajorline = this.on_find_CurrentStyle_yAxisMajorLine(this._pseudo);
		this.ondraw(this._canvas);
	};
	_pChartBoard.on_update_style_yaxisminorline = function () {
		this.currentstyle.yaxisminorline = this.on_find_CurrentStyle_yAxisMinorLine(this._pseudo);
	};

	_pChartBoard.on_find_CurrentStyle_markLineY = function (pseudo) {
		return this._find_pseudo_obj("markliney", pseudo);
	};
	_pChartBoard.on_find_CurrentStyle_markLineY2 = function (pseudo) {
		return this._find_pseudo_obj("markliney2", pseudo);
	};
	_pChartBoard.on_find_CurrentStyle_originLineY = function (pseudo) {
		return this._find_pseudo_obj("originliney", pseudo);
	};
	_pChartBoard.on_find_CurrentStyle_originLineY2 = function (pseudo) {
		return this._find_pseudo_obj("originliney2", pseudo);
	};
	_pChartBoard.on_find_CurrentStyle_xAxisMajorLine = function (pseudo) {
		return this._find_pseudo_obj("xaxismajorline", pseudo);
	};
	_pChartBoard.on_find_CurrentStyle_yAxisMajorLine = function (pseudo) {
		return this._find_pseudo_obj("yaxismajorline", pseudo);
	};
	_pChartBoard.on_find_CurrentStyle_yAxisMinorLine = function (pseudo) {
		return this._find_pseudo_obj("yaxisminorline", pseudo);
	};

	_pChartBoard._loadFromDOM = function (elem) {
		if (elem && elem.attributes) {
			var nodeName = "";
			var nodeValue = "";
			var length = elem.attributes.length;
			for (var i = 0; i < length; i++) {
				nodeName = elem.attributes[i].nodeName;
				nodeValue = elem.attributes[i].nodeValue;

				if (nodeName == "id") {
					this.id = nodeValue;
				}
				else {
					this["set_" + nodeName] && this["set_" + nodeName](nodeValue);
				}
			}
		}
	};

	_pChartBoard._movePositionWithBound = function (rc) {
		var width = rc.right - rc.left;
		var height = rc.bottom - rc.top;
		if (this._adjust_left != rc.left || this._adjust_width != width || this._adjust_top != rc.top || this._adjust_height != height) {
			this._applysetPosition(rc.left, rc.top, width, height);
		}
		return true;
	};
	_pChartBoard.ondraw = function (canvas) {
		if (!canvas || !this.parent.enableredraw || canvas.width <= 0 || canvas.height <= 0) {
			return;
		}

		canvas.clearRect();

		var curstyle = this.currentstyle;
		var parent = this.parent;
		var base_width = canvas.width;
		var base_height = canvas.height;

		var offset_val, pos_y, y;
		if (parent.yaxis) {
			var yaxis = parent.yaxis;
			var min_val = yaxis._unit_min_val;
			var max_val = yaxis._unit_max_val;
			var tot_val = max_val - min_val;

			var main_line = curstyle.yaxismajorline;
			if (main_line && main_line._isValid()) {
				var unit_val = this.yaxismajorunit;
				if (unit_val < 1) {
					unit_val = yaxis.rulermajorunit;
				}

				if (unit_val > 0) {
					var offset = main_line._width / 2;
					canvas._setLineStyle(main_line);
					var pos_val = min_val;
					while (pos_val <= max_val) {
						offset_val = (pos_val - min_val);
						if (offset_val > 0) {
							pos_y = base_height - (offset_val * base_height) / tot_val;
							y = Math.round(pos_y);
							canvas.drawStrokeHLine(y + offset, 0, base_width);
						}
						pos_val += unit_val;
					}
				}
			}
			if (this.useoriginy) {
				var org_val = yaxis.origindata;
				if (org_val > min_val && org_val <= max_val) {
					var org_line = curstyle.originliney;
					if (org_line && org_line._isValid()) {
						canvas._setLineStyle(org_line);
						offset_val = org_val - min_val;
						pos_y = base_height - (offset_val * base_height) / tot_val;
						y = Math.round(pos_y);
						canvas.drawStrokeHLine(y + offset, 0, base_width);
					}
				}
			}
			if (this.usemarky) {
				var mark_val = yaxis.markdata;
				if (mark_val > min_val && mark_val <= max_val) {
					var mark_line = curstyle.markliney;
					if (mark_line && mark_line._isValid()) {
						canvas._setLineStyle(mark_line);
						offset_val = mark_val - min_val;
						pos_y = base_height - (offset_val * base_height) / tot_val;
						y = Math.round(pos_y);
						canvas.drawStrokeHLine(y + offset, 0, base_width);
					}
				}
			}
		}

		if (parent.y2axis) {
			var y2axis = parent.y2axis;
			var min_val = y2axis._unit_min_val;
			var max_val = y2axis._unit_max_val;
			var tot_val = max_val - min_val;

			if (this.useoriginy2) {
				var org_val = y2axis.origindata;
				if (org_val > min_val && org_val <= max_val) {
					var org_line = curstyle.originliney2;
					if (org_line && org_line._isValid()) {
						canvas._setLineStyle(org_line);
						offset_val = org_val - min_val;
						pos_y = base_height - (offset_val * base_height) / tot_val;
						y = Math.round(pos_y);
						canvas.drawStrokeHLine(y + offset, 0, base_width);
					}
				}
			}
			if (this.usemarky2) {
				var mark_val = y2axis.markdata;
				if (mark_val > min_val && mark_val <= max_val) {
					var mark_line = curstyle.markliney2;
					if (mark_line && mark_line._isValid()) {
						canvas._setLineStyle(mark_line);
						offset_val = mark_val - min_val;
						pos_y = base_height - (offset_val * base_height) / tot_val;
						y = Math.round(pos_y);
						canvas.drawStrokeHLine(y + offset, 0, base_width);
					}
				}
			}
		}
		canvas.endDraw();
	};


	_pChartBoard.set_usemarky = function (v) {
		if (v == "true") {
			v = true;
		}
		else {
			v = false;
		}
		if (v != this.usemarky) {
			this.usemarky = v;
		}
		return v;
	};

	_pChartBoard.set_usemarky2 = function (v) {
		if (v == "true") {
			v = true;
		}
		else {
			v = false;
		}
		if (v != this.usemarky2) {
			this.usemarky2 = v;
		}
		return v;
	};

	_pChartBoard.set_useoriginy = function (v) {
		if (v == "true") {
			v = true;
		}
		else {
			v = false;
		}
		if (v != this.useoriginy) {
			this.useoriginy = v;
		}
		return v;
	};

	_pChartBoard.set_useoriginy2 = function (v) {
		if (v == "true") {
			v = true;
		}
		else {
			v = false;
		}
		if (v != this.useoriginy2) {
			this.useoriginy2 = v;
		}
		return v;
	};


	_pChartBoard.set_yaxismajorunit = function (v) {
		var val = parseFloat(v) | 0;
		if ((+val) != (+val)) {
			val = undefined;
		}
		if (val != this.yaxismajorunit) {
			this.yaxismajorunit = val;
			this.redraw();
		}
		return val;
	};

	_pChartBoard.set_yaxisminorunit = function (v) {
		var val = parseFloat(v) | 0;
		if ((+val) != (+val)) {
			val = undefined;
		}
		if (val != this.yaxisminorunit) {
			this.yaxisminorunit = val;
		}
		return val;
	};

	_pChartBoard = null;

	nexacro.ChartSeries = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.CanvasCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);
		this.data = new nexacro.BindableValue("");
		this.datatext = new nexacro.BindableValue("");
	};
	var _pChartSeries = nexacro.ChartSeries.prototype = nexacro._createPrototype(nexacro.CanvasCtrl, nexacro.ChartSeries);
	_pChartSeries._type_name = "Chart>#";

	_pChartSeries._bar_item_offset = 0;
	_pChartSeries._bar_item_width = 0;

	_pChartSeries._exprfn = null;
	_pChartSeries._exprtextfn = null;

	_pChartSeries._defaultStrokePen = nexacro._getCachedStyleObj("strokepen", "1px solid black");

	_pChartSeries.data = "";
	_pChartSeries.datatext = "";
	_pChartSeries.label = "";
	_pChartSeries.type = "line";
	_pChartSeries.xaxis = "xaxis";
	_pChartSeries.yaxis = "yaxis";

	_pChartSeries.on_create_custom_style = function () {
		return new nexacro.ChartSeries_Style(this);
	};

	_pChartSeries.on_create_custom_currentStyle = function () {
		return new nexacro.ChartSeries_CurrentStyle();
	};

	_pChartSeries.on_apply_custom_pseudo = function (pseudo) {
		var pseudo = this._pseudo;
		var curstyle = this.currentstyle;

		curstyle.font = this.on_find_CurrentStyle_font(pseudo);
		curstyle.color = this.on_find_CurrentStyle_color(pseudo);
		curstyle.align = this.on_find_CurrentStyle_align(pseudo);
		curstyle.padding = this.on_find_CurrentStyle_padding(pseudo);

		curstyle.startangle = this.on_find_CurrentStyle_startAngle(pseudo);
		curstyle.strokecap = this.on_find_CurrentStyle_strokeCap(pseudo);
		curstyle.strokejoin = this.on_find_CurrentStyle_strokeJoin(pseudo);
		curstyle.strokepen = this.on_find_CurrentStyle_strokePen(pseudo);
		curstyle.fillbrush = this.on_find_CurrentStyle_fillBrush(pseudo);
		curstyle.fillgradation = this.on_find_CurrentStyle_fillGradation(pseudo);
		curstyle.fillhatch = this.on_find_CurrentStyle_fillHatch(pseudo);
		curstyle.extendoriginline = this.on_find_CurrentStyle_extendOriginLine(pseudo);
		curstyle.miterjoinlimit = this.on_find_CurrentStyle_miterJoinLimit(pseudo);

		curstyle.datatextalign = this.on_find_CurrentStyle_dataTextAlign(pseudo);
		curstyle.datatextbackground = this.on_find_CurrentStyle_dataTextBackground(pseudo);
		curstyle.datatextborder = this.on_find_CurrentStyle_dataTextBorder(pseudo);
		curstyle.datatextbordertype = this.on_find_CurrentStyle_dataTextBorderType(pseudo);
		curstyle.datatextcolor = this.on_find_CurrentStyle_dataTextColor(pseudo);
		curstyle.datatextfont = this.on_find_CurrentStyle_dataTextFont(pseudo);
		curstyle.datatextgradation = this.on_find_CurrentStyle_dataTextGradation(pseudo);
		curstyle.datatextguideline = this.on_find_CurrentStyle_dataTextGuideLine(pseudo);
		curstyle.datatextguiderotate = this.on_find_CurrentStyle_dataTextGuideRotate(pseudo);
		curstyle.datatextguidesize = this.on_find_CurrentStyle_dataTextGuideSize(pseudo);
		curstyle.datatextguidetype = this.on_find_CurrentStyle_dataTextGuideType(pseudo);
		curstyle.datatextlocation = this.on_find_CurrentStyle_dataTextLocation(pseudo);
		curstyle.datatextmargin = this.on_find_CurrentStyle_dataTextMargin(pseudo);
		curstyle.datatextpadding = this.on_find_CurrentStyle_dataTextPadding(pseudo);

		curstyle.pointfillbrush = this.on_find_CurrentStyle_pointFillBrush(pseudo);
		curstyle.pointfillgradation = this.on_find_CurrentStyle_pointFillGradation(pseudo);
		curstyle.pointfillhatch = this.on_find_CurrentStyle_pointFillHatch(pseudo);
		curstyle.pointmiterjoinlimit = this.on_find_CurrentStyle_pointMiterJoinLimit(pseudo);
		curstyle.pointshape = this.on_find_CurrentStyle_pointShape(pseudo);
		curstyle.pointsize = this.on_find_CurrentStyle_pointSize(pseudo);
		curstyle.pointstrokecap = this.on_find_CurrentStyle_pointStrokeCap(pseudo);
		curstyle.pointstrokejoin = this.on_find_CurrentStyle_pointStrokeJoin(pseudo);
		curstyle.pointstrokepen = this.on_find_CurrentStyle_pointStrokePen(pseudo);

		curstyle.selectcolor = this.on_find_CurrentStyle_selectColor(pseudo);
		curstyle.selectdatatextbackground = this.on_find_CurrentStyle_selectDataTextBackground(pseudo);
		curstyle.selectdatatextborder = this.on_find_CurrentStyle_selectDataTextBorder(pseudo);
		curstyle.selectdatatextbordertype = this.on_find_CurrentStyle_selectDataTextBorderType(pseudo);
		curstyle.selectdatatextcolor = this.on_find_CurrentStyle_selectDataTextColor(pseudo);
		curstyle.selectdatatextfont = this.on_find_CurrentStyle_selectDataTextFont(pseudo);
		curstyle.selectdatatextgradation = this.on_find_CurrentStyle_selectDataTextGradation(pseudo);
		curstyle.selectdatatextguideline = this.on_find_CurrentStyle_selectDataTextGuideLine(pseudo);
		curstyle.selectfillbrush = this.on_find_CurrentStyle_selectFillBrush(pseudo);
		curstyle.selectfillgradation = this.on_find_CurrentStyle_selectFillGradation(pseudo);
		curstyle.selectfillhatch = this.on_find_CurrentStyle_selectFillHatch(pseudo);
		curstyle.selectfont = this.on_find_CurrentStyle_selectFont(pseudo);
		curstyle.selectindent = this.on_find_CurrentStyle_selectIndent(pseudo);
		curstyle.selectpointfillbrush = this.on_find_CurrentStyle_selectPointFillBrush(pseudo);
		curstyle.selectpointfillgradation = this.on_find_CurrentStyle_selectPointFillGradation(pseudo);
		curstyle.selectpointfillhatch = this.on_find_CurrentStyle_selectPointFillHatch(pseudo);
		curstyle.selectpointsize = this.on_find_CurrentStyle_pointSize(pseudo);
		curstyle.selectstrokepen = this.on_find_CurrentStyle_selectStrokePen(pseudo);
		curstyle.selectpointsize = this.on_find_CurrentStyle_selectPointSize(pseudo);
	};

	_pChartSeries.on_update_style_datatextalign = function () {
		this.currentstyle.datatextalign = this.on_find_CurrentStyle_dataTextAlign(this._pseudo);
		this.ondraw(this._canvas);
	};

	_pChartSeries.on_update_style_datatextbackground = function () {
		this.currentstyle.datatextbackground = this.on_find_CurrentStyle_dataTextBackground(this._pseudo);
	};

	_pChartSeries.on_update_style_datatextborder = function () {
		this.currentstyle.datatextborder = this.on_find_CurrentStyle_dataTextBorder(this._pseudo);
	};

	_pChartSeries.on_update_style_datatextbordertype = function () {
		this.currentstyle.datatextbordertype = this.on_find_CurrentStyle_dataTextBorderType(this._pseudo);
	};
	_pChartSeries.on_update_style_datatextcolor = function () {
		this.currentstyle.datatextcolor = this.on_find_CurrentStyle_dataTextColor(this._pseudo);
		this.ondraw(this._canvas);
	};

	_pChartSeries.on_update_style_datatextfont = function () {
		this.currentstyle.datatextfont = this.on_find_CurrentStyle_dataTextFont(this._pseudo);
		this.ondraw(this._canvas);
	};

	_pChartSeries.on_update_style_datatextgradation = function () {
		this.currentstyle.datatextfont = this.on_find_CurrentStyle_dataTextFont(this._pseudo);
	};

	_pChartSeries.on_update_style_datatextguideline = function () {
		this.currentstyle.datatextguideline = this.on_find_CurrentStyle_dataTextGuideLine(this._pseudo);
		this.ondraw(this._canvas);
	};

	_pChartSeries.on_update_style_datatextguidesize = function () {
		this.currentstyle.datatextguidesize = this.on_find_CurrentStyle_dataTextGuideSize(this._pseudo);
		this.ondraw(this._canvas);
	};

	_pChartSeries.on_update_style_datatextguidetype = function () {
		this.currentstyle.datatextguidetype = this.on_find_CurrentStyle_dataTextGuideType(this._pseudo);
	};

	_pChartSeries.on_update_style_datatextlocation = function () {
		this.currentstyle.datatextLocation = this.on_find_CurrentStyle_dataTextLocation(this._pseudo);
	};

	_pChartSeries.on_update_style_datatextmargin = function () {
		this.currentstyle.datatextmargin = this.on_find_CurrentStyle_dataTextMargin(this._pseudo);
		this.ondraw(this._canvas);
	};

	_pChartSeries.on_update_style_datatextpadding = function () {
		this.currentstyle.datatextpadding = this.on_find_CurrentStyle_dataTextPadding(this._pseudo);
		this.ondraw(this._canvas);
	};

	_pChartSeries.on_update_style_extendorignline = function () {
		this.currentstyle.extendorignline = this.on_find_CurrentStyle_extendOriginLine(this._pseudo);
	};

	_pChartSeries.on_update_style_fillbrush = function () {
		this.currentstyle.fillbrush = this.on_find_CurrentStyle_fillBrush(this._pseudo);
		this.ondraw(this._canvas);
	};

	_pChartSeries.on_update_style_fillgradation = function () {
		this.currentstyle.fillgradation = this.on_find_CurrentStyle_fillGradation(this._pseudo);
	};
	_pChartSeries.on_update_style_fillhatch = function () {
		this.currentstyle.fillhatch = this.on_find_CurrentStyle_fillHatch(this._pseudo);
	};

	_pChartSeries.on_update_style_miterjoinlimit = function () {
		this.currentstyle.miterjoinlimit = this.on_find_CurrentStyle_miterJoinLimit(this._pseudo);
	};

	_pChartSeries.on_update_style_pointfillbrush = function () {
		this.currentstyle.pointfillbrush = this.on_find_CurrentStyle_pointFillBrush(this._pseudo);
		this.ondraw(this._canvas);
	};

	_pChartSeries.on_update_style_pointfillgradation = function () {
		this.currentstyle.pointfillgradation = this.on_find_CurrentStyle_pointFillGradation(this._pseudo);
	};

	_pChartSeries.on_update_style_pointfillhatch = function () {
		this.currentstyle.pointfillhatch = this.on_find_CurrentStyle_pointFillHatch(this._pseudo);
	};

	_pChartSeries.on_update_style_pointmiterjoinlimit = function () {
		this.currentstyle.pointmiterjoinlimit = this.on_find_CurrentStyle_pointMiterJoinLimit(this._pseudo);
	};

	_pChartSeries.on_update_style_pointshape = function () {
		this.currentstyle.pointshape = this.on_find_CurrentStyle_pointShape(this._pseudo);
		if (this.parent.legend) {
			this.parent.legend._recalcLayout();
			this.redraw();
			this.parent.legend.redraw();
		}
	};
	_pChartSeries.on_update_style_pointsize = function () {
		this.currentstyle.pointsize = this.on_find_CurrentStyle_pointSize(this._pseudo);
		this.ondraw(this._canvas);
	};
	_pChartSeries.on_update_style_pointstrokecap = function () {
		this.currentstyle.pointstrokecap = this.on_find_CurrentStyle_pointStrokeCap(this._pseudo);
	};
	_pChartSeries.on_update_style_pointstrokejoin = function () {
		this.currentstyle.pointstrokejoin = this.on_find_CurrentStyle_pointStrokeJoin(this._pseudo);
	};
	_pChartSeries.on_update_style_pointstrokepen = function () {
		this.currentstyle.pointstrokepen = this.on_find_CurrentStyle_pointStrokePen(this._pseudo);
		this.ondraw(this._canvas);
	};
	_pChartSeries.on_update_style_selectcolor = function () {
		this.currentstyle.selectcolor = this.on_find_CurrentStyle_selectColor(this._pseudo);
	};
	_pChartSeries.on_update_style_selectdatatextbackground = function () {
		this.currentstyle.selectdatatextbackground = this.on_find_CurrentStyle_selectDataTextBackground(this._pseudo);
	};
	_pChartSeries.on_update_style_selectdatatextborder = function () {
		this.currentstyle.selectdatatextborder = this.on_find_CurrentStyle_selectDataTextBorder(this._pseudo);
	};
	_pChartSeries.on_update_style_selectdatatextcolor = function () {
		this.currentstyle.selectdatatextcolor = this.on_find_CurrentStyle_selectDataTextColor(this._pseudo);
	};
	_pChartSeries.on_update_style_selectdatatextfont = function () {
		this.currentstyle.selectdatatextfont = this.on_find_CurrentStyle_selectDataTextFont(this._pseudo);
	};
	_pChartSeries.on_update_style_selectdatatextgradation = function () {
		this.currentstyle.selectdatatextgradation = this.on_find_CurrentStyle_selectDataTextGradation(this._pseudo);
	};
	_pChartSeries.on_update_style_selectdatatextguideline = function () {
		this.currentstyle.selectdatatextguideline = this.on_find_CurrentStyle_selectDataTextGuideLine(this._pseudo);
	};
	_pChartSeries.on_update_style_selectfillbrush = function () {
		this.currentstyle.selectfillbrush = this.on_find_CurrentStyle_selectFillBrush(this._pseudo);
	};
	_pChartSeries.on_update_style_selectfillgradation = function () {
		this.currentstyle.selectfillgradation = this.on_find_CurrentStyle_selectFillGradation(this._pseudo);
	};
	_pChartSeries.on_update_style_selectfillhatch = function () {
		this.currentstyle.selectfillhatch = this.on_find_CurrentStyle_selectFillHatch(this._pseudo);
	};
	_pChartSeries.on_update_style_selectfont = function () {
		this.currentstyle.selectfont = this.on_find_CurrentStyle_selectFont(this._pseudo);
	};
	_pChartSeries.on_update_style_set_selectindent = function () {
		this.currentstyle.selectindent = this.on_find_CurrentStyle_selectIndent(this._pseudo);
	};
	_pChartSeries.on_update_style_selectstrokepen = function () {
		this.currentstyle.selectstrokepen = this.on_find_CurrentStyle_selectStrokePen(this._pseudo);
	};
	_pChartSeries.on_update_style_selectpointsize = function () {
		this.currentstyle.selectpointsize = this.on_find_CurrentStyle_selectPointSize(this._pseudo);
	};
	_pChartSeries.on_update_style_selectpointfillbrush = function () {
		this.currentstyle.selectpointfillbrush = this.on_find_CurrentStyle_selectPointFillBrush(this._pseudo);
	};
	_pChartSeries.on_update_style_selectpointfillgradation = function () {
		this.currentstyle.selectpointfillgradation = this.on_find_CurrentStyle_selectPointFillGradation(this._pseudo);
	};
	_pChartSeries.on_update_style_selectpointfillhatch = function () {
		this.currentstyle.selectpointfillhatch = this.on_find_CurrentStyle_selectPointFillHatch(this._pseudo);
	};
	_pChartSeries.on_update_style_selectpointstrokepen = function () {
		this.currentstyle.selectpointstrokepen = this.on_find_CurrentStyle_selectPointStrokePen(this._pseudo);
	};
	_pChartSeries.on_update_style_startangle = function () {
		this.currentstyle.startangle = this.on_find_CurrentStyle_startAngle(this._pseudo);
	};
	_pChartSeries.on_update_style_startangle = function () {
		this.currentstyle.startangle = this.on_find_CurrentStyle_startAngle(this._pseudo);
	};
	_pChartSeries.on_update_style_strokecap = function () {
		this.currentstyle.strokecap = this.on_find_CurrentStyle_strokeCap(this._pseudo);
	};
	_pChartSeries.on_update_style_strokejoin = function () {
		this.currentstyle.strokejoin = this.on_find_CurrentStyle_strokeJoin(this._pseudo);
	};
	_pChartSeries.on_update_style_strokepen = function () {
		this.currentstyle.strokepen = this.on_find_CurrentStyle_strokePen(this._pseudo);
		this.ondraw(this._canvas);
	};

	_pChartSeries.on_find_CurrentStyle_background = function (pseudo) {
		return null;
	};
	_pChartSeries.on_find_CurrentStyle_border = function (pseudo) {
		return null;
	};
	_pChartSeries.on_find_CurrentStyle_shadow = function (pseudo) {
		return null;
	};

	_pChartSeries.on_find_CurrentStyle_startAngle = function (pseudo) {
		return this._find_pseudo_obj("startangle", pseudo);
	};
	_pChartSeries.on_find_CurrentStyle_strokeCap = function (pseudo) {
		return this._find_pseudo_obj("strokecap", pseudo);
	};
	_pChartSeries.on_find_CurrentStyle_strokeJoin = function (pseudo) {
		return this._find_pseudo_obj("strokejoin", pseudo);
	};
	_pChartSeries.on_find_CurrentStyle_strokePen = function (pseudo) {
		var pen = this._find_pseudo_obj("strokepen", pseudo);
		return pen ? pen : this._defaultStrokePen;
	};
	_pChartSeries.on_find_CurrentStyle_miterJoinLimit = function (pseudo) {
		return this._find_pseudo_obj("miterjoinlimit", pseudo);
	};
	_pChartSeries.on_find_CurrentStyle_fillBrush = function (pseudo) {
		return this._find_pseudo_obj("fillbrush", pseudo);
	};
	_pChartSeries.on_find_CurrentStyle_fillGradation = function (pseudo) {
		return this._find_pseudo_obj("fillgradation", pseudo);
	};
	_pChartSeries.on_find_CurrentStyle_fillHatch = function (pseudo) {
		return this._find_pseudo_obj("fillhatch", pseudo);
	};
	_pChartSeries.on_find_CurrentStyle_extendOriginLine = function (pseudo) {
		return this._find_pseudo_obj("extendorignline", pseudo);
	};
	_pChartSeries.on_find_CurrentStyle_dataTextAlign = function (pseudo) {
		var align = this._find_pseudo_obj("datatextalign", pseudo);
		return (align) ? align : this._default_align;
	};
	_pChartSeries.on_find_CurrentStyle_dataTextBackground = function (pseudo) {
		return this._find_pseudo_obj("datatextbackground", pseudo);
	};
	_pChartSeries.on_find_CurrentStyle_dataTextBorder = function (pseudo) {
		return this._find_pseudo_obj("datatextborder", pseudo);
	};
	_pChartSeries.on_find_CurrentStyle_dataTextBorderType = function (pseudo) {
		return this._find_pseudo_obj("datatextbordertype", pseudo);
	};
	_pChartSeries.on_find_CurrentStyle_dataTextColor = function (pseudo) {
		var color = this._find_pseudo_obj("datatextcolor", pseudo);
		return (color) ? color : this.currentstyle.color;
	};
	_pChartSeries.on_find_CurrentStyle_dataTextFont = function (pseudo) {
		var font = this._find_pseudo_obj("datatextfont", pseudo);
		return (font) ? font : this.currentstyle.font;
	};
	_pChartSeries.on_find_CurrentStyle_dataTextGradation = function (pseudo) {
		return this._find_pseudo_obj("datatextgradation", pseudo);
	};
	_pChartSeries.on_find_CurrentStyle_dataTextGuideLine = function (pseudo) {
		return this._find_pseudo_obj("datatextguideline", pseudo);
	};
	_pChartSeries.on_find_CurrentStyle_dataTextGuideRotate = function (pseudo) {
		return this._find_pseudo_obj("datatextguiderotate", pseudo);
	};
	_pChartSeries.on_find_CurrentStyle_dataTextGuideSize = function (pseudo) {
		return this._find_pseudo_obj("datatextguidesize", pseudo);
	};
	_pChartSeries.on_find_CurrentStyle_dataTextGuideType = function (pseudo) {
		var type = this._find_pseudo_obj("datatextguidetype", pseudo);
		return (type) ? type : this._defaultGuideType;
	};
	_pChartSeries.on_find_CurrentStyle_dataTextLocation = function (pseudo) {
		var location = this._find_pseudo_obj("datatextlocation", pseudo);
		return (location) ? location : this._defaultLocation;
	};
	_pChartSeries.on_find_CurrentStyle_dataTextMargin = function (pseudo) {
		var margin = this._find_pseudo_obj("datatextmargin", pseudo);
		return (margin) ? margin : this._default_margin;
	};
	_pChartSeries.on_find_CurrentStyle_dataTextPadding = function (pseudo) {
		var padding = this._find_pseudo_obj("datatextpadding", pseudo);
		return (padding) ? padding : this._default_padding;
	};

	_pChartSeries.on_find_CurrentStyle_pointFillBrush = function (pseudo) {
		return this._find_pseudo_obj("pointfillbrush", pseudo);
	};
	_pChartSeries.on_find_CurrentStyle_pointFillGradation = function (pseudo) {
		return this._find_pseudo_obj("pointfillgradation", pseudo);
	};
	_pChartSeries.on_find_CurrentStyle_pointFillHatch = function (pseudo) {
		return this._find_pseudo_obj("pointfillhatch", pseudo);
	};
	_pChartSeries.on_find_CurrentStyle_pointMiterJoinLimit = function (pseudo) {
		return this._find_pseudo_obj("pointmiterjoinlimit", pseudo);
	};
	_pChartSeries.on_find_CurrentStyle_pointShape = function (pseudo) {
		return this._find_pseudo_obj("pointshape", pseudo);
	};
	_pChartSeries.on_find_CurrentStyle_pointSize = function (pseudo) {
		return this._find_pseudo_obj("pointsize", pseudo);
	};
	_pChartSeries.on_find_CurrentStyle_pointStrokeCap = function (pseudo) {
		return this._find_pseudo_obj("pointstrokecap", pseudo);
	};
	_pChartSeries.on_find_CurrentStyle_pointStrokeJoin = function (pseudo) {
		return this._find_pseudo_obj("pointstrokejoin", pseudo);
	};
	_pChartSeries.on_find_CurrentStyle_pointStrokePen = function (pseudo) {
		return this._find_pseudo_obj("pointstrokepen", pseudo);
	};

	_pChartSeries.on_find_CurrentStyle_selectColor = function (pseudo) {
		var align = this._find_pseudo_obj("selectcolor", pseudo);
		return (align) ? align : this.currentstyle.color;
	};
	_pChartSeries.on_find_CurrentStyle_selectDataTextBackground = function (pseudo) {
		var background = this._find_pseudo_obj("selectdatatextbackground", pseudo);
		return (background) ? background : this.currentstyle.datatextbackground;
	};
	_pChartSeries.on_find_CurrentStyle_selectDataTextBorder = function (pseudo) {
		var border = this._find_pseudo_obj("selectdatatextborder", pseudo);
		return (border) ? border : this.currentstyle.datatextborder;
	};
	_pChartSeries.on_find_CurrentStyle_selectDataTextBorderType = function (pseudo) {
		var border = this._find_pseudo_obj("selectdatatextbordertype", pseudo);
		return (border) ? border : this.currentstyle.datatextbordertype;
	};
	_pChartSeries.on_find_CurrentStyle_selectDataTextColor = function (pseudo) {
		var color = this._find_pseudo_obj("selectdatatextcolor", pseudo);
		return (color) ? color : this.currentstyle.datatextcolor;
	};
	_pChartSeries.on_find_CurrentStyle_selectDataTextFont = function (pseudo) {
		var font = this._find_pseudo_obj("selectdatatextfont", pseudo);
		return (font) ? font : this.currentstyle.datatextfont;
	};
	_pChartSeries.on_find_CurrentStyle_selectDataTextGradation = function (pseudo) {
		var gradation = this._find_pseudo_obj("selectdatatextgradation", pseudo);
		return (gradation) ? gradation : this.currentstyle.datatextgradation;
	};
	_pChartSeries.on_find_CurrentStyle_selectDataTextGuideLine = function (pseudo) {
		var line = this._find_pseudo_obj("selectdatatextguideline", pseudo);
		return (line) ? line : this.currentstyle.datatextguideline;
	};
	_pChartSeries.on_find_CurrentStyle_selectFillBrush = function (pseudo) {
		var brush = this._find_pseudo_obj("selectfillbrush", pseudo);
		return (brush) ? brush : this.currentstyle.fillbrush;
	};
	_pChartSeries.on_find_CurrentStyle_selectFillGradation = function (pseudo) {
		var gradation = this._find_pseudo_obj("selectfillgradation", pseudo);
		return (gradation) ? gradation : this.currentstyle.fillgradation;
	};
	_pChartSeries.on_find_CurrentStyle_selectFillHatch = function (pseudo) {
		var hatch = this._find_pseudo_obj("selectfillhatch", pseudo);
		return (hatch) ? hatch : this.currentstyle.fillhatch;
	};
	_pChartSeries.on_find_CurrentStyle_selectFont = function (pseudo) {
		var font = this._find_pseudo_obj("selectfont", pseudo);
		return (font) ? font : this.currentstyle.font;
	};
	_pChartSeries.on_find_CurrentStyle_selectIndent = function (pseudo) {
		return this._find_pseudo_obj("selectindent", pseudo);
	};
	_pChartSeries.on_find_CurrentStyle_selectPointFillBrush = function (pseudo) {
		var brush = this._find_pseudo_obj("selectpointfillbrush", pseudo);
		return (brush) ? brush : this.currentstyle.pointfillbrush;
	};
	_pChartSeries.on_find_CurrentStyle_selectPointFillGradation = function (pseudo) {
		var gradation = this._find_pseudo_obj("selectpointfillgradation", pseudo);
		return (gradation) ? gradation : this.currentstyle.pointfillgradation;
	};
	_pChartSeries.on_find_CurrentStyle_selectPointFillHatch = function (pseudo) {
		var hatch = this._find_pseudo_obj("selectpointfillhatch", pseudo);
		return (hatch) ? hatch : this.currentstyle.pointfillhatch;
	};
	_pChartSeries.on_find_CurrentStyle_selectPointSize = function (pseudo) {
		var size = this._find_pseudo_obj("selectpointsize", pseudo);
		return (size) ? size : this.currentstyle.pointsize;
	};
	_pChartSeries.on_find_CurrentStyle_selectPointStrokePen = function (pseudo) {
		var pen = this._find_pseudo_obj("selectpointstrokepen", pseudo);
		return (pen) ? pen : this.currentstyle.pointstrokepen;
	};
	_pChartSeries.on_find_CurrentStyle_selectStrokePen = function (pseudo) {
		var pen = this._find_pseudo_obj("selectstrokepen", pseudo);
		return (pen) ? pen : this.currentstyle.strokepen;
	};
	_pChartSeries.on_find_CurrentStyle_selectPointSize = function (pseudo) {
		var pen = this._find_pseudo_obj("selectpointsize", pseudo);
		return (pen) ? pen : this.currentstyle.selectpointsize;
	};

	_pChartSeries._movePositionWithBound = function (rc) {
		var width = rc.right - rc.left;
		var height = rc.bottom - rc.top;
		if (this._adjust_left != rc.left || this._adjust_width != width || this._adjust_top != rc.top || this._adjust_height != height) {
			this._applysetPosition(rc.left, rc.top, width, height);
		}
		return true;
	};

	_pChartSeries._getBindNumber = function (dataset, binddata, rowidx) {
		var val;
		if (binddata._bindtype == 0) {
			val = binddata._value;
		}
		else if (dataset) {
			if (binddata._bindtype == 1) {
				val = dataset.getColumn(rowidx, binddata._bindexpr);
			}
			else {
				var exprfn = this._exprfn;
				if (!exprfn) {
					exprfn = this._exprfn = dataset._createExprFunc(binddata._bindexpr);
				}
				if ((typeof exprfn) == "function") {
					val = exprfn.call(this, rowidx, rowidx, this.parent, dataset);
				}
			}
		}
		val = parseFloat(val) | 0;
		if ((+val) != (+val)) {
			val = undefined;
		}
		return val;
	};

	_pChartSeries._getBindText = function (dataset, binddata, rowidx) {
		if (binddata._bindtype == 0) {
			return binddata._value;
		}
		else {
			if (dataset == null) {
				return undefined;
			}
			if (binddata._bindtype == 1) {
				return dataset.getColumn(rowidx, binddata._bindexpr);
			}
			else {
				var exprfn = this._exprtextfn;
				if (!exprfn) {
					exprfn = this._exprtextfn = dataset._createExprFunc(binddata._bindexpr);
				}
				if ((typeof exprfn) == "function") {
					return exprfn.call(this, rowidx, rowidx, this.parent, dataset);
				}
			}
		}
		return "";
	};

	_pChartSeries.ondraw = function (canvas) {
		if (!canvas || !this.parent.enableredraw || canvas.width <= 0 || canvas.height <= 0) {
			return;
		}

		canvas.clearRect();

		var parent = this.parent;
		var base_width = canvas.width;
		var base_height = canvas.height;

		var item_start = parent._item_start;
		var item_cnt = parent._item_cnt;
		var item_div = parent._item_div;
		if (item_cnt <= 0) {
			return;
		}

		var curstyle = this.currentstyle;

		var yaxis_type = this.yaxis;
		var yaxis = null;
		if (yaxis_type == "y2axis") {
			yaxis = parent.y2axis;
		}
		else {
			yaxis = parent.yaxis;
		}

		if (!yaxis) {
			return;
		}

		var min_val = yaxis._unit_min_val;
		var max_val = yaxis._unit_max_val;
		var tot_val = max_val - min_val;

		var dataset = parent._binddataset;
		if (dataset) {
			var data = this.data;
			var datatext = this.datatext;
			var org_val = yaxis._org_val;
			var org_y = Math.round(base_height - ((org_val - min_val) * base_height) / tot_val);

			var chk_mark = false;
			var markshape = nexacro.getStyleValueText2(curstyle.pointshape, "none", "");
			var marksize, markfillcolor, markborderpen;
			if (markshape != "") {
				marksize = nexacro.getStyleValueInt(curstyle.pointsize, 0);
				if (marksize > 0) {
					brush = curstyle.pointfillbrush;
					if (brush && brush._isValid()) {
						markfillcolor = brush.color;
					}
					else {
						markfillcolor = "";
					}
					pen = curstyle.pointstrokepen;
					if (pen && pen._isValid()) {
						markborderpen = pen;
					}
					else {
						markborderpen = null;
					}
					chk_mark = true;
				}
			}

			var chk_text = false, chk_guide = false;
			var text_color = curstyle.datatextcolor ? curstyle.datatextcolor._value : "";
			var text_font = curstyle.datatextfont;
			var guide_line, guide_offset_x = 0, guide_offset_y = 0, text_pos = "", text_offset = 0;
			if (text_color != "") {
				var text_align = curstyle.datatextalign;
				guide_line = curstyle.datatextguideline;
				var guide_size = nexacro.getStyleValueInt(curstyle.datatextguidesize, 0);
				var text_padding = curstyle.datatextpadding;
				var text_margin = curstyle.datatextmargin;
				switch (text_align && text_align.halign) {
					case "left":
						guide_offset_x = -guide_size;
						text_pos = "left";
						if (text_padding) {
							text_offset = text_padding.right;
						}
						break;
					case "right":
						guide_offset_x = guide_size;
						text_pos = "right";
						if (text_padding) {
							text_offset = text_padding.left;
						}
						break;
				}
				switch (text_align && text_align.valign) {
					case "top":
						guide_offset_y = -guide_size;
						if (text_pos == "") {
							text_pos = "top";
							if (text_padding) {
								text_offset = text_padding.bottom;
							}
						}
						else if (text_pos == "left") {
							text_pos = "lefttop";
						}
						else if (text_pos == "right") {
							text_pos = "righttop";
						}
						break;
					case "bottom":
						guide_offset_y = guide_size;
						if (text_pos == "") {
							text_pos = "bottom";
							if (text_padding) {
								text_offset = text_padding.top;
							}
						}
						else if (text_pos == "left") {
							text_pos = "leftbottom";
						}
						else if (text_pos == "right") {
							text_pos = "rightbottom";
						}
						break;
				}
				if (guide_line && guide_line._isValid() && guide_size > 0) {
					if (guide_offset_x != 0 || guide_offset_y != 0) {
						chk_guide = true;
					}
				}
				chk_text = true;
			}

			var pos_offset = 0;
			var _vals = [];
			var _x = [];
			var _y = [];
			if (this.type == "bar") {
				var bar_width = this._bar_item_width;
				var bar_offset = bar_width / 2;
				pos_offset = this._bar_item_offset + bar_offset;
				var offset = 0;
				var chk_fill = false, chk_stroke = false;
				var fillcolor, linecolor, linewidth;
				var brush = curstyle.fillbrush;
				if (brush) {
					fillcolor = brush.color;
					canvas.setElementFillStyle(fillcolor);
					chk_fill = true;
				}
				var pen = curstyle.strokepen;
				if (pen) {
					linecolor = pen.color;

					linewidth = parseFloat(pen.width) | 0;
					if ((+linewidth) != (+linewidth)) {
						linewidth = 1;
					}
					canvas.setElementStrokeStyle(linecolor);
					canvas.setElementLineWidth(linewidth);
					chk_stroke = true;
					offset = linewidth / 2;
				}

				var pos = pos_offset;

				for (var i = 0; i < item_cnt; i++) {
					var val = this._getBindNumber(dataset, data, i + item_start);
					if (val != undefined) {
						_vals[i] = val;
						_x[i] = Math.round(pos);

						_y[i] = Math.round(base_height - ((val - min_val) * base_height) / tot_val);
					}

					pos += item_div;
				}

				if (chk_fill) {
					for (var i = 0; i < item_cnt; i++) {
						if (_vals[i] != undefined) {
							canvas.rect(_x[i] - bar_offset, org_y, bar_width, _y[i] - org_y);
						}
						canvas.drawFill();
					}
				}
				if (chk_stroke) {
					for (var i = 0; i < item_cnt; i++) {
						if (_vals[i] != undefined) {
							canvas.halfRect(_x[i] - bar_offset, org_y, bar_width, _y[i] - org_y);
						}
					}
					canvas.drawStroke();
				}
			}
			else {
				pos_offset = item_div / 2;

				var offset = 0;
				var chk_stroke = false;
				var linecolor, linewidth;
				var pen = curstyle.strokepen;
				if (pen) {
					linecolor = pen.color;

					linewidth = parseFloat(pen.width) | 0;
					if ((+linewidth) != (+linewidth)) {
						linewidth = 1;
					}
					canvas.setElementStrokeStyle(linecolor);
					canvas.setElementLineWidth(linewidth);
					chk_stroke = true;
				}
				offset = linewidth / 2;

				if (chk_stroke) {
					var rowcount = dataset.rowcount;
					var pos = pos_offset;
					var moved = false;
					if (item_start > 0) {
						var val = this._getBindNumber(dataset, data, item_start - 1);
						if (val != undefined) {
							var y = Math.round(base_height - ((val - min_val) * base_height) / tot_val);
							var x = Math.round(pos - item_div);

							canvas.moveTo(x, y + offset);
							moved = true;
						}
					}
					for (var i = 0; i <= item_cnt; i++) {
						var val = this._getBindNumber(dataset, data, i + item_start);
						if (val != undefined) {
							var x = Math.round(pos);
							var y = Math.round(base_height - ((val - min_val) * base_height) / tot_val);
							_vals[i] = val;
							_x[i] = x;
							_y[i] = y;
							if (moved) {
								canvas.lineTo(x, y + offset);
							}
							else {
								canvas.moveTo(x, y + offset);
								moved = true;
							}
							pos += item_div;
						}
						else {
							pos += item_div;
							moved = false;
						}
					}
					canvas.drawStroke();
				}
			}

			if (chk_mark) {
				var gap = marksize / 2;
				if (chk_mark) {
					for (var i = 0; i < item_cnt; i++) {
						var val = _vals[i];
						if (val != undefined) {
							parent._drawMark(canvas, _x[i] - gap, _y[i] - gap, markshape, marksize, markfillcolor, markborderpen);
						}
					}
				}
			}

			if (chk_text) {
				canvas._setLineStyle(guide_line);
				canvas.setElementFont(text_font);
				canvas.setElementFillStyle(text_color);
				if (chk_guide) {
					for (var i = 0; i < item_cnt; i++) {
						var val = _vals[i];
						if (val != undefined) {
							var x = _x[i];
							var y = _y[i];
							canvas.moveTo(x, y);
							x += guide_offset_x;
							y += guide_offset_y;
							canvas.lineTo(x, y);
						}
					}
					canvas.drawStroke();
				}
				switch (text_pos) {
					case "left":
						for (var i = 0; i < item_cnt; i++) {
							var val = _vals[i];
							if (val != undefined) {
								var text = this._getBindText(dataset, datatext, i + item_start);
								if (text != "") {
									var x = _x[i] + guide_offset_x;
									var y = _y[i] + guide_offset_y;
									var textsize = nexacro._getTextSize2(text, text_font);
									x -= text_offset + textsize[0];
									canvas.drawFillText(text, x, y, 0);
								}
							}
						}
						break;
					case "lefttop":
						for (var i = 0; i < item_cnt; i++) {
							var val = _vals[i];
							if (val != undefined) {
								var text = this._getBindText(dataset, datatext, i + item_start);
								if (text != "") {
									var x = _x[i] + guide_offset_x;
									var y = _y[i] + guide_offset_y;
									var textsize = nexacro._getTextSize2(text, text_font);
									x -= text_offset + textsize[0];
									y -= Math.ceil(textsize[1] / 2);
									canvas.drawFillText(text, x, y, 0);
								}
							}
						}
						break;
					case "leftbottom":
						for (var i = 0; i < item_cnt; i++) {
							var val = _vals[i];
							if (val != undefined) {
								var text = this._getBindText(dataset, datatext, i + item_start);
								if (text != "") {
									var x = _x[i] + guide_offset_x;
									var y = _y[i] + guide_offset_y;
									var textsize = nexacro._getTextSize2(text, text_font);
									x -= text_offset + textsize[0];
									y += Math.ceil(textsize[1] / 2);
									canvas.drawFillText(text, x, y, 0);
								}
							}
						}
						break;
					case "right":
						for (var i = 0; i < item_cnt; i++) {
							var val = _vals[i];
							if (val != undefined) {
								var text = this._getBindText(dataset, datatext, i + item_start);
								if (text != "") {
									var x = _x[i] + guide_offset_x;
									var y = _y[i] + guide_offset_y;
									x += text_offset;
									canvas.drawFillText(text, x, y, 0);
								}
							}
						}
						x += text_offset;
						break;
					case "righttop":
						for (var i = 0; i < item_cnt; i++) {
							var val = _vals[i];
							if (val != undefined) {
								var text = this._getBindText(dataset, datatext, i + item_start);
								if (text != "") {
									var x = _x[i] + guide_offset_x;
									var y = _y[i] + guide_offset_y;
									var textsize = nexacro._getTextSize2(text, text_font);
									x += text_offset;
									y -= Math.ceil(textsize[1] / 2);
									canvas.drawFillText(text, x, y, 0);
								}
							}
						}
						break;
					case "rightbottom":
						for (var i = 0; i < item_cnt; i++) {
							var val = _vals[i];
							if (val != undefined) {
								var text = this._getBindText(dataset, datatext, i + item_start);
								if (text != "") {
									var x = _x[i] + guide_offset_x;
									var y = _y[i] + guide_offset_y;
									var textsize = nexacro._getTextSize2(text, text_font);
									x += text_offset;
									y += Math.ceil(textsize[1] / 2);
									canvas.drawFillText(text, x, y, 0);
								}
							}
						}
						break;
					case "top":
						for (var i = 0; i < item_cnt; i++) {
							var val = _vals[i];
							if (val != undefined) {
								var text = this._getBindText(dataset, datatext, i + item_start);
								if (text != "") {
									var x = _x[i] + guide_offset_x;
									var y = _y[i] + guide_offset_y;
									var textsize = nexacro._getTextSize2(text, text_font);
									x -= Math.round(textsize[0] / 2);
									y -= text_offset + Math.ceil(textsize[1] / 2);
									canvas.drawFillText(text, x, y, 0);
								}
							}
						}
						break;
					case "bottom":
						for (var i = 0; i < item_cnt; i++) {
							var val = _vals[i];
							if (val != undefined) {
								var text = this._getBindText(dataset, datatext, i + item_start);
								if (text != "") {
									var x = _x[i] + guide_offset_x;
									var y = _y[i] + guide_offset_y;
									var textsize = nexacro._getTextSize2(text, text_font);
									x -= Math.round(textsize[0] / 2);
									y += text_offset + Math.ceil(textsize[1] / 2);
									canvas.drawFillText(text, x, y, 0);
								}
							}
						}
						break;
					default:
						for (var i = 0; i < item_cnt; i++) {
							var val = _vals[i];
							if (val != undefined) {
								var text = this._getBindText(dataset, datatext, i + item_start);
								if (text != "") {
									var x = _x[i] + guide_offset_x;
									var y = _y[i] + guide_offset_y;
									var textsize = nexacro._getTextSize2(text, text_font);
									x -= Math.round(textsize[0] / 2);
									canvas.drawFillText(text, x, y, 0);
								}
							}
						}
						break;
				}
			}
		}
		canvas.endDraw();
	};

	_pChartSeries._loadFromDOM = function (elem) {
		if (elem && elem.attributes) {
			var nodeName = "";
			var nodeValue = "";
			var length = elem.attributes.length;

			for (var i = 0; i < length; i++) {
				nodeName = elem.attributes[i].nodeName;
				nodeValue = elem.attributes[i].nodeValue;

				if (nodeName == "id") {
					this.id = nodeValue;
					this._type_name += nodeValue;
				}
				else {
					this["set_" + nodeName] && this["set_" + nodeName](nodeValue);
				}
			}
		}
	};


	_pChartSeries.set_data = function (v) {
		if (v != this.data._value) {
			this.data._set(v);
		}
		return v;
	};

	_pChartSeries.set_datatext = function (v) {
		if (v != this.datatext._value) {
			this.datatext._set(v);
			if (this._control_element) {
				this.parent.on_updateDataAreaLayout();
			}
		}
		return v;
	};

	_pChartSeries.set_label = function (v) {
		if (v != this.label) {
			this.label = v;
			if (this._control_element) {
				this.parent._recalcLayout();
				this.parent.legend.redraw();
			}
		}
		return v;
	};

	_pChartSeries.set_type = function (v) {
		if (v != this.type) {
			this.type = v;
		}
		return v;
	};

	_pChartSeries.set_xaxis = function (v) {
		if (v != this.xaxis) {
			this.type = v;
		}
		return v;
	};

	_pChartSeries.set_yaxis = function (v) {
		if (v != this.yaxis) {
			this.yaxis = v;
		}
		return v;
	};

	_pChartSeries = null;
}


