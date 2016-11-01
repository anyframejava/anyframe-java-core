﻿﻿﻿﻿﻿﻿#include "javascript::message.js";
#include "javascript::util.js";
#include "mipsupport::lib_Grid.js";
#include "mipsupport::lib_Dataset.js";
#include "mipsupport::lib_CommonScript.js";// Grid의 공통기능을 생성하는 데 필요한 Script
#include "mipsupport::lib_Form.js";		// Form 공통 Script
#include "mipsupport::lib_Excel.js";

// *****************************************************************************
// Function Name: gfnService
// Description	: service 호출
// Argument		: strServiceId(서비스ID), strArgument(Argument목록)
// Return		: 0, -1
// *****************************************************************************
function gfnService(strServiceId, strArgument) {
	
	var nRow = dsService.findRow("SVC_ID", strServiceId);
	
	//Biz. Service Name
	var strService = dsService.getColumn(nRow, "SERVICE") ;
	
	var strMethod = "";
	
	//실행 될 Query Id
	var strQueryIds = dsService.getColumn(nRow, "QUERY_LIST") ;
	
	//입력 값으로 사용될 DatasetList
	var strInDatasets = dsService.getColumn(nRow, "IN_DATASET_LIST");
	
	//출력 값으로 사용될 DatasetList
	var strOutDatasets = dsService.getColumn(nRow, "OUT_DATASET_LIST");
	
	//사용자 Controller Bean Id
	var strController = dsService.getColumn(nRow, "CONTROLLER");
	
	//call back method
	var strCallback = dsService.getColumn(nRow, "CALLBACK");
	
	var bSync = iif(dsService.getColumn(nRow, "SYNC_YN")=="Y", true, false);
	
	// Firstrow 방식으로 정송할지 여부
	if(indexOf(strArgument, "isFR=") == -1){
		strArgument += " isFR=N";
	} else {
		// Firstrow 방식 사용할 경우, Data 전송 Size 기본값 설정
		if(indexOf(strArgument, "nextDataSize=") == -1){
			strArgument += " nextDataSize=1000";
		}
	}
	//get 방식으로 전달될 argument값 세팅
	var strParameter = strArgument;
	
	//1. 사용자 정의 Biz. Service가 존재하는 경우 
	if(!gfnIsNull(strService)) {
		var arrTemp = split(strService, ".");
		strService = arrTemp[0];
		strMethod = arrTemp[1];
	}
	
	// 사용자가 Controller을 설정 했을 경우가 아니면 공통 Controller(mipController.do)로 요청	
	//2. Controller 처리
	if(gfnIsNull(strController)){
		strController = gvController;
	
		// 3. 사용자 정의 Biz. Service가 없을 경우 Service & Method 처리
		if(gfnIsNull(strService)) {
			// 3-1.common service call
			// 사용자 정의 Biz. Service가 없을 경우 공통 Service(mipService) MiPService 호출
			strService = gvService;
			
			// 3-2.ServiceId로 부터 호출할 method를 추출.
			//  따라서 ServiceId는 getPagingList, getList, saveAll, execute, create, update, remove, get 중 하나로 시작해야 함.
			strMethod = left(strServiceId, 13);
			
			if(strMethod != "getPagingList"){
				// saveAll, getList, execute 중 하나일 경우 MiPService의 saveAll, getList, execute 메소드 중 하나가 호출 됨
				strMethod = left(strServiceId,7);
				
				if(indexOf("saveAll,getList,execute", strMethod) == -1) {
					// create, update, remove 일 경우 MiPService의 create, update, remove메소드가 호출 됨
					strMethod = left(strServiceId, 6);
					
					if(indexOf("create,update,remove", strMethod) == -1) {
						// get 일 경우 MiPService의 get메소드가 호출 됨
						strMethod = left(strServiceId, 3);
						
						if(strMethod != "get") {
							gfnMsg("MSG_INVALID_SERVICEID");
							return;
						}
					}
				}
			}
		}
		//query ID, InDataset, OutDataset 지정
		var arrQuerys = split(strQueryIds, " ");
		
		//실행된 Query의 개수 세팅
		strParameter += " querySetCount=" + length(arrQuerys);
		
		for(var i = 0 ; i < length(arrQuerys) ; i++) {
			strParameter += " " + arrQuerys[i];
		}
	}
	
	// 4.argument 처리(Service and Method)
	strParameter += " service=" + strService;
	strParameter += " method=" + strMethod;
		
	// 5.system call
	gfnServiceCall(strServiceId, strController, trim(strInDatasets), trim(strOutDatasets), strParameter, strCallback, bSync);	
}

// *****************************************************************************
// Function Name: gfnServiceCall
// Description	: 내부사용 service call(개발자사용 불가)
// Argument		: strServiceId(서비스ID), strController(액션호출경로), strInDatasets(InDataset목록), strOutDatasets(OutDataset목록), strParameter(Argument목록), strCallback(콜백함수명), bSync(동기화여부)
// Return		: 없음
// *****************************************************************************
function gfnServiceCall(strServiceId, strController, strInDatasets, strOutDatasets, strParameter, strCallback, bSync) {
	
	if (gfnIsNull(bSync)) {
		bSync = false;
	}

	if(gfnIsNull(strController)) {
		gfnMsg("MSG_REQUIRED_CONTROLLER");
		return;
		
	} else {
		strController = gvDataGroup + "::" + strController;
	}
	
	//callback 지정
	if(gfnIsNull(strCallback)){
		strCallback = "gfnCallback";
	}
	
	if (bSync) {	
		http.Sync = true;		
		transaction(strServiceId, strController, strInDatasets, strOutDatasets, strParameter, strCallback);
		http.Sync = false;
	} else {
		transaction(strServiceId, strController, strInDatasets, strOutDatasets, strParameter, strCallback);
	}	
}

// *****************************************************************************
// Function Name: gfnCallback
// Description	: 공통Callback function - 항상 수행됨
// Argument		: strServiceId(서비스ID), strErrorCode(에러코드), strErrorMsg(에러메세지)
// Return		: 없음
// *****************************************************************************
function gfnCallback(strServiceId, strErrorCode, strErrorMsg) {
	var nCurrentServiceRow = dsService.findRow("SVC_ID", strServiceId);
		
	//local callback function call
	var strCallback = dsService.getColumn(nCurrentServiceRow, "CALLBACK");
	
	if(!gfnIsNull(strCallback) && isExistFunc(strCallback)) {
		eval(strCallback + "(strServiceId, strErrorCode, strErrorMsg)");
		
	} else if(isExistFunc("fnCallback")) {
		fnCallback(strServiceId, strErrorCode, strErrorMsg);
	}
}


//====================== Grid 관련 처리 =============================

// *****************************************************************************
// Function Name: gfnRemoveCheckedRows
// Description	: 그리드 내용 삭제(체크된 row)
// Argument		: obj(데이터셋), strCheckId(체크용컬럼ID)
// Return		: 없음
// *****************************************************************************
function gfnRemoveCheckedRows(obj, strCheckId) {
	for(var i = obj.rowCount - 1 ; i > -1 ; i--) {
		if(obj.getColumn(i, strCheckId) == "1") {
			obj.deleteRow(i);
		}
	}
}

// *****************************************************************************
// Function Name: gfnRemoveSelectedRows
// Description	: 그리드 내용 삭제(선택된 row)
// Argument		: obj(그리드)
// Return		: 없음
// *****************************************************************************
function gfnRemoveSelectedRows(obj) {
	var objBindDataset = object(obj.bindDataset);
	
	if(obj.multiSelect){
		//선택된 자료만 삭제
		objBindDataset.deleteSelected();
	} else {
		objBindDataset.deleteRow(objBindDataset.currow);
	}
}

// *****************************************************************************
// Function Name: gfnGrid_OnHeadClick
// Description	: Grid head 클릭 공통처리 - 정렬
//					lib_CommonScript.js의 cs_fn_Grid_Event_OnHeadClick이 먼저 호출됨
// Argument		: obj,nCell,nX,nY,nPivotIndex,nSelColInMerge - Grid Event 참고
// Return		: 없음
// *****************************************************************************
function gfnGrid_OnHeadClick(obj, nCell, nX, nY, nPivotIndex, nSelColInMerge) {
	
	// BODY CELL의 실제 Cell 번호
	var nCellBody = obj.getCellProp("head", nCell, "col");
	
	// Bind 된 Dataset의 컬럼중 매핑된 컬럼명(e.g..._chk)
	var nCellColumn = obj.getCellProp("body", nCellBody, "colId");
	
	// data가 update 완료된 후 화면에 반영하기 위함.
	obj.redraw = false;
	
	//Component가 checkbox일때와 아닐 때로 구분
	if(obj.getCellProp("head", nCell, "edit") == "checkbox") {
		//전체선택 처리
		var strCheck = iif(obj.getCellProp("head", nCell, "text") == "1" , "0", "1");
		var objBindDataset = object(obj.bindDataset);
		
		obj.setCellProp("head", nCell, "text", strCheck);
		
		for(var i = 0; i < objBindDataset.rowCount ; i++){
			objBindDataset.setColumn(i, nCellColumn, strCheck);
		}
	} else {
		//정렬처리
		gfnGridSort(obj, object(obj.bindDataset), nCell, nCellBody, obj.getCellCount("head"));
	}
	
	obj.redraw = true;
}


//====================== POPUP 관련 처리 =============================

// *****************************************************************************
// Function Name: gfnOpenDialog
// Description	: Modal Popup 열기
// Argument		: strUrl(팝업폼ID 또는 경로), strArgument(관련파라미터), nWidth(가로크기), nHeight(세로크기), strOpenStyle(호출속성), nLeft(좌측위치), nTop(상단위치)
// Return		: strReturn : Dialog에서 Close Method로 닫을 때 넘긴 값.
// *****************************************************************************
function gfnOpenDialog(strUrl, strArgument, nWidth, nHeight, strOpenStyle, nLeft, nTop) {
	
	if(gfnIsNull(nLeft)) nLeft = -1;
	if(gfnIsNull(nTop)) nTop = -1;
	
	if(indexOf(strUrl, ".") == -1) {
		strUrl = strUrl + ".xml";
	}
	
	var strReturn = dialog(strUrl, strArgument, nWidth, nHeight, strOpenStyle, nLeft, nTop);
	return strReturn;
}

// *****************************************************************************
// Function Name: gfnOpenPopup
// Description	: Modalless Popup 열기
// Argument		: strUrl(팝업폼ID 또는 경로), strArgument(관련파라미터), nWidth(가로크기), nHeight(세로크기), strOpenStyle(호출속성), nLeft(좌측위치), nTop(상단위치)
// Return		: 생성된 Open창의 Handle값. 각 Form을 구별할수 있는 유일값
// *****************************************************************************
function gfnOpenPopup(strUrl, strArgument, nWidth, nHeight, strOpenStyle, nLeft, nTop) {
	if(gfnIsNull(nLeft)) nLeft = -1;
	if(gfnIsNull(nTop)) nTop = -1;
	
	if(indexOf(strUrl, ".") == -1) {
		strUrl = strUrl + ".xml";
	}
	
	open(strUrl, strArgument, nWidth, nHeight, strOpenStyle, nLeft, nTop);
}


//====================== EVENT 관련 처리 =============================

// *****************************************************************************
// Function Name: gfnForm_OnLoadCompleted
// Description	: form Onload 공통 event 
// Argument		: obj(대상Form)
// Return		: 없음
// *****************************************************************************
function gfnForm_OnLoadCompleted(obj) {
	//Grid관련 : 'Grid 검색'/ 'Excel Export' 메뉴 셋업
	gfnInitGrids(obj);
}

// *****************************************************************************
// Function Name: gfnInitializeGrids
// Description	: Form or Division or Tab상에 존재하는 모든 Grid 초기화 처리
// Argument		: obj(대상Form or Division or Tab)
// Return		: 없음
// *****************************************************************************
var gArrGridIds = array();	// Grid ID Temp Array

function gfnInitGrids(obj) {
	gfnInitGridArray(obj, "");
	
	for(var i = 0 ; i < length(gArrGridIds) ; i++) {
	
		var objGrid = object(gArrGridIds[i]);
		
		// Grid공통처리(in lib_CommonScript.js)
		cs_fn_InitCommonScript(gArrGridIds[i], "gdsGridHead", "gdsGridBody", "",false, "_chk");
		
		// Grid NoData처리
		objGrid.noDataText = gfnGetMessage("MSG_NO_DATA");
		
		// Grid색상처리		
		// readOnly Grid의 bkcolor 조정
		for(var j = 0 ; j < objGrid.getColCount(); j++) {
			// cell의 edit 속성이 None인 경우 cell의 background color를 다르게 셋팅하고자 할 때
			if(objGrid.getCellProp("body", j, "bkcolor") == -1) {
				objGrid.setCellProp("body", j, 'bkcolor', "expr:iif(" + objGrid.id + ".getCellProp('body'," + j + ",'edit')=='NONE',''," + objGrid.id + ".bkcolor)");
			}
			
			if(objGrid.getCellProp("body", j, "bkcolor2") == -1) {
				objGrid.setCellProp("body", j, "bkcolor2", "expr:iif(" + objGrid.id + ".getCellProp('body'," + j + ",'edit')=='NONE',''," + objGrid.id + ".bkcolor2)");
			}
		}		
	}
}

// *****************************************************************************
// Function Name: gfnServiceCall
// Description	: 내부사용 service call(개발자사용 불가)
// Argument		: strServiceId(서비스ID), strController(액션호출경로), strInDatasets(InDataset목록), strOutDatasets(OutDataset목록), strParameter(Argument목록), strCallback(콜백함수명), bSync(동기화여부)
// Return		: 없음
// *****************************************************************************
function gfnInitGridArray(obj, strParentId) {
	var strTempParentId = "";

	for(var i = 0 ;  i < obj.components.count ; i++) {
		var objComponent = obj.components[i];
		
		if(objComponent.getType() == "Div" || left(objComponent.getType(), 3) == "Tab") {
			
			if(gfnIsNull(strParentId)) {
				strTempParentId = objComponent.id;
			} else {
				strTempParentId = strParentId + "." + objComponent.id;
			}
			
			gfnInitGridArray(objComponent, strTempParentId);
			
		} else if(objComponent.getType() == "Grid") {
			var nIndex = length(gArrGridIds);
			
			if(gfnIsNull(strParentId)) {
				gArrGridIds[nIndex] = objComponent.id;
			} else {
				gArrGridIds[nIndex] = strParentId + "." + objComponent.id;
			}
		}
	}
}

//====================== VALIDATION 관련 처리 =======================================

// *****************************************************************************
// Function Name: gfnValidate
// Description	: Validation 처리
// Argument		: objTarget(대상객체 - form 또는 Division 등 타 컴포넌트를 담을 수 있는 객체)
// Return		: Boolean(검사결과값 : True-성공, False-실패)
// *****************************************************************************
function gfnValidate(objTarget) {
	var objComponent, strComponentType, strComponentValue;
	var strComponentTitle, arrValidationChkList, arrValidationChkString;
	
	// TabOrder순 정렬 추가
	var arrComponents = array(objTarget.components.count());
	var nTabOrder = 0;
	destroy("dsValid");
	create("Dataset", "dsValid");
	dsValid.addColumn("OBJ");
	dsValid.addColumn("TAB_ORDER", "Decimal");
	dsValid.addColumn("ARR_INDEX");
	dsValid.clearData();
	
	for (var i = 0 ; i < objTarget.components.count() ; i++) {
		objComponent = objTarget.components[i];
		
		if(objComponent.getType() == "Dataset") {
			nTabOrder = 999;
		} else {
			nTabOrder = objComponent.tabOrder;
		}
		
		dsValid.addRow();
		dsValid.setColumn(i, "OBJ", objComponent);
		dsValid.setColumn(i, "TAB_ORDER", nTabOrder);
		dsValid.setColumn(i, "ARR_INDEX", i);
		arrComponents[i] = objComponent;
	}
	
	dsValid.sort("TAB_ORDER:A");
	
	for (i = 0 ; i < dsValid.getRowCount() ; i++) {
		objComponent = arrComponents[parseInt(dsValid.getColumn(i,"ARR_INDEX"))];
		strComponentType = objComponent.getType();

		switch(strComponentType) {
			case "Calendar" : 
			case "CheckBox" : 
			case "Combo" : 
			case "ListBox" : 
			case "MaskEdit" : 
			case "Radio" : 
			case "Spin" : 
				strComponentValue = trim(objComponent.value);
				break;
			case "Edit" :
			case "TextArea" :
				strComponentValue = trim(objComponent.text);
				break;			
			case "Grid" :
				if(!gfnValidateGrid(objComponent)) {
					return false;
				}
				continue;
			default:
				continue;
		}
		
		if(gfnIsNull(objComponent.userData)) {
			continue;
		}
		
		arrValidationChkList = split(objComponent.userData, ",");
		
		for( var j = 0 ; j < length(arrValidationChkList) ; j++ ) {
			arrValidationChkString = split(trim(arrValidationChkList[j]), "=");
						
			if(arrValidationChkString[0] == "title" || arrValidationChkString[0] == "titleObj" || arrValidationChkString[0] == "titleId") {
				if(arrValidationChkString[0] == "title") {
					strComponentTitle = arrValidationChkString[1];
				} else if(arrValidationChkString[0] == "titleObj") {
					strComponentTitle = objTarget.find(arrValidationChkString[1]).text;
				} else {
					strComponentTitle = eval("global.domain." + arrValidationChkString[1]);
				}
				continue;
			}
		
			//1.필수값체크
			if(arrValidationChkString[0] == "required" && (strComponentValue == null || strComponentValue == "")) {
				//gfnMsg(strComponentTitle+"은(는) 필수값입니다.");
				gfnMsg("MSG_REQUIRED", "WARN", strComponentTitle);
				objComponent.setFocus();
				return false;
			}
			
			//2.길이 체크
			if(arrValidationChkString[0] == "minLength" && length(strComponentValue) < parseInt(arrValidationChkString[1])) {
				//gfnMsg(strComponentTitle+" 항목을 "+ arrValidationChkString[1] +"자 이상 입력하세요.");
				gfnMsg("MSG_MIN_LENGTH", "WARN", strComponentTitle, arrValidationChkString[1]);
				objComponent.setFocus();
				return false;
			}
			
			if(arrValidationChkString[0] == "maxLength" && lengthb(strComponentValue) > parseInt(arrValidationChkString[1])) {
				//gfnMsg(strComponentTitle+" 항목은 영문 "+ arrValidationChkString[1] + "자, 한글 " + parseInt(parseInt(arrValidationChkString[1]) / 2) +"자 까지만 입력이 가능합니다.");
				gfnMsg("MSG_MAX_LENGTH", "WARN", strComponentTitle, arrValidationChkString[1], parseInt(parseInt(arrValidationChkString[1]) / 2));
				objComponent.setFocus();
				return false;
			}
			
			//3. 숫자관련체크
			if(arrValidationChkString[0] == "num" && strComponentValue != null && strComponentValue != "") {
				if(arrValidationChkString[1] == "f" && !gfnCheckNumber(strComponentValue, ".-")) {
					//gfnMsg(strComponentTitle+" 항목에는 실수만 입력 가능합니다.");
					gfnMsg("MSG_ONLY_REAL", "WARN", strComponentTitle);
					objComponent.setFocus();
					return false;
					
				} else if(arrValidationChkString[1] == "i" && !gfnCheckNumber(strComponentValue, "-")) {
					//gfnMsg(strComponentTitle+" 항목에는 정수만 입력 가능합니다.");
					gfnMsg("MSG_ONLY_INTEGER", "WARN", strComponentTitle);
					objComponent.setFocus();
					return false;
					
				} else if(arrValidationChkString[1] == "n" && !gfnCheckNumber(strComponentValue, "")) {
					//gfnMsg(strComponentTitle+" 항목에는 숫자만 입력 가능합니다.");
					gfnMsg("MSG_ONLY_NUMBER", "WARN", strComponentTitle);
					objComponent.setFocus();
					return false;
				}
			}
			
			if(arrValidationChkString[0] == "fromNum" && gfnCheckNumber(strComponentValue,"-.")){
					if(parseFloat(arrValidationChkString[1]) > parseFloat(strComponentValue)){
						//gfnMsg(strComponentTitle + " 항목에 " + arrValidationChkString[1] + " 이상의 숫자를 입력하세요.");
						gfnMsg("MSG_LIMIT_MIN", "WARN", strComponentTitle, arrValidationChkString[1]);
						objComponent.setFocus();
						return false;
					}
			}
			
			if(arrValidationChkString[0] == "toNum" && gfnCheckNumber(strComponentValue,"-.")){
					if(parseFloat(arrValidationChkString[1]) < parseFloat(strComponentValue)){
						//gfnMsg(strComponentTitle + " 항목에 " + arrValidationChkString[1] + " 이하의 숫자를 입력하세요.");
						gfnMsg("MSG_LIMIT_MAX", "WARN", strComponentTitle, arrValidationChkString[1]);
						objComponent.setFocus();
						return false;
					}
			}
			
			//4. format관련체크
			if(arrValidationChkString[0] == "format" && !gfnIsNull(strComponentValue)){
				
				if(arrValidationChkString[1] == "mail" && !gfnCheckEmail(strComponentValue) ){
					//gfnMsg(strComponentTitle+" 항목의 email 주소가 잘못된 형태로 입력되었습니다.\n\n"+" 입력 예) temp@skku.edu");
					gfnMsg("MSG_INVALID_EMAIL", "WARN", strComponentTitle);
					objComponent.setFocus();
					return false;
				}
				
				if(arrValidationChkString[1] == "url" && !gfnCheckURL(strComponentValue) ){
					//gfnMsg(strComponentTitle+" 항목의 웹사이트 주소가 잘못된 형태로 입력되었습니다.\n\n"+" 입력 예) www.skku.ac.kr");
					gfnMsg("MSG_INVALID_URL", "WARN", strComponentTitle);
					objComponent.setFocus();
					return false;
				}
				
				if(arrValidationChkString[1] == "phone" && !gfnCheckPhone(strComponentValue) ){
					//gfnMsg(strComponentTitle+" 항목의 전화번호가 잘못된 형태로 입력되었습니다.\n\n"+" 입력 예) 02-202-0020");
					gfnMsg("MSG_INVALID_PHONE", "WARN", strComponentTitle);
					objComponent.setFocus();
					return false;
				}
				
				if(arrValidationChkString[1] == "resno" && !gfnCheckResNo(strComponentValue) ){
					//gfnMsg(strComponentTitle+" 항목의 주민번호가 잘못된 형태로 입력되었습니다.\n\n"+" ");
					gfnMsg("MSG_INVALID_RESNO", "WARN", strComponentTitle);
					objComponent.setFocus();
					return false;
				}
				
				if(arrValidationChkString[1] == "date" && !gfnCheckDate8(strComponentValue) ){
					//gfnMsg(strComponentTitle+" 항목의 날짜 정보가 잘못된 형태로 입력되었습니다.\n\n"+" 입력 예) 20051031");
					gfnMsg("MSG_INVALID_DATE8", "WARN", strComponentTitle);
					objComponent.setFocus();
					return false;
				}
				
				if(arrValidationChkString[1] == "date10" && !gfnCheckDate10(strComponentValue) ){
					//gfnMsg(strComponentTitle+" 항목의 날짜 정보가 잘못된 형태로 입력되었습니다.\n\n"+" 입력 예) 2005-10-31");
					gfnMsg("MSG_INVALID_DATE10", "WARN", strComponentTitle);
					objComponent.setFocus();
					return false;
				}
			}
			
			//5. 기간관련 체크
			if(arrValidationChkString[0] == "fromDate" ) {
				var objFromDate =  objTarget.find(arrValidationChkString[1]);				
				if(objFromDate == null) {
					continue;
				}
				var fromDateValue = objFromDate.value ;
				
				if(!gfnIsNull(fromDateValue) || gfnIsNull(strComponentValue)) {
					var fromFieldTitle;
					var arrFromDateChkList = split(objFromDate.userData, ",");
		
					for(var k = 0 ; k < length(arrFromDateChkList) ; k++) {
						var arrFromDateChkString = split(arrFromDateChkList[k], "=");
						
						if(arrFromDateChkString[0] == "title" || arrFromDateChkString[0] == "titleObj" || arrFromDateChkString[0] == "titleId") {
							if(arrFromDateChkString[0] == "title") {
								fromFieldTitle = arrFromDateChkString[1];
							} else if(arrFromDateChkString[0] == "titleObj") {
								fromFieldTitle = objTarget.find(arrFromDateChkString[1]).text;
							} else {
								fromFieldTitle = eval("global.domain." + arrFromDateChkString[1]);
							}
							break;
						}
					}
					
					if(fromDateValue == null || fromDateValue == "") {
						//gfnMsg(fromFieldTitle+" 항목의 날짜 정보를 입력하세요.");
						gfnMsg("MSG_REQUIRED_DATE", "WARN", fromFieldTitle);
						objFromDate.setFocus();
						return false;
					} else if(strComponentValue == "") {
						//gfnMsg(strComponentTitle+" 항목의 날짜 정보를 입력하세요.");
						gfnMsg("MSG_REQUIRED_DATE", "WARN", strComponentTitle);
						objComponent.setFocus();
						return false;
					} else if(fromDateValue > strComponentValue) {
						//gfnMsg(strComponentTitle+" 항목의 날짜 정보가 " + fromFieldTitle + " 항목의 날짜 정보의 이전 날짜로 입력되었습니다.\n\n다시 입력하세요.");
						gfnMsg("MSG_INVALID_PERIOD", "WARN", strComponentTitle, fromFieldTitle);
						objComponent.setFocus();
						return false;				    	
					}
				}
			}
			
		}
	}
	
	return true;
}

// *****************************************************************************
// Function Name: gfnValidateGrid
// Description	: Grid Validation
// Argument		: objGrdTarget(대상그리드객체)
// Return		: Boolean(검사결과값 : True-성공, False-실패)
// *****************************************************************************
function gfnValidateGrid(objGrdTarget) {
	var objBindDataset, strColId, strValue, strTitle, arrValidationChkList, arrValidationChkString, strLimit;
	
	objBindDataset = object(objGrdTarget.bindDataset);
	
	// Dataset row loop	
	for(var i = 0 ; i < objBindDataset.getRowCount() ; i++) {
		if(objBindDataset.getRowType(i) != "normal") {
			// Grid column loop
			for(var j = 0 ; j < objGrdTarget.getCellCount("head"); j++) {
				strColId = objGrdTarget.getCellProp("body", j, "colid");

				if(!gfnIsNull(strColId)) {
					arrValidationChkList = objBindDataset.getColMapValue(strColId);
					
					strLimit = objGrdTarget.getCellProp("body", j, "limit");
					strTitle = objGrdTarget.getCellProp("head", j, "text");
					
					strValue = trim(objGrdTarget.getCellValue(i, j));
					
					if(!gfnIsNull(arrValidationChkList)) {
						arrValidationChkList = split(arrValidationChkList, ",");
						
						for(var k = 0 ; k < length(arrValidationChkList) ; k++) {
							arrValidationChkString = split(arrValidationChkList[k], "=");
							
							// 0. 타이틀
							if(arrValidationChkString[0] == "title" || arrValidationChkString[0] == "titleId") {
								if(arrValidationChkString[0] == "title") {
									strComponentTitle = arrValidationChkString[1];
								} else {
									strComponentTitle = eval("global.domain." + arrValidationChkString[1]);
								}
								continue;
							}
							
							//1.필수값체크
							if(arrValidationChkString[0] == "required" && gfnIsNull(strValue)) {
								gfnMsg("MSG_REQUIRED_GRID", "WARN", strTitle, (i + 1));
								objBindDataset.row = i;
								objGrdTarget.setCellPos(j);
								objGrdTarget.multiSelect=false;
								objGrdTarget.showEditor();
								return false;
							}
						
							//2.최대길이 체크 (limit 속성 우선 적용)
							if(arrValidationChkString[0] == "maxLength" && length(strValue) > arrValidationChkString[1]) {
								gfnMsg("MSG_MAX_LENGTH_GRID", "WARN", strTitle, arrValidationChkString[1], (i + 1));
								objBindDataset.row = i;
								objGrdTarget.setCellPos(j);		
								objGrdTarget.multiSelect=false;
								objGrdTarget.showEditor();
								return false;
							}
							
							//3.최소길이 체크
							if(arrValidationChkString[0] == "minLength" && length(strValue) < arrValidationChkString[1]) {
								gfnMsg("MSG_MIN_LENGTH_GRID", "WARN", strTitle, arrValidationChkString[1], (i + 1));
								objBindDataset.row = i;
								objGrdTarget.setCellPos(j);
								objGrdTarget.multiSelect=false;
								objGrdTarget.showEditor();
								return false;
							}
							
							//4.최소값 체크
							if(arrValidationChkString[0] == "fromNum" && gfnCheckNumber(strValue, "-.")) {
								if(parseFloat(arrValidationChkString[1]) > parseFloat(strValue)){
									gfnMsg("MSG_LIMIT_MIN_GRID", "WARN", strTitle, arrValidationChkString[1], (i + 1));
									objBindDataset.row = i;
									objGrdTarget.setCellPos(j);	
									objGrdTarget.multiSelect=false;		
									objGrdTarget.showEditor();
									return false;
								}
							}
							
							//4.최대값 체크
							if(arrValidationChkString[0] == "toNum" && gfnCheckNumber(strValue, "-.")) {
								if(parseFloat(arrValidationChkString[1]) < parseFloat(strValue)){
									gfnMsg("MSG_LIMIT_MAX_GRID", "WARN", strTitle, arrValidationChkString[1], (i + 1));
									objBindDataset.row = i;
									objGrdTarget.setCellPos(j);	
									objGrdTarget.multiSelect=false;			
									objGrdTarget.showEditor();							
									return false;
								}
							}
							
							//5. format관련체크
							if(arrValidationChkString[0] == "format" && !gfnIsNull(strValue)) {
								if(arrValidationChkString[1] == "mail" && !gfnCheckEmail(strValue) ){
							        gfnMsg("MSG_INVALID_EMAIL_GRID", "WARN", strTitle, (i + 1));
									objBindDataset.row = i;
									objGrdTarget.setCellPos(j);
									objGrdTarget.multiSelect=false;		
									objGrdTarget.showEditor();	
							        return false;
							    }
							    
							    if(arrValidationChkString[1] == "url" && !gfnCheckURL(strValue) ){
							        gfnMsg("MSG_INVALID_URL_GRID", "WARN", strTitle, (i + 1));
									objBindDataset.row = i;
									objGrdTarget.setCellPos(j);
									objGrdTarget.multiSelect=false;		
									objGrdTarget.showEditor();	
							        return false;
							    }
							    
							    if(arrValidationChkString[1] == "phone" && !gfnCheckPhone(strValue) ){
							        gfnMsg("MSG_INVALID_PHONE_GRID", "WARN", strTitle, (i + 1));
									objBindDataset.row = i;
									objGrdTarget.setCellPos(j);
									objGrdTarget.multiSelect=false;		
									objGrdTarget.showEditor();	
							        return false;
							    }
							    
							    if(arrValidationChkString[1] == "resno" && !gfnCheckResNo(strValue) ){
							        gfnMsg("MSG_INVALID_RESNO_GRID", "WARN", strTitle, (i + 1));
									objBindDataset.row = i;
									objGrdTarget.setCellPos(j);
									objGrdTarget.multiSelect=false;		
									objGrdTarget.showEditor();	
							        return false;
							    }
							    
							    if(arrValidationChkString[1] == "date" && !gfnCheckDate8(strValue) ){
							        gfnMsg("MSG_INVALID_DATE8_GRID", "WARN", strTitle, (i + 1));
									objBindDataset.row = i;
									objGrdTarget.setCellPos(j);
									objGrdTarget.multiSelect=false;		
									objGrdTarget.showEditor();	
							        return false;
							    }
							    
							    if(arrValidationChkString[1] == "date10" && !gfnCheckDate10(strValue) ){
							        gfnMsg("MSG_INVALID_DATE10_GRID", "WARN", strTitle, (i + 1));
									objBindDataset.row = i;
									objGrdTarget.setCellPos(j);
									objGrdTarget.multiSelect=false;		
									objGrdTarget.showEditor();	
							        return false;
							    }
							}
							
							
							//6. 기간관련 체크
						    if(arrValidationChkString[0] == "fromDate" ) {
						    	var fromDateValue = objBindDataset.getColumn(i, arrValidationChkString[1]);
						    
							    if((fromDateValue != null && fromDateValue != "") || (strValue != null && strValue != "")) {
								    var fromFieldTitle;
								    
								    for(var l = 0 ; l < objGrdTarget.getColCount() ; l++) {
										if(objGrdTarget.getCellProp("body", l, "colid") == arrValidationChkString[1]) {
											fromFieldTitle = objGrdTarget.getCellProp("head", l ,"text");
											break;
										}
									}
								    
								    if(gfnIsNull(fromDateValue) || !gfnCheckDate10(fromDateValue)) {
								    	gfnMsg("MSG_REQUIRED_DATE_GRID", "WARN", fromFieldTitle, (i + 1));
										objBindDataset.row = i;
										objGrdTarget.setCellPos(l);
										objGrdTarget.multiSelect=false;		
										objGrdTarget.showEditor();	
								        return false;
								    } else if(gfnIsNull(strValue) || !gfnCheckDate10(strValue)) {
								    	gfnMsg("MSG_REQUIRED_DATE_GRID", "WARN", strTitle, (i + 1));
										objBindDataset.row = i;
										objGrdTarget.setCellPos(j);
										objGrdTarget.multiSelect=false;	
										objGrdTarget.showEditor();	
								        return false;
								    } else if(fromDateValue > strValue) {
								    	gfnMsg("MSG_INVALID_PERIOD_GRID", "WARN", strTitle, fromFieldTitle, (i + 1));
										objBindDataset.row = i;
										objGrdTarget.setCellPos(j);
										objGrdTarget.multiSelect=false;	
										objGrdTarget.showEditor();	
								        return false;		    	
								    }
								}
						    }
						}
					}
				}
			}
		}
	}	
	
	return true;
}

// *****************************************************************************
// Function Name: gfnValidateDataset
// Description	: dataset validation check
// Argument		: objTarget(대상데이터셋객체)
// Return		: Boolean(검사결과값 : True-성공, False-실패)
// *****************************************************************************
function gfnValidateDataset(objTarget) {
	var strColId, strValue, strTitle, arrValidationChkList, arrValidationChkString, strLimit;
	
	// Dataset row loop
	for(var i = 0 ; i < objTarget.getRowCountNF() ; i++) {
		if(objTarget.getRowTypeNF(i) != "normal") {
			// Grid column loop
			for(var j = 0 ; j < objTarget.getColCount(); j++) {
				strColId = objTarget.getColId(j);

				if(!gfnIsNull(strColId)) {
					arrValidationChkList = objTarget.getColMapValue(strColId);
										
					strValue = trim(objTarget.getColumnNF(i, j));
					
					if(!gfnIsNull(arrValidationChkList)) {
						arrValidationChkList = split(arrValidationChkList, ",");
						
						for(var k = 0 ; k < length(arrValidationChkList) ; k++) {
							arrValidationChkString = split(arrValidationChkList[k], "=");
							
							// 0. 타이틀
							if(arrValidationChkString[0] == "title" || arrValidationChkString[0] == "titleId") {
								if(arrValidationChkString[0] == "title") {
									strTitle = arrValidationChkString[1];
								} else {
									strTitle = eval("global.domain." + arrValidationChkString[1]);
								}
								continue;
							}
							
							if(gfnIsNull(strTitle)) {
								strTitle = objTarget.getColId(j);
							}
							
							//1.필수값체크
							if(arrValidationChkString[0] == "required" && gfnIsNull(strValue)) {
								objTarget.unfilter();
								objTarget.row = i;
								gfnMsg("MSG_REQUIRED_GRID", "WARN", strTitle, (i + 1));
								
								return false;
							}
						
							//2.최대길이 체크 (limit 속성 우선 적용)
							if(arrValidationChkString[0] == "maxLength" && length(strValue) > arrValidationChkString[1]) {
								objTarget.unfilter();
								objTarget.row = i;
								gfnMsg("MSG_MAX_LENGTH_GRID", "WARN", strTitle, arrValidationChkString[1], (i + 1));
								
								return false;
							}
							
							//3.최소길이 체크
							if(arrValidationChkString[0] == "minLength" && length(strValue) < arrValidationChkString[1]) {
								objTarget.unfilter();
								objTarget.row = i;
								gfnMsg("MSG_MIN_LENGTH_GRID", "WARN", strTitle, arrValidationChkString[1], (i + 1));
								
								return false;
							}
							
							//4.최소값 체크
							if(arrValidationChkString[0] == "fromNum" && gfnCheckNumber(strValue, "-.")) {
								if(parseFloat(arrValidationChkString[1]) > parseFloat(strValue)) {
									objTarget.unfilter();
									objTarget.row = i;
									gfnMsg("MSG_LIMIT_MIN_GRID", "WARN", strTitle, arrValidationChkString[1], (i + 1));
									
									return false;
								}
							}
							
							//4.최대값 체크
							if(arrValidationChkString[0] == "toNum" && gfnCheckNumber(strValue, "-.")) {
								if(parseFloat(arrValidationChkString[1]) < parseFloat(strValue)) {
									objTarget.unfilter();
									objTarget.row = i;
									gfnMsg("MSG_LIMIT_MAX_GRID", "WARN", strTitle, arrValidationChkString[1], (i + 1));
									
									return false;
								}
							}
							
							//5. format관련체크
							if(arrValidationChkString[0] == "format" && !gfnIsNull(strValue)) {
								if(arrValidationChkString[1] == "mail" && !gfnCheckEmail(strValue) ) {
									objTarget.unfilter();
									objTarget.row = i;
							        gfnMsg("MSG_INVALID_EMAIL_GRID", "WARN", strTitle, (i + 1));

							        return false;
							    }
							    
							    if(arrValidationChkString[1] == "url" && !gfnCheckURL(strValue) ) {
							    	objTarget.unfilter();
									objTarget.row = i;
							        gfnMsg("MSG_INVALID_URL_GRID", "WARN", strTitle, (i + 1));
							        return false;
							    }
							    
							    if(arrValidationChkString[1] == "phone" && !gfnCheckPhone(strValue) ) {
								    objTarget.unfilter();
									objTarget.row = i;
							        gfnMsg("MSG_INVALID_PHONE_GRID", "WARN", strTitle, (i + 1));
							        return false;
							    }
							    
							    if(arrValidationChkString[1] == "resno" && !gfnCheckResNo(strValue) ) {
							    	objTarget.unfilter();
									objTarget.row = i;
							        gfnMsg("MSG_INVALID_RESNO_GRID", "WARN", strTitle, (i + 1));
							        return false;
							    }
							    
							    if(arrValidationChkString[1] == "date" && !gfnCheckDate8(strValue) ) {
							    	objTarget.unfilter();
									objTarget.row = i;
							        gfnMsg("MSG_INVALID_DATE8_GRID", "WARN", strTitle, (i + 1));
							        return false;
							    }
							    
							    if(arrValidationChkString[1] == "date10" && !gfnCheckDate10(strValue) ){
							    	objTarget.unfilter();
									objTarget.row = i;
							        gfnMsg("MSG_INVALID_DATE10_GRID", "WARN", strTitle, (i + 1));
							        return false;
							    }
							}
							
							//6. 기간관련 체크
						    if(arrValidationChkString[0] == "fromDate" ) {
						    	var fromDateValue = objTarget.getColumn(i, arrValidationChkString[1]);
						    
							    if(!gfnIsNull(fromDateValue) || !gfnIsNull(strValue)) {
								    var fromFieldTitle = arrValidationChkString[1];
								    
								    var strMapValue = objTarget.getColMapValue(arrValidationChkString[1]);
								    
								    if(!gfnIsNull(strMapValue)) {
										var arrChk = split(arrValidationChkList, ",");
										
										for(var l = 0 ; l < length(arrChk) ; l++) {
											var arrChkStr = split(arrChk[l], "=");
											
											//  From Date 항목의 타이틀
											if(arrChkStr[0] == "title" || arrChkStr[0] == "titleObj" || arrChkStr[0] == "titleId") {
												if(arrChkStr[0] == "title") {
													fromFieldTitle = arrChkStr[1];
												} else if(arrChkStr[0] == "titleId") {
													fromFieldTitle = eval("global.domain." + arrChkStr[1]);
												}
											}
										}
									}
								    
								    if(gfnIsNull(fromDateValue) || !gfnCheckDate10(fromDateValue)) {
								    	objTarget.unfilter();
								    	objTarget.row = i;
								    	gfnMsg("MSG_REQUIRED_DATE_GRID", "WARN", fromFieldTitle, (i + 1));
								        return false;
								    } else if(gfnIsNull(strValue) || !gfnCheckDate10(strValue)) {
								    	objTarget.unfilter();
								    	objTarget.row = i;
								    	gfnMsg("MSG_REQUIRED_DATE_GRID", "WARN", strTitle, (i + 1));
								        return false;
								    } else if(fromDateValue > strValue) {
								    	objTarget.unfilter();
								    	objTarget.row = i;
								    	gfnMsg("MSG_INVALID_PERIOD_GRID", "WARN", strTitle, fromFieldTitle, (i + 1));
								        return false;		    	
								    }
								}
						    }
						}
					}
				}
			}
		}
	}	
	
	return true;
}