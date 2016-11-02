/**
 * @fileoverview nexacro Components의 Style과 관련된 함수.
 */

if ( !JsNamespace.exist("Eco.XComp.Style") )
{
	/**
	 * @namespace
	 * @name Eco.XComp.Style
	 * @memberof! <global>
	 */
	JsNamespace.declare("Eco.XComp.Style", {
		 /**
		 * nexacro Component의 boder width를 반환한다.
		 * @param {XComp} xComp nexacro Component
		 * @return {array.<number>} [ leftWdith, topWdith, rightWdith, bottomWdith ]
		 * @example
		 * trace(Eco.XComp.Style.getBorderWidth("border style이 none이거나 width가 0일 경우")); //output: [0,0,0,0] 
		 * trace(Eco.XComp.Style.getBorderWidth("border가 1인 component")); //output: [1,1,1,1]
		 *
		 * @memberOf Eco.XComp.Style
		 */
		getBorderWidth: function(xComp)	
		{
			var currentBorder = xComp.currentstyle.border;
			if (currentBorder)
			{
				var leftWidth = 0,topWidth = 0,rightWidth = 0,bottomWidth = 0;
				leftWidth = currentBorder.left_width;
				topWidth = currentBorder.top_width;
				rightWidth = currentBorder.right_width;
				bottomWidth = currentBorder.bottom_width;
				
				leftWidth = Eco.isEmpty(leftWidth) ? "0" : leftWidth;
				topWidth = Eco.isEmpty(topWidth) ? "0" : topWidth;
				rightWidth = Eco.isEmpty(rightWidth) ? "0" : rightWidth;
				bottomWidth = Eco.isEmpty(bottomWidth) ? "0" : bottomWidth;
				
				leftWidth   = nexacro.toNumber(leftWidth.replace("px",""));
				topWidth    = nexacro.toNumber(topWidth.replace("px",""));
				rightWidth  = nexacro.toNumber(rightWidth.replace("px",""));
				bottomWidth = nexacro.toNumber(bottomWidth.replace("px",""));
				
				return [leftWidth, topWidth, rightWidth, bottomWidth];
			}
			else
			{
				return [0, 0, 0, 0];
			}
		},
		
		 /**
		 * nexacro Component의 Padding Size를 반환한다.
		 * @param {XComp} xComp nexacro Component
		 * @return {array.<number>} [ leftSize, topSize, rightSize, bottomSize ]
		 * @example
		 * trace(Eco.XComp.Style.getPadding("전체 padding = 0")); //output: [0,0,0,0] 
		 * trace(Eco.XComp.Style.getPadding("left padding = 20")); //output: [20,0,0,0] 
		 *
		 * @memberOf Eco.XComp.Style
		 */
		getPadding: function(xComp)	
		{
			var padding = xComp.currentstyle.padding;
			var leftSize = 0, topSize = 0, rightSize = 0, bottomSize = 0;

			if ( padding )
			{
				topSize    = (isNaN(padding.top) ? 0 : padding.top);
				bottomSize = (isNaN(padding.bottom) ? 0 : padding.bottom);
				leftSize   = (isNaN(padding.left) ? 0 : padding.left);
				rightSize  = (isNaN(padding.right) ? 0 : padding.right);
			}
			
			return [leftSize, topSize, rightSize, bottomSize];
		},
		
		 /**
		 * nexacro Component의 Margin Size를 반환한다.
		 * @deprecated nexacro component 는 margin 이 없습니다.
		 * @param {XComp} xComp nexacro Component
		 * @return {array.<number>} [ leftSize, topSize, rightSize, bottomSize ]
		 * @example
		 * trace(Eco.XComp.Style.getMargin("전체 padding = 0")); //output: [0,0,0,0] 
		 * trace(Eco.XComp.Style.getMargin("left padding = 20")); //output: [20,0,0,0] 
		 *
		 * @memberOf Eco.XComp.Style
		 */
		getMargin: function(xComp)	
		{
			// deprecated !!
			/*
			var margin = xComp.currentstyle.margin;
			var leftSize = 0, topSize = 0, rightSize = 0, bottomSize = 0;
			
			if ( margin )
			{
				topSize = (isNaN(margin.top) ? 0 : margin.top);
				bottomSize = (isNaN(margin.bottom) ? 0 : margin.bottom);
				leftSize = (isNaN(margin.left) ? 0 : margin.left);
				rightSize = (isNaN(margin.right) ? 0 : margin.right);
			}
			return [leftSize, topSize, rightSize, bottomSize];
			*/
			return [0, 0, 0, 0];
		},

		 /**
		 * nexacro Component의 Style을 반환한다.
		 * @param {XComp} xComp nexacro Component
		 * @return {object} 
		 * @example
		 * trace(Eco.XComp.Style.getStyle(xComp));
         * // output:
         * //  {background: "left middle"
         * //   ,border: "1 solid #808080ff "
         * //   ,padding: "0 0 0 0"
         * //   ,align: "center middle"}
         *
         * @memberOf Eco.XComp.Style
		 */
		getStyle: function(xComp)	
		{
			var style = xComp.style;
			var json = {};
			var isFunction = Eco.isFunction;
			
			for ( var name in style )
			{
				if ( style.hasOwnProperty(name) )
				{
					if ( name.charAt(0) == "_" ) continue;
					
					var styleProp = style[name];
					if ( styleProp )
					{
						if ( !isFunction(styleProp) )
						{
							if(styleProp === undefined) continue;
							
							value = styleProp.toString();
							
							if(value == "undefined") continue;
							
							if ( value.length )
							{
								json[name] = value;
							}
						}
					}
				}
			}
			
			return json;
		},
		
		 /**
		 * nexacro Component의 Current Style을 반환한다.
		 * @param {XComp} xComp nexacro Component
		 * @return {object} 
		 * @example
		 * trace(Eco.XComp.Style.getCurrentStyle(xComp));
		 * // output:
		 * //  {background: "left middle"
		 * //   ,border: "1 solid #808080ff "
		 * //   ,color: "#333333ff"
		 * //   ,padding: "0 0 0 0"
		 * //   ,bordertype: "normal 0 0 "
		 * //   ,align: "center middle"
		 * //   ,font: "Dotum,11,bold"}
		 *
		 * @memberOf Eco.XComp.Style
     	 */
		getCurrentStyle: function(xComp)	
		{
			var currentStyle = xComp.currentstyle;
			var normalValue = {};
			var isFunction = Eco.isFunction;
			
			for ( var name in currentStyle )
			{				
				if ( currentStyle.hasOwnProperty(name) )
				{
					if ( name.charAt(0) == "_" ) continue;
					
					var styleProp = currentStyle[name];
					if ( styleProp )
					{
						if ( !isFunction(styleProp) )
						{
							value = styleProp.toString();
							if ( value.length )
							{
								normalValue[name] = value;
							}
						}
					}
				}
			}
			
			return normalValue;
		},		
		
		 /**
		 * nexacro Component의 style을 설정한다.
		 * @param {XComp} xComp nexacro Component
		 * @param {json} styleValue style설정 value.
		 * @param {boolean} clearFlag 모든 style값 clear여부(default:true).
		 * @example
		 * //현재 설정된 style을 모두 clear 후 지정된 style값만 설정
		 * var styleValue = {color: "red"};
		 * Eco.XComp.Style.setStyle(st_sample10, styleValue, false);
		 *
		 * //현재 설정된 style은 유지하고 지정된 style값만 설정
		 * var styleValue = {border: "2 solid yellow", color: "red"};
         * Eco.XComp.Style.setStyle(st_sample9, styleValue);
         *
         * @memberOf Eco.XComp.Style
		 */
		setStyle: function(xComp, styleValue, clearFlag)	
		{
			
			var prevStyle = Eco.XComp.Style.getStyle(xComp);
			var newValue = {}, value;
			var isFunction = Eco.isFunction;

			if(Eco.isEmpty(clearFlag)) clearFlag = true;
			
			//적용할 style 구문 추출.
			if(clearFlag)
			{
				//기존 style값 clear
				for(var name in prevStyle)
				{
					if ( prevStyle.hasOwnProperty(name) )
					{
						//xComp[name] = "";
						//trace("기존 style값 clear name=" + name);
						if(name.substr(0,1) == "_") continue;
						xComp["style"]["set_" + name]("");
					}
				}
				
				for ( var name in styleValue )
				{
					if ( styleValue.hasOwnProperty(name) )
					{
						newValue[name] = styleValue[name];
					}
				}
				
			}
			else 
			{
				prevStyle = xComp.style;
				var isEmpty = Eco.isEmpty;
				var prevStyleValue;
				for(var name in prevStyle)
				{
					
					if(styleValue[name] && styleValue.hasOwnProperty(name))
					{
						
						newValue[name] = styleValue[name];
					}
					else 
					{
						prevStyleValue = prevStyle[name];
						
						//설정값이 있는것만 추출.
						if(!prevStyleValue || isEmpty(prevStyleValue.toString())) continue;
					
						newValue[name] = prevStyleValue;
					}
				}
			}
			
			for ( var name in newValue )
			{
				if ( newValue.hasOwnProperty(name) )
				{
					value = newValue[name];

					if (!isFunction(value))
					{
						if(name.substr(0,1) == "_") continue;
						xComp["style"]["set_" + name](value);
					}
				}
			}
		},		


		/**
		* nexacro Component에 argument로 주어진 styleValue를 condition에 따라 적용한다.<br><br>
		* - condition이 string일 때:<br>
		*    styleValue의 속성과 동일한 xComp의 속성값이 condition과 같을 때 적용한다.<br>
		* - condition이 function일 때:<br>
		*    condition의 실행값이 true일 경우에만 적용한다.<br>
		*    ※ 이 때 condition 함수를 호출 시 xComp, 속성명, 속성값이 arguments로 전달된다.<br>
		* - condition이 ""(빈문자열) 또는 null, undefined 일 때:<br>
		*    styleValue의 속성명과 동일한 xComp의 속성값이 없을 경우에만 적용한다.<br><br>
		* ※component의 style에 지정된 속성이 없어서 테마의 기본값이 표시되는 것은<br>
		*   속성값이 없는 것으로 본다.
		* @param {XComp} xComp target 객체 
		* @param {object} styleValue source 객체
		* @param {function|string|undefined} condition 적용조건
		* @param {object} scope callback 함수에 대한 수행 scope(this) 
		* @param {boolean} clearFlag 모든 style값 clear여부(default:true).
		* @example
		* //btn_result_01의 color속성이 'red'일 경우에 이 속성값을 "blue"로 적용
		* var styleValue = {color:"blue"};
		* Eco.XComp.Style.setStyleIf(btn_result_01, styleValue, "red", this, false);
        *
        * //btn_result_02의 enable속성이 true일 경우에만 boder,color 적용
        * var styleValue = {border:"3 double red", color: "red"};
        * Eco.XComp.Style.setStyleIf(btn_result_02, styleValue, function(xComp, name, value) {
        *         if (xComp.enable == true)
        *         {
        *             return true;
        *         }
        *         return false;
        *     }
        * , this);
        *
        * //btn_result_03의 background와 align이 설정되지 않은 경우 
        * //아래의 styleValue 값으로 적용된다.
        * var styleValue = {background:"orange", align:"right middle"};
        * Eco.XComp.Style.setStyleIf(btn_result_03, styleValue, "" , this, false);
        *
		* @memberOf Eco.XComp.Style
		*/
		setStyleIf: function(xComp, styleValue, condition, scope, clearFlag)
		{
			if(condition === null || condition === undefined) condition = "";
			
			var pThis = Eco.XComp.Style;
			
			if (xComp && styleValue) 
			{
			
				if(Eco.isEmpty(clearFlag)) clearFlag = true;
				
				//적용할 style 구문 추출.
				if(clearFlag)
				{
					//기존 style값 clear
					var prevStyle = pThis.getStyle(xComp);
					for(var name in prevStyle)
					{
						if ( prevStyle.hasOwnProperty(name) )
						{
							//xComp[name] = "";
							if(name.substr(0,1) == "_") continue;
							xComp["style"]["set_" + name]("");
						}
					}
				}
			
				var value, ret,
					isFunc = false;
				
				if (condition && Eco.isFunction(condition))
				{
					isFunc = true;
				}
				
				var xCompStyle = xComp.style;
				for (var name in styleValue)
				{
					if(name.substr(0,1) == "_") continue;
					
					if (styleValue.hasOwnProperty(name))
					{
						value = styleValue[name];
						
						if (isFunc)
						{
							if(condition.call(scope, xComp, name, value))
							{
								xComp["style"]["set_" + name](value);
							}
						}
						//else if (xCompStyle[name].toString() == condition.toString())
						else if (condition == "" && Eco.isEmpty(xCompStyle[name]))
						{
							xComp["style"]["set_" + name](value);
						}						
						else if (xCompStyle[name] == condition)
						{
							xComp["style"]["set_" + name](value);
						}						
					}
				}
			}
		}
		
	});

}
