import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EstadoOrdenCompra } from 'src/app/Models/estado-orden-compra';
import { OrdenCompra } from 'src/app/Models/orden-compra';
import { EstadoOrdenService } from 'src/app/Services/estado-orden.service';
import { OrdenCompraService } from 'src/app/Services/orden-compra.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { ModificarComponent } from '../../Messages/OrdenCompra/modificar/modificar.component';
emailjs.init('2c_9IHda4Wwugmk7t');
@Component({
  selector: 'app-orden-compra-modificar',
  templateUrl: './orden-compra-modificar.component.html',
  styleUrls: ['./orden-compra-modificar.component.css'],
})
export class OrdenCompraModificarComponent {
  private suscripcion = new Subscription();
  formulario: FormGroup;
  listadoEstadosOrden: EstadoOrdenCompra[];
  ordenCompra: any;

  constructor(
    private ordenCompraService: OrdenCompraService,
    private estadoOrden: EstadoOrdenService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      idEstadoOrden: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.mostrarForm();
    this.suscripcion.add(
      this.estadoOrden.getEstadoOrdenesCompra().subscribe({
        next: (listado: any) => {
          this.listadoEstadosOrden = listado;
        },
        error: () => {
          alert('ERROR categoriaService.getCategorias');
        },
      })
    );
  }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  guardar() {
    if (this.formulario.valid) {
      this.ordenCompra = this.formulario.value;
      console.log('this.ordenCompra', this.ordenCompra);
      this.suscripcion.add(
        this.ordenCompraService.putOrdenCompra(this.ordenCompra).subscribe({
          next: (a: any) => {
            this.openSnackBarSuccess();

            if (this.ordenCompra.idEstadoOrden === 2) {
              this.enviarEmailAprobado();
            }
            if (this.ordenCompra.idEstadoOrden === 4) {
              this.enviarEmailRechazado();
            }

            this.router.navigate(['dashboard']);
          },
          error: () => {},
        })
      );
    } else {
    }
  }

  cancelar() {
    this.router.navigate(['dashboard']);
  }

  mostrarForm() {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        const id = params['id'];

        if (id) {
          this.ordenCompraService.getOrdenCompraID(id).subscribe({
            next: (p: any) => {
              this.ordenCompra = p;
              console.log('p', p);
              this.formulario = this.fb.group({
                idOrdenCompra: [p.resultado.idOrdenCompra],
                idEstadoOrden: [p.resultado.idEstadoOrden],
              });
            },
            error: () => {
              alert('ERROR ordenCompraService.getOrdenCompraID');
            },
          });
        }
      },
      error: () => {
        alert('ERROR activatedRoute.params');
      },
    });
  }
  openSnackBarSuccess() {
    this._snackBar.openFromComponent(ModificarComponent, {
      duration: 1 * 1500,
    });
  }

  async enviarEmailAprobado() {
    try {
      const response = await emailjs.send(
        'service_7r3m5ch',
        'template_lw8p27w',
        {
          from_name: 'Suplementos Fg-Fit',
          reply_to: 'Comprador',
          message:
            'Buen día comprador \n Queremos notificarle que se ha aprobado su órden de compra! \n\n Saludos! \n\n Suplementos FG-Fit',
        },
        '2c_9IHda4Wwugmk7t'
      );

      console.log('Email enviado con éxito:', response);
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
    }
  }
  async enviarEmailRechazado() {
    try {
      const response = await emailjs.send(
        'service_7r3m5ch',
        'template_lw8p27w',
        {
          from_name: 'Suplementos Fg-Fit',
          reply_to: 'Comprador',
          message:
            'Buen día comprador \n Queremos notificarle que se ha rechazado su órden de compra. \n\n Saludos! \n\n Suplementos FG-Fit',
        },
        '2c_9IHda4Wwugmk7t'
      );

      console.log('Email enviado con éxito:', response);
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
    }
  }
}
