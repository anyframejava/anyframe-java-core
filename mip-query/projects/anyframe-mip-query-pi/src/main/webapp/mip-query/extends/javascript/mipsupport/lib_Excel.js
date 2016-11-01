﻿// *****************************************************************
// Function Name: ex_fn_GridExcelCallback
// Description	: Grid에서 Excel Export, Import가 실행된 후 CallBack Function
// Argument		: obj(해당 오브젝트),strMenuId(메뉴아이디)
// Return		: 없음
// *****************************************************************
function ex_fn_GridExcelCallback(obj, strMenuId) {
	switch(strMenuId) {
		case 1: // export
			ex_fn_ExcelExport(obj);
			break;
		case 2:
			ex_fn_ExcelImport(obj);
			break;
	}
}

// *****************************************************************
// Function Name: ex_fn_ExcelExport
// Description	: Excel 저장시 처리 하는 이벤트 
// Argument		: obj(해당 Grid 오브젝트)
// Return		: 없음
// *****************************************************************
function ex_fn_ExcelExport(obj){
	
	if(isValid(obj) == false) return;
	
	if (obj == null || toUpper(obj.getType()) != "GRID") {
		gfnMsg("MSG_GRID_NOTFOUND");
		return;
	}
    
	strFileDialog = "comLibExcelSave";

	create("FileDialog", strFileDialog,'Bottom="0" Filter="xls(*.xls)|*.xls|" Height="1" Left="1" Right="1" TabOrder="100" Top="1" Type="Save" Width="1"');
    
    var objFileDialog = object(strFileDialog);
    var sConfirm = gfnConfirm("MSG_SAVE_FILE", "OSC") ;
	if(sConfirm == "S"){
		objFileDialog.FileName = Replace(this.Title," ","");
		var sFileName;
		if (objFileDialog.Open() == true) {
			if (indexOf(toUpper(objFileDialog.FileName), ".XLS") == -1) {
				sFileName = objFileDialog.FilePath + "\\" + objFileDialog.FileName+".xls";
			}
			obj.SaveExcel(sFileName, "sheet");
		}		
	} else if(sConfirm == "O") {
		obj.ExportExcelEx("sheet");
	}
	
	Destroy(strFileDialog);	
}

// *****************************************************************
// Function Name: ex_fn_ExcelImport
// Description	: Excel 파일을 Export 후 데이타 수정 하여 Import 할 경우 
// Argument		: obj(해당 Grid 오브젝트),arrPk(필수입력내용 누락확인 및 중복체크(아직 구현안됨.))
// Return		: 없음
// *****************************************************************
function ex_fn_ExcelImport(obj,arrPk){
	
	var oDataset = object(obj.BindDataset);
	if(isValid(obj) == false) return;
	
	if (obj == null || toUpper(obj.GetType()) != "GRID") {
		gfnMsg("MSG_GRID_NOTFOUND");
		return;
	}

	strFileDialog = "comLibExcelSave";

	Create("FileDialog",strFileDialog,'Bottom="0" Filter="xls(*.xls)|*.xls|" Height="1" Left="1" Right="1" TabOrder="100" Top="1" Type="Save" Width="1"');
    
    var objFileDialog = object(strFileDialog);
    	
	objFileDialog.Type = "Open";
	var sFileName = "";
	var sFilePath;

	if (objFileDialog.Open() == true) {
		obj.BindDataset = '';
		sFileName = objFileDialog.FileName;
		sFilePath = objFileDialog.FilePath + '\\' + sFileName;
		oDataSet.ClearData();
		Create('Dataset', '_dsExcel');
		ext_ExcelImportByIndex(sFilePath, 0, _dsExcel.id,1,1);
		
		ex_fn_GridShow(obj, oDataset, _dsExcel);  
		oDataset.Row = 0;
		obj.BindDataset = oDataset.ID;
		
		Destroy('_dsExcel');
	}

	Destroy(strFileDialog);	
	
	return sFileName;
}

// *****************************************************************
// Function Name: ex_fn_GridShow
// Description	: Excel 파일을 Import  처리시 있어야 할 sub함수
// Argument		: oGrid(해당 Grid 오브젝트),dsDesc(Description Dataset),dsSource(Source Dataset)
// Return		: 없음
// *****************************************************************
function ex_fn_GridShow(oGrid, dsDesc, dsSource)
{
	var OrgcolCnt = oGrid.GetColCount();
	var ColIdArry = array(OrgcolCnt);

	for(var i=0; i < OrgcolCnt; i++){
		ColIdArry[i] = oGrid.GetCellProp('Body',i,"ColID");
	}
	
	dsSource.DeleteRow(0);
	for(var n=0, size=dsSource.RowCount; n<size; n++){
		dsDesc.AddRow();
		for(var i=0; i < OrgcolCnt; i++){
			dsDesc.SetColumn(n, ColIdArry[i], dsSource.GetColumn(n, i));
		}
	}
}

// *****************************************************************
// Function Name: ex_fn_ExcelImportEx
// Description	: Excel 파일을 sheet 갯수만큼 Import 할 경우 
// Argument		: oDataSet(자동생성할 DataSet + sequence(0,1,2)),sheetcnt(Excel Sheet 갯수)
// Return		: 없음
// *****************************************************************
function ex_fn_ExcelImportEx(oDataSet,sheetcnt){
	
	var dsArry = array(sheetcnt);
	var strFileDialog = "comLibExcelSave";

	Create("FileDialog",strFileDialog,'Bottom="0" Filter="xls(*.xls)|*.xls|" Height="1" Left="1" Right="1" TabOrder="100" Top="1" Type="Save" Width="1"');
    
    var objFileDialog = object(strFileDialog);
    	
	objFileDialog.Type = "Open";
	var sFileName;
	var sFilePath;

	if (objFileDialog.Open() == true)
	{
		
		sFilePath = objFileDialog.FilePath + '\\' + objFileDialog.FileName;
		
		for(var i=0; i < sheetcnt; i++){
			dsArry[i] = oDataSet+i;

			Create('Dataset', dsArry[i]);
			
			ext_ExcelImportByIndex(sFilePath, i, object(dsArry[i]).id,1,1);
			
			ex_fn_GridShowEx(object(dsArry[i]));  
			dsArry[i].Row = 0;
			// gfnMsg(object(dsArry[i]).rowcount());
			// gfnMsg(object(dsArry[i]).SaveXML());
		}
		
	}

	Destroy(strFileDialog);	
}

// *****************************************************************
// Function Name: ex_fn_GridShowEx
// Description	: Excel 파일을 Import  처리시 있어야 할 sub함수
// Argument		: dsArry(Array Dataset)
// Return		: 없음
// *****************************************************************
function ex_fn_GridShowEx(dsArry)
{
	
	dsArry.DeleteRow(0);
	// gfnMsg("RowCont : " + dsArry.RowCount);
	// gfnMsg("colcount : " + dsArry.colcount);
	for(var n=0, size=dsArry.RowCount; n<size; n++){

		for(var i=0; i < dsArry.colcount; i++){
			dsArry.SetColumn(n, i, dsArry.GetColumn(n, i));
		}
	}
}


