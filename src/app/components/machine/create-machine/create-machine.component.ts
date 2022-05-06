import { Component, OnInit } from '@angular/core';
import { centreCharge } from 'src/app/model/centreCharge';
import { machine } from 'src/app/model/machine';
import { CrudGlobaleService } from 'src/app/services/crud-globale.service';

@Component({
  selector: 'app-create-machine',
  templateUrl: './create-machine.component.html',
  styleUrls: ['./create-machine.component.css']
})
export class CreateMachineComponent implements OnInit {
  isSuccessful = false;
  isFailed = false;
  errorMessage = '';
  submitted = false;
  newMachine = new machine()
  newIdCC!: number;
  newCC!: centreCharge;
  CCs!: centreCharge[]

  constructor(private crudService : CrudGlobaleService) { }

  ngOnInit(): void {
    this.crudService.getListEntity("cc").subscribe(
      data => {
        this.CCs = data
      }
    )
  }

  addMachine() {
    this.submitted = true
    this.crudService.getEntityById("cc",this.newIdCC).subscribe(
      data => {
        this.newCC = data
      }
    )

    this.newMachine.centreCharge = this.newCC;
    this.newMachine.reference = false
    this.crudService.createNewEntity("machine",this.newMachine).subscribe(
      data => {
        console.log(data)
        this.isSuccessful = true;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isFailed = true;
      }
    );
    window.location.reload();
  }
}