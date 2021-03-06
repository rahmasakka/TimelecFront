import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilComponent } from './components/auth/profil/profil.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AssemblyComponent } from './components/databases/assembly/assembly.component';
import { DatabasesComponent } from './components/databases/databases.component';
import { GabariesComponent } from './components/databases/gabaries/gabaries.component';
import { TesteursComponent } from './components/databases/testeurs/testeurs.component';
import { HomeComponent } from './components/home/home.component';
import { CreateLoadChargeComponent } from './components/load-charge/create-load-charge/create-load-charge.component';
import { LoadChargeByUapComponent } from './components/load-charge/load-charge-by-uap/load-charge-by-uap.component';
import { LoadChargeDetailsComponent } from './components/load-charge/load-charge-details/load-charge-details.component';
import { LoadChargeListComponent } from './components/load-charge/load-charge-list/load-charge-list.component';
import { LoadChargeUpdateComponent } from './components/load-charge/load-charge-update/load-charge-update.component';
import { CreateMachineComponent } from './components/machine/create-machine/create-machine.component';
import { MachineListComponent } from './components/machine/machine-list/machine-list.component';
import { UpdateMachineComponent } from './components/machine/update-machine/update-machine.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CreateUapComponent } from './components/uap/create-uap/create-uap.component';
import { UapListComponent } from './components/uap/uap-list/uap-list.component';
import { UapUpdateComponent } from './components/uap/uap-update/uap-update.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { UpdateUserComponent } from './components/users/update-user/update-user.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { mechanicalAssembly } from './model/mechanicalAssembly';
import { TestComponent } from './test/test.component';


const routes: Routes = [
  { path: 'mechanical', component: AssemblyComponent},

  { path: 'dashboard', component: DashboardComponent},
  { path: 'databases/testeurs', component: TesteursComponent },
  { path: 'databases/gabaries', component: GabariesComponent },
  { path: 'databases/:keyword', component: DatabasesComponent },
  { path: 'dashboard/:keyword', component: DashboardComponent },

  { path: 'test', component: TestComponent },

  { path: 'machine-list', component: MachineListComponent },
  { path: 'create-machine', component: CreateMachineComponent },
  { path: 'update-machine/:id', component: UpdateMachineComponent },


  { path: 'load-charge-list', component: LoadChargeListComponent },
  { path: 'load-charge-update/:id', component: LoadChargeUpdateComponent },
  { path: 'create-load-charge', component: CreateLoadChargeComponent },
  { path: 'load-charge-details/:id', component: LoadChargeDetailsComponent },

  { path: 'uap-update/:id', component: UapUpdateComponent },
  { path: 'load-charge-by-uap/:id', component: LoadChargeByUapComponent },
  { path: 'uap-list', component: UapListComponent },
  { path: 'create-uap', component: CreateUapComponent },

  { path: 'create-user', component: CreateUserComponent },
  { path: 'search/:keyword', component: UsersListComponent },
  { path: 'update-user/:id', component: UpdateUserComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'list-users', component: UsersListComponent },
  { path: 'signin', component: SigninComponent },
 // { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'notFound', component: NotFoundComponent },
  { path: '**', redirectTo: 'notFound', pathMatch: 'full' },
  //{ path: '**', redirectTo: 'signin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }