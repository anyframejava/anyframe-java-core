package org.anyframe.transaction.declarative;

import org.springframework.test.AbstractDependencyInjectionSpringContextTests;

import anyframe.core.query.IQueryService;
import org.anyframe.sample.transaction.user.service.EmpException;
import org.anyframe.sample.transaction.user.service.UserService;
import org.anyframe.sample.transaction.user.service.UserVO;

public class DeclarativeTransactionManagementWithXMLTest extends
        AbstractDependencyInjectionSpringContextTests {

    private IQueryService queryService;
    private UserService userService;

    public void onSetUp() throws Exception {
        try {
            System.out.println("Attempting to drop old table");
            queryService.updateBySQL("DROP TABLE USERS", new String[] {},
                new Object[] {});
        } catch (Exception e) {

        }

        System.out.println("Create new table");
        queryService.updateBySQL("CREATE TABLE USERS ("
            + "USER_ID VARCHAR(20) PRIMARY KEY, "
            + "USER_NAME VARCHAR(50) NOT NULL, "
            + "PASSWORD VARCHAR(10) NOT NULL, " + "ROLE VARCHAR(5), "
            + "SSN VARCHAR(13), " + "SL_YN CHAR(1), "
            + "BIRTH_DAY VARCHAR(8), " + "AGE NUMERIC(3), "
            + "CELL_PHONE VARCHAR(14), " + "ADDR VARCHAR(100), "
            + "EMAIL VARCHAR(50), " + "EMAIL_YN CHAR(1), "
            + "IMAGE_FILE VARCHAR(100), " + "REG_DATE DATE )", new String[] {},
            new Object[] {});

        System.out.println("Insert init data");
        queryService
            .updateBySQL(
                "INSERT INTO USERS (USER_ID, USER_NAME, PASSWORD) VALUES ('woos41', 'woos', 'woos123')",
                new String[] {}, new Object[] {});
    }

    /**
     * This testcase is used to test the functionality
     * of UpdateUserList method
     * @throws EmpException
     *         EmpException will raise, when
     *         testUpdateUserWithNotExistUser() failed
     */
    public void testUpdateUserWithNotExistUser() throws EmpException {
        // 1. update user list
        UserVO newUser = new UserVO();
        newUser.setUserId("testuser");
        newUser.setUserName("gang");
        newUser.setPassword("gang");
        newUser.setRole("user");
        newUser.setSsn("1234567890");
        newUser.setSlYn("Y");
        newUser.setBirthDay("19750319");
        newUser.setAge(null);
        newUser.setCellPhone("1234567890");
        newUser.setAddr("kamala road");
        newUser.setEmail("ga@samsung.com");
        newUser.setEmailYn("y");
        newUser.setImageFile("ga");

        UserVO updateUser = userService.getUser("woos41");
        updateUser.setUserId("woos");
        String name = "woostest";
        updateUser.setUserName(name);

        try {
            userService.updateUserList(newUser, updateUser);
            fail("fail to get user.");
        } catch (EmpException e) {
            try {
                UserVO userVO = userService.getUser("testuser");
                assertNotNull("fail to commit.", userVO);
            } catch (EmpException ie) {
                fail("fail to trnasaction management.");
            }
        }
    }

    protected String[] getConfigLocations() {
        // TODO Auto-generated method stub
        return new String[] {
            "classpath*:/META-INF/spring/integration/common/context-common.xml",
            "classpath*:/META-INF/spring/integration/common/context-query.xml",
            "classpath*:/META-INF/spring/integration/common/context-query-sqlloader.xml",
            "classpath*:/META-INF/spring/integration/datasource/context-tx.xml",
            "classpath*:/META-INF/spring/integration/datasource/context-tx-datasource.xml",
            "classpath*:/META-INF/spring/integration/user/context-user-xml.xml" };
    }

    public void setQueryService(IQueryService queryService) {
        this.queryService = queryService;
    }

    public void setUserService(UserService userService) {
        this.userService = userService;
    }
}
