import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-proveedor-xforma-pago',
  templateUrl: './proveedor-xforma-pago.component.html',
  styleUrls: ['./proveedor-xforma-pago.component.css'],
})
export class ProveedorXFormaPagoComponent {
  private suscription = new Subscription();
  displayedColumnsFormasPago: string[] = ['nombre'];
  dataSourceFormasPago = new MatTableDataSource<any>(
    this.data.proveedor.proveedoresXformaPagos
  );
  @ViewChild(MatSort) sort!: MatSort;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { proveedor: any }) {
    console.log('dataFormasPago', data);
  }
}
