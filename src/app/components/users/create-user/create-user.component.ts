import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  submitted = false;
  user: User = new User();
  constructor(private userService : UserService, 
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.user)
    this.saveUser()
  }

  saveUser(){
    this.userService.createUser(this.user).subscribe(
      data => {
        console.log(data);
        this.goToUserList();
      },
      error => console.log(error)
    );
  }

  goToUserList(){
    this.router.navigate(['/list-users']);
  }
}