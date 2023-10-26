import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Package } from '../models/md.model';

const httpOptionsLogin = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }) 
};

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  private readonly HS_API_URL='https://localhost:3001';
  private headers = new HttpHeaders;

  constructor(private http:HttpClient,private router: Router) { }


  public getAllPackages(): Observable<Package[]> {

  return this.http.get<Package[]>(`${this.HS_API_URL}/api/v1/packages`,{headers:this.headers});
    }

public getDetallePackage(id: any): Observable<Package>{
  return this.http.get<Package>(`${this.HS_API_URL}/api/v1/packages/${id}`,{headers:this.headers});

}

public deletePackageById(id:any) {
  return this.http.delete(`${this.HS_API_URL}/api/v1/packages/${id}`,{headers:this.headers});
}


public createPackage(res: Package): Observable<any>{
  return this.http.post<Package>(`${this.HS_API_URL}/api/v1/packages/`,res);

}


}
