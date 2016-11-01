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
 *         Page class is included in anyframe-core-x.x.x.jar Collection objects
 *         : list information <br>
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
 *         pages="<%=pagenav%>" formName="myForm"/&gt
 * 
 */

public class PageNavigatorTag extends TagSupport {

	private static final long serialVersionUID = 1L;

	private String formName = "forms[0]";

	private String numStyleClass = "page";
	private String clickNumStyleClass = "page_selected";
	private String pageFirstImageStyleClass = "page_first";
	private String pagePreviousImageStyleClass = "page_previous";
	private String pageNextImageStyleClass = "page_next";
	private String pageLastImageStyleClass = "page_last";
	private String pageImageSpaceStyleClass = "page_img_space";
	private String pageNumSpaceStyleClass = "page_num_space";

	private String linkClass = "linkClass";
	private String render = "all";
	private String linkFragment = "";
	private String linkPopup = "";
	private String PARTIAL_RENDERING = "<script type=\"text/javascript\">function {elementId}(){document.{formId}.pageIndex.value={pageIndex};}Spring.addDecoration(new Spring.AjaxEventDecoration({ elementId:\"{elementId}\",event:\"onclick\",formId:\"{formId}\",params:{fragments:\"{dynamicAttrName}\"}, func:{elementId}}));</script>";

	private String firstImg = "";
	private String prevImg = "";
	private String lastImg = "";
	private String nextImg = "";
	private String imgHeight = "13";
	private String imgWidth = "15";
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
			String pageNumScript = "javascript:document." + getFormName()
					+ ".pageIndex.value=";

			boolean isPartial = false;
			if (isNotEmpty(this.render) && this.render.startsWith("partial"))
				isPartial = true;

			generatedCodes = appendCodes(generatedCodes,
					"<input type=\"hidden\" name=\"pageIndex\" value=\"1\"/>");

			generatedCodes = appendCodes(generatedCodes,
					"<table border='0' cellspacing='0' cellpadding='0'><tr>");

			// 1. define image-button part for moving first page
			if (pages.hasPreviousPageUnit()) {
				generatedCodes = appendCodes(generatedCodes, getLinkedTag(
						"previousPageUnit", pageNumScript, pages
								.getPageOfPreviousPageUnit(),
						pageFirstImageStyleClass, firstImg));

				generatedCodes = appendCodes(generatedCodes,
						checkPartialRendering(
								pages.getPageOfPreviousPageUnit(),
								"previousPageUnit", isPartial)
								+ "</td>");
			} else {
				generatedCodes = appendCodes(generatedCodes, "<td>"
						+ getUnlinkedTag(pageFirstImageStyleClass, firstImg)
						+ "</td>");
			}

			// 2. define space for images
			generatedCodes = appendCodes(generatedCodes, "<td class=\""
					+ pageImageSpaceStyleClass + "\"></td>");

			// 3. define image-button part for moving previous page
			if (pages.hasPreviousPage()) {
				generatedCodes = appendCodes(generatedCodes, getLinkedTag(
						"previousPage", pageNumScript, pages.getPreviousPage(),
						pagePreviousImageStyleClass, prevImg));

				generatedCodes = appendCodes(generatedCodes,
						checkPartialRendering(pages.getPreviousPage(),
								"previousPage", isPartial)
								+ "</td>");
			} else {
				generatedCodes = appendCodes(generatedCodes, "<td>"
						+ getUnlinkedTag(pagePreviousImageStyleClass, prevImg)
						+ "</td>");
			}

			// 4. define space for images
			generatedCodes = appendCodes(generatedCodes, "<td class=\""
					+ pageImageSpaceStyleClass + "\"></td>");

			// 5. define page number part for moving a specific page
			if (pages.isEmptyPage()) {
				generatedCodes = appendCodes(generatedCodes, "<td class='"
						+ numStyleClass + "'><td class=\""
						+ pageNumSpaceStyleClass + "\"></td>1<td class=\""
						+ pageNumSpaceStyleClass + "\"></td></td>");
			} else {
				generatedCodes = appendCodes(generatedCodes, "<td class='"
						+ numStyleClass + "'><table><tr>");
				for (int i = pages.getBeginUnitPage(); i <= pages
						.getEndListPage(); i++) {
					generatedCodes = appendCodes(generatedCodes, "<td class=\""
							+ pageNumSpaceStyleClass + "\"></td>");
					if (i == pages.getCurrentPage()) {
						generatedCodes = appendCodes(generatedCodes,
								"<td><font class='" + clickNumStyleClass + "'>"
										+ i + "</font></td>");
					} else {
						String id = new Integer(i).toString();
						generatedCodes = appendCodes(generatedCodes,
								"<td><a id=\"page" + id + "\" href='"
										+ pageNumScript + id + ";" + linkUrl
										+ "'>");
						generatedCodes = appendCodes(generatedCodes, i
								+ "</a></td>"
								+ checkPartialRendering(i, "page" + id,
										isPartial));
					}
				}
				generatedCodes = appendCodes(generatedCodes, "<td class=\""
						+ pageNumSpaceStyleClass + "\"></td></tr></table></td>");
			}

			// 6. define image-button part for moving next page
			if (pages.hasNextPage()) {
				generatedCodes = appendCodes(generatedCodes, getLinkedTag(
						"nextPage", pageNumScript, pages.getNextPage(),
						pageNextImageStyleClass, nextImg));

				generatedCodes = appendCodes(generatedCodes,
						checkPartialRendering(pages.getNextPage(), "nextPage",
								isPartial)
								+ "</td>");
			} else {
				generatedCodes = appendCodes(generatedCodes, "<td>"
						+ getUnlinkedTag(pageNextImageStyleClass, nextImg)
						+ "</td>");
			}

			// 7. define space for images
			generatedCodes = appendCodes(generatedCodes, "<td class=\""
					+ pageImageSpaceStyleClass + "\"></td>");

			// 8. define image-button part for moving last page
			if (pages.hasNextPageUnit()) {
				generatedCodes = appendCodes(generatedCodes, getLinkedTag(
						"nextPageUnit", pageNumScript, pages
								.getPageOfNextPageUnit(),
						pageLastImageStyleClass, lastImg));

				generatedCodes = appendCodes(generatedCodes,
						checkPartialRendering(pages.getPageOfNextPageUnit(),
								"nextPageUnit", isPartial)
								+ "</td>");
			} else {
				generatedCodes = appendCodes(generatedCodes, "<td>"
						+ getUnlinkedTag(pageLastImageStyleClass, lastImg)
						+ "</td>");
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

	private String getLinkedTag(String id, String pageNumScript,
			int pageIndexValue, String styleClassName, String imagePath) {
		if (isNotEmpty(imagePath)) {
			return "<td><a id=\"" + id + "\" href='" + pageNumScript
					+ pageIndexValue + ";" + linkUrl + "'>"
					+ getImgTag(imagePath) + "</a>";
		}

		return "<td><a id=\"" + id + "\" class=\"" + styleClassName
				+ "\" href='" + pageNumScript + pageIndexValue + ";" + linkUrl
				+ "'></a>";

	}

	private String getUnlinkedTag(String styleClassName, String imagePath) {
		if (isNotEmpty(imagePath)) {
			return getImgTag(imagePath);
		}

		return "<table class=\"" + styleClassName
				+ "\"><tr><td></td></tr></table>";
	}

	private String getImgTag(String imagePath) {
		return "<img src='" + imagePath + "' width='" + imgWidth + "' height='"
				+ imgHeight + "' border='0'>";
	}

	/**
	 * @return String Link URL
	 */
	public String getLinkUrl() {
		return linkUrl;
	}

	/**
	 * @param string
	 *            LinkUrl
	 */
	public void setLinkUrl(String string) {
		linkUrl = string;
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

	@Deprecated
	public void setFirstImg(String firstImg) {
		this.firstImg = firstImg;
	}

	@Deprecated
	public void setPrevImg(String prevImg) {
		this.prevImg = prevImg;
	}

	@Deprecated
	public void setLastImg(String lastImg) {
		this.lastImg = lastImg;
	}

	@Deprecated
	public void setNextImg(String nextImg) {
		this.nextImg = nextImg;
	}

	@Deprecated
	public void setImgHeight(String string) {
		imgHeight = string;
	}

	@Deprecated
	public void setImgWidth(String string) {
		imgWidth = string;
	}

	protected String appendCodes(String all, String part) {
		StringBuilder result = new StringBuilder(all.length() + part.length() + 1)
				.append(all).append(part).append("\n");
		return result.toString();
	}
}
