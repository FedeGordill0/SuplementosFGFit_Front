import { OrdenCompra } from './orden-compra';
import { Producto } from './producto';

export class DetalleOrden {
  idDetalle: number;
  cantidad: number;
  precio: number;
  idOrdenCompra: number;
  idProducto: number;

  idOrdenCompraNavigation: any;
  ordenCompra?: OrdenCompra;

  idProductoNavigation: any;
  producto?: Producto;
  totalProducto?: number;
}
