﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿
var FDB_BOL_BASE64ENCODE = false;

var FDB_STR_FILE_CTRL;
var FDB_STR_DATASET_TYPE = "BIN";	// XML,BIN,CSV
var FDB_STR_DATASET_FOLDER = "";

function fdb_fn_LoadDataset(strKey,strDatasetList)
{
	var arrDatasetList = split(strDatasetList," ","webstyle");
	var arrDatasetListTemp;
	var strDatasetName;
	var strDatasetPrefix;
	var strLocalFileName;

	if(length(FDB_STR_DATASET_FOLDER) <= 0) {
		Create("FileDialog","objFileCtrlDialog");
		objFileCtrlDialog.Type = "Dir";
		if(objFileCtrlDialog.Open() == true) {
			FDB_STR_DATASET_FOLDER = objFileCtrlDialog.FilePath;
		}
	}

	for(var nRow = 0; nRow < arrDatasetList.length; nRow++) {

		arrDatasetListTemp = split(arrDatasetList[nRow],"=","webstyle");
		strDatasetName     = arrDatasetListTemp[0];

		} if(length(strKey) == 0) {
			strKey = this.id;
		}

		strDatasetPrefix = strKey+"@";

		strLocalFileName = strDatasetPrefix + strDatasetName + ".xml";

		var bRtnVal = fdb_fn_LocalDatasetCall(eval(strDatasetName),FDB_STR_DATASET_FOLDER,strLocalFileName);

		if(!bRtnVal) alert("["+strLocalFileName+".xml]\n\nDataset XML 파일이 존재하지 않습니다.\n\nDataset XML의 정확한 위치를 지정해 주세요.");
	}
}

function fdb_fn_LocalDatasetCall(objLoadDataset,strFolder,strLocalFileName)
{
	var strPath = strFolder + "\\" + strLocalFileName;
	if(toUpper(FDB_STR_DATASET_TYPE) == "BIN") {
		objLoadDataset.LoadXML(fdb_fn_FileRead(toUpper(FDB_STR_DATASET_TYPE),strPath),true,true);
	} else if(toUpper(FDB_STR_DATASET_TYPE) == "CSV") {
		objLoadDataset.LoadCSV(fdb_fn_FileRead(toUpper(FDB_STR_DATASET_TYPE),strPath),true);
	} else {
	// } else if(toUpper(FDB_STR_DATASET_TYPE) == "XML") {
		objLoadDataset.LoadXML(fdb_fn_FileRead(toUpper(FDB_STR_DATASET_TYPE),strPath),true,false);
	}

	// Dataset.Load() 를 사용하지 않는다..
	// Load()함수는 Async 동작을 하기때문에 UI의 비정상 로직처리가 될 수 있기때문
	// objLoadDataset.OnLoadCompleted = "LoadDataset_OnLoadCompleted";
	// objLoadDataset.Load("file://"+strLocalFileName);

	// if(length(objLoadDataset.OnLoadCompleted) > 0) {
		// eval(this.id + "." + objLoadDataset.OnLoadCompleted + "('" + objLoadDataset.id + "',0,'',0)");
	// }
}

// function LoadDataset_OnLoadCompleted(obj,nErrorCode,strErrorMsg,nReason)
// {
	// if(nReason == 0) {
	// }
// }


function fdb_fn_FileRead(strReadType,strPath)
{
	var strLoadDatasetContents;

	if(length(FDB_STR_FILE_CTRL) == 0) {
		Create("File","objFileCtrl");
		FDB_STR_FILE_CTRL = objFileCtrl.id;
	}

	objFileCtrl.FileName = strPath;

	var bOpen = false;
	if(toUpper(strReadType) == "BIN") {

		bOpen = objFileCtrl.Open("rb");
		if(bOpen == true) {
			strLoadDatasetContents = objFileCtrl.ReadBinary();
			objFileCtrl.Close();
		}

	} else if(toUpper(strReadType) == "CSV") {

		bOpen = objFileCtrl.Open("rt");
		if(bOpen == true) {
			if(FDB_BOL_BASE64ENCODE) {
				strLoadDatasetContents = Ext_Base64Decode(objFileCtrl.Read());
			} else {
				strLoadDatasetContents = objFileCtrl.Read();
			}
			objFileCtrl.Close();
		}

	} else {
	// } else if(toUpper(FDB_STR_DATASET_TYPE) == "XML") {

		bOpen = objFileCtrl.Open("rt");
		if(bOpen == true) {
			if(FDB_BOL_BASE64ENCODE) {
				strLoadDatasetContents = Ext_Base64Decode(objFileCtrl.Read());
			} else {
				strLoadDatasetContents = objFileCtrl.Read();
			}
			objFileCtrl.Close();
		}
	}

	return strLoadDatasetContents;
}

function fdb_fn_ExportDataset(strKey,strDatasetList)
{
	var arrDatasetList = split(strDatasetList," ","webstyle");
	var arrDatasetListTemp;
	var strDatasetName;
	var strDatasetPrefix;
	var strLocalFileName;

	if(length(FDB_STR_DATASET_FOLDER) <= 0) {
		Create("FileDialog","objFileCtrlDialog");
		objFileCtrlDialog.Type = "Dir";
		if(objFileCtrlDialog.Open() == true) {
			FDB_STR_DATASET_FOLDER = objFileCtrlDialog.FilePath;
		}
	}

	for(var nRow = 0; nRow < arrDatasetList.length; nRow++) {

		arrDatasetListTemp = split(arrDatasetList[nRow],"=","webstyle");
		strDatasetName     = arrDatasetListTemp[0];

		} if(length(strKey) == 0) {
			strKey = this.id;
		}

		strDatasetPrefix = strKey+"@";

		strLocalFileName = strDatasetPrefix + strDatasetName + ".xml";

		fdb_fn_LocalDatasetExport(eval(strDatasetName),FDB_STR_DATASET_FOLDER,strLocalFileName);
	}
}

function fdb_fn_LocalDatasetExport(objDataset,strFolder,strLocalFileName)
{
	if(objDataset.GetRowCount() <= 0) objDataset.AddRow();

	var strPath = strFolder + "\\" + strLocalFileName;
	var data;
	if(toUpper(FDB_STR_DATASET_TYPE) == "BIN") {
		data = objDataset.SaveBIN();
	} else if(toUpper(FDB_STR_DATASET_TYPE) == "CSV") {
		data = objDataset.SaveCSV();
	} else {
	// } else if(toUpper(FDB_STR_DATASET_TYPE) == "XML") {
		data = objDataset.SaveXML();
	}

	fdb_fn_FileSave(data,toUpper(FDB_STR_DATASET_TYPE),strPath);
}

function fdb_fn_FileSave(strData,strSaveType,strPath)
{
	if(length(FDB_STR_FILE_CTRL) == 0) {
		Create("File","objFileCtrl");
		FDB_STR_FILE_CTRL = objFileCtrl.id;
	}

	objFileCtrl.MakeDir(fdb_fn_GetFolder(strPath));
	objFileCtrl.FileName = strPath;

	if(toUpper(strSaveType) == "BIN") {

		objFileCtrl.Open("wb");
		objFileCtrl.WriteBinary(strData);
		objFileCtrl.Close();

	} else if(toUpper(strSaveType) == "CSV") {

		objFileCtrl.Open("wt");
		if(FDB_BOL_BASE64ENCODE) {
			objFileCtrl.Write(Ext_Base64Encode(strData));
		} else {
			objFileCtrl.Write(strData);
		}
		objFileCtrl.Close();

	} else {
	// } else if(toUpper(strSaveType) == "XML") {

		objFileCtrl.Open("wt");
		if(FDB_BOL_BASE64ENCODE) {
			objFileCtrl.Write(Ext_Base64Encode(strData));
		} else {
			objFileCtrl.Write(strData);
		}
		objFileCtrl.Close();
	}
}

function fdb_fn_FileDelete(strPath)
{
	objFileCtrl.FileName = strPath;
	return objFileCtrl.Delete();
}

function fdb_fn_GetFolder(strPath)
{
	var arrFileInfo = split(strPath,"\\","webstyle");
	return replace(strPath,"\\"+arrFileInfo[length(arrFileInfo)-1]);
}

function fdb_fn_GetFileName(strPath)
{
	var arrFileInfo = split(strPath,"\\","webstyle");
	return arrFileInfo[length(arrFileInfo)-1];
}

function fdb_fn_GetExtName(strPath)
{
	var arrFileInfo = split(strPath,".","webstyle");
	return arrFileInfo[length(arrFileInfo)-1];
}
