package org.anyframe.sample.resolver;

import org.springframework.test.context.ActiveProfilesResolver;

public class MovieActiveProfileResolver implements ActiveProfilesResolver{

	@Override
	public String[] resolve(Class<?> testClass) {
		String profile = null;
		
		if(testClass.getName().contains("Dev")){
			profile = "Dev";
		}else if (testClass.getName().contains("Prod")){
			profile = "Prod";
		}
		
        return new String[] {profile};
	}

}
