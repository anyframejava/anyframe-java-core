package org.anyframe.query.vo;

import java.io.Serializable;

public class LocalResultMappingVO implements Serializable {
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
