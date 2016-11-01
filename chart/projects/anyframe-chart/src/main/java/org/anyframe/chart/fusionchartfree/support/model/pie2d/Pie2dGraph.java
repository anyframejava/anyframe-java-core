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
package org.anyframe.chart.fusionchartfree.support.model.pie2d;

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
@XmlRootElement(name = "graph")
public class Pie2dGraph {

	@XmlElement(required = true)
	protected List<Pie2dSet> set;

	@XmlAttribute(name = "animation")
	protected Integer animation;

	@XmlAttribute(name = "caption")
	@XmlSchemaType(name = "anySimpleType")
	protected String caption;

	@XmlAttribute(name = "decimalPrecision")
	protected Integer decimalPrecision;

	@XmlAttribute(name = "numberPrefix")
	@XmlSchemaType(name = "anySimpleType")
	protected String numberPrefix;

	@XmlAttribute(name = "numberSuffix")
	@XmlSchemaType(name = "anySimpleType")
	protected String numberSuffix;

	@XmlAttribute(name = "pieBorderAlpha")
	protected Integer pieBorderAlpha;

	@XmlAttribute(name = "pieBorderColor")
	@XmlJavaTypeAdapter(CollapsedStringAdapter.class)
	@XmlSchemaType(name = "NCName")
	protected String pieBorderColor;

	@XmlAttribute(name = "pieFillAlpha")
	protected Integer pieFillAlpha;

	@XmlAttribute(name = "pieRadius")
	protected Integer pieRadius;

	@XmlAttribute(name = "pieYScale")
	protected Integer pieYScale;

	@XmlAttribute(name = "shadowAlpha")
	protected Integer shadowAlpha;

	@XmlAttribute(name = "shadowXShift")
	protected Integer shadowXShift;

	@XmlAttribute(name = "shadowYShift")
	protected Integer shadowYShift;

	@XmlAttribute(name = "showNames")
	protected Integer showNames;

	@XmlAttribute(name = "showPercentageInLabel")
	protected Integer showPercentageInLabel;

	@XmlAttribute(name = "showPercentageValues")
	protected Integer showPercentageValues;

	@XmlAttribute(name = "showValues")
	protected Integer showValues;

	@XmlAttribute(name = "formatNumberScale")
	protected Integer formatNumberScale;

	@XmlAttribute(name = "formatNumber")
	protected Integer formatNumber;

	@XmlAttribute(name = "decimalSeparator")
	@XmlSchemaType(name = "anySimpleType")
	protected String decimalSeparator;

	@XmlAttribute(name = "thousandSeparator")
	@XmlSchemaType(name = "anySimpleType")
	protected String thousandSeparator;

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
	 * Objects of the following type(s) are allowed in the list {@link Pie2dSet }
	 * 
	 * 
	 */
	public List<Pie2dSet> getSet() {
		if (set == null) {
			set = new ArrayList<Pie2dSet>();
		}
		return this.set;
	}

	public void setSet(List<Pie2dSet> set) {
		this.set = set;
	}

	/**
	 * Gets the value of the animation property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getAnimation() {
		return animation;
	}

	/**
	 * Sets the value of the animation property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setAnimation(Integer value) {
		this.animation = value;
	}

	/**
	 * Gets the value of the caption property.
	 * 
	 * @return possible object is {@link String }
	 * 
	 */
	public String getCaption() {
		return caption;
	}

	/**
	 * Sets the value of the caption property.
	 * 
	 * @param value allowed object is {@link String }
	 * 
	 */
	public void setCaption(String value) {
		this.caption = value;
	}

	/**
	 * Gets the value of the decimalPrecision property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getDecimalPrecision() {
		return decimalPrecision;
	}

	/**
	 * Sets the value of the decimalPrecision property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setDecimalPrecision(Integer value) {
		this.decimalPrecision = value;
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
	 * Gets the value of the numberSuffix property.
	 * 
	 * @return possible object is {@link String }
	 * 
	 */
	public String getNumberSuffix() {
		return numberSuffix;
	}

	/**
	 * Sets the value of the numberSuffix property.
	 * 
	 * @param value allowed object is {@link String }
	 * 
	 */
	public void setNumberSuffix(String value) {
		this.numberSuffix = value;
	}

	/**
	 * Gets the value of the pieBorderAlpha property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getPieBorderAlpha() {
		return pieBorderAlpha;
	}

	/**
	 * Sets the value of the pieBorderAlpha property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setPieBorderAlpha(Integer value) {
		this.pieBorderAlpha = value;
	}

	/**
	 * Gets the value of the pieBorderColor property.
	 * 
	 * @return possible object is {@link String }
	 * 
	 */
	public String getPieBorderColor() {
		return pieBorderColor;
	}

	/**
	 * Sets the value of the pieBorderColor property.
	 * 
	 * @param value allowed object is {@link String }
	 * 
	 */
	public void setPieBorderColor(String value) {
		this.pieBorderColor = value;
	}

	/**
	 * Gets the value of the pieFillAlpha property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getPieFillAlpha() {
		return pieFillAlpha;
	}

	/**
	 * Sets the value of the pieFillAlpha property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setPieFillAlpha(Integer value) {
		this.pieFillAlpha = value;
	}

	/**
	 * Gets the value of the pieRadius property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getPieRadius() {
		return pieRadius;
	}

	/**
	 * Sets the value of the pieRadius property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setPieRadius(Integer value) {
		this.pieRadius = value;
	}

	/**
	 * Gets the value of the pieYScale property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getPieYScale() {
		return pieYScale;
	}

	/**
	 * Sets the value of the pieYScale property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setPieYScale(Integer value) {
		this.pieYScale = value;
	}

	/**
	 * Gets the value of the shadowAlpha property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getShadowAlpha() {
		return shadowAlpha;
	}

	/**
	 * Sets the value of the shadowAlpha property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setShadowAlpha(Integer value) {
		this.shadowAlpha = value;
	}

	/**
	 * Gets the value of the shadowXShift property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getShadowXShift() {
		return shadowXShift;
	}

	/**
	 * Sets the value of the shadowXShift property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setShadowXShift(Integer value) {
		this.shadowXShift = value;
	}

	/**
	 * Gets the value of the shadowYShift property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getShadowYShift() {
		return shadowYShift;
	}

	/**
	 * Sets the value of the shadowYShift property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setShadowYShift(Integer value) {
		this.shadowYShift = value;
	}

	/**
	 * Gets the value of the showNames property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getShowNames() {
		return showNames;
	}

	/**
	 * Sets the value of the showNames property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setShowNames(Integer value) {
		this.showNames = value;
	}

	/**
	 * Gets the value of the showPercentageInLabel property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getShowPercentageInLabel() {
		return showPercentageInLabel;
	}

	/**
	 * Sets the value of the showPercentageInLabel property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setShowPercentageInLabel(Integer value) {
		this.showPercentageInLabel = value;
	}

	/**
	 * Gets the value of the showPercentageValues property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getShowPercentageValues() {
		return showPercentageValues;
	}

	/**
	 * Sets the value of the showPercentageValues property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setShowPercentageValues(Integer value) {
		this.showPercentageValues = value;
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

	public Integer getFormatNumberScale() {
		return formatNumberScale;
	}

	public void setFormatNumberScale(Integer formatNumberScale) {
		this.formatNumberScale = formatNumberScale;
	}

	public Integer getFormatNumber() {
		return formatNumber;
	}

	public void setFormatNumber(Integer formatNumber) {
		this.formatNumber = formatNumber;
	}

	public String getDecimalSeparator() {
		return decimalSeparator;
	}

	public void setDecimalSeparator(String decimalSeparator) {
		this.decimalSeparator = decimalSeparator;
	}

	public String getThousandSeparator() {
		return thousandSeparator;
	}

	public void setThousandSeparator(String thousandSeparator) {
		this.thousandSeparator = thousandSeparator;
	}

}
