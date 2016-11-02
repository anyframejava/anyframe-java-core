package ${packageName}.attachfile.service.impl;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import ${packageName}.attachfile.domain.PostAttachFile;
import ${packageName}.attachfile.service.PostAttachFileService;

@Service("postAttachFileService")
@Transactional(rollbackFor = {Exception.class}, propagation = Propagation.REQUIRED)
public class PostAttachFileServiceImpl implements PostAttachFileService {

	@Inject
	@Named("postAttachFileDao")
	PostAttachFileDao postAttachFileDao;

	public boolean save(PostAttachFile fInfo) throws Exception{
		try {
			postAttachFileDao.create(fInfo);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		return true;
	}

	@Transactional(readOnly = true)
	public List<PostAttachFile> list(String postId) throws Exception {
		return this.postAttachFileDao.list(postId);
	}
}
