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
                this.set_name("Sample_validation");
                this.set_classname("SAMPL00050_2_정합성체크");
                this.set_titletext("Validation");
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
            obj._setContents("<ColumnInfo><Column id=\"Column0\" type=\"STRING\" size=\"256\"/><Column id=\"Column1\" type=\"STRING\" size=\"256\"/><Column id=\"Column2\" type=\"STRING\" size=\"256\"/><Column id=\"Column3\" type=\"STRING\" size=\"256\"/><Column id=\"Column4\" type=\"STRING\" size=\"256\"/><Column id=\"Column5\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/><Row/></Rows>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Div("div_search", "absolute", "0", "0", null, "99", "0", null, this);
            obj.set_taborder("0");
            obj.style.set_border("1 solid #808080ff");
            this.addChild(obj.name, obj);
            obj = new Combo("Combo00", "absolute", "415", "16", "120", "28", null, null, this.div_search);
            this.div_search.addChild(obj.name, obj);
            var Combo00_innerdataset = new Dataset("Combo00_innerdataset", this.div_search.Combo00);
            Combo00_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">1</Col><Col id=\"datacolumn\">의뢰</Col></Row><Row><Col id=\"codecolumn\">2</Col><Col id=\"datacolumn\">되의뢰</Col></Row></Rows>");
            obj.set_innerdataset(Combo00_innerdataset);
            obj.set_taborder("6");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj = new Edit("Edit00", "absolute", "146", "16", "120", "28", null, null, this.div_search);
            obj.set_taborder("7");
            this.div_search.addChild(obj.name, obj);
            obj = new Button("Button00", "absolute", "884", "12", "120", "31", null, null, this.div_search);
            obj.set_taborder("8");
            obj.set_text("조회");
            this.div_search.addChild(obj.name, obj);
            obj = new Static("Static00", "absolute", "14", "16", "120", "28", null, null, this.div_search);
            obj.set_taborder("9");
            obj.set_text("환자명");
            obj.style.set_align("right middle");
            this.div_search.addChild(obj.name, obj);
            obj = new Static("Static01", "absolute", "278", "16", "120", "28", null, null, this.div_search);
            obj.set_taborder("10");
            obj.set_text("환자구분");
            obj.style.set_align("right middle");
            this.div_search.addChild(obj.name, obj);
            obj = new Calendar("Calendar00", "absolute", "617", "16", "120", "28", null, null, this.div_search);
            this.div_search.addChild(obj.name, obj);
            obj.set_taborder("11");

            obj = new Static("Static01", "absolute", "0", "99", null, "20", "0", null, this);
            obj.set_taborder("1");
            obj.set_text("h20");
            obj.style.set_background("gainsboro");
            obj.style.set_align("center middle");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Div("div_body", "absolute", "0", "119", null, null, "0", "0", this);
            obj.set_taborder("2");
            obj.style.set_border("1 solid #808080ff");
            this.addChild(obj.name, obj);
            obj = new Grid("Grid00", "absolute", "0", "0", null, null, "0", "0", this.div_body);
            obj.set_taborder("0");
            obj.set_binddataset("ds_list");
            obj.set_autoenter("select");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"Column0\"/><Cell col=\"1\" text=\"Column1\"/><Cell col=\"2\" text=\"Column2\"/><Cell col=\"3\" text=\"Column3\"/><Cell col=\"4\" text=\"Column4\"/><Cell col=\"5\" text=\"Column5\"/></Band><Band id=\"body\"><Cell edittype=\"normal\" text=\"bind:Column0\"/><Cell col=\"1\" edittype=\"normal\" text=\"bind:Column1\"/><Cell col=\"2\" edittype=\"normal\" text=\"bind:Column2\"/><Cell col=\"3\" edittype=\"normal\" text=\"bind:Column3\"/><Cell col=\"4\" edittype=\"normal\" text=\"bind:Column4\"/><Cell col=\"5\" edittype=\"normal\" text=\"bind:Column5\"/></Band></Format></Formats>");
            this.div_body.addChild(obj.name, obj);
            obj = new Button("Button00", "absolute", "884", "12", "120", "31", null, null, this.div_body);
            obj.set_taborder("1");
            obj.set_text("저장");
            this.div_body.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 0, 99, this.div_search,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("0");
            		p.style.set_border("1 solid #808080ff");

            	}
            );
            this.div_search.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 0, 0, this.div_body,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("2");
            		p.style.set_border("1 solid #808080ff");

            	}
            );
            this.div_body.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 1014, 671, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("SAMPL00050_2_정합성체크");
            		p.set_titletext("Validation");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information
            obj = new BindItem("item13","Div00.Edit11","value","ds_list","Column0");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item14","div_00.mae_rsrno","value","ds_list","Column6");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item15","div_00.mae_ms","value","ds_list","MS");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item16","div_00.mae_hm","value","ds_list","HM");
            this.addChild(obj.name, obj);
            obj.bind();

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.addIncludeScript("sample05.xfdl", "lib::comForm.xjs");
        this.addIncludeScript("sample05.xfdl", "lib::comValidation.xjs");
        this.registerScript("sample05.xfdl", function() {
        //include "lib::comForm.xjs";
        //include "lib::comValidation.xjs";

        //조회
        this.div_search_Button00_onclick = function(obj,e)
        {
        	var valid = 	
        		[
        			{component:this.div_search.Edit00, title:this.div_search.Static00}
        			,{component:this.div_search.Combo00, title:this.div_search.Static01}
        			,{component:this.div_search.Calendar00, title:"조회기간"}
        		];
        		
        	if (!this.gfn_validation(valid)) return false;
        }

        //저장
        this.div_body_Button00_onclick = function(obj,e)
        {
        	var valid = 	
        		[
        			{component:this.div_body.Grid00, bindcolumn:"Column0"}
        			,{component:this.div_body.Grid00, bindcolumn:"Column1", title:"환자구분"}
        			,{component:this.div_body.Grid00, bindcolumn:"Column2"}
        		];
        		
        	if (!this.gfn_validation(valid)) return false;	
        }
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.ds_list.addEventHandler("canrowposchange", this.ds_list_canrowposchange, this);
            this.ds_list.addEventHandler("cancolumnchange", this.ds_list_cancolumnchange, this);
            this.addEventHandler("onload", this.form_onload, this);
            this.div_search.Button00.addEventHandler("onclick", this.div_search_Button00_onclick, this);
            this.div_body.Button00.addEventHandler("onclick", this.div_body_Button00_onclick, this);

        };

        this.loadIncludeScript("sample05.xfdl");

       
    };
}
)();
