<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/taglibs.jsp"%>
<head>
	<%@ include file="/sample/common/meta.jsp" %>
    <title><spring:message code="movieStatus.title"/></title>
	<meta name="heading" content="<spring:message code='movieStatus.heading'/>"/>
	<link rel="stylesheet" href="<c:url value='/sample/css/admin.css'/>" type="text/css">
    <script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>    
</head>
<!--************************** begin of contents *****************************-->
<!-- begin of title -->
<table width="100%" height="24" border="0" cellpadding="0" cellspacing="0">
	<tr>
		<td height="24">
		<table width="100%" height="24" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td height="24" class="ct_ttl01" style="padding-left: 12px">Monthly Movie Status</td>
			</tr>
		</table>
		</td>
	</tr>
</table>
<!-- end of title -->

<table class="scrollTable" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top:10px;">
	<thead>
		<tr>
			<th scope="col" style="border-right: 1px #CCCCCC solid"><spring:message code="genre.id" /></th>
			<th scope="col" style="border-right: 1px #CCCCCC solid"><spring:message code="movieStatus.jan" /></th>
			<th scope="col" style="border-right: 1px #CCCCCC solid"><spring:message code="movieStatus.feb" /></th>
			<th scope="col" style="border-right: 1px #CCCCCC solid"><spring:message code="movieStatus.mar" /></th>
			<th scope="col" style="border-right: 1px #CCCCCC solid"><spring:message code="movieStatus.apr" /></th>
			<th scope="col" style="border-right: 1px #CCCCCC solid"><spring:message code="movieStatus.may" /></th>
			<th scope="col" style="border-right: 1px #CCCCCC solid"><spring:message code="movieStatus.jun" /></th>
			<th scope="col" style="border-right: 1px #CCCCCC solid"><spring:message code="movieStatus.jul" /></th>
			<th scope="col" style="border-right: 1px #CCCCCC solid"><spring:message code="movieStatus.aug" /></th>
			<th scope="col" style="border-right: 1px #CCCCCC solid"><spring:message code="movieStatus.sep" /></th>
			<th scope="col" style="border-right: 1px #CCCCCC solid"><spring:message code="movieStatus.oct" /></th>
			<th scope="col" style="border-right: 1px #CCCCCC solid"><spring:message code="movieStatus.nov" /></th>
			<th scope="col" style="border-right: 1px #CCCCCC solid"><spring:message code="movieStatus.dec" /></th>
		</tr>
	</thead>
	<tbody>
		<c:forEach var="movieStatus" items="${movieStatusList}">
			<tr class="board" onMouseOver="this.style.backgroundColor='#e4eaff';return true;" onMouseOut="this.style.backgroundColor=''; return true;" >
				<td class="underline">${movieStatus.genreId}</td>
				<td align="left">${movieStatus.janCount}</td>
				<td align="left">${movieStatus.febCount}</td>
				<td align="left">${movieStatus.marCount}</td>
				<td align="left">${movieStatus.aprCount}</td>
				<td align="left">${movieStatus.mayCount}</td>
				<td align="left">${movieStatus.junCount}</td>
				<td align="left">${movieStatus.julCount}</td>
				<td align="left">${movieStatus.augCount}</td>
				<td align="left">${movieStatus.sepCount}</td>
				<td align="left">${movieStatus.octCount}</td>
				<td align="left">${movieStatus.novCount}</td>
				<td align="left">${movieStatus.decCount}</td>
			</tr>
		</c:forEach>
	</tbody>
</table>

* If you defined a new logger with INFO level for scheduling, you can check a job scheduling in detail.