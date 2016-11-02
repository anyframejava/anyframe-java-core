package org.anyframe.plugin.mybatis.moviefinder.service.impl;

import java.util.List;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.mybatis.domain.Genre2DVO;
import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

/**
 * @daoType
 * @localName
 * @author
 */

@Repository("genreDao2")
public class GenreDao2 extends SqlSessionDaoSupport {

	private static final GenreDao2 instance = new GenreDao2();

	private GenreDao2() {
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
	public static GenreDao2 getInstance() {
		return instance;
	}

	/**
	 * @description
	 * 
	 * @dmlType insert
	 * @return
	 */
	public int insertGenre(final Genre2DVO inputVO) {
		return super
				.getSqlSession()
				.insert("org-anyframe-plugin-mybatis-moviefinder-service-impl-GenreDao2-insertGenre",
						inputVO);
	}

	/**
	 * @description
	 * 
	 * @dmlType update
	 * @return
	 */
	public int updateGenre(final Genre2DVO inputVO) {
		return super
				.getSqlSession()
				.update("org-anyframe-plugin-mybatis-moviefinder-service-impl-GenreDao2-updateGenre",
						inputVO);
	}

	/**
	 * @description
	 * 
	 * @dmlType delete
	 * @return
	 */
	public int deleteGenre(final Genre2DVO inputVO) {
		return super
				.getSqlSession()
				.delete("org-anyframe-plugin-mybatis-moviefinder-service-impl-GenreDao2-deleteGenre",
						inputVO);
	}

	/**
	 * @description
	 * 
	 * @dmlType selectOne
	 * @return
	 */
	public Genre2DVO selectOneGenre(final Genre2DVO inputVO) {
		return super
				.getSqlSession()
				.selectOne(
						"org-anyframe-plugin-mybatis-moviefinder-service-impl-GenreDao2-selectOneGenre",
						inputVO);
	}

	/**
	 * @description
	 * 
	 * @dmlType list
	 * @return
	 */
	public List<Genre2DVO> listGenre(final Genre2DVO inputVO) {
		return super
				.getSqlSession()
				.selectList(
						"org-anyframe-plugin-mybatis-moviefinder-service-impl-GenreDao2-listGenre",
						inputVO);
	}

	/**
	 * @description
	 * 
	 * @dmlType selectOne
	 * @return
	 */
	public Genre2DVO selectCountGenre(final Genre2DVO inputVO) {
		return super
				.getSqlSession()
				.selectOne(
						"org-anyframe-plugin-mybatis-moviefinder-service-impl-GenreDao2-selectCountGenre",
						inputVO);
	}

	/**
	 * @description
	 * 
	 * @dmlType paging
	 * @return
	 */
	public Page pagingGenre(final Genre2DVO inputVO, int pageIndex, int rowCount) {

		List<Genre2DVO> list = super
				.getSqlSession()
				.selectList(
						"org-anyframe-plugin-mybatis-moviefinder-service-impl-GenreDao2-pagingGenre",
						inputVO,
						new RowBounds(pageSize * (pageIndex - 1), pageSize));

		return new Page(list, pageIndex, rowCount, pageUnit, pageSize);
	}
}