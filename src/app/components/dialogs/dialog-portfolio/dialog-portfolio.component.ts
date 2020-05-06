import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Portfolio } from 'src/app/models/portfolio.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-dialog-portfolio',
  templateUrl: './dialog-portfolio.component.html',
  styleUrls: ['./dialog-portfolio.component.css']
})
export class DialogPortfolioComponent implements OnInit {

  portfolio: Portfolio;

  constructor(
    public dialogRef: MatDialogRef<DialogPortfolioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  pForm: FormGroup;

  ngOnInit() {

    this.pForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      description: new FormControl('')
    });

    if (this.data.portfolio != null) {
      this.portfolio = this.data.portfolio;
    } else {
      this.portfolio = new Portfolio();
    }
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  savePortfolio(): void {
    this.dialogRef.close(this.portfolio);
  }

}
