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
                        <simpleweb:link id="mapMovie" action="/simplemap.do" service="simplewebMapMovieFinder.getPagingList(map)" layout="mapLayout" tiles="body:/WEB-INF/jsp/simpleweb-map/moviefinder/movie/list.jsp">
							<simpleweb:setProperty name="title">SimpleWeb-Map</simpleweb:setProperty>
						</simpleweb:link>
                        </td>
                    </tr>
<!--simpleweb-map-menu-END-->
                </table>
            </td>
        </tr>
    </table>
</div>
