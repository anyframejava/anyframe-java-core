<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<%@ include file="/sample/common/taglibs.jsp"%>
<%@ taglib uri="http://www.anyframejava.org/tags/simpleweb" prefix="simpleweb" %>
<script type="text/javascript">
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
					url: "<c:url value='/simplejson.do?layout=jqueryLayout&service=simplewebJqueryMovieService.update(movie)&viewName=jsonView' />",
					beforeSubmit:  showRequest,
					success: showResponse
					});
			}
		});
		$("#genreId").msDropDown();

		$("#tabs").tabs({remote : true,	disabled: [0, 1]});
		
		$("#tabs").hide();
		
		$("#tree").tree({
			data : {type : "json", async : true, opts : {method : "POST", url : "<c:url value='/simplejquerytree.do?service=simplewebJqueryGenreService.getGenreList(searchVO)&viewName=jsonView' />"}},
			ui : { theme_name : "apple"},
			types : {"default" : {draggable : false}, "root" :{"icon" : {"image" : "./simpleweb-jquery/images/icons.png"}},"lockedroot" :{"icon" : {"image" : "./simpleweb-jquery/images/lockedicons.png"}}, "leaf" : {"icon" : {"image" : "./simpleweb-jquery/images/leaficons.png"}}},
			plugins : {	contextmenu : {	items : {create : false, rename : false}}},
			callback : {
				beforeopen : function (NODE, TREE_OBJ) {
					var nodeId = NODE.id;
					TREE_OBJ.settings.data.opts.url = "<c:url value='/simplejquerytree.do?service=simplewebJqueryMovieFinder.getListByCategory(searchVO)&searchKeyword="+nodeId+"&viewName=jsonView' />";
				},
								
				beforedata	: function(NODE, TREE_OBJ) {
					if(NODE==false){
						TREE_OBJ.settings.data.opts.url = "<c:url value='/simplejquerytree.do?service=simplewebJqueryGenreService.getGenreList(searchVO)&viewName=jsonView' />";
						return {id : $(NODE).attr("id") || "0",searchKeyword : NODE.id || document.getElementById("searchKeyword").value}
					}
					else{return {id : $(NODE).attr("id") || "0"}}
				},
				beforecreate : function(NODE) {
					if($(NODE).parents("li:eq(0)").attr("id")!=null){return alert("can not create here!");}
					return true;
				},
				oncreate : function(NODE, REF_NODE, TYPE, TREE_OBJ, RB) {
					var genreId = $(NODE).parents("li:eq(0)").attr("id");
					var title = NODE.data;
					$.post("<c:url value='/simplejson.do?layout=jqueryLayout&service=simplewebJqueryMovieService.create(movie)&viewName=jsonView'/>",
							{title : NODE.data, director : "", actors : "", "genre.genreId" : $(NODE).parents("li:eq(0)").attr("id")}, function(data) {});
				},
				beforedelete : function(NODE) {
					if($(NODE).parents("li:eq(0)").attr("id")==null){
						return alert("can not delete genre!");
					}
					return confirm("Are you sure you want to delete this movie?");
				},
				ondelete : function(NODE, TREE_OBJ, RB) {
					$.post("<c:url value='/simplejson.do?layout=jqueryLayout&service=simplewebJqueryMovieService.remove(movieId)&viewName=jsonView'/>",
						{ movieId : NODE.id}, function(data) {});
				},
				onselect : function(NODE, TREE_OBJ) {
					var nodeId = NODE.id;
					var genreIdVal;
					if($(NODE).parents("li:eq(0)").attr("id")!=null){
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
						
						$.getJSON("<c:url value='/simplejson.do?layout=jqueryLayout&service=simplewebJqueryMovieService.get(movieId)&viewName=jsonView&movieId=' />" + nodeId, function(data){
							
							document.movieForm.movieId.value = data.autoData.movieId;
							document.movieForm.title.value = data.autoData.title;
							document.movieForm.director.value = data.autoData.director;
							document.movieForm.actors.value = data.autoData.actors;
							document.movieForm.genreId.value = data.autoData.genre.genreId;
							if(data.autoData.nowPlaying == "Y"){
								document.movieForm.nowPlaying.checked = true;
							}
							else{
								document.movieForm.nowPlaying.checked = false;
							}
 
							//for safari
							document.getElementById("releaseDate").value=data.autoData.releaseDate;
							
							if(document.getElementById("releaseDate").value=="null"){
								document.getElementById("releaseDate").value="";
							}
							document.movieForm.runtime.value = data.autoData.runtime;

							document.movieForm.filePaths.value = data.autoData.filePaths;
							if(data.autoData.filePaths == null || data.autoData.filePaths == ""){
								$("#imgSrc").hide();
								$("#imgTxt").show();
							}
							else{
								jQuery("#poster").attr("src", "${ctx}"+document.movieForm.filePaths.value);
								$("#imgSrc").show();
								$("#imgTxt").hide();
							}

							document.movieForm.ticketPrice.value = data.autoData.ticketPrice;

							$('#genreId').msDropDown();
							
						});

						var parentNode = $(NODE).parents("li:eq(0)").attr("id");	
									
						$.getJSON("<c:url value='/simplejson.do?layout=jqueryLayout&service=simplewebJqueryGenreService.getGenre(genreId)&viewName=jsonView&genreId=' />" + parentNode, function(data){
							document.genreForm.genreId1.value = data.autoData.genreId;
							document.genreForm.name.value = data.autoData.name;
						}); 
					}
					else{
						$("#tabs").show();
						$("#tabs").tabs("enable", 0);
						$("#tabs").tabs("select", 0);
						$("#tabs").tabs("disable", 1);
						$.getJSON("<c:url value='/simplejson.do?layout=jqueryLayout&service=simplewebJqueryGenreService.getGenre(genreId)&viewName=jsonView&genreId=' />" + nodeId, function(data){
							document.genreForm.genreId1.value = data.autoData.genreId;
							document.genreForm.name.value = data.autoData.name;
						}); 
					}
				}
			}
		});
		$("#movieSearch").click( function(TREE_OBJ) {$("#tabs").hide();	$.tree.focused().refresh();});
		
		$("#searchKeyword").autocomplete({
			source: function( request, response ) {
		    	$.ajax({
		    		type : 'POST',
	    			url : "<c:url value='/simplejson.do?layout=jqueryLayout&service=simplewebJqueryGenreService.getGenreNameList(term)&viewName=jsonView' />",
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
		
		/* auto click by enter key */
		$("#searchKeyword").keypress(function (e) {
			if (e.which == 13){
				$("#movieSearch").trigger("click");
				return false;
			}
		});
		$("#refresh").click( function() {
			$.tree.focused().refresh();
		});

	});
//-->
</script>
<div id="body">
<!--************************** begin of contents *****************************-->
<!-- begin of title -->
<div id="hiddenDiv"></div>
<table width="100%" height="24" border="0" cellpadding="0" cellspacing="0">
	<tr>
		<td height="24">
		<table width="780" height="24" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td height="24" class="ct_ttl01" style="padding-left: 12px">Movie Information</td>
			</tr>
		</table>
		</td>
	</tr>
</table>
	<!-- end of title -->


<table >
	<tr>
		<td>
			<!-- begin of search -->
			<div id="searchForm">
			<form method="post" id="searchForm" name="searchForm">
				<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 10px; vertical-align: center;">
					<tr>
						<td><label>Genre: <input type="text" name="searchKeyword" id="searchKeyword" class="ct_input_g" /></label>
						</td>
						<td align="left">
							<a href="#" id="movieSearch"><img src="<c:url value='/sample/images/btn_search.png'/>" width="25" height="18" border="0" align="middle"/></a>
							<a href="#" id="refresh"><img src="<c:url value='/simpleweb-jquery/images/btn_refresh.png'/>" width="26" height="23" border="0" align="middle"/></a>
						</td>
						<td></td>
					</tr>
				</table>
			<!-- end of search -->
			</form>
			</div>
		</td>
	</tr>
</table>
<table >
	<tr>
		<td valign="top">
			<table width="280" height="450"  >
				<tr>
					<td  width="280" height="450">
					<div id="tree" class="demo" style="overflow: auto; height: 445px; width: 280px; border: 1px solid #C9CFDD;">
						<span>listNode</span>
					</div>
					</td>
				</tr>
			</table>
		</td>
		<td valign="top">
			<table >
				<tr>
					<td align="left" valign="top">
					<div id="tabs">  
						<ul>
							<li><a href="#genreTab">Genre Information</a></li>
							<li><a href="#movieTab">Movie Information</a></li>
						</ul>  <!-- tab containers --> 
						<div id="genreTab">
						<form method="post" id="genreForm" name="genreForm">
							<table width="430" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td width="150" class="ct_td">Genre ID &nbsp;</td>
									<td bgcolor="D6D6D6" width="1"></td>
									<td class="ct_write01">
									<input type="text" name="genreId1" id="genreId1" class="ct_input_g" size="40" maxlength="50" readonly="true"/>
									</td>
								</tr>
								<tr>
									<td height="1" colspan="3" bgcolor="D6D6D6"></td>
								</tr>
								<tr>
									<td width="150" class="ct_td">name</td>
									<td bgcolor="D6D6D6" width="1"></td>
									<td class="ct_write01">
									<input type="text" name="name" id="name" class="ct_input_g" size="40" maxlength="50" readonly="readonly"/>
									</td>
								</tr>
							</table>
						</form>
						</div>
						<div id="movieTab">
							<form:form modelAttribute="movie" action="/simplejson.do?layout=jqueryLayout&service=simplewebJqueryMovieService.update(movie)&viewName=jsonView" method="post" id="movieForm" name="movieForm" enctype="multipart/form-data">
								<table width="430" border="0" cellspacing="0" cellpadding="0">
									<form:hidden path="movieId" />
									<tr>
										<td width="150" class="ct_td"><spring:message code="movie.title" />&nbsp;*</td>
										<td bgcolor="D6D6D6" width="1"></td>
										<td class="ct_write01">
										<form:input path="title" cssClass="required ct_input_g" cssErrorClass="text medium error" cssStyle="width:150px;" size="40" maxlength="50" />
										</td>
									</tr>
									<tr>
										<td height="1" colspan="3" bgcolor="D6D6D6"></td>
									</tr>
									<tr>
										<td width="150" class="ct_td"><spring:message code="movie.director" />&nbsp;*</td>
										<td bgcolor="D6D6D6" width="1"></td>
										<td class="ct_write01"><form:input path="director" cssClass="required ct_input_g" cssErrorClass="text medium error" cssStyle="width:150px;" size="40" maxlength="50" />
										</td>
									</tr>
									<tr>
										<td height="1" colspan="3" bgcolor="D6D6D6"></td>
									</tr>
									<tr>
										<td width="150" class="ct_td"><spring:message code="movie.genre" />&nbsp;*</td>
										<td bgcolor="D6D6D6" width="1"></td>
										<td class="ct_write01">
											<form:select id="genreId" path="genre.genreId"  cssStyle="width:210px;">
								              <form:options items="${genreList}" itemValue="genreId" itemLabel="name"/>
								           </form:select>
										</td>
									</tr>
									<tr>
										<td height="1" colspan="3" bgcolor="D6D6D6"></td>
									</tr>
									<tr>
										<td width="150" class="ct_td"><spring:message code="movie.actors" />&nbsp;*</td>
										<td bgcolor="D6D6D6" width="1"></td>
										<td class="ct_write01">
										<form:input path="actors" cssClass="required ct_input_g"  cssErrorClass="text medium error" cssStyle="width:150px;" size="60" maxlength="50" /></td>
									</tr>
									<tr>
										<td height="1" colspan="3" bgcolor="D6D6D6"></td>
									</tr>
									<tr>
										<td width="150" class="ct_td"><spring:message code="movie.runtime" /></td>
										<td bgcolor="D6D6D6" width="1"></td>
										<td class="ct_write01"><form:input path="runtime" cssClass="number ct_input_g" cssErrorClass="text medium error" size="10" maxlength="3" /> min.
										</td>
									</tr>
									<tr>
										<td height="1" colspan="3" bgcolor="D6D6D6"></td>
									</tr>
									<tr>
										<td width="150" class="ct_td"><spring:message code="movie.releaseDate" /></td>
										<td bgcolor="D6D6D6" width="1"></td>
										<td class="ct_write01"><form:input path="releaseDate" id="releaseDate" cssClass="dateISO ct_input_g"
											cssErrorClass="text medium error" maxlength="10" />
											</td>
									</tr>
									<tr>
										<td height="1" colspan="3" bgcolor="D6D6D6"></td>
									</tr>
									<tr>
										<td width="150" class="ct_td"><spring:message code="movie.ticketPrice" /></td>
										<td bgcolor="D6D6D6" width="1"></td>
										<td class="ct_write01"><form:input path="ticketPrice" cssClass="number ct_input_g" cssErrorClass="text medium error" maxlength="4" />
										</td>
									</tr>
									<tr>
										<td height="1" colspan="3" bgcolor="D6D6D6"></td>
									</tr>
									<tr>
										<td width="150" class="ct_td"><spring:message code="movie.nowPlaying" /></td>
										<td bgcolor="D6D6D6" width="1"></td>
										<td class="ct_write01">Is this movie now playing ?<form:checkbox path="nowPlaying" value="Y"/>
										</td>
									</tr>
									<tr>
										<td height="1" colspan="3" bgcolor="D6D6D6"></td>
									</tr>		
									<tr>
										<td width="150" class="ct_td">
										<spring:message code="movie.posterFile"/></td>
										<td bgcolor="D6D6D6" width="1"></td>
										<td class="ct_write01" style="vertical-align: center;">
											<div id="imgSrc">
												<img id="poster" src="<c:url value="${movie.filePaths}"/>"
													alt="<spring:message code='movie.posterFile'/>" border="0" width="80" height="100" />
												<form:hidden path="filePaths"/>
											</div>
											<div id="imgTxt">
												No Poster Image
											</div>
										</td>
									</tr>
								</table>
								<!-- begin of button -->
								<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 10px;">
									<tr>
										<td height="24" colspan="2" align="center">
										<input type="image" src="${ctx}/sample/images/btn_update.png" id="updatelink" width="64" height="18" border="0"  />
										</td>
									</tr>
								</table>
							</form:form>
						</div>
					</div>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>

</div>
