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
package org.anyframe.query.vo;

/**
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class Customer implements java.io.Serializable {
    private static final long serialVersionUID = 1L;

    private String ssno;

    private String nm;

    private String addr;

    public Customer() {
    }

    public Customer(String s, String n, String a) {
        ssno = s;
        nm = n;
        addr = a;
    }

    public String getSsno() {
        return ssno;
    }

    public String getNm() {
        return nm;
    }

    public String getAddr() {
        return addr;
    }

    public void setSsno(String s) {
        ssno = s;
    }

    public void setNm(String n) {
        nm = n;
    }

    public void setAddr(String a) {
        addr = a;
    }
}
