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

if (!nexacro.FlashPlayer) {
	nexacro.FlashPlayer = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

		this._params = new nexacro.Collection();
	};

	var _pFlash = nexacro.FlashPlayer.prototype = nexacro._createPrototype(nexacro.Component, nexacro.FlashPlayer);

	_pFlash._type_name = "FlashPlayer";

	_pFlash.codebase = "";
	_pFlash.mimetype = "";
	_pFlash.movie = "";

	_pFlash.adjustalpha = "";
	_pFlash.alignmode = "";
	_pFlash.framenum = "";
	_pFlash.loop = "";
	_pFlash.playing = "";
	_pFlash.quality = "";
	_pFlash.readstate = "";
	_pFlash.scalemode = "";

	_pFlash._obj_id = "";
	_pFlash._obj_elem = null;
	_pFlash._params = null;

	_pFlash.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var obj_elem = this._obj_elem = new nexacro.PluginElement(control_elem);
			obj_elem.setElementSize(this._client_width, this._client_height);
		}
	};

	_pFlash.on_created_contents = function () {
		var obj_elem = this._obj_elem;
		if (obj_elem) {
			obj_elem.component = this;
			this.on_apply_codebase();

			var params = this._params;
			var param_cnt = params.length;
			for (var i = 0; i < param_cnt; i++) {
				obj_elem.setElementParam(params.get_id(i), params.get_item(i));
			}

			obj_elem.setElementPluginSrc(this.movie);
			if (this.codebase == "") {
				this.codebase = "http://fpdownload.adobe.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0";
				obj_elem.setElementCodebase(this.codebase);
			}
			if (this.mimetype == "") {
				this.mimetype = "application/x-shockwave-flash";
				obj_elem.setElementMIMEType(this.mimetype);
				obj_elem.setElementPluginMIMEType(this.mimetype);
			}
			obj_elem.setElementPluginPage("http://www.adobe.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash");
			obj_elem.setElementParam("WMode", "Transparent");
			obj_elem.setElementClassId("{d27cdb6e-ae6d-11cf-96b8-444553540000}");
			obj_elem.create();
			obj_elem.setElementVisible(this.visible);
			this.on_apply_movie();
		}
	};

	_pFlash.on_destroy_contents = function () {
		var obj_elem = this._obj_elem;
		if (obj_elem) {
			obj_elem.destroy();
			this._obj_elem = null;
		}
	};


	_pFlash.on_update_position = function (resize_flag, move_flag) {
		nexacro.Component.prototype.on_update_position.call(this, resize_flag, move_flag);

		var obj_elem = this._obj_elem;
		if (obj_elem) {
			obj_elem.on_update_position();
		}
	};

	_pFlash.on_change_containerRect = function (width, height) {
		var obj_elem = this._obj_elem;
		if (obj_elem) {
			obj_elem.setElementSize(width, height);
		}
	};


	_pFlash.set_visible = function (v) {
		if (v === undefined || v === null) {
			return;
		}
		v = nexacro._toBoolean(v);

		nexacro.Component.prototype.set_visible.call(this, v);

		var obj_elem = this._obj_elem;
		if (obj_elem) {
			obj_elem.setElementVisible(v);
		}
	};
	_pFlash.set_mimetype = function (v) {
		this.mimetype = v;
		this.on_apply_mimetype();
	};
	_pFlash.on_apply_mimetype = function () {
		var elem = this._obj_elem;
		if (elem) {
			var _type = this.mimetype;
			if (_type) {
				elem.setElementMIMEType(_type);
			}
		}
	};

	_pFlash.set_codebase = function (v) {
		this.codebase = v;
		this.on_apply_codebase();
	};
	_pFlash.on_apply_codebase = function () {
		var elem = this._obj_elem;
		if (elem) {
			var codebase = this.codebase;
			if (codebase) {
				elem.setElementCodebase(codebase);
			}
		}
	};

	_pFlash.set_movie = function (v) {
		var url = v;
		if (url.substring(0, 4).toLowerCase() == "url(") {
			url = url.substring(5, url.length - 2);
		}
		var url = application._getServiceLocation(url, this._getRefFormBaseUrl());

		this.movie = url;
		this.on_apply_movie();
	};
	_pFlash.on_apply_movie = function () {
		var elem = this._obj_elem;
		if (elem) {
			var movie = this.movie;
			if (movie) {
				elem.setElementParam("Movie", movie);
			}
		}
	};

	_pFlash.set_scalemode = function (v) {
		this.scalemode = v;
		this.on_apply_scalemode();
	};

	_pFlash.on_apply_scalemode = function () {
		var elem = this._obj_elem;
		if (elem) {
			var scalemode = this.scalemode;
			if (scalemode) {
				elem.setElementParam("scale", scalemode);
			}
		}
	};


	_pFlash.set_loop = function (v) {
		this.loop = v;
		this.on_apply_loop();
	};
	_pFlash.on_apply_loop = function () {
		var elem = this._obj_elem;
		if (elem) {
			var loop = this.loop;
			if (loop) {
				elem.setElementParam("loop", loop);
			}
		}
	};


	_pFlash.set_playing = function (v) {
		this.playing = v;
		this.on_apply_playing();
	};
	_pFlash.on_apply_playing = function () {
		var elem = this._obj_elem;
		if (elem) {
			var playing = this.playing;
			if (playing) {
				elem.setElementParam("play", playing);
			}
		}
	};

	_pFlash.set_quality = function (v) {
		this.quality = v;
		this.on_apply_quality();
	};
	_pFlash.on_apply_quality = function () {
		var elem = this._obj_elem;
		if (elem) {
			var quality = this.quality;
			if (quality) {
				elem.setElementParam("quality", quality);
			}
		}
	};




	delete _pFlash;
}


