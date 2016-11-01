/*
 * Copyright 2002-2008 the original author or authors.
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
package org.anyframe.sample.remoting.movie.jaxws;

import java.util.LinkedHashMap;
import java.util.Map;

import javax.xml.bind.annotation.adapters.XmlAdapter;

public class StringMovieMapAdapter extends
        XmlAdapter<StringMovieMap, Map<String, Movie>> {
    public StringMovieMap marshal(Map<String, Movie> v) throws Exception {
        StringMovieMap map = new StringMovieMap();
        for (Map.Entry<String, Movie> e : v.entrySet()) {
            StringMovieMap.StringMovieEntry iue =
                new StringMovieMap.StringMovieEntry();
            iue.setMovie(e.getValue());
            iue.setMovieId(e.getKey());
            map.getEntries().add(iue);
        }
        return map;
    }

    public Map<String, Movie> unmarshal(StringMovieMap v) throws Exception {
        Map<String, Movie> map = new LinkedHashMap<String, Movie>();
        for (StringMovieMap.StringMovieEntry e : v.getEntries()) {
            map.put(e.getMovieId(), e.getMovie());
        }
        return map;
    }

}
