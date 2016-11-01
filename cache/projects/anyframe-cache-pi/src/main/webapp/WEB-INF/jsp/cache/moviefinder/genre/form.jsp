<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/cacheGenre.do?method=list'/>">Cache 1.0.5</a></div>
    </div>
    <hr />
<script type="text/javascript" src="<c:url value='/sample/javascript/InputCalendar.js'/>"></script>
<script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>   
<script type="text/javascript">
	function fncCreateGenre() {
	    document.genreForm.action="<c:url value='/cacheGenre.do?method=create'/>";
	    document.genreForm.submit();
	}
	
	function fncUpdateGenre() {
	    document.genreForm.action="<c:url value='/cacheGenre.do?method=update'/>";
	    document.genreForm.submit();
	}
	
	function fncRemoveGenre(){	
		if(confirmDelete('genre')) {
		    document.genreForm.action="<c:url value='/cacheGenre.do?method=remove'/>";
		    document.genreForm.submit();
		}	    
	}	
	</script>    
    <div id="container">
    	<div class="cont_top">
        	<h2>
				<c:if test="${empty genre.genreId}">
					Add Genre Information
				<c:set var="readonly" value="false"/>
				</c:if>
				
				<c:if test="${not empty genre.genreId}">	
					Update Genre Information
				<c:set var="readonly" value="true"/>				 
				</c:if>	
			</h2>
        </div>
 <div class="view">
    <form:form modelAttribute="genre" name="genreForm" method="post">
	<table summary="This table shows detail information about genre, title, director, actors, runtime, release date, ticket price of the movie">
            	<caption>Detail information</caption>
                <colgroup>
                	<col style="width:20%;" />
                    <col style="width:80%;" />
                </colgroup>
                <tbody>
                <c:if test="${readonly}">
                	<tr>
                	<th><label for="genreId"><spring:message code="genre.id" />&nbsp;*</label></th>
                        <td><form:input path="genreId" cssClass="w_normal" readonly="${readonly}" /><form:errors path="genreId" cssClass="errors" /></td>
                    </tr>
				</c:if>
					<tr>
                    	<th><label for="name"><spring:message code="genre.name" />&nbsp;*</label></th>
                        <td><form:input path="name" cssClass="w_normal" /><form:errors path="name" cssClass="errors" /></td>
                    </tr>
				</tbody>
				
           </table>
           </form:form>
        </div>
		<div class="btncontainer_center">
		
	    <a href="<c:url value='/cacheGenre.do?method=list'/>">
	    <span class="button default icon">
	        <span class="list">&nbsp;</span>
	        <span class="none_a txt_num4"><spring:message code="movie.button.list" /></span>
	    </span>
	    </a>   		
       <c:if test="${empty genre.genreId}">
		    <a href="javascript:fncCreateGenre();">
		    <span class="button default icon">
		        <span class="add">&nbsp;</span>
		        <span class="none_a txt_num3"><spring:message code="movie.button.add" /></span>
		    </span>
		    </a>          
        </c:if>
        <c:if test="${not empty genre.genreId}">
        	<a href="javascript:fncUpdateGenre();">
		    <span class="button default icon">
		        <span class="update">&nbsp;</span>
		        <span class="none_a txt_num6"><spring:message code="movie.button.update" /></span>
		    </span>
		    </a> 
		    <a href="javascript:fncRemoveGenre();">
		    <span class="button default icon">
		        <span class="delete">&nbsp;</span>
		        <span class="none_a txt_num6"><spring:message code="movie.button.remove" /></span>
		    </span>
		    </a> 
        </c:if>
    	</div>
	</div>
    <hr />
<%@ include file="/sample/common/bottom.jsp"%>