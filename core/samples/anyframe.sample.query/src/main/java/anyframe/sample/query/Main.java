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
package anyframe.sample.query;

import org.springframework.context.support.ClassPathXmlApplicationContext;

import anyframe.common.Page;
import anyframe.sample.domain.Category;
import anyframe.sample.domain.Product;
import anyframe.sample.query.sales.service.CategoryService;
import anyframe.sample.query.sales.service.ProductSearchVO;
import anyframe.sample.query.sales.service.ProductService;

/**
 * QueryService가 제공하는 기능을 테스트하기 위한 샘플 코드
 * 
 * [how to execute this class in maven] mvn exec:java
 * -Dexec.mainClass=anyframe.sample.query.Main
 */
public class Main {
	protected ClassPathXmlApplicationContext context;

	/**
	 * initializing
	 */
	protected void setup() {
		String[] locations = new String[] { "classpath:spring/context-*.xml" };
		context = new ClassPathXmlApplicationContext(locations, false);
		context.refresh();
	}

	/**
	 * detroying
	 */
	protected void teardown() {
		context.close();
	}

	/**
	 * 테스트 수행을 위한 main
	 */
	public static void main(String[] args) throws Exception {
		Main main = new Main();

		// 1. initialize context
		main.setup();
		// 2. test
		main.manageProduct();
		// 3. close context
		main.teardown();
	}

	public void manageProduct() throws Exception {
		// 1. lookup productService, categoryService
		ProductService productService = (ProductService) context
				.getBean("productService");
		CategoryService categoryService = (CategoryService) context
				.getBean("categoryService");

		// 2. create a new product
		Category category = categoryService.get("CATEGORY-00004");
		Product product = new Product();
		product.setProdName("sample.sportsone");
		product.setCategory(category);
		product.setProdDetail("sports one detail");
		product.setSellerId("woos41");
		product.setAsYn("Y");
		product.setManufactureDay("20081225");
		product.setSellAmount(new Long(50));
		product.setSellQuantity(new Long(50));
		productService.create(product);

		// 3. get product list
		ProductSearchVO searchVO = new ProductSearchVO();
		searchVO.setSearchCondition("0");
		searchVO.setSearchKeyword("sample.sportsone");
		Page products = productService.getPagingList(searchVO);
		System.out.println("after creating a new product, product size is a '"
				+ products.getSize() + "'.");

		// 4. update a product
		product.setProdName("sportsone-update");
		product.setProdDetail("sports one detail-update");
		productService.update(product);

		// 5. get a product
		Product result = productService.get(product.getProdNo());
		System.out.println("after updating a product, product name is a '"
				+ result.getProdName() + "'.");

		// 6. remove a product
		productService.remove(product.getProdNo());

		// 7. get product list
		searchVO = new ProductSearchVO();
		searchVO.setSearchCondition("0");
		searchVO.setSearchKeyword("sample.sportsone");
		products = productService.getPagingList(searchVO);
		System.out.println("after removing a new product, product size is a '"
				+ products.getSize() + "'.");
	}
}
