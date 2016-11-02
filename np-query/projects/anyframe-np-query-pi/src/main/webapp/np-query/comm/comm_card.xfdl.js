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
                this.set_name("comm_card");
                this.set_classname("comm_card");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,250,400);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("stc_title", "absolute", "5", "0", null, "56", "5", null, this);
            obj.set_taborder("0");
            obj.set_text("Title");
            obj.style.set_background("#ffffffff");
            this.addChild(obj.name, obj);

            obj = new Static("stc_contents", "absolute", "5", null, null, "123", "5", "29", this);
            obj.set_taborder("1");
            obj.set_text("Contents");
            obj.style.set_background("#ffffffff");
            obj.style.set_font("antialias 9 NanumGothic");
            obj.set_wordwrap("char");
            this.addChild(obj.name, obj);

            obj = new ImageViewer("img_view", "absolute", "0", "96", null, null, "0", "130", this);
            obj.set_taborder("2");
            obj.style.set_border("0 solid #bdbdbdff");
            obj.set_stretch("fixaspectratio");
            this.addChild(obj.name, obj);

            obj = new Static("stc_date", "absolute", "5", "56", null, "40", "5", null, this);
            obj.set_taborder("3");
            obj.set_text("Date");
            obj.style.set_background("#ffffffff");
            obj.style.set_font("antialias 9 NanumGothic");
            this.addChild(obj.name, obj);

            obj = new Static("stc_cnt", "absolute", "0", null, null, "20", "0", "0", this);
            obj.set_taborder("4");
            obj.style.set_background("lightsteelblue");
            obj.style.set_align("right middle");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 250, 400, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("comm_card");
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.addIncludeScript("comm_card.xfdl", "lib::comForm.xjs");
        this.registerScript("comm_card.xfdl", function() {
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
        this.key = null;

        //-------------------------------------------------------------------------------------------------
        // 2. Form 함수 정의
        //-------------------------------------------------------------------------------------------------
        this.form_onload = function(obj,e)
        {

        }

        //초기설정
        this.fn_init = function()
        {
        	//공통코드 설정
        }

        //-------------------------------------------------------------------------------------------------
        // 3. Transaction 함수 정의
        //-------------------------------------------------------------------------------------------------

        //-------------------------------------------------------------------------------------------------
        // 4. User 함수 정의
        //-------------------------------------------------------------------------------------------------
        this.setInfo = function(key,title,date,url,contents,cnt)
        {
        	this.key = key;
        	this.stc_title.set_text(title);
        	
        	var dt = Eco.date.strToDate(date);
        	var strdate = Eco.date.getMaskFormatString(dt, "yyyy년 MM월 dd일");	
        	this.stc_date.set_text(strdate);
        	
        	this.img_view.set_image(url);
        	this.stc_contents.set_text(contents);
        	
        	this.stc_cnt.set_text("조회수 : "+cnt);
        }
        //-------------------------------------------------------------------------------------------------
        // 5. Event 함수 정의
        //------------------------------------------------------------------------------------------------
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.form_onload, this);

        };

        this.loadIncludeScript("comm_card.xfdl");

       
    };
}
)();
