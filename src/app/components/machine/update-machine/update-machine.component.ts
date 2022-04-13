import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LaodCharge } from 'src/app/model/LaodCharge';
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
  machine!: machine;
  listLoadCharge!: LaodCharge[]
  isSignUpFailed = false;
  submitted = false;
  isSuccessful = false;
  errorMessage = '';


  constructor(private machineService: MachineService,
    private router: Router,
    private route: ActivatedRoute,
    private loadChargeService: CentreChargeService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.machineService.getMachineById(this.id).subscribe(
      data => {
        this.machine = data
        console.log(data)
      },
      error => console.log(error)
    )
    this.getListLoadCharge();
  }

  getListLoadCharge() {
    this.loadChargeService.getLoadCharge().subscribe(
      data => {
        this.listLoadCharge = data
      }
    )
  }

  goToListMachine() {
    this.router.navigate(['/machine-list'])
  }

  onSubmit() {
    this.machineService.updateMachine(this.id, this.machine).subscribe(
      data => {
        this.goToListMachine()
        console.log(data)

        this.isSuccessful = true
        this.submitted = true
      },
      error => {
        this.errorMessage = error.errorMessage
        this.isSignUpFailed = true
      }
    )
  }
}