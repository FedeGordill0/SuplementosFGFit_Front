import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/Models/categoria';
import { CategoriaService } from 'src/app/Services/categoria.service';
import Swal from 'sweetalert2';
import { EliminarComponent } from '../../Messages/Categoria/eliminar/eliminar.component';

@Component({
  selector: 'app-categoria-baja',
  templateUrl: './categoria-baja.component.html',
  styleUrls: ['./categoria-baja.component.css'],
})
export class CategoriaBajaComponent implements OnInit, OnDestroy {
  private suscripcion = new Subscription();
  @Input() categoria: Categoria;
  @Output() onEliminar = new EventEmitter();

  constructor(
    private categoriaService: CategoriaService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  eliminar() {
    Swal.fire({
      title: 'Estás seguro que quieres eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
        this.suscripcion.add(
          this.categoriaService.deleteCategoria(this.categoria).subscribe({
            next: () => {
              this.openSnackBarSuccess();
              this.onEliminar.emit();
            },
            error: () => {},
          })
        );
      }
    });
  }
  openSnackBarSuccess() {
    this._snackBar.openFromComponent(EliminarComponent, {
      duration: 1 * 1500,
    });
  }
}
