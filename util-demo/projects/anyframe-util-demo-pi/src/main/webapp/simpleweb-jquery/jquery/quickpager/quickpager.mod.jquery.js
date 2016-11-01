//-------------------------------------------------
//		Quick Pager jquery plugin
//		Created by dan@geckonm.com
//		www.geckonewmedia.com
// 
// modified by woos41@samsung.com
// processing Client Scripting with Anyframe Common Page 
//-------------------------------------------------

function Page(pageUnit, pageSize, totalCount, currentPage) {
	this.pageUnit = Math.floor(pageUnit);
	this.pageSize = Math.floor(pageSize);
	this.totalCount = totalCount;
	this.maxPage = (pageSize == 0 ? totalCount : Math.floor((totalCount-1) / pageSize) + 1);
	this.currentPage = currentPage > this.maxPage ? this.maxPage : Math.floor(currentPage);
	this.beginUnitPage = (Math.floor((currentPage - 1) / pageUnit)) * pageUnit + 1;
	this.endUnitPage = (this.beginUnitPage > pageUnit ? this.beginUnitPage : pageUnit) >= this.maxPage ? this.maxPage : this.maxPage < this.beginUnitPage + (pageUnit - 1) ? this.maxPage : this.beginUnitPage + (pageUnit - 1);
}
Page.prototype.hasNextPage = function() {
			return this.currentPage < this.maxPage;
		};
Page.prototype.hasPreviousPage = function() {
	return this.currentPage > 1;
};
Page.prototype.getNextPage = function() {
	return this.currentPage + 1;
};
Page.prototype.getPreviousPage = function() {
	return this.currentPage - 1;
};
Page.prototype.hasNextPageUnit = function() {
	return this.endUnitPage < this.maxPage;
};
Page.prototype.hasPreviousPageUnit = function() {
	return this.currentPage >= this.pageUnit + 1;
};
Page.prototype.getStartOfNextPageUnit = function() {
	return this.endUnitPage + 1;
};
Page.prototype.getStartOfPreviousPageUnit = function() {
	return this.beginUnitPage - 1;
};
Page.prototype.getPageOfNextPageUnit = function() {
	return (this.currentPage + this.pageUnit < this.maxPage)
    ? this.currentPage + this.pageUnit : this.maxPage;
};
Page.prototype.getPageOfPreviousPageUnit = function() {
	return (this.currentPage - this.pageUnit > 1) ? this.currentPage - this.pageUnit : 1;
};
Page.prototype.getEndListPage = function() {
	return this.currentPage;
};


(function($) {
	    
	$.fn.quickPager = function(options) {
	
		var defaults = {
			pageIndexId: "pageIndex",
			searchButtonId: "searchButton",
			searchUrl: "#",
            pageSize: 10,
            currentPage: 1,
			holder: ""
    	};
    	var options = $.extend(defaults, options);
	  	
		//leave this
		var selector = $(this);
		
		var page = new Page(options.pageUnit, options.pageSize, options.totalCount, options.currentPage);
		
		// remove child nodes
		selector.children().remove();

		// draw anchor tags
		if(page.hasPreviousPageUnit()) {
			selector.append('<a href="'+ options.searchUrl +'" class="direction prev"><span></span><span></span> Prev End</a>');
		}
		if(page.hasPreviousPage()) {
			selector.append('<a href="'+ options.searchUrl +'" class="direction prev"><span></span> Prev</a>');
		}
		for(i=page.beginUnitPage; i<=page.endUnitPage; i++) {
			if (i==page.currentPage) {
				selector.append('<strong>'+i+'</strong>');
			} else {
				selector.append('<a href="'+ options.searchUrl +'">'+i+'</a>');
			}
		}
		if(page.hasNextPage()) {
			selector.append('<a href="'+ options.searchUrl +'" class="direction next">Next <span></span></a>');
		}
		if(page.hasNextPageUnit()) {
			selector.append('<a href="'+ options.searchUrl +'" class="direction next">Next End <span></span><span></span></a>');
		}
		
		// add click event handler & calculate appropriate pageIndex
		// make sure that setting options about searchButton & pageIndex id
		selector.find("a").each(function(i) {
			$(this).click( function() {
				if($(this).hasClass("direction")) {
					if($(this).hasClass("next")) {
						if($(this).text().indexOf("End") > 0) {
							$("#"+options.pageIndexId).val(page.maxPage);
						} else {
							$("#"+options.pageIndexId).val(page.getPageOfNextPageUnit());
						}

					} else {
						if($(this).text().indexOf("End") > 0) {
							$("#"+options.pageIndexId).val(1);
						} else {
							$("#"+options.pageIndexId).val(page.getPageOfPreviousPageUnit());
						}
					}
				} else {
					$("#"+options.pageIndexId).val($(this).text());
				}
				$("#"+options.searchButtonId).trigger("click");
			});
		});
			  
	};

})(jQuery);
