/**
 * Javascript Array indexOf function add
 */
Array.prototype.indexOf = function(object) {
	for (var i = 0, length = this.length; i < length; i++)
		if (this[i] == object) return i;
	return -1;
};

/**
 * Javascript String escapeHTML function add
 * @return String
 */
String.prototype.escapeHTML = function() {
	return this.replace(/</g,'&lt;').replace(/>/g, '&gt;');
};


/**
 * logging utility for UI debug
 */
var logger = {
		
	/**
	 * if debug is 'true' print out to display
	 * development time use
	 * usage : logger.log("로그내용...");
	 */
	debug: false,
	log: function(msg) {
		if(this.debug) {
			$('#console').append("<div style='padding:2px;'>" + msg + "</div>");
			$('#console').scrollTop($('#console')[0].scrollHeight);
		}
	}
}

$(document).ready(function() {

	if(logger.debug) {
		$('body').append("<br/><br/><div id='console' style='clear:both;border:1px solid red;width:99%;height:300px;overflow:auto;font-size:9pt;'></div>");
	}
	
});