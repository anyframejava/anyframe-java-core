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
package anyframe.sample.transaction;

import org.springframework.context.support.ClassPathXmlApplicationContext;

import anyframe.sample.domain.Product;
import anyframe.sample.transaction.sales.service.ProductService;

/**
 * TransactionService가 제공하는 기능을 테스트하기 위한 샘플 코드
 * 
 * [how to execute this class in maven] mvn exec:java
 * -Dexec.mainClass=anyframe.sample.transaction.Main
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
		// 1. lookup categoryService
		ProductService service = (ProductService) context
				.getBean("productService");

		// 2. create a new product
		Product product = new Product();
		product.setProdName("sample");
		service.create(product);

		// 3. get a product
		Product result = (Product) service.get(product.getProdNo());
		System.out.println("The product name is a '" + result.getProdName()
				+ "'.");
	}
}
