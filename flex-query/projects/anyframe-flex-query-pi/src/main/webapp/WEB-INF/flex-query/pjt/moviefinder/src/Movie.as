package
{
	[Bindable]
	[RemoteClass(alias="org.anyframe.plugin.flex.query.domain.Movie")]
	public class Movie
	{
		public function Movie()
		{
		}
		
		public var movieId:String;
		public var title:String;
		public var postId:String;
		public var director:String;
		public var actors:String;
		public var runtime:int;
		public var releaseDate:Date;
		public var ticketPrice:int;
		public var nowPlaying:String;
		public var genre:Genre;
		public var genreId:String;
		public var genreName:String;
	}
}