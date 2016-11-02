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
                this.set_name("sample08");
                this.set_classname("comm_cardboard");
                this.set_titletext("카드형 게시판");
                this._setFormPosition(0,0,1024,768);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_temp", this);
            obj._setContents("<ColumnInfo><Column id=\"KEY\" type=\"STRING\" size=\"256\"/><Column id=\"TITLE\" type=\"STRING\" size=\"256\"/><Column id=\"DATE\" type=\"STRING\" size=\"256\"/><Column id=\"IMAGE_URL\" type=\"STRING\" size=\"256\"/><Column id=\"CONTENTS\" type=\"STRING\" size=\"256\"/><Column id=\"VIEW_CNT\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"TITLE\">가나다라마바사아자차카타파하</Col><Col id=\"DATE\">20160324</Col><Col id=\"VIEW_CNT\">1</Col><Col id=\"KEY\">001</Col><Col id=\"IMAGE_URL\">http://localhost:8080/test/Chrysanthemum.jpg</Col><Col id=\"CONTENTS\">TESTTESTESTESTESTSETETESTESTSTETSTSETESTSETSETSTES</Col></Row><Row><Col id=\"TITLE\">가나다라마바사아자차</Col><Col id=\"DATE\">20160325</Col><Col id=\"VIEW_CNT\">2</Col><Col id=\"KEY\">002</Col><Col id=\"IMAGE_URL\">http://localhost:8080/test/Desert.jpg</Col><Col id=\"CONTENTS\">TESTTESTESTESTESTSETETESTESTSTETSTSETESTSETSETSTES</Col></Row><Row><Col id=\"TITLE\">가나다라마</Col><Col id=\"DATE\">20160326</Col><Col id=\"VIEW_CNT\">3</Col><Col id=\"KEY\">003</Col><Col id=\"IMAGE_URL\">http://localhost:8080/test/Hydrangeas.jpg</Col><Col id=\"CONTENTS\">TESTTESTESTESTESTSETETESTESTSTETSTSETESTSETSETSTES</Col></Row><Row><Col id=\"TITLE\">가나다라마</Col><Col id=\"DATE\">20160327</Col><Col id=\"VIEW_CNT\">4</Col><Col id=\"KEY\">004</Col><Col id=\"IMAGE_URL\">http://localhost:8080/test/Jellyfish.jpg</Col><Col id=\"CONTENTS\">TESTTESTESTESTESTSETETESTESTSTETSTSETESTSETSETSTES</Col></Row><Row><Col id=\"TITLE\">가나다라마바사아자</Col><Col id=\"DATE\">20160328</Col><Col id=\"IMAGE_URL\">http://localhost:8080/test/Koala.jpg</Col><Col id=\"VIEW_CNT\">1</Col><Col id=\"KEY\">005</Col><Col id=\"CONTENTS\">TESTTESTESTESTESTSETETESTESTSTETSTSETESTSETSETSTES</Col></Row><Row><Col id=\"TITLE\">가나다라마바사아자차카</Col><Col id=\"DATE\">20160329</Col><Col id=\"IMAGE_URL\">http://localhost:8080/test/Lighthouse.jpg</Col><Col id=\"VIEW_CNT\">2</Col><Col id=\"KEY\">006</Col><Col id=\"CONTENTS\">TESTTESTESTESTESTSETETESTESTSTETSTSETESTSETSETSTES</Col></Row><Row><Col id=\"TITLE\">가나다라</Col><Col id=\"DATE\">20160330</Col><Col id=\"IMAGE_URL\">http://localhost:8080/test/Penguins.jpg</Col><Col id=\"VIEW_CNT\">3</Col><Col id=\"KEY\">007</Col><Col id=\"CONTENTS\">TESTTESTESTESTESTSETETESTESTSTETSTSETESTSETSETSTES</Col></Row><Row><Col id=\"TITLE\">가나다라마바사아자</Col><Col id=\"DATE\">20160331</Col><Col id=\"IMAGE_URL\">https://youtu.be/eOI0mb3X7N8</Col><Col id=\"VIEW_CNT\">http://localhost:8080/test/Tulips.jpg</Col><Col id=\"KEY\">008</Col><Col id=\"CONTENTS\">TESTTESTESTESTESTSETETESTESTSTETSTSETESTSETSETSTES</Col></Row></Rows>");
            this.addChild(obj.name, obj);

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

            obj = new Dataset("ds_temp00", this);
            obj._setContents("<ColumnInfo><Column id=\"KEY\" type=\"STRING\" size=\"256\"/><Column id=\"TITLE\" type=\"STRING\" size=\"256\"/><Column id=\"DATE\" type=\"STRING\" size=\"256\"/><Column id=\"IMAGE_URL\" type=\"STRING\" size=\"256\"/><Column id=\"CONTENTS\" type=\"STRING\" size=\"256\"/><Column id=\"VIEW_CNT\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"TITLE\">가나다라마바사아자차카타파하</Col><Col id=\"DATE\">20160324</Col><Col id=\"VIEW_CNT\">1</Col><Col id=\"KEY\">001</Col><Col id=\"IMAGE_URL\">http://localhost:8080/test/Chrysanthemum.jpg</Col><Col id=\"CONTENTS\">TESTTESTESTESTESTSETETESTESTSTETSTSETESTSETSETSTES</Col></Row><Row><Col id=\"TITLE\">가나다라마바사아자차</Col><Col id=\"DATE\">20160325</Col><Col id=\"VIEW_CNT\">2</Col><Col id=\"KEY\">002</Col><Col id=\"IMAGE_URL\">http://localhost:8080/test/Desert.jpg</Col><Col id=\"CONTENTS\">TESTTESTESTESTESTSETETESTESTSTETSTSETESTSETSETSTES</Col></Row><Row><Col id=\"TITLE\">가나다라마</Col><Col id=\"DATE\">20160326</Col><Col id=\"VIEW_CNT\">3</Col><Col id=\"KEY\">003</Col><Col id=\"IMAGE_URL\">http://localhost:8080/test/Hydrangeas.jpg</Col><Col id=\"CONTENTS\">TESTTESTESTESTESTSETETESTESTSTETSTSETESTSETSETSTES</Col></Row><Row><Col id=\"TITLE\">가나다라마</Col><Col id=\"DATE\">20160327</Col><Col id=\"VIEW_CNT\">4</Col><Col id=\"KEY\">004</Col><Col id=\"IMAGE_URL\">http://localhost:8080/test/Jellyfish.jpg</Col><Col id=\"CONTENTS\">TESTTESTESTESTESTSETETESTESTSTETSTSETESTSETSETSTES</Col></Row><Row><Col id=\"TITLE\">가나다라마바사아자</Col><Col id=\"DATE\">20160328</Col><Col id=\"IMAGE_URL\">http://localhost:8080/test/Koala.jpg</Col><Col id=\"VIEW_CNT\">1</Col><Col id=\"KEY\">005</Col><Col id=\"CONTENTS\">TESTTESTESTESTESTSETETESTESTSTETSTSETESTSETSETSTES</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Div("div_board", "absolute", "5", "5", null, null, "5", "64", this);
            obj.set_taborder("0");
            this.addChild(obj.name, obj);

            obj = new Button("btn_more", "absolute", "5", null, null, "55", "5", "5", this);
            obj.set_taborder("1");
            obj.set_text("더보기");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 1024, 768, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("comm_cardboard");
            		p.set_titletext("카드형 게시판");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.addIncludeScript("sample08.xfdl", "lib::comForm.xjs");
        this.addIncludeScript("sample08.xfdl", "lib::comTransaction.xjs");
        this.registerScript("sample08.xfdl", function() {
        /**************************************************************************************************
         * 01. 업무구분				: 
         * 02. 화 면 명				: 
         * 03. 화면설명				:  
         * 04. 관련 화면 및 서비스	: 
         * 05. 관련 테이블명			: 
         * 06. 작 성 자				: 
         * 07. 작 성 일				: 
         * 08. 수정이력
         **************************************************************************************************
         *    수정일            이름        사유
         **************************************************************************************************
         *    
         *************************************************************************************************/

        //-------------------------------------------------------------------------------------------------
        // 1. 공통함수 include
        //-------------------------------------------------------------------------------------------------
        //include "lib::comForm.xjs";
        //include "lib::comTransaction.xjs";

        //-------------------------------------------------------------------------------------------------
        // Form 전역변수 선언
        //-------------------------------------------------------------------------------------------------

        
        this.DIV_LEFT = 5;
        this.DIV_TOP = 5;
        this.DIV_WIDTH = 250;
        this.DIV_HEIGHT = 400;
        this.DIV_X_MARGIN = 5;
        this.DIV_Y_MARGIN = 20;

        this.LIST_COUNT = 8;		// 한번에 가져올 게시글 개수

        this.COL_POS_X = [];
        var colPosTops = [this.DIV_TOP, this.DIV_TOP, this.DIV_TOP, this.DIV_TOP];		// 열(컬럼)의 블럭 위치
        var nextMarkSeq = 0;						// New, Hot 용 컴포넌트 순번

        //-------------------------------------------------------------------------------------------------
        // 2. Form 함수 정의
        //-------------------------------------------------------------------------------------------------
        this.form_onload = function(obj,e)
        {
        	// Form Load 시 필수로 호출
        	//this.gfn_formOnLoad(obj);

        	//화면 초기설정
        	this.fn_init();
        	
        	this.prepareDiv();
        	//this.showPostList();	
        	
        // 	this.premakeCards(this.div_board, this.ADD_CARDS);
        // 	this.showCards(this.div_board, this.ds_list);
        }

        //초기설정
        this.fn_init = function()
        {
        	//X 좌표저장
        	var nX = this.DIV_LEFT;	
        	for(var i = 0; i < 4; i++)
        	{
        		this.COL_POS_X.push(nX);
        		nX += this.DIV_WIDTH + this.DIV_X_MARGIN;
        	}
        }

        //화면종료 시 공통호출함수
        this.fn_close = function()
        {
        	//TO-DO : 닫기 전 Validation체크
        	
        	return true;
        }

        //-------------------------------------------------------------------------------------------------
        // 3. Transaction 함수 정의
        //-------------------------------------------------------------------------------------------------

        //조회
        this.fn_search = function(svcId)
        {
        	switch(svcId)
        	{
        		case "searchlist" :
        			//카드를 조회한다.
        			break;
        			
        		default : 
        			break;
        	}
        }

        //조회 callback
        this.fn_searchCallback = function(svcId,errorCode,errorMsg)
        {
        	if(errorCode < 0){
        		return;
        	}
        	
        	switch(svcId)
        	{
        		case "searchlist" :
        			//카드를 보여준다.
        			this.showPostList();
        			
        			//카드를 미리생성해둔다.
        			this.prepareDiv();		
        			
        			break;
        			
        		default : 
        			break;
        	}	
        }

        //-------------------------------------------------------------------------------------------------
        // 4. User 함수 정의
        //-------------------------------------------------------------------------------------------------

        //Card Div를 미리 생성한다(성능향상을 위해)
        this.prepareDiv = function()
        {
        	var name, comp;
        	var cnt = this.LIST_COUNT;
        	var curSeq = this.ds_list.rowcount;
        	for (var i=0; i<cnt; i++)
        	{
        		name = "div_post_" + (curSeq + i);
        		comp = this.div_board.components[name];
        		if(Eco.isEmpty(comp))
        		{
        			//trace("prepareDiv = "+name);
        			comp = new Div(name, "absolute", 0, 0, this.DIV_WIDTH, this.DIV_HEIGHT);
        			comp.set_visible(false);
        			comp.set_scrollbars("none");
        			comp.set_url("comm::comm_card.xfdl");
        			comp.style.set_border("1 solid #c2c2c2ff");
        			//comp.set_applystyletype("keep");
        			//comp.set_cssclass("MF_div_block");
        			//comp.addEventHandler("onclick", this.div_onclick, this);
        			//comp.addEventHandler("onmouseenter", this.div_onmouseenter, this);			
        			this.div_board.addChild(name, comp);
        			comp.show();
        		}
        	}
        }

        //조회된 데이타셋에 해당하는 카드를 위치를 설정하고 보여준다.
        this.showPostList = function()
        {	
        	var clone = Eco.clone;
        	var ds = this.ds_temp;
        	var cnt = ds.rowcount;
        	var comps = this.div_board.components;
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
        		colPosTops[col] = comp.getOffsetBottom() + this.DIV_Y_MARGIN;
        		
        		//comp.set_height(300);
        		comp.set_left(x[col]);
        		comp.set_visible(true);
        		
        		//this.setPostMark(comp, i);
        	}
        	
        	//this.arrangeEnd();

        	// 추가된 데이터셋을 담는다.
        	this.ds_list.appendData(ds);
        	
        	this.div_board.resetScroll();
        }

        //카드의 정보를 설정한다.
        this.showPost = function(comp,ds,row)
        {
        	var key = ds.getColumn(row, "KEY");
        	var title = ds.getColumn(row, "TITLE");
        	var date = ds.getColumn(row, "DATE");
        	var url = ds.getColumn(row, "IMAGE_URL");
        	var contents = ds.getColumn(row, "CONTENTS");
        	var cnt = ds.getColumn(row, "VIEW_CNT");
        	comp.setInfo(key, title, date, url, contents, cnt);
        }

        //-------------------------------------------------------------------------------------------------
        // 5. Event 함수 정의
        //------------------------------------------------------------------------------------------------

        //더보기버튼클릭 시 
        this.btn_more_onclick = function(obj,e)
        {
        	//카드 정보를 조회한다.
        	//this.fn_search("searchlist");			
        	
        	this.showPostList();
        	
        	this.prepareDiv();
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.form_onload, this);
            this.btn_more.addEventHandler("onclick", this.btn_more_onclick, this);

        };

        this.loadIncludeScript("sample08.xfdl");

       
    };
}
)();
