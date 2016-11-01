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

import java.io.File;

import org.anyframe.query.QueryService;
import org.apache.avalon.framework.configuration.Configuration;
import org.apache.avalon.framework.configuration.DefaultConfigurationBuilder;
import org.apache.avalon.framework.configuration.DefaultConfigurationSerializer;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;


/**
 * TestCase Name : QueryServiceDynamicReloadTest <br>
 * <br>
 * [Description] : Dynamic Reload 기능을 점검한다. Dynamic
 * Reload를 위해서는 다음과 같은 형태로 SQLLoader의 속성을 정의해야 한다.<br>
 * 
 * <pre>
 * &lt;sqlload dynamic=&quot;true&quot; frequency=&quot;5&quot; /&gt;
 * </pre>
 * 
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : QueryService의 Dynamic
 * Reload 기능을 이용하여 매핑 XML 파일이 변경되었을 경우 정의된 주기에 의해 변경된
 * 내용이 반영되는지 검증한다.</li>
 * </ul>
 * @author SoYon Lim
 */
public class QueryServiceDynamicReloadTest extends
        AbstractDependencyInjectionSpringContextTests {
    private QueryService queryService = null;

    public void setQueryService(QueryService queryService) {
        this.queryService = queryService;
    }

    protected String[] getConfigLocations() {
        setAutowireMode(AbstractDependencyInjectionSpringContextTests.AUTOWIRE_BY_NAME);
        return new String[] {"classpath*:/spring/context-*.xml" };
    }

    /**
     * [Flow #-1] Positive Case : QueryService의 Dynamic
     * Reload 기능을 이용하여 매핑 XML 파일이 변경되었을 경우 정의된 주기에 의해
     * 변경된 내용이 반영되는지 검증한다.
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testDynamicReload() throws Exception {
//        dynamicReload();
    }

    /**
     * 미리 정의된 testcase-queries-update.xml 파일의 내용을
     * testcase-queries-dynamicreload.xml 파일에 복사하고,
     * QueryService에 의해 Dynamic Reload가 성공적으로 수행되는지
     * 검증한다.
     * @throws Exception
     *         fail to dynamic reload
     */
    private void dynamicReload() throws Exception {
        // 1. set data
        File targetFile =
            new File("./testdynamicreload/testcase-queries-dynamicreload.xml");
        File updatedFile =
            new File("./testdynamicreload/testcase-queries-update.xml");

        // 2. get query statement from original xml
        // file
        String query = queryService.getStatement("dynamicReload");

        // 3. change contents of original file
        changeFileContent(updatedFile, targetFile);

        // 4. wait for dynamic reloading
        Thread.sleep(10000);

        // 5. get query statement from changed xml file
        String changedQuery = queryService.getStatement("dynamicReload");

        // 6. assert
        assertTrue("Fail to change xml contents", changedQuery.toString()
            .startsWith(
                "insert into TB_UPDATED_DYNAMIC_RELOAD(col1, col2, col3)"));

        assertNotSame("Fail to change query information.", query.toString(),
            changedQuery.toString());
    }

    /**
     * source 파일의 내용을 destination 파일에 복사한다.
     * @param source
     *        수정 파일
     * @param destination
     *        원본 파일
     * @throws Exception
     *         fail to change file contents.
     */
    private void changeFileContent(File source, File destination)
            throws Exception {

        DefaultConfigurationBuilder builder = new DefaultConfigurationBuilder();
        Configuration config = builder.buildFromFile(source);

        DefaultConfigurationSerializer serializer =
            new DefaultConfigurationSerializer();
        serializer.serializeToFile(destination, config);
    }
}
