<%@ include file="/sample/common/taglibs.jsp"%>
<%@ taglib uri="http://www.anyframejava.org/tags/simpleweb" prefix="simpleweb" %>
<div id="body">
<!--************************** begin of contents *****************************-->
<!-- begin of title -->
<table width="100%" height="24" border="0" cellpadding="0" cellspacing="0">
	<tr>
		<td height="24">
		<table width="100%" height="24" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td height="24" class="ct_ttl01" style="padding-left: 12px">Search List of Movie</td>
			</tr>
		</table>
		</td>
	</tr>
</table>
<!-- end of title -->

<form:form modelAttribute="search" method="post" id="searchForm" name="searchForm" action="simplemap.do?service=simplewebMapMovieFinder.getPagingList(map)&layout=mapLayout&tiles=body:/WEB-INF/jsp/simpleweb-map/moviefinder/movie/list.jsp">
<div id="hiddenDiv"></div>
	<!-- begin of search -->
	<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 10px; vertical-align: center;">
		<tr>
		
			<td align="right"><label><spring:message code="movie.title" />: 
				<form:input path="map['searchKeyword']" id="searchKeyword" cssClass="ct_input_g" cssErrorClass="text medium error" maxlength="50"/></label>
				<label>
				<spring:message code="movie.nowPlaying" />: 
				<form:select path="map['nowPlayingCondition']" id="nowPlayingCondition"  cssClass="ct_input_g" cssStyle="width:80px;">
					<form:option value="Y">Playing</form:option>
					<form:option value="N">Not playing</form:option>
				</form:select>
				</label>
			</td>
			<td align="right" width="30">	
			<simpleweb:submit id="searchlink" form="searchForm" action="/simplemap.do" service="simplewebMapMovieFinder.getPagingList(map)" layout="mapLayout" tiles="body:/WEB-INF/jsp/simpleweb-map/moviefinder/movie/list.jsp" render="partial"><img src="<c:url value='/sample/images/btn_search.png'/>" width="25" height="18" border="0" align="middle"/></simpleweb:submit>
			</td>
		</tr>
	</table>
	<!-- end of search -->

	<table class="scrollTable" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 10px;">
		<thead>
			<tr>
				<th scope="col" style="border-right: 1px #CCCCCC solid"><spring:message code="movie.genre" /></th>
				<th scope="col" style="border-right: 1px #CCCCCC solid"><spring:message code="movie.title" /></th>
				<th scope="col" style="border-right: 1px #CCCCCC solid"><spring:message code="movie.director" /></th>
				<th scope="col" style="border-right: 1px #CCCCCC solid"><spring:message code="movie.actors" /></th>
				<th scope="col" style="border-right: 1px #CCCCCC solid"><spring:message code="movie.releaseDate" /></th>
			</tr>
		</thead>
		<tbody>
			<c:forEach var="result" items="${resultList}" varStatus="status">

				<tr class="board" onMouseOver="this.style.backgroundColor = '#e4eaff';return true;;" onMouseOut="this.style.backgroundColor = ''; return true;;">
					<td class="underline">${result.name}</td>
					<td class="underline">
					<a class="linkClass" id="getMovieId${status.count}" href="simplemap.do?service=simplewebMapMovieService.get(map)&layout=mapLayout&tiles=body:/WEB-INF/jsp/simpleweb-map/moviefinder/movie/form.jsp&movieId=${result.movieId}&initdataService=simplewebMapGenreService.getList()&initdataResult=genreList&pageIndex=${pageIndex}">
						${result.title}
					</a>
					</td>
					<td align="left">${result.director}</td>
					<td align="left">${result.actors}</td>
					<td align="center">${result.releaseDate}</td>
				</tr>
			</c:forEach>
		</tbody>
	</table>

	<br />
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td class="page" height="50" align="center">
			<anyframe:pagenavigator linkUrl="javascript:document.searchForm.submit();" pages="${resultPage}" formName="searchForm" render="partial" linkFragment="body" linkClass="linkClass" linkPopup="true"/>
		</tr>
	</table>

	<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 10px;">
		<tr>
			<td align="right">
				<simpleweb:link id="addviewlink" action="/simplemap.do" layout="mapLayout" tiles="body:/WEB-INF/jsp/simpleweb-map/moviefinder/movie/form.jsp" render="partial" popup="true">
					<simpleweb:setProperty name="title"><img src="<c:url value='/sample/images/btn_add.png'/>" width="64" height="18" border="0" /></simpleweb:setProperty>
					<simpleweb:model name="result" type="org.anyframe.datatype.HashMapModel"/>
					<simpleweb:init valueList="genreList:simplewebMapGenreService.getList()" />   
					<simpleweb:doublesubmit formName="movieForm" isShowNewForm="true"/> 
				</simpleweb:link>
			</td>
		</tr>
	</table>
</form:form>
</div>
