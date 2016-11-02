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
	src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>
<script type="text/javascript">
	function fncCreateMessageSourceView() {
		document.location.href = "<c:url value='/messageSource.do?method=createView'/>";
	}
	function fncSearchMessageSource() {
		document.searchForm.action = "<c:url value='/messageSource.do?method=list'/>";
		document.searchForm.submit();
	}
</script>
<div id="container">
	<form:form modelAttribute="searchVO" method="post" name="searchForm">
		<div class="cont_top">
			<h2>
				<spring:message code='messageSourceList.title' />
			</h2>
			<div class="search_list">
				<fieldset>
					<legend>Search</legend>
					<label for="searchCondition" class="float_left margin_right5">
						<form:select path="searchCondition" id="searchCondition"
							cssClass="w_search">
							<form:option value="All">All</form:option>
							<form:option value="country">
								<spring:message code="messageSource.country" />
							</form:option>
							<form:option value="key">
								<spring:message code="messageSource.key" />
							</form:option>
							<form:option value="language">
								<spring:message code="messageSource.language" />
							</form:option>
							<form:option value="text">
								<spring:message code="messageSource.text" />
							</form:option>
						</form:select> </label> <label for="searchKeyword" class="float_left margin_right5">
						<form:input path="searchKeyword" id="searchKeyword"
							cssClass="w_search" cssErrorClass="text medium error"
							maxlength="255" />
					</label> <label for="btnSearch" class="float_left"> <input
						type="image" id="btnSearch" name="searchBtn" alt="Search"
						onclick="javascript:fncSearchMessageSource();"
						src="<c:url value='/sample/images/btn_search_i.gif'/>" /> </label>
				</fieldset>
			</div>
		</div>
		<div class="list">
			<table
				summary="This is list of <spring:message code="messageSourceList.messageSource"/>">
				<caption>
					<spring:message code="messageSourceList.title" />
				</caption>
				<colgroup>
					<col style="width: 10%;" />
					<col style="width: 30%;" />
					<col style="width: 10%;" />
					<col style="width: 50%;" />
				</colgroup>
				<thead>
					<tr>
						<th><spring:message code="messageSource.country" />
						</th>
						<th><spring:message code="messageSource.key" />
						</th>
						<th><spring:message code="messageSource.language" />
						</th>
						<th><spring:message code="messageSource.text" />
						</th>
					</tr>
				</thead>
				<tbody>
					<c:forEach var="messageSource" items="${messageSourceList}">
						<tr>
							<td>${messageSource.country}</td>
							<td><a
								href="<c:url value='/messageSource.do?method=get&amp;country=${messageSource.country}&amp;key=${messageSource.key}&amp;language=${messageSource.language}'/>">${messageSource.key}</a>
							</td>
							<td>${messageSource.language}</td>
							<td>${messageSource.text}</td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>

		<div class="listunder_container">
			<div class="list_paging">
				<anyframe:pagenavigator
					linkUrl="javascript:fncSearchMessageSource();"
					pages="${resultPage}" />
			</div>
			<div class="list_underbtn_right">
				<a href="javascript:fncCreateMessageSourceView();"> <span
					class="button default icon"> <span class="add">&nbsp;</span>
						<span class="none_a txt_num3"><spring:message
								code="movie.button.add" />
					</span> </span> </a>
				<a href="<c:url value='/messageSource.do?method=refresh'/>"> <span
					class="button default icon"> <span class="update">&nbsp;</span>
						<span class="none_a txt_num10">Refresh</span> </span> </a>
			</div>
		</div>
	</form:form>
</div>
<hr />
<%@ include file="/sample/common/bottom.jsp"%>