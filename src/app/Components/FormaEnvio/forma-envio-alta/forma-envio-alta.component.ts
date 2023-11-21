import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormaEnvio } from 'src/app/Models/forma-envio';
import { FormaEnvioService } from 'src/app/Services/forma-envio.service';
import { AltaComponent } from '../../Messages/FormaEnvio/alta/alta.component';
import { ErrorComponent } from '../../Messages/Error/error.component';

@Component({
  selector: 'app-forma-envio-alta',
  templateUrl: './forma-envio-alta.component.html',
  styleUrls: ['./forma-envio-alta.component.css'],
})
export class FormaEnvioAltaComponent implements OnInit, OnDestroy {
  private suscripcion = new Subscription();
  formulario: FormGroup;
  forma: FormaEnvio;
  validarNombre: any;
  validarDescripcion: any;
  validarPrecio: any;
  constructor(
    private formaService: FormaEnvioService,
    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  guardar() {
    if (this.formulario.valid) {
      this.forma = this.formulario.value;
      this.suscripcion.add(
        this.formaService.postFormaEnvio(this.forma).subscribe({
          next: () => {
            this.openSnackBarSuccess();
            this.router.navigate(['formaEnvio/listado']);
          },
          error: () => {
            this.validarNombre = false;
            this.validarDescripcion = false;
            this.validarPrecio = false;

            if (this.formulario.value.nombre.length > 50) {
              this.validarNombre = true;
            }
            if (this.formulario.value.descripcion.length > 100) {
              this.validarDescripcion = true;
            }
            if (typeof this.formulario.value.precio === 'string') {
              this.validarPrecio = true;
            } //VALIDAR DESDE EL BACKEND
          },
        })
      );
    } else {
      this.openSnackBarError();
    }
  }

  cancelar() {
    this.router.navigate(['formaEnvio/listado']);
  }
  openSnackBarSuccess() {
    this._snackBar.openFromComponent(AltaComponent, {
      duration: 1 * 1500,
    });
  }
  openSnackBarError() {
    this._snackBar.openFromComponent(ErrorComponent, {
      duration: 1 * 1500,
    });
  }
}
