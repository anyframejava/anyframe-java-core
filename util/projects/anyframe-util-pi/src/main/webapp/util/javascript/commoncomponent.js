
	var convertBase = function(output, path, jsonData) {
		$.ajax({
			type : 'POST',
			url : makeUrl(path),
			contentType : 'application/x-www-form-urlencoded;charset=UTF-8',
			data : jsonData,
			dataType: 'json',
			success : function(data){
							output.val(data.result);
					  },
		  	error : function(data) {
						  	alert("error!");
					  }
		});
	}

	var convert0 = function() {
		var output = $(this).next();
		var path = $(this).next().attr("id");

		convertBase(output, path);
	}

	var convert1 = function() {
		var input = $(this).prev();
		var output = $(this).next();
		var path = $(this).next().attr("id");

		convertBase(output, path, makeJson1(input));
	}

	var convert2 = function() {
		var input1 = $(this).prev().prev();
		var input2 = $(this).prev();
		var output = $(this).next();
		var path = $(this).next().attr("id");

		convertBase(output, path, makeJson2(input1, input2));
	}

	var convert3 = function() {
		var input1 = $(this).prev().prev().prev();
		var input2 = $(this).prev().prev();
		var input3 = $(this).prev();
		var output = $(this).next();
		var path = $(this).next().attr("id");

		convertBase(output, path, makeJson3(input1, input2, input3));
	}

	var convert4 = function() {
		var input1 = $(this).prev().prev().prev().prev();
		var input2 = $(this).prev().prev().prev();
		var input3 = $(this).prev().prev();
		var input4 = $(this).prev();
		var output = $(this).next();
		var path = $(this).next().attr("id");

		convertBase(output, path, makeJson4(input1, input2, input3, input4));
	}

	function makeJson1(input) {
		return jQuery.parseJSON('{ "' + input.attr('id') + '" : "' + input.val() + '"}');
	}

	function makeJson2(input1, input2) {
		return jQuery.parseJSON('{ "' + input1.attr('id') + '" : "' + input1.val() + '" , "' + input2.attr('id') + '" : "' + input2.val() + '" }');
	}

	function makeJson3(input1, input2, input3) {
		return jQuery.parseJSON('{ "' + input1.attr('id') + '" : "' + input1.val() + '" , "' + input2.attr('id') + '" : "' + input2.val() + '" , "'
                                      + input3.attr('id') + '" : "' + input3.val() + '"  }');
	}

	function makeJson4(input1, input2, input3, input4) {
		return jQuery.parseJSON('{ "' + input1.attr('id') + '" : "' + input1.val() + '" , "' + input2.attr('id') + '" : "' + input2.val() + '" , "'
				                      + input3.attr('id') + '" : "' + input3.val() + '" , "' + input4.attr('id') + '" : "' + input4.val() + '" }');
	}

