//XJS=comTransaction.xjs
(function()
{
    return function(path)
    {
        var obj;
    
        // User Script
        this.registerScript(path, function() {
        /**
         * @class gfn_transaction
         * @param sSvcId {string} transaction 아이디
         * @param sInDatasets {string} input datasets
         * @param sOutDatasets {string} output datasets
         * @param sCallbackFunc {string} callback 함수
         * @param oConfig {object} 기타 속성 Object
         
        		* Object 속성 목록(controller, service, method, querylist, async, waitcursor, argument)
        		
        		1. 공통속성
        			- async : true(비동기, 기본값), false(동기)
        			- waitcursor : true(사용, 기본값), false(미사용)
        			- argument : 파라미터
        			
        		2. 공통 서비스 속성
        			- method : 서비스 Method 명 (※getList, saveAll, create, get, update 중 사용)
        			- querylist : querySet에 대한 query id 목록 (ex) querySet1=createXPUser,updateXPUser,removeXPUser
        			
        		3. 사용자 서비스 속성
        			- controller : 사용자가 추가한 Controller 명
        			- service : 사용자가 추가한 Service 명
        			- method :  사용자가 추가한 Method 명
         * @return None
         */  
        this.gfn_transaction = function(sSvcId,sInDatasets,sOutDatasets,sCallbackFunc,oUserConfig)
        {
        	var bAsync = true;
        	var bWaitCursor = true;	
        	var nDataType = 0;//XML
        	var bCompress = false;//비압축
        	var sArgument = "";
        	var sGlobalCallbackFunc = "gfn_callback";
        	
        	var sControllerId = "npController.do";
        	var sServiceId = "npService";
        	var sMethodId = "";
        	var sQueryList = "";
        	var nQueryCount = 0;
        	
        	if(!Eco.isEmpty(oUserConfig))
        	{
        		if(!Eco.isEmpty(oUserConfig.method)) sMethodId = oUserConfig.method;
        		if(!Eco.isEmpty(oUserConfig.controller)) sControllerId = oUserConfig.controller+"?method="+sMethodId;
        		if(!Eco.isEmpty(oUserConfig.service)) sServiceId = oUserConfig.service;
        		if(!Eco.isEmpty(oUserConfig.querylist)) sQueryList = oUserConfig.querylist;
        		
        		if(!Eco.isEmpty(oUserConfig.async)) bAsync = oUserConfig.async;
        		if(!Eco.isEmpty(oUserConfig.waitcursor)) bWaitCursor = oUserConfig.waitcursor;
        		if(!Eco.isEmpty(oUserConfig.argument)) sArgument = oUserConfig.argument;
        	}
        	
        	var sTransId = sSvcId+"|"+sCallbackFunc+"|"+Math.round(Math.random()*1000);
        	var sURL = application.services["svc"].url+sControllerId;//application.services["svc"].url
        	
        	//Argument설정
        	var aArgument = [];
        	
        	//query count, querylist 추가
        	if(!Eco.isEmpty(sQueryList))
        	{
        		var aQueryList = sQueryList.split(" ");
        		nQueryCount = aQueryList.length;
        		if(nQueryCount > 0)
        		{
        			aArgument.push("querySetCount="+nQueryCount);
        			aArgument.push(sQueryList);
        		}		
        	}
        	
        	//service, method추가
        	aArgument.push("service="+sServiceId);
        	aArgument.push("method="+sMethodId);
        	
        	//사용자 argument추가
        	if(!Eco.isEmpty(sArgument))
        	{
        		var tArgument = sArgument.split(" ");
        		for(var i = 0; i < tArgument.length; i++)
        		{
        			aArgument.push(tArgument[i]);
        		}
        	}	
        	
        	sArgument = aArgument.join(" ");
        	
        	trace("****************gfn_transaction********************");
        	trace("sTransId : "+sTransId);
        	trace("sURL : "+sURL);
        	trace("sInDatasets : "+sInDatasets);
        	trace("sOutDatasets : "+sOutDatasets);
        	trace("sArgument : "+sArgument);
        	trace("***************************************************");
        	
        	if(bWaitCursor) this.setWaitCursor(true, true);
        	
        	this.transaction(sTransId, sURL, sInDatasets, sOutDatasets, sArgument, sGlobalCallbackFunc, bAsync, nDataType, bCompress);
        }

        this.gfn_callback = function(sSvcId,nErrorCode,nErrorMsg)
        {
        	this.setWaitCursor(false, true);
        	
        	var aSvcId = sSvcId.split("|");
        	sSvcId = aSvcId[0];
        	var sCallbackFunc = aSvcId[1];

        	if(nErrorCode < 0)
        	{
        		this.gfn_alert("서비스오류발생");
        	}
        	
        	this[sCallbackFunc].call(this, sSvcId, nErrorCode, nErrorMsg);
        }
        
        });


    
        this.loadIncludeScript(path);
        
        obj = null;
    };
}
)();
