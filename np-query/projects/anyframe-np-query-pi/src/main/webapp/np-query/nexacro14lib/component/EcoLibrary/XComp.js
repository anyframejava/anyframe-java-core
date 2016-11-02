/**
 * @fileoverview nexacro Components 관련 기본함수.
 */

if ( !JsNamespace.exist("Eco.XComp") )
{
	/**
	 * @namespace
	 * @name Eco.XComp
     * @memberof! <global>
	 */
	JsNamespace.declare("Eco.XComp", {
		
		/**
		 * 연산자 함수 목록
		 * @private
		 * @memberOf Eco.XComp
		 */
		_operators: {
			// ==
			"equal" : function(a, v){
				if (Eco.isEmpty(v))
				{
					return Eco.isEmpty(a);
				}
				
				return a == v;
			},
			// !=
			"notEqual" : function(a, v){
				return a != v;
			},
			// >
			"greaterThan" : function(a, v){
				return a > v;
			},
			// >=
			"greaterThanEqual" : function(a, v){
				return a >= v;
			},	
			// <
			"lessThan" : function(a, v){
				return a < v;
			},
			// <=
			"lessThanEqual" : function(a, v){
				return a <= v;
			},		
			// *=
			"contains" : function(a, v){
				return a && a.indexOf(v) > -1;
			},	
			// ^=
			"startWith" : function(a, v){
				return a && a.substr(0, v.length) == v;
			},
			// $=
			"endWith" : function(a, v){
				return a && a.substr(a.length-v.length) == v;
			}
		},
		
		/**
		 * 주어진 nexacro 개체의 type 을 반환
		 * @public
		 * @param {*} obj Object, Component, Frame, .. 등 nexacro 모든 개체
		 * @return {string} 개체의 type
		 * @example
		 * trace(Eco.XComp.typeOf(Button00));	// output : Button
		 * trace(Eco.XComp.typeOf(Tab00));	// output : Tab
		 * trace(Eco.XComp.typeOf(Tab00.tabpage1));	// output : Tabpage
		 * trace(Eco.XComp.typeOf(Dataset00));	// output : Dataset
		 * trace(Eco.XComp.typeOf(PropertyAnimation00));	// output : PropertyAnimation
		 *
		 * var o;
		 * o = new Buffer;
		 * trace(Eco.XComp.typeOf(o));	// output : Buffer
		 *
		 * o = new DomDocument;
		 * trace(Eco.XComp.typeOf(o));	// output : DomDocument
		 *
		 * o = new Rect;
		 * trace(Eco.XComp.typeOf(o));	// output : Rect
		 *
		 * o = new FileDialog;
		 * trace(Eco.XComp.typeOf(o));	// output : FileDialog
		 *
		 * o = new UserEvent;
		 * trace(Eco.XComp.typeOf(o));	// output : UserEvent
		 *
		 * // non XP Component/Object return undefined.
		 * o = {};
		 * trace(Eco.XComp.typeOf(o));	// output : undefined		 
		 *
		 * o = new Date();
		 * trace(Eco.XComp.typeOf(o));	// output : undefined
		 * @memberOf Eco.XComp
		 */
		typeOf: function(obj)
		{
			var type;
			if ( obj && (typeof obj == "object"))
			{
				var s = obj.toString();
				if(s == "[object Object]") return type;
				
				type = s.substr(8, s.length-9);
			}
			return type;
		},
		
		/**
		 * 주어진 컴포넌트가 실제 화면에 보여지는지 여부를 반환<br><br>
		 * 대상 컴포넌트의 상위컴포넌트(parent)의 visible 속성이 false 가<br> 
		 * 지정되어 화면에 대상 컴포넌트가 보이지 않더라도 대상 컴포넌트의<br> 
		 * visible 속성값은 지정된 값을 유지하고 있으므로 화면에 실제 <br>
		 * 보여지는지 여부를 판단하기 위해서는 본 메소드를 사용한다.
		 * @public
		 * @param {XComp} obj nexacro Component
		 * @return {string} 개체의 type
		 * @example
		 * Div00.Button00.visible = true;
		 * Div00.visible = false;	// 화면에 Button00 이 보이지 않는다.
		 * trace(Div00.Button00.visible);	// output : true
		 * trace(Eco.XComp.isVisible(Div00.Button00));	// output : false
		 * @memberOf Eco.XComp
		 */
		isVisible: function(obj)
		{
			if ( !("visible" in obj) ) return false;
			if ( obj.visible == false ) return false;
			
			var ret = true;
			var p = obj.parent;
			while ( p )
			{
				if ( p instanceof ChildFrame ) break;
				if ( p.visible === false ) 
				{
					ret = false;
					break;
				}
				
				p = p.parent;
			}
			return ret;
		},	
			
		/**
		 * 주어진 오브젝트가 Visual한 컴포넌트인지를 반환
		 * @public
		 * @param {XComp} obj nexacro Component
		 * @return {boolean} visual Component 여부
		 * @example
		 * trace(Eco.XComp.isVisual(Button00));	// output : true
		 * trace(Eco.XComp.isVisual(Dataset00));	// output : false
		 * @memberOf Eco.XComp
		 */
		isVisual: function(obj)
		{
			if ( !("currentstyle" in obj) ) return false;
			return true;
		},				
		
		/**
		 * 주어진 컴포넌트의 실제 활성화 여부를 반환<br><br>
		 * 대상 컴포넌트의 상위컴포넌트(parent)의 enable 속성이 false 가 <br>
		 * 지정되어 화면에 대상 컴포넌트가 비활성화 상태이어도 대상 컴포넌트의 <br>
		 * enable 속성값은 지정된 값을 유지하고 있으므로 실제 활성화 여부를 <br>
		 * 판단하기 위해서는 본 메소드를 사용한다.
		 * @public
		 * @param {XComp} obj nexacro Component
		 * @return {string} 개체의 type
		 * @example
		 * Div00.Button00.enable = true;
		 * Div00.enable = false;	// Button00 이 비활성화 된다.
		 * trace(Div00.Button00.enable);	// output : true
		 * trace(Eco.XComp.isEnable(Div00.Button00));	// output : false
		 * @memberOf Eco.XComp
		 */		
		isEnable: function(obj)
		{
			if ( !("enable" in obj) ) return false;
			if ( obj.enable == false ) return false;
			
			var ret = true;
			var p = obj.parent;
			while ( p )
			{
				if ( p instanceof ChildFrame ) break;
				if ( p.enable === false ) 
				{
					ret = false;
					break;
				}
				
				p = p.parent;
			}
			return ret;	
		},
		
		/**
		 * query 메소드의 where 조건 cache
		 * @private
		 * @memberOf Eco.XComp
		 */		
		_parseQueryCache: [],

		/**
		 * where 조건문의 token을 얻어온다.<br>
		 * thanks to Douglas Crockford. tokens.js (crockford.com)
		 * @private
		 * @param {string} str where 문자열
		 * @return {array} type, value 를 가지는 token collecion
		 * @memberOf Eco.XComp
		 */
		_tokenizeQueryWhere: function(str)
		{
			var c;				// The current character.
			var i = 0;			// The index of the current character.	
			var s;				// The string value.
			var n;				// The number value.
			var q;				// The quote character.
			
			var result = [];	// An array to hold the results.
			
			var prefix = '<>&|=*^$!';
			var suffix = '=>&|';
			
			var length = str.length;
			
			c = str.charAt(i);
			
			while (c) 
			{
				// Ignore whitespace.
				if (c <= ' ') 
				{
					i += 1;
					c = str.charAt(i);
				}
				// named or boolean
				else if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c == '_') 
				{
					s = c;
					i += 1;
					for (;;) 
					{
						c = str.charAt(i);
						if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') ||
								(c >= '0' && c <= '9') || c === '_') {
							s += c;
							i += 1;
						} else {
							break;
						}
					}
					
					if ( s == 'true' || s == 'false' )
					{
						result.push({type:'boolean', value:s});
					}
					else
					{
						result.push({type:'named', value:s});
					}
				} 
				// number.
				// A number cannot start with a decimal point. It must start with a digit,
				// possibly '0'.
				else if (c >= '0' && c <= '9') {
					s = c;
					i += 1;
					// Look for more digits.
					for (;;) 
					{
						c = str.charAt(i);
						if (c < '0' || c > '9') {
							break;
						}
						i += 1;
						s += c;
					}
					// Look for a decimal fraction part.
					if (c === '.') {
						i += 1;
						s += c;
						for (;;) 
						{
							c = str.charAt(i);
							if (c < '0' || c > '9') {
								break;
							}
							i += 1;
							s += c;
						}
					}
					// Look for an exponent part.
					if (c === 'e' || c === 'E') {
						i += 1;
						s += c;
						c = str.charAt(i);
						if (c === '-' || c === '+') {
							i += 1;
							s += c;
							c = str.charAt(i);
						}
						if (c < '0' || c > '9') {
							trace("Bad exponent");
						}
						do {
							i += 1;
							s += c;
							c = str.charAt(i);
						} while (c >= '0' && c <= '9');
					}
					// Make sure the next character is not a letter.
					if (c >= 'a' && c <= 'z') 
					{
						s += c;
						i += 1;                
						trace("Bad number");
					}
					// Convert the string value to a number. If it is finite, then it is a good
					// token.
					n = +s;
					if (isFinite(n)) 
					{
						result.push({type:'number', value:n});
					}
					else 
					{
						trace("Bad number");
					}
				}
				// string
				else if (c === '\'' || c === '"') {
					s = '';
					q = c;
					i += 1;
					for (;;) 
					{
						c = str.charAt(i);
						if (c < ' ') {
							if (c === '\n' || c === '\r' || c === '')
							{
								trace("Unterminated string.");
							}
							else
							{
								trace("Control character in string.");
							}
						}

						// Look for the closing quote.
						if (c === q) 
						{
							break;
						}

						// Look for escapement.
						if (c === '\\') {
							i += 1;
							if (i >= length) 
							{
							   trace("Unterminated string");
							}
							c = str.charAt(i);
							switch (c) {
							case 'b':
								c = '\b';
								break;
							case 'f':
								c = '\f';
								break;
							case 'n':
								c = '\n';
								break;
							case 'r':
								c = '\r';
								break;
							case 't':
								c = '\t';
								break;
							case 'u':
								if (i >= length) 
								{
									trace("Unterminated string");
								}
								c = parseInt(str.substr(i + 1, 4), 16);
								if (!isFinite(c) || c < 0) {
									trace("Unterminated string");
								}
								c = String.fromCharCode(c);
								i += 4;
								break;
							}
						}
						s += c;
						i += 1;
					}
					i += 1;
					result.push({type:'string', value:s});
					c = str.charAt(i);
				} 
				// comment. (not use)
				else if (c === '/' && str.charAt(i + 1) === '/') 
				{
					i += 1;
					for (;;) 
					{
						c = str.charAt(i);
						if (c === '\n' || c === '\r' || c === '') {
							break;
						}
						i += 1;
					}
				} 
				// combining
				else if (prefix.indexOf(c) >= 0) 
				{
					s = c;
					i += 1;
					while (true) 
					{
						c = str.charAt(i);
						if (i >= length || suffix.indexOf(c) < 0) 
						{
							break;
						}
						s += c;
						i += 1;
					}
					result.push({type:'operator', value:s});
				} 
				// single-character operator
				else 
				{
					if ( "()[]".indexOf(c) > -1 )
					{
						result.push({type:'bracket', value:c});
					}
					else
					{
						result.push({type:'operator', value:c});
					}
					
					i += 1;            
					c = str.charAt(i);
				}	
			}
			return result;
		},

		/**
		 * where 조건문을 파싱하여 실행 함수를 반환
		 * @private
		 * @param {string} where where 문자열
		 * @return {function} where 조건 실행 함수
		 * @memberOf Eco.XComp
		 */
		_parseQueryWhere: function(where)
		{
			var pThis = Eco.XComp;
			var cache = pThis._parseQueryCache[where];
			
			if ( cache )
			{
				return cache;
			}
			
			var token, type, value, temp;
			var tokens = pThis._tokenizeQueryWhere(where);
			
			var depth = 0, maxDepth=0;
			var syntax = [];
			
			for (var i=0,len=tokens.length; i<len; i++)
			{
				token = tokens[i];
				type = token.type;
				value = token.value;
				//trace(type + " : " + value);
				if ( type == "bracket" )
				{
					if ( value == "(" )
					{
						syntax.push({depth:depth, type:"value", value:"("});
						depth += 1;
						maxDepth = depth;
					}
					else if ( value == ")" )
					{
						depth -= 1;
						syntax.push({depth:depth, type:"value", value:")"});						
					}
				}
				else if ( type == "named" )
				{			
					if ( value == "prop" || value == "curStyle" || value == "style" )
					{
						
						i += 1;
						token = tokens[i];
						
						
						if ( token.type == "bracket" && token.value == "[" )
						{
							i += 1;
							token = tokens[i];
							syntax.push({depth:depth, type:"operand", value:"Eco.XComp._getQueryCompValue(obj, \""+value+"\", \""+token.value+"\")"});
						}
						i += 1;
					}
					else if ( value == "typeOf" || value == "isVisible" || value == "isVisual" || value == "isEnable" )
					{
						syntax.push({depth:depth, type:"operand", value:"Eco.XComp."+value+"(obj)"});
					}
				}
				else if ( type == "operator" )
				{
					if ( value == "&&" || value == "||" )
					{
						syntax.push({depth:depth, type:"operator", value:value});
					}
					else
					{
						temp = "";
						switch (value)
						{
							case '==' :
								temp = "equal";
								break;
							case '!=' :
								temp = "notEqual";
								break;
							case '>' :
								temp = "greaterThan";
								break;
							case '>=' :
								temp = "greaterThanEqual";
								break;
							case '<' :
								temp = "lessThan";
								break;
							case '<=' :
								temp = "lessThanEqual";
								break;
							case '*=' :
								temp = "contains";
								break;	
							case '^=' :
								temp = "startWith";
								break;	
							case '$=' :
								temp = "endWith";
								break;																																				
						}
						syntax.push({depth:depth, type:"replaceOperator", value:"Eco.XComp._operators."+temp+"($1, $2)"});
					}
				} 		
				else if ( type == "string" )
				{
					syntax.push({depth:depth, type:"operand", value:"\""+value+"\""});
				}
				else if ( type == "number" || type == "boolean" )
				{		
					syntax.push({depth:depth, type:"operand", value:value});
				}
			}

			var s, s0, s1;
			for (var i=maxDepth; i>=0; i--)
			{
				pThis._replaceOperator(i, syntax);
			}
			
			var result = [];
			for (var i=0,len=syntax.length; i<len ;i++)
			{
				s = syntax[i];
				result.push(syntax[i].value);
			}
			
			var fn = "var f = function(obj) {\n	return " + result.join(" ") + ";\n}";

			try 
			{
				eval(fn);
			}
			catch(e)
			{
				trace("eval error:"+e.description);
			}
						
			pThis._parseQueryCache[where] = f;
			
			return f;
		},
		
		/**
		 * where 조건문의 연산자에 피연산자를 대입한다.
		 * @private
		 * @param {number} depth 우선순위 깊이
		 * @param {number} syntax 변환 대상 토큰
		 * @memberOf Eco.XComp
		 */		
		_replaceOperator: function(depth, syntax)
		{
			var s;
			for (var i=0,len=syntax.length; i<len; i++)
			{
				s = syntax[i];
				if ( s.depth == depth )
				{
					if ( s.type == "replaceOperator" )
					{
						s0 = syntax[i-1];
						s1 = syntax[i+1];
						
						if ( s0 && s0.depth == depth && s0.type == "operand" && 
						     s1 && s1.depth == depth && s1.type == "operand" )
						{
							temp = s.value;
							temp = temp.replace("$1", s0.value);
							temp = temp.replace("$2", s1.value);

							s.depth = s.depth-1;
							s.type = "operand";
							s.value = temp;
							
							s0.depth = null;
							s1.depth = null;
							
							i += 1;
						}
					}
				}
			}
			
			for (var i=(syntax.length-1); i>=0; i--)
			{
				s = syntax[i];
 				if ( s.depth == null )
 				{
 					syntax.splice(i,1);
 					i--;
 				}
			}
		},
		
		/**
		 * component의 property, currentstyle, style 에서 특정 name에 해당하는 값을 얻어온다.
		 * @private
		 * @param {nexacro Component} obj where 문자열
		 * @param {string} type 검색 대상 (property, currentstyle, style)
		 * @param {string} name property, currentstyle, style 에서 찾을 명칭
		 * @return {string} name에 해당하는 값
		 * @memberOf Eco.XComp
		 */		
		_getQueryCompValue: function(obj, type, name)
		{
			var ret;
			if ( type == "prop" ) 
			{
				ret = obj[name];
			} 
			else if ( type == "curStyle" )
			{
				ret = obj.currentstyle[name];
			}
			else if ( type == "style" )
			{
				ret = obj.style[name];
			}		
			
			if ( ret && typeof ret == "object" ) 
			{
				if ( ret.toString ) 
				{
					ret = ret.toString();
				}
				else
				{
					ret = ret + "";
				}
				ret = ret.trim();
			}
			
			return ret;
		},
		
		/**
		 * 주어진 component에 포함된 모든 하위 component, object 반환
		 * @private
		 * @param {nexacro Component} c 대상 component
		 * @return {array} 하위 component, object
		 * @memberOf Eco.XComp
		 */
		_getAll: function(c)
		{
			var children = [];
			var cs = c.all;
			if ( cs )
			{
				for (var i=0,len=cs.length; i<len; i++)
				{
					children.push(cs[i]);
				}
			}
			else 
			{
				cs = c.objects;
				if ( cs )
				{
					for (var i=0,len=cs.length; i<len; i++)
					{
						children.push(cs[i]);
					}				
				}
				
				cs = c.components;
				if ( cs )
				{
					for (var i=0,len=cs.length; i<len; i++)
					{
						children.push(cs[i]);
					}				
				}
			}	
			return children;
		},
		
		/**
		 * 주어진 component의 depth에 포함된 하위 component, object 반환 (recursive)<br>
		 * from이 container가 아닐 경우 undefind 반환
		 * @private
		 * @param {XComp} from 대상 container component
		 * @param {object} depth max, current depth
		 * @return {array} 하위 component, object
		 * @memberOf Eco.XComp
		 */		
		_getChildren: function(from, depth)
		{
			var pThis = Eco.XComp;
			var children = pThis._getAll(from);
			var results = [], c, cs0, recvCs;
			
			depth.current += 1;
			
			for (var i=0,len=children.length; i<len; i++)
			{
				c = children[i];

				cs0 = pThis._getAll(c);
				
				if ( cs0 && cs0.length > 0 && depth.max >= depth.current )
				{
					//trace(" _getChildren > c="+c);
					results.push(c);
					recvCs = pThis._getChildren(c, depth);
					results = results.concat(recvCs);
					depth.current -= 1;
				}
				else
				{	
					results.push(c);
				}
			}
			
			return results;
		},
		
		/**
		 * 주어진 nexacro Component 에 포함되고 조건에 맞는 component, object 반환<br><br>
		 * 1. where 조건문에 지원하는 예약어 피연산자(operand) 는 다음과 같다.<br>
		 *  - prop[property_name] : property 중 name 에 해당하는 값을 의미<br>
		 *  - curStyle[currentstyle_name] : currentstyle 중 name 에 해당하는 값(문자열)을 의미<br>
		 *  - style[style_name] : style 중 name 에 해당하는 값을 의미<br>
		 *  - typeOf : XP Component type을 의미<br>
		 *  - isVisible : XP Component의 실제 visible 여부<br>
		 *  - isVisual : 주어진 오브젝트가 Visual한 컴포넌트인지 여부<br>
		 *  - isEnable : XP Component의 실제 enable 여부<br><br>
		 * ※ isVisible는 실제 컴포넌트가 화면에 보여지는 여부를 체크하게 된다.<br>
		 *    prop[visible] == true 형식으로 사용하면 대상 컴포넌트의 value property 값이 true 인지를 체크한다.<br>
		 *    대상 컴포넌트의 상위컴포넌트(parent)의 visible 속성이 false 가 지정되어 화면에 대상 컴포넌트가<br>
		 *    보이지 않더라도 대상 컴포넌트의 visible 속성값은 자신이 지정된 값을 유지하고 있으므로 반드시<br>
		 *    false 가 나오지 않는다. (같은 이유로 isEnable 로 실제 활성화 되어있는지를 체크해야 한다.)<br><br>
		 * 2. where 조건문에 지원하는 연산자(operator) 는 다음과 같다.<br>
		 *  - A && B : A 와 B 가 모두 참이면 참<br>
		 *  - A || B : A 와 B 가 모두 거짓이면 거짓<br>
		 *  - A == B : A 와 B 는 같다.<br>
		 *  - A != B : A 와 B 는 같지 않다.<br>
		 *  - A > B : A 는 B 보다 크다.<br>
		 *  - A >= B : A 는 B 보다 크거나 같다.<br>
		 *  - A < B : A 는 B 보다 작다.<br>
		 *  - A <= B : A 는 B 보다 작거나 같다.<br>
		 *  - 'b' *= 'abc' : 'abc' 에 'b' 가 포함되어 있다. (like)<br>
		 *  - 'a' ^= 'abc' : 'abc' 는 'a' 로 시작한다. (startWith)<br>
		 *  - 'c' $= 'abc' : 'abc' 는 'c' 로 끝난다. (endWith)
		 * @public
		 * @param {*} obj Object, Component, Frame, .. 등 nexacro 모든 개체
		 * @param {string=} where 찾을 조건문
		 * @param {number=} depth 하위 레벨 깊이 (default: 제한없음)
		 * @return {array} 검색된 component, object
		 * @example
		 * 
		 * Form(Form00) 에 아래와 같은 구조가 존재 할 경우
		 *
		 * |----------------------------------------------------------------------------|
		 * | Div00 (depth:0)                                                            |
		 * |                                                                            |
		 * |    ------------                                                            |
		 * |    | Button00 |                                                            |
		 * |    ------------                                                            |
		 * |                                                                            |
		 * |    |-------------------------------------------------------------------|   |
		 * |    | Div01 (depth:1)                                                   |   |
		 * |    |                                                                   |   |
		 * |    |   ------------                                                    |   |
		 * |    |   | Button01 |                                                    |   |
		 * |    |   ------------                                                    |   |
		 * |    |                                                                   |   |
		 * |    |   |-----------------------------------------------------------|   |   |
		 * |    |   | Tab00 (depth:2)                                           |   |   |
		 * |    |   |                                                           |   |   |
		 * |    |   |   |-----------------------|   |-----------------------|   |   |   |
		 * |    |   |   | Tabpage1 (depth:3)    |   | Tabpage2 (depth:3)    |   |   |   |
		 * |    |   |   |                       |   |                       |   |   |   |
		 * |    |   |   |   ------------        |   |   ------------        |   |   |   |
		 * |    |   |   |   | Button02 |        |   |   | Button03 |        |   |   |   |
		 * |    |   |   |   ------------        |   |   ------------        |   |   |   |
		 * |    |   |   |                       |   |                       |   |   |   |
		 * |    |   |   |-----------------------|   |-----------------------|   |   |   |
		 * |    |   |                                                           |   |   |
		 * |    |   |-----------------------------------------------------------|   |   |
		 * |    |                                                                   |   |
		 * |    |-------------------------------------------------------------------|   |
		 * |                                                                            |
		 * |----------------------------------------------------------------------------|
		 *
		 * // from이 Form00 이고 depth 를 지정하지 않은 경우 Form00 에 포함된 모든 하위요소 검색
		 * trace(Eco.XComp.query(Form00, ""));
		 * // output : [object Div],[object Button],[object Div],[object Button],[object Tab],
		 *             [object Tabpage],[object Button],[object Tabpage],[object Button]
		 *
		 * // from이 Div00 이고 depth 를 지정하지 않은 경우 Div00 에 포함된 모든 하위요소 검색
		 * trace(Eco.XComp.query(Div00, ""));
         * // output : [object Button],[object Div],[object Button],[object Tab],
         *             [object Tabpage],[object Button],[object Tabpage],[object Button]
		 *
		 * // from이 Div00 이고 depth가 0 인 경우 Div00 에 포함된 요소까지 검색
		 * trace(Eco.XComp.query(Div00, "", 0));
         * // output : [object Button],[object Div]
		 *
		 * // from이 Div00 이고 depth가 1 인 경우 Div01 에 포함된 요소까지 검색
		 * trace(Eco.XComp.query(Div00, "", 1));
         * // output : [object Button],[object Div],[object Button],[object Tab]
		 *
		 * // from이 Div00 이고 depth가 2 인 경우 Tab00 에 포함된 요소까지 검색
		 * trace(Eco.XComp.query(Div00, "", 2));
         * // output : [object Button],[object Div],[object Button],[object Tab],
         *             [object Tabpage],[object Tabpage]
         *
		 * // Div00 에 하위로 포함된 모든 Button 검색
		 * trace(Eco.XComp.query(Div00, "typeOf == 'Button'"));
         * // output : [object Button],[object Button],[object Button],[object Button]
         * 
		 * // Div00 에 하위로 포함된 모든 Button, Div 검색
		 * trace(Eco.XComp.query(Div00, "typeOf == 'Button' || typeOf == 'Div'"));
         * // output : [object Button],[object Div],[object Button],[object Button],[object Button]
         * 
		 * // Div00 에 포함된 모든 하위요소중 property visible 값이 true 인 요소 검색
		 * // Div01에 포함된 Tab 과 Button이 보이지 않지만 visible 속성값은 true 임
		 * // 실제 visible 한 요소만 찾을 경우 isVisible 을 사용
		 * Div00.Div01.visible = false;
		 * trace(Eco.XComp.query(Div00, "prop[visible] == true"));
         * // output : [object Button],[object Button],[object Tab],[object Button],[object Button]
         * 
		 * // Div00 에 포함된 모든 하위요소중 property text 값이 "Button02" 인 요소 검색
		 * trace(Eco.XComp.query(Div00, "prop[text] == 'Button02'"));
         * // output : [object Button]
         *
		 * // Div00 에 포함된 모든 하위요소중 currentstyle align 값이 "center middle" 인 요소 검색
		 * // (currentstyle은 현재 적용되고 있는 style object를 얻어오는 property 임)
		 * Div00.Div01.Button01.style.align = "left bottom";
		 * trace(Eco.XComp.query(Div00, "curStyle[align] == 'center middle'"));
         * // output : [object Button],[object Div],[object Tab],[object Button],[object Button]
         *
		 * // Div00 에 포함된 모든 하위요소중 style align 값이 "left top" 인 요소 검색
		 * // 화면디자인시 적용된 style 의 특정 값을 얻어온다.
		 * trace(Eco.XComp.query(Div00, "style[align] == 'left top'"));
         * // output : [object Button]
         * 
		 * // Div00 에 포함된 모든 하위요소중 화면에 보이는 요소 검색
		 * // prop[value] == true 는 실제 보이는 요소가 아니어도 속성값이 true이면 검색됨.
		 * Div00.Div01.visible = false;	
		 * trace(Eco.XComp.query(Div00, "isVisible == true"));
         * // output : [object Button]
         *
         * // Div00 에 Dataset과 Button이 포함됐을 경우 하위요소중 visual한 컴포넌트만 검색
         * trace(Eco.XComp.query(Div00, "isVisual == true", 0));
         * // output : [object Button]
         *
		 * // Div00 에 포함된 모든 하위요소중 활성화된 요소 검색
		 * // prop[enable] == true 는 실제 활성화된 요소가 아니어도 속성값이 true이면 검색됨.
		 * Div00.Div01.enable = false;	
		 * trace(Eco.XComp.query(Div00, "isEnable == true"));
         * // output : [object Button]
         * 
         * // Div00 에 포함된 모든 하위요소중 property name에 'ab' 이 포함된 요소을 검색
		 * trace(Eco.XComp.query(Div00, "prop[name] *= 'ab'"));
         * // output : [object Tab],[object Tabpage],[object Tabpage]
         *
         * // Div00 에 포함된 모든 하위요소중 property name이 'Bu' 로 시작되는 요소을 검색
		 * trace(Eco.XComp.query(Div00, "prop[name] ^= 'Bu'"));
         * // output : [object Button],[object Button],[object Button],[object Button]
         *
         * // Div00 에 포함된 모든 하위요소중 property name이 '01' 로 끝나는 요소을 검색
		 * trace(Eco.XComp.query(Div00, "prop[name] $= '01'"));
         * // output : [object Div],[object Button]
         *
         * // Div00에 포함된 모든 하위요소중 화면에 보이면서 type이 Button 인 요소를 검색
		 * Div00.Div01.visible = false;
		 * trace(Eco.XComp.query(Div00, "isVisible == true && typeOf == 'Button'"));
         * // output : [object Button]
         *
		 * @memberOf Eco.XComp
		 */	
		query: function(from, where, deep)
		{		
			var pThis = Eco.XComp;

			if ( !from || !Eco.isXComponent(from) ) 
			{
				return [];
			}
			
			var depth = {};
				depth.current = 0;

			if ( Eco.isNumber(deep) ) 
			{
				depth.max = deep;
			}
			else if ( nexacro.isNumeric(deep) ) 
			{
				depth.max = parseInt(deep);
			}		
			else
			{
				depth.max = Number.MAX_VALUE;
			}
			
			var results = [];
			var targets = pThis._getChildren(from, depth);
			//trace("query > targets="+targets);
			if ( Eco.isEmpty(where) )
			{
				results = targets.slice(0);
			}
			else
			{
				var func = pThis._parseQueryWhere(where);
				var target, check;
				for (var i=0, len=targets.length; i<len; i++)
				{
					target = targets[i];
					check = func.call(pThis, target);
					//trace("query > target="+target + ", check=" + check);
					if ( check )
					{
						results.push(target);
					}
				}
			}
			
			return results;
		},

		/**
		 * ChildFrame에 속한 계층 위치의 정보까지 명칭으로 얻는다.
		 * @param {XComp} obj nexacro component.
		 * @param {XComp=} refParent 계층 구조에서 중단할 상위 nexacro component
		 * @return {string} obj 계층 구조의 명칭(xpform.Div00.Button01)
		 * @example
		 *
		 * // obj = Button
		 * trace(Eco.XComp.getPathName(obj, this));
		 * // output : Button00
		 *
		 * trace(Eco.XComp.getPathName(Div00.st_test, this));
		 * // output : Div00.st_test
		 *
		 * @memberOf Eco.XComp
		*/
		getPathName: function(obj, refParent)	
		{
			var c = obj, arr = [];			
			while ( c )
			{
				if ( c instanceof ChildFrame ) break;
				if ( refParent && c === refParent ) break;
				arr.push(c.name);
				c = c.parent;
			}
			arr = arr.reverse();
			return arr.join(".");
		},
		
		/**
		 * 계층 위치의 정보 명칭으로 nexacro component를 얻는다.
		 * @param {string} pathName 계층 구조의 명칭(xpform.Div00.Button01)
		 * @param {XComp} p 검색 기준 상위 nexacro component (p의 범위에서 검색)
		 * @return {XComp} obj nexacro component.
		 * @example
		 *
		 * trace(Eco.XComp.getCompByPathName("Div01.st_test", this));
		 * // output : [object Static]
		 *
		 * trace(Eco.XComp.getCompByPathName("st_test", Div00));
		 * // output : [object Static]
		 *
		 * @memberOf Eco.XComp
		*/
		getCompByPathName: function(pathName, p)
		{
			var comps = [],
				i, len, 
				comp;
				
			comps = pathName.split(".");
			
			for (i = 0, len = comps.length; i < len ; i++ )
			{
				comp = comps[i];
				p = p[comp];
				if (!p) break;
			}
			
			return p;
		},		
		
		
		/**
		 * 주어진 대상을 포함한 상위 범위로 지정된 이름에 최초로 일치하는 component, object 반환
		 * @public
		 * @param {XComp} p 찾을 대상
		 * @param {string} name 찾을 대상 이름
		 * @return {XComp} 검색된 component, object
		 * @example
		 *
		 * // this = Form 
		 * // Form 에 Button11 존재
		 * trace(Eco.XComp.lookup(this, "Button11"));	// output : [object Button]
		 * 
		 * // Button12 는 Div01 에 존재하지 않으나 Div01 의 상위 컴포넌트인 Form 에 존재
		 * trace(Eco.XComp.lookup(Div01, "Button11"));	// output : [object Button]
		 *
		 * @memberOf Eco.XComp
		 */
		lookup: function(p, name)
		{
			var o;
			while (p)
			{		
				o = p.components;
				if ( o && o[name] ) return o[name];
				
				o = p.objects;
				if ( o && o[name] ) return o[name];
				
				p = p.parent;
			}
			return null;
		},
		
		/**
		 * 주어진 상위 컴포넌트에 하위 컴포넌트가 포함되는지 여부를 반환
		 * @public
		 * @param {XComp} p 상위 컴포넌트
		 * @param {XComp} target 하위 컴포넌트
		 * @return {boolean} 포함 여부
		 * @example
		 *
		 * // this = Form, obj = Button
		 * trace(Eco.XComp.contains(this, obj));	// output : true
		 * 
		 * trace(Eco.XComp.contains(this, ds_test));	// output : true		 
		 * 
		 * @memberOf Eco.XComp
		 */		
		contains: function(p, target)
		{
			while (target)
			{
				if (target == p) return true;
				target = target.parent;
			}
			return false;
		},
		
		/**
		 * 주어진 Form 을 포함하는 최상위 Form을 찾는다.
		 * @public
		 * @param {Form} curForm 찾을 대상 이름
		 * @return {Form} 최상위 Form
		 * @example
		 *
		 * trace(Eco.XComp.getTopLevelForm(this));	// output : [object Form]
		 * 
		 * @memberOf Eco.XComp
		 */		
		getTopLevelForm: function(curForm)
		{
			var p = curForm;
			while (p && !(p instanceof ChildFrame))
			{
				p = p.parent;
			}
			return p.form;
		},		

		/**
		 * showModal 호출 시 추가된 변수 목록값을 반환한다.
		 * @public
		 * @param {Form} scope 현재 form
		 * @param {Array.<string>} variableNames 얻고자 하는 변수명 목록
		 * @return {object} {변수명:값, 변수명:값, ...} 객체.
		 * @example
		 *
		 * var frame = new ChildFrame();
		 * frame.init("testFrame", "absolute", 10, 10, 400, 400, null, null, "Sample::XComp_sub2.xfdl");
		 * frame.showModal(this.getOwnerFrame(), {'name':'James', 'address':"Seoul, Korea" });		 
		 *
		 * alert(Eco.XComp.getPopupArguments( this, ['name', 'address'] );	// output : {'name':'James', 'address':"Seoul, Korea" }
		 * 
		 * @memberOf Eco.XComp
		 */		
		getPopupArguments: function(scope, varNameList)
		{
			var p = scope;
			while (p && !(p instanceof ChildFrame))
			{
				p = p.parent;
			}
			
			var valueList = {};

			for(var i=0, len = varNameList.length; i < len; i++)
			{
				valueList[varNameList[i]] = p[varNameList[i]];
			}
			
			return valueList;
		},				
		
		/**
		 * 주어진 c(XComp) 가 사용하는 script 영역(scope)의 Form을 찾는다.
		 * @public
		 * @param {Form} c - XComp
		 * @return {Form} script 영역이 존재하는 Form
		 * @example
		 *
		 * trace(Eco.XComp.getScriptForm(this.Div00.Button00));	// output : [object Form]
		 * 
		 * @memberOf Eco.XComp
		 */		
		getScriptForm: function(c)
		{
			var p = c;
			while (p)
			{
				if ( (p.url && p.url.length) || (p.parent instanceof ChildFrame) )
				{
					break;
				}
				p = p.parent;
			}
			return p;
		},

		/**
		 * 주어진 component, object에 속성 값을 지정한다.
		 * @public
		 * @param {*} target nexacro Component, object
		 * @param {string} prop property name
		 * @param {*} value property value
		 * @param {*=} * (prop, value 반복)
		 * @example
		 *
		 * // obj = Button
		 * Eco.XComp.setProperties(obj, "text", "1234");
		 * // ==> Button.text = "1234";
		 * 
		 * Eco.XComp.setProperties(obj, "class", "", "enable", false);
		 * // ==> Button.class = "";
		 * // ==> Button.enable = false;		 
		 * 
		 * @memberOf Eco.XComp
		 */			 
		setProperties: function()
		{
			var XComp = Eco.XComp;
			var count = arguments.length;
			if ( count <=0 ) 
			{
				Eco.Logger.error({message:"argument doesn't exist!!", stack:true});
			}
			
			var target = arguments[0];
			if ( Eco.isUndefined(XComp.typeOf(target)) ) 
			{
				Eco.Logger.error({message:"target must be a nexacro Component(Object) !!", stack:true});
			}
			
			var prop;
			
			for(var i = 1 ; i < count ; i+=2 )
			{
				prop = arguments[i];
				value = arguments[i+1];
				if ( prop in target )
				{
					if ( target["set_"+prop] )
					{
						target['set_'+prop](value);
					}
				}
			}
		},
		
		/**
		 * 주어진 component, object 의 지정된 속성 목록을 얻어온다.
		 * @public
		 * @param {*} target nexacro Component, object
		 * @param {string} prop property name
		 * @param {*} value property value
		 * @param {*=} * (prop, value 반복)
		 * @return {array} 속성값 배열
		 * @example
		 *
		 * // obj = Button
		 * trace(Eco.XComp.getProperties(obj, "text", "visible"));
		 * // output : 실행,true
		 *
		 * // obj = Button
		 * trace(Eco.XComp.getProperties(obj, "test", "position", "style"));
		 * // output : ,absolute 519 634 575 656,[object StyleObject]
		 *
		 * @memberOf Eco.XComp
		 */			
		getProperties: function()
		{
			var XComp = Eco.XComp;
			var count = arguments.length;
			if ( count <=0 ) 
			{
				Eco.Logger.error({message:"argument doesn't exist!!", stack:true});
			}
			
			var target = arguments[0];
			if ( Eco.isUndefined(XComp.typeOf(target)) ) 
			{
				Eco.Logger.error({message:"target must be a nexacro Component(Object) !!", stack:true});
			}
			
			var results = [];
			var prop;
			
			for(var i = 1 ; i < count ; i++ )
			{
				results.push(target[arguments[i]]);
			}
			return results;
		},
		
		/**
		 * Carriage Return & Line Feed.
		 * @private
		 * @constant
		 * @memberOf Eco.XComp
		 */	
		_CRLF: String.fromCharCode(13, 10),
		
		/**
		 * indent character.
		 * @private
		 * @constant
		 * @memberOf Eco.XComp
		 */			
		_INDENT: "	",
		
		/**
		 * layout 반환.
		 * @private
		 * @param {Form|Div|Tabpage} container nexacro Form, Div, Tabpage Component
		 * @param {number} depth 들여쓰기 깊이
		 * @return {string} layout string
		 * @memberOf Eco.XComp
		 */			
		_getLayoutString: function(container, depth)
		{
			if ( Eco.isEmpty(depth) ) depth = 0;
			
			var pThis = Eco.XComp;
			var CRLF = pThis._CRLF;
			var INDENT = pThis._INDENT;
			
			var n = depth;
			var indent = "";
			while ( n > 0 )
			{
				indent += INDENT;
				n--;
			}
			
			var layout = "";
			var list = container.components;

			if ( list )
			{
				var comp, type;
				var typeOf = Eco.XComp.typeOf;
				for (var i=0,len=list.length; i<len; i++) 
				{
					comp = list[i];
					type = typeOf(comp);
					
					if ( type == "Div" || type == "Tabpage") 
					{
						layout += indent + "<"+type+" id=\"" + comp.name + "\"" + pThis._getPropString(comp);
						
						if ( Eco.isEmpty(comp.url) && comp.components.length > 0 ) 
						{
							layout += ">" + CRLF;
							layout += indent + INDENT + "<Layouts>" + CRLF;
							layout += indent + INDENT + INDENT + "<Layout>" + CRLF;
							layout += pThis._getLayoutString(comp, depth+3);
							layout += indent + INDENT + INDENT + "</Layout>" + CRLF;
							layout += indent + INDENT + "</Layouts>" + CRLF;
							layout += indent + "</"+type+">" + CRLF;	
						}
						else 
						{
							layout += "/>" + CRLF;
						}
					}
					else if ( type == "Tab" )
					{
						layout += indent + "<Tab id=\"" + comp.name + "\"" + pThis._getPropString(comp);
						
						if ( comp.components.length > 0 ) 
						{
							layout += ">" + CRLF;
							layout += indent + INDENT + "<Tabpages>" + CRLF;
							layout += pThis._getLayoutString(comp, depth+2);
							layout += indent + INDENT + "</Tabpages>" + CRLF;
							layout += indent + "</Tab>" + CRLF;
						} 
						else 
						{
							layout += "/>" + CRLF;
						}			
					}
					else
					{
						layout += indent + pThis._getCompTagString(comp, indent);
					}
				}
			}
			
			return layout;
		},
		
		/**
		 * Compnent Tag string 반환.
		 * @private
		 * @param {XComp} comp nexacro Component
		 * @param {string} indent 들여쓰기 문자
		 * @return {string} tag string
		 * @memberOf Eco.XComp
		 */				
		_getCompTagString: function(comp, indent) 
		{
			if ( !Eco.isXComponent(comp) ) return "";
			
			var pThis = Eco.XComp;
			var CRLF = pThis._CRLF;
			var INDENT = pThis._INDENT;
			var type = pThis.typeOf(comp);

			var layout = "<"+type+" id=\""+comp.name+"\"" + pThis._getPropString(comp);
			
			var needEndTag = false;
			
			// Format 처리
			if ( type == "Grid" || type == "Splitter" ) 
			{
				var formatid = comp.formatid || "default";
				var format = comp.getFormatString();

				var search = "<Format id=\""+formatid+"\">";
				var sIndex = format.indexOf(search);
				var eIndex = format.indexOf("</Format>", sIndex) + 9;

				var curFormat = "";
				curFormat += format.substring(0, sIndex);
				curFormat += comp.getCurFormatString();
				curFormat += format.substr(eIndex);
				
				// Splitter Bug
				curFormat = curFormat.replace(/SplitterItmes/g, "SplitterItems");
				
				//var formatXml = curFormat.split(CRLF);
				var formatXml = curFormat.split(String.fromCharCode(10));

				curFormat = "";
				for (var i=0,len=formatXml.length; i<len; i++)
				{
					curFormat += indent + INDENT + formatXml[i] + CRLF;
				}
				layout += ">" + CRLF;
				layout += curFormat;
				
				needEndTag = true;
			}
			else if ( type == "Panel" )
			{
				var items = comp.items;
				var len = items.length;
				if ( len > 0 )
				{
					layout += ">" + CRLF;
					layout += indent + INDENT + "<PanelItems id=\"items\">" + CRLF;
					var item, str;
					for (var i=0; i<len; i++)
					{
						item = items[i];
						str = "<PanelItem id=\""+item.name+"\"";
						for (var p in item)
						{
							if ( p != "name" && item.hasOwnProperty(p))
							{
								str += " " + p + "=\"" + item[p] + "\"";
							}
						}
						str += "/>";
						layout += indent + INDENT + INDENT + str + CRLF;
					}
					layout += indent + INDENT + "</PanelItems>" + CRLF;
					needEndTag = true;
				}
			}
			
			// innerdataset 처리
			var innerDs = comp.innerdataset;
			if ( pThis.typeOf(innerDs) == "Dataset" )
			{
				var ds = pThis.lookup(comp.parent, innerDs.name);
				if ( Eco.isEmpty(ds) ) 
				{
					var dsXml = innerDs.saveXML().split(CRLF);
					var dsStr = "";
					for (var i=0,len=dsXml.length; i<len; i++)
					{
						dsStr += indent + INDENT + dsXml[i] + CRLF;
					}
					layout += ">" + CRLF;			
					layout += dsStr;
					needEndTag = true;
				}
			}
			
			if ( needEndTag )
			{
				layout += indent + "</"+type+">" + CRLF;
			}
			else
			{
				layout += "/>" + CRLF;
			}
				
			return layout;
		},
		
		/**
		 * tag 처리시 별도로 처리하거나 포함시키지 않을 공통 속성.
		 * @private
		 * @memberOf Eco.XComp
		 */			
		_ignoreDefaultProps: [
			"name", "parent", "opener",
			"all", "components", "objects", "binds", "bindgestureset", 
			"hscrollbar", "vscrollbar", "resizebutton",
			"position", "position2", "positiontype",
			"stepcontrol", "canvas", "currentstyle", "style",
			"popupwindow", "innerdataset"
		],

		/**
		 * tag 처리시 별도로 처리하거나 포함시키지 않을 컴포넌트별 속성.
		 * @private
		 * @memberOf Eco.XComp
		 */	
		_ignoreCompProps: {
			'Form': ["taborder", "tabstop", "layout"],
			'Div': ["layout"],	
			'PopupDiv': ["layout"],
			'Combo': ["dropbutton", "comboedit", "combolist"],
			'Menu': ["popupmenu"],
			'Tab': ["tabpages"],
			'Tabpage': ["layout"],
			'Calendar': ["popupcalendar", "calendaredit", "spinupbutton", "spindownbutton"],
			'Grid': ["formats", "head", "body", "summ", "summary", 
					 "controltextarea", "controlmaskedit", "controlcombo",
					 "controlcalendar", "controlbutton", "controlcheckbox", 
					 "controlprogressbar", "controlexpand"],
			'Spin': ["spinupbutton", "spindownbutton", "spinedit"],
			'Splitter': ["formats", "items"],
			'Panel': ["items"]
		},

		/**
		 * 제외 속성 cache.
		 * @private
		 * @memberOf Eco.XComp
		 */	
		_cacheIgnoreProps: {},

		/**
		 * 컴포넌트 값 비교용 컴포넌트 cache.
		 * @private
		 * @memberOf Eco.XComp
		 */	
		_cacheCompareComp: {},
		
		/**
		 * property name=value 형식 list 반환.<br>
		 * ※ ActiveX 의 경우 연결된 개체 속성 접근시 문제가 발생하는 부분이<br>
		 * 있어서 ActiveX 컴포넌트 자체 속성만 지정함
		 * @private
		 * @param {XComp} targetComp nexacro Component
		 * @return {string} property list string
		 * @memberOf Eco.XComp
		 */
		_getPropString: function(targetComp)
		{
			var pThis = Eco.XComp;
			var type = pThis.typeOf(targetComp);
			var form = pThis._serializeFormTarget;
			var defaultComp = pThis._cacheCompareComp[type];
						
			if ( !defaultComp )
			{
				defaultComp = new form[type]("_serializeForm_"+type, 0, 0, 0, 0);
				pThis._cacheCompareComp[type] = defaultComp;
			}

			var ignoreProps = pThis._cacheIgnoreProps[type];
			if ( !ignoreProps )
			{
				var ignoreComp = pThis._ignoreCompProps[type] || [];
				ignoreProps = pThis._cacheIgnoreProps[type] = pThis._ignoreDefaultProps.concat(ignoreComp);
			}

			var tag = "";
			
			// style
			var style = "";
			var styles = Eco.XComp.Style.getStyle(targetComp);
			
			for (var p in styles)
			{
				if ( styles.hasOwnProperty(p) )
				{
					style += p + ":"+ styles[p] +";";
				}
			}
			
			if ( style.length > 0 )
			{
				tag += " style=\"" + style + "\"";
			}
			
			// positiontype
			var positiontype = "position";
			if ( targetComp.positiontype )
			{
				positiontype = targetComp.positiontype.toString();
				if ( positiontype != defaultComp.positiontype.toString() )
				{
					tag += " positiontype=\"" + positiontype + "\"";
				}
			}

			// position
			if ( targetComp[positiontype] )
			{
				var targetPosition = targetComp[positiontype].toString();
				var defaultPosition = defaultComp[positiontype].toString();
				if ( targetPosition != defaultPosition )
				{
					tag += " "+positiontype+"=\"" + targetPosition + "\"";
				}
			}
			
			// other
			var targetVal, defaultVal;
			var indexOf = Eco.array.indexOf;
			for (var p in targetComp)
			{
				if ( !targetComp.hasOwnProperty(p) ) continue;
				
				if (!(p in defaultComp) ) continue;				
				
				if ( indexOf(ignoreProps, p) > -1 ) continue;
				
				targetVal = targetComp[p];

				defaultVal = defaultComp[p];
						
				// undefined skip
				if ( targetVal === undefined ) continue;			
				
				// event skip
				if ( targetVal instanceof UserEvent ) continue;
				
				// function skip
				if ( Eco.isFunction(targetVal) ) continue;
				
				// components skip
				if ( targetComp.components && targetComp.components[p] ) continue;
				
				// objects skip
				if ( targetComp.objects && targetComp.objects[p] ) continue;

				if ( typeof targetVal == "object" )
				{			
					// 내부에 포함시 getCompTagString 에서 처리
					if ( p == "innerdataset" && targetVal ) 
					{
						var ds = pThis.lookup(targetComp.parent, targetVal.name);
						if ( !Eco.isEmpty(ds) ) 
						{
							tag += " innerdataset=\"@"+ds.name+"\"";
						}
						continue;
					}
					else if ( p == "bindgestureset" )
					{
						tag += " " + p + "=\"@"+targetVal.name+"\"";
						continue;
					}
					
					var v0 = targetVal ? targetVal.toString() : "";
					var v1 = defaultVal ? defaultVal.toString() : "";
					
					if ( v0 != v1 )
					{
						tag += " " + p + "=\""+v0.toString()+"\"";
					}
				}
				else 
				{
					if ( p == "taborder" || p == "class" )
					{
						if ( !Eco.isEmpty(targetVal) )
						{
							tag += " " + p + "=\""+targetVal+"\"";
						}
					}
					else if ( p == "text" || p == "value" )
					{
						if ( !Eco.isEmpty(targetVal) )
						{
							tag += " " + p + "=\""+Eco.string.escapeXML(targetVal)+"\"";
						}
					}
					else
					{
						if ( defaultVal != targetVal )
						{
							tag += " " + p + "=\""+targetVal+"\"";
						}
					}
				}
			}
			
			return tag;
		},
		
		/**
		 * 주어진 Form 을 직렬화하여 문자열로 반환.<br><br>
		 * ※ 현재 상태의 Layout 만 처리함.<br>
		 * ※ ActiveX 의 경우 연결된 개체의 속성은 포함하지 않는다.<br>
		 * @public
		 * @param {Form} form nexacro Form Component
		 * @return {string} layout string
		 * @example
		 *
		 * // this = Form
		 * trace(Eco.XComp.serializeForm(this));
		 * // output : 
		 * <Form id="XComp" position="absolute 0 0 1024 685" titletext="XComp">
		 *     <Layouts>
		 *         <Layout>
		 *             <Static id="Static06" position="absolute 20 79 246 158" .....
		 *              ....
		 *              ....
		 *              ....
		 *         </Layout>		 
		 *     </Layouts>
		 * </Form>
		 *
		 * @memberOf Eco.XComp
		 */				
		/*
		==> 사용성에 대한 고민 후 재작업
		serializeForm: function(form)
		{
			var pThis = Eco.XComp;
			pThis._serializeFormTarget = form;
			
			var CRLF = pThis._CRLF;
			var INDENT = pThis._INDENT;
			
			var layout = "";
			layout += "<Form id=\"" + form.name + "\"" + pThis._getPropString(form) + ">" + CRLF;
			layout += INDENT + "<Layouts>" + CRLF;
			layout += INDENT + INDENT + "<Layout>" + CRLF;
			layout += pThis._getLayoutString(form, 3);
			layout += INDENT + INDENT + "</Layout>" + CRLF;
			layout += INDENT + "</Layouts>" + CRLF;
			layout += "</Form>" + CRLF;	
			
			// flush cache 
			var cache = pThis._cacheCompareComp;
			var comp;
			for (var p in cache) 
			{
				if ( cache.hasOwnProperty(p) )
				{
					comp = form.components[cache[p].name];
					if ( comp ) 
					{
						form.removeChild(comp.name);
					}
					cache[p].destroy();
				}
			}
			
			return layout;
		},
		*/
		
		/**
		 * 사용자 정의 속성에 추가할 prefix 명
		 * @private
		 * @memberOf Eco.XComp
		 */		
		_userPropertyPrefix: Eco.getUniqueId(),
		
		/**
		 * 주어진 nexacro Component, object 에 사용자 속성을 추가한다.<br>
		 * 대상이 원래 가지고 있는 이름을 지정해도 상관없이 동작한다.<br>
		 * ※ 사용자 정의 속성을 대상에 바로 사용하면 내부 속성을<br> 
		 * 덮어쓸 수 있으므로 본 메소드를 통해서 사용하도록 한다.		 
		 * @public
		 * @param {*} target nexacro Component, object
		 * @param {string} name 사용자 정의 속성 명
		 * @param {*=} value 속성 값
		 * @example
		 *
		 * // Button00 (text : Button00)
		 * Eco.XComp.setUserProperty(Button00, "text", "user property");
		 * Eco.XComp.setUserProperty(Button00, "myProp", [0,1,2]);
		 * 
		 * @memberOf Eco.XComp
		 */
		 setUserProperty: function(target, name, value)
		 {
		     var propName = Eco.XComp._userPropertyPrefix;
		     propName += "_" + name;
		     
		     target[propName] = value;
		 },
		 
		/**
		 * 주어진 nexacro Component, object 에서 사용자 정의 속성값을 얻어온다.<br>
		 * ※ setUserProperty 메소드에 의해 지정된 사용자 정의 속성값을 얻어온다.
		 * @public
		 * @param {*} target nexacro Component, object
		 * @param {string} name 사용자 정의 속성 명
		 * @return {*} 주어진 target에 name으로 지정된 사용자 정의 속성값
		 * @example
		 *
		 * // Button00 (text : Button00)
		 * Eco.XComp.setUserProperty(Button00, "text", "user property");
		 * trace(Button00.text + " : " + Eco.XComp.getUserProperty(Button00, "text"));
		 *
		 * // output : 
		 * Button00 : user property
		 *
		 * @memberOf Eco.XComp
		 */
		 getUserProperty: function(target, name)
		 {
		     var propName = Eco.XComp._userPropertyPrefix;
		     propName += "_" + name;
		     
			 return target[propName];
		 },
		 
		/**
		 * 주어진 nexacro Component, object 에서 지정된 사용자 정의 속성을 제거한다.<br>
		 * ※ setUserProperty 메소드에 의해 지정된 사용자 정의 속성을 대상으로 한다.
		 * @public
		 * @param {*} target nexacro Component, object
		 * @param {string} name 제거할 사용자 정의 속성 명
		 * @example
		 *
		 * // Button00 (text : Button00)
		 * Eco.XComp.setUserProperty(Button00, "text", "user property");
		 * trace(Button00.text + " : " + Eco.XComp.getUserProperty(Button00, "text"));
		 * 
		 * Eco.XComp.deleteUserProperty(Button00, "text");
		 * trace(Button00.text + " : " + Eco.XComp.getUserProperty(Button00, "text"));		 
		 *
		 * // output : 
		 * Button00 : user property
		 * Button00 : undefined
		 *
		 * @memberOf Eco.XComp
		 */
		 deleteUserProperty: function(target, name)
		 {
		     var propName = Eco.XComp._userPropertyPrefix;
		     propName += "_" + name;
		     
			 delete target[propName];
		 }

	});
}
