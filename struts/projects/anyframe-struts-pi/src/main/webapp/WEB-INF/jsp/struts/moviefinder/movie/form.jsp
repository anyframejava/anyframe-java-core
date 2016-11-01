<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/taglibs.jsp"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<head>
<%@ include file="/sample/common/meta.jsp"%>
<title><bean:message key="movieDetail.title" /></title>
<meta name="heading" content="<bean:message key='movieDetail.heading'/>" />
<link rel="stylesheet" href="<c:url value='/sample/css/admin.css'/>" type="text/css">
<script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>
<script type="text/javascript" src="<c:url value='/sample/javascript/InputCalendar.js'/>"></script>
<script type="text/javascript">
	function fncCreateMovie() {
		if (FormValidation(document.movieForm) != false) {
			document.movieForm.action = "<c:url value='/strutsMovie.action?method=create'/>";
			document.movieForm.submit();
		}
	}

	function fncUpdateMovie() {
		if (FormValidation(document.movieForm) != false) {
			document.movieForm.action = "<c:url value='/strutsMovie.action?method=update'/>";
			document.movieForm.submit();
		}
	}

	function fncRemoveMovie() {
		if (confirmDelete('movie')) {
			document.movieForm.action = "<c:url value='/strutsMovie.action?method=remove'/>";
			document.movieForm.submit();
		}
	}
</script>
</head>
<!--************************** begin of contents *****************************-->

<!-- begin of title -->
<table width="100%" height="24" border="0" cellpadding="0"
	cellspacing="0">
	<tr>
		<td background="<c:url value='/sample/images/ct_ttl_img02.gif'/>" width="100%">
		<table width="100%" height="24" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td height="24" class="ct_ttl01" style="padding-left: 12px">
					<c:if test="${empty movieForm.movieId}"> Add Movie Information
					 	<c:set var="readonly" value="false" />
					</c:if>
					<c:if test="${not empty movieForm.movieId}">
						Update Movie Information<c:set var="readonly" value="true" />
					</c:if>
				</td>
			</tr>
		</table>
		</td>
	</tr>
</table>
<!-- end of title -->

<html:form method="post" action="/strutsMovie.action" enctype="multipart/form-data">
	<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 13px;">

		<c:if test="${not empty movieForm.movieId}">
			<html:hidden property="movieId" />
		</c:if>
		<tr>
			<td width="150" class="ct_td"><bean:message key="movie.title" />&nbsp;*</td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01"><html:text property="title" styleClass="ct_input_g" errorStyleClass="text medium error" size="40" maxlength="50" /><html:errors property="title" /></td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><bean:message key="movie.director" />&nbsp;*</td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01"><html:text property="director" styleClass="ct_input_g" errorStyleClass="text medium error" size="40" maxlength="50" /><html:errors property="director" /></td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><bean:message key="movie.genre" />&nbsp;*</td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">
				<html:select property="genre.genreId" styleClass="ct_input_g" style="width:100px;">
				<c:forEach var="genre" items="${genreList}">
					<html:option value="${genre.genreId}">${genre.name}</html:option>
				</c:forEach>
				</html:select>
			</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><bean:message key="movie.actors" />&nbsp;*</td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01"><html:text property="actors" styleClass="ct_input_g" errorStyleClass="text medium error" size="60" maxlength="50" /><html:errors property="actors" /></td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><bean:message key="movie.runtime" /></td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01"><html:text property="runtime" styleClass="ct_input_g" errorStyleClass="text medium error" size="10" maxlength="3" /> min.<html:errors property="runtime" /></td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><bean:message key="movie.releaseDate" /></td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">
				<html:text property="releaseDate" styleClass="ct_input_g" errorStyleClass="text medium error" maxlength="10" />
				<a href="javascript:popUpCalendar(document.movieForm.releaseDate, 'yyyy-mm-dd');"><img src="<c:url value='/sample/images/ct_icon_date.gif'/>" width="16" height="18" border="0" align="absmiddle"></img></a>
				<html:errors property="releaseDate" />
			</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><bean:message key="movie.ticketPrice" /></td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01"><html:text property="ticketPrice" styleClass="ct_input_g" errorStyleClass="text medium error" maxlength="6" /><html:errors property="ticketPrice" /></td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><bean:message key="movie.nowPlaying" /></td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01"><bean:message key="movie.isNowPlaying" />&nbsp;<html:checkbox property="nowPlaying" value="Y" /></td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><bean:message key="movie.posterFile" /></td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">
				<c:if test="${not empty movieForm.posterFile}">
					<img src="<c:url value='${movieForm.posterFile}'/>" alt="<bean:message key='movie.posterFile'/>" border="0" />
					<html:hidden property="posterFile" />
				</c:if>
				<c:if test="${empty movieForm.posterFile && empty movieForm.movieId}">
					<html:file property="realPosterFile" styleClass="ct_input_g" style="width:309px; height:19px" maxlength="100" />
				</c:if>
			</td>
		</tr>
	</table>

	<!-- begin of button -->
	<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 10px;">
		<tr>
			<td height="24" colspan="2" align="center">
				<c:choose>
					<c:when test="${empty movieForm.movieId}">
						<a href="javascript:fncCreateMovie();"><img src="<c:url value='/sample/images/btn_add.png'/>" width="64" height="18" border="0" /></a>
					</c:when>
					<c:otherwise>
						<a href="javascript:fncUpdateMovie();"><img src="<c:url value='/sample/images/btn_update.png'/>" width="64" height="18" border="0" /></a>
						<a href="javascript:fncRemoveMovie();"><img src="<c:url value='/sample/images/btn_delete.png'/>" width="64" height="18" border="0" /></a>
					</c:otherwise>
				</c:choose>
			</td>
		</tr>
	</table>
</html:form>
