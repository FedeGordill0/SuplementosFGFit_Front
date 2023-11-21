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
import { UnidadMedida } from 'src/app/Models/unidad-medida';
import { UnidadMedidaService } from 'src/app/Services/unidad-medida.service';
import Swal from 'sweetalert2';
import { EliminarComponent } from '../../Messages/UnidadMedida/eliminar/eliminar.component';

@Component({
  selector: 'app-unidad-medida-baja',
  templateUrl: './unidad-medida-baja.component.html',
  styleUrls: ['./unidad-medida-baja.component.css'],
})
export class UnidadMedidaBajaComponent implements OnInit, OnDestroy {
  private suscripcion = new Subscription();
  @Input() unidad: UnidadMedida;
  @Output() onEliminar = new EventEmitter();

  constructor(
    private unidadMedidaService: UnidadMedidaService,
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
          this.unidadMedidaService.deleteUnidadMedida(this.unidad).subscribe({
            next: () => {
              this.openSnackBarSuccess();
              this.onEliminar.emit();
            },
            error: () => {
              alert('ERROR deleteUnidadMedida');
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
