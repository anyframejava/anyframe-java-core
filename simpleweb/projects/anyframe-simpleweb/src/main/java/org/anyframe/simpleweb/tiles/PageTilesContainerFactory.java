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
package org.anyframe.simpleweb.tiles;

import org.apache.tiles.TilesContainer;
import org.apache.tiles.TilesException;
import org.apache.tiles.factory.TilesContainerFactory;


/**
 *  This factory class extended TilesContainerFactory to use PageTilesContainer, which get 
 *  the value of tiles attribute from HttpRequest.
 *  
 *  @author Changje Kim
 */

public class PageTilesContainerFactory extends TilesContainerFactory {

	 /** {@inheritDoc} */
	public TilesContainer createTilesContainer(Object context)
			throws TilesException {
		PageTilesContainer container = new PageTilesContainer();
		initializeContainer(context, container);
		
		return container;
	}
	
}
