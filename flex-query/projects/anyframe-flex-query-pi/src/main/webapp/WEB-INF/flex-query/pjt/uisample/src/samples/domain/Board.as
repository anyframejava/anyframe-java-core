package samples.domain
{
	[Bindable]
	[RemoteClass(alias="org.anyframe.plugin.flex.query.domain.Board")]
	public class Board
	{
		public var check:Boolean;
		public var status:int = 0;
		public var postId:String;
    	public var communityId:String;
    	public var title:String;
    	public var contents:String;
    	public var regId:String;
    	public var regDate:String;
    	public var communityName:String;
	}
}