import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Md5} from 'ts-md5';
import { Usuario } from '../models/md.model';
import { AuthService } from '../share/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public token!: string;
  public usuario!: Usuario;
  public errorMessage!: string;
  
  constructor(private service:AuthService,private router: Router,private fb: FormBuilder,) { }

  ngOnInit() {
    
    this.loginForm = this.fb.group({
      'email': ['', Validators.compose([
        Validators.required
      ])],
      'pass': ['', Validators.compose([
        Validators.required
      ])]
    });



  }

get f() { return this.loginForm.controls; }


  login(){ 

this.service.login(this.f['email'].value,Md5.hashStr(this.f['pass'].value)).subscribe(token => {
this.token = token;
//localStorage.setItem('token',this.token);
localStorage.setItem('token',this.token.toString())
this.service.getUsuario(token).subscribe(
  (usuario:Usuario) => {
    this.usuario = usuario;
    localStorage.setItem('usuario',JSON.stringify(this.usuario))
    console.log(this.usuario)
    this.router.navigate(['/packages']) .then(() => {
      window.location.reload();
    });;
    
  }
)
},(error) =>{
  this.errorMessage = "Email o contrasena incorectos"
  throw error;
}
)
  }

}
