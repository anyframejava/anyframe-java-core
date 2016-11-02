package ${packageName}.attachfile.service;

import java.io.IOException;
import java.util.List;

import org.apache.commons.fileupload.FileUploadException;

import ${packageName}.attachfile.domain.PostAttachFile;

/**
 * 첨부파일 저장/리스트 출력을 위한 서비스 인터페이스
 * 
 * @author Heewon Jung
 *
 */
public interface PostAttachFileService {

	public boolean save(PostAttachFile fInfo)
			throws FileUploadException, IOException, Exception;

	List<PostAttachFile> list(String postId) throws Exception;
}
