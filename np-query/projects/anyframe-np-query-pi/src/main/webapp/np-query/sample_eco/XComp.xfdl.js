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
                this.set_name("XComp");
                this.set_classname("XComp");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,1024,1826);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_test", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Static("st_1_result01", "absolute", "787", "39", "217", "586", null, null, this);
            obj.set_taborder("0");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static17", "absolute", "20", "39", "82", "586", null, null, this);
            obj.set_taborder("1");
            obj.set_text("1. query");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static21", "absolute", "101", "351", "380", "40", null, null, this);
            obj.set_taborder("2");
            obj.set_text("(XComp, string) ⇒  (Div00, where )\r\nwhere : \"curStyle[align] == 'center middle'\"");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static22", "absolute", "101", "390", "380", "40", null, null, this);
            obj.set_taborder("3");
            obj.set_text("(XComp, string) ⇒  (Div00, where )\r\nwhere : \"style[align] == 'left top'\"");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static23", "absolute", "101", "429", "380", "40", null, null, this);
            obj.set_taborder("4");
            obj.set_text("(XComp, string) ⇒  (Div00, where )\r\nwhere : \"isVisible == true\"");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static24", "absolute", "101", "468", "380", "40", null, null, this);
            obj.set_taborder("5");
            obj.set_text("(XComp, string) ⇒  (Div00, where )\r\nwhere : \"isEnable == true\"");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static25", "absolute", "101", "507", "380", "40", null, null, this);
            obj.set_taborder("6");
            obj.set_text("(XComp, string) ⇒  (Div00, where )\r\nwhere : \"prop[name] *= 'ab'\"");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static26", "absolute", "101", "546", "380", "40", null, null, this);
            obj.set_taborder("7");
            obj.set_text("(XComp, string) ⇒  (Div00, where )\r\nwhere : \"prop[name] ^= 'Bu'\"");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static27", "absolute", "101", "585", "380", "40", null, null, this);
            obj.set_taborder("8");
            obj.set_text("(XComp, string) ⇒  (Div00, where )\r\nwhere : \"prop[name] $= '01'\"");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static10", "absolute", "101", "39", "380", "40", null, null, this);
            obj.set_taborder("9");
            obj.set_text("(XComp, string) ⇒  (this, \"\" )");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static99", "absolute", "101", "78", "380", "40", null, null, this);
            obj.set_taborder("10");
            obj.set_text("(XComp, string) ⇒  (Div00, \"\" )");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static12", "absolute", "101", "117", "380", "40", null, null, this);
            obj.set_taborder("11");
            obj.set_text("(XComp, string, number) ⇒  (Div00, \"\", 0 )");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static13", "absolute", "101", "156", "380", "40", null, null, this);
            obj.set_taborder("12");
            obj.set_text("(XComp, string, number) ⇒  (Div00, \"\", 2 )");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static14", "absolute", "101", "273", "380", "40", null, null, this);
            obj.set_taborder("13");
            obj.set_text("(XComp, string) ⇒  (Div00, where )\r\nwhere : \"prop[visible] == true\"");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static15", "absolute", "101", "234", "380", "40", null, null, this);
            obj.set_taborder("14");
            obj.set_text("(XComp, string) ⇒  (Div00, where )\r\nwhere : \"typeOf == 'Button' || typeOf == 'Div'\"");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static18", "absolute", "101", "195", "380", "40", null, null, this);
            obj.set_taborder("15");
            obj.set_text("(XComp, string) ⇒  (Div00, where )\r\nwhere : \"typeOf == 'Button'\"");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static29", "absolute", "101", "312", "380", "40", null, null, this);
            obj.set_taborder("16");
            obj.set_text("(XComp, string) ⇒  (Div00, where )\r\nwhere : \"prop[text] == 'Button02'\"");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static30", "absolute", "101", "0", "380", "40", null, null, this);
            obj.set_taborder("17");
            obj.set_text("Arguments:  ( Type ) ⇒ ( Value )");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static31", "absolute", "20", "0", "82", "40", null, null, this);
            obj.set_taborder("18");
            obj.set_text("Method");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static32", "absolute", "480", "0", "308", "40", null, null, this);
            obj.set_taborder("19");
            obj.set_text("Result: (Type) Vaule");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Button("Button10", "absolute", "415", "438", "56", "22", null, null, this);
            obj.set_taborder("21");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button11", "absolute", "415", "477", "56", "22", null, null, this);
            obj.set_taborder("22");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button12", "absolute", "415", "516", "56", "22", null, null, this);
            obj.set_taborder("23");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button13", "absolute", "415", "555", "56", "22", null, null, this);
            obj.set_taborder("24");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button14", "absolute", "415", "594", "56", "22", null, null, this);
            obj.set_taborder("25");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button00", "absolute", "415", "48", "56", "22", null, null, this);
            obj.set_taborder("26");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button01", "absolute", "415", "87", "56", "22", null, null, this);
            obj.set_taborder("27");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button02", "absolute", "415", "126", "56", "22", null, null, this);
            obj.set_taborder("28");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button03", "absolute", "415", "165", "56", "22", null, null, this);
            obj.set_taborder("29");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button04", "absolute", "415", "204", "56", "22", null, null, this);
            obj.set_taborder("30");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button05", "absolute", "415", "243", "56", "22", null, null, this);
            obj.set_taborder("31");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button06", "absolute", "415", "282", "56", "22", null, null, this);
            obj.set_taborder("32");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button07", "absolute", "415", "321", "56", "22", null, null, this);
            obj.set_taborder("33");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button08", "absolute", "415", "360", "56", "22", null, null, this);
            obj.set_taborder("34");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button09", "absolute", "415", "399", "56", "22", null, null, this);
            obj.set_taborder("35");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Div("Div00", "absolute", "794", "57", "198", "559", null, null, this);
            obj.set_taborder("36");
            obj.style.set_border("2px dotted blue");
            obj.set_text("Div00");
            this.addChild(obj.name, obj);
            obj = new Button("Button00", "absolute", "8", "45", "120", "50", null, null, this.Div00);
            obj.set_taborder("2");
            obj.set_text("Button00");
            this.Div00.addChild(obj.name, obj);
            obj = new Div("Div01", "absolute", "9", "124", "179", "392", null, null, this.Div00);
            obj.set_taborder("3");
            obj.style.set_border("2px dotted red");
            obj.set_text("Div00");
            this.Div00.addChild(obj.name, obj);
            obj = new Button("Button01", "absolute", "6", "41", "120", "50", null, null, this.Div00.Div01);
            obj.set_taborder("2");
            obj.set_text("Button01");
            obj.style.set_align("left top");
            this.Div00.Div01.addChild(obj.name, obj);
            obj = new Tab("Tab00", "absolute", "6", "146", "163", "210", null, null, this.Div00.Div01);
            obj.set_taborder("3");
            obj.set_tabindex("0");
            obj.set_scrollbars("autoboth");
            this.Div00.Div01.addChild(obj.name, obj);
            obj = new Tabpage("tabpage1", this.Div00.Div01.Tab00);
            obj.set_text("tabpage1");
            this.Div00.Div01.Tab00.addChild(obj.name, obj);
            obj = new Button("Button02", "absolute", "10", "48", "120", "50", null, null, this.Div00.Div01.Tab00.tabpage1);
            obj.set_taborder("0");
            obj.set_text("Button02");
            this.Div00.Div01.Tab00.tabpage1.addChild(obj.name, obj);
            obj = new Tabpage("tabpage2", this.Div00.Div01.Tab00);
            obj.set_text("tabpage2");
            this.Div00.Div01.Tab00.addChild(obj.name, obj);
            obj = new Button("Button03", "absolute", "24", "31", "120", "50", null, null, this.Div00.Div01.Tab00.tabpage2);
            obj.set_taborder("0");
            obj.set_text("Button03");
            this.Div00.Div01.Tab00.tabpage2.addChild(obj.name, obj);

            obj = new Static("Static00", "absolute", "787", "0", "217", "40", null, null, this);
            obj.set_taborder("37");
            obj.set_text("Sample Structure");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static01", "absolute", "806", "73", "120", "20", null, null, this);
            obj.set_taborder("38");
            obj.set_text("Div00 (depth:0)");
            obj.style.set_font("arial,9,italic");
            this.addChild(obj.name, obj);

            obj = new Static("Static02", "absolute", "814", "193", "120", "20", null, null, this);
            obj.set_taborder("39");
            obj.set_text("Div01 (depth:1)");
            obj.style.set_font("arial,9,italic");
            this.addChild(obj.name, obj);

            obj = new Static("Static03", "absolute", "830", "305", "120", "20", null, null, this);
            obj.set_taborder("40");
            obj.set_text("Tab00 (depth:2)");
            obj.style.set_font("arial,9,italic");
            this.addChild(obj.name, obj);

            obj = new Static("Static04", "absolute", "838", "361", "120", "20", null, null, this);
            obj.set_taborder("41");
            obj.set_text("tabpage1 (depth:3)");
            obj.style.set_font("arial,9,italic");
            this.addChild(obj.name, obj);

            obj = new TextArea("txt_result1", "absolute", "480", "39", "308", "586", null, null, this);
            obj.set_taborder("42");
            obj.style.set_linespace("3");
            this.addChild(obj.name, obj);

            obj = new Static("Static06", "absolute", "20", "664", "226", "79", null, null, this);
            obj.set_taborder("43");
            obj.set_text("2. typeOf");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static07", "absolute", "20", "742", "226", "79", null, null, this);
            obj.set_taborder("44");
            obj.set_text("3. isVisible");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static08", "absolute", "20", "820", "226", "79", null, null, this);
            obj.set_taborder("45");
            obj.set_text("4. isEnable");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static09", "absolute", "20", "898", "226", "79", null, null, this);
            obj.set_taborder("46");
            obj.set_text("5. lookup");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static16", "absolute", "20", "976", "226", "79", null, null, this);
            obj.set_taborder("47");
            obj.set_text("6. contains");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static05", "absolute", "20", "1054", "226", "40", null, null, this);
            obj.set_taborder("48");
            obj.set_text("7. getTopLevelForm");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static11", "absolute", "245", "976", "340", "40", null, null, this);
            obj.set_taborder("49");
            obj.set_text("(XComp, XComp) ⇒ (this, obj)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static19", "absolute", "245", "1015", "340", "40", null, null, this);
            obj.set_taborder("50");
            obj.set_text("(XComp, XComp) ⇒ (this, ds_test)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static20", "absolute", "245", "1054", "340", "40", null, null, this);
            obj.set_taborder("51");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static28", "absolute", "245", "1093", "340", "40", null, null, this);
            obj.set_taborder("52");
            obj.set_text("(XComp, string, string) \r\n⇒ (obj, \"text\", \"1234\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static33", "absolute", "245", "1132", "340", "40", null, null, this);
            obj.set_taborder("53");
            obj.set_text("(XComp, string, string, string, boolean)\r\n⇒ (obj, \"cssclass\", \"\", \"enable\", false)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static34", "absolute", "245", "1171", "340", "40", null, null, this);
            obj.set_taborder("54");
            obj.set_text("(XComp, string, string) \r\n⇒ (obj, \"text\", \"visible\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static35", "absolute", "245", "1210", "340", "40", null, null, this);
            obj.set_taborder("55");
            obj.set_text("(XComp, string, string, string) \r\n⇒ (obj, \"test\", \"position\", \"style\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static36", "absolute", "245", "664", "340", "40", null, null, this);
            obj.set_taborder("56");
            obj.set_text("(XComp) ⇒ (Button15)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static37", "absolute", "245", "703", "340", "40", null, null, this);
            obj.set_taborder("57");
            obj.set_text("(XComp) ⇒ (ds_test)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static38", "absolute", "245", "742", "340", "40", null, null, this);
            obj.set_taborder("58");
            obj.set_text("(XComp) ⇒ (Button17)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static39", "absolute", "245", "781", "340", "40", null, null, this);
            obj.set_taborder("59");
            obj.set_text("(XComp) ⇒ (Div01.st_test)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static40", "absolute", "245", "898", "340", "40", null, null, this);
            obj.set_taborder("60");
            obj.set_text("(XComp, string) ⇒ (this, \"Button11\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static41", "absolute", "245", "859", "340", "40", null, null, this);
            obj.set_taborder("61");
            obj.set_text("(XComp) ⇒ (Div02.edt_test)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static42", "absolute", "245", "820", "340", "40", null, null, this);
            obj.set_taborder("62");
            obj.set_text("(XComp) ⇒ (Button19)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static43", "absolute", "245", "937", "340", "40", null, null, this);
            obj.set_taborder("63");
            obj.set_text("(XComp, string) ⇒ (Div02, \"Button12\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button25", "absolute", "519", "1063", "56", "22", null, null, this);
            obj.set_taborder("64");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button26", "absolute", "519", "1102", "56", "22", null, null, this);
            obj.set_taborder("65");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button27", "absolute", "519", "1141", "56", "22", null, null, this);
            obj.set_taborder("66");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button28", "absolute", "519", "1180", "56", "22", null, null, this);
            obj.set_taborder("67");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button29", "absolute", "519", "1219", "56", "22", null, null, this);
            obj.set_taborder("68");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button15", "absolute", "519", "673", "56", "22", null, null, this);
            obj.set_taborder("69");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button16", "absolute", "519", "712", "56", "22", null, null, this);
            obj.set_taborder("70");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button17", "absolute", "519", "751", "56", "22", null, null, this);
            obj.set_taborder("71");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button18", "absolute", "519", "790", "56", "22", null, null, this);
            obj.set_taborder("72");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_2_result01", "absolute", "584", "664", "420", "40", null, null, this);
            obj.set_taborder("73");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_2_result02", "absolute", "584", "703", "420", "40", null, null, this);
            obj.set_taborder("74");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button19", "absolute", "519", "829", "56", "22", null, null, this);
            obj.set_taborder("75");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button20", "absolute", "519", "868", "56", "22", null, null, this);
            obj.set_taborder("76");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result01", "absolute", "584", "742", "420", "40", null, null, this);
            obj.set_taborder("77");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result02", "absolute", "584", "781", "420", "40", null, null, this);
            obj.set_taborder("78");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button21", "absolute", "519", "907", "56", "22", null, null, this);
            obj.set_taborder("79");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button22", "absolute", "519", "946", "56", "22", null, null, this);
            obj.set_taborder("80");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_5_result01", "absolute", "584", "898", "420", "40", null, null, this);
            obj.set_taborder("81");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_5_result02", "absolute", "584", "937", "420", "40", null, null, this);
            obj.set_taborder("82");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button23", "absolute", "519", "985", "56", "22", null, null, this);
            obj.set_taborder("83");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button24", "absolute", "519", "1024", "56", "22", null, null, this);
            obj.set_taborder("84");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_6_result01", "absolute", "584", "976", "420", "40", null, null, this);
            obj.set_taborder("85");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_6_result02", "absolute", "584", "1015", "420", "40", null, null, this);
            obj.set_taborder("86");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_7_result01", "absolute", "584", "1054", "420", "40", null, null, this);
            obj.set_taborder("87");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_14_result02", "absolute", "584", "1093", "420", "40", null, null, this);
            obj.set_taborder("88");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_14_result03", "absolute", "584", "1132", "420", "40", null, null, this);
            obj.set_taborder("89");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_9_result01", "absolute", "584", "1171", "420", "40", null, null, this);
            obj.set_taborder("90");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_9_result02", "absolute", "584", "1210", "420", "40", null, null, this);
            obj.set_taborder("91");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Div("Div01", "absolute", "432", "790", "80", "22", null, null, this);
            obj.set_taborder("92");
            obj.style.set_border("1px solid red");
            obj.set_text("Div00");
            this.addChild(obj.name, obj);
            obj = new Static("st_test", "absolute", "14", "3", "48", "14", null, null, this.Div01);
            obj.set_taborder("0");
            obj.set_text("st_test");
            obj.style.set_border("1px solid blue");
            this.Div01.addChild(obj.name, obj);

            obj = new Static("st_4_result02", "absolute", "584", "859", "420", "40", null, null, this);
            obj.set_taborder("93");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_4_result01", "absolute", "584", "820", "420", "40", null, null, this);
            obj.set_taborder("94");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Div("Div02", "absolute", "432", "869", "80", "22", null, null, this);
            obj.set_taborder("95");
            obj.style.set_border("1px solid red");
            obj.set_text("Div00");
            this.addChild(obj.name, obj);
            obj = new Edit("edt_test", "absolute", "7", "3", "60", "15", null, null, this.Div02);
            obj.set_taborder("0");
            obj.set_value("edt_test");
            this.Div02.addChild(obj.name, obj);

            obj = new Div("Div03", "absolute", "432", "1063", "80", "22", null, null, this);
            obj.set_taborder("96");
            obj.style.set_border("1px solid red");
            obj.set_async("false");
            obj.set_text("Div");
            obj.set_scrollbars("none");
            obj.getSetter("asyncmode").set("false");
            this.addChild(obj.name, obj);

            obj = new Static("Static44", "absolute", "20", "1093", "226", "79", null, null, this);
            obj.set_taborder("97");
            obj.set_text("8. setProperties");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static45", "absolute", "20", "1171", "226", "79", null, null, this);
            obj.set_taborder("98");
            obj.set_text("9. getProperties");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Button("btn_test1", "absolute", "596", "1100", "120", "26", null, null, this);
            obj.set_taborder("99");
            obj.set_text("Button Test");
            this.addChild(obj.name, obj);

            obj = new Button("btn_test2", "absolute", "596", "1139", "120", "26", null, null, this);
            obj.set_taborder("100");
            obj.set_text("Button Test");
            this.addChild(obj.name, obj);

            obj = new Static("Static46", "absolute", "20", "625", "226", "40", null, null, this);
            obj.set_taborder("101");
            obj.set_text("Method");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static47", "absolute", "245", "625", "340", "40", null, null, this);
            obj.set_taborder("102");
            obj.set_text("Arguments:  ( Type ) ⇒ ( Value )");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static48", "absolute", "584", "625", "420", "40", null, null, this);
            obj.set_taborder("103");
            obj.set_text("Result: (Type) Vaule");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static49", "absolute", "20", "1249", "226", "79", null, null, this);
            obj.set_taborder("104");
            obj.set_text("10. getPathName");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static50", "absolute", "20", "1327", "226", "79", null, null, this);
            obj.set_taborder("105");
            obj.set_text("11. serializeForm");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static51", "absolute", "245", "1249", "340", "40", null, null, this);
            obj.set_taborder("106");
            obj.set_text("(XComp, XComp) ⇒ (obj, this)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static52", "absolute", "245", "1288", "340", "40", null, null, this);
            obj.set_taborder("107");
            obj.set_text("(XComp, XComp)\r\n⇒ (Div04.st_test, this)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static53", "absolute", "245", "1327", "340", "79", null, null, this);
            obj.set_taborder("108");
            obj.set_text("(Form) ⇒ (this)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button30", "absolute", "519", "1258", "56", "22", null, null, this);
            obj.set_taborder("109");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button31", "absolute", "519", "1297", "56", "22", null, null, this);
            obj.set_taborder("110");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button32", "absolute", "519", "1355", "56", "22", null, null, this);
            obj.set_taborder("111");
            obj.set_text("TO-DO");
            obj.set_cssclass("WF_btn_Point");
            obj.set_enable("false");
            this.addChild(obj.name, obj);

            obj = new Static("st_10_result01", "absolute", "584", "1249", "420", "40", null, null, this);
            obj.set_taborder("112");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_10_result02", "absolute", "584", "1288", "420", "40", null, null, this);
            obj.set_taborder("113");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result00", "absolute", "584", "1327", "420", "79", null, null, this);
            obj.set_taborder("114");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Div("Div04", "absolute", "432", "1297", "80", "22", null, null, this);
            obj.set_taborder("115");
            obj.style.set_border("1px solid red");
            obj.set_text("Div00");
            this.addChild(obj.name, obj);
            obj = new Static("st_test", "absolute", "14", "3", "48", "14", null, null, this.Div04);
            obj.set_taborder("0");
            obj.set_text("st_test");
            obj.style.set_border("1px solid blue");
            this.Div04.addChild(obj.name, obj);

            obj = new TextArea("txt_11_result01", "absolute", "588", "1331", "412", "71", null, null, this);
            obj.set_taborder("116");
            this.addChild(obj.name, obj);

            obj = new Static("Static54", "absolute", "245", "1405", "340", "40", null, null, this);
            obj.set_taborder("117");
            obj.set_text("(XComp) ⇒ (Button03)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static55", "absolute", "245", "1444", "340", "40", null, null, this);
            obj.set_taborder("118");
            obj.set_text("(XComp) ⇒ (ds_test)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button33", "absolute", "519", "1414", "56", "22", null, null, this);
            obj.set_taborder("119");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button34", "absolute", "519", "1453", "56", "22", null, null, this);
            obj.set_taborder("120");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_12_result01", "absolute", "584", "1405", "420", "40", null, null, this);
            obj.set_taborder("121");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_12_result02", "absolute", "584", "1444", "420", "40", null, null, this);
            obj.set_taborder("122");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static56", "absolute", "20", "1405", "226", "79", null, null, this);
            obj.set_taborder("123");
            obj.set_text("12. isVisual");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Button("Button35", "absolute", "440", "1411", "56", "23", null, null, this);
            obj.set_taborder("124");
            obj.set_text("Button03");
            this.addChild(obj.name, obj);

            obj = new Static("Static57", "absolute", "20", "1483", "226", "79", null, null, this);
            obj.set_taborder("125");
            obj.set_text("13. getCompByPathName");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static58", "absolute", "245", "1522", "340", "40", null, null, this);
            obj.set_taborder("126");
            obj.set_text("(string, XComp)\r\n⇒ (\"st_test\", Div05)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static59", "absolute", "245", "1483", "340", "40", null, null, this);
            obj.set_taborder("127");
            obj.set_text("(string, XComp)\r\n⇒ (\"Div05.st_test\", this)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button36", "absolute", "519", "1531", "56", "22", null, null, this);
            obj.set_taborder("128");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button37", "absolute", "519", "1492", "56", "22", null, null, this);
            obj.set_taborder("129");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_13_result01", "absolute", "584", "1483", "420", "40", null, null, this);
            obj.set_taborder("130");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_13_result02", "absolute", "584", "1522", "420", "40", null, null, this);
            obj.set_taborder("131");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Div("Div05", "absolute", "432", "1492", "80", "22", null, null, this);
            obj.set_taborder("132");
            obj.style.set_border("1px solid red");
            obj.set_text("Div00");
            this.addChild(obj.name, obj);
            obj = new Static("st_test", "absolute", "14", "3", "48", "14", null, null, this.Div05);
            obj.set_taborder("0");
            obj.set_text("st_test");
            obj.style.set_border("1px solid blue");
            this.Div05.addChild(obj.name, obj);

            obj = new Static("Static60", "absolute", "20", "1561", "226", "40", null, null, this);
            obj.set_taborder("133");
            obj.set_text("14. getScriptForm");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static61", "absolute", "245", "1561", "340", "40", null, null, this);
            obj.set_taborder("134");
            obj.set_text("(XComp) ⇒ (this.Button38)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button38", "absolute", "519", "1570", "56", "22", null, null, this);
            obj.set_taborder("135");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_14_result01", "absolute", "584", "1561", "420", "40", null, null, this);
            obj.set_taborder("136");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static62", "absolute", "20", "1600", "226", "40", null, null, this);
            obj.set_taborder("137");
            obj.set_text("15. getPopupArguments");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static63", "absolute", "245", "1600", "340", "40", null, null, this);
            obj.set_taborder("138");
            obj.set_text("showModal");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("st_15_result01", "absolute", "584", "1600", "420", "40", null, null, this);
            obj.set_taborder("139");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button39", "absolute", "519", "1609", "56", "22", null, null, this);
            obj.set_taborder("140");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static64", "absolute", "20", "1639", "226", "40", null, null, this);
            obj.set_taborder("141");
            obj.set_text("16. setUserProperty");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static65", "absolute", "245", "1639", "340", "40", null, null, this);
            obj.set_taborder("142");
            obj.set_text("(XComp, string, *) ⇒\r\n(this.Button40, \"myProp\", [0,1,2])");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button40", "absolute", "519", "1648", "56", "22", null, null, this);
            obj.set_taborder("143");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_16_result01", "absolute", "584", "1639", "420", "40", null, null, this);
            obj.set_taborder("144");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static66", "absolute", "20", "1678", "226", "40", null, null, this);
            obj.set_taborder("145");
            obj.set_text("17. getUserProperty");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static67", "absolute", "245", "1678", "340", "40", null, null, this);
            obj.set_taborder("146");
            obj.set_text("(XComp, string) ⇒\r\n(this.Button40, \"myProp\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button41", "absolute", "519", "1687", "56", "22", null, null, this);
            obj.set_taborder("147");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_17_result01", "absolute", "584", "1678", "420", "40", null, null, this);
            obj.set_taborder("148");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static68", "absolute", "20", "1717", "226", "64", null, null, this);
            obj.set_taborder("149");
            obj.set_text("18. deleteUserProperty");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static69", "absolute", "245", "1717", "340", "64", null, null, this);
            obj.set_taborder("150");
            obj.set_text("(XComp, string) ⇒\r\n(this.Button40, \"myProp\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button42", "absolute", "519", "1726", "56", "22", null, null, this);
            obj.set_taborder("151");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_18_result01", "absolute", "584", "1717", "420", "64", null, null, this);
            obj.set_taborder("152");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 0, 0, this.Div00.Div01.Tab00.tabpage1,
            	//-- Layout function
            	function(p) {
            		p.set_text("tabpage1");

            	}
            );
            this.Div00.Div01.Tab00.tabpage1.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 0, 0, this.Div00.Div01.Tab00.tabpage2,
            	//-- Layout function
            	function(p) {
            		p.set_text("tabpage2");

            	}
            );
            this.Div00.Div01.Tab00.tabpage2.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 179, 392, this.Div00.Div01,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("3");
            		p.style.set_border("2px dotted red");
            		p.set_text("Div00");

            	}
            );
            this.Div00.Div01.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 198, 559, this.Div00,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("36");
            		p.style.set_border("2px dotted blue");
            		p.set_text("Div00");

            	}
            );
            this.Div00.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 80, 22, this.Div01,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("92");
            		p.style.set_border("1px solid red");
            		p.set_text("Div00");

            	}
            );
            this.Div01.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 80, 22, this.Div02,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("95");
            		p.style.set_border("1px solid red");
            		p.set_text("Div00");

            	}
            );
            this.Div02.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 80, 22, this.Div04,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("115");
            		p.style.set_border("1px solid red");
            		p.set_text("Div00");

            	}
            );
            this.Div04.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 80, 22, this.Div05,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("132");
            		p.style.set_border("1px solid red");
            		p.set_text("Div00");

            	}
            );
            this.Div05.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 1024, 1826, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("XComp");
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("XComp.xfdl", function() {
        /*
         * Eco.XComp api Sample at nexacro
         *
         * Copyright (c) 2014 EcoSystem of TOBESOFT
         * Licensed Free under nexacro.
        */

        this.fn_setResult = function(comps)
        {
        	var str = "";
        	for (var i=0,len=comps.length; i<len; i++)
        	{
        		str += "\t" + comps[i];
        		if ( i < len-1 )
        		{
        			str += ",\n";
        		}
        	}
        	this.txt_result1.set_value(  "(array)\n[\n" + str + "\n]" );
        	
        	trace(comps);
        }

        // 1.1 query api 사용 예제
        this.Button00_onclick = function(obj,e)
        {
        	var comps = Eco.XComp.query(this, "");
        	
        	this.fn_setResult(comps);
        }

        // 1.2 query api 사용 예제
        this.Button01_onclick = function(obj,e)
        {
        	var comps = Eco.XComp.query(this.Div00, "");

        	this.fn_setResult(comps);
        }

        // 1.3 query api 사용 예제
        this.Button02_onclick = function(obj,e)
        {
        	var comps = Eco.XComp.query(this.Div00, "", 0);
        	
        	this.fn_setResult(comps);
        }

        // 1.4 query api 사용 예제
        this.Button03_onclick = function(obj,e)
        {
        	var comps = Eco.XComp.query(this.Div00, "", 2);

        	this.fn_setResult(comps);
        }

        // 1.5 query api 사용 예제
        this.Button04_onclick = function(obj,e)
        {
        	var where = "typeOf == 'Button'";
        	var comps = Eco.XComp.query(this.Div00, where);
        	
        	this.fn_setResult(comps);
        }

        // 1.6 query api 사용 예제
        this.Button05_onclick = function(obj,e)
        {
        	var where = "typeOf == 'Button' || typeOf == 'Div'";
        	var comps = Eco.XComp.query(this.Div00, where);
        	
        	this.fn_setResult(comps);
        }

        // 1.7 query api 사용 예제
        this.Button06_onclick = function(obj,e)
        {
        	this.Div00.Div01.set_visible( false );
        	
        	var where = "prop[visible] == true";
        	var comps = Eco.XComp.query(this.Div00, where);
        	
        	this.fn_setResult(comps);
        }

        // 1.8 query api 사용 예제
        this.Button07_onclick = function(obj,e)
        {
        	var where = "prop[text] == 'Button02'";
        	var comps = Eco.XComp.query(this.Div00, where);
        	
        	this.fn_setResult(comps);
        }

        // 1.9 query api 사용 예제
        this.Button08_onclick = function(obj,e)
        {
        // 	trace("Tab00=" + this.Div00.Div01.Tab00.currentstyle.align);
        // 	trace("tabpage1=" + this.Div00.Div01.Tab00.tabpage1.currentstyle.align);
        // 	return;
        	this.Div00.Div01.Button01.style.set_align("left top");
        	
        	var where = "curStyle[align] == 'center middle'";
        	var comps = Eco.XComp.query(this.Div00, where);
        	
        	this.fn_setResult(comps);
        }

        // 1.10 query api 사용 예제
        this.Button09_onclick = function(obj,e)
        {
        	var where = "style[align] == 'left top'";
        	var comps = Eco.XComp.query(this.Div00, where);
        	
        	this.fn_setResult(comps);
        }

        // 1.11 query api 사용 예제
        this.Button10_onclick = function(obj,e)
        {
        	this.Div00.Div01.set_visible(false);
        		
        	var where = "isVisible == true";
        	var comps = Eco.XComp.query(this.Div00, where);
        	
        	this.fn_setResult(comps);
        }

        // 1.12 query api 사용 예제
        this.Button11_onclick = function(obj,e)
        {
        	this.Div00.Div01.set_enable(false);	

        	var where = "isEnable == true";
        	var comps = Eco.XComp.query(this.Div00, where);
        	
        	this.fn_setResult(comps);
        }

        // 1.13 query api 사용 예제
        this.Button12_onclick = function(obj,e)
        {
        	var where = "prop[name] *= 'ab'";
        	var comps = Eco.XComp.query(this.Div00, where);
        	
        	this.fn_setResult(comps);
        }

        // 1.14 query api 사용 예제
        this.Button13_onclick = function(obj,e)
        {
        	var where = "prop[name] ^= 'Bu'";
        	var comps = Eco.XComp.query(this.Div00, where);	
        	
        	this.fn_setResult(comps);
        }

        // 1.15 query api 사용 예제
        this.Button14_onclick = function(obj,e)
        {
        	var where = "prop[name] $= '01'";
        	var comps = Eco.XComp.query(this.Div00, where);
        	
        	this.fn_setResult(comps);
        }

        // 2.1 typeOf api 사용 예제
        this.Button15_onclick = function(obj,e)
        {
        	var type = Eco.XComp.typeOf(this.Button15);
        	this.st_2_result01.set_text( "(string) " + type );
        	trace(type);
        }

        // 2.2 typeOf api 사용 예제
        this.Button16_onclick = function(obj,e)
        {
        	var type = Eco.XComp.typeOf(this.ds_test);
        	this.st_2_result02.set_text( "(string) " + type );
        	trace(type);
        }

        // 3.1 isVisible api 사용 예제
        this.Button17_onclick = function(obj,e)
        {
        	var visible = Eco.XComp.isVisible(this.Button17);
        	this.st_3_result01.set_text( "(boolean) " + visible );
        	trace(visible);
        }

        // 3.2 isVisible api 사용 예제
        this.Button18_onclick = function(obj,e)
        {
        	this.Div01.set_visible( false );
        	
        	// 화면에 보이지 않지만 속성값은 true 를 유지함.
        	trace("Div00.this.st_test.visible==>"+this.Div01.st_test.visible);
        	
        	// 화면에 실제 보이는지 여부를 체크
        	var visible = Eco.XComp.isVisible(this.Div01.st_test);
        	this.st_3_result02.set_text( "(boolean) " + visible);
        	trace("Eco.XComp.isVisible==>"+visible);	
        }

        // 4.1 isEnable api 사용 예제
        this.Button19_onclick = function(obj,e)
        {
        	var enable = Eco.XComp.isEnable(this.Button19);
        	this.st_4_result01.set_text( "(boolean) " + enable );
        	trace(enable);
        }

        // 4.2 isEnable api 사용 예제
        this.Button20_onclick = function(obj,e)
        {
        	this.Div02.set_enable( false );
        	// 비활성화 상태지만 속성값은 true 를 유지함.
        	trace("Div01.this.st_test.enable==>"+ this.Div02.edt_test.enable);
        	
        	// 실제 활성화 상태인지 체크
        	var enable = Eco.XComp.isEnable(this.Div02.edt_test);
        	this.st_4_result02.set_text( "(boolean) " + enable );
        	trace("Eco.XComp.isEnable==>"+enable);	
        }

        // 5.1 lookup api 사용 예제
        this.Button21_onclick = function(obj,e)
        {
        	var c = Eco.XComp.lookup(this, "Button11");
        	
        	this.st_5_result01.set_text( "(XComp) " + c );
        	
        	trace(c);
        }

        // 5.2 lookup api 사용 예제
        this.Button22_onclick = function(obj,e)
        {
        	// Button12 는 Div02 에 존재하지 않으나 Div02 의 상위 컴포넌트인 Form 에 존재
        	var c = Eco.XComp.lookup(this.Div02, "Button12");
        	
        	this.st_5_result02.set_text( "(XComp) " + c );
        	
        	trace(c);	
        }

        // 6.1 contains api 사용 예제
        this.Button23_onclick = function(obj,e)
        {
        	var c = Eco.XComp.contains(this, obj);
        	
        	this.st_6_result01.set_text( "(boolean) " + c );
        	
        	trace(c);
        }

        // 6.2 contains api 사용 예제
        this.Button24_onclick = function(obj,e)
        {
        	var c = Eco.XComp.contains(this, this.ds_test);
        	
        	this.st_6_result02.set_text( "(boolean) " + c );
        	
        	trace(c);
        }

        // 7.1 getTopLevelForm api 사용 예제
        this.Button25_onclick = function(obj,e)
        {
        	var topForm = Eco.XComp.getTopLevelForm(this);
        	trace(topForm.name);
        	
        	this.Div03.set_url("Sample::XComp_sub.xfdl");
        	
        	var form = this.Div03.fn_getTopForm();
        	
        	this.st_7_result01.set_text( "(form) " + form.name );
        	
        	trace(form.name);
        }

        // 8.1 setProperties api 사용 예제
        this.Button26_onclick = function(obj,e)
        {
        	Eco.XComp.setProperties(this.btn_test1, "text", "1234");
        }

        // 8.2 setProperties api 사용 예제
        this.Button27_onclick = function(obj,e)
        {
        	Eco.XComp.setProperties(this.btn_test2, "cssclass", "btn_WF_P", "enable", false);
        }

        // 9.1 getProperties api 사용 예제
        this.Button28_onclick = function(obj,e)
        {
        	var props = Eco.XComp.getProperties(obj, "text", "visible");
        	this.st_9_result01.set_text( "(array) " + props );
        	trace(props);
        }

        // 9.2 getProperties api 사용 예제
        this.Button29_onclick = function(obj,e)
        {
        	var props = Eco.XComp.getProperties(obj, "test", "cssclass", "style");
        	this.st_9_result02.set_text( "(array) " + props );
        	trace(props);
        }

        // 10.1 getPathName api 사용 예제
        this.Button30_onclick = function(obj,e)
        {
        	var name = Eco.XComp.getPathName(obj, this);
        	
        	this.st_10_result01.set_text( "(string) " + name );
        	
        	trace(name);
        }

        // 10.2 getPathName api 사용 예제
        this.Button31_onclick = function(obj,e)
        {
        	var name = Eco.XComp.getPathName(this.Div04.st_test, this);
        	
        	this.st_10_result02.set_text( "(string) " + name );
        	
        	trace(name);
        }

        // 11.1 serializeForm api 사용 예제
        this.Button32_onclick = function(obj,e)
        {
        	var form = Eco.XComp.serializeForm(this);
        	
        	this.txt_11_result01.set_value( form );
        	
        	trace(form);
        }

        // 12.1 isVisual api 사용 예제
        this.Button33_onclick = function(obj,e)
        {
        	var visual = Eco.XComp.isVisual(this.Button03);
        	this.st_12_result01.set_text( "(boolean) " + visual );
        	trace(visual);	
        }

        // 12.2 isVisual api 사용 예제
        this.Button34_onclick = function(obj,e)
        {
        	var visual = Eco.XComp.isVisual(this.ds_test);
        	this.st_12_result02.set_text( "(boolean) " + visual );
        	trace(visual);
        }

        // 13.1 getCompByPathName api 사용 예제
        this.Button37_onclick = function(obj,e)
        {
        	var name = Eco.XComp.getCompByPathName("Div05.st_test", this);
        	this.st_13_result01.set_text( "(XComp) " + name );
        	
        	trace(name);
        }

        // 13.2 getCompByPathName api 사용 예제
        this.Button36_onclick = function(obj,e)
        {
        	var name = Eco.XComp.getCompByPathName("st_test", this.Div05);
        	
        	this.st_13_result02.set_text( "(XComp) " + name );
        	
        	trace(name);
        }

        // 14.1 getScriptForm api 사용 예제
        this.Button38_onclick = function(obj,e)
        {
        	var form = Eco.XComp.getScriptForm(this.Button38)
        	
        	this.st_14_result01.set_text( "(XComp) " + form );
        	
        	trace(form);	
        }

        // 15.1 getPopupArguments api 사용 예제
        this.Button39_onclick = function(obj,e)
        {
        	var frame = new ChildFrame();
        	frame.init("testFrame", "absolute", 10, 10, 400, 400, null, null, "Sample::XComp_sub2.xfdl");
        	frame.showModal(this.getOwnerFrame(), {'name':'James', 'address':"Seoul, Korea" });
        }

        // 16.1 setUserProperty api 사용 예제
        this.Button40_onclick = function(obj,e)
        {
        	Eco.XComp.setUserProperty(this.Button40, "myProp", [0,1,2]);
        	
        	this.st_16_result01.set_text( " set " );
        }

        // 17.1 getUserProperty api 사용 예제
        this.Button41_onclick = function(obj,e)
        {
        	var val = Eco.XComp.getUserProperty(this.Button40, "myProp");
        	
        	this.st_17_result01.set_text( "(*) " + val );
        	
        	trace(val);		
        }

        // 18.1 deleteUserProperty api 사용 예제
        this.Button42_onclick = function(obj,e)
        {
        	var msg = 'before delete ==> ' + Eco.XComp.getUserProperty(this.Button40, "myProp");
        	
        	Eco.XComp.deleteUserProperty(this.Button40, "myProp");
        	
        	msg += '\ncall deleteUserProperty()';	
        	msg += '\nafter delete ==> ' + Eco.XComp.getUserProperty(this.Button40, "myProp");
        	
        	this.st_18_result01.set_text( msg  );
        	
        	trace(msg);		
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.Button10.addEventHandler("onclick", this.Button10_onclick, this);
            this.Button11.addEventHandler("onclick", this.Button11_onclick, this);
            this.Button12.addEventHandler("onclick", this.Button12_onclick, this);
            this.Button13.addEventHandler("onclick", this.Button13_onclick, this);
            this.Button14.addEventHandler("onclick", this.Button14_onclick, this);
            this.Button00.addEventHandler("onclick", this.Button00_onclick, this);
            this.Button01.addEventHandler("onclick", this.Button01_onclick, this);
            this.Button02.addEventHandler("onclick", this.Button02_onclick, this);
            this.Button03.addEventHandler("onclick", this.Button03_onclick, this);
            this.Button04.addEventHandler("onclick", this.Button04_onclick, this);
            this.Button05.addEventHandler("onclick", this.Button05_onclick, this);
            this.Button06.addEventHandler("onclick", this.Button06_onclick, this);
            this.Button07.addEventHandler("onclick", this.Button07_onclick, this);
            this.Button08.addEventHandler("onclick", this.Button08_onclick, this);
            this.Button09.addEventHandler("onclick", this.Button09_onclick, this);
            this.Button25.addEventHandler("onclick", this.Button25_onclick, this);
            this.Button26.addEventHandler("onclick", this.Button26_onclick, this);
            this.Button27.addEventHandler("onclick", this.Button27_onclick, this);
            this.Button28.addEventHandler("onclick", this.Button28_onclick, this);
            this.Button29.addEventHandler("onclick", this.Button29_onclick, this);
            this.Button15.addEventHandler("onclick", this.Button15_onclick, this);
            this.Button16.addEventHandler("onclick", this.Button16_onclick, this);
            this.Button17.addEventHandler("onclick", this.Button17_onclick, this);
            this.Button18.addEventHandler("onclick", this.Button18_onclick, this);
            this.Button19.addEventHandler("onclick", this.Button19_onclick, this);
            this.Button20.addEventHandler("onclick", this.Button20_onclick, this);
            this.Button21.addEventHandler("onclick", this.Button21_onclick, this);
            this.Button22.addEventHandler("onclick", this.Button22_onclick, this);
            this.Button23.addEventHandler("onclick", this.Button23_onclick, this);
            this.Button24.addEventHandler("onclick", this.Button24_onclick, this);
            this.Button30.addEventHandler("onclick", this.Button30_onclick, this);
            this.Button31.addEventHandler("onclick", this.Button31_onclick, this);
            this.Button32.addEventHandler("onclick", this.Button32_onclick, this);
            this.Button33.addEventHandler("onclick", this.Button33_onclick, this);
            this.Button34.addEventHandler("onclick", this.Button34_onclick, this);
            this.Button36.addEventHandler("onclick", this.Button36_onclick, this);
            this.Button37.addEventHandler("onclick", this.Button37_onclick, this);
            this.Button38.addEventHandler("onclick", this.Button38_onclick, this);
            this.Button39.addEventHandler("onclick", this.Button39_onclick, this);
            this.Button40.addEventHandler("onclick", this.Button40_onclick, this);
            this.Button41.addEventHandler("onclick", this.Button41_onclick, this);
            this.Button42.addEventHandler("onclick", this.Button42_onclick, this);

        };

        this.loadIncludeScript("XComp.xfdl");

       
    };
}
)();
