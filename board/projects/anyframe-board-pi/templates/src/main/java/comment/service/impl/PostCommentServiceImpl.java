package ${packageName}.comment.service.impl;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import ${packageName}.comment.domain.PostComment;
import ${packageName}.comment.service.PostCommentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * ${boardTitle}에서 게시물이 가지는 각각의 comment의 CRUD기능을 수행하기 위한 Service implementation 클래스 
 */
@Service("postCommentService")
@Transactional(rollbackFor = {Exception.class}, propagation = Propagation.REQUIRED)
public class PostCommentServiceImpl implements PostCommentService {
	       
	
    private static String PREFIX_OF_COMMENT_ID = "COMMENT-";
    
    @Inject
    @Named("postCommentDao")
	private PostCommentDao postCommentDao;	
    
	public void update(PostComment postComment) throws Exception {
    	this.postCommentDao.update(postComment);
	}    
	
  	public void remove(PostComment postComment) throws Exception {
    	this.postCommentDao.remove(postComment.getCommentId());
	}    
    
  	public void create(PostComment postComment) throws Exception {
  		postComment.setCommentId(PREFIX_OF_COMMENT_ID + System.currentTimeMillis());
    	this.postCommentDao.create(postComment);
	}
	
	@Transactional(readOnly = true)
	public List<PostComment> list(String postId) throws Exception {
		return this.postCommentDao.list(postId);
	}
}
