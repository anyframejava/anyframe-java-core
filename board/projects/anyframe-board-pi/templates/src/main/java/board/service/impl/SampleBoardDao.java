package ${packageName}.${boardName.toLowerCase()}.service.impl;

#if(${boardInfo.boardType} == 'L')		
import java.util.ArrayList;
import java.util.Arrays;
#end
import java.util.Calendar;

import javax.inject.Inject;

import org.anyframe.datatype.SearchVO;
import org.anyframe.pagination.Page;
import org.anyframe.query.QueryService;
import org.anyframe.query.dao.QueryServiceDaoSupport;
import ${packageName}.${boardName.toLowerCase()}.domain.${BoardName};
import org.anyframe.util.NumberUtil;
import org.anyframe.util.StringUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

/**
 * ${boardTitle}의 CRUD 기능을 수행하기 위한 Dao 클래스
 */
@Repository("${boardName}Dao")
public class ${BoardName}Dao extends QueryServiceDaoSupport {

  	@Value("#{contextProperties['pageSize'] ?: 10}")
	int pageSize;

  	@Value("#{contextProperties['pageUnit'] ?: 10}")
	int pageUnit;
		
	@Inject
	public void setQueryService(QueryService queryService) {
		super.setQueryService(queryService);
	}
	
	public void create(${BoardName} ${boardName}) throws Exception {
		${boardName}.setCreateDttm(Calendar.getInstance().getTime());
		${boardName}.setUpdateDttm(Calendar.getInstance().getTime());
		${boardName}.setUpdateId(${boardName}.getCreateId());
		super.create("create${BoardName}", ${boardName});
	}
	
	public void remove(String postId) throws Exception {
		Object[] toArr = new Object[]{postId};
		super.remove("remove${BoardName}", toArr);
	}
#if(${boardInfo.boardType} == 'L')		

	public void batchRemove(String[] postIds) throws Exception {
		super.batchUpdate("remove${BoardName}", new ArrayList<String>(Arrays.asList(postIds)));
	}
#end

	public void update(${BoardName} ${boardName}) throws Exception {
		${boardName}.setUpdateDttm(Calendar.getInstance().getTime());
		super.update("update${BoardName}", ${boardName});
	}

	public ${BoardName} get(String postId) throws Exception {
		Object[] toArr = new Object[]{postId};
		return super.findByPk("find${BoardName}ByPk", toArr);
	}
	
	public Page getPagingList(SearchVO searchVO) throws Exception {
        int pageIndex = searchVO.getPageIndex();
        String searchCondition = StringUtil.nullToString(searchVO.getSearchCondition());
        String searchKeyword = StringUtil.nullToString(searchVO.getSearchKeyword());
        String isNumeric = NumberUtil.isNumber(searchKeyword) ? "true" : "false";
        
        Object[] args = new Object[4];		            
        args[0] = "condition=" + searchCondition;
        args[1] = "keywordStr=%" + searchKeyword + "%";
        args[2] = "keywordNum=" + searchKeyword + "";
        args[3] = "isNumeric=" + isNumeric;

        return super.findListWithPaging("find${BoardName}List", args, pageIndex, pageSize, pageUnit);
	}
#if(${boardInfo.boardType} == 'L')

	public void increaseViewCount(String postId) {
		Object[] toArr = new Object[]{postId};
		super.update("increase${BoardName}ViewCount", toArr);
	}
#end
}
