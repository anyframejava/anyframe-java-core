package ${packageName}.${boardName.toLowerCase()}.service.impl;

import javax.inject.Inject;


import javax.inject.Named;

import org.anyframe.datatype.SearchVO;
import org.anyframe.pagination.Page;

import ${packageName}.${boardName.toLowerCase()}.domain.${BoardName};
import ${packageName}.${boardName.toLowerCase()}.service.${BoardName}Service;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

/**
 * ${boardTitle}의 CRUD 기능을 수행하기 위한 Service implementation 클래스
 */
@Service("${boardName}Service")
@Transactional(rollbackFor = {Exception.class}, propagation = Propagation.REQUIRED)
public class ${BoardName}ServiceImpl implements ${BoardName}Service {
	       
    @Inject
    @Named("${boardName}Dao")
	private ${BoardName}Dao ${boardName}Dao;	
    
    private static String PREFIX_OF_BOARD_ID = "${boardName.toUpperCase()}-";
	
	public void update(${BoardName} ${boardName}) throws Exception {
    	this.${boardName}Dao.update(${boardName});
	}    

#if(${boardInfo.boardType} == 'B')
	@Transactional(readOnly = true)
#end	
  	public ${BoardName} get(String postId, SearchVO searchVO, String flag) throws Exception {
#if(${boardInfo.boardType} == 'L')
  		if ("comment".equals(flag)) {
  			// do not increaseViewCount
  		} else {
  			${boardName}Dao.increaseViewCount(postId);
  		}
#end
		return this.${boardName}Dao.get(postId);
	}
#if(${boardInfo.boardType} == 'L')	  

  	public void batchRemove(String[] postIds) throws Exception {
	    this.${boardName}Dao.batchRemove(postIds);
	}    
#end

  	public void remove(String postId) throws Exception {
    	this.${boardName}Dao.remove(postId);
	}    
    
  	public void create(${BoardName} ${boardName}) throws Exception {
  		//Post ID Setting
  		//TODO : You can change this generating id logic. 
  		//       For example, You can use IdGeneration Service of Anyframe. 
  		//         then, you can choose a way(table based, UUID based, sequence based and so on.) for generate an id. 
  		if(StringUtils.isEmpty(${boardName}.getPostId())){
  			${boardName}.setPostId(PREFIX_OF_BOARD_ID + System.currentTimeMillis());
  		}
    	this.${boardName}Dao.create(${boardName});
	}

	@Transactional(readOnly = true)
	public Page getPagingList(SearchVO searchVO) throws Exception {
		return this.${boardName}Dao.getPagingList(searchVO);
	}              
}
