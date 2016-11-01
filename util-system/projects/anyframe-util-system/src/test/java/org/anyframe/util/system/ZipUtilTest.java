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
import static org.junit.Assert.assertTrue;

import java.io.File;
import java.io.IOException;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

/**
 * TestCase for ZipUtils that provides compress and extract function. Provides
 * compress/extract examples for zip, jar, tar, tar.gz, ar, and cpio.
 * 
 * @author ByungHun Woo
 *
 */
public class ZipUtilTest {

	public static void deleteAllExceptArchive() {
		// initialize compress file data for test under zip test directory
		for (File file : new File("ziptest").listFiles()) {
			if (!FilenameUtils.isExtension(file.getName(), new String[] { "zip", "tar", "gz" })) {
				FileSystemUtil.deleteFileDirectory(file.getAbsolutePath());
			}
		}

		for (File file : FileSystemUtil.getFileList(".", new String[] { "zip", "jar", "tar", "cpio", "ar", "gz" },
				false)) {
			FileSystemUtil.deleteFileDirectory(file.getAbsolutePath());
		}
	}

	@BeforeClass
	public static void prepareData() {
		if (FileSystemUtil.canRead("ziptest")) {
			FileSystemUtil.deleteFileDirectory("ziptest");
		}
		FileSystemUtil.copyDirectory("zipdata", "ziptest");
	}

	@Before
	public void init() {
		deleteAllExceptArchive();
	}

	@AfterClass
	public static void release() {
		deleteAllExceptArchive();
	}

	@Test
	public void testDecompressFailure() {
		String targetZipFileStr = "ziptest/notexist.zip";

		assertFalse(ZipUtil.decompressJavaZip(targetZipFileStr));
	}

	@Test
	public void testDecompressJavaZip() {
		String targetZipFileStr = "ziptest/ziptest.zip";

		assertTrue(ZipUtil.decompressJavaZip(targetZipFileStr));

		// check extracted sample file
		assertTrue(FileSystemUtil.existsFile("ziptest/jira_issue.txt"));
		assertTrue(FileSystemUtil.existsDir("ziptest/nested folder"));
		assertTrue(FileSystemUtil.existsFile("ziptest/nested folder/winter.jpg"));
	}

	// @Test
	// public void testDecompressJavaZipWindows() throws InterruptedException {
	// String targetZipFileStr = "ziptest\\ziptest.zip";
	//
	// ZipUtils.decompressJavaZip(targetZipFileStr);
	//
	// // check extracted sample file
	// assertTrue(FileSystemUtils.existsFile("ziptest/jira_issue.txt"));
	// assertTrue(FileSystemUtils.existsDir("ziptest/nested folder"));
	// assertTrue(FileSystemUtils.existsFile("ziptest/nested folder/winter.jpg"));
	// }

	@Test
	public void testDecompressJavaZipDestDir() {
		String targetZipFileStr = "ziptest/ziptest.zip";
		String destDir = "ziptest/dest";

		assertTrue(ZipUtil.decompressJavaZip(targetZipFileStr, destDir));

		// check extracted directory and sample file
		assertTrue(FileSystemUtil.existsFile("ziptest/dest/jira_issue.txt"));
		assertTrue(FileSystemUtil.existsDir("ziptest/dest/nested folder"));
		assertTrue(FileSystemUtil.existsFile("ziptest/dest/nested folder/winter.jpg"));
	}

	@Test
	public void testDecompressZip() {
		String targetZipFileStr = "ziptest/ziptest.zip";

		assertTrue(ZipUtil.decompressZip(targetZipFileStr));

		// check extracted directory and sample file
		assertTrue(FileSystemUtil.existsFile("ziptest/jira_issue.txt"));
		assertTrue(FileSystemUtil.existsDir("ziptest/nested folder"));
		assertTrue(FileSystemUtil.existsFile("ziptest/nested folder/winter.jpg"));
	}

	@Test
	public void testDecompressZipDestDir() {
		String targetZipFileStr = "ziptest/ziptest.zip";
		String destDir = "ziptest/dest";

		assertTrue(ZipUtil.decompressZip(targetZipFileStr, destDir));

		// check extracted directory and sample file
		assertTrue(FileSystemUtil.existsFile("ziptest/dest/jira_issue.txt"));
		assertTrue(FileSystemUtil.existsDir("ziptest/dest/nested folder"));
		assertTrue(FileSystemUtil.existsFile("ziptest/dest/nested folder/winter.jpg"));
	}

	@Test
	public void testDecompressZipKoreanFileName() {
		String targetZipFileStr = "ziptest/ziptest_korean_filename.zip";

		assertTrue(ZipUtil.decompressZip(targetZipFileStr, "ziptest/한글파일명포함", "EUC-KR"));

		// check extracted directory and sample (korean file name) file
		assertTrue(FileSystemUtil.existsFile("ziptest/한글파일명포함/jira_issue.txt"));
		assertTrue(FileSystemUtil.existsFile("ziptest/한글파일명포함/jira_이슈.txt"));
		assertTrue(FileSystemUtil.existsDir("ziptest/한글파일명포함/nested folder"));
		assertTrue(FileSystemUtil.existsFile("ziptest/한글파일명포함/nested folder/winter.jpg"));

	}

	@Test
	public void testDecompressArchiveZip() {
		String targetZipFileStr = "ziptest/ziptest.zip";

		assertTrue(ZipUtil.decompressArchive(targetZipFileStr));

		// check extracted directory and sample file
		assertTrue(FileSystemUtil.existsFile("ziptest/jira_issue.txt"));
		assertTrue(FileSystemUtil.existsDir("ziptest/nested folder"));
		assertTrue(FileSystemUtil.existsFile("ziptest/nested folder/winter.jpg"));
	}

	@Test
	public void testDecompressArchiveDestDir() throws InterruptedException {
		String targetZipFileStr = "ziptest/ziptest.zip";
		String destDir = "ziptest/dest";

		assertTrue(ZipUtil.decompressArchive(targetZipFileStr, destDir));

		// check extracted directory and sample file
		assertTrue(FileSystemUtil.existsFile("ziptest/dest/jira_issue.txt"));
		assertTrue(FileSystemUtil.existsDir("ziptest/dest/nested folder"));
		assertTrue(FileSystemUtil.existsFile("ziptest/dest/nested folder/winter.jpg"));
	}

	@Test
	public void testDecompressArchiveTar() {
		// Tar file extraction test
		String targetTarFileStr = "ziptest/test.tar";
		String tarDestDir = "ziptest/tar_dest";

		assertTrue(ZipUtil.decompressArchive(targetTarFileStr, tarDestDir));

		assertTrue(FileSystemUtil.existsFile("ziptest/tar_dest/test.txt"));
		assertTrue(FileSystemUtil.existsFile("ziptest/tar_dest/nested folders/test2.txt"));
		assertTrue(FileSystemUtil.existsFile("ziptest/tar_dest/nested folders/deep_nested/test3.txt"));
	}

	@Test
	public void testDecompressArchiveTarGz() {
		// tar.gz file extraction test
		String targetTarGzFileStr = "ziptest/targzTest.tar.gz";
		String tarGzDestDir = "ziptest/targz_dest";

		assertTrue(ZipUtil.decompressArchive(targetTarGzFileStr, tarGzDestDir));

		assertTrue(FileSystemUtil.existsFile("ziptest/targzTest.tar"));
		assertTrue(FileSystemUtil.existsFile("ziptest/targz_dest/test.txt"));
		assertTrue(FileSystemUtil.existsFile("ziptest/targz_dest/nested folders/test2.txt"));
		assertTrue(FileSystemUtil.existsFile("ziptest/targz_dest/nested folders/deep_nested/test3.txt"));
	}

	@Test
	public void testCompressZip() {
		// zip file compress test
		String targetDir = "sigar-bin";

		assertTrue(ZipUtil.compressZip(targetDir));

		assertTrue(FileSystemUtil.existsFile("sigar-bin.zip"));
		assertTrue(FileSystemUtil.getInformation("sigar-bin.zip").getSize() > 1000);

		// large file compress test zip file size 330M, about 2 minutes 50
		// seconds - time is similar to 7zip
		// String targetBigDir = "C:\\eclipse-jee-galileo-SR1-win32-update";
		// ZipUtils.compressZip(targetBigDir, null);

		/*
		 * Refer to the below results when testing on korean Windows XP
		 * compressZip - encoding : null or UTF-8 --> decompressZip(encoding :
		 * null, EUC-KR, UTF-8), decompressJavaZip, decompressArchive
		 * compressZip - encoding : EUC-KR --> decompressZip(encoding : only
		 * EUC-KR, decompressJavaZip error, decompressArchive error
		 */
		// ZipUtils.compressZip("C:/Documents and Settings/woos41/바탕 화면/새 폴더 (7)",
		// null);
		// ZipUtils.decompressJavaZip("C:/Documents and Settings/woos41/바탕 화면/새 폴더 (7).zip",
		// "C:/Documents and Settings/woos41/바탕 화면/dest");
		// ZipUtils.decompressZip("C:/Documents and Settings/woos41/바탕 화면/새 폴더 (7).zip",
		// "C:/Documents and Settings/woos41/바탕 화면/dest", "EUC-KR");
		// ZipUtils.decompressArchive("C:/Documents and Settings/woos41/바탕 화면/새 폴더 (7).zip",
		// "C:/Documents and Settings/woos41/바탕 화면/dest");

		// assertTrue(ZipUtils.compressZip(targetDir, "/temp/sigar-bin.zip"));
	}

	@Test
	public void testCompressZipDestFile() {
		// define path of compressed file to be created and test
		String targetDir = "sigar-bin";

		assertTrue(ZipUtil.compressZip(targetDir, "ziptest/sigar-bin.zip"));

		assertTrue(FileSystemUtil.existsFile("ziptest/sigar-bin.zip"));
		assertTrue(FileSystemUtil.getInformation("ziptest/sigar-bin.zip").getSize() > 1000);

		// clear
		FileSystemUtil.deleteFileDirectory("ziptest/sigar-bin.zip");
	}

	@Test
	public void testCompressDecompressZip() {
		// define the path of compressed file to be created and test
		String targetDir = "sigar-bin";

		assertTrue(ZipUtil.compressZip(targetDir, "ziptest/sigar-bin.zip"));

		assertTrue(FileSystemUtil.existsFile("ziptest/sigar-bin.zip"));
		assertTrue(FileSystemUtil.getInformation("ziptest/sigar-bin.zip").getSize() > 1000);

		String targetZipFileStr = "ziptest/sigar-bin.zip";
		String destDir = "ziptest/dest";

		assertTrue(ZipUtil.decompressZip(targetZipFileStr, destDir));

		// check extracted directory or sample file
		assertTrue(FileSystemUtil.existsDir("ziptest/dest/include"));
		assertTrue(FileSystemUtil.existsDir("ziptest/dest/lib"));
		assertTrue(FileSystemUtil.existsFile("ziptest/dest/lib/.sigar_shellrc"));

		// clear
		FileSystemUtil.deleteFileDirectory("ziptest/sigar-bin.zip");
	}

	@Test
	public void testCompressZipOneFile() {
		// test single item file compress, not directory
		String targetFile = "pom.xml";

		assertTrue(ZipUtil.compressZip(targetFile, null));

		assertTrue(FileSystemUtil.existsFile("pom.xml.zip"));
		assertTrue(FileSystemUtil.getInformation("pom.xml.zip").getSize() > 100);
	}

	@Test
	public void testCompressJarDestFile() {
		// Tar file compress test
		String targetDir = "sigar-bin";

		assertTrue(ZipUtil.compressJar(targetDir, "ziptest/sigar-bin.jar"));

		assertTrue(FileSystemUtil.existsFile("ziptest/sigar-bin.jar"));
		assertTrue(FileSystemUtil.getInformation("ziptest/sigar-bin.jar").getSize() > 1000);

		// clear
		FileSystemUtil.deleteFileDirectory("ziptest/sigar-bin.jar");
	}

	@Test
	public void testCompressJar() {
		// Tar file compress test
		String targetDir = "sigar-bin";

		assertTrue(ZipUtil.compressJar(targetDir));

		assertTrue(FileSystemUtil.existsFile("sigar-bin.jar"));
		assertTrue(FileSystemUtil.getInformation("sigar-bin.jar").getSize() > 1000);
	}

	@Test
	public void testCompressTar() {
		// Tar file compress test
		String targetDir = "sigar-bin";

		assertTrue(ZipUtil.compressTar(targetDir));

		assertTrue(FileSystemUtil.existsFile("sigar-bin.tar"));
		assertTrue(FileSystemUtil.getInformation("sigar-bin.tar").getSize() > 1000);
	}

	@Test
	public void testCompressTarGz() {
		// tar.gz file compress test
		String targetDir = "sigar-bin";

		assertTrue(ZipUtil.compressTarGz(targetDir));

		assertTrue(FileSystemUtil.existsFile("sigar-bin.tar.gz"));
		assertTrue(FileSystemUtil.getInformation("sigar-bin.tar.gz").getSize() > 1000);
	}

	@Test
	public void testCompressTarGzDestFile() {
		// tar.gz file compress test
		String targetDir = "sigar-bin";

		assertTrue(ZipUtil.compressTarGz(targetDir, "ziptest/sigar-bin.tar.gz"));

		assertTrue(FileSystemUtil.existsFile("ziptest/sigar-bin.tar.gz"));
		assertTrue(FileSystemUtil.getInformation("ziptest/sigar-bin.tar.gz").getSize() > 1000);

		// clear
		FileSystemUtil.deleteFileDirectory("ziptest/sigar-bin.tar");
		FileSystemUtil.deleteFileDirectory("ziptest/sigar-bin.tar.gz");
	}

	@Test
	public void testCompressAr() throws IOException {
		// Ar file compress test - note that it supports only 16 byte filenames!
		// Due to the limitation of the file name length to 16 bytes GNU and BSD
		// has their own variants of this format. This formats are currently not
		// supported and file names with a bigger size than 16 bytes are not
		// possible at the moment

		String targetDir = "ar-test/sample";
		FileUtils.deleteQuietly(new File(targetDir));
		FileUtils.writeStringToFile(new File(targetDir, "default1.txt"), "test1 試験 てすと テスト ﾃｽﾄ 테스트\n", "UTF-8");
		FileUtils.writeStringToFile(new File(targetDir, "default2.txt"), "test2 試験 てすと テスト ﾃｽﾄ 테스트\n", "UTF-8");
		FileUtils.writeStringToFile(new File(targetDir, "default3.txt"), "test3 試験 てすと テスト ﾃｽﾄ 테스트\n", "UTF-8");
		FileUtils.writeStringToFile(new File(targetDir, "default4.txt"), "test4 試験 てすと テスト ﾃｽﾄ 테스트\n", "UTF-8");

		assertTrue(ZipUtil.compressAr(targetDir));

		assertTrue(FileSystemUtil.existsFile("ar-test/sample.ar"));
		assertTrue(FileSystemUtil.getInformation("ar-test/sample.ar").getSize() > 100);

		// clear
		FileSystemUtil.deleteFileDirectory("ar-test");
	}

	@Test
	public void testCompressCpio() {
		// Cpio file compress test
		String targetDir = "sigar-bin";

		assertTrue(ZipUtil.compressCpio(targetDir));

		assertTrue(FileSystemUtil.existsFile("sigar-bin.cpio"));
		assertTrue(FileSystemUtil.getInformation("sigar-bin.cpio").getSize() > 1000);

		// Cpio file compress test
		assertTrue(ZipUtil.decompressArchive("sigar-bin.cpio", "cpio-dest"));
		assertTrue(FileSystemUtil.existsDir("cpio-dest/include"));
		assertTrue(FileSystemUtil.existsDir("cpio-dest/lib"));
		assertTrue(FileSystemUtil.existsFile("cpio-dest/lib/sigar.jar"));

		// clear
		FileSystemUtil.deleteFileDirectory("cpio-dest");
	}

	@Test
	public void testTemp() {
		ZipUtil.compressZip("E:/sw/sigar/hyperic-sigar-1.6.4-src/hyperic-sigar-1.6.4-src/bindings/java/src");
	}

}
