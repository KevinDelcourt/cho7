CREATE TABLE users_copy LIKE users; 
INSERT INTO users_copy
SELECT * FROM users;
DROP TABLE users;
CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username varchar(50) UNIQUE NOT NULL COLLATE utf8_general_ci  ,
  password varchar(64) NOT NULL COLLATE utf8_general_ci,
  email varchar(254) NOT NULL COLLATE utf8_general_ci,
  presentation varchar(512) COLLATE utf8_general_ci,
  avatar varchar(200) COLLATE utf8_general_ci,
  role varchar(20) NOT NULL COLLATE utf8_general_ci
);
INSERT INTO users
SELECT * 
FROM users_copy;

DROP TABLE users_copy;







CREATE TABLE creation_copy LIKE creation; 
INSERT INTO creation_copy
SELECT * FROM creation;
DROP TABLE creation;
CREATE TABLE creation (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nomfichier varchar(50) COLLATE utf8_general_ci,
  titre varchar(50) NOT NULL COLLATE utf8_general_ci,
  description varchar(2048) COLLATE utf8_general_ci,
  nbecoute int(11) DEFAULT 0,
  sommenotes int(11) DEFAULT 0,
  nbnote int(11) DEFAULT 0,
  miseajour DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO creation
SELECT * 
FROM creation_copy;

DROP TABLE creation_copy;


CREATE TABLE etat_avancement_copy LIKE etat_avancement; 
INSERT INTO etat_avancement_copy
SELECT * FROM etat_avancement;
DROP TABLE etat_avancement;
CREATE TABLE etat_avancement (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  libelle varchar(50) NOT NULL COLLATE utf8_general_ci,
  valeuravancement int(3) DEFAULT 0,
  idcreation int(11), 
  FOREIGN KEY (idcreation) REFERENCES creation(id) ON DELETE CASCADE
);

INSERT INTO etat_avancement
SELECT * 
FROM etat_avancement_copy;

DROP TABLE etat_avancement_copy;


CREATE TABLE theme_copy LIKE theme; 
INSERT INTO theme_copy
SELECT * FROM theme;
DROP TABLE theme;
CREATE TABLE theme (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  style varchar(64) NOT NULL COLLATE utf8_general_ci,
  value varchar(64) NOT NULL COLLATE utf8_general_ci
);
INSERT INTO theme
SELECT * 
FROM theme_copy;

DROP TABLE theme_copy;