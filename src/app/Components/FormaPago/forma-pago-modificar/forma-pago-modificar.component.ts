import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormaPago } from 'src/app/Models/forma-pago';
import { FormaPagoService } from 'src/app/Services/forma-pago.service';
import { AltaComponent } from '../../Messages/FormaPago/alta/alta.component';
import { ErrorComponent } from '../../Messages/Error/error.component';
import { ModificarComponent } from '../../Messages/FormaPago/modificar/modificar.component';

@Component({
  selector: 'app-forma-pago-modificar',
  templateUrl: './forma-pago-modificar.component.html',
  styleUrls: ['./forma-pago-modificar.component.css'],
})
export class FormaPagoModificarComponent implements OnInit, OnDestroy {
  private suscripcion = new Subscription();
  formulario: FormGroup;
  forma: FormaPago;
  validarNombre: any;
  validarDescripcion: any;
  validarPorcentaje: any;
  constructor(
    private formaService: FormaPagoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      porcentaje: ['', Validators.required],
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
      this.forma = this.formulario.value;
      this.suscripcion.add(
        this.formaService.putFormaPago(this.forma).subscribe({
          next: () => {
            this.openSnackBarSuccess();
            this.router.navigate(['formaPago/listado']);
          },
          error: () => {
            this.validarNombre = false;
            this.validarDescripcion = false;
            this.validarPorcentaje = false;

            if (this.formulario.value.nombre.length > 50) {
              this.validarNombre = true;
            }
            if (this.formulario.value.descripcion.length > 100) {
              this.validarDescripcion = true;
            }
            if (typeof this.formulario.value.porcentaje == 'string') {
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

  mostrarForm() {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        const id = params['id'];

        if (id) {
          this.formaService.getFormaPagoID(id).subscribe({
            next: (f: any) => {
              this.forma = f;

              this.formulario = this.fb.group({
                idFormaPago: [f.resultado.idFormaPago],
                nombre: [f.resultado.nombre],
                descripcion: [f.resultado.descripcion],
                porcentaje: [f.resultado.porcentaje],
              });
            },
            error: () => {
              alert('ERROR formaService.getFormaPagoID');
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
