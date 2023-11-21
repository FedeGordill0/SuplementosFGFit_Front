import { EstadoOrdenCompra } from './estado-orden-compra';
import { FormaEnvio } from './forma-envio';
import { FormaPago } from './forma-pago';
import { Proveedor } from './proveedor';

export class OrdenCompra {
  idOrdenCompra: number;
  fechaRegistro: Date;
  idEstadoOrden: number;
  idFormaEnvio: number;
  idFormaPago: number;
  idProveedor: number;

  detalleOrdens: any;

  idEstadoOrdenNavigation: any;
  estadoOrden?: EstadoOrdenCompra;

  idFormaEnvioNavigation: any;
  formaEnvio?: FormaEnvio;

  idFormaPagoNavigation: any;
  formaPago?: FormaPago;

  idProveedorNavigation: any;
  proveedor?: Proveedor;
}
