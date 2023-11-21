import { FormaEnvio } from './forma-envio';
import { Proveedor } from './proveedor';

export class ProveedorXformaEnvio {
  idProveedorFormaEnvio: number;
  idProveedor: number;
  idFormaEnvio: number;

  idFormaEnvioNavigation: any;
  formaEnvio?: FormaEnvio;

  idProveedorNavigation: any;
  proveedor?: Proveedor;
}
