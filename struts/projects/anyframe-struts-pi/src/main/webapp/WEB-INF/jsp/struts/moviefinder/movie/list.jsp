<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@ include file="/sample/common/top.jsp"%>
		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/strutsMovie.action?method=list'/>">Struts 1.0.4-SNAPSHOT</a></div>
    </div>
    <hr />
<script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>    
<script type="text/javascript">
		function fncCreateMovieView() {
			document.location.href="<c:url value='/strutsMovie.action?method=createView'/>";
		}	
		function fncSearchMovie() {
		   	document.movieForm.submit();						
		}		
</script>
 	<div id="container">
 	<html:form method="post" action="/strutsMovie.action?method=list">
   	<div class="cont_top">
       	<h2><bean:message key="movieList.title"/></h2>
     		<div class="search_list">
               <fieldset>
                   <legend>Search</legend>
                   <label for="title" class="float_left margin_right5"><bean:message key="movie.title"/>: <html:text property="title" value="${movieForm.title}"/></label>
                   <label for="nowPlaying" class="float_left margin_right5"><bean:message key="movie.nowPlaying"/> :
                   <html:select property="nowPlaying" styleClass="w_search">
						<html:option value="Y" >Playing</html:option>
						<html:option value="N">Not playing</html:option>
					</html:select>
                   </label>
                   <label for="btnSearch" class="float_left">
                   	<input type="image" id="btnSearch" name="searchBtn" alt="Search" src="<c:url value='/sample/images/btn_search_i.gif'/>"/>
                   </label>
               </fieldset>
           </div>
     	</div>
       <div class="list">
     		<table summary="This is list of movie">
           	<caption>Movie List</caption>
               <colgroup>
               	<col style="width:12%;" />
                   <col style="width:20%;" />
                   <col style="width:20%;" />
                   <col style="width:20%;" />
                   <col style="width:14%;" />
                   <col style="width:14%;" />
               </colgroup>
               <thead>
                   <tr>
                   	<th><bean:message key="movie.genre" /></th>
                       <th><bean:message key="movie.title" /></th>
                       <th><bean:message key="movie.director" /></th>
                       <th><bean:message key="movie.actors" /></th>
                       <th><bean:message key="movie.ticketPrice" /></th>
                       <th><bean:message key="movie.releaseDate" /></th>
                   </tr>
               </thead>
               <tbody>
               	<c:forEach var="movie" items="${movies}">
                	<tr>
                    	<td>${movie.genre.name}</td>
                        <td><a class="linkClass" href="${ctx}/strutsMovie.action?method=get&amp;movieId=${movie.movieId}">${movie.title}</a></td>
                        <td>${movie.director}</td>
                        <td>${movie.actors}</td>
                        <td class="align_center">${movie.ticketPrice}</td>
                        <td class="align_center">${movie.releaseDate}</td>
                    </tr>
                   </c:forEach>
               </tbody>
           </table>
       </div>
       <div class="listunder_container">           
           <div class="list_paging">
               <anyframe:pagenavigator linkUrl="javascript:fncSearchMovie();" pages="${resultPage}"/>
           </div>
           <div class="list_underbtn_right">
                <a href="javascript:fncCreateMovieView();">
                <span class="button default icon">   
                    <span class="add">&nbsp;</span>
                    <span class="none_a txt_num3"><spring:message code="movie.button.add" /></span>
                </span>
                </a>                
            </div>
       </div>
       </html:form>
</div>
   <hr />
<%@ include file="/sample/common/bottom.jsp"%>