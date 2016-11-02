package org.anyframe.plugin.d3js.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

public class Genre implements Serializable {

    private static final long serialVersionUID = 1L;
    private String genreId;
    private String name;
    private Set<Movie> movies = new HashSet<Movie>(0);

    public String getGenreId() {
        return genreId;
    }

    public void setGenreId(String genreId) {
        this.genreId = genreId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Movie> getMovies() {
        return this.movies;
    }

    public void setMovies(Set<Movie> movies) {
        this.movies = movies;
    }

    @Override
    public String toString() {
        return "[genreId=" + genreId + ", name=" + name + "]";
    }
}