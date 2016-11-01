<%@ include file="/sample/common/taglibs.jsp"%>
<%@ taglib uri="http://www.anyframejava.org/tags/simpleweb" prefix="simpleweb" %>
<div id="leftmenu">
    <ul>
    	<li class="menutitle">Menu</li>
<!--Add new menu here-->                    
<!--simpleweb-jquery-menu-START-->
		<li>
			<simpleweb:link id="jqueryMovie" action="/simplejson.do" layout="jqueryLayout" tiles="body:/WEB-INF/jsp/simpleweb-jquery/moviefinder/movie/list.jsp">
				<simpleweb:model name="search" type="${packageName}.simpleweb.jquery.moviefinder.service.MovieSearchVO"/>
				<simpleweb:setProperty name="title">SimpleWeb-jQuery[1]</simpleweb:setProperty>
			</simpleweb:link>
		</li>
		<li>
			<simpleweb:link id="jqueryTree" action="/simplejson.do" layout="jqueryLayout" tiles="body:/WEB-INF/jsp/simpleweb-jquery/moviefinder/movie/tree.jsp">
				<simpleweb:model name="movie" type="${packageName}.simpleweb.jquery.domain.Movie"/>
				<simpleweb:init valueList="genreList:simplewebJqueryGenreService.getDropDownGenreList()"></simpleweb:init>
				<simpleweb:setProperty name="title">SimpleWeb-jQuery[2]</simpleweb:setProperty>
			</simpleweb:link>
		</li>
<!--simpleweb-jquery-menu-END-->
    </ul>
</div>