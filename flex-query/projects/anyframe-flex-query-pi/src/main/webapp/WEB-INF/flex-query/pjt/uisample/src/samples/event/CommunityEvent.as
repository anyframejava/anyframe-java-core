package samples.event
{
	import mx.collections.ArrayCollection;
	import flash.events.Event;
	
	public class CommunityEvent  extends Event
	{
		public static const COMPUTER:String = "getCommunityListByComputer";
		public static const CAR:String = "getCommunityListByCar";
		
		public function CommunityEvent(type:String, communityList:ArrayCollection, bubbles:Boolean = true, cancelable:Boolean = false)
   		{
			
			super(type, bubbles, cancelable);
		}
	}
}