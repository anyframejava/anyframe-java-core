package org.anyframe.plugin.jquery.categoryfinder.service;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.jquery.categoryfinder.domain.Category;
import org.anyframe.plugin.jquery.categoryfinder.domain.CategorySearchVO;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Jeongeun Lee
 * Date: 13. 7. 30
 * Time: 오후 7:31
 * To change this template use File | Settings | File Templates.
 */
public interface CategoryFinder {

    List<Category> list(CategorySearchVO search) throws Exception;

    Page getPagingList(CategorySearchVO search) throws Exception;

}