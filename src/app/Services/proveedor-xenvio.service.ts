import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProveedorXformaEnvio } from '../Models/proveedor-xforma-envio';

@Injectable()
export class ProveedorXformaEnvioService {
  private api_url: string = environment.api_url;
  // 'https://localhost:7107/api'

  constructor(private http: HttpClient) {}

  getProveedoresFormasEnvio(): Observable<ProveedorXformaEnvio[]> {
    return this.http.get<ProveedorXformaEnvio[]>(
      `${this.api_url}/ProveedorXFormaEnvio`
    );
  }

  getProveedorFormaEnvioID(
    idProveedor: number,
    idFormaEnvio: number
  ): Observable<ProveedorXformaEnvio> {
    // https://localhost:7084/api/Producto/id:int?id= + id
    return this.http.get<ProveedorXformaEnvio>(
      `${this.api_url}/ProveedorxFormaEnvio/GetProveedorFormaEnvioID?idProveedor=${idProveedor}&idFormaEnvio=${idFormaEnvio}`
    );
  }
  getListadoProveedorFormaEnvioID(
    id: number
  ): Observable<ProveedorXformaEnvio> {
    // https://localhost:7084/api/Producto/id:int?id= + id
    return this.http.get<ProveedorXformaEnvio>(
      `${this.api_url}/ProveedorXFormaEnvio/id:int?id=` + id
    );
  }

  postProveedorFormaEnvio(
    p: ProveedorXformaEnvio
  ): Observable<ProveedorXformaEnvio> {
    return this.http.post<ProveedorXformaEnvio>(
      `${this.api_url}/ProveedorXFormaEnvio`,
      p
    );
  }

  deleteProveedorFormaEnvio(p: ProveedorXformaEnvio): Observable<any> {
    return this.http.delete(
      `${this.api_url}/ProveedorXFormaEnvio/${p.idProveedorFormaEnvio}`
    );
  }

  putProveedorFormaEnvio(
    p: ProveedorXformaEnvio
  ): Observable<ProveedorXformaEnvio> {
    return this.http.put<ProveedorXformaEnvio>(
      `${this.api_url}/ProveedorXformaEnvio/${p.idProveedorFormaEnvio}`,
      p
    );
  }
}
