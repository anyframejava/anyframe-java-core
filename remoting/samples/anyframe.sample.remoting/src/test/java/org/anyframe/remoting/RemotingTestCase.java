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

import junit.framework.TestCase;

/**
 * TestCase Name : RemotingTestCase <br>
 * <br>
 * [Description] : 클라이언트를 Spring 설정 파일을 이용하여 구현하지 않는 나머지 모든 경우에 
 *                 사용되는 상위 TestCase이다. Server에 대한 setter/getter method를 통해 
 *                 어떤 Server 종류를 이용하여 Remoting 기능을 제공할 것인지 결정할 수 있게 하며,
 *                 더불어 setUp,tearDown 메소드 호출 시 Server를 start, stop 시킬 수 있는 기능 또한 제공하고 있다.
 *                  
 * [tip.] Server를 stop 시킨 후 다음 테스트 수행을 위해서 start 시키기 까지는 약간의 시간 term이 필요하므로
 *        Thread.sleep(5 * 1000); 구문을 추가하였다.
 * <br>
 * @author SooYeon Park
 */
public class RemotingTestCase extends TestCase {

    private Server server = null;

    public void setServer(Server server) {
        this.server = server;
    }

    public Server getServer() {
        return server;
    }

    public void setUp() throws Exception {
        server.start();
    }

    public void tearDown() throws Exception {
        server.stop();
        Thread.sleep(5 * 1000);
    }
}
