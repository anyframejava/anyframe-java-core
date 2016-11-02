<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ page import="org.springframework.security.web.authentication.AbstractProcessingFilter" %>
<%@ page import="org.springframework.security.web.authentication.AuthenticationProcessingFilter" %>
<%@ page import="org.springframework.security.core.AuthenticationException" %>
<%@ include file="/sample/common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Anyframe 5.2.0 Main</title>
<link rel="stylesheet" type="text/css" href="<c:url value='/sample/css/layout.css'/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value='/sample/css/common.css'/>"/>
<script type="text/javascript">
function fncSubmit() {
	document.f.submit();
}	
function fncReset() {
	document.f.reset();					
}		
</script>     
</head>

<body  onload="document.f.j_username.focus();">
<div id="wrap">
	<div class="skipnavigation">
		<a href="#contents">Jump up to the contents</a>
	</div>
    <hr />
    
    <div id="header">
    	<div class="toplogo"><h1><a href="<c:url value='/anyframe.jsp'/>"><img src="<c:url value='/sample/images/h1_toplogo.jpg'/>" alt="anyframe"/></a></h1></div>
    </div>
    <hr />

<div id="container">
		<form name="f" action="<c:url value='j_spring_security_check'/>" method="post">
    	<div class="login_iam">
        	<p>This is Anyframe IAM Sample web application.</p>
            <ul>
            	<li><label for="j_username">User :</label><input type="text" id="j_username" name="j_username" class="w_id" value='<c:if test="${not empty param.login_error}"><c:out value="${SPRING_SECURITY_LAST_USERNAME}"/></c:if><c:if test="${empty param.login_error}">admin</c:if>'/></li>
                <li><label for="j_password">Password :</label><input type="password" id="j_password"  name="j_password" class="w_pw" value='<c:if test="${empty param.login_error}">admin123</c:if>' />
                </li>
                <li>
	                <a href="javascript:fncSubmit()">
	                <span class="button default icon">   
	                    <span class="login">&nbsp;</span>
	                    <span class="none_a txt_num5 align_center">Login</span>
	                </span>
	                </a>  
                </li>
                <li>
	                <a href="javascript:fncReset()">
	                <span class="button default icon">   
	                    <span class="update">&nbsp;</span>
	                    <span class="none_a txt_num5 align_center">Reset</span>
	                </span>
	                </a>                 
                </li>
                <c:if test="${not empty param.login_error}">
                <li>
          		<font color="red">
				  Your login attempt was not successful, try again.
				  Reason: <c:out value="${SPRING_SECURITY_LAST_EXCEPTION.message}"/>.
				</font>
                </li>
				</c:if>
            </ul>
        </div>
        </form>
	</div>
    <hr />
<%@ include file="/sample/common/bottom.jsp"%>
