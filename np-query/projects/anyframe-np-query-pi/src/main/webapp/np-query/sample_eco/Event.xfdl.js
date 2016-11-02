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
                this.set_name("Event");
                this.set_classname("Event");
                this.set_titletext("New Form");
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
            obj._setContents("<ColumnInfo><Column id=\"Column0\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Static("Static06", "absolute", "20", "39", "220", "89", null, null, this);
            obj.set_taborder("0");
            obj.set_text("1. add");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static10", "absolute", "239", "39", "480", "89", null, null, this);
            obj.set_taborder("10");
            obj.set_text("var events = {\"onlbuttondown\": this.onLbuttonDownHandler,\r\n                       \"onlbuttonup\": this.onLbuttonUpHandler}\r\n\r\n(XComp, object, *) ⇒ (this.st_sample01, events, this)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("Static30", "absolute", "239", "0", "480", "40", null, null, this);
            obj.set_taborder("17");
            obj.set_text("Arguments:  ( Type ) ⇒ ( Value )");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static31", "absolute", "20", "0", "220", "40", null, null, this);
            obj.set_taborder("18");
            obj.set_text("Method");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Static("Static32", "absolute", "718", "0", "286", "40", null, null, this);
            obj.set_taborder("19");
            obj.set_text("Result: (Type) Vaule");
            obj.set_cssclass("WFDA_sta_header");
            this.addChild(obj.name, obj);

            obj = new Button("Button00", "absolute", "655", "48", "56", "22", null, null, this);
            obj.set_taborder("24");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_result01", "absolute", "718", "39", "286", "177", null, null, this);
            obj.set_taborder("28");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("Static01", "absolute", "20", "127", "220", "89", null, null, this);
            obj.set_taborder("30");
            obj.set_text("2. remove");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static02", "absolute", "20", "215", "220", "40", null, null, this);
            obj.set_taborder("31");
            obj.set_text("3. makeDraggable");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static03", "absolute", "20", "254", "220", "40", null, null, this);
            obj.set_taborder("32");
            obj.set_text("4. clearDraggable");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static04", "absolute", "20", "293", "220", "104", null, null, this);
            obj.set_taborder("33");
            obj.set_text("5. makeRepeatable");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static05", "absolute", "20", "396", "220", "104", null, null, this);
            obj.set_taborder("34");
            obj.set_text("6. clearRepeatable");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static07", "absolute", "20", "499", "220", "79", null, null, this);
            obj.set_taborder("35");
            obj.set_text("7. requestAnimationFrame");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("Static08", "absolute", "20", "577", "220", "40", null, null, this);
            obj.set_taborder("36");
            obj.set_text("8. cancelAnimationFrame");
            obj.set_cssclass("WFDA_sta_label");
            this.addChild(obj.name, obj);

            obj = new Static("st_sample01", "absolute", "725", "45", "120", "28", null, null, this);
            obj.set_taborder("37");
            obj.style.set_background("yellow");
            obj.style.set_border("1px solid orange");
            obj.style.set_align("center middle");
            obj.set_text("st_sample01");
            this.addChild(obj.name, obj);

            obj = new Static("Static00", "absolute", "239", "127", "480", "89", null, null, this);
            obj.set_taborder("38");
            obj.set_text("var events = {\"onlbuttondown\": this.onLbuttonDownHandler,\r\n                       \"onlbuttonup\": this.onLbuttonUpHandler}\r\n\r\n(XComp, object, *) ⇒ (this.st_sample01, events, this)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button01", "absolute", "655", "136", "56", "22", null, null, this);
            obj.set_taborder("39");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static09", "absolute", "239", "215", "480", "40", null, null, this);
            obj.set_taborder("40");
            obj.set_text("(XComp, function, *, array) ⇒ \r\n(this.st_sample02, this.onDragging, this, [this.st_sample02])");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button02", "absolute", "655", "224", "56", "22", null, null, this);
            obj.set_taborder("41");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_3_result01", "absolute", "718", "215", "286", "79", null, null, this);
            obj.set_taborder("42");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_sample02", "absolute", "789", "229", "144", "44", null, null, this);
            obj.set_taborder("43");
            obj.set_text("st_sample02");
            obj.style.set_border("1px solid black");
            obj.style.set_bordertype("round 5 5");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);

            obj = new Static("Static11", "absolute", "239", "254", "480", "40", null, null, this);
            obj.set_taborder("44");
            obj.set_text("(XComp) ⇒ (this.st_sample02)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button03", "absolute", "655", "264", "56", "22", null, null, this);
            obj.set_taborder("45");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static12", "absolute", "239", "293", "480", "104", null, null, this);
            obj.set_taborder("46");
            obj.set_text("(XComp, function, *, array) ⇒ \r\n(this.btn_repeat, this.onRepeating, this, [ds, this.grd_sample])");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button04", "absolute", "655", "303", "56", "22", null, null, this);
            obj.set_taborder("47");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static13", "absolute", "239", "396", "480", "104", null, null, this);
            obj.set_taborder("48");
            obj.set_text("(XComp) ⇒ (this.btn_repeat)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button05", "absolute", "655", "406", "56", "22", null, null, this);
            obj.set_taborder("49");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_5_result01", "absolute", "718", "293", "286", "207", null, null, this);
            obj.set_taborder("50");
            obj.set_cssclass("WFDA_sta_BoxR");
            obj.style.set_padding("4 10 4 11");
            obj.style.set_align("left top");
            obj.set_text("실행 후 [remove] 버튼을 누른 상태에서 마우스를 버튼 영역 밖으로 나갔다가 다시 영역안으로 이동해 본다.");
            this.addChild(obj.name, obj);

            obj = new Button("btn_repeat", "absolute", "916", "343", "56", "26", null, null, this);
            obj.set_taborder("51");
            obj.set_text("remove");
            this.addChild(obj.name, obj);

            obj = new Grid("grd_sample", "absolute", "726", "345", "165", "148", null, null, this);
            obj.set_taborder("52");
            obj.set_binddataset("ds_sample");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"149\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"Column0\"/></Band><Band id=\"body\"><Cell text=\"bind:Column0\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("Static14", "absolute", "239", "499", "480", "40", null, null, this);
            obj.set_taborder("53");
            obj.set_text("(function, *) ⇒ (this.renderLoop, this)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button06", "absolute", "655", "508", "56", "22", null, null, this);
            obj.set_taborder("54");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("st_7_result01", "absolute", "718", "499", "286", "118", null, null, this);
            obj.set_taborder("55");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new ImageViewer("img_bike", "absolute", "720", "532", "52", "70", null, null, this);
            obj.set_taborder("56");
            obj.style.set_background("transparent URL('Images::bike.png')");
            obj.style.set_border("0 none #808080ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static15", "absolute", "239", "577", "480", "40", null, null, this);
            obj.set_taborder("57");
            obj.set_text("(number) ⇒ (this.reqId)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button08", "absolute", "655", "586", "56", "22", null, null, this);
            obj.set_taborder("58");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static17", "absolute", "239", "538", "480", "40", null, null, this);
            obj.set_taborder("60");
            obj.set_text("requestAnimationFrame 을 이용한 게임");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Button("Button07", "absolute", "655", "547", "56", "22", null, null, this);
            obj.set_taborder("61");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 1024, 890, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("Event");
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("Event.xfdl", function() {
        /*
         * Eco.XComp.Event api Sample at nexacro
         * 
         * Copyright (c) 2014 EcoSystem of TOBESOFT
         * Licensed Free under nexacro.
        */

        // 1.1 add api 사용 예제
        this.Button00_onclick = function(obj,e)
        {
        	var events = {"onlbuttondown": this.onLbuttonDownHandler, "onlbuttonup": this.onLbuttonUpHandler};
        	
        	Eco.XComp.Event.add(this.st_sample01, events, this);
        	
        	this.st_1_result01.set_text( "excute add !! click yellow box !!");
        }

        this.onLbuttonDownHandler = function(obj,e)
        {	
        	this.st_1_result01.getSetter("text").addset("\n1. onLbuttonDownHandler !!");
        }

        this.onLbuttonUpHandler = function(obj,e)
        {
        	this.st_1_result01.getSetter("text").addset("\n2. onLbuttonUpHandler !!");
        }

        // 2.1 remove api 사용 예제
        this.Button01_onclick = function(obj,e)
        {
        	var events = {"onlbuttondown": this.onLbuttonDownHandler, "onlbuttonup": this.onLbuttonUpHandler};
        	
        	Eco.XComp.Event.remove(this.st_sample01, events, this);
        	
        	this.st_1_result01.set_text( "excute remove !! click yellow box !!");
        }

        // 3.1 makeDraggable api 사용 예제
        this.Button02_onclick = function(obj,e)
        {
        	this.st_sample02.bringToFront();	
        	this.st_sample02.set_text("Drag Me!!!");
        	this.st_sample02.style.set_background_color("orange");
        	
        	// 2번째 인자를 function 으로 선언 시 drag 진행 시점에 정의된 함수가 호출된다.
        	
        	//Eco.XComp.Event.makeDraggable(this.st_sample02, this.onDragging, this, [this.st_sample02]);
        		
        	// 2번째 인자를 object 로 선언 시 drag 시작, 진행, 종료 시점에 정의된 함수가 호출된다.
        	var draggingFunc = {
        		'start': this.onDragStart,
        		'dragging': this.onDragging,
        		'end': this.onDragEnd
        	};
        	Eco.XComp.Event.makeDraggable(this.st_sample02, draggingFunc, this, [this.st_sample02]);
        }

        // drag 가 발생될 때 처리할 루틴을 정의한 함수
        this.onDragStart = function(comp)
        {	
        	trace(comp.name + " Drag Start !!");

        	comp.set_text("Drag Start !!");
        }

        // dragging 시 처리할 루틴을 정의한 함수
        this.onDragging = function(offsetX,offsetY,obj)
        {
        	var x = obj.getOffsetLeft() + offsetX,
        		y = obj.getOffsetTop() + offsetY;	
        	
        	obj.move(x, y);
        }

        // drag 가 종료될 때 처리할 루틴을 정의한 함수
        this.onDragEnd = function(comp)
        {
        	trace(comp.name + " Drag End !!");

        	comp.set_text("Drag End !!");
        }

        // 4.1 clearDraggable api 사용 예제
        this.Button03_onclick = function(obj,e)
        {
        	this.st_sample02.set_text("Don't Drag Me!!!");
        	this.st_sample02.style.set_background_color("silver");
        	
        	Eco.XComp.Event.clearDraggable(this.st_sample02);
        }

        // 5.1 makeRepeatable api 사용 예제
        this.Button04_onclick = function(obj,e)
        {	
        	Eco.XComp.Event.clearRepeatable(this.btn_repeat);
        	
        	// sample data 생성
        	var ds = this.ds_sample;
        	var row;
        	
        	ds.set_enableevent(false);
        	ds.deleteAll();
        	for (var i=0; i<100; i++)
        	{
        		row = ds.addRow();
        		ds.setColumn(row, "Column0", i);
        	}
        	ds.set_enableevent(true);
        	
        	this.grd_sample.setCellProperty("head", 0, "text", "Row Count : " + ds.rowcount);
        	
        	// repeatable 설정
        	// - 2번째 인자를 function 으로 선언 시 repeat 진행 시점에 정의된 함수가 호출된다.
        	// - 4번째 인자로 데이터셋과 그리드를 넘겨준다. (4번째 인자는 옵션이다.)
        	
        	//Eco.XComp.Event.makeRepeatable(this.btn_repeat, this.onRepeating, this, [ds, this.grd_sample]);
        		
        	// repeatable 설정
        	// 2번째 인자를 object 로 선언 시 repeat 시작, 진행, 중단, 종료 시점에 정의된 함수가 호출된다.
        	var repeatFunc = {
        		'start': this.onRepeatStart,
        		'repeating': this.onRepeating,
        		'repeatingStop': this.onRepeatingStop,
        		'end': this.onRepeatEnd
        	};
        	
        	Eco.XComp.Event.makeRepeatable(this.btn_repeat, repeatFunc, this, [ds, this.grd_sample]);
        }

        // repeating 시작 시점에 처리할 루틴을 정의한 함수
        this.onRepeatStart = function(x,y,ds,grd)
        {
        	trace("onRepeatStart");
        }

        // repeating 시점에 처리할 루틴을 정의한 함수
        this.onRepeating = function(x,y,ds,grd)
        {
        	if ( ds.rowposition >= 0 && ds.rowposition < ds.rowcount )
        	{
        		ds.deleteRow(ds.rowposition);		
        		grd.setCellProperty("head", 0, "text", "Row Count : " + ds.rowcount);
        	}
        }

        // repeating 중단 시점에 처리할 루틴을 정의한 함수
        this.onRepeatingStop = function(ds,grd)
        {
        	trace("onRepeatingStop");
        }

        // repeating 종료 시점에 처리할 루틴을 정의한 함수
        this.onRepeatEnd = function(ds,grd)
        {
        	trace("onRepeatEnd");
        }

        // 6.1 clearRepeatable api 사용 예제
        this.Button05_onclick = function(obj,e)
        {
        	Eco.XComp.Event.clearRepeatable(this.btn_repeat);
        }

        // 7.1 requestAnimationFrame api 사용 예제
        this.Button06_onclick = function(obj,e)
        {
        	this.renderLoop();
        }

        // 반복되는 함수에서 다시 requestAnimationFrame 을 호출해 주어야 한다.
        this.renderLoop = function()
        {
        	// 애니메이션 코드
        	var pos = this.img_bike.getOffsetLeft() + 2;
        	if ( pos > 940 )
        	{
        		pos = 720;
        	}
        	this.img_bike.set_left(pos);
        	
        	// cancel 시 사용하기 위해 id 를 담아두자.
        	this.reqId = Eco.XComp.Event.requestAnimationFrame(this.renderLoop, this);
        	
        	this.st_7_result01.set_text("(number) " + this.reqId);
        }

        // 7.2 requestAnimationFrame api 사용 예제
        this.Button07_onclick = function(obj,e)
        {
        	var frame = new ChildFrame();
        	frame.init("snakeGame", "absolute", 0, 0, 672, 555, null, null, "Sample::Event_sub.xfdl");
        	frame.set_openalign("center middle");
        	frame.showModal(this.getOwnerFrame());
        }

        // 8.1 cancelAnimationFrame api 사용 예제
        this.Button08_onclick = function(obj,e)
        {
        	Eco.XComp.Event.cancelAnimationFrame(this.reqId);
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
            this.Button08.addEventHandler("onclick", this.Button08_onclick, this);
            this.Button07.addEventHandler("onclick", this.Button07_onclick, this);

        };

        this.loadIncludeScript("Event.xfdl");

       
    };
}
)();
