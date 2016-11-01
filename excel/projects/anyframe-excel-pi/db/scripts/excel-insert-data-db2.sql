CREATE TABLE EXCEL_MOVIE(
	MOVIE_ID VARCHAR(16) NOT NULL,
	GENRE_NAME VARCHAR(50) NOT NULL,
	TITLE VARCHAR(50) NOT NULL,
	DIRECTOR VARCHAR(50) NOT NULL,
	ACTORS VARCHAR(100) NOT NULL,
	RUNTIME DECIMAL(3),
	RELEASE_DATE DATE,
	TICKET_PRICE DECIMAL(6,2),
	POSTER_FILE VARCHAR(1000),
	NOW_PLAYING CHAR(1),
	PRIMARY KEY(MOVIE_ID));

INSERT INTO EXCEL_MOVIE VALUES('MV-00001','Adventure','Alice in Wonderland','Tim Burton','Johnny Depp',110,TO_DATE('2010-03-04','yyyy-MM-dd'),8000,'sample/images/posters/aliceinwonderland.jpg','Y');
INSERT INTO EXCEL_MOVIE VALUES('MV-00002','Sci-Fi','Avatar','James CaTablesmeron','Sigourney Weaver',100,TO_DATE('2010-02-16','yyyy-MM-dd'),7000,'sample/images/posters/avatar.jpg','Y');
INSERT INTO EXCEL_MOVIE VALUES('MV-00003','Action','Green Zone','Paul Greengrass','Yigal Naor',90,TO_DATE('2010-03-25','yyyy-MM-dd'),7000,'sample/images/posters/greenzone.jpg','Y');
INSERT INTO EXCEL_MOVIE VALUES('MV-00004','Drama','Remember Me','Allen Coulter','Caitlyn Rund',115,TO_DATE('2010-03-12','yyyy-MM-dd'),8000,'sample/images/posters/rememberme.jpg','Y');
INSERT INTO EXCEL_MOVIE VALUES('MV-00005','Comedy','She is Out of My League','Jim Field Smith','Jay Baruchel',118,TO_DATE('2010-03-12','yyyy-MM-dd'),7500,'sample/images/posters/shesoutof.jpg','Y');
INSERT INTO EXCEL_MOVIE VALUES('MV-00006','Crime','Shutter Island','Martin Scorsese','Leonardo DiCaprio',95,TO_DATE('2010-03-18','yyyy-MM-dd'),8000,'sample/images/posters/shutterisland.jpg','Y');

commit;

