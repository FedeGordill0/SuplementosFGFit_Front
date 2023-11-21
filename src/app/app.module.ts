import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriaAltaComponent } from './Components/Categoria/categoria-alta/categoria-alta.component';
import { CategoriaBajaComponent } from './Components/Categoria/categoria-baja/categoria-baja.component';
import { CategoriaModificarComponent } from './Components/Categoria/categoria-modificar/categoria-modificar.component';
import {
  CategoriaListadoComponent,
  CustomPaginatorIntl,
} from './Components/Categoria/categoria-listado/categoria-listado.component';
import { FormaPagoListadoComponent } from './Components/FormaPago/forma-pago-listado/forma-pago-listado.component';
import { FormaPagoAltaComponent } from './Components/FormaPago/forma-pago-alta/forma-pago-alta.component';
import { FormaPagoBajaComponent } from './Components/FormaPago/forma-pago-baja/forma-pago-baja.component';
import { FormaPagoModificarComponent } from './Components/FormaPago/forma-pago-modificar/forma-pago-modificar.component';
import { FormaEnvioModificarComponent } from './Components/FormaEnvio/forma-envio-modificar/forma-envio-modificar.component';
import { FormaEnvioAltaComponent } from './Components/FormaEnvio/forma-envio-alta/forma-envio-alta.component';
import { FormaEnvioBajaComponent } from './Components/FormaEnvio/forma-envio-baja/forma-envio-baja.component';
import { FormaEnvioListadoComponent } from './Components/FormaEnvio/forma-envio-listado/forma-envio-listado.component';
import { ProductoListadoComponent } from './Components/Producto/producto-listado/producto-listado.component';
import { ProductoAltaComponent } from './Components/Producto/producto-alta/producto-alta.component';
import { ProductoBajaComponent } from './Components/Producto/producto-baja/producto-baja.component';
import { ProductoModificarComponent } from './Components/Producto/producto-modificar/producto-modificar.component';
import { ProveedorModificarComponent } from './Components/Proveedor/proveedor-modificar/proveedor-modificar.component';
import { ProveedorAltaComponent } from './Components/Proveedor/proveedor-alta/proveedor-alta.component';
import { ProveedorBajaComponent } from './Components/Proveedor/proveedor-baja/proveedor-baja.component';
import { ProveedorListadoComponent } from './Components/Proveedor/proveedor-listado/proveedor-listado.component';
import { UnidadMedidaListadoComponent } from './Components/UnidadMedida/unidad-medida-listado/unidad-medida-listado.component';
import { UnidadMedidaAltaComponent } from './Components/UnidadMedida/unidad-medida-alta/unidad-medida-alta.component';
import { UnidadMedidaBajaComponent } from './Components/UnidadMedida/unidad-medida-baja/unidad-medida-baja.component';
import { UnidadMedidaModificarComponent } from './Components/UnidadMedida/unidad-medida-modificar/unidad-medida-modificar.component';
import { UsuarioModificarComponent } from './Components/Usuario/usuario-modificar/usuario-modificar.component';
import { UsuarioAltaComponent } from './Components/Usuario/usuario-alta/usuario-alta.component';
import { UsuarioBajaComponent } from './Components/Usuario/usuario-baja/usuario-baja.component';
import { UsuarioListadoComponent } from './Components/Usuario/usuario-listado/usuario-listado.component';
import { UsuarioLoginComponent } from './Components/Usuario/usuario-login/usuario-login.component';
import { DashboardComponent } from './Components/Dashboard/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CategoriaService } from './Services/categoria.service';
import { FormaEnvioService } from './Services/forma-envio.service';
import { FormaPagoService } from './Services/forma-pago.service';
import { AuthenticationInterceptor } from './Services/interceptor';
import { ProductoService } from './Services/producto.service';
import { ProveedorService } from './Services/proveedor.service';
import { UnidadMedidaService } from './Services/unidad-medida.service';
import { UsuarioService } from './Services/usuario.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AltaComponent } from './Components/Messages/Categoria/alta/alta.component';
import { ErrorComponent } from './Components/Messages/Error/error.component';
import { ModificarComponent } from './Components/Messages/Categoria/modificar/modificar.component';
import { EliminarComponent } from './Components/Messages/Categoria/eliminar/eliminar.component';
import { ServidorComponent } from './Components/Messages/Error/servidor/servidor.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { OrdenCompraAltaComponent } from './Components/Orden/orden-compra-alta/orden-compra-alta.component';
import { MatStepperModule } from '@angular/material/stepper';
import { LoginComponent } from './Components/Messages/Error/login/login/login.component';
import { ProductoXproveedorService } from './Services/producto-xproveedor.service';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ProveedorXProductoListadoComponent } from './Components/Proveedor/proveedor-xproducto-listado/proveedor-xproducto-listado.component';
import { ProveedorXformaEnvioService } from './Services/proveedor-xenvio.service';
import { ProveedorXFormaEnvioListadoComponent } from './Components/Proveedor/proveedor-xforma-envio-listado/proveedor-xforma-envio-listado.component';
import { ProveedorXFormaPagoComponent } from './Components/Proveedor/proveedor-xforma-pago/proveedor-xforma-pago.component';
import { ProveedorXFormaPagoService } from './Services/proveedor-xforma-pago.service';
import { UsuarioxrolService } from './Services/usuarioxrol.service';
import { OrdenCompraService } from './Services/orden-compra.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DetalleOrdenService } from './Services/detalle-orden.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EstadoOrdenService } from './Services/estado-orden.service';
import { OrdenCompraModificarComponent } from './Components/Orden/orden-compra-modificar/orden-compra-modificar.component';
import { ModalComponent } from './Components/Messages/FormaEnvio/modal/modal.component';
import { ReportesComponent } from './Reportes/reportes/reportes.component';
import { ProveedorProductoAltaComponent } from './Components/Proveedor/proveedor-producto-alta/proveedor-producto-alta.component';
import { ProveedorProductoModificarComponent } from './Components/Proveedor/proveedor-producto-modificar/proveedor-producto-modificar.component';
import { ProveedorProductoEliminarComponent } from './Components/Proveedor/proveedor-producto-eliminar/proveedor-producto-eliminar.component';
import { ProveedorProductoListadoComponent } from './Components/Proveedor/ProveedorProductoListado-VistaUsuario/proveedor-producto-listado/proveedor-producto-listado.component';
import { RegistrarComponent } from './Components/Messages/RegistrarUsuario/registrar/registrar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { UsuarioExisteComponent } from './Components/Messages/RegistrarUsuario/usuario-existe/usuario-existe.component';
import { ProveedorFormaEnvioListadoComponent } from './Components/Proveedor/ProveedorFormaEnvio/proveedor-forma-envio-listado/proveedor-forma-envio-listado.component';
import { ProveedorFormaEnvioAltaComponent } from './Components/Proveedor/ProveedorFormaEnvio/proveedor-forma-envio-alta/proveedor-forma-envio-alta.component';
import { ProveedorFormaEnvioModificarComponent } from './Components/Proveedor/ProveedorFormaEnvio/proveedor-forma-envio-modificar/proveedor-forma-envio-modificar.component';
import { ProveedorFormaEnvioEliminarComponent } from './Components/Proveedor/ProveedorFormaEnvio/proveedor-forma-envio-eliminar/proveedor-forma-envio-eliminar.component';
import { ProveedorFormaPagoEliminarComponent } from './Components/Proveedor/ProveedorFormaPago/proveedor-forma-pago-eliminar/proveedor-forma-pago-eliminar.component';
import { ProveedorFormaPagoListadoComponent } from './Components/Proveedor/ProveedorFormaPago/proveedor-forma-pago-listado/proveedor-forma-pago-listado.component';
import { ProveedorFormaPagoModificarComponent } from './Components/Proveedor/ProveedorFormaPago/proveedor-forma-pago-modificar/proveedor-forma-pago-modificar.component';
import { ProveedorFormaPagoAltaComponent } from './Components/Proveedor/ProveedorFormaPago/proveedor-forma-pago-alta/proveedor-forma-pago-alta.component';
@NgModule({
  declarations: [
    AppComponent,
    CategoriaAltaComponent,
    CategoriaBajaComponent,
    CategoriaModificarComponent,
    CategoriaListadoComponent,
    FormaPagoListadoComponent,
    FormaPagoAltaComponent,
    FormaPagoBajaComponent,
    FormaPagoModificarComponent,
    FormaEnvioModificarComponent,
    FormaEnvioAltaComponent,
    FormaEnvioBajaComponent,
    FormaEnvioListadoComponent,
    ProductoListadoComponent,
    ProductoAltaComponent,
    ProductoBajaComponent,
    ProductoModificarComponent,
    ProveedorModificarComponent,
    ProveedorAltaComponent,
    ProveedorBajaComponent,
    ProveedorListadoComponent,
    UnidadMedidaListadoComponent,
    UnidadMedidaAltaComponent,
    UnidadMedidaBajaComponent,
    UnidadMedidaModificarComponent,
    UsuarioModificarComponent,
    UsuarioAltaComponent,
    UsuarioBajaComponent,
    UsuarioListadoComponent,
    UsuarioLoginComponent,
    DashboardComponent,
    AltaComponent,
    ErrorComponent,
    ModificarComponent,
    EliminarComponent,
    ServidorComponent,
    OrdenCompraAltaComponent,
    LoginComponent,
    ProveedorXProductoListadoComponent,
    ProveedorXFormaEnvioListadoComponent,
    ProveedorXFormaPagoComponent,
    OrdenCompraModificarComponent,
    ModalComponent,
    ReportesComponent,
    ProveedorProductoAltaComponent,
    ProveedorProductoModificarComponent,
    ProveedorProductoEliminarComponent,
    ProveedorProductoListadoComponent,
    RegistrarComponent,
    UsuarioExisteComponent,
    ProveedorFormaEnvioListadoComponent,
    ProveedorFormaEnvioAltaComponent,
    ProveedorFormaEnvioModificarComponent,
    ProveedorFormaEnvioEliminarComponent,
    ProveedorFormaPagoEliminarComponent,
    ProveedorFormaPagoListadoComponent,
    ProveedorFormaPagoModificarComponent,
    ProveedorFormaPagoAltaComponent,
  ],
  imports: [
    LayoutModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatExpansionModule,
    MatToolbarModule,
    MatCardModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgChartsModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatStepperModule,
    MatDialogModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    MatDatepickerModule,
    UsuarioService,
    UsuarioxrolService,
    ProductoService,
    CategoriaService,
    UnidadMedidaService,
    FormaEnvioService,
    FormaPagoService,
    ProveedorService,
    ProductoXproveedorService,
    ProveedorXformaEnvioService,
    ProveedorXFormaPagoService,
    UnidadMedidaService,
    OrdenCompraService,
    DetalleOrdenService,
    EstadoOrdenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl },
    { provide: MAT_DIALOG_DATA, useValue: { id: null } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
