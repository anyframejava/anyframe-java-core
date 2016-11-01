<div id="body">
<%@ page isErrorPage="true"%>
<%@ page contentType="text/html; charset=utf-8"%>
<%@ page import="org.anyframe.exception.BaseException"%>
<%@ page import="javax.ws.rs.WebApplicationException"%>
<%@ page import="javax.ws.rs.core.Response"%>
<%@ page import="javax.ws.rs.core.Response.Status"%>
<%@ page isErrorPage="true"%>
<%@ include file="/sample/common/top.jsp"%>
	</div>
    <hr />
    
    <div id="container">
    	<div class="cont_top">
        	<h2>Fail Message</h2>
        </div><!-- // cont_top E -->
    	<div class="failmessagebox">
        	<p>
        	<c:choose>
				<c:when test="${exception.message == 'Occurred Error'}">
					<spring:message code='${exception.cause.message}'/> 
				</c:when>
				<c:otherwise>
					<spring:message code='${exception.message}'/> 
				</c:otherwise>
				</c:choose>
				<% if (request.getAttribute("exception") instanceof WebApplicationException) {
				WebApplicationException webappException = (WebApplicationException) request.getAttribute("exception");
				Response res = webappException.getResponse();
				if (res.getStatus() == Status.NOT_FOUND.getStatusCode()) {
				%>	 Error Code : [<%=res.getStatus()%>] Resource is not found. 	
				<%  } else if(res.getStatus() == Status.INTERNAL_SERVER_ERROR.getStatusCode()) {
				%>   Error Code : [<%=res.getStatus()%>] Internal Server Error occurred. 
				<%  } else {
				%>   Response Status Code : [<%=res.getStatus()%>] Check this status code. 
				<%  }
				}%>
        	</p>
        </div>
	</div>
    <hr />
<%@ include file="/sample/common/bottom.jsp"%>