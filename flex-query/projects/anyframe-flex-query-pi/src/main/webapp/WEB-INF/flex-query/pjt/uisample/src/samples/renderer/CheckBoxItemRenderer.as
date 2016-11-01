package samples.renderer
{
	import mx.controls.dataGridClasses.DataGridColumn;
	[Event(name="click", type="flash.events.MouseEvent")]
	
	public class CheckBoxItemRenderer extends DataGridColumn
	{
		public function CheckBoxItemRenderer(columnName:String=null)
		{
			super(columnName);
		}
		/**is the checkbox selected**/
		public var selected:Boolean = false;
	}
}