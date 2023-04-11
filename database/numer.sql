ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'Mixer4422';

CREATE DATABASE numerdb;

use numerdb;

CREATE TABLE numerdb.multi (
    idmulti int not null AUTO_INCREMENT,
    multicol varchar(10000) not null,
    num  int not null,
    primary key (idmulti)
);

INSERT INTO numerdb.multi(idmulti,multicol,num)
value (1,'{"numgen":7,"x":[[1,0,2,3,4,2,1],[0,1,4,2,1,3,6],[1,3,1,2,5,3,4]],"y":[4,-5,-6,0,-1,-7,-20]}',7);