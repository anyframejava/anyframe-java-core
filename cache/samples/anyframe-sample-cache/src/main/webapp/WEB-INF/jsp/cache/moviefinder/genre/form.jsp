<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/taglibs.jsp"%>
<head>
    <%@ include file="/sample/common/meta.jsp" %>
    <title><spring:message code="genreDetail.title"/></title>
    <meta name="heading" content="<spring:message code='genreDetail.heading'/>"/>   
	<link rel="stylesheet" href="<c:url value='/sample/css/admin.css'/>" type="text/css">        
	<script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>
	<script type="text/javascript">
	function fncCreateGenre() {
	    document.genreForm.action="<c:url value='/cacheGenre.do?method=create'/>";
	    document.genreForm.submit();
	}
	
	function fncUpdateGenre() {
	    document.genreForm.action="<c:url value='/cacheGenre.do?method=update'/>";
	    document.genreForm.submit();
	}
	
	function fncRemoveGenre(){	
		if(confirmDelete('genre')) {
		    document.genreForm.action="<c:url value='/cacheGenre.do?method=remove'/>";
		    document.genreForm.submit();
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
				 	<c:if test="${empty genre.genreId}">
				 	Add Genre Information
				 	<c:set var="readonly" value="false"/>
					</c:if>
			
				    <c:if test="${not empty genre.genreId}">	
					Update Genre Information
					<c:set var="readonly" value="true"/>				 
					</c:if>					
				</td>
			</tr>
		</table>
		</td>
	</tr>
</table>
<form:form modelAttribute="genre" name="genreForm" method="post">
	
	<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 13px;">
		<c:if test="${readonly}">
		<tr>
			<td width="150" class="ct_td"><spring:message code="genre.id" />&nbsp;*</td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">
				<form:input path="genreId" cssClass="ct_input_g" cssErrorClass="text medium error" size="40" maxlength="50" readonly="${readonly}"/>
				<form:errors path="genreId" cssClass="errors" />
			</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		</c:if>
		<tr>
			<td width="150" class="ct_td"><spring:message code="genre.name" />&nbsp;*</td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">
				<form:input path="name" cssClass="ct_input_g" cssErrorClass="text medium error" size="40" maxlength="50" /><form:errors path="name" cssClass="errors" />
			</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
	</table>
	<!-- begin of button -->
	<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 10px;">
		<tr>
			<td height="24" colspan="2" align="center">
				<c:if test="${empty genre.genreId}">
					<a id="createlink" href="javascript:fncCreateGenre();"><img src="<c:url value='/sample/images/btn_add.png'/>" width="64" height="18" border="0" /></a>
				</c:if>
				<c:if test="${not empty genre.genreId}">
					<a id="updatelink" href="javascript:fncUpdateGenre();"><img src="<c:url value='/sample/images/btn_update.png'/>" width="64" height="18" border="0" /></a>
					<a href="javascript:fncRemoveGenre();"><img src="<c:url value='/sample/images/btn_delete.png'/>" width="64" height="18" border="0" /></a>
				</c:if>
			</td>
		</tr>
	</table>
</form:form>
