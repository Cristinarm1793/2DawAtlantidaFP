-- ==============================================================
-- Script de inicialización de Base de Datos para el PreExamen
-- Asignatura: Desarrollo Web en Entorno Servidor · Tema 9
-- Base de Datos: centro
-- ==============================================================

CREATE DATABASE IF NOT EXISTS centro
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE centro;

-- Opcional: Crear usuario de la aplicación con los permisos necesarios
-- CREATE USER IF NOT EXISTS 'dwes_app'@'localhost' IDENTIFIED BY 'CLAVE';
-- GRANT ALL PRIVILEGES ON centro.* TO 'dwes_app'@'localhost';
-- FLUSH PRIVILEGES;

-- 1. Tabla: alumnos
DROP TABLE IF EXISTS matriculas;
DROP TABLE IF EXISTS asignaturas;
DROP TABLE IF EXISTS alumnos;

CREATE TABLE alumnos (
    dni CHAR(9) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    edad TINYINT NOT NULL,
    PRIMARY KEY (dni)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Tabla: asignaturas
CREATE TABLE asignaturas (
    codigo INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    creditos SMALLINT NOT NULL,
    trimestre TINYINT NOT NULL,
    PRIMARY KEY (codigo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Tabla: matriculas
CREATE TABLE matriculas (
    dni CHAR(9) NOT NULL,
    codigo INT NOT NULL,
    anio SMALLINT NOT NULL,
    nota DECIMAL(4,2) NULL,
    PRIMARY KEY (dni, codigo, anio),
    CONSTRAINT fk_matricula_alumno FOREIGN KEY (dni) 
        REFERENCES alumnos(dni) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_matricula_asignatura FOREIGN KEY (codigo) 
        REFERENCES asignaturas(codigo) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==============================================================
-- Datos de prueba para poder ejecutar y verificar los ejercicios
-- ==============================================================

-- Inserción de alumnos de prueba
INSERT INTO alumnos (dni, nombre, edad) VALUES
('11111111A', 'Manuel Benítez', 21),
('22222222B', 'Alicia Moreno', 24),
('33333333C', 'Joaquín Salvador', 26),
('44444444D', 'Alberto Romero', 21),
('55555555E', 'Rocío Dolores', 19),
('66666666F', 'Lola Flores', 23);

-- Inserción de asignaturas de prueba
INSERT INTO asignaturas (codigo, nombre, creditos, trimestre) VALUES
(1, 'Desarrollo Web en Entorno Servidor', 8, 1),
(2, 'Desarrollo Web en Entorno Cliente', 7, 1),
(3, 'Diseño de Interfaces Web', 6, 2),
(4, 'Despliegue de Aplicaciones Web', 4, 2);

-- Inserción de matrículas de prueba
INSERT INTO matriculas (dni, codigo, anio, nota) VALUES
('11111111A', 1, 2026, 8.50),
('11111111A', 2, 2026, 4.25),
('22222222B', 1, 2025, 9.00),
('22222222B', 3, 2026, 6.75),
('33333333C', 1, 2026, NULL),    -- Nota NULL para probar ejercicio 08
('44444444D', 2, 2026, 5.00),
('44444444D', 4, 2026, NULL),    -- Nota NULL
('55555555E', 1, 2026, 7.20);
-- El alumno Lola Flores (66666666F) se deja sin matrículas para probar el LEFT JOIN del ejercicio 14
