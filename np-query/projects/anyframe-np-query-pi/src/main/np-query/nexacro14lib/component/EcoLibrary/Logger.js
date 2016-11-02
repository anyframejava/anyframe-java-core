/**
 * @fileoverview Logger와 관련된 함수.
 */

if ( !JsNamespace.exist("Eco.Logger") )
{
	/**
	 * @namespace
	 * @name Eco.Logger
	 * @memberof! <global>
	 */
	JsNamespace.declare("Eco.Logger", {
	
		/**
		 * 로그 레벨별 스트링 문자.
		 * @private
		 * @constant
		 * @memberOf Eco.Logger
		 */	
		_LEVEL_STRING: ["fatal", "error", "warn", "info", "debug"],
		
		/**
		 * 로그 레벨 (off:-1, fatal:0, error:1, warn:2, info:3, debug:4)<br>
		 * 값이 설정되면 그 레벨보다 같거나 높은 레벨만 로깅 처리한다(default:4). 
		 * @public
		 * @type number
		 * @memberOf Eco.Logger
		 */					 
		logLevel: 4,
		
		/**
		 * 로깅된 정보가 쌓여진 버퍼.
		 * @private
		 * @memberOf Eco.Logger
		 */			
		_logBuffer: [],
		
		/**
		 * 최대 적재 가능 로그 수로 해당 수에 도달하면<br>
		 * 첫번째 기록이 삭제되고 새로운 로그가 마지막에 적재된다.
		 * @private
		 * @memberOf Eco.Logger
		 */
		_logBufferMax: 1000,
		
		/**
		 * Call Stack 시 들여쓰기 문자 지정.
		 * @private
		 * @memberOf Eco.Logger
		 */
		_indent: '    ',
		
		/**
		 * Logger 시작시간 값을 담고 있다.
		 * @private
		 * @memberOf Eco.Logger
		 */
		_startLoggerTime: (new Date()).getTime(),				
		
		/**
		 * 경과시간 표시를 위한 시작시간 값을 담고 있다.
		 * @private
		 * @memberOf Eco.Logger
		 */
		_startElapsedTime: null,
				
		/**
		 * 로그 출력 필터 지정을 위한 값을 담고 있다.
		 * @private
		 * @memberOf Eco.Logger
		 */		
		_filter: "",
		
		/**
		 * 로그 출력에 표시할 날짜 형태를 얻어온다.
		 * @private
		 * @return {string} 날짜포맷 문자열.
		 * @memberOf Eco.Logger
		 */
		_getDateFormatString: function()
		{			
			var objDate = new Date();
			return Eco.date.getMaskFormatString(objDate, "yyyy-MM-dd HH:mm:ss.sss");
		},
		
		/**
		 * function full name을 얻어온다.
		 * @private
		 * @param {function} func 대상 function.
		 * @return {string} function full name.
		 * @memberOf Eco.Logger
		 */		
		_getFuncFullName: function(func) 
		{
			var name = "";
			if (func._thisOwner)
			{
				name += (func._thisOwner._className || Eco.XComp.getPathName(func._thisOwner)) + ".";
			}
			
			if (func._thisName)
			{
				name += func._thisName;
			}
			else
			{
				var funcName = "";
				if ( 'name' in func )
				{
					funcName = func.name;
				}
				else
				{					
					var reg = /function\s*([\w\-$]+)?\s*\(/i;
					funcName = reg.test(func.toString()) ? RegExp.$1 : "";
				}
				
				if( funcName.length == 0 )
				{
					funcName = "anonymous function";
				}
								
				name += funcName;
			}
			return name;
		},

		/**
		 * 경과시간을 얻어온다.<br>
		 * startElapsed() 이 호출된 이 후 경과 시간을 체크,<br>
		 * startElapsed() 선언이 안될 경우 Logger 가 로딩되는 시간임.
		 * @private
		 * @return {string} 경과시간 millisecond 단위 문자열.
		 * @memberOf Eco.Logger
		 */	
		_getElapsed: function(isTotal)
		{
			var logger = Eco.Logger;
			var stratTime = logger._startElapsedTime;
			if ( !stratTime )
			{
				stratTime = logger._startLoggerTime;				
			}
			logger._startElapsedTime = null;
			
			var currentTime = (new Date()).getTime();
			var elpased = (currentTime - stratTime);
			var sec = parseInt(elpased/1000, 10);
			var msec = parseInt(elpased%1000, 10).toString().padLeft(3, "0");
			if ( logger._totalElapsedTime != null )
			{
				logger._totalElapsedTime += elpased;
			}
			if ( isTotal )
			{
				var elpased0 = logger._totalElapsedTime;
				delete logger._totalElapsedTime;
				var sec1 = parseInt(elpased0/1000, 10);
				var msec1 = parseInt(elpased0%1000, 10).toString().padLeft(3, "0");
				return [(sec + "." + msec), (sec1 + "." + msec1)];
			}
			return sec + "." + msec;
		},
		
		/**
		 * dump 개체가 nexacro Component 의 Object collection 형태를 지정하여 문자열 변환에 사용.
		 * @private
		 * @memberOf Eco.Logger
		 */			
		_xCompPropertyObjRe: /position|position2|positiontype|anchor|tooltiptype|tooltiptext|dropformat|currentstyle|style|scrollbars/,
		
		/**
		 * dump 대상 개체가 가지는 값을 스트링으로 변환하여 얻어온다.
		 * @private
		 * @param {*} object 확인할 value.
		 * @param {boolean=} bArguments function argument 여부
		 * @return {string} dump 대상 개체의 변환된 문자열 값.
		 * @memberOf Eco.Logger
		 */			
		_getDumpString: function(object, bArguments)
		{
			var logger = Eco.Logger;
			var member, type, value, nm, members = [];
			
			if ( bArguments )
			{
				if ( object != null )
				{
					for ( var i = 0, n = object.length; i < n; i++ )
					{
						value = object[i];
						type = typeof value;
						
						if (type == "function")
						{
							members.push("function refer");
							continue;
						}

						if ( Eco.isPrimitive(value) )
						{
							member = value;
						}
						else if ( Eco.isXComponent(value) )
						{
							member = value.name || value;
						}
						else if ( Eco.isArray(value) )
						{
							member = '[ ]';
						}
						else if (Eco.isObject(value))
						{
							member = '{ }';
						}
						else
						{
							member = value;
						}
						if ( type == "undefined" || type == "null" )
						{
							members.push(type);
						}
						else
						{
							members.push(type + ': ' + member);
						}
					}
				}
			}
			else
			{
				if ( object != null )
				{
					if ( object.hasOwnProperty ) 
					{
						for (nm in object)
						{
							if (object.hasOwnProperty(nm))
							{
								value = object[nm];
								type = typeof value;
								
								if (type == "function")
								{
									continue;
								}

								if ( Eco.isPrimitive(value) )
								{
									member = value;
								}
								else if ( Eco.isXComponent(value) )
								{
									member = value.name || value;
								}
								else if (Eco.isArray(value))
								{
									member = '[ ]';
								}
								else if (Eco.isObject(value))
								{
									member = '{ }';
								}
								else
								{
									member = type;
								}
								members.push(nm + ': ' + member);
							}
						}
					}
					else
					{
						// nexacro component 만 처리, dataset, animation 등은 차후에 별도 처리.
						for (nm in object)
						{
							value = object[nm];
							type = typeof value;
							if (type == "function")
							{
								continue;
							}

							if (value instanceof UserEvent || nm == "canvas" )
							{
								continue;
							}
							
							if ( logger._xCompPropertyObjRe.test(nm) )
							{
								// style, currentstyle, all, components, objects, binds ==> string으로 표시하는 함수 필요.
								member = value.toString ? value.toString() : value;
							}
							else if ( Eco.isXComponent(value) )
							{
								member = value.name || value;
							}
							else if (Eco.isPrimitive(type))
							{
								member = value;
							}
							else if (Eco.isArray(value))
							{
								member = '[ ]';
							}
							else if (Eco.isObject(value))
							{
								member = '{ }';
							}
							else
							{
								member = type;
							}
							members.push(nm + ': ' + member);
						}
					}
				}
			}

			if (members.length)
			{
				if ( bArguments )
				{
					return members.join(', ');
				}
				else
				{
					return ' \nData: {\n  ' + members.join(',\n  ') + '\n}';
				}
			}
			return '';
		},
		/**
		 * node.js 파일에 inspect 함수를 참조하여 작성하였음.
		 * 주어진 obj에 대한 값을 json 방식으로 출력하는 string값을 반환한다.
		 * @param {*} obj 출력할 대상
		 * @param {boolean=} showHidden object에 javascript에서 내부적으로 정의 메소드도 나타나게 한다.(default: false)
		 * @param {number=} depth 출력할 depth 정의.(default: 2)
		 * @param {boolean=} colors 출력시에 string, number, Date값등에 대한 색깔 표시 여부(default: false)
		 * @param {boolean=} customInspect 출력시에 만약 obj에 inspect메소드가 존재하면 그것을 사용한다.(default: true)
		 * @memberOf Eco.Logger
		 */
		inspect: function(obj, showHidden, depth, colors, customInspect)
		{
			var ctx = {
				seen: [],
				styles: Eco.Logger._inspectstyles,
				stylize: Eco.Logger._stylizeNoColor
			};
			ctx.depth = depth;
			ctx.colors = colors;
			ctx.showHidden = showHidden;
			ctx.customInspect = customInspect;
			if (typeof ctx.showHidden === 'undefined') ctx.showHidden = false;
			if (typeof ctx.depth === 'undefined') ctx.depth = 2;
			if (typeof ctx.colors === 'undefined') ctx.colors = false;
			if (typeof ctx.customInspect === 'undefined') ctx.customInspect = true;
			if (ctx.colors) ctx.stylize = Eco.Logger._stylizeWithColor;
			return Eco.Logger._formatValue(ctx, obj, ctx.depth);
		},
		_formatValue: function(ctx, value, recurseTimes)
		{
			// value에 직접 정의한 inspect메소드가 존재하면 그것을 사용하여 처리한다.
			if (ctx.customInspect && value && typeof value.inspect === 'function' &&
				value.inspect !== Eco.Logger.inspect &&
				// 무한 루틴 때문에 check한다.
				!(value.constructor && value.constructor.prototype === value))
			{
				return String(value.inspect(recurseTimes));
			}

			var pThis = Eco.Logger;
			// Primitive types 에 대한 처리
			var primitive = pThis._formatPrimitive(ctx, value);
			if (primitive)
			{
				return primitive;
			}

			// object의 Look up the keys of the object.
			var keys = Eco.object.getPropertyNames(value);
			var visibleKeys = pThis._arrayToHash(keys);
			
			if (ctx.showHidden)
			{
				keys = Object.getOwnPropertyNames(value);
			}

			// value 값 중에 속성이 없고, 더이상 진행하지 않은 type이면, 이것을 check하여 처리한다.
			if (keys.length === 0)
			{
				if (typeof value === 'function')
				{
					var name = value.name ? ': ' + value.name : '';
					return ctx.stylize('[Function' + name + ']', 'special');
				}
				if (Eco.isRegExp(value))
				{
					return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
				}
				if (Eco.isDate(value))
				{
					return ctx.stylize(Date.prototype.toString.call(value), 'date');
				}
				if (Eco.isError(value))
				{
					return pThis._formatError(value);
				}
			}

			var base = '', array = false, braces = ['{', '}'];
			
			// array 처리
			if (Eco.isArray(value))
			{
				array = true;
				braces = ['[', ']'];
			}

			//  function 처리
			if (typeof value === 'function')
			{
				var n = value.name ? ': ' + value.name : '';
				base = ' [Function' + n + ']';
			}

			// RegExp 처리
			if (Eco.isRegExp(value))
			{
				base = ' ' + RegExp.prototype.toString.call(value);
			}

			// Date 처리
			if (Eco.isDate(value))
			{
				base = ' ' + Date.prototype.toUTCString.call(value);
			}

			// Error 객체 처리
			if (Eco.isError(value))
			{
				base = ' ' + pThis._formatError(value);
			}

			if (keys.length === 0 && (!array || value.length == 0))
			{
				return braces[0] + base + braces[1];
			}
			
			if (recurseTimes < 0)
			{
				if (Eco.isRegExp(value))
				{
					return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
				}
				else
				{
					return ctx.stylize('[Object]', 'special');
				}
			}
			
			ctx.seen.push(value);
			
			var output;
			if (array)
			{
				output = pThis._formatArray(ctx, value, recurseTimes, visibleKeys, keys);
			}
			else
			{
				output = Eco.array.map(keys, function(key) {
					return pThis._formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
				});
			}

			ctx.seen.pop();
			
			return pThis._reduceToSingleString(output, base, braces);
		},
		_formatPrimitive: function(ctx, value)
		{
			switch (typeof value) {
				case 'undefined':
					return ctx.stylize('undefined', 'undefined');

				case 'string':
					var simple = '\'' + Eco.Json.encode(value).replace(/^"|"$/g, '')
									.replace(/'/g, "\\'")
									.replace(/\\"/g, '"') + '\'';
					return ctx.stylize(simple, 'string');

				case 'number':
					return ctx.stylize('' + value, 'number');

				case 'boolean':
					return ctx.stylize('' + value, 'boolean');
			}
			// null 처리
			if (value === null)
			{
				return ctx.stylize('null', 'null');
			}
		},
		_formatError: function(value)
		{
			return '[' + Error.prototype.toString.call(value) + ']';
		},
		_formatArray: function(ctx, value, recurseTimes, visibleKeys, keys)
		{
			var output = [],
				hasOwnProperty = Eco._hasOwnProperty;

			var pThis = Eco.Logger;
			for (var i = 0, l = value.length; i < l; ++i)
			{
				if (hasOwnProperty.call(value, String(i)))
				{
					output.push(pThis._formatProperty(ctx, value, recurseTimes, visibleKeys,
						String(i), true));
				}
				else
				{
					output.push('');
				}
			}
			Eco.array.forEach(keys, function(key) {
				if (!key.match(/^\d+$/)) {
					output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
						key, true));
				}
			});
			return output;
		},
		_formatProperty: function(ctx, value, recurseTimes, visibleKeys, key, array)
		{
			var name, str, desc;
			if (!Eco._isIE8Below)
			{
				desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
				if (desc.get)
				{
					if (desc.set)
					{
						str = ctx.stylize('[Getter/Setter]', 'special');
					}
					else
					{
						str = ctx.stylize('[Getter]', 'special');
					}
				}
				else
				{
					if (desc.set)
					{
						str = ctx.stylize('[Setter]', 'special');
					}
				}
			}
			else
			{
				desc = { value: value[key] };
			}

			var hasOwnProperty = Eco._hasOwnProperty,
				pThis = Eco.Logger;

			if (!hasOwnProperty.call(visibleKeys, key))
			{
				name = '[' + key + ']';
			}
			if (!str)
			{
				if (Eco.array.indexOf(ctx.seen, desc.value, null, true) < 0)
				{
					if (recurseTimes === null)
					{
						str = pThis._formatValue(ctx, desc.value, null);
					}
					else
					{
						str = pThis._formatValue(ctx, desc.value, recurseTimes - 1);
					}
					if (str.indexOf('\n') > -1)
					{
						if (array)
						{
							str = str.split('\n');
							str = Eco.array.map(str, function(line) {
								return '  ' + line;
							});
							str = str.join('\n').substr(2);
						}
						else
						{
							str = str.split('\n');
							str = Eco.array.map(str, function(line) {
								return '   ' + line;
							});
							str = '\n' + str.join('\n');
						}
					}
				}
				else
				{
					str = ctx.stylize('[...]', 'special');
				}
			}
			if (typeof name === 'undefined')
			{
				if (array && key.match(/^\d+$/))
				{
					return str;
				}
				name = Eco.Json.encode('' + key);
				if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/))
				{
					name = name.substr(1, name.length - 2);
					name = ctx.stylize(name, 'name');
				}
				else
				{
					name = name.replace(/'/g, "\\'")
						.replace(/\\"/g, '"')
						.replace(/(^"|"$)/g, "'");
					name = ctx.stylize(name, 'string');
				}
			}

			return name + ': ' + str;
		},
		_reduceToSingleString: function(output, base, braces)
		{
			var numLinesEst = 0;
			var length = Eco.array.reduce(output, function(prev, cur) {
				numLinesEst++;
				if (cur.indexOf('\n') >= 0) numLinesEst++;
				return prev + cur.length + 1;
			}, 0);

			if (length > 60)
			{
				return braces[0] +
					(base === '' ? '' : base + '\n ') +
					' ' +
					output.join(',\n  ') +
					' ' +
					braces[1];
			}

			return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
		},
		_inspectstyles: {
			'special': 'blue',
			'number': 'red',
			'boolean': 'blue',
			'undefined': 'bold',
			'null': 'bold',
			'string': 'hotpink',
			'date': 'blue',
			// "name": intentionally not styling
			'regexp': 'blue'
		},
		_stylizeWithColor: function(str, styleType)
		{
			var style = this.styles[styleType];
			if (style)
			{
				if ( style == "bold" )
				{
					return '<b>' + str +'</b>';
				}
				else
				{
					return '<font color="' + style + '">' + str +'</font>';
				}
			}
			else
			{
				return str;
			}
		},
		_stylizeNoColor: function(str, styleType)
		{
			return str;
		},
		_arrayToHash: function(arr)
		{
			var hash = {};
		
			Eco.array.forEach(arr, function(val, idx) {
				hash[val] = true;
			});
			return hash;
		},
		/**
		 * 로깅 처리.
		 * @private
		 * @param {string} level 로그레벨.
		 * @param {string|object} msg 로깅할 메시지 혹은 메시지 Object
		 * @memberOf Eco.Logger
		 */	
		_logging: function(level, msg) 
		{
			var logger = Eco.Logger;
			var logLevel = logger.logLevel;
			
			// fatal, error 레벨은 무조건 출력
			if ( level > 1 && logLevel < level ) return;
			
			var message, dump, stack, elapsed, elapsedTotal, filter, showStackAnonymous;
			if (typeof msg != 'string')
			{
				message = msg.message || '';
				dump = msg.dump;
				stack = msg.stack;
				elapsed = msg.elapsed;
				elapsedTotal = msg.elapsedTotal;
				filter = msg.filter;
				showStackAnonymous = msg.showStackAnonymous;
			}
			else
			{
				message = msg;
			}
			
			var logFunc = logger._logging.caller;	// fatal(), error(), wanr(), info(), debug()
			var callFunc = logFunc.caller;				// 실제 로깅이 발생한 함수

			var dateString = logger._getDateFormatString();
			var levelString = logger._LEVEL_STRING[level];
			var funcString = logger._getFuncFullName(callFunc);
			var resultMessage = dateString + " [" + levelString + "] " + funcString + " - " + message;
			var elapsedTime = "";
			if ( elapsed ) 
			{
				elapsedTime = logger._getElapsed(elapsedTotal);
				if ( elapsedTotal )
				{
					resultMessage += " (Elapsed Time : " + elapsedTime[0] + " sec -- Total Time : " + elapsedTime[1] + " sec) ";
				}
				else
				{
					resultMessage += " (Elapsed Time : " + elapsedTime + " sec)";
				}
			}
			
			// dump
			var dumpString = "";
			if ( dump )
			{
				dumpString = logger._getDumpString(dump);
				resultMessage += "\n*****************PRINTING DUMP************************";
				resultMessage += dumpString;
				resultMessage += "\n*****************COMPLETE DUMP************************";
			}	
			// callstack
			var stackString = "";
			if ( stack )
			{				
				stackString = logger._getCallStackString(logFunc, showStackAnonymous);
				resultMessage += "\n*****************PRINTING STACK************************";
				resultMessage += stackString;
				resultMessage += "\n*****************COMPLETE STACK************************";
			}
			
			// write message
			if ( filter )
			{
				if ( logger._filter == filter )
				{
					logger._writeLog(resultMessage);
				}
			}
			else
			{
				logger._writeLog(resultMessage);
			}

			var buffer = logger._logBuffer;
			var max = logger._logBufferMax;
			
			// 지정된 로그 레벨보다 클 경우에만 buffer에 적재
			if ( logLevel > -1 && logLevel >= level )
			{
				if (buffer.length >= max)
				{
					buffer.splice(0, 1);
				}		
				var buff = {
					date: dateString,
					level: levelString,
					message: message,
					from:funcString,
					elapsed: elapsedTime,
					dump: dumpString,
					stack: stackString
				};
				logger._logBuffer.push(buff);
			}
			
			if ( level == 0 || level == 1 )
			{
				var e = new Error(message);
				throw e;				
			}
		},
		
		/**
		 * 로그 출력 처리.
		 * @private
		 * @param {string} message 출력할 메시지
		 * @memberOf Eco.Logger
		 */			
		_writeLog: function(message) 
		{
			application.trace(message);
		},
		
		/**
		 * call stack 문자열 전체를 얻어온다.
		 * @private
		 * @param {function} func log function
		 * @param {boolean} showStackAnonymous stack에 익명함수(시스템 함수 포함) 보이기 여부
		 * @return {string} call stack 문자열 값.
		 * @memberOf Eco.Logger
		 */			
		_getCallStackString: function(func, showStackAnonymous)
		{
			var logger = Eco.Logger;
			var f = func,
				indstr = "",
				indentStr = logger._indent,
				ret = "",
				index,
				stackLine = "";

			/*
				event handler 내에서 다른 event handler가 호출될 수 있는 구조라면
				무한루프가 발생된다. 따라서 stack 배열에 이미 실행한 caller
				정보를 담아두고 실행하기 전에 체크하여 이미 존재하는 caller 라면
				중단한다.
			*/
			var stack = [f];
			var startFunc = f.caller;
			
			while ( f )
			{
				f = f.caller;
				
				index = -1;
				for (var i=0,len=stack.length; i<len; i++)
				{
					if ( f == stack[i] )
					{
						index = i;
						break;
					}
				}
				
				if ( index < 0 )
				{
					stack.push(f);
					stackLine = logger._getCallStackLine(indstr, f);
					
					if ( stackLine.indexOf("anonymous function") > -1 )
					{
						if ( showStackAnonymous )
						{
							ret += "\n" + stackLine;
							indstr += indentStr;
						}
					}
					else if ( stackLine.length > 0 )
					{
						ret += "\n" + stackLine;
						indstr += indentStr;				
					}
				}
				else
				{
					ret += "\n" + indstr + "stack overflow...";
					break;
				}
			}
			
			return ret;
		},
		
		/**
		 * 지정된 function에서 호출자 정보(owner, name, argument value) 문자열을 얻어온다.
		 * @private
		 * @param {string} indstr 들여쓰기 문자
		 * @param {function} func 호출한 function
		 * @return {string} 호출자 정보 문자열 값.
		 * @memberOf Eco.Logger
		 */	
		_getCallStackLine: function(indstr, func)
		{			
			var logger = Eco.Logger;
			var nm = indstr;
			if (func)
			{
				nm += logger._getFuncFullName(func);
				nm += "(" + logger._getDumpString(func.arguments, true) + ")";
				
				return nm;
			}
			else
			{
				return "";
			}
		},
		
		/**
		 * Log Buffer 내용을 얻어온다.<br>
		 * 아래 형태의 Collection을 반환.<br>
		 * {date: "2013-04-22 13:46:14.316", level: "error", message: "error!!!", elpased: "", dump: "", stack: ""} 
		 * @public
		 * @return {Array} log buffer.
		 * @example
		 * var buff = Eco.Logger.getLogBuffer();
		 * trace(buff)	// output : [object Object],[object Object], ....
		 * @memberOf Eco.Logger
		 */
		getLogBuffer: function()
		{
			return Eco.Logger._logBuffer;
		},
		
		/**
		 * 경과시간 체크를 위한 시작시간을 지정한다.<br>
		 * 본 메소드를 호출하지 않으면 Logger 초기 로딩시간 부터 적용.
		 * @public
		 * @example
		 * // 경과시간 시작시간 지정 
		 * // elapsed 옵션을 포함한 로깅이 실행되면 초기화 됨
		 * // 시작시간을 지정하지 않으면 Logger가 최초 include된 시점이 시작시간
		 * Eco.Logger.startElapsed();
		 * 
		 * var a = 0;
		 * for (var i=0; i<10000; i++)
		 * {
		 *     a = a + i;
		 * }
		 * 
		 * Eco.Logger.debug({message: "test !!!", elapsed: true});
		 * // result : 2013-05-07 16:28:34.093 [debug] Button11_onclick - test !!! (Elapsed Time : 0.005 sec)
		 *
		 * @memberOf Eco.Logger
		 */		
		startElapsed: function(isTotal)
		{	
			Eco.Logger._startElapsedTime = (new Date()).getTime();
			if ( isTotal )
			{
				Eco.Logger._totalElapsedTime = 0;
			}			
		},
		
		/**
		 * 현재 필터 구분자를 얻어온다.
		 * @public
		 * @return {string} filter 구분자.
		 * @example
		 * var filter = Eco.Logger.getFilter();
		 * if ( filter == "" )
		 * {
		 *     Eco.Logger.setFilter("Test1");
		 * }
		 * @memberOf Eco.Logger
		 */
		getFilter: function()
		{
			return Eco.Logger._filter;
		},		
		
		/**
		 * 필터 지시자를 지정한다.<br>
		 * 로그 호출시 해당 지시자만 필터링되어 출력한다.<br>
		 * (필터에 해당하지 않더라도 출력하지 않을뿐 buffer에는 저장된다.)
		 * @public
		 * @param {string} filter 구분자.
		 * @example
		 * // filter 지정으로 특정 지시자에 해당하는 로그를 볼 수 있다.
		 * Eco.Logger.setFilter("Test2");
		 * 
		 * Eco.Logger.debug({message: "Filter 1 !!!", filter: "Test1"});
		 * // result : 없음
		 * Eco.Logger.debug({message: "Filter 2 !!!", filter: "Test2"});
		 * // result : 2013-05-07 16:32:43.200 [debug] Button13_onclick - Filter 2 !!!
		 * @memberOf Eco.Logger
		 */		
		setFilter: function(filter)
		{
			Eco.Logger._filter = filter;
		},

		/**
		 * fatal 레벨 로그를 남긴다.<br><br>
		 * - argument로 string 전달시 기본 출력할 수 있다.<br>
		 * - argument로 Object 전달시 메시지 옵션을 추가할 수 있다. 지원하는 옵션은 아래와 같다.<br>
		 *   message : string  (출력할 메시지)<br>
		 *   elapsed : boolean (경과시간 표시여부)<br>
		 *   dump    : object  (개체 속성 나열)<br>
		 *   stack   : true    (call stack 표시여부)<br>
		 *   filter  : string  (로그 필터 지시자)<br><br>
		 * - 본 메소드는 logLevel에 상관없이 출력된다.<br>
		 * - logLevel이 0(fatal) 이상일 경우 buffer에 적재된다.<br>
		 * - 본 메소드는 Error 개체를 throw 한다.
		 * @public
		 * @param {string|object} msg 출력할 메시지 또는 옵션을 포함한 Object.
		 * @example
		 *
		 * Eco.Logger.fatal("심각한 오류 발생 !!!");
		 * // result : 2013-05-07 15:12:51.410 [fatal] Button00_onclick - 심각한 오류 발생 !!!
		 *
		 * // 경과시간 시작시간 지정 
		 * // elapsed 옵션을 포함한 로깅이 실행되면 초기화 됨
		 * // 시작시간을 지정하지 않으면 Logger가 최초 include된 시점이 시작시간
		 * Eco.Logger.startElapsed();
		 *
		 * var a = 0;
		 * for (var i=0; i<10000; i++)
		 * {
		 *     a = a + i;
		 * }
		 *
		 * Eco.Logger.fatal({message: "fatal !!!", elapsed: true});
		 * // result : 2013-05-07 15:20:07.171 [fatal] Button01_onclick - fatal !!! (Elapsed Time : 0.004 sec)
		 *
		 * @memberOf Eco.Logger
		 */
		fatal: function(msg)
		{
			Eco.Logger._logging(0, msg);
		},
		
		/**
		 * error 레벨 로그를 남긴다.<br><br>
		 * - argument로 string 전달시 기본 출력할 수 있다.<br>
		 * - argument로 Object 전달시 메시지 옵션을 추가할 수 있다. 지원하는 옵션은 아래와 같다.<br>
		 *   message : string  (출력할 메시지)<br>
		 *   elapsed : boolean (경과시간 표시여부)<br>
		 *   dump    : Object  (개체 속성 나열)<br>
		 *   stack   : true    (call stack 표시여부)<br>
		 *   filter  : string  (로그 필터 지시자)<br><br>
		 * - 본 메소드는 logLevel에 상관없이 출력된다.<br>
		 * - logLevel이 1(error) 이상일 경우 buffer에 적재된다.<br>
		 * - 본 메소드는 Error 개체를 throw 한다.<br>
		 * @public
		 * @param {string|object} msg 출력할 메시지 또는 옵션을 포함한 Object.
		 * @example
		 *
		 * Eco.Logger.error("에러 발생 !!!");
		 * // result : 2013-05-07 15:24:23.628 [error] Button02_onclick - 에러 발생 !!!
		 *
		 * // 경과시간 시작시간 지정 
		 * // elapsed 옵션을 포함한 로깅이 실행되면 초기화 됨
		 * // 시작시간을 지정하지 않으면 Logger가 최초 include된 시점이 시작시간
		 * // Eco.Logger.startElapsed();
		 *
		 * var a = 0;
		 * for (var i=0; i<10000; i++)
		 * {
		 *     a = a + i;
		 * }
		 *
		 * Eco.Logger.error({message: "error !!!", elapsed: true});
		 * // result : 2013-05-07 15:29:10.399 [error] Button03_onclick - error !!! (Elapsed Time : 13.541 sec)
		 *
		 * @memberOf Eco.Logger
		 */		
		error: function(msg) 
		{
			Eco.Logger._logging(1, msg);
		},
		
		/**
		 * warn 레벨 로그를 남긴다.<br><br>
		 * - argument로 string 전달시 기본 출력할 수 있습니다.<br>
		 * - argument로 Object 전달시 메시지 옵션을 추가할 수 있다. 지원하는 옵션은 아래와 같다.<br>
		 *   message : string  (출력할 메시지)<br>
		 *   elapsed : boolean (경과시간 표시여부)<br>
		 *   dump    : Object  (개체 속성 나열)<br>
		 *   stack   : true    (call stack 표시여부)<br>
		 *   filter  : string  (로그 필터 지시자)<br><br>
		 * - logLevel이 2(warn) 이상일 경우 buffer에 적재된다.<br>
		 * @public
		 * @param {string|object} msg 출력할 메시지 또는 옵션을 포함한 Object.
		 * @example
		 *
		 * Eco.Logger.warn("경고 발생 !!!");
		 * // result : 2013-05-07 15:41:18.965 [warn] Button04_onclick - 경고 발생 !!!
		 * 
		 * // obj (Button) 개체 속성을 나열
		 * Eco.Logger.warn({message: "dump !!!", dump: obj});
		 * 
		 * // result : 2013-05-07 15:42:21.701 [warn] Button05_onclick - dump !!!
		 * *****************PRINTING DUMP************************ 
		 * Data: {
		 *   name: Button05,
		 *   id: Button05,
		 *   parent: Logger,
		 *   _refform: Logger,
		 *   position: absolute,
		 *   left: 519,
		 *   _left: 519,
		 *   top: 283,
		 *   _top: 283,
		 *   right: null,
		 *   _right: null,
		 *   bottom: null,
		 *   _bottom: null,
		 *   width: 56,
		 *   _width: 56,
		 *   height: 22,
		 *   _height: 22,
		 *   _adjust_width: 56,
		 *   _adjust_height: 22,
		 *   _adjust_left: 519,
		 *   _adjust_left_ltr: 519,
		 *   _adjust_top: 283,
		 *   style: object,
		 *   currentstyle: object,
		 *   _styles: { },
		 *   defaultbutton: false,
		 *   escapebutton: false,
		 *   selectStatus: false,
		 *   wordwrap: false,
		 *   _apply_pushed_pseudo: true,
		 *   _text_elem: object,
		 *   _img_elem: null,
		 *   _text_width: -1,
		 *   _text_height: -1,
		 *   _image_width: 0,
		 *   _image_height: 0,
		 *   _accessibility_role: button,
		 *   taborder: 1,
		 *   _taborder: 1,
		 *   text: 실행,
		 *   _display_text: 실행,
		 *   cssclass: WF_btn_Point,
		 *   className: WF_btn_Point,
		 *   _css_finder: { },
		 *   _ref_css_finder: { },
		 *   _control_pseudo: mouseover,
		 *   _contents_pseudo: mouseover,
		 *   _pseudo: mouseover,
		 *   _real_visible: false,
		 *   onclick: object,
		 *   _created_event_list: [ ],
		 *   _control_element: object,
		 *   _refcssobj: Logger,
		 *   _refcssid: #Button05,
		 *   _margin: object,
		 *   _client_width: 56,
		 *   _client_height: 22,
		 *   _has_dirty_rect: false,
		 *   _is_created_contents: true,
		 *   _is_loading: false,
		 *   displaytext: 실행,
		 *   _real_enable: true,
		 *   _unique_id: mainframe_childframe_form_Button05,
		 *   _is_created: true,
		 *   _focus_refer_comp: Button05,
		 *   _pushed: false,
		 *   _is_pushed_area: false,
		 *   _is_push: false,
		 *   _status: focus,
		 *   _last_focused: null,
		 *   _lbuttonup_event_bubbles: undefined,
		 *   _lbuttonup_first_comp: Button05
		 * }
		 * *****************COMPLETE DUMP************************
		 *		 
		 * @memberOf Eco.Logger
		 */			
		warn: function(msg) 
		{
			Eco.Logger._logging(2, msg);
		},
		
		/**
		 * info 레벨 로그를 남긴다.<br><br>
		 * - argument로 string 전달시 기본 출력할 수 있다.<br>
		 * - argument로 Object 전달시 메시지 옵션을 추가할 수 있다. 지원하는 옵션은 아래와 같다.<br>
		 *   message : string  (출력할 메시지)<br>
		 *   elapsed : boolean (경과시간 표시여부)<br>
		 *   dump    : Object  (개체 속성 나열)<br>
		 *   stack   : true    (call stack 표시여부)<br>
		 *   filter  : string  (로그 필터 지시자)<br><br>
		 * - logLevel이 3(info) 이상일 경우 buffer에 적재된다.<br>
		 * @public
		 * @param {string|object} msg 출력할 메시지 또는 옵션을 포함한 Object.
		 * @example
		 *
		 * Eco.Logger.info("정보 출력 !!!");
		 * // result : 2013-05-07 15:57:36.542 [info] Button06_onclick - 정보 출력 !!!
		 * 
		 * // stack = true 로 지정시 callstack 정보를 볼 수 있다
		 * this.Button07_onclick = function(obj:Button,  e:nexacro.ClickEventInfo)
		 * {
		 *     this.fn_step1("123");
		 * }		 
		 * this.fn_step1 = function(arg1)
		 * {
		 *     fn_step2(arg1, "456")
		 * }
		 * 
		 * this.fn_step2 = function(arg1, arg2)
		 * {
		 *     fn_step3(arg1, arg2, "789");
		 * }
		 * 
		 * this.fn_step3 = function(arg1, arg2, arg3)
		 * {
		 *     var msg = arg1 + arg2 + arg3;
		 *     Eco.Logger.info({message:msg, stack: true});
		 * }
		 * 
		 * // result : 2013-05-07 16:04:38.523 [info] fn_step3 - 123456789
		 * *****************PRINTING STACK************************
		 * Logger.fn_step3(string: 123, string: 456, string: 789)
		 *     Logger.fn_step2(string: 123, string: 456)
		 *         Logger.fn_step1(string: 123)
		 *             Logger.Button07_onclick(object: Button07, object: [object ClickEventInfo])
		 * *****************COMPLETE STACK************************
		 * @memberOf Eco.Logger
		 */		
		info: function(msg) 
		{
			Eco.Logger._logging(3, msg);
		},
		
		/**
		 * debug 레벨 로그를 남긴다.<br><br>
		 * - argument로 string 전달시 기본 출력할 수 있다.<br>
		 * - argument로 Object 전달시 메시지 옵션을 추가할 수 있다. 지원하는 옵션은 아래와 같다.<br>
		 *   message : string  (출력할 메시지)<br>
		 *   elapsed : boolean (경과시간 표시여부)<br>
		 *   dump    : Object  (개체 속성 나열)<br>
		 *   stack   : true    (call stack 표시여부)<br>
		 *   filter  : string  (로그 필터 지시자)<br><br>
		 * - logLevel이 4(debug) 이상일 경우 buffer에 적재된다.<br>
		 * @public
		 * @param {string|object} msg 출력할 메시지 또는 옵션을 포함한 Object.
		 * @example
		 *
		 * Eco.Logger.debug("디버깅 출력 !!!");
		 * // result : 2013-05-07 16:11:30.504 [debug] Button08_onclick - 디버깅 !!!
		 * 
		 * // filter 지정으로 특정 지시자에 해당하는 로그를 볼 수 있다.
		 * Eco.Logger.setFilter("Test1");
		 * 
		 * Eco.Logger.debug({message: "Filter 1 !!!", filter: "Test1"});
		 * // result : 2013-05-07 16:14:10.055 [debug] Button09_onclick - Filter 1 !!!
		 * Eco.Logger.debug({message: "Filter 2 !!!", filter: "Test2"});
		 * // result : 없음
		 *
		 * @memberOf Eco.Logger
		 */				
		debug: function(msg)
		{
			Eco.Logger._logging(4, msg);
		},
		
		/**
		 * Form에 존재하는 함수들의 debug정보를 구성한다.<br><br>
		 * 폼의 함수를 익명함수 형태로 하므로 본 함수를<br>
		 * 호출하지 않으면 anonymous function 으로 표시된다.<br>
		 * stack 기능을 사용하려면 이 함수가 호출되어야 한다.<br>
		 * @public
		 * @param {Form} form 대상 Form
		 * @example
		 * 
		 * Eco.Logger.setDebugInfoFunctions(this, false);
		 * 
		 * @memberOf Eco.Logger
		 */			
		setDebugInfoFunctions: function(form)
		{
			for ( var nm in form )
			{
				if ( form.hasOwnProperty(nm) && typeof form[nm] == "function" )
				{
					form[nm]._thisName = nm;
					form[nm]._thisOwner = form;
				}
			}
		}
		
	});
}
