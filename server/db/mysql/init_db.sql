DROP TABLE IF EXISTS etat_avancement, users, creation;

CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username varchar(50) UNIQUE NOT NULL,
  password varchar(64) NOT NULL,
  email varchar(254) NOT NULL,
  presentation varchar(512),
  avatar varchar(200),
  role varchar(20) NOT NULL
);

INSERT INTO users (username,password,email,role)
VALUES ('Admin','Admin','','ROLE_CREATEUR');

CREATE TABLE creation (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nomfichier varchar(50),
  fichier longblob,
  titre varchar(50) NOT NULL,
  description varchar(2048),
  nbecoute int(11) DEFAULT 0,
  sommenotes int(11) DEFAULT 0,
  nbnote int(11) DEFAULT 0,
  miseajour DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO creation (nomfichier,titre,description)
VALUES ('oui.mp3','oui','abc');

CREATE TABLE etat_avancement (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  libelle varchar(50),
  valeuravancement int(11) DEFAULT 0,
  idcreation int(11), 
  FOREIGN KEY (idcreation) REFERENCES creation(id)
);