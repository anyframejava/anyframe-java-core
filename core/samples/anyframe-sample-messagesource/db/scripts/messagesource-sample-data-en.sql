CREATE TABLE MESSAGE_SOURCE(
KEY varchar(50) NOT NULL, 
LANGUAGE varchar(2) NOT NULL, 
COUNTRY varchar(2) NOT NULL, 
TEXT varchar(1000) NOT NULL, 
PRIMARY KEY (KEY, LANGUAGE, COUNTRY)
);

INSERT INTO MESSAGE_SOURCE VALUES('movie.id', 'en', 'US', 'ID');
INSERT INTO MESSAGE_SOURCE VALUES('movie.title', 'en', 'US', 'Title');
INSERT INTO MESSAGE_SOURCE VALUES('movie.director', 'en', 'US', 'Director');
INSERT INTO MESSAGE_SOURCE VALUES('movie.genre', 'en', 'US', 'Genre');
INSERT INTO MESSAGE_SOURCE VALUES('movie.actors', 'en', 'US', 'Actors');
INSERT INTO MESSAGE_SOURCE VALUES('movie.releaseDate', 'en', 'US', 'Release Date');
INSERT INTO MESSAGE_SOURCE VALUES('movie.ticketPrice', 'en', 'US', 'Ticket Price');
INSERT INTO MESSAGE_SOURCE VALUES('movie.runtime', 'en', 'US', 'Runtime');
INSERT INTO MESSAGE_SOURCE VALUES('movie.nowPlaying', 'en', 'US', 'Now Playing');
INSERT INTO MESSAGE_SOURCE VALUES('movie.posterFile', 'en', 'US', 'Poster');
INSERT INTO MESSAGE_SOURCE VALUES('movie.theater', 'en', 'US', 'Theater');

INSERT INTO MESSAGE_SOURCE VALUES('error.moviefinder.get', 'en', 'US', 'Movie[{0}] details of  specified movie identifier not displayed');

commit;