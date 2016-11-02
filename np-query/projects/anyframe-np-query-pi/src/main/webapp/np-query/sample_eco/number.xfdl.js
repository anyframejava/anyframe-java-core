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
                this.set_name("number");
                this.set_classname("number");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,1024,1070);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("Static01", "absolute", "20", "39", "196", "157", null, null, this);
            obj.set_taborder("0");
            obj.set_text("1. plus");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static02", "absolute", "20", "195", "196", "79", null, null, this);
            obj.set_taborder("1");
            obj.set_text("2. divide");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static03", "absolute", "20", "273", "196", "79", null, null, this);
            obj.set_taborder("2");
            obj.set_text("3. multiply");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static04", "absolute", "20", "351", "196", "79", null, null, this);
            obj.set_taborder("3");
            obj.set_text("4. intToHanGul");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static16", "absolute", "20", "429", "196", "79", null, null, this);
            obj.set_taborder("4");
            obj.set_text("5. intToHanJa");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static21", "absolute", "215", "156", "370", "40", null, null, this);
            obj.set_taborder("5");
            obj.set_text("1660 - 1559.9 + 0.33");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static22", "absolute", "215", "351", "370", "40", null, null, this);
            obj.set_taborder("6");
            obj.set_text("(number) ⇒ 1200340500.01");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static23", "absolute", "215", "390", "370", "40", null, null, this);
            obj.set_taborder("7");
            obj.set_text("(number) ⇒ 1200340500");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static24", "absolute", "215", "429", "370", "40", null, null, this);
            obj.set_taborder("8");
            obj.set_text("(number) ⇒ 1200340500.01");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static25", "absolute", "215", "468", "370", "40", null, null, this);
            obj.set_taborder("9");
            obj.set_text("(number) ⇒ 1200340500");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static00", "absolute", "215", "39", "370", "40", null, null, this);
            obj.set_taborder("10");
            obj.set_text("(number,  number) ⇒ ( 0.1, 0.2 )");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static09", "absolute", "215", "78", "370", "40", null, null, this);
            obj.set_taborder("11");
            obj.set_text("(number,  number, number) ⇒\r\n(1660, -1559.9, 0.33)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static11", "absolute", "215", "195", "370", "40", null, null, this);
            obj.set_taborder("12");
            obj.set_text("(number,  number, number) ⇒\r\n(1660, -1559.9, 0.33)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static13", "absolute", "215", "273", "370", "40", null, null, this);
            obj.set_taborder("13");
            obj.set_text("(number,  number, number) ⇒\r\n(1660, -1559.9, 0.33)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static15", "absolute", "215", "117", "370", "40", null, null, this);
            obj.set_taborder("14");
            obj.set_text("0.1 + 0.2");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button00", "absolute", "519", "48", "56", "22", null, null, this);
            obj.set_taborder("15");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button01", "absolute", "519", "87", "56", "22", null, null, this);
            obj.set_taborder("16");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button04", "absolute", "519", "204", "56", "22", null, null, this);
            obj.set_taborder("17");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_result01", "absolute", "584", "39", "420", "40", null, null, this);
            obj.set_taborder("18");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_result02", "absolute", "584", "78", "420", "40", null, null, this);
            obj.set_taborder("19");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_2_result01", "absolute", "584", "195", "420", "40", null, null, this);
            obj.set_taborder("20");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button06", "absolute", "519", "282", "56", "22", null, null, this);
            obj.set_taborder("21");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result01", "absolute", "584", "273", "420", "40", null, null, this);
            obj.set_taborder("22");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button02", "absolute", "519", "126", "56", "22", null, null, this);
            obj.set_taborder("23");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_result03", "absolute", "584", "117", "420", "40", null, null, this);
            obj.set_taborder("24");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_result04", "absolute", "584", "156", "420", "40", null, null, this);
            obj.set_taborder("25");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_4_result01", "absolute", "584", "351", "420", "40", null, null, this);
            obj.set_taborder("26");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_4_result02", "absolute", "584", "390", "420", "40", null, null, this);
            obj.set_taborder("27");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_5_result01", "absolute", "584", "429", "420", "40", null, null, this);
            obj.set_taborder("28");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_5_result02", "absolute", "584", "468", "420", "40", null, null, this);
            obj.set_taborder("29");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button03", "absolute", "519", "165", "56", "22", null, null, this);
            obj.set_taborder("30");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button08", "absolute", "519", "360", "56", "22", null, null, this);
            obj.set_taborder("31");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button09", "absolute", "519", "399", "56", "22", null, null, this);
            obj.set_taborder("32");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button10", "absolute", "519", "438", "56", "22", null, null, this);
            obj.set_taborder("33");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button11", "absolute", "519", "476", "56", "22", null, null, this);
            obj.set_taborder("34");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static06", "absolute", "215", "0", "370", "40", null, null, this);
            obj.set_taborder("35");
            obj.set_text("Arguments:  ( Type ) ⇒ ( Value )");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static07", "absolute", "20", "0", "196", "40", null, null, this);
            obj.set_taborder("36");
            obj.set_text("Method");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static08", "absolute", "584", "0", "420", "40", null, null, this);
            obj.set_taborder("37");
            obj.set_text("Result: (Type) Vaule");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static05", "absolute", "215", "234", "370", "40", null, null, this);
            obj.set_taborder("38");
            obj.set_text("1660 / -1559.9 / 0.33");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button05", "absolute", "519", "243", "56", "22", null, null, this);
            obj.set_taborder("39");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_2_result02", "absolute", "584", "234", "420", "40", null, null, this);
            obj.set_taborder("40");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static18", "absolute", "215", "312", "370", "40", null, null, this);
            obj.set_taborder("41");
            obj.set_text("1660 * -1559.9 * 0.33");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button07", "absolute", "519", "321", "56", "22", null, null, this);
            obj.set_taborder("42");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result02", "absolute", "584", "312", "420", "40", null, null, this);
            obj.set_taborder("43");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static10", "absolute", "20", "507", "196", "118", null, null, this);
            obj.set_taborder("45");
            obj.set_text("6. bytesToSize");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static12", "absolute", "20", "624", "196", "157", null, null, this);
            obj.set_taborder("46");
            obj.set_text("7. evenRound");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static14", "absolute", "20", "780", "196", "235", null, null, this);
            obj.set_taborder("47");
            obj.set_text("8. getMaskFormatString");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static17", "absolute", "215", "858", "370", "40", null, null, this);
            obj.set_taborder("48");
            obj.set_text("(number,  string) ⇒ (1234.567, \"9,999.9\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static19", "absolute", "215", "897", "370", "40", null, null, this);
            obj.set_taborder("49");
            obj.set_text("(number,  string) ⇒ (1.2, \"99.99\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static20", "absolute", "215", "936", "370", "40", null, null, this);
            obj.set_taborder("50");
            obj.set_text("(number,  string) ⇒ (1.2, \"9900.0099\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static26", "absolute", "215", "975", "370", "40", null, null, this);
            obj.set_taborder("51");
            obj.set_text("(number,  string) ⇒ (1.2, \"9,999.9\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static27", "absolute", "215", "507", "370", "40", null, null, this);
            obj.set_taborder("52");
            obj.set_text("(number, number, boolean) ⇒\r\n(1023405670, 2, false)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static28", "absolute", "215", "546", "370", "40", null, null, this);
            obj.set_taborder("53");
            obj.set_text("(number, number) ⇒ (1023405670, 0)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static29", "absolute", "215", "585", "370", "40", null, null, this);
            obj.set_taborder("54");
            obj.set_text("(number) ⇒ (1023405670)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static30", "absolute", "215", "624", "370", "40", null, null, this);
            obj.set_taborder("55");
            obj.set_text("(number) ⇒ (1.5)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static31", "absolute", "215", "780", "370", "40", null, null, this);
            obj.set_taborder("56");
            obj.set_text("(number,  string) ⇒ (1234.567, \"99.99\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static32", "absolute", "215", "741", "370", "40", null, null, this);
            obj.set_taborder("57");
            obj.set_text("(number, number) ⇒ (1.525, 2)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static33", "absolute", "215", "663", "370", "40", null, null, this);
            obj.set_taborder("58");
            obj.set_text("(number) ⇒ (2.5)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button12", "absolute", "519", "516", "56", "22", null, null, this);
            obj.set_taborder("59");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button13", "absolute", "519", "555", "56", "22", null, null, this);
            obj.set_taborder("60");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button14", "absolute", "519", "594", "56", "22", null, null, this);
            obj.set_taborder("61");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button15", "absolute", "519", "633", "56", "22", null, null, this);
            obj.set_taborder("62");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_6_result01", "absolute", "584", "507", "420", "40", null, null, this);
            obj.set_taborder("63");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_6_result02", "absolute", "584", "546", "420", "40", null, null, this);
            obj.set_taborder("64");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_6_result03", "absolute", "584", "585", "420", "40", null, null, this);
            obj.set_taborder("65");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_7_result01", "absolute", "584", "624", "420", "40", null, null, this);
            obj.set_taborder("66");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button16", "absolute", "519", "672", "56", "22", null, null, this);
            obj.set_taborder("67");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button18", "absolute", "519", "750", "56", "22", null, null, this);
            obj.set_taborder("68");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_7_result02", "absolute", "584", "663", "420", "40", null, null, this);
            obj.set_taborder("69");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_7_result04", "absolute", "584", "741", "420", "40", null, null, this);
            obj.set_taborder("70");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button19", "absolute", "519", "789", "56", "22", null, null, this);
            obj.set_taborder("71");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_8_result01", "absolute", "584", "780", "420", "40", null, null, this);
            obj.set_taborder("72");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_8_result03", "absolute", "584", "858", "420", "40", null, null, this);
            obj.set_taborder("73");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_8_result04", "absolute", "584", "897", "420", "40", null, null, this);
            obj.set_taborder("74");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_8_result05", "absolute", "584", "936", "420", "40", null, null, this);
            obj.set_taborder("75");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_8_result06", "absolute", "584", "975", "420", "40", null, null, this);
            obj.set_taborder("76");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button21", "absolute", "519", "867", "56", "22", null, null, this);
            obj.set_taborder("77");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button22", "absolute", "519", "906", "56", "22", null, null, this);
            obj.set_taborder("78");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button23", "absolute", "519", "945", "56", "22", null, null, this);
            obj.set_taborder("79");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button24", "absolute", "519", "983", "56", "22", null, null, this);
            obj.set_taborder("80");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static34", "absolute", "215", "702", "370", "40", null, null, this);
            obj.set_taborder("81");
            obj.set_text("(number, number) ⇒ (1.535, 2)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button17", "absolute", "519", "711", "56", "22", null, null, this);
            obj.set_taborder("82");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_7_result03", "absolute", "584", "702", "420", "40", null, null, this);
            obj.set_taborder("83");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static35", "absolute", "215", "819", "370", "40", null, null, this);
            obj.set_taborder("84");
            obj.set_text("(number,  string) ⇒\r\n(1234.567, \"9900.0099\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button20", "absolute", "519", "828", "56", "22", null, null, this);
            obj.set_taborder("85");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_8_result02", "absolute", "584", "819", "420", "40", null, null, this);
            obj.set_taborder("86");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 1024, 1070, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("number");
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("number.xfdl", function() {
        /*
         * Eco.number api Sample at nexacro
         * 
         * Copyright (c) 2014 EcoSystem of TOBESOFT
         * Licensed Free under nexacro.
        */

        // 1.1 plus api 사용 예제
        this.Button00_onclick = function(obj,e)
        {
        	var a = 0.1,
        		b = 0.2;
        	var result = Eco.number.plus(a, b);
        	this.st_1_result01.set_text( "(number) " + result );
        	trace(result);
        }
        // 1.2 plus api 사용 예제
        this.Button01_onclick = function(obj,e)
        {
        	var a = 1660,
        		b = -1559.9,
        		c = 0.33;
        	var result = Eco.number.plus(a, b, c);
        	this.st_1_result02.set_text( "(number) " + result );
        	trace(result);
        }

        // 1.4 javascript plus 연산 사용 예제
        this.Button02_onclick = function(obj,e)
        {
        	var a = 0.1,
        		b = 0.2;
        	var result = a + b;
        	this.st_1_result03.set_text( "(number) " + result );
        	trace(result);
        }

        // 1.5 javascript plus 연산 사용 예제
        this.Button03_onclick = function(obj,e)
        {
        	var a = 1660,
        		b = -1559.9,
        		c = 0.33;
        	var result = a + b + c;
        	this.st_1_result04.set_text( "(number) " + result );
        	trace(result);
        }

        // 2.1 divide api 사용 예제
        this.Button04_onclick = function(obj,e)
        {
        	var a = 1660,
        		b = -1559.9,
        		c = 0.33;
        	var result = Eco.number.divide(a, b, c);
        	this.st_2_result01.set_text( "(number) " + result );
        	trace(result);
        }

        // 2.3 javascript divide 연산 사용 예제
        this.Button05_onclick = function(obj,e)
        {
        	var a = 1660,
        		b = -1559.9,
        		c = 0.33;
        	var result = a / b / c;
        	this.st_2_result02.set_text( "(number) " + result );
        	trace(result);
        }

        // 3.1 multiply api 사용 예제
        this.Button06_onclick = function(obj,e)
        {
        	var a = 1660,
        		b = -1559.9,
        		c = 0.33;
        	var result = Eco.number.multiply(a, b, c);
        	this.st_3_result01.set_text( "(number) " + result );
        	trace(result);
        }

        // 3.3 javascript multiply 연산 사용 예제
        this.Button07_onclick = function(obj,e)
        {
        	var a = 1660,
        		b = -1559.9,
        		c = 0.33;
        	var result = a * b * c;
        	this.st_3_result02.set_text( "(number) " + result );
        	trace(result);
        }

        // 4.1 intToHanGul api 사용 예제
        this.Button08_onclick = function(obj,e)
        {
        	var val = 1200340500.01;
        	var str = Eco.number.intToHanGul(val);
        	this.st_4_result01.set_text( str );
        	trace(str);
        }

        // 4.2 intToHanGul api 사용 예제
        this.Button09_onclick = function(obj,e)
        {
        	var val = 1200340500;
        	var str = Eco.number.intToHanGul(val);
        	this.st_4_result02.set_text( str );
        	trace(str);
        }

        // 5.1 intToHanJa api 사용 예제
        this.Button10_onclick = function(obj,e)
        {
        	var val = 1200340500.01;
        	var str = Eco.number.intToHanJa(val);
        	this.st_5_result01.set_text( str );
        	trace(str);
        }

        // 5.2 intToHanJa api 사용 예제
        this.Button11_onclick = function(obj,e)
        {
        	var val = 1200340500;
        	var str = Eco.number.intToHanJa(val);
        	this.st_5_result02.set_text( str );
        	trace(str);
        }

        // 6.1 bytesToSize api 사용 예제
        this.Button12_onclick = function(obj,e)
        {
        	var size = 1023405670,
        		precision = 2,
        		unit = false;
        	var result = Eco.number.bytesToSize(size, precision, unit);
        	this.st_6_result01.set_text( "(number) " + result );
        	trace(result);
        }

        // 6.2 bytesToSize api 사용 예제
        this.Button13_onclick = function(obj,e)
        {
        	var size = 1023405670,
        		precision = 0;
        	var result = Eco.number.bytesToSize(size, precision);
        	this.st_6_result02.set_text( "(string) " + result );
        	trace(result);
        }

        // 6.3 bytesToSize api 사용 예제
        this.Button14_onclick = function(obj,e)
        {
        	var size = 1023405670;
        	var result = Eco.number.bytesToSize(size);
        	this.st_6_result03.set_text( "(string) " + result );
        	trace(result);
        }

        // 7.1 evenRound api 사용 예제
        this.Button15_onclick = function(obj,e)
        {
        	var val = 1.5;
        	var result = Eco.number.evenRound(val);
        	this.st_7_result01.set_text( "(number) " + result );
        	trace(result);
        }

        // 7.2 evenRound api 사용 예제
        this.Button16_onclick = function(obj,e)
        {
        	var val = 2.5;
        	var result = Eco.number.evenRound(val);
        	this.st_7_result02.set_text( "(number) " + result );
        	trace(result);
        }

        // 7.3 evenRound api 사용 예제
        this.Button17_onclick = function(obj,e)
        {
        	var val = 1.535;
        	var result = Eco.number.evenRound(val, 2);
        	this.st_7_result03.set_text( "(number) " + result );
        	trace(result);
        }

        // 7.4 evenRound api 사용 예제
        this.Button18_onclick = function(obj,e)
        {
        	var val = 1.525;
        	var result = Eco.number.evenRound(val, 2);
        	this.st_7_result04.set_text( "(number) " + result );
        	trace(result);
        }

        // 8.1 getMaskFormatString api 사용 예제
        this.Button19_onclick = function(obj,e)
        {
        	var val = 1234.567; 
        	var result = Eco.number.getMaskFormatString(val, "99.99");
        	this.st_8_result01.set_text( "(string) " + result );
        	trace(result);
        }

        // 8.2 getMaskFormatString api 사용 예제
        this.Button20_onclick = function(obj,e)
        {
        	var val = 1234.567; 
        	var result = Eco.number.getMaskFormatString(val, "9900.0099");
        	this.st_8_result02.set_text( "(string) " + result );
        	trace(result);
        }

        // 8.3 getMaskFormatString api 사용 예제
        this.Button21_onclick = function(obj,e)
        {
        	var val = 1234.567; 
        	var result = Eco.number.getMaskFormatString(val, "9,999.9");
        	this.st_8_result03.set_text( "(string) " + result );
        	trace(result);
        }

        // 8.4 getMaskFormatString api 사용 예제
        this.Button22_onclick = function(obj,e)
        {
        	var val = 1.2; 
        	var result = Eco.number.getMaskFormatString(val, "99.99");
        	this.st_8_result04.set_text( "(string) " + result );
        	trace(result);
        }

        // 8.5 getMaskFormatString api 사용 예제
        this.Button23_onclick = function(obj,e)
        {
        	var val = 1.2; 
        	var result = Eco.number.getMaskFormatString(val, "9900.0099");
        	this.st_8_result05.set_text( "(string) " + result );
        	trace(result);
        }

        // 8.6 getMaskFormatString api 사용 예제
        this.Button24_onclick = function(obj,e)
        {
        	var val = 1.2; 
        	var result = Eco.number.getMaskFormatString(val, "9,999.9");
        	this.st_8_result06.set_text( "(string) " + result );
        	trace(result);
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.Static09.addEventHandler("onclick", this.Static09_onclick, this);
            this.Button00.addEventHandler("onclick", this.Button00_onclick, this);
            this.Button01.addEventHandler("onclick", this.Button01_onclick, this);
            this.Button04.addEventHandler("onclick", this.Button04_onclick, this);
            this.Button06.addEventHandler("onclick", this.Button06_onclick, this);
            this.Button02.addEventHandler("onclick", this.Button02_onclick, this);
            this.Button03.addEventHandler("onclick", this.Button03_onclick, this);
            this.Button08.addEventHandler("onclick", this.Button08_onclick, this);
            this.Button09.addEventHandler("onclick", this.Button09_onclick, this);
            this.Button10.addEventHandler("onclick", this.Button10_onclick, this);
            this.Button11.addEventHandler("onclick", this.Button11_onclick, this);
            this.Button05.addEventHandler("onclick", this.Button05_onclick, this);
            this.Button07.addEventHandler("onclick", this.Button07_onclick, this);
            this.Static28.addEventHandler("onclick", this.Static09_onclick, this);
            this.Button12.addEventHandler("onclick", this.Button12_onclick, this);
            this.Button13.addEventHandler("onclick", this.Button13_onclick, this);
            this.Button14.addEventHandler("onclick", this.Button14_onclick, this);
            this.Button15.addEventHandler("onclick", this.Button15_onclick, this);
            this.Button16.addEventHandler("onclick", this.Button16_onclick, this);
            this.Button18.addEventHandler("onclick", this.Button18_onclick, this);
            this.Button19.addEventHandler("onclick", this.Button19_onclick, this);
            this.Button21.addEventHandler("onclick", this.Button21_onclick, this);
            this.Button22.addEventHandler("onclick", this.Button22_onclick, this);
            this.Button23.addEventHandler("onclick", this.Button23_onclick, this);
            this.Button24.addEventHandler("onclick", this.Button24_onclick, this);
            this.Button17.addEventHandler("onclick", this.Button17_onclick, this);
            this.Button20.addEventHandler("onclick", this.Button20_onclick, this);

        };

        this.loadIncludeScript("number.xfdl");

       
    };
}
)();
