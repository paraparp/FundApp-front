import { Component, OnInit } from '@angular/core';
import { Cartera } from 'src/app/models/cartera.model';
import { Operacion } from 'src/app/models/operacion.model';
import { Producto } from 'src/app/models/producto.model';
import { ProductosService } from 'src/app/services/productos.service';
import { ImportXMLService, ProductDataUrl } from 'src/app/services/import-xml.service';
import { DataSourceService } from 'src/app/services/dataSource.service';




@Component({
  selector: 'app-tabla-productos',
  templateUrl: './tabla-productos.component.html',
  styleUrls: ['./tabla-productos.component.css']


})
export class TablaProductosComponent implements OnInit {

  //  @Input() public isin: string = '';

  constructor(
    public data: DataSourceService,
    public productoService: ProductosService,
    public importxml: ImportXMLService
  ) { }

  // displayedColumns = ['nombre', 'isin', 'codigoBl', 'participaciones', 'precio', 'precioActual', 'valor'];
  displayedColumns = ['nombre', 'isin', 'participaciones', 'precio', 'precioActual', 'valor', 'valorActual', '%', 'fechaActualizacion'];

  productos: Producto[] = [];
  cartera: Cartera
  operaciones: Operacion[];
  valorSpan: string;
  dataTable: ProductDataUrl[];
  idCartera = 1;

  urlFT = 'https://markets.ft.com/data/funds/tearsheet/summary?s=';



  ngOnInit() {
    this.cargarCartera();
    this.dataTable = this.cargarDataTabla();
    console.log(this.dataTable)

  }

  valorUrl(prod, valor) {

    let htmlElement = ''

    switch (valor) {
      case 'precioAct':
        htmlElement = "//span[@class='mod-ui-data-list__value']"
        break;
      case 'fechaAct':
        htmlElement = "//div[@class='mod-disclaimer']"
        break;
      default:
        break;
    }



    return this.importxml.extractDataFromUrlXPATH(
      this.urlFT + prod.isin, htmlElement
    );
  }

  calcularValorActualProducto(prod: ProductDataUrl) {

    return prod.precioActual * this.getVolumen(prod.producto)

  }

  calcularVariacionValorProducto(prod: ProductDataUrl) {

    return (this.calcularValorActualProducto(prod) - this.getTotalValorProducto(prod.producto)) / this.getTotalValorProducto(prod.producto);

  }

  cargarDataTabla() {
    let dataTable: ProductDataUrl[] = [];
    this.cargarProductos().forEach(prod => {
      dataTable.push(this.importxml.extractDataProducto(this.urlFT, prod))

    });

    return dataTable;
  }

  extraerPrecio(prod, valor) {
    return this.importxml.extraerPrecio(prod, valor);
  }

  findOperacionesPorCartera() {

    return this.productoService.findOperacionesPorCartera('1');
  }

  cargarProductos() {
    return this.productos = this.data.getProductos();
  }


  cargarCartera() {
    return this.cartera = this.data.getCartera()[0];

  }

  getPrecioMedio(prod: Producto) {

    return this.productoService.precioMedioProductoEnCartera(prod.isin, '1');
  }

  getVolumen(prod: Producto) {
    return this.productoService.participacionesPorProducto(prod.isin, '1');
  }


  // cargarOperaciones(isin) {
  //
  //   return this.operaciones = this.data.getOperacionesByIsin(isin);
  // }


  /** Gets the total cost of all transactions. */
  getTotalVol(operaciones: Operacion[]) {
    return operaciones.map(p => p.participaciones).reduce((acc, value) => acc + value, 0);
  }

  // getTotalCost() {
  //   return this.operaciones.map(p => p.getImporte()).reduce((acc, value) => acc + value, 0);
  // }

  getTotalValorProducto(prod: Producto) {
    return this.productoService.getValorTotalProducto(prod.isin, '1');
  }

  getValorActualTotal(prod: ProductDataUrl) {
    let totalOp = 0;
    this.cargarDataTabla().forEach(prod => {


      totalOp += this.calcularValorActualProducto(prod);

    });
    return totalOp;

  }

  getTotalValorCartera() {
    return this.productoService.getTotalValorCartera('1');
  }

}
