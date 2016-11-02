<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/coreMovieFinder.do?method=list'/>">Core 1.5.1</a></div>
    </div>
    <hr />
<script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>    
<script type="text/javascript">
	function fncCreateMovieView() {
		document.location.href="<c:url value='/coreMovie.do?method=createView'/>";
	}	
	function fncSearchMovie() {
	   	document.searchForm.action="<c:url value='/coreMovieFinder.do?method=list'/>";
	   	document.searchForm.submit();						
	}		
</script>
  	<div id="container">
  	<form:form modelAttribute="movie" method="post" name="searchForm">
    	<div class="cont_top">
        	<h2><spring:message code='movie.heading'/></h2>
      		<div class="search_list">
                <fieldset>
                    <legend>Search</legend>
                    <label for="title" class="float_left margin_right5"><spring:message code="movie.title"/>: <form:input path="title" cssClass="w_search" /></label>
                    <label for="nowPlaying" class="float_left margin_right5"><spring:message code="movie.nowPlaying" />: 
                    <form:select path="nowPlaying" id="nowPlaying" cssClass="w_search" >
                    	<form:option value="Y">Playing</form:option>
						<form:option value="N">Not playing</form:option>
                    </form:select>
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
                    	<th><spring:message code="movie.genre" /></th>
                        <th><spring:message code="movie.title" /></th>
                        <th><spring:message code="movie.director" /></th>
                        <th><spring:message code="movie.actors" /></th>
                        <th><spring:message code="movie.ticketPrice" /></th>
                        <th><spring:message code="movie.releaseDate" /></th>
                    </tr>
                </thead>
                <tbody>
                	<c:forEach var="movie" items="${movies}">
	                	<tr>
	                    	<td>${movie.genre.name}</td>
	                        <td><a class="linkClass" href="${ctx}/coreMovie.do?method=get&amp;movieId=${movie.movieId}">${movie.title}</a></td>
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
        </form:form>
	</div>
    <hr />
<%@ include file="/sample/common/bottom.jsp"%>