package org.anyframe.jdbc.support.experiment.factory;

import com.p6spy.engine.common.ConnectionInformation;
import com.p6spy.engine.proxy.Delegate;

public interface ConnectionDelegateFactory {
	
	Delegate prepareStatementDelegate(ConnectionInformation conn);
	
	Delegate createStatementDelegate(ConnectionInformation conn);
	
	Delegate prepareCallDelegate(ConnectionInformation conn);			

}
