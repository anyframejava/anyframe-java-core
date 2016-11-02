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
                this._setFormPosition(0,0,907,671);
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


            
            // UI Components Initialize
            obj = new Button("btn_search", "absolute", null, "36", "112", "40", "277", null, this);
            obj.set_taborder("3");
            obj.set_text("조회");
            obj.set_cssclass("btn_WF_Search");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit00", "absolute", "174", "43", "140", "28", null, null, this);
            obj.set_taborder("4");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00", "absolute", "20", "88", null, "171", "20", null, this);
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

            obj = new Edit("Edit01", "absolute", "198", "311", "140", "29", null, null, this);
            obj.set_taborder("7");
            this.addChild(obj.name, obj);

            obj = new Combo("Combo00", "absolute", "25", "311", "150", "29", null, null, this);
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

            obj = new Button("btn_search00", "absolute", null, "305", "112", "40", "107", null, this);
            obj.set_taborder("9");
            obj.set_text("조회");
            obj.set_cssclass("btn_WF_Search");
            this.addChild(obj.name, obj);

            obj = new Button("Button00", "absolute", null, "305", "80", "40", "19", null, this);
            obj.set_taborder("10");
            obj.set_text("저장");
            obj.set_cssclass("btn_WF_CRUD");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid01", "absolute", "26", "358", "862", "290", null, null, this);
            obj.set_taborder("11");
            obj.set_binddataset("ds_master");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row band=\"head\" size=\"24\"/><Row band=\"body\" size=\"24\"/></Rows><Band id=\"head\"><Cell col=\"0\" disptype=\"normal\" text=\"_chk\"/><Cell col=\"1\" disptype=\"normal\" text=\"MOVIE_ID\"/><Cell col=\"2\" disptype=\"normal\" text=\"TITLE\"/><Cell col=\"3\" disptype=\"normal\" text=\"DIRECTOR\"/><Cell col=\"4\" disptype=\"normal\" text=\"GENRE_ID\"/><Cell col=\"5\" disptype=\"normal\" text=\"ACTORS\"/><Cell col=\"6\" disptype=\"normal\" text=\"RUNTIME\"/><Cell col=\"7\" disptype=\"normal\" text=\"RELEASE_DATE\"/><Cell col=\"8\" disptype=\"normal\" text=\"TICKET_PRICE\"/><Cell col=\"9\" disptype=\"normal\" text=\"NOW_PLAYING\"/><Cell col=\"10\" disptype=\"normal\" text=\"POSTER_FILE\"/></Band><Band id=\"body\"><Cell col=\"0\" disptype=\"normal\" text=\"bind:_chk\"/><Cell col=\"1\" disptype=\"normal\" text=\"bind:MOVIE_ID\"/><Cell col=\"2\" disptype=\"normal\" text=\"bind:TITLE\"/><Cell col=\"3\" disptype=\"normal\" text=\"bind:DIRECTOR\"/><Cell col=\"4\" disptype=\"normal\" text=\"bind:GENRE_ID\"/><Cell col=\"5\" disptype=\"normal\" text=\"bind:ACTORS\"/><Cell col=\"6\" disptype=\"normal\" text=\"bind:RUNTIME\"/><Cell col=\"7\" disptype=\"normal\" text=\"bind:RELEASE_DATE\"/><Cell col=\"8\" disptype=\"normal\" text=\"bind:TICKET_PRICE\"/><Cell col=\"9\" disptype=\"normal\" text=\"bind:NOW_PLAYING\"/><Cell col=\"10\" disptype=\"normal\" text=\"bind:POSTER_FILE\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("Static00", "absolute", "22", "6", "327", "30", null, null, this);
            obj.set_taborder("13");
            obj.set_text("공통 Service");
            obj.set_cssclass("sta_WF_SearchLabel");
            this.addChild(obj.name, obj);

            obj = new Static("Static01", "absolute", "22", "272", "327", "30", null, null, this);
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


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 907, 671, this,
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
        			var oConfig = {method:"getList", query:"querySet1=findXPUserList"};//getList, saveAll, create, get, update
        			
        			this.gfn_transaction(sSvcId, sInDatasets, sOutDatasets, sCallbackFunc, oConfig);
        									
        			break;
        			
        		case "searchlist_multi" :
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
        			var oConfig = {controller:"xpQueryMovie.do", service:"xpQueryMovieService", method:"getList"};
        			
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
        			
        		case "searchlist_multi" :
        			trace(this.ds_master.saveXML());			
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
        			var sMethodId = "saveAll";//getList, saveAll, create, get, update
        			var sQueryList = "querySet1=createXPUser,updateXPUser,removeXPUser";
        			var sInDatasets = "querySet1=ds_list:U";
        			var sOutDatasets = "";
        			var sCallbackFunc = "fn_saveCallback";
        			
        			this.gfn_transaction(sSvcId, sMethodId, sQueryList, sInDatasets, sOutDatasets, sCallbackFunc, oUserConfig);		
        			break;
        			
        		case "savelist_multi" :
        			//Transaction 호출
        			var sSvcId = svcId;
        			var sMethodId = "saveAll";//getList, saveAll, create, get, update
        			var sQueryList = "querySet1=createXPBoard,updateXPBoard,removeXPBoard querySet2=createXPBoard,updateXPBoard,removeXPBoard";
        			var sInDatasets = "querySet1=ds_master:U querySet2=ds_detail:U";
        			var sOutDatasets = "";
        			var sCallbackFunc = "fn_saveCallback";
        			
        			this.gfn_transaction(sSvcId, sMethodId, sQueryList, sInDatasets, sOutDatasets, sCallbackFunc);		
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

        //다건조회
        this.btn_search00_onclick = function(obj,e)
        {
        	this.fn_search("searchlist_multi");
        }

        //다건저장
        this.Button00_onclick = function(obj,e)
        {
        	this.fn_save("savelist_multi");
        }

        this.Edit00_onkeydown = function(obj,e)
        {
        	if(e.keycode == 13)
        	{
        		this.fn_search("searchlist");
        	}
        }

        

        
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.form_onload, this);
            this.btn_search.addEventHandler("onclick", this.div_search_btn_search_onclick, this);
            this.Edit00.addEventHandler("onkeydown", this.Edit00_onkeydown, this);
            this.Button01.addEventHandler("onclick", this.Button01_onclick, this);
            this.btn_search00.addEventHandler("onclick", this.btn_search00_onclick, this);
            this.Button00.addEventHandler("onclick", this.Button00_onclick, this);
            this.cbo_type.addEventHandler("onitemchanged", this.Combo01_onitemchanged, this);
            this.Button02.addEventHandler("onclick", this.Button02_onclick, this);
            this.Button03.addEventHandler("onclick", this.Button03_onclick, this);

        };

        this.loadIncludeScript("sample02.xfdl");

       
    };
}
)();
