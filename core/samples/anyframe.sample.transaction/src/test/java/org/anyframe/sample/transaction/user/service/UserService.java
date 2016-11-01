package org.anyframe.sample.transaction.user.service;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public interface UserService {

    /** Logger object. */
    Log LOGGER = LogFactory.getLog(UserService.class);

    /**
     * Returns <code>UserVO</code> for the userid
     * passed.
     * @param userId
     *        user id for which search will happen.
     * @return UserVO object
     * @throws EmpException
     *         if </code>UserVo</code> is not found
     *         or if any exception is raised.
     */
    UserVO getUser(String userId) throws EmpException;

    /**
     * insert a new user information and update a user
     * information for testing transaction management
     * @param newUser
     *        new user information for inserting
     * @param updateUser
     *        user information for updating
     * @throws EmpException
     */
    void updateUserList(UserVO newUser, UserVO updateUser) throws EmpException;

    /**
     * Adds User.
     * @param userVO
     *        User Info
     * @throws EmpException
     *         if add query fails.
     */
    void addUser(UserVO userVO) throws EmpException;
}
