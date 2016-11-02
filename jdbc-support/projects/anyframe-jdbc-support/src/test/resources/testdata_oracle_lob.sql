DROP TABLE TB_BINARY_TEST;

CREATE TABLE TB_BINARY_TEST (
	bin_id  integer, 
	myblob blob,
	myclob clob,
 PRIMARY KEY (bin_id)
);