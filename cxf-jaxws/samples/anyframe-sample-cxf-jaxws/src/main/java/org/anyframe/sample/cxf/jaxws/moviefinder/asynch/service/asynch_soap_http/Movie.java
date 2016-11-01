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
package org.anyframe.sample.cxf.jaxws.moviefinder.asynch.service.asynch_soap_http;

import java.math.BigDecimal;
import javax.activation.DataHandler;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlMimeType;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;

/**
 * <p>
 * Java class for movie complex type.
 * <p>
 * The following schema fragment specifies the expected
 * content contained within this class.
 * 
 * <pre>
 * &lt;complexType name=&quot;movie&quot;&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base=&quot;{http://www.w3.org/2001/XMLSchema}anyType&quot;&gt;
 *       &lt;sequence&gt;
 *         &lt;element name=&quot;posterImgDataHandler&quot; type=&quot;{http://www.w3.org/2001/XMLSchema}base64Binary&quot; minOccurs=&quot;0&quot;/&gt;
 *         &lt;element name=&quot;bdVal&quot; type=&quot;{http://www.w3.org/2001/XMLSchema}decimal&quot; minOccurs=&quot;0&quot;/&gt;
 *         &lt;element name=&quot;booleanVal&quot; type=&quot;{http://www.w3.org/2001/XMLSchema}boolean&quot;/&gt;
 *         &lt;element name=&quot;charVal&quot; type=&quot;{http://www.w3.org/2001/XMLSchema}unsignedShort&quot;/&gt;
 *         &lt;element name=&quot;characterVal&quot; type=&quot;{http://www.w3.org/2001/XMLSchema}unsignedShort&quot; minOccurs=&quot;0&quot;/&gt;
 *         &lt;element name=&quot;director&quot; type=&quot;{http://www.w3.org/2001/XMLSchema}string&quot; minOccurs=&quot;0&quot;/&gt;
 *         &lt;element name=&quot;doubleVal&quot; type=&quot;{http://www.w3.org/2001/XMLSchema}double&quot;/&gt;
 *         &lt;element name=&quot;floatVal&quot; type=&quot;{http://www.w3.org/2001/XMLSchema}float&quot;/&gt;
 *         &lt;element name=&quot;intVal&quot; type=&quot;{http://www.w3.org/2001/XMLSchema}int&quot;/&gt;
 *         &lt;element name=&quot;longVal&quot; type=&quot;{http://www.w3.org/2001/XMLSchema}long&quot;/&gt;
 *         &lt;element name=&quot;movieId&quot; type=&quot;{http://www.w3.org/2001/XMLSchema}string&quot; minOccurs=&quot;0&quot;/&gt;
 *         &lt;element name=&quot;posterImgByteArray&quot; type=&quot;{http://www.w3.org/2001/XMLSchema}base64Binary&quot; minOccurs=&quot;0&quot;/&gt;
 *         &lt;element name=&quot;shortVal&quot; type=&quot;{http://www.w3.org/2001/XMLSchema}short&quot;/&gt;
 *         &lt;element name=&quot;title&quot; type=&quot;{http://www.w3.org/2001/XMLSchema}string&quot; minOccurs=&quot;0&quot;/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "movie", propOrder = {"posterImgDataHandler", "bdVal",
    "booleanVal", "charVal", "characterVal", "director", "doubleVal",
    "floatVal", "intVal", "longVal", "movieId", "posterImgByteArray",
    "shortVal", "title" })
public class Movie {

    /** DataHanlder type for MTOM usage. */
    @XmlMimeType("application/octet-stream")
    private DataHandler posterImgDataHandler;
    /** BigDecimal type value. */
    private BigDecimal bdVal;
    /** boolean type value. */
    private boolean booleanVal;
    /** char type value. */
    @XmlSchemaType(name = "unsignedShort")
    private int charVal;
    /** Integer type value. */
    @XmlSchemaType(name = "unsignedShort")
    /** Character type value. */
    private Integer characterVal;
    /** String type value. */
    private String director;
    /** double type value. */
    private double doubleVal;
    /** float type value. */
    private float floatVal;
    /** int type value. */
    private int intVal;
    /** long type value. */
    private long longVal;
    /** String type value. */
    private String movieId;
    /** byte[] type value. */
    private byte[] posterImgByteArray;
    /** short type value. */
    private short shortVal;
    /** String type value. */
    private String title;

    /**
     * Gets the value of the posterImgDataHandler
     * property.
     * @return possible object is {@link DataHandler }
     */
    public DataHandler getPosterImgDataHandler() {
        return posterImgDataHandler;
    }

    /**
     * Sets the value of the posterImgDataHandler
     * property.
     * @param value
     *        allowed object is {@link DataHandler }
     */
    public void setPosterImgDataHandler(DataHandler value) {
        this.posterImgDataHandler = value;
    }

    /**
     * Gets the value of the bdVal property.
     * @return possible object is {@link BigDecimal }
     */
    public BigDecimal getBdVal() {
        return bdVal;
    }

    /**
     * Sets the value of the bdVal property.
     * @param value
     *        allowed object is {@link BigDecimal }
     */
    public void setBdVal(BigDecimal value) {
        this.bdVal = value;
    }

    /**
     * Gets the value of the booleanVal property.
     * @return boolean return boolean type value
     */
    public boolean isBooleanVal() {
        return booleanVal;
    }

    /**
     * Sets the value of the booleanVal property.
     * @param value
     *        boolean type value
     */
    public void setBooleanVal(boolean value) {
        this.booleanVal = value;
    }

    /**
     * Gets the value of the charVal property.
     */
    public int getCharVal() {
        return charVal;
    }

    /**
     * Sets the value of the charVal property.
     */
    public void setCharVal(int value) {
        this.charVal = value;
    }

    /**
     * Gets the value of the characterVal property.
     * @return possible object is {@link Integer }
     */
    public Integer getCharacterVal() {
        return characterVal;
    }

    /**
     * Sets the value of the characterVal property.
     * @param value
     *        allowed object is {@link Integer }
     */
    public void setCharacterVal(Integer value) {
        this.characterVal = value;
    }

    /**
     * Gets the value of the director property.
     * @return possible object is {@link String }
     */
    public String getDirector() {
        return director;
    }

    /**
     * Sets the value of the director property.
     * @param value
     *        allowed object is {@link String }
     */
    public void setDirector(String value) {
        this.director = value;
    }

    /**
     * Gets the value of the doubleVal property.
     */
    public double getDoubleVal() {
        return doubleVal;
    }

    /**
     * Sets the value of the doubleVal property.
     */
    public void setDoubleVal(double value) {
        this.doubleVal = value;
    }

    /**
     * Gets the value of the floatVal property.
     */
    public float getFloatVal() {
        return floatVal;
    }

    /**
     * Sets the value of the floatVal property.
     */
    public void setFloatVal(float value) {
        this.floatVal = value;
    }

    /**
     * Gets the value of the intVal property.
     */
    public int getIntVal() {
        return intVal;
    }

    /**
     * Sets the value of the intVal property.
     */
    public void setIntVal(int value) {
        this.intVal = value;
    }

    /**
     * Gets the value of the longVal property.
     */
    public long getLongVal() {
        return longVal;
    }

    /**
     * Sets the value of the longVal property.
     */
    public void setLongVal(long value) {
        this.longVal = value;
    }

    /**
     * Gets the value of the movieId property.
     * @return possible object is {@link String }
     */
    public String getMovieId() {
        return movieId;
    }

    /**
     * Sets the value of the movieId property.
     * @param value
     *        allowed object is {@link String }
     */
    public void setMovieId(String value) {
        this.movieId = value;
    }

    /**
     * Gets the value of the posterImgByteArray
     * property.
     * @return possible object is byte[]
     */
    public byte[] getPosterImgByteArray() {
        return posterImgByteArray;
    }

    /**
     * Sets the value of the posterImgByteArray
     * property.
     * @param value
     *        allowed object is byte[]
     */
    public void setPosterImgByteArray(byte[] value) {
        this.posterImgByteArray = ((byte[]) value);
    }

    /**
     * Gets the value of the shortVal property.
     */
    public short getShortVal() {
        return shortVal;
    }

    /**
     * Sets the value of the shortVal property.
     */
    public void setShortVal(short value) {
        this.shortVal = value;
    }

    /**
     * Gets the value of the title property.
     * @return possible object is {@link String }
     */
    public String getTitle() {
        return title;
    }

    /**
     * Sets the value of the title property.
     * @param value
     *        allowed object is {@link String }
     */
    public void setTitle(String value) {
        this.title = value;
    }

}
