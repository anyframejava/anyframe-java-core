package org.anyframe.flex.messaging.data
{
	import flash.utils.IDataInput;
	import flash.utils.IDataOutput;
	
	import mx.collections.ArrayCollection;
	import mx.utils.ObjectProxy;
	
	[Bindable]
	[RemoteClass(alias="org.anyframe.flex.query.data.DataRow")]
	public class DataRow extends ObjectProxy
	{
		// I:insert U:update D:delete N:Normal
		public var ROWTYPE:String ;	
		//public var updateRowIndex:int    = -1;
		
		public function DataRow(item:Object=null, uid:String=null, proxyDepth:int=-1)
		{
			super(item, uid, proxyDepth); 
		}
		
		public function clear():void {
			for (var key:String in this)
				this[key] = null;
		}
		
		public function getIndex(index:int):* {
			var i:int = 0;
			for (var key:String in this) {
				if (i==index)
					return this[key];
			}
			return null;
		}
		
		public function getItem(key:String):Object { 
			return this[key];
		}
		
		public function put(key:String, value:Object):void {
			this[key] = value;
		}
		
		public function remove(key:String):Object {
			this[key] = null;
			return this;
		}
		
		public function size():int {
			var len:int = 0;
			for (var key:String in this)
				len++;
			return len;
		}
		
		public function toString():String {
			var delim:String = ",";
			var str:String;
			for (var key:String in this) {
				str += delim + key + ": " + this[key];
				delim = "\n";
			}
			return str;
		} 
		
		public function values():ArrayCollection {
			var values:ArrayCollection = new ArrayCollection();
			for (var key:String in this)
				values.addItem(this[key]);
			return values;
		}
		
		/*public function get ROWTYPE():String{
			return _ROWTYPE;
		}
		
		public function set ROWTYPE(rowType:String):void{
			_ROWTYPE=rowType;
		}*/
		
		// Serializable
		public override function readExternal(input:IDataInput):void {
			ROWTYPE = input.readObject() as String;
			super.readExternal(input);
		}
		
		public override function writeExternal(output:IDataOutput):void {
			output.writeObject(ROWTYPE);
			super.writeExternal(output);
		}
	
	}
}