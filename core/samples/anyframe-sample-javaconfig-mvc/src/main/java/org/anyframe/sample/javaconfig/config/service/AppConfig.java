package org.anyframe.sample.javaconfig.config.service;

import javax.sql.DataSource;

import org.anyframe.query.config.EnableQueryService;
import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.PropertiesFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Description;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * configuration class for business and persistence layer
 *
 * @author jaehyoung.eum
 *
 */
@Configuration
@EnableAspectJAutoProxy
@EnableTransactionManagement
@EnableQueryService(dbType="hsqldb")
@ComponentScan(basePackages = "org.anyframe.sample.javaconfig.moviefinder", useDefaultFilters = false, includeFilters = {
		@ComponentScan.Filter(Service.class),
		@ComponentScan.Filter(Repository.class) })
public class AppConfig {

	private @Value("#{contextProperties['driver']}") String driver;
	private @Value("#{contextProperties['url']}") String url;
	private @Value("#{contextProperties['username']}") String username;
	private @Value("#{contextProperties['password']}") String password;
	
	@Bean
	@Description("Provides Context Properties bean with context.properties file")
	public PropertiesFactoryBean contextProperties() {
		PropertiesFactoryBean contextProperties = new PropertiesFactoryBean();
		contextProperties.setLocation(new ClassPathResource("context.properties"));
		return contextProperties;
	}
	
	@Bean
	@Description("Provides dataSource Bean")
	public DataSource dataSource() {
		BasicDataSource dataSource = new BasicDataSource();
		dataSource.setDriverClassName(driver);
		dataSource.setUrl(url);
		dataSource.setUsername(username);
		dataSource.setPassword(password);
		return dataSource;
	}

	@Bean
	@Description("PRovides transactionManager bean with dataSource bean")
	public PlatformTransactionManager transactionManager() {
		return new DataSourceTransactionManager(dataSource());
	}
	
}
