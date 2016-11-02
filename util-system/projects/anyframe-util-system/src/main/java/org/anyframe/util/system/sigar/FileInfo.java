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
 * This FileInfo class is a Value Object class for file information.
 * 
 * @author ByungHun Woo
 */
public class FileInfo implements Serializable {

	private static final long serialVersionUID = 569351401232043739L;

	private String name;

	private String permission;

	private int mode;

	private String type;

	private long size;

	private long uid;

	private long gid;

	private long inode;

	private long device;

	private long nlink;

	private long atime;

	private long mtime;

	private long ctime;

	private String canonicalPath;

	private char typeChar;

	// Directory
	private long total;

	private long files;

	private long subdirs;

	private long symlinks;

	private long chrdevs;

	private long blkdevs;

	private long sockets;

	private long diskUsage;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPermission() {
		return permission;
	}

	public void setPermission(String permission) {
		this.permission = permission;
	}

	public int getMode() {
		return mode;
	}

	public void setMode(int mode) {
		this.mode = mode;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public long getSize() {
		return size;
	}

	public void setSize(long size) {
		this.size = size;
	}

	public long getUid() {
		return uid;
	}

	public void setUid(long uid) {
		this.uid = uid;
	}

	public long getGid() {
		return gid;
	}

	public void setGid(long gid) {
		this.gid = gid;
	}

	public long getInode() {
		return inode;
	}

	public void setInode(long inode) {
		this.inode = inode;
	}

	public long getDevice() {
		return device;
	}

	public void setDevice(long device) {
		this.device = device;
	}

	public long getNlink() {
		return nlink;
	}

	public void setNlink(long nlink) {
		this.nlink = nlink;
	}

	public long getAtime() {
		return atime;
	}

	public void setAtime(long atime) {
		this.atime = atime;
	}

	public long getMtime() {
		return mtime;
	}

	public void setMtime(long mtime) {
		this.mtime = mtime;
	}

	public long getCtime() {
		return ctime;
	}

	public void setCtime(long ctime) {
		this.ctime = ctime;
	}

	public String getCanonicalPath() {
		return canonicalPath;
	}

	public void setCanonicalPath(String canonicalPath) {
		this.canonicalPath = canonicalPath;
	}

	public char getTypeChar() {
		return typeChar;
	}

	public void setTypeChar(char typeChar) {
		this.typeChar = typeChar;
	}

	public long getTotal() {
		return total;
	}

	public void setTotal(long total) {
		this.total = total;
	}

	public long getFiles() {
		return files;
	}

	public void setFiles(long files) {
		this.files = files;
	}

	public long getSubdirs() {
		return subdirs;
	}

	public void setSubdirs(long subdirs) {
		this.subdirs = subdirs;
	}

	public long getSymlinks() {
		return symlinks;
	}

	public void setSymlinks(long symlinks) {
		this.symlinks = symlinks;
	}

	public long getChrdevs() {
		return chrdevs;
	}

	public void setChrdevs(long chrdevs) {
		this.chrdevs = chrdevs;
	}

	public long getBlkdevs() {
		return blkdevs;
	}

	public void setBlkdevs(long blkdevs) {
		this.blkdevs = blkdevs;
	}

	public long getSockets() {
		return sockets;
	}

	public void setSockets(long sockets) {
		this.sockets = sockets;
	}

	public long getDiskUsage() {
		return diskUsage;
	}

	public void setDiskUsage(long diskUsage) {
		this.diskUsage = diskUsage;
	}
}
