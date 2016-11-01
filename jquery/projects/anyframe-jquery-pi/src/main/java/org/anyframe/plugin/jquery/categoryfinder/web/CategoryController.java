package org.anyframe.plugin.jquery.categoryfinder.web;

import org.anyframe.plugin.jquery.categoryfinder.domain.Category;
import org.anyframe.plugin.jquery.categoryfinder.service.CategoryService;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;

import javax.inject.Inject;
import javax.inject.Named;


/**
 * Created with IntelliJ IDEA.
 * User: Jeongeun Lee
 * Date: 13. 7. 25
 * Time: 오후 4:40
 * To change this template use File | Settings | File Templates.
 */

@Controller("jqueryCategoryController")
@RequestMapping("/jqueryCategory.do")
public class CategoryController {

    @Inject
    @Named("jqueryCategoryService")
    private CategoryService categoryService;

    @RequestMapping(params = "method=create")
    public String create(Category category) throws Exception {
        categoryService.create(category);
        return "jsonView";
    }

    @RequestMapping(params = "method=remove")
    public String remove(String categoryId) throws Exception {
        categoryService.remove(categoryId);
        return "jsonView";
    }

    @RequestMapping(params = "method=update")
    public String update(Category category) throws Exception {
        categoryService.update(category);
        return "jsonView";
    }
}
