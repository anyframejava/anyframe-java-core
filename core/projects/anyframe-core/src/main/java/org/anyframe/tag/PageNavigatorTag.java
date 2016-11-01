/*
 * Copyright 2002-2008 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.anyframe.tag;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

import org.anyframe.pagination.Page;
import org.springframework.util.StringUtils;

/**
 * @author Byunghoon Woo
 * 
 *         Custom tag that renders page navigation bar in the page if an
 *         appropriate request attribute has been created.
 * 
 *         Page class is included in anyframe-common-x.x.x.jar Collection
 *         objects : list information <br>
 *         int currentPage : current page <br>
 *         int totalCount : total count <br>
 *         int pageunit : page unit <br>
 *         int pagesize : list count per page <br>
 *         int maxPage: total page <br>
 *         int beginUnitPage: begin page <br>
 *         int endUnitPage: end page<br>
 * 
 *<br>
 *<br>
 *         <b>>>sample usage</b> <br>
 *<br>
 *         &ltinput type="hidden" name="pageIndex" value="&lt%=pageIndex%&gt"&gt <br>
 *<br>
 *         &ltpage:pagenavigator linkUrl="javascript:getViewPage();"
 *         pages="<%=pagenav%>" formName="syrinxSearchAuditForm"/&gt
 * 
 */

public class PageNavigatorTag extends TagSupport {

	private static final long serialVersionUID = 1L;

	private String firstImg = "resources/org/anyframe/images/page/page_before1.gif";

	private String prevImg = "resources/org/anyframe/images/page/page_before.gif";

	private String lastImg = "resources/org/anyframe/images/page/page_after1.gif";

	private String nextImg = "resources/org/anyframe/images/page/page_after.gif";

	private String imgHeight = "13";

	private String imgWidth = "15";

	private String numClass = "page";

	private String clickNumClass = "page_s";

	private String formName = "forms[0]";

	private String render = "all";

	private String linkClass = "linkClass";

	private String linkFragment = "";

	private String linkPopup = "";

	private String PARTIAL_RENDERING = "<script type=\"text/javascript\">function {elementId}(){document.{formId}.pageIndex.value={pageIndex};}Spring.addDecoration(new Spring.AjaxEventDecoration({ elementId:\"{elementId}\",event:\"onclick\",formId:\"{formId}\",params:{fragments:\"{dynamicAttrName}\"}, func:{elementId}}));</script>";
	/**
	 * Required
	 */
	private String linkUrl = "";

	private Page pages = Page.EMPTY_PAGE;

	private int currentPage = 1;

	public int doStartTag() throws JspException {
		try {
			JspWriter out = pageContext.getOut();
			String generatedCodes = "";
			String page_num_script = "javascript:document." + getFormName()
					+ ".pageIndex.value=";
			boolean isPartial = false;
			if (isNotEmpty(this.render) && this.render.startsWith("partial"))
				isPartial = true;
			generatedCodes = appendCodes(generatedCodes,
					"<input type=\"hidden\" name=\"pageIndex\" value=\"1\"/>");
			generatedCodes = appendCodes(generatedCodes,
					"<table border='0' cellspacing='0' cellpadding='0'><tr>");
			if (pages.hasPreviousPageUnit()) {
				generatedCodes = appendCodes(generatedCodes,
						"<td><a id=\"previousPageUnit\" href='"
								+ page_num_script
								+ pages.getPageOfPreviousPageUnit() + ";"
								+ linkUrl + "'>");
				generatedCodes = appendCodes(generatedCodes, "<img src='"
						+ firstImg
						+ "' width='"
						+ imgWidth
						+ "' height='"
						+ imgHeight
						+ "' border='0' ></a>"
						+ checkPartialRendering(pages
								.getPageOfPreviousPageUnit(),
								"previousPageUnit", isPartial) + "</td>");
			} else {
				generatedCodes = appendCodes(generatedCodes,
						"<td><img diabled src='" + firstImg + "' width='"
								+ imgWidth + "' height='" + imgHeight
								+ "' border='0' ></td>");
			}
			generatedCodes = appendCodes(generatedCodes, "<td width='3'></td>");
			if (pages.hasPreviousPage()) {
				generatedCodes = appendCodes(generatedCodes,
						"<td width='28'><a id=\"previousPage\" href='"
								+ page_num_script + pages.getPreviousPage()
								+ ";" + linkUrl + "'>");
				generatedCodes = appendCodes(generatedCodes, "<img src='"
						+ prevImg
						+ "' border='0' ></a>"
						+ checkPartialRendering(pages.getPreviousPage(),
								"previousPage", isPartial) + "</td>");

			} else {
				generatedCodes = appendCodes(generatedCodes,
						"<td width='28'><img src='" + prevImg
								+ "' border='0' ></td>");
			}
			generatedCodes = appendCodes(generatedCodes, "<td width='3'></td>");
			if (pages.isEmptyPage()) {
				generatedCodes = appendCodes(generatedCodes, "<td class='"
						+ numClass + "'>1</td>");
			} else {
				generatedCodes = appendCodes(generatedCodes, "<td class='"
						+ numClass + "'>");
				for (int i = pages.getBeginUnitPage(); i <= pages
						.getEndListPage(); i++) {
					if (i == pages.getCurrentPage()) {
						generatedCodes = appendCodes(generatedCodes,
								" <font class='" + clickNumClass + "'>" + i
										+ "</font>" + "&nbsp;&nbsp;&nbsp;");
					} else {
						String id = new Integer(i).toString();
						generatedCodes = appendCodes(generatedCodes,
								"<a id=\"page" + id + "\" href='"
										+ page_num_script + id + ";" + linkUrl
										+ "'>");
						generatedCodes = appendCodes(generatedCodes, i
								+ "</a>"
								+ checkPartialRendering(i, "page" + id,
										isPartial) + "&nbsp;&nbsp;&nbsp;");
					}
				}
				generatedCodes = appendCodes(generatedCodes, "</td>");
			}

			if (pages.hasNextPage()) {
				generatedCodes = appendCodes(generatedCodes,
						"<td width='28' align='right'><a id=\"nextPage\" href='"
								+ page_num_script + pages.getNextPage() + ";"
								+ linkUrl + "'>");
				generatedCodes = appendCodes(generatedCodes, "<img src='"
						+ nextImg
						+ "' border='0' ></a>"
						+ checkPartialRendering(pages.getNextPage(),
								"nextPage", isPartial) + "</td>");
			} else {
				generatedCodes = appendCodes(generatedCodes,
						"<td width='28' align='right'><img src='" + nextImg
								+ "' border='0' ></td>");
			}
			generatedCodes = appendCodes(generatedCodes, "<td width='3'></td>");

			if (pages.hasNextPageUnit()) {
				generatedCodes = appendCodes(generatedCodes,
						"<td width='20' ><a id=\"nextPageUnit\" href='"
								+ page_num_script
								+ pages.getPageOfNextPageUnit() + ";" + linkUrl
								+ "'>");
				generatedCodes = appendCodes(generatedCodes, "<img src='"
						+ lastImg
						+ "' width='"
						+ imgWidth
						+ "' height='"
						+ imgHeight
						+ "' border='0' ></a>"
						+ checkPartialRendering(pages.getPageOfNextPageUnit(),
								"nextPageUnit", isPartial) + "</td>");
			} else {
				generatedCodes = appendCodes(generatedCodes,
						"<td width='20' ><img src='" + lastImg + "' width='"
								+ imgWidth + "' height='" + imgHeight
								+ "' border='0' ></td>");
			}

			generatedCodes = appendCodes(generatedCodes, "</tr></table>");

			if (isPartial) {
				String fragment = "";
				if (isNotEmpty(getLinkFragment()))
					fragment = getLinkFragment();
				else
					fragment = getDynamicAttrName();
				generatedCodes = appendCodes(generatedCodes,
						"<script type=\"text/javascript\">");
				generatedCodes = appendCodes(generatedCodes, " dojo.query(\"."
						+ getLinkClass() + "\").forEach(function(element) {");
				generatedCodes = appendCodes(generatedCodes,
						"   Spring.addDecoration(new Spring.AjaxEventDecoration({");
				generatedCodes = appendCodes(generatedCodes,
						"   elementId: element.id,");
				generatedCodes = appendCodes(generatedCodes,
						"   event: \"onclick\",");
				if (isNotEmpty(getLinkPopup()))
					generatedCodes = appendCodes(generatedCodes, "   popup: "
							+ getLinkPopup() + ",");
				generatedCodes = appendCodes(generatedCodes,
						"   params: {fragments:\"" + fragment + "\"}");
				generatedCodes = appendCodes(generatedCodes, "   }));");
				generatedCodes = appendCodes(generatedCodes, "    });");
				generatedCodes = appendCodes(generatedCodes, "</script>");
			}

			out.write(generatedCodes);
		} catch (Exception ex) {
			throw new JspTagException(ex.getMessage());
		}
		return SKIP_BODY;
	}

	private String checkPartialRendering(int pageIndex, String elementId,
			boolean isPartial) {
		String checkResult = "";
		if (isPartial) {
			checkResult = StringUtils.replace(PARTIAL_RENDERING, "{elementId}",
					elementId);
			checkResult = StringUtils.replace(checkResult, "{formId}", this
					.getFormName());
			checkResult = StringUtils.replace(checkResult, "{pageIndex}",
					new Integer(pageIndex).toString());
			checkResult = StringUtils.replace(checkResult, "{dynamicAttrName}",
					getDynamicAttrName());
		}

		return checkResult;
	}

	private String getDynamicAttrName() {
		String dynamicAttrName = "body";
		if (this.render.startsWith("partial:"))
			dynamicAttrName = this.render.substring(8);
		return dynamicAttrName;
	}

	private boolean isNotEmpty(String str) {
		return !(str == null || str.length() == 0);
	}

	/**
	 * @return String ClickNumClass
	 */
	public String getClickNumClass() {
		return clickNumClass;
	}

	/**
	 * @return String FirstImg
	 */
	public String getFirstImg() {
		return firstImg;
	}

	/**
	 * @return String ImgHeight
	 */
	public String getImgHeight() {
		return imgHeight;
	}

	/**
	 * @return String ImgWidth
	 */
	public String getImgWidth() {
		return imgWidth;
	}

	/**
	 * @return String Last Image
	 */
	public String getLastImg() {
		return lastImg;
	}

	/**
	 * @return String Link URL
	 */
	public String getLinkUrl() {
		return linkUrl;
	}

	/**
	 * @return String Next Image
	 */
	public String getNextImg() {
		return nextImg;
	}

	/**
	 * @return String Num Class
	 */
	public String getNumClass() {
		return numClass;
	}

	/**
	 * @return String PrevImg
	 */
	public String getPrevImg() {
		return prevImg;
	}

	/**
	 * @param string
	 *            ClickNumClass
	 */
	public void setClickNumClass(String string) {
		clickNumClass = string;
	}

	/**
	 * @param string
	 *            FirstImg
	 */
	public void setFirstImg(String string) {
		firstImg = string;
	}

	/**
	 * @param string
	 *            ImgHeight
	 */
	public void setImgHeight(String string) {
		imgHeight = string;
	}

	/**
	 * @param string
	 *            ImgWidth
	 */
	public void setImgWidth(String string) {
		imgWidth = string;
	}

	/**
	 * @param string
	 *            LastImg
	 */
	public void setLastImg(String string) {
		lastImg = string;
	}

	/**
	 * @param string
	 *            LinkUrl
	 */
	public void setLinkUrl(String string) {
		linkUrl = string;
	}

	/**
	 * @param string
	 *            NextImg
	 */
	public void setNextImg(String string) {
		nextImg = string;
	}

	/**
	 * @param string
	 *            NumClass
	 */
	public void setNumClass(String string) {
		numClass = string;
	}

	/**
	 * @param string
	 *            PrevImg
	 */
	public void setPrevImg(String string) {
		prevImg = string;
	}

	/**
	 * @return Pages
	 */
	public Page getPages() {
		return pages;
	}

	/**
	 * @param i
	 *            CurrentPage
	 */
	public void setCurrentPage(int i) {
		currentPage = i;
	}

	/**
	 * @param page
	 *            Pages
	 */
	public void setPages(Page page) {
		pages = page;
	}

	/**
	 * @return int CurrentPage
	 */
	public int getCurrentPage() {
		return currentPage;
	}

	/**
	 * @return String FormName
	 */
	public String getFormName() {
		return formName;
	}

	/**
	 * @param string
	 *            FormName
	 */
	public void setFormName(String string) {
		formName = string;
	}

	/**
	 * @return String page rendering partial or all
	 */
	public String getRender() {
		return render;
	}

	/**
	 * @param render
	 *            page rendering partial or all
	 */
	public void setRender(String render) {
		this.render = render;
	}

	/**
	 * @return list link css class for render rendering
	 */
	public String getLinkClass() {
		return linkClass;
	}

	public void setLinkClass(String linkClass) {
		this.linkClass = linkClass;
	}

	public String getLinkFragment() {
		return linkFragment;
	}

	public void setLinkFragment(String linkFragment) {
		this.linkFragment = linkFragment;
	}

	public String getLinkPopup() {
		return linkPopup;
	}

	public void setLinkPopup(String linkPopup) {
		this.linkPopup = linkPopup;
	}

	protected String appendCodes(String all, String part) {
		StringBuffer result = new StringBuffer(all.length() + part.length() + 1)
				.append(all).append(part).append("\n");
		return result.toString();
	}
}
