import { Component, Input, ViewChild } from '@angular/core';
import { Symb } from 'src/app/models/symbol.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MorningstarService } from 'src/app/services/morningstar.service';

@Component({
  selector: 'app-table-symbols',
  templateUrl: './table-symbols.component.html',
  styleUrls: ['./table-symbols.component.css']
})
export class TableSymbolsComponent {

  @Input() symbols: Symb[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['name', 'charges', 'category', 'type', 'location', 'ytd', 'yearAgo', 'fiveYears'];
  dataSource: MatTableDataSource<Symb>;

  constructor(private msService: MorningstarService
  ) { }

  ngOnChanges() {

    if (this.symbols !== undefined) {

      this.symbols.forEach(symb => this.msService.getSymbolInfoFromBack(symb.isin).subscribe((resp: any) => {
        symb.oneYear = resp[0].ReturnM12 / 100
        symb.ytd = resp[0].ReturnM0 / 100
        symb.fiveYears = resp[0].ReturnM60 / 100
        symb.charges = resp[0].OngoingCharge / 100

      }))



      console.log(this.symbols)
      this.dataSource = new MatTableDataSource(this.symbols)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator


    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  get1Year(isin: string) {
    return
  }

  styleObject(type): Object {
    switch (type) {
      case "Bond":
        return { 'background-color': 'grey' }
      case "Real State":
        return { 'background-color': 'orange' }
      default:
        return { 'background-color': 'black' }
    }
  }

}
