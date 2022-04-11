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
import { PopupComponent } from './popup/popup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MachineListComponent } from './components/machine/machine-list/machine-list.component';
import { LoadChargeUpdateComponent } from './components/load-charge/load-charge-update/load-charge-update.component';
import { LoadChargeListComponent } from './components/load-charge/load-charge-list/load-charge-list.component';
import { CreateUapComponent } from './components/uap/create-uap/create-uap.component';
import { LoadChargeByUapComponent } from './components/load-charge/load-charge-by-uap/load-charge-by-uap.component';
import { UapListComponent } from './components/uap/uap-list/uap-list.component';
import { UapUpdateComponent } from './components/uap/uap-update/uap-update.component';

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
    PopupComponent,
    MachineListComponent,
    LoadChargeUpdateComponent, 
    LoadChargeListComponent,
    UapUpdateComponent,
    CreateUapComponent,
    LoadChargeByUapComponent,
    UapListComponent,
   ],
   
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule, 
    ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
