﻿﻿﻿
/*********************************************************************
 * 기능 : Dataset Column 의 존재 유무 체크
 * Parameters : dsObj      - Source Dataset
 *              strColID   - 존재여부 확인 Column ID
 * Returns : boolean
 * 예제 : ds_fn_IsExistColumn(ds_obj,"MEASUREVIEW")
 ********************************************************************/
function ds_fn_IsExistColumn(dsObj,strColID) {
	var isExist = false;
	for(var nCol = 0; nCol < dsObj.GetColCount(); nCol++) {
		if(toUpper(dsObj.GetColID(nCol)) == toUpper(strColID)) {
			isExist = true;
			nCol = dsObj.GetColCount();
		}
	}

	return isExist;
}

/*********************************************************************
 * 기능 : Dataset 의 Check 또는 Select 된 Row 를 Append
 * Parameters : objSourceDS		- Source Dataset
 *              objTargetDS		- target Dataset
 *              strCheckColumn	- Source Dataset 의 체크 Column
 *              strUniqueColumn	- Unique 체크 Column
 * Returns :	String			- Dataset XML Contents
 * 예제 : ds_fn_AppendRow(objSourceDS,objTargetDS,"__CHK")
 ********************************************************************/
function ds_fn_AppendRow(objSourceDS,objTargetDS,strCheckColumn,strUniqueColumn)
{
	return ds_fn_SelectedRowCopy(objSourceDS,objTargetDS,strCheckColumn,strUniqueColumn);
}

/*********************************************************************
 * 기능 : Dataset 의 Check 또는 Select 된 Row 를 Move
 * Parameters : objSourceDS		- Source Dataset
 *              objTargetDS		- target Dataset
 *              strCheckColumn	- Source Dataset 의 체크 Column
 * Returns :
 * 예제 : ds_fn_MoveRow(objSourceDS,objTargetDS,"__CHK")
 ********************************************************************/
function ds_fn_MoveRow(objSourceDS,objTargetDS,strCheckColumn)
{
	objTargetDS = ds_fn_SelectedRowCopy(objSourceDS,objTargetDS,strCheckColumn);
	objSourceDS = ds_fn_SelectedRowDelete(objSourceDS,strCheckColumn);
}

/*********************************************************************
 * 기능 : Dataset 의 Check 또는 Select 된 Row 를 Copy
 * Parameters : objSourceDS		- Source Dataset
 *              objTargetDS		- target Dataset
 *              strCheckColumn	- Source Dataset 의 체크 Column
 * Returns :	Dataset			- objTargetDS
 * 예제 : ds_fn_CopyRow(objSourceDS,objTargetDS,"__CHK")
 ********************************************************************/
function ds_fn_CopyRow(objSourceDS,objTargetDS,strCheckColumn)
{
	var strColID;
	var strColType;
	var nColSize;

	objTargetDS.Clear();

	for(var nCol = 0; nCol < objSourceDS.GetColCount(); nCol++) {

		strColID   = objSourceDS.GetColID(nCol);
		strColType = objSourceDS.GetColType(strColID);
		nColSize   = objSourceDS.GetColSize(strColID);

		objTargetDS.AddColumn(strColID,strColType,nColSize);
	}

	return ds_fn_SelectedRowCopy(objSourceDS,objTargetDS,strCheckColumn);
}

/*********************************************************************
 * 기능 : Dataset 의 Check 또는 Select 된 Row 를 Copy
 * Parameters : objSourceDS		- Source Dataset
 *              objTargetDS		- target Dataset
 *              strCheckColumn	- Source Dataset 의 체크 Column
 *              strUniqueColumn	- Unique 체크 Column
 * Returns :	Dataset			- objTargetDS
 * 예제 : ds_fn_SelectedRowCopy(objSourceDS,objTargetDS,"__CHK")
 ********************************************************************/
function ds_fn_SelectedRowCopy(objSourceDS,objTargetDS,strCheckColumn,strUniqueColumn)
{
	var nRow;

	objTargetDS.fireevent = false;
	// 체크된게 없으면 선택된 것을 사용한다.
	if(objSourceDS.FindRow(strCheckColumn,"1") < 0) {

		for(var i = 0; i < objSourceDS.getRowCount(); i++) {
			if(objSourceDS.GetSelect(i) == true) {
				if(length(trim(strUniqueColumn)) == 0) {
					nRow = objTargetDS.AddRow();
					objTargetDS.CopyRow(nRow,objSourceDS,i);
					objTargetDS.SetColumn(nRow,strCheckColumn,"0");
				} else {
					if(objTargetDS.FindRow(strUniqueColumn,objSourceDS.GetColumn(i,strUniqueColumn)) < 0) {
						nRow = objTargetDS.AddRow();
						objTargetDS.CopyRow(nRow,objSourceDS,i);
						objTargetDS.SetColumn(nRow,strCheckColumn,"0");
					}
				}
			}
		}

	} else {

		for(var i = 0; i < objSourceDS.GetRowCount(); i++) {
			if(objSourceDS.GetColumn(i,strCheckColumn) == "1") {
				if(length(trim(strUniqueColumn)) == 0) {
					nRow = objTargetDS.AddRow();
					objTargetDS.CopyRow(nRow,objSourceDS,i);
					objTargetDS.SetColumn(nRow,strCheckColumn,"0");
				} else {
					if(objTargetDS.FindRow(strUniqueColumn,objSourceDS.GetColumn(i,strUniqueColumn)) < 0) {
						nRow = objTargetDS.AddRow();
						objTargetDS.CopyRow(nRow,objSourceDS,i);
						objTargetDS.SetColumn(nRow,strCheckColumn,"0");
					}
				}
			}
		}
	}
	objTargetDS.fireevent = true;

	return objTargetDS;
}

/*********************************************************************
 * 기능 : Dataset 의 Check 또는 Select 된 Row 를 Delete
 * Parameters : objSourceDS		- Source Dataset
 *              strCheckColumn	- Source Dataset 의 체크 Column
 * Returns :	Dataset			- objSourceDS
 * 예제 : ds_fn_SelectedRowDelete(objSourceDS,"__CHK")
 ********************************************************************/
function ds_fn_SelectedRowDelete(objSourceDS,strCheckColumn)
{
	var nRow;

	objSourceDS.fireevent = false;
	// 체크된게 없으면 선택된 것을 사용한다.
	if(objSourceDS.FindRow(strCheckColumn,"1") < 0) {

		objSourceDS.DeleteSelected();

	} else {

		for(var i = objSourceDS.FindRow(strCheckColumn,"1"); i > -1; i = objSourceDS.FindRow(strCheckColumn,"1",i)) {
			objSourceDS.DeleteRow(i);
		}
	}
	objSourceDS.fireevent = true;

	return objSourceDS;
}

/*********************************************************************
 * 기능 : Dataset 의 Check 된 Row 를 Copy
 * Parameters : objSourceDS		- Source Dataset
 *              objTargetDS		- target Dataset
 *              strCheckColumn	- Source Dataset 의 체크 Column
 *              strUniqueColumn	- Unique 체크 Column
 * Returns :	Dataset			- objTargetDS
 * 예제 : ds_fn_CheckedRowCopy(objSourceDS,objTargetDS,"__CHK")
 ********************************************************************/
function ds_fn_CheckedRowCopy(objSourceDS,objTargetDS,strCheckColumn,strUniqueColumn)
{
	var nRow;

	objTargetDS.fireevent = false;
	if(objSourceDS.FindRow(strCheckColumn,"1") > -1) {
		for(var i = 0; i < objSourceDS.GetRowCount(); i++) {
			if(objSourceDS.GetColumn(i,strCheckColumn) == "1") {
				if(length(trim(strUniqueColumn)) == 0) {
					nRow = objTargetDS.AddRow();
					objTargetDS.CopyRow(nRow,objSourceDS,i);
					objTargetDS.SetColumn(nRow,strCheckColumn,"0");
				} else {
					if(objTargetDS.FindRow(strUniqueColumn,objSourceDS.GetColumn(i,strUniqueColumn)) < 0) {
						nRow = objTargetDS.AddRow();
						objTargetDS.CopyRow(nRow,objSourceDS,i);
						objTargetDS.SetColumn(nRow,strCheckColumn,"0");
					}
				}
			}
		}
	}
	objTargetDS.fireevent = true;

	return objTargetDS;
}
/*********************************************************************
 * 기능 : Dataset 의 Check 된 Row 를 Delete
 * Parameters : objSourceDS		- Source Dataset
 *              strCheckColumn	- Source Dataset 의 체크 Column
 * Returns :	Dataset			- objSourceDS
 * 예제 : ds_fn_CheckedRowDelete(objSourceDS,"__CHK")
 ********************************************************************/
function ds_fn_CheckedRowDelete(objSourceDS,strCheckColumn)
{
	var nRow;

	objSourceDS.fireevent = false;
	// 체크된게 없으면 선택된 것을 사용한다.
	if(objSourceDS.FindRow(strCheckColumn,"1") > -1) {
		for(var i = objSourceDS.FindRow(strCheckColumn,"1"); i > -1; i = objSourceDS.FindRow(strCheckColumn,"1",i)) {
			objSourceDS.DeleteRow(i);
		}
	}
	objSourceDS.fireevent = true;

	return objSourceDS;
}

/*********************************************************************
 * 기능 : String 으로 되어있는 문자열을 Dataset에 세팅한다.
 * Parameters : objDataset - Source Dataset
 *              strData       - String Data
 *              strRowToken   - Row 구분자
 *              strColToken   - Col 구분자
 * Returns :
 * 예제 : ds_fn_SetDataset(objDataset,"AAA^BBB^CCC;111^222^333;",";","^")
 ********************************************************************/
function ds_fn_SetDataset(objDataset,strData,strRowToken,strColToken)
{
	objDataset.ClearData();
	var strRow = split(strData,strRowToken);

	for(var nRow = 0; nRow < length(strRow); nRow++) {

		objDataset.AddRow();
		var strCol = split(strRow[nRow],strColToken,"webstyle");

		for(var nCol = 0; nCol < length(strCol); nCol++) {
			objDataset.SetColumn(nRow,objDataset.GetColID(nCol),strCol[nCol]);
		}
	}
}


/*********************************************************************
 * 기능 : Dataset 의 특정 Column 을 Distinct 하여 결과 리턴
 * Parameters : objSourceDS	- Source Dataset
 *              strColumn	- Distinct 할 Column
 * Returns :	String		- Dataset CSV Contents
 * 예제 : ds_fn_CopyRow(ds_obj,"MEASUREVIEW")
 ********************************************************************/
function ds_fn_DistinctData(objSourceDS,strColumn)
{
	var objDs = ds_fn_DistinctDataset(objSourceDS,strColumn);
	return objDs.SaveCSV();
}

var DS_OBJ_DISTINCT_DATA;
function ds_fn_DistinctDataset(objSourceDS,strColumn)
{
	// var objTargetDS = object("ds_DistinctData");
	// if(!isValidObject(objTargetDS)) {

	if(!isValidObject(DS_OBJ_DISTINCT_DATA)) {
		Create("Dataset","ds_DistinctData");
		DS_OBJ_DISTINCT_DATA = object("ds_DistinctData");
	}

	DS_OBJ_DISTINCT_DATA.fireevent = false;

	// DS_OBJ_DISTINCT_DATA.Contents = objSourceDS.Contents;
	DS_OBJ_DISTINCT_DATA.Clear();
	var nTotalCol = objSourceDS.GetColCount();
	var strColID;
	var strColType;
	var nColSize;
	for(var i = 0; i < nTotalCol; i++) {
		strColID   = objSourceDS.GetColID(i);
		strColType = objSourceDS.GetColType(i);
		nColSize   = objSourceDS.GetColSize(i);
		DS_OBJ_DISTINCT_DATA.AddColumn(strColID,strColType,nColSize);
	}

	var nRow;
	var nTotalRow = objSourceDS.GetRowCount();
	for(var i = 0; i < nTotalRow; i++) {
		if(DS_OBJ_DISTINCT_DATA.FindRow(strColumn,objSourceDS.GetColumn(i,strColumn)) < 0) {
			nRow = DS_OBJ_DISTINCT_DATA.AddRow();
			DS_OBJ_DISTINCT_DATA.CopyRow(nRow,objSourceDS,i);
		}
	}

	DS_OBJ_DISTINCT_DATA.fireevent = true;

	return DS_OBJ_DISTINCT_DATA;
}

/*********************************************************************
 * 기능 : 여러개의 Checkbox 로우가 있을 경우 한 로우만 Check 되도록 하기위한 함수
 * Parameters : obj			- Source Dataset
 *              nRow		- Check Row
 *              strColumnID	- Check Column ID
 *              varValue	- Check Value
 * Returns :
 * 예제 : ds_fn_SetSingleCheck(obj,nRow,strColumnID,varValue)
 ********************************************************************/
function ds_fn_SetSingleCheck(obj,nRow,strColumnID,varValue)
{
	obj.fireevent = false;
	for(var i = 0; i < obj.GetRowCount(); i++) {
		if(i != nRow && obj.GetColumn(i,strColumnID) == 1) {
			obj.SetColumn(i,strColumnID,obj.GetOrgColumn(i,strColumnID));
		}
	}
	obj.fireevent = true;
}

/*********************************************************************
 * 기능 : 데이터셋의 헤더및 데이터를 표시한다.
 * 인수 : objDataset        데이터셋
 * 예제 :  frm_fn_DSPrint(input);
 *********************************************************************/
function ds_fn_DSPrint(objDataset)
{
	var nColCnt = objDataset.ColCount();
	var nRowCnt = objDataset.RowCount();
	var i;

	// Header를 출력한다.
	var sHeadStr="";
	var sDsName="UnKnown Dataset";

	sDsName = objDataset.id;
	trace(">>>>    Dataset (" + sDsName + ") Tracing   ");
	trace(">>>> " + "Col Cnt:" + nColCnt +" /  Row Cnt:" + nRowCnt);

	for(var nCol = 0; nCol < nColCnt; nCol++) {
		sHeadStr += "[" + objDataset.GetColID(nCol) +"] ";
	}
	trace(">>>> COL ID : " + sHeadStr);

	// 내용을 출력한다.
	var sRowStr = "";
	for(var nRow = 0; nRow < nRowCnt; nRow++) {
		sRowStr = objDataset.GetRowType(nRow) + "::";
		for(var nCol = 0; nCol < nColCnt; nCol++) {
			sRowStr += objDataset.GetColID(nCol) + "[" + objDataset.GetColumn(nRow,objDataset.GetColID(nCol)) +"] ";
		}
		trace(">>>> " + sRowStr);
	}
	trace(">>>> " + "---------------------------------------------------");
}
