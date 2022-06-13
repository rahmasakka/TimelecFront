import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  roles!: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  username!: string;
  constructor(private tokenStorageService: TokenStorageService, private router: Router, private token: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }
  }
  
  isAdmin() { return this.token.getUser().roles[0] == "ROLE_ADMIN" }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/signin']);
    this.ngOnDestroy()
  }
  
  ngOnDestroy(): void {
    sessionStorage.clear();
  }
}