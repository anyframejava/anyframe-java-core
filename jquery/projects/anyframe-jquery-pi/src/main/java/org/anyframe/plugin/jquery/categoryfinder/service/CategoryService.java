package org.anyframe.plugin.jquery.categoryfinder.service;

import org.anyframe.plugin.jquery.categoryfinder.domain.Category;

/**
 * Created with IntelliJ IDEA.
 * User: Jeongeun Lee
 * Date: 13. 7. 25
 * Time: 오후 3:14
 * To change this template use File | Settings | File Templates.
 */
public interface CategoryService {

    void create(Category category) throws Exception;
    void remove(String categoryId) throws Exception;
    void update(Category category) throws Exception;

}
