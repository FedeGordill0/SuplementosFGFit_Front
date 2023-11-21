import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtAuth } from 'src/app/Models/jwt-auth';
import { Login } from 'src/app/Models/login';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { ServidorComponent } from '../../Messages/Error/servidor/servidor.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginComponent } from '../../Messages/Error/login/login/login.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css'],
})
export class UsuarioLoginComponent {
  loginDto = new Login();
  jwtDto = new JwtAuth();
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

  login(loginDto: Login) {
    this.loginDto.email = this.formulario.value.email;
    this.loginDto.password = this.formulario.value.password;

    this.usuarioService.loginUsuario(loginDto).subscribe({
      next: (jwtDto) => {
        if (jwtDto && jwtDto.token) {
          localStorage.setItem('jwtToken', jwtDto.token);
          localStorage.setItem('email', loginDto.email);

          this.router.navigate(['dashboard']);
        }
      },
      error: (error) => {
        if (error.status === 0) {
          this.openSnackBarError();
        } else {
          this.openSnackBarErrorLogin();
        }
      },
    });
  }
  openSnackBarError() {
    this._snackBar.openFromComponent(ServidorComponent, {
      duration: 1 * 1500,
    });
  }
  openSnackBarErrorLogin() {
    this._snackBar.openFromComponent(LoginComponent, {
      duration: 1 * 1500,
    });
  }

  registrarUsuario() {}
}
