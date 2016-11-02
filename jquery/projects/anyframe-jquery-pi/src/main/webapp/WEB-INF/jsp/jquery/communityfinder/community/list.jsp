<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/jqueryMovieFinder.do?method=listView'/>">jQuery 1.0.6-SNAPSHOT</a></div>
    </div>
    <hr />
<%@ include file="/WEB-INF/jsp/jquery/menu.jsp"%>

<script type="text/javascript">

	var ENV = {
		COMMUNITY_GRID_ID : "#communityGrid",
		COMMUNITY_GRID_URL : "<c:url value='/jqueryCommunityFinder.do?method=list'/>",
		SEARCHKEYWORD_AUTOCOMPLETE_ID : "#searchKeyword"
	};
	
	var gridView = {
		
		_PROP : {
			SELECTION : "gv_prop_selection",
			ROWIDS : "gv_prop_rowIDs",
			RELOAD : "gv_prop_reload",
			GETROWDATA : "gv_prop_getRowData",
			RESETSELECTION : "gv_prop_resetSelection"
		},
	
		init : function()
		{
			var self=this;
			$(ENV.COMMUNITY_GRID_ID).jqGrid({
				treeGrid: true,
				treeGridModel:'adjacency',
				ExpandColumn:'communityName',
				url : ENV.COMMUNITY_GRID_URL,
				datatype : 'json',
				mtype : 'POST',
				autowidth : true,
				height : 500,
				colNames : ['ID', '커뮤니티명','커뮤니티설명', 'isCategory'],
				colModel : [
					{name:'communityId', index:'communityId', hidden:true, key:true},
					{name:'communityName', index:'communityName'},
					{name:'communityDesc', index:'communityDesc', hidden:true},
					{name:'isCategory', index:'isCategory', hidden:true}
				],
				jsonReader : {
					repeatitems	: false
				},
				treeReader : {
					parent_id_field : 'parentId',
					level_field : 'communityLevel',
					leaf_field : 'leaf',
					expanded_field : 'expanded'
				},
		        gridComplete : function(rowid) {
 		        	var record =$(ENV.COMMUNITY_GRID_ID).jqGrid('getGridParam', 'data');
					$(record).each(function(){
						if(this.leaf == true) {
							var object = {communityId : this.communityId};
							self.setGridInfo(ENV.COMMUNITY_GRID_ID, "gv_prop_selection", object);
							return false;
						}
					}); 
		 		},
		 		onSelectRow : function(rowid) {
					var object = {communityId : rowid};
		 			var rowData = self.getGridInfo(ENV.COMMUNITY_GRID_ID, 'gv_prop_getRowData', object);
			 		formView.setForm(rowData);
			 		if(rowData.isCategory == "true") {
			 			self.setGridInfo(ENV.COMMUNITY_GRID_ID, 'gv_prop_resetSelection');
			 		}
		 		}
			});
		},
	
		setGridInfo : function(grid, prop, object)
		{
			switch(prop) 
			{
				case this._PROP.SELECTION :
					var newval = object.communityId;
					this._setSelection(grid, newval);
					break;
				case this._PROP.RESETSELECTION : 
					this._resetSelection(grid);
					break;
				case this._PROP.RELOAD :
					this._setReload(grid);
					break;
			}
		},
		
		_setSelection : function(grid, newval)
		{
			$(grid).jqGrid('setSelection', newval);
		},
		
		_setReload : function(grid)
		{
			$(grid).trigger('reloadGrid');
		},
		
		_resetSelection : function(grid)
		{
			$(grid).jqGrid('resetSelection');
		},
		
		getGridInfo : function(grid, prop, object) {
			switch(prop) 
			{
				case this._PROP.ROWIDS :
					return this._getDataIDs(grid);
					break;
				case this._PROP.GETROWDATA :
					var newval = object.communityId;
					return this._getRowData(grid, newval);
					break;
			}
		},
		
		_getDataIDs : function(grid) {
			return $(grid).jqGrid('getDataIDs'); 
		},
		
		_getRowData : function(grid, rowid) {
			return $(grid).jqGrid('getRowData', rowid); 
		},
		
		getRowId : function(newval) {
			var result = '';
			var grid_ids = this._getDataIDs(ENV.COMMUNITY_GRID_ID);
			for(var i=0; i<grid_ids.length;i++) {
				var rowid = grid_ids[i];
				var rowData = this._getRowData(ENV.COMMUNITY_GRID_ID, rowid);
				if(rowData.communityName == newval) {
					result = rowid;
				}
			}
			return result;
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
            var getOptions = {
                    type : "POST",
                    url : '<c:url value="/jqueryCommunityFinder.do?method=list"/>',
                    data : {},
                    async : false,
                    success : function(data) {
    					for(var i=0; i <data.rows.length;i++) {
    						autocompleteView.ENV.NAMEARRAY.push(data.rows[i].communityName); 
    					}
                    },
                    error : function(data){
                        alert("오류가 발생했습니다!");
                    }
                };
            $.ajax(getOptions);
			return autocompleteView.ENV.NAMEARRAY;
		}
	};
	
	var formView = {
		
		setForm : function(rowData) {
 			if(rowData.isCategory == "false") {
	 			$('#communityId').val(rowData.communityId);
	 			$('#communityName').val(rowData.communityName);
	 			$('#communityDesc').val(rowData.communityDesc);	
 			}
		},
		
		saveData : function() {
            var saveOptions = {
                    type : "POST",
                    url : '<c:url value="/jqueryCommunity.do?method=update"/>',
                    data : {"communityId" : $('#communityId').val(), "communityName" : $('#communityName').val(), "communityDesc" : $('#communityDesc').val()},
                    async : false,
                    success : function(data) {
        				gridView.setGridInfo(ENV.COMMUNITY_GRID_ID, 'gv_prop_reload');
                    },
                    error : function(data){
                        alert("오류가 발생했습니다!");
                    }
                };
            $.ajax(saveOptions);
		}
	};
	
	$(document).ready(function() {
		gridView.init();
		autocompleteView.init();
        $("button").button();
		
		$("button").click(function(evt) {
			var cmdWhat = $(this).attr('id');
			if(cmdWhat == "searchBtn") {
				var object = {communityId : gridView.getRowId($('#searchKeyword').val())};
				gridView.setGridInfo(ENV.COMMUNITY_GRID_ID, "gv_prop_selection", object);				
			} else if(cmdWhat == "saveBtn") {
				formView.saveData();
			}
		});
	});
</script>

<div id="content">

   	<div class="grid-titlebar">COMMUNITY GRID EXAMPLE</div>
	<div class="grid-searchbar">
        커뮤니티 이름 :
		<input type="text" id="searchKeyword"/>
		<button id="searchBtn">검색</button>
	</div>

    <div id="community_container" class="grid-container">
    	<div id="leftGrid_container" class="grid-container-left">
	    	<table id="communityGrid" name="grid"></table>
   		</div>
    	<div id="form_container" class="grid-container-right">
            <div id="titleName" class="form-title">커뮤니티</div>
            <div class="form-container">

				<input type="hidden" id="isCategory"/>

				<table id="communityInfo" width="100%" height="485px" class="form-table">
					<colgroup>
						<col class="form-first-cols">
						<col class="form-second-cols">
					</colgroup>
					<tbody>
						<tr height="25px">
							<th>
                                <label id="tableCommunityId">커뮤니티 ID</label>
							</th>
							<td>
                                <input type="text" id="communityId" readOnly="true" disabled/>
                            </td>
						</tr>
						<tr height="25px">
							<th>
                               <label id="tableCommunityName">커뮤니티 이름</label>
							</th>
							<td>
                                <input type="text" id="communityName"/>
                            </td>
						</tr>
						<tr height="440px">
							<th>
                                <label>상세설명</label>
                            </th>
							<td>
                                <textarea id="communityDesc" rows="20"></textarea>
                            </td>
						</tr>
					</tbody>
				</table>
			</div>
    	</div>
    </div>

    <div class="grid-buttonbar">
    	<button id="saveBtn">저장</button>
	</div>
</div>

<hr />
<%@ include file="/sample/common/bottom.jsp"%>