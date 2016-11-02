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
                this.set_name("XComp_sub2");
                this.set_classname("XComp_sub2");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,400,400);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("Static00", "absolute", "13", "39", "363", "60", null, null, this);
            obj.set_taborder("0");
            obj.set_text("var param = Eco.XComp.getPopupArguments(this, ['name', 'address']);\r\n\r\nalert(param.name + \" : \" + param.address);");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 400, 400, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("XComp_sub2");
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("XComp_sub2.xfdl", function() {

        this.XComp_sub2_onload = function(obj,e)
        {
        	var param = Eco.XComp.getPopupArguments(this, ['name', 'address']);
        	
        	alert(param.name + " : " + param.address);
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.XComp_sub2_onload, this);

        };

        this.loadIncludeScript("XComp_sub2.xfdl");

       
    };
}
)();
