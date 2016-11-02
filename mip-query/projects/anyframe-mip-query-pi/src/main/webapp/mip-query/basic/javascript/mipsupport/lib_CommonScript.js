﻿﻿//var CS_STR_FORM_ON_UNLOAD_COMPLATED;

var CS_ARR_STR_GRID_ID               = array();
var CS_ARR_STR_GRID_RESET_CONTENTS   = array();

var CS_ARR_STR_GRID_ON_FOCUS          = array();
var CS_ARR_STR_GRID_ON_KILL_FOCUS     = array();
var CS_ARR_STR_GRID_ON_HEAD_CLICK     = array();
var CS_ARR_STR_GRID_ON_HEAD_DBL_CLICK = array();
var CS_ARR_STR_GRID_ON_KEY_DOWN       = array();
var CS_ARR_STR_GRID_ON_R_BUTTON_DOWN  = array();

var CS_ARR_STR_GRID_POPUP_MENU = array();

var CS_ARR_STR_GRID_HEAD_MENU_CONTENTS = array();
var CS_ARR_STR_GRID_HEAD_MENU_DATASET  = array();
var CS_ARR_STR_GRID_BODY_MENU_DATASET  = array();
// var CS_ARR_STR_GRID_SUMM_MENU_DATASET = array();

var CS_ARR_BOL_GRID_LAYOUT_CONTROL = array();

var CS_ARR_STR_GRID_CHECK_COLUMN = array();

/*********************************************************************
 * 기능 : 그리드의 공통기능을 자동 생성
 * Parameters : objGrid				: Grid Component.
 *              strHeadMenuDataset	: Grid Head에서 보여질 메뉴 데이터셋 id
 *              strBodyMenuDataset	: Grid Body에서 보여질 메뉴 데이터셋 id
 *              strSummMenuDataset	: Grid Summary에서 보여질 메뉴 데이터셋 id
 *              bLayout				: Grid Layout 기능을 사용여부 flag (true,false)
 *              strCheckColumn		: Grid Check Column id
 *              strPath				: objGrid 가 속해있는 Pull Path
 * Returns : 없음
 * 예제 : cs_fn_InitCommonScript(objGrid,"ds_HeadMenu","ds_BodyMenu","ds_SummMenu",true,"CHK");
 *********************************************************************/
function cs_fn_InitCommonScript(objGrid,strHeadMenuDataset,strBodyMenuDataset,strSummMenuDataset,bLayout,strCheckColumn)
{
	var strGridID = objGrid;
	
	cs_fn_InitCommon(strGridID,strHeadMenuDataset,strBodyMenuDataset,strSummMenuDataset,bLayout,strCheckColumn);	
}

function cs_fn_InitCommon(strGridID, strHeadMenuDataset, strBodyMenuDataset, strSummMenuDataset, bLayout, strCheckColumn)
{
	var objGrid = eval(strGridID);
	var nIndex  = length(CS_ARR_STR_GRID_ID);
	
	/*
	if(gfnIsNull(objGrid.UserData)) {
		objGrid.UserData = "GRID_IDX=" + nIndex ;
	} else {
		objGrid.UserData += ",GRID_IDX=" + nIndex ;
	}
	*/
	
	CS_ARR_STR_GRID_CHECK_COLUMN[nIndex] = strCheckColumn;

	////////////////////////////////////////////////////////////////////////////////
	// Grid Popup 메뉴생성 자동화
	////////////////////////////////////////////////////////////////////////////////
	//cs_fn_CreatePopupMenu("popup_GridHeadMenu","cs_fn_Popup_GridHeadMenu_OnMenuClick",strHeadMenuDataset);
	cs_fn_CreatePopupMenu("popup_GridBodyMenu","cs_fn_Popup_GridBodyMenu_OnMenuClick",strBodyMenuDataset);
	// cs_fn_CreatePopupMenu("popup_GridSummMenu","cs_fn_Popup_GridSummMenu_OnMenuClick",strSummMenuDataset);

	CS_ARR_STR_GRID_HEAD_MENU_DATASET[nIndex] = strHeadMenuDataset;
	CS_ARR_STR_GRID_BODY_MENU_DATASET[nIndex] = strBodyMenuDataset;
	// CS_ARR_STR_GRID_SUMM_MENU_DATASET[nIndex] = strSummMenuDataset;
	////////////////////////////////////////////////////////////////////////////////



	////////////////////////////////////////////////////////////////////////////////
	// Grid 공통기능 자동화
	////////////////////////////////////////////////////////////////////////////////
	//CS_STR_FORM_ON_UNLOAD_COMPLATED = this.OnUnloadCompleted;
	//this.OnUnloadCompleted = "cs_fn_Form_Event_OnUnloadCompleted";

	CS_ARR_STR_GRID_ID[nIndex]                = strGridID;
	CS_ARR_STR_GRID_ON_FOCUS[nIndex]          = objGrid.OnFocus;
	CS_ARR_STR_GRID_ON_KILL_FOCUS[nIndex]     = objGrid.OnKillFocus;
	CS_ARR_STR_GRID_ON_HEAD_CLICK[nIndex]     = objGrid.OnHeadClick;
	CS_ARR_STR_GRID_ON_HEAD_DBL_CLICK[nIndex] = objGrid.OnHeadDblClick;
	CS_ARR_STR_GRID_ON_KEY_DOWN[nIndex]       = objGrid.OnKeyDown;
	CS_ARR_STR_GRID_ON_R_BUTTON_DOWN[nIndex]  = objGrid.OnRButtonDown;
	objGrid.OnFocus        = "grd_fn_OnFocus";
	objGrid.OnKillFocus    = "grd_fn_OnKillFocus";
	objGrid.OnHeadClick    = "cs_fn_Grid_Event_OnHeadClick";
	//objGrid.OnHeadDblClick = "cs_fn_Grid_Event_OnHeadDblClick";
	objGrid.OnKeyDown      = "cs_fn_Grid_Event_OnKeyDown";
	objGrid.OnRButtonDown  = "cs_fn_Grid_Event_OnRButtonDown";
	////////////////////////////////////////////////////////////////////////////////
	
	
	////////////////////////////////////////////////////////////////////////////////
	// Grid Filter 자동화
	////////////////////////////////////////////////////////////////////////////////
	//grd_fn_PopupDivFilterInit(strGridID);
	////////////////////////////////////////////////////////////////////////////////

	////////////////////////////////////////////////////////////////////////////////
	// Grid Layout 자동화
	////////////////////////////////////////////////////////////////////////////////
	if(bLayout) {
		grd_fn_GridFormatLoad(strGridID,eval(strHeadMenuDataset));
	} else {
		CS_ARR_STR_GRID_RESET_CONTENTS[nIndex] = objGrid.Contents;
	}
	CS_ARR_BOL_GRID_LAYOUT_CONTROL[nIndex] = bLayout;
	////////////////////////////////////////////////////////////////////////////////

	

}

// <MenuBar CaptionCol="CAPTION" EnableCol="ENABLE" EndColor="white" Font="돋움체,9" GradationMode="Horizontal" Height="20" HighlightBKColor="#316ac5" IconCol="ICON" Id="popup_GridHead" IDCol="ID" Left="496" LevelCol="LEVEL" MainTextColor="black" MenuDataset="ds_PopupMenu_GridHead" OnMenuClick="popup_GridHead_OnMenuClick" PopupBoard3D="False" PopupLeftMargin="12" PopupTextColor="black" Selection3D="False" StartColor="white" Style="XP&#32;2003" TabOrder="20" Top="4" Visible="FALSE" Width="115"></MenuBar>
// <MenuBar CaptionCol="CAPTION" EnableCol="ENABLE" EndColor="white" Font="돋움체,9" GradationMode="Horizontal" Height="20" HighlightBKColor="#316ac5" IconCol="ICON" Id="popup_GridMenu" IDCol="ID" Left="624" LevelCol="LEVEL" MainTextColor="black" MenuDataset="ds_PopupMenu" OnMenuClick="popup_GridMenu_OnMenuClick" PopupBoard3D="False" PopupLeftMargin="12" PopupTextColor="black" Selection3D="False" StartColor="white" Style="XP&#32;2003" TabOrder="21" Top="4" Visible="FALSE" Width="96"></MenuBar>
function cs_fn_CreatePopupMenu(strMenuID,strEvent,strMenuDataset)
{
	for(var i = 0; i < length(CS_ARR_STR_GRID_POPUP_MENU); i++) {
		if(CS_ARR_STR_GRID_POPUP_MENU[i] == strMenuID) {
			return;
		}
	}
	
	var strPopup = 'EndColor="white" Font="돋움체,9" HighlightBKColor="#316ac5" '
					+ 'PopupBoard3D="False" PopupLeftMargin="12" PopupTextColor="black" '
					+ 'Selection3D="False" GradationMode="Horizontal" MainTextColor="black" '
					+ 'StartColor="white" Style="XP&#32;2003" Visible="FALSE" '
					+ 'CaptionCol="CAPTION" '
					+ 'EnableCol="ENABLE" '
					+ 'IconCol="ICON" '
					+ 'IDCol="ID" '
					+ 'LevelCol="LEVEL" '
					//+ 'MenuDataset="'+strMenuDataset+'" '
					+ 'OnMenuClick="'+strEvent+'" ';
					
	create("MenuBar", strMenuID, strPopup);
	CS_ARR_STR_GRID_POPUP_MENU[length(CS_ARR_STR_GRID_POPUP_MENU)] = strMenuID;
	var objMenubar = object(strMenuID);
	objMenubar.MenuDataset = strMenuDataset;
}

function cs_fn_Form_Event_OnUnloadCompleted(obj)
{
/*	성능상 주석처리.. 추후 확인 필요!!
	for(var i = 0; i < length(CS_ARR_STR_GRID_ID); i++) {

		// 그리드 컬러세팅 초기화
		grd_fn_PopupDivColorReset(eval(CS_ARR_STR_GRID_ID[i]));
		
		// 레이아웃이 저장되는 그리드일 경우 처리
		if(CS_ARR_BOL_GRID_LAYOUT_CONTROL[i]) {
			// 그리드 헤드 필터처리가 되어있으면, 초기화한다.
			if(length(GRD_ARR_EXPAND_IMAGE[i]) > 0) {
				grd_fn_PopupDivFilterSet(eval(CS_ARR_STR_GRID_ID[i]));
			}

			grd_fn_GridFormatSave(CS_ARR_STR_GRID_ID[i],eval(CS_ARR_STR_GRID_HEAD_MENU_DATASET[i]));

		// 레이아웃이 저장되지 않는 그리드일 경우 처리
		} else {

		}
		
	}

	// Color Table 저장
	// grd_fn_PopupDivColorSave();
*/
}

function cs_fn_Grid_Event_OnHeadClick(obj,nCell,nX,nY,nPivotIndex)
{
	var bTempChecked = false;
	// Head가 Checkbox일 경우 처리
	if(toLower(obj.GetCellProp("head",nCell,"display")) == "checkbox") {
		var nIndex = grd_fn_GetGridIndex(obj,CS_ARR_STR_GRID_ID);
		grd_fn_SetGridHeadCheck(obj,CS_ARR_STR_GRID_CHECK_COLUMN[nIndex],nCell);
		bTempChecked=true;
	// Head가 Filter 상태 일때 처리
	} else if(	obj.GetCellProp("head",nCell,"expandimage") == GRD_STR_UNFILTER_IMAGE ||
				obj.GetCellProp("head",nCell,"expandimage") == GRD_STR_FILTER_IMAGE ) {

		grd_fn_PopupDivFilter(obj,nCell);
	}

	// 화면의 Grid OnHeadClick 이벤트 호출
	var nIndex = grd_fn_GetGridIndex(obj,CS_ARR_STR_GRID_ID);
	if(!bTempChecked && length(CS_ARR_STR_GRID_ON_HEAD_CLICK[nIndex]) > 0) {
		eval(CS_ARR_STR_GRID_ON_HEAD_CLICK[nIndex]+"("+CS_ARR_STR_GRID_ID[nIndex]+","+nCell+","+nX+","+nY+","+nPivotIndex+")");
	}
}

function cs_fn_Grid_Event_OnHeadDblClick(obj,nCell,nX,nY,nPivotIndex)
{
	if(toLower(obj.GetCellProp("head",nCell,"display")) <> "checkbox") {
		grd_fn_Sort(obj,nCell);
	}

	// 화면의 Grid OnHeadDblClick 이벤트 호출
	var nIndex = grd_fn_GetGridIndex(obj,CS_ARR_STR_GRID_ID);
	if(length(CS_ARR_STR_GRID_ON_HEAD_DBL_CLICK[nIndex]) > 0) {
		eval(CS_ARR_STR_GRID_ON_HEAD_DBL_CLICK[nIndex]+"("+CS_ARR_STR_GRID_ID[nIndex]+","+nCell+","+nX+","+nY+","+nPivotIndex+")");
	}
}

var bCanMoveCell = true;
function cs_fn_Grid_Event_OnKeyDown(obj,nChar,bShift,bCtrl,bAlt,nLLParam,nHLParam)
{
	
	// F3
	if(bCtrl == 0 && bShift == 0 && bAlt == 0 && nChar == 114) {
		var objMenuDataset = eval(CS_ARR_STR_GRID_BODY_MENU_DATASET[grd_fn_GetGridIndex(obj,CS_ARR_STR_GRID_ID)]);
		var nFindRow = objMenuDataset.FindRow("ID","find");
		if(nFindRow < 0) return;

		var strEnable = objMenuDataset.GetColumn(nFindRow,"ENABLE");
		if(length(strEnable) == 0 || strEnable == "true") {
			var objDataset = eval(obj.BindDataset);
			var nRow = objDataset.row;
			var nCol = obj.GetCellPos();
			var strValue;
			if(length(GRD_STR_FIND_VALUE) > 0) {
				strValue = GRD_STR_FIND_VALUE;
			} else {
				strValue = obj.GetCellText("body",nRow,nCol);
			}
			grd_fn_Find(obj,strValue,nRow,nCol,"D");
		}

	// Ctrl + F
	} else if(bCtrl == 1 && bShift == 0 && bAlt == 0 && nChar == 70) {
		var objMenuDataset = eval(CS_ARR_STR_GRID_BODY_MENU_DATASET[grd_fn_GetGridIndex(obj,CS_ARR_STR_GRID_ID)]);
		var nFindRow = objMenuDataset.FindRow("ID","find");
		if(nFindRow < 0) return;

		var strEnable = objMenuDataset.GetColumn(nFindRow,"ENABLE");
		if(length(strEnable) == 0 || strEnable == "true") {
			var nIndex = grd_fn_GetGridIndex(grd_fn_GetFocusGrid(),CS_ARR_STR_GRID_ID);
			frm_fn_FindForm(CS_ARR_STR_GRID_ID[nIndex]);
		}

	// Ctrl + C
	} else if(bCtrl == 1 && bShift == 0 && bAlt == 0 && nChar == 67) {
		var objMenuDataset = eval(CS_ARR_STR_GRID_BODY_MENU_DATASET[grd_fn_GetGridIndex(obj,CS_ARR_STR_GRID_ID)]);
		var nFindRow = objMenuDataset.FindRow("ID","copy");
		if(nFindRow < 0) return;

		var strEnable = objMenuDataset.GetColumn(nFindRow,"ENABLE");
		if(length(strEnable) == 0 || strEnable == "true") {
			grd_fn_ClipboardCopy(obj);
		}

	// Ctrl + X
	} else if(bCtrl == 1 && bShift == 0 && bAlt == 0 && nChar == 88) {

		var objMenuDataset = eval(CS_ARR_STR_GRID_BODY_MENU_DATASET[grd_fn_GetGridIndex(obj,CS_ARR_STR_GRID_ID)]);
		var nFindRow = objMenuDataset.FindRow("ID","cut");
		if(nFindRow < 0) return;

		var strEnable = objMenuDataset.GetColumn(nFindRow,"ENABLE");
		if(length(strEnable) == 0 || strEnable == "true") {
			grd_fn_ClipboardCopy(obj);
			grd_fn_CellDelete(obj);
		}

	// Ctrl + V
	} else if(bCtrl == 1 && bShift == 0 && bAlt == 0 && nChar == 86) {

		var objMenuDataset = eval(CS_ARR_STR_GRID_BODY_MENU_DATASET[grd_fn_GetGridIndex(obj,CS_ARR_STR_GRID_ID)]);
		var nFindRow = objMenuDataset.FindRow("ID","paste");
		if(nFindRow < 0) return;

		var strEnable = objMenuDataset.GetColumn(nFindRow,"ENABLE");
		if(length(strEnable) == 0 || strEnable == "true") {
			grd_fn_ClipboardPaste(obj);
		}

	// Ctrl + Z
	} else if(bCtrl == 1 && bShift == 0 && bAlt == 0 && nChar == 90) {

		var objMenuDataset = eval(CS_ARR_STR_GRID_BODY_MENU_DATASET[grd_fn_GetGridIndex(obj,CS_ARR_STR_GRID_ID)]);
		var nFindRow = objMenuDataset.FindRow("ID","reset");
		if(nFindRow < 0) return;

		var strEnable = objMenuDataset.GetColumn(nFindRow,"ENABLE");
		if(length(strEnable) == 0 || strEnable == "true") {
			grd_fn_CellReset(obj);
		}

	// Delete
	} else if(bCtrl == 0 && bShift == 0 && bAlt == 0 && nChar == 46) {

		if(length(obj.GetEditText()) > 0) return;

		var objMenuDataset = eval(CS_ARR_STR_GRID_BODY_MENU_DATASET[grd_fn_GetGridIndex(obj,CS_ARR_STR_GRID_ID)]);
		var nFindRow = objMenuDataset.FindRow("ID","delete");
		if(nFindRow < 0) return;

		var strEnable = objMenuDataset.GetColumn(nFindRow,"ENABLE");
		if(length(strEnable) == 0 || strEnable == "true") {
			grd_fn_CellDelete(obj);
		}
	} else if(nChar == 13 && bCanMoveCell == true) {
		if(bCtrl == 1) {
		} else if(bShift == 0) {
			obj.MoveToNextCell();
		} else {
			obj.MoveToPrevCell();
		}
	}
	
	
	bCanMoveCell = true;
	
}

var nClickRow;
var nClickCell;
function cs_fn_Grid_Event_OnRButtonDown(obj,nPosX,nPosY,nRow,nCell,nPivotIndex)
{
	obj.SetFocus();

	nClickRow  = nRow;
	nClickCell = nCell;

	var nIndex = grd_fn_GetGridIndex(obj,CS_ARR_STR_GRID_ID);
	
	// Grid Head에서 Popup Menu 호출
	if(nRow == -1 && nCell > -1 && length(CS_ARR_STR_GRID_HEAD_MENU_DATASET[nIndex]) > 0) {
		// Head Menu가 중복되어 처리되지 않게하기 위해..
		if(length(CS_ARR_STR_GRID_HEAD_MENU_CONTENTS[nIndex]) > 0) {
			var objMenuDataset = eval(CS_ARR_STR_GRID_HEAD_MENU_DATASET[nIndex]);
			objMenuDataset.LoadXML(CS_ARR_STR_GRID_HEAD_MENU_CONTENTS[nIndex]);
		}

		popup_GridHeadMenu.MenuDataset = CS_ARR_STR_GRID_HEAD_MENU_DATASET[nIndex];
		if(indexOf(obj.GetCurContents(),'row="') > -1) {
			popup_GridHeadMenu.EnableItem("multisort",false);
			popup_GridHeadMenu.EnableItem("autofilter",false);
			// popup_GridHeadMenu.CheckItem("autofilter",false);
		} else {
			popup_GridHeadMenu.EnableItem("multisort",true);
			popup_GridHeadMenu.EnableItem("autofilter",true);
			// popup_GridHeadMenu.CheckItem("autofilter",false);
		}
		popup_GridHeadMenu.TrackPopup(0, ClientToScreenX(obj,nPosX), ClientToScreenY(obj,nPosY));

	// Grid Body에서 Popup Menu 호출
	} else if(nRow > -1 && nCell > -1 && length(CS_ARR_STR_GRID_BODY_MENU_DATASET[nIndex]) > 0) {
		popup_GridBodyMenu.MenuDataset = CS_ARR_STR_GRID_BODY_MENU_DATASET[nIndex];
		popup_GridBodyMenu.TrackPopup(0, ClientToScreenX(obj,nPosX), ClientToScreenY(obj,nPosY));

	// Grid Summary에서 Popup Menu 호출
	} else if(nRow == -2 && nCell > -1 && length(CS_ARR_STR_GRID_SUMM_MENU_DATASET[nIndex]) > 0) {
		// popup_GridSummMenu.MenuDataset = CS_ARR_STR_GRID_SUMM_MENU_DATASET[nIndex];
		// popup_GridSummMenu.TrackPopup(0, ClientToScreenX(obj,nPosX), ClientToScreenY(obj,nPosY));
	}
}

function cs_fn_Popup_GridHeadMenu_OnMenuClick(obj,strID)
{
	// show 처리를 위해 strID를 show로 치환 한다.
	var strOrgID;
	if(indexOf(strID,"show") > -1) {
		strOrgID = strID;
		strID = "show";
	}

	switch(toLower(strID))
	{
		case "show" :
			if(strOrgID != "show") {
				var objGrid = grd_fn_GetFocusGrid();
				var nIndex = grd_fn_GetGridIndex(objGrid,CS_ARR_STR_GRID_ID);
				var objMenuDataset = eval(CS_ARR_STR_GRID_HEAD_MENU_DATASET[nIndex]);
				// if(indexOf(objGrid.GetCurContents(),'row="') > -1) return;

				var nRow    = objMenuDataset.FindRow("ID",strOrgID);
				var strText = objMenuDataset.GetColumn(nRow,"CAPTION");
				// Hide 후에 셀 무빙해서 Hide 하면 Col Index 문제 발생한다.
				// 그래서 아래와 같이 하지않고.. col 값을 다시 꺼내서 사용한다.
				// var nCol    = toNumber(replace(strOrgID,"show"));
				var nCol    = objGrid.GetCellProp("head",toNumber(replace(strOrgID,"show")),"col");
				var nWidth  = toNumber(objMenuDataset.GetColumn(nRow,"URL"));
				objGrid.SetCellProp("head",nCol,"expandchar","");
				objGrid.SetColProp(nCol,"width",nWidth);
				objMenuDataset.DeleteRow(nRow);

				// Head Menu가 중복되어 처리되지 않게하기 위해..
				CS_ARR_STR_GRID_HEAD_MENU_CONTENTS[nIndex] = objMenuDataset.SaveXML();
			}

			break;

		case "hide" :
			var objGrid = grd_fn_GetFocusGrid();
			var nIndex = grd_fn_GetGridIndex(objGrid,CS_ARR_STR_GRID_ID);
			var objMenuDataset = eval(CS_ARR_STR_GRID_HEAD_MENU_DATASET[nIndex]);

			var strText = objGrid.GetCellProp("head",nClickCell,"text");
			var nCol    = objGrid.GetCellProp("head",nClickCell,"col");
			var nRow    = objMenuDataset.FindRow("ID","show");
			var nWidth  = objGrid.GetColProp(nCol,"width");
			if(nRow > -1 && nWidth > 0) {
				var nInsRow = objMenuDataset.InsertRow(nRow+1);
				objMenuDataset.SetColumn(nInsRow,"CAPTION",strText);
				objMenuDataset.SetColumn(nInsRow,"LEVEL",2);
				objMenuDataset.SetColumn(nInsRow,"ID","show"+nClickCell);
				objMenuDataset.SetColumn(nInsRow,"URL",toString(nWidth));

				// Head Menu가 중복되어 처리되지 않게하기 위해..
				CS_ARR_STR_GRID_HEAD_MENU_CONTENTS[nIndex] = objMenuDataset.SaveXML();

				objGrid.SetColProp(nCol,"width",0);
			}

			break;

		case "fix" :
			grd_fn_GridHeadFixed(grd_fn_GetFocusGrid(),nClickCell,true);
			break;

		case "release" :
			grd_fn_GridHeadFixed(grd_fn_GetFocusGrid(),nClickCell,false);
			break;

		case "save" :
			var objGrid = grd_fn_GetFocusGrid();
			var nIndex = grd_fn_GetGridIndex(objGrid,CS_ARR_STR_GRID_ID);
			grd_fn_GridFormatSave(CS_ARR_STR_GRID_ID[i],obj);
			break;

		case "reset" :
			var objGrid = grd_fn_GetFocusGrid();
			var nIndex = grd_fn_GetGridIndex(objGrid,CS_ARR_STR_GRID_ID);

			// 그리드 초기화
			if(length(CS_ARR_STR_GRID_RESET_CONTENTS[nIndex]) > 0) {
				objGrid.Contents = CS_ARR_STR_GRID_RESET_CONTENTS[nIndex];
				objGrid.Format = "";
			} else {
				grd_fn_GridFormatInit(objGrid,obj);
			}

			// 그리드 컬러테이블 초기화
			grd_fn_PopupDivColorReset(objGrid);

			// 그리드 헤드 필터처리가 되어있으면, 초기화한다.
			if(length(GRD_ARR_EXPAND_IMAGE[nIndex]) > 0) {
				grd_fn_PopupDivFilterSet(objGrid);
			}

			// Show 목록 삭제
			var objMenuDataset = eval(CS_ARR_STR_GRID_HEAD_MENU_DATASET[nIndex]);
			var nRow = objMenuDataset.FindRow("ID","show");
			for(var i = (nRow+1); i < objMenuDataset.GetRowCount(); i++) {
				if(indexOf(objMenuDataset.GetColumn(i,"ID"),"show") > -1) {
					objMenuDataset.DeleteRow(i);
					--i;
				}
			}
			// Head Menu가 중복되어 처리되지 않게하기 위해..
			CS_ARR_STR_GRID_HEAD_MENU_CONTENTS[nIndex] = objMenuDataset.SaveXML();

			break;

		case "multisort" :
			var objGrid    = grd_fn_GetFocusGrid();
			var nIndex     = grd_fn_GetGridIndex(objGrid,CS_ARR_STR_GRID_ID);
			var objDataset = eval(objGrid.BindDataset);

			if(indexOf(objGrid.GetCurContents(),'row="') > -1) return;

			var strArg     = "L_ARG_GRID_ID=" + CS_ARR_STR_GRID_ID[nIndex] + " L_ARG_STR_DIV_FLAG=false";
			var strResult  = Dialog("includes::GRDMULTISORT.xml",strArg,-1,-1,false,-1,-1);
			if(length(strResult) > 0) {
				//objDataset.Sort(strResult);
				grd_fn_Sort(objGrid,-1,strResult);
			}
			break;

		case "autofilter" :
			var objGrid = grd_fn_GetFocusGrid();
			if(indexOf(objGrid.GetCurContents(),'row="') > -1) return;

			grd_fn_PopupDivFilterSet(objGrid);

			break;

		default :
			var objGrid = grd_fn_GetFocusGrid();
			var nIndex = grd_fn_GetGridIndex(objGrid,CS_ARR_STR_GRID_ID);
			var objMenuDataset = eval(CS_ARR_STR_GRID_HEAD_MENU_DATASET[nIndex]);
			var strFormatID = objMenuDataset.LookUp("ID",strID,"FORMATID");

			// 그리드 초기화
			if(length(CS_ARR_STR_GRID_RESET_CONTENTS[nIndex]) > 0) {
				objGrid.Contents = CS_ARR_STR_GRID_RESET_CONTENTS[nIndex];
				objGrid.Format = "";
			} else {
				grd_fn_GridFormatInit(objGrid,obj);
			}

			// 그리드 컬러테이블 초기화
			grd_fn_PopupDivColorReset(objGrid);

			// 그리드 헤드 필터처리가 되어있으면, 초기화한다.
			if(length(GRD_ARR_EXPAND_IMAGE[nIndex]) > 0) {
				grd_fn_PopupDivFilterSet(objGrid);
			}

			// Show 목록 삭제
			var objMenuDataset = eval(CS_ARR_STR_GRID_HEAD_MENU_DATASET[nIndex]);
			var nRow = objMenuDataset.FindRow("ID","show");
			for(var i = (nRow+1); i < objMenuDataset.GetRowCount(); i++) {
				if(indexOf(objMenuDataset.GetColumn(i,"ID"),"show") > -1) {
					objMenuDataset.DeleteRow(i);
					--i;
				}
			}
			// Head Menu가 중복되어 처리되지 않게하기 위해..
			CS_ARR_STR_GRID_HEAD_MENU_CONTENTS[nIndex] = objMenuDataset.SaveXML();

			// 디자인된 그리드 포맷이 존재할 경우 포맷을 세팅하고,
			// 없을경우 자동으로 생성한다.
			if(length(strFormatID) > 0) {
				objGrid.SetFormat(strFormatID);
			} else {
				cs_fn_Grid_SingleToMultiRow(objGrid,2);
			}
			break;
	}
}

function cs_fn_Popup_GridBodyMenu_OnMenuClick(obj,strID)
{

	switch(toLower(strID))
	{
		case "vditto" :
			var nIndex = grd_fn_GetGridIndex(grd_fn_GetFocusGrid(),CS_ARR_STR_GRID_ID);
			grd_fn_SetVDittoValue(grd_fn_GetFocusGrid(),CS_ARR_STR_GRID_CHECK_COLUMN[nIndex]);
			break;

		case "hditto" :
			grd_fn_SetHDittoValue(grd_fn_GetFocusGrid());
			break;

		case "mditto" :
			var nIndex = grd_fn_GetGridIndex(grd_fn_GetFocusGrid(),CS_ARR_STR_GRID_ID);
			var objMenuDataset = eval(obj.MenuDataset);
			var strUrl = objMenuDataset.GetColumn(objMenuDataset.FindRow("ID",strID),"URL");

			if(indexOf(strUrl,".xml") > -1) {
				frm_fn_MultiDittoForm(grd_fn_GetFocusGrid(),strUrl,CS_ARR_STR_GRID_CHECK_COLUMN[nIndex]);
			} else if(length(strUrl) > 0) {
				frm_fn_MultiDittoDS(grd_fn_GetFocusGrid(),eval(strUrl).Contents,CS_ARR_STR_GRID_CHECK_COLUMN[nIndex]);
			}
			break;

		case "find" :
			var nIndex = grd_fn_GetGridIndex(grd_fn_GetFocusGrid(),CS_ARR_STR_GRID_ID);
			frm_fn_FindForm(CS_ARR_STR_GRID_ID[nIndex]);
			break;

		case "reset" :
			grd_fn_CellReset(grd_fn_GetFocusGrid());
			break;

		case "cut" :
			grd_fn_ClipboardCopy(grd_fn_GetFocusGrid());
			grd_fn_CellDelete(grd_fn_GetFocusGrid());
			break;

		case "copy" :
			grd_fn_ClipboardCopy(grd_fn_GetFocusGrid());
			break;

		case "paste" :
			grd_fn_ClipboardPaste(grd_fn_GetFocusGrid());
			break;

		case "delete" :
			grd_fn_CellDelete(grd_fn_GetFocusGrid());
			break;

		case "backcolor" :
			var objGrid = grd_fn_GetFocusGrid();
			var arrCellRect = objGrid.GetCellRect(nClickRow,nClickCell);
			var nDivX = ClientToScreenX(objGrid,arrCellRect[0]);
			var nDivY = ClientToScreenY(objGrid,arrCellRect[1]) + objGrid.RowHeight;
			grd_fn_PopupDivColor("bkcolor",grd_fn_GetFocusGrid(),nDivX,nDivY);
			break;

		case "forecolor" :
			var objGrid = grd_fn_GetFocusGrid();
			var arrCellRect = objGrid.GetCellRect(nClickRow,nClickCell);
			var nDivX = ClientToScreenX(objGrid,arrCellRect[0]);
			var nDivY = ClientToScreenY(objGrid,arrCellRect[1]) + objGrid.RowHeight;
			grd_fn_PopupDivColor("color",grd_fn_GetFocusGrid(),nDivX,nDivY);
			break;

		case "excelexport" : 
			var objGrid = grd_fn_GetFocusGrid();
			//alert(objGrid);
			//objGrid.Format = 'defalult';
			//GF_SaveToExcel(objGrid);
			ex_fn_ExcelExport(objGrid);
			break;

		case "excelimport" : 
			var objGrid = grd_fn_GetFocusGrid();
			ex_fn_ExcelImport(objGrid);
			break;
		default :
			break;
	}
}

/*********************************************************************
 * 기능 : Grid를 멀티로우 형태로 가공
 * 범위 : (public)
 * 인수 : dsObj		- Source Grid 또는 Dataset
 *        nRowCnt	- 멀티로우로 처리할 row 수
 * Returns : 
 * 예제 : cs_fn_Grid_SingleToMultiRow(objGrid,2)
 ********************************************************************/
function cs_fn_Grid_SingleToMultiRow(objGrid,nRowCnt)
{
	var strFormatID = "format"+nRowCnt;
	var strContents = objGrid.GetCurContents();

	if(	indexOf(strContents,'colspan="') > -1 ||
		indexOf(strContents,'rowspan="') > -1 ||
		indexOf(strContents,'row="') > -1 ) {
		alert("자동화 할 수 없는 디자인 입니다.");
		return;
	}

	var nStartIdx;
	var nEndIdx;

	nStartIdx = indexOf(strContents,'<columns>');
	nEndIdx = indexOf(strContents,'</columns>');
	var strColInfo = trim(replace(substr(strContents,nStartIdx,(nEndIdx-nStartIdx)),'<columns>',''));
	var arrColInfo = split(strColInfo,"\n","webstyle");

	nStartIdx = indexOf(strContents,'<head>');
	nEndIdx = indexOf(strContents,'</head>');
	var strHeadInfo = trim(replace(substr(strContents,nStartIdx,(nEndIdx-nStartIdx)),'<head>',''));
	var arrHeadInfo = split(strHeadInfo,"\n","webstyle");

	nStartIdx = indexOf(strContents,'<body>');
	nEndIdx = indexOf(strContents,'</body>');
	var strBodyInfo = trim(replace(substr(strContents,nStartIdx,(nEndIdx-nStartIdx)),'<body>',''));
	var arrBodyInfo = split(strBodyInfo,"\n","webstyle");

	nStartIdx = indexOf(strContents,'<summary>');
	nEndIdx = indexOf(strContents,'</summary>');
	var strSummInfo = trim(replace(substr(strContents,nStartIdx,(nEndIdx-nStartIdx)),'<summary>',''));
	var arrSummInfo = split(strSummInfo,"\n","webstyle");

	var bIsCheck = false;
	if(indexOf(arrBodyInfo[0],'display="checkbox"') > -1) {
		bIsCheck = true;
	}

	var nOrgColCnt = length(arrHeadInfo);
	var nSplitDnColCnt = truncate(nOrgColCnt / nRowCnt,0);
	var nCeilVal = round(nOrgColCnt % nRowCnt,0);
	// trace("nSplitDnColCnt = " + nSplitDnColCnt + " : " + nOrgColCnt + " : " + nCeilVal);
	var nOrgIndex;

	// 첫 컬럼이 Checkbox 일경우 Checkbox컬럼의 row를 합친다.
	if(bIsCheck) {
		arrHeadInfo[0] = replace(arrHeadInfo[0],'col="0"','col="0" rowspan="'+nRowCnt+'"');
		arrBodyInfo[0] = replace(arrBodyInfo[0],'col="0"','col="0" rowspan="'+nRowCnt+'"');
		arrSummInfo[0] = replace(arrSummInfo[0],'col="0"','col="0" rowspan="'+nRowCnt+'"');
	}

	for(var i = 0; i < nSplitDnColCnt; i++) {
		nOrgIndex = nSplitDnColCnt+nCeilVal+i;
		arrHeadInfo[nOrgIndex] = replace(arrHeadInfo[nOrgIndex],'col="'+nOrgIndex+'"','col="'+(i+bIsCheck)+'" row="'+(nRowCnt-1)+'"');
	}
	for(var i = 0; i < nSplitDnColCnt; i++) {
		nOrgIndex = nSplitDnColCnt+nCeilVal+i;
		arrBodyInfo[nOrgIndex] = replace(arrBodyInfo[nOrgIndex],'col="'+nOrgIndex+'"','col="'+(i+bIsCheck)+'" row="'+(nRowCnt-1)+'"');
	}
	for(var i = 0; i < nSplitDnColCnt; i++) {
		nOrgIndex = nSplitDnColCnt+nCeilVal+i;
		arrSummInfo[nOrgIndex] = replace(arrSummInfo[nOrgIndex],'col="'+nOrgIndex+'"','col="'+(i+bIsCheck)+'" row="'+(nRowCnt-1)+'"');
	}

	// Check 컬럼을 제외하고, 홀수개 컬럼일 경우 마지막 컬럼의 row를 합친다.
	if(nCeilVal == 0) {
		var nLastIndex = length(arrHeadInfo) - 1;
		arrHeadInfo[nLastIndex] = replace(arrHeadInfo[nLastIndex],'row="'+(nRowCnt-1)+'"','rowspan="'+nRowCnt+'"');
		arrBodyInfo[nLastIndex] = replace(arrBodyInfo[nLastIndex],'row="'+(nRowCnt-1)+'"','rowspan="'+nRowCnt+'"');
		arrSummInfo[nLastIndex] = replace(arrSummInfo[nLastIndex],'row="'+(nRowCnt-1)+'"','rowspan="'+nRowCnt+'"');
		var strHeadTemp = arrHeadInfo[nLastIndex];
		var strBodyTemp = arrBodyInfo[nLastIndex];
		var strSummTemp = arrSummInfo[nLastIndex];
		for(var i = (nLastIndex-1); i >= 0; i--) {
			if(indexOf(arrHeadInfo[i],'row="'+(nRowCnt-1)+'"') > -1) {
				arrHeadInfo[i+1] = arrHeadInfo[i];
				arrBodyInfo[i+1] = arrBodyInfo[i];
				arrSummInfo[i+1] = arrSummInfo[i];
			} else {
				arrHeadInfo[i+1] = strHeadTemp;
				arrBodyInfo[i+1] = strBodyTemp;
				arrSummInfo[i+1] = strSummTemp;
				i = 0;
			}
		}
	}

	var strNewContents = '<contents>\n<format id="'+strFormatID+'">\n';

	// 첫번째 컬럼에 checkbox가 있고, checkbox 빼고 홀수일 경우(checkbox 컬럼을 합치면 짝수임) 컬럼 1개를 더해준다.
	var nSplitUpColCnt = ceil(nOrgColCnt / nRowCnt,0) + iif(bIsCheck && nCeilVal == 0,1,0);

	strNewContents += '<columns>\n';
	for(var i = 0; i < nSplitUpColCnt; i++) {
		strNewContents += arrColInfo[i] + "\n";
	}
	strNewContents += '</columns>\n';

	strNewContents += '<head>\n';
	for(var i = 0; i < nOrgColCnt; i++) {
		strNewContents += arrHeadInfo[i] + "\n";
	}
	strNewContents += '</head>\n';

	strNewContents += '<body>\n';
	for(var i = 0; i < nOrgColCnt; i++) {
		strNewContents += arrBodyInfo[i] + "\n";
	}
	strNewContents += '</body>\n';

	if(length(arrSummInfo) > 0) {
		strNewContents += '<summary>\n';
		for(var i = 0; i < nOrgColCnt; i++) {
			strNewContents += arrSummInfo[i] + "\n";
		}
		strNewContents += '</summary>\n';
	}

	strNewContents += '</format>\n</contents>\n';

	// objGrid.CreateFormat();
	objGrid.Contents = strNewContents;
	objGrid.Format   = strFormatID;
}



//******************************************************************************
// Excel 저장시 처리 하는 이벤트 
// oGrid : 그리드 이름 
// oFileObj : FileDialog Component Name
// 예) Gf_SaveToExcel(grdMaster,FileDialog0); 위의 함수를 Excel 버튼에 걸어 준다.
//******************************************************************************
/*
function GF_SaveToExcel(obj){
	
	if(isValid(obj) == false) return;
	
	if (obj == null || toUpper(obj.GetType()) != "GRID") {
		alert("해당 그리드를 찾을수 없습니다.");
		return;
	}
    
	strFileDialog = "comLibExcelSave";

	Create("FileDialog",strFileDialog,'Bottom="0" Filter="xls(*.xls)|*.xls|" Height="1" Left="1" Right="1" TabOrder="100" Top="1" Type="Save" Width="1"');
    
    var objFileDialog = object(strFileDialog);
    
    
    var sMsg = ext_MsgBox("엑셀 저장 메세지 처리", "EXCEL EXPORT 처리방법을 선택하세요! \n 1.예 : 파일저장 \n 2. 아니오 : 파일미리보기 \n 3. 취소 : 처리취소","MB_ICONINFORMATION|MB_YESNOCANCEL|MB_DEFBUTTON1");
    
	if("6" = sMsg){
		objFileDialog.FileName = Replace(this.Title," ","");
		var sFileName;
		if (objFileDialog.Open() == true)
		{
			if (indexOf(toUpper(objFileDialog.FileName), ".XLS") == -1) {
				sFileName = objFileDialog.FilePath + "\\" + objFileDialog.FileName+".xls";
			}
			obj.SaveExcel(sFileName, "sheet");
		}
		Destroy(strFileDialog);	
	}else if("7" = sMsg){
		obj.ExportExcelEx("sheet");
		Destroy(strFileDialog);	
	}else{
		Destroy(strFileDialog);	
	}
}
*/
