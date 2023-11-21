import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UnidadMedida } from 'src/app/Models/unidad-medida';
import { UnidadMedidaService } from 'src/app/Services/unidad-medida.service';
import { ModificarComponent } from '../../Messages/UnidadMedida/modificar/modificar.component';
import { ErrorComponent } from '../../Messages/Error/error.component';

@Component({
  selector: 'app-unidad-medida-modificar',
  templateUrl: './unidad-medida-modificar.component.html',
  styleUrls: ['./unidad-medida-modificar.component.css'],
})
export class UnidadMedidaModificarComponent implements OnInit, OnDestroy {
  private suscripcion = new Subscription();
  formulario: FormGroup;
  unidad: UnidadMedida;
  validarNombre: any;
  validarDescripcion: any;
  constructor(
    private unidadMedidaService: UnidadMedidaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.mostrarForm();
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  guardar() {
    if (this.formulario.valid) {
      this.unidad = this.formulario.value;
      console.log('proveedor', this.formulario.value);
      this.suscripcion.add(
        this.unidadMedidaService.putUnidadMedida(this.unidad).subscribe({
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

  mostrarForm() {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        const id = params['id'];

        if (id) {
          this.unidadMedidaService.getUnidadMedidaID(id).subscribe({
            next: (u: any) => {
              this.unidad = u;

              this.formulario = this.fb.group({
                idUnidadMedida: [u.resultado.idUnidadMedida],
                nombre: [u.resultado.nombre],
                descripcion: [u.resultado.descripcion],
              });
            },
            error: () => {
              alert('ERROR unidadMedidaService.getUnidadMedidaID');
            },
          });
        }
      },
      error: () => {
        alert('ERROR activatedRoute.params');
      },
    });
  }
  openSnackBarSuccess() {
    this._snackBar.openFromComponent(ModificarComponent, {
      duration: 1 * 1500,
    });
  }
  openSnackBarError() {
    this._snackBar.openFromComponent(ErrorComponent, {
      duration: 1 * 1500,
    });
  }
}
