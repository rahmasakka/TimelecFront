import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  user1: User = new User();
  currentUser: any;
  
  submitted = false;
  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private token: TokenStorageService) { }
              
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.userService.getUserById(this.id).subscribe(
      data => {
        this.user1 = data;
      },
      error => console.log(error));
      this.currentUser = this.token.getUser();
  }

  onSubmit(){
    this.userService.updateUser(this.id, this.user).subscribe(
      data => {
        this.goToUserList();
        this.submitted = true;
      },
      error => console.log(error)
    );

  }

  goToUserList(){
    this.router.navigate(['/list-users']);
  }

}
