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
                this.set_name("PositionSize");
                this.set_classname("PositionSize");
                this.set_titletext("PositionSize");
                this._setFormPosition(0,0,1024,3440);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("Static65", "absolute", "234", "2475", "371", "213", null, null, this);
            obj.set_taborder("194");
            obj.set_text("(XComp, width, height, direction, offset)\r\n⇒ (this.Div09.Button00, 160, 60, \"vert\", 2)");
            obj.set_cssclass("WFDA_sta_Box");
            obj.style.set_padding("16 0 4 11");
            obj.style.set_align("left top");
            this.addChild(obj.name, obj);

            obj = new Static("st_14_result06", "absolute", "604", "2475", "184", "213", null, null, this);
            obj.set_taborder("195");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_sample14", "absolute", "787", "2475", "217", "213", null, null, this);
            obj.set_taborder("191");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_sample13", "absolute", "787", "2896", "217", "55", null, null, this);
            obj.set_taborder("188");
            obj.set_cssclass("WFDA_sta_BoxR");
            obj.style.set_align("center middle");
            obj.set_text("N/A");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_sample12", "absolute", "787", "2205", "217", "271", null, null, this);
            obj.set_taborder("175");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_14_result09", "absolute", "604", "2896", "184", "55", null, null, this);
            obj.set_taborder("184");
            obj.set_cssclass("WFDA_sta_BoxR");
            obj.set_text("N/A");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_sample01", "absolute", "787", "39", "217", "217", null, null, this);
            obj.set_taborder("0");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static17", "absolute", "20", "39", "215", "109", null, null, this);
            obj.set_taborder("1");
            obj.set_text("1.getScrollLeft");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static24", "absolute", "234", "454", "371", "40", null, null, this);
            obj.set_taborder("2");
            obj.set_text("(XComp, type) ⇒  (Div03, \"vert\" )");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static10", "absolute", "234", "39", "371", "55", null, null, this);
            obj.set_taborder("3");
            obj.set_text("(XComp) ⇒  (Div00)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static99", "absolute", "234", "93", "371", "55", null, null, this);
            obj.set_taborder("4");
            obj.set_text("(XComp) ⇒  (Div01)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static14", "absolute", "234", "255", "371", "100", null, null, this);
            obj.set_taborder("5");
            obj.set_text("//테스트를 위해 수평스크롤을 가장좌측으로 강제이동시킨다\r\n(XCompA, xy, XCompB) ⇒\r\n(form, [0,0], Div02.Button00)");
            obj.set_cssclass("WFDA_sta_Box");
            obj.style.set_padding("0 0 20 11");
            obj.style.set_align("left bottom");
            this.addChild(obj.name, obj);

            obj = new Static("Static30", "absolute", "234", "0", "371", "40", null, null, this);
            obj.set_taborder("6");
            obj.set_text("Arguments:  ( Type ) ⇒ ( Value )");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static31", "absolute", "20", "0", "215", "40", null, null, this);
            obj.set_taborder("7");
            obj.set_text("Method");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static32", "absolute", "604", "0", "184", "40", null, null, this);
            obj.set_taborder("8");
            obj.set_text("Result: (Type) Vaule");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Button("Button06", "absolute", "532", "463", "56", "22", null, null, this);
            obj.set_taborder("10");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button00", "absolute", "532", "54", "56", "22", null, null, this);
            obj.set_taborder("11");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button01", "absolute", "532", "108", "56", "22", null, null, this);
            obj.set_taborder("12");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button04", "absolute", "532", "264", "56", "22", null, null, this);
            obj.set_taborder("13");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static00", "absolute", "787", "0", "217", "40", null, null, this);
            obj.set_taborder("14");
            obj.set_text("Sample Structure");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static03", "absolute", "20", "255", "215", "200", null, null, this);
            obj.set_taborder("15");
            obj.set_text("3. convertXY");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static04", "absolute", "20", "454", "215", "80", null, null, this);
            obj.set_taborder("16");
            obj.set_text("4. getScrollBarSize");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Div("Div00", "absolute", "794", "56", "198", "78", null, null, this);
            obj.set_taborder("17");
            obj.style.set_border("2px dotted blue");
            this.addChild(obj.name, obj);
            obj = new Button("Button00", "absolute", "255", "144", "25", "26", null, null, this.Div00);
            obj.set_taborder("0");
            obj.set_text("Button00");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static01", "absolute", "806", "65", "120", "20", null, null, this);
            obj.set_taborder("18");
            obj.set_text("Div00");
            obj.style.set_font("돋움,11,bold");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_result01", "absolute", "604", "39", "184", "55", null, null, this);
            obj.set_taborder("19");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_result02", "absolute", "604", "93", "184", "55", null, null, this);
            obj.set_taborder("20");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static02", "absolute", "20", "147", "215", "109", null, null, this);
            obj.set_taborder("21");
            obj.set_text("2.getScrollTop");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static05", "absolute", "234", "147", "371", "55", null, null, this);
            obj.set_taborder("22");
            obj.set_text("(XComp) ⇒  (Div00)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static06", "absolute", "234", "201", "371", "55", null, null, this);
            obj.set_taborder("23");
            obj.set_text("(XComp) ⇒  (Div01)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("st_2_result01", "absolute", "604", "147", "184", "55", null, null, this);
            obj.set_taborder("24");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_2_result02", "absolute", "604", "201", "184", "55", null, null, this);
            obj.set_taborder("25");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Div("Div01", "absolute", "794", "160", "198", "78", null, null, this);
            obj.set_taborder("26");
            obj.style.set_border("2px dotted blue");
            obj.set_scrollbars("none");
            this.addChild(obj.name, obj);
            obj = new Button("Button00", "absolute", "255", "136", "25", "26", null, null, this.Div01);
            obj.set_taborder("0");
            obj.set_text("Button00");
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static07", "absolute", "806", "169", "120", "20", null, null, this);
            obj.set_taborder("27");
            obj.set_text("Div01");
            obj.style.set_font("돋움,11,bold");
            this.addChild(obj.name, obj);

            obj = new Button("Button02", "absolute", "532", "162", "56", "22", null, null, this);
            obj.set_taborder("28");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button03", "absolute", "532", "216", "56", "22", null, null, this);
            obj.set_taborder("29");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_sample01", "absolute", "787", "255", "217", "200", null, null, this);
            obj.set_taborder("30");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Div("Div02", "absolute", "794", "274", "198", "162", null, null, this);
            obj.set_taborder("31");
            obj.style.set_border("2px dotted blue");
            this.addChild(obj.name, obj);
            obj = new Button("Button00", "absolute", "144", "45", "120", "50", null, null, this.Div02);
            obj.set_taborder("0");
            obj.set_text("Button00");
            obj.style.set_border("3 double darkorange #ffffffff");
            obj.style.set_align("left middle");
            this.Div02.addChild(obj.name, obj);

            obj = new Static("st_3_result01", "absolute", "604", "255", "184", "100", null, null, this);
            obj.set_taborder("32");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static08", "absolute", "806", "283", "120", "20", null, null, this);
            obj.set_taborder("33");
            obj.set_text("Div02");
            obj.style.set_font("돋움,11,bold");
            this.addChild(obj.name, obj);

            obj = new Static("Static09", "absolute", "234", "354", "371", "101", null, null, this);
            obj.set_taborder("34");
            obj.set_text("//테스트를 위해 수평스크롤을 가장우측으로 강제이동시킨다\r\n(XCompA, xy, XCompB) ⇒\r\n(form, [0,0], Div02.Button00)");
            obj.set_cssclass("WFDA_sta_Box");
            obj.style.set_padding("0 0 20 11");
            obj.style.set_align("left bottom");
            this.addChild(obj.name, obj);

            obj = new Button("Button05", "absolute", "532", "363", "56", "22", null, null, this);
            obj.set_taborder("35");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result02", "absolute", "604", "354", "184", "101", null, null, this);
            obj.set_taborder("36");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_4_result01", "absolute", "604", "454", "184", "40", null, null, this);
            obj.set_taborder("37");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_4_sample01", "absolute", "787", "454", "217", "159", null, null, this);
            obj.set_taborder("38");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Div("Div03", "absolute", "794", "461", "198", "66", null, null, this);
            obj.set_taborder("39");
            obj.style.set_border("2px dotted blue");
            this.addChild(obj.name, obj);

            obj = new Static("Static11", "absolute", "800", "472", "120", "20", null, null, this);
            obj.set_taborder("40");
            obj.set_text("Div03");
            obj.style.set_font("돋움,11,bold");
            this.addChild(obj.name, obj);

            obj = new Static("Static13", "absolute", "234", "493", "371", "41", null, null, this);
            obj.set_taborder("41");
            obj.set_text("(XComp, type) ⇒  (Div04, \"vert\" )");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("st_4_result02", "absolute", "604", "493", "184", "41", null, null, this);
            obj.set_taborder("42");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button07", "absolute", "532", "503", "56", "22", null, null, this);
            obj.set_taborder("43");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static15", "absolute", "234", "533", "371", "40", null, null, this);
            obj.set_taborder("44");
            obj.set_text("//Div03는 스크롤바가 없어서 0을 리턴\r\n(XComp, type) ⇒  (Div03, \"vert\" )");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button08", "absolute", "532", "542", "56", "22", null, null, this);
            obj.set_taborder("45");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static16", "absolute", "20", "533", "215", "80", null, null, this);
            obj.set_taborder("46");
            obj.set_text("5. getCurrentScrollBarSize");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("st_5_result01", "absolute", "604", "533", "184", "40", null, null, this);
            obj.set_taborder("47");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static19", "absolute", "234", "572", "371", "41", null, null, this);
            obj.set_taborder("48");
            obj.set_text("(XComp, type) ⇒  (Div04, \"vert\" )");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("st_5_result02", "absolute", "604", "572", "184", "41", null, null, this);
            obj.set_taborder("49");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button09", "absolute", "532", "582", "56", "22", null, null, this);
            obj.set_taborder("50");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Div("Div04", "absolute", "794", "541", "198", "66", null, null, this);
            obj.set_taborder("51");
            obj.style.set_border("2px dotted blue");
            this.addChild(obj.name, obj);
            obj = new Button("Button00", "absolute", "255", "101", "25", "26", null, null, this.Div04);
            obj.set_taborder("0");
            obj.set_text("Button00");
            this.Div04.addChild(obj.name, obj);

            obj = new Static("Static12", "absolute", "800", "549", "120", "20", null, null, this);
            obj.set_taborder("52");
            obj.set_text("Div04");
            obj.style.set_font("돋움,11,bold");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_sample08", "absolute", "787", "1152", "217", "55", null, null, this);
            obj.set_taborder("53");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_sample00", "absolute", "787", "612", "217", "55", null, null, this);
            obj.set_taborder("54");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static18", "absolute", "20", "612", "215", "163", null, null, this);
            obj.set_taborder("55");
            obj.set_text("6. getTextSize");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static20", "absolute", "234", "612", "371", "55", null, null, this);
            obj.set_taborder("56");
            obj.set_text("(XComp) ⇒ (btn_sample1)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static21", "absolute", "234", "666", "371", "55", null, null, this);
            obj.set_taborder("57");
            obj.set_text("(XComp) ⇒ (btn_sample2)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button10", "absolute", "532", "627", "56", "22", null, null, this);
            obj.set_taborder("58");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button11", "absolute", "532", "681", "56", "22", null, null, this);
            obj.set_taborder("59");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_6_result01", "absolute", "604", "612", "184", "55", null, null, this);
            obj.set_taborder("60");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_6_result02", "absolute", "604", "666", "184", "55", null, null, this);
            obj.set_taborder("61");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("btn_sample1", "absolute", "795", "622", "120", "34", null, null, this);
            obj.set_taborder("62");
            obj.set_text("btn_sample1");
            obj.style.set_font("Dotum,9");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_sample02", "absolute", "787", "666", "217", "55", null, null, this);
            obj.set_taborder("63");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("btn_sample2", "absolute", "795", "676", "120", "34", null, null, this);
            obj.set_taborder("64");
            obj.set_text("btn_sample2");
            obj.style.set_font("Dotum,9,bold");
            this.addChild(obj.name, obj);

            obj = new Static("Static22", "absolute", "234", "720", "371", "55", null, null, this);
            obj.set_taborder("65");
            obj.set_text("(XComp, string) ⇒ (btn_sample3, \"test\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button12", "absolute", "532", "735", "56", "22", null, null, this);
            obj.set_taborder("66");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_6_result03", "absolute", "604", "720", "184", "55", null, null, this);
            obj.set_taborder("67");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_sample03", "absolute", "787", "720", "217", "55", null, null, this);
            obj.set_taborder("68");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("btn_sample3", "absolute", "795", "730", "120", "34", null, null, this);
            obj.set_taborder("69");
            obj.set_text("btn_sample1");
            this.addChild(obj.name, obj);

            obj = new Static("Static23", "absolute", "20", "774", "215", "163", null, null, this);
            obj.set_taborder("70");
            obj.set_text("7. getImageSize");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static25", "absolute", "234", "774", "371", "55", null, null, this);
            obj.set_taborder("71");
            obj.set_text("(string) ⇒ (\"http://www.tobesoft.com/....\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static26", "absolute", "234", "828", "371", "55", null, null, this);
            obj.set_taborder("72");
            obj.set_text("(string) ⇒ (\"Images::ColorDialog.JPG\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button13", "absolute", "532", "789", "56", "22", null, null, this);
            obj.set_taborder("73");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button14", "absolute", "532", "843", "56", "22", null, null, this);
            obj.set_taborder("74");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            obj.style.set_font("bold 9 arial");
            this.addChild(obj.name, obj);

            obj = new Static("st_7_result01", "absolute", "604", "774", "184", "55", null, null, this);
            obj.set_taborder("75");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_7_result02", "absolute", "604", "828", "184", "55", null, null, this);
            obj.set_taborder("76");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static27", "absolute", "234", "882", "371", "55", null, null, this);
            obj.set_taborder("77");
            obj.set_text("(string) ⇒ (\"../Image/select.GIF\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button15", "absolute", "532", "897", "56", "22", null, null, this);
            obj.set_taborder("78");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_7_result03", "absolute", "604", "882", "184", "55", null, null, this);
            obj.set_taborder("79");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_sample04", "absolute", "787", "774", "217", "163", null, null, this);
            obj.set_taborder("80");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new ImageViewer("img_sample1", "absolute", "792", "779", "202", "153", null, null, this);
            obj.set_taborder("81");
            obj.style.set_border("1px solid red");
            this.addChild(obj.name, obj);

            obj = new Static("Static28", "absolute", "20", "936", "215", "271", null, null, this);
            obj.set_taborder("82");
            obj.set_text("8. getContentSize");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static29", "absolute", "234", "936", "371", "55", null, null, this);
            obj.set_taborder("83");
            obj.set_text("(XComp) ⇒ (btn_sample4)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static33", "absolute", "234", "990", "371", "55", null, null, this);
            obj.set_taborder("84");
            obj.set_text("(XComp) ⇒ (chk_sample1)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button16", "absolute", "532", "951", "56", "22", null, null, this);
            obj.set_taborder("85");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button17", "absolute", "532", "1005", "56", "22", null, null, this);
            obj.set_taborder("86");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_8_result01", "absolute", "604", "936", "184", "55", null, null, this);
            obj.set_taborder("87");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_8_result02", "absolute", "604", "990", "184", "55", null, null, this);
            obj.set_taborder("88");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static34", "absolute", "234", "1044", "371", "55", null, null, this);
            obj.set_taborder("89");
            obj.set_text("(XComp) ⇒ (cal_sample1)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button18", "absolute", "532", "1059", "56", "22", null, null, this);
            obj.set_taborder("90");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_8_result03", "absolute", "604", "1044", "184", "55", null, null, this);
            obj.set_taborder("91");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_sample05", "absolute", "787", "936", "217", "55", null, null, this);
            obj.set_taborder("92");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_sample06", "absolute", "787", "990", "217", "55", null, null, this);
            obj.set_taborder("93");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_sample07", "absolute", "787", "1044", "217", "55", null, null, this);
            obj.set_taborder("94");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static35", "absolute", "234", "1098", "371", "55", null, null, this);
            obj.set_taborder("95");
            obj.set_text("(XComp) ⇒ (cmb_sample1)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button19", "absolute", "532", "1113", "56", "22", null, null, this);
            obj.set_taborder("96");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_8_result04", "absolute", "604", "1098", "184", "55", null, null, this);
            obj.set_taborder("97");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_sample09", "absolute", "787", "1098", "217", "55", null, null, this);
            obj.set_taborder("98");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static36", "absolute", "234", "1152", "371", "55", null, null, this);
            obj.set_taborder("99");
            obj.set_text("(XComp) ⇒ (txt_sample1)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button20", "absolute", "532", "1167", "56", "22", null, null, this);
            obj.set_taborder("100");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_8_result05", "absolute", "604", "1152", "184", "55", null, null, this);
            obj.set_taborder("101");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("btn_sample4", "absolute", "796", "949", "36", "28", null, null, this);
            obj.set_taborder("102");
            obj.set_text("btn_sample4");
            this.addChild(obj.name, obj);

            obj = new CheckBox("chk_sample1", "absolute", "797", "1005", "38", "20", null, null, this);
            obj.set_taborder("103");
            obj.set_text("CheckBox");
            obj.style.set_border("1px solid red");
            this.addChild(obj.name, obj);

            obj = new Combo("cmb_sample1", "absolute", "797", "1061", "150", "20", null, null, this);
            this.addChild(obj.name, obj);
            obj.set_taborder("104");

            obj = new Calendar("cal_sample1", "absolute", "792", "1115", "120", "29", null, null, this);
            this.addChild(obj.name, obj);
            obj.set_taborder("105");
            obj.set_value("20130505");
            obj.style.set_border("1px solid red");
            obj.style.set_font("antialias bold 10 nanumgothic");

            obj = new TextArea("txt_sample1", "absolute", "794", "1158", "114", "44", null, null, this);
            obj.set_taborder("106");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_sample10", "absolute", "787", "1206", "217", "180", null, null, this);
            obj.set_taborder("107");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static37", "absolute", "20", "1206", "215", "568", null, null, this);
            obj.set_taborder("108");
            obj.set_text("9.getTopLevelForm");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static38", "absolute", "234", "1206", "371", "180", null, null, this);
            obj.set_taborder("109");
            obj.set_text("(XComp) ⇒ (Div05.Button00)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static39", "absolute", "234", "1385", "371", "180", null, null, this);
            obj.set_taborder("110");
            obj.set_text("(XComp) ⇒  (Div06.Div02.Button01)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button21", "absolute", "532", "1221", "56", "22", null, null, this);
            obj.set_taborder("111");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button22", "absolute", "532", "1400", "56", "22", null, null, this);
            obj.set_taborder("112");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Div("Div05", "absolute", "794", "1220", "198", "151", null, null, this);
            obj.set_taborder("113");
            obj.style.set_border("2px dotted blue");
            this.addChild(obj.name, obj);
            obj = new Button("Button00", "absolute", "33", "40", "63", "43", null, null, this.Div05);
            obj.set_taborder("0");
            obj.set_text("Button00");
            obj.style.set_border("3 double darkorange #ffffffff");
            obj.style.set_align("left middle");
            this.Div05.addChild(obj.name, obj);

            obj = new Static("Static40", "absolute", "814", "1240", "120", "20", null, null, this);
            obj.set_taborder("114");
            obj.set_text("Div05");
            obj.style.set_font("돋움,11,bold");
            this.addChild(obj.name, obj);

            obj = new Static("st_9_result01", "absolute", "604", "1206", "184", "180", null, null, this);
            obj.set_taborder("115");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_9_result02", "absolute", "604", "1385", "184", "180", null, null, this);
            obj.set_taborder("116");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_sample00", "absolute", "787", "1385", "217", "180", null, null, this);
            obj.set_taborder("117");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Div("Div06", "absolute", "794", "1399", "198", "155", null, null, this);
            obj.set_taborder("118");
            obj.style.set_border("2px dotted blue");
            this.addChild(obj.name, obj);
            obj = new Div("Div02", "absolute", "35", "38", "146", "94", null, null, this.Div06);
            obj.set_taborder("0");
            obj.style.set_border("2px dotted red");
            obj.set_scrollbars("none");
            this.Div06.addChild(obj.name, obj);
            obj = new Button("Button00", "absolute", "255", "136", "25", "26", null, null, this.Div06.Div02);
            obj.set_taborder("6");
            obj.set_text("Button00");
            this.Div06.Div02.addChild(obj.name, obj);
            obj = new Button("Button01", "absolute", "8", "32", "63", "43", null, null, this.Div06.Div02);
            obj.set_taborder("7");
            obj.set_text("Button01");
            obj.style.set_border("3 double darkorange #ffffffff");
            obj.style.set_align("left middle");
            this.Div06.Div02.addChild(obj.name, obj);
            obj = new Static("Static07", "absolute", "8", "6", "133", "20", null, null, this.Div06.Div02);
            obj.set_taborder("8");
            obj.set_text("Div02");
            obj.style.set_font("돋움,11,bold");
            this.Div06.Div02.addChild(obj.name, obj);

            obj = new Static("Static41", "absolute", "812", "1407", "120", "20", null, null, this);
            obj.set_taborder("119");
            obj.set_text("Div06");
            obj.style.set_font("돋움,11,bold");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_sample02", "absolute", "787", "1564", "217", "210", null, null, this);
            obj.set_taborder("120");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_9_result03", "absolute", "604", "1564", "184", "210", null, null, this);
            obj.set_taborder("121");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static42", "absolute", "234", "1564", "371", "210", null, null, this);
            obj.set_taborder("122");
            obj.set_text("(XComp) ⇒  (Tab00.tabpage1.Button02)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Tab("Tab00", "absolute", "802", "1619", "183", "116", null, null, this);
            obj.set_taborder("123");
            obj.set_tabindex("0");
            obj.set_scrollbars("autoboth");
            obj.style.set_border("1px solid #697070b3");
            this.addChild(obj.name, obj);
            obj = new Tabpage("tabpage1", this.Tab00);
            obj.set_text("tabpage1");
            this.Tab00.addChild(obj.name, obj);
            obj = new Button("Button02", "absolute", "10", "8", "63", "43", null, null, this.Tab00.tabpage1);
            obj.set_taborder("0");
            obj.set_text("Button02");
            obj.style.set_border("3 double darkorange #ffffffff");
            obj.style.set_align("left middle");
            this.Tab00.tabpage1.addChild(obj.name, obj);
            obj = new Tabpage("tabpage2", this.Tab00);
            obj.set_text("tabpage2");
            this.Tab00.addChild(obj.name, obj);
            obj = new Button("Button03", "absolute", "15", "19", "120", "50", null, null, this.Tab00.tabpage2);
            obj.set_taborder("0");
            obj.set_text("Button03");
            this.Tab00.tabpage2.addChild(obj.name, obj);

            obj = new Static("Static43", "absolute", "802", "1591", "120", "20", null, null, this);
            obj.set_taborder("124");
            obj.set_text("Tab00");
            obj.style.set_font("돋움,11,bold");
            this.addChild(obj.name, obj);

            obj = new Button("Button23", "absolute", "532", "1576", "56", "22", null, null, this);
            obj.set_taborder("125");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_sample11", "absolute", "787", "1773", "217", "433", null, null, this);
            obj.set_taborder("126");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static44", "absolute", "20", "1773", "215", "109", null, null, this);
            obj.set_taborder("127");
            obj.set_text("10. getClientWidth");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static45", "absolute", "234", "2097", "371", "55", null, null, this);
            obj.set_taborder("128");
            obj.set_text("(XComp) ⇒  (this.Div07)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static46", "absolute", "234", "1773", "371", "55", null, null, this);
            obj.set_taborder("129");
            obj.set_text("(XComp) ⇒  (this.Div07)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static47", "absolute", "234", "1827", "371", "55", null, null, this);
            obj.set_taborder("130");
            obj.set_text("(XComp) ⇒  (this.Div08)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static48", "absolute", "234", "1989", "371", "55", null, null, this);
            obj.set_taborder("131");
            obj.set_text("(XComp) ⇒  (this.Div07)");
            obj.set_cssclass("WFDA_sta_Box");
            obj.style.set_padding("0 0 4 11");
            obj.style.set_align("left middle");
            this.addChild(obj.name, obj);

            obj = new Button("Button30", "absolute", "532", "2113", "56", "22", null, null, this);
            obj.set_taborder("132");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button24", "absolute", "532", "1788", "56", "22", null, null, this);
            obj.set_taborder("133");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button25", "absolute", "532", "1842", "56", "22", null, null, this);
            obj.set_taborder("134");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button28", "absolute", "532", "2005", "56", "22", null, null, this);
            obj.set_taborder("135");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static49", "absolute", "20", "1989", "215", "109", null, null, this);
            obj.set_taborder("136");
            obj.set_text("12. getScrollWidth");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static50", "absolute", "20", "2097", "215", "109", null, null, this);
            obj.set_taborder("137");
            obj.set_text("13. getScrollHeight");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static51", "absolute", "806", "1823", "120", "20", null, null, this);
            obj.set_taborder("138");
            obj.set_text("Div07");
            obj.style.set_font("돋움,11,bold");
            this.addChild(obj.name, obj);

            obj = new Static("st_10_result01", "absolute", "604", "1773", "184", "55", null, null, this);
            obj.set_taborder("139");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_10_result02", "absolute", "604", "1827", "184", "55", null, null, this);
            obj.set_taborder("140");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static52", "absolute", "20", "1881", "215", "109", null, null, this);
            obj.set_taborder("141");
            obj.set_text("11.getClientHeight");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static53", "absolute", "234", "1881", "371", "55", null, null, this);
            obj.set_taborder("142");
            obj.set_text("(XComp) ⇒  (this.Div07)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static54", "absolute", "234", "1935", "371", "55", null, null, this);
            obj.set_taborder("143");
            obj.set_text("(XComp) ⇒  (this.Div08)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("st_11_result01", "absolute", "604", "1881", "184", "55", null, null, this);
            obj.set_taborder("144");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_11_result02", "absolute", "604", "1935", "184", "55", null, null, this);
            obj.set_taborder("145");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static55", "absolute", "806", "1999", "120", "20", null, null, this);
            obj.set_taborder("146");
            obj.set_text("Div08");
            obj.style.set_font("돋움,11,bold");
            this.addChild(obj.name, obj);

            obj = new Button("Button26", "absolute", "532", "1896", "56", "22", null, null, this);
            obj.set_taborder("147");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button27", "absolute", "532", "1950", "56", "22", null, null, this);
            obj.set_taborder("148");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_12_result01", "absolute", "604", "1989", "184", "55", null, null, this);
            obj.set_taborder("149");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static56", "absolute", "234", "2043", "371", "55", null, null, this);
            obj.set_taborder("150");
            obj.set_text("(XComp) ⇒  (this.Div08)");
            obj.set_cssclass("WFDA_sta_Box");
            obj.style.set_padding("0 0 20 11");
            obj.style.set_align("left bottom");
            this.addChild(obj.name, obj);

            obj = new Button("Button29", "absolute", "532", "2059", "56", "22", null, null, this);
            obj.set_taborder("151");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_12_result02", "absolute", "604", "2043", "184", "55", null, null, this);
            obj.set_taborder("152");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_13_result01", "absolute", "604", "2097", "184", "55", null, null, this);
            obj.set_taborder("153");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static57", "absolute", "234", "2151", "371", "55", null, null, this);
            obj.set_taborder("154");
            obj.set_text("(XComp) ⇒  (this.Div08)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("st_13_result02", "absolute", "604", "2151", "184", "55", null, null, this);
            obj.set_taborder("155");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button31", "absolute", "532", "2167", "56", "22", null, null, this);
            obj.set_taborder("156");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Div("Div07", "absolute", "794", "1846", "198", "117", null, null, this);
            obj.set_taborder("157");
            obj.style.set_border("2px dotted blue");
            this.addChild(obj.name, obj);
            obj = new Button("Button00", "absolute", "255", "136", "25", "26", null, null, this.Div07);
            obj.set_taborder("0");
            obj.set_text("btn");
            this.Div07.addChild(obj.name, obj);

            obj = new Div("Div08", "absolute", "794", "2022", "198", "117", null, null, this);
            obj.set_taborder("158");
            obj.style.set_border("2px dotted blue");
            obj.set_scrollbars("none");
            this.addChild(obj.name, obj);
            obj = new Button("Button00", "absolute", "255", "136", "25", "26", null, null, this.Div08);
            obj.set_taborder("0");
            obj.set_text("Button00");
            this.Div08.addChild(obj.name, obj);

            obj = new Static("Static58", "absolute", "20", "2205", "215", "746", null, null, this);
            obj.set_taborder("159");
            obj.set_text("14. getPopupPosition");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static59", "absolute", "234", "2367", "371", "55", null, null, this);
            obj.set_taborder("160");
            obj.set_text("(XComp) ⇒  (this.Div07)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static60", "absolute", "234", "2259", "371", "55", null, null, this);
            obj.set_taborder("161");
            obj.set_text("(XComp, width, height, direction, offset)\r\n⇒ (btn_pop, 200, 600, \"vert\", 2)");
            obj.set_cssclass("WFDA_sta_Box");
            obj.style.set_padding("0 0 4 11");
            obj.style.set_align("left middle");
            this.addChild(obj.name, obj);

            obj = new Button("Button35", "absolute", "532", "2383", "56", "22", null, null, this);
            obj.set_taborder("162");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Button("Button33", "absolute", "532", "2275", "56", "22", null, null, this);
            obj.set_taborder("163");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static61", "absolute", "234", "2205", "371", "55", null, null, this);
            obj.set_taborder("164");
            obj.set_text("(XComp, width, height, direction, offset)\r\n⇒ (btn_pop, 44, 23, \"vert\", 2)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("st_14_result01", "absolute", "604", "2205", "184", "55", null, null, this);
            obj.set_taborder("165");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button32", "absolute", "532", "2220", "56", "22", null, null, this);
            obj.set_taborder("166");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_14_result02", "absolute", "604", "2259", "184", "55", null, null, this);
            obj.set_taborder("167");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static62", "absolute", "234", "2313", "371", "55", null, null, this);
            obj.set_taborder("168");
            obj.set_text("(XComp) ⇒  (this.Div08)");
            obj.set_cssclass("WFDA_sta_Box");
            obj.style.set_padding("0 0 20 11");
            obj.style.set_align("left bottom");
            this.addChild(obj.name, obj);

            obj = new Button("Button34", "absolute", "532", "2329", "56", "22", null, null, this);
            obj.set_taborder("169");
            obj.set_text("실행");
            obj.set_wordwrap("true");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_14_result03", "absolute", "604", "2313", "184", "55", null, null, this);
            obj.set_taborder("170");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_14_result04", "absolute", "604", "2367", "184", "55", null, null, this);
            obj.set_taborder("171");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static63", "absolute", "234", "2421", "371", "55", null, null, this);
            obj.set_taborder("172");
            obj.set_text("(XComp) ⇒  (this.Div08)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("st_14_result05", "absolute", "604", "2421", "184", "55", null, null, this);
            obj.set_taborder("173");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button36", "absolute", "532", "2437", "56", "22", null, null, this);
            obj.set_taborder("174");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new PopupDiv("PopupDiv00", "absolute", "813", "2301", "156", "100", null, null, this);
            obj.set_text("PopupDiv00");
            obj.set_visible("false");
            obj.style.set_background("red");
            obj.style.set_color("white");
            this.addChild(obj.name, obj);

            obj = new Button("btn_pop", "absolute", "804", "2226", "120", "50", null, null, this);
            obj.set_taborder("177");
            obj.set_text("btn_pop");
            this.addChild(obj.name, obj);

            obj = new Static("Static66", "absolute", "234", "2896", "371", "55", null, null, this);
            obj.set_taborder("183");
            obj.set_text("showModal 샘플");
            obj.set_cssclass("WFDA_sta_Box");
            obj.style.set_padding("16 0 4 11");
            obj.style.set_align("left top");
            this.addChild(obj.name, obj);

            obj = new Button("Button40", "absolute", "532", "2911", "56", "22", null, null, this);
            obj.set_taborder("185");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Div("Div09", "absolute", "794", "2523", "198", "150", null, null, this);
            obj.set_taborder("189");
            obj.style.set_border("2px dotted blue");
            this.addChild(obj.name, obj);
            obj = new Button("Button00", "absolute", "58", "6", "120", "30", null, null, this.Div09);
            obj.set_taborder("0");
            obj.set_text("Div09.Button00");
            this.Div09.addChild(obj.name, obj);
            obj = new PopupDiv("PopupDiv00", "absolute", "28", "44", "160", "60", null, null, this.Div09);
            obj.set_text("Div09.PopupDiv00");
            obj.set_visible("false");
            obj.style.set_background("red");
            obj.style.set_color("white");
            this.Div09.addChild(obj.name, obj);

            obj = new Button("Button38", "absolute", "532", "2490", "56", "22", null, null, this);
            obj.set_taborder("190");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static64", "absolute", "804", "2495", "120", "20", null, null, this);
            obj.set_taborder("192");
            obj.set_text("Div09");
            obj.style.set_font("돋움,11,bold");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_sample03", "absolute", "787", "2687", "217", "210", null, null, this);
            obj.set_taborder("196");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_14_result07", "absolute", "604", "2687", "184", "210", null, null, this);
            obj.set_taborder("197");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static67", "absolute", "234", "2687", "371", "210", null, null, this);
            obj.set_taborder("198");
            obj.set_text("(XComp, width, height, direction, offset)\r\n⇒ (this.Tab01.tabpage1.Button02, 220, 37, \"vert\", 2)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Tab("Tab01", "absolute", "793", "2742", "207", "116", null, null, this);
            obj.set_taborder("199");
            obj.set_tabindex("0");
            obj.set_scrollbars("autoboth");
            obj.style.set_border("1px solid #697070b3");
            this.addChild(obj.name, obj);
            obj = new Tabpage("tabpage1", this.Tab01);
            obj.set_text("tabpage1");
            this.Tab01.addChild(obj.name, obj);
            obj = new Button("Button02", "absolute", "10", "8", "181", "29", null, null, this.Tab01.tabpage1);
            obj.set_taborder("0");
            obj.set_text("Tab01.tabpage1.Button02");
            obj.style.set_border("3 double darkorange #ffffffff");
            obj.style.set_align("left middle");
            this.Tab01.tabpage1.addChild(obj.name, obj);
            obj = new PopupDiv("PopupDiv00", "absolute", "2", "44", "220", "37", null, null, this.Tab01.tabpage1);
            obj.set_text("Tab01.tabpage1.PopupDiv00");
            obj.style.set_background("red");
            obj.style.set_color("white");
            obj.set_visible("false");
            this.Tab01.tabpage1.addChild(obj.name, obj);

            obj = new Static("Static68", "absolute", "802", "2714", "120", "20", null, null, this);
            obj.set_taborder("200");
            obj.set_text("Tab01");
            obj.style.set_font("돋움,11,bold");
            this.addChild(obj.name, obj);

            obj = new Button("Button39", "absolute", "532", "2699", "56", "22", null, null, this);
            obj.set_taborder("201");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static69", "absolute", "20", "2950", "215", "476", null, null, this);
            obj.set_taborder("202");
            obj.set_text("15. getPositionByForm");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static70", "absolute", "234", "2950", "371", "213", null, null, this);
            obj.set_taborder("203");
            obj.set_text("(XComp, width, height, direction, offset)\r\n⇒ (this.Div10.Button00, 160, 60, \"vert\", 2, this.Div10)");
            obj.set_cssclass("WFDA_sta_Box");
            obj.style.set_padding("16 0 4 11");
            obj.style.set_align("left middle");
            this.addChild(obj.name, obj);

            obj = new Static("st_15_result01", "absolute", "604", "2950", "184", "213", null, null, this);
            obj.set_taborder("204");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_sample15", "absolute", "787", "2950", "217", "213", null, null, this);
            obj.set_taborder("205");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Div("Div10", "absolute", "794", "2998", "198", "150", null, null, this);
            obj.set_taborder("206");
            obj.style.set_border("2px dotted blue");
            this.addChild(obj.name, obj);
            obj = new Button("Button00", "absolute", "58", "6", "120", "30", null, null, this.Div10);
            obj.set_taborder("1");
            obj.set_text("Div10.Button00");
            this.Div10.addChild(obj.name, obj);
            obj = new Static("Static00", "absolute", "20", "52", "160", "60", null, null, this.Div10);
            obj.set_taborder("2");
            obj.set_text("Div10.Static00");
            obj.style.set_background("#ffff00ff");
            obj.style.set_border("1 solid #808080ff");
            obj.style.set_bordertype("round 3 3");
            obj.style.set_align("center middle");
            this.Div10.addChild(obj.name, obj);

            obj = new Button("Button41", "absolute", "532", "2965", "56", "22", null, null, this);
            obj.set_taborder("207");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static71", "absolute", "804", "2970", "120", "20", null, null, this);
            obj.set_taborder("208");
            obj.set_text("Div10");
            obj.style.set_font("돋움,11,bold");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_sample04", "absolute", "787", "3162", "217", "210", null, null, this);
            obj.set_taborder("209");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_15_result02", "absolute", "604", "3162", "184", "210", null, null, this);
            obj.set_taborder("210");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static72", "absolute", "234", "3162", "371", "210", null, null, this);
            obj.set_taborder("211");
            obj.set_text("(XComp, width, height, direction, offset)\r\n⇒ (this.Tab2.tabpage1.Button1, 220, 37, \"vert\", 2, this.Tab2.tabpage1)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Tab("Tab2", "absolute", "793", "3217", "207", "116", null, null, this);
            obj.set_taborder("212");
            obj.set_tabindex("0");
            obj.set_scrollbars("autoboth");
            obj.style.set_border("1px solid #697070b3");
            this.addChild(obj.name, obj);
            obj = new Tabpage("tabpage1", this.Tab2);
            obj.set_text("tabpage1");
            this.Tab2.addChild(obj.name, obj);
            obj = new Button("Button1", "absolute", "26", "8", "170", "29", null, null, this.Tab2.tabpage1);
            obj.set_taborder("1");
            obj.set_text("Tab2.tabpage1.Button1");
            obj.style.set_border("3 double darkorange #ffffffff");
            obj.style.set_align("center middle");
            this.Tab2.tabpage1.addChild(obj.name, obj);
            obj = new Static("Static1", "absolute", "8", "52", "192", "30", null, null, this.Tab2.tabpage1);
            obj.set_taborder("2");
            obj.set_text("Tab2.tabpage1.Static1");
            obj.style.set_background("#ffff00ff");
            obj.style.set_border("1 solid #808080ff");
            obj.style.set_bordertype("round 3 3");
            obj.style.set_align("center middle");
            this.Tab2.tabpage1.addChild(obj.name, obj);

            obj = new Static("Static73", "absolute", "802", "3189", "120", "20", null, null, this);
            obj.set_taborder("213");
            obj.set_text("Tab2");
            obj.style.set_font("돋움,11,bold");
            this.addChild(obj.name, obj);

            obj = new Button("Button42", "absolute", "532", "3174", "56", "22", null, null, this);
            obj.set_taborder("214");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_sample16", "absolute", "787", "3371", "217", "55", null, null, this);
            obj.set_taborder("215");
            obj.set_text("N/A");
            obj.set_cssclass("WFDA_sta_BoxR");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);

            obj = new Static("st_15_result03", "absolute", "604", "3371", "184", "55", null, null, this);
            obj.set_taborder("216");
            obj.set_text("N/A");
            obj.set_cssclass("WFDA_sta_BoxR");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);

            obj = new Static("Static74", "absolute", "234", "3371", "371", "55", null, null, this);
            obj.set_taborder("217");
            obj.set_text("showModal 샘플");
            obj.set_cssclass("WFDA_sta_Box");
            obj.style.set_padding("16 0 4 11");
            obj.style.set_align("left top");
            this.addChild(obj.name, obj);

            obj = new Button("Button43", "absolute", "532", "3386", "56", "22", null, null, this);
            obj.set_taborder("218");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 198, 91, this.Div00,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("17");
            		p.style.set_border("2px dotted blue");

            	}
            );
            this.Div00.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 198, 91, this.Div01,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("26");
            		p.style.set_border("2px dotted blue");
            		p.set_scrollbars("none");

            	}
            );
            this.Div01.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 198, 162, this.Div02,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("31");
            		p.style.set_border("2px dotted blue");

            	}
            );
            this.Div02.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 198, 91, this.Div04,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("51");
            		p.style.set_border("2px dotted blue");

            	}
            );
            this.Div04.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 198, 91, this.Div05,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("113");
            		p.style.set_border("2px dotted blue");

            	}
            );
            this.Div05.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 198, 91, this.Div06.Div02,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("0");
            		p.style.set_border("2px dotted red");
            		p.set_scrollbars("none");

            	}
            );
            this.Div06.Div02.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 198, 91, this.Div06,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("118");
            		p.style.set_border("2px dotted blue");

            	}
            );
            this.Div06.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 0, 0, this.Tab00.tabpage1,
            	//-- Layout function
            	function(p) {
            		p.set_text("tabpage1");

            	}
            );
            this.Tab00.tabpage1.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 0, 0, this.Tab00.tabpage2,
            	//-- Layout function
            	function(p) {
            		p.set_text("tabpage2");

            	}
            );
            this.Tab00.tabpage2.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 198, 91, this.Div07,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("157");
            		p.style.set_border("2px dotted blue");

            	}
            );
            this.Div07.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 198, 91, this.Div08,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("158");
            		p.style.set_border("2px dotted blue");
            		p.set_scrollbars("none");

            	}
            );
            this.Div08.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 198, 150, this.Div09,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("189");
            		p.style.set_border("2px dotted blue");

            	}
            );
            this.Div09.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 0, 0, this.Tab01.tabpage1,
            	//-- Layout function
            	function(p) {
            		p.set_text("tabpage1");

            	}
            );
            this.Tab01.tabpage1.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 198, 150, this.Div10,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("206");
            		p.style.set_border("2px dotted blue");

            	}
            );
            this.Div10.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 0, 0, this.Tab2.tabpage1,
            	//-- Layout function
            	function(p) {
            		p.set_text("tabpage1");

            	}
            );
            this.Tab2.tabpage1.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 1024, 3440, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("PositionSize");
            		p.set_titletext("PositionSize");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("PositionSize.xfdl", function() {
        /*
         * Eco.XComp.PositionSize api Sample at nexacro
         * 
         * Copyright (c) 2014 EcoSystem of TOBESOFT
         * Licensed Free under nexacro.
        */

        // 1.1 getScrollLeft api 사용 예제
        this.Button00_onclick = function(obj,e)
        {
        	// 테스트를 위해 스크롤바를 이동 시킴
        	this.Div00.hscrollbar.getSetter("pos").set(50);
        	
        	var pos = Eco.XComp.PositionSize.getScrollLeft(this.Div00);
        	this.st_1_result01.set_text( "(number) " + pos );
        	trace(pos);
        }

        // 1.2 getScrollLeft api 사용 예제
        this.Button01_onclick = function(obj,e)
        {
        	var pos = Eco.XComp.PositionSize.getScrollLeft(this.Div01);
        	this.st_1_result02.set_text( "(number) " + pos );
        	trace(pos);
        }

        // 2.1 getScrollTop api 사용 예제
        this.Button02_onclick = function(obj,e)
        {
        	// 테스트를 위해 스크롤바를 이동 시킴
        	this.Div00.vscrollbar.getSetter("pos").set(30);
        	
        	var pos = Eco.XComp.PositionSize.getScrollTop(this.Div00);
        	this.st_2_result01.set_text( "(number) " + pos );
        	trace(pos);
        }

        // 2.2 getScrollTop api 사용 예제
        this.Button03_onclick = function(obj,e)
        {
        	var pos = Eco.XComp.PositionSize.getScrollTop(this.Div01);
        	this.st_2_result02.set_text( "(number) " + pos );
        	trace(pos);
        }

        // 3.1 convertXY api 사용 예제
        this.Button04_onclick = function(obj,e)
        {
        	//테스트를 위해 this.Div02의 수평스크롤을 가장좌측으로 강제이동시킨다.

        	this.Div02.hscrollbar.getSetter("pos").set(0);
        	
        	var xy = Eco.XComp.PositionSize.convertXY(this,[0,0], this.Div02.Button00);
        	this.st_3_result01.set_text( "(array) [" + xy + "]" );
        	trace(xy);
        }

        // 3.2 convertXY api 사용 예제
        this.Button05_onclick = function(obj,e)
        {
        	//테스트를 위해 this.Div02의 수평스크롤을 가장우측으로 강제이동시킨다.
        	this.Div02.hscrollbar.getSetter("pos").set(this.Div02.hscrollbar.max); //return: 70
        	
        	var xy = Eco.XComp.PositionSize.convertXY(this,[0,0], this.Div02.Button00);
        	this.st_3_result02.set_text( "(array) [" + xy + "]" );
        	trace(xy);
        }

        
        // 4.1 getScrollBarSize api 사용 예제
        this.Button06_onclick = function(obj,e)
        {
        	var size = Eco.XComp.PositionSize.getScrollBarSize(this.Div03, "vert");
        	this.st_4_result01.set_text( "(number) " + size );
        	trace(size);
        }

        
        // 4.2 getScrollBarSize api 사용 예제
        this.Button07_onclick = function(obj,e)
        {
        	var size = Eco.XComp.PositionSize.getScrollBarSize(this.Div04, "vert");
        	this.st_4_result02.set_text( "(number) " + size );
        	trace(size);
        }

        // 5.1 getCurrentScrollBarSize api 사용 예제
        this.Button08_onclick = function(obj,e)
        {
        	//this.Div03는 스크롤바가 없어서 0을 리턴
        	var size = Eco.XComp.PositionSize.getCurrentScrollBarSize(this.Div03, "vert");
        	this.st_5_result01.set_text( "(number) " + size );
        	trace(size);
        }

        // 5.2 getCurrentScrollBarSize api 사용 예제
        this.Button09_onclick = function(obj,e)
        {
        	var size = Eco.XComp.PositionSize.getCurrentScrollBarSize(this.Div04, "vert");
        	this.st_5_result02.set_text( "(number) " + size );
        	trace(size);
        }

        // 6.1 getTextSize api 사용 예제
        this.Button10_onclick = function(obj,e)
        {
        	var size = Eco.XComp.PositionSize.getTextSize(this.btn_sample1);
        	
        	this.st_6_result01.set_text( "(array) " + size );
        	
        	trace(size);
        }

        // 6.2 getTextSize api 사용 예제
        this.Button11_onclick = function(obj,e)
        {
        	var size = Eco.XComp.PositionSize.getTextSize(this.btn_sample2);
        	
        	this.st_6_result02.set_text( "(array) " + size );
        	
        	trace(size);
        }

        // 6.3 getTextSize api 사용 예제
        this.Button12_onclick = function(obj,e)
        {
        	var size = Eco.XComp.PositionSize.getTextSize(this.btn_sample3, "test");
        	
        	this.st_6_result03.set_text( "(array) " + size );
        	
        	trace(size);
        }

        // 7.1 getImageSize api 사용 예제
        this.Button13_onclick = function(obj,e)
        {
        	var url = "http://www.tobesoft.com/tobesoft_eng/images/product_imgs/visual_xplatform_img001.jpg";
        	Eco.XComp.PositionSize.getImageSize(url, this.getImageSizeCallBack1, this);
        }

        this.getImageSizeCallBack1 = function(url,width,height)
        {
        	trace(url + " : " + width + " : " + height);
        	
        	this.st_7_result01.set_text( "callback function==>"+width + " : " + height );
        	this.img_sample1.set_image( url );
        }

        // 7.2 getImageSize api 사용 예제
        this.Button14_onclick = function(obj,e)
        {
        	var url = "Images::ColorDialog.JPG";
        	Eco.XComp.PositionSize.getImageSize(url, this.getImageSizeCallBack2, this);
        }

        this.getImageSizeCallBack2 = function(url,width,height)
        {
        	trace(url + " : " + width + " : " + height);
        	
        	this.st_7_result02.set_text( "callback function==>"+width + " : " + height );
        	this.img_sample1.set_image( url );
        }

        // 7.3 getImageSize api 사용 예제
        this.Button15_onclick = function(obj,e)
        {
        	var url = "../Images/select.GIF";
        	Eco.XComp.PositionSize.getImageSize(url, this.getImageSizeCallBack3, this);
        }

        this.getImageSizeCallBack3 = function(url,width,height)
        {
        	trace(url + " : " + width + " : " + height);
        	
        	this.st_7_result03.set_text( "callback function==>"+width + " : " + height );
        	this.img_sample1.set_image( url );
        }

        // 8.1 getContentSize api 사용 예제
        this.Button16_onclick = function(obj,e)
        {
        	var size = Eco.XComp.PositionSize.getContentSize(this.btn_sample4);
        	
        	this.st_8_result01.set_text( "(array) " + size );
        	
        	trace(size);
        	
        	this.btn_sample4.resize(size[0], size[1]);
        }

        // 8.2 getContentSize api 사용 예제
        this.Button17_onclick = function(obj,e)
        {
        	var size = Eco.XComp.PositionSize.getContentSize(this.chk_sample1);
        	
        	this.st_8_result02.set_text( "(array) " + size );
        	
        	trace(size);
        	
        	this.chk_sample1.resize(size[0], size[1]);
        }

        // 8.3 getContentSize api 사용 예제
        this.Button18_onclick = function(obj,e)
        {
        	var size = Eco.XComp.PositionSize.getContentSize(this.cmb_sample1);
        	
        	this.st_8_result03.set_text( "(array) " + size );
        	
        	trace(size);
        	
        	this.cmb_sample1.resize(size[0], size[1]);
        }

        // 8.4 getContentSize api 사용 예제
        this.Button19_onclick = function(obj,e)
        {
        	var size = Eco.XComp.PositionSize.getContentSize(this.cal_sample1);
        	
        	this.st_8_result04.set_text( "(array) " + size );
        	
        	trace(size);
        	
        	this.cal_sample1.resize(size[0], size[1]);
        }

        // 8.5 getContentSize api 사용 예제
        this.Button20_onclick = function(obj,e)
        {
        	var size = Eco.XComp.PositionSize.getContentSize(this.txt_sample1);
        	
        	this.st_8_result05.set_text( "(array) " + size );
        	
        	trace(size);
        	
        	this.txt_sample1.resize(size[0], size[1]);	
        }

        // 9.1 getTopLevelFormBox api 사용 예제
        this.Button21_onclick = function(obj,e)
        {
        	var positionSize = Eco.XComp.PositionSize.getTopLevelFormBox(this.Div05.Button00);
        	this.st_9_result01.set_text( "(array) [" + positionSize + "]" );
        	trace(positionSize);
        }

        // 9.2 getTopLevelFormBox api 사용 예제
        this.Button22_onclick = function(obj,e)
        {
        	var positionSize = Eco.XComp.PositionSize.getTopLevelFormBox(this.Div06.Div02.Button01);
        	this.st_9_result02.set_text( "(array) [" + positionSize + "]" );
        	trace(positionSize);
        }

        // 9.3 getTopLevelFormBox api 사용 예제
        this.Button23_onclick = function(obj,e)
        {
        	var positionSize = Eco.XComp.PositionSize.getTopLevelFormBox(this.Tab00.tabpage1.Button02);
        	this.st_9_result03.set_text( "(array) [" + positionSize + "]" );
        	trace(positionSize);
        }

        // 10.1 getClientWidth api 사용 예제
        this.Button24_onclick = function(obj,e)
        {
        	var clientwidth = Eco.XComp.PositionSize.getClientWidth(this.Div07);
        	this.st_10_result01.set_text( "(number) " + clientwidth  );
        	trace(clientwidth);
        }

        // 10.2 getClientWidth api 사용 예제
        this.Button25_onclick = function(obj,e)
        {
        	var clientwidth = Eco.XComp.PositionSize.getClientWidth(this.Div08);
        	this.st_10_result02.set_text( "(number) " + clientwidth  );
        	trace(clientwidth);
        }

        // 11.1 getClientHeight api 사용 예제
        this.Button26_onclick = function(obj,e)
        {
        	var clientheight = Eco.XComp.PositionSize.getClientHeight(this.Div07);
        	this.st_11_result01.set_text( "(number) " + clientheight  );
        	trace(clientheight);
        }

        // 11.2 getClientHeight api 사용 예제
        this.Button27_onclick = function(obj,e)
        {
        	var clientheight = Eco.XComp.PositionSize.getClientHeight(this.Div08);
        	this.st_11_result02.set_text( "(number) " + clientheight  );
        	trace(clientheight);
        }

        // 12.1 getScrollWidth api 사용 예제
        this.Button28_onclick = function(obj,e)
        {
        	this.Div07.hscrollbar.getSetter("pos").set(this.Div07.hscrollbar.max);

        	var scrollwidth = Eco.XComp.PositionSize.getScrollWidth(this.Div07);
        	this.st_12_result01.set_text( "(number) " + scrollwidth  );
        	trace(scrollwidth);
        }

        // 12.2 getScrollWidth api 사용 예제
        this.Button29_onclick = function(obj,e)
        {
        	var scrollwidth = Eco.XComp.PositionSize.getScrollWidth(this.Div08);
        	this.st_12_result02.set_text( "(number) " + scrollwidth  );
        	trace(scrollwidth);
        }

        // 13.1 getScrollHeight api 사용 예제
        this.Button30_onclick = function(obj,e)
        {
         	this.Div07.vscrollbar.getSetter("pos").set(this.Div07.vscrollbar.max);
         	
        	var scrollheight = Eco.XComp.PositionSize.getScrollHeight(this.Div07);
        	this.st_13_result01.set_text( "(number) " + scrollheight );
        	trace(scrollheight);
        }

        // 13.2 getScrollHeight api 사용 예제
        this.Button31_onclick = function(obj,e)
        {
        	var scrollheight = Eco.XComp.PositionSize.getScrollHeight(this.Div08);
        	this.st_13_result02.set_text( "(number) " + scrollheight );
        	trace(scrollheight);
        }

        // 14.1 getPopupPosition api 사용 예제
        this.Button32_onclick = function(obj,e)
        {
        	var w = 44;
        	var h = 23;
        	var position = Eco.XComp.PositionSize.getPopupPosition(this.btn_pop, w, h, "vert", 2);
        	
        	this.st_14_result01.set_text( "(array) " + position );
        	
        	this.testPopup(w, h, position);
        }

        this.testPopup = function(w,h,position)
        {
        	//screen 영역을 초과하는 공간을 요청하면,표시가능 x,y좌표 및 size를 반환한다.
        	if(position.length > 3)
        	{
        		w = position[3]; //표시가능한 width 
        		h = position[4]; //표시가능한 height
        		
        		this.PopupDiv00.resize(w, h);
        	}

        	this.PopupDiv00.trackPopup(position[1], position[2], w, h);	
        }

        // 14.2 getPopupPosition api 사용 예제
        this.Button33_onclick = function(obj,e)
        {
        	var w = 200;
        	var h = 600;
        	var position = Eco.XComp.PositionSize.getPopupPosition(this.btn_pop, w, h, "vert", 2);
        	
        	this.st_14_result02.set_text( "(array) " + position );
        	
        	this.testPopup(w, h, position);
        }

        // 14.3 getPopupPosition api 사용 예제
        this.Button34_onclick = function(obj,e)
        {
        	var w = 1000;
        	var h = 200;
        	var position = Eco.XComp.PositionSize.getPopupPosition(this.btn_pop, w, h, "horz", 2);
        	
        	this.st_14_result03.set_text( "(array) " + position );
        	
        	this.testPopup(w, h, position);
        }

        // 14.4 getPopupPosition api 사용 예제
        this.Button35_onclick = function(obj,e)
        {
        	var w = 1000;
        	var h = 600;
        	var position = Eco.XComp.PositionSize.getPopupPosition(this.btn_pop, w, h, "horz", 2);
        	
        	this.st_14_result04.set_text( "(array) " + position );
        	
        	this.testPopup(w, h, position);
        }

        // 14.5 getPopupPosition api 사용 예제
        this.Button36_onclick = function(obj,e)
        {
        	var w = 2000;
        	var h = 800;
        	var position = Eco.XComp.PositionSize.getPopupPosition(this.btn_pop, w, h, "horz", 2);
        	
        	this.st_14_result05.set_text( "(array) " + position );
        	
        	this.testPopup(w, h, position);
        }

        

        

        // 14.6 getPopupPosition api 사용 예제
        this.Button38_onclick = function(obj,e)
        {
        	var w = 160;
        	var h = 60;
        	var position = Eco.XComp.PositionSize.getPopupPosition(this.Div09.Button00, w, h, "vert", 2);
        	
        	this.st_14_result06.set_text( "(array) " + position );
        	
        	//screen 영역을 초과하는 공간을 요청하면,표시가능 x,y좌표 및 size를 반환한다.
        	if(position.length > 3)
        	{
        		w = position[3]; //표시가능한 width 
        		h = position[4]; //표시가능한 height
        		
        		this.Div09.PopupDiv00.resize(w, h);
        	}

        	this.Div09.PopupDiv00.trackPopup(position[1], position[2], w, h);	
        }

        // 14.7 getPopupPosition api 사용 예제
        this.Button39_onclick = function(obj,e)
        {
        	var w = 220;
        	var h = 37;
        	var position = Eco.XComp.PositionSize.getPopupPosition(this.Tab01.tabpage1.Button02, w, h, "vert", 2);
        	
        	this.st_14_result07.set_text( "(array) " + position );
        	
        	//screen 영역을 초과하는 공간을 요청하면,표시가능 x,y좌표 및 size를 반환한다.
        	if(position.length > 3)
        	{
        		w = position[3]; //표시가능한 width 
        		h = position[4]; //표시가능한 height
        		
        		this.Tab01.tabpage1.PopupDiv00.resize(w, h);
        	}

        	this.Tab01.tabpage1.PopupDiv00.trackPopup(position[1], position[2], w, h);		
        }

        

        // 14.8 getPopupPosition api 사용 예제
        this.Button40_onclick = function(obj,e)
        {
        		var url = "Sample::PositionSizePopup.xfdl";
        		
        		var ownFrame = this.getOwnerFrame();
        		var childFrame = new ChildFrame();	
        		childFrame.init("_positionSizePopup", "absolute", 0, 0, 884,123, null, null, url);	
        		childFrame.set_openalign("center middle");		
        		childFrame.showModal("_popupChildFrame", ownFrame, {"method":"getPopupPosition"});	
        }

        //15.1 getPositionByForm api 사용 예제
        this.Button41_onclick = function(obj,e)
        {
        	var w = 160; 
        	var h = 60; 
        	var position = Eco.XComp.PositionSize.getPositionByForm(this.Div10.Button00, w, h, "vert", 2, this.Div10);
        	
        	this.st_15_result01.set_text( "(array) " + position );
        	
        	this.Div10.Static00.move(position[1], position[2], w, h);
        }

        //15.2 getPositionByForm api 사용 예제
        this.Button42_onclick = function(obj,e)
        {
        	var w = 192; 
        	var h = 30; 
        	var position = Eco.XComp.PositionSize.getPositionByForm(this.Tab2.tabpage1.Button1, w, h, "vert", 2, this.Tab2.tabpage1);
        	
        	this.st_15_result02.set_text( "(array) " + position );
        	
        	this.Tab2.tabpage1.Static1.move(position[1], position[2], w, h);	
        }

        //15.3 getPositionByForm api 사용 예제
        this.Button43_onclick = function(obj,e)
        {
        		var url = "Sample::PositionSizePopup.xfdl";
        		
        		var ownFrame = this.getOwnerFrame();
        		var childFrame = new ChildFrame();	
        		childFrame.init("_positionSizePopup", "absolute", 0, 0, 884,123, null, null, url);	
        		childFrame.set_openalign("center middle");		
        		childFrame.showModal("_popupChildFrame", ownFrame, {"method":"getPositionByForm"});	
        }

        

        

        

        

        
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.Button06.addEventHandler("onclick", this.Button06_onclick, this);
            this.Button00.addEventHandler("onclick", this.Button00_onclick, this);
            this.Button01.addEventHandler("onclick", this.Button01_onclick, this);
            this.Button04.addEventHandler("onclick", this.Button04_onclick, this);
            this.Button02.addEventHandler("onclick", this.Button02_onclick, this);
            this.Button03.addEventHandler("onclick", this.Button03_onclick, this);
            this.Button05.addEventHandler("onclick", this.Button05_onclick, this);
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
            this.btn_sample4.addEventHandler("onclick", this.Button06_onclick, this);
            this.Button21.addEventHandler("onclick", this.Button21_onclick, this);
            this.Button22.addEventHandler("onclick", this.Button22_onclick, this);
            this.Div05.Button00.addEventHandler("onclick", this.Div00_Button00_onclick, this);
            this.Div06.Div02.Button01.addEventHandler("onclick", this.Div00_Button00_onclick, this);
            this.Tab00.tabpage1.Button02.addEventHandler("onclick", this.Div00_Button00_onclick, this);
            this.Button23.addEventHandler("onclick", this.Button23_onclick, this);
            this.Button30.addEventHandler("onclick", this.Button30_onclick, this);
            this.Button24.addEventHandler("onclick", this.Button24_onclick, this);
            this.Button25.addEventHandler("onclick", this.Button25_onclick, this);
            this.Button28.addEventHandler("onclick", this.Button28_onclick, this);
            this.Button26.addEventHandler("onclick", this.Button26_onclick, this);
            this.Button27.addEventHandler("onclick", this.Button27_onclick, this);
            this.Button29.addEventHandler("onclick", this.Button29_onclick, this);
            this.Button31.addEventHandler("onclick", this.Button31_onclick, this);
            this.Button35.addEventHandler("onclick", this.Button35_onclick, this);
            this.Button33.addEventHandler("onclick", this.Button33_onclick, this);
            this.Button32.addEventHandler("onclick", this.Button32_onclick, this);
            this.Button34.addEventHandler("onclick", this.Button34_onclick, this);
            this.Button36.addEventHandler("onclick", this.Button36_onclick, this);
            this.Button40.addEventHandler("onclick", this.Button40_onclick, this);
            this.Button38.addEventHandler("onclick", this.Button38_onclick, this);
            this.Button39.addEventHandler("onclick", this.Button39_onclick, this);
            this.Button41.addEventHandler("onclick", this.Button41_onclick, this);
            this.Tab2.tabpage1.Button1.addEventHandler("onclick", this.Div00_Button00_onclick, this);
            this.Button42.addEventHandler("onclick", this.Button42_onclick, this);
            this.Button43.addEventHandler("onclick", this.Button43_onclick, this);

        };

        this.loadIncludeScript("PositionSize.xfdl");

       
    };
}
)();
