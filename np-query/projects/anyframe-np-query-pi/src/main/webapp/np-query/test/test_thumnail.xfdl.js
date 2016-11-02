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
                this.set_name("test_thumnail");
                this.set_classname("test_thumnail");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,1024,768);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new ImageViewer("ImageViewer00", "absolute", "41", "88", "280", "300", null, null, this);
            obj.set_taborder("0");
            obj.set_image("URL('http://localhost:8080/test/Jellyfish.jpg')");
            obj.set_stretch("fixaspectratio");
            this.addChild(obj.name, obj);

            obj = new WebBrowser("WebBrowser00", "absolute", "365", "85", "280", "300", null, null, this);
            obj.set_taborder("1");
            obj.set_url("http://localhost:8080/test/video_tag.html");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 1024, 768, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("test_thumnail");
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

        this.loadIncludeScript("test_thumnail.xfdl");

       
    };
}
)();
