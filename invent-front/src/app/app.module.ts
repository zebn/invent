import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule} from '@angular/common/http';
import { PackagesComponent } from './packages/packages.component';
import { CodesComponent } from './codes/codes.component';
import { UsersComponent } from './users/users.component';
import { TypesComponent } from './types/types.component';
import { AddPackageComponent } from './packages/add-package/add-package.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PackagesComponent,
    CodesComponent,
    UsersComponent,
    TypesComponent,
    AddPackageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
