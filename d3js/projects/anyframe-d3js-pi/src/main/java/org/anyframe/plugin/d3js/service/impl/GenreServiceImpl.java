package org.anyframe.plugin.d3js.service.impl;

import org.anyframe.plugin.d3js.domain.Genre;
import org.anyframe.plugin.d3js.service.GenreService;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import javax.inject.Named;
import java.util.List;

@Service("d3jsGenreService")
public class GenreServiceImpl implements GenreService {

    @Inject
    @Named("d3jsGenreDao")
    private GenreDao genreDao;

    public List<Genre> getList() throws Exception {
        return genreDao.getList();
    }

}
