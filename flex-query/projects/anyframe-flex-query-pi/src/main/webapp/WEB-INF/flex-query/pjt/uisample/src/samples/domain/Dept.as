package samples.domain
{
	import mx.collections.ArrayCollection;
	
	[Bindable]
	[RemoteClass(alias="org.anyframe.plugin.flex.query.domain.Dept")]
	public class Dept
	{
		public var status:int = 0;
		public var deptId:String;
    	public var deptName:String;
    	public var deptLevel:String;
    	public var deptDesc:String;
    	public var children:ArrayCollection;
	}
}