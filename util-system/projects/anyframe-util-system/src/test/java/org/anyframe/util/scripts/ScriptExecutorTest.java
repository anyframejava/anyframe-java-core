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
package org.anyframe.util.scripts;

import static org.junit.Assert.assertTrue;

import org.anyframe.util.system.SystemInfoUtil.MemRegion;
import org.junit.Test;

/**
 * Script Execute Test <br>
 *
 * @author ByungHun Woo
 * 
 */
public class ScriptExecutorTest {

	@Test
	public void testGetDirInformation() {
		for (String line : PlatformChooser.getScriptExecutor().getDirInformation(".")) {
			System.out.println(line);
		}
	}

	@Test
	public void testGetDirSizeStr() {
		String dirSize = PlatformChooser.getScriptExecutor().getDirSizeStr(".");
		assertTrue(dirSize != null && !dirSize.equals("unknown"));
		System.out.println(dirSize);
	}

	@Test
	public void testGetMacAddress() {
		String macAddress = PlatformChooser.getScriptExecutor().getMacAddress();
		assertTrue(macAddress != null && !macAddress.matches("[a-zA-Z|-|:]+"));
		System.out.println(macAddress);
	}

	@Test
	public void testGetPortScan() {
		for (String line : PlatformChooser.getScriptExecutor().getPortScan()) {
			System.out.println(line);
		}
	}

	@Test
	public void testGetMemoryCapacity() {
		float total = PlatformChooser.getScriptExecutor().getMemoryCapacity(MemRegion.Total);
		float used = PlatformChooser.getScriptExecutor().getMemoryCapacity(MemRegion.Used);
		float free = PlatformChooser.getScriptExecutor().getMemoryCapacity(MemRegion.Free);

		assertTrue(total > 1000);
		assertTrue(used > 1000);
		assertTrue(free > 1000);

		System.out.println("total : " + total + ", used : " + used + ", free : " + free);
	}
}
