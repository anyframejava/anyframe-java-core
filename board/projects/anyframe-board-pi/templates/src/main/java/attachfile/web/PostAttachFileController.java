package ${packageName}.attachfile.web;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.MissingResourceException;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.FileUploadBase.FileSizeLimitExceededException;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.ProgressListener;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.servlet.ServletRequestContext;
import org.apache.commons.fileupload.util.Streams;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import ${packageName}.attachfile.domain.PostAttachFile;
import ${packageName}.attachfile.service.PostAttachFileMeta;
import ${packageName}.attachfile.service.PostAttachFileService;
import ${packageName}.attachfile.service.PostAttachFileUploadConfig;
import ${packageName}.attachfile.service.PostAttachFileUploadException;

import com.ibm.icu.text.Normalizer;

@Controller("postAttachFileController")
@RequestMapping("/postAttachFile.do")
public class PostAttachFileController {
	@Value("#{contextProperties['disk.path']}")
	private String repositoryPath;

	@Inject
	@Named("postAttachFileService")
	private PostAttachFileService postAttachFileService;

	public static String GETMETAREAL_PARAM = "filename";
	public static String PROGRESS_PARAM1_PROGRESS = "progress";
	public static String PROGRESS_PARAM2_CONTENTBYTE = "contentbyte";
	public static String PROGRESS_PARAM3_READBYTE = "readbyte";
	private static int DISK_THRESHOLD_SIZE = 1024 * 1024 * 3; // 3MB
	private static String PREFIX_OF_BOARD_ID = "${boardName.toUpperCase()}-";
	private static String ATTACH_FILE_ID = "ATTACHFILE";

	private String targetPath = "";
	private String tempPath = "";
	private long maxFileSize = -1L;

	private static long content_length = 0;
	private static long readbyte_length = 0;

	private PostAttachFileUploadConfig fuConfig = null;

	private HashMap<String, PostAttachFileMeta> mapFileMeta = new HashMap<String, PostAttachFileMeta>();

	private Object upMutex = new Object();
	private Object getmetaMutex = new Object();

	@PostConstruct
	private void loadConfiguration() {
		if (fuConfig == null) {

			try {
				fuConfig = new PostAttachFileUploadConfig();
			} catch (MissingResourceException e) {
				e.printStackTrace();
			}
		}
	}

	@RequestMapping(params = "method=prepare", method = RequestMethod.GET)
	public void prepareFileUpload(HttpServletRequest request,
			HttpServletResponse response, HttpSession session)
			throws IOException, JSONException {
		JSONObject jsonResult = new JSONObject();
		jsonResult.put("succ", true);
		response.setContentType("text/JSON");
		response.getWriter().write(jsonResult.toString());
	}

	@RequestMapping(params = "method=getmetaFake", method = RequestMethod.POST)
	public void getFileMetaFake(HttpServletRequest request,
			HttpServletResponse response, HttpSession session)
			throws JSONException, IOException {
		JSONObject jsonResult = new JSONObject();
		response.setContentType("text/JSON");
		response.setCharacterEncoding("utf-8");

		try {
			getMetaFake(request);
			response.setStatus(HttpServletResponse.SC_ACCEPTED);
		} catch (PostAttachFileUploadException e) {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
					e.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
			jsonResult.put("succ", false);
			jsonResult.put("msg", e.getMessage());
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
					jsonResult.toString());
		}
	}

	@RequestMapping(params = "method=getmetaReal", method = RequestMethod.GET)
	public void getFileMetaReal(HttpServletRequest request,
			HttpServletResponse response, HttpSession session)
			throws JSONException, IOException {
		String filename = Normalizer.normalize(
				request.getParameter(GETMETAREAL_PARAM), Normalizer.NFC);

		if (filename == null || filename.length() <= 0) {
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}

		try {
			PostAttachFileMeta fm = getMeta(filename);

			JSONObject jsonResult = new JSONObject();
			jsonResult.put("filename", filename);
			jsonResult.put("filesize", fm.getSize()); 

			response.setContentType("text/JSON");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write(jsonResult.toString());
		} catch (Exception e) {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
					e.getMessage());
		}

	}

	@RequestMapping(params = "method=upload", method = RequestMethod.POST)
	public void uploadAttachFile(HttpServletRequest request,
			HttpServletResponse response, HttpSession session)
			throws JSONException, IOException, FileUploadException, Exception {
		JSONObject jsonResult = new JSONObject();
		response.setContentType("text/JSON");
		response.setCharacterEncoding("utf-8");

		try {

			PostAttachFile fInfo = upload(request); // 물리파일 업로드
			jsonResult.put("succ", true);
			jsonResult.put("postId", fInfo.getPostId());

			response.getWriter().write(jsonResult.toString());
		} catch (PostAttachFileUploadException e) {
			jsonResult.put("succ", false);
			jsonResult.put("msg", e.getMessage());
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
					jsonResult.toString());
		}
	}

	@RequestMapping(params = "method=progressReal", method = RequestMethod.GET)
	public void getProgress(HttpServletRequest request,
			HttpServletResponse response, HttpSession session)
			throws JSONException, IOException {

		JSONObject jsonResult = new JSONObject();

		Map<String, Long> retVals = new HashMap<String, Long>();
		long nProgress = (content_length <= 0) ? 0
				: (int) (((float) readbyte_length / (float) content_length) * 100L);

		retVals.put(PROGRESS_PARAM1_PROGRESS, nProgress);
		retVals.put(PROGRESS_PARAM2_CONTENTBYTE, content_length);
		retVals.put(PROGRESS_PARAM3_READBYTE, readbyte_length);

		Iterator<String> itor = retVals.keySet().iterator();

		while (itor.hasNext()) {
			String key = itor.next();
			jsonResult.put(key, retVals.get(key));
		}

		response.setContentType("text/JSON");
		response.setCharacterEncoding("utf-8");
		response.getWriter().write(jsonResult.toString());
	}

	@RequestMapping(params = "method=download")
	protected String download(PostAttachFile postAttachFile,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		Cookie theCookie = null;
		String retval = "";
		theCookie = new Cookie("FileParam", retval);
		response.addCookie(theCookie);

		String fileId = postAttachFile.getAttachFileId();
		String fileName = postAttachFile.getAttachFileName();
		String filePath = repositoryPath + "/" + fileId;
		String fileExt = fileName.substring(fileName.lastIndexOf(".") + 1);

		response.reset();

		if (fileExt.equals("doc")) {
			response.setContentType("application/msword;charset=MS949");
		} else if (fileExt.equals("xls")) {
			response.setContentType("application/x-msexcel;charset=MS949");
		} else if (fileExt.equals("pdf")) {
			response.setContentType("application/x-msdownload");
		} else if (fileExt.equals("ppt")) {
			response.setContentType("application/x-mspowerpoint");
		} else if (fileExt.equals("js")) {
			response.setContentType("application/x-javascript");
		} else if (fileExt.equals("zip")) {
			response.setContentType("application/zip");
		} else if (fileExt.equals("gif")) {
			response.setContentType("image/gif");
		} else if (fileExt.equals("jpeg") || fileExt.equals("jpg")
				|| fileExt.equals("jpe")) {
			response.setContentType("image/jpeg");
		} else if (fileExt.equals("css")) {
			response.setContentType("text/css");
		} else if (fileExt.equals("html") || fileExt.equals("htm")) {
			response.setContentType("text/html");
		} else if (fileExt.equals("xml")) {
			response.setContentType("text/xml");
		} else {
			response.setContentType("application/octet-stream");
		}

		String userAgent = request.getHeader("User-Agent");
		if (userAgent.indexOf("MSIE 5.5") > -1) {
			response.setHeader("Content-Disposition", "filename=\""
					+ URLEncoder.encode(fileName, "UTF-8") + "\";");
		} else if (userAgent.indexOf("MSIE") > -1) {
			response.setHeader("Content-Disposition", "attachment; filename=\""
					+ java.net.URLEncoder.encode(fileName, "UTF-8") + "\";");
		} else {
			response.setHeader("Content-Disposition", "attachment; filename=\""
					+ new String(fileName.getBytes("euc-kr"), "latin1") + "\";");
		}
		response.setHeader("Content-Transfer-Encoding", "binary;");

		response.setHeader("Pragma", "no-cache;");
		response.setHeader("Expires", "-1;");

		BufferedInputStream fin = null;
		BufferedOutputStream outs = null;
		int read = 0;

		try {
			File file = new File(filePath);
			byte b[] = new byte[4096];

			if (file.isFile()) {
				fin = new BufferedInputStream(new FileInputStream(file));
				outs = new BufferedOutputStream(response.getOutputStream());

				while ((read = fin.read(b)) != -1) {
					outs.write(b, 0, read);
				}

				retval = "SUCC::";
			} else {
				retval = "FAIL::File Not Found";
			}

			outs.flush();
			outs.close();
			fin.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (outs != null)
				outs.close();
			if (fin != null)
				fin.close();
		}
		return null;
	}

	private PostAttachFile upload(HttpServletRequest request)
			throws PostAttachFileUploadException, Exception {
		PostAttachFile fInfo = new PostAttachFile();
		synchronized (upMutex) {

			try {
				tempPath = fuConfig
						.getValue(PostAttachFileUploadConfig.COMMON_TEMP_PATH);
				targetPath = fuConfig
						.getValue(PostAttachFileUploadConfig.KEY_DISK_PATH);
				maxFileSize = Long
						.valueOf(fuConfig
								.getValue(PostAttachFileUploadConfig.COMMON_FILE_MAXSIZE));

				content_length = (new ServletRequestContext(request))
						.contentLength();
				readbyte_length = 0;
				fInfo = save(request);
			} catch (FileUploadException e) {
				e.printStackTrace();
				throw new PostAttachFileUploadException(
						PostAttachFileUploadException.FUA_ERROR_UPLOAD,
						e.getMessage());
			} catch (IOException e) {
				e.printStackTrace();
				if (e.getCause().getClass().getName()
						.equals(FileSizeLimitExceededException.class.getName()))
					throw new PostAttachFileUploadException(
							PostAttachFileUploadException.FUA_ERROR_SIZE_LIMIT,
							"exeeded the size limit : "
									+ ((FileSizeLimitExceededException) e
											.getCause()).getPermittedSize(), e);
				else
					throw new PostAttachFileUploadException(
							PostAttachFileUploadException.FUA_ERROR_IO,
							e.getMessage());
			} catch (Exception e) {
				e.printStackTrace();
				throw e;
			}
		}

		return fInfo;
	}

	private void getMetaFake(HttpServletRequest request)
			throws PostAttachFileUploadException, Exception {
		synchronized (getmetaMutex) {

			DiskFileItemFactory factory = new DiskFileItemFactory();
			ServletFileUpload hUpload = new ServletFileUpload(factory);

			try {

				FileItemIterator itor = hUpload.getItemIterator(request);

				while (itor.hasNext()) {

					FileItemStream fis = itor.next();

					long nContentSize = (new ServletRequestContext(request))
							.contentLength();

					PostAttachFileMeta fm = new PostAttachFileMeta(
							nContentSize, fis.getName());
					mapFileMeta.put(fm.getName(), fm);
					break;
				}

			} catch (FileUploadException e) {
				e.printStackTrace();
				throw new PostAttachFileUploadException(
						PostAttachFileUploadException.FUA_ERROR_UPLOAD,
						e.getMessage());
			} catch (IOException e) {
				e.printStackTrace();
				throw new PostAttachFileUploadException(
						PostAttachFileUploadException.FUA_ERROR_IO,
						e.getMessage());
			} catch (Exception e) {
				e.printStackTrace();
				throw e;
			}

		}
	}

	private PostAttachFileMeta getMeta(String filename) {
		synchronized (getmetaMutex) {

			PostAttachFileMeta fmFound = mapFileMeta.get(filename);
			if (fmFound != null) {
				mapFileMeta.remove(filename);
			}

			return fmFound;
		}
	}

	private PostAttachFile save(HttpServletRequest request)
			throws FileUploadException, IOException, Exception {

		if (targetPath.length() <= 0)
			return null;

		PostAttachFile fInfo = new PostAttachFile();
		boolean isMultipart = ServletFileUpload.isMultipartContent(request);
		try {
			if (isMultipart) {

				DiskFileItemFactory factory = new DiskFileItemFactory();
				factory.setSizeThreshold(DISK_THRESHOLD_SIZE);
				factory.setRepository(new File(tempPath));

				ServletFileUpload hUpload = new ServletFileUpload(factory);

				ProgressListener progressTest = new ProgressListener() {

					public void update(long pBytesRead, long pContentLength,
							int pItems) {

						if (pContentLength != -1) {
							readbyte_length = pBytesRead;
						}
					}
				};
				hUpload.setProgressListener(progressTest);
				hUpload.setFileSizeMax(maxFileSize);
				FileItemIterator itor;

				itor = hUpload.getItemIterator(request);

				while (itor.hasNext()) {

					FileItemStream fiStrm = itor.next();

					if (null == fiStrm.getName()) {
						break;
					}

					String fileId = ATTACH_FILE_ID + System.currentTimeMillis();

					if (!fiStrm.isFormField()) {
						InputStream inStrm = fiStrm.openStream();

						File file = new File(targetPath + "/" + fileId);
						FileOutputStream fo = new FileOutputStream(file);

						Streams.copy(inStrm, fo, true);
						inStrm.close();
					}

					long nContentSize = (new ServletRequestContext(request))
							.contentLength();

					if (null != request.getParameter("postId")
							&& !"".equals(request.getParameter("postId"))
							&& !"undefined".equals(request
									.getParameter("postId"))) {
						fInfo.setPostId(request.getParameter("postId"));
					} else {
						fInfo.setPostId(PREFIX_OF_BOARD_ID
								+ System.currentTimeMillis()); 
					}

					fInfo.setAttachFileId(fileId);
					fInfo.setAttachFileName(fiStrm.getName());
					fInfo.setAttachFileSize(nContentSize);
					fInfo.setAttachFilePath(targetPath);

					postAttachFileService.save(fInfo);
				}
			}
		} catch (FileUploadException e) {
			throw e;
		} catch (Exception e) {
			throw e;
		}
		return fInfo;
	}

}
