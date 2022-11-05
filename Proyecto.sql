CREATE DATABASE dw22;
use dw22;
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
	`id_compania` INT NOT NULL,
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
/*10*/
CREATE TABLE `Personal` (
	`id_personal` INT NOT NULL,
	`P_nombre` varchar(255) ,
	`P_apellido` varchar(255) ,
	`P_DPI` varchar(255) ,
	`P_edad` varchar(255) ,
	`P_nit` INT ,
	`P_telefono` INT ,
	PRIMARY KEY (`id_personal`)
);
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














