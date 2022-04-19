import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { centreCharge } from 'src/app/model/centreCharge';
import { machine } from 'src/app/model/machine';
import { CentreChargeService } from 'src/app/services/centre-charge.service';
import { MachineService } from 'src/app/services/machine.service';

@Component({
  selector: 'app-update-machine',
  templateUrl: './update-machine.component.html',
  styleUrls: ['./update-machine.component.css']
})
export class UpdateMachineComponent implements OnInit {

  id!: number;
  machine: machine = new machine();
  listCentreCharge!: centreCharge[];

  isFailed = false;
  submitted = false;
  isSuccessful = false;
  errorMessage = '';

  constructor(private machineService: MachineService,
    private router: Router,
    private route: ActivatedRoute,
    private centreChargeService: CentreChargeService) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.machineService.getMachineById(this.id).subscribe(
      data => {
        this.machine = data
      },
      error => console.log(error)
    )
    this.listLoadCharge();
  }


  listLoadCharge() {
    this.centreChargeService.getLoadCharge().subscribe(
      data => {
        this.listCentreCharge = data
      }
    )
  }


  onSubmit() {
    this.machineService.updateMachine(this.id, this.machine).subscribe(
      data => {
        this.goToMachineList()
        console.log("**"+ this.machine.centreCharge.ccname)
        this.isSuccessful = true;
        this.submitted = true;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isFailed = true;
      }
    );
  }
  goToMachineList() {
    this.router.navigate(['/machine-list'])
  }
}