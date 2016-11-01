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
package anyframe.sample.cache;

import java.util.Map;

import org.springframework.context.support.ClassPathXmlApplicationContext;

import anyframe.sample.cache.sales.service.CategoryService;
import anyframe.sample.domain.Category;

/**
 * DefaultCacheService를 이용하여 구현된 CategoryService의 기능을 테스트하기 위한 샘플 코드
 * 
 * [how to execute this class in maven] mvn exec:java
 * -Dexec.mainClass=anyframe.sample.cache.Main
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
		main.manageCategory();
		// 3. close context
		main.teardown();
	}

	public void manageCategory() throws Exception {
		// 1. lookup categoryService
		CategoryService service = (CategoryService) context
				.getBean("categoryService");

		// 2. get category list
		Map categories = service.getList();
		System.out.println("before inserting, the size of category is "
				+ categories.size());

		// 3. create a new category
		Category category = new Category();
		category.setCategoryNo("CATEGORY-****1");
		category.setCategoryName("sample");
		service.create(category);

		// 4. get category list
		categories = service.getList();
		System.out.println("after inserting, the size of category is "
				+ categories.size());

		// 5. remove a category
		service.remove("CATEGORY-****1");

		// 6. get category list
		categories = service.getList();
		System.out.println("after removing ,the size of category is "
				+ categories.size());
	}
}
