package ${packageName}.${boardName.toLowerCase()}.service;

import org.anyframe.pagination.Page;
import org.anyframe.datatype.SearchVO;
import ${packageName}.${boardName.toLowerCase()}.domain.${BoardName};

/**
 * ${boardTitle}의 CRUD 기능을 수행하기 위한 Interface 클래스
 */
public interface ${BoardName}Service{

  	void create(${BoardName} ${boardName}) throws Exception;

#if(${boardInfo.boardType} == 'L')		
	void batchRemove(String[] postIds) throws Exception;
#end

	void remove(String postId) throws Exception;
		
	void update(${BoardName} ${boardName}) throws Exception;
	
  	${BoardName} get(String postId, SearchVO searchVO, String flag) throws Exception;
	
	Page getPagingList(SearchVO searchVO) throws Exception;        
}
