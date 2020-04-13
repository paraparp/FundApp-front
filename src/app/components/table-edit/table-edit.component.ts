import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Lot } from 'src/app/models/lot.model';
import { LotService } from 'src/app/services/lot.service';


@Component({
  selector: 'app-table-edit',
  templateUrl: './table-edit.component.html',
  styleUrls: ['./table-edit.component.css']
})
export class TableEditComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() public lots: Lot[];

  displayedColumns = ["name", "price", "broker"];
  dataSource: MatTableDataSource<Lot>;

  constructor(private _dialog: MatDialog, private lotService: LotService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.lots);
    // this.dataSource.paginator = this.paginator;

  }

  openDialog(row: Lot) {
    console.log("Row clicked", row);
    const dialog = this._dialog.open(DialogComponent, {
      width: "450px",
      // Can be closed only by clicking the close button
      disableClose: true,
      data: row
    });

    dialog.afterClosed().subscribe(editedLot => {

      if (editedLot) {
        row.symbol = editedLot.symbol
        row.broker = editedLot.broker
        row.price = editedLot.price
        console.log("The dialog was closed");
        console.log(editedLot);
        this.lotService.edit(row).subscribe(resp => {
          this.dataSource._updateChangeSubscription()
        })
      }
    });
  }
}
