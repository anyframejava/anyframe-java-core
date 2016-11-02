(function()
{
    return function()
    {
        // Theme, Component URI Setting
        this._theme_uri = "./_theme_/";
        this._globalvar_uri = "globalvars.xml";
        this.loadTypedefition = function()
        {
            // this._addService(prefixid, type, url, cachelevel, codepage, language, version, communication);
            this._addService("default_typedef.xml", "nexacro14lib", "file", "./nexacro14lib/", "", null, "", "0", "0");
            this._addService("default_typedef.xml", "images", "file", "./images/", "", null, "", "0", "0");
            this._addService("default_typedef.xml", "images_temp", "file", "./images_temp/", "", null, "", "0", "0");
            this._addService("default_typedef.xml", "comm", "form", "./comm/", "", null, "", "0", "0");
            this._addService("default_typedef.xml", "frame", "form", "./frame/", "", null, "", "0", "0");
            this._addService("default_typedef.xml", "guide", "form", "./guide/", "", null, "", "0", "0");
            this._addService("default_typedef.xml", "lib", "js", "./lib/", "", null, "", "0", "0");
            this._addService("default_typedef.xml", "sample", "form", "./sample/", "", null, "", "0", "0");
            this._addService("default_typedef.xml", "sample_eco", "form", "./sample_eco/", "", null, "", "0", "0");
            this._addService("default_typedef.xml", "template", "form", "./template/", "", null, "", "0", "0");
            this._addService("default_typedef.xml", "test", "form", "./test/", "", null, "", "0", "0");
            this._addService("default_typedef.xml", "svc", "JSP", "http://localhost:8080/", "", null, "", "0", "0");
            this._addService("default_typedef.xml", "css", "css", "./css/", "", null, "", "0", "0");
            this._addService("default_typedef.xml", "WC", "form", "./wc/", "", null, "", "0", "0");
            this._addService("default_typedef.xml", "WM", "form", "./wm/", "", null, "", "0", "0");
            this._addService("default_typedef.xml", "WI", "form", "./wi/", "", null, "", "0", "0");
            this._addService("default_typedef.xml", "WN", "form", "./wn/", "", null, "", "0", "0");
            this._addService("default_typedef.xml", "WP", "form", "./wp/", "", null, "", "0", "0");
            this._addService("default_typedef.xml", "AN", "form", "./an/", "", null, "", "0", "0");
            this._addService("default_typedef.xml", "AI", "form", "./ai/", "", null, "", "0", "0");
            this._addService("default_typedef.xml", "AE", "form", "./ae/", "", null, "", "0", "0");
            this._addService("default_typedef.xml", "AM", "form", "./am/", "", null, "", "0", "0");

            this._component_uri = (this._arg_compurl ? this._arg_compurl : "./nexacro14lib/component/");
            // load components
            var registerclass = [
            		{"id":"Div", "classname":"nexacro.Div", "type":"JavaScript"},
            		{"id":"Button", "classname":"nexacro.Button", "type":"JavaScript"},
            		{"id":"PopupDiv", "classname":"nexacro.PopupDiv", "type":"JavaScript"},
            		{"id":"Combo", "classname":"nexacro.Combo", "type":"JavaScript"},
            		{"id":"CheckBox", "classname":"nexacro.CheckBox", "type":"JavaScript"},
            		{"id":"ListBox", "classname":"nexacro.ListBox", "type":"JavaScript"},
            		{"id":"Edit", "classname":"nexacro.Edit", "type":"JavaScript"},
            		{"id":"MaskEdit", "classname":"nexacro.MaskEdit", "type":"JavaScript"},
            		{"id":"TextArea", "classname":"nexacro.TextArea", "type":"JavaScript"},
            		{"id":"Menu", "classname":"nexacro.Menu", "type":"JavaScript"},
            		{"id":"Tab", "classname":"nexacro.Tab", "type":"JavaScript"},
            		{"id":"ImageViewer", "classname":"nexacro.ImageViewer", "type":"JavaScript"},
            		{"id":"Radio", "classname":"nexacro.Radio", "type":"JavaScript"},
            		{"id":"Calendar", "classname":"nexacro.Calendar", "type":"JavaScript"},
            		{"id":"Static", "classname":"nexacro.Static", "type":"JavaScript"},
            		{"id":"Grid", "classname":"nexacro.Grid", "type":"JavaScript"},
            		{"id":"Spin", "classname":"nexacro.Spin", "type":"JavaScript"},
            		{"id":"PopupMenu", "classname":"nexacro.PopupMenu", "type":"JavaScript"},
            		{"id":"GroupBox", "classname":"nexacro.GroupBox", "type":"JavaScript"},
            		{"id":"ProgressBar", "classname":"nexacro.ProgressBar", "type":"JavaScript"},
            		{"id":"Plugin", "classname":"nexacro.Plugin", "type":"JavaScript"},
            		{"id":"Dataset", "classname":"nexacro.NormalDataset", "type":"JavaScript"},
            		{"id":"WebBrowser", "classname":"nexacro.WebBrowser", "type":"JavaScript"}
            ];
            this._addClasses(registerclass);
        };
        
        this.on_loadGlobalVariables = function()
        {
            // global variable
            this._addVariable("gv_islogin", "false", false);
            this._addVariable("gv_location", "LOCAL", false);

            // global image

            // global dataset
            var obj = null;
            obj = new Dataset("gds_menu", this);
            obj._setContents("<ColumnInfo><Column id=\"LEVEL\" type=\"STRING\" size=\"256\"/><Column id=\"UPPER_MENU_ID\" type=\"STRING\" size=\"256\"/><Column id=\"MENU_ID\" type=\"STRING\" size=\"256\"/><Column id=\"MENU_NM\" type=\"STRING\" size=\"256\"/><Column id=\"MENU_URL\" type=\"STRING\" size=\"256\"/><Column id=\"ORDER_SEQ\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"MENU_NM\">SPC</Col><Col id=\"LEVEL\">0</Col><Col id=\"MENU_ID\">ID0000</Col></Row><Row><Col id=\"LEVEL\">1</Col><Col id=\"MENU_NM\">환자의뢰</Col><Col id=\"UPPER_MENU_ID\">ID0000</Col><Col id=\"MENU_ID\">ID0100</Col></Row><Row><Col id=\"LEVEL\">2</Col><Col id=\"MENU_NM\">진료의뢰</Col><Col id=\"UPPER_MENU_ID\">ID0100</Col><Col id=\"MENU_ID\">ID0110</Col><Col id=\"MENU_URL\">sample::sample00.xfdl</Col></Row><Row><Col id=\"LEVEL\">3</Col><Col id=\"UPPER_MENU_ID\">ID0110</Col><Col id=\"MENU_ID\">ID0111</Col><Col id=\"MENU_NM\">전자의뢰서</Col><Col id=\"MENU_URL\">sample::sample00.xfdl</Col></Row><Row><Col id=\"LEVEL\">3</Col><Col id=\"UPPER_MENU_ID\">ID0110</Col><Col id=\"MENU_ID\">ID0112</Col><Col id=\"MENU_NM\">환자조회요청</Col><Col id=\"MENU_URL\">sample::sample02.xfdl</Col></Row><Row><Col id=\"LEVEL\">3</Col><Col id=\"UPPER_MENU_ID\">ID0110</Col><Col id=\"MENU_ID\">ID0113</Col><Col id=\"MENU_NM\">의뢰서관리</Col><Col id=\"MENU_URL\">sample::sample03.xfdl</Col></Row><Row><Col id=\"LEVEL\">2</Col><Col id=\"MENU_NM\">환자통합조회</Col><Col id=\"UPPER_MENU_ID\">ID0100</Col><Col id=\"MENU_ID\">ID0120</Col><Col id=\"MENU_URL\">sample::sample04.xfdl</Col></Row><Row><Col id=\"LEVEL\">2</Col><Col id=\"MENU_NM\">회신함</Col><Col id=\"UPPER_MENU_ID\">ID0100</Col><Col id=\"MENU_ID\">ID0130</Col><Col id=\"MENU_URL\">sample::sample05.xfdl</Col></Row><Row><Col id=\"MENU_NM\">소통/정보</Col><Col id=\"LEVEL\">1</Col><Col id=\"UPPER_MENU_ID\">ID0000</Col><Col id=\"MENU_ID\">ID0200</Col></Row><Row><Col id=\"MENU_NM\">e-Consult</Col><Col id=\"LEVEL\">2</Col><Col id=\"UPPER_MENU_ID\">ID0200</Col><Col id=\"MENU_ID\">ID0210</Col></Row><Row><Col id=\"MENU_NM\">e-Consult</Col><Col id=\"LEVEL\">3</Col><Col id=\"UPPER_MENU_ID\">ID0210</Col><Col id=\"MENU_ID\">ID0211</Col></Row><Row><Col id=\"MENU_NM\">공개Consult</Col><Col id=\"LEVEL\">3</Col><Col id=\"UPPER_MENU_ID\">ID0210</Col><Col id=\"MENU_ID\">ID0212</Col></Row><Row><Col id=\"MENU_NM\">e-Consult모음</Col><Col id=\"LEVEL\">3</Col><Col id=\"UPPER_MENU_ID\">ID0210</Col><Col id=\"MENU_ID\">ID0213</Col></Row><Row><Col id=\"MENU_NM\">Webinar</Col><Col id=\"LEVEL\">2</Col><Col id=\"UPPER_MENU_ID\">ID0200</Col><Col id=\"MENU_ID\">ID0220</Col></Row><Row><Col id=\"MENU_NM\">전문의학자료</Col><Col id=\"LEVEL\">2</Col><Col id=\"UPPER_MENU_ID\">ID0200</Col><Col id=\"MENU_ID\">ID0230</Col></Row><Row><Col id=\"MENU_NM\">환자용건강자료</Col><Col id=\"LEVEL\">2</Col><Col id=\"UPPER_MENU_ID\">ID0200</Col><Col id=\"MENU_ID\">ID0240</Col></Row><Row><Col id=\"MENU_NM\">약물정보</Col><Col id=\"LEVEL\">2</Col><Col id=\"UPPER_MENU_ID\">ID0200</Col><Col id=\"MENU_ID\">ID0250</Col></Row><Row><Col id=\"MENU_NM\">SMC의료진</Col><Col id=\"LEVEL\">2</Col><Col id=\"UPPER_MENU_ID\">ID0200</Col><Col id=\"MENU_ID\">ID0260</Col></Row><Row><Col id=\"MENU_NM\">이슈토론</Col><Col id=\"LEVEL\">2</Col><Col id=\"UPPER_MENU_ID\">ID0200</Col><Col id=\"MENU_ID\">ID0270</Col></Row><Row><Col id=\"MENU_NM\">S-talk</Col><Col id=\"LEVEL\">2</Col><Col id=\"UPPER_MENU_ID\">ID0200</Col><Col id=\"MENU_ID\">ID0280</Col></Row><Row><Col id=\"MENU_NM\">SMC소식</Col><Col id=\"LEVEL\">1</Col><Col id=\"UPPER_MENU_ID\">ID0000</Col><Col id=\"MENU_ID\">ID0300</Col></Row><Row><Col id=\"LEVEL\">2</Col><Col id=\"UPPER_MENU_ID\">ID0300</Col><Col id=\"MENU_ID\">ID0310</Col><Col id=\"MENU_NM\">SMC뉴스</Col></Row><Row><Col id=\"LEVEL\">2</Col><Col id=\"UPPER_MENU_ID\">ID0300</Col><Col id=\"MENU_ID\">ID0320</Col><Col id=\"MENU_NM\">연수강좌/행사</Col></Row><Row><Col id=\"LEVEL\">2</Col><Col id=\"UPPER_MENU_ID\">ID0300</Col><Col id=\"MENU_ID\">ID0330</Col><Col id=\"MENU_NM\">NEWS LETTER</Col></Row><Row><Col id=\"MENU_NM\">파트너즈센터</Col><Col id=\"LEVEL\">1</Col><Col id=\"UPPER_MENU_ID\">ID0000</Col><Col id=\"MENU_ID\">ID0400</Col></Row><Row><Col id=\"MENU_NM\">파트너즈센터소개</Col><Col id=\"LEVEL\">2</Col><Col id=\"UPPER_MENU_ID\">ID0400</Col><Col id=\"MENU_ID\">ID0410</Col></Row><Row><Col id=\"MENU_NM\">센터장인사말</Col><Col id=\"LEVEL\">3</Col><Col id=\"UPPER_MENU_ID\">ID0410</Col><Col id=\"MENU_ID\">ID0411</Col></Row><Row><Col id=\"MENU_NM\">개요</Col><Col id=\"LEVEL\">3</Col><Col id=\"UPPER_MENU_ID\">ID0410</Col><Col id=\"MENU_ID\">ID0412</Col></Row><Row><Col id=\"MENU_NM\">조직도</Col><Col id=\"LEVEL\">3</Col><Col id=\"UPPER_MENU_ID\">ID0410</Col><Col id=\"MENU_ID\">ID0413</Col></Row><Row><Col id=\"MENU_NM\">연혁</Col><Col id=\"LEVEL\">3</Col><Col id=\"UPPER_MENU_ID\">ID0410</Col><Col id=\"MENU_ID\">ID0414</Col></Row><Row><Col id=\"MENU_NM\">SMC협력기관</Col><Col id=\"LEVEL\">2</Col><Col id=\"UPPER_MENU_ID\">ID0400</Col><Col id=\"MENU_ID\">ID0420</Col></Row><Row><Col id=\"MENU_NM\">SMC협력체결안내</Col><Col id=\"LEVEL\">3</Col><Col id=\"UPPER_MENU_ID\">ID0420</Col><Col id=\"MENU_ID\">ID0421</Col></Row><Row><Col id=\"MENU_NM\">우리동네 협력기관 찾기</Col><Col id=\"LEVEL\">3</Col><Col id=\"UPPER_MENU_ID\">ID0420</Col><Col id=\"MENU_ID\">ID0422</Col></Row><Row><Col id=\"MENU_NM\">파트너지원</Col><Col id=\"LEVEL\">2</Col><Col id=\"UPPER_MENU_ID\">ID0400</Col><Col id=\"MENU_ID\">ID0430</Col></Row><Row><Col id=\"MENU_NM\">SMC파트너지원내용</Col><Col id=\"LEVEL\">3</Col><Col id=\"UPPER_MENU_ID\">ID0430</Col><Col id=\"MENU_ID\">ID0431</Col></Row><Row><Col id=\"MENU_NM\">인재지원</Col><Col id=\"LEVEL\">3</Col><Col id=\"UPPER_MENU_ID\">ID0430</Col><Col id=\"MENU_ID\">ID0432</Col></Row><Row><Col id=\"MENU_NM\">이용안내</Col><Col id=\"LEVEL\">1</Col><Col id=\"UPPER_MENU_ID\">ID0000</Col><Col id=\"MENU_ID\">ID0500</Col></Row><Row><Col id=\"LEVEL\">2</Col><Col id=\"UPPER_MENU_ID\">ID0500</Col><Col id=\"MENU_ID\">ID0510</Col><Col id=\"MENU_NM\">FAQ</Col></Row><Row><Col id=\"LEVEL\">2</Col><Col id=\"UPPER_MENU_ID\">ID0500</Col><Col id=\"MENU_ID\">ID0520</Col><Col id=\"MENU_NM\">포털가이드</Col></Row></Rows>");
            this._addDataset(obj.name, obj);
            obj = null;

            obj = new Dataset("gds_user", this);
            obj._setContents("");
            this._addDataset(obj.name, obj);
            obj = null;

            obj = new Dataset("gds_commcode", this);
            obj._setContents("<ColumnInfo><Column id=\"GROUP\" type=\"STRING\" size=\"256\"/><Column id=\"CODE\" type=\"STRING\" size=\"256\"/><Column id=\"NAME\" type=\"STRING\" size=\"256\"/><Column id=\"ORD\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"GROUP\">PATIENT_TYPE</Col><Col id=\"NAME\">의뢰</Col><Col id=\"ORD\">1</Col><Col id=\"CODE\">S</Col></Row><Row><Col id=\"GROUP\">PATIENT_TYPE</Col><Col id=\"NAME\">되의뢰</Col><Col id=\"ORD\">2</Col><Col id=\"CODE\">R</Col></Row><Row><Col id=\"GROUP\">PATIENT_TYPE</Col><Col id=\"NAME\">조회요청</Col><Col id=\"ORD\">3</Col><Col id=\"CODE\">I</Col></Row><Row><Col id=\"NAME\">진행</Col><Col id=\"ORD\">1</Col><Col id=\"GROUP\">PROGRESS_TYPE</Col><Col id=\"CODE\">P</Col></Row><Row><Col id=\"NAME\">부도</Col><Col id=\"ORD\">2</Col><Col id=\"GROUP\">PROGRESS_TYPE</Col><Col id=\"CODE\">S</Col></Row></Rows>");
            this._addDataset(obj.name, obj);
            obj = null;

            obj = new Dataset("gds_message", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"256\"/><Column id=\"NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"CODE\">beforesave</Col><Col id=\"NAME\">저장하시겠습니까?</Col></Row><Row><Col id=\"CODE\">aftersave</Col><Col id=\"NAME\">저장되었습니다.</Col></Row><Row><Col id=\"CODE\">beforesearch</Col><Col id=\"NAME\">조회하시겠습니까?</Col></Row><Row><Col id=\"CODE\">aftersearch</Col><Col id=\"NAME\">조회되었습니다.</Col></Row><Row><Col id=\"CODE\">validate</Col><Col id=\"NAME\">{0} 은(는) 필수입력 항목입니다.</Col></Row></Rows>");
            this._addDataset(obj.name, obj);
            obj = null;


            

        };
        
        // property, event, createMainFrame
        this.on_initApplication = function()
        {
            // properties
            this.set_id("spp");
            this.set_version("");
            this.set_tracemode("none");
            this.set_themeid("default.xtheme");

            if (this._is_attach_childframe)
            	return;

            // frame
            var mainframe = this.createMainFrame("mainframe", "absolute", "0", "0", "1280", "900", null, null, this);
            mainframe.set_resizable("true");
            mainframe.set_showtitlebar("true");
            mainframe.set_showstatusbar("true");
            mainframe.on_createBodyFrame = this.mainframe_createBodyFrame;

            // tray
            var tray = null;

        };
        

        
        this.mainframe_createBodyFrame = function()
        {
            var obj = new ChildFrame("childframe", "absolute", null, null, null, null, null, null, "", this);
            this.addChild(obj.name, obj);
            this.frame = obj;
            obj.set_formurl(application._quickview_formurl);
            obj.set_showtitlebar("false");
            obj.set_showstatusbar("false");
            obj = null;
        };
        
        this.on_initEvent = function()
        {

        };
        
        // screeninfo
        this.loadScreenInfo = function()
        {

        }
        
        // script Compiler
        this.registerScript("spp.xadl", function() {

        this.gv_topframe = null;
        this.gv_infoframe = null;
        this.gv_homeframe = null;
        this.gv_workframe = null;
        this.gv_bottomframe = null;

        this.gv_topframe_height = 60;
        this.gv_infoframe_height = 45;
        this.gv_bottomframe_height = 40;
        this.gv_mainframe_width = 1264;
        this.gv_mainframe_height = 900;

        this.application_onload = function(obj,e)
        {
        	this.gv_topframe = application.mainframe.vframeset.topframe;
        	this.gv_infoframe = application.mainframe.vframeset.infoframe;
        	this.gv_homeframe = application.mainframe.vframeset.homeframe;
        	this.gv_workframe = application.mainframe.vframeset.workframe;
        	this.gv_bottomframe = application.mainframe.vframeset.bottomframe;	
        	this.gv_vframeset = application.mainframe.vframeset;
        	this.gv_vframeset.set_separatesize(this.gv_topframe_height+",0,*,0,"+this.gv_bottomframe_height);
        	
        	var sXadlUrl = application.xadl;	
        	
        	//tool 실행 또는 로컬인 경우
        	if(sXadlUrl.indexOf("file://") > 0 || sXadlUrl.indexOf("localhost") > 0)
        	{
        		//global변수에 설정된 값으로 기본사용
        	}
        	//개발인경우
        	else if(sXadlUrl.indexOf("203.249.223.88") > 0)
        	{
        		application.services["svc"].url = "http://203.249.223.88:8091/";
        		application.gv_location = "DEV";
        	}
        	//운영인경우
        	else if(sXadlUrl.indexOf("운영IP") > 0)
        	{
        		application.services["svc"].url = "운영IP";
        		application.gv_location = "OPR";
        	}
        }

        this.MainFrame_onsize = function(obj,e)
        {
        	
        }

        this.MainFrame_onsyscommand = function(obj,e)
        {

        }
        
        });


        this.loadTypedefition();
        this.loadScreenInfo();
        this.loadTheme("default.xtheme");

this.loadCss("css::Common.css");
this.loadCss("css::TopBottomFrame.css");

    };
}
)();
