/**
 * @fileoverview nexacro Component의 Position과 Size와 관련된 함수.
 */
 
if ( !JsNamespace.exist("Eco.XComp.PositionSize") )
{
	/**
	 * @namespace
	 * @name Eco.XComp.PositionSize
	 * @memberof! <global>
	 */
	JsNamespace.declare("Eco.XComp.PositionSize", {
		 /**
		 * TopLevel Form 상에 현재 보이는 위치 기준으로 component 좌표 및 size를 반환.
		 * @param {XComp} XComp nexacro Component
		 * @return {array.<number>} [ leftPosition, topPosition, wdith, height ]
		 * @example
		 * trace(Eco.XComp.PositionSize.getTopLevelFormBox(Div00.Button00)); //output: [829,135,63,43]
		 * trace(Eco.XComp.PositionSize.getTopLevelFormBox(Div01.Div02.Button01)); //output: [841,346,63,43]
		 * trace(Eco.XComp.PositionSize.getTopLevelFormBox(Tab00.tabpage1.Button02)); //output: [813,521,63,43]	
		 *
		 * @memberOf Eco.XComp.PositionSize
		 */
		getTopLevelFormBox: function(XComp)	
		{
			var topForm = Eco.XComp.getTopLevelForm(XComp);
			var xy = Eco.XComp.PositionSize.convertXY(topForm, [0, 0], XComp);
			
			return [xy[0], xy[1], XComp.getOffsetWidth(), XComp.getOffsetHeight()];
		},


		 /**
		 * XCompB기준의 XY좌표를 XCompA기준의 XY좌표로 변환.
		 * @param {XComp} XCompA nexacro Component
		 * @param {array.<number>} xy XCompB기준의 XY좌표.
		 * @param {XComp} XCompB nexacro Component
		 * @return {array.<number>} XCompA기준의 좌표. [ x좌표, y좌표]
		 * @example
		 * 
		 * Form에 아래와 같이 Button00이 존재 할 경우
		 *
		 * |---------------------------------------------------------|  ^
		 * |  Form                                                   |  |
		 * |                                                         |  |
		 * |                                                         | 300
		 * |                                                         |  |
		 * |                                     //(0,0)             |  v
		 * |                                       *-----------      | 
		 * |                                       | Button00 |      | 
		 * |                                       ------------      | 
		 * |                                                         | 
		 * |---------------------------------------------------------| 
		 * <--------------- 900 ------------------>	
		 *		 
		 * trace(Eco.XComp.PositionSize.convertXY(this,[0,0], Button00)); //output: [900,300]
		 * //Button00을 기준으로 한 0,0 좌표는
		 * //form 기준으로 했을 때 900, 300이 된다.
		 * @memberOf Eco.XComp.PositionSize
		 */
		convertXY: function(XCompA, xy, XCompB)
		{
			var tempX, tempY;
			var x, y;
			if ( XCompB )
			{
				tempX = system.clientToScreenX(XCompB, xy[0]);
				tempY = system.clientToScreenY(XCompB, xy[1]);
				
				var pThis = Eco.XComp.PositionSize;
				
				x = system.screenToClientX(XCompA, tempX) + pThis.getScrollLeft(XCompA);
				y = system.screenToClientY(XCompA, tempY) + pThis.getScrollTop(XCompA);				
			}
			else
			{
				x = xy[0];
				y = xy[1];
			}
			
			return [x, y];
		},


		 /**
		 * 수직스크롤바의 trackbar위치를 반환한다.
		 * @param {XComp} XComp nexacro Component
		 * @return {number} 수직스크롤바의 trackbar위치(수직스크롤바가 없을때는 0).
		 * @example
		 * trace(Eco.XComp.PositionSize.getScrollTop(Div01)); //output: 20
		 * trace(Eco.XComp.PositionSize.getScrollTop(Div01)); //output: 0
		 *
		 * @memberOf Eco.XComp.PositionSize
		 */
		getScrollTop: function(XComp)
		{
			return (XComp.vscrollbar && XComp.vscrollbar.visible ? XComp.vscrollbar.pos : 0);
		},

		 /**
		 * 수평스크롤바의 trackbar위치를 반환한다.
		 * @param {XComp} XComp nexacro Component
		 * @return {number} 수평스크롤바의 trackbar위치(수평스크롤바가 없을때는 0).
		 * @example
		 * trace(Eco.XComp.PositionSize.getScrollLeft(Div01)); //output: 10
		 * trace(Eco.XComp.PositionSize.getScrollLeft(Div01)); //output: 0
		 *
		 * @memberOf Eco.XComp.PositionSize
		 */
		getScrollLeft: function(XComp)
		{
			return (XComp.hscrollbar && XComp.hscrollbar.visible ? XComp.hscrollbar.pos : 0);
		},
		
		 /**
		 * 스크롤바 height(수평스크롤바) 또는 width(수직스크롤바)의 size를 반환한다.
		 * @param {XComp} XComp nexacro Component
		 * @param {string} type 스크롤바 종류(수평스크롤바:"horz", 수직스크롤바:"vert")
		 * @return {number} 스크롤바 height(수평스크롤바) 또는 width(수직스크롤바)의 size를 반환한다.<br>
		 *                  스크롤바를 지원하지 않는 컴포넌트 일때는 0.
		 * @example
		 * trace(Eco.XComp.PositionSize.getScrollBarSize(Div03, "vert")); //output:  11
		 *
		 * @memberOf Eco.XComp.PositionSize
		 */
		getScrollBarSize: function(XComp, type)
		{
			var scrollBar = (type == "horz") ? XComp.hscrollbar : XComp.vscrollbar;
			var size = 0;
			if(scrollBar)
			{
				//theme에 scrollbarsize가 지정되지 않은경우 null을 반환함.
				size = scrollBar.currentstyle.scrollbarsize; 
				
				return (size===null ? (type == "horz" ? scrollBar.getOffsetHeight() : scrollBar.getOffsetWidth()): size);
			}
			else 
			{
				return size;
			}
		},		
		
		 /**
		 * 스크롤바가 표시됐을 때에만 size를 반환한다.
		 * @param {XComp} XComp nexacro Component
		 * @param {string} type 스크롤바 종류(수평스크롤바:"horz", 수직스크롤바:"vert")
		 * @return {number} 스크롤바 size(스크롤바가 없거나 표시되지 않을 때는 0).
		 * @example
		 * trace(Eco.XComp.PositionSize.getCurrentScrollBarSize(Div03, "vert")); //output: 0
		 *
		 * @memberOf Eco.XComp.PositionSize
		 */
		getCurrentScrollBarSize: function(XComp, type)
		{
			var scrollBar = (type == "horz") ? XComp.hscrollbar : XComp.vscrollbar;
			
			return (scrollBar && scrollBar.visible ? (type == "horz" ? scrollBar.getOffsetHeight() : scrollBar.getOffsetWidth()) : 0);
		},
		
		/**
		 * XComp의 boder, scrollbar width 크기를 제외한 client 영역 width 를 반환한다.
		 * @param {XComp} XComp nexacro Component
		 * @param {number=} wholeWidth 컴포넌트의 전체폭(boder,scrollbar width 포함)
		 * @return {number} client 영역 width
		 * @example
		 *
		 * ex) Div01
		 * |----------------------------------------------------|
		 * |                    border                          |
		 * |    |-------------------------------------------|   |
		 * |    |               margin                      |   |
		 * |    |     |---------------------------------|   |   |
		 * |  b |  m  |<-------- client width --------->|   |   |
		 * |  o |  a  |                                 |   |   |
		 * |  r |  r  |                                 |   |   |
		 * |  d |  g  |                                 |   |   |
		 * |  e |  i  |                                 |   |   |
		 * |  r |  n  |                                 |   |   |
		 * |    |     |---------------------------------|   |   |
		 * |    |                                           |   |
		 * |    |-------------------------------------------|   |
		 * |                                                    |
		 * |----------------------------------------------------|
		 * <-10-><-10->
		 * <------------------------ 100 ----------------------->
		 *
		 * var clientwidth = Eco.XComp.PositionSize.getClientWidth(Div01);
		 * trace(clientwidth);	// output : 60
		 * @memberOf Eco.XComp.PositionSize
		 */
		getClientWidth: function(XComp, wholeWidth)
		{
			var clientwidth = 0,
				borderWidths = 0,
				marginWidths = 0,
				scrollbarSize = 0;
			if ( wholeWidth )
			{
				clientwidth = wholeWidth;
			}
			else
			{
				clientwidth =  XComp.getOffsetWidth();
			}
			borderWidths = Eco.XComp.Style.getBorderWidth(XComp);
			marginWidths = Eco.XComp.Style.getMargin(XComp);
			clientwidth -= borderWidths[0] + borderWidths[2];
			clientwidth -= marginWidths[0] + marginWidths[2];
			scrollbarSize = Eco.XComp.PositionSize.getCurrentScrollBarSize(XComp, "horz");
			clientwidth -= scrollbarSize;
			
			return clientwidth;
		},
		
		/**
		 * XComp의 boder,scrollbar height 크기를 제외한 client 영역 height 를 반환한다.
		 * @param {XComp} XComp nexacro Component
		 * @param {number=} wholeHeight 컴포넌트의 전체높이(boder,scrollbar height 포함)
		 * @return {number} client 영역 height
		 * @example
		 *
		 * ex) Div01
		 * |------------------------------------------------|   ^ 	
		 * |                    border                      |   |  border: 10
		 * |   |----------------------------------------|   |   |
		 * |   |                margin                  |   |   |  margin: 10
		 * |   |   |--------------------------------|   |   |   |
		 * | b | m |                              ^ |   |   |   |
		 * | o | a |                              | |   |   |   |
		 * | r | r |                client height | |   |   |  100
		 * | d | g |                              | |   |   |   |
		 * | e | i |                              | |   |   |   |
		 * | r | n |                              v |   |   |   |
		 * |   |   |--------------------------------|   |   |   |
		 * |   |                                        |   |   |
		 * |   |----------------------------------------|   |   |
		 * |                                                |   |
		 * |------------------------------------------------|   v
		 *
		 * var clientheight = Eco.XComp.PositionSize.getClientHeight(Div01);
		 * trace(clientheight);	// output : 60
		 * @memberOf Eco.XComp.PositionSize
		 */
		getClientHeight: function(XComp, wholeHeight)
		{
			var clientheight = 0,
				borderWidths = 0,
				marginWidths = 0,
				scrollbarSize = 0;
			
			if ( wholeHeight )
			{
				clientheight =  wholeHeight;
			}
			else
			{
				clientheight =  XComp.getOffsetHeight();
			}
			
			borderWidths = Eco.XComp.Style.getBorderWidth(XComp);
			marginWidths = Eco.XComp.Style.getMargin(XComp);
			clientheight -= borderWidths[1] + borderWidths[3];
			clientheight -= marginWidths[1] + marginWidths[3];
			scrollbarSize = Eco.XComp.PositionSize.getCurrentScrollBarSize(XComp);
			clientheight -= scrollbarSize;
			
			return clientheight;
		},
		
		/**
		 * XComp의 boder,margin,scrollbar width 크기를 제외한 client 영역 width 를 반환한다.
		 * scroll이 생기는 경우에는 scroll 가능한 전체 영역을 포함한 width 를 반환한다.
		 * @param {XComp} XComp nexacro Component
		 * @return {number} client 영역 width
		 * @example
		 *
		 * ex) Div00 (width:100)
		 * |----------------------------------------------------|
		 * |                            |                       |
		 * |                            |                       |
		 * |                            |                       |
		 * |                            |                       |
		 * |----------------------------|                       |
		 * |<---------- 100 ------------>                       |
		 * |                                                    |
		 * |                                                    |
		 * |                         <---- scroll 가능 영역 ---->|
		 * |                                                    |
		 * |----------------------------------------------------|
		 * 
		 * <------------------------ 200 ----------------------->
		 *
		 * var scrollwidth = Eco.XComp.PositionSize.getScrollWidth(Div00);
		 * trace(scrollwidth);	// output : 200
		 * @memberOf Eco.XComp.PositionSize
		 */
		getScrollWidth: function(XComp)
		{
			var scrollwidth = 0;
			
			scrollwidth = (XComp.hscrollbar && XComp.hscrollbar.visible ? XComp.hscrollbar.max : 0);
			scrollwidth += Eco.XComp.PositionSize.getClientWidth(XComp);
			
			return scrollwidth;
		},
 
		/**
		 * XComp의 boder,scrollbar height 크기를 제외한 client 영역 height 를 반환한다.
		 * scroll이 생기는 경우에는 scroll 가능한 전체 영역을 포함한 height 를 반환한다.
		 * @param {XComp} XComp nexacro Component
		 * @return {number} client 영역 height
		 * @example
		 *
		 * ex) Div00 (height:100)
		 * |----------------------------------------------------| ^
		 * |                            | ^                     | |
		 * |                            | |                     | |
		 * |                            |100                    | |
		 * |                            | |                     | |
		 * |----------------------------| v                     |200
		 * |                                            ^       | |
		 * |                                            |       | |
		 * |                                    scroll 가능 영역 | |
		 * |                                            |       | |
		 * |                                            v       | |
		 * |----------------------------------------------------| v
		 *
		 * var scrollheight = Eco.XComp.PositionSize.getScrollHeight(Div00);
		 * trace(scrollheight);	// output : 200
		 * @memberOf Eco.XComp.PositionSize
		 */
		getScrollHeight: function(XComp)
		{
			var scrollheight = 0;
			
			scrollheight = (XComp.vscrollbar && XComp.vscrollbar.visible ? XComp.vscrollbar.max : 0);
			scrollheight += Eco.XComp.PositionSize.getClientHeight(XComp);
			
			return scrollheight;
		},
		
		/**
		 * font cache
		 * @private
		 * @memberOf Eco.XComp.PositionSize
		 */		
		_fontCache: {},
		
		 /**
		 * 컴포넌트에 지정된 text 의 너비,높이를 반환.<br><br>
		 * 2번째 인자에 문자열 값을 지정하면 컴포넌트의 text 속성에 지정된 문자열을 대체하여<br>
		 * 계산된 결과를 반환한다. (text 속성값이 변경되지는 않는다.)
		 * @param {XComp|Font} XComp nexacro Component 또는 Font 개체
		 * @param {string=} text text 속성을 대체할 text (default : text 속성)
		 * @param {boolean=} multiline 여부.
		 * @param {number=} content_width word wrap이 일어나는 문자열의 경우 길이를 제한하는 정수 값입니다.
		 * @param {boolean=} fitText 컴포넌트에 적용된 크기가 아닌 텍스트 자체의 크기만 반환할지 여부 (default:false, HTML 전용)
		 * @return {array} [너비, 높이]
		 * @example
		 *
		 * // btn_sample1.style.font ==> Dotum,9
		 * trace(Eco.XComp.PositionSize.getTextSize(btn_sample1)); // output : [69,12]
		 *
		 * // btn_sample2.style.font ==> Dotum,9,bold
		 * trace(Eco.XComp.PositionSize.getTextSize(btn_sample2)); // output : [80,12]
		 *
		 * // btn_sample3.style.font ==> Verdana,10
		 * trace(Eco.XComp.PositionSize.getTextSize(btn_sample3)); // output : [83,16]
		 *
		 * @memberOf Eco.XComp.PositionSize
		 */	
		getTextSize: function(XComp, text, multiline, content_width, fitText)
		{
			var font;
			if ( XComp instanceof nexacro.Style_font )
			{
				font = XComp;
				multiline = Eco.isEmpty(multiline) ? false : multiline;
				if ( multiline && content_width == null )
				{
					content_width = 50;
				}
			}
			else
			{
				font = XComp.currentstyle.font;
				
				if ( Eco.isEmpty(font) )
				{
					font = nexacro.Component._default_font;
				}				
				
				text = Eco.isEmpty(text) ? XComp.text : text;
				if ( Eco.isEmpty(multiline) )
				{
					if ( XComp["wordwrap"] != null )
					{
						multiline = XComp["wordwrap"] != "none"? true: false;
					}
				}
				
				//if ( multiline && content_width == null )
				//{
				//	content_width = XComp.getOffsetWidth();
				//}
			}
			
			var size = [0, 0];
			if ( Eco.isEmpty(text) ) return size;  

			if ( nexacro.Browser != "Runtime" )
			{
				var _handle = Eco._textSizeDiv;
				if ( !_handle )
				{
					var _doc = nexacro._managerFrameDoc;
					_handle = _doc.createElement("div");
					_doc.body.appendChild(_handle);
					Eco._textSizeDiv = _handle; 
				}
				var _style = _handle.style;
				
				_style.position = "absolute";
				_style.visibility = "hidden";	
				
				if ( multiline )
				{			
					_style.width = content_width + "px";
					_style.height = "auto";
					_style.whiteSpace = "pre-wrap";
					_style.wordBreak = "break-all";
					_style.wordWrap = "break-word";						
				}
				else
				{
					_style.width = "auto";
					_style.height = "auto";
					_style.whiteSpace = "pre";					
					_style.wordWrap = "normal";
				}
				
				_style.font = font._sysvalue;
				
				// 컴포넌트에 적용된 크기가 아닌 텍스트 자체의 크기만 구할 경우 
				if ( fitText == true)
				{
					_style.lineHeight = "100%";
				}
				
				if ( nexacro.Browser == "IE" && nexacro.BrowserVersion < 9 )
				{
					_handle.innerText = text;
					var rect = _handle.getBoundingClientRect();
					size = [rect.right - rect.left, rect.bottom - rect.top];
				}
				else
				{
					_handle.innerHTML = text;
					var rect = _handle.getBoundingClientRect();
					size = [rect.width, rect.height];
				}
				
				//_doc.body.appendChild(_handle);
				//size = [_handle.clientWidth, _handle.clientHeight];
				//delete handle
				//_doc.body.removeChild(_handle);
			}
			else
			{
				size = nexacro.getTextSize(text, font, content_width, multiline);
				size[0] = size.nx;
				size[1] = size.ny;				
			}
			
			size[0] = Math.ceil(size[0]);
			size[1] = Math.ceil(size[1]);
			
			return size;
		},
		
		 /**
		 * 주어진 url 에 해당하는 이미지의 너비,높이 반환.<br>
		 * 해당 이미지지 너비, 높이는 callback 함수를 통해 반환되며<br>
		 * callback 함수의 인자는 url, width, height 임.
		 * @param {string} url 이미지경로(절대경로, 상대경로, url경로, prefix경로)
		 * @param {function} callback 구해진 이미지 사이즈를 반환할 함수로 (url, width, height) 인자를 보냄
		 * @param {*} scope callback 내부에서 this 로 사용할 대상
		 * @example
		 *
		 * this.imageLoadCallback = function(url, width, height)
		 * {
		 * 	trace(url + " : " + width + " : " + height);
		 * }
		 *
		 * var url = "http://www.tobesoft.com/tobesoft_eng/images/product_imgs/visual_xplatform_img001.jpg";
		 * Eco.XComp.PositionSize.getImageSize(url, this.imageLoadCallback, this);
		 * // output : "http://www.tobesoft.com/tobesoft_eng/images/product_imgs/visual_xplatform_img001.jpg" : 310 : 214
		 *
		 * var url = "Image::ColorDialog.JPG";
		 * Eco.XComp.PositionSize.getImageSize(url, this.imageLoadCallback, this);
		 * // output : "Image::ColorDialog.JPG" : 206 : 172
		 *
		 * var url = "./Images/select.GIF";
		 * Eco.XComp.PositionSize.getImageSize(url, this.imageLoadCallback, this);
		 * // output : "./Images/select.GIF" : 19 : 19
		 *
		 * @memberOf Eco.XComp.PositionSize
		 */			
		getImageSize: function(url, callback, scope)
		{
			/*
				아래는 nexacro._getImageSize 함수 내부에서 처리하는 내용이나
				cache 될 경우 callback 반환이 없고 callback에서 반환하는 
				url 은 실제 full 경로이므로 해당 로직을 먼저 처리하여
				반환되는 url을 맞춘다. 반환되는 url 은 실제 full 경로가
				아닌 입력된 url 을 반환한다.
			*/
			if (!url) return null;
			if (url.substring(0, 4).toLowerCase() == "url(")
			{
				url = url.substring(5, url.length - 2);                
			}

			if (!url)
				return null;
			
			var refUrl;
			if ( scope && scope._getRefFormBaseUrl )
			{
				refUrl = scope._getRefFormBaseUrl();
			}
			else
			{
				refUrl = application.getActiveForm();
			}

			var img_url = "";
			
			if( application["_getImageLocation"] )
			{
				img_url = application._getImageLocation(url, refUrl);
			}
			else
			{
				img_url = nexacro._getImageLocation(url, refUrl);
			}
			
			var size = nexacro._ImgInfoCacheList[img_url];
			
			if (size)
			{
				callback.call(scope, url, size.width, size.height);
			}			
			else
			{
				var pThis = Eco.XComp.PositionSize;
				pThis._getImageSizeCallbackInfo[img_url] = [url, callback, scope];

				size = nexacro._getImageSize(img_url, pThis._getImageSizeOnLoad, pThis);
				if (size)
				{
					callback.call(scope, url, size.width, size.height);
				}
			}
		},
		
		/**
		 * temporary callback infomation
		 * @private
		 * @memberOf Eco.XComp.PositionSize
		 */		
		_getImageSizeCallbackInfo: {},
		
		/**
		 * callback
		 * @private
		 * @memberOf Eco.XComp.PositionSize
		 */		
		_getImageSizeOnLoad: function(url, width, height)
		{
			var pThis = Eco.XComp.PositionSize;
			var info = pThis._getImageSizeCallbackInfo[url];
			
			info[1].call(info[2], info[0], width, height);
			
			delete pThis._getImageSizeCallbackInfo[url];
		},
		
		 /**
		 * 컴포넌트가 가지는 모양을 표시하기 위한 최소 크기(너비,높이) 반환.<br><br>
		 * ※ 크기에 영향을 미치는 요소는 다음과 같다.<br>
		 *    - border<br>
		 *    - padding<br>
		 *    - text<br><br>
		 * ※ text 가 없는 경우 기본글자 크기 적용.<br>
		 * ※ scroll 을 가지는 컴포넌트는 현재 자신의 사이즈를 반환.
		 * @param {XComp} XComp nexacro Component
		 * @param {=number} width Maximum width of the string in pixels. if wordwrap property is true(not "none").
		 * @return {array} [너비, 높이]
		 * @example
		 *
		 * // btn_sample4 ==> width : 36, height : 28, text : "btn_sample4"
		 * trace(Eco.XComp.PositionSize.getContentSize(btn_sample4)); // output : [73,16]
		 *
		 * // chk_sample1 ==> width : 38, height : 20, text : "CheckBox", border : 1px solid red
		 * trace(Eco.XComp.PositionSize.getContentSize(chk_sample1)); // output : [80,14]
		 *
		 * // cmb_sample1 ==> width : 150, height : 20, text : ""
		 * trace(Eco.XComp.PositionSize.getContentSize(cmb_sample1)); // output : [38,12]
		 *
		 * // cal_sample1 ==> width : 120, height : 29, value : "20130505"
		 * trace(Eco.XComp.PositionSize.getContentSize(cal_sample1)); // output : [108,16]
		 *
		 * // txt_sample1 ==> width : 114, height : 44
		 * trace(Eco.XComp.PositionSize.getContentSize(txt_sample1)); // output : [114,44]
		 *
		 * @memberOf Eco.XComp.PositionSize
		 */
		getContentSize: function(XComp, width)
		{
			var size = [0,0];
			if ( Eco.isXComponent(XComp) )
			{		
				var w = 0, h = 0;		
				
				// scroll을 가지는 컴포넌트는 현재 자신의 size 를 리턴
				if ( !Eco.isEmpty(XComp.hscrollbar) && !Eco.isEmpty(XComp.vscrollbar) )
				{
					if ( Eco.XComp.typeOf(XComp) == "Tabpage" ) 
					{
						w = XComp.getOffsetWidth();
						h = XComp.getOffsetHeight();
					}
					else 
					{
						w = XComp.getOffsetWidth();
						h = XComp.getOffsetHeight();
					}
					size = [w, h];
				}
				else
				{
					// (margin + border + padding) width, height
					var sz = this._getStyleSpaceSize(XComp), borderHeight = sz[1];
					
					w += sz[0];
					h += sz[1];

					var text = XComp.text;					
					if ( Eco.isEmpty(text) )
					{
						sz = Eco.XComp.PositionSize.getTextSize(XComp, "W", false);
					}
					else
					{
						if ( Eco.isNumber(width) )
						{
							sz = Eco.XComp.PositionSize.getTextSize(XComp, text, true, width);
						}
						else
						{
							sz = Eco.XComp.PositionSize.getTextSize(XComp, text, false);
						}
					}
										
					w += sz[0];
					h += sz[1];

					// component control size 추가 
					var type = Eco.XComp.typeOf(XComp),
						curstyle = XComp.currentstyle;
					
					if ( type == "Calendar" )
					{
						if ( XComp.type == "monthonly" )
						{
							// monthonly 의 경우 현재 사이즈 반환
							return [XComp.getOffsetWidth(), XComp.getOffsetHeight()];
						}
						else
						{
							// calendaredit
							sz = Eco.XComp.PositionSize._getStyleSpaceSize(XComp.calendaredit);
							w += sz[0];
							h += sz[1];
						}
					}
					else if ( type == "Combo" )
					{
						sz = Eco.XComp.PositionSize._getStyleSpaceSize(XComp.comboedit);
						
						w += sz[0];
						h += sz[1];
					}
					else if ( type == "Radio" )
					{
						var itempadding = curstyle.itempadding;
						w += isNaN(itempadding.left) ? 0 : itempadding.left;						
						w += isNaN(itempadding.right) ? 0 : itempadding.right;						
						h += isNaN(itempadding.top) ? 0 : itempadding.top;						
						h += isNaN(itempadding.bottom) ? 0 : itempadding.bottom;
					}
					
					if ( type == "CheckBox" || type == "Radio" )
					{
						//w += 3;
					}

					// button size
					var buttonsize;
					if ( curstyle.buttonsize )
					{
						buttonsize = nexacro.toNumber(curstyle.buttonsize.value);
					}
					if ( !isNaN(buttonsize) )
					{
						// 미지정시 -1
						if ( buttonsize < 0 )
						{
							w += h;
						}
						else
						{
							w += buttonsize;
						}
					}
					
					// textpadding size
					var textpadding = curstyle.textpadding;
					if ( textpadding )
					{
						w += isNaN(textpadding.left) ? 0 : textpadding.left;						
						w += isNaN(textpadding.right) ? 0 : textpadding.right;						
						h += isNaN(textpadding.top) ? 0 : textpadding.top;						
						h += isNaN(textpadding.bottom) ? 0 : textpadding.bottom;		
					}
					if ( !isNaN(buttonsize) )
					{
						
						h = Math.max(h, buttonsize + borderHeight);
					}
					size[0] = w;
					size[1] = h;
				}
			}
			return size;
		},
		
		/**
		 * border, padding 을 더한 size (너비,높이) 반환 
		 * @private
		 * @param {XComp} XComp nexacro Component
		 * @return {array} [너비, 높이]
		 * @memberOf Eco.XComp.PositionSize
		 */	
		 _getStyleSpaceSize: function(XComp)
		 {
			var Style = Eco.XComp.Style;
			var w = 0, h = 0;
			
			// margin
			var margin = Style.getMargin(XComp);
			w += margin[0] + margin[2];
			h += margin[1] + margin[3];
			
			// border
			var border = Style.getBorderWidth(XComp);
			w += border[0] + border[2];
			h += border[1] + border[3];
			
			// padding
			var padding = Style.getPadding(XComp);
			w += padding[0] + padding[2];
			h += padding[1] + padding[3];
			
			return [w, h];
		 },
		 
		 /**
		 * application 영역을 표시가능 대상으로 하면서 "특정 Component" 기준으로,<br>
		 * 지정된 size를 갖는 컴포넌트를 표시하기위한 방향 및 좌표를 반환한다.<br><br>
		 *  ※direction이 vert(vertical) 일때 표시방법: <br>
		 *    1.하단 왼쪽맞춤(default).<br>
		 *    2.왼쪽맞춤으로 공간부족시, 표시를 위해 팝업을 왼쪽으로 이동시킨다.<br>
		 *    3.하단에 공간이 부족하면 상단에 표시.<br>
		 *    4.2번과정 반복<br>
		 *    5.1~4번으로도 공간확보가 안되면 direction을 무시하고 표시가능한 영역을 찾는다.<br>
		 *    6.영역을 초과하는 공간을 요청하면,표시가능한 x,y좌표 및 size를 반환한다.<br><br>
		 *  ※direction이 horz(horizontal) 일때 표시방법: <br>
		 *    1.우측 상단맞춤(default).<br>
		 *    2.상단맞춤으로 공간부족시, 표시를 위해 팝업을 위쪽으로 이동시킨다.<br>
		 *    3.우측에 공간이 부족하면 좌측에 표시.<br>
		 *    4.2번과정 반복<br>
		 *    5.1~4번으로도 공간확보가 안되면 direction을 무시하고 표시가능한 영역을 찾는다.<br>
		 *    6.영역을 초과하는 공간을 요청하면,표시가능한 x,y좌표 및 size를 반환한다.
		 * @param {XComp} XComp 기준이 되는 nexacro Component 
		 * @param {number} width 표시할 팝업 width
		 * @param {number} height 표시할 팝업 height
		 * @param {string=} direction 팝업표시 방향."vert": vertical(default),"horz": horizontal
		 * @param {number=} offset 표시될때 XComp와의 간격(default: 0).
		 * @return {array.<string...number>} [XComp 기준 팝업위치("left", "top", "right", "bottom"), x, y [ ,width, height] ]
		 *   <pre>※주어진 width와 height, offset으로 
		 *    1.표시가능한 공간이 있을 경우: 
		 *       [팝업위치("left", "top", "right", "bottom"), x좌표, y좌표]
		 *    2.영역을 초과하는 공간을 요청했을 때는 표시가능한 정보 반환: 
		 *       [팝업위치("left", "top", "right", "bottom"), x좌표, y좌표, 가능한 width, 가능한 height]
		 *   </pre>
		 
		 * @example
		 *   var position = Eco.XComp.PositionSize.getPopupPosition(Button00, 44, 23, "vert", 2); //return: [bottom, 1394, 317]
		 *   PopupDiv00.trackPopup(position[1], position[2]);
		 *
		 *   //해상도(1920*1080)를 초과한 높이 2000의 위치를 요구했을경우.
		 *   var position = Eco.XComp.PositionSize.getPopupPosition(Button00, 300, 2000, "vert", 2); //return: [right,854,0,300,1080]
		 *   PopupDiv00.trackPopup(position[1], position[2]);
		 * @memberOf Eco.XComp.PositionSize
		 */			
		getPopupPosition: function(XComp, width, height, direction, offset)
		{
			return this.getPositionByForm(XComp, width, height, direction, offset);
		},		
		
		
		 /**
		 * 지정된 객체가 form에서(form, div, tabpage) 차지하는 영역을 대상으로 하면서 "특정 Component" 기준으로,<br>
		 * 지정된 size를 갖는 컴포넌트를 표시하기위한 방향 및 좌표를 반환한다.<br>
		 * ※ 지정된 영역 미설정시 application 영역을 기준으로 계산한다.<br><br>
		 *  ※direction이 vert(vertical) 일때 표시방법: <br>
		 *    1.하단 왼쪽맞춤(default).<br>
		 *    2.왼쪽맞춤으로 공간부족시, 표시를 위해 팝업을 왼쪽으로 이동시킨다.<br>
		 *    3.하단에 공간이 부족하면 상단에 표시.<br>
		 *    4.2번과정 반복<br>
		 *    5.1~4번으로도 공간확보가 안되면 direction을 무시하고 표시가능한 영역을 찾는다.<br>
		 *    6.영역을 초과하는 공간을 요청하면,표시가능한 x,y좌표 및 size를 반환한다.<br><br>
		 *  ※direction이 horz(horizontal) 일때 표시방법: <br>
		 *    1.우측 상단맞춤(default).<br>
		 *    2.상단맞춤으로 공간부족시, 표시를 위해 팝업을 위쪽으로 이동시킨다.<br>
		 *    3.우측에 공간이 부족하면 좌측에 표시.<br>
		 *    4.2번과정 반복<br>
		 *    5.1~4번으로도 공간확보가 안되면 direction을 무시하고 표시가능한 영역을 찾는다.<br>
		 *    6.영역을 초과하는 공간을 요청하면,표시가능한 x,y좌표 및 size를 반환한다.
		 * @param {XComp} XComp 표시 위치를 얻고자 하는 nexacro Component 
		 * @param {number} width 표시할 팝업 width
		 * @param {number} height 표시할 팝업 height
		 * @param {string=} direction 팝업표시 방향."vert": vertical(default),"horz": horizontal
		 * @param {number=} offset 표시될때 XComp와의 간격(default: 0).
		 * @param {XComp=} scopeXComp 표시 위치를 얻고자 하는 nexacro Component가 표시될 영역에 해당하는 Component(default: application.mainframe).
		 * @return {array.<string...number>} [XComp 기준 위치("left", "top", "right", "bottom"), x, y [ ,width, height] ]
		 *   <pre>※주어진 width와 height, offset으로 
		 *    1.표시가능한 공간이 있을 경우: 
		 *       [팝업위치("left", "top", "right", "bottom"), x좌표, y좌표]
		 *    2.영역을 초과하는 공간을 요청했을 때는 표시가능한 정보 반환: 
		 *       [팝업위치("left", "top", "right", "bottom"), x좌표, y좌표, 가능한 width, 가능한 height]
		 *   </pre>
		 
		 * @example
		 *   var position = Eco.XComp.PositionSize.getPositionByForm(Button00, 44, 23, "vert", 2, this); //return: [bottom, 1394, 317]
		 *   Button00.move(position[1], position[2]);
		 *
		 *   //해상도(1920*1080)를 초과한 높이 2000의 위치를 요구했을경우.
		 *   var position = Eco.XComp.PositionSize.getPositionByForm(Button00, 300, 2000, "vert", 2, this); //return: [right,854,0,300,1080]
		 *   Button00.move(position[1], position[2]);
		 * @memberOf Eco.XComp.PositionSize
		 */			
		getPositionByForm: function(XComp, width, height, direction, offset, scopeXComp)
		{
			var w = 0, h = 0;
			var relativeXComp;
			
			if(scopeXComp) {
		    	w = scopeXComp.getOffsetWidth();
		    	h = scopeXComp.getOffsetHeight();			
				relativeXComp = scopeXComp;
			
			} else {
				var _window = XComp._getWindow();
				w = _window.clientWidth;
				h = _window.clientHeight;
				relativeXComp = application.mainframe;
			}
			
			var xy = Eco.XComp.PositionSize.convertXY(relativeXComp, [0, 0], XComp);
			var x = xy[0];
			var y = xy[1];
			
			if ( isNaN(xy[0]) || isNaN(xy[1]) ) return;
			
			var x = [xy[0], xy[0] + XComp.getOffsetWidth()];
			var y = [xy[1], xy[1] + XComp.getOffsetHeight()];

			// Client 크기의 Rect
			var rect = {'left': 0, 'top': 0, 'right': w, 'bottom': h, 'width': w, 'height': h};

			var position = Eco.XComp.PositionSize._getDisplayPosition(width, height, x, y, rect, direction, offset);

			
			return position;
		},			
		
		/**
		 * 컴포넌트 표시를 위한 좌표반환<br><br>
		 *  ※표시될 공간이 없을 경우 우선순위<br>
		 *     direction이 vertical 일때 : 하단(왼쪽맞춤->오른쪽맞춤) -> 상단(왼쪽맞춤->오른쪽맞춤)
		 * @private
		 * @param {number} width 표시할 width
		 * @param {number} height 표시할 height
		 * @param {string} direction 팝업표시 방향."vert": vertical(default),"horz": horizontal
		 * @param {number} offset 표시될때 XComp와의 간격.
		 * @param {boolean=} isChange direction 전환 후 재호출 여부.
		 * @return {number} [x,y] 좌표배열
		 * @memberOf Eco.XComp.PositionSize
		 */	
		 _getDisplayPosition: function(width, height, screenX, screenY, screenRect, direction, offset, isChange)
		 {
			if(isChange != true)
			{
				isChange = false;
			}
			
			var pThis = Eco.XComp.PositionSize;
			var position;
			
			if(direction == "horz")
			{
				position = pThis._getHorizontalPosition(width, height, screenX, screenY, screenRect, direction, offset, isChange);
			}
			else if(direction == "vert")
			{
				position = pThis._getVerticalPosition(width, height, screenX, screenY, screenRect, direction, offset, isChange);
			}
			
			var side = position[0];
			//표시할 수 있는 공간이 없을 때.
			//표시가능한 최대공간에 대한 정보를 반환한다.
			if(position[1] === undefined && position[2] === undefined)
			{
				if(width > screenRect.width)
				{
					width = screenRect.width;
				}
				
				if(height > screenRect.height)
				{
					height = screenRect.height;
				}				
				
				position = [side, screenRect.left, screenRect.top, width, height];
			}
			else if(position[1] === undefined)
			{
				position = [side, screenRect.left, position[2], screenRect.width, height];
			}
			else if(position[2] === undefined)
			{
				position = [side, position[1], screenRect.top, width, screenRect.height];
			}
			
			return position;
		 },
	 	
		/**
		 * 컴포넌트 표시를 위한 수직방향 좌표 반환
		 * @private
		 * @param {number} width 표시할 width
		 * @param {number} height 표시할 height
		 * @param {string} direction 팝업표시 방향."vert": vertical,"horz": horizontal
		 * @param {number} offset 표시될때 XComp와의 간격.
		 * @param {boolean} isChange direction 전환 후 재호출 여부.
		 * @return {array.<number>} screenX, screenY 좌표, 최종 direction
		 * @memberOf Eco.XComp.PositionSize
		 */	
		 _getVerticalPosition: function(width, height, screenX, screenY, screenRect, direction, offset, isChange)
		 {
			var pThis = Eco.XComp.PositionSize;
			var side;
			//bottom 공간확인
			if(screenRect.bottom  >= (screenY[1] + height + offset))
			{
				side = "bottom";
				screenY = screenY[1] + offset;

			} //top 공간확인
			else if(screenRect.top  < (screenY[0] - height - offset)) 
			{
				side = "top";
				screenY = screenY[0] - height - offset;
			}
			else
			{
				if(isChange == true)
				{
				    //재검사시에도 표시공간을 못찾으면 direction의 기본방향 리턴.
					return ["right", undefined, undefined];
				}
				

			    //argument로 전달된 direction으로 공간이 확보되지 않으면
			    //다른 direction으로 가능한 공간을 찾는다.
				direction = (direction=="vert")?"horz":"vert";
				var position = pThis._getDisplayPosition(width, height, screenX, screenY, screenRect, direction, offset, true);
				return position;	
			}
			
			//align 위치 획득
			screenX = pThis._getHorizontalAlign(width, height, screenX, screenY, screenRect, direction, offset);
			
			return [side, screenX, screenY];
				
		 },
		

		/**
		 * 컴포넌트 표시를 위한 수평방향 좌표 반환
		 * @private
		 * @param {number} width 표시할 width
		 * @param {number} height 표시할 height
		 * @param {string=} direction 팝업표시 방향."vert": vertical,"horz": horizontal
		 * @param {number} offset 표시될때 XComp와의 간격.
		 * @param {boolean} isChange direction 전환 후 재호출 여부.
		 * @return {array.<number>} screenX, screenY 좌표, 최종 direction
		 * @memberOf Eco.XComp.PositionSize
		 */	
		 _getHorizontalPosition: function(width, height, screenX, screenY, screenRect, direction, offset, isChange)
		 {
			var pThis = Eco.XComp.PositionSize;
			var side;
			
			if(screenRect.right >= (screenX[1] + width + offset))
			{
				side = "right";
				screenX = screenX[1] + offset;
				
			}
			else if(screenRect.left  < (screenX[0] - width - offset))
			{
				side = "left";
				screenX = screenX[0] - width - offset ;
			}
			else
			{
				if(isChange == true)
				{
					//재검사시에도 표시공간을 못찾으면 direction의 기본방향 리턴.
					return ["bottom", undefined,undefined];
				}			
			
			    //argument로 전달된 direction으로 공간이 확보되지 않으면
			    //다른 direction으로 가능한 공간을 찾는다.			
				direction = (direction=="vert")?"horz":"vert";
				var position = pThis._getDisplayPosition(width, height, screenX, screenY, screenRect, direction, offset, true);
				return position;	
			}			
			
			//align 위치 획득
			screenY = pThis._getVerticalAlign(width, height, screenX, screenY, screenRect, direction, offset);
			
			return [side, screenX, screenY];
		 },
		 
		/**
		 * direction이 vertical일때 컴포넌트 표시를 위한 수평정렬위치 반환.
		 * @private
		 * @param {number} width 표시할 width
		 * @param {number} height 표시할 height
		 * @param {string} direction 팝업표시 방향."vert": vertical,"horz": horizontal
		 * @param {number} offset 표시될때 XComp와의 간격.
		 * @return {number} screenX 좌표
		 * @memberOf Eco.XComp.PositionSize
		 */	
		 _getHorizontalAlign: function(width, height, screenX, screenY, screenRect, direction, offset)
		 {
			var spaceSize = screenRect.right - (screenX[0] + width);
			
			if(spaceSize >= 0)
			{
				screenX = screenX[0];
			}
			else if(spaceSize < 0)
			{
				screenX = screenX[0] + spaceSize;
				
				//표시공간보다 팝업size가 over시
				if(screenX < screenRect.left)
				{
					//trace("_getHorizontalAlign 표시공간보다 팝업size가 over시");
					screenX = undefined;
				}
			}
			else
			{
				screenX = undefined;
				Eco.Logger.error({message:"unexpected situation!!", stack:true});
			}

			return screenX;
		 },	
		 		 
		/**
		 * direction이 horizontal일때 컴포넌트 표시를 위한 수직정렬위치 반환
		 * @private
		 * @param {number} width 표시할 width
		 * @param {number} height 표시할 height
		 * @param {string} direction 팝업표시 방향."vert": vertical,"horz": horizontal
		 * @param {number} offset 표시될때 XComp와의 간격.
		 * @return {number} screenY 좌표
		 * @memberOf Eco.XComp.PositionSize
		 */	
		 _getVerticalAlign: function(width, height, screenX, screenY, screenRect, direction, offset)
		 {
			var spaceSize = screenRect.bottom - (screenY[0] + height);
			
			if(spaceSize >= 0)
			{
				screenY = screenY[0];
			}
			else if(spaceSize < 0)
			{
				screenY = screenY[0] + spaceSize;
				
				//표시공간보다 팝업size가 over시
				if(screenY < screenRect.top)
				{
					screenY = undefined;
				}				
			}
			else
			{
				screenY = undefined;
				Eco.Logger.error({message:"unexpected situation!!", stack:true});
			}

			return screenY;			
		 }

	});

}
