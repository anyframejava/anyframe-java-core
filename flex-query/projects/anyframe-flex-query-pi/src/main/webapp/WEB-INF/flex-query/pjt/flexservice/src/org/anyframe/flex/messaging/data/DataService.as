package org.anyframe.flex.messaging.data
{
	import mx.charts.chartClasses.DataDescription;
	import mx.collections.ArrayCollection;
	import mx.collections.IList;
	import mx.controls.Alert;
	import mx.core.IMXMLObject;
	import mx.core.UIComponent;
	import mx.core.mx_internal;
	import mx.rpc.events.FaultEvent;
	import mx.rpc.events.ResultEvent;
	import mx.rpc.remoting.mxml.RemoteObject;
	import mx.utils.ObjectUtil;
	import mx.utils.UIDUtil;
	
	public class DataService extends RemoteObject implements IMXMLObject
	{
		public static const DESTINATION:String = "flexService";
		
		private var owner:Object = null;
		private var _dataSetNms:Array = null;
		private var _resultFnc:Function=null;
		private var _faultFnc:Function=null;
		
		public function DataService(dest:String=null, showBusyCursor:Boolean = false, resultFnc:Function=null,  faultFnc:Function=null)
		{	
			// default destination is "flexService"
			if(!dest)
				dest = DESTINATION;
			
			super(dest);
				
			this.showBusyCursor=showBusyCursor;
			this.destination = dest;
		}
		
		//IMXMLObject implements method
		public override function initialized(document:Object, id:String):void{
			owner = document;
			if(!document.hasEventListener(FaultEvent.FAULT))
				document.addEventListener(FaultEvent.FAULT, defaultFaultHandler);
		}
	
		
		protected function defaultFaultHandler(event:FaultEvent):void {
			// popup alert when an error occur
//			Opener.open(MessageWindow, {fault:event.fault});
			Alert.show("An error occured reason for : " + event.fault);			
		}
		
		/**
		 * Send a request to the server for getting a list
		 */
		public function getList(arrDataSet:Array, params:Object, resultFnc:Function=null, faultFnc:Function=null):void {
			
			var sendCollection:ArrayCollection = new ArrayCollection();
			for(var i:int=0; i<arrDataSet.length ; i++) {
				
				if(owner.hasOwnProperty(arrDataSet[i])) {				
					if(owner[arrDataSet[i]] is DataSet) {
						var dataSet:DataSet = owner[arrDataSet[i]] as DataSet;
						if(dataSet.selectQueryId == "" ) {
							Alert.show("No selectQueryId for " + String(i+1) + ".");
							return;
						}		
						dataSet.dataSetName = arrDataSet[i];
						sendCollection.addItem(dataSet);
					}else {
						Alert.show("Elements must be a DataSet type : " + String(i+1));
						return;
					}
				}
			}
			
			this._dataSetNms = arrDataSet;
			this._resultFnc = resultFnc;
			this._faultFnc = faultFnc;
			
			
			// remove older data
			for(i=0; i<arrDataSet.length; i++) {
				(owner[arrDataSet[i]] as DataSet).clear();
			}
			
			this.addEventListener(ResultEvent.RESULT, executeSelectResult);
			
			if(!this.hasEventListener(FaultEvent.FAULT))
				this.addEventListener(FaultEvent.FAULT, defaultFaultHandler);
			
			(this as RemoteObject).findList(sendCollection,params );
		}
		
		/**
		 * Send a request to the server for getting a paging list
		 */
		public function getPagingList(arrDataSet:Array, params:Object, resultFnc:Function=null):void {
			
			var sendCollection:ArrayCollection = new ArrayCollection();
			for(var i:int=0; i<arrDataSet.length ; i++) {
				
				if(owner.hasOwnProperty(arrDataSet[i])) {				
					if(owner[arrDataSet[i]] is DataSet) {
						var dataSet:DataSet = owner[arrDataSet[i]] as DataSet;
						if(dataSet.selectQueryId == "" ) {
							Alert.show("No selectQueryId for " + String(i+1) + ".");
							return;
						}		
						dataSet.dataSetName = arrDataSet[i];
						sendCollection.addItem(dataSet);
					}else {
						Alert.show("Elements must be a DataSet type : " + String(i+1));
						return;
					}
				}
			}
			
			this._dataSetNms = arrDataSet;
			this._resultFnc = resultFnc;
			
			// remove older data
			for(i=0; i<arrDataSet.length; i++) {
				(owner[arrDataSet[i]] as DataSet).clear();
			}
			
			this.addEventListener(ResultEvent.RESULT, executeSelectResult);
			
			if(!this.hasEventListener(FaultEvent.FAULT))
				this.addEventListener(FaultEvent.FAULT, defaultFaultHandler);
			
			(this as RemoteObject).findPagingList(sendCollection,params );
		}
		 
		// Set all DataSet
		private function executeSelectResult(event:ResultEvent):void {
			
			this.removeEventListener(ResultEvent.RESULT, executeSelectResult);
			
			if(event.result is ArrayCollection) {
				var arrResult:ArrayCollection = event.result as ArrayCollection; 
				for(var i:int=0; i<arrResult.length ; i++) {
					var dataSet:DataSet = arrResult[i] as DataSet; 
					dataSet.clearBuffer();
					owner[_dataSetNms[i]] = dataSet;
				}
			}
			
			if(_resultFnc != null)			
				_resultFnc.call(this,event);
		}
		
		/**
		 * Send all DataSet to the server and execute CRUD.
		 */
		public function save(arrDataSet:Array, params:Object, resultFnc:Function=null):void {
			
			if(arrDataSet.length == 0)
			{
				Alert.show("At least one DataSet must be sent");
				return;			
			}
			_dataSetNms = arrDataSet;
			if(_resultFnc != null)
				_resultFnc = resultFnc;
			
			var sendCollection:ArrayCollection = new ArrayCollection();
			
			for(var i:int=0; i<arrDataSet.length ; i++) {
				if(owner[arrDataSet[i]] is DataSet) {
					var dataSet:DataSet = owner[arrDataSet[i]];						
					if(	dataSet.insertQueryId == ""
						&& dataSet.updateQueryId == ""
						&& dataSet.deleteQueryId == "") {
						Alert.show("Query ID is required at :" + arrDataSet[i]);
						return;
					}
					dataSet.dataSetName = arrDataSet[i];
					//sendCollection.addItem(dataSet);
					if(dataSet.useChangeInfo == true)		
					{
						var newDs:DataSet = dataSet.getModifyData();
						newDs.selectQueryId = dataSet.selectQueryId;
						newDs.updateQueryId = dataSet.updateQueryId;
						newDs.deleteQueryId = dataSet.deleteQueryId;
						newDs.insertQueryId = dataSet.insertQueryId;						
						sendCollection.addItem(newDs);
						
					}
					else
					{	
						var newDs:DataSet = dataSet.getOnlyViewData()
						newDs.selectQueryId = dataSet.selectQueryId;
						newDs.updateQueryId = dataSet.updateQueryId;
						newDs.deleteQueryId = dataSet.deleteQueryId;
						newDs.insertQueryId = dataSet.insertQueryId;						
						sendCollection.addItem(newDs);
					}
				}else {
					Alert.show(arrDataSet[i] + " must be a type of DataSet");
					return;
				}
			}
			
			this.addEventListener(ResultEvent.RESULT, onExecuteSaveResult);
			
			if(!this.hasEventListener(FaultEvent.FAULT))
				this.addEventListener(FaultEvent.FAULT, defaultFaultHandler);
			
			
			(this as RemoteObject).saveAll(sendCollection,params );
			
		} 
		
		/**
		 * Send all DataSet to the server and execute updateRows.
		 */
		public function updateDataSets(arrDataSet:Array, params:Object, resultFnc:Function=null, faultFnc:Function=null ):void {
			
			if(arrDataSet.length == 0)
			{
				Alert.show("At least one DataSet must be sent");
				return;			
			}
			_dataSetNms = arrDataSet;
			if(_resultFnc != null)
				_resultFnc = resultFnc;
			
			var sendCollection:ArrayCollection = new ArrayCollection();
			
			for(var i:int=0; i<arrDataSet.length ; i++) {
				if(owner[arrDataSet[i]] is DataSet) {
					var dataSet:DataSet = owner[arrDataSet[i]];						
					if( dataSet.updateQueryId == "") {
						Alert.show("Update Query ID is required at : " + arrDataSet[i]);
						return;
					}
					dataSet.dataSetName = arrDataSet[i];
					sendCollection.addItem(dataSet);
				}else {
					Alert.show(arrDataSet[i] + " must be a type of DataSet");
					return;
				}
			}

			this.addEventListener(ResultEvent.RESULT, onExecuteSaveResult);
			
			if(!this.hasEventListener(FaultEvent.FAULT))
				this.addEventListener(FaultEvent.FAULT, defaultFaultHandler);
			
			(this as RemoteObject).updateRows(sendCollection,params );
		} 
		 
		/**
		 * Send all DataSet to the server and execute removeRows.
		 */
		public function removeDataSets(arrDataSet:Array, params:Object, resultFnc:Function=null, faultFnc:Function=null ):void {
			
			if(arrDataSet.length == 0)
			{
				Alert.show("At least one DataSet must be sent");
				return;			
			}
			_dataSetNms = arrDataSet;
			if(_resultFnc != null)
				_resultFnc = resultFnc;
			
			var sendCollection:ArrayCollection = new ArrayCollection();
			
			for(var i:int=0; i<arrDataSet.length ; i++) {
				if(owner[arrDataSet[i]] is DataSet) {
					var dataSet:DataSet = owner[arrDataSet[i]];						
					if( dataSet.deleteQueryId == "") {
						Alert.show("Delete Query ID is required at : " + arrDataSet[i]);
						return;
					}
					dataSet.dataSetName = arrDataSet[i];
					sendCollection.addItem(dataSet);
				}else {
					Alert.show(arrDataSet[i] + " must be a type of DataSet");
					return;
				}
			}
			
			this.addEventListener(ResultEvent.RESULT, onExecuteSaveResult);
			
			if(!this.hasEventListener(FaultEvent.FAULT))
				this.addEventListener(FaultEvent.FAULT, defaultFaultHandler);
			
			(this as RemoteObject).removeRows(sendCollection,params );
		} 
		
		/**
		 * Send all DataSet to the server and execute insertRows.
		 */
		public function insertDataSets(arrDataSet:Array, params:Object, resultFnc:Function=null, faultFnc:Function=null ):void {
			
			if(arrDataSet.length == 0)
			{
				Alert.show("At least one DataSet must be sent");
				return;			
			}
			_dataSetNms = arrDataSet;
			if(_resultFnc != null)
				_resultFnc = resultFnc;
			
			var sendCollection:ArrayCollection = new ArrayCollection();
			
			for(var i:int=0; i<arrDataSet.length ; i++) {
				if(owner[arrDataSet[i]] is DataSet) {
					var dataSet:DataSet = owner[arrDataSet[i]];						
					if( dataSet.insertQueryId == "") {
						Alert.show("Insert Query ID is required at : " + arrDataSet[i]);
						return;
					}
					dataSet.dataSetName = arrDataSet[i];
					sendCollection.addItem(dataSet);
				}else {
					Alert.show(arrDataSet[i] + " must be a type of DataSet");
					return;
				}
			}
			
			this.addEventListener(ResultEvent.RESULT, onExecuteSaveResult);
			
			if(!this.hasEventListener(FaultEvent.FAULT))
				this.addEventListener(FaultEvent.FAULT, defaultFaultHandler);
			
			(this as RemoteObject).insertRows(sendCollection,params);
		} 
		
		//Clear All ROWTYPE of DataSet after saving data successfully
		private function onExecuteSaveResult(event:ResultEvent):void {
			this.removeEventListener(ResultEvent.RESULT, onExecuteSaveResult);
			
			for(var i:int=0; i<_dataSetNms.length ; i++) {
				(owner[_dataSetNms[i]] as DataSet).clearBuffer();
			}
			
			if(_resultFnc != null)
				_resultFnc.call(this,event);
		}
		
		/**
		 * doService : when invoke user-defined service
		 */
		public function executeService(arrDataSet:Array, params:Object, resultFnc:Function=null, faultFnc:Function=null):void {
			if(arrDataSet.length == 0)
			{
				Alert.show("At least one DataSet must be sent.");
				return;			
			}
			_dataSetNms = arrDataSet;
			
			var sendCollection:ArrayCollection = new ArrayCollection();
			
			for(var i:int=0; i<arrDataSet.length ; i++) {
				if(owner[arrDataSet[i]] is DataSet) {
					var dataSet:DataSet = owner[arrDataSet[i]];						
					if(	dataSet.selectQueryId == ""
						&& dataSet.insertQueryId == ""
						&& dataSet.updateQueryId == ""
						&& dataSet.deleteQueryId == "") {
		 				Alert.show("QueryId for " + arrDataSet[i] + " is required.");
						return;
					}
					dataSet.dataSetName = arrDataSet[i];
					//sendCollection.addItem(dataSet);
					if(dataSet.useChangeInfo == true)		
					{
						var newDs:DataSet = dataSet.getModifyData();
						newDs.selectQueryId = dataSet.selectQueryId;
						newDs.updateQueryId = dataSet.updateQueryId;
						newDs.deleteQueryId = dataSet.deleteQueryId;
						newDs.insertQueryId = dataSet.insertQueryId;						
						sendCollection.addItem(newDs);
						
					}
					else
					{	
						var newDs:DataSet = dataSet.getOnlyViewData()
						newDs.selectQueryId = dataSet.selectQueryId;
						newDs.updateQueryId = dataSet.updateQueryId;
						newDs.deleteQueryId = dataSet.deleteQueryId;
						newDs.insertQueryId = dataSet.insertQueryId;						
						sendCollection.addItem(newDs);
					}
				}else {
					Alert.show(arrDataSet[i] + " must be a type of DataSet.");
					return;
				}
				
				if( resultFnc == null ){
					this.addEventListener(ResultEvent.RESULT, _resultFnc);
				}else{
					this.addEventListener(ResultEvent.RESULT, resultFnc);
				}
				
				if( faultFnc == null ){
					this.addEventListener(FaultEvent.FAULT, defaultFaultHandler);
				}else{
					this.addEventListener(FaultEvent.FAULT, faultFnc);
				}
				
				(this as RemoteObject).doService(sendCollection,params );
			}
		}
		
		/**
		 * get a DataRow 
		 */
		public function getDataRow(queryId:String, searchDataRow:DataRow, params:Object, resultFnc:Function=null, faultFnc:Function=null):void {
			if( resultFnc == null ){
				this.addEventListener(ResultEvent.RESULT, _resultFnc);
			}else{
				this.addEventListener(ResultEvent.RESULT, resultFnc);
			}
			if( faultFnc == null ){
				this.addEventListener(FaultEvent.FAULT, defaultFaultHandler);
			}else{
				this.addEventListener(FaultEvent.FAULT, faultFnc);
			}
			(this as RemoteObject).find(queryId, searchDataRow, params );
		}
		
		/**
		 * Insert a row
		 */
		public function insertDataRow(queryId:String, insertDataRow:DataRow, params:Object, resultFnc:Function=null, faultFnc:Function=null):void {
			
			if( resultFnc == null ){
				this.addEventListener(ResultEvent.RESULT, _resultFnc);
			}else{
				this.addEventListener(ResultEvent.RESULT, resultFnc);
			}
			if( faultFnc == null ){
				this.addEventListener(FaultEvent.FAULT, defaultFaultHandler);
			}else{
				this.addEventListener(FaultEvent.FAULT, faultFnc);
			}
			(this as RemoteObject).create(queryId, insertDataRow, params );
		}
		
		/**
		 * Update a row
		 */ 
		public function updateDataRow(queryId:String, updateDataRow:DataRow, params:Object, resultFnc:Function=null, faultFnc:Function=null):void {
			if( resultFnc == null ){
				this.addEventListener(ResultEvent.RESULT, _resultFnc);
			}else{
				this.addEventListener(ResultEvent.RESULT, resultFnc);
			}
			if( faultFnc == null ){
				this.addEventListener(FaultEvent.FAULT, defaultFaultHandler);
			}else{
				this.addEventListener(FaultEvent.FAULT, faultFnc);
			}
			(this as RemoteObject).update(queryId, updateDataRow, params );
		}
		
		/**
		 * Remove a row
		 */
		public function removeDataRow(queryId:String, deleteDataRow:DataRow, params:Object, resultFnc:Function=null, faultFnc:Function=null):void {
			if( resultFnc == null ){
				this.addEventListener(ResultEvent.RESULT, _resultFnc);
			}else{
				this.addEventListener(ResultEvent.RESULT, resultFnc);
			}
			if( faultFnc == null ){
				this.addEventListener(FaultEvent.FAULT, defaultFaultHandler);
			}else{
				this.addEventListener(FaultEvent.FAULT, faultFnc);
			}
 			(this as RemoteObject).remove(queryId, deleteDataRow, params );
		}
	}
}