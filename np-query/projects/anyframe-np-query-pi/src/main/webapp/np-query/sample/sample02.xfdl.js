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
                this.set_name("sample001");
                this.set_classname("sample001");
                this.set_titletext("CRUD");
                this._setFormPosition(0,0,907,736);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_cond", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"ID\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_list", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"_chk\" type=\"string\" size=\"256\"/><Column id=\"USER_ID\" type=\"string\" size=\"16\"/><Column id=\"USER_NAME\" type=\"string\" size=\"20\"/><Column id=\"EN_NAME\" type=\"string\" size=\"20\"/><Column id=\"COMP_PHONE\" type=\"string\" size=\"20\"/><Column id=\"PHONE\" type=\"string\" size=\"20\"/><Column id=\"CELL_PHONE\" type=\"string\" size=\"20\"/><Column id=\"COMPANY\" type=\"string\" size=\"20\"/><Column id=\"JOB_POSITION\" type=\"string\" size=\"20\"/><Column id=\"ASSIGNMENT\" type=\"string\" size=\"20\"/><Column id=\"OFFICER_YN\" type=\"string\" size=\"1\"/><Column id=\"FAX\" type=\"string\" size=\"20\"/><Column id=\"ZIP_CODE\" type=\"string\" size=\"10\"/><Column id=\"ADDRESS\" type=\"string\" size=\"100\"/><Column id=\"COMP_ZIP_CODE\" type=\"string\" size=\"10\"/><Column id=\"COMP_ADDRESS\" type=\"string\" size=\"100\"/><Column id=\"EMAIL\" type=\"string\" size=\"30\"/><Column id=\"DEPT_ID\" type=\"string\" size=\"16\"/><Column id=\"PASSWORD\" type=\"string\" size=\"16\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_master", this);
            obj._setContents("<ColumnInfo><Column id=\"_chk\" type=\"string\" size=\"256\"/><Column id=\"MOVIE_ID\" type=\"string\" size=\"16\"/><Column id=\"TITLE\" type=\"string\" size=\"50\"/><Column id=\"DIRECTOR\" type=\"string\" size=\"50\"/><Column id=\"GENRE_ID\" type=\"string\" size=\"16\"/><Column id=\"ACTORS\" type=\"string\" size=\"100\"/><Column id=\"RUNTIME\" type=\"bigdecimal\" size=\"3\"/><Column id=\"RELEASE_DATE\" type=\"date\" size=\"10\"/><Column id=\"TICKET_PRICE\" type=\"bigdecimal\" size=\"6\"/><Column id=\"NOW_PLAYING\" type=\"string\" size=\"1\"/><Column id=\"POSTER_FILE\" type=\"string\" size=\"1000\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_detail", this);
            obj._setContents("");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_temp", this);
            obj._setContents("");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_total", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"_chk\" type=\"string\" size=\"256\"/><Column id=\"USER_ID\" type=\"string\" size=\"16\"/><Column id=\"USER_NAME\" type=\"string\" size=\"20\"/><Column id=\"EN_NAME\" type=\"string\" size=\"20\"/><Column id=\"COMP_PHONE\" type=\"string\" size=\"20\"/><Column id=\"PHONE\" type=\"string\" size=\"20\"/><Column id=\"CELL_PHONE\" type=\"string\" size=\"20\"/><Column id=\"COMPANY\" type=\"string\" size=\"20\"/><Column id=\"JOB_POSITION\" type=\"string\" size=\"20\"/><Column id=\"ASSIGNMENT\" type=\"string\" size=\"20\"/><Column id=\"OFFICER_YN\" type=\"string\" size=\"1\"/><Column id=\"FAX\" type=\"string\" size=\"20\"/><Column id=\"ZIP_CODE\" type=\"string\" size=\"10\"/><Column id=\"ADDRESS\" type=\"string\" size=\"100\"/><Column id=\"COMP_ZIP_CODE\" type=\"string\" size=\"10\"/><Column id=\"COMP_ADDRESS\" type=\"string\" size=\"100\"/><Column id=\"EMAIL\" type=\"string\" size=\"30\"/><Column id=\"DEPT_ID\" type=\"string\" size=\"16\"/><Column id=\"PASSWORD\" type=\"string\" size=\"16\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Button("btn_search", "absolute", null, "36", "112", "40", "277", null, this);
            obj.set_taborder("3");
            obj.set_text("조회");
            obj.set_cssclass("btn_WF_Search");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit00", "absolute", "174", "43", "140", "28", null, null, this);
            obj.set_taborder("4");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00", "absolute", "20", "88", null, "131", "20", null, this);
            obj.set_taborder("5");
            obj.set_binddataset("ds_list");
            obj.set_autoenter("select");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"122\"/><Column size=\"105\"/><Column size=\"146\"/><Column size=\"172\"/><Column size=\"80\"/><Column size=\"107\"/><Column size=\"289\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"아이디\"/><Cell col=\"1\" text=\"패스워드\"/><Cell col=\"2\" text=\"성명\"/><Cell col=\"3\" text=\"영문명\"/><Cell col=\"4\" text=\"휴대폰번호\"/><Cell col=\"5\" text=\"직책\"/><Cell col=\"6\" text=\"부서\"/><Cell col=\"7\" text=\"주소\"/></Band><Band id=\"body\"><Cell edittype=\"normal\" text=\"bind:USER_ID\"/><Cell col=\"1\" edittype=\"normal\" text=\"bind:PASSWORD\"/><Cell col=\"2\" edittype=\"normal\" text=\"bind:USER_NAME\"/><Cell col=\"3\" edittype=\"normal\" text=\"bind:EN_NAME\"/><Cell col=\"4\" edittype=\"normal\" text=\"bind:CELL_PHONE\"/><Cell col=\"5\" edittype=\"normal\" text=\"bind:JOB_POSITION\"/><Cell col=\"6\" edittype=\"normal\" text=\"bind:DEPT_ID\"/><Cell col=\"7\" edittype=\"normal\" text=\"bind:ADDRESS\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Button("Button01", "absolute", null, "36", "80", "40", "106", null, this);
            obj.set_taborder("6");
            obj.set_text("저장");
            obj.set_cssclass("btn_WF_CRUD");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit01", "absolute", "198", "271", "140", "29", null, null, this);
            obj.set_taborder("7");
            this.addChild(obj.name, obj);

            obj = new Combo("Combo00", "absolute", "25", "271", "150", "29", null, null, this);
            this.addChild(obj.name, obj);
            var Combo00_innerdataset = new Dataset("Combo00_innerdataset", this.Combo00);
            Combo00_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">Y</Col><Col id=\"datacolumn\">바로재생</Col></Row><Row><Col id=\"codecolumn\">N</Col><Col id=\"datacolumn\">미재생</Col></Row></Rows>");
            obj.set_innerdataset(Combo00_innerdataset);
            obj.set_taborder("8");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_value("0");
            obj.set_text("제목");
            obj.set_index("0");

            obj = new Button("btn_search00", "absolute", null, "265", "112", "40", "275", null, this);
            obj.set_taborder("9");
            obj.set_text("조회");
            obj.set_cssclass("btn_WF_Search");
            this.addChild(obj.name, obj);

            obj = new Button("Button00", "absolute", null, "265", "80", "40", "104", null, this);
            obj.set_taborder("10");
            obj.set_text("저장");
            obj.set_cssclass("btn_WF_CRUD");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid01", "absolute", "26", "318", "862", "154", null, null, this);
            obj.set_taborder("11");
            obj.set_binddataset("ds_master");
            obj.set_autoenter("select");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"103\"/><Column size=\"80\"/><Column size=\"113\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"143\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"아이디\"/><Cell col=\"1\" text=\"영화명\"/><Cell col=\"2\" text=\"감독\"/><Cell col=\"3\" text=\"장르\"/><Cell col=\"4\" text=\"배우\"/><Cell col=\"5\" text=\"상영시간\"/><Cell col=\"6\" text=\"상영일\"/><Cell col=\"7\" text=\"금액\"/><Cell col=\"8\" text=\"현재상영작\"/><Cell col=\"9\" text=\"POSTER_FILE\"/></Band><Band id=\"body\"><Cell edittype=\"normal\" text=\"bind:MOVIE_ID\"/><Cell col=\"1\" edittype=\"normal\" text=\"bind:TITLE\"/><Cell col=\"2\" edittype=\"normal\" text=\"bind:DIRECTOR\"/><Cell col=\"3\" edittype=\"normal\" text=\"bind:GENRE_ID\"/><Cell col=\"4\" edittype=\"normal\" text=\"bind:ACTORS\"/><Cell col=\"5\" edittype=\"normal\" text=\"bind:RUNTIME\"/><Cell col=\"6\" displaytype=\"date\" edittype=\"date\" text=\"bind:RELEASE_DATE\"/><Cell col=\"7\" edittype=\"normal\" text=\"bind:TICKET_PRICE\"/><Cell col=\"8\" edittype=\"normal\" text=\"bind:NOW_PLAYING\"/><Cell col=\"9\" edittype=\"normal\" text=\"bind:POSTER_FILE\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("Static00", "absolute", "22", "6", "327", "30", null, null, this);
            obj.set_taborder("13");
            obj.set_text("공통 Service");
            obj.set_cssclass("sta_WF_SearchLabel");
            this.addChild(obj.name, obj);

            obj = new Static("Static01", "absolute", "22", "232", "327", "30", null, null, this);
            obj.set_taborder("14");
            obj.set_text("사용자 Service");
            obj.set_cssclass("sta_WF_SearchLabel");
            this.addChild(obj.name, obj);

            obj = new Combo("cbo_type", "absolute", "25", "43", "150", "28", null, null, this);
            this.addChild(obj.name, obj);
            var cbo_type_innerdataset = new Dataset("cbo_type_innerdataset", this.cbo_type);
            cbo_type_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">0</Col><Col id=\"datacolumn\">이름</Col></Row><Row><Col id=\"codecolumn\">1</Col><Col id=\"datacolumn\">아이디</Col></Row></Rows>");
            obj.set_innerdataset(cbo_type_innerdataset);
            obj.set_taborder("15");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_value("0");
            obj.set_text("이름");
            obj.set_index("0");

            obj = new Button("Button02", "absolute", null, "36", "80", "40", "191", null, this);
            obj.set_taborder("16");
            obj.set_text("신규");
            obj.set_cssclass("btn_WF_CRUD");
            this.addChild(obj.name, obj);

            obj = new Button("Button03", "absolute", null, "36", "80", "40", "21", null, this);
            obj.set_taborder("17");
            obj.set_text("삭제");
            obj.set_cssclass("btn_WF_CRUD");
            this.addChild(obj.name, obj);

            obj = new Button("Button04", "absolute", null, "265", "80", "40", "188", null, this);
            obj.set_taborder("18");
            obj.set_text("신규");
            obj.set_cssclass("btn_WF_CRUD");
            this.addChild(obj.name, obj);

            obj = new Button("Button05", "absolute", null, "265", "80", "40", "21", null, this);
            obj.set_taborder("19");
            obj.set_text("삭제");
            obj.set_cssclass("btn_WF_CRUD");
            this.addChild(obj.name, obj);

            obj = new Button("btn_search01", "absolute", null, "516", "112", "40", "21", null, this);
            obj.set_taborder("20");
            obj.set_text("조회");
            obj.set_cssclass("btn_WF_Search");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit02", "absolute", "174", "523", "140", "28", null, null, this);
            obj.set_taborder("21");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid02", "absolute", "20", "568", null, "131", "20", null, this);
            obj.set_taborder("22");
            obj.set_binddataset("ds_total");
            obj.set_autoenter("select");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"40\"/><Column size=\"80\"/><Column size=\"122\"/><Column size=\"105\"/><Column size=\"146\"/><Column size=\"172\"/><Column size=\"80\"/><Column size=\"107\"/><Column size=\"289\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell/><Cell col=\"1\" text=\"아이디\"/><Cell col=\"2\" text=\"패스워드\"/><Cell col=\"3\" text=\"성명\"/><Cell col=\"4\" text=\"영문명\"/><Cell col=\"5\" text=\"휴대폰번호\"/><Cell col=\"6\" text=\"직책\"/><Cell col=\"7\" text=\"부서\"/><Cell col=\"8\" text=\"주소\"/></Band><Band id=\"body\"><Cell expr=\"expr:currow+1\"/><Cell col=\"1\" edittype=\"normal\" text=\"bind:USER_ID\"/><Cell col=\"2\" edittype=\"normal\" text=\"bind:PASSWORD\"/><Cell col=\"3\" edittype=\"normal\" text=\"bind:USER_NAME\"/><Cell col=\"4\" edittype=\"normal\" text=\"bind:EN_NAME\"/><Cell col=\"5\" edittype=\"normal\" text=\"bind:CELL_PHONE\"/><Cell col=\"6\" edittype=\"normal\" text=\"bind:JOB_POSITION\"/><Cell col=\"7\" edittype=\"normal\" text=\"bind:DEPT_ID\"/><Cell col=\"8\" edittype=\"normal\" text=\"bind:ADDRESS\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("Static02", "absolute", "22", "486", "327", "30", null, null, this);
            obj.set_taborder("24");
            obj.set_text("Scroll 시 Paging 조회");
            obj.set_cssclass("sta_WF_SearchLabel");
            this.addChild(obj.name, obj);

            obj = new Combo("cbo_type00", "absolute", "25", "523", "150", "28", null, null, this);
            this.addChild(obj.name, obj);
            var cbo_type00_innerdataset = new Dataset("cbo_type00_innerdataset", this.cbo_type00);
            cbo_type00_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">0</Col><Col id=\"datacolumn\">이름</Col></Row><Row><Col id=\"codecolumn\">1</Col><Col id=\"datacolumn\">아이디</Col></Row></Rows>");
            obj.set_innerdataset(cbo_type00_innerdataset);
            obj.set_taborder("25");
            obj.set_value("0");
            obj.set_text("이름");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_index("0");


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 907, 736, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("sample001");
            		p.set_titletext("CRUD");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information
            obj = new BindItem("item0","div_Search.edt_id","value","ds_con","ID");
            this.addChild(obj.name, obj);
            obj.bind();

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.addIncludeScript("sample02.xfdl", "lib::comForm.xjs");
        this.addIncludeScript("sample02.xfdl", "lib::comTransaction.xjs");
        this.registerScript("sample02.xfdl", function() {
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

        //페이징 제어변수
        this.bPageSearch = true;
        this.nPageIndex = 1;
        this.nPageUnit = 5;
        this.nPageSize = 5;

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
         
        this.fn_search = function(svcId)
        {
        	switch(svcId)
        	{
        		case "searchlist" :
        			//조회조건 설정
        			this.ds_cond.clear();
        			this.ds_cond.addColumn("SEARCH_KEYWORD", "string");
        			this.ds_cond.addColumn("SEARCH_CONDITION", "string");
        			this.ds_cond.addRow();
        			this.ds_cond.setColumn(0, "SEARCH_KEYWORD", this.Edit00.value);
        			this.ds_cond.setColumn(0, "SEARCH_CONDITION", this.cbo_type.value);
        			
        			//Transaction 호출
        			var sSvcId = svcId;
        			var sInDatasets = "querySet1=ds_cond";
        			var sOutDatasets = "ds_list=querySet1";
        			var sCallbackFunc = "fn_searchCallback";			

        			var oConfig = {method:"getList", querylist:"querySet1=findXPUserList"};
        			
        			this.gfn_transaction(sSvcId, sInDatasets, sOutDatasets, sCallbackFunc, oConfig);
        									
        			break;
        			
        		case "searchlist_user" :
        			//조회조건 설정
        			this.ds_cond.clear();
        			this.ds_cond.addColumn("SEARCH_NOW_PLAYING", "string");
        			this.ds_cond.addColumn("SEARCH_TITLE", "string");
        			this.ds_cond.addRow();
        			this.ds_cond.setColumn(0, "SEARCH_NOW_PLAYING", this.Combo00.value);
        			this.ds_cond.setColumn(0, "SEARCH_TITLE", this.Edit01.value);
        			
        			//Transaction 호출
        			var sSvcId = svcId;
        			var sInDatasets = "dsSearch=ds_cond";
        			var sOutDatasets = "ds_master=dsResult";
        			var sCallbackFunc = "fn_searchCallback";
        			var oConfig = {controller:"spp.do", service:"npQueryMovieService", method:"getList"};
        			
        			this.gfn_transaction(sSvcId, sInDatasets, sOutDatasets, sCallbackFunc, oConfig);
        						
        			break;
        			
        		case "searchlist_page" :
        			//조회조건 설정
        			this.ds_cond.clear();
        			this.ds_cond.addColumn("SEARCH_KEYWORD", "string");
        			this.ds_cond.addColumn("SEARCH_CONDITION", "string");
        			this.ds_cond.addRow();
        			this.ds_cond.setColumn(0, "SEARCH_KEYWORD", this.Edit00.value);
        			this.ds_cond.setColumn(0, "SEARCH_CONDITION", this.cbo_type.value);
        			
        			//제어변수 추가
        			this.ds_cond.addConstColumn("pageIndex", this.nPageIndex);
        			this.ds_cond.addConstColumn("pageSize", this.nPageSize);
        			this.ds_cond.addConstColumn("pageUnit", this.nPageUnit);
        			
        			//Transaction 호출
        			var sSvcId = svcId;
        			var sInDatasets = "querySet1=ds_cond";
        			var sOutDatasets = "ds_temp=querySet1";
        			var sCallbackFunc = "fn_searchCallback";			

        			var oConfig = {method:"getPagingList", querylist:"querySet1=findXPUserList"};
        			
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
        		case "searchlist" :
        			trace(this.ds_list.saveXML());
        			break;
        			
        		case "searchlist_user" :
        			trace(this.ds_master.saveXML());			
        			break;
        			
        		case "searchlist_page" :
        			//조회된 데이타가 있는경우 데이타셋을 Merge한다.
        			if(this.ds_temp.rowcount > 0)
        			{
        				this.bPageSearch = true;
        				this.ds_total.appendData(this.ds_temp);
        			}
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
        			//Transaction 호출
        			var sSvcId = svcId;
        			var sInDatasets = "querySet1=ds_list:U";
        			var sOutDatasets = "";
        			var sCallbackFunc = "fn_saveCallback";
        			var oConfig = {method:"saveAll", querylist:"querySet1=createXPUser,updateXPUser,removeXPUser"};
        			
        			this.gfn_transaction(sSvcId, sInDatasets, sOutDatasets, sCallbackFunc, oConfig);		
        			break;
        			
        		case "savelist_user" :
        			//Transaction 호출
        			var sSvcId = svcId;
        			var sInDatasets = "dsSave=ds_master:U";
        			var sOutDatasets = "";
        			var sCallbackFunc = "fn_saveCallback";
        			var oConfig = {controller:"spp.do", service:"npQueryMovieService", method:"saveAll"};
        			
        			this.gfn_transaction(sSvcId, sInDatasets, sOutDatasets, sCallbackFunc, oConfig);		
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

        this.Edit00_onkeydown = function(obj,e)
        {
        	if(e.keycode == 13)
        	{
        		this.fn_search("searchlist");
        	}
        }

        //신규버튼 클릭 시
        this.Button02_onclick = function(obj,e)
        {
        	var nRow = this.ds_list.addRow();
        }

        //저장버튼 클릭 시
        this.Button01_onclick = function(obj,e)
        {
        	//TO-DO : 저장 전 필요한 경우 Validation체크
        	
        	//저장하시겠습니까?
        	if(!this.gfn_confirm("beforesave")) return false;
        	
        	//저장
        	this.fn_save("savelist");
        }

        //삭제
        this.Button03_onclick = function(obj,e)
        {
        	this.ds_list.deleteRow(this.ds_list.rowposition);
        }

        

        //사용자서비스 조회
        this.btn_search00_onclick = function(obj,e)
        {
        	this.fn_search("searchlist_user");
        }

        //사용자서비스 저장
        this.Button00_onclick = function(obj,e)
        {
        	this.fn_save("savelist_user");
        }

        //사용자서비스 신규
        this.Button04_onclick = function(obj,e)
        {
        	var nRow = this.ds_master.addRow();
        }

        //사용자서비스 삭제
        this.Button05_onclick = function(obj,e)
        {
        	this.ds_master.deleteRow(this.ds_master.rowposition);
        }

        
        //Scrolling 시 Paging 처리
        this.btn_search01_onclick = function(obj,e)
        {
        	//최초 조회시 초기화
        	this.ds_total.clearData();
        	this.nPageIndex = 1;
        	this.bPageSearch = false;
        	
        	//조회
        	this.fn_search("searchlist_page");
        }

        this.Grid02_onvscroll = function(obj,e)
        {
        	if(e.type.indexOf("lastover") > -1)
        	{
        		//조회가 완료된 후에만 조회가능
        		if(this.bPageSearch)
        		{
        			this.nPageIndex++;
        			this.bPageSearch = false;
        			this.fn_search("searchlist_page");
        		}
        	}	
        }

        
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.form_onload, this);
            this.btn_search.addEventHandler("onclick", this.div_search_btn_search_onclick, this);
            this.Edit00.addEventHandler("onkeydown", this.Edit00_onkeydown, this);
            this.Grid00.addEventHandler("onvscroll", this.Grid00_onvscroll, this);
            this.Button01.addEventHandler("onclick", this.Button01_onclick, this);
            this.btn_search00.addEventHandler("onclick", this.btn_search00_onclick, this);
            this.Button00.addEventHandler("onclick", this.Button00_onclick, this);
            this.cbo_type.addEventHandler("onitemchanged", this.Combo01_onitemchanged, this);
            this.Button02.addEventHandler("onclick", this.Button02_onclick, this);
            this.Button03.addEventHandler("onclick", this.Button03_onclick, this);
            this.Button04.addEventHandler("onclick", this.Button04_onclick, this);
            this.Button05.addEventHandler("onclick", this.Button05_onclick, this);
            this.btn_search01.addEventHandler("onclick", this.btn_search01_onclick, this);
            this.Edit02.addEventHandler("onkeydown", this.Edit00_onkeydown, this);
            this.Grid02.addEventHandler("onvscroll", this.Grid02_onvscroll, this);
            this.cbo_type00.addEventHandler("onitemchanged", this.Combo01_onitemchanged, this);

        };

        this.loadIncludeScript("sample02.xfdl");

       
    };
}
)();
