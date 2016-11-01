package org.anyframe.sample.transaction.user.dao;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.Iterator;

import anyframe.core.query.IQueryService;
import org.anyframe.sample.transaction.user.service.UserVO;

public class UserDAO {

    /** an instance variable for the queryService. */
    protected IQueryService queryService;

    /**
     * Sets the name of the QueryService to use.
     * @param queryService
     *        queryService for this member
     */
    public void setQueryService(IQueryService queryService) {
        this.queryService = queryService;
    }

    /**
     * Returns UserVO for the given user id.
     * @param userId
     *        search criteria.
     * @return <code>UserVO</code> if found else
     *         <code>null</code>
     * @throws Exception
     *         if query fails.
     */
    public UserVO getUser(String userId) throws Exception {

        Collection userCollection =
            queryService.find("getUser", new Object[] {userId });
        Iterator userItr = userCollection.iterator();
        if (userItr.hasNext()) {
            return (UserVO) userItr.next();
        }
        return null;
    }

    /**
     * Adds user.
     * @param userVO
     *        user object
     * @throws Exception
     *         if query fails.
     */
    public void addUser(UserVO userVO) throws Exception {
        String userId = userVO.getUserId();
        String userName = userVO.getUserName();
        String password = userVO.getPassword();
        String ssn = userVO.getSsn();
        String slYn = userVO.getSlYn();
        String birthDay = userVO.getBirthDay();
        BigDecimal age = userVO.getAge();
        String cellPhone = userVO.getCellPhone();
        String addr = userVO.getAddr();
        String email = userVO.getEmail();
        String emailYn = userVO.getEmailYn();
        String imageFile = userVO.getImageFile();
        queryService.create("addUser", new Object[] {userId, userName,
            password, ssn, slYn, birthDay, age, cellPhone, addr, email,
            emailYn, imageFile });
    }

    /**
     * Updates the given user.
     * @param userVO
     *        user object
     * @throws Exception
     *         if query fails.
     */
    public int updateUser(UserVO userVO) throws Exception {
        String userId = userVO.getUserId();
        String userName = userVO.getUserName();
        String ssn = userVO.getSsn();
        String slYn = userVO.getSlYn();
        String birthDay = userVO.getBirthDay();
        BigDecimal age = userVO.getAge();
        String cellPhone = userVO.getCellPhone();
        String addr = userVO.getAddr();
        String email = userVO.getEmail();
        String emailYn = userVO.getEmailYn();

        return queryService.update("updateUser", new Object[] {userName, ssn,
            slYn, birthDay, age, cellPhone, addr, email, emailYn, userId });

    }
}
