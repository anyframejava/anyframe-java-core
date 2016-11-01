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

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import org.anyframe.util.scripts.DefaultScriptExecutor;
import org.anyframe.util.scripts.OsType;
import org.apache.commons.compress.archivers.ArchiveEntry;
import org.apache.commons.compress.archivers.ArchiveException;
import org.apache.commons.compress.archivers.ArchiveInputStream;
import org.apache.commons.compress.archivers.ArchiveOutputStream;
import org.apache.commons.compress.archivers.ArchiveStreamFactory;
import org.apache.commons.compress.archivers.ar.ArArchiveEntry;
import org.apache.commons.compress.archivers.ar.ArArchiveOutputStream;
import org.apache.commons.compress.archivers.cpio.CpioArchiveEntry;
import org.apache.commons.compress.archivers.cpio.CpioArchiveOutputStream;
import org.apache.commons.compress.archivers.cpio.CpioConstants;
import org.apache.commons.compress.archivers.jar.JarArchiveEntry;
import org.apache.commons.compress.archivers.jar.JarArchiveOutputStream;
import org.apache.commons.compress.archivers.tar.TarArchiveEntry;
import org.apache.commons.compress.archivers.tar.TarArchiveOutputStream;
import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.commons.compress.archivers.zip.ZipArchiveOutputStream;
import org.apache.commons.compress.archivers.zip.ZipFile;
import org.apache.commons.compress.compressors.CompressorException;
import org.apache.commons.compress.compressors.CompressorOutputStream;
import org.apache.commons.compress.compressors.CompressorStreamFactory;
import org.apache.commons.compress.compressors.gzip.GzipCompressorInputStream;
import org.apache.commons.compress.compressors.gzip.GzipUtils;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Class that provides file or directory compress/decompress function. Supports
 * compress/decompress of zip, tar, tar.gz, etc. files using Apache Commons
 * Compress function. Zip file can additionally define Encoding, and original
 * Encoding should be taken into consideration when decompressing file that
 * includes Korean file name.
 * <p>
 * Below is an example of directory compress or decompress.
 * 
 * <pre>
 * 
 * </pre>
 * <p>
 * Refer to the below results when testing in Windows XP Korean version
 * 
 * <pre>
 * 	compressZip - encoding : null or UTF-8 --> decompressZip(encoding : null, EUC-KR, UTF-8 all can be used), decompressJavaZip can be used, decompressArchive can be used
 * 	compressZip - encoding : EUC-KR         --> decompressZip(encoding : should be EUC-KR), decompressJavaZip error occurs, decompressArchive error occurs
 * </pre>
 * 
 * @author ByungHun Woo
 * 
 */
public abstract class ZipUtil extends SystemUtilBase {

	/**
	 * ZipUtils Logger
	 */
	private static final Logger LOGGER = LoggerFactory.getLogger(ZipUtil.class);

	/**
	 * Provide interface so that decompress logic according to case can be
	 * developed as Callback. * Provide interface so that decompress logic
	 * according to case can be developed as Callback.
	 * 
	 * @author ByungHun Woo
	 * 
	 */
	public interface DecompressCallBack {
		public void doInDecompress(File file, File destDir) throws IOException,
				ArchiveException;
	}

	/**
	 * decompress general template - compress file check and destDir check,
	 * within decompress main logic Includes DecompressCallBack individual logic
	 * call handling.
	 * 
	 * @param action DecompressCallBack
	 * @param targetZipFileStr target zip file
	 * @param destDirStr destination directory
	 * @return true if decompress process is successful, false if not
	 */
	protected static boolean processDecompress(final DecompressCallBack action,
			String targetZipFileStr, String destDirStr) {
		// check zipFile
		final File file = new File(targetZipFileStr);
		if (!file.exists() || !file.canRead()) {
			LOGGER.error(
					"could not decompress. {} does not exists or can not read.",
					file.getAbsolutePath());
			return false;
		}

		// check destDir
		final File destDir = (destDirStr == null) ? file.getParentFile()
				: new File(destDirStr);
		if (!destDir.exists()) {
			destDir.mkdirs();
		}

		// main logic
		return processIO(new IOCallback<Boolean>() {
			public Boolean doInProcessIO() throws IOException, Exception {
				// for some cases
				// - commons-compress zip
				// - commons-compress archive(zip, jar, tar, ar, cpio),
				// - java.util.zip
				action.doInDecompress(file, destDir);
				return true;
			}
		});
	}

	/**
	 * Provides individual Entry handling that can be commonly used in various
	 * compress cases. Content of individual Entry in compressed file is
	 * extracted in Stream format and created as file in destination path. In
	 * this case, there is no content when Entry is directory, so the related
	 * directory is created.
	 * 
	 * @param destDir destination directory
	 * @param ais input stream
	 * @param isDirectory true if entry is directory, false if not
	 * @param entryName the name of entry
	 * @throws IOException
	 */
	protected static void processEachContent(final File destDir,
			InputStream ais, boolean isDirectory, String entryName)
			throws IOException {
		File itemFile = new File(destDir, entryName);
		if (isDirectory) {
			itemFile.mkdirs();
		} else {
			FileOutputStream fos = null;
			BufferedOutputStream bos = null;
			try {
				fos = new FileOutputStream(itemFile);
				bos = new BufferedOutputStream(fos);
				IOUtils.copy(ais, bos);
			} catch (IOException e) {
				LOGGER.error("fail to process each content.", e);
				throw e;
			} finally {
				if (bos != null) {
					bos.flush();
				}
				IOUtils.closeQuietly(bos);
				IOUtils.closeQuietly(fos);
			}
		}
	}

	/**
	 * Decompress related file with parameter as Zip compressed file path. In
	 * this case, decompress in the same path as the related compressed file.
	 * 
	 * @param targetZipFileStr target zip file
	 * @return true if decompress process is successful, false if not
	 */
	public static boolean decompressZip(String targetZipFileStr) {
		return decompressZip(targetZipFileStr, null, null);
	}

	/**
	 * Decompress Zip file. In this case, decompress in the destination path
	 * returned as parameter.
	 * 
	 * @param targetZipFileStr target zip file
	 * @param destDirStr destination directory
	 * @return true if decompress process is successful, false if not
	 */
	public static boolean decompressZip(String targetZipFileStr,
			String destDirStr) {
		return decompressZip(targetZipFileStr, destDirStr, null);
	}

	/**
	 * Decompress Zip file. In this case, return destination path and Encoding
	 * as parameter, and handle.
	 * 
	 * @param targetZipFileStr
	 * @param destDirStr
	 *            decompress in the same path as compressed file if destination
	 *            path is null
	 * @param encoding
	 *            default encoding of path when encoding is null
	 *            (System.getProperty("file.encoding"))
	 * @return true if decompress process is successful, false if not
	 * @see org.apache.commons.compress.archivers.zip.ZipFile
	 */
	public static boolean decompressZip(String targetZipFileStr,
			String destDirStr, final String encoding) {
		return processDecompress(new DecompressCallBack() {
			public void doInDecompress(File file, File destDir)
					throws IOException {
				// ZipFile case
				ZipFile zipFile = new ZipFile(file, encoding, true);

				@SuppressWarnings("unchecked")
				Enumeration<ZipArchiveEntry> entries = zipFile.getEntriesInPhysicalOrder();
				ZipArchiveEntry entry = null;

				while (entries.hasMoreElements()) {
					entry = entries.nextElement();
					InputStream content = zipFile.getInputStream(entry);
					processEachContent(destDir, content, entry.isDirectory(),
							entry.getName());
					IOUtils.closeQuietly(content);
				}
				// zipFile close
				ZipFile.closeQuietly(zipFile);
			}
		}, targetZipFileStr, destDirStr);
	}

	/**
	 * Decompress Gzip file and return related file.
	 * 
	 * @param gzipFile gzip file
	 * @return related file
	 * @throws IOException
	 */
	public static File decompressGzip(File gzipFile) throws IOException {
		FileInputStream fis = new FileInputStream(gzipFile);
		BufferedInputStream bis = new BufferedInputStream(fis);
		File archiveFile = new File(GzipUtils.getUncompressedFilename(gzipFile
				.getAbsolutePath()));
		FileOutputStream fos = new FileOutputStream(archiveFile);
		GzipCompressorInputStream gzIn = new GzipCompressorInputStream(bis);

		IOUtils.copy(gzIn, fos);

		if (fos != null) {
			fos.flush();
		}
		IOUtils.closeQuietly(gzIn);
		IOUtils.closeQuietly(fos);
		IOUtils.closeQuietly(bis);
		IOUtils.closeQuietly(fis);

		return archiveFile;
	}

	/**
	 * Use ArchiveStreamFactory of Commons Compress to decompress compressed
	 * file (Zip/Jar/Tar/Ar/Cpio).
	 * 
	 * @param targetCompressFileStr target compressed file
	 * @return true if decompress process is successful, false if not
	 * @see org.apache.commons.compress.archivers.ArchiveStreamFactory
	 */
	public static boolean decompressArchive(String targetCompressFileStr) {
		return decompressArchive(targetCompressFileStr, null);
	}

	/**
	 * Use ArchiveStreamFactory of Commons Compress to decompress compressed
	 * file (Zip/Jar/Tar/Ar/Cpio or tar.gz). In this case, decompress in
	 * destination path returned as parameter.
	 * 
	 * @param targetCompressFileStr target compressed file
	 * @param destDirStr destination directory
	 * @return true if decompress process is successful, false if not
	 * @see ArchiveStreamFactory
	 */
	public static boolean decompressArchive(String targetCompressFileStr,
			String destDirStr) {
		return processDecompress(new DecompressCallBack() {
			public void doInDecompress(File file, File destDir)
					throws IOException, ArchiveException {
				if (GzipUtils.isCompressedFilename(file.getName())) {
					file = decompressGzip(file);
				}
				FileInputStream fis = new FileInputStream(file);
				BufferedInputStream bis = new BufferedInputStream(fis);

				ArchiveInputStream ais = (ArchiveInputStream) new ArchiveStreamFactory().createArchiveInputStream(bis);
				ArchiveEntry entry = null;

				while ((entry = ais.getNextEntry()) != null) {
					processEachContent(destDir, ais, entry.isDirectory(),
							entry.getName());
				}
				IOUtils.closeQuietly(ais);
				IOUtils.closeQuietly(bis);
				IOUtils.closeQuietly(fis);
			}
		}, targetCompressFileStr, destDirStr);
	}

	/**
	 * Use java basic function (java.util.zip) to decompress Zip file. In this
	 * case, note that filename in compressed file should be UTF-8.
	 * 
	 * @param targetZipFileStr target zip file
	 * @return true if decompress process is successful, false if not
	 */
	public static boolean decompressJavaZip(String targetZipFileStr) {
		return decompressJavaZip(targetZipFileStr, null);
	}

	/**
	 * Use java basic function (java.util.zip) to decompress Zip file. In this
	 * case, decompress in destination path returned as parameter. Note that
	 * filename in compressed file should be UTF-8.
	 * 
	 * @param targetZipFileStr target zip file
	 * @param destDirStr destination directory
	 * @return true if decompress process is successful, false if not
	 */
	public static boolean decompressJavaZip(String targetZipFileStr,
			String destDirStr) {
		return processDecompress(new DecompressCallBack() {
			public void doInDecompress(File file, File destDir)
					throws IOException, ArchiveException {
				FileInputStream fis = new FileInputStream(file);
				BufferedInputStream bis = new BufferedInputStream(fis);

				ZipInputStream zis = new ZipInputStream(bis);
				ZipEntry entry = null;

				while ((entry = zis.getNextEntry()) != null) {
					processEachContent(destDir, zis, entry.isDirectory(),
							entry.getName());
					zis.closeEntry();
				}
				IOUtils.closeQuietly(zis);
				IOUtils.closeQuietly(bis);
				IOUtils.closeQuietly(fis);
			}
		}, targetZipFileStr, destDirStr);
	}

	/**
	 * Provide interface so that logic which needs to be compressed according to
	 * case is developed as Callback.
	 * 
	 * @author woos41
	 * 
	 */
	public interface CompressCallBack {
		public ArchiveOutputStream createArchiveOutputStream(OutputStream os);

		public ArchiveEntry createArchiveEntry(File targetDirFile,
				File entryFile);
	}

	/**
	 * Compress destination directory or compress result Archive path. Create
	 * dest archive file in appropriate path with suffix as parameter. In this
	 * case, force creation if parent path does not exist.
	 * 
	 * @param targetDirFile target directory or file
	 * @param destArchiveStr destination archive
	 * @param archiveSuffix
	 *            extension (ex. zip, tar, gz..)
	 * @return related file
	 * @throws IOException
	 */
	private static File makeDestArchiveFile(File targetDirFile,
			String destArchiveStr, String archiveSuffix) throws IOException {
		// check dest archive file
		File destArchiveFile = (destArchiveStr == null) ? new File(
				targetDirFile.getParent(), targetDirFile.getName() + "."
						+ archiveSuffix) : new File(destArchiveStr);
		if (!destArchiveFile.exists()) {
			File parentDir = new File(destArchiveFile.getAbsolutePath())
					.getParentFile();
			if (!parentDir.exists()) {
				FileUtils.forceMkdir(parentDir);
			}
		}

		return destArchiveFile;
	}

	/**
	 * Includes checking directory (file) to be compressed or creating dest
	 * compress file, and handling individual logic call of CompressCallBack
	 * within compress main logic.
	 * 
	 * @param action CompressCallBack
	 * @param targetDir target directory
	 * @param archiveSuffix
	 *            - "zip", "jar", "tar", "ar", "cpio"
	 * @return true if compress process is successful, false if not
	 */
	protected static boolean processCompress(final CompressCallBack action,
			final String targetDir, final String destArchiveStr,
			final String archiveSuffix) {
		// main logic
		return processIO(new IOCallback<Boolean>() {
			public Boolean doInProcessIO() throws IOException, Exception {
				// check targetDir or targetFile
				final File targetDirFile = new File(targetDir);
				if (!targetDirFile.exists() || !targetDirFile.canRead()) {
					LOGGER.error(
							"could not compress. {} does not exists or can not read.",
							targetDirFile.getAbsolutePath());
					return false;
				}

				final File destArchiveFile = makeDestArchiveFile(targetDirFile,
						destArchiveStr, archiveSuffix);

				FileOutputStream fos = new FileOutputStream(destArchiveFile);
				BufferedOutputStream bos = new BufferedOutputStream(fos);

				Iterator<File> iter = null;
				if (targetDirFile.isDirectory()) {
					iter = getNestedFileAndDirListAll(targetDirFile,
							new ArrayList<File>()).iterator();
				} else {
					iter = Arrays.asList(new File[] { targetDirFile })
							.iterator();
				}

				// archive output stream
				ArchiveOutputStream zos = action.createArchiveOutputStream(bos);

				while (iter.hasNext()) {
					File entryFile = iter.next();
					if (entryFile.isFile()) {
						FileInputStream entryFis = new FileInputStream(
								entryFile);
						BufferedInputStream entryBis = new BufferedInputStream(
								entryFis);

						// archive entry
						ArchiveEntry entry = action.createArchiveEntry(
								targetDirFile, entryFile);

						zos.putArchiveEntry(entry);

						IOUtils.copy(entryBis, zos);

						zos.closeArchiveEntry();
						IOUtils.closeQuietly(entryBis);
						IOUtils.closeQuietly(entryFis);
					} else {
						zos.putArchiveEntry(action.createArchiveEntry(
								targetDirFile, entryFile));
						zos.closeArchiveEntry();
					}
				}
				if (zos != null) {
					zos.flush();
				}
				IOUtils.closeQuietly(zos);
				IOUtils.closeQuietly(bos);
				IOUtils.closeQuietly(fos);

				return true;
			}

		});
	}

	/**
	 * Get all files and directories under targetDir recursively, and return in
	 * List<File> format.
	 * 
	 * @param targetDir target directory
	 * @param files list of files to search
	 * @return list of files
	 */
	public static List<File> getNestedFileAndDirListAll(File targetDir,
			List<File> files) {
		for (File dirOrFile : targetDir.listFiles()) {
			if (dirOrFile.isDirectory() && dirOrFile.canRead()) {
				files.add(dirOrFile);
				getNestedFileAndDirListAll(dirOrFile, files);
			} else {
				files.add(dirOrFile);
			}
		}

		return files;
	}

	/**
	 * Get destination path of compress Entry based on original compress
	 * directory. In this case, set so that it ends with "/" when Entry is
	 * directory. When original path and Entry path are the same, handle as
	 * single item file, and apply relative path exceptionally.
	 * 
	 * @param file file
	 * @param entryFile entry file
	 * @return destination path
	 */
	private static String toRelativePath(File file, File entryFile) {
		String relativePath = entryFile.getAbsolutePath().substring(
				file.getAbsolutePath().length());
		if (relativePath.length() == 0) {
			relativePath = entryFile.getName();
		}

		if (entryFile.isDirectory() && !relativePath.endsWith("/")) {
			relativePath += "/";
		}
		return relativePath.replace(File.separatorChar, '/').replaceFirst("^/",
				"");
	}

	/**
	 * Handle Zip compress by getting compress destination path for directory or
	 * file as parameter.
	 * 
	 * @param targetDir target directory
	 * @return true if compress process is successful, false if not
	 */
	public static boolean compressZip(String targetDir) {
		return compressZip(targetDir, null, null);
	}

	/**
	 * Handle Zip compress by getting compress destination path for directory or
	 * file as parameter. In this case, create compressed file in destArchiveStr
	 * path returned as parameter.
	 * 
	 * @param targetDir target directory
	 * @param destArchiveStr
	 *            absolute path of compressed file to be created (or standard
	 *            relative path of working directory)
	 * @return true if compress process is successful, false if not
	 */
	public static boolean compressZip(String targetDir, String destArchiveStr) {
		return compressZip(targetDir, destArchiveStr, null);
	}

	/**
	 * Get compress destination path for directory or file and handle Zip. In
	 * this case, compressed file is created in destArchiveStr path returned as
	 * parameter, and Entry filename is developed in compressed file applying
	 * Encoding returned as parameter.
	 * 
	 * @param targetDir target directory
	 * @param destArchiveStr destination archive
	 * @param encoding
	 *            platform default when null
	 * @return true if compress process is successful, false if not
	 * @see ZipArchiveOutputStream, ZipArchiveEntry
	 */
	public static boolean compressZip(String targetDir, String destArchiveStr,
			final String encoding) {
		return processCompress(new CompressCallBack() {
			public ArchiveOutputStream createArchiveOutputStream(OutputStream os) {
				ZipArchiveOutputStream zos = new ZipArchiveOutputStream(os);
				zos.setEncoding(encoding);
				return zos;
			}

			public ArchiveEntry createArchiveEntry(File targetDirFile,
					File entryFile) {
				ZipArchiveEntry entry = new ZipArchiveEntry(toRelativePath(
						targetDirFile, entryFile));
				entry.setSize(entryFile.length());
				return entry;
			}
		}, targetDir, destArchiveStr, "zip");
	}

	/**
	 * Get compress destination path for directory or file as parameter to
	 * handle Jar (similar to Zip).
	 * 
	 * @param targetDir target directory
	 * @return true if compress process is successful, false if not
	 */
	public static boolean compressJar(String targetDir) {
		return compressJar(targetDir, null, null);
	}

	/**
	 * Get compress destination path for directory or file as parameter to
	 * handle Jar (similar to Zip). In this case, create compressed file in
	 * destArchiveStr path returned as parameter.
	 * 
	 * @param targetDir target directory
	 * @param destArchiveStr destination archive
	 * @return true if compress process is successful, false if not
	 */
	public static boolean compressJar(String targetDir, String destArchiveStr) {
		return compressJar(targetDir, destArchiveStr, null);
	}

	/**
	 * Get compress destination path for directory or file as parameter to
	 * handle Jar (similar to Zip). In this case, create compressed file in
	 * destArchiveStr path returned as parameter, and apply Encoding returned as
	 * parameter to develop Entry filename in compressed file.
	 * 
	 * @param targetDir target directory
	 * @param destArchiveStr destination archive
	 * @param encoding encoding
	 * @return true if compress process is successful, false if not
	 * @see JarArchiveOutputStream, JarArchiveEntry
	 */
	public static boolean compressJar(String targetDir, String destArchiveStr,
			final String encoding) {
		return processCompress(new CompressCallBack() {
			public ArchiveOutputStream createArchiveOutputStream(OutputStream os) {
				JarArchiveOutputStream jos = new JarArchiveOutputStream(os);
				jos.setEncoding(encoding);
				return jos;
			}

			public ArchiveEntry createArchiveEntry(File targetDirFile,
					File entryFile) {
				JarArchiveEntry entry = new JarArchiveEntry(toRelativePath(
						targetDirFile, entryFile));
				entry.setSize(entryFile.length());
				return entry;
			}
		}, targetDir, destArchiveStr, "jar");
	}

	/**
	 * Get compress destination path for directory or file as parameter to
	 * handle Tar (bind into one file).
	 * 
	 * @param targetDir target directory
	 * @return true if compress process is successful, false if not
	 */
	public static boolean compressTar(String targetDir) {
		return compressTar(targetDir, null);
	}

	/**
	 * Get compress destination path for directory or file as parameter to
	 * handle Tar (bind into one file). In this case, create compressed file in
	 * destArchiveStr path returned as parameter.
	 * 
	 * @param targetDir target directory
	 * @param destArchiveStr destination archive
	 * @return true if compress process is successful, false if not
	 * @see TarArchiveOutputStream, TarArchiveEntry
	 */
	public static boolean compressTar(String targetDir, String destArchiveStr) {
		return processCompress(new CompressCallBack() {
			public ArchiveOutputStream createArchiveOutputStream(OutputStream os) {
				TarArchiveOutputStream tos = new TarArchiveOutputStream(os);
				return tos;
			}

			public ArchiveEntry createArchiveEntry(File targetDirFile,
					File entryFile) {
				TarArchiveEntry entry = new TarArchiveEntry(toRelativePath(
						targetDirFile, entryFile));
				entry.setSize(entryFile.length());
				return entry;
			}
		}, targetDir, destArchiveStr, "tar");
	}

	/**
	 * Handle Gzip. Gzip is usually for tar compress file, and related method is
	 * called internally in compressTarGz method.
	 * 
	 * @param targetArchiveOrFile target archive of file
	 * @param destArchiveStr destination archive
	 * @return related file
	 * @throws CompressorException
	 * @throws IOException
	 */
	public static File compressGzip(File targetArchiveOrFile,
			String destArchiveStr) throws CompressorException, IOException {

		FileInputStream fis = new FileInputStream(targetArchiveOrFile);
		BufferedInputStream bis = new BufferedInputStream(fis);

		File gzipFile = makeDestArchiveFile(targetArchiveOrFile,
				destArchiveStr, "gz");
		FileOutputStream fos = new FileOutputStream(gzipFile);

		CompressorOutputStream cos = new CompressorStreamFactory()
				.createCompressorOutputStream(CompressorStreamFactory.GZIP, fos);

		IOUtils.copy(bis, cos);

		if (cos != null) {
			cos.flush();
		}
		IOUtils.closeQuietly(cos);
		IOUtils.closeQuietly(fos);
		IOUtils.closeQuietly(bis);
		IOUtils.closeQuietly(fis);

		return gzipFile;
	}

	/**
	 * Handle tar.gz by getting compress file path of directory or file as
	 * parameter.
	 * 
	 * @param targetDir target directory
	 * @return true if compress process is successful, false if not
	 */
	public static boolean compressTarGz(String targetDir) {
		return compressTarGz(targetDir, null);
	}

	/**
	 * Get compress destination path for directory or file as parameter to
	 * handle tar.gz. In this case, create compressed file in destTarGzStr path
	 * returned as parameter. Internally, the Tar file created after compressing
	 * compressTar is compressed in Gzip by calling compressGzip method. Note
	 * that tar file is created in the same location as final tar.gz compress
	 * file.
	 * 
	 * @param targetDir target directory
	 * @param destTarGzStr destination tar gz
	 * @return true if compress process is successful, false if not
	 */
	public static boolean compressTarGz(final String targetDir,
			final String destTarGzStr) {
		return processIO(new IOCallback<Boolean>() {
			public Boolean doInProcessIO() throws IOException, Exception {
				File targetDirFile = new File(targetDir);
				File targetTarFile = null;

				if (destTarGzStr == null) {
					targetTarFile = new File(targetDirFile.getAbsoluteFile()
							.getParentFile(), targetDirFile.getName() + ".tar");
				} else {
					targetTarFile = new File(new File(destTarGzStr)
							.getAbsoluteFile().getParentFile()
							.getAbsolutePath(), targetDirFile.getName()
							+ ".tar");
				}

				if (!compressTar(targetDir, targetTarFile.getAbsolutePath())) {
					return false;
				}

				compressGzip(targetTarFile, destTarGzStr);

				return true;
			}
		});

	}

	/**
	 * Handle Ar by getting compress destination path for directory or file as
	 * parameter.
	 * 
	 * @param targetDir target directory
	 * @return true if compress process is successful, false if not
	 */
	public static boolean compressAr(String targetDir) {
		return compressAr(targetDir, null);
	}

	/**
	 * Handle Ar by getting compress destination path for directory or file as
	 * parameter. In this case, create compressed file in destArchiveStr path
	 * returned as parameter. Note that there is a 16 byte limit to filename.
	 * 
	 * @param targetDir target directory
	 * @param destArchiveStr destination archive
	 * @return true if compress process is successful, false if not
	 * @see ArArchiveOutputStream, ArchiveEntry
	 */
	public static boolean compressAr(String targetDir, String destArchiveStr) {
		final boolean isUnix = DefaultScriptExecutor.getOs().is(OsType.Unix);

		return processCompress(new CompressCallBack() {
			public ArchiveOutputStream createArchiveOutputStream(OutputStream os) {
				ArArchiveOutputStream aros = new ArArchiveOutputStream(os);
				return aros;
			}

			public ArchiveEntry createArchiveEntry(File targetDirFile,
					File entryFile) {
				return new ArArchiveEntry(toRelativePath(targetDirFile,
						entryFile), isUnix && entryFile.isDirectory() ? 0
						: entryFile.length());
			}
		}, targetDir, destArchiveStr, "ar");
	}

	/**
	 * Handle Cpio by getting compress destination path for directory or file as
	 * parameter.
	 * 
	 * @param targetDir
	 * @return
	 */
	public static boolean compressCpio(String targetDir) {
		return compressCpio(targetDir, null);
	}

	/**
	 * Handle Cpio by getting compress destination path as parameter for
	 * directory or file. In this case, compress file is created in
	 * destArchiveStr path returned as parameter.
	 * 
	 * @param targetDir target directory
	 * @param destArchiveStr destination archive
	 * @return true if compress process is successful, false if not
	 * @see CpioArchiveOutputStream, CpioArchiveEntry
	 */
	public static boolean compressCpio(String targetDir, String destArchiveStr) {
		return processCompress(new CompressCallBack() {
			public ArchiveOutputStream createArchiveOutputStream(OutputStream os) {
				CpioArchiveOutputStream cpioos = new CpioArchiveOutputStream(os);
				return cpioos;
			}

			public ArchiveEntry createArchiveEntry(File targetDirFile,
					File entryFile) {
				CpioArchiveEntry entry = new CpioArchiveEntry(toRelativePath(
						targetDirFile, entryFile));
				if (entryFile.isDirectory()) {
					entry.setMode(CpioConstants.C_ISDIR);
				} else {
					entry.setSize(entryFile.length());
					entry.setMode(CpioConstants.C_ISREG);
				}
				return entry;
			}
		}, targetDir, destArchiveStr, "cpio");
	}

}
