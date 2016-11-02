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
                this.set_name("Json");
                this.set_classname("Json");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,1024,768);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("Static01", "absolute", "20", "39", "196", "119", null, null, this);
            obj.set_taborder("0");
            obj.set_text("1. decode");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static02", "absolute", "20", "157", "196", "298", null, null, this);
            obj.set_taborder("1");
            obj.set_text("2. encode");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static00", "absolute", "215", "39", "370", "119", null, null, this);
            obj.set_taborder("2");
            obj.set_text("(string) ⇒ (\"{\\\"str\\\": \\\"json test\\\", \\\"num\\\": 100 }\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static10", "absolute", "215", "157", "370", "72", null, null, this);
            obj.set_taborder("3");
            obj.set_text("(object) ⇒\r\n( {\"str\": \"json test\", \"num\": 100} )");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button00", "absolute", "519", "48", "56", "22", null, null, this);
            obj.set_taborder("4");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button01", "absolute", "519", "167", "56", "22", null, null, this);
            obj.set_taborder("5");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_result01", "absolute", "584", "39", "420", "119", null, null, this);
            obj.set_taborder("6");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_2_result01", "absolute", "584", "157", "420", "72", null, null, this);
            obj.set_taborder("7");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static06", "absolute", "215", "0", "370", "40", null, null, this);
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

            obj = new Static("Static03", "absolute", "215", "228", "370", "156", null, null, this);
            obj.set_taborder("11");
            obj.set_text("(object, function) ⇒\r\n( {\"str\": \"json test\", \"num\": 100}, function(key, value) {\r\n    if (typeof value === \"string\") \r\n    {\r\n        return undefined;\r\n    }\r\n        return value;\r\n} )");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("st_2_result02", "absolute", "584", "228", "420", "156", null, null, this);
            obj.set_taborder("12");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button02", "absolute", "519", "294", "56", "22", null, null, this);
            obj.set_taborder("13");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static04", "absolute", "215", "383", "370", "72", null, null, this);
            obj.set_taborder("14");
            obj.set_text("(object, function, string) ⇒\r\n( {\"str\": \"json test\",\t\t\"num\": 100}, \"\", \"    \" )");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button03", "absolute", "519", "393", "56", "22", null, null, this);
            obj.set_taborder("15");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_2_result03", "absolute", "584", "383", "420", "72", null, null, this);
            obj.set_taborder("16");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 1024, 768, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("Json");
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("Json.xfdl", function() {
        /*
         * Eco.Json api Sample at nexacro
         * 
         * Copyright (c) 2014 EcoSystem of TOBESOFT
         * Licensed Free under nexacro.
        */

        // 1.1 decode api 사용 예제
        this.Button00_onclick = function(obj,e)
        {
        	var jsonStr = "{ \"str\": \"json test\", \"num\": 100 }";
        	var jsonObj = Eco.Json.decode(jsonStr);
        	
        	var result = "(object) " + jsonObj + "\n\n";
        	result += "==== object contains ===\n";
        	result += "result.str ==> " + jsonObj.str + "\n";
        	result += "result.num ==> " + jsonObj.num;

         	this.st_1_result01.set_text(result);
         	trace(result);
        }

        // 1.2 encode api 사용 예제
        this.Button01_onclick = function(obj,e)
        {
        	var jsonObj = {
        		"str": "json test",
        		"num": 100
        	};
        	var jsonStr = Eco.Json.encode(jsonObj);
        	
         	this.st_2_result01.set_text("(string) " + jsonStr);
         	trace(jsonStr);
        }

        this.Button02_onclick = function(obj,e)
        {
        	var jsonObj = {
        		"str": "json test",
        		"num": 100
        	};
        	var jsonStr = Eco.Json.encode(jsonObj, function(key, value) {
        		if (typeof value === "string") 
        		{
        			return undefined;
        		}
        		return value;
        	});
        	
         	this.st_2_result02.set_text("(string) " + jsonStr);
         	trace(jsonStr);
        }

        this.Button03_onclick = function(obj,e)
        {
        	var jsonObj = {
        		"str": "json test",
        		"num": 100
        	};
        	var jsonStr = Eco.Json.encode(jsonObj, "", "    ");
        	
         	this.st_2_result03.set_text("(string) " + jsonStr);
         	trace(jsonStr);
        }

        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.Button00.addEventHandler("onclick", this.Button00_onclick, this);
            this.Button01.addEventHandler("onclick", this.Button01_onclick, this);
            this.Button02.addEventHandler("onclick", this.Button02_onclick, this);
            this.Button03.addEventHandler("onclick", this.Button03_onclick, this);

        };

        this.loadIncludeScript("Json.xfdl");

       
    };
}
)();
