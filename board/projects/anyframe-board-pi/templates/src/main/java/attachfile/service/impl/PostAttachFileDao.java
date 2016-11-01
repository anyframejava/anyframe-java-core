package ${packageName}.attachfile.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.anyframe.query.QueryService;
import org.anyframe.query.dao.QueryServiceDaoSupport;
import org.springframework.stereotype.Repository;
import ${packageName}.attachfile.domain.PostAttachFile;

/**
 * 파일업로드시 DB에 파일저장 정보를 쓰기위한 Dao 클래스
 */
@Repository("postAttachFileDao")
public class PostAttachFileDao extends QueryServiceDaoSupport {
	@Inject
	public void setQueryService(QueryService queryService) {
		super.setQueryService(queryService);
	}

	public void create(PostAttachFile postAttachFile) throws Exception {
		super.create("createPostAttachFile", postAttachFile);
	}

	public List<PostAttachFile> list(String postId) throws Exception {

		Object[] args = new Object[1];
		args[0] = new Object[] { "postId", postId };

		return super.findList("findPostAttachFileList", args);
	}
}