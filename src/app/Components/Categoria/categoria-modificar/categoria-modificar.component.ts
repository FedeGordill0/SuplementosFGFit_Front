import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/Models/categoria';
import { CategoriaService } from 'src/app/Services/categoria.service';
import { ErrorComponent } from '../../Messages/Error/error.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModificarComponent } from '../../Messages/Categoria/modificar/modificar.component';

@Component({
  selector: 'app-categoria-modificar',
  templateUrl: './categoria-modificar.component.html',
  styleUrls: ['./categoria-modificar.component.css'],
})
export class CategoriaModificarComponent implements OnInit, OnDestroy {
  private suscripcion = new Subscription();
  formulario: FormGroup;
  categoria: Categoria;
  validarNombre: any;
  validarDescripcion: any;
  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
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
      this.categoria = this.formulario.value;
      this.suscripcion.add(
        this.categoriaService.putCategoria(this.categoria).subscribe({
          next: () => {
            this.openSnackBarSuccess();
            this.router.navigate(['categoria/listado']);
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

  mostrarForm() {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        const id = params['id'];

        if (id) {
          this.categoriaService.getCategoriaID(id).subscribe({
            next: (c: any) => {
              this.categoria = c;
              this.formulario = this.fb.group({
                idCategoria: [c.resultado.idCategoria],
                nombre: [c.resultado.nombre],
                descripcion: [c.resultado.descripcion],
              });
            },
            error: () => {
              alert('error modificarCategoria');
            },
          });
        }
      },
      error: () => {
        alert('error modificarCategoria');
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
