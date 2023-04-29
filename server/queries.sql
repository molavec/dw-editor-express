create table dw_user (
  id serial not null primary key,
  email varchar(50) not null, 
  firstname varchar(50),
  lastname varchar(50),
  alias varchar(50),
  image varchar(2500),
  password varchar(250)
);

create table dw_text (
  id serial not null primary key,
  title varchar(100),
  content varchar(2500),
  userId int,
  CONSTRAINT fk_user FOREIGN KEY(userId) REFERENCES dw_user(id)
);

select * from dw_text;

select * from dw_user;

delete from dw_user where id=2;

DELETE FROM dw_user WHERE email like '%miguel@queonda.art%';