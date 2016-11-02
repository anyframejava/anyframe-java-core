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
                this.set_name("Style");
                this.set_classname("Style");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,1024,890);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("Static06", "absolute", "20", "39", "172", "79", null, null, this);
            obj.set_taborder("0");
            obj.set_text("1. getBorderWidth");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static07", "absolute", "20", "117", "172", "79", null, null, this);
            obj.set_taborder("1");
            obj.set_text("2. getPadding\r\n");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static08", "absolute", "20", "195", "172", "79", null, null, this);
            obj.set_taborder("2");
            obj.set_text("3.getMargin");
            obj.set_cssclass("WFDA_sta_label");
            obj.style.set_font("antialias bold strikeout 10 nanumgothic, 9 dotum");
            this.addChild(obj.name, obj);

            obj = new Static("Static09", "absolute", "20", "273", "172", "118", null, null, this);
            obj.set_taborder("3");
            obj.set_text("4.getCurrentStyle\r\n");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static16", "absolute", "20", "390", "172", "118", null, null, this);
            obj.set_taborder("4");
            obj.set_text("5.getStyle");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static17", "absolute", "20", "507", "172", "118", null, null, this);
            obj.set_taborder("5");
            obj.set_text("6. setStyle");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static22", "absolute", "191", "390", "544", "118", null, null, this);
            obj.set_taborder("6");
            obj.set_text("(XComp) ⇒ ");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static25", "absolute", "191", "507", "544", "40", null, null, this);
            obj.set_taborder("7");
            obj.set_text("(XComp,object) ⇒ (st_sample9, {color:\"red\"})");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static26", "absolute", "191", "546", "544", "40", null, null, this);
            obj.set_taborder("8");
            obj.set_text("(XComp,object) ⇒ (st_sample9, {color:\"red\"}, false)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static27", "absolute", "191", "585", "544", "40", null, null, this);
            obj.set_taborder("9");
            obj.set_text("(XComp,object) ⇒ (st_sample9, {align:\"right middle\", color:\"red\"})");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static10", "absolute", "191", "39", "544", "40", null, null, this);
            obj.set_taborder("10");
            obj.set_text("(XComp) ⇒ ");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static99", "absolute", "191", "78", "544", "40", null, null, this);
            obj.set_taborder("11");
            obj.set_text("(XComp) ⇒ ");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static12", "absolute", "191", "117", "544", "40", null, null, this);
            obj.set_taborder("12");
            obj.set_text("(XComp) ⇒ ");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static13", "absolute", "191", "156", "544", "40", null, null, this);
            obj.set_taborder("13");
            obj.set_text("(XComp) ⇒ ");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static14", "absolute", "191", "273", "544", "118", null, null, this);
            obj.set_taborder("14");
            obj.set_text("(XComp) ⇒ ");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static15", "absolute", "191", "234", "544", "40", null, null, this);
            obj.set_taborder("15");
            obj.set_text("(XComp) ⇒ ");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static18", "absolute", "191", "195", "544", "40", null, null, this);
            obj.set_taborder("16");
            obj.set_text("(XComp) ⇒ ");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static30", "absolute", "191", "0", "544", "40", null, null, this);
            obj.set_taborder("17");
            obj.set_text("Arguments:  ( Type ) ⇒ ( Value )");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static31", "absolute", "20", "0", "172", "40", null, null, this);
            obj.set_taborder("18");
            obj.set_text("Method");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static32", "absolute", "734", "0", "270", "40", null, null, this);
            obj.set_taborder("19");
            obj.set_text("Result: (Type) Vaule");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Button("Button08", "absolute", "663", "516", "56", "22", null, null, this);
            obj.set_taborder("21");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button09", "absolute", "663", "555", "56", "22", null, null, this);
            obj.set_taborder("22");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button10", "absolute", "663", "594", "56", "22", null, null, this);
            obj.set_taborder("23");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button00", "absolute", "663", "48", "56", "22", null, null, this);
            obj.set_taborder("24");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button01", "absolute", "663", "87", "56", "22", null, null, this);
            obj.set_taborder("25");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button02", "absolute", "663", "126", "56", "22", null, null, this);
            obj.set_taborder("26");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button03", "absolute", "663", "165", "56", "22", null, null, this);
            obj.set_taborder("27");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_result01", "absolute", "734", "39", "270", "40", null, null, this);
            obj.set_taborder("28");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_result02", "absolute", "734", "78", "270", "40", null, null, this);
            obj.set_taborder("29");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_2_result01", "absolute", "734", "117", "270", "40", null, null, this);
            obj.set_taborder("30");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_2_result02", "absolute", "734", "156", "270", "40", null, null, this);
            obj.set_taborder("31");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button04", "absolute", "663", "204", "56", "22", null, null, this);
            obj.set_taborder("32");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            obj.set_enable("false");
            this.addChild(obj.name, obj);

            obj = new Button("Button05", "absolute", "663", "243", "56", "22", null, null, this);
            obj.set_taborder("33");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            obj.set_enable("false");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result01", "absolute", "734", "195", "270", "40", null, null, this);
            obj.set_taborder("34");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result02", "absolute", "734", "234", "270", "40", null, null, this);
            obj.set_taborder("35");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button06", "absolute", "663", "319", "56", "22", null, null, this);
            obj.set_taborder("36");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button07", "absolute", "663", "435", "56", "22", null, null, this);
            obj.set_taborder("37");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_14_result03", "absolute", "734", "507", "270", "40", null, null, this);
            obj.set_taborder("38");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_14_result04", "absolute", "734", "546", "270", "40", null, null, this);
            obj.set_taborder("39");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_14_result05", "absolute", "734", "585", "270", "40", null, null, this);
            obj.set_taborder("40");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_sample", "absolute", "283", "52", "307", "15", null, null, this);
            obj.set_taborder("41");
            obj.set_text("border 없음");
            obj.style.set_background("left middle");
            this.addChild(obj.name, obj);

            obj = new Static("st_sample2", "absolute", "283", "86", "307", "23", null, null, this);
            obj.set_taborder("42");
            obj.set_text("border width = 1~4");
            obj.style.set_background("left middle");
            obj.style.set_border("1 solid #808080ff,2 solid #808080ff,3 solid #808080ff,4 solid #808080ff");
            this.addChild(obj.name, obj);

            obj = new Static("st_sample3", "absolute", "283", "125", "307", "23", null, null, this);
            obj.set_taborder("43");
            obj.set_text("전체 padding = 0");
            obj.style.set_background("left middle");
            obj.style.set_border("1 solid #808080ff");
            this.addChild(obj.name, obj);

            obj = new Static("st_sample4", "absolute", "283", "164", "307", "23", null, null, this);
            obj.set_taborder("44");
            obj.set_text("left padding = 20");
            obj.style.set_background("left middle");
            obj.style.set_border("1 solid #808080ff");
            obj.style.set_padding("0 0 0 20");
            this.addChild(obj.name, obj);

            obj = new Static("st_sample5", "absolute", "283", "202", "307", "23", null, null, this);
            obj.set_taborder("45");
            obj.set_text("전체 margin = 0");
            obj.style.set_background("left middle");
            obj.style.set_border("1 solid #808080ff");
            obj.style.set_padding("0 0 0 0");
            obj.style.set_font("strikeout 9 Verdana, antialias 9 malgun gothic");
            this.addChild(obj.name, obj);

            obj = new Static("st_sample6", "absolute", "282", "241", "308", "23", null, null, this);
            obj.set_taborder("46");
            obj.set_text("left margin = 20");
            obj.style.set_background("left middle");
            obj.style.set_border("1 solid #808080ff");
            obj.style.set_padding("0 0 0 0");
            obj.style.set_font("strikeout 9 Verdana, antialias 9 malgun gothic");
            this.addChild(obj.name, obj);

            obj = new Static("st_sample7", "absolute", "283", "319", "307", "24", null, null, this);
            obj.set_taborder("47");
            obj.set_text("Static");
            obj.set_cssclass("WF_sta_SubTitle");
            obj.style.set_border("1 solid #808080ff");
            this.addChild(obj.name, obj);

            obj = new Static("st_sample8", "absolute", "283", "436", "307", "23", null, null, this);
            obj.set_taborder("48");
            obj.set_text("Static");
            obj.set_cssclass("WF_sta_Dsc");
            obj.style.set_border("1 solid #808080ff");
            this.addChild(obj.name, obj);

            obj = new Static("st_sample9", "absolute", "754", "518", "70", "15", null, null, this);
            obj.set_taborder("49");
            obj.set_text("Static");
            obj.style.set_background("left middle");
            obj.style.set_border("1 solid #808080ff");
            obj.style.set_padding("0 0 0 0");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);

            obj = new Static("st_sample10", "absolute", "754", "556", "70", "15", null, null, this);
            obj.set_taborder("50");
            obj.set_text("Static");
            obj.style.set_background("left middle");
            obj.style.set_border("1 solid #808080ff");
            obj.style.set_padding("0 0 0 0");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);

            obj = new Static("st_sample11", "absolute", "754", "596", "70", "15", null, null, this);
            obj.set_taborder("51");
            obj.set_text("Static");
            obj.style.set_background("left middle");
            obj.style.set_border("1 solid #808080ff");
            obj.style.set_padding("0 0 0 0");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);

            obj = new TextArea("txt_5_result01", "absolute", "734", "390", "270", "118", null, null, this);
            obj.set_taborder("52");
            this.addChild(obj.name, obj);

            obj = new TextArea("txt_4_result01", "absolute", "734", "273", "270", "118", null, null, this);
            obj.set_taborder("53");
            this.addChild(obj.name, obj);

            obj = new Static("Static00", "absolute", "20", "624", "172", "203", null, null, this);
            obj.set_taborder("54");
            obj.set_text("7. setStyleIf");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static01", "absolute", "191", "752", "544", "75", null, null, this);
            obj.set_taborder("55");
            obj.set_cssclass("WFDA_sta_Box");
            obj.set_text("(xComp, styleValue, condition, scope, clearFlag)\r\n⇒ (this.btn_result_02, {background:\"orange\", align:\"right middle\"}, \"\", this, false)");
            this.addChild(obj.name, obj);

            obj = new Static("Static02", "absolute", "191", "624", "544", "61", null, null, this);
            obj.set_taborder("56");
            obj.set_cssclass("WFDA_sta_Box");
            obj.set_text("(xComp, styleValue, condition, scope, clearFlag)\r\n⇒ (this.btn_result_01, {color:\"blue\"}, \"red\", this, false)");
            this.addChild(obj.name, obj);

            obj = new Static("Static11", "absolute", "191", "684", "544", "69", null, null, this);
            obj.set_taborder("57");
            obj.set_cssclass("WFDA_sta_Box");
            obj.set_text("(xComp, styleValue, condition, scope, clearFlag)\r\n⇒ (this.btn_result_02, {border:\"3 double red\", color: \"red\"}, function(){}, this)");
            this.addChild(obj.name, obj);

            obj = new Button("Button13", "absolute", "663", "764", "56", "22", null, null, this);
            obj.set_taborder("58");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button11", "absolute", "663", "633", "56", "22", null, null, this);
            obj.set_taborder("59");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_7_result01", "absolute", "734", "624", "270", "61", null, null, this);
            obj.set_taborder("60");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button12", "absolute", "663", "693", "56", "22", null, null, this);
            obj.set_taborder("61");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_7_result02", "absolute", "734", "684", "270", "69", null, null, this);
            obj.set_taborder("62");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_7_result03", "absolute", "734", "752", "270", "75", null, null, this);
            obj.set_taborder("63");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("btn_result_02", "absolute", "756", "705", "116", "37", null, null, this);
            obj.set_taborder("64");
            obj.set_text("btn_result_02");
            this.addChild(obj.name, obj);

            obj = new Button("btn_result_01", "absolute", "756", "635", "116", "37", null, null, this);
            obj.set_taborder("65");
            obj.set_text("btn_result_01");
            obj.style.set_color("red");
            this.addChild(obj.name, obj);

            obj = new Button("btn_result_03", "absolute", "756", "764", "116", "37", null, null, this);
            obj.set_taborder("66");
            obj.set_text("btn_result_03");
            obj.style.set_align("left middle");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 1024, 890, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("Style");
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("Style.xfdl", function() {
        /*
         * Eco.XComp.Style api Sample at nexacro
         * 
         * Copyright (c) 2014 EcoSystem of TOBESOFT
         * Licensed Free under nexacro.
        */

        // 1.1 getBorderWidth api 사용 예제
        this.Button00_onclick = function(obj,e)
        {
        	var border = Eco.XComp.Style.getBorderWidth(this.st_sample);
        	this.st_1_result01.set_text( "(array) [" + border + "]" );
        	trace(Eco.XComp.Style.getBorderWidth(this.st_sample)); //output: [0,0,0,0]
        }

        // 1.2 getBorderWidth api 사용 예제
        this.Button01_onclick = function(obj,e)
        {
        	var border = Eco.XComp.Style.getBorderWidth(this.st_sample2);
        	this.st_1_result02.set_text( "(array) [" + border + "]" );
        	trace(Eco.XComp.Style.getBorderWidth(this.st_sample2)); //output: [4,1,2,3]
        }

        // 2.1 getPadding  api 사용 예제
        this.Button02_onclick = function(obj,e)
        {
        	var padding = Eco.XComp.Style.getPadding(this.st_sample3);
        	this.st_2_result01.set_text( "(array) [" + padding + "]" );
        	trace(Eco.XComp.Style.getPadding(this.st_sample3)); //output: [0,0,0,0]
        }

        // 2.2 getPadding  api 사용 예제
        this.Button03_onclick = function(obj,e)
        {
        	var padding = Eco.XComp.Style.getPadding(this.st_sample4);
        	this.st_2_result02.set_text( "(array) [" + padding + "]" );
        	trace(Eco.XComp.Style.getPadding(this.st_sample4)); //output: [20,0,0,0]
        }

        // 3.1 getMargin  api 사용 예제
        this.Button04_onclick = function(obj,e)
        {
        	trace("deprecated!!");
        	/*
        	var margin = Eco.XComp.Style.getMargin(this.st_sample5);
        	this.st_3_result01.set_text( "(array) [" + margin + "]" );
        	trace(Eco.XComp.Style.getMargin(this.st_sample5)); //output: [20,0,0,0]
        	*/
        }

        // 3.2 getMargin  api 사용 예제
        this.Button05_onclick = function(obj,e)
        {
        	trace("deprecated!!");
        	/*
        	var margin = Eco.XComp.Style.getMargin(this.st_sample6);
        	this.st_3_result02.set_text( "(array) [" + margin + "]" );
        	trace(Eco.XComp.Style.getMargin(this.st_sample6)); //output: [20,0,0,0]
        	*/
        }

        // 4.1 getCurrentStyle  api 사용 예제
        this.Button06_onclick = function(obj,e)
        {
        	var currentStyle = Eco.XComp.Style.getCurrentStyle(this.st_sample7);
        	var str = objectToString(currentStyle);
        	this.txt_4_result01.set_value( "(object) " + str );
        	trace(str);
        }

        
        function objectToString(json)
        {
        	var str = "";
        	var data = "";
        	
        	for(var name in json)
        	{
        		if ( json.hasOwnProperty(name) )
        		{
        			data = name + ": " + '"' + json[name] + '"' + "\n";
        			
        			str += "\t" + (str.length > 0 ? "," : "") + data;
        		}
        	}
        	
        	return "\n{\n" + str + "}";
        }

        
        // 5.1 getStyle  api 사용 예제
        this.Button07_onclick = function(obj,e)
        {
        	var style = Eco.XComp.Style.getStyle(this.st_sample8);
        	var str = objectToString(style);
        	this.txt_5_result01.set_value( "(object) " + str );
        	trace(str);
        }

        // 6.1 setStyle  api 사용 예제
        this.Button08_onclick = function(obj,e)
        {
        	//this.st_sample9.style.set_border("1px solid blue");
        	//this.st_sample9.style.set_border("");
        	//this.st_sample9.style.set_color("red");
        	//return;
        	var styleValue = {color: "red"};
        	Eco.XComp.Style.setStyle(this.st_sample9, styleValue);
        }

        // 6.2 setStyle  api 사용 예제
        this.Button09_onclick = function(obj,e)
        {
        	var styleValue = {color: "red"};
        	Eco.XComp.Style.setStyle(this.st_sample10, styleValue, false);
        }

        // 6.3 setStyle  api 사용 예제
        this.Button10_onclick = function(obj,e)
        {
        	var styleValue = {align: "right middle", color: "red"};
        	Eco.XComp.Style.setStyle(this.st_sample11, styleValue);
        }

        // 7.1 setStyleIf api 사용 예제
        this.Button11_onclick = function(obj,e)
        {
        	 ////btn_result_01의 color속성이 'red'일 경우에 color를 "blue"로 변경 
        	 var styleValue = {color:"blue"};
        	 Eco.XComp.Style.setStyleIf(this.btn_result_01, styleValue, "red", this, false);
        }

        // 7.2 setStyleIf api 사용 예제
        this.Button12_onclick = function(obj,e)
        {
             //btn_result_02의 enable속성이 true일 경우에만 boder,color 적용
        	 var styleValue = {border:"3 double red", color: "red"};
        	 Eco.XComp.Style.setStyleIf(this.btn_result_02, styleValue, function(xComp, name, value) {
        			if (xComp.enable == true)
        			{
        				return true;
        			}
        			return false;
        		  }
        	 , this);
        }

        // 7.3 setStyleIf api 사용 예제
        this.Button13_onclick = function(obj,e)
        {
        	 //align은 값이 존재해서 적용되지 않는다.
        	 var styleValue = {background:"orange", align:"right middle"};
        	 Eco.XComp.Style.setStyleIf(this.btn_result_03, styleValue, "" , this, false);	
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.Button08.addEventHandler("onclick", this.Button08_onclick, this);
            this.Button09.addEventHandler("onclick", this.Button09_onclick, this);
            this.Button10.addEventHandler("onclick", this.Button10_onclick, this);
            this.Button00.addEventHandler("onclick", this.Button00_onclick, this);
            this.Button01.addEventHandler("onclick", this.Button01_onclick, this);
            this.Button02.addEventHandler("onclick", this.Button02_onclick, this);
            this.Button03.addEventHandler("onclick", this.Button03_onclick, this);
            this.Button04.addEventHandler("onclick", this.Button04_onclick, this);
            this.Button05.addEventHandler("onclick", this.Button05_onclick, this);
            this.Button06.addEventHandler("onclick", this.Button06_onclick, this);
            this.Button07.addEventHandler("onclick", this.Button07_onclick, this);
            this.Button13.addEventHandler("onclick", this.Button13_onclick, this);
            this.Button11.addEventHandler("onclick", this.Button11_onclick, this);
            this.Button12.addEventHandler("onclick", this.Button12_onclick, this);

        };

        this.loadIncludeScript("Style.xfdl");

       
    };
}
)();
