package samples.renderer
{
	import mx.controls.Alert;
	import mx.rpc.events.FaultEvent;
	import mx.rpc.events.ResultEvent;
	public class ResultHandler
	{
		
		
		public function ResultHandler()
		{
		}
		
		public static function faultMessage(event:FaultEvent):void{
			Alert.show(event.fault.message);
		}
		
		public static function saveAllResultMessage(event:ResultEvent):String{
			
			var resultArray:Array = ["INSERT", "UPDATE", "DELETE"];
			
			var message:String = "";
		    	for ( var i:int = 0 ; i < 3 ; i ++ ){
		    		var count:int = event.result[resultArray[i]];
		    		message = message + count + " Row가 " + resultArray[i] + "\n";
		    	}
		    	message = message + "되었습니다.";
		    return message;
		}
	}
}