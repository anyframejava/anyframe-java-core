//XJS=LoggerInclude.xjs
(function()
{
    return function(path)
    {
        var obj;
    
        // User Script
        this.registerScript(path, function() {

        this.includeFuncA = function()
        {
        	this.includeFuncB();
        }

        this.includeFuncB = function()
        {
        	Eco.Logger.debug({message: "Include Function Call", stack: true});
        }
        });


    
        this.loadIncludeScript(path);
        
        obj = null;
    };
}
)();
