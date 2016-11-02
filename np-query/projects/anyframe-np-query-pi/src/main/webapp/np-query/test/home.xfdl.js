(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        this.on_create = function()
        {
            // Declare Reference
            var obj = null;
            
            if (Form == this.constructor) {
                this.set_name("home");
                this.set_classname("home");
                this.set_titletext("play nexacro");
                this._setFormPosition(0,0,991,724);
            }
            this.style.set_background("transparent");

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_list", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_temp", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_notice", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Div("div_notice", "absolute", "0", "0", "991", "280", null, null, this);
            obj.set_taborder("0");
            obj.set_scrollbars("none");
            this.addChild(obj.name, obj);

            obj = new Static("Static10", "absolute", "0", "0", "66", "280", null, null, this);
            obj.set_taborder("6");
            obj.style.set_background("URL('image::class/MF_img_LeftBlur.png')");
            this.addChild(obj.name, obj);

            obj = new Static("Static09", "absolute", "925", "0", "66", "280", null, null, this);
            obj.set_taborder("7");
            obj.style.set_background("URL('image::class/MF_img_RightBlur.png')");
            this.addChild(obj.name, obj);

            obj = new Button("btn_prev_notice", "absolute", "0", "120", "38", "60", null, null, this);
            obj.set_taborder("1");
            obj.set_cssclass("MF_btn_left");
            this.addChild(obj.name, obj);

            obj = new Button("btn_next_notice", "absolute", "952", "120", "38", "60", null, null, this);
            obj.set_taborder("5");
            obj.set_cssclass("MF_btn_right");
            obj.set_enable("false");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 991, 724, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("home");
            		p.set_titletext("play nexacro");
            		p.style.set_background("transparent");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("home.xfdl", function() {
        /******************************************************************************
        	화면설명 : 홈 화면
        	변경이력 : [2014.03.20] 임영훈 - 최초작성
        				[2014.06.19] 임영훈 - 게시물 조회 추가
        				[2015.04.22] 임영훈 - 화면 리뉴얼
        ******************************************************************************/

        this.LIST_COUNT = 12;		// 한번에 가져올 게시글 개수
        this.MAX_LIST_COUNT = 48;	// 최대 게시글 개수

        this.COL_POS_X = [0, 251, 501, 751];

        // 공지사항 보기 타이머
        this.NOTICE_TIMER_ID = 429;
        this.NOTICE_TIMER_ELAPSE = 5000;

        var colPosTops = [300, 300, 300, 300];		// 열(컬럼)의 블럭 위치
        var nextMarkSeq = 0;						// New, Hot 용 컴포넌트 순번

        /**
         * onload Event Handler
         * @param {Form} obj Event가 발생한 Form Component
         * @param {nexacro.LoadEventInfo} e nexacro.LoadEventInfo
         */
        this.home_onload = function(obj,e)
        {
        	//subject에 옵저버 추가 및 callBack함수 등록
        	BB.langTypeSubject.addObserver(this, this.notifyLangage); 	
        	
        	BB.tracking.ga({"command": "set",
        					"hittype": "page",
        					"page": "/home",
        					"title": "home"
        				   });

        	this.prepareDiv();
        	
        	// 화면 로드시 notifyLangage 발생함.
        	if ( !Eco.isEmpty(BB.getUserInfo("lang_type")) )
        	{
        		this.doSearchNotice();
        	}
        }

        this.home_onbeforeclose = function(obj,e)
        {
        	if(obj != e.fromobject) 
        	{
        		e.stopPropagation();
        	}
        	else
        	{
        		//화면 종료시 Subject에 등록된 옵저버를 제거한다.
        		BB.langTypeSubject.removeObserver(this);
        	}
        }

        this.home_ontimer = function(obj,e)
        {
        	if ( e.timerid == this.NOTICE_TIMER_ID )
        	{
        		var curIdx = this._cur_step_index;
        		var comp;
        		if ( curIdx < (this._step_count-1) )
        		{
        			comp = this.components["btn_step_"+ (curIdx+1)];
        			comp.click();
        		}
        		else
        		{
        			this.goFirstNotice();
        		}
        	}
        }

        /*======================================================================================
         Fuction Area
        =======================================================================================*/
        this.notifyLangage = function(langType)
        {
        	// 위치 초기화
        	colPosTops = [300, 300, 300, 300];
        	
        	// 게시물 Div 제거
        	var divs = Eco.XComp.query(this, "prop[name] ^= 'div_post_'");
        	var comp;
        	for (var i=0,len=divs.length; i<len; i++)
        	{
        		comp = this.removeChild(divs[i].name);
        		comp.destroy();
        	}
        	
        	// Step 버튼
        	var steps = Eco.XComp.query(this, "prop[name] ^= 'btn_step_'");
        	for (var i=0,len=steps.length; i<len; i++)
        	{
        		steps[i].set_visible(false);
        	}
        			
        	// 스템 타이머 초기화
        	this.killTimer(this.NOTICE_TIMER_ID);
        	
        	this.goFirstNotice();

        	// New, Hot 컴포넌트 숨김 - 재사용
        	nextMarkSeq = 0;
        	
        	var marks = Eco.XComp.query(this, "prop[name] ^= 'sta_mark_'");
        	for (var i=0,len=marks.length; i<len; i++)
        	{
        		marks[i].set_visible(false);
        	}
        	
        	// 더보기 컴포넌트 숨김 - 재사용
        	var div = this.components["div_more"];
        	if ( div )
        	{
        		div.set_visible(false);
        	}
        	
        	// 데이터 삭제
        	this.ds_list.clearData();
        	
        	// Div 준비
        	this.prepareDiv();
        	
        	// 데이터 조회
        	this.doSearchNotice();
        }

        /**
         * 공지사항 조회
         */
        this.doSearchNotice = function()
        {	
        	application.set_usewaitcursor(false);
        	
        	var tr = BB.getTran(this, "selectHomeNotice");
        	tr.setUrl("/common/selectHomeNotice.do");
        	tr.setInDs('');
        	tr.setOutDs("ds_notice=ds_output");
        	tr.setArg("");
        	tr.setCallback("serviceCallback"); //미설정시 기본은 serviceCallback
        	tr.run();
        }

        // 게시물 조회
        this.doSearchPost = function()
        {	
        	application.set_usewaitcursor(false);
        	
        	var cnt = this.ds_list.rowcount;
        	var arg = "s_num=" + (cnt+1) + " e_num=" + (cnt + this.LIST_COUNT);
        		
        	var tr = BB.getTran(this, "selectHomePost");
        	tr.setUrl("/common/selectHomePost.do");
        	tr.setInDs('');
        	tr.setOutDs("ds_temp=ds_output");
        	tr.setArg(arg);
        	tr.setCallback("serviceCallback"); //미설정시 기본은 serviceCallback
        	tr.run();
        }

        /**
         * transaction callback
         * @param {string} id service id
         * @param {number} cd error code
         * @param {string} msg error message
         */ 
        this.serviceCallback = function(id,cd,msg)
        {
        	application.set_usewaitcursor(true);
        	
        	if ( cd < 0 )
        	{
        		alert(BB.getMsg("7000"));
        		return;
        	}

        	if ( id == "selectHomeNotice" )
        	{
        		this.showNotice();
        		this.doSearchPost();
        	}
        	else if ( id == "selectHomePost" )
        	{
        		//Eco.Logger.startElapsed();
        		this.showPostList();
        		//Eco.Logger.debug({'message': "end of job", 'elapsed': true});
        		this.prepareDiv();
        	}
        }

        // 속도 개선을 위해 앞으로 그려질 Div 를 미리 생성해 둔다.
        this.prepareDiv = function()
        {
        	var name, comp;
        	var cnt = this.LIST_COUNT;
        	var curSeq = this.ds_list.rowcount;
        	for (var i=0; i<cnt; i++)
        	{
        		name = "div_post_" + (curSeq + i);
        		comp = new Div(name, "absolute", 0, 0, 240, 10);
        		comp.set_visible(false);
        		comp.set_scrollbars("none");
        		comp.set_applystyletype("keep");
        		comp.set_cssclass("MF_div_block");
        		comp.addEventHandler("onclick", this.div_onclick, this);
        		comp.addEventHandler("onmouseenter", this.div_onmouseenter, this);			
        		this.addChild(name, comp);
        		comp.show();
        	}
        }

        // 공지사항 보이기
        this.showNotice = function()
        {
        	var container = this.div_notice;
        	var ds = this.ds_notice;
        	var cnt = ds.rowcount;
        	var name, comp;
        	var x = 0;
        	var w = 991;
        	var h = 280;
        	
        	var noticeComps = Eco.XComp.query(container, "prop[name] ^= 'notice_comp_'");
        	for (var i=0,len=noticeComps.length; i<len; i++)
        	{
        		comp = container.removeChild(noticeComps[i].name);
        		comp.destroy();
        	}

        	for (var i=0; i<cnt; i++)
        	{		
        		name = "notice_comp_" + i;
        		
        		comp = new nexacro.HTMLViewer();
        		comp.init(name, "absolute", x, 0, w, h);
        		container.addChild(name, comp);
        		comp.style.set_background("transparent");
        		comp.style.set_border("0px none #ffffff");
        		comp.style.set_padding("0 0 0 0");
        		comp.set_scrollbars("none");
        		comp.set_autofittype("none");
        		comp.set_lineheight(BB.htmlLineHeight);
        		comp.set_html(BB.util.decodeXml(ds.getColumn(i, "system_notice_content")));
        		comp.show();
        		
        		x += w;
        	}
        	
        	var enable = ( cnt < 2 ? false : true);
        	this.btn_prev_notice.set_enable(enable);
        	this.btn_next_notice.set_enable(enable);
        		
        	// 스텝 버튼 ( 1건 이상일 때 표시)
        	if ( cnt > 1 )
        	{
        		var btnWholeWidth = ( 21 * cnt ) + ( 9 * (cnt-1));
        		var posX = Math.round((container.getOffsetWidth()-btnWholeWidth)/2);

        		for (var i=0; i<cnt; i++)
        		{
        			name = "btn_step_"+i;
        			comp = this.components[name];
        			if ( !comp )
        			{
        				comp = new Button(name, "absolute", posX, 259, 21, 21);
        				comp.set_cssclass("MF_btn_step");
        				this.addChild(name, comp);
        				comp.addEventHandler("onclick", this.btn_step_onclick, this);
        				comp.show();
        			}
        			comp.set_left(posX);
        			comp.set_visible(true);
        			comp.bringToFront();		
        			
        			posX += 30; // 21 + 9
        			
        			if ( i == 0 )
        			{
        				comp.setSelectStatus(true);
        			}
        			else
        			{
        				comp.setSelectStatus(false);
        			}
        		}
        	}
        	
        	this._step_count = cnt;
        	this._cur_step_index = 0;
        		
        	var control_elem = container.getElement();
        	if (control_elem)
        	{
        		// 이 값을 지정하지 않으면 동작하지 않는다.
        		// 애니메이션이 동작하지 않는다.
        		control_elem.hscroll_limit = w * cnt;
        	}
        	
        	// 타이머 설정
        	if ( cnt > 1 )
        	{
        		this.setTimer(this.NOTICE_TIMER_ID, this.NOTICE_TIMER_ELAPSE);
        	}
        }

        // 이전 버튼 클릭
        this.btn_prev_notice_onclick = function(obj,e)
        {
        	var curIdx = this._cur_step_index;
        	if ( curIdx > 0)
        	{
        		var comp = this.components["btn_step_"+ (curIdx-1)];
        		comp.click();
        	}
        }

        // 다음 버튼 클릭
        this.btn_next_notice_onclick = function(obj,e)
        {
        	var curIdx = this._cur_step_index;
        	if ( curIdx < (this._step_count-1) )
        	{
        		var comp = this.components["btn_step_"+ (curIdx+1)];
        		comp.click();		
        	}
        }

        // 스텝 버튼 클릭
        this.btn_step_onclick = function(obj,e)
        {
        	var idx = parseInt(obj.name.replace("btn_step_", ""), 10);
        	
        	if ( this._cur_step_index != idx )
        	{
        		this.animation_start(this.div_notice, idx, 400);
        		
        		this._cur_step_index = idx;
        		
        		var cnt = this._step_count;
        		var select;
        		for (var i=0; i<cnt; i++)
        		{
        			select = ( i == idx ? true : false );
        			this.components["btn_step_"+i].setSelectStatus(select);
        		}
        		
        		// 타이머 초기화
        		this.killTimer(this.NOTICE_TIMER_ID);
        		this.setTimer(this.NOTICE_TIMER_ID, this.NOTICE_TIMER_ELAPSE);
        	}
        }

        this.showPostList = function()
        {	
        	var clone = Eco.clone;
        	var ds = this.ds_temp;
        	var cnt = ds.rowcount;
        	var comps = this.components;
        	var name, comp, data, image, param;	
        	var wait = false;
        	var x = this.COL_POS_X;
        	var col, pos;
        	var curSeq = this.ds_list.rowcount;

        	for (var i=0; i<cnt; i++)
        	{
        		pos = Eco.array.min(colPosTops);
        		col = Eco.array.indexOf(colPosTops, pos);
        		
        		name = "div_post_" + (curSeq + i);
        		comp = comps[name];
        		
        		comp.set_visible(false);
        		
        		this.showPost(comp, ds, i);
        		
        		comp.set_top(colPosTops[col]);
        		
        		colPosTops[col] = comp.getOffsetBottom() + 20;
        		
        		comp.set_left(x[col]);
        		comp.set_visible(true);
        		
        		this.setPostMark(comp, i);
        	}
        	
        	this.arrangeEnd();

        	// 추가된 데이터셋을 담는다.
        	this.ds_list.appendData(ds);
        }

        this.showPost = function(div,ds,row)
        {
        	var top = 33;
        	var name, comp, comps = div.components;
        	var size;
        	
        	//-------------------------------
        	// title
        	//-------------------------------
        	name = "PNTitle";
        	comp = comps[name];
        	
        	if ( !comp )
        	{
        		comp = new nexacro.PNTitle(name, "absolute", 9, top, 222, 10);
        		div.addChild(name, comp);		
        		comp.addEventHandler("onclick", this.div_comp_onclick, this);
        		comp.show();
        		comp.set_cssclass("WF_sta_subtitle");
        	}
        		
        	var title = ds.getColumn(row, "post_title");
        	var langtypes = ds.getColumn(row, "lang_type_other");
        	var category = ds.getColumn(row, "category");
        	var attachment = ds.getColumn(row, "has_attach_file");		

        	comp.set_enableredraw(false);
        	comp.set_title(title);

        	/* 카테고리 및 첨부파일 표시 제거
        	comp.set_langtypes(langtypes);
        	comp.set_category(category);
        	comp.set_attachment(attachment);

        	size = Eco.XComp.PositionSize.getTextSize(comp, title, false);
        	if ( (langtypes && langtypes.length > 0) || (category && category.length > 0) || 
        		 ( Eco.isNumber(attachment) && attachment > 0) )
        	{
        		var aLangTypes = langtypes.split(",");
        		var aCategory = category.split(",");
        	
        		// start ==> 5, width==>20, height==>20, gap==>2
        		var addWidth = 5 + (aLangTypes.length * 22) + (aCategory.length * 22);
        		
        		addWidth += (Eco.isNumber(attachment) && attachment > 0 ? 22 : 0);

        		var needHeight = 18;
        		var pad = " ";
        		var len = aLangTypes.length+aCategory.length;
        		for (var i=0; i<len; i++)
        		{
        			pad += "12";
        		}

        		var size2 = Eco.XComp.PositionSize.getTextSize(comp, title + pad, true, 214);
        		needHeight = Math.max(size2[1], needHeight);

        		size[0] += addWidth;
        		size[1] = Math.max(size[1], needHeight) + 2;
        	}
        	*/
        	size = Eco.XComp.PositionSize.getTextSize(comp, title, true, 214);
        	
        	comp.set_height(size[1]);
        	comp.set_enableredraw(true);
        	
        	top = comp.getOffsetBottom() + 10;
        	
        	//-------------------------------
        	// content
        	//-------------------------------
        	name = "sta_content";
        	comp = comps[name];
        	
        	if ( !comp )
        	{
        		comp = new Static(name, "absolute", 9, top, 222, 10);
        		div.addChild(name, comp);
        		comp.set_wordwrap("char");
        		comp.addEventHandler("onclick", this.div_comp_onclick, this);
        		comp.show();
        	}
        	
        	var content = ds.getColumn(row, "remove_html_content");	
        	comp.set_text(content);
        	
        	size = Eco.XComp.PositionSize.getTextSize(comp, content, true, 222);
        	
        	comp.set_height(size[1]);
        	top = comp.getOffsetBottom() + 10;
        	
        	//-------------------------------
        	// image
        	//-------------------------------
        	var image = ds.getColumn(row, "file_path_name");
        	if ( image )
        	{
        		name = "img_image";
        		comp = comps[name];
        		
        		if ( !comp )
        		{
        			comp = new ImageViewer(name, "absolute", 8, top, 220, 146);
        			div.addChild(name, comp);
        			comp.set_cssclass("MF_img_thumbnail");
        			comp.addEventHandler("onclick", this.div_comp_onclick, this);
        			comp.show();
        		}
        		comp.set_visible(true);

        		image = BB.getThumbnailUrl(image, 220, 146);
        		comp.set_image(image);
        		
        		top = comp.getOffsetBottom() + 10;
        	}
        	else
        	{
        		name = "img_image";
        		comp = comps[name];
        		
        		if ( comp )
        		{
        			comp.set_visible(false);
        		}
        	}
        	
        	//-------------------------------
        	// good
        	//-------------------------------
        	name = "sta_good";
        	comp = comps[name];
        	
        	if ( !comp )
        	{
        		comp = new Static(name, "absolute", 11, top, 55, 25);
        		div.addChild(name, comp);
        		comp.set_cssclass("WF_sta_like2");
        		comp.addEventHandler("onclick", this.div_comp_onclick, this);
        		comp.show();
        	}

        	comp.set_text(ds.getColumn(row, "good_count"));
        	
        	//-------------------------------
        	// bad
        	//-------------------------------
        	name = "sta_bad";
        	comp = comps[name];
        	
        	if ( !comp )
        	{
        		comp = new Static(name, "absolute", 60, top, 55, 25);
        		div.addChild(name, comp);
        		comp.set_cssclass("WF_sta_bad2");
        		comp.addEventHandler("onclick", this.div_comp_onclick, this);
        		comp.show();
        	}

        	comp.set_text(ds.getColumn(row, "bad_count"));
        	
        	//-------------------------------
        	// comment
        	//-------------------------------
        	name = "sta_comment";
        	comp = comps[name];
        	
        	if ( !comp )
        	{
        		comp = new Static(name, "absolute", 109, top, 55, 25);
        		div.addChild(name, comp);
        		comp.set_cssclass("WF_sta_sumNum01");
        		comp.addEventHandler("onclick", this.div_comp_onclick, this);
        		comp.show();
        	}

        	comp.set_text(ds.getColumn(row, "comment_count"));	
        	
        	//-------------------------------
        	// view
        	//-------------------------------
        	name = "sta_view";
        	comp = comps[name];
        	
        	if ( !comp )
        	{
        		comp = new Static(name, "absolute", 165, top, 70, 25);
        		div.addChild(name, comp);
        		comp.set_cssclass("WF_sta_sumNum02");
        		comp.addEventHandler("onclick", this.div_comp_onclick, this);
        		comp.show();
        	}

        	comp.set_text(ds.getColumn(row, "view_count"));
        		
        	div.set_height(comp.getOffsetBottom() + 33);
        }

        // 게시물에 Q&A, 신규(New), 핫(Hot) 표시
        this.setPostMark = function(comp,row)
        {
        	var mark;
        	var l = comp.getOffsetLeft() + 184;
        	var t = comp.getOffsetTop() - 3;
        	
        	// Q & A 표시
        	if ( this.ds_temp.getColumn(row, "bbs_id") == "Q10" )
        	{
        		mark = this.getMarkComp();
        		mark.set_cssclass("MF_sta_QnA");
        		mark.move(l, t);
        		mark.set_visible(true);
        		mark.bringToFront();
        		
        		l = comp.getOffsetLeft() + 144;
        	}
        	
        	if ( this.ds_temp.getColumn(row, "is_hot") )
        	{
        		mark = this.getMarkComp();
        		mark.set_cssclass("MF_sta_hot");
        		mark.move(l, t);
        		mark.set_visible(true);
        		mark.bringToFront();
        	}
        	else
        	{
        		if ( this.ds_temp.getColumn(row, "is_new") )
        		{
        			mark = this.getMarkComp();
        			mark.set_cssclass("MF_sta_new");
        			mark.move(l, t);
        			mark.set_visible(true);
        			mark.bringToFront();
        		}
        	}
        }

        this.getMarkComp = function()
        {
        	var name = "sta_mark_" + nextMarkSeq;
        	var comp = this.components[name];
        	if ( !comp )
        	{
        		comp = new Static(name, "absolute", 0, 0, 36, 37);
        		this.addChild(name, comp);
        		comp.set_visible(false);
        		comp.show();	
        	}
        	
        	nextMarkSeq++;
        	
        	return comp;
        }

        // 더보기 영역을 표시하고 전체 스크롤을 조정한다.
        this.arrangeEnd = function()
        {
        	// 더보기(+) 	
        	var div = this.components["div_more"];
        	if ( this.ds_list.rowcount >= this.MAX_LIST_COUNT )
        	{
        		if ( div )
        		{
        			div.set_visible(false);
        		}
        	}
        	else
        	{
        		// 가져온 데이터셋 건수가 정해진 리스트 건수보다 작으면 다음 데이터 없음
        		if ( this.ds_temp.rowcount < this.LIST_COUNT )
        		{
        			if ( div ) 
        			{
        				div.set_visible(false);
        			}
        		}
        		else
        		{
        			if ( !div )
        			{
        				div = new Div("div_more", "absolute", 0, 0, 240, 240);
        				div.set_cssclass("MF_div_block");
        				this.addChild(div.name, div);
        				div.show();
        				
        				var btn = new Button("btn_more", "absolute", 75, 89, 80, 79);
        				btn.set_cssclass("MF_btn_more");
        				div.addChild(btn.name, btn);
        				btn.set_text("more");
        				btn.show();
        				btn.addEventHandler("onclick", this.btn_more_onclick, this);
        			}
        			
        			var pos = Eco.array.min(colPosTops);
        			var col = Eco.array.indexOf(colPosTops, pos);
        			
        			var l = this.COL_POS_X[col];
        			var t = colPosTops[col];
        			div.move(l, t);
        			div.set_visible(true);
        		}
        	}
        	
        	var pos = Eco.array.max(colPosTops);
        	
        	if ( div && div.visible )
        	{
        		pos = Math.max(pos, div.getOffsetBottom()+20);
        	}

        	this.set_height(pos);
        	
        	BB.index.adjustContentHeight(pos);
        }

        // Div onclick
        this.div_onclick = function(obj,e)
        {
        	var row = parseInt(obj.parent.name.replace("div_post_", ""), 10);

        	this.goShow(row);
        }

        // Div 안의 컴포넌트 onclick
        this.div_comp_onclick = function(obj,e)
        {	
        	var row = parseInt(obj.parent.name.replace("div_post_", ""), 10);
        	
        	this.goShow(row);
        }

        // 컴포넌트간 간격이 좁아 마우스가 빠져도 슈도가 안바뀌는 경우가 생겨서 추가한 코드임.
        this.div_onmouseenter = function(obj,e)
        {
        	if ( e.fromreferenceobject != obj ) return;
        	
        	var divs = Eco.XComp.query(this, "prop[name] ^= 'div_post_'");
        	var len = divs.length;
        	
        	for (var i=0; i<len; i++)
        	{
        		if ( obj.name != divs[i].name )
        		{
        			divs[i].setCurrentPseudo("normal");
        		}
        	}
        }

        this.goShow = function(row)
        {
        	var bbsId = this.ds_list.getColumn(row, "bbs_id");
        	var postId = this.ds_list.getColumn(row, "post_id");

        	var param = {
        		'bbsId': this.ds_list.getColumn(row, "bbs_id"),
        		'postId': this.ds_list.getColumn(row, "post_id"),
        		'keyword': ""
        	};
        	
        	BB.index.goMain("show", param);
        }

        this.btn_more_onclick = function(obj,e)
        {
        	this.doSearchPost();
        }

        this.goFirstNotice = function()
        {
        	// 처음으로 
        	this._cur_step_index = 0;
        	
        	var cnt = this._step_count;
        	var select;
        	for (var i=0; i<cnt; i++)
        	{
        		select = ( i == 0 ? true : false );
        		this.components["btn_step_"+i].setSelectStatus(select);
        	}
        	
        	var control_elem = this.div_notice.getElement();
        	if (control_elem)
        	{				
        		control_elem.setElementHScrollPos(0);
        	}
        }

        /*
        	애니메이션 효과를 위한 function
        	
        	==> Form 의 Step 기능을 사용하려 했으나 stepcount 를 동적으로 변경하지 못한다.
        	==> FormBase.js 의 stepchange 애니메이션 관련 코드를 흉내내어 처리한다.
        */
        this.animation_start = function(div,target_index,duration)
        {
        	if (this._animation_change_info)
        	{
        		this._on_cancel_animation();
        	}
        	
        	var control_elem = div.getElement();
        	if (control_elem)
        	{	
        		var info = {};
        		info.is_alive = true;
        		info.target_comp = div;
        		info.target_index = target_index;
        		info.starttime = Date.now();
        		info.duration = duration;
        		
        		var hscroll_step = control_elem.hscroll_limit / this._step_count; 			
        		info.startpos = control_elem.scroll_left;
        		info.endpos = hscroll_step * target_index;

        		var pThis = this;
        		info.timer = new nexacro.AnimationFrame(this, function () { pThis._on_animation(); });
        		info.timer.start();
        		
        		this._animation_change_info = info;
        	}
        }

        this._on_animation = function ()
        {
        	var info = this._animation_change_info;
        	if (info && info.is_alive)
        	{
        		var t = Date.now() - info.starttime; // 0 ~ duration
        		var d = info.duration;
        		var q = t / d - 1;
        		var c = Math.min((q*q*q+1), 1); // Curve3Out Interpolation
        		var curpos = info.startpos + ((info.endpos - info.startpos) * c);			   
        		
        		var target = info.target_comp;
                var control_elem = target.getElement();
                if (control_elem)
                {
        			control_elem.setElementHScrollPos(curpos);			
                }
        		
        		if (t >= info.duration)
        		{
        			this._on_end_animation();
        		}
        		else
        		{
        			info.timer.start();
        		}
        	}
        };

        this._on_end_animation = function ()
        {
        	var info = this._animation_change_info;
        	if (!info)
        		return;

        	info.is_alive = false;
        	if (info.timer)
        		info.timer.stop();
        		
        	var control_elem = info.target_comp.getElement();
        	if (control_elem)
        	{		
        		var new_index = info.target_index;
        		delete info;

        		var hscroll_step = control_elem.hscroll_limit / this._step_count;
        		control_elem.setElementHScrollPos(hscroll_step * new_index);
        	}
        	
        	this._animation_change_info = null;
        };

        this._on_cancel_animation = function ()
        {
        	var info = this._animation_change_info;
        	if (!info)
        		return;

        	info.is_alive = false;
        	if (info.timer)
        		info.timer.stop();
        	delete info;
        	this._animation_change_info = null;
        };
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.home_onload, this);
            this.addEventHandler("onbeforeclose", this.home_onbeforeclose, this);
            this.addEventHandler("ontimer", this.home_ontimer, this);
            this.btn_prev_notice.addEventHandler("onclick", this.btn_prev_notice_onclick, this);
            this.btn_next_notice.addEventHandler("onclick", this.btn_next_notice_onclick, this);

        };

        this.loadIncludeScript("home.xfdl");

       
    };
}
)();
