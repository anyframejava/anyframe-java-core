/*
 * Copyright 2008-2012 the original author or authors.
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
package org.anyframe.transaction.hibernate;

import org.anyframe.transaction.AbstractTransactionServiceTest;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * This class is hibernate transaction test class.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
// TODO : set JVM arguments.
// -Djavax.xml.parsers.DocumentBuilderFactory=com.sun.org.apache.xerces.internal.jaxp.DocumentBuilderFactoryImpl
// -Djavax.xml.parsers.SAXParserFactory=com.sun.org.apache.xerces.internal.jaxp.SAXParserFactoryImpl
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
		"classpath:spring/integration/common/context-message.xml",
		"classpath:spring/integration/common/context-transaction.xml",
		"classpath:spring/integration/hibernate/context-transaction.xml",
		"classpath:spring/integration/hibernate/context-hibernate.xml" })
public class TransactionServiceTest extends AbstractTransactionServiceTest {

}
