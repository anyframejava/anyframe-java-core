<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/WEB-INF/anyframe-iam.tld" prefix="iam" %>
<%@ include file="/sample/common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Anyframe 5.2.0 Main</title>
<link rel="stylesheet" type="text/css" href="<c:url value='/sample/css/layout.css'/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value='/sample/css/common.css'/>"/>
<!-- jQuery popup component : nyromodal -->
<link rel="stylesheet" href="<c:url value='/iam/jquery/popup/nyroModal.full.css'/>" type="text/css"/>
</head>

<body>
<div id="wrap">
	<div class="skipnavigation">
		<a href="#contents">Jump up to the contents</a>
	</div>
    <hr />
    
    <div id="header">
    	<div class="toplogo"><h1><a href="<c:url value='/anyframe.jsp'/>"><img src="<c:url value='/sample/images/h1_toplogo.jpg'/>" alt="anyframe"/></a></h1></div>

		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/iamListDirector.do'/>">IAM 1.0.4-SNAPSHOT</a></div>
    </div>
    <hr />
 <!-- jQuery include -->
<script type="text/javascript" src="<c:url value='/iam/jquery/jquery-1.4.2.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/iam/jquery/popup/jquery.nyroModal-1.6.2.js'/>"></script>
<script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>    
<script type="text/javascript">
	function fncSearchDirector() {
	   	document.searchForm.action="<c:url value='/iamListDirector.do'/>";
	   	document.searchForm.submit();						
	}		
	</script>
  	<div id="container">
  	<form:form modelAttribute="movie" method="post" name="searchForm">
    	<div class="cont_top">
        	<h2><spring:message code='movie.heading'/></h2>
      		<div class="search_list">
                <fieldset>
                    <legend>Search</legend>
                    <label for="searchKeyword" class="float_left margin_right5">Director Name : <input name="searchKeyword" type="text" id="searchKeyword" class="w_search" /></label>
                    <label for="btnSearch" class="float_left">
                    	<input type="image" id="btnSearch" name="searchBtn" alt="Search" src="<c:url value='/sample/images/btn_search_i.gif'/>"/>
                    </label>
                </fieldset>
            </div>
      	</div>
        <div class="list">
      		<table summary="This is list of Director">
            	<caption>Director List</caption>
                <colgroup>
                	<col style="width:20%;" />
                    <col style="width:30%;" />
                    <col style="width:50%;" />
                </colgroup>
                <thead>
                    <tr>
                    	<th>Director Id</th>
                        <th>Director Name</th>
                        <th>Movies</th>
                    </tr>
                </thead>
                <tbody>
                	<c:forEach var="director" items="${directorList}">
	                	<tr>
	                        <td><a class="linkClass" href="${ctx}/iamGetDirector.do?directorId=${director.directorId}">${director.directorId}</a></td>
	                        <td>${director.name}</td>
	                        <td>${director.movies}</td>
	                    </tr>
                    </c:forEach>
                </tbody>
            </table>
        </div>
        
        <div class="listunder_container none_listpaging">
        	<div class="list_underbtn_left">        	
                <a href="#test" class="nyroModal">
                <span class="button default">   
                	<span></span>
                    <span class="none_a txt_num4 align_center"> Help</span>
                </span>
                </a>         	
                <iam:access hasPermission="${iam:getPermissionMask(\"READ\")}" viewName="View Management">
				    <a href="#popup" class="nyroModal">
				    <span class="button default icon">
				        <span class="filedownload">&nbsp;</span>
				        <span class="none_a txt_num10 align_center">Excel Down</span>
				    </span>
				    </a>                  
				</iam:access>
            </div>
            
            <div class="list_underbtn_right">
                <a href="<c:url value='/j_spring_security_logout'/>">
                <span class="button default icon">   
                    <span class="logout">&nbsp;</span>
                    <span class="none_a txt_num6">Log out</span>
                </span>
                </a>                
            </div>
        </div>
        </form:form>
	</div>
    <hr />
    <div id="test" style="display: none; width: 600px;">
  <table>
  	  <tr>
	    <td>
			<b>You can enter this application using UserName/Password as below : </b>
			<ul>
				<li>UserName : <b>admin</b>, Password : <b>admin123</b>,&nbsp; Role : <b>ROLE_ADMIN </b></li>
				<li>UserName : <b>user</b>,&nbsp;&nbsp;&nbsp; Password : <b>user123</b>,&nbsp;&nbsp;&nbsp; Role : <b>ROLE_USER</b></li>
				<li>UserName : <b>buyer</b>,&nbsp; Password : <b>buyer123</b>,&nbsp; Role : <b>ROLE_RESTRICTED</b></li>
			</ul>
			<b>Each Role has authorization as below : </b>
			<ul>
				<li><b>Director List</b> : ROLE_USER, ROLE_ADMIN </li>
				<li><b>Update Director</b> : ROLE_ADMIN </li>
			</ul>
	    </td>
	  </tr>
  </table>
</div>
<div id="popup" style="display: none; width: 600px;">
  <table>
  	  <tr>
	    <td>
			<p><b>If you can see this message, your ROLE is ROLE_ADMIN.</b></p>
	    </td>
	  </tr>
  </table>
</div>
<%@ include file="/sample/common/bottom.jsp"%>

