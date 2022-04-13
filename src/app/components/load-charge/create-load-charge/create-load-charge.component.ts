import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LaodCharge } from 'src/app/model/LaodCharge';
import { UAP } from 'src/app/model/uap';
import { CentreChargeService } from 'src/app/services/centre-charge.service';
import { UapService } from 'src/app/services/uap.service';

@Component({
  selector: 'app-create-load-charge',
  templateUrl: './create-load-charge.component.html',
  styleUrls: ['./create-load-charge.component.css']
})
export class CreateLoadChargeComponent implements OnInit {

  form : LaodCharge = new LaodCharge
  isSuccessful = false;
  isCreatedFailed = false;
  errorMessage = '';
  submitted = false;
  uaps!:UAP[];

  constructor(private loadChargeService: CentreChargeService, 
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
        this.isCreatedFailed = false;
        this.isSuccessful = true;
      },
      error=>{
        this.errorMessage = error.error.message
        this.isCreatedFailed = true
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
      //  console.log(data)
      }
    )
  }
}