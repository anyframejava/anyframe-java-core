package org.anyframe.transaction.programmatic;

import org.springframework.test.AbstractDependencyInjectionSpringContextTests;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;

import anyframe.core.query.IQueryService;
import org.anyframe.sample.transaction.user.service.EmpException;
import org.anyframe.sample.transaction.user.service.UserService;
import org.anyframe.sample.transaction.user.service.UserVO;

public class ProgrammaticTransactionManagementTest extends
        AbstractDependencyInjectionSpringContextTests {

    private IQueryService queryService;
    private UserService userService;
    private TransactionTemplate transactionTemplate;
    private PlatformTransactionManager transactionService;

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
    }

    public void testAddUserUsingTransactionTemplate() throws Exception {
        transactionTemplate.execute(new TransactionCallbackWithoutResult() {
            public void doInTransactionWithoutResult(TransactionStatus status) {

                try {
                    UserVO userVO = new UserVO();
                    userVO.setUserId("woos41");
                    userVO.setUserName("gang");
                    userVO.setPassword("gang");
                    userVO.setRole("user");
                    userVO.setSsn("1234567890");
                    userVO.setSlYn("Y");
                    userVO.setBirthDay("20090101");
                    userVO.setAge(null);
                    userVO.setCellPhone("1234567890");
                    userVO.setAddr("kamala road");
                    userVO.setEmail("ga@samsung.com");
                    userVO.setEmailYn("y");
                    userVO.setImageFile("ga");
                    userVO.setRegDate(null);

                    userService.addUser(userVO);
                    userService.addUser(userVO);
                } catch (EmpException e) {
                    status.setRollbackOnly();
                }
            }
        });

        try {
            userService.getUser("woos41");
            fail("fail to transaction management.");
        } catch (Exception e) {
            assertTrue("fail to rollback.", e instanceof EmpException);
        }
    }

    public void testAddUserUsingTransactionManager() throws Exception {
        DefaultTransactionDefinition txDefinition =
            new DefaultTransactionDefinition();
        txDefinition
            .setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus status =
            transactionService.getTransaction(txDefinition);

        try {
            UserVO userVO = new UserVO();
            userVO.setUserId("woos41");
            userVO.setUserName("gang");
            userVO.setPassword("gang");
            userVO.setRole("user");
            userVO.setSsn("1234567890");
            userVO.setSlYn("Y");
            userVO.setBirthDay("20090101");
            userVO.setAge(null);
            userVO.setCellPhone("1234567890");
            userVO.setAddr("kamala road");
            userVO.setEmail("ga@samsung.com");
            userVO.setEmailYn("y");
            userVO.setImageFile("ga");
            userVO.setRegDate(null);

            userService.addUser(userVO);
            userService.addUser(userVO);

            transactionService.commit(status);
        } catch (EmpException e) {
            transactionService.rollback(status);
        }

        try {
            userService.getUser("woos41");
            fail("fail to transaction management.");
        } catch (EmpException e) {
            assertTrue("fail to rollback.", e instanceof EmpException);
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
            "classpath*:/META-INF/spring/integration/user/context-user-general.xml" };
    }

    public void setQueryService(IQueryService queryService) {
        this.queryService = queryService;
    }

    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    public void setTransactionTemplate(TransactionTemplate transactionTemplate) {
        this.transactionTemplate = transactionTemplate;
    }

    public void setTransactionService(
            PlatformTransactionManager transactionService) {
        this.transactionService = transactionService;
    }
}
