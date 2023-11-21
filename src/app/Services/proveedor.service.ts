import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proveedor } from '../Models/proveedor';

@Injectable()
export class ProveedorService {
  api_proveedor = environment.api_url;
  // "https://localhost:7084/api"

  constructor(private http: HttpClient) {}

  getProveedores(): Observable<Proveedor[]> {
    // https://localhost:7084/api/Proveedor
    return this.http.get<Proveedor[]>(`${this.api_proveedor}/Proveedor`);
  }

  // https://localhost:7084/api/Proveedor/id
  getProveedorID(id: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.api_proveedor}/Proveedor/${id}`);
  }

  postProveedor(proveedor: Proveedor): Observable<Proveedor> {
    // https://localhost:7084/api/Proveedor
    return this.http.post<Proveedor>(
      `${this.api_proveedor}/Proveedor`,
      proveedor
    );
  }

  deleteProveedor(proveedor: Proveedor): Observable<any> {
    // https://localhost:7084/api/Proveedor/ id
    return this.http.delete(
      `${this.api_proveedor}/Proveedor/` + proveedor.idProveedor
    );
  }

  putProveedor(proveedor: Proveedor): Observable<Proveedor> {
    // https://localhost:7084/api/Proveedor/
    return this.http.put<Proveedor>(
      `${this.api_proveedor}/Proveedor/${proveedor.idProveedor}`,
      proveedor
    );
  }
}
