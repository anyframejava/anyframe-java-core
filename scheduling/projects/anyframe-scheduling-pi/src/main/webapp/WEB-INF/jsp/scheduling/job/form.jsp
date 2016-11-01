<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/scheduling.do?method=list'/>">Scheduling 1.5.2</a></div>
    </div>
    <hr />
<script type="text/javascript" src="<c:url value='/sample/javascript/InputCalendar.js'/>"></script>
<script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>   
<script type="text/javascript">
	function fncCreateJob() {
	    document.schedulingForm.action="<c:url value='/scheduling.do?method=create'/>";
	    document.schedulingForm.submit();
	}
	
	function fncUpdateJob() {
	    document.schedulingForm.action="<c:url value='/scheduling.do?method=update'/>";
	    document.schedulingForm.submit();
	}
	
	function fncRemoveJob(){	
		if(confirmDelete('job')) {
		    document.schedulingForm.action="<c:url value='/scheduling.do?method=remove'/>";
		    document.schedulingForm.submit();
		}	    
	}	
</script>    
    <div id="container">
    	<div class="cont_top">
        	<h2>
        		<c:if test="${empty jobInfo.jobName}">
				 	<spring:message code='scheduling.add'/>
				 	<c:set var="readonly" value="false"/>
				</c:if>
			
				<c:if test="${not empty jobInfo.jobName}">	
					<spring:message code='scheduling.update'/>
					<c:set var="readonly" value="true"/>				 
				</c:if>
			</h2>
        </div>
        <div class="view">
        <form:form modelAttribute="jobInfo" name="schedulingForm" method="post">
      		<table summary="This table shows detail information about job name, group, target, schedule, description of the schedule.">
            	<caption>Detail information</caption>
                <colgroup>
                	<col style="width:20%;" />
                    <col style="width:80%;" />
                </colgroup>
                <tbody>
                	<tr>
                    	<th><label for="jobName"><spring:message code='scheduling.job.name'/> *</label></th>
                        <td><form:input path="jobName" cssClass="w_normal" readonly="${readonly}"/><form:errors path="jobName" cssClass="errors" /></td>
                    </tr>
                    <tr>
                    	<th><label for="jobGroup"><spring:message code='scheduling.job.group'/> *</label></th>
                        <td><form:input path="jobGroup" cssClass="w_normal" readonly="${readonly}"/><form:errors path="jobGroup" cssClass="errors" /></td>
                    </tr>
                    <tr>
                    	<th><label for="jobTarget"><spring:message code='scheduling.target.class'/> *</label></th>
                        <td><form:input path="jobTarget" cssClass="w_full" readonly="${readonly}"/><form:errors path="jobTarget" cssClass="errors" /></td>
                    </tr>
                    <tr>
                    	<th><label for="jobTargetMethod"><spring:message code='scheduling.target.method'/></label></th>
                        <td><form:input path="jobTargetMethod" cssClass="w_normal" readonly="true"/><form:errors path="jobTargetMethod" cssClass="errors" /></td>
                    </tr>
                    <tr>
                    	<th><label for="flagScheduleType"><spring:message code='scheduling.schedule.type'/> *</label></th>
	                    <td>
		                    <form:select path="flagScheduleType" cssClass="w_normal" multiple="false">
		                        <form:option value="cron" label="Cron Trigger" />
								<form:option value="simple" label="Simple Trigger" />
	                        </form:select>
	                        <form:errors path="flagScheduleType" cssClass="errors" />
                        </td>
                    </tr>
                    <tr>
                    	<th><label for="jobSchedule"><spring:message code='scheduling.schedule'/> *</label></th>
                    	<td><form:input path="jobSchedule" cssClass="w_normal" /><form:errors path="jobSchedule" cssClass="errors" /></td>
                    </tr>
                    <tr>
                    	<th><label for="description"><spring:message code='scheduling.description'/></label></th>
                        <td>
                        <form:textarea path="description" rows="5" cols="100"/><form:errors path="description" cssClass="errors" />
                        <form:hidden path="startDate" />
                        </td>
                    </tr>
                </tbody>
            </table>
            </form:form>
        </div>
        <div class="btncontainer_center">
        <span class="button default icon">
            <span class="list"></span>
            <a href="<c:url value='/scheduling.do?method=list'/>"><spring:message code='scheduling.button.list'/></a>
        </span>
        <c:if test="${empty jobInfo.jobName}">
	        <span class="button default icon">
	            <span class="add"></span>
	            <a href="javascript:fncCreateJob();"><spring:message code='scheduling.button.add'/></a>
	        </span>
        </c:if>
        <c:if test="${not empty jobInfo.jobName}">
        	<span class="button default icon"> 
	            <span class="update"></span>
	            <a href="javascript:fncUpdateJob();"><spring:message code='scheduling.button.update'/></a>
	        </span>
	         <span class="button default icon">
	            <span class="delete"></span>
	            <a href="javascript:fncRemoveJob();"><spring:message code='scheduling.button.remove'/></a>
	        </span>
        </c:if>
    	</div>
	</div>
    <hr />
<%@ include file="/sample/common/bottom.jsp"%>