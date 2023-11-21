import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { EliminarComponent } from 'src/app/Components/Messages/FormaEnvio/eliminar/eliminar.component';
import { Proveedor } from 'src/app/Models/proveedor';
import { ProveedorXformaEnvioService } from 'src/app/Services/proveedor-xenvio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedor-forma-envio-eliminar',
  templateUrl: './proveedor-forma-envio-eliminar.component.html',
  styleUrls: ['./proveedor-forma-envio-eliminar.component.css'],
})
export class ProveedorFormaEnvioEliminarComponent {
  private suscripcion = new Subscription();
  @Input() proveedorFormaEnvio: any;
  @Output() onEliminar = new EventEmitter();
  dataSource: Proveedor[];

  constructor(
    private proveedorXformaEnvioService: ProveedorXformaEnvioService,
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
          this.proveedorXformaEnvioService
            .deleteProveedorFormaEnvio(this.proveedorFormaEnvio)
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
