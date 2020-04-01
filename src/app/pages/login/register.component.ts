import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    public usuarioService: UsuarioService,
    public router: Router,
    private auth: AuthenticationService,
    private formBuilder: FormBuilder,
  ) { }

  regform: FormGroup;
  username: string;
  password: string;

  ngOnInit() {


    this.regform = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required)
    }, { validators: this.sonIguales('password', 'password2') });


    this.regform.setValue({
      username: 'dobarqueiro2',
      firstname: 'Rodrigo',
      lastname: 'Parapar',
      email: 'test@test.com',
      password: '123456',
      password2: '123456',

    });
  }



  registrarUsuario(usuario: Usuario) {

    if (this.regform.invalid) {
      return;
    }

    usuario = new Usuario(
      this.regform.value.username,
      this.regform.value.firstname,
      this.regform.value.lastname,
      this.regform.value.email,
      this.regform.value.password
    );

    console.log(usuario);
    this.usuarioService.crearUsuario(usuario)
      .subscribe(
        resp => {
          this.router.navigate(['user']),
            console.log(this.auth.authenticate(this.username, this.password))

        }
      )

    // if (this.auth.authenticate(this.username, this.password)) {
    //
    //   this.router.navigate(["user"]);
    //
    // } else {
    //
    //   alert("Invalid credentials");
    // }

  }


  sonIguales(campo1: string, campo2: string) {

    return (group: FormGroup) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }

      return {
        sonIguales: true
      };
    };
  }
}
