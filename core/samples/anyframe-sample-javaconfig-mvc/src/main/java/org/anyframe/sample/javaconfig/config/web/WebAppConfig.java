package org.anyframe.sample.javaconfig.config.web;

import java.util.Locale;

import org.anyframe.spring.config.EnableWebMvcAnyframe;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Description;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

@Configuration
@EnableWebMvcAnyframe(synchronizeOnSession="true")
@ComponentScan(basePackages = "org.anyframe.sample.javaconfig.moviefinder", useDefaultFilters = false, includeFilters = { @ComponentScan.Filter(Controller.class) })
public class WebAppConfig {

	private static final String VIEW_RESOLVER_PREFIX = "/WEB-INF/jsp/";
	private static final String VIEW_RESOLVER_SUFFIX = ".jsp";
	private static final String DEFAULT_ERROR_VIEW = "forward:/sample/common/error.jsp";
	private static final String WARN_LOG_CATEGORY = "controller.logs";

	@Bean
	@Description("Provides viewResolver bean")
	public ViewResolver viewResolver() {
		InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();

		viewResolver.setViewClass(JstlView.class);
		viewResolver.setPrefix(VIEW_RESOLVER_PREFIX);
		viewResolver.setSuffix(VIEW_RESOLVER_SUFFIX);

		return viewResolver;
	}

	@Bean
	@Description("Provides exceptionResolver bean")
	public HandlerExceptionResolver exceptionResolver() {
		SimpleMappingExceptionResolver exceptionResolver = new SimpleMappingExceptionResolver();
		exceptionResolver.setDefaultErrorView(DEFAULT_ERROR_VIEW);
		exceptionResolver.setWarnLogCategory(WARN_LOG_CATEGORY);

		return exceptionResolver;
	}

	@Bean
	@Description("Provides localeResolver bean")
	public LocaleResolver localeResolver() {
		SessionLocaleResolver localeResolver = new SessionLocaleResolver();
		localeResolver.setDefaultLocale(new Locale("en_US"));
		return localeResolver;
	}

}
