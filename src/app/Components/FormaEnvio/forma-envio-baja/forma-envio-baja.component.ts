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
import { FormaEnvio } from 'src/app/Models/forma-envio';
import { FormaEnvioService } from 'src/app/Services/forma-envio.service';
import Swal from 'sweetalert2';
import { EliminarComponent } from '../../Messages/FormaEnvio/eliminar/eliminar.component';

@Component({
  selector: 'app-forma-envio-baja',
  templateUrl: './forma-envio-baja.component.html',
  styleUrls: ['./forma-envio-baja.component.css'],
})
export class FormaEnvioBajaComponent implements OnInit, OnDestroy {
  private suscripcion = new Subscription();
  @Input() formaEnvio: FormaEnvio;
  @Output() onEliminar = new EventEmitter();

  constructor(
    private formaEnvioService: FormaEnvioService,
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
          this.formaEnvioService.deleteFormaEnvio(this.formaEnvio).subscribe({
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
