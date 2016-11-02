<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/util/utilList.do'/>">Util 1.0.5-SNAPSHOT</a></div>
    </div>
    <hr />
    <div id="container">
    	<div class="cont_top">
        	<h2>Component Utility Test List</h2>
      	</div>
        <div class="util_list">
        	<ul>
				<li><a href="${ctx}/util/dateMain.do">Date Utility Test</a></li>
				<li><a href="${ctx}/util/digestMain.do">Digest Utility Test</a></li>
				<li><a href="${ctx}/util/numberMain.do">Number Utility Test</a></li>
				<li><a href="${ctx}/util/stringMain.do">String Utility Test</a></li>
				<li><a href="${ctx}/util/validationMain.do">Validation Utility Test</a></li>
				<li><a href="${ctx}/util/threadLocalMain.do">ThreadLocal Utility Test</a></li>
 			</ul>
        </div>
	</div>
    <hr />
<%@ include file="/sample/common/bottom.jsp"%>