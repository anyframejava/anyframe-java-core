package samples.event
{
	import flash.events.Event;
	import samples.domain.Product;

	public class ProductEvent extends Event
	{
		public static const UPDATED:String = "productUpdated";
		public static const DELETED:String = "productDeleted";
	
		public var product:Product;
		
		public function ProductEvent(type:String, product:Product, bubbles:Boolean = true, cancelable:Boolean = false)
   		{
   			this.product = product;
			super(type, bubbles, cancelable);
		}
	}
}