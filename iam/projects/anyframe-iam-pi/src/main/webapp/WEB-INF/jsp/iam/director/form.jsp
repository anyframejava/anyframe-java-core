<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/iamListDirector.do'/>">IAM 1.0.4-SNAPSHOT</a></div>
    </div>
    <hr />
<script type="text/javascript" src="<c:url value='/sample/javascript/InputCalendar.js'/>"></script>
<script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>   
<script type="text/javascript">
	function fncUpdateDirector() {
	    document.directorForm.action="<c:url value='/iamUpdateDirector.do'/>";
	    document.directorForm.submit();
	}
	</script>    
    <div id="container">
    	<div class="cont_top">
        	<h2>
        		<c:if test="${not empty director.directorId}">	
					Update Director Information
				<c:set var="readonly" value="true"/>				 
				</c:if>	
			</h2>
        </div>
        <div class="view">
        <form:form modelAttribute="director" name="directorForm" method="post">
        <c:if test="${not empty movie.movieId}">
			<form:hidden path="movieId" />
		</c:if>
      		<table summary="This table shows detail information about Director">
            	<caption>Detail information</caption>
                <colgroup>
                	<col style="width:20%;" />
                    <col style="width:80%;" />
                </colgroup>
                <tbody>
                	<tr>
                    	<th><label for="directorId">Director Id&nbsp;*</label></th>
                        <td><form:input path="directorId" cssClass="w_normal" readonly="${readonly}" /><form:errors path="directorId" cssClass="errors" /></td>
                    </tr>
                    <tr>
                    	<th><label for="name">Director Name&nbsp;*</label></th>
                        <td><form:input path="name" cssClass="w_normal" /><form:errors path="name" cssClass="errors" /></td>
                    </tr>
                     <tr>
                    	<th><label for="movies">Movies</label></th>
                        <td><form:input path="movies" cssClass="w_normal" /><form:errors path="movies" cssClass="errors" /></td>
                    </tr>
                </tbody>
            </table>
            </form:form>
        </div>
        <div class="btncontainer_center">
		    <a href="javascript:fncUpdateDirector();">
		    <span class="button default icon">
		        <span class="update">&nbsp;</span>
		        <span class="none_a txt_num6"><spring:message code="movie.button.update" /></span>
		    </span>
		    </a>    
    	</div>
	</div>
    <hr />
<%@ include file="/sample/common/bottom.jsp"%>
