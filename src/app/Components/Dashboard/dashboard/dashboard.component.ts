import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';

import { Subscription } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { DetalleOrden } from 'src/app/Models/detalle-orden';
import { EstadoOrdenCompra } from 'src/app/Models/estado-orden-compra';
import { JwtAuth } from 'src/app/Models/jwt-auth';
import { Login } from 'src/app/Models/login';
import { OrdenCompra } from 'src/app/Models/orden-compra';
import { Usuario } from 'src/app/Models/usuario';
import { Usuarioxrol } from 'src/app/Models/usuarioxrol';
import { DetalleOrdenService } from 'src/app/Services/detalle-orden.service';
import { EstadoOrdenService } from 'src/app/Services/estado-orden.service';
import { OrdenCompraService } from 'src/app/Services/orden-compra.service';
import { ProductoXproveedorService } from 'src/app/Services/producto-xproveedor.service';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { UsuarioxrolService } from 'src/app/Services/usuarioxrol.service';
import { ModalComponent } from '../../Messages/FormaEnvio/modal/modal.component';
import { ModalComponent2 } from '../../Messages/TerminosCondiciones/modal/modal.component';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OrdenCompraProductoComponent } from '../../Orden/orden-compra-producto/orden-compra-producto.component';
const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
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
export class DashboardComponent implements OnInit, OnDestroy {
  showFiller: boolean;
  private suscripcion = new Subscription();
  loginDto = new Login();
  jwtDto = new JwtAuth();
  usuario: any;
  rol: any;
  usuarioId: number;
  listadoProductoProveedor: any[] = [];
  listadoOrdenCompra: any[] = [];
  dataSourcePP = new MatTableDataSource<any>(this.listadoProductoProveedor);
  displayedColumnsPP: string[] = ['Producto', 'Proveedor', 'Precio'];

  dataSource = new MatTableDataSource<any>(this.listadoOrdenCompra);
  displayedColumns: string[] = [
    'Proveedor',
    'Forma de Pago',
    'Forma de Envío',
    'Fecha',
    'Producto',
    'Monto Total',
    'Estado',
    'a',
  ];
  // displayedColumns: string[] = [
  //   'Proveedor',
  //   'Forma de Pago',
  //   'Forma de Envío',
  //   'Fecha',
  //   'Producto',
  //   'Monto Total',
  //   'Estado',
  //   'a',
  // ];
  dataSourceUsuario = new MatTableDataSource<any>(this.listadoOrdenCompra);
  displayedColumnsUsuario: string[] = [
    'Proveedor',
    'Forma de Pago',
    'Forma de Envío',
    'Fecha',
    'Producto',
    'Monto Total',
    'Estado',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  usuariosRoles: any;
  estados: EstadoOrdenCompra[] = [];
  //  --------------------------------------------
  porcentajeEstadosReporte: ChartData<'pie'>;

  listadoporcentajeEstadoRechazado: any;
  private mensajeRechazado: string[] = [
    `Porcentaje de ordenes de compra rechazadas`,
  ];

  porcentajeEstadoAceptado: ChartData<'pie'>;
  listadoporcentajeEstadoAceptado: any;
  private mensajeAceptado: string[] = [
    `Porcentaje de ordenes de compra aceptadas`,
  ];

  porcentajeEstadoPendiente: ChartData<'pie'>;
  listadoporcentajeEstadoPendiente: any;
  private mensajePendiente: string[] = [
    `Porcentaje de ordenes de compra pendientes`,
  ];

  campaignOne: FormGroup;

  acc: any;
  detallesOrdenesCompra: any[] = [];

  dataSourceMobile = new MatTableDataSource<any>(this.listadoProductoProveedor);
  columnsToDisplayMobile = ['Proveedor', 'Monto Total', 'Fecha'];
  columnsToDisplayWithExpand = [...this.columnsToDisplayMobile];
  expandedElement: any | null;
  tabla_PC = true;
  tabla_M = false;
  listadoProductosOrden: any;
  precioProductoOrden: any;
  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private usuarioRolService: UsuarioxrolService,
    private productoProveedorService: ProductoXproveedorService,
    private ordenCompraService: OrdenCompraService,
    private detalleOrden: DetalleOrdenService,
    private estadoOrdenService: EstadoOrdenService,
    private dialog: MatDialog,
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

    this.suscripcion.add(
      this.productoProveedorService.getProductosXProveedores().subscribe({
        next: (listado: any) => {
          this.listadoProductoProveedor = listado.filter((l: any) => {
            return l.idProveedorNavigation?.estado;
          });
          this.dataSourcePP.data = this.listadoProductoProveedor;
          this.dataSourceUsuario.data = this.listadoProductoProveedor;
        },
        error: () => {
          alert('ERROR productoProveedorService.getProductosXProveedores');
        },
      })
    );

    // this.suscripcion.add(
    //   this.detalleOrden.getDetallesOrdenesCompra().subscribe({
    //     next: (listado: any) => {
    //       console.log('getDetallesOrdenesCompra', listado);
    //       //BORRAR ESTE FILTRO Y ASIGNAR  this.dataSource.data = this.listado;
    //       // this.listadoOrdenCompra = listado.$values.filter((element: any) => {
    //       //   return element.$id == 2;
    //       // });
    //       this.listadoOrdenCompra = listado.$values;
    //       console.log('this.listadoOrdenCompra', this.listadoOrdenCompra);

    //       this.dataSource.data = this.listadoOrdenCompra;
    //       this.dataSourceUsuario.data = this.listadoOrdenCompra;
    //       this.dataSourceMobile.data = this.listadoOrdenCompra;
    //     },
    //     error: () => {
    //       alert('ERROR usuarioRolService.getUsuarioRolID');
    //     },
    //   })
    // );

    this.suscripcion.add(
      this.ordenCompraService.getOrdenesCompra().subscribe({
        next: (listado: any) => {
          console.log(listado);
          this.dataSource.data = listado;
          this.dataSourceMobile.data = listado;
          this.dataSourceUsuario.data = listado;
          this.listadoProductosOrden = listado.forEach((producto: any) => {
            console.log('listadoProductosOrden', producto.detalleOrdens);
            const precioProductoOrden = producto.detalleOrdens.map(
              (pp: any) => pp.precio
            );

            // Concatena los precios al array acumulativo
            this.precioProductoOrden = precioProductoOrden;
            console.log('this.precioProductoOrden ', this.precioProductoOrden);
          });
        },
        error: () => {
          alert('ERROR usuarioRolService.getUsuarioRolID');
        },
      })
    );

    this.suscripcion.add(
      this.estadoOrdenService.getEstadoOrdenesCompra().subscribe({
        next: (listado: any) => {
          this.estados = listado;
        },
        error: () => {
          alert('ERROR usuarioRolService.getUsuarioRolID');
        },
      })
    );

    this.porcentajesReporte();

    this.dataSource.filterPredicate = (data, filter) => {
      console.log('data', data);
      console.log('data', data.idEstadoOrdenNavigation?.Estado);
      return data.idEstadoOrdenNavigation?.estado
        .toLowerCase()
        .includes(filter);
    };
    this.dataSourceUsuario.filterPredicate = (data, filter) => {
      console.log('data', data);
      console.log('data', data.idEstadoOrdenNavigation?.Estado);
      return data.idEstadoOrdenNavigation?.estado
        .toLowerCase()
        .includes(filter);
    };
    this.dataSourceMobile.filterPredicate = (data, filter) => {
      console.log('data', data);
      console.log('data', data.idEstadoOrdenNavigation?.Estado);
      return data.idEstadoOrdenNavigation?.estado
        .toLowerCase()
        .includes(filter);
    };
  }
  ngAfterViewInit() {
    this.dataSourcePP.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'Proveedor':
          return item.idProveedorNavigation?.nombre;
        case 'Forma de Pago':
          return item.idFormaPagoNavigation?.nombre;
        case 'Forma de Envío':
          return item.idFormaEnvioNavigation?.nombre;
        case 'Monto Total':
          return item.detalleOrdens[0]?.precio;
        case 'Fecha':
          return item.fechaRegistro;
        case 'Estado':
          return item.idEstadoOrdenNavigation?.estado;

        default:
          break;
      }
    };
    this.dataSource.sort = this.sort;

    this.dataSourceUsuario.paginator = this.paginator;
    this.dataSourceUsuario.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'Proveedor':
          return item.idProveedorNavigation?.nombre;
        case 'Forma de Pago':
          return item.idFormaPagoNavigation?.nombre;
        case 'Forma de Envío':
          return item.idFormaEnvioNavigation?.nombre;
        case 'Monto Total':
          return item.detalleOrdens[0]?.precio;
        case 'Fecha':
          return item.fechaRegistro;
        case 'Estado':
          return item.idEstadoOrdenNavigation?.estado;

        default:
          break;
      }
    };
    this.dataSourceUsuario.sort = this.sort;

    this.dataSourcePP.sort = this.sort;
  }

  cerrarSesion() {
    localStorage.removeItem('jwtToken');
    console.log(this.jwtDto.token);
    this.router.navigate(['login']);
  }
  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

  applyFilter(event: Event) {
    console.log(event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilterUsuario(event: Event) {
    console.log(event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceUsuario.filter = filterValue.trim().toLowerCase();
  }
  applyFilterMobile(event: Event) {
    console.log(event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceMobile.filter = filterValue.trim().toLowerCase();
  }

  porcentajesReporte() {
    this.suscripcion.add(
      this.ordenCompraService.getOrdenesCompra().subscribe({
        next: (respuesta: OrdenCompra[]) => {
          const ordenesTotales = respuesta.length;

          const resRechazadas = respuesta.filter((r: OrdenCompra) => {
            return r.idEstadoOrden === 4;
          });
          this.listadoporcentajeEstadoRechazado = resRechazadas.length;

          const resAceptadas = respuesta.filter((r: OrdenCompra) => {
            return r.idEstadoOrden === 2;
          });
          this.listadoporcentajeEstadoAceptado = resAceptadas.length;

          const resPendientes = respuesta.filter((r: OrdenCompra) => {
            return r.idEstadoOrden === 1;
          });
          this.listadoporcentajeEstadoPendiente = resPendientes.length;

          const resultadoRechazadas =
            (this.listadoporcentajeEstadoRechazado / ordenesTotales) * 100;

          const resultadoAprobadas =
            (this.listadoporcentajeEstadoAceptado / ordenesTotales) * 100;

          const resultadoPendientes =
            (this.listadoporcentajeEstadoPendiente / ordenesTotales) * 100;

          this.porcentajeEstadosReporte = {
            labels: [
              this.mensajeRechazado,
              this.mensajeAceptado,
              this.mensajePendiente,
            ],
            datasets: [
              {
                data: [
                  resultadoRechazadas,
                  resultadoAprobadas,
                  resultadoPendientes,
                ],
                backgroundColor: ['red', 'green', 'yellow'],
              },
            ],
          };
        },
        error: () => {
          alert('asddas');
        },
      })
    );
  }

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: false,
  };
  public pieChartLabels = [['Rechazadas'], ['Pendientes'], 'Aceptadas'];
  public doughnutChartLabels = [['Rechazadas'], ['Pendientes'], 'Aceptadas'];
  public pieChartDatasets = [
    {
      data: [300, 500, 100],
    },
  ];
  public pieChartLegend = true;
  public doughnutChartLegend = true;
  public pieChartPlugins = [];
  public doughnutChartPlugins = [];

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    ],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  isExpanded = false;
  isExpanded2 = false;
  isExpanded3 = false;
  isExpanded4 = false;
  isExpanded5 = false;
  isExpanded6 = false;
  isExpanded7 = false;

  // Método para cambiar el estado del botón
  toggleButton1() {
    this.isExpanded = !this.isExpanded;
  }
  toggleButton2() {
    this.isExpanded2 = !this.isExpanded2;
  }
  toggleButton3() {
    this.isExpanded3 = !this.isExpanded3;
  }
  toggleButton4() {
    this.isExpanded4 = !this.isExpanded4;
  }
  toggleButton5() {
    this.isExpanded5 = !this.isExpanded5;
  }
  toggleButton6() {
    this.isExpanded6 = !this.isExpanded6;
  }
  toggleButton7() {
    this.isExpanded7 = !this.isExpanded7;
  }

  panelOpenState = false;

  filtroMontoFechas() {
    const startDate = this.campaignOne.get('start')?.value;
    const endDate = this.campaignOne.get('end')?.value;

    if (startDate && endDate) {
      this.suscripcion.add(
        this.detalleOrden.getDetallesOrdenesCompra().subscribe({
          next: (respuesta: any) => {
            console.log('respuesta', respuesta);
            const detallesEnRango = respuesta.$values.filter((detalle: any) => {
              const fechaDetalle = new Date(
                detalle.IdOrdenCompraNavigation.FechaRegistro
              );
              return fechaDetalle >= startDate && fechaDetalle <= endDate;
            });
            console.log('detallesEnRango', detallesEnRango);

            const montoTotal = detallesEnRango.reduce(
              (total: number, detalle: any) =>
                (total += detalle.Precio * detalle.Cantidad),
              0
            );

            this.detallesOrdenesCompra = detallesEnRango; // Esto almacena los detalles en rango, si es necesario
            this.acc = montoTotal;

            console.log('Monto total en el rango de fechas:', this.acc);
          },
          error: (error: any) => {
            console.error(
              'Error al obtener los detalles de la orden de compra',
              error
            );
          },
        })
      );
    } else {
      console.log('Selecciona un rango de fechas válido.');
    }
  }
  openDialogFormaEnvio() {
    const dialogRef = this.dialog.open(ModalComponent);
  }
  openDialogTerminos() {
    const dialogRef = this.dialog.open(ModalComponent2);
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
  openDialogProductosOrdenCompra(producto: any) {
    const dialogRef = this.dialog.open(OrdenCompraProductoComponent, {
      data: { producto: producto },
    });
  }
}
