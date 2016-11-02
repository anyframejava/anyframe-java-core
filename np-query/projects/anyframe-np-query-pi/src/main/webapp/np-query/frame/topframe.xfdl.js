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
                this.set_name("topframe");
                this.set_classname("menuframe");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,1264,60);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("tds_topmenu", this);
            obj._setContents("");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new PopupDiv("pdv_menu", "absolute", "0", "101", "1117", "337", null, null, this);
            obj.style.set_background("#ffffffff");
            obj.style.set_border("1 solid #808080ff");
            obj.set_scrollbars("none");
            this.addChild(obj.name, obj);
            obj = new Grid("Grid00", "absolute", "24", "8", "171", "300", null, null, this.pdv_menu);
            obj.set_taborder("0");
            obj.set_visible("false");
            obj.style.set_border("0 none #808080");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"169\"/></Columns><Rows><Row size=\"24\"/></Rows><Band id=\"body\"><Cell style=\"align:left middle;line:0 none #808080ff ;background:transparent;background2:transparent;font:EXPR(comp.parent.parent.fn_getFont(LEVEL));\" text=\"expr:comp.parent.parent.fn_getMenuNm(LEVEL, MENU_NM)\"/></Band></Format></Formats>");
            this.pdv_menu.addChild(obj.name, obj);

            obj = new Div("div_base", "absolute", "0", "0", null, null, "0", "0", this);
            obj.set_taborder("1");
            this.addChild(obj.name, obj);
            obj = new Static("stc_home", "absolute", "0", "0", "230", null, null, "0", this.div_base);
            obj.set_taborder("0");
            obj.style.set_background("transparent URL('images::a_test_title.png')");
            this.div_base.addChild(obj.name, obj);
            obj = new Div("div_menu", "absolute", "230", "0", "760", null, null, "0", this.div_base);
            obj.set_taborder("1");
            this.div_base.addChild(obj.name, obj);
            obj = new Div("div_", "absolute", "990", "0", null, null, "0", "0", this.div_base);
            obj.set_taborder("2");
            this.div_base.addChild(obj.name, obj);
            obj = new Button("Button00", "absolute", null, "16", "120", "26", "8", null, this.div_base.div_);
            obj.set_taborder("0");
            obj.set_text("환자의뢰");
            this.div_base.div_.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 1117, 337, this.pdv_menu,
            	//-- Layout function
            	function(p) {
            		p.style.set_background("#ffffffff");
            		p.style.set_border("1 solid #808080ff");
            		p.set_scrollbars("none");

            	}
            );
            this.pdv_menu.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 0, 0, this.div_base.div_,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("2");

            	}
            );
            this.div_base.div_.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 0, 0, this.div_base,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("1");

            	}
            );
            this.div_base.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 1264, 60, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("menuframe");
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.addIncludeScript("topframe.xfdl", "lib::comFrame.xjs");
        this.registerScript("topframe.xfdl", function() {
        //include "lib::comFrame.xjs"

        this.form_onload = function(obj,e)
        {	
        	application.gv_islogin = true;
        	
        	this.fn_createMenuComp(application.gds_menu);
        	
        	this.gfn_frameOnSize(obj, this.div_base);
        }

        this.form_onsize = function(obj,e)
        {
        	this.gfn_frameOnSize(obj, this.div_base);
        }

        this.fn_createMenuComp = function(objDs)
        {	
        	var objDiv = this.div_base.div_menu;
        	var objPopupDiv = this.pdv_menu;
        	
        	objDs.set_enableevent(false);		
        	
        	//Top Menu 버튼 생성
        	var nLeft = 0, nTop = 0, nWidth = 140, nHeight = parseInt(objDiv.getOffsetHeight());
        	var OFFSET = 60, oSize;
        	var oButton = null, sButton = "";
        	var oGrid = null, sGrid = "";
        	var oDataset = null, sDataset = "";
        	var sMenuId, sMenuNm;
        	
        	objDs.filter("LEVEL=='1'");
        	this.tds_topmenu.copyData(objDs, true);
        	
        	for(var i = 0; i < this.tds_topmenu.rowcount; i++)
        	{
        		sMenuId = this.tds_topmenu.getColumn(i, "MENU_ID");
        		sMenuNm = this.tds_topmenu.getColumn(i, "MENU_NM");
        		
        		//Top Menu 버튼 생성
        		sButton = "btn_"+sMenuId;
        		oButton = objDiv.components[sButton];
        		if(Eco.isEmpty(oButton))
        		{			
        			oButton = new Button(sButton, "absolute", nLeft, nTop, nWidth, nHeight);
        			oButton.set_text(sMenuNm);
        			objDiv.addChild(sButton, oButton);
        			oButton.show();
        			oSize = Eco.XComp.PositionSize.getTextSize(oButton, oButton.text);
        			nWidth = oSize[0] + OFFSET;
        			oButton.set_width(nWidth);
        			//to-do : class 적용필요
        			//oButton.set_cssclass("");
        			oButton.set_style("background:#ffffffff;border:0 none #808080ff;font:bold 11 Dotum;");
        			oButton.addEventHandler("onclick", this.MenuComp_onclick, this);			
        		}
        		//메뉴그리드 생성
        		sGrid = "grd_"+ sMenuId;
        		oGrid = objPopupDiv.components[sGrid];
        		if(Eco.isEmpty(oGrid))
        		{
        			oGrid = new Grid(sGrid, "absolute", 230+10+nLeft, nTop, nWidth, objPopupDiv.getOffsetHeight());			
        			objPopupDiv.addChild(sGrid, oGrid);
        			oGrid.show();
        			oGrid.set_formats(this.fn_getGridFormats());
        			oGrid.set_width(nWidth);
        			oGrid.set_autofittype("col");
        			oGrid.set_useselcolor(false);
        			//to-do : class 적용필요
        			//oGrid.set_cssclass("");
        			oGrid.set_style("border:0 none;");
        			
        			oGrid.addEventHandler("oncellclick", this.MenuGrid_oncellclick, this);
        		}
        		//메뉴그리드 데이타셋 생성
        		sDataset = "ds_"+ sMenuId;
        		oDataset = this.objects[sDataset];
        		if(Eco.isEmpty(oDataset))
        		{
        			oDataset = new Dataset();			
        			this.addChild(sDataset, oDataset);
        			var sPrefixMenuId = sMenuId.substring(0, 4);
        			objDs.filter("String(UPPER_MENU_ID).indexOf('"+sPrefixMenuId+"') > -1");
        			oDataset.copyData(objDs, true);
        		}
        		oGrid.set_binddataset(oDataset);
        		
        		nLeft += nWidth;
        	}
        	
        	objDs.filter("");
        	objDs.set_enableevent(true);
        }

        this.fn_getGridFormats = function()
        {
        	var sFormts = "";
        		sFormts += '<Formats>';
        		sFormts += '<Format id="default">';
        		sFormts += '<Columns>';
        		sFormts += '<Column size="169" />';
        		sFormts += '</Columns>';
        		sFormts += '<Rows>';
        		sFormts += '<Row size="30" />';
        		sFormts += '</Rows>';
        		sFormts += '<Band id="body">';
        		sFormts += "<Cell style='align:left&#32;middle;line:0&#32;none&#32;#808080ff&#32;;background:transparent;background2:transparent;font:EXPR(comp.parent.parent.fn_getFont(LEVEL));' text='expr:comp.parent.parent.fn_getMenuNm(LEVEL,&#32;MENU_NM)'/>";
        		sFormts += '</Band>';
        		sFormts += '</Format>';
        		sFormts += '</Formats>';
        		
        	return sFormts;
        }

        this.fn_getMenuNm = function(level,menu_nm)
        {
        	level = parseInt(level);
        	if(level == 2) return menu_nm;
        	else return "* "+menu_nm;
        }

        this.fn_getFont = function(level)
        {
        	level = parseInt(level);
        	if(level == 2) return "bold 11 dotum";
        	else return "9 dotum";
        }

        this.MenuComp_onclick = function(obj,e)
        {
        	this.pdv_menu.set_width(this.div_base.getOffsetWidth());
        	this.pdv_menu.trackPopupByComponent(this.div_base, 0, this.div_base.getOffsetHeight());
        }

        this.MenuGrid_oncellclick = function(obj,e)
        {
        	if(!application.gv_islogin) return false;
        	
        	var objBindDs = obj.getBindDataset();
        	var sMenuId = objBindDs.getColumn(e.row, "MENU_ID");
        	var rtn = this.gfn_openMenu(sMenuId);
        	if(rtn)
        	{
        		this.gfn_setVFrameChange("work");
        		this.pdv_menu.closePopup();
        	}
        }

        this.div_base_stc_home_onclick = function(obj,e)
        {
        	this.gfn_setVFrameChange("home");
        }

        this.div_base_div__Button00_onclick = function(obj,e)
        {
        	window.resizeTo(100, 100);
        	//application.mainframe.set_openstatus("minimize");
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.form_onload, this);
            this.addEventHandler("onsize", this.form_onsize, this);
            this.div_base.stc_home.addEventHandler("onclick", this.div_base_stc_home_onclick, this);
            this.div_base.div_.Button00.addEventHandler("onclick", this.div_base_div__Button00_onclick, this);

        };

        this.loadIncludeScript("topframe.xfdl");

       
    };
}
)();
