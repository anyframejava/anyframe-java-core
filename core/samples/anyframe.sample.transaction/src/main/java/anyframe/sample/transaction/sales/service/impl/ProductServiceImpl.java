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
package anyframe.sample.transaction.sales.service.impl;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import anyframe.common.Page;
import anyframe.core.generic.dao.GenericDao;
import anyframe.core.generic.service.impl.GenericServiceImpl;
import anyframe.core.idgen.IIdGenerationService;
import anyframe.sample.domain.Product;
import anyframe.sample.transaction.sales.service.ProductSearchVO;
import anyframe.sample.transaction.sales.service.ProductService;

@Service("productService")
@Transactional
public class ProductServiceImpl extends GenericServiceImpl<Product, String>
		implements ProductService {
	@Resource
	IIdGenerationService idGenerationService;
	@Resource
	GenericDao productDao;
	
	@PostConstruct
	public void initialize() {
		super.setGenericDao(productDao);
	}

	public Page getPagingList(ProductSearchVO searchVO) throws Exception {
		return this.productDao.getPagingList(searchVO);
	}

	public void create(Product product) throws Exception {
		product.setProdNo(idGenerationService.getNextStringId());
		productDao.create(product);
	}
}