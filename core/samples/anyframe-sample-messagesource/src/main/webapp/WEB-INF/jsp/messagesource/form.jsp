<%@ page language="java" errorPage="/sample/common/error.jsp"
	pageEncoding="UTF-8" contentType="text/html;charset=utf-8"%>
<%@ include file="/sample/common/top.jsp"%>
<div class="location">
	<a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a
		href="<c:url value='/messageSource.do?method=list'/>">MessageSource
		Sample - 1.6.1-SNAPSHOT</a>
</div>
</div>
<hr />
<script type="text/javascript"
	src="<c:url value='/sample/javascript/InputCalendar.js'/>"></script>
<script type="text/javascript"
	src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>
<script type="text/javascript">
	function fncCreateMessageSource() {
		document.messageSourceForm.action = "<c:url value='/messageSource.do?method=create'/>";
		document.messageSourceForm.submit();
	}

	function fncUpdateMessageSource() {
		document.messageSourceForm.action = "<c:url value='/messageSource.do?method=update'/>";
		document.messageSourceForm.submit();
	}

	function fncRemoveMessageSource() {
		if (confirmDelete('messageSource')) {
			document.messageSourceForm.action = "<c:url value='/messageSource.do?method=remove'/>";
			document.messageSourceForm.submit();
		}
	}
</script>
<!--************************** begin of contents *****************************-->
<div id="container">

	<div class="cont_top">
		<h2>
			<c:if test="${empty messageSource.country}">				 	
				 	Add MessageSource Information
				 	<c:set var="readonly" value="false" />
			</c:if>

			<c:if test="${not empty messageSource.country}">					
					Update MessageSource Information
					<c:set var="readonly" value="true" />
			</c:if>
		</h2>
	</div>
	<div class="view">
		<form:form modelAttribute="messageSource" method="post"
			action="messageSource.do" id="messageSourceForm"
			name="messageSourceForm">
			<table
				summary="This table shows detail information about the messageSource">
				<caption>Detail information</caption>
				<colgroup>
					<col style="width: 20%;" />
					<col style="width: 80%;" />
				</colgroup>
				<tbody>
					<tr>
						<th><label for="country"><spring:message
									code="messageSource.country" />&nbsp;*</label>
						</th>
						<td><form:input path="country" cssClass="w_normal"
								readonly="${readonly}" />
							<form:errors path="country" cssClass="errors" />
						</td>
					</tr>
					<tr>
						<th><label for="key"><spring:message
									code="messageSource.key" />&nbsp;*</label>
						</th>
						<td><form:input path="key" cssClass="w_full"
								readonly="${readonly}" />
							<form:errors path="key" cssClass="errors" />
						</td>
					</tr>
					<tr>
						<th><label for="language"><spring:message
									code="messageSource.language" />&nbsp;*</label>
						</th>
						<td><form:input path="language" cssClass="w_normal"
								readonly="${readonly}" />
							<form:errors path="language" cssClass="errors" />
						</td>
					</tr>
					<tr>
						<th><label for="text"><spring:message
									code="messageSource.text" />&nbsp;*</label>
						</th>
						<td><form:textarea path="text" rows="5" cols="100" /> <form:errors
								path="text" cssClass="errors" /></td>
					</tr>
				</tbody>
			</table>
			<input type="hidden" name="rootPath" value="<c:url value='/'/>" />
		</form:form>
	</div>

	<div class="btncontainer_center">
	    <a href="<c:url value='/messageSource.do?method=list'/>">
	    <span class="button default icon">
	        <span class="list">&nbsp;</span>
	        <span class="none_a txt_num4"><spring:message code="movie.button.list" /></span>
	    </span>
	    </a>        
		<c:if test="${empty messageSource.country}">
		    <a href="javascript:fncCreateMessageSource();">
		    <span class="button default icon">
		        <span class="add">&nbsp;</span>
		        <span class="none_a txt_num3"><spring:message code="movie.button.add" /></span>
		    </span>
		    </a>   
		</c:if>
		<c:if test="${not empty messageSource.country}">
		    <a href="javascript:fncUpdateMessageSource();">
		    <span class="button default icon">
		        <span class="update">&nbsp;</span>
		        <span class="none_a txt_num6"><spring:message code="movie.button.update" /></span>
		    </span>
		    </a> 
		    <a href="javascript:fncRemoveMessageSource();">
		    <span class="button default icon">
		        <span class="delete">&nbsp;</span>
		        <span class="none_a txt_num6"><spring:message code="movie.button.remove" /></span>
		    </span>
		    </a> 
		</c:if>
   	</div>
</div>
<hr />
<%@ include file="/sample/common/bottom.jsp"%>
