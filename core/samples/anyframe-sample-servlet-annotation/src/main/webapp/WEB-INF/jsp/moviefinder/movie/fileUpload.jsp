<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/movieFinder.do'/>">Servlet 3.0 Java Config Example</a></div>
    </div>
    <hr />
<div class="main_greeting">
	<dl>
		<dt>Servlet 3.0 File Upload Sample</dt>
	</dl>
</div>
<div class="">
	<dl>
		<form method="POST" action="upload.do" enctype="multipart/form-data">
			File: <input type="file" name="file" id="file" /> <br />
			<br /> Destination: <input type="text" value="c:/tmp"
				name="destination" /> <br /><br />
			<input type="submit" value="Upload" name="upload" id="upload" />
		</form>
	</dl>
</div>
<%@ include file="/sample/common/bottom.jsp"%>
