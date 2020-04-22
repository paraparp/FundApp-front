import { Component, OnInit, Input } from '@angular/core';
import { SymbolsService } from 'src/app/services/symbols.service';
import { Symb } from 'src/app/models/symbol.model';

@Component({
  selector: 'app-table-symbols',
  templateUrl: './table-symbols.component.html',
  styleUrls: ['./table-symbols.component.css']
})
export class TableSymbolsComponent implements OnInit {

  @Input()
  symbols: Symb[];



  constructor(private symbolsService: SymbolsService) { }



  displayedColumns = ['name', 'category', 'type', 'location', 'edit'];

  ngOnInit(): void {


  }

}
