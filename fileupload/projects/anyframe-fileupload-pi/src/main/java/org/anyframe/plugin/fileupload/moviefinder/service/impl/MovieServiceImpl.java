/*
 * Copyright 2008-2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.anyframe.plugin.fileupload.moviefinder.service.impl;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.fileupload.domain.AttachedFile;
import org.anyframe.plugin.fileupload.domain.Movie;
import org.anyframe.plugin.fileupload.moviefinder.service.MovieService;
import org.anyframe.plugin.fileupload.sftp.service.SftpService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

/**
 * This MovieServiceImpl class is an Implementation class to provide movie crud
 * functionality.
 * 
 * @author Sooyeon Park
 */
@Service("fileUploadMovieService")
@Transactional(rollbackFor = { Exception.class }, propagation = Propagation.REQUIRED)
public class MovieServiceImpl implements MovieService {

	@Inject
	@Named("fileUploadMovieDao")
	private MovieDao movieDao;

	@Inject
	@Named("sftpService")
	private SftpService sftpService;

	@Inject
	@Named("fileUploadInfoDao")
	private UploadInfoDao uploadInfoDao;

	@Value("#{contextProperties['repository.path']}")
	private String repositoryPath;
	
	
	public void create(Movie movie, MultipartFile[] files) throws Exception {

		if (files.length > 0) {
			String fileRefId = "";
			SimpleDateFormat formatter = new SimpleDateFormat(
					"yyyyMMddHHmmssSSS", new Locale("ko", "KR"));
			String formattedValue = formatter.format(new Date());
			fileRefId = "FILE-REF-" + formattedValue;

			movie.setFileRefId(fileRefId);

			movieDao.create(movie);

			for(int i = 0; i < files.length; i++){
				
				MultipartFile file = files[i];
				if(file.getSize() > 0){
					String id = "";
					SimpleDateFormat formatter_file = new SimpleDateFormat(
							"yyyyMMddHHmmssSSS", new Locale("ko", "KR"));
					String formattedValue_file = formatter_file.format(new Date());
	
					id = "FILE-"  + formattedValue_file;
	
					AttachedFile attachedFile = new AttachedFile();
					
					attachedFile.setRefId(fileRefId);
					attachedFile.setId(id);
					attachedFile.setName(file.getOriginalFilename());
					attachedFile.setFileSize(file.getSize());
	
					uploadInfoDao.create(attachedFile);
	
					//create local file
					File localFile = createLocalFile(id);
					file.transferTo(localFile);
					
					//file upload to ftpserver
					sftpService.upload(localFile, id);
				}

			}
		}

	}
	
	public void remove(Movie movie) throws Exception {
		
		String fileRefId = movie.getFileRefId();
		
		movieDao.remove(movie.getMovieId());

		if (fileRefId != null) {
			
			List<AttachedFile> attachedFileList = uploadInfoDao.list(fileRefId);
			
			uploadInfoDao.remove(fileRefId);
			
			for (int i = 0; i < attachedFileList.size(); i++) {
				AttachedFile attachedFile = attachedFileList.get(i);
				//file remove
				sftpService.remove(attachedFile.getId());
			}
		}
	}

	public void update(Movie movie) throws Exception {
		movieDao.update(movie);
	}
	

	public Movie get(String movieId) throws Exception {
		Movie movie = movieDao.get(movieId);
		String fileRefId = movie.getFileRefId();
		if (fileRefId != null && fileRefId != "") {
			List<AttachedFile> attachedFileList = uploadInfoDao.list(fileRefId);
			movie.setAttachedFiles(attachedFileList);
		}
		return movie;
	}
	
	private File createLocalFile(String id)throws Exception{
		File filePath = new File(repositoryPath);
		if (!filePath.exists()) {
			boolean created = filePath.mkdirs();
			if (!created) {
				throw new Exception(
						"Fail to create a directory for attached file ["
								+ filePath + "]");
			}
		}
		File localFile = new File(filePath + "/" + id);
		return localFile;
	}
}
