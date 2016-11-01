package org.anyframe.plugin.fileupload.jfileupload.web;

import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.anyframe.plugin.fileupload.FileMeta;
import org.anyframe.plugin.fileupload.FileUploadAgent;
import org.anyframe.plugin.fileupload.FileUploadAgentException;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.ibm.icu.text.Normalizer;


@Controller("fileuploadJFileUploadController")
@RequestMapping("/fileuploadJFileUpload.do")
public class JFileUploadController {

	@RequestMapping(params="method=view", method = RequestMethod.GET)
	public String fileuploadView(Model model, HttpServletRequest request, HttpSession session) throws Exception{
		
		FileUploadAgent fuAgent = null;
		
		if ( (fuAgent = (FileUploadAgent) session.getAttribute(FileUploadAgent.SESSION_OBJECT_NAME)) == null )  {
			fuAgent = new FileUploadAgent();
			session.setAttribute(FileUploadAgent.SESSION_OBJECT_NAME, fuAgent);
		}
		
		return "/fileupload/form";
	}
	
	@RequestMapping(params="method=prepare", method = RequestMethod.GET)
	public void prepareFileUpload(HttpServletRequest request, HttpServletResponse response, HttpSession session) throws IOException, JSONException {
		
		FileUploadAgent fuAgent = null;
		
		if ( (fuAgent = (FileUploadAgent) session.getAttribute(FileUploadAgent.SESSION_OBJECT_NAME)) == null )  {
			fuAgent = new FileUploadAgent();
			session.setAttribute(FileUploadAgent.SESSION_OBJECT_NAME, fuAgent);
		}
		
		String utype = request.getParameter(FileUploadAgent.PREPARE_PARAM);
		if (fuAgent == null || utype == null || utype.length() <= 0) {
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}
		
		fuAgent.start(utype);
		
		JSONObject jsonResult = new JSONObject();
		jsonResult.put("succ", true);
		response.setContentType("text/JSON");
		response.getWriter().write(jsonResult.toString());				
	}
	
	
	@RequestMapping(params = "method=getmetaFake", method = RequestMethod.POST)
	public void getFileMetaFake(HttpServletRequest request, HttpServletResponse response, HttpSession session) throws JSONException, IOException {
		
		FileUploadAgent fuAgent = null;
		
		if ( (fuAgent = (FileUploadAgent) session.getAttribute(FileUploadAgent.SESSION_OBJECT_NAME)) == null )  {
			fuAgent = new FileUploadAgent();
			session.setAttribute(FileUploadAgent.SESSION_OBJECT_NAME, fuAgent);
		}
		
		try {
			fuAgent.getMetaFake(request);
			response.setStatus(HttpServletResponse.SC_ACCEPTED);
		} catch (FileUploadAgentException e) {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, e.getMessage());
		}
	}
	
	@RequestMapping(params = "method=getmetaReal", method = RequestMethod.GET)
	public void getFileMetaReal(HttpServletRequest request, HttpServletResponse response, HttpSession session) throws JSONException, IOException {
		
		FileUploadAgent fuAgent = (FileUploadAgent) session.getAttribute(FileUploadAgent.SESSION_OBJECT_NAME);
		String filename = Normalizer.normalize( request.getParameter(FileUploadAgent.GETMETAREAL_PARAM),  Normalizer.NFC );
		
		if (filename == null || filename.length() <= 0) {
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}
		
		try {
			FileMeta fm = fuAgent.getMeta(filename);
			
			JSONObject jsonResult = new JSONObject();
			jsonResult.put("filename", filename);
			jsonResult.put("filesize", fm.getSize());
					
			response.setContentType("text/JSON");			
			response.setCharacterEncoding("utf-8");
			response.getWriter().write(jsonResult.toString());	
		}
		catch (Exception e) {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, e.getMessage());
		}
		
	}
	
	@RequestMapping(params = "method=upload", method = RequestMethod.POST)
	public void upload(HttpServletRequest request, HttpServletResponse response, HttpSession session) throws JSONException, IOException {
	
		FileUploadAgent fuAgent = (FileUploadAgent) session.getAttribute(FileUploadAgent.SESSION_OBJECT_NAME);
				
		if (fuAgent == null) {
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}

		JSONObject jsonResult = new JSONObject();
		response.setContentType("text/plain");
		response.setCharacterEncoding("utf-8");
		
		try {
			fuAgent.upload(request);			
			jsonResult.put("succ", true);
			response.getWriter().write(jsonResult.toString());
		} catch (FileUploadAgentException e) {			
			jsonResult.put("succ", false);
			jsonResult.put("msg", e.getMessage());
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, jsonResult.toString());
		}
	}
	
	@RequestMapping(params = "method=progressReal", method = RequestMethod.GET)
	public void getProgress(HttpServletRequest request, HttpServletResponse response, HttpSession session) throws JSONException, IOException {	
		
		FileUploadAgent fuAgent = (FileUploadAgent) session.getAttribute(FileUploadAgent.SESSION_OBJECT_NAME);
		
		JSONObject jsonResult = new JSONObject();
	
		HashMap<String, Long> retVals = fuAgent.getProgress();
		
		Iterator<String> itor = retVals.keySet().iterator();
		
		while( itor.hasNext() )
		{
			String key = itor.next();
			jsonResult.put(key, retVals.get(key));
		}
		
		response.setContentType("text/JSON");		
		response.setCharacterEncoding("utf-8");
		response.getWriter().write(jsonResult.toString());		
	}	
	 
}
