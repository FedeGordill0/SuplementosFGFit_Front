import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JwtAuth } from 'src/app/Models/jwt-auth';
import { Login } from 'src/app/Models/login';
import { ProductoXproveedorService } from 'src/app/Services/producto-xproveedor.service';
import { ProveedorService } from 'src/app/Services/proveedor.service';
import { ServidorComponent } from '../../Messages/Error/servidor/servidor.component';
import { FormBuilder } from '@angular/forms';
import { FormaEnvioService } from 'src/app/Services/forma-envio.service';
import { FormaPagoService } from 'src/app/Services/forma-pago.service';
import { ProductoService } from 'src/app/Services/producto.service';
import { ProveedorXformaEnvioService } from 'src/app/Services/proveedor-xenvio.service';
import { ProveedorXFormaPagoService } from 'src/app/Services/proveedor-xforma-pago.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-proveedor-xproducto-listado',
  templateUrl: './proveedor-xproducto-listado.component.html',
  styleUrls: ['./proveedor-xproducto-listado.component.css'],
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
export class ProveedorXProductoListadoComponent {
  private suscription = new Subscription();
  listadoProductosProveedor: any[] = [];

  dataSourceProductosProveedor = new MatTableDataSource<any>(
    this.listadoProductosProveedor
  );
  displayedColumnsProductosProveedor: string[] = [
    'nombre',
    'precio',
    'imagen',
    'acciones',
    'a',
  ];
  @ViewChild(MatSort) sort!: MatSort;
  @Input() productoProveedorFor: any;
  @Input() idProductoFor: any;
  tabla_PC = true;
  tabla_M = false;
  nombreProductosTablaM: any = null;
  constructor(
    private proveedorService: ProveedorService,
    private productoService: ProductoService,
    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private formaEnvioService: FormaEnvioService,
    private formaPagoService: FormaPagoService,
    private cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private proveedorxFormaEnvioService: ProveedorXformaEnvioService,
    private proveedorxFormaPagoService: ProveedorXFormaPagoService,
    private productosProveedoresService: ProductoXproveedorService,
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

              this.productosProveedoresService
                .getListadoProductosProveedorID(id)
                .subscribe({
                  next: (productosProveedor: any) => {
                    this.listadoProductosProveedor =
                      productosProveedor.resultado;
                    console.log(
                      'this.listadoProductosProveedor',
                      this.listadoProductosProveedor
                    );
                    for (const iterator of this.listadoProductosProveedor) {
                      this.productoProveedorFor = iterator.idProveedor;
                      this.idProductoFor = iterator.idProducto;
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
    this.dataSourceProductosProveedor.data = this.listadoProductosProveedor;
    this.dataSourceMobile.data = this.listadoProductosProveedor;
    console.log(
      ' this.dataSourceMobile.data this.dataSourceMobile.data',
      this.dataSourceMobile.data
    );

    for (const iterator of this.dataSourceMobile.data) {
      this.nombreProductosTablaM = iterator.idProductoNavigation?.nombre;
    }
  }
  altaProducto() {
    this.router.navigate([
      'proveedor/productos/alta/' + this.productoProveedorFor,
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
    this.listadoProductosProveedor
  );
  columnsToDisplayMobile: string[] = ['nombre'];
  columnsToDisplayWithExpand = [...this.columnsToDisplayMobile];
  expandedElement: any | null;
}
