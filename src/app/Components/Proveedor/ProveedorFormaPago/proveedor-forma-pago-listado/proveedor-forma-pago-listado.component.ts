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
import { FormaPagoService } from 'src/app/Services/forma-pago.service';
import { ProveedorXFormaPagoService } from 'src/app/Services/proveedor-xforma-pago.service';
import { ProveedorService } from 'src/app/Services/proveedor.service';

@Component({
  selector: 'app-proveedor-forma-pago-listado',
  templateUrl: './proveedor-forma-pago-listado.component.html',
  styleUrls: ['./proveedor-forma-pago-listado.component.css'],
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
export class ProveedorFormaPagoListadoComponent {
  private suscription = new Subscription();
  listadoProveedorFormasPago: any[] = [];

  dataSourceProveedorFormasPago = new MatTableDataSource<any>(
    this.listadoProveedorFormasPago
  );
  displayedColumnsProductosProveedor: string[] = [
    'nombre',
    'descripcion',
    'porcentaje',
    'acciones',
    'a',
  ];
  @ViewChild(MatSort) sort!: MatSort;
  @Input() formaPagoProveedorFor: any;
  @Input() idFormaPagoFor: any;
  tabla_PC = true;
  tabla_M = false;
  nombreFormaPagoTablaM: any = null;
  constructor(
    private proveedorService: ProveedorService,

    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private formaPagoService: FormaPagoService,

    private cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
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

              this.proveedorxFormaPagoService
                .getListadoProveedorFormaPagoID(id)
                .subscribe({
                  next: (formasPagoProveedor: any) => {
                    this.listadoProveedorFormasPago =
                      formasPagoProveedor.resultado;
                    console.log(
                      'this.listadoProductosFormasEnvio',
                      this.listadoProveedorFormasPago
                    );
                    for (const iterator of this.listadoProveedorFormasPago) {
                      this.formaPagoProveedorFor = iterator.idProveedor;
                      this.idFormaPagoFor = iterator.idFormaPago;
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
    this.dataSourceProveedorFormasPago.data = this.listadoProveedorFormasPago;
    this.dataSourceMobile.data = this.listadoProveedorFormasPago;
    console.log(
      ' this.dataSourceMobile.data this.dataSourceMobile.data',
      this.dataSourceMobile.data
    );

    for (const iterator of this.dataSourceMobile.data) {
      this.nombreFormaPagoTablaM = iterator.idFormaPagoNavigation?.nombre;
    }
  }
  altaFormaPago() {
    this.router.navigate(['proveedor/formasPago/alta/' + this.idFormaPagoFor]);
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
    this.listadoProveedorFormasPago
  );
  columnsToDisplayMobile: string[] = ['nombre'];
  columnsToDisplayWithExpand = [...this.columnsToDisplayMobile];
  expandedElement: any | null;
}
