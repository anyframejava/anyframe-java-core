<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/taglibs.jsp"%>
<head>
    <%@ include file="/sample/common/meta.jsp" %>
    <title><spring:message code="movieList.title"/></title>
	<meta name="heading" content="<spring:message code='movieList.heading'/>"/>       
	<link rel="stylesheet" href="<c:url value='/sample/css/admin.css'/>" type="text/css">
    <script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>    
	<script type="text/javascript">
		function fncCreateMovieView() {
			document.location.href="<c:url value='/queryMovie.do?method=createView'/>";
		}	
		function fncSearchMovie(arg) {
		   	document.searchForm.action="<c:url value='/queryMovieFinder.do?method=list'/>";
		   	document.searchForm.submit();						
		}		
	</script>
</head>
<!--************************** begin of contents *****************************-->
<!--begin of title-->
<table width="100%" height="24" border="0" cellpadding="0" cellspacing="0">
	<tr>
		<td height="24">
		<table width="100%" height="24" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td height="24" class="ct_ttl01" style="padding-left: 12px">Search List of Movie</td>
			</tr>
		</table>
		</td>
	</tr>
</table>
<!--end of title-->

<form:form modelAttribute="movie" method="post" name="searchForm">	
	<!--begin of search-->
	<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 10px; vertical-align: center;">
		<tr>
			<td align="right">
				<label><spring:message code="movie.title" />: <form:input path="title" cssClass="ct_input_g" cssErrorClass="text medium error" maxlength="50" /></label>
				
			</td>
			<td align="right" width="180">
				<spring:message code="movie.nowPlaying" />: 
					<form:select path="nowPlaying" cssClass="ct_input_g" cssStyle="width:80px;">
						<form:option value="Y">Playing</form:option>
						<form:option value="N">Not playing</form:option>
					</form:select>
			</td>
			
			<td align="right" width="35">
				<a href="javascript:fncSearchMovie();"><img src="<c:url value='/sample/images/btn_search.png'/>" width="25" height="18" border="0" align="middle"/></a>
			</td>
		</tr>
	</table>
	<!--end of search-->
	<table class="scrollTable" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top:10px;">
		<thead>
			<tr>
				<th scope="col" style="border-right: 1px #CCCCCC solid"><spring:message code="movie.genre" /></th>
				<th scope="col" style="border-right: 1px #CCCCCC solid"><spring:message code="movie.title" /></th>
				<th scope="col" style="border-right: 1px #CCCCCC solid"><spring:message code="movie.director" /></th>
				<th scope="col" style="border-right: 1px #CCCCCC solid"><spring:message code="movie.actors" /></th>
				<th scope="col" style="border-right: 1px #CCCCCC solid"><spring:message code="movie.ticketPrice" /></th>
				<th scope="col" style="border-right: 1px #CCCCCC solid"><spring:message code="movie.releaseDate" /></th>
			</tr>
		</thead>
		<tbody>
			<c:forEach var="movie" items="${movies}">
				<tr class="board" onMouseOver="this.style.backgroundColor='#e4eaff';return true;" onMouseOut="this.style.backgroundColor=''; return true;" >
					<td class="underline">${movie.genre.name}</td>
					<td class="underline">
						<a class="linkClass" href="${ctx}/queryMovie.do?method=get&movieId=${movie.movieId}">${movie.title}</a>
					</td>
					<td align="left">${movie.director}</td>
					<td align="left">${movie.actors}</td>
					<td align="center">${movie.ticketPrice}</td>
					<td align="center">${movie.releaseDate}</td>
				</tr>
			</c:forEach>
		</tbody>
	</table>
	<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top:10px;">
		<tr>
			<td class="page" height="50" align="center">
				<anyframe:pagenavigator linkUrl="javascript:fncSearchMovie();"
					pages="${resultPage}" 
					firstImg="${ctx}/sample/images/pagenav/page_before1.gif" 
					lastImg="${ctx}/sample/images/pagenav/page_after1.gif" 
					prevImg="${ctx}/sample/images/pagenav/page_before.gif" 
					nextImg="${ctx}/sample/images/pagenav/page_after.gif"/>
			</td>
		</tr>
	</table>	
	<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 10px;">
		<tr>
			<td align="right"><a href='<c:url value="javascript:fncCreateMovieView();" />'><img
				src="<c:url value='/sample/images/btn_add.png'/>" width="64" height="18" border="0" /></a></td>
		</tr>
	</table>
</form:form>