import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UnidadMedida } from 'src/app/Models/unidad-medida';
import { UnidadMedidaService } from 'src/app/Services/unidad-medida.service';
import { AltaComponent } from '../../Messages/UnidadMedida/alta/alta.component';
import { ErrorComponent } from '../../Messages/Error/error.component';

@Component({
  selector: 'app-unidad-medida-alta',
  templateUrl: './unidad-medida-alta.component.html',
  styleUrls: ['./unidad-medida-alta.component.css'],
})
export class UnidadMedidaAltaComponent implements OnInit, OnDestroy {
  private suscripcion = new Subscription();
  formulario: FormGroup;
  unidad: UnidadMedida;
  validarNombre: any;
  validarDescripcion: any;
  constructor(
    private unidadMedidaService: UnidadMedidaService,
    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  guardar() {
    if (this.formulario.valid) {
      this.unidad = this.formulario.value;
      this.suscripcion.add(
        this.unidadMedidaService.postUnidadMedida(this.unidad).subscribe({
          next: () => {
            this.openSnackBarSuccess();
            this.router.navigate(['unidadMedida/listado']);
          },
          error: () => {
            this.validarNombre = false;
            this.validarDescripcion = false;

            if (this.formulario.value.nombre.length > 50) {
              this.validarNombre = true;
            }
            if (this.formulario.value.descripcion.length > 100) {
              this.validarDescripcion = true;
            }
          },
        })
      );
    } else {
      this.openSnackBarError();
    }
  }

  cancelar() {
    this.router.navigate(['unidadMedida/listado']);
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
