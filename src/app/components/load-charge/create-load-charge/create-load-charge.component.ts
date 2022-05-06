import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { centreCharge } from 'src/app/model/centreCharge';
import { UAP } from 'src/app/model/uap';
import { CrudGlobaleService } from 'src/app/services/crud-globale.service';

@Component({
  selector: 'app-create-load-charge',
  templateUrl: './create-load-charge.component.html',
  styleUrls: ['./create-load-charge.component.css']
})
export class CreateLoadChargeComponent implements OnInit {
  url:string = "uap";

  isSuccessful = false;
  isFailed = false;
  errorMessage = '';
  submitted = false;
  newCentreCharge = new centreCharge();
  uaps!: UAP[];
  newIdUAP!: number;
  newUAP!: UAP;

  constructor(
    private crudService : CrudGlobaleService, 
    private router: Router) { }

  ngOnInit() {
    this.crudService.getListEntity(this.url).subscribe(
      data => {
        this.uaps = data
      }
    )
  }

  addCentreCharge() {
    this.submitted = true
    this.crudService.getEntityById('uap', this.newIdUAP).subscribe(
      data => {
        this.newUAP = data
      }
    )
    //console.log("++++",this.newUAP.uapName)
    this.newCentreCharge.uap = this.newUAP;
    //console.log("****",this.newCentreCharge.uap.uapName)
    this.crudService.createNewEntity("cc",this.newCentreCharge).subscribe(
      data => {
        console.log(data)
        this.isSuccessful = true;
        this.isFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isFailed = true;
      }
    );
    this.router.navigate(['/load-charge-list'])
  }
}