import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { centreCharge } from 'src/app/model/centreCharge';
import { UAP } from 'src/app/model/uap';
import { CentreChargeService } from 'src/app/services/centre-charge.service';
import { UapService } from 'src/app/services/uap.service';

@Component({
  selector: 'app-load-charge-update',
  templateUrl: './load-charge-update.component.html',
  styleUrls: ['./load-charge-update.component.css']
})
export class LoadChargeUpdateComponent implements OnInit {
  id!: number;
  uaps!: UAP[];
  centreCharge: centreCharge = new centreCharge();
  
  isFailed = false;
  submitted = false;
  isSuccessful = false;
  errorMessage = '';

  constructor(private uapService: UapService,
    private router: Router,
    private route: ActivatedRoute,
    private centreChargeService: CentreChargeService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.centreChargeService.getLoadChargeById(this.id).subscribe(
      data => {
        this.centreCharge = data;
      },
      error => console.log(error)
    )
    this.ListUAP();
  } 
  
  
  ListUAP() {
    this.uapService.getUAPList().subscribe(
      data => {
        this.uaps = data
      }
    )
  }


  onSubmit() {
    this.centreChargeService.updateLoadCharge(this.id, this.centreCharge).subscribe(
      data => {
        this.goToLoadChargeList()
        console.log(data)
        this.isSuccessful = true
        this.submitted = true
      },
      err => {
        this.errorMessage = err.error.errorMessage
        this.isFailed = true
      }
    )
  }

  goToLoadChargeList() {
    this.router.navigate(['/load-charge-list'])
  }
}