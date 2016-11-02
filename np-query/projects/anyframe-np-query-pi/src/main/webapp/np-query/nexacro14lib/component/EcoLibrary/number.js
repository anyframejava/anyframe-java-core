/**
 * @fileoverview number 처리를 위한 함수.
 */

if ( !JsNamespace.exist("Eco.number") )
{
	/**
	 * @namespace
	 * @name Eco.number
	 * @memberof! <global>
	 */
	JsNamespace.declare("Eco.number", {
	
		/**
		 * 소수점 표시자 (locale에 따라 정의)
		 * @public
		 * @type string
		 * @example "." ==> "0.01"
		 * @memberOf Eco.number
		 */
		point: ".",

		/**
		 * 숫자 단위 구분 표시자 (locale에 따라 정의)
		 * @public
		 * @type string
		 * @example "," ==> "1,234"
		 * @memberOf Eco.number
		 */		
		separator: ",",
		
		/**
		 * 통화 표시에서 separator 규칙 정의 (locale에 따라 정의)
		 * @public
		 * @type string
		 * @example 
		 *  "\\3" ==> 10,000,000 
		 *  "\\1\\2\\3" ==> 1,000,00,0 
		 *  "\\3\\1" ==> 1,0,0,0,000
		 * @memberOf Eco.number
		 */			
		separatorGrouping: "\\3",
		
		/**
		* 주어진 number의 소수점 값을 정정한다.
		* @private
		* @param {number} value number
		* @return {number} 정정된 반올림 숫자
		* @memberOf Eco.number
		*/
		_adjustFloat: function(n)
		{
			return parseFloat(n.toPrecision(14));
		},
		
		/**
		* 주어진 number들의 소수점 값을 정정 처리.
		* @param {array} arguments . 예: [1660, -1559.9, 0.33]
		* @private
		* @return {number} 성공 = 결과값. 실패 = NaN
		* @memberOf Eco.number
		*/
		_getMaxPrecision: function(values) 
		{
			var maxPrecision = 0,
				currentPrecision,
				tempValue;
				total = 0,
				len = values.length;
				
			var adjustFloat = Eco.number._adjustFloat;
			for (var i = 0; i < len; i++) 
			{
				//trace(arg[i]);
				tempValue = adjustFloat(values[i]);
				currentPrecision = (tempValue.toString().match(/\.\d+/) || [''])[0].length;
				if (currentPrecision > maxPrecision) 
				{
					maxPrecision = currentPrecision;
				}
			}

			return maxPrecision;
		},
		

		/**
		* 소수점 이하 더하기 연산 처리가 부적합하게 처리되는 경우 정정처리 하기 위한 함수.<br>
		* arguments 들을 + 연산 처리하여 결과를 반환합니다.<br>
		* "일반용계산기(공학용아님)"와 동일한 더하기 결과를 반환합니다.<br><br>
		* javascript에서 아래 연산 처리하는 경우 발생되는 오류입니다.<br>
		* trace(0.1 + 0.2); // output : 0.30000000000000004<br>
		* Chrome, Safari, Firefox, IE8, Rutime 에서 모두 위와 같은 결과가 나온다.<br>
		* 이 놀라운 결과에 대한 몇가지 질문 :<br>
		* -. 이것이 bug인가?<br>
		* -. bug이면, 왜 해결하지 않는가?<br>
		* -. bug가 아니면, javascript language spec인가?<br>
		* 대답은 :<br>
		* javascript는 부동소수점 방식(floating point)으로 계산을 하며 IEEE Standard 754규격을 사용합니다.<br>
		* javascript는 실수의 변환을 위해 53bit의 연산을 합니다.<br>
		* 정수인 경우에는 해당 기억공간의 범위안에서 정확한 결과를 나타내는데,,<br>
		* 실수인 경우에는 기억공간의 범위를 벗어나는 결과가 나타나면 나머지수를 버립니다.<br>
		* 컴퓨터가 연산을 위해 소수점 이하의 자릿수를 이진수로 변환하는 과정에서,,<br>
		* 예를들어,<br>
		* 0.3 을 이진수로 바꾼다면,,<br>
		* 0.3 * 2 = 0.6<br>
		* 0.6 * 2 = 1.2<br>
		* 0.2 * 2 = 0.4<br>
		* 0.4 * 2 = 0.8<br>
		* 0.8 * 2 = 1.6<br>
		* 0.6.. <== 다시 0.6이 나와,, 0.0100110011001.... 와 같이 무한히 반복됩니다.<br>
		* 0.3의 이진수처럼 기억공간의 한계를 벗어나는 결과치가 나오는 경우에는<br>
		* 부정확한(최대한 가까운?) 연산을 하게 되는 것이지요.<br>
		* 따라서 Eco.number.plus 함수를 사용하여 처리합니다.
		* @param {...number} arguments . 예: (1660, -1559.9, 0.33) 
		* @return {number} 성공 = 결과값. 실패 = NaN ???
		* @example
		* var a = 0.1,
		*     b = 0.2;
		* trace(Eco.number.plus(a, b)); // output : 0.3
		* trace(1660 - 1559.9 + 0.33); // output : 100.42999999999991
		* trace(Eco.number.plus(1660, -1559.9, 0.33)); // output : 100.43
		* @memberOf Eco.number
		*/
		plus: function() 
		{
			var maxPrecision = 0,
				currentPrecision, 
				total = 0,
				len = arguments.length;

			maxPrecision = Eco.number._getMaxPrecision(arguments);
			maxPrecision = Math.pow(10, (maxPrecision - 1)); 

			for (i = 0; i < len; i++) 
			{
				total += (arguments[i] * maxPrecision);
			}
			
			return total / maxPrecision;
		},


		 /**
		 * 소수점 이하 나누기 연산 처리가 부적합하게 처리되는 경우 정정처리 하기 위한 함수.<br>
		 * arguments 들을 / 연산 처리하여 결과를 반환합니다.<br>
		 * "일반용계산기(공학용아님)"와 동일한 나누기 결과를 반환합니다.<br>
		 * 왜 필요하나? -> plus 함수 설명 내용 참조<br><br>
		 * The largest value JavaScript can express using floating point is <br>
		 * 1.7976931348623157E+10308 (10에 308승)<br>
		 * so anything bigger than that will be Infinity.
		 * @param {...number} arguments . 예: (1660, -1559.9, 0.33) 
		 * @return {number} 성공 = 결과값. 실패 = NaN ???
		 * @example
		 * trace(1660 - 1559.9 + 0.33); // output : -3.2247599399339895
		 * trace(Eco.number.divide(1660, -1559.9, 0.33)); // output : -3.22475993993399
		 * @memberOf Eco.number
		 */ 
		divide: function() 
		{
			var maxPrecision = 0;
			var total = 0;	
			var count = arguments.length -1;	
			var tempValues = [arguments[0]];
			var i=1;
			
			var pThis = Eco.number;
			var getMaxPrecision = pThis._getMaxPrecision;
			var adjustFloat = pThis._adjustFloat;
			do{
				tempValues.push(arguments[i]);
				
				i++;
				maxPrecision = Math.pow(10, (getMaxPrecision(tempValues) - 1));
				//정수로 만들고, 나누기 처리.
				for(var j=0; j<2; j++){
					tempValues[j] *= maxPrecision;
				}
				
				total = adjustFloat(tempValues[0]/tempValues[1]);
				total = (tempValues[0]/tempValues[1]);
				tempValues = [total];
				
			}while(--count);
			
			return total;
			
		},


		 /**
		 * 소수점 이하 곱하기 연산 처리가 부적합하게 처리되는 경우 정정처리 하기 위한 함수.<br>
		 * arguments 들을 * 연산 처리하여 결과를 반환합니다.<br>
		 * "일반용계산기(공학용아님)"와 동일한 곱하기 결과를 반환합니다.<br>
		 * 왜 필요하나? -> plus 함수 설명 내용 참조
		 * @param {...number} arguments . 예: (1660, -1559.9, 0.33) 
		 * @return {number} 성공 = 결과값. 실패 = NaN ???
		 * @example
		 * trace(1660*-1559.9*0.33); // output : -854513.2200000001
		 * trace(Eco.number.multiply(1660, -1559.9, 0.33)); // output : -854513.22
		 * @memberOf Eco.number
		 */ 
		multiply: function() 
		{
			var maxPrecision = 0;
			var total = 0;	
			var count = arguments.length -1;	
			var tempValues = [arguments[0]];
			var i=1;
			
			var pThis = Eco.number;
			var getMaxPrecision = pThis._getMaxPrecision;
			var adjustFloat = pThis._adjustFloat;		
			var resultPrecision = 0;
			do{
				tempValues.push(arguments[i]);
				
				//1*3을 할경우 2.9999~ 문제가 발생하여 resultPrecision 로직추가. 2014.12.04
				resultPrecision = getMaxPrecision(tempValues);
				
				if(resultPrecision == 0){
					maxPrecision = 1;
				} else {
					maxPrecision = Math.pow(10, (resultPrecision - 1));
				}
				
				//정수로 만들고, 곱하기 처리.
				for(var j=0; j<2; j++){
					tempValues[j] = adjustFloat(tempValues[j] * maxPrecision);
				}
				
				total = (tempValues[0]*tempValues[1]/Math.pow(maxPrecision, 2));
				
				
				tempValues = [total];
				
				i++;
				
			}while(--count);
			
			return total;
		},

		 /**
		 * 숫자를 한글로 표기.
		 * @param {number} val 숫자 
		 * @return {string} 문자열
		 * @example
		 * var val = 1200340500.01;
		 * var str = Eco.number.intToHanGul(val);
		 * trace(str); // output : 일십이억 삼십사만 오백  소수점 영일
		 * var val = 1200340500;
		 * var str = Eco.number.intToHanGul(val);
		 * trace(str); // output : 일십이억 삼십사만 오백
		 * @memberOf Eco.number
		 */ 	 
		intToHanGul: function(val)
		{
			if ( !Eco.isString(val) )
			{
				val = String(val);
			}

			var arrhn = ["영","일","이","삼","사","오","육","칠","팔","구"];
			var arrhj = ["","만","억","조","경","해"];
			var arrul = ["영천","영백","영십","영"];
			var arrtm = [];
			var sRtn  = "";
			var sTm2  = "";

			if (val.charAt(0) == "-") 
			{
				sRtn   = "마이너스 ";
				val = val.substr(1, val.length-1);
			}
			else if (val.charAt(0) == "+")
			{
				val = val.substr(1, val.length-1);
			}

			var nPoint = val.indexOf( '.' ),
				strNumber = "", bPoint, strDecimal = "";

			if( nPoint < 0 ) 
			{
				strNumber = val;
				bPoint = false;
			}
			else 
			{
				strNumber = val.substr( 0, nPoint);
				strDecimal = val.substr( nPoint + 1);
				bPoint = true;
			}

			var nSize = Math.ceil(strNumber.length/4);
			sTmpPrice = "";

			for (var i = strNumber.length; i >= 0; i--)
			{
				sTmpPrice += strNumber.substring(i, i-1);
			}
			
			strNumber = sTmpPrice;

			for (var i = 0; i < nSize; i++) 
			{
				sSum     = arrhj[i] + " ";
				arrtm[i] = strNumber.substr(i*4, 4);    
				sTm2     = "";

				for (var j = arrtm[i].length; j >= 0; j--)
				{
					sTm2 += arrtm[i].substring(j, j-1);      
				}

				arrtm[i] = sTm2;
				sPart 	 = arrtm[i].length;

				for (var j = 0; j < 10; j++) 
				{
					for (var k = 0; k < 10; k++) 
					{
						arrtm[i] = arrtm[i].replace(k, arrhn[k]);
					}
				}

				if (sPart == 4) 
				{
					arrtm[i] = arrtm[i].charAt(0) + "천" + arrtm[i].charAt(1) + "백" + arrtm[i].charAt(2)+"십"+arrtm[i].charAt(3);
				}
				else if (sPart == 3) 
				{
					arrtm[i] = arrtm[i].charAt(0) + "백" + arrtm[i].charAt(1) + "십" + arrtm[i].charAt(2);
				}
				else if (sPart == 2) 
				{
					arrtm[i] = arrtm[i].charAt(0) + "십"+arrtm[i].charAt(1);
				}
				else 
				{
					arrtm[i] = arrtm[i].charAt(0);
				}

				for (var j = 0; j < 4; j++) 
				{
					if (arrtm[i].match(arrul[j])) 
					{
						sPart--; 
						arrtm[i] = arrtm[i].replace(arrul[j], "");
					}
				}

				if (sPart != 0) 
				{
					arrtm[i] += sSum;
				}
			}

			for (nSize; nSize > -1; nSize--)
			{
				sRtn += arrtm[nSize];
			}

			sRtn = sRtn.replace("undefined","");
			if ( bPoint )
			{
				sRtn += " 소수점 ";
				for ( var i = 0, n = strDecimal.length ; i < n ; i++ )
				{
					sRtn += arrhn[parseInt(strDecimal.charAt(i))];
				}
			}
			return sRtn;
		},			


		 /**
		 * 숫자를 한자로 표기.
		 * @param {number} val 숫자 
		 * @return {string} 문자열
		 * @example
		 * var val = 1200340500.01;
		 * var str = Eco.number.intToHanJa(val);
		 * trace(str); // output : 壹拾貳億 參拾四萬 五百  小數點 零壹
		 * var val = 1200340500;
		 * var str = Eco.number.intToHanJa(val);
		 * trace(str); // output : 壹拾貳億 參拾四萬 五百 
		 * @memberOf Eco.number
		 */ 	 
		intToHanJa: function(val)
		{
			if ( !Eco.isString(val) )
			{
				val = String(val);
			}

			var arrhn = ["零","壹","貳","參","四","五","六","七","八","九"];
			var arrhj = ["","萬","億","兆"];
			var arrul = ["零千","零百","零拾","零"];
			var arrtm = [];
			var sRtn  = "";
			var sTm2  = "";

			if (val.charAt(0)=="-") 
			{
				sRtn   = "陰數"; //"마이너스 ";
				val = val.substr(1, val.length-1);
			}
			else if (val.charAt(0) == "+")
			{
				val = val.substr(1, val.length-1);
			}

			var nPoint = val.indexOf( '.' ),
				strNumber = "", bPoint, strDecimal = "";

			if( nPoint < 0 ) 
			{
				strNumber = val;
				bPoint = false;
			}
			else 
			{
				strNumber = val.substr( 0, nPoint);
				strDecimal = val.substr( nPoint + 1);
				bPoint = true;
			}			

			var nSize = Math.ceil(strNumber.length/4);
			sTmpPrice = "";
			
			for (var i = strNumber.length; i >= 0; i--)
			{
				sTmpPrice += strNumber.substring(i, i-1);
			}	
			strNumber = sTmpPrice;
			
			for (var i = 0; i < nSize; i++) 
			{
				sSum     = arrhj[i] + " ";
				arrtm[i] = strNumber.substr(i*4, 4);		
				sTm2     = "";
				
				for (var j = arrtm[i].length; j >= 0; j--)
				{
					sTm2 += arrtm[i].substring(j, j-1);
				}

				arrtm[i] = sTm2;
				sPart    = arrtm[i].length;
				
				for (var j = 0; j < 10; j++) 
				{
					for (var k = 0; k < 10; k++) 
					{
						arrtm[i] = arrtm[i].replace(k, arrhn[k]);
					}
				}

				if (sPart == 4) 
				{	
					arrtm[i] = arrtm[i].charAt(0) + "千" + arrtm[i].charAt(1) + "百" + arrtm[i].charAt(2) + "拾"+arrtm[i].charAt(3);
				}
				else if (sPart == 3) 
				{
					arrtm[i] = arrtm[i].charAt(0) + "百" + arrtm[i].charAt(1) + "拾" + arrtm[i].charAt(2);
				}
				else if (sPart == 2) 
				{
					arrtm[i] = arrtm[i].charAt(0) + "拾" + arrtm[i].charAt(1);
				}
				else 
				{
					arrtm[i] = arrtm[i].charAt(0);
				}
				
				for (var j = 0; j < 4; j++) 
				{
					if (arrtm[i].match(arrul[j])) 
					{
						sPart--; 
						arrtm[i] = arrtm[i].replace(arrul[j], "");
					}
				}
				
				if (sPart != 0) 
				{
					arrtm[i] += sSum;
				}
			}

			for (nSize; nSize > -1; nSize--) 
			{
				sRtn += arrtm[nSize];
			}
			
			sRtn = sRtn.replace("undefined","");

			if ( bPoint )
			{
				sRtn += " 小數點 ";
				for ( var i = 0, n = strDecimal.length ; i < n ; i++ )
				{
					sRtn += arrhn[parseInt(strDecimal.charAt(i))];
				}
			}
			return sRtn;
		},

		/**
		* 파일 사이즈 환산.
		* @param {number} bytes 파일 사이즈(byte 단위)
		* @param {number=} precision 정밀도(default : 1)
		* @param {boolean=} unit 파일단위(KB,MB,...) 포함여부(default : true).
		* @return {number|string} 파일 사이즈(소수점 1자리 포함).
		* @example
		* var size = 1023405670,
		*     precision = 2,
		*     unit = false;
		* var result = Eco.number.bytesToSize(size, precision, unit);
		* trace(result); // output : 976.00
		* result = Eco.number.bytesToSize(size, 0);
		* trace(result); // output : 976 MB
		* result = Eco.number.bytesToSize(size);
		* trace(result); // output : 976.0 MB
		* @memberOf Eco.number
		*/	
		bytesToSize: function(bytes, precision, unit) 
		{
			if(precision === null || precision === undefined || precision === "") precision = 1;

			if(unit !== false) unit = true;
			
			var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
			var i = 0;
			while(bytes >= 1024) 
			{
				bytes /= 1024;
				++i;
			}
			
			if(!unit)
			{
				return bytes.toFixed(precision);
			} 
			else 
			{
				if ( precision > 0 )
				{
					return bytes.toFixed(precision) + ' ' + units[i];
				}
				else
				{
					return Math.round(bytes) + ' ' + units[i];
				}
			}
			
		},	

		/**
		* 반올림할 자리의 값이 1~4인 경우는 버리고, 6~9인 경우는 올림 처리한다.<br>
		* 5의 경우 그 앞자리 값이 짝수이면 버리고, 홀수이면 올림 처리한다.<br>
		* 편중 오차를 최소화하는 방법 중의 하나로 Banker's Rounding을 사용하는 것입니다.
		* @param {number} value 변환할 값.
		* @param {number} length 소수부.
		* @return {number} 
		* @example
		* alert(Eco.number.evenRound(1.5)); // 2
		* alert(Eco.number.evenRound(2.5)); // 2
		* alert(Eco.number.evenRound(1.535, 2)); // 1.54
		* alert(Eco.number.evenRound(1.525, 2)); // 1.52
		* @memberOf Eco.number
		*/		
		evenRound: function(num, decimalPlaces)
		{
			var d = decimalPlaces || 0;
			var m = Math.pow(10, d);
			var n = +(d ? num * m : num).toFixed(8); // Avoid rounding errors
			var i = Math.floor(n), f = n - i;
			var r = (f == 0.5) ? ((i % 2 == 0) ? i : i + 1) : Math.round(n);
			return d ? r / m : r;
		},
		
		/**
		 * mask format cache.
		 * @private
		 * @memberOf Eco.date
		 */
		_numberMaskCache: {},		
		
		/**
		 * mask format 변환 정보 반환.
		 * @private
		 * @param {string} strMask mask할 format 문자열.
		 * @return {array} mask format 변환 정보
		 * @memberOf Eco.number
		 */	
		_parseNumberMask: function(strMask)
		{
			var pThis = Eco.number;
			
			var res = pThis._numberMaskCache[strMask];
			if ( res ) return res;
		
			var dispComma = false,
				nMin = 0,
				nMax = 0,
				nDecimalMin = -1,
				nDecimalMax = 0;

			strMask = nexacro.trimLeft(strMask);

			if (strMask.length <= 0 ) 
			{
				return [dispComma, nMin, nMax, nDecimalMin, nDecimalMax];
			}

			nDecimalMax = 0;
			nDecimalMin = 0;
			dispComma = (strMask.indexOf(",") >= 0);

			var c,
				bFindPoint = false;

			for( var i = 0, n = strMask.length; i < n; i++ ) 
			{
				c = strMask.charAt(i);
				if ( c == '.' )
				{
					bFindPoint = true;
				}
				else if ( c == '#' || c == '0' || c == '9' || c == ',' ) 
				{
					if ( bFindPoint ) 
					{
						if ( c == '0' ) 
						{
							nDecimalMax++;
							nDecimalMin = nDecimalMax;
						}
						else
						{
							nDecimalMax++;
						}
					}
					else 
					{
						if ( c == '0' )
						{
							nMin++;
						}
						else if ( nMin > 0)
						{
							nMin++;
						}
						nMax++;
					}
				}
			}// end of for.
			
			res = [dispComma, nMin, nMax, nDecimalMin, nDecimalMax];
			pThis._numberMaskCache[strMask] = res;
			return res;
		},

		/**
		 * 숫자형 문자에서 부호, 소수점, 정수부, 소수부 분리.
		 * @private
		 * @param {string} strText 숫자형 문자.
		 * @return {array} 분리 정보
		 * @memberOf Eco.number
		 */	
		_numberSplit: function(strText) 
		{
			var pThis = Eco.number;
		
			// 부호 분리.
			var nBegin = 0, nSign;
			if( (nBegin = strText.indexOf('+')) >= 0 ) 
			{
				nSign = +1;
				nBegin = 1;
			}
			else if( (nBegin = strText.indexOf('-')) >= 0 ) 
			{
				nSign = -1;
				nBegin = 1;
			}
			else 
			{
				nSign = 0;
				nBegin = 0;
			}

			var nPoint = strText.indexOf( pThis.point ,nBegin ),
				strNumber = "", bPoint, strDecimal = "";
			if( nPoint < 0 ) 
			{
				strNumber = strText.substr( nBegin );
				bPoint = false;
			}
			else 
			{
				strNumber = strText.substr( nBegin, nPoint - nBegin);
				strDecimal = strText.substr( nPoint + 1);
				bPoint = true;
			}
			return [nSign, bPoint, strNumber, strDecimal];
		},

		/**
		 * mask 제거.
		 * @private
		 * @param {string} strText 숫자형 문자.
		 * @return {string} 변환된 문자열
		 * @memberOf Eco.number
		 */	
		_removeMask: function(str) 
		{
			var pThis = Eco.number;
			
			str = str.trim();
			var ntxtLen = str.length,
				i,
				pointVal = pThis.point,
				separatorVal = pThis.separator;
				bPoint = false, // 소숫점은 1개만 인정.
				bInside = false, // 부호는 숫자가 나오기 전에만 인정.
				buf = [];
			for(i = 0 ; i < ntxtLen ; i++ ) 
			{
				var c = str.charAt(i);
				if( ( c == '+' || c == '-') && ( bInside === false) ) 
				{
					// 부호는 숫자가 나오기 전에만 인정.
					buf.push(c);
					bInside = true;
				}
				else if( nexacro.isNumeric(c) ) 
				{
					// 숫자인경우 인정.
					buf.push(c);
					bInside = true;
				}
				else if( c == pointVal && bPoint === false ) 
				{
					// 소숫점은 1회만 인정.
					buf.push(c);
					bPoint = true;
					bInside = true;
				}
				else if( c != separatorVal ) 
				{
					return "";
				}
			}
			return buf.join("");
		},

		/**
		 * 숫자 단위 적용.
		 * @private
		 * @param {string} strNumber 숫자형 문자.
		 * @return {string} 변환된 문자열
		 * @memberOf Eco.number
		 */
		_applyComma: function(strNumber) 
		{
			// 차후에 locale 처리 필요.
			
			var pThis = Eco.number;
			
			var grouping = pThis.separatorGrouping;
			var thousands_sep = pThis.separator;
			if( thousands_sep.length > 0 )
			{
				var	dec_buf = strNumber.split(""),
					dec_size = strNumber.length,
					out_size = (thousands_sep.length + 1) * strNumber.length,
					out_buf = [],
					cur_group = 0, d_size = dec_size,
					endpos = out_size,
					groupingIdx = 0,
					g;

				grouping = grouping.split("");

				while (grouping[groupingIdx] && d_size > 0 ) 
				{	
					g = grouping[groupingIdx];
					if ( g == "\\" ) 
					{
						groupingIdx++;
						g = parseInt(grouping[groupingIdx]);
					}
					if (g > 0 ) 
					{
						cur_group = g;
						while (g-- > 0 && d_size > 0)
							out_buf[--endpos] = dec_buf[--d_size];
						if (d_size > 0)
							out_buf[--endpos] = thousands_sep;
					}
					else if (g == 0 && d_size > cur_group) 
					{
						g = cur_group;
						while (g-- > 0)
							out_buf[--endpos] = dec_buf[--d_size];
						if (d_size > 0)
							out_buf[--endpos] = thousands_sep;
					}
					else if (g == 0 && d_size <= cur_group && d_size > 0 ) 
					{
						g = d_size;
						while (g-- > 0)
							out_buf[--endpos] = dec_buf[--d_size];
					}
					else 
					{
						break;
					}
				}
				return out_buf.slice(endpos,out_size + endpos).join("");
			}
			return strNumber;
		},

		/**
		 * 숫자형 변환
		 * @private
		 * @param {string} strValue 숫자형 문자.
		 * @param {boolean} bTrim 공백제거 여부.
		 * @return {string} 변환된 문자열.
		 * @memberOf Eco.number
		 */	
		_normalizeValue: function(strValue, bTrim) 
		{
			var pThis = Eco.number;
			
			if (strValue.length<=0) return strValue;
			if ( bTrim === undefined ) bTrim = true;
				
			// 좌우 공백 제거, 마스크 제거.
			strValue = pThis._removeMask(strValue);
			// 정규형식으로 만듬.
			if( strValue.charAt( strValue.length -1 ) == pThis.point )
				strValue = strValue + "0";

			if(bTrim) 
			{
				// 0 Trim 하기 전에 부호 있는 경우 주의.
				var bSign = ( strValue.charAt(0) == '-' ) ? 1 : 0;
				var pointVal = pThis.point;

				// 0000~~ 에 대해서 첫 자리 0을 삭제
				// -0000~~ 에 대해서 부호 뒷 자리 0을 삭제.
				while( strValue.charAt( 0+bSign ) == '0' 
						&& strValue.charAt( 1+bSign ) != pointVal
						&& strValue.length != (1+bSign) ) 
				{
						strValue = strValue.substring(0, 0+bSign) + strValue.substr(0+bSign+1, strValue.length);
				}
				// .~~0000에 대해서 0을 Trim
				var nPoint = strValue.indexOf(pointVal);
				if( nPoint >= 0 ) 
				{
					var i;
					for( i = strValue.length - 1 ; i > nPoint+1 ; i -- ) 
					{
						if( strValue.charAt( i ) != '0' )
								break;
					}
					strValue = strValue.substring(0, i + 1 );
				}
			}

			// 부호에 대해 정규형으로.
			if( strValue.charAt(0) == '+' ) 
			{
				strValue = strValue.substr(1);
			}
			else if( strValue.length <= 0 || parseFloat(strValue) == 0.0 ) 
			{
				// 값이 0.0인경우 부호 제거.
				if( strValue.charAt(0) == '-' )
					strValue = strValue.substr(1);
			}
			return strValue;
		},
		
		/**
		 * 주어진 숫자 형식값에 Mask Format 처리된 문자열을 반환합니다.
		 * @param {string|number} value 숫자형식 값
		 * @param {string} strMask mask할 format 문자열.
		 * @return {string} 변환된 문자열.
		 * @example
		 * var val = 1234.567;
		 * var result = Eco.number.getMaskFormatString(val, "99.99");
		 * trace(result); // output : 1234.56
		 * result = Eco.number.getMaskFormatString(val, "9900.0099");
		 * trace(result); // output : 1234.567
		 * result = Eco.number.getMaskFormatString(val, "9,999.9");
		 * trace(result); // output : 1,234.5
		 *
		 * val = 1.2;
		 * result = Eco.number.getMaskFormatString(val, "99.99");
		 * trace(result); // output : 1.2
		 * result = Eco.number.getMaskFormatString(val, "9900.0099");
		 * trace(result); // output : 01.20
		 * result = Eco.number.getMaskFormatString(val, "9,999.9");
		 * trace(result); // output : 1.2
		 * @memberOf Eco.number
		 */		
		getMaskFormatString: function(value, strMask)
		{
			var pThis = Eco.number;
			
			var strText = value + "";
			strText = pThis._normalizeValue(strText, true);

			var nDecimalLen = 0;		// 소수부 길이.
			var nIntegerLen = 0;		// 정수부 길이.

			// Split : value를 정수부, 소수부로 나누고 소수점 유무, 양음부호부 까지 판별한다.
			var ret = pThis._numberSplit(strText),
				nSign = ret[0],
				bPoint = ret[1],
				strNumber = ret[2],
				strDecimal = ret[3];

			// 각 부분의 길이구함.
			nIntegerLen = strNumber.length;
			nDecimalLen = strDecimal ? strDecimal.length : 0;

			var maskInfo = pThis._parseNumberMask(strMask),
				dispComma = maskInfo[0],
				nMin = maskInfo[1],
				nMax = maskInfo[2],
				nDecimalMin = maskInfo[3],
				nDecimalMax = maskInfo[4];

			if (nMin > nIntegerLen) 
			{
				var tmpStr = "";
				for(var i=0, n =  nMin - nIntegerLen; i < n ; i++) 
				{
					tmpStr += "0";
				}
				strNumber = tmpStr + strNumber;
			}

			if (nDecimalMin > nDecimalLen) 
			{
				var tmpStr = "";
				for(var i=0, n = nDecimalMin - nDecimalLen; i < n ; i++) 
				{
					tmpStr += "0";
				}
				strDecimal = strDecimal + tmpStr;
			}
			else if ( nDecimalMax != -1 && nDecimalMax < nDecimalLen) 
			{
				strDecimal = strDecimal.substring(0, nDecimalMax) + strDecimal.substr(nDecimalLen, strDecimal.length);
			}
			// 정수부분에 Comma적용.
			if(  dispComma )
				strNumber = pThis._applyComma(strNumber);

			if( nSign < 0 ) strText = "-";
			else if( nSign > 0) strText = "+";
			else	strText = "";

			// 정수부.
			strText += strNumber;

			// 소수부.
			if( strDecimal.length > 0 ) 
			{
				strText += pThis.point;
				strText += strDecimal;
			}
			return strText;
		}		

	
	});
}  