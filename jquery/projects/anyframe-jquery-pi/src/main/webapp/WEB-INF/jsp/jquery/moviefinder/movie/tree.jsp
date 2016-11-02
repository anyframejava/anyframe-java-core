<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/jqueryMovieFinder.do?method=listView'/>">jQuery 1.0.6-SNAPSHOT</a></div>
    </div>
    <hr />
<%@ include file="/WEB-INF/jsp/jquery/menu.jsp"%>

<script type="text/javascript">
<!--
function showRequest(formData, jqForm, options) { 
	if(document.movieForm.nowPlaying.checked){
		document.movieForm.nowPlaying.value ="Y";
	}
	else{
		document.movieForm.nowPlaying.value ="N";
	}
	return true;
} 

function showResponse(data, responseText, statusText, xhr, $form)  {
	alert("Save successfully");
	$("#refresh").trigger("click");
} 

	$(function() {
		jQuery("#movieForm").validate({
			submitHandler: function(form) {
				jQuery(form).ajaxSubmit({
					url: "<c:url value='/jqueryMovie.do?method=update'/>",
					beforeSubmit:  showRequest,
					success: showResponse
					});
			}
		});
	
		$("#genreId").msDropDown();

		$("#tabs").tabs({remote : true,	disabled: [0, 1]});
		
		$("#tabs").hide();
		
		$("#tree").jstree({
	   		'plugins' : ["themes","json_data","ui","types","contextmenu","crrm"], //,"dnd"  ,"html_data" , 'checkbox', "cookies", 
	   		'themes' : {
	   			'theme' : 'apple',
	   			'dots' : false,
	   			'icons' : true,
	   			'url': "jquery/jquery/jstree/themes/apple/style.css"
			},
			'json_data' : {
				'ajax':{ //# Tree data 가져옴.
					"url" : "<c:url value='/jqueryMovieTree.do?method=tree' />",
					"data" : function(n){
						var return_id = $('#searchKeyword').val();
						if(n.attr) {
							var id = n.attr("id");
							var pid = n.parents('li:eq(0)').attr('id');
							if(pid == undefined) {
								return {
									searchKeyword : id,
									id : id
								};
							} else {
								return {
									id:id,
									searchKeyword : return_id};
							}
						} else {
							return {
								id : 0,
								searchKeyword : return_id};
										
						}
					},
					"success" : function(data){
						return data.JSTreeNodeList;
					}
				}
		    },
		    'types' : {
				'types' : {
					'root' : {
						'icon' : {'image' : '<c:url value="/jquery/image/icons.png"/>'}
					},
					'lockedroot' : {
						'icon' : {'image' : '<c:url value="/jquery/image/lockedicons.png"/>'}
					},
					'leaf' :{
						'icon' : {'image' : '<c:url value="/jquery/image/leaficons.png"/>'}
					}
				}
			},
			'contextmenu' : {
				'items' : createContextMenu
			}
		}).bind("remove.jstree", function(e, data) { // event handling for node delete
			if(confirm("Are you sure you want to delete this movie?")){
				data.rslt.obj.each(function() {
						$.ajax({
						async : false,
						type : 'POST',
						url : "<c:url value='/jqueryMovieTree.do?method=remove'/>",
						data : {
							"movieId" : $(data.rslt.obj).attr("id")
						},
						error : function() {
							$.jstree.rollback(data.rlbk);
						}
					});
				});
			}else{
				$.jstree.rollback(data.rlbk);
			}	
		}).bind("select_node.jstree", function (e, data) { // event handling for node select
			var node = data.rslt.obj; 
			var id = node.attr('id');
			var pid = node.parents('li:eq(0)').attr('id'); 
			
			if(pid == undefined){//genre
			
				$("#tabs").show();
				$("#tabs").tabs("enable", 0);
				$("#tabs").tabs("select", 0);
				$("#tabs").tabs("disable", 1);
				
				//GET Genre
				$.getJSON("<c:url value='jqueryMovieTree.do?method=getGenre'/>&genreId=" + id, function(data){
					document.genreForm.genreId1.value = data.genre.genreId;
					document.genreForm.name.value = data.genre.name;
				});
			}else{//movie 
				
				$("#tabs").show();
				$("#tabs").tabs("enable", 1);
				$("#tabs").tabs("select", 1);
				$("#tabs").tabs("enable", 0);

				$("#releaseDate").datepicker({dateFormat: "yy-mm-dd", autoSize:true});

				$.ajaxSetup({
					  "error":function() {   
						   alert('<spring:message code="error.movieserviceimpl.get" />');
						   $("#tabs").hide();
				}});
				
				//GET Movie
				$.getJSON("<c:url value='/jqueryMovieTree.do?method=get' />&movieId=" + id, function(data){
					document.movieForm.movieId.value = data.movie.movieId;
					document.movieForm.title.value = data.movie.title;
					document.movieForm.director.value = data.movie.director;
					document.movieForm.actors.value = data.movie.actors;
					document.movieForm.genreId.value = data.movie.genre.genreId;
					
					if(data.movie.nowPlaying == "Y"){
						document.movieForm.nowPlaying.checked = true;
					}
					else{
						document.movieForm.nowPlaying.checked = false;
					}

					//for safari
					document.getElementById("releaseDate").value=convertTimeStampToDate(data.movie.releaseDate);
					
					if(document.getElementById("releaseDate").value=="null"){
						document.getElementById("releaseDate").value="";
					}
					document.movieForm.runtime.value = data.movie.runtime;

					document.movieForm.filePaths.value = data.movie.filePaths;
					if(data.movie.filePaths == null || data.movie.filePaths == ""){
						$("#imgSrc").hide();
						$("#imgTxt").show();
					}
					else{
						jQuery("#poster").attr("src", "${ctx}"+document.movieForm.filePaths.value);
						$("#imgSrc").show();
						$("#imgTxt").hide();
					}

					document.movieForm.ticketPrice.value = data.movie.ticketPrice;

					$('#genreId').msDropDown();
					
				});
			
				$.getJSON("<c:url value='/jqueryMovieTree.do?method=getGenre'/>&genreId="  + pid, function(data){
					document.genreForm.genreId1.value = data.genre.genreId;
					document.genreForm.name.value = data.genre.name;
				}); 
			}
			$("#tabs").show();
		});
		
		$("#movieSearch").click( function(TREE_OBJ) {
			$("#tabs").hide();	
			$("#tree").jstree("refresh");
		});

		$("#searchKeyword").autocomplete({
			source: function( request, response ) {
		    	$.ajax({
		    		type : 'POST',
		    		url : "<c:url value='/jqueryMovieTree.do?method=getGenreNameList' />",
	    			contentType : 'application/x-www-form-urlencoded;charset=UTF-8',
	    			//data : jsonData,
	    			data: {
		                term: request.term 
		            },
	    			dataType: 'json',
	    			success : function(data){
            		  	  response($.map(data.autoData, function(item) {
	            		  	  return {
	            	      	  	  label: item.name,
	            	      	      value: item.name
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
		
		
		// auto click by enter key
		$("#searchKeyword").keypress(function (e) {
			if (e.which == 13){
				$("#movieSearch").trigger("click");
				return false;
			}
		});
		
		$("#refresh").click( function() {
			$("#tree").jstree("refresh");
		});

	});
	
	function createContextMenu(node) {
		var default_object = {
				remove : {}
			};
		
		var pid = node.parents('li:eq(0)').attr('id'); 
		var id = node.attr('id');
		if(pid == undefined){//genre
			default_object = {
				remove : {
					label : '<spring:message code="movie.button.remove" />',
					_disabled : true
				}
			};
		}else{//movie
			default_object = {
				remove : {
					label :  '<spring:message code="movie.button.remove" />',
					action : function(obj) {
						if(this.is_selected(obj)) { 
							this.remove(); 
						} else { 
							this.remove(obj); 
						} 
					}
				}
			};
		}
		return default_object;
	}
	

	//DatePicker에 yyyy-mm-dd 형식의 날짜를 전달하기 위한 Formatter 함수
	function convertTimeStampToDate(cellval) {
		//cellval의 type은 String. new Date객체를 생성.
		if(cellval == null || cellval == "") {
			return "";	
		}
		var date = new Date(cellval);

		var curr_date = date.getDate();
		if(curr_date < 10) curr_date = "0"+curr_date;
		
		var curr_month = date.getMonth();
		curr_month++; // date.getMonth()에서 January의 값은 0이다.
		if(curr_month < 10) curr_month = "0"+curr_month;
		
		var curr_year = date.getFullYear();
		
		return curr_year + "-" + curr_month + "-" + curr_date;
	}
-->
</script>

<div id="content" style="height:auto;width:800px;margin-left:240px;">
  	
  	<div class="cont_top">
  		<h2><spring:message code='movie.heading'/></h2>
  	</div>
    
    <div id="lefttree">
        <div id="treeSearchForm">
		    <form method="post" id="searchForm" name="searchForm" onsubmit="javascript:return false;">
                <label for="searchKeyword">Genre: <input type="text" name="searchKeyword" id="searchKeyword" class="ct_input_g" /></label>
				<input type="image" id="movieSearch" name="movieSearch" alt="Search" src="<c:url value='/sample/images/btn_search_i.gif'/>"/>
				<input type="image" id="refresh" name="refresh" alt="Refresh" src="<c:url value='/sample/images/btn_refresh_i.gif'/>"/>
	        </form>
	    </div>    
    	<div id="tree" class="demo" style="overflow: auto; height: 445px; width: 280px; border: 1px solid #C9CFDD;">
			<span>listNode</span>
		</div> 
    </div>
    
    <div id="rightcontents2">
	    <div id="tabs" style="display:none;">  
			<ul>
				<li><a href="#genreTab">Genre Information</a></li>
				<li><a href="#movieTab">Movie Information</a></li>
			</ul>  <!-- tab containers --> 
			<div id="genreTab">
			<form method="post" id="genreForm" name="genreForm">
				<table summary="This table shows detail information about genre" width="430">
					<caption>Detail information</caption>
			        <colgroup>
			        	<col style="width:40%;" />
			            <col style="width:60%;" />
			        </colgroup>
			        <tbody>
						<tr>
							<th><label for="genreId1"><spring:message code="genre.id"/>&nbsp;</label></th>
							<td>
								<input type="text" name="genreId1" id="genreId1" class="ct_input_g" size="40" maxlength="50" readonly="readonly"/>
							</td>
						</tr>
						<tr>
							<th><label for="name"><spring:message code="genre.name"/>&nbsp;</label></th>
							<td>
								<input type="text" name="name" id="name" class="ct_input_g" size="40" maxlength="50" readonly="readonly"/>
							</td>
						</tr>
					</tbody>
				</table>
			</form>
			</div>
			<div id="movieTab">
				<form:form modelAttribute="movie" method="post" id="movieForm" name="movieForm" enctype="multipart/form-data">
					<form:hidden path="movieId" />
					<table width="430" summary="This table shows detail information about title, director, actors, runtime, release date, ticket price of the movie">
						<caption>Detail information</caption>
				        <colgroup>
				        	<col style="width:40%;" />
				            <col style="width:60%;" />
				        </colgroup>
			        	<tbody>
			        		<tr>
								<th><label for="title"><spring:message code="movie.title"/>&nbsp;</label></th>
								<td>
									<form:input path="title" cssClass="required ct_input_g" cssErrorClass="text medium error" cssStyle="width:150px;" size="40" maxlength="50" />
								</td>
							</tr>
							<tr>
								<th><label for="director"><spring:message code="movie.director"/>&nbsp;</label></th>
								<td>
									<form:input path="director" cssClass="required ct_input_g" cssErrorClass="text medium error" cssStyle="width:150px;" size="40" maxlength="50" />
								</td>
							</tr>
							<tr>
								<th><label for="genreId"><spring:message code="movie.genre"/>&nbsp;</label></th>
								<td>
									<form:select id="genreId" path="genre.genreId"  cssStyle="width:155px;">
						              <form:options items="${genreList}" itemValue="genreId" itemLabel="name"/>
						           </form:select>
								</td>
							</tr>
							<tr>
								<th><label for="actors"><spring:message code="movie.actors"/>&nbsp;</label></th>
								<td>
									<form:input path="actors" cssClass="required ct_input_g"  cssErrorClass="text medium error" cssStyle="width:150px;" size="40" maxlength="50" />
								</td>
							</tr>
							<tr>
								<th><label for="runtime"><spring:message code="movie.runtime"/>&nbsp;</label></th>
								<td>
									<form:input path="runtime" cssClass="number ct_input_g" cssErrorClass="text medium error"  cssStyle="width:150px;" size="40" maxlength="3" /> min.
								</td>
							</tr>
							<tr>
								<th><label for="releaseDate"><spring:message code="movie.releaseDate"/>&nbsp;</label></th>
								<td>
									<form:input path="releaseDate" id="releaseDate" cssClass="dateISO ct_input_g" cssErrorClass="text medium error"  cssStyle="width:150px;" size="40" maxlength="10" />
								</td>
							</tr>
							<tr>
								<th><label for="ticketPrice"><spring:message code="movie.ticketPrice"/>&nbsp;</label></th>
								<td>
									<form:input path="ticketPrice" cssClass="number ct_input_g" cssErrorClass="text medium error" cssStyle="width:150px;" size="40" maxlength="4" />
								</td>
							</tr>
							<tr>
								<th><label for="nowPlaying1"><spring:message code="movie.nowPlaying"/>&nbsp;</label></th>
								<td>
									<spring:message code="movie.isNowPlaying"/><form:checkbox path="nowPlaying" value="Y"/>
								</td>
							</tr>
							<tr>
								<th><label for="poster"><spring:message code="movie.posterFile"/>&nbsp;</label></th>
								<td>
									<div id="imgSrc">
										<img id="poster" src="<c:url value="${movie.filePaths}"/>"
											alt="<anyframe:message code='movie.posterFile'/>" border="0" width="80" height="100" />
										<form:hidden path="filePaths"/>
									</div>
									<div id="imgTxt">
										No Poster Image
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					<!-- begin of button -->
					<div class="btncontainer_center">
				        <span class="button default icon">
				            <span class="update"></span>
				            <input type="submit" id="updatelink" value="<spring:message code='movie.button.update' />" />
				        </span>
					</div>
				</form:form>
			</div>
		</div>
    </div>
</div>

<hr />
<%@ include file="/sample/common/bottom.jsp"%>
