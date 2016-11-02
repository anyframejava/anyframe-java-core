<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='webflowMovieFinder.do?method=list'/>">Webflow 1.0.3-SNAPSHOT</a></div>
    </div>
    <hr />
<script type="text/javascript" src="<c:url value='/sample/javascript/InputCalendar.js'/>"></script>
<script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>   
<script type="text/javascript">
	function fncCreateMovie() {
		if(FormValidation(document.movieForm) != false) {
			document.movieForm._eventId.value="create";	
		    document.movieForm.submit();
		} 
	}

	function fncRevise() {
		if(FormValidation(document.movieForm) != false) {
			document.movieForm._eventId.value="revise";	
		    document.movieForm.submit();
		} 
	}
	
	function fncUpdateMovie() {
		if(FormValidation(document.movieForm) != false) {
			document.movieForm._eventId.value="confirm";
			document.movieForm.submit();
		} 
	}
	
	</script>   
	 <div id="container">
    	<div class="cont_top">
        	<h2>
        		<spring:message code='movie.review'/>
			</h2>
        </div>
        <div class="view">
        	<form:form modelAttribute="movie" name="movieForm" method="post">
        	<input type="hidden" name="_eventId"/>
	        <c:if test="${not empty movie.movieId}">
				<form:hidden path="movieId" />
			</c:if>
      		<table summary="This table shows detail information about genre, title, director, actors, runtime, release date, ticket price of the movie">
            	<caption>review information</caption>
                <colgroup>
                	<col style="width:20%;" />
                    <col style="width:80%;" />
                </colgroup>
                <tbody>
                	<tr>
                    	<th>Title *</th>
                        <td>${movie.title}</td>
                    </tr>
                    <tr>
                    	<th>Director *</th>
                        <td>${movie.director}</td>
                    </tr>
                    <tr>
                    	<th><label for="cc">Genre *</label></th>
                        <td><form:select path="genre.genreId" disabled="true">
				              <form:options items="${genreList}" itemValue="genreId" itemLabel="name"/>
				          	</form:select></td>
                    </tr>
                    <tr>
                    	<th>Actors *</th>
                        <td>${movie.actors}</td>
                    </tr>
                    <tr>
                    	<th>Runtime</th>
                        <td>${movie.runtime}</td>
                    </tr>
                    <tr>
                    	<th>Release Date</th>
                        <td>${movie.releaseDate}</td>
                    </tr>
                    <tr>
                    	<th>Ticket Price</th>
                        <td>${movie.ticketPrice}</td>
                    </tr>
                    <tr>
                    	<th>Now Playing</th>
                        <td>Is this movie now playing? ${movie.nowPlaying}</td>
                    </tr>
                </tbody>
            </table>
            </form:form>
        </div>
        <div class="btncontainer_center">
		    <a href="<c:url value='javascript:fncRevise();'/>">
		    <span class="button default icon">
		        <span class="back">&nbsp;</span>
		        <span class="none_a txt_num4"><spring:message code="movie.button.back" /></span>
		    </span>
		    </a>  
	        <c:if test="${empty movie.movieId}">
			    <a id="createlink" href="javascript:fncCreateMovie();">
			    <span class="button default icon">
			        <span class="add">&nbsp;</span>
			        <span class="none_a txt_num3"><spring:message code="movie.button.add" /></span>
			    </span>
			    </a>  
	        </c:if>
	        <c:if test="${not empty movie.movieId}">
			    <a id="updatelink" href="javascript:fncUpdateMovie();">
			    <span class="button default icon">
			        <span class="update">&nbsp;</span>
			        <span class="none_a txt_num6"><spring:message code="movie.button.update" /></span>
			    </span>
			    </a> 	        
	        </c:if>
    	</div>
    </div>
    <hr />
<%@ include file="/sample/common/bottom.jsp"%>
