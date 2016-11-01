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
package org.anyframe.remoting;

import org.anyframe.remoting.webservices.server.Server;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;


/**
 * TestCase Name : RemotingSpringTestCase <br>
 * <br>
 * [Description] : 클라이언트를 Spring 설정 파일을 이용하여 구현한 경우,
 *                 Spring에서 제공하는 AbstractDependencyInjectionSpringContextTests 클래스를
 *                 상속받은 RemotingSpringTestCase를 이용하여 Setter Injection 기능과
 *                 Spring XML 설정 파일을 로드하는 기능을 쉽게 사용할 수 있다. 또한 Server에
 *                 대한 setter/getter method를 통해 어떤 Server 종류를 이용하여
 *                 Remoting 기능을 제공할 것인지 결정할 수 있게 하며, 더불어 setUp,tearDown
 *                 메소드 호출 시 Server를 start, stop 시킬 수 있는 기능 또한 제공하고 있다.
 *                 Spring 클라이언트 구현시 사용되는 상위 TestCase이다. <br>
 *                 
 * [tip.] Server를 stop 시킨 후 다음 테스트 수행을 위해서 start 시키기 까지는 약간의 시간 term이 필요하므로
 *        Thread.sleep(5 * 1000); 구문을 추가하였다.
 * 
 * @author SooYeon Park
 */
public class RemotingSpringTestCase extends
        AbstractDependencyInjectionSpringContextTests {

    private Server server = null;

    protected void setServer(Server server) {
        this.server = server;
    }

    public Server getServer() {
        return server;
    }

    protected String[] getConfigLocations() {
        return null;
    }

    // This method is called before test method is
    // executed.
    protected void onSetUp() throws Exception {
        super.onSetUp();
        server.start();
    }

    // This method is called after test method is
    // executed.
    protected void onTearDown() throws Exception {
        super.onTearDown();
        server.stop();
        Thread.sleep(5 * 1000);
    }
}
