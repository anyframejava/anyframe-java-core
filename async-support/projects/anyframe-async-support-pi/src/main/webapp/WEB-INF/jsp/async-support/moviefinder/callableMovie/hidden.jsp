<%@ include file="/sample/common/taglibs.jsp"%>

<script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>
<script type="text/javascript" src="<c:url value='/async-support/javascript/jquery-1.8.3.min.js'/>"></script>

<script type="text/javascript">

	$(document).ready(function(){
 		console.log("jquery works");
 		pollNewMessage();
 	});
	
 	function dyn_notice() {
		console.log("dyn_notice() works");
		alert("New movie has been registered!");

	};
	
	function pollNewMessage() {
		console.log("pollNewMessage() works");
	    $.ajax({
	        type:'POST',
	        async:true,
	        url: 'movieBroadCast.do',
	        timeout:10000,
	        success: function (msg) {
	        	console.log("success");
	        	if(msg.indexOf('-1') == 0){
	        		return;
	        	}
	        	else if(msg) {
	        		dyn_notice();
	        	}
	    	},
	    	complete:function(jqXHR, status) {
	    		console.log(status);
	    		pollNewMessage();
	    	}, 
	    	error:function(jqXHR,status,error){
	    		console.log("errrrrrrrrrrrrrrrr");
				if (jqXHR.isAborted) {
					console.log("ajax.complete xhr was aborted ", jqXHR.id);
					return;
				}
	    	}
	    });
	};
</script>