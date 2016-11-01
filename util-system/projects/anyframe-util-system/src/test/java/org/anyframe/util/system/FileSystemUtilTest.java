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

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.io.File;
import java.util.Date;

import org.anyframe.util.DateUtil;
import org.anyframe.util.system.FileSystemUtil.FileDir;
import org.anyframe.util.system.FileSystemUtil.FileNameSearch;
import org.anyframe.util.system.sigar.FileInfo;
import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import org.junit.Test;

/**
 * TestCase for FileSystemUtil
 * 
 * @author ByungHun Woo
 *
 */
public class FileSystemUtilTest {

	@Test
	public void testCanRead() {
		assertTrue(FileSystemUtil.canRead("testcase/srcDir"));
		assertTrue(FileSystemUtil.canRead("testcase/srcDir/welcome_movie.png"));
	}

	@Test
	public void testCanWrite() {
		assertTrue(FileSystemUtil.canWrite("testcase/srcDir"));
		assertTrue(FileSystemUtil.canWrite("testcase/srcDir/welcome_movie.png"));
	}

	@Test
	public void testCopyDirectory() {
		FileSystemUtil.copyDirectory("testcase/srcDir", "testcase/destDir1");
		assertTrue(FileSystemUtil.existsDir("testcase/destDir1"));

		FileSystemUtil.copyDirectory("testcase/srcDir", "testcase/destDir2", false);
		assertTrue(FileSystemUtil.existsDir("testcase/destDir2"));

		/** copy directory only */
		FileSystemUtil.copyDirectory("testcase/srcDir", "testcase/destDirFileDir", FileDir.isDirectory);
		assertFalse(FileSystemUtil.existsFile("testcase/destDirFileDir/welcome_movie.png"));

		/** copy directory only & modify the file date to current time */
		FileSystemUtil.copyDirectory("testcase/srcDir", "testcase/destDirFileDirFalse", FileDir.isDirectory, false);
		assertTrue(new File("testcase/srcDir/posters").lastModified() != new File(
				"testcase/destDirFileDirFalse/posters").lastModified());

		/** copy file only */
		FileSystemUtil.copyDirectory("testcase/srcDir", "testcase/destDirFileFile", FileDir.isFile);
		assertTrue(FileSystemUtil.existsFile("testcase/destDirFileFile/welcome_movie.png"));

		/** copy file only & modify the file date to current time */
		FileSystemUtil.copyDirectory("testcase/srcDir", "testcase/destDirFileFileFalse", FileDir.isFile, false);
		assertTrue(FileSystemUtil.existsFile("testcase/destDirFileFileFalse/welcome_movie.png"));
		assertTrue(new File("testcase/srcDir/welcome_movie.png").lastModified() != new File(
				"testcase/destDirFileFileFalse/welcome_movie.png").lastModified());

		/** copy the file extension */
		FileSystemUtil.copyDirectory("testcase/srcDir", "testcase/destExtension", ".png");
		assertTrue(FileSystemUtil.existsFile("testcase/destExtension/welcome_movie.png"));

		/** copy the file extension & modify the file date to current time */
		FileSystemUtil.copyDirectory("testcase/srcDir", "testcase/destExtensionFalse", ".png", false);
		assertTrue(new File("testcase/srcDir/welcome_movie.png").lastModified() != new File(
				"testcase/destExtensionFalse/welcome_movie.png").lastModified());

		/** copy the file whose date is more latest than last modified date */
		FileSystemUtil.copyDirectory("testcase/srcDir", "testcase/destDate", DateUtil.stringToDate("2011-01-13"), false);
		assertTrue(FileSystemUtil.existsFile("testcase/destDate/manual/foundation-4.6.1[1].pdf"));

		/** copy the file whose date is more latest than last modified date & modify the file date to current time */
		FileSystemUtil.copyDirectory("testcase/srcDir", "testcase/destDateFalse", DateUtil.stringToDate("2011-01-13"),
				false, false);
		assertTrue(new File("testcase/srcDir/manual/foundation-4.6.1[1].pdf").lastModified() != new File(
				"testcase/destDateFalse/manual/foundation-4.6.1[1].pdf").lastModified());

		/** copy file whose size is bigger than input size */
		FileSystemUtil.copyDirectory("testcase/srcDir", "testcase/destSize", 10000L, true);
		assertTrue(FileSystemUtil.existsFile("testcase/destSize/posters/aliceinwonderland.jpg"));

		/** copy file whose size is bigger than input size & modify the file date to current time */
		FileSystemUtil.copyDirectory("testcase/srcDir", "testcase/destSizeFalse", 10000L, true, false);
		assertTrue(new File("testcase/srcDir/posters/aliceinwonderland.jpg").lastModified() != new File(
				"testcase/destSizeFalse/posters/aliceinwonderland.jpg").lastModified());

		/**  copy file whose size is within the range of input minimum and maximum size */
		FileSystemUtil.copyDirectory("testcase/srcDir", "testcase/destSizeMinMax", 10000L, 20000L);
		assertTrue(FileSystemUtil.existsFile("testcase/destSizeMinMax/posters/aliceinwonderland.jpg"));

		/** copy file whose size is within the range of input minimum and maximum size & modify the file date to current time */
		FileSystemUtil.copyDirectory("testcase/srcDir", "testcase/destSizeMinMaxFalse", 10000L, 20000L, false);
		assertTrue(new File("testcase/srcDir/posters/aliceinwonderland.jpg").lastModified() != new File(
				"testcase/destSizeMinMaxFalse/posters/aliceinwonderland.jpg").lastModified());

		/** match the whole file name */
		FileSystemUtil.copyDirectory("testcase/srcDir", "testcase/destFileName", "shrek.jpg", FileNameSearch.FullMatch);
		assertTrue(FileSystemUtil.existsFile("testcase/destFileName/posters/shrek.jpg"));

		/** match the whole file name  & modify the file date to current time */
		FileSystemUtil.copyDirectory("testcase/srcDir", "testcase/destFileNameFalse", "shrek.jpg",
				FileNameSearch.FullMatch, false);
		assertTrue(new File("testcase/srcDir/posters/shrek.jpg").lastModified() != new File(
				"testcase/destFileNameFalse/posters/shrek.jpg").lastModified());

		/** match the prefix of file name  */
		FileSystemUtil.copyDirectory("testcase/srcDir", "testcase/destFileNamePrefix", "alice", FileNameSearch.Prefix);
		assertTrue(FileSystemUtil.existsFile("testcase/destFileNamePrefix/posters/aliceinwonderland.jpg"));

		/** match the prefix of file name  & modify the file date to current time */
		FileSystemUtil.copyDirectory("testcase/srcDir", "testcase/destFileNamePrefixFalse", "alice",
				FileNameSearch.Prefix, false);
		assertTrue(new File("testcase/srcDir/posters/aliceinwonderland.jpg").lastModified() != new File(
				"testcase/destFileNamePrefixFalse/posters/aliceinwonderland.jpg").lastModified());

		/** match the suffix of file name  */
		FileSystemUtil.copyDirectory("testcase/srcDir", "testcase/destFileNameSuffix", "land.jpg",
				FileNameSearch.Suffix);
		assertTrue(FileSystemUtil.existsFile("testcase/destFileNameSuffix/posters/shutterisland.jpg"));

		/** match the suffix of file name  & modify the file date to current time */
		FileSystemUtil.copyDirectory("testcase/srcDir", "testcase/destFileNameSuffixFalse", "land.jpg",
				FileNameSearch.Suffix, false);
		assertTrue(new File("testcase/srcDir/posters/shutterisland.jpg").lastModified() != new File(
				"testcase/destFileNameSuffixFalse/posters/shutterisland.jpg").lastModified());
	}

	@Test
	public void testCopyDirectoryToDirectory() {
		FileSystemUtil.copyDirectoryToDirectory("testcase/srcDir", "testcase/destDir11");
		assertTrue(FileSystemUtil.existsDir("testcase/destDir11"));
		assertTrue(FileSystemUtil.existsDir("testcase/destDir11/srcDir"));
	}

	@Test
	public void testDeleteFileDirectory() {
		if (!FileSystemUtil.existsDir("testcase/delDir/welcome_movie.png")) {
			FileSystemUtil.copyFileToDirectory("testcase/srcDir/welcome_movie.png", "testcase/delDir");
		}
		FileSystemUtil.deleteFileDirectory("testcase/delDir/welcome_movie.png");
		assertFalse(FileSystemUtil.existsDir("testcase/delDir/welcome_movie.png"));

		if (!FileSystemUtil.existsDir("testcase/delDir/srcDir")) {
			FileSystemUtil.copyDirectoryToDirectory("testcase/srcDir", "testcase/delDir");
		}
		FileSystemUtil.deleteFileDirectory("testcase/delDir/srcDir");
		assertFalse(FileSystemUtil.existsDir("testcase/delDir/srcDir"));
	}

	@Test
	public void testMoveDirectory() {
		if (!FileSystemUtil.existsDir("testcase/moveSrcDir")) {
			FileSystemUtil.copyDirectory("testcase/srcDir", "testcase/moveSrcDir");
		}
		if (FileSystemUtil.existsDir("testcase/movedDir")) {
			FileSystemUtil.deleteFileDirectory("testcase/movedDir");
		}
		FileSystemUtil.moveDirectory("testcase/moveSrcDir", "testcase/movedDir");
		assertTrue(FileSystemUtil.existsDir("testcase/movedDir"));
	}

	@Test
	public void testMoveDirectoryToDirectory() {
		if (!FileSystemUtil.existsDir("testcase/moveSrcDir")) {
			FileSystemUtil.copyDirectory("testcase/srcDir", "testcase/moveSrcDir");
		}
		if (FileSystemUtil.existsDir("testcase/movedDir")) {
			FileSystemUtil.deleteFileDirectory("testcase/movedDir");
		}
		FileSystemUtil.moveDirectoryToDirectory("testcase/moveSrcDir", "testcase/movedDir", true);
		assertTrue(FileSystemUtil.existsDir("testcase/movedDir"));
		assertFalse(FileSystemUtil.existsDir("testcase/moveSrcDir"));
		assertTrue(FileSystemUtil.existsDir("testcase/movedDir/moveSrcDir"));
	}

	@Test
	public void testMakeDirectory() {
		FileSystemUtil.makeDirectory("testcase/makeDir");
		assertTrue(FileSystemUtil.existsDir("testcase/makeDir"));
	}

	@Test
	public void testCopyFile() {
		FileSystemUtil.copyFile("testcase/srcDir/welcome_movie.png", "testcase/destFile1/welcome_movie.png");
		assertTrue(FileSystemUtil.existsFile("testcase/destFile1/welcome_movie.png"));

		FileSystemUtil.copyFile("testcase/srcDir/welcome_movie.png", "testcase/destFile1/welcomeMovie.png");
		assertTrue(FileSystemUtil.existsFile("testcase/destFile1/welcomeMovie.png"));

		FileSystemUtil.copyFile("testcase/srcDir/welcome_movie.png", "testcase/destFile1/welcome-movie.png", false);
		assertTrue(FileSystemUtil.existsFile("testcase/destFile1/welcome_movie.png"));
		assertFalse(new File("testcase/srcDir/welcome_movie.png").lastModified() == new File(
				"testcase/destFile1/welcome-movie.png").lastModified());
	}

	@Test
	public void testCopyFileToDirectory() {
		FileSystemUtil.copyFileToDirectory("testcase/srcDir/welcome_movie.png", "testcase/destFile2");
		assertTrue(FileSystemUtil.existsFile("testcase/destFile2/welcome_movie.png"));

		FileSystemUtil.copyFileToDirectory("testcase/srcDir/welcome_movie.png", "testcase/destFile3", false);
		assertTrue(FileSystemUtil.existsFile("testcase/destFile3/welcome_movie.png"));
		assertFalse(new File("testcase/srcDir/welcome_movie.png").lastModified() == new File(
				"testcase/destFile3/welcome_movie.png").lastModified());
	}

	@Test
	public void testMoveFile() {
		if (!FileSystemUtil.existsFile("testcase/srcDir/welcome_movie_move.png")) {
			FileSystemUtil.copyFile("testcase/srcDir/welcome_movie.png", "testcase/srcDir/welcome_movie_move.png");
		}
		if (FileSystemUtil.existsFile("testcase/destFile4/welcome_movie_move.png")) {
			FileSystemUtil.deleteFileDirectory("testcase/destFile4/welcome_movie_move.png");
		}
		FileSystemUtil.moveFile("testcase/srcDir/welcome_movie_move.png", "testcase/destFile4/welcome_movie_move.png");
		assertTrue(FileSystemUtil.existsFile("testcase/destFile4/welcome_movie_move.png"));
	}

	@Test
	public void testMoveFileToDirectory() {
		if (!FileSystemUtil.existsFile("testcase/srcDir/welcome_movie_move.png")) {
			FileSystemUtil.copyFile("testcase/srcDir/welcome_movie.png", "testcase/srcDir/welcome_movie_move.png");
		}
		if (FileSystemUtil.existsFile("testcase/movedDir/welcome_movie_move.png")) {
			FileSystemUtil.deleteFileDirectory("testcase/movedDir/welcome_movie_move.png");
		}
		FileSystemUtil.moveFileToDirectory("testcase/srcDir/welcome_movie_move.png", "testcase/movedDir/", false);
		assertTrue(FileSystemUtil.existsFile("testcase/movedDir/welcome_movie_move.png"));
		assertTrue(new File("testcase/srcDir/welcome_movie_move.png").lastModified() != new File(
				"testcase/movedDir/welcome_movie_move.png").lastModified());
	}

	@Test
	public void testGetInformation() {
		FileInfo info1 = FileSystemUtil.getInformation("testcase/srcDir");
		System.out.println(ReflectionToStringBuilder.reflectionToString(info1, ToStringStyle.MULTI_LINE_STYLE));
		assertNotNull(info1);

		FileInfo info2 = FileSystemUtil.getInformation("testcase/srcDir/welcome_movie.png");
		System.out.println(ReflectionToStringBuilder.reflectionToString(info2, ToStringStyle.MULTI_LINE_STYLE));
		assertNotNull(info2);
	}

	@Test
	public void testGetFileList() {
		File[] extensionRecursivefiles = FileSystemUtil.getFileList("testcase/srcDir", new String[] { "jpg", "png" },
				true);
		System.out.println("=====  Extension:jpg, png / Recursive=true  =====");
		for (File file : extensionRecursivefiles) {
			System.out.println(file);
		}
		assertTrue(extensionRecursivefiles.length == 10);
		File[] extensionFiles = FileSystemUtil.getFileList("testcase/srcDir", new String[] { "jpg", "png" }, false);
		System.out.println("\n=====  Extension:jpg, png / Recursive=false  =====");
		for (File file : extensionFiles) {
			System.out.println(file);
		}
		assertTrue(extensionFiles.length == 1);

		// File[] ageFilterFiles = FileSystemUtil.getFileList("testcase/srcDir",
		// DateUtil.string2Date("2011-01-14", "yyyy-MM-dd"), true);
		// assertTrue(ageFilterFiles.length == 10);
		File[] ageFilterFiles = FileSystemUtil.getFileList("testcase/srcDir", new Date(), true);
		System.out.println("\n=====  Last Modified Date / acceptOlder=true  =====");
		for (File file : ageFilterFiles) {
			System.out.println(file);
		}
		assertTrue(ageFilterFiles.length >= 10);

		File[] sizeFilterFiles = FileSystemUtil.getFileList("testcase/srcDir", 50000L, true);
		System.out.println("\n=====  File size / acceptLarger=true  =====");
		for (File file : sizeFilterFiles) {
			System.out.println(file);
		}
		assertTrue(sizeFilterFiles.length >= 4);

		File[] sizeRangeFilterFiles = FileSystemUtil.getFileList("testcase/srcDir", 10000L, 50000L);
		System.out.println("\n=====  File size / range min~max  =====");
		for (File file : sizeRangeFilterFiles) {
			System.out.println(file);
		}
		assertTrue(sizeRangeFilterFiles.length >= 1);

		File[] fullMatchFilterFiles = FileSystemUtil.getFileList("testcase/srcDir", "shrek.jpg",
				FileNameSearch.FullMatch);
		System.out.println("\n=====  File Name FullMatch / shrek.jpg  =====");
		for (File file : fullMatchFilterFiles) {
			System.out.println(file);
		}
		assertTrue(fullMatchFilterFiles.length >= 1);

		File[] prefixFilterFiles = FileSystemUtil.getFileList("testcase/srcDir", "alice", FileNameSearch.Prefix);
		System.out.println("\n=====  File Name Prefix / alice  =====");
		for (File file : prefixFilterFiles) {
			System.out.println(file);
		}
		assertTrue(prefixFilterFiles.length >= 2);

		File[] suffixFilterFiles = FileSystemUtil.getFileList("testcase/srcDir", "land.jpg", FileNameSearch.Suffix);
		System.out.println("\n=====  File Name Suffix / land  =====");
		for (File file : suffixFilterFiles) {
			System.out.println(file);
		}
		assertTrue(suffixFilterFiles.length == 2);
	}

	@Test
	public void testExistsFile() {
		assertTrue(FileSystemUtil.existsFile("testcase/srcDir/welcome_movie.png"));
	}

	@Test
	public void testExistsDir() {
		assertTrue(FileSystemUtil.existsDir("testcase/srcDir"));
		assertTrue(FileSystemUtil.existsDir("testcase/srcDir/manual", DateUtil.addDays(DateUtil.getCurrentDate(), -365 * 10),
				DateUtil.getCurrentDate()));
	}
}