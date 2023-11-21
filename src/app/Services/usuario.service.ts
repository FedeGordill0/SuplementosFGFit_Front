import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../Models/login';
import { JwtAuth } from '../Models/jwt-auth';
import { environment } from 'src/environments/environment';
import { Usuario } from '../Models/usuario';

@Injectable()
export class UsuarioService {
  api_usuario = environment.api_url;
  // https://localhost:7084/api/Usuario/Autenticar
  constructor(private http: HttpClient) {}

  getUsuarioID(id: number): Observable<Usuario> {
    // https://localhost:7084/api/Categoria/Categoria/id:int?id= id
    return this.http.get<Usuario>(`${this.api_usuario}/Usuario/${id}`);
  }

  loginUsuario(usuario: Login): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(
      `${this.api_usuario}/Usuario/Autenticar`,
      usuario
    );
  }

  obtenerRolUsuario(usuarioId: number): Observable<Usuario> {
    return this.http.get<Usuario>(
      `${this.api_usuario}/Usuario/obtener-roles?usuarioId=${usuarioId}`
    );
  }
  postUsuario(u: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.api_usuario}/Usuario`, u);
  }
}
