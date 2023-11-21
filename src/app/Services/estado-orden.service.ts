import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EstadoOrdenCompra } from '../Models/estado-orden-compra';

@Injectable()
export class EstadoOrdenService {
  api_orden = environment.api_url;
  // https://localhost:7084/api

  constructor(private http: HttpClient) {}

  getEstadoOrdenesCompra(): Observable<EstadoOrdenCompra[]> {
    return this.http.get<EstadoOrdenCompra[]>(`${this.api_orden}/EstadoOrden`);
  }

  getEstadoOrdenID(id: number): Observable<EstadoOrdenCompra> {
    return this.http.get<EstadoOrdenCompra>(
      `${this.api_orden}/EstadoOrden/id:int?id=${id}`
    );
  }
}
