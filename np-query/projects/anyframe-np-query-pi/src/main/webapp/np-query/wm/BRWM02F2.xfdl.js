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
                this.set_name("BRWM02F2");
                this.set_classname("sample00");
                this.set_titletext("일자별처방-샘플");
                this._setFormPosition(0,0,1224,660);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_history", this);
            obj._setContents("<ColumnInfo><Column id=\"TREAT_DT\" type=\"STRING\" size=\"256\"/><Column id=\"TREAT_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"DEPT_NM\" type=\"STRING\" size=\"256\"/><Column id=\"TREAT_NM\" type=\"STRING\" size=\"256\"/><Column id=\"RESULT_YN\" type=\"STRING\" size=\"256\"/><Column id=\"MEDICINE_YN\" type=\"STRING\" size=\"256\"/><Column id=\"TREAT_ID\" type=\"STRING\" size=\"256\"/><Column id=\"PATIENT_TYPE\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"TREAT_DT\">20160222</Col><Col id=\"TREAT_TYPE\">외래</Col><Col id=\"DEPT_NM\">신장내과분과</Col><Col id=\"TREAT_NM\">홍길동</Col><Col id=\"RESULT_YN\">N</Col><Col id=\"MEDICINE_YN\">N</Col><Col id=\"TREAT_ID\">1</Col></Row><Row><Col id=\"TREAT_DT\">20160130</Col><Col id=\"TREAT_TYPE\">외래</Col><Col id=\"DEPT_NM\">신장내과분과</Col><Col id=\"TREAT_NM\">홍길동</Col><Col id=\"RESULT_YN\">Y</Col><Col id=\"MEDICINE_YN\">Y</Col><Col id=\"TREAT_ID\">2</Col></Row><Row><Col id=\"TREAT_DT\">20160115</Col><Col id=\"TREAT_TYPE\">외래</Col><Col id=\"DEPT_NM\">신장내과분과</Col><Col id=\"TREAT_NM\">홍길동</Col><Col id=\"RESULT_YN\">Y</Col><Col id=\"MEDICINE_YN\">Y</Col><Col id=\"TREAT_ID\">3</Col></Row><Row><Col id=\"TREAT_DT\">20151220</Col><Col id=\"TREAT_TYPE\">외래</Col><Col id=\"DEPT_NM\">신장내과분과</Col><Col id=\"TREAT_NM\">홍길동</Col><Col id=\"RESULT_YN\">N</Col><Col id=\"MEDICINE_YN\">Y</Col><Col id=\"TREAT_ID\">4</Col></Row><Row><Col id=\"TREAT_TYPE\">외래</Col><Col id=\"DEPT_NM\">신장내과분과</Col><Col id=\"TREAT_NM\">홍길동</Col><Col id=\"RESULT_YN\">N</Col><Col id=\"MEDICINE_YN\">N</Col><Col id=\"TREAT_ID\">5</Col><Col id=\"TREAT_DT\">20140201</Col></Row><Row><Col id=\"TREAT_TYPE\">외래</Col><Col id=\"DEPT_NM\">신장내과분과</Col><Col id=\"TREAT_NM\">홍길동</Col><Col id=\"RESULT_YN\">Y</Col><Col id=\"MEDICINE_YN\">N</Col><Col id=\"TREAT_ID\">6</Col><Col id=\"TREAT_DT\">20140101</Col></Row><Row><Col id=\"TREAT_TYPE\">외래</Col><Col id=\"DEPT_NM\">신장내과분과</Col><Col id=\"TREAT_NM\">홍길동</Col><Col id=\"RESULT_YN\">Y</Col><Col id=\"MEDICINE_YN\">N</Col><Col id=\"TREAT_ID\">7</Col><Col id=\"TREAT_DT\">20120403</Col></Row><Row><Col id=\"TREAT_TYPE\">외래</Col><Col id=\"DEPT_NM\">신장내과분과</Col><Col id=\"TREAT_NM\">홍길동</Col><Col id=\"RESULT_YN\">N</Col><Col id=\"MEDICINE_YN\">Y</Col><Col id=\"TREAT_ID\">8</Col><Col id=\"TREAT_DT\">20120320</Col></Row><Row><Col id=\"TREAT_TYPE\">외래</Col><Col id=\"DEPT_NM\">신장내과분과</Col><Col id=\"TREAT_NM\">홍길동</Col><Col id=\"RESULT_YN\">N</Col><Col id=\"MEDICINE_YN\">Y</Col><Col id=\"TREAT_ID\">9</Col><Col id=\"TREAT_DT\">20120201</Col></Row><Row><Col id=\"TREAT_DT\">20160222</Col><Col id=\"TREAT_TYPE\">외래</Col><Col id=\"DEPT_NM\">신장내과분과</Col><Col id=\"TREAT_NM\">홍길동</Col><Col id=\"RESULT_YN\">N</Col><Col id=\"MEDICINE_YN\">N</Col><Col id=\"TREAT_ID\">1</Col></Row><Row><Col id=\"TREAT_DT\">20160130</Col><Col id=\"TREAT_TYPE\">외래</Col><Col id=\"DEPT_NM\">신장내과분과</Col><Col id=\"TREAT_NM\">홍길동</Col><Col id=\"RESULT_YN\">Y</Col><Col id=\"MEDICINE_YN\">Y</Col><Col id=\"TREAT_ID\">2</Col></Row><Row><Col id=\"TREAT_DT\">20160115</Col><Col id=\"TREAT_TYPE\">외래</Col><Col id=\"DEPT_NM\">신장내과분과</Col><Col id=\"TREAT_NM\">홍길동</Col><Col id=\"RESULT_YN\">Y</Col><Col id=\"MEDICINE_YN\">Y</Col><Col id=\"TREAT_ID\">3</Col></Row><Row><Col id=\"TREAT_DT\">20151220</Col><Col id=\"TREAT_TYPE\">외래</Col><Col id=\"DEPT_NM\">신장내과분과</Col><Col id=\"TREAT_NM\">홍길동</Col><Col id=\"RESULT_YN\">N</Col><Col id=\"MEDICINE_YN\">Y</Col><Col id=\"TREAT_ID\">4</Col></Row><Row><Col id=\"TREAT_TYPE\">외래</Col><Col id=\"DEPT_NM\">신장내과분과</Col><Col id=\"TREAT_NM\">홍길동</Col><Col id=\"RESULT_YN\">N</Col><Col id=\"MEDICINE_YN\">N</Col><Col id=\"TREAT_ID\">5</Col><Col id=\"TREAT_DT\">20140201</Col></Row><Row><Col id=\"TREAT_TYPE\">외래</Col><Col id=\"DEPT_NM\">신장내과분과</Col><Col id=\"TREAT_NM\">홍길동</Col><Col id=\"RESULT_YN\">Y</Col><Col id=\"MEDICINE_YN\">N</Col><Col id=\"TREAT_ID\">6</Col><Col id=\"TREAT_DT\">20140101</Col></Row><Row><Col id=\"TREAT_TYPE\">외래</Col><Col id=\"DEPT_NM\">신장내과분과</Col><Col id=\"TREAT_NM\">홍길동</Col><Col id=\"RESULT_YN\">Y</Col><Col id=\"MEDICINE_YN\">N</Col><Col id=\"TREAT_ID\">7</Col><Col id=\"TREAT_DT\">20120403</Col></Row><Row><Col id=\"TREAT_TYPE\">외래</Col><Col id=\"DEPT_NM\">신장내과분과</Col><Col id=\"TREAT_NM\">홍길동</Col><Col id=\"RESULT_YN\">N</Col><Col id=\"MEDICINE_YN\">Y</Col><Col id=\"TREAT_ID\">8</Col><Col id=\"TREAT_DT\">20120320</Col></Row><Row><Col id=\"TREAT_TYPE\">외래</Col><Col id=\"DEPT_NM\">신장내과분과</Col><Col id=\"TREAT_NM\">홍길동</Col><Col id=\"RESULT_YN\">N</Col><Col id=\"MEDICINE_YN\">Y</Col><Col id=\"TREAT_ID\">9</Col><Col id=\"TREAT_DT\">20120201</Col></Row></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_request", this);
            obj._setContents("<ColumnInfo><Column id=\"REG_DATE\" type=\"STRING\" size=\"256\"/><Column id=\"PATIENT_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"RESPONSE_YN\" type=\"STRING\" size=\"256\"/><Column id=\"ECONSULT_YN\" type=\"STRING\" size=\"256\"/><Column id=\"REQUEST_ID\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"REG_DATE\">20151201</Col><Col id=\"PATIENT_TYPE\">S</Col><Col id=\"RESPONSE_YN\">Y</Col><Col id=\"ECONSULT_YN\">Y</Col><Col id=\"REQUEST_ID\">1</Col></Row><Row><Col id=\"REG_DATE\">20140301</Col><Col id=\"PATIENT_TYPE\">R</Col><Col id=\"RESPONSE_YN\">Y</Col><Col id=\"ECONSULT_YN\">N</Col><Col id=\"REQUEST_ID\">2</Col></Row><Row><Col id=\"REG_DATE\">20120101</Col><Col id=\"PATIENT_TYPE\">S</Col><Col id=\"ECONSULT_YN\">Y</Col><Col id=\"RESPONSE_YN\">N</Col><Col id=\"REQUEST_ID\">3</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Div("div_left", "absolute", "0", "0", "338", null, null, "0", this);
            obj.set_taborder("0");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 338, 0, this.div_left,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("0");

            	}
            );
            this.div_left.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 1224, 660, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("sample00");
            		p.set_titletext("일자별처방-샘플");

            	}
            );
            obj.set_stepcount("");
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.addIncludeScript("BRWM02F2.xfdl", "lib::comForm.xjs");
        this.addIncludeScript("BRWM02F2.xfdl", "lib::comTransaction.xjs");
        this.registerScript("BRWM02F2.xfdl", function() {
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
        this.fv_var;

        //-------------------------------------------------------------------------------------------------
        // 2. Form 함수 정의
        //-------------------------------------------------------------------------------------------------
        this.form_onload = function(obj,e)
        {
        	// Form Load 시 필수로 호출
        	this.gfn_formOnLoad(obj);
        }

        //초기설정
        this.fn_init = function()
        {
        	this.fn_clear(this.div_left);
        	
        	//this.fn_search("searchlist");
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
        //1. 조회 함수는 fn_search로 작성한다.
        //2. 조회 Transaction에 대한 구분은 transaction id 로 기술한다.
        //3. 조회 후 Callback 함수는 fn_search 함수 다음에 위치하며 함수명은 fn_searchCallback 으로 작성한다.
        this.fn_search = function(svcId)
        {
        	switch(svcId)
        	{
        		case "searchlist" :
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
        			break;
        		default : 
        			break;
        	}	
        }

        //-------------------------------------------------------------------------------------------------
        // 4. User 함수 정의
        //-------------------------------------------------------------------------------------------------

        this.fn_clear = function(divObj)
        {
        	var comp;
        	for(var i = divObj.components.length -1; i >= 0; i--)
        	{
        		comp = divObj.removeChild(divObj.components[i].name);
        		comp = null;
        	}
        }

        this.fn_drawCard = function()
        {
        	var divDraw = this.div_left;
        	var dsReq = this.ds_request;
        	var dsHist = this.ds_history;
        	
        	//Request 카드생성
        	var req_card, oReqArgs;
        	var nReqLeft = 17, nReqTop = 10, nReqWidth = 66, nReqHeight = 66;
        	
        	for(var i = 0; i < dsReq.rowcount; i++)
        	{
        		oReqArgs = {};
        		oReqArgs.key = dsReq.getColumn(i, "REQUEST_ID");
        		oReqArgs.date = dsReq.getColumn(i, "REG_DATE");
        		oReqArgs.type = dsReq.getColumn(i, "PATIENT_TYPE");
        		oReqArgs.resp_yn = dsReq.getColumn(i, "RESPONSE_YN");
        		oReqArgs.econsult_yn = dsReq.getColumn(i, "ECONSULT_YN");
        		
        		req_card = this.create_request_card(divDraw, nReqLeft, nReqTop, nReqWidth, nReqHeight, oReqArgs);
        				
        		//Request 이력 카드 위치 수정
        		nReqTop += nReqHeight+10;
        	}
        	
        	//History 카드생성
        	var hist_card, oHistArgs;
        	var nHistLeft = 122, nHistTop = 10, nHistWidth = 197, nHistHeight = 50;
        	
        	for(var i = 0; i < dsHist.rowcount; i++)
        	{
        		oHistArgs = {};
        		oHistArgs.key = dsHist.getColumn(i, "TREAT_ID");
        		oHistArgs.date = dsHist.getColumn(i, "TREAT_DT");
        		oHistArgs.type = dsHist.getColumn(i, "TREAT_TYPE");
        		oHistArgs.deptnm = dsHist.getColumn(i, "DEPT_NM");
        		oHistArgs.treatnm = dsHist.getColumn(i, "TREAT_NM");		
        		oHistArgs.resp_yn = dsHist.getColumn(i, "RESULT_YN");
        		oHistArgs.econsult_yn = dsHist.getColumn(i, "MEDICINE_YN");
        		
        		hist_card = this.create_history_card(divDraw, nHistLeft, nHistTop, nHistWidth, nHistHeight, oHistArgs);
        		
        		//카드에 대해서 Flow Bar 생성해줌
        		this.create_history_bar(divDraw, nHistLeft, nHistTop, nHistWidth, nHistHeight);
        		
        		nHistTop += nHistHeight+6;
        	}
        	
        	//request 카드 위치 재설정
        	
        	//동적 생성된 카드 보이기
        	Eco.XComp.Factory.doLayout(divDraw);	
        	
        	//스크롤 재설정
        	divDraw.resetScroll();
        }

        //요청 카드 생성
        this.create_request_card = function(divDraw,nLeft,nTop,nWidth,nHeight,oArgs)
        {
        	var factory = Eco.XComp.Factory;
         	var event = Eco.XComp.Event;
         	
        	var fdiv, key, date, type, resp_yn, econsult_yn;	
        	key = oArgs.key;
        	date = oArgs.date;
        	type = oArgs.type;
        	resp_yn = oArgs.resp_yn;
        	econsult_yn = oArgs.econsult_yn;
        			
        	//div생성
        	var fdiv = factory.getXComp(divDraw, "Div", "_div_type_"+key);
        	factory.setProperties(fdiv, "scrollbars", "none");
        	factory.setRect(fdiv, nLeft, nTop, nWidth, nHeight);
        	
        	//div에 컴포넌트 생성
        	//Static - date
        	var fstc = factory.getXComp(fdiv, "Static", "_stc_type_"+key);
        	factory.setProperties(fstc, "text", "20150101", "style", "align:center middle;font:antialias 8 NanumGothic;");
        	factory.setRect(fstc, 3, 0, 60, 12);
        	
        	//Button - 의뢰, 되의뢰
        	var fbtn = factory.getXComp(fdiv, "Button", "_btn_type_"+key);
        	factory.setProperties(fbtn, "text", "의뢰");
        	factory.setRect(fbtn, 7, 20, 52, 22);
        	event.add(fbtn, {"onclick": this.onclick_btn_type}, this);

        	//Button - 회신여부
        	var fbtn1 = factory.getXComp(fdiv, "Button", "_btn_typeR_"+key);
        	factory.setProperties(fbtn1, "text", "회", "style", "align:center middle;font:antialias 8 NanumGothic;");
        	factory.setRect(fbtn1, 13, 45, 16, 16);
        	event.add(fbtn1, {"onclick": this.onclick_btn_typeR}, this);
        	
        	//Button - E-Consult여부
        	var fbtn2 = factory.getXComp(fdiv, "Button", "_btn_typeE_"+key);
        	factory.setProperties(fbtn2, "text", "E", "style", "align:center middle;font:antialias 8 NanumGothic;");
        	factory.setRect(fbtn2, 32, 45, 16, 16);
        	event.add(fbtn2, {"onclick": this.onclick_btn_typeE}, this);
        	
        	//div내 생성된 컴포넌트 보이기
        	factory.doLayout(fdiv);
        	
        	return fdiv;
        }

        //History 카드 생성
        this.create_history_card = function(divDraw,nLeft,nTop,nWidth,nHeight,oArgs)
        {
        	var factory = Eco.XComp.Factory;
         	var event = Eco.XComp.Event;
        	
        	var fdiv, key, date, type, deptnm, treatnm, result_yn, medicine_yn;	
        	key = oArgs.key;
        	date = oArgs.date;
        	type = oArgs.type;
        	deptnm = oArgs.deptnm;
        	treatnm = oArgs.treatnm;
        	resp_yn = oArgs.resp_yn;
        	econsult_yn = oArgs.econsult_yn;
        	
        	//div생성
        	fdiv = factory.getXComp(divDraw, "Div", "_div_history_"+key);
        	factory.setProperties(fdiv, "scrollbars", "none", "style", "border:1 solid #000000ff;");
        	factory.setRect(fdiv, nLeft, nTop, nWidth, nHeight);
        	
        	//div에 컴포넌트 생성
        	//Static - date + 외래
        	var fstc = factory.getXComp(fdiv, "Static", "_stc_history_"+key);
        	factory.setProperties(fstc, "text", date+" ("+type+")", "style", "align:left middle;font:antialias 10 NanumGothic;");
        	factory.setRect(fstc, 5, 5, 150, 16);
        	
        	//Button - 검사여부
        	var fbtn1 = factory.getXComp(fdiv, "Button", "_btn_historyR_"+key);
        	factory.setProperties(fbtn1, "text", "검", "style", "align:center middle;font:antialias 8 NanumGothic;");
        	factory.setRect(fbtn1, 154, 5, 16, 16);
        	event.add(fbtn1, {"onclick": this.onclick_btn_historyR}, this);
        	
        	//Button - 약처방여부
        	var fbtn2 = factory.getXComp(fdiv, "Button", "_btn_historyM_"+key);
        	factory.setProperties(fbtn2, "text", "약", "style", "align:center middle;font:antialias 8 NanumGothic;");
        	factory.setRect(fbtn2, 173, 5, 16, 16);
        	event.add(fbtn2, {"onclick": this.onclick_btn_historyM}, this);
        	
        	var fstc1 = factory.getXComp(fdiv, "Static", "_stc_historyU_"+key);
        	factory.setProperties(fstc1, "text", deptnm+" "+treatnm, "style", "align:left middle;font:antialias 11 NanumGothic;");
        	factory.setRect(fstc1, 5, 25, 190, 20);
        	
        	//div내 생성된 컴포넌트 보이기
        	factory.doLayout(fdiv);
        	
        	return fdiv;
        }

        //Time Flow Bar생성
        this.create_history_bar = function(divDraw,nLeft,nTop,nWidth,nHeight)
        {
        	var factory = Eco.XComp.Factory;
        	
        	var fstc = factory.getXComp(divDraw, "Static", "_stc_historyBar");
        	factory.setProperties(fstc, "text", "", "style", "background:#3378c1ff;");
        	factory.setRect(fstc, nLeft - 25, nTop -3, 14, nHeight+6);
        	
        	factory.doLayout(fstc);
        }

        //의뢰, 되의뢰 버튼 클릭
        this.onclick_btn_type = function(obj,e)
        {
        	alert("onclick_btn_type = "+obj._id);
        }

        //회신여부 버튼클릭
        this.onclick_btn_typeR = function(obj,e)
        {
        	alert("onclick_btn_typeR = "+obj._id);
        }

        //e-consult 여부
        this.onclick_btn_typeE = function(obj,e)
        {
        	alert("onclick_btn_typeE = "+obj._id);
        }

        //검사 여부
        this.onclick_btn_historyR = function(obj,e)
        {
        	alert("onclick_btn_historyR = "+obj._id);
        }

        //약처방 여부
        this.onclick_btn_historyM = function(obj,e)
        {
        	alert("onclick_btn_historyM = "+obj._id);
        }

        //-------------------------------------------------------------------------------------------------
        // 5. Event 함수 정의
        //-------------------------------------------------------------------------------------------------

        this.div_left_onclick = function(obj,e)
        {
        	this.fn_drawCard();
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.form_onload, this);
            this.div_left.addEventHandler("onclick", this.div_left_onclick, this);

        };

        this.loadIncludeScript("BRWM02F2.xfdl");

       
    };
}
)();
