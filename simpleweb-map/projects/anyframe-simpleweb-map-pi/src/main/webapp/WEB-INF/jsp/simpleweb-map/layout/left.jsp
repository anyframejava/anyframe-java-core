<%@ include file="/sample/common/taglibs.jsp"%>
<%@ taglib uri="http://www.anyframejava.org/tags/simpleweb" prefix="simpleweb" %>
<div id="leftmenu">
    <ul>
    	<li class="menutitle">Menu</li>
<!--Add new menu here-->                    
<!--simpleweb-map-menu-START-->
		<li>
			<simpleweb:link id="mapMovie" action="/simplemap.do" service="simplewebMapMovieFinder.getPagingList(map)" layout="mapLayout" tiles="body:/WEB-INF/jsp/simpleweb-map/moviefinder/movie/list.jsp">
				<simpleweb:setProperty name="title">SimpleWeb-Map</simpleweb:setProperty>
			</simpleweb:link>
		</li>
<!--simpleweb-map-menu-END-->
    </ul>
</div>