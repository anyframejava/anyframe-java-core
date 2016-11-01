package org.anyframe.sample.hibernate.model.datatype;

public class TimeDateType {
	private int id;
	private java.sql.Date dateType;
	private java.sql.Time timeType;
	private java.sql.Timestamp timestampType;
	private java.util.Calendar calendarType;
	private java.util.Calendar calendarDateType;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public java.sql.Date getDateType() {
		return dateType;
	}

	public void setDateType(java.sql.Date dateType) {
		this.dateType = dateType;
	}

	public java.sql.Time getTimeType() {
		return timeType;
	}

	public void setTimeType(java.sql.Time timeType) {
		this.timeType = timeType;
	}

	public java.sql.Timestamp getTimestampType() {
		return timestampType;
	}

	public void setTimestampType(java.sql.Timestamp timestampType) {
		this.timestampType = timestampType;
	}

	public java.util.Calendar getCalendarType() {
		return calendarType;
	}

	public void setCalendarType(java.util.Calendar calendarType) {
		this.calendarType = calendarType;
	}

	public java.util.Calendar getCalendarDateType() {
		return calendarDateType;
	}

	public void setCalendarDateType(java.util.Calendar calendarDateType) {
		this.calendarDateType = calendarDateType;
	}
}
