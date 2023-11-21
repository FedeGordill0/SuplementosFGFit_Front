import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions, ChartConfiguration } from 'chart.js';
import { JwtAuth } from './Models/jwt-auth';
import { Login } from './Models/login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loginDto = new Login();
  jwtDto = new JwtAuth();
  usuario: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.usuario = localStorage.getItem('email');
  }

  cerrarSesion() {
    //Eliminar token al cerrar sesión, lo hacemos en area debido a que queremos mostrar esta info al loguearse
    localStorage.removeItem('jwtToken');
    console.log(this.jwtDto.token);
    this.router.navigate(['login']);
  }

  // ------------------------------
  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [
    ['Download', 'Sales'],
    ['In', 'Store', 'Sales'],
    'Mail Sales',
  ];
  public pieChartDatasets = [
    {
      data: [300, 500, 100],
    },
  ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

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

  isExpanded = false; // Variable para controlar el estado del botón
  isExpanded2 = false; // Variable para controlar el estado del botón
  isExpanded3 = false; // Variable para controlar el estado del botón
  isExpanded4 = false; // Variable para controlar el estado del botón
  isExpanded5 = false; // Variable para controlar el estado del botón

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

  panelOpenState = false;
}
