//XJS=comDataset.xjs
(function()
{
    return function(path)
    {
        var obj;
    
        // User Script
        this.registerScript(path, function() {

        /**
         * @class Dataset의 Row 중에서 변경된 내용이 있는지 여부를 판단하는 함수
         * @param objDs     - 확인 대상 Dataset
         * @param sChkCol   - 체크컬럼명
         * @return boolean true = 변경 된 데이터가 존재/false = 변경 된 데이터가 없음
         */  
        this.gfn_isUpdate = function (objDs,sChkCol)
        {	
        	var bCheck = false;
        	if(!Eco.isEmpty(sChkCol)) bCheck = true;
        	
        	//insert check
        	if (objDs.findRowExpr("this.getRowType(rowidx)==Dataset.ROWTYPE_INSERT") > -1){
        		return true;
        	}
        	
        	//delete check
        	if (objDs.getDeletedRowCount() > 0){
        		return true;
        	}
        		
        	//update check - CHK 컬럼을 제외하고 체크함
        	if(!bCheck)
        	{
        		if (objDs.findRowExpr("this.getRowType(rowidx)==Dataset.ROWTYPE_UPDATE") > -1){
        			return true;
        		}
        	}
        	else
        	{
        		var sCol;
        		for(var i = 0; i < objDs.rowcount; i++)
        		{
        			for(var j = 0; j < objDs.getColCount(); j++)
        			{
        				sCol = objDs.getColID(j);
        				//CHK 컬럼 제외
        				if(sCol != sChkCol)
        				{
        					if(objDs.getColumn(i, sCol) != objDs.getOrgColumn(i, sCol))
        					{
        						return true;
        					}
        				}
        			}
        		}
        	}
        	
        	return false;
        }
        });


    
        this.loadIncludeScript(path);
        
        obj = null;
    };
}
)();
