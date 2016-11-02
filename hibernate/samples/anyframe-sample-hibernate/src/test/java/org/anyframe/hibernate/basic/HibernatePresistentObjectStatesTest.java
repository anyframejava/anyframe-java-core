package org.anyframe.hibernate.basic;

import org.anyframe.hibernate.AbstractConfigurationalTest;
import org.anyframe.sample.hibernate.model.bidirection.Category;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/**
 * TestCase Name : HibernatePresistentObjectStatesTest<br>
 * <br>
 * [Description] : The state of persistent object has three kinds: Transient,
 * Persistent, and Detached. In the case of Persistent and Detached States,
 * looked into is how to manage Persistent Object at Hibernate. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : After changing the value of Category Object in
 * persistent state, when the session is closed without the direct call of
 * update or save method, changed object value is automatically reflected in DB.
 * </li>
 * <li>#-2 Positive Case : By closing the session, making category object in
 * persistent state into one in detached state and changing the value of
 * category object without direct calling of update or save method, it is not
 * reflected in DB unlike in persistent state.</li>
 * </ul>
 * 
 * @author Jonghoon Kim
 */

@RunWith(JUnit4.class)
public class HibernatePresistentObjectStatesTest extends
    AbstractConfigurationalTest {
   
    protected String getHibernateConfigLocation() {
        return "hibernateconfig/hibernate.cfg.xml";
    }

	/**
	 * [Flow #-1] Positive Case : After value of category object, persistent
	 * state, is changed, when session is finished without direct calling of
	 * update or save method, changed object value is automatically reflected in
	 * DB.
	 * 
     * @throws Exception
     *             throws exception which is from hibernate
     */
    @Test
    public void testPesistantState() throws Exception {
        // 1. start a new session and transaction
        newSession();
        
        // 2. persistent object is transient state
        Category category = new Category();
        category.setCategoryId("CTGR-0001");
        category.setCategoryName("Romantic");
        category.setCategoryDesc("Romantic genre");
        
        // 3. persistent class is persistent state
        session.save(category);
        
        // 4. change value of persistent object
        category.setCategoryName("Comedy");
        category.setCategoryDesc("Comedy consists...");
        
        // 5. close session
        closeSession();
        
        // 6. check persistent state
        newSession();
        Category categoryResult = (Category) session.get(Category.class, "CTGR-0001");
        closeSession();
        Assert.assertEquals("Comedy", categoryResult.getCategoryName());
        Assert.assertEquals("Comedy consists...", categoryResult.getCategoryDesc());
    }

	/**
	 * [Flow #-2] Positive Case : By closing session, Category object,
	 * persistent state, is changed into detached state and Category object
	 * value is changed. after that, when session is finished without direct
	 * calling of update or save method, it is not reflected in DB unlike
	 * persistent state.
	 * 
     * @throws Exception
     *             throws exception which is from hibernate
     */
    @Test
    public void testDetachedState() throws Exception {
        // 1. start a new session and transaction
        newSession();
        
        // 2. persistent object is transient state
        Category category = new Category();
        category.setCategoryId("CTGR-0001");
        category.setCategoryName("Romantic");
        category.setCategoryDesc("Romantic genre");
        
        // 3. persistent class is persistent state
        session.save(category);
        
        // 4. close session
        // 5. persistent class is Detached state
        closeSession();
        
        // 6. start a new session and transaction
        newSession();

        // 7. change value of persistent object
        category.setCategoryName("Comedy");
        category.setCategoryDesc("Comedy consists");
        // 8. close session
        closeSession();
        
        // 9. check persistent state
        newSession();
        Category categoryResult = (Category) session.get(Category.class, "CTGR-0001");
        Assert.assertNotSame("Comedy", categoryResult.getCategoryName());
        Assert.assertNotSame("Comedy consists...", categoryResult.getCategoryDesc());
    }

}
