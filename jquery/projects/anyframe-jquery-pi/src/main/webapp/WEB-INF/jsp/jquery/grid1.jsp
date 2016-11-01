<%@ page language="java" errorPage="/sample/common/error.jsp"
	pageEncoding="UTF-8" contentType="text/html;charset=utf-8"%>
<%@ include file="/sample/common/taglibs.jsp"%>

<div class="grid_searchForm">
	<select id="${gridId}_searchCondition">
		<option value="title"><spring:message code="jquery.board.title" /></option>
		<option value="contents"><spring:message code="jquery.board.contents" /></option>
	</select>
	<input type="text" name="grid_searchKeyword" id="${gridId}_searchKeyword" maxlength="50"/>
	<img id="${gridId}_btnSearch" class="btnSearch" width="25" height="18" border="0" align="middle" src="${ctx}/sample/images/btn_search_i.gif">
</div>
<form:form method="post" id="${gridId}_searchForm" name="${gridId}Form">
	<!-- jqGrid -->
	<table id="${gridId}" class="scroll" cellpadding="0" cellspacing="0"></table>
	<div id="${gridId}_boardNav">
		<div id="${gridId}_pagination" class="pagination"></div>
	</div>
	<input type="hidden" id="${gridId}_pageIndex" name="pageIndex" value="1" />
	<a id="${gridId}_getLink" name="getLink"></a>
</form:form>

<div class="buttons">
	<button id="${gridId}_btnAdd">Add</button>
	<button id="${gridId}_btnEdit">Edit</button>
	<button id="${gridId}_btnRemove">Remove</button>
	<button id="${gridId}_btnRefresh">Refresh</button>
	<!--<button id="${gridId}_btnChooser">Chooser</button>-->
</div>