package org.anyframe.plugin.jquery.categoryfinder.service.impl;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.jquery.categoryfinder.service.CategoryFinder;
import org.anyframe.plugin.jquery.categoryfinder.domain.CategorySearchVO;
import org.anyframe.plugin.jquery.categoryfinder.domain.Category;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import javax.inject.Named;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Jeongeun Lee
 * Date: 13. 7. 30
 * Time: 오후 7:31
 * To change this template use File | Settings | File Templates.
 */

@Service("jqueryCategoryFinder")
public class CategoryFinderImpl implements CategoryFinder {

    @Inject
    @Named("jqueryCategoryDao")
    private CategoryDao  categoryDao;

    public List<Category> list(CategorySearchVO search) throws Exception {
        return categoryDao.list(search);
    }

    public Page getPagingList(CategorySearchVO search) throws Exception {
        return categoryDao.getPagingList(search);
    }
}
