<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/taglibs.jsp"%>
<head>
    <%@ include file="/sample/common/meta.jsp" %>
    <title>Director List</title>
	<meta name="heading" content="Director"/>       
	<link rel="stylesheet" href="<c:url value='/sample/css/admin.css'/>" type="text/css">
    <script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>    
    
    <!-- jQuery include -->
    <script type="text/javascript" src="<c:url value='/iam/jquery/jquery-1.4.2.min.js'/>"></script>
    
    <!-- jQuery popup component : nyromodal -->
	<link rel="stylesheet" href="<c:url value='/iam/jquery/popup/nyroModal.full.css'/>" type="text/css"/>
    <script type="text/javascript" src="<c:url value='/iam/jquery/popup/jquery.nyroModal-1.6.2.js'/>"></script>
    
	<script type="text/javascript">
	function fncSearchDirector() {
	   	document.searchForm.action="<c:url value='/iamListDirector.do'/>";
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
				<td height="24" class="ct_ttl01" style="padding-left: 12px">Search List of Director</td>
			</tr>
		</table>
		</td>
	</tr>
</table>
<!-- end of title -->

<form:form modelAttribute="search" method="post" name="searchForm">
	<!-- begin of search -->
	<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 10px; vertical-align: center;">
		<tr>
			<td align="right">
				<label>Director Name : <form:input path="searchKeyword" cssClass="ct_input_g" cssErrorClass="text medium error" maxlength="50" /></label>
			</td>
			
			<td align="right" width="35">
				<a href="javascript:fncSearchDirector();"><img src="<c:url value='/sample/images/btn_search.png'/>" width="25" height="18" border="0" align="middle"/></a>
			</td>
		</tr>
	</table>
	<!-- end of search -->
	
	<table class="scrollTable" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top:10px;">
		<thead>
			<tr>
				<th scope="col" style="border-right: 1px #CCCCCC solid">Director Id</th>
				<th scope="col" style="border-right: 1px #CCCCCC solid">Director Name</th>
				<th scope="col" style="border-right: 1px #CCCCCC solid">Movies</th>
			</tr>
		</thead>
		
		<tbody>
			<c:forEach var="director" items="${directorList}">
				<tr class="board" onMouseOver="this.style.backgroundColor='#e4eaff';return true;" onMouseOut="this.style.backgroundColor=''; return true;" >
					<td class="underline">
						<a class="linkClass" href="${ctx}/iamGetDirector.do?directorId=${director.directorId}">${director.directorId}</a>
					</td>
					<td class="underline">${director.name}</td>					
					<td align="left">${director.movies}</td>
				</tr>
			</c:forEach>
		</tbody>
	</table>

	<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 10px;">
		<tr>
			<td align="left"><a href="#test" class="nyroModal"><img src="<c:url value='/iam/img/btn_help.png'/>" width="64" height="18" border="0" /></a></td>
			<td align="right"><a href='<c:url value='/j_spring_security_logout'/>'><img
				src="<c:url value='/sample/images/btn_logout.png'/>" width="64" height="18" border="0" /></a></td>				
		</tr>
	</table>
</form:form>

<div id="test" style="display: none; width: 600px;">
  <table>
  	  <tr>
	    <td>
			<b>You can enter this application using UserName/Password as below : </b>
			<ul>
				<li>UserName : <b>admin</b>, Password : <b>admin123</b>,&nbsp; Role : <b>ROLE_ADMIN </b></li>
				<li>UserName : <b>user</b>,&nbsp;&nbsp;&nbsp; Password : <b>user123</b>,&nbsp;&nbsp;&nbsp; Role : <b>ROLE_USER</b></li>
				<li>UserName : <b>buyer</b>,&nbsp; Password : <b>buyer123</b>,&nbsp; Role : <b>ROLE_RESTRICTED</b></li>
			</ul>
			<b>Each Role has authorization as below : </b>
			<ul>
				<li><b>Director List</b> : ROLE_USER, ROLE_ADMIN </li>
				<li><b>Update Director</b> : ROLE_ADMIN </li>
			</ul>
	    </td>
	  </tr>
  </table>
</div>