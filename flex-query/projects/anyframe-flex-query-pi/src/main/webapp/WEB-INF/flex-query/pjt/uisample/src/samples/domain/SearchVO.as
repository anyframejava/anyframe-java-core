package samples.domain
{
	[RemoteClass(alias="org.anyframe.plugin.flex.query.domain.SearchVO")]
	public class SearchVO
	{
		public function SearchVO( tableName:String = null )
		{
			this.tableName = tableName;
		}

	public var searchCondition:String;

    public var searchKeyword:String;

    public var pageIndex:int;
    
    public var tableName:String;
	}
}