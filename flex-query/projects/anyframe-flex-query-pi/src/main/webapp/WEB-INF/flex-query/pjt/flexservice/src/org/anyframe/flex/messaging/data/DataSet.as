package org.anyframe.flex.messaging.data
{
	import flash.utils.IDataInput;
	import flash.utils.IDataOutput;
	
	import mx.collections.ArrayCollection;
	import mx.collections.IList;
	import mx.events.CollectionEvent;
	import mx.events.CollectionEventKind;
	import mx.events.PropertyChangeEvent;
	import mx.skins.halo.ListDropIndicator;
	import mx.utils.ObjectProxy;
	import mx.utils.ObjectUtil;
	
	[Bindable]
	[RemoteClass(alias="org.anyframe.flex.query.data.DataSet")]
	public class DataSet extends ArrayCollection
	{	
		// DataSet Name
		public var dataSetName:String = "";
		
		// Insert, Update, Delete Query Id
		public var selectQueryId:String = "";
		public var insertQueryId:String="";
		public var updateQueryId:String="";
		public var deleteQueryId:String="";
		public var currentPage:int = 1;
		public var totalCount:int;
		public var pageunit:int = 10;
		public var pagesize:int = 10;
		public var maxPage:int;
		public var beginUnitPage:int;
		public var endUnitPage:int;
		
		// true  : send changed data only,
		// false : send all data(ROWTYPE will be changed as 'U') 
		public var useChangeInfo:Boolean = true; 
		
		// move to remove buffer
		private var _removeDataBuffer:ArrayCollection=new ArrayCollection();
		
		public function DataSet(source:Array=null,name:String="")
		{
			super(source);
			setChangeEvent(true);
		}
		
		
		public function setChangeEvent(flag:Boolean):void
		{	
			if( flag ) {
				addEventListener(CollectionEvent.COLLECTION_CHANGE, collectionHandler);
			} else {
				removeEventListener(CollectionEvent.COLLECTION_CHANGE, collectionHandler);
			}
		}
		
		/**
		 * Event Handler when DataRow in the Collection changed.
		 * Set Update Flag.
		 */
		private function collectionHandler(event:CollectionEvent):void
		{
			var changeObject:Object = null;
			var changeIndex:int = -1;
			
			if( event.kind == CollectionEventKind.UPDATE ) {
				
				for each(var propertyCE:PropertyChangeEvent in event.items ) {
					changeObject = propertyCE.source;
					
					if(propertyCE.property.toString() != "ROWTYPE") { //ROWTYPE변경이 아닌 경우만 					
						if(changeObject is DataRow){
							if((changeObject as DataRow).ROWTYPE != "I")
								(changeObject as DataRow).ROWTYPE = "U"; 
						}
					}
				}
			}
		}
		
		/**
		 * Clear buffer and ROWTYPE 
		 */
		public function clearBuffer():void
		{
			removeDataBuffer.removeAll();
			
			if( length > 0 ){
				for( var i:int=0 ; i<length ; i++ ){
					DataRow(this[i]).ROWTYPE = "";
				}
			}
		}
		
		/**
		 * Clear all Collection data and buffer 
		 */
		public function clear():void
		{
			clearBuffer();			
			super.removeAll();
		}
		
		
		private function addItemRaw(item:DataRow):void {
			//super.addItem(item);
			source.push(item);
			//super.addItem(item);
		}
		
		
		/********************** override function ***************************/
		
		/** add function(Insert Flag) **/
		public override function addItem(item:Object):void{
			var dw:DataRow = new DataRow(item);
			dw.ROWTYPE = "I";
			//source.push(dw);
			super.addItem(dw);	
		}
		
		
		public override function addItemAt(item:Object, index:int):void{
			var dw:DataRow = new DataRow(item);
			dw.ROWTYPE = "I";
			super.addItemAt(dw, index);	
		}
		
		public override function addAll(addList:IList):void{
			for(var i:int=0; i<addList.length; i++){
				this.addItem(addList[i]);
			}
		}
		public override function addAllAt(addList:IList, index:int):void{
			for(var i:int=0; i<addList.length; i++){
				this.addItemAt(addList[i], index);
				index++;
			}
		}
		
		/** remove function(Remove Flag) **/
		public override function removeItemAt(index:int):Object{
			
			var row:Object = super.removeItemAt(index);
			
			if(row is DataRow  && (row as DataRow).ROWTYPE != "I")
			{
				(row as DataRow).ROWTYPE = "D";
				_removeDataBuffer.addItem(row);
			}
			return row;
		}
		
		public override function removeAll():void{
			for(var i:int=0; i<this.length; i++){
				this.removeItemAt(i);
			}
		}		
		
		public function get removeDataBuffer():ArrayCollection{
			return _removeDataBuffer;
		}
		
		public function set removeDataBuffer(arr:ArrayCollection):void{
			_removeDataBuffer=arr;
		}
		
		/** delete buffer + array data return **/
		public function getAllData() :DataSet {
			var arAll:DataSet = new DataSet();
			arAll.addAll(_removeDataBuffer);			
			arAll.addAll(new ArrayCollection(this.source));			
			return arAll;
		}
		
		/** i, u, d Row Return **/
		public function getModifyData() : DataSet {
			var arAll:DataSet = new DataSet();
			
			for(var i:int=0; i<_removeDataBuffer.length ; i++) {
				arAll.addItemRaw(_removeDataBuffer.getItemAt(i) as DataRow);
			}
			
			//arAll.addAll(_removeDataBuffer); //delete data
			
			for(var i:int=0 ; i<this.length ; i++) { //i, u data
				if(this.getItemAt(i) is DataRow){
					if( (this.getItemAt(i) as DataRow).ROWTYPE == "I"
					|| (this.getItemAt(i) as DataRow).ROWTYPE == "U" ) {
						arAll.addItemRaw(this.getItemAt(i) as DataRow);						
					}
				}
			}
				
			return arAll;
		}
		
		/** get only list data, except deleted data , and SET ROWTYPE TO 'U' **/
		public function getOnlyViewData() :DataSet {
			for(var i:int=0; i<this.length; i++) {
				if(this.getItemAt(i) is DataRow)
					(this.getItemAt(i) as DataRow).ROWTYPE = 'U'
			}
			
			var ds:DataSet = new DataSet(this.source);
			//ds.addAll();
			return ds; 
		}
		
	
		
		
		//************ Serializable **************/
		public override function readExternal(input:IDataInput):void {
			dataSetName = input.readObject() as String;
			selectQueryId = input.readObject() as String;
			insertQueryId = input.readObject() as String;
			updateQueryId = input.readObject() as String;
			deleteQueryId = input.readObject() as String;
			currentPage = input.readObject() as int;
			totalCount = input.readObject() as int;
			pageunit = input.readObject() as int;
			pagesize = input.readObject() as int;
			maxPage = input.readObject() as int;
			beginUnitPage = input.readObject() as int;
			endUnitPage = input.readObject() as int;
			this.addAll(input.readObject());
			
		}
		
		public override function writeExternal(output:IDataOutput):void {
			output.writeObject(dataSetName);
			output.writeObject(selectQueryId);
			output.writeObject(insertQueryId);
			output.writeObject(updateQueryId);
			output.writeObject(deleteQueryId);
			output.writeObject(currentPage);
			output.writeObject(totalCount);
			output.writeObject(pageunit);
			output.writeObject(pagesize);
			output.writeObject(maxPage);
			output.writeObject(beginUnitPage);
			output.writeObject(endUnitPage);
			var arrayCollection:ArrayCollection = new ArrayCollection(this.source);
			output.writeObject(arrayCollection);
		}
	}
}