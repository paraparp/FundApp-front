import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public auth: AuthenticationService) {
  }
  username: string = '';

  ngOnInit() {



    this.username = sessionStorage.getItem('username')
  }


}
