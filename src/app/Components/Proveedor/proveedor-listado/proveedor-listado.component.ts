import {
  Component,
  Injectable,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JwtAuth } from 'src/app/Models/jwt-auth';
import { Login } from 'src/app/Models/login';
import { Proveedor } from 'src/app/Models/proveedor';
import { ProveedorService } from 'src/app/Services/proveedor.service';
import { ServidorComponent } from '../../Messages/Error/servidor/servidor.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoXproveedorService } from 'src/app/Services/producto-xproveedor.service';
import { MatDialog } from '@angular/material/dialog';
import { ProveedorXProductoListadoComponent } from '../proveedor-xproducto-listado/proveedor-xproducto-listado.component';
import { ProveedorXFormaEnvioListadoComponent } from '../proveedor-xforma-envio-listado/proveedor-xforma-envio-listado.component';
import { ProveedorXformaEnvioService } from 'src/app/Services/proveedor-xenvio.service';
import { ProveedorXFormaPagoService } from 'src/app/Services/proveedor-xforma-pago.service';
import { ProveedorXFormaPagoComponent } from '../proveedor-xforma-pago/proveedor-xforma-pago.component';
import { UsuarioxrolService } from 'src/app/Services/usuarioxrol.service';
import { ProveedorProductoListadoComponent } from '../ProveedorProductoListado-VistaUsuario/proveedor-producto-listado/proveedor-producto-listado.component';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-proveedor-listado',
  templateUrl: './proveedor-listado.component.html',
  styleUrls: ['./proveedor-listado.component.css'],
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
export class ProveedorListadoComponent implements OnInit, OnDestroy {
  private suscription = new Subscription();
  listadoProveedores: any[] = [];
  listadoFormasEnvio: any[] = [];
  listadoFormasPago: any[] = [];
  listadoProductos: any[] = [];
  proveedor: any[] = [];
  formaEnvio: any[] = [];
  formaPago: any[] = [];
  listadoProductosProveedores: any[] = [];
  loginDto = new Login();
  jwtDto = new JwtAuth();
  dataSource = new MatTableDataSource<any>(this.listadoProveedores);
  displayedColumns: string[] = [
    'nombre',
    'direccion',
    'telefono',
    'cuit',
    'email',
    'productosXproveedores',
    'proveedoresXformaEnvios',
    'proveedoresXformaPagos',
    'acciones',
    'a',
  ];

  dataSourceUsuario = new MatTableDataSource<any>(this.listadoProveedores);
  displayedColumnsUsuario: string[] = [
    'nombre',
    'direccion',
    'telefono',
    'cuit',
    'email',
    'productosXproveedores',
    'proveedoresXformaEnvios',
    'proveedoresXformaPagos',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  usuario: any;
  usuariosRoles: any;
  rol: any;
  data: any;
  tabla_PC = true;
  tabla_M = false;
  constructor(
    private proveedorService: ProveedorService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private productoProveedorService: ProductoXproveedorService,
    private dialog: MatDialog,
    private proveedorformaEnvio: ProveedorXformaEnvioService,
    private proveedorformaPago: ProveedorXFormaPagoService,
    private usuarioRolService: UsuarioxrolService,
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

  ngOnInit(): void {
    this.tamano();
    this.usuario = localStorage.getItem('email');
    console.log('usuario', this.usuario);
    this.suscription.add(
      this.usuarioRolService.getUsuariosRoles().subscribe({
        next: (listado: any) => {
          this.usuariosRoles = listado;
          console.log('this.usuariosRoles', this.usuariosRoles);
          if (this.usuario === 'admin') {
            this.rol = 'Administrador';
          } else {
            this.rol = 'Usuario';
          }
        },
        error: () => {
          alert('ERROR usuarioRolService.getUsuarioRolID');
        },
      })
    );
    this.actualizarListado();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSourceUsuario.paginator = this.paginator;
    this.dataSourceUsuario.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  actualizarListado() {
    this.listadoProveedores = [];
    this.suscription.add(
      this.proveedorService.getProveedores().subscribe({
        next: (listadoProveedores: any) => {
          this.listadoProveedores = listadoProveedores.filter(
            (proveedor: any) => proveedor.estado
          );

          this.listadoProveedores.forEach((proveedor) => {
            proveedor.productosXproveedores = [];
          });
          this.listadoProveedores.forEach((proveedor) => {
            proveedor.proveedoresXformaEnvios = [];
          });
          this.listadoProveedores.forEach((proveedor) => {
            proveedor.proveedoresXformaPagos = [];
          });
          this.loadProductosXProveedores();
          this.loadFormasEnvioXProveedores();
          this.loadFormasPagoXProveedores();
          this.dataSource.data = this.listadoProveedores;
          this.dataSourceUsuario.data = this.listadoProveedores;
          this.dataSourceMobile.data = this.listadoProveedores;
        },
        error: () => {
          this.openSnackBarError();
        },
      })
    );
  }
  loadProductosXProveedores() {
    this.suscription.add(
      this.productoProveedorService.getProductosXProveedores().subscribe({
        next: (listadoProductos: any) => {
          listadoProductos.forEach((productoProveedor: any) => {
            const idProveedor =
              productoProveedor.idProveedorNavigation?.idProveedor;

            if (idProveedor !== undefined) {
              const proveedor = this.listadoProveedores.find(
                (p) => p.idProveedor === idProveedor
              );

              if (proveedor) {
                if (!proveedor.productosXproveedores) {
                  proveedor.productosXproveedores = [];
                }
                proveedor.productosXproveedores.push(productoProveedor);
              }
            }
          });
        },
        error: () => {
          alert('Error al obtener productos por proveedor');
        },
      })
    );
  }

  loadFormasEnvioXProveedores() {
    this.suscription.add(
      this.proveedorformaEnvio.getProveedoresFormasEnvio().subscribe({
        next: (listadoFormasEnvio: any) => {
          listadoFormasEnvio.forEach((proveedoresXformaEnvios: any) => {
            const idProveedor =
              proveedoresXformaEnvios.idProveedorNavigation?.idProveedor;

            if (idProveedor !== undefined) {
              const proveedor = this.listadoProveedores.find(
                (p) => p.idProveedor === idProveedor
              );

              if (proveedor) {
                if (!proveedor.proveedoresXformaEnvios) {
                  proveedor.proveedoresXformaEnvios = [];
                }
                proveedor.proveedoresXformaEnvios.push(proveedoresXformaEnvios);
              }
            }
          });
        },
        error: () => {
          alert('Error al obtener formas de envío por proveedor');
        },
      })
    );
  }
  loadFormasPagoXProveedores() {
    this.suscription.add(
      this.proveedorformaPago.getProveedoresFormasPago().subscribe({
        next: (listadoFormasPago: any) => {
          listadoFormasPago.forEach((proveedoresXformaPagos: any) => {
            const idProveedor =
              proveedoresXformaPagos.idProveedorNavigation?.idProveedor;

            if (idProveedor !== undefined) {
              const proveedor = this.listadoProveedores.find(
                (p) => p.idProveedor === idProveedor
              );

              if (proveedor) {
                if (!proveedor.proveedoresXformaPagos) {
                  proveedor.proveedoresXformaPagos = [];
                }
                proveedor.proveedoresXformaPagos.push(proveedoresXformaPagos);
              }
            }
          });
        },
        error: () => {
          alert('Error al obtener formas de envío por proveedor');
        },
      })
    );
  }
  cerrar() {
    localStorage.removeItem('jwtToken');
    console.log(this.jwtDto.token);
    this.router.navigate(['login']);
  }
  filtro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSourceMobile.filter = filterValue.trim().toLowerCase();
  }
  filtroUsuario(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceUsuario.filter = filterValue.trim().toLowerCase();
  }
  irNuevoProveedor() {
    this.router.navigate(['proveedor/alta']);
  }

  volver() {
    this.router.navigate(['dashboard']);
  }
  openSnackBarError() {
    this._snackBar.openFromComponent(ServidorComponent, {
      duration: 1 * 1500,
    });
  }
  openDialogProducto(proveedor: any) {
    console.log('proveedor envíado', proveedor);
    const dialogRef = this.dialog.open(ProveedorProductoListadoComponent, {
      data: { proveedor: proveedor },
    });
  }
  openDialogFormaEnvio(proveedor: any) {
    console.log('formaEnvio envíado', proveedor);
    const dialogRef = this.dialog.open(ProveedorXFormaEnvioListadoComponent, {
      data: { proveedor: proveedor },
    });
  }
  openDialogFormaPago(proveedor: any) {
    console.log('FormaPago envíado', proveedor);
    const dialogRef = this.dialog.open(ProveedorXFormaPagoComponent, {
      data: { proveedor: proveedor },
    });
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
  dataSourceMobile = new MatTableDataSource<any>(this.listadoProveedores);

  columnsToDisplayMobile = ['nombre', 'telefono'];
  columnsToDisplayWithExpand = [...this.columnsToDisplayMobile, 'expand'];
  expandedElement: Proveedor | null;
}
@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Items por página:';
}
