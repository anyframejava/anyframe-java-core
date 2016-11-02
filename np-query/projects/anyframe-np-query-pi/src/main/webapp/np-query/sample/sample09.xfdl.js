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
                this.set_name("sample09");
                this.set_classname("sample09");
                this.set_titletext("그리드 로우 롤링");
                this._setFormPosition(0,0,1024,768);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_list", this);
            obj._setContents("<ColumnInfo><Column id=\"NOTICE_ID\" type=\"STRING\" size=\"256\"/><Column id=\"TITLE\" type=\"STRING\" size=\"256\"/><Column id=\"REG_DT\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"NOTICE_ID\">1</Col><Col id=\"TITLE\">공지사항-가나다라</Col><Col id=\"REG_DT\">20160301</Col></Row><Row><Col id=\"NOTICE_ID\">2</Col><Col id=\"TITLE\">공지사항-마바사</Col><Col id=\"REG_DT\">20160301</Col></Row><Row><Col id=\"NOTICE_ID\">3</Col><Col id=\"TITLE\">공지사항-아자카타</Col><Col id=\"REG_DT\">20160301</Col></Row><Row><Col id=\"NOTICE_ID\">4</Col><Col id=\"TITLE\">공지사항-AAAA</Col><Col id=\"REG_DT\">20160301</Col></Row><Row><Col id=\"NOTICE_ID\">5</Col><Col id=\"TITLE\">공지사항-BBBB</Col><Col id=\"REG_DT\">20160301</Col></Row></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_list00", this);
            obj._setContents("<ColumnInfo><Column id=\"CONTENTS_ID\" type=\"STRING\" size=\"256\"/><Column id=\"TITLE\" type=\"STRING\" size=\"256\"/><Column id=\"IMG_URL\" type=\"STRING\" size=\"256\"/><Column id=\"CATEGORY\" type=\"STRING\" size=\"256\"/><Column id=\"AUTHOR_NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"CONTENTS_ID\">1</Col><Col id=\"TITLE\">간경병증의 모든것</Col><Col id=\"IMG_URL\">http://localhost:8080/test/Desert.jpg</Col><Col id=\"CATEGORY\">소화기계질</Col><Col id=\"AUTHOR_NAME\">소화기내과 신동현 교수</Col></Row><Row><Col id=\"CONTENTS_ID\">2</Col><Col id=\"TITLE\">간경병증의 모든것</Col><Col id=\"IMG_URL\">http://localhost:8080/test/Chrysanthemum.jpg</Col><Col id=\"CATEGORY\">소화기계질</Col><Col id=\"AUTHOR_NAME\">소화기내과 신동현 교수</Col></Row><Row><Col id=\"CONTENTS_ID\">3</Col><Col id=\"TITLE\">간경병증의 모든것</Col><Col id=\"IMG_URL\">http://localhost:8080/test/Hydrangeas.jpg</Col><Col id=\"CATEGORY\">소화기계질</Col><Col id=\"AUTHOR_NAME\">소화기내과 신동현 교수</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Button("Button00", "absolute", "511", "86", "120", "50", null, null, this);
            obj.set_taborder("1");
            obj.set_text("Start");
            this.addChild(obj.name, obj);

            obj = new Div("div_notice", "absolute", "40", "56", "444", "112", null, null, this);
            obj.set_taborder("2");
            obj.set_text("Div00");
            obj.style.set_border("1 solid #808080ff");
            this.addChild(obj.name, obj);
            obj = new Grid("grd_list", "absolute", "5", "34", null, "71", "5", null, this.div_notice);
            obj.set_taborder("0");
            obj.set_binddataset("ds_list");
            obj.set_autofittype("col");
            obj.set_useselcolor("false");
            obj.style.set_border("2 none #444444ff");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"288\"/><Column size=\"148\"/></Columns><Rows><Row size=\"35\"/></Rows><Band id=\"body\"><Cell style=\"align:left;line:1 none #808080 ;\" text=\"bind:TITLE\"/><Cell col=\"1\" displaytype=\"date\" style=\"line:1 none #808080 ;\" text=\"bind:REG_DT\" calendardisplaynulltype=\"nulltext\"/></Band></Format></Formats>");
            this.div_notice.addChild(obj.name, obj);
            obj = new Static("Static00", "absolute", "5", "5", "288", "28", null, null, this.div_notice);
            obj.set_taborder("1");
            obj.set_text("공지사항");
            this.div_notice.addChild(obj.name, obj);

            obj = new Div("div_contents", "absolute", "40", "248", "444", "128", null, null, this);
            obj.set_taborder("3");
            obj.set_text("Div00");
            obj.style.set_border("1 solid #808080ff");
            this.addChild(obj.name, obj);
            obj = new Grid("grd_list", "absolute", "5", "34", null, "86", "5", null, this.div_contents);
            obj.set_taborder("2");
            obj.set_binddataset("ds_list00");
            obj.set_autofittype("col");
            obj.set_useselcolor("false");
            obj.style.set_border("2 none #444444ff");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"144\"/><Column size=\"285\"/></Columns><Rows><Row size=\"25\"/><Row size=\"35\"/><Row size=\"25\"/></Rows><Band id=\"body\"><Cell rowspan=\"3\" displaytype=\"image\" style=\"align:left;line:1 none #808080 ;\" text=\"bind:IMG_URL\"/><Cell col=\"1\" displaytype=\"normal\" style=\"align:left;line:1 none #808080ff ;\" text=\"bind:CATEGORY\" calendardisplaynulltype=\"nulltext\"/><Cell row=\"1\" col=\"1\" style=\"align:left;line:0 none #808080ff ;\" text=\"bind:TITLE\"/><Cell row=\"2\" col=\"1\" style=\"align:left;line:1 none #808080ff ;\" text=\"bind:AUTHOR_NAME\"/></Band></Format></Formats>");
            this.div_contents.addChild(obj.name, obj);
            obj = new Static("Static00", "absolute", "5", "5", "288", "28", null, null, this.div_contents);
            obj.set_taborder("3");
            obj.set_text("전문가 컨텐츠");
            this.div_contents.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 444, 112, this.div_notice,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("2");
            		p.set_text("Div00");
            		p.style.set_border("1 solid #808080ff");

            	}
            );
            this.div_notice.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 444, 128, this.div_contents,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("3");
            		p.set_text("Div00");
            		p.style.set_border("1 solid #808080ff");

            	}
            );
            this.div_contents.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 1024, 768, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("sample09");
            		p.set_titletext("그리드 로우 롤링");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("sample09.xfdl", function() {
        this._timer_sec = 2;

        this._notice_max = 0;
        this._notice_pos = 1;

        this._notice_max_0 = 0;
        this._notice_pos_0 = 1;

        
        this.form_onload = function(obj,e)
        {
        	this.div_notice.grd_list.vscrollbar.set_scrollbarsize(0);
        	
        	this.div_contents.grd_list.vscrollbar.set_scrollbarsize(0);
        }

        this.form_ontimer = function(obj,e)
        {
        	if(e.timerid == 1)
        	{	
        		//공지사항
        		this.div_notice.grd_list.vscrollbar.set_pos(this._notice_pos);
        		
        		if(this._notice_pos == this._notice_max) this._notice_pos = 0;		
        		else 									 this._notice_pos++;		
        		
        		//전문가컨텐츠
        		this.div_contents.grd_list.vscrollbar.set_pos(this._notice_pos_0);
        		
        		if(this._notice_pos_0 == this._notice_max_0) this._notice_pos_0 = 0;		
        		else 									 this._notice_pos_0++;		
        	}
        }

        this.Button00_onclick = function(obj,e)
        {
        	this._notice_max = this.div_notice.grd_list.vscrollbar.max;
        	
        	this._notice_max_0 = this.div_contents.grd_list.vscrollbar.max;
        	
        	this.setTimer(1, this._timer_sec*1000);
        }

        
        /*
        // 공지사항 보기 타이머
        this.NOTICE_TIMER_ID = 429;
        this.NOTICE_TIMER_ELAPSE = 5000;

        this.home_ontimer = function(obj:Form, e:nexacro.TimerEventInfo)
        {
        	if ( e.timerid == this.NOTICE_TIMER_ID )
        	{
        		var curIdx = this._cur_step_index;
        		var comp;
        		if ( curIdx < (this._step_count-1) )
        		{
        			comp = this.components["btn_step_"+ (curIdx+1)];
        			comp.click();
        		}
        		else
        		{
        			this.goFirstNotice();
        		}
        	}
        }

        // 스텝 버튼 클릭
        this.btn_step_onclick = function(obj, e)
        {
        	var idx = parseInt(obj.name.replace("btn_step_", ""), 10);
        	
        	if ( this._cur_step_index != idx )
        	{
        		this.animation_start(this.div_notice, idx, 400);
        		
        		this._cur_step_index = idx;
        		
        		var cnt = this._step_count;
        		var select;
        		for (var i=0; i<cnt; i++)
        		{
        			select = ( i == idx ? true : false );
        			this.components["btn_step_"+i].setSelectStatus(select);
        		}
        		
        		// 타이머 초기화
        		this.killTimer(this.NOTICE_TIMER_ID);
        		this.setTimer(this.NOTICE_TIMER_ID, this.NOTICE_TIMER_ELAPSE);
        	}
        }

        this.animation_start = function(div, target_index, duration)
        {
        	if (this._animation_change_info)
        	{
        		this._on_cancel_animation();
        	}
        	
        	var control_elem = div.getElement();
        	if (control_elem)
        	{	
        		var info = {};
        		info.is_alive = true;
        		info.target_comp = div;
        		info.target_index = target_index;
        		info.starttime = Date.now();
        		info.duration = duration;
        		
        		var hscroll_step = control_elem.hscroll_limit / this._step_count; 			
        		info.startpos = control_elem.scroll_left;
        		info.endpos = hscroll_step * target_index;

        		var pThis = this;
        		info.timer = new nexacro.AnimationFrame(this, function () { pThis._on_animation(); });
        		info.timer.start();
        		
        		this._animation_change_info = info;
        	}
        }

        this._on_animation = function ()
        {
        	var info = this._animation_change_info;
        	if (info && info.is_alive)
        	{
        		var t = Date.now() - info.starttime; // 0 ~ duration
        		var d = info.duration;
        		var q = t / d - 1;
        		var c = Math.min((q*q*q+1), 1); // Curve3Out Interpolation
        		var curpos = info.startpos + ((info.endpos - info.startpos) * c);			   
        		
        		var target = info.target_comp;
                var control_elem = target.getElement();
                if (control_elem)
                {
        			control_elem.setElementHScrollPos(curpos);			
                }
        		
        		if (t >= info.duration)
        		{
        			this._on_end_animation();
        		}
        		else
        		{
        			info.timer.start();
        		}
        	}
        };

        this._on_end_animation = function ()
        {
        	var info = this._animation_change_info;
        	if (!info)
        		return;

        	info.is_alive = false;
        	if (info.timer)
        		info.timer.stop();
        		
        	var control_elem = info.target_comp.getElement();
        	if (control_elem)
        	{		
        		var new_index = info.target_index;
        		delete info;

        		var hscroll_step = control_elem.hscroll_limit / this._step_count;
        		control_elem.setElementHScrollPos(hscroll_step * new_index);
        	}
        	
        	this._animation_change_info = null;
        };

        this._on_cancel_animation = function ()
        {
        	var info = this._animation_change_info;
        	if (!info)
        		return;

        	info.is_alive = false;
        	if (info.timer)
        		info.timer.stop();
        	delete info;
        	this._animation_change_info = null;
        };

        */
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("ontimer", this.form_ontimer, this);
            this.addEventHandler("onload", this.form_onload, this);
            this.Button00.addEventHandler("onclick", this.Button00_onclick, this);
            this.div_notice.grd_list.addEventHandler("onvscroll", this.div_notice_grd_list_onvscroll, this);
            this.div_contents.grd_list.addEventHandler("onvscroll", this.div_notice_grd_list_onvscroll, this);

        };

        this.loadIncludeScript("sample09.xfdl");

       
    };
}
)();
