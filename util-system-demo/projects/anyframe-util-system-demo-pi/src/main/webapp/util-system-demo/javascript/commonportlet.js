var portletBase = function(headerClick) {
	$( ".column" ).sortable({
		connectWith: ".column"
	});

	$( ".portlet" ).addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
		.find( ".portlet-header" )
			.addClass( "ui-widget-header ui-corner-all" )
			.prepend( "<span class='ui-icon ui-icon-refresh'></span>")
			.prepend( "<span class='ui-icon ui-icon-minusthick'></span>")
			.end()
		.find( ".portlet-content" );

	$( ".portlet-header .ui-icon" ).click(headerClick);

	$( ".column" ).disableSelection();


	$("#searchAll" ).click(function() {
		$(".portlet-header .ui-icon-refresh").each(function(i) {
			$(this).trigger("click");
		});
	});
}

function simpleAutoProperties(obj) {
	info = "<ul>"
	for (var propName in obj) {
		if(obj[propName] instanceof Object) {
			var props = "";
			for(var nestedProp in obj[propName]) {
				props += "<li>" + nestedProp + " : " + obj[propName][nestedProp] + "</li>";
			}
			info += "<li><b>" + propName + "</b><ul>" + props + "</ul></li>";
		} else {
	    	info += "<li>" + propName + " : " + obj[propName] + "</li>";
	    }
	}
	return info + "</ul>";
}

function search(path, callback, requestData) {
	$.ajax({
		type : 'POST',
		url : makeUrl("get"+path),
		contentType : 'application/x-www-form-urlencoded;charset=UTF-8',
		data : requestData,
		dataType: 'json',
		success : callback,
	  	error : function(data) {
					  	alert("error!");
				  }
	});
}


