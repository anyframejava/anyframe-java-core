package samples.domain
{
	[Bindable]
	[RemoteClass(alias="org.anyframe.plugin.flex.query.domain.Community")]
	public class Community
	{
		public var status:int = 0;
		public var communityId:String;
	    public var communityName:String;
	    public var communityDesc:String;
	    public var regId:String;
	    public var regDate:String;
	    public var categoryId:String;
	    public var categoryName:String;
	    public var label:String;
	}
}