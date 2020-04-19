import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { SymbolLot } from 'src/app/models/symbol-lot.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-symbols-portfolio',
  templateUrl: './table-symbols-portfolio.component.html',
  styleUrls: ['./table-symbols-portfolio.component.css']
})
export class TableSymbolsPortfolioComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() public portfolioSymbs: SymbolLot[];

  displayedColumns = ['name', 'representation', 'volume', 'price', 'lastPrice', 'cost', 'value', 'variation', 'updated'];
  dataSource: MatTableDataSource<SymbolLot>;

  constructor() {
  }
  ngOnInit(): void {

  }
  ngOnChanges() {

    //Añadimos el porcentaje en cartera
    this.portfolioSymbs.forEach(lot => lot.percentInPortfolio = (lot.value / this.getTotalValue()))


    this.dataSource = new MatTableDataSource(this.portfolioSymbs)
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data, sortHeaderId: string) => {
      return this.getPropertyByPath(data, sortHeaderId);
    };
  }


  getPropertyByPath(obj: Object, pathString: string) {
    return pathString.split('.').reduce((o, i) => o[i], obj);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  isUpdated(updatedAt): boolean {

    var today = new Date();
    var yesterDay = today.getDate() - 1;
    var day = updatedAt.split(" ")[1];
    if (yesterDay == parseInt(day)) {
      return true
    }
    return false
  }


  getTotalValue() {
    return this.portfolioSymbs.map(lot => lot.value).reduce((acc, value) => acc + value, 0)
  }

  getTotalCost() {
    return this.portfolioSymbs.map(lot => lot.cost).reduce((acc, value) => acc + value, 0)
  }
  getTotalVariation() {
    return (this.getTotalValue() - this.getTotalCost()) / this.getTotalCost()
  }


  today() {

    return new Date();
  }

}
