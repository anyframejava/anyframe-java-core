/*
 * Copyright 2007-2012 the original author or authors.
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
package org.anyframe.chart.fusionchartfree.support.model.stackedbar2d;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

/**
 * <p>
 * Java class for anonymous complex type.
 * 
 * <p>
 * The following schema fragment specifies the expected content contained within
 * this class.
 * 
 * @author ByungHun Woo 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "")
@XmlRootElement(name = "set")
public class StackedBar2dSet {

	@XmlAttribute(name = "alpha")
	protected Integer alpha;

	@XmlAttribute(name = "value")
	protected Double value;

	/**
	 * Gets the value of the alpha property.
	 *
	 * @return possible object is {@link Integer }
	 *
	 */
	public Integer getAlpha() {
		return alpha;
	}

	/**
	 * Sets the value of the alpha property.
	 *
	 * @param value allowed object is {@link Integer }
	 *
	 */
	public void setAlpha(Integer value) {
		this.alpha = value;
	}

	/**
	 * Gets the value of the value property.
	 *
	 * @return possible object is {@link Double }
	 *
	 */
	public Double getValue() {
		return value;
	}

	/**
	 * Sets the value of the value property.
	 *
	 * @param value allowed object is {@link Double }
	 *
	 */
	public void setValue(Double value) {
		this.value = value;
	}

}
