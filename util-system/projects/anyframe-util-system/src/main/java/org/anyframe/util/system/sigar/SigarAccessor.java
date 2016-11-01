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

import java.io.File;
import java.io.IOException;
import java.io.PrintStream;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.anyframe.util.DateUtil;
import org.anyframe.util.scripts.DefaultScriptExecutor;
import org.anyframe.util.scripts.OsType;
import org.anyframe.util.system.ScriptPropertiesLoader;
import org.apache.commons.io.output.ByteArrayOutputStream;
import org.hyperic.sigar.DirUsage;
import org.hyperic.sigar.FileSystemUsage;
import org.hyperic.sigar.Mem;
import org.hyperic.sigar.NetInfo;
import org.hyperic.sigar.NetInterfaceConfig;
import org.hyperic.sigar.NetRoute;
import org.hyperic.sigar.OperatingSystem;
import org.hyperic.sigar.ProcCpu;
import org.hyperic.sigar.ProcCredName;
import org.hyperic.sigar.ProcExe;
import org.hyperic.sigar.ProcMem;
import org.hyperic.sigar.ProcStat;
import org.hyperic.sigar.ProcState;
import org.hyperic.sigar.ProcUtil;
import org.hyperic.sigar.Sigar;
import org.hyperic.sigar.SigarException;
import org.hyperic.sigar.SigarPermissionDeniedException;
import org.hyperic.sigar.Swap;
import org.hyperic.sigar.cmd.Ls;
import org.hyperic.sigar.cmd.Netstat;
import org.hyperic.sigar.cmd.Ps;
import org.hyperic.sigar.cmd.Route;
import org.hyperic.sigar.cmd.Shell;
import org.hyperic.sigar.cmd.SigarCommandBase;
import org.hyperic.sigar.cmd.Ulimit;
import org.hyperic.sigar.cmd.Uptime;
import org.hyperic.sigar.cmd.Version;
import org.hyperic.sigar.cmd.Who;
import org.hyperic.sigar.pager.PageControl;
import org.hyperic.sigar.shell.ShellCommandExecException;
import org.hyperic.sigar.shell.ShellCommandInitException;
import org.hyperic.sigar.shell.ShellCommandUsageException;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.ReflectionUtils;

/**
 * Sigar Accessor Utility Class <br>
 * Simplifies the initial running environment setting of Sigar that uses JNI
 * library.
 *
 * @author ByungHun Woo
 * @author HyunJung Jeong
 *
 */
public class SigarAccessor extends org.hyperic.sigar.cmd.SysInfo {
	
	public static final String DEFAULT_SIGAR_LIB_PATH = "sigar-bin/lib";

	private static SysInfo sysInfo;

	private static Shell shell;

	private static Method flushPrintfItems = ReflectionUtils.findMethod(SigarCommandBase.class, "flushPrintfItems");

	private static Field output = ReflectionUtils.findField(SigarCommandBase.class, "output");

	private static final Logger LOGGER = LoggerFactory.getLogger(SigarAccessor.class);
	
	static {
		ScriptPropertiesLoader loader = new ScriptPropertiesLoader();
		loader.load();

		String javaLibPath = System.getProperty("java.library.path");
		String sigarLibPath = loader.isLoaded() && loader.getScripts().containsKey("sigar.library.path") ? loader
				.getScripts().getProperty("sigar.library.path") : DEFAULT_SIGAR_LIB_PATH;

		if (javaLibPath == null) {
			System.setProperty("java.library.path", sigarLibPath);
		}
		else {
			if (!javaLibPath.contains("sigar")) {
				String delimiter = DefaultScriptExecutor.getOs().is(OsType.Windows) ? ";" : ":";
				System.setProperty("java.library.path", javaLibPath + delimiter + sigarLibPath);
			}
		}

		try {
			shell = new Shell();
			shell.init("sigar", System.out, System.err);
			// no paging handling
			shell.setPageSize(PageControl.SIZE_UNLIMITED);
			shell.registerCommands();
			shell.setInteractive(true);

			ReflectionUtils.makeAccessible(flushPrintfItems);
			ReflectionUtils.makeAccessible(output);
		}
		catch (ShellCommandInitException e) {
			LOGGER.error("SigarAccessor ShellCommandInitException occurred", e);
		}
	}

	private static SigarAccessor instance = new SigarAccessor(shell);

	public SigarAccessor(Shell shell) {
		super(shell);
	}

	public static SigarAccessor getInstance() {
		return instance;
	}

	/**
	 * System information setting - version, uptime, cpu, memory, file system,
	 * process, network
	 * @return system information
	 * @throws SigarException
	 * @throws IOException
	 * @throws ShellCommandExecException
	 * @throws ShellCommandUsageException
	 */
	public static SysInfo gatherSysInfo() throws SigarException, IOException, ShellCommandUsageException,
			ShellCommandExecException {

		if (sysInfo == null) {
			setSysInfo(new SysInfo());
		}

		gatherVersionInfo();

		gatherUptimeInfo();

		gatherCpuInfo();

		gatherMemoryInfo();

		gatherFileSystemInfo();

		gatherFileSystemUsageMap();

		gatherProcessStatInfo();

		gatherProcessInfo(null);

		gatherNetworkInfoMap();

		gatherNetworkInfo(null);

		gatherUlimitInfo();

		return sysInfo;
	}

	/**
	 * ulimit information - information related to process resource limits
	 * @throws SigarException
	 * @throws ShellCommandExecException
	 * @throws ShellCommandUsageException
	 */
	public static void gatherUlimitInfo() throws SigarException, ShellCommandUsageException, ShellCommandExecException {
		gatherUlimitInfo(false);
	}

	/**
	 * ulimit information
	 * @param isModeMax command option
	 * @throws SigarException
	 * @throws ShellCommandExecException
	 * @throws ShellCommandUsageException
	 * @see Ulimit
	 */
	public static void gatherUlimitInfo(boolean isModeMax) throws SigarException, ShellCommandUsageException,
			ShellCommandExecException {
		UlimitInfo ulimitInfo = new UlimitInfo();
		Ulimit ulimit = new Ulimit(shell);
		ulimit.processCommand(isModeMax ? new String[] { "-H" } : new String[] {});
		forceFlushPrintfItems(ulimit);
		parseUlimitInfo(forceGetOutput(ulimit), ulimitInfo);
		sysInfo.setUlimitInfo(ulimitInfo);
	}

	/**
	 * Search ip, mac, network mask, etc. for entire network list and set in
	 * system information
	 *
	 * @throws SigarException
	 * @see {@link Sigar#getNetConnectionList(int)}
	 */
	public static void gatherNetworkInfoMap() throws SigarException {
		Map<String, NetworkInfo> networkInfoMap = new LinkedHashMap<String, NetworkInfo>();
		List<String> nifs = Arrays.asList(getInstance().sigar.getNetInterfaceList());

		for (String nif : nifs) {
			gatherNetworkInfo(nif);
			networkInfoMap.put(sysInfo.getNetworkInfo().getAddress(), sysInfo.getNetworkInfo());
		}

		sysInfo.setNetworkInfoMap(networkInfoMap);
	}

	/**
	 * NetInfo information - ip address, subnet address, gateway address, host
	 * name, domain name, etc. information search
	 *
	 * @param network network name
	 * @throws SigarException
	 * @see NetInfo
	 * @see NetInterfaceConfig
	 */
	public static void gatherNetworkInfo(String network) throws SigarException {
		NetInfo ni = getInstance().sigar.getNetInfo();
		NetInterfaceConfig nic = getInstance().sigar.getNetInterfaceConfig(network);
		NetworkInfo networkInfo = new NetworkInfo();

		networkInfo.setAddress(nic.getAddress());
		networkInfo.setHwaddr(nic.getHwaddr());
		networkInfo.setNetmask(nic.getNetmask());
		networkInfo.setHostName(ni.getHostName());
		networkInfo.setDomainName(ni.getDomainName());
		networkInfo.setDefaultGateway(ni.getDefaultGateway());
		networkInfo.setPrimaryDns(ni.getPrimaryDns());
		networkInfo.setSecondaryDns(ni.getSecondaryDns());

		sysInfo.setNetworkInfo(networkInfo);
	}

	/**
	 * File System default information
	 *
	 * @throws SigarException
	 * @see {@link Sigar#getFileSystemList()}
	 * @see org.hyperic.sigar.FileSystem
	 */
	public static void gatherFileSystemInfo() throws SigarException {
		List<FileSystemInfo> fileSystems = new ArrayList<FileSystemInfo>();
		for (org.hyperic.sigar.FileSystem fs : getInstance().sigar.getFileSystemList()) {
			FileSystemInfo fileSystemInfo = new FileSystemInfo();
			fileSystemInfo.setDirName(fs.getDirName());
			fileSystemInfo.setDevName(fs.getDevName());
			fileSystemInfo.setTypeName(fs.getTypeName());
			fileSystemInfo.setSysTypeName(fs.getSysTypeName());
			fileSystemInfo.setOptions(fs.getOptions());
			fileSystemInfo.setType(fs.getType());
			fileSystemInfo.setFlags(fs.getFlags());

			fileSystems.add(fileSystemInfo);
		}
		sysInfo.setFileSystems(fileSystems);
	}

	/**
	 * Show valid information for entire list. <br>
	 * Entire disk size, used disk size, usable disk size, etc.
	 *
	 * @throws SigarException
	 * @see {@link Sigar#getFileSystemList()}
	 */
	public static void gatherFileSystemUsageMap() throws SigarException {
		Map<String, FileSystemUsageInfo> fileSystemUsageMap = new LinkedHashMap<String, FileSystemUsageInfo>();
		for (org.hyperic.sigar.FileSystem fs : getInstance().sigar.getFileSystemList()) {
			if (DefaultScriptExecutor.getOs().is(OsType.Windows)) {
				if (org.hyperic.sigar.FileSystem.TYPE_LOCAL_DISK == fs.getType()) {
					gatherFileSystemUsage(fs.getDirName());
					fileSystemUsageMap.put(fs.getDirName(), sysInfo.getFileSystemUsageInfo());
				}
			}
			else {
				gatherFileSystemUsage(fs.getDirName());
				fileSystemUsageMap.put(fs.getDirName(), sysInfo.getFileSystemUsageInfo());
			}
		}
		sysInfo.setFileSystemUsageMap(fileSystemUsageMap);
	}

	/**
	 * Show valid information on input file system.<br>
	 * Entire disk size, used disk size, usable disk size, etc.
	 *
	 * @param name directory name
	 * @throws SigarException
	 * @see {@link org.hyperic.sigar.Sigar#getFileSystemUsage(String)
	 */
	public static void gatherFileSystemUsage(String name) throws SigarException {
		try {
			org.hyperic.sigar.FileSystemUsage fsu = getInstance().sigar.getFileSystemUsage(name);
			FileSystemUsageInfo fileSystemUsage = new FileSystemUsageInfo();
			fileSystemUsage.setTotal(fsu.getTotal());
			fileSystemUsage.setFree(fsu.getFree());
			fileSystemUsage.setDiskUsed(fsu.getUsed());
			fileSystemUsage.setAvail(fsu.getAvail());
			fileSystemUsage.setFiles(fsu.getFiles());
			fileSystemUsage.setFreeFiles(fsu.getFreeFiles());
			fileSystemUsage.setDiskReads(fsu.getDiskReads());
			fileSystemUsage.setDiskWrites(fsu.getDiskWrites());
			fileSystemUsage.setDiskReadBytes(fsu.getDiskReadBytes());
			fileSystemUsage.setDiskWriteBytes(fsu.getDiskWriteBytes());
			fileSystemUsage.setDiskQueue(fsu.getDiskQueue());
			fileSystemUsage.setDiskServiceTime(fsu.getDiskServiceTime());
			fileSystemUsage.setUsePercent(fsu.getUsePercent() * 100);

			sysInfo.setFileSystemUsageInfo(fileSystemUsage);
		}
		catch (SigarPermissionDeniedException spe) {
			LOGGER.error("SigarPermissionDeniedException occurred [" + name + "] " + spe.getMessage());
		}
	}

	/**
	 * Show mounted file system information for input cases.<br>
	 * Entire disk size, used disk size, usable disk size, etc.
	 *
	 * @param name directory name
	 * @throws SigarException
	 * @see FileSystemUsage
	 */
	public static void gatherMountedFileSystemUsage(String name) throws SigarException {
		FileSystemUsage fsu = getInstance().sigar.getMountedFileSystemUsage(name);
		FileSystemUsageInfo fileSystemUsageInfo = new FileSystemUsageInfo();
		fileSystemUsageInfo.setTotal(fsu.getTotal());
		fileSystemUsageInfo.setFree(fsu.getFree());
		fileSystemUsageInfo.setDiskUsed(fsu.getUsed());
		fileSystemUsageInfo.setAvail(fsu.getAvail());
		fileSystemUsageInfo.setFiles(fsu.getFiles());
		fileSystemUsageInfo.setFreeFiles(fsu.getFreeFiles());
		fileSystemUsageInfo.setDiskReads(fsu.getDiskReads());
		fileSystemUsageInfo.setDiskWrites(fsu.getDiskWrites());
		fileSystemUsageInfo.setDiskReadBytes(fsu.getDiskReadBytes());
		fileSystemUsageInfo.setDiskWriteBytes(fsu.getDiskWriteBytes());
		fileSystemUsageInfo.setDiskQueue(fsu.getDiskQueue());
		fileSystemUsageInfo.setDiskServiceTime(fsu.getDiskServiceTime());
		fileSystemUsageInfo.setUsePercent(fsu.getUsePercent() * 100);

		sysInfo.setFileSystemUsageInfo(fileSystemUsageInfo);
	}

	/**
	 * System memory information
	 *
	 * @throws SigarException
	 * @see Mem
	 * @see Swap
	 */
	public static void gatherMemoryInfo() throws SigarException {
		MemoryInfo memoryInfo = new MemoryInfo();
		Mem mem = getInstance().sigar.getMem();
		Swap swap = getInstance().sigar.getSwap();
		memoryInfo.setMemTotal(mem.getTotal() / 1024); // KB
		memoryInfo.setMemUsed(mem.getUsed() / 1024);
		memoryInfo.setMemFree(mem.getFree() / 1024);
		memoryInfo.setActualUsed(mem.getActualUsed() / 1024);
		memoryInfo.setActualFree(mem.getActualFree() / 1024);
		memoryInfo.setSwapTotal(swap.getTotal() / 1024);
		memoryInfo.setSwapUsed(swap.getUsed() / 1024);
		memoryInfo.setSwapFree(swap.getFree() / 1024);
		memoryInfo.setRam(mem.getRam());
		sysInfo.setMemoryInfo(memoryInfo);
	}

	/**
	 * system process state information
	 *
	 * @throws SigarException
	 * @see {@link org.hyperic.sigar.Sigar#getProcStat()}
	 */
	public static void gatherProcessStatInfo() throws SigarException {

		ProcStat procStat = getInstance().sigar.getProcStat();
		ProcessStatInfo processStatInfo = new ProcessStatInfo();
		processStatInfo.setTotal(procStat.getTotal());
		processStatInfo.setIdle(procStat.getIdle());
		processStatInfo.setRunning(procStat.getRunning());
		processStatInfo.setSleeping(procStat.getSleeping());
		processStatInfo.setStopped(procStat.getStopped());
		processStatInfo.setZombie(procStat.getZombie());
		processStatInfo.setThreads(procStat.getThreads());

		sysInfo.setProcessStatInfo(processStatInfo);
	}

	/**
	 * Entire process information - CPU information, execution information,
	 * status information, time information
	 *
	 * @param args command option
	 * @throws SigarException
	 * @see {@link org.hyperic.sigar.Sigar#getProcList()}
	 */
	public static void gatherProcessInfo(String[] args) throws SigarException {
		Map<Long, ProcessInfo> procInfoMap = new LinkedHashMap<Long, ProcessInfo>();

		long[] pids = getInstance().sigar.getProcList();
		if (args == null || args.length == 0) {
			pids = getInstance().sigar.getProcList();
		}
		else {
			pids = shell.findPids(args);
		}
		for (Long pid : pids) {
			ProcessInfo procInfo = new ProcessInfo();
			ProcessCpuInfo processCpuInfo = gatherProcessCpu(pid);
			ProcessExeInfo processExeInfo = gatherProcessExe(pid);
			ProcessStateInfo processStateInfo = gatherProcessState(pid);
			ProcessMemoryInfo processMemoryInfo = gatherProcessMemory(pid);

			procInfo.setProcessCpuInfo(processCpuInfo);
			procInfo.setProcessExeInfo(processExeInfo);
			procInfo.setProcessStateInfo(processStateInfo);
			procInfo.setProcessMemoryInfo(processMemoryInfo);

			procInfoMap.put(pid, procInfo);
		}
		sysInfo.setProcessInfoMap(procInfoMap);
	}

	/**
	 * Process CPU time information
	 *
	 * @param pid process ID
	 * @return ProcessCpuInfo process CPU VO
	 * @see ProcCpu
	 */
	public static ProcessCpuInfo gatherProcessCpu(long pid) {
		ProcessCpuInfo processCpuInfo = new ProcessCpuInfo();
		String unknown = "???";
		try {
			ProcCpu procCpu = getInstance().sigar.getProcCpu(pid);
			processCpuInfo.setPercent(String.valueOf((procCpu.getPercent() * 100)));
			processCpuInfo.setLastTime(getStartTime(procCpu.getLastTime()));
			processCpuInfo.setStartTime(getStartTime(procCpu.getStartTime()));
			processCpuInfo.setUser(String.valueOf(procCpu.getUser()));
			processCpuInfo.setSys(String.valueOf(procCpu.getSys()));
			processCpuInfo.setTotal(Ps.getCpuTime(procCpu.getTotal()));
		}
		catch (Exception e) {
			LOGGER.error("ProcessCpuInfo pid=" + pid + ", " + e.getMessage());
			processCpuInfo.setPercent(unknown);
			processCpuInfo.setLastTime(unknown);
			processCpuInfo.setStartTime(unknown);
			processCpuInfo.setUser(unknown);
			processCpuInfo.setSys(unknown);
			processCpuInfo.setTotal(unknown);
		}
		return processCpuInfo;
	}

	/**
	 * Process work information (work directory, executed process name)
	 *
	 * @param pid process ID
	 * @return ProcessExeInfo
	 * @see ProcExe
	 */
	public static ProcessExeInfo gatherProcessExe(long pid) {
		ProcessExeInfo processExeInfo = new ProcessExeInfo();
		String unknown = "???";
		try {
			ProcExe procExe = getInstance().sigar.getProcExe(pid);
			processExeInfo.setCwd(procExe.getCwd());
			processExeInfo.setName(procExe.getName());
		}
		catch (Exception e) {
			LOGGER.error("ProcessExeInfo pid=" + pid + ", " + e.getMessage());
			processExeInfo.setCwd(unknown);
			processExeInfo.setName(unknown);
		}
		return processExeInfo;
	}

	/**
	 * Process state information
	 *
	 * @param pid process ID
	 * @return ProcessStateInfo process state VO
	 * @see ProcState
	 * @see ProcCredName
	 */
	public static ProcessStateInfo gatherProcessState(long pid) {
		ProcessStateInfo processStateInfo = new ProcessStateInfo();
		String unknown = "???";
		try {
			ProcState procState = getInstance().sigar.getProcState(pid);
			processStateInfo.setName(procState.getName());
			processStateInfo.setNice(String.valueOf(procState.getNice()));
			processStateInfo.setPpid(String.valueOf(procState.getPpid()));
			processStateInfo.setPriority(String.valueOf(procState.getPriority()));
			processStateInfo.setProcessor(String.valueOf(procState.getProcessor()));
			processStateInfo.setState(String.valueOf(procState.getState()));
			processStateInfo.setThreads(String.valueOf(procState.getThreads()));
			processStateInfo.setTty(String.valueOf(procState.getTty()));
		}
		catch (Exception e) {
			LOGGER.error("ProcessStateInfo pid=" + pid + ", " + e.getMessage());
			processStateInfo.setName(unknown);
			processStateInfo.setNice(unknown);
			processStateInfo.setPpid(unknown);
			processStateInfo.setPriority(unknown);
			processStateInfo.setProcessor(unknown);
			processStateInfo.setState(unknown);
			processStateInfo.setThreads(unknown);
			processStateInfo.setTty(unknown);
		}

		try {
			ProcCredName procCredName = getInstance().sigar.getProcCredName(pid);
			String name = ProcUtil.getDescription(getInstance().sigar, pid);

			processStateInfo.setUser(procCredName.getUser());
			processStateInfo.setGroup(procCredName.getGroup());
			processStateInfo.setDesc(name);

		}
		catch (SigarException e) {
			processStateInfo.setUser(unknown);
			processStateInfo.setUser(unknown);
		}
		return processStateInfo;
	}

	/**
	 * Process memory information
	 *
	 * @param pid processID
	 * @return ProcessMemoryInfo process memory VO
	 * @see ProcMem
	 */
	public static ProcessMemoryInfo gatherProcessMemory(long pid) {
		ProcessMemoryInfo processMemoryInfo = new ProcessMemoryInfo();
		String unknown = "???";
		try {
			ProcMem pm = getInstance().sigar.getProcMem(pid);
			processMemoryInfo.setSize(Sigar.formatSize(pm.getSize()));
			processMemoryInfo.setResident(String.valueOf(pm.getResident()));
			processMemoryInfo.setShare(Sigar.formatSize(pm.getShare()));
			processMemoryInfo.setMinorFaults(String.valueOf(pm.getMinorFaults()));
			processMemoryInfo.setMajorFaults(String.valueOf(pm.getMajorFaults()));
			processMemoryInfo.setPageFaults(String.valueOf(pm.getPageFaults()));
		}
		catch (Exception e) {
			LOGGER.error("ProcessMemoryInfo pid=" + pid + ", " + e.getMessage());
			processMemoryInfo.setSize(unknown);
			processMemoryInfo.setResident(unknown);
			processMemoryInfo.setShare(unknown);
			processMemoryInfo.setMinorFaults(unknown);
			processMemoryInfo.setMajorFaults(unknown);
			processMemoryInfo.setPageFaults(unknown);
		}
		return processMemoryInfo;
	}

	/**
	 * CPU information
	 *
	 * @throws SigarException
	 * @see CpuInfo
	 */
	public static void gatherCpuInfo() throws SigarException {
		CpuInfo cpuInfo = new CpuInfo();
		org.hyperic.sigar.CpuInfo info = getInstance().sigar.getCpuInfoList()[0];
		cpuInfo.setVendor(info.getVendor());
		cpuInfo.setModel(info.getModel());
		cpuInfo.setMhz(info.getMhz());
		cpuInfo.setTotalCpus(info.getTotalCores());
		if ((info.getTotalCores() != info.getTotalSockets()) || (info.getCoresPerSocket() > info.getTotalCores())) {
			cpuInfo.setPhysicalCpus(info.getTotalSockets());
			cpuInfo.setCoresPerCpu(info.getCoresPerSocket());
		}
		long cacheSize = info.getCacheSize();
		if (cacheSize != Sigar.FIELD_NOTIMPL) {
			cpuInfo.setCacheSize(cacheSize);
		}
		sysInfo.setCpuInfo(cpuInfo);
	}

	/**
	 * Uptime information - system boot time and execution time
	 * @throws SigarException
	 */
	public static void gatherUptimeInfo() throws SigarException {
		// Uptime uptime = new Uptime(this.shell);
		double uptime = getInstance().sigar.getUptime().getUptime();
		String uptimeResult = Uptime.getInfo(getInstance().sigar);

		UptimeInfo uptimeInfo = new UptimeInfo();
		uptimeInfo.setInfoAll(uptimeResult);
		uptimeInfo.setCurrentTime(DateUtil.getCurrentTime());
		uptimeInfo.setUptimeSeconds(uptime);
		parseUptimeInfo(uptimeResult, uptimeInfo);
		sysInfo.setUptimeInfo(uptimeInfo);
	}

	/**
	 * Version information
	 *
	 * @throws IOException
	 * @see Version
	 * @see OperatingSystem
	 */
	public static void gatherVersionInfo() throws IOException {

		// PrintStream wrapping and result text parsing
		ByteArrayOutputStream os = new ByteArrayOutputStream();
		PrintStream ps = new PrintStream(os);
		Version.printInfo(ps);
		String result = os.toString();

		NativeInfo nativeInfo = new NativeInfo();
		nativeInfo.setSigarVersionJava(Sigar.VERSION_STRING);
		nativeInfo.setSigarVersionNative(Sigar.NATIVE_VERSION_STRING);
		nativeInfo.setBuildDateJava(Sigar.BUILD_DATE);
		nativeInfo.setBuildDateNative(Sigar.NATIVE_BUILD_DATE);
		nativeInfo.setScmRevJava(Sigar.SCM_REVISION);
		nativeInfo.setScmRevNative(Sigar.NATIVE_SCM_REVISION);
		// nativeInfo.setArchlib(SigarLoader.getNativeLibraryName());
		// nativeInfo.setCurrentFqdn(currentFqdn)
		// nativeInfo.setHostname(Version.get)
		parseNativeInfo(result, nativeInfo);
		sysInfo.setNativeInfo(nativeInfo);

		OsInfo osInfo = new OsInfo();
		osInfo.setCurrentUser(System.getProperty("user.name"));
		OperatingSystem sys = OperatingSystem.getInstance();
		osInfo.setDescription(sys.getDescription());
		osInfo.setName(sys.getName());
		osInfo.setArch(sys.getArch());
		osInfo.setMachine(sys.getMachine());
		osInfo.setVersion(sys.getVersion());
		osInfo.setPatchLevel(sys.getPatchLevel());
		osInfo.setVendor(sys.getVendor());
		osInfo.setVendorVersion(sys.getVendorVersion());
		osInfo.setCodeName(sys.getVendorCodeName());
		osInfo.setDataModel(sys.getDataModel());
		osInfo.setCpuEndian(sys.getCpuEndian());
		sysInfo.setOsInfo(osInfo);

		JavaInfo javaInfo = new JavaInfo();
		javaInfo.setVmVersion(System.getProperty("java.vm.version"));
		javaInfo.setVmVendor(System.getProperty("java.vm.vendor"));
		javaInfo.setJavaHome(System.getProperty("java.home"));
		sysInfo.setJavaInfo(javaInfo);

		os.close();
		ps.close();

	}

	/**
	 * Analyze Uptime information and set in VO
	 *
	 * @param uptime uptime string that has information
	 * @param uptimeInfo VO in which analyzed information is set
	 */
	private static void parseUptimeInfo(String uptime, UptimeInfo uptimeInfo) {
		// ex. 11:06 오전 up 1 day, 3:8, (load average unknown)
		uptime = uptime.split(" up ")[1];
		String daysAndTime = "";
		String loadAverage = "";
		if (!uptime.contains("load average: ")) {
			int lastComma = uptime.lastIndexOf(',');
			daysAndTime = uptime.substring(0, lastComma);
			loadAverage = uptime.substring(lastComma + 1).trim();
		}
		else {
			String daysAndTimePattern = "^((\\d+ days?,)? (\\d{1,2}:\\d{1,2})),.*$";
			if (uptime.matches(daysAndTimePattern)) {
				daysAndTime = uptime.replaceAll(daysAndTimePattern, "$1");
			}
			loadAverage = uptime.split("load average: ")[1];
		}
		uptimeInfo.setUptime(daysAndTime);
		uptimeInfo.setLoadAverage(loadAverage);
	}

	/**
	 * Analyze version or OS information and set in VO
	 *
	 * @param nativeAndOsInfo String that has native or OS information
	 * @param nativeInfo VO in which analyzed information is set
	 */
	private static void parseNativeInfo(String nativeAndOsInfo, NativeInfo nativeInfo) {
		// @formatter:off
		/* ex.) NativeInfo sample
			Sigar version.......java=1.6.4.129, native=1.6.4.127
			Build date..........java=04/28/2010 04:26 PM, native=04/28/2010 04:26 PM
			SCM rev.............java=4b67f57, native=4b67f57
			Archlib.............sigar-x86-winnt.dll
			Current fqdn........xx.xx.xx.xx
			Hostname............woo
			Language............1042:Korean (Korea)
			Perflib lang id.....012
		*/
		// @formatter:on
		String archlibPattern = "(?s).*Archlib\\.+([^\r\n]+)\r?\n.*(?s)";
		String fqdnPattern = "(?s).*Current fqdn\\.+([^\r\n]+)\r?\n.*(?s)";
		String hostnamePattern = "(?s).*Hostname\\.+([^\r\n]+)\r?\n.*(?s)";
		String languagePattern = "(?s).*Language\\.+([^\r\n]+)\r?\n.*(?s)";
		String perflibLangIdPattern = "(?s).*Perflib lang id\\.+([^\r\n]+)\r?\n.*(?s)";

		if (nativeAndOsInfo.matches(archlibPattern)) {
			nativeInfo.setArchlib(nativeAndOsInfo.replaceAll(archlibPattern, "$1"));
		}

		if (nativeAndOsInfo.matches(fqdnPattern)) {
			nativeInfo.setCurrentFqdn(nativeAndOsInfo.replaceAll(fqdnPattern, "$1"));
		}

		if (nativeAndOsInfo.matches(hostnamePattern)) {
			nativeInfo.setHostname(nativeAndOsInfo.replaceAll(hostnamePattern, "$1"));
		}

		if (nativeAndOsInfo.matches(languagePattern)) {
			nativeInfo.setLanguage(nativeAndOsInfo.replaceAll(languagePattern, "$1"));
		}

		if (nativeAndOsInfo.matches(perflibLangIdPattern)) {
			nativeInfo.setPerflibLangId(nativeAndOsInfo.replaceAll(perflibLangIdPattern, "$1"));
		}

		if (!nativeAndOsInfo.contains("Hostname")) {
			nativeInfo.setHostname(nativeInfo.getCurrentFqdn());
		}

	}

	/**
	 * Analyze Ulimit information and set in VO
	 *
	 * @param output Ulimit String that has information
	 * @param ulimitInfo VO in which analyzed information is set
	 */
	private static void parseUlimitInfo(List<String> output, UlimitInfo ulimitInfo) {
		// @formatter:off
		/* ex.) Ulimit sample
			core file size.......-1
			data seg size........-1
			file size............-1
			pipe size............-1
			max memory size......-1
			open files...........-1
			stack size...........258912
			cpu time.............-1
			max user processes...-1
			virtual memory.......2147483648
		*/
		// @formatter:on
		for (String line : output) {
			if (line.indexOf("core") == 0) {
				ulimitInfo.setCoreFileSize(line.split("\\.+")[1]);
			}
			else if (line.indexOf("data") == 0) {
				ulimitInfo.setDataSegSize(line.split("\\.+")[1]);
			}
			else if (line.indexOf("file") == 0) {
				ulimitInfo.setFileSize(line.split("\\.+")[1]);
			}
			else if (line.indexOf("pipe") == 0) {
				ulimitInfo.setPipeSize(line.split("\\.+")[1]);
			}
			else if (line.indexOf("max memory") == 0) {
				ulimitInfo.setMemory(line.split("\\.+")[1]);
			}
			else if (line.indexOf("open") == 0) {
				ulimitInfo.setOpenFiles(line.split("\\.+")[1]);
			}
			else if (line.indexOf("stack") == 0) {
				ulimitInfo.setStackSize(line.split("\\.+")[1]);
			}
			else if (line.indexOf("cpu") == 0) {
				ulimitInfo.setCpuTime(line.split("\\.+")[1]);
			}
			else if (line.indexOf("max user") == 0) {
				ulimitInfo.setMaxUserProcesses(line.split("\\.+")[1]);
			}
			else if (line.indexOf("virtual") == 0) {
				ulimitInfo.setVirtualMemory(line.split("\\.+")[1]);
			}
		}
	}

	/**
	 * Route information
	 *
	 * @return route list
	 * @throws SigarException
	 * @throws ShellCommandExecException
	 * @throws ShellCommandUsageException
	 * @see NetRoute
	 */
	public static List<String> getNetworkRouteInfo() throws SigarException, ShellCommandUsageException,
			ShellCommandExecException {
		Route route = new Route(shell);
		route.processCommand(new String[] {});
		forceFlushPrintfItems(route);
		return forceGetOutput(route);
	}

	/**
	 * netstat information
	 *
	 * @param args (ex. new String[]{ "a" })
	 * @return netstat List<String> of string resulting from output execution
	 * @throws SigarException
	 * @throws ShellCommandExecException
	 * @throws ShellCommandUsageException
	 * @see Netstat
	 * @see org.hyperic.sigar.Sigar#getNetConnectionList(int)
	 */
	public static List<String> getNetStat(String[] args) throws SigarException, ShellCommandUsageException,
			ShellCommandExecException {
		Netstat netstat = new Netstat(shell);
		netstat.processCommand(args);
		forceFlushPrintfItems(netstat);
		return forceGetOutput(netstat);
	}

	/**
	 * who all users that are logged on to system
	 * @return user information
	 * @throws SigarException
	 * @throws ShellCommandExecException
	 * @throws ShellCommandUsageException
	 * @see org.hyperic.sigar.Who
	 */
	public static List<String> getWho() throws SigarException, ShellCommandUsageException, ShellCommandExecException {
		Who who = new Who(shell);
		who.processCommand(new String[] {});
		forceFlushPrintfItems(who);
		return forceGetOutput(who);
	}

	/**
	 * Execute cmd class Ls of Sigar
	 * @param filePath file path
	 * @return the result of ls
	 * @throws SigarException
	 * @throws ShellCommandUsageException
	 * @throws ShellCommandExecException
	 */
	public static List<String> getLs(String filePath) throws SigarException, ShellCommandUsageException,
			ShellCommandExecException {
		Ls ls = new Ls(shell);
		ls.processCommand(new String[] { filePath });
		forceFlushPrintfItems(ls);
		return forceGetOutput(ls);
	}

	/**
	 * File or directory information search
	 *
	 * @param name file or directory
	 * @return FileInfo file or directory information
	 * @throws SigarException
	 * @throws IOException
	 * @see org.hyperic.sigar.FileInfo
	 * @see DirUsage
	 */
	public static FileInfo getFileInfo(String name) throws SigarException, IOException {
		org.hyperic.sigar.FileInfo fi = getInstance().sigar.getFileInfo(name);
		org.hyperic.sigar.FileInfo fiLink = getInstance().sigar.getLinkInfo(name);

		FileInfo fileInfo = new FileInfo();
		fileInfo.setName(fi.getName());
		fileInfo.setPermission(fi.getPermissionsString());
		fileInfo.setMode(fi.getMode());
		fileInfo.setType(fi.getTypeString());
		fileInfo.setSize(fi.getSize());
		fileInfo.setUid(fi.getUid());
		fileInfo.setGid(fi.getGid());
		fileInfo.setInode(fi.getInode());
		fileInfo.setDevice(fi.getDevice());
		fileInfo.setNlink(fi.getNlink());
		fileInfo.setAtime(fi.getAtime());
		fileInfo.setMtime(fi.getMtime());
		fileInfo.setCtime(fi.getCtime());

		if (fiLink.getType() == 6) {
			fileInfo.setCanonicalPath(new File(name).getCanonicalPath());
		}
		fileInfo.setTypeChar(fiLink.getTypeChar());

		if (fi.getType() == org.hyperic.sigar.FileInfo.TYPE_DIR) {
			DirUsage ds = getInstance().sigar.getDirUsage(name);
			fileInfo.setTotal(ds.getTotal());
			fileInfo.setFiles(ds.getFiles());
			fileInfo.setSubdirs(ds.getSubdirs());
			fileInfo.setSymlinks(ds.getSymlinks());
			fileInfo.setChrdevs(ds.getChrdevs());
			fileInfo.setBlkdevs(ds.getBlkdevs());
			fileInfo.setSockets(ds.getSockets());
			fileInfo.setDiskUsage(ds.getDiskUsage());
		}
		return fileInfo;
	}

	private static String getStartTime(long time) {
		if (time == 0) {
			return "00:00";
		}
		long timeNow = System.currentTimeMillis();
		String fmt = "MMMd";

		if ((timeNow - time) < ((60 * 60 * 24) * 1000)) {
			fmt = "HH:mm";
		}
		DateTime dt = new DateTime(time);
		DateTimeFormatter wantedfmt = DateTimeFormat.forPattern(fmt);
		return wantedfmt.print(dt);
	}

	/**
	 * Each information is shown on Tab, and lines are separated in mod order
	 * returned as parameter so that one batch of information is written on one
	 * line.
	 * @param info list of information
	 * @param mod mod order
	 * @return one batch of information that is written on one line.
	 */
	public static String print(List<String> info, int mod) {
		StringBuilder buf = new StringBuilder();
		Iterator<String> i = info.iterator();
		boolean hasNext = i.hasNext();
		int index = 0;
		while (hasNext) {
			index++;
			buf.append((String) i.next());
			hasNext = i.hasNext();
			if (index % mod == 0)
				buf.append("\n");
			else if (hasNext)
				buf.append("\t");

		}
		return buf.toString();
	}

	public Sigar getSigar() {
		return sigar;
	}

	protected static void setSysInfo(SysInfo sysInfo) {
		SigarAccessor.sysInfo = sysInfo;
	}

	public static SysInfo getSysInfo() {
		return SigarAccessor.sysInfo;
	}

	/**
	 * Can use basic Shell of SigarAccessor basically set when running system to
	 * immediately execute command registered as registerCommands and show
	 * results on basic console.
	 * @param registeredCmd
	 * (df,du,ls,iostat,free,pargs,penv,pfile,pmodules,pinfo,cpuinfo,ifconfig,
	 * uptime
	 * ,ps,pidof,kill,netstat,netinfo,nfsstat,route,version,mps,sysinfo,time
	 * ,ulimit,who, [service,fversion in case of Windows])
	 * @param args arguments
	 * @throws ShellCommandUsageException
	 * @throws ShellCommandExecException
	 */
	public static void directRun(String registeredCmd, String[] args) throws ShellCommandUsageException,
			ShellCommandExecException {
		shell.processCommand(shell.getHandler(registeredCmd), args);
	}

	/**
	 * Enforce the execution of flushPrintfItems that performs automatic
	 * formatting on printfItems of SigarCommandBase, additional works, to get
	 * execution result text when executing Command class provided in Sigar, and
	 * print as output
	 * @param target the SigarCommandBase class
	 */
	private static void forceFlushPrintfItems(SigarCommandBase target) {
		ReflectionUtils.invokeMethod(flushPrintfItems, target);
	}

	/**
	 * Enforce the execution of access output member of SigarCommandBase,
	 * additional work to get execution result text when executing Command class
	 * provided by Sigar
	 * @param target the SigarCommandBase class
	 * @return list of execution result
	 */
	@SuppressWarnings("unchecked")
	private static List<String> forceGetOutput(SigarCommandBase target) {
		return (List<String>) ReflectionUtils.getField(output, target);
	}

}
