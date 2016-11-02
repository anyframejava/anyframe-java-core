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
                this.set_name("sample004");
                this.set_classname("sample004");
                this.set_titletext("Comm Code");
                this._setFormPosition(0,0,1014,671);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_list", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"Column0\" type=\"STRING\" size=\"256\"/><Column id=\"Column1\" type=\"STRING\" size=\"256\"/><Column id=\"Column2\" type=\"STRING\" size=\"256\"/><Column id=\"Column3\" type=\"STRING\" size=\"256\"/><Column id=\"Column4\" type=\"STRING\" size=\"256\"/><Column id=\"Column5\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"Column0\">S</Col><Col id=\"Column1\">S</Col><Col id=\"Column2\">P</Col><Col id=\"Column3\">P</Col></Row><Row><Col id=\"Column0\">R</Col><Col id=\"Column1\">R</Col><Col id=\"Column2\">S</Col><Col id=\"Column3\">S</Col></Row><Row><Col id=\"Column0\">I</Col><Col id=\"Column1\">I</Col><Col id=\"Column2\">P</Col><Col id=\"Column3\">P</Col></Row><Row><Col id=\"Column0\">R</Col><Col id=\"Column1\">R</Col><Col id=\"Column2\">S</Col><Col id=\"Column3\">S</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Div("div_search", "absolute", "0", "0", null, "99", "0", null, this);
            obj.set_taborder("3");
            obj.style.set_border("1 solid #808080ff");
            this.addChild(obj.name, obj);
            obj = new Combo("Combo00", "absolute", "15", "12", "150", "33", null, null, this.div_search);
            this.div_search.addChild(obj.name, obj);
            obj.set_taborder("0");
            obj.set_text("Combo00");
            obj = new Combo("Combo01", "absolute", "175", "12", "150", "33", null, null, this.div_search);
            this.div_search.addChild(obj.name, obj);
            obj.set_taborder("1");
            obj.set_text("Combo00");
            obj = new Combo("Combo02", "absolute", "335", "12", "150", "33", null, null, this.div_search);
            this.div_search.addChild(obj.name, obj);
            obj.set_taborder("2");
            obj.set_text("Combo00");
            obj = new Combo("Combo03", "absolute", "495", "12", "150", "33", null, null, this.div_search);
            this.div_search.addChild(obj.name, obj);
            obj.set_taborder("3");
            obj.set_text("Combo00");
            obj = new Radio("Radio00", "absolute", "16", "54", "328", "34", null, null, this.div_search);
            this.div_search.addChild(obj.name, obj);
            obj.set_taborder("4");
            obj = new Radio("Radio01", "absolute", "400", "54", "344", "34", null, null, this.div_search);
            this.div_search.addChild(obj.name, obj);
            obj.set_taborder("5");

            obj = new Static("Static01", "absolute", "0", "99", null, "20", "0", null, this);
            obj.set_taborder("4");
            obj.set_text("h20");
            obj.style.set_background("gainsboro");
            obj.style.set_align("center middle");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Div("div_body", "absolute", "0", "119", null, null, "0", "0", this);
            obj.set_taborder("5");
            obj.style.set_border("1 solid #808080ff");
            this.addChild(obj.name, obj);
            obj = new Grid("Grid00", "absolute", "20", "24", null, null, "20", "20", this.div_body);
            obj.set_taborder("0");
            obj.set_binddataset("ds_list");
            obj.set_autoenter("select");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row band=\"head\" size=\"24\"/><Row band=\"body\" size=\"24\"/></Rows><Band id=\"head\"><Cell col=\"0\" disptype=\"normal\" text=\"Column0\"/><Cell col=\"1\" disptype=\"normal\" text=\"Column1\"/><Cell col=\"2\" disptype=\"normal\" text=\"Column2\"/><Cell col=\"3\" disptype=\"normal\" text=\"Column3\"/><Cell col=\"4\" disptype=\"normal\" text=\"Column4\"/><Cell col=\"5\" disptype=\"normal\" text=\"Column5\"/></Band><Band id=\"body\"><Cell col=\"0\" disptype=\"normal\" text=\"bind:Column0\"/><Cell col=\"1\" disptype=\"normal\" text=\"bind:Column1\"/><Cell col=\"2\" disptype=\"normal\" text=\"bind:Column2\"/><Cell col=\"3\" disptype=\"normal\" text=\"bind:Column3\"/><Cell col=\"4\" disptype=\"normal\" text=\"bind:Column4\"/><Cell col=\"5\" disptype=\"normal\" text=\"bind:Column5\"/></Band></Format></Formats>");
            this.div_body.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 0, 99, this.div_search,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("3");
            		p.style.set_border("1 solid #808080ff");

            	}
            );
            this.div_search.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 0, 0, this.div_body,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("5");
            		p.style.set_border("1 solid #808080ff");

            	}
            );
            this.div_body.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 1014, 671, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("sample004");
            		p.set_titletext("Comm Code");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.addIncludeScript("sample03.xfdl", "lib::comForm.xjs");
        this.registerScript("sample03.xfdl", function() {
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

        
        //-------------------------------------------------------------------------------------------------
        // 2. Form 함수 정의
        //-------------------------------------------------------------------------------------------------
        this.form_onload = function(obj,e)
        {
        	// Form Load 시 필수로 호출
        	//this.gfn_formOnLoad(obj);

        	//화면 초기설정
        	this.fn_init();
        }

        //초기설정
        this.fn_init = function()
        {
        	//공통코드 설정	
            var codeParam = [
        		//Combo
        		{group:"PATIENT_TYPE", dataset:"ds_type00", component:this.div_search.Combo00}
        		,{group:"PATIENT_TYPE", dataset:"ds_type01", component:this.div_search.Combo01, selecttype:"A"}
        		,{group:"PATIENT_TYPE", dataset:"ds_type02", component:this.div_search.Combo02, selecttype:"S"}
        		,{group:"PATIENT_TYPE", dataset:"ds_type03", component:this.div_search.Combo03, selecttype:"N"}
        		
        		//Radio
        		,{group:"PATIENT_TYPE", dataset:"ds_type04", component:this.div_search.Radio00, selecttype:"A"}
        		,{group:"PATIENT_TYPE", dataset:"ds_type05", component:this.div_search.Radio01, selecttype:"S"} 
        		
        		//Grid
        		,{group:"PATIENT_TYPE", dataset:"ds_type06", component:this.div_body.Grid00, bindcolumn:"Column0"}
        		,{group:"PATIENT_TYPE", dataset:"ds_type07", component:this.div_body.Grid00, bindcolumn:"Column1", edittype:false}
        		,{group:"PROGRESS_TYPE", dataset:"ds_type08", component:this.div_body.Grid00, bindcolumn:"Column2"}
        		,{group:"PROGRESS_TYPE", dataset:"ds_type09", component:this.div_body.Grid00, bindcolumn:"Column3", edittype:false}
        		
        		//Dataset만 생성
        		,{code:"PATIENT_TYPE", innerdataset:"ds_type"}
            ];
            
        	this.gfn_getCommonCode(codeParam);		
        }

        //-------------------------------------------------------------------------------------------------
        // 3. Transaction 함수 정의
        //-------------------------------------------------------------------------------------------------

        //-------------------------------------------------------------------------------------------------
        // 4. User 함수 정의
        //-------------------------------------------------------------------------------------------------

        //-------------------------------------------------------------------------------------------------
        // 5. Event 함수 정의
        //------------------------------------------------------------------------------------------------

        this.div_body_Grid00_oncellclick = function(obj,e)
        {
        // 	if(e.cell == 2)
        // 	obj.dropdownCombo();
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.ds_list.addEventHandler("oncolumnchanged", this.ds_list_oncolumnchanged, this);
            this.addEventHandler("onload", this.form_onload, this);
            this.div_body.Grid00.addEventHandler("oncellclick", this.div_body_Grid00_oncellclick, this);

        };

        this.loadIncludeScript("sample03.xfdl");

       
    };
}
)();
