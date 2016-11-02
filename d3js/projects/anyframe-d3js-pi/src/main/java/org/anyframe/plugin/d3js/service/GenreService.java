package org.anyframe.plugin.d3js.service;

import org.anyframe.plugin.d3js.domain.Genre;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Jeongeun Lee
 * Date: 14. 7. 7
 * Time: 오후 2:17
 * Genre Service Interface Source.
 */
public interface GenreService {
    List<Genre> getList() throws Exception;
}
