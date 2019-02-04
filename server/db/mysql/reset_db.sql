DROP TABLE users;

CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username varchar(50) UNIQUE NOT NULL,
  password varchar(64) NOT NULL,
  email varchar(254) NOT NULL,
  presentation varchar(512),
  role varchar(20) NOT NULL
);

INSERT INTO users (username,password,email,role)
VALUES ('Admin','Admin','','ROLE_CREATEUR');