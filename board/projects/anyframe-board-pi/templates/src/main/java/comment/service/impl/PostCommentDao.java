package ${packageName}.comment.service.impl;

import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.util.Calendar;
import java.util.List;
import org.anyframe.query.dao.QueryServiceDaoSupport;
import org.anyframe.query.QueryService;

import ${packageName}.comment.domain.PostComment;

/**
 * ${boardTitle}에서 게시물이 가지는 각각의 comment의 CRUD기능을 수행하기 위한 Dao 클래스 
 */
@Repository("postCommentDao")
public class PostCommentDao extends QueryServiceDaoSupport {
  
	@Inject
	public void setQueryService(QueryService queryService) {
		super.setQueryService(queryService);
	}
	
	public void create(PostComment postComment) throws Exception {
		postComment.setCreateDttm(Calendar.getInstance().getTime());
		postComment.setUpdateDttm(Calendar.getInstance().getTime());	
		super.create("createPostComment", postComment);
	}
	
	public void remove(String commentId) throws Exception {
		PostComment postComment = new PostComment();        
    	postComment.setCommentId(commentId);    
		super.remove("removePostComment", postComment);
	}

	public void update(PostComment postComment) throws Exception {
		postComment.setUpdateDttm(Calendar.getInstance().getTime());
		super.update("updatePostComment", postComment);
	}

	public List<PostComment> list(String postId) throws Exception {
        
        Object[] args = new Object[1];		            
		args[0] = new Object[] { "postId", postId };

        return super.findList("findPostCommentList", args);
	}
}
