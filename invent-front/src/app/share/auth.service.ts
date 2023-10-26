import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Usuario } from '../models/md.model';


const httpOptionsLogin = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }) 
};


@Injectable({
  providedIn: 'root'
})





export class AuthService {
  private readonly HS_API_URL='https://localhost:3001';
  private headers = new HttpHeaders;
  private usuario?: Usuario; 
  private token!: string | null;
  // public backetList: Electrodomestico[] = [];
  
  constructor(private http:HttpClient,private router: Router) {}


public restoreToken (){
    
  var promise = localStorage.getItem('token')
  return promise;
}



public login(email: string, pass: string): Observable<any> {
 
  let cli:Usuario = {email: email, pass: pass};
 
   return this.http.post<any>(`${this.HS_API_URL}/api/v1/login`, cli, httpOptionsLogin)
  .pipe(
      catchError((err) => {
        console.log("Error en el login");
        console.error(err);
        return throwError(err);
      }
      )
    );
}

logout(){
  this.usuario = undefined;
  localStorage.clear();
  window.location.reload();
}

public getUsuario(token:string): Observable<Usuario>{
    this.headers = new HttpHeaders ({'Authorization': token});
    return this.http.get<Usuario>(`${this.HS_API_URL}/api/v1/usuarioRegistrado`, {headers:this.headers});   

}

public getAllUsers(token:string): Observable<Usuario[]>{
  this.headers = new HttpHeaders ({'Authorization': token});
  return this.http.get<Usuario[]>(`${this.HS_API_URL}/api/v1/login`, {headers:this.headers});   

}


}


