import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { FormaEnvio } from '../Models/forma-envio';

@Injectable()
export class FormaEnvioService {
  api_formas = environment.api_url;
  // https://localhost:7084/api

  constructor(private http: HttpClient) {}

  getFormasEnvio(): Observable<FormaEnvio[]> {
    // https://localhost:7084/api/FormasEnvio
    return this.http.get<FormaEnvio[]>(`${this.api_formas}/FormasEnvio`);
  }

  getFormaEnvioID(id: number): Observable<FormaEnvio> {
    //https://localhost:7084/api/FormasEnvio/id:int?id=1
    return this.http.get<FormaEnvio>(
      `${this.api_formas}/FormasEnvio/id:int?id=${id}`
    );
  }

  postFormaEnvio(f: FormaEnvio): Observable<FormaEnvio> {
    // https://localhost:7084/api/FormasEnvio
    return this.http.post<FormaEnvio>(`${this.api_formas}/FormasEnvio`, f);
  }

  deleteFormaEnvio(f: FormaEnvio): Observable<any> {
    // https://localhost:7084/api/FormasEnvio/ id
    return this.http.delete(`${this.api_formas}/FormasEnvio/` + f.idFormaEnvio);
  }

  putFormaEnvio(f: FormaEnvio): Observable<FormaEnvio> {
    // https://localhost:7084/api/FormaEnvio/ id
    return this.http.put<FormaEnvio>(
      `${this.api_formas}/FormasEnvio/` + f.idFormaEnvio,
      f
    );
  }
}
