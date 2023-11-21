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
import { FormaPago } from 'src/app/Models/forma-pago';
import { JwtAuth } from 'src/app/Models/jwt-auth';
import { Login } from 'src/app/Models/login';
import { FormaPagoService } from 'src/app/Services/forma-pago.service';
import { ServidorComponent } from '../../Messages/Error/servidor/servidor.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { UsuarioxrolService } from 'src/app/Services/usuarioxrol.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-forma-pago-listado',
  templateUrl: './forma-pago-listado.component.html',
  styleUrls: ['./forma-pago-listado.component.css'],
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
export class FormaPagoListadoComponent implements OnInit, OnDestroy {
  private suscription = new Subscription();
  listadoFormasPago: any = [];
  dataSource = new MatTableDataSource<any>(this.listadoFormasPago);
  displayedColumns: string[] = [
    'Forma de Pago',
    'descripcion',
    'porcentaje',
    'acciones',
    'a',
  ];

  dataSourceUsuario = new MatTableDataSource<any>(this.listadoFormasPago);
  displayedColumnsUsuario: string[] = [
    'Forma de Pago',
    'descripcion',
    'porcentaje',
  ];
  loginDto = new Login();
  jwtDto = new JwtAuth();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private suscripcion = new Subscription();
  usuario: any;
  usuariosRoles: any;
  rol: any;
  tabla_PC = true;
  tabla_M = false;

  dataSourceMobile = new MatTableDataSource<any>(this.listadoFormasPago);
  columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  columnsToDisplayMobile = ['nombre'];
  columnsToDisplayWithExpand = [...this.columnsToDisplayMobile, 'expand'];
  expandedElement: any | null;
  constructor(
    private formaPagoService: FormaPagoService,
    private usuarioRolService: UsuarioxrolService,
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
    this.suscripcion.add(
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
    this.dataSource.sortingDataAccessor = (item: any, property) => {
      console.log(item);
      console.log(property);
      switch (property) {
        case 'Forma de Pago':
          return item.nombre;
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
        case 'Forma de Pago':
          return item.nombre;
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
        case 'Forma de Pago':
          return item.nombre;
        default:
          return item[property];
      }
    };
    this.dataSourceMobile.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  actualizarListado() {
    this.suscription.add(
      this.formaPagoService.getFormasPago().subscribe({
        next: (listado: any) => {
          console.log(listado);
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
  irNuevaFormaPago() {
    this.router.navigate(['formaPago/alta']);
  }

  volver() {
    this.router.navigate(['dashboard']);
  }
  openSnackBarError() {
    this._snackBar.openFromComponent(ServidorComponent, {
      duration: 1 * 1500,
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
}
@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Items por página:';
}
