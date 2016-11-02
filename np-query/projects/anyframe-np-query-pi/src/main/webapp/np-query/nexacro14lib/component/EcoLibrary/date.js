/**
 * @fileoverview Date 처리를 위한 함수.
 */

if ( !JsNamespace.exist("Eco.date") )
{
	/**
	 * @namespace
	 * @name Eco.date
     * @memberof! <global>
	 */
	JsNamespace.declare("Eco.date", {
		
		/**
		 * 요일명칭 정의.<br>
		 * getMaskFormatString 함수에서 masking 할때 사용하는 명칭이다.<br>
		 * 필요에 따라 수정 하여 사용한다.
		 * @example : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
		 * @public
		 * @type array
		 * @memberOf Eco.date
		 */			
		weekName: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
		//weekName: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],				
		
		/**
		 * 축약 요일명칭 정의.<br>
		 * getMaskFormatString 함수에서 masking 할때 사용하는 명칭이다.<br>
		 * 필요에 따라 수정 하여 사용한다.
		 * @example
		 * ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
		 * @public
		 * @type array
		 * @memberOf Eco.date
		 */	
		weekShortName: ["일", "월", "화", "수", "목", "금", "토"],
		//weekShortName: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],		
		
		/**
		 * 월명칭 정의.<br>
		 * getMaskFormatString 함수에서 masking 할때 사용하는 명칭이다.<br>
		 * 필요에 따라 수정 하여 사용한다.
		 * @example
		 * ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
		 * @public
		 * @type array
		 * @memberOf Eco.date
		 */	
		monthName: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
		//monthName: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		
		/**
		 * 축약 월명칭 정의.<br>
		 * getMaskFormatString 함수에서 masking 할때 사용하는 명칭이다.<br>
		 * 필요에 따라 수정 하여 사용한다.
		 * @example
		 * ["Jan ", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
		 * @public
		 * @type array
		 * @memberOf Eco.date
		 */	
		monthShortName: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
		//monthShortName: ["Jan ", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		
		/**
		 * 오전/오후.<br>
		 * getMaskFormatString 함수에서 masking 할때 사용하는 명칭이다.<br>
		 * 필요에 따라 수정 하여 사용한다.
		 * @example
		 * ["AM", "PM"]
		 * @public
		 * @type array
		 * @memberOf Eco.date
		 */	
		ttName: ["오전", "오후"],
		//ttName: ["AM", "PM"],
		
		/**
		 * 입력된 날짜에 OffSet으로 지정된 만큼의 날짜를 증감한다.
		 * @param {string|date} value 'yyyyMMdd'형태로 표현된 String 또는 Date.
		 * @param {number} offset 일단위 증가(또는 감소값).
		 * @return {string|date} 'yyyyMMdd'형태로 표현된 String 또는 Date Value.
		 * @example
		 * // 2013/04/29 16:39:04 test함. 
		 * trace(Eco.date.addDate(new Date(), 3)); // output : Thu May 02 2013 16:39:04 GMT+0900
		 * var val = Eco.date.getMaskFormatString(new Date(), "yyyyMMdd");
		 * trace(Eco.date.addDate(val, 3)); // output : 20130502 
		 * @memberOf Eco.date
		 */
		addDate: function(value, offset) 
		{
			var dt;
			if ( Eco.isDate(value) )
			{
				dt = new Date();
				dt.setFullYear(value.getFullYear(), value.getMonth(), value.getDate() + offset);
				dt.setHours(value.getHours(), value.getMinutes(), value.getSeconds());
				dt.setMilliseconds(value.getMilliseconds());
				
				return dt;
			}
			else
			{
				dt = new Date();
				dt.setFullYear(parseInt(value.substr(0, 4)), parseInt(value.substr(4, 2)-1), parseInt(value.substr(6, 2)) + offset);
				dt.setHours(0, 0, 0);
				dt.setMilliseconds(0);
				return Eco.date.getMaskFormatString(dt, "yyyyMMdd");
			}
		},

		/**
		 * 입력된 날짜에 OffSet 으로 지정된만큼의 월을 증감한다.
		 * @param {string | date} value 'yyyyMMdd' 형태로 표현된 String 또는 Date.
		 * @param {number} offset 월단위 증가(또는 감소값).
		 * @return {string | date} 'yyyyMMdd' 형태로 표현된 String 또는 Date Value.
		 * @example
		 * var dt = Eco.date.strToDate("20130331");
		 * var dt0 = Eco.date.addMonth(dt, 1);
		 * trace(dt0); // output : Tue Apr 30 2013 00:00:00 GMT+0900
		 * var str1 = "20130331";
		 * var str = Eco.date.addMonth(str1, 1);
		 * trace(str); // output : 20130430 
		 * @memberOf Eco.date
		 */
		addMonth: function(value, offset) 
		{
			var pThis = Eco.date;
			var dt;
			if ( Eco.isDate(value) )
			{
				var nTmpday = value.getDate();
				dt = new Date();
				dt.setFullYear(value.getFullYear(), value.getMonth() + offset, value.getDate());
				dt.setHours(value.getHours(), value.getMinutes(), value.getSeconds());
				dt.setMilliseconds(value.getMilliseconds());
				if ( dt.getDate() != nTmpday )
				{
					dt.setMonth(dt.getMonth() - 1);
					dt.setDate(pThis.getLastDayOfMonth(dt));
				}
				return dt;
			}
			else
			{
				var nTmpday = parseInt(value.substr(6, 2));
				dt = new Date();
				dt.setFullYear(parseInt(value.substr(0, 4)), parseInt(value.substr(4, 2)-1) + offset, nTmpday);
				dt.setHours(0, 0, 0);
				dt.setMilliseconds(0);
				if ( dt.getDate() != nTmpday )
				{
					dt.setMonth(dt.getMonth() - 1);
					dt.setDate(pThis.getLastDayOfMonth(dt));
				}
				return pThis.getMaskFormatString(dt, "yyyyMMdd");
			}
		},

		/**
		 * 두 일자 사이의 일 수 계산.
		 * @param {date | string} fromDate Date Object 또는 yyyyMMdd형태의 시작일자.
		 * @param {date | string} toDate Date Object 또는 yyyyMMdd형태의 종료일자.
		 * @return {number} 두 일자 사이의 일 수. 단, 종료일자가 시작일자보다 작으면 음수가 return된다.
		 * @example
		 * var fromdt = Eco.date.strToDate("20120331");
		 * var todt = Eco.date.strToDate("20130420");
		 * var day = Eco.date.getDiffDay(fromdt, todt);
		 * trace(day); // output : 385
		 * var fromstr = "20120331";
		 * var tostr = "20130420";
		 * var day = Eco.date.getDiffDay(fromstr, tostr);
		 * trace(day); // output : 385
		 * @memberOf Eco.date
		 */
		getDiffDay: function(fromDate, toDate)
		{
			var pThis = Eco.date;
			
			if(Eco.isString(fromDate) && Eco.isString(toDate))
			{
				fromDate = new Date(parseInt(fromDate.substring(0,4),  10), parseInt(fromDate.substring(4,6)-1,  10), parseInt(fromDate.substring(6,8), 10));
				toDate   = new Date(parseInt(toDate.substring(0,4),  10), parseInt(toDate.substring(4,6)-1,  10), parseInt(toDate.substring(6,8), 10));
			}

			var flag = 1, nDay;
			if ( fromDate >  toDate )
			{
				flag = -1;
				var tmpDt = toDate;
				toDate = fromDate;
				fromDate = tmpDt;
			}

			if (fromDate.getFullYear() != toDate.getFullYear() )
			{
				nDay = (pThis.isLeapYear(fromDate.getFullYear()) ? 366 : 365) - pThis.getDayOfYear(fromDate) + pThis.getDayOfYear(toDate);
				var nYear = fromDate.getFullYear();
				while (nYear++ < toDate.getFullYear() - 1)
				{
					nDay = nDay + (pThis.isLeapYear(nYear) ? 366 : 365);
				}
			}
			else
			{
				nDay = pThis.getDayOfYear(toDate) - pThis.getDayOfYear(fromDate);
			}
			return nDay*flag;
		},

		/**
		 * 두 일자 사이의 월 수 계산.(정확한 달수를 처리하려면 fromDate Day값을 1로 하고 toDate를 마지막일자로 처리하여야 한다.)<br>
		 * 시작일자의 Day값이 1이 아니면 소수점((마지막일자 - 해당월의 일수)/마지막일자)으로 계산한다.<br>
		 * 종료일자의 Day값이 마지막일자가 아니면 소수점(해당월의 일수/마지막일자)으로 계산한다.
		 * @param {date | string} fromDate Date Object 또는 yyyyMMdd형태의 시작일자.
		 * @param {date | string} toDate Date Object 또는 yyyyMMdd형태의 종료일자.
		 * @return {number} 두 일자 사이의 월 수. 단, 종료일자가 시작일자보다 작으면 음수가 return된다.
		 * @example
		 * var fromdt = Eco.date.strToDate("20130301");
		 * var todt = Eco.date.strToDate("20130501");
		 * var month = Math.ceil(Eco.date.getDiffMonth(fromdt, todt));
		 * trace(month); // output : 3
		 * var fromstr = "20120331";
		 * var tostr = "20130420";
		 * var month = Eco.date.getDiffMonth(fromstr, tostr);
		 * trace(month); // output : 12.69
		 * @memberOf Eco.date
		 */
		getDiffMonth: function(fromDate, toDate)
		{
			var pThis = Eco.date;
			
			if(Eco.isString(fromDate) && Eco.isString(toDate))
			{
				fromDate = new Date(parseInt(fromDate.substring(0,4),  10), parseInt(fromDate.substring(4,6)-1,  10), parseInt(fromDate.substring(6,8), 10));
				toDate   = new Date(parseInt(toDate.substring(0,4),  10), parseInt(toDate.substring(4,6)-1,  10), parseInt(toDate.substring(6,8), 10));
			}

			var flag = 1, nMonth, nDay;
			if ( fromDate >  toDate )
			{
				flag = -1;
				var tmpDt = toDate;
				toDate = fromDate;
				fromDate = tmpDt;
			}

			if ( fromDate.getDate() == 1 )
			{
				nMonth = 1;
				nDay = 0;
			}
			else
			{
				nMonth = 0;
				var lastday = pThis.getLastDayOfMonth(fromDate);
				nDay = Math.floor(( lastday - fromDate.getDate() + 1)/lastday, 2);
			}

			if ( toDate.getDate() == pThis.getLastDayOfMonth(toDate) )
			{
				nMonth += 1;
			}
			else
			{
				nDay += Math.floor(toDate.getDate()/pThis.getLastDayOfMonth(toDate), 2);
			}

			if (fromDate.getFullYear() != toDate.getFullYear() )
			{
				nMonth += 12 - (fromDate.getMonth() + 1) + toDate.getMonth();
				var nYear = fromDate.getFullYear();
				while (nYear++ < toDate.getFullYear() - 1)
				{
					nMonth = nMonth + 12;
				}
			}
			else
			{
				nMonth += toDate.getMonth() - (fromDate.getMonth() + 1);
			}
			return (nMonth + nDay)*flag;
		},

		/**
		 * 해당월의 마지막 날짜를 숫자로 구하기.
		 * @param {number | string} value 'yyyyMMdd' 형태의 날짜.
		 * @return {number} 마지막 날짜 숫자값.
		 * @example
		 * var dt = Eco.date.strToDate("20120302"); // convert Date type from "20120302".
		 * var day = Eco.date.getLastDayOfMonth(dt);
		 * trace(day); // output : 31
		 * var dtstr = "20120302";
		 * var day = Eco.date.getLastDayOfMonth(dtstr);
		 * trace(day); // output : 31
		 * @memberOf Eco.date
		 */
		getLastDayOfMonth: function(value) 
		{
			var nMonth, nLastDate;

			if ( Eco.isDate(value) )
			{
				nMonth = value.getMonth() + 1;
			}
			else
			{
				nMonth = parseInt(value.substr(4,2), 10);
			}
			if( nMonth == 1 || nMonth == 3 || nMonth == 5 || nMonth == 7  || nMonth == 8 || nMonth == 10 || nMonth == 12 ) 
			{
				nLastDate = 31;
			} 
			else if( nMonth == 2 ) 
			{
				if( Eco.date.isLeapYear(value) == true ) 
				{
					nLastDate = 29;
				} 
				else 
				{
					nLastDate = 28;
				}
			} 
			else 
			{
				nLastDate = 30;
			}
				
			return nLastDate;
		},

		/**
		 * yyyyMMdd 형태의 날짜를 입력하면 해당연도의 날짜에 해당하는 주차반환.
		 * @param {date|string} date Date Object 또는 날짜형 문자열.
		 * @return {number} 주차에 해당하는 숫자.
		 * @example
		 * var dt = Eco.date.strToDate("20130331"); // convert Date type from "20130331".
		 * var week = Eco.date.getWeekOfYear(dt);
		 * trace(week); // output : 14
		 * var dtstr = "20130331";
		 * var week = Eco.date.getWeekOfYear(dt);
		 * trace(week); // output : 14
		 * @memberOf Eco.date
		 */
		getWeekOfYear: function(date)
		{
			if ( Eco.isString(date) )
			{
				date = this.strToDate(date);
			}
			if ( !Eco.isDate(date) )
			{
				return -1;
			}
			
			var onejan = new Date();
			
			onejan.setYear(date.getFullYear());
			onejan.setMonth(0);
			onejan.setDate(1);	
									
			return Math.ceil((((date - onejan) / 86400000) + onejan.getDay()+1)/7);
		},

		/**
		 * 월별 일자 Offset.
		 * @private
		 * @memberOf Eco.date
		 */
		_dayOfYearOffset: [0, 
							31, 
							31 + 28, 
							31 + 28 + 31, 
							31 + 28 + 31 + 30, 
							31 + 28 + 31 + 30 + 31, 
							31 + 28 + 31 + 30 + 31 + 30, 
							31 + 28 + 31 + 30 + 31 + 30 + 31, 
							31 + 28 + 31 + 30 + 31 + 30 + 31 + 31, 
							31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30, 
							31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31, 
							31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30],

		/**
		 * 해당연도의 1월 1일부터 날짜까지의 일 수 반환.
		 * @param {date|string} date Date Object 또는 날짜형 문자열.
		 * @return {number} 일 수.
		 * @example
		 * var dt = Eco.date.strToDate("20130420"); // convert Date type from "20130420".
		 * var days = Eco.date.getDayOfYear(dt);
		 * trace(days); // output : 110
		 * var dtstr = "20130420";
		 * var days = Eco.date.getDayOfYear(dtstr);
		 * trace(days); // output : 110
		 * @memberOf Eco.date
		 */
		getDayOfYear: function(date)
		{
			var pThis = Eco.date;
			
			if ( Eco.isString(date) )
			{
				date = pThis.strToDate(date);
			}
			
			if ( !Eco.isDate(date) )
			{
				Eco.Logger.error({"message":"invalid date", "stack":true});
			}
			
			var nDay = pThis._dayOfYearOffset[date.getMonth()] + date.getDate();
			if (pThis.isLeapYear(date.getFullYear()))
			{
				nDay = nDay + 1;
			}
			return nDay;
		},	

		
		/**
		 * yyyy, yyyyMM, yyyyMMdd, yyyyMMddhh, yyyyMMddhhmm, yyyyMMddhhmmss 형태의 문자열을 Date객체로 반환.
		 * @param {string} value 날짜 문자열.
		 * @return {date} Date Object.
		 * @example
		 * var dt = Eco.date.strToDate("20120331"); // convert Date type from "20120331".
		 * trace(dt); // output : Sat Mar 31 2012 00:00:00 GMT+0900
		 * var dt = Eco.date.strToDate("20130320123022"); // convert Date type from "20130320123022".
		 * trace(dt); // output : Wed Mar 20 2013 12:30:22 GMT+0900
		 * @memberOf Eco.date
		 */
		strToDate: function(value) 
		{
			var dt = new Date();
			if ( value.length == 4 ) //yyyy
			{
				dt.setFullYear(parseInt(value), 0, 0);
				dt.setHours(0, 0, 0);
				dt.setMilliseconds(0);
			}
			else if ( value.length == 6 ) //yyyyMM
			{
				dt.setFullYear(parseInt(value.substr(0,4)), parseInt(value.substr(4,2))-1, 0);
				dt.setHours(0, 0, 0);
				dt.setMilliseconds(0);
			}
			else if ( value.length == 8 ) //yyyyMMdd
			{
				dt.setFullYear(parseInt(value.substr(0,4)), parseInt(value.substr(4,2))-1, parseInt(value.substr(6,2)));
				dt.setHours(0, 0, 0);
				dt.setMilliseconds(0);
			}
			else if ( value.length == 10 ) //yyyyMMddhh
			{
				dt.setFullYear(parseInt(value.substr(0,4)), parseInt(value.substr(4,2))-1, parseInt(value.substr(6,2)));
				dt.setHours(parseInt(value.substr(8,2)), 0, 0);
				dt.setMilliseconds(0);
			}
			else if ( value.length == 12 )//yyyyMMddhhmm
			{
				dt.setFullYear(parseInt(value.substr(0,4)), parseInt(value.substr(4,2))-1, parseInt(value.substr(6,2)));
				dt.setHours(parseInt(value.substr(8,2)), parseInt(value.substr(10,2)), 0);
				dt.setMilliseconds(0);
			}
			else if ( value.length == 14 ) //yyyyMMddhhmmss
			{
				dt.setFullYear(parseInt(value.substr(0,4)), parseInt(value.substr(4,2))-1, parseInt(value.substr(6,2)));
				dt.setHours(parseInt(value.substr(8,2)), parseInt(value.substr(10,2)), parseInt(value.substr(12,2)));
				dt.setMilliseconds(0);
			}
			return dt;
		},	
		
		/**
		 * 윤년 여부.
		 * @param {string|date|nexacro.Date} value yyyyMMdd 형태의 날짜(문자열).<br>
		 *                                   JavaScript Date.<br>
		 *                                   Dataset의 컬럼타입이 DATE인 컬럼값.
		 * @return {boolean} 윤년 여부(입력되지 않은 경우는 false).
		 * @example
		 * var yyyy = 20120301;
		 * var flag = Eco.date.isLeapYear(yyyy);
		 * trace(flag); // output : false
		 * var ymd = new Date();
		 * var flag = Eco.date.isLeapYear(ymd);
		 * trace(flag); // output : true
		 * var value = this.Dataset.getColumn(0, "yyyyMMdd"); // yyyyMMdd 컬럼타입은 DATE. 
		 * var flag = Eco.date.isLeapYear(value);
		 * trace(flag); // output : true		 
		 * @memberOf Eco.date
		 */
		isLeapYear: function(value)
		{
			
			var result;
			var year;
			
			if( Eco.isEmpty(value) ) {
				return false;
			}
			
			if ( Eco.isString(value) ) {
				year = parseInt(value.substring(0,4), 10);
			
			} //dataset의 컬럼타입이 DATE인 경우 처리.
			else if(value instanceof nexacro.Date) {
				value = value.toString();
				
				if(Eco.isEmpty(value)) {
					return false;
				}
				
				year = parseInt(value.substring(0,4), 10);
				
			} else if( Eco.isDate(value) ) {
				
				year = value.getFullYear();
			}

			
			if ((year % 4) == 0) 
			{
				if ((year % 100) != 0 || (year % 400) == 0){
					result = true;
				} 
				else 
				{
					result = false;
				}
			} 
			else 
			{
				result = false;
			}
			
			return result;
		},	
		
		
		/**
		 * 각 월별 음력 기준 정보(처리가능 기간  1841 - 2043년).
		 * @memberOf Eco.date
		 * @private
		 */	 
		solarBase: (function(){
			var sBase;
			
			//1841
			sBase = "1,2,4,1,1,2,1,2,1,2,2,1,";
			sBase += "2,2,1,2,1,1,2,1,2,1,2,1,";
			sBase += "2,2,2,1,2,1,4,1,2,1,2,1,";
			sBase += "2,2,1,2,1,2,1,2,1,2,1,2,";
			sBase += "1,2,1,2,2,1,2,1,2,1,2,1,";
			sBase += "2,1,2,1,5,2,1,2,2,1,2,1,";
			sBase += "2,1,1,2,1,2,1,2,2,2,1,2,";
			sBase += "1,2,1,1,2,1,2,1,2,2,2,1,";
			sBase += "2,1,2,3,2,1,2,1,2,1,2,2,";
			sBase += "2,1,2,1,1,2,1,1,2,2,1,2,";
			//1851
			sBase += "2,2,1,2,1,1,2,1,2,1,5,2,";
			sBase += "2,1,2,2,1,1,2,1,2,1,1,2,";
			sBase += "2,1,2,2,1,2,1,2,1,2,1,2,";
			sBase += "1,2,1,2,1,2,5,2,1,2,1,2,";
			sBase += "1,1,2,1,2,2,1,2,2,1,2,1,";
			sBase += "2,1,1,2,1,2,1,2,2,2,1,2,";
			sBase += "1,2,1,1,5,2,1,2,1,2,2,2,";
			sBase += "1,2,1,1,2,1,1,2,2,1,2,2,";
			sBase += "2,1,2,1,1,2,1,1,2,1,2,2,";
			sBase += "2,1,6,1,1,2,1,1,2,1,2,2,";
			//1861
			sBase += "1,2,2,1,2,1,2,1,2,1,1,2,";
			sBase += "2,1,2,1,2,2,1,2,2,3,1,2,";
			sBase += "1,2,2,1,2,1,2,2,1,2,1,2,";
			sBase += "1,1,2,1,2,1,2,2,1,2,2,1,";
			sBase += "2,1,1,2,4,1,2,2,1,2,2,1,";
			sBase += "2,1,1,2,1,1,2,2,1,2,2,2,";
			sBase += "1,2,1,1,2,1,1,2,1,2,2,2,";
			sBase += "1,2,2,3,2,1,1,2,1,2,2,1,";
			sBase += "2,2,2,1,1,2,1,1,2,1,2,1,";
			sBase += "2,2,2,1,2,1,2,1,1,5,2,1,";
			//1871
			sBase += "2,2,1,2,2,1,2,1,2,1,1,2,";
			sBase += "1,2,1,2,2,1,2,1,2,2,1,2,";
			sBase += "1,1,2,1,2,4,2,1,2,2,1,2,";
			sBase += "1,1,2,1,2,1,2,1,2,2,2,1,";
			sBase += "2,1,1,2,1,1,2,1,2,2,2,1,";
			sBase += "2,2,1,1,5,1,2,1,2,2,1,2,";
			sBase += "2,2,1,1,2,1,1,2,1,2,1,2,";
			sBase += "2,2,1,2,1,2,1,1,2,1,2,1,";
			sBase += "2,2,4,2,1,2,1,1,2,1,2,1,";
			sBase += "2,1,2,2,1,2,2,1,2,1,1,2,";
			//1881
			sBase += "1,2,1,2,1,2,5,2,2,1,2,1,";
			sBase += "1,2,1,2,1,2,1,2,2,1,2,2,";
			sBase += "1,1,2,1,1,2,1,2,2,2,1,2,";
			sBase += "2,1,1,2,3,2,1,2,2,1,2,2,";
			sBase += "2,1,1,2,1,1,2,1,2,1,2,2,";
			sBase += "2,1,2,1,2,1,1,2,1,2,1,2,";
			sBase += "2,2,1,5,2,1,1,2,1,2,1,2,";
			sBase += "2,1,2,2,1,2,1,1,2,1,2,1,";
			sBase += "2,1,2,2,1,2,1,2,1,2,1,2,";
			sBase += "1,5,2,1,2,2,1,2,1,2,1,2,";
			//1891
			sBase += "1,2,1,2,1,2,1,2,2,1,2,2,";
			sBase += "1,1,2,1,1,5,2,2,1,2,2,2,";
			sBase += "1,1,2,1,1,2,1,2,1,2,2,2,";
			sBase += "1,2,1,2,1,1,2,1,2,1,2,2,";
			sBase += "2,1,2,1,5,1,2,1,2,1,2,1,";
			sBase += "2,2,2,1,2,1,1,2,1,2,1,2,";
			sBase += "1,2,2,1,2,1,2,1,2,1,2,1,";
			sBase += "2,1,5,2,2,1,2,1,2,1,2,1,";
			sBase += "2,1,2,1,2,1,2,2,1,2,1,2,";
			sBase += "1,2,1,1,2,1,2,5,2,2,1,2,";
			//1901
			sBase += "1,2,1,1,2,1,2,1,2,2,2,1,";
			sBase += "2,1,2,1,1,2,1,2,1,2,2,2,";
			sBase += "1,2,1,2,3,2,1,1,2,2,1,2,";
			sBase += "2,2,1,2,1,1,2,1,1,2,2,1,";
			sBase += "2,2,1,2,2,1,1,2,1,2,1,2,";
			sBase += "1,2,2,4,1,2,1,2,1,2,1,2,";
			sBase += "1,2,1,2,1,2,2,1,2,1,2,1,";
			sBase += "2,1,1,2,2,1,2,1,2,2,1,2,";
			sBase += "1,5,1,2,1,2,1,2,2,2,1,2,";
			sBase += "1,2,1,1,2,1,2,1,2,2,2,1,";
			//1911
			sBase += "2,1,2,1,1,5,1,2,2,1,2,2,";
			sBase += "2,1,2,1,1,2,1,1,2,2,1,2,";
			sBase += "2,2,1,2,1,1,2,1,1,2,1,2,";
			sBase += "2,2,1,2,5,1,2,1,2,1,1,2,";
			sBase += "2,1,2,2,1,2,1,2,1,2,1,2,";
			sBase += "1,2,1,2,1,2,2,1,2,1,2,1,";
			sBase += "2,3,2,1,2,2,1,2,2,1,2,1,";
			sBase += "2,1,1,2,1,2,1,2,2,2,1,2,";
			sBase += "1,2,1,1,2,1,5,2,2,1,2,2,";
			sBase += "1,2,1,1,2,1,1,2,2,1,2,2,";
			//1921
			sBase += "2,1,2,1,1,2,1,1,2,1,2,2,";
			sBase += "2,1,2,2,3,2,1,1,2,1,2,2,";
			sBase += "1,2,2,1,2,1,2,1,2,1,1,2,";
			sBase += "2,1,2,1,2,2,1,2,1,2,1,1,";
			sBase += "2,1,2,5,2,1,2,2,1,2,1,2,";
			sBase += "1,1,2,1,2,1,2,2,1,2,2,1,";
			sBase += "2,1,1,2,1,2,1,2,2,1,2,2,";
			sBase += "1,5,1,2,1,1,2,2,1,2,2,2,";
			sBase += "1,2,1,1,2,1,1,2,1,2,2,2,";
			sBase += "1,2,2,1,1,5,1,2,1,2,2,1,";
			//1931
			sBase += "2,2,2,1,1,2,1,1,2,1,2,1,";
			sBase += "2,2,2,1,2,1,2,1,1,2,1,2,";
			sBase += "1,2,2,1,6,1,2,1,2,1,1,2,";
			sBase += "1,2,1,2,2,1,2,2,1,2,1,2,";
			sBase += "1,1,2,1,2,1,2,2,1,2,2,1,";
			sBase += "2,1,4,1,2,1,2,1,2,2,2,1,";
			sBase += "2,1,1,2,1,1,2,1,2,2,2,1,";
			sBase += "2,2,1,1,2,1,4,1,2,2,1,2,";
			sBase += "2,2,1,1,2,1,1,2,1,2,1,2,";
			sBase += "2,2,1,2,1,2,1,1,2,1,2,1,";
			//1941
			sBase += "2,2,1,2,2,4,1,1,2,1,2,1,";
			sBase += "2,1,2,2,1,2,2,1,2,1,1,2,";
			sBase += "1,2,1,2,1,2,2,1,2,2,1,2,";
			sBase += "1,1,2,4,1,2,1,2,2,1,2,2,";
			sBase += "1,1,2,1,1,2,1,2,2,2,1,2,";
			sBase += "2,1,1,2,1,1,2,1,2,2,1,2,";
			sBase += "2,5,1,2,1,1,2,1,2,1,2,2,";
			sBase += "2,1,2,1,2,1,1,2,1,2,1,2,";
			sBase += "2,2,1,2,1,2,3,2,1,2,1,2,";
			sBase += "2,1,2,2,1,2,1,1,2,1,2,1,";
			//1951
			sBase += "2,1,2,2,1,2,1,2,1,2,1,2,";
			sBase += "1,2,1,2,4,2,1,2,1,2,1,2,";
			sBase += "1,2,1,1,2,2,1,2,2,1,2,2,";
			sBase += "1,1,2,1,1,2,1,2,2,1,2,2,";
			sBase += "2,1,4,1,1,2,1,2,1,2,2,2,";
			sBase += "1,2,1,2,1,1,2,1,2,1,2,2,";
			sBase += "2,1,2,1,2,1,1,5,2,1,2,2,";
			sBase += "1,2,2,1,2,1,1,2,1,2,1,2,";
			sBase += "1,2,2,1,2,1,2,1,2,1,2,1,";
			sBase += "2,1,2,1,2,5,2,1,2,1,2,1,";
			//1961
			sBase += "2,1,2,1,2,1,2,2,1,2,1,2,";
			sBase += "1,2,1,1,2,1,2,2,1,2,2,1,";
			sBase += "2,1,2,3,2,1,2,1,2,2,2,1,";
			sBase += "2,1,2,1,1,2,1,2,1,2,2,2,";
			sBase += "1,2,1,2,1,1,2,1,1,2,2,1,";
			sBase += "2,2,5,2,1,1,2,1,1,2,2,1,";
			sBase += "2,2,1,2,2,1,1,2,1,2,1,2,";
			sBase += "1,2,2,1,2,1,5,2,1,2,1,2,";
			sBase += "1,2,1,2,1,2,2,1,2,1,2,1,";
			sBase += "2,1,1,2,2,1,2,1,2,2,1,2,";
			//1971
			sBase += "1,2,1,1,5,2,1,2,2,2,1,2,";
			sBase += "1,2,1,1,2,1,2,1,2,2,2,1,";
			sBase += "2,1,2,1,1,2,1,1,2,2,2,1,";
			sBase += "2,2,1,5,1,2,1,1,2,2,1,2,";
			sBase += "2,2,1,2,1,1,2,1,1,2,1,2,";
			sBase += "2,2,1,2,1,2,1,5,2,1,1,2,";
			sBase += "2,1,2,2,1,2,1,2,1,2,1,1,";
			sBase += "2,2,1,2,1,2,2,1,2,1,2,1,";
			sBase += "2,1,1,2,1,6,1,2,2,1,2,1,";
			sBase += "2,1,1,2,1,2,1,2,2,1,2,2,";
			//1981
			sBase += "1,2,1,1,2,1,1,2,2,1,2,2,";
			sBase += "2,1,2,3,2,1,1,2,2,1,2,2,";
			sBase += "2,1,2,1,1,2,1,1,2,1,2,2,";
			sBase += "2,1,2,2,1,1,2,1,1,5,2,2,";
			sBase += "1,2,2,1,2,1,2,1,1,2,1,2,";
			sBase += "1,2,2,1,2,2,1,2,1,2,1,1,";
			sBase += "2,1,2,2,1,5,2,2,1,2,1,2,";
			sBase += "1,1,2,1,2,1,2,2,1,2,2,1,";
			sBase += "2,1,1,2,1,2,1,2,2,1,2,2,";
			sBase += "1,2,1,1,5,1,2,1,2,2,2,2,";
			//1991
			sBase += "1,2,1,1,2,1,1,2,1,2,2,2,";
			sBase += "1,2,2,1,1,2,1,1,2,1,2,2,";
			sBase += "1,2,5,2,1,2,1,1,2,1,2,1,";
			sBase += "2,2,2,1,2,1,2,1,1,2,1,2,";
			sBase += "1,2,2,1,2,2,1,5,2,1,1,2,";
			sBase += "1,2,1,2,2,1,2,1,2,2,1,2,";
			sBase += "1,1,2,1,2,1,2,2,1,2,2,1,";
			sBase += "2,1,1,2,3,2,2,1,2,2,2,1,";
			sBase += "2,1,1,2,1,1,2,1,2,2,2,1,";
			sBase += "2,2,1,1,2,1,1,2,1,2,2,1,";
			//2001
			sBase += "2,2,2,3,2,1,1,2,1,2,1,2,";
			sBase += "2,2,1,2,1,2,1,1,2,1,2,1,";
			sBase += "2,2,1,2,2,1,2,1,1,2,1,2,";
			sBase += "1,5,2,2,1,2,1,2,2,1,1,2,";
			sBase += "1,2,1,2,1,2,2,1,2,2,1,2,";
			sBase += "1,1,2,1,2,1,5,2,2,1,2,2,";
			sBase += "1,1,2,1,1,2,1,2,2,2,1,2,";
			sBase += "2,1,1,2,1,1,2,1,2,2,1,2,";
			sBase += "2,2,1,1,5,1,2,1,2,1,2,2,";
			sBase += "2,1,2,1,2,1,1,2,1,2,1,2,";
			//2011
			sBase += "2,1,2,2,1,2,1,1,2,1,2,1,";
			sBase += "2,1,6,2,1,2,1,1,2,1,2,1,";
			sBase += "2,1,2,2,1,2,1,2,1,2,1,2,";
			sBase += "1,2,1,2,1,2,1,2,5,2,1,2,";
			sBase += "1,2,1,1,2,1,2,2,2,1,2,2,";
			sBase += "1,1,2,1,1,2,1,2,2,1,2,2,";
			sBase += "2,1,1,2,3,2,1,2,1,2,2,2,";
			sBase += "1,2,1,2,1,1,2,1,2,1,2,2,";
			sBase += "2,1,2,1,2,1,1,2,1,2,1,2,";
			sBase += "2,1,2,5,2,1,1,2,1,2,1,2,";
			//2021
			sBase += "1,2,2,1,2,1,2,1,2,1,2,1,";
			sBase += "2,1,2,1,2,2,1,2,1,2,1,2,";
			sBase += "1,5,2,1,2,1,2,2,1,2,1,2,";
			sBase += "1,2,1,1,2,1,2,2,1,2,2,1,";
			sBase += "2,1,2,1,1,5,2,1,2,2,2,1,";
			sBase += "2,1,2,1,1,2,1,2,1,2,2,2,";
			sBase += "1,2,1,2,1,1,2,1,1,2,2,2,";
			sBase += "1,2,2,1,5,1,2,1,1,2,2,1,";
			sBase += "2,2,1,2,2,1,1,2,1,1,2,2,";
			sBase += "1,2,1,2,2,1,2,1,2,1,2,1,";
			//2031
			sBase += "2,1,5,2,1,2,2,1,2,1,2,1,";
			sBase += "2,1,1,2,1,2,2,1,2,2,1,2,";
			sBase += "1,2,1,1,2,1,5,2,2,2,1,2,";
			sBase += "1,2,1,1,2,1,2,1,2,2,2,1,";
			sBase += "2,1,2,1,1,2,1,1,2,2,1,2,";
			sBase += "2,2,1,2,1,4,1,1,2,1,2,2,";
			sBase += "2,2,1,2,1,1,2,1,1,2,1,2,";
			sBase += "2,2,1,2,1,2,1,2,1,1,2,1,";
			sBase += "2,2,1,2,5,2,1,2,1,2,1,1,";
			sBase += "2,1,2,2,1,2,2,1,2,1,2,1,";
			//2041
			sBase += "2,1,1,2,1,2,2,1,2,2,1,2,";
			sBase += "1,5,1,2,1,2,1,2,2,2,1,2,";
			sBase += "1,2,1,1,2,1,1,2,2,1,2,2";
			
			var arrBase = [];
			arrBase = sBase.split(",");
			
			return arrBase;
		})(),
		
		/**
		 * 양력을 음력으로 변환해주는 함수.<br>
		 * [주의사항]<br>
		 *  1. return값이 8자리가 아니고 9자리임에 주의<br>
		 *  2. 처리가능 기간  1841 - 2043년
		 * @param {string | date} value yyyyMMdd 형태의 양력일자.
		 * @return {string} Flag(평달 = "0", 윤달 = "1") + yyyyMMdd 형태의 음력일자.
		 * @example
		 * var dt = Eco.date.strToDate("20130331");
		 * var str = Eco.date.solarToLunar(dt);
		 * trace(str); // output : 020130220
		 * var str1 = "20130331";
		 * var str = Eco.date.solarToLunar(str1);
		 * trace(str); // output : 020130220
		 * @memberOf Eco.date
		 */		
		solarToLunar: function(value) 
		{
			var sMd         = "31,0,31,30,31,30,31,31,30,31,30,31";
			var arrMd       = [];
			var arrBaseInfo = [];
			var arrDt       = [];	// 매년의 음력일수를 저장할 배열 변수
			var nTd;		    			// 음력일을 계산하기 위해 양력일과의 차이를 저장할 변수
			var nTd1;			    		// 1840년까지의 날수
			var nTd2;				    	// 현재까지의 날수
			var nTemp;					    // 임시변수
			var nLy, nLm, nLd;			    // 계산된 음력 년, 월, 일을 저장할 변수
			var sLyoon;					    // 현재월이 윤달임을 표시

			var nY, nM, nD;
			if ( Eco.isDate(value) )
			{
				nY = value.getFullYear();
				nM = value.getMonth() + 1;
				nD = value.getDate();
			}
			else
			{
				nY = parseInt(value.substr(0,4), 10);
				nM = parseInt(value.substr(4,2), 10);
				nD = parseInt(value.substr(6,2), 10);
			}
			
			if (nY < 1841 || nY > 2043)	
			{
				return null;
			}

			arrBaseInfo = this.solarBase;
			arrMd       = sMd.split(",");
			arrMd[1]    = 28;
				
			//윤년여부 확인
			if ((nY % 4) == 0) 
			{
				if ((nY % 100) != 0 || (nY % 400) == 0)
				{ 
					arrMd[1] = 29;
				}
			} 

			// 672069 = 1840 * 365 + 1840/4 - 1840/100 + 1840/400 + 23  //1840년까지 날수
			nTd1 = 672069; 	 
				
			// 1841년부터 작년까지의 날수
			nTd2 = (nY - 1) * 365 + parseInt((nY - 1)/4) - parseInt((nY - 1)/100) + parseInt((nY - 1)/400);
				
			// 전월까지의 날수를 더함
			for (var i = 0; i <= nM - 2; i++)
			{
				nTd2 = nTd2 + parseInt(arrMd[i]);
			}

			// 현재일까지의 날수를 더함
			nTd2 = nTd2 + nD;

			// 양력현재일과 음력 1840년까지의 날수의 차이
			nTd = nTd2 - nTd1 + 1;
			
			// 1841년부터 음력날수를 계산
			for (var i = 0; i <= nY - 1841; i++)
			{
				arrDt[i] = 0;
				for (var j = 0; j <= 11; j++)
				{
					switch (parseInt(arrBaseInfo[i * 12 + j]))
					{
						case 1 : nTemp = 29;
								 break;
						case 2 : nTemp = 30;
								 break;				
						case 3 : nTemp = 58;	// 29 + 29
								 break;				
						case 4 : nTemp = 59;	// 29 + 30
								 break;				
						case 5 : nTemp = 59;	// 30 + 29
								 break;				
						case 6 : nTemp = 60;	// 30 + 30
								 break;				
					}
					
					arrDt[i] = arrDt[i] + nTemp;
				}
			}
				
			// 1840년 이후의 년도를 계산 - 현재까지의 일수에서 위에서 계산된 1841년부터의 매년 음력일수를 빼가면수 년도를 계산
			nLy = 0;
			do
			{
				nTd = nTd - arrDt[nLy];
				nLy = nLy + 1;
			}
			while(nTd > arrDt[nLy]);
			
			nLm    = 0;
			sLyoon = "0";	// 현재월이 윤달임을 표시할 변수 - 기본값 평달
			do
			{
				if (parseInt(arrBaseInfo[nLy * 12 + nLm]) <= 2)
				{
					nTemp = parseInt(arrBaseInfo[nLy * 12 + nLm]) + 28;
					if (nTd > nTemp)
					{
						nTd = nTd - nTemp;
						nLm = nLm + 1;
					}
					else
					{
						break;
					}
				}
				else
				{
					switch (parseInt(arrBaseInfo[nLy * 12 + nLm]))
					{
						case 3 :
							m1 = 29;
							m2 = 29;
							break;
						case 4 : 
							m1 = 29;
							m2 = 30;
							break;					
						case 5 : 
							m1 = 30;
							m2 = 29;
							break;					
						case 6 : 
							m1 = 30;
							m2 = 30;
							break;					
					}

					if (nTd > m1)
					{
						nTd = nTd - m1;
						if (nTd > m2)
						{
							nTd = nTd - m2;
							nLm = nLm + 1;
						}
						else
						{
							sLyoon = "1";
						}
					}
					else
					{
						break;
					}
				}
			}
			while(1);
			
			nLy = nLy + 1841;
			nLm = nLm + 1;
			nLd = nTd;

			var sRtn = sLyoon + nLy; 
			sRtn = sRtn + nLm.toString().padLeft(2, "0"); 
			sRtn = sRtn + nLd.toString().padLeft(2, "0");    

			return sRtn;
		},	
		
		/**
		 * 음력을 양력으로 변환.
		 * @param {string | date} value Date object 또는 yyyyMMdd 형태의 음력일자.
		 * @param {boolean} leapMonth 윤달 여부.
		 * @return {string} yyyyMMdd 형태의 양력일자.
		 * @example
		 * var dt = Eco.date.strToDate("20120331");
		 * var str = Eco.date.lunarToSolar(dt, false);
		 * trace(str); // output : 20120421
		 * var str1 = "20120331";
		 * var str = Eco.date.lunarToSolar(str1, false);
		 * trace(str); // output : 20120421
		 * @memberOf Eco.date
		 */		 
		lunarToSolar: function(value, leapMonth) 
		{
			var pThis = Eco.date;
			var sMd         = "31,0,31,30,31,30,31,31,30,31,30,31";
			var arrMd       = [];	
			var arrBaseInfo = [];
			var nTd         = 0;
			var nSy, nSm, nSd;			    // 계산된 양력 년, 월, 일을 저장할 변수
			var nY1, nM1, nY2, nY3, nTemp;	// 임시변수	
			var nLeap;    
				
			var nLy, nLm, nLd;
			if ( Eco.isDate(value) )
			{
				nLy = value.getFullYear();
				nLm = value.getMonth() + 1;
				nLd = value.getDate();
			}
			else
			{
				nLy = parseInt(value.substr(0,4), 10);
				nLm = parseInt(value.substr(4,2), 10);
				nLd = parseInt(value.substr(6,2), 10);
			}

			if (nLy < 1841 || nLy > 2043)	
			{
				return null;
			}	

			arrBaseInfo = pThis.solarBase;
			arrMd       = sMd.split(",");
			arrMd[1]    = 28;
			
			//윤년여부 확인
			if ((nLy % 4) == 0) 
			{
				if ((nLy % 100) != 0 || (nLy % 400) == 0)
				{ 
					arrMd[1] = 29;
				}
			} 
				
			nY1   = nLy - 1841;
			nM1   = nLm - 1;
			nLeap = 0;
			
			if (parseInt(arrBaseInfo[nY1 * 12 + nM1]) > 2)
			{
				//윤년여부 확인
				if ((nLy % 4) == 0) 
				{
					if ((nLy % 100) != 0 || (nLy % 400) == 0)
					{ 
						nLeap = 1;
					}
				} 
			}
			
			if (nLeap == 1)
			{
				switch (parseInt(arrBaseInfo[nY1 * 12 + nM1]))
				{
					case 3 : nTemp = 29;
							 break;
					case 4 : nTemp = 30;
							 break;			
					case 5 : nTemp = 29;
							 break;			
					case 6 : nTemp = 30;
							 break;
				}
			}
			else
			{
				switch (parseInt(arrBaseInfo[nY1 * 12 + nM1]))
				{
					case 1 : nTemp = 29;
							 break;			
					case 2 : nTemp = 30;
							 break;			
					case 3 : nTemp = 29;
							 break;			
					case 4 : nTemp = 29;
							 break;			
					case 5 : nTemp = 30;
							 break;			
					case 6 : nTemp = 30;
							 break;			
				}
			}
			
			var tempY1 = nY1 - 1;
			for (var i = 0; i <= tempY1; i++)
			{
				for (var j = 0; j <= 11; j++)
				{
					switch (parseInt(arrBaseInfo[i * 12 + j]))
					{
						case 1 : nTd = nTd + 29;
								 break;
						case 2 : nTd = nTd + 30;
								 break;				
						case 3 : nTd = nTd + 58;
								 break;				
						case 4 : nTd = nTd + 59;
								 break;				
						case 5 : nTd = nTd + 59;
								 break;				
						case 6 : nTd = nTd + 60;
								 break;				
					}
				}
			}

			var tempM1 = nM1 - 1;
			for (var j = 0; j <= tempM1; j++)
			{
				switch (parseInt(arrBaseInfo[nY1 * 12 + j]))
				{
					case 1 : nTd = nTd + 29;
							 break;			
					case 2 : nTd = nTd + 30;
							 break;						
					case 3 : nTd = nTd + 58;
							 break;						
					case 4 : nTd = nTd + 59;
							 break;						
					case 5 : nTd = nTd + 59;
							 break;						
					case 6 : nTd = nTd + 60;
							 break;						
				}
			}

			if (nLeap == 1)
			{
				switch (parseInt(arrBaseInfo[nY1 * 12 + nM1]))
				{
					case 3 : nTemp = 29;
							 break;						
					case 4 : nTemp = 29;
							 break;						
					case 5 : nTemp = 30;
							 break;						
					case 6 : nTemp = 30;
							 break;						
				}
			}
			
			nTd = nTd + nLd + 22;
			
			if (leapMonth)
			{
				switch (parseInt(arrBaseInfo[nY1 * 12 + nM1]))
				{
					case 3 : nTd = nTd + 29;
							 break;						
					case 4 : nTd = nTd + 30;
							 break;						
					case 5 : nTd = nTd + 29;
							 break;						
					case 6 : nTd = nTd + 30;
							 break;						
				}
			}
			
			nY1 = 1840;
			do
			{
				nY1 = nY1 + 1;
				
				nLeap = 0;
				
				//윤년여부 확인
				if ((nY1 % 4) == 0) 
				{
					if ((nY1 % 100) != 0 || (nY1 % 400) == 0)
					{ 
						nLeap = 1;
					}
				} 

				if (nLeap == 1)
				{
					nY2 = 366;
				}
				else
				{
					nY2 = 365;
				}

				if( nTd <= nY2 )
				{
					break;
				}
					
				nTd = nTd - nY2;
			}
			while(1);

			nSy      = nY1;
			arrMd[1] = nY2 - 337;
			nM1      = 0;
			
			do
			{
				nM1 = nM1 + 1;
				if (nTd <= parseInt(arrMd[nM1-1]))
				{
					break;
				}
				nTd = nTd - parseInt(arrMd[nM1-1]);
			}
			while(1);
			
			nSm = nM1;
			nSd = nTd;
			nY3 = nSy;
			nTd = nY3 * 365 + parseInt(nY3/4) - parseInt(nY3/100) + parseInt(nY3/400);
			
			var tempSm = nSm - 1;
			for (var i = 0; i <= tempSm; i++)
			{
				nTd = nTd + parseInt(arrMd[i]);
			}

			nTd = nTd + nSd;

			var sRtn = nY3;
			sRtn = sRtn + nSm.toString().padLeft(2, "0"); 
			sRtn = sRtn + nSd.toString().padLeft(2, "0");    

			return sRtn;	
		},
	
		/**
		 * 전달된 月의 1일 만들기.
		 * @param {string | date} value Date object 또는 yyyyMMdd 형태의 일자.
		 * @return {string} yyyyMM01.
		 * @example
		 * var dt = Eco.date.strToDate("20120331");
		 * var dt1 = Eco.date.getFirstDate(dt);
		 * trace(dt1); // output : Thu Mar 01 2012 00:00:00 GMT+0900
		 * var str1 = "20120331";
		 * var str = Eco.date.getFirstDate(str1);
		 * trace(str); // output : 20120301
		 * @memberOf Eco.date
		 */			 
		getFirstDate: function(value)
		{
			if ( Eco.isDate(value) )
			{
				var dt = new Date();
				dt.setFullYear(value.getFullYear(), value.getMonth(), 1);
				dt.setHours(value.getHours(), value.getMinutes(), value.getSeconds());
				dt.setMilliseconds(value.getMilliseconds());
				return dt;
			}
			else
			{
				var sRtn = "";
				var dDate = new Date(parseInt(value.substr(0,4)), parseInt(value.substr(4,2))-1, 1);
				sRtn =  dDate.getFullYear()
					 + (dDate.getMonth()+1).toString().padLeft(2, "0")
					 +  dDate.getDate().toString().padLeft(2, "0");

				return sRtn;
			}
		},
		
		/**
		 * 날짜 차이 반환.
		 * @param {string} date1 yyyyMMddHHMMSS 형태의 일자.
		 * @param {string} date2 yyyyMMddHHMMSS 형태의 일자.
		 * @return {array} 두 날짜의 기간.[일,시,분,초]
		 * @example
		 * var dt0 = Eco.date.strToDate("20130302113022");
		 * var dt1 = Eco.date.strToDate("20130305145032");
		 * var etime = Eco.date.getDiffTime(dt0, dt1); // return Array Type [일, 시, 분, 초]
		 * trace(etime); // output : 3,3,20,10
		 * var str0 = "20130302113022";
		 * var str1 = "20130305145032";
		 * var etime = Eco.date.getDiffTime(str0, str1); // return Array Type [일, 시, 분, 초]
		 * trace(etime); // output : 3,3,20,10
		 * @memberOf Eco.date
		 */		 
		getDiffTime: function(date1, date2)
		{
			var dFrom, dTo;
			if ( Eco.isDate(date1) && Eco.isDate(date2) )
			{
				dFrom = date2;
				dTo = date1;
			}
			else
			{
				dFrom = new Date(date2.substring(0,4),  date2.substring(4,6)-1, date2.substring(6,8)
								,date2.substring(8,10), date2.substring(10,12), date2.substring(12,14));
				dTo   = new Date(date1.substring(0,4),  date1.substring(4,6)-1, date1.substring(6,8)
								,date1.substring(8,10), date1.substring(10,12), date1.substring(12,14));    
			}
			var nGap  = (dFrom.getTime() - dTo.getTime()) / 1000; 
			var nSec  = nGap % 60; 
			var nMin  = Math.floor(nGap/(60)) % 60; 
			var nHour = Math.floor(nGap/(60 * 60)) % 24; 
			var nDay  = Math.floor(nGap/(60 * 60 * 24)); 
				
			var sRtn = nDay + "" + nHour  + "" + nMin + "" + nSec+ ""; 
			return [nDay, nHour, nMin, nSec];
		},
		
		/**
		 * mask format cache.
		 * @private
		 * @memberOf Eco.date
		 */
		_dateMaskCache: {},		
		
		/**
		 * mask format 변환 정보 반환.
		 * @private
		 * @param {string} strMask mask할 format 문자열.
		 * @return {array} mask format 변환 정보.
		 * @memberOf Eco.date
		 */		
		_parseDateMask: function(strMask)
		{
			var pThis = Eco.date;
			
			var res = pThis._dateMaskCache[strMask];
			if ( res ) return res;

			var arrMask = [], tokenStr, seq = 0,
				bEscape = false, bQuote = false,
				maskArr = strMask.split(""),
				tmpStr;

			for ( var i = 0, len = maskArr.length ; i < len ; )
			{
				tokenStr = maskArr[i];
				//trace(i + "===>" + tokenStr);
				if( bEscape == false && tokenStr == "'" ) 
				{ // Mask가 Quotation이 시작될 경우.
					if( bQuote == false )
						bQuote = true;
					else
						bQuote = false;
					i++;
					continue;
				}
				if( bEscape == false && tokenStr == "\\" && !bQuote ) 
				{ // Mask에서 Escape에 진입할 경우.
					bEscape = true;
					i++;
					continue;
				}
				else if ( bEscape ) 
				{ // Mask에서 Escape를 사용할 경우.
					//trace(i + "(EEE)===>" + tokenStr);
					arrMask[seq] = i;
					seq++;
					bEscape = false;
				}
				else if( bQuote == false ) 
				{// Mask에서 Quotation 밖의 글자에 대해.
					tmpStr = strMask.substr(i, 4);
					if ( tmpStr == "yyyy" || tmpStr == "MMMM" || tmpStr == "dddd" ) //yyyy, MMMM, dddd
					{
						arrMask[seq] = tmpStr;
						i += 4;
						seq++;
						continue;
					}
					tmpStr = strMask.substr(i, 3);
					if ( tmpStr == "MMM" || tmpStr == "ddd" || tmpStr == "sss" ) //MMM, ddd, sss
					{
						arrMask[seq] = tmpStr;
						i += 3;
						seq++;
						continue;
					}
					tmpStr = strMask.substr(i, 2);
					if ( tmpStr == "yy" || tmpStr == "MM" || tmpStr == "dd" ||
						 tmpStr == "HH" || tmpStr == "mm" || tmpStr == "ss" ||
						 tmpStr == "hh" || tmpStr == "tt" || tmpStr == "tt" ) // yy, MM, dd, HH, mm , ss, tt, WW
					{
						arrMask[seq] = tmpStr;
						i += 2;
						seq++;
						continue;
					}

					if ( tokenStr == "M" || tokenStr == "d" || tokenStr == "H" ||
						 tokenStr == "h" || tokenStr == "m" || tokenStr == "s" || tokenStr == "W" ) // M, d, H, h, m, s, W
					{
						arrMask[seq] = tokenStr;
						seq++;
					}
					else
					{
						arrMask[seq] = i;
						seq++;
					}
				}
				i++;
			}
			
			pThis._dateMaskCache[strMask] = arrMask;
			
			return arrMask;
		},
		
		/**
		 * 주어진 날짜 객체의 Mask Format 처리된 문자열을 반환.<br>
		 * 요일명칭, 월 명칭, 오전/오후 명칭 표시 처리는 Eco.date에 정의된 값으로 처리된다.<br><br>
		 * Eco.date.weekName : 요일명칭(Array value), <br>
		 * Eco.date.weekShortName : 요일축약명칭(Array value),<br>
		 * Eco.date.monthName : 월명칭(Array value),<br>
		 * Eco.date.monthShortName : 월축약 명칭(Array value),<br>
		 * Eco.date.ttName : 오전/오후 명칭(Array value)
		 * @param {date} dt Date 개체.
		 * @param {string} strMask mask할 format 문자열.
		 * @return {string} 변환된 문자열.
		 * @example
		 * var dt = Eco.date.strToDate("20130430123412"); // convert Date type from "20130430123412".
		 * trace(Eco.date.getMaskFormatString(dt, "yyyy년 MM월 dd일 tt hh시 mm분 ss초")); // output : 2013년 04월 30일 오후 12시 34분 12초
		 * trace(Eco.date.getMaskFormatString(dt, "yyyy-MM-dd")); // output : 2013-04-30
		 * trace(Eco.date.getMaskFormatString(dt, "yy MM.dd")); // output : 13 04.30
		 * trace(Eco.date.getMaskFormatString(dt, "yyyy-MM-dd W \\Week")); // output : 2013-04-30 18 Week
		 * trace(Eco.date.getMaskFormatString(dt, "MMMM dddd")); // output : 4월 화요일
		 * @memberOf Eco.date
		 */
		getMaskFormatString: function(dt, strMask)
		{
			var pThis = Eco.date;
			
			var arrMask = pThis._parseDateMask(strMask),
				arrDt = [], mask, h;
			for ( var i = 0, len = arrMask.length; i < len ; i++ )
			{
				mask = arrMask[i];
				if ( mask > -1 )
				{
					arrDt[arrDt.length] = strMask.charAt(mask);
				}
				else
				{
					switch (mask)
					{
						case "yyyy": arrDt[arrDt.length] = new String(dt.getFullYear()); break;
						case "MMMM": arrDt[arrDt.length] = pThis.monthName[dt.getMonth()]; break;
						case "dddd": arrDt[arrDt.length] = pThis.weekName[dt.getDay()]; break;
						case "MMM": arrDt[arrDt.length] = pThis.monthShortName[dt.getMonth()]; break;
						case "ddd": arrDt[arrDt.length] = pThis.weekShortName[dt.getDay()]; break;
						case "sss": arrDt[arrDt.length] = new String(dt.getMilliseconds()).padLeft(3,'0'); break;
						case "yy": arrDt[arrDt.length] = new String(dt.getFullYear() % 1000).padLeft(2,'0'); break;
						case "MM": arrDt[arrDt.length] = new String(dt.getMonth() + 1).padLeft(2,'0'); break;
						case "WW": arrDt[arrDt.length] = new String(getWeekNumber(dt)).padLeft(2,'0'); break;
						case "dd": arrDt[arrDt.length] = new String(dt.getDate()).padLeft(2,'0'); break;
						case "HH": arrDt[arrDt.length] = new String(dt.getHours()).padLeft(2,'0'); break;
						case "hh": arrDt[arrDt.length] = new String(((h = dt.getHours() % 12) ? h : 12)).padLeft(2,'0'); break;
						case "mm": arrDt[arrDt.length] = new String(dt.getMinutes()).padLeft(2,'0'); break;
						case "ss": arrDt[arrDt.length] = new String(dt.getSeconds()).padLeft(2,'0'); break;
						case "tt": arrDt[arrDt.length] = dt.getHours() < 12 ? pThis.ttName[0] : pThis.ttName[1]; break;
						case "M": arrDt[arrDt.length] = new String(dt.getMonth() + 1); break;
						case "d": arrDt[arrDt.length] = new String(dt.getDate()); break;
						case "H": arrDt[arrDt.length] = new String(dt.getHours()); break;
						case "h": arrDt[arrDt.length] = new String(((h = dt.getHours() % 12) ? h : 12)); break;
						case "m": arrDt[arrDt.length] = new String(dt.getMinutes()); break;
						case "s": arrDt[arrDt.length] = new String(dt.getSeconds()); break;
						case "W": arrDt[arrDt.length] = new String(pThis.getWeekOfYear(dt)); break;
					}
				}
			}
			return arrDt.join("");
		},
		
		/**
		 * 오늘 날짜 반환(로컬기준)
		 * @private
		 * @return {string} 오늘날짜정보
		 * @memberOf Eco.date
		 */	
		getToday : function()
		{
			var dt = new Date();
			return dt.getFullYear().toString() + (dt.getMonth()+1).toString().padLeft(2, "0")+dt.getDate().toString().padLeft(2, "0");
		}
		
	});
}
