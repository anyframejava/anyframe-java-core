package org.anyframe.flex.query.service
{
	[RemoteClass(alias="org.anyframe.flex.query.service.FlexSearchVO")]
	public class FlexSearchVO
	{
		public function FlexSearchVO( tableName:String = null )
		{
			this.tableName = tableName;
		}

	public var searchCondition:String;

    public var searchKeyword:String;

    public var pageIndex:int;
    
    public var tableName:String;
	}
}