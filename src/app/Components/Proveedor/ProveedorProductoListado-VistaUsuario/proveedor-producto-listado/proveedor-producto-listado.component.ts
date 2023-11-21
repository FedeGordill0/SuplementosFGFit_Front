import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-proveedor-producto-listado',
  templateUrl: './proveedor-producto-listado.component.html',
  styleUrls: ['./proveedor-producto-listado.component.css'],
})
export class ProveedorProductoListadoComponent {
  private suscription = new Subscription();
  displayedColumnsProveedor: string[] = ['nombre', 'precio', 'imagen'];
  dataSourceProductosProveedor = new MatTableDataSource<any>(
    this.data.proveedor.productosXproveedores
  );
  @ViewChild(MatSort) sort!: MatSort;
  tabla_PC = true;
  tabla_M = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { proveedor: any },
    private router: Router,
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
  cancelar() {
    this.router.navigate(['proveedor/listado']);
  }
}
