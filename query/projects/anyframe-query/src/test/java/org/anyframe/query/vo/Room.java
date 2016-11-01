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
package org.anyframe.query.vo;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class Room implements Serializable {
    private static final long serialVersionUID = 1L;

    private BigDecimal roomNo = new BigDecimal("0");

    private BigDecimal roomPrice = new BigDecimal("0");

    private BigDecimal roomSize = new BigDecimal("0");

    public Room() {
    }

    public Room(BigDecimal roomNo, BigDecimal roomPrice, BigDecimal roomSize) {
        this.roomNo = roomNo;
        this.roomPrice = roomPrice;
        this.roomSize = roomSize;
    }

    public BigDecimal getRoomNo() {
        return this.roomNo;
    }

    public BigDecimal getRoomPrice() {
        return this.roomPrice;
    }

    public BigDecimal getRoomSize() {
        return this.roomSize;
    }

    public void setRoomNo(BigDecimal roomNo) {
        this.roomNo = roomNo;
    }

    public void setRoomPrice(BigDecimal roomPrice) {
        this.roomPrice = roomPrice;
    }

    public void setRoomSize(BigDecimal roomSize) {
        this.roomSize = roomSize;
    }
}
