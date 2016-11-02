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
		/* $.pnotify({
			title: "Server push example",
	        text: "A movie has been registered!",
	        cornerclass: "",
	        closer_hover: false,
	        sticker_hover: false,
	        width: "20%",
	        before_open: function(pnotify) {
	            // Position this notice in the center of the screen.
	            pnotify.css({
	                "top": 25,  // ($(window).height() / 2) - (pnotify.height() / 2),
	                "left": 200 //($(window).width() / 2) - (pnotify.width() / 2)
	            });
	        }
		}); */
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