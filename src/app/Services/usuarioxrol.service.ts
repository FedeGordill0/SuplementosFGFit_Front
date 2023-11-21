import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuarioxrol } from '../Models/usuarioxrol';
import { Observable } from 'rxjs';

@Injectable()
export class UsuarioxrolService {
  api_usuario_rol = environment.api_url;
  // https://localhost:7084/api/UsuarioXRol/Autenticar
  constructor(private http: HttpClient) {}

  getUsuariosRoles(): Observable<Usuarioxrol[]> {
    return this.http.get<Usuarioxrol[]>(`${this.api_usuario_rol}/UsuarioXRol`);
  }

  getUsuarioRolID(id: number): Observable<Usuarioxrol> {
    return this.http.get<Usuarioxrol>(
      `${this.api_usuario_rol}/UsuarioXRol/${id}`
    );
  }
}
