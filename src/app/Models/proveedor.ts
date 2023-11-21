import { ProductoXProveedor } from './producto-xproveedor';
import { ProveedorXformaEnvio } from './proveedor-xforma-envio';
import { ProveedorXFormaPago } from './proveedor-xforma-pago';

export class Proveedor {
  idProveedor: number;
  nombre: string;
  direccion: string;
  telefono: number;
  cuit: number;
  email: string;
  estado: boolean;

  ordenesCompras: any;
  formasEnvioIds: number[];
  formasPagoIds: number[];
  productosIds: number[];
  productosXproveedores: ProductoXProveedor[] = [];
  proveedoresXformaEnvios: ProveedorXformaEnvio[] = [];
  proveedoresXformaPagos: ProveedorXFormaPago[] = [];
  productosPrecios: any;
}
