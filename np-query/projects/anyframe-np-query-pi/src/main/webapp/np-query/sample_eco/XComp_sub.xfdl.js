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
                this.set_name("XComp_sub");
                this.set_classname("XComp_sub");
                this.set_titletext("Eco.XComp");
                this._setFormPosition(0,0,1024,685);
            }
            this.getSetter("inheritanceid").set("");

            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Button("Button00", "absolute", "4", "1", "32", "18", null, null, this);
            obj.set_taborder("1");
            obj.set_text("get");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 1024, 685, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("XComp_sub");
            		p.getSetter("inheritanceid").set("");
            		p.set_titletext("Eco.XComp");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("XComp_sub.xfdl", function() {
        /*
         * Eco.XComp api Sample at nexacro
         * 
         *
         * Copyright (c) 2014 EcoSystem of TOBESOFT
         * Licensed Free under nexacro.
        */

        
        this.Button00_onclick = function(obj,e)
        {
        	var form = this.fn_getTopForm();
        	trace(form.name);
        }

        this.fn_getTopForm = function()
        {
        	var form = Eco.XComp.getTopLevelForm(this);
        	
        	return form;
        }
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.Button00.addEventHandler("onclick", this.Button00_onclick, this);

        };

        this.loadIncludeScript("XComp_sub.xfdl");

       
    };
}
)();
