/*
 * Copyright 2002-2008 the original author or authors.
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
package org.anyframe.chart.fusionchartfree.support.model.column2d;

import java.math.BigDecimal;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
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
@XmlType(name = "")
@XmlRootElement(name = "line")
public class Column2dLine {

	@XmlAttribute(name = "color")
	@XmlJavaTypeAdapter(CollapsedStringAdapter.class)
	@XmlSchemaType(name = "NMTOKEN")
	protected String color;

	@XmlAttribute(name = "displayValue")
	@XmlJavaTypeAdapter(CollapsedStringAdapter.class)
	@XmlSchemaType(name = "NCName")
	protected String displayValue;

	@XmlAttribute(name = "isTrendZone")
	protected Integer isTrendZone;

	@XmlAttribute(name = "startvalue")
	protected BigDecimal startvalue;

	@XmlAttribute(name = "thickness")
	protected Integer thickness;

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
	 * Gets the value of the displayValue property.
	 * 
	 * @return possible object is {@link String }
	 * 
	 */
	public String getDisplayValue() {
		return displayValue;
	}

	/**
	 * Sets the value of the displayValue property.
	 * 
	 * @param value allowed object is {@link String }
	 * 
	 */
	public void setDisplayValue(String value) {
		this.displayValue = value;
	}

	/**
	 * Gets the value of the isTrendZone property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getIsTrendZone() {
		return isTrendZone;
	}

	/**
	 * Sets the value of the isTrendZone property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setIsTrendZone(Integer value) {
		this.isTrendZone = value;
	}

	/**
	 * Gets the value of the startvalue property.
	 * 
	 * @return possible object is {@link BigDecimal }
	 * 
	 */
	public BigDecimal getStartvalue() {
		return startvalue;
	}

	/**
	 * Sets the value of the startvalue property.
	 * 
	 * @param value allowed object is {@link BigDecimal }
	 * 
	 */
	public void setStartvalue(BigDecimal value) {
		this.startvalue = value;
	}

	/**
	 * Gets the value of the thickness property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getThickness() {
		return thickness;
	}

	/**
	 * Sets the value of the thickness property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setThickness(Integer value) {
		this.thickness = value;
	}

}
