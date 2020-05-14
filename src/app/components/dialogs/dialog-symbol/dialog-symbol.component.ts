import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SymbolsService } from 'src/app/services/symbols.service';

@Component({
  selector: 'app-dialog-symbol',
  templateUrl: './dialog-symbol.component.html',
  styleUrls: ['./dialog-symbol.component.css']
})
export class DialogSymbolComponent implements OnInit {

  value;
  symbol = null;
  exist = false;
  error = false;
  searching = false;

  constructor(
    private dialogRef: MatDialogRef<DialogSymbolComponent>,
    private symbService: SymbolsService,
  ) { }

  ngOnInit(): void {
  }

  search(isin: string) {
    this.searching = true;
    this.error = false;
    this.symbService.searchByIsin(isin).subscribe(
      resp => {
        this.error = false;
        if (resp != null) {
          this.exist = true;
          this.searching = false;
        }
        else {
          this.exist = false;
          this.searching = false;
          this.error = true;
        }
        this.symbol = resp;
      })
  }

  save() {
    this.dialogRef.close(this.symbol);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  clear() {
    this.exist = false;
    this.value = '';
  }
}
