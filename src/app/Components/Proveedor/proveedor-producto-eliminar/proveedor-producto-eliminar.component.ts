import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Proveedor } from 'src/app/Models/proveedor';
import { ProveedorService } from 'src/app/Services/proveedor.service';
import Swal from 'sweetalert2';
import { EliminarComponent } from '../../Messages/Producto/eliminar/eliminar.component';
import { ProductoXproveedorService } from 'src/app/Services/producto-xproveedor.service';

@Component({
  selector: 'app-proveedor-producto-eliminar',
  templateUrl: './proveedor-producto-eliminar.component.html',
  styleUrls: ['./proveedor-producto-eliminar.component.css'],
})
export class ProveedorProductoEliminarComponent {
  private suscripcion = new Subscription();
  @Input() productoProveedor: any;
  @Output() onEliminar = new EventEmitter();
  dataSource: Proveedor[];

  constructor(
    private productoXproveedorService: ProductoXproveedorService,
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
          this.productoXproveedorService
            .deleteProductoProveedor(this.productoProveedor)
            .subscribe({
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
