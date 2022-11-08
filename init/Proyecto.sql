
/*1*/
CREATE TABLE `PlantasMinerales` (
	`id_plantas_mineras` INT NOT NULL,
	`id_ubicacion` INT NOT NULL,
	`PM_tipo` varchar(255) ,
	PRIMARY KEY (`id_plantas_mineras`)
);
/*2*/
CREATE TABLE `ProcesosMateriaPrima` (
	`id_proceso_materia_prima` INT NOT NULL,
	`PMP_producto` varchar(255) ,
	`id_ubicacion` INT NOT NULL,
	PRIMARY KEY (`id_proceso_materia_prima`)
);

/*3*/
CREATE TABLE `DetallesEnvioMaqinaria` (
	`id_detalle_envio` INT NOT NULL,
	`DEM_descripcion` varchar(255) ,
	`DEM_fecha` DATETIME ,
	`id_venta_alquiler` INT NOT NULL,
	`id_personal` INT NOT NULL,
	PRIMARY KEY (`id_detalle_envio`)
);

/*4*/
CREATE TABLE `DetalleEnvioMateriaP&P` (
	`id_detalle_envio_PP` INT NOT NULL,
	`DEPP_descripcion` varchar(255) ,
	`DEPP_fecha` DATETIME ,
	`id_transporte_materia_prima` INT NOT NULL,
	`id_transporte_producto` INT NOT NULL,
	`id_personal` INT NOT NULL,
	PRIMARY KEY (`id_detalle_envio_PP`)
);

/*5*/
CREATE TABLE `Ventas&AlquilerMaquinaria` (
	`id_ventas_alquiler` INT NOT NULL,
	`VA_maquinaria` varchar(255) ,
	`id_ubicacion` INT NOT NULL,
	`id_tipo_VA` INT NOT NULL,
	`VA_costo` FLOAT ,
	PRIMARY KEY (`id_ventas_alquiler`)
);
/*6*/
CREATE TABLE `TransportesMateriaPrima` (
	`id_transporte_materia_prima` INT NOT NULL,
	`id_ubicacion` INT NOT NULL,
	`id_materia_prima` INT NOT NULL,
	PRIMARY KEY (`id_transporte_materia_prima`)
);

/*7*/
CREATE TABLE `Ubicaciones` (
	`id_ubicacion` INT NOT NULL,
	`U_descripcion` varchar(255) ,
	PRIMARY KEY (`id_ubicacion`)
);


/*8*/
CREATE TABLE `TransporteDeProductos` (
	`id_transporte_producto` INT NOT NULL,
	`id_producto` INT NOT NULL,
	`id_compania` INT NOT NULL,
	PRIMARY KEY (`id_transporte_producto`)
);
/*9*/
CREATE TABLE `Companias` (
	`id_compania` INT NOT NULL,
	`C_descrpcion` varchar(255) ,
	PRIMARY KEY (`id_compania`)
);

INSERT INTO Companias (id_compania, C_descrpcion) VALUES (1, 'La minera');
INSERT INTO Companias (id_compania, C_descrpcion) VALUES (2, 'Minera MJ');
INSERT INTO Companias (id_compania, C_descrpcion) VALUES (3, 'Extractora JR');

/*10*/
CREATE TABLE `Personal` (
	`id_personal` INT NOT NULL,
	`P_nombre` varchar(255) ,
	`P_apellido` varchar(255) ,
	`P_DPI` INT NOT NULL,
	`P_edad` INT NOT NULL,
	`P_nit` INT ,
	`P_telefono` INT ,
	PRIMARY KEY (`id_personal`)
);

DROP TABLE PERSONAL;

INSERT INTO PERSONAL (id_personal, P_nombre, P_apellido, P_DPI, P_edad, P_nit, P_telefono) VALUES (1, 'Pedro', 'Martinez', 23241234, 23, 32323, 54345654);
INSERT INTO PERSONAL (id_personal, P_nombre, P_apellido, P_DPI, P_edad, P_nit, P_telefono) VALUES (2, 'Juan', 'Perez', 3453123, 22, 534342, 523141541);
INSERT INTO PERSONAL (id_personal, P_nombre, P_apellido, P_DPI, P_edad, P_nit, P_telefono) VALUES (3, 'Esteban', 'Juarez', 54563423, 32, 3251, 34543212);
INSERT INTO PERSONAL (id_personal, P_nombre, P_apellido, P_DPI, P_edad, P_nit, P_telefono) VALUES (4, 'Isidro', 'Mendez', 43574324, 43, 5423, 34321768);
INSERT INTO PERSONAL (id_personal, P_nombre, P_apellido, P_DPI, P_edad, P_nit, P_telefono) VALUES (5, 'Ester', 'Lainez', 76545678, 34, 7678, 54678321);

/*11*/
CREATE TABLE `DetalleServicios` (
	`id_detalle_servicio` INT NOT NULL,
	`id_ubicacion` INT NOT NULL,
	`id_personal` INT NOT NULL,
	`id_servicos` INT NOT NULL,
	`DS_fecha` DATETIME ,
	PRIMARY KEY (`id_detalle_servicio`)
);
/*12*/
CREATE TABLE `TipoVentaAlquiler` (
	`id_tipo_VA` INT NOT NULL,
	`TVA_descripcion` varchar(255) ,
	PRIMARY KEY (`id_tipo_VA`)
);
/*13*/
CREATE TABLE `Productos` (
	`id_producto` INT NOT NULL,
	`P_descripcion` varchar(255) ,
	PRIMARY KEY (`id_producto`)
);
/*14*/
CREATE TABLE `TipoMateriaPrima` (
	`id_materia_prima` INT NOT NULL,
	`MP_descripcion` varchar(255) ,
	PRIMARY KEY (`id_materia_prima`)
);
/*15*/
CREATE TABLE `Vehiculos` (
	`id_vehiculo` INT NOT NULL,
	`V_descripcion` varchar(255),
	PRIMARY KEY (`id_vehiculo`)
);
/*16*/
CREATE TABLE `GPSPagos` (
	`id_gps_pago` INT NOT NULL,
	`GPS_tiempo` TIME,
	`GPS_velocidad_promedio` FLOAT,
	`id_vehiculo` INT,
	`GSP_pago` DECIMAL,
	PRIMARY KEY (`id_gps_pago`)
);
/*17*/
CREATE TABLE `Servicios`(
	`id_servicio` INT NOT NULL,
    `S_descripcion` varchar(255) ,
    PRIMARY KEY (`id_servicio`)
);

CREATE TABLE `Person`(
	`person` INT NOT NULL auto_increment,
    `email` varchar(255) not null,
	`password` varchar(255)not null,
    `first_name` varchar(255) not null,
    `last_name` varchar(255) not null,
    PRIMARY KEY(`person`)
);

CREATE TABLE `TRUCKS_BRANDS`(
	`truck_brand_id` INT NOT NULL auto_increment,
    `truck_brand` varchar(255) not null,
    PRIMARY KEY(`truck_brand_id`)
);

CREATE TABLE `TRUCK_TONS` (
	`truck_ton_id` INT NOT NULL auto_increment,
    `truck_tone_capacity` float,
    primary key (`truck_ton_id`)
);

INSERT INTO TRUCK_TONS (truck_tone_capacity) values (20);
INSERT INTO TRUCKS_BRANDS (truck_brand) values ('Hino');

CREATE TABLE TRUCKS (
	truck_id INT NOT NULL auto_increment,
    truck_brand INT NOT NULL,
    truck_ton INT NOT NULL,
    truck_unique_code varchar(255) not null,
    PRIMARY KEY(truck_id),
    UNIQUE KEY(truck_unique_code)
);


ALTER TABLE TRUCKS ADD CONSTRAINT `FK_TRUCKS_BRAND` FOREIGN KEY (`truck_brand`) REFERENCES `TRUCKS_BRANDS`(`truck_brand_id`);
ALTER TABLE TRUCKS ADD CONSTRAINT `FK_TRUCKS_TON` FOREIGN KEY (`truck_ton`) REFERENCES `TRUCK_TONS`(`truck_ton_id`);

SELECT TKB.truck_brand, TRUCK_UNIQUE_CODE FROM TRUCKS TK INNER JOIN TRUCKS_BRANDS TKB ON TK.truck_brand = TKB.truck_brand_id;

CREATE TABLE DEPARTAMENTOS (
	departament_id INT NOT NULL auto_increment,
    departament_label varchar(255),
    PRIMARY KEY(departament_id)
);

CREATE TABLE TIPO_ALQUILER_TRANSPORTE (
	id_tipo_alquiler INT NOT NULL auto_increment,
    tipo_alquiler_label varchar(255),
    PRIMARY KEY(id_tipo_alquiler)
);

CREATE TABLE ALQUILER_TRANSPORTE (
	id_alquiler_transporte INT NOT NULL auto_increment,
    truck_unique_code varchar(255) NOT NULL,
    id_deparamento INT NOT NULL,
    id_tipo_alquiler INT NOT NULL,
    precio REAL NOT NULL,
    descripcion varchar(255),
    PRIMARY KEY (id_alquiler_transporte)
);

ALTER TABLE `ALQUILER_TRANSPORTE` ADD CONSTRAINT `FK_ALQUILER_TRANSPORTE_TRUCK` FOREIGN KEY (`truck_unique_code`) REFERENCES `TRUCKS`(`truck_unique_code`);
ALTER TABLE `ALQUILER_TRANSPORTE` ADD CONSTRAINT `FK_ALQUILER_TRANSPORTE_TYPE` FOREIGN KEY (`id_tipo_alquiler`) REFERENCES `TIPO_ALQUILER_TRANSPORTE`(`id_tipo_alquiler`);
ALTER TABLE `ALQUILER_TRANSPORTE` ADD CONSTRAINT `FK_ALQUILER_TRANSPORTE_DEPARTAMENTO` FOREIGN KEY (`id_deparamento`) REFERENCES `DEPARTAMENTOS`(`departament_id`);

INSERT INTO COMPANIAS (id_compania, C_descrpcion) VALUES (1, 'Mineria');
INSERT INTO COMPANIAS (id_compania, C_descrpcion) VALUES (2, 'Materia Prima');
INSERT INTO COMPANIAS (id_compania, C_descrpcion) VALUES (3, 'Alquiler maquinaria');
INSERT INTO COMPANIAS (id_compania, C_descrpcion) VALUES (4, 'Construccion');

CREATE TABLE PRESUPUESTOS (
	id_prespuesto INT NOT NULL auto_increment,
    id_compania INT NOT NULL,
    presupuesto real,
    PRIMARY KEY(id_prespuesto)
);

INSERT INTO PRESUPUESTOS(id_compania, presupuesto) VALUES (1, 234500);
INSERT INTO PRESUPUESTOS(id_compania, presupuesto) VALUES (2, 172520);
INSERT INTO PRESUPUESTOS(id_compania, presupuesto) VALUES (3, 573459);
INSERT INTO PRESUPUESTOS(id_compania, presupuesto) VALUES (4, 6584512);

CREATE TABLE TIPOS_MATERIA_PRIMA (
	id_tipo_materia_prima INT NOT NULL auto_increment,
    tipo_matera_prima_label varchar(255),
    primary key(id_tipo_materia_prima)
);

INSERT INTO TIPOS_MATERIA_PRIMA (tipo_matera_prima_label) VALUES ('Block');
INSERT INTO TIPOS_MATERIA_PRIMA (tipo_matera_prima_label) VALUES ('Piso');

CREATE TABLE MATERIAS_PRIMA (
	id_materias_prima INT NOT NULL auto_increment,
    id_tipo_materia_prima INT NOT NULL,
    materia_prima_label varchar(255),
    PRIMARY KEY(id_materias_prima)
);

ALTER TABLE `MATERIAS_PRIMA` ADD CONSTRAINT `FK_TIPO_MATERIAS_PRIMA` FOREIGN KEY (`id_tipo_materia_prima`) REFERENCES `TIPOS_MATERIA_PRIMA`(`id_tipo_materia_prima`);

INSERT INTO MATERIAS_PRIMA (id_tipo_materia_prima, materia_prima_label) VALUES (1, 'cemento');
INSERT INTO MATERIAS_PRIMA (id_tipo_materia_prima, materia_prima_label) VALUES (1, 'arena');
INSERT INTO MATERIAS_PRIMA (id_tipo_materia_prima, materia_prima_label) VALUES (1, 'calizos');

INSERT INTO MATERIAS_PRIMA (id_tipo_materia_prima, materia_prima_label) VALUES (2, 'Puzolánico');
INSERT INTO MATERIAS_PRIMA (id_tipo_materia_prima, materia_prima_label) VALUES (2, 'Arena');
INSERT INTO MATERIAS_PRIMA (id_tipo_materia_prima, materia_prima_label) VALUES (2, 'cemento');
INSERT INTO MATERIAS_PRIMA (id_tipo_materia_prima, materia_prima_label) VALUES (2, 'Pigmento');

SELECT id_materias_prima, materia_prima_label FROM MATERIAS_PRIMA WHERE id_tipo_materia_prima = 2;

ALTER TABLE `PRESUPUESTOS` ADD CONSTRAINT `FK_COMPANIA` FOREIGN KEY (`id_compania`) REFERENCES `cOMPANIAS`(`id_compania`);

ALTER TABLE `GPSPagos` ADD CONSTRAINT `GPSPagos_fk0` FOREIGN KEY (`id_vehiculo`) REFERENCES `Vehiculos`(`id_vehiculo`);


ALTER TABLE `Ventas&AlquilerMaquinaria` ADD CONSTRAINT `Ventas&AlquilerMaquinaria_fk0` FOREIGN KEY (`id_ubicacion`) REFERENCES `Ubicaciones`(`id_ubicacion`);


ALTER TABLE `Ventas&AlquilerMaquinaria` ADD CONSTRAINT `Ventas&AlquilerMaquinaria_fk1` FOREIGN KEY (`id_tipo_VA`) REFERENCES `TipoVentaAlquiler`(`id_tipo_VA`);


ALTER TABLE `TransportesMateriaPrima` ADD CONSTRAINT `TransportesMateriaPrima_fk0` FOREIGN KEY (`id_ubicacion`) REFERENCES `Ubicaciones`(`id_ubicacion`);


ALTER TABLE `TransportesMateriaPrima` ADD CONSTRAINT `TransportesMateriaPrima_fk1` FOREIGN KEY (`id_materia_prima`) REFERENCES `TipoMateriaPrima`(`id_materia_prima`);


ALTER TABLE `TransporteDeProductos` ADD CONSTRAINT `TransporteDeProductos_fk0` FOREIGN KEY (`id_producto`) REFERENCES `Productos`(`id_producto`);


ALTER TABLE `TransporteDeProductos` ADD CONSTRAINT `TransporteDeProductos_fk1` FOREIGN KEY (`id_compania`) REFERENCES `Companias`(`id_compania`);


ALTER TABLE `DetalleServicios` ADD CONSTRAINT `DetalleServicios_fk0` FOREIGN KEY (`id_ubicacion`) REFERENCES `Ubicaciones`(`id_ubicacion`);


ALTER TABLE `DetalleServicios` ADD CONSTRAINT `DetalleServicios_fk1` FOREIGN KEY (`id_personal`) REFERENCES `Personal`(`id_personal`);


ALTER TABLE `DetalleServicios` ADD CONSTRAINT `DetalleServicios_fk2` FOREIGN KEY (`id_servico`) REFERENCES `Servicios`(`id_servicio`);


ALTER TABLE `PlantasMinerales` ADD CONSTRAINT `PlantasMinerales_fk0` FOREIGN KEY (`id_ubicacion`) REFERENCES `Ubicaciones`(`id_ubicacion`);


ALTER TABLE `ProcesosMateriaPrima` ADD CONSTRAINT `ProcesosMateriaPrima_fk0` FOREIGN KEY (`id_ubicacion`) REFERENCES `Ubicaciones`(`id_ubicacion`);


ALTER TABLE `DetallesEnvioMaqinaria` ADD CONSTRAINT `DetallesEnvioMaqinaria_fk0` FOREIGN KEY (`id_venta_alquiler`) REFERENCES `Ventas&AlquilerMaquinaria`(`id_ventas_alquiler`);


ALTER TABLE `DetallesEnvioMaqinaria` ADD CONSTRAINT `DetallesEnvioMaqinaria_fk1` FOREIGN KEY (`id_personal`) REFERENCES `Personal`(`id_personal`);


ALTER TABLE `DetalleEnvioMateriaP&P` ADD CONSTRAINT `DetalleEnvioMateriaP&P_fk0` FOREIGN KEY (`id_transporte_materia_prima`) REFERENCES `TransportesMateriaPrima`(`id_transporte_materia_prima`);


ALTER TABLE `DetalleEnvioMateriaP&P` ADD CONSTRAINT `DetalleEnvioMateriaP&P_fk1` FOREIGN KEY (`id_transporte_producto`) REFERENCES `TransporteDeProductos`(`id_transporte_producto`);


ALTER TABLE `DetalleEnvioMateriaP&P` ADD CONSTRAINT `DetalleEnvioMateriaP&P_fk2` FOREIGN KEY (`id_personal`) REFERENCES `Personal`(`id_personal`);


ALTER TABLE `Ubicaciones` ADD CONSTRAINT `Ubicaciones_fk0` FOREIGN KEY (`id_compania`) REFERENCES `Companias`(`id_compania`);














