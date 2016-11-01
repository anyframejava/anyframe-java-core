<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="org.springframework.security.core.context.SecurityContextHolder" %>
<%@ page import="org.springframework.security.core.Authentication" %>
<%@ page import="org.springframework.security.web.access.AccessDeniedHandlerImpl" %> 
<%@ include file="/sample/common/top.jsp"%>
	</div>
    <hr />
        <div id="container">
    	<div class="cont_top">
        	<h2>Occurred Access Denied Error</h2>
        </div><!-- // cont_top E -->
    	<div class="failmessagebox">
        	<p>
        		<font color="red">
				<%= request.getAttribute(AccessDeniedHandlerImpl.SPRING_SECURITY_ACCESS_DENIED_EXCEPTION_KEY)%>
				<%		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
						if (auth != null) { %>
				<%      } %>
				</font>
			</p>
            <div class="btncontainer_center">
			    <a href="<c:url value='/directorLogin.do'/>">
			    <span class="button default icon">
			        <span class="back">&nbsp;</span>
			        <span class="none_a txt_num12" style="width:140px;">Back to Login View</span>
			    </span>
			    </a>   
            </div>
        </div>
	</div>
    <hr />
<%@ include file="/sample/common/bottom.jsp"%>