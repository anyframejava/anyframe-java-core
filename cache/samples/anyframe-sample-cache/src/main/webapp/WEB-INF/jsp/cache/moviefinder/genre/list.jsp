<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/taglibs.jsp"%>
<head>
    <%@ include file="/sample/common/meta.jsp" %>
    <title><spring:message code="genreList.title"/></title>
	<meta name="heading" content="<spring:message code='genreList.heading'/>"/>    
	<link rel="stylesheet" href="<c:url value='/sample/css/admin.css'/>" type="text/css">
    <script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>    
	<script type="text/javascript">
		function fncCreateGenreView() {
			document.location.href="<c:url value='/cacheGenre.do?method=createView'/>";
		}	
		function fncSearchGenre() {
		   	document.searchForm.action="<c:url value='/cacheGenre.do?method=list'/>";
		   	document.searchForm.submit();						
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
				<td height="24" class="ct_ttl01" style="padding-left: 12px">Search List of Genre</td>
			</tr>
		</table>
		</td>
	</tr>
</table>
<!-- end of title -->

<form:form modelAttribute="genre" method="post" name="searchForm">
	<table class="scrollTable" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top:10px;">
		<thead>
			<tr>
				<th scope="col" style="border-right: 1px #CCCCCC solid"><spring:message code="genre.id" /></th>
				<th scope="col" style="border-right: 1px #CCCCCC solid"><spring:message code="genre.name" /></th>
			</tr>
		</thead>
		<tbody>
			<c:forEach var="genre" items="${genres}">
				<tr class="board" onMouseOver="this.style.backgroundColor='#e4eaff';return true;" onMouseOut="this.style.backgroundColor=''; return true;" >
					<td class="underline">
						<a class="linkClass" href="${ctx}/cacheGenre.do?method=get&genreId=${genre.genreId}">${genre.genreId}</a>
					</td>
					<td align="left">${genre.name}</td>
				</tr>			
			</c:forEach>
		</tbody>
	</table>

	<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 10px;">
		<tr>
			<td align="right"><a href='<c:url value="javascript:fncCreateGenreView();"/>'><img
				src="<c:url value='/sample/images/btn_add.png'/>" width="64" height="18" border="0" /></a></td>
		</tr>
	</table>
</form:form>