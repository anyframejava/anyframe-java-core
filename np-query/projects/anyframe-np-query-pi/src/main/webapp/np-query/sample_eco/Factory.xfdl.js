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
                this.set_name("Factory");
                this.set_classname("Event");
                this.set_titletext("Eco.XComp.Factory API 예제");
                this._setFormPosition(0,0,1024,890);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_sample", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"imageId\" type=\"STRING\" size=\"256\"/><Column id=\"name\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"imageId\">184577034.png</Col><Col id=\"name\">2015 현대 H350</Col></Row><Row><Col id=\"imageId\">183377833.png</Col><Col id=\"name\">2015 현대 엑센트 세단</Col></Row><Row><Col id=\"imageId\">183379401.png</Col><Col id=\"name\">2015 현대 엑센트 해치백</Col></Row><Row><Col id=\"imageId\">183206108.jpg</Col><Col id=\"name\">2015 현대 i20</Col></Row><Row><Col id=\"imageId\">176900305.jpg</Col><Col id=\"name\">2015 현대 그랜저 (HG)</Col></Row><Row><Col id=\"imageId\">174999656.jpg</Col><Col id=\"name\">2015 현대 베라크루즈</Col></Row><Row><Col id=\"imageId\">174507411.jpg</Col><Col id=\"name\">2014 현대 iX25 컨셉트</Col></Row><Row><Col id=\"imageId\">174425919.jpg</Col><Col id=\"name\">2014 현대 인트라도 컨셉트</Col></Row><Row><Col id=\"imageId\">174415223.jpg</Col><Col id=\"name\">2015 현대 투싼 iX 수소연료전지차</Col></Row><Row><Col id=\"imageId\">i30.jpg</Col><Col id=\"name\">2014 현대 i30</Col></Row><Row><Col id=\"imageId\">174051608.jpg</Col><Col id=\"name\">2015 현대 투싼 iX</Col></Row><Row><Col id=\"imageId\">170756219.jpg</Col><Col id=\"name\">2014 현대 아반떼 세단</Col></Row><Row><Col id=\"imageId\">173132750.jpg</Col><Col id=\"name\">2014 현대 쏘나타 (LF)</Col></Row><Row><Col id=\"imageId\">171424868.jpg</Col><Col id=\"name\">2014 현대 싼타페</Col></Row><Row><Col id=\"imageId\">170748680.jpg</Col><Col id=\"name\">2014 현대 아반떼 쿠페</Col></Row><Row><Col id=\"imageId\">166933290.jpg</Col><Col id=\"name\">2014 현대 그랜저 하이브리드</Col></Row><Row><Col id=\"imageId\">166460067.jpg</Col><Col id=\"name\">2014 현대 쏘나타 하이브리드</Col></Row><Row><Col id=\"imageId\">165979016.jpg</Col><Col id=\"name\">2014 현대 제네시스</Col></Row><Row><Col id=\"imageId\">165834663.jpg</Col><Col id=\"name\">2014 현대 밍투</Col></Row><Row><Col id=\"imageId\">165354408.jpg</Col><Col id=\"name\">2014 현대 제네시스 쿠페</Col></Row><Row><Col id=\"imageId\">164507453.jpg</Col><Col id=\"name\">2013 현대 그랜드스타렉스</Col></Row><Row><Col id=\"imageId\">163996900.jpg</Col><Col id=\"name\">2014 현대 i40 살룬</Col></Row><Row><Col id=\"imageId\">163996343.jpg</Col><Col id=\"name\">2014 현대 i40 왜건</Col></Row><Row><Col id=\"imageId\">161211681.jpg</Col><Col id=\"name\">2014 현대 i10</Col></Row><Row><Col id=\"imageId\">159045497.jpg</Col><Col id=\"name\">2013 현대 랑둥</Col></Row><Row><Col id=\"imageId\">158303896.jpg</Col><Col id=\"name\">2013 현대 포터2</Col></Row><Row><Col id=\"imageId\">157345636.jpg</Col><Col id=\"name\">2013 현대 HB20</Col></Row><Row><Col id=\"imageId\">153268367.jpg</Col><Col id=\"name\">2013 현대 HND-9 컨셉트</Col></Row><Row><Col id=\"imageId\">152741106.jpg</Col><Col id=\"name\">2013 현대 벨로스터</Col></Row><Row><Col id=\"imageId\">152741328.jpg</Col><Col id=\"name\">2013 현대 벨로스터 터보</Col></Row><Row><Col id=\"imageId\">152429856.jpg</Col><Col id=\"name\">2013 현대 그랜드 스타렉스 캠핑카</Col></Row><Row><Col id=\"imageId\">152237844.jpg</Col><Col id=\"name\">2013 현대 i30</Col></Row><Row><Col id=\"imageId\">152119475.jpg</Col><Col id=\"name\">2013 현대 맥스크루즈 (싼타페 롱바디)</Col></Row><Row><Col id=\"imageId\">149160934.jpg</Col><Col id=\"name\">2013 현대 HCD-14 제네시스 컨셉트</Col></Row><Row><Col id=\"imageId\">141418865.jpg</Col><Col id=\"name\">2013 현대 에쿠스</Col></Row><Row><Col id=\"imageId\">141420069.jpg</Col><Col id=\"name\">2013 현대 에쿠스 리무진</Col></Row><Row><Col id=\"imageId\">130556738.jpg</Col><Col id=\"name\">2012 현대 아이오닉 컨셉트</Col></Row><Row><Col id=\"imageId\">130224970.jpg</Col><Col id=\"name\">2012 현대 헥사 스페이스 컨셉트</Col></Row><Row><Col id=\"imageId\">118041478.jpg</Col><Col id=\"name\">2012 현대 i20</Col></Row><Row><Col id=\"imageId\">11764.jpg</Col><Col id=\"name\">2010 현대 i10</Col></Row><Row><Col id=\"imageId\">159774270.jpg</Col><Col id=\"name\">2013 현대 더 뉴 아반떼</Col></Row><Row><Col id=\"imageId\">162784923.jpg</Col><Col id=\"name\">2014 현대 엑센트 세단</Col></Row><Row><Col id=\"imageId\">162786459.jpg</Col><Col id=\"name\">2014 현대 엑센트 해치백</Col></Row><Row><Col id=\"imageId\">155653170.jpg</Col><Col id=\"name\">2014 현대 쏘나타 더 브릴리언트</Col></Row><Row><Col id=\"imageId\">130829715.jpg</Col><Col id=\"name\">2013 현대 제네시스</Col></Row><Row><Col id=\"imageId\">154128168.jpg</Col><Col id=\"name\">2013 현대 뉴 투싼 iX</Col></Row><Row><Col id=\"imageId\">101565406.jpg</Col><Col id=\"name\">2013 현대 아반떼 쿠페 (MD)</Col></Row><Row><Col id=\"imageId\">152739138.jpg</Col><Col id=\"name\">2013 현대 투싼 iX 수소연료전지차</Col></Row><Row><Col id=\"imageId\">152239488.jpg</Col><Col id=\"name\">2013 현대 i40 살룬</Col></Row><Row><Col id=\"imageId\">152238666.jpg</Col><Col id=\"name\">2013 현대 i40 왜건</Col></Row><Row><Col id=\"imageId\">151924902.jpg</Col><Col id=\"name\">2013 현대 엑센트 해치백</Col></Row><Row><Col id=\"imageId\">151923238.jpg</Col><Col id=\"name\">2013 현대 엑센트 세단</Col></Row><Row><Col id=\"imageId\">139101814.jpg</Col><Col id=\"name\">2013 현대 제네시스 프라다</Col></Row><Row><Col id=\"imageId\">147753063.jpg</Col><Col id=\"name\">2013 현대 쏘나타 하이브리드</Col></Row><Row><Col id=\"imageId\">145766177.jpg</Col><Col id=\"name\">2013 현대 투싼 iX</Col></Row><Row><Col id=\"imageId\">141560316.jpg</Col><Col id=\"name\">2013 현대 그랜저 (HG)</Col></Row><Row><Col id=\"imageId\">134226900.jpg</Col><Col id=\"name\">2013 현대 아반떼 세단 (MD)</Col></Row><Row><Col id=\"imageId\">132715398.jpg</Col><Col id=\"name\">2013 현대 쏘나타 더 브릴리언트</Col></Row><Row><Col id=\"imageId\">128227011.jpg</Col><Col id=\"name\">2012 현대 뉴 싼타페</Col></Row><Row><Col id=\"imageId\">125942209.jpg</Col><Col id=\"name\">2012 현대 벨로스터</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Static("Static06", "absolute", "20", "39", "178", "105", null, null, this);
            obj.set_taborder("0");
            obj.set_text("1. getXComp");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static10", "absolute", "197", "39", "290", "105", null, null, this);
            obj.set_taborder("10");
            obj.set_text("this.createUserListBox 함수 내에서 getXComp 함수 호출하는 로직이 있음 참조바람.\r\n실행 버튼은 this.createUserListBox 함수 호출함.");
            obj.set_cssclass("WFDA_sta_Box");
            obj.style.set_align("left bottom");
            this.addChild(obj.name, obj);

            obj = new Static("Static30", "absolute", "197", "0", "290", "40", null, null, this);
            obj.set_taborder("17");
            obj.set_text("Arguments:  ( Type ) ⇒ ( Value )");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static31", "absolute", "20", "0", "178", "40", null, null, this);
            obj.set_taborder("18");
            obj.set_text("Method");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static32", "absolute", "486", "0", "518", "40", null, null, this);
            obj.set_taborder("19");
            obj.set_text("Result: (Type) Vaule");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Button("Button00", "absolute", "427", "48", "56", "22", null, null, this);
            obj.set_taborder("24");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_result01", "absolute", "486", "39", "518", "463", null, null, this);
            obj.set_taborder("28");
            obj.set_cssclass("WFDA_sta_BoxR");
            obj.set_text("상위 Grid에 표시된 imageId, name 항목의 데이타를 List형태이고, 3 column으로 표시하면서 List의 높이 중간 지점이 항상 선택된 row로 처리되면서,\r\n3번째 column은 선택된 row의 imageId를 ListBox 전체 높이로 표시하는 ListBox를 만들어 보자. ");
            obj.style.set_align("left bottom");
            this.addChild(obj.name, obj);

            obj = new Static("Static01", "absolute", "20", "143", "178", "57", null, null, this);
            obj.set_taborder("30");
            obj.set_text("2. releaseAll");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static02", "absolute", "20", "199", "178", "56", null, null, this);
            obj.set_taborder("31");
            obj.set_text("3. setProperties");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static03", "absolute", "20", "254", "178", "120", null, null, this);
            obj.set_taborder("32");
            obj.set_text("4. doLayout");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static04", "absolute", "20", "373", "178", "48", null, null, this);
            obj.set_taborder("33");
            obj.set_text("5. releaseNamed");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static05", "absolute", "20", "420", "178", "40", null, null, this);
            obj.set_taborder("34");
            obj.set_text("6. getXCompByName");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static07", "absolute", "20", "459", "178", "94", null, null, this);
            obj.set_taborder("35");
            obj.set_text("7. parseStyleStr");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static08", "absolute", "20", "552", "178", "56", null, null, this);
            obj.set_taborder("36");
            obj.set_text("8. getNonClientArea");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static00", "absolute", "197", "143", "290", "57", null, null, this);
            obj.set_taborder("38");
            obj.set_text("this.createUserListBox 함수 내에서 기준에 생성된 것을 clear 처리하기 위해 releaseAll함수 호출함.");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static09", "absolute", "197", "199", "290", "56", null, null, this);
            obj.set_taborder("40");
            obj.set_text("this.createUserListBox 함수 내에서 xcomp 생성 후에 속성 값을 설정하기 위해 setProperties함수를 호출함.");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result01", "absolute", "486", "501", "518", "242", null, null, this);
            obj.set_taborder("42");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static11", "absolute", "197", "254", "290", "120", null, null, this);
            obj.set_taborder("44");
            obj.set_text("this.setSelectRow 함수에서 주어진 row을 선택된 row로 처리하고 _draw 함수를 호출한다. _draw함수내 마지막 라인(348) 쯤에 doLayout 함수를 호출하여 실질로 화면상에 그리는 처리를 한다.\r\n실행 버튼은 this.setSelectRow 함수 호출함.");
            obj.set_cssclass("WFDA_sta_Box");
            obj.style.set_align("left bottom");
            this.addChild(obj.name, obj);

            obj = new Button("Button03", "absolute", "426", "258", "56", "22", null, null, this);
            obj.set_taborder("45");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static12", "absolute", "197", "373", "290", "48", null, null, this);
            obj.set_taborder("46");
            obj.set_text("_deleteRow 함수내에 마지막 라인에서 releaseNamed함수를 호출하여 삭제 한다.");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static13", "absolute", "197", "420", "290", "40", null, null, this);
            obj.set_taborder("48");
            obj.set_text("_updateRow 함수내에 getXCompByName함수를 호출하여 update할 xcomp를 얻는다.");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static15", "absolute", "197", "552", "290", "56", null, null, this);
            obj.set_taborder("57");
            obj.set_text("(object, string) ⇒ (styleObj, \"normal\")");
            obj.set_cssclass("WFDA_sta_Box");
            obj.style.set_align("left bottom");
            this.addChild(obj.name, obj);

            obj = new Button("Button08", "absolute", "426", "555", "56", "22", null, null, this);
            obj.set_taborder("58");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static17", "absolute", "197", "459", "290", "94", null, null, this);
            obj.set_taborder("60");
            obj.set_text("(string) ⇒ (\"border:0 none transparent;padding:0 0 0 5;background:transparent; font:Consolas,15; color:#adadadff;\")");
            obj.set_cssclass("WFDA_sta_Box");
            obj.style.set_align("left bottom");
            this.addChild(obj.name, obj);

            obj = new Button("Button07", "absolute", "428", "467", "56", "22", null, null, this);
            obj.set_taborder("61");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00", "absolute", "522", "49", "428", "367", null, null, this);
            obj.set_taborder("62");
            obj.set_binddataset("ds_sample");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"120\"/><Column size=\"284\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"87\"/></Rows><Band id=\"head\" style=\"cellfont:Consolas,9,bold;\"><Cell style=\"font: ;\" text=\"imageId\"/><Cell col=\"1\" style=\"font: ;\" text=\"name\"/></Band><Band id=\"body\" style=\"selectfont:Consolas,9;cellfont:Consolas,9;\"><Cell displaytype=\"image\" text=\"expr:&quot;Images::listboxdata/&quot; + imageId\"/><Cell col=\"1\" text=\"bind:name\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Div("div_listBox", "absolute", "495", "508", "501", "220", null, null, this);
            obj.set_taborder("63");
            obj.style.set_border("1 solid #808080ff");
            obj.set_text("div_listBox");
            this.addChild(obj.name, obj);

            obj = new Static("Static16", "absolute", "20", "607", "178", "244", null, null, this);
            obj.set_taborder("64");
            obj.set_text("9. 나머지");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static18", "absolute", "197", "607", "290", "244", null, null, this);
            obj.set_taborder("65");
            obj.set_text("api 메뉴얼 참조하세요.\r\ngetRect\r\nsetRect\r\ngetProperty\r\ninvalidate\r\nvalidate\r\ninvalidateRect\r\nvalidateRect\r\ninvalidateProps\r\nvalidateProps\r\nrelease");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new TextArea("TextArea00", "absolute", "486", "742", "518", "109", null, null, this);
            obj.set_taborder("66");
            obj.set_readonly("true");
            obj.style.set_border("1 solid #c6cbceff");
            obj.style.set_bordertype("normal 4 4");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 1024, 890, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("Event");
            		p.set_titletext("Eco.XComp.Factory API 예제");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("Factory.xfdl", function() {
        /*
         * Eco.XComp.Factory api Sample at nexacro
         * 
         * Copyright (c) 2014 EcoSystem of nexacro
         * Licensed Free under nexacro.
        */
        //RT(runtime) 상에서 scroll up down 버튼 click시에 에러가 발생하는 경우 아래와 같이 조치하면 해결됨
        //Platform.js 의 724라인에 좌측과 같이 수정 요망 => if (pthis.context && !pthis.context._timerManager.deleteTimerItem(pthis))

        // 1.1 add api 사용 예제
        this.Button00_onclick = function(obj,e)
        {
        	var layout = {
        		binddataset: this.ds_sample,
        		rowHeight: 42,
        		normalFont: nexacro._getCachedFontObj("Consolas,9"),
        		normalFontColor: "#adadadff",
        		selectFont: nexacro._getCachedFontObj("Consolas,10,bold"),
        		selectFontColor: "#8d9091ff",
        		imageResource: "Images::listboxdata/",
        		columns: [
        			{
        				width: 63,
        				bindcolumn: "imageId",
        				display: "image"
        			},
        			{
        				width: "max",
        				bindcolumn: "name",
        				display: "text"
        			},
        			{
        				width: "*",
        				bindcolumn: "imageId",
        				display: "image"
        			}
        		],
        		selectedColumn: 2,
        		topBlend: "linear 50,0 #ffffffff 50,100 #ffffff00 [50 #ffffffc8]",
        		bottomBlend: "linear 50,0 #ffffff00 50,100 #ffffffff [50 #ffffffc8]",
        		scrollButtonSize: 20
        	};
        	this.createUserListBox(this.div_listBox, layout);
        }

        /**
        * 주어진 div 와 layout 값으로 list를 그리기 준비 작업을 한다.<br>
        * scroll를 위한 upArrow, downArrow 버튼을 Eco.XComp.Factory.getXComp를 이용하여 생성한다.
        * 또한 top Blend, bottom blend 처리 위한 static xcomp를 생성한다.
        * 실질로 화면상에 그려지는 작업은 Eco.XComp.Factory.doLayout 호출하여야 한다.
        */
        this.createUserListBox = function(div,layout)
        {
        	var factory = Eco.XComp.Factory,
        		ecoEventHelper = Eco.XComp.Event;

        	// clear 작업
        	var innerXComps = div._innerXComps;
        	if ( innerXComps )
        	{
        		ecoEventHelper.clearRepeatable(innerXComps["upArrow"]);
        		ecoEventHelper.clearRepeatable(innerXComps["downArrow"]);
        	}

        	factory.releaseAll(div, null, true);

        	div._layout = layout;

        	var buttonSize = layout.scrollButtonSize||20;
        	var w = div._client_width,
        		h = div._client_height;

        	div._normalStyleStr = "border:0 none transparent;padding:0 0 0 5;background:transparent; " + "font:" + layout.normalFont + "; color:" + layout.normalFontColor + ";";
        	div._selectStyleStr = "border:0 none transparent;padding:0 0 0 5;background:transparent; " + "font:" + layout.selectFont + "; color:" + layout.selectFontColor + ";";
        	div._itemComputeStyles = factory.parseStyleStr(div._normalStyleStr);
        	div._itemTextNonArea = factory.getNonClientArea(div._itemComputeStyles, "normal");
        	_changeViewSize(layout, w - buttonSize - 2, h);

        	innerXComps = {};
        	if ( !Eco._isIE8Below )
        	{
        		innerXComps["topBlend"] = factory.getXComp(div, "Static", "topBlend", 0, 0, w, layout.rowHeight);
        		innerXComps["bottomBlend"] = factory.getXComp(div, "Static", "bottomBlend", 0, h - layout.rowHeight, w, layout.rowHeight);
        		factory.setProperties(innerXComps["topBlend"], "style", "background:@gradation; gradation:" + layout.topBlend + ";");
        		factory.setProperties(innerXComps["bottomBlend"], "style", "background:@gradation; gradation:" + layout.bottomBlend + ";");
        	}

        	innerXComps["upArrow"] = factory.getXComp(div, "Static", "upArrow", w - buttonSize - 2, h/2 - buttonSize - 1, buttonSize, buttonSize);
        	innerXComps["downArrow"] = factory.getXComp(div, "Static", "downArrow", w - buttonSize - 2, h/2 + 1, buttonSize, buttonSize);
        	factory.setProperties(innerXComps["upArrow"], "style",
        		"background:@gradation URL('Images/base/btn_spinup_N.png') 50 50; border:1 solid #abb1b6ff; gradation:linear 50,100 #ecececff 50,0 #ffffffff [0% #ecececff][42% #f2f2f2ff][54% #e0e0e0ff];");
        	factory.setProperties(innerXComps["downArrow"], "style",
        		"background:@gradation URL('Images/base/btn_spindn_N.png') 50 50; border:1 solid #abb1b6ff; gradation:linear 50,100 #ecececff 50,0 #ffffffff [0% #ecececff][42% #f2f2f2ff][54% #e0e0e0ff];");

        	ecoEventHelper.makeRepeatable(innerXComps["upArrow"],
        		this.upRepeatProcess, this, [div]);
        	ecoEventHelper.makeRepeatable(innerXComps["downArrow"],
        		this.downRepeatProcess, this, [div]);

        	div._innerXComps = innerXComps;
        }

        /**
        * scroll 처리를 위한 upArrow 컴포넌트에 연결된 repeate 이벤트 처리 함수
        */
        this.upRepeatProcess = function(x,y,div)
        {
        	var targetRow = div._selectrow,
        		ds = div._layout.binddataset;

        	if ( targetRow === undefined )
        	{
        		targetRow = 0;
        	}
        	targetRow--;

        	if ( targetRow > -1 && targetRow < ds.rowcount )
        	{
        		this.setSelectRow(div, targetRow);
        	}
        	this.arrowStatus(div);
        }

        /**
        * scroll 처리를 위한 downArrow 컴포넌트에 연결된 repeate 이벤트 처리 함수
        */
        this.downRepeatProcess = function(x,y,div)
        {
        	var targetRow = div._selectrow,
        		ds = div._layout.binddataset;

        	if ( targetRow === undefined )
        	{
        		targetRow = ds.rowcount;
        	}
        	targetRow++;

        	if ( targetRow > -1 && targetRow < ds.rowcount )
        	{
        		this.setSelectRow(div, targetRow);
        	}
        	this.arrowStatus(div);
        }

        /**
        * 만약 row가 첫번쨰 이거나, 마지막 row인 경우 더 이상 scroll할 필요가 없기 때문에<br>
        * scroll 처리를 위한 upArrow, downArrow 컴포넌트의 enable 상태 조정 및 repeat 이벤트가 발생하지 않도록 한다.
        */
        this.arrowStatus = function(div)
        {
        	var sRow = div._selectrow,
        		upXcomp = div._innerXComps["upArrow"],
        		downXcomp = div._innerXComps["downArrow"],
        		ds = div._layout.binddataset;

        	if ( sRow == 0 )
        	{
        		Eco.XComp.Event._cancelRepeatable(upXcomp);
        		upXcomp.set_enable(false);
        		upXcomp.style.set_opacity("50");
        	}
        	else
        	{
        		upXcomp.set_enable(true);
        		upXcomp.style.set_opacity("100");
        	}
        	if ( sRow == (ds.rowcount - 1) )
        	{
        		Eco.XComp.Event._cancelRepeatable(downXcomp);
        		downXcomp.set_enable(false);
        		downXcomp.style.set_opacity("50");
        	}
        	else
        	{
        		downXcomp.set_enable(true);
        		downXcomp.style.set_opacity("100");
        	}
        }

        /**
        * 주어진 row가 select된 Row로 처리한다.
        */
        this.setSelectRow = function(div,row)
        {
        	var layout = div._layout,
        		rowHeight = layout.rowHeight;
        	div._selectrow = row;

        	this.scrollBy(div, row * rowHeight + rowHeight/2); //row height center 중심으로 시작
        }

        /**
        * 주어진 yPosOffset 만큼 scroll 영역을 draw 처리를 한다.
        */
        this.scrollBy = function(div,yPosOffset)
        {
        	var layout = div._layout;
        	_draw(div, {y: yPosOffset, height: layout._viewSize.height});
        }

        // 4. doLayout api 사용 예제
        this.Button03_onclick = function(obj,e)
        {
        	this.setSelectRow(this.div_listBox, 0);
        }

        // 7 parseStyleStr api 사용 예제
        this.Button07_onclick = function(obj,e)
        {
        	var  stylestr = "border:0 none transparent;padding:0 0 0 5;background:transparent; font:Consolas,15; color:#adadadff;";
        	var styleObj = Eco.XComp.Factory.parseStyleStr(stylestr);
        	var str = Eco.Logger.inspect(styleObj);
        	this.TextArea00.set_value(str);
        	trace(str);
        }

        // 8 getNonClientArea api 사용 예제
        this.Button08_onclick = function(obj,e)
        {
        	var  stylestr = "border:0 none transparent;padding:0 0 0 5;background:transparent; font:Consolas,15; color:#adadadff;";
        	var styleObj = Eco.XComp.Factory.parseStyleStr(stylestr);
        	var retArr = Eco.XComp.Factory.getNonClientArea(styleObj, "normal");
        	var str = "[" + retArr + "]";
        	this.TextArea00.set_value(str);
        	trace(str);

        }

        /**
        * div내에 column들을 그리는 영역에 대한 view size를 설정한다.
        * @param {object} layout 리스트 항목에 대한 layout 정보.
        * @param {number} w width
        * @param {number} h height
        * @private
        * @memberOf Factory(Form)
        */
        function _changeViewSize(layout,w,h)
        {
        	var ds = layout.binddataset,
        		rowHeight = layout.rowHeight;
        	layout._viewSize = {width:w, height:h};
        	//layout._scrollPos = {y:-h/2, maxHeight: ds.rowcount*rowHeight + h/2};
        }

        /**
        * div내에 column들을 viewport 영역에 대하여 실질로 화면상에 그린다.
        * @param {div} div Div nexacro component
        * @param {object} viewPort y, height 정보를 가진 object
        * @private
        * @memberOf Factory(Form)
        */
        function _draw(div,viewPort)
        {
        	var factory = Eco.XComp.Factory,
        		layout = div._layout,
        		rowHeight = layout.rowHeight,
        		ds = layout.binddataset,
        		columns = layout.columns,
        		selectedColumn = layout.selectedColumn,
        		selectedRow = div._selectrow;

        	var yOffset = viewPort.y - parseInt(viewPort.height/2);//height center 중심으로 시작
        	startRow = parseInt(yOffset/rowHeight); 
        	startRow = Math.max(0, startRow);
        	startRow = Math.min(ds.rowcount - 1, startRow);

        	yOffset = startRow*rowHeight - yOffset;
        	var sizeInfos = div._sizeInfos;
        	if ( !sizeInfos )
        	{
        		sizeInfos = [];
        		div._sizeInfos = sizeInfos;
        	}

        	var selectFont = layout.selectFont,
        		viewList = div._viewListItems,
        		itemTextNonArea = div._itemTextNonArea,
        		updates = [], removes = [], creates = [];

        	if ( !viewList )
        	{
        		for ( var len = ds.rowcount ; startRow < len ; ++startRow )
        		{
        			_measureRow( div, startRow, columns, selectFont, itemTextNonArea, ds, sizeInfos);
        			creates[creates.length] = {offset: yOffset, row: startRow};
        			yOffset += rowHeight;
        			if ( yOffset > viewPort.height )
        			{
        				break;
        			}
        		}
        	}
        	else
        	{
        		for ( var len = ds.rowcount ; startRow < len ; ++startRow )
        		{
        			_measureRow( div, startRow, columns, selectFont, itemTextNonArea, ds, sizeInfos);
        			if ( viewList[i] )
        			{
        				viewList[i].offset = yOffset;
        				updates[updates.length] = viewList[i];
        				delete viewList[i];
        			}
        			else
        			{
        				creates[creates.length] = {offset: yOffset, row: startRow};
        			}
        			yOffset += rowHeight;
        			if ( yOffset > viewPort.height )
        			{
        				break;
        			}
        		}
        		Eco.object.Each(viewList, function(prop, val)
        		{
        			removes[removes.length] = val;
        		});
        	}

        	viewList = {};
        	div._viewListItems = viewList;

        	var rowInfo;
        	for ( var i = 0, len = removes.length ; i < len ; i++ )
        	{
        		rowInfo = removes[i];
        		_deleteRow(factory, div, rowInfo.row, columns, selectedColumn);
        	}
        	
        	for ( var i = 0, len = creates.length ; i < len ; i++ )
        	{
        		rowInfo = creates[i];
        		_createRow(factory, div, rowInfo.row, rowInfo.row == selectedRow,
        			rowInfo.offset, rowHeight, ds, columns, selectedColumn);
        		viewList[rowInfo.row] = rowInfo;
        		rowInfo.dirty = false;
        	}

        	for ( var i = 0, len = updates.length ; i < len ; i++ )
        	{
        		rowInfo = updates[i];
        		_updateRow(factory, div, rowInfo.row, rowInfo.row == selectedRow,
        			rowInfo.offset, rowHeight, rowInfo.dirty, ds, columns, selectedColumn);
        		viewList[rowInfo.row] = rowInfo;
        		rowInfo.dirty = false;
        	}

        	factory.doLayout(div);
        	var innerXComps = div._innerXComps;
        	Eco.object.Each(innerXComps, function(prop, val)
        	{
        		val.bringToFront();
        	});
        }

        /**
        * 화면상에서 주어진 row를 삭제 처리한다.
        * @param {Eco.XComp.Factory} factory Eco.XComp.Factory 객체
        * @param {div} div Div nexacro component
        * @param {number} row 화면상에서 삭제할 row
        * @param {array} columns column들의 layout 정보를 담고 있는 array
        * @param {number} selectedColumn select column index
        * @private
        * @memberOf Factory(Form)
        */
        function _deleteRow(factory,div,row,columns,selectedColumn)
        {
        	var nms = [];
        	for ( var i = 0, len = columns.length ; i < len ; i++ )
        	{
        		if ( i != selectedColumn )
        		{
        			var key = "item_" + row + "_" + i;
        			nms[nms.length] = key;
        		}
        	}
        	factory.releaseNamed(div, nms, true);
        }

        /**
        * 화면상에서 주어진 row를 생성 처리한다.
        * @param {Eco.XComp.Factory} factory Eco.XComp.Factory 객체
        * @param {div} div Div nexacro component
        * @param {number} row 화면상에서 생성할 row
        * @param {boolean} selected 화면상에서 삭제할 row
        * @param {number} offset row가 그려질 y position
        * @param {number} rowHeight row Height
        * @param {Dataset} ds dataset 객체
        * @param {array} columns column들의 layout 정보를 담고 있는 array
        * @param {number} selectedColumn select column index
        * @private
        * @memberOf Factory(Form)
        */
        function _createRow(factory,div,row,selected,offset,rowHeight,ds,columns,selectedColumn)
        {
        	var imageResource = div._layout.imageResource;
        	if ( selected )
        	{
        		var select = div._selectStyleStr;
        		for ( var i = 0, len = columns.length ; i < len ; i++ )
        		{
        			if ( i != selectedColumn )
        			{
        				var key = "item_" + row + "_" + i;
        				var xcomp = factory.getXComp(div, "Static", key, columns[i]._offset, offset, columns[i]._width, rowHeight);
        				_drawColumn(factory, xcomp, ds, row, imageResource, select, columns[i]);
        			}
        		}
        		var selectColumn = columns[selectedColumn];
        		if ( selectColumn )
        		{
        			var nm = "selectedColumn_" + selectedColumn;
        			var xcomp = div._innerXComps[nm];
        			if ( !xcomp )
        			{
        				if ( selectColumn.display == "text" )
        				{
        					xcomp = factory.getXComp(div, "Static", nm,
        						selectColumn._offset, 0, selectColumn._width, div._layout._viewSize.height);
        					factory.setProperties(xcomp, "style", select);
        				}
        				else if ( selectColumn.display == "image" )
        				{
        					xcomp = factory.getXComp(div, "ImageViewer", nm,
        						selectColumn._offset, 0, selectColumn._width, div._layout._viewSize.height);
        					factory.setProperties(xcomp, "stretch", "fixaspectratio", "imagealign", "center middle", "style", "border:0 none transparent;background:transparent;");
        				}
        				div._innerXComps[nm] = xcomp;
        			}
        			else
        			{
        				factory.setRect(xcomp, selectColumn._offset, 0, selectColumn._width, div._layout._viewSize.height);
        			}
        			_drawSelectedColumn(factory, xcomp, ds, row, imageResource, select, selectColumn);
        		}
        	}
        	else
        	{
        		var normal = div._normalStyleStr;
        		for ( var i = 0, len = columns.length ; i < len ; i++ )
        		{
        			if ( i != selectedColumn )
        			{
        				var key = "item_" + row + "_" + i;
        				var xcomp = factory.getXComp(div, "Static", key, columns[i]._offset, offset, columns[i]._width, rowHeight);
        				_drawColumn(factory, xcomp, ds, row, imageResource, normal, columns[i]);
        			}
        		}
        	}
        }

        /**
        * 화면상에서 주어진 row를 갱신(속성 및 위치를 변경) 처리한다.
        * @param {Eco.XComp.Factory} factory Eco.XComp.Factory 객체
        * @param {div} div Div nexacro component
        * @param {number} row 화면상에서 생성할 row
        * @param {boolean} selected 화면상에서 삭제할 row
        * @param {number} offset row가 그려질 y position
        * @param {number} rowHeight row Height
        * @param {boolean} dirty row의 값이 변경되거나 속성이 수정되는 경우
        * @param {Dataset} ds dataset 객체
        * @param {array} columns column들의 layout 정보를 담고 있는 array
        * @param {number} selectedColumn select column index
        * @private
        * @memberOf Factory(Form)
        */
        function _updateRow(factory,div,row,selected,offset,rowHeight,dirty,ds,columns,selectedColumn)
        {
        	var imageResource = div._layout.imageResource;
        	if ( selected )
        	{
        		var select = div._selectStyleStr;
        		for ( var i = 0, len = columns.length ; i < len ; i++ )
        		{
        			if ( i != selectedColumn )
        			{
        				var key = "item_" + row + "_" + i;
        				var xcomp = factory.getXCompByName(div, key);
        				factory.setRect(xcomp, columns[i]._offset, offset, columns[i]._width, rowHeight);
        				if ( dirty )
        				{
        					_drawColumn(factory, xcomp, ds, row, imageResource, select, columns[i]);
        				}
        			}
        		}
        		var selectColumn = columns[selectedColumn];
        		if ( selectColumn )
        		{
        			var nm = "selectedColumn_" + selectedColumn;
        			var xcomp = div._innerXComps[nm];
        			if ( !xcomp )
        			{
        				if ( selectColumn.display == "text" )
        				{
        					xcomp = factory.getXComp(div, "Static", nm,
        						selectColumn._offset, 0, selectColumn._width, div._layout._viewSize.height);
        					factory.setProperties(xcomp, "style", select);
        				}
        				else if ( selectColumn.display == "image" )
        				{
        					xcomp = factory.getXComp(div, "ImageViewer", nm,
        						selectColumn._offset, 0, selectColumn._width, div._layout._viewSize.height);
        					factory.setProperties(xcomp, "stretch", "fixaspectratio", "imagealign", "center middle", "style", "border:0 none transparent;background:transparent;");
        				}
        				div._innerXComps[nm] = xcomp;
        			}
        			else
        			{
        				factory.setRect(xcomp, selectColumn._offset, 0, selectColumn._width, div._layout._viewSize.height);
        			}
        			_drawSelectedColumn(factory, xcomp, ds, row, imageResource, select, selectColumn);
        		}
        	}
        	else
        	{
        		var normal = div._normalStyleStr;
        		for ( var i = 0, len = columns.length ; i < len ; i++ )
        		{
        			if ( i != selectedColumn )
        			{
        				var key = "item_" + row + "_" + i;
        				var xcomp = factory.getXCompByName(div, key);
        				factory.setRect(xcomp, columns[i]._offset, offset, columns[i]._width, rowHeight);
        				if ( dirty )
        				{
        					_drawColumn(factory, xcomp, ds, row, imageResource, normal, columns[i]);
        				}
        			}
        		}
        	}
        }

        
        /**
        * column를 draw 처리한다.
        * @param {Eco.XComp.Factory} factory Eco.XComp.Factory 객체
        * @param {XComp} xcomp column를 표시하는 nexacro component
        * @param {Dataset} ds dataset 객체
        * @param {number} row column의 그려질 row
        * @param {string} imageResource 이미지일 경우 이미지 경로
        * @param {string} styleStr 그려야 할 style 속성 값
        * @param {object} columnInfo 그려야 할 column에 대한 layout 정보
        * @private
        * @memberOf Factory(Form)
        */
        function _drawColumn(factory,xcomp,ds,row,imageResource,styleStr,columnInfo)
        {
        	var val = ds.getColumn(row, columnInfo.bindcolumn);
        	if ( columnInfo.display == "image" )
        	{
        		factory.setProperties(xcomp, "style", "background:URL('" + imageResource + val + "') stretch;");
        		factory.setProperties(xcomp, "text", "");
        	}
        	else
        	{
        		factory.setProperties(xcomp, "style", styleStr);
        		factory.setProperties(xcomp, "text", val);
        	}
        }

        /**
        * selected column를 draw 처리한다.
        * @param {Eco.XComp.Factory} factory Eco.XComp.Factory 객체
        * @param {XComp} xcomp column를 표시하는 nexacro component
        * @param {Dataset} ds dataset 객체
        * @param {number} row column의 그려질 row
        * @param {string} imageResource 이미지일 경우 이미지 경로
        * @param {string} styleStr 그려야 할 style 속성 값
        * @param {object} columnInfo 그려야 할 column에 대한 layout 정보
        * @private
        * @memberOf Factory(Form)
        */
        function _drawSelectedColumn(factory,xcomp,ds,row,imageResource,styleStr,columnInfo)
        {
        	var val = ds.getColumn(row, columnInfo.bindcolumn);
        	if ( !Eco.isEmpty(val) )
        	{
        		if ( columnInfo.display == "image" )
        		{
        			factory.setProperties(xcomp, "image", "URL('" + imageResource + val + "')");
        		}
        		else
        		{
        			factory.setProperties(xcomp, "text", val);
        		}
        	}
        	else
        	{
        		if ( columnInfo.display == "image" )
        		{
        			factory.setProperties(xcomp, "image", "");
        		}
        		else
        		{
        			factory.setProperties(xcomp, "text", "");
        		}
        	}
        }

        /**
        * column들에 대하여 offset 값을 계산한다.<br/>
        * 만약 column정보들 중에 size값이 *이면 결정된 column크기 값들을 뺸 나머지 값으로 처리한다.
        * @param {array} columns column들의 layout 정보를 담고 있는 array
        * @param {number} remain 남은 width size
        * @param {number} remainSizeCnt column정보 중에 size값이 *인 개수
        * @param {number} lastRemainColIdx column정보 중에 size값이 * 인 마지막 column index
        * @private
        * @memberOf Factory(Form)
        */
        function _calcColumnOffset (columns,remain,remainSizeCnt,lastRemainColIdx )
        {
        	var offset = 0, sz;
        	for ( var i = 0, len = columns.length ; i < len ; i++ ) //think about wordwrap later.
        	{
        		if ( columns[i].width == "*" )
        		{
        			if ( lastRemainColIdx == i )
        			{
        				columns[i]._width = remain;
        			}
        			else
        			{
        				sz = parseInt(remain/remainSizeCnt);
        				columns[i]._width = sz;
        				remainSizeCnt--;
        				remain -= sz;
        			}
        		}
        		columns[i]._offset = offset;
        		offset += columns[i]._width;
        	}
        }

        /**
        * 주어진 row에 대한 항목별 width 정보를 측정한다.
        * @param {div} div Div nexacro component
        * @param {number} row 크기를 측정할 row
        * @param {nexacro.Style_font} normalFont column에 설정할 font 객체
        * @param {array} itemTextNonArea column에 생성할 xcomp에 대한 non client 영역 정보 [left, top, right, bottom]
        * @param {Dataset} ds dataset 객체
        * @param {object} sizeInfos row별로 측정된 값을 보관하는 cache 정보
        * @private
        * @memberOf Factory(Form)
        */
        function _measureRow (div,row,columns,normalFont,itemTextNonArea,ds,sizeInfos)
        {
        	var sizeInfo = sizeInfos[row];
        	if ( !sizeInfo )
        	{
        		sizeInfo = {};
        		sizeInfos[row] = sizeInfo;
        	}
        	if ( sizeInfo._dirtyMeasure === false ) return;
        	var w, colinfo,
        		sizeUtil = Eco.XComp.PositionSize,
        		compare = Eco.array._defaultCompare,
        		arrayUtil = Eco.array, pos, curWidth = 0,
        		remainSize = div._layout._viewSize.width,
        		remainSizeCnt = 0,
        		lastRemainColIdx;

        	for ( var i = 0, len = columns.length ; i < len ; i++ ) //think about wordwrap later.
        	{
        		colinfo = columns[i];
        		if ( colinfo.width == "max" ) //later image
        		{
        			var txt = ds.getColumn(row, colinfo.bindcolumn);
        			w = sizeUtil.getTextSize(normalFont, txt)[0];
        			w += itemTextNonArea[0] + itemTextNonArea[2];
        			curWidth += w;
        			if ( !colinfo._widths )
        			{
        				colinfo._widths = [w];
        				colinfo._width = w;
        			}
        			else
        			{
        				pos = arrayUtil.binarySearch(colinfo._widths, 0, colinfo._widths.length, w, compare);
        				if ( pos < 0 )
        				{
        					pos = ~pos;
        					colinfo._widths.splice(pos, 0, w);
        				}
        				w = colinfo._widths[colinfo._widths.length - 1]; //max 값
        				colinfo._width = w;
        			}
        			remainSize -= w;
        		}
        		else if ( Eco.isNumber(colinfo.width) )
        		{
        			w = colinfo.width;
        			curWidth += w;
        			colinfo._width = w;
        			remainSize -= w;
        		}
        		else if ( colinfo.width == "*" )
        		{
        			remainSizeCnt++;
        			lastRemainColIdx = i;
        		}
        	}
        	_calcColumnOffset( columns, remainSize, remainSizeCnt, lastRemainColIdx );
        	sizeInfo._dirtyMeasure = false;
        }
        this.Static06_onclick = function(obj,e)
        {
        	
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.Static06.addEventHandler("onclick", this.Static06_onclick, this);
            this.Button00.addEventHandler("onclick", this.Button00_onclick, this);
            this.Button03.addEventHandler("onclick", this.Button03_onclick, this);
            this.Button08.addEventHandler("onclick", this.Button08_onclick, this);
            this.Button07.addEventHandler("onclick", this.Button07_onclick, this);

        };

        this.loadIncludeScript("Factory.xfdl");

       
    };
}
)();
