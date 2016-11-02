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
                this.set_name("date");
                this.set_classname("date");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,1024,816);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("Static01", "absolute", "20", "39", "212", "79", null, null, this);
            obj.set_taborder("0");
            obj.set_text("1. addDate");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static02", "absolute", "20", "117", "212", "79", null, null, this);
            obj.set_taborder("1");
            obj.set_text("2. addMonth");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static03", "absolute", "20", "195", "212", "79", null, null, this);
            obj.set_taborder("2");
            obj.set_text("3. getDiffDay");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static04", "absolute", "20", "273", "212", "79", null, null, this);
            obj.set_taborder("3");
            obj.set_text("4. getDiffMonth");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static16", "absolute", "20", "351", "212", "79", null, null, this);
            obj.set_taborder("4");
            obj.set_text("5. getLastDayOfMonth");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static17", "absolute", "20", "429", "212", "79", null, null, this);
            obj.set_taborder("5");
            obj.set_text("6. getWeekOfYear");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static19", "absolute", "20", "507", "212", "79", null, null, this);
            obj.set_taborder("6");
            obj.set_text("7. getDayOfYear");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static20", "absolute", "20", "585", "212", "79", null, null, this);
            obj.set_taborder("7");
            obj.set_text("8. strToDate");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static21", "absolute", "231", "351", "370", "40", null, null, this);
            obj.set_taborder("8");
            obj.set_text("(Date) ⇒ (\"20130302\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static22", "absolute", "231", "390", "370", "40", null, null, this);
            obj.set_taborder("9");
            obj.set_text("(string) ⇒ (\"20130302\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static23", "absolute", "231", "429", "370", "40", null, null, this);
            obj.set_taborder("10");
            obj.set_text("(Date) ⇒ (\"20130331\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static24", "absolute", "231", "468", "370", "40", null, null, this);
            obj.set_taborder("11");
            obj.set_text("(string) ⇒ (\"20130331\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static25", "absolute", "231", "507", "370", "40", null, null, this);
            obj.set_taborder("12");
            obj.set_text("(Date) ⇒ (\"20130420\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static26", "absolute", "231", "546", "370", "40", null, null, this);
            obj.set_taborder("13");
            obj.set_text("(string) ⇒ (\"20130420\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static27", "absolute", "231", "585", "370", "40", null, null, this);
            obj.set_taborder("14");
            obj.set_text("(string) ⇒ (\"20120331\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static28", "absolute", "231", "624", "370", "40", null, null, this);
            obj.set_taborder("15");
            obj.set_text("(string) ⇒ (\"20130320123022\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static00", "absolute", "231", "39", "370", "40", null, null, this);
            obj.set_taborder("16");
            obj.set_text("(Date, number) ⇒ ( \"20130331\", 3 )");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static09", "absolute", "231", "78", "370", "40", null, null, this);
            obj.set_taborder("17");
            obj.set_text("(string, number) ⇒ ( \"20130331\", 3 )");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static10", "absolute", "231", "117", "370", "40", null, null, this);
            obj.set_taborder("18");
            obj.set_text("(Date, number) ⇒ ( \"20130331\", 3 )");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static11", "absolute", "231", "156", "370", "40", null, null, this);
            obj.set_taborder("19");
            obj.set_text("(string, number) ⇒ ( \"20130331\", 3 )");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static12", "absolute", "231", "273", "370", "40", null, null, this);
            obj.set_taborder("20");
            obj.set_text("(Date, Date) ⇒ (\"20120331\", \"20130420\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static13", "absolute", "231", "234", "370", "40", null, null, this);
            obj.set_taborder("21");
            obj.set_text("(string, string) ⇒ (\"20120331\", \"20130420\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static14", "absolute", "231", "195", "370", "40", null, null, this);
            obj.set_taborder("22");
            obj.set_text("(Date, Date) ⇒ (\"20120331\", \"20130420\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static15", "absolute", "231", "312", "370", "40", null, null, this);
            obj.set_taborder("23");
            obj.set_text("(string, string) ⇒ (\"20120331\", \"20130420\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button00", "absolute", "535", "48", "56", "22", null, null, this);
            obj.set_taborder("24");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button01", "absolute", "535", "87", "56", "22", null, null, this);
            obj.set_taborder("25");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button02", "absolute", "535", "126", "56", "22", null, null, this);
            obj.set_taborder("26");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button03", "absolute", "535", "165", "56", "22", null, null, this);
            obj.set_taborder("27");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_result01", "absolute", "600", "39", "404", "40", null, null, this);
            obj.set_taborder("28");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_result02", "absolute", "600", "78", "404", "40", null, null, this);
            obj.set_taborder("29");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_2_result01", "absolute", "600", "117", "404", "40", null, null, this);
            obj.set_taborder("30");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_2_result02", "absolute", "600", "156", "404", "40", null, null, this);
            obj.set_taborder("31");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button04", "absolute", "535", "204", "56", "22", null, null, this);
            obj.set_taborder("32");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button05", "absolute", "535", "243", "56", "22", null, null, this);
            obj.set_taborder("33");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result01", "absolute", "600", "195", "404", "40", null, null, this);
            obj.set_taborder("34");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result02", "absolute", "600", "234", "404", "40", null, null, this);
            obj.set_taborder("35");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button06", "absolute", "535", "282", "56", "22", null, null, this);
            obj.set_taborder("36");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button07", "absolute", "535", "321", "56", "22", null, null, this);
            obj.set_taborder("37");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_4_result01", "absolute", "600", "273", "404", "40", null, null, this);
            obj.set_taborder("38");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_4_result02", "absolute", "600", "312", "404", "40", null, null, this);
            obj.set_taborder("39");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_5_result01", "absolute", "600", "351", "404", "40", null, null, this);
            obj.set_taborder("40");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_5_result02", "absolute", "600", "390", "404", "40", null, null, this);
            obj.set_taborder("41");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_6_result01", "absolute", "600", "429", "404", "40", null, null, this);
            obj.set_taborder("42");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_6_result02", "absolute", "600", "468", "404", "40", null, null, this);
            obj.set_taborder("43");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_7_result01", "absolute", "600", "507", "404", "40", null, null, this);
            obj.set_taborder("44");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_7_result02", "absolute", "600", "546", "404", "40", null, null, this);
            obj.set_taborder("45");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_8_result01", "absolute", "600", "585", "404", "40", null, null, this);
            obj.set_taborder("46");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_8_result02", "absolute", "600", "624", "404", "40", null, null, this);
            obj.set_taborder("47");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button08", "absolute", "535", "360", "56", "22", null, null, this);
            obj.set_taborder("48");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button09", "absolute", "535", "399", "56", "22", null, null, this);
            obj.set_taborder("49");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button10", "absolute", "535", "438", "56", "22", null, null, this);
            obj.set_taborder("50");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button11", "absolute", "535", "477", "56", "22", null, null, this);
            obj.set_taborder("51");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button12", "absolute", "535", "515", "56", "22", null, null, this);
            obj.set_taborder("52");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button13", "absolute", "535", "555", "56", "22", null, null, this);
            obj.set_taborder("53");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button14", "absolute", "535", "594", "56", "22", null, null, this);
            obj.set_taborder("54");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button15", "absolute", "535", "632", "56", "22", null, null, this);
            obj.set_taborder("55");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static06", "absolute", "231", "0", "370", "40", null, null, this);
            obj.set_taborder("56");
            obj.set_text("Arguments:  ( Type ) ⇒ ( Value )");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static07", "absolute", "20", "0", "212", "40", null, null, this);
            obj.set_taborder("57");
            obj.set_text("Method");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static08", "absolute", "600", "0", "404", "40", null, null, this);
            obj.set_taborder("58");
            obj.set_text("Result: (Type) Vaule");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static05", "absolute", "20", "663", "212", "79", null, null, this);
            obj.set_taborder("60");
            obj.set_text("9. isLeapYear");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static18", "absolute", "20", "741", "212", "79", null, null, this);
            obj.set_taborder("61");
            obj.set_text("10. solarToLunar");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static29", "absolute", "20", "819", "212", "79", null, null, this);
            obj.set_taborder("62");
            obj.set_text("11. lunarToSolar");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static30", "absolute", "20", "897", "212", "79", null, null, this);
            obj.set_taborder("63");
            obj.set_text("12. getFirstDate");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static31", "absolute", "20", "975", "212", "79", null, null, this);
            obj.set_taborder("64");
            obj.set_text("13. getDiffTime");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static32", "absolute", "20", "1053", "212", "248", null, null, this);
            obj.set_taborder("65");
            obj.set_text("14. getMaskFormatString");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static33", "absolute", "231", "975", "370", "40", null, null, this);
            obj.set_taborder("66");
            obj.set_text("(Date, Date) \r\n⇒ (\"20130302113022\", \"20130305145032\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static34", "absolute", "231", "1014", "370", "40", null, null, this);
            obj.set_taborder("67");
            obj.set_text("(string, string)\r\n⇒ (\"20130302113022\", \"20130305145032\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static35", "absolute", "231", "1053", "370", "56", null, null, this);
            obj.set_taborder("68");
            obj.set_text("(Date, string) ⇒ \r\n(\"20130430123412\", \"yyyy-MM-dd W \\\\Week\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static36", "absolute", "231", "1108", "370", "40", null, null, this);
            obj.set_taborder("69");
            obj.set_text("(Date, string) ⇒ \r\n(\"20130430123412\", \"yyyy-MM-dd\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static37", "absolute", "231", "1147", "370", "40", null, null, this);
            obj.set_taborder("70");
            obj.set_text("(Date, string) ⇒ \r\n(\"20130430123412\", \"yy MM.dd\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static38", "absolute", "231", "1186", "370", "76", null, null, this);
            obj.set_taborder("71");
            obj.set_text("(Date, string) ⇒ \r\n(\"20130430123412\", \"yyyy년 MM월 dd일 tt hh시 mm분 ss초\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static39", "absolute", "231", "1261", "370", "40", null, null, this);
            obj.set_taborder("72");
            obj.set_text("(Date, string) ⇒ \r\n(\"20130430123412\", \"MMMM dddd\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static40", "absolute", "231", "663", "370", "40", null, null, this);
            obj.set_taborder("73");
            obj.set_text("(number) ⇒ (2013)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static41", "absolute", "231", "702", "370", "40", null, null, this);
            obj.set_taborder("74");
            obj.set_text("(string) ⇒ (\"20120301\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static42", "absolute", "231", "741", "370", "40", null, null, this);
            obj.set_taborder("75");
            obj.set_text("(Date) ⇒ (\"20130331\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static43", "absolute", "231", "780", "370", "40", null, null, this);
            obj.set_taborder("76");
            obj.set_text("(string) ⇒ (\"20130331\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static44", "absolute", "231", "897", "370", "40", null, null, this);
            obj.set_taborder("77");
            obj.set_text("(Date) ⇒ (\"20120331\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static45", "absolute", "231", "858", "370", "40", null, null, this);
            obj.set_taborder("78");
            obj.set_text("(string, boolean) ⇒ (\"20120331\", false)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static46", "absolute", "231", "819", "370", "40", null, null, this);
            obj.set_taborder("79");
            obj.set_text("(Date, boolean) ⇒ (\"20120331\", false)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static47", "absolute", "231", "936", "370", "40", null, null, this);
            obj.set_taborder("80");
            obj.set_text("(string) ⇒ (\"20120331\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button26", "absolute", "535", "1057", "56", "22", null, null, this);
            obj.set_taborder("81");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button27", "absolute", "535", "1117", "56", "22", null, null, this);
            obj.set_taborder("82");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button28", "absolute", "535", "1156", "56", "22", null, null, this);
            obj.set_taborder("83");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button29", "absolute", "535", "1190", "56", "22", null, null, this);
            obj.set_taborder("84");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button30", "absolute", "535", "1270", "56", "22", null, null, this);
            obj.set_taborder("85");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button16", "absolute", "535", "672", "56", "22", null, null, this);
            obj.set_taborder("86");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button17", "absolute", "535", "711", "56", "22", null, null, this);
            obj.set_taborder("87");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button18", "absolute", "535", "750", "56", "22", null, null, this);
            obj.set_taborder("88");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button19", "absolute", "535", "789", "56", "22", null, null, this);
            obj.set_taborder("89");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_9_result01", "absolute", "600", "663", "404", "40", null, null, this);
            obj.set_taborder("90");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_9_result02", "absolute", "600", "702", "404", "40", null, null, this);
            obj.set_taborder("91");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_10_result01", "absolute", "600", "741", "404", "40", null, null, this);
            obj.set_taborder("92");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_10_result02", "absolute", "600", "780", "404", "40", null, null, this);
            obj.set_taborder("93");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button20", "absolute", "535", "828", "56", "22", null, null, this);
            obj.set_taborder("94");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button21", "absolute", "535", "867", "56", "22", null, null, this);
            obj.set_taborder("95");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_11_result01", "absolute", "600", "819", "404", "40", null, null, this);
            obj.set_taborder("96");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_11_result02", "absolute", "600", "858", "404", "40", null, null, this);
            obj.set_taborder("97");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button22", "absolute", "535", "906", "56", "22", null, null, this);
            obj.set_taborder("98");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button23", "absolute", "535", "945", "56", "22", null, null, this);
            obj.set_taborder("99");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_12_result01", "absolute", "600", "897", "404", "40", null, null, this);
            obj.set_taborder("100");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_12_result02", "absolute", "600", "936", "404", "40", null, null, this);
            obj.set_taborder("101");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button24", "absolute", "535", "984", "56", "22", null, null, this);
            obj.set_taborder("102");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button25", "absolute", "535", "1023", "56", "22", null, null, this);
            obj.set_taborder("103");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_13_result01", "absolute", "600", "975", "404", "40", null, null, this);
            obj.set_taborder("104");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_13_result02", "absolute", "600", "1014", "404", "40", null, null, this);
            obj.set_taborder("105");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_14_result01", "absolute", "600", "1053", "404", "56", null, null, this);
            obj.set_taborder("106");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_14_result02", "absolute", "600", "1108", "404", "40", null, null, this);
            obj.set_taborder("107");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_14_result03", "absolute", "600", "1147", "404", "40", null, null, this);
            obj.set_taborder("108");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_14_result04", "absolute", "600", "1186", "404", "76", null, null, this);
            obj.set_taborder("109");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_14_result05", "absolute", "600", "1261", "404", "40", null, null, this);
            obj.set_taborder("110");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static48", "absolute", "20", "1333", "212", "72", null, null, this);
            obj.set_taborder("111");
            obj.set_text("15. getToday");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Button("Button31", "absolute", "535", "1358", "56", "22", null, null, this);
            obj.set_taborder("112");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static49", "absolute", "607", "1349", "298", "40", null, null, this);
            obj.set_taborder("113");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 1024, 816, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("date");
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("date.xfdl", function() {
        /*
         * Eco.date api Sample at nexacro
         * 
         *
         * Copyright (c) 2014 EcoSystem of TOBESOFT
         * Licensed Free under nexacro.
        */

        // 1.1 addDate  api 사용 예제
        this.Button00_onclick = function(obj,e)
        {
        	var dt = Eco.date.strToDate("20130331");
        	var dt0 = Eco.date.addDate(dt, 3);
        	this.st_1_result01.set_text( "(Date) " + dt0.toString() );
        	trace(dt0);
        }
        // 1.2 addDate  api 사용 예제
        this.Button01_onclick = function(obj,e)
        {
        	var val = "20130331";
        	var str = Eco.date.addDate(val, 3);
        	this.st_1_result02.set_text( "(string) " + str );
        	trace(str);
        }

        // 2.1 addMonth  api 사용 예제
        this.Button02_onclick = function(obj,e)
        {
        	var dt = Eco.date.strToDate("20130331");
        	var dt0 = Eco.date.addMonth(dt, 1);
        	this.st_2_result01.set_text( "(Date) " + dt0.toString() );
        	trace(dt0);
        }

        // 2.2 addMonth  api 사용 예제
        this.Button03_onclick = function(obj,e)
        {
        	var str1 = "20130331";
        	var str = Eco.date.addMonth(str1, 1);
        	this.st_2_result02.set_text( "(string) " + str );
        	trace(str);
        }

        // 3.1 getDiffDay  api 사용 예제
        this.Button04_onclick = function(obj,e)
        {
        	var fromdt = Eco.date.strToDate("20120331");
        	var todt = Eco.date.strToDate("20130420");
        	var day = Eco.date.getDiffDay(fromdt, todt);
        	this.st_3_result01.set_text( "(number) " + day );
        	trace(day);
        }

        // 3.2 getDiffDay  api 사용 예제
        this.Button05_onclick = function(obj,e)
        {
        	var fromstr = "20120331";
        	var tostr = "20130420";
        	var day = Eco.date.getDiffDay(fromstr, tostr);
        	this.st_3_result02.set_text( "(number) " + day );
        	trace(day);
        }

        // 4.1 getDiffMonth  api 사용 예제
        this.Button06_onclick = function(obj,e)
        {
        	var fromdt = Eco.date.strToDate("20120331");
        	var todt = Eco.date.strToDate("20130420");
        	//var fromdt = Eco.date.strToDate("20130301");
        	//var todt = Eco.date.strToDate("20130601");
        	//var fromdt = Eco.date.strToDate("20130301");
        	//var todt = Eco.date.strToDate("20130501");
        	//var month = Math.ceil(Eco.date.getDiffMonth(fromdt, todt));
        	var month = Eco.date.getDiffMonth(fromdt, todt);
        	this.st_4_result01.set_text( "(number) " + month );
        	trace(month);
        }

        // 4.2 getDiffMonth  api 사용 예제
        this.Button07_onclick = function(obj,e)
        {
        	var fromstr = "20120331";
        	var tostr = "20130420";
        	var month = Eco.date.getDiffMonth(fromstr, tostr);
        	this.st_4_result02.set_text( "(number) " + month );
        	trace(month);
        }

        // 5.1 getLastDayOfMonth  api 사용 예제
        this.Button08_onclick = function(obj,e)
        {
        	var dt = Eco.date.strToDate("20120302");
        	var day = Eco.date.getLastDayOfMonth(dt);
        	this.st_5_result01.set_text( "(number) " + day );
        	trace(day);
        }

        // 5.2 getLastDayOfMonth  api 사용 예제
        this.Button09_onclick = function(obj,e)
        {
        	var dtstr = "20120302";
        	var day = Eco.date.getLastDayOfMonth(dtstr);
        	this.st_5_result02.set_text( "(number) " + day );
        	trace(day);
        }

        // 6.1 getWeekOfYear  api 사용 예제
        this.Button10_onclick = function(obj,e)
        {
        	var dt = Eco.date.strToDate("20130331");
        	var week = Eco.date.getWeekOfYear(dt);
        	this.st_6_result01.set_text( "(number) " + week );
        	trace(week);
        }

        // 6.2 getWeekOfYear  api 사용 예제
        this.Button11_onclick = function(obj,e)
        {
        	var dtstr = "20130331";
        	var week = Eco.date.getWeekOfYear(dtstr);
        	this.st_6_result02.set_text( "(number) " + week );
        	trace(week);	
        }

        // 7.1 getDayOfYear  api 사용 예제
        this.Button12_onclick = function(obj,e)
        {
        	var dt = Eco.date.strToDate("20130420");
        	var days = Eco.date.getDayOfYear(dt);
        	this.st_7_result01.set_text( "(number) " + days );
        	trace(days);
        }

        // 7.2 getDayOfYear  api 사용 예제
        this.Button13_onclick = function(obj,e)
        {
        	var dtstr = "20130420";
        	var days = Eco.date.getDayOfYear(dtstr);
        	this.st_7_result02.set_text( "(number) " + days );
        	trace(days);	
        }

        // 8.1 strToDate  api 사용 예제
        this.Button14_onclick = function(obj,e)
        {
        	var dt = Eco.date.strToDate("20120331");
        	this.st_8_result01.set_text( "(Date) " + dt );
        	trace(dt);
        }

        // 8.2 strToDate  api 사용 예제
        this.Button15_onclick = function(obj,e)
        {
        	var dt = Eco.date.strToDate("20130320123022");
        	this.st_8_result02.set_text( "(Date) " + dt );
        	trace(dt);
        }

        // 9.1 isLeapYear api 사용 예제
        this.Button16_onclick = function(obj,e)
        {
        	var yyyy = 2014;
        	var flag = Eco.date.isLeapYear(yyyy);
        	this.st_9_result01.set_text( "(boolean) " + flag );
        	trace(flag);
        }

        // 9.2 isLeapYear  api 사용 예제
        this.Button17_onclick = function(obj,e)
        {
        	var ymd = "20140301";
        	var flag = Eco.date.isLeapYear(ymd);
        	this.st_9_result02.set_text( "(boolean) " + flag);
        	trace(flag);
        }

        // 10.1 solarToLunar  api 사용 예제
        this.Button18_onclick = function(obj,e)
        {
        	var dt = Eco.date.strToDate("20140331");
        	var str = Eco.date.solarToLunar(dt);
        	this.st_10_result01.set_text( "(string) " + str );
        	trace(str);
        }

        // 10.2 solarToLunar  api 사용 예제
        this.Button19_onclick = function(obj,e)
        {
        	var str1 = "20140331";
        	var str = Eco.date.solarToLunar(str1);
        	this.st_10_result02.set_text( "(string) " + str );
        	trace(str);
        }

        // 11.1 lunarToSolar  api 사용 예제
        this.Button20_onclick = function(obj,e)
        {
        	var dt = Eco.date.strToDate("20140331");
        	var str = Eco.date.lunarToSolar(dt, false);
        	this.st_11_result01.set_text( "(string) " + str );
        	trace(str);
        }

        // 11.2 lunarToSolar  api 사용 예제
        this.Button21_onclick = function(obj,e)
        {
        	var str1 = "20140331";
        	var str = Eco.date.lunarToSolar(str1, false);
        	this.st_11_result02.set_text( "(string) " + str );
        	trace(str);
        }

        // 12.1 getFirstDate  api 사용 예제
        this.Button22_onclick = function(obj,e)
        {
        	var dt = Eco.date.strToDate("20140331");
        	var dt1 = Eco.date.getFirstDate(dt);
        	this.st_12_result01.set_text( "(Date) " + dt1 );
        	trace(dt1);
        }

        // 12.2 getFirstDate  api 사용 예제
        this.Button23_onclick = function(obj,e)
        {
        	var str1 = "20140331";
        	var str = Eco.date.getFirstDate(str1);
        	this.st_12_result02.set_text( "(string) " + str );
        	trace(str);
        }

        // 13.1 getDiffTime  api 사용 예제
        this.Button24_onclick = function(obj,e)
        {
        	var dt0 = Eco.date.strToDate("20140302113022");
        	var dt1 = Eco.date.strToDate("20140305145032");
        	var etime = Eco.date.getDiffTime(dt0, dt1);
        	this.st_13_result01.set_text( "(array - [일,시,분,초]) " + etime );
        	trace(etime);
        }

        // 13.2 getDiffTime  api 사용 예제
        this.Button25_onclick = function(obj,e)
        {
        	var str0 = "20140302113022";
        	var str1 = "20140305145032";
        	var etime = Eco.date.getDiffTime(str0, str1);
        	this.st_13_result02.set_text( "(array - [일,시,분,초]) " + etime );
        	trace(etime);	
        }

        // 14.1 getMaskFormatString  api 사용 예제
        this.Button26_onclick = function(obj,e)
        {
        	var dt = Eco.date.strToDate("20140430123412");
        	var str = Eco.date.getMaskFormatString(dt, "yyyy-MM-dd W \\Week");
        	this.st_14_result01.set_text( "(string) " + str );
        	trace(str);	
        }

        // 14.2 getMaskFormatString  api 사용 예제
        this.Button27_onclick = function(obj,e)
        {
        	var dt = Eco.date.strToDate("20140430123412");
        	var str = Eco.date.getMaskFormatString(dt, "yyyy-MM-dd");
        	this.st_14_result02.set_text( "(string) " + str );
        	trace(str);	
        }

        // 14.3 getMaskFormatString  api 사용 예제
        this.Button28_onclick = function(obj,e)
        {
        	var dt = Eco.date.strToDate("20140430123412");
        	var str = Eco.date.getMaskFormatString(dt, "yy MM.dd");
        	this.st_14_result03.set_text( "(string) " + str );
        	trace(str);	
        }

        // 14.4 getMaskFormatString  api 사용 예제
        this.Button29_onclick = function(obj,e)
        {
        	var dt = Eco.date.strToDate("20130430123412");
        	var str = Eco.date.getMaskFormatString(dt, "yyyy년 MM월 dd일 tt hh시 mm분 ss초");
        	this.st_14_result04.set_text( "(string) " + str );
        	trace(str);
        }

        // 14.5 getMaskFormatString  api 사용 예제
        this.Button30_onclick = function(obj,e)
        {
        	var dt = Eco.date.strToDate("20130430123412");
        	var str = Eco.date.getMaskFormatString(dt, "MMMM dddd");
        	this.st_14_result05.set_text( "(string) " + str );
        	trace(str);
        }

        this.Button31_onclick = function(obj,e)
        {
        	var str = Eco.date.getToday();
        	this.Static49.set_text( "(string) " + str );
        	trace(str);
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
            this.Button26.addEventHandler("onclick", this.Button26_onclick, this);
            this.Button27.addEventHandler("onclick", this.Button27_onclick, this);
            this.Button28.addEventHandler("onclick", this.Button28_onclick, this);
            this.Button29.addEventHandler("onclick", this.Button29_onclick, this);
            this.Button30.addEventHandler("onclick", this.Button30_onclick, this);
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
            this.Button31.addEventHandler("onclick", this.Button31_onclick, this);

        };

        this.loadIncludeScript("date.xfdl");

       
    };
}
)();
