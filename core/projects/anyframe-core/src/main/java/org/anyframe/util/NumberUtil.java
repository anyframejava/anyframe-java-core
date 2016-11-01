package org.anyframe.util;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.Locale;
import java.util.Random;
import java.util.regex.Pattern;

/**
 * Number Utility Class <br>
 *
 * @author HyunJung Jeong
 */
public class NumberUtil {

	// ~ Static fields/initializers
	// =============================================
	private static Random generator = new Random(System.currentTimeMillis());

	// ~ Methods
	// ================================================================

	/**
	 * return random number matching the given targetClass
	 *
	 * @param targetClass number type to define <code>Integer</code>,
	 * <code>Long</code>, <code>Float</code>, <code>Double</code>
	 * @return random number
	 */
	public static <T extends Number> T getRandomNumber(Class<T> targetClass) {
		return getRandomNumber(targetClass, true);
	}

	/**
	 * return random number in fixed length matching targetClass
	 *
	 * @param targetClass number type to define <code>Integer</code>,
	 * <code>Long</code>, <code>Float</code>, <code>Double</code>
	 * @param fixedLength number type to define
	 * @return random number
	 */
	@SuppressWarnings("unchecked")
	public static <T extends Number> T getRandomNumber(Class<T> targetClass, int fixedLength) {
		if (fixedLength < 0)
			return (T) null;

		double randomNumber = 0.0;

		if (targetClass.equals(Integer.class)) {
			randomNumber = getRandomNumber(fixedLength, 10, Integer.MAX_VALUE);
			return (T) (Integer) (int) randomNumber;
		}
		else if (targetClass.equals(Long.class)) {
			randomNumber = getRandomNumber(fixedLength, 19, Long.MAX_VALUE);
			return (T) (Long) (long) randomNumber;
		}
		else if (targetClass.equals(Float.class)) {
			int digit = generator.nextInt(fixedLength);
			randomNumber = getRandomNumber(digit, 39, Float.MAX_VALUE);
			return (T) (Float) (float) randomNumber;
		}
		else if (targetClass.equals(Double.class)) {
			int digit = generator.nextInt(fixedLength);
			randomNumber = getRandomNumber(digit, 309, Double.MAX_VALUE);
			return (T) (Double) randomNumber;
		}
		return (T) null;
	}

	/**
	 * return random number within the maximum digits
	 *
	 * @param fixedLength number length
	 * @param maxLength maximum digits of each number type
	 * @param maxValue maximum value of each number type
	 * @return random number
	 */
	private static double getRandomNumber(int fixedLength, int maxLength, double maxValue) {
		double max = 0;
		double base = Math.pow(10, fixedLength - 1);

		if (fixedLength < maxLength) {
			max = Math.pow(10, fixedLength) - 1;
		}
		else if (fixedLength == maxLength) {
			max = maxValue;
		}
		else {
			return -1;
		}
		return (Math.random() * (max - base + 1)) + base;
	}

	/**
	 * return random number in maximum minimum value matching given targetClass
	 *
	 * @param targetClass targetClass number type to define <code>Integer</code>
	 * , <code>Long</code>, <code>Float</code>, <code>Double</code>
	 * @param min minimum value
	 * @param max maximum value
	 * @return random number
	 */
	@SuppressWarnings("unchecked")
	public static <T extends Number> T getRandomNumber(Class<T> targetClass, T min, T max) {
		double minDouble = org.springframework.util.NumberUtils.convertNumberToTargetClass(min, Double.class);
		double maxDouble = org.springframework.util.NumberUtils.convertNumberToTargetClass(max, Double.class);
		double randomNumber = (Math.random() * (maxDouble - minDouble + 1)) + minDouble;

		if (targetClass.equals(Integer.class)) {
			return (T) (Integer) (int) randomNumber;
		}
		else if (targetClass.equals(Long.class)) {
			return (T) (Long) (long) randomNumber;
		}
		else if (targetClass.equals(Float.class)) {
			return (T) (Float) (float) randomNumber;
		}
		else if (targetClass.equals(Double.class)) {
			return (T) (Double) randomNumber;
		}
		return (T) null;
	}

	/**
	 * return random number matching targetClass. if sign is <code>true</code>,
	 * return positive number.
	 *
	 * @param targetClass number type to define <code>Integer</code>,
	 * <code>Long</code>, <code>Float</code>, <code>Double</code>
	 * @param sign positive number if<code>true</code>
	 * @return random number
	 */
	@SuppressWarnings("unchecked")
	public static <T extends Number> T getRandomNumber(Class<T> targetClass, boolean sign) {
		if (sign) {
			if (targetClass.equals(Integer.class)) {
				return (T) (Integer) generator.nextInt();
			}
			else if (targetClass.equals(Long.class)) {
				return (T) (Long) generator.nextLong();
			}
			else if (targetClass.equals(Float.class)) {
				return (T) (Float) generator.nextFloat();
			}
			else if (targetClass.equals(Double.class)) {
				return (T) (Double) generator.nextDouble();
			}
		}
		else {
			if (targetClass.equals(Integer.class)) {
				return (T) (Integer) (-generator.nextInt());
			}
			else if (targetClass.equals(Long.class)) {
				return (T) (Long) (-generator.nextLong());
			}
			else if (targetClass.equals(Float.class)) {
				return (T) (Float) (-generator.nextFloat());
			}
			else if (targetClass.equals(Double.class)) {
				return (T) (Double) (-generator.nextDouble());
			}
		}
		return (T) null;
	}

	/**
	 * check whether input string has number
	 *
	 * @param str input string
	 * @return if number exists, <code>true</code>
	 */
	public static boolean hasNumber(String str) {
		boolean result = false;

		if (str == null || str == "") {
			return false;
		}
		for (int index = 0; index < str.length(); index++) {
			if (str.charAt(index) > 47 && str.charAt(index) < 58)
				result = true;
			else
				continue;
		}
		return result;
	}

	/**
	 * It converts integer type to String ( 27 -> '27')
	 *
	 * <pre>
	 * NumberUtil.integer2string(14) = '14'
	 * </pre>
	 *
	 * @param integer integer type
	 * @return String string representation of a number
	 */
	public static String integer2string(int intValue) {
		return String.valueOf(intValue);
	}

	/**
	 * It converts the string representation of a number to integer type (eg.
	 * '27' -> 27)
	 *
	 * <pre>
	 * NumberUtil.string2integer('14') 	= 14
	 * </pre>
	 *
	 * @param str string representation of a number
	 * @return integer integer type of string
	 */
	public static int string2integer(String str) {
		if (str == null || str.trim().length() == 0) {
			return -1;
		}
		return Integer.parseInt(str.trim());
	}

	/**
	 * bring currency mark matching specific locale<br>
	 *
	 * <pre>
	 * NumberUtil.formatNumberByLocale(3527900, Locale.KOREA) = &quot;￦3,527,900&quot;;
	 * NumberUtil.formatNumberByLocale(3527900, Locale.US) = &quot;$3,527,900.00&quot;;
	 * </pre>
	 *
	 * @param intValue number to convert
	 * @param locale the locale for which a number format is needed
	 * @return String converted number
	 */
	public static String formatNumberByLocale(int intValue, Locale locale) {
		NumberFormat nf = NumberFormat.getCurrencyInstance(locale);
		return nf.format(intValue);
	}

	/**
	 * return number matching user-input format<br>
	 *
	 * <pre>
	 * NumberUtil.formatNumber(1023412, &quot;###,###,###&quot;) = &quot;1,023,412&quot;;
	 * NumberUtil.formatNumber(1023412123, &quot;###,###&quot;) = &quot;1,023,412,123&quot;;
	 * NumberUtil.formatNumber(1023412123, &quot;##,##&quot;) = &quot;10,23,41,21,23&quot;;
	 * NumberUtil.formatNumber(1023412123, &quot;##.##&quot;) = &quot;1023412123&quot;;
	 * </pre>
	 *
	 * @param intValue number to convert
	 * @param format A non-localized pattern string.
	 * @return String converted number
	 */
	public static String formatNumber(int intValue, String format) {
		DecimalFormat df = new DecimalFormat(format);
		return df.format(intValue);
	}

	/**
	 * support up to five converted decimal points only for the decimal points
	 * requested for the input number, default is three decimal points.
	 *
	 * <pre>
	 * NumberUtil.formatNumberByPoint(10231023123.1213, 2) = &quot;10,231,023,123.12&quot;;
	 * NumberUtil.formatNumberByPoint(10231023123.1213, 6) = &quot;10,231,023,123.121&quot;;
	 * </pre>
	 *
	 * @param inputValue number to convert
	 * @param point decimal points
	 * @return String converted number
	 */
	public static String formatNumberByPoint(double inputValue, int point) {
		String format = "";

		switch (point) {
		case 0:
			format = "###,###,###.###";
			break;
		case 1:
			format = "###,###,###,##0.0";
			break;
		case 2:
			format = "###,###,###,##0.00";
			break;
		case 3:
			format = "###,###,###,##0.000";
			break;
		case 4:
			format = "###,###,###,##0.0000";
			break;
		case 5:
			format = "###,###,###,##0.00000";
			break;
		default:
			format = "###,###,###.###";
			break;
		}
		DecimalFormat df = new DecimalFormat(format);
		return String.valueOf(df.format(inputValue));
	}

	/**
	 * convert the "" if the number is null
	 *
	 * @param bgint the number to zero
	 * @return a number converted null to zero
	 */
	public static String nullToZero(BigDecimal bgint) {
		BigDecimal bd = new BigDecimal(0);

		if (bgint == null || bd.equals(bgint))
			return "";
		else
			return bgint.toString();
	}

	/**
	 * check whether input string is number<br>
	 * check not only <code>int</code>, <code>double</code> but also
	 * <code>long</code>, <code>float</code>
	 *
	 * <pre>
	 * NumberUtil.isNumber(&quot;12312312.2f&quot;) = true;
	 * NumberUtil.isNumber(&quot;1.7976931348623157E308&quot;) = true;
	 * </pre>
	 *
	 * @param str the <code>String</code> to check
	 * @return <code>true</code> if the string is a correctly formatted number
	 */
	public static boolean isNumber(String str) {
		if (str == null || str == "") {
			return false;
		}

		// cf.) apache commons lang NumberUtils.isNumber - ex.) 875634512312312l - true

		if (str.matches("^[-+]?\\d+(\\.\\d+)?$")) {
			return true;
		}
		else {
			// try parse double
			try {
				double doubleVal = Double.parseDouble(str);
				return true;
			}
			catch (NumberFormatException de) {
				// try BigDecimal
				try {
					BigDecimal bigDecimalVal = new BigDecimal(str);
					return true;
				}
				catch (NumberFormatException be) {
					return false;
				}
			}
		}
	}

	/**
	 * search target number for the input number and convert it to replacement
	 * number
	 *
	 * @param source number to convert
	 * @param target number to search
	 * @param replacement number to convert
	 * @return double converted number
	 */
	public static double replaceNumber(double source, int target, int replacement) {
		String sourceStr = String.valueOf(source);
		String targetStr = String.valueOf(target);
		String replacementStr = String.valueOf(replacement);

		return Double.parseDouble(sourceStr.replaceAll(targetStr, replacementStr));
	}

	/**
	 * get input string and check whether if positive/negative/whole/real
	 * number is true or not.
	 *
	 * <pre>
	 * NumberUtil.checkNumberType(&quot;1234&quot;, &quot;positive&quot;) = true;
	 * NumberUtil.checkNumberType(&quot;0.1234&quot;, &quot;positive&quot;) = true;
	 * NumberUtil.checkNumberType(&quot;-1234.12&quot;, &quot;negative&quot;) = true;
	 * NumberUtil.checkNumberType(&quot;-0.1234&quot;, &quot;negative&quot;) = true;
	 * NumberUtil.checkNumberType(&quot;1234&quot;, &quot;whole&quot;) = true;
	 * NumberUtil.checkNumberType(&quot;-1234&quot;, &quot;whole&quot;) = true;
	 * NumberUtil.checkNumberType(&quot;-1234.123&quot;, &quot;real&quot;) = true;
	 * NumberUtil.checkNumberType(&quot;1.34&quot;, &quot;real&quot;) = true;
	 * </pre>
	 *
	 * @param str number to check
	 * @param check check number type- positive, negative, whole, real number
	 * @return boolean if the input number type is true, return
	 * <code>true</code>.
	 */
	public static boolean checkNumberType(String str, String check) {
		String positivePattern = "^[+]?([1-9]\\d*|[1-9]\\d*\\.\\d*|0?\\.\\d*[1-9]\\d*)$";
		String negativePattern = "^-([1-9]\\d*|[1-9]\\d*\\.\\d*|0?\\.\\d*[1-9]\\d*)$";
		String wholePattern = "^[+-]?[1-9]\\d*$";
		String realPattern = "^[+-]?([1-9]\\d*\\.\\d*|0?\\.\\d*[1-9]\\d*)$";

		if (check.equals("positive")) {
			return Pattern.matches(positivePattern, str);
		}
		else if (check.equals("negative")) {
			return Pattern.matches(negativePattern, str);
		}
		else if (check.equals("whole")) {
			return Pattern.matches(wholePattern, str);
		}
		else if (check.equals("real")) {
			return Pattern.matches(realPattern, str);
		}
		return false;
	}
}
