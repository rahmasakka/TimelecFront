import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UAP } from 'src/app/model/uap';
import { LoadChargeService } from 'src/app/services/load-charge.service';
import { UapService } from 'src/app/services/uap.service';

@Component({
  selector: 'app-create-load-charge',
  templateUrl: './create-load-charge.component.html',
  styleUrls: ['./create-load-charge.component.css']
})
export class CreateLoadChargeComponent implements OnInit {

  form : any = {}
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  submitted = false;
  uaps!:UAP[];

  constructor(private loadChargeService: LoadChargeService, 
              private router : Router, 
              private uapService : UapService) { }

  ngOnInit(): void {
    this.getListUAP()
    console.log(this.form)    
  }

  onSubmit(): void {
    this.loadChargeService.addNewLoadCharge(this.form).subscribe(
      data => {
        this.goToLoadChargeList()
        console.log(data)
        this.isSignUpFailed = false;
        this.isSuccessful = true;
      },
      error=>{
        this.errorMessage = error.error.message
        this.isSignUpFailed = true
      }
    )
  }

  goToLoadChargeList(){
    this.router.navigate(['/load-charge-list'])
  }

  getListUAP(){
    this.uapService.getUAPList().subscribe(
      data=>{
        this.uaps = data
        console.log(data)
      }
    )
  }
}