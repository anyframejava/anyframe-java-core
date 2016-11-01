<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/taglibs.jsp"%>
<%@ taglib uri="http://www.anyframejava.org/tags/simpleweb" prefix="simpleweb" %>
<div id="left">
<style type="text/css">
<!--
.menus {
        background-image:
                url("<c:url value='/sample/images/top_menus.png'/>");
}

.depth01 a:hover {
        background: #dadada
                url("<c:url value='/sample/images/menu_hover.png'/>") left top
                no-repeat;
}
-->
    </style>
    <table border="0" cellpadding="0" cellspacing="0" bgcolor="#eeeeee">
        <tr>
            <td>
                <table width="177" border="0" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">
                    <tr>
                        <td height="23" bgcolor="#eeeeee" class="menus"></td>
                    </tr>
<!--Add new menu here-->                    
<!--simpleweb-map-menu-START-->
                    <tr>
                        <td valign="top" bgcolor="#eeeeee" class="depth01">
                        <simpleweb:link id="jqueryMovie" action="/simplejson.do" layout="jqueryLayout" tiles="body:/WEB-INF/jsp/simpleweb-jquery/moviefinder/movie/list.jsp">
							<simpleweb:model name="search" type="${packageName}.simpleweb.jquery.moviefinder.service.MovieSearchVO"/>
							<simpleweb:setProperty name="title">SimpleWeb-jQuery[1]</simpleweb:setProperty>
						</simpleweb:link>
                        </td>
                    </tr>
                    <tr>
                        <td valign="top" bgcolor="#eeeeee" class="depth01">
                        <simpleweb:link id="jqueryTree" action="/simplejson.do" layout="jqueryLayout" tiles="body:/WEB-INF/jsp/simpleweb-jquery/moviefinder/movie/tree.jsp">
							<simpleweb:model name="movie" type="${packageName}.simpleweb.jquery.domain.Movie"/>
							<simpleweb:init valueList="genreList:simplewebJqueryGenreService.getDropDownGenreList()"></simpleweb:init>
							<simpleweb:setProperty name="title">SimpleWeb-jQuery[2]</simpleweb:setProperty>
						</simpleweb:link>
                        </td>
                    </tr>
<!--simpleweb-map-menu-END-->
                </table>
            </td>
        </tr>
    </table>
</div>
