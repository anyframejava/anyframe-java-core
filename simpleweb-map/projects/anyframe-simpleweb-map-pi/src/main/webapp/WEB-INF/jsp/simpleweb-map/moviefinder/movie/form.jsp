<%@ include file="/sample/common/taglibs.jsp"%>
<%@ taglib uri="http://www.anyframejava.org/tags/simpleweb" prefix="simpleweb" %>
<div id="popupWindow"  style="width:450px; height:410px;">
<!--************************** begin of contents *****************************-->
<!-- begin of title -->
<table width="100%" height="42" border="0" cellpadding="0" cellspacing="0">
	<tr>
		<td background="<spring:url value='/sample/images/ct_ttl_img02.gif'/>" width="100%" >
		<table width="100%" height="24" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td height="24" class="ct_ttl01" style="padding-left: 12px"><c:if test="${empty result.map.movieId}">Add</c:if> Movie Information</td>
			</tr>
		</table>  
		</td>
	</tr>
</table>
<form:form modelAttribute="result" method="post" action="/simplemap.do" id="movieForm" name="movieForm" enctype="multipart/form-data">
	<div id="hiddenDivPopup"></div>
	<table width="100%" border="0" cellspacing="0" cellpadding="0" >
		<c:if test="${not empty result.map.movieId}">
			<form:hidden path="map[movieId]" />
		</c:if>
		
		<tr>
			<td width="150" class="ct_td"><spring:message code="movie.title" />&nbsp;*</td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">
			<form:input id="title" path="map[title]" cssClass="ct_input_g" cssErrorClass="text medium error" size="40" maxlength="50" />
			<simpleweb:validate id="title" required="true" promptMessage="Enter movie Title." /> 
			</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><spring:message code="movie.director" />&nbsp;*</td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01"><form:input id="director" path="map[director]" cssClass="ct_input_g" cssErrorClass="text medium error" size="40" maxlength="50" />
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
			<form:select id="genreId" path="map[genreId]" >
              <form:options items="${genreList}" />
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
			<form:input id="actors" path="map[actors]" cssClass="ct_input_g" cssErrorClass="text medium error" size="60" maxlength="50" /></td>
			<simpleweb:validate id="actors" required="true"/>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><spring:message code="movie.runtime" /></td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">
			<form:input id="runtime" path="map[runtime]" cssClass="ct_input_g" cssErrorClass="text medium error" size="10" maxlength="3" /> min.
			<simpleweb:validate id="runtime" type="Number"/>
			</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><spring:message code="movie.releaseDate" /></td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">
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
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><spring:message code="movie.ticketPrice" /></td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01"><form:input id="ticketPrice" path="map[ticketPrice]" cssClass="ct_input_g" cssErrorClass="text medium error" maxlength="4" />
			<simpleweb:validate id="ticketPrice" type="Number"/>
			</td>
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>
		<tr>
			<td width="150" class="ct_td"><spring:message code="movie.nowPlaying" /></td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01">Is this movie now playing ? <form:checkbox id="nowPlaying" path="map[nowPlaying]" value="Y"/>	
			<simpleweb:validate id="nowPlaying" type="CheckBox" checked="${result.map.nowPlaying != null &&  result.map.nowPlaying == 'N' ? false : true}"/>
			</td>			
		</tr>
		<tr>
			<td height="1" colspan="3" bgcolor="D6D6D6"></td>
		</tr>		
		<tr>
			<td width="150" class="ct_td" height="130">
			<spring:message code="movie.posterFile"/></td>
			<td bgcolor="D6D6D6" width="1"></td>
			<td class="ct_write01" style="vertical-align: center;">		
				<c:if test="${not empty result.map.filePaths}">	
					 <img src="<c:url value='${result.map.filePaths}'/>" alt="<spring:message code='movie.posterFile'/>" border="0" width="80" height="100" />
					<form:hidden path="map[filePaths]"/>			
				</c:if>
				<c:if test="${empty result.map.filePaths}">
					<jsp:include page="/WEB-INF/jsp/simpleweb/common/upload.jsp" flush="true"/>
				</c:if>							        
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
			<c:if test="${empty result.map.movieId}">			
				<simpleweb:submit id="addlink" form="movieForm" action="/simplemap.do" service="simplewebMapMovieService.create(map)" forward="simplewebMapMovieFinder.getPagingList(map)" layout="mapLayout" tiles="body:/WEB-INF/jsp/simpleweb-map/moviefinder/movie/list.jsp" render="partial" jsValidate="true">
					<simpleweb:setProperty name="title"><img src="<c:url value='/sample/images/btn_add.png'/>" width="64" height="18" border="0" /></simpleweb:setProperty> 
				    <simpleweb:setProperty name="hiddenDiv" value="hiddenDivPopup" />	
				    <simpleweb:setProperty name="upload" value="true" />	
				    <simpleweb:doublesubmit formName="movieForm" isSessionForm="true"/>     
				</simpleweb:submit>
			</c:if>
			
			<c:if test="${not empty result.map.movieId}">	
				<simpleweb:submit id="updatelink" form="movieForm" action="/simplemap.do" service="simplewebMapMovieService.update(map)" forward="simplewebMapMovieFinder.getPagingList(map)" layout="mapLayout" tiles="body:/WEB-INF/jsp/simpleweb-map/moviefinder/movie/list.jsp" render="partial" jsValidate="true">
				    <simpleweb:setProperty name="title"><img src="<c:url value='/sample/images/btn_update.png'/>" width="64" height="18" border="0" /></simpleweb:setProperty> 
				    <simpleweb:setProperty name="hiddenDiv" value="hiddenDivPopup" />
				    <simpleweb:setProperty name="upload" value="true" />	
				</simpleweb:submit>			
				<simpleweb:submit id="deletelink" form="movieForm" action="/simplemap.do" service="simplewebMapMovieService.remove(map)" forward="simplewebMapMovieFinder.getPagingList(map)" layout="mapLayout" tiles="body:/WEB-INF/jsp/simpleweb-map/moviefinder/movie/list.jsp" render="partial" jsValidate="true">
					<simpleweb:setProperty name="title"><img src="<c:url value='/sample/images/btn_delete.png'/>" width="64" height="18" border="0" /></simpleweb:setProperty> 
				    <simpleweb:setProperty name="hiddenDiv" value="hiddenDivPopup" />
					<simpleweb:setProperty name="javascript">if(confirmDelete('movie'))</simpleweb:setProperty>	    
				</simpleweb:submit>
			</c:if></td>
		</tr>
	</table>
</form:form>
</div>
