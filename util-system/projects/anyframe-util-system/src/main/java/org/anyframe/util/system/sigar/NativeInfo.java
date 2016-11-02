/*
 * Copyright 2008-2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.anyframe.util.system.sigar;

import java.io.Serializable;

/**
 * This NativeInfo class is a Value Object class for native information.
 * 
 * @author ByungHun Woo
 */
public class NativeInfo implements Serializable {

	private static final long serialVersionUID = 2168282756241232076L;

	private String sigarVersionJava;

	private String sigarVersionNative;

	private String buildDateJava;

	private String buildDateNative;

	private String scmRevJava;

	private String scmRevNative;

	private String archlib;

	private String currentFqdn;

	private String hostname;

	private String language;

	private String perflibLangId;

	public String getSigarVersionJava() {
		return sigarVersionJava;
	}

	public void setSigarVersionJava(String sigarVersionJava) {
		this.sigarVersionJava = sigarVersionJava;
	}

	public String getSigarVersionNative() {
		return sigarVersionNative;
	}

	public void setSigarVersionNative(String sigarVersionNative) {
		this.sigarVersionNative = sigarVersionNative;
	}

	public String getBuildDateJava() {
		return buildDateJava;
	}

	public void setBuildDateJava(String buildDateJava) {
		this.buildDateJava = buildDateJava;
	}

	public String getBuildDateNative() {
		return buildDateNative;
	}

	public void setBuildDateNative(String buildDateNative) {
		this.buildDateNative = buildDateNative;
	}

	public String getScmRevJava() {
		return scmRevJava;
	}

	public void setScmRevJava(String scmRevJava) {
		this.scmRevJava = scmRevJava;
	}

	public String getScmRevNative() {
		return scmRevNative;
	}

	public void setScmRevNative(String scmRevNative) {
		this.scmRevNative = scmRevNative;
	}

	public String getArchlib() {
		return archlib;
	}

	public void setArchlib(String archlib) {
		this.archlib = archlib;
	}

	public String getCurrentFqdn() {
		return currentFqdn;
	}

	public void setCurrentFqdn(String currentFqdn) {
		this.currentFqdn = currentFqdn;
	}

	public String getHostname() {
		return hostname;
	}

	public void setHostname(String hostname) {
		this.hostname = hostname;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public String getPerflibLangId() {
		return perflibLangId;
	}

	public void setPerflibLangId(String perflibLangId) {
		this.perflibLangId = perflibLangId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
