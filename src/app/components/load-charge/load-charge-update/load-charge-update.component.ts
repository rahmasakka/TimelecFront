import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LaodCharge } from 'src/app/model/LaodCharge';
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
  loadCharge: LaodCharge = new LaodCharge();
  isUpdateFailed = false;
  submitted = false;
  isSuccessful = false;
  errorMessage = '';

  constructor(private uapService: UapService,
    private router: Router,
    private route: ActivatedRoute,
    private loadChargeService: CentreChargeService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.loadChargeService.getLoadChargeById(this.id).subscribe(
      data => {
        this.loadCharge = data;
      },
      error => console.log(error)
    )
    this.getListUAP();
  }

  onSubmit() {
    this.loadChargeService.updateLoadCharge(this.id, this.loadCharge).subscribe(
      data => {
        this.goToLoadChargeList()
        console.log(data)
        this.isSuccessful = true
        this.submitted = true
      },
      error => {
        this.errorMessage = error.errorMessage
        this.isUpdateFailed = true
      }
    )
  }

  goToLoadChargeList() {
    this.router.navigate(['/load-charge-list'])
  }

  getListUAP() {
    this.uapService.getUAPList().subscribe(
      data => {
        this.uaps = data
      }
    )
  }
}