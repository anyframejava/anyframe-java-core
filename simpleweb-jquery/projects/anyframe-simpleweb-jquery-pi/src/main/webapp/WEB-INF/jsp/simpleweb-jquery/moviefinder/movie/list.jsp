<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/taglibs.jsp"%>
<%@ taglib uri="http://www.anyframejava.org/tags/simpleweb" prefix="simpleweb" %>
<script type="text/javascript">
jQuery(document).ready( function() {
		jQuery("#grid").jqGrid( 
		{
			url: "<c:url value='/simplejson.do?layout=jqueryLayout&service=simplewebJqueryMovieFinder.getPagingList(searchvo)&viewName=jsonView' />",
			mtype:'POST',
			datatype : "json",
			colNames : [ '<spring:message code="movie.genre" />','id','<spring:message code="movie.title" />', '<spring:message code="movie.director" />'
			 			,'<spring:message code="movie.actors" />', '<spring:message code="movie.releaseDate" />'],
			jsonReader: {repeatitems: false},
			colModel : [ 
			{name : 'genre.name', index : 'genre.name', align : 'center'}, {key : true, name : 'movieId', hidden : true}, {name : 'title', index : 'title', align : 'center'}, {name : 'director', index :'director' , align : 'center'}, {name : 'actors', index : 'actors' , align : 'center'}, {name : 'releaseDate', index : 'releaseDate', align : 'center'}],
			width : 780, height : 69,	scroll : false, forceFit:true,	multiselect : true, viewrecords : true,	
			rowNum : 3, sortable : true,

			loadComplete : function(xhr) {
				$("#pagination").quickPager( {
		    		pageSize: "3",
		    		pageUnit: "3",
		    		pageIndexId: "pageIndex",
		    		searchButtonId: "searchMovies", 
		    		currentPage: jQuery("#grid").getGridParam("page"),
		    		totalCount: jQuery("#grid").getGridParam("records"),
		    		searchUrl: "#"
		    		});
		    },
		    
			loadError: function(xhr,st,err) {
				alert('<spring:message code="error.moviefinderimpl.getpaginglist" />'); 
			}, 
			ondblClickRow: function(rowId) {
				rowData = jQuery("#grid").getRowData(rowId);
				jQuery("#getLink").attr("href","<c:url value='/simplejsoncommon.do?layout=jqueryLayout&service=simplewebJqueryMovieService.get(movieId)&tiles=body:/WEB-INF/jsp/simpleweb-jquery/moviefinder/movie/form.jsp&initdataService=simplewebJqueryGenreService.getDropDownGenreList()&initdataResult=genreList&movieId=' />" + rowData.movieId);
				document.getElementById("getLink").focus();
		    }
			
		});
		
		/* Search Movies */
		$("[name=searchMovies]").click( function() {
			jQuery("#grid").setGridParam({page:$("#pageIndex").val()});
			jQuery("#grid").setPostData({searchKeyword:$("#searchKeyword").val(), nowPlayingCondition:$("#nowPlayingCondition").val()});
			jQuery("#grid").setGridParam({url:"<c:url value='/simplejson.do?layout=jqueryLayout&service=simplewebJqueryMovieFinder.getPagingList(searchvo)&viewName=jsonView' />"}).trigger("reloadGrid");
		});

		
		/* Button Function End (User CRUD) */
		/* DELETE Resource */
		$('[name=deletelink]').click( function(){
			var rowNum;
			var rowData;
			var rowArray = new Array();
			rowNum = new String(jQuery("#grid").getGridParam('selarrrow'));
			rowNumList = rowNum.split(",");

			if(rowNum == null || rowNum ==""){
				return false;
			} else {
				if(confirm("Are you sure you want to delete this movie?")){
					for(var i = 0 ; i < rowNumList.length ; i++){
						rowData = jQuery("#grid").getRowData(rowNumList[i]);
						rowArray[i] = rowData.movieId;
						jQuery("#grid").delRowData(rowData.movieId);
					}

					 $.post(
						       "<c:url value='/simplejson.do?layout=jqueryLayout&service=simplewebJqueryMovieService.removeMovieList(ids)&viewName=jsonView' />",
						       {
						    	   ids : rowArray
						       }, function(data) {
						    	    document.searchForm.pageIndex.value=1;
						    	    jQuery("[name=searchMovies]").click();
					     }); 
				}
			}
		});

		/* auto click by enter key */
		$("#searchKeyword").keypress(function (e) {
			if (e.which == 13){
				$("[name=searchMovies]").trigger("click");
				return false;
			}
		});

		$("#searchKeyword").autocomplete({
			source: function( request, response ) {
		    	$.ajax({
		    		type : 'POST',
	    			url : "<c:url value='/simplejson.do?layout=jqueryLayout&service=simplewebJqueryMovieService.getMovieTitleList(term)&viewName=jsonView' />",
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
	    						  	alert("error!");
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
</script>
<div id="body">
<!--************************** begin of contents *****************************-->
<!-- begin of title -->

<table width="100%" height="24" border="0" cellpadding="0" cellspacing="0">
	<tr>
		<td height="24">
		<table width="780" height="24" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td height="24" class="ct_ttl01" style="padding-left: 12px">Search List of Movie</td>
			</tr>
		</table>
		</td>
	</tr>
</table>
<!-- end of title -->
<form:form modelAttribute="search" method="post" id="searchForm" name="searchForm">
<div id="hiddenDiv"></div>

	<!-- begin of search -->
	<table width="780" border="0" cellspacing="0" cellpadding="0" style="margin-top: 10px; vertical-align: center;">
		<tr>
			<td align="right"><label><spring:message code="movie.title" />: 
				<form:input path="searchKeyword" id="searchKeyword" cssClass="ct_input_g" cssErrorClass="text medium error" maxlength="50"/></label>
				<label>
				<spring:message code="movie.nowPlaying" />: 
				<form:select path="nowPlayingCondition" cssClass="ct_input_g" cssStyle="width:80px;">
					<form:option value="Y">Playing</form:option>
					<form:option value="N">Not playing</form:option>
				</form:select>
				</label>
			</td>
			<td align="right" width="30">
			<a id="searchMovies" name="searchMovies" href="#"><img src="<c:url value='/sample/images/btn_search.png'/>" width="25" height="18" border="0" align="middle"/></a>
			</td>
		</tr>
	</table>
	<!-- end of search -->
	<br/>
	<!-- jqGrid -->
	<table id="grid" class="scroll" cellpadding="0" cellspacing="0"><tr><td/></tr></table>
	<input type="hidden" id="pageIndex" name="pageIndex" value="1" />
	<div id=".boardNavigation">
		<div id="pagination" class="pagination"></div>
	</div>
	<br/><br/>
	<table width="780" border="0" cellspacing="0" cellpadding="0" style="margin-top: 10px;">
		<tr>
			<td align="right">
				<simpleweb:link action="/simplejsoncommon.do" id="addviewlink"  layout="jqueryLayout" render="partial" popup="true">
					<simpleweb:tiles name="body" value="/WEB-INF/jsp/simpleweb-jquery/moviefinder/movie/form.jsp"/>
					<simpleweb:model name="movie" type="${packageName}.simpleweb.jquery.domain.Movie"/>
					<simpleweb:init valueList="genreList:simplewebJqueryGenreService.getDropDownGenreList()" />   
					<simpleweb:setProperty name="title"><img src="<c:url value='/sample/images/btn_add.png'/>" width="64" height="18" border="0" /></simpleweb:setProperty>
				</simpleweb:link>
				<a name="deletelink" href="#"><img src="<c:url value='/sample/images/btn_delete.png'/>" width="64" height="18" border="0" /></a>
				
			</td>
		</tr>
	</table>
	<a id="getLink" name="getLink"></a>
	<script type="text/javascript"> 
	 Spring.addDecoration(new Spring.AjaxEventDecoration({
		   elementId: getLink,
		   event: "onfocus",
		   popup: true,
		   params: {fragments:"body"}
		   }));

	</script>
</form:form>
</div>
