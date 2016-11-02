<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Anyframe 5.5.2-SNAPSHOT Main</title>
<link rel="stylesheet" type="text/css" href="<c:url value='/sample/css/layout.css'/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value='/sample/css/common.css'/>"/>
<!-- jQuery component -->
<link rel="stylesheet" type="text/css" href="<c:url value='/util-jquery/jquery/jquery-ui/smoothness/jquery-ui-1.8.16.custom.css'/>"  /> 
</head>

<body>
<div id="wrap">
	<div class="skipnavigation">
		<a href="#contents">Jump up to the contents</a>
	</div>
    <hr />
    
    <div id="header">
    	<div class="toplogo"><h1><a href="<c:url value='/anyframe.jsp'/>"><img src="<c:url value='/sample/images/h1_toplogo.jpg'/>" alt="anyframe"/></a></h1></div>

		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/util/utilList.do'/>">Util 1.0.5-SNAPSHOT</a></div>
    </div>
    <hr />
<script type="text/javascript" src="<c:url value='/util-jquery/jquery/jquery-1.6.2.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/util-jquery/jquery/jquery-ui/jquery-ui-1.8.16.custom.min.js'/>"></script>
<script type="text/javascript">
<!--
$(document).ready(function() {
	$("#movieList").hide();
	$("#failMessage").hide();
	
	$("#login_btn").click(function(){
		var userName = $("#userName").val();
		var html ="";
		
		$.ajax({
			type : 'GET',
			url : '<c:url value="/util/utilMovieFinder.do"/>',
			contentType : 'application/x-www-form-urlencoded;charset=UTF-8',
			data : {"userName":userName},
			dataType: 'json',
			success : function(data){
				$("#failMessage").hide();
				$("#movieList").show();	
				
				html = ""; 
				$.each(data.movies, function(key, movie) {
					html += "<tr>\n";
					html += "<td>" + movie.genreName + "</td>\n";
					html += "<td>" + movie.title + "</td>\n";
					html += "<td>" + movie.director + "</td>\n";
					html += "<td>" + movie.actors + "</td>\n";
					html += "<td class='align_center'>" + movie.ticketPrice + "</td>\n";
					html += "<td class='align_center'>" + movie.releaseDate + "</td>\n";
					html += "</tr>\n";
				});  
				$("#movieBody").html(html);			
			},
		  	error : function(xhr, ajaxOptions, thrownError) {
		  		$("#movieList").hide();
		  		$("#failMessage").show();
			}
		});
	});
});
//-->
</script>
	<div id="container">
    	<div class="cont_top">
        	<h2>ThreaLocal Utility Test List</h2>
      	</div>
		<div class="util_list">
        	<dl>
				<dd>
					Notice : This example uses ThreadLocal to store and load login information. <br></br>To invoke a list of movies, you need to login in the name of "admin". Otherwise this example will return an error page.
				</dd>
				<dd>
					user name:<input type="text" id="userName" name="userName" size="20" value="admin"/>
					<input type="button" id="login_btn" name="login_btn" value="login"/>
				</dd>
			</dl>
		</div>

		<div id="movieList" class="list">
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
                <tbody id="movieBody">
                <tr>
                	<td></td>
                </tr>
                </tbody>
            </table>
        </div>
		<div id="failMessage" class='failmessagebox'>
		 	<p> Only an admin user can invoke a list of movies.</p>
		</div>
	</div>
    <hr />
<%@ include file="/sample/common/bottom.jsp"%>