import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ChartData, ChartOptions, ChartConfiguration } from 'chart.js';
import { Subscription } from 'rxjs';
import { ModalComponent } from 'src/app/Components/Messages/FormaEnvio/modal/modal.component';
import { ModalComponent2 } from 'src/app/Components/Messages/TerminosCondiciones/modal/modal.component';
import { EstadoOrdenCompra } from 'src/app/Models/estado-orden-compra';
import { JwtAuth } from 'src/app/Models/jwt-auth';
import { Login } from 'src/app/Models/login';
import { OrdenCompra } from 'src/app/Models/orden-compra';
import { DetalleOrdenService } from 'src/app/Services/detalle-orden.service';
import { EstadoOrdenService } from 'src/app/Services/estado-orden.service';
import { OrdenCompraService } from 'src/app/Services/orden-compra.service';
import { ProductoXproveedorService } from 'src/app/Services/producto-xproveedor.service';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { UsuarioxrolService } from 'src/app/Services/usuarioxrol.service';
const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
})
export class ReportesComponent {
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
    'Monto Total',
    'Fecha',
    'Producto',
    'Estado',
    'a',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('monto') monto: ElementRef;
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
  barChartData2: ChartConfiguration<'bar'>['data'];
  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private usuarioRolService: UsuarioxrolService,
    private productoProveedorService: ProductoXproveedorService,
    private ordenCompraService: OrdenCompraService,
    private detalleOrden: DetalleOrdenService,
    private estadoOrdenService: EstadoOrdenService,
    private dialog: MatDialog
  ) {
    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16)),
    });
  }

  ngOnInit() {
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
        },
        error: () => {
          alert('ERROR productoProveedorService.getProductosXProveedores');
        },
      })
    );

    this.suscripcion.add(
      this.detalleOrden.getDetallesOrdenesCompra().subscribe({
        next: (listado: any) => {
          console.log('getDetallesOrdenesCompra', listado);
          this.listadoOrdenCompra = listado.$values;
          console.log('this.listadoOrdenCompra', this.listadoOrdenCompra);

          this.dataSource.data = this.listadoOrdenCompra;
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
    this.dataSourcePP.filterPredicate = (data, filter) => {
      return data.idProductoNavigation?.nombre.toLowerCase().includes(filter);
    };
  }
  ngAfterViewInit() {
    this.dataSourcePP.paginator = this.paginator;
    this.dataSourcePP.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'Producto':
          return item.idProductoNavigation?.nombre;
          break;

        case 'Proveedor':
          return item.idProveedorNavigation?.nombre;
          break;

        case 'Precio':
          return item.precio;
          break;

        default:
          break;
      }
    };
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
    this.dataSourcePP.filter = filterValue.trim().toLowerCase();
  }

  porcentajesReporte() {
    this.suscripcion.add(
      this.ordenCompraService.getOrdenesCompra().subscribe({
        next: (respuesta: OrdenCompra[]) => {
          const ordenesTotales = respuesta.length;

          const resRechazadas = respuesta.filter((r: OrdenCompra) => {
            return r.idEstadoOrden === 2;
          });
          this.listadoporcentajeEstadoRechazado = resRechazadas.length;

          const resAceptadas = respuesta.filter((r: OrdenCompra) => {
            return r.idEstadoOrden === 3;
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
              this.mensajePendiente,
              this.mensajeAceptado,
            ],
            datasets: [
              {
                data: [
                  resultadoRechazadas,
                  resultadoPendientes,
                  resultadoAprobadas,
                ],
                backgroundColor: ['red', 'yellow', 'green'],
              },
            ],
          };

          this.barChartData2 = {
            labels: [['Rechazadas', 'Pendientes', 'Aceptadas']],
            datasets: [
              {
                data: [resultadoPendientes],
                label: 'Pendientes',
                backgroundColor: ['#8C77FF'],
              },
              {
                data: [resultadoRechazadas],
                label: 'Rechazadas',
                backgroundColor: ['#D92A3D'],
              },
              {
                data: [resultadoAprobadas],
                label: 'Aceptadas',
                backgroundColor: ['#00AE66'],
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

  isExpanded = false;
  isExpanded2 = false;
  isExpanded3 = false;
  isExpanded4 = false;
  isExpanded5 = false;
  isExpanded6 = false;

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

            this.detallesOrdenesCompra = detallesEnRango;
            this.acc = montoTotal;

            console.log('Monto total en el rango de fechas:', this.acc);

            this.monto.nativeElement.style.display = '';
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

  cancelar() {
    this.router.navigate(['dashboard']);
  }

  // ------------------------------
  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };

  public pieChartLabels = [['Rechazadas'], ['Pendientes'], ['Aceptadas']];

  public pieChartDatasets = [
    {
      data: [300, 500, 100],
    },
  ];
  public pieChartLegend = true;

  public pieChartPlugins = [];

  // ---------------------------------------
  public barChartOptions2: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {},
      y: {
        min: 0,
        max: 100,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
      },
    },
    indexAxis: 'x',
    datasets: {
      bar: {
        barThickness: 40,
        maxBarThickness: 60,
        minBarLength: 9,
      },
    },
  };

  public barChartLegend2 = true;
  public barChartPlugins2 = [];
}
