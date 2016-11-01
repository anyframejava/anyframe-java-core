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

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 *
 * Hierarchical structures with Java Enums - http://blog.cedarsoft.com/2010/10/hierarchical-structures-with-java-enums/
 *
 * @author Johannes Schneider
 * @author modified by ByungHun Woo
 */
public enum OsType {
	// @formatter:off 
	OS(null),
		Windows(OS),
			WindowsNT(Windows),
				WindowsNTWorkstation(WindowsNT),
				WindowsNTServer(WindowsNT),
				WindowsNTunknown(WindowsNT),	// JVM 버전 등이 맞지 않으면 Windows 7 등이 Windows NT (unknown) 과 같이 나오는 경우가 있음
			Windows2000(Windows),
				Windows2000Server(Windows2000),
				Windows2000Workstation(Windows2000),
			Windows2003(Windows),
			WindowsServer2008(Windows),
				WindowsServer2008R2(WindowsServer2008),
			WindowsXp(Windows),
			WindowsVista(Windows),
			Windows7(Windows),
			Windows95(Windows),
			Windows98(Windows),
			WindowsMe(Windows),
		Unix(OS) {
			@Override
			public boolean supportsXWindowSystem() {
				return true;
			}

			public boolean supportsPosix() {
				return true;
			}
		},
			SystemV(Unix),
				AIX(SystemV) {
					@Override
					public boolean supportsPosix() {
						return false;
					}
				},
				HpUx(SystemV) {
					@Override
					public boolean supportsPosix() {
						return false;
					}
				},
				IRIX(SystemV),
				SCOUnix(SystemV),
				Solaris(SystemV),
			BSD(Unix),
				SunOs(BSD),
				FreeBSD(BSD),
					MacOsX(FreeBSD),
			DigitalUnix(Unix),
				OSF1(DigitalUnix),
			MpeIx(Unix),
			Linux(Unix),
		UserSpecified(OS),
		Other(OS),
		;
	// @formatter:on

	private final OsType parent;

	private final List<OsType> children = new ArrayList<OsType>();

	private final List<OsType> allChildren = new ArrayList<OsType>();

	OsType(OsType parent) {
		this.parent = parent;
		if (parent != null) {
			parent.addChild(this);
		}
	}

	public boolean supportsPosix() {
		return false;
	}

	public OsType parent() {
		return parent;
	}

	/**
	 * return whether the OsType returned as a parameter is consistent with the
	 * current OsType or is parent of OsType.
	 * @param other the OsType returned as a parameter
	 * @return whether the OsType returned as a parameter is consistent with the current OsType or is parent of OsType
	 */
	public boolean is(OsType other) {
		if (other == null) {
			return false;
		}

		for (OsType osType = this; osType != null; osType = osType.parent()) {
			if (other.equals(osType)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Gets children OS types
	 * @return children OsTypes
	 */
	public List<? extends OsType> children() {
		return Collections.unmodifiableList(children);
	}

	/**
	 * Gets all children OS types
	 * @return children OsTypes
	 */
	public List<? extends OsType> allChildren() {
		return Collections.unmodifiableList(allChildren);
	}

	/**
	 * Add a OS type as a child
	 * @param child the OsType to add
	 */
	private void addChild(OsType child) {
		this.children.add(child);

		List<OsType> greatChildren = new ArrayList<OsType>();
		greatChildren.add(child);
		greatChildren.addAll(child.allChildren());

		OsType currentAncestor = this;
		while (currentAncestor != null) {
			currentAncestor.allChildren.addAll(greatChildren);
			currentAncestor = currentAncestor.parent;
		}
	}

	/**
	 * Checks if the parent OS type supports XWindow system
	 * @return true if the parent OS type supports XWindow system, false if not or parent is null
	 */
	public boolean supportsXWindowSystem() {
		if (parent == null) {
			return false;
		}

		return parent.supportsXWindowSystem();
	}
}