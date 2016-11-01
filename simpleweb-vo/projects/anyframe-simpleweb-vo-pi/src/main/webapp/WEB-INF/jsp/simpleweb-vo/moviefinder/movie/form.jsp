<%@ include file="/sample/common/taglibs.jsp"%>
<%@ taglib uri="http://www.anyframejava.org/tags/simpleweb" prefix="simpleweb" %>
<div id="popupWindow"  style="width:450px; height:410px;">
<!--************************** begin of contents *****************************-->
<!-- begin of title -->
<table width="100%" height="24" border="0" cellpadding="0" cellspacing="0">
	<tr>
		<td background="<spring:url value='/sample/images/ct_ttl_img02.gif'/>" width="100%" >
		<table width="100%" height="24" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td height="24" class="ct_ttl01" style="padding-left: 12px"><c:if test="${empty movie.movieId}">Add</c:if> Movie Information</td>
			</tr>
		</table>  
		</td>
	</tr>
</table>
<form:form modelAttribute="movie" method="post" action="/simple.do" id="movieForm" name="movieForm" enctype="multipart/form-data">
	<div id="hiddenDivPopup"></div>
	<table width="100%" border="0" cellspacing="0" cellpadding="0" >
		<c:if test="${not empty movie.movieId}">
			<form:hidden path="movieId" />
		</c:if>
		
		<tr>
			<td width="150" class="ct_td"><spring:message code="movie.title" />&nbsp;*</td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">
			<form:input path="title" cssClass="ct_input_g" cssErrorClass="text medium error" size="40" maxlength="50" />
			<simpleweb:validate id="title" required="true" promptMessage="Enter movie Title." /> 
			</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><spring:message code="movie.director" />&nbsp;*</td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01"><form:input path="director" cssClass="ct_input_g" cssErrorClass="text medium error" size="40" maxlength="50" />
			<simpleweb:validate id="director" required="true" /> 
			</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><spring:message code="movie.genre" />&nbsp;*</td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">
			<form:select path="genre.genreId">
              <form:options items="${genreList}" itemValue="genreId" itemLabel="name"/>
           </form:select>
			</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><spring:message code="movie.actors" />&nbsp;*</td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">
			<form:input path="actors" cssClass="ct_input_g" cssErrorClass="text medium error" size="60" maxlength="50" /></td>
			<simpleweb:validate id="actors" required="true" promptMessage="Enter Actors." />
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><spring:message code="movie.runtime" /></td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">
			<form:input path="runtime" cssClass="ct_input_g" cssErrorClass="text medium error" size="10" maxlength="3" /> min.
			<simpleweb:validate id="runtime" type="Number" />
			</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><spring:message code="movie.releaseDate" /></td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">
				<form:input path="releaseDate" cssClass="ct_input_g" cssErrorClass="text medium error" maxlength="10" />
				<c:if test="${empty movie.movieId}">
					<simpleweb:validate id="releaseDate" type="Date" value="currentDate"/>
				</c:if>
				<c:if test="${not empty movie.movieId}">
					<simpleweb:validate id="releaseDate" type="Date"/>
				</c:if>
				</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><spring:message code="movie.ticketPrice" /></td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01"><form:input path="ticketPrice" cssClass="ct_input_g" cssErrorClass="text medium error" maxlength="4" />
			<simpleweb:validate id="ticketPrice" type="Number" />
			</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><spring:message code="movie.nowPlaying" /></td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">Is this movie now playing ? <form:checkbox path="nowPlaying" value="Y"/>
			</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>		
	</table>
	<!-- begin of button -->
	<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 10px;">
		<tr>
			<td height="24" colspan="2" align="center">
			<c:if test="${empty movie.movieId}">			
				<simpleweb:submit id="addlink" form="movieForm" service="simplewebVoMovieService.create(movie)" forward="simplewebVoMovieFinder.getPagingList(search)" layout="voLayout" tiles="body:/WEB-INF/jsp/simpleweb-vo/moviefinder/movie/list.jsp" render="partial" jsValidate="true">
					<simpleweb:setProperty name="title"><img src="<c:url value='/sample/images/btn_add.png'/>" width="64" height="18" border="0" /></simpleweb:setProperty> 
				    <simpleweb:setProperty name="hiddenDiv" value="hiddenDivPopup" />	
				    <simpleweb:doublesubmit formName="movieForm" isSessionForm="true"/>
				</simpleweb:submit>
			</c:if>
			
			<c:if test="${not empty movie.movieId}">	
				<simpleweb:submit id="updatelink" form="movieForm" service="simplewebVoMovieService.update(movie)" forward="simplewebVoMovieFinder.getPagingList(search)" layout="voLayout" tiles="body:/WEB-INF/jsp/simpleweb-vo/moviefinder/movie/list.jsp" render="partial" jsValidate="true">
				    <simpleweb:setProperty name="title"><img src="<c:url value='/sample/images/btn_update.png'/>" width="64" height="18" border="0" /></simpleweb:setProperty> 
				    <simpleweb:setProperty name="hiddenDiv" value="hiddenDivPopup" />
				</simpleweb:submit>			
				<simpleweb:submit id="deletelink" form="movieForm" service="simplewebVoMovieService.remove(movieId)" forward="simplewebVoMovieFinder.getPagingList(search)" layout="voLayout" tiles="body:/WEB-INF/jsp/simpleweb-vo/moviefinder/movie/list.jsp" render="partial" jsValidate="true">
					<simpleweb:setProperty name="title"><img src="<c:url value='/sample/images/btn_delete.png'/>" width="64" height="18" border="0" /></simpleweb:setProperty> 
				    <simpleweb:setProperty name="hiddenDiv" value="hiddenDivPopup" />
					<simpleweb:setProperty name="javascript">if(confirmDelete('movie'))</simpleweb:setProperty>	    
				</simpleweb:submit>
			</c:if></td>
		</tr>
	</table>
</form:form>
</div>
