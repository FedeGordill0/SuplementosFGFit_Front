import { ProveedorXformaEnvio } from './proveedor-xforma-envio';

export class FormaEnvio {
  idFormaEnvio: number;
  descripcion: string;
  estado: boolean;
  nombre: string;
  precio: number;

  proveedoresXformaEnvios: ProveedorXformaEnvio[];
}
