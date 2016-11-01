package org.anyframe.datatype;

/**
 * This SearchVO entity class contains attributes for
 * common searching information and putter,setter
 * methods of them. And it contains toString method for
 * logging.
 * @author Taeho Kim
 */
public class SearchVO implements java.io.Serializable {

    private static final long serialVersionUID = 1L;

    private String searchCondition = "";

    private String searchKeyword = "";

    private int pageIndex = 1;

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

    public int getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(int pageIndex) {
        this.pageIndex = pageIndex;
    }

    public String toString() {
        StringBuilder arguments = new StringBuilder();
        arguments.append(" searchCondition - " + searchCondition + "\n");
        arguments.append(" searchKeyword - " + searchKeyword + "\n");
        arguments.append(" pageIndex - " + pageIndex + "\n");

        return arguments.toString();
    }

}
