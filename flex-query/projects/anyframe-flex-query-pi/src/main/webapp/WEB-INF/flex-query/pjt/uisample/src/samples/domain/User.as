package samples.domain
{
	[Bindable]
	[RemoteClass(alias="org.anyframe.plugin.flex.query.domain.User")]
	public class User
	{
		public var status:int = 0;
		public var check:Boolean;	
		public var userId:String;
		public var dept:Dept;
		public var userName:String;
		public var enName:String;
		public var compPhone:String;
		public var phone:String;
		public var cellPhone:String;
		public var company:String;
		public var jobPosition:String;
		public var assignment:String;
		public var officerYn:String;
		public var fax:String;
		public var zipCode:String;
		public var address:String;
		public var compZipCode:String;
		public var compAddress:String;
		public var email:String;
		public var password:String;
		public var deptName:String;
		public var deptId:String;
	}
}