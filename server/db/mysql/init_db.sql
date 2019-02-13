DROP TABLE IF EXISTS users, creation;

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

CREATE TABLE creation (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nomfichier varchar(50) UNIQUE NOT NULL,
  titre varchar(50) NOT NULL,
  description varchar(2048)
);

INSERT INTO creation (nomfichier,titre)
VALUES ('oui.mp3','oui');