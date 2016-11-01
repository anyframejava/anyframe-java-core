package samples.util
{
	public class Util
	{
		public function Util()
		{
		}
		public static function getToday():String{
			var today:Date = new Date();
			var year:String = today.getFullYear().toString();
			
			var month:String;
			if ( (today.getMonth() + 1) < 10  ){
				month = "0" + (today.getMonth() + 1).toString();
			}else{
				month = (today.getMonth() + 1).toString()
			}
			
			var day:String;
			if ( today.getDate() < 10 ){
				day = "0" + today.getDate();
			}else{
				day = today.getDate().toString();
			}
			var date:String = year+"/"+month+"/"+day; 
			if (date.length == 10){
				return date;
			}
			return date;
		}
	}
}