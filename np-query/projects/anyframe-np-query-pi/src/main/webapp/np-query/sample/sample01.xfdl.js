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
                this.set_titletext("공통-개발참고");
                this._setFormPosition(0,0,1224,660);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_list", this);
            obj._setContents("<ColumnInfo><Column id=\"Column0\" type=\"STRING\" size=\"256\"/><Column id=\"Column1\" type=\"STRING\" size=\"256\"/><Column id=\"Column2\" type=\"STRING\" size=\"256\"/><Column id=\"Column3\" type=\"STRING\" size=\"256\"/><Column id=\"Column4\" type=\"STRING\" size=\"256\"/><Column id=\"Column5\" type=\"STRING\" size=\"256\"/><Column id=\"Column6\" type=\"STRING\" size=\"256\"/><Column id=\"Column7\" type=\"STRING\" size=\"256\"/><Column id=\"Column8\" type=\"STRING\" size=\"256\"/><Column id=\"Column9\" type=\"STRING\" size=\"256\"/><Column id=\"Column10\" type=\"STRING\" size=\"256\"/><Column id=\"Column11\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"Column3\">나환자</Col><Col id=\"Column4\">F/35</Col><Col id=\"Column5\">진료</Col><Col id=\"Column6\">20160609</Col><Col id=\"Column7\">정형외과</Col><Col id=\"Column2\">20160103</Col><Col id=\"Column8\">김의사</Col><Col id=\"Column9\">Y</Col><Col id=\"Column10\">N</Col><Col id=\"Column0\">1</Col></Row><Row><Col id=\"Column3\">홍길동</Col><Col id=\"Column4\">F/35</Col><Col id=\"Column5\">부도</Col><Col id=\"Column6\">20160609</Col><Col id=\"Column7\">내분비대사내과분과</Col><Col id=\"Column2\">20160103</Col><Col id=\"Column8\">전명의</Col><Col id=\"Column9\">Y</Col><Col id=\"Column10\">N</Col><Col id=\"Column0\">2</Col></Row><Row><Col id=\"Column0\">3</Col><Col id=\"Column2\">20160103</Col><Col id=\"Column3\">나환자</Col><Col id=\"Column4\">F/35</Col><Col id=\"Column5\">진료</Col><Col id=\"Column6\">20160609</Col><Col id=\"Column7\">외과</Col><Col id=\"Column8\">김의사</Col><Col id=\"Column9\">Y</Col><Col id=\"Column10\">Y</Col></Row><Row><Col id=\"Column0\">4</Col><Col id=\"Column2\">20160103</Col><Col id=\"Column3\">홍길동</Col><Col id=\"Column4\">F/35</Col><Col id=\"Column5\">부도</Col><Col id=\"Column6\">20160609</Col><Col id=\"Column7\">비뇨기과</Col><Col id=\"Column8\">전명의</Col><Col id=\"Column10\">Y</Col><Col id=\"Column9\">N</Col></Row><Row><Col id=\"Column0\">5</Col><Col id=\"Column2\">20160103</Col><Col id=\"Column3\">나환자</Col><Col id=\"Column4\">F/35</Col><Col id=\"Column5\">진료</Col><Col id=\"Column6\">20160609</Col><Col id=\"Column7\">소화기내과</Col><Col id=\"Column8\">김의사</Col></Row><Row><Col id=\"Column0\">6</Col><Col id=\"Column2\">20160103</Col><Col id=\"Column3\">홍길동</Col><Col id=\"Column4\">F/35</Col><Col id=\"Column5\">부도</Col><Col id=\"Column6\">20160609</Col><Col id=\"Column7\">정형외과</Col><Col id=\"Column8\">전명의</Col><Col id=\"Column9\">Y</Col><Col id=\"Column10\">Y</Col></Row><Row><Col id=\"Column0\">7</Col><Col id=\"Column2\">20160103</Col><Col id=\"Column3\">나환자</Col><Col id=\"Column4\">F/35</Col><Col id=\"Column5\">진료</Col><Col id=\"Column6\">20160609</Col><Col id=\"Column7\">내분비대사내과분과</Col><Col id=\"Column8\">김의사</Col><Col id=\"Column9\">Y</Col></Row><Row><Col id=\"Column0\">8</Col><Col id=\"Column2\">20160103</Col><Col id=\"Column3\">홍길동</Col><Col id=\"Column4\">F/35</Col><Col id=\"Column5\">진료</Col><Col id=\"Column6\">20160609</Col><Col id=\"Column7\">외과</Col><Col id=\"Column8\">전명의</Col><Col id=\"Column10\">Y</Col><Col id=\"Column9\">N</Col></Row><Row><Col id=\"Column0\">9</Col><Col id=\"Column2\">20160103</Col><Col id=\"Column3\">나환자</Col><Col id=\"Column4\">F/35</Col><Col id=\"Column5\">부도</Col><Col id=\"Column6\">20160609</Col><Col id=\"Column7\">비뇨기과</Col><Col id=\"Column8\">김의사</Col><Col id=\"Column9\">Y</Col></Row><Row><Col id=\"Column0\">10</Col><Col id=\"Column2\">20160103</Col><Col id=\"Column3\">홍길동</Col><Col id=\"Column4\">F/35</Col><Col id=\"Column5\">진료</Col><Col id=\"Column6\">20160609</Col><Col id=\"Column7\">소화기내과</Col><Col id=\"Column8\">전명의</Col><Col id=\"Column10\">Y</Col><Col id=\"Column9\">N</Col></Row><Row><Col id=\"Column0\">11</Col><Col id=\"Column2\">20160103</Col><Col id=\"Column3\">나환자</Col><Col id=\"Column4\">F/35</Col><Col id=\"Column5\">부도</Col><Col id=\"Column6\">20160609</Col><Col id=\"Column7\">정형외과</Col><Col id=\"Column8\">김의사</Col><Col id=\"Column9\">Y</Col></Row><Row><Col id=\"Column0\">12</Col><Col id=\"Column2\">20160103</Col><Col id=\"Column3\">홍길동</Col><Col id=\"Column4\">F/35</Col><Col id=\"Column5\">진료</Col><Col id=\"Column6\">20160609</Col><Col id=\"Column7\">내분비대사내과분과</Col><Col id=\"Column8\">전명의</Col><Col id=\"Column10\">N</Col></Row><Row/><Row/><Row/></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_cond", this);
            obj._setContents("");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Div("div_search", "absolute", "0", "0", "1224", "100", null, null, this);
            obj.set_taborder("3");
            obj.set_cssclass("div_WF_SearchBg");
            this.addChild(obj.name, obj);
            obj = new Static("Static00", "absolute", "19", "13", "60", "30", null, null, this.div_search);
            obj.set_taborder("16");
            obj.set_text("기간");
            obj.set_cssclass("sta_WF_SearchLabel");
            this.div_search.addChild(obj.name, obj);
            obj = new Edit("Edit00", "absolute", "473", "53", "120", "29", null, null, this.div_search);
            obj.set_taborder("17");
            obj.set_value("홍길동");
            this.div_search.addChild(obj.name, obj);
            obj = new Edit("Edit01", "absolute", "739", "53", "120", "29", null, null, this.div_search);
            obj.set_taborder("18");
            obj.set_value("541203");
            this.div_search.addChild(obj.name, obj);
            obj = new Static("Static01", "absolute", "18", "53", "74", "30", null, null, this.div_search);
            obj.set_taborder("19");
            obj.set_text("환자구분");
            obj.set_cssclass("sta_WF_SearchLabel");
            this.div_search.addChild(obj.name, obj);
            obj = new Static("Static02", "absolute", "416", "53", "74", "30", null, null, this.div_search);
            obj.set_taborder("20");
            obj.set_text("환자명");
            obj.set_cssclass("sta_WF_SearchLabel");
            this.div_search.addChild(obj.name, obj);
            obj = new Static("Static03", "absolute", "613", "51", "122", "30", null, null, this.div_search);
            obj.set_taborder("21");
            obj.set_text("생년월일(6자리)");
            obj.set_cssclass("sta_WF_SearchLabel");
            this.div_search.addChild(obj.name, obj);
            obj = new Static("Static04", "absolute", "879", "52", "115", "30", null, null, this.div_search);
            obj.set_taborder("22");
            obj.set_text("관심환자만 조회");
            obj.set_cssclass("sta_WF_SearchLabel");
            this.div_search.addChild(obj.name, obj);
            obj = new Radio("Radio00", "absolute", "415", "17", "328", "26", null, null, this.div_search);
            this.div_search.addChild(obj.name, obj);
            var Radio00_innerdataset = new Dataset("Radio00_innerdataset", this.div_search.Radio00);
            Radio00_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">1</Col><Col id=\"datacolumn\">1개월</Col></Row><Row><Col id=\"codecolumn\">2</Col><Col id=\"datacolumn\">3개월</Col></Row><Row><Col id=\"codecolumn\">3</Col><Col id=\"datacolumn\">6개월</Col></Row><Row><Col id=\"codecolumn\">4</Col><Col id=\"datacolumn\">1년</Col></Row></Rows>");
            obj.set_innerdataset(Radio00_innerdataset);
            obj.set_taborder("23");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_direction("vertical");
            obj = new Radio("Radio01", "absolute", "93", "55", "306", "26", null, null, this.div_search);
            this.div_search.addChild(obj.name, obj);
            var Radio01_innerdataset = new Dataset("Radio01_innerdataset", this.div_search.Radio01);
            Radio01_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">1</Col><Col id=\"datacolumn\">전체</Col></Row><Row><Col id=\"codecolumn\">2</Col><Col id=\"datacolumn\">의뢰</Col></Row><Row><Col id=\"codecolumn\">3</Col><Col id=\"datacolumn\">되의뢰</Col></Row><Row><Col id=\"codecolumn\">4</Col><Col id=\"datacolumn\">조회요청</Col></Row></Rows>");
            obj.set_innerdataset(Radio01_innerdataset);
            obj.set_taborder("24");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_direction("vertical");
            obj = new CheckBox("CheckBox00", "absolute", "996", "59", "18", "18", null, null, this.div_search);
            obj.set_taborder("26");
            obj.set_text("CheckBox00");
            this.div_search.addChild(obj.name, obj);
            obj = new Button("Button00", "absolute", "1032", "43", "80", "40", null, null, this.div_search);
            obj.set_taborder("27");
            obj.set_text("조회");
            obj.set_cssclass("btn_WF_Search");
            this.div_search.addChild(obj.name, obj);
            obj = new Button("Button01", "absolute", "1122", "43", "80", "40", null, null, this.div_search);
            obj.set_taborder("28");
            obj.set_text("신규");
            obj.set_cssclass("btn_WF_CRUD");
            this.div_search.addChild(obj.name, obj);
            obj = new Div("div_period", "absolute", "93", "15", "304", "29", null, null, this.div_search);
            obj.set_taborder("29");
            obj.set_url("comm::comm_periodCalendar.xfdl");
            this.div_search.addChild(obj.name, obj);

            obj = new Static("Static01", "absolute", "1", "98", "1224", "20", null, null, this);
            obj.set_taborder("4");
            obj.set_text("H 20");
            obj.set_visible("false");
            obj.style.set_background("aqua");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("50");
            this.addChild(obj.name, obj);

            obj = new Div("Div01", "absolute", "0", "119", null, null, "0", "0", this);
            obj.set_taborder("5");
            obj.style.set_opacity("100");
            obj.set_cssclass("div_WF_WFBg");
            this.addChild(obj.name, obj);
            obj = new Grid("Grid00", "absolute", "20", "24", null, null, "20", "20", this.Div01);
            obj.set_taborder("0");
            obj.set_binddataset("ds_list");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"40\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"240\"/><Column size=\"40\"/><Column size=\"40\"/><Column size=\"40\"/></Columns><Rows><Row size=\"40\" band=\"head\"/><Row size=\"36\"/></Rows><Band id=\"head\"><Cell text=\"Column0\"/><Cell col=\"1\" text=\"Column1\"/><Cell col=\"2\" text=\"Column2\"/><Cell col=\"3\" text=\"Column3\"/><Cell col=\"4\" text=\"Column4\"/><Cell col=\"5\" text=\"Column5\"/><Cell col=\"6\" text=\"Column6\"/><Cell col=\"7\" text=\"Column7\"/><Cell col=\"8\" text=\"Column8\"/><Cell col=\"9\" text=\"Column9\"/><Cell col=\"10\" text=\"Column10\"/><Cell col=\"11\" text=\"Column11\"/></Band><Band id=\"body\"><Cell text=\"bind:Column0\"/><Cell col=\"1\" text=\"bind:Column1\"/><Cell col=\"2\" displaytype=\"date\" edittype=\"date\" text=\"bind:Column2\"/><Cell col=\"3\" text=\"bind:Column3\"/><Cell col=\"4\" text=\"bind:Column4\"/><Cell col=\"5\" text=\"bind:Column5\"/><Cell col=\"6\" text=\"bind:Column6\"/><Cell col=\"7\" text=\"bind:Column7\"/><Cell col=\"8\" text=\"bind:Column8\"/><Cell col=\"9\" text=\"bind:Column9\"/><Cell col=\"10\" text=\"bind:Column10\"/><Cell col=\"11\" text=\"bind:Column11\"/></Band></Format></Formats>");
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static02", "absolute", "1", "1", "1222", "15", null, null, this);
            obj.set_taborder("6");
            obj.set_text("H 15");
            obj.set_visible("false");
            obj.style.set_background("royalblue");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("30");
            this.addChild(obj.name, obj);

            obj = new Static("Static03", "absolute", "1", "83", "1222", "15", null, null, this);
            obj.set_taborder("7");
            obj.set_text("H 15");
            obj.set_visible("false");
            obj.style.set_background("royalblue");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("30");
            this.addChild(obj.name, obj);

            obj = new Static("Static04", "absolute", "1", "0", "20", "680", null, null, this);
            obj.set_taborder("8");
            obj.set_text("W \r\n20");
            obj.set_visible("false");
            obj.style.set_background("tomato");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("50");
            this.addChild(obj.name, obj);

            obj = new Static("Static06", "absolute", "79", "1", "15", "98", null, null, this);
            obj.set_taborder("9");
            obj.set_text("W \r\n15");
            obj.set_visible("false");
            obj.style.set_background("tomato");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("50");
            this.addChild(obj.name, obj);

            obj = new Static("Static07", "absolute", "398", "1", "20", "98", null, null, this);
            obj.set_taborder("10");
            obj.set_text("W \r\n20");
            obj.set_visible("false");
            obj.style.set_background("tomato");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("50");
            this.addChild(obj.name, obj);

            obj = new Static("Static08", "absolute", "594", "54", "20", "29", null, null, this);
            obj.set_taborder("11");
            obj.set_text("W \r\n20");
            obj.set_visible("false");
            obj.style.set_background("tomato");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("50");
            this.addChild(obj.name, obj);

            obj = new Static("Static09", "absolute", "725", "54", "15", "29", null, null, this);
            obj.set_taborder("12");
            obj.set_text("W \r\n15");
            obj.set_visible("false");
            obj.style.set_background("tomato");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("50");
            this.addChild(obj.name, obj);

            obj = new Static("Static10", "absolute", "860", "54", "20", "29", null, null, this);
            obj.set_taborder("13");
            obj.set_text("W \r\n20");
            obj.set_visible("false");
            obj.style.set_background("tomato");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("50");
            this.addChild(obj.name, obj);

            obj = new Static("Static11", "absolute", "1113", "44", "10", "40", null, null, this);
            obj.set_taborder("14");
            obj.set_text("W \r10");
            obj.set_visible("false");
            obj.style.set_background("tomato");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("50");
            this.addChild(obj.name, obj);

            obj = new Static("Static12", "absolute", "0", "44", "1022", "10", null, null, this);
            obj.set_taborder("15");
            obj.set_text("H10");
            obj.set_visible("false");
            obj.style.set_background("royalblue");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("30");
            this.addChild(obj.name, obj);

            obj = new Static("Static13", "absolute", "1203", "0", "20", "680", null, null, this);
            obj.set_taborder("16");
            obj.set_text("W \r\n20");
            obj.set_visible("false");
            obj.style.set_background("tomato");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("50");
            this.addChild(obj.name, obj);

            obj = new Static("Static05", "absolute", "0", "120", "1222", "24", null, null, this);
            obj.set_taborder("17");
            obj.set_text("H 24");
            obj.set_visible("false");
            obj.style.set_background("royalblue");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("30");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 1224, 100, this.div_search,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("3");
            		p.set_cssclass("div_WF_SearchBg");

            	}
            );
            this.div_search.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 0, 0, this.Div01,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("5");
            		p.style.set_opacity("100");
            		p.set_cssclass("div_WF_WFBg");

            	}
            );
            this.Div01.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 1224, 660, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("sample001");
            		p.set_titletext("공통-개발참고");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information
            obj = new BindItem("item0","div_Search.edt_id","value","ds_in","ID");
            this.addChild(obj.name, obj);
            obj.bind();

            
            // Remove Reference
            obj = null;
        };
        
        this.loadPreloadList = function()
        {
            this._addPreloadList("fdl", "comm::comm_periodCalendar.xfdl");
        };
        
        // User Script
        this.addIncludeScript("sample01.xfdl", "lib::comForm.xjs");
        this.registerScript("sample01.xfdl", function() {
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

        };

        this.loadIncludeScript("sample01.xfdl");
        this.loadPreloadList();
       
    };
}
)();
