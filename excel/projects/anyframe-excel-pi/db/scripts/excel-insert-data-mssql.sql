CREATE TABLE EXCEL_MOVIE(
	MOVIE_ID VARCHAR(16) NOT NULL,
	GENRE_NAME VARCHAR(50) NOT NULL,
	TITLE VARCHAR(50) NOT NULL,
	DIRECTOR VARCHAR(50) NOT NULL,
	ACTORS VARCHAR(100) NOT NULL,
	RUNTIME DECIMAL(3),
	RELEASE_DATE DATETIME default GETDATE(),
	TICKET_PRICE DECIMAL(6,2),
	POSTER_FILE VARCHAR(1000),
	NOW_PLAYING CHAR(1),
	CONSTRAINT PK_EXCEL_MOVIE PRIMARY KEY(MOVIE_ID));
	
INSERT INTO EXCEL_MOVIE VALUES('MV-00001','Adventure','Alice in Wonderland','Tim Burton','Johnny Depp',110,CONVERT(DATETIME,'2010-03-04'),8000,'sample/images/posters/aliceinwonderland.jpg','Y');
INSERT INTO EXCEL_MOVIE VALUES('MV-00002','Sci-Fi','Avatar','James Cameron','Sigourney Weaver',100,CONVERT(DATETIME,'2010-02-16'),7000,'sample/images/posters/avatar.jpg','Y');
INSERT INTO EXCEL_MOVIE VALUES('MV-00003','Action','Green Zone','Paul Greengrass','Yigal Naor',90,CONVERT(DATETIME,'2010-03-25'),7000,'sample/images/posters/greenzone.jpg','Y');
INSERT INTO EXCEL_MOVIE VALUES('MV-00004','Drama','Remember Me','Allen Coulter','Caitlyn Rund',115,CONVERT(DATETIME,'2010-03-12'),8000,'sample/images/posters/rememberme.jpg','Y');
INSERT INTO EXCEL_MOVIE VALUES('MV-00005','Comedy','She is Out of My League','Jim Field Smith','Jay Baruchel',118,CONVERT(DATETIME,'2010-03-12'),7500,'sample/images/posters/shesoutof.jpg','Y');
INSERT INTO EXCEL_MOVIE VALUES('MV-00006','Drama','Shutter Island','Martin Scorsese','Leonardo DiCaprio',95,CONVERT(DATETIME,'2010-03-18'),8000,'sample/images/posters/shutterisland.jpg','Y');

commit;

