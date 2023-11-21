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
import { FormaPago } from 'src/app/Models/forma-pago';
import { FormaPagoService } from 'src/app/Services/forma-pago.service';
import Swal from 'sweetalert2';
import { EliminarComponent } from '../../Messages/FormaPago/eliminar/eliminar.component';

@Component({
  selector: 'app-forma-pago-baja',
  templateUrl: './forma-pago-baja.component.html',
  styleUrls: ['./forma-pago-baja.component.css'],
})
export class FormaPagoBajaComponent implements OnInit, OnDestroy {
  private suscripcion = new Subscription();
  @Input() formaPago: FormaPago;
  @Output() onEliminar = new EventEmitter();

  constructor(
    private formaPagoService: FormaPagoService,
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
          this.formaPagoService.deleteFormaPago(this.formaPago).subscribe({
            next: () => {
              this.openSnackBarSuccess();
              this.onEliminar.emit();
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
