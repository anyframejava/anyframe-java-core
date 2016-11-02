<!-- jquery & superfish(menu plugin)-->
<script type="text/javascript" src="<c:url value='/jquery/jquery/jquery-1.7.2.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/jquery/jquery/superfish/superfish.js'/>"></script>
<link rel="stylesheet" media="screen" href="<c:url value='/jquery/jquery/superfish/superfish.css'/>" /> 
<link rel="stylesheet" media="screen" href="<c:url value='/jquery/jquery/superfish/superfish-vertical.css'/>" /> 
<link rel="stylesheet" href="<c:url value='/jquery/css/jquery.css'/>" type="text/css" />

<!-- jquery ui & jquery tab css-->
<script type="text/javascript" src="<c:url value='/jquery/jquery/jquery-ui/jquery-ui-1.8.22.custom.min.js'/>"></script>
<link href="<c:url value='/jquery/jquery/jquery-ui/themes/smoothness/jquery-ui-1.8.22.custom.css'/>" rel="stylesheet" type="text/css" />

<!-- jqGrid -->
<script type="text/javascript" src="<c:url value='/jquery/jquery/jqgrid/i18n/grid.locale-en.js'/>"></script>
<script type="text/javascript" src="<c:url value='/jquery/jquery/jqgrid/jquery.jqGrid.min.js'/>"></script>
<link href="<c:url value='/jquery/jquery/jqgrid/ui.jqgrid.css'/>" rel="stylesheet" type="text/css" />
 
<!-- jquery:jstree-1.0.RC3 -->
<script type="text/javascript" src="<c:url value='/jquery/jquery/jstree/jquery.jstree.js'/>"></script>
	
<!-- jquery uploadify -->
<link type="text/css" href="<c:url value='/jquery/jquery/uploadify/uploadify.css'/>" rel="stylesheet" />
<script src="<c:url value='/jquery/jquery/uploadify/jquery.uploadify-3.1.js'/>" type="text/javascript"></script>
<script src="<c:url value='/jquery/jquery/jqueryUpload.js'/>" type="text/javascript"></script>
 
<!-- jquery image dropdown -->
<script type="text/javascript" src="<c:url value='/jquery/jquery/msdropdown/msdropdown/js/jquery.dd.js'/>"></script>
<link href="<c:url value='/jquery/jquery/msdropdown/msdropdown/dd.css'/>" rel="stylesheet" type="text/css" />

<!--  quick pager -->
<script type="text/javascript" src="<c:url value='/jquery/jquery/quickpager/quickpager.mod.jquery.js'/>"></script>
<link rel="stylesheet" href="<c:url value='/jquery/jquery/quickpager/pagination.css'/>" type="text/css" />

<!-- validator -->
<script type="text/javascript" src="<c:url value='/jquery/jquery/validation/jquery.validate.min.js'/>"></script>

<!-- Form -->		
<script type="text/javascript" src="<c:url value='/jquery/jquery/form/jquery.form.js'/>"></script>
	
<!-- logger -->
<script src="<c:url value='/jquery/jquery/logger.js'/>" type="text/javascript"></script>

<!-- jquery Sample Page View CSS file -->
<link rel="stylesheet" href="<c:url value='/jquery/css/jquery-sample-view.css'/>" type="text/css" />



<script type='text/javascript'>
$(document).ready(function() {
	$('ul.sf-menu').superfish();
});
</script>  

<div id="jquery-menu">
	<ul class="sf-menu sf-vertical">
		<li>
			 <a href="<c:url value='/jqueryCategoryFinder.do?method=listView'/>">Grid Example</a>
		</li>
		
		<li>
			 <a href="<c:url value='/jqueryBoardFinder.do?method=listView'/>">Grid+Form Example</a>
		</li>
		
		<li>
			 <a href="<c:url value='/jqueryUserFinder.do?method=listView'/>">treeGrid Example</a>
		</li>
		
		<li>
			 <a href="<c:url value='/jqueryCommunityFinder.do?method=listView'/>">treeGrid+Form Example</a>
		</li>
	</ul>
</div>