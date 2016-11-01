<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/taglibs.jsp"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<head>
    <%@ include file="/sample/common/meta.jsp" %>
    <title><bean:message key="movieList.title"/></title>
	<meta name="heading" content="<bean:message key='movieList.heading'/>"/>
	<link rel="stylesheet" href="<c:url value='/sample/css/admin.css'/>" type="text/css">
    <script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>    
	<script type="text/javascript">
		function fncCreateMovieView() {
			document.location.href="<c:url value='/strutsMovie.action?method=createView'/>";
		}	
		function fncSearchMovie() {
		   	document.movieForm.submit();						
		}		
	</script>
</head>
<!--************************** begin of contents *****************************-->
<!-- begin of title -->
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
<!-- end of title -->

<html:form method="post" action="/strutsMovie.action?method=list">
	<!-- begin of search -->
	<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 10px; vertical-align: center;">
		<tr>
			<td align="right">
				<label><bean:message key="movie.title"/>: <html:text property="title" value="${movieForm.title}" styleClass="ct_input_g" errorStyleClass="text medium error" maxlength="50"/></label>
			</td>		
			<td align="right" width="180">
				<bean:message key="movie.nowPlaying"/> :
				<html:select property="nowPlaying" styleClass="ct_input_g" style="width:80px;">
					<html:option value="Y" >Playing</html:option>
					<html:option value="N">Not playing</html:option>
				</html:select>
			</td>		
			<td align="right" width="35">
				<a href="javascript:fncSearchMovie();"><img src="<c:url value='/sample/images/btn_search.png'/>" width="25" height="18" border="0" align="middle"/></a>
			</td>
		</tr>
	</table>
	<!-- end of search -->

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
						<a class="linkClass" href="${ctx}/strutsMovie.action?method=get&movieId=${movie.movieId}">${movie.title}</a>
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
					pages="${resultPage}"/>
			</td>
		</tr>
	</table>
	
	<table width="100%" border="0" cellspacing="0" cellpadding="1" style="margin-top: 10px;">
		<tr>
			<td align="right">
				<a href='<c:url value="javascript:fncCreateMovieView();"/>'><img src="<c:url value='/sample/images/btn_add.png'/>" width="64" height="18" border="0" /></a>
			</td>
		</tr>
	</table>
</html:form>