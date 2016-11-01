<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/movieFinder.do'/>">Serlvet 3.0 annotation Example</a></div>
    </div>
    <hr />
<script type="text/javascript" src="<c:url value='/sample/javascript/InputCalendar.js'/>"></script>
<script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>   
<script type="text/javascript">
function fncCreateMovie() {
    document.movieForm.action="<c:url value='/movie.do?method=create'/>";
    document.movieForm.submit();
}

function fncUpdateMovie() {
    document.movieForm.action="<c:url value='/movie.do?method=update'/>";
    document.movieForm.submit();
}

function fncRemoveMovie(){	
	if(confirmDelete('movie')) {
	    document.movieForm.action="<c:url value='/movie.do?method=remove'/>";
	    document.movieForm.submit();
	}	    
}	
</script>    
   <div id="container">
   	<div class="cont_top">
       	<h2>
       		<c:if test="${empty movie.movieId}">
		 	<spring:message code='movie.add'/>
		 	<c:set var="readonly" value="false"/>
		</c:if>
	
		<c:if test="${not empty movie.movieId}">	
			<spring:message code='movie.update'/>
			<c:set var="readonly" value="true"/>				 
		</c:if>
	</h2>
      </div>
      <div class="view">
      <form:form modelAttribute="movie" name="movieForm" method="post">
      <c:if test="${not empty movie.movieId}">
	<form:hidden path="movieId" />
</c:if>
    		<table summary="This table shows detail information about genre, title, director, actors, runtime, release date, ticket price of the movie">
          	<caption>Detail information</caption>
              <colgroup>
              	<col style="width:20%;" />
                  <col style="width:80%;" />
              </colgroup>
              <tbody>
              	<tr>
                  	<th><label for="title">TITLE&nbsp;*</label></th>
						<td>${movie.title}</td>
                  </tr>
                  <tr>
                  	<th><label for="director">DIRECTOR&nbsp;*</label></th>
                  		<td>${movie.director}</td>
                  </tr>
                  <tr>
                  	<th><label for="genre">GENRE&nbsp;*</label></th>
						<td>${movie.genre.name}</td>
                  </tr>
                  <tr>
                  	<th><label for="actors">ACTORS&nbsp;*</label></th>
                        <td>${movie.actors}</td>
                  </tr>
                  <tr>
                  	<th><label for="runtime">RUNTIME</label></th>
                      <td>${movie.runtime} min.</td>
                  </tr>
                  <tr>
                  	<th><label for="runtime">TICKET PRICE</label></th>
                      <td>${movie.ticketPrice} won</td>
                  </tr>
                  <tr>
                  	<th><label for="nowPlaying">NOW PLAYING</label></th>
                  		<td>${movie.nowPlaying}</td>
                  </tr>
              </tbody>
          </table>
          </form:form>
      </div>
      <div class="btncontainer_center">
	    <a href="<c:url value='/movieFinder.do'/>">
	    <span class="button default icon">
	        <span class="list">&nbsp;</span>
	        <span class="none_a txt_num4">List</span>
	    </span>
	    </a>        
   	</div>
</div>
   <hr />
<%@ include file="/sample/common/bottom.jsp"%>