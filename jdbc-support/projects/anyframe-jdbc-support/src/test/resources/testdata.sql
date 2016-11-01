drop table tb_user if exists;

create table tb_user (
  logon_id	varchar(10) primary key,
  name		varchar(20),
  password	varchar(20),
  age		numeric(4)
);

insert into tb_user(logon_id, name, password, age) values ('admin', 'Administrator', 'adminpw', '19');

insert into tb_user(logon_id, name, password, age) values ('user', 'User', 'userpw', '20');

insert into tb_user(logon_id, name, password, age) values ('buyer', 'Buyer', 'buyerpw', '19');

commit;
