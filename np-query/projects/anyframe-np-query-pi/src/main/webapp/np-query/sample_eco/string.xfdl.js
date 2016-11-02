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
                this.set_name("string");
                this.set_classname("string");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,1024,1997);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("Static01", "absolute", "20", "39", "244", "79", null, null, this);
            obj.set_taborder("0");
            obj.set_text("1. indexOfIgnoreCase");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static02", "absolute", "20", "117", "244", "40", null, null, this);
            obj.set_taborder("1");
            obj.set_text("2. replaceIgnoreCase");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static03", "absolute", "20", "156", "244", "79", null, null, this);
            obj.set_taborder("2");
            obj.set_text("3. lastIndexOfIgnoreCase");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static04", "absolute", "20", "234", "244", "83", null, null, this);
            obj.set_taborder("3");
            obj.set_text("4. getRightStr");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static16", "absolute", "20", "316", "244", "127", null, null, this);
            obj.set_taborder("4");
            obj.set_text("5. removeStr");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static17", "absolute", "20", "442", "244", "216", null, null, this);
            obj.set_taborder("5");
            obj.set_text("6. format");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static19", "absolute", "20", "657", "244", "118", null, null, this);
            obj.set_taborder("6");
            obj.set_text("7. getLength");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static21", "absolute", "263", "316", "370", "40", null, null, this);
            obj.set_taborder("7");
            obj.set_text("(string, string) ⇒ \r\n(\"www.domain.com\", \"www.\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static22", "absolute", "263", "355", "370", "88", null, null, this);
            obj.set_taborder("8");
            obj.set_text("(string, stirng, string) ⇒\r\n(\"www.tobesoft.com, www.tobesoft.co.kr\", \".com\", \"right\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static23", "absolute", "263", "487", "370", "40", null, null, this);
            obj.set_taborder("9");
            obj.set_text("(string, string, string, string) ⇒\r\n (\"I {0} a {1} {2}.\", \"am\", \"cool\", \"guy\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static24", "absolute", "263", "526", "370", "132", null, null, this);
            obj.set_taborder("10");
            obj.set_text("(string, string, string, string) ⇒ \r\n(\"Currency: [{0}], Date : [{1}], JuminNo: [{2}]\", Base.number.getMaskFormatString(12301234, \"#,###\"), Base.date.getMaskFormatString(new Date(), \"yyyy-MM-dd tt hh:mm\"), \r\nBase.string.getMaskFormatString(\"6601011234567\", \"@@@@@@-{@@@@@@@}\"))");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static25", "absolute", "263", "657", "370", "40", null, null, this);
            obj.set_taborder("11");
            obj.set_text("(string) ⇒ (\"unit 문자열\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static26", "absolute", "263", "696", "370", "40", null, null, this);
            obj.set_taborder("12");
            obj.set_text("(string) ⇒ (\"unit 문자열\", \"ascii\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static27", "absolute", "263", "735", "370", "40", null, null, this);
            obj.set_taborder("13");
            obj.set_text("(string) ⇒ (\"unit 문자열\", \"utf8\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static00", "absolute", "263", "39", "370", "40", null, null, this);
            obj.set_taborder("14");
            obj.set_text("(string, string) ⇒ ( \"DCABCABAABAAB\", \"ab\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static09", "absolute", "263", "78", "370", "40", null, null, this);
            obj.set_taborder("15");
            obj.set_text("(string, string, number) ⇒\r\n( \"DCABCABAABAAB\", \"ab\", 3)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static10", "absolute", "263", "117", "370", "40", null, null, this);
            obj.set_taborder("16");
            obj.set_text("(string, string, string) ⇒\r\n( \"DCABCABAABAAB\", \"ab\", \"x\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static12", "absolute", "263", "234", "370", "83", null, null, this);
            obj.set_taborder("17");
            obj.set_text("(string, number) ⇒ \r\n(\"myT1 and myT2 are the strings used for padding\",\r\n 7)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static13", "absolute", "263", "195", "370", "40", null, null, this);
            obj.set_taborder("18");
            obj.set_text("(string, string, number) ⇒ \r\n(\"CABCDABCDABCD\", \"abc\", 8)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static14", "absolute", "263", "156", "370", "40", null, null, this);
            obj.set_taborder("19");
            obj.set_text("(string, string) ⇒ (\"CABCDABCDABCD\", \"abc\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button00", "absolute", "567", "48", "56", "22", null, null, this);
            obj.set_taborder("20");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button01", "absolute", "567", "87", "56", "22", null, null, this);
            obj.set_taborder("21");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button02", "absolute", "567", "126", "56", "22", null, null, this);
            obj.set_taborder("22");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_result01", "absolute", "632", "39", "372", "40", null, null, this);
            obj.set_taborder("23");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_result02", "absolute", "632", "78", "372", "40", null, null, this);
            obj.set_taborder("24");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_2_result01", "absolute", "632", "117", "372", "40", null, null, this);
            obj.set_taborder("25");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button03", "absolute", "567", "165", "56", "22", null, null, this);
            obj.set_taborder("26");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button04", "absolute", "567", "204", "56", "22", null, null, this);
            obj.set_taborder("27");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result01", "absolute", "632", "156", "372", "40", null, null, this);
            obj.set_taborder("28");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result02", "absolute", "632", "195", "372", "40", null, null, this);
            obj.set_taborder("29");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button05", "absolute", "568", "242", "56", "22", null, null, this);
            obj.set_taborder("30");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_4_result01", "absolute", "632", "234", "372", "83", null, null, this);
            obj.set_taborder("31");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_5_result01", "absolute", "632", "316", "372", "40", null, null, this);
            obj.set_taborder("32");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_5_result02", "absolute", "632", "355", "372", "88", null, null, this);
            obj.set_taborder("33");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_6_result01", "absolute", "632", "487", "372", "40", null, null, this);
            obj.set_taborder("34");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_6_result02", "absolute", "632", "526", "372", "132", null, null, this);
            obj.set_taborder("35");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_7_result01", "absolute", "632", "657", "372", "40", null, null, this);
            obj.set_taborder("36");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_7_result02", "absolute", "632", "696", "372", "40", null, null, this);
            obj.set_taborder("37");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_7_result03", "absolute", "632", "735", "372", "40", null, null, this);
            obj.set_taborder("38");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button06", "absolute", "567", "325", "56", "22", null, null, this);
            obj.set_taborder("39");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button07", "absolute", "567", "364", "56", "22", null, null, this);
            obj.set_taborder("40");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button09", "absolute", "567", "496", "56", "22", null, null, this);
            obj.set_taborder("41");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button10", "absolute", "567", "531", "56", "22", null, null, this);
            obj.set_taborder("42");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button11", "absolute", "567", "665", "56", "22", null, null, this);
            obj.set_taborder("43");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button12", "absolute", "567", "705", "56", "22", null, null, this);
            obj.set_taborder("44");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button13", "absolute", "567", "744", "56", "22", null, null, this);
            obj.set_taborder("45");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static06", "absolute", "263", "0", "370", "40", null, null, this);
            obj.set_taborder("46");
            obj.set_text("Arguments:  ( Type ) ⇒ ( Value )");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static07", "absolute", "20", "0", "244", "40", null, null, this);
            obj.set_taborder("47");
            obj.set_text("Method");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static08", "absolute", "632", "0", "372", "40", null, null, this);
            obj.set_taborder("48");
            obj.set_text("Result: (Type) Vaule");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static05", "absolute", "263", "442", "370", "46", null, null, this);
            obj.set_taborder("49");
            obj.set_text("(string, stirng, string, boolean) ⇒ (\"www.tobesoft.COM, www.tobesoft.co.kr\", \".com\", \"right\", false)");
            obj.set_cssclass("WFDA_sta_Box");
            obj.style.set_align("left top");
            this.addChild(obj.name, obj);

            obj = new Static("st_5_result03", "absolute", "632", "442", "372", "46", null, null, this);
            obj.set_taborder("50");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button08", "absolute", "567", "460", "56", "22", null, null, this);
            obj.set_taborder("51");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static11", "absolute", "20", "774", "244", "40", null, null, this);
            obj.set_taborder("53");
            obj.set_text("8. countNonword");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static15", "absolute", "20", "813", "244", "40", null, null, this);
            obj.set_taborder("54");
            obj.set_text("9. strFullToHalf");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static18", "absolute", "20", "852", "244", "40", null, null, this);
            obj.set_taborder("55");
            obj.set_text("10. strHalfToFull");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static20", "absolute", "20", "891", "244", "41", null, null, this);
            obj.set_taborder("56");
            obj.set_text("11. repeatStr");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static28", "absolute", "20", "931", "244", "40", null, null, this);
            obj.set_taborder("57");
            obj.set_text("12. hanGulToUnicode");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static29", "absolute", "20", "970", "244", "72", null, null, this);
            obj.set_taborder("58");
            obj.set_text("13. unicodeToHanGul");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static30", "absolute", "20", "1041", "244", "79", null, null, this);
            obj.set_taborder("59");
            obj.set_text("14.\r\nreplaceInvalidFileNameChars");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static31", "absolute", "263", "931", "370", "40", null, null, this);
            obj.set_taborder("60");
            obj.set_text("(string) ⇒ (\"www.투비소프트.com\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static32", "absolute", "263", "970", "370", "72", null, null, this);
            obj.set_taborder("61");
            obj.set_text("(string) ⇒\r\n (\"www.\\\\uD22C\\\\uBE44\\uC18C\\\\uD504\\\\uD2B8.com\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static33", "absolute", "263", "1041", "370", "40", null, null, this);
            obj.set_taborder("62");
            obj.set_text("(string) ⇒ (\"test:uploadfile.php\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static34", "absolute", "263", "1080", "370", "40", null, null, this);
            obj.set_taborder("63");
            obj.set_text("(string) ⇒ (\"test-uploadfile.php\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static35", "absolute", "263", "1119", "370", "40", null, null, this);
            obj.set_taborder("64");
            obj.set_text("(string) ⇒ (\"unit문자열s五ご\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static36", "absolute", "263", "774", "370", "40", null, null, this);
            obj.set_taborder("65");
            obj.set_text("(string) ⇒ (\"2011-12-27\\\\r\\\\n\\\\t~`\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static37", "absolute", "263", "813", "370", "40", null, null, this);
            obj.set_taborder("66");
            obj.set_text("(string) ⇒\r\n(\"０１＋ｗｏｒｌｄ투비소프트\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static38", "absolute", "263", "891", "370", "41", null, null, this);
            obj.set_taborder("67");
            obj.set_text("(string, number) ⇒ (\"0\", 4)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static39", "absolute", "263", "852", "370", "40", null, null, this);
            obj.set_taborder("68");
            obj.set_text("(string) ⇒ (\"01+world투비소프트\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button14", "absolute", "567", "783", "56", "22", null, null, this);
            obj.set_taborder("69");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button15", "absolute", "567", "822", "56", "22", null, null, this);
            obj.set_taborder("70");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_8_result01", "absolute", "632", "774", "372", "40", null, null, this);
            obj.set_taborder("71");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_9_result01", "absolute", "632", "813", "372", "40", null, null, this);
            obj.set_taborder("72");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button16", "absolute", "567", "861", "56", "22", null, null, this);
            obj.set_taborder("73");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_10_result01", "absolute", "632", "852", "372", "40", null, null, this);
            obj.set_taborder("74");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button17", "absolute", "568", "900", "56", "22", null, null, this);
            obj.set_taborder("75");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_11_result01", "absolute", "632", "891", "372", "41", null, null, this);
            obj.set_taborder("76");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_12_result01", "absolute", "632", "931", "372", "40", null, null, this);
            obj.set_taborder("77");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_13_result01", "absolute", "632", "970", "372", "72", null, null, this);
            obj.set_taborder("78");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_14_result01", "absolute", "632", "1041", "372", "40", null, null, this);
            obj.set_taborder("79");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_14_result02", "absolute", "632", "1080", "372", "40", null, null, this);
            obj.set_taborder("80");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_15_result01", "absolute", "632", "1119", "372", "40", null, null, this);
            obj.set_taborder("81");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button18", "absolute", "567", "940", "56", "22", null, null, this);
            obj.set_taborder("82");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button19", "absolute", "567", "979", "56", "22", null, null, this);
            obj.set_taborder("83");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button20", "absolute", "567", "1049", "56", "22", null, null, this);
            obj.set_taborder("84");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button21", "absolute", "567", "1089", "56", "22", null, null, this);
            obj.set_taborder("85");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button22", "absolute", "567", "1128", "56", "22", null, null, this);
            obj.set_taborder("86");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static40", "absolute", "20", "1119", "244", "40", null, null, this);
            obj.set_taborder("87");
            obj.set_text("15. removeMultibyteChar");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static41", "absolute", "20", "1158", "244", "79", null, null, this);
            obj.set_taborder("88");
            obj.set_text("16. startsWith");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static42", "absolute", "263", "1158", "370", "40", null, null, this);
            obj.set_taborder("89");
            obj.set_text("(string, string) ⇒ (\"Hello World!\", \"He\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static43", "absolute", "263", "1197", "370", "40", null, null, this);
            obj.set_taborder("90");
            obj.set_text("(string, string) ⇒ (\"Hello World!\", \"hew\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("st_16_result01", "absolute", "632", "1158", "372", "40", null, null, this);
            obj.set_taborder("91");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_16_result02", "absolute", "632", "1197", "372", "40", null, null, this);
            obj.set_taborder("92");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button23", "absolute", "567", "1166", "56", "22", null, null, this);
            obj.set_taborder("93");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button24", "absolute", "567", "1206", "56", "22", null, null, this);
            obj.set_taborder("94");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static44", "absolute", "20", "1236", "244", "79", null, null, this);
            obj.set_taborder("95");
            obj.set_text("17. endsWith");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static45", "absolute", "263", "1236", "370", "40", null, null, this);
            obj.set_taborder("96");
            obj.set_text("(string, string) ⇒ (\"Hello World!\", \"ld!\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static46", "absolute", "263", "1275", "370", "40", null, null, this);
            obj.set_taborder("97");
            obj.set_text("(string, string) ⇒ (\"Hello World!\", \"Wor\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("st_17_result01", "absolute", "632", "1236", "372", "40", null, null, this);
            obj.set_taborder("98");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_17_result02", "absolute", "632", "1275", "372", "40", null, null, this);
            obj.set_taborder("99");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button25", "absolute", "567", "1244", "56", "22", null, null, this);
            obj.set_taborder("100");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button26", "absolute", "567", "1284", "56", "22", null, null, this);
            obj.set_taborder("101");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static47", "absolute", "20", "1314", "244", "79", null, null, this);
            obj.set_taborder("102");
            obj.set_text("18. unicodeToDecimal");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static48", "absolute", "263", "1314", "370", "79", null, null, this);
            obj.set_taborder("103");
            obj.set_text("(string) ⇒ ");
            obj.set_cssclass("WFDA_sta_Box");
            obj.style.set_align("left top");
            obj.style.set_font("Consolas,8,antialias");
            this.addChild(obj.name, obj);

            obj = new Static("Static49", "absolute", "263", "1392", "370", "79", null, null, this);
            obj.set_taborder("104");
            obj.set_text("(string) ⇒ ");
            obj.set_cssclass("WFDA_sta_Box");
            obj.style.set_align("left top");
            this.addChild(obj.name, obj);

            obj = new Static("st_18_result01", "absolute", "632", "1314", "372", "79", null, null, this);
            obj.set_taborder("105");
            obj.set_cssclass("WFDA_sta_BoxR");
            obj.style.set_padding("0 0 4 14");
            obj.style.set_align("left top");
            obj.style.set_font("굴림체,11,bold antialias");
            this.addChild(obj.name, obj);

            obj = new Static("st_19_result01", "absolute", "632", "1392", "372", "79", null, null, this);
            obj.set_taborder("106");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button27", "absolute", "567", "1322", "56", "22", null, null, this);
            obj.set_taborder("107");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button28", "absolute", "567", "1408", "56", "22", null, null, this);
            obj.set_taborder("108");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new TextArea("txt_18_result01", "absolute", "637", "1319", "361", "68", null, null, this);
            obj.set_taborder("109");
            obj.set_wordwrap("true");
            obj.style.set_font("굴림체,11,bold antialias");
            this.addChild(obj.name, obj);

            obj = new TextArea("txt_19_result01", "absolute", "637", "1398", "361", "68", null, null, this);
            obj.set_taborder("110");
            obj.set_wordwrap("true");
            obj.set_lengthunit("utf8");
            obj.style.set_font("굴림체,11,bold antialias");
            this.addChild(obj.name, obj);

            obj = new Static("Static50", "absolute", "20", "1470", "244", "79", null, null, this);
            obj.set_taborder("111");
            obj.set_text("19. decimalToUnicode");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new TextArea("txt_18_result00", "absolute", "272", "1335", "287", "52", null, null, this);
            obj.set_taborder("112");
            obj.set_value("HTML, nexacro form 로딩\r\nLoading, Update 등을 전체 Page 변경 없이 처리\r\nMVC FrameWork와 연동 가능한 API 제공\r\nDrag & Drop 지원\r\nTOOL : Common wizard and dialogs\r\n개인화 모듈 가능");
            obj.set_wordwrap("true");
            obj.set_readonly("true");
            obj.style.set_font("Consolas,8,antialias");
            this.addChild(obj.name, obj);

            obj = new TextArea("txt_18_result02", "absolute", "272", "1415", "287", "52", null, null, this);
            obj.set_taborder("113");
            obj.set_value("&#72;&#84;&#77;&#76;&#44;&#32;&#88;&#80;&#76;&#65;&#84;&#70;&#79;&#82;&#77;&#32;&#102;&#111;&#114;&#109;&#32;&#47196;&#46377;&#13;&#10;&#76;&#111;&#97;&#100;&#105;&#110;&#103;&#44;&#32;&#85;&#112;&#100;&#97;&#116;&#101;&#32;&#46321;&#51012;&#32;&#51204;&#52404;&#32;&#80;&#97;&#103;&#101;&#32;&#48320;&#44221;&#32;&#50630;&#51060;&#32;&#52376;&#47532;&#13;&#10;&#77;&#86;&#67;&#32;&#70;&#114;&#97;&#109;&#101;&#87;&#111;&#114;&#107;&#50752;&#32;&#50672;&#46041;&#32;&#44032;&#45733;&#54620;&#32;&#65;&#80;&#73;&#32;&#51228;&#44277;&#13;&#10;&#68;&#114;&#97;&#103;&#32;&#38;&#32;&#68;&#114;&#111;&#112;&#32;&#51648;&#50896;&#13;&#10;&#84;&#79;&#79;&#76;&#32;&#58;&#32;&#67;&#111;&#109;&#109;&#111;&#110;&#32;&#119;&#105;&#122;&#97;&#114;&#100;&#32;&#97;&#110;&#100;&#32;&#100;&#105;&#97;&#108;&#111;&#103;&#115;&#13;&#10;&#44060;&#51064;&#54868;&#32;&#47784;&#46280;&#32;&#44032;&#45733;");
            obj.set_wordwrap("true");
            obj.set_readonly("true");
            obj.style.set_font("Consolas,8,antialias");
            this.addChild(obj.name, obj);

            obj = new Static("Static51", "absolute", "20", "1816", "244", "79", null, null, this);
            obj.set_taborder("114");
            obj.set_text("24. getMaskFormatString");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static52", "absolute", "263", "1816", "370", "40", null, null, this);
            obj.set_taborder("115");
            obj.set_text("(string, string) ⇒\r\n(\"20060607\", \"@@@@-@@-@@\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static53", "absolute", "263", "1855", "370", "40", null, null, this);
            obj.set_taborder("116");
            obj.set_text("(string, string) ⇒ \r\n(\"6601011234567\", \"######-{#######}\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("st_24_result01", "absolute", "632", "1816", "372", "40", null, null, this);
            obj.set_taborder("117");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_24_result02", "absolute", "632", "1855", "372", "40", null, null, this);
            obj.set_taborder("118");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button33", "absolute", "567", "1824", "56", "22", null, null, this);
            obj.set_taborder("119");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button34", "absolute", "567", "1864", "56", "22", null, null, this);
            obj.set_taborder("120");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static54", "absolute", "20", "1626", "244", "94", null, null, this);
            obj.set_taborder("121");
            obj.set_text("22. unicodeToUtf8");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static55", "absolute", "263", "1624", "370", "98", null, null, this);
            obj.set_taborder("122");
            obj.set_text("(string) ⇒ ");
            obj.set_cssclass("WFDA_sta_Box");
            obj.style.set_align("left top");
            this.addChild(obj.name, obj);

            obj = new Static("st_22_result01", "absolute", "632", "1626", "372", "96", null, null, this);
            obj.set_taborder("123");
            obj.set_text("0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f");
            obj.set_cssclass("WFDA_sta_BoxR");
            obj.style.set_padding("4 0 4 14");
            obj.style.set_align("left top");
            obj.style.set_font("bold antialias 9 굴림체");
            this.addChild(obj.name, obj);

            obj = new Button("Button31", "absolute", "567", "1640", "56", "22", null, null, this);
            obj.set_taborder("124");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new TextArea("txt_22_result01", "absolute", "635", "1647", "361", "71", null, null, this);
            obj.set_taborder("125");
            obj.set_wordwrap("true");
            obj.style.set_font("bold antialias 9 굴림체");
            this.addChild(obj.name, obj);

            obj = new Static("Static56", "absolute", "20", "1392", "244", "79", null, null, this);
            obj.set_taborder("126");
            obj.set_text("20. unicodeToHex");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static57", "absolute", "263", "1470", "370", "79", null, null, this);
            obj.set_taborder("127");
            obj.set_text("(string) ⇒ ");
            obj.set_cssclass("WFDA_sta_Box");
            obj.style.set_align("left top");
            obj.style.set_font("Consolas,8,antialias");
            this.addChild(obj.name, obj);

            obj = new Static("Static58", "absolute", "263", "1548", "370", "79", null, null, this);
            obj.set_taborder("128");
            obj.set_text("(string) ⇒ ");
            obj.set_cssclass("WFDA_sta_Box");
            obj.style.set_align("left top");
            this.addChild(obj.name, obj);

            obj = new Static("st_20_result01", "absolute", "632", "1470", "372", "79", null, null, this);
            obj.set_taborder("129");
            obj.set_cssclass("WFDA_sta_BoxR");
            obj.style.set_padding("0 0 4 14");
            obj.style.set_align("left top");
            obj.style.set_font("굴림체,11,bold antialias");
            this.addChild(obj.name, obj);

            obj = new Static("st_21_result01", "absolute", "632", "1548", "372", "79", null, null, this);
            obj.set_taborder("130");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button29", "absolute", "567", "1492", "56", "22", null, null, this);
            obj.set_taborder("131");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button30", "absolute", "567", "1572", "56", "22", null, null, this);
            obj.set_taborder("132");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new TextArea("txt_20_result01", "absolute", "637", "1475", "361", "68", null, null, this);
            obj.set_taborder("133");
            obj.set_wordwrap("true");
            obj.style.set_font("굴림체,11,bold antialias");
            this.addChild(obj.name, obj);

            obj = new TextArea("txt_21_result01", "absolute", "637", "1554", "361", "68", null, null, this);
            obj.set_taborder("134");
            obj.set_wordwrap("true");
            obj.style.set_font("굴림체,11,bold antialias");
            this.addChild(obj.name, obj);

            obj = new Static("Static59", "absolute", "20", "1548", "244", "79", null, null, this);
            obj.set_taborder("135");
            obj.set_text("21. hexToUnicode");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new TextArea("txt_18_result03", "absolute", "272", "1491", "287", "52", null, null, this);
            obj.set_taborder("136");
            obj.set_value("HTML, nexacro form 로딩\r\nLoading, Update 등을 전체 Page 변경 없이 처리\r\nMVC FrameWork와 연동 가능한 API 제공\r\nDrag & Drop 지원\r\nTOOL : Common wizard and dialogs\r\n개인화 모듈 가능");
            obj.set_wordwrap("true");
            obj.set_readonly("true");
            obj.style.set_font("Consolas,8,antialias");
            this.addChild(obj.name, obj);

            obj = new TextArea("txt_18_result04", "absolute", "272", "1571", "287", "52", null, null, this);
            obj.set_taborder("137");
            obj.set_value("&#x48;&#x54;&#x4D;&#x4C;&#x2C;&#x20;&#x6E;&#x65;&#x78;&#x61;&#x63;&#x72;&#x6F;&#x20;&#x66;&#x6F;&#x72;&#x6D;&#x20;&#xB85C;&#xB529;&#xD;&#xA;&#x4C;&#x6F;&#x61;&#x64;&#x69;&#x6E;&#x67;&#x2C;&#x20;&#x55;&#x70;&#x64;&#x61;&#x74;&#x65;&#x20;&#xB4F1;&#xC744;&#x20;&#xC804;&#xCCB4;&#x20;&#x50;&#x61;&#x67;&#x65;&#x20;&#xBCC0;&#xACBD;&#x20;&#xC5C6;&#xC774;&#x20;&#xCC98;&#xB9AC;&#xD;&#xA;&#x4D;&#x56;&#x43;&#x20;&#x46;&#x72;&#x61;&#x6D;&#x65;&#x57;&#x6F;&#x72;&#x6B;&#xC640;&#x20;&#xC5F0;&#xB3D9;&#x20;&#xAC00;&#xB2A5;&#xD55C;&#x20;&#x41;&#x50;&#x49;&#x20;&#xC81C;&#xACF5;&#xD;&#xA;&#x44;&#x72;&#x61;&#x67;&#x20;&#x26;&#x20;&#x44;&#x72;&#x6F;&#x70;&#x20;&#xC9C0;&#xC6D0;&#xD;&#xA;&#x54;&#x4F;&#x4F;&#x4C;&#x20;&#x3A;&#x20;&#x43;&#x6F;&#x6D;&#x6D;&#x6F;&#x6E;&#x20;&#x77;&#x69;&#x7A;&#x61;&#x72;&#x64;&#x20;&#x61;&#x6E;&#x64;&#x20;&#x64;&#x69;&#x61;&#x6C;&#x6F;&#x67;&#x73;&#xD;&#xA;&#xAC1C;&#xC778;&#xD654;&#x20;&#xBAA8;&#xB4C8;&#x20;&#xAC00;&#xB2A5;");
            obj.set_wordwrap("true");
            obj.set_readonly("true");
            obj.style.set_font("Consolas,8,antialias");
            this.addChild(obj.name, obj);

            obj = new TextArea("txt_18_result05", "absolute", "272", "1639", "287", "79", null, null, this);
            obj.set_taborder("138");
            obj.set_value("HTML, nexacro form 로딩\r\nLoading, Update 등을 전체 Page 변경 없이 처리\r\nMVC FrameWork와 연동 가능한 API 제공\r\nDrag & Drop 지원\r\nTOOL : Common wizard and dialogs\r\n개인화 모듈 가능");
            obj.set_wordwrap("true");
            obj.set_readonly("true");
            obj.style.set_font("Consolas,8,antialias");
            this.addChild(obj.name, obj);

            obj = new Static("Static60", "absolute", "20", "1719", "244", "98", null, null, this);
            obj.set_taborder("139");
            obj.set_text("23. utf8ToUnicode");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static61", "absolute", "263", "1719", "370", "98", null, null, this);
            obj.set_taborder("140");
            obj.set_text("(string) ⇒ ");
            obj.set_cssclass("WFDA_sta_Box");
            obj.style.set_align("left top");
            this.addChild(obj.name, obj);

            obj = new Static("st_23_result01", "absolute", "632", "1721", "372", "96", null, null, this);
            obj.set_taborder("141");
            obj.set_cssclass("WFDA_sta_BoxR");
            obj.style.set_padding("0 0 4 14");
            obj.style.set_align("left top");
            obj.style.set_font("굴림체,11,bold antialias");
            this.addChild(obj.name, obj);

            obj = new Button("Button32", "absolute", "567", "1735", "56", "22", null, null, this);
            obj.set_taborder("142");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new TextArea("txt_23_result01", "absolute", "635", "1725", "361", "88", null, null, this);
            obj.set_taborder("143");
            obj.set_wordwrap("true");
            obj.style.set_font("굴림체,11,bold antialias");
            this.addChild(obj.name, obj);

            obj = new TextArea("txt_18_result06", "absolute", "272", "1734", "287", "79", null, null, this);
            obj.set_taborder("144");
            obj.set_value("48 54 4D 4C 2C 20 6E 65 78 61 63 72 6F 20 66 6F 72 6D 20 EB A1 9C EB 94 A9 0D 0A 4C 6F 61 64 69 6E 67 2C 20 55 70 64 61 74 65 20 EB 93 B1 EC 9D 84 20 EC A0 84 EC B2 B4 20 50 61 67 65 20 EB B3 80 EA B2 BD 20 EC 97 86 EC 9D B4 20 EC B2 98 EB A6 AC 0D 0A 4D 56 43 20 46 72 61 6D 65 57 6F 72 6B EC 99 80 20 EC 97 B0 EB 8F 99 20 EA B0 80 EB 8A A5 ED 95 9C 20 41 50 49 20 EC A0 9C EA B3 B5 0D 0A 44 72 61 67 20 26 20 44 72 6F 70 20 EC A7 80 EC 9B 90 0D 0A 54 4F 4F 4C 20 3A 20 43 6F 6D 6D 6F 6E 20 77 69 7A 61 72 64 20 61 6E 64 20 64 69 61 6C 6F 67 73 0D 0A EA B0 9C EC 9D B8 ED 99 94 20 EB AA A8 EB 93 88 20 EA B0 80 EB 8A A5 ");
            obj.set_wordwrap("true");
            obj.set_readonly("true");
            obj.style.set_font("Consolas,8,antialias");
            this.addChild(obj.name, obj);

            obj = new Static("Static62", "absolute", "20", "1894", "244", "79", null, null, this);
            obj.set_taborder("145");
            obj.set_text("25. escapeXML");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static63", "absolute", "263", "1894", "370", "40", null, null, this);
            obj.set_taborder("146");
            obj.set_text("(string) ⇒ (\"1 > 0\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("st_25_result01", "absolute", "632", "1894", "372", "40", null, null, this);
            obj.set_taborder("147");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_25_result02", "absolute", "632", "1933", "372", "40", null, null, this);
            obj.set_taborder("148");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static64", "absolute", "263", "1933", "370", "40", null, null, this);
            obj.set_taborder("149");
            obj.set_text("(string) ⇒ (\"Q&A\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button35", "absolute", "567", "1904", "56", "22", null, null, this);
            obj.set_taborder("150");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button36", "absolute", "567", "1944", "56", "22", null, null, this);
            obj.set_taborder("151");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 1024, 1997, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("string");
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("string.xfdl", function() {
        /*
         * Eco.string api Sample at nexacro
         * 
         * Copyright (c) 2014 EcoSystem of TOBESOFT
         * Licensed Free under nexacro.
        */

        // 1.1 indexOfIgnoreCase api 사용 예제
        this.Button00_onclick = function(obj,e)
        {
        	var str = "DCABCABAABAAB",
        		findStr = "ab";
        	var idx = Eco.string.indexOfIgnoreCase(str, findStr);
        	this.st_1_result01.set_text( "(number) " + idx );
        	trace(idx);
        }

        // 1.2 indexOfIgnoreCase api 사용 예제
        this.Button01_onclick = function(obj,e)
        {
        	var str = "DCABCABAABAAB",
        		findStr = "ab";
        	var idx = Eco.string.indexOfIgnoreCase(str, findStr, 3);
        	this.st_1_result02.set_text( "(number) " + idx );
        	trace(idx);
        }

        // 2.1 replaceIgnoreCase api 사용 예제
        this.Button02_onclick = function(obj,e)
        {
        	var str = "DCABCABAABAAB",
        		findStr = "ab";
        	var str = Eco.string.replaceIgnoreCase(str, findStr, "x");
        	this.st_2_result01.set_text( "(string) " + str );
        	trace(str);
        }

        // 3.1 lastIndexOfIgnoreCase api 사용 예제
        this.Button03_onclick = function(obj,e)
        {
        	var str = "CABCDABCDABCD",
        		findStr = "abc";
        	var idx = Eco.string.lastIndexOfIgnoreCase(str, findStr);
        	this.st_3_result01.set_text( "(number) " + idx );
        	trace(idx);
        }

        // 3.2 lastIndexOfIgnoreCase api 사용 예제
        this.Button04_onclick = function(obj,e)
        {
        	var str = "CABCDABCDABCD",
        		findStr = "abc";
        	var idx = Eco.string.lastIndexOfIgnoreCase(str, findStr, 8);
        	this.st_3_result02.set_text( "(number) " + idx );
        	trace(idx);
        }

        // 4.1 getRightStr api 사용 예제
        this.Button05_onclick = function(obj,e)
        {
        	var str = "myT1 and myT2 are the strings used for padding";
        	var result = Eco.string.getRightStr(str, 7);
        	this.st_4_result01.set_text( "(string) " + result );
        	trace(result);
        }

        // 5.1 removeStr api 사용 예제
        this.Button06_onclick = function(obj,e)
        {
        	var str = "www.domain.com";
        	var result = Eco.string.removeStr(str, "www.");
        	this.st_5_result01.set_text( "(string) " + result );
        	trace(result);
        }

        // 5.2 removeStr api 사용 예제
        this.Button07_onclick = function(obj,e)
        {
        	var str = "www.tobesoft.com, www.tobesoft.co.kr";
        	var result = Eco.string.removeStr(str, ".com", "right");
        	this.st_5_result02.set_text( "(string) " + result );
        	trace(result);
        }

        // 5.3 removeStr api 사용 예제
        this.Button08_onclick = function(obj,e)
        {
        	var str = "www.tobesoft.Com, www.tobesoft.co.kr";
        	var result = Eco.string.removeStr(str, ".com", "right", false);
        	this.st_5_result03.set_text( "(string) " + result );
        	trace(result);	
        }

        // 6.1 format api 사용 예제
        this.Button09_onclick = function(obj,e)
        {
        	var str = "I {0} a {1} {2}.";
        	var result = Eco.string.format(str, "am", "cool", "guy");
        	this.st_6_result01.set_text( "(string) " + result );
        	trace(result);
        }

        // 6.2 format api 사용 예제
        this.Button10_onclick = function(obj,e)
        {
        	var str = "Currency: [{0}], Date : [{1}], JuminNo: [{2}]";
        	var result = Eco.string.format(str,
        				Eco.number.getMaskFormatString(12301234, "#,###"),
        				Eco.date.getMaskFormatString(new Date(), "yyyy-MM-dd tt hh:mm"),
        				Eco.string.getMaskFormatString("6601011234567", "@@@@@@-{@@@@@@@}")
        				);
        	this.st_6_result02.set_text( "(string) " + result );
        	trace(result);	
        }

        // 7.1 getLength api 사용 예제
        this.Button11_onclick = function(obj,e)
        {
        	var str = "unit 문자열";
        	var len = Eco.string.getLength(str); //"utf16"
        	this.st_7_result01.set_text( "(number) " + len );
        	trace(len);
        }

        // 7.2 getLength api 사용 예제
        this.Button12_onclick = function(obj,e)
        {
        	var str = "unit 문자열";
        	var len = Eco.string.getLength(str, "ascii");
        	this.st_7_result02.set_text( "(number) " + len );
        	trace(len);
        }

        // 7.3 getLength api 사용 예제
        this.Button13_onclick = function(obj,e)
        {
        	var str = "unit 문자열";
        	var len = Eco.string.getLength(str, "utf8");
        	this.st_7_result03.set_text( "(number) " + len );
        	trace(len);
        }

        // 8.1 countNonword api 사용 예제
        this.Button14_onclick = function(obj,e)
        {
        	var str = "2011-12-27\r\n\t~`";
        	var len = Eco.string.countNonword(str, str);
        	this.st_8_result01.set_text( "(number) " + len );
        	trace(len);
        }

        // 9.1 strFullToHalf api 사용 예제
        this.Button15_onclick = function(obj,e)
        {
        	var str = "０１＋ｗｏｒｌｄ투비소프트";
        	var result = Eco.string.strFullToHalf(str);
        	this.st_9_result01.set_text( "(string) " + result );
        	trace(result);
        }

        // 10.1 strHalfToFull api 사용 예제
        this.Button16_onclick = function(obj,e)
        {
        	var str = "01+world투비소프트";
        	var result = Eco.string.strHalfToFull(str);
        	this.st_10_result01.set_text( "(string) " + result );
        	trace(result);
        }

        // 11.1 repeatStr api 사용 예제
        this.Button17_onclick = function(obj,e)
        {
        	var str = "0";
        	var result = Eco.string.repeatStr(str, 4);
        	this.st_11_result01.set_text( "(string) " + result );
        	trace(result);
        }

        // 12.1 hanGulToUnicode api 사용 예제
        this.Button18_onclick = function(obj,e)
        {
        	var str = "www.투비소프트.com";
        	var result = Eco.string.hanGulToUnicode(str);
        	this.st_12_result01.set_text( "(string) " + result );
        	trace(result);
        }

        // 13.1 unicodeToHanGul api 사용 예제
        this.Button19_onclick = function(obj,e)
        {
        	var str = "www.\uD22C\uBE44\uC18C\uD504\uD2B8.com";
        	var result = Eco.string.unicodeToHanGul(str);
        	this.st_13_result01.set_text( "(string) " + result );
        	trace(result);
        }

        // 14.1 replaceInvalidFileNameChars api 사용 예제
        this.Button20_onclick = function(obj,e)
        {
        	var str = "test:uploadfile.php";
        	var result = Eco.string.replaceInvalidFileNameChars(str);
        	this.st_14_result01.set_text( "(string) " + result );
        	trace(result);
        }

        // 14.2 replaceInvalidFileNameChars api 사용 예제
        this.Button21_onclick = function(obj,e)
        {
        	var str = "test-uploadfile.php";
        	var result = Eco.string.replaceInvalidFileNameChars(str);
        	this.st_14_result02.set_text( "(string) " + result );
        	trace(result);
        }

        // 15.1 removeMultibyteChar api 사용 예제
        this.Button22_onclick = function(obj,e)
        {
        	var str = "unit문자열s五ご";
        	var result = Eco.string.removeMultibyteChar(str);
        	this.st_15_result01.set_text( "(string) " + result );
        	trace(result);
        }

        // 16.1 startsWith api 사용 예제
        this.Button23_onclick = function(obj,e)
        {
        	var str = "Hello World!";
        	var result = Eco.string.startsWith(str, "He");
        	this.st_16_result01.set_text( "(boolean) " + result );
        	trace(result);
        }

        // 16.2 startsWith api 사용 예제
        this.Button24_onclick = function(obj,e)
        {
        	var str = "Hello World!";
        	var result = Eco.string.startsWith(str, "hew");
        	this.st_16_result02.set_text( "(boolean) " + result );
        	trace(result);
        }

        // 17.1 endsWith api 사용 예제
        this.Button25_onclick = function(obj,e)
        {
        	var str = "Hello World!";
        	var result = Eco.string.endsWith(str, "ld!");
        	this.st_17_result01.set_text( "(boolean) " + result );
        	trace(result);
        }

        // 17.2 endsWith api 사용 예제
        this.Button26_onclick = function(obj,e)
        {
        	var str = "Hello World!";
        	var result = Eco.string.endsWith(str, "Wor");
        	this.st_17_result02.set_text( "(boolean) " + result );
        	trace(result);
        }

        // 18.1 unicodeToDecimal api 사용 예제
        this.Button27_onclick = function(obj,e)
        {
        	var str = "HTML, nexacro form 로딩\r\n";

        	str += "Loading, Update 등을 전체 Page 변경 없이 처리\r\n";
        	str += "MVC FrameWork와 연동 가능한 API 제공\r\n";
        	str += "Drag & Drop 지원\r\n";
        	str += "TOOL : Common wizard and dialogs\r\n";
        	str += "개인화 모듈 가능";

        // 	str = "연"; //#50672;
        // 	str = "동"; //#46041;
        // 	str = "연동"; //#46041;
        	var result = Eco.string.unicodeToDecimal(str);
        	this.txt_18_result01.set_value( result );
        	trace(result);
        	//this.st_17_result02.set_text( result );
        }

        // 19.1 decimalToUnicode api 사용 예제
        this.Button28_onclick = function(obj,e)
        {
        	var str = "&#72;&#84;&#77;&#76;&#44;&#32;&#110;&#101;&#120;&#97;&#99;&#114;&#111;&#32;";
        	
        	str += "&#102;&#111;&#114;&#109;&#32;&#47196;&#46377;&#13;&#10;&#76;&#111;&#97;&#100;&#105;";
        	str += "&#110;&#103;&#44;&#32;&#85;&#112;&#100;&#97;&#116;&#101;&#32;&#46321;&#51012;&#32;";
        	str += "&#51204;&#52404;&#32;&#80;&#97;&#103;&#101;&#32;&#48320;&#44221;&#32;&#50630;&#51060;";
        	str += "&#32;&#52376;&#47532;&#13;&#10;&#77;&#86;&#67;&#32;&#70;&#114;&#97;&#109;&#101;&#87;";
        	str += "&#111;&#114;&#107;&#50752;&#32;&#50672;&#46041;&#32;&#44032;&#45733;&#54620;&#32;";
        	str += "&#65;&#80;&#73;&#32;&#51228;&#44277;&#13;&#10;&#68;&#114;&#97;&#103;&#32;&#38;&#32;";
        	str += "&#68;&#114;&#111;&#112;&#32;&#51648;&#50896;&#13;&#10;&#84;&#79;&#79;&#76;&#32;&#58;";
        	str += "&#32;&#67;&#111;&#109;&#109;&#111;&#110;&#32;&#119;&#105;&#122;&#97;&#114;&#100;&#32;";
        	str += "&#97;&#110;&#100;&#32;&#100;&#105;&#97;&#108;&#111;&#103;&#115;&#13;&#10;&#44060;&#51064;";
        	str += "&#54868;&#32;&#47784;&#46280;&#32;&#44032;&#45733;";
        	
        	//str = "&#50672;&#46041;";
        	var result = Eco.string.decimalToUnicode(str);
        	this.txt_19_result01.set_value( result );
        // 	this.st_17_result02.set_text( result );
        // 	this.Button08.set_text( result );
        	trace(result);
        }

        // 20.1 unicodeToHex api 사용 예제
        this.Button29_onclick = function(obj,e)
        {
        	var str = "HTML, nexacro form 로딩\r\n";

        	str += "Loading, Update 등을 전체 Page 변경 없이 처리\r\n";
        	str += "MVC FrameWork와 연동 가능한 API 제공\r\n";
        	str += "Drag & Drop 지원\r\n";
        	str += "TOOL : Common wizard and dialogs\r\n";
        	str += "개인화 모듈 가능";

        	var result = Eco.string.unicodeToHex(str);
        	this.txt_20_result01.set_value( result );
        	trace(result);
        }

        // 21.1 hexToUnicode api 사용 예제
        this.Button30_onclick = function(obj,e)
        {
        	var str = "&#x48;&#x54;&#x4D;&#x4C;&#x2C;&#x20;&#x6E;&#x65;&#x78;&#x61;&#x63;&#x72;&#x6F;";

        	str += "&#x20;&#x66;&#x6F;&#x72;&#x6D;&#x20;&#xB85C;&#xB529;&#xD;&#xA;&#x4C;&#x6F;&#x61;";
        	str += "&#x64;&#x69;&#x6E;&#x67;&#x2C;&#x20;&#x55;&#x70;&#x64;&#x61;&#x74;&#x65;&#x20;&#xB4F1;";
        	str += "&#xC744;&#x20;&#xC804;&#xCCB4;&#x20;&#x50;&#x61;&#x67;&#x65;&#x20;&#xBCC0;&#xACBD;&#x20;";
        	str += "&#xC5C6;&#xC774;&#x20;&#xCC98;&#xB9AC;&#xD;&#xA;&#x4D;&#x56;&#x43;&#x20;&#x46;&#x72;&#x61;";
        	str += "&#x6D;&#x65;&#x57;&#x6F;&#x72;&#x6B;&#xC640;&#x20;&#xC5F0;&#xB3D9;&#x20;&#xAC00;&#xB2A5;&#xD55C;";
        	str += "&#x20;&#x41;&#x50;&#x49;&#x20;&#xC81C;&#xACF5;&#xD;&#xA;&#x44;&#x72;&#x61;&#x67;&#x20;&#x26;&#x20;";
        	str += "&#x44;&#x72;&#x6F;&#x70;&#x20;&#xC9C0;&#xC6D0;&#xD;&#xA;&#x54;&#x4F;&#x4F;&#x4C;&#x20;&#x3A;&#x20;";
        	str += "&#x43;&#x6F;&#x6D;&#x6D;&#x6F;&#x6E;&#x20;&#x77;&#x69;&#x7A;&#x61;&#x72;&#x64;&#x20;&#x61;&#x6E;&#x64;";
        	str += "&#x20;&#x64;&#x69;&#x61;&#x6C;&#x6F;&#x67;&#x73;&#xD;&#xA;&#xAC1C;&#xC778;&#xD654;&#x20;&#xBAA8;";
        	str += "&#xB4C8;&#x20;&#xAC00;&#xB2A5;";

        	var result = Eco.string.hexToUnicode(str);
        	this.txt_21_result01.set_value( result );
        	trace(result);
        }

        // 22.1 unicodeToUtf8 api 사용 예제
        this.Button31_onclick = function(obj,e)
        {
        	var str = "HTML, nexacro form 로딩\r\n";

        	str += "Loading, Update 등을 전체 Page 변경 없이 처리\r\n";
        	str += "MVC FrameWork와 연동 가능한 API 제공\r\n";
        	str += "Drag & Drop 지원\r\n";
        	str += "TOOL : Common wizard and dialogs\r\n";
        	str += "개인화 모듈 가능";

        	var result = Eco.string.unicodeToUtf8(str);
        	this.txt_22_result01.set_value( result );
        	trace(result);
        }

        // 23.1 utf8ToUnicode api 사용 예제
        this.Button32_onclick = function(obj,e)
        {
        	var str = "48 54 4D 4C 2C 20 6E 65 78 61 63 72 6F 20 66 6F 72 6D 20 ";

        	str += "EB A1 9C EB 94 A9 0D 0A 4C 6F 61 64 69 6E 67 2C 20 55 70 64 61 74 65 20 ";
        	str += "EB 93 B1 EC 9D 84 20 EC A0 84 EC B2 B4 20 50 61 67 65 20 EB B3 80 EA B2 ";
        	str += "BD 20 EC 97 86 EC 9D B4 20 EC B2 98 EB A6 AC 0D 0A 4D 56 43 20 46 72 61 ";
        	str += "6D 65 57 6F 72 6B EC 99 80 20 EC 97 B0 EB 8F 99 20 EA B0 80 EB 8A A5 ED ";
        	str += "95 9C 20 41 50 49 20 EC A0 9C EA B3 B5 0D 0A 44 72 61 67 20 26 20 44 72 ";
        	str += "6F 70 20 EC A7 80 EC 9B 90 0D 0A 54 4F 4F 4C 20 3A 20 43 6F 6D 6D 6F 6E ";
        	str += "20 77 69 7A 61 72 64 20 61 6E 64 20 64 69 61 6C 6F 67 73 0D 0A EA B0 9C ";
        	str += "EC 9D B8 ED 99 94 20 EB AA A8 EB 93 88 20 EA B0 80 EB 8A A5 ";

        	var result = Eco.string.utf8ToUnicode(str);
        	this.txt_23_result01.set_value( result );
        	trace(result);
        }

        // 24.1 getMaskFormatString api 사용 예제
        this.Button33_onclick = function(obj,e)
        {
        	var str = "20060607";
        	var result = Eco.string.getMaskFormatString(str, "@@@@-@@-@@");
        	this.st_24_result01.set_text( "(string) " + result );
        	trace(result);
        }

        // 24.2 getMaskFormatString api 사용 예제
        this.Button34_onclick = function(obj,e)
        {
        	var str = "6601011234567";
        	var result = Eco.string.getMaskFormatString(str, "######-{#######}");
        	this.st_24_result02.set_text( "(string) " + result );
        	trace(result);
        }

        // 25.1 escapeXML api 사용 예제 
        this.Button35_onclick = function(obj,e)
        {
        	var str = "1 > 0";
        	var result = Eco.string.escapeXML(str);
        	this.st_25_result01.set_text( "(string) " + result );
        	trace(result);	
        }

        // 25.2 escapeXML api 사용 예제
        this.Button36_onclick = function(obj,e)
        {
        	var str = "Q&A";
        	var result = Eco.string.escapeXML(str);
        	this.st_25_result02.set_text( "(string) " + result );
        	trace(result);	
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.Static24.addEventHandler("onclick", this.Static24_onclick, this);
            this.Button00.addEventHandler("onclick", this.Button00_onclick, this);
            this.Button01.addEventHandler("onclick", this.Button01_onclick, this);
            this.Button02.addEventHandler("onclick", this.Button02_onclick, this);
            this.Button03.addEventHandler("onclick", this.Button03_onclick, this);
            this.Button04.addEventHandler("onclick", this.Button04_onclick, this);
            this.Button05.addEventHandler("onclick", this.Button05_onclick, this);
            this.Button06.addEventHandler("onclick", this.Button06_onclick, this);
            this.Button07.addEventHandler("onclick", this.Button07_onclick, this);
            this.Button09.addEventHandler("onclick", this.Button09_onclick, this);
            this.Button10.addEventHandler("onclick", this.Button10_onclick, this);
            this.Button11.addEventHandler("onclick", this.Button11_onclick, this);
            this.Button12.addEventHandler("onclick", this.Button12_onclick, this);
            this.Button13.addEventHandler("onclick", this.Button13_onclick, this);
            this.Button08.addEventHandler("onclick", this.Button08_onclick, this);
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
            this.Button33.addEventHandler("onclick", this.Button33_onclick, this);
            this.Button34.addEventHandler("onclick", this.Button34_onclick, this);
            this.Button31.addEventHandler("onclick", this.Button31_onclick, this);
            this.Button29.addEventHandler("onclick", this.Button29_onclick, this);
            this.Button30.addEventHandler("onclick", this.Button30_onclick, this);
            this.Button32.addEventHandler("onclick", this.Button32_onclick, this);
            this.Button35.addEventHandler("onclick", this.Button35_onclick, this);
            this.Button36.addEventHandler("onclick", this.Button36_onclick, this);

        };

        this.loadIncludeScript("string.xfdl");

       
    };
}
)();
