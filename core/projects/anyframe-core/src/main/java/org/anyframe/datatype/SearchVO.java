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
package org.anyframe.datatype;

/**
 * This SearchVO entity class contains attributes for
 * common searching information and putter,setter
 * methods of them. And it contains toString method for
 * logging.
 * 
 * @author Taeho Kim
 */
public class SearchVO implements java.io.Serializable {

    private static final long serialVersionUID = 1L;

    private String searchCondition = "";

    private String searchKeyword = "";

    private int pageIndex = 1;

    public String getSearchCondition() {
        return searchCondition;
    }

    public void setSearchCondition(String searchCondition) {
        this.searchCondition = searchCondition;
    }

    public String getSearchKeyword() {
        return searchKeyword;
    }

    public void setSearchKeyword(String searchKeyword) {
        this.searchKeyword = searchKeyword;
    }

    public int getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(int pageIndex) {
        this.pageIndex = pageIndex;
    }

    public String toString() {
        StringBuilder arguments = new StringBuilder();
        arguments.append(" searchCondition - " + searchCondition + "\n");
        arguments.append(" searchKeyword - " + searchKeyword + "\n");
        arguments.append(" pageIndex - " + pageIndex + "\n");

        return arguments.toString();
    }

}
