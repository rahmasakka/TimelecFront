import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  closeResult:string =''

  constructor(private userService: UserService,
              private token: TokenStorageService,
              private router: Router,
              private modalService: NgbModal) { }

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
        window.location.reload();
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

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      window.location.reload();

    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}