import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Code, Package, Type } from '../models/md.model';
const httpOptionsLogin = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }) 
};

@Injectable({
  providedIn: 'root'
})
export class CodesService {

  
  private readonly HS_API_URL='https://localhost:3001';
  private headers = new HttpHeaders;

  constructor(private http:HttpClient,private router: Router) { }


  public getAllCodes(): Observable<Code[]> {

  return this.http.get<Code[]>(`${this.HS_API_URL}/api/v1/codes`,{headers:this.headers});
    }

  }