/*
 * Copyright 2002-2009 the original author or authors.
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
package anyframe.sample.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Id;

import anyframe.core.generic.model.BaseObject;

public class Product extends BaseObject implements Serializable {
	private String prodNo;
	private String prodName;
	private String sellerId;
	private String prodDetail;
	private String manufactureDay;
	private String asYn;
	private Long sellQuantity;
	private Long sellAmount;
	private String imageFile;
	private Date regDate;

	@Id
	public String getProdNo() {
		return this.prodNo;
	}

	public void setProdNo(String prodNo) {
		this.prodNo = prodNo;
	}
	
	public String getProdName() {
		return this.prodName;
	}

	public void setProdName(String prodName) {
		this.prodName = prodName;
	}

	public String getSellerId() {
		return this.sellerId;
	}

	public void setSellerId(String sellerId) {
		this.sellerId = sellerId;
	}

	public String getProdDetail() {
		return this.prodDetail;
	}

	public void setProdDetail(String prodDetail) {
		this.prodDetail = prodDetail;
	}

	public String getManufactureDay() {
		return this.manufactureDay;
	}

	public void setManufactureDay(String manufactureDay) {
		this.manufactureDay = manufactureDay;
	}

	public String getAsYn() {
		return this.asYn;
	}

	public void setAsYn(String asYn) {
		this.asYn = asYn;
	}

	public Long getSellQuantity() {
		return this.sellQuantity;
	}

	public void setSellQuantity(Long sellQuantity) {
		this.sellQuantity = sellQuantity;
	}

	public Long getSellAmount() {
		return this.sellAmount;
	}

	public void setSellAmount(Long sellAmount) {
		this.sellAmount = sellAmount;
	}

	public String getImageFile() {
		return this.imageFile;
	}

	public void setImageFile(String imageFile) {
		this.imageFile = imageFile;
	}

	public Date getRegDate() {
		return this.regDate;
	}

	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}

	public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if ((o == null) || (getClass() != o.getClass())) {
            return false;
        }

        Product pojo = (Product) o;

        if ((prodName != null) ? (!prodName.equals(pojo.prodName))
                                   : (pojo.prodName != null)) {
            return false;
        }

        if ((sellerId != null) ? (!sellerId.equals(pojo.sellerId))
                                   : (pojo.sellerId != null)) {
            return false;
        }

        if ((prodDetail != null) ? (!prodDetail.equals(pojo.prodDetail))
                                     : (pojo.prodDetail != null)) {
            return false;
        }

        if ((manufactureDay != null)
                ? (!manufactureDay.equals(pojo.manufactureDay))
                    : (pojo.manufactureDay != null)) {
            return false;
        }

        if ((asYn != null) ? (!asYn.equals(pojo.asYn)) : (pojo.asYn != null)) {
            return false;
        }

        if ((sellQuantity != null) ? (!sellQuantity.equals(pojo.sellQuantity))
                                       : (pojo.sellQuantity != null)) {
            return false;
        }

        if ((sellAmount != null) ? (!sellAmount.equals(pojo.sellAmount))
                                     : (pojo.sellAmount != null)) {
            return false;
        }

        if ((imageFile != null) ? (!imageFile.equals(pojo.imageFile))
                                    : (pojo.imageFile != null)) {
            return false;
        }

        if ((regDate != null) ? (!regDate.equals(pojo.regDate))
                                  : (pojo.regDate != null)) {
            return false;
        }

        return true;
    }

	public int hashCode() {
        int result = 0;
        result = (31 * result) + ((prodName != null) ? prodName.hashCode() : 0);
        result = (31 * result) + ((sellerId != null) ? sellerId.hashCode() : 0);
        result = (31 * result) +
            ((prodDetail != null) ? prodDetail.hashCode() : 0);
        result = (31 * result) +
            ((manufactureDay != null) ? manufactureDay.hashCode() : 0);
        result = (31 * result) + ((asYn != null) ? asYn.hashCode() : 0);
        result = (31 * result) +
            ((sellQuantity != null) ? sellQuantity.hashCode() : 0);
        result = (31 * result) +
            ((sellAmount != null) ? sellAmount.hashCode() : 0);
        result = (31 * result) +
            ((imageFile != null) ? imageFile.hashCode() : 0);
        result = (31 * result) + ((regDate != null) ? regDate.hashCode() : 0);

        return result;
    }

	public String toString() {
		StringBuffer sb = new StringBuffer(getClass().getSimpleName());

		sb.append(" [");
		sb.append("prodNo").append("='").append(getProdNo()).append("', ");

		sb.append("prodName").append("='").append(getProdName()).append("', ");
		sb.append("sellerId").append("='").append(getSellerId()).append("', ");
		sb.append("prodDetail").append("='").append(getProdDetail()).append(
				"', ");
		sb.append("manufactureDay").append("='").append(getManufactureDay())
				.append("', ");
		sb.append("asYn").append("='").append(getAsYn()).append("', ");
		sb.append("sellQuantity").append("='").append(getSellQuantity())
				.append("', ");
		sb.append("sellAmount").append("='").append(getSellAmount()).append(
				"', ");
		sb.append("imageFile").append("='").append(getImageFile())
				.append("', ");
		sb.append("regDate").append("='").append(getRegDate()).append("'");
		sb.append("]");

		return sb.toString();
	}
}
