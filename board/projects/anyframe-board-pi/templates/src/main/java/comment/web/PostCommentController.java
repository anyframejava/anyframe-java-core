package ${packageName}.comment.web;

import javax.inject.Inject;

import javax.inject.Named;

import ${packageName}.comment.domain.PostComment;
import ${packageName}.comment.service.PostCommentService;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * ${boardTitle}에서 게시물이 가지는 각각의 comment의 CRUD기능을 수행하기 위한 Controller 클래스 
 */
@Controller
@RequestMapping("/postcomment")
public class PostCommentController {

	@Inject
	@Named("postCommentService")
    private PostCommentService postCommentService;
    
    public void setPostCommentService(PostCommentService postCommentService) {
        this.postCommentService = postCommentService;
    }
    
    /**
     * 새로운 댓글을 생성한다.
     * @param postComment	생성될 postComment 객체
     * @throws Exception
     */
    @RequestMapping("/create.do")  
    public String create(PostComment postComment) throws Exception {
        postCommentService.create(postComment);   
        return "jsonView";        
    }
    /**
     * 기존의 댓글을 삭제한다.
     * @param postComment	삭제될 postComment 객체
     * @throws Exception
     */
    @RequestMapping("/remove.do")  
    public String remove(PostComment postComment) throws Exception {
        postCommentService.remove(postComment);   
        return "jsonView";        
    }
    
    /**
     * 기존의 댓글을 수정한다.
     * @param postComment	수정될 postComment 객체
     * @throws Exception
     */
    @RequestMapping("/update.do")  
    public String update(PostComment postComment) throws Exception {
        postCommentService.update(postComment);   
        return "jsonView";        
    }    
}

