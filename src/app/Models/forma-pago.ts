import { ProveedorXFormaPago } from './proveedor-xforma-pago';

export class FormaPago {
  idFormaPago: number;
  descripcion: string;
  estado: boolean;
  nombre: string;
  porcentaje: number;
  proveedoresXformaPagos: ProveedorXFormaPago[];
}
