package org.anyframe.sample.genericqualifier.moviefinder.service.impl;

import java.util.List;

import javax.sql.DataSource;

import org.anyframe.pagination.Page;
import org.anyframe.sample.genericqualifier.domain.Movie;

public interface GenericDao<T> {

	public void setJdbcDaoDataSource(DataSource dataSource);

	public List<T> getList();

	public Page getPagingList(T t, int pageIndex);

	public void create(T t);

	public void remove(String id);

	public void update(T t);

	public Movie get(String id);

}
