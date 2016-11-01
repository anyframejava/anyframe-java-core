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
import java.sql.Date;

/**
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class Reservation implements Serializable {
    private static final long serialVersionUID = 1L;

    private String reserveId;

    private String reserveSsno;

    private String reserveNm;

    private Date reserveDate;

    public Reservation() {
    }

    public Reservation(String reserveId, String reserveSsno, String reserveNm,
            Date reserveDate) {
        this.reserveId = reserveId;
        this.reserveSsno = reserveSsno;
        this.reserveNm = reserveNm;
        this.reserveDate = reserveDate;
    }

    public String getReserveId() {
        return this.reserveId;
    }

    public String getReserveSsno() {
        return this.reserveSsno;
    }

    public String getReserveNm() {
        return this.reserveNm;
    }

    public Date getReserveDate() {
        return this.reserveDate;
    }

    public void setReserveId(String reserveId) {
        this.reserveId = reserveId;
    }

    public void setReserveSsno(String reserveSsno) {
        this.reserveSsno = reserveSsno;
    }

    public void setReserveNm(String reserveNm) {
        this.reserveNm = reserveNm;
    }

    public void setReserveDate(Date reserveDate) {
        this.reserveDate = reserveDate;
    }
}
