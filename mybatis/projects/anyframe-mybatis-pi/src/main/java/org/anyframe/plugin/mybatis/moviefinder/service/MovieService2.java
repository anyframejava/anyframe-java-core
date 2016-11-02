package org.anyframe.plugin.mybatis.moviefinder.service;

import java.util.List;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.mybatis.domain.Movie2DVO;

public interface MovieService2 {

	/**
	 * @description
	 * 
	 * @dmlType insert
	 * @return
	 */
	public abstract int insertMovie(Movie2DVO inputVO) throws Exception;

	/**
	 * @description
	 * 
	 * @dmlType update
	 * @return
	 */
	public abstract int updateMovie(Movie2DVO inputVO) throws Exception;

	/**
	 * @description
	 * 
	 * @dmlType delete
	 * @return
	 */
	public abstract int deleteMovie(Movie2DVO inputVO) throws Exception;

	/**
	 * @description
	 * 
	 * @dmlType selectOne
	 * @return
	 */
	public abstract Movie2DVO selectOneMovie(Movie2DVO inputVO) throws Exception;

	/**
	 * @description
	 * 
	 * @dmlType list
	 * @return
	 */
	public abstract List<Movie2DVO> listMovie(Movie2DVO inputVO) throws Exception;

	
	public abstract Page pagingMovie(Movie2DVO inputVO, int pageIndex, int rowCount) throws Exception;

	/**
	 * @description
	 * 
	 * @dmlType selectOne
	 * @return
	 */
	public abstract Movie2DVO selectCountMovie(Movie2DVO inputVO) throws Exception;

}