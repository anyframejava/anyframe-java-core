<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/jqueryMovieFinder.do?method=listView'/>">jQuery 1.0.4.RC1</a></div>
    </div>
    <hr />
<%@ include file="menu.jsp"%>	

<script type="text/javascript">

// jqGrid Start
jQuery(document).ready( function() {
	jQuery('#grid').jqGrid( 
	{
		url: "<c:url value='/jqueryMovieFinder.do?method=list'/>",
		mtype:'POST',
		datatype : "json",
		colNames : [ '<spring:message code="movie.genre" />','id','<spring:message code="movie.title" />', '<spring:message code="movie.director" />'
		 			,'<spring:message code="movie.actors" />', '<spring:message code="movie.releaseDate" />'],
		jsonReader: {
				     repeatitems: false
		},
		colModel : [
			{name : 'genre.name', index : 'genre.name', align : 'center'},
			{key : true, name : 'movieId', hidden : true},
			{name : 'title', index : 'title', align : 'center'},
			{name : 'director', index :'director' , align : 'center'}, 
			{name : 'actors', index : 'actors' , align : 'center'}, 
			{name : 'releaseDate', index : 'releaseDate', align : 'center'}],
		autowidth : true,
		height	  : 69,	
		scroll : false, 
		//forceFit:true,	
		multiselect : true, 
		viewrecords : true,	
		rowNum : 3, 
		sortable : true,
		loadComplete : function(xhr) {
			$('#pagination').quickPager( {
	    		pageSize: '3',
	    		pageUnit: '3',
	    		pageIndexId: 'pageIndex',
	    		searchButtonId: 'searchMovies', 
	    		currentPage: jQuery('#grid').getGridParam('page'),
	    		totalCount: jQuery('#grid').getGridParam('records'),
	    		searchUrl: '#'
	    		});
	    },
	    gridComplete : function() {
	    },
		loadError: function(xhr,st,err) {
			alert('<spring:message code="error.moviefinderimpl.getpaginglist" />');
		}, 
		ondblClickRow: function(rowId) {
			var rowData = jQuery('#grid').getRowData(rowId);
			
			openMovieFormDialog('edit', rowData.movieId);
	    },
	    beforeSelectRow: function (rowid, e) {
	    	//Default multi selection works whenever a row of jqGrid clikced.
	    	//Configuring beforeSelectRow for Multi selection to work when check boxes are clicked - not the rows.
	        var $myGrid = $(this),
	            i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
	            cm = $myGrid.jqGrid('getGridParam', 'colModel');
	        return (cm[i].name === 'cb');
	    }
	});
	// DELETE Button Click
	$('[name=deletelink]').click( function(){
		var rowNum;
		var rowData;
		var rowArray = new Array();
		rowNum = new String(jQuery('#grid').getGridParam('selarrrow'));
		rowNumList = rowNum.split(",");

		if(rowNum == null || rowNum ==''){
			return false;
		} else {
			if(confirm("Are you sure you want to delete this movie?")){
				for(var i = 0 ; i < rowNumList.length ; i++){
					rowData = jQuery("#grid").getRowData(rowNumList[i]);
					rowArray[i] = rowData.movieId;
					jQuery("#grid").delRowData(rowData.movieId);
				}
				 $.post(
					       "<c:url value='/jqueryMovie.do?method=removeMovieList'/>",
					       { ids : rowArray},
					       function(data) {
					    	    document.searchForm.pageIndex.value=1;
					    	    jQuery("[name=searchMovies]").click();
				     }); 
			}
		}
	});	
	
	// ADD Button Click
	$('[name=addlink]').click( function(){
		openMovieFormDialog('add');
	});	
	
	//Search Button Click
	$("[name=searchMovies]").click( function() {
		jQuery("#grid").setGridParam({
			page : $("#pageIndex").val(),
			postData : {
				searchKeyword:$("#searchKeyword").val(),
				nowPlayingCondition:$("#nowPlayingCondition").val()
			}
		});
		reloadGrid();
		return false;
	});

	// auto click by enter key 
	$("#searchKeyword").keypress(function (e) {
		document.searchForm.pageIndex.value=1;
		if (e.which == 13){
			$("[name=searchMovies]").trigger("click");
			return false;
		}
	});

	// Search keyword Auto-complete
	$("#searchKeyword").autocomplete({
		source: function( request, response ) {
	    	$.ajax({
	    		type : 'POST',
    			url : "<c:url value='/jqueryMovie.do?method=getMovieTitleList' />",
    			contentType : 'application/x-www-form-urlencoded;charset=UTF-8',
    			//data : jsonData,
    			data: {
	                term: request.term 
	            },
    			dataType: 'json',
    			success : function(data){
	            		  	  response($.map(data.autoData, function(item) {
		            		  	  return {
		            	      	  	  label: item.title,
		            	      	      value: item.title
		            	          }
	            		  	  }));
    					  },
    		  	error : function(data) {
    						  	alert("[autoComplete error] Sending data to designated url is not working.  Data : " + data);
    					  }
    	});
    	},
 		open: function() { 
 			jQuery(this).removeClass("ui-corner-all").addClass("ui-corner-top"); 
		}, 
		close: function() { 
			jQuery(this).removeClass("ui-corner-top").addClass("ui-corner-all"); 
 		}
	});
});

function reloadGrid(){
	jQuery('#grid').trigger("reloadGrid");
}

</script>

<script type="text/javascript">
//Global variable for selecting dialog type
var dialogMode = "";

//Movie Form setting
jQuery(document).ready( function() {
	//jQuery Validation
	$('#movieForm').validate();

	//dialog setting
	$('#movieForm').dialog({
		autoOpen	: false,
		width		: "auto",
		height		: "auto",
		maxWidth	: "410px",
		title		: "Movie Information",
		modal		: true,
		resizable	: false,
		close		: function() {
			clearMovieFormDialog();
			removeUploadPane();
		},
		open : function() {
			drawUploadPane();
		}
	});

	//datepicker defined in jQuery UI
	$('#releaseDate').datepicker({ changeYear: true, changeMonth: true, dateFormat: "yy-mm-dd" });
	
	//set form data to ""
	clearMovieFormDialog();
});

function clearMovieFormDialog() {
	$('#movieId').val("");
	$('#title').val("");	
	$('#director').val("");
	$('#selectGenreId').val("");
	$('#actors').val("");
	$('#runtime').val("");
	$('#releaseDate').val("");
	$('#ticketPrice').val("");
	$('#nowPlaying').val("");
	$('#filePaths').val("");
	$('#realFileName').val("");
	//remove label error txt
	$('label.error').remove();
}

function openMovieFormDialog(_dialogMode, movieId) {
	dialogMode = _dialogMode;
	
	$('#imgPane').hide();
	$('#uploadPane').hide();	
	
	$('#movieForm').dialog({
		position : 'center',
	 	buttons  : {
			'<spring:message code="movie.button.save" />': function() {
				saveMovie();
			},
			'<spring:message code="movie.button.cancel" />': function() {
				$('#movieForm').dialog("close");
		
			}
		}
 	});
	
	if(dialogMode == 'add') {
		$('#uploadPane').show();
		$('#movieForm').dialog('open');
	} else if(dialogMode = 'edit') {
		$.get('<c:url value="/jqueryMovie.do?method=get"/>&movieId=' + movieId, function(data){
			$('#movieId').val(data.movie.movieId);
			$('#title').val(data.movie.title);	
			$('#director').val(data.movie.director);
			$('#selectGenreId').val(data.movie.genre.genreId);
			$('#actors').val(data.movie.actors);
			$('#runtime').val(data.movie.runtime);
			$('#releaseDate').val(data.movie.releaseDate);
			$('#ticketPrice').val(data.movie.ticketPrice);
			$('#nowPlaying').val(data.movie.nowPlaying);
			$('#filePaths').val(data.movie.filePaths);
			$('#realFileName').val(data.movie.realFileName);
			if(data.movie.filePaths != "") {
				$('#poster').attr("src", '${ctx}'+data.movie.filePaths);  
				$('#imgPane').show();
			} else {
				$('#uploadPane').show();
			}
			
			$('#movieForm' ).dialog('open');
		});
	}
}

//tirggered when a user clicks 'SAVE button' of MovieForm Dialog
function saveMovie() {
	if(!$('#movieForm').valid()) {
		logger.log('movieForm is invalid.');
		return false;
	}
	uploadFile();
}


// triggered on upload callback.
function postMovieForm(){
	if(dialogMode == 'add') {
		$.post('<c:url value="/jqueryMovie.do?method=create"/>',
			$('#movieForm').serialize(), 
			function(data) {
				reloadGrid();
				$('#movieForm').dialog('close');
		});
	} else if(dialogMode == 'edit') {
		$.post('<c:url value="/jqueryMovie.do?method=update"/>',
			$('#movieForm').serialize(), 
			function(data) {
				reloadGrid();
				$('#movieForm').dialog('close');
		});
	} else {
		logger.log('dialogMode is invalid : ' + dialogMode);
	}
	
}
</script>

<!-- File Upload -->
<script type="text/javascript">

function drawUploadPane() {
	$('#uploadPane').attachment({
		'contextRoot' : '${ctx}',
		'callBack' : function() {
			postMovieForm();
		}
	});
}

 // This function should be invoked when a dialog closed.
 // uploadFileQueue is not cleared when MovieForm Dialog is hidded since Flash player is not working on hided dialog. 
function removeUploadPane() {
	$('#uploadPane').html("");
 }

function uploadFile(){
	AnyframeUpload.uploadFile();
}
</script>

<div id="content" style="height:100%;width:800px;margin-left:240px;">
  	<form:form modelAttribute="search" method="post" id="searchForm" name="searchForm">
    	<div id="hiddenDiv"></div>
    	<div class="cont_top">
        	<h2><spring:message code='movie.heading'/></h2>
      		<div class="search_list">
                <fieldset>
                    <legend>Search</legend>
                    <label for="searchKeyword" class="float_left margin_right5"><spring:message code="movie.title"/>: <form:input path="searchKeyword" id="searchKeyword" cssClass="ct_input_g" cssErrorClass="text medium error" maxlength="50"/></label>
                    <label for="nowPlayingCondition" class="float_left margin_right5"><spring:message code="movie.nowPlaying" />: 
                    <form:select path="nowPlayingCondition" id="nowPlayingCondition" cssClass="w_search" >
                    	<form:option value="Y">Playing</form:option>
						<form:option value="N">Not playing</form:option>
                    </form:select>
                    </label>
                    <label for="btnSearch" class="float_left">
                    	<a id="searchMovies" name="searchMovies" href="#">
                    		<input type="image" id="btnSearch" name="searchBtn" alt="Search" src="<c:url value='sample/images/btn_search_i.gif'/>"/>
                    	</a>
                    </label>
                </fieldset>
            </div>
      	</div>
      	
      	<div class="list">
      		<table id="grid" class="scroll" cellpadding="0" cellspacing="0"><tr><td/></tr></table>
      		<input type="hidden" value="1" name="pageIndex" id="pageIndex"/>
			<div id=".boardNavigation">
				<div id="pagination" class="pagination"></div>
			</div>
		</div>

		<div class="listunder_container">      
			<div class="list_underbtn_right">
				<span class="button default icon">
    	        <a name="addlink" href="#">
    	            <span class="add">&nbsp;</span>
    	            <spring:message code="movie.button.add" />
    	        </a>
                </span>
			
				<span class="button default icon">
				<a name="deletelink" href="#">
                    <span class="delete">&nbsp;</span>
                    <spring:message code="movie.button.remove" />
                </a>
                </span>
			</div>
		</div>        
    </form:form>
</div>
<!-- Movie Form start -->
<div id="dialog" class="dialog">
<form:form modelAttribute="movie" method="post" id="movieForm" name="movieForm">
	<table width="400px" summary="This table shows detail information about title, director, actors, runtime, release date, ticket price of the movie">
	<form:hidden path="movieId" />
	<form:hidden path="filePaths"/>
	<form:hidden path="realFileName"/>	
		<caption>Detail information</caption>
	    <colgroup>
		   	<col style="width:35%;" />
		    <col style="width:65%;" />
		</colgroup>
		<tbody>
			<tr>
				<th><label for="title"><spring:message code="movie.title"/>&nbsp;</label></th>
				<td>
					<form:input path="title" cssClass="required ct_input_g" cssStyle="width:150px;" size="40" maxlength="50"/>
				</td>
			</tr>
			<tr>
				<th><label for="director"><spring:message code="movie.director"/>&nbsp;</label></th>
				<td>
					<form:input path="director"  cssClass="required ct_input_g" cssStyle="width:150px;" size="40" maxlength="50" />
				</td>
			</tr>
			<tr>
				<th><label for="genre"><spring:message code="movie.genre"/>&nbsp;</label></th>
				<td>
					<form:select id="selectGenreId" path="genre.genreId"  cssStyle="width:155px;">
       	            <form:options items="${genreList}" itemValue="genreId" itemLabel="name"/>
	       		    </form:select>
				</td>
			</tr>
			<tr>
				<th><label for="actors"><spring:message code="movie.actors"/>&nbsp;</label></th>
				<td>
					<form:input path="actors" cssClass="required ct_input_g" cssStyle="width:150px;" size="40" maxlength="50" />
				</td>
			</tr>
			<tr>
				<th><label for="runtime"><spring:message code="movie.runtime"/>&nbsp;</label></th>
				<td>
					<form:input path="runtime" cssClass="number ct_input_g"  cssStyle="width:150px;" size="40" maxlength="3" /> min.
				</td>
			</tr>
			<tr>
				<th><label for="releaseDate"><spring:message code="movie.releaseDate"/>&nbsp;</label></th>
				<td>
					<form:input path="releaseDate" id="releaseDate" cssClass="dateISO ct_input_g" cssStyle="width:150px;" size="40" maxlength="10" />
				</td>
			</tr>
			<tr>
				<th><label for="ticketPrice"><spring:message code="movie.ticketPrice"/>&nbsp;</label></th>
				<td>
					<form:input path="ticketPrice" cssClass="number ct_input_g" cssStyle="width:150px;" size="40" maxlength="4" />
				</td>
			</tr>
			<tr>
				<th><label for="nowPlaying"><spring:message code="movie.nowPlaying"/>&nbsp;</label></th>
				<td>
					<spring:message code="movie.isNowPlaying"/><form:checkbox path="nowPlaying" value="Y"/>
				</td>
			</tr>
			<tr>
				<th><label for="posterFile"><spring:message code="movie.posterFile"/>&nbsp;</label></th>
				<td>
				<div id="imgPane">
					<img id="poster" src="" alt="<spring:message code='movie.posterFile'/>" border="0" width="80" height="100" />
				</div>
				<div id="uploadPane"></div>
				</td>
			</tr>
		</tbody>
	</table>
</form:form>
</div>

<hr />
<%@ include file="/sample/common/bottom.jsp"%>
