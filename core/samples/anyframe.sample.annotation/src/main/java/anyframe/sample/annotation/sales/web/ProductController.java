/*
 * Copyright 2002-2009 the original author or authors.
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
package anyframe.sample.annotation.sales.web;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.displaytag.tags.TableTagParameters;
import org.displaytag.util.ParamEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import anyframe.common.Page;
import anyframe.common.util.StringUtil;
import anyframe.sample.annotation.sales.service.ProductSearchVO;
import anyframe.sample.annotation.sales.service.ProductService;
import anyframe.sample.domain.Product;

@Controller
public class ProductController {
	
	@Resource
	private ProductService productService;
	
	/**
	 * get a product detail.
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/getProduct.do")
	public ModelAndView get(@RequestParam("prodNo") String prodNo) throws Exception {
		
		ModelAndView mnv = new ModelAndView("/WEB-INF/jsp/annotation/sales/product/viewProduct.jsp");

		if (!StringUtils.isBlank(prodNo)) {
			Product gettedProduct = null;
			gettedProduct = productService.get(prodNo);
			gettedProduct.setImageFile("/upload/" + gettedProduct.getImageFile());
			mnv.addObject("product", gettedProduct);
		}

		return mnv;
	}

	/**
	 * display product list
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/listProduct.do")
	public ModelAndView list(HttpServletRequest request,
			ProductSearchVO searchVO) throws Exception {
		ModelAndView mnv = new ModelAndView("/WEB-INF/jsp/annotation/sales/product/listProduct.jsp");

		String pageParam = (new ParamEncoder("productList")
				.encodeParameterName(TableTagParameters.PARAMETER_PAGE));
		String pageParamValue = request.getParameter(pageParam);
		int pageIndex = StringUtil.isNotEmpty(pageParamValue) ? (Integer
				.parseInt(pageParamValue)) : 1;
		searchVO.setPageIndex(pageIndex);

		Page resultPage = productService.getPagingList(searchVO);
		
		mnv.addObject("search", searchVO);
		mnv.addObject("productList", resultPage.getList());
		mnv.addObject("size", resultPage.getTotalCount());
		mnv.addObject("pagesize", resultPage.getPagesize());
		mnv.addObject("pageunit", resultPage.getPageunit());

		return mnv;
	}
}
