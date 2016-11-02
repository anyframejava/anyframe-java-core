package ${packageName}.${boardName.toLowerCase()}.web;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.datatype.SearchVO;
import org.anyframe.pagination.Page;
import org.anyframe.util.StringUtil;

#if(${boardInfo.useComment} == 'Y')
import ${packageName}.comment.domain.PostComment;
import ${packageName}.comment.service.PostCommentService;
#end
#if(${boardInfo.useAttachFile} == 'Y')
import ${packageName}.attachfile.domain.PostAttachFile;
import ${packageName}.attachfile.service.PostAttachFileService;
#end
import ${packageName}.${boardName.toLowerCase()}.domain.${BoardName};
import ${packageName}.${boardName.toLowerCase()}.service.${BoardName}Service;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
#if(${boardInfo.boardType} == 'L')
import org.springframework.web.bind.annotation.RequestParam;
#end

/**
 * ${boardTitle}의 CRUD 기능을 수행하기 위한 Controller 클래스
 */
@Controller
@RequestMapping("/${boardName}")
public class ${BoardName}Controller {

	@Inject
	@Named("${boardName}Service")
    private ${BoardName}Service ${boardName}Service;

#if(${boardInfo.useComment} == 'Y')
	@Inject
	@Named("postCommentService")
    private PostCommentService postCommentService;
#end

#if(${boardInfo.useAttachFile} == 'Y')
	@Inject
	@Named("postAttachFileService")
	private PostAttachFileService postAttachFileService;
	private static final long K = 1024;
	private static final long M = K * K;
	private static final long G = M * K;
	private static final long T = G * K;
#end

    /**
     * 게시글 등록/수정 화면으로 이동한다
     * @param ${boardName}		등록/수정 화면 이동시 해당 게시글의 정보를 가지는 freebBoard 객체
     * @param searchVO	페이징 조건 유지 사용되는 객체
     * @throws Exception	
     */
    @RequestMapping("/form.do") 
    public String form(${BoardName} ${boardName}, SearchVO searchVO, String flag, Model model) throws Exception {  
        if (StringUtil.isNotEmpty(${boardName}.getPostId())) {
       		${boardName} = ${boardName}Service.get(${boardName}.getPostId(), searchVO, flag);        	
        	model.addAttribute("${boardName}", ${boardName});   
        	#if(${boardInfo.useAttachFile} == 'Y')	
    		List<PostAttachFile> fileUploadInfoList = postAttachFileService.list(${boardName}.getPostId());

			long fileSizeSum = 0;
			for (int i = 0; i < fileUploadInfoList.size(); i++) {
				fileSizeSum += fileUploadInfoList.get(i).getAttachFileSize();
				fileUploadInfoList.get(i).setAttachFileSizeString(convertToFileSize(fileUploadInfoList.get(i).getAttachFileSize()));   
			}
		
			model.addAttribute("fileUploadInfoList", fileUploadInfoList);
			model.addAttribute("fileUploadInfoCount", fileUploadInfoList.size());
			model.addAttribute("fileSizeSum",convertToFileSize(fileSizeSum));
        	#end
       } 
        return "${boardName.toLowerCase()}/form";   
    }

#if(${boardInfo.boardType} == 'B')

	/**
	 * 게시글 블로그 화면으로 이동한다.
	 * @param searchVO	페이징 조건 유지 사용되는 객체
	 * @throws Exception
	 */
	@RequestMapping("/blogView.do")
    public String blogView(${BoardName} ${boardName}, SearchVO searchVO, Model model) throws Exception {
		Page resultPage = ${boardName}Service.getPagingList(searchVO);

#if(${boardInfo.useAttachFile} == 'Y')		
	@SuppressWarnings("unchecked")
	List<${BoardName}> list = (List<${BoardName}>) resultPage.getList();

	List<List<PostAttachFile>> attachFileList = new ArrayList<List<PostAttachFile>>();

	for(${BoardName} ${BoardName}info : list) {
		List<PostAttachFile> postAttachFileList = postAttachFileService.list(${BoardName}info.getPostId());
		for (int i = 0; i < postAttachFileList.size(); i++) {
			postAttachFileList.get(i).setAttachFileSizeString(convertToFileSize(postAttachFileList.get(i).getAttachFileSize()));
		}
		attachFileList.add(postAttachFileList);
	}
#end


		model.addAttribute("page", String.valueOf(resultPage.getCurrentPage()));
		model.addAttribute("total", String.valueOf(resultPage.getMaxPage()));
		model.addAttribute("records", String.valueOf(resultPage.getTotalCount()));
#if(${boardInfo.useAttachFile} == 'N')		
		model.addAttribute("rows", resultPage.getList());
#else
		model.addAttribute("rows", list);
		model.addAttribute("attachFileList", attachFileList);
#end
		model.addAttribute("resultPage", resultPage);
		model.addAttribute("searchVO", searchVO);
		return "${boardName.toLowerCase()}/bloglist";
    }
#end
    
    /**
     * 게시글을 등록한다.
     * @param ${boardName}		화면상에서 기록된 게시글 정보를 가지는 freebBoard 객체
     * @throws Exception
     */
    @RequestMapping("/create.do") 
    public String form(${BoardName} ${boardName}) throws Exception {  
        ${boardName}Service.create(${boardName});   
        return "jsonView";   
    }
    
    /**
     * 해당 게시글을 수정한다.
     * @param ${boardName}		화면상에서 기록된 게시글 정보를 가지는 freebBoard 객체
     * @param searchVO	페이징 조건 유지 사용되는 객체
     * @throws Exception
     */
	@RequestMapping("/update.do")
    public String update(${BoardName} ${boardName}, SearchVO searchVO, Model model) throws Exception {
        ${boardName}Service.update(${boardName});   
        return "jsonView"; 
    }

	/**
	 * 한 개의 게시글을 삭제한다.
	 * @param postId	삭제될 게시글 ID
	 * @throws Exception
	 */
	@RequestMapping("/remove.do")
    public String remove(String postId) throws Exception {
        ${boardName}Service.remove(postId);
		return "jsonView";
	}
#if(${boardInfo.boardType} == 'L')	
	
	/**
	 * 게시글 목록을 가져온다.
	 * @param searchVO	페이징 조건 유지 사용되는 객체
	 * @throws Exception
	 */
	@RequestMapping("/list.do")
    public String list(@RequestParam("page") int page, SearchVO searchVO, Model model) throws Exception {
		searchVO.setPageIndex(page);
		Page resultPage = ${boardName}Service.getPagingList(searchVO);
		model.addAttribute("page", String.valueOf(resultPage.getCurrentPage()));
		model.addAttribute("total", String.valueOf(resultPage.getMaxPage()));
		model.addAttribute("records", String.valueOf(resultPage.getTotalCount()));
		model.addAttribute("rows", resultPage.getList());
        return "jsonView"; 
    }	

	/**
	 * 한 개 이상의 게시글을 삭제한다.
	 * @param postIds	삭제될 게시글ID 목록
	 * @throws Exception
	 */
	@RequestMapping("/removePosts.do")
    public String remove(String[] postIds) throws Exception {
        ${boardName}Service.batchRemove(postIds);
		return "jsonView";
	}

	/**
	 * 게시글 목록 화면으로 이동한다.
	 * @param searchVO	페이징 조건 유지 사용되는 객체
	 * @throws Exception
	 */
	@RequestMapping("/listView.do")
	public String listView(SearchVO searchVO, Model model) throws Exception {
		model.addAttribute("searchVO", searchVO);
	    return "${boardName.toLowerCase()}/list"; 
	}

	/**
	 * 상세조회 화면으로 이동한다.
	 * @param ${boardName}		상세조회할 게시글의 ID값을 가진 ${boardName} 객체
	 * @param searchVO	페이징 조건 유지 사용되는 객체
	 * @throws Exception
	 */
	@RequestMapping("/view.do")
    public String view(${BoardName} ${boardName}, SearchVO searchVO, String flag, Model model) throws Exception {
		if (StringUtil.isNotEmpty(${boardName}.getPostId())) {
			${boardName} = ${boardName}Service.get(${boardName}.getPostId(), searchVO, flag); 
#if(${boardInfo.useComment} == 'Y')
			List<PostComment> commentList = postCommentService.list(${boardName}.getPostId());
	       
	        model.addAttribute("commentList", commentList);
			model.addAttribute("commentCount", commentList.size());
#end 
#if(${boardInfo.useAttachFile} == 'Y')
			List<PostAttachFile> fileUploadInfoList = postAttachFileService.list(${boardName}.getPostId());

			long fileSizeSum = 0;
			for (int i = 0; i < fileUploadInfoList.size(); i++) {
				fileSizeSum += fileUploadInfoList.get(i).getAttachFileSize();
				fileUploadInfoList.get(i).setAttachFileSizeString(convertToFileSize(fileUploadInfoList.get(i).getAttachFileSize()));   
			}
		
			model.addAttribute("fileUploadInfoList", fileUploadInfoList);
			model.addAttribute("fileUploadInfoCount", fileUploadInfoList.size());
			model.addAttribute("fileSizeSum",convertToFileSize(fileSizeSum));
#end
			model.addAttribute("${boardName}", ${boardName}); 
		}
        model.addAttribute("searchVO", searchVO);
		return "${boardName.toLowerCase()}/view";
	}
#end

#if(${boardInfo.useAttachFile} == 'Y')
	/**
	 * 파일의 사이즈를 변환하여 표시하여준다.
	 * 
	 * @param value 파일 사이즈
	 * @return 파일 사이즈 문자열 ex) 128 KB
	 */
	public static String convertToFileSize(final long value){
		
	    final long[] dividers = new long[] { T, G, M, K, 1 };
	    final String[] units = new String[] { "TB", "GB", "MB", "KB", "B" };
	    if(value < 0) {
	        throw new IllegalArgumentException("Invalid file size: " + value);
	    }else if(value == 0){
	    	return "0 B";
	    }
	    String result = null;
	    for(int i = 0; i < dividers.length; i++){
	        final long divider = dividers[i];
	        if(value >= divider){
	            result = format(value, divider, units[i]);
	            break;
	        }
	    }
	    return result;
	}
	
	private static String format(final long value,
		    final long divider,
		    final String unit){
		    final double result = divider > 1 ? (double) value / (double) divider : (double) value;
		    return String.format("%.1f %s", Double.valueOf(result), unit);
	}
#end
}


