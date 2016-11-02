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
                this.set_name("workframe");
                this.set_classname("workframe");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,1264,768);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Div("div_base", "absolute", "0", "0", null, null, "0", "0", this);
            obj.set_taborder("0");
            this.addChild(obj.name, obj);
            obj = new Div("div_title", "absolute", "20", "0", null, "50", "20", null, this.div_base);
            obj.set_taborder("0");
            this.div_base.addChild(obj.name, obj);
            obj = new Static("stc_title", "absolute", "0", "0", "434", null, null, "0", this.div_base.div_title);
            obj.set_taborder("0");
            obj.set_visible("false");
            this.div_base.div_title.addChild(obj.name, obj);
            obj = new Button("btn_submenu_0", "absolute", "451", "0", "95", null, null, "0", this.div_base.div_title);
            obj.set_taborder("1");
            obj.set_visible("false");
            this.div_base.div_title.addChild(obj.name, obj);
            obj = new Button("btn_submenu_1", "absolute", "545", "0", "87", null, null, "0", this.div_base.div_title);
            obj.set_taborder("2");
            obj.set_visible("false");
            this.div_base.div_title.addChild(obj.name, obj);
            obj = new Button("btn_submenu_2", "absolute", "631", "0", "87", null, null, "0", this.div_base.div_title);
            obj.set_taborder("3");
            obj.set_visible("false");
            this.div_base.div_title.addChild(obj.name, obj);
            obj = new Button("btn_submenu_3", "absolute", "717", "0", "87", null, null, "0", this.div_base.div_title);
            obj.set_taborder("4");
            obj.set_visible("false");
            this.div_base.div_title.addChild(obj.name, obj);
            obj = new Button("btn_submenu_4", "absolute", "803", "0", "87", null, null, "0", this.div_base.div_title);
            obj.set_taborder("5");
            obj.set_visible("false");
            this.div_base.div_title.addChild(obj.name, obj);
            obj = new Button("btn_newwindow", "absolute", null, "8", "48", "34", "40", null, this.div_base.div_title);
            obj.set_taborder("6");
            obj.set_text("꺼내기");
            this.div_base.div_title.addChild(obj.name, obj);
            obj = new Button("btn_expandwindow", "absolute", null, "8", "32", "34", "0", null, this.div_base.div_title);
            obj.set_taborder("7");
            obj.set_text("확대");
            this.div_base.div_title.addChild(obj.name, obj);
            obj = new Div("div_work", "absolute", "20", "50", null, null, "20", "20", this.div_base);
            obj.set_taborder("1");
            this.div_base.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 0, 50, this.div_base.div_title,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("0");

            	}
            );
            this.div_base.div_title.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 0, 0, this.div_base,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("0");

            	}
            );
            this.div_base.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 1264, 768, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("workframe");
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.addIncludeScript("workframe.xfdl", "lib::comFrame.xjs");
        this.registerScript("workframe.xfdl", function() {
        //include "lib::comFrame.xjs"

        this.fv_menuid = null;
        this.fv_menunm = null;
        this.fv_menuurl = null;

        this.form_onload = function(obj,e)
        {
        	this.gfn_frameOnSize(obj, this.div_base);
        }

        this.form_init = function(sMenuId,sMenuNm,sMenuUrl)
        {	
        	this.fv_menuid = sMenuId;
        	this.fv_menunm = sMenuNm;
        	this.fv_menuurl = sMenuUrl;
        	
        	//타이틀영역에 화면 타이틀추가(하위메뉴가 있는경우 버튼으로 하위메뉴추가)
        	this.fn_setTitleArea(this.fv_menuid, this.fv_menuurl);
        	
        	//선택
        	this.div_base.div_work.set_url(this.fv_menuurl);
        	
        	this.div_base.resetScroll();
        }

        this.form_onsize = function(obj,e)
        {
        	this.gfn_frameOnSize(obj, this.div_base);
        }

        this.fn_setTitleArea = function(sMenuId,sMenuUrl)
        {
        	var divTitle = this.div_base.div_title;
        	var dsMenu = application.gds_menu;
        	
        	dsMenu.set_enableevent(false);
        	
        	//선택한 메뉴의 레벨에 따른 상위메뉴정보 얻기
        	var nLevel = parseInt(dsMenu.lookup("MENU_ID", sMenuId, "LEVEL"));
        	var sUpperMenuId = "";
        	if(nLevel == 2)
        	{
        		sUpperMenuId = sMenuId;
        	}
        	else if(nLevel == 3)
        	{
        		sUpperMenuId = dsMenu.lookup("MENU_ID", sMenuId, "UPPER_MENU_ID");
        	}
        	
        	//하위 메뉴가 없으면 타이틀표시, 있으면 버튼으로 하위메뉴표시
        	var nChildCnt = dsMenu.getCaseCount("UPPER_MENU_ID=='"+sUpperMenuId+"'");

        	var sTitle = "";
        	if(nChildCnt == 0)
        	{
        		divTitle.stc_title.set_visible(true);
        		for(var i = 0; i < 5; i++)
        		{
        			divTitle.components["btn_submenu_"+i].set_visible(false);
        			divTitle.components["btn_submenu_"+i].menuid = null;
        		}
        		
        		sTitle = dsMenu.lookup("MENU_ID", sUpperMenuId, "MENU_NM");
        		divTitle.stc_title.set_text(sTitle);
        	}
        	else
        	{		
        		divTitle.stc_title.set_visible(false);
        		
        		var nLeft = 0, nWidth = 100, MARGIN = 40;
        		var objBtn, ojbBtnSize, sBtnText;
        		dsMenu.filter("UPPER_MENU_ID=='"+sUpperMenuId+"'");
        		
        		//하위메뉴버튼설정
        		for(var i = 0; i < 5; i++)
        		{
        			objBtn = divTitle.components["btn_submenu_"+i];
        			if(i < nChildCnt)
        			{
        				objBtn.set_visible(true);
        				objBtn.menuid = dsMenu.getColumn(i, "MENU_ID");
        				sBtnText = dsMenu.getColumn(i, "MENU_NM");
        				objBtn.set_text(sBtnText);
        				
        				if(sMenuUrl == dsMenu.getColumn(i, "MENU_URL"))
        				{
        					//to-do
        					//objBtn.set_cssclass("");
        					objBtn.style.set_gradation("linear 0,0 #ecece5ff 0,100 #fefefeff");
        				}
        				oBtnSize = Eco.XComp.PositionSize.getTextSize(objBtn);
        				objBtn.set_left(nLeft);
        				objBtn.set_width(oBtnSize[0] + MARGIN);
        				
        				nLeft += oBtnSize[0] + MARGIN;
        			}
        			else
        			{
        				objBtn.set_visible(false);
        				objBtn.menuid = null;
        			}
        		}
        		dsMenu.filter("");
        	}
        	
        	dsMenu.set_enableevent(true);	
        }

        this.submenu_onclick = function(obj,e)
        {
        	var sMenuId = obj.menuid;
        	if(!Eco.isEmpty(sMenuId))
        	{		
        		var divTitle = this.div_base.div_title;
        		var objBtn, ojbBtnSize, sBtnText;
        		for(var i = 0; i < 5; i++)
        		{
        			objBtn = divTitle.components["btn_submenu_"+i];
        			if(objBtn.menuid == sMenuId)
        			{
        				//to-do
        				//objBtn.set_cssclass("");
        				objBtn.style.set_gradation("linear 0,0 #ecece5ff 0,100 #fefefeff");
        			}
        			else
        			{
        				//to-do
        				//objBtn.set_cssclass("");
        				objBtn.style.set_gradation("linear 0,0 #fefefeff 0,100 #ecece5ff");
        			}
        		}
        		
        		var rtn = this.gfn_openMenu(sMenuId);
        	}
        }

        this.div_base_div_title_btn_newwindow_onclick = function(obj,e)
        {
        	
        }

        this.div_base_div_title_btn_expandwindow_onclick = function(obj,e)
        {
        	//축소
        	if(obj._expand)
        	{
        		this.gfn_setVFrameChange("work");
        		this.gfn_frameOnSize(this, this.div_base);
        		obj._expand = false;
        	}
        	//확대
        	else
        	{
        		this.gfn_setVFrameChange("expand");
        		this.div_base.set_left(0);
        		this.div_base.set_right(0);
        		obj._expand = true;
        	}
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.form_onload, this);
            this.addEventHandler("onsize", this.form_onsize, this);
            this.div_base.div_title.btn_submenu_0.addEventHandler("onclick", this.submenu_onclick, this);
            this.div_base.div_title.btn_submenu_1.addEventHandler("onclick", this.submenu_onclick, this);
            this.div_base.div_title.btn_submenu_2.addEventHandler("onclick", this.submenu_onclick, this);
            this.div_base.div_title.btn_submenu_3.addEventHandler("onclick", this.submenu_onclick, this);
            this.div_base.div_title.btn_submenu_4.addEventHandler("onclick", this.submenu_onclick, this);
            this.div_base.div_title.btn_newwindow.addEventHandler("onclick", this.div_base_div_title_btn_newwindow_onclick, this);
            this.div_base.div_title.btn_expandwindow.addEventHandler("onclick", this.div_base_div_title_btn_expandwindow_onclick, this);

        };

        this.loadIncludeScript("workframe.xfdl");

       
    };
}
)();
