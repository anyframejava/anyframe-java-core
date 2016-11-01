<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="/sample/common/taglibs.jsp"%>
<script type="text/javascript">
	function fncCreateMovieView() {
		document.location.href="<c:url value='/tilesMovie.do?method=createView'/>";
	}	
	function fncSearchMovie(arg) {
	   	document.searchForm.action="<c:url value='/tilesMovieFinder.do?method=list'/>";
	   	document.searchForm.submit();						
	}		
</script>
<div id="container">
	<div class="pageintroimage">
   		<img src="<c:url value='/sample/images/img_simpleweb.jpg'/>" alt="Welcome Movie Finder" />
    </div>
</div>