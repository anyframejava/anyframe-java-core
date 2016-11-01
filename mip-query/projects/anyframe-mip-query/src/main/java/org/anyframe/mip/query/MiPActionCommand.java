/*
 * Copyright 2002-2012 the original author or authors.
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
package org.anyframe.mip.query;

import com.tobesoft.platform.data.Dataset;

/**
 * This is an interface class for adding the business
 * logic before/after manipulating the database at
 * MiPQueryService use. Recommand to use
 * IMiPQueryService for manipulating the database in
 * developing the presentation layer using the
 * MiPlatform which is a X-internet solution of the
 * TOBE Software company. When we change the Dataset's
 * value which is MiPlatform's data format, we add the
 * needed logic for implementation class of
 * IMiPActionCommand's class.
 * @author Soyon Lim
 * @author JongHoon Kim
 */
public interface MiPActionCommand {
    /**
     * Before insert, the method for changing the value
     * of Dataset
     * @param dataSet
     *        The Dataset for inserting into the
     *        database
     * @param currentRow
     *        The row number of Dataset to change
     */
    void preInsert(Dataset dataSet, int currentRow);

    /**
     * After insert, the method for changing the value
     * of Dataset
     * @param dataSet
     *        The Dataset for inserting into the
     *        database
     * @param currentRow
     *        The row number of Dataset to change
     */
    void postInsert(Dataset dataSet, int currentRow);

    /**
     * the method for changing the value of Dataset
     * before update
     * @param dataSet
     *        Dataset for updating into database
     * @param currentRow
     *        The row number of Dataset to change
     */
    void preUpdate(Dataset dataSet, int currentRow);

    /**
     * The method for changing the Dataset's value
     * after update
     * @param dataSet
     *        The Dataset for to update in the database
     * @param currentRow
     *        The row number of Dataset to change
     */
    void postUpdate(Dataset dataSet, int currentRow);

    /**
     * the method to change the Dataset's value before
     * delete
     * @param dataSet
     *        The Dataset to delete in the database
     * @param currentRow
     *        The row number of Dataset to change
     */
    void preDelete(Dataset dataSet, int currentRow);

    /**
     * the method to change the Dataset's value after
     * delete
     * @param dataSet
     *        The Dataset to delete in the database
     * @param currentRow
     *        The row number of Dataset to change
     */
    void postDelete(Dataset dataSet, int currentRow);
}
