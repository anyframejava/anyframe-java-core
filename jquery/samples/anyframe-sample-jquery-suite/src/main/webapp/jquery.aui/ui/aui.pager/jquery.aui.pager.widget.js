/**
 * Anyframe UI (AUI)
 *
 * Widget Plugin Test Code
 *
 * @author sangjin.nam(sangjiny.nam@samsung.com)
 *
 */


(function($){

    var baseClass = "aui.pager";

    $.widget("aui.pager", {

        _callfunc1_val: "none",

        options: {
            startpage : 1,
            endpage: 10,
            curpage: 1,
            pagetotal: 10,
            isPageLimitOver: false
        },

        _create: function() {
            this.element.addClass(baseClass);
            this._applyPager();
            this._update();
        },

        _setOption: function(key, value) {
            this.options[key] = value;
            this._update();
        },

        _update: function() {

        },

        callFunc1: function(txt) {
            this._callfunc1_val = txt || this._callfunc1_val;
            alert("pagerFunc1 called.. " + this._callfunc1_val);
        },

        _applyPager: function()
        {
            var paginatorHtml = "";

            paginatorHtml += "<div class=\"Paginator\">\n";
            paginatorHtml += (this.options.startpage > 1) ? "<a href=\";page=prev\" class=\"Prev\">Prev</a>\n" :  "<span class=\"Prev\">Prev</span>\n";
            paginatorHtml += this._makePager(this.options.startpage, this.options.endpage, this.options.curpage);
            paginatorHtml += (this.options.endpage == this.options.pagetotal) ? "<span class=\"Next\">Next</span>\n" : "<a href=\";page=next\" class=\"Next\">Next</a>\n";
            paginatorHtml += "</div>\n";

            this.element.append( paginatorHtml);

            this.element.find(".Paginator a").on('click', this.widget(), function(e) {
                e.preventDefault();
                e.stopPropagation();

                alert( $(this).text() );

                //TODO: trigger Callback...
            })
            //$(ENV.ID_GRID_PAGER + " a").on('click', {owner : this}, this.onclickPage);
        },

        _makePager: function(stPager, endPager, curPager)
        {
            var resultHtml = "";

            if (this.options.isPageLimitOver && (stPager > 1) ) {
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

            if (this.options.isPageLimitOver && (endPager < this.options.pagetotal)) {
                resultHtml += "<span class=\"break\">...</span>\n";
            }

            return resultHtml;
        }


    });

}(jQuery));