package org.anyframe.plugin.jquery.categoryfinder.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.jquery.categoryfinder.domain.CategorySearchVO;
import org.anyframe.query.QueryService;
import org.anyframe.query.dao.QueryServiceDaoSupport;
import org.anyframe.plugin.jquery.categoryfinder.domain.Category;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

/**
 * Created with IntelliJ IDEA.
 * User: Jeongeun Lee
 * Date: 13. 7. 25
 * Time: 오후 3:24
 * To change this template use File | Settings | File Templates.
 */

@Repository("jqueryCategoryDao")
public class CategoryDao extends QueryServiceDaoSupport {

    @Value("#{contextProperties['pageSize'] ?: 5}")
    int pageSize;

    @Value("#{contextProperties['pageUnit'] ?: 5}")
    int pageUnit;

    @Inject
    public void setQueryService(QueryService queryService) {
        super.setQueryService(queryService);
    }

    public List<Category> list(CategorySearchVO search) throws Exception {
        return super.findList("findJqueryCategoryList", search);
    }

    public void create(Category category) throws Exception {
        super.create("createJqueryCategory", category);
    }

    public void remove(String categoryId) {
        Category category = new Category();
        category.setCategoryId(categoryId);
        super.remove("removeJqueryCategory", category);
    }

    public void update(Category category) {
        super.update("updateJqueryCategory", category);
    }

    public Page getPagingList(CategorySearchVO search) {
        return super.findListWithPaging("findJqueryCategoryList", search, search.getPage(), pageSize, pageUnit);
    }
}
