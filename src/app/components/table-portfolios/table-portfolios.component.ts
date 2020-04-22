import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Portfolio } from 'src/app/models/portfolio.model';

@Component({
  selector: 'app-table-portfolios',
  templateUrl: './table-portfolios.component.html',
  styleUrls: ['./table-portfolios.component.css']
})
export class TablePortfoliosComponent {

  constructor() { }

  @Input()
  portfolios: Portfolio[];

  @Output()
  delete = new EventEmitter();

  @Output()
  dialog = new EventEmitter();

  displayedColumns = ['name', 'cost', 'value', 'variation', 'list', 'edit'];

  onDelete(portfolio: Portfolio) {
    this.delete.emit(portfolio);
  }
  openDialog(portfolio: Portfolio) {
    this.dialog.emit(portfolio);
  }


}
