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
                this.set_name("object");
                this.set_classname("object");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,1024,2244);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_users", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_horz", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_vert", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"name\" type=\"STRING\" size=\"256\"/><Column id=\"value\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_vert1", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"name\" type=\"STRING\" size=\"256\"/><Column id=\"value\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"name\">basic</Col><Col id=\"value\">A</Col></Row><Row><Col id=\"name\">string</Col><Col id=\"value\">가</Col></Row><Row><Col id=\"name\">int</Col><Col id=\"value\">10</Col></Row><Row><Col id=\"name\">float</Col><Col id=\"value\">0.8</Col></Row><Row><Col id=\"name\">bool</Col><Col id=\"value\">true</Col></Row></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_horz1", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"basic\" type=\"STRING\" size=\"256\"/><Column id=\"string\" type=\"STRING\" size=\"256\"/><Column id=\"int\" type=\"STRING\" size=\"256\"/><Column id=\"float\" type=\"STRING\" size=\"256\"/><Column id=\"bool\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"basic\">A</Col><Col id=\"string\">가</Col><Col id=\"int\">10</Col><Col id=\"float\">0.8</Col><Col id=\"bool\">true</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Static("Static01", "absolute", "20", "39", "212", "173", null, null, this);
            obj.set_taborder("0");
            obj.set_text("1. getServiceArgumenets");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static00", "absolute", "231", "39", "370", "77", null, null, this);
            obj.set_taborder("1");
            obj.set_text("(object) ⇒ ({a: 1, b: \"2\", code: edt_arg})\r\n\r\n");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button00", "absolute", "535", "67", "56", "22", null, null, this);
            obj.set_taborder("2");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_result01", "absolute", "600", "39", "404", "77", null, null, this);
            obj.set_taborder("3");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static06", "absolute", "231", "0", "370", "40", null, null, this);
            obj.set_taborder("4");
            obj.set_text("Arguments:  ( Type ) ⇒ ( Value )");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static07", "absolute", "20", "0", "212", "40", null, null, this);
            obj.set_taborder("5");
            obj.set_text("Method");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static08", "absolute", "600", "0", "404", "40", null, null, this);
            obj.set_taborder("6");
            obj.set_text("Result: (Type) Vaule");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static02", "absolute", "231", "115", "370", "45", null, null, this);
            obj.set_taborder("7");
            obj.set_text("(object) ⇒ ({colors: ['red', 'green', edt_arg]})");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button01", "absolute", "535", "127", "56", "22", null, null, this);
            obj.set_taborder("8");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_result02", "absolute", "600", "115", "404", "45", null, null, this);
            obj.set_taborder("9");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static03", "absolute", "20", "211", "212", "53", null, null, this);
            obj.set_taborder("10");
            obj.set_text("2. getServiceDatasets");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static04", "absolute", "231", "159", "370", "53", null, null, this);
            obj.set_taborder("11");
            obj.set_text("(object) ⇒ \r\n({a: 1, b: {b1: \"2\", b2: \"3\"}, code: edt_arg})");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button02", "absolute", "535", "175", "56", "22", null, null, this);
            obj.set_taborder("12");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_result03", "absolute", "600", "159", "404", "53", null, null, this);
            obj.set_taborder("13");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static05", "absolute", "20", "263", "212", "383", null, null, this);
            obj.set_taborder("14");
            obj.set_text("3. Each");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static09", "absolute", "231", "211", "370", "53", null, null, this);
            obj.set_taborder("15");
            obj.set_text("(object) ⇒ \r\n({input: ds_users, input1: \"ds_info\"})");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button03", "absolute", "535", "227", "56", "22", null, null, this);
            obj.set_taborder("16");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_2_result01", "absolute", "600", "211", "404", "53", null, null, this);
            obj.set_taborder("17");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static11", "absolute", "231", "263", "370", "149", null, null, this);
            obj.set_taborder("18");
            obj.set_text("(object, function, object) ⇒ \r\n({code: edt_code, userId: edt_userid, name: edt_name}, \r\nfunction(prop, val, object) {\r\n    var result = prop + \":\" + val.value;\r\n    st_result03.text += result + \"  \";\r\n    trace(result);\r\n}, this)\r\n\r\n\r\n");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button04", "absolute", "535", "326", "56", "22", null, null, this);
            obj.set_taborder("19");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result01", "absolute", "600", "263", "404", "149", null, null, this);
            obj.set_taborder("20");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static13", "absolute", "231", "411", "370", "235", null, null, this);
            obj.set_taborder("21");
            obj.set_text("(object, function, object) ⇒ \r\n({code: \"001\", userId: \"\", name: \"pete\"}, \r\nfunction(prop, val, object) {\r\n    var result = \"\";\r\n    if ( !val )\r\n    {\r\n        result = prop + \" must have not a non-empty value!\"\r\n        st_result03.text += result;\r\n        trace(result);\r\n        return false;\r\n    }\r\n    result = prop + \":\" + val;\r\n    st_result03.text += result + \"  \";\r\n    trace(result);\r\n}, this)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button05", "absolute", "535", "543", "56", "22", null, null, this);
            obj.set_taborder("22");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result02", "absolute", "600", "411", "404", "235", null, null, this);
            obj.set_taborder("23");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_arg", "absolute", "371", "78", "124", "24", null, null, this);
            obj.set_taborder("24");
            obj.set_value("edt_arg_value");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_userid", "absolute", "368", "375", "100", "24", null, null, this);
            obj.set_taborder("25");
            obj.set_value("userid_value");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_name", "absolute", "472", "375", "94", "24", null, null, this);
            obj.set_taborder("26");
            obj.set_value("name_value");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_code", "absolute", "272", "375", "92", "24", null, null, this);
            obj.set_taborder("27");
            obj.set_value("code_value");
            this.addChild(obj.name, obj);

            obj = new Static("Static10", "absolute", "20", "645", "212", "327", null, null, this);
            obj.set_taborder("29");
            obj.set_text("4. merge");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static12", "absolute", "231", "645", "370", "327", null, null, this);
            obj.set_taborder("30");
            obj.set_text("(object, object, object, object, function, object) ⇒\r\n(datas01, datas02, datas03, datas04, \r\nfunction(prop, val, object) {\r\n    switch ( prop )\r\n    {   \r\n        case \"code\" :\r\n            if ( !object[\"code\"] ) object[\"code\"] = [];\r\n            object[\"code\"].push(val);\r\n            return false;\r\n        case \"value\" :\r\n            if ( !object[\"value\"] ) object[\"value\"] = [];\r\n            object[\"value\"].push(val);\r\n            return false;\r\n    }\r\n}, this);\r\n----------------------------------------------------------\r\nvar datas01 = {\"id\": edt_id, \"id_1\": edt_id1};\r\nvar datas02 = {\"name\": edt_nm, \"name_1\": edt_nm1};\r\nvar datas03 = {\"code\": edt_cd, \"value\": edt_val};\r\nvar datas04 = {\"code\": edt_cd, \"value\": edt_val};\r\n\r\n\r\n");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button06", "absolute", "535", "809", "56", "22", null, null, this);
            obj.set_taborder("31");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_4_result01", "absolute", "600", "645", "404", "327", null, null, this);
            obj.set_taborder("32");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static14", "absolute", "231", "971", "370", "53", null, null, this);
            obj.set_taborder("33");
            obj.set_text("(object, object) ⇒ \r\n(target, {a: 1, b: \"2\", c: {\"A\": \"3\", \"B\": 4}})");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button07", "absolute", "535", "986", "56", "22", null, null, this);
            obj.set_taborder("34");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_5_result01", "absolute", "600", "971", "404", "53", null, null, this);
            obj.set_taborder("35");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static15", "absolute", "20", "971", "212", "53", null, null, this);
            obj.set_taborder("36");
            obj.set_text("5. copyProperties");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static16", "absolute", "231", "1023", "370", "53", null, null, this);
            obj.set_taborder("37");
            obj.set_text("(object, object) ⇒ ({\"id1\": \"banana\"}, \r\n{\"id\": \"kiwi\", \"id1\": \"apple\", \"id2\": \"lemon\"})");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button08", "absolute", "535", "1039", "56", "22", null, null, this);
            obj.set_taborder("38");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_6_result01", "absolute", "600", "1023", "404", "53", null, null, this);
            obj.set_taborder("39");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static17", "absolute", "20", "1023", "212", "221", null, null, this);
            obj.set_taborder("40");
            obj.set_text("6. copyPropertiesIf");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static18", "absolute", "231", "1075", "370", "169", null, null, this);
            obj.set_taborder("41");
            obj.set_text("(object, object) ⇒ ({\"id1\": \"banana\"}, \r\n{\"id\": \"kiwi\", \"id1\": \"apple\", \"id2\": \"lemon\"},\r\nfunction(prop, val, object) {\r\n    if (prop == \"id1\")\r\n    {\r\n        return false;\r\n    }\r\nreturn true;\r\n}\r\n, this)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button09", "absolute", "535", "1148", "56", "22", null, null, this);
            obj.set_taborder("42");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_6_result02", "absolute", "600", "1075", "404", "169", null, null, this);
            obj.set_taborder("43");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_id", "absolute", "259", "931", "31", "24", null, null, this);
            obj.set_taborder("44");
            obj.set_value("id");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_id1", "absolute", "291", "931", "34", "24", null, null, this);
            obj.set_taborder("45");
            obj.set_value("id1");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_nm", "absolute", "326", "931", "35", "24", null, null, this);
            obj.set_taborder("46");
            obj.set_value("nm");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_nm1", "absolute", "362", "931", "35", "24", null, null, this);
            obj.set_taborder("47");
            obj.set_value("nm1");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_cd", "absolute", "398", "931", "31", "24", null, null, this);
            obj.set_taborder("48");
            obj.set_value("cd");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_val", "absolute", "430", "931", "33", "24", null, null, this);
            obj.set_taborder("49");
            obj.set_value("val");
            this.addChild(obj.name, obj);

            obj = new Static("Static19", "absolute", "20", "1243", "212", "77", null, null, this);
            obj.set_taborder("50");
            obj.set_text("7. getValues");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static20", "absolute", "231", "1243", "370", "77", null, null, this);
            obj.set_taborder("51");
            obj.set_text("(object) ⇒ \r\n({\"id\": \"kiwi\", \"id1\": \"apple\", code: edt_arg})\r\n\r\n");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button10", "absolute", "535", "1271", "56", "22", null, null, this);
            obj.set_taborder("52");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_7_result01", "absolute", "600", "1243", "404", "77", null, null, this);
            obj.set_taborder("53");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static21", "absolute", "231", "1319", "370", "53", null, null, this);
            obj.set_taborder("54");
            obj.set_text("(object) ⇒ \r\n({\"id\": \"kiwi\", \"id1\": \"apple\", code: edt_arg})");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button11", "absolute", "535", "1334", "56", "22", null, null, this);
            obj.set_taborder("55");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_8_result01", "absolute", "600", "1319", "404", "53", null, null, this);
            obj.set_taborder("56");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static22", "absolute", "20", "1319", "212", "53", null, null, this);
            obj.set_taborder("57");
            obj.set_text("8. getPropertyNames");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static23", "absolute", "231", "1371", "370", "53", null, null, this);
            obj.set_taborder("58");
            obj.set_text("(object) ⇒ \r\n({\"id\": \"kiwi\", \"id1\": \"apple\", code: edt_arg})");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button12", "absolute", "535", "1387", "56", "22", null, null, this);
            obj.set_taborder("59");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_9_result01", "absolute", "600", "1371", "404", "53", null, null, this);
            obj.set_taborder("60");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static24", "absolute", "20", "1371", "212", "53", null, null, this);
            obj.set_taborder("61");
            obj.set_text("9. getSize");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static25", "absolute", "231", "1423", "370", "59", null, null, this);
            obj.set_taborder("62");
            obj.set_text("(object, object) ⇒ ({\"id\": \"kiwi\", \"id1\": \"apple\"}, {\"id\": \"kiwi\", \"id1\": \"apple\"})");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button13", "absolute", "535", "1454", "56", "22", null, null, this);
            obj.set_taborder("63");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_10_result01", "absolute", "600", "1423", "404", "59", null, null, this);
            obj.set_taborder("64");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_arg00", "absolute", "387", "1285", "124", "24", null, null, this);
            obj.set_taborder("65");
            obj.set_value("edt_arg_value");
            this.addChild(obj.name, obj);

            obj = new Static("Static26", "absolute", "20", "1423", "212", "59", null, null, this);
            obj.set_taborder("66");
            obj.set_text("10. equal");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static27", "absolute", "231", "1481", "370", "53", null, null, this);
            obj.set_taborder("67");
            obj.set_text("(object) ⇒ \r\n({\"id\": \"kiwi\", \"id1\": \"apple\", code: edt_arg})");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button14", "absolute", "535", "1497", "56", "22", null, null, this);
            obj.set_taborder("68");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_11_result01", "absolute", "600", "1481", "404", "53", null, null, this);
            obj.set_taborder("69");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static28", "absolute", "20", "1481", "212", "53", null, null, this);
            obj.set_taborder("70");
            obj.set_text("11. getArray");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static29", "absolute", "231", "1533", "370", "91", null, null, this);
            obj.set_taborder("71");
            obj.set_text("(object, dataset, string) ⇒ \r\n({\"basic\": \"A\", \"string\": \"가\", \"int\": 10, \r\n\"float\": 0.8, \"bool\": true}, ds_horz, \"horz\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button15", "absolute", "535", "1568", "56", "22", null, null, this);
            obj.set_taborder("72");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_12_result01", "absolute", "600", "1533", "404", "91", null, null, this);
            obj.set_taborder("73");
            obj.set_cssclass("WFDA_sta_BoxR");
            obj.style.set_align("left top");
            this.addChild(obj.name, obj);

            obj = new Static("Static30", "absolute", "20", "1533", "212", "282", null, null, this);
            obj.set_taborder("74");
            obj.set_text("12. toDataset");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Grid("grd_tods", "absolute", "627", "1558", "279", "56", null, null, this);
            obj.set_taborder("75");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("Static31", "absolute", "231", "1623", "370", "192", null, null, this);
            obj.set_taborder("76");
            obj.set_text("(object, dataset, string) ⇒ \r\n({\"basic\": \"A\", \"string\": \"가\", \"int\": 10, \r\n\"float\": 0.8, \"bool\": true}, ds_vert, \"vert\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button16", "absolute", "535", "1658", "56", "22", null, null, this);
            obj.set_taborder("77");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_12_result02", "absolute", "600", "1623", "404", "192", null, null, this);
            obj.set_taborder("78");
            obj.set_cssclass("WFDA_sta_BoxR");
            obj.style.set_align("left top");
            this.addChild(obj.name, obj);

            obj = new Grid("grd_todsv", "absolute", "627", "1648", "217", "154", null, null, this);
            obj.set_taborder("79");
            obj.set_binddataset("ds_vert");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row band=\"head\" size=\"24\"/><Row band=\"body\" size=\"24\"/></Rows><Band id=\"head\"><Cell col=\"0\" disptype=\"normal\" text=\"name\"/><Cell col=\"1\" disptype=\"normal\" text=\"value\"/></Band><Band id=\"body\"><Cell col=\"0\" disptype=\"normal\" text=\"bind:name\"/><Cell col=\"1\" disptype=\"normal\" text=\"bind:value\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("Static32", "absolute", "231", "1814", "370", "149", null, null, this);
            obj.set_taborder("80");
            obj.set_text("(object, dataset, string) ⇒ \r\n(info, ds_horz1, \"horz\")\r\n\r\ndataset: ds_horz1\r\n\r\n\r\n\r\n\r\n");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button17", "absolute", "535", "1857", "56", "22", null, null, this);
            obj.set_taborder("81");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_13_result01", "absolute", "600", "1814", "404", "149", null, null, this);
            obj.set_taborder("82");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static33", "absolute", "231", "1962", "370", "245", null, null, this);
            obj.set_taborder("83");
            obj.set_text("(object, dataset, string) ⇒ \r\n(info, ds_vert1, \"vert\")\r\n\r\ndataset: ds_vert1\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button18", "absolute", "535", "2073", "56", "22", null, null, this);
            obj.set_taborder("84");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_13_result02", "absolute", "600", "1962", "404", "245", null, null, this);
            obj.set_taborder("85");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Grid("grd_tods00", "absolute", "248", "1887", "306", "56", null, null, this);
            obj.set_taborder("86");
            obj.set_binddataset("ds_horz1");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row band=\"head\" size=\"24\"/><Row band=\"body\" size=\"24\"/></Rows><Band id=\"head\"><Cell col=\"0\" disptype=\"normal\" text=\"basic\"/><Cell col=\"1\" disptype=\"normal\" text=\"string\"/><Cell col=\"2\" disptype=\"normal\" text=\"int\"/><Cell col=\"3\" disptype=\"normal\" text=\"float\"/><Cell col=\"4\" disptype=\"normal\" text=\"bool\"/></Band><Band id=\"body\"><Cell col=\"0\" disptype=\"normal\" text=\"bind:basic\"/><Cell col=\"1\" disptype=\"normal\" text=\"bind:string\"/><Cell col=\"2\" disptype=\"normal\" text=\"bind:int\"/><Cell col=\"3\" disptype=\"normal\" text=\"bind:float\"/><Cell col=\"4\" disptype=\"normal\" text=\"bind:bool\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Grid("grd_todsv00", "absolute", "252", "2037", "228", "154", null, null, this);
            obj.set_taborder("87");
            obj.set_binddataset("ds_vert1");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row band=\"head\" size=\"24\"/><Row band=\"body\" size=\"24\"/></Rows><Band id=\"head\"><Cell col=\"0\" disptype=\"normal\" text=\"name\"/><Cell col=\"1\" disptype=\"normal\" text=\"value\"/></Band><Band id=\"body\"><Cell col=\"0\" disptype=\"normal\" text=\"bind:name\"/><Cell col=\"1\" disptype=\"normal\" text=\"bind:value\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("Static34", "absolute", "20", "1814", "212", "393", null, null, this);
            obj.set_taborder("88");
            obj.set_text("13. fromDataset");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 1024, 2244, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("object");
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("object.xfdl", function() {
        /*
         * Eco.object api Sample at nexacro
         * 
         * Copyright (c) 2014 EcoSystem of TOBESOFT
         * Licensed Free under nexacro.
        */

        // 1.1 getServiceArgumenets api 사용 예제
        this.Button00_onclick = function(obj,e)
        {
        	var result = Eco.object.getServiceArgumenets({a: 1, b: "2", code:this.edt_arg});
        	this.st_1_result01.set_text( "(string) " + result );
        	trace(result);
        	//transaction("test", "http://www.xplatform.co.kr:8080/Next_JSP/XFShowcase/JSP/Common/searchMenu.jsp", "", "", result, "");
        }

        // 1.2 getServiceArgumenets api 사용 예제
        this.Button01_onclick = function(obj,e)
        {
        	var result = Eco.object.getServiceArgumenets({colors: ['red', 'green', this.edt_arg]});
        	this.st_1_result02.set_text( "(string) " + result );
        	trace(result);
        	//transaction("test", "http://www.xplatform.co.kr:8080/Next_JSP/XFShowcase/JSP/Common/searchMenu.jsp", "", "", result, "");
        }

        // 1.3 getServiceArgumenets api 사용 예제
        this.Button02_onclick = function(obj,e)
        {
        	var result = Eco.object.getServiceArgumenets({a: 1, b: {b1: "2", b2: "3"}, code: this.edt_arg});
        	this.st_1_result03.set_text( "(string) " + result );
        	trace(result);
        	//transaction("test", "http://www.xplatform.co.kr:8080/Next_JSP/XFShowcase/JSP/Common/searchMenu.jsp", "", "", result, "");
        }

        // 2.1 getServiceDatasets api 사용 예제
        this.Button03_onclick = function(obj,e)
        {
        	var result = Eco.object.getServiceDatasets({input: this.ds_users, input1: "ds_info"});
        	this.st_2_result01.set_text( "(string) " + result );
        	trace(result);
        	//transaction("test", "http://www.xplatform.co.kr:8080/Next_JSP/XFShowcase/JSP/Common/searchMenu.jsp", "", "", result, "");
        }

        // 3.1 Each api 사용 예제
        this.Button04_onclick = function(obj,e)
        {
        	var datas = {code: this.edt_code, userId: this.edt_userid, name: this.edt_name};
        	this.st_3_result01.set_text( "" );
        	
        	Eco.object.Each(datas, function(prop, val, object) {
        		var result = prop + ":" + val.value;
        		this.st_3_result01.getSetter("text").addset( result + "  " );
        		trace(result);
        	}, this);
        }

        // 3.2 Each api 사용 예제
        this.Button05_onclick = function(obj,e)
        {
        	var datas = {code: "001", userId: "", name: "pete"};
        	this.st_3_result02.set_text( "" );
        	
        	Eco.object.Each(datas, function(prop, val, object) {
        		var result = "";
        		if ( !val )
        		{
        			result = prop + " must have not a non-empty value!"
        			this.st_3_result02.getSetter("text").addset( result );
        			trace(result);
        			return false;
        		}
        		result = prop + ":" + val;
        		this.st_3_result02.getSetter("text").addset( result + "  " );
        		trace(result);
        	}, this);
        }

        // 4.1 merge api 사용 예제
        this.Button06_onclick = function(obj,e)
        {
        	var datas01 = {"id": this.edt_id, "id_1": this.edt_id1};
            var datas02 = {"name": this.edt_nm, "name_1": this.edt_nm1};
            var datas03 = {"code": this.edt_cd, "value": this.edt_val};
            var datas04 = {"code": this.edt_cd, "value": this.edt_val};

            var result = Eco.object.merge(datas01, datas02, datas03, datas04, function(prop, val, object) {
        		switch ( prop )
        		{
        			case "code" :
        				if ( !object["code"] ) object["code"] = [];
        				object["code"].push(val);
        				return false;
        			case "value" :
        				if ( !object["value"] ) object["value"] = [];
        				object["value"].push(val);
        				return false;
        		}
            }, this);

        	
        	this.st_4_result01.set_text( "" );
        	
        	Eco.object.Each(result, function(prop, val, object) {
        	
        		if (Eco.isArray(val))
        		{
        			for (var i=0; i<val.length; i++)
        			{
        				this.st_4_result01.getSetter("text").addset( prop + "[" + i + "]: " + val[i].name + "\n" );
        				trace(prop + "[" + i + "]:" + val[i].name);
        			}
        		}
        		else
        		{
        			this.st_4_result01.getSetter("text").addset( prop + ": " + val.name + "\n" );
        			trace(prop + ":" + val.name);
        		}
        	}, this);
        }

        // 5.1 copyProperties api 사용 예제
        this.Button07_onclick = function(obj,e)
        {
        	var target = {};
        	Eco.object.copyProperties(target, {a: 1, b: "2", c: {"A": "3", "B": 4}});
        	
        	this.st_5_result01.set_text( "" );

        	Eco.object.Each(target, function(prop, val, object) {
        		var result = prop + ":" + val;
        		this.st_5_result01.getSetter("text").addset( result + "  " );
        		trace(result);
        	}, this);
        }

        // 6.1 copyPropertiesIf api 사용 예제
        this.Button08_onclick = function(obj,e)
        {
        	var target = {"id1": "banana"};
        	Eco.object.copyPropertiesIf(target, {"id": "kiwi", "id1": "apple", "id2": "lemon"});
        	
        	this.st_6_result01.set_text("");
        	
        	Eco.object.Each(target, function(prop, val, object) {
        		var result = prop + ":" + val;
        		this.st_6_result01.getSetter("text").addset( result + "  " );
        		trace(result);
        	}, this);
        }

        // 6.2 copyPropertiesIf api 사용 예제
        this.Button09_onclick = function(obj,e)
        {
        	var target = {"id1": "banana"};
        	Eco.object.copyPropertiesIf(target, {"id": "kiwi", "id1": "apple", "id2": "lemon"}, function(prop, val, object) {
        		if (prop == "id1")
        		{
        			return false;
        		}
        		return true;
        	}
        	, this);

        	this.st_6_result02.set_text( "" );
        	
        	Eco.object.Each(target, function(prop, val, object) {
        		var result = prop + ":" + val;
        		this.st_6_result02.getSetter("text").addset( result + "  " );
        		trace(result);
        	}, this);	
        }

        // 7.1 merge api 사용 예제
        this.Button10_onclick = function(obj,e)
        {
        	var result = Eco.object.getValues({"id": "kiwi", "id1": "apple", code: this.edt_arg});
        	this.st_7_result01.set_text( "(array) [" + result + "]" );
        	trace(result);
        }

        // 8.1 getPropertyNames api 사용 예제
        this.Button11_onclick = function(obj,e)
        {
        	var result = Eco.object.getPropertyNames({"id": "kiwi", "id1": "apple", code: this.edt_arg});
        	this.st_8_result01.set_text( "(array) [" + result + "]" );
        	trace(result);
        }

        // 9.1 copyPropertiesIf api 사용 예제
        this.Button12_onclick = function(obj,e)
        {
        	var result = Eco.object.getSize({"id": "kiwi", "id1": "apple", code: this.edt_arg});
        	this.st_9_result01.set_text( "(number) " + result );
        	trace(result);
        }

        // 10.1 equal api 사용 예제
        this.Button13_onclick = function(obj,e)
        {
        	var result = Eco.object.equal({"id": "kiwi", "id1": "apple"}, {"id": "kiwi", "id1": "apple"});
        	this.st_10_result01.set_text( "(boolean) " + result );
        	trace(result);	
        }

        // 11.1 getArray api 사용 예제
        this.Button14_onclick = function(obj,e)
        {
        	var result = Eco.object.getArray({"id": "kiwi", "id1": "apple", code: this.edt_arg});
        	this.st_11_result01.set_text( "(array) [ " );
        	for (var i=0, len=result.length; i<len; i++)
        	{
        		Eco.object.Each(result[i], function(prop, val, object) {
        			this.st_11_result01.getSetter("text").addset("{" + prop + ":" + val);
        			if (i==(len-1)) this.st_11_result01.getSetter("text").addset("}  ");
        			else this.st_11_result01.getSetter("text").addset("}, ");
        			trace(prop + ":" + val);
        		}, this);	
        	}
        	this.st_11_result01.getSetter("text").addset( "]" );
        }

        // 12.1 toDataset api 사용 예제
        this.Button15_onclick = function(obj,e)
        {
        	var info = { 
        		"basic": "A",
        		"string": "가",
        		"int": 10,
        		"float": 0.8,
        		"bool": true
        	};
        	
        	this.ds_horz.clear();
        	Eco.object.toDataset(info, this.ds_horz, "horz");
        	
        	for (var i=this.grd_tods.getFormatColCount()-1; i>-1; i--) {
        		this.grd_tods.deleteContentsCol(i);
        	}
        	
        	for (var i=this.grd_tods.getFormatRowCount()-1; i>-1; i--) {
        		this.grd_tods.deleteContentsRow(i);
        	}
        	
        	this.grd_tods.appendContentsRow("head");
        	this.grd_tods.appendContentsRow("body");
        	
        	for (var i=0, len=this.ds_horz.getColCount(); i<len; i++)
        	{
        		this.grd_tods.appendContentsCol();
        		this.grd_tods.setFormatColProperty(i,"size",40);
        		
        		var colinfo = this.ds_horz.getColumnInfo(i);
        		this.grd_tods.setCellProperty("head", i, "text", colinfo.name);
        		this.grd_tods.setCellProperty("body", i, "text", "bind:" + colinfo.name);
        	}
        	this.grd_tods.set_binddataset("ds_horz");
        	
        	this.st_12_result01.set_text( "(dataset) ds_horz" );
        	trace(this.ds_horz.saveXML());
        }

        // 12.2 toDataset api 사용 예제
        this.Button16_onclick = function(obj,e)
        {
        	var info = { 
        		"basic": "A",
        		"string": "가",
        		"int": 10,
        		"float": 0.8,
        		"bool": true
        	};
        	
        	this.ds_vert.clearData();
        	Eco.object.toDataset(info, this.ds_vert, "vert");
        	
        	this.st_12_result02.set_text( "(dataset) ds_vert" );
        	trace(this.ds_vert.saveXML());
        }

        // 13.1 fromDataset api 사용 예제
        this.Button17_onclick = function(obj,e)
        {
        	var info = {};
        	Eco.object.fromDataset(info, this.ds_horz1, "horz");
        	
        	this.st_13_result01.set_text( "(object) " );
        	
        	Eco.object.Each(info, function(prop, val, object) {
        		this.st_13_result01.getSetter("text").addset( prop + ":" + val + "  " );
        		trace(prop + ":" + val);
        	}, this);
        }

        // 13.2 fromDataset api 사용 예제
        this.Button18_onclick = function(obj,e)
        {
        	var info = {};
        	Eco.object.fromDataset(info, this.ds_vert1, "vert");
        	
        	this.st_13_result02.set_text( "(object) " );
        	
        	Eco.object.Each(info, function(prop, val, object) {
        		this.st_13_result02.getSetter("text").addset( prop + ":" + val + "  " );
        		trace(prop + ":" + val);
        	}, this);
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

        };

        this.loadIncludeScript("object.xfdl");

       
    };
}
)();
