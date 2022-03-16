import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from 'src/app/model/roles';
import { User } from 'src/app/model/user';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  id!: number;
  user: User = new User();
  currentUser: any;
  roles!: Roles[];
  isUpdateFailed = false;
  submitted = false;
  isSuccessful = false;
  errorMessage = '';


  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private token: TokenStorageService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.userService.getUserById(this.id).subscribe(
      data => {
        this.user = data;
      },
      error => console.log(error));
    this.currentUser = this.token.getUser();
    this.getRoles();
  }

  onSubmit() {
    this.userService.updateUser(this.id, this.user).subscribe(
      data => {
        this.goToUserList();
        console.log(data)
        this.isSuccessful = true;
        this.submitted = true;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isUpdateFailed = true;
      }
    );
  }


  goToUserList() {
    this.router.navigate(['/list-users']);
  }

  getRoles() {
    this.userService.getListRole().subscribe(
      data => {
        this.roles = data;
      }
    )
  }
}