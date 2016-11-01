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
@XmlType(name = "", propOrder = { "set", "trendlines" })
@XmlRootElement(name = "graph")
public class Column2dGraph {

	@XmlElement(required = true)
	protected List<Column2dSet> set;

	@XmlElement(required = true)
	protected Column2dTrendlines trendlines;

	@XmlAttribute(name = "bgcolor")
	@XmlJavaTypeAdapter(CollapsedStringAdapter.class)
	@XmlSchemaType(name = "NCName")
	protected String bgcolor;

	@XmlAttribute(name = "caption")
	@XmlSchemaType(name = "anySimpleType")
	protected String caption;

	@XmlAttribute(name = "hovercapbg")
	@XmlJavaTypeAdapter(CollapsedStringAdapter.class)
	@XmlSchemaType(name = "NCName")
	protected String hovercapbg;

	@XmlAttribute(name = "hovercapborder")
	protected Integer hovercapborder;

	@XmlAttribute(name = "numberSuffix")
	@XmlSchemaType(name = "anySimpleType")
	protected String numberSuffix;

	@XmlAttribute(name = "numdivlines")
	protected Integer numdivlines;

	@XmlAttribute(name = "subCaption")
	@XmlSchemaType(name = "anySimpleType")
	protected String subCaption;

	@XmlAttribute(name = "xaxisname")
	@XmlJavaTypeAdapter(CollapsedStringAdapter.class)
	@XmlSchemaType(name = "NCName")
	protected String xaxisname;

	@XmlAttribute(name = "yaxismaxvalue")
	protected Integer yaxismaxvalue;

	@XmlAttribute(name = "yaxisminvalue")
	protected BigDecimal yaxisminvalue;

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
	 * {@link Column2dSet }
	 * 
	 * 
	 */
	public List<Column2dSet> getSet() {
		if (set == null) {
			set = new ArrayList<Column2dSet>();
		}
		return this.set;
	}

	public void setSet(List<Column2dSet> value) {
		this.set = value;
	}

	/**
	 * Gets the value of the trendlines property.
	 * 
	 * @return possible object is {@link Column2dTrendlines }
	 * 
	 */
	public Column2dTrendlines getTrendlines() {
		return trendlines;
	}

	/**
	 * Sets the value of the trendlines property.
	 * 
	 * @param value allowed object is {@link Column2dTrendlines }
	 * 
	 */
	public void setTrendlines(Column2dTrendlines value) {
		this.trendlines = value;
	}

	/**
	 * Gets the value of the bgcolor property.
	 * 
	 * @return possible object is {@link String }
	 * 
	 */
	public String getBgcolor() {
		return bgcolor;
	}

	/**
	 * Sets the value of the bgcolor property.
	 * 
	 * @param value allowed object is {@link String }
	 * 
	 */
	public void setBgcolor(String value) {
		this.bgcolor = value;
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
	 * Gets the value of the hovercapbg property.
	 * 
	 * @return possible object is {@link String }
	 * 
	 */
	public String getHovercapbg() {
		return hovercapbg;
	}

	/**
	 * Sets the value of the hovercapbg property.
	 * 
	 * @param value allowed object is {@link String }
	 * 
	 */
	public void setHovercapbg(String value) {
		this.hovercapbg = value;
	}

	/**
	 * Gets the value of the hovercapborder property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getHovercapborder() {
		return hovercapborder;
	}

	/**
	 * Sets the value of the hovercapborder property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setHovercapborder(Integer value) {
		this.hovercapborder = value;
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
	 * Gets the value of the numdivlines property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getNumdivlines() {
		return numdivlines;
	}

	/**
	 * Sets the value of the numdivlines property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setNumdivlines(Integer value) {
		this.numdivlines = value;
	}

	/**
	 * Gets the value of the subCaption property.
	 * 
	 * @return possible object is {@link String }
	 * 
	 */
	public String getSubCaption() {
		return subCaption;
	}

	/**
	 * Sets the value of the subCaption property.
	 * 
	 * @param value allowed object is {@link String }
	 * 
	 */
	public void setSubCaption(String value) {
		this.subCaption = value;
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
	 * Gets the value of the yaxismaxvalue property.
	 * 
	 * @return possible object is {@link Integer }
	 * 
	 */
	public Integer getYaxismaxvalue() {
		return yaxismaxvalue;
	}

	/**
	 * Sets the value of the yaxismaxvalue property.
	 * 
	 * @param value allowed object is {@link Integer }
	 * 
	 */
	public void setYaxismaxvalue(Integer value) {
		this.yaxismaxvalue = value;
	}

	/**
	 * Gets the value of the yaxisminvalue property.
	 * 
	 * @return possible object is {@link BigDecimal }
	 * 
	 */
	public BigDecimal getYaxisminvalue() {
		return yaxisminvalue;
	}

	/**
	 * Sets the value of the yaxisminvalue property.
	 * 
	 * @param value allowed object is {@link BigDecimal }
	 * 
	 */
	public void setYaxisminvalue(BigDecimal value) {
		this.yaxisminvalue = value;
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
