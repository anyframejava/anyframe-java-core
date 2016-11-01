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
package org.anyframe.plugin.fileupload.sftp.service.impl;

import java.io.File;

import org.anyframe.plugin.fileupload.sftp.service.SftpService;
import org.apache.commons.vfs.FileObject;
import org.apache.commons.vfs.FileSystemOptions;
import org.apache.commons.vfs.Selectors;
import org.apache.commons.vfs.impl.DefaultFileSystemManager;
import org.apache.commons.vfs.provider.local.DefaultLocalFileProvider;
import org.apache.commons.vfs.provider.sftp.SftpFileObject;
import org.apache.commons.vfs.provider.sftp.SftpFileProvider;
import org.apache.commons.vfs.provider.sftp.SftpFileSystemConfigBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service("sftpService")
public class SftpServiceImpl implements SftpService {

	private static final Logger logger = LoggerFactory.getLogger(SftpServiceImpl.class);

	@Value("#{contextProperties['ftpPath']}")
	private String ftpPath;

	// file download
	public void download(File localFile, String fileId) throws Exception {
		FileSystemOptions fsOptions = null;
		DefaultFileSystemManager fsManager = null;
		SftpFileProvider sftp = null;

		try {
			fsOptions = new FileSystemOptions();
			SftpFileSystemConfigBuilder.getInstance().setStrictHostKeyChecking(fsOptions, "no");
			fsManager = new DefaultFileSystemManager();
			sftp = new SftpFileProvider();
			DefaultLocalFileProvider fspath = null;

			fspath = new DefaultLocalFileProvider();

			fspath.init();
			sftp.init();

			fsManager.addProvider("sftp", sftp);
			fsManager.addProvider("file", fspath);
			fsManager.init();

			SftpFileObject fo = null;

			try {
				fo = (SftpFileObject) fsManager.resolveFile(ftpPath + fileId, fsOptions);

				FileObject localFileObject = fsManager.toFileObject(localFile);
				localFileObject.copyFrom(fo, Selectors.SELECT_SELF);
				logger.debug(localFileObject.getName() + " 파일이 저장되었습니다.");

			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				if (fo != null)
					fo.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (sftp != null)
				sftp.close();
			if (fsManager != null)
				fsManager.close();
		}
	}

	// get file object
	public SftpFileObject getSftpFileObject(String fileId) throws Exception {
		FileSystemOptions fsOptions = null;
		DefaultFileSystemManager fsManager = null;
		SftpFileProvider sftp = null;

		SftpFileObject fo = null;

		try {
			fsOptions = new FileSystemOptions();
			SftpFileSystemConfigBuilder.getInstance().setStrictHostKeyChecking(fsOptions, "no");
			fsManager = new DefaultFileSystemManager();
			sftp = new SftpFileProvider();
			DefaultLocalFileProvider fspath = null;

			fspath = new DefaultLocalFileProvider();

			fspath.init();
			sftp.init();

			fsManager.addProvider("sftp", sftp);
			fsManager.addProvider("file", fspath);
			fsManager.init();

			try {
				fo = (SftpFileObject) fsManager.resolveFile(ftpPath + fileId, fsOptions);
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				logger.debug(fo.getName() + " 파일을 얻어오는데 성공하였습니다.");
				if (fo != null)
					fo.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (sftp != null)
				sftp.close();
			if (fsManager != null)
				fsManager.close();
		}
		return fo;
	}

	// remove file
	public void remove(String fileId) throws Exception {

		FileSystemOptions fsOptions = null;
		DefaultFileSystemManager fsManager = null;
		SftpFileProvider sftp = null;

		try {
			fsOptions = new FileSystemOptions();
			SftpFileSystemConfigBuilder.getInstance().setStrictHostKeyChecking(fsOptions, "no");
			fsManager = new DefaultFileSystemManager();
			sftp = new SftpFileProvider();
			DefaultLocalFileProvider fspath = null;

			fspath = new DefaultLocalFileProvider();

			fspath.init();
			sftp.init();

			fsManager.addProvider("sftp", sftp);
			fsManager.addProvider("file", fspath);
			fsManager.init();

			SftpFileObject fo = null;

			try {
				fo = (SftpFileObject) fsManager.resolveFile(ftpPath + fileId, fsOptions);
				fo.delete();
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				logger.debug("파일이 정상적으로 삭제되었습니다.");
				if (fo != null)
					fo.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (sftp != null)
				sftp.close();
			if (fsManager != null)
				fsManager.close();
		}
	}

	// upload file
	public void upload(File localFile, String fileId) throws Exception {
		FileSystemOptions fsOptions = null;
		DefaultFileSystemManager fsManager = null;
		SftpFileProvider sftp = null;

		try {
			fsOptions = new FileSystemOptions();
			SftpFileSystemConfigBuilder.getInstance().setStrictHostKeyChecking(fsOptions, "no");
			fsManager = new DefaultFileSystemManager();
			sftp = new SftpFileProvider();
			DefaultLocalFileProvider fspath = null;

			fspath = new DefaultLocalFileProvider();

			fspath.init();
			sftp.init();

			fsManager.addProvider("sftp", sftp);
			fsManager.addProvider("file", fspath);
			fsManager.init();

			SftpFileObject fo = null;

			try {
				fo = (SftpFileObject) fsManager.resolveFile(ftpPath + fileId, fsOptions);
				FileObject localFileObject = fsManager.toFileObject(localFile);
				fo.copyFrom(localFileObject, Selectors.SELECT_SELF);
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				logger.debug(fo.getName() + " File이 SFTP 서버에 생성되었습니다.");
				if (fo != null)
					fo.close();
				localFile.delete();
				logger.debug("local File 삭제가 완료되었습니다.");
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (sftp != null)
				sftp.close();
			if (fsManager != null)
				fsManager.close();
		}
	}

}
