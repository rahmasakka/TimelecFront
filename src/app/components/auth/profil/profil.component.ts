import { Component, OnInit } from '@angular/core';
import { Roles } from 'src/app/model/roles';
import { User } from 'src/app/model/user';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  currentUser: any;
  users?: User[];
  user?: User;
  constructor(private token: TokenStorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
 //   this.retrieveTutorials();

  }

  /*
  retrieveTutorials(): void {
    this.userService.getUsersList()
      .subscribe(
        data => {
          this.users = [];
          console.log();
        },
        error => {
          console.log(error);
        });
  }
*/

  reloadPage(): void {
    window.location.reload();
  }
}