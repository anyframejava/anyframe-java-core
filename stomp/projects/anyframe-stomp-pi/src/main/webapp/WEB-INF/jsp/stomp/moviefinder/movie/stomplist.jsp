<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/stompMovieFinder.do'/>">Stomp 1.0.1-SNAPSHOT</a></div>
    </div>
    <hr />
<script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>
<script type="text/javascript" src="<c:url value='/stomp/jquery/js/jquery-1.9.0.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/stomp/jquery/js/jquery.jqGrid.src.js'/>"></script>
<script type="text/javascript" src="<c:url value='/stomp/sockjs-0.3.4.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/stomp/stomp.js'/>"></script>
<script type="text/javascript">
	function fncSearchMovie() {
	   	document.searchForm.action="<c:url value='/coreMovieFinder.do?method=list'/>";
	   	document.searchForm.submit();						
	}
	
	$(window).bind('resize', function() {
	    $("#movieGrid").setGridWidth($(window).width() - 30);
	}).trigger('resize');
	
	var protocol = "ws";
	var url = protocol + "://" + window.location.host + "<c:url value='/_stomp_/getMovieList'/>";
	var transports = [];
	var client = null;
	
	$(document).ready(function () {
		$('#movieGrid').jqGrid({
		    autowidth   : true,
	        jsonReader    : {
	        	root      : 'objects',
				id          : 'movieId',
				repeatitems : false
			},
			colNames    : [
			           '<spring:message code="movie.genre" />',
			           '<spring:message code="movie.title" />',
			           '<spring:message code="movie.director" />',
			           '<spring:message code="movie.actors" />',
			           '<spring:message code="movie.ticketPrice" />',
			           '<spring:message code="movie.releaseDate" />'
			           ] ,
		    colModel	: [
		    	       {name : 'genre.name', width : '12%'},
		    	       {name : 'title', width : '20%'},
		    	       {name : 'director', width : '20%'},
		    	       {name : 'actors', width : '20%'},
		    	       {name : 'ticketPrice', width : '14%', align: 'center'},
		    	       {name : 'releaseDate', width : '14%', align: 'center'}
		    	      ],
		    	      rowNum: 10,
		    	      rowList: [10, 20, 300],
		    	      sortname: 'name',
		    	      sortorder: "asc",
		    	      viewrecords: true,
		    	      gridview: true,
		    	      rownumbers: true,
		    	      height: 250
		    	  });
		 
		connect();
		
		function connect() {
			var socket = (protocol == "ws" || protocol == "wss") ?
					new WebSocket(url) :
					new SockJS(url, undefined, {protocols_whitelist: transports});
			
			client = Stomp.over(socket);
			
			client.connect({}, function(frame) {
	            console.log('Connected: ' + frame);
	            client.subscribe('/topic/movieList', function(message){
	                showMessage(message.body);
	            });
	        });
		}
		
		function disconnect() {
			client.disconnect();
	        console.log("Disconnected");
	    }

	    function showMessage(message) {
	    	console.log(message);
	    	
	    	$("#movieGrid").setGridParam({
			    datatype: 'jsonstring',
			    datastr: eval("(" + message + ")"),
			    
			    loadError:function(xhr, status, error) {
    	    		alert(error); 
    	    	}
			}).trigger("reloadGrid");
	    }
		
		$('#btnSearch').on("click", function () {
			startMsec = new Date().getTime();
			
			$('#movieGrid').clearGridData();
			
			client.send("/app/list", {}, JSON.stringify({title : $("#title").val(), nowPlaying : $("#nowPlaying").val()}));
		});
	});
	
</script>
  	<div id="container">
    	<div class="cont_top">
        	<h2><spring:message code='movie.heading'/></h2>
      		<div class="search_list">
                <fieldset>
                    <legend>Search</legend>
                    <label for="title" class="float_left margin_right5"><spring:message code="movie.title"/>: <input type="text" id="title" cssClass="w_search" /></label>
                    <label for="nowPlaying" class="float_left margin_right5"><spring:message code="movie.nowPlaying" />: 
                    <select name="nowPlaying" id="nowPlaying" cssClass="w_search" >
                    	<option value="Y">Playing</option>
						<option value="N">Not playing</option>
                    </select>
                    </label>
                    <label for="btnSearch" class="float_left">
                    	<input type="image" id="btnSearch" name="searchBtn" alt="Search" src="<c:url value='/sample/images/btn_search_i.gif'/>"/>
                    </label>
                </fieldset>
            </div>
      	</div>
        <div class="list">
        	<table id="movieGrid" summary="This is list of movie">
        	</table>
        </div>
        <div class="listunder_container">
        	<div id="gridPager"></div>
        	<div id="pager"></div>
            <%-- <div class="list_paging">
                <anyframe:pagenavigator linkUrl="javascript:fncSearchMovie();"/>
            </div> --%>
        </div>
	</div>
    <hr />
<%@ include file="/sample/common/bottom.jsp"%>