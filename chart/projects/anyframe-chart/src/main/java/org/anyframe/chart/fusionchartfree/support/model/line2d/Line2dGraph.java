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
package org.anyframe.chart.fusionchartfree.support.model.line2d;

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
public class Line2dGraph {

	@XmlElement(required = true)
	protected List<Line2dSet> set;

	@XmlAttribute(name = "AlternateHGridColor")
	@XmlJavaTypeAdapter(CollapsedStringAdapter.class)
	@XmlSchemaType(name = "NCName")
	protected String alternateHGridColor;

	@XmlAttribute(name = "alternateHGridAlpha")
	protected Integer alternateHGridAlpha;

	@XmlAttribute(name = "animation")
	protected Integer animation;

	@XmlAttribute(name = "baseFontColor")
	protected Integer baseFontColor;

	@XmlAttribute(name = "canvasBorderColor")
	protected Integer canvasBorderColor;

	@XmlAttribute(name = "caption")
	@XmlSchemaType(name = "anySimpleType")
	protected String caption;

	@XmlAttribute(name = "divLineAlpha")
	protected Integer divLineAlpha;

	@XmlAttribute(name = "divLineColor")
	@XmlJavaTypeAdapter(CollapsedStringAdapter.class)
	@XmlSchemaType(name = "NCName")
	protected String divLineColor;

	@XmlAttribute(name = "numberPrefix")
	@XmlSchemaType(name = "anySimpleType")
	protected String numberPrefix;

	@XmlAttribute(name = "numberSuffix")
	@XmlSchemaType(name = "anySimpleType")
	protected String numberSuffix;

	@XmlAttribute(name = "rotateNames")
	protected Integer rotateNames;

	@XmlAttribute(name = "showAlternateHGridColor")
	protected Integer showAlternateHGridColor;

	@XmlAttribute(name = "showColumnShadow")
	protected Integer showColumnShadow;

	@XmlAttribute(name = "showNames")
	protected Integer showNames;

	@XmlAttribute(name = "showValues")
	protected Integer showValues;

	@XmlAttribute(name = "subcaption")
	@XmlSchemaType(name = "anySimpleType")
	protected String subcaption;

	@XmlAttribute(name = "xAxisName")
	@XmlJavaTypeAdapter(CollapsedStringAdapter.class)
	@XmlSchemaType(name = "NCName")
	protected String xAxisName;

	@XmlAttribute(name = "yAxisMinValue")
	protected Integer yAxisMinValue;

	@XmlAttribute(name = "yAxisName")
	@XmlJavaTypeAdapter(CollapsedStringAdapter.class)
	@XmlSchemaType(name = "NCName")
	protected String yAxisName;

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
	 * Objects of the following type(s) are allowed in the list
	 * {@link Line2dSet }
	 * 
	 * 
	 */
	public List<Line2dSet> getSet() {
		if (set == null) {
			set = new ArrayList<Line2dSet>();
		}
		return this.set;
	}

	public void setSet(List<Line2dSet> value) {
		this.set = value;
	}

	/**
	 * Gets the value of the alternateHGridColor property.
	 * 
	 * @return possible object is {@link String }
	 * 
	 */
	public String getAlternateHGridColor() {
		return alternateHGridColor;
	}

	/**
	 * Sets the value of the alternateHGridColor property.
	 * 
	 * @param value allowed object is {@link String }
	 * 
	 */
	public void setAlternateHGridColor(String value) {
		this.alternateHGridColor = value;
	}

	/**
	 * Gets the value of the alternateHGridAlpha property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getAlternateHGridAlpha() {
		return alternateHGridAlpha;
	}

	/**
	 * Sets the value of the alternateHGridAlpha property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setAlternateHGridAlpha(Integer value) {
		this.alternateHGridAlpha = value;
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
	 * Gets the value of the baseFontColor property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getBaseFontColor() {
		return baseFontColor;
	}

	/**
	 * Sets the value of the baseFontColor property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setBaseFontColor(Integer value) {
		this.baseFontColor = value;
	}

	/**
	 * Gets the value of the canvasBorderColor property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getCanvasBorderColor() {
		return canvasBorderColor;
	}

	/**
	 * Sets the value of the canvasBorderColor property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setCanvasBorderColor(Integer value) {
		this.canvasBorderColor = value;
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
	 * Gets the value of the divLineAlpha property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getDivLineAlpha() {
		return divLineAlpha;
	}

	/**
	 * Sets the value of the divLineAlpha property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setDivLineAlpha(Integer value) {
		this.divLineAlpha = value;
	}

	/**
	 * Gets the value of the divLineColor property.
	 * 
	 * @return possible object is {@link String }
	 * 
	 */
	public String getDivLineColor() {
		return divLineColor;
	}

	/**
	 * Sets the value of the divLineColor property.
	 * 
	 * @param value allowed object is {@link String }
	 * 
	 */
	public void setDivLineColor(String value) {
		this.divLineColor = value;
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
	 * Gets the value of the rotateNames property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getRotateNames() {
		return rotateNames;
	}

	/**
	 * Sets the value of the rotateNames property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setRotateNames(Integer value) {
		this.rotateNames = value;
	}

	/**
	 * Gets the value of the showAlternateHGridColor property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getShowAlternateHGridColor() {
		return showAlternateHGridColor;
	}

	/**
	 * Sets the value of the showAlternateHGridColor property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setShowAlternateHGridColor(Integer value) {
		this.showAlternateHGridColor = value;
	}

	/**
	 * Gets the value of the showColumnShadow property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getShowColumnShadow() {
		return showColumnShadow;
	}

	/**
	 * Sets the value of the showColumnShadow property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setShowColumnShadow(Integer value) {
		this.showColumnShadow = value;
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

	/**
	 * Gets the value of the subcaption property.
	 * 
	 * @return possible object is {@link String }
	 * 
	 */
	public String getSubcaption() {
		return subcaption;
	}

	/**
	 * Sets the value of the subcaption property.
	 * 
	 * @param value allowed object is {@link String }
	 * 
	 */
	public void setSubcaption(String value) {
		this.subcaption = value;
	}

	/**
	 * Gets the value of the xAxisName property.
	 * 
	 * @return possible object is {@link String }
	 * 
	 */
	public String getXAxisName() {
		return xAxisName;
	}

	/**
	 * Sets the value of the xAxisName property.
	 * 
	 * @param value allowed object is {@link String }
	 * 
	 */
	public void setXAxisName(String value) {
		this.xAxisName = value;
	}

	/**
	 * Gets the value of the yAxisMinValue property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getYAxisMinValue() {
		return yAxisMinValue;
	}

	/**
	 * Sets the value of the yAxisMinValue property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setYAxisMinValue(Integer value) {
		this.yAxisMinValue = value;
	}

	/**
	 * Gets the value of the yAxisName property.
	 * 
	 * @return possible object is {@link String }
	 * 
	 */
	public String getYAxisName() {
		return yAxisName;
	}

	/**
	 * Sets the value of the yAxisName property.
	 * 
	 * @param value allowed object is {@link String }
	 * 
	 */
	public void setYAxisName(String value) {
		this.yAxisName = value;
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
