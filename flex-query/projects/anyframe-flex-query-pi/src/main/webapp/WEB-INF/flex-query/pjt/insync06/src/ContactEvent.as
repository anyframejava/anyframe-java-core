package
{
	import flash.events.Event;
	import org.anyframe.flex.messaging.data.DataRow;
	
	public class ContactEvent extends Event
	{
		public static const CREATED:String = "contactCreated";
		public static const UPDATED:String = "contactUpdated";
		public static const DELETED:String = "contactDeleted";
	
		public var contact:DataRow;
		
		public function ContactEvent(type:String, contact:DataRow, bubbles:Boolean = true, cancelable:Boolean = false)
   		{
   			this.contact = contact;
			super(type, bubbles, cancelable);
		}
	}
}