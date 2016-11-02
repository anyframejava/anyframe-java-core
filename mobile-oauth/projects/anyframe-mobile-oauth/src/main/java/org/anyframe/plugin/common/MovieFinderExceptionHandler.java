package org.anyframe.plugin.common;


import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;


@ControllerAdvice(basePackages = {"org.anyframe.plugin"} )
@RestController 
public class MovieFinderExceptionHandler extends ResponseEntityExceptionHandler  {
	
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@ExceptionHandler(Exception.class)
    @ResponseBody
    ResponseEntity<?> handleCommonException(HttpServletRequest request, Throwable ex) {

        logger.error(ex.getMessage(), ex.getCause());

        HttpStatus status = HttpStatus.valueOf(500);

        return new ResponseEntity<>(
                new RestError(new Date()
                        , status.value()
                        , Long.toString(MovieFinderException.DEFAULT_ERROR_CODE)
                        , ex.getMessage()
                        , ex.getClass().getSimpleName()
                        , ""
                        , "")
                , status);
    }
	
	
 
	@ExceptionHandler(MovieFinderException.class)
	@ResponseBody 
	public  ResponseEntity<?> handleRestException(HttpServletRequest request, Throwable ex) {
		logger.error(ex.getMessage(),ex.getCause());
		MovieFinderException re = (MovieFinderException)ex;
		HttpStatus status = HttpStatus.valueOf(500);
		
		return new ResponseEntity<>(
                new RestError(new Date()
                        , status.value()
                        , Long.toString(re.getErrorCode())
                        , ex.getMessage()
                        , ex.getClass().getSimpleName()
                        , ""
                        , "")
                , status);
	}

}
