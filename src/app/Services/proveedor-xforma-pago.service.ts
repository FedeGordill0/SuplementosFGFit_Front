import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProveedorXFormaPago } from '../Models/proveedor-xforma-pago';

@Injectable()
export class ProveedorXFormaPagoService {
  private api_url: string = environment.api_url;
  // 'https://localhost:7107/api'

  constructor(private http: HttpClient) {}

  getProveedoresFormasPago(): Observable<ProveedorXFormaPago[]> {
    return this.http.get<ProveedorXFormaPago[]>(
      `${this.api_url}/ProveedorXFormaPago`
    );
  }

  getProveedorFormaPagoID(
    idProveedor: number,
    idFormaPago: number
  ): Observable<ProveedorXFormaPago> {
    // https://localhost:7084/api/Producto/id:int?id= + id
    return this.http.get<ProveedorXFormaPago>(
      `${this.api_url}/ProveedorxFormaPago/GetProveedorFormaPagoID?idProveedor=${idProveedor}&idFormaPago=${idFormaPago}`
    );
  }
  getListadoProveedorFormaPagoID(id: number): Observable<ProveedorXFormaPago> {
    // https://localhost:7084/api/Producto/id:int?id= + id
    return this.http.get<ProveedorXFormaPago>(
      `${this.api_url}/ProveedorXFormaPago/id:int?id=` + id
    );
  }

  postProveedorFormaPago(
    p: ProveedorXFormaPago
  ): Observable<ProveedorXFormaPago> {
    return this.http.post<ProveedorXFormaPago>(
      `${this.api_url}/ProveedorXFormaPago`,
      p
    );
  }

  deleteProveedorFormaPago(p: ProveedorXFormaPago): Observable<any> {
    return this.http.delete(
      `${this.api_url}/ProveedorXFormaPago/${p.idProveedorFormaPago}`
    );
  }

  putProveedorFormaPago(
    p: ProveedorXFormaPago
  ): Observable<ProveedorXFormaPago> {
    return this.http.put<ProveedorXFormaPago>(
      `${this.api_url}/ProveedorXFormaPago/${p.idProveedorFormaPago}`,
      p
    );
  }
}
