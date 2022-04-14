import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LaodCharge } from 'src/app/model/LaodCharge';
import { UAP } from 'src/app/model/uap';
import { CentreChargeService } from 'src/app/services/centre-charge.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UapService } from 'src/app/services/uap.service';

@Component({
  selector: 'app-load-charge-by-uap',
  templateUrl: './load-charge-by-uap.component.html',
  styleUrls: ['./load-charge-by-uap.component.css']
})
export class LoadChargeByUapComponent implements OnInit {
  id!: number;  
  loadCharge! : LaodCharge[];
  ccname: String = '';
  ccdescription : String='';
  loadChargeID!: LaodCharge;
  uap!: UAP
  closeResult=''
  isDeletedFailed: boolean = false
  isSuccessful: boolean = false
  errorMessage!: ''


  constructor(private loadChargeService: CentreChargeService,
    private uapService : UapService,
    private token: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService : NgbModal) {}

  isAdmin() { return this.token.getUser().roles[0] == "ROLE_ADMIN" }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.getListLoadCharge(this.id)
   
    this.uapService.getUAPById(this.id).subscribe(
      data => {
        this.uap = data
       // console.log(data)
      }
    )
  }


  getListLoadCharge(id: number){
    this.loadChargeService.listLoadChargeByUAP(id).subscribe(
      data => {
        this.loadCharge = data
       // console.log(data)
      }
    )
  }

  
  deleteLoadCharge(id: number) {
    this.loadChargeService.deleteLoadCharge(id).subscribe(
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

  updateLoadCharge(id: number){
    this.router.navigate(['load-charge-update',id])
  }

  loadChargeDetails(id: number){
    this.router.navigate(['load-charge-details', id])
  }


  Search() {
    if (this.ccname != "" || this.ccdescription != "") {
      this.loadCharge = this.loadCharge.filter(
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