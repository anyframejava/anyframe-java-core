﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿/*
    File Name	: message.js
    Description	: 화면 출력용 메세지 모음
    Author		: 공통팀
    Date		: 2008.10.1
*/

/*========== 한국어 ==================*/
var CBO_ALL_KO = "전체";
var CBO_SEL_KO = "선택";
var CBO_EMP_KO = "";

var MSG_SEARCH_SUCCESS_KO = "검색이 완료되었습니다.";
var MSG_SAVE_SUCCESS_KO = "저장되었습니다.";
var MSG_CREATE_SUCCESS_KO = "등록되었습니다.";
var MSG_UPDATE_SUCCESS_KO = "수정되었습니다.";
var MSG_REMOVE_SUCCESS_KO = "삭제되었습니다.";
var MSG_NO_UPDATE_KO = "변경된 내역이 없습니다.";
var MSG_PAGING_WITHOUT_UPDATE_KO = "변경된 내역이 있습니다.\n변경 여부에 상관없이 페이지 이동을 하시겠습니까?";
var MSG_SEARCH_WITHOUT_UPDATE_KO = "변경된 내역이 있습니다.\n변경 여부에 상관없이 다른 항목을 조회하시겠습니까?";
var MSG_CLOSE_WITHOUT_UPDATE_KO = "변경된 내역이 있습니다.\n변경여부에 상관없이 창을 닫으시겠습니까?";
var MSG_DELETE_CONFIRM_KO = "삭제하시겠습니까?";
var MSG_DELETE_WITHOUT_UPDATE_KO = "변경된 내역이 있습니다.\n삭제 시, 변경된 내역은 반영되지 않습니다.\n변경여부에 상관없이 삭제하시겠습니까?";
var MSG_NOT_FOUND_KO = "지정된 조건에 해당하는 항목을 찾을 수 없습니다.";
var MSG_NOT_SELECTED_KO = "선택된 항목이 없습니다.";
var MSG_CHECK_TO_DELETE_KO = "삭제할 내용을 체크하세요.";
var MSG_SELECT_TO_DELETE_KO = "삭제할 항목을 선택하세요.";
var MSG_NO_DATA_KO = "조회된 데이터가 없습니다.";

var MSG_SELECT_FILE_KO = "다운로드할 파일을 선택하세요.";
var MSG_SAVE_FILE_KO = "파일을 저장하시겠습니까?";
var MSG_ATTACH_MAX_KO = "최대 $1개의 첨부파일만 등록하실 수 있습니다.";
var MSG_ATTACH_SIZE_OVER_KO = "첨부할 수 있는 최대 크기인 $1 MByte를 초과합니다.";

//validation 관련 메세지
var MSG_REQUIRED_KO = "$1 항목은 필수값입니다.";
var MSG_MIN_LENGTH_KO = "$1 항목은 $2자 이상 입력하세요.";
var MSG_MAX_LENGTH_KO = "$1 항목은 영문 $2자, 한글 $3자 까지 입력이 가능합니다.";
var MSG_ONLY_REAL_KO = "$1 항목은 실수만 입력 가능합니다.";
var MSG_ONLY_INTEGER_KO = "$1 항목은 정수만 입력 가능합니다.";
var MSG_ONLY_NUMBER_KO = "$1 항목은 숫자만 입력 가능합니다.";
var MSG_LIMIT_MIN_KO = "$1 항목에 $2 이상의 숫자를 입력하세요.";
var MSG_LIMIT_MAX_KO = "$1 항목에 $2 이하의 숫자를 입력하세요.";
var MSG_INVALID_EMAIL_KO = "$1 항목의 email 주소가 잘못된 형태로 입력되었습니다.\n\n 입력 예) test@anyframe.org";
var MSG_INVALID_URL_KO = "$1 항목의 웹사이트 주소가 잘못된 형태로 입력되었습니다.\n\n 입력 예) www.anyframejava.org";
var MSG_INVALID_PHONE_KO = "$1 항목의 전화번호가 잘못된 형태로 입력되었습니다.\n\n 입력 예) 02-202-0020";
var MSG_INVALID_RESNO_KO = "$1 항목의 주민번호가 잘못된 형태로 입력되었습니다.";
var MSG_INVALID_DATE_KO = "항목의 날짜 정보가 잘못된 형태로 입력되었습니다.";
var MSG_INVALID_DATE8_KO = "$1 항목의 날짜 정보가 잘못된 형태로 입력되었습니다.\n\n 입력 예) 20051031";
var MSG_INVALID_DATE10_KO = "$1 항목의 날짜 정보가 잘못된 형태로 입력되었습니다.\n\n 입력 예) 2005-10-31";
var MSG_REQUIRED_DATE_KO = "$1 항목의 날짜 정보를 입력하세요.";
var MSG_INVALID_PERIOD_KO = "$1 항목의 날짜 정보가 $2 항목의 날짜 정보 이전 날짜로 입력되었습니다.\n\n다시 입력하세요.";
var MSG_REQUIRED_GRID_KO = "$1 항목은 필수값입니다.($2행)";
var MSG_MAX_LENGTH_GRID_KO = "$1 항목의 길이가 $2를 초과합니다.($3행)";
var MSG_REQUIRED_CONTROLLER_KO = "이동할 페이지를 지정하세요.";
var MSG_INVALID_SERVICEID_KO = "지원되지 않는 서비스 prefix입니다.";
var MSG_GRID_NOTFOUND_KO = "해당 그리드를 찾을수 없습니다.";
var MSG_MIN_LENGTH_GRID_KO = "$1 항목의 길이를 $2자 이상 입력하세요.($3행)";
var MSG_MAX_LENGTH_GRID_KO = "$1 항목은 $2까지 입력이 가능합니다.($3행)";
var MSG_LIMIT_MIN_GRID_KO = "$1 항목에 $2 이상의 숫자를 입력하세요.($3행)";
var MSG_LIMIT_MAX_GRID_KO = "$1 항목에 $2 이하의 숫자를 입력하세요.($3행)";
var MSG_INVALID_EMAIL_GRID_KO = "$1 항목의 email 주소가 잘못된 형태로 입력되었습니다.($2행)\n\n 입력 예) temp@skku.edu";
var MSG_INVALID_URL_GRID_KO = "$1 항목의 웹사이트 주소가 잘못된 형태로 입력되었습니다.($2행)\n\n 입력 예) www.skku.ac.kr";
var MSG_INVALID_PHONE_GRID_KO = "$1 항목의 전화번호가 잘못된 형태로 입력되었습니다.($2행)\n\n 입력 예) 02-202-0020";
var MSG_INVALID_RESNO_GRID_KO = "$1 항목의 주민번호가 잘못된 형태로 입력되었습니다.($2행)";
var MSG_INVALID_DATE8_GRID_KO = "$1 항목의 날짜 정보가 잘못된 형태로 입력되었습니다.($2행)\n\n 입력 예) 20051031";
var MSG_INVALID_DATE10_GRID_KO = "$1 항목의 날짜 정보가 잘못된 형태로 입력되었습니다.($2행)\n\n 입력 예) 2005-10-31";
var MSG_REQUIRED_DATE_GRID_KO = "$1 항목의 날짜 정보를 입력하세요.($2행)";
var MSG_INVALID_PERIOD_GRID_KO = "$1 항목의 날짜 정보가 $2 항목의 날짜 정보의 이전 날짜로 입력되었습니다.\n\n다시 입력하세요.($3행)";




var MSG_SUNDAY_KO = "일요일";
var MSG_MONDAY_KO = "월요일";
var MSG_TUESDAY_KO = "화요일";
var MSG_WEDNESDAY_KO = "수요일";
var MSG_THURSDAY_KO = "목요일";
var MSG_FRIDAY_KO = "금요일";
var MSG_SATURDAY_KO = "토요일";

// 신정:삼일절:어린이날:현충일:개천절:성탄절
var MSG_SOL_HOLIDAYS_KO = "0101:0301:0505:0606:0815:1003:1225";
//설날연휴:석가탄신일:추석연휴
var MSG_LUN_HOLIDAYS_KO = "1230:0101:0102:0408:0814:0815:0816";
var HOL_SOL_0101_KO = "신정";
var HOL_SOL_0301_KO = "삼일절";
var HOL_SOL_0505_KO = "어린이날";
var HOL_SOL_0606_KO = "현충일";
var HOL_SOL_0815_KO = "광복절";
var HOL_SOL_1003_KO = "개천절";
var HOL_SOL_1225_KO = "성탄절";
var HOL_LUN_0101_KO = "설날";
var HOL_LUN_1230_KO = HOL_LUN_0101_KO;
var HOL_LUN_0102_KO = HOL_LUN_0101_KO;
var HOL_LUN_0408_KO = "석가탄신일";
var HOL_LUN_0815_KO = "추석";
var HOL_LUN_0814_KO = HOL_LUN_0815_KO;
var HOL_LUN_0816_KO = HOL_LUN_0815_KO;

/*========== 영어 ==================*/
var CBO_ALL_EN = "ALL";
var CBO_SEL_EN = "Choice";
var CBO_EMP_EN = "";

var MSG_SEARCH_SUCCESS_EN = "Searching is completed.";
var MSG_SAVE_SUCCESS_EN = "Successfully saved.";
var MSG_CREATE_SUCCESS_EN = "Successfully inserted.";
var MSG_UPDATE_SUCCESS_EN = "Successfully updated.";
var MSG_REMOVE_SUCCESS_EN = "Successfully deleted.";

var MSG_NO_DATA_EN = "No Data";

var MSG_SUNDAY_EN = "SUN";
var MSG_MONDAY_EN = "MON";
var MSG_TUESDAY_EN = "TUE";
var MSG_WEDNESDAY_EN = "WED";
var MSG_THURSDAY_EN = "THU";
var MSG_FRIDAY_EN = "FRI";
var MSG_SATURDAY_EN = "SAT";


// *****************************************************************
// Function Name: gfnGetMessage
// Description	: strMsgId에 연결된 문자열 리턴
// Argument		: strMsgId(메시지 아이디), strMsgType(메시지 타입), strMsgParam1(메시지 Param1), strMsgParam2(메시지 Param2), strMsgParam3(메시지 Param3), strMsgParam4(메시지 Param4), strMsgParam5(메시지 Param5), strMsgParam6(메시지 Param6)
// Return		: 없음
// *****************************************************************
function gfnGetMessage(strMsgId, strMsgParam1, strMsgParam2, strMsgParam3, strMsgParam4, strMsgParam5, strMsgParam6)
{
	var strResultMsg;
	
	if(isExistVar(strMsgId + "_" + gvLanguage, true)) {
		strResultMsg = eval(strMsgId + "_" + gvLanguage);
		
	} else {
		if(isExistVar(strMsgId + "_KO", true)) {
			strResultMsg = eval(strMsgId + "_KO");			
		} else {
			strResultMsg = strMsgId;
		}
	}
	
	if(!gfnIsNull(strMsgParam1)) strResultMsg = replace(strResultMsg, "$1", strMsgParam1);
	if(!gfnIsNull(strMsgParam2)) strResultMsg = replace(strResultMsg, "$2", strMsgParam2);
	if(!gfnIsNull(strMsgParam3)) strResultMsg = replace(strResultMsg, "$3", strMsgParam3);
	if(!gfnIsNull(strMsgParam4)) strResultMsg = replace(strResultMsg, "$4", strMsgParam4);
	if(!gfnIsNull(strMsgParam5)) strResultMsg = replace(strResultMsg, "$5", strMsgParam5);
	if(!gfnIsNull(strMsgParam6)) strResultMsg = replace(strResultMsg, "$6", strMsgParam6);
	
	return strResultMsg;
}

// *****************************************************************
// Function Name: gfnMsg
// Description	: Message 경고창 띄우기
// Argument		: strMsgId(메시지 아이디), strMsgType(메시지 타입), strMsgParam1(메시지 Param1), strMsgParam2(메시지 Param2), strMsgParam3(메시지 Param3), strMsgParam4(메시지 Param4), strMsgParam5(메시지 Param5), strMsgParam6(메시지 Param6)
// Return		: 없음
// *****************************************************************
function gfnMsg(strMsgId, strMsgType, strMsgParam1, strMsgParam2, strMsgParam3, strMsgParam4, strMsgParam5, strMsgParam6) {
	//strMsgType : INFO (default), WARN, ERR
	if(gfnIsNull(strMsgType)) {
		strMsgType = "INFO";
	}
	
	var strResultMsg = gfnGetMessage(strMsgId, strMsgParam1, strMsgParam2, strMsgParam3, strMsgParam4, strMsgParam5, strMsgParam6);
	
	//팝업 띄우기
	var sArg = "paramMsg=" + quote(strResultMsg);
	sArg += " paramType=" + quote(strMsgType);
	sArg += " paramConfirmYn=" + quote("N");
	var sOpenStyle = "AutoSize=false";
	return gfnOpenDialog("includes::MSG.xml", sArg, 400, 120, sOpenStyle);
}

// *****************************************************************
// Function Name: gfnConfirm
// Description	: Message 확인창 띄우기
// Argument		: strMsgId(메시지 아이디), strMsgType(메시지 타입), strMsgParam1(메시지 Param1), strMsgParam2(메시지 Param2), strMsgParam3(메시지 Param3), strMsgParam4(메시지 Param4), strMsgParam5(메시지 Param5), strMsgParam6(메시지 Param6)
// Return		: 없음
// *****************************************************************
function gfnConfirm(strMsgId, strMsgType, strMsgParam1, strMsgParam2, strMsgParam3, strMsgParam4, strMsgParam5, strMsgParam6) {
	//strMsgType : YN-YesNo, YNC-YesNoCancel, OSC-OpenSaveCancel
	if(gfnIsNull(strMsgType)) {
		strMsgType = "YN";
	}
	
	var strResultMsg = gfnGetMessage(strMsgId, strMsgType, strMsgParam1, strMsgParam2, strMsgParam3, strMsgParam4, strMsgParam5, strMsgParam6);
	
	//팝업 띄우기
	var sArg = "paramMsg=" + quote(strResultMsg);
	sArg += " paramType=" + quote(strMsgType);
	sArg += " paramConfirmYn=" + quote("Y");
	var sOpenStyle = "AutoSize=false";
	return gfnOpenDialog("includes::MSG.xml", sArg, 400, 120, sOpenStyle);
}
