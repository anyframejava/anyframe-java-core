/*
 * Copyright 2002-2012 the original author or authors.
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
 *  
 */

public class PageNavigatorTag extends TagSupport {

	private static final long serialVersionUID = 1L;

	private String formName = "forms[0]";

	private final String pageFirstImageStyleClass = "btn_first";
	private final String pagePreviousImageStyleClass = "btn_prev";
	private final String pageNextImageStyleClass = "btn_next";
	private final String pageLastImageStyleClass = "btn_last";

	private String linkClass = "linkClass";
	private String render = "all";
	private String linkFragment = "";
	private String linkPopup = "";
	private static final String PARTIAL_RENDERING = "<script type=\"text/javascript\">function {elementId}(){document.{formId}.pageIndex.value={pageIndex};}Spring.addDecoration(new Spring.AjaxEventDecoration({ elementId:\"{elementId}\",event:\"onclick\",formId:\"{formId}\",params:{fragments:\"{dynamicAttrName}\"}, func:{elementId}}));</script>";

	private String firstImg = "";
	private String prevImg = "";
	private String lastImg = "";
	private String nextImg = "";
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

			// 1. define image-button part for moving first page
			if (pages.hasPreviousPageUnit()) {
				generatedCodes = appendCodes(
						generatedCodes,
						getLinkedTag("btnFirst", pageNumScript,
								pages.getPageOfPreviousPageUnit(),
								pageFirstImageStyleClass, "previousPageUnit",
								firstImg));

				generatedCodes = appendCodes(
						generatedCodes,
						checkPartialRendering(
								pages.getPageOfPreviousPageUnit(),
								"previousPageUnit", isPartial)
								+ "</label>");
			} else {
				generatedCodes = appendCodes(
						generatedCodes,
						getUnlinkedTag("btnFirst", pageFirstImageStyleClass,
								"previousPageUnit", firstImg));
			}

			// 2. define image-button part for moving previous page
			if (pages.hasPreviousPage()) {
				generatedCodes = appendCodes(
						generatedCodes,
						getLinkedTag("btnPrev", pageNumScript,
								pages.getPreviousPage(),
								pagePreviousImageStyleClass, "previousPage",
								prevImg));

				generatedCodes = appendCodes(
						generatedCodes,
						checkPartialRendering(pages.getPreviousPage(),
								"previousPage", isPartial) + "</label>");
			} else {
				generatedCodes = appendCodes(
						generatedCodes,
						getUnlinkedTag("btnPrev", pagePreviousImageStyleClass,
								"previousPage", prevImg));
			}

			// 3. define page number part for moving a specific page
			if (pages.isEmptyPage()) {
				generatedCodes = appendCodes(generatedCodes, "<span>1</span>");
			} else {
				for (int i = pages.getBeginUnitPage(); i <= pages
						.getEndListPage(); i++) {
					if (i == pages.getCurrentPage()) {
						generatedCodes = appendCodes(generatedCodes, "<span>"
								+ i + "</span>");
					} else {
						String id = new Integer(i).toString();
						generatedCodes = appendCodes(generatedCodes,
								"<span><a id='page" + id + "' " + "href='"
										+ pageNumScript + id + ";" + linkUrl
										+ "'>");
						generatedCodes = appendCodes(
								generatedCodes,
								i
										+ "</a></span>"
										+ checkPartialRendering(i, "page" + id,
												isPartial));
					}
				}
			}

			// 4. define image-button part for moving next page
			if (pages.hasNextPage()) {
				generatedCodes = appendCodes(
						generatedCodes,
						getLinkedTag("btnNext", pageNumScript,
								pages.getNextPage(), pageNextImageStyleClass,
								"nextPage", nextImg));

				generatedCodes = appendCodes(
						generatedCodes,
						checkPartialRendering(pages.getNextPage(), "nextPage",
								isPartial) + "</label>");
			} else {
				generatedCodes = appendCodes(
						generatedCodes,
						getUnlinkedTag("btnNext", pageNextImageStyleClass,
								"nextPage", nextImg));
			}

			// 5. define image-button part for moving last page
			if (pages.hasNextPageUnit()) {
				generatedCodes = appendCodes(
						generatedCodes,
						getLinkedTag("btnLast", pageNumScript,
								pages.getPageOfNextPageUnit(),
								pageLastImageStyleClass, "nextPageUnit",
								lastImg));

				generatedCodes = appendCodes(
						generatedCodes,
						checkPartialRendering(pages.getPageOfNextPageUnit(),
								"nextPageUnit", isPartial) + "</label>");
			} else {
				generatedCodes = appendCodes(
						generatedCodes,
						getUnlinkedTag("btnLast", pageLastImageStyleClass,
								"nextPageUnit", lastImg));
			}

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
			checkResult = StringUtils.replace(checkResult, "{formId}",
					this.getFormName());
			checkResult = StringUtils.replace(checkResult, "{pageIndex}",
					new Integer(pageIndex).toString());
			checkResult = StringUtils.replace(checkResult, "{dynamicAttrName}",
					getDynamicAttrName());
		}

		return checkResult;
	}

	private String getDynamicAttrName() {
		String dynamicAttrName = "body";
		if (this.render.startsWith("partial:")) {
			dynamicAttrName = this.render.substring(8);
		}
		return dynamicAttrName;
	}

	private boolean isNotEmpty(String str) {
		return !(str == null || str.length() == 0);
	}

	private String getLinkedTag(String id, String pageNumScript,
			int pageIndexValue, String styleClassName, String alt,
			String imagePath) {

		String onClick = pageNumScript + pageIndexValue + ";" + linkUrl;

		return "<label for=\"" + alt + "\">"
				+ getImgTag(id, imagePath, alt, styleClassName, onClick);

	}

	private String getUnlinkedTag(String id, String styleClassName, String alt,
			String imagePath) {
		return "<label for=\"" + alt + "\">"
				+ getImgTag(id, imagePath, alt, styleClassName, "")
				+ "</label>";
	}

	private String getImgTag(String id, String imagePath, String alt,
			String styleClassName, String onClick) {

		String imgTag = "<input type=\"button\" id=\"" + alt + "\" name=\""
				+ id + "\" alt=\"" + alt + "\"";

		if (imagePath.length() > 0) {
			imgTag = imgTag + " src=\"" + imagePath + "\"";
		}
		if (styleClassName.length() > 0) {
			imgTag = imgTag + " class=\"" + styleClassName + "\"";
		}
		if (onClick.length() > 0) {
			imgTag = imgTag + " onclick=\"" + onClick + "\"";
		}
		imgTag = imgTag + "/>";

		return imgTag;
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

	protected String appendCodes(String all, String part) {
		StringBuilder result = new StringBuilder(all.length() + part.length()
				+ 1).append(all).append(part).append("\n");
		return result.toString();
	}
}
