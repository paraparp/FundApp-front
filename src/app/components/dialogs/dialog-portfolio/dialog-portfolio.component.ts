import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Portfolio } from '@model/portfolio.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-dialog-portfolio',
  templateUrl: './dialog-portfolio.component.html',
  styleUrls: ['./dialog-portfolio.component.css']
})
export class DialogPortfolioComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogPortfolioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  pForm: FormGroup;
  portfolio: Portfolio;


  ngOnInit() {

    this.pForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      description: new FormControl('', Validators.maxLength(256))
    });

    if (this.data.portfolio != null) {
      this.portfolio = this.data.portfolio
      this.pForm = this.formBuilder.group(this.portfolio)
    } else {
      this.portfolio = new Portfolio();
    }

  }

  closeDialog(): void {
    this.dialogRef.close(null);
  }

  save(pform): void {
    this.portfolio.name = pform.name;
    this.portfolio.description = pform.description;
    this.dialogRef.close(this.portfolio);
  }

}
