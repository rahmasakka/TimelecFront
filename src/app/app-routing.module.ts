import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilComponent } from './components/auth/profil/profil.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { LoadChargeByUapComponent } from './components/load-charge/load-charge-by-uap/load-charge-by-uap.component';
import { LoadChargeDetailsComponent } from './components/load-charge/load-charge-details/load-charge-details.component';
import { LoadChargeListComponent } from './components/load-charge/load-charge-list/load-charge-list.component';
import { LoadChargeUpdateComponent } from './components/load-charge/load-charge-update/load-charge-update.component';
import { MachineListComponent } from './components/machine/machine-list/machine-list.component';
import { CreateUapComponent } from './components/uap/create-uap/create-uap.component';
import { UapListComponent } from './components/uap/uap-list/uap-list.component';
import { UapUpdateComponent } from './components/uap/uap-update/uap-update.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { UpdateUserComponent } from './components/users/update-user/update-user.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';

const routes: Routes = [
  { path: 'machine-list', component: MachineListComponent},


  { path: 'load-charge-list', component: LoadChargeListComponent},
  { path: 'load-charge-update/:id', component: LoadChargeUpdateComponent},
  { path: 'load-charge-details/:id', component: LoadChargeDetailsComponent},

  { path: 'uap-update/:id', component: UapUpdateComponent},
  { path: 'load-charge-by-uap/:id', component: LoadChargeByUapComponent},
  { path: 'uap-list', component: UapListComponent},
  { path: 'create-uap', component: CreateUapComponent},


  { path: 'create-user', component: CreateUserComponent},
  { path: 'search/:keyword', component: UsersListComponent},
  { path: 'update-user/:id', component: UpdateUserComponent},
  { path: 'profil', component: ProfilComponent},
  { path: 'list-users', component: UsersListComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'signup', component:SignupComponent },
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
