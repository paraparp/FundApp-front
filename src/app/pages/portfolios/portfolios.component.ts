import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

import Swal from 'sweetalert2';

import { User } from '@model/user.model';
import { Portfolio } from '@model/portfolio.model';

import { PortfolioService } from '@service/portfolio.service';
import { AuthenticationService } from '@service/authentication.service';

import { DialogPortfolioComponent } from '@component/dialogs/dialog-portfolio/dialog-portfolio.component';



@Component({
  selector: 'app-user',
  templateUrl: './portfolios.component.html',
  styleUrls: ['./portfolios.component.css']
})
export class PortfoliosComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,
    private portfolioService: PortfolioService,
    public dialog: MatDialog,
    private http: HttpClient
  ) { }


  user: User;
  portfolios: Portfolio[];
  portfolio: Portfolio;


  ngOnInit() {
    this.user = this.auth.usuario;
    this.loadPortfolios();
  }

  loadPortfolios() {
    this.portfolioService.getPortfolioByUser(this.auth.usuario.id).subscribe((resp: any) => {
      this.portfolios = resp;
    })
  }


  openDialog(portfolioTab: Portfolio): void {
    const dialogRef = this.dialog.open(DialogPortfolioComponent, {
      data: { portfolio: portfolioTab }
    });
    //NEW
    if (portfolioTab == null) {
      dialogRef.afterClosed().subscribe((newPortfolio: Portfolio) => {
        if (newPortfolio != null) {
          newPortfolio.idUser = this.user.id
          this.portfolioService.save(newPortfolio).subscribe(() => this.loadPortfolios());
        }
      });
    }
    //EDIT
    else {
      dialogRef.afterClosed().subscribe((editedPortfolio: Portfolio) => {
        if (editedPortfolio != null) {
          this.portfolioService.edit(editedPortfolio).subscribe(() => this.loadPortfolios());
        }
      });
    }
  }
  xrayUrl(idPortfolio: string) {

    this.portfolioService.getPortfolioXrayMorningStar(idPortfolio).subscribe(url => window.open(url, '_blank'))
  }

  delete(portfolio: Portfolio) {

    Swal.fire({
      title: 'Sure?',
      text: "You are traying to delete a Portfolio",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'aquamarine',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((deleted) => {

      if (deleted.value) {
        this.portfolioService.delete(portfolio).subscribe(() => this.loadPortfolios());
      }
    })
  }

}
