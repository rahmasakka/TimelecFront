import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  closeResult: String = ''
  isDeletedFailed: boolean = false
  isSuccessful: boolean = false
  errorMessage: string = ''

  constructor(private route: ActivatedRoute,
    private token: TokenStorageService,
    private loadChargeService: CentreChargeService,
    private machineService: MachineService,
    private router: Router,
    private modalService: NgbModal) { }

  isAdmin() { return this.token.getUser().roles[0] == "ROLE_ADMIN" }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.loadChargeService.getLoadChargeById(this.id).subscribe(
      data => {
        this.loadCharge = data
      }
    )
    this.getListOfMachine(this.id)
  }

  getListOfMachine(id: number) {
    this.machineService.listMachineByLoadCharge(this.id).subscribe(
      data => {
        this.machines = data
        // console.log(data)
      }
    )
  }

  deletemachine(id: number) {
    this.machineService.deleteMachine(id).subscribe(
      data => {
        //   console.log(data);
        window.location.reload();
        this.isDeletedFailed = false;
        this.isSuccessful = true;
      },
      error => {
        this.errorMessage = error.error.message
        this.isDeletedFailed = true
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

  updateMachine(id: number) {
    this.router.navigate(['update-machine', id])
  }

  machineByLoadCharge(id: number) {
    this.router.navigate(['', id])
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