import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UAP } from 'src/app/model/uap';
import { CrudGlobaleService } from 'src/app/services/crud-globale.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-uap-list',
  templateUrl: './uap-list.component.html',
  styleUrls: ['./uap-list.component.css']
})
export class UapListComponent implements OnInit {
  url:string = "uap";
  uaps!: UAP[];
  uapName: String = '';
  uapDescription: String = '';
  closeResult = '';
  isDeletedFailed: boolean = false
  isSuccessful: boolean = false
  errorMessage!: ''

  constructor(
              private crudService : CrudGlobaleService, 
              private token: TokenStorageService,
              private router: Router,
              private modalService: NgbModal) { }

  isAdmin() { return this.token.getUser().roles[0] == "ROLE_ADMIN" }
  isUser() { return this.token.getUser().roles[0] == "ROLE_USER" }

  ngOnInit(): void {
    this.getListOfUAP();
  }

  getListOfUAP() {
    this.crudService.getListEntity("uap").subscribe(
      data => {
        this.uaps = data;
      }
    )
  }

  deleteUAP(id: number) {
    this.crudService.deleteEntity("uap", id).subscribe(
      data => {
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

  updateUAP(id: number) {
    this.router.navigate(['uap-update', id]);
  }

  loadChargeByUAP(id: number) {
    this.router.navigate(['load-charge-by-uap', id]);
  }

  Search() {
    if (this.uapDescription != "" || this.uapName != "") {
      this.uaps = this.uaps.filter(
        res => {
          return (
            res.uapDescription.toLocaleLowerCase().match(this.uapDescription.toLocaleLowerCase()) ||
            res.uapName.toLocaleLowerCase().match(this.uapName.toLocaleLowerCase())
          )
        })
    }
    else if (this.uapDescription == "" && this.uapName == "") {
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