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
                this.set_name("sample005");
                this.set_classname("improt");
                this.set_titletext("Message Popup");
                this._setFormPosition(0,0,1014,671);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Button("Button00", "absolute", "23", "36", "120", "50", null, null, this);
            obj.set_taborder("0");
            obj.set_text("Alert");
            this.addChild(obj.name, obj);

            obj = new Button("Button01", "absolute", "24", "107", "120", "50", null, null, this);
            obj.set_taborder("1");
            obj.set_text("Confirm");
            this.addChild(obj.name, obj);

            obj = new Button("Button02", "absolute", "175", "36", "120", "50", null, null, this);
            obj.set_taborder("2");
            obj.set_text("Alert(치환)");
            this.addChild(obj.name, obj);

            obj = new Button("Button03", "absolute", "176", "107", "120", "50", null, null, this);
            obj.set_taborder("3");
            obj.set_text("Confirm(치환)");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 1014, 671, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("improt");
            		p.set_titletext("Message Popup");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.addIncludeScript("sample04.xfdl", "lib::comForm.xjs");
        this.registerScript("sample04.xfdl", function() {
        //include "lib::comForm.xjs";

        this.Button00_onclick = function(obj,e)
        {
        	this.gfn_alert("aftersave");
        }

        this.Button01_onclick = function(obj,e)
        {
        	if(!this.gfn_confirm("beforesave")) return false;
        }

        this.Button02_onclick = function(obj,e)
        {
        	this.gfn_alert("validate", ["환자구분"]);
        }

        this.Button03_onclick = function(obj,e)
        {
        	if(!this.gfn_confirm("validate", ["환자구분"])) return false;
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.form_onload, this);
            this.Button00.addEventHandler("onclick", this.Button00_onclick, this);
            this.Button01.addEventHandler("onclick", this.Button01_onclick, this);
            this.Button02.addEventHandler("onclick", this.Button02_onclick, this);
            this.Button03.addEventHandler("onclick", this.Button03_onclick, this);

        };

        this.loadIncludeScript("sample04.xfdl");

       
    };
}
)();
