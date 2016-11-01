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
package org.anyframe.plugin.mip.query.security.web;

import java.util.Locale;

import javax.annotation.Resource;

import org.anyframe.mip.query.web.controller.AbstractMiPController;
import org.anyframe.plugin.mip.query.security.service.AuthenticationService;

import com.tobesoft.platform.PlatformRequest;
import com.tobesoft.platform.data.Dataset;
import com.tobesoft.platform.data.DatasetList;
import com.tobesoft.platform.data.VariableList;

/**
 * This LoginController class is a Controller class to provide login functionality.
 * 
 * @author Jonghoon Kim
 */
public class LoginController extends AbstractMiPController {

	@Resource(name="securityService")
    private AuthenticationService securityService;

    @Override
    public void operate(PlatformRequest platformRequest, VariableList inVl,
            DatasetList inDl, VariableList outVl, DatasetList outDl)
            throws Exception {
        try {
            Dataset ds = inDl.getDataset("inDataset");

            Dataset gdsUser = securityService.authenticate(ds);

            gdsUser.addConstColumn("Language", Locale.getDefault()
                .getLanguage());
            
            outDl.add("gdsUser", gdsUser);
            
        } catch (Exception e) {
            logger.debug(e.getMessage());
            
            throw e;
        }
    }
}
