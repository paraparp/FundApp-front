

import { ProductosService } from 'src/app/services/productos.service';
import { ImportXMLService, ProductDataUrl } from 'src/app/services/import-xml.service';
import { DataSourceService } from 'src/app/services/dataSource.service';
import { OnInit, Component, Input } from '@angular/core';
import { Lot } from 'src/app/models/lot.model';
import { Portfolio } from 'src/app/models/portfolio.model';
import { Symbol } from 'src/app/models/symbol.model';



@Component({
  selector: 'app-tabla-productos',
  templateUrl: './tabla-productos.component.html',
  styleUrls: ['./tabla-productos.component.css']


})
export class TablaProductosComponent implements OnInit {

  @Input() public portfolioSymbols;

  constructor(
    public productoService: ProductosService,
    public importxml: ImportXMLService
  ) { }

  // displayedColumns = ['nombre', 'isin', 'codigoBl', 'participaciones', 'precio', 'precioActual', 'valor'];
  displayedColumns = ['nombre', 'isin', 'participaciones', 'precio', 'precioActual', 'valor', 'valorActual', '%', 'fechaActualizacion'];

  productos: Symbol[] = [];
  cartera: Portfolio;
  operaciones: Lot[];
  valorSpan: string;
  dataTable: ProductDataUrl[];



  urlFT = 'https://markets.ft.com/data/funds/tearsheet/summary?s=';



  ngOnInit() {

    //
    // const map = this.lots.reduce((map, lot) => map.set(lot.symbol.id, lot), new Map());
    //
    //
    // console.log(map)
    //
    // this.dataTable = this.cargarDataTabla();



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

  // cargarDataTabla() {
  //   let dataTable: ProductDataUrl[] = [];
  //   this.cargarProductos().forEach(prod => {
  //     dataTable.push(this.importxml.extractDataProducto(this.urlFT, prod))
  //
  //   });
  //
  //   return dataTable;
  // }

  extraerPrecio(prod, valor) {
    return this.importxml.extraerPrecio(prod, valor);
  }

  findOperacionesPorCartera() {

    return this.productoService.findOperacionesPorCartera('1');
  }




  getPrecioMedio(prod: Symbol) {

    return this.productoService.precioMedioProductoEnCartera(prod.isin, '1');
  }

  getVolumen(prod: Symbol) {
    return this.productoService.participacionesPorProducto(prod.isin, '1');
  }


  // cargarOperaciones(isin) {
  //
  //   return this.operaciones = this.data.getOperacionesByIsin(isin);
  // }


  /** Gets the total cost of all transactions. */
  getTotalVol(operaciones: Lot[]) {
    // return operaciones.map(p => p.participaciones).reduce((acc, value) => acc + value, 0);
  }

  // getTotalCost() {
  //   return this.operaciones.map(p => p.getImporte()).reduce((acc, value) => acc + value, 0);
  // }

  getTotalValorProducto(prod: Symbol) {
    return this.productoService.getValorTotalProducto(prod.isin, '1');
  }

  // getValorActualTotal(prod: ProductDataUrl) {
  //   let totalOp = 0;
  //   this.cargarDataTabla().forEach(prod => {
  //
  //
  //     totalOp += this.calcularValorActualProducto(prod);
  //
  //   });
  //   return totalOp;
  //
  // }



}
