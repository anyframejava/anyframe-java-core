package org.anyframe.plugin.mybatis.moviefinder.service.impl;

import java.util.List;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.mybatis.domain.Movie2DVO;
import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

/**
 * @daoType
 * @localName
 * @author
 */

@Repository("movieDao2")
public class MovieDao2 extends SqlSessionDaoSupport {

	private static final MovieDao2 instance = new MovieDao2();

	private MovieDao2() {
	}

	@Value("#{contextProperties['pageSize'] ?: 10}")
	int pageSize;

	@Value("#{contextProperties['pageUnit'] ?: 10}")
	int pageUnit;

	/**
	 * Dao 인스턴스 객체를 리턴한다.
	 * 
	 * @return
	 */
	public static MovieDao2 getInstance() {
		return instance;
	}

	/**
	 * @description
	 * 
	 * @dmlType insert
	 * @return
	 */
	public int insertMovie(final Movie2DVO inputVO) {
		return super
				.getSqlSession()
				.insert("org-anyframe-plugin-mybatis-moviefinder-service-impl-MovieDao2-insertMovie",
						inputVO);
	}

	/**
	 * @description
	 * 
	 * @dmlType update
	 * @return
	 */
	public int updateMovie(final Movie2DVO inputVO) {
		return super
				.getSqlSession()
				.update("org-anyframe-plugin-mybatis-moviefinder-service-impl-MovieDao2-updateMovie",
						inputVO);
	}

	/**
	 * @description
	 * 
	 * @dmlType delete
	 * @return
	 */
	public int deleteMovie(final Movie2DVO inputVO) {
		return super
				.getSqlSession()
				.delete("org-anyframe-plugin-mybatis-moviefinder-service-impl-MovieDao2-deleteMovie",
						inputVO);
	}

	/**
	 * @description
	 * 
	 * @dmlType selectOne
	 * @return
	 */
	public Movie2DVO selectOneMovie(final Movie2DVO inputVO) {
		return super
				.getSqlSession()
				.selectOne(
						"org-anyframe-plugin-mybatis-moviefinder-service-impl-MovieDao2-selectOneMovie",
						inputVO);
	}

	/**
	 * @description
	 * 
	 * @dmlType list
	 * @return
	 */
	public List<Movie2DVO> listMovie(final Movie2DVO inputVO) {
		return super
				.getSqlSession()
				.selectList(
						"org-anyframe-plugin-mybatis-moviefinder-service-impl-MovieDao2-listMovie",
						inputVO);
	}

	/**
	 * @description
	 * 
	 * @dmlType selectOne
	 * @return
	 */
	public Movie2DVO selectCountMovie(final Movie2DVO inputVO) {
		return super
				.getSqlSession()
				.selectOne(
						"org-anyframe-plugin-mybatis-moviefinder-service-impl-MovieDao2-selectCountMovie",
						inputVO);
	}

	/**
	 * @description
	 * 
	 * @dmlType paging
	 * @return
	 */
	public Page pagingMovie(final Movie2DVO inputVO, int pageIndex, int rowCount) {

		List<Movie2DVO> list = super
				.getSqlSession()
				.selectList(
						"org-anyframe-plugin-mybatis-moviefinder-service-impl-MovieDao2-pagingMovie",
						inputVO,
						new RowBounds(pageSize * (pageIndex - 1), pageSize));

		return new Page(list, pageIndex, rowCount, pageUnit, pageSize);
	}
}