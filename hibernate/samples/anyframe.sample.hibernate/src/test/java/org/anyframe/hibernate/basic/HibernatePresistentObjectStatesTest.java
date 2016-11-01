package org.anyframe.hibernate.basic;

import org.anyframe.hibernate.AbstractConfigurationalTest;
import org.anyframe.hibernate.SetUpInitData;
import org.anyframe.sample.hibernate.model.bidirection.Category;
import org.anyframe.sample.hibernate.model.bidirection.Country;
import org.anyframe.sample.hibernate.model.bidirection.Movie;
import org.hibernate.Hibernate;
import org.hibernate.LazyInitializationException;


/**
 * TestCase Name :
 * HibernatePresistentObjectStatesTest<br>
 * <br>
 * [Description] : Persistent Object의 state에는 Transient, Persistent, Detached
 * 세개의 상태가 있다. Persistent, Detached 상태 일때 Hibernate에서 Persistent Object
 * 를 어떻게 관리하는지 알아본다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : persistent state인 Category객체의 값을 바꾼
 * 후 update나 save 메소드의 직접적인 호출 없이 
 * session을 종료 하였을 때 변환 된 객체의 값이 DB에 자동으로 반영된다.</li>
 * <li>#-2 Positive Case :persistent state인 Category객체를 session을 
 * 닫아 detached state로 만들고 Category객체의 값을 변경한 후 
 * update나 save 메소드직접 호출 하지 않고 session을 종료 하였을 때 
 * persistent state일 때와는 다르게 DB에 반영이 되지 않는다.</li>
 * </ul>
 * @author Jonghoon Kim
 */


public class HibernatePresistentObjectStatesTest extends
    AbstractConfigurationalTest {
   
    protected String getHibernateConfigLocation() {
        return "hibernateconfig/hibernate.cfg.xml";
    }
    /**
     * [Flow #-1] Positive Case : persistent state인 Category객체의 값을 바꾼
     * 후 update나 save 메소드의 직접적인 호출 없이 
     * session을 종료 하였을 때 변환 된 객체의 값이 DB에 자동으로 반영된다.
     * 
     * @throws Exception
     *             throws exception which is from hibernate
     */
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
        assertEquals("Comedy", categoryResult.getCategoryName());
        assertEquals("Comedy consists...", categoryResult.getCategoryDesc());
    }

    /**
     * [Flow #-2] Positive Case : persistent state인 Category객체를 session을 
     * 닫아 detached state로 만들고 Category객체의 값을 변경한 후 
     * update나 save 메소드직접 호출 하지 않고 session을 종료 하였을 때 
     * persistent state일 때와는 다르게 DB에 반영이 되지 않는다.
     * 
     * @throws Exception
     *             throws exception which is from hibernate
     */
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
        assertNotSame("Comedy", categoryResult.getCategoryName());
        assertNotSame("Comedy consists...", categoryResult.getCategoryDesc());
    }

}
