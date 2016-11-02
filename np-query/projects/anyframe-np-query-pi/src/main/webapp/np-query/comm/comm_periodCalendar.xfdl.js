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
                this.set_name("comm_periodCalendar");
                this.set_classname("comm_periodCalendar");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,305,29);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_date", this);
            obj._setContents("<ColumnInfo><Column id=\"FR_DATE\" type=\"STRING\" size=\"256\"/><Column id=\"TO_DATE\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_month", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"256\"/><Column id=\"NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"CODE\">1</Col><Col id=\"NAME\">1개월</Col></Row><Row><Col id=\"CODE\">3</Col><Col id=\"NAME\">3개월</Col></Row><Row><Col id=\"CODE\">6</Col><Col id=\"NAME\">6개월</Col></Row><Row><Col id=\"CODE\">12</Col><Col id=\"NAME\">1년</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Calendar("cal_fr", "absolute", "0", "0", "140", "29", null, null, this);
            this.addChild(obj.name, obj);
            obj.set_taborder("0");
            obj.set_dateformat("yyyy-MM-dd");
            obj.set_value("null");

            obj = new Static("stc_gap", "absolute", "140", "1", "24", "28", null, null, this);
            obj.set_taborder("1");
            obj.set_text("~");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);

            obj = new Calendar("cal_to", "absolute", "164", "0", "140", "29", null, null, this);
            this.addChild(obj.name, obj);
            obj.set_taborder("2");
            obj.set_dateformat("yyyy-MM-dd");
            obj.set_value("null");

            obj = new PopupDiv("pdv_calendar", "absolute", "0", "31", "520", "334", null, null, this);
            obj.style.set_background("#ffffffff");
            obj.style.set_border("1 solid #808080ff");
            obj.style.set_bordertype("round 5 5");
            this.addChild(obj.name, obj);
            obj = new Calendar("cal_fr", "absolute", "5", "5", "250", "270", null, null, this.pdv_calendar);
            this.pdv_calendar.addChild(obj.name, obj);
            obj.set_taborder("0");
            obj.set_type("monthonly");
            obj = new Calendar("cal_to", "absolute", "262", "5", "250", "270", null, null, this.pdv_calendar);
            this.pdv_calendar.addChild(obj.name, obj);
            obj.set_taborder("1");
            obj.set_type("monthonly");
            obj = new Button("btn_apply", "absolute", "432", "283", "80", "40", null, null, this.pdv_calendar);
            obj.set_taborder("2");
            obj.set_text("적용");
            obj.set_cssclass("btn_WF_CRUD");
            this.pdv_calendar.addChild(obj.name, obj);
            obj = new Radio("rdo_period", "absolute", "8", "288", "282", "28", null, null, this.pdv_calendar);
            this.pdv_calendar.addChild(obj.name, obj);
            obj.set_taborder("3");
            obj.set_columncount("4");
            obj.set_codecolumn("CODE");
            obj.set_datacolumn("NAME");
            obj.style.set_align("left middle");
            obj.set_innerdataset("@ds_month");

            obj = new Radio("rdo_period", "absolute", "320", "0", "280", "29", null, null, this);
            this.addChild(obj.name, obj);
            obj.set_taborder("4");
            obj.set_codecolumn("CODE");
            obj.set_datacolumn("NAME");
            obj.set_columncount("4");
            obj.style.set_align("left middle");
            obj.set_visible("false");
            obj.set_innerdataset("@ds_month");


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 520, 334, this.pdv_calendar,
            	//-- Layout function
            	function(p) {
            		p.style.set_background("#ffffffff");
            		p.style.set_border("1 solid #808080ff");
            		p.style.set_bordertype("round 5 5");

            	}
            );
            this.pdv_calendar.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 305, 29, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("comm_periodCalendar");
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information
            obj = new BindItem("item0","cal_fr","value","ds_date","FR_DATE");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item1","cal_to","value","ds_date","TO_DATE");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item2","pdv_calendar.cal_fr","value","ds_date","FR_DATE");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item3","pdv_calendar.cal_to","value","ds_date","TO_DATE");
            this.addChild(obj.name, obj);
            obj.bind();

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.addIncludeScript("comm_periodCalendar.xfdl", "lib::comForm.xjs");
        this.registerScript("comm_periodCalendar.xfdl", function() {
        /**************************************************************************************************
         * 01. 업무구분				: 
         * 02. 화 면 명				: 
         * 03. 화면설명				:  
         * 04. 관련 화면 및 서비스	: 
         * 05. 관련 테이블명			: 
         * 06. 작 성 자				: 
         * 07. 작 성 일				: 
         * 08. 수정이력
         **************************************************************************************************
         *    수정일            이름        사유
         **************************************************************************************************
         *    
         *************************************************************************************************/

        //-------------------------------------------------------------------------------------------------
        // 1. 공통함수 include
        //-------------------------------------------------------------------------------------------------
        //include "lib::comForm.xjs";

        //-------------------------------------------------------------------------------------------------
        // Form 전역변수 선언
        //-------------------------------------------------------------------------------------------------
        this.fromdate 	= null;
        this.todate 	= null;

        this._formobj 	= null;
        this._callback 	= null;
        this._formid 	= null;
        this._isView 	= false;
        //-------------------------------------------------------------------------------------------------
        // 2. Form 함수 정의
        //-------------------------------------------------------------------------------------------------
        this.form_onload = function(obj,e)
        {
        	if(obj.scrollbars != "none") obj.set_scrollbars("none");
        	
        	this.form_onsize(obj);
        }

        this.form_onsize = function(obj,e)
        {
        	var GAP = 24;
        	var nWidthRadio = this._isView? 280 : 0;
        	var nLeft = 0;
        	var nWidth = parseInt((obj.getOffsetWidth() - 24 - nWidthRadio) / 2);
        	this.cal_fr.set_left(nLeft);
        	this.cal_fr.set_width(nWidth);
        	nLeft += nWidth;
        	this.stc_gap.set_left(nLeft);
        	this.stc_gap.set_width(GAP);
        	nLeft += GAP;
        	this.cal_to.set_left(nLeft);
        	this.cal_to.set_width(nWidth);
        	
        	if(this._isView)
        	{
        		nLeft += nWidth;
        		this.rdo_period.set_left(nLeft + 20);
        		this.rdo_period.set_width(nWidthRadio - 20);
        	}
        }

        //-------------------------------------------------------------------------------------------------
        // 3. Transaction 함수 정의
        //-------------------------------------------------------------------------------------------------

        //-------------------------------------------------------------------------------------------------
        // 4. User 함수 정의
        //-------------------------------------------------------------------------------------------------

        //콜백이 필요한경우 설정필요함
        this.init = function(objForm,sCompId,objFunc,bViewRadio)
        {	
        	this._formobj 	= objForm;
        	this._formid 	= sCompId;
        	this._callback 	= objFunc;
        	this._isView	= Eco.isEmpty(bViewRadio)? false : bViewRadio;
        	
        	if(this._isView) this.rdo_period.set_visible(true);
        	else			 this.rdo_period.set_visible(false); 
        	
        	this.form_onsize(this);
        }

        this.set_fromdate = function(date)
        {	
        	this.ds_date.set_enableevent(false);
        	this.ds_date.setColumn(0, "FR_DATE", date);
        	this.ds_date.set_enableevent(true);
        	
        	this.fromdate = this.ds_date.getColumn(0, "FR_DATE");	
        }

        this.set_todate = function(date)
        {	
        	this.ds_date.set_enableevent(false);
        	this.ds_date.setColumn(0, "TO_DATE", date);
        	this.ds_date.set_enableevent(true);
        	
        	this.todate = this.ds_date.getColumn(0, "TO_DATE");
        }

        this.set_date = function(frDate,toDate)
        {
        	this.ds_date.set_enableevent(false);
        	this.ds_date.setColumn(0, "FR_DATE", frDate);
        	this.ds_date.setColumn(0, "TO_DATE", toDate);
        	this.ds_date.set_enableevent(true);
        	
        	this.fromdate = this.ds_date.getColumn(0, "FR_DATE");
        	this.todate = this.ds_date.getColumn(0, "TO_DATE");
        }

        //PopupDiv오픈
        this.fn_dropdown = function()
        {
        	this.pdv_calendar.trackPopupByComponent(this.cal_fr, 0, this.cal_fr.getOffsetHeight()+2);
        }

        //팝업닫힐 경우
        this.fn_close = function()
        {
        	//callback이 존재한경우 콜백함수호출
        	if(!Eco.isEmpty(this._callback))
        	{
        		this._callback.call(this._formobj, this._formid);
        	}
        }

        //-------------------------------------------------------------------------------------------------
        // 5. Event 함수 정의
        //------------------------------------------------------------------------------------------------

        
        this.cal_fr_ondropdown = function(obj,e)
        {
        	this.fn_dropdown();
        	return false;
        }

        this.cal_to_ondropdown = function(obj,e)
        {
        	this.fn_dropdown();
        	return false;
        }

        this.pdv_calendar_cal_fr_ondayclick = function(obj,e)
        {
        	this.fromdate = e.date;
        }

        this.pdv_calendar_cal_to_ondayclick = function(obj,e)
        {
        	this.todate = e.date;
        }

        this.pdv_calendar_oncloseup = function(obj,e)
        {
        	this.fn_close();
        }

        this.pdv_calendar_btn_apply_onclick = function(obj,e)
        {
        	this.pdv_calendar.closePopup();
        }

        //유효성체크
        this.ds_date_cancolumnchange = function(obj,e)
        {
        	var sFrDate, sToDate;
        	var fromdt, todt, day;
        	if(e.columnid == "FR_DATE")
        	{
        		sFrDate = e.newvalue.toString();
        		sToDate = obj.getColumn(0, "TO_DATE");
        		if(Eco.isEmpty(sToDate)) return true;
        	}
        	else if(e.columnid == "TO_DATE")
        	{
        		sFrDate = obj.getColumn(0, "FR_DATE");
        		sToDate = e.newvalue.toString();
        		if(Eco.isEmpty(sFrDate)) return true;
        	}
        	fromdt = Eco.date.strToDate(sFrDate);
        	todt = Eco.date.strToDate(sToDate);
        	day = Eco.date.getDiffDay(fromdt, todt);

        	if(day < 0)
        	{
        		this.gfn_alert("유효하지않은 날짜를 선택하였습니다.");
        		
        		if(e.columnid == "FR_DATE") this.fromdate = e.oldvalue;
        		else if(e.columnid == "TO_DATE") this.todate = e.oldvalue;
        		
        		return false;
        	}
        }

        this.Radio_onitemchanged = function(obj,e)
        {
        	var toDate = Eco.date.getToday();
        	var nMonth = parseInt(e.postvalue);
        	var frDate = Eco.date.addMonth(toDate, -1 * nMonth);
        	frDate = Eco.date.addDate(frDate, 1);
        	
        	this.ds_date.setColumn(0, "FR_DATE", frDate);
        	this.ds_date.setColumn(0, "TO_DATE", toDate);	
        	
        	this.fromdate = this.ds_date.getColumn(0, "FR_DATE");
        	this.todate = this.ds_date.getColumn(0, "TO_DATE");	
        }
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.ds_date.addEventHandler("cancolumnchange", this.ds_date_cancolumnchange, this);
            this.addEventHandler("onload", this.form_onload, this);
            this.addEventHandler("onsize", this.form_onsize, this);
            this.cal_fr.addEventHandler("ondropdown", this.cal_fr_ondropdown, this);
            this.cal_to.addEventHandler("ondropdown", this.cal_to_ondropdown, this);
            this.pdv_calendar.addEventHandler("oncloseup", this.pdv_calendar_oncloseup, this);
            this.pdv_calendar.cal_fr.addEventHandler("ondayclick", this.pdv_calendar_cal_fr_ondayclick, this);
            this.pdv_calendar.cal_to.addEventHandler("ondayclick", this.pdv_calendar_cal_to_ondayclick, this);
            this.pdv_calendar.btn_apply.addEventHandler("onclick", this.pdv_calendar_btn_apply_onclick, this);
            this.pdv_calendar.rdo_period.addEventHandler("onitemchanged", this.Radio_onitemchanged, this);
            this.rdo_period.addEventHandler("onitemchanged", this.Radio_onitemchanged, this);

        };

        this.loadIncludeScript("comm_periodCalendar.xfdl");

       
    };
}
)();
