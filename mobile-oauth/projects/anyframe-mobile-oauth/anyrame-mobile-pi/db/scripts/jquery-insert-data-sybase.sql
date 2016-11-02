CREATE SEQUENCE JQUERY_CATEGORY_ID_SEQ START WITH 1101;
CREATE SEQUENCE JQUERY_COMMUNITY_ID_SEQ START WITH 1101;
CREATE SEQUENCE JQUERY_POST_ID_SEQ START WITH 1101;
CREATE SEQUENCE JQUERY_USER_ID_SEQ START WITH 1101;
CREATE SEQUENCE JQUERY_FILE_ID_SEQ START WITH 1101;

CREATE TABLE JQUERY_GENRE(
	GENRE_ID VARCHAR(16) NOT NULL,
	NAME VARCHAR(50) NOT NULL,
	CONSTRAINT PK_JQUERY_GENRE PRIMARY KEY(GENRE_ID));

CREATE TABLE JQUERY_MOVIE(
	MOVIE_ID VARCHAR(16) NOT NULL,
	GENRE_ID VARCHAR(16) NOT NULL,
	TITLE VARCHAR(50) NOT NULL,
	DIRECTOR VARCHAR(50) NOT NULL,
	ACTORS VARCHAR(100) NOT NULL,
	RUNTIME NUMERIC(3) NULL,
	RELEASE_DATE DATE default GETDATE() NULL,
	TICKET_PRICE NUMERIC(6,2) NULL,
	FILE_PATH VARCHAR(1000) NULL,
	REAL_FILE_NAME VARCHAR(1000) NULL,
	NOW_PLAYING CHAR(1) NULL,
	CONSTRAINT PK_JQUERY_MOVIE PRIMARY KEY(MOVIE_ID),
	CONSTRAINT FK_JQUERY_MOVIE FOREIGN KEY(GENRE_ID) REFERENCES JQUERY_GENRE(GENRE_ID));

CREATE TABLE JQUERY_IDS(
	TABLE_NAME VARCHAR(16) NOT NULL PRIMARY KEY,
	NEXT_ID DECIMAL(30) NOT NULL);
	
CREATE TABLE JQUERY_CATEGORY
(
   CATEGORY_ID      VARCHAR(16) NOT NULL,
   CATEGORY_NAME    VARCHAR(150) NOT NULL,
   CATEGORY_DESC    VARCHAR(300) NULL,
   REG_DATE         TIMESTAMP NULL,
   CONSTRAINT PK_JQUERY_CATEGORY PRIMARY KEY (CATEGORY_ID));

CREATE TABLE JQUERY_COMMUNITY(
   COMMUNITY_ID     VARCHAR(16) NOT NULL,
   COMMUNITY_NAME   VARCHAR(150) NOT NULL,
   COMMUNITY_DESC   VARCHAR(300) NULL,
   CATEGORY_ID      VARCHAR(16) NULL,
   REG_ID           VARCHAR(20) NULL,
   REG_DATE         TIMESTAMP NULL,
   CONSTRAINT PK_JQUERY_COMMUNITY PRIMARY KEY (COMMUNITY_ID),
   CONSTRAINT FK_JQUERY_CATEGORY FOREIGN KEY(CATEGORY_ID) REFERENCES JQUERY_CATEGORY(CATEGORY_ID));


CREATE TABLE JQUERY_BOARD(
   POST_ID          VARCHAR(16) NOT NULL,
   TITLE            VARCHAR(150) NOT NULL,
   CONTENTS         VARCHAR(360) NULL,
   REG_ID           VARCHAR(20) NULL,
   REG_DATE         TIMESTAMP NULL,
   COMMUNITY_ID     VARCHAR(16) NOT NULL,
   CONSTRAINT PK_JQUERY_BOARD PRIMARY KEY (POST_ID),
   CONSTRAINT FK_JQUERY_COMMUNITY FOREIGN KEY(COMMUNITY_ID) REFERENCES JQUERY_COMMUNITY(COMMUNITY_ID));

CREATE TABLE JQUERY_DEPT(
   DEPT_ID          VARCHAR(16) NOT NULL,
   DEPT_NAME        VARCHAR(60) NOT NULL,
   DEPT_LEVEL       VARCHAR(1) NULL,
   DEPT_DESC        VARCHAR(300) NULL,
   PARENT_DEPT      VARCHAR(16) NULL,
   CONSTRAINT PK_JQUERY_DEPT PRIMARY KEY (DEPT_ID));
 
CREATE TABLE JQUERY_USER(
   USER_NAME        VARCHAR(20) NOT NULL,
   EN_NAME          VARCHAR(20) NULL,
   COMP_PHONE       VARCHAR(20) NULL,
   PHONE            VARCHAR(20) NULL,
   CELL_PHONE       VARCHAR(20) NULL,
   COMPANY          VARCHAR(60) NULL,
   JOB_POSITION     VARCHAR(60) NULL,
   ASSIGNMENT       VARCHAR(60) NULL,
   OFFICER_YN       VARCHAR(1) NULL,
   FAX              VARCHAR(20) NULL,
   ZIP_CODE         VARCHAR(10) NULL,
   ADDRESS          VARCHAR(300) NULL,
   COMP_ZIP_CODE    VARCHAR(10) NULL,
   COMP_ADDRESS     VARCHAR(300) NULL,
   EMAIL            VARCHAR(30) NULL,
   USER_ID          VARCHAR(16) NOT NULL,
   DEPT_ID          VARCHAR(16) NOT NULL,
   PASSWORD         VARCHAR(16) NOT NULL,
   FIRST_HALF_VOLUNTEER_WORK 	VARCHAR(5) NULL,
   SECOND_HALF_VOLUNTEER_WORK	VARCHAR(5) NULL, 
   CONSTRAINT PK_JQUERY_USER PRIMARY KEY (USER_ID),
   CONSTRAINT FK_JQUERY_DEPT FOREIGN KEY(DEPT_ID) REFERENCES JQUERY_DEPT(DEPT_ID));
	
INSERT INTO JQUERY_GENRE VALUES('GR-01','Action');
INSERT INTO JQUERY_GENRE VALUES('GR-02','Adventure');
INSERT INTO JQUERY_GENRE VALUES('GR-03','Animation');
INSERT INTO JQUERY_GENRE VALUES('GR-04','Comedy');
INSERT INTO JQUERY_GENRE VALUES('GR-05','Crime');
INSERT INTO JQUERY_GENRE VALUES('GR-06','Drama');
INSERT INTO JQUERY_GENRE VALUES('GR-07','Fantasy');
INSERT INTO JQUERY_GENRE VALUES('GR-08','Romance');
INSERT INTO JQUERY_GENRE VALUES('GR-09','Sci-Fi');
INSERT INTO JQUERY_GENRE VALUES('GR-10','Thriller');

INSERT INTO JQUERY_MOVIE VALUES('MV-00001','GR-02','Alice in Wonderland','Tim Burton','Johnny Depp',110,'2010-03-04',8000,'/sample/images/posters/aliceinwonderland.jpg','aliceinwonderland.jpg','Y');
INSERT INTO JQUERY_MOVIE VALUES('MV-00002','GR-09','Avatar','James Cameron','Sigourney Weaver',100,'2010-12-16',7000,'/sample/images/posters/avatar.jpg','avatar.jpg','Y');
INSERT INTO JQUERY_MOVIE VALUES('MV-00003','GR-01','Green Zone','Paul Greengrass','Yigal Naor',90,'2010-03-25',7000,'/sample/images/posters/greenzone.jpg','greenzone.jpg','Y');
INSERT INTO JQUERY_MOVIE VALUES('MV-00004','GR-06','Remember Me','Allen Coulter','Caitlyn Rund',115,'2010-03-12',8000,'/sample/images/posters/rememberme.jpg','rememberme.jpg','Y');
INSERT INTO JQUERY_MOVIE VALUES('MV-00005','GR-04','She is Out of My League','Jim Field Smith','Jay Baruchel',118,'2010-03-12',7500,'/sample/images/posters/shesoutof.jpg','shesoutof.jpg','Y');
INSERT INTO JQUERY_MOVIE VALUES('MV-00006','GR-05','Shutter Island','Martin Scorsese','Leonardo DiCaprio',95,'2010-03-18',8000,'/sample/images/posters/shutterisland.jpg','shutterisland.jpg','Y');

INSERT INTO JQUERY_IDS VALUES('JQUERY_MOVIE',7);

INSERT INTO JQUERY_CATEGORY VALUES ('CATEGORY-0001', '컴퓨터', '컴퓨터에 관련된 커뮤니티들이 모여있습니다.', '2009-06-23 12:00:01');
INSERT INTO JQUERY_CATEGORY VALUES ('CATEGORY-0002', '자동차', '자동차에 관련된 커뮤니티들이 모여 있습니다.', '2009-06-23 12:00:02');
INSERT INTO JQUERY_CATEGORY VALUES ('CATEGORY-0003', '스포츠', '스포츠에 관련된 커뮤니티들이 모여 있습니다.', '2009-06-23 12:00:03');
INSERT INTO JQUERY_CATEGORY VALUES ('CATEGORY-0004', '친목', '친목에 관련된 커뮤니티들이 모여 있습니다.', '2009-06-23 12:00:04');
INSERT INTO JQUERY_CATEGORY VALUES ('CATEGORY-0005', '취미', '취미에 관련된 커뮤니티들이 모여 있습니다.', '2009-06-23 12:00:05');
INSERT INTO JQUERY_CATEGORY VALUES ('CATEGORY-0006', '봉사', '봉사에 관련된 커뮤니티들이 모여 있습니다.', '2009-06-23 12:00:06');
INSERT INTO JQUERY_CATEGORY VALUES ('CATEGORY-1009', '놀이', '놀이에 관련된 커뮤니티들이 모여 있습니다.', '2009-09-25 3:59:37');

INSERT INTO JQUERY_COMMUNITY VALUES ('COMMUNITY-0001', 'JAVA 개발정보 나누기', 'JAVA 개발자들이 모여 정보를 공유하는 커뮤니티입니다.', 'CATEGORY-0001', 'hong80', '2009-06-23 12:00:01');
INSERT INTO JQUERY_COMMUNITY VALUES ('COMMUNITY-0002', 'THE PRACTICAL SQL', 'SQL 학습을 위한 커뮤니티입니다.', 'CATEGORY-0001', 'bowman', '2009-06-23 12:00:02');
INSERT INTO JQUERY_COMMUNITY VALUES ('COMMUNITY-0003', 'HTML CSS 자바스크립트', 'HTML CSS  자바스크립트 개발을 위한 커뮤니티입니다.', 'CATEGORY-0001', 'subman', '2009-06-23 12:00:03');
INSERT INTO JQUERY_COMMUNITY VALUES ('COMMUNITY-0004', 'FLEX 쉽게 배워보기', 'FLEX개발과 실무에 대한 의견을 나누는 커뮤니티입니다.', 'CATEGORY-0001', 'zoon73', '2009-06-23 12:00:04');
INSERT INTO JQUERY_COMMUNITY VALUES ('COMMUNITY-0005', 'Spring Framework 사용자 모임', 'Spring Framework 사용자 모임입니다.', 'CATEGORY-0001', 'howrock', '2009-06-23 12:00:05');
INSERT INTO JQUERY_COMMUNITY VALUES ('COMMUNITY-0006', 'SM3 같이 타요', 'SM3 차량 정보를 공유하고 친목을 동호하기 위한 커뮤니티입니다.', 'CATEGORY-0002', 'minminmin', '2009-06-23 12:00:06');
INSERT INTO JQUERY_COMMUNITY VALUES ('COMMUNITY-0007', '중고차 비싸게 팔고 싸게 사기', '중고차 매매 정보를 공유하는 커뮤니티입니다.', 'CATEGORY-0002', 'urobba', '2009-06-23 12:00:07');
INSERT INTO JQUERY_COMMUNITY VALUES ('COMMUNITY-0008', '자동차 보험에 대한 모든 것', '자동차 보험에 대한 모든 정보가 있습니다.', 'CATEGORY-0002', 'whatsub', '2009-06-23 12:00:08');
INSERT INTO JQUERY_COMMUNITY VALUES ('COMMUNITY-0009', '혼자서 자동차 고치지', '자동차 정비 관련 정보를 나눠요.', 'CATEGORY-0002', 'bigblue', '2009-06-23 12:00:09');
INSERT INTO JQUERY_COMMUNITY VALUES ('COMMUNITY-0010', '어느 주유소에서 기름 넣으세요?', '전국 주유소 기름값 정보를 공유 할 수 있습니다.', 'CATEGORY-0002', 'babopack', '2009-06-23 12:00:10');
INSERT INTO JQUERY_COMMUNITY VALUES ('COMMUNITY-0011', '자동차 함께 타기', '고유가 시대에 카풀을 원하시는 분들을 위한 모임입니다.', 'CATEGORY-0002', 'eugene', '2009-06-23 12:00:11');
INSERT INTO JQUERY_COMMUNITY VALUES ('COMMUNITY-0012', '컴퓨터 만들기', '컴퓨터 조립해서 써요~', 'CATEGORY-0001', 'hong80', '2009-08-05 12:00:01');
INSERT INTO JQUERY_COMMUNITY VALUES ('COMMUNITY-0013', 'MLB 매니아', 'MLB 매니아', 'CATEGORY-0003', 'test', '2009-08-06 12:00:01');
INSERT INTO JQUERY_COMMUNITY VALUES ('COMMUNITY-0014', '탄천 환경 정화', '탄천을 깨끗하게', 'CATEGORY-0006', 'test', '2009-08-06 12:00:02');
INSERT INTO JQUERY_COMMUNITY VALUES ('COMMUNITY-0015', '농활', '농촌 봉사활동', 'CATEGORY-0006', 'test', '2009-08-21 12:00:01');
INSERT INTO JQUERY_COMMUNITY VALUES ('COMMUNITY-0017', 'K리그 봐요', 'K리그에 관심이 있는 분들이면 누구나 환영합니다.', 'CATEGORY-0003', 'test', '2009-08-06 12:00:03');
INSERT INTO JQUERY_COMMUNITY VALUES ('COMMUNITY-0018', '동기모임', '동기야 반갑다.', 'CATEGORY-0004', 'hong80', '2009-08-06 12:00:13');
INSERT INTO JQUERY_COMMUNITY VALUES ('COMMUNITY-0019', '컴퓨터 도우미', '컴퓨터 공부를 도와드립니다.', 'CATEGORY-0006', 'test', '2009-08-21 12:00:29');
INSERT INTO JQUERY_COMMUNITY VALUES ('COMMUNITY-0020', '목공 나들이', '책상을 내손으로 만들어 쓸 수 있습니다.', 'CATEGORY-0005', 'test', '2009-08-21 12:00:30');
INSERT INTO JQUERY_COMMUNITY VALUES ('COMMUNITY-1003', '온갖 놀이', '알고 있는 모든 놀이를 다 해봅시다.', 'CATEGORY-1009', 'test', '2009-09-25 4:22:07');
INSERT INTO JQUERY_COMMUNITY VALUES ('COMMUNITY-1009', '레몬테라스', '내집을 잡지에 나오는 집처럼 예쁘게 꾸밀 수 있습니다.', 'CATEGORY-0005', 'test', '2009-09-26 1:26:20');
INSERT INTO JQUERY_COMMUNITY VALUES ('COMMUNITY-1010', '엑스포 자원봉사', '엑스포 자원봉사', 'CATEGORY-0006', 'test', '2009-09-26 1:26:20');
INSERT INTO JQUERY_COMMUNITY VALUES ('COMMUNITY-1017', '복지관 청소', '복지관 청소', 'CATEGORY-0006', 'test', '2009-09-26 2:47:21');
INSERT INTO JQUERY_COMMUNITY VALUES ('COMMUNITY-1019', '연원조기축구', '연원조기축구', 'CATEGORY-0003', 'test', '2009-09-26 2:49:32');

INSERT INTO JQUERY_DEPT VALUES ('DEPT-0001', '영업그룹', '0', '영업그룹입니다.', '');
INSERT INTO JQUERY_DEPT VALUES ('DEPT-0002', '국내영업팀', '1', '국내영업팀입니다.', 'DEPT-0001');
INSERT INTO JQUERY_DEPT VALUES ('DEPT-0003', '국내영업파트', '2', '국내영업파트입니다.', 'DEPT-0002');
INSERT INTO JQUERY_DEPT VALUES ('DEPT-0004', '해외영업팀', '1', '해외영업팀입니다.', 'DEPT-0001');
INSERT INTO JQUERY_DEPT VALUES ('DEPT-0005', '유럽총괄파트', '2', '유럽총괄파트입니다.', 'DEPT-0004');
INSERT INTO JQUERY_DEPT VALUES ('DEPT-0006', '아시아총괄파트', '2', '아시아총괄파트입니다.', 'DEPT-0004');
INSERT INTO JQUERY_DEPT VALUES ('DEPT-0007', '개발그룹', '0', '개발그룹입니다.', '');
INSERT INTO JQUERY_DEPT VALUES ('DEPT-0008', '디자인개발팀', '1', '디자인개발팀입니다.', 'DEPT-0007');
INSERT INTO JQUERY_DEPT VALUES ('DEPT-0009', '디자인개발파트', '2', '디자인개발파트입니다.', 'DEPT-0008');
INSERT INTO JQUERY_DEPT VALUES ('DEPT-0010', '제품개발팀', '1', '제품개발팀입니다.', 'DEPT-0007');
INSERT INTO JQUERY_DEPT VALUES ('DEPT-0011', '개발파트', '2', '개발파트입니다.', 'DEPT-0010');
INSERT INTO JQUERY_DEPT VALUES ('DEPT-0012', '품질관리파트', '2', '품질관리파트입니다.', 'DEPT-0010');
INSERT INTO JQUERY_DEPT VALUES ('DEPT-0013', 'RnD그룹', '0', 'RnD그룹입니다.', '');
INSERT INTO JQUERY_DEPT VALUES ('DEPT-0014', 'RnD팀', '1', 'RnD팀입니다.', 'DEPT-0013');
INSERT INTO JQUERY_DEPT VALUES ('DEPT-0015', '신기술개발파트', '2', '신기술개발파트입니다.', 'DEPT-0014');
INSERT INTO JQUERY_DEPT VALUES ('DEPT-0016', '기술혁신파트', '2', '기술혁신파트입니다.', 'DEPT-0014');
INSERT INTO JQUERY_DEPT VALUES ('DEPT-0017', '총무그룹', '0', '총무그룹입니다.', '');
INSERT INTO JQUERY_DEPT VALUES ('DEPT-0018', '사업관리팀', '1', '사업관리팀입니다.', 'DEPT-0017');
INSERT INTO JQUERY_DEPT VALUES ('DEPT-0019', '전략사업파트', '2', '전략사업파트입니다.', 'DEPT-0018');
INSERT INTO JQUERY_DEPT VALUES ('DEPT-0020', '지원팀', '1', '지원팀입니다.', 'DEPT-0017');
INSERT INTO JQUERY_DEPT VALUES ('DEPT-0021', '경리파트', '2', '경리파트입니다.', 'DEPT-0020');
INSERT INTO JQUERY_DEPT VALUES ('DEPT-0022', '인사그룹', '0', '인사그룹입니다.', '');
INSERT INTO JQUERY_DEPT VALUES ('DEPT-0023', '인사운영팀', '1', '인사운영팀입니다.', 'DEPT-0022');
INSERT INTO JQUERY_DEPT VALUES ('DEPT-0024', '외부운영파트', '2', '외부운영파트입니다.', 'DEPT-0023');
INSERT INTO JQUERY_DEPT VALUES ('DEPT-0025', '파트너운영팀', '1', '파트너운영팀입니다.', 'DEPT-0022');
INSERT INTO JQUERY_DEPT VALUES ('DEPT-0026', '파트너관리파트', '2', '파트너관리파트입니다.', 'DEPT-0025');
INSERT INTO JQUERY_DEPT VALUES ('DEPT-0027', '파트너지원파트', '2', '파트너지원파트입니다.', 'DEPT-0025');

INSERT INTO JQUERY_USER VALUES ('김철수', 'Kim Chulsoo', '02-242-1231', '02-443-1231', '010-234-1231', '삼성SDS', '사원', '개발', 'Y', '02-533-5353', '223232', '성남시 분당구', '432221', '경기도 구리시', 'chulsoo@samsung.com', 'chulsoo', 'DEPT-0008', 'test123', '5', '10');
INSERT INTO JQUERY_USER VALUES ('윤동남', 'Yoon Dongnam', '02-242-1231', '02-443-1231', '010-234-1231', '삼성SDS', '차장', '개발', 'N', '02-533-5353', '442742', '성남시 분당구', '432221', '인천시 부평구', 'dongnam@samsung.com', 'dongnam', 'DEPT-0007', 'test123', '0', '0');
INSERT INTO JQUERY_USER VALUES ('홍길동', 'Hong Gildong', '02-6456-1223', '02-7484-0912', '010-9911-0033', '삼성SDS', '책임', '어플리케이션개발', 'N', '02-6481-0091', '463180', '경기도 성남시 분당구 구미동', '463810', '경기도 성남시 분당구', 'gildong@naver.com', 'hong80', 'DEPT-0007', 'test123', '7', '3');
INSERT INTO JQUERY_USER VALUES ('김광현', 'hwj', '02-123-1234', '02-1234-1234', '010-1234-1235', '삼성SDS', '사원', '개발', 'N', '02-6481-0091', '442742', '성남시 분당구', '463810', '경기도 성남시 분당구', 'kwanghyun@samsung.com', 'kkw', 'DEPT-0003', 'test123', '12', '10');
INSERT INTO JQUERY_USER VALUES ('김순이', 'Kim Sooni', '02-242-2323', '02-443-4343', '010-234-2323', '삼성SDS', '부장', '인사', 'Y', '02-533-5353', '424432', '서울시 역삼동', '432222', '강원도 삼척시', 'sooni@samsung.com', 'sooni', 'DEPT-0010', 'test123', '8', '20');
INSERT INTO JQUERY_USER VALUES ('테스터', 'test', '02-123-1234', '02-1234-1234', '010-1234-1234', '삼성SDS', '대리', '연구개발', 'N', '031-1234-1234', '424432', '서울시 역삼동', '123456', '경기도 성남시 분당구', 'test@samsung.com', 'test', 'DEPT-0003', 'test123', '3', '9');
INSERT INTO JQUERY_USER VALUES ('이영미', 'Lee Youngmi', '02-242-2222', '02-233-2222', '010-1334-2222', '삼성SDS', '대리', '영업', 'N', '02-533-2222', '424432', '서울시 역삼동', '432222', '충청남도 서산시', 'yongmi@samsung.com', 'yongmi', 'DEPT-0009', 'test123', '0', '12');
INSERT INTO JQUERY_USER VALUES ('김유나', 'yoona', '123-123-1234', '123-123-1234', '123-123-1234', '삼성SDS', '사원', '영업', 'N', '031-455-4553', '463810', '경기도 성남시 분당구 구미동', '432222', '충청남도 서산시', 'yoona@samsung.com', 'yoona', 'DEPT-0013', 'test123', '10', '2');
INSERT INTO JQUERY_USER VALUES ('이유리', 'Lee Yuli', '02-242-1231', '041-529-5294', '010-529-5294', '삼성SDS', '사원', '영업', 'N', '041-529-5294', '336882', '충남 아산시 음봉면', '330300', '충남 천안시 성성동', 'yuli.lee@anyframe.org', 'yuli', 'DEPT-0001', 'test123', '2', '10');
INSERT INTO JQUERY_USER VALUES ('이경진', 'Lee Kyungjiin', '02-242-1231', '02-123-4567', '010-123-4567', '삼성SDS', '사원', '영업', 'N', '031-455-4553', '156886', '서울 영등포구 여의도동  36-1', '435040', '경기 군포시 산본동', 'kyungjiin.lee@anyframe.org', 'kyungjiin', 'DEPT-0001', 'test123', '20', '4');
INSERT INTO JQUERY_USER VALUES ('김성수', 'Kim Sungsoo', '02-242-1231', '010-9388-9999', '010-9388-9999', '삼성SDS', '대리', '기획_운영 파트', 'N', '031-455-4553', '503060', '503-060 광주 남구 봉선동', '506253', '광주 광산구 오선동 ', 'soungsoo.kim@anyframe.org', 'soungsoo', 'DEPT-0004', 'test123', '4', '6');
INSERT INTO JQUERY_USER VALUES ('박정수', 'Park J.S.', '02-242-1231', '041-122-5294', '010-122-5294', '삼성SDS', '과장', 'Line', 'N', '041-522-5294', '339761', '충남 연기군 금남면', '445330', '경기 화성시', 'js.park@anyframe.org', 'js.park', 'DEPT-0011', 'test123', '2', '10');
INSERT INTO JQUERY_USER VALUES ('이지현', 'Lee Jihyun', '02-242-1231', '041-122-5294', '010-122-5294', '삼성SDS', '사원', '개발330-814', 'N', '041-122-5294', '330760', '충남 천안시 ', '330814', '충남 천안시', 'jihyun.lee@anyframe.org', 'jihyun', 'DEPT-0011', 'test123', '4', '8');
INSERT INTO JQUERY_USER VALUES ('이동우', 'Lee Dongwoo', '02-242-1231', '010-6366-9999', '010-6366-9999', '삼성SDS', '과장', '미주영업', 'N', '02-2145-2145', '445370', '화성시 송산동', '445370', '화성시 송산동', 'dongwoo.lee@anyframe.org', 'dongwoo', 'DEPT-0001', 'test123', '0', '10');
INSERT INTO JQUERY_USER VALUES ('김경호', 'Kim Kyungho', '02-242-1231', '010-0808-0808', '010-0808-0808', '삼성SDS', '부장', '국내영업', 'N', '053-744-6426', '702020', '대구 북구 복현동', '702260', '대구 북구 복현동', 'kyungho.kim@anyframe.org', 'kyungho', 'DEPT-0001', 'test123', '10', '10');
INSERT INTO JQUERY_USER VALUES ('박성욱', 'Park Sungwook', '02-242-1231', '82-031-123-1234', '82-010-123-1234', '삼성SDS', '과장', '영업', 'N', '82-031-123-1234', '442742', '경기도 수원시 팔달구 매탄3동 ', '442742', '경기도 수원시 팔달구 매탄3동', 'sungwook.park@anyframe.org', 'sungwook', 'DEPT-0001', 'test123', '12', '12');
INSERT INTO JQUERY_USER VALUES ('최상현', 'sanghyun', '02-242-1231', '02-2486-7845', '010-4578-9510', '삼성SDS', '과장', '개발', 'N', '02-9316-1049', '450111', '서울 강남구 역삼동', '578142', '서울 강남구 역삼동', 'sanghyun@anyframe.org', 'sanghyun', 'DEPT-0011', 'test', '12', '12');

INSERT INTO JQUERY_BOARD VALUES ('POST-00001', '프로젝트 회식', '프로젝트 회식있습니다.날짜와 시간은 이영미씨가 공지예정.', 'hong80', '2009-06-26 12:00:01', 'COMMUNITY-0005');
INSERT INTO JQUERY_BOARD VALUES ('POST-00002', 'FLEX 사용해보신분', 'FLEX 기본적인 사용방법 좀 알려주세요.', 'dongnam', '2009-06-26 12:00:02', 'COMMUNITY-0004');
INSERT INTO JQUERY_BOARD VALUES ('POST-00003', '조립 20일만 하면', '컴퓨터 조립 누구나 할 수 있습니다.', 'test', '2009-08-21 12:00:03', 'COMMUNITY-0001');
INSERT INTO JQUERY_BOARD VALUES ('POST-00004', 'JavaScript와 DHTML', 'JavaScript와 DHTML의 세계에 오신것을 환영합니다.', 'chulsoo', '2009-06-26 12:00:04', 'COMMUNITY-0003');
INSERT INTO JQUERY_BOARD VALUES ('POST-00005', 'SQL인스트럭션', '모든 SQL인스트럭션의 용어를 열거합니다.', 'sooni', '2009-06-26 12:00:05', 'COMMUNITY-0002');
INSERT INTO JQUERY_BOARD VALUES ('POST-00006', '데이타베이스 테이블에 관한 질문입니다.', '테이블에 데이터 일괄 저장 방법', 'jihyun', '2009-06-26 12:00:06', 'COMMUNITY-0002');
INSERT INTO JQUERY_BOARD VALUES ('POST-00007', 'SEAM이 표준?', 'SEAM과 JSR-299와는 어떤 관계가 있을까요?.', 'hong80', '2009-06-26 12:00:07', 'COMMUNITY-0010');
INSERT INTO JQUERY_BOARD VALUES ('POST-00008', 'J2EE6의 new feature', 'J2EE6에서 새롭게 추가된 스펙에는 다음과 같은 것들이 있습니다.', 'yongmi', '2009-06-26 12:00:08', 'COMMUNITY-0001');
INSERT INTO JQUERY_BOARD VALUES ('POST-00009', '수원 성대', '수원 성대 다닙니다. 같이 타실분 연락주세요.', 'kkw', '2009-08-21 12:00:09', 'COMMUNITY-0011');
INSERT INTO JQUERY_BOARD VALUES ('POST-00010', 'Spring Context의 종류', 'Spring Context의 종류엔 뭐가 있나요?', 'hong80', '2009-08-11 12:00:10', 'COMMUNITY-0005');
INSERT INTO JQUERY_BOARD VALUES ('POST-00011', '언제 정모하나요?', '언제 정모?', 'test', '2009-08-21 12:00:11', 'COMMUNITY-0015');
INSERT INTO JQUERY_BOARD VALUES ('POST-00012', '제 차 사실 분', '카풀하지 마시고 중고차 하나 구입하세요.', 'chulsoo', '2009-08-17 12:00:12', 'COMMUNITY-0011');
INSERT INTO JQUERY_BOARD VALUES ('POST-00013', '강남에서 종로', '같이 가실 분 모십니다.^^', 'kyungjiin', '2009-08-17 12:00:13', 'COMMUNITY-0011');
INSERT INTO JQUERY_BOARD VALUES ('POST-00014', '구성고 학생 카풀', '구성고 높은 언덕길 같이 올라가요.', 'hong80', '2009-08-17 12:00:14', 'COMMUNITY-0011');
INSERT INTO JQUERY_BOARD VALUES ('POST-00015', '프로야구 짱', 'KBL 최고에요', 'yongmi', '2009-08-21 12:00:15', 'COMMUNITY-0010');
INSERT INTO JQUERY_BOARD VALUES ('POST-00016', '탄천', '탄천', 'hong80', '2009-08-21 12:00:16', 'COMMUNITY-0003');
INSERT INTO JQUERY_BOARD VALUES ('POST-00017', '구성주유소', '젤 쌉니다.', 'hong80', '2009-08-17 12:00:17', 'COMMUNITY-0010');
INSERT INTO JQUERY_BOARD VALUES ('POST-00018', '프리미어 리그 따라하기', '따라할 수 있을까?', 'test', '2009-08-21 12:00:18', 'COMMUNITY-0010');
INSERT INTO JQUERY_BOARD VALUES ('POST-00019', '자동차 보험료 인상', '사고 수리 비용 얼마이상이면 보험료가 인상되는지 알려주세요.', 'hong80', '2009-08-17 12:00:19', 'COMMUNITY-0008');
INSERT INTO JQUERY_BOARD VALUES ('POST-00020', '수원으로 출근하시는 분', '일산에서 수원으로 출근하시는 분 있으세요?', 'yoona', '2009-08-17 12:00:20', 'COMMUNITY-0011');
INSERT INTO JQUERY_BOARD VALUES ('POST-00021', '단국대 카풀해요', '강남에서 단국대 카풀해요', 'jihyun', '2009-08-17 12:00:21', 'COMMUNITY-0011');
INSERT INTO JQUERY_BOARD VALUES ('POST-00022', '애니카와 프로미', '애니카와 프로미중 누가 더 좋을까요?', 'yuli', '2009-08-17 12:00:22', 'COMMUNITY-0008');
INSERT INTO JQUERY_BOARD VALUES ('POST-00023', '중고차 상태 확인 방법', '중고차 살 때 주의해야할 사항이 뭐가 있나요.', 'hong80', '2009-08-17 12:00:23', 'COMMUNITY-0007');
INSERT INTO JQUERY_BOARD VALUES ('POST-00024', '유아용 책상', '유아용 책상 만들 때 비용 및 시간', 'hong80', '2009-08-25 12:00:24', 'COMMUNITY-0020');
INSERT INTO JQUERY_BOARD VALUES ('POST-00025', '컴퓨터 조립 가장 싸게', '용산보다 쌉니다.', 'hong80', '2009-08-25 12:00:25', 'COMMUNITY-0008');
INSERT INTO JQUERY_BOARD VALUES ('POST-00026', '엔진 청소', '엔진 청소 어떻게 해요?', 'js.park', '2009-09-24 3:54:17', 'COMMUNITY-0009');

commit;