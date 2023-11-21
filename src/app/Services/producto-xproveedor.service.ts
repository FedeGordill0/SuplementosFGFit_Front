import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductoXProveedor } from '../Models/producto-xproveedor';
import { Observable } from 'rxjs';

@Injectable()
export class ProductoXproveedorService {
  api_productoXProveedor = environment.api_url;
  // "https://localhost:7084/api"

  constructor(private http: HttpClient) {}

  getProductosXProveedores(): Observable<ProductoXProveedor[]> {
    // https://localhost:7084/api/Producto
    return this.http.get<ProductoXProveedor[]>(
      `${this.api_productoXProveedor}/ProductoXProveedor`
    );
  }

  getProductoXProveedorID(
    idProveedor: number,
    idProducto: number
  ): Observable<ProductoXProveedor> {
    // https://localhost:7084/api/Producto/id:int?id= + id
    return this.http.get<ProductoXProveedor>(
      `${this.api_productoXProveedor}/ProductoXProveedor/GetIDProductoProveedor?idProveedor=${idProveedor}&idProducto=${idProducto}`
    );
  }

  getListadoProductosProveedorID(id: number): Observable<ProductoXProveedor> {
    // https://localhost:7084/api/Producto/id:int?id= + id
    return this.http.get<ProductoXProveedor>(
      `${this.api_productoXProveedor}/ProductoXProveedor/id:int?id=` + id
    );
  }

  postProductoProveedor(p: ProductoXProveedor): Observable<ProductoXProveedor> {
    // https://localhost:7084/api/Producto
    return this.http.post<ProductoXProveedor>(
      `${this.api_productoXProveedor}/ProductoXProveedor`,
      p
    );
  }

  deleteProductoProveedor(p: ProductoXProveedor): Observable<any> {
    // https://localhost:7084/api/Producto/ id
    return this.http.delete(
      `${this.api_productoXProveedor}/ProductoXProveedor/` +
        p.idProductoProveedor
    );
  }

  putProductoProveedor(p: ProductoXProveedor): Observable<ProductoXProveedor> {
    // https://localhost:7084/api/Producto/
    return this.http.put<ProductoXProveedor>(
      `${this.api_productoXProveedor}/ProductoXProveedor/` +
        p.idProductoProveedor,
      p
    );
  }
}
