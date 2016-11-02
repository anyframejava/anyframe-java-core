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


if (!nexacro.DomParser) {
	nexacro.DomParseException = function (obj, id, level, line, column, message, description) {
		this.id = this.eventid = id || "onParseError";
		this.fromobject = this.fromreferenceobject = obj;

		this.level = level;
		this.line = line;
		this.column = column;
		this.message = message;
		this.description = description;
	};
	var _pDomParseException = nexacro._createPrototype(nexacro.Event, nexacro.DomParseException);
	nexacro.DomParseException.prototype = _pDomParseException;

	_pDomParseException._type_name = "DomParseException";

	delete _pDomParseException;


	nexacro.DomParser = function (id, parent) {
		this.id = this.name = id;
		this.parent = parent;

		this._event_list = {
			"onParseError" : 1
		};
	};

	var _pDomParser = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.DomParser);
	nexacro.DomParser.prototype = _pDomParser;

	_pDomParser._type_name = "DomParser";

	_pDomParser.on_created = nexacro._emptyFn;
	_pDomParser.parseFromString = function (strText, strMineType) {
		if (!strMineType || strMineType == "text/xml") {
			var xmlDoc = nexacro._parseXMLDocument(strText);
			if (xmlDoc) {
				var error = nexacro._getParserError(xmlDoc);
				if (error) {
					this.on_fire_onparseerror("error", error.line, error.column, error.message, error.desc);
					return null;
				}
			}

			return xmlDoc;
		}

		return null;
	};

	_pDomParser.on_fire_onparseerror = function (level, line, column, message, description) {
		if (this.onParseError && this.onParseError._has_handlers) {
			var evt = new nexacro.DomParseException(this, "onParseError", level, line, column, message, description);
			return this.onParseError._fireEvent(this, evt);
		}
		return false;
	};

	delete _pDomParser;
}
;




