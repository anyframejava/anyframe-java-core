package org.anyframe.hibernate.datatype;

import java.util.ArrayList;
import java.util.List;

import org.anyframe.hibernate.AbstractConfigurationalTransactionalTest;
import org.anyframe.sample.hibernate.model.datatype.JavaDataType;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/**
 * TestCase Name : HibernateJavaTypeTest<br>
 * <br>
 * [Description] : : In order to handle each Primitive Java Type via
 * registering/modifying /deleting/searching object defining Primitive Java
 * Type, it can be checked what type of object should be defined to handle Java
 * Type and what type should be defined within Hibernate Mapping XML. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Data is entered and searched using Entity object
 * defining Primitive Java Type. Hibernate mapping file finds Hibernate Mapping
 * Type suitable for each primitive Java Type.</li>
 * <li>#-2 Positive Case : Data is modified and modification is checked by using
 * Entity object defining Primitive Java Type.</li>
 * <li>#-3 Positive Case : Data is deleted and deletion is checked by using
 * Entity object defining Primitive Java Type.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)
public class HibernateJavaTypeTest extends
		AbstractConfigurationalTransactionalTest {
	protected String getHibernateConfigLocation() {
		return "org/anyframe/hibernate/datatype/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : Data is entered and searched using Entity
	 * object defining Primitive Java Type. Hibernate mapping file finds
	 * Hibernate Mapping Type suitable for each primitive Java Type.
	 */
	@Test
	public void testInsertJavaDataType() {
		// 1. insert init data
		List<JavaDataType> typeList = insertJavaDataType();

		JavaDataType source = (JavaDataType) typeList.get(0);

		// 2. select a javaDateType data
		JavaDataType javaDataType = (JavaDataType) session.get(
				JavaDataType.class, new Integer(4491));

		// 3. assert result - javaDateType
		Assert.assertNotNull(javaDataType);
		Assert.assertEquals(source.getIntType(), javaDataType.getIntType());
		Assert.assertEquals(source.getLongType(), javaDataType.getLongType());
		Assert.assertEquals(source.getShortType(), javaDataType.getShortType());
		Assert.assertEquals(new Float(source.getFloatType()), new Float(javaDataType
				.getFloatType()));
		Assert.assertEquals(new Double(source.getDoubleType()), new Double(
				javaDataType.getDoubleType()));
		Assert.assertEquals(source.getBigDecimalType(), javaDataType
				.getBigDecimalType());
		Assert.assertEquals(source.getCharType(), javaDataType.getCharType());
		Assert.assertEquals(source.getStringType(), javaDataType.getStringType());
		Assert.assertEquals(source.getByteType(), javaDataType.getByteType());
		Assert.assertEquals(source.isBooleanType(), javaDataType.isBooleanType());
		Assert.assertEquals(source.isYesNoType(), javaDataType.isYesNoType());
		Assert.assertEquals(source.isTrueFalseType(), javaDataType.isTrueFalseType());
	}

	/**
	 * [Flow #-2] Positive Case : Data is modified and modification is checked
	 * by using Entity object defining Primitive Java Type.
	 */
	@Test
	public void testUpdateJavaDataType() {
		// 1. insert init data
		List<JavaDataType> typeList = insertJavaDataType();

		@SuppressWarnings("unused")
		JavaDataType source = (JavaDataType) typeList.get(0);

		// 2. select a javaDateType data
		JavaDataType javaDataType = (JavaDataType) session.get(
				JavaDataType.class, new Integer(4491));

		// 3. update data
		javaDataType.setStringType("Hibernate");
		javaDataType.setYesNoType(false);

		session.update(javaDataType);

		// 4. check if update is successful
		javaDataType = (JavaDataType) session.get(JavaDataType.class,
				new Integer(4491));

		Assert.assertNotNull(javaDataType);
		Assert.assertEquals("Hibernate", javaDataType.getStringType());
		Assert.assertEquals(false, javaDataType.isYesNoType());
	}

	/**
	 * [Flow #-3] Positive Case : Data is deleted and deletion is checked by
	 * using Entity object defining Primitive Java Type.
	 */
	@Test
	public void testDeleteJavaDataType() {
		// 1. insert init data
		List<JavaDataType> typeList = insertJavaDataType();

		@SuppressWarnings("unused")
		JavaDataType source = (JavaDataType) typeList.get(0);

		// 2. select a javaDateType data
		JavaDataType javaDataType = (JavaDataType) session.get(
				JavaDataType.class, new Integer(4491));

		// 3. remove data
		session.delete(javaDataType);

		// 4. check if deletion is successful
		javaDataType = (JavaDataType) session.get(JavaDataType.class,
				new Integer(4491));

		Assert.assertNull(javaDataType);
	}

	/**
	 * Data is set and added to DB according to different Primitive Java Type.
	 * 
	 * @return List Inserted JavaDataType List
	 */
	private List<JavaDataType> insertJavaDataType() {
		JavaDataType javaDataType1 = new JavaDataType();
		javaDataType1.setId(4491);
		javaDataType1.setIntType(2147483647);
		javaDataType1.setLongType(9223372036854775807L);
		javaDataType1.setShortType(new java.lang.Short("32767").shortValue());
		javaDataType1.setFloatType(3.4028235E+38f);
		javaDataType1.setDoubleType(1.7976931348623157d);
		javaDataType1.setBigDecimalType(new java.math.BigDecimal(
				"1234567.8987654"));
		javaDataType1.setCharType('A');
		javaDataType1.setStringType("Anyframe");
		javaDataType1.setByteType(new java.lang.Byte("-127").byteValue());
		javaDataType1.setBooleanType(true);
		javaDataType1.setYesNoType(false);
		javaDataType1.setTrueFalseType(true);
		session.save(javaDataType1);

		JavaDataType javaDataType2 = new JavaDataType();
		javaDataType2.setId(875);
		javaDataType2.setIntType(-123456);
		javaDataType2.setLongType(-123456L);
		javaDataType2.setShortType(new java.lang.Short("999").shortValue());
		javaDataType2.setFloatType(-3.14f);
		javaDataType2.setDoubleType(-1.7976931348623157d);
		javaDataType2.setBigDecimalType(new java.math.BigDecimal(
				"-1234567.8987654"));
		javaDataType2.setCharType('B');
		javaDataType2.setStringType("애니프레임");
		javaDataType2.setByteType(new java.lang.Byte("6").byteValue());
		javaDataType2.setBooleanType(true);
		javaDataType2.setYesNoType(true);
		javaDataType2.setTrueFalseType(true);
		session.save(javaDataType2);

		JavaDataType javaDataType3 = new JavaDataType();
		javaDataType3.setId(119);
		javaDataType3.setIntType(64564491);
		javaDataType3.setLongType(987654L);
		javaDataType3.setShortType(new java.lang.Short("-7").shortValue());
		javaDataType3.setFloatType(3.01f);
		javaDataType3.setDoubleType(19.157d);
		javaDataType3.setBigDecimalType(new java.math.BigDecimal(
				"-108987654.2132131"));
		javaDataType3.setCharType('C');
		javaDataType3.setStringType("アニフレ-ム");
		javaDataType3.setByteType(new java.lang.Byte("127").byteValue());
		javaDataType3.setBooleanType(true);
		javaDataType3.setYesNoType(false);
		javaDataType3.setTrueFalseType(true);
		session.save(javaDataType3);

		List<JavaDataType> typeList = new ArrayList<JavaDataType>();
		typeList.add(javaDataType1);
		typeList.add(javaDataType2);
		typeList.add(javaDataType3);

		return typeList;
	}
}
