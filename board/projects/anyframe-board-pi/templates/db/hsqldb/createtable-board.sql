/*==============================================================*/
/* Table: ${tableName}                                          */
/*==============================================================*/

CREATE TABLE ${tableName}
(
#foreach(${colInfo} in ${allFields})
${colInfo.columnId} ${colInfo.columnType}#if(${colInfo.columnSize}&&${colInfo.columnSize} != '')(${colInfo.columnSize})#end #if(${colInfo.isEssential} == '1')NOT NULL #end#if(${colInfo.columnId} == 'POST_ID')PRIMARY KEY#end#if($foreach.hasNext), #end
#end
);

#if(${boardInfo.useComment} == 'Y')
  /*==============================================================*/
/* Table: POST_COMMENT
 * 게시판의 덧글을 관리하는 테이블
 * 여러개의 게시판을 생성할 경우 아래의 POST_COMMENT 테이블을 공유하여 쓰므로 POST_ID Size에 대해 확인이 필요하며,
 * 아래의 컬럼 정보를 변경할 시 코드 수정이 필요하므로 고치지 않는 것을 권장함.
 */
/*==============================================================*/
CREATE TABLE POST_COMMENT
(
	POST_ID 		VARCHAR(#foreach(${colInfo} in ${allFields})#if(${colInfo.columnId} == 'POST_ID')${colInfo.columnSize}#end#end) 	NOT NULL,
	COMMENT_ID 		VARCHAR(40) 	NOT NULL 	PRIMARY KEY,
	COMMENT_CONTENT VARCHAR(2000),
	CREATE_DTTM 	TIME,
	CREATE_ID 		VARCHAR(20),
	UPDATE_DTTM 	TIME,
	UPDATE_ID 		VARCHAR(20),
);
#end

#if(${boardInfo.useAttachFile} == 'Y')
/*==============================================================*/
/* Table: POST_ATTACH_FILE
 * 게시판의 첨부파일을 관리하는 테이블
 * 여러개의 게시판을 생성할 경우 아래의 POST_ATTACH_FILE 테이블을 공유하여 쓰므로 POST_ID Size에 대해 확인이 필요하며,
 * 아래의 컬럼 정보를 변경할 시 코드 수정이 필요하므로 고치지 않는 것을 권장함.
 */
/*==============================================================*/
create table POST_ATTACH_FILE 
(
   POST_ID              VARCHAR(40)          NOT NULL,
   ATTACH_FILE_ID       VARCHAR(40)          NOT NULL 	PRIMARY KEY,
   ATTACH_FILE_NAME     VARCHAR(100),
   ATTACH_FILE_SIZE     INTEGER,
   ATTACH_FILE_PATH     VARCHAR(300)
);
#end