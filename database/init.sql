-- 1. TABLA ASOCIACIONES
CREATE TABLE ASOCIACIONES (
    asociacion_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_asociacion VARCHAR(255) NOT NULL,
    registro_legal VARCHAR(50) UNIQUE, 
    mision TEXT,
    ubicacion VARCHAR(255),
    logo_url VARCHAR(255),
    estado_aprobacion VARCHAR(20) DEFAULT 'Pendiente' CHECK (estado_aprobacion IN ('Pendiente', 'Aprobada', 'Rechazada')),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERTS ASOCIACIONES
INSERT INTO ASOCIACIONES (nombre_asociacion, registro_legal, mision, ubicacion, logo_url, estado_aprobacion) 
VALUES ('Patitas Felices', 'ID-PF-1001', 'Rescate y reubicación de perros y gatos en situación de calle.', 'San José, Costa Rica', '/logos/patitas_felices.png', 'Aprobada');
INSERT INTO ASOCIACIONES (nombre_asociacion, registro_legal, mision, ubicacion, logo_url, estado_aprobacion) 
VALUES ('Proyecto Bigotes', 'ID-PB-2002', 'Cuidado y esterilización de felinos abandonados.', 'Heredia, Costa Rica', '/logos/proyecto_bigotes.png', 'Aprobada');
INSERT INTO ASOCIACIONES (nombre_asociacion, registro_legal, mision, ubicacion, logo_url, estado_aprobacion) 
VALUES ('Fundación Huellita', 'ID-FH-3003', 'Promoción de adopciones responsables y educación en tenencia de mascotas.', 'Alajuela, Costa Rica', '/logos/fundacion_huellita.png', 'Aprobada');

-- 2. TABLA USUARIOS 
CREATE TABLE USUARIOS (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    tipo_usuario VARCHAR(20) NOT NULL CHECK (tipo_usuario IN ('Donante', 'Asociado', 'Admin_Interno')),
    nombre_completo VARCHAR(255) NOT NULL,
    asociacion_id INT UNIQUE, 
    telefono VARCHAR(15),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo TINYINT(1) DEFAULT 1, -- 1 para TRUE, 0 para FALSE
    CONSTRAINT fk_usuarios_asoc FOREIGN KEY (asociacion_id) REFERENCES ASOCIACIONES(asociacion_id)
);

-- INSERTS USUARIOS (Asociados)
INSERT INTO USUARIOS (email, password_hash, tipo_usuario, nombre_completo, asociacion_id) 
VALUES ('patitasfelices@ong.org', 'hash_asoc_pf', 'Asociado', 'Patitas Felices', 1);
INSERT INTO USUARIOS (email, password_hash, tipo_usuario, nombre_completo, asociacion_id) 
VALUES ('proyectobigotes@ong.org', 'hash_asoc_pb', 'Asociado', 'Proyecto Bigotes', 2);
INSERT INTO USUARIOS (email, password_hash, tipo_usuario, nombre_completo, asociacion_id) 
VALUES ('fundacionhuellita@ong.org', 'hash_asoc_fh', 'Asociado', 'Fundación Huellita', 3);

-- INSERTS USUARIOS (Donantes) 
INSERT INTO USUARIOS (email, password_hash, tipo_usuario, nombre_completo) 
VALUES ('daniel.perez@donante.com', 'hash_dan_don', 'Donante', 'Daniel Perez Amundaray');
INSERT INTO USUARIOS (email, password_hash, tipo_usuario, nombre_completo) 
VALUES ('brandon.chacon@donante.com', 'hash_dan_don', 'Donante', 'Chacon Jimenez Brandon Jesus');
INSERT INTO USUARIOS (email, password_hash, tipo_usuario, nombre_completo) 
VALUES ('erick.marin@donante.com', 'hash_dan_don', 'Donante', 'Marin Monge Erick Bernardo');
INSERT INTO USUARIOS (email, password_hash, tipo_usuario, nombre_completo) 
VALUES ('steven.soto@donante.com', 'hash_dan_don', 'Donante', 'Soto Ampie Steven Josue');

-- 3. TABLA CAMPANNIA
CREATE TABLE CAMPANNIA (
    campannia_id INT AUTO_INCREMENT PRIMARY KEY,
    asociacion_id INT NOT NULL, 
    titulo_campana VARCHAR(255) NOT NULL,
    descripcion TEXT,
    meta_monto DECIMAL(10, 2) NOT NULL,
    monto_actual DECIMAL(10, 2) DEFAULT 0.00,
    fecha_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_limite TIMESTAMP,
    estado VARCHAR(20) DEFAULT 'Activa' CHECK (estado IN ('Activa', 'Completada', 'Archivada')),
    CONSTRAINT fk_campannia_asoc FOREIGN KEY (asociacion_id) REFERENCES ASOCIACIONES(asociacion_id)
);

-- INSERTS CAMPANNIA
INSERT INTO CAMPANNIA (asociacion_id, titulo_campana, descripcion, meta_monto, monto_actual, fecha_limite) 
VALUES (1, 'Fondo de Alimentos para 50 Rescatados', 'Necesitamos asegurar 6 meses de alimento premium.', 1000.00, 125.00, '2026-03-31 23:59:59');
INSERT INTO CAMPANNIA (asociacion_id, titulo_campana, descripcion, meta_monto, monto_actual, fecha_limite) 
VALUES (2, 'Campaña de Esterilización Masiva Felina', 'Meta para esterilizar 150 gatos.', 2500.00, 25.00, '2026-05-31 23:59:59');

-- 4. TABLA DONACIONES
CREATE TABLE DONACIONES (
    donacion_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL, 
    asociacion_id INT NOT NULL, 
    monto DECIMAL(10, 2) NOT NULL,
    fecha_donacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo_donacion VARCHAR(20) DEFAULT 'Unica' CHECK (tipo_donacion IN ('Unica', 'Recurrente')),
    metodo_pago VARCHAR(50),
    transaccion_id_externa VARCHAR(100) UNIQUE, 
    CONSTRAINT fk_don_user FOREIGN KEY (usuario_id) REFERENCES USUARIOS(usuario_id),
    CONSTRAINT fk_don_asoc FOREIGN KEY (asociacion_id) REFERENCES ASOCIACIONES(asociacion_id)
);

-- INSERTS DONACIONES
INSERT INTO DONACIONES (usuario_id, asociacion_id, monto, tipo_donacion, metodo_pago, transaccion_id_externa) 
VALUES (4, 1, 50.00, 'Unica', 'Tarjeta', 'TXN-001A');
INSERT INTO DONACIONES (usuario_id, asociacion_id, monto, tipo_donacion, metodo_pago, transaccion_id_externa) 
VALUES (5, 2, 25.00, 'Recurrente', 'PayPal', 'TXN-002B');

-- 5. TABLA DONACION_POR_CAMPANNIA 
CREATE TABLE DONACION_POR_CAMPANNIA (
    donacion_campannia_id INT AUTO_INCREMENT PRIMARY KEY,
    donacion_id INT NOT NULL,
    campannia_id INT NOT NULL,
    monto_asignado DECIMAL(10, 2) NOT NULL,
    CONSTRAINT uk_donacion_campannia UNIQUE (donacion_id, campannia_id),
    CONSTRAINT fk_doncamp_don FOREIGN KEY (donacion_id) REFERENCES DONACIONES(donacion_id),
    CONSTRAINT fk_doncamp_camp FOREIGN KEY (campannia_id) REFERENCES CAMPANNIA(campannia_id)
);

-- INSERT FINAL
INSERT INTO DONACION_POR_CAMPANNIA (donacion_id, campannia_id, monto_asignado) 
VALUES (1, 1, 50.00);

-- Crear tabla de reportes de transparencia
CREATE TABLE reportes_transparencia (
    reporte_id INT AUTO_INCREMENT PRIMARY KEY,
    asociacion_id INT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    monto_utilizado DECIMAL(10, 2) NOT NULL,
    fecha_publicacion DATE,
    año INT,
    CONSTRAINT fk_reporte_asociacion FOREIGN KEY (asociacion_id) REFERENCES ASOCIACIONES(asociacion_id)
);

-- Insertar datos de ejemplo
INSERT INTO reportes_transparencia (asociacion_id, titulo, descripcion, monto_utilizado, fecha_publicacion, año) VALUES
(1, 'Reporte mensual - Abril 2024', 'Durante este mes se utilizaron las donaciones para cubrir alimentación, cirugías de esterilización y emergencias.', 380000.00, '2024-04-05', 2024),
(1, 'Cierre campaña Tratamiento para Luna', 'La campaña para el tratamiento de Luna alcanzó la meta propuesta. Los fondos se usaron en consultas, medicamentos y alimentación especializada.', 152000.00, '2024-01-30', 2024),
(2, 'Campaña de esterilización - Informe parcial', 'Gracias a las donaciones, se lograron realizar esterilizaciones de perros y gatos, y charlas educativas.', 450000.00, '2024-03-20', 2024),
(3, 'Uso de fondos - Programa colonias felinas', 'En este periodo se atendieron varias colonias de gatos ferales, incluyendo esterilización, vacunación y alimentación.', 260000.00, '2024-02-10', 2024);