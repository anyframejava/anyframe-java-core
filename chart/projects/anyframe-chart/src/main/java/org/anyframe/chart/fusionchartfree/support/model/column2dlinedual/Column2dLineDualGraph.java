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
@XmlType(name = "", propOrder = { "categories", "dataset" })
@XmlRootElement(name = "graph")
public class Column2dLineDualGraph {

	@XmlElement(required = true)
	protected Column2dLineDualCategories categories;

	@XmlElement(required = true)
	protected List<Column2dLineDualDataset> dataset;

	@XmlAttribute(name = "PYAxisName")
	@XmlJavaTypeAdapter(CollapsedStringAdapter.class)
	@XmlSchemaType(name = "NCName")
	protected String pyAxisName;

	@XmlAttribute(name = "SYAxisName")
	@XmlJavaTypeAdapter(CollapsedStringAdapter.class)
	@XmlSchemaType(name = "NCName")
	protected String syAxisName;

	@XmlAttribute(name = "chartTopMargin")
	protected Integer chartTopMargin;

	@XmlAttribute(name = "decimalPrecision")
	protected Integer decimalPrecision;

	@XmlAttribute(name = "divLineDecimalPrecision")
	protected Integer divLineDecimalPrecision;

	@XmlAttribute(name = "limitsDecimalPrecision")
	protected Integer limitsDecimalPrecision;

	@XmlAttribute(name = "rotateNames")
	protected Integer rotateNames;

	@XmlAttribute(name = "showLegend")
	protected Integer showLegend;

	@XmlAttribute(name = "shownames")
	protected Integer shownames;

	@XmlAttribute(name = "showvalues")
	protected Integer showvalues;

	@XmlAttribute(name = "numberPrefix")
	@XmlSchemaType(name = "anySimpleType")
	protected String numberPrefix;

	@XmlAttribute(name = "numberSuffix")
	@XmlSchemaType(name = "anySimpleType")
	protected String numberSuffix;

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
	 * @return possible object is {@link Column2dLineDualCategories }
	 * 
	 */
	public Column2dLineDualCategories getCategories() {
		return categories;
	}

	/**
	 * Sets the value of the categories property.
	 * 
	 * @param value allowed object is {@link Column2dLineDualCategories }
	 * 
	 */
	public void setCategories(Column2dLineDualCategories value) {
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
	 * {@link Column2dLineDualDataset }
	 * 
	 * 
	 */
	public List<Column2dLineDualDataset> getDataset() {
		if (dataset == null) {
			dataset = new ArrayList<Column2dLineDualDataset>();
		}
		return this.dataset;
	}

	/**
	 * Gets the value of the pyAxisName property.
	 * 
	 * @return possible object is {@link String }
	 * 
	 */
	public String getPYAxisName() {
		return pyAxisName;
	}

	/**
	 * Sets the value of the pyAxisName property.
	 * 
	 * @param value allowed object is {@link String }
	 * 
	 */
	public void setPYAxisName(String value) {
		this.pyAxisName = value;
	}

	/**
	 * Gets the value of the syAxisName property.
	 * 
	 * @return possible object is {@link String }
	 * 
	 */
	public String getSYAxisName() {
		return syAxisName;
	}

	/**
	 * Sets the value of the syAxisName property.
	 * 
	 * @param value allowed object is {@link String }
	 * 
	 */
	public void setSYAxisName(String value) {
		this.syAxisName = value;
	}

	/**
	 * Gets the value of the chartTopMargin property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getChartTopMargin() {
		return chartTopMargin;
	}

	/**
	 * Sets the value of the chartTopMargin property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setChartTopMargin(Integer value) {
		this.chartTopMargin = value;
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
	 * Gets the value of the divLineDecimalPrecision property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getDivLineDecimalPrecision() {
		return divLineDecimalPrecision;
	}

	/**
	 * Sets the value of the divLineDecimalPrecision property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setDivLineDecimalPrecision(Integer value) {
		this.divLineDecimalPrecision = value;
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
	 * Gets the value of the showLegend property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getShowLegend() {
		return showLegend;
	}

	/**
	 * Sets the value of the showLegend property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setShowLegend(Integer value) {
		this.showLegend = value;
	}

	/**
	 * Gets the value of the shownames property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getShownames() {
		return shownames;
	}

	/**
	 * Sets the value of the shownames property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setShownames(Integer value) {
		this.shownames = value;
	}

	/**
	 * Gets the value of the showvalues property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getShowvalues() {
		return showvalues;
	}

	/**
	 * Sets the value of the showvalues property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setShowvalues(Integer value) {
		this.showvalues = value;
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
