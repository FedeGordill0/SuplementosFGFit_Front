import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../Models/producto';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductoService {
  api_producto = environment.api_url;
  // "https://localhost:7084/api"

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    // https://localhost:7084/api/Producto
    return this.http.get<Producto[]>(`${this.api_producto}/Producto`);
  }

  getProductoID(id: number): Observable<Producto> {
    // https://localhost:7084/api/Producto/id:int?id= + id
    return this.http.get<Producto>(
      `${this.api_producto}/Producto/id:int?id=` + id
    );
  }

  postProducto(producto: Producto): Observable<Producto> {
    // https://localhost:7084/api/Producto
    return this.http.post<Producto>(`${this.api_producto}/Producto`, producto);
  }

  deleteProducto(producto: Producto): Observable<any> {
    // https://localhost:7084/api/Producto/ id
    return this.http.delete(
      `${this.api_producto}/Producto/` + producto.idProducto
    );
  }

  putProducto(producto: Producto): Observable<Producto> {
    // https://localhost:7084/api/Producto/
    return this.http.put<Producto>(
      `${this.api_producto}/Producto/` + producto.idProducto,
      producto
    );
  }
}
