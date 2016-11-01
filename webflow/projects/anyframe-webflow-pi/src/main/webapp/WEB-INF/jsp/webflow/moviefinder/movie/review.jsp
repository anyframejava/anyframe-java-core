<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/taglibs.jsp"%>
<head>
    <%@ include file="/sample/common/meta.jsp" %>
    <title><spring:message code="movieDetail.title"/></title>
    <meta name="heading" content="<spring:message code='movieDetail.heading'/>"/>   
	<link rel="stylesheet" href="<c:url value='/sample/css/admin.css'/>" type="text/css">            
	<script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>
	<script type="text/javascript">
	function fncCreateMovie() {
		if(FormValidation(document.movieForm) != false) {
			document.movieForm._eventId.value="create";	
		    document.movieForm.submit();
		} 
	}

	function fncRevise() {
		if(FormValidation(document.movieForm) != false) {
			document.movieForm._eventId.value="revise";	
		    document.movieForm.submit();
		} 
	}
	
	function fncUpdateMovie() {
		if(FormValidation(document.movieForm) != false) {
			document.movieForm._eventId.value="confirm";
			document.movieForm.submit();
		} 
	}
	
	</script>         
</head>
<!--************************** begin of contents *****************************-->

<!-- begin of title -->
<table width="100%" height="24" border="0" cellpadding="0" cellspacing="0">
	<tr>
		<td background="<c:url value='/sample/images/ct_ttl_img02.gif'/>" width="100%">
		<table width="100%" height="24" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td height="24" class="ct_ttl01" style="padding-left: 12px">
				 	Review Movie Information
				</td>
			</tr>
		</table>
		</td>
	</tr>
</table>
<form:form modelAttribute="movie" name="movieForm" method="post">
	<input type="hidden" name="_eventId"/>
	<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 13px;">
		<c:if test="${not empty movie.movieId}">
			<form:hidden path="movieId" />
		</c:if>
		
		<tr>
			<td width="150" class="ct_td"><spring:message code="movie.title" /></td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">${movie.title}</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><spring:message code="movie.director" /></td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">${movie.director}</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><spring:message code="movie.genre" /></td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">
			<form:select path="genre.genreId" disabled="true">
              <form:options items="${genreList}" itemValue="genreId" itemLabel="name"/>
          	</form:select>
			</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><spring:message code="movie.actors" /></td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">${movie.actors}</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><spring:message code="movie.runtime" /></td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">${movie.runtime}</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><spring:message code="movie.releaseDate" /></td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">${movie.releaseDate}</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><spring:message code="movie.ticketPrice" /></td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">${movie.ticketPrice}</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><spring:message code="movie.nowPlaying" /></td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">Is this movie now playing ? ${movie.nowPlaying}</td>
		</tr>
	</table>
	<!-- begin of button -->
	<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 10px;">
		<tr>
			<td height="24" colspan="2" align="center">
				<a href="javascript:fncRevise();"><img src="<c:url value='/sample/images/btn_back.png'/>" width="64" height="18" border="0" /></a>	
				<c:if test="${empty movie.movieId}">
					<a href="javascript:fncCreateMovie();"><img src="<c:url value='/sample/images/btn_add.png'/>" width="64" height="18" border="0" /></a>
				</c:if>
				<c:if test="${not empty movie.movieId}">
					<a href="javascript:fncUpdateMovie();"><img src="<c:url value='/sample/images/btn_update.png'/>" width="64" height="18" border="0" /></a>
				</c:if>
			</td>
		</tr>
	</table>
</form:form>

<script type="text/javascript" src="<c:url value='/sample/javascript/calendar.js'/>"></script>