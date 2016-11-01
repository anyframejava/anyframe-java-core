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
package org.anyframe.query.dao;

import java.util.Map;

import org.anyframe.pagination.Page;
import org.anyframe.query.dao.QueryServiceDaoSupport;

public class UserSupportDaoWithMap extends QueryServiceDaoSupport  {

    public void createUsers(Map usersMap) throws Exception {
        create("createUsers", usersMap);
    }

    public Map findUsers(Map usersMap) throws Exception {
        return (Map) findByPk("findUsersByPk", usersMap);
    }

    public Page findUsersList(Map searchMap, int pageIndex, int pageSize,
            int pageUnit) throws Exception {
        return findListWithPaging("findUsersList", searchMap, pageIndex, pageSize,
            pageUnit);
    }

    public void removeUsers(Map usersMap) throws Exception {
        remove("removeUsers", usersMap);
    }

    public void updateUsers(Map usersMap) throws Exception {
        update("updateUsers", usersMap);
    }

}
