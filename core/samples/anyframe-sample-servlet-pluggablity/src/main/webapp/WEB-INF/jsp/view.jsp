<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
    </div>
    <hr />
<script type="text/javascript" src="<c:url value='/sample/javascript/InputCalendar.js'/>"></script>
<script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>
	<div id="container">
		<div class="view">
			<table summary="This table shows detail information about genre, title, director, actors, runtime, release date, ticket price of the movie">
			<caption>Detail information</caption>
				<colgroup>
					<col style="width:20%;" />
					<col style="width:80%;" />
				</colgroup>
				<tbody>
					<tr>
						<th><label for="title">Title&nbsp;*</label></th>
						<td>${movie.title }</td>
					</tr>
					<tr>
						<th><label for="director">Director&nbsp;*</label></th>
						<td>${movie.director }</td>
					</tr>
					<tr>
						<th><label for="genre">Genre&nbsp;*</label></th>
						<td>${movie.genre.name }</td>
					</tr>
					<tr>
						<th><label for="actors">Actors&nbsp;*</label></th>
						<td>${movie.actors }</td>
					</tr>
					<tr>
						<th><label for="runtime">Runtime</label></th>
						<td>${movie.runtime }</td>
					</tr>
					<tr>
						<th><label for="releaseDate">ReleaseDate</label></th>
						<td>${movie.releaseDate }</td>
					</tr>
					<tr>
						<th><label for="ticketPrice">TicketPrice</label></th>
						<td>${movie.ticketPrice }</td>
					</tr>
					<tr>
						<th><label for="nowPlaying">NowPlaying</label></th>
						<td>${movie.nowPlaying }</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="btncontainer_center">
			<a href="<c:url value='/list.do'/>">
			<span class="button default icon">
				<span class="list">&nbsp;</span>
				<span class="none_a txt_num4">List</span>
			</span>
			</a>
		</div>
	</div>
	<hr />
<%@ include file="/sample/common/bottom.jsp"%>
