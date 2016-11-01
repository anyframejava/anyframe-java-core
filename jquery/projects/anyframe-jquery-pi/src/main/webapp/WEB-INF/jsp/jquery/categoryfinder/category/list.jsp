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
        ID_CATEGORY_GRID : "#categoryGrid",
        ID_CATEGORY_PAGER : '#categoryGridPager',
        ID_SEARCH_BTN : "#searchBtn",
        ID_ADD_BTN : "#addBtn",
        ID_DEL_BTN : "#deleteBtn",
        ID_SAVE_BTN : "#saveBtn",
        ID_SEARCH_FORM : "#searchForm",
        ID_SEARCH_CONDITION : "#searchCondition",
        ID_SEARCH_KEYWORD : "#searchKeyword"
    };

    var MSG = {
        DELETE : "선택된 데이터가 삭제되었습니다.",
        SAVE : "데이터가 모두 저장되었습니다.",
        SERVER_ERROR : "서버통신 중 오류가 발생하였습니다. 다시 시도해주세요",
        EMPTY_VAL_ERROR : "빈 값이 존재합니다. 값을 모두 입력해 주세요."
    };

    var categoryGrid = {

        addNum : 0,
        addData : [],
        emptyCellNum : 0,

        gridDefaults : {
            viewrecords : true,
            recordtext: "View Count : {0} - {1} of {2}",
            emptyrecords: 'No records to view',
            loadtext: 'Loading...',
            pgtext : 'Page {0} of {1}',
            rowNum : 5
        },

        //초기화 및 생성 :
        init : function() {

            //Grid Paging 관련 기본옵션 초기화
            $.jgrid.defaults = this.gridDefaults;

            //초기 Grid 생성
            $(ENV.ID_CATEGORY_GRID).jqGrid({
                url : "<c:url value='/jqueryCategoryFinder.do?method=list'/>",
                datatype : 'json',
                mtype : 'POST',
                colNames : ['아이디', '이름', '상세설명', '등록일'],
                colModel : [
                    {name : 'categoryId', index : 'categoryId', hidden : true, key : true},
                    {name : 'categoryName', index : 'categoryName', width : '25%', editable : true, edittype : 'text' },
                    {name : 'categoryDesc', index : 'categoryDesc', width : '50%', editable : true, edittype : 'text' },
                    {name : 'regDate', index : 'regDate', width : '25%', formatter : dateFormatter, editable : false }
                ],
                jsonReader : {
                    repeatitems	: false
                },
                width : 800,
                height : 200,
                cellEdit : true,
                cellsubmit : 'clientArray',
                editurl : 'clientArray',
                pager : ENV.ID_CATEGORY_PAGER
            });

            $(ENV.ID_SEARCH_FORM).submit( function(){
                return false;
            });
        },

        //추가 : 카테고리 이름과 상세설명을 입력하여 데이터를 추가시킨다.
        addOneRow : function() {
            var addData = {},
                addNum = this.addNum,
                addRowId = "addId"+addNum;

            addData.id = addRowId;
            addData.categoryId = addRowId;
            addData.categoryName = "";
            addData.categoryDesc = "";
            addData.regDate = dateFormatter(new Date());

            $(ENV.ID_CATEGORY_GRID).jqGrid("addRowData", addRowId, addData);
            $(ENV.ID_CATEGORY_GRID).jqGrid("editCell", addRowId, 1, true);

            this.addData.push(addData);
            this.addNum++;
        },

        //삭제 : 한 줄(Row)을 선택하여 삭제시킨다.
        deleteOneRow : function(rowId) {

            $(ENV.ID_CATEGORY_GRID).jqGrid('delRowData', rowId);

            var deleteOptions = {
                type : "POST",
                url : "<c:url value='/jqueryCategory.do?method=remove'/>",
                data : { categoryId : rowId },
                success : function(data) {
                    alert(MSG.DELETE);
                    categoryGrid._reloadGrid();
                },
                error : function(data){ alert(MSG.SERVER_ERROR); }
            };

            $.ajax(deleteOptions);
        },

        //저장 : 바뀐 모든 데이터들을 업데이트시킨다.
        saveChangedCells : function() {

            this._saveEditingRow();

            var checkEmptyInput = false,
                dataToCreate = [],
                dataToUpdate = [],
                changedCells = $(ENV.ID_CATEGORY_GRID).jqGrid('getChangedCells'),
                createOptions = {
                    type : "POST",
                    dataType : "JSON",
                    url : "<c:url value='/jqueryCategory.do?method=create'/>",
                    success : function(data) {
                        if(data.category.categoryId == changedCells[changedCells.length-1].categoryId){
                            alert(MSG.SAVE);
                        }
                        categoryGrid._reloadGrid();
                        return false;
                    },
                    error : function(data){ alert(MSG.SERVER_ERROR); }
                },
                updateOptions = {
                    type : "POST",
                    dataType : "JSON",
                    url : "<c:url value='/jqueryCategory.do?method=update'/>",
                    success : function(data) {
                        if(data.category.categoryId == changedCells[changedCells.length-1].categoryId){
                            alert(MSG.SAVE);
                        }
                        categoryGrid._reloadGrid();
                        return false;
                    },
                    error : function(data){ alert(MSG.SERVER_ERROR); }
                };


            for(var i=0; i <changedCells.length; i++) {

                if((changedCells[i].id).search("addId") != -1) {
                    dataToCreate.push(changedCells[i]);
                }else {
                    dataToUpdate.push(changedCells[i]);
                }

                //validate empty cells and refocus on the checked empty cell for user to edit..
                var temp=0;
                $.each(changedCells[i], function(key, value) {
                    if(value == null || value == "") {
                        alert(MSG.EMPTY_VAL_ERROR);
                        var index = $(ENV.ID_CATEGORY_GRID).jqGrid("getInd", changedCells[i].id);
                        $(ENV.ID_CATEGORY_GRID).jqGrid("editCell", index, temp, true);
                        checkEmptyInput = true;
                        return false;
                    }
                    temp++;
                });


            }

            if(checkEmptyInput==false) {
                //createOptions.data = dataToCreate;
                //updateOptions.data = dataToUpdate;
                $.each(dataToCreate, function(index, value) {
                    createOptions.data = value;
                    $.ajax(createOptions);
                })
                $.each(dataToUpdate, function(index, value) {
                    updateOptions.data = value;
                    $.ajax(updateOptions);
                })
                //$.ajax(createOptions);
                //$.ajax(updateOptions);
            }

        },

        //검색 (부분조회) : 특정 키워드를 가지는 리스트들을 부분적으로 조회한다.
        searchWithKeyword : function(searchData) {
            $(ENV.ID_CATEGORY_GRID).jqGrid("setGridParam", {postData : searchData});
            this._reloadGrid();
            return false;
        },

        getSelectedOneRow : function() {
            return $(ENV.ID_CATEGORY_GRID).jqGrid('getGridParam', 'selrow');
        },

        getSearchData : function() {
            var searchData = {
                searchCondition : $(ENV.ID_SEARCH_CONDITION).val(),
                searchKeyword : $(ENV.ID_SEARCH_KEYWORD).val()
            };

            return searchData;
        },


        _saveEditingRow : function() {

            var selrowID = this.getSelectedOneRow();
            var rowIndex = $(ENV.ID_CATEGORY_GRID).jqGrid("getInd", selrowID);
            var editrowData = $(ENV.ID_CATEGORY_GRID).jqGrid("getRowData", selrowID);
            var colNum =0;

            //editing 중인 한 row 데이터를 모두 저장
            $.each(editrowData, function(key, value) {
                $(ENV.ID_CATEGORY_GRID).jqGrid("editCell", rowIndex, colNum, false);
                $(ENV.ID_CATEGORY_GRID).jqGrid("saveCell", rowIndex, colNum);
                colNum++;
            })

        },

        _reloadGrid : function() {
            $(ENV.ID_CATEGORY_GRID).trigger("reloadGrid");
        }

    }//END OF categoryGrid Object..

    $(document).ready( function() {




        $("button").button();

        categoryGrid.init();

        $(ENV.ID_ADD_BTN).on("click", function() { categoryGrid.addOneRow(); });
        $(ENV.ID_DEL_BTN).on("click", function() { categoryGrid.deleteOneRow( categoryGrid.getSelectedOneRow() ); });
        $(ENV.ID_SAVE_BTN).on("click", function() { categoryGrid.saveChangedCells(); });
        $(ENV.ID_SEARCH_BTN).on("click", function() { categoryGrid.searchWithKeyword( categoryGrid.getSearchData() ); });
    })//END OF document ready function...

</script>

<div id="content">

    <div class="grid-titlebar">CATEGORY GRID EXAMPLE</div>

    <div class="grid-searchbar" >
        <form:form modelAttribute="search" method="post" id="searchForm" name="searchForm">
            <label for="searchCondition"></label>
            <form:select path="searchCondition" id="searchCondition">
                <form:option value="name">카테고리 이름</form:option>
                <form:option value="desc">상세설명</form:option>
            </form:select>
             <label for="searchKeyword"></label>
            <form:input path="searchKeyword" id="searchKeyword" type="text" />
            <button id="searchBtn" type="submit">검색</button>
        </form:form>

    </div>

    <table id="categoryGrid"></table>
    <div id="categoryGridPager"></div>

    <div class="grid-buttonbar">
        <button id="addBtn">추가</button>
        <button id="deleteBtn">삭제</button>
        <button id="saveBtn">저장</button>
    </div>

</div>

<hr />
<%@ include file="/sample/common/bottom.jsp"%>