<%@ include file="../../../../../sample/common/top.jsp"%>
<div class="location"><a href="<c:url value='anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='tilesMovieFinder.do?method=list'/>">Tiles 1.0.3-SNAPSHOT</a></div>
    </div>
    <hr />
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<script type="text/javascript" src="<c:url value="/resources/dojo/dojo.js" />"></script>  
<script type="text/javascript" src="<c:url value="/resources/dojo/io/iframe.js" />"></script>  
<script type="text/javascript" src="<c:url value="/resources/spring/Spring.js" />"> </script>
<script type="text/javascript" src="<c:url value="/resources/spring/Spring-Dojo.js" />"> </script>
<script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>
<script type="text/javascript" src="<c:url value='/sample/javascript/calendar.js'/>"></script>

<div class="view_leftmenu">
	<tiles:insertAttribute name="left"/>
    <tiles:insertAttribute name="body"/>
</div>
    <hr />

<%@ include file="../../../../../sample/common/bottom.jsp"%>