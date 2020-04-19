import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Lot } from 'src/app/models/lot.model';
import { LotService } from 'src/app/services/lot.service';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-table-edit',
  templateUrl: './table-edit.component.html',
  styleUrls: ['./table-edit.component.css']
})
export class TableEditComponent {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() lots: Lot[] = [];

  displayedColumns = ["name", "price", "volume", "cost", "broker", "date"];
  dataSource: MatTableDataSource<Lot>;
  yeah: { date: string; lots: any; }[];

  constructor(private _dialog: MatDialog, private lotService: LotService) {
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.lots)

    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data, sortHeaderId: string) => {
      return this.getPropertyByPath(data, sortHeaderId);
    };
    this.dataSource.paginator = this.paginator;


  }

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

  getPropertyByPath(obj: Object, pathString: string) {
    return pathString.split('.').reduce((o, i) => o[i], obj);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  openDialog(row: Lot) {

    console.log(row)
    const dialog = this._dialog.open(DialogComponent, {
      width: "450px",
      disableClose: true,
      data: row
    });

    dialog.afterClosed().subscribe(editedLot => {
      console.log(editedLot)
      if (editedLot) {
        this.lotService.edit(editedLot).subscribe(resp => this.dataSource._updateChangeSubscription())
      }
    });
  }
}
