<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/scheduling.do?method=list'/>">Scheduling 1.5.2-SNAPSHOT</a></div>
    </div>
    <hr />
<script type="text/javascript" src="<c:url value='/sample/javascript/InputCalendar.js'/>"></script>
<script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>   
    <div id="container">
    	<div class="cont_top">
       		<h2><spring:message code='scheduling.result.detail.heading'/></h2>
       		<c:set var="readonly" value="true"/>
        </div>
        <div class="view">
        <form:form modelAttribute="jobResultInfo" name="schedulingResultForm" method="post">
      		<table summary="This table shows detail information about genre, title, director, actors, runtime, release date, ticket price of the movie">
            	<caption><spring:message code='scheduling.result.detail.heading'/></caption>
                <colgroup>
                	<col style="width:20%;" />
                    <col style="width:80%;" />
                </colgroup>
                <tbody>
                    <tr>
                    	<th><label for="startDate"><spring:message code='scheduling.startdate'/></label></th>
                        <td><form:input path="startDate" cssClass="w_normal" readonly="${readonly}"/><form:errors path="startDate" cssClass="errors" /></td>
                    </tr>
                    <tr>
                    	<th><label for="endDate"><spring:message code='scheduling.enddate'/></label></th>
                        <td><form:input path="endDate" cssClass="w_normal" readonly="${readonly}"/><form:errors path="endDate" cssClass="errors" /></td>
                    </tr>
                    <tr>
                    	<th><label for="exception"><spring:message code='scheduling.result.exception'/></label></th>
                    	<td><form:textarea path="exception" rows="20" cols="100" readonly="${readonly}"/><form:errors path="exception" cssClass="errors" /></td>
                    </tr>
                </tbody>
            </table>
            </form:form>
        </div>
        <div class="btncontainer_center">
	        <span class="button default icon">
	            <span class="list"></span>
	            <a href="${ctx}/schedulingResult.do?method=list&amp;jobName=${jobResultInfo.jobName}&amp;jobGroup=${jobResultInfo.jobGroup}"><spring:message code='scheduling.button.list'/></a>
	        </span>
    	</div>
	</div>
    <hr />
<%@ include file="/sample/common/bottom.jsp"%>