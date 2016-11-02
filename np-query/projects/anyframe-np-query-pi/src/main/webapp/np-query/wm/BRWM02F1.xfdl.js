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
                this.set_name("BRWM02F1");
                this.set_classname("sample10");
                this.set_titletext("통합환자조회");
                this._setFormPosition(0,0,1224,660);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_list", this);
            obj._setContents("<ColumnInfo><Column id=\"GUBUN\" type=\"STRING\" size=\"256\"/><Column id=\"REQ_DT\" type=\"STRING\" size=\"256\"/><Column id=\"PATIENT_ID\" type=\"STRING\" size=\"256\"/><Column id=\"PATIENT_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"SEX\" type=\"STRING\" size=\"256\"/><Column id=\"AGE\" type=\"STRING\" size=\"256\"/><Column id=\"PROG_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"TREAT_DT\" type=\"STRING\" size=\"256\"/><Column id=\"TREAT_DEPT\" type=\"STRING\" size=\"256\"/><Column id=\"PHYSICIAN_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"SPECIAL_TREAT\" type=\"STRING\" size=\"256\"/><Column id=\"OPEN_INFO\" type=\"STRING\" size=\"256\"/><Column id=\"CONCERN_PATIENT\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"GUBUN\">S</Col><Col id=\"REQ_DT\">20151230</Col><Col id=\"PATIENT_NAME\">나환자</Col><Col id=\"SEX\">F</Col><Col id=\"AGE\">30</Col><Col id=\"PROG_TYPE\">P</Col><Col id=\"TREAT_DT\">20160301</Col><Col id=\"TREAT_DEPT\">외과</Col><Col id=\"PHYSICIAN_NAME\">김의사</Col><Col id=\"SPECIAL_TREAT\">Y</Col><Col id=\"OPEN_INFO\">Y</Col><Col id=\"CONCERN_PATIENT\">Y</Col><Col id=\"PATIENT_ID\">aa001</Col></Row><Row><Col id=\"GUBUN\">R</Col><Col id=\"REQ_DT\">20151230</Col><Col id=\"PATIENT_NAME\">홍길동</Col><Col id=\"SEX\">M</Col><Col id=\"AGE\">30</Col><Col id=\"PROG_TYPE\">S</Col><Col id=\"TREAT_DT\">20160301</Col><Col id=\"TREAT_DEPT\">비뇨기과</Col><Col id=\"PHYSICIAN_NAME\">정명의</Col><Col id=\"SPECIAL_TREAT\">Y</Col><Col id=\"OPEN_INFO\">Y</Col><Col id=\"CONCERN_PATIENT\">Y</Col><Col id=\"PATIENT_ID\">aa002</Col></Row><Row><Col id=\"GUBUN\">I</Col><Col id=\"REQ_DT\">20151230</Col><Col id=\"PATIENT_NAME\">나환자</Col><Col id=\"SEX\">F</Col><Col id=\"AGE\">30</Col><Col id=\"PROG_TYPE\">P</Col><Col id=\"TREAT_DT\">20160301</Col><Col id=\"TREAT_DEPT\">소화기내과분과</Col><Col id=\"PHYSICIAN_NAME\">김의사</Col><Col id=\"SPECIAL_TREAT\">Y</Col><Col id=\"OPEN_INFO\">N</Col><Col id=\"CONCERN_PATIENT\">Y</Col><Col id=\"PATIENT_ID\">aa003</Col></Row><Row><Col id=\"GUBUN\">S</Col><Col id=\"REQ_DT\">20151230</Col><Col id=\"PATIENT_NAME\">홍길동</Col><Col id=\"SEX\">M</Col><Col id=\"AGE\">30</Col><Col id=\"PROG_TYPE\">S</Col><Col id=\"TREAT_DT\">20160301</Col><Col id=\"TREAT_DEPT\">정형외과</Col><Col id=\"PHYSICIAN_NAME\">정명의</Col><Col id=\"SPECIAL_TREAT\">Y</Col><Col id=\"OPEN_INFO\">N</Col><Col id=\"CONCERN_PATIENT\">N</Col><Col id=\"PATIENT_ID\">aa004</Col></Row><Row><Col id=\"GUBUN\">S</Col><Col id=\"REQ_DT\">20151230</Col><Col id=\"PATIENT_NAME\">나환자</Col><Col id=\"SEX\">F</Col><Col id=\"AGE\">30</Col><Col id=\"PROG_TYPE\">P</Col><Col id=\"TREAT_DT\">20160301</Col><Col id=\"TREAT_DEPT\">류마티스내과분과</Col><Col id=\"PHYSICIAN_NAME\">김의사</Col><Col id=\"SPECIAL_TREAT\">N</Col><Col id=\"OPEN_INFO\">N</Col><Col id=\"CONCERN_PATIENT\">N</Col><Col id=\"PATIENT_ID\">aa005</Col></Row><Row><Col id=\"GUBUN\">R</Col><Col id=\"REQ_DT\">20151230</Col><Col id=\"PATIENT_NAME\">홍길동</Col><Col id=\"SEX\">M</Col><Col id=\"AGE\">30</Col><Col id=\"PROG_TYPE\">P</Col><Col id=\"TREAT_DT\">20160301</Col><Col id=\"TREAT_DEPT\">내분비대사내과분과</Col><Col id=\"PHYSICIAN_NAME\">정명의</Col><Col id=\"SPECIAL_TREAT\">N</Col><Col id=\"OPEN_INFO\">N</Col><Col id=\"CONCERN_PATIENT\">N</Col><Col id=\"PATIENT_ID\">aa006</Col></Row><Row><Col id=\"GUBUN\">R</Col><Col id=\"REQ_DT\">20151230</Col><Col id=\"PATIENT_NAME\">나환자</Col><Col id=\"SEX\">F</Col><Col id=\"AGE\">30</Col><Col id=\"PROG_TYPE\">S</Col><Col id=\"TREAT_DT\">20160301</Col><Col id=\"TREAT_DEPT\">비뇨기과</Col><Col id=\"PHYSICIAN_NAME\">김의사</Col><Col id=\"SPECIAL_TREAT\">N</Col><Col id=\"OPEN_INFO\">N</Col><Col id=\"CONCERN_PATIENT\">Y</Col><Col id=\"PATIENT_ID\">aa007</Col></Row><Row><Col id=\"GUBUN\">R</Col><Col id=\"REQ_DT\">20151230</Col><Col id=\"PATIENT_NAME\">홍길동</Col><Col id=\"SEX\">M</Col><Col id=\"AGE\">30</Col><Col id=\"PROG_TYPE\">S</Col><Col id=\"TREAT_DT\">20160301</Col><Col id=\"TREAT_DEPT\">정형외과</Col><Col id=\"PHYSICIAN_NAME\">정명의</Col><Col id=\"SPECIAL_TREAT\">Y</Col><Col id=\"OPEN_INFO\">Y</Col><Col id=\"CONCERN_PATIENT\">Y</Col><Col id=\"PATIENT_ID\">aa008</Col></Row><Row><Col id=\"GUBUN\">I</Col><Col id=\"REQ_DT\">20151230</Col><Col id=\"PATIENT_NAME\">나환자</Col><Col id=\"SEX\">F</Col><Col id=\"AGE\">30</Col><Col id=\"PROG_TYPE\">S</Col><Col id=\"TREAT_DT\">20160301</Col><Col id=\"TREAT_DEPT\">이비인후과</Col><Col id=\"PHYSICIAN_NAME\">김의사</Col><Col id=\"SPECIAL_TREAT\">Y</Col><Col id=\"OPEN_INFO\">Y</Col><Col id=\"CONCERN_PATIENT\">Y</Col><Col id=\"PATIENT_ID\">aa009</Col></Row><Row><Col id=\"GUBUN\">S</Col><Col id=\"REQ_DT\">20151230</Col><Col id=\"PATIENT_NAME\">홍길동</Col><Col id=\"SEX\">M</Col><Col id=\"AGE\">30</Col><Col id=\"PROG_TYPE\">S</Col><Col id=\"TREAT_DT\">20160301</Col><Col id=\"TREAT_DEPT\">비뇨기과</Col><Col id=\"PHYSICIAN_NAME\">정명의</Col><Col id=\"SPECIAL_TREAT\">Y</Col><Col id=\"OPEN_INFO\">Y</Col><Col id=\"CONCERN_PATIENT\">Y</Col><Col id=\"PATIENT_ID\">aa010</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Div("div_search", "absolute", "0", "0", null, "100", "0", null, this);
            obj.set_taborder("0");
            obj.set_cssclass("div_WF_SearchBg");
            this.addChild(obj.name, obj);
            obj = new Static("Static00", "absolute", "19", "13", "60", "30", null, null, this.div_search);
            obj.set_taborder("30");
            obj.set_text("기간");
            obj.set_cssclass("sta_WF_SearchLabel");
            this.div_search.addChild(obj.name, obj);
            obj = new Edit("Edit00", "absolute", "473", "53", "120", "29", null, null, this.div_search);
            obj.set_taborder("31");
            obj.set_value("홍길동");
            this.div_search.addChild(obj.name, obj);
            obj = new Edit("Edit01", "absolute", "739", "53", "120", "29", null, null, this.div_search);
            obj.set_taborder("32");
            obj.set_value("541203");
            this.div_search.addChild(obj.name, obj);
            obj = new Static("Static01", "absolute", "18", "53", "74", "30", null, null, this.div_search);
            obj.set_taborder("33");
            obj.set_text("환자구분");
            obj.set_cssclass("sta_WF_SearchLabel");
            this.div_search.addChild(obj.name, obj);
            obj = new Static("Static02", "absolute", "416", "53", "74", "30", null, null, this.div_search);
            obj.set_taborder("34");
            obj.set_text("환자명");
            obj.set_cssclass("sta_WF_SearchLabel");
            this.div_search.addChild(obj.name, obj);
            obj = new Static("Static03", "absolute", "613", "51", "122", "30", null, null, this.div_search);
            obj.set_taborder("35");
            obj.set_text("생년월일(6자리)");
            obj.set_cssclass("sta_WF_SearchLabel");
            this.div_search.addChild(obj.name, obj);
            obj = new Static("Static04", "absolute", "879", "52", "115", "30", null, null, this.div_search);
            obj.set_taborder("36");
            obj.set_text("관심환자만 조회");
            obj.set_cssclass("sta_WF_SearchLabel");
            this.div_search.addChild(obj.name, obj);
            obj = new Radio("Radio00", "absolute", "415", "17", "328", "26", null, null, this.div_search);
            this.div_search.addChild(obj.name, obj);
            var Radio00_innerdataset = new Dataset("Radio00_innerdataset", this.div_search.Radio00);
            Radio00_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">1</Col><Col id=\"datacolumn\">1개월</Col></Row><Row><Col id=\"codecolumn\">2</Col><Col id=\"datacolumn\">3개월</Col></Row><Row><Col id=\"codecolumn\">3</Col><Col id=\"datacolumn\">6개월</Col></Row><Row><Col id=\"codecolumn\">4</Col><Col id=\"datacolumn\">1년</Col></Row></Rows>");
            obj.set_innerdataset(Radio00_innerdataset);
            obj.set_taborder("37");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_direction("vertical");
            obj = new Radio("Radio01", "absolute", "93", "55", "306", "26", null, null, this.div_search);
            this.div_search.addChild(obj.name, obj);
            var Radio01_innerdataset = new Dataset("Radio01_innerdataset", this.div_search.Radio01);
            Radio01_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">1</Col><Col id=\"datacolumn\">전체</Col></Row><Row><Col id=\"codecolumn\">2</Col><Col id=\"datacolumn\">의뢰</Col></Row><Row><Col id=\"codecolumn\">3</Col><Col id=\"datacolumn\">되의뢰</Col></Row><Row><Col id=\"codecolumn\">4</Col><Col id=\"datacolumn\">조회요청</Col></Row></Rows>");
            obj.set_innerdataset(Radio01_innerdataset);
            obj.set_taborder("38");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_direction("vertical");
            obj = new CheckBox("CheckBox00", "absolute", "996", "59", "18", "18", null, null, this.div_search);
            obj.set_taborder("39");
            obj.set_text("CheckBox00");
            this.div_search.addChild(obj.name, obj);
            obj = new Button("Button00", "absolute", "1032", "43", "80", "40", null, null, this.div_search);
            obj.set_taborder("40");
            obj.set_text("조회");
            obj.set_cssclass("btn_WF_Search");
            this.div_search.addChild(obj.name, obj);
            obj = new Button("Button01", "absolute", "1122", "43", "80", "40", null, null, this.div_search);
            obj.set_taborder("41");
            obj.set_text("신규");
            obj.set_cssclass("btn_WF_CRUD");
            this.div_search.addChild(obj.name, obj);
            obj = new Div("div_period", "absolute", "93", "15", "304", "29", null, null, this.div_search);
            obj.set_taborder("42");
            obj.set_url("comm::comm_periodCalendar.xfdl");
            this.div_search.addChild(obj.name, obj);

            obj = new Static("Static01", "absolute", "1", "98", "1224", "20", null, null, this);
            obj.set_taborder("1");
            obj.set_text("H 20");
            obj.set_visible("false");
            obj.style.set_background("aqua");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("50");
            this.addChild(obj.name, obj);

            obj = new Div("div_body", "absolute", "0", "119", null, null, "0", "0", this);
            obj.set_taborder("2");
            obj.style.set_opacity("100");
            obj.set_cssclass("div_WF_WFBg");
            this.addChild(obj.name, obj);
            obj = new Grid("Grid00", "absolute", "20", "24", null, null, "20", "0", this.div_body);
            obj.set_taborder("0");
            obj.set_binddataset("ds_list");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"63\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"40\" band=\"head\"/><Row size=\"36\"/></Rows><Band id=\"head\"><Cell text=\"순번\"/><Cell col=\"1\" text=\"구분\"/><Cell col=\"2\" text=\"요청일\"/><Cell col=\"3\" text=\"환자명\"/><Cell col=\"4\" text=\"S/A\"/><Cell col=\"5\" text=\"진행\"/><Cell col=\"6\" text=\"진료일\"/><Cell col=\"7\" text=\"진료과\"/><Cell col=\"8\" text=\"진료의\"/><Cell col=\"9\" text=\"특진\"/><Cell col=\"10\" text=\"공개여부\"/><Cell col=\"11\" text=\"관심환자\"/></Band><Band id=\"body\"><Cell expr=\"expr:currow+1\"/><Cell col=\"1\" text=\"bind:GUBUN\"/><Cell col=\"2\" text=\"bind:REQ_DT\"/><Cell col=\"3\" text=\"bind:PATIENT_NAME\"/><Cell col=\"4\" text=\"bind:SEX\"/><Cell col=\"5\" text=\"bind:PROG_TYPE\"/><Cell col=\"6\" text=\"bind:TREAT_DT\"/><Cell col=\"7\" text=\"bind:TREAT_DEPT\"/><Cell col=\"8\" text=\"bind:PHYSICIAN_NAME\"/><Cell col=\"9\" text=\"bind:SPECIAL_TREAT\"/><Cell col=\"10\" text=\"bind:OPEN_INFO\"/><Cell col=\"11\" text=\"bind:CONCERN_PATIENT\"/></Band></Format></Formats>");
            this.div_body.addChild(obj.name, obj);

            obj = new Static("Static02", "absolute", "1", "1", "1222", "15", null, null, this);
            obj.set_taborder("3");
            obj.set_text("H 15");
            obj.set_visible("false");
            obj.style.set_background("royalblue");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("30");
            this.addChild(obj.name, obj);

            obj = new Static("Static03", "absolute", "1", "83", "1222", "15", null, null, this);
            obj.set_taborder("4");
            obj.set_text("H 15");
            obj.set_visible("false");
            obj.style.set_background("royalblue");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("30");
            this.addChild(obj.name, obj);

            obj = new Static("Static04", "absolute", "1", "0", "20", "680", null, null, this);
            obj.set_taborder("5");
            obj.set_text("W \r\n20");
            obj.set_visible("false");
            obj.style.set_background("tomato");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("50");
            this.addChild(obj.name, obj);

            obj = new Static("Static06", "absolute", "79", "1", "15", "98", null, null, this);
            obj.set_taborder("6");
            obj.set_text("W \r\n15");
            obj.set_visible("false");
            obj.style.set_background("tomato");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("50");
            this.addChild(obj.name, obj);

            obj = new Static("Static07", "absolute", "398", "1", "20", "98", null, null, this);
            obj.set_taborder("7");
            obj.set_text("W \r\n20");
            obj.set_visible("false");
            obj.style.set_background("tomato");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("50");
            this.addChild(obj.name, obj);

            obj = new Static("Static08", "absolute", "594", "54", "20", "29", null, null, this);
            obj.set_taborder("8");
            obj.set_text("W \r\n20");
            obj.set_visible("false");
            obj.style.set_background("tomato");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("50");
            this.addChild(obj.name, obj);

            obj = new Static("Static09", "absolute", "725", "54", "15", "29", null, null, this);
            obj.set_taborder("9");
            obj.set_text("W \r\n15");
            obj.set_visible("false");
            obj.style.set_background("tomato");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("50");
            this.addChild(obj.name, obj);

            obj = new Static("Static10", "absolute", "860", "54", "20", "29", null, null, this);
            obj.set_taborder("10");
            obj.set_text("W \r\n20");
            obj.set_visible("false");
            obj.style.set_background("tomato");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("50");
            this.addChild(obj.name, obj);

            obj = new Static("Static11", "absolute", "1113", "44", "10", "40", null, null, this);
            obj.set_taborder("11");
            obj.set_text("W \r10");
            obj.set_visible("false");
            obj.style.set_background("tomato");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("50");
            this.addChild(obj.name, obj);

            obj = new Static("Static12", "absolute", "0", "44", "1022", "10", null, null, this);
            obj.set_taborder("12");
            obj.set_text("H10");
            obj.set_visible("false");
            obj.style.set_background("royalblue");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("30");
            this.addChild(obj.name, obj);

            obj = new Static("Static13", "absolute", "1203", "0", "20", "680", null, null, this);
            obj.set_taborder("13");
            obj.set_text("W \r\n20");
            obj.set_visible("false");
            obj.style.set_background("tomato");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("50");
            this.addChild(obj.name, obj);

            obj = new Static("Static05", "absolute", "0", "120", "1222", "24", null, null, this);
            obj.set_taborder("14");
            obj.set_text("H 24");
            obj.set_visible("false");
            obj.style.set_background("royalblue");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("30");
            this.addChild(obj.name, obj);

            obj = new Div("div_detail", "absolute", "3", "707", null, null, "3", "-765", this);
            obj.set_taborder("15");
            obj.set_visible("false");
            obj.style.set_background("#ffffffff");
            obj.style.set_border("5 solid #5797d8ff");
            this.addChild(obj.name, obj);
            obj = new Div("div_title", "absolute", "0", "0", null, "60", "0", null, this.div_detail);
            obj.set_taborder("0");
            obj.style.set_background("#e7eff8ff");
            this.div_detail.addChild(obj.name, obj);
            obj = new Button("btn_view", "absolute", "5", "9", "40", "40", null, null, this.div_detail.div_title);
            obj.set_taborder("0");
            obj.set_text(">");
            obj.style.set_bordertype("round 20 20");
            this.div_detail.div_title.addChild(obj.name, obj);
            obj = new Tab("tab_body", "absolute", "0", "60", null, null, "0", "0", this.div_detail);
            obj.set_taborder("1");
            obj.set_tabindex("0");
            obj.set_scrollbars("autoboth");
            obj.set_tabjustify("true");
            obj.set_multiline("false");
            obj.style.set_showextrabutton("false");
            obj.style.set_font("antialias 11 NanumGothic");
            this.div_detail.addChild(obj.name, obj);
            obj = new Tabpage("tabpage1", this.div_detail.tab_body);
            obj.set_text("일자별처방");
            this.div_detail.tab_body.addChild(obj.name, obj);
            obj = new Tabpage("tabpage2", this.div_detail.tab_body);
            obj.set_text("약처방");
            this.div_detail.tab_body.addChild(obj.name, obj);
            obj = new Tabpage("tabpage3", this.div_detail.tab_body);
            obj.set_text("검사결과");
            this.div_detail.tab_body.addChild(obj.name, obj);
            obj = new Tabpage("tabpage4", this.div_detail.tab_body);
            obj.set_text("의뢰서");
            this.div_detail.tab_body.addChild(obj.name, obj);
            obj = new Tabpage("tabpage5", this.div_detail.tab_body);
            obj.set_text("확인서");
            this.div_detail.tab_body.addChild(obj.name, obj);
            obj = new Tabpage("tabpage6", this.div_detail.tab_body);
            obj.set_text("되의뢰소견서");
            this.div_detail.tab_body.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 0, 100, this.div_search,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("0");
            		p.set_cssclass("div_WF_SearchBg");

            	}
            );
            this.div_search.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 0, 0, this.div_body,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("2");
            		p.style.set_opacity("100");
            		p.set_cssclass("div_WF_WFBg");

            	}
            );
            this.div_body.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 0, 60, this.div_detail.div_title,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("0");
            		p.style.set_background("#e7eff8ff");

            	}
            );
            this.div_detail.div_title.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 0, 0, this.div_detail,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("15");
            		p.set_visible("false");
            		p.style.set_background("#ffffffff");
            		p.style.set_border("5 solid #5797d8ff");

            	}
            );
            this.div_detail.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 1224, 660, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("sample10");
            		p.set_titletext("통합환자조회");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        
        this.loadPreloadList = function()
        {
            this._addPreloadList("fdl", "comm::comm_periodCalendar.xfdl");
        };
        
        // User Script
        this.addIncludeScript("BRWM02F1.xfdl", "lib::comForm.xjs");
        this.addIncludeScript("BRWM02F1.xfdl", "lib::comTransaction.xjs");
        this.registerScript("BRWM02F1.xfdl", function() {
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

        	//Tab Div 위치 초기설정
        	this.div_detail.set_top(0);
        	this.div_detail.set_left(0);
        	this.div_detail.set_right(0);
        	this.div_detail.set_bottom(0);
        	this.div_detail.set_visible(false);
        	
        	//Tabpage 내 화면 로딩
        	this.div_detail.tab_body.tabpage1.set_url("WM::BRWM02F2.xfdl");
        	
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
        this.setViewDetail = function(sType)
        {
        	var tabcomp = this.div_detail.tab_body;
        	if(sType == "desc")
        	{
        		//일자별처방 탭으로 이동
        		if(tabcomp.tabindex != 0) tabcomp.set_tabindex(0);		
        		
        		this.div_detail.set_left(this.getOffsetWidth() - 350);

        		for(var i = 0; i < tabcomp.tabpages.length; i++)
        		{
        			if(i == 0) tabcomp.tabpages[i].set_text("일자별\n처방");
        			else if(i == 1) tabcomp.tabpages[i].set_text("약처방");
        			else if(i == 2) tabcomp.tabpages[i].set_text("검사결과");
        			else if(i == 3) tabcomp.tabpages[i].set_text("의뢰서");
        			else if(i == 4) tabcomp.tabpages[i].set_text("확인서");
        			else if(i == 5) tabcomp.tabpages[i].set_text("되의뢰\n소견서");
        		}
        		tabcomp.style.set_buttonpadding("2 2 2 2");
        		tabcomp._viewtype = sType;		
        		this.div_detail.set_visible(true);
        		
        		this.div_detail.div_title.btn_view.set_text(">");
        		
        		
        	}
        	else if(sType == "all")
        	{
        		this.div_detail.set_left(0);
        				
        		for(var i = 0; i < tabcomp.tabpages.length; i++)
        		{
        			if(i == 0) tabcomp.tabpages[i].set_text("일자별처방");
        			else if(i == 1) tabcomp.tabpages[i].set_text("약처방");
        			else if(i == 2) tabcomp.tabpages[i].set_text("검사결과");
        			else if(i == 3) tabcomp.tabpages[i].set_text("의뢰서");
        			else if(i == 4) tabcomp.tabpages[i].set_text("확인서");
        			else if(i == 5) tabcomp.tabpages[i].set_text("되의뢰소견서");
        		}
        		tabcomp.style.set_buttonpadding("10 20 10 20");
        		tabcomp._viewtype = sType;
        		this.div_detail.set_visible(true);	
        		
        		this.div_detail.div_title.btn_view.set_text("<");
        	}
        	else if(sType == "hidden")
        	{
        		tabcomp._viewtype = sType;
        		this.div_detail.set_visible(false);
        		
        		this.div_detail.div_title.btn_view.set_text(">");
        	}
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

        
        this.Div01_Grid00_oncellclick = function(obj,e)
        {
        	this.setViewDetail("desc");
        	
        	var sId = this.ds_list.getColumn(e.row, "PATIENT_ID");
        	this.div_detail.tab_body.tabpage1.fn_init(sId);
        }

        this.div_detail_tab_body_canchange = function(obj,e)
        {
        // 	if(obj._viewtype == "desc")
        // 	{
        // 		this.setViewDetail("all");
        // 	}
        }

        this.div_detail_tab_body_onchanged = function(obj,e)
        {
        	this.setViewDetail("all");
        }

        this.div_detail_div_title_btn_view_onclick = function(obj,e)
        {
        	if(obj.text == ">")
        	{
        		this.setViewDetail("hidden");
        	}
        	else if(obj.text == "<")
        	{
        		this.setViewDetail("desc");
        	}
        	
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.form_onload, this);
            this.div_body.Grid00.addEventHandler("oncellclick", this.Div01_Grid00_oncellclick, this);
            this.div_detail.div_title.btn_view.addEventHandler("onclick", this.div_detail_div_title_btn_view_onclick, this);
            this.div_detail.tab_body.addEventHandler("canchange", this.div_detail_tab_body_canchange, this);
            this.div_detail.tab_body.addEventHandler("onchanged", this.div_detail_tab_body_onchanged, this);

        };

        this.loadIncludeScript("BRWM02F1.xfdl");
        this.loadPreloadList();
       
    };
}
)();
