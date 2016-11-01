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
		
		public function DataService(dest:String=null, showBusyCursor:Boolean = false, resultHandler:Function=null,  faultHanlder:Function=null)
		{	
			//기본은 Command
			if(!dest)
				dest = DESTINATION;
			
			super(dest);
				
			this.showBusyCursor=showBusyCursor;
			this.destination = dest;
		}
		
		//IMXMLObject implements method
		public override function initialized(document:Object, id:String):void{
			owner = document;
//			if(!document.hasEventListener(FaultEvent.FAULT))
//				document.addEventListener(FaultEvent.FAULT, defaultFaultHandler);
		}
	
		
		protected function defaultFaultHandler(event:FaultEvent):void {
			//팝업창 띄우는 로직 추가
//			Opener.open(MessageWindow, {fault:event.fault});
		}
		
		
		/**
		 * 여러개의 데이터셋을 서버에 한번에 넘겨 각 DataSet에 데이터를 채워온다.
		 */
		public function getList(arrDataSet:Array, params:Object, resultFnc:Function=null):void {
			
			var sendCollection:ArrayCollection = new ArrayCollection();
			for(var i:int=0; i<arrDataSet.length ; i++) {
				
				if(owner.hasOwnProperty(arrDataSet[i])) {				
					if(owner[arrDataSet[i]] is DataSet) {
						var dataSet:DataSet = owner[arrDataSet[i]] as DataSet;
						if(dataSet.selectQueryId == "" ) {
							Alert.show("arrDataSet의 " + String(i+1) + "번째 요소의 selectQueryID가 없습니다.");
							return;
						}		
						dataSet.dataSetName = arrDataSet[i];
						sendCollection.addItem(dataSet);
					}else {
						Alert.show("arrDataSet의 " + String(i+1) + "번째 요소는 DataSet이어야 합니다.");
						return;
					}
				}
			}
			
			this._dataSetNms = arrDataSet;
			this._resultFnc = resultFnc;
			
			//기존데이터 삭제
			for(i=0; i<arrDataSet.length; i++) {
				(owner[arrDataSet[i]] as DataSet).clear();
			}
			
			this.addEventListener(ResultEvent.RESULT, executeSelectResult);
			
			if(!this.hasEventListener(FaultEvent.FAULT))
				this.addEventListener(FaultEvent.FAULT, defaultFaultHandler);
			
			(this as RemoteObject).findList(sendCollection,params );
		}
		
		//조회가 성공한 경우 모든 데이터셋을 채움
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
		 * 여러개의 데이터셋을 서버에 한번에 넘겨 CRUD를 처리하도록 한다.
		 * 데이터를 가져오거나 저장한 후에 모든 데이서셋의 ROWTYPE을 Clear해 줌
		 * 
		 */
		public function save(arrDataSet:Array, params:Object, resultFnc:Function=null):void {
			
			if(arrDataSet.length == 0)
			{
				Alert.show("최소한 1개 이상의 데이터셋을 전송해야 합니다.");
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
						Alert.show(arrDataSet[i] + "의 쿼리 id가 없습니다.\n ");
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
					Alert.show(arrDataSet[i] + "은 DataSet이어야 합니다.");
					return;
				}
			}
			
			/*SendCollection.addItem(params);*/
			this.addEventListener(ResultEvent.RESULT, onExecuteSaveResult);
			
			if(!this.hasEventListener(FaultEvent.FAULT))
				this.addEventListener(FaultEvent.FAULT, defaultFaultHandler);
			
			
			(this as RemoteObject).saveAll(sendCollection,params );
			
		} 
		
		//저장이 성공한 경우 모든 데이터셋의 ROWTYPE Clear
		private function onExecuteSaveResult(event:ResultEvent):void {
			this.removeEventListener(ResultEvent.RESULT, onExecuteSaveResult);
			
			for(var i:int=0; i<_dataSetNms.length ; i++) {
				(owner[_dataSetNms[i]] as DataSet).clearBuffer();
			}
			
			if(_resultFnc != null)
				_resultFnc.call(this,event);
		}
		
		//doService : 사용자 정의 Service를 호출 할 경우 사용
		public function executeService(arrDataSet:Array, params:Object, resultFnc:Function=null, faultFnc:Function=null):void {
			if(arrDataSet.length == 0)
			{
				Alert.show("최소한 1개 이상의 데이터셋을 전송해야 합니다.");
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
		 				Alert.show(arrDataSet[i] + "의 쿼리 id가 없습니다.\n ");
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
					Alert.show(arrDataSet[i] + "은 DataSet이어야 합니다.");
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
		
		//단건 조회
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
		
		//단건 저장
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
		
		//단건  수정
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
		
		//단건 삭제
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