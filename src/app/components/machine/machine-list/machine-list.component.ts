import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { machine } from 'src/app/model/machine';
import { MachineService } from 'src/app/services/machine.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-machine-list',
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.css']
})
export class MachineListComponent implements OnInit {

  machines !: machine[]
  machineDescription!: String
  machineName!: String
  constructor(private machineService : MachineService,
              private token: TokenStorageService,
              private router: Router) { }

  isAdmin() { return this.token.getUser().roles[0] == "ROLE_ADMIN" }

  ngOnInit(): void {
    this.getListOfMachine();
  }

  getListOfMachine(){
    this.machineService.getListMachine().subscribe(
      data => {
        this.machines = data;
        console.log(data);
      }
    )
  }

  deleteMachine(id: number) {
    this.machineService.deleteMachine(id).subscribe(
      data => {
        console.log(data);
        this.getListOfMachine();
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
}