package samples.event
{
	import samples.domain.Board;
	import flash.events.Event;

	public class BoardEvent extends Event
	{
		public static const SAVE:String = "boardSave";
		public static const CANCEL:String = "boardCancel";
		public static const UPDATE:String = "boardUpdate";
		
		public var board:Board;
		
		public function BoardEvent(type:String, board:Board = null, bubbles:Boolean = true, cancelable:Boolean = false)
   		{
			this.board = board;
			super(type, bubbles, cancelable);
		}
	}
}