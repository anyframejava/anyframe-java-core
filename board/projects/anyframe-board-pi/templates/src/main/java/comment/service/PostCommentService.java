package ${packageName}.comment.service;

import java.util.List;


import ${packageName}.comment.domain.PostComment;

/**
 * ${boardTitle}에서 게시물이 가지는 각각의 comment의 CRUD기능을 수행하기 위한 Service 클래스 
 */
public interface PostCommentService{

  	void create(PostComment postComment) throws Exception;
	
	void remove(PostComment postComment) throws Exception;
		
	void update(PostComment postComment) throws Exception;
	
	List<PostComment> list(String postId) throws Exception;
}
