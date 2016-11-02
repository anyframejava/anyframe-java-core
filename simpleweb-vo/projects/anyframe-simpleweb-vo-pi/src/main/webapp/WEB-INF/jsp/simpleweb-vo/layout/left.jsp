<%@ include file="/sample/common/taglibs.jsp"%>
<%@ taglib uri="http://www.anyframejava.org/tags/simpleweb" prefix="simpleweb" %>
<div id="leftmenu">
    <ul>
    	<li class="menutitle">Menu</li>
<!--Add new menu here-->                    
<!--simpleweb-vo-menu-START-->
		<li>
			<simpleweb:link id="voMovie" service="simplewebVoMovieFinder.getPagingList(search)" layout="voLayout" tiles="body:/WEB-INF/jsp/simpleweb-vo/moviefinder/movie/list.jsp">
				<simpleweb:model name="search" type="${packageName}.simpleweb.vo.moviefinder.service.MovieSearchVO"/>
				<simpleweb:setProperty name="title">SimpleWeb-VO</simpleweb:setProperty>
			</simpleweb:link>
		</li>
<!--simpleweb-vo-menu-END-->
    </ul>
</div>

