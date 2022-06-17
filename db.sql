drop table if exists sentmessages;
create table sentmessages(
    id int primary key auto_increment,email varchar(100),
    recipient varchar(50),
    message text,
    createdate timestamp default current_timestamp());
