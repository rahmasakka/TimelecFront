import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  //properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 3;
  theTotalElements: number=0;

  users!: User[];
  searchMode:boolean = false;

  constructor(private userService: UserService,
              private token: TokenStorageService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUsers();
  }

  isAdmin() {
    return this.token.getUser().roles[0] == "ROLE_ADMIN"
  }

  isUser() {
    return this.token.getUser().roles[0] == "ROLE_USER"
  }

  getUsers() {
    //this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchUsers();
    } else {
      this.handleListUsers();
    }
  }

  handleSearchUsers() {
    const theKeyword: any = this.route.snapshot.paramMap.get('keyword');
    this.userService.searchUsers(theKeyword).subscribe(
      data => {
        this.users = data;
      }
    )
    this.userService.getUsersListPaginate(this.thePageNumber - 1,this.thePageSize).subscribe(this.processResult());
  }

  handleListUsers(){
    /*this.userService.getUsersList().subscribe(
      data => {
        this.users = data;
      }
    )*/
    this.userService.getUsersListPaginate(this.thePageNumber, this.thePageSize).subscribe(this.processResult());
  }

  processResult(){
    return (data: any) => {
      console.log(data)
      this.users = data;
    //  this.thePageNumber = data.page.number;
    //  this.thePageSize = data.page.size;
    //  this.theTotalElements = data.page.totalElements;
    };
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