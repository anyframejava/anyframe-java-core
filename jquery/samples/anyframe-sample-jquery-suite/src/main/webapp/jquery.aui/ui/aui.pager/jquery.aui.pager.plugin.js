/**
 * Anyframe UI (AUI)
 *
 * Plugin Test Code
 *
 * @author sangjin.nam(sangjiny.nam@samsung.com)
 *
 */


(function($){

    var startpage = 1,
        endpage = 10,
        curpage = 1,
        pagetotal = 10,
        isPageLimitOver = false,
        callfunc1_val = "none",
        baseClass = "aui.pager";

    function _applyPager($parent)
    {
        var paginatorHtml = "";

        paginatorHtml += "<div class=\"Paginator\">\n";
        paginatorHtml += (startpage > 1) ? "<a href=\";page=prev\" class=\"Prev\">Prev</a>\n" :  "<span class=\"Prev\">Prev</span>\n";
        paginatorHtml += _makePager(startpage, endpage, curpage);
        paginatorHtml += (endpage == pagetotal) ? "<span class=\"Next\">Next</span>\n" : "<a href=\";page=next\" class=\"Next\">Next</a>\n";
        paginatorHtml += "</div>\n";

        $parent.append( paginatorHtml );
        //$(ENV.ID_GRID_PAGER + " a").on('click', {owner : this}, this.onclickPage);
    }

    function _makePager(stPager, endPager, curPager)
    {
        var resultHtml = "";

        if (isPageLimitOver && (stPager > 1) ) {
            resultHtml += "<span class=\"break\">...</span>\n";
        }

        for (var px = stPager; px <= endPager; px++) {

            if (px === curPager) {
                resultHtml += "<span class=\"this-page\">" + px + "</span>\n";
            }
            else {
                resultHtml += "<a href=\";page=" + px + "\">" + px + "</a>\n";
            }
        }

        if (isPageLimitOver && (endPager < pagetotal)) {
            resultHtml += "<span class=\"break\">...</span>\n";
        }

        return resultHtml;
    }

    var ext = {
        callFunc1: function(val) {
            console.log(arguments);
            callfunc1_val = val || callfunc1_val;
            alert("pagerFunc1 called.. " + callfunc1_val);
        }

        //TODO: could add options on this

    }


    $.fn.pager = function(options) {

        var preinit = $.data(this[0], "pager");

        if (preinit == undefined) {
            _applyPager(this);
            $.data(this[0], "pager", {});
        }

        if (typeof options === "string") {
            var method = ext[options];

            if (method != undefined && typeof method === "function") {
                method.apply(this, Array.prototype.slice.call(arguments, 1));
            }
        }

        return this;
    }

}(jQuery));