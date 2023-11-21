import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UnidadMedida } from '../Models/unidad-medida';

@Injectable()
export class UnidadMedidaService {
  api_unidad = environment.api_url;
  // https://localhost:7084/api

  constructor(private http: HttpClient) {}

  getUnidadMedidas(): Observable<UnidadMedida[]> {
    // https://localhost:7084/api/UnidadesMedida
    return this.http.get<UnidadMedida[]>(`${this.api_unidad}/UnidadesMedida`);
  }

  getUnidadMedidaID(id: number): Observable<UnidadMedida> {
    // https://localhost:7084/api/UnidadesMedida/id:int?id=1
    return this.http.get<UnidadMedida>(
      `${this.api_unidad}/UnidadesMedida/id:int?id=` + id
    );
  }

  postUnidadMedida(u: UnidadMedida): Observable<UnidadMedida> {
    // https://localhost:7084/api/UnidadesMedida
    return this.http.post<UnidadMedida>(`${this.api_unidad}/UnidadesMedida`, u);
  }

  deleteUnidadMedida(u: UnidadMedida): Observable<any> {
    // https://localhost:7084/api/UnidadesMedida/ id
    return this.http.delete(
      `${this.api_unidad}/UnidadesMedida/` + u.idUnidadMedida
    );
  }

  putUnidadMedida(u: UnidadMedida): Observable<UnidadMedida> {
    // https://localhost:7084/api/UnidadesMedida/ id
    return this.http.put<UnidadMedida>(
      `${this.api_unidad}/UnidadesMedida/` + u.idUnidadMedida,
      u
    );
  }
}
