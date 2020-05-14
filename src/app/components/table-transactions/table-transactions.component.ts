import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Lot } from 'src/app/models/lot.model';
import { LotService } from 'src/app/services/lot.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table-transactions',
  templateUrl: './table-transactions.component.html',
  styleUrls: ['./table-transactions.component.css']
})
export class TableEditComponent {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() public lots: Lot[];
  @Output()
  delete = new EventEmitter();
  @Output()
  dialog = new EventEmitter();

  displayedColumns = ["name", "price", "volume", "cost", "change", "broker", "date", 'edit'];
  dataSource: MatTableDataSource<Lot>;

  constructor(private _dialog: MatDialog, private lotService: LotService) {
  }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.lots)
    this.dataSource.sort = this.sort;
    //Filter
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = data.symbol.name.toLowerCase() + data.broker.toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
    //Paginator
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }

  getPropertyByPath(obj: Object, pathString: string) {
    return pathString.split('.').reduce((o, i) => o[i], obj);
  }

  onDelete(lot: Lot) {
    this.delete.emit(lot);
  }

  openDialog(lot: Lot) {
    this.dialog.emit(lot);
  }


  calculateVariation(lot: Lot) {
    return (lot.symbol.lastPrice - lot.price) / lot.price
  }


  //Agrupacion test
  groupBySymbol() {
    //Group by symbol
    let group = this.lots.reduce((r, a) => {
      r[a.symbol.id] = [...r[a.symbol.id] || [], a];
      return r;
    }, {});
    console.log("group", group);
  }

  groupByDate() {
    const groups = this.lots.reduce((groups, lot) => {
      const date = lot.date.toString().split('T')[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(lot.cost);
      return groups;
    }, {});


    // Edit: to add it in the array format instead
    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        cost: groups[date]
      };
    });

    const group2 = [];
    groupArrays.map(((lot) => {
      group2.push({
        date: lot.date,
        cost: lot.cost.reduce((acc, value) => acc + value, 0)
      })
    }))

    return group2;

  }
}
