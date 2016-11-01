/*
 * Copyright 2008-2011 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.anyframe.sample.cxf.rest.moviefinder.httpbinding.namingconvention.domain;

import java.util.Collection;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {"movies" })
@XmlRootElement(name = "getMoviesResponse", namespace="http://org.anyframe.sample.cxf.rest.moviefinder.httpbinding.namingconvention.service")
public class GetMoviesResponse {

    @XmlElement(name = "item", required = true)
    private Collection<Movie> movies;

    public Collection<Movie> getMovie() {
        return movies;
    }

    public void setMovie(Collection<Movie> movies) {
        this.movies = movies;
    }

}
