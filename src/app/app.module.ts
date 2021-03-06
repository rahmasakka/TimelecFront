import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProfilComponent } from './components/auth/profil/profil.component';
import { authInterceptorProviders } from './_helpers/auth-interceptor.interceptor';
import { UpdateUserComponent } from './components/users/update-user/update-user.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MachineListComponent } from './components/machine/machine-list/machine-list.component';
import { LoadChargeUpdateComponent } from './components/load-charge/load-charge-update/load-charge-update.component';
import { LoadChargeListComponent } from './components/load-charge/load-charge-list/load-charge-list.component';
import { CreateUapComponent } from './components/uap/create-uap/create-uap.component';
import { LoadChargeByUapComponent } from './components/load-charge/load-charge-by-uap/load-charge-by-uap.component';
import { UapListComponent } from './components/uap/uap-list/uap-list.component';
import { UapUpdateComponent } from './components/uap/uap-update/uap-update.component';
import { CreateLoadChargeComponent } from './components/load-charge/create-load-charge/create-load-charge.component';
import { CreateMachineComponent } from './components/machine/create-machine/create-machine.component';
import { UpdateMachineComponent } from './components/machine/update-machine/update-machine.component';
import { LoadChargeDetailsComponent } from './components/load-charge/load-charge-details/load-charge-details.component';
import { UapComponent } from './components/uap/uap/uap.component';
import { CentreChargeComponent } from './components/load-charge/centre-charge/centre-charge.component';
import { MachineComponent } from './components/machine/machine/machine.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DatabasesComponent } from './components/databases/databases.component';
import { TestComponent } from './test/test.component';
import { NgxPrintModule } from 'ngx-print';
import { DatePipe } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TesteursComponent } from './components/databases/testeurs/testeurs.component';
import { GabariesComponent } from './components/databases/gabaries/gabaries.component';
import { AssemblyComponent } from './components/databases/assembly/assembly.component';

@NgModule({    
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    HomeComponent,
    SigninComponent,
    UsersListComponent,
    ProfilComponent,
    UpdateUserComponent,
    CreateUserComponent,
    MachineListComponent,
    LoadChargeUpdateComponent, 
    LoadChargeListComponent,
    UapUpdateComponent,
    CreateUapComponent,
    LoadChargeByUapComponent,
    UapListComponent,
    CreateLoadChargeComponent,
    CreateMachineComponent,
    UpdateMachineComponent,
    LoadChargeDetailsComponent,
    UapComponent,
    CentreChargeComponent,
    MachineComponent,
    DashboardComponent,
    DatabasesComponent,
    TestComponent,
    NotFoundComponent,
    TesteursComponent,
    GabariesComponent,
    AssemblyComponent,
   ],
   
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule, 
    NgxPrintModule,
    ],
  providers: [authInterceptorProviders,     DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
