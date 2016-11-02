<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/jqueryMovieFinder.do?method=listView'/>">jQuery 1.0.6-SNAPSHOT</a></div>
    </div>
    <hr />
<%@ include file="/WEB-INF/jsp/jquery/menu.jsp"%>

<script type="text/javascript">

	var ENV = {
			DEPT_GRID_ID : "#deptGrid",
			DEPT_GRID_URL : "<c:url value='/jqueryDeptFinder.do?method=list'/>",
			USER_GRID_ID : "#userGrid",
			USER_GRID_URL : "<c:url value='/jqueryUserFinder.do?method=list'/>",
			USER_FORMVIEW_ID : "#userFormDialog",
			USER_FORMVIEW_TABS_ID : "#userFormDialog_tabs",
			SEARCHKEYWORD_AUTOCOMPLETE_ID : "#searchKeyword",
	};
	
	var DIALOG_MODE = {
		ADD : 'add',
		EDIT : 'edit',
		NONE : 'none'
	};
	
	var _currentDialogMode = DIALOG_MODE.NONE;
	
	var gridView = {
			
		_PROP : {
			POSTDATA : "gv_prop_postData",
			SELECTION : "gv_prop_selection",
			RELOAD : "gv_prop_reload",
			ROWDATA : "gv_prop_rowData",
			ROWIDS : "gv_prop_rowIDs",
			SELROW : "gv_prop_selrow"
		},
			
		init : function()
		{
			var self = this;
			$(ENV.USER_GRID_ID).jqGrid({
				url : ENV.USER_GRID_URL,
				datatype : 'json',
				mtype : 'POST',
				autowidth : true,
				height : 500,
				colNames : ['ID', '이름', '직급', '전화', '휴대전화'],
				colModel : [
					{name:'userId', index:'userId', hidden:true, key:true},
					{name:'userName', index:'userName'},
					{name:'jobPosition', index:'jobPosition'},
					{name:'phone', index:'phone'},
					{name:'cellPhone', index:'cellPhone'}
				],
				jsonReader : {
					repeatitems	: false
				},
		        ondblClickRow : function(rowid, evt) 
		        {	
		        	var object = {userId : rowid};
		        	dialogView.dialogOpen(ENV.USER_FORMVIEW_ID, 'edit', object); 
		        }
			});
			
			$(ENV.DEPT_GRID_ID).jqGrid({
				treeGrid: true,
				treeGridModel:'adjacency',
				ExpandColumn:'deptName',
				url : ENV.DEPT_GRID_URL,
				datatype : 'json',
				mtype : 'POST',
				autowidth : true,
				height: 500,
				colNames : ['DEPT-ID', '이름', '설명',  'LEVEL', 'PARENT'],
				colModel : [
					{name:'deptId', index:'deptId', hidden:true, key:true},
					{name:'deptName', index:'deptName'},
					{name:'deptDesc', index:'deptDesc'},
					{name:'deptLevel', index:'deptLevel', hidden:true},
					{name:'parentDept', index:'parentDept', hidden:true}
				],
				jsonReader : {
					repeatitems	: false
				},
				treeReader : {
					parent_id_field : 'parentDept',
					level_field : 'deptLevel',
					leaf_field : 'leaf',
					expanded_field : 'expanded'
				},
				onSelectRow : function(rowid, evt) {
					var object = {deptId : rowid};
					self.setGridInfo(ENV.USER_GRID_ID, 'gv_prop_postData', object);
			 		$('#deptId').val(rowid);
		 		},
		        gridComplete : function(rowid) {
		        	var object = {deptId : self.getGridInfo(ENV.DEPT_GRID_ID, "gv_prop_rowIDs")[0]};
		        	self.setGridInfo(ENV.DEPT_GRID_ID, "gv_prop_selection", object);
		 		}
			});
		},
				
		setGridInfo : function(grid, prop, object)
		{
			switch(prop) 
			{
				case this._PROP.POSTDATA :
					var newval = object.deptId;
					this._setPostData(grid, newval);					
					break;
				case this._PROP.SELECTION :
					var newval = object.deptId;
					$('#deptId').val(newval);
					this._setSelection(grid, newval);
					break;
				case this._PROP.RELOAD :
					this._setReload(grid);
					break;
			}
		},
		
		_setPostData : function(grid, newval)
		{
			$(grid).jqGrid('setGridParam', {postData : { deptId : newval}}).trigger("reloadGrid");
		},
		
		_setSelection : function(grid, newval)
		{
			$(grid).jqGrid('setSelection', newval);
		},
		
		_setReload : function(grid)
		{
			$(grid).trigger('reloadGrid');
		},
		
		getRowId : function(newval) {
			var result = '';
			var grid_ids = this._getDataIDs(ENV.DEPT_GRID_ID);
			for(var i=0; i<grid_ids.length;i++) {
				var rowid = grid_ids[i];
				var rowData = this._getRowData(ENV.DEPT_GRID_ID, rowid);
				if(rowData.deptName == newval) {
					result = rowid;
				}
			}
			return result;
		},
		
		getGridInfo : function(grid, prop) {
			switch(prop) 
			{
				case this._PROP.SELROW :
					return this._getSelectedOneRow(grid);					
					break;
				case this._PROP.ROWIDS :
					return this._getDataIDs(grid);
					break;
				case this._PROP.ROWDATA :
					return this._getRowData(grid, newval);
					break;
			}
		},
		
		_getSelectedOneRow : function(grid) {
			return $(grid).jqGrid('getGridParam', 'selrow'); 
		},
		
		_getDataIDs : function(grid) {
			return $(grid).jqGrid('getDataIDs'); 
		},
		
		_getRowData : function(grid, rowid) {
			return $(grid).jqGrid('getRowData', rowid); 
		},
		
		saveData : function() {
			if(_currentDialogMode == DIALOG_MODE.ADD) {
				var result = this._checkDuplication();
				if(!result) {
		            var addOptions = {
		                    type : "POST",
		                    url : '<c:url value="/jqueryUser.do?method=create"/>',
		                    data : $('#userForm').serialize(),
		                    async : false,
		                    success : function(data) {
								gridView.setGridInfo(ENV.USER_GRID_ID, 'gv_prop_reload');
		                    },
		                    error : function(data){
		                        alert("오류가 발생했습니다!");
		                    }
		                };
		            $.ajax(addOptions);
				}
			} else if(_currentDialogMode == DIALOG_MODE.EDIT) {
	            var editOptions = {
	                    type : "POST",
	                    url : '<c:url value="/jqueryUser.do?method=update"/>',
	                    data : $('#userForm').serialize(),
	                    async : false,
	                    success : function(data) {
							gridView.setGridInfo(ENV.USER_GRID_ID, 'gv_prop_reload');
	                    },
	                    error : function(data){
	                        alert("오류가 발생했습니다!");
	                    }
	                };
	            $.ajax(editOptions);
			}
		},
		
		_checkDuplication : function() {
			var isDuplication = false;
            var checkOptions = {
                    type : "POST",
                    url : '<c:url value="/jqueryUser.do?method=isDuplication"/>',
                    data : {"userId" : $('#userId').val()},
                    async : false,
                    success : function(data) {
						if(data.isDuplication == true) {
							alert('중복된 ID가 존재합니다.');
						}
						isDuplication = data.isDuplication;
                    },
                    error : function(data){
                        alert("오류가 발생했습니다!");
                    }
                };
            $.ajax(checkOptions);		
			return isDuplication;            
		},
		deleteData : function(grid)
		{
            var selrow = this.getGridInfo(grid, 'gv_prop_selrow'); 
            if(selrow == null) { 
                alert('선택된 사용자 정보가 없습니다.'); 
            }  else {                   
            	if(confirm('정말로 삭제하시겠습니까?')) {
                    var deleteOptions = {
                            type : "POST",
                            url : '<c:url value="/jqueryUser.do?method=remove"/>',
                            data : {"userId" : selrow},
                            async : false,
                            success : function(data) {
    							$(ENV.USER_GRID_ID).trigger('reloadGrid');
                            },
                            error : function(data){
                                alert("오류가 발생했습니다!");
                            }
                        };
                    $.ajax(deleteOptions);	
            	}
            } 
		}
	};
	
	var dialogView = {
		
		init : function()
		{
			$(ENV.USER_FORMVIEW_ID).dialog({
				autoOpen	: false,
				width		: 460,
				title		: "User Information"
			});				
		},
	
		dialogOpen : function(dialogId, prop, object) {
			if(prop == DIALOG_MODE.ADD) {
				this._addDialogOpen(dialogId);
			} else if(prop == DIALOG_MODE.EDIT) {
				var newval = object.userId;
				this._editDialogOpen(dialogId, newval);
			}
			
			this._getDeptName($('#deptId').val());
		},
	
		_addDialogOpen : function(dialogId) {
			$('#userId').val("");
			$('#userId').attr("readOnly", false);
			$('#userName').val("");
			$('#password').val("");
			$('#enName').val("");
			$('#phone').val("");
			$('#cellPhone').val("");
			$('#zipCode').val("");
			$('#address').val("");
			$('#deptName').val("");
			$('#jobPosition').val("");
			$('#assignment').val("");
			$('#fax').val("");
			$('#email').val("");
			$('#compZipCode').val("");
			$('#compAddress').val("");
			_currentDialogMode = DIALOG_MODE.ADD;
			$(dialogId).dialog('open');
		},
			
		_editDialogOpen : function(dialogId, newval) {
            var getOptions = {
                    type : "POST",
                    url : "<c:url value='/jqueryUser.do?method=get'/>",
                    data : {"userId" : newval},
                    async : false,
                    success : function(data) {
        				$('#userId').val(data.user.userId);
        				$('#userId').attr("readOnly", true);
        				$('#userName').val(data.user.userName);
        				$('#password').val(data.user.password);
        				$('#enName').val(data.user.enName);
        				$('#phone').val(data.user.phone);
        				$('#cellPhone').val(data.user.cellPhone);
        				$('#zipCode').val(data.user.zipCode);
        				$('#address').val(data.user.address);
        				$('#deptId').val(data.user.deptId);
        				$('#jobPosition').val(data.user.jobPosition);
        				$('#assignment').val(data.user.assignment);
        				$('#fax').val(data.user.fax);
        				$('#email').val(data.user.email);
        				$('#compZipCode').val(data.user.compZipCode);
        				$('#compAddress').val(data.user.compAddress);
                    },
                    error : function(data){
                        alert("오류가 발생했습니다!");
                    }
                };
            $.ajax(getOptions);	
			_currentDialogMode = DIALOG_MODE.EDIT;
			$(dialogId).dialog('open');
		},
		
		dialogClose : function(dialogId) {
			$(dialogId).dialog('close');
			return false;
		},
		
		_getDeptName : function(newval) {
            var getOptions = {
                    type : "POST",
                    url : '<c:url value="/jqueryDept.do?method=get"/>',
                    data : {"deptId" : newval},
                    async : false,
                    success : function(data) {
    					$('#deptName').val(data.dept.deptName);
                    },
                    error : function(data){
                        alert("오류가 발생했습니다!");
                    }
                };
            $.ajax(getOptions);	
		}
	};
	
	var autocompleteView = {
			
			ENV : {
				NAMEARRAY : []
			},
			
			init : function()
			{
				$(ENV.SEARCHKEYWORD_AUTOCOMPLETE_ID).autocomplete({
					source : autocompleteView.getName()
				});
			},
			
			getName : function() {
	            var getListOptions = {
	                    type : "POST",
	                    url : '<c:url value="/jqueryDeptFinder.do?method=list"/>',
	                    data : {},
	                    async : false,
	                    success : function(data) {
							for(var i=0; i <data.rows.length;i++) {
								autocompleteView.ENV.NAMEARRAY.push(data.rows[i].deptName); 
							}
	                    },
	                    error : function(data){
	                        alert("오류가 발생했습니다!");
	                    }
	                };
	            $.ajax(getListOptions);	
				return autocompleteView.ENV.NAMEARRAY;
			}
		};

	
	$(document).ready(function() {
		gridView.init();
		dialogView.init();
		autocompleteView.init();
        $("button").button();
		$(ENV.USER_FORMVIEW_TABS_ID).tabs();
		
		$("button").click(function(evt) {
			var cmdWhat = $(this).attr('id');
			if(cmdWhat == "addBtn") {
				dialogView.dialogOpen(ENV.USER_FORMVIEW_ID, 'add');
			} else if(cmdWhat == "deleteBtn") {
				gridView.deleteData(ENV.USER_GRID_ID);
			} else if(cmdWhat == "saveBtn") {
				gridView.saveData();
				dialogView.dialogClose(ENV.USER_FORMVIEW_ID);
			} else if(cmdWhat == "cancelBtn") {
				dialogView.dialogClose(ENV.USER_FORMVIEW_ID);
			} else if(cmdWhat == "searchBtn") {
				var object = {deptId : gridView.getRowId($('#searchKeyword').val())};
				gridView.setGridInfo(ENV.DEPT_GRID_ID, "gv_prop_selection", object);	
			}
		});
	});
</script>
<div id="content" >

   	<div class="grid-titlebar">USER GRID EXAMPLE</div>
	<div class="grid-searchbar">
		부서명 :
		<input type="text" id="searchKeyword"/>
		<button id="searchBtn">검색</button>
	</div>

	<div id="grid_container" class="grid-container">
    	<div id="leftGrid_container" class="grid-container-left">
	    	<table id="deptGrid" name="grid"></table>
   		</div>
    	<div id="rightGrid_container" class="grid-container-right">
	    	<table id="userGrid" name="grid"></table>
    	</div>
    </div>

   	<div class="grid-buttonbar">
    	<button id="addBtn">추가</button>
  		<button id="deleteBtn">삭제</button>
	</div>

</div>

<!-- user Form -->
<div id="userFormDialog" class="dialog-container">
    <div id="userFormDialog_tabs">
        <ul>
            <li><a href="#tabs-1">기본정보</a></li>
            <li><a href="#tabs-2">추가정보</a></li>
        </ul>
        <form:form modelAttribute="user" method="post" id="userForm" name="userForm">

            <!-- TAB #1 : 기본정보 부분 -->
            <div id="tabs-1" class="dialog-form-container">
                <div class="dialog-titlebar">사용자 기본정보</div>
                <div class="sub-form-title">사용자</div>
                <div class="dialog-sub-form">
                    <form:hidden path="deptId"/>
                    <table id="userInfo" width="100%">
                        <colgroup>
                            <col width="30%">
                            <col width="70%">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>
                                    <label>아이디</label>
                                </th>
                                <td>
                                    <form:input path="userId"/>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label>이름</label>
                                </th>
                                <td>
                                    <form:input path="userName"/>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label>비밀번호</label>
                                </th>
                                <td>
                                    <form:input path="password"/>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label>영문이름</label>
                                </th>
                                <td>
                                    <form:input path="enName"/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="sub-form-title">전화</div>
                <div class="dialog-sub-form">
                    <table id="phoneNumberInfo" width="100%" >
                        <colgroup>
                            <col width="30%">
                            <col width="70%">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>
                                    <label>자택전화</label>
                                </th>
                                <td>
                                    <form:input path="phone"/>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label>휴대전화</label>
                                </th>
                                <td>
                                    <form:input path="cellPhone"/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="sub-form-title">주소</div>
                <div class="dialog-sub-form">
                    <table id="addressInfo" width="100%">
                        <colgroup>
                            <col width="30%">
                            <col width="70%">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>
                                    <label>우편번호</label>
                                </th>
                                <td>
                                    <form:input path="zipCode"/>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label>상세주소</label>
                                </th>
                                <td>
                                    <form:input path="address" class= "sub-form-long-input"/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- TAB #2 : 추가정보 부분 -->
            <div id="tabs-2" class="dialog-form-container">
                <div class="dialog-titlebar">사용자 추가정보</div>
                <div class="sub-form-title">소속</div>
                <div class="dialog-sub-form">
                    <table id="companyInfo" width="100%">
                        <colgroup>
                            <col width="30%">
                            <col width="70%">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>
                                    <label>회사</label>
                                </th>
                                <td>
                                    <form:input path="company" value="삼성SDS" readOnly="true"/>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label>부서</label>
                                </th>
                                <td>
                                    <input type="text" id="deptName" readOnly="true"/>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label>직급</label>
                                </th>
                                <td>
                                    <form:input path="jobPosition"/>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label>담당업무</label>
                                </th>
                                <td>
                                    <form:input path="assignment"/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="sub-form-title">연락처</div>
                <div class="dialog-sub-form">
                    <table id="contactNumberInfo" width="100%" >
                        <colgroup>
                            <col width="30%">
                            <col width="70%">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>
                                    <label>팩스번호</label>
                                </th>
                                <td>
                                    <form:input path="fax"/>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label>전자우편</label>
                                </th>
                                <td>
                                    <form:input path="email"/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="sub-form-title">회사주소</div>
                <div class="dialog-sub-form">
                    <table id="companyAddressInfo" width="100%">
                        <colgroup>
                            <col width="30%">
                            <col width="70%">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>
                                    <label>우편번호</label>
                                </th>
                                <td>
                                    <form:input path="compZipCode"/>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label>상세주소</label>
                                </th>
                                <td>
                                    <form:input path="compAddress" class="sub-form-long-input" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </form:form>
        <div class="dialog-form-buttonbar">
        	<button id="saveBtn">저장</button>
            <button id="cancelBtn">취소</button>
        </div>
    </div>
</div>

<hr />
<%@ include file="/sample/common/bottom.jsp"%>