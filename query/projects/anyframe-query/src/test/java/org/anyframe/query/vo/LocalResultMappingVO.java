/*
 * Copyright 2002-2012 the original author or authors.
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
package org.anyframe.query.vo;

import java.io.Serializable;

public class LocalResultMappingVO implements Serializable {
	private static final long serialVersionUID = 1L;
	
    private String groupID;
    private String groupName;
    private String codeID;
    private String codeName;
    private String codeDescription;
    private String codeUseYn;
    private CodeVO group;
    
    public CodeVO getGroup() {
        return group;
    }
    public void setGroup(CodeVO group) {
        this.group = group;
    }
    public String getGroupID() {
        return groupID;
    }
    public void setGroupID(String groupID) {
        this.groupID = groupID;
    }
    public String getGroupName() {
        return groupName;
    }
    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }
    public String getCodeID() {
        return codeID;
    }
    public void setCodeID(String codeID) {
        this.codeID = codeID;
    }
    public String getCodeName() {
        return codeName;
    }
    public void setCodeName(String codeName) {
        this.codeName = codeName;
    }
    public String getCodeDescription() {
        return codeDescription;
    }
    public void setCodeDescription(String codeDescription) {
        this.codeDescription = codeDescription;
    }
    public String getCodeUseYn() {
        return codeUseYn;
    }
    public void setCodeUseYn(String codeUseYn) {
        this.codeUseYn = codeUseYn;
    }
}
