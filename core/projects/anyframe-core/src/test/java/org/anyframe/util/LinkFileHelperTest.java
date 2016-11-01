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
package org.anyframe.util;

import java.io.File;

import junit.framework.TestCase;

import org.anyframe.util.file.LinkFileHelper;

/**
 * For testing functions what LinkFileHelper supports, there are some test
 * scenarios in this TestCase.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class LinkFileHelperTest extends TestCase {
	public void testLinkMethod1() {
		LinkFileHelper.processingLinkDirectory(
				new File("./non_exist_file.txt"),
				new LinkFileHelper.LinkLineItemHandler() {
					public boolean processItem(String itemString) {
						throw new RuntimeException();
					}
				});
	}

	public void testLinkMethod2() {
		LinkFileHelper.processingLinkDirectory(new File("./pom.xml"),
				new LinkFileHelper.LinkLineItemHandler() {
					public boolean processItem(String itemString) {
						throw new RuntimeException();
					}
				});
	}

}
