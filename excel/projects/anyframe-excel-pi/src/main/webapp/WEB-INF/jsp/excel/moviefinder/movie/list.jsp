<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/excelMovieFinder.do?method=list'/>">Excel 1.0.6-SNAPSHOT</a></div>
    </div>
    <hr />
<script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>    
<script type="text/javascript">
		function fncSearchMovie() {
		   	document.searchForm.action="<c:url value='/excelMovieFinder.do?method=list'/>";
		   	document.searchForm.submit();						
		}	
		function fncExcelDownload() {
			document.excelDownloadForm.queryId.value="excel.findMovieListForExcel";
			document.excelDownloadForm.action="<c:url value='/excelDownload.do?method=excelDownload'/>";
			document.excelDownloadForm.submit();	
		}	
		function fncExcelUpload() {
			document.excelUploadForm.queryId.value = "excel.excelMovieInsert";
			
			var filePath = document.excelUploadForm.excelFile.value;
			if(filePath.indexOf('.xls') == -1){
				alert("It is not excel file!");
				return;
			}
			
			document.excelUploadForm.action="<c:url value='/excelDownload.do?method=excelUpload'/>";
			document.excelUploadForm.submit();	
		}	
	</script>
	<div id="container">
        <div class="cont_top">
        	<h2><spring:message code='movie.heading'/></h2>
        </div>
		<form:form modelAttribute="movie" method="post" name="searchForm">	
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
			                <c:forEach var="movie" items="${movies}">
				                <tr>
									<td>${movie.genreName}</td>
									<td>${movie.title}</td>
									<td align="left">${movie.director}</td>
									<td align="left">${movie.actors}</td>
									<td align="center">${movie.ticketPrice}</td>
									<td align="center">${movie.releaseDate}</td>
								</tr>
							</c:forEach>
						</tbody>
		        </table>
		    </div>
		    <div class="listunder_container">           
		         <div class="list_paging">
		             <anyframe:pagenavigator linkUrl="javascript:fncSearchMovie();" pages="${resultPage}"/>
		         </div>
		     </div>
		</form:form>	
		
         <div class="listunder_container">
            <div class="list_underbtn_right">
	         	<form:form id="excelUploadForm" method="post" name="excelUploadForm" enctype="multipart/form-data">
					<input id="excelFile" type="file" name="excelFile"/>
					<input id="queryId" name="queryId" type="hidden" value="" />
					<input name="columnInfoFile" type="hidden" value="movie" />
					<input name="resultPage" type="hidden" value="redirect:/excelMovieFinder.do?method=list" />
				</form:form>
				<div class="margin_top10">
                <a href="javascript:fncExcelUpload();">
                <span class="button default icon">   
                    <span class="fileupload">&nbsp;</span>
                    <span class="none_a txt_num10">Excel Up</span>
                </span>
                </a>  
                <a href="javascript:fncExcelDownload();">
                <span class="button default icon">   
                    <span class="filedownload">&nbsp;</span>
                    <span class="none_a txt_num12">Excel Down</span>
                </span>
                </a>          
                </div>                     
            </div>        
         </div>
         
		<form:form id="excelDownloadForm" method="post" name="excelDownloadForm">
			<input name="queryId" type="hidden" value="" />
			<input name="title" type="hidden" value="" />
			<input name="nowPlaying" type="hidden" value="Y" />
			<input name="fileName" type="hidden" value="movie" />
			<input name="columnInfoFile" type="hidden" value="movie" />
		</form:form>
		</div>
    <hr />
<%@ include file="/sample/common/bottom.jsp"%>