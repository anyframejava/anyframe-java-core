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
package org.anyframe.chart.fusionchartfree.support.model.column2dlinedual;

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
public class Column2dLineDualDataset {

	@XmlElement(required = true)
	protected List<Column2dLineDualSet> set;

	@XmlAttribute(name = "anchorBorderColor")
	@XmlJavaTypeAdapter(CollapsedStringAdapter.class)
	@XmlSchemaType(name = "NCName")
	protected String anchorBorderColor;

	@XmlAttribute(name = "color")
	@XmlJavaTypeAdapter(CollapsedStringAdapter.class)
	@XmlSchemaType(name = "NCName")
	protected String color;

	@XmlAttribute(name = "lineThickness")
	protected Integer lineThickness;

	@XmlAttribute(name = "numberPrefix")
	@XmlSchemaType(name = "anySimpleType")
	protected String numberPrefix;

	@XmlAttribute(name = "parentYAxis")
	@XmlJavaTypeAdapter(CollapsedStringAdapter.class)
	@XmlSchemaType(name = "NCName")
	protected String parentYAxis;

	@XmlAttribute(name = "seriesname")
	@XmlJavaTypeAdapter(CollapsedStringAdapter.class)
	@XmlSchemaType(name = "NCName")
	protected String seriesname;

	@XmlAttribute(name = "showValues")
	protected Integer showValues;

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
	 * {@link Column2dLineDualSet }
	 * 
	 * 
	 */
	public List<Column2dLineDualSet> getSet() {
		if (set == null) {
			set = new ArrayList<Column2dLineDualSet>();
		}
		return this.set;
	}

	public void setSet(List<Column2dLineDualSet> value) {
		this.set = value;
	}

	/**
	 * Gets the value of the anchorBorderColor property.
	 * 
	 * @return possible object is {@link String }
	 * 
	 */
	public String getAnchorBorderColor() {
		return anchorBorderColor;
	}

	/**
	 * Sets the value of the anchorBorderColor property.
	 * 
	 * @param value allowed object is {@link String }
	 * 
	 */
	public void setAnchorBorderColor(String value) {
		this.anchorBorderColor = value;
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
	 * Gets the value of the lineThickness property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getLineThickness() {
		return lineThickness;
	}

	/**
	 * Sets the value of the lineThickness property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setLineThickness(Integer value) {
		this.lineThickness = value;
	}

	/**
	 * Gets the value of the numberPrefix property.
	 * 
	 * @return possible object is {@link String }
	 * 
	 */
	public String getNumberPrefix() {
		return numberPrefix;
	}

	/**
	 * Sets the value of the numberPrefix property.
	 * 
	 * @param value allowed object is {@link String }
	 * 
	 */
	public void setNumberPrefix(String value) {
		this.numberPrefix = value;
	}

	/**
	 * Gets the value of the parentYAxis property.
	 * 
	 * @return possible object is {@link String }
	 * 
	 */
	public String getParentYAxis() {
		return parentYAxis;
	}

	/**
	 * Sets the value of the parentYAxis property.
	 * 
	 * @param value allowed object is {@link String }
	 * 
	 */
	public void setParentYAxis(String value) {
		this.parentYAxis = value;
	}

	/**
	 * Gets the value of the seriesname property.
	 * 
	 * @return possible object is {@link String }
	 * 
	 */
	public String getSeriesname() {
		return seriesname;
	}

	/**
	 * Sets the value of the seriesname property.
	 * 
	 * @param value allowed object is {@link String }
	 * 
	 */
	public void setSeriesname(String value) {
		this.seriesname = value;
	}

	/**
	 * Gets the value of the showValues property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getShowValues() {
		return showValues;
	}

	/**
	 * Sets the value of the showValues property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setShowValues(Integer value) {
		this.showValues = value;
	}

}
