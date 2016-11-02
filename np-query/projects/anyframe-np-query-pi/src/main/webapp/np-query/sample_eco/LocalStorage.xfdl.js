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
                this.set_name("LocalStorage");
                this.set_classname("LocalStorage");
                this.set_titletext("LocalStorage");
                this._setFormPosition(0,0,1024,1062);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("Static01", "absolute", "20", "39", "196", "160", null, null, this);
            obj.set_taborder("0");
            obj.set_text("1. setItem");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static02", "absolute", "20", "198", "196", "184", null, null, this);
            obj.set_taborder("1");
            obj.set_text("2. getItem");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static00", "absolute", "215", "39", "374", "160", null, null, this);
            obj.set_taborder("2");
            obj.set_text("(string, string) ⇒ ( \"name\", \"홍길동\" )\r\r(string, number) ⇒ ( \"age\", 21 )\r\r(string, boolean) ⇒ ( \"vip\", true )\r\r(string, object) ⇒ ( \"json\",\r Eco.Json.encode({\"str\":\"json test\", \"num\": 100} )\r\r(string, Date) ⇒ ( \"date\", new Date() )");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static10", "absolute", "215", "198", "374", "184", null, null, this);
            obj.set_taborder("3");
            obj.set_cssclass("WFDA_sta_Box");
            obj.set_text("(string) ⇒ ( \"name\" )\r\r(string) ⇒ ( \"age\" )\r\r(string) ⇒ ( \"vip\" )\r\r(string) ⇒ ( \"json\" )\r\r\r\r\r(string) ⇒ ( \"date\" )");
            obj.style.set_padding("6 0 4 11");
            obj.style.set_align("left top");
            this.addChild(obj.name, obj);

            obj = new Button("Button00", "absolute", "519", "48", "56", "22", null, null, this);
            obj.set_taborder("4");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button02", "absolute", "519", "208", "56", "22", null, null, this);
            obj.set_taborder("5");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_result01", "absolute", "584", "39", "420", "160", null, null, this);
            obj.set_taborder("6");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_2_result01", "absolute", "584", "198", "420", "184", null, null, this);
            obj.set_taborder("7");
            obj.set_cssclass("WFDA_sta_BoxR");
            obj.style.set_padding("6 0 4 11");
            obj.style.set_align("left top");
            this.addChild(obj.name, obj);

            obj = new Static("Static06", "absolute", "215", "0", "374", "40", null, null, this);
            obj.set_taborder("8");
            obj.set_text("Arguments:  ( Type ) ⇒ ( Value )");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static07", "absolute", "20", "0", "196", "40", null, null, this);
            obj.set_taborder("9");
            obj.set_text("Method");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static08", "absolute", "584", "0", "420", "40", null, null, this);
            obj.set_taborder("10");
            obj.set_text("Result: (Type) Vaule");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static03", "absolute", "20", "381", "196", "160", null, null, this);
            obj.set_taborder("11");
            obj.set_text("3. removeItem\r    (HTML5 Only)");
            obj.set_cssclass("WFDA_sta_label");
            obj.set_wordwrap("false");
            this.addChild(obj.name, obj);

            obj = new Static("Static04", "absolute", "215", "381", "374", "160", null, null, this);
            obj.set_taborder("12");
            obj.set_cssclass("WFDA_sta_Box");
            obj.set_text("(string) ⇒ ( \"name\" )\r\r(string) ⇒ ( \"age\" )\r\r(string) ⇒ ( \"vip\" )\r\r(string) ⇒ ( \"json\" )\r\r(string) ⇒ ( \"date\" )");
            this.addChild(obj.name, obj);

            obj = new Button("Button04", "absolute", "519", "391", "56", "22", null, null, this);
            obj.set_taborder("13");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result01", "absolute", "584", "381", "420", "160", null, null, this);
            obj.set_taborder("14");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static05", "absolute", "20", "540", "196", "68", null, null, this);
            obj.set_taborder("15");
            obj.set_text("4. clear\r    (HTML5 Only)");
            obj.set_cssclass("WFDA_sta_label");
            obj.set_wordwrap("false");
            this.addChild(obj.name, obj);

            obj = new Static("Static09", "absolute", "215", "540", "374", "68", null, null, this);
            obj.set_taborder("16");
            obj.set_cssclass("WFDA_sta_Box");
            obj.set_text("( ) ⇒ ( )");
            this.addChild(obj.name, obj);

            obj = new Button("Button06", "absolute", "519", "550", "56", "30", null, null, this);
            obj.set_taborder("17");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_4_result01", "absolute", "584", "540", "420", "68", null, null, this);
            obj.set_taborder("18");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 1024, 1062, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("LocalStorage");
            		p.set_titletext("LocalStorage");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("LocalStorage.xfdl", function() {

        // 1.1 LocalStorage api 사용 예제
        this.Button00_onclick = function(obj,e)
        {
        	var result1 = Eco.LocalStorage.setItem("name", "홍길동");
        	
        	var result2 = Eco.LocalStorage.setItem("age", 21);

        	var result3 = Eco.LocalStorage.setItem("vip", true);

        	//var result4 = Eco.LocalStorage.setItem("json", '{"text":"abc"}');
        	var result4 = Eco.LocalStorage.setItem( "json", Eco.Json.encode({"str":"json test", "num":100}) );
        	
        	var result5 = Eco.LocalStorage.setItem("date", new Date());
        	
        	var msg = "";
        	msg = "(" + typeof(result1) + ") " + result1.toString();
        	msg += "\n\n(" + typeof(result2) + ") " + result2.toString();
        	msg += "\n\n(" + typeof(result3) + ") " + result3.toString();
        	msg += "\n\n(" + typeof(result4) + ") " + result4.toString();
        	msg += "\n\n\n(" + typeof(result5) + ") " + result5.toString();
        	
        	this.st_1_result01.set_text( msg );
        	
        	trace(msg);
        }

        

        
        // 2.1 LocalStorage api 사용 예제
        this.Button02_onclick = function(obj,e)
        {
        	var result1 = Eco.LocalStorage.getItem("name");
        	
        	var result2 = Eco.LocalStorage.getItem("age");
        		
        	var result3 = Eco.LocalStorage.getItem("vip");
        	
        	var result4 = Eco.LocalStorage.getItem("json");

        	var result5 = Eco.LocalStorage.getItem("date");
        		
        	var msg = "";
        	msg = "(" + typeof(result1) + ") " + result1;
        	msg += "\n\n(" + typeof(result2) + ") " + result2;
        	msg += "\n\n(" + typeof(result3) + ") " + result3;
        	msg += "\n\n(" + typeof(result4) + ") " + result4;
        	
        	if(!Eco.isEmpty(result4))
        	{
        		//JSON 변환
        		var jsonDecode = Eco.Json.decode(result4);
        		msg += "\n\t === Object 변환은 Eco.Json.decode 사용 ===";
        		msg += "\n\tresult.str = " + jsonDecode.str;
        		msg += "\n\tresult.num = " + jsonDecode.num;	
        	}

        	msg += "\n\n(" + typeof(result5) + ") " + result5;
        		
        		
        	this.st_2_result01.set_text( msg );	
        	trace(msg);
        }

        
        //==============================================================================

        // 3 LocalStorage api 사용 예제
        this.Button04_onclick = function(obj,e)
        {
        	Eco.LocalStorage.removeItem("name");
        	Eco.LocalStorage.removeItem("age");
        	Eco.LocalStorage.removeItem("vip");
        	Eco.LocalStorage.removeItem("json");
        	Eco.LocalStorage.removeItem("date");
        	
        	this.st_3_result01.set_text( "별도의 return값은 없음.\n\ngetItem()을 실행해보면 removeItem() 결과를 확인할 수 있습니다.");
        }

        // 4 LocalStorage api 사용 예제
        this.Button03_onclick = function(obj,e)
        {
        	Eco.LocalStorage.clear();
        	this.st_4_result01.set_text( "별도의 return값은 없음.\n\ngetItem()을 실행해보면 clear() 결과를 확인할 수 있습니다.");
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.Button00.addEventHandler("onclick", this.Button00_onclick, this);
            this.Button02.addEventHandler("onclick", this.Button02_onclick, this);
            this.Button04.addEventHandler("onclick", this.Button04_onclick, this);
            this.Button06.addEventHandler("onclick", this.Button03_onclick, this);

        };

        this.loadIncludeScript("LocalStorage.xfdl");

       
    };
}
)();
