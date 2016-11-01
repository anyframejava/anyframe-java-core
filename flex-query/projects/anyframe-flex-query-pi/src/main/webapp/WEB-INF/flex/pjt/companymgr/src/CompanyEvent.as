package
{
	import flash.events.Event;
	import org.anyframe.flex.messaging.data.DataRow;
	
	public class CompanyEvent extends Event
	{
		public static const CREATED:String = "companyCreated";
		public static const UPDATED:String = "companyUpdated";
		public static const DELETED:String = "companyDeleted";
	
		public var company:DataRow;
		
		public function CompanyEvent(type:String, company:DataRow, bubbles:Boolean = true, cancelable:Boolean = false)
   		{
   			this.company = company;
			super(type, bubbles, cancelable);
		}
	}
}