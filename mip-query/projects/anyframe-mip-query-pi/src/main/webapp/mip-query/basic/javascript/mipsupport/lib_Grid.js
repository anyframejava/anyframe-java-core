/***********************************************************************
 * 2009.09.28 by Anyframe UI Sample
 * grd_fn_Find()에서 Grid검색 시 startColumn에 검색어가 존재하는 경우 빨간표시 되지 않던 부분 수정
 * GRD_STR_FIND_DIRECTION 추가
 ***********************************************************************/﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿
var GRD_STR_SAVE_UNIQUE_KEY = this.id;
var GRD_STR_VERSION         = "2.0";
var GRD_STR_TEMP_FOLDER     = "C:\\temp";	// 파일저장 위치

////////////////////////////////////////////////////////////////////////
// Grid Combo MultiSelect 기능
// 함수명 : grd_fn_PopupDivMultiGrid
//          grd_fn_PopupDivMultiGridSelData
//          grd_fn_PopupDivMultiGridContent
//          grd_fn_PopupDivMultiGridSelected
//          grd_fn_PopupDivMultiGridEscapeSel
//          grd_fn_PopupDivMultiGrdCloseUp
var GRD_BOL_OPEN_CHECK_GRID     = false;	// Create Object Check 용(PopupDivMultiSelect)
var GRD_OBJ_MGRID;							// Multi Select Grid
var GRD_OBJ_MGRID_DATASET;					// Multi Select DataSet
var GRD_OBJ_BIND_DATASET;					// Grid BindDataset
var GRD_NUM_SELECT_ROW;						// Grid Selected Row
var GRD_NUM_SELECT_CELL;					// Grid Selected Cell
var GRD_STR_SELECT_COLID;					// Grid Selected Column
var GRD_STR_GRID_CHECK_COL;					// DataSet Column(Display)
var GRD_STR_GRID_CODE_COL;					// DataSet Column(Display)
var GRD_STR_GRID_TEXT_COL;					// DataSet Column(Display)
////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////
// Sort 기능
// 함수명 : grd_fn_SetGridSort
//          grd_fn_ClearSortMark
//          grd_fn_SetSubHeadClear
//          grd_fn_GridSort
//          grd_fn_SetGridShiftSort
﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿var CONST_ASC_MARK  = "▲";
var CONST_DESC_MARK = "▼";
var GRD_NUM_M_CNT;
var GRD_NUM_G_CNT;
var GRD_BOL_CREATE_CHECK_DATASET = false;	// Multi Sort(Column 정의 Dataset)
////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////
// Grid Popup Calendar 기능
// 함수명 : grd_fn_PopupDivCalendar
//          grd_fn_PopupDivCalendarCalChanged
//          grd_fn_PopupDivCalendarContent
var GRD_BOL_OPEN_CHECK_CALENDAR = false;	// Create Object Check 용(PopupDaiv Calendar)
var GRD_OBJ_GRID;
var GRD_STR_MASK_CHAR;
////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////
// Copy/Paste 기능
// 함수명 : grd_fn_ClipboardCopy
//          grd_fn_ClipboardPaste
var GRD_STR_COL_SEPARATOR  = "	";
var GRD_STR_LINE_SEPARATOR = "\n";
////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////
// Grid Layout 저장/복원 기능
// 함수명 : grd_fn_GridFormatInit
//          grd_fn_GridFormatSave
//          grd_fn_GridFormatLoad
//          grd_fn_GridFormatDelete
var GRD_ARR_STR_FORMAT_GRID_ID = array();
// var GRD_ARR_STR_DISPLAY_FORMAT_DATASET = array();			// Grid Display Format 을 관리하는 Dataset
////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////
// Find 기능
// 함수명 : grd_fn_Find
var GRD_STR_FIND_VALUE;
var GRD_STR_FIND_DIRECTION;
////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////
// Filter 기능
// 함수명 : grd_fn_PopupDivFilter
//          grd_fn_PopupDivFilterInit
//          grd_fn_PopupDivFilterOpen
//          grd_fn_PopupDivFilterSet
//          grd_fn_PopupDivFilterContent
//          grd_fn_PopupDivFilterList_OnDblClick
var GRD_BOL_OPEN_CHECK_FILTER   = false;	// Create Object Check 용(PopupDaiv Filter)
var GRD_NUM_FILTER_CELL;
var GRD_STR_FILTER_IMAGE   = "btn_putDown_filter";
var GRD_STR_UNFILTER_IMAGE = "btn_putDown";
var GRD_ARR_EXPAND_SHOW     = array();
var GRD_ARR_EXPAND_IMAGE    = array();
var GRD_ARR_EXPAND_SIZE     = array();
var GRD_ARR_STR_FILTER_GRID = array();
var GRD_ARR_OBJ_DATASET_FILTER_INFO = array();
var GRD_ARR_OBJ_DATASET_FILTER_MENU = array();
////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////
// Color Setting 기능
// 함수명 : grd_fn_PopupDivColor
//          grd_fn_PopupDivColorSelected
var GRD_BOL_OPEN_CHECK_COLOR = false;	// Create Object Check 용(PopupDaiv Color)
var GRD_OBJ_DATASET_COLOR_TABLE;
////////////////////////////////////////////////////////////////////////






///////////////////////////////////////////////////////////////////////////////
/*********************************************************************
 * 기능 : Grid Combo MultiSelect (공통)
 * Parameters :	obj			Grid Component ID
 *				objDs		Grid BindDataset
 *				colchk		PopupDiv Grid Check Column
 *				colid		PopupDiv Grid ID Column
 *				colnm		PopupDiv Grid Text Column
 *				nRow		Grid Current Row
 *				nCell		Grid Selected Column
 * Returns :
 * 예제 : grd_fn_PopupDivMultiGrid(obj,objDs,colchk,colid,colnm,nRow,nCell)
 *        grd_fn_PopupDivMultiGrid(obj,dsEtc,"chk","code","code_nm",nRow,nCell);
 *********************************************************************/
function grd_fn_PopupDivMultiGrid(objGrid,objDs,colchk,colid,colnm,nRow,nCell)
{
	GRD_OBJ_MGRID = objGrid;
	GRD_OBJ_MGRID_DATASET = objDs;
	GRD_STR_GRID_CHECK_COL = colchk;
	GRD_STR_GRID_CODE_COL = colid;
	GRD_STR_GRID_TEXT_COL = colnm;

	GRD_OBJ_BIND_DATASET = eval(GRD_OBJ_MGRID.BindDataset);

	GRD_NUM_SELECT_ROW   = nRow;
	GRD_NUM_SELECT_CELL  = nCell;
	GRD_STR_SELECT_COLID = GRD_OBJ_MGRID.GetCellProp("Body",nCell,"ColId");

	var strVal = GRD_OBJ_BIND_DATASET.GetColumn(nRow,GRD_STR_SELECT_COLID);
	var arrCellRect = GRD_OBJ_MGRID.GetCellRect(nRow,nCell);
	var nDivX = ClientToScreenX(objGrid,arrCellRect[0]);
	var nDivY = ClientToScreenY(objGrid,arrCellRect[1]);
	var nDivW = arrCellRect[2] - arrCellRect[0];
	var nDivH = arrCellRect[3] - arrCellRect[1];

	if(GRD_BOL_OPEN_CHECK_GRID == false) {
		Create("PopupDiv","PopDiv_MultiGrid",'width="185" height="118" border="flat" OnCloseUp="grd_fn_PopupDivMultiGrdCloseUp"');
		GRD_BOL_OPEN_CHECK_GRID = true;
	}

	PopDiv_MultiGrid.Contents = grd_fn_PopupDivMultiGridContent();
	grd_fn_PopupDivMultiGridSelData(strVal);
	PopDiv_MultiGrid.Width  = PopDiv_MultiGrid.grd_multi.Width;
	PopDiv_MultiGrid.Height = PopDiv_MultiGrid.grd_multi.Height;

	PopDiv_MultiGrid.TrackPopup(nDivX,nDivY,nDivW,nDivH);
}

/*********************************************************************
 * 기능 : Grid Combo MultiSelect (공통)
 * Parameters :	argGet		Selected Value Argument
 * Returns :
 * 예제 : grd_fn_PopupDivMultiGridSelData(argGet)
 ********************************************************************/
function grd_fn_PopupDivMultiGridSelData(argGet)
{
	var arr_get = split(argGet," ,");

	for(var i = 0; i < GRD_OBJ_MGRID_DATASET.RowCount(); i++) {
		GRD_OBJ_MGRID_DATASET.SetColumn(i,GRD_STR_GRID_CHECK_COL,"0");
	}

	if(length(arr_get) > 0) {
		for(var i = 0; i < length(arr_get); i++) {
			for(var j = 0; j < GRD_OBJ_MGRID_DATASET.RowCount(); j++) {
				if(arr_get[i] == GRD_OBJ_MGRID_DATASET.GetColumn(j,GRD_STR_GRID_CODE_COL))
					GRD_OBJ_MGRID_DATASET.SetColumn(j,GRD_STR_GRID_CHECK_COL,"1");
				}
			}
		}
	}
}

/*********************************************************************
 * 기능 : PopupDiv Set Contents (공통)
 * Parameters :
 * Returns :
 * 예제 : grd_fn_PopupDivMultiGridContent()
 *********************************************************************/
function grd_fn_PopupDivMultiGridContent()
{
	var str_temp;

	str_temp += '<Contents>';
	str_temp += '	<Grid AutoFit="TRUE" BindDataset="' + GRD_OBJ_MGRID_DATASET.id + '" BkSelColor="#0a246a" BoldHead="true" Border="halfflat" Bottom="93" ColSelect="TRUE" Editable="TRUE" Enable="true" EndLineColor="#919cb1" Height="92" Id="grd_multi" InputPanel="FALSE" Left="2" MinWidth="100" Right="181" SelColor="white" Style="GridStyle" TabOrder="1" TabStop="true" Top="1" UseSelColor="true" Visible="true" Width="179">';
	str_temp += '		<contents>';
	str_temp += '			<columns>';
	str_temp += '				<col width="20"/>';
	str_temp += '				<col width="158"/>';
	str_temp += '			</columns>';
	str_temp += '			<body>';
	str_temp += '				<cell align="center" col="0" colid="chk" display="checkbox" edit="checkbox"/>';
	str_temp += '				<cell col="1" colid="' + GRD_STR_GRID_TEXT_COL + '" display="text"/>';
	str_temp += '			</body>';
	str_temp += '		</contents>';
	str_temp += '	</Grid>';
	str_temp += '	<button BKColor="#5379a0" ButtonStyle="TRUE" Color="white" Font="굴림,8,Bold" Height="20" Id="btn_sel" ImageID="" Left="23" OnClick="grd_fn_PopupDivMultiGridSelected" Style="btnStyle" TabOrder="2" Text="선택적용" Top="94" TopMargin="1" Width="64"></button>';
	str_temp += '	<button BKColor="#5379a0" ButtonStyle="TRUE" Color="white" Font="굴림,8,Bold" Height="20" Id="btn_esc" ImageID="" Left="94" OnClick="grd_fn_PopupDivMultiGridEscapeSel" Style="btnStyle" TabOrder="3" Text="선택해제" Top="94" TopMargin="1" Width="64"></button>';
	str_temp += '</Contents>';

	return str_temp;
}

/*********************************************************************
 * 기능 : PopupDiv Selected Event (공통)
 * Parameters :
 * Returns :
 * 예제 : grd_fn_PopupDivMultiGridSelected()
 *********************************************************************/
function grd_fn_PopupDivMultiGridSelected()
{
	grd_fn_PopupDivMultiGrdCloseUp();
	PopDiv_MultiGrid.ClosePopup();
}

/*********************************************************************
 * 기능 : PopupDiv Esc Event(공통)
 * Parameters :
 * Returns :
 * 예제 : grd_fn_PopupDivMultiGridEscapeSel()
 *********************************************************************/
function grd_fn_PopupDivMultiGridEscapeSel()
{
	for(var i = 0; i < GRD_OBJ_MGRID_DATASET.RowCount(); i++) {
		GRD_OBJ_MGRID_DATASET.SetColumn(i,GRD_STR_GRID_CHECK_COL,"0");
	}
}

/*********************************************************************
 * 기능 : PopupDiv CloseUp (공통)
 * Parameters :
 * Returns :
 * 예제 : grd_fn_PopupDivMultiGrdCloseUp()
 *********************************************************************/
function grd_fn_PopupDivMultiGrdCloseUp(obj,varReturn,bSelOk)
{
	var str_set = "";

	for(var i = 0; i < GRD_OBJ_MGRID_DATASET.RowCount(); i++) {
		if(GRD_OBJ_MGRID_DATASET.getcolumn(i,GRD_STR_GRID_CHECK_COL) == 1) {
			str_set += GRD_OBJ_MGRID_DATASET.getcolumn(i,GRD_STR_GRID_CODE_COL) + ",";
		}
	}

	if(toLower(GRD_OBJ_MGRID.GetCellProp("body",GRD_NUM_SELECT_CELL,"edit")) <> "none") {
		GRD_OBJ_BIND_DATASET.SetColumn(GRD_NUM_SELECT_ROW,GRD_STR_SELECT_COLID,left(str_set,length(str_set)-1));
	}
}
///////////////////////////////////////////////////////////////////////////////////


















///////////////////////////////////////////////////////////////////////////////////
/*********************************************************************
 * 기능 : PopupDiv Calendar Set (공통)
 * Parameters : obj			Grid Component ID
 *				nRow		Current Row
 *				nCell 		Selected Cell
 * Returns :
 * 예제 : grd_fn_PopupDivCalendar(obj,nRow,nCell)
 *********************************************************************/
function grd_fn_PopupDivCalendar(objGrid,nRow,nCell,maskchr)
{
	GRD_OBJ_GRID = objGrid;
	GRD_OBJ_BIND_DATASET = eval(GRD_OBJ_GRID.BindDataset);

	GRD_STR_MASK_CHAR = maskchr;

	GRD_NUM_SELECT_ROW   = nRow;
	GRD_NUM_SELECT_CELL  = nCell;
	GRD_STR_SELECT_COLID =  GRD_OBJ_GRID.GetCellProp("Body",nCell,"ColId");

	var strVal = GRD_OBJ_BIND_DATASET.GetColumn(nRow,GRD_STR_SELECT_COLID);

	var arrCellRect =  GRD_OBJ_GRID.GetCellRect(nRow,nCell);
	var nDivX = ClientToScreenX(objGrid,arrCellRect[0]);
	var nDivY = ClientToScreenY(objGrid,arrCellRect[1]);
	var nDivW = arrCellRect[2] - arrCellRect[0];
	var nDivH = arrCellRect[3] - arrCellRect[1];

	if(GRD_BOL_OPEN_CHECK_CALENDAR == false) {
		Create("PopupDiv","PopDiv_Calendar",'SyncContents="true"');
		GRD_BOL_OPEN_CHECK_CALENDAR = true;
	}

	PopDiv_Calendar.Contents = grd_fn_PopupDivCalendarContent(strVal);
	PopDiv_Calendar.Width  = PopDiv_Calendar.cal_PopupDiv.Width;
	PopDiv_Calendar.Height = PopDiv_Calendar.cal_PopupDiv.Height;
	PopDiv_Calendar.TrackPopup(nDivX,nDivY,nDivW,nDivH);
}

/*********************************************************************
 * 기능 : PopupDiv Calendar Set Contents (공통)
 * Parameters : strDate		Selected Date
 * Returns :	String		PopupDiv Contents
 * 예제 : grd_fn_PopupDivCalendarContent(value)
 *********************************************************************/
function grd_fn_PopupDivCalendarContent(strDate)
{
	var strContents;

	strContents =	'<Contents>' +
					'<Calendar ' +
					'Border="Flat" ' +
					'ClickedBkColor="user41" ' +
					'ClickedTextColor="user42" ' +
					'Dateformat="yyyy-MM-dd" ' +
					'DayFont="Default,-1" ' +
					'DaySelect="Auto" ' +
					'DaySpacingHeight="6" ' +
					'DaySpacingWidth="6" ' +
					'DayStyle="se_cal_day" ' +
					'HeaderBorder="FLAT" ' +
					'HeaderFont="Default,-1" ' +
					'HeadStyle="se_cal_head" ' +
					// 'Height="152" ' +
					'Hilight3dColor="user43" ' +
					'Left="0" ' +
					'LeftMargin="4" ' +
					'MonthPopupBorder="FLAT" ' +
					'RightMargin="4" ' +
					'SaturdayTextColor="user44" ' +
					'SelectedDayFont="Default,-1" ' +
					'Style="se_cal" ' +
					'SundayTextColor="user45" ' +
					'TodayColor="user46" ' +
					'Top="0" ' +
					'TrailingTextColor="user47" ' +
					'WeeksFont="Default,-1" ' +
					'WeekStyle="se_cal_week" ' +
					// 'Width="152" ' +

					'Id="cal_PopupDiv" ' +
					'MonthOnly="TRUE" ' +
					'OnDayClick="grd_fn_PopupDivCalendarCalChanged" ' +
					'Value="' + strDate + '">' +
					'</Calendar>' +
					'</Contents>';

	// strContents += '<Contents>';
	// strContents += '<Calendar Border="Flat" ClickedBkColor="#394c5a" ClickedTextColor="white" ' + chr(10);
	// strContents += 'LeftMargin="2" Height="152" Id="cal_PopupDiv" ' + chr(10);
	// strContents += 'Value="' + strDate + '"Left="0" LeftMargin="2" NullValue="&#32;" RightMargin="2" MonthOnly="TRUE" ' + chr(10);
	// strContents += 'MonthPickerFormat="yyyy년 MM월" OnDayClick="grd_fn_PopupDivCalendarCalChanged" SaturdayTextColor="blue" Style="cal_style1" SundayTextColor="red" ' + chr(10);
	// strContents += 'Top="0" Width="152"></Calendar>' + chr(10);
	// strContents += '</Contents>';

	return strContents;
}

/*********************************************************************
 * 기능 : Calendar Date Changed Event (공통)
 * Parameters : obj			Calendar Component ID
 * Returns :
 * 예제 : grd_fn_PopupDivCalendarCalChanged(obj)
 *********************************************************************/
function grd_fn_PopupDivCalendarCalChanged(obj,strText)
{
	if(length(trim(GRD_STR_MASK_CHAR)) > 0 ) {
		strText = Mid(strText,0,4) + GRD_STR_MASK_CHAR + Mid(strText,4,2) + GRD_STR_MASK_CHAR + Mid(strText,6,2);
	}

	if(toLower(GRD_OBJ_GRID.GetCellProp("body",GRD_NUM_SELECT_CELL,"edit")) <> "none") {
		GRD_OBJ_BIND_DATASET.SetColumn(GRD_NUM_SELECT_ROW,GRD_STR_SELECT_COLID,strText);
	}
	PopDiv_Calendar.ClosePopup();
}
///////////////////////////////////////////////////////////////////////////////////
















///////////////////////////////////////////////////////////////////////////////////
/*********************************************************************
 * 기능 : Grid Filter 초기화 함수
 * 범위 : (public)
 * 인수 : strGridID		-	Grid Object ID
 * Returns :
 * 예제 : grd_fn_PopupDivFilterInit(obj.id)
 *********************************************************************/
function grd_fn_PopupDivFilterInit(strGridID)
{
	var nIndex = length(GRD_ARR_STR_FILTER_GRID);

	// 필터링 처리되는 그리드 ID를 기록한다.
	GRD_ARR_STR_FILTER_GRID[nIndex] = strGridID;

	// 필터링 정보 저장 데이터셋을 생성한다.
	if(isValidObject(GRD_ARR_OBJ_DATASET_FILTER_INFO[nIndex]) == false) {
		Create("Dataset","ds_filterInfo"+nIndex,"");
		GRD_ARR_OBJ_DATASET_FILTER_INFO[nIndex] = object("ds_filterInfo"+nIndex);
		GRD_ARR_OBJ_DATASET_FILTER_INFO[nIndex].AddColumn("COL_ID","STRING");
		GRD_ARR_OBJ_DATASET_FILTER_INFO[nIndex].AddColumn("FILTER_VALUE","STRING");
	}

	// 필터링 메뉴 데이터 셋을 생성한다.
	if(isValidObject(GRD_ARR_OBJ_DATASET_FILTER_MENU[nIndex]) == false) {
		Create("Dataset","ds_filterMenu"+nIndex,"");
		GRD_ARR_OBJ_DATASET_FILTER_MENU[nIndex] = object("ds_filterMenu"+nIndex);
	}
}

/*********************************************************************
 * 기능 : 필터 상태 세팅/초기화(그리드 헤드에 필터 콤보 생성/삭제)
 * 범위 : (public)
 * 인수 : objGrid		-	Grid Object
 * Returns :
 * 예제 : grd_fn_PopupDivFilterSet(objGrid)
 *********************************************************************/
function grd_fn_PopupDivFilterSet(objGrid)
{
	
	var nIndex = grd_fn_GetGridIndex(objGrid,GRD_ARR_STR_FILTER_GRID);
	var objDataset = eval(objGrid.BindDataset);

	var arrExpandSize  = GRD_ARR_EXPAND_SIZE[nIndex];
	var arrExpandShow  = GRD_ARR_EXPAND_SHOW[nIndex];
	var arrExpandImage = GRD_ARR_EXPAND_IMAGE[nIndex];

	var nColCount = objGrid.GetColCount();

	objGrid.Redraw = false;
	// 그리드 헤드에 필터 콤보 생성
	if(length(arrExpandImage) > 0) {

		// Cell Moving 을 풀어준다.
		objGrid.CellMoving = true;

		for(var i = 0; i < nColCount; i++) {
			objGrid.SetCellProp("head",i,"expandsize",arrExpandSize[i]);
			objGrid.SetCellProp("head",i,"expandshow",arrExpandShow[i]);
			objGrid.SetCellProp("head",i,"expandimage",arrExpandImage[i]);
		}
		GRD_ARR_EXPAND_SIZE[nIndex]  = array();
		GRD_ARR_EXPAND_SHOW[nIndex]  = array();
		GRD_ARR_EXPAND_IMAGE[nIndex] = array();
		// 필터 정보 및 필터링 초기화
		if(isValidObject(GRD_ARR_OBJ_DATASET_FILTER_INFO[nIndex]) == true) {
			GRD_ARR_OBJ_DATASET_FILTER_INFO[nIndex].ClearData();
			objDataset.UnFilter();
		}

	// 그리드 헤드에 필터 콤보 삭제
	} else {

		// PopupDiv 처리를 위해 Cell Moving 을 막는다.
		objGrid.CellMoving = false;

		arrExpandSize  = array();
		arrExpandShow  = array();
		arrExpandImage = array();
		for(var i = 0; i < nColCount; i++) {
			if(toLower(objGrid.GetCellProp("head",i,"display")) <> "checkbox") {
				arrExpandSize[i]  = objGrid.GetCellProp("head",i,"expandsize");
				arrExpandShow[i]  = objGrid.GetCellProp("head",i,"expandshow");
				arrExpandImage[i] = objGrid.GetCellProp("head",i,"expandimage");
				objGrid.SetCellProp("head",i,"expandsize","16");
				objGrid.SetCellProp("head",i,"expandshow","true");
				objGrid.SetCellProp("head",i,"expandimage",GRD_STR_UNFILTER_IMAGE);
			}
		}
		GRD_ARR_EXPAND_SIZE[nIndex]  = arrExpandSize;
		GRD_ARR_EXPAND_SHOW[nIndex]  = arrExpandShow;
		GRD_ARR_EXPAND_IMAGE[nIndex] = arrExpandImage;
	}
	objGrid.Redraw = true;
}

/*********************************************************************
 * 기능 : 그리드 셀의 값을 Distinct처리하여 PopupDiv로 보여줌
 * 범위 : (public)
 * 인수 : objGrid	-	Grid Object
 *        nCell		-	PopupDiv가 보여질 Grid Cell
 * Returns :
 * 예제 : grd_fn_PopupDivFilter(obj,2)
 *********************************************************************/
function grd_fn_PopupDivFilter(objGrid,nCell)
{
	var nIndex   = grd_fn_GetGridIndex(objGrid,GRD_ARR_STR_FILTER_GRID);
	var strColID = objGrid.GetCellProp("body",nCell,"colid");

	SetWaitCursor(true);
	SetCapture();
	GRD_ARR_OBJ_DATASET_FILTER_MENU[nIndex].fireevent = false;

	// 기존 다른 컬럼이 필터링 되어 있으면, 필터링 조건을 만들어 준다.
	var nTotalRow = GRD_ARR_OBJ_DATASET_FILTER_INFO[nIndex].GetRowCount();
	var strFilterString = "";
	var strFilterValue;
	for(var i = 0; i < nTotalRow; i++) {

		strFilterValue = toString(GRD_ARR_OBJ_DATASET_FILTER_INFO[nIndex].GetColumn(i,"FILTER_VALUE"));

		if(length(strFilterValue) > 0) {

			strFilterColID = GRD_ARR_OBJ_DATASET_FILTER_INFO[nIndex].GetColumn(i,"COL_ID");

			// 자신 컬럼일 경우 필터링 조건 생성을 중지한다.
			if(GRD_ARR_OBJ_DATASET_FILTER_INFO[nIndex].GetColumn(i,"COL_ID") == strColID) {
				i = nTotalRow;
			} else {
				if(strFilterValue == "(empty)") {
					strFilterString += '&&length(trim(toString(' + strFilterColID + ')))==0';
				} else if(strFilterValue == "(not empty)") {
					strFilterString += '&&length(trim(toString(' + strFilterColID + ')))>0';
				} else {
					strFilterString += '&&' + GRD_ARR_OBJ_DATASET_FILTER_INFO[nIndex].GetColumn(i,"COL_ID") + "=='" + strFilterValue + "'";
				}
			}
		}
	}

	strFilterString = scr_fn_ArrangeCondition(strFilterString,"&&");

	// 필터링 조건이 있으면 필터링 후에 Distinct 처리한다.
	var objOrgDataset = eval(objGrid.BindDataset);

	GRD_ARR_OBJ_DATASET_FILTER_MENU[nIndex].Copy(objOrgDataset);

	// 첫번째 필터링 컬럼이 현재 클릭한 컬럼과 같을경우 필터링 하지 않는다.
	if(GRD_ARR_OBJ_DATASET_FILTER_INFO[nIndex].GetColumn(0,"COL_ID") == strColID) {
		GRD_ARR_OBJ_DATASET_FILTER_MENU[nIndex].UnFilter();
	} else {
		if(length(strFilterString) > 0) {
			GRD_ARR_OBJ_DATASET_FILTER_MENU[nIndex].fireevent = false;
			GRD_ARR_OBJ_DATASET_FILTER_MENU[nIndex].Filter(strFilterString);
			GRD_ARR_OBJ_DATASET_FILTER_MENU[nIndex].fireevent = true;
		}
	}

	// Distinct 처리하고, 필터링 취소용 로우를 추가한다.
	GRD_ARR_OBJ_DATASET_FILTER_MENU[nIndex].LoadCSV(ds_fn_DistinctData(GRD_ARR_OBJ_DATASET_FILTER_MENU[nIndex],strColID));

	// 필드에 값이 없을 경우 필드가 없음/있음 처리
	var nDisTotRow = GRD_ARR_OBJ_DATASET_FILTER_MENU[nIndex].GetRowCount();
	var bFind = false;
	for(var i = 0; i < GRD_ARR_OBJ_DATASET_FILTER_MENU[nIndex].GetRowCount(); i++) {
		if(length(trim(GRD_ARR_OBJ_DATASET_FILTER_MENU[nIndex].GetColumn(i,strColID))) == 0) {
			if(bFind) {
				GRD_ARR_OBJ_DATASET_FILTER_MENU[nIndex].DeleteRow(i);
			} else {
				GRD_ARR_OBJ_DATASET_FILTER_MENU[nIndex].SetColumn(i,strColID,"(empty)");
				GRD_ARR_OBJ_DATASET_FILTER_MENU[nIndex].MoveRow(i,GRD_ARR_OBJ_DATASET_FILTER_MENU[nIndex].GetRowCount()-1);
				var nNewRow = GRD_ARR_OBJ_DATASET_FILTER_MENU[nIndex].AddRow();
				GRD_ARR_OBJ_DATASET_FILTER_MENU[nIndex].SetColumn(nNewRow,strColID,"(not empty)");
				bFind = true;
			}
			--i;
		}
	}

	GRD_ARR_OBJ_DATASET_FILTER_MENU[nIndex].InsertRow(0);
	GRD_ARR_OBJ_DATASET_FILTER_MENU[nIndex].SetColumn(0,strColID,"(all)");

	// 이전 선택위치로 세팅
	var nFindRow = GRD_ARR_OBJ_DATASET_FILTER_INFO[nIndex].FindRow("COL_ID",strColID);
	if(nFindRow < 0 || (length(strFilterString) <= 0 && GRD_ARR_OBJ_DATASET_FILTER_INFO[nIndex].GetColumn(0,"COL_ID") != strColID)) {
		nFindRow = 0;
	} else {
		var strSelectValue = GRD_ARR_OBJ_DATASET_FILTER_INFO[nIndex].GetColumn(nFindRow,"FILTER_VALUE");
		nFindRow = GRD_ARR_OBJ_DATASET_FILTER_MENU[nIndex].FindRow(strColID,strSelectValue);
	}

	GRD_ARR_OBJ_DATASET_FILTER_MENU[nIndex].fireevent = true;
	ReleaseCapture();
	SetWaitCursor(true);

	grd_fn_PopupDivFilterOpen(objGrid,0,nCell,GRD_ARR_OBJ_DATASET_FILTER_MENU[nIndex].id,strColID,strColID,nFindRow);
}

/*********************************************************************
 * 기능 : PopupDiv TrackPopup (공통)
 * 범위 : (private)
 * 인수 : objGrid			-	Grid Object
 *        nRow				-	Grid Row
 *        nCell				-	Grid Cell
 *        strInnerDSID		-	PopupDiv 필터를 만들기 위한 InnerDataset id
 *        strCodeColumn		-	CodeColumn
 *        strDataColumn		-	DataColumn
 *        nSelRow			-	PopupDiv Open 될때 선택될 item
 * Returns :
 * 예제 : grd_fn_PopupDivFilterOpen(objGrid,nRow,nCell,strInnerDSID,strCodeColumn,strDataColumn,nSelRow)
 *********************************************************************/
function grd_fn_PopupDivFilterOpen(objGrid,nRow,nCell,strInnerDSID,strCodeColumn,strDataColumn,nSelRow)
{
	var arrCellRect =  objGrid.GetCellRect(-1,nCell);
	var nDivX = ClientToScreenX(objGrid,arrCellRect[0]);
	var nDivY = ClientToScreenY(objGrid,arrCellRect[1]) + objGrid.HeadHeight;
	var nCellWidth  = arrCellRect[2] - arrCellRect[0];

	if(GRD_BOL_OPEN_CHECK_FILTER == false) {
		Create("PopupDiv","PopDiv_Filter",'SyncContents="true"');
		GRD_BOL_OPEN_CHECK_FILTER = true;
	}

	PopDiv_Filter.Contents = grd_fn_PopupDivFilterContent(strInnerDSID,strCodeColumn,strDataColumn);
	PopDiv_Filter.lst_PopupDivFilter.SetSel(nSelRow,true);

	if(nCellWidth > PopDiv_Filter.lst_PopupDivFilter.Width) {
		PopDiv_Filter.lst_PopupDivFilter.Width = nCellWidth;
	}

	var nDataHeight = (eval(strInnerDSID).GetRowCount() + 1) * 17 ;
	if(nDataHeight < PopDiv_Filter.lst_PopupDivFilter.Height) {
		PopDiv_Filter.lst_PopupDivFilter.Height = nDataHeight;
	}

	PopDiv_Filter.Width  = PopDiv_Filter.lst_PopupDivFilter.Width;
	PopDiv_Filter.Height = PopDiv_Filter.lst_PopupDivFilter.Height;

	GRD_NUM_FILTER_CELL = nCell;

	grd_fn_OnFocus(objGrid);
	PopDiv_Filter.TrackPopup(nDivX,nDivY);
}

/*********************************************************************
 * 기능 : PopupDiv Filter Set Contents (공통)
 * 범위 : (private)
 * 인수 : strDatasetID		-	PopupDiv 필터를 만들기 위한 InnerDataset id
 *        strCodeColumn		-	CodeColumn
 *        strDataColumn		-	DataColumn
 * Returns : String			-	PopupDiv Contents
 * 예제 : grd_fn_PopupDivFilterContent(strDatasetID,strCodeColumn,strDataColumn)
 *********************************************************************/
function grd_fn_PopupDivFilterContent(strDatasetID,strCodeColumn,strDataColumn)
{
	var strContents;

	strContents =	'<Contents>' +
					'<List ' +
					'Border="Flat" ' +
					'Style="se_input" ' +
					'CodeColumn="'+strCodeColumn+'" ' +
					'DataColumn="'+strDataColumn+'" ' +
					'Id="lst_PopupDivFilter" ' +
					'InnerDataset="'+strDatasetID+'" ' +
					'OnDblClick="grd_fn_PopupDivFilterList_OnDblClick" ' +
					'Width="120" ' +
					'Height="250" ' +
					'Left="0" ' +
					'Top="0">' +
					'</List>' +
					'</Contents>';

	return strContents;
}

/*********************************************************************
 * 기능 : PopupDiv Filter Set Contents (공통)
 * 범위 : (private)
 * 인수 : obj			-	Object 이 Event가 발생된 Component.
 *        strCode		-	Variant 선택된 Item의 Code값.
 *        					Code값은 InnerDataset의 CodeColumn을 참조합니다.
 *        strText		-	String 선택된 Item의 Text값.
 *        					Text값은 InnerDataset의 TextColumn을 참조합니다.
 *        nOldIndex		-	Integer 선택 이전의 Index.
 *        nNewIndex		-	Integer 선택 항목의 Index.
 * Returns :
 * 예제 : grd_fn_PopupDivFilterList_OnDblClick(obj,strCode,strText,nOldIndex,nNewIndex)
 *********************************************************************/
function grd_fn_PopupDivFilterList_OnDblClick(obj,strCode,strText,nOldIndex,nNewIndex)
{
	var objGrid = grd_fn_GetFocusGrid();
	var nIndex  = grd_fn_GetGridIndex(objGrid,GRD_ARR_STR_FILTER_GRID);

	var strColID = PopDiv_Filter.lst_PopupDivFilter.CodeColumn;

	var nRow = GRD_ARR_OBJ_DATASET_FILTER_INFO[nIndex].FindRow("COL_ID",strColID);
	// 필터링 취소 Item 을 선택하면, GRD_ARR_OBJ_DATASET_FILTER_INFO[nIndex]에서 삭제한다.
	// if(length(strCode) <= 0) {
	if(strCode == "(all)") {

		// 자신만 초기화 기능
		GRD_ARR_OBJ_DATASET_FILTER_INFO[nIndex].DeleteRow(nRow);
		// 언필터상태 이미지로 변경
		objGrid.SetCellProp("head",GRD_NUM_FILTER_CELL,"expandimage",GRD_STR_UNFILTER_IMAGE);


		// 자신 및 하위필터 초기화 기능
		// var nTotRow = GRD_ARR_OBJ_DATASET_FILTER_INFO[nIndex].GetRowCount();
		// for(var i = 0; i < nTotRow; i++) {
			// GRD_ARR_OBJ_DATASET_FILTER_INFO[nIndex].DeleteRow(nRow);
			// 언필터상태 이미지로 변경
			// objGrid.SetCellProp("head",GRD_NUM_FILTER_CELL,"expandimage",GRD_STR_UNFILTER_IMAGE);
		// }

	} else {
		if(nRow < 0) {
			// Item을 선택하면 필터링 조건을 만들 수 있는 GRD_ARR_OBJ_DATASET_FILTER_INFO[nIndex]에 값을 세팅한다.
			nRow = GRD_ARR_OBJ_DATASET_FILTER_INFO[nIndex].AddRow();
			GRD_ARR_OBJ_DATASET_FILTER_INFO[nIndex].SetColumn(nRow,"COL_ID",strColID);
		}
		GRD_ARR_OBJ_DATASET_FILTER_INFO[nIndex].SetColumn(nRow,"FILTER_VALUE",strCode);
		GRD_ARR_OBJ_DATASET_FILTER_INFO[nIndex].SetColumn(nRow,"SELECT_INDEX",nNewIndex);

		// 필터상태 이미지로 변경
		objGrid.SetCellProp("head",GRD_NUM_FILTER_CELL,"expandimage",GRD_STR_FILTER_IMAGE);
	}

	// 필터링 조건을 만들어 준다.
	var nTotalRow = GRD_ARR_OBJ_DATASET_FILTER_INFO[nIndex].GetRowCount();
	var strFilterString = "";
	var strFilterColID;
	var strFilterValue;
	for(var i = 0; i < nTotalRow; i++) {

		strFilterValue = toString(GRD_ARR_OBJ_DATASET_FILTER_INFO[nIndex].GetColumn(i,"FILTER_VALUE"));

		if(length(strFilterValue) > 0) {

			strFilterColID = GRD_ARR_OBJ_DATASET_FILTER_INFO[nIndex].GetColumn(i,"COL_ID");

			if(strFilterValue == "(empty)") {
				strFilterString += '&&length(trim(toString(' + strFilterColID + ')))==0';
			} else if(strFilterValue == "(not empty)") {
				strFilterString += '&&length(trim(toString(' + strFilterColID + ')))>0';
			} else {
				strFilterString += '&&' + strFilterColID + "=='" + strFilterValue + "'";
			}

			// 자신 컬럼일 경우 이하 필터링 조건 생성을 중지한다.
			if(GRD_ARR_OBJ_DATASET_FILTER_INFO[nIndex].GetColumn(i,"COL_ID") == strColID) {
				i = nTotalRow;
			}
		}
	}

	strFilterString = scr_fn_ArrangeCondition(strFilterString,"&&");
	eval(objGrid.BindDataset).Filter(strFilterString);

	PopDiv_Filter.ClosePopup();
}
///////////////////////////////////////////////////////////////////////////////////






///////////////////////////////////////////////////////////////////////////////////
/*********************************************************************
 * 기능 : PopupDiv Color 초기화 함수
 * 범위 : (public)
 * 인수 : 
 * Returns :
 * 예제 : grd_fn_PopupDivColorInit()
 *********************************************************************/
function grd_fn_PopupDivColorInit()
{
 	if(GRD_BOL_OPEN_CHECK_COLOR == false) {
 
		Create("PopupDiv","PopDiv_Color",'Url="includes::GRDCOLORTABLE.xml" Width="160" Height="120" SyncContents="true"');
		Create("Dataset","ds_ColorTable","");
		GRD_OBJ_DATASET_COLOR_TABLE = object("ds_ColorTable");

		// Color Table 불러오기
		grd_fn_PopupDivColorLoad();

		if(GRD_OBJ_DATASET_COLOR_TABLE.GetColCount() < 3) {
			GRD_OBJ_DATASET_COLOR_TABLE.AddColumn("GRID_ID","String",255);
			GRD_OBJ_DATASET_COLOR_TABLE.AddColumn("FONT_COLOR","String",255);
			GRD_OBJ_DATASET_COLOR_TABLE.AddColumn("BACK_COLOR","String",255);
		}

		GRD_BOL_OPEN_CHECK_COLOR = true;
	}
}

/*********************************************************************
 * 기능 : PopupDiv Color 호출 함수
 * 범위 : (public)
 * 인수 : strPropID		- Cell의 Property 명(BkColor/Color)
 *        objGrid		- Grid Object
 *        nX			- Color Table 이 표시될 X 좌표
 *        nY			- Color Table 이 표시될 Y 좌표
 * Returns :
 * 예제 : grd_fn_PopupDivColor(strPropID,objGrid,nX,nY)
 *********************************************************************/
function grd_fn_PopupDivColor(strPropID,objGrid,nX,nY)
{
	grd_fn_PopupDivColorInit();

	var strColor = PopDiv_Color.TrackPopup(nX,nY);

	var nAreaStartRow;
	var nAreaEndRow;
	var nAreaStartCol;
	var nAreaEndCol;

	if(objGrid.AreaSelect == true && objGrid.ColSelect == true) {

		nAreaStartRow = objGrid.GetAreaStartRow();
		nAreaEndRow   = objGrid.GetAreaEndRow();
		nAreaStartCol = objGrid.GetAreaStartCol();
		nAreaEndCol   = objGrid.GetAreaEndCol();

	} else {

		nAreaStartRow = objGrid.CurrentRow;
		nAreaEndRow   = objGrid.CurrentRow;
		nAreaStartCol = objGrid.CurrentCell;
		nAreaEndCol   = objGrid.CurrentCell+1;
	}

	// Color Expr Table 에서 해당 그리드의 Color Expr 값을 꺼낸다.
	var arrOrgCellColor = array();
	var arrCurCellColor = array();
	var nTableIndex = GRD_OBJ_DATASET_COLOR_TABLE.FindRow("GRID_ID",objGrid.id);

	if(nTableIndex > -1) {


		if(toLower(strPropID) == "color") {
			arrOrgCellColor = GRD_OBJ_DATASET_COLOR_TABLE.GetConstColumn(objGrid.id+"_FONT_COLOR");
			arrCurCellColor = GRD_OBJ_DATASET_COLOR_TABLE.GetColumn(nTableIndex,"FONT_COLOR");
		} else {
			arrOrgCellColor = GRD_OBJ_DATASET_COLOR_TABLE.GetConstColumn(objGrid.id+"_BACK_COLOR");
			arrCurCellColor = GRD_OBJ_DATASET_COLOR_TABLE.GetColumn(nTableIndex,"BACK_COLOR");
		}

		// 2차원 String Array 복원
		// 현재 Color값을 Array로 복원
		arrCurCellColor = split(arrCurCellColor,"-","webstyle");
		for(var i = 0; i < length(arrCurCellColor); i++) {
			arrCurCellColor[i] = split(arrCurCellColor[i],",","webstyle");
		}
		// 원래 Color값을 Array로 복원
		arrOrgCellColor = split(arrOrgCellColor,"-","webstyle");

	} else {
		nTableIndex = GRD_OBJ_DATASET_COLOR_TABLE.AddRow();
		GRD_OBJ_DATASET_COLOR_TABLE.SetColumn(nTableIndex,"GRID_ID",objGrid.id);
		GRD_OBJ_DATASET_COLOR_TABLE.SetColumn(nTableIndex,"FONT_COLOR",arrCurCellColor);
		GRD_OBJ_DATASET_COLOR_TABLE.SetColumn(nTableIndex,"BACK_COLOR",arrCurCellColor);

		GRD_OBJ_DATASET_COLOR_TABLE.AddConstColumn(objGrid.id+"_FONT_COLOR",arrOrgCellColor);
		GRD_OBJ_DATASET_COLOR_TABLE.AddConstColumn(objGrid.id+"_BACK_COLOR",arrOrgCellColor);
	} 


	// Color Expr 생성
	var arrRowColor;
	var strColorExpr;
	for(var nCell = nAreaStartCol; nCell < nAreaEndCol; nCell++) {

		// 범위 지정된 Row의 Color 값을 기록한다.
		for(var nRow = nAreaStartRow; nRow <= nAreaEndRow; nRow++) {
			arrRowColor = arrCurCellColor[nCell];
			if(length(arrRowColor) == 0) arrRowColor = array();
			arrRowColor[nRow] = strColor;
			arrCurCellColor[nCell] = arrRowColor;
		}

		// 원래색이 기록되지 않았으면, 원래색을 기록한다.
		if(length(arrOrgCellColor[nCell]) == 0) {
			var strOrgColor = objGrid.GetCellProp("body",nCell,strPropID);
			if(length(toString(strOrgColor)) <= 0 || strOrgColor <= 0) {
				arrOrgCellColor[nCell] = "empty";
			} else {
				arrOrgCellColor[nCell] = toString(strOrgColor);
			}
		}

		// Color Expr을 생성한다.
		strColorExpr = "expr:decode(row,";
		for(var i = 0; i < length(arrRowColor); i++) {
			if(length(arrRowColor[i]) > 0) {
				strColorExpr += i+",'"+arrRowColor[i]+"',";
			}
		}

		if(indexOf(arrOrgCellColor[nCell],"expr:") > -1) {
			strColorExpr += replace(arrOrgCellColor[nCell],"expr:","")+")";
		} else {
			if(arrOrgCellColor[nCell] == "empty") {
				strColorExpr += "'')";
			} else {
				strColorExpr += "'"+arrOrgCellColor[nCell]+"')";
			}
		}

		// Color Expr을 적용한다.
		objGrid.SetCellProp("body",nCell,strPropID,strColorExpr);
	}

	// 2차원 String Array 생성
	var strDimData;
	// 현재 Color값을 String으로 생성
	var strCurColorData = "";
	var nArraySize = length(arrCurCellColor);
	for(var i = 0; i < nArraySize; i++) {
		strDimData = replace(arrCurCellColor[i],"[","");
		strDimData = replace(strDimData,"]","");
		strCurColorData += strDimData + iif((i+1) < nArraySize,"-","");
	}
	// 원래 Color값을 String으로 생성
	var strOrgColorData = "";
	nArraySize = length(arrOrgCellColor);
	for(var i = 0; i < nArraySize; i++) {
		strDimData = replace(arrOrgCellColor[i],"[","");
		strDimData = replace(strDimData,"]","");
		strOrgColorData += strDimData + iif((i+1) < nArraySize,"-","");
	}

	// Color Expr Table 저장
	if(toLower(strPropID) == "color") {
		GRD_OBJ_DATASET_COLOR_TABLE.SetConstColumn(objGrid.id+"_FONT_COLOR",strOrgColorData);
		GRD_OBJ_DATASET_COLOR_TABLE.SetColumn(nTableIndex,"FONT_COLOR",strCurColorData);
	} else {
		GRD_OBJ_DATASET_COLOR_TABLE.SetConstColumn(objGrid.id+"_BACK_COLOR",strOrgColorData);
		GRD_OBJ_DATASET_COLOR_TABLE.SetColumn(nTableIndex,"BACK_COLOR",strCurColorData);
	}
}

/*********************************************************************
 * 기능 : PopupDiv Selected Event (공통)
 * 범위 : (public)
 * 인수 : strColor		- 선택한 String Color 값
 * Returns :
 * 예제 : grd_fn_PopupDivColorSelected(strColor)
 *********************************************************************/
function grd_fn_PopupDivColorSelected(strColor)
{
	PopDiv_Color.ClosePopup(strColor);
}

/*********************************************************************
 * 기능 : Color Table 값 초기화
 * 범위 : (public)
 * 인수 : objGrid		- Grid Object
 * Returns :
 * 예제 : grd_fn_PopupDivColorReset(objGrid)
 *********************************************************************/
function grd_fn_PopupDivColorReset(objGrid)
{
	grd_fn_PopupDivColorInit();

	var nRow = GRD_OBJ_DATASET_COLOR_TABLE.FindRow("GRID_ID",objGrid.id);
	if(nRow > -1) {

		// 원래 Foreground색으로 복원
		var arrOrgFoColor = GRD_OBJ_DATASET_COLOR_TABLE.GetConstColumn(objGrid.id+"_FONT_COLOR");
		arrOrgFoColor = split(arrOrgFoColor,"-","webstyle");
		for(var i = 0; i < length(arrOrgFoColor); i++) {
			if(arrOrgFoColor[i] == "empty") {
				objGrid.SetCellProp("body",i,"color","");
			} else if(length(arrOrgFoColor[i]) > 0) {
				objGrid.SetCellProp("body",i,"color",arrOrgFoColor[i]);
			}
		}

		// 원래 Background색으로 복원
		var arrOrgBkColor = GRD_OBJ_DATASET_COLOR_TABLE.GetConstColumn(objGrid.id+"_BACK_COLOR");
		arrOrgBkColor = split(arrOrgBkColor,"-","webstyle");
		for(var i = 0; i < length(arrOrgBkColor); i++) {
			if(arrOrgBkColor[i] == "empty") {
				objGrid.SetCellProp("body",i,"bkcolor","");
			} else if(length(arrOrgBkColor[i]) > 0) {
				objGrid.SetCellProp("body",i,"bkcolor",arrOrgBkColor[i]);
			}
		}

		GRD_OBJ_DATASET_COLOR_TABLE.DeleteRow(nRow);
		GRD_OBJ_DATASET_COLOR_TABLE.SetConstColumn(objGrid.id+"_FONT_COLOR","");
		GRD_OBJ_DATASET_COLOR_TABLE.SetConstColumn(objGrid.id+"_BACK_COLOR","");
	}
}

/*********************************************************************
 * 기능 : Color Table File 저장
 * 범위 : (public)
 * 인수 : 
 * Returns :
 * 예제 : grd_fn_PopupDivColorSave()
 *********************************************************************/
function grd_fn_PopupDivColorSave()
{
	grd_fn_PopupDivColorInit();

	var strFileName = GRD_STR_SAVE_UNIQUE_KEY + "_" + this.id + ".xml";
	fdb_fn_LocalDatasetExport(GRD_OBJ_DATASET_COLOR_TABLE,GRD_STR_TEMP_FOLDER,strFileName);
}


/*********************************************************************
 * 기능 : Color Table File 불러오기
 * 범위 : (public)
 * 인수 : 
 * Returns :
 * 예제 : grd_fn_PopupDivColorLoad()
 *********************************************************************/
function grd_fn_PopupDivColorLoad()
{
	if(isValidObject(GRD_OBJ_DATASET_COLOR_TABLE)) {
		var strFileName = GRD_STR_SAVE_UNIQUE_KEY + "_" + this.id + ".xml";
		fdb_fn_LocalDatasetCall(GRD_OBJ_DATASET_COLOR_TABLE,GRD_STR_TEMP_FOLDER,strFileName);
	}
}
///////////////////////////////////////////////////////////////////////////////////






/*********************************************************************
 * 기능 : 전체 check 또는 uncheck (공통)
 * Parameters :	objGrid				grid Component ID
 *				strCheckColID		Check Dataset Column
 *				nCell				Check Cell Index
 * Returns :
 * 예제 : grd_fn_SetGridHeadCheck(objGrid,"__CHK",0)
 *********************************************************************/
function grd_fn_SetGridHeadCheck(objGrid,strCheckColID,nCell)
{
	if(objGrid.Editable == true) {
		var strValue = decode(objGrid.GetCellProp("head",nCell,"text"),"0","1","0");
		objGrid.SetCellProp("head",nCell,"Text",strValue);
		grd_fn_SetGridCheck(objGrid,strCheckColID,strValue);
	}
}

/*********************************************************************
 * 기능 : 전체 check 또는 uncheck 시 데이타셋값 set(공통)
 * Parameters :	objGrid				grid Component ID
 *				strCheckColID		Check Dataset Column
 *				strCheckValue		Check Value ("1" : Check,"0" : UnCheck)
 * Returns :
 * 예제 : grd_fn_SetGridCheck(objGrid,"__CHK",0)
 *********************************************************************/
function grd_fn_SetGridCheck(objGrid,strCheckColID,strCheckValue)
{
	var objDataset = eval(objGrid.BindDataset);
	var nRowCount = objDataset.GetRowCount();

	// objDataset.fireevent = false;
	for(var i = 0; i < nRowCount; i++) {
		objDataset.SetColumn(i,strCheckColID,strCheckValue);
	}
	// objDataset.fireevent = true;
}

/*********************************************************************
 * 기능 : Grid Selected Head Clear All (공통)
 * Parameters : obj			Grid Component ID
 *				nStartCell	Start Column Index
 * Returns :
 * 예제 : grd_fn_ClearSortMark(obj,0)
 *********************************************************************/
function grd_fn_ClearSortMark(obj,nStartCell)
{
	if(nStartCell >= 0) {
		GRD_NUM_G_CNT = nStartCell;
	} else {
		GRD_NUM_G_CNT = 0;
	}
	var nColCnt = obj.GetCellCount("head");
	var sRepText;

	for(var i = GRD_NUM_G_CNT; i < nColCnt; i++) {
		sRepText = replace(obj.GetCellProp("head",i,"text"),CONST_ASC_MARK,"");
		sRepText = replace(sRepText,CONST_DESC_MARK,"");
		obj.SetCellProp("head",i,"text",sRepText);
	}
}

/*********************************************************************
 * 기능 : Grid Head Clear (공통)
 * Parameters : obj		Grid Component ID
 *				sCell	Start Cell Index
 *				eCell 	End Cell Index
 *				dRow	Head Depth
 * Returns :
 * 예제 : grd_fn_SetSubHeadClear(obj,sCell,eCell,dRow)
 *********************************************************************/
function grd_fn_SetSubHeadClear(obj,sCell,eCell,dRow)
{
	var nColCnt = obj.GetCellCount("head");
	var sRepText;
	var depth_row;
	var str_col;

	if(GRD_NUM_G_CNT > 0) {
		//sCell++;
		//eCell++;
		sCell += toNumber(GRD_NUM_G_CNT);
		eCell += toNumber(GRD_NUM_G_CNT);
	}

	for(var i = GRD_NUM_G_CNT; i < nColCnt; i++) {

		depth_row = obj.GetCellProp("head",i,"row");
		str_col = obj.GetCellProp("head",i,"col");

		if(str_col >= sCell && str_col < eCell) {

			if(dRow < depth_row) {
				sRepText = replace(obj.GetCellProp("head",i,"text"),CONST_ASC_MARK,"");
				sRepText = replace(sRepText,CONST_DESC_MARK,"");
				obj.SetCellProp("head",i,"text",sRepText);
			}
		}
	}
}

/*********************************************************************
 * 기능 : Grid Add Column (공통)
 * Parameters : obj				Grid Component ID
 *		 		hText			Add Column Head Text
 *				gWidth 			Add Column Head Width
 *				gDisplay		Add Column Body Display type
 *				gAlign			Add Column Body Align
 *				gOrderAttrib	추가 Attribute
 * Returns :
 * 예제 : grd_fn_SetColumnAdd(obj,hText,ColId,gWidth,gDisplay,gAlign)
 *********************************************************************/
function grd_fn_SetColumnAdd(objGrid,hText,ColId,gWidth,gDisplay,gAlign,gOrderAttrib)
{
	grd_fn_AddColumn(objGrid,hText,ColId,gWidth,gDisplay,"",gAlign,"","","","","",gOrderAttrib);
}

function grd_fn_AddColumn(objGrid,hText,ColId,gWidth,gDisplay,gEdit,gAlign,gColor,gBkColor,gBkColor2,gSuppress,gOrderAttrib)
{
	var tot_col_cnt = objGrid.GetColCount();
	var str_temp = objGrid.Contents;

	str_temp = replace(str_temp,'</columns>','<col width="'+gWidth+'"/></columns>');
	str_temp = replace(str_temp,'</head>','<cell col="'+tot_col_cnt+'" color="" display="text" font="돋움,9" text="'+hText+'"/></head>');
	str_temp = replace(str_temp,'</body>','<cell col="'+tot_col_cnt+'" colid="'+ColId+'" align="'+gAlign+'" color="'+gColor+'" bkcolor="'+gBkColor+'" bkcolor2="'+gBkColor2+'" display="'+gDisplay+'" edit="'+gEdit+'" suppress="'+gSuppress+'" '+gOrderAttrib+' limit="10"/></body>');

	objGrid.contents = str_temp;
}

function grd_fn_AddColumnFix(objGrid,hText,ColId,gWidth,gDisplay,gEdit,gAlign,gColor,gBkColor,gBkColor2,gSuppress,gOrderAttrib)
{
	var tot_col_cnt = objGrid.GetColCount();
	var str_temp = objGrid.Contents;

	str_temp = replace(str_temp,'</columns>','<col fix="true" width="'+gWidth+'"/></columns>');
	str_temp = replace(str_temp,'</head>','<cell col="'+tot_col_cnt+'" color="" display="text" font="돋움,9" text="'+hText+'"/></head>');
	str_temp = replace(str_temp,'</body>','<cell col="'+tot_col_cnt+'" colid="'+ColId+'" align="'+gAlign+'" color="'+gColor+'" bkcolor="'+gBkColor+'" bkcolor2="'+gBkColor2+'" display="'+gDisplay+'" edit="'+gEdit+'" suppress="'+gSuppress+'" '+gOrderAttrib+' limit="10"/></body>');

	objGrid.contents = str_temp;
}

/*********************************************************************
 * 기능 : Grid Add Column Contents(공통 - Contents  String 을 변경해서 리턴한다.)
 *        Looping 해서 Column을 추가하는것이라면 이 메소드를 사용한다.
 * Parameters : strContents		Grid Contents
 *				hText			Add Column Head Text
 *				ColId			Add Column ID
 *				gWidth 			Add Column Head Width
 *				gDisplay		Add Column Body Display type
 *				gAlign			Add Column Body Align
 *				gOrderAttrib	추가 Attribute
 * Returns :	String			Grid Contents
 * 예제 : grd_fn_SetColumnAddContents(obj,hText,ColId,gWidth,gDisplay,gAlign,gOrderAttrib)
 *********************************************************************/
function grd_fn_SetColumnAddContents(strContents,hText,ColId,gWidth,gDisplay,gAlign,gOrderAttrib)
{
	return grd_fn_AddColumnContents(strContents,hText,ColId,gWidth,gDisplay,"",gAlign,"","","","","",gOrderAttrib);
}

function grd_fn_AddColumnContents(strContents,hText,ColId,gWidth,gDisplay,gEdit,gAlign,gColor,gBkColor,gBkColor2,gSuppress,gOrderAttrib)
{
	var tot_col_cnt = length(split(strContents,"<col ","webstyle")) - 1;

	strContents = replace(strContents,'</columns>','<col width="'+gWidth+'"/>\n</columns>');
	strContents = replace(strContents,'</head>','<cell col="'+tot_col_cnt+'" color="" display="text" font="돋움,9" text="'+hText+'"/>\n</head>');
	strContents = replace(strContents,'</body>','<cell col="'+tot_col_cnt+'" colid="'+ColId+'" align="'+gAlign+'" color="'+gColor+'" bkcolor="'+gBkColor+'" bkcolor2="'+gBkColor2+'" display="'+gDisplay+'" edit="'+gEdit+'" suppress="'+gSuppress+'" '+gOrderAttrib+' limit="10"/>\n</body>');

	return strContents;
}

function grd_fn_AddColumnFixContents(strContents,hText,ColId,gWidth,gDisplay,gEdit,gAlign,gColor,gBkColor,gBkColor2,gSuppress,gOrderAttrib)
{
	var tot_col_cnt = length(split(strContents,"<col ","webstyle"));

	strContents = replace(strContents,'</columns>','<col fix="true" width="'+gWidth+'"/>\n</columns>');
	strContents = replace(strContents,'</head>','<cell col="'+tot_col_cnt+'" color="" display="text" font="돋움,9" text="'+hText+'"/>\n</head>');
	strContents = replace(strContents,'</body>','<cell col="'+tot_col_cnt+'" colid="'+ColId+'" align="'+gAlign+'" color="'+gColor+'" bkcolor="'+gBkColor+'" bkcolor2="'+gBkColor2+'" display="'+gDisplay+'" edit="'+gEdit+'" suppress="'+gSuppress+'" '+gOrderAttrib+' limit="10"/>\n</body>');

	return strContents;
}


// 2단 헤더의 상단 그룹
function grd_fn_AddColumnGroup(strContents,hText,colspan,objIdxDset)
{
	var addidx = objIdxDset.AddRow();
	objIdxDset.SetColumn(addidx,"COLID",hText);

	var tot_col_cnt = length(split(strContents,"<col ","webstyle")) - 1;
    strContents = replace(strContents,'</head>','<cell col="'+tot_col_cnt+'" colspan="'+colspan+'" align="center"  color="" display="text" font="돋움,9" text="'+hText+'"/>\n</head>');
    return strContents;
}

//2단 헤더의 하단 Detail
function grd_fn_AddColumnContentsDetail(strContents,hText,ColId,gWidth,gDisplay,gEdit,gAlign,gColor,gBkColor,gBkColor2,gSuppress,gOrderAttrib,objIdxDset)
{
	var addidx=objIdxDset.AddRow();
	objIdxDset.SetColumn(addidx,"COLID",ColId);

	var tot_col_cnt = length(split(strContents,"<col ","webstyle")) - 1;
	strContents = replace(strContents,'</columns>','<col width="'+gWidth+'"/>\n</columns>');
	strContents = replace(strContents,'</head>','<cell col="'+tot_col_cnt+'" color="" row="1"  display="text" font="돋움,9" text="'+hText+'"/>\n</head>');
	strContents = replace(strContents,'</body>','<cell col="'+tot_col_cnt+'" colid="'+ColId+'" align="'+gAlign+'" color="'+gColor+'" bkcolor="'+gBkColor+'" bkcolor2="'+gBkColor2+'" display="'+gDisplay+'" edit="'+gEdit+'" suppress="'+gSuppress+'" '+gOrderAttrib+' limit="40"/>\n</body>');

	return strContents;
}


// 2단 시 1단 헤더  rowspan 추가
function grd_fn_AddColumnRowspan(objGrid,hText,ColId,gWidth,gDisplay,gEdit,gAlign,gColor,gBkColor,gBkColor2,gSuppress,gOrderAttrib,objIdxDset)
{
	var addidx=objIdxDset.AddRow();
	objIdxDset.SetColumn(addidx,"COLID",ColId);

	var tot_col_cnt = objGrid.GetColCount();
	var str_temp = objGrid.Contents;

	str_temp = replace(str_temp,'</columns>','<col fix="false" width="'+gWidth+'"/></columns>');
	str_temp = replace(str_temp,'</head>','<cell col="'+tot_col_cnt+'" color="" rowspan="2" display="text" font="돋움,9" text="'+hText+'"/></head>');
	str_temp = replace(str_temp,'</body>','<cell col="'+tot_col_cnt+'" colid="'+ColId+'" align="'+gAlign+'" color="'+gColor+'" bkcolor="'+gBkColor+'" bkcolor2="'+gBkColor2+'" display="'+gDisplay+'" edit="'+gEdit+'" suppress="'+gSuppress+'" '+gOrderAttrib+' limit="40"/></body>');

	objGrid.contents = str_temp;
}

// 2단 시 1단 헤더  rowspan 추가
function grd_fn_AddColumnFixRowspan(objGrid,hText,ColId,gWidth,gDisplay,gEdit,gAlign,gColor,gBkColor,gBkColor2,gSuppress,gOrderAttrib,objIdxDset)
{
	var addidx=objIdxDset.AddRow();
	objIdxDset.SetColumn(addidx,"COLID",ColId);

	var tot_col_cnt = objGrid.GetColCount();
	var str_temp = objGrid.Contents;

	str_temp = replace(str_temp,'</columns>','<col fix="true" width="'+gWidth+'"/></columns>');
	str_temp = replace(str_temp,'</head>','<cell col="'+tot_col_cnt+'" color="" rowspan="2" display="text" font="돋움,9" text="'+hText+'"/></head>');
	str_temp = replace(str_temp,'</body>','<cell col="'+tot_col_cnt+'" colid="'+ColId+'" align="'+gAlign+'" color="'+gColor+'" bkcolor="'+gBkColor+'" bkcolor2="'+gBkColor2+'" display="'+gDisplay+'" edit="'+gEdit+'" suppress="'+gSuppress+'" '+gOrderAttrib+' limit="40"/></body>');

	objGrid.contents = str_temp;
}

/*********************************************************************
 * 기능 : Grid Insert Column (공통)
 * Parameters : obj				Grid Component ID
 *				nCell			Insert Column Head Index
 *				hText			Insert Column Head Text
 *				gWidth 			Insert Column Head Width
 *				gDisplay		Insert Column Body Display type
 *				gAlign			Insert Column Body Align
 *				gColor			Insert Column Body Color
 *				gBgColor		Insert Column Body BkColor
 *				gSuppress		Insert Column Body Suppress
 *				gOrderAttrib	추가 Attribute
 * Returns :
 * 예제 : grd_fn_SetColumnIns(objGrid,nCell,hText,ColId,gWidth,gDisplay,gAlign,gColor,gBgColor,gSuppress,gOrderAttrib)
 *********************************************************************/
function grd_fn_SetColumnIns(objGrid,nCell,hText,ColId,gWidth,gDisplay,gAlign,gColor,gBgColor,gSuppress,gOrderAttrib)
{
	if(! grd_fn_GetValidHead(objGrid,nCell)) return;

	var str_temp;
	var str_col = '<contents>\n<columns>\n';
	var str_head = '</columns>\n<head>\n';
	var str_body = '</head>\n<body>\n';
	var com_head = '<cell color="" display="text" font="돋움,9" ';
	var com_body = '<cell ';
	var tot_col_cnt = objGrid.GetColCount();
	var tot_head_cnt = objGrid.GetCellCount("head");
	var str_gap = tot_col_cnt - tot_head_cnt;
	var head_col;
	var head_cnt = 0;
	var cell_no = nCell;
	cell_no = toNumber(cell_no) + toNumber(str_gap);

	for(var i = 0; i < tot_col_cnt; i++) {

		if(i < cell_no) {
			str_col += '<col width="' + objGrid.GetColProp(i,"width") + '" Fix="' + objGrid.GetColProp(i,"Fix") + '"/>\n';

			head_col = objGrid.GetCellProp("head",head_cnt,"col");

			if(i==head_col) {
				str_head += com_head + 'col="' + i + '" ' + grd_fn_SetGridHead(objGrid,head_cnt);
				head_cnt++;
			}
			str_body += com_body + 'col="' + i + '" ' + grd_fn_SetGridBody(objGrid,i);

		} else if(i == cell_no) {
			str_col += '<col width="' + gWidth + '" Fix="' + objGrid.GetColProp(i,"Fix") + '"/>\n';
			str_col += '<col width="' + objGrid.GetColProp(i,"width") + '" Fix="' + objGrid.GetColProp(i,"Fix") + '"/>\n';
			str_head += com_head + 'col="' + i + '" text="' + hText + '"/>\n';
			str_body += com_body + 'col="' + i + '" bkcolor="' + gBgColor + '" bkcolor2="' + gBgColor + '" ';
			str_body += 'colid="' + ColId + '" display="' + gDisplay + '" color="' + gColor + '" ';
			str_body += 'align="' + gAlign + '" suppress="' + gSuppress + '" ';
			str_body += gOrderAttrib + '/>\n';

			str_head += com_head + 'col="' + (i+1) + '" ' + grd_fn_SetGridHead(objGrid,i-str_gap);
			str_body += com_body + 'col="' + (i+1) + '" ' + grd_fn_SetGridBody(objGrid,i);

			head_cnt++;

		} else {

			str_col += '<col width="' + objGrid.GetColProp(i,"width") + '" Fix="' + objGrid.GetColProp(i,"Fix") + '"/>\n';
			str_head += com_head + 'col="' + (i+1) + '" ' + grd_fn_SetGridHead(objGrid,i-str_gap);
			str_body += com_body + 'col="' + (i+1) + '" ' + grd_fn_SetGridBody(objGrid,i);

			head_cnt++;
		}
	}

	str_temp = str_col + str_head + str_body + '</body>\n</contents>';

	objGrid.contents = str_temp;
}

/*********************************************************************
 * 기능 : Grid Insert Column (공통)
 * Parameters : obj				Grid Component ID
 *				nCell			Insert Column Head Index
 *				hText			Insert Column Head Text
 *				gWidth 			Insert Column Head Width
 *				gDisplay		Insert Column Body Display type
 *				gAlign			Insert Column Body Align
 *				gOrderAttrib	추가 Attribute
 * Returns :
 * 예제 : grd_fn_SetColumnInsByEdit(objGrid,nCell,hText,ColId,gWidth,gDisplay,gEdit,gAlign,gColor,gBgColor,gSuppress,gOrderAttrib)
 *********************************************************************/
function grd_fn_SetColumnInsByEdit(objGrid,nCell,hText,ColId,gWidth,gDisplay,gEdit,gAlign,gColor,gBgColor,gSuppress,gOrderAttrib)
{
	if(! grd_fn_GetValidHead(objGrid,nCell)) return;

	var str_temp;
	var str_col = '<contents>\n<columns>\n';
	var str_head = '</columns>\n<head>\n';
	var str_body = '</head>\n<body>\n';
	var com_head = '<cell color="" display="text" font="돋움,9" ';
	var com_body = '<cell ';
	var tot_col_cnt = objGrid.GetColCount();
	var tot_head_cnt = objGrid.GetCellCount("head");
	var str_gap = tot_col_cnt - tot_head_cnt;
	var head_col;
	var head_cnt = 0;
	var cell_no = nCell;
	cell_no = toNumber(cell_no) + toNumber(str_gap);

	for(var i = 0; i < tot_col_cnt; i++) {

		if(i < cell_no) {
			str_col += '<col width="' + objGrid.GetColProp(i,"width") + '" Fix="' + objGrid.GetColProp(i,"Fix") + '"/>\n';

			head_col = objGrid.GetCellProp("head",head_cnt,"col");
			if(i==head_col) {
				str_head += com_head + 'col="' + i + '" ' + grd_fn_SetGridHead(objGrid,head_cnt);
				head_cnt++;
			}
			str_body += com_body + 'col="' + i + '" ' + grd_fn_SetGridBody(objGrid,i);

		} else if(i == cell_no) {
			str_col += '<col width="' + gWidth + '" Fix="' + objGrid.GetColProp(i,"Fix") + '"/>\n';
			str_col += '<col width="' + objGrid.GetColProp(i,"width") + '" Fix="' + objGrid.GetColProp(i,"Fix") + '"/>\n';
			str_head += com_head + 'col="' + i + '" text="' + hText + '"/>\n';
			str_body += com_body + 'col="' + i + '" bkcolor="' + gBgColor + '" bkcolor2="' + gBgColor + '" ';
			str_body += 'colid="' + ColId + '" display="' + gDisplay + '"'+ '" edit="' + gEdit + '"  color="' + gColor + '"';
			str_body += 'align="' + gAlign + '" suppress="' + gSuppress + '" ';
			str_body += gOrderAttrib + '/>\n';

			str_head += com_head + 'col="' + (i+1) + '" ' + grd_fn_SetGridHead(objGrid,i-str_gap);
			str_body += com_body + 'col="' + (i+1) + '" ' + grd_fn_SetGridBody(objGrid,i);

			head_cnt++;
		} else {
			str_col += '<col width="' + objGrid.GetColProp(i,"width") + '" Fix="' + objGrid.GetColProp(i,"Fix") + '"/>\n';
			str_head += com_head + 'col="' + (i+1) + '" ' + grd_fn_SetGridHead(objGrid,i-str_gap);
			str_body += com_body + 'col="' + (i+1) + '" ' + grd_fn_SetGridBody(objGrid,i);

			head_cnt++;
		}
	}

	str_temp = str_col + str_head + str_body + '</body>\n</contents>';

	objGrid.contents = str_temp;
}

/*********************************************************************
 * 기능 : Grid Delete Column (공통)
 * Parameters : obj				Grid Component ID
 *				nCell			Delete Column Index
 * Returns :
 * 예제 : grd_fn_SetColumnDel(obj,nCell)
 *********************************************************************/
function grd_fn_SetColumnDel(objGrid,nCell)
{
	objGrid.contents = grd_fn_SetColumnDelContents(objGrid,nCell);
}

function grd_fn_SetColumnDelContents(objGrid,nCell)
{
	if(! grd_fn_GetValidHead(objGrid,nCell)) return;

	var str_temp;
	var tot_Dcol_cnt = objGrid.GetColCount();
	var tot_Dhead_cnt = objGrid.GetCellCount("head");

	var str_col = '<contents>\n<columns>\n';
	var str_head = '</columns>\n<head>\n';
	var str_body = '</head>\n<body>\n';
	var com_head = '<cell color="" display="text" font="돋움,9" ';
	var com_body = '<cell ';
	var str_gap = tot_Dcol_cnt - tot_Dhead_cnt;

	var head_col;
	var head_cnt = 0;

	var cell_Dno = toNumber(nCell);

	for(var i = 0; i < tot_Dcol_cnt; i++) {

		if(i < cell_Dno) {
			str_col += '<col width="' + objGrid.GetColProp(i,"width") + '" Fix="' + objGrid.GetColProp(i,"Fix") + '"/>\n';

			head_col = objGrid.GetCellProp("head",head_cnt,"col");
			if(i==head_col) {
				str_head += com_head + 'col="' + i + '" ' + grd_fn_SetGridHead(objGrid,head_cnt);
				head_cnt++;
			}
			str_body += com_body + 'col="' + i + '" ' + grd_fn_SetGridBody(objGrid,i);

		} else if(i > cell_Dno) {
			str_col += '<col width="' + objGrid.GetColProp(i,"width") + '" Fix="' + objGrid.GetColProp(i,"Fix") + '"/>\n';
			str_head += com_head + 'col="' + (i-1) + '" ' + grd_fn_SetGridHead(objGrid,i-str_gap);
			str_body += com_body + 'col="' + (i-1) + '" ' + grd_fn_SetGridBody(objGrid,i);

			head_cnt++;
		}
	}

	str_temp = str_col + str_head + str_body + '</body>\n</contents>';

	return str_temp;
}

/*********************************************************************
 * 기능 : Grid Head Set (공통)
 * Parameters : obj				Head Column Index
 *				idx				Add Column Head set
 * Returns :
 * 예제 : grd_fn_SetGridHead(obj,idx)
 *********************************************************************/
function grd_fn_SetGridHead(gObj,idx)
{
	var rtn_val = "";

	if(gObj.GetCellProp("head",idx,"colspan") > 1) {
		rtn_val += 'colspan="' + gObj.GetCellProp("head",idx,"colspan") + '" ';
	}

	rtn_val += 'text="' + gObj.GetCellProp("head",idx,"text") + '"/>\n';

	return rtn_val;
}

/*********************************************************************
 * 기능 : Grid Body Set (공통)
 * Parameters : obj				Grid Component ID
 *				idx				Add Column Body set
 * Returns :	String			Grid Body Contents
 * 예제 : grd_fn_SetGridbody(obj,idx)
 *********************************************************************/
function grd_fn_SetGridBody(gObj,idx)
{
	var rtn_val;
	var strExpr;
	var strColor    = gObj.GetCellProp("body",idx,"color");
	var strBkColor  = gObj.GetCellProp("body",idx,"bkcolor");
	var strBkColor2 = gObj.GetCellProp("body",idx,"bkcolor2");
	var strSuppress = gObj.GetCellProp("body",idx,"suppress");

	rtn_val += 'color=\''    + replace(strColor,'\"','&quot;')    + '\' ';
	rtn_val += 'bkcolor=\''  + replace(strBkColor,'\"','&quot;')  + '\' ';
	rtn_val += 'bkcolor2=\'' + replace(strBkColor2,'\"','&quot;') + '\' ';
	rtn_val += 'suppress=\'' + replace(strSuppress,'\"','&quot;') + '\' ';
	rtn_val += 'align=\''    + replace(gObj.GetCellProp("body",idx,"align"),  '\"','&quot;') + '\' ';
	rtn_val += 'edit=\''     + replace(gObj.GetCellProp("body",idx,"edit"),   '\"','&quot;') + '\' ';
	rtn_val += 'display=\''  + replace(gObj.GetCellProp("body",idx,"display"),'\"','&quot;') + '\' ';

	if(length(gObj.GetCellProp("body",idx,"expr")) > 1) {
		strExpr = gObj.GetCellProp("body",idx,"expr");
		strExpr = replace(strExpr,'\"','&quot;');

		rtn_val += 'expr=\'' + strExpr + '\' ';
	}

	rtn_val += 'colid="' + gObj.GetCellProp("body",idx,"colid") + '" />\n';

	return rtn_val;
}

/*********************************************************************
 * 기능 : Grid Merge,Double Head Check (공통)
 * Parameters : objGrid			Grid Component ID
 *				nCell			Cell Index
 * Returns :	boolean  		true / false
 * 예제 : grd_fn_GetValidHead(obj,nCell)
 *********************************************************************/
function grd_fn_GetValidHead(objGrid,nCell)
{
	var rtn_val = true;
	var col_cnt = objGrid.GetCellCount("head");

	if(col_cnt <= nCell) {
		alert("Column Index가  존재하지 않습니다.!");
		rtn_val = false;
		return rtn_val;
	}

	for(var i = 0; i < col_cnt; i++) {

		if(objGrid.GetCellProp("head",i,"row") > 0) {
			rtn_val = false;
			//alert("Head Row가 Single이 아닙니다.!");
			trace("Head Row가 Single이 아닙니다.!");
			return rtn_val;
			break;
		}

	}

	if(nCell < 0) {
		rtn_val = false;
		return rtn_val;
	}

	if(objGrid.GetCellProp("head",nCell,"colspan") > 1) {
		alert("Merge된 Column 입니다.");
		rtn_val = false;
	}

	return rtn_val;
}

/*********************************************************************
 * 기능 : Grid grd_fn_DisplayHeadInd (공통)
 * Parameters : objGrid				Grid Component ID
 * Returns :
 * 예제 : grd_fn_DisplayHeadInd(obj)
 *********************************************************************/
function grd_fn_DisplayHeadInd(objGrid)
{
	var nCell = 0;
	var hText = "";
	var ColId = "chk_row";
	var gWidth = 40;
	var gDisplay = "image";
	var gAlign = "center";

	if(! grd_fn_GetValidHead(objGrid,nCell)) return;

	var str_temp;
	var str_col = '<contents>\n<columns>\n';
	var str_head = '</columns>\n<head>\n';
	var str_body = '</head>\n<body>\n';
	var com_head = '<cell color="white" display="text" font="돋움,9" ';
	var com_body = '<cell ';
	var tot_col_cnt = objGrid.GetColCount();
	var tot_head_cnt = objGrid.GetCellCount("head");
	var str_gap = tot_col_cnt - tot_head_cnt;
	var head_col;
	var head_cnt = 0;
	var cell_no = nCell;

	cell_no = toNumber(cell_no) + toNumber(str_gap);

	for(var i = 0; i < tot_col_cnt; i++) {

		if(i < cell_no) {
			str_col += '<col width="' + objGrid.GetColProp(i,"width") + '" Fix="' + objGrid.GetColProp(i,"Fix") + '"/>\n';

			head_col = objGrid.GetCellProp("head",head_cnt,"col");
			if(i==head_col) {
				str_head += com_head + 'col="' + i + '" ' + grd_fn_SetGridHead(objGrid,head_cnt);
				head_cnt++;
			}
			str_body += com_body + 'col="' + i + '" ' + grd_fn_SetGridBody(objGrid,i);

		} else if(i == cell_no) {
			str_col += '<col width="' + gWidth + '" Fix="' + objGrid.GetColProp(i,"Fix") + '"/>\n';
			str_col += '<col width="' + objGrid.GetColProp(i,"width") + '" Fix="' + objGrid.GetColProp(i,"Fix") + '"/>\n';
			str_head += com_head + 'col="' + i + '" text="' + hText + '" color="white"/>\n';
			str_body += com_body + 'col="' + i + '" BkImageId="expr:iif(currow=' + objGrid.BindDataset + '.row,\'arrow22_img\',\'\')"';
			str_body += ' colid="' + ColId + '" display="' + gDisplay + '"';
			str_body += ' align="' + gAlign + '"/>\n';

			str_head += com_head + 'col="' + (i+1) + '" ' + grd_fn_SetGridHead(objGrid,i-str_gap);
			str_body += com_body + 'col="' + (i+1) + '" ' + grd_fn_SetGridBody(objGrid,i);

			head_cnt++;
		} else {
			str_col += '<col width="' + objGrid.GetColProp(i,"width") + '" Fix="' + objGrid.GetColProp(i,"Fix") + '"/>\n';
			str_head += com_head + 'col="' + (i+1) + '" ' + grd_fn_SetGridHead(objGrid,i-str_gap);
			str_body += com_body + 'col="' + (i+1) + '" ' + grd_fn_SetGridBody(objGrid,i);

			head_cnt++;
		}
	}

	str_temp = str_col + str_head + str_body + '</body>\n</contents>';

	objGrid.contents = str_temp;
}

/*********************************************************************
 * 기능 : Grid Cell 의 존재 유무 체크
 * Parameters : grdObj    : Source Grid
 *				strColID  : 존재여부 확인 Column ID
 * Returns :	boolean
 * 예제 : grd_fn_IsExistCell(objGrid,"Item")
 *********************************************************************/
function grd_fn_IsExistCell(objGrid,strCellID)
{
	var isExist = false;
	for(var nCell = 0; nCell < objGrid.GetColCount(); nCell++) {
		if( toUpper(objGrid.GetCellProp("head",nCell,"text")) == toUpper(strCellID) ) {
			isExist = true;
			nCell = objGrid.GetColCount();
		}
	}

	return isExist;
}

/*********************************************************************
 * 기능 : Grid의 Cell ColumnID로 Grid Cell Index를 찾는 Method
 * Parameters : objGrid      : Source Grid
 *				strColumnID  : Column ID
 * Returns :	number
 * 예제 : grd_fn_GetCellColumnFindIndex(objGrid,"CATEGORYID")
 *********************************************************************/
function grd_fn_GetCellColumnFindIndex(objGrid,strColumnID)
{
	return grd_fn_GetFindCellIndex(objGrid,"body","colid",strColumnID);
}

/*********************************************************************
 * 기능 : Grid의 Cell Text로 Grid Cell Index를 찾는 Method
 * Parameters : objGrid      : Source Grid
 *				strCellText  : Cell Text
 * Returns :	number
 * 예제 : grd_fn_GetCellTextFindIndex(objGrid,"Item")
 *********************************************************************/
function grd_fn_GetCellTextFindIndex(objGrid,strCellText)
{
	return grd_fn_GetFindCellIndex(objGrid,"head","text",strCellText);
}

/*********************************************************************
 * 기능 : Grid Cell Index를 찾는 Method
 * Parameters : objGrid       : Source Grid
 *				strBand       : 찾고자하는 Grid Cell의 영역.
 *				strFindGubun  : 찾고자하는 Grid의 Property
 *				strFindText   : 찾고자하는 Text 값
 * Returns :	number
 * 예제 : grd_fn_GetFindCellIndex(objGrid,"head","text","Item")
 *********************************************************************/
function grd_fn_GetFindCellIndex(objGrid,strBand,strFindGubun,strFindText)
{
	var nFindCell = -1;
	for(var nCell = 0; nCell < objGrid.GetCellCount(strBand); nCell++) {
		if( toUpper(objGrid.GetCellProp(strBand,nCell,strFindGubun)) == toUpper(strFindText) ) {
			nFindCell = nCell;
			nCell = objGrid.GetCellCount();
		}
	}

	return iif(nFindCell >= objGrid.GetCellCount(),-1,nFindCell);
}

function grd_fn_Find(objGrid,strValue,nStartRow,nStartCol,strDirection)
{
	var objDataset = eval(objGrid.BindDataset);

	var arrFindColumn = array();
	var nRowCount = objDataset.GetRowCount();
	var nColCount = objGrid.GetCellCount("body");
	for(var nCol = 0; nCol < nColCount; nCol++) {
		arrFindColumn[nCol] = objGrid.GetCellProp("body",nCol,"colid");
	}

	// 역방향 검색(Up)
	if(strDirection == "U") {
		
		if(GRD_STR_FIND_VALUE != strValue || (GRD_STR_FIND_VALUE == strValue && GRD_STR_FIND_DIRECTION != strDirection)){
			GRD_STR_FIND_VALUE = strValue;
			GRD_STR_FIND_DIRECTION = strDirection;
			
		} else {
			--nStartCol;
		}
		
		if((nStartCol-1) < -1) {
			--nStartRow;
			nStartCol = (nColCount-1);
		}
		
		if(nStartRow < 0) {
			nStartRow = 0;
			nStartCol = 0;
		}
		for(var nRow = nStartRow; nRow >= 0; nRow--) {
			for(var nCol = nStartCol; nCol >= 0; nCol--) {
				
				if(indexOf(objGrid.GetCellText("body",nRow,nCol),strValue) >= 0) {
					objDataset.row = nRow;
					objDataset.ClearSelect();
					objDataset.SelectRow(nRow);
					objGrid.SetCellPos(nCol);
					objGrid.SetBlinkColor(nRow,nCol,"red","blue",1000);
					return;
				}
			}
			nStartCol = (nColCount-1);
		}

	// 정방향 검색(Down : default)
	} else {
		if(GRD_STR_FIND_VALUE != strValue || (GRD_STR_FIND_VALUE == strValue && GRD_STR_FIND_DIRECTION != strDirection)){
			GRD_STR_FIND_VALUE = strValue;
			GRD_STR_FIND_DIRECTION = strDirection;
		
		} else {
			++nStartCol;
		}
		
		if((nStartCol+1) > nColCount) {
			++nStartRow;
			nStartCol = 0;
		}

		if(nStartRow >= nRowCount) {
			nStartRow = nRowCount-1;
			nStartCol = nColCount-1;
		}
		
		for(var nRow = nStartRow; nRow < nRowCount; nRow++) {
			for(var nCol = nStartCol; nCol < nColCount; nCol++) {
				if(	indexOf(objGrid.GetCellText("body",nRow,nCol),strValue) >= 0) {
					objDataset.row = nRow;
					objDataset.ClearSelect();
					objDataset.SelectRow(nRow);
					objGrid.SetCellPos(nCol);
					objGrid.SetBlinkColor(nRow,nCol,"red","blue",1000);
					return;
				}
			}
			nStartCol = 0;
		}

	}
}

/*********************************************************************
 * 기능 : 그리드의 선택영역을 Clipboard로 Copy 한다.
 * Parameters : objGrid       : Area Select 된 Grid
 * Returns :
 * 예제 : grd_fn_ClipboardCopy(objGrid);
 *********************************************************************/
function grd_fn_ClipboardCopy(objGrid)
{
	var orgDataset = eval(objGrid.BindDataset);

	var strColID;
	var strValue;

	var strClipboard = "";

	var nAreaStartRow;
	var nAreaEndRow;
	var nAreaStartCol;
	var nAreaEndCol;

	if(objGrid.AreaSelect == true && objGrid.ColSelect == true) {

		nAreaStartRow = objGrid.GetAreaStartRow();
		nAreaEndRow   = objGrid.GetAreaEndRow();
		nAreaStartCol = objGrid.GetAreaStartCol();
		nAreaEndCol   = objGrid.GetAreaEndCol();

	} else {

		nAreaStartRow = objGrid.CurrentRow;
		nAreaEndRow   = objGrid.CurrentRow;
		nAreaStartCol = objGrid.CurrentCell;
		nAreaEndCol   = objGrid.CurrentCell+1;
	}

// trace(nAreaStartRow + " ~ " + nAreaEndRow + " : " + nAreaStartCol + " ~ " + nAreaEndCol);
	for(var nRow = nAreaStartRow; nRow <= nAreaEndRow; nRow++) {

		for(var nCell = nAreaStartCol; nCell < nAreaEndCol; nCell++) {

			strColID = objGrid.GetCellProp("body",nCell,"colid");
			strValue = orgDataset.GetColumn(nRow,strColID);
			strClipboard = strClipboard + strValue + GRD_STR_COL_SEPARATOR;

		}

		strClipboard = substr(strClipboard,0,length(strClipboard)-1);
		strClipboard = strClipboard + GRD_STR_LINE_SEPARATOR;
	}

	strClipboard = substr(strClipboard,0,length(strClipboard)-1);

	ClearClipboard();
	SetClipBoard("CF_UNICODETEXT",strClipboard);

	return;
}

/*********************************************************************
 * 기능 : Clipboard에 Copy된 내용을 그리드의 선택된 영역에 Paste 한다.
 * Parameters : objGrid       : Area Select 된 Grid
 * Returns :
 * 예제 : grd_fn_ClipboardPaste(objGrid);
 *********************************************************************/
function grd_fn_ClipboardPaste(objGrid)
{
	var orgDataset = eval(objGrid.BindDataset);

	var nSearchRow = 0;
	var nSearchCol = 0;
	var strColID;
	var strValue;
	var strBgColor;

	// 숫자 자릿수 구분은 comma 를 사용하기 때문에 호환을 위해서 comma 를 제거한다.
	var strClipboardData = replace(GetClipBoard("CF_UNICODETEXT"),",","");

	if(GRD_STR_COL_SEPARATOR != " ") {
		// 유럽의 숫자 자릿수 구분은 space 를 사용하기 때문에 호환을 위해서 space 를 제거한다.
		strClipboardData = replace(strClipboardData," ","");
	}

	var arrClipboardRecord = split(strClipboardData,GRD_STR_LINE_SEPARATOR,"webstyle");
	var arrClipboardColunm;

	var nAreaStartRow;
	var nAreaEndRow;
	var nAreaStartCol;
	var nAreaEndCol;

	if(objGrid.AreaSelect == true && objGrid.ColSelect == true) {

		nAreaStartRow = objGrid.GetAreaStartRow();
		nAreaEndRow   = objGrid.GetAreaEndRow();
		nAreaStartCol = objGrid.GetAreaStartCol();
		nAreaEndCol   = objGrid.GetAreaEndCol();

	} else {

		nAreaStartRow = objGrid.CurrentRow;
		nAreaEndRow   = objGrid.CurrentRow;
		nAreaStartCol = objGrid.CurrentCell;
		nAreaEndCol   = objGrid.CurrentCell+1;
	}

// trace(nAreaStartRow + " ~ " + nAreaEndRow + " : " + nAreaStartCol + " ~ " + nAreaEndCol);
	// orgDataset.fireevent = false;
	for(var nRow = nAreaStartRow; nRow < (nAreaStartRow + length(arrClipboardRecord)); nRow++) {

		if(length(trim(arrClipboardRecord[nSearchRow])) > 0) {

			arrClipboardColunm = split(arrClipboardRecord[nSearchRow],GRD_STR_COL_SEPARATOR,"webstyle");

			nSearchCol = 0;
			var nAreaCell = nAreaStartCol + length(arrClipboardColunm);
			for(var nCell = nAreaStartCol; nCell < nAreaCell && nCell < objGrid.GetCellCount("body"); nCell++) {

				if(toLower(objGrid.GetCellProp("body",nCell,"edit")) <> "none") {
					strColID = objGrid.GetCellProp("body",nCell,"colid");
					strValue = trim(arrClipboardColunm[nSearchCol]);
					orgDataset.SetColumn(nRow,strColID,strValue);
				}

				nSearchCol++;

			}
		}

		nSearchRow++;
	}
	// orgDataset.fireevent = true;

	return;
}

/*********************************************************************
 * 기능 : 그리드의 선택된 영역을 Reset 한다.
 * Parameters : objGrid     : Area Select 된 Grid
 * Returns :
 * 예제 : grd_fn_CellReset(objGrid);
 *********************************************************************/
function grd_fn_CellReset(objGrid)
{
	var objDataset = eval(objGrid.BindDataset);

	var strColID;

	var nAreaStartRow;
	var nAreaEndRow;
	var nAreaStartCol;
	var nAreaEndCol;

	if(objGrid.AreaSelect == true) {

		nAreaStartRow = objGrid.GetAreaStartRow();
		nAreaEndRow   = objGrid.GetAreaEndRow();
		nAreaStartCol = objGrid.GetAreaStartCol();
		nAreaEndCol   = objGrid.GetAreaEndCol();

	} else {

		nAreaStartRow = objGrid.CurrentRow;
		nAreaEndRow   = objGrid.CurrentRow;
		nAreaStartCol = objGrid.CurrentCell;
		nAreaEndCol   = objGrid.CurrentCell+1;
	}

	objDataset.fireevent = false;
	for(var nRow = nAreaStartRow; nRow <= nAreaEndRow; nRow++) {

		for(var nCell = nAreaStartCol; nCell < nAreaEndCol; nCell++) {

			strColID = objGrid.GetCellProp("body",nCell,"colid");
			objDataset.SetColumn(nRow,strColID,objDataset.GetOrgColumn(nRow,strColID));
		}
	}
	objDataset.fireevent = true;
}

/*********************************************************************
 * 기능 : 그리드의 선택된 영역을 Delete 한다.
 * Parameters : objGrid     : Area Select 된 Grid
 * Returns :
 * 예제 : grd_fn_CellDelete(objGrid);
 *********************************************************************/
function grd_fn_CellDelete(objGrid)
{
	var objDataset = eval(objGrid.BindDataset);

	var strColID;

	var nAreaStartRow;
	var nAreaEndRow;
	var nAreaStartCol;
	var nAreaEndCol;

	if(objGrid.AreaSelect == true) {

		nAreaStartRow = objGrid.GetAreaStartRow();
		nAreaEndRow   = objGrid.GetAreaEndRow();
		nAreaStartCol = objGrid.GetAreaStartCol();
		nAreaEndCol   = objGrid.GetAreaEndCol();

	} else {

		nAreaStartRow = objGrid.CurrentRow;
		nAreaEndRow   = objGrid.CurrentRow;
		nAreaStartCol = objGrid.CurrentCell;
		nAreaEndCol   = objGrid.CurrentCell+1;
	}

	// objDataset.fireevent = false;
	for(var nRow = nAreaStartRow; nRow <= nAreaEndRow; nRow++) {

		for(var nCell = nAreaStartCol; nCell < nAreaEndCol; nCell++) {

			if(toLower(objGrid.GetCellProp("body",nCell,"edit")) <> "none") {
				strColID = objGrid.GetCellProp("body",nCell,"colid");
				objDataset.SetColumn(nRow,strColID,"");
			}
		}
	}
	// objDataset.fireevent = true;
}

/*********************************************************************
 * 기능 : 그리드 Band('head','body','sum')의 지정영역 배경색을 변경한다.
 * Parameters : objGrid
 *				strBand
 *				nStartCell
 *				nEndCell
 *				bkColor
 * Returns :
 * 예제 : grd_fn_SetCellBkColor(objGrid,"head",5,10,"red");
 *********************************************************************/
function grd_fn_SetCellBkColor(objGrid,strBand,nStartCell,nEndCell,bkColor)
{
	for(var nCell = nStartCell; nCell < nEndCell; nCell++) {
		objGrid.SetCellProp(strBand,nCell,"bkcolor",bkColor);
	}
}

/*********************************************************************
 * 기능 : 그리드 Excel Export 시에 Confidential 문장 출력
 * Parameters : strGridContents
 * Returns :	String		String Grid Contentes
 * 예제 : grd_fn_SetConfidential(strGridContents);
 *********************************************************************/
function grd_fn_SetConfidential(strGridContents)
{
	return grd_fn_SetExcelHead(strGridContents,"Confidential","red","","left");
}

/*********************************************************************
 * 기능 : 그리드 Excel Export 시에 Excel Head 출력
 * Parameters : strGridContents
 *				strTitle	: "그리드 타이틀"
 *				strColor	: "#ffffff" or "red"
 *				strFont		: "돋움,9,Bold"
 *				strAlign	: "center"
 *              strBkColor	: "#ffffff" or "red"
 * Returns :	String		String Grid Contentes
 * 예제 : grd_fn_SetExcelHead(strGridContents,strTitle,strColor,strFont,strAlign);
 *********************************************************************/
function grd_fn_SetExcelHead(strGridContents,strTitle,strColor,strFont,strAlign,strBkColor)
{
	strGridContents = replace(strGridContents,'row="0"','');

	var nStartPos = indexOf(strGridContents,"<head>");
	var nEndPos = indexOf(strGridContents,"</head>");

	var strPrevContents = substr(strGridContents,0,nStartPos);
	var strHeadContents = substr(strGridContents,(nStartPos+length("<head>")),(nEndPos-(nStartPos+length("<head>"))) );
	var strNextContents = substr(strGridContents,(nEndPos+length("</head>")),length(strGridContents));

	var arrContents = split(strHeadContents,"\n","webstyle");

	var nRow;
	var nMaxColumn = 0;
	var nCurrMaxColumn = 0;
	var strPrevRowText;
	var strCurrRowText;

	var strNewGridContents;
	var strRowIndex;
	var strColIndex;

	strHeadContents = "";

	for(var nIdx = 0; nIdx < length(arrContents); nIdx++) {

		nStartPos = indexOf(arrContents[nIdx],"row=");

		if(nStartPos > -1) {

			nEndPos = indexOf(arrContents[nIdx]," ",nStartPos);
			strCurrRowText = substr(arrContents[nIdx],nStartPos,(nEndPos-nStartPos));

			strRowIndex = replace(strCurrRowText,'row=','');
			nRow = toNumber(replace(strRowIndex,'"','')) + 1;

			arrContents[nIdx] = replace(arrContents[nIdx],strCurrRowText,'row="'+nRow+'"');

		} else {

			arrContents[nIdx] = replace(arrContents[nIdx],'/>',' row="1"/>');

		}

		if(length(trim(arrContents[nIdx])) > 0) {

			strHeadContents += "\n" + arrContents[nIdx];

			nStartPos = indexOf(arrContents[nIdx],'col=');
			nEndPos   = indexOf(arrContents[nIdx],' ',nStartPos);
			strColIndex = substr(arrContents[nIdx],nStartPos,(nEndPos-nStartPos));
			strColIndex = replace(strColIndex,'col=','');
			nCurrMaxColumn = toNumber(replace(strColIndex,'"',''));

			if(nMaxColumn < nCurrMaxColumn) {
				nMaxColumn = nCurrMaxColumn;
			}
		}
	}

	if(length(strBkColor) <= 0) strBkColor = "white";
	var strHeadStart = '<head>\n<cell align="'+strAlign+'" color="'+strColor+'" font="'+strFont+'" bkcolor="'+strBkColor+'" col="0" colspan="'+(nMaxColumn+1)+'" display="text" text="'+strTitle+'"/>';
	strHeadContents  = strHeadStart + strHeadContents + "</head>";

	strNewGridContents = strPrevContents + strHeadContents + strNextContents;

	return strNewGridContents;
}

/*********************************************************************
 * 기능 : Grid Header Click => Sorting 처리
 * 인수 : Gridobj		Grid Object
         nCell			Column Index(Click Head index)
 *********************************************************************/
function grd_fn_SetGridSort(Gridobj,nCell,strSortColumns)
{
	var objBDs = eval(Gridobj.BindDataset);

	GRD_NUM_M_CNT = Gridobj.GetCellProp("head",0,"colspan");
 	GRD_NUM_G_CNT = 0;

 	if(Gridobj.GetSubCellCount("head",0) > 0) GRD_NUM_G_CNT = Gridobj.GetSubCellCount("head",0) - 1;

	if(getKeyState("shift")) {

		if(GRD_BOL_CREATE_CHECK_DATASET == false) {

			Create("Dataset","ds_GridSort","");
			ds_GridSort.AddColumn("Col","String",255);
			ds_GridSort.AddColumn("Sort","String",255);

			GRD_BOL_CREATE_CHECK_DATASET = true;
		}

		if(ds_GridSort.RowCount() < 1) grd_fn_ClearSortMark(Gridobj);
		grd_fn_SetGridShiftSort(Gridobj,objBDs,nCell);

	} else {
		if(GRD_BOL_CREATE_CHECK_DATASET) ds_GridSort.DeleteAll();
		grd_fn_GridSort(Gridobj,nCell,strSortColumns);
	}
}

/*********************************************************************
 * 기능 : Grid Header Click => Sorting 처리
 * 인수 : Gridobj		Grid Object
         nCell			Column Index(Click Head index)
 * 예제 : grd_fn_GridSort(Gridobj,Dataset,nCell);
 *********************************************************************/
function grd_fn_GridSort(Gridobj,nCell,strSortColumns)
{
	var dsObj = eval(Gridobj.BindDataset);

	var nheadText,sflag;

	var sort_cell;
	var sort_col;
	var sort_span;
 	var sort_columns="";

	//---------------------------------------------------------
	//  해당하는 셀의 타이틀의 소트마크를 추가 또는 변경한다.
	//---------------------------------------------------------
	if(right(Gridobj.GetCellProp("head",nCell,"text"),1) == CONST_ASC_MARK) {

		if(strSortColumns == null && length(strSortColumns) == 0) {

			if(Gridobj.GetCellProp("head",nCell,"colspan") > 1) {
				sort_col = Gridobj.GetCellProp("head",nCell,"col");
				sort_col -= GRD_NUM_G_CNT;
				sort_span = Gridobj.GetCellProp("head",nCell,"colspan");
				for(i=sort_col; i<toNumber(sort_col)+toNumber(sort_span); i++) {
					sort_columns += Gridobj.GetCellProp("Body",i,"colid") + ",";
				}
			} else {
				sort_col = Gridobj.GetCellProp("head",nCell,"col");
				sort_col -= GRD_NUM_G_CNT;
				sort_columns = Gridobj.GetCellProp("Body",sort_col,"colid");
			}

		} else {
			sort_columns = strSortColumns;
		}

		nheadText = Gridobj.GetCellProp("head",nCell,"text");
		nheadText = replace(nheadText,CONST_ASC_MARK,"");
		nheadText = nheadText + CONST_DESC_MARK;

		dsObj.sort(sort_columns,false);

	} else if(right(Gridobj.GetCellProp("head",nCell,"text"),1) == CONST_DESC_MARK) {

		if(strSortColumns == null && length(strSortColumns) == 0) {

			var body_cnt = Gridobj.GetCellCount("Body");
			var sort_idx = 0;
			for(i=0; i<body_cnt; i++) {
				if(length(Gridobj.GetCellProp("Body",i,"colid")) > 1) {
					sort_columns += Gridobj.GetCellProp("Body",i,"colid") + ",";
					sort_idx++;
				}
				if(sort_idx == 5) break;
			}

		} else {
			sort_columns = strSortColumns;
		}

		nheadText = Gridobj.GetCellProp("head",nCell,"text");
		nheadText = replace(nheadText,CONST_DESC_MARK,"");

		dsObj.sort(sort_columns,true);

	} else {

		if(nCell == 0 && GRD_NUM_G_CNT > 0) return;

		if(strSortColumns == null && length(strSortColumns) == 0) {

			if(Gridobj.GetCellProp("head",nCell,"colspan") > 1) {
				sort_col = Gridobj.GetCellProp("head",nCell,"col");
				sort_col -= GRD_NUM_G_CNT;
				sort_span = Gridobj.GetCellProp("head",nCell,"colspan");
				for(i=sort_col; i<toNumber(sort_col)+toNumber(sort_span); i++) {
					sort_columns += Gridobj.GetCellProp("Body",i,"colid") + ",";
				}

			} else {
				sort_col = Gridobj.GetCellProp("head",nCell,"col");

				sort_col -= GRD_NUM_G_CNT;
				sort_columns = Gridobj.GetCellProp("Body",sort_col,"colid");
			}

		} else {
			sort_columns = strSortColumns;
		}

		nheadText = Gridobj.GetCellProp("head",nCell,"text");
		nheadText = nheadText + CONST_ASC_MARK;

		dsObj.sort(sort_columns,true);
	}

	Gridobj.SetCellProp("head",nCell,"text",nheadText);

	//---------------------------------------------------------
	//  해당하는 셀 이외의 해더 타이틀의 소트마크를 제거한다.
	//---------------------------------------------------------
	var nColCnt = Gridobj.GetCellCount("head");
	var sRepText;

	for(var i = GRD_NUM_G_CNT; i < nColCnt; i++) {

		if(nCell <> i) {
			sRepText = replace(Gridobj.GetCellProp("head",i,"text"),CONST_ASC_MARK,"");
			sRepText = replace(sRepText,CONST_DESC_MARK,"");
			Gridobj.SetCellProp("head",i,"text",sRepText);
		}
	}
}

/*********************************************************************
 * 기능 : Shift Key + Grid Header Click => Sorting 처리
 * 인수 : Gridobj		Grid Object
         nCell			Column Index(Click Head index)
 * 예제 : grd_fn_SetGridShiftSort(obj,nCell);
 *********************************************************************/
function grd_fn_SetGridShiftSort(Gridobj,nCell)
{
	var dsObj = eval(Gridobj.BindDataset);

	var nheadText,sflag;

	var sort_cell;
	var sort_col;
	var sort_span;
 	var sort_columns="";
 	var depth_row;
 	var endCell;

	if(right(Gridobj.GetCellProp("head",nCell,"text"),1) == CONST_ASC_MARK)	{

		if(Gridobj.GetCellProp("head",nCell,"colspan") > 1) {
			sort_col = Gridobj.GetCellProp("head",nCell,"col");
			sort_col -= GRD_NUM_G_CNT;
			sort_span = Gridobj.GetCellProp("head",nCell,"colspan");
			depth_row = Gridobj.GetCellProp("head",nCell,"row");

			for(i=sort_col; i<toNumber(sort_col)+toNumber(sort_span); i++) {
				sort_columns += Gridobj.GetCellProp("Body",i,"colid") + ",";
			}
			endCell = toNumber(sort_col)+toNumber(sort_span);
			grd_fn_SetSubHeadClear(Gridobj,sort_col,endCell,depth_row);

		} else {
			sort_col = Gridobj.GetCellProp("head",nCell,"col");
			sort_col -= GRD_NUM_G_CNT;
			sort_columns = Gridobj.GetCellProp("Body",sort_col,"colid");
		}

		nheadText = Gridobj.GetCellProp("head",nCell,"text");
		nheadText = replace(nheadText,CONST_ASC_MARK,"");
		nheadText = nheadText + CONST_DESC_MARK;
		sflag = CONST_DESC_MARK;

	} else if(right(Gridobj.GetCellProp("head",nCell,"text"),1) == CONST_DESC_MARK) {

		if(Gridobj.GetCellProp("head",nCell,"colspan") > 1) {
			sort_col = Gridobj.GetCellProp("head",nCell,"col");
			sort_col -= GRD_NUM_G_CNT;
			sort_span = Gridobj.GetCellProp("head",nCell,"colspan");
			depth_row = Gridobj.GetCellProp("head",nCell,"row");

			for(i=sort_col; i<toNumber(sort_col)+toNumber(sort_span); i++) {
				sort_columns += Gridobj.GetCellProp("Body",i,"colid") + ",";
			}

			endCell = toNumber(sort_col)+toNumber(sort_span);
			grd_fn_SetSubHeadClear(Gridobj,sort_col,endCell,depth_row);

		} else {
			sort_col = Gridobj.GetCellProp("head",nCell,"col");
			sort_col -= GRD_NUM_G_CNT;
			sort_columns = Gridobj.GetCellProp("Body",sort_col,"colid");
		}

		nheadText = Gridobj.GetCellProp("head",nCell,"text");
		nheadText = replace(nheadText,CONST_DESC_MARK,"");
		sflag = "";

	} else {

		if(nCell == 0 && GRD_NUM_G_CNT > 0) return;

		if(Gridobj.GetCellProp("head",nCell,"colspan") > 1) {
			sort_col = Gridobj.GetCellProp("head",nCell,"col");
			sort_col -= GRD_NUM_G_CNT;
			sort_span = Gridobj.GetCellProp("head",nCell,"colspan");
			depth_row = Gridobj.GetCellProp("head",nCell,"row");

			for(i=sort_col; i<toNumber(sort_col)+toNumber(sort_span); i++) {
				sort_columns += Gridobj.GetCellProp("Body",i,"colid") + ",";
			}
			endCell = toNumber(sort_col)+toNumber(sort_span);
			grd_fn_SetSubHeadClear(Gridobj,sort_col,endCell,depth_row);

		} else {
			sort_col = Gridobj.GetCellProp("head",nCell,"col");
			sort_col -= GRD_NUM_G_CNT;
			sort_columns = Gridobj.GetCellProp("Body",sort_col,"colid");
		}

		nheadText = Gridobj.GetCellProp("head",nCell,"text");
		nheadText = nheadText + CONST_ASC_MARK;
		sflag = CONST_ASC_MARK;
	}

	var arr_cols = split(sort_columns,",");

	for(i=0; i<length(arr_cols); i++) {

		var str_exist = ds_GridSort.FindRow("Col",arr_cols[i]);

		if(str_exist < 0) {
			ds_GridSort.AddRow();

			ds_GridSort.SetColumn(ds_GridSort.currow,"Col",arr_cols[i]);
			ds_GridSort.SetColumn(ds_GridSort.currow,"Sort","A");

			if(sflag == "") ds_GridSort.DeleteRow(str_exist);

		} else {

			ds_GridSort.DeleteRow(str_exist);

			if(sflag != "") {
				ds_GridSort.AddRow();
				ds_GridSort.SetColumn(ds_GridSort.currow,"Col",arr_cols[i]);
				if(sflag == CONST_DESC_MARK) ds_GridSort.SetColumn(ds_GridSort.currow,"Sort","D");
				else ds_GridSort.SetColumn(ds_GridSort.currow,"Sort","A");
			}
		}
	}

	var str_sort = "";
	for(i=0; i<ds_GridSort.RowCount(); i++) {
		str_sort += ds_GridSort.GetColumn(i,"Col") + ":" + ds_GridSort.GetColumn(i,"Sort") + ",";
	}

	if(ds_GridSort.RowCount() < 1) {
		var body_cnt = Gridobj.GetCellCount("Body");
		var sort_idx = 0;
		for(i=0; i<body_cnt; i++) {
			if(length(Gridobj.GetCellProp("Body",i,"colid")) > 1) {
				str_sort += Gridobj.GetCellProp("Body",i,"colid") + ",";
				sort_idx++;
			}
			if(sort_idx == 2) break;
		}
	}

	dsObj.sort(str_sort,true);

	Gridobj.SetCellProp("head",nCell,"text",nheadText);
}

/*********************************************************************
 * 기능 : 그리드 Sorting(클릭한 셀에대한 소팅처리 후, 그리드 해드에 Sort Mark 세팅)
 * Parameters : objGrid	: 그리드
 *				nCell	: 소팅할 셀
 *				strSortColumn	: Group 소팅할경우 소팅 컬럼정보
 *								  "SORT1:D,SELECT1NAME:A,SORT2:D,SELECT2NAME:D,SORT3:D,SELECT3NAME:A,SORT4:A"
 *				strOrgSortColumn	: 최초 상태로 만들기 위한 소팅 컬럼정보
 * Returns :
 * 예제 : grd_fn_Sort(objGrid,2);
 *        grd_fn_Sort(objGrid,2,strSortColumn,strOrgSortColumn);
 *********************************************************************/
function grd_fn_Sort(objGrid,nCell,strSortColumn,strOrgSortColumn)
{
	var objDataset = eval(objGrid.BindDataset);

	if(objDataset.GetRowCount() == 0) return;

	if(length(strOrgSortColumn) == 0) strOrgSortColumn = "__ORG_SORT_KEY";

	if(ds_fn_IsExistColumn(objDataset,strOrgSortColumn) == false) {

		objDataset.SetUpdate(false);
		objDataset.FireEvent = false;

		objDataset.AddColumn(strOrgSortColumn,"STRING");
		for(var nRow = 0; nRow < objDataset.GetRowCountNF(); nRow++) {
			objDataset.SetColumnNF(nRow,strOrgSortColumn,lpad(nRow,'0',10));
		}

		objDataset.FireEvent = true;
		objDataset.SetUpdate(true);
	}

	var strSelectKey = objDataset.GetColumn(objDataset.row,strOrgSortColumn);

	if(length(strSortColumn) == 0) {

		var nCol = grd_fn_GetHeadToBodyCell(objGrid,nCell,"body");
		strSortColumn = objGrid.GetCellProp("body",nCol,"colid");
		// trace(" : nCol = " + nCol + " : " + nCell + " : strSortColumn = " + strSortColumn);
	}

	var nheadText = "";
	
	if(nCell > -1) {
		nheadText = objGrid.GetCellProp("head",nCell,"text");
	}

	objDataset.FireEvent = false;	//이벤트 임시 무시

	if(right(nheadText,1) == CONST_ASC_MARK) {

		nheadText = replace(nheadText,CONST_ASC_MARK,CONST_DESC_MARK);
		objDataset.sort(strSortColumn,false,false,true);

	} else if(right(nheadText,1) == CONST_DESC_MARK) {

		nheadText = replace(nheadText,CONST_DESC_MARK,"");
		objDataset.sort(strOrgSortColumn,true,false,true);

	} else {

		nheadText = nheadText + CONST_ASC_MARK;
		objDataset.sort(strSortColumn,true,false,true);
	}
	
	if(nCell > -1) {
		grd_fn_ClearSortMark(objGrid,0);
		objGrid.SetCellProp("head",nCell,"text",nheadText);
	}

	objDataset.row = objDataset.FindRow(strOrgSortColumn,strSelectKey);
	
	objDataset.FireEvent = true;	//이벤트 복귀
}

/*********************************************************************
 * 기능 : head cell index 로 body cell index를 찾아온다.
 * Parameters : objGrid		Grid Component
 *				nCell		Head Cell Index
 *				strBand		body 또는 summary
 * Returns :	number		head cell 매핑되는 body cell
 * 예제 : grd_fn_GetHeadToBodyCell(objGrid,5,"body")
 *********************************************************************/
function grd_fn_GetHeadToBodyCell(objGrid,nCell,strBand)
{
	if(length(strBand) == 0) strBand = "body";

	var nBodyCell = objGrid.GetCellProp("head",nCell,"col");

	for(var nCellIdx = 0; nCellIdx < objGrid.GetCellCount(strBand); nCellIdx++) {
		if(nBodyCell == objGrid.GetCellProp(strBand,nCellIdx,"col")) {
			nBodyCell = nCellIdx;
			nCellIdx = objGrid.GetCellCount(strBand);
		}
	}

	return nBodyCell;
}

/*********************************************************************
 * 기능 : 그리드 셀 고정
 * Parameters : objGrid	Grid Component
 *				nColIdx	Col Index
 *				bFix		셀 고정 여부
 * Returns :
 * 예제 : grd_fn_GridHeadFixed(objGrid,5,true)
 *********************************************************************/
function grd_fn_GridHeadFixed(objGrid,nColIdx,bFix)
{
	if(objGrid.GetCellProp("head",nColIdx,"row") > 0) return;

	var strFixColColor = "lightgrey";

	if(bFix) {

		if(objGrid.UserData == "") {
			for(var nCol = 0; nCol <= nColIdx; nCol++) {
				objGrid.UserData = nCol;
				nCol = nColIdx;
			}
		}

	} else {

		nColIdx = toNumber(objGrid.UserData);
		strFixColColor = "";

	}

   	objGrid.Redraw = false;

	var nOrgColIdx = nColIdx;
	var nTotalColspan = 0;
	for(var i = 0; i <= nColIdx; i++) {
		var nColspan = objGrid.GetCellProp("head",i,"colspan");
		if(nColspan > 1) {
			nTotalColspan += nColspan - 1;
		}
	}

	if(nTotalColspan > 0) {
		nColIdx += nTotalColspan;
	}

// trace(nTotalColspan + " : " + nOrgColIdx + " : " + nColIdx + " : " + nReleaseColIdx);
	for(var nCol = 0; nCol <= nColIdx; nCol++) {
		objGrid.SetColProp(nCol,"Fix",true);
		objGrid.SetCellProp("head",nCol,"bkcolor",strFixColColor);
	}

	for(var nCol = (nColIdx+1); nCol < objGrid.GetCellCount("head"); nCol++) {
		if(nCol < objGrid.GetColCount()) {
			objGrid.SetColProp(nCol,"Fix",false);
		}
	}

	for(var nCol = (nOrgColIdx+1); nCol < objGrid.GetCellCount("head"); nCol++) {
		objGrid.SetCellProp("head",nCol,"bkcolor","");
	}

	objGrid.HScrollPos = 0;
	objGrid.Redraw = true;
}

/*********************************************************************
 * 기능 : 그리드의 클릭한 셀의 ExpandImage 를 Display 한다.
 * Parameters : objGrid		Grid Component
 *				nCell		Cell Index
 * Returns :	boolean
 * 예제 : grd_fn_ExpandShow(objGrid,5)
 *********************************************************************/
function grd_fn_ExpandShow(objGrid,nCell)
{
	for(var i = 0; i < objGrid.GetCellCount("body"); i++) {
		objGrid.SetCellProp("body",i,"expandshow",0);
	}

	if(toLower(objGrid.GetCellProp("body",nCell,"edit")) <> "none") {
		if(length(objGrid.GetCellProp("body",nCell,"ExpandImage")) > 0) {
			objGrid.GetCellProp("body",nCell,"ExpandImage","");
			objGrid.SetCellProp("body",nCell,"expandshow","expr:iif(rowpos==row,true,false)");
			return true;
		}
	}

	return false;
}

/*********************************************************************
 * 기능 : 그리드의 클릭한 셀의 ExpandImage와 Calendar를 Display 한다.
 * Parameters : objGrid	Grid 	Component
 *				nRow			Row Index
 *				nCell			Cell Index
 * Returns :
 * 예제 : grd_fn_ExpandCalendar(objGrid,3,5)
 *********************************************************************/
function grd_fn_ExpandCalendar(objGrid,nRow,nCell)
{
	if(grd_fn_ExpandShow(objGrid,nCell)) {
		if(length(objGrid.OnExpandUp) == 0) {
			objGrid.OnExpandUp = "grd_fn_Grid_Event_OnExpandUp";
		}
	}
}

/*********************************************************************
 * 기능 : 그리드의 Calendar를 Display 한다.
 * Parameters : objGrid			Grid Component
 *				nRow			Row Index
 *				nCell			Cell Index
 *				strVal			Cell의 현재값
 *				nPivotIndex		CrossTabGrid에서 Event가 발생한 Cell의 Pivot Index
 * Returns :
 * 예제 : grd_fn_Grid_Event_OnExpandUp(objGrid,3,5)
 *********************************************************************/
function grd_fn_Grid_Event_OnExpandUp(objGrid,nRow,nCell,strVal,nPivotIndex)
{
	grd_fn_PopupDivCalendar(objGrid,nRow,nCell,"");
}

/*********************************************************************
 * 기능 : 그리드의 선택된 sel의 값을 세로축으로 복사한다.
 * Parameters : objGrid     : Grid Object
 * Returns :
 * 예제 : grd_fn_SetVDittoValue(objGrid);
 *********************************************************************/
function grd_fn_SetVDittoValue(objGrid,strCheckColumn)
{
	var objDataset = eval(objGrid.BindDataset);

	var nSelectRow  = objGrid.CurrentRow;
	var strColID    = objGrid.GetCellProp("body",objGrid.CurrentCell,"colid");
	var nEndRow     = objDataset.GetRowCount();
	var sourceValue = objDataset.GetColumn(nSelectRow,strColID);

	// objDataset.fireevent = false;
	if(toLower(objGrid.GetCellProp("body",objGrid.CurrentCell,"edit")) <> "none") {
		if(length(strCheckColumn) > 0) {
			for(var nRow = 0; nRow < nEndRow; nRow++) {
					if(objDataset.GetColumn(nRow,strCheckColumn) == 1) {
						objDataset.SetColumn(nRow,strColID,sourceValue);
					}
			}
		} else {
			for(var nRow = (nSelectRow+1); nRow < nEndRow; nRow++) {
				objDataset.SetColumn(nRow,strColID,sourceValue);
			}
		}
	}
	// objDataset.fireevent = true;
}

/*********************************************************************
 * 기능 : 그리드의 선택된 sel의 값을 가로축으로 복사한다.
 * Parameters : objGrid     : Grid Object
 * Returns :
 * 예제 : grd_fn_SetHDittoValue(objGrid);
 *********************************************************************/
function grd_fn_SetHDittoValue(objGrid)
{
	var objDataset = eval(objGrid.BindDataset);

	var nSelectRow  = objGrid.CurrentRow;
	var strColID    = objGrid.GetCellProp("body",objGrid.CurrentCell,"colid");;
	var nEndCell    = objGrid.GetCellCount("body");
	var sourceValue = objDataset.GetColumn(nSelectRow,strColID);

	// objDataset.fireevent = false;
	for(var nCell = (objGrid.CurrentCell+1); nCell < nEndCell; nCell++) {
		if(toLower(objGrid.GetCellProp("body",nCell,"edit")) <> "none") {
			strColID = objGrid.GetCellProp("body",nCell,"colid");
			objDataset.SetColumn(nSelectRow,strColID,sourceValue);
		}
	}
	// objDataset.fireevent = true;
}


/*********************************************************************
 * 기능 : 그리드의 Display Format을 Dataset으로 생성하여 리턴한다.
 * Parameters : objGrid			Grid Component
 * Returns : Dataset			ds_GridDisplayFormat
 * 예제 : grd_fn_GetGridFormat(objGrid)
 *********************************************************************/
function grd_fn_GetGridFormat(objGrid)
{
	if(length(GRD_ARR_STR_DISPLAY_FORMAT_DATASET) == 0) {
		Create("Dataset","ds_GridDisplayFormat");
		GRD_ARR_STR_DISPLAY_FORMAT_DATASET = ds_GridDisplayFormat.id;
	}

	ds_GridDisplayFormat.Clear();
	ds_GridDisplayFormat.AddColumn("BAND","STRING");
	ds_GridDisplayFormat.AddColumn("COL_INDEX","STRING");
	ds_GridDisplayFormat.AddColumn("COL_TEXT","STRING");
	ds_GridDisplayFormat.AddColumn("COL_DISP_INDEX","STRING");
	ds_GridDisplayFormat.AddColumn("COL_WIDTH","STRING");

	var nAddRow;
	for(var i = 0; i < objGrid.GetColCount(); i++) {
		nAddRow = ds_GridDisplayFormat.AddRow();
		ds_GridDisplayFormat.SetColumn(nAddRow,"BAND","colinfo");
		ds_GridDisplayFormat.SetColumn(nAddRow,"COL_INDEX",i);
		ds_GridDisplayFormat.SetColumn(nAddRow,"COL_WIDTH",objGrid.GetColProp(i,"width"));
	}

	for(var i = 0; i < objGrid.GetCellCount("head"); i++) {
		nAddRow = ds_GridDisplayFormat.AddRow();
		ds_GridDisplayFormat.SetColumn(nAddRow,"BAND","head");
		ds_GridDisplayFormat.SetColumn(nAddRow,"COL_INDEX",i);
		ds_GridDisplayFormat.SetColumn(nAddRow,"COL_TEXT",objGrid.GetCellText("head",0,i));
		ds_GridDisplayFormat.SetColumn(nAddRow,"COL_DISP_INDEX",objGrid.GetCellProp("head",i,"col"));
		// ds_GridDisplayFormat.SetColumn(nAddRow,"COL_WIDTH",objGrid.GetCellProp("head",i,"width"));
	}

	for(var i = 0; i < objGrid.GetCellCount("body"); i++) {
		nAddRow = ds_GridDisplayFormat.AddRow();
		ds_GridDisplayFormat.SetColumn(nAddRow,"BAND","body");
		ds_GridDisplayFormat.SetColumn(nAddRow,"COL_INDEX",i);
		ds_GridDisplayFormat.SetColumn(nAddRow,"COL_TEXT","");
		ds_GridDisplayFormat.SetColumn(nAddRow,"COL_DISP_INDEX",objGrid.GetCellProp("body",i,"col"));
		// ds_GridDisplayFormat.SetColumn(nAddRow,"COL_WIDTH",objGrid.GetCellProp("body",i,"width"));
	}

	for(var i = 0; i < objGrid.GetCellCount("summary"); i++) {
		nAddRow = ds_GridDisplayFormat.AddRow();
		ds_GridDisplayFormat.SetColumn(nAddRow,"BAND","summary");
		ds_GridDisplayFormat.SetColumn(nAddRow,"COL_INDEX",i);
		ds_GridDisplayFormat.SetColumn(nAddRow,"COL_TEXT","");
		ds_GridDisplayFormat.SetColumn(nAddRow,"COL_DISP_INDEX",objGrid.GetCellProp("summary",i,"col"));
		// ds_GridDisplayFormat.SetColumn(nAddRow,"COL_WIDTH",objGrid.GetCellProp("summary",i,"width"));
	}

	return ds_GridDisplayFormat;
}

/*********************************************************************
 * 기능 : 그리드의 Display Format을 저장 한다.
 * Parameters : strGridID		- Grid Component ID
 *              objHeadMenu		- Grid Head Menu Dataset
 * Returns :
 * 예제 : grd_fn_GridFormatSave(strGridID,objHeadMenu)
 *********************************************************************/
function grd_fn_GridFormatSave(strGridID,objHeadMenu)
{
	var objGrid = eval(strGridID);
	var strGridPrefix = GRD_STR_SAVE_UNIQUE_KEY;
	var strFileName = strGridPrefix + "_" + strGridID + ".xml";

	var nIndex = grd_fn_GetGridIndex(objGrid,GRD_ARR_STR_FORMAT_GRID_ID);
	if(nIndex < 0) return;
	var objDataset = eval("ds_"+replace(GRD_ARR_STR_FORMAT_GRID_ID[nIndex],".","_")+"_DisplayFormat");

	if(objDataset.GetRowCount() < 1) {

		objDataset.Clear();
		objDataset.AddColumn("VERSION","STRING");
		objDataset.AddColumn("ORG_GRID_CONTENTS","STRING");
		objDataset.AddColumn("CUR_GRID_CONTENTS","STRING");
		objDataset.AddColumn("HEAD_MENU_CONTENTS","STRING");

		objDataset.AddRow();
		objDataset.SetColumn(0,"VERSION",GRD_STR_VERSION);
		objDataset.SetColumn(0,"ORG_GRID_CONTENTS",objGrid.Contents);
	}

	// regexprfilter 에 문제가 있음..
	// objGrid.GetCurContents()하면 regexprfilter값이 중복해서 세팅됨...
	// regexprfilter="[A-Z]"  --> regexprfilter="[A-Z][A-Z]" 이렇게 됨...
	// 임시방편으로 모든 셀의 regexprfilter 값을 초기값으로 세팅함...
	var strCurContents = objGrid.GetCurContents();
	var nBodyIndex = indexOf(strCurContents,"<body>");
	var nFindIndex;
	var strOrgRegExprFilter;
	var strRegExprFilter;
	var nCellCount = objGrid.GetCellCount("body");
	for(var i = 0; i < nCellCount; i++) {
		strRegExprFilter = objGrid.GetcellProp("body",i,"regexprfilter");
		if(length(strRegExprFilter) > 0) {
			strOrgRegExprFilter = 'regexprfilter="'+strRegExprFilter+'"';
			strRegExprFilter = 'regexprfilter="'+strRegExprFilter+strRegExprFilter+'"';
			strCurContents = replace(strCurContents,strRegExprFilter,strOrgRegExprFilter);
			// nFindIndex = indexOf(strCurContents,'<cell col="'+i+'"',nBodyIndex);
			// nFindIndex = indexOf(strCurContents,'regexprfilter=',nFindIndex);
			// trace(substr(strCurContents,nFindIndex,length(strRegExprFilter)));
		}
	}

	objDataset.SetColumn(0,"CUR_GRID_CONTENTS",strCurContents);
	objDataset.SetColumn(0,"HEAD_MENU_CONTENTS",objHeadMenu.SaveXML());

	// objDataset.SetColumn(0,"CUR_GRID_CONTENTS",objGrid.GetCurContents());

	fdb_fn_LocalDatasetExport(objDataset,GRD_STR_TEMP_FOLDER,strFileName);
	return;

/*
	var objFormatDataset = grd_fn_GetGridFormat(objGrid);
	fdb_fn_LocalDatasetExport(objFormatDataset,GRD_STR_TEMP_FOLDER,strFileName);
*/
}

/*********************************************************************
 * 기능 : 그리드의 Display Format을 Load해 그리드 Format을 변경 한다.
 * Parameters : strGridID		- Grid Component ID
 *              objHeadMenu		- Grid Head Menu Dataset
 * Returns :
 * 예제 : grd_fn_GridFormatLoad(strGridID,objHeadMenu)
 *********************************************************************/
function grd_fn_GridFormatLoad(strGridID,objHeadMenu)
{
	var objGrid = eval(strGridID);
	var strGridPrefix = GRD_STR_SAVE_UNIQUE_KEY;
	var strFileName = strGridPrefix + "_" + strGridID + ".xml";

	var nIndex = grd_fn_GetGridIndex(objGrid,GRD_ARR_STR_FORMAT_GRID_ID);
	
	if(nIndex < 0) {

		nIndex = length(GRD_ARR_STR_FORMAT_GRID_ID);
		GRD_ARR_STR_FORMAT_GRID_ID[nIndex] = strGridID;

		Create("Dataset","ds_"+replace(GRD_ARR_STR_FORMAT_GRID_ID[nIndex],".","_")+"_DisplayFormat");
	}

	var objDataset = eval("ds_"+replace(GRD_ARR_STR_FORMAT_GRID_ID[nIndex],".","_")+"_DisplayFormat");


	fdb_fn_LocalDatasetCall(objDataset,GRD_STR_TEMP_FOLDER,strFileName);

	if(objDataset.GetRowCount() > 0) {

		var strVersion      = objDataset.GetColumn(0,"VERSION");
		var strLastContents = objDataset.GetColumn(0,"CUR_GRID_CONTENTS");
		var strOrgContents  = objDataset.GetColumn(0,"ORG_GRID_CONTENTS");

		if(length(strLastContents) > 0 && objGrid.Contents == strOrgContents && strVersion == GRD_STR_VERSION) {
			objGrid.Contents = strLastContents;
			objHeadMenu.LoadXML(objDataset.GetColumn(0,"HEAD_MENU_CONTENTS"));
			grd_fn_ClearSortMark(objGrid);

		} else {

			objDataset.ClearData();
			grd_fn_GridFormatDelete(strGridID);
		}

	} else {
		grd_fn_GridFormatSave(strGridID,objHeadMenu);
	}

	return;

/*
	if(length(GRD_ARR_STR_DISPLAY_FORMAT_DATASET) == 0) {
		Create("Dataset","ds_GridDisplayFormat");
		GRD_ARR_STR_DISPLAY_FORMAT_DATASET = ds_GridDisplayFormat.id;
	}

	var nCurrRowCnt = grd_fn_GetGridFormat(objGrid).GetRowCount();

	fdb_fn_LocalDatasetCall(ds_GridDisplayFormat,GRD_STR_TEMP_FOLDER,strFileName);

	if(nCurrRowCnt != ds_GridDisplayFormat.GetRowCount()) return;

	var nLstColRow  = ds_GridDisplayFormat.FindRow("BAND","head");
	var nLstHeadRow = ds_GridDisplayFormat.FindRow("BAND","body");
	var nLstBodyRow = ds_GridDisplayFormat.FindRow("BAND","summary");
	var nLstSumRow  = ds_GridDisplayFormat.GetRowCount();
	nLstBodyRow = iif(nLstBodyRow < 0,nLstSumRow,nLstBodyRow);

	objGrid.Redraw = false;
	for(var i = nLstColRow; i < nLstHeadRow; i++) {
		objGrid.SetCellProp("head",toNumber(ds_GridDisplayFormat.GetColumn(i,"COL_INDEX")),"col",toNumber(ds_GridDisplayFormat.GetColumn(i,"COL_DISP_INDEX")));
	}

	for(var i = nLstHeadRow; i < nLstBodyRow; i++) {
		objGrid.SetCellProp("body",toNumber(ds_GridDisplayFormat.GetColumn(i,"COL_INDEX")),"col",toNumber(ds_GridDisplayFormat.GetColumn(i,"COL_DISP_INDEX")));
	}

	for(var i = nLstBodyRow; i < nLstSumRow; i++) {
		objGrid.SetCellProp("summary",toNumber(ds_GridDisplayFormat.GetColumn(i,"COL_INDEX")),"col",toNumber(ds_GridDisplayFormat.GetColumn(i,"COL_DISP_INDEX")));
	}

	for(var i = 0; i < nLstColRow; i++) {
		objGrid.SetColProp(i,"width",toNumber(ds_GridDisplayFormat.GetColumn(i,"COL_WIDTH")));
	}
	objGrid.Redraw = true;
*/
}

/*********************************************************************
 * 기능 : 저장된 그리드의 Display Format을 초기화 한다.
 * Parameters : objGrid			Grid Component
 * Returns :
 * 예제 : grd_fn_GridFormatInit(objGrid)
 *********************************************************************/
function grd_fn_GridFormatInit(objGrid)
{
	var nIndex = grd_fn_GetGridIndex(objGrid,GRD_ARR_STR_FORMAT_GRID_ID);
	var objDataset = eval("ds_"+replace(GRD_ARR_STR_FORMAT_GRID_ID[nIndex],".","_")+"_DisplayFormat");

	if(objDataset.GetRowCount() > 0) {
		objGrid.Contents = objDataset.GetColumn(0,"ORG_GRID_CONTENTS");
		objGrid.HScrollPos = 0;
	}

	objGrid.SetFormat("Default");
}

/*********************************************************************
 * 기능 : 저장된 그리드의 Display Format을 삭제 한다.
 * Parameters : strGridID			Grid Component ID
 * Returns :
 * 예제 : grd_fn_GridFormatDelete(strGridID)
 *********************************************************************/
function grd_fn_GridFormatDelete(strGridID)
{
	var strGridPrefix = GRD_STR_SAVE_UNIQUE_KEY;
	var strPath = GRD_STR_TEMP_FOLDER + "\\" + strGridPrefix + "_" + strGridID + ".xml";
	fdb_fn_FileDelete(strPath);
}

/*********************************************************************
 * 기능 : 그리드 Band 의 최대 rowspan 을 구한다.
 * Parameters : obj	 	:	Grid Component.
 *              strBand	:	얻고자 하는 Cell의 영역.
 *							'Head'/'Body'/'Summ'('Summary')를 지정합니다.
 * Returns : number
 * 예제 : grd_fn_GetMaxRowSpan(obj,strBand);
 *********************************************************************/
function grd_fn_GetMaxRowSpan(obj,strBand)
{
	var nRowspan = 1;
	for(var i = 0; i <  obj.GetCellCount(strBand); i++) {
		if(nRowspan < toNumber(obj.GetCellProp(strBand,i,"rowspan"))) {
			nRowspan = toNumber(obj.GetCellProp(strBand,i,"rowspan"));
		}
	}
	return nRowspan;
}

function grd_fn_GetOrgToRealCell(objGrid,nCell)
{
	var nFindCell = nCell;
	var strColID  = objGrid.GetCellProp("body",nCell,"colid");
	var strCurContents = objGrid.GetCurContents();
	var strBody = substr(strCurContents,indexOf(strCurContents,"<body>")+length("<body>"),indexOf(strCurContents,"</body>"));
	var arrBody = split(strBody,"/>","webstyle");
	for(var i = 0; i < length(arrBody); i++) {
		if(indexOf(arrBody[i],'"'+strColID+'"') > -1) {
			nFindCell = i;
			i = length(arrBody);
		}
	}

	return nFindCell;
}

/*********************************************************************
 * 기능 : Array에 담겨있는 Grid의 인덱스를 리턴
 * 범위 : (private)
 * 인수 : obj			- Grid 또는 Dataset
 *        arrGridList	- Grid가 담겨있는 Array
 * Returns : Number
 * 예제 : grd_fn_GetGridIndex(obj,GRD_ARR_STR_FORMAT_GRID_ID)
 ********************************************************************/
function grd_fn_GetGridIndex(obj,arrGridList)
{
	var nRtnIdx = -1;

	if(toLower(obj.GetType()) == "grid") {		
		/*
		var arrTemp = Split(Trim(obj.UserData),",");
		
		for(var i = 0; i < arrTemp.length; i++) {
			if(IndexOf(arrTemp[i],"GRID_IDX") > -1) {
				nRtnIdx = ToNumber(Trim(Replace(arrTemp[i],"GRID_IDX=")));
				break;
			}
		}
		*/

		for(var i = 0; i < length(arrGridList); i++) {
			if(obj == eval(arrGridList[i])) {
				nRtnIdx = i;
				i = length(arrGridList);
			}
		}
	} else if(toLower(obj.GetType()) == "dataset") {
		for(var i = 0; i < length(arrGridList); i++) {
			if(obj.id == eval(arrGridList[i]).BindDataset) {
				nRtnIdx = i;
				i = length(arrGridList);
			}
		}
	}

	return nRtnIdx;
}






//////////////////////////////////////////////////////////////////////////////////////////////
// 그리드 활성화 이벤트 처리
//    - 화면의 여러개의 그리드 중 활성화된 그리드 표시 및 스크립트 처리에 필요한 그리드/데이터셋 리턴
// 그리드 이벤트중 OnFocus 이벤트에 grd_fn_OnFocus
//                 OnKillFocus 이벤트에 grd_fn_OnKillFocus 세팅
//////////////////////////////////////////////////////////////////////////////////////////////
var GRD_OBJ_FOCUS_GRID;
function grd_fn_GetFocusGrid()
{
	return GRD_OBJ_FOCUS_GRID;
}

function grd_fn_GetFocusDataset()
{
	return eval(GRD_OBJ_FOCUS_GRID.BindDataset);
}

function grd_fn_OnFocus(obj)
{
	GRD_OBJ_FOCUS_GRID = obj;
	// obj.setCellprop("head",0,"BkImageID","calendar_today_focus");
}

function grd_fn_OnKillFocus(obj)
{
	// obj.setCellprop("head",0,"BkImageID","calendar_today_unfocus");
}
