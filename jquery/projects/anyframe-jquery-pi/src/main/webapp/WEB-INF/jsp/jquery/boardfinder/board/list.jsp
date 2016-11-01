<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/jqueryMovieFinder.do?method=listView'/>">jQuery Sample : Grid</a></div>
</div>
<hr />
<%@ include file="/WEB-INF/jsp/jquery/menu.jsp"%>

<script type="text/javascript">

    function dateFormatter(cellval, opts, rawObject) {
        if(cellval == null || cellval =="") {
            return "";
        }
        var date = new Date(cellval),
                year = date.getFullYear(),
                month = toTwoDigit(date.getMonth()+1),
                day = toTwoDigit(date.getDate());
    
        function toTwoDigit(number) {
            return number<10 ? "0"+number : number;
        }
        return year+"-"+month+"-"+day;
    }

    var ENV = {
        ID_BOARD_GRID : "#boardGrid",
        ID_BOARD_PAGER : "#boardGridPager",
        ID_SEARCH_BTN : "#searchBtn",
        ID_ADD_BTN : "#addBtn",
        ID_DEL_BTN : "#deleteBtn",
        ID_SAVE_BTN : "#saveBtn",
        ID_SEARCH_FORM : "#searchForm",
        ID_SEARCH_CONDITION : "#searchCondition",
        ID_SEARCH_KEYWORD : "#searchKeyword",
        ID_BOARD_FORM : "#boardForm",
        OBJ_FORM : { POST_ID : "#postId", TITLE : "#title", CONTENTS : "#contents", REG_ID : "#regId", REG_DATE : "#regDate", COMMUNITY : "#communityId" }
    };

    var USERINFO = {
        REG_ID : "testID"
    };

    var MSG = {
        ADDED : "입력한 데이터가 추가되었습니다.",
        DELETED : "선택된 데이터가 삭제되었습니다.",
        SAVED : "데이터가 모두 저장되었습니다.",
        REVISED : "변경한 데이터로 수정되었습니다.",
        SERVER_ERROR : "서버통신 중 오류가 발생하였습니다. 다시 시도해주세요",
        EMPTY_VAL_ERROR : "빈 값이 존재합니다. 값을 모두 입력해 주세요."
    };


    var boardGrid = {

        saveMode : "update",

        gridDefaults : {
            viewrecords : true,
            recordtext: "View Count : {0} - {1} of {2}",
            emptyrecords: 'No records to view',
            loadtext: 'Loading...',
            pgtext : 'Page {0} of {1}',
            rowNum : 5
        },

        init : function() {

            $.jgrid.defaults = this.gridDefaults;

            $(ENV.ID_BOARD_GRID).jqGrid({
                url : "<c:url value='/jqueryBoardFinder.do?method=list'/>",
                datatype : 'json',
                mtype : 'POST',
                colNames : ['게시글ID', '제목', '내용', '등록자', '등록일', '커뮤니티'],
                colModel : [
                    {name : 'postId', index : 'postId', width : '50%', hidden : true, key : true },
                    {name : 'title', index : 'title', width : '50%', editable : true },
                    {name : 'contents', index : 'contents', width : '50%', hidden : true },
                    {name : 'regId', index : 'regId', width : '25%', editable : true },
                    {name : 'regDate', index : 'regDate', width : '25%', formatter : dateFormatter, editable : true },
                    {name : 'communityId', index : 'communityId', width : '25%',  hidden : true }
                ],
                jsonReader : {
                    repeatitems	: false
                },
                width : 800,
                height : 200,
                pager : ENV.ID_BOARD_PAGER,
                onSelectRow : function(id) {
                    boardGrid._showDataToForm(id);
                }
            });

            $(ENV.ID_SEARCH_FORM).submit( function(){
                return false;
            });
        },

        //Form에 게시판내용에 대한 상세 정보를 보여준다.
        _showDataToForm : function(rowId) {
            var index = 0,
                rowdata = $(ENV.ID_BOARD_GRID).jqGrid("getRowData", rowId);

            $.each(ENV.OBJ_FORM, function(key, value) {
                $(value).val(rowdata[value.substring(1)]);
            });

            this.saveMode = "update";
        },

        _initFormView : function() {
            $.each(ENV.OBJ_FORM, function(key, idVal) {
                $(idVal).val("");
            });
        },

        //추가 : 게시판에 포스트할 제목과 내용, 커뮤니티 정보를 입력하여 데이터를 추가시킨다.
        addOneFormData : function() {
            this._initFormView();

            $(ENV.OBJ_FORM.REG_ID).val(USERINFO.REG_ID);
            $(ENV.OBJ_FORM.REG_DATE).val(dateFormatter(new Date()));

            this.saveMode = "create";
        },

        //삭제 : 한 줄(Row)을 선택하여 삭제시킨다.
        deleteOneRow : function(rowId) {

            $(ENV.ID_BOARD_GRID).jqGrid('delRowData', rowId);

            var removeOptions = {
                type : "POST",
                url : "<c:url value='/jqueryBoard.do?method=remove'/>",
                data : { postId : rowId},
                success : function(data) {
                    alert(MSG.DELETED);
                    boardGrid._initFormView();
                    boardGrid._reloadGrid();
                },
                error : function(data){
                    alert(MSG.SERVER_ERROR);
                }
            };

            $.ajax(removeOptions);
        },

        //저장 : 폼에 입력 또는 수정한 데이터를 저장한다.
        saveData : function() {

            var dataToUpdate = {},
                saveOptions = {},
                checkEmptyInput = false;

            $.each(ENV.OBJ_FORM, function(key, value) {
                var inputVal = $(value).val();
                dataToUpdate[value.substring(1)] = inputVal;

                //validate empty data..?
                if((inputVal == null || inputVal == "") && key != "POST_ID") {
                    alert(MSG.EMPTY_VAL_ERROR);
                    $(value).focus();
                    checkEmptyInput = true;
                    return false;
                }

            });

            if(checkEmptyInput == false) {
                switch (this.saveMode)
                {
                    case "create" :
                        saveOptions = {
                            type : "POST",
                            url : "<c:url value='/jqueryBoard.do?method=create'/>",
                            data : $(ENV.ID_BOARD_FORM).serialize(),
                            success : function(data) {
                                alert(MSG.ADDED);
                                boardGrid._reloadGrid();
                            },
                            error : function(data){
                                alert(MSG.SERVER_ERROR);
                            }
                        };
                        $.ajax(saveOptions);
                        break;
                    case "update" :
                        saveOptions = {
                            type : "POST",
                            url : "<c:url value='/jqueryBoard.do?method=update'/>",
                            data : dataToUpdate,
                            success : function(data) {
                                alert(MSG.REVISED);
                                boardGrid._reloadGrid();
                            },
                            error : function(data){
                                alert(MSG.SERVER_ERROR);
                            }
                        };
                        $.ajax(saveOptions);
                        break;
                    default :
                        return false;
                }
            }

        },

        //검색 (부분조회) : 특정 키워드를 가지는 리스트들을 부분적으로 조회한다.
        searchWithKeyword : function(searchData) {

            $(ENV.ID_BOARD_GRID).jqGrid("setGridParam", {postData : searchData});

            this._reloadGrid();
            return false;
        },

        getSelectedOneRow : function() {
            return $(ENV.ID_BOARD_GRID).jqGrid('getGridParam', 'selrow');
        },

        getSearchData : function() {
            var searchData = {
                searchCondition : $(ENV.ID_SEARCH_CONDITION).val(),
                searchKeyword : $(ENV.ID_SEARCH_KEYWORD).val()
            };

            return searchData;
        },

        _reloadGrid : function() {
            $(ENV.ID_BOARD_GRID).trigger("reloadGrid");
        }

    };

    $(document).ready( function() {
        $("button").button();
        boardGrid.init();

        var id = $(ENV.ID_BOARD_GRID).jqGrid('getGridParam', 'selrow');
        
        $(ENV.ID_ADD_BTN).on("click", function() { boardGrid.addOneFormData(); });
        $(ENV.ID_DEL_BTN).on("click", function(){ boardGrid.deleteOneRow( boardGrid.getSelectedOneRow() ); });
        $(ENV.ID_SAVE_BTN).on("click", function() { boardGrid.saveData(); });
        $(ENV.ID_SEARCH_BTN).on("click", function(){ boardGrid.searchWithKeyword( boardGrid.getSearchData() ); });
        
    })
</script>

<div id="content">

	<div class="grid-titlebar">BOARD GRID EXAMPLE</div>

	<div class="grid-searchbar">
	    <form:form modelAttribute="search" method="post" id="searchForm" name="searchForm">
	        <label for="searchCondition"></label>
	        <form:select path="searchCondition" id="searchCondition">
	            <form:option value="title">제목</form:option>
	            <form:option value="regId">등록자</form:option>
	        </form:select>
	        <label for="searchKeyword"></label>
	        <form:input path="searchKeyword" id="searchKeyword" type="text" />
	        <button id="searchBtn" type="submit">검색</button>
	    </form:form>
	</div>
	
	<table id="boardGrid"></table>
	<div id="boardGridPager"></div>

    <div class="grid-buttonbar">
        <button id="addBtn">추가</button>
        <button id="deleteBtn">삭제</button>
        <button id="saveBtn">저장</button>
    </div>

    <br/>
    <div class="form-title">DETAIL CONTENT VIEW</div>

	<!--  추가 입력  Form -->
	<div class="form-container">
	    <form:form modelAttribute="board" method="post" id="boardForm" name="boardForm">
	        <table class="form-table" >
	            <caption>상세 정보 : </caption>
	            <colgroup>
	                <col class="form-first-cols" />
	                <col class="form-second-cols" />
	            </colgroup>
	            <tbody>
	                <tr>
	                    <th>
	                        <label for="postId">게시글 ID</label>
	                    </th>
	                    <td>
                      		 <input id="postId" type="text" disabled />
	                    </td>
	                </tr>
	                <tr>
	                    <th>
	                        <label for="title" >제목</label>
	                    </th>
	                    <td>
	                        <form:input path="title" id="title" type="text" />
	                    </td>
	                </tr>
	                <tr>
	                    <th>
	                        <label for="contents">내용</label>
	                    </th>
	                    <td>
	                        <form:textarea path="contents" id="contents" type="text" rows="6" />
	                    </td>
	                </tr>
	                <tr>
	                    <th>
	                        <label for="regId">등록자</label>
	                    </th>
		                    <td>
	                        <input path="regId" id="regId" type="text" disabled/>
	                    </td>
	                </tr>
	                <tr>
	                    <th>
	                        <label for="regDate" >등록일</label>
	                    </th>
	                    <td>
                       		<input id="regDate" type="text" disabled/>
	                    </td>
	                </tr>
	                <tr>
	                    <th>
	                        <label for="communityId" >커뮤니티</label>
	                    </th>
	                    <td>
	                        <form:select path="communityId" id="communityId">
	                            <form:options items="${communityList}" itemValue="communityId" itemLabel="communityName"></form:options>
	                        </form:select>
	                    </td>
	                </tr>
	            </tbody>
	        </table>
	
	     </form:form>
	</div>
</div>

<hr />
<%@ include file="/sample/common/bottom.jsp"%>