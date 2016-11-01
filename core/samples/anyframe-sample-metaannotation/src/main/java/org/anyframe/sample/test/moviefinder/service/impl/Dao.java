package org.anyframe.sample.test.moviefinder.service.impl;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.stereotype.Repository;

@Target({ ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Repository()
public @interface Dao {

	/**
	 * With the exception of value(),
	 *  meta-annotated types may redeclare attributes from the source annotation to allow user customization.
	 *  This can be particularly useful when you want to only expose a subset of the source annotation attributes.
	 * 
	 * • Custom annotations may override specific attributes of meta-annotations
	 * • Purely convention-based
	 * 	– use of same attribute name
	 */
	String value() default "dao";

	boolean isDatabase() default true;

}
