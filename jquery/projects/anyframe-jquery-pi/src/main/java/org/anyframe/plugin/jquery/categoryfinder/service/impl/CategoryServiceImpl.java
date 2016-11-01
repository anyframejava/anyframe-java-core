package org.anyframe.plugin.jquery.categoryfinder.service.impl;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.jquery.categoryfinder.domain.Category;
import org.anyframe.plugin.jquery.categoryfinder.service.CategoryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created with IntelliJ IDEA.
 * User: Jeongeun Lee
 * Date: 13. 7. 25
 * Time: 오후 3:23
 * To change this template use File | Settings | File Templates.
 */

@Service("jqueryCategoryService")
@Transactional(rollbackFor = { Exception.class })
public class CategoryServiceImpl implements CategoryService {

    @Inject
    @Named("jqueryCategoryDao")
    private CategoryDao categoryDao;

    public void create(Category category) throws Exception {
        categoryDao.create(category);
    }

    public void remove(String categoryId) throws Exception {
        categoryDao.remove(categoryId);
    }

    public void update(Category category) throws Exception {
        categoryDao.update(category);
    }


}
