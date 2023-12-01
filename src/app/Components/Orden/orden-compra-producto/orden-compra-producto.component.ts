import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-orden-compra-producto',
  templateUrl: './orden-compra-producto.component.html',
  styleUrls: ['./orden-compra-producto.component.css'],
})
export class OrdenCompraProductoComponent {
  dataSource = new MatTableDataSource<any>(this.data.producto.detalleOrdens);
  displayedColumns: string[] = ['imagen', 'nombre', 'cantidad', 'precio'];
  constructor(@Inject(MAT_DIALOG_DATA) public data: { producto: any }) {
    console.log('dataFormasEnvio', this.data.producto.detalleOrdens);
  }
}
