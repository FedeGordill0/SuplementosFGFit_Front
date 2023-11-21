import { FormaPago } from './forma-pago';
import { Proveedor } from './proveedor';

export class ProveedorXFormaPago {
  idProveedorFormaPago: number;
  idProveedor: number;
  idFormaPago: number;

  idFormaPagoNavigation: any;
  formaPago?: FormaPago;

  idProveedorNavigation: any;
  proveedor?: Proveedor;
}
