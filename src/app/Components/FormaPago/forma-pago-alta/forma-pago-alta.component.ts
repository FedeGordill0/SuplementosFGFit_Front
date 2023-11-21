import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormaPago } from 'src/app/Models/forma-pago';
import { FormaPagoService } from 'src/app/Services/forma-pago.service';
import { AltaComponent } from '../../Messages/FormaPago/alta/alta.component';
import { ErrorComponent } from '../../Messages/Error/error.component';

@Component({
  selector: 'app-forma-pago-alta',
  templateUrl: './forma-pago-alta.component.html',
  styleUrls: ['./forma-pago-alta.component.css'],
})
export class FormaPagoAltaComponent implements OnInit, OnDestroy {
  private suscripcion = new Subscription();
  formulario: FormGroup;
  forma: FormaPago;
  validarNombre: any;
  validarDescripcion: any;
  validarPorcentaje: any;
  constructor(
    private formaService: FormaPagoService,
    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      porcentaje: ['', Validators.required],
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
        this.formaService.postFormaPago(this.forma).subscribe({
          next: () => {
            this.openSnackBarSuccess();
            this.router.navigate(['formaPago/listado']);
          },
          error: () => {
            this.validarNombre = false;
            this.validarDescripcion = false;
            this.validarPorcentaje = false;

            if (this.formulario.value.nombre.length > 100) {
              this.validarNombre = true;
            }
            if (this.formulario.value.descripcion.length > 100) {
              this.validarDescripcion = true;
            }
            if (typeof this.formulario.value.porcentaje === 'string') {
              this.validarPorcentaje = true;
            }
          },
        })
      );
    } else {
      this.openSnackBarError();
    }
  }

  cancelar() {
    this.router.navigate(['formaPago/listado']);
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
