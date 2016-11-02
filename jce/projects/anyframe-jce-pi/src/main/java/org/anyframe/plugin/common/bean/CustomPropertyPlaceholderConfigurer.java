package org.anyframe.plugin.common.bean;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashSet;
import java.util.List;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.Set;

import org.anyframe.plugin.common.util.EncryptionUtil;
import org.anyframe.plugin.common.util.IPropertiesAccess;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;
import org.springframework.core.io.Resource;
import org.springframework.util.ObjectUtils;

/**
 * 특화된 SpringFramework property set 방식. SpringFramework 의 Property 지정 방식에 몇가지
 * 기능을 추가 함.
 * <ol>
 * <li>@Property annotation 으로 Bean을 XML config에 등록 안하고 property 를 받을 수 있는 기능</li>
 * <li>Property 가 타 property 를 참조 할 수 있는 기능 (${property이름} syntax 사용하여</li>
 * <li>Password 들이 암호화 되었는지에 대한 check</li>
 * </ol>
 * 
 * @author uchung
 */
public class CustomPropertyPlaceholderConfigurer extends
		PropertyPlaceholderConfigurer implements IPropertiesAccess {

	private static final Log log = LogFactory
			.getLog(CustomPropertyPlaceholderConfigurer.class);
	private Properties properties;
	private Resource[] locations;
	private Properties propTmp;

	public CustomPropertyPlaceholderConfigurer() {
	}

	/**
	 * destroy
	 */
	public void destroy() {
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	protected void loadProperties(Properties props) throws IOException {
		if (locations != null) {
			List<Resource> resources = new ArrayList<Resource>(locations.length);
			for (Resource r : locations) {
				String desc = r.getDescription();
				if (desc.indexOf("file:") != -1) {
					if (desc.indexOf("${") == -1) {
						try {
							URL url = r.getURL();
							if (new File(url.getPath()).isFile()) {
								resources.add(r);
							}
						} catch (IOException e) {
							log.warn(e.getMessage(), e);
						}
					}
				} else {
					resources.add(r);
				}
			}
			locations = new Resource[resources.size()];
			resources.toArray(locations);
			setLocations(locations);
		}
		super.loadProperties(props);
	}

	/**
	 * {@inheritDoc}
	 */
	public void setLocations(Resource[] locations) {
		this.locations = locations;
		super.setLocations(locations);
	}

	/**
	 * configuration file 들을 찾을 global location 들
	 * 
	 * @param locations
	 */
	public void setGlobalLocations(Resource[] locations) {
		if (locations != null && locations.length > 0) {
			Properties p = new Properties();
			for (Resource r : locations) {
				try {
					p.load(r.getInputStream());
				} catch (IOException e) {
					// 그냥 무시
				}
			}
			for (Entry<Object, Object> entry : p.entrySet()) {
				System.setProperty((String) entry.getKey(),
						(String) entry.getValue());
			}
		}
	}

	/**
	 * {@inheritDoc}
	 */
	@SuppressWarnings("unchecked")
	protected void convertProperties(Properties props) {
		propTmp = props;
		Enumeration<String> propertyNames = (Enumeration<String>) props
				.propertyNames();
		Set<String> visited = new HashSet<String>();
		while (propertyNames.hasMoreElements()) {
			String propertyName = propertyNames.nextElement();
			String propertyValue = props.getProperty(propertyName);
			String convertedValue = convertPropertyValue(propertyValue, props,
					visited);
			// if (propertyName.endsWith(".password") &&
			// EncryptionUtil.isEncryptedText(convertedValue)) {
			// convertedValue = EncryptionUtil.decrypt(convertedValue);
			// }
			visited.clear();
			if (!ObjectUtils.nullSafeEquals(propertyValue, convertedValue)) {
				props.setProperty(propertyName, convertedValue);
			}
		}
	}

	private String convertPropertyValue(String originalValue, Properties props,
			Set<String> visited) {
		if (originalValue == null)
			return null;
		int idx = originalValue.indexOf(DEFAULT_PLACEHOLDER_PREFIX);
		if (idx == -1)
			return originalValue;
		idx = originalValue.indexOf(DEFAULT_PLACEHOLDER_SUFFIX);
		if (idx == -1)
			return originalValue;
		return parseStringValue(originalValue, props, visited);
	}

	/**
	 * {@inheritDoc}
	 */
	protected String resolveSystemProperty(String key) {

		String value = super.resolveSystemProperty(key);

		value = propTmp.getProperty(key);

		if (false||key.toLowerCase().endsWith("password") && value != null
				&& value.length() > 0) {
			if (EncryptionUtil.isEncryptedText(value)) {
				return EncryptionUtil.decrypt(value);
			}
			String msg = "\n\n***************************************************\n"
					+ "보안 규정상 plain text비밀번호는 허용되지 않습니다. \n환경 변수 "
					+ key
					+ "를 바꾸십시요.\n"
					+ "Encrypt 를 실행하여 암호화 된 비밀번호를 만드실 수 있습니다.\n"
					+ "***************************************************";
			log.error(msg);
			throw new IllegalArgumentException(msg);
		} 
		else if (key.toLowerCase().endsWith("url") && value != null
				&& value.length() > 0) {
			if (EncryptionUtil.isEncryptedText(value)) {
				return EncryptionUtil.decrypt(value);
			}
			String msg = "\n\n***************************************************\n"
					+ "보안 규정상 IP 정보는 허용되지 않습니다. \n환경 변수 "
					+ key
					+ "를 바꾸십시요.\n"
					+ "Encrypt 를 실행하여 암호화 된 비밀번호를 만드실 수 있습니다.\n"
					+ "***************************************************";
			log.error(msg);
			throw new IllegalArgumentException(msg);
		}
		return value;
	}

	/**
	 * {@inheritDoc}
	 */
	public String get(String name) {
		return properties.getProperty(name);
	}

	/**
	 * {@inheritDoc}
	 */
	public String get(String name, String defaultValue) {
		return properties.containsKey(name) ? properties.getProperty(name)
				: defaultValue;
	}

	/**
	 * {@inheritDoc}
	 */
	public void set(String name, String value) {
		properties.put(name, value);
	}
}
