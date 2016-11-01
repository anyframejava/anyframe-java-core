/*********************************************************************
 * 2009.09.28 by Anyframe UI Sample
 * 1. frm_fn_OnluOpen()에서 open()을 dialog()로 변경
 * 2. frm_fn_FindForm()에서 default 검색어를 ""로 변경
 *********************************************************************/
﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿
/*********************************************************************
 * Open을 사용할때 같은폼을 한번만 띄울때 사용한다.
 *********************************************************************/
function frm_fn_OnlyOpen(strURL,strInArgument,nWidth,nHeight,strOpenStyle,nLeft,nTop,bCloseNew)
{
	var nHandle = frm_fn_GetWindowHandle(strURL);

	if(nHandle < 0) {
		nHandle = Dialog(strURL,strInArgument,nWidth,nHeight,strOpenStyle,nLeft,nTop);
	} else {
		var objOpenWindow = GetFormFromHandle(nHandle);
		if(bCloseNew) {
			objOpenWindow.Close();
			nHandle = Dialog(strURL,strInArgument,nWidth,nHeight,strOpenStyle,nLeft,nTop);
		} else {
			objOpenWindow.window.Top  = nTop;
			objOpenWindow.window.Left = nLeft;
		}
	}

	return nHandle;
}

/**********************************************************/
/* 현재 오픈되어 있는 Form의 Handle을 리턴한다.           */
/**********************************************************/
function frm_fn_GetWindowHandle(strURL,nLeft,nTop)
{
	strURL = toLower(strURL);
	var windowsHandle = -1;
	for(wi = 0; wi < Global.AllWindows.count; wi++) {
		if(toLower(Global.AllWindows[wi].url) == strURL) {
			windowsHandle = Global.AllWindows[wi].GetHandle();
			wi = Global.AllWindows.count;
		}
	}
	return windowsHandle;
}

/*********************************************************************
 * 기능 : Multi Ditto 기능 호출 함수
 *        두 값이 모두 있으면 Page Url 우선 적용됨
 * Parameters : strDataset			: Target Dataset id
 *              strUrl				: xml page url
 *              strDatasetContents	: Dataset contents
 *              strCheckColumn		: Check Column
 * Returns :
 * 예제 : frm_fn_MultiDitto("ds_Standard","test::test.xml",dataset.Contents,"CHK")
 *********************************************************************/
function frm_fn_MultiDitto(strDataset,strUrl,strDatasetContents,strCheckColumn)
{
	var strArg  = " L_ARG_STR_TARGET_DATASET="+quote(strDataset);
		strArg += " L_ARG_STR_URL="+quote(trim(strUrl));
		strArg += " L_ARG_STR_CONTENTS="+quote(trim(strDatasetContents));
		strArg += " L_ARG_STR_CHECK_COLUMN="+quote(trim(strCheckColumn));
	var objOpenForm = frm_fn_OnlyOpen("includes::GRDMULTIDITTO.xml",strArg,-1,-1,"Titlebar=false StatusBar=false Resize=true",-1,-1,true);
}

/*********************************************************************
 * 기능 : Multi Ditto 기능 호출 함수
 * Parameters : objGrid				: Update Grid Object
 *              strDatasetContents	: Dataset contents
 *              strCheckColumn		: Check Column
 * Returns :
 * 예제 : frm_fn_MultiDittoDS(grd_Standard,dataset.Contents,"CHK")
 *********************************************************************/
function frm_fn_MultiDittoDS(objGrid,strDatasetContents,strCheckColumn)
{
	frm_fn_MultiDitto(objGrid.BindDataset,"",strDatasetContents,strCheckColumn);
}

/*********************************************************************
 * 기능 : Multi Ditto 기능 호출 함수
 * Parameters : objGrid			: Update Grid Object
 *              strUrl			: xml page url
 *              strCheckColumn	: Check Column
 * Returns :
 * 예제 : frm_fn_MultiDittoForm(grd_Standard,"test::test.xml","CHK")
 *********************************************************************/
function frm_fn_MultiDittoForm(objGrid,strUrl,strCheckColumn)
{
	frm_fn_MultiDitto(objGrid.BindDataset,strUrl,"",strCheckColumn);
}

/*********************************************************************
 * 기능 : Find 기능 호출 함수
 * Parameters : strGridID			: Grid Object ID
 * Returns :
 * 예제 : frm_fn_FindForm(obj.id)
 *********************************************************************/
function frm_fn_FindForm(strGridID)
{
	var objGrid = eval(strGridID);
	var objDataset = eval(objGrid.BindDataset);
	var nRow = objDataset.row;
	var nCol = objGrid.GetCellPos();
	//var strValue = objDataset.GetColumn(nRow,objGrid.GetCellProp("body",nCol,"colid"));
	//var strValue = objGrid.getCellText("body", objGrid.getClickedRow(), nCol);
	var strValue = "";

	var nTop  = (ClientToScreenY(objGrid,objGrid.Top) - objGrid.Top) + (objGrid.Height - 95)/2;
	var nLeft = (ClientToScreenX(objGrid,objGrid.Left) - objGrid.Left) + (objGrid.Width - 230)/2;

	var strArg  = " L_ARG_STR_GRID="+quote(strGridID);
		strArg += " L_ARG_STR_VALUE="+quote(trim(strValue));
	var objOpenForm = frm_fn_OnlyOpen("includes::GRDFIND.xml",strArg, 230, 95,"Titlebar=false StatusBar=false Resize=true",nLeft,nTop,true);
}
