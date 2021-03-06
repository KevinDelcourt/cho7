DROP TABLE IF EXISTS etat_avancement, users, creation, theme, faq;

CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username varchar(50) UNIQUE NOT NULL COLLATE utf8_general_ci  ,
  password varchar(64) NOT NULL COLLATE utf8_general_ci,
  email varchar(254) NOT NULL COLLATE utf8_general_ci,
  presentation varchar(512) COLLATE utf8_general_ci,
  avatar varchar(200) COLLATE utf8_general_ci,
  role varchar(20) NOT NULL COLLATE utf8_general_ci,
  twitter varchar(50) NOT NULL COLLATE utf8_general_ci DEFAULT "nomanil_lcdl"
);

INSERT INTO users (username,password,email,presentation,role,avatar,twitter)
VALUES ('Admin','sha1$f384dd89$1$c350803491e73924609fdcdc338d7fd27da49464','artiste.art@genie.nl',"Je suis un artiste et je fait de l'art de génie",'ROLE_CREATEUR','avatar_createur.png',"Kmeru78");

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

INSERT INTO creation (nomfichier, titre, description)
VALUES 
  ('oui.mp3','Episode 1',"Beaucoup d'aventure et d'eau fraîche !"),
  ('201mdi.mp3','Episode 2','Des rebondissements à foison.'),
  (null,'Episode 3',"L'enregistrement est bientôt fini, ça promets un bel épisode !"),
  (null,'Episode 4',null);

CREATE TABLE etat_avancement (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  libelle varchar(50) NOT NULL COLLATE utf8_general_ci,
  valeuravancement int(3) DEFAULT 0,
  idcreation int(11), 
  FOREIGN KEY (idcreation) REFERENCES creation(id) ON DELETE CASCADE
);

INSERT INTO etat_avancement (libelle, valeuravancement, idcreation)
VALUES 
  ('Ecriture',97,3),
  ('Enregistrement',40,3),
  ('Montage',0,3),
  ('Ecriture',22,4),
  ('Mixage',12,4);

CREATE TABLE faq (
	id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  question varchar (250) NOT NULL COLLATE utf8_general_ci,
	reponse varchar (250) DEFAULT NULL
);

INSERT INTO faq (question, reponse)
VALUES 
  ('Comment ça va ?', "Cela va très bien merci bien c'est bien"),
  ('Vous êtes où ?', 'On est à Toulouse'),
  ('Qui gère ce site ?', 'Nomanil le oui'),
  ('Comment tu te prénommes ?', 'Ca va Nomanil encore oui non oui');
  
CREATE TABLE theme (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  style varchar(64) NOT NULL COLLATE utf8_general_ci,
  value varchar(64) NOT NULL COLLATE utf8_general_ci
);
