import { Component, OnInit } from '@angular/core';
import { centreCharge } from 'src/app/model/centreCharge';
import { machine } from 'src/app/model/machine';
import { CentreChargeService } from 'src/app/services/centre-charge.service';
import { CrudGlobaleService } from 'src/app/services/crud-globale.service';
import { MachineService } from 'src/app/services/machine.service';

@Component({
  selector: 'app-create-machine',
  templateUrl: './create-machine.component.html',
  styleUrls: ['./create-machine.component.css']
})
export class CreateMachineComponent implements OnInit {
  url: string = "cc";
  isSuccessful = false;
  isFailed = false;
  errorMessage = '';
  submitted = false;
  newMachine = new machine()
  newIdCC!: number;
  newCC!: centreCharge;
  CCs!: centreCharge[]

  constructor(private machineService: MachineService,
    private crudService : CrudGlobaleService, 
    private centreChargeService: CentreChargeService) { }

  ngOnInit(): void {
    this.crudService.getListEntity(this.url).subscribe(
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
    //window.location.reload();
  }
}