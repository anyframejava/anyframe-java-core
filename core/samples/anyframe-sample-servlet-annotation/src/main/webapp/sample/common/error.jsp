<%@ page isErrorPage="true"%>
<%@ page contentType="text/html; charset=utf-8"%>
<%@ include file="top.jsp"%>
	</div>
    <hr />
    <div id="container">
    	<div class="cont_top">
        	<h2>Fail Message</h2>
        </div>
    	<div class="failmessagebox">
    		<p>
    			<c:if test="${not empty errorMessage}">${errorMessage}</c:if>
				<c:if test="${empty errorMessage}">An error occurred</c:if>
			</p>
        </div>
	</div>
    <hr />
<%@ include file="bottom.jsp"%>

