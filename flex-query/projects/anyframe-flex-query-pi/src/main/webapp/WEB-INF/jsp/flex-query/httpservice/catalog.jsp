<%@page import="java.util.List, java.util.Map, java.util.HashMap"%>
<?xml version="1.0" encoding="utf-8"?>
<catalog>
<%
	List productList = (List) request.getAttribute("productList");
	for (int i=0; i<productList.size(); i++)
	{
		Map product = (HashMap) productList.get(i);
%>	
    <product productId="<%= product.get("product_id")%>">
        <name><%= product.get("name") %></name>
        <description><%= product.get("description")%></description>
        <price><%= product.get("price") %></price>
        <image><%= product.get("image") %></image>
        <category><%= product.get("category") %></category>
        <qtyInStock><%= product.get("qty_in_stock") %></qtyInStock>
    </product>
<%
	}
%>
</catalog>