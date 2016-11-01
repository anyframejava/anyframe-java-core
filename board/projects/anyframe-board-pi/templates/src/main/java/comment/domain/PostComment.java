package ${packageName}.comment.domain;


import java.io.Serializable;

import java.util.Date;

/**
 * ${boardTitle}의 게시물이 가지는 각각의 comment에 대한 정보를 가지고 있는 Domain 객체
 */
public class PostComment implements Serializable {
    private static final long serialVersionUID = 1L;
    private String commentId;
    private String postId;
    private String commentContent;
    private Date createDttm;
    private String createId;
    private Date updateDttm;
    private String updateId;

    public String getCommentId() {
        return this.commentId;
    }

    public void setCommentId(String commentId) {
        this.commentId = commentId;
    }

    public String getPostId() {
        return this.postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public String getCommentContent() {
        return this.commentContent;
    }

    public void setCommentContent(String commentContent) {
        this.commentContent = commentContent;
    }
    
    public Date getCreateDttm() {
        return this.createDttm;
    }

    public void setCreateDttm(Date createDttm) {
        this.createDttm = createDttm;
    }

    public String getCreateId() {
        return this.createId;
    }

    public void setCreateId(String createId) {
        this.createId = createId;
    }

    public Date getUpdateDttm() {
        return this.updateDttm;
    }

    public void setUpdateDttm(Date updateDttm) {
        this.updateDttm = updateDttm;
    }

    public String getUpdateId() {
        return this.updateId;
    }

    public void setUpdateId(String updateId) {
        this.updateId = updateId;
    }

    public String toString() {
        StringBuffer sb = new StringBuffer(getClass().getSimpleName());

        sb.append(" [");
        sb.append("commentId").append("='").append(getCommentId()).append("', ");
        sb.append("postId").append("='").append(getPostId()).append("', ");
        sb.append("commentContent").append("='").append(getCommentContent())
          .append("', ");
        sb.append("createDttm").append("='").append(getCreateDttm())
          .append("', ");
        sb.append("createId").append("='").append(getCreateId()).append("', ");
        sb.append("updateDttm").append("='").append(getUpdateDttm())
          .append("', ");
        sb.append("updateId").append("='").append(getUpdateId()).append("'");
        sb.append("]");

        return sb.toString();
    }
}
