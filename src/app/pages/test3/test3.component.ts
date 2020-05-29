import { Component, OnInit } from '@angular/core';
import { MorningstarService } from 'src/app/services/morningstar.service';

@Component({
  selector: 'app-test3',
  templateUrl: './test3.component.html',
  styleUrls: ['./test3.component.css']
})
export class Test3Component implements OnInit {

  symb;
  constructor(public msService: MorningstarService) { }

  ngOnInit(): void {


    this.getSymbol()
  }

  getSymbol() {

    let msCode;
    // this.msService.getSymbs2().subscribe(resp => msCode = resp.rows[0].SecId)

    this.msService.getHistoricalIsin().subscribe(resp => console.log(resp));
  }

}
