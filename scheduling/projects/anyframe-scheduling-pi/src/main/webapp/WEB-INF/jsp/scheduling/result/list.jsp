<%@ page language="java" errorPage="/sample/common/error.jsp"
	pageEncoding="UTF-8" contentType="text/html;charset=utf-8"%>
<%@ include file="/sample/common/top.jsp"%>
<div class="location">
	<a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/scheduling.do?method=list'/>">Scheduling 1.5.2</a>
</div>
</div>
<hr />
<script type="text/javascript"
	src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>
<div id="container">
	<form:form modelAttribute="jobResultInfo" method="post"
		name="searchForm">
		<div class="cont_top">
			<h2><spring:message code='scheduling.result.list.heading'/></h2>
		</div>
		<div class="cont_top">
			<div class="list_underbtn_right">
				<span class="button default icon"> <span class="add">&nbsp;</span>
					<a href="<c:url value='/scheduling.do?method=list'/>"><spring:message code='scheduling.button.job.list'/></a>
				</span>
			</div>
		</div>
		<div class="list">
			<table summary="This is list of schedule results">
				<caption><spring:message code='scheduling.result.list.heading'/></caption>
				<colgroup>
					<col style="width: 10%;" />
					<col style="width: 15%;" />
					<col style="width: 15%;" />
					<col style="width: 10%;" />
				</colgroup>
				<thead>
					<tr>
						<th><spring:message code='scheduling.result.status'/></th>
						<th><spring:message code='scheduling.startdate'/></th>
						<th><spring:message code='scheduling.enddate'/></th>
						<th><spring:message code='scheduling.result.exception'/></th>
					</tr>
				</thead>
				<tbody>
					<c:forEach var="jobResultInfo" items="${results}">
						<tr>
							<td class="align_center">
								<c:choose>
									<c:when test="${jobResultInfo.isSuccess == true}">
										<img src="<c:url value='/sample/images/success.png'/>" alt="success"/>
									</c:when>
									<c:otherwise>
										<img src="<c:url value='/sample/images/fail.png'/>" alt="fail"/>
									</c:otherwise>
								</c:choose>
							</td>
							<td class="align_center"><spring:eval expression="jobResultInfo.startDate"/></td>
							<td class="align_center"><spring:eval expression="jobResultInfo.endDate"/></td>
							<td class="align_center">
								<c:choose>
									<c:when test="${jobResultInfo.isSuccess == false}">
										<a class="linkClass"
											href="${ctx}/schedulingResult.do?method=get&amp;jobName=${jobResultInfo.jobName}&amp;jobGroup=${jobResultInfo.jobGroup}&amp;startDate=<spring:eval expression="jobResultInfo.startDate"/>"><spring:message code='scheduling.link.exception'/></a>
									</c:when>
								</c:choose>
							</td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
	</form:form>
</div>
<hr />
<%@ include file="/sample/common/bottom.jsp"%>