package org.anyframe.pagination
{
	import mx.collections.ArrayCollection;
	
	[RemoteClass(alias="org.anyframe.pagination.Page")]
	public class Page
	{
		public function Page()
		{
		}
		
 	public var objects:ArrayCollection;

    public var currentPage:int;

    public var totalCount:int;

    public var pageunit:int;

    public var pagesize:int;

    public var maxPage:int;

    public var beginUnitPage:int;

    public var endUnitPage:int;
	}
}