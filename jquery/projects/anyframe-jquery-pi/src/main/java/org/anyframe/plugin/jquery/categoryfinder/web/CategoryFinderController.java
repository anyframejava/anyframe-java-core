package org.anyframe.plugin.jquery.categoryfinder.web;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.jquery.categoryfinder.service.CategoryFinder;
import org.anyframe.plugin.jquery.categoryfinder.domain.CategorySearchVO;
import org.anyframe.plugin.jquery.categoryfinder.domain.Category;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;



/**
 * Created with IntelliJ IDEA.
 * User: Jeongeun Lee
 * Date: 13. 7. 30
 * Time: 오후 8:04
 * To change this template use File | Settings | File Templates.
 */
@Controller("jqueryCategoryFinderController")
@RequestMapping("/jqueryCategoryFinder.do")
public class CategoryFinderController {

    @Inject
    @Named("jqueryCategoryFinder")
    private CategoryFinder categoryFinder;


    @RequestMapping(params = "method=listView")
    public String listView(CategorySearchVO search, Category category, Model model) throws Exception {
        model.addAttribute("search", search);
        model.addAttribute("category", category);
        return "jquery/categoryfinder/category/list";
    }

    @RequestMapping(params = "method=list")
    public String list(CategorySearchVO search, Model model) throws Exception {

        Page resultPage = categoryFinder.getPagingList(search);

        model.addAttribute("page", String.valueOf(resultPage.getCurrentPage()));
        model.addAttribute("total", String.valueOf(resultPage.getMaxPage()));
        model.addAttribute("records", String.valueOf(resultPage.getTotalCount()));
        model.addAttribute("rows", resultPage.getList());
        return "jsonView";
    }

}
