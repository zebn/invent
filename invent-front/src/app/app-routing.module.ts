import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PackagesComponent } from './packages/packages.component';
import { TypesComponent } from './types/types.component';
import { CodesComponent } from './codes/codes.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'packages', component: PackagesComponent },
   {path: 'types', component: TypesComponent},
   {path: 'codes', component: CodesComponent },
   {path: 'users', component: UsersComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
