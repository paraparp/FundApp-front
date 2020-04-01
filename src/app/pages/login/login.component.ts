import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private auth: AuthenticationService) { }


  loginform: FormGroup;

  ngOnInit() {

    this.loginform = new FormGroup({
      username: new FormControl('dobarqueiro', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('1234', [Validators.required, Validators.minLength(4)])
    });

  }



  login(user): void {
    if (this.auth.authenticate(user.username, user.password)) {
      this.router.navigate(["user"]);
    } else {
      alert("Invalid credentials");
    }


  }
}
