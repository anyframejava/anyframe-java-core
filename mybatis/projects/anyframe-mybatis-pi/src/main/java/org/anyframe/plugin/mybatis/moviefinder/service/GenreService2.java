package org.anyframe.plugin.mybatis.moviefinder.service;

import java.util.List;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.mybatis.domain.Genre2DVO;

public interface GenreService2 {

	/**
	 * @description
	 * 
	 * @dmlType insert
	 * @return
	 */
	public abstract int insertGenre(Genre2DVO inputVO) throws Exception;

	/**
	 * @description
	 * 
	 * @dmlType update
	 * @return
	 */
	public abstract int updateGenre(Genre2DVO inputVO) throws Exception;

	/**
	 * @description
	 * 
	 * @dmlType delete
	 * @return
	 */
	public abstract int deleteGenre(Genre2DVO inputVO) throws Exception;

	/**
	 * @description
	 * 
	 * @dmlType selectOne
	 * @return
	 */
	public abstract Genre2DVO selectOneGenre(Genre2DVO inputVO) throws Exception;

	/**
	 * @description
	 * 
	 * @dmlType list
	 * @return
	 */
	public abstract List<Genre2DVO> listGenre(Genre2DVO inputVO) throws Exception;

	/**
	 * @description
	 * 
	 * @dmlType selectOne
	 * @return
	 */
	public abstract Genre2DVO selectCountGenre(Genre2DVO inputVO) throws Exception;

	public abstract Page pagingGenre(Genre2DVO inputVO, int pageIndex,
			int rowCount) throws Exception;

}