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
                this.set_name("sample07");
                this.set_classname("sample07");
                this.set_titletext("공통컴포넌트");
                this._setFormPosition(0,0,1225,768);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Div("div_search", "absolute", "0", "0", null, "61", "0", null, this);
            obj.set_taborder("0");
            obj.set_cssclass("div_WF_SearchBg");
            this.addChild(obj.name, obj);
            obj = new Static("Static00", "absolute", "19", "13", "60", "30", null, null, this.div_search);
            obj.set_taborder("30");
            obj.set_text("기간");
            obj.set_cssclass("sta_WF_SearchLabel");
            this.div_search.addChild(obj.name, obj);
            obj = new Div("div_period", "absolute", "85", "15", null, "29", "626", null, this.div_search);
            obj.set_taborder("42");
            obj.set_url("comm::comm_periodCalendar.xfdl");
            this.div_search.addChild(obj.name, obj);
            obj = new Button("Button01", "absolute", null, "10", "114", "40", "373", null, this.div_search);
            obj.set_taborder("43");
            obj.set_text("set_fromdate");
            obj.set_cssclass("btn_WF_CRUD");
            this.div_search.addChild(obj.name, obj);
            obj = new Button("Button00", "absolute", null, "5", "114", "48", "493", null, this.div_search);
            obj.set_taborder("44");
            obj.set_text("콜백함수설정\r\n(init)");
            obj.set_cssclass("btn_WF_CRUD");
            this.div_search.addChild(obj.name, obj);
            obj = new Button("Button02", "absolute", null, "10", "98", "40", "269", null, this.div_search);
            obj.set_taborder("45");
            obj.set_text("set_todate");
            obj.set_cssclass("btn_WF_CRUD");
            this.div_search.addChild(obj.name, obj);
            obj = new Button("Button03", "absolute", null, "10", "82", "40", "181", null, this.div_search);
            obj.set_taborder("46");
            obj.set_text("set_date");
            obj.set_cssclass("btn_WF_CRUD");
            this.div_search.addChild(obj.name, obj);
            obj = new Button("Button04", "absolute", null, "10", "82", "40", "93", null, this.div_search);
            obj.set_taborder("47");
            obj.set_text("fromdate");
            obj.set_cssclass("btn_WF_CRUD");
            this.div_search.addChild(obj.name, obj);
            obj = new Button("Button05", "absolute", null, "10", "82", "40", "5", null, this.div_search);
            obj.set_taborder("48");
            obj.set_text("todate");
            obj.set_cssclass("btn_WF_CRUD");
            this.div_search.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 0, 61, this.div_search,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("0");
            		p.set_cssclass("div_WF_SearchBg");

            	}
            );
            this.div_search.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 1225, 768, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("sample07");
            		p.set_titletext("공통컴포넌트");

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
        this.registerScript("sample07.xfdl", function() {

        this.form_onload = function(obj,e)
        {
        }

        //기간달력를 init 함수에서 설정되는 콜백함수
        this.periodCallback = function(sId)
        {
        	trace("periodCallback = "+sId);
        }

        //init - 날짜선택 팝업이 닫히거나, 적용버튼을 누를경우 콜백 호출이 필요한 경우 설정
        //기간선택 Radio를 사용할 경우 true설정
        this.div_search_Button00_onclick = function(obj,e)
        {
        	this.div_search.div_period.init(obj, "period", this.periodCallback, true);
        }

        //set_fromdate - from date설정
        this.div_search_Button01_onclick = function(obj,e)
        {
        	this.div_search.div_period.set_fromdate("20151231");
        }

        //set_todate - to date설정
        this.div_search_Button02_onclick = function(obj,e)
        {
        	this.div_search.div_period.set_todate("20151231");
        }

        //set_date - from date, to date 설정
        this.div_search_Button03_onclick = function(obj,e)
        {
        	this.div_search.div_period.set_date("20160101", "20160201");
        }

        //fromdate - fromdate value
        this.div_search_Button04_onclick = function(obj,e)
        {
        	alert(this.div_search.div_period.fromdate);
        }

        //todate - todate value
        this.div_search_Button05_onclick = function(obj,e)
        {
        	alert(this.div_search.div_period.todate);
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.form_onload, this);
            this.div_search.Button01.addEventHandler("onclick", this.div_search_Button01_onclick, this);
            this.div_search.Button00.addEventHandler("onclick", this.div_search_Button00_onclick, this);
            this.div_search.Button02.addEventHandler("onclick", this.div_search_Button02_onclick, this);
            this.div_search.Button03.addEventHandler("onclick", this.div_search_Button03_onclick, this);
            this.div_search.Button04.addEventHandler("onclick", this.div_search_Button04_onclick, this);
            this.div_search.Button05.addEventHandler("onclick", this.div_search_Button05_onclick, this);

        };

        this.loadIncludeScript("sample07.xfdl");
        this.loadPreloadList();
       
    };
}
)();
