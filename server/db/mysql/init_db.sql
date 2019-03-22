DROP TABLE IF EXISTS etat_avancement, users, creation;

CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username varchar(50) UNIQUE NOT NULL COLLATE utf8_general_ci  ,
  password varchar(64) NOT NULL COLLATE utf8_general_ci,
  email varchar(254) NOT NULL COLLATE utf8_general_ci,
  presentation varchar(512) COLLATE utf8_general_ci,
  avatar varchar(200) COLLATE utf8_general_ci,
  role varchar(20) NOT NULL COLLATE utf8_general_ci
);

INSERT INTO users (username,password,email,presentation,role,avatar)
VALUES ('Admin','Admin','artiste.art@genie.nl','je suis un artiste et je fait de l\'art de génie','ROLE_CREATEUR','image.jpg');

CREATE TABLE creation (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nomfichier varchar(50) COLLATE utf8_general_ci,
  fichier longblob,
  titre varchar(50) NOT NULL COLLATE utf8_general_ci,
  description varchar(2048) COLLATE utf8_general_ci,
  nbecoute int(11) DEFAULT 0,
  sommenotes int(11) DEFAULT 0,
  nbnote int(11) DEFAULT 0,
  miseajour DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO creation (nomfichier,titre,description)
VALUES ('oui.mp3','oui','abc');
INSERT INTO creation (titre,description)
VALUES ('non','xyz');

CREATE TABLE etat_avancement (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  libelle varchar(50) COLLATE utf8_general_ci,
  valeuravancement int(11) DEFAULT 0,
  idcreation int(11), 
  FOREIGN KEY (idcreation) REFERENCES creation(id) ON DELETE CASCADE
);
