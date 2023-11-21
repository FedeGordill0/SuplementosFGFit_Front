import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/Models/categoria';
import { CategoriaService } from 'src/app/Services/categoria.service';
import { AltaComponent } from '../../Messages/Categoria/alta/alta.component';
import { ErrorComponent } from '../../Messages/Error/error.component';

@Component({
  selector: 'app-categoria-alta',
  templateUrl: './categoria-alta.component.html',
  styleUrls: ['./categoria-alta.component.css'],
})
export class CategoriaAltaComponent implements OnInit, OnDestroy {
  private suscripcion = new Subscription();
  formulario: FormGroup;
  categoria: Categoria;
  validarNombre: any;
  validarDescripcion: any;

  constructor(
    private categoriaService: CategoriaService,
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
      this.categoria = this.formulario.value;
      console.log(this.formulario.value.nombre);
      this.suscripcion.add(
        this.categoriaService.postCategoria(this.categoria).subscribe({
          next: () => {
            this.router.navigate(['categoria/listado']);
            this.openSnackBarSuccess();
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
    this.router.navigate(['categoria/listado']);
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
