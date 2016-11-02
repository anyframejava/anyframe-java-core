<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/logmanagerMovieFinder.do?method=list'/>">Log Manager 1.1.1-SNAPSHOT</a></div>
    </div>
    <hr />
<script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>    
<script type="text/javascript">
<!--
function fncSubmit() {
	var id = document.getElementsByName("userId")[0];
	if ( id.value.length < 1 ){
		alert("Invalid user id. User id is required.");
		return;
	}
	document.loginForm.action="<c:url value='/logmanagerLogin.do'/>";
	document.loginForm.submit();
}
//--> 
</script>
 	<div id="container">
    	<div class="login">
    	<form:form modelAttribute="user" name="loginForm" method="post" action="<c:url value='/logmanagerLogin.do'/>">
    	<div class="loginform" style="width:600px">
    			<div style="padding-bottom:10px;">* Input your information. This data is saved to mongodb for Log Manager.</div>
                <ul>
             		<!-- <li>* Input your information. This data is saved to mongodb for Log Manager.</li> -->
                    <li><label for="userId">User ID :</label><form:input path="userId"/></li>
                    <li><label for="userName">User Name :</label><form:input path="userName" /></li>
                    <li>
	                	<a href="javascript:fncSubmit()">
						    <span class="button default icon">
						        <span class="login">&nbsp;</span>
						        <span class="none_a txt_num5 align_center">Login</span>
						    </span>
						</a> 
					</li>
                </ul>
            </div>
            </form:form>
          </div>
       </div>
    <hr />
<%@ include file="/sample/common/bottom.jsp"%>