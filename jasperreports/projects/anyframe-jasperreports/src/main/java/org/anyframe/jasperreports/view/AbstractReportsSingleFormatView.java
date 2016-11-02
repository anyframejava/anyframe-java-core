/*
 * Copyright 2007-2012 the original author or authors.
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

package org.anyframe.jasperreports.view;

import java.io.ByteArrayOutputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JRExporter;
import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JasperPrint;

import org.springframework.ui.jasperreports.JasperReportsUtils;
import org.springframework.util.CollectionUtils;
import org.springframework.web.util.WebUtils;

/**
 *
 * 
 * Extends <code>AbstractJasperReportsView</code> to provide basic rendering logic
 * for views that use a fixed format, e.g. always PDF or always HTML.
 *
 * <p>Subclasses need to implement two template methods: <code>createExporter</code>
 * to create a JasperReports exporter for a specific output format, and
 * <code>useWriter</code> to determine whether to write text or binary content.
 * <br><br>
 * 
 * We changed org.springframework.web.servlet.view.jasperreports.AbstractJasperReportsSingleFormatView Class into org.anyframe.jasperreports.ExtendedAbstractJasperReportsSingleFormatView Class in Anyframe.
 * 
 * @since 1.1.5
 * @author Rob Harrop
 * @author Juergen Hoeller
 * @author modified by Sooyeon Park
 * 
 * @see #createExporter()
 * @see #useWriter()
 * 
 */
public abstract class AbstractReportsSingleFormatView extends AbstractReportsView {

	/**
	 * Initial size for the output array.
	 */
	private static final int OUTPUT_BYTE_ARRAY_INITIAL_SIZE = 4096;


	/**
	 * Perform rendering for a single Jasper Reports exporter, that is,
	 * for a pre-defined output format.
	 */
	@SuppressWarnings("unchecked")
	protected void renderReport(JasperPrint populatedReport, Map model, HttpServletResponse response)
			throws Exception {

		// Prepare report for rendering.
		JRExporter exporter = createExporter();

		// Set exporter parameters - overriding with values from the Model.
		Map mergedExporterParameters = mergeExporterParameters(model);
		if (!CollectionUtils.isEmpty(mergedExporterParameters)) {
			exporter.setParameters(mergedExporterParameters);
		}

		if (useWriter()) {
			// We need to write text to the response Writer.

			// Copy the encoding configured for the report into the response.
			String contentType = getContentType();
			String encoding = (String) exporter.getParameter(JRExporterParameter.CHARACTER_ENCODING);
			if (encoding != null) {
				// Only apply encoding if content type is specified but does not contain charset clause already.
				if (contentType != null && contentType.toLowerCase().indexOf(WebUtils.CONTENT_TYPE_CHARSET_PREFIX) == -1) {
					contentType = contentType + WebUtils.CONTENT_TYPE_CHARSET_PREFIX + encoding;
				}
			}
			response.setContentType(contentType);

			// Render report into HttpServletResponse's Writer.
			JasperReportsUtils.render(exporter, populatedReport, response.getWriter());
		}

		else {
			// We need to write binary output to the response OutputStream.

			// Apply the content type as specified - we don't need an encoding here.
			response.setContentType(getContentType());

			// Render report into local OutputStream.
			// IE workaround: write into byte array first.
			ByteArrayOutputStream baos = new ByteArrayOutputStream(OUTPUT_BYTE_ARRAY_INITIAL_SIZE);
			JasperReportsUtils.render(exporter, populatedReport, baos);

			// Write content length (determined via byte array).
			response.setContentLength(baos.size());

			// Flush byte array to servlet output stream.
			ServletOutputStream out = response.getOutputStream();
			baos.writeTo(out);
			out.flush();
		}
	}

	/**
	 * Merges the configured JRExporterParameters with any specified in the supplied model data.
	 * JRExporterParameters in the model override those specified in the configuration.
	 * @see #setExporterParameters(java.util.Map)
	 */
	@SuppressWarnings("unchecked")
	protected Map mergeExporterParameters(Map model) {
		Map mergedParameters = new HashMap();
		Map convertedExporterParameters = getConvertedExporterParameters();
		if (!CollectionUtils.isEmpty(convertedExporterParameters)) {
			mergedParameters.putAll(convertedExporterParameters);
		}
		for (Iterator it = model.keySet().iterator(); it.hasNext();) {
			Object key = it.next();
			if (key instanceof JRExporterParameter) {
				Object value = model.get(key);
				if (value instanceof String) {
					mergedParameters.put(key, value);
				}
				else {
					if (logger.isWarnEnabled()) {
						logger.warn("Ignoring exporter parameter [" + key + "]: value is not a String");
					}
				}
			}
		}
		return mergedParameters;
	}


	/**
	 * Create a JasperReports exporter for a specific output format,
	 * which will be used to render the report to the HTTP response.
	 * <p>The <code>useWriter</code> method determines whether the
	 * output will be written as text or as binary content.
	 * @see #useWriter()
	 */
	protected abstract JRExporter createExporter();

	/**
	 * Return whether to use a <code>java.io.Writer</code> to write text content
	 * to the HTTP response. Else, a <code>java.io.OutputStream</code> will be used,
	 * to write binary content to the response.
	 * @see javax.servlet.ServletResponse#getWriter()
	 * @see javax.servlet.ServletResponse#getOutputStream()
	 */
	protected abstract boolean useWriter();

}
