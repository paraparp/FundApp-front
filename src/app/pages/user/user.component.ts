
import { Component, OnInit } from '@angular/core';



import { UsuarioService } from 'src/app/services/usuario.service';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Portfolio } from 'src/app/models/portfolio.model';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { PortfolioService } from 'src/app/services/portfolio.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,
    private userService: UsuarioService,
    private portfolioService: PortfolioService,
    public dialog: MatDialog
  ) { }


  user: User;
  portfolios: Portfolio[];
  portfolio: Portfolio;

  displayedColumns = ['name', 'description', 'cost', 'list', 'edit'];

  ngOnInit() {
    this.loadPortfolios();
  }

  loadPortfolios() {
    this.userService.findUsuariosById(this.auth.usuario.id).subscribe((resp: any) => {
      this.user = resp
      this.portfolios = resp.portfolios;
    })
  }


  openDialog(create: boolean, portfolio: Portfolio): void {
    console.log(portfolio)
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '300px',
      data: { portfolio: portfolio }
    });

    if (create) {
      dialogRef.afterClosed().subscribe((result: Portfolio) => {
        this.portfolio = result

        if (result != null) {
          this.portfolio.idUser = this.user.id
          this.portfolioService.save(this.portfolio).subscribe(portfolio => {
            this.loadPortfolios();
          });
        }
      });
    } else {
      dialogRef.afterClosed().subscribe((result: Portfolio) => {
        this.portfolio = result

        this.portfolioService.edit(this.portfolio).subscribe(portfolio => {
          this.portfolio.idUser = this.user.id
          this.loadPortfolios();
        });
      });
    }
    console.log(create)
  }

  delete(portfolio: Portfolio) {

    Swal.fire({
      title: 'Sure?',
      text: "Tou are traying to delete a Portfolio",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((deleted) => {
      if (deleted) {
        this.portfolioService.delete(portfolio).subscribe((resp: any) => {
          this.loadPortfolios();
        });
      }
    })



  }


  // /** Gets the total cost of all transactions. */
  // getTotalVol() {
  //   return this.operaciones.map(p => p.volume).reduce((acc, value) => acc + value, 0);
  // }
  //
  // getTotalCost() {
  //   return this.operaciones.map(p => p.getImporte()).reduce((acc, value) => acc + value, 0);
  // }
}
