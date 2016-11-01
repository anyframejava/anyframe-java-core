drop table tb_user if exists;

create table tb_user (
  logon_id	varchar(10) primary key,
  name		varchar(20),
  password	varchar(20)
);

insert into tb_user(logon_id, name, password) values ('admin', 'Administrator', 'adminpw');

insert into tb_user(logon_id, name, password) values ('user', 'User', 'userpw');

insert into tb_user(logon_id, name, password) values ('buyer', 'Buyer', 'buyerpw');

commit;
