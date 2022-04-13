import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { machine } from 'src/app/model/machine';
import { CentreChargeService } from 'src/app/services/centre-charge.service';
import { MachineService } from 'src/app/services/machine.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-load-charge-details',
  templateUrl: './load-charge-details.component.html',
  styleUrls: ['./load-charge-details.component.css']
})
export class LoadChargeDetailsComponent implements OnInit {

  id!: number;
  machines!: machine[]
  machineDescription!: String
  machineName!: String
  loadCharge: any

  constructor(private route: ActivatedRoute,
    private token: TokenStorageService,
    private loadChargeService: CentreChargeService,
    private machineService: MachineService,
    private router: Router) { }

  isAdmin() { return this.token.getUser().roles[0] == "ROLE_ADMIN" }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.loadChargeService.getLoadChargeById(this.id).subscribe(
      data=> {
        this.loadCharge = data
      }
    )
    this.getListOfMachine(this.id)
  }

  getListOfMachine(id: number){
    this.machineService.listMachineByLoadCharge(this.id).subscribe(
      data => {
        this.machines = data
       // console.log(data)
      }
    )
  }

  deleteMachine(id: number) {
    this.machineService.deleteMachine(id).subscribe(
      data => {
        console.log(data);
        window.location.reload()
       // this.getListOfMachine();
      }
    )
  }

  Search() {
    if (this.machineDescription != "" || this.machineName != "") {
      this.machines = this.machines.filter(
        res => {
          return (
            res.machineDescription.toLocaleLowerCase().match(this.machineDescription.toLocaleLowerCase()) ||
            res.machineName.toLocaleLowerCase().match(this.machineName.toLocaleLowerCase())
          )
        })
    }
    else if (this.machineDescription == "" && this.machineName == "") {
      this.ngOnInit();
    }
  }
  
  updateMachine(id:number){
    this.router.navigate(['update-machine',id])
  }

  machineByLoadCharge(id: number){
    this.router.navigate(['', id])
  }
}