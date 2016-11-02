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
package org.anyframe.plugin.util.web;

import java.util.List;
import java.util.Locale;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.util.domain.Movie;
import org.anyframe.plugin.util.service.MovieFinder;
import org.anyframe.util.DateUtil;
import org.anyframe.util.DigestUtil;
import org.anyframe.util.NumberUtil;
import org.anyframe.util.StringUtil;
import org.anyframe.util.ThreadLocalUtil;
import org.anyframe.util.ValidationUtil;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * This UtilTestController class is a Controller class to provide util functionality.
 * 
 * @author Hyunjung Jeong
 */
@Controller("utilController")
@RequestMapping("/util/*")
public class UtilController {

	@Inject
	@Named("utilMovieFinder")
	private MovieFinder movieFinder;
	
	@RequestMapping("/util/utilList.do")
	public String utilList() {
		return "util/utilList";
	}

	@RequestMapping("/util/dateMain.do")
	public String dateMain() {
		return "util/dateUtil";
	}

	@RequestMapping("/util/getCurrentDate.do")
	public String getCurrentDate(ModelMap map) throws Exception {
		String currentDay = DateUtil.getCurrentDate();
		map.addAttribute("result", currentDay);
		return "jsonView";
	}
	
	@RequestMapping("/util/getCurrentDateTime.do")
	public String getCurrentDateTime(@RequestParam String pattern, ModelMap map) throws Exception {
		String currentTime = DateUtil.getCurrentDateTime(pattern);
		map.addAttribute("result", currentTime);
		return "jsonView";
	}

	@RequestMapping("/util/getDays.do")
	public String getDays(@RequestParam String startDate, @RequestParam String endDate, ModelMap map) throws Exception {
		int days = DateUtil.getDays(startDate, endDate, "yyyy-MM-dd");
		map.addAttribute("result", days);
		return "jsonView";
	}

	@RequestMapping("/util/greaterThan.do")
	public String greaterThan(@RequestParam String basicDate1, @RequestParam String compareDate, ModelMap map)
			throws Exception {
		boolean greaterThan = DateUtil.greaterThan(DateUtil.stringToDate(basicDate1), compareDate);
		map.addAttribute("result", greaterThan);
		return "jsonView";
	}

	@RequestMapping("/util/getEndDate.do")
	public String getEndDate(@RequestParam String basicDate2, @RequestParam int interval, ModelMap map)
			throws Exception {
		String endDate = DateUtil.getEndDate(basicDate2, interval);
		map.addAttribute("result", endDate);
		return "jsonView";
	}

	@RequestMapping("/util/addYearMonthDay.do")
	public String addYearMonthDay(@RequestParam String basicDate3, @RequestParam int years, @RequestParam int months,
			@RequestParam int days, ModelMap map) throws Exception {
		String addDate = DateUtil.addYearMonthDay(basicDate3, years, months, days);
		map.addAttribute("result", addDate);
		return "jsonView";
	}

	@RequestMapping("/util/isDate.do")
	public String isDate(@RequestParam String basicDate4, @RequestParam String pattern1, ModelMap map) throws Exception {
		Boolean isDate = DateUtil.isDate(basicDate4, pattern1);
		map.addAttribute("result", isDate);
		return "jsonView";
	}

	@RequestMapping("/util/getDates.do")
	public String getDates(@RequestParam String startDate1, @RequestParam String endDate1, ModelMap map)
			throws Exception {

		String[] getDates = DateUtil.getDates(startDate1, endDate1);
		map.addAttribute("result", getDates);
		return "jsonView";
	}

	@RequestMapping("/util/digestMain.do")
	public String digestMain() {
		return "util/digestUtil";
	}

	@RequestMapping("/util/convertStringCharset.do")
	public String convertStringCharset(@RequestParam String str1, @RequestParam String charset1, ModelMap map)
			throws Exception {
		String encodeString = StringUtil.convertStringCharset(str1, charset1);
		map.addAttribute("result", encodeString);
		return "jsonView";
	}

	@RequestMapping("/util/encodeBase64.do")
	public String encodeBase64(@RequestParam String str3, ModelMap map) throws Exception {
		String encodeBase64 = DigestUtil.encodeBase64(str3);
		map.addAttribute("result", encodeBase64);
		return "jsonView";
	}

	@RequestMapping("/util/decodeBase64.do")
	public String decodeBase64(@RequestParam String str4, ModelMap map) throws Exception {
		String decodeBase64 = DigestUtil.decodeBase64(str4);
		map.addAttribute("result", decodeBase64);
		return "jsonView";
	}

	@RequestMapping("/util/encodePassword.do")
	public String encodePassword(@RequestParam String str5, @RequestParam String algorithm1, ModelMap map)
			throws Exception {
		String encodePassword = DigestUtil.encodePassword(str5, algorithm1);
		map.addAttribute("result", encodePassword);
		return "jsonView";
	}

	@RequestMapping("/util/numberMain.do")
	public String numberMain() {
		return "util/numberUtil";
	}

	@RequestMapping("/util/getRandomNumber.do")
	public String getRandomNumber(@RequestParam int targetClass, @RequestParam String min, String max, ModelMap map)
			throws Exception {
		Object randomNumber = "";
		switch (targetClass) {
		case 1:
			randomNumber = (Object) NumberUtil.getRandomNumber(Integer.class, Integer.parseInt(min.toString()),
					Integer.parseInt(max.toString()));
			break;
		case 2:
			randomNumber = (Object) NumberUtil.getRandomNumber(Long.class, Long.parseLong(min.toString()),
					Long.parseLong(max.toString()));
			break;
		case 3:
			randomNumber = (Object) NumberUtil.getRandomNumber(Float.class, Float.parseFloat(min.toString()),
					Float.parseFloat(max.toString()));
			break;
		case 4:
			randomNumber = (Object) NumberUtil.getRandomNumber(Double.class, Double.parseDouble(min.toString()),
					Double.parseDouble(max.toString()));
			break;
		}

		map.addAttribute("result", randomNumber);
		return "jsonView";
	}

	@RequestMapping("/util/formatNumberByLocale.do")
	public String formatNumberByLocale(@RequestParam int value, @RequestParam String locale, ModelMap map)
			throws Exception {

		String formatNumberByLocale = NumberUtil.formatNumberByLocale(value, new Locale(locale, "", ""));
		map.addAttribute("result", formatNumberByLocale);
		return "jsonView";
	}

	@RequestMapping("/util/formatNumberByPoint.do")
	public String formatNumberByPoint(@RequestParam int value1, @RequestParam int point, ModelMap map) throws Exception {

		String formatNumberByLocale = NumberUtil.formatNumberByPoint(value1, point);
		map.addAttribute("result", formatNumberByLocale);
		return "jsonView";
	}

	@RequestMapping("/util/isNumber.do")
	public String isNumber(@RequestParam String value2, ModelMap map) throws Exception {

		boolean isNumber = NumberUtil.isNumber(value2);
		map.addAttribute("result", isNumber);
		return "jsonView";
	}

	@RequestMapping("/util/checkNumberType.do")
	public String checkNumberType(@RequestParam String value3, @RequestParam String check, ModelMap map)
			throws Exception {

		boolean checkNumberType = NumberUtil.checkNumberType(value3, check);
		map.addAttribute("result", checkNumberType);
		return "jsonView";
	}

	@RequestMapping("/util/stringMain.do")
	public String stringMain() {
		return "util/stringUtil";
	}

	@RequestMapping("/util/getRandomString.do")
	public String getRandomString(@RequestParam int length, ModelMap map) throws Exception {

		String randomString = StringUtil.getRandomString(length);
		map.addAttribute("result", randomString);
		return "jsonView";
	}

	@RequestMapping("/util/countMatches.do")
	public String countMatches(@RequestParam String str1, String chars1, ModelMap map) throws Exception {

		int count = StringUtil.countMatches(str1, chars1.toCharArray());
		map.addAttribute("result", count);
		return "jsonView";
	}

	@RequestMapping("/util/countMatchesIgnoreCase.do")
	public String countMatchesIgnoreCase(@RequestParam String str2, String str21, ModelMap map) throws Exception {

		int count = StringUtil.countMatchesIgnoreCase(str2, str21);
		
		map.addAttribute("result", count);
		return "jsonView";
	}

	@RequestMapping("/util/getLength.do")
	public String getLength(@RequestParam String str3, ModelMap map) throws Exception {

		int length = StringUtil.getLength(str3);
		map.addAttribute("result", length);
		return "jsonView";
	}

	@RequestMapping("/util/getByteLength.do")
	public String getByteLength(@RequestParam String str4, ModelMap map) throws Exception {

		int byteLength = StringUtil.getByteLength(str4);
		map.addAttribute("result", byteLength);
		return "jsonView";
	}

	@RequestMapping("/util/left.do")
	public String left(@RequestParam String str5, @RequestParam int cutLength, ModelMap map) throws Exception {

		String cutString = StringUtil.left(str5, cutLength);
		map.addAttribute("result", cutString);
		return "jsonView";
	}

	@RequestMapping("/util/leftPad.do")
	public String leftPad(@RequestParam String str6, @RequestParam int size, @RequestParam char padChar, ModelMap map)
			throws Exception {

		String leftPad = StringUtil.leftPad(str6, size, padChar);
		map.addAttribute("result", leftPad);
		return "jsonView";
	}

	@RequestMapping("/util/rightPad.do")
	public String rightPad(@RequestParam String str7, @RequestParam int size1, @RequestParam String padStr, ModelMap map)
			throws Exception {

		String rightPad = StringUtil.rightPad(str7, size1, padStr);
		map.addAttribute("result", rightPad);
		return "jsonView";
	}

	@RequestMapping("/util/convertToCamelCase.do")
	public String convertToCamelCase(@RequestParam String str8, @RequestParam char posChar, ModelMap map)
			throws Exception {

		String camelCase = StringUtil.convertToCamelCase(str8, posChar);
		map.addAttribute("result", camelCase);
		return "jsonView";
	}

	@RequestMapping("/util/convertToUnderScore.do")
	public String convertToUnderScore(@RequestParam String str9, ModelMap map) throws Exception {

		String underScore = StringUtil.convertToUnderScore(str9);
		map.addAttribute("result", underScore);
		return "jsonView";
	}

	@RequestMapping("/util/htmlEscape.do")
	public String htmlEscape(@RequestParam String str10, ModelMap map) throws Exception {

		String replace = StringUtil.htmlEscape(str10);
		map.addAttribute("result", replace);
		return "jsonView";
	}

	@RequestMapping("/util/htmlUnescape.do")
	public String htmlUnescape(@RequestParam String str11, ModelMap map) throws Exception {

		String remove = StringUtil.htmlUnescape(str11);
		map.addAttribute("result", remove);
		return "jsonView";
	}

	@RequestMapping("/util/swapFirstLetterCase.do")
	public String swapFirstLetterCase(@RequestParam String str12, ModelMap map) throws Exception {

		String remove = StringUtil.swapFirstLetterCase(str12);
		map.addAttribute("result", remove);
		return "jsonView";
	}
	
	@RequestMapping("/util/isUserFormat.do")
	public String isUserFormat(@RequestParam String str, @RequestParam String format, ModelMap map) throws Exception {

		boolean isValidUserFormat = StringUtil.isUserFormat(str, format);
		map.addAttribute("result", isValidUserFormat);
		return "jsonView";
	}

	@RequestMapping("/util/isRegexPatternMatch.do")
	public String isRegexPatternMatch(@RequestParam String str1, @RequestParam String pattern, ModelMap map)
			throws Exception {

		boolean isRegexPatternMatch = StringUtil.isRegexPatternMatch(str1, pattern);
		map.addAttribute("result", isRegexPatternMatch);
		return "jsonView";
	}

	@RequestMapping("/util/isPatternMatching.do")
	public String isPatternMatching(@RequestParam String str2, @RequestParam String pattern1, ModelMap map)
			throws Exception {

		boolean isPatternMatching = StringUtil.isPatternMatching(str2, pattern1);
		map.addAttribute("result", isPatternMatching);
		return "jsonView";
	}

	@RequestMapping("/util/isPatternInclude.do")
	public String isPatternInclude(@RequestParam String str3, @RequestParam String pattern2, ModelMap map)
			throws Exception {

		boolean isPatternInclude = StringUtil.isPatternInclude(str3, pattern2);
		map.addAttribute("result", isPatternInclude);
		return "jsonView";
	}

	@RequestMapping("/util/isRegexPatternInclude.do")
	public String isRegexPatternInclude(@RequestParam String str4, @RequestParam String pattern3, ModelMap map)
			throws Exception {

		boolean isRegexPatternInclude = StringUtil.isRegexPatternInclude(str4, pattern3);
		map.addAttribute("result", isRegexPatternInclude);
		return "jsonView";
	}
	
	@RequestMapping("/util/validationMain.do")
	public String validationMain() {
		return "util/validationUtil";
	}

	@RequestMapping("/util/isEmailAddress.do")
	public String isEmailAddress(@RequestParam String email, ModelMap map) throws Exception {

		boolean isVlidEmail = ValidationUtil.isEmailAddress(email);
		map.addAttribute("result", isVlidEmail);
		return "jsonView";
	}
	
	@RequestMapping("/util/threadLocalMain.do")
	public String threadLocalMain() {
		return "util/threadLocalUtil";
	}

	@RequestMapping("/util/utilMovieFinder.do")
	public String movieFinder(@RequestParam String userName, ModelMap map) throws Exception {

		ThreadLocalUtil.add("userName", userName);
		
		List<Movie> result = movieFinder.list();
		
		if(result == null) {
			throw new Exception("Only an admin user can invoke a list of movies. [userName : " + userName + "]");
	
		}else {
			map.addAttribute("movies", result);
		}
		return "jsonView";
	}
}
