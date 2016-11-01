<%@ page language="java" errorPage="/sample/common/error.jsp"
	pageEncoding="UTF-8" contentType="text/html;charset=utf-8"%>
<%@ include file="/sample/common/top.jsp"%>
</div>
<hr />
<script type="text/javascript"
	src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>
<script type="text/javascript">
	function fncChangeTimeZone(arg) {
		document.location.href = "<c:url value='timeZone.do?timeZone='/>" + arg;
	}
</script>
<div id="container">
	<div class="cont_top">
		<h2>TimeZone Converter</h2>
	</div>
	<div class="view">
		<form name="timeZoneForm" method="get">
			<table summary="This is TimeZone">
				<caption>Movie List</caption>
				<colgroup>
					<col style="width: 30%;" />
					<col style="width: 30%;" />
					<col style="width: 40%;" />
				</colgroup>
				<thead>
					<tr>
						<th>TimeZone</th>
						<th>Title</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td rowspan="3"><select id="timeZone"
							onChange="javascript:fncChangeTimeZone(this.value)">
								<c:forEach var="timeZone" items="${timeZoneList}">
									<option value="${timeZone}">${timeZone}</option>
								</c:forEach>
						</select></td>
						<td>Standard TimeZone Date</td>
						<td>${standardTimeZoneDate}</td>
					</tr>
					<tr>
						<td>My TimeZone Date</td>
						<td>${myTimeZoneDate}</td>
					</tr>
					<tr>
						<td>Select TimeZone Date (${selectTimeZoneID})</td>
						<td>${selectTimeZoneDate}</td>
					</tr>
				</tbody>
			</table>
		</form>
	</div>
</div>
<hr />

<%@ include file="/sample/common/bottom.jsp"%>