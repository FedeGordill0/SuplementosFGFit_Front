import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ProductoXproveedorService } from 'src/app/Services/producto-xproveedor.service';
import { ProveedorService } from 'src/app/Services/proveedor.service';

@Component({
  selector: 'app-proveedor-xforma-envio-listado',
  templateUrl: './proveedor-xforma-envio-listado.component.html',
  styleUrls: ['./proveedor-xforma-envio-listado.component.css'],
})
export class ProveedorXFormaEnvioListadoComponent {
  private suscription = new Subscription();
  displayedColumnsFormasEnvio: string[] = ['nombre'];
  dataSourceFormasEnvio = new MatTableDataSource<any>(
    this.data.proveedor.proveedoresXformaEnvios
  );
  @ViewChild(MatSort) sort!: MatSort;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { proveedor: any }) {
    console.log('dataFormasEnvio', data);
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
  ngAfterViewInit() {}
}
