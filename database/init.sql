CREATE DATABASE CONNECTAPET; 
USE CONNECTAPET;

--TABLA ASOCIACIONES 
CREATE TABLE ASOCIACIONES (
    asociacion_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_asociacion VARCHAR(255) NOT NULL,
    registro_legal VARCHAR(50) UNIQUE, 
    mision TEXT,
    ubicacion VARCHAR(255),
    logo_url VARCHAR(255),
    estado_aprobacion ENUM('Pendiente', 'Aprobada', 'Rechazada') DEFAULT 'Pendiente',
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- INSERTS 
INSERT INTO ASOCIACIONES (nombre_asociacion, registro_legal, mision, ubicacion, logo_url, estado_aprobacion) VALUES
('Patitas Felices', 'ID-PF-1001', 'Rescate y reubicación de perros y gatos en situación de calle.', 'San José, Costa Rica', '/logos/patitas_felices.png', 'Aprobada'),
('Proyecto Bigotes', 'ID-PB-2002', 'Cuidado y esterilización de felinos abandonados.', 'Heredia, Costa Rica', '/logos/proyecto_bigotes.png', 'Aprobada'),
('Fundación Huellita', 'ID-FH-3003', 'Promoción de adopciones responsables y educación en tenencia de mascotas.', 'Alajuela, Costa Rica', '/logos/fundacion_huellita.png', 'Aprobada');

-- TABLA USUARIOS 
CREATE TABLE USUARIOS (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    tipo_usuario ENUM('Donante', 'Asociado', 'Admin_Interno') NOT NULL,
    nombre_completo VARCHAR(255) NOT NULL,
    asociacion_id INT NULL UNIQUE, -- Se vincula con ASOCIACIONES si tipo_usuario es 'Asociado'
    telefono VARCHAR(15),
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (asociacion_id) REFERENCES ASOCIACIONES(asociacion_id)
);


-- Cuentas de Asociación 
INSERT INTO USUARIOS (email, password_hash, tipo_usuario, nombre_completo, asociacion_id) VALUES
('patitasfelices@ong.org', 'hash_asoc_pf', 'Asociado', 'Patitas Felices', 1),
('proyectobigotes@ong.org', 'hash_asoc_pb', 'Asociado', 'Proyecto Bigotes', 2),
('fundacionhuellita@ong.org', 'hash_asoc_fh', 'Asociado', 'Fundación Huellita', 3);

-- Donantes 
INSERT INTO USUARIOS (email, password_hash, tipo_usuario, nombre_completo) VALUES
('daniel.perez@donante.com', 'hash_dan_don', 'Donante', 'Daniel Perez Amundaray'),
('brandon.chacon@donante.com', 'hash_bra_don', 'Donante', 'Chacon Jimenez Brandon Jesus'),
('erick.marin@donante.com', 'hash_eri_don', 'Donante', 'Marin Monge Erick Bernardo'),
('steven.soto@donante.com', 'hash_ste_don', 'Donante', 'Soto Ampie Steven Josue');

-- TABLA Campañas

CREATE TABLE CAMPANNIA (
    campannia_id INT AUTO_INCREMENT PRIMARY KEY,
    asociacion_id INT NOT NULL, 
    titulo_campana VARCHAR(255) NOT NULL,
    descripcion TEXT,
    meta_monto DECIMAL(10, 2) NOT NULL,
    monto_actual DECIMAL(10, 2) DEFAULT 0.00,
    fecha_inicio DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_limite DATETIME,
    estado ENUM('Activa', 'Completada', 'Archivada') DEFAULT 'Activa',
    FOREIGN KEY (asociacion_id) REFERENCES ASOCIACIONES(asociacion_id)
);

-- INSERTS 
INSERT INTO CAMPANNIA (asociacion_id, titulo_campana, descripcion, meta_monto, monto_actual, fecha_limite) VALUES
(1, 'Fondo de Alimentos para 50 Rescatados', 'Necesitamos asegurar 6 meses de alimento premium para la población actual.', 1000.00, 125.00, '2026-03-31 23:59:59'),
(2, 'Campaña de Esterilización Masiva Felina', 'Meta para esterilizar 150 gatos ferales en la zona de Cartago.', 2500.00, 25.00, '2026-05-31 23:59:59'),
(3, 'Ampliación de Aula Educativa', 'Financiamiento para construir un espacio más grande para talleres de adopción.', 800.00, 0.00, NULL);

-- 4. TABLA DONACIONES
CREATE TABLE DONACIONES (
    donacion_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL, -- FK al donante (USUARIOS)
    asociacion_id INT NOT NULL, -- FK al receptor (ASOCIACIONES)
    monto DECIMAL(10, 2) NOT NULL,
    fecha_donacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    tipo_donacion ENUM('Unica', 'Recurrente') DEFAULT 'Unica',
    metodo_pago VARCHAR(50),
    transaccion_id_externa VARCHAR(100) UNIQUE, -- ID del procesador de pagos
    FOREIGN KEY (usuario_id) REFERENCES USUARIOS(usuario_id),
    FOREIGN KEY (asociacion_id) REFERENCES ASOCIACIONES(asociacion_id)
);

-- INSERTS DONACIONES
INSERT INTO DONACIONES (usuario_id, asociacion_id, monto, tipo_donacion, metodo_pago, transaccion_id_externa) VALUES
(4, 1, 50.00, 'Unica', 'Tarjeta', 'TXN-001A'), -- Daniel a Patitas Felices
(5, 2, 25.00, 'Recurrente', 'PayPal', 'TXN-002B'), -- Brandon a Proyecto Bigotes
(6, 1, 75.00, 'Unica', 'Tarjeta', 'TXN-003C'), -- Erick a Patitas Felices
(7, 3, 40.00, 'Recurrente', 'Tarjeta', 'TXN-004D'); -- Steven a Fundación Huellita

--TABLA DONACION_POR_CAMPANNIA 
CREATE TABLE DONACION_POR_CAMPANNIA (
    donacion_campannia_id INT AUTO_INCREMENT PRIMARY KEY,
    donacion_id INT NOT NULL,
    necesidad_id INT NOT NULL,
    monto_asignado DECIMAL(10, 2) NOT NULL, -- Cuánto de la donación se asignó a esta necesidad
    UNIQUE KEY uk_donacion_necesidad (donacion_id, necesidad_id),
    FOREIGN KEY (donacion_id) REFERENCES DONACIONES(donacion_id),
    FOREIGN KEY (necesidad_id) REFERENCES NECESIDADES_ASOCIACION(necesidad_id)
);

-- INSERTS de Ejemplo para DONACION_POR_CAMPANNIA (Vincula Donaciones a Campañas)
INSERT INTO DONACION_POR_CAMPANNIA (donacion_id, campannia_id, monto_asignado) VALUES
(1, 1, 50.00), -- Daniel a Campaña 1
(3, 1, 75.00), -- Erick a Campaña 1
(2, 2, 25.00); -- Brandon a Campaña 2
