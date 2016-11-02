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
                this.set_name("sample006");
                this.set_classname("sample006");
                this.set_titletext("Popup");
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
            obj._setContents("<ColumnInfo><Column id=\"id\" type=\"STRING\" size=\"256\"/><Column id=\"name\" type=\"STRING\" size=\"256\"/><Column id=\"cd01\" type=\"STRING\" size=\"256\"/><Column id=\"cd02\" type=\"STRING\" size=\"256\"/><Column id=\"dis\" type=\"STRING\" size=\"256\"/><Column id=\"csj_code\" type=\"STRING\" size=\"256\"/><Column id=\"csj_code_multi\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"id\">a01</Col><Col id=\"name\">홍진영</Col><Col id=\"cd01\">BAS</Col><Col id=\"cd02\">CM</Col><Col id=\"dis\">사랑의 와이파이</Col><Col id=\"csj_code\">BAS</Col><Col id=\"csj_code_multi\">CM</Col></Row><Row><Col id=\"id\">a02</Col><Col id=\"name\">김준영</Col><Col id=\"cd01\">BIS</Col><Col id=\"cd02\">ET</Col><Col id=\"csj_code\">BIS</Col><Col id=\"csj_code_multi\">ET</Col></Row><Row><Col id=\"id\">a03</Col><Col id=\"name\">이윤정</Col><Col id=\"cd01\">DEV</Col><Col id=\"cd02\">EX</Col><Col id=\"csj_code\">DEV</Col><Col id=\"csj_code_multi\">EX</Col></Row></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_param", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"Column0\" type=\"STRING\" size=\"256\"/><Column id=\"Column1\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"Column0\">11</Col><Col id=\"Column1\">22</Col></Row><Row><Col id=\"Column0\">33</Col><Col id=\"Column1\">44</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Button("Button00", "absolute", "41", "29", "152", "50", null, null, this);
            obj.set_taborder("0");
            obj.set_text("Modal Popup");
            this.addChild(obj.name, obj);

            obj = new Button("Button01", "absolute", "41", "93", "152", "50", null, null, this);
            obj.set_taborder("1");
            obj.set_text("Modeless Popup");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 1014, 671, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("sample006");
            		p.set_titletext("Popup");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.addIncludeScript("sample06.xfdl", "lib::comForm.xjs");
        this.registerScript("sample06.xfdl", function() {
        //include "lib::comForm.xjs";

        //Modal Popup
        this.Button00_onclick = function(obj,e)
        {
        	//option 속성설정 : top, left, width, height, title, titletext, status, modeless, layered, opacity, autosize, resizable
        	var oOption = {};
        	oOption.width = 500;
        	oOption.height = 500;
        	
        	//Parameter
        	var oArg = {pString:"Test", pArray:["R", "S"], pDataset:this.ds_param}; 
        	
        	//Modal 팝업오픈
        	var rtn = this.gfn_popup("popup_modal", "sample::sample06_P.xfdl", oArg, oOption, "fn_popupCallback");	
        }

        //Modeless Popup
        this.Button01_onclick = function(obj,e)
        {
        	//Modeless 팝업 오픈(option에 modeless=true 속성추가)
        	var oOption = {};
        	oOption.width = 500;
        	oOption.height = 500;
        	oOption.modeless = true;
        	
        	//Parameter
        	var oArg = {pString:"Test", pArray:["R", "S"], pDataset:this.ds_param}; 
        	
        	//Modeless 팝업오픈
        	var rtn = this.gfn_popup("popup_modeless","sample::sample06_P.xfdl", oArg ,oOption, "fn_popupCallback");		
        }

        //Popup CallBack
        this.fn_popupCallback = function(sPopId,oRtn)
        {	
        	switch(sPopId)
        	{
        		case "popup_modal" : 
        			break;
        		case "popup_modeless" : 
        			break;
        		default : 
        			break;
        	}
        	trace("Popup Return sPopId = "+sPopId);
        	trace(oRtn.String);
        	trace(oRtn.Array);
        	trace(oRtn.Dataset.saveXML());
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.ds_list.addEventHandler("oncolumnchanged", this.ds_list_oncolumnchanged, this);
            this.addEventHandler("onload", this.form_onload, this);
            this.Button00.addEventHandler("onclick", this.Button00_onclick, this);
            this.Button01.addEventHandler("onclick", this.Button01_onclick, this);

        };

        this.loadIncludeScript("sample06.xfdl");

       
    };
}
)();
