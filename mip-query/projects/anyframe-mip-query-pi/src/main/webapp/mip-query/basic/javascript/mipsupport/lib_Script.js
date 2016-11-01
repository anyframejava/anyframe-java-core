﻿﻿﻿﻿﻿﻿﻿
/*********************************************************************
 * 함 수 명 : scr_fn_GetWeek
 * 함수설명 : 년월일(yyyyMMdd)을 입력하면 해당 주차를 리턴한다.
 * 입    력 : 8자리 년월일(yyyyMMdd)
 * 결    과 : 주차
 *********************************************************************/
function scr_fn_GetWeek(strDate) {

	var year  = toInteger(substr(strDate,0,4));
	var month = toInteger(substr(strDate,4,2));
	var day   = toInteger(substr(strDate,6,8));

	var startAt = 1; ///////////// 일요일 표시 부분 / 0 : 일요일(일월화...) / 1 : 월요일(...금토일)

	if(startAt == 0) {
		day = day + 1;
	}

	var a    = floor((14-month) / 12);
	var y    = year + 4800 - a;
	var m    = month + (12 * a) - 3;
	var b    = floor(y/4) - floor(y/100) + floor(y/400);
	var J    = day + floor(((153 * m) + 2) / 5) + (365 * y) + b - 32045;
	var d4   = (((J + 31741 - (J % 7)) % 146097) % 36524) % 1461;
	var L    = floor(d4 / 1460);
	var d1   = ((d4 - L) % 365) + L;
	var week = floor(d1/7) + 1;

	return year+lpad(week,"0",2);
}

/*********************************************************************
 * 함 수 명 : scr_fn_IsValidateTime
 * 함수설명 : 시간 형식에 맞는지 Check 한다. (HHMMSS)
 *            T는 Cois 때 쓰던 수로 융통성을 두고 형식상 체크하기로 한다.(보류)
 * 입    력 : 6자리의 숫자로 된 내부시간형식
 * 결    과 : Boolen 형식의 정합성 체크
 *            시간형식에 맞으면 = "Y", 맞지 않으면 ="N"
 *********************************************************************/
function scr_fn_IsValidateTime(sValue)
{

	var sReturnValue = "N";
	var sFlag = "N";

	if(scr_fn_IsNull(sValue) == "Y" || isdigit(sValue) == false ||
	    (length(sValue) != 6))
	{
		sReturnValue = "N";
		sFlag = "Y";
	}

	var t01 = toNumber(mid(sValue, 0, 2));
	var t02 = toNumber(mid(sValue, 2, 2));
	var t03 = toNumber(mid(sValue, 4, 2));

	if(sFlag == "N")
	{
		if((t01 < 0 || t01 > 23) || (t02 < 0 || t02 > 59) || (t03 < 0 || t03 > 59))
		{
			sReturnValue = "N";
		}
		else sReturnValue = "Y";
	}
	return sReturnValue;
}

/*********************************************************************
 * 함 수 명 : scr_fn_TimeToSec
 * 함수설명 : 시간 형식을 초형식으로 변환한다. (HHMMSS)
 * 입    력 : 7자리의 숫자로 된 내부시간형식
 * 결    과 : 초단위의 시간(SSSSS)
 *********************************************************************/

function scr_fn_TimeToSec(sValue)
{
	var sReturnValue = ""	;
	if(scr_fn_IsValidateTime(sValue) == "Y")
	{
		sReturnValue =  toNumber(mid(sValue,0,2))*3600 + toNumber(mid(sValue,2,2))*60
		                + toNumber(mid(sValue,4,2)) ;
	}
	else
	{
		sReturnValue = "";
	}
	return sReturnValue;
}

/*********************************************************************
 * 함 수 명 : scr_fn_SecToTime
 * 함수설명 : 초형식을 시간형식으로 변환한다. (HHMMSS)
 * 입    력 : 초단위의 시간 (SSSSS)
 * 결    과 : 내부시간형식 (HHMMSS)
 *********************************************************************/
function scr_fn_SecToTime(sValue)
{
	var sReturnValue = ""	;
	var iHH = "";
	var iMM = "";
	var iSS = "";
	var sHH = "";
	var sMM = "";
	var sSS = "";

	if(scr_fn_IsNull(sValue) == "Y" || sValue < 0)
	{
		sReturnValue = 0;
	}
	else
	{
		iHH = truncate(toNumber(sValue)/3600);
		iMM = truncate((toNumber(sValue) - iHH*3600)/60);
		iSS = truncate((toNumber(sValue) - iHH*3600)%60);

		if(iHH<10)
		{
			sHH = "0" + iHH;
		}
		else sHH = iHH;

		if(iMM<10)
		{
			sMM = "0" + iMM;
		}
		else sMM = iMM;

		if(iSS<10)
		{
			sSS = "0" + iSS;
		}
		else sSS = iSS;

		sReturnValue = ToString(sHH) + ToString(sMM) + ToString(sSS);
	}
	return sReturnValue;
}

/*********************************************************************
 * 함 수 명 : scr_fn_SecBetweenTime
 * 함수설명 : 시작시간과 종료시간의 시간차를 초단위로 구한다.
 * 입    력 : fromT - 시작 시간으로 6자리의 숫자로 된 내부시간형식
 *            toT - 종료 시간으로 6자리의 숫자로 된 내부시간형식
 * 결    과 : 초단위의 경과시간(SSSSS)
 *********************************************************************/

function scr_fn_SecBetweenTime(fromT, toT)
{
	var sReturnValue = ""	;

	if(scr_fn_IsValidateTime(fromT) == "Y" && scr_fn_IsValidateTime(toT) == "Y")
	{		if(fromT > toT)
		{
			sReturnValue = "";
		}
		else
		{
			sReturnValue = truncate((scr_fn_TimeToSec(toT) - scr_fn_timeTosec(fromT)));
		}
	}
	else
	{
		sReturnValue = "";
	}

	return sReturnValue;
}

/*********************************************************************
 * 함 수 명 : scr_fn_AddSubSec
 * 함수설명 : 시작시간에서 경과시간을 초를 더하거나 빼서 종료시간을 구한다.
 * 입    력 : iTime - 6자리의 숫자로 된 내부시간형식 (HHMMSS)
 *            iLapse - 초단위의 경과시간 (SSSSS)
 * 결    과 : 종료시간(HHMMSST)
 *********************************************************************/
function scr_fn_AddSubSec(sValue, iLapse)
{
	var sReturnValue = 0;
	var sTmpValue = 0;
	var sFlag = "N";

	if(length(iLapse) == 0 && sFlag == "N")
	{
		alert("경과시간이 없습니다.");
		sReturnValue = "";
		sFlag = "Y";
	}

	if(isdigit(sValue) == false && sFlag == "N")
	{
		alert("경과시간이 숫자 형식이 아닙니다.");
		sReturnValue = "";
		sFlag = "Y";
	}

	if((toNumber(iLapse) > 86399 || toNumber(iLapse) < -86399) && sFlag == "N")
	{
		alert("경과시간은 -86399 ~ 86399 사이의 값입니다.");
		sReturnValue = "";
		sFlag = "Y";
	}

	if(scr_fn_IsValidateTime(sValue) == "N" && sFlag == "N")
	{
		alert("알맞은 시간 유형이 아닙니다.");
		sReturnValue = "";
		sFlag = "Y";
	}

	if(sFlag == "N")
	{
		if(toNumber(sValue) == 0)
		{
			sTmpValue = toNumber(iLapse);
		}
		else
		{
			sTmpValue = toNumber(scr_fn_TimeToSec(sValue)) + toNumber(iLapse);
			if(sReturnValue < 0)
			{
				sTmpValue = sTmpValue + 86400;
			}
		}

		if(sTmpValue > 86399 && sFlag == "N")
		{
			sTmpValue = sTmpValue - 86400;
		}

		sReturnValue = scr_fn_SecToTime(sTmpValue);
	}

	return sReturnValue;
}

/*********************************************************************
 * 함 수 명 : scr_fn_IsNull
 * 함수설명 : Null Value 를 체크한다.
 * 입    력 : String
 * 결    과 : Boolean 입력값이 null = "Y"
 *                         Not Null = "N"
 *********************************************************************/
function scr_fn_IsNull(sValue)
{
	var sReturnValue = "N";

	if(length(toString(sValue)) == 0 )
		sReturnValue = "Y";
	else
		sReturnValue = "N";

	return sReturnValue;
}

/*********************************************************************
 * 함 수 명 : scr_fn_SetComma(sValue)
 * 함수설명 : 입력받은 Number에 Comma 를 추가한다.
 * 입    력 : Number
 * 결    과 : String(Comma 를 포함하고 있는 숫자)
 *            정상 : Comma 가 포함하고 있는 Number Return
 *            Number 가 아닌 경우 : -1 Return
 *********************************************************************/
function scr_fn_SetComma(sValue)
{
	var sSignStr = "";
	var sValueStr = "";
	var sDecimalStr = "";

	var nLength = length(sValue);
	var sReturnValue = -1;

	if( nLength != 0 && isdigit(sValue) == true)
	{
		if(substr(sValue, 0, 1) == "+" || substr(sValue, 0, 1) == "-")
		{
			sSignStr = substr(sValue, 0, 1);
			sValueStr = substr(sValue, 1);
		}
		else sValueStr = sValue;

		var sTemp = split(sValueStr, ".");
		sValueStr = sTemp[0];

		if(scr_fn_IsNull(sTemp[1]) == "N")
		{
			sDecimalStr= "." + sTemp[1];
		}

		fToFloat = ToFloat(sValueStr);
		sReturnValue = sSignStr + Numformat(fToFloat, 0) + sDecimalStr;

	}
	else
	{
		sReturnValue = -1;
	}

	return sReturnValue;
}

/*********************************************************************
 * 함 수 명 : scr_fn_IsSpecialChar(sValue)
 * 함수설명 : 특수문자가 있는지 Check한다.
 * 입    력 : String
 * 결    과 : 특수문자가 있는 경우 : "Y"
 *            특수문자가 없는 경우 : "N"
 *********************************************************************/
function scr_fn_IsSpecialChar(sValue)
{
	var sReturnValue = "Y";
	var iLen = "";
	var i, iBit;
	var sStandard = "~!@#$%^&*-+./=_`{|}()\\?<>";

	iLen = length(sValue);

	if(scr_fn_IsNull(sValue) == "Y")
	{
		sReturnValue = "N";
	}

	for ( i = 0 ; i < iLen ; i++ )
	{
		iBit = substr(sValue, i, 1);
		if( pos(sStandard, iBit)  == -1 )
		{
			sReturnValue = "N";
		}
		else
		{
			sReturnValue = "Y";
			break;
		}
	}

	return sReturnValue;
}

/*********************************************************************
 * 함 수 명 : scr_fn_IsKor(sValue)
 * 함수설명 : 한글만으로 되어 있는지 Check한다.
 * 입    력 : String
 * 결    과 : 한글만 있는 경우 : "Y"
 *            한글외 존재 하는 경우 : "N"
 *********************************************************************/
function scr_fn_IsKor(sValue)
{
	var sReturnValue = "Y";
	var iLen = "";
	var i, iBit;
	iLen = length(sValue);

	if(scr_fn_IsNull(sValue) == "Y")
	{
		sReturnValue = "N";
	}
	else
	{
		for ( i = 0 ; i < iLen ; i++ )
		{
			iBit = substr(sValue, i, 1);
			if((asc(iBit) >= asc("가") && asc(iBit) <= asc("힣")) || asc(iBit) == asc(" "))
			{
				sReturnValue = "Y";
			}
			else
			{
				sReturnValue = "N";
				break;
			}
		}
	}

	return sReturnValue;
}

/*********************************************************************
 * 함 수 명 : scr_fn_IsEmail(sValue)
 * 함수설명 : E-메일 형식에 맞는지 Check한다.
 * 입    력 : String
 * 결    과 : E-메일 형식에 맞는 경우 : "Y"
 *            E-메일 형식에 맞지 않는 경우 : "N"
 *********************************************************************/
function scr_fn_IsEmail(sValue)
{
	var sReturnValue = "N";
	var sTmp = "";
	var sRegExp = "[a-z0-9]+[a-z0-9.,]+@[a-z0-9]+[a-z0-9.,]+\\.[a-z0-9]+";

	var regexp = CreateRegExp(sRegExp,"ig");
	sTmp = regexp.Exec(sValue);

	if( sTmp == null )
			sReturnValue = "N";
	else
	{
		if( ( sTmp.index == 0 ) && (sTmp.length == sValue.length ) )
			sReturnValue = "Y";
		else
			sReturnValue = "N";
	}

	return sReturnValue;
}

/*********************************************************************
 * 함 수 명 : scr_fn_GetSysDate()
 * 함수설명 : 시스템 날짜를 반환한다.
 * 입    력 :
 * 결    과 : 시스템의 날짜를 반환한다. (YYYY-MM-DD)
 *********************************************************************/
function scr_fn_GetSysDate()
{
	var sReturnValue = "";
	var dDate = "";
	var yy, mm, dd;

	dDate = GetDate();
	yy = substr(dDate,0,4);
	mm = substr(dDate,4,2);
	dd = substr(dDate,6,2);

	sReturnValue = yy + "-" + mm + "-" + dd;

	return sReturnValue;
}

/***********************************************************************
 * 함 수 명 : scr_fn_SelectYear
 * 함수설명 : 년도 ComboBox를 년도로 채워준다.
 * 입    력 : cbName           - Object(ComboBox Type)
 *            fromYear, toYear - String('yyyy')
 * 결    과 :
 *********************************************************************/
function scr_fn_SelectYear(cbName, fromYear, toYear)
{
	var curYear;
	var sGap;


	if(length(fromYear) == 0  && length(toYear) == 0)
	{
		sGap = 10;
		curYear  = mid(toDay(), 0, 4);
		fromYear = toNumber(curYear) -5;
	}
	else
	{
		sGap = toNumber(toYear) - toNumber(fromYear);

		if(sGap < 0){
				alert("시작년도가 종료년도보다 나중입니다");
				return;
		}
		if((toNumber(toYear)<1900 || toNumber(toYear)>2100) && toNumber(toYear)!=0){
				alert("종료년도의 범위가 너무 큽니다");
				return;
		}
	}

	var strContents = " <contents>" ;
	for( i=0;i<=sGap;i++)
	{
			var code = ""+(toNumber(fromYear)+i);
			var name = ""+(toNumber(fromYear)+i);
			strContents +="\n <record 	Code='" +code +
											"'	data='" + name + "' /> " ;
	}
	strContents +=' \n</contents> ';

	cbName.ConTents = strContents;

	if(toNumber(toYear) = 0){
		cbName.index = 5;
	}else{
		cbName.index = 0;
	}

	return;

}

/***********************************************************************
 * 함 수 명 : scr_fn_CheckMandatory
 * 함수설명 : Field의 값에 대한 Null Check를 한다.
 * 입    력 : controlID   - Object(DataSet Type)
 *            controlName - String(Column 또는 Component ID)
 * 결    과 : String (성공:'Y', 실패:'N')
 *********************************************************************/
function scr_fn_CheckMandatory(controlID, controlName)
{
	var rtnVal;

	rtnVal = 'Y';

	if(controlID.value == '')
	{
		alert('[' + controlName + '] 필드는 필수 항목입니다.');
		controlID.setFocus();
		rtnVal = 'N';
	}

	return rtnVal;

}

/***********************************************************************
 * 함 수 명 : scr_fn_CheckMandatorys
 * 함수설명 : Field의 값들에 대한 Null Check를 한다.
 * 입    력 : strContrlNameList  - ObjectName List
 *            opt                - Error Msg 처리 허가
 * 결    과 : String (성공:'Y', 실패:'N')
 *********************************************************************/
function scr_fn_CheckMandatorys(strContrlNameList, opt)
{
	var rtnVal;
	var isSuccess;
	var controlCount;
	var arrControl;
	var arrControlID   = array(length(arrControl)/2);
	var arrControlName = array(length(arrControl)/2);


	isSuccess = 'Y';
	arrControl = split(strContrlNameList, ",");

	// 인자값이 정상적으로 들어왔는지를 확인한다.
	if((length(arrControl)%2) == 1)
	{
		alert('Null Check를 위해서는 [Component ID], [Component Name]이 Pair로 넣어주셔야 합니다.');
		isSuccess = 'N';
	}

	// 인자값을 Control ID와 명으로 구분한다.
	controlCount = 0;
	for (i=0; i<length(arrControl)  &&  isSuccess = 'Y'; i++)
	{
		if( (i%2) == 0 )
		{
			arrControlID[controlCount]   = trim(arrControl[i]);
		}
		else
		{
			arrControlName[controlCount] = trim(arrControl[i]);
			controlCount += 1;
		}

	}

	// Not Null Check 작업 수행
	for (i=0; i<controlCount  &&  isSuccess = 'Y'; i++)
	{
		if(object(arrControlID[i]).value == '')
		{
			isSuccess = 'N';

			if(opt == 'Y')
			{
				alert('[' + arrControlName[i] + '] 필드는 필수 항목입니다.');
				object(arrControlID[i]).setFocus();
			}
		}
	}


	rtnVal = decode(isSuccess, 'Y', 'Y', 'N');

	return rtnVal;

}

/***********************************************************************
 * 함 수 명 : scr_fn_IsDsColumn
 * 함수설명 : DataSet의 Column인지 화면의 Component인지 구분한다.
 * 입    력 : dsName  - Object(DataSet Type)
 *            colName - String(Column 또는 Component ID)
 * 결    과 : String (DataSet Column:'Y', 화면 Component:'N', 실패:'E')
 *********************************************************************/
function scr_fn_IsDsColumn(dsName, ColName)
{
	var retVal;

	if( dsName == '')
	{
		retVal = 'N';
	}
	else if( dsName.GetColIndex(ColName) >= 0 )
	{
		retVal = 'Y';
	}
	else if(isValid(Object(ColName)))
	{
		retVal = 'N';
	}
	else
	{
		alert('[' + ColName + '] 에 해당하는 Column 또는 Component가 존재하지 않습니다.');
		retVal = 'E';
	}

	return retVal;

}

/**********************************************************************
 * 함 수 명 : scr_fn_RemoveComma
 * 함수설명 : 컴마를 제거한다.
 * 입    력 : 컴마가 포함된 스트링
 * 결    과 : 컴마가 제거된 스트링이 반환된다.
 *********************************************************************/
function scr_fn_RemoveComma(inSrcStr)
{

  var outChgStr = "";

  /* 변경 문자열 존재하지 않을 때 */
	if(Length(inSrcStr) == 0)
	{
		chkErr    = "Y";
	}
	else
	{
		outChgStr = replace(inSrcStr, ",", "");
	}

	return outChgStr;
}

/**********************************************************************
 * 함 수 명 : scr_fn_RemoveHyphen
 * 함수설명 : 하이픈(-)을 제거한다.
 * 입    력 : 하이픈이 포함된 스트링
 * 결    과 : 하이픈이 제거된 스트링이 반환된다.
 *********************************************************************/
function scr_fn_RemoveHyphen(inSrcStr)
{
  var outChgStr = "";

 	if(Length(inSrcStr) == 0)
	{
		chkErr    = "Y";
	}
	else
	{
		outChgStr = replace(inSrcStr, "-", "");
	}

	return outChgStr;
}


/**********************************************************************
 * 함 수 명 : scr_fn_RemoveSpace
 * 함수설명 : 스페이스을 제거한다.
 * 입    력 : 스페이스이 포함된 스트링
 * 결    과 : 스페이스이 제거된 스트링이 반환된다.
 *********************************************************************/
function scr_fn_RemoveSpace(inSrcStr)
{
  var outChgStr = "";

	if(Length(inSrcStr) == 0)
	{
		chkErr    = "Y";
	}
	else
	{
		outChgStr = replace(inSrcStr, " ", "");
	}

	return outChgStr;
}

/**********************************************************************
 * 함 수 명 : scr_fn_RemoveHyphenZipNum
 * 함수설명 : 우편번호에서 하이픈(-)을 제거한다.
 * 입    력 : 하이픈이 포함된 우편번호
 * 결    과 : 하이픈이 제거된 우편번화가 반환된다.
 *********************************************************************/
function scr_fn_RemoveHyphenZipNum(inSrcStr)
{
  var outChgStr = "";
	//chkErr 				= "N";
 	var opt = "";
	opt += "g";
	opt += "i";

	var regexp = CreateRegExp("[0-9]{3}\-[0-9]{3}",opt);

	if(Length(inSrcStr) == 0)
	{
		chkErr    = "Y";
	}
	else if(Length(inSrcStr) != 7)
	{
		chkErr    = "Y";
	}
	else if(!regexp.Test(inSrcStr))
	{
		chkErr    = "Y";
	}
	else
	{
		outChgStr = replace(inSrcStr, "-", "");
	}

	return outChgStr;
}

/**********************************************************************
 * 함 수 명 : scr_fn_RemoveHyphenCtzNum
 * 함수설명 : 주민번호에서 하이픈(-)을 제거한다.
 * 입    력 : 하이픈이 포함된 주민번호
 * 결    과 : 하이픈이 제거된 주민번호가 반환된다.
 *********************************************************************/
function scr_fn_RemoveHyphenCtzNum(inSrcStr)
{
  var outChgStr = "";

	var opt = "";
	opt += "g";
	opt += "i";

	var regexp = CreateRegExp("[0-9]{6}\-[0-9]{7}",opt);


	if(Length(inSrcStr) == 0)
	{
		chkErr    = "Y";
	}
	else if(Length(inSrcStr) != 14)
	{
		chkErr    = "Y";
	}
	else if(!regexp.Test(inSrcStr))
	{
		chkErr    = "Y";
	}
	else
	{
		outChgStr = replace(inSrcStr, "-", "");
	}

	return outChgStr;
}

/**********************************************************************
 * 함 수 명 : scr_fn_RemoveHyphenBizNum
 * 함수설명 : 법인번호에서 하이픈(-)을 제거한다.
 * 입    력 : 하이픈이 포함된 법인번호
 * 결    과 : 하이픈이 제거된 법인번호가 반환된다.
 *********************************************************************/
function scr_fn_RemoveHyphenBizNum(inSrcStr)
{
  var outChgStr = "";

	var opt = "";
	opt += "g";
	opt += "i";

	var regexp = CreateRegExp("[0-9]{3}\-[0-9]{2}\-[0-9]{5}",opt);

	if(Length(inSrcStr) == 0)
	{
		chkErr    = "Y";
	}
	else if(Length(inSrcStr) != 12)
	{
		chkErr    = "Y";
	}
	else if(!regexp.Test(inSrcStr))
	{
		chkErr    = "Y";
	}
	else
	{
		outChgStr = replace(inSrcStr, "-", "");
	}

	return outChgStr;
}

/**********************************************************************
 * 함 수 명 : scr_fn_RemoveHyphenPhoneNum
 * 함수설명 : 전화번호에서 하이픈(-)을 제거한다.
 * 입    력 : 하이픈이 포함된 전화번호
 * 결    과 : 하이픈이 제거된 전화번호가 반환된다.
 *********************************************************************/
function scr_fn_RemoveHyphenPhoneNum(inSrcStr)
{
	var outChgStr = "";

	var opt = "";
	opt += "g";
	opt += "i";

	var regexp = CreateRegExp("[0-9]{2,3}\-[0-9]{3,4}\-[0-9]{4}",opt);


	if(Length(inSrcStr) == 0)
	{
		chkErr    = "Y";
	}
	else if(Length(inSrcStr) < 11 || Length(inSrcStr) > 15)
	{
		chkErr    = "Y";
	}
	else if(!regexp.Test(inSrcStr))
	{
		chkErr    = "Y";
	}
	else
	{
		outChgStr = replace(inSrcStr, "-", "");
	}

	return outChgStr;
}

/**********************************************************************
 * 함 수 명 : scr_fn_AppendHyphenZipNum
 * 함수설명 : 우편번호에서 하이픈(-)을 추가한다.
 * 입    력 : 하이픈이 없는 우편번호
 * 결    과 : 하이픈이 추가된 우편번호가 반환된다.
 *********************************************************************/
function scr_fn_AppendHyphenZipNum(inSrcStr)
{
  var outChgStr = "";
  var chkErr    = "N";

	if(Length(inSrcStr) == 0)
	{
		chkErr    = "Y";
	}

	else if(!isdigit(inSrcStr))
	{
		chkErr    = "Y";
	}
	else if(Length(inSrcStr) != 6)
	{
		chkErr    = "Y";
	}

	if(chkErr == "N")
	{
		outChgStr = scr_fn_AppendHyphen(inSrcStr, "3 3");
	}
	else
	{
		outChgStr = "";
	}

	return outChgStr;
}

/**********************************************************************
 * 함 수 명 : scr_fn_AppendHyphenCtzNum
 * 함수설명 : 주민번호에서 하이픈(-)을 추가한다.
 * 입    력 : 주민번호, 앞부분입력콘트롤명, 뒷부분입력콘트롤명, 통합입력콘트롤명.
 * 결    과 : 하이픈이 추가된 주민번호가 반환된다.
 *********************************************************************/
function scr_fn_AppendHyphenCtzNum(inSrcStr)
{
  var outChgStr = "";
  var chkErr    = "N";

	if(Length(inSrcStr) == 0)
	{
		chkErr    = "Y";
	}
	else if(!isdigit(inSrcStr))
	{
		chkErr    = "Y";
	}
	else if(Length(inSrcStr) != 13)
	{
		chkErr    = "Y";
	}
	else
	{
		outChgStr = scr_fn_AppendHyphen(inSrcStr, "6 7");
	}

return outChgStr;
}

/**********************************************************************
 * 함 수 명 : scr_fn_AppendHyphenBizNum
 * 함수설명 : 법인번호에서 하이픈(-)을 추가한다.
 * 입    력 : 사업자번호, 앞부분입력콘트롤명, 가운데부분입력콘트롤명,
 *            뒷부분입력콘트롤명, 통합입력콘트롤명.
 * 결    과 : 하이픈이 추가된 법인번호가 반환된다.
 *********************************************************************/
function scr_fn_AppendHyphenBizNum(inSrcStr)
{
	var outChgStr = "";

	if(Length(inSrcStr) == 0)
	{
		chkErr    = "Y";
	}
	else if(!isdigit(inSrcStr))
	{
		chkErr    = "Y";
	}
	else if(Length(inSrcStr) != 10)
	{
		chkErr    = "Y";
	}
	else
	{
		outChgStr = scr_fn_AppendHyphen(inSrcStr, "3 2 5");
	}

	return outChgStr;
}

/**********************************************************************
 * 함 수 명 : scr_fn_AppendHyphen
 * 함수설명 : 문자열에서 하이픈(-)을 추가한다.
 * 입    력 : 하이픈이 없는 문자열
 * 결    과 : 하이픈이 추가된 문자열가 반환된다.
 *********************************************************************/
function scr_fn_AppendHyphen(strNumber,tokenNum)
{
  var retString = "";
  var chkErr    = "N";

 if(Length(strNumber) == 0)
	{
		chkErr = "Y";
	}

	if(Length(tokenNum) == 0)
	{
		chkErr = "Y";
	}

	if(chkErr == "N")
	{
		var arrToken = split(tokenNum, " ");

		for(var i = 0;i < arrToken.length();i++)
		{
			if(i == 0)
			{
				retString += SubStr(strNumber, 0, arrToken[i]);
				retString += "-";
			}
			else if(i < arrToken.length() && i != (arrToken.length() - 1))
			{
				retString += SubStr(strNumber, ToNumber(arrToken[i-1]), ToNumber(arrToken[i]));
				retString += "-";
			}
			else
			{
				retString += SubStr(strNumber, ToNumber(arrToken[i-1]), ToNumber(arrToken[i]));
			}
		}
	}
	return retString;
}

/*********************************************************************
 * 함 수 명 : scr_fn_IsDate
 * 함수설명 : 날짜 여부를 확인한다.(년월 or 년월일)
 * 입    력 : sYmd 입력스트링(YYYYMM or YYYYMMDD)
 * 결    과 : Boolen 형식의 정합성 체크
 *            맞으면 = true, 맞지 않으면 = false
 *********************************************************************/
function scr_fn_IsDate(sYmd)
{
	var bResult;  // 결과값을 담는 변수(Boolean)

	switch(length(sYmd))
	{
		case 6://년월
			bResult =  scr_fn_IsValidateYM(sYmd);
			break;
		case 8://년월일
			bResult =  scr_fn_IsValidateYMD(sYmd);
			break;
		default:
			bResult = false;  // 날짜 값이 아님
		break;
	}

	return bResult;
}

/*********************************************************************
 * 함 수 명 : scr_fn_IsValidateYMD
 * 함수설명 : 날짜 여부를 확인한다.
 * 입    력 : 8자리의 숫자로 된 날짜(YYYYMMDD)
 * 결    과 : Boolen 형식의 정합성 체크
 *            맞으면 = true, 맞지 않으면 = false
 *********************************************************************/
function scr_fn_IsValidateYMD(sYmd)
{
	// 숫자 확인
	if(!isdigit(sYmd)) {
		alert('날짜는 숫자만 입력하십시오');
		return false;
	}

	// 길이 확인
	if(length(sYmd) != 8) {
		alert('일자를 모두 입력하십시오');
		return false;
	}

	var nYear  = toNumber(substr(sYmd,0,4));	// 년도 입력(YYYY)
	var nMonth = toNumber(substr(sYmd,4,2));	// 월입력(MM)
	var nDay   = toNumber(substr(sYmd,6,2));	// 일자입력(DD)

	if((nMonth < 1) || (nMonth > 12)) {
		alert(nMonth+'월의 입력이 잘못 되었습니다.');
		return false;
	}

	// 각 달의 총 날수를 구한다
	var nLastDay = scr_fn_GetLastDay(substr(sYmd,0,6));	// 해당월의 마지말날 계산

	if((nDay < 1) || (nDay > nLastDay)) {
		alert(nMonth+'월의 일자는 1 - '+ nLastDay +'까지입니다.');
		return false;
	}
	return true;
}

/*********************************************************************
 * 함 수 명 : scr_fn_IsValidateYM
 * 함수설명 : 날짜 여부를 확인한다.
 * 입    력 : 6자리의 숫자로 된 날짜(YYYYMM)
 * 결    과 : Boolen 형식의 정합성 체크
 *            맞으면 = true, 맞지 않으면 = false
 *********************************************************************/
function scr_fn_IsValidateYM(sYM)
{
	// 숫자 확인
	if(!isdigit(sYM)) {
		alert('날짜는 숫자만 입력하십시오');
		return false;
	}

	// 길이 확인
	if(length(sYM) != 6) {
		alert('일자를 모두 입력하십시오');
		return false;
	}

	var nYear  = toNumber(substr(sYM,0,4));	//년도값을 숫자로
	var nMonth = toNumber(substr(sYM,4,2));	//월을 숫자로

	if((nMonth < 1) || (nMonth > 12)) {
		alert(nMonth+'월의 입력이 잘못 되었습니다.');
		return false;
	}

	return true;
}

/*********************************************************************
 * 함 수 명 : scr_fn_GetLastDay
 * 함수설명 : 년월을 입력받아 마지막 일를 반환한다(년월)
 * 입    력 : 6자리의 숫자로 된 날짜(YYYYMM)
 * 결    과 : String 해당월의 마지막날
 *********************************************************************/
function scr_fn_GetLastDay(sYM)
{
	if(sYM.length != 6) {
		alert("정확한 년월을 입력하십시요.");
		return;
	}

	if(!scr_fn_IsValidateYM(sYM)) {
		return;
	}

	var daysArray = array(12);

	for(var i = 1; i < 8; i++) {
		daysArray[i] = 30 + (i%2);
	}
	for(var i = 8; i < 13; i++) {
		daysArray[i] = 31 - (i%2);
	}

	var nYear  = toNumber(substr(sYM,0,4));
	var nMonth = toNumber(substr(sYM,4,2));

	if(((nYear % 4 == 0) && (nYear % 100 != 0)) || (nYear % 400 == 0)) {
		daysArray[2] = 29;
	} else {
		daysArray[2] = 28;
	}

	return daysArray[nMonth];
}

/*********************************************************************
 * 함 수 명 : scr_fn_IsIdentifyNo
 * 함수설명 : 주민등록 여부를 확인한다.
 * 입    력 : sID 입력문자열(주민번호 13자리)
 * 결    과 : Boolen 형식의 정합성 체크
 *            맞으면 = true, 맞지 않으면 = false
 *********************************************************************/
function scr_fn_IsIdentifyNo(sID)
{
	var cBit = 0;
	var sCode="234567892345";

	for(var i = 0; i < 12; i++) {
		cBit = cBit + toNumber(substr(sID,i,1)) * toNumber(substr(sCode,i,1));
	}

	cBit = 11-(cBit%11);
	cBit = cBit%10;

	if(toNumber(substr(sID,12,1)) == cBit) {
		return true;
	} else {
		return false;
	}
}

/*********************************************************************
 * 함 수 명 : scr_fn_IsForeignIdentifyNo
 * 함수설명 : 외국인 등록번호 여부를 확인한다.
 * 입    력 : sRegNo 입력문자열(등록번호13자리)
 * 결    과 : Boolen 형식의 정합성 체크
 *            맞으면 = true, 맞지 않으면 = false
 *********************************************************************/
function scr_fn_IsForeignIdentifyNo(sRegNo)
{
	var sum = 0;
	var odd = 0;
	var buf = array(13);
	var multipliers = [2,3,4,5,6,7,8,9,2,3,4,5];

	for(var i = 0; i < 13; i++) {
		buf[i] = toNumber(charAt(sRegNo.charAt(i)));
	}

	odd = buf[7] * 10 + buf[8];

	if((odd%2) != 0) {
		return false;
	}

	if((buf[11] != 6) && (buf[11] != 7) && (buf[11] != 8) && (buf[11] != 9)) {
		return false;
	}

	for(var i = 0; i < 12; i++) {
		buf[i] = buf[i] * multipliers[i];
		sum += buf[i];
	}

	sum = 11 - (sum % 11);

	if(sum >= 10) {
		sum -= 10;
	}

	sum += 2;

	if(sum >= 10) {
		sum -= 10;
	}

	if(sum != buf[12]) {
		return false;
	} else {
		return true;
	}
}

/*********************************************************************
 * 기능 : Dataset Filter Condition String 의 중복조건 제거 함수
 * 범위 : (private)
 * 인수 : strCond	:	Filter 조건 스트링
 * Returns : String
 * 예제 : scr_fn_ArrangeCondition(strCond);
 *********************************************************************/
function scr_fn_ArrangeCondition(strCondition,strText) {

	while(indexOf(strCondition,strText+strText) >= 0) {
		strCondition = replace(strCondition, strText+strText, strText);
	}

	strCondition = iif( left(strCondition,length(strText)) == strText, substr(strCondition,length(strText)), strCondition);
	strCondition = iif(right(strCondition,length(strText)) == strText, substr(strCondition,0,length(strCondition)-length(strText)), strCondition);

	return strCondition;
}

/*********************************************************************
 * 기능 : 입력된 10진수를 16진수로 변환하는 함수
 * 범위 : (public)
 * 인수 : nVal	: 10진수
 * Returns : String
 * 예제 : scr_fn_10To16(nVal);
 *********************************************************************/
function scr_fn_10To16(nVal)
{
	var str16Value = "";
	var nTempValue;
	if(nVal < 16) {
		str16Value = decode(nVal,10,'A',11,'B',12,'C',13,'D',14,'E',15,'F',toString(nVal));
	} else {
		while(nVal >= 16) {
			nTempValue = nVal % 16;
			str16Value = decode(nTempValue,10,'A',11,'B',12,'C',13,'D',14,'E',15,'F',toString(nTempValue)) + str16Value;
			nVal = truncate(nVal / 16);
			if(nVal < 16) str16Value = decode(nVal,10,'A',11,'B',12,'C',13,'D',14,'E',15,'F',toString(nVal)) + str16Value;
		}
	}

	return str16Value;
}

/*********************************************************************
 * 기능 : 입력된 16진수를 10진수로 변환하는 함수
 * 범위 : (public)
 * 인수 : strVal	: 16진수
 * Returns : Number
 * 예제 : scr_fn_10To16(nVal);
 *********************************************************************/
function scr_fn_16To10(strVal)
{
	strVal = toUpper(strVal);
	var arrVal = array();
	var nCnt = length(strVal);
	var n10Value = 0;
	var nTemp10Value;
	var strTemp16Value;
	for(var i = 0; i < nCnt; i++) {
		strTemp16Value = substr(strVal,i,1);
		nTemp10Value = toNumber(decode(strTemp16Value,'A',10,'B',11,'C',12,'D',13,'E',14,'F',15,strTemp16Value));
		for(var j = 0; j < (nCnt-(i+1)); j++) {
			nTemp10Value *= 16;
		}
		n10Value += nTemp10Value;
	}

	return n10Value;
}

/*********************************************************************
 * 기능 : 입력된 실수를 각 국가언어별 표현법으로 표현하는 함수
 * 범위 : (public)
 * 인수 : nVal	: 다국어 숫자포맷 처리할 값
 * Returns : String
 * 예제 : scr_fn_GetLocNumber(nVal);
 *********************************************************************/
function scr_fn_GetLocNumber(nVal)
{
	return NumFormatLoc(nVal,scr_fn_GetSystemLocale());
}

/*********************************************************************
 * 기능 : 소숫점 자리수 만큼 '0' 을 붙여주는 함수
 * 범위 : (public)
 * 인수 : nVal			: 다국어 숫자포맷 처리할 값
 *        nDecLength	: 소숫점 자리수
 * Returns : String
 * 예제 : scr_fn_DecRPad(nVal,nDecLength);
 *********************************************************************/
function scr_fn_DecRPad(nVal,nDecLength)
{
	var strDecChar = ext_RegGetValue("HKEY_CURRENT_USER","Control Panel\\International","sDecimal","S");

	// System Locale 에 정의된 소숫점 이하 자리수 추가해서 처리되므로 미리 사용하지 않는다.
	// var arrVal = split(scr_fn_GetLocNumber(nVal));

	var arrVal;
	if(indexOf(toString(nVal),strDecChar) > -1) {
		arrVal = split(toString(nVal),strDecChar);
	} else {
		arrVal = split(toString(nVal),'.');
	}

	var arrFormatVal = split(scr_fn_GetLocNumber(toNumber(arrVal[0])),strDecChar);
	var strVal = arrFormatVal[0] + strDecChar + rpad(arrVal[1],'0',nDecLength);

	return strVal;
}

/*********************************************************************
 * 기능 : System Locale Code
 * 범위 : (public)
 * 인수 : 
 * Returns : String
 * 예제 : scr_fn_GetSystemLocale();
 *********************************************************************/
var SCR_STR_SYSTEM_LOCALE;
function scr_fn_GetSystemLocale()
{
	if(length(SCR_STR_SYSTEM_LOCALE) > 0) return SCR_STR_SYSTEM_LOCALE;

	switch(toLower(ext_RegGetValue("HKEY_CURRENT_USER","Control Panel\\International","Locale","S")))
	{
		case "00000436" : SCR_STR_SYSTEM_LOCALE = "af-ZA";
					break;
		case "0000041c" : SCR_STR_SYSTEM_LOCALE = "sq-AL";
					break;
		case "00000484" : SCR_STR_SYSTEM_LOCALE = "gsw-FR";
					break;
		case "0000045e" : SCR_STR_SYSTEM_LOCALE = "am-ET";
					break;
		case "00001401" : SCR_STR_SYSTEM_LOCALE = "ar-DZ";
					break;
		case "00003c01" : SCR_STR_SYSTEM_LOCALE = "ar-BH";
					break;
		case "00000c01" : SCR_STR_SYSTEM_LOCALE = "ar-EG";
					break;
		case "00000801" : SCR_STR_SYSTEM_LOCALE = "ar-IQ";
					break;
		case "00002c01" : SCR_STR_SYSTEM_LOCALE = "ar-JO";
					break;
		case "00003401" : SCR_STR_SYSTEM_LOCALE = "ar-KW";
					break;
		case "00003001" : SCR_STR_SYSTEM_LOCALE = "ar-LB";
					break;
		case "00001001" : SCR_STR_SYSTEM_LOCALE = "ar-LY";
					break;
		case "00001801" : SCR_STR_SYSTEM_LOCALE = "ar-MA";
					break;
		case "00002001" : SCR_STR_SYSTEM_LOCALE = "ar-OM";
					break;
		case "00004001" : SCR_STR_SYSTEM_LOCALE = "ar-QA";
					break;
		case "00000401" : SCR_STR_SYSTEM_LOCALE = "ar-SA";
					break;
		case "00002801" : SCR_STR_SYSTEM_LOCALE = "ar-SY";
					break;
		case "00001c01" : SCR_STR_SYSTEM_LOCALE = "ar-TN";
					break;
		case "00003801" : SCR_STR_SYSTEM_LOCALE = "ar-AE";
					break;
		case "00002401" : SCR_STR_SYSTEM_LOCALE = "ar-YE";
					break;
		case "0000042b" : SCR_STR_SYSTEM_LOCALE = "hy-AM";
					break;
		case "0000044d" : SCR_STR_SYSTEM_LOCALE = "as-IN";
					break;
		case "0000082c" : SCR_STR_SYSTEM_LOCALE = "az-Cyrl-AZ";
					break;
		case "0000042c" : SCR_STR_SYSTEM_LOCALE = "az-Latn-AZ";
					break;
		case "0000046d" : SCR_STR_SYSTEM_LOCALE = "ba-RU";
					break;
		case "0000042d" : SCR_STR_SYSTEM_LOCALE = "eu-ES";
					break;
		case "00000423" : SCR_STR_SYSTEM_LOCALE = "be-BY";
					break;
		case "00000445" : SCR_STR_SYSTEM_LOCALE = "bn-IN";
					break;
		case "0000201a" : SCR_STR_SYSTEM_LOCALE = "bs-Cyrl-BA";
					break;
		case "0000141a" : SCR_STR_SYSTEM_LOCALE = "bs-Latn-BA";
					break;
		case "0000047e" : SCR_STR_SYSTEM_LOCALE = "br-FR";
					break;
		case "00000402" : SCR_STR_SYSTEM_LOCALE = "bg-BG";
					break;
		case "00000403" : SCR_STR_SYSTEM_LOCALE = "ca-ES";
					break;
		case "00000c04" : SCR_STR_SYSTEM_LOCALE = "zh-HK";
					break;
		case "00001404" : SCR_STR_SYSTEM_LOCALE = "zh-MO";
					break;
		case "00000804" : SCR_STR_SYSTEM_LOCALE = "zh-CN";
					break;
		case "00001004" : SCR_STR_SYSTEM_LOCALE = "zh-SG";
					break;
		case "00000404" : SCR_STR_SYSTEM_LOCALE = "zh-TW";
					break;
		case "0000101a" : SCR_STR_SYSTEM_LOCALE = "hr-BA";
					break;
		case "0000041a" : SCR_STR_SYSTEM_LOCALE = "hr-HR";
					break;
		case "00000405" : SCR_STR_SYSTEM_LOCALE = "cs-CZ";
					break;
		case "00000406" : SCR_STR_SYSTEM_LOCALE = "da-DK";
					break;
		case "0000048c" : SCR_STR_SYSTEM_LOCALE = "prs-AF";
					break;
		case "00000465" : SCR_STR_SYSTEM_LOCALE = "dv-MV";
					break;
		case "00000813" : SCR_STR_SYSTEM_LOCALE = "nl-BE";
					break;
		case "00000413" : SCR_STR_SYSTEM_LOCALE = "nl-NL";
					break;
		case "00000c09" : SCR_STR_SYSTEM_LOCALE = "en-AU";
					break;
		case "00002809" : SCR_STR_SYSTEM_LOCALE = "en-BZ";
					break;
		case "00001009" : SCR_STR_SYSTEM_LOCALE = "en-CA";
					break;
		case "00002409" : SCR_STR_SYSTEM_LOCALE = "en-029";
					break;
		case "00004009" : SCR_STR_SYSTEM_LOCALE = "en-IN";
					break;
		case "00001809" : SCR_STR_SYSTEM_LOCALE = "en-IE";
					break;
		case "00002009" : SCR_STR_SYSTEM_LOCALE = "en-JM";
					break;
		case "00004409" : SCR_STR_SYSTEM_LOCALE = "en-MY";
					break;
		case "00001409" : SCR_STR_SYSTEM_LOCALE = "en-NZ";
					break;
		case "00003409" : SCR_STR_SYSTEM_LOCALE = "en-PH";
					break;
		case "00004809" : SCR_STR_SYSTEM_LOCALE = "en-SG";
					break;
		case "00001c09" : SCR_STR_SYSTEM_LOCALE = "en-ZA";
					break;
		case "00002c09" : SCR_STR_SYSTEM_LOCALE = "en-TT";
					break;
		case "00000809" : SCR_STR_SYSTEM_LOCALE = "en-GB";
					break;
		case "00000409" : SCR_STR_SYSTEM_LOCALE = "en-US";
					break;
		case "00003009" : SCR_STR_SYSTEM_LOCALE = "en-ZW";
					break;
		case "00000425" : SCR_STR_SYSTEM_LOCALE = "et-EE";
					break;
		case "00000438" : SCR_STR_SYSTEM_LOCALE = "fo-FO";
					break;
		case "00000464" : SCR_STR_SYSTEM_LOCALE = "fil-PH";
					break;
		case "0000040b" : SCR_STR_SYSTEM_LOCALE = "fi-FI";
					break;
		case "0000080c" : SCR_STR_SYSTEM_LOCALE = "fr-BE";
					break;
		case "00000c0c" : SCR_STR_SYSTEM_LOCALE = "fr-CA";
					break;
		case "0000040c" : SCR_STR_SYSTEM_LOCALE = "fr-FR";
					break;
		case "0000140c" : SCR_STR_SYSTEM_LOCALE = "fr-LU";
					break;
		case "0000180c" : SCR_STR_SYSTEM_LOCALE = "fr-MC";
					break;
		case "0000100c" : SCR_STR_SYSTEM_LOCALE = "fr-CH";
					break;
		case "00000462" : SCR_STR_SYSTEM_LOCALE = "fy-NL";
					break;
		case "00000456" : SCR_STR_SYSTEM_LOCALE = "gl-ES";
					break;
		case "00000437" : SCR_STR_SYSTEM_LOCALE = "ka-GE";
					break;
		case "00000c07" : SCR_STR_SYSTEM_LOCALE = "de-AT";
					break;
		case "00000407" : SCR_STR_SYSTEM_LOCALE = "de-DE";
					break;
		case "00001407" : SCR_STR_SYSTEM_LOCALE = "de-LI";
					break;
		case "00001007" : SCR_STR_SYSTEM_LOCALE = "de-LU";
					break;
		case "00000807" : SCR_STR_SYSTEM_LOCALE = "de-CH";
					break;
		case "00000408" : SCR_STR_SYSTEM_LOCALE = "el-GR";
					break;
		case "0000046f" : SCR_STR_SYSTEM_LOCALE = "kl-GL";
					break;
		case "00000447" : SCR_STR_SYSTEM_LOCALE = "gu-IN";
					break;
		case "00000468" : SCR_STR_SYSTEM_LOCALE = "ha-Latn-NG";
					break;
		case "0000040d" : SCR_STR_SYSTEM_LOCALE = "he-IL";
					break;
		case "00000439" : SCR_STR_SYSTEM_LOCALE = "hi-IN";
					break;
		case "0000040e" : SCR_STR_SYSTEM_LOCALE = "hu-HU";
					break;
		case "0000040f" : SCR_STR_SYSTEM_LOCALE = "is-IS";
					break;
		case "00000470" : SCR_STR_SYSTEM_LOCALE = "ig-NG";
					break;
		case "00000421" : SCR_STR_SYSTEM_LOCALE = "id-ID";
					break;
		case "0000085d" : SCR_STR_SYSTEM_LOCALE = "iu-Latn-CA";
					break;
		case "0000045d" : SCR_STR_SYSTEM_LOCALE = "iu-Cans-CA";
					break;
		case "0000083c" : SCR_STR_SYSTEM_LOCALE = "ga-IE";
					break;
		case "00000410" : SCR_STR_SYSTEM_LOCALE = "it-IT";
					break;
		case "00000810" : SCR_STR_SYSTEM_LOCALE = "it-CH";
					break;
		case "00000411" : SCR_STR_SYSTEM_LOCALE = "ja-JP";
					break;
		case "0000044b" : SCR_STR_SYSTEM_LOCALE = "kn-IN";
					break;
		case "0000043f" : SCR_STR_SYSTEM_LOCALE = "kk-KZ";
					break;
		case "00000453" : SCR_STR_SYSTEM_LOCALE = "kh-KH";
					break;
		case "00000486" : SCR_STR_SYSTEM_LOCALE = "qut-GT";
					break;
		case "00000487" : SCR_STR_SYSTEM_LOCALE = "rw-RW";
					break;
		case "00000457" : SCR_STR_SYSTEM_LOCALE = "kok-IN";
					break;
		case "00000412" : SCR_STR_SYSTEM_LOCALE = "ko-KR";
					break;
		case "00000440" : SCR_STR_SYSTEM_LOCALE = "ky-KG";
					break;
		case "00000454" : SCR_STR_SYSTEM_LOCALE = "lo-LA";
					break;
		case "00000426" : SCR_STR_SYSTEM_LOCALE = "lv-LV";
					break;
		case "00000427" : SCR_STR_SYSTEM_LOCALE = "lt-LT";
					break;
		case "0000082e" : SCR_STR_SYSTEM_LOCALE = "dsb-DE";
					break;
		case "0000046e" : SCR_STR_SYSTEM_LOCALE = "lb-LU";
					break;
		case "0000042f" : SCR_STR_SYSTEM_LOCALE = "mk-MK";
					break;
		case "0000083e" : SCR_STR_SYSTEM_LOCALE = "ms-BN";
					break;
		case "0000043e" : SCR_STR_SYSTEM_LOCALE = "ms-MY";
					break;
		case "0000044c" : SCR_STR_SYSTEM_LOCALE = "ml-IN";
					break;
		case "0000043a" : SCR_STR_SYSTEM_LOCALE = "mt-MT";
					break;
		case "00000481" : SCR_STR_SYSTEM_LOCALE = "mi-NZ";
					break;
		case "0000047a" : SCR_STR_SYSTEM_LOCALE = "arn-CL";
					break;
		case "0000044e" : SCR_STR_SYSTEM_LOCALE = "mr-IN";
					break;
		case "0000047c" : SCR_STR_SYSTEM_LOCALE = "moh-CA";
					break;
		case "00000450" : SCR_STR_SYSTEM_LOCALE = "mn-Cyrl-MN";
					break;
		case "00000850" : SCR_STR_SYSTEM_LOCALE = "mn-Mong-CN";
					break;
		case "00000461" : SCR_STR_SYSTEM_LOCALE = "ne-NP";
					break;
		case "00000414" : SCR_STR_SYSTEM_LOCALE = "nb-NO";
					break;
		case "00000814" : SCR_STR_SYSTEM_LOCALE = "nn-NO";
					break;
		case "00000482" : SCR_STR_SYSTEM_LOCALE = "oc-FR";
					break;
		case "00000448" : SCR_STR_SYSTEM_LOCALE = "or-IN";
					break;
		case "00000463" : SCR_STR_SYSTEM_LOCALE = "ps-AF";
					break;
		case "00000429" : SCR_STR_SYSTEM_LOCALE = "fa-IR";
					break;
		case "00000415" : SCR_STR_SYSTEM_LOCALE = "pl-PL";
					break;
		case "00000416" : SCR_STR_SYSTEM_LOCALE = "pt-BR";
					break;
		case "00000816" : SCR_STR_SYSTEM_LOCALE = "pt-PT";
					break;
		case "00000446" : SCR_STR_SYSTEM_LOCALE = "pa-IN";
					break;
		case "0000046b" : SCR_STR_SYSTEM_LOCALE = "quz-BO";
					break;
		case "0000086b" : SCR_STR_SYSTEM_LOCALE = "quz-EC";
					break;
		case "00000c6b" : SCR_STR_SYSTEM_LOCALE = "quz-PE";
					break;
		case "00000418" : SCR_STR_SYSTEM_LOCALE = "ro-RO";
					break;
		case "00000417" : SCR_STR_SYSTEM_LOCALE = "rm-CH";
					break;
		case "00000419" : SCR_STR_SYSTEM_LOCALE = "ru-RU";
					break;
		case "0000243b" : SCR_STR_SYSTEM_LOCALE = "smn-FI";
					break;
		case "0000103b" : SCR_STR_SYSTEM_LOCALE = "smj-NO";
					break;
		case "0000143b" : SCR_STR_SYSTEM_LOCALE = "smj-SE";
					break;
		case "00000c3b" : SCR_STR_SYSTEM_LOCALE = "se-FI";
					break;
		case "0000043b" : SCR_STR_SYSTEM_LOCALE = "se-NO";
					break;
		case "0000083b" : SCR_STR_SYSTEM_LOCALE = "se-SE";
					break;
		case "0000203b" : SCR_STR_SYSTEM_LOCALE = "sms-FI";
					break;
		case "0000183b" : SCR_STR_SYSTEM_LOCALE = "sma-NO";
					break;
		case "00001c3b" : SCR_STR_SYSTEM_LOCALE = "sma-SE";
					break;
		case "0000044f" : SCR_STR_SYSTEM_LOCALE = "sa-IN";
					break;
		case "00001c1a" : SCR_STR_SYSTEM_LOCALE = "sr-Cyrl-BA";
					break;
		case "0000181a" : SCR_STR_SYSTEM_LOCALE = "sr-Latn-BA";
					break;
		case "00000c1a" : SCR_STR_SYSTEM_LOCALE = "sr-Cyrl-CS";
					break;
		case "0000081a" : SCR_STR_SYSTEM_LOCALE = "sr-Latn-CS";
					break;
		case "0000046c" : SCR_STR_SYSTEM_LOCALE = "ns-ZA";
					break;
		case "00000432" : SCR_STR_SYSTEM_LOCALE = "tn-ZA";
					break;
		case "0000045b" : SCR_STR_SYSTEM_LOCALE = "si-LK";
					break;
		case "0000041b" : SCR_STR_SYSTEM_LOCALE = "sk-SK";
					break;
		case "00000424" : SCR_STR_SYSTEM_LOCALE = "sl-SI";
					break;
		case "00002c0a" : SCR_STR_SYSTEM_LOCALE = "es-AR";
					break;
		case "0000400a" : SCR_STR_SYSTEM_LOCALE = "es-BO";
					break;
		case "0000340a" : SCR_STR_SYSTEM_LOCALE = "es-CL";
					break;
		case "0000240a" : SCR_STR_SYSTEM_LOCALE = "es-CO";
					break;
		case "0000140a" : SCR_STR_SYSTEM_LOCALE = "es-CR";
					break;
		case "00001c0a" : SCR_STR_SYSTEM_LOCALE = "es-DO";
					break;
		case "0000300a" : SCR_STR_SYSTEM_LOCALE = "es-EC";
					break;
		case "0000440a" : SCR_STR_SYSTEM_LOCALE = "es-SV";
					break;
		case "0000100a" : SCR_STR_SYSTEM_LOCALE = "es-GT";
					break;
		case "0000480a" : SCR_STR_SYSTEM_LOCALE = "es-HN";
					break;
		case "0000080a" : SCR_STR_SYSTEM_LOCALE = "es-MX";
					break;
		case "00004c0a" : SCR_STR_SYSTEM_LOCALE = "es-NI";
					break;
		case "0000180a" : SCR_STR_SYSTEM_LOCALE = "es-PA";
					break;
		case "00003c0a" : SCR_STR_SYSTEM_LOCALE = "es-PY";
					break;
		case "0000280a" : SCR_STR_SYSTEM_LOCALE = "es-PE";
					break;
		case "0000500a" : SCR_STR_SYSTEM_LOCALE = "es-PR";
					break;
		case "00000c0a" : SCR_STR_SYSTEM_LOCALE = "es-ES";
					break;
		case "0000040a" : SCR_STR_SYSTEM_LOCALE = "es-ES_tradnl";
					break;
		case "0000540a" : SCR_STR_SYSTEM_LOCALE = "es-US";
					break;
		case "0000380a" : SCR_STR_SYSTEM_LOCALE = "es-UY";
					break;
		case "0000200a" : SCR_STR_SYSTEM_LOCALE = "es-VE";
					break;
		case "00000441" : SCR_STR_SYSTEM_LOCALE = "sw-KE";
					break;
		case "0000081d" : SCR_STR_SYSTEM_LOCALE = "sv-FI";
					break;
		case "0000041d" : SCR_STR_SYSTEM_LOCALE = "sv-SE";
					break;
		case "0000045a" : SCR_STR_SYSTEM_LOCALE = "syr-SY";
					break;
		case "00000428" : SCR_STR_SYSTEM_LOCALE = "tg-Cyrl-TJ";
					break;
		case "0000085f" : SCR_STR_SYSTEM_LOCALE = "tzm-Latn-DZ";
					break;
		case "00000449" : SCR_STR_SYSTEM_LOCALE = "ta-IN";
					break;
		case "00000444" : SCR_STR_SYSTEM_LOCALE = "tt-RU";
					break;
		case "0000044a" : SCR_STR_SYSTEM_LOCALE = "te-IN";
					break;
		case "0000041e" : SCR_STR_SYSTEM_LOCALE = "th-TH";
					break;
		case "00000851" : SCR_STR_SYSTEM_LOCALE = "bo-BT";
					break;
		case "00000451" : SCR_STR_SYSTEM_LOCALE = "bo-CN";
					break;
		case "0000041f" : SCR_STR_SYSTEM_LOCALE = "tr-TR";
					break;
		case "00000442" : SCR_STR_SYSTEM_LOCALE = "tk-TM";
					break;
		case "00000480" : SCR_STR_SYSTEM_LOCALE = "ug-CN";
					break;
		case "00000422" : SCR_STR_SYSTEM_LOCALE = "uk-UA";
					break;
		case "0000042e" : SCR_STR_SYSTEM_LOCALE = "wen-DE";
					break;
		case "00000820" : SCR_STR_SYSTEM_LOCALE = "tr-IN";
					break;
		case "00000420" : SCR_STR_SYSTEM_LOCALE = "ur-PK";
					break;
		case "00000843" : SCR_STR_SYSTEM_LOCALE = "uz-Cyrl-UZ";
					break;
		case "00000443" : SCR_STR_SYSTEM_LOCALE = "uz-Latn-UZ";
					break;
		case "0000042a" : SCR_STR_SYSTEM_LOCALE = "vi-VN";
					break;
		case "00000452" : SCR_STR_SYSTEM_LOCALE = "cy-GB";
					break;
		case "00000488" : SCR_STR_SYSTEM_LOCALE = "wo-SN";
					break;
		case "00000434" : SCR_STR_SYSTEM_LOCALE = "xh-ZA";
					break;
		case "00000485" : SCR_STR_SYSTEM_LOCALE = "sah-RU";
					break;
		case "00000478" : SCR_STR_SYSTEM_LOCALE = "ii-CN";
					break;
		case "0000046a" : SCR_STR_SYSTEM_LOCALE = "yo-NG";
					break;
		case "00000435" : SCR_STR_SYSTEM_LOCALE = "zu-ZA";
					break;
		default : SCR_STR_SYSTEM_LOCALE = "ko-KR";
					break;
	}

	return SCR_STR_SYSTEM_LOCALE;
}