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

public class Category extends BaseObject implements Serializable {
	private String categoryNo;
	private String categoryName;
	private String categoryDesc;
	private String useYn;
	private String regId;
	private Date regDate;
	private String modifyId;
	private Date modifyDate;

	@Id
	public String getCategoryNo() {
		return this.categoryNo;
	}

	public void setCategoryNo(String categoryNo) {
		this.categoryNo = categoryNo;
	}

	public String getCategoryName() {
		return this.categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getCategoryDesc() {
		return this.categoryDesc;
	}

	public void setCategoryDesc(String categoryDesc) {
		this.categoryDesc = categoryDesc;
	}

	public String getUseYn() {
		return this.useYn;
	}

	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}

	public String getRegId() {
		return this.regId;
	}

	public void setRegId(String regId) {
		this.regId = regId;
	}

	public Date getRegDate() {
		return this.regDate;
	}

	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}

	public String getModifyId() {
		return this.modifyId;
	}

	public void setModifyId(String modifyId) {
		this.modifyId = modifyId;
	}

	public Date getModifyDate() {
		return this.modifyDate;
	}

	public void setModifyDate(Date modifyDate) {
		this.modifyDate = modifyDate;
	}

	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}

		if ((o == null) || (getClass() != o.getClass())) {
			return false;
		}

		Category pojo = (Category) o;

		if ((categoryName != null) ? (!categoryName.equals(pojo.categoryName))
				: (pojo.categoryName != null)) {
			return false;
		}

		if ((categoryDesc != null) ? (!categoryDesc.equals(pojo.categoryDesc))
				: (pojo.categoryDesc != null)) {
			return false;
		}

		if ((useYn != null) ? (!useYn.equals(pojo.useYn))
				: (pojo.useYn != null)) {
			return false;
		}

		if ((regId != null) ? (!regId.equals(pojo.regId))
				: (pojo.regId != null)) {
			return false;
		}

		if ((regDate != null) ? (!regDate.equals(pojo.regDate))
				: (pojo.regDate != null)) {
			return false;
		}

		if ((modifyId != null) ? (!modifyId.equals(pojo.modifyId))
				: (pojo.modifyId != null)) {
			return false;
		}

		if ((modifyDate != null) ? (!modifyDate.equals(pojo.modifyDate))
				: (pojo.modifyDate != null)) {
			return false;
		}

		return true;
	}

	public int hashCode() {
		int result = 0;
		result = ((categoryName != null) ? categoryName.hashCode() : 0);
		result = (31 * result)
				+ ((categoryDesc != null) ? categoryDesc.hashCode() : 0);
		result = (31 * result) + ((useYn != null) ? useYn.hashCode() : 0);
		result = (31 * result) + ((regId != null) ? regId.hashCode() : 0);
		result = (31 * result) + ((regDate != null) ? regDate.hashCode() : 0);
		result = (31 * result) + ((modifyId != null) ? modifyId.hashCode() : 0);
		result = (31 * result)
				+ ((modifyDate != null) ? modifyDate.hashCode() : 0);

		return result;
	}

	public String toString() {
		StringBuffer sb = new StringBuffer(getClass().getSimpleName());

		sb.append(" [");
		sb.append("categoryNo").append("='").append(getCategoryNo()).append(
				"', ");
		sb.append("categoryName").append("='").append(getCategoryName())
				.append("', ");
		sb.append("categoryDesc").append("='").append(getCategoryDesc())
				.append("', ");
		sb.append("useYn").append("='").append(getUseYn()).append("', ");
		sb.append("regId").append("='").append(getRegId()).append("', ");
		sb.append("regDate").append("='").append(getRegDate()).append("', ");
		sb.append("modifyId").append("='").append(getModifyId()).append("', ");
		sb.append("modifyDate").append("='").append(getModifyDate()).append(
				"', ");

		sb.append("]");

		return sb.toString();
	}
}
