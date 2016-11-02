/**
 * @fileoverview Library 기본함수.
 */

if ( !JsNamespace.exist("Eco") )
{
	/**
	 * @namespace
	 * @name Eco
	 * @memberof! <global>
	 */	
	JsNamespace.declare("Eco", {

		/**
		 * value의 string 여부 반환
		 * @param {*} value 확인할 value.
		 * @return {boolean} string 여부.
		 * @example
		 * trace(Eco.isString("test string!!!"));	// output : true
		 * trace(Eco.isString(1234));	// output : false
		 * @memberOf Eco
		 */
		isString: function(value) 
		{
			return typeof value === 'string';
		},
				
		/**
		 * value의 number 여부 반환.
		 * @param {*} value 확인할 value.
		 * @return {boolean} number 여부.
		 * @example
		 * trace(Eco.isNumber(1234));	// output : true
		 * trace(Eco.isNumber("1234"));	// output : false		 
		 * @memberOf Eco
		 */		
		isNumber: function(value) {
            return typeof value === 'number' && isFinite(value);
        },		
        
		/**
		 * value의 boolean 여부 반환.
		 * @param {*} value 확인할 value.
		 * @return {boolean} boolean 여부.
		 * @example
		 * trace(Eco.isBoolean(true));	// output : true
		 * trace(Eco.isBoolean("true"));	// output : false		 
		 * @memberOf Eco
		 */
		isBoolean: function(value) 
		{
			return typeof value == 'boolean';
		},  
		      
		/**
		 * value의 null 여부 반환.
		 * @param {*} value 확인할 value.
		 * @return {boolean} null 여부.
		 * @example
		 * trace(Eco.isNull(null));	// output : true
		 * var a; // undefined
		 * trace(Eco.isNull(a));	// output : false		
		 * trace(Eco.isNull(""));	// output : false
		 * @memberOf Eco
		 */
		isNull: function(value)
		{
			return value === null;
		},
		
		/**
		 * value의 undefined 여부 반환.
		 * @param {*} value 확인할 value.		 
		 * @return {boolean} undefined 여부.
		 * @example
		 * var a;
		 * trace(Eco.isUndefined(a));	// output : true
		 *
		 * var a = "";
		 * trace(Eco.isUndefined(a));	// output : false
		 * @memberOf Eco
		 */
		isUndefined: function(value)
		{
			return value === undefined;
		},
		
		/**
		 * value의 Object 여부 반환.
		 * @param {*} value 확인할 value.
		 * @return {boolean} Object 여부.
		 * @example
		 * var o = new Object();
	     * trace(Eco.isObject(o));	// output : true
	     * 
	     * var o = {};
	     * trace(Eco.isObject(o));	// output : true
	     *
	     * var o = [1,2,3];
	     * trace(Eco.isObject(o));	// output : false
	     *
	     * var o = new Button();
	     * trace(Eco.isObject(o));	// output : false
	     *
	     * var o = new Rect();
	     * trace(Eco.isObject(o));	// output : false
	     *
		 * @memberOf Eco
		 */
		isObject: function(value)
		{
			if ( value === null || value === undefined ) return false;
			
			// nexacro Component
			if ( Eco.isXComponent(value) ) return false;
			
			// nexacro Object (e.g. Dataset)
			if( value instanceof nexacro.Object ) return false;
			
			return typeof value == "object" && 
				   'constructor' in value &&
				   value.constructor === Object;
		},			
		
		/**
		 * value의 Array 여부 반환.
		 * @function isArray
		 * @param {*} value 확인할 value.
		 * @return {boolean} Array 여부.
		 * @example
		 * var a = new Array();
		 * trace(Eco.isArray(a));	// output : true
		 *
		 * var a = [1,2,3];
		 * trace(Eco.isArray(a));	// output : true
		 * @memberOf Eco
		 */
		isArray: Array.isArray ? function(value) {
			return Array.isArray(value);
		} :
		function(value) 
		{
			return Eco._toString.call( value ) === '[object Array]';
		},
		/**
		 * value의 Error 객체 여부 반환.
		 * @param {*} value 확인할 value.
		 * @return {boolean} Error 객체 여부.
		 * @memberOf Eco
		 */
		isError: function(e)
		{
			return typeof e === 'object' &&
				(Eco._toString.call(e) === '[object Error]' || e instanceof Error);
		},
		_toString: (Object.prototype.toString),
		_hasOwnProperty: (Object.prototype.hasOwnProperty),
		_isIE8Below: (nexacro.Browser == "IE" && nexacro.BrowserVersion < 9),
		/**
		 * value의 Date 여부 반환.
		 * @param {date} value 확인할 value.
		 * @return {boolean} Date 여부.
		 * @example
		 * var a = new Date();
		 * trace(Eco.isDate(a));	// output : true
		 *
		 * var a = "20130501";
		 * trace(Eco.isDate(a));	// output : false 	 
		 * @memberOf Eco
		 */
		isDate: function(value) 
		{
			return Eco._toString.call( value ) === '[object Date]';
		},

		/**
		 * yyyyMMdd형태의 날짜 문자열 여부.( 예 : "20111231" ).
		 * @param {string} value 확인할 value.
		 * @return {boolean} Date 여부.
		 * @example
		 * var a = "20130501";
		 * trace(Eco.isStringDate(a));	// output : true 	 
		 * @memberOf Eco
		 */
		isStringDate: function(value) 
		{
			var stringWrapper = new String(value);
			
			if( stringWrapper.toString().length !== 8 ) return false;
			
			var iMonth  = Math.floor(stringWrapper.slice(4,6), 10);
			var iDate   = Math.floor(stringWrapper.slice(6,8), 10);
			
			if( iMonth < 1 || iMonth > 12 ) return false;
				
			if( iDate < 1 || iDate > Eco.date.getLastDayOfMonth(stringWrapper) ) return false;
			
			
			return true;
		},

		/**
		 * value의 Function 여부 반환.
		 * @param {*} value 확인할 value.
		 * @return {boolean} Function 여부.
		 * @example
		 * trace(Eco.isFunction(Eco.isFunction));	// output : true
		 *
		 * this.testFunction = function()
		 * {
		 * }
		 * trace(Eco.isFunction(this.testFunction));	// output : true
		 * @memberOf Eco
		 */
		isFunction: function(value)
		{
			return Eco._toString.call( value ) === '[object Function]';
		},

		/**
		 * value의 RegExp 여부 반환.
		 * @param {*} value 확인할 value.
		 * @return {boolean} 정규식 패턴 여부.
		 * @example
		 * var a = new RegExp();
		 * trace(Eco.isRegExp(a));	// output : true
		 * 
		 * var a = /[a-z]/g;
		 * trace(Eco.isRegExp(a));	// output : true		 
		 * @memberOf Eco
		 */
		isRegExp: function(value) 
		{
			return Eco._toString.call( value ) === '[object RegExp]';
		},		
		
		/**
		 * primitive type (undefined, null, boolean, string, number) 여부 반환.
		 * @param {*} value 확인할 value.
		 * @return {boolean} primitive type 여부.
		 * @memberOf Eco
		 */
		isPrimitive: function(value)
		{
			return value === null || /^[usbn]/.test(typeof value);
		},	
		
		/**
		 * value의 빈값 여부 반환.<br>
		 * 1. null, undefined type : true 반환<br>
		 * 2. string, array type : length 가 0인 경우 true 반환<br>
		 * 3. object type : 하위 속성이 존재할 경우 true 반환<br>
		 * 4. boolean, number, date type : false 반환
		 *
		 * @param {*} value 확인할 value.
		 * @return {boolean} empty 여부.
		 * @example
		 * var a;	// undefined
		 * trace(Eco.isEmpty(a));	// output : true
		 *
		 * var a = null;	// null
		 * trace(Eco.isEmpty(a));	// output : true
		 *
		 * var a = "";	// string
		 * trace(Eco.isEmpty(a));	// output : true
		 *
		 * var a = "abc";	// string
		 * trace(Eco.isEmpty(a));	// output : false
		 *
		 * var a = [];	// array
		 * trace(Eco.isEmpty(a));	// output : true
		 *
		 * var a = [1,2,3];	// array
		 * trace(Eco.isEmpty(a));	// output : false
		 *
		 * var a = new Array();	// array
		 * trace(Eco.isEmpty(a));	// output : true
		 *
		 * var a = new Array(3);	// array
		 * trace(Eco.isEmpty(a));	// output : false
		 *
		 * var a = {};	// object
		 * trace(Eco.isEmpty(a));	// output : true
		 *
		 * var a = {a:'1', b:'2'};	// object
		 * trace(Eco.isEmpty(a));	// output : false
		 *
		 * var a = new Object();	// object
		 * trace(Eco.isEmpty(a));	// output : true
		 *
		 * var a = new Object();	// object
		 * a.test = "abc";
		 * trace(Eco.isEmpty(a));	// output : false
		 *
		 * var a = true;	// boolean
		 * trace(Eco.isEmpty(a));	// output : false
		 *
		 * var a = 0;	// number
		 * trace(Eco.isEmpty(a));	// output : false
		 *
		 * var a = new Date();	// date
		 * trace(Eco.isEmpty(a));	// output : false
		 *
		 * @memberOf Eco
		 */
		isEmpty: function(value)
		{
			// null, undefined ==> true
			if ( value == null ) return true;
			
			// String, Array ==> length == 0
			if ( Eco.isString(value) || Eco.isArray(value) )
			{
				return value.length == 0 ? true : false;
			}
			else if ( Eco.isObject(value) )
			{
				for (var p in value) 
				{
					if ( value.hasOwnProperty(p) )
					{
						return false;
					}
				}
				return true;
			}
			
			return false;
		},
		
		/**
		 * value의 nexacro component 여부 반환.
		 * @param {*} value 확인할 value.
		 * @return {boolean} nexacro component 여부.
		 * @example
		 * var a = new Button();
		 * trace(Eco.isXComponent(a));	// output : true
		 *
		 * var a = new Dataset();
		 * trace(Eco.isXComponent(a));	// output : false
		 *
		 * var a = new String();
		 * trace(Eco.isXComponent(a));	// output : false
		 *
		 * @memberOf Eco
		 */
		isXComponent: function(value) 
		{
			if ( value === null || value === undefined  ) return false;
			
			return value instanceof nexacro.Component;
		},
		
		/**
		 * value의 Space 여부 반환.
		 * @param {*} value 확인할 value.
		 * @return {boolean} Space 여부.
		 * @example
		 * var a = " ";
		 * trace(Eco.isSpace(a));	// true
		 *
		 * var a = "\t";
		 * trace(Eco.isSpace(a));	// false		 
		 * @memberOf Eco
		 */
		isSpace: function(value) 
		{
			return value == ' ';
		},

		/**
		 * value의 복사본을 반환.
		 * @param {*} value 복사할 value.
		 * @param {boolean} deep Object type의 경우 하위 속성이 Object 일 경우 복사여부.
		 * @param {array=} clone 에서 제외 할 속성들 exclude property name을 array.
		 * @return {*} value의 복사본.
		 * @example
		 * Javascript에서 변수의 타입은 크게 기본형(primitive Type)과 참조형(reference type) 으로 나눌수 있다. 
		 * 기본형 변수는 실제 값을 저장하는 반면 참조형 변수는 값이 저장되어있는 주소를 갖는다.
		 * 
		 * ※ javascript에서 primitive type은 null, undefined, string, number, boolean 이며
		 *     나머지(Object를 상속받은 모든 객체)는 참조형이다.
		 *
		 * var a = "abc";
		 * var b = a;
		 * a = "";
		 *
		 * trace("[" + a + "]");	// output :  []
		 * trace("[" + b + "]");	// output :  [abc]
		 * 
		 * 위와 같이 기본형은 값을 가지므로 a, b 는 다른 값을 가지는 변수이다.
		 * 그러나 참조형은 주소를 가리키므로 아래 처럼 b 는 a 의 주소를 가르키므로 
		 * 같은 값을 가지게 된다.
		 *
		 * var a = {a:'aaa', b:123};
		 * var b = a;
		 *
		 * trace("[" + a.a + "," + a.b + "]");	// output :  [aaa,123]
		 * trace("[" + b.a + "," + b.b + "]");	// output :  [aaa,123]
		 *
		 * a.a = 'bbb';
		 * a.b = 456;
		 *
		 * trace("[" + a.a + "," + a.b + "]");	// output :  [bbb,456]
		 * trace("[" + b.a + "," + b.b + "]");	// output :  [bbb,456]
		 * 
		 * clone 함수는 참조형 변수도 값 자체를 복사하여 새로운 개체를 반환해준다.
		 *
		 * // Object
		 * var a = "abc";
		 * var b = Eco.clone(a);
		 *
		 * a = "";
		 *
		 * trace("[" + a + "]");	// output :  []
		 * trace("[" + b + "]");	// output :  [abc]
		 * 
		 * var a = {a:'aaa', b:123};
		 * var b = Eco.clone(a);
		 *
		 * trace("[" + a.a + "," + a.b + "]");	// output :  [aaa,123]
		 * trace("[" + b.a + "," + b.b + "]");	// output :  [aaa,123]		 
		 * 
		 * a.a = 'bbb';
		 * a.b = 456;
		 * 
		 * trace("[" + a.a + "," + a.b + "]");	// output :  [bbb,456]
		 * trace("[" + b.a + "," + b.b + "]");	// output :  [aaa,123]
		 *
		 * // Array
		 * var a = [1,2,3];
		 * var b = Eco.clone(a);
		 * 
		 * trace(a);	// output : [1,2,3]
		 * trace(b);	// output : [1,2,3]
		 * 
		 * a.push(4);
		 * 
		 * trace(a);	// output : [1,2,3,4]
		 * trace(b);	// output : [1,2,3]
		 *
		 * // Date
		 * var a = new Date();
		 * var b = Eco.clone(a);
		 * 
		 * trace(a);	// output : Tue May 07 2013 11:49:15 GMT+0900
		 * trace(b);	// output : Tue May 07 2013 11:49:15 GMT+0900
		 * 
		 * a.setYear(a.getYear() + 10);
		 * 	
		 * trace(a);	// output : Sun May 07 2023 11:49:15 GMT+0900
		 * trace(b);	// output : Tue May 07 2013 11:49:15 GMT+0900		 
		 *		 
		 * @memberOf Eco
		 */		
		clone: function(value, deep, exclude)
		{
			if ( Eco.isObject(value) || Eco.isArray(value) )
			{
				var objectClone,
					chkFunc = Eco.array.indexOf;
				if ( value.constructor == Array ) 
				{
					objectClone = [];
				}			
				else
				{
					objectClone = {};
				}
				
				for (var property in value) 
				{
					if ( value.hasOwnProperty(property) && (!exclude || chkFunc(exclude, property) == -1) )
					{
						if (!deep)
						{
							objectClone[property] = value[property]; 
						}
						else if (typeof value[property] == 'object') 
						{
							objectClone[property] = Eco.clone(value[property], deep, exclude); 
						}
						else 
						{
							objectClone[property] = value[property]; 
						}
					}
				}
				
				return objectClone;
			}
			else if ( Eco.isDate(value) )
			{
				var dateClone = new Date();
				dateClone.setTime(value.getTime());
				return dateClone;
			}
			else if ( Eco.isXComponent(value) )
			{
				trace("[Eco.clone] TO-DO==> clone if nexacro Component");
				return null;
			}
			else if ( Eco.isPrimitive(value) )
			{
				return value;
			}
			else if ( value && ( typeof value.clone == "function" ) )
			{
				return value.clone();
			}
			else if ( value && value._className && value._className.length )
			{
				var clone = new value.constructor();
				var values = value.getPropertiesValues(),
					val,
					resetValues = {};
				for (var i in values)
				{
					if ( (exclude == null ||
						Eco.array.indexOf(exclude, i) < 0))
					{
						val = values[i];
						if (deep)
						{
							resetValues[i] = Eco.clone(val, deep, exclude);
						}
						else
						{
							resetValues[i] = val;
						}
					}
				}
				clone.setProperties(resetValues);
				return clone;
			}
			else
			{
				return null;
			}
		},
	
		/**
		 * 첫 값의 True/False를 검사해 그 결과에 따라 두번째 또는 세번째 값을 반환.
		 * @param {*} expr 비교할 값. expr의 값으로 True/False 여부를 확인합니다.
		 *                 expr이 Integer인경우 0이면 False아니면 True인식합니다.
		 * @param {*} trueValue expr이 True에 해당하는 값일 경우 Return 되는 값.
		 * @param {*} falseValue expr이 False에 해당하는 값일 경우 Return 되는 값.
		 * @return {*} expr에 따라 Return 된 값.
		 * @example
		 *
		 * trace(Eco.iif(2-1=1, "True", "False")); // output : True
		 *
		 * var a = 98;
		 * var b = Eco.iif(a > 100, 100, a);
		 * trace(b);	// output : 98
		 *
		 * @memberOf Eco
		 */	
		iif: function(expr, trueValue, falseValue) 
		{
			return expr ? trueValue : falseValue;
		},
		
		/**
		 * 입력된 값 또는 수식을 검사해 적당한 값을 반환.<br>
		 * decoce(비교값, CASE1, 결과값1 [, CASE2, 결과값2, ... ], 디폴트 값);<br>
		 * 표현식의 값이 기준값1이면 값1을 출력하고, 기준값2이면 값2를 출력한다.<br>
		 * 그리고 기준값이 없으면 디폴트 값을 출력한다.<br>
		 * @param {*} * 1. 비교값
		 * @param {*} * 2. CASE
		 * @param {*} * 3. 결과값 (2,3 반복)
		 * @param {*=} * (2,3 반복)
		 * @param {*=} * 4.디폴트값
		 * @return {*} decode에 의해서 선택된 값.
		 * @example
		 * trace(Eco.decode("1", "1", "One", "2", "Two", "Default")); // output : One;
		 * 
		 * trace(Eco.decode(100, 1, "일", 10, "십", 100, "백"));	// output : 백
		 *
		 * @memberOf Eco
		 */		 
		decode: function() 
		{
			var i;
			var count = arguments.length;
			for( i = 1 ; i < count ; i+=2 )
			{
				if( arguments[0] === arguments[i] )
				{
					return arguments[i+1];
				}
			}
			
			return arguments[i-2];
		},
		
		/**
		 * alphabet character code.
		 * charvalue값 => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, a, b, c, d, e, f]
		 * @private
		 * @constant
		 * @memberOf Eco
		 */
		_ALPHA_CHAR_CODES: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102],

		/**
		 * 유일한 ID 를 반환
		 * @public
		 * @param {string=} prefix id 앞에 붙일 문자열
		 * @param {string=} separator id 생성시 구분용 문자(default: '-' ).
		 * @return {string} id
		 * @example
		 *
		 * trace(Eco.getUniqueId()); 
		 * // output : 3e52d1f6-f0d2-4970-a590-ba7656b07859
		 * 
		 * trace(Eco.getUniqueId("Button_")); 
		 * // output : Button_4e601da1-63f4-4cfa-849b-01b8a7f14d40
		 * 
		 * trace(Eco.getUniqueId("", "_")); 
		 * // output : 4e601da1_63f4_4cfa_849b_01b8a7f14d40
		 * 
		 * trace(Eco.getUniqueId("Button_", "_")); 
		 * // output : Button_4e601da1_63f4_4cfa_849b_01b8a7f14d40
		 * 
		 * @memberOf Eco
		 */
		getUniqueId: function(prefix, separator)
		{
			if ( Eco.isEmpty(prefix) ) prefix = "";
			if ( Eco.isEmpty(separator) ) {
				separator = 45;
			} else {
				separator = separator.charCodeAt(0);
			}
			
			var pThis = Eco,
				charcode = pThis._ALPHA_CHAR_CODES,
				math = Math;
			var seq = 0;
			var seq0;
			var tmpArray = new Array(36);
			var idx = -1;
			
			while (seq < 8) 
			{
				tmpArray[++idx] = charcode[math.random() * 16 | 0];
				seq++;
			}
			seq = 0;
			while (seq < 3) 
			{
				tmpArray[++idx] = separator;//45 => "-", 95=> "_"
				seq0 = 0;
				while (seq0 < 4) 
				{
					tmpArray[++idx] = charcode[math.random() * 16  | 0];
					seq0++;
				}
				seq++;
			}
			tmpArray[++idx] = separator; //45 => "-", 95=> "_"
			// 끝에서 12자리을 random으로 처리하면 속도가 좀더 개선됨(10만건 생성 약 0.8초 ==> chrome)
			/*
			seq = 0;
			while (seq < 12) 
			{
				tmpArray[++idx] = charcode[math.random() * 16 | 0];
				seq++;
			}
			return prefix + String.fromCharCode.apply(null, tmpArray);
			*/
			// 원래 로직은 끝에서 12자리을 현재 time 구한 8자리 와 random 4자리를 조합한 처리임.(10만건 생성 약 1.3초 ==> chrome)
			/**/
			var tmpStr = (new Date()).getTime();
			tmpStr = ("0000000" + tmpStr.toString(16)).substr(-8);
			seq = 0;
			while (seq < 8) 
			{
				tmpArray[++idx] = tmpStr.charCodeAt(seq);
				seq++;
			}
			seq = 0;
			while (seq < 4) 
			{
				tmpArray[++idx] = charcode[math.random() * 16 | 0];
				seq++;
			}
			return prefix + String.fromCharCode.apply(null, tmpArray);
			
		},
		
		/**
		 * Form 내에서 지정된 접두문자열에 순번이 붙여진 ID 를 반환
		 * @public
		 * @param {form} prefix 순번 앞에 붙일 문자열
		 * @param {string} prefix 순번 앞에 붙일 문자열
		 * @return {string} id
		 * @example
		 *
		 * // this = Form
		 * trace(Eco.getSequenceId(this, "Button")); // output : Button0
		 * trace(Eco.getSequenceId(this, "Button")); // output : Button1
		 * 
		 * // this = Form
		 * trace(Eco.getSequenceId(this, "chk_")); // output : chk_0
		 * trace(Eco.getSequenceId(this, "chk_")); // output : chk_1
		 * 
		 * @memberOf Eco
		 */		
		getSequenceId: function(form, prefix)
		{
			if ( Eco.isEmpty(form) ) 
			{
				Eco.Logger.error({message:"1st argument doesn't exist !!", stack:true});
				return null;
			}
			
			if ( Eco.isEmpty(prefix) ) 
			{
				Eco.Logger.error({message:"2nd argument doesn't exist !!", stack:true});
				return null;
			}
			
			if ( !(form instanceof Form) ) 
			{				
				Eco.Logger.error({message:"1st argument must be a Form !!", stack:true});
				return null;
			}
			
			var cache = form._sequenceIdCache;
			if ( Eco.isEmpty(cache) )
			{
				cache = form._sequenceIdCache = {};
			}
			
			var sequence = cache[prefix];
			if ( Eco.isEmpty(sequence) )
			{
				sequence = -1;
			}
			sequence++;
			
			cache[prefix] = sequence;
			
			return prefix + sequence;
		},
		/**
		 * 주어진 두개의 object들의 properties 가 동일 하지 check한다.
		 * Eco.equals 함수에 사용된다.
		 * @private
		 * @param {object} o1 비교할 object
		 * @param {object} o2 비교할 object
		 * @return {boolean} 동일하면 true, 아니면 false
		 * @memberOf Eco
		 */	
		"_checkKeys": function(o1, o2)
		{
			for (var i in o1)
			{
				if (o1.hasOwnProperty(i) && typeof o2[i] === 'undefined')
				{
					return false;
				}
			}
			return true;
		},
		/**
		 * 주어진 두개의 인자에 대하여 동일한 값인지 확인한다.
		 * @public
		 * @param {*} obj1 비교하고자 하는 인자
		 * @param {*} obj2 비교하고자 하는 인자
		 * @return {boolean} 동일하면 true, 아니면 false
		 * @example
		 * // this = Form
		 * var a = {"id1": "apple","id": "kiwi",  "test": [1, 2], "a": Button00};
		 * var b = {"id": "kiwi", "id1": "apple", "test": [1, 2], "a": this};
		 * trace(Eco.equals(a, b)); // output : false
		 * 
		 * var a = {"id1": "apple","id": "kiwi",  "test": [1, 2], "a": Button00};
		 * var b = {"id": "kiwi", "id1": "apple", "test": [1, 2], "a": Button00};
		 * trace(Eco.equals(a, b)); // output : true
		 * 
		 * @memberOf Eco
		 */	
		"equals": function(obj1, obj2)
		{
			if (obj1 === obj2)
			{
				return true;
			}
			if ( Eco.isBoolean(obj1) && obj2 == null )
			{
				obj2 = !!obj2;
				return obj1 == obj12;
			}
			if ( Eco.isBoolean(obj2) && obj1 == null )
			{
				obj1 = !!obj1;
				return obj1 == obj12;
			}
			if ( obj1 && obj2 )
			{
				if ( obj1.equals )
				{
					return obj1.equals(obj2);
				}
				if ( obj2.equals )
				{
					return obj2.equals(obj1);
				}
			}
			if (Eco.isDate(obj1) && Eco.isDate(obj2))
			{
				if ( obj1.getTime() == obj2.getTime() )
				{
					return true;
				}
				return false;
			}
			if (Eco.isArray(obj1) && Eco.isArray(obj2))
			{
				if (obj1.length !== obj2.length)
				{
					return false;
				}
				for (var i = 0, l = obj1.length; i < l; i++)
				{
					if (!Eco.equals(obj1[i], obj2[i]))
						return false;
				}
				return true;
			}
			if (obj1 && (typeof obj1 === 'object') && obj1.hasOwnProperty
					&& obj2 && (typeof obj2 === 'object') && obj2.hasOwnProperty )
			{
				if (!Eco._checkKeys(obj1, obj2) || !Eco._checkKeys(obj2, obj1))
				{
					return false;
				}
				for (var i in obj1)
				{
					if (obj1.hasOwnProperty(i) && !Eco.equals(obj1[i], obj2[i]))
					{
						return false;
					}
				}
				return true;
			}
			return obj1 == obj2;
		}
		// End of JsNamespace.declare
	});
	
}
