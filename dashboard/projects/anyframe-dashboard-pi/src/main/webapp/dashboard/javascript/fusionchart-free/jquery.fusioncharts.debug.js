/*!
 * FusionCharts Free jQuery Library and Plugin
 * Copyright (c) 2010 FusionCharts
 * http://www.fusioncharts.com/
 *
 * @publish: March 31, 2010
 * @version: 1.0.0b2 (build: 108)
 *
 */

/**
 * FusionCharts jQuery plugin. Contains all routines and configurations required
 * for the plugin to function.
 * @id jQuery.FusionCharts
 * @id $.FusionCharts
 *
 * @type Object
 *
 * @since 1.0
 * @compat=ALL
 */
jQuery.FusionCharts = {

    /**
     * Indicates the current plugin version in the form major, minor, revision,
     * build number.
     * @id jQuery.FusionCharts.version
     * @id $.FusionCharts.version
     *
     * @type Object
     *
     * @since 1.0
     * @compat=ALL
     *
     * @note
     * major, minor, revision, build, native-product, codename
     */
    version: [1, 0, 0, 108, 'free', 'b2'],

    /**
     * Contains the default configuration for every chart that is created. Users
     * can override these properties by providing identical option names while
     * creating a new FusionCharts object.
     * @id jQuery.FusionCharts.config
     * @id $.FusionCharts.config
     *
     * @type Object
     *
     * @since 1.0
     * @compat=ALL
     *
     * @note All usable properties are defined here. Even the ones that do not
     * have default values are stored here as undefined objects.
     */
    config: {
        /**
         * Variable definitions.
         *
         * @var {String} id Sets the unique id of the charts to be rendered.
         * @var {String} type The chart 'Alias Name' that defines the chart-type.
         * @var {String} width Defines the width of the chart in px or %.
         * @var {String} height Defines the height of the chart in px or %.
         * @var {String} swfPath Sets the relative or absolute path of the chart
         * from where the swf files are loaded.
         * @var {String} swfURL Sets the full URL of the chart swf. Overrides
         * swfName and swfPath.
         * @var {Object} data Specifies the data-source for the chart and can
         * accept string XML, URL or any supported jQuery data-source.
         * @var {String} dataFormat Specifies how to treat the data-source defined
         * in 'data' option.
         * @var {Object} dataOptions Specifies options to specific data-sources.
         * @var {Boolean} debugMode [v3 only] Sets the 'debugMode' of FusionCharts
         * to allow debugging of charts.
         * @var {String} scaleMode Sets the scaleMode value of the rendered chart
         * swf.
         * @var {String} wMode Sets the window mode value of the endered chart swf.
         * @var {String} allowScriptAccess Sets the script access permission settings
         * of the rendered chart swf.
         * @var {String} quality Sets the rendered quality of the chart swf.
         * @var {String} bgColor Sends a bgColor value of the rendered chart swf.
         * @var {String} [v3 only] lang Sets the language-locale of FusionCharts.
         * @var {String} className Specifies the CSS class base name to be used
         * while rendering FusionCharts swf.
         * @var {String} product Specifies which product from the FusionCharts
         * suite that is being used.
         */
        id: 'fusioncharts',
        type: 'Column2D',
        width: '320',
        height: '240',
        insertMode: 'clear',

        swfPath: 'FusionChartsFree/Charts',
        swfURL: undefined,

        data: undefined,
        dataFormat: undefined,
        dataOptions: {},

        debugMode: false,

        scaleMode: 'noScale',
        wMode: 'window',
        allowScriptAccess: 'always',
        quality: 'high',

        bgColor: undefined,
        lang: 'en',
        className: 'FusionCharts',
        product: 'free',

        // Private Variables //
        swfName: undefined,
        detectFlashVersion: false,
        autoInstallRedirect: false,
        registerWithJS: true,
        resizable: false,
        update: false,
        forceReload: true,

        // To allow setting of default values.
        extend: jQuery.fn.extend
    },

    /**
     * Matrix of chart alias and their corresponding swf file names. Also
     * stores data pertaining to the availability of a chart in a particular
     * version.
     * @id jQuery.FusionCharts.meta
     * @id $.FusionCharts.meta
     *
     * @type Object
     *
     * @since 1.0
     * @compat=ALL
     * @private
     */
    meta: {

        /**
         * Contains the products information for chart-meta for different products
         * of FusionCharts suite.
         * @id jQuery.FusionCharts.meta.products
         * @id $.FusionCharts.meta.products
         *
         * @type Object
         *
         * @note
         * The Object is of Syntax
         * product: [index, swfPrefix, swfSuffix, swfVersion, xmlRoot, accesskey]
         *
         * @private
         */
        products: {
            v3:   [0, '',     '.swf', '8,0,0,0',  'chart', 'FusionCharts'],
            free: [1, 'FCF_', '.swf', '6,0,54,0', 'graph', 'FusionCharts']
        },

        /**
         * Defines the various broad data-formats that FusionCharts data-XML
         * can be classified into.
         * @id jQuery.FusionCharts.meta.datavariants
         * @id $.FusionCharts.meta.datavariants
         *
         * @type Object
         *
         * @note
         * The Object is of Syntax
         * 'series-id': ['friendly-name', transpose]
         *
         * It is used as reference by the alias Object.
         *
         * @private
         */
        datavariants: {
            'undefined':          ['Undefined', false],
            'singleseries':       ['Single-Series', false],
            'multiseries':        ['Multi-Series', true],
            'multiseriesstacked': ['Multi-Series Stacked', true],
            'singlevaluegauge':   ['Single-Value Gauge', false],
            'multivaluegauge':    ['Multi-Value Gauge', false],
            'multilevelpie':      ['Multi-Level Pie', true],
            'gantt':              ['Gantt', false],
            'drawingpad':         ['Drawing Pad', false]
        },

        /**
         * Defines the chart alias matrix where for every chart alias, the
         * coressponding swf filename is specified.
         * @id jQuery.FusionCharts.meta.alias
         * @id $.FusionCharts.meta.alias
         *
         * @type: Object
         *
         * @note
         * The column in the array is corresponding to the "index" value of each
         * product mentioned in meta.products.
         *
         * Content Format:
         * Array Item 0
         * A string in the array refers to a filename (without any suffix or
         * prefix), and in case there is a whole number, it is a reference to
         * another element in the same array. If the value is -1, it indicates
         * that the chart-type does not exist for that particular product.
         * typeName: [reference v3, reference free]
         *
         * Array Item 1
         * Contains the chart data type in 2^N format.
         * 0: Undefined
         * 1: Single-Series
         * 2: MultiSeries
         *
         * @private
         */
         alias: {
            dragcolumn2d: [['DragColumn2D', -1], 'multiseries'],
            dragline: [['DragLine', -1], 'multiseries'],
            dragarea: [['DragArea', -1], 'multiseries'],
            errorbar2D: [['ErrorBar2D', -1], 'multiseries'],
            selectscatter: [['SelectScatter', -1], 'multiseries'],
            dragnode: [['DragNode', -1], 'multiseries'],
            kagi: [['Kagi', -1], 'singleseries'],
            logcolumn2d: [['LogMSColumn2D', -1], 'multiseries'],
            logline2d: [['LogMSLine', -1], 'multiseries'],
            multilevelpie: [['MultiLevelPie', -1], 'multilevelpie'],
            multiaxisline: [['MultiAxisLine', -1], 'multiseriesstacked'],
            radar: [['Radar', -1], 'multiseries'],
            funnel: [['Funnel', 0], 'singleseries'],
            candlestick: [['Candlestick', 0], 'singleseries'],
            gantt: [['Gantt', 0], 'gantt'],
            spline2d: [['Spline', -1], 'singleseries'],
            msspline2d: [['MSSpline', -1], 'multiseries'],
            splinearea2d: [['SplineArea', -1], 'singleseries'],
            mssplinearea2d: [['MSSplineArea', -1], 'multiseries'],
            inversearea2d: [['InverseMSArea', -1], 'multiseries'],
            inversecolumn2d: [['InverseMSColumn2D', -1], 'multiseries'],
            inverseline2d: [['InverseMSLine', -1], 'multiseries'],
            waterfall: [['Waterfall2D', -1], 'singleseries'],
            scatter: [['Scatter', -1], 'multiseries'],
            bubble: [['Bubble', -1], 'multiseries'],
            column3d: [['Column3D', 0], 'singleseries'],
            column2d: [['Column2D', 0], 'singleseries'],
            mscolumn3d: [['MSColumn3D', 0], 'multiseries'],
            mscolumn2d: [['MSColumn2D', 0], 'multiseries'],
            stackedbar2d: [['StackedBar2D', 0], 'multiseries'],
            stackedcolumn3d: [['StackedColumn3D', 0], 'multiseries'],
            stackedcolumn2d: [['StackedColumn2D', 0], 'multiseries'],
            stackedbar3d: [['StackedBar3D', -1], 'multiseries'],
            stackedarea2d: [['StackedArea2D', 0], 'multiseries'],
            stackedcolumn3dlinedy: [['StackedColumn3DLineDY', -1], 'multiseries'], // this alias name is an exception of not having suffix 3d
            pie2d: [['Pie2D', 0], 'singleseries'],
            pie3d: [['Pie3D', 0], 'singleseries'],
            doughnut2d: [['Doughnut2D', 0], 'singleseries'],
            donut2d: [['Doughnut2D', 0], 'singleseries'],
            doughnut3d: [['Doughnut3D', -1], 'singleseries'],
            donut3d: [['Doughnut3D', -1], 'singleseries'],
            line2d: [['Line', 0], 'singleseries'],
            msline2d: [['MSLine', 0], 'multiseries'],
            bar2d: [['Bar2D', 0], 'singleseries'],
            msbar2d: [['MSBar2D', 0], 'multiseries'],
            msbar3d: [['MSBar3D', -1], 'multiseries'],
            area2d: [['Area2D', 0], 'singleseries'],
            msarea2d: [['MSArea', 'MSArea2D'], 'multiseries'],
            mscombi2d: [['MSCombi2D', -1], 'multiseries'],
            mscombi3d: [['MSCombi3D', -1], 'multiseries'],
            mscombidy2d: [['MSCombiDY2D', 'MSColumn2DLineDY'], 'multiseries'],
            msstackedcolumn2d: [['MSStackedColumn2D', -1], 'multiseriesstacked'],
            msstackedcolumn2dlinedy: [['MSStackedColumn2DLineDY', -1], 'multiseriesstacked'],
            mscolumn3dlinedy: [['MSColumn3DLineDY', 0], 'multiseries'],
            mscolumn3dline: [['MSColumnLine3D', -1], 'multiseries'],
            scrollarea2d: [['ScrollArea2D', -1], 'multiseries'],
            scrollcolumn2d: [['ScrollColumn2D', -1], 'multiseries'],
            scrollline2d: [['ScrollLine2D', -1], 'multiseries'],
            scrollcombi2d: [['ScrollCombi2D', -1], 'multiseries'],
            scrollcombidy2d: [['ScrollCombiDY2D', -1], 'multiseries'],
            scrollstackedcolumn2d: [['ScrollStackedColumn2D', -1], 'multiseries'],
            realtimearea: [['RealTimeArea', -1], 'multiseries'],
            realtimecolumn: [['RealTimeColumn', -1], 'multiseries'],
            realtimeline: [['RealTimeLine', -1], 'multiseries'],
            realtimestackedarea: [['RealTimeStackedArea', -1], 'multiseries'],
            realtimestackedcolumn: [['RealTimeStackedColumn', -1], 'multiseries'],
            realtimeangular: [['AngularGauge', -1],  'multivaluegauge'],
            realtimebulb: [['Bulb', -1],  'singlevaluegauge'],
            realtimecylinder: [['Cylinder', -1],  'singlevaluegauge'],
            realtimehorizontalled: [['HLED', -1],  'singlevaluegauge'],
            realtimehorizontallinear: [['HLinearGauge', -1],  'multivaluegauge'],
            realtimethermometer: [['Thermometer', -1],  'singlevaluegauge'],
            realtimeverticalled: [['VLED', -1],  'singlevaluegauge'],
            sparkline: [['SparkLine', -1], 'multiseries'],
            sparkcolumn: [['SparkColumn', -1], 'multiseries'],
            sparkwinloss: [['SparkWinLoss', -1], 'multiseries'],
            horizontalbullet: [['HBullet', -1],  'singlevaluegauge'],
            verticalbullet: [['VBullet', -1],  'singlevaluegauge'],
            pyramid: [['Pyramid', -1], 'singleseries'],
            drawingpad: [['DrawingPad', -1], 'drawingpad'],
            exportcomponent: [['FCExporter', -1], 'undefined'],
            ssgrid: [['SSGrid', -1], 'singleseries']
        }
    },

    /**
     * For a selection having multiple items, it maintains the count of
     * FusionCharts object per unique id.
     * @id jQuery.FusionCharts.countOf
     * @id $.FusionCharts.countOf
     *
     * @type Object
     * @private
     */
    countOf: {},

    /**
     * Maintain the total count of FusionCharts object rendered on the current
     * page.
     * @id jQuery.FusionCharts.count
     * @id $.FusionCharts.count
     *
     * @type Number
     * @private
     */
    count: 0,

    /**
     * Specifies a policy of picking data from user input and mapping it onto
     * various targets like flashVars, params, attributes, etc.
     * This policy map is used to validate certain items in the 'generator-stack'
     * before sending it to the 'build-process'.
     * @id jQuery.FusionCharts.policies
     * @id $.FusionCharts.policies
     *
     * @code
     * targetStack: { attributeName: [options-source-name, data-type] }
     *
     * @type Object
     *
     * @since 1.0
     *
     * @note
     * The policy-stack consists of flashVars (vars), ActiveX parameters (params)
     * and object attributes (attrs)
     *
     * The data-type is corresponding to match-validator regular expressions that
     * are specified within $.FusionCharts.validators
     *
     * Format:
     * value-name: [source-options, validation-type, required, case-sensiive]
     *
     * @private
     */
    policies: {
        vars: { // FlashVars
            chartWidth: ['width', 'length', true, false],
            chartHeight: ['height', 'length', true, false],
            lang: ['lang', 'word', false, false],
            debugMode: ['debugMode', 'bool', false, false],
            registerWithJS: ['registerWithJS', 'bool', false, false],
            DOMId: ['id', 'string', true, true]
        },

        attrs: { // Object Attributes
            width: ['width', 'length', true, false],
            height: ['height', 'length', true, false],
            lang: ['lang', 'word', false, false],
            'class': ['className', 'string', true, true]
        },

        params: { // ActiveX Parameters
            scaleMode: ['scaleMode', 'smode', false, true],
            wMode: ['wMode', 'wmode', false, true],
            bgColor: ['bgColor', 'color', false, true],
            allowScriptAccess: ['allowScriptAccess', 'script', false, true],
            quality: ['quality', 'quality', false, true]
        },

        options: {
            id: ['id', 'string', true, true],
            type: [ 'type', 'word', true, false],
            width: ['width', 'length', true, false],
            height: ['height', 'length', true, false],

            dataFormat: ['dataFormat', 'dataformat', true, false],

            debugMode: ['debugMode', 'bool', false, false],
            registerWithJS: ['registerWithJS', 'bool', false, false],

            scaleMode: ['scaleMode', 'smode', false, true],
            wMode: ['wMode', 'wmode', false, true],
            allowScriptAccess: ['allowScriptAccess', 'script', false, true],
            quality: ['quality', 'quality', false, true],

            bgColor: ['bgColor', 'color', false, true],
            lang: ['lang', 'word', false, true],
            className: ['className', 'string', true, true],
            product: ['product', 'product', true, false],

            insertMode: ['insertMode', 'insertmode', true, false]
        }
    },

    /**
     * Stores validator regular expressions. These expressions are used to
     * validate user-set parameters in the jQuery.FusionCharts.validators.validate()
     * function.
     * @id jQuery.FusionCharts.validators
     * @id $.FusionCharts.validators
     *
     * @type Object
     *
     * @since 1.0
     *
     * @private
     */
    validators: {

        /**
         * Validates a parameter by applying a validator RegExp to it.
         * In case 'test' is set to true, it checks whether the parameter is of the
         * specified 'type' or not and returns boolean.
         * @id jQuery.FusionCharts.validator.validate
         * @id $.FusionCharts.validator.validate
         *
         * @param {Object} param The object or string that needs to be
         * checked for consistency.
         * @param {String} type The type of parameter that is required. It should
         * correspond to one of the Regular Expressions present in 'validators'
         * object.
         * @param {Boolean} test Just test whether parameter is of the type
         * specified.
         * @param {Boolean} required Raises an error and halts script in case
         * validation fails
         * @param {Boolean} caseSensitive Specifies whether to return lower-case
         * value.
         *
         * @return The final value of the parameter that first matches the
         * corresponding Regular Expression. In case, 'test' is set to true,
         * it would return a boolean stating whether the input parameter has any
         * match for its corresponding Regular Expression. It returns nullstring ('')
         * in case the parameter is not specified (i.e. null or undefined)
         * @type Variant
         *
         * @since 1.0
         * @compat=ALL
         * @fusionchartscompat=ALL
         *
         * @private
         */
        validate: function(param, type, test, required, caseSensitive) {

            // Check whether parameter is defined or not. if undefined then
            // return a blank string.
            if(!__fcl.specified(param)) {
                return test ? false : '';
            }

            // check whether a valid data-type has been provided
            if(typeof __fcv[type] === 'undefined') {
                // TODO: Raise error.
                throw "Data type does not exist!"
            }

            // check whether param has a toString possibility
            if(!jQuery.isFunction(param.toString)) {
                // TODO: Raise console error
                throw "Parameter cannot be parsed as string."
            }

            // Match whether the param conforms to the validator RegExp
            var $1 = param.toString().match(__fcv[type]);
            var isMatch = $1 && $1.length && $1.length > 0;

            // if test is true, then we just return whether there was a successful
            // match or not
            if(test == true) { return isMatch; }

            // raise error in case the value is marked as required
            if(!isMatch) {
                // TODO: Raise console error
                if(required) {
                    // TODO: Raise error
                    throw "Validation failed for: {"+ type +"} " + param;
                }
            }

            // If there are matches, return the first element or return nullstring
            // If parameter has test set to true, then return boolean.

            return isMatch ? $1[0][caseSensitive ? 'toString' : 'toLowerCase']() : '';
        },


        /**
         * Update any particular validator options from a JS Object. It
         * generates the regular expression that would match all the root-level
         * item names in the JS Object
         * @id jQuery.FusionCharts.validators.update
         * @id $.FusionCharts.validators.update
         *
         * @param {String} v Validator type name. E.g. length, number, etc
         * @param {Object} o The JS Object whose root-level item-names would
         * be compiled into a regular expression that would match any of them
         * @param {Object} u Specifies what are to be updated
         *
         * @type Void
         *
         * @since 1.0
         * @compat=all
         * @fusionchartscompat=all
         *
         * @private
         */
        update: function(v, o, u) {

            var $1, p = [], s = $.extend({}, o, u);

            // Create regular expression by iterating through elements in s
            for($1 in s) {
                if(s[$1] !== null) {
                    p.push('^'+$1+'$');
                }
            }
            __fcv[v] = new RegExp(p.join('|'), 'ig');
        },

        // All pre-defined regular-expressions ---------------------------------
        length:  /^auto$|^[+-]?[0-9]+\.?([0-9]+)?%?/ig,
        color:   /^[\S\s]+$/ig,
        bool:    /^true$|^false$|^[01]$/ig,
        word:    /^\S+$/ig,
        smode:   /^exactFit$|^noBorder$|^noScale$|^showAll$/ig,
        wmode:   /^opaque$|^transparent$|^window$/ig,
        script:  /^always$|^never$/ig,
        quality: /^high$|^medium$|^low$/ig,
        string:  /.+/ig,
        number:  /^[-+]{0,1}[\d]*\.{0,1}\d+/ig, //^[+-]?[0-9]+(,[0-9]+)*(\.[0-9]+)?$
        integer: /^\d+$/ig,
        percent: /^[-+]?([\d]+(,\d+)*)?(\.\d+)?%/ig,
        strictnumber: /\s*[-]{0,1}[0-9]*(\.[0-9]+)?\s*/ig,

        major:   /^row$|^col$/ig,
        insertmode:   /^append$|^prepend$|^clear$/ig,

        // Auto-generated regular-expressions ----------------------------------
        xmldata: null, // from fusionCharts.meta.products[<<product>>][4]
        product: null, // from fusionCharts.meta.products
        dataformat: null // from fusionCharts.datahandlers
    },


//<editor-fold defaultstate="collapsed" desc="Plugin Library Functions">

    /**
     * Contains all Library functions that are used by the plugin core.
     * @id jQuery.FusionCharts.lib
     * @id $.FusionCharts.lib
     *
     * @type Object
     *
     * @since 1.0
     * @compat=ALL
     * @fusionchartscompat=ALL
     *
     * @private
     */
    lib : {

        /**
         * Checks whether a variable is explicitly intended to be used or not. In other
         * words, it determines whether a variable sent by the user is actually intended
         * to be used or intended to be ignored.
         * @id jQuery.FusionCharts.lib.specified
         * @id $.FusionCharts.lib.specified
         *
         * @param {String} p The parameter which is to be tested whether it is
         * specified or not.
         *
         * @return True if the object is not of type undefined or null
         * @type Boolean
         *
         * @since 1.0
         * @compat=ALL
         * @fusionchartscompat=ALL
         */
        specified: function(p) {
            return !(p === undefined || p === null);
        },

        /**
         * Serializes JavaScript object into XML attribute formatted string.
         * @id jQuery.FusionCharts.lib.serialize
         * @id $.FusionCharts.lib.serialize
         *
         * @param {Object} o The JS Object that has to be serialized in XML
         * attribute format.
         *
         * @example
         * {key1: 'value1', key2: 'value2'}
         * key1="value" key2="value2"
         *
         * @return The serialized format of JavaScript object
         * @type String
         *
         * @note
         * The serialized string pre-appends a trailing blank space.
         *
         * @since 1.0
         * @compat=ALL
         * @fusionchartscompat=ALL
         */
        serialize: function(o) {
            var html='', key;
            for(key in o) {
                if(typeof o[key] !== 'string') {
                    continue;
                }
                html += key + '="' + o[key].toString().replace('"', '&quot;') + '" ';
            }
            return html;
        },

        /**
         * Generates a FusionCharts compatible boolean string from any JavaScript
         * variable.
         * @id jQuery.FusionCharts.lib.bool
         * @id $.FusionCharts.lib.bool
         *
         * @param {Object} o The JS Object that has converted to 0 or 1
         *
         * @return Boolean data in string format as '0' or '1'
         * @type String
         *
         * @since 1.0
         * @compat=ALL
         * @fusionchartscompat=ALL
         */
        bool: function(o) {
            return (typeof o === 'boolean') ? (o ? '1' : '0')
                : (o == '1' || o == 'true' ? '1' : '0');
        },

        /**
         * Identifies whether a particular selected element has fusioncharts
         * rendered or not. If "data" parameter is set to true, then it returns
         * the options set to it.
         * @id jQuery.FusionCharts.lib.identify
         * @id $.FusionCharts.lib.identify
         *
         * @param {String} obj The element or selector to check.
         *
         * @return Whether it has a fusioncharts-object inside it.
         * @type Boolean
         *
         * @since 1.0
         * @compat=ALL
         * @fusioncharts=ALL
         */
        identify: function(obj) {
            return jQuery(obj).attr('rel') === 'FusionCharts';
        },

        /**
         * Updates a FusionCharts DataXML root's attribute with the new
         * attribute-value pair. In case the attribute does not exist, it adds
         * it.
         * @id jQuery.FusionCharts.lib.updateXML
         * @id $.FusionCharts.lib.updateXML
         *
         * @param xml {String} The source FusionCharts DataXML.
         * @param attribute {String} The attribute to be updated.
         * @param value {String} The new value for the attribute to be updated.
         *
         * @type String
         * @return Updated FusionCharts DataXML with the new attribute added or
         * updated
         *
         * @since 1.0
         * @compat=ALL
         * @fusionchartscompat=ALL
         */
        updateXML: function(xml, attribute, value) {

            // In case user sends multiple number of attributes in
            // {attribute: value} format, then loop through the attributes
            // and update xml
            if(arguments.length == 2 && typeof attribute === 'object') {
                for(var item in attribute) {
                    xml = __fcl.updateXML(xml, item, attribute[item]);
                }
                return xml;
            }

            // Create a RegExp that would extract the attribute as provided
            var r = new RegExp(attribute + "=\\\"[^\"]+?\\\"|" +
                attribute + "=\\\'[^']+?\\\'", 'gi'),

                // Create the replacement string for the attribute like
                // attribute= 'value'
                v = attribute + '=\"' + value.replace(/\"/ig, '&quot;') + '\"';

            // Check whether the attribute already exists in XML. If it exists
            // then do a replace, else add a new attribute
            return r.test(xml) ?
                xml.replace(r, v) :
                xml.replace(/(\<\w+? )/, '$1'+v + ' ');
        },

        /**
         * Performs standard routines to 'fix' incoming xml string and take
         * preventive measures before sending it to main chart/map object.
         * @id jQuery.FusionCharts.lib.sanitizeXML
         * @id $.FusionCharts.lib.sanitizeXML
         *
         * @param {String} xml The incoming XML string that has to be sanitized.
         *
         * @return The sanitized form of XMLData that can be safely passed to
         * FusionCharts
         * @type String
         *
         * @since 1.0
         * @compat=ALL
         * @fusionchartscompat=ALL
         */
        sanitizeXML: function(xml){
            // TODO: Revamp this ported function
            // replace attribute " with ' and ' within attribute wiith %26apos;"
            var arrDQAtt=xml.match(/=\s*\".*?\"/g);
            if (arrDQAtt){
                for(var i=0;i<arrDQAtt.length;i++){
                    var repStr=arrDQAtt[i].replace(/^=\s*\"|\"$/g,"");
                    repStr=repStr.replace(/\'/g,"%26apos;");
                    var strTo=xml.indexOf(arrDQAtt[i]);
                    var repStrr="='"+repStr+"'";
                    var strStart=xml.substring(0,strTo);
                    var strEnd=xml.substring(strTo+arrDQAtt[i].length);
                    xml=strStart+repStrr+strEnd;
                }
            }

            // replace " with &quot;"
            xml=xml.replace(/\"/g,"%26quot;");

            // replace % escape characters using %25escape characters
            xml=xml.replace(/%(?![\da-f]{2}|[\da-f]{4})/ig,"%25");

            // replace & with %26
            xml=xml.replace(/\&/g,"%26");

            return xml;

        }
    },

//</editor-fold>

    /**
     * This function resizes the chart to its parent's dimension in case its
     * dimension is set to 'auto'. It also allows binding of resize to window
     * resize
     * @id jQuery.FusionCharts.resize
     * @id $.FusionCharts.resize
     * @type Array
     *
     * @param {Variant} context The chart selector/object (identifiable) that needs
     * to be resized.
     * @param {String} width The target width of the chart.
     * @param {String} height The target height of the chart.
     * @param {Boolean} bind [NotImplemented] Allows FusionCharts to be dynamically
     * resized upon browser viewport resize.
     *
     * @since 1.0
     * @compat=ALL
     * @fusionchartscompat=ALL
     */
    resize: function(context, width, height, bind) {

        // convert the context to jQuery object
        var o = $(context);

        // do adjustments for 'auto' width and height of the chart. In case
        // the settings say that width or height is set to auto, then put
        // in parent's width and height.
        if(width.toString().toLowerCase() == 'auto') {
            o.width(o.parent().width());
        }
        if(height.toString().toLowerCase() == 'auto') {
            o.height(o.parent().height());
        }

        if(bind) {
            throw "NotImplementedException()";

            // TODO: Confer the code to a custom event handler routine
            var $1;
            $(window).resize(function() {
                clearTimeout($1);
                $1 = setTimeout(function() {
                    __fc.update(o);
                }, 100);
            });

        } else {
            // unbind routine
        }
    },

    // TODO: Document each data handler
    /**
     * Contains all the data handlers. These are functions that take in options
     * and return a string that is supposedly a valid FusionCharts dataXML.
     * @id jQuery.FusionCharts.datahandlers
     * @id $.FusionCharts.datahandlers
     *
     * @code
     * // Barebone data handler code
     * function(options) {
     *    return options.data; // return data xml
     * };
     *
     * @type Object
     *
     * @since 1.0
     * @compat=ALL
     * @fusionchartscompat=ALL
     */
    datahandlers: {

        extend: function(o) {

            // Add the handlers to the object map
            for(var $tmp in o) {
                if(!jQuery.isFunction(o[$tmp]) ) continue;
                __fc.datahandlers[$tmp.toLowerCase()] = o[$tmp];
            }

            // Update the validators.
            __fcv.update('dataformat', __fc.datahandlers, {extend: null} );
        },

        uridata: function(o) {
            return o.data;
        },

        xmldata: function(o) {
            return __fcl.sanitizeXML(o.data);
        },
        // TODO: reserved datahandler
        ajax: function(o) { },

        // TODO: reserved datahandler
        csvdata: function(o) { }
    },

    /**
     * Stores the default filter functions. These filters are used to
     * manipulate attribites and variables before they are used to render
     * the chart html.
     * @id jQuery.FusionCharts.filters
     * @id $.FusionCharts.filters
     *
     * @code
     * // All filters are defined as
     * function(options, stack) { };
     *
     * @type Object
     *
     * @since 1.0
     * @compat=ALL
     * @fusionchartscompat=ALL
     *
     * @private
     */
    filters: {

        /*
         * Applies all validation policies to the generator-stack and also
         * performs a bit of sanitaization duties.
         * @id jQuery.FusionCharts.filters.validator
         * @id $.FusionCharts.filters.validator
         *
         * @param {Object} o FusionCharts configuration options
         * @param {Object} s FusionCharts HTML generator-stack
         *
         * @type Void
         *
         * @since 1.0
         * @compat=ALL
         * @fusionchartscompat=ALL
         */
        validator: function(o, s) {

            // walk is the function that will iterate upon every key in ring
            var ring,
            walk = function(ring, keys) {
                for(var key in keys) {
                    ring[key] = __fcv.validate(o[keys[key][0]], keys[key][1], false, keys[key][2], keys[key][3]);
                }
            };

            // apply the value-map policy
            s.options = o; // create cross reverence of stack in options
            for(ring in __fc.policies ) {
                walk(s[ring], __fc.policies[ring]);
            }

            // Some special fixing for boolean attributes. In case user sets debugMode
            // as any data-type, it gets translated to 0/1
            s.vars.debugMode = __fcl.bool(s.vars.debugMode);
            s.vars.registerWithJS = __fcl.bool(s.vars.registerWithJS);
            s.attrs['rel'] = 'FusionCharts';

            // apply browser specific attributes
            if(jQuery.browser.msie) {
                s.attrs['classid'] = 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000';
                s.attrs['codeBase'] = 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version='
                    + __fc.meta.products[o.product][3];
            } else {
                s.attrs['type'] = 'application/x-shockwave-flash';
                s.attrs['pluginspage'] = 'http://get.adobe.com/flashplayer/';
            }
        },



        /*
         * Handles chart ids and prevents duplicate ids from being created. Also
         * keeps a note of all the used fusioncharts ids in counters.
         * @id jQuery.FusionCharts.filters.id
         * @id $.FusionCharts.filters.id
         *
         * @param {Object} o FusionCharts configuration options
         *
         * @type Void
         *
         * @since 1.0
         * @compat=ALL
         */
        id: function(o, s) {

            // Add the starting index of chart id
            if(!__fc.countOf[o.id]) {
                __fc.countOf[o.id] = 0;
            }

        },

        /*
         * Validates chart-type (alias) and generates the corresponding swfName
         * from the alias. Also checks whether a particular alias is available
         * for the currently used product type.
         * @id jQuery.FusionCharts.filters.alias
         * @id $.FusionCharts.filters.alias
         *
         * @param {Object} o FusionCharts configuration options
         *
         * @type Void
         *
         * @since 1.0
         * @compat=ALL
         * @fusionchartscompat=ALL
         */
        alias: function(o) {

            // Check if swfName is already provided, if so then there is
            // no need to process swfname from alias.
            if(__fcl.specified(o.swfName)) return;

            if(!__fc.meta.alias[o.type]) {
                // TODO: Raise error that charttype not found
                throw "Chart Type Not Found!";
            }

            // get file name w.r.t. alias and as well as validate wrt version
            var swf = __fc.meta.alias[o.type][0][__fc.meta.products[o.product][0]];

            // Check whether the filename fetched is a filename or a reference to the
            // filename.
            if( typeof swf === 'number')
            {
                // In case numeric reference of filename is -1, implies that type is
                // not for this version
                if(swf == -1) {
                    // TODO: Raise error that version is -1
                    throw "Chart type not available in this version";
                }

                // finally get the true filename from the numeric reference
                swf = __fc.meta.alias[o.type][0][swf];
            }

            // add the prefix and suffix to the script to generate final swf file name
            o.swfName = __fc.meta.products[o.product][1] + swf +
                __fc.meta.products[o.product][2];
        },

        /*
         * Generates the complete swfURL from the swfPath and swfName options.
         * @id jQuery.FusionCharts.filters.uri
         * @id $.FusionCharts.filters.uri
         *
         * @param {Object} o FusionCharts configuration options
         * @param {Object} s FusionCharts HTML generator-stack
         *
         * @type Void
         *
         * @since 1.0
         * @compat=ALL
         * @fusionchartscompat=ALL
         */
        uri: function(o, s) {

            // Decide in which variable name to store swf url depending upon
            // browser-type.
            var srcKey = jQuery.browser.msie ? 'movie' : 'src';

            // In case swfURL is already provided, do not compute anything else.
            // Just set swfURL as it is.
            if( __fcl.specified(o.swfURL) ) {
                s.params[srcKey] = o.swfURL;
                return;
            }

            // In case swfPath is not specified then simply set swfName as the
            // swfURL. This is because, without the path it is pointless to do
            // path related computations (hence save on performance).
            if(!__fcl.specified(o.swfPath) || (o.swfPath == '') ) {
                s.params[srcKey] = o.swfURL= o.swfName;
                return;
            }


            // Check whether swfPath + swfName has a '/' in between.
            // At his point, we know that we have valid swfPath and swfName to
            // combine. Hence we simply remove trailing and following '/' and
            // combine them with a '/' in between.
            // TODO: Profile the replacement of regular expressions with
            //       native substrings.
            o.swfPath = o.swfPath.replace(/\/$/, '');
            o.swfName = o.swfName.replace(/^\//, '');

            // Set the finally computed swfURL.
            s.params[srcKey] = o.swfURL = o.swfPath + '/' + o.swfName;
        },

        /*
         * Core data-handler implementation routine. It selects the appropriate
         * data handler from jQuery.FusionCharts.datahandlers depending upon the
         * dataFormat option.
         * @id jQuery.FusionCharts.filters.data
         * @id $.FusionCharts.filters.data
         *
         * @param {Object} o FusionCharts configuration options
         * @param {Object} s FusionCharts HTML generator-stack
         *
         * @type Void
         *
         * @since 1.0
         * @compat=ALL
         * @fusionchartscompat=ALL
         *
         * @note
         * dataFormat is a compulsory option, unless the data is of native XML
         * string type.
         */
        data: function(o, s) {

            // In case a data is not provided, then skip this filter.
            if(o.data == undefined){
                // TODO: Raise error that data absent
                return;
            }

            // In case a dataFormat is not provided, then skip this filter.
            // But check if xmldata is there in 'data' field, if yes then do not
            // panic.
            if(o.dataFormat == 0){
                if( __fcv.validate(o.data, 'xmldata', true) ) {
                    dataFormat = 'xmldata';
                }

                // TODO: Raise error that dataFormat absent
                else { return; }
            }

            // In case the dataformat is uribased, then set dataURL, else
            // set dataxml.
            // Call the data handler function and get the returned data.
            // This is done in one line to avoid memory spike in case of large
            // datasource.
            s.vars[ o.dataFormat == 'uridata' ? 'dataURL' : 'dataXML'] =
                __fc.datahandlers[o.dataFormat](o);

        }
    },

    /*
     * Merges user-provided options with default configuration and runs the
     * user-provided filter stack and the core filter stack on these options
     * to generate the final option-set and HTML generation stack.
     * @id jQuery.FusionCharts.synthesize
     * @id $.FusionCharts.synthesize
     *
     * @type Object
     * @return The final HTML generation stack and updated configuration options.
     * { stack: {Object}, options: {Object} }
     *
     * @since 1.0
     * @compat=ALL
     * @fusionchartscompat=ALL
     *
     * @private
     */
    synthesize: function(options, filters) {
        // create stacks
        var s = {
            attrs: {}, params: {}, vars: {}
        };

        // If options is empty, create empty options
        if(typeof options !== 'object') {
            options = {};
        }

        // In case user provides a function as filter and NOT within a object,
        // then convert the function to object.
        if(jQuery.isFunction(filters)) {
            filters = {'anonymous' : filters};
        }

        // Options are extended with default configuration before sending to
        // renderer
        var o = jQuery.extend(true, {}, __fc.config, options);

        // Define a function that executes the filters
        var exec = function($1, $2) {
            return jQuery.isFunction($2) ? $2(o, s) : true;
        };


        // Iterate and execute every 'core' filter. This is done to ensure that
        // core filters are executed after the user filters and that user filter
        // chain, when stopped, does not stop the core filter chain.
        jQuery.each(__fc.filters, exec);

        // iterate through each filters and populate stacks
        if(filters) {
            jQuery.each(filters, exec);
        }
        
        // Return the generated stack and updated options.
        return {stack: s, options: o};
    },

    /**
     * Builds the final HTML code that is required to render a FusionChart
     * SWF element from the stack of options provided.
     * @id jQuery.FusionCharts.build
     * @id $.FusionCharts.build
     *
     * @param {Object} s The 'options' object that contains four objects:
     * attributes (attrs), flashVars (vars, paremeters (params) and data.
     *
     * @return The HTML code that would render a particular chart
     * @type String
     *
     * @since 1.0
     * @compat=IE6|IE7|FF1|FF2|FF3|OPERA|SAFARI2|SAFARI3|KONQ
     * @fusionchartscompat=ALL
     *
     * @private
     */
    build: function(s) {

        var html = (jQuery.browser.msie ? '<object ' : '<embed ')
            + __fcl.serialize(s.attrs), vars = jQuery.param(s.vars);

        if(jQuery.browser.msie) {
            html += '>';
            for(var key in s.params) {
                html += '<param name="'+key+'" value="'+s.params[key]+'"></param>'
            }
            html += '<param name="flashVars" value="'+vars+'"></param></object>';
        } else {
            html += __fcl.serialize(s.params) + 'flashVars="' + vars
                + '"></embed>';
        }
        return html;
    },


    /**
     * Takes fusionCharts options and applies the generated HTML to the context
     * that is provided.
     * @id jQuery.FusionCharts.render
     * @id $.FusionCharts.render
     *
     * @param {Object} options The rendering options for FusionCharts object
     * @param {Object} filters The filter functions to be executed while
     * rendeting the FusionCharts object.
     * @param {Object} context The target selection context where the charts
     * will be rendered.
     *
     * @type Integer
     * @return Return the total count of FusionCharts object that has been rendered.
     *
     * @since 1.0
     * @compat=ALL
     * @fusionchartscompat=ALL
     */
    render: function(context, options, filters) {

        // Call the 'synthesize' method to run the set of filters on the user-
        // provided options and generate the updated set of options and a
        // value-map-policy implementation stack (which is a JS Object that
        // contains all HTML attributes, FlashVars, Flash Parameters required
        // in order to generate the final HTML of FusionCharts.)
        var brew = __fc.synthesize(options, filters),
            html = '';

        // The stack generated after synthesizing the filters and options is
        // passed onto the 'build' method that finally applies simple
        // browser-specific logic to build the final HTML
        html = __fc.build(brew.stack);

        // In case the context provided is not a jQuery object, convert it.
        context = (context instanceof jQuery ? context : jQuery(context));

        // Iterate on each object and set its html. This is being done rather than
        // chaining this.html() because for some queer reason, for this having
        // multiple nodes, .html() failed to append childNodes in IE
        context.each(function() {
            var obj = jQuery(this),
                elm = jQuery(html),  // create DOM element from HTML source
                id = brew.options.id + // generate chart id
                    (__fc.countOf[brew.options.id] == 0 ?
                    '' : __fc.countOf[brew.options.id]);


            // Increment id counter.
            // Note previously, for multi-selector, for a single id (say 'mychart'),
            // the id is generated as mychart, mychart1, mychart2, ...
            elm.attr('id', id)
                .data('FusionCharts', brew.options);

            // update flashVars with the new ID that is generated
            brew.stack.vars['DOMId'] = id;

            // do browser specific adjustments
            if(jQuery.browser.msie) {
                // send the updated 'chart-id' to flashVars
                elm.children('param[name=flashVars]').attr('value',
                    jQuery.param(brew.stack.vars));
            } else {
                // send the updated 'chart-id' to flashVars
                elm.attr('flashVars', jQuery.param(brew.stack.vars));

            }
            
            // Depending upon the 'insertMode' option, clear contents of obj.
            if(brew.options.insertMode === 'clear') {
                obj.empty();
            }
            
            // Add container classname to the parent container and
            // finally append the new element to the container element.
            obj.addClass(brew.options.className + '-container')[
                (brew.options.insertMode === 'prepend') ? 'prepend' : 'append'](elm);

            //swfobject.embedSWF(brew.options.swfURL+'?registerWithJS=1&debugMode=1', obj.attr('id'), "300", "120", "8.0.0", "expressInstall.swf",
            //    brew.stack.vars, brew.stack.params, brew.stack.attrs);
            // do adjustments for 'auto' width and height of the chart. In case
            // the settings say that width or height is set to auto, then put
            // in parent's width and height.
            __fc.resize(elm, brew.options.width, brew.options.height, brew.options.resizable);

            // increment the id counter for this chart selection
            __fc.countOf[brew.options.id]++;
        });

        // Update the total count of charts rendered by this plugin.
        this.count += context.length;

        // Return the total count of FusionCharts object that has been updated.
        return context.length;
    },

    /**
     * Takes fusionCharts options and applies the generated HTML to the context
     * that is provided as a delta/change and not as a full update of DOM content.
     * @id jQuery.FusionCharts.update
     * @id $.FusionCharts.update
     *
     * @param {Object} options The rendering options for FusionCharts object
     * @param {Object} filters The filter functions to be executed while
     * rendeting the FusionCharts object.
     * @param {Object} context The target selection context where the charts
     * will be rendered.
     *
     * @type Integer
     * @return Return the total count of FusionCharts object that has been updated.
     *
     * @since 1.0
     * @compat=ALL
     * @fusionchartscompat=ALL
     *
     * @note
     * Has limited compatibility with FusionCharts Free
     */
    update: function(context, options, filters) {

        // In case the context provided is not a jQuery object, convert it.
        if( !(context instanceof jQuery) ) {
            context = jQuery(context);
        }

        // Load only the fusionCharts elements inside it.
        if( !__fcl.identify(context) ) {
            context = context.find(':FusionCharts');
        }

        // Counter and accumulator variable.
        var key, $1;

        // run through every selection within context and update their HTML
        context.each(function() {

            var obj = this,
                elm = jQuery(this),
                data = elm.data('FusionCharts');

            // Merge the new user options with already existing options
            var op = jQuery.extend({}, data, options);

            // In case the source of the user options and existing swf url is
            // same, then do not update it. This is done so that the chart
            // does not re-render upon update
            if(op.swfURL == data.swfURL) {
                delete op['swfURL'];
            }

            // In case 'type' is specified inside user-options, we would need
            // to clear existing 'swfURL', so that new swfURL can be generated
            if( op.type != data.type ) {
                // In case the original options do not have swfName specified,
                // we need to remove it from the newly computed option-set.
                // This allows the "alias" filter to work without errors.
                if(__fcl.specified(op.swfName)) {
                    delete op['swfName'];
                }
                delete op['swfURL'];
            }

            // Call the 'synthesize' method to run the set of filters on the user-
            // provided options and generate the updated set of options and a
            // value-map-policy implementation stack
            var brew = __fc.synthesize(op, filters);

            // do adjustments for 'auto' width and height of the chart. In case
            // the settings say that width or height is set to auto, then put
            // in parent's width and height.
            __fc.resize(elm, brew.options.width, brew.options.height, brew.options.resizable);

            // Remove classid from the updated attributes as changing classid
            // is not possible runtime.
            delete brew.stack.attrs['classid'];

            // Count total number of items sent as options. This would allow
            // to check whether certain items are the 'only' options sent.
            // @note: Use FireFox's __count__' variable, when available

            /* @var {Object} reloadKeys Defines the set of options that does
             * not trigger "forceReload" to true state.
             * @var {Boolean} flagReload Maintains the state that determines
             * whether "forceReload" option is to be set to false.
             *
             */
            var flagReload = false, reloadKeys = {'data': true, 'update': true,
                'dataFormat': true, 'dataOptions': true, 'forceReload': true,
                'className': true};

            // Add items in policies.params to the reloadKeys list. These should
            // not affect reloading.
            for(key in __fc.policies.params) {
                reloadKeys[key] = true;
            }
            // Reset counter variable.
            $1 = 0;

            // Iterate through options and check whether there is any item that
            // is not part of the set of "reloadKeys", determining whether the
            // chart has to be re-rendered or not.
            for(key in options) {
                if(reloadKeys[key] == undefined) {flagReload = true;break;}
            }

            // In case the options sent by user is only part of reloadKeys Object,
            // and forceReload is not set, then set forceReload to false.

            if( flagReload == false && options['forceReload'] == undefined ) {
                brew.options.forceReload = false;
            }

            // In case the movie src is same as previous, do not change it.
            // This is to maintain consistency with FusionCharts paradigm that
            // FC_Rendered is invoked only once and not on update. And re-setting
            // the src attribute fires FC_Rendered
            // ALSO: force re-render of charts in case the size has changed
            if(brew.options.forceReload == false) {
                $1 = jQuery.browser.msie ? 'movie' : 'src';
                if((elm.attr($1) == brew.stack.params[$1])) {
                    delete brew.stack.params[$1];
                }
            }

            // For internet explorer, we would need to update individual 'param'
            // nodes within object tag
            // Dev Note: The updation must be done in the following order:
            // (1) FlashVars, (2) Flash Parameters (3) Object/Embed attributes
            if(jQuery.browser.msie) {
                // Separately update the flashVars.
                elm.children('param[name=flashVars]').attr('value',
                    jQuery.param(brew.stack.vars));

                // update all other flash "param" nodes with new values
                elm.children('param').each(function() {
                    var param = jQuery(this);
                    if(brew.stack.params[param.attr('name')]) {
                        param.attr('value', brew.stack.params[param.attr('name')] );
                    }
                });

            }

            // For other browsers, the embed tag itself is updated with the flash
            // parameters
            else {
                elm.attr('flashVars', jQuery.param(brew.stack.vars));
                elm.attr(brew.stack.params);
            }

            // Update the HTML of each object with new attributes
            elm.attr(brew.stack.attrs);

            // In case product-version is FusionCharts free, do not use
            // externalInterface to load data, instead simply update the chart
            // and send send it to label of update.
            // This is because FusionCharts Free does not support any
            // externalInterface function
            if(brew.options.product.toLowerCase() == 'free') {

                var legacySetXML = function(xml) {
                    obj.SetVariable("_root.dataURL","");
                    obj.SetVariable("_root.isNewData","1");
                    obj.SetVariable("_root.newData", xml);
                    obj.TGotoLabel("/", "JavaScriptHandler");

                    // if force-reload is not marked, then we need to update the
                    // entire chart
                    if( brew.options.forceReload != false ) {
                        //$1 = elm.parent();
                        //elm.remove();
                        //$1.append(elm);
                    }
                };
                // FusionCharts Free does not support of getting dataURL. So,
                // using AJAX to fetch dataxml
                if( brew.options.dataFormat.toLowerCase() == 'uridata' ) {
                    jQuery.ajax({
                        cache: false,
                        global: false,
                        url: brew.stack.vars['dataURL'],
                        success: legacySetXML
                    });
                }
                else {
                    legacySetXML(brew.stack.vars['dataXML']);
                }
            }
            // Call the ExternalInterfaces of the FusionCharts swf and explicitly
            // update the charts in case forceReload is set to false
            else if( brew.options.forceReload == false ) {
                if(brew.options.dataFormat.toLowerCase() == 'uridata'
                    && jQuery.isFunction(this.setDataURL)) {
                    this.setDataURL(brew.stack.vars['dataURL']);
                }
                else if(jQuery.isFunction(this.setDataXML)) {
                    this.setDataXML(brew.stack.vars['dataXML']);
                }
                else {
                    // TODO: Raise console error.
                    // DEBUG: // setTimeout(function() {elm.get(0).setDataXML(brew.options.data);}, 2000)
                    throw "FusionCharts object integrity error. " +
                        "Missing critical ExternalInterfaces";
                }
            }

            // Update the internal "data" of the swf object to store the newly
            // updated options
            elm.data('FusionCharts', brew.options);

        });

        // Return the total count of FusionCharts object that has been updated.
        return context;
    },

    /**
     * Get or set FusionCharts data-XML attributes.
     * @id jQuery.FusionCharts.attr
     * @id $.FusionCharts.attr
     *
     * @param {Object} context The target selection context where the charts
     * will be rendered.
     * @param name {String} Attribute name to use to fetch or update an existing
     * FusionCharts object.
     * @param value {String} Optional value that the chart will be updated with.
     *
     * @type Object
     * @return The value of the attribute name specified. (Or jQuery object in case
     * of updating a FusionCharts object's data.)
     *
     * @since 1.0
     * @compat=ALL
     * @fusionchartscompat=v3
     */
    attr: function(context, name, value) {
        /**
         * @var {Object} transfer Holds all atttributes to be returned to the callee
         * Function.
         * @var {Object} operand Stores the final set of name-value pairs on which
         * this function operates.
         * @var {Boolean} isJSON Flags whether the name-value pairs are sent in
         * JSON format.
         * @var {Boolean} update Flags whether the charts in selection has to
         * be updated.
         */
        var transfer = {}, operand = {}, isJSON = false,
            update = (value !== undefined);

        // In case the context provided is not a jQuery object, convert it.
        if( !(context instanceof jQuery) ) {
            context = jQuery(context);
        }

        // Load only the fusionCharts elements inside it.
        if(!__fcl.identify(context)) {
            context.find(':FusionCharts');
        }

        // In case there is no argument passed to this function, perform routines
        // to return ALL chart attributes.
        if( name === undefined && !update) {
            context.each(function() {

                // Do a check whether externalInterfaces are present or not.
                if(!(this.getXML && this.setDataXML) ) {
                    throw "FusionCharts object integrity error. " +
                        "Missing critical ExternalInterfaces";
                }

                /**
                 * @var {String} id Stores the id of a particular FusionChart object
                 * in order to be able to refer to it from within the scope of
                 * .replace() function.
                 */
                var id = this.id;

                // Create a blank object for this Flash object so that FusionCharts
                // attributes can be stored within it
                transfer[id] = {};

                // Retrieve the attribute names and values using regular expression
                // and store them within the "transfer" variable.
                this.getXML().replace(/<\w+? (.*?)>.*/, '$1')
                    .replace(/\s*?(\w+?)=\"([^"]*?)\"/g, function($1, $2, $3) {
                    transfer[id][$2] = $3;
                });
            });

            // Return the fetched attributes.
            return transfer;
        }

        // In case, value here is not an array, convert it to one
        if(!(value instanceof Array)) {value = [value];}

        // In case the name parameter is an array, put all values of the array to
        // the operand object along with its corresponding values.
        if(typeof name === 'object') {
            if(name instanceof Array) {
                $(name).each(function($1, $2) {operand[$2] = value[$1]} );
            }
            else {
                operand = $.extend(operand, name);

                // This condition where name-parameter is an object but not an
                // Array, marks that name-value JSON is sent to function
                isJSON = true;
            }
        }

        // In case, the name is a simple string, update the operand variable by setting
        // the name as key and its value as the value parameter.
        else if(typeof name === 'string') {
            operand[name] = value[0];
        }

        // If anything is provided within the "value" parameter, we know that we will
        // have to perform routines that will update the FusionCharts object with
        // the values provided.
        if(update || isJSON) {

            context.each(function() {
                this.setDataXML(__fcl.updateXML(this.getXML(), operand));
            });
            return context;
        }

        // In case no value parameter is provided, we go ahead with retrieving the
        // atrributes of the name parameter
        else {

            context.each(function() {

                // Create a blank object for this Flash object so that FusionCharts
                // attributes can be stored within it
                transfer[this.id] = {};

                // Iterate through every attribute passed in parameter, fetch its
                // value from the chart and add it to the transfer object.
                for(var item in operand) {
                    transfer[this.id][item] = this.getChartAttribute(item);
                }
            });
            
            // Return the fetched attributes.
            return transfer;
        }
    },

    // TODO: Implement data method
    data: function(context, type, value) {
        throw "NotImplementedException()";
    },

    /**
     * Initializes various block variables and performs multiple routines.
     * @id jQuery.FusionCharts.init
     * @id $.FusionCharts.init
     *
     * @type Void
     *
     * @since 1.0
     * @compat=ALL
     * @fusionchartscompat=ALL
     *
     * @private
     * @constructor
     */
    init: function() {

        // Automatically update the "product" validator by picking type-names from
        // meta.products and dataformat from fusioncharts.datahandlers
        // While updating, we must make sure that internal protype functions
        // are removed (set to undefined.)
        __fcv.update('product', __fc.meta.products);
        __fcv.update('dataformat', __fc.datahandlers, {extend: null} );


        // Iterate through meta.products and generate the 'xml' validator.
        var p=[];
        for(var i in __fc.meta.products) {
            p.push('(\\<'+__fc.meta.products[i][4]+'.*\\</'+__fc.meta.products[i][4]+'\\>)');
        }
        __fcv.xmldata = new RegExp(p.join('|'), 'ig');

        // TODO: Detect and save Flash Player version upon page load and
        // do prepUnload routines
    }
 };

// Local variable pointers for spatial complexity reduction.
var __fc  = jQuery.FusionCharts,
    __fcl = jQuery.FusionCharts.lib,
    __fcv = jQuery.FusionCharts.validators;

// Execute the FusionCharts constructor.
jQuery.FusionCharts.init();


// jQuery Extension Routines ---------------------------------------------------

/**
 * Generate FusionCharts!
 * @id jQuery.fn.FusionCharts
 * @id $.fn.FusionCharts
 *
 * @param options {Object} Configuration options to generate FusionCharts. See
 * documentation to get the list.
 * @param filter {Function} Function that will be executed while generating
 * FusionCharts. See documentation.
 *
 * @since 1.0
 * @compat=ALL
 * @fusionchartscompat=ALL
 *
 * @private
 */
jQuery.fn.extend({
    FusionCharts: function(options, filter) {

        // Handling for update=true
        if(options && options['update'] == true) {
            // for indirect call of the function so that "this" works
            this.update = __fc.update;

            // Call the update method and pass on the context (this) with the
            // options and filters.
            this.update(this, options, filter);
        }
        else {
            // for indirect call of the function so that "this" works
            this.render= __fc.render;

            // Call the renderer method and pass on the context (this) with the
            // options and filters.
            this.render(this, options, filter);
        }

        // support chainability
        return this;
    }
});

/**
 * Inserts a new FusionCharts within every item of selection!
 * @id jQuery.fn.insertFusionCharts
 * @id $.fn.insertFusionCharts
 *
 * @param options {Object} Configuration options to generate FusionCharts. See
 * documentation to get the list.
 * @param filter {Function} Function that will be executed while generating
 * FusionCharts. See documentation.
 *
 * @since 1.0
 * @compat=ALL
 * @fusionchartscompat=ALL
 */
jQuery.fn.extend({
    insertFusionCharts: function(options, filter) {

        // for indirect call of the function so that "this" works
        this.render = __fc.render;

        // Call the renderer method and pass on the context (this) with the
        // options and filters. Force update to false.
        this.render(this, $.extend(options, {update: false}), filter);

        // support chainability
        return this;
    }
});

/**
 * Appends a new FusionCharts to every item of selection!
 * @id jQuery.fn.appendFusionCharts
 * @id $.fn.appendFusionCharts
 *
 * @param options {Object} Configuration options to generate FusionCharts. See
 * documentation to get the list.
 * @param filter {Function} Function that will be executed while generating
 * FusionCharts. See documentation.
 *
 * @since 1.0
 * @compat=ALL
 * @fusionchartscompat=ALL
 */
jQuery.fn.extend({
    appendFusionCharts: function(options, filter) {

        // for indirect call of the function so that "this" works
        this.render = __fc.render;

        // Call the renderer method and pass on the context (this) with the
        // options and filters. Force update to false.
        this.render(this, $.extend(options, {update: false, insertMode: 'append'}), filter);

        // support chainability
        return this;
    }
});

/**
 * Prepends a new FusionCharts to every item of selection!
 * @id jQuery.fn.prependFusionCharts
 * @id $.fn.prependFusionCharts
 *
 * @param options {Object} Configuration options to generate FusionCharts. See
 * documentation to get the list.
 * @param filter {Function} Function that will be executed while generating
 * FusionCharts. See documentation.
 *
 * @since 1.0
 * @compat=ALL
 * @fusionchartscompat=ALL
 */
jQuery.fn.extend({
    prependFusionCharts: function(options, filter) {

        // for indirect call of the function so that "this" works
        this.render = __fc.render;

        // Call the renderer method and pass on the context (this) with the
        // options and filters. Force update to false.
        this.render(this, $.extend(options, {update: false, insertMode: 'prepend'}), filter);

        // support chainability
        return this;
    }
});


/**
 * Updates an existing FusionCharts object within a selection.
 * @id jQuery.fn.updateFusionCharts
 * @id $.fn.updateFusionCharts
 *
 * @param options {Object} Configuration options to generate FusionCharts. See
 * documentation to get the list.
 * @param filter {Function} Function that will be executed while generating
 * FusionCharts. See documentation.
 *
 * @since 1.0
 * @compat=ALL
 * @fusionchartscompat=v3
 *
 * @note:
 * Available for Product: 'v3' only.
 */
jQuery.fn.extend({
    updateFusionCharts: function(options, filter) {

        // for indirect call of the function so that "this" works
        this.update = __fc.update;
        
        // Call the update method and pass on the context (this) with the
        // options and filters. Force update to true.
        this.update(this, $.extend(options, {update: true}), filter);

        // support chainability
        return this;
    }
});

/**
 * Uses a jQuery selection to create data and render FusionCharts out of it.
 * @id jQuery.fn.convertToFusionCharts
 * @id $.fn.convertToFusionCharts
 *
 * @param options {Object} Configuration options to generate FusionCharts. See
 * documentation to get the list.
 * @param filter {Function} Function that will be executed while generating
 * FusionCharts. See documentation.
 *
 * @since 1.0
 * @compat=ALL
 * @fusionchartscompat=v3|free
 *
 * @note
 * Has limited compatibility with FusionCharts Free
 */
jQuery.fn.extend({
    convertToFusionCharts: function(options, filter) {
        
        this.each(function() {
            var o = $(this), $tmp;

            options = $.extend({
                className: __fc.config.className}, options, {
                data: this,
                dataFormat: 'HTMLTable'
            });

            // Todo: Implement update
            // Check whether the previous element of the selection is already a
            // prerendered FusionCharts object, rendered using this very method.
            // In case update is marked as 'true' in either user-options or the
            // internally calculated isUpdate flag, then call update methid, else
            // call render method.

            // create a new html div container
            var context = $('<span class="'+ options.className +
                '-container"></span>');

            // Append division before the table
            o.before(context);

            // Call the renderer method and pass on the context of container with the
            // options and filters.
            __fc.render(context, options, filter);

        });

        // Support chainability
        return this
    }
});

/**
 * Gets or sets FusionCharts data-XML attributes.
 * @id jQuery.fn.attrFusionCharts
 * @id $.fn.attrFusionCharts
 *
 * @param name {String} Attribute name to use to fetch or update an existing
 * FusionCharts object.
 * @param value {String} Optional value that the chart will be updated with.
 * @param options {Object} Optional configuration parameters for setting or
 * retrieving attributes. See documentation.
 *
 * @type Object
 * @return The value of the attribute name specified. (Or jQuery object in case
 * of updating a FusionCharts object's data.)
 *
 * @since 1.0
 * @compat=ALL
 * @fusionchartscompat=v3
 *
 * @note:
 * Available for Product: 'v3' only.
 */
jQuery.fn.extend({
    attrFusionCharts: function(name, value, options) {

        // for indirect call of the function so that "this" works
        this.attr = __fc.attr;

        // Call the attr() function and pass parameters to it.
        return this.attr(this, name, value);
    }
});

/**
 * Extends the ":" selector to easily return fusioncharts objects.
 *
 * @note
 * Both fusionCharts and fusioncharts have been extended for fail-safe user
 * operation. However, only :FusionCharts is recommended.
 *
 * @since 1.0
 * @compat=ALL
 * @fusionchartscompat=v3
 *
 * @private
 */
jQuery.extend(jQuery.expr[':'],{
    FusionCharts: function(o) {
        return __fcl.identify(o);
    },
    fusioncharts: function(o) {
        return __fcl.identify(o);
    }

});

jQuery.extend({
    overlayFusionCharts: function(options, filter) {

        // TODO: Implement "fusionChartsOverlay"
        throw "NotImplementedException()";
    }
});


// =============================================================================
// Plugin-lets

__fc.datahandlers.extend({
    'HTMLTable' : function(o) {

        // Get the first 'table' element from the selection.
        var tbl = jQuery(o.data).filter('table:first'),
            $tmp; // temp variable

        // In case a table was not found, raise an error
        if(tbl.length === 0) { throw "No <table> data source found"; }

        // Default configuration for HTMLTable data-handler
        var opts = {
            chartAttributes: { },

            major: 'row',
            useLabels: true,
            useLegend: true,
            labelSource: 1,
            legendSource: 1,
            ignoreCols: [],
            ignoreRows: [],
			
            seriesColors: [],

            // Private Variables
            labels: jQuery([]),
            legend: jQuery([]),
            data: jQuery([])
        },

        variant = __fc.meta.alias[o.type][1], ignore = {};

		// Add default seriesColors to free product
		if(o.product === 'free') {
                    opts.seriesColors = ['AFD8F8', 'F6BD0F', '8BBA00', 'FF8E46',
                    '008E8E', 'D64646', '8E468E', '588526', 'B3AA00', '008ED6',
                    '9D080D', 'A186BE', 'CC6600', 'FDC689', 'ABA000',
                    'F26D7D', 'FFF200', '0054A6', 'F7941C', 'CC3300',
                    '006600', '663300', '6DCFF6'];
		}
        // Extend the default options with user overrides.
        $.extend(opts, o.dataOptions);

        // Validate options.
        opts.labelSource = opts.useLabels ? parseInt(opts.labelSource) : 0;
        opts.legendSource = opts.useLegend ? parseInt(opts.legendSource) : 0;

        // In case variant is singleseries, we remove series-source depending
        // upon the major value
        if( variant  == 'singleseries') {
            if(opts.major == 'row') {
                opts.useLegend = false;
                opts.legendSource = 0;
            }
            else {
                opts.useLabels = false;
                opts.labelSource = 0;
            }
        }

        // Compute and fetch all rows that are to be ignored
        if(opts.ignoreRows instanceof Array) {
            ignore.rows = opts.ignoreRows.length ? tbl.find('tr:nth-child(' +
                opts.ignoreRows.join('),tr:nth-child(') + ')').find('td,th')
                : jQuery([]);
        }
        if(opts.ignoreCols instanceof Array) {
            ignore.cols = opts.ignoreCols.length ? tbl.find('tr').find('td:nth-child(' +
                opts.ignoreCols.join('),td:nth-child(') + '),th:nth-child(' +
                opts.ignoreCols.join('),th:nth-child(') + ')')
                : jQuery([]);
        }

        // Get entire data from table. Also remove items that are selected for
        // ignoring.
        opts.data = tbl.find('th,td').not(ignore.cols).not(ignore.rows);

        if(opts.useLabels) {
            // Get the labels as jQuery objects.
            opts.labels = tbl.find('tr:nth-child('+opts.labelSource+'),' +
                'tr:nth-child('+opts.labelSource+')').find('th,td');

            // Remove labels them from data selection.
            opts.data = opts.data.not(opts.labels);

            // Ignore items in labels that are overlapping legend.
            if(opts.legendSource-1 >= 0 ) { // BugFix #145
                opts.labels = opts.labels.not(':eq('+ (opts.legendSource-1) +')');
            }
            // Ignore items in labels that are selected in ignore list.
            opts.labels = opts.labels.not(ignore.cols).not(ignore.rows);
        }

        if(opts.useLegend) {
            // Get the legend as jQuery objects.
            opts.legend = tbl.find('tr').find('td:nth-child('+opts.legendSource+'),' +
                'th:nth-child('+opts.legendSource+'),');

            // Remove legend from data selection.
            opts.data = opts.data.not(opts.legend);

            // Ignore items in categores that are overlapping labels.
            if(opts.labelSource-1 >=0) { // BugFix #145
                opts.legend = opts.legend.not(':eq('+ (opts.labelSource-1) +')');
            }
            // Ignore items in legend that are selected in ignore list.
            opts.legend = opts.legend.not(ignore.rows).not(ignore.cols);
        }

        // Probe dimension of the data object by indirect method.
        // Get the first parent of the data elements and then all its children.
        // Then remove all elements that are common to this and data object.
        // This gives us the elements that are in one data row, but not in data
        // object. Subtracting the length of this from total children in a row,
        // we get a definite width.
        $tmp = opts.data.parent(':first').children();
        var w = $tmp.length - $tmp.not(opts.data).length,
            h = w > 0 ? opts.data.length / w : 0,
            l = opts.data.length;

        // Assign the major rows and columns $tmpx variables to proper axis in
        // case of different major representation
        if(opts.major === 'col') {
            // Swap labels and legend
            $tmp = opts.labels; opts.labels = opts.legend; opts.legend = $tmp;
            // Swap width and height
            $tmp = w; w = h; h = $tmp;
        }

        // Prepare XML Template
        var tag = __fc.meta.products[o.product][4],
            xml = '<' + tag + ' ' + __fcl.serialize(o.dataOptions.chartAttributes)
                +'>',
            nodeHTML;

        // Compute data-section of the XML depending upon the chart type.
        // TODO: Make it a variant-based handling rather than if-else
        if(variant === 'singleseries') {
            nodeHTML = '<set ' + (o.product ==='free' ? 'name' : 'label') + '="';
            opts.data.each(function($1) {
                xml += nodeHTML +opts.labels.eq($1 % w).text() + '" value="'
                    + __fcv.validate( jQuery(this).text().replace(',', ''), 'strictnumber') +
                        '" />';
            });
        }
        else if(variant === 'multiseries') {
            // Iterate through the height of the data object and create categories
            xml += '<categories>';
            // The category XML node has different attributes for v3 and free.
            // Adjust accordingly.
            nodeHTML = '<category ' + ((o.product === 'free') ? 'name' : 'label') +
                '="';

            for($tmp = 0; $tmp < w; $tmp++) {
                xml += nodeHTML + opts.labels.eq($tmp).text() + '" />';
            }
            xml += '</categories>';

            // Create a mapping array for 1d to 2d map
            var map = [], i, j;
            if(opts.major === 'row') {
                for(i = 0; i < l; i++) {
                    map.push(i);
                }
            } else {
                for(i=0; i<h; i++) {
                    for(j=0; j<l; j+=h) { map.push(i+j); }
                }
            }

            // Iterate through data and create data-sets
            var bof; $tmp = 0;
            for(i = 0; i < l; i++) {
                 // Check Beginning of row and append dataset tag.
                if((bof = i % w) === 0) {
                    xml += '<dataset color="' +
                        (opts.seriesColors[$tmp % opts.seriesColors.length]||'')+
			'" seriesName="'+ opts.legend.eq($tmp++).text() + '">';
                }

                // Add set elements.
                xml += '<set value="' + __fcv.validate(
                    opts.data.eq(map[i]).text().replace(',', ''), 'strictnumber') +'"/>';

                // Check end of row and close dataset.
                if(bof+1 === w) { xml += '</dataset>'; }
            }

        }
        else {
            throw "NotImplementedException()";
        }

        // Sanitize XML and return data
        return  __fcl.sanitizeXML(xml + '</'+tag+'>');
    }
});

// TODO: Add routines to remove all SWF objects before unload (swfObject cleanup)
// cleanup dynamically embedded objects to fix audio/video threads
// and force open sockets and NetConnections to disconnect