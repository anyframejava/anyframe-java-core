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

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.adapters.CollapsedStringAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

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
@XmlType(name = "", propOrder = { "set" })
@XmlRootElement(name = "dataset")
public class StackedBar2dDataset {

	@XmlElement(required = true)
	protected List<StackedBar2dSet> set;

	@XmlAttribute(name = "color")
	@XmlJavaTypeAdapter(CollapsedStringAdapter.class)
	@XmlSchemaType(name = "NMTOKEN")
	protected String color;

	@XmlAttribute(name = "seriesName")
	@XmlJavaTypeAdapter(CollapsedStringAdapter.class)
	@XmlSchemaType(name = "NCName")
	protected String seriesName;

	/**
	 * Gets the value of the set property.
	 * 
	 * <p>
	 * This accessor method returns a reference to the live list, not a
	 * snapshot. Therefore any modification you make to the returned list will
	 * be present inside the JAXB object. This is why there is not a
	 * <CODE>set</CODE> method for the set property.
	 * 
	 * <p>
	 * For example, to add a new item, do as follows:
	 * 
	 * <pre>
	 * getSet().add(newItem);
	 * </pre>
	 * 
	 * 
	 * <p>
	 * Objects of the following type(s) are allowed in the list
	 * {@link StackedBar2dSet }
	 * 
	 * 
	 */
	public List<StackedBar2dSet> getSet() {
		if (set == null) {
			set = new ArrayList<StackedBar2dSet>();
		}
		return this.set;
	}

	public void setSet(List<StackedBar2dSet> value) {
		this.set = value;
	}

	/**
	 * Gets the value of the color property.
	 * 
	 * @return possible object is {@link String }
	 * 
	 */
	public String getColor() {
		return color;
	}

	/**
	 * Sets the value of the color property.
	 * 
	 * @param value allowed object is {@link String }
	 * 
	 */
	public void setColor(String value) {
		this.color = value;
	}

	/**
	 * Gets the value of the seriesName property.
	 * 
	 * @return possible object is {@link String }
	 * 
	 */
	public String getSeriesName() {
		return seriesName;
	}

	/**
	 * Sets the value of the seriesName property.
	 * 
	 * @param value allowed object is {@link String }
	 * 
	 */
	public void setSeriesName(String value) {
		this.seriesName = value;
	}

}
