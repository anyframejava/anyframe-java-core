<%@ page language="java" errorPage="/sample/common/error.jsp"
	pageEncoding="UTF-8" contentType="text/html;charset=utf-8"%>
<%@ include file="/sample/common/taglibs.jsp"%>

<div class="grid_searchForm">
	<select id="${gridId}_searchCondition">
		<option value="name"><spring:message code="community.name" /></option>
		<option value="desc"><spring:message code="community.desc" /></option>
	</select>
	<input id="${gridId}_searchKeyword" maxlength="50"/>
	<img id="${gridId}_btnSearch" class="btnSearch" width="25" height="18" border="0" align="middle" src="${ctx}/sample/images/btn_search.png">
</div>
<form:form method="post" id="${gridId}_Form" name="${gridId}Form" onsubmit="javascript:return false;">
	<!-- jqGrid -->
	<table id="${gridId}" class="scroll" cellpadding="0" cellspacing="0">
		<tr>
			<td />
		</tr>
	</table>
	<div id="${gridId}_pager"></div>
	<input type="hidden" id="${gridId}_pageIndex" name="pageIndex" value="1" />
	<a id="${gridId}_getLink" name="getLink"></a>
</form:form>