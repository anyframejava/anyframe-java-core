package samples.domain
{
	import mx.collections.ArrayCollection;
	
	[Bindable]
	[RemoteClass(alias="org.anyframe.plugin.flex.query.domain.Category")]
	public class Category
	{
		public var status:int = 0;
		public var categoryId:String;
	    public var categoryName:String;
	    public var categoryDesc:String;
	    public var regDate:String;
	    public var label:String;
	    public var children:ArrayCollection;
	}
}