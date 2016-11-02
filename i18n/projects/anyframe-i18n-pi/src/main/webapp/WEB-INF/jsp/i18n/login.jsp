<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/i18nLoginView.do'/>">I18N 1.0.5-SNAPSHOT</a></div>
    </div>
    <hr />
<script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>    
<script type="text/javascript">
<!--
function fncSubmit() {
	var id = document.getElementsByName("id")[0];
	var password = document.getElementsByName("password")[0];
	if ( id.value.length < 4 ){
		alert("invalid id");
		return;
	}
	if ( password.value.length < 8 ){
		alert("invalid password");
		return;
	}
	document.loginForm.action="<c:url value='i18nLogin.do'/>";
	document.loginForm.submit();
}

function fncChangeLocale(arg) {
	document.location.href="<c:url value='i18nLoginView.do?locale='/>"+arg;
}
-->
</script>
 	<div id="container">
 	 	<div style="top:2px;margin:5px 0;right:34%;" class="list_underbtn_right">
        	<a href="javascript:fncChangeLocale('ko_KR');"><img src="<c:url value='/sample/images/img_flag_ko.gif'/>" alt="한국 국기" /></a>
			<a href="javascript:fncChangeLocale('en_US');"><img src="<c:url value='/sample/images/img_flag_en.gif'/>" alt="미국 국기" /></a>
		</div> 	
    	<div class="login">
    	<form name="loginForm" method="post" action="<c:url value='i18n.do'/>">
    	<div class="loginform">
                <ul>
                    <li><label for="id"><spring:message code="i18n.id"/> :</label><input type="text" name="id" id="id" value="user" /></li>
                    <li><label for="password"><spring:message code="i18n.password"/> :</label><input type="password" name="password" id="password" value="anyframe"/></li>
                    <li>
					    <a href="javascript:fncSubmit()">
					    <span class="button default icon">
					        <span class="login">&nbsp;</span>
					        <span class="none_a txt_num5 align_center"><spring:message code="i18n.login"/></span>
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