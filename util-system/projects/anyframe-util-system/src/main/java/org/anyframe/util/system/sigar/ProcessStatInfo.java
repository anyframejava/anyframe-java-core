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
package org.anyframe.util.system.sigar;

import java.io.Serializable;

/**
 * This ProcessStatInfo class is a Value Object class for process status information of system.
 *
 * @author ByungHun Woo
 */
public class ProcessStatInfo implements Serializable {

	private static final long serialVersionUID = 1232364763820167378L;

	private long total;

	private long idle;

	private long running;

	private long sleeping;

	private long stopped;

	private long zombie;

	private long threads;

	public long getTotal() {
		return total;
	}

	public void setTotal(long total) {
		this.total = total;
	}

	public long getIdle() {
		return idle;
	}

	public void setIdle(long idle) {
		this.idle = idle;
	}

	public long getRunning() {
		return running;
	}

	public void setRunning(long running) {
		this.running = running;
	}

	public long getSleeping() {
		return sleeping;
	}

	public void setSleeping(long sleeping) {
		this.sleeping = sleeping;
	}

	public long getStopped() {
		return stopped;
	}

	public void setStopped(long stopped) {
		this.stopped = stopped;
	}

	public long getZombie() {
		return zombie;
	}

	public void setZombie(long zombie) {
		this.zombie = zombie;
	}

	public long getThreads() {
		return threads;
	}

	public void setThreads(long threads) {
		this.threads = threads;
	}
}
