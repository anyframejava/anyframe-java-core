/*
 * Copyright 2002-2008 the original author or authors.
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

/**
 * @author SoYon Lim
 * @author JongHoon Kim
 */
// TODO : set JVM arguments.
// -Djavax.xml.parsers.DocumentBuilderFactory=com.sun.org.apache.xerces.internal.jaxp.DocumentBuilderFactoryImpl
// -Djavax.xml.parsers.SAXParserFactory=com.sun.org.apache.xerces.internal.jaxp.SAXParserFactoryImpl
public class TransactionServiceTest extends AbstractTransactionServiceTest {
    protected String[] getConfigLocations() {
        return new String[] {
            "META-INF/spring/integration/common/context-common.xml",
            "META-INF/spring/integration/common/context-query.xml",
            "META-INF/spring/integration/common/context-query-sqlloader.xml",
            "META-INF/spring/integration/common/context-tx-sample.xml",
            "META-INF/spring/integration/hibernate/context-tx.xml",
            "META-INF/spring/integration/hibernate/context-tx-sessionfactory.xml",
            "META-INF/spring/integration/hibernate/context-tx-datasource.xml" };
    }

}
