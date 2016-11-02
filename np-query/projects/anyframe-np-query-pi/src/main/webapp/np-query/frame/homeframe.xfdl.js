(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        this.on_create = function()
        {
            // Declare Reference
            var obj = null;
            
            if (Form == this.constructor) {
                this.set_name("homeframe");
                this.set_classname("homeframe");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,1264,768);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_cond", this);
            obj._setContents("");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_user", this);
            obj._setContents("");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Div("div_base", "absolute", "0", "0", null, "877", "0", null, this);
            obj.set_taborder("0");
            this.addChild(obj.name, obj);
            obj = new Static("Static00", "absolute", "0", "0", null, "873", "0", null, this.div_base);
            obj.set_taborder("0");
            obj.style.set_background("transparent URL('images::a_test_02.png') stretch");
            this.div_base.addChild(obj.name, obj);
            obj = new Button("Button00", "absolute", null, "35", "76", "72", "40", null, this.div_base);
            obj.set_taborder("1");
            obj.set_text("로그인");
            this.div_base.addChild(obj.name, obj);
            obj = new Edit("Edit00", "absolute", null, "36", "220", "32", "131", null, this.div_base);
            obj.set_taborder("2");
            this.div_base.addChild(obj.name, obj);
            obj = new Edit("Edit01", "absolute", null, "75", "220", "32", "131", null, this.div_base);
            obj.set_taborder("3");
            obj.set_password("true");
            this.div_base.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 0, 877, this.div_base,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("0");

            	}
            );
            this.div_base.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 1264, 768, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("homeframe");
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.addIncludeScript("homeframe.xfdl", "lib::comFrame.xjs");
        this.addIncludeScript("homeframe.xfdl", "lib::comForm.xjs");
        this.addIncludeScript("homeframe.xfdl", "lib::comTransaction.xjs");
        this.registerScript("homeframe.xfdl", function() {
        /**************************************************************************************************
         * 01. 업무구분				: 
         * 02. 화 면 명				: 
         * 03. 화면설명				:  
         * 04. 관련 화면 및 서비스	: 
         * 05. 관련 테이블명			: 
         * 06. 작 성 자				: 
         * 07. 작 성 일				: 
         * 08. 수정이력
         **************************************************************************************************
         *    수정일            이름        사유
         **************************************************************************************************
         *    
         *************************************************************************************************/

        //-------------------------------------------------------------------------------------------------
        // 1. 공통함수 include
        //-------------------------------------------------------------------------------------------------
        //include "lib::comFrame.xjs"
        //include "lib::comForm.xjs";
        //include "lib::comTransaction.xjs";

        //-------------------------------------------------------------------------------------------------
        // Form 전역변수 선언
        //-------------------------------------------------------------------------------------------------
        this.fv_var;

        //-------------------------------------------------------------------------------------------------
        // 2. Form 함수 정의
        //-------------------------------------------------------------------------------------------------
        this.form_onload = function(obj,e)
        {
        	// Form Load 시 필수로 호출
        	//this.gfn_formOnLoad(obj);
        	
        	this.gfn_frameOnSize(obj, this.div_base);
        	
        	//화면 초기설정
        	this.fn_init();
        	
        	if(system.navigatorname != "nexacro")
        	{
        		// History 기능 사용을 위해 초기화 (application 실행 시 한번만 호출)
        		// 첫번째 인자는 뒤로가기, 앞으로가기가 실행됬을때 호출될 함수
        		// 두번째 인자는 함수내에서 this 로 사용할 scope
        		MyHistory.init(this.onChangeHistory, this);
        		
        		// 새로고침을 위한 처리 ( application 실행 시 한번만 체크)
        		// 새로고침되더라도 hash 값을 그대로 남아있기에
        		// hash id 에 해당하는 처리를 하도록 한다.
        		var hash = MyHistory.getLocationHash();		
        		if ( hash )
        		{
        			// 데이터가 필수가 아니면 체크할 일이 없겠네요			
        			var data = MyHistory.getData(hash);
        			if ( data )
        			{
        				this.onChangeHistory(hash, data);
        			}
        		}	
        	}
        }

        // 브라우저의 뒤로가기, 앞으로가기 실행시 호출됨
        this.onChangeHistory = function(hash,data)
        {
        	trace("onChangeHistory : hash = "+hash+" , data = "+data);
        	if ( hash == "" )
        	{
        		// 초기화면
        		this.gfn_setVFrameChange("home");
        	}	
        	else
        	{
        		this.gfn_setVFrameChange("work");
        		this.gfn_openMenu(hash);	
        	}
        }

        this.form_onsize = function(obj,e)
        {
        	this.gfn_frameOnSize(obj, this.div_base);
        }

        //초기설정
        this.fn_init = function()
        {
        	//공통코드 설정
        }

        //화면종료 시 공통호출함수
        this.fn_close = function()
        {
        	//TO-DO : 닫기 전 Validation체크
        	
        	return true;
        }

        //-------------------------------------------------------------------------------------------------
        // 3. Transaction 함수 정의
        //-------------------------------------------------------------------------------------------------

        //조회
        this.fn_search = function(svcId)
        {
        	switch(svcId)
        	{
        		case "login" :		
        			this.div_base.Edit00.set_value("hong80");
        			this.div_base.Edit01.set_value("test123");
        			//조회조건 설정
        			this.ds_cond.clear();
        			this.ds_cond.addColumn("USER_ID", "string");
        			this.ds_cond.addColumn("PASSWORD", "string");
        			this.ds_cond.addRow();
        			this.ds_cond.setColumn(0, "USER_ID", this.div_base.Edit00.value);
        			this.ds_cond.setColumn(0, "PASSWORD", this.div_base.Edit01.value);
        			
        			//Transaction 호출
        			var sSvcId = svcId;
        			var sInDatasets = "inDataset=ds_cond";
        			var sOutDatasets = "gds_user=gdsUser";
        			var sCallbackFunc = "fn_searchCallback";
        			var oConfig = {controller:"xpQueryLogin.do", service:"xpSecurityService", method:"doLogin"};
        			
        			this.gfn_transaction(sSvcId, sInDatasets, sOutDatasets, sCallbackFunc, oConfig);
        					
        			break;
        		default : 
        			break;
        	}
        }

        //조회 callback
        this.fn_searchCallback = function(svcId,errorCode,errorMsg)
        {
        	if(errorCode < 0){
        		return;
        	}
        	
        	switch(svcId)
        	{
        		case "login" :
        			trace(application.gds_user.saveXML());
        			break;
        		default : 
        			break;
        	}	
        }

        //저장
        this.fn_save = function(svcId)
        {
        	switch(svcId)
        	{
        		case "savelist" :
        			break;
        		default : 
        			break;
        	}
        }

        //저장 callback
        this.fn_saveCallback = function(svcId,errorCode,errorMsg)
        {
        	if(errorCode < 0){
        		return;
        	}
        	
        	switch(svcId)
        	{
        		case "savelist" :
        			break;
        		default : 
        			break;
        	}	
        }

        //-------------------------------------------------------------------------------------------------
        // 4. User 함수 정의
        //-------------------------------------------------------------------------------------------------

        //-------------------------------------------------------------------------------------------------
        // 5. Event 함수 정의
        //------------------------------------------------------------------------------------------------

        this.div_base_Button00_onclick = function(obj,e)
        {
        	this.fn_search("login");
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.form_onload, this);
            this.addEventHandler("onsize", this.form_onsize, this);
            this.div_base.Button00.addEventHandler("onclick", this.div_base_Button00_onclick, this);

        };

        this.loadIncludeScript("homeframe.xfdl");

       
    };
}
)();
