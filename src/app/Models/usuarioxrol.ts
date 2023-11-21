import { Rol } from './rol';
import { Usuario } from './usuario';

export class Usuarioxrol {
  idUsuarioRol: number;
  idUsuario: number;
  idRol: number;

  idRolNavigation: any;
  rol?: Rol;

  idUsuarioNavigation: any;
  usuario?: Usuario;
}
