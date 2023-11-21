import { Producto } from './producto';
import { Proveedor } from './proveedor';

export class ProductoXProveedor {
  idProductoProveedor: number;
  estado: boolean;
  precio: number;

  idProductoNavigation: any;
  producto?: Producto;

  idProveedorNavigation: any;
  proveedor?: Proveedor;

  idProveedor: number;
  idProducto: number;
  isSelected: boolean;
}
