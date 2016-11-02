package org.anyframe.plugin.d3js.service.impl;

import org.anyframe.plugin.d3js.domain.Genre;
import org.anyframe.query.QueryService;
import org.anyframe.query.dao.QueryServiceDaoSupport;
import org.springframework.stereotype.Repository;

import javax.inject.Inject;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Jeongeun Lee
 * Date: 14. 7. 7
 * Time: 오후 2:19
 * GenreDao Class.
 */
@Repository("d3jsGenreDao")
public class GenreDao  extends QueryServiceDaoSupport {

    @Inject
    public void setQueryService(QueryService queryService) {
        super.setQueryService(queryService);
    }

/*
    public List<Genre> getDropDownGenreList() {
        return super.getQueryService().find("findDropDownJqueryGenreList",
                new Object[] {});
    }

   public List<Genre> getGenreList(MovieSearchVO searchVO) {
        return super.findList("findJqueryGenreList", searchVO);
    }

    public List<String> getGenreNameList(String keyword) {
        return super.getQueryService().find("findGenreName",
                new Object[] { new Object[] { "keyword", keyword } });
    }


    public Genre getGenre(String genreId) {
        Genre genre = new Genre();
        genre.setGenreId(genreId);
        return super.findByPk("findD3jsGenreByPk", genre);
    }
*/
    public List<Genre> getList() {
        return super.findList("findD3jsGenreList", new Object[] {});
    }


}
