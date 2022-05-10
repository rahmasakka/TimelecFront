import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { centreCharge } from 'src/app/model/centreCharge';
import { machine } from 'src/app/model/machine';
import { CrudGlobaleService } from 'src/app/services/crud-globale.service';

@Component({
  selector: 'app-update-machine',
  templateUrl: './update-machine.component.html',
  styleUrls: ['./update-machine.component.scss']
})
export class UpdateMachineComponent implements OnInit {
  url: string = "cc";

  id!: number;
  machine: machine = new machine();
  listCentreCharge!: centreCharge[];

  isFailed = false;
  submitted = false;
  isSuccessful = false;
  errorMessage = '';

  constructor(
    private crudService : CrudGlobaleService, 
    private router: Router,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.crudService.getEntityById("machine", this.id).subscribe(
      data => {
        this.machine = data
      },
      error => console.log(error)
    )
    this.listLoadCharge();
  }


  listLoadCharge() {
    this.crudService.getListEntity(this.url).subscribe(
      data => {
        this.listCentreCharge = data
      }
    )
  }


  onSubmit() {
    this.crudService.updateEntity("machine", this.id, this.machine).subscribe(
      () => {
        this.isSuccessful = true
        this.submitted = true
        console.log("*********", this.machine)
        this.router.navigate(['/machine-list'])

      },
      err => {
        this.errorMessage = err.error.errorMessage
        this.isFailed = true
      }
    )
  }
  goToMachineList() {
    this.router.navigate(['/machine-list'])
  }
}