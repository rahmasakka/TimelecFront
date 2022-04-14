import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UapService } from 'src/app/services/uap.service';

@Component({
  selector: 'app-create-uap',
  templateUrl: './create-uap.component.html',
  styleUrls: ['./create-uap.component.css']
})
export class CreateUapComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isFailed = false;
  errorMessage = '';
  submitted = false;

  constructor(private uapservice: UapService, private router: Router) { }

  ngOnInit(): void {} 

  onSubmit(): void {
   this.submitted= true;

   console.log(this.form)
    this.uapservice.addNewUAP(this.form).subscribe(
      data => {
        this.goToUAPList()
        this.isSuccessful = true;
        this.isFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isFailed = true;
      }
    );
  }
  
  goToUAPList() {
    this.router.navigate(['/uap-list']);
  }
}