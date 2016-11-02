/*
 * Copyright 2002-2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.anyframe.simpleweb.beans.support;

import java.beans.FeatureDescriptor;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.el.ELContext;
import javax.el.ELException;
import javax.el.ELResolver;
import javax.el.ExpressionFactory;
import javax.el.PropertyNotFoundException;
import javax.el.PropertyNotWritableException;
import javax.el.ValueExpression;

import org.jboss.el.ExpressionFactoryImpl;
import org.jboss.el.lang.ExpressionBuilder;
import org.jboss.el.parser.Node;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.access.el.SimpleSpringBeanELResolver;
import org.springframework.binding.expression.Expression;
import org.springframework.binding.expression.el.DefaultELContext;
import org.springframework.binding.expression.el.DefaultELResolver;
import org.springframework.binding.expression.el.ELContextFactory;
import org.springframework.binding.expression.el.ELExpression;


/**
 *  This class parses an expression language when a form is submitted in web page.
 *  After that, find spring from bean factory bean and execute the method of the bean.
 *  
 *  @author Changje Kim
 * 
 */
public class ServiceEL {

	Expression expression = null;
	Node node=null;

	public ServiceEL(String expressionStr) {
		ExpressionFactory elFactory = new ExpressionFactoryImpl();
		ContextFactory contextFactory = new ContextFactory();

		ValueExpression valueExpr = elFactory.createValueExpression(
				new DefaultELContext(null, null, null), expressionStr,
				Object.class);

		expression = new ELExpression(contextFactory, valueExpr);
		node = ExpressionBuilder.createNode(expression.getExpressionString());
	}

	public Object execute(Map<String, Object> bindMap) {
		RequestContext context = new RequestContext();

		Set<String> keyset = bindMap.keySet();

		for (String key : keyset) {
			context.put(key, bindMap.get(key));
		}

		return expression.getValue(context);
	}

	public ArrayList<String> getArgList() {
		ArrayList<String> argList = new ArrayList<String>();

		Node argNode=node.jjtGetChild(1);
		for (int i = 0; i < argNode.jjtGetNumChildren(); i++) {
			argList.add(argNode.jjtGetChild(i).getImage());
		}

		return argList;
	}
	
	public String getSerivceMethod() {
		return node.jjtGetChild(0).getImage()+"."+node.jjtGetChild(1).getImage();
	}
	
	public String getBeanName() {
		return node.jjtGetChild(0).getImage();
	}
	
	public String getMethod() {
		return node.jjtGetChild(1).getImage();
	}	
	
	private static class RequestContext {

		private Map<String, Object> map = new HashMap<String, Object>();

		public BeanFactory getBeanFactory() {
			return (BeanFactory) map.get("beanFactory");
		}

		public Object get(String key) {
			return map.get(key);
		}

		public void put(String key, Object value) {
			map.put(key, value);
		}

	}

	private static class BeanELResolver extends ELResolver {

		private RequestContext requestContext;

		public BeanELResolver(Object requestContext) {
			this.requestContext = (RequestContext) requestContext;
		}

		@Override
		public Class<?> getCommonPropertyType(ELContext context, Object base) {
			return Object.class;
		}

		@Override
		public Iterator<FeatureDescriptor> getFeatureDescriptors(
				ELContext context, Object base) {
			return null;
		}

		@Override
		public Class<?> getType(ELContext context, Object base, Object property)
				throws NullPointerException, PropertyNotFoundException,
				ELException {
			return Object.class;
		}

		@Override
		public Object getValue(ELContext context, Object base, Object property)
				throws NullPointerException, PropertyNotFoundException,
				ELException {

			String argName = property.toString();
			Object result = requestContext.get(argName);
			if (result != null)
				context.setPropertyResolved(true);

			return result;
		}

		@Override
		public boolean isReadOnly(ELContext context, Object base,
				Object property) throws NullPointerException,
				PropertyNotFoundException, ELException {
			return false;
		}

		@Override
		public void setValue(ELContext context, Object base, Object property,
				Object value) throws NullPointerException,
				PropertyNotFoundException, PropertyNotWritableException,
				ELException {

		}

	}

	private static class ContextFactory implements ELContextFactory {
		public ELContext getELContext(Object context) {

			List<ELResolver> customResolvers = new ArrayList<ELResolver>();

			if (context instanceof RequestContext) {
				customResolvers.add(new SimpleSpringBeanELResolver(
						((RequestContext) context).getBeanFactory()));
				customResolvers.add(new BeanELResolver(context));
			}

			ELResolver resolver = new DefaultELResolver(null, customResolvers);

			return new DefaultELContext(resolver, null, null);
		}
	}

}
