/*
 * Copyright 2008-2011 the original author or authors.
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
package org.anyframe.plugin.jquery.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * This Attached class is a Value Object class for Attached domain.
 * 
 * @author Alex, Eum
 *
 */
@Entity
@Table(name = "JQUERY_ATTACHED")
public class Attached implements Serializable {
    private static final long serialVersionUID = 1L;
    private String id;
    private String name;
    private String refId;
    private Long fileSize;
    
    private String newRefId;
    private String fileSizeString;
    private String ext;

    public String getNewRefId() {
		return newRefId;
	}

	public void setNewRefId(String newRefId) {
		this.newRefId = newRefId;
	}

	public String getFileSizeString() {
		return fileSizeString;
	}

	public void setFileSizeString(String fileSizeString) {
		this.fileSizeString = fileSizeString;
	}

	public String getExt() {
		return ext;
	}

	public void setExt(String ext) {
		this.ext = ext;
	}

	@Id
    @Column(name = "ID", unique = true, nullable = false, length = 50)
    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Column(name = "NAME")
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "REF_ID", nullable = false, length = 50)
    public String getRefId() {
        return this.refId;
    }

    public void setRefId(String refId) {
        this.refId = refId;
    }

    @Column(name = "FILE_SIZE", precision = 22, scale = 0)
    public Long getFileSize() {
        return this.fileSize;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    public String toString() {
        StringBuffer sb = new StringBuffer(getClass().getSimpleName());

        sb.append(" [");
        sb.append("id").append("='").append(getId()).append("', ");
        sb.append("name").append("='").append(getName()).append("', ");
        sb.append("refId").append("='").append(getRefId()).append("', ");
        sb.append("fileSize").append("='").append(getFileSize()).append("'");
        sb.append("]");

        return sb.toString();
    }
}
