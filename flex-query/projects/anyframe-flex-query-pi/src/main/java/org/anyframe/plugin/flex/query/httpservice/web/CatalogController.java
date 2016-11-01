package org.anyframe.plugin.flex.query.httpservice.web;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.flex.query.httpservice.service.CatalogService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller("catalogController")
@RequestMapping("/catalog.do")
public class CatalogController {

	
	@Inject
	@Named("catalogService")
	private CatalogService catalogService;
	
	@RequestMapping(params = "method=getProduct")
	public String getProduct(Model model)throws Exception{
		List resultList = catalogService.getProduct();
		model.addAttribute("productList", resultList);
		return "flex/httpservice/catalog";
	}
}
