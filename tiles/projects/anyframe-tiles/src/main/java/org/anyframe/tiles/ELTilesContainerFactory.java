/* Copyright 2002-2012 the original author or authors.
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
package org.anyframe.tiles;

import java.io.IOException;
import java.net.URL;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

import org.apache.tiles.TilesApplicationContext;
import org.apache.tiles.TilesContainer;
import org.apache.tiles.context.TilesRequestContextFactory;
import org.apache.tiles.definition.DefinitionsFactoryException;
import org.apache.tiles.el.ELAttributeEvaluator;
import org.apache.tiles.evaluator.AttributeEvaluatorFactory;
import org.apache.tiles.evaluator.BasicAttributeEvaluatorFactory;
import org.apache.tiles.factory.BasicTilesContainerFactory;
import org.apache.tiles.impl.BasicTilesContainer;
import org.apache.tiles.locale.LocaleResolver;


/**
 * It is factory to support Tiles EL with Spring 3.0. 
 * 
 * @author Changje Kim
 */
public class ELTilesContainerFactory extends BasicTilesContainerFactory {
    private final String[] definitions; 

    public ELTilesContainerFactory(String[] definitions) {
        this.definitions = definitions;
    }

    @Override
    protected BasicTilesContainer instantiateContainer(
            TilesApplicationContext context) {
        return new ELTilesContainer();
    }

    @Override
    protected List<URL> getSourceURLs(
            TilesApplicationContext applicationContext,
            TilesRequestContextFactory contextFactory) {

        try {
            List<URL> result = new LinkedList<URL>();
            for (String definition : definitions) {
                result.addAll(applicationContext.getResources(definition));
            }
            return result;
        } catch (IOException ex) {
            throw new DefinitionsFactoryException(
                    "Cannot load definition URLs", ex);
        }
    }
    
    /** {@inheritDoc} */      
    private AttributeEvaluatorFactory createAttributeEvaluatorFactory(
            TilesApplicationContext applicationContext,
            TilesRequestContextFactory contextFactory, LocaleResolver resolver,BasicTilesContainer container) {
        ELAttributeEvaluator evaluator = new ELAttributeEvaluator();
        evaluator.setApplicationContext(container.getApplicationContext());
        evaluator.init(new HashMap<String, String>());
               
        return new BasicAttributeEvaluatorFactory(evaluator);
    }

    /** {@inheritDoc} */
    @Override
    public TilesContainer createContainer(
            TilesApplicationContext applicationContext) {
        BasicTilesContainer container = instantiateContainer(applicationContext);
        TilesRequestContextFactory requestContextFactory = createRequestContextFactory(applicationContext);
        container.setRequestContextFactory(requestContextFactory);
        container.setApplicationContext(applicationContext);
        LocaleResolver resolver = createLocaleResolver(applicationContext,
                requestContextFactory);
        container.setDefinitionsFactory(createDefinitionsFactory(
                applicationContext, requestContextFactory, resolver));
        AttributeEvaluatorFactory attributeEvaluatorFactory = createAttributeEvaluatorFactory(
                applicationContext, requestContextFactory, resolver, container);
        container.setAttributeEvaluatorFactory(attributeEvaluatorFactory);
        container.setPreparerFactory(createPreparerFactory(applicationContext,
                requestContextFactory));
        container.setRendererFactory(createRendererFactory(applicationContext,
                requestContextFactory, container, attributeEvaluatorFactory));
        return container;
    }

}
