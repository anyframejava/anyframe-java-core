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
package org.anyframe.plugin.util.system.web;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import org.anyframe.chart.fusionchartfree.support.model.pie2d.Pie2dGraph;
import org.anyframe.chart.fusionchartfree.support.model.pie2d.Pie2dSet;
import org.anyframe.chart.fusionchartfree.support.model.stackedbar2d.StackedBar2dCategories;
import org.anyframe.chart.fusionchartfree.support.model.stackedbar2d.StackedBar2dCategory;
import org.anyframe.chart.fusionchartfree.support.model.stackedbar2d.StackedBar2dDataset;
import org.anyframe.chart.fusionchartfree.support.model.stackedbar2d.StackedBar2dGraph;
import org.anyframe.chart.fusionchartfree.support.model.stackedbar2d.StackedBar2dSet;
import org.anyframe.util.scripts.DefaultScriptExecutor;
import org.anyframe.util.scripts.OsType;
import org.anyframe.util.system.NetworkStateUtil;
import org.anyframe.util.system.SystemInfoUtil;
import org.anyframe.util.system.sigar.FileSystemUsageInfo;
import org.anyframe.util.system.sigar.MemoryInfo;
import org.anyframe.util.system.sigar.ProcessInfo;
import org.anyframe.util.system.sigar.SigarAccessor;
import org.hyperic.sigar.CpuPerc;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * This UtilTestController class is a Controller class to provide util functionality.
 *
 * @author Hyunjung Jeong
 */
@Controller("utilSystemController")
@RequestMapping("/utilSystem/*")
public class UtilSystemController {

	private Random numGen = new Random();

	@PostConstruct
	public void initSigar() throws Exception {
		// util-system 용 sigar-bin 위치(uninstall 위해 관련 plugin 하위에 위치해야 하는 문제) 강제 지정
		//System.setProperty("java.library.path", System.getProperty("java.library.path") + ";" + "src/main/resources/util-system/sigar-bin/lib");
		String thisClassPath = UtilSystemController.class.getResource("").getPath();
		String rootPath = null;
		if(thisClassPath.lastIndexOf("classes") > 0) {
			rootPath = thisClassPath.substring(0, thisClassPath.lastIndexOf("classes") + 7);
		}
		String sigarLibPath = rootPath + "/util-system/sigar-bin/lib";
		String delimiter = DefaultScriptExecutor.getOs().is(OsType.Windows) ? ";" : ":";
		System.setProperty("java.library.path", System.getProperty("java.library.path") + delimiter + sigarLibPath);

		// SigarAccessor 초기화 정보 수집
		SigarAccessor.gatherSysInfo();
	}

	@RequestMapping("/utilSystem/utilSystemList.do")
	public String utilSystemList() {
		return "util-system/utilSystemList";
	}

	@RequestMapping("/utilSystem/networkMain.do")
	public String networkMain() {
		return "util-system/networkStateUtilTest";
	}

	@RequestMapping("/utilSystem/getNetworkInfoList.do")
	public String getNetworkInfoList(ModelMap map) {
		map.addAttribute("result", NetworkStateUtil.getNetworkInfoList());
		return "jsonView";
	}

	@RequestMapping("/utilSystem/getMyIPInfo.do")
	public String getMyIPInfo(ModelMap map) {
		map.addAttribute("result", NetworkStateUtil.getMyIPInfo());
		return "jsonView";
	}

	@RequestMapping("/utilSystem/getMyIPList.do")
	public String getMyIPList(ModelMap map) {
		map.addAttribute("result", NetworkStateUtil.getMyIPList());
		return "jsonView";
	}

	@RequestMapping("/utilSystem/getMyMacAddressList.do")
	public String getMyMacAddressList(ModelMap map) {
		map.addAttribute("result", NetworkStateUtil.getMyMacAddressList());
		return "jsonView";
	}

	@RequestMapping("/utilSystem/getPortScan.do")
	public String getPortScan(ModelMap map) {
		map.addAttribute("result", NetworkStateUtil.getPortScan());
		return "jsonView";
	}

	@RequestMapping("/utilSystem/getRoute.do")
	public String getRoute(ModelMap map) {
		map.addAttribute("result", NetworkStateUtil.getRoute());
		return "jsonView";
	}

	@RequestMapping("/utilSystem/getPing.do")
	public String testPing(@RequestParam String dest, ModelMap map) {
		map.addAttribute("result", NetworkStateUtil.testPing(dest, 2000));
		return "jsonView";
	}

	@RequestMapping("/utilSystem/systemMain.do")
	public String systemMain() {
		return "util-system/systemInfoUtilTest";
	}

	@RequestMapping("/utilSystem/getNativeInfo.do")
	public String getNativeInfo(ModelMap map) {
		map.addAttribute("result", SigarAccessor.getSysInfo().getNativeInfo());
		return "jsonView";
	}

	@RequestMapping("/utilSystem/getOsInfo.do")
	public String getOsInfo(ModelMap map) {
		map.addAttribute("result", SystemInfoUtil.getSystemInfo());
		return "jsonView";
	}

	@RequestMapping("/utilSystem/getJavaInfo.do")
	public String getJavaInfo(ModelMap map) {
		map.addAttribute("result", SigarAccessor.getSysInfo().getJavaInfo());
		return "jsonView";
	}

	@RequestMapping("/utilSystem/getUptimeInfo.do")
	public String getUptimeInfo(ModelMap map) throws Exception {
		SigarAccessor.gatherUptimeInfo();
		map.addAttribute("result", SigarAccessor.getSysInfo().getUptimeInfo());
		return "jsonView";
	}

	@RequestMapping("/utilSystem/getCpuInfo.do")
	public String getCpuInfo(ModelMap map) {
		map.addAttribute("result", SystemInfoUtil.getCpuInfo());
		return "jsonView";
	}

	@RequestMapping("/utilSystem/getMemoryInfo.do")
	public String getMemoryInfo(ModelMap map) throws Exception {
		SigarAccessor.gatherMemoryInfo();
		map.addAttribute("result", SigarAccessor.getSysInfo().getMemoryInfo());
		return "jsonView";
	}

	@RequestMapping("/utilSystem/getFileSystemInfo.do")
	public String getFileSystemInfo(ModelMap map) {
		map.addAttribute("result", SystemInfoUtil.getDiskProperty());
		return "jsonView";
	}

	@RequestMapping("/utilSystem/getProcessStatInfo.do")
	public String getProcessStatInfo(ModelMap map) throws Exception {
		SigarAccessor.gatherProcessStatInfo();
		map.addAttribute("result", SystemInfoUtil.getProcessStat());
		return "jsonView";
	}

	@RequestMapping("/utilSystem/getUlimitInfo.do")
	public String getUlimitInfo(ModelMap map) {
		map.addAttribute("result", SigarAccessor.getSysInfo().getUlimitInfo());
		return "jsonView";
	}

	@RequestMapping("/utilSystem/getClientInfo.do")
	public String getClientInfo(ModelMap map, HttpServletRequest request) {
		Map<String, String> clientInfo = new LinkedHashMap<String, String>();
		clientInfo.put("clientOS", SystemInfoUtil.getClientOS(request));
		clientInfo.put("clientIP", SystemInfoUtil.getClientIP(request));
		clientInfo.put("clientBrowser", SystemInfoUtil.getClientBrowser(request));
		clientInfo.put("user-agent", request.getHeader("user-agent"));
		map.addAttribute("result", clientInfo);
		return "jsonView";
	}

	@RequestMapping("/utilSystem/systemUsageMain.do")
	public String systemUsageMain() {
		return "util-system/systemUsageInfoTest";
	}

	@RequestMapping("/utilSystem/getCpuPerc.do")
	public String getCpuPerc(ModelMap map) throws Exception {
		map.addAttribute("result", SigarAccessor.getInstance().getSigar().getCpuPerc());
		return "jsonView";
	}

	@RequestMapping("/utilSystem/getCpuPercList.do")
	public String getCpuPercList(ModelMap map) throws Exception {
		map.addAttribute("result", SigarAccessor.getInstance().getSigar().getCpuPercList());
		return "jsonView";
	}

	@RequestMapping("/utilSystem/getDiskUsage.do")
	public String getDiskUsage(ModelMap map) throws Exception {
		SigarAccessor.gatherFileSystemUsageMap();
		map.addAttribute("result", SystemInfoUtil.getDiskCapacity());
		return "jsonView";
	}

	@RequestMapping("/utilSystem/getProcessList.do")
	public String getProcessList(ModelMap map) {
		map.addAttribute("result", SystemInfoUtil.getPs(null));
		return "jsonView";
	}

	@RequestMapping("/utilSystem/getProcessInfo.do")
	public String getProcessInfo(@RequestParam long pid, ModelMap map) {
		ProcessInfo processInfo = new ProcessInfo();
		processInfo.setProcessCpuInfo(SigarAccessor.gatherProcessCpu(pid));
		processInfo.setProcessExeInfo(SigarAccessor.gatherProcessExe(pid));
		processInfo.setProcessStateInfo(SigarAccessor.gatherProcessState(pid));
		processInfo.setProcessMemoryInfo(SigarAccessor.gatherProcessMemory(pid));
		map.addAttribute("result", processInfo);
		return "jsonView";
	}

	@RequestMapping("/utilSystem/systemUsageChartMain.do")
	public String systemUsageChartMain() {
		return "util-system/systemUsageChartTest";
	}

	@RequestMapping("/utilSystem/getCpuPercChart.do")
	public String getCpuPercChart(ModelMap map) throws Exception {
		CpuPerc cpuPerc = SigarAccessor.getInstance().getSigar().getCpuPerc();
		Pie2dGraph pie2d = new Pie2dGraph();
		pie2d.setCaption("CPU Usage");
		pie2d.setDecimalPrecision(2);
		pie2d.setShowPercentageValues(1);
		pie2d.setShowNames(1);
		//Velocity-Support-numberSuffix-START
		pie2d.setNumberSuffix("&#37;");
		//Velocity-Support-numberSuffix-END
		pie2d.setShowValues(1);
		pie2d.setShowPercentageInLabel(0);
		pie2d.setPieYScale(45);
		pie2d.setPieBorderAlpha(100);
		pie2d.setPieRadius(100);
		pie2d.setAnimation(0);
		pie2d.setShadowXShift(4);
		pie2d.setShadowAlpha(40);
		pie2d.setPieFillAlpha(95);
		pie2d.setPieBorderColor("FFFFFF");

		Pie2dSet set1 = new Pie2dSet();
		set1.setValue(cpuPerc.getIdle() * 100.0);
		set1.setName("Idle");
		set1.setColor("AFD8F8");
		Pie2dSet set2 = new Pie2dSet();
		set2.setValue(cpuPerc.getSys() * 100.0);
		set2.setName("System");
		set2.setColor("F6BD0F");
		set2.setIsSliced(1);
		Pie2dSet set3 = new Pie2dSet();
		set3.setValue(cpuPerc.getUser() * 100.0);
		set3.setName("User");
		set3.setColor("8BBA00");
		set3.setIsSliced(1);
		Pie2dSet set4 = new Pie2dSet();
		set4.setValue(cpuPerc.getIrq() * 100.0);
		set4.setName("Irq");
		set4.setColor("A66EDD");
		set4.setIsSliced(1);
		Pie2dSet set5 = new Pie2dSet();
		set5.setValue(cpuPerc.getStolen() * 100.0);
		set5.setName("Stolen");
		set5.setColor("F984A1");
		set5.setIsSliced(1);
		Pie2dSet set6 = new Pie2dSet();
		set6.setValue(cpuPerc.getWait() * 100.0);
		set6.setName("Wait");
		set6.setColor("F9BA0F");
		set6.setIsSliced(1);

		List<Pie2dSet> sets = new ArrayList<Pie2dSet>();
		sets.add(set1);
		sets.add(set2);
		sets.add(set3);
		sets.add(set4);
		sets.add(set5);
		sets.add(set6);

		pie2d.setSet(sets);

		map.addAttribute(pie2d);
		return "utilMarshallingView";
	}

	@RequestMapping("/utilSystem/getMemoryUsageChart.do")
	public String getMemoryUsageChart(ModelMap map) throws Exception {
		SigarAccessor.gatherMemoryInfo();
		MemoryInfo memoryInfo = SigarAccessor.getSysInfo().getMemoryInfo();

		Pie2dGraph pie2d = new Pie2dGraph();
		pie2d.setCaption("Memory Usage");
		pie2d.setDecimalPrecision(0);
		pie2d.setShowPercentageValues(1);
		pie2d.setShowNames(1);
		pie2d.setNumberSuffix("MB");
		pie2d.setShowValues(1);
		pie2d.setShowPercentageInLabel(0);
		pie2d.setPieYScale(45);
		pie2d.setPieBorderAlpha(100);
		pie2d.setPieRadius(100);
		pie2d.setAnimation(0);
		pie2d.setShadowXShift(4);
		pie2d.setShadowAlpha(40);
		pie2d.setPieFillAlpha(95);
		pie2d.setPieBorderColor("FFFFFF");
		pie2d.setFormatNumberScale(0);
		pie2d.setFormatNumber(1);
		pie2d.setThousandSeparator(",");

		Pie2dSet set1 = new Pie2dSet();
		set1.setValue((double) memoryInfo.getMemFree() / 1024.0);
		set1.setName("Free");
		set1.setColor("AFD8F8");
		Pie2dSet set2 = new Pie2dSet();
		set2.setValue((double) memoryInfo.getMemUsed() / 1024.0);
		set2.setName("Used");
		set2.setColor("F6BD0F");
		set2.setIsSliced(1);

		List<Pie2dSet> sets = new ArrayList<Pie2dSet>();
		sets.add(set1);
		sets.add(set2);

		pie2d.setSet(sets);

		map.addAttribute(pie2d);
		return "utilMarshallingView";
	}

	@RequestMapping("/utilSystem/getDiskUsageChart.do")
	public String getDiskUsageChart(ModelMap map) throws Exception {
		SigarAccessor.gatherFileSystemUsageMap();
		Map<String, FileSystemUsageInfo> fsMap = SystemInfoUtil.getDiskCapacity();

		StackedBar2dGraph graph = new StackedBar2dGraph();
		graph.setXaxisname("Drives");
		graph.setYaxisname("Size");
		graph.setCaption("Disk Usage");
		graph.setSubcaption("(All of Readable Drives)");
		graph.setLineThickness(1);
		graph.setAnimation(1);
		graph.setShowNames(1);
		graph.setAlpha(100);
		graph.setShowLimits(1);
		graph.setDecimalPrecision(2);
		graph.setRotateNames(0);
		graph.setNumDivLines(2);
		graph.setNumberSuffix("GB");
		graph.setLimitsDecimalPrecision(2);
		graph.setShowValues(1);
		graph.setFormatNumberScale(0);
		graph.setFormatNumber(1);
		graph.setThousandSeparator(",");

		StackedBar2dCategories categories = new StackedBar2dCategories();
		List<StackedBar2dCategory> categoryList = new ArrayList<StackedBar2dCategory>();
		categories.setCategory(categoryList);

		List<StackedBar2dDataset> datasetList = new ArrayList<StackedBar2dDataset>();

		StackedBar2dDataset freeDataset = new StackedBar2dDataset();
		freeDataset.setSeriesName("Free");
		freeDataset.setColor("008040");

		StackedBar2dDataset usedDataset = new StackedBar2dDataset();
		usedDataset.setSeriesName("Used");
		usedDataset.setColor("FF0000");

		datasetList.add(usedDataset);
		datasetList.add(freeDataset);


		List<StackedBar2dSet> freeSets = new ArrayList<StackedBar2dSet>();
		List<StackedBar2dSet> usedSets = new ArrayList<StackedBar2dSet>();

		for (Map.Entry<String, FileSystemUsageInfo> entry : fsMap.entrySet()) {
			// for
			StackedBar2dCategory category = new StackedBar2dCategory();
			category.setName(entry.getKey());
			category.setShowName(1);

			categoryList.add(category);

			StackedBar2dSet freeSet = new StackedBar2dSet();
			freeSet.setValue((double) (entry.getValue().getFree() / 1024.0 / 1024.0));

			freeSets.add(freeSet);

			StackedBar2dSet usedSet = new StackedBar2dSet();
			usedSet.setValue((double) (entry.getValue().getDiskUsed() / 1024.0 / 1024.0));

			usedSets.add(usedSet);
		}

		freeDataset.setSet(freeSets);
		usedDataset.setSet(usedSets);

		graph.setCategories(categories);
		graph.setDataset(datasetList);

		map.addAttribute(graph);
		return "utilMarshallingView";
	}

	@RequestMapping("/utilSystem/getProcessMemoryUsageChart.do")
	public String getProcessMemoryUsageChart(ModelMap map) throws Exception {

		SigarAccessor.gatherProcessInfo(null);
		Map<Long, ProcessInfo> processInfoMap = SystemInfoUtil.getProcessList(null);

		Pie2dGraph pie2d = new Pie2dGraph();
		pie2d.setCaption("Process's Memory Usage");
		pie2d.setDecimalPrecision(0);
		pie2d.setShowPercentageValues(1);
		pie2d.setShowNames(0);
		pie2d.setNumberSuffix("MB");
		pie2d.setShowValues(1);
		pie2d.setShowPercentageInLabel(0);
		pie2d.setPieYScale(45);
		pie2d.setPieBorderAlpha(100);
		pie2d.setPieRadius(100);
		pie2d.setAnimation(0);
		pie2d.setShadowXShift(4);
		pie2d.setShadowAlpha(40);
		pie2d.setPieFillAlpha(95);
		pie2d.setPieBorderColor("FFFFFF");
		pie2d.setFormatNumberScale(0);
		pie2d.setFormatNumber(1);
		pie2d.setThousandSeparator(",");

		List<Pie2dSet> sets = new ArrayList<Pie2dSet>();
		pie2d.setSet(sets);

		for (Map.Entry<Long, ProcessInfo> entry : processInfoMap.entrySet()) {
			Pie2dSet set = new Pie2dSet();
			set.setValue(Double.parseDouble(entry.getValue().getProcessMemoryInfo().getResident()) / 1024.0);
			set.setName(entry.getValue().getProcessStateInfo().getName());
			set.setColor(randomComplementColor());

			sets.add(set);
		}

		map.addAttribute(pie2d);
		return "utilMarshallingView";
	}

	@RequestMapping("/utilSystem/getProcessCpuUsageChart.do")
	public String getProcessCpuUsageChart(ModelMap map) throws Exception {

		SigarAccessor.gatherProcessInfo(null);
		Map<Long, ProcessInfo> processInfoMap = SystemInfoUtil.getProcessList(null);

		Pie2dGraph pie2d = new Pie2dGraph();
		pie2d.setCaption("Process's Cpu Usage");
		pie2d.setDecimalPrecision(2);
		pie2d.setShowPercentageValues(1);
		pie2d.setShowNames(0);
		pie2d.setNumberSuffix("&#37;");
		pie2d.setShowValues(1);
		pie2d.setShowPercentageInLabel(0);
		pie2d.setPieYScale(45);
		pie2d.setPieBorderAlpha(100);
		pie2d.setPieRadius(100);
		pie2d.setAnimation(0);
		pie2d.setShadowXShift(4);
		pie2d.setShadowAlpha(40);
		pie2d.setPieFillAlpha(95);
		pie2d.setPieBorderColor("FFFFFF");
		pie2d.setFormatNumberScale(0);
		pie2d.setFormatNumber(1);
		pie2d.setThousandSeparator(",");

		List<Pie2dSet> sets = new ArrayList<Pie2dSet>();
		pie2d.setSet(sets);

		double sum = 0;

		for (Map.Entry<Long, ProcessInfo> entry : processInfoMap.entrySet()) {
			Pie2dSet set = new Pie2dSet();
			String percent = entry.getValue().getProcessCpuInfo().getPercent();
			boolean isIdle = "???".equals(percent);
			double present = Double.parseDouble(isIdle ? "0" : percent);
			sum += present;
			set.setValue(present);
			set.setName(entry.getValue().getProcessStateInfo().getName());
			set.setColor(randomComplementColor());

			sets.add(set);
		}

		Pie2dSet idle = new Pie2dSet();
		idle.setValue(100.0 - sum);
		idle.setName("Idle");
		idle.setColor("AFD8F8");
		sets.add(idle);


		map.addAttribute(pie2d);
		return "utilMarshallingView";
	}

	private String randomComplementColor() {
		int i = ((255 - numGen.nextInt(256)) << 16) | ((255 - numGen.nextInt(256)) << 8) | (255 - numGen.nextInt(256));
		return Integer.toString(i, 16);
	}
}
