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
                this.set_name("PositionSizePopup");
                this.set_classname("PositionSizePopup");
                this.set_titletext("Modal Window");
                this._setFormPosition(0,0,884,123);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("Static61", "absolute", "8", "42", "388", "70", null, null, this);
            obj.set_taborder("4");
            obj.set_text("(XComp, width, height, direction, offset, scope)\r\n⇒ (btn_pop, 44, 23, \"vert\", 2, this)");
            obj.set_cssclass("WFDA_sta_Box");
            this.addChild(obj.name, obj);

            obj = new Static("st_1_sample12", "absolute", "561", "42", "313", "70", null, null, this);
            obj.set_taborder("7");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new Static("st_15_result_pop", "absolute", "395", "42", "167", "70", null, null, this);
            obj.set_taborder("6");
            obj.set_cssclass("WFDA_sta_BoxR");
            this.addChild(obj.name, obj);

            obj = new PopupDiv("PopupDiv00", "absolute", "566", "257", "350", "55", null, null, this);
            obj.set_text("[PopupDiv 사용 메시지]\r\nModal Window 내부 및 외부 표시가능.");
            obj.style.set_background("#ffff00ff");
            obj.style.set_border("1 solid #3c3c44ff");
            obj.set_visible("false");
            obj.getSetter("taborder").set("2");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit00", "absolute", "579", "68", "267", "20", null, null, this);
            obj.set_taborder("1");
            obj.set_password("true");
            obj.set_value("1234");
            this.addChild(obj.name, obj);

            obj = new Button("Button32", "absolute", "330", "50", "56", "22", null, null, this);
            obj.set_taborder("5");
            obj.set_text("실행");
            obj.set_cssclass("WF_btn_Point");
            this.addChild(obj.name, obj);

            obj = new Static("Static00", "absolute", "8", "8", "867", "32", null, null, this);
            obj.set_taborder("8");
            obj.set_text("모달창을 기준으로 하는 position 가져오기");
            obj.set_wordwrap("none");
            this.addChild(obj.name, obj);

            obj = new Static("st_message", "absolute", "569", "138", "350", "55", null, null, this);
            obj.set_taborder("9");
            obj.set_text("[Static 사용 메시지]          닫기(X)\r\n Modal Window 내부에서 표시");
            obj.style.set_background("#ffff00ff");
            obj.style.set_border("1 solid #3c3c44ff");
            obj.style.set_bordertype("round 3 3");
            obj.style.set_align("center middle");
            obj.set_visible("false");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 884, 123, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("PositionSizePopup");
            		p.set_titletext("Modal Window");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("PositionSizePopup.xfdl", function() {

        this.method = "";

        this.PositionSizePopup_onload = function(obj,e)
        {
        	var arg = Eco.XComp.getPopupArguments(this, ['method']);
        	this.method = arg["method"];
        }

        

        this.Button32_onclick = function(obj,e)
        {
        	var w = 350; 
        	var h = 55; 
            var position = "";
            
        	// 14.8 getPopupPosition api 사용 예제
        	if(this.method == "getPopupPosition") {
        		position = Eco.XComp.PositionSize.getPopupPosition(this.Edit00, w, h, "vert", 2);
        		
        		this.displayPopup(w, h, position);	
        		
        		
        	// 15.3 getPositionByForm api 사용 예제	
        	} else if(this.method == "getPositionByForm") {
        		position = Eco.XComp.PositionSize.getPositionByForm(this.Edit00, w, h, "vert", 2, this);
        		
        		this.st_message.move(position[1], position[2], w, h);
        		this.st_message.set_visible(true);		
        	}
        	
        	
        	this.st_15_result_pop.set_text( "(array) " + position );
        	

        }

        
        this.displayPopup = function(w,h,position)
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

        

        this.st_message_onclick = function(obj,e)
        {
        	obj.set_visible(false);
        }

        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.PositionSizePopup_onload, this);
            this.Button32.addEventHandler("onclick", this.Button32_onclick, this);
            this.st_message.addEventHandler("onclick", this.st_message_onclick, this);

        };

        this.loadIncludeScript("PositionSizePopup.xfdl");

       
    };
}
)();
