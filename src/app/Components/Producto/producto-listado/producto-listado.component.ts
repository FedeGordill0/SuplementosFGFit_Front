import {
  Component,
  ElementRef,
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
import { Categoria } from 'src/app/Models/categoria';
import { JwtAuth } from 'src/app/Models/jwt-auth';
import { Login } from 'src/app/Models/login';
import { Producto } from 'src/app/Models/producto';
import { UnidadMedida } from 'src/app/Models/unidad-medida';
import { CategoriaService } from 'src/app/Services/categoria.service';
import { ProductoService } from 'src/app/Services/producto.service';
import { UnidadMedidaService } from 'src/app/Services/unidad-medida.service';
import { ServidorComponent } from '../../Messages/Error/servidor/servidor.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioxrolService } from 'src/app/Services/usuarioxrol.service';
import {
  BreakpointObserver,
  Breakpoints,
  LayoutModule,
} from '@angular/cdk/layout';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
@Component({
  selector: 'app-producto-listado',
  templateUrl: './producto-listado.component.html',
  styleUrls: ['./producto-listado.component.css'],
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
export class ProductoListadoComponent implements OnInit, OnDestroy {
  private suscription = new Subscription();
  listadoProductos: any[] = [];
  listadoCategorias: any[] = [];
  listadoUnidadesMedida: any[] = [];
  loginDto = new Login();
  jwtDto = new JwtAuth();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>(this.listadoProductos);
  displayedColumns: string[] = [
    'nombre',
    'descripcion',
    'marca',
    'imagen',
    'idCategoria',
    'idUnidadMedida',
    'fechaVencimiento',
    'estadoProducto',
    'acciones',
    'a',
  ];

  dataSourceUsuario = new MatTableDataSource<any>(this.listadoProductos);
  displayedColumnsUsuario: string[] = [
    'nombre',
    'descripcion',
    'marca',
    'imagen',
    'idCategoria',
    'idUnidadMedida',
    'fechaVencimiento',
    'estadoProducto',
  ];

  dataSourceMobile = new MatTableDataSource<any>(this.listadoProductos);
  columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  columnsToDisplayMobile = ['marca', 'nombre'];
  columnsToDisplayWithExpand = [...this.columnsToDisplayMobile, 'expand'];
  expandedElement: any | null;

  producto: Producto;
  usuario: any;
  usuariosRoles: any;
  rol: any;
  tabla_PC = true;
  tabla_M = false;
  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private usuarioRolService: UsuarioxrolService,
    private unidadMedidaService: UnidadMedidaService,
    private router: Router,
    private _snackBar: MatSnackBar,
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

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item: any, property) => {
      console.log(item);
      console.log(property);
      switch (property) {
        case 'idCategoria':
          return item.idCategoriaNavigation;
        case 'idUnidadMedida':
          return item.idUnidadMedidaNavigation;
        default:
          return item[property];
      }
    };
    this.dataSource.sort = this.sort;

    this.dataSourceUsuario.paginator = this.paginator;
    this.dataSourceUsuario.sortingDataAccessor = (item: any, property) => {
      console.log(item);
      console.log(property);
      switch (property) {
        case 'idCategoria':
          return item.idCategoriaNavigation;
        case 'idUnidadMedida':
          return item.idUnidadMedidaNavigation;
        default:
          return item[property];
      }
    };
    this.dataSourceUsuario.sort = this.sort;

    this.dataSourceMobile.paginator = this.paginator;
    this.dataSourceMobile.sortingDataAccessor = (item: any, property) => {
      console.log(item);
      console.log(property);
      switch (property) {
        case 'idCategoria':
          return item.idCategoriaNavigation;
        case 'idUnidadMedida':
          return item.idUnidadMedidaNavigation;
        default:
          return item[property];
      }
    };
    this.dataSourceMobile.sort = this.sort;
  }

  actualizarListado() {
    this.suscription.add(
      this.productoService.getProductos().subscribe({
        next: (listado: any) => {
          console.log('listado', listado);
          this.dataSource.data = listado;
          this.dataSourceUsuario.data = listado;
          this.dataSourceMobile.data = listado;
        },
        error: () => {
          this.openSnackBarError();
        },
      })
    );
  }
  filtro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSourceMobile.filter = filterValue.trim().toLowerCase();
  }
  filtroUsuario(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceUsuario.filter = filterValue.trim().toLowerCase();
    this.dataSourceMobile.filter = filterValue.trim().toLowerCase();
  }

  irNuevoProducto() {
    this.router.navigate(['producto/alta']);
  }

  volver() {
    this.router.navigate(['dashboard']);
  }
  openSnackBarError() {
    this._snackBar.openFromComponent(ServidorComponent, {
      duration: 1 * 1500,
    });
  }
  verificarVencimiento(producto: any) {
    if (producto && producto.fechaVencimiento) {
      const fechaActual: any = new Date();
      const fechaVencimiento: any = new Date(producto.fechaVencimiento);

      const diferenciaDias = Math.ceil(
        (fechaVencimiento - fechaActual) / (1000 * 60 * 60 * 24)
      );

      const rangoUmbral = 10;

      return diferenciaDias <= rangoUmbral;
    }

    return false;
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
}

@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Items por página:';
}
