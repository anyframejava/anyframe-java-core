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

    public void createUsers(Map<String, String> usersMap) {
        create("createUsers", usersMap);
    }

	public Map<String, Object> findUsers(Map<String, String> usersMap) {
		Map<String, Object> map = findByPk("findUsersByPk", usersMap);
		return map;
    }

    public Page findUsersList(Map<String, String> searchMap, int pageIndex, int pageSize,
            int pageUnit) {
        return findListWithPaging("findUsersList", searchMap, pageIndex, pageSize,
            pageUnit);
    }

    public void removeUsers(Map<String, String> usersMap) {
        remove("removeUsers", usersMap);
    }

    public void updateUsers(Map<String, String> usersMap) {
        update("updateUsers", usersMap);
    }
}
