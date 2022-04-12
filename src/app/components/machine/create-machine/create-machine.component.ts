import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LaodCharge } from 'src/app/model/LaodCharge';
import { LoadChargeService } from 'src/app/services/load-charge.service';
import { MachineService } from 'src/app/services/machine.service';

@Component({
  selector: 'app-create-machine',
  templateUrl: './create-machine.component.html',
  styleUrls: ['./create-machine.component.css']
})
export class CreateMachineComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  submitted = false;

  loadCharges!: LaodCharge[];

  constructor(private machineService: MachineService,
    private router: Router,
    private loadChargeService: LoadChargeService) { }

  ngOnInit(): void {
    this.getListLoadCharge()
    console.log(this.form)
  }

  onSubmit(): void {
    this.submitted = true;
    this.machineService.createMachine(this.form).subscribe(
      data => {
        this.goToMachineList()
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  goToMachineList() {
    this.router.navigate(['/machine-list']);
  }

  getListLoadCharge() {
    this.loadChargeService.getLoadCharge().subscribe(
      data => {
        this.loadCharges = data
      }
    )
  }
}