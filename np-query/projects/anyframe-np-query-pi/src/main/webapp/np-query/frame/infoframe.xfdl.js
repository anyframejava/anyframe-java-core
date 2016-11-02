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
                this.set_name("infoframe");
                this.set_classname("topframe");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,1264,45);
            }
            this.style.set_background("#3378c1ff");

            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Div("div_base", "absolute", "0", "0", null, null, "0", "0", this);
            obj.set_taborder("0");
            this.addChild(obj.name, obj);
            obj = new Static("Static00", "absolute", "0", "0", null, null, "0", "0", this.div_base);
            obj.set_taborder("0");
            obj.style.set_background("transparent URL('images::a_test_info.png') stretch");
            this.div_base.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 0, 0, this.div_base,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("0");

            	}
            );
            this.div_base.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 1264, 45, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("topframe");
            		p.set_titletext("New Form");
            		p.style.set_background("#3378c1ff");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.addIncludeScript("infoframe.xfdl", "lib::comFrame.xjs");
        this.registerScript("infoframe.xfdl", function() {
        //include "lib::comFrame.xjs"

        this.form_onload = function(obj,e)
        {	
        	this.gfn_frameOnSize(obj, this.div_base);
        }

        this.form_onsize = function(obj,e)
        {
        	this.gfn_frameOnSize(obj, this.div_base);
        }
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.form_onload, this);
            this.addEventHandler("onsize", this.form_onsize, this);

        };

        this.loadIncludeScript("infoframe.xfdl");

       
    };
}
)();
