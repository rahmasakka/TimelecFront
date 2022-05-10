import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from 'src/app/model/roles';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  submitted = false;

  roles!: Roles[];

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getRoles()
  }


  onSubmit(): void {
    this.submitted = true;
    console.log(this.form)
    this.authService.register(this.form).subscribe(
      data => {
        this.goToUserList()
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        console.log(data)

      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
    this.router.navigate(['/users-list']);
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