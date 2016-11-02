<%@ taglib uri="/WEB-INF/anyframe-html.tld" prefix="anyframe" %>
<%@ taglib uri="/WEB-INF/struts-bean.tld" prefix="bean" %>

<table width="95%" align="left">
	<tr>
		<td class="common_error">
			<anyframe:messages id="msg" bundle='<%=request.getParameter("bundle")%>' header="errors.header" suffix="errors.suffix">		
			   <bean:write name="msg"/>
			</anyframe:messages>
		</td>
	</tr>
</table>	   
