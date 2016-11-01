package org.anyframe.hibernate.datatype;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.anyframe.hibernate.AbstractConfigurationalTransactionalTest;
import org.anyframe.sample.hibernate.model.datatype.TimeDateType;


/**
 * TestCase Name : HibernateTimeDateTest<br>
 * <br>
 * [Description] : Time, Date Type이 정의된 객체에 대해 등록/수정/삭제/조회를 통해 각 Time, Date
 * Type을 처리하기 위해 객체에 어떠한 Type으로 정의되어야 하는지, Hibernate Mapping XML 파일 내에 정의되어야 하는
 * Type은 무엇인지 확인해 볼 수 있다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Time, Date Type이 정의된 Entity 객체를 이용하여 데이터를 입력하고 조회한다.
 * Hibernate 매핑 파일을 통해 각 Time, Date Type에 맞는 Hibernate Mapping Type을 알 수 있다.</li>
 * <li>#-2 Positive Case : Time, Date Type이 정의된 Entity 객체를 이용하여 데이터를 수정하고 수정
 * 여부를 확인한다.</li>
 * <li>#-3 Positive Case : Time, Date Type이 정의된 Entity 객체를 이용하여 데이터를 삭제하고 삭제
 * 여부를 확인한다.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
public class HibernateTimeDateTest extends
		AbstractConfigurationalTransactionalTest {
	protected String getHibernateConfigLocation() {
		return "org/anyframe/hibernate/datatype/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : Time, Date Type이 정의된 Entity 객체를 이용하여 데이터를 입력하고
	 * 조회한다. Hibernate 매핑 파일을 통해 각 Time, Date Type에 맞는 Hibernate Mapping Type을 알
	 * 수 있다.
	 */
	public void testInsertTimeDateType() {
		// 1. insert init data
		List typeList = insertTimeDateType();
		TimeDateType source = (TimeDateType) typeList.get(0);

		// 2. select a timeDateType data
		TimeDateType timeDateType = (TimeDateType) session.get(
				TimeDateType.class, new Integer(4491));

		// 3. assert result - timeDateType
		assertNotNull(timeDateType);
		assertEquals(source.getDateType().toString(), timeDateType
				.getDateType().toString());
		assertEquals(source.getTimeType().toString(), timeDateType
				.getTimeType().toString());
		assertEquals(source.getTimestampType(), timeDateType.getTimestampType());
		assertEquals(source.getCalendarType().getTime().toString(),
				timeDateType.getCalendarType().getTime().toString());
		assertEquals(source.getCalendarDateType().getTime(), timeDateType
				.getCalendarDateType().getTime());
	}

	/**
	 * [Flow #-2] Positive Case : Time, Date Type이 정의된 Entity 객체를 이용하여 데이터를 수정하고
	 * 수정 여부를 확인한다.
	 */
	public void testUpdateTimeDateType() {
		// 1. insert init data
		insertTimeDateType();

		// 2. select a timeDateType data
		TimeDateType timeDateType = (TimeDateType) session.get(
				TimeDateType.class, new Integer(875));

		// 3. update data
		timeDateType.setDateType(new java.sql.Date(80, 5, 4));
		session.update(timeDateType);

		// 4. check if update is successful
		timeDateType = (TimeDateType) session.get(TimeDateType.class,
				new Integer(875));
		assertNotNull(timeDateType);
		assertEquals("1980-06-04", timeDateType.getDateType().toString());
	}

	/**
	 * [Flow #-3] Positive Case : Time, Date Type이 정의된 Entity 객체를 이용하여 데이터를 삭제하고
	 * 삭제 여부를 확인한다.
	 */
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
		assertNull(timeDateType);
	}

	/**
	 * Time, Date Type 각각에 맞게 데이터를 셋팅하고 DB에 추가한다.
	 * 
	 * @return List 입력한 JavaDataType List
	 */
	private List insertTimeDateType() {
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

		List typeList = new ArrayList();
		typeList.add(timeDateType1);
		typeList.add(timeDateType2);
		typeList.add(timeDateType3);

		return typeList;
	}
}
