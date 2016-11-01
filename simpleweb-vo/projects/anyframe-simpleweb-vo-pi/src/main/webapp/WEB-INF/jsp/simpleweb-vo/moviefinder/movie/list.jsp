<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="/sample/common/taglibs.jsp"%>
<%@ taglib uri="http://www.anyframejava.org/tags/simpleweb" prefix="simpleweb" %>

<div id="container">
  	<form:form modelAttribute="search" method="post" id="searchForm" name="searchForm" action="simple.do?service=simplewebVoMovieFinder.getPagingList(search)&layout=voLayout&tiles=body:/WEB-INF/jsp/simpleweb-vo/moviefinder/movie/list.jsp">
    	<div id="hiddenDiv"></div>
    	<div class="cont_top">
        	<h2><spring:message code='movie.heading'/></h2>
      		<div class="search_list">
                <fieldset>
                    <legend>Search</legend>
                    <label for="searchKeyword" class="float_left margin_right5"><spring:message code="movie.title"/>: <input name="searchKeyword" type="text" id="searchKeyword" class="w_search" /></label>
                    <label for="nowPlayingCondition" class="float_left margin_right5"><spring:message code="movie.nowPlaying" />: 
                    <form:select path="nowPlayingCondition" id="nowPlayingCondition" cssClass="w_search" >
                    	<form:option value="Y">Playing</form:option>
						<form:option value="N">Not playing</form:option>
                    </form:select>
                    </label>
                    <label for="btnSearch" class="float_left">
                    	<simpleweb:submit id="searchlink" form="searchForm" service="simplewebVoMovieFinder.getPagingList(search)" layout="voLayout" tiles="body:/WEB-INF/jsp/simpleweb-vo/moviefinder/movie/list.jsp" render="partial">
                    		<input type="image" id="btnSearch" name="searchBtn" alt="Search" src="<c:url value='sample/images/btn_search_i.gif'/>"/>
                    	</simpleweb:submit>
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
                	<c:forEach var="result" items="${resultList}" varStatus="status">
	                	<tr>
	                    	<td>${result.genre.name}</td>
	                        <td>
	                        	<a class="linkClass" id="getMovieId${status.count}" href="simple.do?service=simplewebVoMovieService.get(movieId)&layout=voLayout&tiles=body:/WEB-INF/jsp/simpleweb-vo/moviefinder/movie/form.jsp&movieId=${result.movieId}&initdataService=simplewebVoGenreService.getList()&initdataResult=genreList&pageIndex=${pageIndex}">
	                        		${result.title}
	                        	</a>
	                        </td>
	                        <td>${result.director}</td>
	                        <td>${result.actors}</td>
	                        <td class="align_center">${result.ticketPrice}</td>
	                        <td class="align_center">${result.releaseDate}</td>
	                    </tr>
                    </c:forEach>
                </tbody>
            </table>
        </div>
        <div class="listunder_container">           
            <div class="list_paging">
                <anyframe:pagenavigator linkUrl="javascript:document.searchForm.submit();" pages="${resultPage}" formName="searchForm" render="partial" linkFragment="body" linkClass="linkClass" linkPopup="true"/>
            </div>
            <div class="list_underbtn_right">
                   <simpleweb:link id="addviewlink" layout="voLayout" tiles="body:/WEB-INF/jsp/simpleweb-vo/moviefinder/movie/form.jsp" render="partial" popup="true">
					<simpleweb:setProperty name="title">
						<span class="button default icon">
		                    <span class="add">&nbsp;</span>
		                    <span class="none_a txt_num3"><spring:message code="movie.button.add" /></span>
		                </span>
					</simpleweb:setProperty>
					<simpleweb:model name="movie" type="${packageName}.simpleweb.vo.domain.Movie"/>
					<simpleweb:init valueList="genreList:simplewebVoGenreService.getList()" />   
					<simpleweb:doublesubmit formName="movieForm" isShowNewForm="true"/> 
				</simpleweb:link>
            </div>
        </div>
    </form:form>
</div>