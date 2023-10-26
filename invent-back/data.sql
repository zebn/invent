DROP DATABASE IF EXISTS `invent`;
CREATE DATABASE IF NOT EXISTS `invent`;
USE `invent`;
DROP TABLE IF EXISTS `codigos`;
CREATE TABLE IF NOT EXISTS `codigos` (
  `name` varchar(50) DEFAULT NULL,
  `code` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `codigos` (`name`, `code`) VALUES
	('Correos', '15'),
	('Correos', '16'),
	('Correos', '17'),
	('Correos', '18'),
	('Correos', '19'),
	('Seur', '20'),
	('Seur', '21'),
	('Seur', '22'),
	('Seur', '23'),
	('Seur', '24'),
	('Seur', '25');
DROP TABLE IF EXISTS `packages`;
CREATE TABLE IF NOT EXISTS `packages` (
  `address` varchar(400) DEFAULT NULL,
  `postal` varchar(50) DEFAULT NULL,
  `sender` varchar(50) DEFAULT NULL,
  `recipient` varchar(50) DEFAULT NULL,
  `weight` int DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `price` float DEFAULT NULL,
  `transport` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `packages` (`address`, `postal`, `sender`, `recipient`, `weight`, `id`, `price`, `transport`) VALUES
	('Calle Jaspe', '03013', 'fgfdgfd', 'gfdgfd', 7, 19, 117, 'INVENT'),
	('Av Alonso', '04040', 'gdfgd', 'gdfgdf', 7, 21, 117, 'INVENT'),
	('Blvd del Pla', '20020', 'fdfs', 'fsdfsd', 444, 22, 300, 'Seur');
DROP TABLE IF EXISTS `tipos`;
CREATE TABLE IF NOT EXISTS `tipos` (
  `name` varchar(50) DEFAULT NULL,
  `intmin` float DEFAULT NULL,
  `intmax` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `tipos` (`name`, `intmin`, `intmax`) VALUES
	('Paquete ultra ligero', 0, 0.1),
	('Paquete ligero', 0.1, 0.3),
	('Paquete estándar', 0.3, 5),
	('Paquete pesado', 5, 10),
	('Gran volumen', 10, 1000);
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `pass` varchar(50) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `usuario` (`id`, `nombre`, `email`, `pass`, `role`) VALUES
	(1, 'pavel', '1', 'c4ca4238a0b923820dcc509a6f75849b', 'ROLE_ADMIN'),
	(2, 'worker', '2', 'c4ca4238a0b923820dcc509a6f75849b', 'ROLE_USER');