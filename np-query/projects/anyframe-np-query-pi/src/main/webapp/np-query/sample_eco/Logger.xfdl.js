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
                this.set_name("Logger");
                this.set_classname("Logger");
                this.set_titletext("Eco.Logger");
                this._setFormPosition(0,0,1027,908);
            }
            this.getSetter("inheritanceid").set("");

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsLevel", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"cd\" type=\"INT\" size=\"256\"/><Column id=\"nm\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"cd\">-1</Col><Col id=\"nm\">Log off</Col></Row><Row><Col id=\"cd\">0</Col><Col id=\"nm\">Fatal</Col></Row><Row><Col id=\"cd\">1</Col><Col id=\"nm\">Error</Col></Row><Row><Col id=\"cd\">2</Col><Col id=\"nm\">Warn</Col></Row><Row><Col id=\"cd\">3</Col><Col id=\"nm\">Info</Col></Row><Row><Col id=\"cd\">4</Col><Col id=\"nm\">Debug</Col></Row></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("dsBuffer", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"no\" type=\"STRING\" size=\"256\"/><Column id=\"date\" type=\"STRING\" size=\"256\"/><Column id=\"level\" type=\"STRING\" size=\"256\"/><Column id=\"message\" type=\"STRING\" size=\"256\"/><Column id=\"from\" type=\"STRING\" size=\"256\"/><Column id=\"elapsed\" type=\"STRING\" size=\"256\"/><Column id=\"dump\" type=\"STRING\" size=\"256\"/><Column id=\"stack\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Static("Static06", "absolute", "20", "117", "226", "79", null, null, this);
            obj.set_cssclass("WFDA_sta_label");
            obj.set_text("2. error");
            this.addChild(obj.name, obj);

            obj = new Static("Static07", "absolute", "20", "195", "226", "79", null, null, this);
            obj.set_cssclass("WFDA_sta_label");
            obj.set_text("3. warn");
            this.addChild(obj.name, obj);

            obj = new Static("Static08", "absolute", "20", "273", "226", "79", null, null, this);
            obj.set_cssclass("WFDA_sta_label");
            obj.set_text("4. info");
            this.addChild(obj.name, obj);

            obj = new Static("Static09", "absolute", "20", "351", "226", "79", null, null, this);
            obj.set_cssclass("WFDA_sta_label");
            obj.set_text("5. debug");
            this.addChild(obj.name, obj);

            obj = new Static("Static16", "absolute", "20", "429", "226", "40", null, null, this);
            obj.set_cssclass("WFDA_sta_label");
            obj.set_text("6. getLogBuffer");
            this.addChild(obj.name, obj);

            obj = new Static("Static21", "absolute", "245", "429", "340", "40", null, null, this);
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static22", "absolute", "245", "468", "340", "40", null, null, this);
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static10", "absolute", "245", "117", "340", "40", null, null, this);
            obj.set_wordwrap("none");
            obj.set_cssclass("WFDA_sta_Box");
            obj.set_text("(string) ⇒ (\"에러 발생 !!!\")");
            this.addChild(obj.name, obj);

            obj = new Static("Static99", "absolute", "245", "156", "340", "40", null, null, this);
            obj.set_wordwrap("none");
            obj.set_cssclass("WFDA_sta_Box");
            obj.set_text("(object) ⇒ \r\n({message: \"error !!!\", elapsed: true})");
            this.addChild(obj.name, obj);

            obj = new Static("Static12", "absolute", "245", "195", "340", "40", null, null, this);
            obj.set_cssclass("WFDA_sta_Box");
            obj.set_text("(string) ⇒ (\"경고 발생 !!!\")");
            this.addChild(obj.name, obj);

            obj = new Static("Static13", "absolute", "245", "234", "340", "40", null, null, this);
            obj.set_cssclass("WFDA_sta_Box");
            obj.set_text("(object) ⇒\r\n({message: \"dump !!!\", dump: obj})");
            this.addChild(obj.name, obj);

            obj = new Static("Static14", "absolute", "245", "351", "340", "40", null, null, this);
            obj.set_cssclass("WFDA_sta_Box");
            obj.set_text("(string) ⇒ (\"디버깅 !!!\")");
            this.addChild(obj.name, obj);

            obj = new Static("Static18", "absolute", "245", "273", "340", "40", null, null, this);
            obj.set_cssclass("WFDA_sta_Box");
            obj.set_text("(string) ⇒ (\"경고 발생 !!!\")");
            this.addChild(obj.name, obj);

            obj = new Static("Static29", "absolute", "245", "390", "340", "40", null, null, this);
            obj.set_cssclass("WFDA_sta_Box");
            obj.set_text("(object) ⇒\r\n({message: \"Filter 1\", filter: \"Test1\"})");
            this.addChild(obj.name, obj);

            obj = new Static("Static30", "absolute", "245", "0", "340", "40", null, null, this);
            obj.set_text("Arguments:  ( Type ) ⇒ ( Value )");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static31", "absolute", "20", "0", "226", "40", null, null, this);
            obj.set_text("Method");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static32", "absolute", "584", "0", "420", "40", null, null, this);
            obj.set_text("Buffer");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Button("Button02", "absolute", "519", "126", "56", "22", null, null, this);
            obj.set_taborder("1");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button03", "absolute", "519", "165", "56", "22", null, null, this);
            obj.set_taborder("1");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button04", "absolute", "519", "204", "56", "22", null, null, this);
            obj.set_taborder("1");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button05", "absolute", "519", "243", "56", "22", null, null, this);
            obj.set_taborder("1");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button06", "absolute", "519", "282", "56", "22", null, null, this);
            obj.set_taborder("1");
            obj.set_text("실행");
            obj.set_wordwrap("both");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static00", "absolute", "20", "39", "226", "79", null, null, this);
            obj.set_text("1. fatal");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static01", "absolute", "245", "39", "340", "40", null, null, this);
            obj.set_text("(string) ⇒ (\"심각한 오류 발생 !!!\")");
            obj.set_wordwrap("none");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static02", "absolute", "245", "78", "340", "40", null, null, this);
            obj.set_text("(object) ⇒ \r\n({message: \"fatal !!!\", elapsed: true})");
            obj.set_wordwrap("none");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button00", "absolute", "519", "48", "56", "22", null, null, this);
            obj.set_taborder("1");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button01", "absolute", "519", "87", "56", "22", null, null, this);
            obj.set_taborder("1");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_result01", "absolute", "584", "39", "420", "594", null, null, this);
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static04", "absolute", "245", "507", "340", "40", null, null, this);
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static05", "absolute", "245", "546", "340", "40", null, null, this);
            obj.set_cssclass("WFDA_sta_Box");
            obj.set_text("(string) ⇒ (\"Test2\")");
            this.addChild(obj.name, obj);

            obj = new Static("Static11", "absolute", "245", "312", "340", "40", null, null, this);
            obj.set_text("(object) ⇒\r\n({message:msg, stack: true})");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button08", "absolute", "519", "359", "56", "22", null, null, this);
            obj.set_taborder("1");
            obj.set_text("실행");
            obj.set_wordwrap("both");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button09", "absolute", "519", "398", "56", "22", null, null, this);
            obj.set_taborder("1");
            obj.set_text("실행");
            obj.set_wordwrap("both");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button10", "absolute", "519", "437", "56", "22", null, null, this);
            obj.set_taborder("1");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button11", "absolute", "519", "476", "56", "22", null, null, this);
            obj.set_taborder("1");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button12", "absolute", "519", "515", "56", "22", null, null, this);
            obj.set_taborder("1");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button13", "absolute", "519", "554", "56", "22", null, null, this);
            obj.set_taborder("1");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button07", "absolute", "519", "321", "56", "22", null, null, this);
            obj.set_taborder("1");
            obj.set_text("실행");
            obj.set_wordwrap("both");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Combo("cmb_logLevel", "absolute", "901", "11", "94", "20", null, null, this);
            this.addChild(obj.name, obj);
            obj.set_taborder("1");
            obj.set_value("4");
            obj.set_text("Debug");
            obj.set_innerdataset("@dsLevel");
            obj.set_codecolumn("cd");
            obj.set_datacolumn("nm");
            obj.set_index("5");

            obj = new Static("Static15", "absolute", "839", "10", "56", "20", null, null, this);
            obj.set_text("logLevel");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00", "absolute", "588", "43", "412", "586", null, null, this);
            obj.set_taborder("1");
            obj.set_binddataset("dsBuffer");
            obj.set_extendsizetype("none");
            obj.set_autosizingtype("none");
            obj.set_autofittype("none");
            obj.set_fillareatype("linerow");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"40\"/><Column size=\"150\"/><Column size=\"50\"/><Column size=\"300\"/><Column size=\"359\"/><Column size=\"50\"/><Column size=\"300\"/><Column size=\"300\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"no\"/><Cell col=\"1\" text=\"date\"/><Cell col=\"2\" text=\"level\"/><Cell col=\"3\" text=\"message\"/><Cell col=\"4\" text=\"from\"/><Cell col=\"5\" text=\"elapsed\"/><Cell col=\"6\" text=\"dump\"/><Cell col=\"7\" text=\"stack\"/></Band><Band id=\"body\"><Cell text=\"bind:no\"/><Cell col=\"1\" text=\"bind:date\"/><Cell col=\"2\" text=\"bind:level\"/><Cell col=\"3\" style=\"align:left;\" text=\"bind:message\"/><Cell col=\"4\" style=\"align:left;\" text=\"bind:from\"/><Cell col=\"5\" text=\"bind:elapsed\"/><Cell col=\"6\" style=\"align:left;\" text=\"bind:dump\"/><Cell col=\"7\" style=\"align:left;\" text=\"bind:stack\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("Static17", "absolute", "20", "468", "226", "40", null, null, this);
            obj.set_text("7. startElapsed");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static19", "absolute", "20", "507", "226", "40", null, null, this);
            obj.set_text("8. getFilter");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static20", "absolute", "20", "546", "226", "40", null, null, this);
            obj.set_text("9. setFilter");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static03", "absolute", "245", "585", "340", "48", null, null, this);
            obj.set_taborder("3");
            obj.set_text("onload 에서 호출하는 것으로 대체");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static23", "absolute", "20", "585", "226", "48", null, null, this);
            obj.set_taborder("4");
            obj.set_text("10. setDebugInfoForm");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static24", "absolute", "20", "632", "226", "272", null, null, this);
            obj.set_taborder("5");
            obj.set_text("11. inspect");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static25", "absolute", "245", "632", "340", "272", null, null, this);
            obj.set_taborder("6");
            obj.set_text("주어진 obj에 대한 값을 json 방식으로 출력하는 string값을 반환한다.\n\r\nparam {*} 출력할 대상 ⇒ (this.Button14)\r\nparam {boolean=} object에 javascript에서 내부적으로 정의 메소드도 나타나게 한다.(default: false)\n ⇒ (false)\r\nparam {number=} 출력할 depth 정의.(default: 2) \n⇒ (0)\r\nparam {boolean=} 출력시에 string, number, Date값등에 대한 색깔 표시 여부(default: false) \n⇒ (true)\r\nparam {boolean=} 출력시에 만약 obj에 inspect메소드가 존재하면 그것을 사용한다.(default: true)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button14", "absolute", "519", "640", "56", "22", null, null, this);
            obj.set_taborder("7");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static26", "absolute", "584", "632", "420", "272", null, null, this);
            obj.set_taborder("8");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new WebBrowser("WebBrowser00", "absolute", "591", "640", "404", "260", null, null, this);
            obj.set_taborder("9");
            obj.style.set_border("1 solid #808080ff");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 1027, 908, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("Logger");
            		p.getSetter("inheritanceid").set("");
            		p.set_titletext("Eco.Logger");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.addIncludeScript("Logger.xfdl", "Sample::LoggerInclude.xjs");
        this.registerScript("Logger.xfdl", function() {
        //include "Sample::LoggerInclude.xjs";

        /*
         * Eco.Logger api Sample at nexacro
         * 
         *
         * Copyright (c) 2014 EcoSystem of TOBESOFT
         * Licensed Free under nexacro.
        */

        this.Logger_onload = function(obj,e)
        {
        	this.WebBrowser00.set_url("about:blank");
        	// form에 정의된 함수(include 포함)에 대한 debug 정보를 지정한다.
        	// 이 함수를 호출하지 않으면 anonymous function 으로 표시됨.
        	Eco.Logger.setDebugInfoFunctions(this);
        }

        this.cmb_logLevel_onitemchanged = function(obj,e)
        {
        	// Log Level 지정 (-1:off, 0:fatal, 1:error, 2:warn, 3:info, 4, debug)
        	Eco.Logger.logLevel = e.postvalue;
        }

        this.fn_showBuffer = function()
        {
        	var buffer = Eco.Logger.getLogBuffer();
        	
        	this.dsBuffer.set_enableevent(false);
        	this.dsBuffer.deleteAll();
        	var buff;
        	for (var i=0,len=buffer.length; i<len; i++)
        	{
        		buff = buffer[i];
        		
        		this.dsBuffer.addRow();
        		this.dsBuffer.setColumn(i, "no", i.toString());
        		this.dsBuffer.setColumn(i, "date", buff.date);
        		this.dsBuffer.setColumn(i, "level", buff.level);
        		this.dsBuffer.setColumn(i, "message", buff.message);
        		this.dsBuffer.setColumn(i, "from", buff.from);
        		this.dsBuffer.setColumn(i, "elapsed", buff.elapsed);
        		this.dsBuffer.setColumn(i, "dump", buff.dump);
        		this.dsBuffer.setColumn(i, "stack", buff.stack);
        	}
        	
        	this.dsBuffer.set_enableevent(true);
        }

        // 1.1 fatal api 사용 예제
        this.Button00_onclick = function(obj,e)
        {

        	// fatal 은 Error 개체를 throw 함. 
        	// 여기서는 buffer의 내용을 보여주기 위해 try 를 사용
        	try
        	{
        		Eco.Logger.fatal("심각한 오류 발생 !!!");
        	}
        	catch(e)
        	{
        	}
        	finally
        	{
        		this.fn_showBuffer();
        	}
        }

        // 1.2 fatal api 사용 예제
        this.Button01_onclick = function(obj,e)
        {
        	// fatal 은 Error 개체를 throw 함.
        	// 여기서는 buffer의 내용을 보여주기 위해 try 를 사용
        	try
        	{
        		// 경과시간 시작시간 지정 
        		// elapsed 옵션을 포함한 로깅이 실행되면 초기화 됨
        		// 시작시간을 지정하지 않으면 Logger가 최초 include된 시점이 시작시간
        		Eco.Logger.startElapsed();
        		
        		var a = 0;
        		for (var i=0; i<10000; i++)
        		{
        			a = a + i;
        		}
        		
        		// message 와 elpase 를 포함한 Object 형식을 인자로 전달
        		Eco.Logger.fatal({message: "fatal !!!", elapsed: true});
        	}
        	catch(e)
        	{
        	}
        	finally
        	{
        		this.fn_showBuffer();
        	}
        }

        // 3.1 error api 사용 예제
        this.Button02_onclick = function(obj,e)
        {
        	// error 는 Error 개체를 throw 함.
        	// 여기서는 buffer의 내용을 보여주기 위해 try 를 사용
        	try
        	{
        		Eco.Logger.error("에러 발생 !!!");
        	}
        	catch(e)
        	{
        	}
        	finally
        	{
        		this.fn_showBuffer();
        	}
        }

        // 3.2 error api 사용 예제
        this.Button03_onclick = function(obj,e)
        {
        	// error 는 Error 개체를 throw 함.
        	// 여기서는 buffer의 내용을 보여주기 위해 try 를 사용
        	try
        	{
        		// 경과시간 시작시간 지정 
        		// elapsed 옵션을 포함한 로깅이 실행되면 초기화 됨
        		// 시작시간을 지정하지 않으면 Logger가 최초 include된 시점이 시작시간
        		//Eco.Logger.startElapsed();
        		
        		var a = 0;
        		for (var i=0; i<10000; i++)
        		{
        			a = a + i;
        		}
        		
        		// message 와 elpase 를 포함한 Object 형식을 인자로 전달
        		Eco.Logger.error({message:"error !!!", elapsed: true});
        	}
        	catch(e)
        	{
        	}
        	finally
        	{
        		this.fn_showBuffer();
        	}
        }

        // 3.1 warn api 사용 예제
        this.Button04_onclick = function(obj,e)
        {
        	Eco.Logger.warn("경고 발생 !!!");
        	
        	this.fn_showBuffer();
        }

        // 3.2 warn api 사용 예제
        this.Button05_onclick = function(obj,e)
        {
        	Eco.Logger.warn({message:"dump !!!", dump: obj});
        	
        	this.fn_showBuffer();
        }

        // 4.1 info api 사용 예제
        this.Button06_onclick = function(obj,e)
        {
        	Eco.Logger.info("정보 출력 !!!");	
        	
        	this.fn_showBuffer();
        }

        // 4.2 info api 사용 예제
        this.Button07_onclick = function(obj,e)
        {
        	this.fn_step1("123");
        	
        	this.fn_showBuffer();
        }

        this.fn_step1 = function(arg1)
        {
        	this.fn_step2(arg1, "456")
        }

        this.fn_step2 = function(arg1,arg2)
        {
        	this.fn_step3(arg1, arg2, "789");
        }

        this.fn_step3 = function(arg1,arg2,arg3)
        {
        	var msg = "";
        	
        	msg = arg1 + arg2 + arg3 + " (익명함수 보임)";
        	Eco.Logger.info({message:msg, stack: true, showStackAnonymous: true});
        	
        	msg = arg1 + arg2 + arg3 + " (익명함수 숨김)";
        	Eco.Logger.info({message:msg, stack: true});	
        }

        // 5.1 debug api 사용 예제
        this.Button08_onclick = function(obj,e)
        {
        	Eco.Logger.debug("디버깅 !!!");
        	
        	this.fn_showBuffer();
        }

        // 5.2 debug api 사용 예제
        this.Button09_onclick = function(obj,e)
        {
        	Eco.Logger.setFilter("Test1");
        	
        	Eco.Logger.debug({message:"Filter 1 !!!", filter: "Test1"});
        	Eco.Logger.debug({message:"Filter 2 !!!", filter: "Test2"});
        	
        	this.fn_showBuffer();
        }

        // 6.1 getLogBuffer api 사용 예제
        this.Button10_onclick = function(obj,e)
        {
        	trace(Eco.Logger.getLogBuffer());
        	
        	this.fn_showBuffer();
        }

        // 7.1 startElapsed api 사용 예제
        this.Button11_onclick = function(obj,e)
        {
        	// 경과시간 시작시간 지정 
        	// elapsed 옵션을 포함한 로깅이 실행되면 초기화 됨
        	// 시작시간을 지정하지 않으면 Logger가 최초 include된 시점이 시작시간
        	Eco.Logger.startElapsed();
        	
        	var a = 0;
        	for (var i=0; i<10000; i++)
        	{
        		a = a + i;
        	}
        	
        	Eco.Logger.debug({message:"test !!!", elapsed: true});
        	
        	this.fn_showBuffer();
        }

        // 8.1 getFilter api 사용 예제
        this.Button12_onclick = function(obj,e)
        {
        	var filter = Eco.Logger.getFilter();
        	if ( filter == "" )
        	{
        		Eco.Logger.setFilter("Test1");
        	}
        }

        // 9.1 setFilter api 사용 예제
        this.Button13_onclick = function(obj,e)
        {
        	Eco.Logger.setFilter("Test2");
        	
        	Eco.Logger.debug({message:"Filter 1 !!!", filter: "Test1"});
        	Eco.Logger.debug({message:"Filter 2 !!!", filter: "Test2"});
        	
        	this.fn_showBuffer();
        }

        this.Button14_onclick = function(obj,e)
        {
        	var depth = 0, info;
        	if (Eco._isIE8Below || nexacro.Browser == "Runtime")
        	{
        		info = Eco.Logger.inspect(obj, false, depth, false);
        	}
        	else
        	{
        		info = Eco.Logger.inspect(obj, false, depth, true);
        	}
        	var doc = this.WebBrowser00.getProperty("document");
        	if ( !doc._handle )
        	{
        		doc = this.WebBrowser00.getProperty("contentDocument");
        		if ( !doc._handle )
        		{
        			var win = this.WebBrowser00.getProperty("contentWindow");
        			doc = win.getProperty("document");
        		}
        	}
        	doc.callMethod("write", '<pre id="dText" style="font: 12px Comic Sans MS,cursive,sans-serif; "></pre>');
        	var dText = doc.callMethod("getElementById", "dText");

        	if (Eco._isIE8Below || nexacro.Browser == "Runtime")
        	{
        		dText.setProperty("innerText", info);
        	}
        	else
        	{
        		// 만약 처리가 되지 않으면 ==> Element_HTML5.js 소스 13132라인 좌측소스로 수정 => if ( this._handle.nodeType == 1 || this._handle[name] )
        		dText.setProperty("innerHTML", info);
        	}
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.Logger_onload, this);
            this.Button02.addEventHandler("onclick", this.Button02_onclick, this);
            this.Button03.addEventHandler("onclick", this.Button03_onclick, this);
            this.Button04.addEventHandler("onclick", this.Button04_onclick, this);
            this.Button05.addEventHandler("onclick", this.Button05_onclick, this);
            this.Button06.addEventHandler("onclick", this.Button06_onclick, this);
            this.Button00.addEventHandler("onclick", this.Button00_onclick, this);
            this.Button01.addEventHandler("onclick", this.Button01_onclick, this);
            this.Button08.addEventHandler("onclick", this.Button08_onclick, this);
            this.Button09.addEventHandler("onclick", this.Button09_onclick, this);
            this.Button10.addEventHandler("onclick", this.Button10_onclick, this);
            this.Button11.addEventHandler("onclick", this.Button11_onclick, this);
            this.Button12.addEventHandler("onclick", this.Button12_onclick, this);
            this.Button13.addEventHandler("onclick", this.Button13_onclick, this);
            this.Button07.addEventHandler("onclick", this.Button07_onclick, this);
            this.cmb_logLevel.addEventHandler("onitemchanged", this.cmb_logLevel_onitemchanged, this);
            this.Static03.addEventHandler("onclick", this.Static03_onclick, this);
            this.Static25.addEventHandler("onclick", this.Static03_onclick, this);
            this.Button14.addEventHandler("onclick", this.Button14_onclick, this);
            this.Static26.addEventHandler("onclick", this.Static03_onclick, this);

        };

        this.loadIncludeScript("Logger.xfdl");

       
    };
}
)();
