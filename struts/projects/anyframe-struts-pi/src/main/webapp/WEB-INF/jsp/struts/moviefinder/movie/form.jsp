<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@ include file="/sample/common/top.jsp"%>
		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/strutsMovie.action?method=list'/>">Struts 1.0.4-SNAPSHOT</a></div>
    </div>
    <hr />
<script type="text/javascript" src="<c:url value='/sample/javascript/InputCalendar.js'/>"></script>
<script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>   
<script type="text/javascript">
	function fncCreateMovie() {
		if (FormValidation(document.movieForm) != false) {
			document.movieForm.action = "<c:url value='/strutsMovie.action?method=create'/>";
			document.movieForm.submit();
		}
	}

	function fncUpdateMovie() {
		if (FormValidation(document.movieForm) != false) {
			document.movieForm.action = "<c:url value='/strutsMovie.action?method=update'/>";
			document.movieForm.submit();
		}
	}

	function fncRemoveMovie() {
		if (confirmDelete('movie')) {
			document.movieForm.action = "<c:url value='/strutsMovie.action?method=remove'/>";
			document.movieForm.submit();
		}
	}
	</script>    
    <div id="container">
    	<div class="cont_top">
        	<h2>
        		<c:if test="${empty movieForm.movieId}">
				 	<bean:message key='movie.add'/>
				 	<c:set var="readonly" value="false"/>
				</c:if>
			
				<c:if test="${not empty movieForm.movieId}">	
					<bean:message key='movie.update'/>
					<c:set var="readonly" value="true"/>				 
				</c:if>
			</h2>
        </div>
        <div class="view">
        <html:form method="post" action="/strutsMovie.action">
        <c:if test="${not empty movieForm.movieId}">
			<html:hidden property="movieId" />
		</c:if>
      		<table summary="This table shows detail information about genre, title, director, actors, runtime, release date, ticket price of the movie">
            	<caption>Detail information</caption>
                <colgroup>
                	<col style="width:20%;" />
                    <col style="width:80%;" />
                </colgroup>
                <tbody>
                	<tr>
                    	<th><label for="title"><bean:message key="movie.title" />&nbsp;*</label></th>
                        <td><html:text property="title" styleClass="w_normal" /><html:errors property="title" /></td>
                    </tr>
                    <tr>
                    	<th><label for="director"><bean:message key="movie.director" />&nbsp;*</label></th>
                        <td>
                        <html:text property="director" styleClass="w_normal" /><html:errors property="director" /></td>
                    </tr>
                    <tr>
                    	<th><label for="genre"><bean:message key="movie.genre" />&nbsp;*</label></th>
                        <td>
                        	<html:select property="genre.genreId">
								<c:forEach var="genre" items="${genreList}">
									<html:option value="${genre.genreId}">${genre.name}</html:option>
								</c:forEach>
							</html:select>
          				</td>
                    </tr>
                    <tr>
                    	<th><label for="actors"><bean:message key="movie.actors" />&nbsp;*</label></th>
                        <td><html:text property="actors" styleClass="w_normal" /><html:errors property="actors" /></td>
                    </tr>
                    <tr>
                    	<th><label for="runtime"><bean:message key="movie.runtime" /></label></th>
                        <td><html:text property="runtime" styleClass="w_time" /> min.<html:errors property="runtime" /></td>
                    </tr>
                    <tr>
                    	<th><label for="releaseDate"><bean:message key="movie.releaseDate" /></label></th>
                        <td>
                        <html:text property="releaseDate" styleClass="w_date" />
							<a href="javascript:popUpCalendar(document.movieForm.releaseDate, '-');">
								<img id="calendar" src="<c:url value='/sample/images/btn_calendar_i.gif'/>" alt="Calendar" />
							</a>
						<html:errors property="releaseDate" /></td>
                    </tr>
                    <tr>
                    	<th><label for="ticketPrice"><bean:message key="movie.ticketPrice" /></label></th>
                        <td><html:text property="ticketPrice" styleClass="w_price" /><html:errors property="ticketPrice" /></td>
                    </tr>
                    <tr>
                    	<th><label for="nowPlaying"><bean:message key="movie.nowPlaying" /></label></th>
                        <td><span class="float_left"><bean:message key="movie.isNowPlaying" /></span>
                        <span class="float_left margin_left5">
                        	<html:checkbox property="nowPlaying" value="Y" />
                       	</span></td>
                    </tr>
                </tbody>
            </table>
            </html:form>
        </div>
        <div class="btncontainer_center">
		    <a href="<c:url value='/strutsMovie.action?method=list'/>">
		    <span class="button default icon">
		        <span class="list">&nbsp;</span>
		        <span class="none_a txt_num4"><bean:message key="movie.button.list" /></span>
		    </span>
		    </a>                
	        <c:if test="${empty movieForm.movieId}">
			    <a href="javascript:fncCreateMovie();">
			    <span class="button default icon">
			        <span class="add">&nbsp;</span>
			        <span class="none_a txt_num3"><bean:message key="movie.button.add" /></span>
			    </span>
			    </a>	        
	        </c:if>
	        <c:if test="${not empty movieForm.movieId}">
			    <a href="javascript:fncUpdateMovie();">
			    <span class="button default icon">
			        <span class="update">&nbsp;</span>
			        <span class="none_a txt_num6"><bean:message key="movie.button.update" /></span>
			    </span>
			    </a> 
			    <a href="javascript:fncRemoveMovie();">
			    <span class="button default icon">
			        <span class="delete">&nbsp;</span>
			        <span class="none_a txt_num6"><bean:message key="movie.button.remove" /></span>
			    </span>
			    </a> 	        
	        </c:if>
    	</div>
	</div>
    <hr />
<%@ include file="/sample/common/bottom.jsp"%>
