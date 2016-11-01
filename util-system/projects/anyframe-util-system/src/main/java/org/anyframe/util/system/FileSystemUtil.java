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
package org.anyframe.util.system;

import java.io.File;
import java.io.FileFilter;
import java.io.IOException;
import java.util.Collection;
import java.util.Date;

import org.anyframe.util.DateUtil;
import org.anyframe.util.system.sigar.FileInfo;
import org.anyframe.util.system.sigar.SigarAccessor;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.filefilter.DirectoryFileFilter;
import org.apache.commons.io.filefilter.FileFileFilter;
import org.apache.commons.io.filefilter.FileFilterUtils;
import org.apache.commons.io.filefilter.IOFileFilter;
import org.hyperic.sigar.SigarException;

/**
 * File System Utility Class <br>
 * provide functions on file or directory copy, move, delete and search
 *
 * @author HyunJung Jeong
 *
 */
public class FileSystemUtil extends SystemUtilBase {

	/**
	 * whether it is file or directory
	 */
	public enum FileDir {
		isFile, isDirectory
	}

	/**
	 * option for file name search-consistent file name, prefix or suffix
	 */
	public enum FileNameSearch {
		FullMatch, Prefix, Suffix
	}

	/**
	 * check whether it is possible read the destination file or directory
	 *
	 * @param file directory or file
	 * @return <code>true</code> if it is possible to read file or directory
	 * @see File#canRead()
	 */
	public static boolean canRead(String file) {
		boolean check = false;
		try {
			File checkFile = new File(file);
			if (checkFile.exists()) {
				check = checkFile.canRead();
			}
		}
		catch (SecurityException e) {
			check = false;
		}
		return check;
	}

	/**
	 * check whether it is possible to write destination file or directory
	 *
	 * @param file directory or file
	 * @return <code>true</code> if it is possible to write file or directory
	 * @see File#canWrite()
	 */
	public static boolean canWrite(String file) {
		boolean check = false;
		try {
			File checkFile = new File(file);
			if (checkFile.exists()) {
				check = checkFile.canWrite();
			}
		}
		catch (SecurityException e) {
			check = false;
		}
		return check;
	}

	/**
	 * copy the source directory in the destination directory name.
	 *
	 * @param srcDir source directory
	 * @param destDir destination directory
	 * @see FileUtils#copyDirectory(File, File)
	 */
	public static void copyDirectory(final String srcDir, final String destDir) {
		processIO(new IOCallback<Object>() {
			public Object doInProcessIO() throws IOException {
				FileUtils.copyDirectory(new File(srcDir), new File(destDir));
				return null;
			}
		});
	}

	/**
	 * copy the source directory in the destination directory name. <br>
	 * if reserveFileDate is <code>true</code>, use the last modified date
	 * of source directory as it is if <code>false</code>, set the current date
	 * as the last modified date.
	 *
	 * @param srcDir source directory
	 * @param destDir destination directory
	 * @param preserveFileDate whether the date of source directory is preserved
	 * @see FileUtils#copyDirectory(File, File, boolean)
	 */
	public static void copyDirectory(final String srcDir, final String destDir, final boolean preserveFileDate) {
		processIO(new IOCallback<Object>() {
			public Object doInProcessIO() throws IOException {
				FileUtils.copyDirectory(new File(srcDir), new File(destDir), preserveFileDate);
				return null;
			}
		});
	}

	/**
	 * copy the source directory in the destination directory name. if isDir is
	 * <code>true</code>, copy directory only. if <code>false</code>, copy file
	 * only.
	 *
	 * @param srcDir source directory
	 * @param destDir destination directory
	 * @param filedir whether the copy destination is directory or not. if
	 * <code>true</code>, copy directory only
	 */
	public static void copyDirectory(final String srcDir, final String destDir, final FileDir filedir) {
		processIO(new IOCallback<Object>() {
			public Object doInProcessIO() throws IOException {
				copyDirectory(srcDir, destDir, filedir, true);
				return null;
			}
		});
	}

	/**
	 * copy the source directory in the destination directory name. if isDir is
	 * <code>true</code>, copy directory only. if <code>false</code>, copy file
	 * only.<br>
	 * if reserveFileDate is <code>true</code>, use the last modified date
	 * of source directory as it is if <code>false</code>, set the current date
	 * as the last modified date.
	 *
	 * @param srcDir source directory
	 * @param destDir destination directory
	 * @param filedir whether the copy destination is directory or not. if
	 * <code>true</code>, copy directory only
	 * @param preserveFileDate whether the date of source directory is preserved
	 * @see FileUtils#copyDirectory(File, File, FileFilter, boolean)
	 * @see FileFileFilter#FILE
	 * @see DirectoryFileFilter#DIRECTORY
	 */
	public static void copyDirectory(final String srcDir, final String destDir, final FileDir filedir,
			final boolean preserveFileDate) {
		processIO(new IOCallback<Object>() {
			public Object doInProcessIO() throws IOException {
				switch (filedir) {
				case isFile:
					FileUtils.copyDirectory(new File(srcDir), new File(destDir), FileFileFilter.FILE, preserveFileDate);
					break;
				case isDirectory:
					FileUtils.copyDirectory(new File(srcDir), new File(destDir), DirectoryFileFilter.DIRECTORY,
							preserveFileDate);
					break;
				default:
					FileUtils.copyDirectory(new File(srcDir), new File(destDir), DirectoryFileFilter.DIRECTORY,
							preserveFileDate);
				}
				return null;
			}
		});
	}

	/**
	 * copy the source directory in the destination directory name. copy the
	 * files which are consistent with the input file extension.
	 *
	 * @param srcDir source directory
	 * @param destDir destination directory
	 * @param extension file extension
	 */
	public static void copyDirectory(final String srcDir, final String destDir, final String extension) {
		processIO(new IOCallback<Object>() {
			public Object doInProcessIO() throws IOException {
				copyDirectory(srcDir, destDir, extension, true);
				return null;
			}
		});
	}

	/**
	 * copy the source directory in the destination directory name. copy the
	 * files which are consistent with the input file extension.<br>
	 *if reserveFileDate is <code>true</code>, use the last modified date
	 * of source directory as it is if <code>false</code>, set the current data
	 * as the last modified date.
	 *
	 * @param srcDir source directory
	 * @param destDir destination directory
	 * @param extension file extension
	 * @param preserveFileDate whether the date of source directory is preserved
	 * @see FileUtils#copyDirectory(File, File, FileFilter, boolean)
	 * @see FileFilterUtils#suffixFileFilter(String)
	 * @see FileFilterUtils#orFileFilter(IOFileFilter, IOFileFilter)
	 */
	public static void copyDirectory(final String srcDir, final String destDir, final String extension,
			final boolean preserveFileDate) {
		processIO(new IOCallback<Object>() {
			public Object doInProcessIO() throws IOException {
				IOFileFilter suffixFilter = FileFilterUtils.suffixFileFilter(extension);
				FileFilter filter = FileFilterUtils.orFileFilter(DirectoryFileFilter.DIRECTORY, suffixFilter);
				FileUtils.copyDirectory(new File(srcDir), new File(destDir), filter, preserveFileDate);
				return null;
			}
		});
	}

	/**
	 * copy the source directory in the destination directory name. copy the
	 * files whose last modified date is fewer or more than the input date
	 *
	 * @param srcDir source directory
	 * @param destDir destination directory
	 * @param cutoffDate base date(yyyy-MM-dd)
	 * @param acceptOlder if true, older files get accepted, if false, newer
	 */
	public static void copyDirectory(final String srcDir, final String destDir, final Date cutoffDate,
			final boolean acceptOlder) {
		processIO(new IOCallback<Object>() {
			public Object doInProcessIO() throws IOException {
				copyDirectory(srcDir, destDir, cutoffDate, acceptOlder, true);
				return null;
			}
		});
	}

	/**
	 * copy the source directory in the destination directory name. copy the
	 * files whose last modified date is fewer or more than the input date. <br>
	 * if preserveFileDate is <code>true</code>, use the last modified date
	 * of source directory as it is if <code>false</code>, set the current data
	 * as the last modified date..
	 *
	 * @param srcDir source directory
	 * @param destDir destination directory
	 * @param cutoffDate base date (yyyy-MM-dd)
	 * @param acceptOlder if true, older files get accepted, if false, newer
	 * @param preserveFileDate whether the date of source directory is preserved
	 * @see FileUtils#copyDirectory(File, File, FileFilter, boolean)
	 * @see FileFilterUtils#ageFileFilter(Date)
	 * @see FileFilterUtils#orFileFilter(IOFileFilter, IOFileFilter)
	 */
	public static void copyDirectory(final String srcDir, final String destDir, final Date cutoffDate,
			final boolean acceptOlder, final boolean preserveFileDate) {
		processIO(new IOCallback<Object>() {
			public Object doInProcessIO() throws IOException {
				IOFileFilter ageFilter = FileFilterUtils.ageFileFilter(cutoffDate, acceptOlder);
				FileFilter filter = FileFilterUtils.orFileFilter(DirectoryFileFilter.DIRECTORY, ageFilter);
				FileUtils.copyDirectory(new File(srcDir), new File(destDir), filter, preserveFileDate);
				return null;
			}
		});
	}

	/**
	 * copy the source directory in the destination directory name. copy the
	 * files whose size is smaller or larger than the input size of the
	 * destination directory
	 *
	 * @param srcDir source directory
	 * @param destDir destination directory
	 * @param threshold file size
	 * @param acceptLarger if true, larger files get accepted, if false, smaller
	 */
	public static void copyDirectory(final String srcDir, final String destDir, final long threshold,
			final boolean acceptLarger) {
		processIO(new IOCallback<Object>() {
			public Object doInProcessIO() throws IOException {
				copyDirectory(srcDir, destDir, threshold, acceptLarger, true);
				return null;
			}
		});
	}

	/**
	 * copy the source directory in the destination directory name. copy files
	 * whose size is smaller or larger than the input size of the destination
	 * directory <br>
	 * if preserveFileDate is <code>true</code>, use the last modified date
	 * of source directory as it is if <code>false</code>, set the current data
	 * as the last modified date.
	 *
	 * @param srcDir source directory
	 * @param destDir destination directory
	 * @param threshold file size
	 * @param acceptLarger if true, larger files get accepted, if false, smaller
	 * @param preserveFileDate whether the date of source directory is preserved
	 * @see FileUtils#copyDirectory(File, File, FileFilter, boolean)
	 * @see FileFilterUtils#sizeFileFilter(long, boolean)
	 * @see FileFilterUtils#orFileFilter(IOFileFilter, IOFileFilter)
	 */
	public static void copyDirectory(final String srcDir, final String destDir, final long threshold,
			final boolean acceptLarger, final boolean preserveFileDate) {
		processIO(new IOCallback<Object>() {
			public Object doInProcessIO() throws IOException {
				IOFileFilter sizeFilter = FileFilterUtils.sizeFileFilter(threshold, acceptLarger);
				IOFileFilter sizeFiles = FileFilterUtils.orFileFilter(DirectoryFileFilter.DIRECTORY, sizeFilter);
				FileUtils.copyDirectory(new File(srcDir), new File(destDir), sizeFiles, preserveFileDate);
				return null;
			}
		});
	}

	/**
	 * copy the source directory in the destination directory name. copy the
	 * file list of input maximum and minimum size for the destination directory
	 *
	 * @param srcDir source directory
	 * @param destDir destination directory
	 * @param minSize the minimum file size (inclusive)
	 * @param maxSize the maximum file size (inclusive)
	 */
	public static void copyDirectory(final String srcDir, final String destDir, final long minSize, final long maxSize) {
		processIO(new IOCallback<Object>() {
			public Object doInProcessIO() throws IOException {
				copyDirectory(srcDir, destDir, minSize, maxSize, true);
				return null;
			}
		});
	}

	/**
	 * copy the source directory in the destination directory name. copy the
	 * file list of input maximum and minimum size for the destination directory<br>
	 * if preserveFileDate is <code>true</code>, use the last modified date
	 * of source directory as it is if <code>false</code>, set the current data
	 * as the last modified date.
	 *
	 * @param srcDir source directory
	 * @param destDir destination directory
	 * @param minSize the minimum file size (inclusive)
	 * @param maxSize the maximum file size (inclusive)
	 * @param preserveFileDate whether the date of source directory is preserved
	 * @see FileUtils#copyDirectory(File, File, FileFilter, boolean)
	 * @see FileFilterUtils#sizeRangeFileFilter(long, long)
	 * @see FileFilterUtils#orFileFilter(IOFileFilter, IOFileFilter)
	 */
	public static void copyDirectory(final String srcDir, final String destDir, final long minSize, final long maxSize,
			final boolean preserveFileDate) {
		processIO(new IOCallback<Object>() {
			public Object doInProcessIO() throws IOException {
				IOFileFilter sizeFileFilter = FileFilterUtils.sizeRangeFileFilter(minSize, maxSize);
				IOFileFilter sizeFiles = FileFilterUtils.orFileFilter(DirectoryFileFilter.DIRECTORY, sizeFileFilter);
				FileUtils.copyDirectory(new File(srcDir), new File(destDir), sizeFiles, preserveFileDate);
				return null;
			}
		});
	}

	/**
	 * copy the source directory in the destination directory name based on the
	 * search condition of file name.
	 *
	 * @param srcDir source directory
	 * @param destDir destination directory
	 * @param name file name, prefix or suffix to search
	 * @param fileNameSearch three ways of FileNameSearch -consistent file name,
	 * prefix or suffix
	 */
	public static void copyDirectory(final String srcDir, final String destDir, final String name,
			final FileNameSearch fileNameSearch) {
		processIO(new IOCallback<Object>() {
			public Object doInProcessIO() throws IOException {
				copyDirectory(srcDir, destDir, name, fileNameSearch, true);
				return null;
			}
		});
	}

	/**
	 * copy the source directory in the destination directory name based on the
	 * search condition of file name.<br>
	 * if preserveFileDate is <code>true</code>, use the last modified date
	 * of source directory as it is if <code>false</code>, set the current data
	 * as the last modified date.
	 *
	 * @param srcDir source directory
	 * @param destDir destination directory
	 * @param name file name, prefix or suffix to search
	 * @param fileNameSearch three ways of FileNameSearch -consistent file name,
	 * prefix or suffix
	 * @param preserveFileDate whether the date of source directory is preserved
	 * @see FileUtils#copyDirectory(File, File, FileFilter, boolean)
	 * @see FileFilterUtils#nameFileFilter(long, long)
	 * @see FileFilterUtils#prefixFileFilter(String)
	 * @see FileFilterUtils#suffixFileFilter(String)
	 * @see FileFilterUtils#orFileFilter(IOFileFilter, IOFileFilter)
	 */
	public static void copyDirectory(final String srcDir, final String destDir, final String name,
			final FileNameSearch fileNameSearch, final boolean preserveFileDate) {
		processIO(new IOCallback<Object>() {
			public Object doInProcessIO() throws IOException {
				IOFileFilter fileFilter;
				switch (fileNameSearch) {
				case FullMatch:
					fileFilter = FileFilterUtils.nameFileFilter(name);
					break;
				case Prefix:
					fileFilter = FileFilterUtils.prefixFileFilter(name);
					break;
				case Suffix:
					fileFilter = FileFilterUtils.suffixFileFilter(name);
					break;
				default:
					fileFilter = FileFilterUtils.nameFileFilter(name);
					break;
				}

				IOFileFilter fileNameFiles = FileFilterUtils.orFileFilter(DirectoryFileFilter.DIRECTORY, fileFilter);
				FileUtils.copyDirectory(new File(srcDir), new File(destDir), fileNameFiles, preserveFileDate);
				return null;
			}
		});
	}

	/**
	 * copy source directory to under destination directory.
	 *
	 * @param srcDir source directory
	 * @param destDir destination directory
	 * @see FileUtils#copyDirectoryToDirectory(File, File)
	 */
	public static void copyDirectoryToDirectory(final String srcDir, final String destDir) {
		processIO(new IOCallback<Object>() {
			public Object doInProcessIO() throws IOException {
				FileUtils.copyDirectoryToDirectory(new File(srcDir), new File(destDir));
				return null;
			}
		});
	}

	/**
	 * directory move- source directory moves to destination directory.
	 *
	 * @param srcDir source directory
	 * @param destDir destination directory
	 * @see FileUtils#moveDirectory(File, File)
	 */
	public static void moveDirectory(final String srcDir, final String destDir) {
		processIO(new IOCallback<Object>() {
			public Object doInProcessIO() throws IOException {
				FileUtils.moveDirectory(new File(srcDir), new File(destDir));
				return null;
			}
		});
	}

	/**
	 * directory move- source directory moves to destination directory.
	 *
	 * @param src source directory
	 * @param destDir destination directory
	 * @param createDestDir if<code>true</code>, create destination directory
	 * @see FileUtils#moveDirectoryToDirectory(File, File, boolean)
	 */
	public static void moveDirectoryToDirectory(final String src, final String destDir, final boolean createDestDir) {
		processIO(new IOCallback<Object>() {
			public Object doInProcessIO() throws IOException {
				FileUtils.moveDirectoryToDirectory(new File(src), new File(destDir), createDestDir);
				return null;
			}
		});
	}

	/**
	 * make directory
	 *
	 * @param directory directory to create
	 * @see FileUtils#forceMkdir(File)
	 */
	public static void makeDirectory(final String directory) {
		processIO(new IOCallback<Object>() {
			public Object doInProcessIO() throws IOException {
				FileUtils.forceMkdir(new File(directory));
				return null;
			}
		});
	}

	/**
	 * delete the directory and file.
	 *
	 * @param src and directory path
	 * @see FileUtils#forceDelete(File)
	 */
	public static void deleteFileDirectory(final String src) {
		processIO(new IOCallback<Object>() {
			public Object doInProcessIO() throws IOException {
				FileUtils.forceDelete(new File(src));
				return null;
			}
		});
	}

	/**
	 * file copy
	 *
	 * @param srcFile source file
	 * @param destFile destination file
	 * @see FileUtils#copyFile(File, File)
	 */
	public static void copyFile(final String srcFile, final String destFile) {
		processIO(new IOCallback<Object>() {
			public Object doInProcessIO() throws IOException {
				FileUtils.copyFile(new File(srcFile), new File(destFile));
				return null;
			}
		});
	}

	/**
	 * file copy<br>
	 * if preserveFileDate is <code>true</code>, use the last modified date
	 * of source directory as it is if <code>false</code>, set the current data
	 * as the last modified date.
	 *
	 * @param srcFile source file
	 * @param destFile destination file
	 * @param preserveFileDate whether the date of source file is preserved
	 * @see FileUtils#copyFile(File, File, boolean)
	 */
	public static void copyFile(final String srcFile, final String destFile, final boolean preserveFileDate) {
		processIO(new IOCallback<Object>() {
			public Object doInProcessIO() throws IOException {
				FileUtils.copyFile(new File(srcFile), new File(destFile), preserveFileDate);
				return null;
			}
		});
	}

	/**
	 * copy file to destination directory
	 *
	 * @param srcFile source file
	 * @param destDir destination directory
	 * @see FileUtils#copyFileToDirectory(File, File)
	 */
	public static void copyFileToDirectory(final String srcFile, final String destDir) {
		processIO(new IOCallback<Object>() {
			public Object doInProcessIO() throws IOException {
				FileUtils.copyFileToDirectory(new File(srcFile), new File(destDir));
				return null;
			}
		});
	}

	/**
	 * copy file to destination directory <br>
	 * if preserveFileDate is <code>true</code>, use the last modified date
	 * of source directory as it is if <code>false</code>, set the current data
	 * as the last modified date.
	 *
	 * @param srcFile source file
	 * @param destDir destination directory
	 * @param preserveFileDate whether the date of source file is preserved
	 * @see FileUtils#copyFileToDirectory(File, File, boolean)
	 */
	public static void copyFileToDirectory(final String srcFile, final String destDir, final boolean preserveFileDate) {
		processIO(new IOCallback<Object>() {
			public Object doInProcessIO() throws IOException {
				FileUtils.copyFileToDirectory(new File(srcFile), new File(destDir), preserveFileDate);
				return null;
			}
		});
	}

	/**
	 * move file
	 *
	 * @param srcFile source file
	 * @param destFile destination file
	 * @see FileUtils#moveFile(File, File)
	 */
	public static void moveFile(final String srcFile, final String destFile) {
		processIO(new IOCallback<Object>() {
			public Object doInProcessIO() throws IOException {
				FileUtils.moveFile(new File(srcFile), new File(destFile));
				return null;
			}
		});
	}

	/**
	 * move file to under destination directory
	 *
	 * @param srcFile source file
	 * @param destDir destination directory
	 * @param createDestDir if <code>true</code>, create destination directory
	 * @see FileUtils#moveFileToDirectory(File, File, boolean)
	 */
	public static void moveFileToDirectory(final String srcFile, final String destDir, final boolean createDestDir) {
		processIO(new IOCallback<Object>() {
			public Object doInProcessIO() throws IOException {
				FileUtils.moveFileToDirectory(new File(srcFile), new File(destDir), createDestDir);
				return null;
			}
		});
	}

	/**
	 * return properties of the file or directory (size, authorization, type,
	 * etc.)
	 *
	 * @param name file path or directory full path
	 * @return FileInfo file information
	 */
	public static FileInfo getInformation(final String name) {
		return processIO(new IOCallback<FileInfo>() {
			public FileInfo doInProcessIO() throws IOException, SigarException {
				return SigarAccessor.getFileInfo(name);
			}
		});
	}

	/**
	 * search file list under the directory
	 *
	 * @param directory the directory to search in
	 * @param extensions file extension
	 * @param recursive whether to search recursively or not
	 * @return list of searched file
	 * @see FileUtils#listFiles(File, String[], boolean)
	 */
	public static File[] getFileList(final String directory, final String[] extensions, final boolean recursive) {
		return processIO(new IOCallback<File[]>() {
			public File[] doInProcessIO() throws IOException {
				Collection<?> files;
				if (extensions[0].equals("all")) {
					files = FileUtils.listFiles(new File(directory), null, recursive);
				}
				else {
					files = FileUtils.listFiles(new File(directory), extensions, recursive);
				}
				return FileUtils.convertFileCollectionToFileArray(files);
			}
		});
	}

	/**
	 * search the files whose last modified date is fewer or more than the
	 * input date of destination directory
	 *
	 * @param directory the directory to search in
	 * @param date based date (yyyy-MM-dd)
	 * @param acceptOlder if true, older files get accepted, if false, newer
	 * @return searched file list
	 * @see FileUtils#listFiles(File, IOFileFilter, IOFileFilter)
	 * @see FileFilterUtils#ageFileFilter(date, boolean)
	 */
	public static File[] getFileList(final String directory, final Date date, final boolean acceptOlder) {
		return processIO(new IOCallback<File[]>() {
			public File[] doInProcessIO() throws IOException {
				// Date lastModifiedDate = DateUtils.string2Date(date,
				// "yyyy-MM-dd");
				IOFileFilter ageFileFilter = FileFilterUtils.ageFileFilter(date, acceptOlder);
				Collection<?> files = FileUtils.listFiles(new File(directory), ageFileFilter,
						DirectoryFileFilter.DIRECTORY);
				return FileUtils.convertFileCollectionToFileArray(files);
			}
		});
	}

	/**
	 * search the files whose input size is smaller or larger than the input
	 * size of destination directory
	 *
	 * @param directory the directory to search in
	 * @param size base size
	 * @param acceptLarger if true, larger files get accepted, if false, smaller
	 * @return searched file list
	 * @see FileUtils#listFiles(File, IOFileFilter, IOFileFilter)
	 * @see FileFilterUtils#sizeFileFilter(long, boolean)
	 */
	public static File[] getFileList(final String directory, final long size, final boolean acceptLarger) {
		return processIO(new IOCallback<File[]>() {
			public File[] doInProcessIO() throws IOException {
				IOFileFilter sizeFileFilter = FileFilterUtils.sizeFileFilter(size, acceptLarger);

				Collection<?> files = FileUtils.listFiles(new File(directory), sizeFileFilter,
						DirectoryFileFilter.DIRECTORY);
				return FileUtils.convertFileCollectionToFileArray(files);
			}
		});
	}

	/**
	 * search the file list of input maximum and minimum size for the
	 * destination directory
	 *
	 * @param directory the directory to search in
	 * @param minSizeInclusive the minimum file size (inclusive)
	 * @param maxSizeInclusive the maximum file size (inclusive)
	 * @return searched file list
	 * @see FileUtils#listFiles(File, IOFileFilter, IOFileFilter)
	 * @see FileFilterUtils#sizeRangeFileFilter(long, long)
	 */
	public static File[] getFileList(final String directory, final long minSizeInclusive, final long maxSizeInclusive) {
		return processIO(new IOCallback<File[]>() {
			public File[] doInProcessIO() throws IOException {
				IOFileFilter sizeFileFilter = FileFilterUtils.sizeRangeFileFilter(minSizeInclusive, maxSizeInclusive);

				Collection<?> files = FileUtils.listFiles(new File(directory), sizeFileFilter,
						DirectoryFileFilter.DIRECTORY);
				return FileUtils.convertFileCollectionToFileArray(files);
			}
		});
	}

	/**
	 * file search of destination directory based on file name
	 *
	 * @param directory the directory to search in
	 * @param name prefix, suffix or file name to search
	 * @param fileNameSearch three ways of FileNameSearch -consistent file name,
	 * prefix or suffix
	 * @return file list that fits the search condition
	 * @see FileUtils#listFiles(File, IOFileFilter, IOFileFilter)
	 * @see FileFilterUtils#nameFileFilter(String)
	 * @see FileFilterUtils#prefixFileFilter(String)
	 * @see FileFilterUtils#suffixFileFilter(String)
	 */
	public static File[] getFileList(final String directory, final String name, final FileNameSearch fileNameSearch) {
		return processIO(new IOCallback<File[]>() {
			public File[] doInProcessIO() throws IOException {
				IOFileFilter fileFilter;
				switch (fileNameSearch) {
				case FullMatch:
					fileFilter = FileFilterUtils.nameFileFilter(name);
					break;
				case Prefix:
					fileFilter = FileFilterUtils.prefixFileFilter(name);
					break;
				case Suffix:
					fileFilter = FileFilterUtils.suffixFileFilter(name);
					break;
				default:
					fileFilter = FileFilterUtils.nameFileFilter(name);
					break;
				}
				Collection<?> files = FileUtils.listFiles(new File(directory), fileFilter,
						DirectoryFileFilter.DIRECTORY);
				return FileUtils.convertFileCollectionToFileArray(files);
			}
		});
	}

	/**
	 * check whether destination file exists
	 *
	 * @param filepath file path
	 * @return <code>true</code> if file exists
	 * @see File#exists()
	 */
	public static boolean existsFile(final String filepath) {
		return processIO(new IOCallback<Boolean>() {
			public Boolean doInProcessIO() {
				File file = new File(filepath);
				if (file.exists() && file.isFile()) {
					return true;
				}
				else {
					return false;
				}
			}
		});
	}

	/**
	 * check whether destination directory exists
	 *
	 * @param dirpath destination directory
	 * @return <code>true</code> if directory exists
	 * @see File#exists()
	 */
	public static boolean existsDir(final String dirpath) {
		return processIO(new IOCallback<Boolean>() {
			public Boolean doInProcessIO() {
				File dir = new File(dirpath);
				if (dir.exists() && dir.isDirectory()) {
					return true;
				}
				else {
					return false;
				}
			}
		});
	}

	/**
	 * check whether the last modified date of the directory exists between
	 * input dates
	 * @param srcDir destination directory
	 * @param fromDate starting date (yyyy-MM-dd)
	 * @param toDate ending date(yyyy-MM-dd)
	 * @return <code>true</code> if directory exists between start date and
	 * end date
	 * @see File#exists()
	 */
	public static boolean existsDir(final String srcDir, final String fromDate, final String toDate) {
		return processIO(new IOCallback<Boolean>() {
			public Boolean doInProcessIO() {
				File file = new File(srcDir);

				if (existsDir(srcDir)) {
					String lastModifed = DateUtil.dateToString(new Date(file.lastModified()));
					if (DateUtil.stringToDate(lastModifed).getTime() >= DateUtil.stringToDate(fromDate).getTime()
							&& DateUtil.stringToDate(lastModifed).getTime() <= DateUtil.stringToDate(toDate).getTime()) {
						return true;
					}
					else {
						return false;
					}
				}
				else {
					return false;
				}
			}
		});
	}
}
