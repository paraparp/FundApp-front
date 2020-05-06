import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private auth: AuthenticationService) { }


  loginform: FormGroup;
  user: User;
  loginInvalido: boolean = false;

  ngOnInit() {

    if (this.auth.isUserLoggedIn()) {
      this.router.navigate(["/portfolios"]);
    }

    this.loginform = new FormGroup({
      username: new FormControl('dobarqueiro', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('12345', [Validators.required, Validators.minLength(4)])
    });

  }

  login(user: User): void {


    this.router.navigate(["/portfolios"]);
    this.auth.login(user).subscribe(resp => {

      this.auth.guardarUser(resp.access_token);
      this.auth.guardarToken(resp.access_token);
      user = this.auth.usuario;

      this.router.navigate(["/portfolios"]);
    }, err => {
      if (err.status == 400)
        this.loginInvalido = true;

    })
  }

}
