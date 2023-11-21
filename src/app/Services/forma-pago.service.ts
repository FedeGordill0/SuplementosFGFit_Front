import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FormaPago } from '../Models/forma-pago';

@Injectable()
export class FormaPagoService {
  api_formas = environment.api_url;
  // https://localhost:7084/api

  constructor(private http: HttpClient) {}

  getFormasPago(): Observable<FormaPago[]> {
    // https://localhost:7084/api/FormasPago
    return this.http.get<FormaPago[]>(`${this.api_formas}/FormasPago`);
  }

  getFormaPagoID(id: number): Observable<FormaPago> {
    //https://localhost:7084/api/FormaPago/id:int?id=1
    return this.http.get<FormaPago>(
      `${this.api_formas}/FormasPago/id:int?id=` + id
    );
  }

  postFormaPago(f: FormaPago): Observable<FormaPago> {
    // https://localhost:7084/api/FormaPago
    return this.http.post<FormaPago>(`${this.api_formas}/FormasPago`, f);
  }

  deleteFormaPago(f: FormaPago): Observable<any> {
    // https://localhost:7084/api/FormaPago/ id
    return this.http.delete(`${this.api_formas}/FormasPago/` + f.idFormaPago);
  }

  putFormaPago(f: FormaPago): Observable<FormaPago> {
    // https://localhost:7084/api/FormaPago/ id
    return this.http.put<FormaPago>(
      `${this.api_formas}/FormasPago/` + f.idFormaPago,
      f
    );
  }
}
