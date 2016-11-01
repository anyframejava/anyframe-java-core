<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/scheduling.do?method=list'/>">Scheduling 1.5.0.RC1</a></div>
    </div>
    <hr />
<script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>    
<script type="text/javascript">
	function fncCreateSchedulingView() {
		document.location.href="<c:url value='/scheduling.do?method=createView'/>";
	}	
	function fncSearchScheduling() {
	   	document.searchForm.action="<c:url value='/scheduling.do?method=list'/>";
	   	document.searchForm.submit();						
	}		
	function fncInsertInitData() {
		document.searchForm.action="<c:url value='/scheduling.do?method=init'/>";
		document.searchForm.submit();
	}
</script>
  	<div id="container">
  	<form:form modelAttribute="jobInfo" method="post" name="searchForm">
    	<div class="cont_top">
        	<h2><spring:message code="scheduling.job.list.heading" /></h2>
      	</div>
        <div class="list">
      		<table summary="This is list of schedules">
            	<caption><spring:message code="scheduling.job.list.heading" /></caption>
                <colgroup>
                	<col style="width:20%;" />
                	<col style="width:40%;" />
                    <col style="width:15%;" />
                    <col style="width:10%;" />
                    <col style="width:15%;" />
                </colgroup>
                <thead>
                    <tr>
                    	<th><spring:message code="scheduling.job.name" /></th>
                        <th><spring:message code="scheduling.target.class" /></th>
                    	<th><spring:message code="scheduling.target.method" /></th>
                        <th><spring:message code="scheduling.schedule.result" /></th>
                        <th><spring:message code="scheduling.schedule.action" /></th>
                    </tr>
                </thead>
                <tbody>
                	<c:forEach var="jobInfo" items="${schedules}">
	                	<tr>
	                    	<td class="align_center"><a class="linkClass" href="${ctx}/scheduling.do?method=get&amp;jobName=${jobInfo.jobName}&amp;jobGroup=${jobInfo.jobGroup}">${jobInfo.jobName}</a></td>
	                        <td>${jobInfo.jobTarget}</td>
	                        <td class="align_center">${jobInfo.jobTargetMethod}</td>
	                    	<td class="align_center"><a class="linkClass" href="${ctx}/schedulingResult.do?method=list&amp;jobName=${jobInfo.jobName}&amp;jobGroup=${jobInfo.jobGroup}"><spring:message code="scheduling.link.result" /></a></td>
	                        <td class="align_center">
	                        	<a class="linkClass" href="${ctx}/scheduling.do?method=run&amp;jobName=${jobInfo.jobName}&amp;jobGroup=${jobInfo.jobGroup}"><img src="<c:url value='/sample/images/run.png'/>" alt="run"/></a>
	                        </td>
	                    </tr>
                    </c:forEach>
                </tbody>
            </table>
        </div>
    	<div class="listunder_container">           
            <div class="list_paging">
            </div>
            <div class="list_underbtn_right">
            	<c:if test="${empty schedules}">
	            	<a href="javascript:fncInsertInitData();">
				    <span class="button default">
				        <span></span>
				        <span class="none_a txt_num4 align_center"><spring:message code="scheduling.button.init" /></span>
				    </span>
				    </a>
            	</c:if>
                <a href="javascript:fncCreateSchedulingView();">
                <span class="button default icon">   
                    <span class="add">&nbsp;</span>
                    <span class="none_a txt_num3"><spring:message code="scheduling.button.add" /></span>
                </span>
                </a>    
            </div>
        </div>
        </form:form>
	</div>
    <hr />
<%@ include file="/sample/common/bottom.jsp"%>