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
package anyframe.sample.aop.sales.dao.impl;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import org.springframework.stereotype.Repository;
import org.springframework.util.ClassUtils;

import anyframe.common.Page;
import anyframe.common.util.StringUtil;
import anyframe.core.generic.dao.query.GenericDaoQuery;
import anyframe.core.query.IQueryService;
import anyframe.sample.aop.sales.dao.ProductDao;
import anyframe.sample.aop.sales.service.ProductSearchVO;
import anyframe.sample.domain.Product;

@Repository("productDao")
public class ProductDaoImpl extends GenericDaoQuery<Product, String> implements ProductDao {

	@Resource
	IQueryService queryService;
	
    public ProductDaoImpl() {
        super(Product.class);
    }
    
    @PostConstruct
    public void initialize(){
    	super.setQueryService(queryService);
    }
    
	public Page getPagingList(ProductSearchVO searchVO) throws Exception {
        int pageIndex = searchVO.getPageIndex();
        int pageSize = 5;
        int pageUnit = 5;
        
		Product product = new Product();
		String searchKeyword = StringUtil.null2str(searchVO.getSearchKeyword());		
		product.setProdName("%"+searchKeyword+"%");
		String asYn = searchVO.getSearchAsYn();
		product.setAsYn(asYn);        
        
        return this.findListWithPaging(ClassUtils.getShortName(getPersistentClass()), product, pageIndex, pageSize, pageUnit);
	}  
}
