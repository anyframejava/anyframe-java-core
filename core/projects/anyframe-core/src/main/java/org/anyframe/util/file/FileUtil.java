/*
 * Copyright 2002-2008 the original author or authors.
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
package org.anyframe.util.file;

import java.io.File;
import java.util.ArrayList;

/**
 * File Search Utility
 * 
 * @author SoYon Lim
 */
public abstract class FileUtil {
	private FileUtil() {
	}

	/**
	 * find all the files which is having given extension in all the
	 * sub-directories of given directory
	 * 
	 * @param dir
	 *            current directory path
	 * @param extName
	 *            extension name
	 * @return ArrayList all the files which is having given extension
	 * @throws Exception
	 *             fail to get files.
	 */
	public static ArrayList getFiles(String dir, String extName)
			throws Exception {
		ArrayList dirList = new ArrayList();
		dirList = getDirs(dirList, dir);

		final ExtensionFileFilter filter = new ExtensionFileFilter(extName);

		ArrayList fileList = new ArrayList();
		for (int i = 0; i < dirList.size(); i++) {
			File currentDir = (File) dirList.get(i);
			final File[] files = currentDir.listFiles(filter);

			// if (files == null)
			// continue;

			for (int j = 0; j < files.length; j++)
				fileList.add(currentDir.getAbsolutePath() + File.separator
						+ files[j].getName());
		}

		return fileList;
	}

	/**
	 * find all the sub-directories of given directory
	 * 
	 * @param dirList
	 *            return value
	 * @param dir
	 *            parent directory path
	 * @return ArrayList all sub-directories
	 * @throws Exception
	 *             fail to get directories.
	 */
	public static ArrayList getDirs(ArrayList dirList, String dir)
			throws Exception {
		final File parentDir = new File(dir);
		dirList.add(parentDir);

		String[] directoryList = parentDir.list();
		for (int i = 0; i < directoryList.length; i++) {
			String sub = directoryList[i];
			File subDir = new File(dir + File.separator + sub);
			if (!subDir.isDirectory())
				continue;
			dirList = getDirs(dirList, dir + File.separator + sub);
		}

		return dirList;
	}
}
