import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Portfolio } from 'src/app/models/portfolio.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {


  portfolio: Portfolio;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.portfolio = data.porfolio
  }

  pForm: FormGroup;

  ngOnInit() {

    this.pForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      description: new FormControl('')
    });


  }

  close(portfolio: Portfolio) {

  }
  onNoClick(): void {
    this.dialogRef.close(null);
  }

  savePortfolio(portfolio: Portfolio): void {
    this.dialogRef.close(portfolio);
  }

}
