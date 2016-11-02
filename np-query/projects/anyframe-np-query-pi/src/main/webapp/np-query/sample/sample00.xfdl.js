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
                this.set_name("sample00");
                this.set_classname("sample00");
                this.set_titletext("공통-Base Script");
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
            obj = new Div("div_search", "absolute", "0", "0", null, "99", "0", null, this);
            obj.set_taborder("0");
            obj.style.set_border("1 solid #808080ff");
            obj.set_text("div_search");
            this.addChild(obj.name, obj);
            obj = new Button("btn_search", "absolute", null, "20", "120", "50", "10", null, this.div_search);
            obj.set_taborder("0");
            obj.set_text("조회");
            this.div_search.addChild(obj.name, obj);

            obj = new Static("Static00", "absolute", "0", "99", null, "20", "0", null, this);
            obj.set_taborder("1");
            obj.set_text("h20");
            obj.style.set_background("gainsboro");
            obj.style.set_align("center middle");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Div("div_body", "absolute", "0", "119", null, null, "0", "0", this);
            obj.set_taborder("2");
            obj.set_text("div_body");
            obj.style.set_border("1 solid #808080ff");
            this.addChild(obj.name, obj);
            obj = new Grid("Grid00", "absolute", "20", "24", null, null, "20", "20", this.div_body);
            obj.set_taborder("2");
            obj.set_binddataset("ds_list");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"USER_ID\"/><Cell col=\"1\" text=\"USER_NAME\"/><Cell col=\"2\" text=\"EN_NAME\"/><Cell col=\"3\" text=\"COMP_PHONE\"/><Cell col=\"4\" text=\"PHONE\"/><Cell col=\"5\" text=\"CELL_PHONE\"/><Cell col=\"6\" text=\"COMPANY\"/><Cell col=\"7\" text=\"JOB_POSITION\"/><Cell col=\"8\" text=\"ASSIGNMENT\"/><Cell col=\"9\" text=\"OFFICER_YN\"/><Cell col=\"10\" text=\"FAX\"/><Cell col=\"11\" text=\"ZIP_CODE\"/><Cell col=\"12\" text=\"ADDRESS\"/><Cell col=\"13\" text=\"COMP_ZIP_CODE\"/><Cell col=\"14\" text=\"COMP_ADDRESS\"/><Cell col=\"15\" text=\"EMAIL\"/><Cell col=\"16\" text=\"DEPT_ID\"/><Cell col=\"17\" text=\"PASSWORD\"/></Band><Band id=\"body\"><Cell text=\"bind:USER_ID\"/><Cell col=\"1\" text=\"bind:USER_NAME\"/><Cell col=\"2\" text=\"bind:EN_NAME\"/><Cell col=\"3\" text=\"bind:COMP_PHONE\"/><Cell col=\"4\" text=\"bind:PHONE\"/><Cell col=\"5\" text=\"bind:CELL_PHONE\"/><Cell col=\"6\" text=\"bind:COMPANY\"/><Cell col=\"7\" text=\"bind:JOB_POSITION\"/><Cell col=\"8\" text=\"bind:ASSIGNMENT\"/><Cell col=\"9\" text=\"bind:OFFICER_YN\"/><Cell col=\"10\" text=\"bind:FAX\"/><Cell col=\"11\" text=\"bind:ZIP_CODE\"/><Cell col=\"12\" text=\"bind:ADDRESS\"/><Cell col=\"13\" text=\"bind:COMP_ZIP_CODE\"/><Cell col=\"14\" text=\"bind:COMP_ADDRESS\"/><Cell col=\"15\" text=\"bind:EMAIL\"/><Cell col=\"16\" text=\"bind:DEPT_ID\"/><Cell col=\"17\" text=\"bind:PASSWORD\"/></Band></Format></Formats>");
            this.div_body.addChild(obj.name, obj);
            obj = new Button("btn_save", "absolute", "1095", "6", "120", "26", null, null, this.div_body);
            obj.set_taborder("0");
            obj.set_text("저장");
            obj.set_visible("false");
            this.div_body.addChild(obj.name, obj);
            obj = new Button("btn_new", "absolute", "969", "7", "120", "26", null, null, this.div_body);
            obj.set_taborder("1");
            obj.set_text("신규");
            obj.set_visible("false");
            this.div_body.addChild(obj.name, obj);

            obj = new Button("btn_folding", "absolute", "47%", "98", "80", "12", null, null, this);
            obj.set_taborder("3");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 0, 99, this.div_search,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("0");
            		p.style.set_border("1 solid #808080ff");
            		p.set_text("div_search");

            	}
            );
            this.div_search.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 0, 0, this.div_body,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("2");
            		p.set_text("div_body");
            		p.style.set_border("1 solid #808080ff");

            	}
            );
            this.div_body.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 1224, 660, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("sample00");
            		p.set_titletext("공통-Base Script");

            	}
            );
            obj.set_stepcount("");
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.addIncludeScript("sample00.xfdl", "lib::comForm.xjs");
        this.addIncludeScript("sample00.xfdl", "lib::comTransaction.xjs");
        this.registerScript("sample00.xfdl", function() {
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

        	//화면 초기설정
        	this.fn_init();
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

        //저장
        //1. 저장 함수는 fn_save로 작성한다.
        //2. 저장 Transaction에 대한 구분은 transaction id 로 기술한다.
        //3. 저장 후 Callback 함수는 fn_save 함수 다음에 위치하며 함수명은 fn_saveCallback 으로 작성한다.
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
        //
        this.fn_userfunc = function()
        {
        }

        //-------------------------------------------------------------------------------------------------
        // 5. Event 함수 정의
        //------------------------------------------------------------------------------------------------

        //조회버튼클릭 시 
        this.div_search_btn_search_onclick = function(obj,e)
        {
        	//TO-DO : 조회 전 필요한 경우 Validation체크
        	
        	//조회
        	this.fn_search("searchlist");
        }

        //신규버튼 클릭 시
        this.div_body_btn_new_onclick = function(obj,e)
        {
        	
        }

        //저장버튼 클릭 시
        this.div_body_btn_save_onclick = function(obj,e)
        {
        	//TO-DO : 저장 전 필요한 경우 Validation체크
        	
        	//저장하시겠습니까?
        	if(!this.gfn_confirm("beforesave")) return false;
        	
        	//저장
        	this.fn_save("savelist");
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.form_onload, this);
            this.div_search.btn_search.addEventHandler("onclick", this.div_search_btn_search_onclick, this);
            this.div_body.btn_save.addEventHandler("onclick", this.div_body_btn_save_onclick, this);
            this.div_body.btn_new.addEventHandler("onclick", this.div_body_btn_new_onclick, this);

        };

        this.loadIncludeScript("sample00.xfdl");

       
    };
}
)();
