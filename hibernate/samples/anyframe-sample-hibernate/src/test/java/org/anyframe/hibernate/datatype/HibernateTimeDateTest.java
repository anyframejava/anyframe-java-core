package org.anyframe.hibernate.datatype;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.anyframe.hibernate.AbstractConfigurationalTransactionalTest;
import org.anyframe.sample.hibernate.model.datatype.TimeDateType;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/**
 * TestCase Name : HibernateTimeDateTest<br>
 * <br>
 * [Description] : In order to handle Time, Data Type via registering/modifying
 * /deleting/searching object defining Time, Data Type, it can be checked what
 * type of object should be defined to handle Java Type and what type should de
 * defined within Hibernate Mapping XML. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Data is entered and searched by using Entity object
 * defining Time and Date Type. Data is modified and modification is checked by
 * using Entity object defining Time and Date Type.</li>
 * <li>#-2 Positive Case : Data is modified and modification is checked by using
 * Entity object defining Time and Date Type.</li>
 * <li>#-3 Positive Case :Data is deleted and deletion is checked by using
 * Entity object defining Time and Date Type.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)
public class HibernateTimeDateTest extends
		AbstractConfigurationalTransactionalTest {
	protected String getHibernateConfigLocation() {
		return "org/anyframe/hibernate/datatype/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : Data is entered and searched by using Entity
	 * object defining Time and Date Type.
	 */
	@Test
	public void testInsertTimeDateType() {
		// 1. insert init data
		List<TimeDateType> typeList = insertTimeDateType();
		TimeDateType source = (TimeDateType) typeList.get(0);

		// 2. select a timeDateType data
		TimeDateType timeDateType = (TimeDateType) session.get(
				TimeDateType.class, new Integer(4491));

		// 3. assert result - timeDateType
		Assert.assertNotNull(timeDateType);
		Assert.assertEquals(source.getDateType().toString(), timeDateType
				.getDateType().toString());
		Assert.assertEquals(source.getTimeType().toString(), timeDateType
				.getTimeType().toString());
		Assert.assertEquals(source.getTimestampType(), timeDateType.getTimestampType());
		Assert.assertEquals(source.getCalendarType().getTime().toString(),
				timeDateType.getCalendarType().getTime().toString());
		Assert.assertEquals(source.getCalendarDateType().getTime(), timeDateType
				.getCalendarDateType().getTime());
	}

	/**
	 * [Flow #-2] Positive Case : Data is modified and modification is checked
	 * by using Entity object defining Time and Date Type.
	 * @throws ParseException 
	 */
	@Test
	public void testUpdateTimeDateType() throws ParseException {
		// 1. insert init data
		insertTimeDateType();

		// 2. select a timeDateType data
		TimeDateType timeDateType = (TimeDateType) session.get(
				TimeDateType.class, new Integer(875));

		// 3. update data
		String strDate = "1980-06-04";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		java.util.Date date = sdf.parse(strDate);
		  
		timeDateType.setDateType(new java.sql.Date(date.getTime()));
		session.update(timeDateType);

		// 4. check if update is successful
		timeDateType = (TimeDateType) session.get(TimeDateType.class,
				new Integer(875));
		Assert.assertNotNull(timeDateType);
		Assert.assertEquals("1980-06-04", timeDateType.getDateType().toString());
	}

	/**
	 * [Flow #-3] Positive Case : Data is deleted and deletion is checked by
	 * using Entity object defining Time and Date Type.
	 */
	@Test
	public void testDeleteTimeDateType() {
		// 1. insert init data
		insertTimeDateType();

		// 2. select a timeDateType data
		TimeDateType timeDateType = (TimeDateType) session.get(
				TimeDateType.class, new Integer(1094));

		// 3. remove data
		session.delete(timeDateType);

		// 4. check if deletion is successful
		timeDateType = (TimeDateType) session.get(TimeDateType.class,
				new Integer(1094));
		Assert.assertNull(timeDateType);
	}

	/**
	 * Data is set according to each Time and Data Type and added into DB.
	 * 
	 * @return List entered JavaDataType List
	 */
	private List<TimeDateType> insertTimeDateType() {
		long currentTime1 = new java.util.Date().getTime();

		TimeDateType timeDateType1 = new TimeDateType();
		timeDateType1.setId(4491);
		timeDateType1.setDateType(new java.sql.Date(currentTime1));
		timeDateType1.setTimeType(new java.sql.Time(currentTime1));
		timeDateType1.setTimestampType(new java.sql.Timestamp(currentTime1));
		timeDateType1.setCalendarType(Calendar.getInstance());
		timeDateType1.setCalendarDateType(Calendar.getInstance());

		session.save(timeDateType1);

		long currentTime2 = new java.util.Date().getTime();

		TimeDateType timeDateType2 = new TimeDateType();
		timeDateType2.setId(1094);
		timeDateType2.setDateType(new java.sql.Date(currentTime2));
		timeDateType2.setTimeType(new java.sql.Time(currentTime2));
		timeDateType2.setTimestampType(new java.sql.Timestamp(currentTime2));
		timeDateType2.setCalendarType(Calendar.getInstance());
		timeDateType2.setCalendarDateType(Calendar.getInstance());

		session.save(timeDateType2);

		long currentTime3 = new java.util.Date().getTime();

		TimeDateType timeDateType3 = new TimeDateType();
		timeDateType3.setId(875);
		timeDateType3.setDateType(new java.sql.Date(currentTime3));
		timeDateType3.setTimeType(new java.sql.Time(currentTime3));
		timeDateType3.setTimestampType(new java.sql.Timestamp(currentTime3));
		timeDateType3.setCalendarType(Calendar.getInstance());
		timeDateType3.setCalendarDateType(Calendar.getInstance());

		session.save(timeDateType3);

		List<TimeDateType> typeList = new ArrayList<TimeDateType>();
		typeList.add(timeDateType1);
		typeList.add(timeDateType2);
		typeList.add(timeDateType3);

		return typeList;
	}
}
