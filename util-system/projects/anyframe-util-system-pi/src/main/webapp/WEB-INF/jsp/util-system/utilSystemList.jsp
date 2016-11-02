<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/utilSystem/utilSystemList.do'/>">Util-System 1.5.2-SNAPSHOT</a></div>
    </div>
    <hr />
    <div id="container">
    	<div class="cont_top">
        	<h2>System Utility Test List</h2>
      	</div>
        <div class="util_list">
        	<ul>
				<li><a href="${ctx}/utilSystem/systemMain.do">System Utility Test List</a></li>
				<li><a href="${ctx}/utilSystem/networkMain.do">Network Utility Test</a></li>
				<li><a href="${ctx}/utilSystem/systemUsageMain.do">SystemUsageInfo Test List</a></li>
				<li><a href="${ctx}/utilSystem/systemUsageChartMain.do">SystemUsageChart Test List</a></li>
</ul>
        </div>
	</div>
    <hr />
<%@ include file="/sample/common/bottom.jsp"%>