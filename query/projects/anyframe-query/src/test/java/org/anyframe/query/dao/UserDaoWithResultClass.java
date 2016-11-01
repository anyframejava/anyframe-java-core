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
package org.anyframe.query.dao;

import org.anyframe.pagination.Page;
import org.anyframe.query.vo.UsersVO;

public class UserDaoWithResultClass extends AbstractDao {
    public void createUsers(UsersVO usersVO) throws Exception {
        create("Users", usersVO);
    }

    public UsersVO findUsers(UsersVO usersVO) throws Exception {
        return (UsersVO) findByPk("Users", usersVO);
    }

    public Page findUsersList(UsersVO usersVO, int pageIndex, int pageSize,
            int pageUnit) throws Exception {
        return findListWithPaging("Users", usersVO, pageIndex, pageSize,
            pageUnit);
    }

    public void removeUsers(UsersVO usersVO) throws Exception {
        remove("Users", usersVO);
    }

    public void updateUsers(UsersVO usersVO) throws Exception {
        update("Users", usersVO);
    }

}
