package org.anyframe.jdbc.support.ext;

import org.anyframe.jdbc.support.impl.DefaultCompleteQueryPostProcessor;

public class ThreadLocalCompleteQueryPostProcessor extends DefaultCompleteQueryPostProcessor {

	@Override
	public void processCompleteQuery(String sql) {
		super.processCompleteQuery(sql);

		if ("Q".equals(SharedInfoHolder.getJobType())) {
			SharedInfoHolder.setExecutedQuery(sql);
			// throw new QueryLogException(sql);
		}
	}

}
