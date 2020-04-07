
import { Component, OnInit } from '@angular/core';



import { UsuarioService } from 'src/app/services/usuario.service';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Portfolio } from 'src/app/models/portfolio.model';
export interface Transaction {
  item: string;
  cost: number;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {



  constructor(private auth: AuthenticationService, private userService: UsuarioService) {
  }
  username: string = '';

  user: User;

  portfolios: Portfolio[];


  ngOnInit() {
    this.userService.findUsuariosById(this.auth.usuario.id).subscribe((resp: any) => {

      this.user = resp

      this.portfolios = resp.portfolios;
      console.log(this.user)

      console.log(this.portfolios)


    })


  }


  displayedColumns = ['name', 'description', 'list'];





  // /** Gets the total cost of all transactions. */
  // getTotalVol() {
  //   return this.operaciones.map(p => p.volume).reduce((acc, value) => acc + value, 0);
  // }
  //
  // getTotalCost() {
  //   return this.operaciones.map(p => p.getImporte()).reduce((acc, value) => acc + value, 0);
  // }
}
