<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/taglibs.jsp"%>
<head>
    <%@ include file="/sample/common/meta.jsp" %>
    <title><spring:message code="movieDetail.title"/></title>
    <meta name="heading" content="<spring:message code='movieDetail.heading'/>"/>   
	<link rel="stylesheet" href="<c:url value='/sample/css/admin.css'/>" type="text/css">            
	<script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/sample/javascript/InputCalendar.js'/>"></script>
	<script type="text/javascript">
	function fncCreateMovie() {
	    document.movieForm.action="<c:url value='/coreMovie.do?method=create'/>";
	    document.movieForm.submit();
	}
	
	function fncUpdateMovie() {
	    document.movieForm.action="<c:url value='/coreMovie.do?method=update'/>";
	    document.movieForm.submit();
	}
	
	function fncRemoveMovie(){	
		if(confirmDelete('movie')) {
		    document.movieForm.action="<c:url value='/coreMovie.do?method=remove'/>";
		    document.movieForm.submit();
		}	    
	}	
	</script>         
</head>
<!--************************** begin of contents *****************************-->

<!--begin of title-->
<table width="100%" height="24" border="0" cellpadding="0" cellspacing="0">
	<tr>
		<td background="<c:url value='/sample/images/ct_ttl_img02.gif'/>" width="100%">
		<table width="100%" height="24" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td height="24" class="ct_ttl01" style="padding-left: 12px">
				 	<c:if test="${empty movie.movieId}">
				 	Add Movie Information
				 	<c:set var="readonly" value="false"/>
					</c:if>
			
				    <c:if test="${not empty movie.movieId}">	
					Update Movie Information
					<c:set var="readonly" value="true"/>				 
					</c:if>					
				</td>
			</tr>
		</table>
		</td>
	</tr>
</table>
<form:form modelAttribute="movie" name="movieForm" method="post">
	
	<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 13px;">
		<c:if test="${not empty movie.movieId}">
			<form:hidden path="movieId" />
		</c:if>
		
		<tr>
			<td width="150" class="ct_td"><spring:message code="movie.title" />&nbsp;*</td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">
				<form:input path="title" cssClass="ct_input_g" cssErrorClass="text medium error" size="40" maxlength="50" /> <form:errors path="title" cssClass="errors" />
			</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><spring:message code="movie.director" />&nbsp;*</td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">
				<form:input path="director" cssClass="ct_input_g" cssErrorClass="text medium error" size="40" maxlength="50" /> 
				<form:errors path="director" cssClass="errors" />
			</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><spring:message code="movie.genre" />&nbsp;*</td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">
			<form:select path="genre.genreId">
            	<form:options items="${genreList}" itemValue="genreId" itemLabel="name"/>
          	</form:select>
			</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><spring:message code="movie.actors" />&nbsp;*</td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">
				<form:input path="actors" cssClass="ct_input_g" cssErrorClass="text medium error" size="40" maxlength="50" /> 
				<form:errors path="actors" cssClass="errors" />
			</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><spring:message code="movie.runtime" /></td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">
				<form:input path="runtime" cssClass="ct_input_g" cssErrorClass="text medium error" size="10" maxlength="3" /> min. 
				<form:errors path="runtime" cssClass="errors" />
			</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><spring:message code="movie.releaseDate" /></td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">
				<form:input path="releaseDate" id="releaseDate" cssClass="ct_input_g" cssErrorClass="text medium error" maxlength="10" />
				<a href="javascript:popUpCalendar(document.movieForm.releaseDate, 'yyyy-mm-dd');"><img src="<c:url value='/sample/images/ct_icon_date.gif'/>" width="16" height="18" border="0" align="absmiddle"></img></a>
				<form:errors path="releaseDate" cssClass="errors" />
			</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><spring:message code="movie.ticketPrice" /></td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">
				<form:input id="ticketPrice" path="ticketPrice" cssClass="ct_input_g" cssErrorClass="text medium error" maxlength="5" /> 
				<form:errors path="ticketPrice" cssClass="errors" />
			</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><spring:message code="movie.nowPlaying" /></td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">Is this movie now playing ? <form:checkbox path="nowPlaying" value="Y" />
			<input type="hidden" name="!nowPlaying" value="N" /></td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>	
	</table>
	<!--begin of button-->
	<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 10px;">
		<tr>
			<td height="24" colspan="2" align="center">
				<c:if test="${empty movie.movieId}">
					<a id="createlink" href="javascript:fncCreateMovie();"><img src="<c:url value='/sample/images/btn_add.png'/>" width="64" height="18" border="0" /></a>
				</c:if>
				<c:if test="${not empty movie.movieId}">
					<a id="updatelink" href="javascript:fncUpdateMovie();"><img src="<c:url value='/sample/images/btn_update.png'/>" width="64" height="18" border="0" /></a>
					<a href="javascript:fncRemoveMovie();"><img src="<c:url value='/sample/images/btn_delete.png'/>" width="64" height="18" border="0" /></a>
				</c:if>
			</td>
		</tr>
	</table>
</form:form>