//package org.anyframe.plugin;
//
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//
//import org.anyframe.jdbc.support.aspect.JdbcAspect;
//import org.anyframe.jdbc.support.impl.DefaultCompleteQueryPostProcessor;
//import org.anyframe.jdbc.support.impl.DefaultInjectionPatternPostProcessor;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//
//@Configuration
//class SqlLoggingConfig{
//    
//    @Bean
//    public DefaultInjectionPatternPostProcessor injectionPatternPostProcessor() throws Exception {
//    	DefaultInjectionPatternPostProcessor injectionPatternPostProcessor = new DefaultInjectionPatternPostProcessor();
//    	List<String> warningPatterns = new ArrayList<>();
//    	warningPatterns.set(0, "-{2,}");
//    	//warningPatterns.set(1, "'?1'?\s*=\s*'?1'?");
//    	injectionPatternPostProcessor.setWarningPatterns(warningPatterns);
//    	HashMap<String, String> replacePatterns = new HashMap<String, String>();
//    	replacePatterns.put(";", "");
//    	replacePatterns.put("-{2,}", "-" );
//    	//replacePatterns.put("(?:or|OR)\s+'?1'?\s*=\s*'?1'?", "")
//    	injectionPatternPostProcessor.setReplacePatterns(replacePatterns);
//		return injectionPatternPostProcessor;
//       
//    }
//    
//    @Bean
//    public DefaultCompleteQueryPostProcessor completeQueryPostProcessor() throws Exception {
//    	DefaultCompleteQueryPostProcessor completeQueryPostProcessor = new DefaultCompleteQueryPostProcessor();
//		return completeQueryPostProcessor;
//    	
//    }
//    
//    @Bean
//    public JdbcAspect jdbcAspect() throws Exception {
//    	JdbcAspect jdbcAspect = new JdbcAspect();
//    	jdbcAspect.setInjectionPatternPostProcessor(injectionPatternPostProcessor());
//    	jdbcAspect.setCompleteQueryPostProcessor(completeQueryPostProcessor());
//		return jdbcAspect;
//    	
//    }
//    
//}