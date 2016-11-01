package org.anyframe.sample.transaction.user.service.impl;

import java.util.Locale;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.MessageSource;
import org.springframework.transaction.annotation.Transactional;

import anyframe.core.query.QueryServiceException;
import org.anyframe.sample.transaction.user.dao.UserDAO;
import org.anyframe.sample.transaction.user.service.EmpException;
import org.anyframe.sample.transaction.user.service.UserService;
import org.anyframe.sample.transaction.user.service.UserVO;

public class UserServiceImplWithAnnotation implements UserService,
        ApplicationContextAware {

    /** an instance variable for the UserDAO. */
    private UserDAO userDAO;

    /**
     * Used by <code>LOGGER</code> and for creating
     * Exception message.
     */
    private MessageSource messageSource;

    /**
     * sets User dao
     * @param userDAO
     *        user dao
     */
    public void setUserDAO(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public void setApplicationContext(ApplicationContext applicationContext)
            throws BeansException {
        messageSource =
            (MessageSource) applicationContext.getBean("messageSource");
    }

    public UserVO getUser(String userId) throws EmpException {
        try {
            UserVO userVO = userDAO.getUser(userId);

            if (userVO == null) {
                if (LOGGER.isDebugEnabled()) {
                    LOGGER.debug(messageSource.getMessage("debug.user.get",
                        new String[] {userId }, Locale.getDefault()));
                }
                throw new EmpException(messageSource.getMessage(
                    "debug.user.get", new String[] {userId }, Locale
                        .getDefault()), null);
            }

            return userVO;
        } catch (EmpException e) {
            throw e;
        } catch (QueryServiceException e) {
            LOGGER.error(messageSource.getMessage("error.user.get.query",
                new String[] {userId }, Locale.getDefault()), e);

            throw new EmpException(messageSource.getMessage(
                "error.user.get.query", new String[] {userId }, Locale
                    .getDefault()), e);
        } catch (Exception e) {

            LOGGER.error(messageSource.getMessage("error.user.get",
                new String[] {userId }, Locale.getDefault()));
            throw new EmpException(messageSource.getMessage("error.user.get",
                new String[] {userId }, Locale.getDefault()), e);
        }
    }

    @Transactional(noRollbackFor = {EmpException.class })
    public void updateUserList(UserVO newUser, UserVO updateUser)
            throws EmpException {
        String userName = "";
        try {
            userName = newUser.getUserName();
            userDAO.addUser(newUser);

            userName = updateUser.getUserName();
            int result = userDAO.updateUser(updateUser);
            if (result <= 0) {
                throw new Exception("fail to update with wrong userid.");
            }
        } catch (Exception e) {
            LOGGER.error(messageSource.getMessage("error.user.update",
                new String[] {userName }, Locale.getDefault()));
            throw new EmpException(messageSource.getMessage(
                "error.user.update", new String[] {userName }, Locale
                    .getDefault()), e);
        }
    }

    @Transactional
    public void addUser(UserVO userVO) throws EmpException {

        try {
            userDAO.addUser(userVO);
        }

        catch (QueryServiceException e) {
            LOGGER.error(messageSource.getMessage("error.user.add.query",
                new String[] {}, Locale.getDefault()), e);

            throw new EmpException(messageSource.getMessage(
                "error.user.add.query", new String[] {}, Locale.getDefault()),
                e);
        } catch (Exception e) {
            String userId = userVO.getUserName();

            LOGGER.error(messageSource.getMessage("error.user.add",
                new String[] {userId }, Locale.getDefault()));
            throw new EmpException(messageSource.getMessage("error.user.add",
                new String[] {userId }, Locale.getDefault()), e);
        }

    }
}
