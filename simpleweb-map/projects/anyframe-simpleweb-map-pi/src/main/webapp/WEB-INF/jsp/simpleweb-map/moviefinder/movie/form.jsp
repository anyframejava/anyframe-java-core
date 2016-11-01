<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="/sample/common/taglibs.jsp"%>
<%@ taglib uri="http://www.anyframejava.org/tags/simpleweb" prefix="simpleweb" %>

<div id="popupWindow">
	<div id="container">
		<div class="cont_top">
	    	<h2>
	    		<c:if test="${empty result.map.movieId}">
				 	<spring:message code='movie.add'/>
				 	<c:set var="readonly" value="false"/>
				</c:if>
	
				<c:if test="${not empty result.map.movieId}">	
					<spring:message code='movie.update'/>
					<c:set var="readonly" value="true"/>				 
				</c:if>
				</h2>
	     </div>
	     
		<div class="view">
		  <form:form modelAttribute="result" method="post" action="/simplemap.do" id="movieForm" name="movieForm" enctype="multipart/form-data">
		    <div id="hiddenDivPopup"></div>
		    <c:if test="${not empty result.map.movieId}">
			<form:hidden path="map[movieId]" />
			</c:if>
			<table summary="This table shows detail information about genre, title, director, actors, runtime, release date, ticket price of the movie">
			    	<caption>Detail information</caption>
			        <colgroup>
			        	<col style="width:20%;" />
			            <col style="width:80%;" />
			        </colgroup>
			        <tbody>
			        	<tr>
			            	<th><label for="title"><spring:message code="movie.title" />&nbsp;*</label></th>
			                <td>
			                	<form:input id="title" path="map[title]" cssClass="ct_input_g" cssErrorClass="text medium error" size="40" maxlength="50" />
								<simpleweb:validate id="title" required="true" promptMessage="Enter movie Title." />  
			                </td>
			            </tr>
			            <tr>
			            	<th><label for="director"><spring:message code="movie.director" />&nbsp;*</label></th>
			                <td>
			                	<form:input id="director" path="map[director]" cssClass="ct_input_g" cssErrorClass="text medium error" size="40" maxlength="50" />
								<simpleweb:validate id="director" required="true" /> 
			                </td>
			            </tr>
			            <tr>
			            	<th><label for="genre"><spring:message code="movie.genre" />&nbsp;*</label></th>
			                <td>
			                	<form:select id="genreId" path="map[genreId]">
			    					<form:options items="${genreList}"/>
			      				</form:select>
			  				</td>
			            </tr>
			            <tr>
			            	<th><label for="actors"><spring:message code="movie.actors" />&nbsp;*</label></th>
			                <td>
			                	<form:input id="actors" path="map[actors]" cssClass="ct_input_g" cssErrorClass="text medium error" size="60" maxlength="50" /></td>
								<simpleweb:validate id="actors" required="true" promptMessage="Enter Actors." />
			                </td>
			            </tr>
			            <tr>
			            	<th><label for="runtime"><spring:message code="movie.runtime" /></label></th>
			                <td>
			                	<form:input id="runtime" path="map[runtime]" cssClass="ct_input_g" cssErrorClass="text medium error" size="10" maxlength="3" /> min.
								<simpleweb:validate id="runtime" type="Number" />
			                </td>
			            </tr>
			            <tr>
			            	<th><label for="releaseDate"><spring:message code="movie.releaseDate" /></label></th>
			                <td>
			                	<form:input id="releaseDate" path="map[releaseDate]" cssClass="ct_input_g" cssErrorClass="text medium error" maxlength="10" />
								<c:if test="${empty result.map.movieId}">
									<simpleweb:validate id="releaseDate" type="Date" value="currentDate"/>
								</c:if>
								<c:if test="${not empty result.map.movieId}">
									<simpleweb:validate id="releaseDate" type="Date"/>
								</c:if>
			                </td>
			            </tr>
			            <tr>
			            	<th><label for="ticketPrice"><spring:message code="movie.ticketPrice" /></label></th>
			                <td>
			                	<form:input id="ticketPrice" path="map[ticketPrice]" cssClass="ct_input_g" cssErrorClass="text medium error" maxlength="4" />
								<simpleweb:validate id="ticketPrice" type="Number" />
			                </td>
			            </tr>
			            <tr>
			            	<th><label for="nowPlaying"><spring:message code="movie.nowPlaying" /></label></th>
			                <td><span class="float_left"><spring:message code="movie.isNowPlaying" /></span>
			                <span class="float_left margin_left5"><form:checkbox id="nowPlaying" path="map[nowPlaying]" value="Y" /></span>
			                <simpleweb:validate id="nowPlaying" type="CheckBox" checked="${result.map.nowPlaying != null &&  result.map.nowPlaying == 'N' ? false : true}"/>
			                </td>
			            </tr>
			        </tbody>
			    </table>
		
			    <div class="btncontainer_center">
			    <c:if test="${empty result.map.movieId}">
			        <simpleweb:submit id="addlink" form="movieForm" action="/simplemap.do" service="simplewebMapMovieService.create(map)" forward="simplewebMapMovieFinder.getPagingList(map)" layout="mapLayout" tiles="body:/WEB-INF/jsp/simpleweb-map/moviefinder/movie/list.jsp" render="partial" jsValidate="true">
					<simpleweb:setProperty name="title">
						<span class="button default icon">
			                   <span class="add">&nbsp;</span>
			                   <p class="none_a"><spring:message code="movie.button.add" /></p>
			               </span>
					</simpleweb:setProperty> 
				    <simpleweb:setProperty name="hiddenDiv" value="hiddenDivPopup" />	
				    <simpleweb:doublesubmit formName="movieForm" isSessionForm="true"/>
				</simpleweb:submit>
			    </c:if>
			    <c:if test="${not empty result.map.movieId}">
					<simpleweb:submit id="updatelink" form="movieForm" action="/simplemap.do" service="simplewebMapMovieService.update(map)" forward="simplewebMapMovieFinder.getPagingList(map)" layout="mapLayout" tiles="body:/WEB-INF/jsp/simpleweb-map/moviefinder/movie/list.jsp" render="partial" jsValidate="true">
						<simpleweb:setProperty name="title">
							<span class="button default icon">
			                    <span class="update">&nbsp;</span>
			                    <p class="none_a"><spring:message code="movie.button.update" /></p>
			                </span>
						</simpleweb:setProperty> 
						<simpleweb:setProperty name="hiddenDiv" value="hiddenDivPopup" />
					</simpleweb:submit>		
					<simpleweb:submit id="deletelink" form="movieForm" action="/simplemap.do" service="simplewebMapMovieService.remove(map)" forward="simplewebMapMovieFinder.getPagingList(map)" layout="mapLayout" tiles="body:/WEB-INF/jsp/simpleweb-map/moviefinder/movie/list.jsp" render="partial" jsValidate="true">
						<simpleweb:setProperty name="title">
							<span class="button default icon">
			                    <span class="delete">&nbsp;</span>
			                    <p class="none_a"><spring:message code="movie.button.remove" /></p>
			                </span>
						</simpleweb:setProperty> 
						<simpleweb:setProperty name="hiddenDiv" value="hiddenDivPopup" />
						<simpleweb:setProperty name="javascript">if(confirmDelete('movie'))</simpleweb:setProperty>	    
					</simpleweb:submit>
			    </c:if>
			   	</div>
		    </form:form>
	    </div>
    </div>
</div>