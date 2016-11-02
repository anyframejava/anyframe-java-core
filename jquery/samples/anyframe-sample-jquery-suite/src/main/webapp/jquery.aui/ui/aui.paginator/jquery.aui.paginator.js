/**
 * Anyframe UI (AUI)
 *
 * @author JeongEun.Lee(jel.lee@samsung.com)**
 *          Sangjin.Nam(sangjiny.nam@samsung.com)*
 *
 * Paginator UI Component
 *
 * @version 0.9.4
 *
 *
 * @since version 0.9.4 on 2013.10.01
 * add option - isAlwaysShowButton
 *
 * @since version 0.9.3 on 2013.09.30
 * modified change option
 * - changed parameter (event, uiobject) -> (pageNum)
 *
 * @since version 0.9.2 on 2013.09.26
 * add option - buttonStyleMode
 *
 * @since version 0.9.1 on 2013.09.25
 * first released version
 *
 */

(function( $, undefined ) {

    var
        cls_base            = "aui-paginator",
        clss_base           = "aui-paginator aui-paginator-state-default",
        cls_base_container  = "aui-paginator-container",

    //ui state classes by user interaction
        cls_state_default           = "aui-paginator-state-default",
        cls_state_hover             = "aui-paginator-state-hover",
        cls_state_selected          = "aui-paginator-state-selected",
        cls_state_disabled          = "aui-paginator-state-disabled",
        cls_button_state_default    = "aui-paginator-btn-state-default",
        cls_button_state_hover      = "aui-paginator-btn-state-hover",

    //ui style classes (basic state)
        cls_uis_button_container    = "pg-btn-container",
        cls_uis_number_container    = "pg-num-container",
        cls_uis_number              = "pg-num",
        cls_uis_current_number      = "pg-this",
        cls_uis_ellipsis            = "pg-ellipsis",
        cls_uis_first_button        = "pg-first",
        cls_uis_prev_button         = "pg-prev",
        cls_uis_next_button         = "pg-next",
        cls_uis_last_button         = "pg-last";


$.widget( "aui.paginator", {

    version: "0.9.2",
    widgetEventPrefix: "paginator",

    options : {
        itemsTotalCount     : 15,
        itemsPerPage        : 1,
        ellipsisText        : "...",
        buttonText          : { first : "first", prev : "prev", next : "next", last : "last" },         // first, prev, next, last button's label
        isFirstPageZero     : false,
        buttonStyleMode     : 0,            // selection mode for using image, text, image+text, 0: text-only, 1: image-only, 2: image+text
        isAlwaysShowButton : false,

        //callbacks
        change : null
    },

    //define public methods
    getCurrentPage: function() {
        return this._pgnumCurrent;
    },
    setCurrentPage: function(newPage) {
        this._updatePaginator(newPage);
    },
    //--

    _create : function() {
        var opts = this.options;

        // add private variables
        this._defaultPageCountPerView = 10;         //reserved.
        this._pgcntTotal = parseInt( opts.itemsTotalCount / opts.itemsPerPage ) + ( ( opts.itemsTotalCount % opts.itemsPerPage ) ? 1 : 0 );
        this._pgnumFirst = opts.isFirstPageZero ? 0 : 1;
        this._pgnumLast = this._pgnumFirst + this._pgcntTotal - 1;
        this._pgnumStart = this._pgnumFirst;
        this._pgnumEnd = (this._pgcntTotal > this._defaultPageCountPerView) ? ( this._pgnumStart + this._defaultPageCountPerView - 1 ) : ( this._pgnumLast );
        this._pgnumCurrent = this._pgnumStart;

        this.element
                .addClass(clss_base)
                .on( "mousedown", function( event ) {     // prevent text selection
                    event.preventDefault();
                    event.stopPropagation();
                    });

        this._setOption("disabled", opts.disabled);
        this._updatePaginator();
    },

    _destroy : function() {
        this._resetPaginator();
        this.element
            .off("mousedown")
            .removeClass( clss_base )
            .find( "."+cls_base_container ).remove();
    },

    _setOptions: function( options ) {
        this._super( options );
        this._updatePaginator();
    },

    _setOption: function( key, value ) {
        var opts = this.options;

        if ( key == "disabled" ) {
            if ( value && !this.element.hasClass(cls_state_disabled) ) {
                this.element.addClass(cls_state_disabled);
            } else {
                this.element.removeClass(cls_state_disabled);
            }
        }

        this._super( key, value );

        switch (key) {
            case "itemsTotalCount":
            case "itemsPerPage":
            case "isFirstPageZero":
            {
                this._pgcntTotal = parseInt( opts.itemsTotalCount / opts.itemsPerPage ) + ( ( opts.itemsTotalCount % opts.itemsPerPage ) ? 1 : 0 );
                this._pgnumFirst = opts.isFirstPageZero ? 0 : 1;
                this._pgnumLast = this._pgnumFirst + this._pgcntTotal - 1;
                this._pgnumStart = this._pgnumFirst;
                this._pgnumEnd = (this._pgcntTotal > this._defaultPageCountPerView) ? ( this._pgnumStart + this._defaultPageCountPerView - 1 ) : ( this._pgnumLast );
                this._pgnumCurrent = this._pgnumStart;
            }
                break;
        }
    },

    _generatePaginator : function() {

        var opts = this.options,
            paginatorHtml = "";

        paginatorHtml += "<div class='" + cls_base_container + "'>\n";

        //make button area(prev/next/first/last)
        paginatorHtml += (!opts.isAlwaysShowButton && this._pgcntTotal <= this._defaultPageCountPerView) ?
                            "" : this._generateButtonArea(cls_uis_first_button, this._pgnumCurrent > this._pgnumFirst, opts.buttonText.first);

        paginatorHtml += (!opts.isAlwaysShowButton && this._pgcntTotal <= this._defaultPageCountPerView) ?
                            "" : this._generateButtonArea(cls_uis_prev_button, this._pgnumCurrent > this._pgnumFirst, opts.buttonText.prev);

        paginatorHtml += this._generatePageArea(this._pgnumStart, this._pgnumEnd, this._pgnumCurrent);

        paginatorHtml += (!opts.isAlwaysShowButton && this._pgcntTotal <= this._defaultPageCountPerView) ?
                            "" : this._generateButtonArea(cls_uis_next_button, this._pgnumCurrent < this._pgnumLast, opts.buttonText.next);
        paginatorHtml += (!opts.isAlwaysShowButton && this._pgcntTotal <= this._defaultPageCountPerView) ?
                            "" : this._generateButtonArea(cls_uis_last_button, this._pgnumCurrent < this._pgnumLast, opts.buttonText.last);

        paginatorHtml += "</div>\n";

        this.element.append( paginatorHtml );
    },

    _generateButtonArea : function(className, active, label) {
        var opts = this.options,
            resultHtml = "";

        resultHtml += (active) ? "<a id='page_"+className.split('-')[1]+"' class='"+className+" pg-btn-container aui-paginator-btn-state-default'>"
                                : "<span class='"+className+" pg-btn-container aui-paginator-state-disabled'>";

        //icon
        resultHtml += (opts.buttonStyleMode > 0) ? "<span class='"+className+"-icon pg-btn-icon '></span>" : "" ;
        // text
        resultHtml += (opts.buttonStyleMode != 1) ? "<span class='"+className+"-text pg-btn-text '>"+label+"</span>" : "";

        resultHtml += (active) ? "</a>\n" : "</span>\n";

        return resultHtml;
    },

    _generatePageArea : function()
    {
        var resultHtml = "",
            opts = this.options;

        resultHtml = "<span class='pg-num-container'>";

        if (this._pgcntTotal > this._defaultPageCountPerView && this._pgnumStart != this._pgnumFirst ) {
            resultHtml += "<a class='pg-num'"+" id='page_" + this._pgnumFirst +"'>" + this._pgnumFirst + "</a>\n";
            resultHtml += "<span class='pg-ellipsis'>"+opts.ellipsisText+"</span>\n";
        }

        for (var px = this._pgnumStart; px <= this._pgnumEnd; px++) {
            if (px == this._pgnumCurrent) {
                resultHtml += "<span class='pg-this aui-paginator-state-selected' >" + px + "</span>\n";
            }
            else {
                resultHtml += "<a class='pg-num'"+" id='page_" + px + "'>" + px + "</a>\n";
            }
        }

        if (this._pgcntTotal > this._defaultPageCountPerView && this._pgnumEnd != this._pgnumLast) {
            resultHtml += "<span class='pg-ellipsis'>"+opts.ellipsisText+"</span>\n";
            resultHtml += "<a class='pg-num'"+" id='page_" + this._pgnumLast +"'>" + this._pgnumLast + "</a>\n";
        }

        resultHtml += "</span>";

        return resultHtml;
    },

    _updatePaginator: function(mixedVal)        // argument : page number or next/prev/first/last string
    {
        var nextPage = -1,
            mixedVal = mixedVal || (this._pgnumCurrent+""),
            mixedVal = mixedVal + "";

        if ( mixedVal.match(/\D/) ) {
            switch(mixedVal)
            {
                case "first" : nextPage = Number(this._pgnumFirst); break;
                case "prev": nextPage = Number(this._pgnumCurrent - 1); break;
                case "next": nextPage = Number(this._pgnumCurrent + 1); break;
                case "last" : nextPage = Number(this._pgnumLast); break;
                default: return;  break;
            }
        }
        else {
            nextPage = Number(mixedVal);
        }

        this._pgnumCurrent = nextPage;

        // safe code
        this._pgnumCurrent = (this._pgnumCurrent < this._pgnumFirst) ? this._pgnumFirst : ( (this._pgnumCurrent > this._pgnumLast) ? this._pgnumLast : this._pgnumCurrent );

        //update _pgnumStart, _pgnumEnd
        this._pgnumStart = (this._pgnumCurrent < this._pgnumStart) ? this._pgnumCurrent : (this._pgnumCurrent - this._pgnumStart + 1) > this._defaultPageCountPerView ? this._pgnumCurrent - this._defaultPageCountPerView + 1 : this._pgnumStart;
        this._pgnumEnd = (this._pgnumCurrent > this._pgnumEnd) ? this._pgnumCurrent : (this._pgnumEnd - this._pgnumCurrent + 1) > this._defaultPageCountPerView ? this._pgnumCurrent + this._defaultPageCountPerView - 1 : this._pgnumEnd;

        this._resetPaginator();
        this._generatePaginator();
        this._setEvents();

        // trigger callback
        if (this.options.change) {
            this.options.change.call(this, this._pgnumCurrent);
        }
    },

    _resetPaginator : function()
    {
        // release event
        this._unsetEvents();

        // remove elements
        this.element.find("*").remove();
    },

    _setEvents : function() {

        if (this.options.disabled) return;

        this.element.find("a").on('click', {owner : this}, this._click);
        this.element.find("a.pg-num")
                      .on("mouseenter", function() {
                        $(this).addClass(cls_state_hover);
                      })
                      .on("mouseleave", function() {
                        $(this).removeClass(cls_state_hover);
                      });
        this.element.find("a.pg-btn-container *")
                    .on("mouseenter", function() {
                        $(this).parent().addClass(cls_button_state_hover);
                    })
                    .on("mouseleave", function() {
                        $(this).parent().removeClass(cls_button_state_hover);
                    });
    },

    _unsetEvents : function() {
        this.element.find("a").off('click');
        this.element.find("a.pg-num").off("mouseenter mouseleave");
        this.element.find("a.pg-btn-container *").off("mouseenter mouseleave");
    },

    _click: function(event, curPage)
    {
        event.preventDefault();
        event.stopPropagation();
        event.data.owner._updatePaginator( ( curPage || this.id.match(/page_(\w*)/)[1] ) );
    }

});

}(jQuery));