package org.anyframe.plugin;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@SpringBootApplication
@PropertySource("classpath:context.properties")
@ImportResource({"classpath:spring/context-jdbc-support.xml", "classpath:spring/context-security.xml"})
public class AnyframeMobileApplication {

	public static void main(String[] args) {
		SpringApplication.run(AnyframeMobileApplication.class, args);
	}

}
