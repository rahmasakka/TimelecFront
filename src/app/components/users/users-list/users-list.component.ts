import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from 'src/app/model/roles';
import { User } from 'src/app/model/user';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {


  users!: User[];
  constructor(private userService: UserService,
    private token: TokenStorageService,
    private router: Router) { }

  a: Roles = this.token.getUser().roles[0];

  ngOnInit(): void {
    console.log(this.a);

    this.getUsers();
  }


  isAdmin() {
    return this.token.getUser().roles[0] == "ROLE_ADMIN"
  }

  isUser() {
    return this.token.getUser().roles[0] == "ROLE_USER"
  }

  getUsers() {
    console.log("hellooo")
    this.userService.getUsersList().subscribe(
      data => {
        this.users = data;
        console.log("hellooo")

      }
    )
  }

  updateUser(id: number) {
    this.router.navigate(['update-user', id]);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(
      data => {
        console.log(data);
        this.getUsers();
      }
    )
  }
}