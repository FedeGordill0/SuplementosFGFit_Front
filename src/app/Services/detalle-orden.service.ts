import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DetalleOrden } from '../Models/detalle-orden';
import { Observable } from 'rxjs';

@Injectable()
export class DetalleOrdenService {
  api_orden = environment.api_url;
  // https://localhost:7084/api

  constructor(private http: HttpClient) {}

  getDetallesOrdenesCompra(): Observable<DetalleOrden[]> {
    return this.http.get<DetalleOrden[]>(`${this.api_orden}/DetalleOrden`);
  }

  getDetalleOrdenID(id: number): Observable<DetalleOrden> {
    return this.http.get<DetalleOrden>(`${this.api_orden}/DetalleOrden/${id}`);
  }

  postDetalleOrden(d: DetalleOrden): Observable<DetalleOrden> {
    return this.http.post<DetalleOrden>(`${this.api_orden}/DetalleOrden`, d);
  }
}
