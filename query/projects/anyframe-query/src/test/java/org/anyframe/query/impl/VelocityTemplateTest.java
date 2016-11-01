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
package org.anyframe.query.impl;

import java.io.StringWriter;

import junit.framework.TestCase;

import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.Velocity;

/**
 * TestCase Name : VelocityTemplateTest <br>
 * <br>
 * [Description] : Velocity.evaluate() method is called for and its result is verified. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Dynamic Query statement is defined 
 * and by calling for Velocity.evaluate()method, 
 * modified Query statement is verified. </li>
 * </ul>
 * @author SoYon Lim
 */
public class VelocityTemplateTest extends TestCase {
    /**
     * [Flow #-1] Positive Case : Dynamic Query statement is defined 
     * and by calling for Velocity.evaluate()method, 
     * modified Query statement is verified. 
     * 
     * @throws Exception
     *         throws exception which is from Velocity
     */
    public void testVelocityTemplate() throws Exception {
        // 1. set input arguments
        Object[] args = new Object[] {"A", "B", "C" };

        // 2. set input to velocityContext
        VelocityContext context = new VelocityContext();
        context.put("logonIdList", args);

        // 3. make dynamic query
        StringBuffer strBuffer = new StringBuffer();
        strBuffer.append("SELECT LOGON_ID, NAME ");
        strBuffer.append("FROM TB_USER ");
        strBuffer.append("WHERE LOGON_ID IN ( ");
        strBuffer.append("#foreach ($logonId in $logonIdList) ");
        strBuffer.append("#if ($velocityCount == 1 ) ");
        strBuffer.append("'$logonId' ");
        strBuffer.append("#else ");
        strBuffer.append(", '$logonId' ");
        strBuffer.append("#end ");
        strBuffer.append("#end ");
        strBuffer.append(") ORDER BY NAME");

        String template = strBuffer.toString();

        StringWriter writer = new StringWriter();

        // 4. initialize velocity
        Velocity.init();

        // 5. evaluate dynamic query
        Velocity.evaluate(context, writer, "QueryService", template);

        // 6. assert
        assertEquals(
            "Fail to evaluate query statement.",
            "SELECT LOGON_ID, NAME FROM TB_USER WHERE LOGON_ID IN (   'A'    , 'B'    , 'C'   ) ORDER BY NAME",
            writer.getBuffer().toString());
    }
}
