<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/utilDemo/utilDemoList.do'/>">Util-demo 1.0.1</a></div>
    </div>
    <hr />
    <div id="container">
    	<div class="cont_top">
        	<h2>Component Utility Test List</h2>
      	</div>
        <div class="util_list">
        	<ul>
				<li><a href="${ctx}/utilDemo/dateMain.do">Date Utility Test</a></li>
				<li><a href="${ctx}/utilDemo/digestMain.do">Digest Utility Test</a></li>
				<li><a href="${ctx}/utilDemo/numberMain.do">Number Utility Test</a></li>
				<li><a href="${ctx}/utilDemo/stringMain.do">String Utility Test</a></li>
				<li><a href="${ctx}/utilDemo/validationMain.do">Validation Utility Test</a></li>
 			</ul>
        </div>
	</div>
    <hr />
<%@ include file="/sample/common/bottom.jsp"%>