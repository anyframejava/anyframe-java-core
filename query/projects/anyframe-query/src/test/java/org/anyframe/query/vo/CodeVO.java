package org.anyframe.query.vo;

import java.io.Serializable;

public class CodeVO implements Serializable {
    private String groupId;
    private String codeId;
    private String codeNm;
    private String codeDescription;
    private String codeUsage;

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public String getCodeId() {
        return codeId;
    }

    public void setCodeId(String codeId) {
        this.codeId = codeId;
    }

    public String getCodeNm() {
        return codeNm;
    }

    public void setCodeNm(String codeNm) {
        this.codeNm = codeNm;
    }

    public String getCodeDescription() {
        return codeDescription;
    }

    public void setCodeDescription(String codeDescription) {
        this.codeDescription = codeDescription;
    }

    public String getCodeUsage() {
        return codeUsage;
    }

    public void setCodeUsage(String codeUsage) {
        this.codeUsage = codeUsage;
    }
}
