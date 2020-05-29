import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ImportXMLService } from './import-xml.service';
import { UsuarioService } from './usuario.service';
import { AuthenticationService } from './authentication.service';
import { MorningstarService } from './morningstar.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ImportXMLService,
    UsuarioService,
    AuthenticationService,
    MorningstarService
  ]
})
export class ServiceModule { }
