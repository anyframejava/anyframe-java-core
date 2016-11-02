// Must be loaded jQuery Library
( function (window) {
	
	var isjQueryUsable = !(!window.jQuery),
	
		_window = window,
	
		xmlHttp;
	
	
	function _loadUrl(url, elmId, onxmlhttpchange) {
		
		//isjQueryUsable = false;
		
		if (isjQueryUsable)
		{
			$.ajax( {
					url: url,
					type: 'GET',
					async: false,
					//crossDomain: true,
					//dataType: "jsonp",
					error: function(jqXHR, textStatus, errorThrow)
					{
						alert("ajax error.. called..");
					},
					success: function(data, textStatus, jqXHR)
					{
						//console.log("success..called..");
						//var hostE = document.getElementById(elmId);
						//hostE.innerText = data;
						$("#"+elmId).text(data);
					}
			});

		}
		else
		{
			if (window.XMLHttpRequest)
			{
				xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = onxmlhttpchange;
				xmlhttp.open("GET",url,false);
				//xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
				xmlhttp.send(null);
			}
			else if (window.ActiveXObject)
			{
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				
				if (xmlhttp)
				{
					xmlhttp.onreadystatechange = onxmlhttpchange;
					xmlhttp.open("GET",url,false);
					xmlhttp.send(null);
				}
			}			
		}		

	}
	

	var JTemplate = {
	};	
	
	JTemplate.load = function(url, elmId) {
		
		var selElemId = "codeExample";
		
		if (arguments.length == 2) {
			selElemId = elmId;
		}
		
		_loadUrl(url, selElemId, function() {
			
			//TODO: need refactoring
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
				var hostE = document.getElementById(selElemId);
				hostE.innerText = xmlhttp.responseText;
				
				SyntaxHighlighter.defaults['toolbar'] = false;
				SyntaxHighlighter.highlight();
			}			
		});
		
		//Apply SyntaxHighlighter
		SyntaxHighlighter.defaults['toolbar'] = false;
		SyntaxHighlighter.highlight();
		
		//Show SyntaxHighlighter
		SyntaxHighlighter.defaults['html-script'] = true;
		SyntaxHighlighter.defaults['toolbar'] = false;
		SyntaxHighlighter.all();
	};
	
	JTemplate.multiCodeSampleLoad = function(multiUrlElemStr) {		// format: "url1,elmId1,url2,elmId2,..." 
		
		var inputArry = multiUrlElemStr.split(",");
		
		if (inputArry.length == 0 || inputArry.length % 2 != 0)
		{
			alert("JTemplate.multiCodeSampleLoad : input error! (no input or odd input)");
			return;
		}
		
		//  build document
		for (var ix=0,ilen=inputArry.length/2; ix < ilen; ix++)
		{
			var url = $.trim( inputArry[ ix * 2 + 0 ] ),
				elm = $.trim( inputArry[ ix * 2 + 1 ] );
			
			_loadUrl(url, elm, function() {				
				//TODO: need refactoring
				if (xmlhttp.readyState==4 && xmlhttp.status==200)
				{
					var hostE = document.getElementById(elm);
					hostE.innerText = xmlhttp.responseText;
				}					
			});
			
			if (ix == (ilen - 1))
			{
				SyntaxHighlighter.defaults['toolbar'] = false;
				SyntaxHighlighter.highlight();
			}
		}
		
		//Apply and Show SyntaxHighlighter
		SyntaxHighlighter.defaults['html-script'] = true;
		SyntaxHighlighter.defaults['toolbar'] = false;
		SyntaxHighlighter.all();
	};
	
	
	JTemplate.loadDemo = function(url, undefined) {
		var selectorContainer = "#visualExample",
			idContainer = selectorContainer.replace(/[^a-zA-Z0-9-_:.]/g, "");
		
		//force to set iFrame for everything
		//if (/MSIE/.test(navigator.userAgent)) {
			var iframehtml = "<iframe id='" + idContainer + "' " +
									 "src='" + url + "' " +
								     "frameborder=0 width='95%' height='95%' />";
			
			$(selectorContainer).replaceWith(iframehtml);
			
			// insert the link of original source page
			$(selectorContainer).prev().wrap("<a href='" + url + "' target='_blank' />");
		//}
		//else {
		//	$(selectorContainer).load(url);
		//}
	};
	
	JTemplate.loadDemoWithBorder = function(url, undefined) {
		var selectorContainer = "#visualExample",
			idContainer = selectorContainer.replace(/[^a-zA-Z0-9-_:.]/g, "");
			
			//force to set iFrame for everything
			//if (/MSIE/.test(navigator.userAgent)) {
				var iframehtml = "<iframe id='" + idContainer + "' " +
										 "src='" + url + "' " +
									     "frameborder=1 width='95%' height='95%' />";
				
				$(selectorContainer).replaceWith(iframehtml);
				
				// insert the link of original source page
				$(selectorContainer).prev().wrap("<a href='" + url + "' target='_blank' />");
			//}
			//else {
			//	$(selectorContainer).load(url);
			//}
		
	};
	
	JTemplate.loadDemo2 = function(url, options) {
		var options = options || {},
			params = {
				selector 	: options.selector || "#visualExample",
				width		: options.width || "95%",
				height 		: options.height || "95%",
				border		: options.border || false
			},
			iframehtml = "";
		
		// only use iframe
		iframehtml += "<iframe id='" + ( params.selector.replace(/[^a-zA-Z0-9-_:.]/g, "") ) + "' " +
					  "src='" + ( url ) + "' " +
					  "width='" + ( params.width ) + "' " +
					  "height='" + ( params.height ) + "' " +
					  "frameborder='" + ( params.border ? "1" : "0" ) + "' " +
					  "/>";
		
		$(params.selector).replaceWith(iframehtml);
		$(params.selector).prev().wrap("<a href='" + url + "' target='_blank' />");
	};
	
	JTemplate._init = function() 
	{
		$('div.related a').each(function(idx, elm) {
			var jsAtag = $(elm);
			
			jsAtag.attr('target', '_blank');
			
			if (jsAtag.text() == "")
				jsAtag.text( jsAtag.attr('href') );
		});
		
		$('span.code-line').on('click', function(evt) {
			
			var linetxt = $(this).text(),
				codeAreaIdx = ( $(this).is("[codearea]") ? parseInt( $(this).attr("codearea") ) : 0 ),
				codelineno = (linetxt.match(/#([0-9]+)(\D|$)/))[1],	
				jobjTarget = $(".number" + codelineno);

			if (jobjTarget.length > (codeAreaIdx * 2)) {				
				var offsetTop = calOffsetTop( jobjTarget[codeAreaIdx * 2] );				
				window.scrollTo(0, offsetTop);
			}			
			
			function calOffsetTop(target)
			{
				if (target == null)
					return 0;
				else 
					return (target.offsetTop) + calOffsetTop(target.offsetParent);
			}			
		});
	};
	
	$(document).ready(function() {
		JTemplate._init();
	});
	
	window.JTemplate = JTemplate;	
	
})(window);