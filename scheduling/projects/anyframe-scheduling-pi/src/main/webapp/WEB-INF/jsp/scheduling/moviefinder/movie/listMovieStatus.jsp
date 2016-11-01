<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/schedulingMovieList.do'/>">Scheduling 1.0.3</a></div>
    </div>
    <hr />
<script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>    
  	<div id="container">
    	<div class="cont_top">
        	<h2>Monthly Movie Status</h2>
      	</div>
        <div class="list">
      		<table summary="Genre, Title, Director, Actors, Ticket Price, Release Date">
            	<caption>Search List</caption>
                <colgroup>
                	<col style="" />
                    <col span="12" style="width:6%;" />
                </colgroup>
                <thead>
                    <tr>
                    	<th><spring:message code="genre.id" /></th>
                        <th><spring:message code="movieStatus.jan" /></th>
                        <th><spring:message code="movieStatus.feb" /></th>
                        <th><spring:message code="movieStatus.mar" /></th>
                        <th><spring:message code="movieStatus.apr" /></th>
                        <th><spring:message code="movieStatus.may" /></th>
                        <th><spring:message code="movieStatus.jun" /></th>
                        <th><spring:message code="movieStatus.jul" /></th>
                        <th><spring:message code="movieStatus.aug" /></th>
                        <th><spring:message code="movieStatus.sep" /></th>
                        <th><spring:message code="movieStatus.oct" /></th>
                        <th><spring:message code="movieStatus.nov" /></th>
                        <th><spring:message code="movieStatus.dec" /></th>
                    </tr>
                </thead>
                <tbody>
                	<c:forEach var="movieStatus" items="${movieStatusList}">
                		<tr>
                    		<td>${movieStatus.genreId}</td>
                        	<td>${movieStatus.janCount}</td>
                        	<td>${movieStatus.febCount}</td>
                        	<td>${movieStatus.marCount}</td>
							<td>${movieStatus.aprCount}</td>
							<td>${movieStatus.mayCount}</td>
							<td>${movieStatus.junCount}</td>
							<td>${movieStatus.julCount}</td>
							<td>${movieStatus.augCount}</td>
							<td>${movieStatus.sepCount}</td>
							<td>${movieStatus.octCount}</td>
							<td>${movieStatus.novCount}</td>
							<td>${movieStatus.decCount}</td>
                    	</tr>
                    </c:forEach>
                </tbody>
            </table>
        </div>
        <p class="describe">* If you defined a new logger with INFO level for scheduling, you can check a job scheduling in detail.</p>
	</div>
    <hr />
<%@ include file="/sample/common/bottom.jsp"%>
