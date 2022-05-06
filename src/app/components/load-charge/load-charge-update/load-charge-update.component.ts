import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { centreCharge } from 'src/app/model/centreCharge';
import { UAP } from 'src/app/model/uap';
import { CrudGlobaleService } from 'src/app/services/crud-globale.service';

@Component({
  selector: 'app-load-charge-update',
  templateUrl: './load-charge-update.component.html',
  styleUrls: ['./load-charge-update.component.css']
})
export class LoadChargeUpdateComponent implements OnInit {

  url: string = "uap";

  id!: number;
  uaps!: UAP[];
  centreCharge: centreCharge = new centreCharge();

  isFailed = false;
  submitted = false;
  isSuccessful = false;
  errorMessage = '';

  constructor(
    private crudService: CrudGlobaleService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.crudService.getEntityById("cc", this.id).subscribe(
      data => {
        this.centreCharge = data;
      },
      error => console.log(error)
    )
    this.ListUAP();
  }


  ListUAP() {
    this.crudService.getListEntity(this.url).subscribe(
      data => {
        this.uaps = data
      }
    )
  }


  onSubmit() {
    this.crudService.updateEntity("cc", this.id, this.centreCharge).subscribe(
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