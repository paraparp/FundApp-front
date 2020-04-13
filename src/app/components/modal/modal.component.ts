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
    console.log("data -> " + this.data)

  }

  pForm: FormGroup;

  ngOnInit() {

    this.pForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      description: new FormControl('')
    });
    console.log("data -> " + this.data)
    console.log("preasig -> " + this.data.portfolio)
    if (this.data.portfolio != null) {
      this.portfolio = this.data.portfolio;
    } else {
      this.portfolio = new Portfolio();
    }
    console.log("asignacion " + this.portfolio);

  }
  onNoClick(): void {
    this.dialogRef.close(null);
  }

  savePortfolio(): void {
    this.dialogRef.close(this.portfolio);
  }

}
