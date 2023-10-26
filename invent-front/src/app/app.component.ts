import { Component } from '@angular/core';
import { Usuario } from './models/md.model';
import { AuthService } from './share/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'invent-front';
  usuario: Usuario =  {email: "", pass: ""};
  public token!: string | null;
  public isAuthenticated=false;

  constructor(private service:AuthService,private router:Router) {

    this.token=this.service.restoreToken();
    console.log(this.token);
    if (this.token!=null){
      this.isAuthenticated=true;
      this.service.getUsuario(this.token).subscribe(res => {
        this.usuario = res;
        console.log(this.usuario);
      })
    }
    else
    {
      this.router.navigate(['/login'])
    }
  

  }

  logout(){
    this.service.logout();
    this.router.navigate(['/login']) .then(() => {
      window.location.reload();
    });;
  }
  

}
