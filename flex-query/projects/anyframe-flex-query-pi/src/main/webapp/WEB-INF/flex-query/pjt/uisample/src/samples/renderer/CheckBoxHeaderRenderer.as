package samples.renderer
{
	import mx.core.mx_internal;
	import mx.controls.CheckBox;
	import mx.controls.listClasses.BaseListData;
	import mx.controls.dataGridClasses.DataGridListData;
	import mx.collections.ArrayCollection;
	import mx.controls.DataGrid;
	import mx.events.FlexEvent;
	import flash.events.Event;
	import flash.events.MouseEvent;

	use namespace mx_internal;

	public class CheckBoxHeaderRenderer  extends CheckBox  {
	
		private static var _headerFlag : Boolean = false;
		private var _data:Object;
	
	
		public function CheckBoxHeaderRenderer(){
			super();
			this.addEventListener(MouseEvent.CLICK , mouseClickHandler);
		}
	  
	
		private function mouseClickHandler(event : Event) : void{
			if(DataGrid(owner).dataProvider is ArrayCollection){
				var dgData : ArrayCollection = DataGrid(owner).dataProvider as ArrayCollection ;
				if(listData != null && listData.rowIndex == 0){
			   		_headerFlag = selected;
					for(var i : int = 0 ; i < dgData.length ; i++){
						dgData[i][DataGridListData(listData).dataField] = _headerFlag;
					}  
				}else{
					   dgData[listData.rowIndex-1][DataGridListData(listData).dataField] = selected;
				}
				DataGrid(owner).invalidateList();
			}
		}
	
		override public function set data(value:Object):void{
			if(value == null){
			  return
			}
			if(listData.rowIndex != 0){
				_data = value[DataGridListData(listData).dataField];
		  		selected = _data;
			}else{
				selected = _headerFlag;
			}
		}
	
		override public function get data():Object{
			return _data;
		}

	}
}  