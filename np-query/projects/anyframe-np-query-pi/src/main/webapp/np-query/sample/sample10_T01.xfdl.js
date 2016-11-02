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
                this.set_name("sample10_T01");
                this.set_classname("sample00");
                this.set_titletext("일자별처방-샘플");
                this._setFormPosition(0,0,1224,660);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_cond", this);
            obj._setContents("");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_list", this);
            obj._setContents("<ColumnInfo><Column id=\"_chk\" type=\"string\" size=\"256\"/><Column id=\"USER_ID\" type=\"string\" size=\"16\"/><Column id=\"USER_NAME\" type=\"string\" size=\"20\"/><Column id=\"EN_NAME\" type=\"string\" size=\"20\"/><Column id=\"COMP_PHONE\" type=\"string\" size=\"20\"/><Column id=\"PHONE\" type=\"string\" size=\"20\"/><Column id=\"CELL_PHONE\" type=\"string\" size=\"20\"/><Column id=\"COMPANY\" type=\"string\" size=\"20\"/><Column id=\"JOB_POSITION\" type=\"string\" size=\"20\"/><Column id=\"ASSIGNMENT\" type=\"string\" size=\"20\"/><Column id=\"OFFICER_YN\" type=\"string\" size=\"1\"/><Column id=\"FAX\" type=\"string\" size=\"20\"/><Column id=\"ZIP_CODE\" type=\"string\" size=\"10\"/><Column id=\"ADDRESS\" type=\"string\" size=\"100\"/><Column id=\"COMP_ZIP_CODE\" type=\"string\" size=\"10\"/><Column id=\"COMP_ADDRESS\" type=\"string\" size=\"100\"/><Column id=\"EMAIL\" type=\"string\" size=\"30\"/><Column id=\"DEPT_ID\" type=\"string\" size=\"16\"/><Column id=\"PASSWORD\" type=\"string\" size=\"16\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Div("div_left", "absolute", "0", "0", "338", null, null, "0", this);
            obj.set_taborder("0");
            this.addChild(obj.name, obj);
            obj = new Grid("Grid00", "absolute", "85", "5", null, "655", "0", null, this.div_left);
            obj.set_taborder("0");
            obj._setContents("<Formats></Formats>");
            this.div_left.addChild(obj.name, obj);
            obj = new Div("Div00", "absolute", "5", "207", "76", "68", null, null, this.div_left);
            obj.set_taborder("1");
            obj.set_text("Div00");
            this.div_left.addChild(obj.name, obj);
            obj = new Div("Div01", "absolute", "5", "463", "76", "68", null, null, this.div_left);
            obj.set_taborder("2");
            obj.set_text("Div01");
            this.div_left.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 76, 68, this.div_left.Div00,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("1");
            		p.set_text("Div00");

            	}
            );
            this.div_left.Div00.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 338, 0, this.div_left,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("0");

            	}
            );
            this.div_left.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 1224, 660, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("sample00");
            		p.set_titletext("일자별처방-샘플");

            	}
            );
            obj.set_stepcount("");
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.addIncludeScript("sample10_T01.xfdl", "lib::comForm.xjs");
        this.addIncludeScript("sample10_T01.xfdl", "lib::comTransaction.xjs");
        this.registerScript("sample10_T01.xfdl", function() {
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
        	this.gfn_formOnLoad(obj);
        }

        //초기설정
        this.fn_init = function()
        {
        	this.fn_search("searchlist");
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
        //1. 조회 함수는 fn_search로 작성한다.
        //2. 조회 Transaction에 대한 구분은 transaction id 로 기술한다.
        //3. 조회 후 Callback 함수는 fn_search 함수 다음에 위치하며 함수명은 fn_searchCallback 으로 작성한다.
        this.fn_search = function(svcId)
        {
        	switch(svcId)
        	{
        		case "searchlist" :
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
        		case "searchlist" :
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
        //-------------------------------------------------------------------------------------------------
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.form_onload, this);

        };

        this.loadIncludeScript("sample10_T01.xfdl");

       
    };
}
)();
