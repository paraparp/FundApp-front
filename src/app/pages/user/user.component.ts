
import { Component, OnInit } from '@angular/core';


import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Portfolio } from 'src/app/models/portfolio.model';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { PortfolioService } from 'src/app/services/portfolio.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,
    private portfolioService: PortfolioService,
    public dialog: MatDialog
  ) { }


  user: User;
  portfolios: Portfolio[];
  portfolio: Portfolio;

  displayedColumns = ['name', 'description', 'cost', 'list', 'edit'];

  ngOnInit() {
    this.user = this.auth.usuario;
    this.loadPortfolios();
  }

  loadPortfolios() {
    this.portfolioService.getPortfolioByUser(this.auth.usuario.id).subscribe((resp: any) => {
      this.portfolios = resp;
    })
  }


  openDialog(create: boolean, portfolioTab: Portfolio): void {

    console.log('entrada open ' + portfolioTab)

    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: { portfolio: portfolioTab }
    });
    //NEW
    if (create) {
      console.log("CREATE")
      dialogRef.afterClosed().subscribe((newPortfolio: Portfolio) => {

        if (newPortfolio != null) {
          newPortfolio.idUser = this.user.id
          this.portfolioService.save(newPortfolio).subscribe(portfolio => {
            this.loadPortfolios();
            console.log(newPortfolio)
          });
        }
      });
    }
    //EDIT
    else {
      console.log("EDIT")
      dialogRef.afterClosed().subscribe((editedPortfolio: Portfolio) => {
        console.log(editedPortfolio);
        this.portfolioService.edit(editedPortfolio).subscribe(editedPortfolio => {
          console.log(editedPortfolio);
          this.loadPortfolios();

        });
      });
    }

    console.log("Create : " + create)
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
