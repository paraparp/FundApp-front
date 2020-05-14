import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';

import { SymbolLot } from 'src/app/models/symbol-lot.model';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SymbolsService } from 'src/app/services/symbols.service';

@Component({
  selector: 'app-table-symbols-portfolio',
  templateUrl: './table-symbols-portfolio.component.html',
  styleUrls: ['./table-symbols-portfolio.component.css']
})
export class TableSymbolsPortfolioComponent {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() public portfolioSymbs: SymbolLot[];
  @Output()
  filterTable = new EventEmitter();


  totalCost;
  totalValue;

  displayedColumns = ['name', 'representation', 'volume', 'price', 'lastPrice', 'daily', 'cost', 'value', 'variation'];
  dataSource: MatTableDataSource<SymbolLot>;
  types;

  option

  constructor(private cdref: ChangeDetectorRef, private symbolService: SymbolsService) { }


  ngAfterViewInit(): void {

    //Sort
    this.sort.sort(<MatSortable>{ id: 'percentInPortfolio', start: 'desc' });
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data, sortHeaderId: string) => {
      return this.getPropertyByPath(data, sortHeaderId);
    };

    //Filter
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = data.symbol.name.toLowerCase() + data.symbol.category.toLowerCase() + data.symbol.lastDate.toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }

    //you have to tell angular that you updated the content after ngAfterContentChecked
    this.cdref.detectChanges();


    this.getTypes();
  }

  onFilterTable(filter: String) {
    console.log(filter)
    this.filterTable.emit(filter);
  }


  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.portfolioSymbs)
    this.totalCost = this.getTotalCost();
    this.totalValue = this.getTotalValue()
  }

  getPropertyByPath(obj: Object, pathString: string) {
    return pathString.split('.').reduce((o, i) => o[i], obj);
  }

  getTypes() {
    this.symbolService.getTypes().subscribe(resp => this.types = resp)
  }

  brokers = ["MyInvestor", "Openbank"]

  applyFilter(filterValue: string) {
    console.log(filterValue)
    this.dataSource.filter = filterValue.toLowerCase();

    //Actualizamos totales
    this.totalCost = this.dataSource.filteredData.reduce((summ, v) => summ += v.cost, 0);
    this.totalValue = this.dataSource.filteredData.reduce((summ, v) => summ += v.value, 0);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isUpdated(updatedAt): boolean {
    if (updatedAt != null) {
      let yesterday = (d => new Date(d.setDate(d.getDate() - 1)))(new Date).getDate();
      let day = updatedAt.split(" ")[1];
      if (yesterday == parseInt(day)) {
        return true
      }
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


  calculation() {
    return this.dataSource.data.reduce((summ, v) => summ += v.cost, 0)
  }

  today() {
    return new Date();
  }

}
