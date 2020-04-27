import { Component, Input, ViewChild } from '@angular/core';
import { Symb } from 'src/app/models/symbol.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-symbols',
  templateUrl: './table-symbols.component.html',
  styleUrls: ['./table-symbols.component.css']
})
export class TableSymbolsComponent {

  @Input() symbols: Symb[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['name', 'category', 'type', 'location'];
  dataSource: MatTableDataSource<Symb>;

  constructor() { }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.symbols)
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
