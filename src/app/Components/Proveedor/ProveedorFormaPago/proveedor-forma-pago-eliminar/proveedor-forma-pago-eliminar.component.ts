import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { EliminarComponent } from 'src/app/Components/Messages/FormaPago/eliminar/eliminar.component';
import { Proveedor } from 'src/app/Models/proveedor';
import { ProveedorXFormaPagoService } from 'src/app/Services/proveedor-xforma-pago.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedor-forma-pago-eliminar',
  templateUrl: './proveedor-forma-pago-eliminar.component.html',
  styleUrls: ['./proveedor-forma-pago-eliminar.component.css'],
})
export class ProveedorFormaPagoEliminarComponent {
  private suscripcion = new Subscription();
  @Input() proveedorFormaPago: any;
  @Output() onEliminar = new EventEmitter();
  dataSource: Proveedor[]; // Arreglo de proveedores

  constructor(
    private proveedorXFormaPagoService: ProveedorXFormaPagoService,
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
          this.proveedorXFormaPagoService
            .deleteProveedorFormaPago(this.proveedorFormaPago)
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
