package ${packageName}.${boardName.toLowerCase()}.domain;

import java.io.Serializable;

import java.util.Date;

/**
 * ${boardTitle}내의 게시물 정보를 가지고 있는 Domain 객체
 */
public class ${BoardName} implements Serializable {
	
    private static final long serialVersionUID = 1L;

#if(${boardInfo.useComment} == "Y")
	private Integer commentCount = 0;

#end
#foreach($colInfo in $allFields)
#if(${colInfo.columnType} == 'DATE' || ${colInfo.columnType} == 'TIME')
	private Date ${colInfo.fieldId};
	
#elseif(${colInfo.columnType} == 'INTEGER' || ${colInfo.columnType} == 'NUMBER')
	private Integer ${colInfo.fieldId} = 0;
	
#else
	private String ${colInfo.fieldId};
	
#end#end
#if(${boardInfo.useComment} == "Y")
	public Integer getCommentCount(){
		return this.commentCount;
	}
	
	public void setCommentCount(Integer commentCount){
		this.commentCount = commentCount;
	}
#end
#foreach($colInfo in $allFields)
#if(${colInfo.columnType} == 'TIME' || ${colInfo.columnType} == 'DATE')
	
	public Date get${display.capitalize(${colInfo.fieldId})}(){
		return this.${colInfo.fieldId};
	}

	public void set${display.capitalize(${colInfo.fieldId})}(Date ${colInfo.fieldId}){
		this.${colInfo.fieldId} = ${colInfo.fieldId};
	}
#elseif(${colInfo.columnType} == 'INTEGER' || ${colInfo.columnType} == 'NUMBER')

	public Integer get${display.capitalize(${colInfo.fieldId})}(){
		return this.${colInfo.fieldId};
	}

	public void set${display.capitalize(${colInfo.fieldId})}(Integer ${colInfo.fieldId}){
		this.${colInfo.fieldId} = ${colInfo.fieldId};
	}
#else
	
	public String get${display.capitalize(${colInfo.fieldId})}(){
		return this.${colInfo.fieldId};
	}

	public void set${display.capitalize(${colInfo.fieldId})}(String ${colInfo.fieldId}){
		this.${colInfo.fieldId} = ${colInfo.fieldId};
	}
#end
#end

    public String toString() {
        StringBuffer sb = new StringBuffer(getClass().getSimpleName());
        sb.append(" [");
#if(${boardInfo.useComment} == "Y")
        sb.append("commentCount = ").append(getCommentCount()).append("', ");
#end
#foreach($colInfo in $allFields)
        sb.append("${colInfo.fieldId}").append("='").append(get${display.capitalize(${colInfo.fieldId})}())#if($foreach.hasNext).append("', ")#end;
#end
        sb.append("]");
        return sb.toString();
    }
}
