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
package org.anyframe.struts.tiles;

import java.io.IOException;
import java.security.Principal;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.Locale;

import javax.security.auth.Subject;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.anyframe.struts.util.AuthenticationException;
import org.anyframe.struts.util.AuthorizationException;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.config.ExceptionConfig;
import org.apache.struts.tiles.ComponentContext;
import org.apache.struts.tiles.ComponentDefinition;
import org.apache.struts.tiles.Controller;
import org.apache.struts.tiles.DefinitionsFactoryException;
import org.apache.struts.tiles.DefinitionsUtil;
import org.apache.struts.tiles.NoSuchDefinitionException;
import org.apache.struts.tiles.TilesRequestProcessor;

import com.tagish.auth.TypedPrincipal;

/**
 * 
 * <p><strong>RequestProcessor</strong> contains the processing logic that the
 * performs as it receives each servlet request from the
 * container. You can customize the request processing behavior by subclassing
 * this class and overriding the method(s) whose behavior you are interested
 * in changing.</p>
 * 
 * 
 * @author Byunghun Woo
 */
public class DefaultRequestProcessor extends TilesRequestProcessor {
	/**
	 * check authentication and authorization.
	 */
    @SuppressWarnings("unchecked")
	protected boolean processRoles(HttpServletRequest request,
            HttpServletResponse response, ActionMapping mapping)
            throws IOException, ServletException {
        // [public] Is this action protected by role requirements?
        String roles[] = mapping.getRoleNames();
        if ((roles == null) || (roles.length < 1)) {
            return (true);
        }

        Subject _subject = null;

        HttpSession session = request.getSession();
        _subject = (Subject) session.getAttribute("subject");

        if (_subject == null) {
            log.debug("#AuthenticationException is encounted");
            
            ExceptionConfig config = mapping.findException(AuthenticationException.class);
            
            if(config == null ){
            	mapping.findException(Exception.class);
            }
            
            AuthenticationException ae = new AuthenticationException(config.getKey(), request
                    .getRequestURI());
            
            /*******************************************************************
             * saveRequestForAuthentication(request.getRequestURI())
             ******************************************************************/
            String url = request.getRequestURI() + "?";

            Enumeration _enum = request.getParameterNames();
            while (_enum.hasMoreElements()) {
                String parameterName = (String) _enum.nextElement();
                String parameterValue = request.getParameter(parameterName);

                url += parameterName + "=" + parameterValue + "&";
            }

            request.getSession().setAttribute("AfterAuthentication", url);
            /*******************************************************************
             * END
             ******************************************************************/

            ActionForward forward;

            try {
                forward = processException(request, response, ae, null, mapping);
            } catch (Exception e) {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST,
                        getInternal().getMessage("notAuthenticated",
                                mapping.getPath()));
                return false;
            }

            // Process the returned ActionForward instance
            // processActionForward(request, response, forward); is depricated
            // in struts 1.2.x
            processForwardConfig(request, response, forward);

            return false;
        }

        // Check the current user against the list of required roles
        for (int i = 0; i < roles.length; i++) {
            if (_isUserInRole(_subject, roles[i])) {
                return (true);
            }
        }

        // The current user is not authorized for this action
        // response.sendError(HttpServletResponse.SC_UNAUTHORIZED ,
        // getInternal().getMessage("fail", mapping.getPath()));
        /*
         * String path = request.getContextPath(); String servletPath =
         * request.getServletPath(); String url = path +
         * "/goError.do?error=error.authorization.fail";
         */
        // "http://localhost:7001/AegisConsole";
        // errors.add(ActionErrors.GLOBAL_ERROR, new
        // ActionError("error.authorization.fail"));
        // response.sendRedirect(url);
        log.debug("#AuthorizationException is encounted");
        ExceptionConfig config = mapping.findException(AuthorizationException.class);
        
        if(config == null ){
        	mapping.findException(Exception.class);
        }
        
        AuthorizationException ae = new AuthorizationException(config.getKey(), request
                .getRequestURI());

        ActionForward forward;

        try {
            forward = processException(request, response, ae, null, mapping);
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST,
                    getInternal()
                            .getMessage("notAuthorized", mapping.getPath()));
            return false;
        }

        // Process the returned ActionForward instance
        // processActionForward(request, response, forward); is depricated in
        // struts 1.2.x
        processForwardConfig(request, response, forward);

        return (false);
    }

    /**
     * check user's role
     * @param _subject
     * @param role
     * @return
     */
    @SuppressWarnings("unchecked")
	private boolean _isUserInRole(Subject _subject, String role) {

        // let's see what Principals we have
        Iterator principalIterator = _subject.getPrincipals().iterator();
        while (principalIterator.hasNext()) {
            Principal p = (Principal) principalIterator.next();
            if (p instanceof TypedPrincipal) {
                TypedPrincipal tp = (TypedPrincipal) p;
                if (tp.getType() == TypedPrincipal.GROUP
                        && tp.getName().equals(role))
                    return true;
            } else {
                if (p.getName().equals(role))
                    return true;
            }
        }

        return false;
    }

    /**
     * this method is executed pre. process.
     */
    protected boolean processPreprocess(HttpServletRequest request,
            HttpServletResponse response) {
        try {
            // CharacterEncoding default charset = "euc-kr";
            String charset = this.servlet
                    .getInitParameter("character-encoding");
            log
                    .debug("[DefaultRequestProcessor] processPreprocess mothod charset = "
                            + charset);

            if (charset != null) {
                request.setCharacterEncoding(charset);
            } else {
                request.setCharacterEncoding("euc-kr");
            }

            return true;
        } catch (Exception e) {
            log.debug("Exception is created : " + e.getMessage());
            return false;
        }
    }

    /**
     * get a locale information into session. 
     */
    protected void processLocale(HttpServletRequest request,
            HttpServletResponse response) {

    	HttpSession session = request.getSession();
        Locale sessionLocale = (Locale) session
                .getAttribute("org.apache.struts.action.LOCALE");

        Locale requestLocale = request.getLocale();

        if (sessionLocale == null || sessionLocale != requestLocale) {

        	if (sessionLocale == null)
                sessionLocale = requestLocale;

            session.setAttribute("org.apache.struts.action.LOCALE",
                    sessionLocale);

        }
    }

	/**
	 * Process a Tile definition name. This method tries to process the
	 * parameter <code>definitionName</code> as a definition name. It returns
	 * <code>true</code> if a definition has been processed, or
	 * <code>false</code> otherwise. Parameter <code>contextRelative</code>
	 * is not used in this implementation.
	 * 
	 * @param definitionName
	 *            Definition name to insert.
	 * @param contextRelative
	 *            Is the definition marked contextRelative ?
	 * @param request
	 *            Current page request.
	 * @param response
	 *            Current page response.
	 * @return <code>true</code> if the method has processed uri as a
	 *         definition name, <code>false</code> otherwise.
	 */
	protected boolean processTilesDefinition(String definitionName,
			boolean contextRelative, HttpServletRequest request,
			HttpServletResponse response) throws IOException, ServletException {

		// Do we do a forward (original behavior) or an include ?
		boolean doInclude = false;

		// Controller associated to a definition, if any
		Controller controller = null;

		// Computed uri to include
		String uri = null;

		ComponentContext tileContext = null;

		try {
			// Get current tile context if any.
			// If context exist, we will do an include
			tileContext = ComponentContext.getContext(request);
			doInclude = (tileContext != null);
			ComponentDefinition definition = null;

			// Process tiles definition names only if a definition factory
			// exist,
			// and definition is found.
			if (definitionsFactory != null) {
				// Get definition of tiles/component corresponding to uri.
				try {
					definition = definitionsFactory.getDefinition(
							definitionName, request, getServletContext());
				} catch (NoSuchDefinitionException ex) {
					// Ignore not found
					log.debug("NoSuchDefinitionException " + ex.getMessage());
				}
				if (definition != null) { // We have a definition.
					// We use it to complete missing attribute in context.
					// We also get uri, controller.
					uri = definition.getPath();
					controller = definition.getOrCreateController();

					if (tileContext == null) {
						tileContext = new ComponentContext(definition
								.getAttributes());
						ComponentContext.setContext(tileContext, request);

					} else {
						tileContext.addMissing(definition.getAttributes());
					}
				}
			}

			// Process definition set in Action, if any.
			definition = DefinitionsUtil.getActionDefinition(request);
			if (definition != null) { // We have a definition.
				// We use it to complete missing attribute in context.
				// We also overload uri and controller if set in definition.
				if (definition.getPath() != null) {
					uri = definition.getPath();
				}

				if (definition.getOrCreateController() != null) {
					controller = definition.getOrCreateController();
				}

				if (tileContext == null) {
					tileContext = new ComponentContext(definition
							.getAttributes());
					ComponentContext.setContext(tileContext, request);
				} else {
					tileContext.addMissing(definition.getAttributes());
				}
			}

		} catch (java.lang.InstantiationException ex) {

			log.error("Can't create associated controller", ex);

			throw new ServletException("Can't create associated controller", ex);
		} catch (DefinitionsFactoryException ex) {
			throw new ServletException(ex);
		}

		// Have we found a definition ?
		if (uri == null) {
			return false;
		}

		// Execute controller associated to definition, if any.
		if (controller != null) {
			try {
				controller.execute(tileContext, request, response,
						getServletContext());

			} catch (Exception e) {
				throw new ServletException(e);
			}
		}

		// If request comes from a previous Tile, do an include.
		// This allows to insert an action in a Tile.
		if (log.isDebugEnabled()) {
			log.debug("uri=" + uri + " doInclude=" + doInclude);
		}

		if (doInclude) {
			try {
				doInclude(uri, request, response);
			} catch (Exception e) {
				log.error("Can't do include", e);
				throw new ServletException("Can't do include", e);
			}
		} else
			try {
				doForward(uri, request, response); // original behavior
			} catch (Exception e) {
				log.error("Can't do forward", e);
				throw new ServletException("Can't do forward", e);
			}

		return true;
	}    
}
