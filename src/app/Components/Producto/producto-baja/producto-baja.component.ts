import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Producto } from 'src/app/Models/producto';
import { ProductoService } from 'src/app/Services/producto.service';
import Swal from 'sweetalert2';
import { EliminarComponent } from '../../Messages/Producto/eliminar/eliminar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-producto-baja',
  templateUrl: './producto-baja.component.html',
  styleUrls: ['./producto-baja.component.css'],
})
export class ProductoBajaComponent implements OnInit, OnDestroy {
  private suscripcion = new Subscription();
  @Input() producto: Producto;
  @Output() onEliminar = new EventEmitter();

  constructor(
    private productoService: ProductoService,
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
          this.productoService.deleteProducto(this.producto).subscribe({
            next: () => {
              this.openSnackBarSuccess();
              this.onEliminar.emit();
            },
            error: () => {
              alert('ERROR deleteProducto');
            },
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
