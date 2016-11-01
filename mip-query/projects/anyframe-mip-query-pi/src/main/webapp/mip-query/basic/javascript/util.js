﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿/*
    File Name	: util.js
    Description	: Utility function 모듈
    Author		: Anyframe
*/

// 그리드 소트를 위한 소트 마크
// △▲▼▽↑↓∧∨
var ASC_MARK = "▲";
var DESC_MARK = "▼";

// *****************************************************************
// Function Name: gfnIsNull
// Description	: Null 체크
// Argument		: strValue(체크할 값)
// Return		: boolean
// *****************************************************************
function gfnIsNull(strValue) {
	if(strValue == null || length(trim(strValue)) == 0) {
		return true;
	} else {
		return false;
	}
}

// *****************************************************************
// Function Name: gfnCheckURL
// Description	: URL 체크
// Argument		: strValue(체크할 값 )
// Return		: boolean
// *****************************************************************
function gfnCheckURL(strValue){
	if(gfnIsNull(strValue)){
		return false;
	} else if(indexOf(strValue, ".") == -1) {
		return false;
	} else {
		return true;
	}
}

// *****************************************************************
// Function Name: gfnCheckEmail
// Description	: email address 유효성 체크
// Argument		: strValue(체크할 값)
// Return		: boolean
// *****************************************************************
function gfnCheckEmail(strValue) {
	var nIndexOfAt = indexOf(strValue, "@");
	var nIndexOfDot =indexOf(strValue, ".");
	var nLength = strValue.length;
	
	if(gfnIsNull(strValue)) {
		return false;
	}
	
	// "@" 이 하나도 없거나 맨 끝에 위치한  경우
	if (nIndexOfAt <= 0 || nIndexOfAt == nLength) {
		return false;
	}
	
	// "." 이 하나도 없거나 맨 끝에 위치한 경우
	if (nIndexOfDot <=0 || nIndexOfDot == nLength){
		return false;
	}
	
	// "@"이 두개 이상 존재하는 경우
	if (indexOf(strValue, "@" , nIndexOfAt + 1) != -1){
		return false;
	}
	
	// ".@" 인 경우 또는 "@."인 경우 
	if (substr(strValue, nIndexOfAt - 1, 1) == "." || substr(strValue, nIndexOfAt + 1, 1) == ".") {
		return false;
	}
	
	// "@" 이후에 "."이 존재하지 않는 경우
	if (indexOf(strValue, ".", (nIndexOfAt + 2)) == -1){
		return false;
	}
	
	// 공백문자가 존재하는 경우
	if (indexOf(strValue, " ") != -1){
		return false;
	}
	
	return true;	
}

// *****************************************************************
// Function Name: gfnCheckPhone
// Description	: 전화번호 유효성 체크
// Argument		: strValue(체크할 값)
// Return		: boolean
// *****************************************************************
function gfnCheckPhone(strValue) {
	
	// null 이거나 "-"이 존재하지 않는 경우 
    if(gfnIsNull(strValue) || (!gfnIsNull(strValue) && indexOf(strValue, "-") == -1)){
    	return false;
    	
    } else if (indexOf(strValue, ".") >= 0) {
		return false;
		
	} else {	
		// "-" 사이의 값이 숫자가 아닌 경우
		var arrNumbers = split(strValue, "-");
	
		for(var i = 0; i < length(arrNumbers) ; i++){
			if(!gfnCheckNumber(arrNumbers[i], "+")) {
				return false;
			}
		}
	}	
	return true;
}

// *****************************************************************
// Function Name: gfnChkResNo
// Description	: 주민등록번호 적함성 여부 체크 함수
// Argument		: strValue(필드값)
// Return		: boolean
// *****************************************************************
function gfnCheckResNo(strValue) {

	var pattern = createRegExp("^[0-9]{6}-(1|2|3|4)[0-9]{6}$");
	
	if (!pattern.test(strValue)) {
		return false;
	}
	
	strValue = replace(strValue, "-", "");
		
	var nSum = 0;
	var nChkNum = parseInt(substr(strValue, 12));
	var strBases = "234567892345";
	var strNum;
	
	for(var i = 0 ; i < 12 ; i++) {
		strNum = substr(strValue, i, 1);
		
		if(!isdigit(strNum)){
			return false;
		}
		
		nSum += parseInt(strNum) * parseInt(substr(strBases, i, 1));
	}
	
	if((11 - (nSum % 11)) % 10 == nChkNum) {
		return true;
	} else {
		return false;
	}
}

// *****************************************************************
// Function Name: gfnCheckDate8
// Description	: 8자리 날짜 유효성 체크
// Argument		: strValue(체크할 값, yyyyMMdd)
// Return		: boolean
// *****************************************************************
function gfnCheckDate8(strValue) {
	if(length(strValue) != 8) {
		return false;
	} else if(getDay(strValue) < 0) {
		return false;
	}	
	return true;
}

// *****************************************************************
// Function Name: gfnCheckDate10
// Description	: 10자리 날짜 유효성 체크
// Argument		: strValue(체크할 값, yyyy-MM-dd 또는 yyyy/Mm/dd 또는 yyyy.MM.dd)
// Return		: boolean
// *****************************************************************
function gfnCheckDate10(strValue) {
	return gfnCheckDate8(replace(replace(replace(strValue, "/", ""), "-", ""), "." , ""));
}


// *****************************************************************
// Function Name: gfnCheckTime12
// Description	: 시간(12시기준) 유효성 체크
// Argument		: strValue(체크할 값) - hh:mm:ss am|pm
// Return		: boolean
// *****************************************************************
function gfnCheckTime12(strValue) {
	var pattern = createRegExp("^(([0]?[1-9]|1[0-2]):[0-5][0-9](:[0-5][0-9])?( )?(AM|am|aM|Am|PM|pm|pM|Pm))$", "");
	
	if(pattern.test(strValue)) {
		return true;
	} else {
		return false;
	}
}

// *****************************************************************
// Function Name: gfnCheckTime24
// Description	: 시간(24시기준) 유효성 체크
// Argument		: strValue(체크할 값) - hh:mm:ss
// Return		: boolean
// *****************************************************************
function gfnCheckTime24(strValue) {
	var pattern = createRegExp("^(([0]?[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?)$", "");
	
	if(pattern.test(strValue)) {
		return true;
	} else {
		return false;
	}
}

// *****************************************************************
// Function Name: gfnCheckPassword
// Description	: 페스워드 유효성 체크(6~8글자, 문자 또는 숫자의 조합)
// Argument		: strValue(체크할 값)
// Return		: boolean
// *****************************************************************
function gfnCheckPassword(strValue) {
	var nLength = length(strValue);
	
    if( nLength < 6 || nLength > 8) {
		return false;
		
	} else if( !isalnum(strValue) ) {
		return false;
	}	
	return true;
}

// *****************************************************************
// Function Name: gfnCheckNumber
// Description	: 숫자 체크(양의 정수인 경우 true 리턴)
// Argument		: strValue(체크할 값), strSign(음수나 소수를 체크할 문자, '-', '.')
// Return		: boolean
// *****************************************************************
function gfnCheckNumber(strValue, strSign) {
	var strBase = "1234567890";
    var bReturn = true;
    
    if (strSign != ""){
        strBase += strSign;
    }

    if (gfnIsNull(strValue)){
        bReturn = false;
        
    } else {
		for(var i = 0 ; i < length(strValue) ; i++){
			if(indexOf(strBase, substr(strValue, i, 1)) < 0){
				bReturn=false;
				break;
		    }
		}
    }
    return bReturn;
}

// *****************************************************************
// Function Name: gfnCheckDatasetRequired
// Description	: Dataset의 변경된 내용 중 필수항목 체크
// Argument		: objDataset(데이터셋 콤포넌트의 이름), arrColumnIds(컬럼ID 배열)
// Return		: arrInvalidColumns("rowNumber;columnId"형식의 String 배열)
// *****************************************************************
function gfnCheckDatasetRequired(objDataset, arrColumnIds) {
	var strColumnValue;
	var arrInvalidColumns = array();
	
	for(var i = 0 ; i < objDataset.rowCount ; i++) {
	
		if(objDataset.getRowType(i) != "normal") {
		
			for(var j = 0 ; j < length(arrColumnIds) ; j++){
			
				strColumnValue = objDataset.getColumn(i, arrColumnIds[j]);
				
				if (gfnIsNull(toString(strColumnValue))) {
					arrInvalidColumns[arrInvalidColumns.length] = i + ";" + arrColumnIds[j];
				}
			}
		}
	}
	return arrInvalidColumns;
}

// *****************************************************************
// Function Name: gfnPrintDataset
// Description	: 데이터셋의 내용 출력
// Argument		: objDataset(데이터셋 콤포넌트의 이름)
// Return		: N/A
// *****************************************************************
function gfnPrintDataset(objDataset) {
	var i,j;
	var strBuffer = "";
	var nRowCount = objDataset.rowCount();
	var nColCount = objDataset.colCount();
	
	//objDataset ID 출력
	strBuffer = "[" + objDataset.id + "]\n\n"; 
	
	//Column ID 출력
	strBuffer = strBuffer + "|";
	
	for (j = 0 ; j < nColCount ; j++) {
		strBuffer = strBuffer + objDataset.getColId(j) + "\t|";
	}
	strBuffer = strBuffer + "\n\n";
	
	//Column Data 출력 
	for (i = 0 ; i < nRowCount ; i++) {
		strBuffer = strBuffer + "Row "+ i + " :\n";
		
		for (j = 0 ; j < nColCount ; j++) {
			strBuffer = strBuffer + objDataset.getColumn(i, j);
			
			if ((j == 10)||(j == 20)||(j == 30)||(j == 40)||(j == 50)) {
				strBuffer = strBuffer + "\n|";
			} else {
				strBuffer = strBuffer + "\t|";
			}
		}
		strBuffer = strBuffer + "\n\n";
	}
	gfnMsg(strBuffer);
}

// *****************************************************************
// Function Name: gfnDSClear
// Description	: 데이터셋의 내용 clear
// Argument		: strDataset("데이터셋아이디1 데이터셋아이이디2 ...")
// Return		: N/A
// *****************************************************************
function gfnDatasetClear(strDataset) { 
	var arrDatasets = split(strDataset, " ");
	
	for(var i = 0 ; i < length(arrDatasets) ; i++) {
		object(arrDatasets[i]).clearData();
	}	
}

// *****************************************************************
// Function Name: gfnGetFormatedTelNum
// Description	: 해당 전화번호 컨버전을 한다.
//				※Mobile의 경우 서울외 지역번호와 같은 로직으로 처리된다.
// Argument		: strTelNum(숫자로만 구성된 전화번호)
// Return		: strTelNum('-'문자가 포함된 전화번호 리턴)
// *****************************************************************
function gfnGetFormatedTelNum(strTelNum) {
 	var nLength = length(trim(strTelNum));
 	
 	//	지역번호
 	//	서울 02	 경기 031 인천 032 강원 033 
 	//	충남 041 대전 042 충북 043 부산 051 
 	//	울산 052 대구 053 경북 054 경남 055 
 	//	전남 061 광주 062 전북 063 제주 064 	
 	if(substr(strTelNum, 0, 2) == "02") {
		if(nLength == 10) {
			strTelNum = substr(strTelNum, 0, 2) + "-" + substr(strTelNum, 2, 4) + "-" + substr(strTelNum, 6);
		} else if(nLength == 9) {
			strTelNum = substr(strTelNum, 0, 2) + "-" + substr(strTelNum, 2, 3) + "-" + substr(strTelNum, 5);
		}
	} else {
		if(nLength == 11) {
			strTelNum = substr(strTelNum, 0, 3) + "-" + substr(strTelNum, 3, 4) + "-" + substr(strTelNum, 7);
		} else if(nLength == 10) {
			strTelNum = substr(strTelNum, 0, 3) + "-" + substr(strTelNum, 3, 3) + "-" + substr(strTelNum, 6);
		}
	}	
	return strTelNum;
}

// *****************************************************************
// Function Name: gfnGetReplacedString
// Description	: 지정된 String의 placeholder를 지정된 arrReplaceStrings 요소 값에 해당하는 텍스트로 바꿉니다.
//                ex )
//                var aList = ["gfnGetReplacedString", "예제" , "프로그램" ];
//                alert( gfnGetReplacedString( "이 프로그램은 \"{0}\"함수에 대한 \"{1} {2}\" 입니다.",  aList ) );
// Argument		: strFormat(placeholer({})가 포함된 문자열. 예:"test[{0}]"), arrReplaceStrings({}로 지정된 PlaceHolder에 치환될 값)
// Return		: arrReplaceStrings으로 치환된 문자열
// *****************************************************************
function gfnGetReplacedString(strFormat, arrReplaceStrings) {
	for( var i = 0 ; i < length(arrReplaceStrings) ; i++ ){
		strFormat = replace(strFormat, "{" + i + "}", arrReplaceStrings[i]);
	}
	return strFormat;
}

// *****************************************************************
// Function Name: gfnGetFileExt
// Description	: 파일명에서 확장자를 가져온다.
// Argument		: strFileName(파일명)
// Return		: strFileExt(파일 확장자)
// *****************************************************************
function gfnGetFileExt(strFileName){
	var arrFileName = split(strFileName, ".");
	var strFileExt = arrFileName[arrFileName.length - 1];
	
	return trim(strFileExt);
}

// *****************************************************************
// Function Name: gfnGridSort
// Description	: Grid에서 헤더를 클릭하면 해당 셀들이 소트된다 (ASC, DESC 토글)
// Argument		: obj(그리드 콤포넌트의 이름 (예 : grdInsert)), objDataset(데이터셋 콤포넌트의 이름 (예 : dsGrid01)), nCell(해당셀번호 (HeadClick 이벤트에서 받은 nCell을 그대로 지정)), nCellBody(선택된 Head와 매핑된 Body에서의 nCell), nColumnCount(그리드의 컬럼의 수(이 수만큼 토글처리를 한다.))
// Return		: N/A
// *****************************************************************
function gfnGridSort(obj, objDataset, nCell, nCellBody, nColumnCount) {
	var strHeadText;
	//---------------------------------------------------------
	//  해당하는 셀의 타이틀의 소트마크를 추가 또는 변경한다.
	//---------------------------------------------------------
	if(right(obj.getCellProp("head", nCell, "text"), 1) == ASC_MARK) {
		objDataset.sort(obj.getCellProp("body", nCellBody, "colid"), false);
		strHeadText = obj.getCellProp("head", nCell, "text");
		strHeadText = replace(strHeadText, ASC_MARK, "");
		strHeadText = strHeadText + DESC_MARK;
	} else {
		objDataset.sort(obj.getCellProp("Body", nCellBody, "colid"), true);
		strHeadText = obj.getCellProp("head", nCell, "text");
		strHeadText = replace(strHeadText, DESC_MARK, "");
		strHeadText = strHeadText + ASC_MARK;
	}
	 
	obj.setCellProp("head", nCell, "text", strHeadText);
	
	//---------------------------------------------------------
	//  해당하는 셀 이외의 해더 타이틀의 소트마크를 제거한다.
	//---------------------------------------------------------
	for(var i = 0 ; i < nColumnCount ; i++) {
		if(nCell != i) {
			strHeadText = replace(obj.getCellProp("head", i, "text"), ASC_MARK, "");
			obj.setCellProp("head", i, "text", strHeadText);
			
			strHeadText = replace(obj.getCellProp("head", i, "text"), DESC_MARK, "");
			obj.setCellProp("head", i, "text", strHeadText);
		}
	}
}

// *****************************************************************
// Function Name: gfnSubtractDay
// Description	: strDate 일기준으로 strDay 만큼 뺀날을 가져온다.
// Argument		: strDate(기준일 - yyyyMMdd), strOffSet(뺄 일수)
// Return		: strDate
// *****************************************************************
function gfnSubtractDay(strDate, strOffSet) {
	return addDate(strDate, toInteger("-" + strOffSet));
}

// *****************************************************************
// Function Name: gfnAddDay
// Description	: strDate 일기준으로 strDay 만큼 더한 날을 가져온다.
// Argument		: strDate(기준일 - yyyyMMdd), strOffSet(더할 일수)
// Return		: strDate
// *****************************************************************
function gfnAddDay(strDate, strOffSet) {
	return addDate(strDate, toInteger(strOffSet)); 
}

// *****************************************************************
// Function Name: gfnCalcMonth
// Description	: 입력받은 from월로부터 입력to월까지 개월수반환하기
// Argument		: strFromDate(~부터, yyyyMMdd), strToDate(~까지, yyyyMMdd)
// Return		: strMonths
// *****************************************************************
function gfnCalcMonth(strFromDate, strToDate) {
	var nMonth = 0;
	var nYear = 0;
	var strMonths = 0; //반환할 개월 수
	
	if(parseDateTime(strFromDate) <= parseDateTime(strToDate)){
		nYear = parseInt(left(strToDate, 4)) - parseInt(left(strFromDate, 4));
		nMonth = parseInt(substr(strToDate, 4, 2)) - parseInt(substr(strFromDate, 4, 2));
		strMonths = (12 * nYear) + nMonth + 1;
	}	
	return strMonths;
}

// *****************************************************************
// Function Name: gfnCalcDay
// Description	: 입력받은 from일로부터 입력to일까지 일수 반환하기
// Argument		: strFromDate(~부터, yyyyMMdd), strToDate(~까지, yyyyMMdd)
// Return		: nDays : strFromDate가 strToDate보다 클 경우 -1 리턴
// *****************************************************************
function gfnCalcDay(strFromDate, strToDate) {
	var nDays = -1; //반환할 일수
	
	strFromDate = parseDateTime(strFromDate);
	strToDate = parseDateTime(strToDate);
	
	if(strFromDate <= strToDate){
		nDays = strToDate - strFromDate + 1;
	}	
	return nDays;
}

// *****************************************************************
// Function Name: gfnGetLastDate
// Description	: 현재 날짜가 속한 월의 마지막 날짜를 구한다.
// Argument		: strDate(날짜, yyyyMM || yyyyMMdd || yyyyMMddhhmmss)
// Return		: strLastDate(Date 값 리턴, 예: 20090331)
// *****************************************************************
function gfnGetLastDate(strDate) {
	if(length(strDate) > 6) {
		strDate = left(strDate, 6);
	}
	var strFirstOfNextMonth = addMonth(strDate + "01", 1);
	var strLastDate = addDate(strFirstOfNextMonth, -1);
	
	return strLastDate;
}

// *****************************************************************
// Function Name: gfnGetLastDay
// Description	: 해당 년도의 해당 월의 마지막 일자를 구한다.
// Argument		: strDate(날짜, yyyyMM || yyyyMMdd || yyyyMMddhhmmss)
// Return		: strLastDay(Day 값 리턴, 예:31)
// *****************************************************************
function gfnGetLastDay(strDate) {
	if(length(strDate) > 6) {
		strDate = left(strDate, 6);
	}	
	var strLastDay = right(gfnGetLastDate(strDate), 2);

	return strLastDay;
}

// *****************************************************************
// Function Name: gfnIsHoliday
// Description	: 달력에서 공휴일 처리
// Argument		: strDate(날짜, yyyyMMdd)
// Return		: strHoliday(공휴일 이름)
// *****************************************************************
function gfnIsHoliday(strDate) {
	var strSolar = right(strDate, 4);
	var strLunar = right(solar2lunar(strDate), 4);
	var arrHolidaysOfSolar = split(gfnGetMessage("MSG_SOL_HOLIDAYS"), ":");
	var arrHolidaysOfLunar = split(gfnGetMessage("MSG_LUN_HOLIDAYS"), ":");	
	
	// 양력 체크
	for(var i = 0 ; i < length(arrHolidaysOfSolar) ; i++) {
		if(strSolar == arrHolidaysOfSolar[i]) {
			return gfnGetMessage("HOL_SOL_" + arrHolidaysOfSolar[i]);
		}
	}
	
	// 음력 체크
	for(var i = 0 ; i < length(arrHolidaysOfLunar) ; i++) {
		if(strLunar == arrHolidaysOfLunar[i]) {
			return gfnGetMessage("HOL_LUN_" + arrHolidaysOfLunar[i]);
		}
	}
		
	// 일요일 Check
	if(getDay(strDate) == 0)
		return gfnGetMessage("MSG_SUNDAY");
		
	return "";
}

// *****************************************************************
// Function Name: gfnSetUserName
// Description	: Dataset에 Row추가 시 Global Dataset의 User Name을 해당 Dataset의 필드에 추가 한다.
// Argument		: objDataset(데이터 셋), strColumnName(User Name이 들어갈 Dataset의 컬럼 이름)
// Return		: N/A
// *****************************************************************
function gfnSetUserName(objDataset, strColumnName) {
	var strUserName = gdsUser.getColumn(0, "USER_NAME");
	if(!gfnIsNull(strUserName)){
		objDataset.setColumn(objDataset.currow, strColumnName, strUserName);
	}
}

// *****************************************************************
// Function Name: gfnSetUserId
// Description	: Dataset에 Row추가 시 Global Dataset의 User ID를 해당 Dataset의 필드에 추가 한다.
// Argument		: objDataset(데이터 셋), strColumnName(User ID가 들어갈 Dataset의 컬럼 이름)
// Return		: N/A
// *****************************************************************
function gfnSetUserId(objDataset, strColumnName) {
	var strUserId = gdsUser.getColumn(0, "USER_ID");
	if(!gfnIsNull(strUserId)){
		objDataset.setColumn(objDataset.currow, strColumnName, strUserId);
	}
}

// *****************************************************************
// Function Name: gfnGetUserId
// Description	: Session의 USER_ID 리턴
// Argument		: 없음
// Return		: Session의 USER_ID
// *****************************************************************
function gfnGetUserId() {
	return gdsUser.getColumn(0,"USER_ID");
}

// *****************************************************************
// Function Name: gfnGetUserName
// Description	: Session의 USER_NAME 리턴
// Argument		: 없음
// Return		: Session의 USER_NAME
// *****************************************************************
function gfnGetUserName() {
	return gdsUser.getColumn(0,"USER_NAME");
}

// *****************************************************************
// Function Name: gfnGetUserEnName
// Description	: Session의 EN_NAME 리턴
// Argument		: 없음
// Return		: Session의 EN_NAME
// *****************************************************************
function gfnGetUserEnName() {
	return gdsUser.getColumn(0,"EN_NAME");
}

// *****************************************************************************
// Function Name: gfnIsEnterKeyDown
// Description	: Enter key 입력시 체크
// Argument		: OnKeyDown 이벤트에 대한 arguments
// Return		: Enter Key 입력 시 True
// *****************************************************************************
function gfnIsEnterKeyDown(obj, nChar, bShift, bCtrl, bAlt, LLParam, HLParam) {
	if(bShift == 0 && bAlt == 0 && nChar == 13){
		applyData(obj);
		return true;
	} else {
		return false;
	}
}