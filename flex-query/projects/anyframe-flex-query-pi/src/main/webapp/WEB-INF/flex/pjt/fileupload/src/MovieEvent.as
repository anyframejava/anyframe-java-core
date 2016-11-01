package
{
	import flash.events.Event;

	public class MovieEvent extends Event
	{
		public static const UPDATE:String = "movieUpdate";
		public static const CREATE:String = "movieCreate"; 
		public static const REMOVE:String = "movieRemove"; 
		public static const CANCEL:String = "movieCancel";
		
		public var movie:Movie;
		
		public function MovieEvent(type:String, movie:Movie = null, bubbles:Boolean = true, cancelable:Boolean = false)
   		{
			this.movie = movie;
			super(type, bubbles, cancelable);
		}
	}
}