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

  displayedColumns = ["name", "price", "volume", "broker", "date"];
  dataSource: MatTableDataSource<Lot>;

  constructor(private _dialog: MatDialog, private lotService: LotService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.lots);
    // this.dataSource.paginator = this.paginator;

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
