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
package anyframe.sample.annotation.sales.service.impl;

import java.util.Locale;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import anyframe.common.Page;
import anyframe.core.generic.service.impl.GenericServiceImpl;
import anyframe.sample.annotation.common.SalesException;
import anyframe.sample.annotation.sales.dao.ProductDao;
import anyframe.sample.annotation.sales.service.ProductSearchVO;
import anyframe.sample.annotation.sales.service.ProductService;
import anyframe.sample.domain.Product;

@Service("productService")
public class ProductServiceImpl extends GenericServiceImpl<Product, String>
		implements ProductService {

	@Resource
	MessageSource messageSource;
	@Resource
	ProductDao productDao;

	@PostConstruct
	public void initialize() {
		super.setGenericDao(productDao);
	}

	public Page getPagingList(ProductSearchVO searchVO) throws Exception {
		return this.productDao.getPagingList(searchVO);
	}

	public Map<String, Object> getProductWithMap(String prodNo)
			throws Exception {
		Map<String, Object> resultMap = this.productDao
				.getProductWithMap(prodNo);

		if (resultMap == null) {
			throw new SalesException(messageSource.getMessage(
					"error.pruductserviceimpl.findproduct.notexist",
					new String[] {}, Locale.getDefault()), null);

		}
		return resultMap;
	}

}
