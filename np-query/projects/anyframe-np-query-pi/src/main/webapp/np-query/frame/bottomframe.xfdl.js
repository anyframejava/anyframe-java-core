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
                this.set_name("bottomframe");
                this.set_classname("bottomframe");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,1264,140);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("Static00", "absolute", "0", "0", null, null, "0", "0", this);
            obj.set_taborder("0");
            obj.style.set_background("transparent URL('images::a_test_bottom.png') stretch");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 1264, 140, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("bottomframe");
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script

        
        // Regist UI Components Event
        this.on_initEvent = function()
        {

        };

        this.loadIncludeScript("bottomframe.xfdl");

       
    };
}
)();
