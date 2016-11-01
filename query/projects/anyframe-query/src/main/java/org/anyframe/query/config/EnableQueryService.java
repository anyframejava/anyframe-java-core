/* 
 * Copyright (C) 2010 Robert Stewart (robert@wombatnation.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
package org.anyframe.query.config;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

import org.springframework.context.annotation.Import;

/**
 * annotation interface for java configuration of anyframe query service 
 *
 * @author jaehyoung.eum
 * @since 1.1.3
 */
@Retention(RetentionPolicy.RUNTIME)
@Import(QueryServiceBeanDefinitionRegistry.class)
public @interface EnableQueryService {
	String dbType();
	String dataSourceRef() default QueryServiceConstant.DEFAULT_DATA_SOURCE_NAME;
	String jdbcTemplateRef() default QueryServiceConstant.DEFAULT_JDBC_TEMPLATE_NAME;
	String sqlLoaderRef() default QueryServiceConstant.DEFAULT_SQL_LOADER_NAME;
	String id() default QueryServiceConstant.DEFAULT_QUERY_SERVICE_ID;
}
