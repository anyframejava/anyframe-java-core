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
                this.set_name("Color");
                this.set_classname("Color");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,1024,768);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("Static06", "absolute", "20", "39", "172", "79", null, null, this);
            obj.set_taborder("0");
            obj.set_text("1. hslToRgb");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static07", "absolute", "20", "117", "172", "79", null, null, this);
            obj.set_taborder("1");
            obj.set_text("2. rgbToHex\r\n");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static08", "absolute", "20", "195", "172", "79", null, null, this);
            obj.set_taborder("2");
            obj.set_text("3.rgbToHsl");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static10", "absolute", "191", "39", "496", "40", null, null, this);
            obj.set_taborder("3");
            obj.set_text("(number, number, number) ⇒ (100,240,120)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static99", "absolute", "191", "78", "496", "40", null, null, this);
            obj.set_taborder("4");
            obj.set_text("(number, number, number) ⇒ (20,240,120)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static12", "absolute", "191", "117", "496", "40", null, null, this);
            obj.set_taborder("5");
            obj.set_text("(number, number, number) ⇒ (255,140,0)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static13", "absolute", "191", "156", "496", "40", null, null, this);
            obj.set_taborder("6");
            obj.set_text("(number, number, number, number) ⇒ (255,140,0,100)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static15", "absolute", "191", "234", "496", "40", null, null, this);
            obj.set_taborder("7");
            obj.set_text("(number, number, number) ⇒ (200,150,100)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static18", "absolute", "191", "195", "496", "40", null, null, this);
            obj.set_taborder("8");
            obj.set_text("(number, number, number) ⇒ (100,150,200)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static30", "absolute", "191", "0", "496", "40", null, null, this);
            obj.set_taborder("9");
            obj.set_text("Arguments:  ( Type ) ⇒ ( Value )");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static31", "absolute", "20", "0", "172", "40", null, null, this);
            obj.set_taborder("10");
            obj.set_text("Method");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static32", "absolute", "686", "0", "318", "40", null, null, this);
            obj.set_taborder("11");
            obj.set_text("Result: (Type) Vaule");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Button("Button00", "absolute", "615", "48", "56", "22", null, null, this);
            obj.set_taborder("13");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button01", "absolute", "615", "87", "56", "22", null, null, this);
            obj.set_taborder("14");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button02", "absolute", "615", "126", "56", "22", null, null, this);
            obj.set_taborder("15");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button03", "absolute", "615", "165", "56", "22", null, null, this);
            obj.set_taborder("16");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_result01", "absolute", "686", "39", "318", "40", null, null, this);
            obj.set_taborder("17");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_result02", "absolute", "686", "78", "318", "40", null, null, this);
            obj.set_taborder("18");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_2_result01", "absolute", "686", "117", "318", "40", null, null, this);
            obj.set_taborder("19");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_2_result02", "absolute", "686", "156", "318", "40", null, null, this);
            obj.set_taborder("20");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button04", "absolute", "615", "204", "56", "22", null, null, this);
            obj.set_taborder("21");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button05", "absolute", "615", "243", "56", "22", null, null, this);
            obj.set_taborder("22");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result01", "absolute", "686", "195", "318", "40", null, null, this);
            obj.set_taborder("23");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result02", "absolute", "686", "234", "318", "40", null, null, this);
            obj.set_taborder("24");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static02", "absolute", "856", "130", "128", "15", null, null, this);
            obj.set_taborder("25");
            obj.set_cssclass("sta_WF_title");
            obj.style.set_background("left middle");
            obj.style.set_border("1 solid #808080ff");
            obj.style.set_padding("0 0 0 0");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);

            obj = new Static("Static03", "absolute", "856", "170", "128", "15", null, null, this);
            obj.set_taborder("26");
            obj.set_cssclass("sta_WF_title");
            obj.style.set_background("left middle");
            obj.style.set_border("1 solid #808080ff");
            obj.style.set_padding("0 0 0 0");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);

            obj = new Static("Static00", "absolute", "20", "273", "172", "79", null, null, this);
            obj.set_taborder("27");
            obj.set_text("4. hexToRgb\r\n");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static01", "absolute", "191", "273", "496", "40", null, null, this);
            obj.set_taborder("28");
            obj.set_text("(string) ⇒ (\"#FF8C00\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static04", "absolute", "191", "312", "496", "40", null, null, this);
            obj.set_taborder("29");
            obj.set_text("(string) ⇒ (\"FF8C0064\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button06", "absolute", "615", "282", "56", "22", null, null, this);
            obj.set_taborder("30");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button07", "absolute", "615", "321", "56", "22", null, null, this);
            obj.set_taborder("31");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_4_result01", "absolute", "686", "273", "318", "40", null, null, this);
            obj.set_taborder("32");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_4_result02", "absolute", "686", "312", "318", "40", null, null, this);
            obj.set_taborder("33");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static05", "absolute", "856", "286", "128", "15", null, null, this);
            obj.set_taborder("34");
            obj.set_cssclass("sta_WF_title");
            obj.style.set_background("left middle");
            obj.style.set_border("1 solid #808080ff");
            obj.style.set_padding("0 0 0 0");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);

            obj = new Static("Static09", "absolute", "856", "326", "128", "15", null, null, this);
            obj.set_taborder("35");
            obj.set_cssclass("sta_WF_title");
            obj.style.set_background("left middle");
            obj.style.set_border("1 solid #808080ff");
            obj.style.set_padding("0 0 0 0");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 1024, 768, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("Color");
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("Color.xfdl", function() {
        /*
         * Eco.Color api Sample at nexacro
         * 
         * Copyright (c) 2014 EcoSystem of TOBESOFT
         * Licensed Free under nexacro.
        */

        // 1.1 hslToRgb api 사용 예제
        this.Button00_onclick = function(obj,e)
        {
        	var rgb = Eco.Color.hslToRgb(100,240,120);
        	this.st_1_result01.set_text("(array) [" + rgb + "]");
        	trace(rgb); //output: [0,255,128]
        }

        // 1.2 hslToRgb api 사용 예제
        this.Button01_onclick = function(obj,e)
        {
        	var rgb = Eco.Color.hslToRgb(20,240,120);
        	this.st_1_result02.set_text( "(array) [" + rgb + "]" );
        	trace(rgb); //output: [255,128,0]
        }

        // 2.1 rgbToHex  api 사용 예제
        this.Button02_onclick = function(obj,e)
        {
        	var hex = Eco.Color.rgbToHex(255,140,0);
        	this.st_2_result01.set_text( "(string) " + hex );
        	this.Static02.style.set_background_color( hex );
        	trace(hex); //output: #FF8C00
        }

        // 2.2 rgbToHex  api 사용 예제
        this.Button03_onclick = function(obj,e)
        {
        	var hex = Eco.Color.rgbToHex(255,140,0, 100);
        	this.st_2_result02.set_text( "(string) " + hex );
        	this.Static03.style.set_background_color( hex );
        	trace(hex); //output: #FF8C0064	
        }

        // 3.1 rgbToHsl  api 사용 예제
        this.Button04_onclick = function(obj,e)
        {
        	var hsl = Eco.Color.rgbToHsl(100,150,200);
        	this.st_3_result01.set_text( "(array) [" + hsl + "]" );
        	trace(hsl); //output: [140,114,141]
        }

        // 3.2 rgbToHsl  api 사용 예제
        this.Button05_onclick = function(obj,e)
        {
        	var hsl = Eco.Color.rgbToHsl(200,150,100);
        	this.st_3_result02.set_text( "(array) [" + hsl + "]" );
        	trace(hsl); //output: [20,114,141]
        }

        // 4.1 hexToRgb  api 사용 예제
        this.Button06_onclick = function(obj,e)
        {
        	var hex = "#FF8C00";
        	var rgba = Eco.Color.hexToRgb(hex);
        	this.st_4_result01.set_text( "(array) " + rgba );
        	this.Static05.style.set_background_color( hex );
        	trace(rgba); //output: [255,140,0]
        }

        // 4.1 hexToRgb  api 사용 예제
        this.Button07_onclick = function(obj,e)
        {
        	var hex = "#FF8C0064";
        	var rgba = Eco.Color.hexToRgb(hex);
        	this.st_4_result02.set_text( "(array) " + rgba );
        	this.Static09.style.set_background_color( hex );
        	trace(rgba); //output: [255,140,0, 100]
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.Button00.addEventHandler("onclick", this.Button00_onclick, this);
            this.Button01.addEventHandler("onclick", this.Button01_onclick, this);
            this.Button02.addEventHandler("onclick", this.Button02_onclick, this);
            this.Button03.addEventHandler("onclick", this.Button03_onclick, this);
            this.Button04.addEventHandler("onclick", this.Button04_onclick, this);
            this.Button05.addEventHandler("onclick", this.Button05_onclick, this);
            this.Button06.addEventHandler("onclick", this.Button06_onclick, this);
            this.Button07.addEventHandler("onclick", this.Button07_onclick, this);

        };

        this.loadIncludeScript("Color.xfdl");

       
    };
}
)();
