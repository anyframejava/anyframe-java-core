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
                this.set_name("Namespace");
                this.set_classname("Namespace");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,1024,5260);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("Static01", "absolute", "20", "39", "196", "145", null, null, this);
            obj.set_taborder("0");
            obj.set_text("1. exist");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static00", "absolute", "215", "39", "370", "37", null, null, this);
            obj.set_taborder("1");
            obj.set_text("(string) ⇒ (\"Eco\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button00", "absolute", "519", "46", "56", "22", null, null, this);
            obj.set_taborder("2");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_result01", "absolute", "584", "39", "420", "37", null, null, this);
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

            obj = new Static("Static02", "absolute", "215", "75", "370", "37", null, null, this);
            obj.set_taborder("7");
            obj.set_text("(string) ⇒ (\"Eco.array\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button01", "absolute", "519", "82", "56", "22", null, null, this);
            obj.set_taborder("8");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_result02", "absolute", "584", "75", "420", "37", null, null, this);
            obj.set_taborder("9");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static03", "absolute", "215", "111", "370", "37", null, null, this);
            obj.set_taborder("10");
            obj.set_text("(string) ⇒ (\"Eco.sample\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button02", "absolute", "519", "118", "56", "22", null, null, this);
            obj.set_taborder("11");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_result03", "absolute", "584", "111", "420", "37", null, null, this);
            obj.set_taborder("12");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static04", "absolute", "215", "147", "370", "37", null, null, this);
            obj.set_taborder("13");
            obj.set_text("(string) ⇒ (\"Hello.World\")");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button03", "absolute", "519", "154", "56", "22", null, null, this);
            obj.set_taborder("14");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_result04", "absolute", "584", "147", "420", "37", null, null, this);
            obj.set_taborder("15");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static05", "absolute", "20", "183", "196", "93", null, null, this);
            obj.set_taborder("16");
            obj.set_text("2. declare");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static09", "absolute", "215", "183", "370", "93", null, null, this);
            obj.set_taborder("17");
            obj.set_text("(string, object) ⇒\r\n\r\nJsNamespace.declare(\"Hello\", {\r\n\t\t    'message':'Hello nexacro !!', \r\n\t\t    'say': function() {alert(this.message);}\r\n\t});");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button04", "absolute", "519", "190", "56", "22", null, null, this);
            obj.set_taborder("18");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_2_result01", "absolute", "584", "183", "420", "93", null, null, this);
            obj.set_taborder("19");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static10", "absolute", "20", "275", "196", "4041", null, null, this);
            obj.set_taborder("20");
            obj.set_text("3. declareClass");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static11", "absolute", "215", "275", "370", "141", null, null, this);
            obj.set_taborder("21");
            obj.set_text("(string, object) ⇒\r\n\r\nJsNamespace.declareClass(\"Sample.Person1\",{\r\n    properties: {\r\n        name: {}\r\n    }\r\n});");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result01", "absolute", "584", "275", "420", "141", null, null, this);
            obj.set_taborder("22");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Button("Button05", "absolute", "519", "282", "56", "22", null, null, this);
            obj.set_taborder("23");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static12", "absolute", "215", "415", "370", "141", null, null, this);
            obj.set_taborder("24");
            obj.set_text("(string, object) ⇒\r\n\r\nJsNamespace.declareClass(\"Sample.Person2\",{\r\n    properties: {\r\n        name: {\r\n            value: 'Unknown'\r\n        }\r\n    }\r\n});");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button06", "absolute", "519", "422", "56", "22", null, null, this);
            obj.set_taborder("25");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result02", "absolute", "584", "415", "420", "141", null, null, this);
            obj.set_taborder("26");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static13", "absolute", "215", "555", "370", "157", null, null, this);
            obj.set_taborder("27");
            obj.set_text("(string, object) ⇒\r\n\r\nJsNamespace.declareClass(\"Sample.Person3\",{\r\n    properties: {\r\n        name: {\r\n            value: 'Unknown',\r\n            memberName: \"_name\"\r\n        }\r\n    }\r\n});");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button07", "absolute", "519", "562", "56", "22", null, null, this);
            obj.set_taborder("28");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result03", "absolute", "584", "555", "420", "157", null, null, this);
            obj.set_taborder("29");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static14", "absolute", "215", "711", "370", "213", null, null, this);
            obj.set_taborder("30");
            obj.set_text("(string, object) ⇒\r\n\r\nJsNamespace.declareClass(\"Sample.Person4\",{\r\n    properties: {\r\n        name: {\r\n            value: 'Unknown',\r\n            memberName: \"_name\",\r\n            checkValue: function(value) \r\n            {\r\n                 return value || \"Unknown\";\r\n            }\r\n        }\r\n    }\r\n});");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button08", "absolute", "519", "718", "56", "22", null, null, this);
            obj.set_taborder("31");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result04", "absolute", "584", "711", "420", "213", null, null, this);
            obj.set_taborder("32");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static15", "absolute", "215", "923", "370", "333", null, null, this);
            obj.set_taborder("33");
            obj.set_text("(string, object) ⇒\r\n\r\nJsNamespace.declareClass(\"Sample.Person5\",{\r\n    properties: {\r\n        name: {\r\n            value: 'Unknown',\r\n            memberName: \"_name\",\r\n            checkValue: function(value) \r\n            {\r\n                 return value || \"Unknown\";\r\n            },\r\n            updateValue: function(value)\r\n            {\r\n                 this._name = value;\r\n                 this._draw();\r\n            }\r\n        }\r\n    },\r\n    _draw: function()\r\n    {\r\n        alert(\"call _draw function!!!\"); \r\n    }\r\n});");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button09", "absolute", "519", "930", "56", "22", null, null, this);
            obj.set_taborder("34");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result05", "absolute", "584", "923", "420", "333", null, null, this);
            obj.set_taborder("35");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static16", "absolute", "215", "1255", "370", "413", null, null, this);
            obj.set_taborder("36");
            obj.set_text("(string, object) ⇒\r\n\r\nJsNamespace.declareClass(\"Sample.Person6\",{\r\n    properties: {\r\n        name: {\r\n            value: 'Unknown',\r\n            \"get\": function()\r\n            {\r\n                return this.name || 'Unknown';\r\n            },\r\n            \"set\": function(value)\r\n            {\r\n                value = value || 'Unknown';\r\n                if ( !Eco.equals(this.getName(), value) )\r\n                {\r\n                    this._propertyChange(\"name\", value,\tthis.getName());\r\n                    this.name = value;\r\n                    this._draw();\r\n                }\r\n             }\r\n        }\r\n    },\r\n    _draw: function()\r\n    {\r\n        alert(\"call _draw function!!!\"); \r\n    }\r\n});");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button10", "absolute", "519", "1262", "56", "22", null, null, this);
            obj.set_taborder("37");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result06", "absolute", "584", "1255", "420", "413", null, null, this);
            obj.set_taborder("38");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static17", "absolute", "215", "1667", "370", "229", null, null, this);
            obj.set_taborder("39");
            obj.set_text("(string, object) ⇒\r\n\r\nJsNamespace.declareClass(\"Sample.Person7\",{\r\n    initialize: function()\r\n    {\r\n        trace(\"Sample.Person constructor is called===>(\" + Eco.array.toArray(arguments) + \")\");\r\n        this._draw();\r\n        return this;\r\n   },\r\n    _draw: function()\r\n    {\r\n        trace(\"processing _draw function!!!\"); \r\n    }\r\n});");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button11", "absolute", "519", "1674", "56", "22", null, null, this);
            obj.set_taborder("40");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result07", "absolute", "584", "1667", "420", "229", null, null, this);
            obj.set_taborder("41");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static18", "absolute", "215", "1895", "370", "189", null, null, this);
            obj.set_taborder("42");
            obj.set_text("(string, object) ⇒\r\n\r\nJsNamespace.declareClass(\"Sample.Person8\",{\r\n    statics: {\r\n        _id: -1,\r\n        getId: function()\r\n        {\r\n            this._id++;\r\n            return this._id;\r\n        }\r\n    }\r\n});");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button12", "absolute", "519", "1902", "56", "22", null, null, this);
            obj.set_taborder("43");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result08", "absolute", "584", "1895", "420", "189", null, null, this);
            obj.set_taborder("44");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static19", "absolute", "215", "2083", "370", "749", null, null, this);
            obj.set_taborder("45");
            obj.set_text("(string, object) ⇒\r\n\r\nJsNamespace.declareClass(\"Sample.Person9\", {\t\t    properties: {\r\n        x: {\r\n                value:0,\r\n                checkValue:function(value)\r\n                {\r\n                    if ( !Eco.isNumber(value) )\r\n                    {\r\n                        return 0;\r\n                    }\r\n                    return value;\r\n                },\r\n                updateValue: function(value)\r\n                {\r\n                    this.x = value;\r\n                    this.fireEvent(\"onXYChanged\", value, this.y);\r\n                }\r\n        },\r\n        y: {\r\n            value: 0,\r\n            checkValue: function(value)\r\n            {\r\n                if ( !Eco.isNumber(value) )\r\n                {\r\n                    return 0;\r\n                }\r\n                return value;\r\n            },\r\n            updateValue: function(value)\r\n            {\r\n                this.y = value;\r\n                this.fireEvent(\"onXYChanged\", this.x, value);\r\n            }\r\n        }\r\n    },\r\n    events: {\r\n        onXYChanged: {}\r\n    },\r\n    setPosition: function(x, y)\r\n    {\r\n        x = x||0;\r\n        y = y||0;\r\n        if ( this.x != x || this.y != y )\r\n        {\r\n            this.x = x;\r\n            this.y = y;\r\n            this.fireEvent(\"onXYChanged\", x, y);\r\n        }\r\n    }\r\n});");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button13", "absolute", "519", "2090", "56", "22", null, null, this);
            obj.set_taborder("46");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result09", "absolute", "584", "2083", "420", "749", null, null, this);
            obj.set_taborder("47");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static20", "absolute", "215", "2831", "370", "933", null, null, this);
            obj.set_taborder("48");
            obj.set_text("(string, object) ⇒\r\n\r\nJsNamespace.declareClass(\"Sample.Person10\", {\t\t    properties: {\r\n        x: {\r\n                value:0,\r\n                checkValue:function(value)\r\n                {\r\n                    if ( !Eco.isNumber(value) )\r\n                    {\r\n                        return 0;\r\n                    }\r\n                    return value;\r\n                },\r\n                updateValue: function(value)\r\n                {\r\n                    this.x = value;\r\n                    this.fireEvent(\"onXYChanged\", value, this.y);\r\n                }\r\n        },\r\n        y: {\r\n            value: 0,\r\n            checkValue: function(value)\r\n            {\r\n                if ( !Eco.isNumber(value) )\r\n                {\r\n                    return 0;\r\n                }\r\n                return value;\r\n            },\r\n            updateValue: function(value)\r\n            {\r\n                this.y = value;\r\n                this.fireEvent(\"onXYChanged\", this.x, value);\r\n            }\r\n        }\r\n    },\r\n    events: {\r\n        onXYChanged: {\r\n            install: function(evtNm)\r\n            {\r\n                trace(this.name + \": \" + evtNm + \"' install is called ::: handler Cnt ==>\" +  + this.getEventHandlerLength(\"onXYChanged\"));\r\n            },\r\n            uninstall: function(evtNm)\r\n            {\r\n                trace(this.name + \": \" + evtNm + \"' uninstall is called ::: handler Cnt ==>\" +  + this.getEventHandlerLength(\"onXYChanged\"));\r\n            }\r\n        }\r\n    },\r\n    setPosition: function(x, y)\r\n    {\r\n        x = x||0;\r\n        y = y||0;\r\n        if ( this.x != x || this.y != y )\r\n        {\r\n            this.x = x;\r\n            this.y = y;\r\n            this.fireEvent(\"onXYChanged\", x, y);\r\n        }\r\n    }\r\n});");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button14", "absolute", "519", "2838", "56", "22", null, null, this);
            obj.set_taborder("49");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result10", "absolute", "584", "2831", "420", "933", null, null, this);
            obj.set_taborder("50");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static21", "absolute", "215", "3763", "370", "429", null, null, this);
            obj.set_taborder("51");
            obj.set_text("(string, object) ⇒\r\n\r\nJsNamespace.declareClass(\"Sample.Developer\", {\r\n    \"extends\": \"Sample.Person\", \r\n    properties: {\r\n        languages: {\r\n            value: ['nexacro', 'JavaScript', 'C++']\r\n        }\r\n    },\r\n    initialize: function()\r\n    {\r\n        // Apply a method from the parent class' prototype\r\n        return this.callParent(arguments);\r\n    },\r\n    canCode: function(language)\r\n    {\r\n        return Eco.array.contains(this.getLanguages(), language);\r\n    },\r\n    code: function(language)\r\n    {\r\n        if (!this.canCode(language))\r\n        {\r\n            trace(this.name + \" can't code in: \" + language);\r\n            this._resultComp.set_text(this._resultComp.text + \"\\n\" + this.name + \" can't code in: \" + language);\r\n        }\r\n    }\r\n});");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button15", "absolute", "519", "3770", "56", "22", null, null, this);
            obj.set_taborder("52");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result11", "absolute", "584", "3763", "420", "429", null, null, this);
            obj.set_taborder("53");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static22", "absolute", "215", "4191", "370", "125", null, null, this);
            obj.set_taborder("54");
            obj.set_text("(string, object) ⇒\r\n\r\nJsNamespace.declareClass(\"Sample.Developer2\", {\r\n    \"extends\": 'Sample.Person12',\r\n    statics: {\r\n        averageIQ: 120\r\n    }\r\n});");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button16", "absolute", "519", "4198", "56", "22", null, null, this);
            obj.set_taborder("55");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result12", "absolute", "584", "4191", "420", "125", null, null, this);
            obj.set_taborder("56");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static23", "absolute", "20", "4315", "196", "478", null, null, this);
            obj.set_taborder("57");
            obj.set_text("4. addMethods");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static24", "absolute", "215", "4315", "370", "478", null, null, this);
            obj.set_taborder("58");
            obj.set_text("JsNamespace.declareClass(\"Sample.Point\", {\r\n    initialize: function(x0, y0)\r\n    {\r\n        this.x = x0;\r\n        this.y = y0;\r\n        return this;\r\n    },\t\t\r\n    properties: {\r\n        x: {\r\n            value: 0\r\n        },\r\n        y: {\r\n            value: 0\r\n        }\r\n    }\r\n});\r\n\r\n(array, Class, boolean, function) ⇒\r\n\r\nvar membernames = ['round', 'ceil', 'floor', 'abs'];\r\nJsNamespace.addMethods(membernames, Sample.Point, false, \r\n    function(name) {\r\n        var script = \"return new Sample.Point(Math.\" + name + \"(this.x), Math.\" + name + \"(this.y));\";\r\n        this[name] = new Function(script);\r\n        return name;\r\n    }\r\n);");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button17", "absolute", "519", "4322", "56", "22", null, null, this);
            obj.set_taborder("59");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_4_result01", "absolute", "584", "4315", "420", "478", null, null, this);
            obj.set_taborder("60");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static25", "absolute", "20", "4792", "196", "390", null, null, this);
            obj.set_taborder("61");
            obj.set_text("5. addProperties");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static26", "absolute", "215", "4792", "370", "390", null, null, this);
            obj.set_taborder("62");
            obj.set_text("JsNamespace.declareClass(\"Sample.Point\", {\r\n    initialize: function(x0, y0)\r\n    {\r\n        this.x = x0;\r\n        this.y = y0;\r\n        return this;\r\n    },\t\t\r\n    properties: {\r\n        x: {\r\n            value: 0\r\n        },\r\n        y: {\r\n            value: 0\r\n        }\r\n    }\r\n});\r\n\r\n(object, Class, function, scope) ⇒\r\n\r\nvar membernames = {'z' : {value:'0'} };\r\nJsNamespace.addProperties(membernames, Sample.Point, \r\n    function(prop, val) {\r\n        return val;\r\n    }\r\n);");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button18", "absolute", "519", "4799", "56", "22", null, null, this);
            obj.set_taborder("63");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_5_result01", "absolute", "584", "4792", "420", "390", null, null, this);
            obj.set_taborder("64");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static27", "absolute", "20", "5181", "196", "38", null, null, this);
            obj.set_taborder("65");
            obj.set_text("6. getGlobalContext");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static28", "absolute", "215", "5181", "370", "38", null, null, this);
            obj.set_taborder("66");
            obj.set_text("() ⇒ ()");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button19", "absolute", "519", "5188", "56", "22", null, null, this);
            obj.set_taborder("67");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_6_result01", "absolute", "584", "5181", "420", "38", null, null, this);
            obj.set_taborder("68");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 1024, 5260, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("Namespace");
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("Namespace.xfdl", function() {
        /*
         * JsNamespace api Sample at nexacro
         * 
         * Copyright (c) 2014 EcoSystem of TOBESOFT
         * Licensed Free under nexacro.
        */

        // 1.1 exist api 사용 예제
        this.Button00_onclick = function(obj,e)
        {
        	var exist = JsNamespace.exist("Eco");
        	this.st_1_result01.set_text( "(boolean) " + exist );
        	trace(exist);	
        }

        // 1.2 exist api 사용 예제
        this.Button01_onclick = function(obj,e)
        {
        	var exist = JsNamespace.exist("Eco.array");
        	this.st_1_result02.set_text( "(boolean) " + exist );
        	trace(exist);
        }

        // 1.3 exist api 사용 예제
        this.Button02_onclick = function(obj,e)
        {
        	var exist = JsNamespace.exist("Eco.sample");
        	this.st_1_result03.set_text( "(boolean) " + exist );
        	trace(exist);
        }

        // 1.4 exist api 사용 예제
        this.Button03_onclick = function(obj,e)
        {
        	var exist = JsNamespace.exist("Hello.World");
        	this.st_1_result04.set_text( "(boolean) " + exist );
        	trace(exist);
        }

        // 2.1 declare api 사용 예제
        this.Button04_onclick = function(obj,e)
        {
        	var exist = JsNamespace.exist("Hello");
        	
        	if ( !exist )
        	{
        		JsNamespace.declare("Hello", {
        			'message':'Hello nexacro !!', 
        			'say': function() {alert(this.message);}
        		});
        	}
        	
        	this.st_2_result01.set_text( "(execute) Hello.say();" );
        	
        	Hello.say();
        }

        // 3.1 declareClass api 사용 예제
        this.Button05_onclick = function(obj,e)
        {
        	// Class 생성 정보에 properties 를 선언하면,
        	// 지정한 멤버변수(name), setter 멤버함수(setName), getter 멤버함수(getName)가 선언된다.
        	var exist = JsNamespace.exist("Sample.Person1");
        	if ( !exist )
        	{
        		JsNamespace.declareClass("Sample.Person1", {
        			properties: {
        				name: {}
        			}
        		});
        	}
        	
        	var person = new Sample.Person1();
        	var result = "var person = new Sample.Person1();\n\n";	
        	    result += "person.name ==> " + person.name + "\n\n";
        	
        		person.setName("홍길동");
        	
        		result += 'person.setName("홍길동");\n\n';
        		result += 'person.getName(); ==> ' + person.getName() + "\n\n";
        		result += "person.name ==> " + person.name;
        	
        	this.st_3_result01.set_text( result );
        	
        	trace(result);
        }

        // 3.2 declareClass api 사용 예제
        this.Button06_onclick = function(obj,e)
        {	
        	var exist = JsNamespace.exist("Sample.Person2");
        	if ( !exist )
        	{
        		// Class 생성 정보에 properties 를 선언하면서 초기값을 지정할 경우 아래와 같이 정의한다.
        		JsNamespace.declareClass("Sample.Person2", {
        			properties: {
        				name: {
        					value: "Unknown"
        				}
        			}
        		});
        	}
        	
        	var person = new Sample.Person2();
        	var result = "var person = new Sample.Person2();\n\n";	
        		result += 'person.getName(); ==> ' + person.getName() + "\n\n";
        	    result += "person.name ==> " + person.name;	
        	
        	this.st_3_result02.set_text( result );
        	
        	trace(result);
        }

        // 3.3 declareClass api 사용 예제
        this.Button07_onclick = function(obj,e)
        {
        	var exist = JsNamespace.exist("Sample.Person3");
        	if ( !exist )
        	{
        		// 'name' 으로 생성되는 멤버 변수명을 '_name'으로 처리하려면 아래와 같이 정의한다.
        		JsNamespace.declareClass("Sample.Person3", {
        			properties: {
        				name: {
        					value: "Unknown",
        					memberName: "_name"
        				}
        			}
        		});
        	}
        	
        	var person = new Sample.Person3();
        	var result = "var person = new Sample.Person3();\n\n";	
        		result += 'person.getName(); ==> ' + person.getName() + "\n\n";
        	    result += "person._name ==> " + person._name + "\n\n";
        	    result += "person.name ==> " + person.name;
        	
        	this.st_3_result03.set_text( result );
        	
        	trace(result);
        }

        // 3.4 declareClass api 사용 예제
        this.Button08_onclick = function(obj,e)
        {
        	var exist = JsNamespace.exist("Sample.Person4");
        	if ( !exist )
        	{
        		// setter 함수에 추가 로직으로 주어지는 value 값에 대하여 check하여 보정하려면 아래 코드로 작성한다. 
        		// 예를 들면 (name) property의 setter에 주어진 value값이 (null)이면 ("Unknown") 으로 value값을 변경하는 로직을 추가한다.	
        		JsNamespace.declareClass("Sample.Person4", {
        			properties: {
        				name: {
        					value: "Unknown",
        					memberName: "_name",
        					checkValue: function(value)
        					{
        						return value || "Unknown";
        					}					
        				}
        			}
        		});
        	}
        	
        	var person = new Sample.Person4();
        	var result = "var person = new Sample.Person4();\n\n";	
        		result += 'person.getName(); ==> ' + person.getName() + "\n";
        	    result += "person._name ==> " + person._name + "\n\n";
        	    
        	    result += 'person.setName("홍길동");\n';
        	    person.setName("홍길동");
        		result += 'person.getName(); ==> ' + person.getName() + "\n";
        	    result += "person._name ==> " + person._name + "\n\n";
        	    
        	    result += 'person.setName(null);\n';
        	    person.setName(null);
        		result += 'person.getName(); ==> ' + person.getName() + "\n";
        	    result += "person._name ==> " + person._name;
        	    	
        	this.st_3_result04.set_text( result );
        	
        	trace(result);
        }

        // 3.5 declareClass api 사용 예제
        this.Button09_onclick = function(obj,e)
        {
        	var exist = JsNamespace.exist("Sample.Person5");
        	if ( !exist )
        	{
        		// 'name' property 값이 변경되면 특정 처리를 해야할 경우 아래와 같이 정의한다.
        		JsNamespace.declareClass("Sample.Person5", {
        			properties: {
        				name: {
        					value: "Unknown",
        					memberName: "_name",
        					checkValue: function(value)
        					{
        						return value || "Unknown";
        					},
        					updateValue: function(value)
        					{
        						this._name = value;
        						this._draw();
        					}
        				}
        			},
        			_draw: function()
        			{
        				alert("call _draw function!!!");
        			}
        		});
        	}
        	
        	var person = new Sample.Person5();
        	var result = "var person = new Sample.Person5();\n\n";	
        		result += 'person.getName(); ==> ' + person.getName() + "\n";
        	    result += "person._name ==> " + person._name + "\n\n";
        	    
        	    result += 'person.setName("홍길동");\n';
        	    person.setName("홍길동");
        		result += 'person.getName(); ==> ' + person.getName() + "\n";
        	    result += "person._name ==> " + person._name;
        	    
        	this.st_3_result05.set_text( result );
        	
        	trace(result);
        }

        // 3.6 declareClass api 사용 예제
        this.Button10_onclick = function(obj,e)
        {
        	var exist = JsNamespace.exist("Sample.Person6");
        	if ( !exist )
        	{
        		// 'name' property 에 대해 getter, setter 를 직접 정의할 경우 아래와 같이 처리한다.
        		// [주의] get, set 정의 시 "get", "set" 으로 정의해야 오류를 막을 수 있다.
        		JsNamespace.declareClass("Sample.Person6", {
        			properties: {
        				name: {
        					value: "Unknown",
        					"get": function()
        					{
        						return this.name || 'Unknown';
        					},
        					"set": function(value)
        					{
        						value = value || 'Unknown';
        						if ( !Eco.equals(this.getName(), value) )
        						{
        							this._propertyChange("name", value,	this.getName());
        							this.name = value;
        							this._draw();
        						}
        					}
        				}
        			},
        			_draw: function()
        			{
        				alert("call _draw function!!!");
        			}
        		});
        	}
        	
        	var person = new Sample.Person6();
        	var result = "var person = new Sample.Person6();\n\n";	
        		result += 'person.getName(); ==> ' + person.getName() + "\n";
        	    result += "person.name ==> " + person.name + "\n\n";
        	    
        	    result += 'person.setName("홍길동");\n';
        	    person.setName("홍길동");
        		result += 'person.getName(); ==> ' + person.getName() + "\n";
        	    result += "person.name ==> " + person.name;
        	    
        	this.st_3_result06.set_text( result );
        	
        	trace(result);
        }

        // 3.7 declareClass api 사용 예제
        this.Button11_onclick = function(obj,e)
        {
        	var exist = JsNamespace.exist("Sample.Person7");
        	if ( !exist )
        	{
        		JsNamespace.declareClass("Sample.Person7", {
        			// 'initialize' 명칭으로 함수를 선언하면 Class 의 생성자가 된다.
        			// 함수의 반환값으로 반드시 return this; 로 작성한다.
        			initialize: function()
        			{
        				trace("Sample.Person constructor is called===>(" + Eco.array.toArray(arguments) + ")");
        				this._draw();
        				
        				return this;
        			},
        			_draw: function()
        			{
        				trace("processing _draw function!!!"); 
        			}
        		});
        	}
        	
        	var person = new Sample.Person7("a", 1);
        	var result = 'var person = new Sample.Person7("a", 1);';
        	    
        	this.st_3_result07.set_text( result );
        	
        	trace(result);
        }

        // 3.8 declareClass api 사용 예제
        this.Button12_onclick = function(obj,e)
        {
        	var exist = JsNamespace.exist("Sample.Person8");
        	if ( !exist )
        	{
        		JsNamespace.declareClass("Sample.Person8", {
        			// Class에서 Static 으로 사용하기 위해 정의하는 영역인데 정의된 Static는 다음과 같이 사용할 수 있다.
        			// className이 (Sampe.Person8)으로 정의하는 경우, 변수일 경우는 Sample.Person8._id 코드 작성으로 접근하고, 
        			// 함수일 경우는 Sample.Person8.getId() 코드 작성으로 사용하게 된다.

        			statics: {
        				_id: -1,
        				getId: function()
        				{
        					this._id++; //여기서 this는 Sample.Person이다.
        					return this._id;
        				}
        			}
        		});
        	}
        	
        	
        	var person = new Sample.Person8("a", 1);
        	var result = "Sample.Person8._id ==> " + Sample.Person8._id + "\n";
        		result += "Sample.Person8.getId() ==> " + Sample.Person8.getId() + "\n";
        		result += "Sample.Person8.getId() ==> " + Sample.Person8.getId() + "\n";
        		    
        	this.st_3_result08.set_text( result );
        	
        	trace(result);
        }

        // 3.9 declareClass api 사용 예제
        this.Button13_onclick = function(obj,e)
        {
        	var exist = JsNamespace.exist("Sample.Person9");
        	if ( !exist )
        	{
        		JsNamespace.declareClass("Sample.Person9", {			
        			// 'x', 'y' property가 존재하고 이 값들이 변경될 때 발생하는 
        			// 이벤트를 (onXYChanged) 명칭으로 선언은 다음과 같이 처리한다.
        			properties: {
        				x: {
        					value: 0,
        					checkValue: function(value)
        					{
        						if ( !Eco.isNumber(value) )
        						{
        							return 0;
        						}
        						return value;
        					},
        					updateValue: function(value)
        					{
        						this.x = value;
        						this.fireEvent("onXYChanged", value, this.y);
        					}
        				},
        				y: {
        					value: 0,
        					checkValue: function(value)
        					{
        						if ( !Eco.isNumber(value) )
        						{
        							return 0;
        						}
        						return value;
        					},
        					updateValue: function(value)
        					{
        						this.y = value;
        						this.fireEvent("onXYChanged", this.x, value);
        					}
        				}
        			},
        			events: {
        				onXYChanged: {}
        			},
        			setPosition: function(x, y)
        			{
        				x = x||0;
        				y = y||0;
        				if ( this.x != x || this.y != y )
        				{
        					this.x = x;
        					this.y = y;
        					this.fireEvent("onXYChanged", x, y);
        				}
        			}
        		});
        	}
        	
        	
        	var person = new Sample.Person9();
        	this.st_3_result09.set_text(this.st_3_result09.text + "var person = new Sample.Person9();\n");
        	
        	person._resultComp = this.st_3_result09;
        	
        	this.st_3_result09.set_text(this.st_3_result09.text + 'person.addEventHandler("onXYChanged", this.xyChangedHandler);\n');
        	person.addEventHandler("onXYChanged", this.xyChangedHandler);
        	
        	this.st_3_result09.set_text(this.st_3_result09.text + 'person.setPosition(10, 10);\n');
        	person.setPosition(10, 10);
        	
        	this.st_3_result09.set_text(this.st_3_result09.text + 'person.setX(20);\n');
        	person.setX(20);
        }

        this.xyChangedHandler = function(x,y)
        {
        	//this는 person이다.
        	var resultComp = this._resultComp; // ==> st_3_result09
        	var result = "onXYChanged==> ClassName: " + this.getClassName() + " arguments: (" + x + "," + y + ")";
        	resultComp.set_text( resultComp.text + "\n" + result + "\n");
        	trace(result);
        }

        // 3.10 declareClass api 사용 예제
        this.Button14_onclick = function(obj,e)
        {
        	var exist = JsNamespace.exist("Sample.Person10");
        	if ( !exist )
        	{
        		JsNamespace.declareClass("Sample.Person10", {			
        			properties: {
        				x: {
        					value: 0,
        					checkValue: function(value)
        					{
        						if ( !Eco.isNumber(value) )
        						{
        							return 0;
        						}
        						return value;
        					},
        					updateValue: function(value)
        					{
        						this.x = value;
        						this.fireEvent("onXYChanged", value, this.y);
        					}
        				},
        				y: {
        					value: 0,
        					checkValue: function(value)
        					{
        						if ( !Eco.isNumber(value) )
        						{
        							return 0;
        						}
        						return value;
        					},
        					updateValue: function(value)
        					{
        						this.y = value;
        						this.fireEvent("onXYChanged", this.x, value);
        					}
        				}
        			},
        			// event 중에 eventHandler 함수가 하나 이상 추가 되는 시점에 임의 처리 루틴을 작성하고, 
        			// eventHandler 함수가 모두 제거되는 시점에 임의 처리 루틴을 작성하는 요건이 생기는 경우가 있다.
        			// 이 때 사용하는 것이 events 선언 부분에 (install), (uninstall) 명칭으로 함수를 정의한다.
        			events: {
        				onXYChanged: {
        					install: function(evtNm)
        					{
        						trace(this.name + ": " + evtNm + "' install is called ::: handler Cnt ==>" +  + this.getEventHandlerLength("onXYChanged"));
        					},
        					uninstall: function(evtNm)
        					{
        						trace(this.name + ": " + evtNm + "' uninstall is called ::: handler Cnt ==>" +  + this.getEventHandlerLength("onXYChanged"));
        					}
        				}
        			},
        			setPosition: function(x, y)
        			{
        				x = x||0;
        				y = y||0;
        				if ( this.x != x || this.y != y )
        				{
        					this.x = x;
        					this.y = y;
        					this.fireEvent("onXYChanged", x, y);
        				}
        			}
        		});
        	}
        	
        	var person = new Sample.Person10();
        	
        	this.st_3_result10.set_text(this.st_3_result10.text + "var person = new Sample.Person10();\n");
        	
        	person.addEventHandler("onXYChanged", this.xyChangedHandler1); //onXYChanged's install call
        	
        	this.st_3_result10.set_text(this.st_3_result10.text + 'person.addEventHandler("onXYChanged", this.xyChangedHandler1);\n');
        	this.st_3_result10.set_text(this.st_3_result10.text + "onXYChanged's install call\n");
        	
        	person.addEventHandler("onXYChanged", this.xyChangedHandler2);
        	
        	this.st_3_result10.set_text(this.st_3_result10.text + 'person.addEventHandler("onXYChanged", this.xyChangedHandler2);\n');
        	
        	person.addEventHandler("onXYChanged", this.xyChangedHandler3);
        	
        	this.st_3_result10.set_text(this.st_3_result10.text + 'person.addEventHandler("onXYChanged", this.xyChangedHandler3);\n');

        	person.removeEventHandler("onXYChanged", this.xyChangedHandler1);
        	
        	this.st_3_result10.set_text(this.st_3_result10.text + 'person.removeEventHandler("onXYChanged", this.xyChangedHandler1);\n');
        	
        	person.removeEventHandler("onXYChanged", this.xyChangedHandler2);
        	
        	this.st_3_result10.set_text(this.st_3_result10.text + 'person.removeEventHandler("onXYChanged", this.xyChangedHandler2);\n');
        	
        	person.removeEventHandler("onXYChanged", this.xyChangedHandler3); //onXYChanged's uninstall call
        	
        	this.st_3_result10.set_text(this.st_3_result10.text + 'person.removeEventHandler("onXYChanged", this.xyChangedHandler3);\n');
        	
        	this.st_3_result10.set_text(this.st_3_result10.text + "onXYChanged's uninstall call\n");
        }

        //onXYChanged eventHandler
        this.xyChangedHandler1 = function(x,y)
        {
        }

        this.xyChangedHandler2 = function(x,y)
        {
        }

        this.xyChangedHandler3 = function(x,y)
        {
        }

        // 3.11 declareClass api 사용 예제
        this.Button15_onclick = function(obj,e)
        {
        	var exist = JsNamespace.exist("Sample.Person11");
        	if ( !exist )
        	{
        		JsNamespace.declareClass("Sample.Person11", {
        			initialize: function()
        			{
        				trace("Sample.Person11 constructor call===>(" + Eco.array.toArray(arguments) + ")");
        				return this;
        			},
        			properties: {
        				name: {},
        				x: {
        					value: 0,
        					checkValue: function(value)
        					{
        						if ( !Eco.isNumber(value) )
        						{
        							return 0;
        						}
        						return value;
        					},
        					updateValue: function(value)
        					{
        						this.x = value;
        						this.fireEvent("onXYChanged", value, this.y);
        					}
        				},
        				y: {
        					value: 0,
        					checkValue: function(value)
        					{
        						if ( !Eco.isNumber(value) )
        						{
        							return 0;
        						}
        						return value;
        					},
        					updateValue: function(value)
        					{
        						this.y = value;
        						this.fireEvent("onXYChanged", this.x, value);
        					}
        				}
        			},
        			events: {
        				onXYChanged: {}
        			},
        			setPosition: function(x, y)
        			{
        				x = x||0;
        				y = y||0;
        				if ( this.x != x || this.y != y )
        				{
        					this.x = x;
        					this.y = y;
        					this.fireEvent("onXYChanged", x, y);
        				}
        			}
        		});
        	}

        	exist = JsNamespace.exist("Sample.Developer");
        	if ( !exist )
        	{
        		JsNamespace.declareClass("Sample.Developer", {
        			// 상속하려는 Class 설정
        			//extends는 반드시 "extends"로 처리
        			"extends": "Sample.Person11", 
        			properties: {
        				languages: {
        					value: ['nexacro', 'JavaScript', 'C++']
        				}
        			},
        			initialize: function()
        			{
        				// Apply a method from the parent class' prototype
        				return this.callParent(arguments);
        			},
        			canCode: function(language)
        			{
        				return Eco.array.contains(this.getLanguages(), language);
        			},
        			code: function(language)
        			{
        				if (!this.canCode(language))
        				{
        					trace(this.name + " can't code in: " + language);
        					this._resultComp.set_text(this._resultComp.text + "\n" + this.name + " can't code in: " + language);
        				}
        			}
        		});
        	}
        	
        	var developer = new Sample.Developer();
        	this.st_3_result11.set_text("var developer = new Sample.Developer();");
        	
        	// 결과 표시를 위해 추가
        	developer._resultComp = this.st_3_result11;
        	
        	this.st_3_result11.set_text(this.st_3_result11.text + '\ndeveloper.setName("홍길동");');
        	developer.setName("홍길동");
        	
        	this.st_3_result11.set_text(this.st_3_result11.text + '\ndeveloper.code("perl");');
        	developer.code("perl");
        	
        	trace("======================================");
        	trace("developer.getMethodsNames()");
        	trace("======================================");
        	var methodNames = developer.getMethodsNames();
        	Eco.array.Each(methodNames,
        		function (name, idx)
        		{
        			trace(name);
        		}
        	);	
        	
        	trace("======================================");
        	trace("developer.getPropertiesNames()");
        	trace("======================================");
        	var propertiesNames = developer.getPropertiesNames();
        	Eco.array.Each(propertiesNames,
        		function (name, idx)
        		{
        			trace(name);
        		}
        	);	
        	
        	trace("======================================");
        	trace("developer.getEventsNames()");
        	trace("======================================");	
        	var eventsNames = developer.getEventsNames();
        	Eco.array.Each(eventsNames,
        		function (name, idx)
        		{
        			trace(name);
        		}
        	);	
        }

        // 3.12 declareClass api 사용 예제
        this.Button16_onclick = function(obj,e)
        {
        	// Class에서 메소드, property들, 멤버 변수들은 자동으로 상속되지만, 
        	// static으로 선언된 것은 상속되지 않는다. 
        	// 그래서 static 중에 하위 Class로 상속하고자 하는 변수나 함수들은 여기에 정의한다.
        	// 'inheritStatics' 명칭으로 해당 설정 값을 (statics) 선언하듯이 동일하게 처리한다
        	var exist = JsNamespace.exist("Sample.Person12");
        	if ( !exist )
        	{
        		JsNamespace.declareClass("Sample.Person12", {
        			statics: {
        				averageIQ: 100
        			},
        			inheritStatics: {
        				getAverageIQ: function()
        				{
        					return this.averageIQ;
        				}
        			}
        		});
        	}

        	exist = JsNamespace.exist("Sample.Developer2");
        	if ( !exist )
        	{
        		JsNamespace.declareClass("Sample.Developer2", {
        			"extends": 'Sample.Person12',
        			statics: {
        				averageIQ: 120
        			}
        		});
        	}
        	
        	var result = "Sample.Person12.getAverageIQ()==>" + Sample.Person12.getAverageIQ() + "\n";
        		result += "Sample.Developer2.getAverageIQ()==>" + Sample.Developer2.getAverageIQ();
        	
        	trace(result);
        	this.st_3_result12.set_text(result);
        }

        // 4.1 addMethods api 사용 예제
        this.Button17_onclick = function(obj,e)
        {
        	var exist = JsNamespace.exist("Sample.Point");
        	if ( !exist )
        	{
        		JsNamespace.declareClass("Sample.Point", {
        			initialize: function(x0, y0)
        			{
        				this.x = x0;
        				this.y = y0;
        				return this;
        			},		
        			properties: {
        				x: {
        					value: 0
        				},
        				y: {
        					value: 0
        				}
        			}
        		});
        	}
        	
        	// 주어진 Class에 method 를 추가한다.
        	var membernames = ['round', 'ceil', 'floor', 'abs'];
        	JsNamespace.addMethods(membernames, Sample.Point, false, 
        		function(name) {
        			var script = "return new Sample.Point(Math." + name + "(this.x), Math." + name + "(this.y));";
        			this[name] = new Function(script); //this ==> Sample.Point.prototype
        			return name; //이 코드가 있어야 추가한 Method에 debug정보를 구성한다.
        		}
        	);

        	var point = new Sample.Point(10.1, -10.8);
        	var result = "var point = new Sample.Point(10.1, -10.8);\n";
        	result += "\n======================================\n";
        	result += "point.getMethodsNames()\n";
        	result += "======================================\n";
        		
        	var methodNames = point.getMethodsNames();
        	Eco.array.Each(methodNames,
        		function (name, idx)
        		{
        			trace(name);
        			result += name + "\n";
        		}
        	);
        	
        	result += "\n";
        	
        	var round = point.round();
        	result += "var round = point.round();\n";
        	result += "round.x ==> "+round.x+"\n";
        	result += "round.y ==> "+round.y+"\n\n";
        	
        	var ceil = point.ceil();
        	result += "var ceil = point.ceil();\n";
        	result += "ceil.x ==> "+ceil.x+"\n";
        	result += "ceil.y ==> "+ceil.y+"\n\n";	
        	
        	var floor = point.floor();
        	result += "var floor = point.floor();\n";
        	result += "floor.x ==> "+floor.x+"\n";
        	result += "floor.y ==> "+floor.y+"\n\n";
        	
        	var abs = point.abs();
        	result += "var abs = point.abs();\n";
        	result += "abs.x ==> "+abs.x+"\n";
        	result += "abs.y ==> "+abs.y;
        			
        	trace(result);
        	
        	this.st_4_result01.set_text(result);
        }

        // 5.1 addProperties api 사용 예제
        this.Button18_onclick = function(obj,e)
        {
        	var exist = JsNamespace.exist("Sample.Point");
        	if ( !exist )
        	{
        		JsNamespace.declareClass("Sample.Point", {
        			initialize: function(x0, y0)
        			{
        				this.x = x0;
        				this.y = y0;
        				return this;
        			},		
        			properties: {
        				x: {
        					value: 0
        				},
        				y: {
        					value: 0
        				}
        			}
        		});
        	}
        	
        	// 주어진 Class에 property 를 추가한다.
        	var membernames = {'z' : {value:'0'} };
        	JsNamespace.addProperties(membernames, Sample.Point, 
        		function(prop, val) {
        			return val;
        		}
        	);
        	
        	var point = new Sample.Point(10, 20);
        	var result = "var point = new Sample.Point(10, 20);\n";
        	result += "\n======================================\n";
        	result += "point.getPropertiesNames()\n";
        	result += "======================================\n";
        		
        	var propertiesNames = point.getPropertiesNames();
        	Eco.array.Each(propertiesNames,
        		function (name, idx)
        		{
        			trace(name);
        			result += name + "\n";
        		}
        	);
        	
        	result += "\n";
        	
        	result += "point.z ==> "+point.z+"\n";
        	
        	trace(result);
        	
        	this.st_5_result01.set_text(result);
        }

        // 6.1 getGlobalContext api 사용 예제
        this.Button19_onclick = function(obj,e)
        {
        	var result = JsNamespace.getGlobalContext();
        	
        	trace(result);
        	
        	this.st_6_result01.set_text(result);
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

        };

        this.loadIncludeScript("Namespace.xfdl");

       
    };
}
)();
