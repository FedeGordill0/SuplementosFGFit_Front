create database SuplementosFGFit USE SuplementosFGFit CREATE TABLE Categorias(
  id_categoria int identity not null,
  descripcion varchar(100) not null,
  nombre varchar(50) not null,
  estado bit not null CONSTRAINT pk_categoria PRIMARY KEY (id_categoria)
) CREATE TABLE Estado_OrdenCompra(
  id_estado_orden int identity not null,
  estado bit constraint pk_estado_Orden_Compra primary key(id_estado_orden)
)
ALTER TABLE Estado_OrdenCompra
ALTER COLUMN estado varchar(50) --select * from Estado_OrdenCompra
  --insert into Estado_OrdenCompra values('Pendiente')
  --insert into Estado_OrdenCompra values('Rechazada')
  --insert into Estado_OrdenCompra values('Aceptada')
  create table Formas_Envio(
    id_forma_envio int identity not null,
    descripcion varchar(100) not null,
    estado bit not null,
    nombre varchar(100) not null,
    precio numeric not null constraint pk_forma_envio primary key(id_forma_envio)
  ) create table Formas_Pago(
    id_forma_pago int identity not null,
    descripcion varchar(100) not null,
    estado bit,
    nombre varchar(100) not null,
    porcentaje numeric not null constraint pk_forma_pago primary key(id_forma_pago)
  ) create TABLE Unidades_Medida(
    id_unidad_medida int identity not null,
    descripcion varchar(50) not null,
    estado bit,
    nombre varchar(100) not null,
    constraint pk_unidad_medida primary key(id_unidad_medida)
  ) CREATE TABLE Roles(
    id_rol int identity not null,
    descripcion varchar(50) not null,
    rol varchar(50) not null,
    constraint pk_rol primary key(id_rol)
  ) create table Usuarios(
    id_usuario int identity not null,
    email varchar(100) not null,
    password varchar(50) not null,
    id_rol int constraint pk_usuario primary key(id_usuario) constraint fk_usuario_rol foreign key(id_rol) references Roles(id_rol)
  ) create table UsuariosXRoles(
    id_usuario_rol int identity not null,
    id_usuario int,
    id_rol int constraint pk_usuario_rol primary key(id_usuario_rol),
    constraint fk_usuario_rol_usuario foreign key(id_usuario) references Usuarios(id_usuario),
    constraint fk_usuario_rol_rol foreign key(id_rol) references Roles(id_rol)
  ) --insert into UsuariosXRoles values(1,1)
  --select * from UsuariosXRoles
  CREATE TABLE HistorialRefreshToken(
    IdHistorialToken int primary key identity,
    id_usuario int references Usuarios(id_usuario),
    Token varchar(500),
    RefreshToken varchar (200),
    FechaCreacion datetime,
    FechaExpiracion datetime,
    EsActivo AS (
      iif(
        FechaExpiracion < getdate(),
        convert (bit, 0),
        convert (bit, 1)
      )
    ) --columna calculada
  ) --insert into Usuarios values('admin','1234',1)
  --insert into Roles values('Administrador','Administrador')
  --insert into Roles values('Usuario','Usuario')
  --select * from Usuarios u join Roles r on r.id_rol = u.id_rol where r.descripcion = 'Administrador'
  create table Proveedores(
    id_proveedor int identity not null,
    cuit varchar (50) not null,
    direccion varchar(50) not null,
    email varchar(100) not null,
    estado bit,
    nombre varchar(50) not null,
    telefono varchar(50) not null,
    --id_area int
    constraint pk_proveedor primary key(id_proveedor) --constraint fk_proveedor_area foreign key(id_area) references Areas(id_area)
  ) create table ProveedoresXFormaEnvio(
    id_proveedor_forma_envio int identity not null,
    id_proveedor int,
    id_forma_envio int constraint pk_proveedor_forma_envio primary key(id_proveedor_forma_envio),
    constraint fk_proveedor_forma_envio_proveedor foreign key(id_proveedor) references Proveedores (id_proveedor),
    constraint fk_proveedor_forma_envio_forma_envio foreign key(id_forma_envio) references Formas_Envio (id_forma_envio)
  )
select *
from Proveedores
select *
from Formas_Envio
select *
from ProveedoresXFormaEnvio --insert into ProveedoresXFormaEnvio values(1,1)
  --insert into ProveedoresXFormaEnvio values(1,2)
  --insert into ProveedoresXFormaEnvio values(5,1)
  --insert into ProveedoresXFormaEnvio values(5,2)
select *
from Proveedores
select *
from Formas_Pago
select *
from ProveedoresXFormaPago --insert into ProveedoresXFormaPago values(1,1)
  --insert into ProveedoresXFormaPago values(1,2)
  --insert into ProveedoresXFormaPago values(1,3)
  --insert into ProveedoresXFormaPago values(5,1)
  --insert into ProveedoresXFormaPago values(5,2)
  create table ProveedoresXFormaPago(
    id_proveedor_forma_pago int identity not null,
    id_proveedor int,
    id_forma_pago int constraint pk_proveedor_forma_pago primary key(id_proveedor_forma_pago),
    constraint fk_proveedor_forma_pago_proveedor foreign key(id_proveedor) references Proveedores (id_proveedor),
    constraint fk_proveedor_forma_pago_forma_pago foreign key(id_forma_pago) references Formas_Pago(id_forma_pago)
  ) create table Productos(
    id_producto int identity not null,
    descripcion varchar(100) not null,
    estado bit,
    imagen varchar(1000) not null,
    marca varchar(100) not null,
    nombre varchar(100) not null,
    id_categoria int,
    id_unidad_medida int,
    fechaVencimiento DateTime constraint pk_producto primary key(id_producto),
    constraint fk_producto_categoria foreign key(id_categoria) references Categorias (id_categoria),
    constraint fk_producto_unidad_medida foreign key(id_unidad_medida) references Unidades_Medida(id_unidad_medida)
  )
ALTER TABLE Productos
ALTER COLUMN fechaVencimiento DateTime null
select *
from Productos create table ProductosXProveedores(
    id_producto_proveedor int identity not null,
    estado bit,
    precio numeric,
    id_producto int,
    id_proveedor int constraint pk_producto_proveedor primary key(id_producto_proveedor),
    constraint fk_producto_proveedor_producto foreign key(id_producto) references Productos (id_producto),
    constraint fk_producto_proveedor_proveedor foreign key(id_proveedor) references Proveedores (id_proveedor)
  ) create table Ordenes_Compra(
    id_orden_compra int identity not null,
    fecha_registro Datetime,
    id_estado_orden int,
    --estado orden compra
    id_forma_envio int,
    id_forma_pago int,
    id_proveedor int constraint pk_orden_compra primary key(id_orden_compra),
    constraint fk_orden_compra_estado_orden_compra foreign key(id_estado_orden) references Estado_OrdenCompra (id_estado_orden),
    constraint fk_orden_compra_forma_envio foreign key(id_forma_envio) references Formas_Envio (id_forma_envio),
    constraint fk_orden_compra_forma_pago foreign key(id_forma_pago) references Formas_Pago (id_forma_pago),
    constraint fk_orden_compra_proveedor foreign key(id_proveedor) references Proveedores (id_proveedor)
  ) --insert into Ordenes_Compra values(GETDATE(),1,1,1,10)
  --select * from Ordenes_Compra
  create Table Detalle_Orden(
    id_detalle int identity not null,
    cantidad numeric,
    precio numeric,
    id_orden_compra int,
    id_producto int constraint pk_detalle primary key(id_detalle),
    constraint fk_detalle_orden_compra foreign key(id_orden_compra) references Ordenes_Compra (id_orden_compra),
    constraint fk_detalle_producto foreign key(id_producto) references Productos (id_producto)
  )
