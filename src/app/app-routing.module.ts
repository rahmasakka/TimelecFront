import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilComponent } from './components/auth/profil/profil.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { UpdateUserComponent } from './components/users/update-user/update-user.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';

const routes: Routes = [
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
