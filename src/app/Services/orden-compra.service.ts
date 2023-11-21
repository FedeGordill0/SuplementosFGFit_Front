import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrdenCompra } from '../Models/orden-compra';
import { Observable } from 'rxjs';

@Injectable()
export class OrdenCompraService {
  api_orden = environment.api_url;
  // https://localhost:7084/api

  constructor(private http: HttpClient) {}

  getOrdenesCompra(): Observable<OrdenCompra[]> {
    return this.http.get<OrdenCompra[]>(`${this.api_orden}/OrdenCompra`);
  }

  getOrdenCompraID(id: number): Observable<OrdenCompra> {
    return this.http.get<OrdenCompra>(
      `${this.api_orden}/OrdenCompra/id:int?id=${id}`
    );
  }

  postOrdenCompra(o: OrdenCompra): Observable<OrdenCompra> {
    return this.http.post<OrdenCompra>(`${this.api_orden}/OrdenCompra`, o);
  }
  putOrdenCompra(o: OrdenCompra): Observable<OrdenCompra> {
    return this.http.put<OrdenCompra>(
      `${this.api_orden}/OrdenCompra/${o.idOrdenCompra}`,
      o
    );
  }
}
