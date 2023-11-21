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
import { Proveedor } from 'src/app/Models/proveedor';
import { ProveedorService } from 'src/app/Services/proveedor.service';
import Swal from 'sweetalert2';
import { EliminarComponent } from '../../Messages/Proveedor/eliminar/eliminar.component';

@Component({
  selector: 'app-proveedor-baja',
  templateUrl: './proveedor-baja.component.html',
  styleUrls: ['./proveedor-baja.component.css'],
})
export class ProveedorBajaComponent implements OnInit, OnDestroy {
  private suscripcion = new Subscription();
  @Input() proveedor: any;
  @Output() onEliminar = new EventEmitter();
  dataSource: Proveedor[];

  constructor(
    private proveedorService: ProveedorService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }
  cargarProveedores() {
    this.suscripcion.add(
      this.proveedorService.getProveedores().subscribe((proveedores) => {
        this.dataSource = proveedores.filter((p) => p.estado);
      })
    );
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
        this.proveedor.estado = false;
        this.suscripcion.add(
          this.proveedorService.deleteProveedor(this.proveedor).subscribe({
            next: () => {
              this.openSnackBarSuccess();
              this.onEliminar.emit();
              this.cargarProveedores();
              console.log('this.dataSource', this.dataSource);
            },
            error: () => {
              alert('ERROR deleteProveedor');
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
