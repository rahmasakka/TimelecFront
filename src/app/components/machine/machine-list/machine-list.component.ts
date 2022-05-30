import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { machine } from 'src/app/model/machine';
import { CrudGlobaleService } from 'src/app/services/crud-globale.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-machine-list',
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.scss']
})
export class MachineListComponent implements OnInit {
  machines !: machine[]
  machineDescription!: String
  machineName!: String
  closeResult = '';

  constructor(
    private crudService: CrudGlobaleService,
    private token: TokenStorageService,
    private router: Router,
    private modalService: NgbModal) { }

  isAdmin() { return this.token.getUser().roles[0] == "ROLE_ADMIN" }

  ngOnInit(): void {
    this.getListOfMachine();
  }

  getListOfMachine() {
    this.crudService.getListEntity("machine").subscribe(
      data => {
        this.machines = data;
        console.log(this.machines);
      }
    )
  }

  deleteMachine(id: number) {
    this.crudService.deleteEntity("machine", id).subscribe(() => { window.location.reload() })
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

  updateMachine(id: number) {
    this.router.navigate(['update-machine', id])
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}