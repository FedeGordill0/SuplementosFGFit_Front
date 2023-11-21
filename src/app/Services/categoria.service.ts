import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../Models/categoria';

@Injectable()
export class CategoriaService {
  api_categoria = environment.api_url;
  // https://localhost:7084/api

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<Categoria[]> {
    // https://localhost:7084/api/Categoria
    return this.http.get<Categoria[]>(`${this.api_categoria}/Categoria`);
  }

  getCategoriaID(id: number): Observable<Categoria> {
    // https://localhost:7084/api/Categoria/Categoria/id:int?id= id
    return this.http.get<Categoria>(
      `${this.api_categoria}/Categoria/id:int?id=` + id
    );
  }

  postCategoria(c: Categoria): Observable<Categoria> {
    // https://localhost:7084/api/Categoria
    return this.http.post<Categoria>(`${this.api_categoria}/Categoria`, c);
  }

  deleteCategoria(c: Categoria): Observable<any> {
    // https://localhost:7084/api/Categoria/ id
    return this.http.delete(`${this.api_categoria}/Categoria/` + c.idCategoria);
  }

  putCategoria(c: Categoria): Observable<Categoria> {
    // https://localhost:7084/api/Categoria/ id
    return this.http.put<Categoria>(
      `${this.api_categoria}/Categoria/` + c.idCategoria,
      c
    );
  }
}
