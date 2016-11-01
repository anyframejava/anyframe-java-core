/*
 * Copyright 2008-2011 the original author or authors.
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
package org.anyframe.plugin.jquery.attach.web;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.jquery.attach.service.UploadInfoService;
import org.anyframe.plugin.jquery.domain.Attached;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * This UploadInfoController class is a Controller class 
 * to provide file upload functionality.
 * 
 * @author arumb-laptop
 *
 */
@Controller
@RequestMapping("/jquery/uploadInfo.do")
public class UploadInfoController {
public static Log logger = LogFactory.getLog(UploadInfoController.class);
	
	@Inject
	@Named("jqueryUploadInfoService")
    private UploadInfoService uploadInfoService;
    
    public void setJqueryFileUploadService(UploadInfoService uploadInfoService) {
        this.uploadInfoService = uploadInfoService;
    }
    
    /**
     * 첨부파일 form load
     * @param refId
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "method=uploadForm")  
    public String uploadForm(@RequestParam("refId") String refId, Model model) throws Exception {
    	try{
    		List<Attached> list = uploadInfoService.getFileList(refId);
        	int listSize = 0;
        	if(list != null) {
        		listSize = list.size();
        		for(int i=0;i<listSize;i++) {
        			Attached f = (Attached)list.get(i);
        			if(f.getName().lastIndexOf(".") != -1) {
        				f.setExt(f.getName().substring(f.getName().lastIndexOf(".")+1).toLowerCase());
        			}else{
        				f.setExt("");
        			}
        			if(f.getFileSize().longValue() > 1024) {
        				if(f.getFileSize() > 1024*1024 ) {
        					long t = f.getFileSize().longValue()/(1024*1024);
            				f.setFileSizeString(Long.toString(t) + " MB");	
        				}else{
        					long t = f.getFileSize().longValue()/(1024);
            				f.setFileSizeString(Long.toString(t) + " KB");	
        				}
        			}else{
        				long t = f.getFileSize().longValue();
        				f.setFileSizeString(Long.toString(t) + " Bytes");
        			}
        		}
        	}
    		model.addAttribute("jqueryFileUploadList", list);
    	}catch(Exception e){
    		logger.error(e.getMessage(), e);
    		throw e;
    	}
    	return "jqueryFileUpload/uploadForm";
    }
    
    @RequestMapping(params = "method=uploadFormAjax")  
    public String uploadFormAjax() throws Exception {
    	return "attach/uploadFormAjax";
    }
    
    /**
     * @param refId
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "method=getFileList")  
    public String getFileList(@RequestParam("refId") String refId, Model model) throws Exception {
    	try{
    		List<Attached> list = uploadInfoService.getFileList(refId);
        	int listSize = 0;
        	if(list != null) {
        		listSize = list.size();
        		for(int i=0;i<listSize;i++) {
        			Attached f = (Attached)list.get(i);
        			if(f.getName().lastIndexOf(".") != -1) {
        				f.setExt(f.getName().substring(f.getName().lastIndexOf(".")+1).toLowerCase());
        			}else{
        				f.setExt("");
        			}
        			if(f.getFileSize().longValue() > 1024) {
        				if(f.getFileSize() > 1024*1024 ) {
        					long t = f.getFileSize().longValue()/(1024*1024);
            				f.setFileSizeString(Long.toString(t) + " MB");	
        				}else{
        					long t = f.getFileSize().longValue()/(1024);
            				f.setFileSizeString(Long.toString(t) + " KB");	
        				}
        			}else{
        				long t = f.getFileSize().longValue();
        				f.setFileSizeString(Long.toString(t) + " Bytes");
        			}
        		}
        	}
    		model.addAttribute("attachedList", list);
    	}catch(Exception e){
    		logger.error(e.getMessage(), e);
    		throw e;
    	}
    	return "jsonView";
    }
    
    /**
     * 첨부파일 저장(1개씩)
     * @param param
     * @param results
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "method=saveFile")  
    public String saveFile(Attached param, BindingResult results, Model model) throws Exception {
    	
    	if (results.hasErrors()) {
			return "jsonView";
		}
    	
    	logger.debug("param.getId()=" + param.getId());
    	
    	if("".equals(param.getRefId()) || param.getRefId() == null) {
    		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmssSSS", new Locale("ko", "KR"));
    		String refId = "REF-" + formatter.format(new Date());
    		param.setRefId(refId);
    	}
    	
        uploadInfoService.create(param);
        
        model.addAttribute("param", param);
        return "jsonView";        
    }

    /**
     * 첨부파일 삭제(1개씩)
     * @param param
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "method=remove") 
    public String remove(Attached param) throws Exception {
        uploadInfoService.remove(param.getId());
        return "jsonView";
    }
}
