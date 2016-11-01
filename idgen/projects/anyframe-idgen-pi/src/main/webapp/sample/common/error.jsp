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
    			<c:if test="${not empty exception.message}">
		        	<c:choose>
						<c:when test="${exception.message == 'Occurred Error'}">
							<spring:message code='${exception.cause.message}'/> 
						</c:when>
						<c:otherwise>
							<spring:message code='${exception.message}'/> 
						</c:otherwise>
					</c:choose>
				</c:if>
				<c:if test="${empty exception.message}">Occurred Error</c:if>
			</p>
        </div>
	</div>
    <hr />
<%@ include file="bottom.jsp"%>

