<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
		<div class="location"><a href="<c:url value='/anyframe.jsp'/>"></a></div>
	</div>
	<hr />
<script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>
<script type="text/javascript">
function fncSubmit() {
	var id = document.getElementsByName("id")[0];
	var password = document.getElementsByName("password")[0];
	if ( id.value.length < 4 ){
		alert("invalid id");
		return;
	}
	if ( password.value.length < 4 ){
		alert("invalid password");
		return;
	}
	document.loginForm.action="<c:url value='login.do'/>";
	document.loginForm.submit();
}
</script>
	<div id="container">
		<div class="login">
		<form name="loginForm" method="post" action="j_security_check">
		<div class="loginform">
			<ul>
				<li><label for="id">id :</label><input type="text" name="j_username" id="j_username" value="user" /></li>
				<li><label for="password">password :</label><input type="password" name="j_password" id="j_password" value="user001"/></li>
				<li><input type="submit" value="Submit">
					<a href="javascript:fncSubmit()">
					<span class="button default icon">
						<span class="login">&nbsp;</span>
						<span class="none_a txt_num5 align_center">Login</span>
					</span>
					</a>
				</li>
			</ul>
			<div class="clear"></div>
		</div>
		</form>
		</div>
	</div>
	<hr />
<%@ include file="/sample/common/bottom.jsp"%>
