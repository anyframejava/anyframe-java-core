<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
	</div>
	<hr />
	<div id="container">
		<div class="main_greeting">
        	<dl>
                <dt>Form Authentication Success( username : ${pageContext.request.userPrincipal.name} )</dt>
                <dd></dd>
            </dl>
        </div>
		<div class="search_list">
			<fieldset>
				<label for="nowPlaying" class="float_left margin_right5"><a href="<c:url value='/logout.do'/>">Logout</a></label>
			</fieldset>
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
						<th>Genre</th>
						<th>Title</th>
						<th>Director</th>
						<th>Actor</th>
						<th>Ticket Price</th>
						<th>Release Date</th>
					</tr>
				</thead>
				<tbody>
					<c:forEach var="movie" items="${movies}">
						<tr>
							<td>${movie.genre.name}</td>
							<td><a class="linkClass" href="${ctx}/view.do?movieId=${movie.movieId}">${movie.title}</a></td>
							<td>${movie.director}</td>
							<td>${movie.actors}</td>
							<td class="align_center">${movie.ticketPrice}</td>
							<td class="align_center">${movie.releaseDate}</td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
	</div>
	<hr />
<%@ include file="/sample/common/bottom.jsp"%>
