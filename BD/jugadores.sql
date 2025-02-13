-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-02-2025 a las 14:14:09
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `plantillafutbol`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugadores`
--

CREATE TABLE `jugadores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellidos` varchar(60) NOT NULL,
  `fecha_nac` date NOT NULL,
  `posicion` varchar(50) NOT NULL,
  `nacionalidad` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `jugadores`
--

INSERT INTO `jugadores` (`id`, `nombre`, `apellidos`, `fecha_nac`, `posicion`, `nacionalidad`) VALUES
(1, 'Enrique', 'Alonso el Kiler', '2015-02-04', 'Delantero', 'Marruecos'),
(2, 'Pipas', 'Sabaly Hernandez', '2001-02-18', 'Lateral', 'Senegal'),
(3, 'Javi', 'Ruman Riquelme', '2005-12-01', 'Medio', 'Rumania'),
(4, 'Pepe', 'Reina Princesa', '2001-06-04', 'Portero', 'España'),
(5, 'Diego', 'Crespo el pulmon', '2004-04-09', 'Lateral', 'Mongolia'),
(6, 'Alberto', 'Anguita Lloron', '2006-10-12', 'Defensa', 'Vietnam'),
(7, 'Guille', 'El maquina', '2009-09-03', 'Medio', 'Ucrania'),
(8, 'Ricky', 'Edit Sabaly', '2010-04-21', 'Delantero', 'Rusia'),
(9, 'Toby', 'Hernandez Fernandez', '2002-05-04', 'Extremo', 'Albania'),
(10, 'Calvinho', 'El peludo', '2015-10-15', 'Portero', 'Brasil'),
(11, 'Larguinho', 'El mediometro', '2013-03-23', 'Defensa', 'Brasil');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `jugadores`
--
ALTER TABLE `jugadores`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `jugadores`
--
ALTER TABLE `jugadores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
