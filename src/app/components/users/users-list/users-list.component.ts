import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  username: string = '';

  page: number = 1;
  size: number = 1;
  numElement: number = 4;

  constructor(private userService: UserService,
              private token: TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {
    this.getUsersPagination();
  }

  isAdmin() { return this.token.getUser().roles[0] == "ROLE_ADMIN" }
  isUser() { return this.token.getUser().roles[0] == "ROLE_USER" }

  getUsers() {
    this.userService.getUsersList().subscribe(
      data => {
        this.users = data;
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

  Search() {
    if (this.username != "") {
      this.users = this.users.filter(res => {
        return res.username.toLocaleLowerCase().match(this.username.toLocaleLowerCase())
      })
    } else if (this.username == "") {
      this.ngOnInit();
    }
  }

  getUsersPagination() {
    this.userService.getUsersListPaginate(this.page , this.size).subscribe(
      data => {
        this.users = data;
        console.log(data)
      }
    )
  } 
}