<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/taglibs.jsp"%>
<head>
    <%@ include file="/sample/common/meta.jsp" %>
    <title><spring:message code="movieList.title"/></title>
	<meta name="heading" content="<spring:message code='movieList.heading'/>"/>       
	<link rel="stylesheet" href="<c:url value='/sample/css/admin.css'/>" type="text/css">
    <script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>    
	<script type="text/javascript">
		function fncSearchMovie(arg) {
		   	document.searchForm.action="<c:url value='/excelMovieFinder.do?method=list'/>";
		   	document.searchForm.submit();						
		}	
		function fncExcelDownload() {
			document.excelDownloadForm.queryId.value="excel.findMovieList";
			document.excelDownloadForm.action="<c:url value='/excelDownload.do?method=excelDownload'/>";
			document.excelDownloadForm.submit();	
		}	
		function fncExcelUpload() {
			document.excelUploadForm.queryId.value="excel.excelMovieInsert";

			var filePath = document.excelUploadForm.excelFile.value;

			if(filePath.indexOf('.xls') == -1){
				alert("Excel 파일이 아닙니다.");
				return;
			}

			document.excelUploadForm.action="<c:url value='/excelDownload.do?method=excelUpload'/>";
			document.excelUploadForm.submit();	
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
					<td class="underline">${movie.genreName}</td>
					<td class="underline">${movie.title}</td>
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
</form:form>	
	<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 10px; vertical-align: center;">
		<tr>
			<form:form method="post" name="excelUploadForm" enctype="multipart/form-data">
			<td align="right"><input type="file" name="excelFile" width="0"></td>
				<input name="queryId" type="hidden" value="" />
				<input name="columnInfoFile" type="hidden" value="movie" />
				<input name="resultPage" type="hidden" value="redirect:/excelMovieFinder.do?method=list" />
			</form:form>
			<td align="right" width="70"><a href='<c:url value="javascript:fncExcelUpload();" />'><img
				src="<c:url value='/sample/images/btn_excelup.png'/>" width="65" height="18" border="0" /></a></td>
			<td align="right" width="80"><a href='<c:url value="javascript:fncExcelDownload();" />'><img
				src="<c:url value='/sample/images/btn_exceldown.png'/>" width="79" height="18" border="0" /></a></td>
		</tr>
	</table>
	
<form:form method="post" name="excelDownloadForm">
	<input name="queryId" type="hidden" value="" />
	<input name="title" type="hidden" value="" />
	<input name="nowPlaying" type="hidden" value="Y" />
	<input name="fileName" type="hidden" value="movie" />
	<input name="columnInfoFile" type="hidden" value="movie" />
</form:form>