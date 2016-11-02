<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/logbackLoginView.do'/>">Logback 1.1.1-SNAPSHOT</a></div>
    </div>
    <hr />
<script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>    
<script type="text/javascript">
<!--
function fncSubmit() {
	document.loginForm.action="<c:url value='logbackLogin.do'/>";
	document.loginForm.submit();
}
--> 
</script>
 	<div id="container">
    	<div class="login">
    	<form name="loginForm" method="post" action="<c:url value='login.do'/>">
    	<div class="loginform">
                <ul>
                    <li><label for="id">User :</label><input type="text" name="id" id="id" /></li>
                    <li><label for="password">Password :</label><input type="password" name="password" id="password" /></li>
                    <li>
					    <a href="javascript:fncSubmit()">
					    <span class="button default icon">
					        <span class="login">&nbsp;</span>
					        <span class="none_a txt_num5 align_center">Login</span>
					    </span>
					    </a>                     
                    </li>
                </ul>
                <div class="clear"></div>
                <c:if test="${not empty loginError}">
                <ul>
					<li>				
						<spring:message code="${loginError}"/>
					</li>
				</ul>
				</c:if>
            </div>
            </form>
             
          </div>
       </div>
    <hr />
<%@ include file="/sample/common/bottom.jsp"%>