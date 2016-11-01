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
package org.anyframe.plugin.mip.query.security.service.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.inject.Inject;
import javax.sql.DataSource;

import org.anyframe.plugin.mip.query.security.service.AuthenticationService;
import org.springframework.stereotype.Service;

import com.tobesoft.platform.data.Dataset;

/**
 * This MovieServiceImpl class is an Implementation class to provide movie crud
 * functionality.
 * 
 * @author Jonghoon Kim
 */
@Service("securityService")
public class DBAuthenticationService implements AuthenticationService {

	@Inject
    protected DataSource dataSource = null;

    private String sqlQuery = "SELECT USER_ID, PASSWORD, USER_NAME, EN_NAME, COMP_PHONE, PHONE, CELL_PHONE, COMPANY, JOB_POSITION, ASSIGNMENT, OFFICER_YN, FAX, ZIP_CODE, ADDRESS, COMP_ZIP_CODE, COMP_ADDRESS, EMAIL, DEPT_ID FROM MIP_USER WHERE USER_ID = ? AND PASSWORD =?";

    public Dataset authenticate(Dataset dataset) throws Exception {
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        Dataset gdsUser = null;
        try {
            conn = dataSource.getConnection();
            pstmt = conn.prepareStatement(sqlQuery);
            pstmt.setString(1, dataset.getColumnAsString(0, "USER_ID"));
            pstmt.setString(2, dataset.getColumnAsString(0, "PASSWORD"));
            rs = pstmt.executeQuery();

            if (rs.next()) {
                gdsUser = new Dataset("gdsUser");
                gdsUser.addStringColumn("USER_ID");
                gdsUser.addStringColumn("PASSWORD");
                gdsUser.addStringColumn("USER_NAME");
                gdsUser.addStringColumn("EN_NAME");
                gdsUser.addStringColumn("COMP_PHONE");
                gdsUser.addStringColumn("PHONE");
                gdsUser.addStringColumn("CELL_PHONE");
                gdsUser.addStringColumn("COMPANY");
                gdsUser.addStringColumn("JOB_POSITION");
                gdsUser.addStringColumn("ASSIGNMENT");
                gdsUser.addStringColumn("OFFICER_YN");
                gdsUser.addStringColumn("FAX");
                gdsUser.addStringColumn("ZIP_CODE");
                gdsUser.addStringColumn("ADDRESS");
                gdsUser.addStringColumn("COMP_ZIP_CODE");
                gdsUser.addStringColumn("COMP_ADDRESS");
                gdsUser.addStringColumn("EMAIL");
                gdsUser.addStringColumn("DEPT_ID");
                gdsUser.appendRow();
                gdsUser.setColumn(0, "USER_ID", rs.getString("USER_ID"));
                gdsUser.setColumn(0, "PASSWORD", rs.getString("PASSWORD"));
                gdsUser.setColumn(0, "USER_NAME", rs.getString("USER_NAME"));
                gdsUser.setColumn(0, "EN_NAME", rs.getString("EN_NAME"));
                gdsUser.setColumn(0, "COMP_PHONE", rs.getString("COMP_PHONE"));
                gdsUser.setColumn(0, "PHONE", rs.getString("PHONE"));
                gdsUser.setColumn(0, "CELL_PHONE", rs.getString("CELL_PHONE"));
                gdsUser.setColumn(0, "COMPANY", rs.getString("COMPANY"));
                gdsUser.setColumn(0, "JOB_POSITION", rs
                    .getString("JOB_POSITION"));
                gdsUser.setColumn(0, "ASSIGNMENT", rs.getString("ASSIGNMENT"));
                gdsUser.setColumn(0, "OFFICER_YN", rs.getString("OFFICER_YN"));
                gdsUser.setColumn(0, "FAX", rs.getString("FAX"));
                gdsUser.setColumn(0, "ZIP_CODE", rs.getString("ZIP_CODE"));
                gdsUser.setColumn(0, "ADDRESS", rs.getString("ADDRESS"));
                gdsUser.setColumn(0, "COMP_ZIP_CODE", rs
                    .getString("COMP_ZIP_CODE"));
                gdsUser.setColumn(0, "COMP_ADDRESS", rs
                    .getString("COMP_ADDRESS"));
                gdsUser.setColumn(0, "EMAIL", rs.getString("EMAIL"));
                gdsUser.setColumn(0, "DEPT_ID", rs.getString("DEPT_ID"));
            } else {
                throw new Exception();
            }
        } catch (Exception e) {
            throw new Exception("Login failure.", e);
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (pstmt != null) {
                    pstmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (Exception e) {

            }
        }
        return gdsUser;
    }
}
