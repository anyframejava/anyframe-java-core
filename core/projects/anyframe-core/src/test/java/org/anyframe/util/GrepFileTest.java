/*
 * Copyright 2002-2012 the original author or authors.
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
package org.anyframe.util;

import java.io.File;
import java.io.IOException;
import java.util.regex.Pattern;

import junit.framework.TestCase;

import org.anyframe.util.file.GrepFile;

/**
 * For testing functions what GrepFile supports, there are some test scenarios
 * in this TestCase.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class GrepFileTest extends TestCase {

	public void testContainsPattern() throws IOException {
		File file = File.createTempFile("test", "test");
		file.deleteOnExit();
		assertTrue(GrepFile.containsPattern(file, Pattern.compile(".test$")));
	}

	public void testFindPattern() throws IOException {
		File file = new File("./src/test/resources/anyframe-test.properties");
		String[] stringArray = GrepFile.findPattern(file, Pattern
				.compile("[a-zA-Z]*_[a-zA-Z]*"), 0);
		assertTrue(stringArray.length > 0);
	}

	public void testFindFileString() {
		File file = new File("./src/test/resources");
		File[] fileArray = GrepFile.find(file, ".xml$");
		assertTrue(fileArray.length > 0);
	}

	public void testFindFileStringBoolean() {
		File file = new File("./src/test/resources");
		File[] fileArray = GrepFile.find(file, "^application", true);
		assertTrue(fileArray.length > 0);
	}

}
