import { Component, Input, ViewChild, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { PortfolioService } from '@service/portfolio.service';
import { Portfolio } from '@model/portfolio.model';
import { SymbolLot } from '@model/symbol-lot.model';

@Component({
  selector: 'app-table-symbols-portfolio',
  templateUrl: './table-symbols-portfolio.component.html',
  styleUrls: ['./table-symbols-portfolio.component.css']
})
export class TableSymbolsPortfolioComponent {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() public portfolioSymbs: SymbolLot[];
  @Input() public portfolio: Portfolio;
  @Output()
  filterTable = new EventEmitter();


  totalCost;
  totalValue;

  displayedColumns = ['name', 'representation', 'volume', 'price', 'lastPrice', 'daily', 'cost', 'value', 'variation'];
  dataSource: MatTableDataSource<SymbolLot>;
  types;
  option;
  brokers;
  filterT = new TableFilter();

  constructor(private cdref: ChangeDetectorRef, private portfolioService: PortfolioService) { }

  ngAfterViewInit(): void {


    this.chargedata()

  }

  filterData() {
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = data.symbol.name.toLowerCase() + data.symbol.category.toLowerCase() + data.symbol.lastDate.toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
  }

  onFilterTable(option: string, value: string) {
    if (option === 'broker')
      this.filterT.broker = value

    if (option === 'type')
      this.filterT.type = value

    this.filterTable.emit(this.filterT);
  }


  ngOnChanges() {
    this.chargedata()
  }

  chargedata() {


    this.dataSource = new MatTableDataSource(this.portfolioSymbs)
    this.totalCost = this.getTotalCost();
    this.totalValue = this.getTotalValue()

    this.getTypes(this.portfolio.id);
    this.getBrokers(this.portfolio.id);

    //Sort
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data, sortHeaderId: string) => {
      return this.getPropertyByPath(data, sortHeaderId);
    };
    if (this.sort != undefined)
      this.sort.sort(<MatSortable>{ id: 'percentInPortfolio', start: 'desc' });

    //Filter
    this.filterData();
    //you have to tell angular that you updated the content after ngAfterContentChecked
    this.cdref.detectChanges();
  }

  getPropertyByPath(obj: Object, pathString: string) {
    return pathString.split('.').reduce((o, i) => o[i], obj);
  }

  getTypes(idPortfolio) {
    this.portfolioService.getTypes(idPortfolio).subscribe(resp => this.types = resp)
  }

  getBrokers(idPortfolio) {
    this.portfolioService.getBrokers(idPortfolio).subscribe(resp => this.brokers = resp)
  }


  applyFilter(filterValue: string) {
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

export class TableFilter {

  contructor(broker: string, type: string) { }

  broker: string = '';
  type: string = ''
}
