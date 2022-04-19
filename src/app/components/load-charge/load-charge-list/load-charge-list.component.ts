import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { centreCharge } from 'src/app/model/centreCharge';
import { CentreChargeService } from 'src/app/services/centre-charge.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-load-charge-list',
  templateUrl: './load-charge-list.component.html',
  styleUrls: ['./load-charge-list.component.css']
})
export class LoadChargeListComponent implements OnInit {

  centreCharge!: centreCharge[];
  ccname: String = '';
  ccdescription: String = '';
  closeResult = '';
  isDeletedFailed: boolean = false
  isSuccessful: boolean = false
  errorMessage!: ''

  constructor(private centreChargeService: CentreChargeService,
    private token: TokenStorageService,
    private router: Router,
    private modalService: NgbModal) { }

  isAdmin() { return this.token.getUser().roles[0] == "ROLE_ADMIN" }
  ngOnInit(): void {
    this.getListLoadCharge();
  }

  getListLoadCharge() {
    this.centreChargeService.getLoadCharge().subscribe(
      data => {
        this.centreCharge = data;
        // console.log(data)
      }
    )
  }

  deleteLoadCharge(id: number) {
    this.centreChargeService.deleteLoadCharge(id).subscribe(
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

  updateLoadCharge(id: number) {
    this.router.navigate(['load-charge-update', id])
  }

  loadChargeDetails(id: number) {
    this.router.navigate(['load-charge-details', id])
  }


  Search() {
    if (this.ccname != "" || this.ccdescription != "") {
      this.centreCharge = this.centreCharge.filter(
        res => {
          return (
            res.ccdescription.toLocaleLowerCase().match(this.ccdescription.toLocaleLowerCase()) ||
            res.ccname.toLocaleLowerCase().match(this.ccname.toLocaleLowerCase())
          )
        })
    }
    else if (this.ccdescription == "" && this.ccname == "") {
      this.ngOnInit();
    }
  }


  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      window.location.reload();

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