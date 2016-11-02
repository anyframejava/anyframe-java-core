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
                this.set_name("temp01");
                this.set_classname("temp01");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,1224,680);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("DS_01", this);
            obj._setContents("<ColumnInfo><Column id=\"Column0\" type=\"STRING\" size=\"256\"/><Column id=\"Column1\" type=\"STRING\" size=\"256\"/><Column id=\"Column2\" type=\"STRING\" size=\"256\"/><Column id=\"Column3\" type=\"STRING\" size=\"256\"/><Column id=\"Column4\" type=\"STRING\" size=\"256\"/><Column id=\"Column5\" type=\"STRING\" size=\"256\"/><Column id=\"Column6\" type=\"STRING\" size=\"256\"/><Column id=\"Column7\" type=\"STRING\" size=\"256\"/><Column id=\"Column8\" type=\"STRING\" size=\"256\"/><Column id=\"Column9\" type=\"STRING\" size=\"256\"/><Column id=\"Column10\" type=\"STRING\" size=\"256\"/><Column id=\"Column11\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"Column3\">나환자</Col><Col id=\"Column4\">F/35</Col><Col id=\"Column5\">진료</Col><Col id=\"Column6\">20160609</Col><Col id=\"Column7\">정형외과</Col><Col id=\"Column2\">20160103</Col><Col id=\"Column8\">김의사</Col><Col id=\"Column9\">Y</Col><Col id=\"Column10\">N</Col><Col id=\"Column0\">1</Col></Row><Row><Col id=\"Column3\">홍길동</Col><Col id=\"Column4\">F/35</Col><Col id=\"Column5\">부도</Col><Col id=\"Column6\">20160609</Col><Col id=\"Column7\">내분비대사내과분과</Col><Col id=\"Column2\">20160103</Col><Col id=\"Column8\">전명의</Col><Col id=\"Column9\">Y</Col><Col id=\"Column10\">N</Col><Col id=\"Column0\">2</Col></Row><Row><Col id=\"Column0\">3</Col><Col id=\"Column2\">20160103</Col><Col id=\"Column3\">나환자</Col><Col id=\"Column4\">F/35</Col><Col id=\"Column5\">진료</Col><Col id=\"Column6\">20160609</Col><Col id=\"Column7\">외과</Col><Col id=\"Column8\">김의사</Col><Col id=\"Column9\">Y</Col><Col id=\"Column10\">Y</Col></Row><Row><Col id=\"Column0\">4</Col><Col id=\"Column2\">20160103</Col><Col id=\"Column3\">홍길동</Col><Col id=\"Column4\">F/35</Col><Col id=\"Column5\">부도</Col><Col id=\"Column6\">20160609</Col><Col id=\"Column7\">비뇨기과</Col><Col id=\"Column8\">전명의</Col><Col id=\"Column10\">Y</Col><Col id=\"Column9\">N</Col></Row><Row><Col id=\"Column0\">5</Col><Col id=\"Column2\">20160103</Col><Col id=\"Column3\">나환자</Col><Col id=\"Column4\">F/35</Col><Col id=\"Column5\">진료</Col><Col id=\"Column6\">20160609</Col><Col id=\"Column7\">소화기내과</Col><Col id=\"Column8\">김의사</Col></Row><Row><Col id=\"Column0\">6</Col><Col id=\"Column2\">20160103</Col><Col id=\"Column3\">홍길동</Col><Col id=\"Column4\">F/35</Col><Col id=\"Column5\">부도</Col><Col id=\"Column6\">20160609</Col><Col id=\"Column7\">정형외과</Col><Col id=\"Column8\">전명의</Col><Col id=\"Column9\">Y</Col><Col id=\"Column10\">Y</Col></Row><Row><Col id=\"Column0\">7</Col><Col id=\"Column2\">20160103</Col><Col id=\"Column3\">나환자</Col><Col id=\"Column4\">F/35</Col><Col id=\"Column5\">진료</Col><Col id=\"Column6\">20160609</Col><Col id=\"Column7\">내분비대사내과분과</Col><Col id=\"Column8\">김의사</Col><Col id=\"Column9\">Y</Col></Row><Row><Col id=\"Column0\">8</Col><Col id=\"Column2\">20160103</Col><Col id=\"Column3\">홍길동</Col><Col id=\"Column4\">F/35</Col><Col id=\"Column5\">진료</Col><Col id=\"Column6\">20160609</Col><Col id=\"Column7\">외과</Col><Col id=\"Column8\">전명의</Col><Col id=\"Column10\">Y</Col><Col id=\"Column9\">N</Col></Row><Row><Col id=\"Column0\">9</Col><Col id=\"Column2\">20160103</Col><Col id=\"Column3\">나환자</Col><Col id=\"Column4\">F/35</Col><Col id=\"Column5\">부도</Col><Col id=\"Column6\">20160609</Col><Col id=\"Column7\">비뇨기과</Col><Col id=\"Column8\">김의사</Col><Col id=\"Column9\">Y</Col></Row><Row><Col id=\"Column0\">10</Col><Col id=\"Column2\">20160103</Col><Col id=\"Column3\">홍길동</Col><Col id=\"Column4\">F/35</Col><Col id=\"Column5\">진료</Col><Col id=\"Column6\">20160609</Col><Col id=\"Column7\">소화기내과</Col><Col id=\"Column8\">전명의</Col><Col id=\"Column10\">Y</Col><Col id=\"Column9\">N</Col></Row><Row><Col id=\"Column0\">11</Col><Col id=\"Column2\">20160103</Col><Col id=\"Column3\">나환자</Col><Col id=\"Column4\">F/35</Col><Col id=\"Column5\">부도</Col><Col id=\"Column6\">20160609</Col><Col id=\"Column7\">정형외과</Col><Col id=\"Column8\">김의사</Col><Col id=\"Column9\">Y</Col></Row><Row><Col id=\"Column0\">12</Col><Col id=\"Column2\">20160103</Col><Col id=\"Column3\">홍길동</Col><Col id=\"Column4\">F/35</Col><Col id=\"Column5\">진료</Col><Col id=\"Column6\">20160609</Col><Col id=\"Column7\">내분비대사내과분과</Col><Col id=\"Column8\">전명의</Col><Col id=\"Column10\">N</Col></Row><Row/><Row/><Row/></Rows>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Div("Div00", "absolute", "0", "0", "1224", "100", null, null, this);
            obj.set_taborder("3");
            obj.set_cssclass("div_WF_SearchBg");
            this.addChild(obj.name, obj);
            obj = new Static("Static00", "absolute", "19", "13", "60", "30", null, null, this.Div00);
            obj.set_taborder("0");
            obj.set_text("기간");
            obj.set_cssclass("sta_WF_SearchLabel");
            this.Div00.addChild(obj.name, obj);
            obj = new Edit("Edit00", "absolute", "473", "53", "120", "29", null, null, this.Div00);
            obj.set_taborder("1");
            obj.set_value("홍길동");
            this.Div00.addChild(obj.name, obj);
            obj = new Edit("Edit01", "absolute", "739", "53", "120", "29", null, null, this.Div00);
            obj.set_taborder("2");
            obj.set_value("541203");
            this.Div00.addChild(obj.name, obj);
            obj = new Static("Static02", "absolute", "416", "53", "74", "30", null, null, this.Div00);
            obj.set_taborder("4");
            obj.set_text("환자명");
            obj.set_cssclass("sta_WF_SearchLabel");
            this.Div00.addChild(obj.name, obj);
            obj = new Static("Static03", "absolute", "613", "51", "122", "30", null, null, this.Div00);
            obj.set_taborder("5");
            obj.set_text("생년월일(6자리)");
            obj.set_cssclass("sta_WF_SearchLabel");
            this.Div00.addChild(obj.name, obj);
            obj = new Static("Static04", "absolute", "879", "52", "115", "30", null, null, this.Div00);
            obj.set_taborder("6");
            obj.set_text("관심환자만 조회");
            obj.set_cssclass("sta_WF_SearchLabel");
            this.Div00.addChild(obj.name, obj);
            obj = new Radio("Radio00", "absolute", "415", "17", "328", "26", null, null, this.Div00);
            this.Div00.addChild(obj.name, obj);
            var Radio00_innerdataset = new Dataset("Radio00_innerdataset", this.Div00.Radio00);
            Radio00_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">1</Col><Col id=\"datacolumn\">1개월</Col></Row><Row><Col id=\"codecolumn\">2</Col><Col id=\"datacolumn\">3개월</Col></Row><Row><Col id=\"codecolumn\">3</Col><Col id=\"datacolumn\">6개월</Col></Row><Row><Col id=\"codecolumn\">4</Col><Col id=\"datacolumn\">1년</Col></Row></Rows>");
            obj.set_innerdataset(Radio00_innerdataset);
            obj.set_taborder("7");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_direction("vertical");
            obj = new Radio("Radio01", "absolute", "93", "55", "306", "26", null, null, this.Div00);
            this.Div00.addChild(obj.name, obj);
            var Radio01_innerdataset = new Dataset("Radio01_innerdataset", this.Div00.Radio01);
            Radio01_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">1</Col><Col id=\"datacolumn\">전체</Col></Row><Row><Col id=\"codecolumn\">2</Col><Col id=\"datacolumn\">의뢰</Col></Row><Row><Col id=\"codecolumn\">3</Col><Col id=\"datacolumn\">되의뢰</Col></Row><Row><Col id=\"codecolumn\">4</Col><Col id=\"datacolumn\">조회요청</Col></Row></Rows>");
            obj.set_innerdataset(Radio01_innerdataset);
            obj.set_taborder("8");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_direction("vertical");
            obj = new Calendar("Calendar00", "absolute", "93", "15", "140", "29", null, null, this.Div00);
            this.Div00.addChild(obj.name, obj);
            obj.set_taborder("9");
            obj.set_dateformat("yyyy-MM-dd");
            obj.set_value("20160310");
            obj = new CheckBox("CheckBox00", "absolute", "996", "59", "18", "18", null, null, this.Div00);
            obj.set_taborder("11");
            obj.set_text("CheckBox00");
            this.Div00.addChild(obj.name, obj);
            obj = new Button("Button00", "absolute", "1032", "43", "80", "40", null, null, this.Div00);
            obj.set_taborder("12");
            obj.set_text("조회");
            obj.set_cssclass("btn_WF_Search");
            this.Div00.addChild(obj.name, obj);
            obj = new Button("Button01", "absolute", "1122", "43", "80", "40", null, null, this.Div00);
            obj.set_taborder("13");
            obj.set_text("신규");
            obj.set_cssclass("btn_WF_CRUD");
            this.Div00.addChild(obj.name, obj);
            obj = new Static("Static05", "absolute", "239", "16", "18", "28", null, null, this.Div00);
            obj.set_taborder("14");
            obj.set_text("~");
            this.Div00.addChild(obj.name, obj);
            obj = new Calendar("Calendar02", "absolute", "257", "15", "140", "29", null, null, this.Div00);
            this.Div00.addChild(obj.name, obj);
            obj.set_taborder("15");
            obj.set_value("20160310");
            obj.set_dateformat("yyyy-MM-dd");
            obj = new Static("Static01", "absolute", "18", "53", "74", "30", null, null, this.Div00);
            obj.set_taborder("16");
            obj.set_text("환자구분");
            obj.set_cssclass("sta_WF_SearchLabel");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static01", "absolute", "1", "98", "1224", "20", null, null, this);
            obj.set_taborder("4");
            obj.set_text("H 20");
            obj.style.set_background("aqua");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("50");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Div("Div01", "absolute", "0", "119", null, null, "0", "0", this);
            obj.set_taborder("5");
            obj.set_cssclass("div_WF_WFBg");
            obj.style.set_opacity("100");
            this.addChild(obj.name, obj);
            obj = new Grid("Grid00", "absolute", "20", "24", null, null, "20", "20", this.Div01);
            obj.set_taborder("0");
            obj.set_binddataset("DS_01");
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
            obj.set_taborder("10");
            obj.set_text("W \r\n15");
            obj.set_visible("false");
            obj.style.set_background("tomato");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("50");
            this.addChild(obj.name, obj);

            obj = new Static("Static07", "absolute", "398", "1", "20", "98", null, null, this);
            obj.set_taborder("11");
            obj.set_text("W \r\n20");
            obj.set_visible("false");
            obj.style.set_background("tomato");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("50");
            this.addChild(obj.name, obj);

            obj = new Static("Static08", "absolute", "594", "54", "20", "29", null, null, this);
            obj.set_taborder("12");
            obj.set_text("W \r\n20");
            obj.set_visible("false");
            obj.style.set_background("tomato");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("50");
            this.addChild(obj.name, obj);

            obj = new Static("Static09", "absolute", "725", "54", "15", "29", null, null, this);
            obj.set_taborder("13");
            obj.set_text("W \r\n15");
            obj.set_visible("false");
            obj.style.set_background("tomato");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("50");
            this.addChild(obj.name, obj);

            obj = new Static("Static10", "absolute", "860", "54", "20", "29", null, null, this);
            obj.set_taborder("14");
            obj.set_text("W \r\n20");
            obj.set_visible("false");
            obj.style.set_background("tomato");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("50");
            this.addChild(obj.name, obj);

            obj = new Static("Static11", "absolute", "1113", "44", "10", "40", null, null, this);
            obj.set_taborder("15");
            obj.set_text("W \r10");
            obj.set_visible("false");
            obj.style.set_background("tomato");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("50");
            this.addChild(obj.name, obj);

            obj = new Static("Static12", "absolute", "0", "44", "1022", "10", null, null, this);
            obj.set_taborder("16");
            obj.set_text("H10");
            obj.set_visible("false");
            obj.style.set_background("royalblue");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("30");
            this.addChild(obj.name, obj);

            obj = new Static("Static13", "absolute", "1203", "0", "20", "680", null, null, this);
            obj.set_taborder("17");
            obj.set_text("W \r\n20");
            obj.set_visible("false");
            obj.style.set_background("tomato");
            obj.style.set_color("darkred");
            obj.style.set_align("center middle");
            obj.style.set_font("10 dotum");
            obj.style.set_opacity("50");
            this.addChild(obj.name, obj);

            obj = new Static("Static05", "absolute", "0", "120", "1222", "24", null, null, this);
            obj.set_taborder("18");
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
            obj = new Layout("default", "", 1224, 100, this.Div00,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("3");
            		p.set_cssclass("div_WF_SearchBg");

            	}
            );
            this.Div00.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 0, 0, this.Div01,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("5");
            		p.set_cssclass("div_WF_WFBg");
            		p.style.set_opacity("100");

            	}
            );
            this.Div01.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 1224, 680, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("temp01");
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script

        
        // Regist UI Components Event
        this.on_initEvent = function()
        {

        };

        this.loadIncludeScript("temp01.xfdl");

       
    };
}
)();
