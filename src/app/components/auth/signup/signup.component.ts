import { Component, OnInit } from '@angular/core';
import { Roles } from 'src/app/model/roles';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  submitted = false;

  roles!: Roles[];

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
  //  this.getRoles()
  }
 

  onSubmit(): void {
   this.submitted= true;

   console.log(this.form)
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  getRoles() {
    this.userService.getListRole().subscribe(
      data => {
        this.roles = data;
        console.log(this.roles[2].name);
      }
    )
  }
}