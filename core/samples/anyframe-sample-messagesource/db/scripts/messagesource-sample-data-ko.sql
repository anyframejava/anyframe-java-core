CREATE TABLE MESSAGE_SOURCE(
KEY varchar(50) NOT NULL, 
LANGUAGE varchar(2) NOT NULL, 
COUNTRY varchar(2) NOT NULL, 
TEXT varchar(1000) NOT NULL, 
PRIMARY KEY (KEY, LANGUAGE, COUNTRY)
);


INSERT INTO MESSAGE_SOURCE VALUES('movie.id', 'ko', 'KO', '아이디');
INSERT INTO MESSAGE_SOURCE VALUES('movie.title', 'ko', 'KO', '타이틀');
INSERT INTO MESSAGE_SOURCE VALUES('movie.director', 'ko', 'KO', '감독');
INSERT INTO MESSAGE_SOURCE VALUES('movie.genre', 'ko', 'KO', '장르');
INSERT INTO MESSAGE_SOURCE VALUES('movie.actors', 'ko', 'KO', '배우');
INSERT INTO MESSAGE_SOURCE VALUES('movie.releaseDate', 'ko', 'KO', '개봉일');
INSERT INTO MESSAGE_SOURCE VALUES('movie.ticketPrice', 'ko', 'KO', '티켓가격');
INSERT INTO MESSAGE_SOURCE VALUES('movie.runtime', 'ko', 'KO', '상영시간');
INSERT INTO MESSAGE_SOURCE VALUES('movie.nowPlaying', 'ko', 'KO', '상영중');
INSERT INTO MESSAGE_SOURCE VALUES('movie.posterFile', 'ko', 'KO', '포스터');
INSERT INTO MESSAGE_SOURCE VALUES('movie.theater', 'ko', 'KO', '상영관');

INSERT INTO MESSAGE_SOURCE VALUES('error.moviefinder.get', 'ko', 'KO', '영화[{0}] 정보 조회에 실패하였습니다.');

commit;