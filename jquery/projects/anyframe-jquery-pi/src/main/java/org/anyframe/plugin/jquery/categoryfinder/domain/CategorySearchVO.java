package org.anyframe.plugin.jquery.categoryfinder.domain;


import javax.validation.constraints.Size;
import java.io.Serializable;


/**
 * Created with IntelliJ IDEA.
 * User: Jeongeun Lee
 * Date: 13. 7. 30
 * Time: 오후 7:27
 * To change this template use File | Settings | File Templates.
 */


public class CategorySearchVO implements Serializable {

    @Size(min = 1, max = 100)
    private String searchCondition;

    @Size(min = 1, max = 100)
    private String searchKeyword;

    private String sord;

    private String sidx;

    private int page = 1;

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public String getSearchCondition() {
        return searchCondition;
    }

    public void setSearchCondition(String searchCondition) {
        this.searchCondition = searchCondition;
    }


    public String getSearchKeyword() {
        return searchKeyword;
    }

    public void setSearchKeyword(String searchKeyword) {
        this.searchKeyword = searchKeyword;
    }

    public String getSord() {
        return sord;
    }

    public void setSord(String sord) {
        this.sord = sord;
    }

    public String getSidx() {
        return sidx;
    }

    public void setSidx(String sidx) {
        this.sidx = sidx;
    }
}
