package org.anyframe.util.properties.impl;

import java.io.FileOutputStream;
import java.util.Enumeration;
import java.util.Hashtable;
import java.util.Properties;

import org.springframework.core.io.Resource;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;

public class PropertiesServiceDynamicReloadTest extends
		AbstractDependencyInjectionSpringContextTests {

	private PropertiesServiceImpl propertiesService;

	public void setPropertiesService(PropertiesServiceImpl propertiesService) {
		this.propertiesService = propertiesService;
	}

	/**
	 * overrided
	 * 
	 * @return String[]
	 */
	protected String[] getConfigLocations() {
		return new String[] { "classpath*:/spring/context-*.xml" };
	}

	public void testDynamicReload() throws Exception {
		Boolean fstDynamicReload = propertiesService
				.getBoolean("dynamic.reload");

		Hashtable resources = propertiesService.getResources();
		Enumeration en = resources.keys();

		Resource dynamicReloadResource = null;
		while (en.hasMoreElements()) {
			Resource resource = (Resource) en.nextElement();
			if (resource.getFilename().equals(
					"dynamic-reload-resource.properties")) {
				dynamicReloadResource = resource;
			}
		}

		Properties props = new Properties();
		props.put("dynamic.reload", fstDynamicReload ? "false" : "true");
		FileOutputStream fos = new FileOutputStream(dynamicReloadResource
				.getFile());
		props.store(fos, "");
		fos.flush();
		fos.close();

		Thread.sleep(3000);
		//After reloading properties files, the all existing properties are deleted.  
		
		Boolean scdDynamicReload = propertiesService
				.getBoolean("dynamic.reload");
		assertNotSame("fail to reload dynamically", fstDynamicReload,
				scdDynamicReload);
		assertEquals(propertiesService.getString("AAAA",""),"");
	}
}
