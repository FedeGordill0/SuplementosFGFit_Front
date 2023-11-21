import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/Models/usuario';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { RegistrarComponent } from '../../Messages/RegistrarUsuario/registrar/registrar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { UsuarioExisteComponent } from '../../Messages/RegistrarUsuario/usuario-existe/usuario-existe.component';

@Component({
  selector: 'app-usuario-alta',
  templateUrl: './usuario-alta.component.html',
  styleUrls: ['./usuario-alta.component.css'],
})
export class UsuarioAltaComponent {
  private suscription = new Subscription();
  usuario: Usuario;
  formulario: FormGroup;
  hide: boolean;
  tabla_PC = true;
  tabla_M = false;
  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state) => {
        if (state.matches) {
          this.tabla_PC = false;
          this.tabla_M = true;
        } else {
          this.tabla_PC = true;
          this.tabla_M = false;
        }
      });
    this.formulario = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  registrarUsuario() {
    if (this.formulario.valid) {
      this.usuario = this.formulario.value;

      this.suscription.add(
        this.usuarioService.postUsuario(this.usuario).subscribe({
          next: () => {
            this.openSnackBarSuccess();
            this.router.navigate(['login']);
          },
          error: () => {
            this.openSnackBarUsuarioExistente();
          },
        })
      );
    } else {
    }
  }
  cancelar() {
    this.router.navigate(['login']);
  }
  openSnackBarSuccess() {
    this._snackBar.openFromComponent(RegistrarComponent, {
      duration: 1 * 2000,
    });
  }
  openSnackBarUsuarioExistente() {
    this._snackBar.openFromComponent(UsuarioExisteComponent, {
      duration: 1 * 2000,
    });
  }
}
