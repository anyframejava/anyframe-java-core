<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/loginView.do'/>">Login 1.0.2</a></div>
    </div>
    <hr />
<script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>    
<script type="text/javascript">
<!--
function fncSubmit() {
	var id = document.getElementsByName("id")[0];
	var password = document.getElementsByName("password")[0];
	if ( id.value.length < 6 ){
		alert("invalid id");
		return;
	}
	if ( password.value.length < 8 ){
		alert("invalid password");
		return;
	}
	document.loginForm.action="<c:url value='login.do'/>";
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
             <div class="list">
                <table summary="Local, ID, Password로 구성된 리스트 입니다.">
                    <caption>User리스트</caption>
                    <colgroup>
                        <col style="width:30%;" />
                        <col style="width:35%;" />
                        <col style="width:35%;" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>Local</th>
                            <th>ID</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><img src="<c:url value='/sample/images/img_flag_ko.gif'/>" alt="한국 국기" /></td>
                            <td>anyframe_ko</td>
                            <td>anyframe0</td>
                        </tr>
                        <tr>
                            <td><img src="<c:url value='/sample/images/img_flag_en.gif'/>" alt="미국 국기" /></td>
                            <td>anyframe_en</td>
                            <td>anyframe1</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>
       </div>
    <hr />
<%@ include file="/sample/common/bottom.jsp"%>