/*
 * Copyright 2002-2008 the original author or authors.
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
package org.anyframe.transaction;

import java.util.Collection;

import org.springframework.transaction.support.TransactionSynchronizationManager;

import anyframe.core.query.IQueryService;
import anyframe.core.query.QueryServiceException;

/**
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class TransactionTestSampleServiceImpl implements
		TransactionTestSampleService {
	IQueryService queryService = null;

	TransactionSynchronizationSample transactionSynchronization = new TransactionSynchronizationSample();

	public void insertData(TransactionVo vo) throws QueryServiceException {
		TransactionSynchronizationManager
				.registerSynchronization(transactionSynchronization);
		if (queryService.find(vo).size() > 0)
			throw new QueryServiceException("Duplicate Data");
		queryService.create(vo);
	}

	public TransactionVo[] listData(TransactionVo vo)
			throws QueryServiceException {
		Collection collection = queryService.find(vo);
		TransactionVo[] rtArray = (TransactionVo[]) collection
				.toArray(new TransactionVo[collection.size()]);
		return rtArray;
	}

	public void removeData(TransactionVo vo) throws QueryServiceException {
		TransactionSynchronizationManager
				.registerSynchronization(transactionSynchronization);
		queryService.remove(vo);
	}

	public void updateData(TransactionVo vo) throws QueryServiceException {
		TransactionSynchronizationManager
				.registerSynchronization(transactionSynchronization);
		queryService.update(vo);
	}

	public void setQueryService(IQueryService queryService) {
		this.queryService = queryService;
	}

	public int getCommitCount() {
		return transactionSynchronization.getCommitCount();
	}

	public int getRollbackCount() {
		return transactionSynchronization.getRollbackCount();
	}

}
