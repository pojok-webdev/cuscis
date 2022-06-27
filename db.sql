drop table if exists sentmessages;
create table sentmessages(
    id int primary key auto_increment,
    email varchar(100),
    template_id smallint,
    recipient varchar(50),
    message text,
    createdate timestamp default current_timestamp()
);

drop table if exists contactphones;
create table contactphones(
    id int primary key auto_increment,
    client_id int,
    picname varchar(100),
    picrole varchar(50),
    picphone varchar(20),
    createdate timestamp default current_timestamp()
)

drop table if exists messagecategories;
create table messagecategories (id int primary key auto_increment,parent_id int,name varchar(100),description text,createdate timestamp default current_timestamp);