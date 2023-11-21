import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormaEnvioService } from 'src/app/Services/forma-envio.service';
import { ProveedorXformaEnvioService } from 'src/app/Services/proveedor-xenvio.service';
import { ProveedorXFormaPagoService } from 'src/app/Services/proveedor-xforma-pago.service';
import { ProveedorService } from 'src/app/Services/proveedor.service';

@Component({
  selector: 'app-proveedor-forma-envio-listado',
  templateUrl: './proveedor-forma-envio-listado.component.html',
  styleUrls: ['./proveedor-forma-envio-listado.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ProveedorFormaEnvioListadoComponent {
  private suscription = new Subscription();
  listadoProveedorFormasEnvio: any[] = [];

  dataSourceProveedorFormasEnvio = new MatTableDataSource<any>(
    this.listadoProveedorFormasEnvio
  );
  displayedColumnsProductosProveedor: string[] = [
    'nombre',
    'descripcion',
    'precio',
    'acciones',
    'a',
  ];
  @ViewChild(MatSort) sort!: MatSort;
  @Input() formaEnvioProveedorFor: any;
  @Input() idFormaEnvioFor: any;
  tabla_PC = true;
  tabla_M = false;
  nombreFormaEnvioTablaM: any = null;
  constructor(
    private proveedorService: ProveedorService,

    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private formaEnvioService: FormaEnvioService,

    private cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private proveedorxFormaEnvioService: ProveedorXformaEnvioService,
    private proveedorxFormaPagoService: ProveedorXFormaPagoService,

    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state) => {
        if (state.matches) {
          this.tabla_PC = false;
          this.tabla_M = true;
        } else {
          this.tabla_PC = true;
          this.tabla_M = false;
        }
      });
  }

  ngOnInit() {
    this.tamano();
    this.mostrarForm();
  }
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
  ngAfterViewInit() {}

  mostrarForm() {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        const id = params['id'];
        console.log('id', id);

        if (id) {
          this.proveedorService.getProveedorID(id).subscribe({
            next: (proveedor: any) => {
              console.log(
                'this.proveedorService.getProveedorID(id)',
                proveedor
              );

              this.proveedorxFormaEnvioService
                .getListadoProveedorFormaEnvioID(id)
                .subscribe({
                  next: (formasEnvioProveedor: any) => {
                    this.listadoProveedorFormasEnvio =
                      formasEnvioProveedor.resultado;
                    console.log(
                      'this.listadoProductosFormasEnvio',
                      this.listadoProveedorFormasEnvio
                    );
                    for (const iterator of this.listadoProveedorFormasEnvio) {
                      this.formaEnvioProveedorFor = iterator.idProveedor;
                      this.idFormaEnvioFor = iterator.idFormaEnvio;
                    }

                    this.actualizarListado();
                  },
                  error: () => {
                    alert(
                      'this.productosProveedoresService.getProductosXProveedores'
                    );
                  },
                });
            },
            error: () => {},
          });
        }
      },
      error: () => {},
    });
  }
  actualizarListado() {
    this.dataSourceProveedorFormasEnvio.data = this.listadoProveedorFormasEnvio;
    this.dataSourceMobile.data = this.listadoProveedorFormasEnvio;
    console.log(
      ' this.dataSourceMobile.data this.dataSourceMobile.data',
      this.dataSourceMobile.data
    );

    for (const iterator of this.dataSourceMobile.data) {
      this.nombreFormaEnvioTablaM = iterator.idFormaEnvioNavigation?.nombre;
    }
  }
  altaFormaEnvio() {
    this.router.navigate([
      'proveedor/formasEnvio/alta/' + this.idFormaEnvioFor,
    ]);
  }

  cancelar() {
    this.router.navigate(['proveedor/listado']);
  }
  tamano() {
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
        this.tabla_PC = true;
        this.tabla_M = false;
      } else {
        this.tabla_M = true;
        this.tabla_PC = false;
      }
    });
  }

  dataSourceMobile = new MatTableDataSource<any>(
    this.listadoProveedorFormasEnvio
  );
  columnsToDisplayMobile: string[] = ['nombre'];
  columnsToDisplayWithExpand = [...this.columnsToDisplayMobile];
  expandedElement: any | null;
}
