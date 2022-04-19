import { Component, OnInit } from '@angular/core';
import { centreCharge } from 'src/app/model/centreCharge';
import { machine } from 'src/app/model/machine';
import { CentreChargeService } from 'src/app/services/centre-charge.service';
import { MachineService } from 'src/app/services/machine.service';

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

  constructor(private machineService: MachineService,
    private centreChargeService: CentreChargeService) { }

  ngOnInit(): void {
    this.centreChargeService.getLoadCharge().subscribe(
      data => {
        this.CCs = data
      }
    )
  }

  addMachine() {
    this.submitted = true
    this.centreChargeService.getLoadChargeById(this.newIdCC).subscribe(
      data => {
        this.newCC = data
      }
    )

    this.newMachine.centreCharge = this.newCC;
    this.machineService.createMachine(this.newMachine).subscribe(
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