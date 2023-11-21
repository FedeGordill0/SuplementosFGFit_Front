import { Rol } from './rol';

export class Usuario {
  IdUsuario: number;
  email: string;
  password: string;

  idRolNavigation: number;
  rol?: Rol;
}
