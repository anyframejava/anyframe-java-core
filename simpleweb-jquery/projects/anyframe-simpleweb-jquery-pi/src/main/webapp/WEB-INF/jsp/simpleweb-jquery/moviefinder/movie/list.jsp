<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
			autowidth : true, height : 69,	scroll : false, forceFit:true,	multiselect : true, viewrecords : true,	
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
			jQuery("#grid").setGridParam({
				page : $("#pageIndex").val(),
				postData : {
					searchKeyword:$("#searchKeyword").val(),
					nowPlayingCondition:$("#nowPlayingCondition").val()
				}
			});
			jQuery("#grid").setGridParam({url:"<c:url value='/simplejson.do?layout=jqueryLayout&service=simplewebJqueryMovieFinder.getPagingList(searchvo)&viewName=jsonView' />"}).trigger("reloadGrid");
			return false;
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

<div id="container">
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
      		<input type="hidden" id="pageIndex" name="pageIndex" value="1" />
			<div id=".boardNavigation">
				<div id="pagination" class="pagination"></div>
			</div>
		</div>
        <div class="listunder_container">           
            <div class="list_underbtn_right">
                <span style="text-decoration:none;">
				<simpleweb:link action="/simplejsoncommon.do" id="addviewlink"  layout="jqueryLayout" render="partial" popup="true">
					<simpleweb:tiles name="body" value="/WEB-INF/jsp/simpleweb-jquery/moviefinder/movie/form.jsp"/>
					<simpleweb:model name="movie" type="${packageName}.simpleweb.jquery.domain.Movie"/>
					<simpleweb:init valueList="genreList:simplewebJqueryGenreService.getDropDownGenreList()" />   
					<simpleweb:setProperty name="title">
						<span class="button default icon">
		                    <span class="add">&nbsp;</span>
		                    <span class="none_a txt_num3"><spring:message code="movie.button.add" /></span>
		                </span>
					</simpleweb:setProperty>
				</simpleweb:link>
				</span>
				<span class="button default icon">
                    <span class="delete">&nbsp;</span>
                    <a name="deletelink" href="#"><spring:message code="movie.button.remove" /></a>
                </span>
            </div>
        </div>
        
        <a id="getLink" name="getLink"></a>
		<script type="text/javascript"> 
		 Spring.addDecoration(new Spring.AjaxEventDecoration({
			   elementId: "getLink",
			   event: "onfocus",
			   popup: true,
			   params: {fragments:"body"}
			   }));
		</script>
    </form:form>
</div>