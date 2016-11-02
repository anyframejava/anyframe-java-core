//XJS=comCombo.xjs
(function()
{
    return function(path)
    {
        var obj;
    
        // User Script
        this.registerScript(path, function() {

        /*
        * Desc   :  계층형 콤보함수
        * param  :	objCombo - combo 
        * param  :  arrCombo - 계층을 구성하는 Combo 컴포넌트 배열(순서대로)
        */ 
        this.gfn_setCommonCodeNextCombo = function(objCombo,arrCombo)
        {
        	var sUpCd = objCombo.value;	
        	
        	var index = Eco.array.indexOf(arrCombo, objCombo);
        	var objNextCombo = arrCombo[index+1];	
        	
        	//마지막콤보이면 
        	if(Eco.isEmpty(objNextCombo))
        	{
        		return;		
        	}
        		
        	var oNextComboInnerDs = this.objects[(objNextCombo.innerdataset).toString()];
        		
        	//innerdataset초기화
        	if(!Eco.isEmpty(oNextComboInnerDs))
        	{
        		oNextComboInnerDs.clearData();	
        	}	
        		
        	if(Eco.isEmpty(sUpCd))
        	{
        		this.gfn_setCommonCodeNextCombo(objNextCombo, arrCombo);
        	}
        	else
        	{
        		var objDs = oNextComboInnerDs;
        		//trace("objDs.name = "+objDs.name + "  sUpCd = " + sUpCd);
        		application.gds_comCode.filter("UP_CD.toString() == '"+sUpCd+"'");
        		var nRowCnt = objDs.copyData(application.gds_comCode, true);
        		application.gds_comCode.filter("");
        		//trace(objDs.saveXML());
        		objNextCombo.set_innerdataset(oNextComboInnerDs);
        		objNextCombo.set_codecolumn("CD");
        		objNextCombo.set_datacolumn("CD_NM");
        		objNextCombo.set_index(0);
        		this.gfn_setCommonCodeNextCombo(objNextCombo, arrCombo);
        	}
        }

        /**
         * @method gfn_comboMultiSelect
         * @param {Combo} obj     - Combo
         * @param {EventInfo} e  - Event
         * @param {Object} oCallback     - 콜백함수
         * @param {Object} oParam - 파라미터 Object
         * @return {boolean} false
         * @description 멀티선택 콤보 함수
         * @example 
         */  
        // this.gfn_comboMultiSelect = function(obj:Combo, e, oCallback, oParam)
        // {
        // 	//param object값 설정
        // 	var oInnerDs = oParam["innerdataset"];
        // 
        // 	var sChkCol = oParam["checkcolumn"];
        // 	var sCodeCol = oParam["codecolumn"];
        // 	var sDataCol = oParam["datacolumn"];
        // 	var aSelItem = oParam["values"];
        // 	var nRowSize = !Eco.isEmpty(oParam["rowsize"]) ? oParam["rowsize"] : 24;
        // 	var nRowCount = !Eco.isEmpty(oParam["displayrowcount"]) ? oParam["displayrowcount"] : 5;
        // 	
        // 	//체크컬럼추가
        // 	if(Eco.isEmpty(oInnerDs.getColumnInfo(sChkCol)))
        // 	{
        // 		oInnerDs.addColumn(sChkCol, "string");
        // 	}
        // 	
        // 	//셋팅값 설정
        // 	if(!Eco.isEmpty(aSelItem))
        // 	{
        // 		var nFindRow = -1;
        // 		var nArrIdx = 0;
        // 		for(var i = 0; i < oInnerDs.rowcount; i++)
        // 		{				
        // 			if(Eco.array.indexOf( aSelItem, oInnerDs.getColumn(i, sCodeCol) ) > -1)
        // 			{
        // 				oInnerDs.setColumn(i, sChkCol, '1');
        // 			}
        // 			else
        // 			{
        // 				oInnerDs.setColumn(i, sChkCol, '0');
        // 			}
        // 		}
        // 	}
        // 	
        // 	//컴포넌트 사이즈 설정
        // 	var nWidth = obj.getOffsetWidth();
        // 	var nHeight = nRowSize * nRowCount;
        // 	
        // 	//PopupDiv 생성
        // 	var sPopupDiv = "PopupDiv_"+obj.name;
        // 	var objPopupDiv = this.all[sPopupDiv];
        // 	if(!Eco.isXComponent(objPopupDiv))
        // 	{
        // 		objPopupDiv = new PopupDiv();
        // 		objPopupDiv.init("PopupDiv_"+obj.name, "absolute", 0, 0, nWidth, nHeight+2);
        // 		objPopupDiv.set_scrollbars("none");
        // 		//objPopupDiv.style.set_border("1 solid #ccccccff");
        // 		objPopupDiv.addEventHandler("oncloseup", this._gfn_comboMultiSelectCloseUp, this);
        // 		this.addChild(sPopupDiv, objPopupDiv);
        // 		objPopupDiv.show();
        // 	}
        // 	objPopupDiv.oParam = oParam;
        // 	objPopupDiv.callFunc = oCallback;
        // 	
        // 	//Grid생성
        // 	var sGrid = "Grid_"+obj.name;
        // 	var objGrid = objPopupDiv.all[sGrid];
        // 	if(!Eco.isXComponent(objGrid))
        // 	{
        // 		objGrid = new Grid();
        // 		objGrid.init("Grid_"+obj.name, "absolute", 0, 0, nWidth, nHeight);
        // 		objPopupDiv.addChild(sGrid, objGrid);
        // 		objGrid.show();
        // 	}
        // 	
        // 	var sFormats = '<Formats>'
        // 				+'<Format id="default">'
        // 				+'  <Columns>'
        // 				+'	<Column size="25" />'
        // 				+'	<Column size="'+(nWidth-25)+'" />'
        // 				+'  </Columns>'
        // 				+'  <Rows>'
        // 				+'	<Row size="'+nRowSize+'" />'
        // 				+'  </Rows>'
        // 				+'  <Band id="body">'
        // 				+'	<Cell displaytype="checkbox" edittype="checkbox" text="bind:'+sChkCol+'"/>'
        // 				+'	<Cell col="1" text="bind:'+sDataCol+'"/>'
        // 				+'  </Band>'
        // 				+'</Format>'
        // 				+'</Formats>';
        // 
        // 	objGrid.set_formats(sFormats);
        // 	objGrid.set_binddataset(oInnerDs.name);	
        // 	objGrid.set_autofittype("col");
        // 	
        // 	//PopupDiv Open
        // 	objPopupDiv.trackPopupByComponent(obj, 1, obj.getOffsetHeight()+1, nWidth, nHeight);
        // 	
        // 	return false;
        // }

        /**
         * @method _gfn_comboMultiSelectCloseUp
         * @param {PopupDiv} obj     - PopupDiv
         * @param {EventInfo} e  - Event
         * @return 
         * @description 멀티선택 콤보 팝업 닫힐때 
         * @example 
         */  
        // this._gfn_comboMultiSelectCloseUp = function(obj:PopupDiv, e:nexacro.EventInfo)
        // {
        // 	var oParam = obj.oParam;
        // 	var oInnerDs = oParam["innerdataset"];
        // 	var sChkCol = oParam["checkcolumn"];
        // 	var sCodeCol = oParam["codecolumn"];
        // 	var sDataCol = oParam["datacolumn"];
        // 	
        // 	var aRtn = [];
        // 	for(var i = 0; i < oInnerDs.rowcount; i++)
        // 	{
        // 		if(oInnerDs.getColumn(i, sChkCol) == '1')
        // 		{
        // 			aRtn.push(oInnerDs.getColumn(i, sCodeCol));
        // 		}
        // 	}
        // 	
        // 	obj.callFunc.call(this, aRtn);
        // }

        /**
         * @method gfn_getQuteString
         * @param {Object} aArgs     - Array
         * @return {String} '@@@','@@' 형식의 문자열
         * @description Array를 '@@@','@@'의 문자열로 변환한다.
         * @example 
         */  
        // this.gfn_getQuoteString = function(aArgs)
        // {
        // 	var rtn = "";
        // 	if(typeof aArgs == "object")
        // 	{
        // 		for(var i = 0; i < aArgs.length; i++)
        // 		{
        // 			rtn += "'"+aArgs[i]+"'";
        // 			if( aArgs.length-1 > i)
        // 			{
        // 				rtn += ",";
        // 			}
        // 		}
        // 	}
        // 	return rtn;
        // }
        });


    
        this.loadIncludeScript(path);
        
        obj = null;
    };
}
)();
