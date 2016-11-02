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
                this.set_name("Eco");
                this.set_classname("Eco");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,1024,2631);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("Static06", "absolute", "20", "117", "226", "79", null, null, this);
            obj.set_taborder("0");
            obj.set_text("2. isNumber");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static07", "absolute", "20", "195", "226", "79", null, null, this);
            obj.set_taborder("1");
            obj.set_text("3. isBoolean");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static08", "absolute", "20", "273", "226", "79", null, null, this);
            obj.set_taborder("2");
            obj.set_text("4. isNull");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static09", "absolute", "20", "351", "226", "79", null, null, this);
            obj.set_taborder("3");
            obj.set_text("5. isUndefined");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static16", "absolute", "20", "429", "226", "196", null, null, this);
            obj.set_taborder("4");
            obj.set_text("6. isObject");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static21", "absolute", "245", "429", "340", "40", null, null, this);
            obj.set_taborder("5");
            obj.set_text("(object) ⇒ (new Object)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static22", "absolute", "245", "468", "340", "40", null, null, this);
            obj.set_taborder("6");
            obj.set_text("(object) ⇒ ({})");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static10", "absolute", "245", "117", "340", "40", null, null, this);
            obj.set_taborder("7");
            obj.set_text("(number) ⇒ (1234)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static99", "absolute", "245", "156", "340", "40", null, null, this);
            obj.set_taborder("8");
            obj.set_text("(string) ⇒ (\"1234\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static12", "absolute", "245", "195", "340", "40", null, null, this);
            obj.set_taborder("9");
            obj.set_text("(boolean) ⇒ (true)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static13", "absolute", "245", "234", "340", "40", null, null, this);
            obj.set_taborder("10");
            obj.set_text("(string) ⇒ (\"true\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static14", "absolute", "245", "351", "340", "40", null, null, this);
            obj.set_taborder("11");
            obj.set_text("(undefined) ⇒ ()");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static18", "absolute", "245", "273", "340", "40", null, null, this);
            obj.set_taborder("12");
            obj.set_text("(null) ⇒ (null)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static29", "absolute", "245", "390", "340", "40", null, null, this);
            obj.set_taborder("13");
            obj.set_text("(string) ⇒ (\"\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static30", "absolute", "245", "0", "340", "40", null, null, this);
            obj.set_taborder("14");
            obj.set_text("Arguments:  ( Type ) ⇒ ( Value )");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static31", "absolute", "20", "0", "226", "40", null, null, this);
            obj.set_taborder("15");
            obj.set_text("Method");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static32", "absolute", "584", "0", "420", "40", null, null, this);
            obj.set_taborder("16");
            obj.set_text("Result: (Type) Vaule");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Button("Button02", "absolute", "519", "126", "56", "22", null, null, this);
            obj.set_taborder("18");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button03", "absolute", "519", "165", "56", "22", null, null, this);
            obj.set_taborder("19");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button04", "absolute", "519", "204", "56", "22", null, null, this);
            obj.set_taborder("20");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button05", "absolute", "519", "243", "56", "22", null, null, this);
            obj.set_taborder("21");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_2_result01", "absolute", "584", "117", "420", "40", null, null, this);
            obj.set_taborder("22");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_2_result02", "absolute", "584", "156", "420", "40", null, null, this);
            obj.set_taborder("23");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button06", "absolute", "519", "282", "56", "22", null, null, this);
            obj.set_taborder("24");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result01", "absolute", "584", "195", "420", "40", null, null, this);
            obj.set_taborder("25");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result02", "absolute", "584", "234", "420", "40", null, null, this);
            obj.set_taborder("26");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_5_result01", "absolute", "584", "351", "420", "40", null, null, this);
            obj.set_taborder("27");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_5_result02", "absolute", "584", "390", "420", "40", null, null, this);
            obj.set_taborder("28");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_6_result01", "absolute", "584", "429", "420", "40", null, null, this);
            obj.set_taborder("29");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_6_result02", "absolute", "584", "468", "420", "40", null, null, this);
            obj.set_taborder("30");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_4_result01", "absolute", "584", "273", "420", "40", null, null, this);
            obj.set_taborder("31");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static00", "absolute", "20", "39", "226", "79", null, null, this);
            obj.set_taborder("32");
            obj.set_text("1. isString");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static01", "absolute", "245", "39", "340", "40", null, null, this);
            obj.set_taborder("33");
            obj.set_text("(string) ⇒ (\"test string!!!\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static02", "absolute", "245", "78", "340", "40", null, null, this);
            obj.set_taborder("34");
            obj.set_text("(number) ⇒ (1234)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button00", "absolute", "519", "48", "56", "22", null, null, this);
            obj.set_taborder("35");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button01", "absolute", "519", "87", "56", "22", null, null, this);
            obj.set_taborder("36");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_result01", "absolute", "584", "39", "420", "40", null, null, this);
            obj.set_taborder("37");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_result02", "absolute", "584", "78", "420", "40", null, null, this);
            obj.set_taborder("38");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static04", "absolute", "245", "507", "340", "40", null, null, this);
            obj.set_taborder("39");
            obj.set_text("(array) ⇒ ([])");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static05", "absolute", "245", "546", "340", "40", null, null, this);
            obj.set_taborder("40");
            obj.set_text("(XComp) ⇒ (new Button)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("st_6_result03", "absolute", "584", "507", "420", "40", null, null, this);
            obj.set_taborder("41");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_6_result04", "absolute", "584", "546", "420", "40", null, null, this);
            obj.set_taborder("42");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static11", "absolute", "245", "312", "340", "40", null, null, this);
            obj.set_taborder("43");
            obj.set_text("(string) ⇒ (\"\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("st_4_result02", "absolute", "584", "312", "420", "40", null, null, this);
            obj.set_taborder("44");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button08", "absolute", "519", "359", "56", "22", null, null, this);
            obj.set_taborder("45");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button09", "absolute", "519", "398", "56", "22", null, null, this);
            obj.set_taborder("46");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button10", "absolute", "519", "437", "56", "22", null, null, this);
            obj.set_taborder("47");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button11", "absolute", "519", "476", "56", "22", null, null, this);
            obj.set_taborder("48");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button12", "absolute", "519", "515", "56", "22", null, null, this);
            obj.set_taborder("49");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button13", "absolute", "519", "554", "56", "22", null, null, this);
            obj.set_taborder("50");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button07", "absolute", "519", "321", "56", "22", null, null, this);
            obj.set_taborder("51");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static03", "absolute", "245", "585", "340", "40", null, null, this);
            obj.set_taborder("52");
            obj.set_text("(XObject) ⇒ (new Dataset)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("st_6_result05", "absolute", "584", "585", "420", "40", null, null, this);
            obj.set_taborder("53");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button14", "absolute", "519", "594", "56", "22", null, null, this);
            obj.set_taborder("54");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static15", "absolute", "20", "702", "226", "79", null, null, this);
            obj.set_taborder("55");
            obj.set_text("8. isDate");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static17", "absolute", "20", "780", "226", "79", null, null, this);
            obj.set_taborder("56");
            obj.set_text("9. isFunction");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static19", "absolute", "20", "858", "226", "79", null, null, this);
            obj.set_taborder("57");
            obj.set_text("10. isRegExp");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static20", "absolute", "20", "936", "226", "274", null, null, this);
            obj.set_taborder("58");
            obj.set_text("11. isPrimitive");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static23", "absolute", "245", "1014", "340", "40", null, null, this);
            obj.set_taborder("59");
            obj.set_text("(string) ⇒ (\"abc\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static24", "absolute", "245", "1053", "340", "40", null, null, this);
            obj.set_taborder("60");
            obj.set_text("(number) ⇒ (123)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static25", "absolute", "245", "702", "340", "40", null, null, this);
            obj.set_taborder("61");
            obj.set_text("(date) ⇒ (new Date())");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static26", "absolute", "245", "741", "340", "40", null, null, this);
            obj.set_taborder("62");
            obj.set_text("(string) ⇒ (\"20130501\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static27", "absolute", "245", "780", "340", "40", null, null, this);
            obj.set_taborder("63");
            obj.set_text("(function) ⇒ (Eco.isFunction)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static28", "absolute", "245", "819", "340", "40", null, null, this);
            obj.set_taborder("64");
            obj.set_text("(function) ⇒ (this.testFunction)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static33", "absolute", "245", "936", "340", "40", null, null, this);
            obj.set_taborder("65");
            obj.set_text("(undefined) ⇒ ()");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static34", "absolute", "245", "858", "340", "40", null, null, this);
            obj.set_taborder("66");
            obj.set_text("(regexp) ⇒ (new RegExp())");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static35", "absolute", "245", "975", "340", "40", null, null, this);
            obj.set_taborder("67");
            obj.set_text("(null) ⇒ (null)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button17", "absolute", "519", "711", "56", "22", null, null, this);
            obj.set_taborder("68");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button18", "absolute", "519", "750", "56", "22", null, null, this);
            obj.set_taborder("69");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button19", "absolute", "519", "789", "56", "22", null, null, this);
            obj.set_taborder("70");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button20", "absolute", "519", "828", "56", "22", null, null, this);
            obj.set_taborder("71");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_8_result01", "absolute", "584", "702", "420", "40", null, null, this);
            obj.set_taborder("72");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_8_result02", "absolute", "584", "741", "420", "40", null, null, this);
            obj.set_taborder("73");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button21", "absolute", "519", "867", "56", "22", null, null, this);
            obj.set_taborder("74");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_9_result01", "absolute", "584", "780", "420", "40", null, null, this);
            obj.set_taborder("75");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_9_result02", "absolute", "584", "819", "420", "40", null, null, this);
            obj.set_taborder("76");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_11_result01", "absolute", "584", "936", "420", "40", null, null, this);
            obj.set_taborder("77");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_11_result02", "absolute", "584", "975", "420", "40", null, null, this);
            obj.set_taborder("78");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_11_result03", "absolute", "584", "1014", "420", "40", null, null, this);
            obj.set_taborder("79");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_11_result04", "absolute", "584", "1053", "420", "40", null, null, this);
            obj.set_taborder("80");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_10_result01", "absolute", "584", "858", "420", "40", null, null, this);
            obj.set_taborder("81");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static36", "absolute", "20", "624", "226", "79", null, null, this);
            obj.set_taborder("82");
            obj.set_text("7. isArray");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static37", "absolute", "245", "624", "340", "40", null, null, this);
            obj.set_taborder("83");
            obj.set_text("(array) ⇒ (new Array())");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static38", "absolute", "245", "663", "340", "40", null, null, this);
            obj.set_taborder("84");
            obj.set_text("(array) ⇒ ([1,2,3])");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button15", "absolute", "519", "633", "56", "22", null, null, this);
            obj.set_taborder("85");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button16", "absolute", "519", "672", "56", "22", null, null, this);
            obj.set_taborder("86");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_7_result01", "absolute", "584", "624", "420", "40", null, null, this);
            obj.set_taborder("87");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_7_result02", "absolute", "584", "663", "420", "40", null, null, this);
            obj.set_taborder("88");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static39", "absolute", "245", "1092", "340", "40", null, null, this);
            obj.set_taborder("89");
            obj.set_text("(boolean) ⇒ (true)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static40", "absolute", "245", "1131", "340", "40", null, null, this);
            obj.set_taborder("90");
            obj.set_text("(array) ⇒ ([1,2,3])");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("st_11_result05", "absolute", "584", "1092", "420", "40", null, null, this);
            obj.set_taborder("91");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_11_result06", "absolute", "584", "1131", "420", "40", null, null, this);
            obj.set_taborder("92");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static41", "absolute", "245", "897", "340", "40", null, null, this);
            obj.set_taborder("93");
            obj.set_text("(regexp) ⇒ (/[a-z]/g)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("st_10_result02", "absolute", "584", "897", "420", "40", null, null, this);
            obj.set_taborder("94");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button23", "absolute", "519", "944", "56", "22", null, null, this);
            obj.set_taborder("95");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button24", "absolute", "519", "983", "56", "22", null, null, this);
            obj.set_taborder("96");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button25", "absolute", "519", "1022", "56", "22", null, null, this);
            obj.set_taborder("97");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button26", "absolute", "519", "1061", "56", "22", null, null, this);
            obj.set_taborder("98");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button27", "absolute", "519", "1100", "56", "22", null, null, this);
            obj.set_taborder("99");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button28", "absolute", "519", "1139", "56", "22", null, null, this);
            obj.set_taborder("100");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button22", "absolute", "519", "906", "56", "22", null, null, this);
            obj.set_taborder("101");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static42", "absolute", "245", "1170", "340", "40", null, null, this);
            obj.set_taborder("102");
            obj.set_text("(object) ⇒ ({a:'1', b:'2'})");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("st_11_result07", "absolute", "584", "1170", "420", "40", null, null, this);
            obj.set_taborder("103");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button29", "absolute", "519", "1179", "56", "22", null, null, this);
            obj.set_taborder("104");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static43", "absolute", "245", "1599", "340", "40", null, null, this);
            obj.set_taborder("105");
            obj.set_text("(object) ⇒ (new Object())");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static44", "absolute", "245", "1638", "340", "40", null, null, this);
            obj.set_taborder("106");
            obj.set_text("(object) ⇒ (a)\r\nvar a = new Object(); a.test = \"abc\";");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static45", "absolute", "245", "1287", "340", "40", null, null, this);
            obj.set_taborder("107");
            obj.set_text("(string) ⇒ (\"\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static46", "absolute", "245", "1326", "340", "40", null, null, this);
            obj.set_taborder("108");
            obj.set_text("(string) ⇒ (\"abc\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static47", "absolute", "245", "1365", "340", "40", null, null, this);
            obj.set_taborder("109");
            obj.set_text("(array) ⇒ ([])");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static48", "absolute", "245", "1404", "340", "40", null, null, this);
            obj.set_taborder("110");
            obj.set_text("(array) ⇒ ([1,2,3])");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static49", "absolute", "245", "1521", "340", "40", null, null, this);
            obj.set_taborder("111");
            obj.set_text("(object) ⇒ ({})");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static50", "absolute", "245", "1443", "340", "40", null, null, this);
            obj.set_taborder("112");
            obj.set_text("(array) ⇒ (new Array())");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static51", "absolute", "245", "1560", "340", "40", null, null, this);
            obj.set_taborder("113");
            obj.set_text("(object) ⇒ ({a:'1', b:'2'})");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button32", "absolute", "519", "1296", "56", "22", null, null, this);
            obj.set_taborder("114");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button33", "absolute", "519", "1335", "56", "22", null, null, this);
            obj.set_taborder("115");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button34", "absolute", "519", "1374", "56", "22", null, null, this);
            obj.set_taborder("116");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button35", "absolute", "519", "1413", "56", "22", null, null, this);
            obj.set_taborder("117");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_12_result03", "absolute", "584", "1287", "420", "40", null, null, this);
            obj.set_taborder("118");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_12_result04", "absolute", "584", "1326", "420", "40", null, null, this);
            obj.set_taborder("119");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button36", "absolute", "519", "1452", "56", "22", null, null, this);
            obj.set_taborder("120");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_12_result05", "absolute", "584", "1365", "420", "40", null, null, this);
            obj.set_taborder("121");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_12_result06", "absolute", "584", "1404", "420", "40", null, null, this);
            obj.set_taborder("122");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_12_result09", "absolute", "584", "1521", "420", "40", null, null, this);
            obj.set_taborder("123");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_12_result10", "absolute", "584", "1560", "420", "40", null, null, this);
            obj.set_taborder("124");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_12_result11", "absolute", "584", "1599", "420", "40", null, null, this);
            obj.set_taborder("125");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_12_result12", "absolute", "584", "1638", "420", "40", null, null, this);
            obj.set_taborder("126");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_12_result07", "absolute", "584", "1443", "420", "40", null, null, this);
            obj.set_taborder("127");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static52", "absolute", "20", "1209", "226", "586", null, null, this);
            obj.set_taborder("128");
            obj.set_text("12. isEmpty");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static53", "absolute", "245", "1209", "340", "40", null, null, this);
            obj.set_taborder("129");
            obj.set_text("(undifined) ⇒ ()");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static54", "absolute", "245", "1248", "340", "40", null, null, this);
            obj.set_taborder("130");
            obj.set_text("(null) ⇒ (null)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button30", "absolute", "519", "1218", "56", "22", null, null, this);
            obj.set_taborder("131");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button31", "absolute", "519", "1257", "56", "22", null, null, this);
            obj.set_taborder("132");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_12_result01", "absolute", "584", "1209", "420", "40", null, null, this);
            obj.set_taborder("133");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_12_result02", "absolute", "584", "1248", "420", "40", null, null, this);
            obj.set_taborder("134");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static55", "absolute", "245", "1677", "340", "40", null, null, this);
            obj.set_taborder("135");
            obj.set_text("(boolean) ⇒ (true)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static56", "absolute", "245", "1716", "340", "40", null, null, this);
            obj.set_taborder("136");
            obj.set_text("(number) ⇒ (0)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("st_12_result13", "absolute", "584", "1677", "420", "40", null, null, this);
            obj.set_taborder("137");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_12_result14", "absolute", "584", "1716", "420", "40", null, null, this);
            obj.set_taborder("138");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static57", "absolute", "245", "1482", "340", "40", null, null, this);
            obj.set_taborder("139");
            obj.set_text("(array) ⇒ (new Array(3))");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("st_12_result08", "absolute", "584", "1482", "420", "40", null, null, this);
            obj.set_taborder("140");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button38", "absolute", "519", "1529", "56", "22", null, null, this);
            obj.set_taborder("141");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button39", "absolute", "519", "1568", "56", "22", null, null, this);
            obj.set_taborder("142");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button40", "absolute", "519", "1607", "56", "22", null, null, this);
            obj.set_taborder("143");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button41", "absolute", "519", "1646", "56", "22", null, null, this);
            obj.set_taborder("144");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button42", "absolute", "519", "1685", "56", "22", null, null, this);
            obj.set_taborder("145");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button43", "absolute", "519", "1724", "56", "22", null, null, this);
            obj.set_taborder("146");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button37", "absolute", "519", "1491", "56", "22", null, null, this);
            obj.set_taborder("147");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static58", "absolute", "245", "1755", "340", "40", null, null, this);
            obj.set_taborder("148");
            obj.set_text("(date) ⇒ (new Date())");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("st_12_result15", "absolute", "584", "1755", "420", "40", null, null, this);
            obj.set_taborder("149");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button44", "absolute", "519", "1764", "56", "22", null, null, this);
            obj.set_taborder("150");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static59", "absolute", "245", "2184", "340", "40", null, null, this);
            obj.set_taborder("151");
            obj.set_text("(instance) ⇒ ()");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static60", "absolute", "245", "2223", "340", "40", null, null, this);
            obj.set_taborder("152");
            obj.set_text("(expression, string, string) \r\n⇒ (2-1=1, \"True\", \"False\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static61", "absolute", "245", "1872", "340", "40", null, null, this);
            obj.set_taborder("153");
            obj.set_text("(object) ⇒ (Dataset)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static62", "absolute", "245", "1911", "340", "40", null, null, this);
            obj.set_taborder("154");
            obj.set_text("(string) ⇒ (\" \")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static63", "absolute", "245", "1950", "340", "40", null, null, this);
            obj.set_taborder("155");
            obj.set_text("(string) ⇒ (\"\\\\t\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static64", "absolute", "245", "1989", "340", "40", null, null, this);
            obj.set_taborder("156");
            obj.set_text("(string) ⇒ (\"abc\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static65", "absolute", "245", "2106", "340", "40", null, null, this);
            obj.set_taborder("157");
            obj.set_text("(date) ⇒ (new Date())");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static66", "absolute", "245", "2028", "340", "40", null, null, this);
            obj.set_taborder("158");
            obj.set_text("(object) ⇒ ({a:'aaa', b:123})");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static67", "absolute", "245", "2145", "340", "40", null, null, this);
            obj.set_taborder("159");
            obj.set_text("(XComp) ⇒ ()");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button47", "absolute", "519", "1881", "56", "22", null, null, this);
            obj.set_taborder("160");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button48", "absolute", "519", "1920", "56", "22", null, null, this);
            obj.set_taborder("161");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button49", "absolute", "519", "1959", "56", "22", null, null, this);
            obj.set_taborder("162");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button50", "absolute", "519", "1998", "56", "22", null, null, this);
            obj.set_taborder("163");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_13_result03", "absolute", "584", "1872", "420", "40", null, null, this);
            obj.set_taborder("164");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_14_result01", "absolute", "584", "1911", "420", "40", null, null, this);
            obj.set_taborder("165");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button51", "absolute", "519", "2037", "56", "22", null, null, this);
            obj.set_taborder("166");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_14_result02", "absolute", "584", "1950", "420", "40", null, null, this);
            obj.set_taborder("167");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_15_result01", "absolute", "584", "1989", "420", "40", null, null, this);
            obj.set_taborder("168");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_15_result04", "absolute", "584", "2106", "420", "40", null, null, this);
            obj.set_taborder("169");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_15_result05", "absolute", "584", "2145", "420", "40", null, null, this);
            obj.set_taborder("170");
            obj.set_text("reserved");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_15_result06", "absolute", "584", "2184", "420", "40", null, null, this);
            obj.set_taborder("171");
            obj.set_text("reserved");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_16_result01", "absolute", "584", "2223", "420", "40", null, null, this);
            obj.set_taborder("172");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_15_result02", "absolute", "584", "2028", "420", "40", null, null, this);
            obj.set_taborder("173");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static68", "absolute", "20", "1794", "226", "118", null, null, this);
            obj.set_taborder("174");
            obj.set_text("13. isXComponent");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static69", "absolute", "245", "1794", "340", "40", null, null, this);
            obj.set_taborder("175");
            obj.set_text("(xpComp) ⇒ (Button)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static70", "absolute", "245", "1833", "340", "40", null, null, this);
            obj.set_taborder("176");
            obj.set_text("(object) ⇒ (new String)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button45", "absolute", "519", "1803", "56", "22", null, null, this);
            obj.set_taborder("177");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button46", "absolute", "519", "1842", "56", "22", null, null, this);
            obj.set_taborder("178");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_13_result01", "absolute", "584", "1794", "420", "40", null, null, this);
            obj.set_taborder("179");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_13_result02", "absolute", "584", "1833", "420", "40", null, null, this);
            obj.set_taborder("180");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static71", "absolute", "245", "2262", "340", "40", null, null, this);
            obj.set_taborder("181");
            obj.set_text("(expression, number, variable) \r\n⇒ (a > 100, 100, a)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static72", "absolute", "245", "2301", "340", "40", null, null, this);
            obj.set_taborder("182");
            obj.set_text("(string, string, string, ...) \r\n⇒ (\"1\", \"1\", \"One\", \"2\", \"Two\", \"Default\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("st_16_result02", "absolute", "584", "2262", "420", "40", null, null, this);
            obj.set_taborder("183");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_17_result01", "absolute", "584", "2301", "420", "40", null, null, this);
            obj.set_taborder("184");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static73", "absolute", "245", "2067", "340", "40", null, null, this);
            obj.set_taborder("185");
            obj.set_text("(array) ⇒ ([1,2,3])");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("st_15_result03", "absolute", "584", "2067", "420", "40", null, null, this);
            obj.set_taborder("186");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button53", "absolute", "519", "2114", "56", "22", null, null, this);
            obj.set_taborder("187");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button54", "absolute", "519", "2153", "56", "22", null, null, this);
            obj.set_taborder("188");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button55", "absolute", "519", "2192", "56", "22", null, null, this);
            obj.set_taborder("189");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button56", "absolute", "519", "2231", "56", "22", null, null, this);
            obj.set_taborder("190");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button57", "absolute", "519", "2270", "56", "22", null, null, this);
            obj.set_taborder("191");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button58", "absolute", "519", "2309", "56", "22", null, null, this);
            obj.set_taborder("192");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button52", "absolute", "519", "2076", "56", "22", null, null, this);
            obj.set_taborder("193");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static74", "absolute", "245", "2340", "340", "40", null, null, this);
            obj.set_taborder("194");
            obj.set_text("(number, number, string, ...) \r\n⇒ (100, 1, \"일\", 10, \"십\", 100, \"백\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("st_17_result02", "absolute", "584", "2340", "420", "40", null, null, this);
            obj.set_taborder("195");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button59", "absolute", "519", "2349", "56", "22", null, null, this);
            obj.set_taborder("196");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static75", "absolute", "20", "1911", "226", "79", null, null, this);
            obj.set_taborder("197");
            obj.set_text("14. isSpace");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static76", "absolute", "20", "1989", "226", "235", null, null, this);
            obj.set_taborder("198");
            obj.set_text("15. clone");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static77", "absolute", "20", "2223", "226", "79", null, null, this);
            obj.set_taborder("199");
            obj.set_text("16. iif");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static78", "absolute", "20", "2301", "226", "79", null, null, this);
            obj.set_taborder("200");
            obj.set_text("17. decode");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static79", "absolute", "245", "2457", "340", "40", null, null, this);
            obj.set_taborder("201");
            obj.set_text("(Form, string) ⇒ (this, \"Button\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static80", "absolute", "245", "2496", "340", "40", null, null, this);
            obj.set_taborder("202");
            obj.set_text("(Form, string) ⇒ (this, \"chk_\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button62", "absolute", "519", "2466", "56", "22", null, null, this);
            obj.set_taborder("203");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button63", "absolute", "519", "2505", "56", "22", null, null, this);
            obj.set_taborder("204");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_19_result01", "absolute", "584", "2457", "420", "40", null, null, this);
            obj.set_taborder("205");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_19_result02", "absolute", "584", "2496", "420", "40", null, null, this);
            obj.set_taborder("206");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static81", "absolute", "20", "2379", "226", "79", null, null, this);
            obj.set_taborder("207");
            obj.set_text("18. getUniqueId");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static82", "absolute", "245", "2379", "340", "40", null, null, this);
            obj.set_taborder("208");
            obj.set_text("(string) ⇒ ()");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static83", "absolute", "245", "2418", "340", "40", null, null, this);
            obj.set_taborder("209");
            obj.set_text("(string) ⇒ (\"Button_\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button60", "absolute", "519", "2388", "56", "22", null, null, this);
            obj.set_taborder("210");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button61", "absolute", "519", "2427", "56", "22", null, null, this);
            obj.set_taborder("211");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_18_result01", "absolute", "584", "2379", "420", "40", null, null, this);
            obj.set_taborder("212");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_18_result02", "absolute", "584", "2418", "420", "40", null, null, this);
            obj.set_taborder("213");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static84", "absolute", "20", "2457", "226", "79", null, null, this);
            obj.set_taborder("214");
            obj.set_text("19. getSequenceId");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static85", "absolute", "20", "2535", "226", "79", null, null, this);
            obj.set_taborder("215");
            obj.set_text("20. isStringDate");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static86", "absolute", "245", "2535", "340", "40", null, null, this);
            obj.set_taborder("216");
            obj.set_text("(string) ⇒ (\"20130729\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static87", "absolute", "245", "2574", "340", "40", null, null, this);
            obj.set_taborder("217");
            obj.set_text("(date) ⇒ (new Date())");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button64", "absolute", "519", "2544", "56", "22", null, null, this);
            obj.set_taborder("218");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button65", "absolute", "519", "2583", "56", "22", null, null, this);
            obj.set_taborder("219");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_20_result01", "absolute", "584", "2535", "420", "40", null, null, this);
            obj.set_taborder("220");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_20_result02", "absolute", "584", "2574", "420", "40", null, null, this);
            obj.set_taborder("221");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 1024, 2631, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("Eco");
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("Eco.xfdl", function() {
        /*
         * Eco api Sample at nexacro
         * 
         * Copyright (c) 2014 EcoSystem of TOBESOFT
         * Licensed Free under nexacro.
        */

        // 1.1 isString api 사용 예제
        this.Button00_onclick = function(obj,e)
        {
        	var check = Eco.isString("test string!!!");
        	this.st_1_result01.set_text("(boolean) " + check);
        	trace(check);
        }

        // 1.2 isString api 사용 예제
        this.Button01_onclick = function(obj,e)
        {
        	var check = Eco.isString(1234);
        	this.st_1_result02.set_text("(boolean) " + check);
        	trace(check);
        }

        // 2.1 isNumber api 사용 예제
        this.Button02_onclick = function(obj,e)
        {
        	var check = Eco.isNumber(1234);
        	this.st_2_result01.set_text("(boolean) " + check);
        	trace(check);
        }

        // 2.2 isNumber api 사용 예제
        this.Button03_onclick = function(obj,e)
        {
        	var check = Eco.isNumber("1234");
        	this.st_2_result02.set_text( "(boolean) " + check );
        	trace(check);
        }

        // 3.1 isBoolean api 사용 예제
        this.Button04_onclick = function(obj,e)
        {
        	var check = Eco.isBoolean(true);
        	this.st_3_result01.set_text( "(boolean) " + check );
        	trace(check);
        }

        // 3.2 isBoolean api 사용 예제
        this.Button05_onclick = function(obj,e)
        {
        	var check = Eco.isBoolean("true");
        	this.st_3_result02.set_text( "(boolean) " + check);
        	trace(check);
        }

        // 4.1 isNull api 사용 예제
        this.Button06_onclick = function(obj,e)
        {
        	var check = Eco.isNull(null);
        	this.st_4_result01.set_text( "(boolean) " + check );
        	trace(check);
        }

        // 4.2 isNull api 사용 예제
        this.Button07_onclick = function(obj,e)
        {
        	var check = Eco.isNull("");
        	this.st_4_result02.set_text( "(boolean) " + check);
        	trace(check);
        }

        // 5.1 isUndefined api 사용 예제
        this.Button08_onclick = function(obj,e)
        {
        	var a;	// undefined
        	var check = Eco.isUndefined(a);
        	this.st_5_result01.set_text( "(boolean) " + check);
        	trace(check);
        }

        // 5.2 isUndefined api 사용 예제
        this.Button09_onclick = function(obj,e)
        {
        	var a = "";	// string
        	var check = Eco.isUndefined(a);
        	this.st_5_result02.set_text( "(boolean) " + check);
        	trace(check);
        }

        // 6.1 isObject api 사용 예제
        this.Button10_onclick = function(obj,e)
        {
        	var o = new Object();
        	var check = Eco.isObject(o);
        	this.st_6_result01.set_text( "(boolean) " + check);
        	trace(o + " : " + check);
        }

        // 6.2 isObject api 사용 예제
        this.Button11_onclick = function(obj,e)
        {
        	var o = {};	
        	var check = Eco.isObject(o);
        	this.st_6_result02.set_text("(boolean) " + check);
        	trace(o + " : " + check);
        }

        // 6.3 isObject api 사용 예제
        this.Button12_onclick = function(obj,e)
        {
        	var o = [1,2,3];	
        	var check = Eco.isObject(o);
        	this.st_6_result03.set_text( "(boolean) " + check );
        	trace(o + " : " + check);
        }

        // 6.4 isObject api 사용 예제
        this.Button13_onclick = function(obj,e)
        {
        	var o = new Button();
        	var check = Eco.isObject(o);
        	this.st_6_result04.set_text( "(boolean) " + check);
        	trace(o + " : " + check);
        }

        // 6.5 isObject api 사용 예제
        this.Button14_onclick = function(obj,e)
        {
        	var o = new Dataset();
        	var check = Eco.isObject(o);
        	this.st_6_result05.set_text( "(boolean) " + check);
        	trace(o + " : " +check);
        }

        // 7.1 isArray api 사용 예제
        this.Button15_onclick = function(obj,e)
        {
        	var a = new Array();
        	var check = Eco.isArray(a);
        	this.st_7_result01.set_text( "(boolean) " + check );
        	trace(check);
        }

        // 1.2 isArray api 사용 예제
        this.Button16_onclick = function(obj,e)
        {
        	var a = [1,2,3];
        	var check = Eco.isArray(a);
        	this.st_7_result02.set_text( "(boolean) " + check );
        	trace(check);
        }

        // 8.1 isDate api 사용 예제
        this.Button17_onclick = function(obj,e)
        {
        	var a = new Date();
        	var check = Eco.isDate(a);
        	this.st_8_result01.set_text( "(boolean) " + check );
        	trace(check);
        }

        // 8.2 isDate api 사용 예제
        this.Button18_onclick = function(obj,e)
        {
        	var a = "20140501";
        	var check = Eco.isDate(a);
        	this.st_8_result02.set_text( "(boolean) " + check );
        	trace(check);
        }

        // 9.1 isFunction api 사용 예제
        this.Button19_onclick = function(obj,e)
        {
        	var check = Eco.isFunction(Eco.isFunction);
        	this.st_9_result01.set_text( "(boolean) " + check );
        	trace(check);
        }

        this.testFunction = function()
        {
        }

        // 9.2 isFunction api 사용 예제
        this.Button20_onclick = function(obj,e)
        {
        	var check =Eco.isFunction(this.testFunction);
        	this.st_9_result02.set_text( "(boolean) " + check );
        	trace(check);
        }

        // 10.1 isRegExp api 사용 예제
        this.Button21_onclick = function(obj,e)
        {
        	var a = new RegExp();
        	var check = Eco.isRegExp(a);
        	this.st_10_result01.set_text( "(boolean) " + check );
        	trace(check);	
        }

        // 10.1 isRegExp api 사용 예제
        this.Button22_onclick = function(obj,e)
        {
        	var a = /[a-z]/g;
        	var check = Eco.isRegExp(a);
        	this.st_10_result02.set_text( "(boolean) " + check );
        	trace(check);	
        }

        // 11.1 isPrimitive api 사용 예제
        this.Button23_onclick = function(obj,e)
        {
        	var a;	// undefined
        	var check = Eco.isPrimitive(a);
        	this.st_11_result01.set_text( "(boolean) " + check );
        	trace(a + " : " + check);
        }

        // 11.2 isPrimitive api 사용 예제
        this.Button24_onclick = function(obj,e)
        {
        	var a = null;	// null
        	var check = Eco.isPrimitive(a);
        	this.st_11_result02.set_text( "(boolean) " + check );
        	trace(a + " : " + check);
        }

        // 11.3 isPrimitive api 사용 예제
        this.Button25_onclick = function(obj,e)
        {
        	var a = "abc";	// string
        	var check = Eco.isPrimitive(a);
        	this.st_11_result03.set_text( "(boolean) " + check );
        	trace(a + " : " + check);
        }

        // 11.4 isPrimitive api 사용 예제
        this.Button26_onclick = function(obj,e)
        {
        	var a = 123;	// number
        	var check = Eco.isPrimitive(a);
        	this.st_11_result04.set_text( "(boolean) " + check );
        	trace(a + " : " + check);
        }

        // 11.5 isPrimitive api 사용 예제
        this.Button27_onclick = function(obj,e)
        {
        	var a = true;	// boolean
        	var check = Eco.isPrimitive(a);
        	this.st_11_result05.set_text( "(boolean) " + check );
        	trace(a + " : " + check);
        }

        // 11.6 isPrimitive api 사용 예제
        this.Button28_onclick = function(obj,e)
        {
        	var a = [1,2,3];	// array
        	var check = Eco.isPrimitive(a);
        	this.st_11_result06.set_text( "(boolean) " + check );
        	trace(a + " : " + check);
        }

        // 11.7 isPrimitive api 사용 예제
        this.Button29_onclick = function(obj,e)
        {
        	var a = {a:'1', b:'2'};	// object
        	var check = Eco.isPrimitive(a);
        	this.st_11_result07.set_text( "(boolean) " + check );
        	trace(a + " : " + check);	
        }

        // 12.1 isEmpty api 사용 예제
        this.Button30_onclick = function(obj,e)
        {
        	var a;	// undefined
        	var check = Eco.isEmpty(a);
        	this.st_12_result01.set_text( "(boolean) " + check );
        	trace(a + " : " + check);
        }

        // 12.2 isEmpty api 사용 예제
        this.Button31_onclick = function(obj,e)
        {
        	var a = null;	// null
        	var check = Eco.isEmpty(a);
        	this.st_12_result02.set_text( "(boolean) " + check );
        	trace(a + " : " + check);
        }

        // 12.3 isEmpty api 사용 예제
        this.Button32_onclick = function(obj,e)
        {
        	var a = "";	// string
        	var check = Eco.isEmpty(a);
        	this.st_12_result03.set_text( "(boolean) " + check );
        	trace(a + " : " + check);
        }

        // 12.4 isEmpty api 사용 예제
        this.Button33_onclick = function(obj,e)
        {
        	var a = "abc";	// string
        	var check = Eco.isEmpty(a);
        	this.st_12_result04.set_text( "(boolean) " + check );
        	trace(a + " : " + check);
        }

        // 12.5 isEmpty api 사용 예제
        this.Button34_onclick = function(obj,e)
        {
        	var a = [];	// array
        	var check = Eco.isEmpty(a);
        	this.st_12_result05.set_text( "(boolean) " + check );
        	trace(a + " : " + check);
        }

        // 12.6 isEmpty api 사용 예제
        this.Button35_onclick = function(obj,e)
        {
        	var a = [1,2,3];	// array
        	var check = Eco.isEmpty(a);
        	this.st_12_result06.set_text( "(boolean) " + check );
        	trace(a + " : " + check);
        }

        // 12.7 isEmpty api 사용 예제
        this.Button36_onclick = function(obj,e)
        {
        	var a = new Array();	// array
        	var check = Eco.isEmpty(a);
        	this.st_12_result07.set_text( "(boolean) " + check );
        	trace(a + " : " + check);
        }

        // 12.8 isEmpty api 사용 예제
        this.Button37_onclick = function(obj,e)
        {
        	var a = new Array(3);	// array
        	var check = Eco.isEmpty(a);
        	this.st_12_result08.set_text( "(boolean) " + check );
        	trace(a + " : " + check);
        }

        // 12.9 isEmpty api 사용 예제
        this.Button38_onclick = function(obj,e)
        {
        	var a = {};	// object
        	var check = Eco.isEmpty(a);
        	this.st_12_result09.set_text( "(boolean) " + check );
        	trace(a + " : " + check);
        }

        // 12.10 isEmpty api 사용 예제
        this.Button39_onclick = function(obj,e)
        {
        	var a = {a:'1', b:'2'};	// object
        	var check = Eco.isEmpty(a);
        	this.st_12_result10.set_text( "(boolean) " + check );
        	trace(a + " : " + check);
        }

        // 12.11 isEmpty api 사용 예제
        this.Button40_onclick = function(obj,e)
        {
        	var a = new Object();	// object
        	var check = Eco.isEmpty(a);
        	this.st_12_result11.set_text( "(boolean) " + check );
        	trace(a + " : " + check);
        }

        // 12.12 isEmpty api 사용 예제
        this.Button41_onclick = function(obj,e)
        {
        	var a = new Object();	// object
        	a.test = "abc";
        	
        	var check = Eco.isEmpty(a);
        	this.st_12_result12.set_text( "(boolean) " + check );
        	trace(a + " : " + check);
        }

        // 12.13 isEmpty api 사용 예제
        this.Button42_onclick = function(obj,e)
        {
        	var a = true;	// boolean
        	var check = Eco.isEmpty(a);
        	this.st_12_result13.set_text( "(boolean) " + check );
        	trace(a + " : " + check);
        }

        // 12.14 isEmpty api 사용 예제
        this.Button43_onclick = function(obj,e)
        {
        	var a = 0;	// number
        	var check = Eco.isEmpty(a);
        	this.st_12_result14.set_text( "(boolean) " + check );
        	trace(a + " : " + check);
        }

        // 12.15 isEmpty api 사용 예제
        this.Button44_onclick = function(obj,e)
        {
        	var a = new Date();	// date
        	var check = Eco.isEmpty(a);
        	this.st_12_result15.set_text( "(boolean) " + check );
        	trace(a + " : " + check);
        }

        // 13.1 isXComponent api 사용 예제
        this.Button45_onclick = function(obj,e)
        {
        	var a = new Button();
        	var check = Eco.isXComponent(a);
        	this.st_13_result01.set_text( "(boolean) " + check );
        	trace(a + " : " + check);
        	
        	a.destroy();
        }

        // 13.2 isXComponent api 사용 예제
        this.Button46_onclick = function(obj,e)
        {
        	var a = new String();
        	var check = Eco.isXComponent(a);
        	this.st_13_result02.set_text( "(boolean) " + check );
        	trace(a + " : " + check);
        	
        	a = null;
        }

        // 13.3 isXComponent api 사용 예제
        this.Button47_onclick = function(obj,e)
        {
        	var a = new Dataset();
        	var check = Eco.isXComponent(a);
        	this.st_13_result03.set_text( "(boolean) " + check );
        	trace(a + " : " + check);
        	
        	a = null;
        }

        // 14.1 isSpace api 사용 예제
        this.Button48_onclick = function(obj,e)
        {
        	var a = " ";
        	var check = Eco.isSpace(a);
        	this.st_14_result01.set_text( "(boolean) " + check );
        	trace(a + " : " + check);
        }

        // 14.2 isSpace api 사용 예제
        this.Button49_onclick = function(obj,e)
        {
        	var a = "\t";
        	var check = Eco.isSpace(a);
        	this.st_14_result02.set_text( "(boolean) " + check );
        	trace(a + " : " + check);
        }

        // 15.1 clone api 사용 예제
        this.Button50_onclick = function(obj,e)
        {
        	var a = "abc";
        	var b = Eco.clone(a);
        	
        	trace(a + " : " + b);
        	
        	a = "";
        	
        	this.st_15_result01.set_text( "(string) " + b );
        	
        	trace(a + " : " + b);
        }

        // 15.2 clone api 사용 예제
        this.Button51_onclick = function(obj,e)
        {
        	var a = {a:"aaa", b:123};
        	var b = Eco.clone(a);
        	
        	trace(a.a + " : " + a.b);
        	trace(b.a + " : " + b.b);
        	
        	a.a = "bbb";
        	a.b = 456;
        	
        	this.st_15_result02.set_text( "(object) " + b );
        	
        	trace(a.a + " : " + a.b);
        	trace(b.a + " : " + b.b);
        }

        // 15.3 clone api 사용 예제
        this.Button52_onclick = function(obj,e)
        {
        	var a = [1,2,3];
        	var b = Eco.clone(a);
        	
        	trace(a);
        	trace(b);
        	
        	a.push(4);
        	
        	this.st_15_result03.set_text( "(array) " + b );
        	
        	trace(a);
        	trace(b);
        }

        // 15.4 clone api 사용 예제
        this.Button53_onclick = function(obj,e)
        {
        	var a = new Date();
        	var b = Eco.clone(a);
        	
        	trace(a);
        	trace(b);
        	
        	a.setYear(a.getYear() + 10);
        	
        	this.st_15_result04.set_text( "(date) " + b );
        	
        	trace(a);
        	trace(b);
        }

        // 15.5 clone api 사용 예제
        this.Button54_onclick = function(obj,e)
        {
        	// reserved
        }

        // 15.6 clone api 사용 예제
        this.Button55_onclick = function(obj,e)
        {
        	// reserved
        }

        // 16.1 iif api 사용 예제
        this.Button56_onclick = function(obj,e)
        {
        	var a = Eco.iif(2-1==1, "True", "False");
        	
        	this.st_16_result01.set_text( "(string) " + a );
        	
        	trace(a);
        }

        // 16.2 iif api 사용 예제
        this.Button57_onclick = function(obj,e)
        {
        	var a = 98;
        	var b = Eco.iif(a > 100, 100, a);
        	
        	this.st_16_result02.set_text( "(number) " + b );
        	
        	trace(b);
        }

        // 17.1 decode api 사용 예제
        this.Button58_onclick = function(obj,e)
        {
        	var a = Eco.decode("1", "1", "One", "2", "Two", "Default");
        	
        	this.st_17_result01.set_text( "(string) " + a );
        	
        	trace(a);
        }

        // 17.2 decode api 사용 예제
        this.Button59_onclick = function(obj,e)
        {
        	var a = Eco.decode(100, 1, "일", 10, "십", 100, "백");
        	
        	this.st_17_result02.set_text( "(string) " + a );
        	
        	trace(a);
        }

        // 18.1 getUniqueId api 사용 예제
        this.Button60_onclick = function(obj,e)
        {
        	var id = Eco.getUniqueId();
        	this.st_18_result01.set_text( "(string) " + id );
        	trace(id);
        }

        // 18.2 getUniqueId api 사용 예제
        this.Button61_onclick = function(obj,e)
        {
        	var id = Eco.getUniqueId("Button_");
        	this.st_18_result02.set_text( "(string) " + id );
        	trace(id);
        }

        // 19.1 getSequenceId api 사용 예제
        this.Button62_onclick = function(obj,e)
        {
        	var id = Eco.getSequenceId(this, "Button");
        	this.st_19_result01.set_text( "(string) " + id );
        	trace(id);
        }

        // 19.2 getSequenceId api 사용 예제
        this.Button63_onclick = function(obj,e)
        {
        	var id = Eco.getSequenceId(this, "chk_");
        	this.st_19_result02.set_text( "(string) " + id );
        	trace(id);
        }

        // 20.1 isStringDate api 사용 예제
        this.Button64_onclick = function(obj,e)
        {
        	var a = "20140729";
        	var check = Eco.isStringDate(a);
        	this.st_20_result01.set_text( "(boolean) " + check );
        	trace(check);
        }

        // 20.2 isStringDate api 사용 예제
        this.Button65_onclick = function(obj,e)
        {
        	var a = new Date();
        	var check = Eco.isStringDate(a);
        	this.st_20_result02.set_text( "(boolean) " + check );
        	trace(check);
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
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
            this.Button14.addEventHandler("onclick", this.Button14_onclick, this);
            this.Button17.addEventHandler("onclick", this.Button17_onclick, this);
            this.Button18.addEventHandler("onclick", this.Button18_onclick, this);
            this.Button19.addEventHandler("onclick", this.Button19_onclick, this);
            this.Button20.addEventHandler("onclick", this.Button20_onclick, this);
            this.Button21.addEventHandler("onclick", this.Button21_onclick, this);
            this.Button15.addEventHandler("onclick", this.Button15_onclick, this);
            this.Button16.addEventHandler("onclick", this.Button16_onclick, this);
            this.Button23.addEventHandler("onclick", this.Button23_onclick, this);
            this.Button24.addEventHandler("onclick", this.Button24_onclick, this);
            this.Button25.addEventHandler("onclick", this.Button25_onclick, this);
            this.Button26.addEventHandler("onclick", this.Button26_onclick, this);
            this.Button27.addEventHandler("onclick", this.Button27_onclick, this);
            this.Button28.addEventHandler("onclick", this.Button28_onclick, this);
            this.Button22.addEventHandler("onclick", this.Button22_onclick, this);
            this.Button29.addEventHandler("onclick", this.Button29_onclick, this);
            this.Button32.addEventHandler("onclick", this.Button32_onclick, this);
            this.Button33.addEventHandler("onclick", this.Button33_onclick, this);
            this.Button34.addEventHandler("onclick", this.Button34_onclick, this);
            this.Button35.addEventHandler("onclick", this.Button35_onclick, this);
            this.Button36.addEventHandler("onclick", this.Button36_onclick, this);
            this.Button30.addEventHandler("onclick", this.Button30_onclick, this);
            this.Button31.addEventHandler("onclick", this.Button31_onclick, this);
            this.Button38.addEventHandler("onclick", this.Button38_onclick, this);
            this.Button39.addEventHandler("onclick", this.Button39_onclick, this);
            this.Button40.addEventHandler("onclick", this.Button40_onclick, this);
            this.Button41.addEventHandler("onclick", this.Button41_onclick, this);
            this.Button42.addEventHandler("onclick", this.Button42_onclick, this);
            this.Button43.addEventHandler("onclick", this.Button43_onclick, this);
            this.Button37.addEventHandler("onclick", this.Button37_onclick, this);
            this.Button44.addEventHandler("onclick", this.Button44_onclick, this);
            this.Button47.addEventHandler("onclick", this.Button47_onclick, this);
            this.Button48.addEventHandler("onclick", this.Button48_onclick, this);
            this.Button49.addEventHandler("onclick", this.Button49_onclick, this);
            this.Button50.addEventHandler("onclick", this.Button50_onclick, this);
            this.Button51.addEventHandler("onclick", this.Button51_onclick, this);
            this.Button45.addEventHandler("onclick", this.Button45_onclick, this);
            this.Button46.addEventHandler("onclick", this.Button46_onclick, this);
            this.Button53.addEventHandler("onclick", this.Button53_onclick, this);
            this.Button54.addEventHandler("onclick", this.Button54_onclick, this);
            this.Button55.addEventHandler("onclick", this.Button55_onclick, this);
            this.Button56.addEventHandler("onclick", this.Button56_onclick, this);
            this.Button57.addEventHandler("onclick", this.Button57_onclick, this);
            this.Button58.addEventHandler("onclick", this.Button58_onclick, this);
            this.Button52.addEventHandler("onclick", this.Button52_onclick, this);
            this.Button59.addEventHandler("onclick", this.Button59_onclick, this);
            this.Button62.addEventHandler("onclick", this.Button62_onclick, this);
            this.Button63.addEventHandler("onclick", this.Button63_onclick, this);
            this.Button60.addEventHandler("onclick", this.Button60_onclick, this);
            this.Button61.addEventHandler("onclick", this.Button61_onclick, this);
            this.Button64.addEventHandler("onclick", this.Button64_onclick, this);
            this.Button65.addEventHandler("onclick", this.Button65_onclick, this);

        };

        this.loadIncludeScript("Eco.xfdl");

       
    };
}
)();
