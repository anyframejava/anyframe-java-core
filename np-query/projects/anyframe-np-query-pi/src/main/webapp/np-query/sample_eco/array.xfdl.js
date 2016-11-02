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
                this.set_name("array");
                this.set_classname("array");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,1024,3489);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("Static01", "absolute", "20", "39", "196", "267", null, null, this);
            obj.set_taborder("0");
            obj.set_text("1. Each");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static00", "absolute", "215", "39", "370", "109", null, null, this);
            obj.set_taborder("1");
            obj.set_text("(array, function) ⇒ (\r\n    [\"Jan\", \"Feb\", \"Mar\", \"Apr\"], \r\n    function(name, index) {\r\n        trace(index + \"==>\" + name);\r\n    }\r\n)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button00", "absolute", "519", "83", "56", "22", null, null, this);
            obj.set_taborder("2");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_result00", "absolute", "584", "39", "420", "109", null, null, this);
            obj.set_taborder("3");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static06", "absolute", "215", "0", "370", "40", null, null, this);
            obj.set_taborder("4");
            obj.set_text("Arguments:  ( Type ) ⇒ ( Value )");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static07", "absolute", "20", "0", "196", "40", null, null, this);
            obj.set_taborder("5");
            obj.set_text("Method");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static08", "absolute", "584", "0", "420", "40", null, null, this);
            obj.set_taborder("6");
            obj.set_text("Result: (Type) Vaule");
            obj.set_cssclass("WFDA_sta_header");
            obj.style.set_font("antialias bold 9 Verdana, antialias 9 bold dotum");
            this.addChild(obj.name, obj);

            obj = new Static("Static02", "absolute", "215", "147", "370", "159", null, null, this);
            obj.set_taborder("7");
            obj.set_text("(array, function) ⇒ (\r\n    [\"Jan\", \"Feb\", \"Mar\", \"Apr\"], \r\n    function(name, index) {\r\n        trace(index + \"==>\" + name);\r\n        if (name === 'Mar') {\r\n            trace(\"break here!\");\r\n            return false;\r\n        }\r\n    }\r\n)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button01", "absolute", "519", "215", "56", "22", null, null, this);
            obj.set_taborder("8");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_result01", "absolute", "584", "147", "420", "159", null, null, this);
            obj.set_taborder("9");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static03", "absolute", "20", "305", "196", "163", null, null, this);
            obj.set_taborder("10");
            obj.set_text("2. forEach");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static04", "absolute", "215", "305", "370", "163", null, null, this);
            obj.set_taborder("11");
            obj.set_text("(array, function) ⇒ (\r\n    [\"Jan\", \"Feb\", \"Mar\", \"Apr\"], \r\n    function(name, index) {\r\n        if (name === 'Mar') {\r\n            trace(\"don't break here!\");\r\n            return false;\r\n        }\r\n        trace(index + \"==>\" + name);\r\n    }\r\n)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button02", "absolute", "519", "375", "56", "22", null, null, this);
            obj.set_taborder("12");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_result02", "absolute", "584", "305", "420", "163", null, null, this);
            obj.set_taborder("13");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static05", "absolute", "20", "467", "196", "53", null, null, this);
            obj.set_taborder("14");
            obj.set_text("3. indexOf");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static09", "absolute", "215", "467", "370", "53", null, null, this);
            obj.set_taborder("15");
            obj.set_text("(array, object) ⇒ \r\n([\"Jan\", \"Feb\", \"Mar\", \"Apr\"], \"Mar\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button03", "absolute", "519", "483", "56", "22", null, null, this);
            obj.set_taborder("16");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_result03", "absolute", "584", "467", "420", "53", null, null, this);
            obj.set_taborder("17");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static10", "absolute", "20", "519", "196", "53", null, null, this);
            obj.set_taborder("18");
            obj.set_text("4. lastIndexOf");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static11", "absolute", "215", "519", "370", "53", null, null, this);
            obj.set_taborder("19");
            obj.set_text("(array, object) ⇒ \r\n([\"Jan\", \"Feb\", \"Mar\", \"Apr\"], \"Mar\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button04", "absolute", "519", "535", "56", "22", null, null, this);
            obj.set_taborder("20");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_result04", "absolute", "584", "519", "420", "53", null, null, this);
            obj.set_taborder("21");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static12", "absolute", "20", "571", "196", "53", null, null, this);
            obj.set_taborder("22");
            obj.set_text("5. contains");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static13", "absolute", "215", "571", "370", "53", null, null, this);
            obj.set_taborder("23");
            obj.set_text("(array, object) ⇒ \r\n([\"Jan\", \"Feb\", \"Mar\", \"Apr\"], \"Mar\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button05", "absolute", "519", "587", "56", "22", null, null, this);
            obj.set_taborder("24");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_result05", "absolute", "584", "571", "420", "53", null, null, this);
            obj.set_taborder("25");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static14", "absolute", "20", "623", "196", "157", null, null, this);
            obj.set_taborder("26");
            obj.set_text("6. toArray");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static15", "absolute", "215", "623", "370", "119", null, null, this);
            obj.set_taborder("27");
            obj.set_text("(arguments) ⇒ (\"Jan\", \"Feb\", \"Mar\", \"Apr\")\r\n----------------------------------------------------------\r\n    this.fn_mon(\"Jan\", \"Feb\", \"Mar\", \"Apr\");\r\n    function fn_mon() {\r\n        var result = Base.array.toArray(arguments);\r\n        trace(result);\r\n    }");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button06", "absolute", "519", "663", "56", "22", null, null, this);
            obj.set_taborder("28");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_result06", "absolute", "584", "623", "420", "119", null, null, this);
            obj.set_taborder("29");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static19", "absolute", "215", "741", "370", "39", null, null, this);
            obj.set_taborder("33");
            obj.set_text("(string, number, number) ⇒ (\"ABCDEFG\", 1, 3)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button07", "absolute", "519", "750", "56", "22", null, null, this);
            obj.set_taborder("34");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_result07", "absolute", "584", "741", "420", "39", null, null, this);
            obj.set_taborder("35");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static20", "absolute", "20", "779", "196", "91", null, null, this);
            obj.set_taborder("36");
            obj.set_text("7. map");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static21", "absolute", "215", "779", "370", "91", null, null, this);
            obj.set_taborder("37");
            obj.set_text("(array, function) ⇒ (\r\n    [2, 10, 5, 1], \r\n    function(ele){return ele * 1000;}\r\n)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button08", "absolute", "519", "814", "56", "22", null, null, this);
            obj.set_taborder("38");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_result08", "absolute", "584", "779", "420", "91", null, null, this);
            obj.set_taborder("39");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static22", "absolute", "20", "869", "196", "181", null, null, this);
            obj.set_taborder("40");
            obj.set_text("8. every");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static23", "absolute", "215", "869", "370", "91", null, null, this);
            obj.set_taborder("41");
            obj.set_text("(array, function) ⇒ (\r\n    [2, 10, 5, 1], \r\n    function(ele){return (ele > 0);}\r\n)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button09", "absolute", "519", "904", "56", "22", null, null, this);
            obj.set_taborder("42");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_result09", "absolute", "584", "869", "420", "91", null, null, this);
            obj.set_taborder("43");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static24", "absolute", "215", "959", "370", "91", null, null, this);
            obj.set_taborder("44");
            obj.set_text("(array, function) ⇒ (\r\n    [2, 10, 5, 1], \r\n    function(ele){return (ele < 5);}\r\n)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button10", "absolute", "519", "994", "56", "22", null, null, this);
            obj.set_taborder("45");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_result10", "absolute", "584", "959", "420", "91", null, null, this);
            obj.set_taborder("46");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static25", "absolute", "20", "1049", "196", "181", null, null, this);
            obj.set_taborder("47");
            obj.set_text("9. some");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static26", "absolute", "215", "1049", "370", "91", null, null, this);
            obj.set_taborder("48");
            obj.set_text("(array, function) ⇒ (\r\n    [2, 10, 5, 1], \r\n    function(ele){return (ele > 5);}\r\n)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static27", "absolute", "215", "1139", "370", "91", null, null, this);
            obj.set_taborder("49");
            obj.set_text("(array, function) ⇒ (\r\n    [2, 10, 5, 1], \r\n    function(ele){return (ele < 10);}\r\n)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("st_result11", "absolute", "584", "1049", "420", "91", null, null, this);
            obj.set_taborder("50");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_result12", "absolute", "584", "1139", "420", "91", null, null, this);
            obj.set_taborder("51");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button11", "absolute", "519", "1084", "56", "22", null, null, this);
            obj.set_taborder("52");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button12", "absolute", "519", "1174", "56", "22", null, null, this);
            obj.set_taborder("53");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static16", "absolute", "20", "1229", "196", "77", null, null, this);
            obj.set_taborder("54");
            obj.set_text("10. equals");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static17", "absolute", "215", "1229", "370", "39", null, null, this);
            obj.set_taborder("55");
            obj.set_text("(array, array) ⇒ ([2, 10, 5, 1], [2, 10, 5, 1])");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button13", "absolute", "519", "1238", "56", "22", null, null, this);
            obj.set_taborder("56");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_result13", "absolute", "584", "1229", "420", "39", null, null, this);
            obj.set_taborder("57");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static30", "absolute", "215", "1267", "370", "39", null, null, this);
            obj.set_taborder("61");
            obj.set_text("(array, array) ⇒ ([2, 10, 5, 1], [2, 10, 5])");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button14", "absolute", "519", "1276", "56", "22", null, null, this);
            obj.set_taborder("62");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_result14", "absolute", "584", "1267", "420", "39", null, null, this);
            obj.set_taborder("63");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static31", "absolute", "20", "1305", "196", "57", null, null, this);
            obj.set_taborder("64");
            obj.set_text("11. clean");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static32", "absolute", "215", "1305", "370", "57", null, null, this);
            obj.set_taborder("65");
            obj.set_text("(array) ⇒ \r\n([\"A\", undefined, \"B\", null, \"C\", , \"D\"])");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button15", "absolute", "519", "1323", "56", "22", null, null, this);
            obj.set_taborder("66");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_result15", "absolute", "584", "1305", "420", "57", null, null, this);
            obj.set_taborder("67");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static33", "absolute", "20", "1361", "196", "57", null, null, this);
            obj.set_taborder("68");
            obj.set_text("12. unique");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static34", "absolute", "215", "1361", "370", "57", null, null, this);
            obj.set_taborder("69");
            obj.set_text("(array) ⇒ \r\n([\"A\", \"B\", \"C\", \"A\", \"A\", \"B\"])");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button16", "absolute", "519", "1379", "56", "22", null, null, this);
            obj.set_taborder("70");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_result16", "absolute", "584", "1361", "420", "57", null, null, this);
            obj.set_taborder("71");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static35", "absolute", "215", "1417", "370", "86", null, null, this);
            obj.set_taborder("72");
            obj.set_text("(array, function) ⇒ (\r\n    [2, 10, 5, 1], \r\n    function(ele){return (ele > 3);}\r\n)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button17", "absolute", "519", "1449", "56", "22", null, null, this);
            obj.set_taborder("73");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_result17", "absolute", "584", "1417", "420", "86", null, null, this);
            obj.set_taborder("74");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static36", "absolute", "20", "1417", "196", "86", null, null, this);
            obj.set_taborder("75");
            obj.set_text("13. filter");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static37", "absolute", "215", "1502", "370", "57", null, null, this);
            obj.set_taborder("76");
            obj.set_text("(array, number, object) ⇒ \r([\"Jan\", \"Feb\", \"Mar\", \"Apr\"], 1, [50, 100])");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static38", "absolute", "215", "1558", "370", "57", null, null, this);
            obj.set_taborder("77");
            obj.set_text("(array, object, object) ⇒ \r\n([\"Jan\",\"Feb\",\"Mar\",\"Apr\"], [50, 100], \"Feb\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("st_result18", "absolute", "584", "1502", "420", "57", null, null, this);
            obj.set_taborder("78");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_result19", "absolute", "584", "1558", "420", "57", null, null, this);
            obj.set_taborder("79");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button18", "absolute", "519", "1520", "56", "22", null, null, this);
            obj.set_taborder("80");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button19", "absolute", "519", "1576", "56", "22", null, null, this);
            obj.set_taborder("81");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static39", "absolute", "20", "1502", "196", "57", null, null, this);
            obj.set_taborder("82");
            obj.set_text("14. insertAt");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static40", "absolute", "20", "1558", "196", "57", null, null, this);
            obj.set_taborder("83");
            obj.set_text("15. insertBefore");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static41", "absolute", "215", "1614", "370", "57", null, null, this);
            obj.set_taborder("84");
            obj.set_text("(array, number) ⇒ \r\n([\"Jan\", \"Feb\", \"Mar\", \"Apr\"], 1)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static42", "absolute", "215", "1670", "370", "57", null, null, this);
            obj.set_taborder("85");
            obj.set_text("(array, object) ⇒ \r\n([\"Jan\", \"Feb\", \"Mar\", \"Apr\"], \"Feb\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("st_result20", "absolute", "584", "1614", "420", "57", null, null, this);
            obj.set_taborder("86");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_result21", "absolute", "584", "1670", "420", "57", null, null, this);
            obj.set_taborder("87");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button20", "absolute", "519", "1632", "56", "22", null, null, this);
            obj.set_taborder("88");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button21", "absolute", "519", "1688", "56", "22", null, null, this);
            obj.set_taborder("89");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static43", "absolute", "20", "1614", "196", "57", null, null, this);
            obj.set_taborder("90");
            obj.set_text("16. removeAt");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static44", "absolute", "20", "1670", "196", "57", null, null, this);
            obj.set_taborder("91");
            obj.set_text("17. remove");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static45", "absolute", "20", "1726", "196", "39", null, null, this);
            obj.set_taborder("92");
            obj.set_text("18. clone");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static46", "absolute", "215", "1726", "370", "39", null, null, this);
            obj.set_taborder("93");
            obj.set_text("(array) ⇒ ([2, 10, 5, 1])");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button22", "absolute", "519", "1735", "56", "22", null, null, this);
            obj.set_taborder("94");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_result22", "absolute", "584", "1726", "420", "39", null, null, this);
            obj.set_taborder("95");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static47", "absolute", "20", "1764", "196", "39", null, null, this);
            obj.set_taborder("96");
            obj.set_text("19. flatten");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static48", "absolute", "215", "1764", "370", "39", null, null, this);
            obj.set_taborder("97");
            obj.set_text("(array) ⇒ (['Jan', [10, 20], ['Feb', [1, 10]]])");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button23", "absolute", "519", "1773", "56", "22", null, null, this);
            obj.set_taborder("98");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_result23", "absolute", "584", "1764", "420", "39", null, null, this);
            obj.set_taborder("99");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static18", "absolute", "20", "1802", "196", "39", null, null, this);
            obj.set_taborder("100");
            obj.set_text("20. max");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static28", "absolute", "215", "1802", "370", "39", null, null, this);
            obj.set_taborder("101");
            obj.set_text("(array) ⇒ ([2, 10, 5, 1])");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button24", "absolute", "519", "1811", "56", "22", null, null, this);
            obj.set_taborder("102");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_result24", "absolute", "584", "1802", "420", "39", null, null, this);
            obj.set_taborder("103");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static51", "absolute", "215", "1840", "370", "39", null, null, this);
            obj.set_taborder("107");
            obj.set_text("(array) ⇒ ([2, 10, 5, 1])");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button25", "absolute", "519", "1849", "56", "22", null, null, this);
            obj.set_taborder("108");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_result25", "absolute", "584", "1840", "420", "39", null, null, this);
            obj.set_taborder("109");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static52", "absolute", "20", "1840", "196", "39", null, null, this);
            obj.set_taborder("110");
            obj.set_text("21. min");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static53", "absolute", "215", "1878", "370", "39", null, null, this);
            obj.set_taborder("111");
            obj.set_text("(array) ⇒ ([2, 10, 5, 1])");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button26", "absolute", "519", "1887", "56", "22", null, null, this);
            obj.set_taborder("112");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_result26", "absolute", "584", "1878", "420", "39", null, null, this);
            obj.set_taborder("113");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static54", "absolute", "20", "1878", "196", "39", null, null, this);
            obj.set_taborder("114");
            obj.set_text("22. sum");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static55", "absolute", "215", "1916", "370", "57", null, null, this);
            obj.set_taborder("115");
            obj.set_text("(array, number, number) ⇒ \r\n([\"Jan\", \"Feb\", \"Mar\", \"Apr\"], 1, 3)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button27", "absolute", "519", "1934", "56", "22", null, null, this);
            obj.set_taborder("116");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_result27", "absolute", "584", "1916", "420", "57", null, null, this);
            obj.set_taborder("117");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static56", "absolute", "215", "1972", "370", "57", null, null, this);
            obj.set_taborder("118");
            obj.set_text("(array, number, number) ⇒ \r\n([\"Jan\", \"Feb\", \"Mar\", \"Apr\"], 1, 3)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button28", "absolute", "519", "1990", "56", "22", null, null, this);
            obj.set_taborder("119");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_result28", "absolute", "584", "1972", "420", "57", null, null, this);
            obj.set_taborder("120");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static57", "absolute", "20", "1916", "196", "57", null, null, this);
            obj.set_taborder("121");
            obj.set_text("23. exchange");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static58", "absolute", "20", "1972", "196", "57", null, null, this);
            obj.set_taborder("122");
            obj.set_text("24. move");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static59", "absolute", "215", "2028", "370", "259", null, null, this);
            obj.set_taborder("123");
            obj.set_text("(array, string, string) ⇒ (users, \"name\",\"id\")\r\nvar users = [];\r\nusers[0] = {id:\"milk\", name:\"park\", age:33};\r\nusers[1] = {id:\"apple\", name:\"kim\"};\r\nusers[2] = {id:\"oops\", name:\"joo\", age:44};\r\nusers[3] = {id:\"beans\", name:\"lee\", age:50};\r\nusers[4] = {id:\"zoo\", age:65};\r\nusers[5] = {id:\"milk\", name:\"\", age:33};\r\nusers[6] = {id:\"milk\", name:\"lee\", age:33};\r\n----------------------------------------------------------\r\nfor(var i=0; i<sorted.length; i++)\r\n{\r\n    var tmp = sorted[i];\r\n    st_result04.text += \"\\\\nname:\" + tmp.name;\r\n    st_result04.text += \" || id:\" + tmp.id;\r\n    st_result04.text += \" || age:\" + tmp.age;\r\n}");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button29", "absolute", "519", "2034", "56", "22", null, null, this);
            obj.set_taborder("124");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_result29", "absolute", "584", "2028", "420", "259", null, null, this);
            obj.set_taborder("125");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static60", "absolute", "20", "2028", "196", "259", null, null, this);
            obj.set_taborder("126");
            obj.set_text("25. sortOn");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static29", "absolute", "215", "2286", "370", "419", null, null, this);
            obj.set_taborder("127");
            obj.set_text("(array, array) ⇒ (arr, [\"ASC\", \"DESC\", \"ASC\"])\r\nvar arr = [['A', 'a', '가'],\r\n\t\t   ['A', 'a', '나'],\r\n\t\t   ['A', 'b', '나'],\r\n\t\t   ['A', 'b', '가'],\r\n\t\t   ['B', 'b', '가'],\r\n\t\t   ['B', 'b', '나'],\r\n\t\t   ['B', 'a', '가'],\r\n\t\t   ['B', 'b', '다'],\r\n\t\t   ['B', 'c', '가'],\r\n\t\t   ['A', 'd', '가'],\r\n\t\t   ['A', 'c', '가'],\r\n\t\t   ['C', 'c', '가'],\r\n\t\t   ['C', 'a', '가'],\r\n\t\t   ['C', 'b', '가']];\t\t\r\n\r\nvar sorted = Base.array.sortTwoDimensional(arr, [\"ASC\", \"DESC\", \"ASC\"]);\r\nvar text = \"\";\r\nfor (var i=0; i<sorted.length; i++)\r\n{\r\n\ttext += arr[i][0] + \" : \" + arr[i][1] + \" : \" + arr[i][2] + \"\\n\";\r\n\ttrace(arr[i][0] + \" : \" + arr[i][1] + \" : \" + arr[i][2]);\r\n}\r\nst_result26.text = text;");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button30", "absolute", "519", "2292", "56", "22", null, null, this);
            obj.set_taborder("128");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_result30", "absolute", "584", "2286", "420", "419", null, null, this);
            obj.set_taborder("129");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static49", "absolute", "20", "2286", "196", "419", null, null, this);
            obj.set_taborder("130");
            obj.set_text("26. sortTwoDimensional");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static50", "absolute", "215", "2704", "370", "219", null, null, this);
            obj.set_taborder("131");
            obj.set_text("var users = [];\r\nusers[0] = {id:\"milk\", name:\"park\", age:33};\r\nusers[1] = {id:\"apple\", name:\"kim\"};\r\nusers[2] = {id:\"oops\", name:\"joo\", age:44};\r\nusers[3] = {id:\"beans\", name:\"lee\", age:50};\r\nusers[4] = {id:\"zoo\", age:65};\r\nusers[5] = {id:\"milk\", name:\"\", age:33};\r\nusers[6] = {id:\"milk\", name:\"lee\", age:33};\r\n\r\nvar index = Eco.array.indexOfProp(users, \"name\", \"lee\");\r\nthis.st_result31.set_text( \"(number) \" + index );\r\ntrace(index);");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button31", "absolute", "519", "2710", "56", "22", null, null, this);
            obj.set_taborder("132");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_result31", "absolute", "584", "2704", "420", "219", null, null, this);
            obj.set_taborder("133");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static61", "absolute", "20", "2704", "196", "219", null, null, this);
            obj.set_taborder("134");
            obj.set_text("27. indexOfProp");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static62", "absolute", "215", "2922", "370", "219", null, null, this);
            obj.set_taborder("135");
            obj.set_text("var users = [];\r\nusers[0] = {id:\"milk\", name:\"park\", age:33};\r\nusers[1] = {id:\"apple\", name:\"kim\"};\r\nusers[2] = {id:\"oops\", name:\"joo\", age:44};\r\nusers[3] = {id:\"beans\", name:\"lee\", age:50};\r\nusers[4] = {id:\"zoo\", age:65};\r\nusers[5] = {id:\"milk\", name:\"\", age:33};\r\nusers[6] = {id:\"milk\", name:\"lee\", age:33};\r\n\r\nvar index = Eco.array.lastIndexOfProp(users, \"name\", \"lee\", 5);\r\nthis.st_result32.set_text( \"(number) \" + index );\r\ntrace(index);");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button32", "absolute", "519", "2928", "56", "22", null, null, this);
            obj.set_taborder("136");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_result32", "absolute", "584", "2922", "420", "219", null, null, this);
            obj.set_taborder("137");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static63", "absolute", "20", "2922", "196", "219", null, null, this);
            obj.set_taborder("138");
            obj.set_text("28. lastIndexOfProp");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static64", "absolute", "215", "3140", "370", "123", null, null, this);
            obj.set_taborder("139");
            obj.set_text("var arr = [2, 10, 5, 1, 7];\r\nvar arr1 = [9, 15, 5, 2];\r\n\r\nvar result = Eco.array.difference(arr , arr1);\r\nthis.st_result33.set_text( \"(array) [\" + result + \"]\" );\r\ntrace(result);");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button33", "absolute", "519", "3146", "56", "22", null, null, this);
            obj.set_taborder("140");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_result33", "absolute", "584", "3140", "420", "123", null, null, this);
            obj.set_taborder("141");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static65", "absolute", "20", "3140", "196", "123", null, null, this);
            obj.set_taborder("142");
            obj.set_text("29. difference");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static66", "absolute", "215", "3262", "370", "151", null, null, this);
            obj.set_taborder("143");
            obj.set_text("\r\nvar copyFrom = [ 'd', 'e', 'c', 'a', 'f', 'f', 'e', 'i', 'n', 'a', 't', 'e', 'd' ];\r\nvar copyTo = new Array(7);\r\n\r\nEco.array.arrayCopy(copyFrom, 2, copyTo, 0, 7);\r\nthis.st_result34.set_text( \"(array) [\" + copyTo + \"]\" );\r\ntrace(copyTo);");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button34", "absolute", "519", "3268", "56", "22", null, null, this);
            obj.set_taborder("144");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_result34", "absolute", "584", "3262", "420", "151", null, null, this);
            obj.set_taborder("145");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static67", "absolute", "20", "3262", "196", "151", null, null, this);
            obj.set_taborder("146");
            obj.set_text("30. arrayCopy");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 1024, 3489, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("array");
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("array.xfdl", function() {
        /*
         * Eco.array api Sample at nexacro
         * 
         *
         * Copyright (c) 2014 EcoSystem of TOBESOFT
         * Licensed Free under nexacro.
        */

        // 1.1 Each api 사용 예제
        this.Button00_onclick = function(obj,e)
        {
        	var mon = ["Jan","Feb","Mar","Apr"];
        	var result = Eco.array.Each(mon, function(name, index) {
        		trace(index + "==>" + name );
        	});
        	
        	this.st_result00.set_text( "(boolean) " + result );
        	trace(result);
        }

        // 1.2 Each api 사용 예제
        this.Button01_onclick = function(obj,e)
        {
        	var mon = ["Jan","Feb","Mar","Apr"];
        	var result = Eco.array.Each(mon, function(name, index) {
        		trace(index + "==>" + name );
        		if (name === 'Mar') 
        		{
        			trace("break here!");
        			return false;
        		}
        	});
        	
        	this.st_result01.set_text( "(number) " + result );
        	trace(result);
        }

        // 2.1 forEach api 사용 예제
        this.Button02_onclick = function(obj,e)
        {
        	 var mon = ["Jan","Feb","Mar","Apr"];
        	 Eco.array.forEach(mon, function(name, index) {
        		if (name === 'Mar') 
        		{
        			trace("don't break here!");
        			return false;
        		}
        		trace(index + "==>" + name );
        	});
        }

        // 3.1 indexOf api 사용 예제
        this.Button03_onclick = function(obj,e)
        {
        	var mon = ["Jan","Feb","Mar","Apr"];
        	var index = Eco.array.indexOf(mon, "Mar");
        	this.st_result03.set_text( "(number) " + index );
        	trace(index);
        }

        // 4.1 lastIndexOf api 사용 예제
        this.Button04_onclick = function(obj,e)
        {
        	var mon = ["Jan","Feb","Mar","Apr"];
        	var index = Eco.array.lastIndexOf(mon, "Mar");
        	this.st_result04.set_text( "(number) " + index );
        	trace(index);
        }

        // 5.1 contains api 사용 예제
        this.Button05_onclick = function(obj,e)
        {
        	var mon = ["Jan","Feb","Mar","Apr"];
        	var result = Eco.array.contains(mon, "Mar");
        	this.st_result05.set_text( "(boolean) " + result );
        	trace(result);
        }

        // 6.1 toArray api 사용 예제
        this.Button06_onclick = function(obj,e)
        {
        	this.fn_mon("Jan","Feb","Mar","Apr");
        }

        // 6.1 toArray api 사용 예제
        this.fn_mon = function() 
        {
        	var result = Eco.array.toArray(arguments);
        	this.st_result06.set_text( "(array) [" + result + "]" );
        	trace(result);
        }

        // 6.2 toArray api 사용 예제
        this.Button07_onclick = function(obj,e)
        {
        	var result = Eco.array.toArray("ABCDEFG",1,3);
        	this.st_result07.set_text( "(array) [" + result + "]" );
        	trace(result);
        }

        // 7.1 map api 사용 예제
        this.Button08_onclick = function(obj,e)
        {
        	var counts = [2, 10, 5, 1];
        	var map = Eco.array.map(counts, function(ele){return ele * 1000;});
        	this.st_result08.set_text( "(array) [" + map + "]" );
        	trace(map);
        }

        // 8.1 every api 사용 예제
        this.Button09_onclick = function(obj,e)
        {
        	var counts = [2, 10, 5, 1];
        	var every = Eco.array.every(counts, function(ele){return (ele > 0);});
        	this.st_result09.set_text( "(boolean) " + every );
        	trace(every);
        }

        // 8.2 every api 사용 예제
        this.Button10_onclick = function(obj,e)
        {
        	var counts = [2, 10, 5, 1];
        	var every = Eco.array.every(counts, function(ele){return (ele < 5);});
        	this.st_result10.set_text( "(boolean) " + every );
        	trace(every);
        }

        // 9.1 some api 사용 예제
        this.Button11_onclick = function(obj,e)
        {
        	var counts = [2, 10, 5, 1];
        	var some = Eco.array.some(counts, function(ele){return (ele > 5);});
        	this.st_result11.set_text( "(boolean) " + some );
        	trace(some);
        }

        // 9.2 some api 사용 예제
        this.Button12_onclick = function(obj,e)
        {
        	var counts = [2, 10, 5, 1];
        	var some = Eco.array.some(counts, function(ele){return (ele > 10);});
        	this.st_result12.set_text( "(boolean) " + some );
        	trace(some);
        }

        // 10.1 equals api 사용 예제
        this.Button13_onclick = function(obj,e)
        {
        	var counts = [2, 10, 5, 1];
        	var equals = Eco.array.equals(counts, [2, 10, 5, 1]);
        	this.st_result13.set_text( "(boolean) " + equals );
        	trace(equals);
        }

        // 10.2 equals api 사용 예제
        this.Button14_onclick = function(obj,e)
        {
        	var counts = [2, 10, 5, 1];
        	var equals = Eco.array.equals(counts, [2, 10, 5]);
        	this.st_result14.set_text( "(boolean) " + equals );
        	trace(equals);
        }

        // 11.1 clean api 사용 예제
        this.Button15_onclick = function(obj,e)
        {
        	var clean = Eco.array.clean(["A", undefined, "B", null, "C", , "D"]);
        	this.st_result15.set_text( "(array) [" + clean + "]" );
        	trace(clean);
        }

        // 12.1 unique api 사용 예제
        this.Button16_onclick = function(obj,e)
        {
        	var unique = Eco.array.unique(["A","B","C","A","A","B"]);
        	this.st_result16.set_text( "(array) [" + unique + "]" );
        	trace(unique);
        }

        // 13.1 filter api 사용 예제
        this.Button17_onclick = function(obj,e)
        {
        	var counts = [2, 10, 5, 1];
        	var filter = Eco.array.filter(counts, function(ele){return (ele > 3);});
        	this.st_result17.set_text( "(array) [" + filter + "]" );
        	trace(filter);
        }

        // 14.1 insertAt api 사용 예제
        this.Button18_onclick = function(obj,e)
        {
        	var mon = ["Jan","Feb","Mar","Apr"];
        	Eco.array.insertAt(mon, 1, [50,100]);
        	this.st_result18.set_text( "(array) [" + mon + "]" );
        	trace(mon);
        }

        // 15.1 insertBefore api 사용 예제
        this.Button19_onclick = function(obj,e)
        {
        	var mon = ["Jan","Feb","Mar","Apr"];
        	Eco.array.insertBefore(mon, [50,100], "Feb");
        	this.st_result19.set_text( "(array) [" + mon + "]" );
        	trace(mon);
        }

        // 16.1 removeAt api 사용 예제
        this.Button20_onclick = function(obj,e)
        {
        	var mon = ["Jan","Feb","Mar","Apr"];
        	Eco.array.removeAt(mon, 1);
        	this.st_result20.set_text( "(array) [" + mon + "]" );
        	trace(mon);
        }

        // 17.1 remove api 사용 예제
        this.Button21_onclick = function(obj,e)
        {
        	var mon = ["Jan","Feb","Mar","Apr"];
        	Eco.array.remove(mon, "Feb");
        	this.st_result21.set_text( "(array) [" + mon + "]" );
        	trace(mon);
        }

        // 18.1 clone api 사용 예제
        this.Button22_onclick = function(obj,e)
        {
        	var counts = [2, 10, 5, 1];
        	var clone = Eco.array.clone(counts);
        	this.st_result22.set_text( "(array) [" + clone + "]" );
        	trace(clone);
        }

        // 18.1 flatten api 사용 예제
        this.Button23_onclick = function(obj,e)
        {
        	var flatten = Eco.array.flatten(['Jan', [10, 20], ['Feb', [1, 10]]]);	
        	this.st_result23.set_text( "(array) [" + flatten + "]" );
        	trace(flatten);
        }

        // 20.1 max api 사용 예제
        this.Button24_onclick = function(obj,e)
        {
        	var counts = [2, 10, 5, 1];
        	var max = Eco.array.max(counts);
        	this.st_result24.set_text( "(number) " + max );
        	trace(max);
        }

        // 21.1 min api 사용 예제
        this.Button25_onclick = function(obj,e)
        {
        	var counts = [2, 10, 5, 1];
        	var min = Eco.array.min(counts);
        	this.st_result25.set_text( "(number) " + min );
        	trace(min);
        }

        // 22.1 sum api 사용 예제
        this.Button26_onclick = function(obj,e)
        {
        	var counts = [2, 10, 5, 1];
        	var sum = Eco.array.sum(counts);
        	this.st_result26.set_text( "(number) " + sum );
        	trace(sum);
        }

        // 23.1 exchange api 사용 예제
        this.Button27_onclick = function(obj,e)
        {
        	var mon = ["Jan","Feb","Mar","Apr"];
        	var exchange = Eco.array.exchange(mon, 1,3);
        	this.st_result27.set_text( "(boolean) " + exchange );
        	trace(exchange);
        }

        // 24.1 move api 사용 예제
        this.Button28_onclick = function(obj,e)
        {
        	var mon = ["Jan","Feb","Mar","Apr"];
        	var move = Eco.array.move(mon, 1,3);
        	this.st_result28.set_text( "(boolean) " + move );
        	trace(move);
        }

        // 25.1 sortOn api 사용 예제
        this.Button29_onclick = function(obj,e)
        {
        	var users = [];
        	users[0] = {id:"milk", name:"park", age:33};
        	users[1] = {id:"apple", name:"kim"};
        	users[2] = {id:"oops", name:"joo", age:44};
        	users[3] = {id:"beans", name:"lee", age:50};
        	users[4] = {id:"zoo", age:65};
        	users[5] = {id:"milk", name:"", age:33};
        	users[6] = {id:"milk", name:"lee", age:33};	
        	//var sorted = Eco.array.sortOn(users, "name");
        	//var sorted = Eco.array.sortOn(users, "age");
        	var sorted = Eco.array.sortOn(users, "name","id");
        	var result = this.st_result29;
        	result.set_text( "(array) [" + sorted + "]\n==>" );
        	
        	var setter = result.getSetter("text");
        	for(var i=0; i<sorted.length; i++)
        	{
        		var tmp = sorted[i];
        		setter.addset("\nname:" + tmp.name);
        		setter.addset(" || id:" + tmp.id);
        		setter.addset(" || age:" + tmp.age);
        	}
        	trace(result.text);
        }

        // 26.1 sortTwoDimensional api 사용 예제
        this.Button30_onclick = function(obj,e)
        {
        	var arr = [['A', 'a', '가'],
        			   ['A', 'a', '나'],
        			   ['A', 'b', '나'],
        			   ['A', 'b', '가'],
        			   ['B', 'b', '가'],
        			   ['B', 'b', '나'],
        			   ['B', 'a', '가'],
        			   ['B', 'b', '다'],
        			   ['B', 'c', '가'],
        			   ['A', 'd', '가'],
        			   ['A', 'c', '가'],
        			   ['C', 'c', '가'],
        			   ['C', 'a', '가'],
        			   ['C', 'b', '가']];		

        	var sorted = Eco.array.sortTwoDimensional(arr, ["ASC", "DESC", "ASC"]);
        	var text = "(array)\n";
        	for (var i=0; i<sorted.length; i++)
        	{
        		text += "[" + arr[i][0] + ", " + arr[i][1] + ", " + arr[i][2] + "]\n";
        	}
        	
        	this.st_result30.set_text(text);
        	trace(text);
        }

        // 27.1 indexOfProp api 사용 예제
        this.Button31_onclick = function(obj,e)
        {
        	var users = [];
        	users[0] = {id:"milk", name:"park", age:33};
        	users[1] = {id:"apple", name:"kim"};
        	users[2] = {id:"oops", name:"joo", age:44};
        	users[3] = {id:"beans", name:"lee", age:50};
        	users[4] = {id:"zoo", age:65};
        	users[5] = {id:"milk", name:"", age:33};
        	users[6] = {id:"milk", name:"lee", age:33};

        	var index = Eco.array.indexOfProp(users, "name", "lee");
        	this.st_result31.set_text( "(number) " + index );
        	trace(index);
        }

        // 28.1 lastIndexOfProp api 사용 예제
        this.Button32_onclick = function(obj,e)
        {
        	var users = [];
        	users[0] = {id:"milk", name:"park", age:33};
        	users[1] = {id:"apple", name:"kim"};
        	users[2] = {id:"oops", name:"joo", age:44};
        	users[3] = {id:"beans", name:"lee", age:50};
        	users[4] = {id:"zoo", age:65};
        	users[5] = {id:"milk", name:"", age:33};
        	users[6] = {id:"milk", name:"lee", age:33};

        	var index = Eco.array.lastIndexOfProp(users, "name", "lee", 5);
        	this.st_result32.set_text( "(number) " + index );
        	trace(index);
        }

        // 29.1 difference api 사용 예제
        this.Button33_onclick = function(obj,e)
        {
        	var arr = [2, 10, 5, 1, 7];
        	var arr1 = [9, 15, 5, 2];

        	var result = Eco.array.difference(arr , arr1);
        	this.st_result33.set_text( "(array) [" + result + "]" );
        	trace(result);
        }

        // 30.1 arrayCopy api 사용 예제
        this.Button34_onclick = function(obj,e)
        {
        	var copyFrom = [ 'd', 'e', 'c', 'a', 'f', 'f', 'e', 'i', 'n', 'a', 't', 'e', 'd' ];
        	var copyTo = new Array(7);

        	// copies an array from the specified source array
        	Eco.array.arrayCopy(copyFrom, 2, copyTo, 0, 7);
        	this.st_result34.set_text( "(array) [" + copyTo + "]" );
        	trace(copyTo);
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
            this.Button08.addEventHandler("onclick", this.Button08_onclick, this);
            this.Button09.addEventHandler("onclick", this.Button09_onclick, this);
            this.Button10.addEventHandler("onclick", this.Button10_onclick, this);
            this.Button11.addEventHandler("onclick", this.Button11_onclick, this);
            this.Button12.addEventHandler("onclick", this.Button12_onclick, this);
            this.Button13.addEventHandler("onclick", this.Button13_onclick, this);
            this.Button14.addEventHandler("onclick", this.Button14_onclick, this);
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
            this.Button25.addEventHandler("onclick", this.Button25_onclick, this);
            this.Button26.addEventHandler("onclick", this.Button26_onclick, this);
            this.Button27.addEventHandler("onclick", this.Button27_onclick, this);
            this.Button28.addEventHandler("onclick", this.Button28_onclick, this);
            this.Button29.addEventHandler("onclick", this.Button29_onclick, this);
            this.Button30.addEventHandler("onclick", this.Button30_onclick, this);
            this.Button31.addEventHandler("onclick", this.Button31_onclick, this);
            this.Button32.addEventHandler("onclick", this.Button32_onclick, this);
            this.Button33.addEventHandler("onclick", this.Button33_onclick, this);
            this.Button34.addEventHandler("onclick", this.Button34_onclick, this);

        };

        this.loadIncludeScript("array.xfdl");

       
    };
}
)();
