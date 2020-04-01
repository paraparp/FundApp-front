import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ImportXMLService {

  constructor() { }



  extraerPrecio(producto: Producto, valor: string) {


    if (valor === 'precioActual') {

      return this.extractDataFromUrl(producto.url, 'priceText__1853e8a5')
    }
    else {
      return 0;
    }

  }

  extractDataFromUrl(url: string, classSpan: string) {

    var req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.setRequestHeader('Access-Control-Allow-Origin', '*');
    req.send(null);

    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(req.responseText, "text/html");
    var res = xmlDoc.evaluate(`//span[@class="${classSpan}"]`, xmlDoc, null, XPathResult.STRING_TYPE, null);


    return res.stringValue;
  }

  extractDataFromUrlXPATH(url: string, xpath: string) {

    var req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.setRequestHeader('Access-Control-Allow-Origin', '*');
    req.send(null);

    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(req.responseText, "text/html");
    var res = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.STRING_TYPE, null);

    return res.stringValue;
  }

  extractDataProducto(url: string, producto: Producto) {

    var req = new XMLHttpRequest();
    req.open("GET", url + producto.isin, false);
    req.setRequestHeader('Access-Control-Allow-Origin', '*');
    req.send(null);

    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(req.responseText, "text/html");

    let precioActual = xmlDoc.evaluate("//span[@class='mod-ui-data-list__value']", xmlDoc, null, XPathResult.STRING_TYPE, null).stringValue;
    let fechaActualizacion = xmlDoc.evaluate("//div[@class='mod-disclaimer']", xmlDoc, null, XPathResult.STRING_TYPE, null).stringValue;

    let datoProductoUrl: ProductDataUrl = { producto, precioActual, fechaActualizacion };

    return datoProductoUrl;
  }



}

export class ProductDataUrl {

  producto: Producto;
  precioActual: any;
  fechaActualizacion: string;


}
