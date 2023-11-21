import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaAltaComponent } from './Components/Categoria/categoria-alta/categoria-alta.component';
import { CategoriaListadoComponent } from './Components/Categoria/categoria-listado/categoria-listado.component';
import { CategoriaModificarComponent } from './Components/Categoria/categoria-modificar/categoria-modificar.component';
import { DashboardComponent } from './Components/Dashboard/dashboard/dashboard.component';
import { FormaPagoAltaComponent } from './Components/FormaPago/forma-pago-alta/forma-pago-alta.component';
import { FormaPagoListadoComponent } from './Components/FormaPago/forma-pago-listado/forma-pago-listado.component';
import { FormaPagoModificarComponent } from './Components/FormaPago/forma-pago-modificar/forma-pago-modificar.component';
import { FormaEnvioAltaComponent } from './Components/FormaEnvio/forma-envio-alta/forma-envio-alta.component';
import { FormaEnvioListadoComponent } from './Components/FormaEnvio/forma-envio-listado/forma-envio-listado.component';
import { FormaEnvioModificarComponent } from './Components/FormaEnvio/forma-envio-modificar/forma-envio-modificar.component';
import { ProductoAltaComponent } from './Components/Producto/producto-alta/producto-alta.component';
import { ProductoListadoComponent } from './Components/Producto/producto-listado/producto-listado.component';
import { ProductoModificarComponent } from './Components/Producto/producto-modificar/producto-modificar.component';
import { ProveedorAltaComponent } from './Components/Proveedor/proveedor-alta/proveedor-alta.component';
import { ProveedorListadoComponent } from './Components/Proveedor/proveedor-listado/proveedor-listado.component';
import { ProveedorModificarComponent } from './Components/Proveedor/proveedor-modificar/proveedor-modificar.component';
import { UnidadMedidaAltaComponent } from './Components/UnidadMedida/unidad-medida-alta/unidad-medida-alta.component';
import { UnidadMedidaListadoComponent } from './Components/UnidadMedida/unidad-medida-listado/unidad-medida-listado.component';
import { UnidadMedidaModificarComponent } from './Components/UnidadMedida/unidad-medida-modificar/unidad-medida-modificar.component';
import { UsuarioLoginComponent } from './Components/Usuario/usuario-login/usuario-login.component';
import { OrdenCompraAltaComponent } from './Components/Orden/orden-compra-alta/orden-compra-alta.component';
import { OrdenCompraModificarComponent } from './Components/Orden/orden-compra-modificar/orden-compra-modificar.component';
import { UsuarioAltaComponent } from './Components/Usuario/usuario-alta/usuario-alta.component';
import { ReportesComponent } from './Reportes/reportes/reportes.component';
import { ProveedorXProductoListadoComponent } from './Components/Proveedor/proveedor-xproducto-listado/proveedor-xproducto-listado.component';
import { ProveedorProductoAltaComponent } from './Components/Proveedor/proveedor-producto-alta/proveedor-producto-alta.component';
import { ProveedorProductoModificarComponent } from './Components/Proveedor/proveedor-producto-modificar/proveedor-producto-modificar.component';
import { ProveedorFormaEnvioAltaComponent } from './Components/Proveedor/ProveedorFormaEnvio/proveedor-forma-envio-alta/proveedor-forma-envio-alta.component';
import { ProveedorFormaEnvioModificarComponent } from './Components/Proveedor/ProveedorFormaEnvio/proveedor-forma-envio-modificar/proveedor-forma-envio-modificar.component';
import { ProveedorFormaEnvioListadoComponent } from './Components/Proveedor/ProveedorFormaEnvio/proveedor-forma-envio-listado/proveedor-forma-envio-listado.component';
import { ProveedorFormaPagoAltaComponent } from './Components/Proveedor/ProveedorFormaPago/proveedor-forma-pago-alta/proveedor-forma-pago-alta.component';
import { ProveedorFormaPagoListadoComponent } from './Components/Proveedor/ProveedorFormaPago/proveedor-forma-pago-listado/proveedor-forma-pago-listado.component';
import { ProveedorFormaPagoModificarComponent } from './Components/Proveedor/ProveedorFormaPago/proveedor-forma-pago-modificar/proveedor-forma-pago-modificar.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'categoria/listado', component: CategoriaListadoComponent },
  { path: 'categoria/alta', component: CategoriaAltaComponent },
  { path: 'categoria/modificar/:id', component: CategoriaModificarComponent },

  { path: 'formaEnvio/listado', component: FormaEnvioListadoComponent },
  { path: 'formaEnvio/alta', component: FormaEnvioAltaComponent },
  { path: 'formaEnvio/modificar/:id', component: FormaEnvioModificarComponent },

  { path: 'formaPago/listado', component: FormaPagoListadoComponent },
  { path: 'formaPago/alta', component: FormaPagoAltaComponent },
  { path: 'formaPago/modificar/:id', component: FormaPagoModificarComponent },

  { path: 'producto/listado', component: ProductoListadoComponent },
  { path: 'producto/alta', component: ProductoAltaComponent },
  { path: 'producto/modificar/:id', component: ProductoModificarComponent },

  { path: 'proveedor/listado', component: ProveedorListadoComponent },
  { path: 'proveedor/alta', component: ProveedorAltaComponent },
  { path: 'proveedor/modificar/:id', component: ProveedorModificarComponent },

  {
    path: 'proveedor/productos/listado/:id',
    component: ProveedorXProductoListadoComponent,
  },
  {
    path: 'proveedor/productos/alta/:idProveedor',
    component: ProveedorProductoAltaComponent,
  },
  {
    path: 'proveedor/productos/modificar/:idProveedor/:idProducto',
    component: ProveedorProductoModificarComponent,
  },

  {
    path: 'proveedor/formasEnvio/listado/:id',
    component: ProveedorFormaEnvioListadoComponent,
  },
  {
    path: 'proveedor/formasEnvio/alta/:idProveedor',
    component: ProveedorFormaEnvioAltaComponent,
  },
  {
    path: 'proveedor/formasEnvio/modificar/:idProveedor/:idFormaEnvio',
    component: ProveedorFormaEnvioModificarComponent,
  },

  {
    path: 'proveedor/formasPago/listado/:id',
    component: ProveedorFormaPagoListadoComponent,
  },
  {
    path: 'proveedor/formasPago/alta/:idProveedor',
    component: ProveedorFormaPagoAltaComponent,
  },
  {
    path: 'proveedor/formasPago/modificar/:idProveedor/:idFormaPago',
    component: ProveedorFormaPagoModificarComponent,
  },

  { path: 'unidadMedida/listado', component: UnidadMedidaListadoComponent },
  { path: 'unidadMedida/alta', component: UnidadMedidaAltaComponent },
  {
    path: 'unidadMedida/modificar/:id',
    component: UnidadMedidaModificarComponent,
  },

  {
    path: 'ordenCompra/modificar/:id',
    component: OrdenCompraModificarComponent,
  },

  { path: 'login', component: UsuarioLoginComponent },
  { path: 'registrarUsuario', component: UsuarioAltaComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'ordenCompra/alta', component: OrdenCompraAltaComponent },

  {
    path: 'reportes',
    component: ReportesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
