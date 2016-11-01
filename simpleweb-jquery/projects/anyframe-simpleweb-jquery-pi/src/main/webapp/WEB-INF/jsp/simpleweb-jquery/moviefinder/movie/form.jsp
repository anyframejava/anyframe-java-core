<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/taglibs.jsp"%>
<%@ taglib uri="http://www.anyframejava.org/tags/simpleweb" prefix="simpleweb" %>
<div id="popupWindow"  style="width:460px; height:430px;">
<!--************************** begin of contents *****************************-->
<!-- begin of title -->
<table width="100%" height="42" border="0" cellpadding="0" cellspacing="0">
	<tr>
		<td background="<spring:url value='/sample/images/ct_ttl_img02.gif'/>" width="100%">
		<table width="100%" height="24" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td height="24" class="ct_ttl01" style="padding-left: 12px"><c:if test="${empty movie.movieId}">Add</c:if> Movie Information</td>
			</tr>
		</table>
		</td>
	</tr>
</table>
<form:form modelAttribute="movie" action="/simple.do" method="post" id="movieForm" name="movieForm" enctype="multipart/form-data">
	<div id="hiddenDivPopup"></div>
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<c:if test="${not empty movie.movieId}">
			<form:hidden path="movieId" />
		</c:if>
		
		<tr>
			<td width="150" class="ct_td"><anyframe:message code="movie.title" />&nbsp;*</td>
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
			<td width="150" class="ct_td"><anyframe:message code="movie.director" />&nbsp;*</td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01"><form:input path="director" cssClass="ct_input_g" cssErrorClass="text medium error" size="40" maxlength="50" />
			<simpleweb:validate id="director" required="true" />
			</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><anyframe:message code="movie.genre" />&nbsp;*</td>
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
			<td width="150" class="ct_td"><anyframe:message code="movie.actors" />&nbsp;*</td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">
			<form:input path="actors" cssClass="ct_input_g" cssErrorClass="text medium error" size="60" maxlength="50" /></td>
			<simpleweb:validate id="actors" required="true" promptMessage="Enter Actors." />
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><anyframe:message code="movie.runtime" /></td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01"><form:input path="runtime" cssClass="ct_input_g" cssErrorClass="text medium error" size="10" maxlength="3" /> min.
			<simpleweb:validate id="runtime" type="Number"/>
			</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><anyframe:message code="movie.releaseDate" /></td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01"><form:input path="releaseDate" id="releaseDate" cssClass="ct_input_g"
				cssErrorClass="text medium error" maxlength="10" />
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
			<td width="150" class="ct_td"><anyframe:message code="movie.ticketPrice" /></td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01"><form:input path="ticketPrice" cssClass="ct_input_g" cssErrorClass="text medium error" maxlength="4" />
			<simpleweb:validate id="ticketPrice" type="Number"/>
			</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><anyframe:message code="movie.nowPlaying" /></td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">Is this movie now playing ? <form:checkbox path="nowPlaying" value="Y"/>
			</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>		
		<tr>
			<td width="150" class="ct_td">
			<anyframe:message code="movie.posterFile"/></td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01" style="vertical-align: center;">	
				<c:if test="${not empty movie.filePaths}">					
 					<img src="<c:url value='${movie.filePaths}'/>" alt="<spring:message code='movie.posterFile'/>" border="0" width="80" height="100" />
					<form:hidden path="filePaths"/>
				</c:if>
				<c:if test="${empty movie.filePaths}">
					<jsp:include page="/WEB-INF/jsp/simpleweb-jquery/common/upload.jsp" flush="true"/>
				</c:if>							        
			</td>
		</tr>
	</table>
	<!-- begin of button -->
	<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 10px;">
		<tr>
			<td height="24" colspan="2" align="center">
			<c:if test="${empty movie.movieId}">
				<simpleweb:submit id="addlink" form="movieForm" action="/simplejsoncommon.do" layout="jqueryLayout" service="simplewebJqueryMovieService.create(movie)" forward="simplewebJqueryMovieFinder.getPagingList(search)" tiles="body:/WEB-INF/jsp/simpleweb-jquery/moviefinder/movie/list.jsp" render="partial" jsValidate="true">
					<simpleweb:setProperty name="title"><img src="<c:url value='/sample/images/btn_add.png'/>" width="64" height="18" border="0" /></simpleweb:setProperty> 
				    <simpleweb:setProperty name="hiddenDiv" value="hiddenDivPopup" />	
				    <simpleweb:setProperty name="upload" value="true" />	
				</simpleweb:submit>
			</c:if>
			
			<c:if test="${not empty movie.movieId}">
				<simpleweb:submit id="updatelink" form="movieForm" action="/simplejsoncommon.do" layout="jqueryLayout" service="simplewebJqueryMovieService.update(movie)" forward="simplewebJqueryMovieFinder.getPagingList(search)" tiles="body:/WEB-INF/jsp/simpleweb-jquery/moviefinder/movie/list.jsp" render="partial" jsValidate="true">
				    <simpleweb:setProperty name="title"><img src="<c:url value='/sample/images/btn_update.png'/>" width="64" height="18" border="0" /></simpleweb:setProperty> 
				    <simpleweb:setProperty name="hiddenDiv" value="hiddenDivPopup" />
				    <simpleweb:setProperty name="upload" value="true" />		    
				</simpleweb:submit>			
			</c:if></td>
		</tr>
	</table>
</form:form>
</div>
