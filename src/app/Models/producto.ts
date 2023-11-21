import { Categoria } from './categoria';
import { ProductoXProveedor } from './producto-xproveedor';
import { UnidadMedida } from './unidad-medida';

export class Producto {
  idProducto: number;
  nombre: string;
  descripcion: string;
  marca: string;
  imagen: string;
  estado: boolean;

  idCategoriaNavigation: any;
  categoria?: Categoria;

  idUnidadMedidaNavigation: any;
  unidad_medida?: UnidadMedida;

  productosXproveedores: ProductoXProveedor[];
  detalleOrdens: any;

  fechaVencimiento: Date;
}
