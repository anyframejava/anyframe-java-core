<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/cacheGenre.do?method=list'/>">Cache 1.0.3</a></div>
    </div>
    <hr />
<script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>    
<script type="text/javascript">
		function fncCreateGenreView() {
			document.location.href="<c:url value='/cacheGenre.do?method=createView'/>";
		}	
		function fncSearchGenre() {
		   	document.searchForm.action="<c:url value='/cacheGenre.do?method=list'/>";
		   	document.searchForm.submit();						
		}		
</script>
 	<div id="container">
 	<form:form modelAttribute="genre" method="post" name="searchForm">
   	<div class="cont_top">
       	<h2><spring:message code='genre.heading'/></h2>
     </div>
     <div class="list">
      		<table summary="This is list of Genre">
            	<caption>Genre List</caption>
                <colgroup>
                    <col style="width:20%;" />
                    <col style="width:20%;" />
                </colgroup>
                <thead>
                    <tr>
                    	<th><spring:message code="genre.id" /></th>
                        <th><spring:message code="genre.name" /></th>
                    </tr>
                </thead>
                <tbody>
                	<c:forEach var="genre" items="${genres}">
	                	<tr>
	                        <td><a class="linkClass" href="${ctx}/cacheGenre.do?method=get&amp;genreId=${genre.genreId}">${genre.genreId}</a></td>
	                        <td align="left">${genre.name}</td>
	                    </tr>
                    </c:forEach>
                </tbody>
            </table>
        </div>
        <br/>
		<div class="listunder_container">           
			<div class="list_underbtn_right">
	             <a href="javascript:fncCreateGenreView();">
	             <span class="button default icon">   
	                 <span class="add">&nbsp;</span>
	                 <span class="none_a txt_num3"><spring:message code="movie.button.add" /></span>
	             </span>
	             </a>                
	         </div>		
		</div>
	</form:form>
	</div>
    <hr />
<%@ include file="/sample/common/bottom.jsp"%>