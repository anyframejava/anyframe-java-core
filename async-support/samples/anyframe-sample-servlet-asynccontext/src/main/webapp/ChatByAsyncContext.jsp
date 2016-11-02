<%@ page language="java" contentType="text/html; charset=EUC-KR" pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Chat</title>
<script src="./jquery-1.9.0.js" type="text/javascript"></script>
<script type="text/javascript">
	var chatapp = {
		append : function(msg) {
			$("#chatmessage").append("<div>" + msg.message + "</div>");
		}
	};

	$(function() {
		$("#sendBtn").click(function() {
			var msg = $("#message").val();
			$.ajax({
				type : "POST",
				url : 'sendMessageServlet',
				data : {
					message : msg
				},
				success : function(data) {
				}
			});
			$("#message").val("");
		});
		document.getElementById("comet-frame").src = "enterServlet";
	});
</script>
</head>
<body>
	<h1>Chatting Window</h1>
	<div id="chatmessage"></div>
	<input type="text" name="message" id="message" />
	<input type="button" name="sendBtn" id="sendBtn" value="보내기" />
	<iframe id="comet-frame" style="display: none;"></iframe>
</body>
</html>