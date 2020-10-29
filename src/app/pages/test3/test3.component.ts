import { Component, OnInit } from '@angular/core';
import { MorningstarService } from '@service/morningstar.service';

@Component({
  selector: 'app-test3',
  templateUrl: './test3.component.html',
  styleUrls: ['./test3.component.css']
})
export class Test3Component implements OnInit {

  symb;
  constructor(public msService: MorningstarService) { }

  ngOnInit(): void {


  }



}
