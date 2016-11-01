package samples.event
{
	import flash.events.Event;
	import samples.domain.User;
	
	public class UserEvent extends Event
	{
		public static const UPDATE:String = "userUpdate";
		public static const CANCEL:String = "userCancel";
		public static const SAVE:String = "userSave";
		
		public var user:User;
		
		public function UserEvent(type:String, user:User, bubbles:Boolean = true, cancelable:Boolean = false)
   		{
			this.user = user;
			super(type, bubbles, cancelable);
		}
	}
}