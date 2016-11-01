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
@XmlType(name = "", propOrder = { "categories", "dataset" })
@XmlRootElement(name = "graph")
public class StackedBar2dGraph {

	@XmlElement(required = true)
	protected StackedBar2dCategories categories;

	@XmlElement(required = true)
	protected List<StackedBar2dDataset> dataset;

	@XmlAttribute(name = "alpha")
	protected Integer alpha;

	@XmlAttribute(name = "animation")
	protected Integer animation;

	@XmlAttribute(name = "caption")
	@XmlSchemaType(name = "anySimpleType")
	protected String caption;

	@XmlAttribute(name = "decimalPrecision")
	protected Integer decimalPrecision;

	@XmlAttribute(name = "limitsDecimalPrecision")
	protected Integer limitsDecimalPrecision;

	@XmlAttribute(name = "lineThickness")
	protected Integer lineThickness;

	@XmlAttribute(name = "numDivLines")
	protected Integer numDivLines;

	@XmlAttribute(name = "numberPrefix")
	@XmlSchemaType(name = "anySimpleType")
	protected String numberPrefix;

	@XmlAttribute(name = "numberSuffix")
	@XmlSchemaType(name = "anySimpleType")
	protected String numberSuffix;

	@XmlAttribute(name = "rotateNames")
	protected Integer rotateNames;

	@XmlAttribute(name = "showLimits")
	protected Integer showLimits;

	@XmlAttribute(name = "showNames")
	protected Integer showNames;

	@XmlAttribute(name = "showValues")
	protected Integer showValues;

	@XmlAttribute(name = "subcaption")
	@XmlSchemaType(name = "anySimpleType")
	protected String subcaption;

	@XmlAttribute(name = "xaxisname")
	@XmlJavaTypeAdapter(CollapsedStringAdapter.class)
	@XmlSchemaType(name = "NCName")
	protected String xaxisname;

	@XmlAttribute(name = "yaxisname")
	@XmlJavaTypeAdapter(CollapsedStringAdapter.class)
	@XmlSchemaType(name = "NCName")
	protected String yaxisname;

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
	 * Gets the value of the categories property.
	 * 
	 * @return possible object is {@link StackedBar2dCategories }
	 * 
	 */
	public StackedBar2dCategories getCategories() {
		return categories;
	}

	/**
	 * Sets the value of the categories property.
	 * 
	 * @param value allowed object is {@link StackedBar2dCategories }
	 * 
	 */
	public void setCategories(StackedBar2dCategories value) {
		this.categories = value;
	}

	/**
	 * Gets the value of the dataset property.
	 * 
	 * <p>
	 * This accessor method returns a reference to the live list, not a
	 * snapshot. Therefore any modification you make to the returned list will
	 * be present inside the JAXB object. This is why there is not a
	 * <CODE>set</CODE> method for the dataset property.
	 * 
	 * <p>
	 * For example, to add a new item, do as follows:
	 * 
	 * <pre>
	 * getDataset().add(newItem);
	 * </pre>
	 * 
	 * 
	 * <p>
	 * Objects of the following type(s) are allowed in the list
	 * {@link StackedBar2dDataset }
	 * 
	 * 
	 */
	public List<StackedBar2dDataset> getDataset() {
		if (dataset == null) {
			dataset = new ArrayList<StackedBar2dDataset>();
		}
		return this.dataset;
	}

	public void setDataset(List<StackedBar2dDataset> value) {
		this.dataset = value;
	}

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
	 * Gets the value of the limitsDecimalPrecision property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getLimitsDecimalPrecision() {
		return limitsDecimalPrecision;
	}

	/**
	 * Sets the value of the limitsDecimalPrecision property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setLimitsDecimalPrecision(Integer value) {
		this.limitsDecimalPrecision = value;
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
	 * Gets the value of the numDivLines property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getNumDivLines() {
		return numDivLines;
	}

	/**
	 * Sets the value of the numDivLines property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setNumDivLines(Integer value) {
		this.numDivLines = value;
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
	 * Gets the value of the showLimits property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getShowLimits() {
		return showLimits;
	}

	/**
	 * Sets the value of the showLimits property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setShowLimits(Integer value) {
		this.showLimits = value;
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
	 * Gets the value of the xaxisname property.
	 * 
	 * @return possible object is {@link String }
	 * 
	 */
	public String getXaxisname() {
		return xaxisname;
	}

	/**
	 * Sets the value of the xaxisname property.
	 * 
	 * @param value allowed object is {@link String }
	 * 
	 */
	public void setXaxisname(String value) {
		this.xaxisname = value;
	}

	/**
	 * Gets the value of the yaxisname property.
	 * 
	 * @return possible object is {@link String }
	 * 
	 */
	public String getYaxisname() {
		return yaxisname;
	}

	/**
	 * Sets the value of the yaxisname property.
	 * 
	 * @param value allowed object is {@link String }
	 * 
	 */
	public void setYaxisname(String value) {
		this.yaxisname = value;
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
