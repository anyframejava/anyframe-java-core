package org.anyframe.plugin.flex.query.attach.web;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import org.anyframe.plugin.flex.query.domain.Attached;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller("flexQueryUploadController")
public class UploadController {

	@Value("#{contextProperties['repository.path']}")
	private String repositoryPath;

	@RequestMapping("/flexQueryUpload.do")
	public String upload(
			@RequestParam(value = "file", required = false) MultipartFile file,
			Model model) throws Exception {

		if( repositoryPath == null ){
			repositoryPath = "c:/anyframe/storage";
		}
		File filePath = new File(repositoryPath);
		if (!filePath.exists()) {
			boolean created = filePath.mkdirs();
			if (!created) {
				throw new Exception(
						"Fail to create a directory for attached file ["
								+ filePath + "]");
			}
		}

		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmssSSS",
				new Locale("ko", "KR"));

		String id = "FILE-" + formatter.format(new Date());

		file.transferTo(new File(filePath + "/" + id));

		model.addAttribute("attachedId", id);
		
		return "/flex/fileupload/uploadresult";
	}

}
