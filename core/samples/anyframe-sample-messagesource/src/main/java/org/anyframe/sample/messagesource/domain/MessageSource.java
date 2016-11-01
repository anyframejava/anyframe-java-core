/*
 * Copyright 2008-2012 the original author or authors.
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
package org.anyframe.sample.messagesource.domain;

import java.io.Serializable;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * This MessageSource class is a Value Object class for MessageSource domain.
 * 
 * @author Sujeong Lee
 *
 */
public class MessageSource implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @NotNull
    @Size(min = 1, max = 50)
    private String key = "";
    
    @NotNull
    @Size(min = 1, max = 2)
    private String language = "";
    
    @NotNull
    @Size(min = 1, max = 2)
    private String country = "";
    
    @NotNull
    @Size(min = 1, max = 1000)
    private String text = "";

    public String getKey() {
        return this.key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getLanguage() {
        return this.language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getCountry() {
        return this.country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
    public String getText() {
        return this.text;
    }

    public void setText(String text) {
        this.text = text;
    }

	@Override
	public String toString() {
		return "[text=" + text + ", key=" + key + ", language="
				+ language + ", country=" + country + "]";
	}
    
}
